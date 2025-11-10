import React from "react";

//services.aad.applications
// ---------- AAD Applications ----------
export const AadApplications = ({ data }) => {
  if (!data) return null;

  // Extract the applications from data
  const applications = Object.values(data).map((item) => item);

  if (!applications || applications.length === 0) return null;

  // Helper functions
  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  const formatDate = (date) => (date ? new Date(date).toLocaleString() : "N/A");

  return (
    <div className="space-y-6">
          {applications.map((app, idx) => (
        <div key={idx} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-4">
            <h4 className="text-lg font-semibold text-white">{app.name || "Unnamed Application"}</h4>
          </div>

          {/* Information */}
          <div className="px-6 py-4 border-b border-gray-700">
            <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">ID:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(app.id)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">App ID:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(app.app_id)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">Type:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(app.object_type)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">Sign In Audience:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(app.sign_in_audience)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">Publisher Domain:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(app.publisher_domain)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">Available To Other Tenants:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(app.available_to_other_tenants)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">Allow Guests Sign-In:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(app.allow_guests_sign_in)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">Allow Passthrough Users:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(app.allow_passthrough_users)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">Public Client:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(app.public_client)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">Device-Only Auth Supported:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(app.is_device_only_auth_supported)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">Pre-Authorized Applications:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(app.pre_authorized_applications)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">Deletion Timestamp:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(app.deletion_timestamp)}</samp>
              </li>
            </ul>
              </div>

              {/* Password Credentials */}
          <div className="px-6 py-4">
            <h4 className="text-base font-semibold text-gray-200 mb-3">
              Password Credentials
              {app.password_credentials && app.password_credentials.length > 0 && (
                <span
                  className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-600 text-white"
                  style={{ marginLeft: "6px" }}
                >
                  {app.password_credentials.length}
                </span>
              )}
                  </h4>
            {app.password_credentials && app.password_credentials.length > 0 ? (
              <ul className="space-y-2">
                    {app.password_credentials.map((cred, i) => (
                  <li key={i} className="text-sm text-gray-300">
                    <div className="flex items-center mb-2">
                      <span className="font-medium min-w-[100px]">ID:</span>
                      <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(cred.key_id)}</samp>
                    </div>
                    <ul className="ml-4 space-y-1">
                      <li className="flex items-center">
                        <span className="font-medium min-w-[120px] text-gray-400">Start Date:</span>
                        <span className="ml-2 text-gray-300">{formatDate(cred.start_date)}</span>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[120px] text-gray-400">End Date:</span>
                        <span className="ml-2 text-gray-300">{formatDate(cred.end_date)}</span>
                      </li>
                    </ul>
                      </li>
                    ))}
                  </ul>
            ) : (
              <div className="text-sm text-gray-500 italic">No password credentials</div>
              )}
                </div>
            </div>
          ))}
    </div>
  );
};

