import React from "react";

export const LeftMenuForRegion = ({
    serviceName,
    serviceGroup,
    resourceType,
    items,
    metadata,
    getValueAt,
    onHideList,
    updateHash,
  }) => {
    return (
      <div id={`services.${serviceName}.regions.id.${resourceType}.list`}>
        {/* Show All section */}
        <div className="list-group">
          <div className="list-group-item">
            <a
              href="javascript:void(0)"
              onClick={() =>
                updateHash?.(`services.${serviceName}.regions.id.${resourceType}`)
              }
            >
              Show all{" "}
              <span className="badge float-right btn-info">
                {getValueAt(
                  "metadata",
                  serviceGroup,
                  serviceName,
                  "resources",
                  resourceType,
                  "count"
                )}
              </span>
            </a>
          </div>
        </div>
  
        {/* Regions loop */}
        {Object.entries(items).map(([regionKey, regionData]) => (
          <div
            key={regionKey}
            className="list-group"
            id={`services.${serviceName}.regions.${regionKey}.${resourceType}.list`}
          >
            <div className="list-group-item active">
              <a
                href={`#services.${serviceName}.regions.${regionKey}.${resourceType}`}
              >
                {regionKey}
              </a>
              <span className="float-right">
                <a
                  href="javascript:void(0)"
                  onClick={() =>
                    onHideList?.(
                      `services.${serviceName}.regions.${regionKey}.${resourceType}.list`
                    )
                  }
                >
                  <i className="fa fa-times-circle"></i>
                </a>
              </span>
            </div>
  
            {/* Resource links inside region */}
            <div className="list-group-item list-sub-element">
              {Object.entries(regionData[resourceType] || {}).map(
                ([resKey, resource]) => (
                  <div
                    key={resKey}
                    className="list-group-item-text"
                    id={`services.${serviceName}.regions.${regionKey}.${resourceType}.${resKey}.link`}
                  >
                    {resource.scout_link ? (
                      <a href={`#${resource.scout_link}.view`}>
                        {resource.name}
                      </a>
                    ) : (
                      <a
                        href={`#services.${serviceName}.regions.${regionKey}.${resourceType}.${resKey}.view`}
                      >
                        {resource.name}
                      </a>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

export const LeftMenuForVPC = ({
    serviceName,
    serviceGroup,
    resourceType,
    items,
    getValueAt,
    onHideList,
    updateHash,
  }) => {
    return (
      <div id={`services.${serviceName}.regions.id.vpcs.id.${resourceType}.list`}>
        {/* Show All section */}
        <div className="list-group">
          <div className="list-group-item">
            <a
              href="javascript:void(0)"
              onClick={() =>
                updateHash?.(
                  `services.${serviceName}.regions.id.vpcs.id.${resourceType}`
                )
              }
            >
              Show all{" "}
              <span className="badge float-right btn-info">
                {getValueAt(
                  "metadata",
                  serviceGroup,
                  serviceName,
                  "resources",
                  resourceType,
                  "count"
                )}
              </span>
            </a>
          </div>
        </div>
  
        {/* Regions loop */}
        {Object.entries(items).map(([regionKey, regionData]) => (
          <div
            key={regionKey}
            className="list-group"
            id={`services.${serviceName}.regions.${regionKey}.vpcs.id.${resourceType}.list`}
          >
            <div className="list-group-item active">
              <a
                href={`#services.${serviceName}.regions.${regionKey}.vpcs.id.${resourceType}`}
              >
                {regionKey}
              </a>
              <span className="float-right">
                <a
                  href="javascript:void(0)"
                  onClick={() =>
                    onHideList?.(
                      `services.${serviceName}.regions.${regionKey}.vpcs.id.${resourceType}.list`
                    )
                  }
                >
                  <i className="fa fa-times-circle"></i>
                </a>
              </span>
            </div>
  
            {/* VPCs loop */}
            {Object.entries(regionData.vpcs || {}).map(([vpcKey, vpcData]) => (
              <div
                key={vpcKey}
                className="list-group-item list-sub-element"
                id={`services.${serviceName}.regions.${regionKey}.vpcs.${vpcKey}.${resourceType}.list`}
              >
                {/* VPC Name / ID */}
                <a
                  href={`#services.${serviceName}.regions.${regionKey}.vpcs.${vpcKey}.${resourceType}`}
                >
                  {getValueAt("services.vpc.regions", regionKey, "vpcs", vpcKey, "name") ||
                    vpcKey}
                </a>
  
                {/* Resources inside VPC */}
                {Object.entries(vpcData[resourceType] || {}).map(
                  ([resKey, resource]) => (
                    <div
                      key={resKey}
                      className="list-group-item-text list-sub-element"
                      id={`services.${serviceName}.regions.${regionKey}.vpcs.${vpcKey}.${resourceType}.${resKey}.link`}
                    >
                      <a
                        href={`#services.${serviceName}.regions.${regionKey}.vpcs.${vpcKey}.${resourceType}.${resKey}.view`}
                      >
                        {resource.name}
                      </a>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

// ACM Certificate view
export const ACMCertificates = ({ data }) => {
  if (!data) return null;

  return (
    <div className="acm-certificates">
      {Object.entries(data).map(([region, regionData]) => {
        const certificates = regionData.certificates || {};

        return (
          <div
            key={region}
            className="region-box"
            style={{ marginBottom: "20px" }}
          >
            <div
              className="region-header"
              style={{
                backgroundColor: "#111",
                color: "#fff",
                padding: "10px",
                borderRadius: "4px",
              }}
            >
              <h3>Region: {region}</h3>
            </div>

            {Object.entries(certificates).map(([certId, cert]) => (
              <div
                key={certId}
                className="certificate-box"
                style={{
                  backgroundColor: "#222",
                  color: "#fff",
                  padding: "10px",
                  marginTop: "10px",
                  borderRadius: "4px",
                }}
              >
                <h4>{cert.DomainName || certId}</h4>
                <div style={{ marginTop: "10px" }}>
                  <div>
                    ARN: <span>{cert.arn || "None"}</span>
                  </div>
                  <div>
                    Subject: <span>{cert.Subject || "None"}</span>
                  </div>
                  <div>
                    Status: <span>{cert.Status || "None"}</span>
                  </div>
                  <div>
                    Issuer: <span>{cert.Issuer || "None"}</span>
                  </div>
                  <div>
                    Type: <span>{cert.Type || "None"}</span>
                  </div>
                  <div>
                    Created:{" "}
                    <span>
                      {cert.CreatedAt
                        ? new Date(cert.CreatedAt).toLocaleString()
                        : "None"}
                    </span>
                  </div>
                  <div>
                    Expiration:{" "}
                    <span>
                      {cert.NotAfter
                        ? new Date(cert.NotAfter).toLocaleString()
                        : "None"}
                    </span>
                  </div>
                  <div>
                    Renewal Eligibility:{" "}
                    <span>{cert.RenewalEligibility || "None"}</span>
                  </div>
                  <div>
                    Transparency Logging Preference:{" "}
                    <span>
                      {cert.Options?.CertificateTransparencyLoggingPreference ||
                        "None"}
                    </span>
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    <strong>Subject Alternative Names:</strong>
                    <ul>
                      {cert.SubjectAlternativeNames?.length > 0 ? (
                        cert.SubjectAlternativeNames.map((name, i) => (
                          <li key={i}>
                            <code>{name}</code>
                          </li>
                        ))
                      ) : (
                        <li>None</li>
                      )}
                    </ul>
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    <strong>Domain Validation Options:</strong>
                    <ul>
                      {cert.DomainValidationOptions?.length > 0 ? (
                        cert.DomainValidationOptions.map((opt, i) => (
                          <li key={i}>
                            <code>
                              {opt.DomainName} - {opt.ValidationDomain} -{" "}
                              {opt.ValidationMethod} - {opt.ValidationStatus}
                            </code>
                          </li>
                        ))
                      ) : (
                        <li>None</li>
                      )}
                    </ul>
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    <strong>Key Usages:</strong>
                    <ul>
                      {cert.KeyUsages?.length > 0 ? (
                        cert.KeyUsages.map((ku, i) => (
                          <li key={i}>
                            <code>{ku.Name}</code>
                          </li>
                        ))
                      ) : (
                        <li>None</li>
                      )}
                    </ul>
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    <strong>Extended Key Usages:</strong>
                    <ul>
                      {cert.ExtendedKeyUsages?.length > 0 ? (
                        cert.ExtendedKeyUsages.map((eku, i) => (
                          <li key={i}>
                            <code>
                              {eku.Name} - {eku.OID}
                            </code>
                          </li>
                        ))
                      ) : (
                        <li>None</li>
                      )}
                    </ul>
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    <strong>In Use By:</strong>
                    <ul>
                      {cert.InUseBys?.length > 0 ? (
                        cert.InUseBys.map((u, i) => (
                          <li key={i}>
                            <code>{u}</code>
                          </li>
                        ))
                      ) : (
                        <li>None</li>
                      )}
                    </ul>
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

  return (
    <div className="lambda-functions">
      {Object.entries(data).map(([region, regionData]) => {
        const functions = regionData.functions || {};

        return (
          <div
            key={region}
            className="region-box"
            style={{ marginBottom: "20px" }}
          >
            <div
              className="region-header"
              style={{
                backgroundColor: "#111",
                color: "#fff",
                padding: "10px",
                borderRadius: "4px",
              }}
            >
              <h3>Region: {region}</h3>
            </div>

            {Object.entries(functions).map(([funcId, func]) => (
              <div
                key={funcId}
                className="function-box"
                style={{
                  backgroundColor: "#222",
                  color: "#fff",
                  padding: "10px",
                  marginTop: "10px",
                  borderRadius: "4px",
                }}
              >
                <h4>{func.name || funcId}</h4>
                <div style={{ marginTop: "10px" }}>
                  <div>
                    ARN: <span>{func.arn || "None"}</span>
                  </div>
                  <div>
                    Description: <span>{func.description || "None"}</span>
                  </div>
                  <div>
                    Last Modified:{" "}
                    <span>
                      {func.last_modified
                        ? new Date(func.last_modified).toLocaleString()
                        : "None"}
                    </span>
                  </div>
                  <div>
                    Runtime: <span>{func.runtime || "None"}</span>
                  </div>
                  <div>
                    Version: <span>{func.version || "None"}</span>
                  </div>
                  <div>
                    Revision ID: <span>{func.revision_id || "None"}</span>
                  </div>
                  <div>
                    Execution Role:{" "}
                    <span>{func.execution_role?.RoleName || "None"}</span>
                  </div>
                  <div>
                    Handler: <span>{func.handler || "None"}</span>
                  </div>
                  <div>
                    Code Size: <span>{func.code_size || "None"}</span>
                  </div>
                  <div>
                    Memory Size: <span>{func.memory_size || "None"}</span>
                  </div>
                  <div>
                    Timeout: <span>{func.timeout || "None"}</span>
                  </div>
                </div>

                {/* Access Policy */}
                {func.access_policy && (
                  <div
                    className="policy-box"
                    style={{
                      backgroundColor: "#333",
                      padding: "10px",
                      marginTop: "10px",
                      borderRadius: "4px",
                    }}
                  >
                    <h5>Resource-Based Policy</h5>
                    <pre
                      style={{
                        backgroundColor: "#111",
                        padding: "10px",
                        borderRadius: "4px",
                        overflowX: "auto",
                      }}
                    >
                      {JSON.stringify(func.access_policy, null, 2)}
                    </pre>
                  </div>
                )}

                {/* Environment Variables */}
                {func.env_variables && (
                  <div
                    className="env-vars-box"
                    style={{
                      backgroundColor: "#333",
                      padding: "10px",
                      marginTop: "10px",
                      borderRadius: "4px",
                    }}
                  >
                    <h5>Environment Variables</h5>
                    <pre
                      style={{
                        backgroundColor: "#111",
                        padding: "10px",
                        borderRadius: "4px",
                        overflowX: "auto",
                      }}
                    >
                      {JSON.stringify(func.env_variables, null, 2)}
                    </pre>
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
    <div>
      {Object.entries(data).map(([region, regionData]) => (
        <div key={region}>
          <h3 className="mt-3 mb-2">Region: {region}</h3>
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
    <div className="list-group mb-4">
      {/* Resource Name */}
      <div id="resource-name" className="list-group-item active">
        <h4 className="list-group-item-heading">{data.name}</h4>
      </div>

      {/* Description */}
      <div className="list-group-item">
        <h4 className="list-group-item-heading">Description</h4>
        <div className="list-group-item-text item-margin">
          {data.Description || "No description"}
        </div>
      </div>

      {/* Information */}
      <div className="list-group-item">
        <h4 className="list-group-item-heading">Information</h4>
        <div className="list-group-item-text item-margin">
          ARN:{" "}
          <span
            id={`cloudformation.regions.${region}.stacks.${stackKey}.arn`}
          >
            <samp>{data.arn}</samp>
          </span>
        </div>
        <div className="list-group-item-text item-margin">Region: {region}</div>
        <div className="list-group-item-text item-margin">
          Created on: {data.CreationTime}
        </div>
        <div className="list-group-item-text item-margin">
          Role:{" "}
          {data.iam_role ? (
            <>
              <a
                href={`javascript:showObject('services.iam.roles.${data.iam_role.id}')`}
              >
                {data.iam_role.name}
              </a>{" "}
              <span
                id={`cloudformation.regions.${region}.stacks.${data.name}`}
              >
                <i className="fa fa-exclamation-triangle"></i>
              </span>
            </>
          ) : (
            "None"
          )}
        </div>
        <div className="list-group-item-text item-margin">
          Termination protection enabled:{" "}
          <span
            id={`cloudformation.regions.${region}.stacks.${stackKey}.cloudformation_stack_no_termination_protection`}
          >
            {String(data.EnableTerminationProtection)}
          </span>
        </div>
        <div className="list-group-item-text item-margin">
          Configuration has drifted:{" "}
          <span
            id={`cloudformation.regions.${region}.stacks.${stackKey}.cloudformation_stack_drifted`}
          >
            {String(data.drifted)}
          </span>
        </div>
        <div className="list-group-item-text item-margin">
          Deletion policy:{" "}
          <span
            id={`cloudformation.regions.${region}.stacks.${stackKey}.cloudformation_stack_no_deletion_policy`}
          >
            {data.deletion_policy || "None"}
          </span>
        </div>
        <div className="list-group-item-text item-margin">
          Notification ARNs:
          <span
            id={`cloudformation.regions.${region}.stacks.${stackKey}.cloudformation_stack_lacks_notifications`}
          >
            <ul>
              {data.notificationARNs && data.notificationARNs.length > 0 ? (
                data.notificationARNs.map((arn, i) => (
                  <li key={i} className="list-group-item-text">
                    <samp>{arn}</samp>
                  </li>
                ))
              ) : (
                <li className="list-group-item-text">
                  <samp>None</samp>
                </li>
              )}
            </ul>
          </span>
        </div>
      </div>

      {/* Capabilities */}
      <div className="list-group-item">
        <h4 className="list-group-item-heading">
          Capabilities <CountBadge count={data.Capabilities?.length || 0} />
        </h4>
        <ul>
          {data.Capabilities?.map((cap, i) => (
            <li key={i} className="list-group-item-text">
              {cap}
            </li>
          ))}
        </ul>
      </div>

      {/* Policy */}
      {data.policy && (
        <div className="list-group-item">
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

  return (
    <div className="list-group mb-4">
      {/* Header */}
      <div id="resource-name" className="list-group-item active">
        <h4 className="list-group-item-heading">{name}</h4>
      </div>

      {/* Information */}
      <div className="list-group-item">
        <h4 className="list-group-item-heading">Information</h4>
        <div className="list-group-item-text item-margin">
          ID: <samp>{valueOrNone(id)}</samp>
        </div>
        <div className="list-group-item-text item-margin">
          ARN: <samp>{valueOrNone(arn)}</samp>
        </div>
        <div className="list-group-item-text item-margin">
          Status: <samp>{convertBoolToEnabled(enabled)}</samp>
        </div>
        <div className="list-group-item-text item-margin">
          Enabled: <samp>{valueOrNone(status)}</samp>
        </div>
        <div className="list-group-item-text item-margin">
          Last Modified Time: <samp>{valueOrNone(last_modified_time)}</samp>
        </div>
        <div className="list-group-item-text item-margin">
          Comment: <samp>{valueOrNone(comment)}</samp>
        </div>
        <div className="list-group-item-text item-margin">
          Price Class: <samp>{valueOrNone(price_class)}</samp>
        </div>
        <div className="list-group-item-text item-margin">
          Domain Name: <samp>{valueOrNone(domain_name)}</samp>
        </div>
        <div className="list-group-item-text item-margin">
          Web ACL ID: <samp>{valueOrNone(web_acl_id)}</samp>
        </div>
        <div className="list-group-item-text item-margin">
          IPv6 Enabled: <samp>{valueOrNone(is_ipv6_enabled)}</samp>
        </div>
        <div className="list-group-item-text item-margin">
          HTTP Version: <samp>{valueOrNone(http_version)}</samp>
        </div>
        <div className="list-group-item-text item-margin">
          Certificate:{" "}
          <samp>{viewer_certificate?.Certificate || "None"}</samp>
        </div>
        <div className="list-group-item-text item-margin">
          Minimum TLS Version:{" "}
          <samp>{viewer_certificate?.MinimumProtocolVersion || "None"}</samp>
        </div>
      </div>

      {/* Origins */}
      {origins?.Items && origins.Items.length > 0 && (
        <div className="list-group-item">
          <h4 className="list-group-item-heading">Origins</h4>
          <ul>
            {origins.Items.map((origin, idx) => (
              <li key={idx}>
                <samp>{origin.Id}</samp>
                <ul>
                  <li>Domain: <samp>{valueOrNone(origin.DomainName)}</samp></li>
                  <li>Origin Path: <samp>{valueOrNone(origin.OriginPath)}</samp></li>
                  {origin.S3OriginConfig && (
                    <li>
                      S3 Origin Access Identity:{" "}
                      <samp>{valueOrNone(origin.S3OriginConfig.OriginAccessIdentity)}</samp>
                    </li>
                  )}
                  {origin.CustomOriginConfig && (
                    <li>
                      Custom Origin Config:
                      <ul>
                        <li>
                          Protocol Policy:{" "}
                          <samp>{valueOrNone(origin.CustomOriginConfig.OriginProtocolPolicy)}</samp>
                        </li>
                        <li>
                          SSL/TLS Protocols:
                          <ul>
                            {origin.CustomOriginConfig.OriginSslProtocols?.Items?.map((proto, i) => (
                              <li key={i}>{proto}</li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </li>
                  )}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
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
    <div className="list-group mb-4">
      {/* Header */}
      <div id="resource-name" className="list-group-item active">
        <h4 className="list-group-item-heading">{name}</h4>
      </div>

      {/* Information */}
      <div className="list-group-item">
        <h4>Information</h4>
        <ul>
          <li className="list-group-item-text">ARN: <samp>{arn}</samp></li>
          <li className="list-group-item-text">
            Region: <samp>{region}</samp>
            {scout_link && <i className="fa fa-exclamation-triangle" />} multi-region trail
          </li>

          {!scout_link && (
            <>
              <li className="list-group-item-text">Organization Trail: {String(is_organization_trail)}</li>
              <li className="list-group-item-text">
                Logging: <span>{convertBoolToEnabled(IsLogging)}</span>
              </li>
              <li className="list-group-item-text">
                Start Logging Time: {formatDate(StartLoggingTime)}
              </li>
              <li className="list-group-item-text">
                Stop Logging Time: {formatDate(StopLoggingTime)}
              </li>
              <li className="list-group-item-text">
                Multi Region: <span>{convertBoolToEnabled(IsMultiRegionTrail)}</span>
              </li>
              <li className="list-group-item-text">
                Management Events: <span>{convertBoolToEnabled(ManagementEventsEnabled)}</span>
              </li>
              <li className="list-group-item-text">
                Data Events: <span>{convertBoolToEnabled(DataEventsEnabled)}</span>
              </li>
              <li className="list-group-item-text">
                Include Global Services:{" "}
                <span>
                  <samp>
                    {IncludeGlobalServiceEvents
                      ? `Enabled${!IsLogging ? " (Trail disabled)" : ""}`
                      : "Disabled"}
                  </samp>
                </span>
              </li>
              <li className="list-group-item-text">
                Destination S3 Bucket Name:{" "}
                <samp>
                  {bucket_id ? `${getValueAt('services.s3.buckets', bucket_id)?.name}/${S3KeyPrefix}` : S3KeyPrefix}
                </samp>
              </li>
              <li className="list-group-item-text">
                Log File Validation Enabled: <span>{convertBoolToEnabled(LogFileValidationEnabled)}</span>
              </li>
              <li className="list-group-item-text">
                KMS Key: <span>{valueOrNone(KmsKeyId)}</span>
              </li>
              <li className="list-group-item-text">
                Latest CloudWatch Logs Delivery Time: {formatDate(LatestCloudWatchLogsDeliveryTime)}
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
    <div className="list-group mb-4">
      {/* Header */}
      <div id="resource-name" className="list-group-item active">
        <h4 className="list-group-item-heading">{name}</h4>
      </div>

      {/* Information */}
      <div className="list-group-item">
        <h4>Information</h4>
        <ul>
          <li className="list-group-item-text">Name: {name}</li>
          <li className="list-group-item-text">Region: {region}</li>
          <li className="list-group-item-text">
            Actions enabled: <span>{String(ActionsEnabled)}</span>
          </li>
          <li className="list-group-item-text">State: {StateValue}</li>
          <li className="list-group-item-text">Metric: {Namespace}::{MetricName}</li>
        </ul>
      </div>

      {/* Alarm Actions */}
      <div className="list-group-item">
        <h4>
          Alarm Actions <CountBadge count={AlarmActions.length} />
        </h4>
        {AlarmActions.length > 0 ? (
          <ul>
            {AlarmActions.map((action, idx) => (
              <li key={idx} className="list-group-item-text">
                {action}
              </li>
            ))}
          </ul>
        ) : (
          <span>
            <i className="fa fa-exclamation-triangle"></i> No actions have been configured for this alarm.
          </span>
        )}
      </div>

      {/* Insufficient Data Actions */}
      <div className="list-group-item">
        <h4>
          Insufficient Data Actions <CountBadge count={InsufficientDataActions.length} />
        </h4>
        <ul>
          {InsufficientDataActions.map((action, idx) => (
            <li key={idx} className="list-group-item-text">
              {action}
            </li>
          ))}
        </ul>
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

  const {
    name,
    arn,
    creation_time,
    log_group_name,
    pattern,
  } = filter;

  return (
    <div className="list-group mb-4">
      {/* Header */}
      <div id="resource-name" className="list-group-item active">
        <h4 className="list-group-item-heading">{name}</h4>
      </div>

      {/* Information */}
      <div className="list-group-item">
        <h4 className="list-group-item-heading">Information</h4>
        <div className="list-group-item-text item-margin">
          Name: <samp>{name || "N/A"}</samp>
        </div>
        <div className="list-group-item-text item-margin">
          ARN: <code>{arn || "N/A"}</code>
        </div>
        <div className="list-group-item-text item-margin">
          Creation Time: {creation_time ? new Date(creation_time).toLocaleString() : "N/A"}
        </div>
        <div className="list-group-item-text item-margin">
          Log Group Name: <samp>{log_group_name || "N/A"}</samp>
        </div>
        <div className="list-group-item-text item-margin">
          Pattern: <code>{pattern || "N/A"}</code>
        </div>
      </div>
    </div>
  );
};

  export const ConfigRecorderView = ({ recorder }) => {
    if (!recorder) return null;
  
    return (
      <div className="mb-4 bg-gray-900/40 border border-gray-700 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-gray-200 mb-2">
          {recorder.name}
        </h4>
        <ul className="ml-4">
          <li>Enabled: {recorder.enabled ? "Yes" : "No"}</li>
          <li>Region: {recorder.region}</li>
          <li>Role ARN: <samp>{recorder.role_ARN}</samp></li>
          <li>Last Status: {recorder.last_status}</li>
          <li>Last Start Time: {recorder.last_start_time}</li>
          <li>Last Status Change Time: {recorder.last_status_change_time}</li>
        </ul>
      </div>
    );
  };
  

  export const ConfigRuleView = ({ rule }) => {
    if (!rule) return null;
  
    return (
      <div className="mb-4 bg-gray-900/40 border border-gray-700 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-gray-200 mb-2">
          {rule.name}
        </h4>
        <ul className="ml-4">
          <li>ID: {rule.id}</li>
          <li>ARN: <samp>{rule.arn}</samp></li>
          <li>Region: {rule.region}</li>
          <li>Description: <i>{rule.description}</i></li>
          <li>State: {rule.state}</li>
        </ul>
      </div>
    );
  };

  export const ConfigRegionView = ({ data }) => {
    if (!data) return null;
  
    // data is an object of regions, so get the values
    const regions = Object.values(data);
  
    return (
      <>
        {regions.map((region) => (
          <div key={region.id} className="mb-6 bg-gray-800/40 border border-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-bold text-gray-100 mb-3">{region.name}</h3>
  
            <p className="mb-2">
              AWS Config Recorder enabled: {region.recorders_count > 0 ? "true" : "false"}
            </p>
  
            {/* Recorders */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-200">
                Recorders ({region.recorders_count})
              </h4>
              {region.recorders_count > 0 ? (
                Object.values(region.recorders).map((recorder) => (
                  <ConfigRecorderView key={recorder.id} data={recorder} />
                ))
              ) : (
                <p className="text-gray-400">No recorders found.</p>
              )}
            </div>
  
            {/* Rules */}
            <div>
              <h4 className="font-semibold text-gray-200">
                Rules ({region.rules_count})
              </h4>
              {region.rules_count > 0 ? (
                Object.values(region.rules).map((rule) => (
                  <ConfigRuleView key={rule.id} data={rule} />
                ))
              ) : (
                <p className="text-gray-400">No rules found.</p>
              )}
            </div>
          </div>
        ))}
      </>
    );
  };

  export const DynamoDBTables = ({ data }) => {
    if (!data) return null;
  
    return (
      <div>
        {Object.entries(data).map(([region, regionData]) => (
          <div key={region}>
            <h3>{region}</h3>
            {regionData.tables &&
              Object.entries(regionData.tables).map(([tableId, table]) => {
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
                  <div key={tableId} className="dynamodb-table">
                    {/* Header */}
                    <div id="resource-name" className="list-group-item active">
                      <h4 className="list-group-item-heading">{name}</h4>
                    </div>
  
                    {/* Information */}
                    <div className="list-group-item">
                      <h4 className="list-group-item-heading">Information</h4>
                      <div className="list-group-item-text item-margin">
                        ID: <samp>{id || "N/A"}</samp>
                      </div>
                      <div className="list-group-item-text item-margin">
                        ARN: <samp>{arn || "N/A"}</samp>
                      </div>
                      <div className="list-group-item-text item-margin">
                        Status: <samp>{table_status || "N/A"}</samp>
                      </div>
                      <div className="list-group-item-text item-margin">
                        Creation Date: <samp>{creation_date_time || "N/A"}</samp>
                      </div>
                      <div className="list-group-item-text item-margin">
                        Automatic Backups: <samp>{automatic_backups_enabled ? "Enabled" : "Disabled"}</samp>
                      </div>
                      <div className="list-group-item-text item-margin">
                        Item Count: <samp>{item_count || 0}</samp>
                      </div>
                    </div>
  
                    {/* Tags */}
                    {tags.length > 0 && (
                      <div className="list-group-item">
                        <h4>Tags</h4>
                        <ul>
                          {tags.map((tag) => (
                            <li key={tag.Key} className="list-group-item-text">
                              <samp>{tag.Key}</samp>: <samp>{tag.Value}</samp>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    );
  };

// ---------------- Utility Components ----------------
export const ResourceLink = ({ resourcePath, name }) => (
  <a href={`javascript:showObject('${resourcePath}')`}>{name || resourcePath}</a>
);

// Small helper for CIDR/IP lists
export const IPGrants = ({ items }) => (
  <ul>
    {items.map((item, idx) => (
      <li key={idx}>{item.CIDR}</li>
    ))}
  </ul>
);

// Show usage (resources attached to SG)
export const SGResourceList = ({ usedBy }) => {
  if (!usedBy || Object.keys(usedBy).length === 0) {
    return <p>No resources attached.</p>;
  }

  return (
    <ul>
      {Object.entries(usedBy).map(([type, resources]) => (
        <li key={type}>
          <strong>{type}</strong>
          <ul>
            {Object.values(resources).map((res) => (
              <li key={res.id || res.arn}>{res.name || res.id}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

//sg rule list
export const SGRuleList = ({ rules, sgName }) => {
  if (!rules) return <div>No rules defined.</div>;

  return (
    <>
      {Object.entries(rules).map(([direction, rule]) => (
        <div
          key={direction}
          className="mb-4 p-4 border rounded-md bg-black"
        >
          <h4 className="font-semibold mb-2">
            {direction.toUpperCase()} Rules ({rule.count})
          </h4>

          {Object.entries(rule.protocols).map(([protocol, protoData]) => (
            <div key={protocol} className="ml-4">
              <strong>{protocol}</strong>
              <ul className="ml-4 list-disc">
                {Object.entries(protoData.ports).map(([port, portData]) => (
                  <li key={port}>
                    <div><strong>Ports:</strong> {port}</div>

                    {portData.cidrs && (
                      <>
                        <div>IP Addresses:</div>
                        <IPGrants items={portData.cidrs} />
                      </>
                    )}

                    {portData.security_groups && (
                      <>
                        <div>Security Groups:</div>
                        <ul className="ml-4 list-disc">
                          {portData.security_groups.map((sg, idx) => (
                            <li key={idx}>
                              {sg.GroupName} ({sg.GroupId})
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {sgName === "default" && (
            <span className="text-red-600 font-medium block mt-2">
              ⚠ Default security groups should have no rules.
            </span>
          )}
        </div>
      ))}
    </>
  );
};


// Single SG component with boxed sections
export const SecurityGroup = ({ sg, vpcId, region }) => (
  <div className="security-group border rounded-lg shadow-md mb-6">
    {/* Header */}
    <div className="bg-black">
      <h4 className="text-lg font-semibold">{sg.name}</h4>
    </div>

    {/* Information Box */}
    <div className="p-4 border-b">
      <h4 className="font-bold mb-2">Information</h4>
      <div><strong>ID:</strong> {sg.id}</div>
      <div><strong>ARN:</strong> {sg.arn}</div>
      <div><strong>Region:</strong> {region}</div>
      <div>
        <strong>VPC:</strong> {vpcId} ({vpcId})
      </div>
      <div><strong>Description:</strong> {sg.description}</div>
    </div>

    {/* Rules Box */}
    <div className="p-4 border-b">
      <SGRuleList rules={sg.rules} sgName={sg.name} />
    </div>

    {/* Usage Box */}
    <div className="p-4">
      <h4 className="font-bold mb-2">Usage</h4>
      <SGResourceList usedBy={sg.used_by} />
    </div>
  </div>
);


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
    <>
      {Object.values(data).map((regionData) => (
        <div key={regionData.id}>
          <h3>{regionData.name}</h3>
          <RegionSecurityGroups regionData={regionData} />
        </div>
      ))}
    </>
  );
};


// ---------------- EC2 Instance Partial ----------------
// Example network interface component
export const NetworkInterface = ({ ni, region, vpc }) => {
  if (!ni) return null;
  return (
    <ul>
      <li>ID: <samp>{ni.id}</samp></li>
      <li>Private IP: <samp>{ni.private_ip}</samp></li>
      <li>Subnet: <samp>{ni.subnet}</samp></li>
      {ni.security_groups && (
        <li>
          Security Groups:
          <ul>
            {ni.security_groups.map((sg, idx) => (
              <li key={idx}>{sg}</li>
            ))}
          </ul>
        </li>
      )}
    </ul>
  );
};

export const EC2Instances = ({ data }) => {
  if (!data) return null;

  return (
    <div>
      {Object.entries(data).map(([region, vpcs]) => (
        <div key={region}>
          {Object.entries(vpcs).map(([vpcId, instancesObj]) => (
            <div key={vpcId}>
              {Object.entries(instancesObj).map(([instanceId, instance]) => {
                if (!instance) return null;

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
                  <div key={instanceId}>
                    {/* Instance header */}
                    <div className="list-group-item active">
                      <h4 className="list-group-item-heading">{name || instanceId}</h4>
                    </div>

                    {/* Information */}
                    <div className="list-group-item">
                      <h4>Information</h4>
                      <ul>
                        <li>ARN: <samp>{arn}</samp></li>
                        <li>ID: <samp>{id}</samp></li>
                        <li>Region: <samp>{region}</samp></li>
                        <li>Availability Zone: <samp>{availability_zone}</samp></li>
                        <li>VPC: <samp>{vpcId}</samp></li>
                        <li>Reservation ID: <samp>{reservation_id}</samp></li>
                        <li>IAM Role: <samp>{iam_role || "N/A"}</samp></li>
                        <li>Monitoring: <samp>{monitoring_enabled ? "Enabled" : "Disabled"}</samp></li>
                        <li>Access Key Name: <samp>{KeyName}</samp></li>
                        <li>State: <samp>{State?.Name || "N/A"}</samp></li>
                        <li>Instance Type: <samp>{InstanceType}</samp></li>
                        <li>Up Since: <samp>{LaunchTime}</samp></li>
                      </ul>
                    </div>

                    {/* Network Interfaces */}
                    {network_interfaces && (
                      <div className="list-group-item">
                        <h4>Network Interfaces</h4>
                        {Object.entries(network_interfaces).map(([niKey, ni]) => (
                          <NetworkInterface key={niKey} ni={ni} region={region} vpc={vpcId} />
                        ))}
                      </div>
                    )}

                    {/* Metadata Options */}
                    {metadata_options && (
                      <div className="list-group-item">
                        <h4>Metadata Options</h4>
                        <ul>
                          <li>Endpoint: <samp>{metadata_options.HttpEndpoint}</samp></li>
                          <li>HTTP Tokens: <samp>{metadata_options.HttpTokens}</samp></li>
                        </ul>
                      </div>
                    )}

                    {/* User Data */}
                    {user_data && (
                      <div className="list-group-item">
                        <h4>User Data</h4>
                        <code>
                          {user_data.split("\n").map((line, idx) => (
                            <React.Fragment key={idx}>{line}<br /></React.Fragment>
                          ))}
                        </code>

                        {user_data_secrets && (
                          <>
                            <h5>Potential Secrets</h5>
                            <ul>
                              {Object.entries(user_data_secrets).map(([key, secretArr]) => (
                                <li key={key}>
                                  {key}
                                  <ul>
                                    {secretArr.map((val, idx) => (
                                      <li key={idx}><code>{val}</code></li>
                                    ))}
                                  </ul>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// ---------------- EBS Volume ----------------
export const EC2Volumes = ({ data }) => {
  if (!data) return null;

  return (
    <div>
      {Object.entries(data).map(([region, volumesObj]) => {
        const volumes = volumesObj || {};
        return (
          <div key={region}>
            {Object.entries(volumes).map(([volumeId, volume]) => {
              if (!volume) return null;

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
                <div key={volumeId}>
                  {/* Volume Header */}
                  <div id="resource-name" className="list-group-item active">
                    <h4 className="list-group-item-heading">{name || volumeId}</h4>
                  </div>

                  {/* Volume Information */}
                  <div className="list-group-item">
                    <h4 className="list-group-item-heading">Information</h4>
                    <div className="list-group-item-text item-margin">
                      ID: <samp>{id || "N/A"}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      ARN: <samp>{arn || "N/A"}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Name: <samp>{name || "N/A"}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      State: <samp>{State || "N/A"}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Size: <samp>{Size !== undefined ? `${Size} GiB` : "N/A"}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Volume Type: <samp>{VolumeType || "N/A"}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Create Time: <samp>{CreateTime || "N/A"}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Encryption: <samp>{Encrypted !== undefined ? String(Encrypted) : "N/A"}</samp>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};



// ---------------- EC2 Snapshot ----------------
export const EC2Snapshots = ({ data }) => {
  if (!data) return null;

  return (
    <div>
      {Object.entries(data).map(([region, snapshotsObj]) => {
        const snapshots = snapshotsObj || {};
        return (
          <div key={region}>
            {Object.entries(snapshots).map(([snapshotId, snapshot]) => {
              if (!snapshot) return null;

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
                <div key={snapshotId}>
                  {/* Snapshot Header */}
                  <div id="resource-name" className="list-group-item active">
                    <h4 className="list-group-item-heading">{name || snapshotId}</h4>
                  </div>

                  {/* Snapshot Information */}
                  <div className="list-group-item">
                    <h4 className="list-group-item-heading">Information</h4>
                    <div className="list-group-item-text item-margin">
                      ID: <samp>{id || "N/A"}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      ARN: <samp>{arn || "N/A"}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Description: <samp>{description || "N/A"}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      State: <samp>{state || "N/A"}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Progress: <samp>{progress || "N/A"}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Start Time: <samp>{start_time || "N/A"}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Volume:{" "}
                      <samp>
                        <ResourceLink
                          path={`services.ec2.regions.${region}.volumes.${volume_id}`}
                          label={volume_id}
                        />
                      </samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Owner ID: <samp>{owner_id || "N/A"}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Encryption: <samp>{encrypted !== undefined ? String(encrypted) : "N/A"}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      KMS Key ID: <samp>{kms_key_id || "N/A"}</samp>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

// ---------------- AMI ----------------

export const EC2Images = ({ data }) => {
  if (!data) return null;

  return (
    <div>
      {Object.entries(data).map(([region, imagesObj]) => {
        const images = imagesObj || {};
        return (
          <div key={region}>
            {Object.entries(images).map(([imageId, image]) => {
              if (!image) return null;

              const { name, arn, id, Architecture, Public } = image;

              return (
                <div key={imageId}>
                  {/* Image Header */}
                  <div className="list-group-item active">
                    <h4 className="list-group-item-heading">{name || imageId}</h4>
                  </div>

                  {/* Image Information */}
                  <div className="list-group-item">
                    <h4 className="list-group-item-heading">Information</h4>
                    <ul>
                      <li className="list-group-item-text">
                        ARN: <samp>{arn || "N/A"}</samp>
                      </li>
                      <li className="list-group-item-text">
                        ID: <samp>{id || "N/A"}</samp>
                      </li>
                      <li className="list-group-item-text">
                        Architecture: <samp>{Architecture || "N/A"}</samp>
                      </li>
                      <li className="list-group-item-text">
                        Public: <samp>{Public !== undefined ? String(Public) : "N/A"}</samp>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

// ---------------- Regional Settings ----------------
export const EC2RegionalSettings = ({ regions }) => {
  if (!regions) return null;

  return (
    <div>
      {Object.entries(regions).map(([regionKey, regionData]) => {
        const settingsList = regionData.regional_settings
          ? Object.values(regionData.regional_settings)
          : [];

        return settingsList.map((settings, index) => (
          <div
            key={`${regionKey}-${index}`}
            className="p-4 border rounded-lg shadow mb-4 bg-black"
          >
            <h4 className="text-lg font-semibold mb-2">{regionKey}</h4>
            <ul className="list-disc list-inside">
              <li>
                EBS Encryption Default:{" "}
                <span
                  className={
                    settings.ebs_encryption_default
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {settings.ebs_encryption_default ? "Enabled" : "Disabled"}
                </span>
              </li>
              <li>
                Default Encryption Key:{" "}
                {settings.ebs_default_encryption_key_id || "N/A"}
              </li>
            </ul>
          </div>
        ));
      })}
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
        <li key={key} className="list-group-item-text no-margin">
          <strong>{key}:</strong>{" "}
          {typeof value === "object" ? (
            <GenericObject obj={value} />
          ) : (
            <span>{String(value)}</span>
          )}
        </li>
      ))}
    </ul>
  );
};

// Single parameter group
export const ParameterGroup = ({ group }) => {
  return (
    <div className="list-group-item">
      <div className="list-group-item active">
        <h4 className="list-group-item-heading">{group.name}</h4>
      </div>
      <div>
        <h4 className="list-group-item-heading">Attributes</h4>
        <GenericObject obj={group.resource} />
      </div>
    </div>
  );
};

// All regions with their parameter groups
export const ParameterGroups = ({ data }) => {
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

// Single ElastiCache security group
export const ElastiCacheSecurityGroup = ({ group }) => {
  if (!group) return null;

  return (
    <div className="list-group-item">
      <div className="list-group-item active">
        <h4 className="list-group-item-heading">{group.name}</h4>
      </div>
      <div>
        <h4 className="list-group-item-heading">Attributes</h4>
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

// Single Subnet Group
export const ElastiCacheSubnetGroup = ({ subnetGroup }) => {
  if (!subnetGroup) return null;

  return (
    <div className="list-group-item">
      <div className="list-group-item active">
        <h4 className="list-group-item-heading">{subnetGroup.name}</h4>
      </div>
      <div>
        <h4 className="list-group-item-heading">Attributes</h4>
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

// Single Cluster
export const ElastiCacheCluster = ({ cluster }) => {
  if (!cluster) return null;

  return (
    <div className="list-group-item">
      <div className="list-group-item active">
        <h4 className="list-group-item-heading">{cluster.name}</h4>
      </div>
      <div>
        <h4 className="list-group-item-heading">Attributes</h4>
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

// Single ELB Policy
export const ElbPolicy = ({ policy }) => {
  if (!policy) return null;

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
    <div className="list-group-item">
      <div id="resource-name" className="list-group-item active">
        <h4 className="list-group-item-heading">{name}</h4>
      </div>

      <div className="list-group-item">
        <h4 className="list-group-item-heading">Information</h4>
        <div className="list-group-item-text item-margin">
          ARN: <samp>{arn || "None"}</samp>
        </div>
      </div>

      {PolicyTypeName === "SSLNegotiationPolicyType" ? (
        <>
          <div className="list-group-item">
            <h4>Protocols</h4>
            <ul>
              {protocols &&
                Object.entries(protocols).map(([key, value]) => (
                  <li key={key} className="list-group-item-text">
                    {key}: {String(value)}
                  </li>
                ))}
            </ul>
          </div>

          <div className="list-group-item">
            <h4>Options</h4>
            <ul>
              {options &&
                Object.entries(options).map(([key, value]) => (
                  <li key={key} className="list-group-item-text">
                    {key}: {String(value)}
                  </li>
                ))}
            </ul>
          </div>

          <div className="list-group-item">
            <h4>Ciphers</h4>
            <ul>
              {ciphers &&
                Object.entries(ciphers).map(
                  ([key, value]) =>
                    value === "true" && (
                      <li key={key} className="list-group-item-text">
                        {key}: {value}
                      </li>
                    )
                )}
            </ul>
          </div>
        </>
      ) : (
        <div className="list-group-item">
          <h4>Attributes</h4>
          <ul className="no-bullet">
            {PolicyAttributeDescriptions &&
              PolicyAttributeDescriptions.map((attr, i) => (
                <li key={i} className="list-group-item-text">
                  {attr.AttributeName}: {attr.AttributeValue}
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

export const ElbLinkedResources = ({ service, region, vpc, resources, resourceType, onShow }) => {
  if (!resources || !resources.length) {
    return (
      <div className="accordion">
        <h5 className="list-group-item-heading accordion-heading">
          {resourceType.charAt(0).toUpperCase() + resourceType.slice(1)}
          <span className="badge float-right">{resources?.length || 0}</span>
        </h5>
      </div>
    );
  }

  return (
    <div className="accordion">
      <h5 className="list-group-item-heading accordion-heading">
        {resourceType.charAt(0).toUpperCase() + resourceType.slice(1)}:
        <span className="badge float-right">{resources.length}</span>
      </h5>
      <div
        id={`services.${service}.regions.${region}.vpcs.${vpc}.elbs.${resourceType}`}
        className="accordion-body"
      >
        <div className="accordion-inner">
          <ul>
            {resources.map((item) => (
              <li key={item} className="list-group-item-text">
                <a href="#" onClick={(e) => { e.preventDefault(); onShow?.(item); }}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};


export const ElbListener = ({ listener }) => {
  if (!listener) return null;

  const { LoadBalancerPort, Protocol, InstancePort, InstanceProtocol } = listener;

  return (
    <span>
      {LoadBalancerPort} ({Protocol}) <i className="fa fa-arrow-right" /> {InstancePort} ({InstanceProtocol})
    </span>
  );
};


export const Elb = ({ region, vpc, elbData, onShow }) => {
  if (!elbData) return null;

  const { name, arn, DNSName, Scheme, AvailabilityZones, listeners, attributes, security_groups, instances, Subnets, tags } = elbData;

  return (
    <div className="list-group-item">
      <h4 className="list-group-item-heading">{name}</h4>

      <div className="list-group-item">
        <h4>Information</h4>
        <ul>
          <li className="list-group-item-text">ARN: <samp>{arn}</samp></li>
          <li className="list-group-item-text">VPC: {vpc}</li>
          <li className="list-group-item-text">DNS: {DNSName}</li>
          <li className="list-group-item-text">Scheme: {Scheme}</li>
          <li className="list-group-item-text">Availability zones:
            <ul>
              {AvailabilityZones?.map((zone) => (
                <li key={zone} className="list-group-item-text">{zone}</li>
              ))}
            </ul>
          </li>
        </ul>
      </div>

      <div className="list-group-item">
        <h4>Listeners</h4>
        <ul>
          {listeners && Object.entries(listeners).map(([key, listener]) => (
            <li key={key} className="list-group-item-text">
              <ElbListener listener={listener} />
            </li>
          ))}
        </ul>
      </div>

      <div className="list-group-item">
        <h4>Attributes</h4>
        <ul>
          {attributes && Object.entries(attributes).map(([attrKey, attrObj]) =>
            Object.entries(attrObj).map(([key, value]) => (
              <li key={`${attrKey}-${key}`} className="list-group-item-text">
                {attrKey}.{key}: <span>{value}</span>
              </li>
            ))
          )}
        </ul>
      </div>

      {security_groups?.length > 0 && (
        <div className="list-group-item">
          <h4>Security Groups</h4>
          <ul>
            {security_groups.map((sg) => (
              <li key={sg}>
                <a href="#" onClick={(e) => { e.preventDefault(); onShow?.(sg); }}>{sg}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="list-group-item">
        <h4>Destination</h4>
        <ElbLinkedResources
          service="ec2"
          region={region}
          vpc={vpc}
          resources={instances}
          resourceType="instances"
          onShow={onShow}
        />
        <ElbLinkedResources
          service="vpc"
          region={region}
          vpc={vpc}
          resources={Subnets}
          resourceType="subnets"
          onShow={onShow}
        />
      </div>

      {tags && (
        <div className="list-group-item">
          <h4>Tags</h4>
          <ul>
            {Object.entries(tags).map(([key, value]) => (
              <li key={key}><samp>{key}</samp>: <samp>{value}</samp></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const ElbAllRegions = ({ data, onShow }) => {
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
              onShow={onShow}
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

export const ElbLinkedPolicies = ({ data }) => {
  const [selectedPolicy, setSelectedPolicy] = React.useState(null);

  if (!data?.regions) return null;

  return (
    <>
      {Object.entries(data.regions).map(([regionName, regionData]) =>
        Object.entries(regionData.elb_policies || {}).map(([policyId, policy]) => (
          <React.Fragment key={`${regionName}-${policyId}`}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setSelectedPolicy(policy); // open modal
              }}
            >
              {policy.name}
            </a>
            <br />
          </React.Fragment>
        ))
      )}

      {selectedPolicy && (
        <SingleElbPolicy
          policy={selectedPolicy}
          onClose={() => setSelectedPolicy(null)}
        />
      )}
    </>
  );
};

export const ELBv2LoadBalancer = ({ lb, region, vpc }) => {
  if (!lb) return null;

  return (
    <div>
      <h4>{lb.name}</h4>

      <div>
        <h4>Information</h4>
        <ul>
          <li>ARN: {lb.arn}</li>
          <li>VPC: {lb.vpcName || vpc} ({lb.vpc})</li>
          <li>DNS: {lb.DNSName}</li>
          <li>Scheme: {lb.Scheme}</li>
          <li>Type: {lb.Type}</li>
          <li>Availability zones:
            <ul>
              {lb.AvailabilityZones?.map((zone, idx) => (
                <li key={idx}>{zone.ZoneName} ({zone.SubnetId})</li>
              ))}
            </ul>
          </li>
        </ul>
      </div>

      <div>
        <h4>Listeners</h4>
        <ul>
          {lb.listeners?.map((listener, idx) => (
            <li key={idx}>
              {listener.port} ({listener.Protocol}{listener.SslPolicy ? `, ${listener.SslPolicy}` : ''})
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4>Attributes</h4>
        <ul>
          {lb.attributes?.map((attr, idx) => (
            <li key={idx}>{attr.Key}: {attr.Value}</li>
          ))}
        </ul>
      </div>

      {!lb.isNetwork && (
        <div>
          <h4>Security Groups ({lb.security_groups?.length || 0})</h4>
          <ul>
            {lb.security_groups?.map((sg) => (
              <li key={sg.GroupId}>
                <a href="#" onClick={() => console.log(`Show SG ${sg.GroupId}`)}>
                  {sg.GroupId}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {lb.tags && Object.keys(lb.tags).length > 0 && (
        <div>
          <h4>Tags</h4>
          <ul>
            {Object.entries(lb.tags).map(([key, value]) => (
              <li key={key}><samp>{key}</samp>: <samp>{value}</samp></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const EMRCluster = ({ cluster, region, vpc, getValueAt, showObject }) => {
  if (!cluster) return null;

  const getSGLink = (sgId) => {
    if (!sgId) return "N/A";
    const sgName = getValueAt?.('services.ec2.regions', region, 'vpcs', vpc, 'security_groups', sgId, 'name') || sgId;
    return (
      <a href="#" onClick={() => showObject(`services.ec2.regions.${region}.vpcs.${vpc}.security_groups.${sgId}`)}>
        {sgName}
      </a>
    );
  };

  return (
    <div>
      <h4>{cluster.name}</h4>

      <div>
        <h4>Information</h4>
        <ul>
          <li>Region: {cluster.region}</li>
          <li>ARN: {cluster.arn}</li>
          <li>VPC: {getValueAt?.('services.ec2.regions', region, 'vpcs', vpc, 'name')} ({getValueAt?.('services.ec2.regions', region, 'vpcs', vpc, 'arn')})</li>
          <li>Id: {cluster.id}</li>
          <li>Availability zone: {cluster.Ec2InstanceAttributes?.Ec2AvailabilityZone}</li>
          <li>Status: {cluster.Status?.State}</li>
          <li>Instance profile: {cluster.Ec2InstanceAttributes?.IamInstanceProfile}</li>
          <li>Visible to all users: {String(cluster.VisibleToAllUsers)}</li>
        </ul>
      </div>

      <div>
        <h4>Master</h4>
        <ul>
          <li>Public DNS: {cluster.MasterPublicDnsName || "N/A"}</li>
          <li>Security group: {getSGLink(cluster.Ec2InstanceAttributes?.EmrManagedMasterSecurityGroup)}</li>
        </ul>
      </div>

      <div>
        <h4>Slave</h4>
        <ul>
          <li>Security group: {getSGLink(cluster.Ec2InstanceAttributes?.EmrManagedSlaveSecurityGroup)}</li>
        </ul>
      </div>
    </div>
  );
};

 // Inline Policy Component
export const IAMInlinePolicies = ({ inline_policies, resource_type, resource_id }) => {
  if (!inline_policies || !inline_policies.length) return null;
  return (
    <div className="list-group-item">
      <h4 className="list-group-item-heading">
        Inline Policies <span className="badge">{inline_policies.length}</span>
      </h4>
      {inline_policies.map((policy, idx) => (
        <div key={idx}>
          {/* You can implement AccordionPolicy as a separate component */}
          <AccordionPolicy
            name={policy.name}
            document={policy.PolicyDocument}
            policyPath={`iam.${resource_type}.${resource_id}.inline_policies.${idx}.PolicyDocument`}
            heading="h5"
            samp
          />
        </div>
      ))}
    </div>
  );
};

// Managed Policies List Component
export const IAMManagedPoliciesList = ({ policies }) => {
  if (!policies || !policies.length) return null;
  return (
    <div className="list-group-item">
      <h4 className="list-group-item-heading">
        Managed Policies <span className="badge">{policies.length}</span>
      </h4>
      <ul className="no-bullet">
        {policies.map((policyId) => (
          <li key={policyId}>
            <a href={`javascript:showObject('services.iam.policies.${policyId}')`}>
              {getValueAt("services.iam.policies", policyId, "name")}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Single IAM Managed Policy Component
export const IAMManagedPolicy = ({ policy }) => {
  if (!policy) return null;
  return (
    <div>
      <div className="list-group-item active">
        <h4 className="list-group-item-heading">{policy.name}</h4>
      </div>
      <div className="list-group-item">
        <AccordionPolicy
          name={policy.arn}
          document={policy.PolicyDocument}
          policyPath={`iam.policies.${policy.id}.PolicyDocument`}
          heading="h5"
        />
      </div>
      <div className="list-group-item">
        <h4 className="list-group-item-heading">Attached Entities</h4>
        <ul>
          {policy.attached_to &&
            Object.entries(policy.attached_to).map(([entityType, entities]) => (
              <li key={entityType}>
                {makeTitle(entityType)}
                <ul>
                  {entities.map((entity) => (
                    <li key={entity.id}>
                      <a href={`javascript:showObject('services.iam.${entityType}.${entity.id}')`}>{entity.name}</a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

// IAM Group Component
export const IAMGroup = ({ group }) => {
  if (!group) return null;
  return (
    <div>
      <div id="resource-name" className="list-group-item active">
        <h4 className="list-group-item-heading">{group.name}</h4>
      </div>
      <div className="list-group-item">
        <h4 className="list-group-item-heading">Information</h4>
        <div className="list-group-item-text item-margin">
          Arn: <samp>{group.arn || "N/A"}</samp>
        </div>
        <div className="list-group-item-text item-margin">
          Creation date: {group.CreateDate}
        </div>
      </div>
      <div className="list-group-item" style={{ paddingBottom: 0 }}>
        <h4 className="list-group-item-heading">
          Members <span className="badge">{group.users?.length || 0}</span>
        </h4>
        <div className="accordion-inner">
          <ul>
            {group.users?.map((user) => (
              <li key={user}>
                <a href={`javascript:showObject('services.iam.users.${user}')`}>
                  {getValueAt("services.iam.users", user, "name")}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Nested inline policies */}
      <IAMInlinePolicies
        inline_policies={group.inline_policies}
        resource_type="groups"
        resource_id={group.id}
      />

      {/* Managed policies list */}
      <IAMManagedPoliciesList policies={group.policies} />
    </div>
  );
}; 
  
  
// ----------------- Password Policy View -----------------
export const PasswordPolicyView = ({ policy }) => {
    if (!policy) return null;
  
    // Check if password policy is default (i.e., no policy exists)
    const isDefaultPolicy = policy.MinimumPasswordLength === "1" || policy.MinimumPasswordLength === 1;
  
    return (
      <div className="bg-gray-900/40 border border-gray-700 rounded-lg p-4 space-y-3">
        <h4 className="text-lg font-semibold text-gray-200 mb-2">Password Policy</h4>
  
        <p>
          Minimum password length: <span>{policy.MinimumPasswordLength}</span>
          {isDefaultPolicy && (
            <span className="text-gray-400 italic ml-2">
              (It should be noted that 1 character passwords are authorized when no password policy exists, even though the web console displays "6")
            </span>
          )}
        </p>
  
        <p>
          Require at least one uppercase letter: <span>{String(policy.RequireUppercaseCharacters)}</span>
        </p>
        <p>
          Require at least one lowercase letter: <span>{String(policy.RequireLowercaseCharacters)}</span>
        </p>
        <p>
          Require at least one number: <span>{String(policy.RequireNumbers)}</span>
        </p>
        <p>
          Require at least one non-alphanumeric character: <span>{String(policy.RequireSymbols)}</span>
        </p>
        <p>
          Enable password expiration: <span>{String(policy.ExpirePasswords)}</span>
        </p>
  
        {policy.MaxPasswordAge && (
          <p>
            Password expiration period (days): <span>{policy.MaxPasswordAge}</span>
          </p>
        )}
  
        <p>
          Prevent password reuse: <span>{String(policy.PasswordReusePrevention)}</span>
        </p>
  
        {policy.PreviousPasswordPrevented && (
          <>
            <p>
              Number of previous passwords to remember: <span>{policy.PreviousPasswordPrevented}</span>
            </p>
            <p>
              Allow users to change their own password: <span>{String(policy.AllowUsersToChangePassword)}</span>
            </p>
            <p>
              Allow users to set a new password after password expiration (Hard Expiry): <span>{String(policy.HardExpiry)}</span>
            </p>
          </>
        )}
      </div>
    );
  };

// ----------------- IAM User View -----------------
export const IAMResourceView = ({ type, data }) => {
  if (type !== "users") return null;

  // If data is an object of users (keyed by userId), normalize it
  const users = Array.isArray(data) ? data : Object.values(data || {});

  return (
    <div className="list-group">
      {users.map((user, idx) => (
        <div key={idx} className="mb-4 border rounded">
          {/* Name Header */}
          <div id="resource-name" className="list-group-item active">
            <h4 className="list-group-item-heading">{user.name}</h4>
          </div>

          {/* Information */}
          <div className="list-group-item">
            <h4 className="list-group-item-heading">Information</h4>
            <div className="list-group-item-text item-margin">
              Arn: <samp>{user.arn || "None"}</samp>
            </div>
            <div className="list-group-item-text item-margin">
              Creation date:{" "}
              {user.CreateDate
                ? new Date(user.CreateDate).toLocaleString()
                : "None"}
            </div>
          </div>

          {/* Authentication Methods */}
          <div className="list-group-item">
            <h4 className="list-group-item-heading">Authentication methods</h4>
            <p className="list-group-item-text item-margin">
              Password enabled: {user.LoginProfile ? "Yes" : "No"}
            </p>
            <p className="list-group-item-text item-margin">
              Multi-Factor enabled:{" "}
              {user.MFADevices && user.MFADevices.length > 0 ? "Yes" : "No"}
            </p>
            <ul className="item-margin">
              {user.MFADevices?.map((mfa, i) => (
                <li key={i} className="list-group-item-text">
                  Serial number: {mfa.SerialNumber}
                </li>
              ))}
            </ul>
            <p className="list-group-item-text item-margin">
              Access Keys: {user.AccessKeys?.length || 0}
            </p>
            <ul className="item-margin">
              {user.AccessKeys?.map((key, i) => (
                <li key={i} className="list-group-item-text">
                  {key.AccessKeyId}, {key.Status}, created on{" "}
                  {new Date(key.CreateDate).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>

          {/* Groups */}
          <div className="list-group-item">
            <h4 className="list-group-item-heading">
              Groups <span className="badge">{user.groups?.length || 0}</span>
            </h4>
            <ul>
              {user.groups?.map((group, i) => (
                <li key={i} className="list-group-item-text">
                  {group}
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          {user.Tags && (
            <div className="list-group-item">
              <h4>Tags</h4>
              <ul>
                {user.Tags.map((tag, i) => (
                  <li key={i} className="list-group-item-text">
                    <samp>{tag.Key}</samp>: <samp>{tag.Value}</samp>
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
export const IamRoleView = ({ role }) => {
  if (!role) return null;

  return (
    <div className="bg-gray-900/40 border border-gray-700 rounded-lg p-4 space-y-4">
      <h4 className="text-lg font-semibold text-gray-200">{role.name}</h4>

      {/* Info */}
      <div>
        <h5 className="text-md font-medium text-gray-300 mb-2">Information</h5>
        <p>ID: <span>{role.id || "N/A"}</span></p>
        <p>Arn: <span>{role.arn || "N/A"}</span></p>
        <p>Description: <span>{role.description || "N/A"}</span></p>
        <p>Creation Date: <span>{role.create_date || "N/A"}</span></p>
        <p>Path: <span>{role.path || "N/A"}</span></p>
        <p>Max Session Duration: <span>{role.max_session_duration || "N/A"}</span></p>
      </div>

      {/* Trust Policy */}
      {role.assume_role_policy?.PolicyDocument && (
        <div>
          <h5 className="text-md font-medium text-gray-300 mb-2">Role Trust Policy</h5>
          <pre className="bg-gray-800 rounded p-2 text-sm text-gray-300 overflow-x-auto">
            {JSON.stringify(role.assume_role_policy.PolicyDocument, null, 2)}
          </pre>
        </div>
      )}

      {/* Instances */}
      {role.instances_count > 0 && (
        <div>
          <h5 className="text-md font-medium text-gray-300 mb-2">
            Instances ({role.instances_count})
          </h5>
          <ul className="list-disc list-inside text-gray-300">
            {role.instance_profiles?.flatMap(profile =>
              profile.instances?.map(instanceId => (
                <li key={instanceId}>{instanceId}</li>
              ))
            )}
          </ul>
        </div>
      )}

      {/* Lambda Functions */}
      {role.awslambdas_count > 0 && (
        <div>
          <h5 className="text-md font-medium text-gray-300 mb-2">
            Lambda Functions ({role.awslambdas_count})
          </h5>
          <ul className="list-disc list-inside text-gray-300">
            {role.awslambdas?.map(fn => (
              <li key={fn.name}>{fn.name} ({fn.region})</li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {role.Tags && role.Tags.length > 0 && (
        <div>
          <h5 className="text-md font-medium text-gray-300 mb-2">Tags</h5>
          <ul className="list-disc list-inside text-gray-300">
            {role.Tags.map(tag => (
              <li key={tag.Key}>
                <samp>{tag.Key}</samp>: <samp>{tag.Value}</samp>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// ----------------- Credential Report View -----------------
export const CredentialReportView = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-4">
      {Object.keys(data).map((userKey) => {
        const user = data[userKey];
        return (
          <div
            key={userKey}
            className="bg-gray-900/40 border border-gray-700 rounded-lg p-4 space-y-2"
          >
            <h4 className="text-lg font-semibold text-gray-200">
              {user.name || user.user}
            </h4>
            <p>
              Creation Date: <span>{user.user_creation_time}</span>
            </p>
            <p>
              Last Used Date: <span>{user.last_used}</span>
            </p>
            <p>
              Password Enabled: <span>{String(user.password_enabled)}</span>
            </p>
            <p>
              Password Last Used: <span>{user.password_last_used}</span>
            </p>
            <p>
              Password Last Changed: <span>{user.password_last_changed}</span>
            </p>
            <p>
              MFA Active: <span>{String(user.mfa_active)}</span>
            </p>
            <p>
              Hardware MFA Active: <span>{String(user.mfa_active_hardware)}</span>
            </p>
            <p>
              Access Key 1 Active: <span>{String(user.access_key_1_active)}</span>
            </p>
            <p>
              Access Key 1 Last Used: <span>{user.access_key_1_last_used_date || "N/A"}</span>
            </p>
            <p>
              Access Key 1 Last Rotated: <span>{user.access_key_1_last_rotated || "N/A"}</span>
            </p>
            <p>
              Access Key 2 Active: <span>{String(user.access_key_2_active)}</span>
            </p>
            <p>
              Access Key 2 Last Used: <span>{user.access_key_2_last_used_date || "N/A"}</span>
            </p>
            <p>
              Access Key 2 Last Rotated: <span>{user.access_key_2_last_rotated || "N/A"}</span>
            </p>
            <p>
              Signing Cert 1 Active: <span>{String(user.cert_1_active)}</span>
            </p>
            <p>
              Signing Cert 2 Active: <span>{String(user.cert_2_active)}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export const KmsKey = ({ region, keyId, data }) => {
  const [selectedKey, setSelectedKey] = useState(null);

  if (!data?.[keyId]) return null;

  const key = data[keyId];

  return (
    <>
      <span
        style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
        onClick={() => setSelectedKey(key)}
      >
        {key.name}
      </span>

      {selectedKey && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="close"
              onClick={() => setSelectedKey(null)}
            >
              &times;
            </button>

            <div className="list-group-item active">
              <h4 className="list-group-item-heading">{selectedKey.name}</h4>
            </div>

            <div className="list-group-item">
              <h4>Information</h4>
              <ul>
                <li>ID: {selectedKey.id}</li>
                <li>ARN: {selectedKey.arn}</li>
                <li>Description: {selectedKey.description || "N/A"}</li>
                <li>Creation Date: {selectedKey.creation_date}</li>
                <li>Status: {selectedKey.key_enabled ? "Enabled" : "Disabled"}</li>
                <li>Origin: {selectedKey.origin || "N/A"}</li>
                <li>Key Manager: {selectedKey.key_manager || "N/A"}</li>
                <li>Rotation: {selectedKey.rotation_enabled ? "Enabled" : "Disabled"}</li>
              </ul>
            </div>

            <div className="list-group-item">
              <h4>Aliases</h4>
              {selectedKey.aliases?.length ? (
                <ul>
                  {selectedKey.aliases.map((alias) => (
                    <li key={alias.name}>{alias.name}</li>
                  ))}
                </ul>
              ) : (
                <span className="text-secondary">No Aliases</span>
              )}
            </div>

            <div className="list-group-item">
              <h4>Grants</h4>
              {selectedKey.grants?.map((grant, idx) => (
                <div key={idx}>
                  <b>Name: {grant.name || "N/A"}</b>
                  <GenericObject data={grant} />
                </div>
              ))}
            </div>

            <div className="list-group-item">
              {selectedKey.policy ? (
                <AccordionPolicy
                  name="Key Policy"
                  document={selectedKey.policy}
                  policyPath={`kms.regions.${region}.keys.${keyId}.policy`}
                />
              ) : (
                <h4 className="text-secondary">Key Policy</h4>
              )}
            </div>
          </div>
        </div>
      )}
    </>
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
export const RDSParameterGroup = ({ group }) => {
  if (!group) return null;
  return (
    <div>
      <div className="list-group-item active">
        <h4>{group.name}</h4>
      </div>
      <div className="list-group-item">
        <h4>Information</h4>
        <div>Group family: {group.DBParameterGroupFamily}</div>
        <div>Description: {group.Description}</div>
        <div>ARN: {group.arn}</div>
      </div>
      <div className="list-group-item">
        <h4>Parameters</h4>
        <table className="table-striped" width="100%">
          <thead>
            <tr>
              <th width="20%">Name</th>
              <th width="20%">Value</th>
              <th width="60%">Description</th>
            </tr>
          </thead>
          <tbody>
            {group.parameters &&
              Object.entries(group.parameters).map(([key, param], idx) => (
                <tr key={idx}>
                  <td>{key}</td>
                  <td>{param.ParameterValue}</td>
                  <td>{param.Description}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ---------- Security Group ----------
export const RDSSecurityGroup = ({ group }) => {
  if (!group) return null;
  return (
    <div>
      <div className="list-group-item active">
        <h4>{group.name}</h4>
      </div>
      <div className="list-group-item">
        <h4>Information</h4>
        <div>Description: {group.DBSecurityGroupDescription}</div>
      </div>
      <div className="list-group-item">
        <h4>Authorizations</h4>
        <ul>
          {group.EC2SecurityGroups?.map((sg, idx) => (
            <li key={idx}>
              {sg.EC2SecurityGroupName} ({sg.EC2SecurityGroupId}) @{" "}
              {sg.EC2SecurityGroupOwnerId} ({sg.Status})
            </li>
          ))}
          {group.IPRanges?.map((ip, idx) => (
            <li key={idx}>
              {ip.CIDRIP} ({ip.Status})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ---------- RDS Instance ----------
export const RDSInstance = ({ instance, region, vpc }) => {
  if (!instance) return null;
  return (
    <div>
      <div id="resource-name" className="list-group-item active">
        <h4>{instance.name}</h4>
      </div>

      <div className="list-group-item">
        <h4>Information</h4>
        <ul>
          <li>ARN: {instance.arn}</li>
          <li>Region: {region}</li>
          <li>Engine: {instance.Engine}</li>
          <li>Created: {formatDate(instance.InstanceCreateTime)}</li>
          <li>Status: {makeTitle(instance.DBInstanceStatus)}</li>
          <li>Is Read Replica: {instance.is_read_replica ? "Yes" : "No"}</li>
          <li>Auto Minor Version Upgrade: {boolToEnabled(instance.AutoMinorVersionUpgrade)}</li>
          <li>Multi AZ: {boolToEnabled(instance.MultiAZ)}</li>
          <li>Instance Class: {instance.DBInstanceClass}</li>
          <li>Backup Retention Period: {instance.BackupRetentionPeriod} days</li>
          <li>Enhanced Monitoring: {boolToEnabled(instance.EnhancedMonitoringResourceArn)}</li>
          <li>Encrypted Storage: {boolToEnabled(instance.StorageEncrypted)}</li>
          <li>CA Certificate: {instance.CACertificateIdentifier}</li>
        </ul>
      </div>

      <div className="list-group-item">
        <h4>Network</h4>
        <ul>
          <li>
            Endpoint:{" "}
            <samp>
              {instance.Endpoint?.Address}:{instance.Endpoint?.Port}
            </samp>
          </li>
          <li>
            Publicly Accessible: {boolToEnabled(instance.PubliclyAccessible)}
          </li>
        </ul>
      </div>
    </div>
  );
};

// ---------- Snapshot ----------
export const RDSSnapshot = ({ snapshot, region, vpcId }) => {
  if (!snapshot) return null;
  return (
    <div>
      <div className="list-group-item active">
        <h4>{snapshot.name}</h4>
      </div>
      <div className="list-group-item">
        <h4>Information</h4>
        <ul>
          {snapshot.is_cluster ? (
            <>
              <li>DB Cluster: {snapshot.DBClusterIdentifier}</li>
              <li>Cluster Snapshot: {snapshot.is_cluster}</li>
            </>
          ) : (
            <li>
              RDS Instance: <samp>{snapshot.DBInstanceIdentifier}</samp>
            </li>
          )}
          <li>Created: {formatDate(snapshot.SnapshotCreateTime)}</li>
          <li>Encryption: {boolToEnabled(snapshot.Encrypted)}</li>
          {!snapshot.is_cluster && <li>Option group: {snapshot.OptionGroupName}</li>}
        </ul>
      </div>
      <div className="list-group-item">
        <h4>Attributes</h4>
        <ul>
          {snapshot.attributes?.map((attr, idx) => (
            <li key={idx}>
              <samp>{attr.AttributeName}</samp>:{" "}
              <samp>{attr.AttributeValues || "N/A"}</samp>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ---------- Subnet Group ----------
export const RDSSubnetGroup = ({ subnetGroup }) => {
  if (!subnetGroup) return null;
  return (
    <div>
      <div className="list-group-item active">
        <h4>{subnetGroup.name}</h4>
      </div>
      <div className="list-group-item">
        <h4>Attributes</h4>
        <GenericObject data={subnetGroup.resource} />
      </div>
    </div>
  );
};

// ---------- Helpers ----------
const boolToEnabled = (val) => (val ? "Enabled" : "Disabled");
const formatDate = (date) => (date ? new Date(date).toLocaleString() : "N/A");
const makeTitle = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : "");

// ---------- Redshift Parameter Group ----------
export const RedshiftParameterGroup = ({ group }) => {
  if (!group) return null;
  return (
    <div>
      <div className="list-group-item active">
        <h4>{group.name}</h4>
      </div>

      <div className="list-group-item">
        <h4>Information</h4>
        <div>ARN: <samp>{group.arn}</samp></div>
        <div>Description: <samp>{group.description}</samp></div>
        <div>Group Family: <samp>{group.family}</samp></div>
        <div>Default Parameter Group: <samp>{String(group.is_default)}</samp></div>
      </div>

      <div className="list-group-item">
        <h4>Parameters</h4>
        <ul>
          {group.parameters &&
            Object.entries(group.parameters).map(([key, param], idx) => (
              <li key={idx}>
                <samp>{key}</samp>: <samp>{param.value}</samp>
                <div>ARN: <samp>{param.arn}</samp></div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

// ---------- Redshift Cluster ----------
export const RedshiftCluster = ({ cluster }) => {
  if (!cluster) return null;
  return (
    <div>
      <div className="list-group-item active">
        <h4>{cluster.name}</h4>
      </div>

      <div className="list-group-item">
        <h4>Information</h4>
        <ul>
          <li>ARN: <samp>{cluster.arn}</samp></li>
          <li>Node Type: {cluster.NodeType}</li>
          <li>Allow Version Upgrade: {String(cluster.AllowVersionUpgrade)}</li>
          <li>Automated Snapshot Retention Period: {cluster.AutomatedSnapshotRetentionPeriod}</li>
          <li>Created at: {formatDate(cluster.ClusterCreateTime)}</li>
          <li>Availability Zone: {cluster.AvailabilityZone}</li>
          <li>Encrypted: {String(cluster.Encrypted)}</li>
          <li>
            Cluster Parameter Groups:
            <ul>
              {cluster.ClusterParameterGroups?.map((pg, idx) => (
                <li key={idx}>{pg.ParameterGroupName}</li>
              ))}
            </ul>
          </li>
        </ul>
      </div>

      <div className="list-group-item">
        <h4>Network</h4>
        <ul>
          <li>
            Endpoint: {cluster.Endpoint?.Address}:{cluster.Endpoint?.Port}
          </li>
          <li>Publicly Accessible: {String(cluster.PubliclyAccessible)}</li>
          <li>VPC: {cluster.VpcId}</li>
          <li>Subnet: {cluster.ClusterSubnetGroupName}</li>
          <li>
            Security groups:
            <ul>
              {cluster.VpcSecurityGroups?.map((sg, idx) => (
                <li key={idx}>{sg.VpcSecurityGroupId}: {sg.Status}</li>
              ))}
              {cluster.ClusterSecurityGroups?.map((sg, idx) => (
                <li key={idx}>{sg.ClusterSecurityGroupName}: {sg.Status}</li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

// ---------- Redshift Security Group ----------
export const RedshiftSecurityGroup = ({ group }) => {
  if (!group) return null;
  return (
    <div>
      <div className="list-group-item active">
        <h4>{group.resource_key}</h4>
      </div>

      <div className="list-group-item">
        <h4>Information</h4>
        <div>Description: {group.Description}</div>
      </div>

      <div className="list-group-item">
        <h4>Rules</h4>
        <ul>
          {group.IPRanges?.length > 0 && (
            <>
              <li>IP addresses:</li>
              <ul>
                {group.IPRanges.map((ip, idx) => (
                  <li key={idx}>{ip.CIDRIP}: {ip.Status}</li>
                ))}
              </ul>
            </>
          )}

          {group.EC2SecurityGroups?.length > 0 && (
            <>
              <li>EC2 security groups:</li>
              <ul>
                {group.EC2SecurityGroups.map((sg, idx) => (
                  <li key={idx}>
                    {sg.EC2SecurityGroupName} (AWS account ID {sg.UserId}): {sg.Status}
                  </li>
                ))}
              </ul>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

// ---------- Redshift Cluster Node ----------
export const RedshiftClusterNode = ({ node }) => {
  if (!node) return null;
  return (
    <div>
      {node.NodeRole}: {node.PrivateIPAddress} / {node.PublicIPAddress}
    </div>
  );
};

// Single domain component (equivalent to the Handlebars modal template)
export const Route53Domain = ({ domain }) => {
  if (!domain) return null;

  return (
    <div className="list-group-item">
      <h4 className="list-group-item-heading">{domain.name}</h4>
      <div className="list-group-item-text item-margin">
        ARN: <samp>{domain.arn || "N/A"}</samp>
      </div>
      <div className="list-group-item-text item-margin">
        Auto Renew: {domain.auto_renew ? "Enabled" : "Disabled"}
      </div>
      <div className="list-group-item-text item-margin">
        Transfer Lock: {domain.transfer_lock ? "Enabled" : "Disabled"}
        {!domain.transfer_lock && domain.transfer_lock_unauthorized && (
          <span>
            <i className="fa fa-exclamation-triangle"></i> {domain.transfer_lock_unauthorized}
          </span>
        )}
      </div>
      <div className="list-group-item-text item-margin">
        Expiry: {domain.expiry ? new Date(domain.expiry).toLocaleDateString() : "N/A"}
      </div>
    </div>
  );
};

// Single Hosted Zone component
export const Route53HostedZone = ({ zone }) => {
  if (!zone) return null;

  return (
    <div className="list-group-item">
      <h4 className="list-group-item-heading">{zone.name}</h4>
      <div className="list-group-item-text item-margin">
        ID: <samp>{zone.id || "N/A"}</samp>
      </div>
      <div className="list-group-item-text item-margin">
        ARN: <samp>{zone.arn || "N/A"}</samp>
      </div>
      <div className="list-group-item-text item-margin">
        Caller Reference: <samp>{zone.caller_reference || "N/A"}</samp>
      </div>
      <div className="list-group-item-text item-margin">
        Resource Record Set Count: <samp>{zone.resource_record_set_count || 0}</samp>
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
              <Route53HostedZone key={zoneKey} zone={zone} />
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
export const S3ACLs = ({ resourceType, grantees = [] }) => {
  if (!grantees.length) return null;
  return (
    <div className="list-group-item">
      <div className="accordion">
        <h4 className="list-group-item-heading">{resourceType} ACLs</h4>
        <div className="accordion-body item-margin">
          <div className="accordion-inner">
            <table className="table-striped">
              <thead>
                <tr className="table-padding">
                  <td width="20%" className="text-center well"></td>
                  <td width="20%" className="text-center well">List</td>
                  <td width="20%" className="text-center well">Upload/Delete</td>
                  <td width="20%" className="text-center well">View<br/>Permissions</td>
                  <td width="20%" className="text-center well">Edit<br/>Permissions</td>
                </tr>
              </thead>
              <tbody>
                {grantees.map((g, idx) => (
                  <tr key={idx}>
                    <td width="20%" className="text-center bucket-name table-hover">
                      {g.DisplayName}
                    </td>
                    <td width="20%" className="text-center">
                      <i className={`fa ${g.permissions?.read ? "fa-check" : "fa-times"}`} />
                    </td>
                    <td width="20%" className="text-center">
                      <i className={`fa ${g.permissions?.write ? "fa-check" : "fa-times"}`} />
                    </td>
                    <td width="20%" className="text-center">
                      <i className={`fa ${g.permissions?.read_acp ? "fa-check" : "fa-times"}`} />
                    </td>
                    <td width="20%" className="text-center">
                      <i className={`fa ${g.permissions?.write_acp ? "fa-check" : "fa-times"}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------- Helpers ----------
export const normalizeIamPolicies = (data, resourceType) => {
  if (!data) return [];

  return Object.entries(data).flatMap(([entityId, entity]) => {
    if (!entity.policies) return [];

    return Object.entries(entity.policies).map(([policyId, policy]) => ({
      entityName: entityId,      // You can map to DisplayName if available
      policyName: policyId,      // Or lookup friendly name if provided
      condition: !!policy.condition,
      resourceType,
    }));
  });
};

// ---------- S3 Bucket IAM Policies ----------
export const S3BucketIAMPolicies = ({ resourceType, policiesData }) => {
  if (!resourceType) return null;

  // Normalize nested IAM policies
  const policies = normalizeIamPolicies(policiesData, resourceType);

  if (policies.length === 0) return null;

  return (
    <div className="list-group-item">
      <div className="accordion">
        <h4 className="list-group-item-heading accordion-heading">
          {resourceType} with access via IAM policies
        </h4>
        <div className="accordion-body item-margin">
          <div className="accordion-inner">
            <table className="table-striped" width="100%">
              <thead>
                <tr>
                  <td width="40%">{resourceType} name</td>
                  <td width="40%" className="text-center">Policy name</td>
                  <td width="20%" className="text-center">Condition?</td>
                </tr>
              </thead>
              <tbody>
                {policies.map((p, idx) => (
                  <tr key={idx}>
                    <td width="40%">{p.entityName}</td>
                    <td width="40%" className="text-center">{p.policyName}</td>
                    <td width="20%" className="text-center">{p.condition ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};


// ---------- S3 Buckets ----------
export const S3Bucket = ({ bucket }) => {
  if (!bucket) return null;

  // Normalize: if object of buckets -> convert to array
  const buckets = Array.isArray(bucket) ? bucket : Object.values(bucket || {});

  return (
    <div className="space-y-6">
      {buckets.map((b, idx) => (
        <div key={idx} className="border border-gray-700 rounded-lg overflow-hidden">
          <div id="resource-name" className="list-group-item active">
            <h4>{b.name}</h4>
          </div>

          <div className="list-group-item">
            <h4 className="list-group-item-heading">Information</h4>
            <div className="item-margin">ARN: <samp>{b.arn}</samp></div>
            <div className="item-margin">Region: {b.region}</div>
            <div className="item-margin">Creation Date: {b.CreationDate}</div>
            <div className="item-margin">Logging: {b.logging ? "Enabled" : "Disabled"}</div>
            <div className="item-margin">Default Encryption: {b.default_encryption_enabled ? "Enabled" : "Disabled"}</div>
            {b.default_encryption_enabled && (
              <>
                <div className="item-margin">Encryption Algorithm: {b.default_encryption_algorithm || "N/A"}</div>
                <div className="item-margin">Encryption Key: {b.default_encryption_key || "N/A"}</div>
              </>
            )}
            <div className="item-margin">Versioning: {b.versioning_status_enabled ? "Enabled" : "Disabled"}</div>
            <div className="item-margin">MFA Delete: {b.version_mfa_delete_enabled ? "Enabled" : "Disabled"}</div>
            <div className="item-margin">Secure Transport: {b.secure_transport_enabled ? "Enabled" : "Disabled"}</div>
            <div className="item-margin">Static Website Hosting: {b.web_hosting_enabled ? "Enabled" : "Disabled"}</div>
          </div>

          <S3PublicAccessBlockConfiguration config={b.public_access_block_configuration} />
          <S3ACLs resourceType="bucket" grantees={b.grantees} />
          <S3BucketIAMPolicies resourceType="groups" policiesData={b.groups} />
          <S3BucketIAMPolicies resourceType="roles" policiesData={b.roles} />
          <S3BucketIAMPolicies resourceType="users" policiesData={b.users} />
        </div>
      ))}
    </div>
  );
};

// ---------- S3 Objects ----------
export const S3Object = ({ bucketName, object }) => {
  if (!object) return null;
  return (
    <div className="list-group">
      <div id="resource-name" className="list-group-item active">
        <h4>{bucketName}/{object.name}</h4>
      </div>
      <div className="list-group-item">
        <h4>Information</h4>
        <ul className="no-bullet">
          <li>Server-side encryption: {object.ServerSideEncryption ? "Enabled" : "Not Encrypted"}</li>
          <li>Permissions match bucket's: {object.granteesMatch ? "Yes" : "No"}</li>
        </ul>
      </div>
      <S3ACLs resourceType="object" grantees={object.grantees} />
    </div>
  );
};

// ---------- S3 Public Access Block Configuration ----------
export const S3PublicAccessBlockConfiguration = ({ config }) => {
  if (!config) return null;
  return (
    <div className="list-group-item">
      <h4 className="list-group-item-heading">Public Access Block Configuration</h4>
      <div className="item-margin">Ignore Public ACLs: {config.IgnorePublicAcls ? "Enabled" : "Disabled"}</div>
      <div className="item-margin">Block Public Policies: {config.BlockPublicPolicy ? "Enabled" : "Disabled"}</div>
      <div className="item-margin">Block Public ACLs: {config.BlockPublicAcls ? "Enabled" : "Disabled"}</div>
      <div className="item-margin">Restrict Public Buckets: {config.RestrictPublicBuckets ? "Enabled" : "Disabled"}</div>
    </div>
  );
};

// -------------------- Secrets Manager Secrets --------------------
export const SecretsManagerSecrets = ({ data }) => {
  if (!data) return null;

  return (
    <>
      {Object.entries(data).map(([region, regionData]) => (
        <div key={region}>
          <h3>Region: {region}</h3>

          {regionData.secrets && Object.keys(regionData.secrets).length > 0 ? (
            Object.entries(regionData.secrets).map(([secretId, secret]) => (
              <div key={secretId}>
                {/* Resource Name */}
                <div id="resource-name" className="list-group-item active">
                  <h4 className="list-group-item-heading">{secret.name || "Unnamed Secret"}</h4>
                </div>

                {/* Secret Information */}
                <div className="list-group-item">
                  <h4 className="list-group-item-heading">Information</h4>
                  <div className="list-group-item-text item-margin">
                    Name:{" "}
                    <span id={`secretsmanager.regions.${region}.secrets.${secretId}.name`}>
                      <samp>{secret.name || "None"}</samp>
                    </span>
                  </div>
                  <div className="list-group-item-text item-margin">
                    ARN:{" "}
                    <span id={`secretsmanager.regions.${region}.secrets.${secretId}.arn`}>
                      <samp>{secret.arn || "None"}</samp>
                    </span>
                  </div>
                  <div className="list-group-item-text item-margin">
                    Description:{" "}
                    <span id={`secretsmanager.regions.${region}.secrets.${secretId}.description`}>
                      <samp>{secret.description || "None"}</samp>
                    </span>
                  </div>
                  <div className="list-group-item-text item-margin">
                    Last Changed Date:{" "}
                    <span id={`secretsmanager.regions.${region}.secrets.${secretId}.last_changed_date`}>
                      <samp>
                        {secret.last_changed_date
                          ? new Date(secret.last_changed_date).toLocaleString()
                          : "None"}
                      </samp>
                    </span>
                  </div>
                  <div className="list-group-item-text item-margin">
                    Last Accessed Date:{" "}
                    <span id={`secretsmanager.regions.${region}.secrets.${secretId}.last_accessed_date`}>
                      <samp>
                        {secret.last_accessed_date
                          ? new Date(secret.last_accessed_date).toLocaleString()
                          : "None"}
                      </samp>
                    </span>
                  </div>
                  <div className="list-group-item-text item-margin">
                    KMS Key:{" "}
                    <span id={`secretsmanager.regions.${region}.secrets.${secretId}.kms`}>
                      <samp>{secret.kms || "None"}</samp>
                    </span>
                  </div>
                  <div className="list-group-item-text item-margin">
                    Rotation:{" "}
                    <span id={`secretsmanager.regions.${region}.secrets.${secretId}.rotation`}>
                      {secret.rotation ? "Enabled" : "Disabled"}
                    </span>
                  </div>

                  {/* Rotation Details */}
                  {secret.rotation && (
                    <>
                      <div className="list-group-item-text item-margin">
                        Rotation Lambda ARN:{" "}
                        <span id={`secretsmanager.regions.${region}.secrets.${secretId}.rotation_lambda_arn`}>
                          <samp>{secret.rotation_lambda_arn || "None"}</samp>
                        </span>
                      </div>
                      <div className="list-group-item-text item-margin">
                        Rotation Interval:{" "}
                        <span id={`secretsmanager.regions.${region}.secrets.${secretId}.rotation_interval`}>
                          <samp>{secret.rotation_interval || "None"}</samp>
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Policy */}
                {secret.policy && secret.policy.Statement ? (
                  <div className="list-group-item">
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
            <div>No secrets found</div>
          )}
        </div>
      ))}
    </>
  );
};

// -------------------- SES Identities --------------------
export const SESIdentities = ({ data }) => {
  if (!data) return null;

  return (
    <>
      {Object.entries(data).map(([region, regionData]) => (
        <div key={region}>
          <h3>Region: {region}</h3>

          {regionData.identities && Object.keys(regionData.identities).length > 0 ? (
            Object.entries(regionData.identities).map(([identityId, identity]) => (
              <div key={identityId}>
                {/* Resource Name */}
                <div id="resource-name" className="list-group-item active">
                  <h4 className="list-group-item-heading">{identity.name || "Unnamed Identity"}</h4>
                </div>

                {/* Identity Information */}
                <div className="list-group-item">
                  <h4 className="list-group-item-heading">Information</h4>
                  <div className="list-group-item-text item-margin">
                    ARN: <samp>{identity.arn || "None"}</samp>
                  </div>
                </div>

                {/* DKIM Configuration */}
                <div className="list-group-item">
                  <h4 className="list-group-item-heading">DKIM Configuration</h4>
                  <div className="list-group-item-text item-margin">
                    Enabled: {identity.DkimEnabled !== undefined ? identity.DkimEnabled.toString() : "None"}
                  </div>
                  <div className="list-group-item-text item-margin">
                    Verification Status: {identity.DkimVerificationStatus || "None"}
                  </div>
                </div>

                {/* Policies */}
                <div className="list-group-item">
                  <h4 className="list-group-item-heading">Policies</h4>
                  {identity.policies && Object.entries(identity.policies).length > 0 ? (
                    Object.entries(identity.policies).map(([policyKey, policyDoc], index) => (
                      <AccordionPolicy
                        key={policyKey}
                        name={`${policyKey} (${identity.arn || "unknown"})`}
                        policyPath={`ses.regions.${region}.identities.${identityId}.policies.${index}`}
                        document={policyDoc}
                      />
                    ))
                  ) : (
                    <div className="list-group-item-text text-secondary">No policies found</div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div>No identities found</div>
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

// -------------------- AccordionPolicy Component --------------------
export const AccordionPolicy = ({ name, policyPath, document, heading = "h5" }) => {
  const [open, setOpen] = useState(false);

  if (!document) return null;

  const HeadingTag = heading;

  return (
    <div className="accordion">
      <HeadingTag className="list-group-item-heading accordion-heading">
        <samp>{name}</samp>
        <button
          onClick={() => setOpen(!open)}
          className="accordion-toggle ml-2 text-blue-500 underline"
        >
          {open ? "Hide Details" : "Show Details"}
        </button>
      </HeadingTag>
      {open && (
        <div id={policyPath} className="accordion-body item-margin">
          <div className="accordion-inner">
            <code>
              <Policy document={document} />
            </code>
          </div>
        </div>
      )}
    </div>
  );
};
// -------------------- SNS Topics --------------------
export const SNSTopics = ({ data }) => {
  if (!data) return null;

  return (
    <>
      {Object.entries(data).map(([region, regionData]) => (
        <div key={region}>
          <h3>Region: {region}</h3>

          {regionData.topics && Object.keys(regionData.topics).length > 0 ? (
            Object.entries(regionData.topics).map(([topicId, topic]) => (
              <div key={topicId}>
                {/* Header */}
                <div id="resource-name" className="list-group-item active">
                  <h4 className="list-group-item-heading">{topic.name || "Unnamed Topic"}</h4>
                </div>

                {/* Information */}
                <div className="list-group-item">
                  <h4 className="list-group-item-heading">Information</h4>
                  <div>Region: <samp>{region}</samp></div>
                  <div>ARN: <samp>{topic.arn || "None"}</samp></div>
                  <div>Display name: <samp>{topic.DisplayName || "None"}</samp></div>
                  <div>
                    Encrypted: {topic.KmsMasterKeyId ? "True" : "False"}
                  </div>
                </div>

                {/* Policies */}
                {topic.Policy && (
                  <div className="list-group-item">
                    <AccordionPolicy
                      name="Access Control Policy"
                      policyPath={`sns.regions.${region}.topics.${topicId}.Policy`}
                      document={topic.Policy}
                    />
                  </div>
                )}

                {topic.DeliveryPolicy && (
                  <div className="list-group-item">
                    <AccordionPolicy
                      name="Delivery Policy"
                      policyPath={`sns.regions.${region}.topics.${topicId}.DeliveryPolicy`}
                      document={topic.DeliveryPolicy}
                    />
                  </div>
                )}

                <div className="list-group-item">
                  {topic.EffectiveDeliveryPolicy ? (
                    <AccordionPolicy
                      name="Effective Delivery Policy"
                      policyPath={`sns.regions.${region}.topics.${topicId}.EffectiveDeliveryPolicy`}
                      document={topic.EffectiveDeliveryPolicy}
                    />
                  ) : (
                    <h4 className="list-group-item-heading accordion-heading text-secondary">
                      Effective Delivery Policy
                    </h4>
                  )}
                </div>

                {/* Subscriptions */}
                <div className="list-group-item">
                  <h4 className="list-group-item-heading">Subscriptions</h4>
                  <span className="badge">{topic.subscriptions_count || 0}</span>
                  <ul>
                    {topic.subscriptions &&
                      topic.subscriptions.protocol &&
                      Object.entries(topic.subscriptions.protocol).map(
                        ([protocol, subs]) => (
                          <li key={protocol}>
                            {protocol}
                            <ul>
                              {subs.map((sub, i) => (
                                <li key={i}>
                                  Endpoint: <samp>{sub.Endpoint}</samp> <br />
                                  ARN: <samp>{sub.arn}</samp>
                                </li>
                              ))}
                            </ul>
                          </li>
                        )
                      )}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <div>No topics found</div>
          )}
        </div>
      ))}
    </>
  );
};


// -------------------- SQS Queues --------------------
export const SQSQueues = ({ data }) => {
  if (!data) return null;

  return (
    <>
      {Object.entries(data).map(([region, regionData]) => (
        <div key={region}>
          <h3>Region: {region}</h3>

          {regionData.queues && Object.keys(regionData.queues).length > 0 ? (
            Object.entries(regionData.queues).map(([queueId, queue]) => (
              <div key={queueId}>
                {/* Resource Name */}
                <div id="resource-name" className="list-group-item active">
                  <h4 className="list-group-item-heading">
                    {queue.name || "Unnamed Queue"}
                  </h4>
                </div>

                {/* Queue Information */}
                <div className="list-group-item">
                  <h4 className="list-group-item-heading">Information</h4>
                  <div className="list-group-item-text item-margin">
                    Region: <samp>{region}</samp>
                  </div>
                  <div className="list-group-item-text item-margin">
                    ARN: <samp>{queue.arn || "None"}</samp>
                  </div>
                  <div className="list-group-item-text item-margin">
                    KMS master key id:{" "}
                    <span
                      id={`sqs.regions.${region}.queues.${queueId}.server-side-encryption-disabled`}
                    >
                      {queue.kms_master_key_id || "None"}
                    </span>
                  </div>
                  <div className="list-group-item-text item-margin">
                    SQS-managed encryption keys:{" "}
                    <span
                      id={`sqs.regions.${region}.queues.${queueId}.server-side-encryption-disabled`}
                    >
                      {queue.sqs_managed_sse_enabled === "true"
                        ? "Enabled"
                        : "Disabled"}
                    </span>
                  </div>
                  <div className="list-group-item-text item-margin">
                    Created on:{" "}
                    <samp>
                      {queue.CreatedTimestamp
                        ? new Date(queue.CreatedTimestamp).toLocaleString()
                        : "None"}
                    </samp>
                  </div>
                </div>

                {/* Policy */}
                <div className="list-group-item">
                  {queue.Policy && queue.Policy.Statement?.length > 0 ? (
                    <AccordionPolicy
                      name="Access Control Policy"
                      policyPath={`sqs.regions.${region}.queues.${queueId}.Policy`}
                      document={queue.Policy}
                    />
                  ) : (
                    <h4 className="list-group-item-heading accordion-heading text-secondary">
                      Access Control Policy
                    </h4>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div>No queues found</div>
          )}
        </div>
      ))}
    </>
  );
};


// -------------------- Stackdriver Logging Sinks --------------------
export const AWSStackdriverLoggingSinks = ({ data }) => {
  if (!data) return null;

  return (
    <>
      {Object.entries(data).map(([sinkId, sink]) => (
        <div key={sinkId}>
          {/* Resource Name */}
          <div id="resource-name" className="list-group-item active">
            <h4 className="list-group-item-heading">{sink.name || "Unnamed Sink"}</h4>
          </div>

          {/* Sink Information */}
          <div className="list-group-item">
            <h4 className="list-group-item-heading">Information</h4>

            <div className="list-group-item-text item-margin">
              Name:{" "}
              <span id={`stackdriverlogging.sinks.${sinkId}.name`}>
                {sink.name || "None"}
              </span>
            </div>

            <div className="list-group-item-text item-margin">
              Filter:{" "}
              <span id={`stackdriverlogging.sinks.${sinkId}.filter`}>
                <code>{sink.filter || "None"}</code>
              </span>
            </div>

            <div className="list-group-item-text item-margin">
              Destination:{" "}
              <span id={`stackdriverlogging.sinks.${sinkId}.destination`}>
                <code>{sink.destination || "None"}</code>
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

// -------------------- VPC Flow Logs --------------------
export const VPCFlowLogs = ({ data }) => {
  if (!data) return null;

  return (
    <>
      {Object.entries(data).map(([region, regionData]) =>
        Object.entries(regionData.flow_logs || {}).map(([flowLogId, flowLog]) => (
          <div key={flowLogId}>
            {/* Resource Name */}
            <div id="resource-name" className="list-group-item active">
              <h4 className="list-group-item-heading">{flowLog.name || "Unnamed Flow Log"}</h4>
            </div>

            {/* Flow Log Information */}
            <div className="list-group-item">
              <h4 className="list-group-item-heading">Information</h4>

              <div className="list-group-item-text item-margin">
                Name:{" "}
                <span id={`vpc.regions.${region}.flow_logs.${flowLogId}.name`}>
                  <samp>{flowLog.name || "None"}</samp>
                </span>
              </div>

              <div className="list-group-item-text item-margin">
                Resource ID:{" "}
                <span id={`vpc.regions.${region}.flow_logs.${flowLogId}.resource_id`}>
                  <samp>{flowLog.resource_id || "None"}</samp>
                </span>
              </div>

              <div className="list-group-item-text item-margin">
                ARN:{" "}
                <span id={`vpc.regions.${region}.flow_logs.${flowLogId}.arn`}>
                  <samp>{flowLog.arn || "None"}</samp>
                </span>
              </div>

              <div className="list-group-item-text item-margin">
                Creation Time:{" "}
                <span id={`vpc.regions.${region}.flow_logs.${flowLogId}.creation_time`}>
                  <samp>
                    {flowLog.creation_time
                      ? new Date(flowLog.creation_time).toLocaleString()
                      : "None"}
                  </samp>
                </span>
              </div>

              <div className="list-group-item-text item-margin">
                Flow Log Status:{" "}
                <span id={`vpc.regions.${region}.flow_logs.${flowLogId}.flow_log_status`}>
                  <samp>{flowLog.flow_log_status || "None"}</samp>
                </span>
              </div>

              <div className="list-group-item-text item-margin">
                Deliver Logs Status:{" "}
                <span id={`vpc.regions.${region}.flow_logs.${flowLogId}.deliver_logs_status`}>
                  <samp>{flowLog.deliver_logs_status || "None"}</samp>
                </span>
              </div>

              <div className="list-group-item-text item-margin">
                Deliver Logs Error Message:{" "}
                <span
                  id={`vpc.regions.${region}.flow_logs.${flowLogId}.deliver_logs_error_message`}
                >
                  <samp>{flowLog.deliver_logs_error_message || "None"}</samp>
                </span>
              </div>

              <div className="list-group-item-text item-margin">
                Traffic Type:{" "}
                <span id={`vpc.regions.${region}.flow_logs.${flowLogId}.traffic_type`}>
                  <samp>{flowLog.traffic_type || "None"}</samp>
                </span>
              </div>

              <div className="list-group-item-text item-margin">
                Log Destination Type:{" "}
                <span id={`vpc.regions.${region}.flow_logs.${flowLogId}.log_destination_type`}>
                  <samp>{flowLog.log_destination_type || "None"}</samp>
                </span>
              </div>

              <div className="list-group-item-text item-margin">
                Log Destination:{" "}
                <span id={`vpc.regions.${region}.flow_logs.${flowLogId}.log_destination`}>
                  <samp>{flowLog.log_destination || "None"}</samp>
                </span>
              </div>

              <div className="list-group-item-text item-margin">
                Log Format:{" "}
                <span id={`vpc.regions.${region}.flow_logs.${flowLogId}.log_format`}>
                  <samp>{flowLog.log_format || "None"}</samp>
                </span>
              </div>

              <div className="list-group-item-text item-margin">
                Max Aggregation Interval:{" "}
                <span
                  id={`vpc.regions.${region}.flow_logs.${flowLogId}.max_aggregation_interval`}
                >
                  <samp>{flowLog.max_aggregation_interval || "None"}</samp>
                </span>
              </div>
            </div>

            {/* Tags */}
            {flowLog.tags && flowLog.tags.length > 0 && (
              <div className="list-group-item">
                <h4>Tags</h4>
                <ul>
                  {flowLog.tags.map((tag, i) => (
                    <li key={i} className="list-group-item-text">
                      <samp>{tag.Key}</samp>: <samp>{tag.Value}</samp>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
    </>
  );
};


// ---------- VPC Subnet ----------
export const VPCSubnet = ({ data }) => {
  if (!data) return null;

  return (
    <div className="list-group" style={{ marginBottom: "1rem" }}>
      {/* Regions */}
      {Object.entries(data).map(([regionKey, region]) => (
        <div key={regionKey} style={{ margin: "1rem" }}>
          <div className="list-group-item active">
            <h3>Region: {region.name ?? regionKey}</h3>
          </div>

          {/* VPCs */}
          {region.vpcs &&
            Object.entries(region.vpcs).map(([vpcId, vpc]) => (
              <div key={vpcId} style={{ margin: "1rem" }}>
                <div className="list-group-item active">
                  <h4>VPC: {vpc.name ?? vpcId}</h4>
                </div>

                {/* Subnets */}
                {vpc.subnets &&
                  Object.entries(vpc.subnets).map(([subnetId, subnet]) => (
                    <div key={subnetId} style={{ margin: "1rem" }}>
                      {/* Title */}
                      <div className="list-group-item active">
                        <h4>{subnet.name ?? subnet.id}</h4>
                      </div>

                      {/* Information */}
                      <div className="list-group-item">
                        <h4>Information</h4>
                        <div>Name: <samp>{subnet.name === subnet.id ? "None" : subnet.name}</samp></div>
                        <div>ID: <samp>{subnet.id}</samp></div>
                        <div>ARN: <samp>{subnet.arn}</samp></div>
                        <div>VPC ID: <samp>{subnet.VpcId}</samp></div>
                        <div>Availability Zone: <samp>{subnet.AvailabilityZone}</samp></div>
                        <div>CIDR Block: <samp>{subnet.CidrBlock}</samp></div>
                        <div>IPv6 CIDR Block: <samp>{subnet.CidrBlockv6 ?? "N/A"}</samp></div>
                        <div>Public IP on Launch: <samp>{subnet.MapPublicIpOnLaunch ? "Enabled" : "Disabled"}</samp></div>
                        <div>Available IP Addresses: <samp>{subnet.AvailableIpAddressCount ?? 0}</samp></div>
                      </div>

                      {/* Instances */}
                      <div className="list-group-item">
                        <h4>Instances</h4>
                        {subnet.instances?.length ? (
                          <ul>
                            {subnet.instances.map((inst, idx) => (
                              <li key={idx}>
                                ID: <samp>{inst.id}</samp> | Type: <samp>{inst.InstanceType}</samp> | State: <samp>{inst.State?.Name}</samp>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>0</p>
                        )}
                      </div>

                      {/* Flow Logs */}
                      <div className="list-group-item">
                        <h4>Flow Logs</h4>
                        {subnet.flow_logs?.length ? (
                          subnet.flow_logs.map((f, idx) => (
                            <div key={idx} style={{ marginBottom: "1rem" }}>
                              {/* <VPCFlowLog flowLog={f} /> */}
                            </div>
                          ))
                        ) : (
                          <p>0</p>
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


// ---------- VPC Peering Connection ----------
export const VPCInfo = ({ vpcInfo, vpcRole }) => {
  if (!vpcInfo) return null;
  return (
    <div className="list-group-item">
      <h4 className="list-group-item-heading">{vpcRole} VPC</h4>
      <ul>
        <li>Account ID: <samp>{vpcInfo.OwnerId}</samp></li>
        <li>VPC ID: <samp>{vpcInfo.VpcId}</samp></li>
        <li>CIDR: <samp>{vpcInfo.CidrBlock}</samp></li>
        {vpcInfo.PeeringOptions && (
          <li>
            Peering options:
            <ul>
              {Object.entries(vpcInfo.PeeringOptions).map(([k, v]) => (
                <li key={k}>{k}: {v ? "enabled" : "disabled"}</li>
              ))}
            </ul>
          </li>
        )}
      </ul>
    </div>
  );
};

export const VPCPeeringConnection = ({ connection }) => {
  if (!connection) return null;

  return (
    <div className="list-group">
      <div id="resource-name" className="list-group-item active">
        <h4 className="list-group-item-heading">{connection.name}</h4>
      </div>

      <div className="list-group-item">
        <div>Status: {connection.Status?.Message ?? "Unknown"}</div>
        <div>ARN: <samp>{connection.arn ?? "N/A"}</samp></div>
      </div>

      <VPCInfo vpcInfo={connection.RequesterVpcInfo} vpcRole="Requester" />
      <VPCInfo vpcInfo={connection.AccepterVpcInfo} vpcRole="Accepter" />

      {connection.Tags && (
        <div className="list-group-item">
          <h4>Tags</h4>
          <ul>
            {connection.Tags.map((tag, idx) => (
              <li key={idx}><samp>{tag.Key}</samp>: <samp>{tag.Value}</samp></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const VPCPeeringConnectionsList = ({ connections = {} }) => {
  const keys = Object.keys(connections);
  if (!keys.length) return <p>No VPC Peering Connections found.</p>;
  return (
    <div>
      {keys.map((key) => (
        <div key={key} style={{ marginBottom: "1rem" }}>
          <VPCPeeringConnection connection={connections[key]} />
        </div>
      ))}
    </div>
  );
};

export const CountBadge = ({ count }) => (
  <span style={{ marginLeft: "8px", fontSize: "0.9em" }} className="badge">
    {count}
  </span>
);

// Component for one VPC details
export const VPCDetails = ({ vpc, region }) => {
  if (!vpc) return null;

  const {
    id,
    name,
    arn,
    state,
    cidr_block,
    default: isDefault,
    network_acls = {},
    instances = [],
    flow_logs = [],
    peering_connections = [],
  } = vpc;

  return (
    <div style={{ marginBottom: "20px" }}>
      {/* Header */}
      <div id="resource-name" className="list-group-item active">
        <h4 className="list-group-item-heading">{name || id}</h4>
      </div>

      {/* Information */}
      <div className="list-group-item">
        <h4 className="list-group-item-heading">Information</h4>
        <div className="list-group-item-text">ID: <samp>{id}</samp></div>
        <div className="list-group-item-text">ARN: <samp>{arn}</samp></div>
        <div className="list-group-item-text">Region: <samp>{region}</samp></div>
        <div className="list-group-item-text">State: <samp>{state}</samp></div>
        <div className="list-group-item-text">CIDR Block: <samp>{cidr_block}</samp></div>
        <div className="list-group-item-text">Default: <samp>{String(isDefault)}</samp></div>
      </div>

      {/* Network ACLs */}
      <div className="list-group-item" style={{ paddingBottom: 0 }}>
        <div className="accordion">
          <h4 className="list-group-item-heading accordion-heading">
            Network ACLs
            <CountBadge count={Object.keys(network_acls).length} />
          </h4>
          <div className="accordion-body">
            <div className="accordion-inner">
              <ul className="no-bullet">
                {Object.keys(network_acls).map((aclId) => (
                  <li key={aclId}>
                    <a href={`#services.vpc.regions.${region}.vpcs.${id}.network_acls.${aclId}`}>
                      {aclId}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Instances */}
      <div className="list-group-item" style={{ paddingBottom: 0 }}>
        <div className="accordion">
          <h4 className="list-group-item-heading accordion-heading">
            Instances
            <CountBadge count={instances.length} />
          </h4>
          <div className="accordion-body">
            <ul>
              {instances.map((instance) => (
                <li key={instance.id} className="list-group-item-text">
                  <a href={`#services.ec2.regions.${region}.vpcs.${id}.instances.${instance.id}`}>
                    {instance.name || instance.id}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Flow Logs */}
      <div className="list-group-item">
        <h4 className="list-group-item-heading accordion-heading">
          Flow logs <CountBadge count={flow_logs.length} />
        </h4>
        <ul>
          {flow_logs.map((logId) => (
            <li key={logId}>
              <a href={`#services.vpc.regions.${region}.flow_logs.${logId}`}>{logId}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Peering Connections */}
      <div className="list-group-item" style={{ paddingBottom: 0 }}>
        <h4 className="list-group-item-heading accordion-heading">Peering Connections</h4>
        <ul>
          {peering_connections.map((pc) => (
            <li key={pc.id}>{pc.name || pc.id}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Wrapper that iterates through all regions and VPCs
export const VPCRegions = ({ data }) => {
  if (!data) return null;

  return (
    <div>
      {Object.entries(data).map(([regionName, regionData]) => (
        <div key={regionName} style={{ marginBottom: "40px" }}>
          <h3>{regionName}</h3>
          {regionData.vpcs &&
            Object.entries(regionData.vpcs).map(([vpcId, vpcData]) => (
              <VPCDetails key={vpcId} vpc={vpcData} region={regionName} />
            ))}
        </div>
      ))}
    </div>
  );
};


// ---------- VPC Network ACL ----------
export const VPCNetworkACL = ({ acl }) => {
  if (!acl) return null;

  return (
    <div className="list-group" style={{ marginBottom: "1rem" }}>
      {/* Title */}
      <div id="resource-name" className="list-group-item active">
        <h4>{acl.name ?? acl.id}</h4>
      </div>

      {/* Basic Info */}
      <div className="list-group-item">
        <h4>Information</h4>
        <div>ID: <samp>{acl.id}</samp></div>
        <div>ARN: <samp>{acl.arn}</samp></div>
        <div>Default: <samp>{acl.IsDefault?.toString()}</samp></div>
      </div>

      {/* Rules */}
      {acl.rules && Object.entries(acl.rules).map(([ruleType, rules]) => (
        <div key={ruleType} className="list-group-item">
          <h4>{ruleType} rules</h4>
          <table className="table-striped" width="100%">
            <thead>
              <tr>
                <th>Rule number</th>
                <th>Port</th>
                <th>Protocol</th>
                <th>IP address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(rules).map(([num, r]) => (
                <tr key={num}>
                  <td>{num}</td>
                  <td>{r.port_range}</td>
                  <td>{r.protocol}</td>
                  <td>{r.CidrBlock}</td>
                  <td>{r.RuleAction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {/* Associated Subnets */}
      <div className="list-group-item">
        <h4>Associated Subnets</h4>
        {acl.Associations?.length ? (
          <ul>
            {acl.Associations.map((sub, idx) => (
              <li key={idx}>{sub.SubnetId}</li>
            ))}
          </ul>
        ) : (
          !acl.IsDefault && (
            <span>
              ⚠️ This network ACL is not the default and is not associated with any subnet.
            </span>
          )
        )}
      </div>
    </div>
  );
};

// ---------- Recursive Network ACLs for Regions & VPCs ----------
export const VPCNetworkACLsList = ({ data }) => {
  if (!data) return <p>No Network ACLs found.</p>;

  return (
    <div>
      {Object.entries(data).map(([regionKey, region]) => (
        <div key={regionKey} style={{ margin: "1rem" }}>
          <div className="list-group-item active">
            <h3>Region: {region.name ?? regionKey}</h3>
          </div>

          {region.vpcs && Object.entries(region.vpcs).map(([vpcId, vpc]) => (
            <div key={vpcId} style={{ margin: "1rem" }}>
              <div className="list-group-item active">
                <h4>VPC: {vpc.name ?? vpcId}</h4>
              </div>

              {/* Network ACLs */}
              {vpc.network_acls && Object.keys(vpc.network_acls).length ? (
                Object.entries(vpc.network_acls).map(([aclId, acl]) => (
                  <VPCNetworkACL key={aclId} acl={acl} />
                ))
              ) : (
                <p>No Network ACLs found for this VPC.</p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};



