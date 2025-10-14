"use client";
import React, { useState } from "react";
import { Shield, Settings, Key, Network, HardDrive, ChevronDown, ChevronUp } from "lucide-react";

// ---------------- Generic GCP Region → Resource Details ----------------
export const GcpRegionResourceDetails = ({ serviceName, resourceType, items, partial: ResourceComponent }) => {
  if (!items || items.length === 0) return null;

  return (
    <div id={`services.${serviceName}.projects.id.regions.id.${resourceType}.details`}>
      {items.map((item, projectIndex) => {
        const projectId = Object.keys(item)[0]; // assuming items is an array of objects keyed by project
        const project = item[projectId];

        if (!project.regions) return null;

        return Object.entries(project.regions).map(([regionKey, regionData]) => {
          if (!regionData[resourceType]) return null;

          return Object.entries(regionData[resourceType]).map(([resourceKey, resource]) => (
            <div
              className="list-group"
              key={resourceKey}
              id={`services.${serviceName}.projects.${projectId}.regions.${regionKey}.${resourceType}.${resourceKey}.view`}
            >
              <ResourceComponent
                serviceName={serviceName}
                project={projectId}
                region={regionKey}
                resourceType={resourceType}
                resourceKey={resourceKey}
                resource={resource}
              />
            </div>
          ));
        });
      })}
    </div>
  );
};
  
  // ---------- Generic Details for GCP Zone ----------
export const DetailsForGCPZone = ({
    items = [],
    service_name,
    resource_type,
    partialsMap = {}
  }) => {
    if (!items.length) return null;
  
    return (
      <div id={`services.${service_name}.projects.id.zones.id.${resource_type}.details`}>
        {items.map((item, itemIdx) =>
          Object.entries(item.zones || {}).map(([zoneKey, zoneData]) =>
            Object.entries(zoneData[resource_type] || {}).map(([resourceKey, resource]) => {
              // Find the React component for the partial
              const PartialComponent = partialsMap[item.partial_name];
              if (!PartialComponent) {
                return (
                  <div
                    key={`${itemIdx}-${zoneKey}-${resourceKey}`}
                    className="list-group"
                  >
                    ⚠️ No React component registered for partial:{" "}
                    <strong>{item.partial_name}</strong>
                  </div>
                );
              }
  
              return (
                <div
                  className="list-group"
                  key={`${itemIdx}-${zoneKey}-${resourceKey}`}
                  id={`services.${service_name}.projects.${item.project_id || "id"}.zones.${zoneKey}.${resource_type}.${resourceKey}.view`}
                >
                  <PartialComponent
                    service_name={service_name}
                    project={item.project_id || "id"}
                    zone={zoneKey}
                    resource_type={resource_type}
                    resource_key={resourceKey}
                    resource={resource}
                  />
                </div>
              );
            })
          )
        )}
      </div>
    );
  };

// ---------- Generic Details for GCP Project ----------
export const DetailsForProject = ({
    items = [],
    service_name,
    resource_type,
    partialsMap = {}
  }) => {
    if (!items.length) return null;
  
    return (
      <div id={`services.${service_name}.projects.id.${resource_type}.details`}>
        {items.map((item, itemIdx) =>
          Object.entries(item[resource_type] || {}).map(([resourceKey, resource]) => {
            // Find the React component for the partial
            const PartialComponent = partialsMap[item.partial_name];
            if (!PartialComponent) {
              return (
                <div
                  key={`${itemIdx}-${resourceKey}`}
                  className="list-group"
                >
                  ⚠️ No React component registered for partial:{" "}
                  <strong>{item.partial_name}</strong>
                </div>
              );
            }
  
            return (
              <div
                className="list-group"
                key={`${itemIdx}-${resourceKey}`}
                id={`services.${service_name}.projects.${item.project_id || "id"}.${resource_type}.${resourceKey}.view`}
              >
                <PartialComponent
                  service_name={service_name}
                  project={item.project_id || "id"}
                  resource_type={resource_type}
                  resource_key={resourceKey}
                  resource={resource}
                />
              </div>
            );
          })
        )}
      </div>
    );
  };