//services.aad.groups
// ---------- AAD Groups ----------
export const AadGroups = ({ data }) => {
  if (!data) return null;

  // Extract the groups from data
  const groups = Object.values(data).map((item) => item);

  if (!groups || groups.length === 0) return null;

  // Helper functions
  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  const convertBoolToEnabled = (val) => (val ? "Enabled" : "Disabled");

        return (
    <div className="space-y-6">
      {groups.map((group, idx) => (
        <div key={idx} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-4">
            <h4 className="text-lg font-semibold text-white">{group.name || "Unnamed Group"}</h4>
            </div>

          {/* Information */}
          <div className="px-6 py-4 border-b border-gray-700">
            <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">Name:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(group.name)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">Type:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(group.object_type)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">Mail Nickname:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(group.mail_nickname)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">Mail Status:</span>
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${group.mail_enabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                  {convertBoolToEnabled(group.mail_enabled)}
                    </span>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">Mail:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(group.mail)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">Security Status:</span>
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${group.security_enabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                  {convertBoolToEnabled(group.security_enabled)}
                </span>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">Deletion Timestamp:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(group.deletion_timestamp)}</samp>
              </li>
            </ul>
                  </div>

          {/* Role Assignments */}
          <div className="px-6 py-4 border-b border-gray-700">
            <h4 className="text-base font-semibold text-gray-200 mb-3">
              Role Assignments
              {group.roles && group.roles.length > 0 && (
                <span
                  className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-600 text-white"
                  style={{ marginLeft: "6px" }}
                >
                  {group.roles.length}
                </span>
              )}
                    </h4>
            {group.roles && group.roles.length > 0 ? (
              <ul className="space-y-2">
                {group.roles.map((role, i) => (
                  <li key={i} className="text-sm text-gray-300">
                    <span className="text-blue-300 hover:text-blue-200 transition-colors cursor-pointer">
                      {role.name ?? "Unknown Role"}
                    </span>
                    {" "}(subscription{" "}
                    <samp className="bg-gray-700 px-1 py-0.5 rounded text-blue-300 font-mono text-xs">{role.subscription_id}</samp>)
                  </li>
              ))}
              </ul>
            ) : (
              <div className="text-sm text-gray-500 italic">No role assignments</div>
            )}
            </div>

          {/* Members */}
          <div className="px-6 py-4">
            <h4 className="text-base font-semibold text-gray-200 mb-3">
              Members
              {group.users && group.users.length > 0 && (
                <span
                  className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-600 text-white"
                  style={{ marginLeft: "6px" }}
                >
                  {group.users.length}
                </span>
              )}
                    </h4>
            {group.users && group.users.length > 0 ? (
              <ul className="space-y-2">
                {group.users.map((user, i) => {
                  const userId = typeof user === 'string' ? user : user.id || user;
                  const userName = typeof user === 'object' && user.name ? user.name : userId;
                  return (
                    <li key={i} className="text-sm text-gray-300">
                      <span className="text-blue-300 hover:text-blue-200 transition-colors cursor-pointer">
                        {userName}
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="text-sm text-gray-500 italic">No members</div>
            )}
                  </div>
                </div>
              ))}
    </div>
  );
};

//services.aad.policies
// ---------- AAD Policies ----------
export const AadPolicies = ({ data }) => {
  if (!data) return null;

  // Extract the policies from data
  const policies = Object.values(data).map((item) => item);

  if (!policies || policies.length === 0) return null;

  // Helper functions
  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  const convertBoolToEnabled = (val) => (val ? "Enabled" : "Disabled");

  return (
    <div className="space-y-6">
          {policies.map((policy, idx) => (
        <div key={idx} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-4">
            <h4 className="text-lg font-semibold text-white">{policy.name || "Unnamed Policy"}</h4>
                </div>

          {/* Information */}
          <div className="px-6 py-4">
            <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center">
                <span className="font-medium min-w-[280px]">Name:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(policy.name)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[280px]">Allow Invites From:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(policy.allow_invites_from)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[280px]">Allowed To Create Apps:</span>
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${policy.allowed_to_create_apps ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                  {convertBoolToEnabled(policy.allowed_to_create_apps)}
            </span>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[280px]">Allowed To Create Security Groups:</span>
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${policy.allowed_to_create_security_groups ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                  {convertBoolToEnabled(policy.allowed_to_create_security_groups)}
              </span>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[280px]">Allowed To Read Other Users:</span>
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${policy.allowed_to_read_other_users ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                  {convertBoolToEnabled(policy.allowed_to_read_other_users)}
                        </span>
                      </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[280px]">Allow Email Verified Users To Join Organization:</span>
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${policy.allow_email_verified_users_to_join_organization ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                  {convertBoolToEnabled(policy.allow_email_verified_users_to_join_organization)}
                </span>
                      </li>
                  </ul>
                </div>
            </div>
          ))}
    </div>
  );
};

//services.aad.service_principals
// ---------- AAD Service Principals ----------
export const AadServicePrincipals = ({ data }) => {
  if (!data) return null;

  const principals = Object.values(data).map((item) => item);
  if (!principals || principals.length === 0) return null;

  // Helper functions
  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  const convertBoolToEnabled = (val) => (val ? "Enabled" : "Disabled");
  const formatDate = (date) => (date ? new Date(date).toLocaleString() : "N/A");

  return (
    <div className="space-y-6">
          {principals.map((sp, idx) => (
        <div key={idx} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-4">
            <h4 className="text-lg font-semibold text-white">{sp.name || "Unnamed Service Principal"}</h4>
          </div>

          {/* Information */}
          <div className="px-6 py-4 border-b border-gray-700">
            <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center">
                <span className="font-medium min-w-[240px]">ID:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(sp.id)}</samp>
              </li>
              <li className="flex items-start">
                <span className="font-medium min-w-[240px]">Tags:</span>
                <div className="ml-2 flex flex-wrap gap-2">
                    {sp.tags && sp.tags.length > 0 ? (
                      sp.tags.map((tag, i) => (
                      <samp key={i} className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                          {valueOrNone(tag)}
                      </samp>
                      ))
                    ) : (
                    <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">None</samp>
                    )}
                  </div>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[240px]">Status:</span>
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${sp.account_enabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                  {convertBoolToEnabled(sp.account_enabled)}
                </span>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[240px]">App:</span>
                {sp.app_name ? (
                  <span className="ml-2 text-blue-300 hover:text-blue-200 transition-colors cursor-pointer">
                    {valueOrNone(sp.app_name)}
                  </span>
                ) : (
                  <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(sp.app_name)}</samp>
                )}
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[240px]">App Owner Tenant ID:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(sp.app_owner_tenant_id)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[240px]">App Role Assignment Required:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(sp.app_role_assignment_required)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[240px]">Type:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(sp.object_type)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[240px]">Service Principal Type:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(sp.service_principal_type)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[240px]">Publisher Name:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(sp.publisher_name)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[240px]">Deletion Timestamp:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(sp.deletion_timestamp)}</samp>
              </li>
            </ul>
              </div>

              {/* Roles */}
          <div className="px-6 py-4 border-b border-gray-700">
            <h4 className="text-base font-semibold text-gray-200 mb-3">
              Roles
              {sp.roles && sp.roles.length > 0 && (
                <span
                  className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-600 text-white"
                  style={{ marginLeft: "6px" }}
                >
                  {sp.roles.length}
                </span>
              )}
                  </h4>
            {sp.roles && sp.roles.length > 0 ? (
              <ul className="space-y-2">
                    {sp.roles.map((role, i) => (
                  <li key={i} className="text-sm text-gray-300">
                    <span className="text-blue-300 hover:text-blue-200 transition-colors cursor-pointer">
                      {role.name ?? "Unknown Role"}
                    </span>
                    {" "}(subscription{" "}
                    <samp className="bg-gray-700 px-1 py-0.5 rounded text-blue-300 font-mono text-xs">{role.subscription_id}</samp>)
                      </li>
                    ))}
                  </ul>
            ) : (
              <div className="text-sm text-gray-500 italic">No roles</div>
              )}
          </div>

              {/* Keys */}
          <div className="px-6 py-4">
            <h4 className="text-base font-semibold text-gray-200 mb-3">
              Keys
              {sp.key_credentials && sp.key_credentials.length > 0 && (
                <span
                  className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-600 text-white"
                  style={{ marginLeft: "6px" }}
                >
                  {sp.key_credentials.length}
                </span>
              )}
                  </h4>
            {sp.key_credentials && sp.key_credentials.length > 0 ? (
              <ul className="space-y-2">
                    {sp.key_credentials.map((key, i) => (
                  <li key={i} className="text-sm text-gray-300">
                    <div className="flex items-center mb-2">
                      <span className="font-medium min-w-[100px]">ID:</span>
                      <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(key.key_id)}</samp>
                        </div>
                    <ul className="ml-4 space-y-1">
                      <li className="flex items-center">
                        <span className="font-medium min-w-[100px] text-gray-400">Type:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(key.type)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[100px] text-gray-400">Usage:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(key.usage)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[100px] text-gray-400">Start Date:</span>
                        <span className="ml-2 text-gray-300">{formatDate(key.start_date)}</span>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[100px] text-gray-400">End Date:</span>
                        <span className="ml-2 text-gray-300">{formatDate(key.end_date)}</span>
                      </li>
                    </ul>
                      </li>
                    ))}
                  </ul>
            ) : (
              <div className="text-sm text-gray-500 italic">No keys</div>
              )}
          </div>
            </div>
          ))}
    </div>
  );
};

//services.aad.users
// ---------- AAD Users ----------
export const AadUsers = ({ data }) => {
  if (!data) return null;

  const users = Object.values(data).map((item) => item);
  if (!users || users.length === 0) return null;

  // Helper functions
  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  const convertBoolToEnabled = (val) => (val ? "Enabled" : "Disabled");

  return (
    <div className="space-y-6">
          {users.map((user, idx) => (
        <div key={idx} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-4">
            <h4 className="text-lg font-semibold text-white">{user.name || "Unnamed User"}</h4>
          </div>

          {/* Information */}
          <div className="px-6 py-4 border-b border-gray-700">
            <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">Principal Name:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(user.name)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">Display Name:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(user.display_name)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">Given Name:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(user.given_name)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">Surname:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(user.surname)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">Mail Nickname:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(user.mail_nickname)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">Mail:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(user.mail)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">Sign-In Names:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(user.sign_in_names)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">Type:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(user.user_type)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">Status:</span>
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${user.account_enabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                  {convertBoolToEnabled(user.account_enabled)}
                </span>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">Usage Location:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(user.usage_location)}</samp>
              </li>
              <li className="flex items-center">
                <span className="font-medium min-w-[200px]">Deletion Timestamp:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(user.deletion_timestamp)}</samp>
              </li>
            </ul>
              </div>

              {/* Roles */}
          <div className="px-6 py-4 border-b border-gray-700">
            <h4 className="text-base font-semibold text-gray-200 mb-3">
              Roles
              {user.roles && user.roles.length > 0 && (
                <span
                  className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-600 text-white"
                  style={{ marginLeft: "6px" }}
                >
                  {user.roles.length}
                </span>
              )}
                  </h4>
            {user.roles && user.roles.length > 0 ? (
              <ul className="space-y-2">
                    {user.roles.map((role, i) => (
                  <li key={i} className="text-sm text-gray-300">
                    <span className="text-blue-300 hover:text-blue-200 transition-colors cursor-pointer">
                      {role.name ?? "Unknown Role"}
                    </span>
                    {" "}(subscription{" "}
                    <samp className="bg-gray-700 px-1 py-0.5 rounded text-blue-300 font-mono text-xs">{role.subscription_id}</samp>)
                      </li>
                    ))}
                  </ul>
            ) : (
              <div className="text-sm text-gray-500 italic">No roles</div>
              )}
          </div>

              {/* Groups */}
          <div className="px-6 py-4">
            <h4 className="text-base font-semibold text-gray-200 mb-3">
              Groups
              {user.groups && user.groups.length > 0 && (
                <span
                  className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-600 text-white"
                  style={{ marginLeft: "6px" }}
                >
                  {user.groups.length}
                </span>
              )}
            </h4>
            {user.groups && user.groups.length > 0 ? (
              <ul className="space-y-2">
                {user.groups.map((group, i) => {
                  const groupId = typeof group === 'string' ? group : group.id || group;
                  const groupName = typeof group === 'object' && group.name ? group.name : groupId;
                  return (
                    <li key={i} className="text-sm text-gray-300">
                      <span className="text-blue-300 hover:text-blue-200 transition-colors cursor-pointer">
                        {groupName}
                      </span>
                      </li>
                  );
                })}
                  </ul>
            ) : (
              <div className="text-sm text-gray-500 italic">No groups</div>
              )}
          </div>
            </div>
          ))}
    </div>
  );
};

//services.appservice.subscriptions.id.web_apps
// ---------------- App Service Web App ----------------
export const AppServiceWebApps = ({ data }) => {
  if (!data) return null;

  // Helper functions
  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  const convertBoolToEnabled = (val) => (val ? "Enabled" : "Disabled");
  const formatDate = (date) => (date ? new Date(date).toLocaleString() : "N/A");

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscriptionData]) => {
        // Handle both subscription structure and direct web apps array/object
        const webApps = subscriptionData.web_apps 
          ? Object.values(subscriptionData.web_apps)
          : Object.values(subscriptionData);
        
        if (!webApps || webApps.length === 0) return null;

        return (
          <div key={subscriptionId} className="space-y-6">
            {/* Subscription Header */}
            <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">
              Subscription: {subscriptionId}
            </div>

            {/* Web Apps List */}
            <div className="space-y-6">
          {webApps.map((app, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                  {/* Header */}
                  <div className="bg-blue-600 px-6 py-4">
                    <h4 className="text-lg font-semibold text-white">{app.name || "Unnamed Web App"}</h4>
                  </div>

              {/* Information */}
                  <div className="px-6 py-4 border-b border-gray-700">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-center">
                        <span className="font-medium min-w-[240px]">Name:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(app.name)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[240px]">Resource Group:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(app.resource_group)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[240px]">Repository Site Name:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(app.repository_site_name)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[240px]">Location:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(app.location)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[240px]">Last Modified Time:</span>
                        <span className="ml-2 text-gray-300">{formatDate(app.last_modified_time_utc)}</span>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[240px]">State:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(app.state)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[240px]">Usage State:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(app.usage_state)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[240px]">Availability State:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(app.availability_state)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[240px]">Kind:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(app.kind)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[240px]">Programming Language:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(app.programming_language)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[240px]">Programming Language Version:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(app.programming_language_version)}</samp>
                      </li>
                      <li className="flex items-start">
                        <span className="font-medium min-w-[240px]">Tags:</span>
                        <div className="ml-2 flex flex-wrap gap-2">
                  {app.tags && app.tags.length > 0 ? (
                    app.tags.map((tag, i) => (
                              <samp key={i} className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                        {valueOrNone(tag)}
                              </samp>
                    ))
                  ) : (
                            <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">None</samp>
                  )}
                </div>
                      </li>
                    </ul>
                  </div>

              {/* Configuration */}
                  <div className="px-6 py-4 border-b border-gray-700">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Configuration</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-center">
                        <span className="font-medium min-w-[240px]">Authentication:</span>
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${app.authentication_enabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                          {convertBoolToEnabled(app.authentication_enabled)}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[240px]">HTTPS-Only Traffic:</span>
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${app.https_only ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                          {convertBoolToEnabled(app.https_only)}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[240px]">HTTPS 2.0 Support:</span>
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${app.http_2_enabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                          {convertBoolToEnabled(app.http_2_enabled)}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[240px]">HTTP Logging:</span>
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${app.http_logging_enabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                          {convertBoolToEnabled(app.http_logging_enabled)}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[240px]">FTP Deployment:</span>
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${app.ftp_deployment_enabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                          {convertBoolToEnabled(app.ftp_deployment_enabled)}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[240px]">Minimum TLS Version Supported:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(app.minimum_tls_version_supported)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[240px]">Client Certificates:</span>
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${app.client_cert_enabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                          {convertBoolToEnabled(app.client_cert_enabled)}
                        </span>
                      </li>
                    </ul>
                  </div>

              {/* Identities */}
              {app.identity && (
                    <div className="px-6 py-4 border-b border-gray-700">
                      <h4 className="text-base font-semibold text-gray-200 mb-3">Identities</h4>
                      <ul className="space-y-3 text-sm text-gray-300">
                        <li className="flex items-center">
                          <span className="font-medium min-w-[240px]">System Assigned Identity:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(app.identity?.principal_id)}</samp>
                        </li>
                  {app.identity.user_assigned_identities && (
                          <li className="flex items-start">
                            <span className="font-medium min-w-[240px]">User Assigned Identities:</span>
                            <ul className="ml-2 space-y-1">
                              {Object.values(app.identity.user_assigned_identities).map((u, i) => (
                            <li key={i}>
                                  <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{u.principal_id}</samp>
                            </li>
                              ))}
                            </ul>
                          </li>
                        )}
                      </ul>
                    </div>
              )}

              {/* Networking */}
                  <div className="px-6 py-4">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Networking</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-center">
                        <span className="font-medium min-w-[240px]">Default Host Name:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(app.default_host_name)}</samp>
                      </li>
                      <li className="flex items-start">
                        <span className="font-medium min-w-[240px]">Outbound IP Addresses:</span>
                        <ul className="ml-2 space-y-1">
                          {app.outbound_ip_addresses && app.outbound_ip_addresses.length > 0 ? (
                            app.outbound_ip_addresses.map((ip, i) => (
                      <li key={i}>
                                <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{ip}</samp>
                      </li>
                            ))
                          ) : (
                            <li><samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">None</samp></li>
                          )}
                  </ul>
                      </li>
                      <li className="flex items-start">
                        <span className="font-medium min-w-[240px]">Possible Outbound IP Addresses:</span>
                        <ul className="ml-2 space-y-1">
                          {app.possible_outbound_ip_addresses && app.possible_outbound_ip_addresses.length > 0 ? (
                            app.possible_outbound_ip_addresses.map((ip, i) => (
                      <li key={i}>
                                <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{ip}</samp>
                      </li>
                            ))
                          ) : (
                            <li><samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">None</samp></li>
                          )}
                        </ul>
                      </li>
                  </ul>
                </div>
            </div>
          ))}
        </div>
    </div>
  );
      })}
  </div>
);
};

//services.keyvault.subscriptions.id.vaults
// ---------------- Key Vault ----------------
export const KeyVaultVault = ({ data }) => {
  if (!data) return null;

  // Helper functions
  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  const convertBoolToEnabled = (val) => (val ? "Enabled" : "Disabled");

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscriptionData]) => {
        if (!subscriptionData.vaults) return null;

        return (
          <div key={subscriptionId} className="space-y-6">
            {/* Subscription Header */}
            <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">
              Subscription: {subscriptionId}
        </div>

            {/* Vaults List */}
            <div className="space-y-6">
              {Object.entries(subscriptionData.vaults).map(
                ([vaultKey, vault]) => (
                  <div
                    key={`${subscriptionId}-${vaultKey}`}
                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                  >
                    {/* Header */}
                    <div className="bg-blue-600 px-6 py-4">
                      <h4 className="text-lg font-semibold text-white">{vault.name || vaultKey || "Unnamed Vault"}</h4>
        </div>

                    {/* Information */}
                    <div className="px-6 py-4">
                      <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                      <ul className="space-y-3 text-sm text-gray-300">
                        <li className="flex items-center">
                          <span className="font-medium min-w-[200px]">ID:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{vault.id || "None"}</samp>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[200px]">Location:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(vault.location)}</samp>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[200px]">Public Access:</span>
                          <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${vault.public_access_allowed ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                            {convertBoolToEnabled(vault.public_access_allowed)}
          </span>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[200px]">Vault Recoverable:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(vault.recovery_protection_enabled)}</samp>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[200px]">RBAC Permission Model:</span>
                          <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${vault.rbac_authorization_enabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                            {convertBoolToEnabled(vault.rbac_authorization_enabled)}
          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-medium min-w-[200px]">Tags:</span>
                          <div className="ml-2 flex flex-wrap gap-2">
          {vault.tags && Object.keys(vault.tags).length > 0 ? (
            Object.values(vault.tags).map((tag, idx) => (
                                <samp key={idx} className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                                  {valueOrNone(tag)}
                                </samp>
            ))
          ) : (
                              <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">None</samp>
          )}
        </div>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[200px]">Resource group:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(vault.resource_group_name)}</samp>
                        </li>
                      </ul>
        </div>
      </div>
                )
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

//services.loggingmonitoring.subscriptions.id.diagnostic_settings
// ---------- Diagnostic Settings ----------
// ---------------- LoggingMonitoringDiagnostics ----------------
export const LoggingMonitoringDiagnostics = ({ data }) => {
  if (!data) return null;

  // Helper function
  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscriptionData]) => {
        if (!subscriptionData.diagnostic_settings) return null;

        return (
          <div key={subscriptionId} className="space-y-6">
            {/* Subscription Header */}
            <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">
              Subscription: {subscriptionId}
            </div>

            {/* Diagnostic Settings List */}
            <div className="space-y-6">
              {Object.entries(subscriptionData.diagnostic_settings).map(
          ([diagId, diag]) => (
                  <div
                    key={`${subscriptionId}-${diagId}`}
                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                  >
                    {/* Header */}
                    <div className="bg-blue-600 px-6 py-4">
                      <h4 className="text-lg font-semibold text-white">{diagId || "Unnamed Diagnostic Setting"}</h4>
              </div>

              {/* Information */}
                    <div className="px-6 py-4">
                      <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                      <ul className="space-y-3 text-sm text-gray-300">
                        <li className="flex items-center">
                          <span className="font-medium min-w-[240px]">Diagnostic setting exists:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(diag.diagnostic_exist)}</samp>
                            </li>
                      </ul>
              </div>
            </div>
          )
              )}
      </div>
    </div>
        );
      })}
    </div>
  );
};

//services.loggingmonitoring.subscriptions.id.log_alerts
// ---------- Logging & Monitoring Log Alerts ----------
export const LogAlerts = ({ data }) => {
  if (!data) return null;

  // Helper function
  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscriptionData]) => {
        if (!subscriptionData.log_alerts) return null;

        return (
          <div key={subscriptionId} className="space-y-6">
            {/* Subscription Header */}
            <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">
              Subscription: {subscriptionId}
              </div>

            {/* Log Alerts List */}
            <div className="space-y-6">
              {Object.entries(subscriptionData.log_alerts).map(([alertId, alert]) => (
                <div
                  key={alertId}
                  className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-blue-600 px-6 py-4">
                    <h4 className="text-lg font-semibold text-white">{alert.name || alertId || "Unnamed Alert"}</h4>
                </div>

                  {/* Information */}
                  <div className="px-6 py-4">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-center">
                        <span className="font-medium min-w-[400px]">Create Policy Assignment activity log alert exist:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(alert.create_policy_assignment_exist)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[400px]">Create or update Network Security Group activity log alert exist:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(alert.create_update_NSG_exist)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[400px]">Delete Network Security Group activity log alert exist:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(alert.delete_NSG_exist)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[400px]">Create or update Network Security Group Rule activity log alert exist:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(alert.create_update_NSG_rule_exist)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[400px]">Delete Network Security Group Rule activity log alert exist:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(alert.delete_NSG_rule_exist)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[400px]">Create or update Security Solution activity log alert exist:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(alert.create_update_security_solution_exist)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[400px]">Delete Security Solution activity log alert exist:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(alert.delete_security_solution_exist)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[400px]">Create our update or delete SQL Server Firewall Rule activity log alert exist:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(alert.create_delete_firewall_rule_exist)}</samp>
                      </li>
                    </ul>
                </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

//services.loggingmonitoring.subscriptions.id.log_profiles
// ---------------- LoggingMonitoringLogProfiles ----------------
export const LoggingMonitoringLogProfiles = ({ data }) => {
  if (!data) return null;

  // Helper function
  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscriptionData]) => {
        if (!subscriptionData.log_profiles) return null;

        return (
          <div key={subscriptionId} className="space-y-6">
            {/* Subscription Header */}
            <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">
              Subscription: {subscriptionId}
                </div>

            {/* Log Profiles List */}
            <div className="space-y-6">
              {Object.entries(subscriptionData.log_profiles).map(
                ([logProfileId, logProfile]) => (
                  <div
                    key={`${subscriptionId}-${logProfileId}`}
                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                  >
                    {/* Header */}
                    <div className="bg-blue-600 px-6 py-4">
                      <h4 className="text-lg font-semibold text-white">{logProfile.name || logProfileId || "Unnamed Log Profile"}</h4>
                </div>

                    {/* Information */}
                    <div className="px-6 py-4">
                      <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                      <ul className="space-y-3 text-sm text-gray-300">
                        <li className="flex items-center">
                          <span className="font-medium min-w-[240px]">Name:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(logProfile.name)}</samp>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[240px]">Storage account id:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(logProfile.storage_account_id)}</samp>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[240px]">Captures all activities:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(logProfile.captures_all_activities)}</samp>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[240px]">Retention policy enabled:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(logProfile.retention_policy_enabled)}</samp>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[240px]">Retention policy days:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(logProfile.retention_policy_days)}</samp>
                        </li>
                      </ul>
              </div>
            </div>
          )
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};


//services.loggingmonitoring.subscriptions.id.resources_logging
// ---------- Resource Logging ----------
export const LoggingMonitoringResourcesLogging = ({ data }) => {
  if (!data) return null;

  // Helper function
  const convertBoolToEnabled = (val) => (val ? "Enabled" : "Disabled");

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscriptionData]) => {
        if (!subscriptionData.resources_logging) return null;

        return (
          <div key={subscriptionId} className="space-y-6">
            {/* Subscription Header */}
            <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">
              Subscription: {subscriptionId}
            </div>

            {/* Resources Logging List */}
            <div className="space-y-6">
              {Object.entries(subscriptionData.resources_logging).map(
          ([resourceId, resource]) => (
                  <div
                    key={`${subscriptionId}-${resourceId}`}
                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                  >
                    {/* Header */}
                    <div className="bg-blue-600 px-6 py-4">
                      <h4 className="text-lg font-semibold text-white">{resource.name || resourceId || "Unnamed Resource"}</h4>
              </div>

              {/* Information */}
                    <div className="px-6 py-4">
                      <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                      <ul className="space-y-3 text-sm text-gray-300">
                        <li className="flex items-center">
                          <span className="font-medium min-w-[240px]">Logging for key vault enabled:</span>
                          <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${resource.diagnostic_key_vault?.audit_event_enabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                            {convertBoolToEnabled(resource.diagnostic_key_vault?.audit_event_enabled)}
                  </span>
                        </li>
                      </ul>
              </div>
            </div>
          )
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

  // ---------------- MySQLDatabaseServers ----------------
//services.mysqldatabase.subscriptions.id.servers
export const MySQLDatabaseServers = ({ data }) => {
  if (!data) return null;

  // Helper function
  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscriptionData]) => {
        if (!subscriptionData.servers) return null;

        return (
          <div key={subscriptionId} className="space-y-6">
            {/* Subscription Header */}
            <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">
              Subscription: {subscriptionId}
            </div>

            {/* Servers List */}
            <div className="space-y-6">
              {Object.entries(subscriptionData.servers).map(
          ([serverId, server]) => (
                  <div
                    key={`${subscriptionId}-${serverId}`}
                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                  >
                    {/* Header */}
                    <div className="bg-blue-600 px-6 py-4">
                      <h4 className="text-lg font-semibold text-white">{server.name || serverId || "Unnamed MySQL Server"}</h4>
              </div>

              {/* Information */}
                    <div className="px-6 py-4">
                      <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                      <ul className="space-y-3 text-sm text-gray-300">
                        <li className="flex items-center">
                          <span className="font-medium min-w-[280px]">MySQL Server Name:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(server.name)}</samp>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[280px]">Server SSL connection enforcement:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(server.ssl_enforcement)}</samp>
                        </li>
                      </ul>
                </div>
                </div>
                )
              )}
              </div>
            </div>
        );
      })}
    </div>
  );
};

//services.network.subscriptions.id.application_security_groups
// ---------------- NetworkApplicationSecurityGroups ----------------
export const NetworkApplicationSecurityGroups = ({ data }) => {
  if (!data) return null;

  // Helper function
  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscriptionData]) => {
        if (!subscriptionData.application_security_groups) return null;

        return (
          <div key={subscriptionId} className="space-y-6">
            {/* Subscription Header */}
            <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">
              Subscription: {subscriptionId}
            </div>

            {/* Application Security Groups List */}
            <div className="space-y-6">
              {Object.entries(subscriptionData.application_security_groups).map(
                ([asgId, asg]) => (
                  <div
                    key={`${subscriptionId}-${asgId}`}
                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                  >
                    {/* Header */}
                    <div className="bg-blue-600 px-6 py-4">
                      <h4 className="text-lg font-semibold text-white">{asg.name || asgId || "Unnamed Application Security Group"}</h4>
              </div>

                    {/* Information */}
                    <div className="px-6 py-4 border-b border-gray-700">
                      <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                      <ul className="space-y-3 text-sm text-gray-300">
                        <li className="flex items-center">
                          <span className="font-medium min-w-[240px]">Name:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(asg.name)}</samp>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[240px]">Location:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(asg.location)}</samp>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[240px]">Provisioning State:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(asg.provisioning_state)}</samp>
                        </li>
                        <li className="flex items-start">
                          <span className="font-medium min-w-[240px]">Tags:</span>
                          <div className="ml-2 flex flex-wrap gap-2">
                {asg.tags && Object.keys(asg.tags).length > 0 ? (
                              Object.values(asg.tags).map((tag, idx) => (
                                <samp key={idx} className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                                  {valueOrNone(tag)}
                                </samp>
                  ))
                ) : (
                              <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">None</samp>
                )}
              </div>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[240px]">Resource group:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(asg.resource_group_name)}</samp>
                        </li>
                      </ul>
            </div>

            {/* Attached Network Interfaces */}
                    <div className="px-6 py-4">
                      <h4 className="text-base font-semibold text-gray-200 mb-3">
                Attached Network Interfaces
              </h4>
              {asg.network_interfaces && asg.network_interfaces.length > 0 ? (
                        <ul className="space-y-2">
                          {asg.network_interfaces.map((nic, index) => (
                            <li key={index} className="text-sm text-gray-300">
                              <span className="text-blue-300 hover:text-blue-200 transition-colors cursor-pointer">
                                <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                                  {typeof nic === 'string' ? nic : nic.name || nic.id || nic}
                                </samp>
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-sm text-gray-500 italic">
                          <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">None</samp>
                </div>
              )}
            </div>
          </div>
                )
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

  
//services.network.subscriptions.id.network_interfaces
// ---------------- NetworkNetworkInterfaces ----------------
export const NetworkNetworkInterfaces = ({ data }) => {
  if (!data) return null;

  // Helper function
  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscriptionData]) => {
        if (!subscriptionData.network_interfaces) return null;

        return (
          <div key={subscriptionId} className="space-y-6">
            {/* Subscription Header */}
            <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">
              Subscription: {subscriptionId}
            </div>

            {/* Network Interfaces List */}
            <div className="space-y-6">
              {Object.entries(subscriptionData.network_interfaces).map(
          ([nicId, nic]) => (
                  <div
                    key={`${subscriptionId}-${nicId}`}
                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                  >
                    {/* Header */}
                    <div className="bg-blue-600 px-6 py-4">
                      <h4 className="text-lg font-semibold text-white">{nic.name || nicId || "Unnamed Network Interface"}</h4>
              </div>

              {/* Information */}
                    <div className="px-6 py-4 border-b border-gray-700">
                      <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                      <ul className="space-y-3 text-sm text-gray-300">
                        <li className="flex items-center">
                          <span className="font-medium min-w-[240px]">Provisioning State:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(nic.provisioning_state)}</samp>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[240px]">Primary:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(nic.primary)}</samp>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[240px]">IP Configurations:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(nic.ip_configurations)}</samp>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[240px]">Mac Address:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(nic.mac_address)}</samp>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[240px]">Interface Endpoint:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(nic.interface_endpoint)}</samp>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[240px]">Network Security Group:</span>
                  {nic.network_security_group ? (
                            <span className="ml-2 text-blue-300 hover:text-blue-200 transition-colors cursor-pointer">
                              <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                                {typeof nic.network_security_group === 'string' ? nic.network_security_group : nic.network_security_group.name || nic.network_security_group}
                              </samp>
                            </span>
                          ) : (
                            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">None</samp>
                          )}
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[240px]">Enable IP Forwarding:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(nic.enable_ip_forwarding)}</samp>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[240px]">Enable Accelerated Networking:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(nic.enable_accelerated_networking)}</samp>
                        </li>
                        <li className="flex items-start">
                          <span className="font-medium min-w-[240px]">Tags:</span>
                          <div className="ml-2 flex flex-wrap gap-2">
                  {nic.tags && Object.keys(nic.tags).length > 0 ? (
                              Object.values(nic.tags).map((tag, idx) => (
                                <samp key={idx} className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                                  {valueOrNone(tag)}
                                </samp>
                    ))
                  ) : (
                              <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">None</samp>
                  )}
                </div>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[240px]">Resource group:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(nic.resource_group_name)}</samp>
                        </li>
                      </ul>
              </div>

              {/* IP Configuration */}
              {nic.ip_configuration && (
                      <div className="px-6 py-4">
                        <h4 className="text-base font-semibold text-gray-200 mb-3">IP Configuration</h4>
                        <ul className="space-y-3 text-sm text-gray-300">
                          <li className="flex items-center">
                            <span className="font-medium min-w-[240px]">Name:</span>
                            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(nic.ip_configuration.name)}</samp>
                          </li>
                          <li className="flex items-center">
                            <span className="font-medium min-w-[240px]">Provisioning State:</span>
                            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(nic.ip_configuration.provisioning_state)}</samp>
                          </li>
                          <li className="flex items-center">
                            <span className="font-medium min-w-[240px]">Primary:</span>
                            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(nic.ip_configuration.primary)}</samp>
                          </li>
                          <li className="flex items-center">
                            <span className="font-medium min-w-[240px]">Public IP Address:</span>
                            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(nic.ip_configuration.public_ip_address?.ip_address)}</samp>
                          </li>
                          <li className="flex items-center">
                            <span className="font-medium min-w-[240px]">Private IP Address:</span>
                            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(nic.ip_configuration.private_ip_address)}</samp>
                          </li>
                          <li className="flex items-center">
                            <span className="font-medium min-w-[240px]">Private IP Allocation Method:</span>
                            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(nic.ip_configuration.private_ip_allocation_method)}</samp>
                          </li>
                          <li className="flex items-center">
                            <span className="font-medium min-w-[240px]">Private IP Address Version:</span>
                            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(nic.ip_configuration.private_ip_address_version)}</samp>
                          </li>
                          <li className="flex items-center">
                            <span className="font-medium min-w-[240px]">Subnet:</span>
                            {nic.ip_configuration.subnet?.name ? (
                              <span className="ml-2 text-blue-300 hover:text-blue-200 transition-colors cursor-pointer">
                                <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                                  {nic.ip_configuration.subnet.name}
                    </samp>
                              </span>
                            ) : (
                              <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">None</samp>
                            )}
                          </li>
                          <li className="flex items-start">
                            <span className="font-medium min-w-[240px]">Application Security Groups:</span>
                            <div className="ml-2">
                    {nic.ip_configuration.application_security_groups &&
                    nic.ip_configuration.application_security_groups.length > 0 ? (
                                <ul className="space-y-2">
                        {nic.ip_configuration.application_security_groups.map(
                          (asg, idx) => (
                                      <li key={idx} className="text-sm text-gray-300">
                                        <span className="text-blue-300 hover:text-blue-200 transition-colors cursor-pointer">
                                          <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                                            {typeof asg === 'string' ? asg : asg.name || asg.id || asg}
                                          </samp>
                                        </span>
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                                <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">None</samp>
                    )}
                  </div>
                          </li>
                          <li className="flex items-center">
                            <span className="font-medium min-w-[240px]">Application Gateway Backend Address Pools:</span>
                            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(nic.ip_configuration.application_gateway_backend_address_pools)}</samp>
                          </li>
                          <li className="flex items-center">
                            <span className="font-medium min-w-[240px]">Load Balancer Backend Address Pools:</span>
                            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(nic.ip_configuration.load_balancer_backend_address_pools)}</samp>
                          </li>
                          <li className="flex items-center">
                            <span className="font-medium min-w-[240px]">Load Balancer Inbound NAT Rules:</span>
                            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(nic.ip_configuration.load_balancer_inbound_nat_rules)}</samp>
                          </li>
                          <li className="flex items-center">
                            <span className="font-medium min-w-[240px]">Virtual Network Taps:</span>
                            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(nic.ip_configuration.virtual_network_taps)}</samp>
                          </li>
                        </ul>
                </div>
              )}
            </div>
          )
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Small helper component for field rendering
const Field = ({ label, value }) => (
  <div className="list-group-item-text item-margin">
    {label}: <samp>{value || "None"}</samp>
  </div>
);

  // ---------------- Network Security Groups ----------------
