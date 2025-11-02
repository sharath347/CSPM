import React, { useState } from "react";

// Helper Components
export const CountBadge = ({ count }) => {
  const isPositive = count && count > 0;
  return (
    <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
      isPositive 
        ? 'bg-gray-600 text-white' 
        : 'bg-gray-700 text-gray-400'
    }`}>
      {count || 0}
    </span>
  );
};

export const AccordionPolicy = ({ name, policyPath, document }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-gray-700 rounded-lg">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-800/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h5 className="text-base font-semibold text-gray-200">
          <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{name}</samp>
        </h5>
        <span className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-full">
          {isOpen ? 'Hide' : 'Details'}
        </span>
      </div>
      {isOpen && (
        <div className="px-4 pb-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap overflow-x-auto">
              {typeof document === 'string' ? document : JSON.stringify(document, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

// ACM Certificate view
export const ACMCertificates = ({ data }) => {
  if (!data) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "None";
    return new Date(dateString).toLocaleString();
  };

  const valueOrNone = (value) => {
    return value || "None";
  };

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([region, regionData]) => {
        const certificates = regionData.certificates || {};

        return (
          <div key={region} className="space-y-6">
            {/* Region Header */}
            <div className="bg-gray-800 px-6 py-4 rounded-lg">
              <h3 className="text-xl font-bold text-white">Region: {region}</h3>
            </div>

            {/* Certificates */}
            {Object.entries(certificates).map(([certId, cert]) => (
              <div key={certId} className="bg-gray-900/30 border border-gray-700 rounded-lg overflow-hidden">
                {/* Certificate Name Header */}
                <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
                  <h4 className="text-lg font-semibold text-white">
                    {cert.DomainName || certId}
                  </h4>
                </div>

                {/* Information Section */}
                <div className="px-6 py-4 border-b border-gray-700">
                  <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                  <div>
                      <span className="text-gray-400">ARN:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(cert.arn)}</samp>
                  </div>
                  <div>
                      <span className="text-gray-400">Domain Name:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(cert.DomainName)}</samp>
                  </div>
                  <div>
                      <span className="text-gray-400">Subject:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(cert.Subject)}</samp>
                  </div>
                  <div>
                      <span className="text-gray-400">Subject Alternative Names:</span>
                      {cert.SubjectAlternativeNames && cert.SubjectAlternativeNames.length > 0 ? (
                        <ul className="ml-4 mt-1 space-y-1">
                          {cert.SubjectAlternativeNames.map((name, i) => (
                            <li key={i} className="text-gray-300">
                              <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{name}</samp>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="ml-2 text-gray-500">None</span>
                      )}
                  </div>
                  <div>
                      <span className="text-gray-400">Status:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(cert.Status)}</samp>
                  </div>
                  <div>
                      <span className="text-gray-400">Issuer:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(cert.Issuer)}</samp>
                  </div>
                  <div>
                      <span className="text-gray-400">Type:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(cert.Type)}</samp>
                  </div>
                  <div>
                      <span className="text-gray-400">Created:</span> {formatDate(cert.CreatedAt)}
                  </div>
                  <div>
                      <span className="text-gray-400">Expiration:</span> {formatDate(cert.NotAfter)}
                  </div>
                    <div>
                      <span className="text-gray-400">Renewal Eligibility:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(cert.RenewalEligibility)}</samp>
                    </div>
                    <div>
                      <span className="text-gray-400">Transparency Logging Preference:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(cert.Options?.CertificateTransparencyLoggingPreference)}</samp>
                    </div>
                  </div>
                  </div>

                {/* Validation Section */}
                <div className="px-6 py-4 border-b border-gray-700">
                  <h4 className="text-base font-semibold text-gray-200 mb-3">Validation</h4>
                  <div className="text-sm text-gray-300">
                    <div>
                      <span className="text-gray-400">Domain Validation Options:</span>
                      {cert.DomainValidationOptions && cert.DomainValidationOptions.length > 0 ? (
                        <ul className="ml-4 mt-1 space-y-1">
                          {cert.DomainValidationOptions.map((opt, i) => (
                            <li key={i} className="text-gray-300">
                              <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">
                                {opt.DomainName} - {opt.ValidationDomain} - {opt.ValidationMethod} - {opt.ValidationStatus}
                              </samp>
                          </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="ml-2 text-gray-500">None</span>
                      )}
                    </div>
                  </div>
                  </div>

                {/* Keys Section */}
                <div className="px-6 py-4">
                  <h4 className="text-base font-semibold text-gray-200 mb-3">Keys</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div>
                      <span className="text-gray-400">Key Algorithm:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(cert.KeyAlgorithm)}</samp>
                    </div>
                    <div>
                      <span className="text-gray-400">Signature Algorithm:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(cert.SignatureAlgorithm)}</samp>
                    </div>
                    <div>
                      <span className="text-gray-400">Key Usages:</span>
                      {cert.KeyUsages && cert.KeyUsages.length > 0 ? (
                        <ul className="ml-4 mt-1 space-y-1">
                          {cert.KeyUsages.map((ku, i) => (
                            <li key={i} className="text-gray-300">
                              <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{ku.Name}</samp>
                          </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="ml-2 text-gray-500">None</span>
                      )}
                  </div>
                    <div>
                      <span className="text-gray-400">Extended Key Usages:</span>
                      {cert.ExtendedKeyUsages && cert.ExtendedKeyUsages.length > 0 ? (
                        <ul className="ml-4 mt-1 space-y-1">
                          {cert.ExtendedKeyUsages.map((eku, i) => (
                            <li key={i} className="text-gray-300">
                              <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{eku.Name} - {eku.OID}</samp>
                          </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="ml-2 text-gray-500">None</span>
                      )}
                  </div>
                    <div>
                      <span className="text-gray-400">In Use By:</span>
                      {cert.InUseBys && cert.InUseBys.length > 0 ? (
                        <ul className="ml-4 mt-1 space-y-1">
                          {cert.InUseBys.map((u, i) => (
                            <li key={i} className="text-gray-300">
                              <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{u}</samp>
                          </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="ml-2 text-gray-500">None</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
  

export const LambdaFunctions = ({ data }) => {
  if (!data) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "None";
    return new Date(dateString).toLocaleString();
  };

  const valueOrNone = (value) => {
    return value || "None";
  };

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([region, regionData]) => {
        const functions = regionData.functions || {};

        return (
          <div key={region} className="space-y-6">
            {/* Region Header */}
            <div className="bg-gray-800 px-6 py-4 rounded-lg">
              <h3 className="text-xl font-bold text-white">Region: {region}</h3>
            </div>

            {/* Functions */}
            {Object.entries(functions).map(([funcId, func]) => (
              <div key={funcId} className="bg-gray-900/30 border border-gray-700 rounded-lg overflow-hidden">
                {/* Function Name Header */}
                <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
                  <h4 className="text-lg font-semibold text-white">
                    {func.name || funcId}
                  </h4>
                </div>

                {/* Information Section */}
                <div className="px-6 py-4 border-b border-gray-700">
                  <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                  <div>
                      <span className="text-gray-400">ARN:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(func.arn)}</samp>
                  </div>
                  <div>
                      <span className="text-gray-400">Description:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(func.description)}</samp>
                  </div>
                  <div>
                      <span className="text-gray-400">Last Modified:</span> {formatDate(func.last_modified)}
                  </div>
                  <div>
                      <span className="text-gray-400">Runtime:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(func.runtime)}</samp>
                  </div>
                  <div>
                      <span className="text-gray-400">Version:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(func.version)}</samp>
                  </div>
                  <div>
                      <span className="text-gray-400">Revision ID:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(func.revision_id)}</samp>
                  </div>
                  <div>
                      <span className="text-gray-400">Execution Role:</span> 
                      {func.execution_role?.RoleName ? (
                        <span className="text-blue-300 hover:text-blue-200 cursor-pointer ml-2">
                          {func.execution_role.RoleName}
                        </span>
                      ) : (
                        <span className="ml-2 text-gray-500">None</span>
                      )}
                  </div>
                  <div>
                      <span className="text-gray-400">Handler:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(func.handler)}</samp>
                  </div>
                  <div>
                      <span className="text-gray-400">Code Size:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(func.code_size)}</samp>
                  </div>
                  <div>
                      <span className="text-gray-400">Memory Size:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(func.memory_size)}</samp>
                  </div>
                  <div>
                      <span className="text-gray-400">Timeout:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(func.timeout)}</samp>
                    </div>
                  </div>
                </div>

                {/* Resource-Based Policy */}
                {func.access_policy && (
                  <div className="px-6 py-4 border-b border-gray-700">
                    <AccordionPolicy
                      name="Resource-Based Policy"
                      policyPath={`awslambda.regions.${region}.functions.${funcId}.access_policy`}
                      document={func.access_policy}
                    />
                  </div>
                )}

                {/* Environment Variables */}
                {func.env_variables && (
                  <div className="px-6 py-4">
                    <AccordionPolicy
                      name="Environment Variables"
                      policyPath={`awslambda.regions.${region}.functions.${funcId}.env_variables`}
                      document={func.env_variables}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export const CloudFormationStacks = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([region, regionData]) => (
        <div key={region} className="space-y-6">
          {/* Region Header */}
          <div className="bg-gray-800 px-6 py-4 rounded-lg">
            <h3 className="text-xl font-bold text-white">Region: {region}</h3>
          </div>
          
          {/* Stacks */}
          {regionData.stacks &&
            Object.entries(regionData.stacks).map(([stackKey, stack]) => (
              <CloudFormationStack
                key={stackKey}
                data={stack}
                region={region}
                stackKey={stackKey}
              />
            ))}
        </div>
      ))}
    </div>
  );
};

export const CloudFormationStack = ({ data, region, stackKey }) => {
  if (!data) return null;

  return (
    <div className="bg-gray-900/30 border border-gray-700 rounded-lg overflow-hidden">
      {/* Stack Name Header */}
      <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
        <h4 className="text-lg font-semibold text-white">{data.name}</h4>
      </div>

      {/* Description */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Description</h4>
        <div className="text-sm text-gray-300">
          {data.Description || "No description"}
        </div>
      </div>

      {/* Information */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
        <div className="space-y-2 text-sm text-gray-300">
          <div>
            <span className="text-gray-400">ARN:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{data.arn}</samp>
        </div>
          <div>
            <span className="text-gray-400">Region:</span> {region}
        </div>
          <div>
            <span className="text-gray-400">Created on:</span> {data.CreationTime}
          </div>
          <div>
            <span className="text-gray-400">Role:</span>
          {data.iam_role ? (
              <div className="flex items-center mt-1">
                <span className="text-blue-300 hover:text-blue-200 cursor-pointer">
                {data.iam_role.name}
              </span>
                <span className="ml-2 text-yellow-400">
                  ⚠️
                </span>
              </div>
          ) : (
              <span className="ml-2 text-gray-500">None</span>
          )}
        </div>
          <div>
            <span className="text-gray-400">Termination protection enabled:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{String(data.EnableTerminationProtection)}</samp>
        </div>
          <div>
            <span className="text-gray-400">Configuration has drifted:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{String(data.drifted)}</samp>
        </div>
          <div>
            <span className="text-gray-400">Deletion policy:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{data.deletion_policy || "None"}</samp>
        </div>
          <div>
            <span className="text-gray-400">Notification ARNs:</span>
              {data.notificationARNs && data.notificationARNs.length > 0 ? (
              <ul className="ml-4 mt-1 space-y-1">
                {data.notificationARNs.map((arn, i) => (
                  <li key={i} className="text-gray-300">
                    <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{arn}</samp>
                  </li>
                ))}
              </ul>
              ) : (
              <span className="ml-2 text-gray-500">None</span>
              )}
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3 flex items-center">
          Capabilities
          <CountBadge count={data.Capabilities?.length || 0} />
        </h4>
        {data.Capabilities && data.Capabilities.length > 0 ? (
          <ul className="space-y-1">
            {data.Capabilities.map((cap, i) => (
              <li key={i} className="text-sm text-gray-300">
              {cap}
            </li>
          ))}
        </ul>
        ) : (
          <p className="text-sm text-gray-500">No capabilities</p>
        )}
      </div>

      {/* Stack Policy */}
      {data.policy && (
        <div className="px-6 py-4">
          <AccordionPolicy
            name="Stack Policy"
            policyPath={`cloudformation.regions.${region}.stacks.${stackKey}.policy`}
            document={data.policy}
          />
        </div>
      )}
    </div>
  );
};
  

export const CloudFrontDistributions = ({ data }) => {
  if (!data) return null;

  return (
    <div>
      {Object.entries(data).map(([key, dist]) => (
        <CloudFrontDistribution key={key} distribution={dist} distKey={key} />
      ))}
    </div>
  );
};

export const CloudFrontDistribution = ({ distribution, distKey }) => {
  if (!distribution) return null;

  const {
    name,
    id,
    arn,
    enabled,
    status,
    last_modified_time,
    comment,
    price_class,
    domain_name,
    web_acl_id,
    is_ipv6_enabled,
    http_version,
    viewer_certificate,
    origins,
  } = distribution;

  const valueOrNone = (value) => {
    return value || "None";
  };

  const convertBoolToEnabled = (value) => {
    if (value === true) return "Enabled";
    if (value === false) return "Disabled";
    return valueOrNone(value);
  };

  return (
    <div className="bg-gray-900/30 border border-gray-700 rounded-lg overflow-hidden">
      {/* Distribution Name Header */}
      <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
        <h4 className="text-lg font-semibold text-white">{name}</h4>
      </div>

      {/* Information Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
        <div className="space-y-2 text-sm text-gray-300">
          <div>
            <span className="text-gray-400">ID:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(id)}</samp>
        </div>
          <div>
            <span className="text-gray-400">ARN:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(arn)}</samp>
        </div>
          <div>
            <span className="text-gray-400">Status:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{convertBoolToEnabled(enabled)}</samp>
        </div>
          <div>
            <span className="text-gray-400">Enabled:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(status)}</samp>
        </div>
          <div>
            <span className="text-gray-400">Last Modified Time:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(last_modified_time)}</samp>
        </div>
          <div>
            <span className="text-gray-400">Comment:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(comment)}</samp>
        </div>
          <div>
            <span className="text-gray-400">Price Class:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(price_class)}</samp>
        </div>
          <div>
            <span className="text-gray-400">Domain Name:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(domain_name)}</samp>
        </div>
          <div>
            <span className="text-gray-400">Web ACL ID:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(web_acl_id)}</samp>
        </div>
          <div>
            <span className="text-gray-400">IPv6 Enabled:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(is_ipv6_enabled)}</samp>
        </div>
          <div>
            <span className="text-gray-400">HTTP Version:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(http_version)}</samp>
        </div>
          <div>
            <span className="text-gray-400">Certificate:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(viewer_certificate?.Certificate)}</samp>
        </div>
          <div>
            <span className="text-gray-400">Minimum TLS Version:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(viewer_certificate?.MinimumProtocolVersion)}</samp>
          </div>
        </div>
      </div>

      {/* Origins Section */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Origins</h4>
        {origins?.Items && origins.Items.length > 0 ? (
          <ul className="space-y-4">
            {origins.Items.map((origin, idx) => (
              <li key={idx} className="bg-gray-800/40 rounded-lg p-4">
                <div className="mb-3">
                  <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 text-sm font-medium">{origin.Id}</samp>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>
                    <span className="text-gray-400">Domain:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(origin.DomainName)}</samp>
                  </li>
                  <li>
                    <span className="text-gray-400">Origin Path:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(origin.OriginPath)}</samp>
                  </li>
                  {origin.S3OriginConfig && (
                    <li>
                      <span className="text-gray-400">S3 Origin Access Identity:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(origin.S3OriginConfig.OriginAccessIdentity)}</samp>
                    </li>
                  )}
                  {origin.CustomOriginConfig && (
                    <li>
                      <span className="text-gray-400">Custom Origin Config:</span>
                      <ul className="ml-4 mt-2 space-y-1">
                        <li>
                          <span className="text-gray-400">Protocol Policy:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(origin.CustomOriginConfig.OriginProtocolPolicy)}</samp>
                        </li>
                        <li>
                          <span className="text-gray-400">SSL/TLS Protocols:</span>
                          {origin.CustomOriginConfig.OriginSslProtocols?.Items && origin.CustomOriginConfig.OriginSslProtocols.Items.length > 0 ? (
                            <ul className="ml-4 mt-1 space-y-1">
                              {origin.CustomOriginConfig.OriginSslProtocols.Items.map((proto, i) => (
                                <li key={i} className="text-gray-300">
                                  <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{proto}</samp>
                                </li>
                            ))}
                          </ul>
                          ) : (
                            <span className="ml-2 text-gray-500">None</span>
                          )}
                        </li>
                      </ul>
                    </li>
                  )}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No origins configured</p>
      )}
      </div>
    </div>
  );
};
  

export const CloudTrailRegions = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-6">
      {Object.entries(data).map(([regionName, regionData]) => (
        <CloudTrailRegion
          key={regionName}
          regionName={regionName}
          regionData={regionData}
        />
      ))}
    </div>
  );
};

export const CloudTrailRegion = ({ regionName, regionData }) => {
  const [isTrailsOpen, setIsTrailsOpen] = useState(false);
  
  if (!regionData) return null;

  const { trails = {}, trails_count = 0 } = regionData;
  const isConfigured = trails_count > 0;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      {/* Region Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{regionName}</h4>
      </div>

      {/* Information Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
        <ul className="space-y-2">
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium">Configured:</span>
            <samp className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              isConfigured 
                ? 'bg-green-600 text-white' 
                : 'bg-red-600 text-white'
            }`}>
              {isConfigured ? 'True' : 'False'}
            </samp>
          </li>
        </ul>
      </div>

      {/* Trails Accordion */}
      <div className="px-6 py-4">
        <div className="border border-gray-700 rounded-lg">
          <div 
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-800/50 transition-colors"
            onClick={() => setIsTrailsOpen(!isTrailsOpen)}
          >
            <h4 className="text-base font-semibold text-gray-200">
              Trails
              <CountBadge count={trails_count} />
            </h4>
            <span className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-full">
              {isTrailsOpen ? 'Hide' : 'Details'}
            </span>
          </div>
          
          {isTrailsOpen && trails_count > 0 && (
            <div className="px-4 pb-4">
              <div className="space-y-2">
                {Object.entries(trails).map(([trailKey, trail]) => (
                  <div key={trailKey} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <span className="text-sm text-gray-200 font-medium">{trail.name}</span>
                    <span className="text-xs text-blue-400">View Details</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const CloudTrailTrails = ({ data }) => {
  if (!data) return null;

  return (
    <div>
      {Object.entries(data).map(([region, trailsInRegion]) =>
        Object.entries(trailsInRegion).map(([trailId, trail]) => (
          <CloudTrailTrail
            key={`${region}-${trailId}`}
            trail={trail}
            trailId={trailId}
            region={region}
          />
        ))
      )}
    </div>
  );
};

export const CloudTrailTrail = ({ trail, trailId, region }) => {
  if (!trail) return null;

  // Helper functions
  const convertBoolToEnabled = (val) => (val ? "Enabled" : "Disabled");
  const formatDate = (date) => (date ? new Date(date).toLocaleString() : "N/A");
  const valueOrNone = (value) => value || "None";

  const {
    name,
    arn,
    scout_link,
    is_organization_trail,
    IsLogging,
    StartLoggingTime,
    StopLoggingTime,
    IsMultiRegionTrail,
    ManagementEventsEnabled,
    DataEventsEnabled,
    IncludeGlobalServiceEvents,
    bucket_id,
    S3KeyPrefix,
    LogFileValidationEnabled,
    KmsKeyId,
    LatestCloudWatchLogsDeliveryTime,
  } = trail;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Trail Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{name}</h4>
      </div>

      {/* Information Section */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-4">Information</h4>
        <ul className="space-y-3">
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[120px]">ARN:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
              {arn}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[120px]">Region:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {region}
            </samp>
            {scout_link && (
              <span className="ml-2 text-yellow-400">
                <i className="fa fa-exclamation-triangle" /> multi-region trail
              </span>
            )}
          </li>

          {!scout_link && (
            <>
              <li className="flex items-center text-sm text-gray-300">
                <span className="font-medium min-w-[120px]">Organization Trail:</span>
                <span className="ml-2">{String(is_organization_trail)}</span>
              </li>
              
              <li className="flex items-center text-sm text-gray-300">
                <span className="font-medium min-w-[120px]">Logging:</span>
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
                  IsLogging ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                }`}>
                  {convertBoolToEnabled(IsLogging)}
                </span>
              </li>
              
              <li className="flex items-center text-sm text-gray-300">
                <span className="font-medium min-w-[120px]">Start Logging Time:</span>
                <span className="ml-2">{formatDate(StartLoggingTime)}</span>
              </li>
              
              <li className="flex items-center text-sm text-gray-300">
                <span className="font-medium min-w-[120px]">Stop Logging Time:</span>
                <span className="ml-2">{formatDate(StopLoggingTime)}</span>
              </li>
              
              <li className="flex items-center text-sm text-gray-300">
                <span className="font-medium min-w-[120px]">Multi Region:</span>
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
                  IsMultiRegionTrail ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                }`}>
                  {convertBoolToEnabled(IsMultiRegionTrail)}
                </span>
              </li>
              
              <li className="flex items-center text-sm text-gray-300">
                <span className="font-medium min-w-[120px]">Management Events:</span>
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
                  ManagementEventsEnabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                }`}>
                  {convertBoolToEnabled(ManagementEventsEnabled)}
                </span>
              </li>
              
              <li className="flex items-center text-sm text-gray-300">
                <span className="font-medium min-w-[120px]">Data Events:</span>
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
                  DataEventsEnabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                }`}>
                  {convertBoolToEnabled(DataEventsEnabled)}
                </span>
              </li>
              
              <li className="flex items-start text-sm text-gray-300">
                <span className="font-medium min-w-[120px]">Include Global Services:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                    {IncludeGlobalServiceEvents
                      ? `Enabled${!IsLogging ? " (Trail disabled)" : ""}`
                      : "Disabled"}
                  </samp>
              </li>
              
              <li className="flex items-start text-sm text-gray-300">
                <span className="font-medium min-w-[120px]">Destination S3 Bucket:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
                  {bucket_id ? `${S3KeyPrefix}` : S3KeyPrefix}
                </samp>
              </li>
              
              <li className="flex items-center text-sm text-gray-300">
                <span className="font-medium min-w-[120px]">Log File Validation:</span>
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
                  LogFileValidationEnabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                }`}>
                  {convertBoolToEnabled(LogFileValidationEnabled)}
                </span>
              </li>
              
              <li className="flex items-center text-sm text-gray-300">
                <span className="font-medium min-w-[120px]">KMS Key:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                  {valueOrNone(KmsKeyId)}
                </samp>
              </li>
              
              <li className="flex items-center text-sm text-gray-300">
                <span className="font-medium min-w-[120px]">Latest CloudWatch Delivery:</span>
                <span className="ml-2">{formatDate(LatestCloudWatchLogsDeliveryTime)}</span>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
  
export const CloudWatchAlarms = ({ data }) => {
  if (!data) return null;

  return (
    <div>
      {Object.entries(data).map(([region, alarmsInRegion]) =>
        Object.entries(alarmsInRegion).map(([alarmId, alarm]) => (
          <CloudWatchAlarm
            key={`${region}-${alarmId}`}
            alarm={alarm}
            alarmId={alarmId}
            region={region}
          />
        ))
      )}
    </div>
  );
};

export const CloudWatchAlarm = ({ alarm, alarmId, region }) => {
  if (!alarm) return null;

  // Helper functions
  const valueOrNone = (value) => value || "None";

  const {
    name,
    ActionsEnabled,
    StateValue,
    Namespace,
    MetricName,
    AlarmActions = [],
    InsufficientDataActions = [],
  } = alarm;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Alarm Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{name}</h4>
      </div>

      {/* Information Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-4">Information</h4>
        <ul className="space-y-3">
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[120px]">Name:</span>
            <span className="ml-2">{name}</span>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[120px]">Region:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {region}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[120px]">Actions enabled:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              ActionsEnabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {String(ActionsEnabled)}
            </span>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[120px]">State:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              StateValue === 'OK' ? 'bg-green-600 text-white' : 
              StateValue === 'ALARM' ? 'bg-red-600 text-white' : 
              'bg-yellow-600 text-white'
            }`}>
              {StateValue}
            </span>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[120px]">Metric:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {Namespace}::{MetricName}
            </samp>
          </li>
        </ul>
      </div>

      {/* Alarm Actions Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">
          Alarm Actions
          <CountBadge count={AlarmActions.length} />
        </h4>
        {AlarmActions.length > 0 ? (
          <ul className="space-y-2">
            {AlarmActions.map((action, idx) => (
              <li key={idx} className="flex items-center text-sm text-gray-300">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></span>
                <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
                {action}
                </samp>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center text-sm text-yellow-400 bg-yellow-900/20 px-3 py-2 rounded-lg">
            <i className="fa fa-exclamation-triangle mr-2"></i>
            <span>No actions have been configured for this alarm.</span>
          </div>
        )}
      </div>

      {/* Insufficient Data Actions Section */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-3">
          Insufficient Data Actions
          <CountBadge count={InsufficientDataActions.length} />
        </h4>
        {InsufficientDataActions.length > 0 ? (
          <ul className="space-y-2">
          {InsufficientDataActions.map((action, idx) => (
              <li key={idx} className="flex items-center text-sm text-gray-300">
                <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 flex-shrink-0"></span>
                <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
              {action}
                </samp>
            </li>
          ))}
        </ul>
        ) : (
          <div className="text-sm text-gray-500 italic">No insufficient data actions configured</div>
        )}
      </div>
    </div>
  );
};

// CloudWatch Metric Filter View
export const CloudWatchMetricFilters = ({ data }) => {
  if (!data) return null;

  return (
    <div>
      {Object.entries(data).map(([region, filtersInRegion]) =>
        Object.entries(filtersInRegion).map(([filterId, filter]) => (
          <CloudWatchMetricFilter
            key={`${region}-${filterId}`}
            filter={filter}
            filterId={filterId}
            region={region}
          />
        ))
      )}
    </div>
  );
};

export const CloudWatchMetricFilter = ({ filter, filterId, region }) => {
  if (!filter) return null;

  // Helper functions
  const formatDate = (date) => (date ? new Date(date).toLocaleString() : "N/A");
  const valueOrNone = (value) => value || "None";

  const {
    name,
    arn,
    creation_time,
    log_group_name,
    pattern,
  } = filter;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Filter Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{name}</h4>
      </div>

      {/* Information Section */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-4">Information</h4>
        <div className="space-y-3">
          <div className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Name:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(name)}
            </samp>
        </div>
          
          <div className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">ARN:</span>
            <code className="ml-2 bg-gray-700 px-2 py-1 rounded text-green-300 font-mono text-xs break-all">
              {valueOrNone(arn)}
            </code>
        </div>
          
          <div className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Creation Time:</span>
            <span className="ml-2">{formatDate(creation_time)}</span>
        </div>
          
          <div className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Log Group Name:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(log_group_name)}
            </samp>
        </div>
          
          <div className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Pattern:</span>
            <code className="ml-2 bg-gray-700 px-2 py-1 rounded text-green-300 font-mono text-xs break-all">
              {valueOrNone(pattern)}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

  export const ConfigRecorderView = ({ recorder }) => {
    if (!recorder) return null;

    // Helper functions
    const formatDate = (date) => (date ? new Date(date).toLocaleString() : "N/A");
    const valueOrNone = (value) => value || "None";
  
    return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Recorder Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{recorder.name}</h4>
      </div>

      {/* Information Section */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-4">Information</h4>
        <ul className="space-y-3">
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Enabled:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              recorder.enabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {recorder.enabled ? 'Yes' : 'No'}
            </span>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Region:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {recorder.region}
            </samp>
          </li>
          
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Role ARN:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
              {recorder.role_ARN}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Last Status:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              recorder.last_status === 'SUCCESS' ? 'bg-green-600 text-white' : 
              recorder.last_status === 'FAILED' ? 'bg-red-600 text-white' : 
              'bg-yellow-600 text-white'
            }`}>
              {recorder.last_status}
            </span>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Last Start Time:</span>
            <span className="ml-2">{formatDate(recorder.last_start_time)}</span>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Last Status Change:</span>
            <span className="ml-2">{formatDate(recorder.last_status_change_time)}</span>
          </li>
        </ul>
      </div>
      </div>
    );
  };
  

  export const ConfigRuleView = ({ rule }) => {
    if (!rule) return null;
  
    return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Rule Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{rule.name}</h4>
      </div>

      {/* Information Section */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-4">Information</h4>
        <ul className="space-y-3">
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">ID:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {rule.id}
            </samp>
          </li>
          
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">ARN:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
              {rule.arn}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Region:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {rule.region}
            </samp>
          </li>
          
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Description:</span>
            <i className="ml-2 text-gray-400 italic">{rule.description}</i>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">State:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              rule.state === 'ACTIVE' ? 'bg-green-600 text-white' : 
              rule.state === 'DELETING' ? 'bg-red-600 text-white' : 
              'bg-yellow-600 text-white'
            }`}>
              {rule.state}
            </span>
          </li>
        </ul>
      </div>
      </div>
    );
  };

  export const ConfigRegionView = ({ data }) => {
    if (!data) return null;
  
    // data is an object of regions, so get the values
    const regions = Object.values(data);
  
    return (
    <div className="space-y-6">
        {regions.map((region) => (
        <ConfigRegion
          key={region.id}
          region={region}
        />
      ))}
    </div>
  );
};

