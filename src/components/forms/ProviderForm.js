"use client";

import { useState, useEffect } from "react";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import FormButton from "./FormButton";

const ProviderForm = ({
  provider,
  onSubmit,
  loading = false,
  onCancel,
  className = "",
}) => {
  // Form states for different providers
  const [awsForm, setAwsForm] = useState({
    accessKeyId: "",
    secretAccessKey: "",
    region: "",
  });

  const [gcpForm, setGcpForm] = useState({
    serviceAccountKey: "",
    projectId: "",
  });

  const [azureForm, setAzureForm] = useState({
    tenantId: "",
    clientId: "",
    clientSecret: "",
    subscriptionId: "",
  });

  // Debug logs for GCP fields
  useEffect(() => {
    if (provider !== "gcp") return;
  }, [provider, gcpForm.projectId, gcpForm.serviceAccountKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    let formData;
    switch (provider) {
      case "aws":
        formData = awsForm;
        break;
      case "gcp":
        formData = gcpForm;
        break;
      case "azure":
        formData = azureForm;
        break;
      default:
        return;
    }

    await onSubmit(formData);
  };

  const renderAwsForm = () => (
    <>
      <FormInput
        type="text"
        placeholder="Access Key ID"
        value={awsForm.accessKeyId}
        onChange={(e) =>
          setAwsForm({ ...awsForm, accessKeyId: e.target.value })
        }
        required
      />
      <FormInput
        type="password"
        placeholder="Secret Access Key"
        value={awsForm.secretAccessKey}
        onChange={(e) =>
          setAwsForm({ ...awsForm, secretAccessKey: e.target.value })
        }
        required
      />
      <FormInput
        type="text"
        placeholder="Region"
        value={awsForm.region}
        onChange={(e) => setAwsForm({ ...awsForm, region: e.target.value })}
        required
      />
    </>
  );

  const renderGcpForm = () => (
    <>
      <input
        type="file"
        accept="application/json,.json"
        onChange={async (e) => {
          const file = e.target.files && e.target.files[0];
          if (!file) return;
          try {
            // Store raw File to send as multipart/form-data
            setGcpForm({ ...gcpForm, serviceAccountKey: file });
          } catch (err) {
            alert("Invalid JSON file");
          }
        }}
        className="w-full px-4 py-3 bg-[#2a2a31] rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors cursor-pointer"
        required
      />
      <FormTextarea
        placeholder="Project ID"
        value={gcpForm.projectId}
        onChange={(e) => setGcpForm({ ...gcpForm, projectId: e.target.value })}
        rows={2}
        required
      />
    </>
  );

  const renderAzureForm = () => (
    <>
      <FormInput
        type="text"
        placeholder="Tenant ID"
        value={azureForm.tenantId}
        onChange={(e) =>
          setAzureForm({ ...azureForm, tenantId: e.target.value })
        }
        required
      />
      <FormInput
        type="text"
        placeholder="Client ID"
        value={azureForm.clientId}
        onChange={(e) =>
          setAzureForm({ ...azureForm, clientId: e.target.value })
        }
        required
      />
      <FormInput
        type="password"
        placeholder="Client Secret"
        value={azureForm.clientSecret}
        onChange={(e) =>
          setAzureForm({ ...azureForm, clientSecret: e.target.value })
        }
        required
      />
      <FormInput
        type="text"
        placeholder="Subscription ID"
        value={azureForm.subscriptionId}
        onChange={(e) =>
          setAzureForm({
            ...azureForm,
            subscriptionId: e.target.value,
          })
        }
        required
      />
    </>
  );

  const renderFormFields = () => {
    switch (provider) {
      case "aws":
        return renderAwsForm();
      case "gcp":
        return renderGcpForm();
      case "azure":
        return renderAzureForm();
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {renderFormFields()}

      <FormButton type="submit" disabled={loading} variant="primary">
        {loading
          ? `Connecting ${provider.toUpperCase()}...`
          : `Connect ${provider.toUpperCase()}`}
      </FormButton>

      {onCancel && (
        <FormButton type="button" onClick={onCancel} variant="secondary">
          Check Your Scan Reports
        </FormButton>
      )}
    </form>
  );
};

export default ProviderForm;