// ---------- Generic Left Menu for GCP Region ----------
export const LeftMenuForGCPRegion = ({
    items = {},
    service_name,
    resource_type,
    metadata = {},
    service_group
  }) => {
    if (!items || Object.keys(items).length === 0) return null;
  
    // Safely get count from metadata like Handlebars helper getValueAt
    const getResourceCount = () => {
      try {
        return (
          metadata?.[service_group]?.[service_name]?.resources?.[resource_type]
            ?.count ?? 0
        );
      } catch {
        return 0;
      }
    };
  
    return (
      <div id={`services.${service_name}.projects.id.regions.id.${resource_type}.list`}>
        <div className="list-group">
          <div className="list-group-item">
            <a href={`#services.${service_name}.projects.id.regions.id.${resource_type}`}>
              Show all{" "}
              <span className="badge float-right btn-info">{getResourceCount()}</span>
            </a>
          </div>
        </div>
  
        {Object.entries(items).map(([projectKey, projectData]) => (
          <div
            className="list-group"
            key={projectKey}
            id={`services.${service_name}.projects.${projectKey}.regions.id.${resource_type}.list`}
          >
            {/* Project Header */}
            <div className="list-group-item active">
              <a
                href={`#services.${service_name}.projects.${projectKey}.regions.id.${resource_type}`}
              >
                {projectKey}
              </a>
              <span className="float-right">
                <a
                  href="javascript:void(0)"
                  onClick={() =>
                    document
                      .getElementById(
                        `services.${service_name}.projects.${projectKey}.regions.id.${resource_type}.list`
                      )
                      ?.remove()
                  }
                >
                  <i className="fa fa-times-circle"></i>
                </a>
              </span>
            </div>
  
            {/* Regions inside project */}
            <div>
              {Object.entries(projectData.regions || {}).map(
                ([regionKey, regionData]) => {
                  const regionHasCount =
                    regionData?.[`${resource_type}_count`] ?? 0;
  
                  if (!regionHasCount) return null;
  
                  return (
                    <div
                      className="list-group-item"
                      key={regionKey}
                      id={`services.${service_name}.projects.${projectKey}.regions.${regionKey}.${resource_type}.list`}
                    >
                      {/* Region link */}
                      {regionData.scout2_link ? (
                        <a href={`#${regionData.scout2_link}.view`}>{regionKey}</a>
                      ) : (
                        <a
                          href={`#services.${service_name}.projects.${projectKey}.regions.${regionKey}.${resource_type}`}
                        >
                          {regionKey}
                        </a>
                      )}
                      <span className="float-right">
                        <a
                          href="javascript:void(0)"
                          onClick={() =>
                            document
                              .getElementById(
                                `services.${service_name}.projects.${projectKey}.regions.${regionKey}.${resource_type}.list`
                              )
                              ?.remove()
                          }
                        >
                          <i className="fa fa-times-circle"></i>
                        </a>
                      </span>
  
                      {/* Resources under region */}
                      {(regionData[resource_type] &&
                        Object.entries(regionData[resource_type]).map(
                          ([resourceKey, resource]) => (
                            <div
                              className="list-group-item-text list-sub-element"
                              key={resourceKey}
                            >
                              <a
                                href={`#services.${service_name}.projects.${projectKey}.regions.${regionKey}.${resource_type}.${resourceKey}.view`}
                              >
                                {resource.name}
                              </a>
                            </div>
                          )
                        )) ||
                        null}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ---------- Generic Left Menu for GCP Zone ----------
export const LeftMenuForGCPZone = ({
    items = {},
    service_name,
    resource_type,
    metadata = {},
    service_group
  }) => {
    if (!items || Object.keys(items).length === 0) return null;
  
    // Mimic Handlebars helper getValueAt
    const getResourceCount = () => {
      try {
        return (
          metadata?.[service_group]?.[service_name]?.resources?.[resource_type]
            ?.count ?? 0
        );
      } catch {
        return 0;
      }
    };
  
    return (
      <div id={`services.${service_name}.projects.id.zones.id.${resource_type}.list`}>
        {/* Show All */}
        <div className="list-group">
          <div className="list-group-item">
            <a
              href={`#services.${service_name}.projects.id.zones.id.${resource_type}`}
            >
              Show all{" "}
              <span className="badge float-right btn-info">
                {getResourceCount()}
              </span>
            </a>
          </div>
        </div>
  
        {/* Projects */}
        {Object.entries(items).map(([projectKey, projectData]) => (
          <div
            className="list-group"
            key={projectKey}
            id={`services.${service_name}.projects.${projectKey}.zones.id.${resource_type}.list`}
          >
            {/* Project header */}
            <div className="list-group-item active">
              <a
                href={`#services.${service_name}.projects.${projectKey}.zones.id.${resource_type}`}
              >
                {projectKey}
              </a>
              <span className="float-right">
                <a
                  href="javascript:void(0)"
                  onClick={() =>
                    document
                      .getElementById(
                        `services.${service_name}.projects.${projectKey}.zones.id.${resource_type}.list`
                      )
                      ?.remove()
                  }
                >
                  <i className="fa fa-times-circle"></i>
                </a>
              </span>
            </div>
  
            {/* Zones under project */}
            <div>
              {Object.entries(projectData.zones || {}).map(
                ([zoneKey, zoneData]) => {
                  const zoneHasCount = zoneData?.[`${resource_type}_count`] ?? 0;
                  if (!zoneHasCount) return null;
  
                  return (
                    <div
                      className="list-group-item"
                      key={zoneKey}
                      id={`services.${service_name}.projects.${projectKey}.zones.${zoneKey}.${resource_type}.list`}
                    >
                      {/* Zone link */}
                      {zoneData.scout2_link ? (
                        <a href={`#${zoneData.scout2_link}.view`}>{zoneKey}</a>
                      ) : (
                        <a
                          href={`#services.${service_name}.projects.${projectKey}.zones.${zoneKey}.${resource_type}`}
                        >
                          {zoneKey}
                        </a>
                      )}
  
                      <span className="float-right">
                        <a
                          href="javascript:void(0)"
                          onClick={() =>
                            document
                              .getElementById(
                                `services.${service_name}.projects.${projectKey}.zones.${zoneKey}.${resource_type}.list`
                              )
                              ?.remove()
                          }
                        >
                          <i className="fa fa-times-circle"></i>
                        </a>
                      </span>
  
                      {/* Resources under this zone */}
                      {(zoneData[resource_type] &&
                        Object.entries(zoneData[resource_type]).map(
                          ([resourceKey, resource]) => (
                            <div
                              className="list-group-item-text list-sub-element"
                              key={resourceKey}
                            >
                              <a
                                href={`#services.${service_name}.projects.${projectKey}.zones.${zoneKey}.${resource_type}.${resourceKey}.view`}
                              >
                                {resource.name}
                              </a>
                            </div>
                          )
                        )) ||
                        null}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ---------- Left Menu for Project ----------
export const LeftMenuForProject = ({
    service_name,
    resource_type,
    service_group,
    items = [],
    metadata = {}
  }) => {
    // count lookup helper (replicates getValueAt 'metadata' ... )
    const getCount = () => {
      return (
        metadata?.[service_group]?.[service_name]?.resources?.[resource_type]
          ?.count ?? 0
      );
    };
  
    return (
      <div id={`services.${service_name}.projects.id.${resource_type}.list`}>
        <div className="list-group">
          <div className="list-group-item">
            <a
              href={`#services.${service_name}.projects.id.${resource_type}`}
            >
              Show all{" "}
              <span className="badge float-right btn-info">{getCount()}</span>
            </a>
          </div>
        </div>
  
        {Object.entries(items).map(([projectKey, projectResources]) => (
          <div
            className="list-group"
            key={projectKey}
            id={`services.${service_name}.projects.${projectKey}.${resource_type}.list`}
          >
            <div className="list-group-item active">
              <a
                href={`#services.${service_name}.projects.${projectKey}.${resource_type}`}
              >
                {projectKey}
              </a>
              <span className="float-right">
                <a
                  href={`javascript:hideList('services.${service_name}.projects.${projectKey}.${resource_type}.list')`}
                >
                  <i className="fa fa-times-circle"></i>
                </a>
              </span>
            </div>
  
            <div className="list-group-item">
              {Object.entries(projectResources[resource_type] || {}).map(
                ([resourceKey, resource]) => (
                  <div
                    key={resourceKey}
                    className="list-group-item list-sub-element"
                    id={`services.${service_name}.projects.${projectKey}.${resource_type}.${resourceKey}.link`}
                  >
                    {resource.scout2_link ? (
                      <a href={`#${resource.scout2_link}.view`}>
                        {resource.name}
                      </a>
                    ) : (
                      <a
                        href={`#services.${service_name}.projects.${projectKey}.${resource_type}.${resourceKey}.view`}
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

  // -------- BigQuery Dataset Component --------
  export const BigQueryDatasets = ({ data }) => {
    if (!data) return null;
  
    return (
      <div className="bigquery-datasets">
        {Object.entries(data).map(([projectId, projectData]) => {
          const datasets = projectData.datasets || {};
  
          return (
            <div key={projectId} className="project-box" style={{ marginBottom: "20px" }}>
            <div className="project-header bg-black text-white p-3 rounded border border-gray-800">
              <h3 className="text-lg font-semibold">Project: {projectId}</h3>
            </div>
  
            {Object.entries(datasets).map(([datasetId, dataset]) => (
              <div
                key={datasetId}
                className="dataset-box bg-gray-900 text-white p-4 mt-4 rounded border border-gray-800"
              >
                {/* Dataset Header */}
                <div className="list-group-item active bg-black border border-gray-800 rounded p-3 mb-3">
                  <h4 className="list-group-item-heading text-base font-semibold">
                    {dataset?.name || datasetId}
                  </h4>
                </div>

                {/* Information Section */}
                <div className="list-group-item bg-transparent">
                  <h4 className="list-group-item-heading text-base font-semibold mb-2">
                    Information
                  </h4>
                  <div className="list-group-item-text item-margin">Name: <span><samp>{dataset?.name || "None"}</samp></span></div>
                  <div className="list-group-item-text item-margin">Location: <span><samp>{dataset?.location || "None"}</samp></span></div>
                  <div className="list-group-item-text item-margin">Creation Time: <span><samp>{dataset?.creation_time ? new Date(dataset.creation_time).toLocaleString() : "None"}</samp></span></div>
                  <div className="list-group-item-text item-margin">Last Modified Time: <span><samp>{dataset?.last_modified_time ? new Date(dataset.last_modified_time).toLocaleString() : "None"}</samp></span></div>
                  <div className="list-group-item-text item-margin">Default Encryption Key: <span><samp>{dataset?.default_encryption_configuration || "None"}</samp></span></div>
                </div>

                {/* IAM Permissions Section */}
                <div className="list-group-item bg-transparent mt-4">
                  <h4 className="list-group-item-heading text-base font-semibold mb-2">
                    <span>IAM Permissions</span>
                  </h4>
                  {dataset?.bindings && Object.keys(dataset.bindings).length > 0 ? (
                    <ul className="ml-4 list-disc">
                      {Object.entries(dataset.bindings).map(([role, members]) => (
                        <li key={role} className="mb-1">
                          <span className="font-semibold"><samp>{role}</samp></span>
                          <ul className="ml-6 list-disc">
                            {members.map((m, idx) => (
                              <li key={idx}>
                                <samp>{m.type}:{m.member}</samp>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>
                      <samp>None</samp>
                    </div>
                  )}
                </div>
              </div>
            ))}
            </div>
          );
        })}
      </div>
    );
  };
  

export const CloudMemorystoreRedisInstances = ({ data }) => {
  if (!data) return null;

  return (
    <div className="cloud-memorystore-redis">
      {Object.entries(data).map(([projectId, projectData]) => {
        const redisInstances = projectData.redis_instances || {};

        return (
          <div key={projectId} className="project-box" style={{ marginBottom: "20px" }}>
            <div className="project-header bg-black text-white p-3 rounded border border-gray-800">
              <h3 className="text-lg font-semibold">Project: {projectId}</h3>
            </div>

            {Object.entries(redisInstances).map(([instanceId, instance]) => (
              <div
                key={instanceId}
                className="redis-instance-box bg-gray-900 text-white p-4 mt-4 rounded border border-gray-800"
              >
                {/* Instance Header */}
                <div className="list-group-item active bg-black border border-gray-800 rounded p-3 mb-3">
                  <h4 className="list-group-item-heading text-base font-semibold">
                    {instance?.name || instanceId}
                  </h4>
                </div>

                {/* Information Section */}
                <div className="list-group-item bg-transparent">
                  <h4 className="list-group-item-heading text-base font-semibold mb-2">
                    Information
                  </h4>
                  <div className="list-group-item-text item-margin">Location: <span>{instance?.location || "None"}</span></div>
                  <div className="list-group-item-text item-margin">Redis Version: <span>{instance?.redis_version || "None"}</span></div>
                  <div className="list-group-item-text item-margin">Transit Encryption Mode: <span>{instance?.ssl_required ? "Enabled" : "Disabled"}</span></div>
                  <div className="list-group-item-text item-margin">Auth Enabled: <span><samp>{instance?.auth_enabled ? "Enabled" : "Disabled"}</samp></span></div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};


// Utility to format date strings
const formatDate = (dateString) => {
  if (!dateString) return "None";
  const date = new Date(dateString);
  return date.toString();
};

export const CloudSQLInstances = ({ data }) => {
  if (!data) return null;

  return (
    <div className="cloud-sql-instances">
      {Object.entries(data).map(([projectId, projectData]) => {
        const instances = projectData.instances || {};

        return (
          <div key={projectId} className="project-box" style={{ marginBottom: "20px" }}>
            <div className="project-header bg-black text-white p-3 rounded border border-gray-800">
              <h3 className="text-lg font-semibold">Project: {projectId}</h3>
            </div>

            {Object.entries(instances).map(([instanceId, instance]) => (
              <div
                key={instanceId}
                className="instance-box bg-gray-900 text-white p-4 mt-4 rounded border border-gray-800"
              >
                {/* Instance Header */}
                <div className="list-group-item active bg-black border border-gray-800 rounded p-3 mb-3">
                  <h4 className="list-group-item-heading text-base font-semibold">
                    {instance?.name || instanceId}
                  </h4>
                </div>

                {/* Information Section */}
                <div className="list-group-item bg-transparent">
                  <h4 className="list-group-item-heading text-base font-semibold mb-2">
                    Information
                  </h4>
                  <div className="list-group-item-text item-margin">Project ID: <span><samp>{instance?.project_id || "None"}</samp></span></div>
                  <div className="list-group-item-text item-margin">Automatic Backups: <span>{instance?.automatic_backup_enabled ? "Enabled" : "Disabled"}</span></div>
                  <div className="list-group-item-text item-margin">Last Backup: <span>{instance?.last_backup_timestamp ? new Date(instance.last_backup_timestamp).toLocaleString() : "None"}</span></div>
                  <div className="list-group-item-text item-margin">Logs: <span>{instance?.log_enabled ? "Enabled" : "Disabled"}</span></div>
                  <div className="list-group-item-text item-margin">SSL Required: <span>{instance?.ssl_required ? "Enabled" : "Disabled"}</span></div>
                  <div className="list-group-item-text item-margin">Public IP Address: <span><samp>{instance?.public_ip || "None"}</samp></span></div>
                  <div className="list-group-item-text item-margin">Private IP Address: <span><samp>{instance?.private_ip || "None"}</samp></span></div>
                  <div className="list-group-item-text item-margin">Local Infile Flag is Off: <span><samp>{instance?.local_infile_off || "None"}</samp></span></div>
                  <div className="list-group-item-text item-margin">Cross db Ownership Chaining Flag is Off: <span><samp>{instance?.cross_db_ownership_chaining_off || "None"}</samp></span></div>
                  <div className="list-group-item-text item-margin">Contained Database Authentication Flag is Off: <span><samp>{instance?.contained_database_authentication_off || "None"}</samp></span></div>
                  <div className="list-group-item-text item-margin">Log Checkpoints Flag is On: <span><samp>{instance?.log_checkpoints_on || "None"}</samp></span></div>
                  <div className="list-group-item-text item-margin">Log Connections Flag is On: <span><samp>{instance?.log_connections_on || "None"}</samp></span></div>
                  <div className="list-group-item-text item-margin">Log Disconnections Flag is On: <span><samp>{instance?.log_disconnections_on || "None"}</samp></span></div>
                  <div className="list-group-item-text item-margin">Log Lock Waits Flag is On: <span><samp>{instance?.log_lock_waits_on || "None"}</samp></span></div>
                  <div className="list-group-item-text item-margin">Log Min Messages Flag set Appropriately: <span><samp>{instance?.log_min_messages || "None"}</samp></span></div>
                  <div className="list-group-item-text item-margin">Log Temp Files Flag set to 0: <span><samp>{instance?.log_temp_files_0 || "None"}</samp></span></div>
                  <div className="list-group-item-text item-margin">Log Min Duration Statement Flag set to -1: <span><samp>{instance?.log_min_duration_statement_-1 || "None"}</samp></span></div>

                  {/* Authorized Networks */}
                  {instance?.authorized_networks && instance.authorized_networks.length > 0 ? (
                    <>
                      <div className="list-group-item-text item-margin">Authorized Networks:</div>
                      <ul className="ml-4 list-disc">
                        {instance.authorized_networks.map((net, idx) => (
                          <li key={idx}><span>{net.value || "Unknown"}</span></li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <div className="list-group-item-text item-margin">Authorized Networks: <samp>None</samp></div>
                  )}

                  {/* Users */}
                  <div className="list-group-item-text item-margin">Users:</div>
                  <ul className="ml-4 list-disc">
                    {instance?.users && instance.users.length > 0 ? (
                      instance.users.map((user, idx) => (
                        <li key={idx}>
                          <span><samp>{user.name}</samp>{user.host ? ` (host: <samp>${user.host}</samp>)` : ""}</span>
                        </li>
                      ))
                    ) : (
                      <li><samp>None</samp></li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export const CloudStorageBuckets = ({ data }) => {
  if (!data) return null;

  return (
    <div className="cloud-storage-buckets">
      {Object.entries(data).map(([projectId, projectData]) => {
        const buckets = projectData.buckets || {};

        return (
          <div key={projectId} className="project-box" style={{ marginBottom: "20px" }}>
            <div className="project-header bg-black text-white p-3 rounded border border-gray-800">
              <h3 className="text-lg font-semibold">Project: {projectId}</h3>
            </div>

            {Object.entries(buckets).map(([bucketId, bucket]) => (
              <div
                key={bucketId}
                className="bucket-box bg-gray-900 text-white p-4 mt-4 rounded border border-gray-800"
              >
                {/* Bucket Header */}
                <div className="list-group-item active bg-black border border-gray-800 rounded p-3 mb-3">
                  <h4 className="list-group-item-heading text-base font-semibold">
                    {bucket?.name || bucketId}
                  </h4>
                </div>

                {/* Information Section */}
                <div className="list-group-item bg-transparent">
                  <h4 className="list-group-item-heading text-base font-semibold mb-2">
                    Information
                  </h4>
                  <div className="list-group-item-text item-margin">Project ID: <span><samp>{bucket?.project_id || "None"}</samp></span></div>
                  <div className="list-group-item-text item-margin">Creation Date: <span>{bucket?.creation_date ? new Date(bucket.creation_date).toLocaleString() : "None"}</span></div>
                  <div className="list-group-item-text item-margin">Location: <span><samp>{bucket?.location || "None"}</samp></span></div>
                  <div className="list-group-item-text item-margin">Storage Class: <span><samp>{bucket?.storage_class || "None"}</samp></span></div>
                  <div className="list-group-item-text item-margin">Logging: <span>{bucket?.logging_enabled ? "Enabled" : "Disabled"}</span></div>
                  <div className="list-group-item-text item-margin">Versioning: <span>{bucket?.versioning_enabled ? "Enabled" : "Disabled"}</span></div>
                  <div className="list-group-item-text item-margin">Public Access Prevention: <span>{bucket?.public_access_prevention || "None"}</span></div>
                  <div className="list-group-item-text item-margin">Uniform Bucket-Level Access: <span>{bucket?.uniform_bucket_level_access ? "Enabled" : "Disabled"}</span></div>
                </div>

                {/* IAM Permissions Section */}
                <div className="list-group-item bg-transparent mt-4">
                  <h4 className="list-group-item-heading text-base font-semibold mb-2">
                    <span>IAM Permissions</span>
                  </h4>
                  {bucket?.member_bindings && Object.keys(bucket.member_bindings).length > 0 ? (
                    <ul className="ml-4 list-disc">
                      {Object.entries(bucket.member_bindings).map(([member, roles]) => (
                        <li key={member} className="mb-1">
                          <span><samp>{member}</samp></span>
                          <ul className="ml-6 list-disc">
                            {roles.map((role, idx) => (
                              <li key={idx}>
                                <samp>{role}</samp>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>
                      <samp>None</samp>
                    </div>
                  )}
                </div>

                {/* ACL Permissions Section */}
                <div className="list-group-item bg-transparent mt-4">
                  <h4 className="list-group-item-heading text-base font-semibold mb-2">
                    <span>ACL Permissions</span>
                  </h4>
                  {bucket?.acls && bucket.acls.length > 0 ? (
                    <ul className="ml-4 list-disc">
                      {bucket.acls.map((acl, idx) => (
                        <li key={idx} className="mb-1">
                          <samp>{acl.entity}</samp>
                          <ul className="ml-6 list-disc">
                            <li>
                              <samp>{acl.role}</samp>
                            </li>
                          </ul>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>
                      <samp>None</samp>
                    </div>
                  )}
                </div>

                {/* Default Object ACL Permissions Section */}
                <div className="list-group-item bg-transparent mt-4">
                  <h4 className="list-group-item-heading text-base font-semibold mb-2">
                    <span>Default Object ACL Permissions</span>
                  </h4>
                  {bucket?.default_object_acl && Object.keys(bucket.default_object_acl).length > 0 ? (
                    <ul className="ml-4 list-disc">
                      {Object.entries(bucket.default_object_acl).map(([key, objAcl]) => (
                        <li key={key} className="mb-1">
                          <span><samp>{objAcl.entity}</samp></span>
                          <ul className="ml-6 list-disc">
                            <li>
                              <samp>{objAcl.role}</samp>
                            </li>
                          </ul>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>
                      <samp>None</samp>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
  
  // ---------------- Firewalls ----------------
  export const ComputeEngineFirewalls = ({ data }) => {
    if (!data) return null;
  
    return (
      <div className="compute-engine-firewalls">
        {Object.entries(data).map(([projectId, projectData]) => {
          const firewalls = projectData.firewalls || {};
  
          return (
            <div key={projectId} className="project-box" style={{ marginBottom: "20px" }}>
              <div className="project-header bg-black text-white p-3 rounded border border-gray-800">
                <h3 className="text-lg font-semibold">Project: {projectId}</h3>
              </div>
  
              {Object.entries(firewalls).map(([firewallId, fw]) => (
                <div
                  key={firewallId}
                  className="firewall-box bg-gray-900 text-white p-4 mt-4 rounded border border-gray-800"
                >
                  {/* Firewall Header */}
                  <div className="list-group-item active bg-black border border-gray-800 rounded p-3 mb-3">
                    <h4 className="list-group-item-heading text-base font-semibold">
                      {fw?.name || firewallId}
                    </h4>
                  </div>

                  {/* Information Section */}
                  <div className="list-group-item bg-transparent">
                    <h4 className="list-group-item-heading text-base font-semibold mb-2">
                      Information
                    </h4>
                    <div className="list-group-item-text item-margin">Firewall name: <span>{fw?.name || "None"}</span></div>
                    <div className="list-group-item-text item-margin">Project ID: <span><samp>{fw?.project_id || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Description: <span><samp>{fw?.description || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Disabled: <span><samp>{fw?.disabled ? "Yes" : "No"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Network: <span>{fw?.network || "None"}</span></div>
                    <div className="list-group-item-text item-margin">Creation Date: <span>{fw?.creation_timestamp ? new Date(fw.creation_timestamp).toLocaleString() : "None"}</span></div>
                    <div className="list-group-item-text item-margin">Priority: <span><samp>{fw?.priority || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Logs: <span><samp>{fw?.logs ? "Enabled" : "Disabled"}</samp></span></div>
                  </div>

                  {/* Configuration Section */}
                  <div className="list-group-item bg-transparent mt-4">
                    <h4 className="list-group-item-heading text-base font-semibold mb-2">
                      Configuration
                    </h4>
                    <div className="list-group-item-text item-margin">Direction: <span><samp>{fw?.direction || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Action: <span><samp>{fw?.action || "None"}</samp></span></div>

                    {/* Source Ranges */}
                    {fw?.source_ranges && fw.source_ranges.length > 0 ? (
                      <>
                        <div className="list-group-item-text item-margin">Source Ranges:</div>
                        <ul className="ml-4 list-disc">
                          {fw.source_ranges.map((range, idx) => (
                            <li key={idx}><samp>{range}</samp></li>
                          ))}
                        </ul>
                      </>
                    ) : null}

                    {/* Destination Ranges */}
                    {fw?.destination_ranges && fw.destination_ranges.length > 0 ? (
                      <>
                        <div className="list-group-item-text item-margin">Destination Ranges:</div>
                        <ul className="ml-4 list-disc">
                          {fw.destination_ranges.map((range, idx) => (
                            <li key={idx}><samp>{range}</samp></li>
                          ))}
                        </ul>
                      </>
                    ) : null}

                    {/* Source Tags */}
                    {fw?.source_tags && fw.source_tags.length > 0 ? (
                      <>
                        <div className="list-group-item-text item-margin">Source Tags:</div>
                        <ul className="ml-4 list-disc">
                          {fw.source_tags.map((tag, idx) => (
                            <li key={idx}><samp>{tag}</samp></li>
                          ))}
                        </ul>
                      </>
                    ) : null}

                    {/* Target Tags */}
                    {fw?.target_tags && fw.target_tags.length > 0 ? (
                      <>
                        <div className="list-group-item-text item-margin">Target Tags:</div>
                        <ul className="ml-4 list-disc">
                          {fw.target_tags.map((tag, idx) => (
                            <li key={idx}><samp>{tag}</samp></li>
                          ))}
                        </ul>
                      </>
                    ) : null}
                  </div>

                  {/* Allowed or Denied Traffic Section */}
                  <div className="list-group-item bg-transparent mt-4">
                    <h4 className="list-group-item-heading text-base font-semibold mb-2">
                      <span>{fw?.action === "allowed" ? "Allowed Traffic" : "Denied Traffic"}</span>
                    </h4>
                    {fw?.action === "allowed" ? (
                      fw?.allowed_traffic && Object.keys(fw.allowed_traffic).length > 0 ? (
                        <ul className="ml-4 list-disc">
                          {Object.entries(fw.allowed_traffic).map(([protocol, ports]) => (
                            <li key={protocol} className="mb-1">
                              <samp>{protocol}</samp>
                              <ul className="ml-6 list-disc">
                                {ports && ports.length > 0 ? (
                                  ports.map((port, idx) => (
                                    <li key={idx}><samp>{port}</samp></li>
                                  ))
                                ) : (
                                  <li><samp>None</samp></li>
                                )}
                              </ul>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div><samp>None</samp></div>
                      )
                    ) : (
                      fw?.denied_traffic && Object.keys(fw.denied_traffic).length > 0 ? (
                        <ul className="ml-4 list-disc">
                          {Object.entries(fw.denied_traffic).map(([protocol, ports]) => (
                            <li key={protocol} className="mb-1">
                              <samp>{protocol}</samp>
                              <ul className="ml-6 list-disc">
                                {ports && ports.length > 0 ? (
                                  ports.map((port, idx) => (
                                    <li key={idx}><samp>{port}</samp></li>
                                  ))
                                ) : (
                                  <li><samp>None</samp></li>
                                )}
                              </ul>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div><samp>None</samp></div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };  
  
  // ---------------- Global Forwarding Rules ----------------
  export const ComputeEngineGlobalForwardingRules = ({ data }) => {
    if (!data) return null;
  
    return (
      <div className="compute-engine-global-forwarding-rules">
        {Object.entries(data).map(([projectId, projectData]) => {
          const forwardingRules = projectData.global_forwarding_rules || {};
  
          return (
            <div key={projectId} className="project-box" style={{ marginBottom: "20px" }}>
              <div className="project-header bg-black text-white p-3 rounded border border-gray-800">
                <h3 className="text-lg font-semibold">Project: {projectId}</h3>
              </div>
  
              {Object.entries(forwardingRules).map(([ruleId, rule]) => (
                <div
                  key={ruleId}
                  className="forwarding-rule-box bg-gray-900 text-white p-4 mt-4 rounded border border-gray-800"
                >
                  {/* Rule Header */}
                  <div className="list-group-item active bg-black border border-gray-800 rounded p-3 mb-3">
                    <h4 className="list-group-item-heading text-base font-semibold">
                      {rule?.name || ruleId}
                    </h4>
                  </div>

                  {/* Information Section */}
                  <div className="list-group-item bg-transparent">
                    <h4 className="list-group-item-heading text-base font-semibold mb-2">
                      Information
                    </h4>
                    <div className="list-group-item-text item-margin">ID: <span><samp>{rule?.id || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Name: <span><samp>{rule?.name || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Creation Timestamp: <span><samp>{rule?.creation_timestamp ? new Date(rule.creation_timestamp).toLocaleString() : "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Description: <span><samp>{rule?.description || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Network: <span><samp>{rule?.network || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Subnetwork: <span><samp>{rule?.subnetwork || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">IP Address: <span><samp>{rule?.ip_address || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">IP Protocol: <span><samp>{rule?.ip_protocol || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">IP Version: <span><samp>{rule?.ipVersion || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Allow Global Access: <span><samp>{rule?.allowGlobalAccess || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">All Ports: <span><samp>{rule?.allPorts || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Port Range: <span><samp>{rule?.port_range || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Ports: <span><samp>{rule?.ports || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Target: <span><samp>{rule?.target || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Load Balancing Scheme: <span><samp>{rule?.load_balancing_scheme || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Network Tier: <span><samp>{rule?.network_tier || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Backend Service: <span><samp>{rule?.backendService || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Service Name: <span><samp>{rule?.serviceName || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Service Label: <span><samp>{rule?.serviceLabel || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Labels: <span><samp>{rule?.labels ? JSON.stringify(rule.labels) : "None"}</samp></span></div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };  
  
  // ---------------- Networks ----------------
  export const ComputeEngineNetworks = ({ data }) => {
    if (!data) return null;
  
    return (
      <div className="compute-engine-networks">
        {Object.entries(data).map(([projectId, projectData]) => {
          const networks = projectData.networks || {};
  
          return (
            <div key={projectId} className="project-box" style={{ marginBottom: "20px" }}>
              <div className="project-header bg-black text-white p-3 rounded border border-gray-800">
                <h3 className="text-lg font-semibold">Project: {projectId}</h3>
              </div>
  
              {Object.entries(networks).map(([networkId, network]) => (
                <div
                  key={networkId}
                  className="network-box bg-gray-900 text-white p-4 mt-4 rounded border border-gray-800"
                >
                  {/* Network Header */}
                  <div className="list-group-item active bg-black border border-gray-800 rounded p-3 mb-3">
                    <h4 className="list-group-item-heading text-base font-semibold">
                      {network?.name || networkId}
                    </h4>
                  </div>

                  {/* Information Section */}
                  <div className="list-group-item bg-transparent">
                    <h4 className="list-group-item-heading text-base font-semibold mb-2">
                      Information
                    </h4>
                    <div className="list-group-item-text item-margin">Name: <span>{network?.name || "None"}</span></div>
                    <div className="list-group-item-text item-margin">ID: <span>{network?.id || "None"}</span></div>
                    <div className="list-group-item-text item-margin">Project ID: <span>{network?.project_id || projectId}</span></div>
                    <div className="list-group-item-text item-margin">Description: <span><samp>{network?.description || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Creation Date: <span>{network?.creation_timestamp ? new Date(network.creation_timestamp).toLocaleString() : "None"}</span></div>
                    <div className="list-group-item-text item-margin">Legacy Mode: <span>{network?.legacy_mode ? "Yes" : "No"}</span></div>
                  </div>

                  {/* Firewall Rules Section */}
                  <div className="list-group-item bg-transparent mt-4">
                    <h4 className="list-group-item-heading text-base font-semibold mb-2">
                      Firewall Rules
                    </h4>
                    {network?.firewalls && network.firewalls.length > 0 ? (
                      <ul className="ml-4 list-disc">
                        {network.firewalls.map((fw, idx) => (
                          <li key={idx}>{fw}</li>
                        ))}
                      </ul>
                    ) : (
                      <div><samp>None</samp></div>
                    )}
                  </div>

                  {/* Compute Engine Instances Section */}
                  <div className="list-group-item bg-transparent mt-4">
                    <h4 className="list-group-item-heading text-base font-semibold mb-2">
                      Compute Engine Instances
                    </h4>
                    {network?.instances && network.instances.length > 0 ? (
                      <ul className="ml-4 list-disc">
                        {network.instances.map((instance, idx) => (
                          <li key={idx}>
                            Zone: {instance.instance_zone}, ID: {instance.instance_id}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div><samp>None</samp></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };  
  
  // ---------------- Regional Forwarding Rules ----------------
  export const ComputeEngineForwardingRules = ({ data }) => {
    if (!data) return null;
  
    return (
      <div className="compute-engine-forwarding-rules">
        {Object.entries(data).map(([projectId, projectData]) => {
          const regions = projectData.regions || {};
  
          return (
            <div key={projectId} className="project-box" style={{ marginBottom: '20px' }}>
              <div className="project-header bg-black text-white p-3 rounded border border-gray-800">
                <h3 className="text-lg font-semibold">Project: {projectId}</h3>
              </div>
  
              {Object.entries(regions).map(([regionId, regionData]) => {
                const forwardingRules = regionData.forwarding_rules || {};
  
                return (
                  <div key={regionId} className="region-box" style={{ marginTop: '15px' }}>
                    <div className="region-header bg-gray-800 text-white p-2 rounded border border-gray-700 mb-3">
                      <h4 className="text-base font-semibold">{regionId}</h4>
                    </div>
  
                    {Object.entries(forwardingRules).map(([ruleId, rule]) => (
                      <div
                        key={ruleId}
                        className="forwarding-rule-box bg-gray-900 text-white p-4 mt-4 rounded border border-gray-800"
                      >
                        {/* Rule Header */}
                        <div className="list-group-item active bg-black border border-gray-800 rounded p-3 mb-3">
                          <h4 className="list-group-item-heading text-base font-semibold">
                            {rule?.name || ruleId}
                          </h4>
                        </div>

                        {/* Information Section */}
                        <div className="list-group-item bg-transparent">
                          <h4 className="list-group-item-heading text-base font-semibold mb-2">
                            Information
                          </h4>
                          <div className="list-group-item-text item-margin">ID: <span><samp>{rule?.id || "None"}</samp></span></div>
                          <div className="list-group-item-text item-margin">Name: <span><samp>{rule?.name || "None"}</samp></span></div>
                          <div className="list-group-item-text item-margin">Creation Timestamp: <span><samp>{rule?.creation_timestamp ? new Date(rule.creation_timestamp).toLocaleString() : "None"}</samp></span></div>
                          <div className="list-group-item-text item-margin">Description: <span><samp>{rule?.description || "None"}</samp></span></div>
                          <div className="list-group-item-text item-margin">Region: <span><samp>{rule?.region || regionId}</samp></span></div>
                          <div className="list-group-item-text item-margin">Network: <span><samp>{rule?.network || "None"}</samp></span></div>
                          <div className="list-group-item-text item-margin">Subnetwork: <span><samp>{rule?.subnetwork || "None"}</samp></span></div>
                          <div className="list-group-item-text item-margin">IP Address: <span><samp>{rule?.ip_address || "None"}</samp></span></div>
                          <div className="list-group-item-text item-margin">IP Protocol: <span><samp>{rule?.ip_protocol || "None"}</samp></span></div>
                          <div className="list-group-item-text item-margin">IP Version: <span><samp>{rule?.ipVersion || "None"}</samp></span></div>
                          <div className="list-group-item-text item-margin">Allow Global Access: <span><samp>{rule?.allowGlobalAccess || "None"}</samp></span></div>
                          <div className="list-group-item-text item-margin">All Ports: <span><samp>{rule?.allPorts || "None"}</samp></span></div>
                          <div className="list-group-item-text item-margin">Port Range: <span><samp>{rule?.port_range || "None"}</samp></span></div>
                          <div className="list-group-item-text item-margin">Ports: <span><samp>{rule?.ports || "None"}</samp></span></div>
                          <div className="list-group-item-text item-margin">Target: <span><samp>{rule?.target || "None"}</samp></span></div>
                          <div className="list-group-item-text item-margin">Load Balancing Scheme: <span><samp>{rule?.load_balancing_scheme || "None"}</samp></span></div>
                          <div className="list-group-item-text item-margin">Network Tier: <span><samp>{rule?.network_tier || "None"}</samp></span></div>
                          <div className="list-group-item-text item-margin">Backend Service: <span><samp>{rule?.backendService || "None"}</samp></span></div>
                          <div className="list-group-item-text item-margin">Service Name: <span><samp>{rule?.serviceName || "None"}</samp></span></div>
                          <div className="list-group-item-text item-margin">Service Label: <span><samp>{rule?.serviceLabel || "None"}</samp></span></div>
                          <div className="list-group-item-text item-margin">Labels: <span><samp>{rule?.labels || "None"}</samp></span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };  
  
  // ---------------- Subnetworks ----------------
  export const ComputeEngineSubnetworks = ({ data }) => {
    if (!data) return null;
  
    return (
      <div className="compute-engine-subnetworks">
        {Object.entries(data).map(([projectId, projectData]) => {
          const regions = projectData.regions || {};
  
          return (
            <div key={projectId} className="project-box" style={{ marginBottom: '20px' }}>
              <div className="project-header bg-black text-white p-3 rounded border border-gray-800">
                <h3 className="text-lg font-semibold">Project: {projectId}</h3>
              </div>
  
              {Object.entries(regions).map(([regionId, regionData]) => {
                const subnetworks = regionData.subnetworks || {};
  
                return (
                  <div key={regionId} className="region-box" style={{ marginTop: '15px' }}>
                    <div className="region-header bg-gray-800 text-white p-2 rounded border border-gray-700 mb-3">
                      <h4 className="text-base font-semibold">{regionId}</h4>
                    </div>
  
                    {Object.entries(subnetworks).map(([subnetId, subnet]) => (
                      <div
                        key={subnetId}
                        className="subnetwork-box bg-gray-900 text-white p-4 mt-4 rounded border border-gray-800"
                      >
                        {/* Subnetwork Header */}
                        <div className="list-group-item active bg-black border border-gray-800 rounded p-3 mb-3">
                          <h4 className="list-group-item-heading text-base font-semibold">
                            {subnet?.name || subnetId}
                          </h4>
                        </div>

                        {/* Information Section */}
                        <div className="list-group-item bg-transparent">
                          <h4 className="list-group-item-heading text-base font-semibold mb-2">
                            Information
                          </h4>
                          <div className="list-group-item-text item-margin">Name: <span>{subnet?.name || "None"}</span></div>
                          <div className="list-group-item-text item-margin">ID: <span>{subnet?.id || "None"}</span></div>
                          <div className="list-group-item-text item-margin">Project ID: <span>{subnet?.project_id || projectId}</span></div>
                          <div className="list-group-item-text item-margin">Region: <span><samp>{subnet?.region || regionId}</samp></span></div>
                          <div className="list-group-item-text item-margin">Creation Date: <span>{subnet?.creation_timestamp ? new Date(subnet.creation_timestamp).toLocaleString() : "None"}</span></div>
                          <div className="list-group-item-text item-margin">IP Range: <span><samp>{subnet?.ip_range || "None"}</samp></span></div>
                          <div className="list-group-item-text item-margin">Gateway Address: <span><samp>{subnet?.gateway_address || "None"}</samp></span></div>
                          <div className="list-group-item-text item-margin">Private Google Access: <span>{subnet?.private_ip_google_access !== undefined ? (subnet.private_ip_google_access ? "Enabled" : "Disabled") : "Unknown"}</span></div>
                          <div className="list-group-item-text item-margin">VPC Flow Logs: <span>{subnet?.flowlogs_enabled !== undefined ? subnet.flowlogs_enabled.toString() : "None"}</span></div>
                        </div>

                        {/* Compute Engine Instances Section */}
                        <div className="list-group-item bg-transparent mt-4">
                          <h4 className="list-group-item-heading text-base font-semibold mb-2">
                            Compute Engine Instances
                          </h4>
                          {subnet?.instances && subnet.instances.length > 0 ? (
                            <ul className="ml-4 list-disc">
                              {subnet.instances.map((inst) => (
                                <li key={inst.instance_id}>
                                  <a
                                    href="#"
                                    onClick={() =>
                                      console.log(
                                        `Show instance ${inst.instance_id} in zone ${inst.instance_zone}`
                                      )
                                    }
                                    className="text-blue-400 hover:text-blue-300"
                                  >
                                    {inst.name || inst.instance_id}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div><samp>None</samp></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };
  
  
  // ---------------- Snapshots ----------------
  export const ComputeEngineSnapshots = ({ data }) => {
    if (!data) return null;
  
    return (
      <div className="compute-engine-snapshots">
        {Object.entries(data).map(([projectId, projectData]) => {
          const snapshots = projectData.snapshots || {};
  
          return (
            <div key={projectId} className="project-box" style={{ marginBottom: '20px' }}>
              <div className="project-header bg-black text-white p-3 rounded border border-gray-800">
                <h3 className="text-lg font-semibold">Project: {projectId}</h3>
              </div>
  
              {Object.entries(snapshots).map(([snapshotId, snapshot]) => (
                <div
                  key={snapshotId}
                  className="snapshot-box bg-gray-900 text-white p-4 mt-4 rounded border border-gray-800"
                >
                  {/* Snapshot Header */}
                  <div className="list-group-item active bg-black border border-gray-800 rounded p-3 mb-3">
                    <h4 className="list-group-item-heading text-base font-semibold">
                      {snapshot?.name || snapshotId}
                    </h4>
                  </div>

                  {/* Information Section */}
                  <div className="list-group-item bg-transparent">
                    <h4 className="list-group-item-heading text-base font-semibold mb-2">
                      Information
                    </h4>
                    <div className="list-group-item-text item-margin">Name: <span>{snapshot?.name || "None"}</span></div>
                    <div className="list-group-item-text item-margin">Project ID: <span><samp>{snapshot?.project || projectId}</samp></span></div>
                    <div className="list-group-item-text item-margin">Description: <span><samp>{snapshot?.description || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Creation Date: <span>{snapshot?.creation_timestamp ? new Date(snapshot.creation_timestamp).toLocaleString() : "None"}</span></div>
                    <div className="list-group-item-text item-margin">Status: <span>{snapshot?.status || "Unknown"}</span></div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };
  
  
  // ---------------- Instances ----------------
  export const ComputeEngineInstances = ({ data }) => {
    if (!data) return null;
  
    return (
      <div className="compute-engine-instances">
        {Object.entries(data).map(([projectId, projectData]) => {
          const zones = projectData.zones || {};
  
          return (
            <div key={projectId} className="project-box" style={{ marginBottom: '20px' }}>
              <div className="project-header bg-black text-white p-3 rounded border border-gray-800">
                <h3 className="text-lg font-semibold">Project: {projectId}</h3>
              </div>
  
              {Object.entries(zones).map(([zoneId, zoneData]) => {
                const instances = zoneData.instances || {};
                return (
                  <div key={zoneId} className="zone-box" style={{ marginTop: '15px' }}>
                    <div className="zone-header bg-gray-800 text-white p-2 rounded border border-gray-700 mb-3">
                      <h4 className="text-base font-semibold">Zone: {zoneId}</h4>
                    </div>
  
                    {Object.entries(instances).map(([instanceId, instance]) => (
                      <div
                        key={instanceId}
                        className="instance-box bg-gray-900 text-white p-4 mt-4 rounded border border-gray-800"
                      >
                        {/* Instance Header */}
                        <div className="list-group-item active bg-black border border-gray-800 rounded p-3 mb-3">
                          <h4 className="list-group-item-heading text-base font-semibold">
                            {instance?.name || instanceId}
                          </h4>
                        </div>

                        {/* Information Section */}
                        <div className="list-group-item bg-transparent">
                          <h4 className="list-group-item-heading text-base font-semibold mb-2">
                            Information
                          </h4>
                          <div className="list-group-item-text item-margin">Instance Name: <span>{instance?.name || "None"}</span></div>
                          <div className="list-group-item-text item-margin">Project ID: <span>{instance?.project_id || "None"}</span></div>
                          <div className="list-group-item-text item-margin">Description: <span><samp>{instance?.description || "None"}</samp></span></div>
                          <div className="list-group-item-text item-margin">Creation Date: <span>{instance?.creation_timestamp ? new Date(instance.creation_timestamp).toLocaleString() : "None"}</span></div>
                          <div className="list-group-item-text item-margin">Status: <span>{instance?.status || "None"}</span></div>
                          <div className="list-group-item-text item-margin">Deletion Protection: <span>{instance?.deletion_protection_enabled ? "Enabled" : "Disabled"}</span></div>
                          <div className="list-group-item-text item-margin">Block Project SSH Keys: <span>{instance?.block_project_ssh_keys_enabled ? "Enabled" : "Disabled"}</span></div>
                          <div className="list-group-item-text item-margin">IP Forwarding: <span>{instance?.ip_forwarding_enabled ? "Enabled" : "Disabled"}</span></div>
                          <div className="list-group-item-text item-margin">OS Login: <span>{instance?.oslogin_enabled ? "Enabled" : "Disabled"}</span></div>
                          <div className="list-group-item-text item-margin">Serial Port Connection: <span>{instance?.serial_port_enabled ? "Enabled" : "Disabled"}</span></div>
                          <div className="list-group-item-text item-margin">Public IP Addresses: <span>{instance?.public_ip_addresses ? "Yes" : "No"}</span></div>
                          <div className="list-group-item-text item-margin">Shielded VM: <span>{instance?.shielded_enable ? "Enabled" : "Disabled"}</span></div>

                          {/* Tags */}
                          {instance?.tags && Object.keys(instance.tags).length > 0 ? (
                            <>
                              <div className="list-group-item-text item-margin">Tags:</div>
                              <ul className="ml-4 list-disc">
                                {Object.entries(instance.tags).map(([tagKey, tagValues]) => (
                                  <li key={tagKey} className="mb-1">
                                    <samp>{tagKey}</samp>
                                    <ul className="ml-6 list-disc">
                                      {tagValues && tagValues.length > 0 ? (
                                        tagValues.map((val, i) => (
                                          <li key={i}><samp>{val}</samp></li>
                                        ))
                                      ) : (
                                        <li><samp>None</samp></li>
                                      )}
                                    </ul>
                                  </li>
                                ))}
                              </ul>
                            </>
                          ) : (
                            <div className="list-group-item-text item-margin">Tags: <samp>None</samp></div>
                          )}
                        </div>

                        {/* Network Interfaces Section */}
                        <div className="list-group-item bg-transparent mt-4">
                          <h5 className="list-group-item-heading text-base font-semibold mb-2">
                            Network Interfaces
                          </h5>
                          {instance?.network_interfaces && instance.network_interfaces.length > 0 ? (
                            <ul className="ml-4 list-disc">
                              {instance.network_interfaces.map((ni, idx) => (
                                <li key={idx} className="mb-1">
                                  <samp>{ni.name}</samp>
                                  <ul className="ml-6 list-disc">
                                    <li>IP: <samp>{ni.networkIP || "None"}</samp></li>
                                    <li>Network: <span>{ni.network_id || "None"}</span></li>
                                    <li>Subnetwork: <span>{ni.subnetwork_id || "None"}</span></li>
                                  </ul>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div><samp>None</samp></div>
                          )}
                        </div>

                        {/* Identity & API Access Section */}
                        <div className="list-group-item bg-transparent mt-4">
                          <h5 className="list-group-item-heading text-base font-semibold mb-2">
                            <span>Identity & API Access</span>
                          </h5>
                          <div className="list-group-item-text item-margin">Service Account: <span><samp>{instance?.service_account || "None"}</samp></span></div>
                          <div className="list-group-item-text item-margin">Access Scopes:</div>
                          {instance?.access_scopes && instance.access_scopes.length > 0 ? (
                            <ul className="ml-4 list-disc">
                              {instance.access_scopes.map((scope, i) => (
                                <li key={i}><samp>{scope}</samp></li>
                              ))}
                            </ul>
                          ) : (
                            <div><samp>None</samp></div>
                          )}
                          <div className="list-group-item-text item-margin">Default Service Account with Full Access to All Cloud APIs: <span><samp>{instance?.full_access_apis ? "Enabled" : "Disabled"}</samp></span></div>
                        </div>

                        {/* Disks Section */}
                        <div className="list-group-item bg-transparent mt-4">
                          <h5 className="list-group-item-heading text-base font-semibold mb-2">
                            Disks
                          </h5>
                          {instance?.disks && instance.disks.length > 0 ? (
                            <ul className="ml-4 list-disc">
                              {instance.disks.map((disk, i) => (
                                <li key={i} className="mb-1">
                                  <samp>{disk.source_device_name || "Unknown"}</samp>
                                  <ul className="ml-6 list-disc">
                                    <li>Bootable: <samp>{disk.bootable ? "Yes" : "No"}</samp></li>
                                    <li>Type: <samp>{disk.type || "None"}</samp></li>
                                    <li>Mode: <samp>{disk.mode || "None"}</samp></li>
                                    <li>Latest snapshot: <samp>{disk.latest_snapshot?.creation_timestamp || "None"}</samp></li>
                                    <li>Customer Supplied Encryption: <span>{disk.encrypted_with_csek ? "Enabled" : "Disabled"}</span></li>
                                  </ul>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div><samp>None</samp></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };
  

  // Single DNS Managed Zone Component
  export const CloudDNSManagedZones = ({ data }) => {
    if (!data) return null;
  
    return (
      <div className="cloud-dns-managed-zones">
        {Object.entries(data).map(([projectId, projectData]) => {
          const zones = projectData.managed_zones || {};
  
          return (
            <div key={projectId} className="project-box" style={{ marginBottom: '20px' }}>
              <div className="project-header bg-black text-white p-3 rounded border border-gray-800">
                <h3 className="text-lg font-semibold">Project: {projectId}</h3>
              </div>
  
              {Object.entries(zones).map(([zoneId, zone]) => (
                <div
                  key={zoneId}
                  className="zone-box bg-gray-900 text-white p-4 mt-4 rounded border border-gray-800"
                >
                  {/* Zone Header */}
                  <div className="list-group-item active bg-black border border-gray-800 rounded p-3 mb-3">
                    <h4 className="list-group-item-heading text-base font-semibold">
                      {zone?.name || zoneId}
                    </h4>
                  </div>

                  {/* Information Section */}
                  <div className="list-group-item bg-transparent">
                    <h4 className="list-group-item-heading text-base font-semibold mb-2">
                      Information
                    </h4>
                    <div className="list-group-item-text item-margin">Name: <span>{zone?.name || "None"}</span></div>
                    <div className="list-group-item-text item-margin">ID: <span>{zone?.id || "None"}</span></div>
                    <div className="list-group-item-text item-margin">Description: <span><samp>{zone?.description || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Creation Date: <span>{zone?.creation_timestamp ? new Date(zone.creation_timestamp).toLocaleString() : "None"}</span></div>
                    <div className="list-group-item-text item-margin">DNSSEC: <span>{zone?.dnssec_enabled ? "Enabled" : "Disabled"}</span></div>
                    <div className="list-group-item-text item-margin">Visibility: <span>{zone?.visibility || "None"}</span></div>
                  </div>

                  {/* DNSSEC Keys Section */}
                  <div className="list-group-item bg-transparent mt-4">
                    <h5 className="list-group-item-heading text-base font-semibold mb-2">
                      DNSSEC Keys:
                    </h5>
                    {zone?.dnssec_keys && Object.keys(zone.dnssec_keys).length > 0 ? (
                      <ul className="ml-4 list-disc">
                        {Object.entries(zone.dnssec_keys).map(([keyId, key]) => (
                          <li key={keyId} className="mb-1">
                            <samp>{keyId}</samp>
                            <ul className="ml-6 list-disc">
                              <li>Key Algorithm: <samp>{key.key_algorithm || "None"}</samp></li>
                              <li>Key Type: <samp>{key.key_type || "None"}</samp></li>
                              <li>Length: <span>{key.length || "None"}</span></li>
                            </ul>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div><samp>None</samp></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };  
  
  // Single Cloud Function Component
  export const FunctionsV1 = ({ data }) => {
    if (!data) return null;
  
    return (
      <div className="functions-v1">
        {Object.entries(data).map(([projectId, projectData]) => {
          const functions = projectData.functions_v1 || {};
  
          return (
            <div key={projectId} className="project-box" style={{ marginBottom: "20px" }}>
              <div className="project-header bg-black text-white p-3 rounded border border-gray-800">
                <h3 className="text-lg font-semibold">Project: {projectId}</h3>
              </div>
  
              {Object.entries(functions).map(([funcId, func]) => (
                <div
                  key={funcId}
                  className="function-box bg-gray-900 text-white p-4 mt-4 rounded border border-gray-800"
                >
                  {/* Function Header */}
                  <div className="list-group-item active bg-black border border-gray-800 rounded p-3 mb-3">
                    <h4 className="list-group-item-heading text-base font-semibold">
                      {func?.name || funcId}
                    </h4>
                  </div>

                  {/* Information Section */}
                  <div className="list-group-item bg-transparent">
                    <h4 className="list-group-item-heading text-base font-semibold mb-2">
                      Information
                    </h4>
                    <div className="list-group-item-text item-margin">Name: <span><samp>{func?.name || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Status: <span><samp>{func?.status || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Update Time: <span><samp>{func?.update_time || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Version: <span><samp>{func?.version_id || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Runtime: <span><samp>{func?.runtime || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Memory: <span><samp>{func?.memory ? `${func.memory}MB` : "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Max Instances: <span><samp>{func?.max_instances || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Docker Registry: <span><samp>{func?.docker_registry || "None"}</samp></span></div>
                    
                    {/* Environment Variables */}
                    <div className="list-group-item-text item-margin">Environment Variables</div>
                    {func?.environment_variables && Object.keys(func.environment_variables).length > 0 ? (
                      <ul className="ml-4 list-disc">
                        {Object.entries(func.environment_variables).map(([key, value]) => (
                          <li key={key}><samp>{key}: {value}</samp></li>
                        ))}
                      </ul>
                    ) : (
                      <div className="ml-4"><span>None</span></div>
                    )}

                    {/* Environment Variables Secrets */}
                    {func?.environment_variables_secrets && func.environment_variables_secrets.length > 0 && (
                      <>
                        <div className="list-group-item-text item-margin">Environment Variables Secrets (Potential)</div>
                        <ul className="ml-4 list-disc">
                          {func.environment_variables_secrets.map((secret, idx) => (
                            <li key={idx}><samp>{secret}</samp></li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>

                  {/* Trigger Section */}
                  <div className="list-group-item bg-transparent mt-4">
                    <h4 className="list-group-item-heading text-base font-semibold mb-2">
                      Trigger
                    </h4>
                    <div className="list-group-item-text item-margin">URL: <span><samp>{func?.url || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Security Level: <span><samp>{func?.security_level || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Ingress Settings: <span><samp>{func?.ingress_settings || "None"}</samp></span></div>
                  </div>

                  {/* Bindings Section */}
                  <div className="list-group-item bg-transparent mt-4">
                    <h4 className="list-group-item-heading text-base font-semibold mb-2">
                      <span>Bindings:</span>
                    </h4>
                    {func?.bindings && func.bindings.length > 0 ? (
                      <ul className="ml-4 list-disc">
                        {func.bindings.map((binding, idx) => (
                          <li key={idx} className="mb-1">
                            Role <samp>{binding.role}</samp>
                            <ul className="ml-6 list-disc">
                              {binding.members.map((member, mid) => (
                                <li key={mid}><samp>{member}</samp></li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div><samp>None</samp></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };
  

  export const FunctionsV2 = ({ data }) => {
    if (!data) return null;
  
    return (
      <div className="functions-v2">
        {Object.entries(data).map(([projectId, projectData]) => {
          const functions = projectData.functions_v2 || {};
  
          return (
            <div key={projectId} className="project-box" style={{ marginBottom: "20px" }}>
              <div className="project-header bg-black text-white p-3 rounded border border-gray-800">
                <h3 className="text-lg font-semibold">Project: {projectId}</h3>
              </div>
  
              {Object.entries(functions).map(([funcId, func]) => (
                <div
                  key={funcId}
                  className="function-box bg-gray-900 text-white p-4 mt-4 rounded border border-gray-800"
                >
                  {/* Function Header */}
                  <div className="list-group-item active bg-black border border-gray-800 rounded p-3 mb-3">
                    <h4 className="list-group-item-heading text-base font-semibold">
                      {func?.name || funcId}
                    </h4>
                  </div>

                  {/* Information Section */}
                  <div className="list-group-item bg-transparent">
                    <h4 className="list-group-item-heading text-base font-semibold mb-2">
                      Information
                    </h4>
                    <div className="list-group-item-text item-margin">Name: <span><samp>{func?.name || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Status: <span><samp>{func?.status || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Update Time: <span><samp>{func?.update_time || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Version: <span><samp>{func?.version_id || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Runtime: <span><samp>{func?.runtime || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Memory: <span><samp>{func?.memory || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Max Instances: <span><samp>{func?.max_instances || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Service Account: <span><samp>{func?.service_account || "None"}</samp></span></div>
                    
                    {/* Environment Variables */}
                    <div className="list-group-item-text item-margin">Environment Variables</div>
                    {func?.environment_variables && Object.keys(func.environment_variables).length > 0 ? (
                      <ul className="ml-4 list-disc">
                        {Object.entries(func.environment_variables).map(([key, value]) => (
                          <li key={key}><samp>{key}: {value}</samp></li>
                        ))}
                      </ul>
                    ) : (
                      <div className="ml-4"><span>None</span></div>
                    )}

                    {/* Environment Variables Secrets */}
                    {func?.environment_variables_secrets && func.environment_variables_secrets.length > 0 && (
                      <>
                        <div className="list-group-item-text item-margin">Environment Variables Secrets (Potential)</div>
                        <ul className="ml-4 list-disc">
                          {func.environment_variables_secrets.map((secret, index) => (
                            <li key={index}><samp>{secret}</samp></li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>

                  {/* Trigger Section */}
                  <div className="list-group-item bg-transparent mt-4">
                    <h4 className="list-group-item-heading text-base font-semibold mb-2">
                      Trigger
                    </h4>
                    <div className="list-group-item-text item-margin">URL: <span><samp>{func?.url || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Ingress Settings: <span><samp>{func?.ingress_settings || "None"}</samp></span></div>
                  </div>

                  {/* Bindings Section */}
                  <div className="list-group-item bg-transparent mt-4">
                    <h4 className="list-group-item-heading text-base font-semibold mb-2">
                      <span>Bindings:</span>
                    </h4>
                    {func?.bindings && func.bindings.length > 0 ? (
                      <ul className="ml-4 list-disc">
                        {func.bindings.map((binding, idx) => (
                          <li key={idx} className="mb-1">
                            Role <samp>{binding.role}</samp>
                            <ul className="ml-6 list-disc">
                              {binding.members.map((member, mid) => (
                                <li key={mid}><samp>{member}</samp></li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div><samp>None</samp></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };  
  

//iam  Combined component: renders projects and their service accounts
export const ProjectsAndServiceAccounts = ({ projects }) => {
    if (!projects) return <p>No projects found.</p>;
  
    return (
      <div className="space-y-8">
        {Object.entries(projects).map(([projectId, project]) => (
          <div
            key={projectId}
            className="border border-gray-600 gap-3 p-5 rounded-lg mb-3"
          >
            {/* Project Header */}
            <div className="text-white">
              <h3 className="text-xl font-bold text-gray-400">
                Project : {projectId}
              </h3>
            </div>
  
            {/* Service Accounts List */}
            <div className="p-6 space-y-4 cursor-pointer">
              {project.service_accounts && Object.values(project.service_accounts).length > 0 ? (
                Object.values(project.service_accounts).map((account, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/40 rounded-lg p-4 hover:bg-gray-800/60 transition"
                  >
                    {/* Service Account Email */}
                    <div className="flex">
                      <p className="text-lg text-gray-400 mb-3">Service Account : </p>
                      <h4 className="text-lg font-semibold text-gray-400 mb-3 mx-3">
                        {account.email}
                      </h4>
                    </div>
  
                    {/* Information */}
                    <div className="mb-4">
                      <div className="flex">
                        <p className="text-lg text-gray-400 mb-3">ID : </p>
                        <span className="text-gray-400 mx-3 text-lg">
                          {account.id}
                        </span>
                      </div>
                      <div className="flex">
                        <p className="text-lg text-gray-400 mb-3">Display Name : </p>
                        <span className="text-gray-400 mx-3 text-lg">
                          {account.display_name || "N/A"}
                        </span>
                      </div>
                      <div className="flex">
                        <p className="text-lg text-gray-400 mb-3">Default Service Account : </p>
                        <span className="text-gray-400 mx-3 text-lg">
                          {account.default_service_account ? "true" : "false"}
                        </span>
                      </div>
                    </div>
  
                    {/* Keys */}
                    <div className="mb-4">
                      <div className="flex">
                        <p className="text-lg text-gray-400 mb-3">Keys : </p>
                        <div className="flex flex-wrap gap-2">
                          {account.keys && Object.entries(account.keys).length > 0 ? (
                            Object.entries(account.keys).map(([keyId, key]) => (
                              <div key={keyId} className="text-gray-400 mx-3 text-lg">
                                <div>Key ID: {keyId}</div>
                                <div>Type: {key.key_type}</div>
                                <div>Algorithm: {key.key_algorithm}</div>
                                <div>Valid From: {formatDate(key.valid_after)}</div>
                                <div>Valid Until: {formatDate(key.valid_before)}</div>
                              </div>
                            ))
                          ) : (
                            <span className="text-gray-400 mx-3 text-lg">
                              None
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
  
                    {/* Service Account Users */}
                    <div>
                      <div className="flex">
                        <p className="text-lg text-gray-400 mb-3">Service Account Users : </p>
                        <div className="flex flex-wrap gap-2">
                          {account.bindings && Object.keys(account.bindings).length > 0 ? (
                            Object.entries(account.bindings).map(([roleId, binding]) => (
                              <div key={roleId} className="text-gray-400 mx-3 text-lg">
                                <div>Role: {binding.role}</div>
                                <div>Members: {binding.members.join(", ")}</div>
                              </div>
                            ))
                          ) : (
                            <span className="text-gray-400 mx-3 text-lg">
                              None
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-gray-800/40 rounded-lg p-4">
                  <span className="text-gray-400 text-lg">No service accounts found.</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

// ---------------- Permissions Section with Hide/Show ----------------
const PermissionsSection = ({ permissions }) => {
  const [showPermissions, setShowPermissions] = useState(false);

  if (!permissions || permissions.length === 0) {
    return (
      <div className="flex">
        <p className="text-lg text-gray-400 mb-3">Permissions : </p>
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-700 text-gray-300">
          None
        </span>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <div 
        className="flex items-center justify-between cursor-pointer bg-gray-800/20 p-4 rounded-lg transition"
        onClick={() => setShowPermissions(!showPermissions)}
      >
        <p className="text-lg text-gray-200">Permissions</p>
        {showPermissions ? (
          <ChevronUp className="w-7 h-7 text-gray-400" />
        ) : (
          <ChevronDown className="w-7 h-7 text-gray-400" />
        )}
      </div>
      
      {showPermissions && (
        <div className="mt-2 ml-4 space-y-1 bg-gray-800/20 p-4 rounded-lg">
          {permissions.map((perm, idx) => (
            <div key={idx} className="text-gray-400 text-sm">
              • {perm}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

 // ---------------- IAM Project Bindings ----------------
export const IAMProjectBindings = ({ data }) => {
    if (!data) return null;
  
    return (
      <div className="space-y-8">
        {Object.entries(data).map(([projectId, projectData]) => (
          <div
            key={projectId}
            className="border border-gray-600 gap-3 p-5 rounded-lg mb-3"
          >
            {/* Project Header */}
            <div className="text-white">
              <h3 className="text-xl font-bold text-gray-400">
                Project : {projectId}
              </h3>
            </div>
  
            {/* Bindings List */}
            <div className="p-6 space-y-4 cursor-pointer">
              {projectData.bindings &&
                Object.entries(projectData.bindings).map(([bindingId, binding]) => (
                  <div
                    key={bindingId}
                    className="bg-gray-800/40 rounded-lg p-4 hover:bg-gray-800/60 transition"
                  >
                    {/* Role Name */}
                    <div className="flex">
                      <p className="text-lg text-gray-400 mb-3">Role : </p>
                      <h4 className="text-lg font-semibold text-gray-400 mb-3 mx-3">
                        {binding.name}
                      </h4>
                    </div>
  
                    {/* Information */}
                    <div className="mb-4">
                      <div className="flex">
                        <p className="text-lg text-gray-400 mb-3">Title : </p>
                        <span className="text-gray-400 mx-3 text-lg">
                          {binding.title || "N/A"}
                        </span>
                      </div>
                      <div className="flex">
                        <p className="text-lg text-gray-400 mb-3">Description : </p>
                        <span className="text-gray-400 mx-3 text-lg">
                          {binding.description || "N/A"}
                        </span>
                      </div>
                      <div className="flex">
                        <p className="text-lg text-gray-400 mb-3">Custom Role : </p>
                        <span className="text-gray-400 mx-3 text-lg">
                          {String(binding.custom_role)}
                        </span>
                      </div>
                    </div>
  
                    {/* Permissions with Hide/Show */}
                    <PermissionsSection permissions={binding.permissions} />
  
                    {/* Bindings */}
                    <div className="mt-4">
                      {/* Users */}
                      <div className="flex">
                        <p className="text-lg text-gray-400 mb-3">Attached Users : </p>
                        <div className="flex flex-wrap gap-2">
                          {binding.members?.users?.length > 0 ? (
                            binding.members.users.map((u, idx) => (
                              <span
                                key={idx}
                                className="text-gray-400 mx-3 text-lg"
                              >
                                {u}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400 mx-3 text-lg">
                              None
                            </span>
                          )}
                        </div>
                      </div>
  
                      {/* Groups */}
                      <div className="flex">
                        <p className="text-lg text-gray-400 mb-3">Attached Groups : </p>
                        <div className="flex flex-wrap gap-2">
                          {binding.members?.groups?.length > 0 ? (
                            binding.members.groups.map((g, idx) => (
                              <span
                                key={idx}
                                className="text-gray-400 mx-3 text-lg"
                              >
                                {g}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400 mx-3 text-lg">
                              None
                            </span>
                          )}
                        </div>
                      </div>
  
                      {/* Service Accounts */}
                      <div className="flex">
                        <p className="text-lg text-gray-400 mb-3">Attached Service Accounts : </p>
                        <div className="flex flex-wrap gap-2">
                          {binding.members?.service_accounts?.length > 0 ? (
                            binding.members.service_accounts.map((sa, idx) => (
                              <span
                                key={idx}
                                className="text-gray-400 mx-3 text-lg"
                              >
                                {sa}
                              </span>
                            ))
                          ) : (
                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-700 text-gray-300">
                              None
                            </span>
                          )}
                        </div>
                      </div>
  
                      {/* Domains */}
                      <div className="flex">
                        <p className="text-lg text-gray-400 mb-3">Attached Domains : </p>
                        <div className="flex flex-wrap gap-2">
                          {binding.members?.domains?.length > 0 ? (
                            binding.members.domains.map((d, idx) => (
                              <span
                                key={idx}
                                className="text-gray-400 mx-3 text-lg"
                              >
                                {d}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400 mx-3 text-lg">
                              None
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      
    );
  };  

//IAM USERS
// IAM Users Component
export const IAMGCPUsers = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([projectId, projectData]) => (
        <div
          key={projectId}
          className="border border-gray-600 gap-3 p-5 rounded-lg mb-3"
        >
          {/* Project Header */}
          <div className="text-white">
            <h3 className="text-xl font-bold text-gray-400">
              Project : {projectId}
            </h3>
          </div>

          {/* Users List */}
          <div className="p-6 space-y-4 cursor-pointer">
            {projectData.users &&
              Object.entries(projectData.users).map(([userKey, user]) => (
                <div
                  key={userKey}
                  className="bg-gray-800/40 rounded-lg p-4 hover:bg-gray-800/60 transition"
                >
                  {/* User Info */}
                  <div className="flex">
                  <p className="text-lg text-gray-400 mb-3">User : </p>
                  <h4 className="text-lg font-semibold text-gray-400 mb-3 mx-3">
                    {user.name}
                  </h4>
                  </div>

                  {/* Bindings */}
                  <div className="flex">
                    <p className="text-lg text-gray-400 mb-3">Bindings : </p>
                    <div className="flex flex-wrap gap-2">
                      {user.roles && user.roles.length > 0 ? (
                        user.roles.map((role, idx) => (
                          <span
                            key={idx}
                            className="text-gray-400 mx-3 text-lg"
                          >
                            {role}
                          </span>
                        ))
                      ) : (
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-700 text-gray-300">
                          None
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};


  export const IamBindingsSeparationDuties = ({ data }) => {
    if (!data) return null;

    return (
      <div className="iam-bindings-separation-duties">
        {Object.entries(data).map(([projectId, projectData]) => (
          <div key={projectId} className="project-box" style={{ marginBottom: "20px" }}>
            <div className="project-header bg-black text-white p-3 rounded border border-gray-800">
              <h3 className="text-lg font-semibold">Project: {projectId}</h3>
            </div>
            
            {projectData.bindings_separation_duties &&
              Object.entries(projectData.bindings_separation_duties).map(
                ([bindingId, binding]) => (
                  <div
                    key={bindingId}
                    className="binding-box bg-gray-900 text-white p-4 mt-4 rounded border border-gray-800"
                  >
                    {/* Binding Header */}
                    <div className="list-group-item active bg-black border border-gray-800 rounded p-3 mb-3">
                      <h4 className="list-group-item-heading text-base font-semibold">
                        {binding?.name || bindingId}
                      </h4>
                    </div>

                    {/* Information Section */}
                    <div className="list-group-item bg-transparent">
                      <h4 className="list-group-item-heading text-base font-semibold mb-2">
                        Information
                      </h4>
                      <div className="list-group-item-text item-margin">
                        Separation of duties enforced for service account related roles: 
                        <span><samp>{binding?.account_separation_duties !== undefined ? binding.account_separation_duties.toString() : "None"}</samp></span>
                      </div>
                      <div className="list-group-item-text item-margin">
                        Separation of duties enforced for KMS related roles: 
                        <span><samp>{binding?.kms_separation_duties !== undefined ? binding.kms_separation_duties.toString() : "None"}</samp></span>
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>
        ))}
      </div>
    );
  };

  export const IamDomains = ({ data }) => {
    if (!data) return null;

    return (
      <div className="iam-domains">
        {Object.entries(data).map(([projectId, projectData]) => (
          <div key={projectId} className="project-box" style={{ marginBottom: "20px" }}>
            <div className="project-header bg-black text-white p-3 rounded border border-gray-800">
              <h3 className="text-lg font-semibold">Project: {projectId}</h3>
            </div>
            
            {projectData.domains &&
              Object.entries(projectData.domains).map(([domainId, domain]) => (
                <div
                  key={domainId}
                  className="domain-box bg-gray-900 text-white p-4 mt-4 rounded border border-gray-800"
                >
                  {/* Domain Header */}
                  <div className="list-group-item active bg-black border border-gray-800 rounded p-3 mb-3">
                    <h4 className="list-group-item-heading text-base font-semibold">
                      {domain?.name || domainId}
                    </h4>
                  </div>

                  {/* Information Section */}
                  <div className="list-group-item bg-transparent">
                    <h4 className="list-group-item-heading text-base font-semibold mb-2">
                      Information
                    </h4>
                    <div className="list-group-item-text item-margin">Domain: <span>{domain?.name || "None"}</span></div>
                    <div className="list-group-item-text item-margin">Project ID: <span><samp>{domain?.project || "None"}</samp></span></div>
                  </div>

                  {/* Bindings Section */}
                  <div className="list-group-item bg-transparent mt-4">
                    <h4 className="list-group-item-heading text-base font-semibold mb-2">
                      Bindings:
                    </h4>
                    {domain?.roles && domain.roles.length > 0 ? (
                      <ul className="ml-4 list-disc">
                        {domain.roles.map((role, index) => (
                          <li key={index}><samp>{role}</samp></li>
                        ))}
                      </ul>
                    ) : (
                      <div><samp>None</samp></div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    );
  };
  
  export const IamGroups = ({ data }) => {
    if (!data) return null;

    return (
      <div className="iam-groups">
        {Object.entries(data).map(([projectId, projectData]) => (
          <div key={projectId} className="project-box" style={{ marginBottom: "20px" }}>
            <div className="project-header bg-black text-white p-3 rounded border border-gray-800">
              <h3 className="text-lg font-semibold">Project: {projectId}</h3>
            </div>
            
            {projectData.groups &&
              Object.entries(projectData.groups).map(([groupId, group]) => (
                <div
                  key={groupId}
                  className="group-box bg-gray-900 text-white p-4 mt-4 rounded border border-gray-800"
                >
                  {/* Group Header */}
                  <div className="list-group-item active bg-black border border-gray-800 rounded p-3 mb-3">
                    <h4 className="list-group-item-heading text-base font-semibold">
                      {group?.name || groupId}
                    </h4>
                  </div>

                  {/* Information Section */}
                  <div className="list-group-item bg-transparent">
                    <h4 className="list-group-item-heading text-base font-semibold mb-2">
                      Information
                    </h4>
                    <div className="list-group-item-text item-margin">Group: <span>{group?.name || "None"}</span></div>
                    <div className="list-group-item-text item-margin">Project ID: <span><samp>{group?.project || "None"}</samp></span></div>
                  </div>

                  {/* Bindings Section */}
                  <div className="list-group-item bg-transparent mt-4">
                    <h4 className="list-group-item-heading text-base font-semibold mb-2">
                      Bindings:
                    </h4>
                    {group?.roles && group.roles.length > 0 ? (
                      <ul className="ml-4 list-disc">
                        {group.roles.map((role, index) => (
                          <li key={index}><samp>{role}</samp></li>
                        ))}
                      </ul>
                    ) : (
                      <div><samp>None</samp></div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    );
  };

  export const KmsKeyrings = ({ data }) => {
    if (!data) return null;

    return (
      <div className="kms-keyrings">
        {Object.entries(data).map(([projectId, projectData]) => (
          <div key={projectId} className="project-box" style={{ marginBottom: "20px" }}>
            <div className="project-header bg-black text-white p-3 rounded border border-gray-800">
              <h3 className="text-lg font-semibold">Project: {projectId}</h3>
            </div>
            
            {projectData.keyrings &&
              Object.entries(projectData.keyrings).map(([keyringId, keyring]) => (
                <div
                  key={keyringId}
                  className="keyring-box bg-gray-900 text-white p-4 mt-4 rounded border border-gray-800"
                >
                  {/* Keyring Header */}
                  <div className="list-group-item active bg-black border border-gray-800 rounded p-3 mb-3">
                    <h4 className="list-group-item-heading text-base font-semibold">
                      {keyring?.name || keyringId}
                    </h4>
                  </div>

                  {/* Information Section */}
                  <div className="list-group-item bg-transparent">
                    <h4 className="list-group-item-heading text-base font-semibold mb-2">
                      Information
                    </h4>
                    <div className="list-group-item-text item-margin">Name: <span>{keyring?.name || "None"}</span></div>
                    <div className="list-group-item-text item-margin">Project ID: <span><samp>{keyring?.project || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Location: <span><samp>{keyring?.location || "None"}</samp></span></div>
                  </div>

                  {/* Keys Section */}
                  <div className="list-group-item bg-transparent mt-4">
                    <h4 className="list-group-item-heading text-base font-semibold mb-2">
                      <span>Keys:</span>
                    </h4>
                    {keyring?.keys && Object.entries(keyring.keys).length > 0 ? (
                      <ul className="ml-4 list-disc">
                        {Object.entries(keyring.keys).map(([keyId, key]) => (
                          <li key={keyId} className="mb-4">
                            <samp>{keyId}</samp>
                            <ul className="ml-6 list-disc">
                              <li>State: <samp>{key?.state || "None"}</samp></li>
                              <li>Protection Level: {key?.protection_level || "None"}</li>
                              <li>Algorithm: <samp>{key?.algorithm || "None"}</samp></li>
                              <li>Purpose: {key?.purpose || "None"}</li>
                              <li>Creation Date: {key?.creation_datetime || "None"}</li>
                              <li>Rotation Period: {key?.rotation_period || "None"}</li>
                              <li>Next Rotation Date: {key?.next_rotation_datetime || "None"}</li>
                              <li>Days Until Next Rotation: {key?.next_rotation_time_days || "None"}</li>
                              <li>Bindings</li>
                              <ul className="ml-6 list-disc">
                                {key?.kms_iam_policy && key.kms_iam_policy.length > 0 ? (
                                  key.kms_iam_policy.map((policy, index) => (
                                    <li key={index} className="mb-2">
                                      <samp>{policy?.name || "None"}</samp>
                                      <ul className="ml-6 list-disc">
                                        <li>Title: <samp>{policy?.title || "None"}</samp></li>
                                        <li>Description: {policy?.description || "None"}</li>
                                        <li>Custom Role: <samp>{policy?.custom_role !== undefined ? policy.custom_role.toString() : "None"}</samp></li>
                                        <li>Not anonymously or publicly accessible: <samp>{policy?.anonymous_public_accessible !== undefined ? policy.anonymous_public_accessible.toString() : "None"}</samp></li>
                                      </ul>
                                    </li>
                                  ))
                                ) : (
                                  <li><samp>None</samp></li>
                                )}
                              </ul>
                            </ul>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div><samp>None</samp></div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    );
  };

// Utility function to convert boolean to "Enabled"/"Disabled"
const boolToEnabled = (value) => (value ? "Enabled" : "Disabled");

export const KubernetesEngineClusters = ({ data }) => {
  if (!data) return null;

  return (
    <div className="kubernetes-engine-clusters">
      {Object.entries(data).map(([projectId, projectData]) => (
        <div key={projectId} className="project-box" style={{ marginBottom: "20px" }}>
          <div className="project-header bg-black text-white p-3 rounded border border-gray-800">
            <h3 className="text-lg font-semibold">Project: {projectId}</h3>
          </div>
          
          {projectData.clusters &&
            Object.entries(projectData.clusters).map(([clusterId, cluster]) => (
              <div
                key={clusterId}
                className="cluster-box bg-gray-900 text-white p-4 mt-4 rounded border border-gray-800"
              >
                {/* Cluster Header */}
                <div className="list-group-item active bg-black border border-gray-800 rounded p-3 mb-3">
                  <h4 className="list-group-item-heading text-base font-semibold">
                    {cluster?.name || clusterId}
                  </h4>
                </div>

                {/* Information Section */}
                <div className="list-group-item bg-transparent">
                  <h4 className="list-group-item-heading text-base font-semibold mb-2">
                    Information
                  </h4>
                  <div className="list-group-item-text item-margin">Name: <span>{cluster?.name || "None"}</span></div>
                  <div className="list-group-item-text item-margin">Project ID: <span><samp>{cluster?.project || projectId}</samp></span></div>
                  <div className="list-group-item-text item-margin">Location: <span><samp>{cluster?.location || "None"}</samp></span></div>
                  <div className="list-group-item-text item-margin">Type: <span><samp>{cluster?.type || "None"}</samp></span></div>
                  <div className="list-group-item-text item-margin">Status: <span><samp>{cluster?.status || "None"}</samp></span></div>
                  <div className="list-group-item-text item-margin">Image Type: <span>{cluster?.image_type || "None"}</span></div>
                  <div className="list-group-item-text item-margin">Release Channel: <span><samp>{cluster?.release_channel || "None"}</samp></span></div>
                  <div className="list-group-item-text item-margin">Basic Authentication: <span>{boolToEnabled(cluster?.basic_authentication_enabled)}</span></div>
                  <div className="list-group-item-text item-margin">Client Certificate Authentication: <span>{boolToEnabled(cluster?.client_certificate_enabled)}</span></div>
                  <div className="list-group-item-text item-margin">Dashboard: <span>{cluster?.dashboard_status || "None"}</span></div>
                  <div className="list-group-item-text item-margin">Legacy Authorization (ABAC): <span>{boolToEnabled(cluster?.legacy_abac_enabled)}</span></div>
                  <div className="list-group-item-text item-margin">Pod Security Policy: <span>{boolToEnabled(cluster?.pod_security_policy_enabled)}</span></div>
                  <div className="list-group-item-text item-margin">Network Policy: <span>{boolToEnabled(cluster?.network_policy_enabled)}</span></div>
                  <div className="list-group-item-text item-margin">Service Account: <span>{cluster?.service_account || "None"}</span></div>
                  <div className="list-group-item-text item-margin">Workload Identity: <span>{boolToEnabled(cluster?.workload_identity_enabled)}</span></div>
                  <div className="list-group-item-text item-margin">Private Google Access: <span>{boolToEnabled(cluster?.private_ip_google_access_enabled)}</span></div>
                  <div className="list-group-item-text item-margin">Alias IP: <span>{boolToEnabled(cluster?.alias_ip_enabled)}</span></div>
                  <div className="list-group-item-text item-margin">Endpoint: <span><samp>{cluster?.endpoint || "None"}</samp></span></div>
                  <div className="list-group-item-text item-margin">Private Endpoint: <span><samp>{boolToEnabled(cluster?.private_endpoint_enabled)}</samp></span></div>
                  {cluster?.private_endpoint && (
                    <div className="list-group-item-text item-margin">Private Endpoint IP: <span><samp>{cluster.private_endpoint}</samp></span></div>
                  )}
                  {cluster?.public_endpoint && (
                    <div className="list-group-item-text item-margin">Public Endpoint IP: <span><samp>{cluster.public_endpoint}</samp></span></div>
                  )}
                  <div className="list-group-item-text item-margin">Binary Authorization: <span>{boolToEnabled(cluster?.binary_authorization_enabled)}</span></div>
                  <div className="list-group-item-text item-margin">Shielded Nodes: <span>{boolToEnabled(cluster?.shielded_nodes_enabled)}</span></div>
                  <div className="list-group-item-text item-margin">Application-Layer Secrets Encryption: <span>{boolToEnabled(cluster?.application_layer_encryption_enabled)}</span></div>
                  <div className="list-group-item-text item-margin">Stackdriver Logging: <span>{boolToEnabled(cluster?.logging_enabled)}</span></div>
                  <div className="list-group-item-text item-margin">Stackdriver Monitoring: <span>{boolToEnabled(cluster?.monitoring_enabled)}</span></div>
                  {cluster?.labels && (
                    <div className="list-group-item-text item-margin">Labels: <span>{JSON.stringify(cluster.labels)}</span></div>
                  )}
                </div>

                {/* Scopes Section */}
                <div className="list-group-item bg-transparent mt-4">
                  <h4 className="list-group-item-heading text-base font-semibold mb-2">
                    <span>Scopes</span>
                  </h4>
                  {cluster?.scopes && cluster.scopes.length > 0 ? (
                    <ul className="ml-4 list-disc">
                      {cluster.scopes.map((scope, idx) => (
                        <li key={idx}><samp>{scope}</samp></li>
                      ))}
                    </ul>
                  ) : (
                    <div><span>None</span></div>
                  )}
                </div>

                {/* Master Authorized Networks Section */}
                <div className="list-group-item bg-transparent mt-4">
                  <h4 className="list-group-item-heading text-base font-semibold mb-2">
                    <span>Master Authorized Networks</span>
                  </h4>
                  <div className="list-group-item-text item-margin">Status: <span>{boolToEnabled(cluster?.master_authorized_networks_enabled)}</span></div>
                  <div className="list-group-item-text item-margin">
                    <span>CIDR Blocks</span>:
                    {cluster?.master_authorized_networks_config?.cidrBlocks?.length > 0 ? (
                      <ul className="ml-4 list-disc">
                        {cluster.master_authorized_networks_config.cidrBlocks.map((block, idx) => (
                          <li key={idx}><samp>{block.displayName}</samp>: <samp>{block.cidrBlock}</samp></li>
                        ))}
                      </ul>
                    ) : (
                      <div className="ml-4"><span>None</span></div>
                    )}
                  </div>
                </div>

                {/* Node Pools Section */}
                <div className="list-group-item bg-transparent mt-4">
                  <h4 className="list-group-item-heading text-base font-semibold mb-2">
                    Node pools
                  </h4>
                  <div className="list-group-item-text item-margin">Private Nodes: <span>{boolToEnabled(cluster?.private_nodes_enabled)}</span></div>
                  <div className="list-group-item-text item-margin">Metadata Server: <span>{boolToEnabled(cluster?.metadata_server_enabled)}</span></div>
                  <div className="list-group-item-text item-margin">
                    {cluster?.node_pools && Object.entries(cluster.node_pools).map(([poolId, pool]) => (
                      <div key={poolId} className="mb-4">
                        <samp>{poolId}</samp>
                        <div className="list-group-item-text item-margin">
                          Integrity Monitoring: <span>{boolToEnabled(pool?.integrity_monitoring_enabled)}</span>
                        </div>
                        <div className="list-group-item-text item-margin">
                          Secure Boot: <span>{boolToEnabled(pool?.secure_boot_enabled)}</span>
                        </div>
                        <div className="list-group-item-text item-margin">
                          Legacy Metadata Endpoints: <span>{boolToEnabled(pool?.legacy_metadata_endpoints_enabled)}</span>
                        </div>
                        <div className="list-group-item-text item-margin">
                          Automatic Node Upgrades: <span>{boolToEnabled(pool?.auto_upgrade_enabled)}</span>
                        </div>
                        <div className="list-group-item-text item-margin">
                          Automatic Node Repair: <span>{boolToEnabled(pool?.auto_repair_enabled)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export const StackdriverLoggingMetric = ({ data }) => {
  if (!data) return null;

  const metricsConfig = [
    { key: "project_ownership_assignments", label: "Project Ownership Assignment/Changes" },
    { key: "audit_config_change", label: "Audit Configuration Changes" },
    { key: "custom_role_change", label: "Custom Role Changes" },
    { key: "vpc_network_firewall_rule_change", label: "VPC Network Firewall Rule Changes" },
    { key: "vpc_network_route_change", label: "VPC Network Route Changes" },
    { key: "vpc_network_change", label: "VPC Network Changes" },
    { key: "cloud_storage_iam_permission_change", label: "Cloud Storage IAM Permission Changes" },
    { key: "sql_instance_conf_change", label: "SQL Instance Configuration Changes" },
  ];

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([projectId, projectData]) => {
        const loggingMetrics = projectData.logging_metrics || {};

        return (
          <div
            key={projectId}
            className="border border-gray-600 gap-3 p-5 rounded-lg mb-3"
          >
            {/* Project Header */}
            <div className="text-white">
              <h3 className="text-xl font-bold text-gray-400">
                Project : {projectId}
              </h3>
            </div>

            {/* Logging Metrics List */}
            <div className="p-6 space-y-4 cursor-pointer">
              {Object.entries(loggingMetrics).map(([metricId, metricData]) => (
                <div
                  key={metricId}
                  className="bg-gray-800/40 rounded-lg p-4 hover:bg-gray-800/60 transition"
                >
                  {/* Metric ID */}
                  <div className="flex">
                    <p className="text-lg text-gray-400 mb-3">Metric ID : </p>
                    <h4 className="text-lg font-semibold text-gray-400 mb-3 mx-3">
                      {metricId}
                    </h4>
                  </div>

                  {/* Metrics List */}
                  <div className="space-y-2">
                    {metricsConfig.map(({ key, label }) => (
                      <div key={key} className="flex">
                        <p className="text-lg text-gray-400 mb-3">{label} : </p>
                        <span className="text-gray-400 mx-3 text-lg">
                          {metricData?.[key] ? "Yes" : "No"}
                        </span>
                      </div>
                    ))}
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

   
  export const StackdriverMetrics = ({ data }) => {
    if (!data) return null;
  
    return (
      <div className="stackdriver-metrics">
        {Object.entries(data).map(([projectId, projectData]) => {
          const metrics = projectData.metrics || {};
  
          return (
            <div key={projectId} className="project-box" style={{ marginBottom: "20px" }}>
              <div className="project-header bg-black text-white p-3 rounded border border-gray-800">
                <h3 className="text-lg font-semibold">Project: {projectId}</h3>
              </div>
  
              {Object.entries(metrics).map(([metricId, metric]) => (
                <div
                  key={metricId}
                  className="metric-box bg-gray-900 text-white p-4 mt-4 rounded border border-gray-800"
                >
                  {/* Metric Header */}
                  <div className="list-group-item active bg-black border border-gray-800 rounded p-3 mb-3">
                    <h4 className="list-group-item-heading text-base font-semibold">
                      {metric?.name || metricId}
                    </h4>
                  </div>

                  {/* Information Section */}
                  <div className="list-group-item bg-transparent">
                    <h4 className="list-group-item-heading text-base font-semibold mb-2">
                      Information
                    </h4>
                    <div className="list-group-item-text item-margin">Name: <span>{metric?.name || "None"}</span></div>
                    <div className="list-group-item-text item-margin">Project ID: <span><samp>{projectId}</samp></span></div>
                    <div className="list-group-item-text item-margin">Description: <span><samp>{metric?.description || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Filter: <span><code>{metric?.filter || "None"}</code></span></div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };
  

  export const StackdriverLoggingSinks = ({ data }) => {
    if (!data) return null;
  
    return (
      <div className="stackdriver-logging-sinks">
        {Object.entries(data).map(([projectId, projectData]) => {
          const sinks = projectData.sinks || {};
  
          return (
            <div key={projectId} className="project-box" style={{ marginBottom: "20px" }}>
              <div className="project-header bg-black text-white p-3 rounded border border-gray-800">
                <h3 className="text-lg font-semibold">Project: {projectId}</h3>
              </div>
  
              {Object.entries(sinks).map(([sinkId, sink]) => (
                <div
                  key={sinkId}
                  className="sink-box bg-gray-900 text-white p-4 mt-4 rounded border border-gray-800"
                >
                  {/* Sink Header */}
                  <div className="list-group-item active bg-black border border-gray-800 rounded p-3 mb-3">
                    <h4 className="list-group-item-heading text-base font-semibold">
                      {sink?.name || sinkId}
                    </h4>
                  </div>

                  {/* Information Section */}
                  <div className="list-group-item bg-transparent">
                    <h4 className="list-group-item-heading text-base font-semibold mb-2">
                      Information
                    </h4>
                    <div className="list-group-item-text item-margin">Sink Name: <span>{sink?.name || "None"}</span></div>
                    <div className="list-group-item-text item-margin">Project ID: <span><samp>{projectId}</samp></span></div>
                    <div className="list-group-item-text item-margin">Filter: <span><code>{sink?.filter || "None"}</code></span></div>
                    <div className="list-group-item-text item-margin">Destination: <span><samp>{sink?.destination || "None"}</samp></span></div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };
  

  export const StackdriverMonitoringUptimeChecks = ({ data }) => {
    if (!data) return null;
  
    return (
      <div className="stackdriver-uptime-checks">
        {Object.entries(data).map(([projectId, projectData]) => {
          const uptimeChecks = projectData.uptime_checks || {};
  
          return (
            <div key={projectId} className="project-box" style={{ marginBottom: "20px" }}>
              <div className="project-header bg-black text-white p-3 rounded border border-gray-800">
                <h3 className="text-lg font-semibold">Project: {projectId}</h3>
              </div>
  
              {Object.entries(uptimeChecks).map(([checkId, check]) => (
                <div
                  key={checkId}
                  className="uptime-check-box bg-gray-900 text-white p-4 mt-4 rounded border border-gray-800"
                >
                  {/* Uptime Check Header */}
                  <div className="list-group-item active bg-black border border-gray-800 rounded p-3 mb-3">
                    <h4 className="list-group-item-heading text-base font-semibold">
                      {check?.display_name || checkId}
                    </h4>
                  </div>

                  {/* Information Section */}
                  <div className="list-group-item bg-transparent">
                    <h4 className="list-group-item-heading text-base font-semibold mb-2">
                      Information
                    </h4>
                    <div className="list-group-item-text item-margin">Name: <span><samp>{check?.display_name || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Monitored Resource: <span><code>{check?.monitored_resource || "None"}</code></span></div>
                    <div className="list-group-item-text item-margin">HTTP Check: <span><code>{check?.http_check || "None"}</code></span></div>
                    <div className="list-group-item-text item-margin">Period: <span><samp>{check?.period || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Timeout: <span><samp>{check?.timeout || "None"}</samp></span></div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };
  
 
  export const StackdriverMonitoringAlertPolicy = ({ data }) => {
    return (
      <div className="space-y-8">
        {Object.entries(data).map(([projectId, projectData]) => {
          const policies = projectData.monitoring_alert_policies || {};
  
          return (
            <div
              key={projectId}
              className="border border-gray-600 gap-3 p-5 rounded-lg mb-3"
            >
              {/* Project Header */}
              <div className="text-white">
                <h3 className="text-xl font-bold text-gray-400">
                  Project : {projectId}
                </h3>
              </div>
  
              {/* Alert Policies List */}
              <div className="p-6 space-y-4 cursor-pointer">
                {Object.entries(policies).map(([policyId, policyData]) => (
                  <div
                    key={policyId}
                    className="bg-gray-800/40 rounded-lg p-4 hover:bg-gray-800/60 transition"
                  >
                    {/* Alert Policy Name */}
                    <div className="flex">
                      <p className="text-lg text-gray-400 mb-3">Alert Policy : </p>
                      <h4 className="text-lg font-semibold text-gray-400 mb-3 mx-3">
                        {policyId}
                      </h4>
                    </div>
  
                    {/* Alert Data */}
                    <div className="space-y-2">
                      {Object.entries(policyData).map(([key, value]) => (
                        <div key={key} className="flex">
                          <p className="text-lg text-gray-400 mb-3">
                            {key
                              .replace(/_/g, " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())} : 
                          </p>
                          <span className="text-gray-400 mx-3 text-lg">
                            {String(value)}
                          </span>
                        </div>
                      ))}
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
  

  export const StackdriverAlertPolicies = ({ data }) => {
    if (!data) return null;
  
    return (
      <div className="stackdriver-alert-policies">
        {Object.entries(data).map(([projectId, projectData]) => {
          const alertPolicies = projectData.alert_policies || {};
  
          return (
            <div key={projectId} className="project-box" style={{ marginBottom: "20px" }}>
              <div className="project-header bg-black text-white p-3 rounded border border-gray-800">
                <h3 className="text-lg font-semibold">Project: {projectId}</h3>
              </div>
  
              {Object.entries(alertPolicies).map(([policyId, policy]) => (
                <div
                  key={policyId}
                  className="alert-policy-box bg-gray-900 text-white p-4 mt-4 rounded border border-gray-800"
                >
                  {/* Alert Policy Header */}
                  <div className="list-group-item active bg-black border border-gray-800 rounded p-3 mb-3">
                    <h4 className="list-group-item-heading text-base font-semibold">
                      {policy?.name || policyId}
                    </h4>
                  </div>

                  {/* Information Section */}
                  <div className="list-group-item bg-transparent">
                    <h4 className="list-group-item-heading text-base font-semibold mb-2">
                      Information
                    </h4>
                    <div className="list-group-item-text item-margin">Name: <span><samp>{policy?.name || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Creation Record: <span><code>{policy?.creation_record || "None"}</code></span></div>
                    <div className="list-group-item-text item-margin">Mutation Record: <span><code>{policy?.mutation_record || "None"}</code></span></div>
                    <div className="list-group-item-text item-margin">Conditions: <span><code>{policy?.conditions || "None"}</code></span></div>
                    <div className="list-group-item-text item-margin">Combiner: <span><samp>{policy?.combiner || "None"}</samp></span></div>
                    <div className="list-group-item-text item-margin">Enabled: <span><samp>{policy?.enabled !== undefined ? String(policy.enabled) : "None"}</samp></span></div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };
  
  