export const ConfigRegion = ({ region }) => {
  const [isRecordersOpen, setIsRecordersOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  
  if (!region) return null;

  const { name, recorders = {}, recorders_count = 0, rules = {}, rules_count = 0 } = region;
  const isConfigured = recorders_count > 0;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      {/* Region Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{name}</h4>
      </div>

      {/* Information Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
        <ul className="space-y-2">
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium">AWS Config Recorder enabled:</span>
            <samp className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              isConfigured 
                ? 'bg-green-600 text-white' 
                : 'bg-red-600 text-white'
            }`}>
              {isConfigured ? 'true' : 'false'}
            </samp>
          </li>
        </ul>
      </div>

      {/* Recorders Accordion */}
      <div className="px-6 py-4 border-b border-gray-700">
        <div className="border border-gray-700 rounded-lg">
          <div 
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-800/50 transition-colors"
            onClick={() => setIsRecordersOpen(!isRecordersOpen)}
          >
            <h4 className="text-base font-semibold text-gray-200">
              Recorders
              <CountBadge count={recorders_count} />
              </h4>
            <span className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-full">
              {isRecordersOpen ? 'Hide' : 'Details'}
            </span>
          </div>
          
          {isRecordersOpen && recorders_count > 0 && (
            <div className="px-4 pb-4">
              <div className="space-y-2">
                {Object.entries(recorders).map(([recorderKey, recorder]) => (
                  <div key={recorderKey} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <span className="text-sm text-gray-200 font-medium">{recorder.name}</span>
                    <span className="text-xs text-blue-400">View Details</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
            </div>
  
      {/* Rules Accordion */}
      <div className="px-6 py-4">
        <div className="border border-gray-700 rounded-lg">
          <div 
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-800/50 transition-colors"
            onClick={() => setIsRulesOpen(!isRulesOpen)}
          >
            <h4 className="text-base font-semibold text-gray-200">
              Rules
              <CountBadge count={rules_count} />
              </h4>
            <span className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-full">
              {isRulesOpen ? 'Hide' : 'Details'}
            </span>
            </div>
          
          {isRulesOpen && rules_count > 0 && (
            <div className="px-4 pb-4">
              <div className="space-y-2">
                {Object.entries(rules).map(([ruleKey, rule]) => (
                  <div key={ruleKey} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <span className="text-sm text-gray-200 font-medium">{rule.name}</span>
                    <span className="text-xs text-blue-400">View Details</span>
          </div>
        ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    );
  };

  export const DynamoDBTables = ({ data }) => {
    if (!data) return null;
  
    return (
    <div className="space-y-6">
        {Object.entries(data).map(([region, regionData]) => (
        <div key={region} className="space-y-4">
          <h3 className="text-xl font-bold text-gray-100">{region}</h3>
            {regionData.tables &&
            Object.entries(regionData.tables).map(([tableId, table]) => (
              <DynamoDBTable
                key={tableId}
                table={table}
                tableId={tableId}
                region={region}
              />
            ))}
        </div>
      ))}
    </div>
  );
};

export const DynamoDBTable = ({ table, tableId, region }) => {
  if (!table) return null;

  // Helper functions
  const valueOrNone = (value) => value || "None";
  const formatDate = (date) => (date ? new Date(date).toLocaleString() : "N/A");
  const convertBoolToEnabled = (val) => (val ? "Enabled" : "Disabled");

  const {
    name,
    id,
    arn,
    table_status,
    creation_date_time,
    automatic_backups_enabled,
    item_count,
    tags = [],
  } = table;
  
                return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Table Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{name}</h4>
                    </div>
  
      {/* Information Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-4">Information</h4>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">ID:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(id)}
            </samp>
                      </div>
          
          <div className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">ARN:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
              {valueOrNone(arn)}
            </samp>
                      </div>
          
          <div className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Status:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              table_status === 'ACTIVE' ? 'bg-green-600 text-white' : 
              table_status === 'CREATING' ? 'bg-yellow-600 text-white' : 
              table_status === 'DELETING' ? 'bg-red-600 text-white' : 
              'bg-gray-600 text-white'
            }`}>
              {valueOrNone(table_status)}
            </span>
                      </div>
          
          <div className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Creation Date:</span>
            <span className="ml-2">{formatDate(creation_date_time)}</span>
                      </div>
          
          <div className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Automatic Backups:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              automatic_backups_enabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {convertBoolToEnabled(automatic_backups_enabled)}
            </span>
                      </div>
          
          <div className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Item Count:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(item_count)}
            </samp>
          </div>
                      </div>
                    </div>
  
      {/* Tags Section */}
                    {tags.length > 0 && (
        <div className="px-6 py-4">
          <h4 className="text-base font-semibold text-gray-200 mb-3">Tags</h4>
          <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
              <div key={tag.Key} className="flex items-center bg-gray-700 rounded-lg px-3 py-2">
                <samp className="text-blue-300 font-mono text-xs mr-2">{tag.Key}</samp>
                <span className="text-gray-400 text-xs mr-2">:</span>
                <samp className="text-green-300 font-mono text-xs">{tag.Value}</samp>
              </div>
            ))}
          </div>
                      </div>
                    )}
      </div>
    );
  };

// ---------------- Utility Components ----------------
export const ResourceLink = ({ resourcePath, name, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick(resourcePath);
    } else {
      // Fallback to console log or other action
      console.log('Navigate to:', resourcePath);
      // You could also emit an event or use a state management solution
      // window.dispatchEvent(new CustomEvent('navigateToResource', { detail: resourcePath }));
    }
  };

  return (
    <a 
      href="#" 
      onClick={handleClick}
      className="text-blue-300 hover:text-blue-200 transition-colors cursor-pointer"
    >
      {name || resourcePath}
    </a>
  );
};

// Small helper for CIDR/IP lists
export const IPGrants = ({ items }) => (
  <ul>
    {items.map((item, idx) => (
      <li key={idx}>{item.CIDR}</li>
    ))}
  </ul>
);

// Show usage (resources attached to SG)
export const SGResourceList = ({ usedBy, group, region, vpc }) => {
  if (!usedBy || Object.keys(usedBy).length === 0) {
    return (
      <div className="flex items-center text-sm text-green-400 bg-green-900/20 px-3 py-2 rounded-lg">
        <i className="fa fa-check-circle mr-2"></i>
        <span>This security group is not in use.</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Object.entries(usedBy).map(([service, resourceTypes]) => (
        <div key={service} className="space-y-2">
          {Object.entries(resourceTypes).map(([resourceType, resources]) => (
            <div key={resourceType} className="bg-gray-700 rounded-lg p-4">
              <h5 className="text-sm font-semibold text-gray-200 mb-3">
                {service.charAt(0).toUpperCase() + service.slice(1)} {resourceType.charAt(0).toUpperCase() + resourceType.slice(1)}
                <CountBadge count={resources.length} />
              </h5>
              <div className="space-y-1">
                {resources.map((res) => (
                  <div key={res.id || res.arn} className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 flex-shrink-0"></span>
                    <ResourceLink 
                      resourcePath={`services.${service}.regions.${region}.vpcs.${vpc}.${resourceType}.${res.id}`}
                      name={res.name || res.id}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

//sg rule list
export const SGRuleList = ({ rules, sgName, sgId, region, vpc }) => {
  if (!rules) return <div>No rules defined.</div>;

  return (
    <>
      {Object.entries(rules).map(([direction, rule]) => (
        <div key={direction} className="px-6 py-4 border-b border-gray-700">
          <h4 className="text-base font-semibold text-gray-200 mb-3">
            {direction.charAt(0).toUpperCase() + direction.slice(1)} Rules
            <CountBadge count={rule.count} />
          </h4>

          <div className="space-y-4">
          {Object.entries(rule.protocols).map(([protocol, protoData]) => (
              <div key={protocol} className="bg-gray-700 rounded-lg p-4">
                <h5 className="text-sm font-semibold text-gray-200 mb-3">{protocol}</h5>
                <div className="space-y-3">
                {Object.entries(protoData.ports).map(([port, portData]) => (
                    <div key={port} className="bg-gray-800 rounded-lg p-3">
                      <div className="text-sm font-medium text-blue-300 mb-2">
                        {protocol === 'ICMP' ? 'Message types' : 'Ports'}: {port}
                      </div>

                      {portData.cidrs && portData.cidrs.length > 0 && (
                        <div className="mb-2">
                          <div className="text-xs font-medium text-gray-400 mb-1">IP addresses:</div>
                          <div className="flex flex-wrap gap-1">
                            {portData.cidrs.map((cidr, idx) => (
                              <span key={idx} className="bg-gray-700 px-2 py-1 rounded text-xs text-blue-300 font-mono">
                                {cidr.CIDR}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {portData.Ipv6Ranges && portData.Ipv6Ranges.length > 0 && (
                        <div className="mb-2">
                          <div className="text-xs font-medium text-gray-400 mb-1">IPv6 addresses:</div>
                          <div className="flex flex-wrap gap-1">
                            {portData.Ipv6Ranges.map((ipv6, idx) => (
                              <span key={idx} className="bg-gray-700 px-2 py-1 rounded text-xs text-green-300 font-mono">
                                {ipv6.CIDR}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {portData.security_groups && portData.security_groups.length > 0 && (
                        <div>
                          <div className="text-xs font-medium text-gray-400 mb-1">EC2 security groups:</div>
                          <div className="flex flex-wrap gap-1">
                          {portData.security_groups.map((sg, idx) => (
                              <span key={idx} className="bg-gray-700 px-2 py-1 rounded text-xs text-yellow-300 font-mono">
                              {sg.GroupName} ({sg.GroupId})
                              </span>
                          ))}
                          </div>
                        </div>
                    )}
                    </div>
                ))}
                </div>
            </div>
          ))}
          </div>

          {sgName === "default" && (
            <div className="mt-3 flex items-center text-sm text-yellow-400 bg-yellow-900/20 px-3 py-2 rounded-lg">
              <i className="fa fa-exclamation-triangle mr-2"></i>
              <span>Default security groups should have no rules.</span>
            </div>
          )}
        </div>
      ))}
    </>
  );
};


// Single SG component with boxed sections
export const SecurityGroup = ({ sg, vpcId, region }) => {
  // Helper function
  const valueOrNone = (value) => value || "None";

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Security Group Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{sg.name}</h4>
      </div>

      {/* Information Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-4">Information</h4>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">ID:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(sg.id)}
            </samp>
      </div>
        
        <div className="flex items-start text-sm text-gray-300">
          <span className="font-medium min-w-[140px]">ARN:</span>
          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
            {valueOrNone(sg.arn)}
          </samp>
    </div>

        <div className="flex items-center text-sm text-gray-300">
          <span className="font-medium min-w-[140px]">Region:</span>
          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
            {region}
          </samp>
    </div>

        <div className="flex items-center text-sm text-gray-300">
          <span className="font-medium min-w-[140px]">VPC:</span>
          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
            {vpcId}
          </samp>
        </div>
        
        <div className="flex items-start text-sm text-gray-300">
          <span className="font-medium min-w-[140px]">Description:</span>
          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
            {valueOrNone(sg.description)}
          </samp>
        </div>
      </div>
    </div>

    {/* Rules Section */}
    <SGRuleList rules={sg.rules} sgName={sg.name} sgId={sg.id} region={region} vpc={vpcId} />

    {/* Usage Section */}
    <div className="px-6 py-4">
      <h4 className="text-base font-semibold text-gray-200 mb-4">Usage</h4>
      <SGResourceList usedBy={sg.used_by} group={sg.id} region={region} vpc={vpcId} />
    </div>
  </div>
  );
};


// Per-region SG renderer
const RegionSecurityGroups = ({ regionData }) => (
  <>
    {Object.values(regionData.vpcs).map((vpc) =>
      Object.values(vpc.security_groups).map((sg) => (
        <SecurityGroup
          key={sg.id}
          sg={sg}
          vpcId={vpc.id}
          region={regionData.region}
        />
      ))
    )}
  </>
);

// Top-level renderer
export const EC2SecurityGroup = ({ data }) => {
  if (!data) return <div>No EC2 security group data available.</div>;

  return (
    <div className="space-y-6">
      {Object.values(data).map((regionData) => (
        <div key={regionData.id} className="space-y-4">
          <h3 className="text-xl font-bold text-gray-100">{regionData.name}</h3>
          <RegionSecurityGroups regionData={regionData} />
        </div>
      ))}
    </div>
  );
};


// ---------------- EC2 Instance Partial ----------------
// Example network interface component
export const NetworkInterface = ({ ni, region, vpc }) => {
  if (!ni) return null;

  // Helper function
  const valueOrNone = (value) => value || "None";
  
  return (
    <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-300">
          <span className="font-medium min-w-[100px]">ID:</span>
          <samp className="ml-2 bg-gray-800 px-2 py-1 rounded text-blue-300 font-mono text-xs">
            {valueOrNone(ni.id)}
          </samp>
        </div>
        
        <div className="flex items-center text-sm text-gray-300">
          <span className="font-medium min-w-[100px]">Private IP:</span>
          <samp className="ml-2 bg-gray-800 px-2 py-1 rounded text-blue-300 font-mono text-xs">
            {valueOrNone(ni.private_ip)}
          </samp>
        </div>
        
        <div className="flex items-center text-sm text-gray-300">
          <span className="font-medium min-w-[100px]">Subnet:</span>
          <samp className="ml-2 bg-gray-800 px-2 py-1 rounded text-blue-300 font-mono text-xs">
            {valueOrNone(ni.subnet)}
          </samp>
        </div>
        
        {ni.security_groups && ni.security_groups.length > 0 && (
          <div className="text-sm text-gray-300">
            <span className="font-medium min-w-[100px] inline-block">Security Groups:</span>
            <div className="ml-2 mt-1 space-y-1">
            {ni.security_groups.map((sg, idx) => (
                <div key={idx} className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 flex-shrink-0"></span>
                  <samp className="bg-gray-800 px-2 py-1 rounded text-green-300 font-mono text-xs">
                    {sg}
                  </samp>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const EC2Instances = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-6">
      {Object.entries(data).map(([region, vpcs]) => (
        <div key={region} className="space-y-4">
          <h3 className="text-xl font-bold text-gray-100">{region}</h3>
          {Object.entries(vpcs).map(([vpcId, instancesObj]) => (
            <div key={vpcId} className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-200">VPC: {vpcId}</h4>
              {Object.entries(instancesObj).map(([instanceId, instance]) => (
                <EC2Instance
                  key={instanceId}
                  instance={instance}
                  instanceId={instanceId}
                  region={region}
                  vpcId={vpcId}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const EC2Instance = ({ instance, instanceId, region, vpcId }) => {
  if (!instance) return null;

  // Helper functions
  const valueOrNone = (value) => value || "None";
  const convertBoolToEnabled = (val) => (val ? "Enabled" : "Disabled");
  const formatDate = (date) => (date ? new Date(date).toLocaleString() : "N/A");

  const {
    name,
    arn,
    id,
    availability_zone,
    reservation_id,
    iam_role,
    monitoring_enabled,
    KeyName,
    State,
    InstanceType,
    LaunchTime,
    network_interfaces,
    metadata_options,
    user_data,
    user_data_secrets,
  } = instance;

                return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Instance Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{name || instanceId}</h4>
                    </div>

      {/* Information Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-4">Information</h4>
        <ul className="space-y-3">
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">ARN:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
              {valueOrNone(arn)}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">ID:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(id)}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Region:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {region}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Availability Zone:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(availability_zone)}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">VPC:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {vpcId}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Reservation ID:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(reservation_id)}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">IAM Role:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(iam_role)}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Monitoring:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              monitoring_enabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {convertBoolToEnabled(monitoring_enabled)}
            </span>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Access Key Name:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(KeyName)}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">State:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              State?.Name === 'running' ? 'bg-green-600 text-white' : 
              State?.Name === 'stopped' ? 'bg-red-600 text-white' : 
              State?.Name === 'pending' ? 'bg-yellow-600 text-white' : 
              'bg-gray-600 text-white'
            }`}>
              {State?.Name ? State.Name.charAt(0).toUpperCase() + State.Name.slice(1) : 'N/A'}
            </span>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Instance Type:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(InstanceType)}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Up Since:</span>
            <span className="ml-2">{formatDate(LaunchTime)}</span>
          </li>
                      </ul>
                    </div>

      {/* Network Interfaces Section */}
                    {network_interfaces && (
        <div className="px-6 py-4 border-b border-gray-700">
          <h4 className="text-base font-semibold text-gray-200 mb-3">Network Interfaces</h4>
          <div className="space-y-3">
                        {Object.entries(network_interfaces).map(([niKey, ni]) => (
                          <NetworkInterface key={niKey} ni={ni} region={region} vpc={vpcId} />
                        ))}
          </div>
                      </div>
                    )}

      {/* Metadata Options Section */}
                    {metadata_options && (
        <div className="px-6 py-4 border-b border-gray-700">
          <h4 className="text-base font-semibold text-gray-200 mb-3">Metadata Options</h4>
          <ul className="space-y-2">
            <li className="flex items-center text-sm text-gray-300">
              <span className="font-medium min-w-[140px]">Endpoint:</span>
              <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                {metadata_options.HttpEndpoint}
              </samp>
            </li>
            <li className="flex items-center text-sm text-gray-300">
              <span className="font-medium min-w-[140px]">HTTP Tokens:</span>
              <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                {metadata_options.HttpTokens}
              </samp>
            </li>
                        </ul>
                      </div>
                    )}

      {/* User Data Section */}
                    {user_data && (
        <div className="px-6 py-4">
          <h4 className="text-base font-semibold text-gray-200 mb-3">User Data</h4>
          <div className="bg-gray-700 rounded-lg p-4">
            <code className="text-sm text-gray-300 whitespace-pre-wrap">
                          {user_data.split("\n").map((line, idx) => (
                            <React.Fragment key={idx}>{line}<br /></React.Fragment>
                          ))}
                        </code>
          </div>

                        {user_data_secrets && (
            <div className="mt-4">
              <h5 className="text-sm font-semibold text-yellow-400 mb-2">Potential Secrets</h5>
              <div className="space-y-2">
                              {Object.entries(user_data_secrets).map(([key, secretArr]) => (
                  <div key={key} className="bg-yellow-900/20 rounded-lg p-3">
                    <div className="text-sm font-medium text-yellow-300 mb-2">{key}</div>
                    <ul className="space-y-1">
                                    {secretArr.map((val, idx) => (
                        <li key={idx}>
                          <code className="text-xs text-yellow-200 bg-gray-800 px-2 py-1 rounded">
                            {val}
                          </code>
                                </li>
                              ))}
                            </ul>
                      </div>
                ))}
                  </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ---------------- EBS Volume ----------------
export const EC2Volumes = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-6">
      {Object.entries(data).map(([region, volumesObj]) => {
        const volumes = volumesObj || {};
        return (
          <div key={region} className="space-y-4">
            <h3 className="text-xl font-bold text-gray-100">{region}</h3>
            {Object.entries(volumes).map(([volumeId, volume]) => (
              <EC2Volume
                key={volumeId}
                volume={volume}
                volumeId={volumeId}
                region={region}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export const EC2Volume = ({ volume, volumeId, region }) => {
  if (!volume) return null;

  // Helper functions
  const valueOrNone = (value) => value || "None";
  const convertBoolToEnabled = (val) => (val ? "Enabled" : "Disabled");
  const formatDate = (date) => (date ? new Date(date).toLocaleString() : "N/A");

  const {
    name,
    id,
    arn,
    State,
    Size,
    VolumeType,
    CreateTime,
    Encrypted,
  } = volume;

              return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
                  {/* Volume Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{name || volumeId}</h4>
                  </div>

      {/* Information Section */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-4">Information</h4>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">ID:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(id)}
            </samp>
                    </div>
          
          <div className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">ARN:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
              {valueOrNone(arn)}
            </samp>
                    </div>
          
          <div className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Name:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(name)}
            </samp>
                    </div>
          
          <div className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">State:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              State === 'available' ? 'bg-green-600 text-white' : 
              State === 'in-use' ? 'bg-blue-600 text-white' : 
              State === 'creating' ? 'bg-yellow-600 text-white' : 
              State === 'deleting' ? 'bg-red-600 text-white' : 
              'bg-gray-600 text-white'
            }`}>
              {valueOrNone(State)}
            </span>
                    </div>
          
          <div className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Size:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(Size)} GiB
            </samp>
                    </div>
          
          <div className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Volume Type:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(VolumeType)}
            </samp>
                    </div>
          
          <div className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Create Time:</span>
            <span className="ml-2">{formatDate(CreateTime)}</span>
                    </div>
          
          <div className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Encryption:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              Encrypted ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {convertBoolToEnabled(Encrypted)}
            </span>
                    </div>
                  </div>
                </div>
    </div>
  );
};



// ---------------- EC2 Snapshot ----------------
export const EC2Snapshots = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-6">
      {Object.entries(data).map(([region, snapshotsObj]) => {
        const snapshots = snapshotsObj || {};
        return (
          <div key={region} className="space-y-4">
            <h3 className="text-xl font-bold text-gray-100">{region}</h3>
            {Object.entries(snapshots).map(([snapshotId, snapshot]) => (
              <EC2Snapshot
                key={snapshotId}
                snapshot={snapshot}
                snapshotId={snapshotId}
                region={region}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export const EC2Snapshot = ({ snapshot, snapshotId, region }) => {
  if (!snapshot) return null;

  // Helper functions
  const valueOrNone = (value) => value || "None";
  const convertBoolToEnabled = (val) => (val ? "Enabled" : "Disabled");
  const formatDate = (date) => (date ? new Date(date).toLocaleString() : "N/A");

  const {
    name,
    id,
    arn,
    description,
    state,
    progress,
    start_time,
    volume_id,
    owner_id,
    encrypted,
    kms_key_id,
  } = snapshot;

              return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
                  {/* Snapshot Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{name || snapshotId}</h4>
                  </div>

      {/* Information Section */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-4">Information</h4>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">ID:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(id)}
            </samp>
                    </div>
          
          <div className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">ARN:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
              {valueOrNone(arn)}
            </samp>
                    </div>
          
          <div className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Description:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
              {valueOrNone(description)}
            </samp>
                    </div>
          
          <div className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">State:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              state === 'completed' ? 'bg-green-600 text-white' : 
              state === 'pending' ? 'bg-yellow-600 text-white' : 
              state === 'error' ? 'bg-red-600 text-white' : 
              'bg-gray-600 text-white'
            }`}>
              {valueOrNone(state)}
            </span>
                    </div>
          
          <div className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Progress:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(progress)}
            </samp>
                    </div>
          
          <div className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Start Time:</span>
            <span className="ml-2">{formatDate(start_time)}</span>
                    </div>
          
          <div className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Volume:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                        <ResourceLink
                resourcePath={`services.ec2.regions.${region}.volumes.${volume_id}`}
                name={volume_id}
                        />
                      </samp>
                    </div>
          
          <div className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Owner ID:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(owner_id)}
            </samp>
                    </div>
          
          <div className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Encryption:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              encrypted ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {convertBoolToEnabled(encrypted)}
            </span>
                    </div>
          
          <div className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">KMS Key ID:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
              {valueOrNone(kms_key_id)}
            </samp>
                    </div>
                  </div>
                </div>
    </div>
  );
};

export const EC2Images = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-6">
      {Object.entries(data).map(([region, imagesObj]) => {
        const images = imagesObj || {};
        return (
          <div key={region} className="space-y-4">
            <h3 className="text-xl font-bold text-gray-100">{region}</h3>
            {Object.entries(images).map(([imageId, image]) => (
              <EC2Image
                key={imageId}
                image={image}
                imageId={imageId}
                region={region}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export const EC2Image = ({ image, imageId, region }) => {
  if (!image) return null;

  // Helper function
  const valueOrNone = (value) => value || "None";

  const { name, arn, id, Architecture, Public } = image;

              return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
                  {/* Image Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{name || imageId}</h4>
                  </div>

      {/* Information Section */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-4">Information</h4>
        <ul className="space-y-3">
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">ARN:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
              {valueOrNone(arn)}
            </samp>
                      </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">ID:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(id)}
            </samp>
                      </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Architecture:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              Architecture === 'x86_64' ? 'bg-blue-600 text-white' : 
              Architecture === 'arm64' ? 'bg-green-600 text-white' : 
              'bg-gray-600 text-white'
            }`}>
              {valueOrNone(Architecture)}
            </span>
                      </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Public:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              Public ? 'bg-orange-600 text-white' : 'bg-gray-600 text-white'
            }`}>
              {valueOrNone(Public)}
            </span>
                      </li>
                    </ul>
                  </div>
    </div>
  );
};

// ---------------- Regional Settings ----------------
export const EC2RegionalSettings = ({ regions }) => {
  if (!regions) return null;

  return (
    <div className="space-y-6">
      {Object.entries(regions).map(([regionKey, regionData]) => {
        const settingsList = regionData.regional_settings
          ? Object.values(regionData.regional_settings)
          : [];

        return settingsList.map((settings, index) => (
          <EC2RegionalSetting
            key={`${regionKey}-${index}`}
            region={regionKey}
            settings={settings}
          />
        ));
      })}
    </div>
  );
};

export const EC2RegionalSetting = ({ region, settings }) => {
  if (!settings) return null;

  // Helper function
  const valueOrNone = (value) => value || "None";

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Region Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{region}</h4>
      </div>

      {/* Regional Settings Section */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-4">Regional settings</h4>
        <ul className="space-y-3">
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[280px]">Encryption enabled for EBS Volumes by default:</span>
            <samp className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
                    settings.ebs_encryption_default
                ? 'bg-green-600 text-white' 
                : 'bg-red-600 text-white'
            }`}>
              {settings.ebs_encryption_default ? 'Enabled' : 'Disabled'}
            </samp>
              </li>
          
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[280px]">Default encryption key:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
              {valueOrNone(settings.ebs_default_encryption_key_id)}
            </samp>
              </li>
            </ul>
          </div>
    </div>
  );
};


// ---------------- Generic ElastiCache Resource View ----------------
// Recursive renderer for attributes (generic_object equivalent)
export const GenericObject = ({ obj }) => {
  if (!obj || typeof obj !== "object") return null;

  return (
    <ul>
      {Object.entries(obj).map(([key, value]) => (
        <li key={key} className="text-sm text-gray-300 mb-1">
          <span className="font-medium">{key}:</span>{" "}
          {typeof value === "object" ? (
            <GenericObject obj={value} />
          ) : (
            <span className="text-gray-400">{String(value)}</span>
          )}
        </li>
      ))}
    </ul>
  );
};

// Single parameter group (matches Handlebars template exactly)
export const ParameterGroup = ({ group }) => {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Active header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{group.name}</h4>
      </div>
      
      {/* Attributes section */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Attributes</h4>
        <GenericObject obj={group.resource} />
      </div>
    </div>
  );
};

// All regions with their parameter groups
export const ElastiCacheParameterGroups = ({ data }) => {
  if (!data?.regions) return null;

  return (
    <div>
      {Object.entries(data.regions).map(([region, regionData]) => (
        <div key={region}>
          <h3>{region}</h3>
          {regionData.parameter_groups &&
            Object.entries(regionData.parameter_groups).map(([id, group]) => (
              <ParameterGroup key={id} group={group} />
            ))}
        </div>
      ))}
    </div>
  );
};

// Single ElastiCache security group (matches Handlebars template exactly)
export const ElastiCacheSecurityGroup = ({ group }) => {
  if (!group) return null;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Active header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{group.name}</h4>
      </div>
      
      {/* Attributes section */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Attributes</h4>
        <GenericObject obj={group.resource} />
      </div>
    </div>
  );
};

// All regions with their ElastiCache security groups
export const ElastiCacheSecurityGroups = ({ data }) => {
  if (!data?.regions) return null;

  return (
    <div>
      {Object.entries(data.regions).map(([region, regionData]) => (
        <div key={region}>
          <h3>{region}</h3>
          {regionData.security_groups &&
            Object.entries(regionData.security_groups).map(([id, group]) => (
              <ElastiCacheSecurityGroup key={id} group={group} />
            ))}
        </div>
      ))}
    </div>
  );
};

// Single Subnet Group (matches Handlebars template exactly)
export const ElastiCacheSubnetGroup = ({ subnetGroup }) => {
  if (!subnetGroup) return null;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Active header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{subnetGroup.name}</h4>
      </div>
      
      {/* Attributes section */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Attributes</h4>
        <GenericObject obj={subnetGroup.resource} />
      </div>
    </div>
  );
};

// All regions → VPCs → Subnet Groups
export const ElastiCacheSubnetGroups = ({ data }) => {
  if (!data?.regions) return null;

  return (
    <div>
      {Object.entries(data.regions).map(([region, regionData]) => (
        <div key={region}>
          <h3>{region}</h3>
          {regionData.vpcs &&
            Object.entries(regionData.vpcs).map(([vpcId, vpcData]) => (
              <div key={vpcId}>
                <h4>VPC: {vpcId}</h4>
                {vpcData.subnet_groups &&
                  Object.entries(vpcData.subnet_groups).map(([id, subnetGroup]) => (
                    <ElastiCacheSubnetGroup key={id} subnetGroup={subnetGroup} />
                  ))}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

// Single Cluster (matches Handlebars template exactly)
export const ElastiCacheCluster = ({ cluster }) => {
  if (!cluster) return null;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Active header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{cluster.name}</h4>
      </div>
      
      {/* Attributes section */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Attributes</h4>
        <GenericObject obj={cluster.resource} />
      </div>
    </div>
  );
};

// All regions → VPCs → Clusters
export const ElastiCacheClusters = ({ data }) => {
  if (!data?.regions) return null;

  return (
    <div>
      {Object.entries(data.regions).map(([region, regionData]) => (
        <div key={region}>
          <h3>{region}</h3>
          {regionData.vpcs &&
            Object.entries(regionData.vpcs).map(([vpcId, vpcData]) => (
              <div key={vpcId}>
                <h4>VPC: {vpcId}</h4>
                {vpcData.clusters &&
                  Object.entries(vpcData.clusters).map(([id, cluster]) => (
                    <ElastiCacheCluster key={id} cluster={cluster} />
                  ))}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

// Single ELB Policy (matches Handlebars template exactly)
export const ElbPolicy = ({ policy }) => {
  if (!policy) return null;

  // Helper function
  const valueOrNone = (value) => value || "None";

  const {
    name,
    arn,
    PolicyTypeName,
    protocols,
    options,
    ciphers,
    PolicyAttributeDescriptions,
  } = policy;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Policy Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{name}</h4>
      </div>

      {/* Information Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
        <div className="flex items-center text-sm text-gray-300">
          <span className="font-medium">ARN:</span>
          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
            {valueOrNone(arn)}
          </samp>
        </div>
      </div>

      {PolicyTypeName === "SSLNegotiationPolicyType" ? (
        <>
          {/* Protocols Section */}
          <div className="px-6 py-4 border-b border-gray-700">
            <h4 className="text-base font-semibold text-gray-200 mb-3">Protocols</h4>
            <ul className="space-y-2">
              {protocols &&
                Object.entries(protocols).map(([key, value]) => (
                  <li key={key} className="flex items-center text-sm text-gray-300">
                    <span className="font-medium min-w-[100px]">{key}:</span>
                    <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                      {String(value)}
                    </samp>
                  </li>
                ))}
            </ul>
          </div>

          {/* Options Section */}
          <div className="px-6 py-4 border-b border-gray-700">
            <h4 className="text-base font-semibold text-gray-200 mb-3">Options</h4>
            <ul className="space-y-2">
              {options &&
                Object.entries(options).map(([key, value]) => (
                  <li key={key} className="flex items-center text-sm text-gray-300">
                    <span className="font-medium min-w-[100px]">{key}:</span>
                    <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                      {String(value)}
                    </samp>
                  </li>
                ))}
            </ul>
          </div>

          {/* Ciphers Section */}
          <div className="px-6 py-4">
            <h4 className="text-base font-semibold text-gray-200 mb-3">Ciphers</h4>
            <ul className="space-y-2">
              {ciphers &&
                Object.entries(ciphers).map(
                  ([key, value]) =>
                    value === "true" && (
                      <li key={key} className="flex items-center text-sm text-gray-300">
                        <span className="font-medium min-w-[100px]">{key}:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                          {value}
                        </samp>
                      </li>
                    )
                )}
            </ul>
          </div>
        </>
      ) : (
        /* Attributes Section */
        <div className="px-6 py-4">
          <h4 className="text-base font-semibold text-gray-200 mb-3">Attributes</h4>
          <ul className="space-y-2">
            {PolicyAttributeDescriptions &&
              PolicyAttributeDescriptions.map((attr, i) => (
                <li key={i} className="flex items-center text-sm text-gray-300">
                  <span className="font-medium min-w-[100px]">{attr.AttributeName}:</span>
                  <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                    {attr.AttributeValue}
                  </samp>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// All regions → ELB Policies
export const ElbPolicies = ({ data }) => {
  if (!data?.regions) return null;

  return (
    <div>
      {Object.entries(data.regions).map(([region, regionData]) => (
        <div key={region}>
          <h3>{region}</h3>
          {regionData.elb_policies &&
            Object.entries(regionData.elb_policies).map(([id, policy]) => (
              <ElbPolicy key={id} policy={policy} />
            ))}
        </div>
      ))}
    </div>
  );
};

// Generic Linked Resources Component (matches Handlebars template pattern)
export const LinkedResources = ({ 
  service, 
  region, 
  vpc, 
  resources, 
  resourceType, 
  onShow 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!resources || !resources.length) {
    return (
      <div className="border border-gray-700 rounded-lg">
        <div className="flex items-center justify-between p-4">
          <h5 className="text-sm font-semibold text-gray-200">
          {resourceType.charAt(0).toUpperCase() + resourceType.slice(1)}
            <CountBadge count={resources?.length || 0} />
        </h5>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-700 rounded-lg">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-800/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h5 className="text-sm font-semibold text-gray-200">
          {resourceType.charAt(0).toUpperCase() + resourceType.slice(1)}:
          <CountBadge count={resources.length} />
        </h5>
        <span className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-full">
          {isOpen ? 'Hide' : 'Details'}
        </span>
      </div>
      
      {isOpen && (
        <div className="px-4 pb-4">
          <div className="space-y-1">
            {resources.map((item) => (
              <div key={item} className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 flex-shrink-0"></span>
                <ResourceLink 
                  resourcePath={`services.${service}.regions.${region}.vpcs.${vpc}.${resourceType}.${item}`}
                  name={item}
                  onClick={onShow}
                />
              </div>
            ))}
        </div>
      </div>
      )}
    </div>
  );
};

// ELB Linked Resources - takes whole data structure like ElbPolicies
export const ElbLinkedResources = ({ data }) => {
  if (!data?.regions) return null;

  return (
    <div className="space-y-4">
      {Object.entries(data.regions).map(([region, regionData]) =>
        regionData.vpcs &&
        Object.entries(regionData.vpcs).map(([vpc, vpcData]) =>
          vpcData.elbs &&
          Object.entries(vpcData.elbs).map(([elbId, elbData]) => {
            const { instances, Subnets } = elbData;
            return (
              <div key={`${region}-${vpc}-${elbId}`} className="space-y-4">
                <LinkedResources
                  service="ec2"
                  region={region}
                  vpc={vpc}
                  resources={instances}
                  resourceType="instances"
                />
                <LinkedResources
                  service="vpc"
                  region={region}
                  vpc={vpc}
                  resources={Subnets}
                  resourceType="subnets"
                />
              </div>
            );
          })
        )
      )}
    </div>
  );
};


// ELB Listener - takes whole data structure like other components
export const ElbListener = ({ data, region, vpc, elbId, listenerId }) => {
  if (!data?.regions?.[region]?.vpcs?.[vpc]?.elbs?.[elbId]?.listeners?.[listenerId]) return null;

  const listener = data.regions[region].vpcs[vpc].elbs[elbId].listeners[listenerId];
  const { LoadBalancerPort, Protocol, InstancePort, InstanceProtocol } = listener;

  return (
    <span className="text-sm text-gray-300">
      {LoadBalancerPort} ({Protocol}) <i className="fa fa-arrow-right" /> {InstancePort} ({InstanceProtocol})
    </span>
  );
};

// ELB Listeners - maps through all listeners like ElbPolicies
export const ElbListeners = ({ data }) => {
  if (!data?.regions) return null;

  return (
    <div className="space-y-2">
      {Object.entries(data.regions).map(([region, regionData]) =>
        regionData.vpcs &&
        Object.entries(regionData.vpcs).map(([vpc, vpcData]) =>
          vpcData.elbs &&
          Object.entries(vpcData.elbs).map(([elbId, elbData]) =>
            elbData.listeners &&
            Object.entries(elbData.listeners).map(([listenerId, listener]) => (
              <ElbListener
                key={`${region}-${vpc}-${elbId}-${listenerId}`}
                data={data}
                region={region}
                vpc={vpc}
                elbId={elbId}
                listenerId={listenerId}
              />
            ))
          )
        )
      )}
    </div>
  );
};


export const Elb = ({ region, vpc, elbData, onShow }) => {
  const [isSecurityGroupsOpen, setIsSecurityGroupsOpen] = useState(false);
  
  if (!elbData) return null;

  // Helper function
  const valueOrNone = (value) => value || "None";

  const { name, arn, DNSName, Scheme, AvailabilityZones, listeners, attributes, security_groups, instances, Subnets, tags } = elbData;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* ELB Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{name}</h4>
      </div>

      {/* Information Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
        <ul className="space-y-2">
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[100px]">ARN:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
              {valueOrNone(arn)}
            </samp>
          </li>
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[100px]">VPC:</span>
            <span className="ml-2">{vpc}</span>
          </li>
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[100px]">DNS:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(DNSName)}
            </samp>
          </li>
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[100px]">Scheme:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(Scheme)}
            </samp>
          </li>
          <li className="text-sm text-gray-300">
            <span className="font-medium min-w-[100px] inline-block">Availability zones:</span>
            <ul className="ml-2 mt-1 space-y-1">
              {AvailabilityZones?.map((zone) => (
                <li key={zone} className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 flex-shrink-0"></span>
                  <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                    {zone}
                  </samp>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>

      {/* Listeners Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Listeners</h4>
        <ul className="space-y-2">
          {listeners && Object.entries(listeners).map(([key, listener]) => (
            <li key={key} className="flex items-center text-sm text-gray-300">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 flex-shrink-0"></span>
              <span className="font-medium">{key}</span>
              <span className="ml-2 text-gray-400">
                ({listener.Protocol}{listener.SslPolicy ? `, ${listener.SslPolicy}` : ''})
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Attributes Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Attributes</h4>
        <ul className="space-y-2">
          {attributes && Object.entries(attributes).map(([attrKey, attrObj]) =>
            Object.entries(attrObj).map(([key, value]) => (
              <li key={`${attrKey}-${key}`} className="flex items-center text-sm text-gray-300">
                <span className="font-medium min-w-[100px]">{attrKey}.{key}:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                  {value}
                </samp>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Security Groups Accordion */}
      {security_groups?.length > 0 && (
        <div className="px-6 py-4 border-b border-gray-700">
          <div className="border border-gray-700 rounded-lg">
            <div 
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-800/50 transition-colors"
              onClick={() => setIsSecurityGroupsOpen(!isSecurityGroupsOpen)}
            >
              <h4 className="text-base font-semibold text-gray-200">
                Security Groups
                <CountBadge count={security_groups.length} />
              </h4>
              <span className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-full">
                {isSecurityGroupsOpen ? 'Hide' : 'Details'}
              </span>
            </div>
            
            {isSecurityGroupsOpen && (
              <div className="px-4 pb-4">
                <div className="space-y-1">
            {security_groups.map((sg) => (
                    <div key={sg.GroupId || sg} className="flex items-center">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 flex-shrink-0"></span>
                      <ResourceLink 
                        resourcePath={`services.ec2.regions.${region}.vpcs.${vpc}.security_groups.${sg.GroupId || sg}`}
                        name={sg.GroupId || sg}
                        onClick={onShow}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Destination Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Destination</h4>
        <div className="space-y-4">
          <LinkedResources
          service="ec2"
          region={region}
          vpc={vpc}
          resources={instances}
          resourceType="instances"
          onShow={onShow}
        />
          <LinkedResources
          service="vpc"
          region={region}
          vpc={vpc}
          resources={Subnets}
          resourceType="subnets"
          onShow={onShow}
        />
        </div>
      </div>

      {/* Tags Section */}
      {tags && Object.keys(tags).length > 0 && (
        <div className="px-6 py-4">
          <h4 className="text-base font-semibold text-gray-200 mb-3">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(tags).map(([key, value]) => (
              <div key={key} className="flex items-center bg-gray-700 rounded-lg px-3 py-2">
                <samp className="text-blue-300 font-mono text-xs mr-2">{key}</samp>
                <span className="text-gray-400 text-xs mr-2">:</span>
                <samp className="text-green-300 font-mono text-xs">{value}</samp>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const ElbAllRegions = ({ data }) => {
  if (!data) return null;

  return (
    <>
      {Object.entries(data).map(([regionId, regionData]) =>
        regionData.vpcs &&
        Object.entries(regionData.vpcs).map(([vpcId, vpcData]) =>
          vpcData.elbs &&
          Object.entries(vpcData.elbs).map(([elbId, elbData]) => (
            <Elb
              key={`${regionId}-${vpcId}-${elbId}`}
              region={regionId}
              vpc={vpcId}
              elbData={elbData}
            />
          ))
        )
      )}
    </>
  );
};

export const SingleElbPolicy = ({ policy, onClose }) => {
  if (!policy) return null;

  const isSSL = policy.PolicyTypeName === "SSLNegotiationPolicyType";

  return (
    <div className="modal">
      <button onClick={onClose}>Close</button>
      <h3>{policy.name}</h3>
      <div>
        <strong>ARN:</strong> {policy.arn || "N/A"}
      </div>

      {isSSL ? (
        <>
          <h4>Protocols</h4>
          <ul>
            {Object.entries(policy.protocols || {}).map(([k, v]) => (
              <li key={k}>{k}: {v}</li>
            ))}
          </ul>

          <h4>Options</h4>
          <ul>
            {Object.entries(policy.options || {}).map(([k, v]) => (
              <li key={k}>{k}: {v}</li>
            ))}
          </ul>

          <h4>Ciphers</h4>
          <ul>
            {Object.entries(policy.ciphers || {}).map(([k, v]) =>
              v === "true" ? <li key={k}>{k}: {v}</li> : null
            )}
          </ul>
        </>
      ) : (
        <>
          <h4>Attributes</h4>
          <ul>
            {(policy.PolicyAttributeDescriptions || []).map((attr, i) => (
              <li key={i}>
                {attr.AttributeName}: {attr.AttributeValue}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

// ELB Linked Policies - uses ElbPolicy component directly
export const ElbLinkedPolicies = ({ data }) => {
  if (!data?.regions) return null;

  return (
    <div className="space-y-4">
      {Object.entries(data.regions).map(([region, regionData]) =>
        regionData.elb_policies &&
        Object.entries(regionData.elb_policies).map(([policyId, policy]) => (
          <ElbPolicy key={`${region}-${policyId}`} policy={policy} />
        ))
      )}
    </div>
  );
};

// ELBv2 Load Balancer (matches Handlebars template exactly)
export const ELBv2LoadBalancer = ({ data, region, vpc, lbId }) => {
  const [isSecurityGroupsOpen, setIsSecurityGroupsOpen] = useState(false);
  
  if (!data?.regions?.[region]?.vpcs?.[vpc]?.lbs?.[lbId]) return null;

  // Helper function
  const valueOrNone = (value) => value || "None";

  const lb = data.regions[region].vpcs[vpc].lbs[lbId];

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Load Balancer Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{lb.name}</h4>
      </div>

      {/* Information Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
        <ul className="space-y-2">
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[100px]">ARN:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
              {valueOrNone(lb.arn)}
            </samp>
          </li>
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[100px]">VPC:</span>
            <span className="ml-2">{lb.vpcName || vpc} ({vpc})</span>
          </li>
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[100px]">DNS:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(lb.DNSName)}
            </samp>
          </li>
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[100px]">Scheme:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(lb.Scheme)}
            </samp>
          </li>
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[100px]">Type:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(lb.Type)}
            </samp>
          </li>
          <li className="text-sm text-gray-300">
            <span className="font-medium min-w-[100px] inline-block">Availability zones:</span>
            <ul className="ml-2 mt-1 space-y-1">
              {lb.AvailabilityZones?.map((zone, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 flex-shrink-0"></span>
                  <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                    {zone.ZoneName} ({zone.SubnetId})
                  </samp>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>

      {/* Listeners Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Listeners</h4>
        <ul className="space-y-2">
          {lb.listeners && Object.entries(lb.listeners).map(([key, listener]) => (
            <li key={key} className="flex items-center text-sm text-gray-300">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 flex-shrink-0"></span>
              <span className="font-medium">{key}</span>
              <span className="ml-2 text-gray-400">
                ({listener.Protocol}{listener.SslPolicy ? `, ${listener.SslPolicy}` : ''})
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Attributes Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Attributes</h4>
        <ul className="space-y-2">
          {lb.attributes && Object.entries(lb.attributes).map(([key, attr]) => (
            <li key={key} className="flex items-center text-sm text-gray-300">
              <span className="font-medium min-w-[100px]">{attr.Key}:</span>
              <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                {attr.Value}
              </samp>
            </li>
          ))}
        </ul>
      </div>

      {/* Security Groups Accordion (only if not network LB) */}
      {!lb.isNetwork && lb.security_groups?.length > 0 && (
        <div className="px-6 py-4 border-b border-gray-700">
          <div className="border border-gray-700 rounded-lg">
            <div 
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-800/50 transition-colors"
              onClick={() => setIsSecurityGroupsOpen(!isSecurityGroupsOpen)}
            >
              <h4 className="text-base font-semibold text-gray-200">
                Security Groups
                <CountBadge count={lb.security_groups.length} />
              </h4>
              <span className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-full">
                {isSecurityGroupsOpen ? 'Hide' : 'Details'}
              </span>
            </div>
            
            {isSecurityGroupsOpen && (
              <div className="px-4 pb-4">
                <div className="space-y-1">
                  {lb.security_groups.map((sg) => (
                    <div key={sg.GroupId} className="flex items-center">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 flex-shrink-0"></span>
                      <ResourceLink 
                        resourcePath={`services.ec2.regions.${region}.vpcs.${vpc}.security_groups.${sg.GroupId}`}
                        name={sg.GroupId}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tags Section */}
      {lb.tags && Object.keys(lb.tags).length > 0 && (
        <div className="px-6 py-4">
          <h4 className="text-base font-semibold text-gray-200 mb-3">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(lb.tags).map(([key, value]) => (
              <div key={key} className="flex items-center bg-gray-700 rounded-lg px-3 py-2">
                <samp className="text-blue-300 font-mono text-xs mr-2">{key}</samp>
                <span className="text-gray-400 text-xs mr-2">:</span>
                <samp className="text-green-300 font-mono text-xs">{value}</samp>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ELBv2 All Regions - maps through all load balancers
export const ELBv2AllRegions = ({ data }) => {
  if (!data?.regions) return null;

    return (
    <>
      {Object.entries(data.regions).map(([region, regionData]) =>
        regionData.vpcs &&
        Object.entries(regionData.vpcs).map(([vpc, vpcData]) =>
          vpcData.lbs &&
          Object.entries(vpcData.lbs).map(([lbId, lbData]) => (
            <ELBv2LoadBalancer
              key={`${region}-${vpc}-${lbId}`}
              data={data}
              region={region}
              vpc={vpc}
              lbId={lbId}
            />
          ))
        )
      )}
    </>
  );
};

// EMR Cluster (matches Handlebars template exactly)
export const EMRCluster = ({ data, region, vpc, clusterId }) => {
  if (!data?.regions?.[region]?.vpcs?.[vpc]?.clusters?.[clusterId]) return null;

  // Helper function
  const valueOrNone = (value) => value || "None";

  const cluster = data.regions[region].vpcs[vpc].clusters[clusterId];

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Cluster Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{cluster.name}</h4>
      </div>

      {/* Information Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
        <ul className="space-y-2">
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[120px]">Region:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(cluster.region)}
            </samp>
          </li>
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[120px]">ARN:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
              {valueOrNone(cluster.arn)}
            </samp>
          </li>
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[120px]">VPC:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
              {valueOrNone(cluster.vpcName)} ({valueOrNone(cluster.vpcArn)})
            </samp>
          </li>
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[120px]">Id:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(cluster.id)}
            </samp>
          </li>
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[120px]">Availability zone:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(cluster.Ec2InstanceAttributes?.Ec2AvailabilityZone)}
            </samp>
          </li>
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[120px]">Status:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(cluster.Status?.State)}
            </samp>
          </li>
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[120px]">Instance profile:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(cluster.Ec2InstanceAttributes?.IamInstanceProfile)}
            </samp>
          </li>
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[120px]">Visible to all users:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(String(cluster.VisibleToAllUsers))}
            </samp>
          </li>
        </ul>
      </div>

      {/* Master Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Master</h4>
        <ul className="space-y-2">
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[120px]">Public DNS:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {cluster.MasterPublicDnsName || "N/A"}
            </samp>
          </li>
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[120px]">Security group:</span>
            {cluster.Ec2InstanceAttributes?.EmrManagedMasterSecurityGroup ? (
              <ResourceLink 
                resourcePath={`services.ec2.regions.${region}.vpcs.${vpc}.security_groups.${cluster.Ec2InstanceAttributes.EmrManagedMasterSecurityGroup}`}
                name={cluster.Ec2InstanceAttributes.EmrManagedMasterSecurityGroup}
              />
            ) : (
              <span className="ml-2 text-gray-400">N/A</span>
            )}
          </li>
        </ul>
      </div>

      {/* Slave Section */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Slave</h4>
        <ul className="space-y-2">
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[120px]">Security group:</span>
            {cluster.Ec2InstanceAttributes?.EmrManagedSlaveSecurityGroup ? (
              <ResourceLink 
                resourcePath={`services.ec2.regions.${region}.vpcs.${vpc}.security_groups.${cluster.Ec2InstanceAttributes.EmrManagedSlaveSecurityGroup}`}
                name={cluster.Ec2InstanceAttributes.EmrManagedSlaveSecurityGroup}
              />
            ) : (
              <span className="ml-2 text-gray-400">N/A</span>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

// EMR All Regions - maps through all clusters
export const EMRAllRegions = ({ data }) => {
  if (!data?.regions) return null;

  return (
    <>
      {Object.entries(data.regions).map(([region, regionData]) =>
        regionData.vpcs &&
        Object.entries(regionData.vpcs).map(([vpc, vpcData]) =>
          vpcData.clusters &&
          Object.entries(vpcData.clusters).map(([clusterId, clusterData]) => (
            <EMRCluster
              key={`${region}-${vpc}-${clusterId}`}
              data={data}
              region={region}
              vpc={vpc}
              clusterId={clusterId}
            />
          ))
        )
      )}
    </>
  );
};

// ----------------- Credential Report View -----------------
export const CredentialReportView = ({ data }) => {
  if (!data) return null;

  const valueOrNone = (v) => (v === undefined || v === null || v === '' ? 'None' : v);
  const yesNo = (b) => (b === true ? 'Yes' : b === false ? 'No' : valueOrNone(b));

  return (
    <div className="space-y-4">
      {Object.keys(data).map((userKey) => {
        const user = data[userKey];
        return (
          <div key={userKey} className="bg-gray-900/30 border border-gray-700 rounded-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
              <h4 className="text-lg font-semibold text-white">{user.name || user.user}</h4>
            </div>

            {/* Credentials Section */}
            <div className="px-6 py-4">
              <h4 className="text-base font-semibold text-gray-200 mb-3">Credentials Report</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div>
                  <span className="text-gray-400">Creation Date:</span>{' '}
                  <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(user.user_creation_time)}</samp>
                </div>
                <div>
                  <span className="text-gray-400">Last Used Date:</span>{' '}
                  <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(user.last_used)}</samp>
                </div>
                <div>
                  <span className="text-gray-400">Password Enabled:</span>{' '}
                  <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{yesNo(user.password_enabled)}</samp>
                </div>
                <div>
                  <span className="text-gray-400">Password Last Used:</span>{' '}
                  <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(user.password_last_used)}</samp>
                </div>
                <div>
                  <span className="text-gray-400">Password Last Changed:</span>{' '}
                  <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(user.password_last_changed)}</samp>
                </div>
                <div>
                  <span className="text-gray-400">MFA Active:</span>{' '}
                  <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{yesNo(user.mfa_active)}</samp>
                </div>
                <div>
                  <span className="text-gray-400">Hardware MFA Active:</span>{' '}
                  <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{yesNo(user.mfa_active_hardware)}</samp>
                </div>
                <div>
                  <span className="text-gray-400">Access Key 1 Active:</span>{' '}
                  <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{yesNo(user.access_key_1_active)}</samp>
                </div>
                <div>
                  <span className="text-gray-400">Access Key 1 Last Used:</span>{' '}
                  <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(user.access_key_1_last_used_date || 'N/A')}</samp>
                </div>
                <div>
                  <span className="text-gray-400">Access Key 1 Last Rotated:</span>{' '}
                  <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(user.access_key_1_last_rotated || 'N/A')}</samp>
                </div>
                <div>
                  <span className="text-gray-400">Access Key 2 Active:</span>{' '}
                  <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{yesNo(user.access_key_2_active)}</samp>
                </div>
                <div>
                  <span className="text-gray-400">Access Key 2 Last Used:</span>{' '}
                  <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(user.access_key_2_last_used_date || 'N/A')}</samp>
                </div>
                <div>
                  <span className="text-gray-400">Access Key 2 Last Rotated:</span>{' '}
                  <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{valueOrNone(user.access_key_2_last_rotated || 'N/A')}</samp>
                </div>
                <div>
                  <span className="text-gray-400">Signing Cert 1 Active:</span>{' '}
                  <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{yesNo(user.cert_1_active)}</samp>
                </div>
                <div>
                  <span className="text-gray-400">Signing Cert 2 Active:</span>{' '}
                  <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{yesNo(user.cert_2_active)}</samp>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// IAM Group Component
export const IAMGroup = ({ group }) => {
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const valueOrNone = (v) => (v === undefined || v === null || v === '' ? 'None' : v);
  
  if (!group) return null;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{group.name}</h4>
      </div>

      {/* Information Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
        <div className="space-y-2 text-sm text-gray-300">
          <div>
            <span className="text-gray-400">ARN:</span>{' '}
            <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300">{valueOrNone(group.arn)}</samp>
          </div>
          <div>
            <span className="text-gray-400">Creation date:</span>{' '}
            <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300">{valueOrNone(group.CreateDate)}</samp>
          </div>
        </div>
      </div>

      {/* Members Accordion */}
      <div className="px-6 py-4 border-b border-gray-700">
        <div className="border border-gray-700 rounded-lg">
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-800/50 transition-colors"
            onClick={() => setIsMembersOpen(!isMembersOpen)}
          >
            <h4 className="text-base font-semibold text-gray-200">
              Members
              <CountBadge count={group.users?.length || 0} />
            </h4>
            <span className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-full">
              {isMembersOpen ? 'Hide' : 'Details'}
            </span>
          </div>
          {isMembersOpen && (
            <div className="px-4 pb-4">
              {group.users && group.users.length > 0 ? (
                <div className="space-y-1">
                  {group.users.map((user) => (
                    <div key={user} className="flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 flex-shrink-0"></span>
                      <ResourceLink
                        resourcePath={`services.iam.users.${user}`}
                        name={user}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500 italic">No members</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Nested inline policies */}
      <div className="px-6 py-4 border-b border-gray-700">
        <IAMInlinePolicies
          inline_policies={group.inline_policies}
          resource_type="groups"
          resource_id={group.id}
        />
      </div>

      {/* Managed policies list */}
      <div className="px-6 py-4">
        <IAMManagedPoliciesList policies={group.policies} />
      </div>
    </div>
  );
};

 // Inline Policy Component
export const IAMInlinePolicies = ({ data }) => {
  if (!data) return null;
  
  const { inline_policies = [], resource_type, resource_id } = data;
  
  if (!inline_policies.length) return null;
  
  return (
    <div className="border border-gray-700 rounded-lg">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200">
          Inline Policies
          <CountBadge count={inline_policies.length} />
      </h4>
      </div>
      <div className="p-4 space-y-3">
      {inline_policies.map((policy, idx) => (
          <AccordionPolicy
            key={idx}
            name={policy.name}
            document={policy.PolicyDocument}
            policyPath={`iam.${resource_type}.${resource_id}.inline_policies.${idx}.PolicyDocument`}
          />
      ))}
      </div>
    </div>
  );
};

// Managed Policies List Component
export const IAMManagedPoliciesList = ({ data }) => {
  if (!data) return null;
  const { policies = [] } = data;
  if (!policies.length) return null;
  return (
    <div className="border border-gray-700 rounded-lg">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200">
          Managed Policies
          <CountBadge count={policies.length} />
      </h4>
      </div>
      <div className="p-4">
        <ul className="space-y-2">
        {policies.map((policyId) => (
            <li key={policyId} className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></span>
              <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                <ResourceLink
                  resourcePath={`services.iam.policies.${policyId}`}
                  name={policyId}
                />
              </samp>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

// Single IAM Managed Policy Component
export const IAMManagedPolicy = ({ data }) => {
  const policy = data;
  if (!policy) return null;
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{policy.name}</h4>
      </div>
      <div className="px-6 py-4 border-b border-gray-700">
        <AccordionPolicy
          name={policy.arn}
          document={policy.PolicyDocument}
          policyPath={`iam.policies.${policy.id}.PolicyDocument`}
        />
      </div>
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Attached Entities</h4>
        {policy.attached_to ? (
          <ul className="space-y-3">
            {Object.entries(policy.attached_to).map(([entityType, entities]) => (
              <li key={entityType}>
                <div className="text-sm text-gray-300 font-medium mb-2">{makeTitle(entityType)}</div>
                <ul className="space-y-2">
                  {entities.map((entity) => (
                    <li key={entity.id} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></span>
                      <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                        <ResourceLink
                          resourcePath={`services.iam.${entityType}.${entity.id}`}
                          name={entity.name}
                        />
                      </samp>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
        </ul>
        ) : (
          <div className="text-sm text-gray-500 italic">No attached entities</div>
        )}
      </div>
    </div>
  );
}; 
  
  
// ----------------- Password Policy View -----------------
export const PasswordPolicyView = ({ data }) => {
  if (!data) return null;

  const convertBoolToEnabled = (val) => (val ? "Enabled" : "Disabled");
  
  const policy = data;
  const isDefaultPolicy = policy.MinimumPasswordLength === "1" || policy.MinimumPasswordLength === 1;
  
    return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">Password Policy</h4>
      </div>

      <div className="px-6 py-4">
        <ul className="space-y-3">
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[260px]">Minimum password length:</span>
            <span className="ml-2">
              {policy.MinimumPasswordLength}
          {isDefaultPolicy && (
            <span className="text-gray-400 italic ml-2">
                  (1 character passwords are authorized when no password policy exists, even though the console displays "6")
            </span>
          )}
            </span>
          </li>

          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[260px]">Require at least one uppercase letter:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${policy.RequireUppercaseCharacters ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
              {convertBoolToEnabled(policy.RequireUppercaseCharacters)}
            </span>
          </li>

          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[260px]">Require at least one lowercase letter:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${policy.RequireLowercaseCharacters ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
              {convertBoolToEnabled(policy.RequireLowercaseCharacters)}
            </span>
          </li>

          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[260px]">Require at least one number:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${policy.RequireNumbers ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
              {convertBoolToEnabled(policy.RequireNumbers)}
            </span>
          </li>

          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[260px]">Require at least one non-alphanumeric character:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${policy.RequireSymbols ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
              {convertBoolToEnabled(policy.RequireSymbols)}
            </span>
          </li>

          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[260px]">Enable password expiration:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${policy.ExpirePasswords ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
              {convertBoolToEnabled(policy.ExpirePasswords)}
            </span>
          </li>
  
        {policy.MaxPasswordAge && (
            <li className="flex items-center text-sm text-gray-300">
              <span className="font-medium min-w-[260px]">Password expiration period (days):</span>
              <span className="ml-2">{policy.MaxPasswordAge}</span>
            </li>
          )}

          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[260px]">Prevent password reuse:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${policy.PasswordReusePrevention ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
              {convertBoolToEnabled(policy.PasswordReusePrevention)}
            </span>
          </li>
  
        {policy.PreviousPasswordPrevented && (
          <>
              <li className="flex items-center text-sm text-gray-300">
                <span className="font-medium min-w-[260px]">Number of previous passwords to remember:</span>
                <span className="ml-2">{policy.PreviousPasswordPrevented}</span>
              </li>
              <li className="flex items-center text-sm text-gray-300">
                <span className="font-medium min-w-[260px]">Allow users to change their own password:</span>
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${policy.AllowUsersToChangePassword ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                  {convertBoolToEnabled(policy.AllowUsersToChangePassword)}
                </span>
              </li>
              <li className="flex items-center text-sm text-gray-300">
                <span className="font-medium min-w-[260px]">Allow setting new password after expiration (Hard Expiry):</span>
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${policy.HardExpiry ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                  {convertBoolToEnabled(policy.HardExpiry)}
                </span>
              </li>
          </>
        )}
        </ul>
      </div>
      </div>
    );
  };

// ----------------- IAM User View -----------------
export const IAMResourceView = ({ data }) => {
  // If data is an object of users (keyed by userId), normalize it
  const users = Array.isArray(data) ? data : Object.values(data || {});

  const formatDate = (dateString) => {
    if (!dateString) return "None";
    return new Date(dateString).toLocaleString();
  };

  const hasProfiles = (loginProfile) => {
    return loginProfile ? "Yes" : "No";
  };

  const hasMFA = (mfaDevices) => {
    return mfaDevices && mfaDevices.length > 0 ? "Yes" : "No";
  };

  const hasAccessKeys = (accessKeys) => {
    return accessKeys && accessKeys.length > 0 ? "Yes" : "No";
  };

  return (
    <div className="space-y-6">
      {users.map((user, idx) => (
        <div key={idx} className="bg-gray-900/30 border border-gray-700 rounded-lg overflow-hidden">
          {/* Name Header */}
          <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
            <h4 className="text-lg font-semibold text-white">{user.name}</h4>
          </div>

          {/* Information */}
          <div className="px-6 py-4 border-b border-gray-700">
            <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div>
                <span className="text-gray-400">Arn:</span> <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{user.arn || "None"}</samp>
            </div>
              <div>
                <span className="text-gray-400">Creation date:</span> {formatDate(user.CreateDate)}
              </div>
            </div>
          </div>

          {/* Authentication Methods */}
          <div className="px-6 py-4 border-b border-gray-700">
            <h4 className="text-base font-semibold text-gray-200 mb-3">Authentication methods</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div>
                <span className="text-gray-400">Password enabled:</span> {hasProfiles(user.LoginProfile)}
              </div>
              
              <div>
                <span className="text-gray-400">Multi-Factor enabled:</span> {hasMFA(user.MFADevices)}
              </div>
              
              {user.MFADevices && user.MFADevices.length > 0 && (
                <ul className="ml-4 space-y-1">
                  {user.MFADevices.map((mfa, i) => (
                    <li key={i} className="text-gray-300">
                      Serial number: <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{mfa.SerialNumber}</samp>
                </li>
              ))}
            </ul>
              )}
              
              <div>
                <span className="text-gray-400">Access Keys:</span> {user.AccessKeys?.length || 0}
              </div>
              
              {user.AccessKeys && user.AccessKeys.length > 0 && (
                <ul className="ml-4 space-y-1">
                  {user.AccessKeys.map((key, i) => (
                    <li key={i} className="text-gray-300">
                      <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{key.AccessKeyId}</samp>, {key.Status}, created on {formatDate(key.CreateDate)}
                </li>
              ))}
            </ul>
              )}

              {/* Security Warnings */}
              {user.LoginProfile && user.AccessKeys && user.AccessKeys.length > 0 && (
                <div className="mt-3 p-3 bg-yellow-900/20 border border-yellow-700 rounded-md">
                  <div className="flex items-center text-yellow-300 text-sm">
                    <span className="mr-2">⚠️</span>
                    Review the need for password-based and key-based authentication
                  </div>
                </div>
              )}
              
              {user.AccessKeys && user.AccessKeys.length > 1 && (
                <div className="mt-3 p-3 bg-yellow-900/20 border border-yellow-700 rounded-md">
                  <div className="flex items-center text-yellow-300 text-sm">
                    <span className="mr-2">⚠️</span>
                    Review the need for multiple active access keys
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Groups */}
          <div className="px-6 py-4 border-b border-gray-700">
            <h4 className="text-base font-semibold text-gray-200 mb-3 flex items-center">
              Groups
              <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {user.groups?.length || 0}
              </span>
            </h4>
            {user.groups && user.groups.length > 0 ? (
              <ul className="space-y-1">
                {user.groups.map((group, i) => (
                  <li key={i} className="text-sm text-blue-300 hover:text-blue-200 cursor-pointer">
                  {group}
                </li>
              ))}
            </ul>
            ) : (
              <p className="text-sm text-gray-500">No groups assigned</p>
            )}
          </div>

          {/* Inline Policies */}
          {user.inline_policies && Object.keys(user.inline_policies).length > 0 && (
            <div className="px-6 py-4 border-b border-gray-700">
              <h4 className="text-base font-semibold text-gray-200 mb-3">
                Inline Policies
                <span className="ml-2 bg-gray-600 text-white text-xs px-2 py-1 rounded-full">
                  {user.inline_policies_count || 0}
                </span>
              </h4>
              <div className="text-sm text-gray-300">
                {Object.keys(user.inline_policies).map((policyName, i) => (
                  <div key={i} className="mb-2">
                    <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{policyName}</samp>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Managed Policies */}
          {user.policies && user.policies.length > 0 && (
            <div className="px-6 py-4 border-b border-gray-700">
              <h4 className="text-base font-semibold text-gray-200 mb-3">
                Managed Policies
                <span className="ml-2 bg-gray-600 text-white text-xs px-2 py-1 rounded-full">
                  {user.policies_counts || 0}
                </span>
              </h4>
              <div className="text-sm text-gray-300">
                {user.policies.map((policy, i) => (
                  <div key={i} className="mb-2">
                    <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{policy}</samp>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {user.Tags && user.Tags.length > 0 && (
            <div className="px-6 py-4">
              <h4 className="text-base font-semibold text-gray-200 mb-3">Tags</h4>
              <ul className="space-y-2">
                {user.Tags.map((tag, i) => (
                  <li key={i} className="text-sm text-gray-300">
                    <samp className="bg-gray-800 px-2 py-1 rounded text-blue-300">{tag.Key}</samp>: <samp className="bg-gray-800 px-2 py-1 rounded text-green-300">{tag.Value}</samp>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ----------------- IAM Role View -----------------
export const IamRoleView = ({ data }) => {
  const [isInstancesOpen, setIsInstancesOpen] = useState(false);
  const [isLambdasOpen, setIsLambdasOpen] = useState(false);
  
  const role = data;
  if (!role) return null;

  const instancesCount = role.instances_count || 0;
  const lambdasCount = role.awslambdas_count || 0;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{role.name}</h4>
      </div>

      {/* Information Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
        <ul className="space-y-3">
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">ID:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(role.id)}</samp>
          </li>
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">ARN:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">{valueOrNone(role.arn)}</samp>
          </li>
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">Description:</span>
            <i className="ml-2 text-gray-400 italic">{valueOrNone(role.description)}</i>
          </li>
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">Creation Date:</span>
            <span className="ml-2">{formatDate(role.create_date)}</span>
          </li>
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">Path:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">{valueOrNone(role.path)}</samp>
          </li>
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">Max Session Duration:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(role.max_session_duration)}</samp>
          </li>
        </ul>
      </div>

      {/* Trust Policy Section */}
      {role.assume_role_policy?.PolicyDocument && (
        <div className="px-6 py-4 border-b border-gray-700">
          <AccordionPolicy
            name="Role Trust Policy"
            document={role.assume_role_policy.PolicyDocument}
            policyPath={`iam.roles.${role.id}.assume_role_policy.PolicyDocument`}
          />
        </div>
      )}

      {/* Instances Accordion */}
      <div className="px-6 py-4 border-b border-gray-700">
        <div className="border border-gray-700 rounded-lg">
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-800/50 transition-colors"
            onClick={() => setIsInstancesOpen(!isInstancesOpen)}
          >
            <h4 className="text-base font-semibold text-gray-200">
              Instances
              <CountBadge count={instancesCount} />
            </h4>
            <span className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-full">
              {isInstancesOpen ? 'Hide' : 'Details'}
            </span>
          </div>

          {isInstancesOpen && instancesCount > 0 && (
            <div className="px-4 pb-4">
              <ul className="space-y-2">
                {role.instance_profiles?.flatMap((profile) =>
                  (profile.instances || []).map((instanceId) => (
                    <li key={instanceId} className="flex items-center text-sm text-gray-300">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></span>
                      <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                        <ResourceLink
                          resourcePath={`services.ec2.regions.vpcs.instances.${instanceId}`}
                          name={instanceId}
                        />
                      </samp>
                    </li>
              ))
            )}
          </ul>
        </div>
      )}
        </div>
      </div>

      {/* Lambda Functions Accordion */}
      <div className="px-6 py-4 border-b border-gray-700">
        <div className="border border-gray-700 rounded-lg">
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-800/50 transition-colors"
            onClick={() => setIsLambdasOpen(!isLambdasOpen)}
          >
            <h4 className="text-base font-semibold text-gray-200">
              Lambda Functions
              <CountBadge count={lambdasCount} />
            </h4>
            <span className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-full">
              {isLambdasOpen ? 'Hide' : 'Details'}
            </span>
        </div>

          {isLambdasOpen && lambdasCount > 0 && (
            <div className="px-4 pb-4">
              <ul className="space-y-2">
                {role.awslambdas?.map((fn) => (
                  <li key={fn.name} className="flex items-center text-sm text-gray-300">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></span>
                    <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                      <ResourceLink
                        resourcePath={`services.awslambda.regions.${fn.region}.functions.${fn.name}`}
                        name={`${fn.name} (${fn.region})`}
                      />
                    </samp>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
      </div>

      {/* Inline Policies */}
      {role.inline_policies && role.inline_policies.length > 0 && (
        <div className="px-6 py-4 border-b border-gray-700">
          <IAMInlinePolicies
            data={{ inline_policies: role.inline_policies, resource_type: 'roles', resource_id: role.id }}
          />
        </div>
      )}

      {/* Managed Policies List (attached) */}
      {role.managed_policies && role.managed_policies.length > 0 && (
        <div className="px-6 py-4 border-b border-gray-700">
          <IAMManagedPoliciesList data={{ policies: role.managed_policies }} />
        </div>
      )}

      {/* Tags */}
      {role.Tags && role.Tags.length > 0 && (
        <div className="px-6 py-4">
          <h4 className="text-base font-semibold text-gray-200 mb-3">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {role.Tags.map((tag) => (
              <div key={tag.Key} className="flex items-center bg-gray-700 rounded-lg px-3 py-2">
                <samp className="text-blue-300 font-mono text-xs mr-2">{tag.Key}</samp>
                <span className="text-gray-400 text-xs mr-2">:</span>
                <samp className="text-green-300 font-mono text-xs">{tag.Value}</samp>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const KmsKey = ({ data }) => {
  if (!data) return null;

  // Helper functions
  const convertBoolToEnabled = (val) => (val ? "Enabled" : "Disabled");
  const formatDate = (date) => (date ? new Date(date).toLocaleString() : "N/A");
  const valueOrNone = (value) => value || "None";

  const {
    name,
    id,
    arn,
    description,
    creation_date,
    key_enabled,
    origin,
    key_manager,
    rotation_enabled,
    aliases = [],
    grants = [],
    policy,
    region,
    keyId
  } = data;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Key Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{name}</h4>
          </div>

      {/* Information Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
        <ul className="space-y-3">
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">ID:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(id)}
            </samp>
          </li>
          
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">ARN:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
              {valueOrNone(arn)}
            </samp>
          </li>
          
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Description:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
              {valueOrNone(description)}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Creation Date:</span>
            <span className="ml-2">{formatDate(creation_date)}</span>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Status:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              key_enabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {convertBoolToEnabled(key_enabled)}
      </span>
          </li>
          
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Origin:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(origin)}
            </samp>
          </li>
          
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Key Manager:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(key_manager)}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Rotation:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              rotation_enabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {convertBoolToEnabled(rotation_enabled)}
            </span>
          </li>
              </ul>
            </div>

      {/* Aliases Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">
          Aliases
          <CountBadge count={aliases.length} />
        </h4>
        {aliases.length > 0 ? (
          <ul className="space-y-2">
            {aliases.map((alias, idx) => (
              <li key={idx} className="flex items-center text-sm text-gray-300">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></span>
                <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                  {alias.name}
                </samp>
              </li>
                  ))}
                </ul>
              ) : (
          <div className="text-sm text-gray-500 italic">No aliases</div>
              )}
            </div>

      {/* Grants Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">
          Grants
          <CountBadge count={grants.length} />
        </h4>
        {grants.length > 0 ? (
          <div className="space-y-3">
            {grants.map((grant, idx) => (
              <div key={idx} className="bg-gray-700 rounded-lg p-3">
                <div className="text-sm text-gray-300 font-medium mb-2">
                  Name: <samp className="bg-gray-600 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                    {valueOrNone(grant.name)}
                  </samp>
                </div>
                  <GenericObject data={grant} />
                </div>
              ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500 italic">No grants</div>
        )}
            </div>

      {/* Key Policy Section */}
      <div className="px-6 py-4">
        {policy ? (
                <AccordionPolicy
                  name="Key Policy"
            document={policy}
                  policyPath={`kms.regions.${region}.keys.${keyId}.policy`}
                />
              ) : (
          <div>
            <h4 className="text-base font-semibold text-gray-200 mb-3">Key Policy</h4>
            <div className="text-sm text-gray-500 italic">No key policy</div>
          </div>
              )}
            </div>
          </div>
  );
};

export const KmsKeysByRegion = ({ data }) => {
  if (!data) return null;

  return (
    <div>
      {Object.entries(data).map(([regionId, regionData]) => {
        const keys = regionData.keys || {};
        return (
          <div key={regionId}>
            <h3>Region: {regionData.name || regionId}</h3>
            {Object.keys(keys).length ? (
              <ul>
                {Object.keys(keys).map((keyId) => (
                  <li key={keyId}>
                    <KmsKey region={regionId} keyId={keyId} data={keys} />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No KMS keys in this region</p>
            )}
          </div>
        );
      })}
    </div>
  );
};


// ---------- Parameter Group ----------
export const RDSParameterGroup = ({ data }) => {
  const [isParametersOpen, setIsParametersOpen] = useState(false);
  
  if (!data) return null;

  // Helper function
  const valueOrNone = (value) => value || "None";

  const {
    name,
    DBParameterGroupFamily,
    Description,
    arn,
    parameters = {}
  } = data;

  const parametersArray = Object.entries(parameters);

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Group Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{name}</h4>
      </div>

      {/* Information Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
        <ul className="space-y-3">
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Group family:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(DBParameterGroupFamily)}
            </samp>
          </li>
          
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Description:</span>
            <i className="ml-2 text-gray-400 italic">{valueOrNone(Description)}</i>
          </li>
          
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">ARN:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
              {valueOrNone(arn)}
            </samp>
          </li>
        </ul>
      </div>

      {/* Parameters Accordion */}
      <div className="px-6 py-4">
        <div className="border border-gray-700 rounded-lg">
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-800/50 transition-colors"
            onClick={() => setIsParametersOpen(!isParametersOpen)}
          >
            <h4 className="text-base font-semibold text-gray-200">
              Parameters
              <CountBadge count={parametersArray.length} />
            </h4>
            <span className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-full">
              {isParametersOpen ? 'Hide' : 'Details'}
            </span>
          </div>

          {isParametersOpen && parametersArray.length > 0 && (
            <div className="px-4 pb-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
          <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 px-3 text-gray-300 font-medium w-1/5">Name</th>
                      <th className="text-left py-2 px-3 text-gray-300 font-medium w-1/5">Value</th>
                      <th className="text-left py-2 px-3 text-gray-300 font-medium w-3/5">Description</th>
            </tr>
          </thead>
          <tbody>
                    {parametersArray.map(([key, param], idx) => (
                      <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700/50">
                        <td className="py-2 px-3 text-gray-300">
                          <samp className="bg-gray-600 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                            {key}
                          </samp>
                        </td>
                        <td className="py-2 px-3 text-gray-300">
                          <samp className="bg-gray-600 px-2 py-1 rounded text-green-300 font-mono text-xs">
                            {valueOrNone(param.ParameterValue)}
                          </samp>
                        </td>
                        <td className="py-2 px-3 text-gray-300 text-sm">
                          {valueOrNone(param.Description)}
                        </td>
                </tr>
              ))}
          </tbody>
        </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ---------- Security Group ----------
export const RDSSecurityGroup = ({ data }) => {
  if (!data) return null;

  // Helper function
  const valueOrNone = (value) => value || "None";

  const {
    name,
    DBSecurityGroupDescription,
    EC2SecurityGroups = [],
    IPRanges = []
  } = data;

  const totalAuthorizations = EC2SecurityGroups.length + IPRanges.length;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Security Group Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{name}</h4>
      </div>

      {/* Information Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
        <ul className="space-y-3">
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Description:</span>
            <i className="ml-2 text-gray-400 italic">{valueOrNone(DBSecurityGroupDescription)}</i>
          </li>
        </ul>
      </div>

      {/* Authorizations Section */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-3">
          Authorizations
          <CountBadge count={totalAuthorizations} />
        </h4>
        
        {totalAuthorizations > 0 ? (
          <ul className="space-y-3">
            {/* EC2 Security Groups */}
            {EC2SecurityGroups.map((sg, idx) => (
              <li key={`ec2-${idx}`} className="flex items-start text-sm text-gray-300">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0 mt-1.5"></span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                      {sg.EC2SecurityGroupName}
                    </samp>
                    <span className="text-gray-400">({sg.EC2SecurityGroupId})</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    @ {sg.EC2SecurityGroupOwnerId} 
                    <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
                      sg.Status === 'authorized' ? 'bg-green-600 text-white' : 
                      sg.Status === 'authorizing' ? 'bg-yellow-600 text-white' : 
                      'bg-red-600 text-white'
                    }`}>
                      {sg.Status}
                    </span>
                  </div>
                </div>
            </li>
          ))}
            
            {/* IP Ranges */}
            {IPRanges.map((ip, idx) => (
              <li key={`ip-${idx}`} className="flex items-start text-sm text-gray-300">
                <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 flex-shrink-0 mt-1.5"></span>
                <div className="flex items-center gap-2">
                  <samp className="bg-gray-700 px-2 py-1 rounded text-green-300 font-mono text-xs">
                    {ip.CIDRIP}
                  </samp>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    ip.Status === 'authorized' ? 'bg-green-600 text-white' : 
                    ip.Status === 'authorizing' ? 'bg-yellow-600 text-white' : 
                    'bg-red-600 text-white'
                  }`}>
                    {ip.Status}
                  </span>
                </div>
            </li>
          ))}
        </ul>
        ) : (
          <div className="text-sm text-gray-500 italic">No authorizations configured</div>
        )}
      </div>
    </div>
  );
};

// ---------- RDS Instance ----------
export const RDSInstance = ({ data }) => {
  if (!data) return null;

  // Helper functions
  const convertBoolToEnabled = (val) => (val ? "Enabled" : "Disabled");
  const formatDate = (date) => (date ? new Date(date).toLocaleString() : "N/A");
  const valueOrNone = (value) => value || "None";
  const makeTitle = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : "");

  const {
    name,
    arn,
    region,
    Engine,
    InstanceCreateTime,
    DBInstanceStatus,
    is_read_replica,
    AutoMinorVersionUpgrade,
    MultiAZ,
    DBInstanceClass,
    BackupRetentionPeriod,
    EnhancedMonitoringResourceArn,
    StorageEncrypted,
    CACertificateIdentifier,
    Endpoint,
    PubliclyAccessible
  } = data;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Instance Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{name}</h4>
      </div>

      {/* Information Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
        <ul className="space-y-3">
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">ARN:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
              {valueOrNone(arn)}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">Region:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(region)}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">Engine:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(Engine)}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">Created:</span>
            <span className="ml-2">{formatDate(InstanceCreateTime)}</span>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">Status:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {makeTitle(DBInstanceStatus)}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">Is Read Replica:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {is_read_replica ? "Yes" : "No"}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">Auto Minor Version Upgrade:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              AutoMinorVersionUpgrade ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {convertBoolToEnabled(AutoMinorVersionUpgrade)}
            </span>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">Multi Availability Zones:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              MultiAZ ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {convertBoolToEnabled(MultiAZ)}
            </span>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">Instance Class:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(DBInstanceClass)}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">Backup Retention Period:</span>
            <span className="ml-2">{BackupRetentionPeriod} days</span>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">Enhanced Monitoring:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              EnhancedMonitoringResourceArn ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {convertBoolToEnabled(EnhancedMonitoringResourceArn)}
            </span>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">Encrypted Storage:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              StorageEncrypted ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {convertBoolToEnabled(StorageEncrypted)}
            </span>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">CA Certificate:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(CACertificateIdentifier)}
            </samp>
          </li>
        </ul>
      </div>

      {/* Network Section */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Network</h4>
        <ul className="space-y-3">
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">Endpoint:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {Endpoint?.Address && Endpoint?.Port 
                ? `${Endpoint.Address}:${Endpoint.Port}` 
                : 'N/A'
              }
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">Publicly Accessible:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              PubliclyAccessible ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {convertBoolToEnabled(PubliclyAccessible)}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

// ---------- Snapshot ----------
export const RDSSnapshot = ({ data }) => {
  if (!data) return null;

  // Helper functions
  const valueOrNone = (value) => value || "None";
  const formatDate = (date) => (date ? new Date(date).toLocaleString() : "N/A");
  const convertBoolToEnabled = (val) => (val ? "Enabled" : "Disabled");

  const {
    name,
    is_cluster,
    DBClusterIdentifier,
    DBInstanceIdentifier,
    SnapshotCreateTime,
    Encrypted,
    OptionGroupName,
    attributes = [],
    region,
    vpc_id
  } = data;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Snapshot Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{name}</h4>
      </div>

      {/* Information Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
        <ul className="space-y-3">
          {is_cluster ? (
            <>
              <li className="flex items-center text-sm text-gray-300">
                <span className="font-medium min-w-[140px]">DB Cluster:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                  {valueOrNone(DBClusterIdentifier)}
                </samp>
              </li>
              <li className="flex items-center text-sm text-gray-300">
                <span className="font-medium min-w-[140px]">Cluster Snapshot:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                  {valueOrNone(is_cluster)}
                </samp>
              </li>
            </>
          ) : (
            <li className="flex items-center text-sm text-gray-300">
              <span className="font-medium min-w-[140px]">RDS Instance:</span>
              <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                <ResourceLink
                  resourcePath={`services.rds.regions.${region}.vpcs.${vpc_id}.instances.${DBInstanceIdentifier}`}
                  name={DBInstanceIdentifier}
                />
              </samp>
            </li>
          )}
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Created:</span>
            <span className="ml-2">{formatDate(SnapshotCreateTime)}</span>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Encryption:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              Encrypted ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {convertBoolToEnabled(Encrypted)}
            </span>
          </li>
          
          {!is_cluster && (
            <li className="flex items-center text-sm text-gray-300">
              <span className="font-medium min-w-[140px]">Option group:</span>
              <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                {valueOrNone(OptionGroupName)}
              </samp>
            </li>
          )}
        </ul>
      </div>

      {/* Attributes Section */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-3">
          Attributes
          <CountBadge count={attributes.length} />
        </h4>
        {attributes.length > 0 ? (
          <ul className="space-y-2">
            {attributes.map((attr, idx) => (
              <li key={idx} className="flex items-start text-sm text-gray-300">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0 mt-1.5"></span>
                <div className="flex-1">
                  <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs mr-2">
                    {attr.AttributeName}
                  </samp>
                  <span className="text-gray-400">:</span>
                  <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-green-300 font-mono text-xs">
                    {valueOrNone(attr.AttributeValues)}
                  </samp>
                </div>
            </li>
          ))}
        </ul>
        ) : (
          <div className="text-sm text-gray-500 italic">No attributes</div>
        )}
      </div>
    </div>
  );
};

// ---------- Subnet Group ----------
export const RDSSubnetGroup = ({ data }) => {
  if (!data) return null;

  const { name, resource } = data;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Subnet Group Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{name}</h4>
      </div>

      {/* Attributes Section */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Attributes</h4>
        <div className="bg-gray-700 rounded-lg p-4">
          <GenericObject obj={resource} />
        </div>
      </div>
    </div>
  );
};

// ---------- Helpers ----------
const boolToEnabled = (val) => (val ? "Enabled" : "Disabled");
const formatDate = (date) => (date ? new Date(date).toLocaleString() : "N/A");
const makeTitle = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : "");

// Safe getValueAt helper - returns undefined if path doesn't exist
// Note: This is a simplified version. In the original Handlebars templates,
// this accessed a global data object. In React, data should be passed via props.
const getValueAt = (...path) => {
  // For now, return undefined as we should be accessing data through props
  // Components using this should be refactored to receive data directly
  return undefined;
};

// ---------- Redshift Parameter Group ----------
export const RedshiftParameterGroup = ({ data }) => {
  if (!data) return null;

  // Helper function
  const valueOrNone = (value) => value || "None";

  const {
    name,
    arn,
    description,
    family,
    is_default,
    parameters = {}
  } = data;

  const parametersArray = Object.entries(parameters);

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Group Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{name}</h4>
      </div>

      {/* Information Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
        <ul className="space-y-3">
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">ARN:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
              {valueOrNone(arn)}
            </samp>
          </li>
          
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Description:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
              {valueOrNone(description)}
            </samp>
              </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Group Family:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(family)}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Default Parameter Group:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {String(is_default)}
            </samp>
          </li>
        </ul>
      </div>

      {/* Parameters Section */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-3">
          Parameters
          <CountBadge count={parametersArray.length} />
        </h4>
        {parametersArray.length > 0 ? (
          <div className="space-y-4">
            {parametersArray.map(([key, param], idx) => (
              <div key={idx} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center text-sm text-gray-300 mb-2">
                  <samp className="bg-gray-600 px-2 py-1 rounded text-blue-300 font-mono text-xs mr-2">
                    {key}
                  </samp>
                  <span className="text-gray-400">:</span>
                  <samp className="ml-2 bg-gray-600 px-2 py-1 rounded text-green-300 font-mono text-xs">
                    {valueOrNone(param.value)}
                  </samp>
                </div>
                <div className="flex items-start text-xs text-gray-400">
                  <span className="font-medium min-w-[40px]">ARN:</span>
                  <samp className="ml-2 bg-gray-600 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
                    {valueOrNone(param.arn)}
                  </samp>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500 italic">No parameters</div>
        )}
      </div>
    </div>
  );
};

// ---------- Redshift Cluster ----------
export const RedshiftCluster = ({ data }) => {
  if (!data) return null;

  // Helper functions
  const valueOrNone = (value) => value || "None";
  const formatDate = (date) => (date ? new Date(date).toLocaleString() : "N/A");

  const {
    name,
    arn,
    NodeType,
    AllowVersionUpgrade,
    AutomatedSnapshotRetentionPeriod,
    ClusterCreateTime,
    AvailabilityZone,
    Encrypted,
    ClusterParameterGroups = [],
    Endpoint,
    PubliclyAccessible,
    VpcId,
    ClusterSubnetGroupName,
    VpcSecurityGroups = [],
    ClusterSecurityGroups = []
  } = data;

  const totalSecurityGroups = VpcSecurityGroups.length + ClusterSecurityGroups.length;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Cluster Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{name}</h4>
      </div>

      {/* Information Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
        <ul className="space-y-3">
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">ARN:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
              {valueOrNone(arn)}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">Node Type:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(NodeType)}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">Allow Version Upgrade:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              AllowVersionUpgrade ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {String(AllowVersionUpgrade)}
            </span>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">Automated Snapshot Retention Period:</span>
            <span className="ml-2">{AutomatedSnapshotRetentionPeriod} days</span>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">Created at:</span>
            <span className="ml-2">{formatDate(ClusterCreateTime)}</span>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">Availability Zone:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(AvailabilityZone)}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">Encrypted:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              Encrypted ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {String(Encrypted)}
            </span>
          </li>
          
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">Cluster Parameter Groups:</span>
            <div className="ml-2 flex-1">
              {ClusterParameterGroups.length > 0 ? (
                <ul className="space-y-1">
                  {ClusterParameterGroups.map((pg, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></span>
                      <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                        {pg.ParameterGroupName}
                      </samp>
                    </li>
              ))}
            </ul>
              ) : (
                <span className="text-gray-500 italic">No parameter groups</span>
              )}
            </div>
          </li>
        </ul>
      </div>

      {/* Network Section */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Network</h4>
        <ul className="space-y-3">
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">Endpoint:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {Endpoint?.Address && Endpoint?.Port 
                ? `${Endpoint.Address}:${Endpoint.Port}` 
                : 'N/A'
              }
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">Publicly Accessible:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              PubliclyAccessible ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {String(PubliclyAccessible)}
            </span>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">VPC:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(VpcId)}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">Subnet:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(ClusterSubnetGroupName)}
            </samp>
          </li>
          
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[200px]">Security Groups:</span>
            <div className="ml-2 flex-1">
              {totalSecurityGroups > 0 ? (
                <ul className="space-y-2">
                  {VpcSecurityGroups.map((sg, idx) => (
                    <li key={`vpc-${idx}`} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></span>
                      <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs mr-2">
                        {sg.VpcSecurityGroupId}
                      </samp>
                      <span className="text-gray-400">:</span>
                      <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
                        sg.Status === 'active' ? 'bg-green-600 text-white' : 
                        sg.Status === 'pending' ? 'bg-yellow-600 text-white' : 
                        'bg-red-600 text-white'
                      }`}>
                        {sg.Status}
                      </span>
                    </li>
                  ))}
                  {ClusterSecurityGroups.map((sg, idx) => (
                    <li key={`cluster-${idx}`} className="flex items-center">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 flex-shrink-0"></span>
                      <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs mr-2">
                        {sg.ClusterSecurityGroupName}
                      </samp>
                      <span className="text-gray-400">:</span>
                      <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
                        sg.Status === 'active' ? 'bg-green-600 text-white' : 
                        sg.Status === 'pending' ? 'bg-yellow-600 text-white' : 
                        'bg-red-600 text-white'
                      }`}>
                        {sg.Status}
                      </span>
                    </li>
              ))}
            </ul>
              ) : (
                <span className="text-gray-500 italic">No security groups</span>
              )}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

// ---------- Redshift Security Group ----------
export const RedshiftSecurityGroup = ({ data }) => {
  if (!data) return null;

  // Helper function
  const valueOrNone = (value) => value || "None";

  const {
    resource_key,
    Description,
    IPRanges = [],
    EC2SecurityGroups = []
  } = data;

  const totalRules = IPRanges.length + EC2SecurityGroups.length;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Security Group Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{resource_key}</h4>
      </div>

      {/* Information Section */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
        <ul className="space-y-3">
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Description:</span>
            <i className="ml-2 text-gray-400 italic">{valueOrNone(Description)}</i>
          </li>
        </ul>
      </div>

      {/* Rules Section */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-3">
          Rules
          <CountBadge count={totalRules} />
        </h4>
        
        {totalRules > 0 ? (
          <div className="space-y-4">
            {/* IP Addresses */}
            {IPRanges.length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-gray-300 mb-2">IP Addresses</h5>
                <ul className="space-y-2">
                  {IPRanges.map((ip, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-300">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 flex-shrink-0"></span>
                      <samp className="bg-gray-700 px-2 py-1 rounded text-green-300 font-mono text-xs mr-2">
                        {ip.CIDRIP}
                      </samp>
                      <span className="text-gray-400">:</span>
                      <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
                        ip.Status === 'authorized' ? 'bg-green-600 text-white' : 
                        ip.Status === 'authorizing' ? 'bg-yellow-600 text-white' : 
                        'bg-red-600 text-white'
                      }`}>
                        {ip.Status}
                      </span>
                    </li>
                ))}
              </ul>
              </div>
            )}

            {/* EC2 Security Groups */}
            {EC2SecurityGroups.length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-gray-300 mb-2">EC2 Security Groups</h5>
                <ul className="space-y-2">
                  {EC2SecurityGroups.map((sg, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-300">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0 mt-1.5"></span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                            {sg.EC2SecurityGroupName}
                          </samp>
                          <span className="text-gray-400">(AWS account ID {sg.UserId})</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          <span className="text-gray-400">:</span>
                          <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
                            sg.Status === 'authorized' ? 'bg-green-600 text-white' : 
                            sg.Status === 'authorizing' ? 'bg-yellow-600 text-white' : 
                            'bg-red-600 text-white'
                          }`}>
                            {sg.Status}
                          </span>
                        </div>
                      </div>
                  </li>
                ))}
              </ul>
              </div>
          )}
          </div>
        ) : (
          <div className="text-sm text-gray-500 italic">No rules configured</div>
        )}
      </div>
    </div>
  );
};

// ---------- Redshift Cluster Node ----------
export const RedshiftClusterNode = ({ data }) => {
  if (!data) return null;

  // Helper function
  const valueOrNone = (value) => value || "None";

  const {
    NodeRole,
    PrivateIPAddress,
    PublicIPAddress
  } = data;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Node Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">
          {NodeRole} Node
        </h4>
      </div>

      {/* Node Information */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Network Information</h4>
        <ul className="space-y-3">
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Node Role:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(NodeRole)}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Private IP:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-green-300 font-mono text-xs">
              {valueOrNone(PrivateIPAddress)}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Public IP:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-orange-300 font-mono text-xs">
              {valueOrNone(PublicIPAddress)}
            </samp>
          </li>
        </ul>
      </div>
    </div>
  );
};

// Single domain component (equivalent to the Handlebars modal template)
export const Route53Domain = ({ data }) => {
  if (!data) return null;

  // Helper functions
  const valueOrNone = (value) => value || "None";
  const convertBoolToEnabled = (val) => (val ? "Enabled" : "Disabled");
  const formatDate = (date) => (date ? new Date(date).toLocaleString() : "N/A");

  const {
    name,
    arn,
    auto_renew,
    transfer_lock,
    transfer_lock_unauthorized,
    expiry
  } = data;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Domain Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{name}</h4>
      </div>

      {/* Information Section */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
        <ul className="space-y-3">
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">ARN:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
              {valueOrNone(arn)}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Auto Renew:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              auto_renew ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {convertBoolToEnabled(auto_renew)}
          </span>
          </li>
          
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Transfer Lock:</span>
            <div className="ml-2 flex-1">
              <span className={`px-2 py-1 text-xs font-medium rounded ${
                transfer_lock ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
              }`}>
                {convertBoolToEnabled(transfer_lock)}
              </span>
              {!transfer_lock && transfer_lock_unauthorized && (
                <div className="mt-2 flex items-center text-xs text-yellow-400 bg-yellow-900/20 px-3 py-2 rounded-lg">
                  <i className="fa fa-exclamation-triangle mr-2"></i>
                  <span>This domain's top-level domain (TLD) does not support domain locking.</span>
                </div>
        )}
      </div>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[140px]">Expiry:</span>
            <span className="ml-2">{formatDate(expiry)}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

// Single Hosted Zone component
export const Route53HostedZone = ({ data }) => {
  if (!data) return null;

  // Helper function
  const valueOrNone = (value) => value || "None";

  const {
    name,
    id,
    arn,
    caller_reference,
    resource_record_set_count
  } = data;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Hosted Zone Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{name}</h4>
      </div>

      {/* Information Section */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
        <ul className="space-y-3">
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[180px]">ID:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(id)}
            </samp>
          </li>
          
          <li className="flex items-start text-sm text-gray-300">
            <span className="font-medium min-w-[180px]">ARN:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
              {valueOrNone(arn)}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[180px]">Caller Reference:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
              {valueOrNone(caller_reference)}
            </samp>
          </li>
          
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[180px]">Resource Record Set Count:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-green-300 font-mono text-xs">
              {valueOrNone(resource_record_set_count)}
            </samp>
          </li>
        </ul>
      </div>
    </div>
  );
};

// Recursive component for regions → hosted zones
export const Route53HostedZonesByRegion = ({ data }) => {
  if (!data) return null;

  return (
    <>
      {Object.entries(data).map(([regionId, regionData]) => (
        <div key={regionId} className="region-section">
          <div className="list-group-item active">
            <h3 className="list-group-item-heading">Region: {regionId}</h3>
          </div>

          {regionData.hosted_zones && Object.entries(regionData.hosted_zones).length > 0 ? (
            Object.entries(regionData.hosted_zones).map(([zoneKey, zone]) => (
              <Route53HostedZone key={zoneKey} data={zone} />
            ))
          ) : (
            <div className="list-group-item">
              <i>No hosted zones found in this region</i>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

// ---------- S3 ACLs ----------
export const S3ACLs = ({ data }) => {
  if (!data) return null;

  // Helper function
  const makeTitle = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : "");

  const { resource_type, grantees = [] } = data;

  if (!grantees.length) return null;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* ACLs Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">
          {makeTitle(resource_type)} ACLs
          <CountBadge count={grantees.length} />
        </h4>
      </div>

      {/* ACLs Table */}
      <div className="px-6 py-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
              <thead>
              <tr className="border-b border-gray-600">
                <th className="text-center py-3 px-2 text-gray-300 font-medium w-1/5"></th>
                <th className="text-center py-3 px-2 text-gray-300 font-medium w-1/5">List</th>
                <th className="text-center py-3 px-2 text-gray-300 font-medium w-1/5">Upload/Delete</th>
                <th className="text-center py-3 px-2 text-gray-300 font-medium w-1/5">View<br/>Permissions</th>
                <th className="text-center py-3 px-2 text-gray-300 font-medium w-1/5">Edit<br/>Permissions</th>
                </tr>
              </thead>
              <tbody>
                {grantees.map((g, idx) => (
                <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="text-center py-3 px-2 text-gray-300 font-medium">
                    <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                      {g.DisplayName}
                    </samp>
                    </td>
                  <td className="text-center py-3 px-2">
                    <i className={`fa ${g.permissions?.read ? "fa-check text-green-400" : "fa-times text-red-400"}`} />
                    </td>
                  <td className="text-center py-3 px-2">
                    <i className={`fa ${g.permissions?.write ? "fa-check text-green-400" : "fa-times text-red-400"}`} />
                    </td>
                  <td className="text-center py-3 px-2">
                    <i className={`fa ${g.permissions?.read_acp ? "fa-check text-green-400" : "fa-times text-red-400"}`} />
                    </td>
                  <td className="text-center py-3 px-2">
                    <i className={`fa ${g.permissions?.write_acp ? "fa-check text-green-400" : "fa-times text-red-400"}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

// ---------- Helpers ----------
export const normalizeIamPolicies = (data, resourceType) => {
  if (!data) return [];

  return Object.entries(data).flatMap(([entityId, entity]) => {
    const rows = [];

    // Managed policies
    if (entity && entity.policies) {
      for (const [policyId, policy] of Object.entries(entity.policies)) {
        rows.push({
          entityName: entityId,
          policyName: policyId,
          condition: !!(policy && policy.condition),
      resourceType,
          policyType: 'managed',
        });
      }
    }

    // Inline policies
    if (entity && entity.inline_policies) {
      for (const [inlineId, inlinePolicy] of Object.entries(entity.inline_policies)) {
        rows.push({
          entityName: entityId,
          policyName: (inlinePolicy && inlinePolicy.name) || inlineId,
          condition: !!(inlinePolicy && inlinePolicy.condition),
          resourceType,
          policyType: 'inline',
          inlineId,
        });
      }
    }

    return rows;
  });
};

// ---------- S3 Bucket IAM Policies ----------
export const S3BucketIAMPolicies = ({ data }) => {
  if (!data) return null;

  // Helper function
  const makeTitle = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : "");

  const { resource_type, policiesData } = data;
  if (!resource_type) return null;

  const policies = normalizeIamPolicies(policiesData, resource_type);
  if (policies.length === 0) return null;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">
          {makeTitle(resource_type)} with access via IAM policies
          <CountBadge count={policies.length} />
        </h4>
      </div>

      {/* Table */}
      <div className="px-6 py-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
              <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-2 px-3 text-gray-300 font-medium w-2/5">{makeTitle(resource_type)} name</th>
                <th className="text-center py-2 px-3 text-gray-300 font-medium w-2/5">Policy name</th>
                <th className="text-center py-2 px-3 text-gray-300 font-medium w-1/5">Condition?</th>
                </tr>
              </thead>
              <tbody>
                {policies.map((p, idx) => (
                <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="py-2 px-3 text-gray-300">
                    <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                      <ResourceLink
                        resourcePath={`services.iam.${p.resourceType}.${p.entityName}`}
                        name={p.entityName}
                      />
                    </samp>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <samp className="bg-gray-700 px-2 py-1 rounded text-green-300 font-mono text-xs">
                      {p.policyType === 'managed' ? (
                        <ResourceLink
                          resourcePath={`services.iam.policies.${p.policyName}`}
                          name={p.policyName}
                        />
                      ) : (
                        <span>{p.policyName}</span>
                      )}
                    </samp>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      p.condition ? 'bg-yellow-600 text-white' : 'bg-gray-600 text-white'
                    }`}>
                      {p.condition ? 'Yes' : 'No'}
                    </span>
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};


// ---------- S3 Buckets ----------
export const S3Bucket = ({ data }) => {
  if (!data) return null;

  // Helper functions
  const valueOrNone = (value) => value || "None";
  const formatDate = (date) => (date ? new Date(date).toLocaleString() : "N/A");
  const convertBoolToEnabled = (val) => (val ? "Enabled" : "Disabled");

  // Normalize: if object of buckets -> convert to array
  const buckets = Array.isArray(data) ? data : Object.values(data || {});

  return (
    <div className="space-y-6">
      {buckets.map((b, idx) => (
        <div key={idx} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-4">
            <h4 className="text-lg font-semibold text-white">{b.name}</h4>
          </div>

          {/* Information */}
          <div className="px-6 py-4 border-b border-gray-700">
            <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
            <ul className="space-y-3">
              <li className="flex items-start text-sm text-gray-300">
                <span className="font-medium min-w-[180px]">ARN:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">
                  {valueOrNone(b.arn)}
                </samp>
              </li>

              <li className="flex items-center text-sm text-gray-300">
                <span className="font-medium min-w-[180px]">Region:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                  {valueOrNone(b.region)}
                </samp>
              </li>

              <li className="flex items-center text-sm text-gray-300">
                <span className="font-medium min-w-[180px]">Creation Date:</span>
                <span className="ml-2">{formatDate(b.CreationDate)}</span>
              </li>

              <li className="flex items-center text-sm text-gray-300">
                <span className="font-medium min-w-[180px]">Logging:</span>
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${b.logging ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                  {convertBoolToEnabled(b.logging)}
                </span>
              </li>

              <li className="flex items-center text-sm text-gray-300">
                <span className="font-medium min-w-[180px]">Default Encryption:</span>
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${b.default_encryption_enabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                  {convertBoolToEnabled(b.default_encryption_enabled)}
                </span>
              </li>

            {b.default_encryption_enabled && (
              <>
                  <li className="flex items-center text-sm text-gray-300">
                    <span className="font-medium min-w-[180px]">Encryption Algorithm:</span>
                    <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-green-300 font-mono text-xs">
                      {valueOrNone(b.default_encryption_algorithm)}
                    </samp>
                  </li>
                  <li className="flex items-center text-sm text-gray-300">
                    <span className="font-medium min-w-[180px]">Encryption Key:</span>
                    <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-green-300 font-mono text-xs break-all">
                      {valueOrNone(b.default_encryption_key)}
                    </samp>
                  </li>
              </>
            )}

              <li className="flex items-center text-sm text-gray-300">
                <span className="font-medium min-w-[180px]">Versioning:</span>
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${b.versioning_status_enabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                  {convertBoolToEnabled(b.versioning_status_enabled)}
                </span>
              </li>

              <li className="flex items-center text-sm text-gray-300">
                <span className="font-medium min-w-[180px]">MFA Delete:</span>
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${b.version_mfa_delete_enabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                  {convertBoolToEnabled(b.version_mfa_delete_enabled)}
                </span>
              </li>

              <li className="flex items-center text-sm text-gray-300">
                <span className="font-medium min-w-[180px]">Secure Transport:</span>
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${b.secure_transport_enabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                  {convertBoolToEnabled(b.secure_transport_enabled)}
                </span>
              </li>

              <li className="flex items-center text-sm text-gray-300">
                <span className="font-medium min-w-[180px]">Static Website Hosting:</span>
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${b.web_hosting_enabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                  {convertBoolToEnabled(b.web_hosting_enabled)}
                </span>
              </li>
            </ul>
          </div>

          {/* Public Access Block Config */}
          {b.public_access_block_configuration && (
            <div className="px-6 py-4 border-b border-gray-700">
              <S3PublicAccessBlockConfiguration data={{ config: b.public_access_block_configuration }} />
        </div>
          )}

          {/* Bucket Policy */}
          <div className="px-6 py-4 border-b border-gray-700">
            {b.policy ? (
              <AccordionPolicy
                name="Bucket Policy"
                document={b.policy}
                policyPath={`s3.buckets.${b.name}.policy`}
              />
            ) : (
              <h4 className="text-base font-semibold text-gray-400">Bucket Policy</h4>
            )}
          </div>

          {/* ACLs */}
          {b.grantees && (
            <div className="px-6 py-4 border-b border-gray-700">
              <S3ACLs data={{ resource_type: 'bucket', grantees: b.grantees }} />
            </div>
          )}

          {/* IAM Policies */}
          <div className="px-6 py-4 border-b border-gray-700">
            <S3BucketIAMPolicies data={{ resource_type: 'groups', policiesData: b.groups }} />
          </div>
          <div className="px-6 py-4 border-b border-gray-700">
            <S3BucketIAMPolicies data={{ resource_type: 'roles', policiesData: b.roles }} />
          </div>
          <div className="px-6 py-4">
            <S3BucketIAMPolicies data={{ resource_type: 'users', policiesData: b.users }} />
          </div>

          {/* Keys */}
          {Array.isArray(b.keys) && b.keys.length > 0 && (
            <div className="px-6 py-4">
              <div className="border border-gray-700 rounded-lg">
                <div className="flex items-center justify-between p-4">
                  <h4 className="text-base font-semibold text-gray-200">
                    Keys
                    <CountBadge count={b.keys.length} />
                  </h4>
                </div>
                <div className="px-4 pb-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left py-2 px-3 text-gray-300 font-medium w-4/5">Name</th>
                        <th className="text-center py-2 px-3 text-gray-300 font-medium w-1/10">Encrypted</th>
                        <th className="text-center py-2 px-3 text-gray-300 font-medium w-1/10">Perms</th>
                      </tr>
                    </thead>
                    <tbody>
                      {b.keys.map((k, kIdx) => (
                        <tr key={kIdx} className="border-b border-gray-700 hover:bg-gray-700/50">
                          <td className="py-2 px-3 text-gray-300">
                            <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                              {k.name}
                            </samp>
                          </td>
                          <td className="py-2 px-3 text-center">
                            {k.ServerSideEncryption ? (
                              <i className="fa fa-check text-green-400" />
                            ) : (
                              <i className="fa fa-times text-red-400" />
                            )}
                          </td>
                          <td className="py-2 px-3 text-center">
                            {k.grantees && k.grantees.length > 0 ? (
                              <i className="fa fa-check text-yellow-400" />
                            ) : (
                              <i className="fa fa-times text-gray-400" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ---------- S3 Objects ----------
export const S3Object = ({ data }) => {
  if (!data) return null;

  const { bucketName, object } = data;
  if (!object) return null;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{bucketName}/{object.name}</h4>
      </div>

      {/* Information */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
        <ul className="space-y-3">
          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[220px]">Server-side encryption:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              object.ServerSideEncryption ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {object.ServerSideEncryption ? 'Enabled' : 'Not Encrypted'}
            </span>
          </li>

          <li className="flex items-center text-sm text-gray-300">
            <span className="font-medium min-w-[220px]">Permissions match bucket's:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
              object.granteesMatch ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'
            }`}>
              {object.granteesMatch ? 'Yes' : 'No'}
            </span>
          </li>
        </ul>
      </div>

      {/* ACLs */}
      {object.grantees && (
        <div className="px-6 py-4">
          <S3ACLs data={{ resource_type: 'object', grantees: object.grantees }} />
        </div>
      )}
    </div>
  );
};

// ---------- S3 Public Access Block Configuration ----------
export const S3PublicAccessBlockConfiguration = ({ data }) => {
  // Helper function
  const convertBoolToEnabled = (val) => (val ? "Enabled" : "Disabled");

  const config = data?.config || data?.public_access_block_configuration || data;
  if (!config) return null;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">Public Access Block Configuration</h4>
      </div>

      <div className="px-6 py-4">
        <ul className="space-y-3 text-sm text-gray-300">
          <li className="flex items-center">
            <span className="font-medium min-w-[240px]">Ignore Public ACLs:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${config.IgnorePublicAcls ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
              {convertBoolToEnabled(config.IgnorePublicAcls)}
            </span>
          </li>
          <li className="flex items-center">
            <span className="font-medium min-w-[240px]">Block Public Policies:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${config.BlockPublicPolicy ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
              {convertBoolToEnabled(config.BlockPublicPolicy)}
            </span>
          </li>
          <li className="flex items-center">
            <span className="font-medium min-w-[240px]">Block Public ACLs:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${config.BlockPublicAcls ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
              {convertBoolToEnabled(config.BlockPublicAcls)}
            </span>
          </li>
          <li className="flex items-center">
            <span className="font-medium min-w-[240px]">Restrict Public Buckets:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${config.RestrictPublicBuckets ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
              {convertBoolToEnabled(config.RestrictPublicBuckets)}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

// -------------------- Secrets Manager Secrets --------------------
export const SecretsManagerSecrets = ({ data }) => {
  if (!data) return null;

  // Helper functions
  const convertBoolToEnabled = (val) => (val ? "Enabled" : "Disabled");
  const formatDate = (date) => (date ? new Date(date).toLocaleString() : "N/A");
  const valueOrNone = (value) => value || "None";

  return (
    <>
      {Object.entries(data).map(([region, regionData]) => (
        <div key={region} className="space-y-6">
          <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">Region: {region}</div>

          {regionData.secrets && Object.keys(regionData.secrets).length > 0 ? (
            Object.entries(regionData.secrets).map(([secretId, secret]) => (
              <div key={secretId} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                {/* Header */}
                <div className="bg-blue-600 px-6 py-4">
                  <h4 className="text-lg font-semibold text-white">{secret.name || "Unnamed Secret"}</h4>
                </div>

                {/* Information */}
                <div className="px-6 py-4">
                  <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center text-sm text-gray-300">
                      <span className="font-medium min-w-[200px]">Name:</span>
                      <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(secret.name)}</samp>
                    </li>
                    <li className="flex items-start text-sm text-gray-300">
                      <span className="font-medium min-w-[200px]">ARN:</span>
                      <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">{valueOrNone(secret.arn)}</samp>
                    </li>
                    <li className="flex items-start text-sm text-gray-300">
                      <span className="font-medium min-w-[200px]">Description:</span>
                      <i className="ml-2 text-gray-400 italic">{valueOrNone(secret.description)}</i>
                    </li>
                    <li className="flex items-center text-sm text-gray-300">
                      <span className="font-medium min-w-[200px]">Last Changed Date:</span>
                      <span className="ml-2">{formatDate(secret.last_changed_date)}</span>
                    </li>
                    <li className="flex items-center text-sm text-gray-300">
                      <span className="font-medium min-w-[200px]">Last Accessed Date:</span>
                      <span className="ml-2">{formatDate(secret.last_accessed_date)}</span>
                    </li>
                    <li className="flex items-center text-sm text-gray-300">
                      <span className="font-medium min-w-[200px]">KMS Key:</span>
                      <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">{valueOrNone(secret.kms)}</samp>
                    </li>
                    <li className="flex items-center text-sm text-gray-300">
                      <span className="font-medium min-w-[200px]">Rotation:</span>
                      <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${secret.rotation ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}> {convertBoolToEnabled(secret.rotation)} </span>
                    </li>
                  {secret.rotation && (
                    <>
                        <li className="flex items-start text-sm text-gray-300">
                          <span className="font-medium min-w-[200px]">Rotation Lambda ARN:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">{valueOrNone(secret.rotation_lambda_arn)}</samp>
                        </li>
                        <li className="flex items-center text-sm text-gray-300">
                          <span className="font-medium min-w-[200px]">Rotation Interval:</span>
                          <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(secret.rotation_interval)}</samp>
                        </li>
                    </>
                  )}
                  </ul>
                </div>

                {/* Policy */}
                {secret.policy && secret.policy.Statement ? (
                  <div className="px-6 pb-6">
                    <AccordionPolicy
                      name="Resource Permissions"
                      policyPath={`secretsmanager.regions.${region}.secrets.${secretId}.policy`}
                      document={secret.policy}
                    />
                  </div>
                ) : null}
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-400 italic">No secrets found</div>
          )}
        </div>
      ))}
    </>
  );
};

// -------------------- SES Identities --------------------
export const SESIdentities = ({ data }) => {
  if (!data) return null;

  // Helper functions
  const convertBoolToEnabled = (val) => (val ? "Enabled" : "Disabled");
  const valueOrNone = (value) => value || "None";

  return (
    <>
      {Object.entries(data).map(([region, regionData]) => (
        <div key={region} className="space-y-6">
          <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">Region: {region}</div>

          {regionData.identities && Object.keys(regionData.identities).length > 0 ? (
            Object.entries(regionData.identities).map(([identityId, identity]) => (
              <div key={identityId} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                {/* Header */}
                <div className="bg-blue-600 px-6 py-4">
                  <h4 className="text-lg font-semibold text-white">{identity.name || "Unnamed Identity"}</h4>
                </div>

                {/* Information */}
                <div className="px-6 py-4 border-b border-gray-700">
                  <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start text-sm text-gray-300">
                      <span className="font-medium min-w-[180px]">ARN:</span>
                      <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">{valueOrNone(identity.arn)}</samp>
                    </li>
                  </ul>
                </div>

                {/* DKIM Configuration */}
                <div className="px-6 py-4 border-b border-gray-700">
                  <h4 className="text-base font-semibold text-gray-200 mb-3">DKIM Configuration</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center text-sm text-gray-300">
                      <span className="font-medium min-w-[180px]">Enabled:</span>
                      <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${identity.DkimEnabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>{convertBoolToEnabled(identity.DkimEnabled)}</span>
                    </li>
                    <li className="flex items-center text-sm text-gray-300">
                      <span className="font-medium min-w-[180px]">Verification Status:</span>
                      <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(identity.DkimVerificationStatus)}</samp>
                    </li>
                  </ul>
                </div>

                {/* Policies */}
                <div className="px-6 py-4">
                  <h4 className="text-base font-semibold text-gray-200 mb-3">Policies</h4>
                  {identity.policies && Object.entries(identity.policies).length > 0 ? (
                    <div className="space-y-3">
                      {Object.entries(identity.policies).map(([policyKey, policyDoc], index) => (
                      <AccordionPolicy
                        key={policyKey}
                        name={`${policyKey} (${identity.arn || "unknown"})`}
                        policyPath={`ses.regions.${region}.identities.${identityId}.policies.${index}`}
                        document={policyDoc}
                      />
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 italic">No policies found</div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-400 italic">No identities found</div>
          )}
        </div>
      ))}
    </>
  );
};


// -------------------- Policy Component --------------------
export const Policy = ({ document }) => {
  if (!document) return null;
  return (
    <pre className="code">{JSON.stringify(document, null, 2)}</pre>
  );
};

// -------------------- SNS Topics --------------------
export const SNSTopics = ({ data }) => {
  if (!data) return null;

  // Helper functions
  const valueOrNone = (value) => value || "None";
  const makeTitle = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : "");

  return (
    <>
      {Object.entries(data).map(([region, regionData]) => (
        <div key={region} className="space-y-6">
          <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">Region: {region}</div>

          {regionData.topics && Object.keys(regionData.topics).length > 0 ? (
            Object.entries(regionData.topics).map(([topicId, topic]) => (
              <div key={topicId} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                {/* Header */}
                <div className="bg-blue-600 px-6 py-4">
                  <h4 className="text-lg font-semibold text-white">{topic.name || "Unnamed Topic"}</h4>
                </div>

                {/* Information */}
                <div className="px-6 py-4 border-b border-gray-700">
                  <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center text-sm text-gray-300">
                      <span className="font-medium min-w-[180px]">Region:</span>
                      <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{region}</samp>
                    </li>
                    <li className="flex items-start text-sm text-gray-300">
                      <span className="font-medium min-w-[180px]">ARN:</span>
                      <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">{valueOrNone(topic.arn)}</samp>
                    </li>
                    <li className="flex items-center text-sm text-gray-300">
                      <span className="font-medium min-w-[180px]">Display name:</span>
                      <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(topic.DisplayName)}</samp>
                    </li>
                    <li className="flex items-center text-sm text-gray-300">
                      <span className="font-medium min-w-[180px]">Encrypted:</span>
                      <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${topic.KmsMasterKeyId ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>{topic.KmsMasterKeyId ? 'True' : 'False'}</span>
                    </li>
                  </ul>
                </div>

                {/* Policies */}
                {topic.Policy && (
                  <div className="px-6 py-4 border-b border-gray-700">
                    <AccordionPolicy
                      name="Access Control Policy"
                      policyPath={`sns.regions.${region}.topics.${topicId}.Policy`}
                      document={topic.Policy}
                    />
                  </div>
                )}

                {topic.DeliveryPolicy && (
                  <div className="px-6 py-4 border-b border-gray-700">
                    <AccordionPolicy
                      name="Delivery Policy"
                      policyPath={`sns.regions.${region}.topics.${topicId}.DeliveryPolicy`}
                      document={topic.DeliveryPolicy}
                    />
                  </div>
                )}

                <div className="px-6 py-4 border-b border-gray-700">
                  {topic.EffectiveDeliveryPolicy ? (
                    <AccordionPolicy
                      name="Effective Delivery Policy"
                      policyPath={`sns.regions.${region}.topics.${topicId}.EffectiveDeliveryPolicy`}
                      document={topic.EffectiveDeliveryPolicy}
                    />
                  ) : (
                    <h4 className="text-base font-semibold text-gray-400">Effective Delivery Policy</h4>
                  )}
                </div>

                {/* Subscriptions */}
                <div className="px-6 py-4">
                  <h4 className="text-base font-semibold text-gray-200 mb-3">
                    Subscriptions
                    <CountBadge count={topic.subscriptions_count || 0} />
                  </h4>
                  {topic.subscriptions && topic.subscriptions.protocol ? (
                    <ul className="space-y-3">
                      {Object.entries(topic.subscriptions.protocol).map(([protocol, subs]) => (
                        <li key={protocol} className="text-sm text-gray-300">
                          <div className="font-medium mb-1">{makeTitle(protocol)}</div>
                          <ul className="space-y-2">
                              {subs.map((sub, i) => (
                              <li key={i} className="bg-gray-700 rounded-lg p-3">
                                <div className="flex items-center text-xs text-gray-300 mb-1">
                                  <span className="min-w-[90px] text-gray-400">Endpoint:</span>
                                  <samp className="ml-2 bg-gray-600 px-2 py-1 rounded text-blue-300 font-mono">{valueOrNone(sub.Endpoint)}</samp>
                                </div>
                                <div className="flex items-center text-xs text-gray-300">
                                  <span className="min-w-[90px] text-gray-400">ARN:</span>
                                  <samp className="ml-2 bg-gray-600 px-2 py-1 rounded text-green-300 font-mono break-all">{valueOrNone(sub.arn)}</samp>
                                </div>
                                </li>
                              ))}
                            </ul>
                          </li>
                      ))}
                  </ul>
                  ) : (
                    <div className="text-sm text-gray-500 italic">No subscriptions</div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-400 italic">No topics found</div>
          )}
        </div>
      ))}
    </>
  );
};


// -------------------- SQS Queues --------------------
export const SQSQueues = ({ data }) => {
  if (!data) return null;

  // Helper functions
  const valueOrNone = (value) => value || "None";
  const formatDate = (date) => (date ? new Date(date).toLocaleString() : "N/A");

  return (
    <>
      {Object.entries(data).map(([region, regionData]) => (
        <div key={region} className="space-y-6">
          <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">Region: {region}</div>

          {regionData.queues && Object.keys(regionData.queues).length > 0 ? (
            Object.entries(regionData.queues).map(([queueId, queue]) => (
              <div key={queueId} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                {/* Header */}
                <div className="bg-blue-600 px-6 py-4">
                  <h4 className="text-lg font-semibold text-white">{queue.name || "Unnamed Queue"}</h4>
                </div>

                {/* Queue Information */}
                <div className="px-6 py-4 border-b border-gray-700">
                  <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center text-sm text-gray-300">
                      <span className="font-medium min-w-[200px]">Region:</span>
                      <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{region}</samp>
                    </li>
                    <li className="flex items-start text-sm text-gray-300">
                      <span className="font-medium min-w-[200px]">ARN:</span>
                      <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">{valueOrNone(queue.arn)}</samp>
                    </li>
                    <li className="flex items-center text-sm text-gray-300">
                      <span className="font-medium min-w-[200px]">KMS master key id:</span>
                      <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-green-300 font-mono text-xs break-all">{valueOrNone(queue.kms_master_key_id)}</samp>
                    </li>
                    <li className="flex items-center text-sm text-gray-300">
                      <span className="font-medium min-w-[200px]">SQS-managed encryption keys:</span>
                      <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${queue.sqs_managed_sse_enabled === 'true' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>{queue.sqs_managed_sse_enabled === 'true' ? 'Enabled' : 'Disabled'}</span>
                    </li>
                    <li className="flex items-center text-sm text-gray-300">
                      <span className="font-medium min-w-[200px]">Created on:</span>
                      <span className="ml-2">{formatDate(queue.CreatedTimestamp)}</span>
                    </li>
                  </ul>
                </div>

                {/* Policy */}
                <div className="px-6 py-4">
                  {queue.Policy && queue.Policy.Statement?.length > 0 ? (
                    <AccordionPolicy
                      name="Access Control Policy"
                      policyPath={`sqs.regions.${region}.queues.${queueId}.Policy`}
                      document={queue.Policy}
                    />
                  ) : (
                    <h4 className="text-base font-semibold text-gray-400">Access Control Policy</h4>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-400 italic">No queues found</div>
          )}
        </div>
      ))}
    </>
  );
};


// -------------------- Stackdriver Logging Sinks --------------------
export const AWSStackdriverLoggingSinks = ({ data }) => {
  if (!data) return null;

  // Helper function
  const valueOrNone = (value) => value || "None";

  return (
    <>
      {Object.entries(data).map(([sinkId, sink]) => (
        <div key={sinkId} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-4">
            <h4 className="text-lg font-semibold text-white">{sink.name || "Unnamed Sink"}</h4>
          </div>

          {/* Sink Information */}
          <div className="px-6 py-4">
            <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-sm text-gray-300">
                <span className="font-medium min-w-[140px]">Name:</span>
                <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                  {valueOrNone(sink.name)}
                </samp>
              </li>

              <li className="flex items-start text-sm text-gray-300">
                <span className="font-medium min-w-[140px]">Filter:</span>
                <code className="ml-2 bg-gray-700 px-2 py-1 rounded text-green-300 font-mono text-xs break-all">
                  {valueOrNone(sink.filter)}
                </code>
              </li>

              <li className="flex items-start text-sm text-gray-300">
                <span className="font-medium min-w-[140px]">Destination:</span>
                <code className="ml-2 bg-gray-700 px-2 py-1 rounded text-green-300 font-mono text-xs break-all">
                  {valueOrNone(sink.destination)}
                </code>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

// -------------------- VPC Flow Logs --------------------
export const VPCFlowLogs = ({ data }) => {
  if (!data) return null;

  // Helper functions
  const valueOrNone = (value) => value || "None";
  const formatDate = (date) => (date ? new Date(date).toLocaleString() : "N/A");

  return (
    <>
      {Object.entries(data).map(([region, regionData]) =>
        Object.entries(regionData.flow_logs || {}).map(([flowLogId, flowLog]) => (
          <div key={flowLogId} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
            {/* Header */}
            <div className="bg-blue-600 px-6 py-4">
              <h4 className="text-lg font-semibold text-white">{flowLog.name || "Unnamed Flow Log"}</h4>
            </div>

            {/* Information */}
            <div className="px-6 py-4">
              <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-gray-300">
                  <span className="font-medium min-w-[200px]">Name:</span>
                  <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(flowLog.name)}</samp>
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <span className="font-medium min-w-[200px]">Resource ID:</span>
                  <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">{valueOrNone(flowLog.resource_id)}</samp>
                </li>
                <li className="flex items-start text-sm text-gray-300">
                  <span className="font-medium min-w-[200px]">ARN:</span>
                  <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">{valueOrNone(flowLog.arn)}</samp>
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <span className="font-medium min-w-[200px]">Creation Time:</span>
                  <span className="ml-2">{formatDate(flowLog.creation_time)}</span>
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <span className="font-medium min-w-[200px]">Flow Log Status:</span>
                  <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(flowLog.flow_log_status)}</samp>
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <span className="font-medium min-w-[200px]">Deliver Logs Status:</span>
                  <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(flowLog.deliver_logs_status)}</samp>
                </li>
                <li className="flex items-start text-sm text-gray-300">
                  <span className="font-medium min-w-[200px]">Deliver Logs Error Message:</span>
                  <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">{valueOrNone(flowLog.deliver_logs_error_message)}</samp>
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <span className="font-medium min-w-[200px]">Traffic Type:</span>
                  <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(flowLog.traffic_type)}</samp>
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <span className="font-medium min-w-[200px]">Log Destination Type:</span>
                  <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(flowLog.log_destination_type)}</samp>
                </li>
                <li className="flex items-start text-sm text-gray-300">
                  <span className="font-medium min-w-[200px]">Log Destination:</span>
                  <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">{valueOrNone(flowLog.log_destination)}</samp>
                </li>
                <li className="flex items-start text-sm text-gray-300">
                  <span className="font-medium min-w-[200px]">Log Format:</span>
                  <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">{valueOrNone(flowLog.log_format)}</samp>
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <span className="font-medium min-w-[200px]">Max Aggregation Interval:</span>
                  <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(flowLog.max_aggregation_interval)}</samp>
                </li>
              </ul>
            </div>

            {/* Tags */}
            {flowLog.tags && flowLog.tags.length > 0 && (
              <div className="px-6 pb-6">
                <h4 className="text-base font-semibold text-gray-200 mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {flowLog.tags.map((tag, i) => (
                    <div key={i} className="flex items-center bg-gray-700 rounded-lg px-3 py-2">
                      <samp className="text-blue-300 font-mono text-xs mr-2">{tag.Key}</samp>
                      <span className="text-gray-400 text-xs mr-2">:</span>
                      <samp className="text-green-300 font-mono text-xs">{tag.Value}</samp>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </>
  );
};

export const VPCPeeringConnection = ({ data }) => {
  const connection = data;
  if (!connection) return null;

  // Helper function
  const valueOrNone = (value) => value || "None";

  const status = connection.Status?.Message ?? 'Unknown';

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{connection.name}</h4>
      </div>

      {/* Summary */}
      <div className="px-6 py-4 border-b border-gray-700">
        <ul className="space-y-3 text-sm text-gray-300">
          <li className="flex items-center">
            <span className="font-medium min-w-[140px]">Status:</span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${status === 'active' ? 'bg-green-600 text-white' : status === 'pending-acceptance' ? 'bg-yellow-600 text-white' : 'bg-gray-600 text-white'}`}>{status}</span>
          </li>
          <li className="flex items-start">
            <span className="font-medium min-w-[140px]">ARN:</span>
            <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">{valueOrNone(connection.arn)}</samp>
          </li>
        </ul>
      </div>

      {/* VPC Infos */}
      <div className="px-6 py-4 border-b border-gray-700">
        <VPCInfo data={{ vpc_info: connection.RequesterVpcInfo, vpc_role: 'Requester' }} />
      </div>
      <div className="px-6 py-4 border-b border-gray-700">
        <VPCInfo data={{ vpc_info: connection.AccepterVpcInfo, vpc_role: 'Accepter' }} />
      </div>

      {/* Tags */}
      {connection.Tags && connection.Tags.length > 0 && (
        <div className="px-6 py-4">
          <h4 className="text-base font-semibold text-gray-200 mb-3">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {connection.Tags.map((tag, idx) => (
              <div key={idx} className="flex items-center bg-gray-700 rounded-lg px-3 py-2">
                <samp className="text-blue-300 font-mono text-xs mr-2">{tag.Key}</samp>
                <span className="text-gray-400 text-xs mr-2">:</span>
                <samp className="text-green-300 font-mono text-xs">{tag.Value}</samp>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const VPCPeeringConnectionsList = ({ data = {} }) => {
  const keys = Object.keys(data);
  if (!keys.length) return <div className="text-sm text-gray-500 italic">No VPC Peering Connections found.</div>;
  return (
    <div className="space-y-4">
      {keys.map((key) => (
        <VPCPeeringConnection key={key} data={data[key]} />
      ))}
    </div>
  );
};

// VPC info (accepter/requester)
export const VPCInfo = ({ data }) => {
  if (!data) return null;
  const { vpc_info, vpc_role } = data;
  if (!vpc_info) return null;

  // Helper functions
  const valueOrNone = (value) => value || "None";
  const convertBoolToEnabled = (val) => (val ? "Enabled" : "Disabled");

  return (
    <div>
      <h4 className="text-base font-semibold text-gray-200 mb-3">{vpc_role} VPC</h4>
      <ul className="space-y-2 text-sm text-gray-300">
        <li className="flex items-center"><span className="font-medium min-w-[160px]">Account ID:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(vpc_info.OwnerId)}</samp></li>
        <li className="flex items-center"><span className="font-medium min-w-[160px]">VPC ID:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(vpc_info.VpcId)}</samp></li>
        <li className="flex items-center"><span className="font-medium min-w-[160px]">CIDR:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(vpc_info.CidrBlock)}</samp></li>
        {vpc_info.PeeringOptions && (
          <li>
            <div className="font-medium mb-2">Peering options:</div>
            <ul className="space-y-1">
              {Object.entries(vpc_info.PeeringOptions).map(([optKey, val]) => (
                <li key={optKey} className="flex items-center text-xs text-gray-300">
                  <span className="min-w-[200px] text-gray-400">{optKey}</span>
                  <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${val ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>{convertBoolToEnabled(val)}</span>
                </li>
              ))}
            </ul>
          </li>
        )}
      </ul>
    </div>
  );
};

// Component for one VPC details
export const VPCDetails = ({ data }) => {
  if (!data) return null;

  const valueOrNone = (value) => value || "None";

  const {
    id,
    name,
    arn,
    region,
    state,
    cidr_block,
    default: isDefault,
    network_acls = {},
    instances = [],
    flow_logs = [],
    peering_connections = [],
  } = data;

  // Normalize instances - handle both array of objects and array of IDs
  const normalizedInstances = Array.isArray(instances)
    ? instances.map((inst) => (typeof inst === 'string' ? { id: inst } : inst))
    : [];

  // Normalize flow_logs - handle both array of strings and array of objects
  const normalizedFlowLogs = Array.isArray(flow_logs)
    ? flow_logs.map((log) => (typeof log === 'string' ? log : log.id || log))
    : [];

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{name || id}</h4>
      </div>

      {/* Information */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
        <ul className="space-y-3 text-sm text-gray-300">
          <li className="flex items-center"><span className="font-medium min-w-[180px]">ID:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{id || "None"}</samp></li>
          <li className="flex items-start"><span className="font-medium min-w-[180px]">ARN:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">{valueOrNone(arn)}</samp></li>
          <li className="flex items-center"><span className="font-medium min-w-[180px]">Region:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(region)}</samp></li>
          <li className="flex items-center"><span className="font-medium min-w-[180px]">State:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(state)}</samp></li>
          <li className="flex items-center"><span className="font-medium min-w-[180px]">CIDR Block:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(cidr_block)}</samp></li>
          <li className="flex items-center"><span className="font-medium min-w-[180px]">Default:</span><span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${isDefault ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'}`}>{String(isDefault)}</span></li>
        </ul>
      </div>

      {/* Network ACLs */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">
          Network ACLs
          <CountBadge count={Object.keys(network_acls).length} />
        </h4>
        {Object.keys(network_acls).length ? (
          <ul className="space-y-2">
            {Object.keys(network_acls).map((aclId) => (
              <li key={aclId} className="flex items-center text-sm text-gray-300">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></span>
                <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                  <ResourceLink
                    resourcePath={`services.vpc.regions.${region}.vpcs.${id}.network_acls.${aclId}`}
                    name={aclId}
                  />
                </samp>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-sm text-gray-500 italic">0</div>
        )}
      </div>

      {/* Instances */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">
          Instances
          <CountBadge count={normalizedInstances.length} />
        </h4>
        {normalizedInstances.length ? (
          <ul className="space-y-2">
            {normalizedInstances.map((instance, idx) => {
              const instanceId = instance.id || instance;
              return (
                <li key={instanceId || idx} className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></span>
                  <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                    <ResourceLink
                      resourcePath={`services.ec2.regions.${region}.vpcs.${id}.instances.${instanceId}`}
                      name={instance.name || instanceId}
                    />
                  </samp>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-sm text-gray-500 italic">0</div>
        )}
      </div>

      {/* Flow Logs */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-3">
          Flow logs
          <CountBadge count={normalizedFlowLogs.length} />
        </h4>
        {normalizedFlowLogs.length ? (
          <ul className="space-y-2">
            {normalizedFlowLogs.map((logId, idx) => (
              <li key={logId || idx} className="flex items-center text-sm text-gray-300">
                <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 flex-shrink-0"></span>
                <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                  <ResourceLink
                    resourcePath={`services.vpc.regions.${region}.flow_logs.${logId}`}
                    name={logId}
                  />
                </samp>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-sm text-gray-500 italic">0</div>
        )}
      </div>

      {/* Peering Connections */}
      {peering_connections && Array.isArray(peering_connections) && peering_connections.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-700">
          <h4 className="text-base font-semibold text-gray-200 mb-3">Peering Connections</h4>
          <ul className="space-y-2">
            {peering_connections.map((pc, idx) => {
              const pcId = pc.id || pc;
              return (
                <li key={pcId || idx} className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0"></span>
                  <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{pc.name || pcId}</samp>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

// Wrapper that iterates through all regions and VPCs
export const VPCRegions = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-6">
      {Object.entries(data).map(([regionName, regionData]) => (
        <div key={regionName} className="space-y-4">
          <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">Region: {regionName}</div>
          {regionData.vpcs && Object.entries(regionData.vpcs).map(([vpcId, vpcData]) => (
            <VPCDetails key={vpcId} data={{ ...vpcData, region: regionName }} />
          ))}
        </div>
      ))}
    </div>
  );
};

// ---------- VPC Network ACL ----------
export const VPCNetworkACL = ({ data }) => {
  const acl = data;
  if (!acl) return null;

  // Helper functions
  const valueOrNone = (value) => value || "None";
  const makeTitle = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : "");

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
      {/* Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h4 className="text-lg font-semibold text-white">{acl.name ?? acl.id}</h4>
      </div>

      {/* Information */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
        <ul className="space-y-3 text-sm text-gray-300">
          <li className="flex items-center"><span className="font-medium min-w-[160px]">ID:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{acl.id}</samp></li>
          <li className="flex items-start"><span className="font-medium min-w-[160px]">ARN:</span><samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">{valueOrNone(acl.arn)}</samp></li>
          <li className="flex items-center"><span className="font-medium min-w-[160px]">Default:</span><span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${acl.IsDefault ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'}`}>{String(acl.IsDefault)}</span></li>
        </ul>
      </div>

      {/* Rules */}
      {acl.rules && Object.entries(acl.rules).map(([ruleType, rules]) => (
        <div key={ruleType} className="px-6 py-4 border-b border-gray-700">
          <h4 className="text-base font-semibold text-gray-200 mb-3">{makeTitle(ruleType)} rules</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-2 px-3 text-gray-300 font-medium w-1/5">Rule number</th>
                  <th className="text-left py-2 px-3 text-gray-300 font-medium w-1/5">Port</th>
                  <th className="text-left py-2 px-3 text-gray-300 font-medium w-1/5">Protocol</th>
                  <th className="text-left py-2 px-3 text-gray-300 font-medium w-1/5">IP address</th>
                  <th className="text-left py-2 px-3 text-gray-300 font-medium w-1/5">Action</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(rules).map(([num, r]) => (
                  <tr key={num} className="border-b border-gray-700 hover:bg-gray-700/50">
                    <td className="py-2 px-3 text-gray-300">{num}</td>
                    <td className="py-2 px-3 text-gray-300">{valueOrNone(r.port_range)}</td>
                    <td className="py-2 px-3 text-gray-300">{valueOrNone(r.protocol)}</td>
                    <td className="py-2 px-3 text-gray-300">{valueOrNone(r.CidrBlock)}</td>
                    <td className="py-2 px-3 text-gray-300">{valueOrNone(r.RuleAction)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Associated Subnets */}
      <div className="px-6 py-4">
        <h4 className="text-base font-semibold text-gray-200 mb-3">Associated Subnets</h4>
        {acl.Associations?.length ? (
          <ul className="space-y-2">
            {acl.Associations.map((sub, idx) => (
              <li key={idx} className="flex items-center text-sm text-gray-300">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></span>
                <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                  <ResourceLink
                    resourcePath={`services.vpc.regions.${acl._region}.vpcs.${acl._vpc}.subnets.${sub.SubnetId}`}
                    name={sub.SubnetId}
                  />
                </samp>
              </li>
            ))}
          </ul>
        ) : (
          !acl.IsDefault && (
            <div className="flex items-center text-sm text-yellow-400 bg-yellow-900/20 px-3 py-2 rounded-lg">
              <i className="fa fa-exclamation-triangle mr-2"></i>
              <span>This network ACL is not the default and is not associated with any subnet.</span>
            </div>
          )
        )}
      </div>
    </div>
  );
};

// ---------- Recursive Network ACLs for Regions & VPCs ----------
export const VPCNetworkACLsList = ({ data }) => {
  if (!data) return <div className="text-sm text-gray-500 italic">No Network ACLs found.</div>;

  return (
    <div className="space-y-6">
      {Object.entries(data).map(([regionKey, region]) => (
        <div key={regionKey} className="space-y-4">
          <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">Region: {region.name ?? regionKey}</div>

          {region.vpcs && Object.entries(region.vpcs).map(([vpcId, vpc]) => (
            <div key={vpcId} className="space-y-3">
              <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <div className="bg-blue-600 px-6 py-3">
                  <h4 className="text-base font-semibold text-white">VPC: {vpc.name ?? vpcId}</h4>
                </div>
              </div>

              {vpc.network_acls && Object.keys(vpc.network_acls).length ? (
                Object.entries(vpc.network_acls).map(([aclId, acl]) => (
                  <VPCNetworkACL key={aclId} data={{ ...acl, _region: regionKey, _vpc: vpcId, _aclId: aclId }} />
                ))
              ) : (
                <div className="text-sm text-gray-500 italic">No Network ACLs found for this VPC.</div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// ---------- VPC Subnet ----------
export const VPCSubnet = ({ data }) => {
  if (!data) return null;

  // Helper functions
  const valueOrNone = (value) => value || "None";
  const convertBoolToEnabled = (val) => (val ? "Enabled" : "Disabled");

  return (
    <div className="space-y-6">
      {Object.entries(data).map(([regionKey, region]) => (
        <div key={regionKey} className="space-y-4">
          <div className="bg-gray-900/40 border border-gray-700 rounded-lg px-6 py-3 text-gray-300 font-medium">
            Region: {region.name ?? regionKey}
          </div>

          {region.vpcs && Object.entries(region.vpcs).map(([vpcId, vpc]) => (
            <div key={vpcId} className="space-y-4">
              <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <div className="bg-blue-600 px-6 py-3">
                  <h4 className="text-base font-semibold text-white">VPC: {vpc.name ?? vpcId}</h4>
                </div>
              </div>

              {vpc.subnets && Object.entries(vpc.subnets).map(([subnetId, subnet]) => (
                <div key={subnetId} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                  {/* Subnet Header */}
                  <div className="bg-blue-600 px-6 py-4">
                    <h4 className="text-lg font-semibold text-white">{subnet.name ?? subnet.id}</h4>
                  </div>

                  {/* Information */}
                  <div className="px-6 py-4 border-b border-gray-700">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">Information</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center text-sm text-gray-300">
                        <span className="font-medium min-w-[220px]">Name:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{subnet.name === subnet.id ? 'None' : subnet.name}</samp>
                      </li>
                      <li className="flex items-center text-sm text-gray-300">
                        <span className="font-medium min-w-[220px]">ID:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{subnet.id}</samp>
                      </li>
                      <li className="flex items-start text-sm text-gray-300">
                        <span className="font-medium min-w-[220px]">ARN:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs break-all">{valueOrNone(subnet.arn)}</samp>
                      </li>
                      <li className="flex items-center text-sm text-gray-300">
                        <span className="font-medium min-w-[220px]">VPC ID:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(subnet.VpcId)}</samp>
                      </li>
                      <li className="flex items-center text-sm text-gray-300">
                        <span className="font-medium min-w-[220px]">Availability Zone:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(subnet.AvailabilityZone)}</samp>
                      </li>
                      <li className="flex items-center text-sm text-gray-300">
                        <span className="font-medium min-w-[220px]">CIDR Block:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(subnet.CidrBlock)}</samp>
                      </li>
                      <li className="flex items-center text-sm text-gray-300">
                        <span className="font-medium min-w-[220px]">IPv6 CIDR Block:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">{valueOrNone(subnet.CidrBlockv6)}</samp>
                      </li>
                      <li className="flex items-center text-sm text-gray-300">
                        <span className="font-medium min-w-[220px]">Public IP on Launch:</span>
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${subnet.MapPublicIpOnLaunch ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>{convertBoolToEnabled(subnet.MapPublicIpOnLaunch)}</span>
                      </li>
                      <li className="flex items-center text-sm text-gray-300">
                        <span className="font-medium min-w-[220px]">Available IP Addresses:</span>
                        <samp className="ml-2 bg-gray-700 px-2 py-1 rounded text-green-300 font-mono text-xs">{valueOrNone(subnet.AvailableIpAddressCount ?? 0)}</samp>
                      </li>
                    </ul>
                  </div>

                  {/* Instances */}
                  <div className="px-6 py-4 border-b border-gray-700">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">
                      Instances
                      <CountBadge count={subnet.instances?.length || 0} />
                    </h4>
                    {subnet.instances?.length ? (
                      <ul className="space-y-2">
                        {subnet.instances.map((inst, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-300">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></span>
                            <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                              <ResourceLink
                                resourcePath={`services.ec2.regions.${regionKey}.vpcs.${vpcId}.instances.${inst.id ?? inst}`}
                                name={inst.name ?? inst.id ?? String(inst)}
                              />
                            </samp>
                            {inst.InstanceType && (
                              <span className="ml-3 text-xs text-gray-400">Type: {inst.InstanceType}</span>
                            )}
                            {inst.State?.Name && (
                              <span className="ml-3 text-xs text-gray-400">State: {inst.State.Name}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm text-gray-500 italic">0</div>
                    )}
                  </div>

                  {/* Flow Logs */}
                  <div className="px-6 py-4">
                    <h4 className="text-base font-semibold text-gray-200 mb-3">
                      Flow Logs
                      <CountBadge count={subnet.flow_logs?.length || 0} />
                    </h4>
                    {subnet.flow_logs?.length ? (
                      <ul className="space-y-2">
                        {subnet.flow_logs.map((f, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-300">
                            <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 flex-shrink-0"></span>
                            <samp className="bg-gray-700 px-2 py-1 rounded text-blue-300 font-mono text-xs">
                              <ResourceLink
                                resourcePath={`services.vpc.regions.${regionKey}.flow_logs.${f.FlowLogId ?? f}`}
                                name={f.FlowLogId ?? String(f)}
                              />
                            </samp>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm text-gray-500 italic">0</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};



