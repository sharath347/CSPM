import { signOut } from "next-auth/react";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:5000";

// Base API fetch wrapper
const apiFetch = async (url, options = {}) => {
  const res = await fetch(url, options);

  if (res.status === 401 || res.status === 403) {
    console.warn("⚠️ Token expired or invalid. Logging out...");
    await signOut({ redirect: true, callbackUrl: "/" });
    return null;
  }

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json(); // Always return parsed JSON
};

// Connect AWS Service
const connectAwsService = async (userId, token, formData) => {
  if (!userId) throw new Error("User ID is required");
  if (!token) throw new Error("Token is required");

  console.log("🔗 Connecting AWS for user:", userId);

  const payload = {
    aws_access_key: formData.accessKeyId,
    aws_secret_key: formData.secretAccessKey,
    region: formData.region,
    user_id: userId,
  };

  try {
    const res = await fetch(`${BASE_URL}/scans/run-scoutsuite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    // Handle token expiration
    if (res.status === 401 || res.status === 403) {
      console.warn("⚠️ Token expired or invalid. Logging out...");
      await signOut({ redirect: true, callbackUrl: "/" });
      return {
        success: false,
        data: null,
        error: "Session expired. Please log in again.",
      };
    }

    // Handle other errors
    if (!res.ok) {
      let errMsg = "Failed to connect AWS";
      try {
        const errorBody = await res.json();
        // Extract meaningful error from backend
        errMsg = errorBody.error || errorBody.message || errMsg;
      } catch {
        const text = await res.text();
        errMsg = text || errMsg;
      }
      return { success: false, data: null, error: errMsg };
    }

    // Success
    const data = await res.json();
    console.log("✅ AWS connect response:", data);
    return { success: true, data };
  } catch (e) {
    console.error("Unable to fetch AWS data:", e);
    return { success: false, data: null, error: e.message };
  }
};

const connectGcpService = async (userId, token, formData) => {
  if (!userId) throw new Error("User ID is required");
  if (!token) throw new Error("Token is required");

  console.log("🔗 Connecting GCP for user:", userId);

  const multipart = new FormData();
  multipart.append("file", formData.serviceAccountKey);
  multipart.append("project_id", formData.projectId);
  multipart.append("user_id", userId);

  try {
    const res = await fetch(`${BASE_URL}/scans/run-scoutsuite-gcp`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: multipart,
    });

    if (res.status === 401 || res.status === 403) {
      console.warn("⚠️ Token expired or invalid. Logging out...");
      await signOut({ redirect: true, callbackUrl: "/" });
      return {
        success: false,
        data: null,
        error: "Session expired. Please log in again.",
      };
    }

    if (!res.ok) {
      let errMsg = "Failed to connect GCP";
      try {
        const errorBody = await res.json();
        errMsg = errorBody.error || errorBody.message || errMsg;
      } catch {
        const text = await res.text();
        errMsg = text || errMsg;
      }
      return { success: false, data: null, error: errMsg };
    }

    const data = await res.json();
    console.log("✅ GCP connect response:", data);
    return { success: true, data };
  } catch (e) {
    console.error("Unable to fetch GCP data:", e);
    return { success: false, data: null, error: e.message };
  }
};

// Get Summary / Service Data
const getServiceData = async (userId, scanId, token) => {
  if (!userId) throw new Error("User ID is required");
  if (!token) throw new Error("Token is required");

  console.log("UserId:", userId);
  console.log("Token:", token);

  const data = await apiFetch(
    `${BASE_URL}/scans/get_summary/${userId}/${scanId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  console.log("📦 Service Data:", data);
  return data;
};

// Get Findings for a specific service
const getServiceFindings = async (userId, token, serviceName, scanId) => {
  if (!userId) throw new Error("User ID is required");
  if (!token) throw new Error("Token is required");
  if (!serviceName) throw new Error("Service name is required");
  if (!scanId) throw new Error("Scan ID is required");

  const data = await apiFetch(
    `${BASE_URL}/scans/get_findings/${userId}/${scanId}/${serviceName}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  console.log("📡 Findings API Response:", data);
  return data;
};

// Get Findings Count by Level
const getFindingsCountByLevel = async (userId, scanId, token) => {
  if (!userId) throw new Error("User ID is required");
  if (!token) throw new Error("Token is required");

  const data = await apiFetch(
    `${BASE_URL}/scans/count_findings_by_level/${userId}/${scanId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  console.log("📊 Findings Count API Response:", data);
  return data;
};

// Get Service Groups
const getServiceGroups = async (userId, token) => {
  if (!userId) throw new Error("User ID is required");
  if (!token) throw new Error("Token is required");

  const data = await apiFetch(
    `${BASE_URL}/scans/get_service_groups/${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  console.log("📦 Service Groups API Response:", data);
  return data;
};

const getAllDangerousFindings = async (userId, scanId, token) => {
  if (!scanId) throw new Error("Scan ID is required");
  if (!token) throw new Error("Token is required");

  const data = await apiFetch(
    `${BASE_URL}/scans/get_all_dangerous_findings/${userId}/${scanId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!data) {
    throw new Error("Failed to fetch dangerous findings or unauthorized");
  }

  console.log("🚨 Dangerous Findings:", data);
  return data;
};

// Get all scans for a user
const getUserScans = async (userId, token) => {
  if (!userId) throw new Error("User ID is required");
  if (!token) throw new Error("Token is required");

  console.log("UserId:", userId);
  console.log("Token:", token);

  const data = await apiFetch(`${BASE_URL}/scans/get-user-scans/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  console.log("📦 User Scans:", data);
  return data;
};

const deleteScan = async (userId, scanId, token) => {
  if (!userId) throw new Error("User ID is required");
  if (!scanId) throw new Error("Scan ID is required");
  if (!token) throw new Error("Token is required");

  console.log("🗑️ Deleting scan:", scanId, "for user:", userId);

  const data = await apiFetch(
    `${BASE_URL}/scans/delete-user-scan/${userId}/${scanId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export {
  getServiceData,
  getServiceFindings,
  connectAwsService,
  connectGcpService,
  getFindingsCountByLevel,
  getServiceGroups,
  getAllDangerousFindings,
  getUserScans,
  deleteScan,
};