//services.network.subscriptions.id.security_groups
// ---------------- NetworkSecurityGroups ----------------
export const NetworkSecurityGroups = ({ data }) => {
  if (!data) return null;

  // Helper function
  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscriptionData]) => {
        const securityGroups = subscriptionData?.security_groups || {};

        if (!securityGroups || Object.keys(securityGroups).length === 0) return null;

        return (
          <div key={subscriptionId} className="space-y-6">
            {/* Subscription Header */}
            <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">
              Subscription: {subscriptionId}
                  </div>

            {/* Security Groups List */}
            <div className="space-y-6">
              {Object.entries(securityGroups).map(([sgId, sgData]) => (
                <div
                  key={sgId}
                  className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-blue-600 px-6 py-4">
                    <h4 className="text-lg font-semibold text-white">{sgData.name || sgId || "Unnamed Security Group"}</h4>
                            </div>

                  {/* Information */}
                  <div className="px-6 py-4 border-b border-gray-700">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-center">
                        <span className="font-medium min-w-[200px]">Name:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(sgData.name)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[200px]">Location:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(sgData.location)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[200px]">State:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(sgData.provisioning_state)}</samp>
                      </li>
                      <li className="flex items-start">
                        <span className="font-medium min-w-[200px]">Tags:</span>
                        <div className="ml-2 flex flex-wrap gap-2">
                          {sgData.tags && Object.keys(sgData.tags).length > 0 ? (
                            Object.values(sgData.tags).map((tag, idx) => (
                              <samp key={idx} className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                                {valueOrNone(tag)}
                              </samp>
                            ))
                          ) : (
                            <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">None</samp>
                      )}
                    </div>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[200px]">Resource group:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(sgData.resource_group_name)}</samp>
                      </li>
                    </ul>
                  </div>

                  {/* Inbound Security Rules */}
                  <div className="px-6 py-4 border-b border-gray-700">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Inbound Security Rules</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="text-left py-2 px-3 text-gray-300 font-medium w-[10%]">Priority</th>
                            <th className="text-left py-2 px-3 text-gray-300 font-medium w-[40%]">Name</th>
                            <th className="text-left py-2 px-3 text-gray-300 font-medium w-[10%]">Protocol</th>
                            <th className="text-left py-2 px-3 text-gray-300 font-medium w-[10%]">Source Port</th>
                            <th className="text-left py-2 px-3 text-gray-300 font-medium w-[10%]">Source Filter</th>
                            <th className="text-left py-2 px-3 text-gray-300 font-medium w-[10%]">Destination Port</th>
                            <th className="text-left py-2 px-3 text-gray-300 font-medium w-[10%]">Destination Filter</th>
                            <th className="text-left py-2 px-3 text-gray-300 font-medium w-[10%]">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.values(sgData.security_rules || {})
                            .filter((r) => r.direction === "Inbound")
                            .sort((a, b) => (a.priority || 0) - (b.priority || 0))
                            .map((rule, idx) => (
                              <tr key={idx} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                                <td className="py-2 px-3 text-center text-gray-300">{valueOrNone(rule.priority)}</td>
                                <td className="py-2 px-3 text-gray-300">{valueOrNone(rule.name)}</td>
                                <td className="py-2 px-3 text-center text-gray-300">{valueOrNone(rule.protocol)}</td>
                                <td className="py-2 px-3 text-center text-gray-300">{valueOrNone(rule.source_port_ranges)}</td>
                                <td className="py-2 px-3 text-center text-gray-300">
                                  {rule.source_address_prefixes_is_asg ? (
                                    <span className="text-blue-300 hover:text-blue-200 transition-colors cursor-pointer">
                                      <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                                        {typeof rule.source_address_prefixes === 'string' ? rule.source_address_prefixes : rule.source_address_prefixes?.name || rule.source_address_prefixes}
                                      </samp>
                                    </span>
                                  ) : (
                                    <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(rule.source_address_prefixes)}</samp>
                                  )}
                                </td>
                                <td className="py-2 px-3 text-center text-gray-300">{valueOrNone(rule.destination_port_ranges)}</td>
                                <td className="py-2 px-3 text-center text-gray-300">{valueOrNone(rule.destination_address_prefixes)}</td>
                                <td className="py-2 px-3 text-center">
                                  {rule.allow ? (
                                    <span className="text-green-400">✓</span>
                                  ) : (
                                    <span className="text-red-400">✗</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          {Object.values(sgData.security_rules || {}).filter((r) => r.direction === "Inbound").length === 0 && (
                            <tr>
                              <td colSpan="8" className="py-4 px-3 text-center text-gray-500 italic">No inbound security rules</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Outbound Security Rules */}
                  <div className="px-6 py-4 border-b border-gray-700">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Outbound Security Rules</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="text-left py-2 px-3 text-gray-300 font-medium w-[10%]">Priority</th>
                            <th className="text-left py-2 px-3 text-gray-300 font-medium w-[40%]">Name</th>
                            <th className="text-left py-2 px-3 text-gray-300 font-medium w-[10%]">Protocol</th>
                            <th className="text-left py-2 px-3 text-gray-300 font-medium w-[10%]">Source Port</th>
                            <th className="text-left py-2 px-3 text-gray-300 font-medium w-[10%]">Source Filter</th>
                            <th className="text-left py-2 px-3 text-gray-300 font-medium w-[10%]">Destination Port</th>
                            <th className="text-left py-2 px-3 text-gray-300 font-medium w-[10%]">Destination Filter</th>
                            <th className="text-left py-2 px-3 text-gray-300 font-medium w-[10%]">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.values(sgData.security_rules || {})
                            .filter((r) => r.direction === "Outbound")
                            .sort((a, b) => (a.priority || 0) - (b.priority || 0))
                            .map((rule, idx) => (
                              <tr key={idx} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                                <td className="py-2 px-3 text-center text-gray-300">{valueOrNone(rule.priority)}</td>
                                <td className="py-2 px-3 text-gray-300">{valueOrNone(rule.name)}</td>
                                <td className="py-2 px-3 text-center text-gray-300">{valueOrNone(rule.protocol)}</td>
                                <td className="py-2 px-3 text-center text-gray-300">{valueOrNone(rule.source_port_ranges)}</td>
                                <td className="py-2 px-3 text-center text-gray-300">
                                  <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(rule.source_address_prefixes)}</samp>
                                </td>
                                <td className="py-2 px-3 text-center text-gray-300">{valueOrNone(rule.destination_port_ranges)}</td>
                                <td className="py-2 px-3 text-center text-gray-300">{valueOrNone(rule.destination_address_prefixes)}</td>
                                <td className="py-2 px-3 text-center">
                                  {rule.allow ? (
                                    <span className="text-green-400">✓</span>
                                  ) : (
                                    <span className="text-red-400">✗</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          {Object.values(sgData.security_rules || {}).filter((r) => r.direction === "Outbound").length === 0 && (
                            <tr>
                              <td colSpan="8" className="py-4 px-3 text-center text-gray-500 italic">No outbound security rules</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Attached Subnets */}
                  <div className="px-6 py-4 border-b border-gray-700">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Attached Subnets</h4>
                    {sgData.subnets && sgData.subnets.length > 0 ? (
                      <ul className="space-y-2">
                        {sgData.subnets.map((subnet, idx) => (
                          <li key={idx} className="text-sm text-gray-300">
                            <span className="text-blue-300 hover:text-blue-200 transition-colors cursor-pointer">
                              <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                                {subnet.name || subnet.id || subnet}
                              </samp>
                            </span>
                            {" "}(
                            <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                              {subnet.virtual_network_name || subnet.virtual_network_id || "Unknown VNet"}
                            </samp>
                            )
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm text-gray-500 italic">
                        <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">None</samp>
                      </div>
                    )}
                  </div>

                  {/* Attached Network Interfaces */}
                  <div className="px-6 py-4">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Attached Network Interfaces</h4>
                    {sgData.network_interfaces && sgData.network_interfaces.length > 0 ? (
                      <ul className="space-y-2">
                        {sgData.network_interfaces.map((ni, idx) => (
                          <li key={idx} className="text-sm text-gray-300">
                            <span className="text-blue-300 hover:text-blue-200 transition-colors cursor-pointer">
                              <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                                {ni.name || ni.id || ni}
                              </samp>
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm text-gray-500 italic">
                        <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">None</samp>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

  
//services.network.subscriptions.id.virtual_networks
  // ---------------- Virtual Networks ----------------
export const VirtualNetworks = ({ data }) => {
  if (!data) return null;

  // Helper function
  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscriptionData]) => {
        const virtualNetworks = subscriptionData?.virtual_networks || {};

        if (!virtualNetworks || Object.keys(virtualNetworks).length === 0) return null;

        return (
          <div key={subscriptionId} className="space-y-6">
            {/* Subscription Header */}
            <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">
              Subscription: {subscriptionId}
            </div>

            {/* Virtual Networks List */}
            <div className="space-y-6">
            {Object.entries(virtualNetworks).map(
              ([vnetId, vnetData]) => (
                  <div
                    key={vnetId}
                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                  >
                  {/* Header */}
                    <div className="bg-blue-600 px-6 py-4">
                      <h4 className="text-lg font-semibold text-white">{vnetData.name || vnetId || "Unnamed Virtual Network"}</h4>
                  </div>

                    {/* Information */}
                    <div className="px-6 py-4 border-b border-gray-700">
                      <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                      <ul className="space-y-3 text-sm text-gray-300">
                        <li className="flex items-center">
                          <span className="font-medium min-w-[200px]">Name:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(vnetData.name)}</samp>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[200px]">Resource GUID:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(vnetData.resource_guid)}</samp>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[200px]">Type:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(vnetData.type)}</samp>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[200px]">Location:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(vnetData.location)}</samp>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[200px]">Provisioning State:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(vnetData.provisioning_state)}</samp>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[200px]">Address Space:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                            {vnetData.address_space?.address_prefixes?.length > 0
                              ? vnetData.address_space.address_prefixes.join(", ")
                              : valueOrNone(vnetData.address_space?.address_prefixes)}
                      </samp>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[200px]">DHCP Options:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(vnetData.dhcp_options)}</samp>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[200px]">Virtual Network Peerings:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(vnetData.virtual_network_peerings)}</samp>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[200px]">Enable VM Protection:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(vnetData.enable_vm_protection)}</samp>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[200px]">Enable DDoS Protection:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(vnetData.enable_ddos_protection)}</samp>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[200px]">DDoS Protection Plan:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(vnetData.ddos_protection_plan)}</samp>
                        </li>
                        <li className="flex items-start">
                          <span className="font-medium min-w-[200px]">Tags:</span>
                          <div className="ml-2 flex flex-wrap gap-2">
                            {vnetData.tags && Object.keys(vnetData.tags).length > 0 ? (
                              Object.values(vnetData.tags).map((tag, idx) => (
                                <samp key={idx} className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                                  {valueOrNone(tag)}
                      </samp>
                              ))
                            ) : (
                              <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">None</samp>
                      )}
                    </div>
                        </li>
                        <li className="flex items-center">
                          <span className="font-medium min-w-[200px]">Resource group:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(vnetData.resource_group_name)}</samp>
                        </li>
                      </ul>
                  </div>

                  {/* Subnets */}
                    <div className="px-6 py-4">
                      <h4 className="text-base font-semibold text-gray-200 mb-3">Subnets</h4>
                      {vnetData.subnets && Object.keys(vnetData.subnets).length > 0 ? (
                        <ul className="space-y-2">
                          {Object.entries(vnetData.subnets).map(
                        ([subnetId, subnet]) => (
                              <li key={subnetId} className="text-sm text-gray-300">
                                <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                                  {subnet.name || subnetId}
                                </samp>
                                {" "}(
                                <span className="text-blue-300 hover:text-blue-200 transition-colors cursor-pointer">
                                  <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                                    {subnet.address_prefix || subnet.id || "Unknown"}
                                  </samp>
                                </span>
                                )
                              </li>
                            )
                          )}
                        </ul>
                      ) : (
                        <div className="text-sm text-gray-500 italic">
                          <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">None</samp>
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

  
//services.network.subscriptions.id.virtual_networks.id.subnets
  // ---------- Subnet ----------
  // ---------------- Network Virtual Network Subnet ----------------
export const NetworkSubnet = ({ data }) => {
  if (!data) return null;

  // Helper function
  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{data.name || "Unnamed Subnet"}</h4>
      </div>

      {/* Information section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
        <ul className="space-y-3 text-sm text-gray-300">
          <li className="flex items-center">
            <span className="font-medium min-w-[220px]">Address Prefix:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(data.address_prefix)}</samp>
          </li>
          <li className="flex items-center">
            <span className="font-medium min-w-[220px]">Address Prefixes:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(data.address_prefixes)}</samp>
          </li>
          <li className="flex items-center">
            <span className="font-medium min-w-[220px]">Provisioning State:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(data.provisioning_state)}</samp>
          </li>
          <li className="flex items-center">
            <span className="font-medium min-w-[220px]">Network Security Group:</span>
        {data.network_security_group ? (
              <span className="ml-2 text-blue-300 hover:text-blue-200 transition-colors cursor-pointer">
                <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                  {data.security_group_name || data.network_security_group}
                </samp>
              </span>
            ) : (
              <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">None</samp>
            )}
          </li>
          <li className="flex items-center">
            <span className="font-medium min-w-[220px]">Route Table:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(data.route_table)}</samp>
          </li>
          <li className="flex items-center">
            <span className="font-medium min-w-[220px]">Interface Endpoints:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(data.interface_endpoints)}</samp>
          </li>
          <li className="flex items-center">
            <span className="font-medium min-w-[220px]">IP Configuration Profiles:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(data.ip_configuration_profiles)}</samp>
          </li>
          <li className="flex items-center">
            <span className="font-medium min-w-[220px]">Service Endpoints:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(data.service_endpoints)}</samp>
          </li>
          <li className="flex items-center">
            <span className="font-medium min-w-[220px]">Service Endpoint Policies:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(data.service_endpoint_policies)}</samp>
          </li>
          <li className="flex items-center">
            <span className="font-medium min-w-[220px]">Service Association Links:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(data.service_association_links)}</samp>
          </li>
          <li className="flex items-center">
            <span className="font-medium min-w-[220px]">Resource Navigation Links:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(data.resource_navigation_links)}</samp>
          </li>
          <li className="flex items-center">
            <span className="font-medium min-w-[220px]">Delegations:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(data.delegations)}</samp>
          </li>
          <li className="flex items-center">
            <span className="font-medium min-w-[220px]">Purpose:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(data.purpose)}</samp>
          </li>
        </ul>
      </div>

      {/* Instances Section */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Instances</h4>
        {data.instances && data.instances.length > 0 ? (
          <ul className="space-y-2">
            {data.instances.map((instanceId, idx) => (
              <li key={idx} className="text-sm text-gray-300">
                <span className="text-blue-300 hover:text-blue-200 transition-colors cursor-pointer">
                  <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                    {data.instances_names?.[instanceId] || instanceId}
                  </samp>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-sm text-gray-500 italic">
            <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">None</samp>
          </div>
        )}
      </div>
    </div>
  );
};
  
//services.network.subscriptions.id.watchers
// ---------------- Network Watchers ----------------
export const NetworkWatchers = ({ data }) => {
  if (!data) return null;

  // Helper function
  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscription]) => {
        if (!subscription.watchers || Object.keys(subscription.watchers).length === 0) return null;

        return (
          <div key={subscriptionId} className="space-y-6">
            {/* Subscription Header */}
            <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">
              Subscription: {subscriptionId}
                </div>

            {/* Watchers List */}
            <div className="space-y-6">
              {Object.entries(subscription.watchers).map(([watcherId, watcher]) => (
                <div
                  key={watcherId}
                  className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-blue-600 px-6 py-4">
                    <h4 className="text-lg font-semibold text-white">{watcher.name || watcherId || "Unnamed Network Watcher"}</h4>
                  </div>

                  {/* Information */}
                  <div className="px-6 py-4">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-center">
                        <span className="font-medium min-w-[200px]">Name:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(watcher.name)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[200px]">Provisioning State:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(watcher.provisioning_state)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[200px]">Location:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(watcher.location)}</samp>
                      </li>
                      <li className="flex items-start">
                        <span className="font-medium min-w-[200px]">Tags:</span>
                        <div className="ml-2 flex flex-wrap gap-2">
                    {watcher.tags && watcher.tags.length > 0 ? (
                      watcher.tags.map((tag, idx) => (
                              <samp key={idx} className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                                {valueOrNone(tag)}
                              </samp>
                      ))
                    ) : (
                            <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">None</samp>
                    )}
                  </div>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[200px]">Resource group:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(watcher.resource_group_name)}</samp>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
              </div>
        </div>
        );
      })}
    </div>
  );
};

  //services.postgresqldatabase.subscriptions.id.servers
// ---------------- PostgreSQL Servers ----------------
export const PostgresServers = ({ data }) => {
  if (!data) return null;

  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscription]) => {
        if (!subscription.servers || Object.keys(subscription.servers).length === 0) return null;

        return (
          <div key={subscriptionId} className="space-y-6">
            {/* Subscription Header */}
            <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">
              Subscription: {subscriptionId}
            </div>

            {/* Servers List */}
            <div className="space-y-6">
              {Object.entries(subscription.servers).map(([serverId, server]) => (
                <div
                  key={serverId}
                  className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-blue-600 px-6 py-4">
                    <h4 className="text-lg font-semibold text-white">{server.name || serverId || "Unnamed PostgreSQL Server"}</h4>
                </div>

                {/* Information */}
                  <div className="px-6 py-4 border-b border-gray-700">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-center">
                        <span className="font-medium min-w-[300px]">PostgreSQL Server Name:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(server.name)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[300px]">Server SSL connection enforcement:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(server.ssl_enforcement)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[300px]">Log checkpoint server parameter:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(server.log_checkpoints?.value)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[300px]">Log connections server parameter:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(server.log_connections?.value)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[300px]">Log disconnections server parameter:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(server.log_disconnections?.value)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[300px]">Log duration server parameter:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(server.log_duration?.value)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[300px]">Connection throttling server parameter:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(server.connection_throttling?.value)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[300px]">Log retention days server parameter:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(server.log_retention_days?.value)}</samp>
                      </li>
                    </ul>
                  </div>

                  {/* Firewall Rules */}
                  <div className="px-6 py-4">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">PostgreSQL Firewall Rules</h4>
                    {server.postgresql_firewall_rules && server.postgresql_firewall_rules.length > 0 ? (
                      <ul className="space-y-2">
                        {server.postgresql_firewall_rules.map((rule, idx) => (
                          <li key={idx} className="text-sm text-gray-300">
                            <div className="font-medium text-gray-200 mb-1">
                              <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(rule.name)}</samp>
                  </div>
                            <ul className="ml-4 space-y-1">
                              <li className="flex items-center">
                                <span className="font-medium min-w-[260px] text-gray-400">PostgreSQL Firewall rule start IP:</span>
                                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(rule.start_ip)}</samp>
                              </li>
                              <li className="flex items-center">
                                <span className="font-medium min-w-[260px] text-gray-400">PostgreSQL Firewall rule end IP:</span>
                                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(rule.end_ip)}</samp>
                              </li>
                            </ul>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm text-gray-500 italic">
                        <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">No firewall rules</samp>
                  </div>
                    )}
                  </div>
                  </div>
              ))}
                  </div>
                  </div>
        );
      })}
                  </div>
  );
};

//services.rbac.subscriptions.id.custom_roles_report
// ---------- RBAC Custom Roles Report Component ----------
export const CustomRolesReport = ({ data }) => {
  if (!data) return null;

  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscriptionData]) => {
        if (!subscriptionData.custom_roles_report) return null;

        return (
          <div key={subscriptionId} className="space-y-6">
            {/* Subscription Header */}
            <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">
              Subscription: {subscriptionId}
                  </div>

            {/* Roles List */}
            <div className="space-y-6">
              {Object.entries(subscriptionData.custom_roles_report).map(([roleId, role]) => (
                <div
                  key={roleId}
                  className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-blue-600 px-6 py-4">
                    <h4 className="text-lg font-semibold text-white">{role.name || role.id || roleId || "Custom Role"}</h4>
                </div>

                  {/* Information */}
                  <div className="px-6 py-4">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-center">
                        <span className="font-medium min-w-[260px]">Role ID:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(role.id || roleId)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[260px]">No Administering Resource Locks Role:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                          {valueOrNone(role.missing_custom_role_administering_resource_locks)}
                        </samp>
                      </li>
                    </ul>
                          </div>
                          </div>
              ))}
                        </div>
                      </div>
        );
      })}
                </div>
  );
};

//services.rbac.subscriptions.id.roles
// ---------------- RBAC Roles ----------------
export const RbacRoles = ({ data }) => {
  if (!data) return null;

  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscription]) => {
        if (!subscription.roles || Object.keys(subscription.roles).length === 0) return null;

        return (
          <div key={subscriptionId} className="space-y-6">
            {/* Subscription Header */}
            <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">
              Subscription: {subscriptionId}
                </div>

            {/* Roles List */}
            <div className="space-y-6">
              {Object.entries(subscription.roles).map(([roleId, role]) => (
                <div
                  key={roleId}
                  className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-blue-600 px-6 py-4">
                    <h4 className="text-lg font-semibold text-white">{role.name || roleId || "RBAC Role"}</h4>
                  </div>

                  {/* Information */}
                  <div className="px-6 py-4 border-b border-gray-700">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">ID:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(role.id)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Description:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(role.description)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Type:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(role.type)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Role Type:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(role.role_type)}</samp>
                      </li>
                      <li className="flex items-start">
                        <span className="font-medium min-w-[220px]">Assignable Scopes:</span>
                        <div className="ml-2 flex flex-wrap gap-2">
                          {Array.isArray(role.assignable_scopes)
                            ? role.assignable_scopes.map((scope, idx) => (
                                <samp key={idx} className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(scope)}</samp>
                              ))
                            : (
                                <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(role.assignable_scopes)}</samp>
                              )}
                  </div>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Custom Subscriptions Owner Roles:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(role.custom_subscription_owner_role)}</samp>
                      </li>
                    </ul>
                </div>

                {/* Permissions */}
                  <div className="px-6 py-4 border-b border-gray-700">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Permissions</h4>
                    {role.permissions && role.permissions.length > 0 ? (
                      <ul className="space-y-2 text-sm text-gray-300">
                        {role.permissions.map((perm, idx) => (
                          <li key={idx}>
                            <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(perm)}</samp>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm text-gray-500 italic">
                        <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">No permissions</samp>
                      </div>
                    )}
                </div>

                {/* Assignments */}
                  <div className="px-6 py-4">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Assignments</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                    {role.assignments?.users && role.assignments.users.length > 0 && (
                      <li>
                          <div className="font-medium text-gray-200 mb-1">Users</div>
                          <ul className="ml-4 space-y-1">
                          {role.assignments.users.map((userId) => (
                              <li key={userId}>
                                <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{userId}</samp>
                            </li>
                          ))}
                        </ul>
                      </li>
                    )}
                    {role.assignments?.groups && role.assignments.groups.length > 0 && (
                      <li>
                          <div className="font-medium text-gray-200 mb-1">Groups</div>
                          <ul className="ml-4 space-y-1">
                          {role.assignments.groups.map((groupId) => (
                              <li key={groupId}>
                                <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{groupId}</samp>
                            </li>
                          ))}
                        </ul>
                      </li>
                    )}
                    {role.assignments?.service_principals && role.assignments.service_principals.length > 0 && (
                      <li>
                          <div className="font-medium text-gray-200 mb-1">Service Principals</div>
                          <ul className="ml-4 space-y-1">
                          {role.assignments.service_principals.map((spId) => (
                              <li key={spId}>
                                <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{spId}</samp>
                            </li>
                          ))}
                        </ul>
                      </li>
                    )}
                      {!role.assignments?.users && !role.assignments?.groups && !role.assignments?.service_principals && (
                        <li>
                          <div className="text-sm text-gray-500 italic">
                            <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">No assignments</samp>
                          </div>
                        </li>
                    )}
                  </ul>
                </div>
        </div>
      ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ---------- Reusable UI Helpers ----------
const Card = ({ title, right, children }) => (
  <div className="bg-gray-900 rounded-2xl shadow-lg mb-4 p-4 text-white">
    {(title || right) && (
      <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-3">
        {title ? (
          <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
        ) : (
          <span />
        )}
        {right}
      </div>
    )}
    {children}
  </div>
);

const SectionTitle = ({ children }) => (
  <h4 className="text-sm tracking-wide uppercase text-gray-400 mb-2">{children}</h4>
);

const BooleanPill = ({ value }) => (
  <span
    className={
      (value ? "bg-emerald-900/40 text-emerald-300 border-emerald-700" : "bg-rose-900/40 text-rose-300 border-rose-700") +
      " inline-flex items-center px-2 py-0.5 text-xs font-medium border rounded-full"
    }
  >
    {String(!!value)}
  </span>
);

// ---------------- Security Center Auto Provisioning Settings ----------------
export const SecurityCenterAutoProvisioningSettings = ({ data }) => {
  if (!data) return null;

  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscription]) => {
        if (!subscription.auto_provisioning_settings || Object.keys(subscription.auto_provisioning_settings).length === 0) return null;

        return (
          <div key={subscriptionId} className="space-y-6">
            {/* Subscription Header */}
            <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">
              Subscription: {subscriptionId}
            </div>

            {/* Settings List */}
            <div className="space-y-6">
              {Object.entries(subscription.auto_provisioning_settings).map(([settingId, setting]) => (
                <div
                  key={settingId}
                  className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-blue-600 px-6 py-4">
                    <h4 className="text-lg font-semibold text-white">{setting.name || settingId || "Auto Provisioning Setting"}</h4>
                </div>

                {/* Information */}
                  <div className="px-6 py-4">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Name:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(setting.name)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Auto Provisioning:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(setting.auto_provision)}</samp>
                      </li>
                    </ul>
                  </div>
                  </div>
              ))}
                </div>
              </div>
        );
      })}
        </div>
  );
};

// ---------------- Security Center Compliance Results ----------------
export const SecurityCenterComplianceResults = ({ data }) => {
  if (!data) return null;

  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscription]) => {
        if (!subscription.compliance_results || Object.keys(subscription.compliance_results).length === 0) return null;

        return (
          <div key={subscriptionId} className="space-y-6">
            {/* Subscription Header */}
            <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">
              Subscription: {subscriptionId}
            </div>

            {/* Compliance Results List */}
            <div className="space-y-6">
              {Object.entries(subscription.compliance_results).map(([resultId, result]) => (
                <div
                  key={resultId}
                  className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-blue-600 px-6 py-4">
                    <h4 className="text-lg font-semibold text-white">{result.name || resultId || "Compliance Result"}</h4>
                </div>

                {/* Information */}
                  <div className="px-6 py-4">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Name:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(result.name)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Resource Status:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(result.resource_status)}</samp>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
              </div>
        </div>
        );
      })}
    </div>
  );
};

// ---------- SecurityCenter Pricings ----------
export const Pricings = ({ data }) => {
  if (!data) return null;

  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscriptionData]) => {
        if (!subscriptionData.pricings) return null;

        return (
          <div key={subscriptionId} className="space-y-6">
            {/* Subscription Header */}
            <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">
              Subscription: {subscriptionId}
            </div>

            {/* Pricings List */}
            <div className="space-y-6">
              {Object.entries(subscriptionData.pricings).map(([pricingId, pricing]) => (
                <div
                  key={pricingId}
                  className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-blue-600 px-6 py-4">
                    <h4 className="text-lg font-semibold text-white">{pricing.name || pricingId || "Security Center Pricing"}</h4>
                  </div>

                  {/* Information */}
                  <div className="px-6 py-4">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Pricing Name:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(pricing.name || pricingId)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Pricing Tier:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(pricing.pricing_tier)}</samp>
                      </li>
                    </ul>
                    </div>
                    </div>
              ))}
                    </div>
                    </div>
        );
      })}
                    </div>
  );
};

// ---------------- Security Center Regulatory Compliance Results ----------------
export const SecurityCenterRegulatoryComplianceResults = ({ data }) => {
  if (!data) return null;

  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscription]) => {
        if (!subscription.regulatory_compliance_results || Object.keys(subscription.regulatory_compliance_results).length === 0) return null;

        return (
          <div key={subscriptionId} className="space-y-6">
            {/* Subscription Header */}
            <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">
              Subscription: {subscriptionId}
                    </div>

            {/* Results List */}
            <div className="space-y-6">
              {Object.entries(subscription.regulatory_compliance_results).map(([resultId, result]) => (
                <div
                  key={resultId}
                  className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-blue-600 px-6 py-4">
                    <h4 className="text-lg font-semibold text-white">{result.name || resultId || "Regulatory Compliance Result"}</h4>
                    </div>

                  {/* Information */}
                  <div className="px-6 py-4">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Standard:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(result.standard_name)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Reference:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(result.reference)}</samp>
                      </li>
                      <li className="flex items-start">
                        <span className="font-medium min-w-[220px]">Description:</span>
                        <i className="ml-2 text-gray-400 italic">{valueOrNone(result.description)}</i>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">State:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(result.state)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Passed Assessments:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(result.passed_assessments)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Failed Assessments:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(result.failed_assessments)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Skipped Assessments:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(result.skipped_assessments)}</samp>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
        </div>
        );
      })}
    </div>
  );
};

// ---------------- Security Center Security Contacts ----------------
export const SecurityCenterSecurityContacts = ({ data }) => {
  if (!data) return null;

  const convertBoolToEnabled = (value) => (value ? "Enabled" : "Disabled");
  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscription]) => {
        if (!subscription.security_contacts || Object.keys(subscription.security_contacts).length === 0) return null;

        return (
          <div key={subscriptionId} className="space-y-6">
            {/* Subscription Header */}
            <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">
              Subscription: {subscriptionId}
            </div>

            {/* Contacts List */}
            <div className="space-y-6">
              {Object.entries(subscription.security_contacts).map(([contactId, contact]) => (
                <div
                  key={contactId}
                  className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-blue-600 px-6 py-4">
                    <h4 className="text-lg font-semibold text-white">{contact.name || contactId || "Security Contact"}</h4>
                  </div>

                  {/* Information */}
                  <div className="px-6 py-4">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Name:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(contact.name)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Email:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(contact.email)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Phone:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(contact.phone)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Notify on Alert:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{convertBoolToEnabled(contact.alert_notifications)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Notify Administrators on Alert:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{convertBoolToEnabled(contact.alerts_to_admins)}</samp>
                      </li>
                    </ul>
                    </div>
                    </div>
              ))}
                    </div>
                    </div>
        );
      })}
                    </div>
  );
};

// ---------------- Security Center Settings ----------------
export const SecurityCenterSettings = ({ data }) => {
  if (!data) return null;

  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscription]) => {
        if (!subscription.settings || Object.keys(subscription.settings).length === 0) return null;

        return (
          <div key={subscriptionId} className="space-y-6">
            {/* Subscription Header */}
            <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">
              Subscription: {subscriptionId}
            </div>

            {/* Settings List */}
            <div className="space-y-6">
              {Object.entries(subscription.settings).map(([settingId, setting]) => (
                <div
                  key={settingId}
                  className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-blue-600 px-6 py-4">
                    <h4 className="text-lg font-semibold text-white">{setting.name || settingId || "Security Center Setting"}</h4>
                </div>

                {/* Information */}
                  <div className="px-6 py-4">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Name:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(setting.name)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Kind:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(setting.kind)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Enabled:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{setting.enabled !== undefined ? String(setting.enabled) : "None"}</samp>
                      </li>
                    </ul>
                  </div>
                  </div>
              ))}
                  </div>
                </div>
        );
      })}
              </div>
  );
};

// ---------------- SQL Database Servers ----------------
export const SQLDatabaseServers = ({ data }) => {
  if (!data) return null;

  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  const enabledDisabled = (v) => (v ? "Enabled" : "Disabled");

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscription]) => {
        if (!subscription.servers || Object.keys(subscription.servers).length === 0) return null;

        return (
          <div key={subscriptionId} className="space-y-6">
            <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">
              Subscription: {subscriptionId}
                  </div>

            <div className="space-y-6">
              {Object.entries(subscription.servers).map(([serverId, server]) => (
                <div key={serverId} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                  <div className="bg-blue-600 px-6 py-4">
                    <h4 className="text-lg font-semibold text-white">{server.name || serverId || "SQL Server"}</h4>
                  </div>

                  <div className="px-6 py-4 border-b border-gray-700">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-center"><span className="font-medium min-w-[260px]">SQL Server Name:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(server.name)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[260px]">Azure AD Admin:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(server.ad_admin?.login)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[260px]">Auditing:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{enabledDisabled(!!server.auditing?.auditing_enabled)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[260px]">Auditing retention period:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(server.auditing?.retention_days)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[260px]">ATP:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{enabledDisabled(!!server.threat_detection?.threat_detection_enabled)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[260px]">ATP alerts:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{enabledDisabled(!!server.threat_detection?.alerts_enabled)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[260px]">Send ATP alerts:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{enabledDisabled(!!server.threat_detection?.send_alerts_enabled)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[260px]">ATP retention period:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(server.threat_detection?.retention_days)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[260px]">Storage account:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(server.server_vulnerability?.storage_account_name)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[260px]">Send vulnerability emails:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{enabledDisabled(!!server.server_vulnerability?.email_subscription_admin)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[260px]">Recurring scans:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{enabledDisabled(!!server.server_vulnerability?.recurring_scans_enabled)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[260px]">Send scan reports configured:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(server.server_vulnerability?.send_scan_reports_to_not_empty)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[260px]">TDE Key Type:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(server.encryption_protectors?.server_key_type)}</samp></li>
                      <li className="flex items-start"><span className="font-medium min-w-[260px]">Tags:</span><div className="ml-2 flex flex-wrap gap-2">{server.tags && server.tags.length > 0 ? server.tags.map((tag, i) => (<samp key={i} className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(tag)}</samp>)) : (<samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">None</samp>)}</div></li>
                      <li className="flex items-center"><span className="font-medium min-w-[260px]">Resource group:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(server.resource_group_name)}</samp></li>
                    </ul>
                  </div>

                {server.databases && Object.keys(server.databases).length > 0 && (
                    <div className="px-6 py-4 border-b border-gray-700">
                      <h4 className="text-base font-semibold text-gray-200 mb-3">SQL Databases</h4>
                      <div className="space-y-3">
                    {Object.entries(server.databases).map(([dbName, db]) => (
                          <div key={dbName} className="bg-gray-700/40 rounded-md p-3">
                            <div className="text-sm text-gray-200 font-medium mb-2">Database name: {dbName}</div>
                            <ul className="space-y-1 text-sm text-gray-300">
                              <li>Auditing: {enabledDisabled(!!db.auditing?.auditing_enabled)}</li>
                              <li>Auditing retention period: {valueOrNone(db.auditing?.retention_days)}</li>
                              <li>Threat detection: {enabledDisabled(!!db.threat_detection?.threat_detection_enabled)}</li>
                              <li>Threat detection alerts: {enabledDisabled(!!db.threat_detection?.alerts_enabled)}</li>
                              <li>Send threat detection alerts: {enabledDisabled(!!db.threat_detection?.send_alerts_enabled)}</li>
                              <li>Threat detection retention period: {valueOrNone(db.threat_detection?.retention_days)}</li>
                              <li>Transparent data encryption: {enabledDisabled(!!db.transparent_data_encryption_enabled)}</li>
                              <li>Geo-replication configured: {valueOrNone(db.replication_configured)}</li>
                              <li><div className="flex items-start"><span className="font-medium mr-2">Tags:</span><div className="flex flex-wrap gap-2">{db.tags && db.tags.length > 0 ? db.tags.map((tag, i) => (<samp key={i} className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(tag)}</samp>)) : (<samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">None</samp>)}</div></div></li>
                              <li>Resource group: {valueOrNone(db.resource_group_name)}</li>
                            </ul>
                      </div>
                    ))}
                      </div>
                  </div>
                )}

                {server.firewall_rules && server.firewall_rules.length > 0 && (
                    <div className="px-6 py-4">
                      <h4 className="text-base font-semibold text-gray-200 mb-3">Firewall Rules</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                    {server.firewall_rules.map((rule, i) => (
                          <li key={i} className="bg-gray-700/40 rounded-md p-3">
                            <div className="font-medium text-gray-200 mb-1">{valueOrNone(rule.name)}</div>
                            <div>Start IP: {valueOrNone(rule.start_ip)}</div>
                            <div>End IP: {valueOrNone(rule.end_ip)}</div>
                          </li>
                        ))}
                      </ul>
                  </div>
                )}
              </div>
              ))}
            </div>
        </div>
        );
      })}
    </div>
  );
};

// ---------------- Storage Accounts ----------------
export const StorageAccounts = ({ data }) => {
  if (!data) return null;

  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  const enabledDisabled = (v) => (v ? "Enabled" : "Disabled");

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscription]) => {
        if (!subscription.storage_accounts || Object.keys(subscription.storage_accounts).length === 0) return null;

        return (
          <div key={subscriptionId} className="space-y-6">
            {/* Subscription Header */}
            <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">
              Subscription: {subscriptionId}
            </div>

            {/* Accounts List */}
            <div className="space-y-6">
              {Object.entries(subscription.storage_accounts).map(([accountId, account]) => (
                <div key={accountId} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                  {/* Header */}
                  <div className="bg-blue-600 px-6 py-4">
                    <h4 className="text-lg font-semibold text-white">{account.name || accountId || "Storage Account"}</h4>
                  </div>

                  {/* Information */}
                  <div className="px-6 py-4 border-b border-gray-700">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-center"><span className="font-medium min-w-[260px]">Storage Account Name:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(account.name)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[260px]">Public Traffic:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{enabledDisabled(!!account.public_traffic_allowed)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[260px]">HTTPS Required:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{enabledDisabled(!!account.https_traffic_enabled)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[260px]">Microsoft Trusted Services:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{enabledDisabled(!!account.trusted_microsoft_services_enabled)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[260px]">Access Key Usage:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{enabledDisabled(!!account.shared_key_access_allowed)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[260px]">Last Access Key Rotation:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(account.access_keys_last_rotation_date) === "None" ? "Never" : valueOrNone(account.access_keys_last_rotation_date)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[260px]">Storage encrypted with Customer Managed Key:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{enabledDisabled(!!account.encryption_key_customer_managed)}</samp></li>
                      <li className="flex items-start"><span className="font-medium min-w-[260px]">Tags:</span><div className="ml-2 flex flex-wrap gap-2">{account.tags && account.tags.length > 0 ? account.tags.map((tag, i) => (<samp key={i} className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(tag)}</samp>)) : (<samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">None</samp>)}</div></li>
                      <li className="flex items-center"><span className="font-medium min-w-[260px]">Resource group:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(account.resource_group_name)}</samp></li>
                    </ul>
                  </div>

                  {/* Blob Containers */}
                  {account.blob_containers && Object.keys(account.blob_containers).length > 0 && (
                    <div className="px-6 py-4 border-b border-gray-700">
                      <h4 className="text-base font-semibold text-gray-200 mb-3">Blob Containers</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        {Object.entries(account.blob_containers).map(([containerName, container]) => (
                          <li key={containerName} className="bg-gray-700/40 rounded-md p-3">
                            <div className="font-medium text-gray-200 mb-1"><samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{containerName}</samp></div>
                            <div>Public Access: {enabledDisabled(!!container.public_access_allowed)}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Blob Services */}
                  {account.blob_services && account.blob_services.length > 0 && (
                    <div className="px-6 py-4">
                      <h4 className="text-base font-semibold text-gray-200 mb-3">Blob Services</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        {account.blob_services.map((service, i) => (
                          <li key={i} className="bg-gray-700/40 rounded-md p-3">
                            <div className="font-medium text-gray-200 mb-1"><samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(service.name)}</samp></div>
                            <div>Soft Delete: {enabledDisabled(!!service.soft_delete_enabled)}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ---------------- Virtual Machines Disks ----------------
export const VirtualMachineDisks = ({ data }) => {
  if (!data) return null;

  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  const enabledDisabled = (v) => (v ? "Enabled" : "Disabled");
  const formatDate = (d) => (d ? new Date(d).toLocaleString() : "None");

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscription]) => {
        if (!subscription.disks || Object.keys(subscription.disks).length === 0) return null;

        return (
          <div key={subscriptionId} className="space-y-6">
            {/* Subscription Header */}
            <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">
              Subscription: {subscriptionId}
            </div>

            {/* Disks List */}
            <div className="space-y-6">
              {Object.entries(subscription.disks).map(([diskId, disk]) => (
                <div key={diskId} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                  {/* Header */}
                  <div className="bg-blue-600 px-6 py-4">
                    <h4 className="text-lg font-semibold text-white">{disk.name || diskId || "Virtual Machine Disk"}</h4>
                  </div>

                  {/* Information */}
                  <div className="px-6 py-4">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-center"><span className="font-medium min-w-[220px]">Name:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(disk.name)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[220px]">Unique ID:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(disk.unique_id)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[220px]">Location:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(disk.location)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[220px]">Time Created:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{formatDate(disk.time_created)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[220px]">Provisioning State:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(disk.provisioning_state)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[220px]">Disk State:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(disk.disk_state)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[220px]">Zones:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(disk.zones)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[220px]">Encryption Type:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(disk.encryption_type)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[220px]">Encrypted using ADE:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{enabledDisabled(!!disk.encryption_ade)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[220px]">OS Type:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(disk.os_type)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[220px]">Hyper V Generation:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(disk.hyper_vgeneration)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[220px]">Disk Size GB:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(disk.disk_size_gb)}</samp></li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};


// ---------------- Virtual Machines Images ----------------
export const VirtualMachineImages = ({ data }) => {
  if (!data) return null;

  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscription]) => {
        if (!subscription.images || Object.keys(subscription.images).length === 0) return null;

        return (
          <div key={subscriptionId} className="space-y-6">
            {/* Subscription Header */}
            <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">
              Subscription: {subscriptionId}
            </div>

            {/* Images List */}
            <div className="space-y-6">
              {Object.entries(subscription.images).map(([imageId, image]) => (
                <div key={imageId} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                  {/* Header */}
                  <div className="bg-blue-600 px-6 py-4">
                    <h4 className="text-lg font-semibold text-white">{image.name || imageId || "Virtual Machine Image"}</h4>
                  </div>

                  {/* Information */}
                  <div className="px-6 py-4">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-center"><span className="font-medium min-w-[220px]">Name:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(image.name)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[220px]">Provisioning State:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(image.provisioning_state)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[220px]">Location:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(image.location)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[220px]">Hyper-V Generation:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(image.hyper_vgeneration)}</samp></li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ---------------- Virtual Machines Instances ----------------
export const VirtualMachineInstances = ({ data }) => {
  if (!data) return null;

  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscription]) => {
        if (!subscription.instances || Object.keys(subscription.instances).length === 0) return null;

        return (
          <div key={subscriptionId} className="space-y-6">
            {/* Subscription Header */}
            <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">
              Subscription: {subscriptionId}
            </div>

            {/* Instances */}
            <div className="space-y-6">
              {Object.entries(subscription.instances).map(([instanceId, instance]) => (
                <div key={instanceId} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                  {/* Header */}
                  <div className="bg-blue-600 px-6 py-4">
                    <h4 className="text-lg font-semibold text-white">{instance.name || instanceId || "Virtual Machine"}</h4>
                  </div>

                  {/* Information */}
                  <div className="px-6 py-4 border-b border-gray-700">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-center"><span className="font-medium min-w-[240px]">Name:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(instance.name)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[240px]">VM ID:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(instance.vm_id)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[240px]">Location:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(instance.location)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[240px]">Zones:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(instance.zones)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[240px]">Proximity Placement Group:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(instance.proximity_placement_group)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[240px]">Availability Set:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(instance.availability_set)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[240px]">Provisioning State:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(instance.provisioning_state)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[240px]">Identity Principal ID:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(instance.identity?.principal_id)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[240px]">License Type:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(instance.license_type)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[240px]">Plan:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(instance.plan)}</samp></li>
                      <li className="flex items-center"><span className="font-medium min-w-[240px]">Hardware Profile:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(instance.hardware_profile)}</samp></li>
                    </ul>
                  </div>

                  {/* Diagnostics Profile */}
                  <div className="px-6 py-4 border-b border-gray-700">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Diagnostics Profile</h4>
                    {instance.diagnostics_profile && Object.keys(instance.diagnostics_profile).length > 0 ? (
                      <ul className="space-y-1 text-sm text-gray-300">
                        {Object.entries(instance.diagnostics_profile).map(([key, value]) => (
                          <li key={key}><samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{key}: {valueOrNone(value)}</samp></li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm text-gray-500 italic"><samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">None</samp></div>
                    )}
                  </div>

                  {/* OS Profile */}
                  <div className="px-6 py-4 border-b border-gray-700">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">OS Profile</h4>
                    {instance.os_profile && Object.keys(instance.os_profile).length > 0 ? (
                      <ul className="space-y-1 text-sm text-gray-300">
                        {Object.entries(instance.os_profile).map(([key, value]) => (
                          <li key={key}><samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{key}: {valueOrNone(value)}</samp></li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm text-gray-500 italic"><samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">None</samp></div>
                    )}
                  </div>

                  {/* Storage Profile */}
                  <div className="px-6 py-4 border-b border-gray-700">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Storage Profile</h4>
                    {instance.storage_profile && Object.keys(instance.storage_profile).length > 0 ? (
                      <ul className="space-y-1 text-sm text-gray-300">
                        {Object.entries(instance.storage_profile).map(([key, value]) => (
                          <li key={key}><samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{key}: {valueOrNone(value)}</samp></li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm text-gray-500 italic"><samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">None</samp></div>
                    )}
                  </div>

                  {/* Additional Capabilities */}
                  <div className="px-6 py-4 border-b border-gray-700">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Additional Capabilities</h4>
                    {instance.additional_capabilities && instance.additional_capabilities.length > 0 ? (
                      <ul className="space-y-1 text-sm text-gray-300">
                        {instance.additional_capabilities.map((cap, idx) => (
                          <li key={idx}><samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(cap)}</samp></li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm text-gray-500 italic"><samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">None</samp></div>
                    )}
                  </div>

                  {/* Tags and Resource Group */}
                  <div className="px-6 py-4 border-b border-gray-700">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Tags & Resource Group</h4>
                    <div className="mb-2 flex items-start">
                      <span className="font-medium min-w-[240px]">Tags:</span>
                      <div className="ml-2 flex flex-wrap gap-2">
                        {instance.tags && instance.tags.length > 0 ? (
                          instance.tags.map((tag, idx) => (
                            <samp key={idx} className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(tag)}</samp>
                          ))
                        ) : (
                          <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">None</samp>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium min-w-[240px]">Resource Group:</span>
                      <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(instance.resource_group_name)}</samp>
                    </div>
                  </div>

                  {/* Network Interfaces */}
                  {instance.network_interfaces && instance.network_interfaces.length > 0 && (
                    <div className="px-6 py-4 border-b border-gray-700">
                      <h4 className="text-base font-semibold text-gray-200 mb-3">Network Interfaces</h4>
                      <ul className="space-y-1 text-sm text-gray-300">
                        {instance.network_interfaces.map((ni, idx) => (
                          <li key={idx}><samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(ni)}</samp></li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Extensions */}
                  {instance.extensions && instance.extensions.length > 0 && (
                    <div className="px-6 py-4">
                      <h4 className="text-base font-semibold text-gray-200 mb-3">Extensions</h4>
                      <ul className="space-y-1 text-sm text-gray-300">
                        {instance.extensions.map((ext, idx) => (
                          <li key={idx}><samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(ext.name)}</samp></li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};


// ---------------- Virtual Machines Snapshots ----------------
//services.virtualmachines.subscriptions.id.snapshots
// ---------------- Virtual Machine Snapshots ----------------
export const VirtualMachineSnapshots = ({ data }) => {
  if (!data) return null;

  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  const formatDate = (date) => (date ? new Date(date).toLocaleString() : "None");

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscription]) => {
        if (!subscription.snapshots || Object.keys(subscription.snapshots).length === 0) return null;

        return (
          <div key={subscriptionId} className="space-y-6">
            {/* Subscription Header */}
            <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">
              Subscription: {subscriptionId}
            </div>

            {/* Snapshots List */}
            <div className="space-y-6">
              {Object.entries(subscription.snapshots).map(([snapshotId, snapshot]) => (
                <div
                  key={snapshotId}
                  className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-blue-600 px-6 py-4">
                    <h4 className="text-lg font-semibold text-white">{snapshot.name || snapshotId || "Virtual Machine Snapshot"}</h4>
                  </div>

                  {/* Information */}
                  <div className="px-6 py-4">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Name:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(snapshot.name)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Unique ID:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(snapshot.unique_id)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Provisioning State:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(snapshot.provisioning_state)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Time Created:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{formatDate(snapshot.time_created)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Location:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(snapshot.location)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Encryption Type:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(snapshot.encryption_type)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">OS Type:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(snapshot.os_type)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Managed By:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(snapshot.managed_by)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Hyper V Generation:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(snapshot.hyper_vgeneration)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Disk Size GB:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(snapshot.disk_size_gb)}</samp>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium min-w-[220px]">Incremental:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{snapshot.incremental !== undefined ? String(snapshot.incremental) : "None"}</samp>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
