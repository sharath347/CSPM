import React from "react";

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

//services.rbac.subscriptions.id.custom_roles_report
// ---------- RBAC Custom Roles Report Component ----------
export const CustomRolesReport = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscriptionData]) => {
        if (!subscriptionData.custom_roles_report) return null;

        return (
          <div
            key={subscriptionId}
            className="border border-gray-600 gap-3 p-5 rounded-lg mb-3"
          >
            {/* Subscription Header */}
            <div className="text-white">
              <h3 className="text-xl font-bold text-gray-400">
                Subscription : {subscriptionId}
              </h3>
            </div>

            {/* Custom Roles List */}
            <div className="p-6 space-y-4 cursor-pointer">
              {Object.entries(subscriptionData.custom_roles_report).map(([roleId, role]) => (
                <div
                  key={roleId}
                  className="bg-gray-800/40 rounded-lg p-4 hover:bg-gray-800/60 transition"
                >
                  {/* Role ID */}
                  <div className="flex">
                    <p className="text-lg text-gray-400 mb-3">Role ID : </p>
                    <h4 className="text-lg font-semibold text-gray-400 mb-3 mx-3">
                      {role.id || roleId}
                    </h4>
                  </div>

                  {/* Missing Custom Role Data */}
                  <div className="flex">
                    <p className="text-lg text-gray-400 mb-3">Missing Lock-Admin Role : </p>
                    <span className="text-gray-400 mx-3 text-lg">
                      {role.missing_custom_role_administering_resource_locks ? "Yes" : "No"}
                    </span>
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

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscriptionData]) => {
        if (!subscriptionData.pricings) return null;

        return (
          <div
            key={subscriptionId}
            className="border border-gray-600 gap-3 p-5 rounded-lg mb-3"
          >
            {/* Subscription Header */}
            <div className="text-white">
              <h3 className="text-xl font-bold text-gray-400">
                Subscription : {subscriptionId}
              </h3>
            </div>

            {/* Pricings List */}
            <div className="p-6 space-y-4 cursor-pointer">
              {Object.entries(subscriptionData.pricings).map(([pricingId, pricing]) => (
                <div
                  key={pricingId}
                  className="bg-gray-800/40 rounded-lg p-4 hover:bg-gray-800/60 transition"
                >
                  {/* Pricing Name */}
                  <div className="flex">
                    <p className="text-lg text-gray-400 mb-3">Pricing Name : </p>
                    <h4 className="text-lg font-semibold text-gray-400 mb-3 mx-3">
                      {pricing.name || pricingId}
                    </h4>
                  </div>

                  {/* Pricing Tier */}
                  <div className="flex">
                    <p className="text-lg text-gray-400 mb-3">Pricing Tier : </p>
                    <span className="text-gray-400 mx-3 text-lg">
                      {pricing.pricing_tier}
                    </span>
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

// ---------- Logging & Monitoring Log Alerts ----------
export const LogAlerts = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([subscriptionId, subscriptionData]) => {
        if (!subscriptionData.log_alerts) return null;

        return (
          <div
            key={subscriptionId}
            className="border border-gray-600 gap-3 p-5 rounded-lg mb-3"
          >
            {/* Subscription Header */}
            <div className="text-white">
              <h3 className="text-xl font-bold text-gray-400">
                Subscription : {subscriptionId}
              </h3>
            </div>

            {/* Log Alerts List */}
            <div className="p-6 space-y-4 cursor-pointer">
              {Object.entries(subscriptionData.log_alerts).map(([alertId, alert]) => (
                <div
                  key={alertId}
                  className="bg-gray-800/40 rounded-lg p-4 hover:bg-gray-800/60 transition"
                >
                  {/* Alert ID */}
                  <div className="flex">
                    <p className="text-lg text-gray-400 mb-3">Alert ID : </p>
                    <h4 className="text-lg font-semibold text-gray-400 mb-3 mx-3">
                      {alert.name || alertId}
                    </h4>
                  </div>

                  {/* Required Alerts Present */}
                  <div className="space-y-2">
                    <div className="flex">
                      <p className="text-lg text-gray-400 mb-3">Policy Assignment : </p>
                      <span className="text-gray-400 mx-3 text-lg">
                        {alert.create_policy_assignment_exist ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex">
                      <p className="text-lg text-gray-400 mb-3">NSG Create/Update : </p>
                      <span className="text-gray-400 mx-3 text-lg">
                        {alert.create_update_NSG_exist ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex">
                      <p className="text-lg text-gray-400 mb-3">NSG Delete : </p>
                      <span className="text-gray-400 mx-3 text-lg">
                        {alert.delete_NSG_exist ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex">
                      <p className="text-lg text-gray-400 mb-3">NSG Rule Create/Update : </p>
                      <span className="text-gray-400 mx-3 text-lg">
                        {alert.create_update_NSG_rule_exist ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex">
                      <p className="text-lg text-gray-400 mb-3">NSG Rule Delete : </p>
                      <span className="text-gray-400 mx-3 text-lg">
                        {alert.delete_NSG_rule_exist ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex">
                      <p className="text-lg text-gray-400 mb-3">Security Solution Create/Update : </p>
                      <span className="text-gray-400 mx-3 text-lg">
                        {alert.create_update_security_solution_exist ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex">
                      <p className="text-lg text-gray-400 mb-3">Security Solution Delete : </p>
                      <span className="text-gray-400 mx-3 text-lg">
                        {alert.delete_security_solution_exist ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex">
                      <p className="text-lg text-gray-400 mb-3">SQL Firewall Rule C/U/D : </p>
                      <span className="text-gray-400 mx-3 text-lg">
                        {alert.create_delete_firewall_rule_exist ? "Yes" : "No"}
                      </span>
                    </div>
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

// ---------- AAD Policies ----------
export const AadPolicies = ({ data }) => {
  if (!data) return null;

  // Extract the policies from data
  const policies = Object.values(data).map((item) => item);

  if (!policies || policies.length === 0) return null;

  // Helper function to display values
  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  return (
    <div className="mt-4">
      <Card title="AAD Policies">
        <div className="grid grid-cols-1 gap-3">
          {policies.map((policy, idx) => (
            <div key={idx} className="rounded-xl border border-gray-800 p-3">
              <div className="font-semibold text-gray-100 mb-3">{policy.name}</div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Name</span>
                  <span className="text-gray-400"><samp>{valueOrNone(policy.name)}</samp></span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Allow Invites From</span>
                  <span className="text-gray-400"><samp>{valueOrNone(policy.allow_invites_from)}</samp></span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Allowed To Create Apps</span>
                  <BooleanPill value={policy.allowed_to_create_apps} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Allowed To Create Security Groups</span>
                  <BooleanPill value={policy.allowed_to_create_security_groups} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Allowed To Read Other Users</span>
                  <BooleanPill value={policy.allowed_to_read_other_users} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Allow Email Verified Users To Join Organization</span>
                  <BooleanPill value={policy.allow_email_verified_users_to_join_organization} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

//upto here all are working

// ---------------- SubscriptionDetails ----------------
//details_for_subscription
export const SubscriptionDetails = ({ serviceName, resourceType, items, partialRenderer }) => {
  if (!items || !resourceType) return null;

  return (
    <div id={`services.${serviceName}.subscriptions.id.${resourceType}.details`}>
      {Object.entries(items).map(([subscriptionKey, subscriptionData]) => {
        const resources = subscriptionData?.[resourceType] || {};
        return Object.entries(resources).map(([resourceKey, resource]) => (
          <div
            key={resourceKey}
            className="list-group"
            id={`services.${serviceName}.subscriptions.${subscriptionKey}.${resourceType}.${resourceKey}.view`}
          >
            {/* Instead of Handlebars partial, call a renderer function passed as prop */}
            {partialRenderer({
              serviceName,
              subscription: subscriptionKey,
              resourceType,
              resourceKey,
              resource,
            })}
          </div>
        ));
      })}
    </div>
  );
};

// ---------------- LeftMenuForSubscription ----------------
//left_menu_for_subscription
export const LeftMenuForSubscription = ({
  serviceName,
  resourceType,
  items,
  getValueAt, // function to fetch counts (replace with your implementation)
  serviceGroup,
}) => {
  if (!items || !resourceType) return null;

  return (
    <div id={`services.${serviceName}.subscriptions.id.${resourceType}.list`}>
      <div className="list-group">
        <div className="list-group-item">
          <a href={`#services.${serviceName}.subscriptions.id.${resourceType}`}>
            Show all{" "}
            <span className="badge float-right btn-info">
              {getValueAt("metadata", serviceGroup, serviceName, "resources", resourceType, "count")}
            </span>
          </a>
        </div>
      </div>

      {Object.entries(items).map(([subscriptionKey, subscriptionData]) => {
        const resources = subscriptionData?.[resourceType] || {};
        return (
          <div
            key={subscriptionKey}
            className="list-group"
            id={`services.${serviceName}.subscriptions.${subscriptionKey}.${resourceType}.list`}
          >
            <div className="list-group-item active">
              <a
                href={`#services.${serviceName}.subscriptions.${subscriptionKey}.${resourceType}`}
              >
                {subscriptionKey}
              </a>
              <span className="float-right">
                {/* Replace hideList with a React handler if you want collapsible behavior */}
                <a
                  href={`#`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(
                      `services.${serviceName}.subscriptions.${subscriptionKey}.${resourceType}.list`
                    );
                    if (el) el.style.display = "none";
                  }}
                >
                  <i className="fa fa-times-circle"></i>
                </a>
              </span>
            </div>

            <div className="list-group-item">
              {Object.entries(resources).map(([resourceKey, resource]) => (
                <div
                  key={resourceKey}
                  className="list-group-item list-sub-element"
                  id={`services.${serviceName}.subscriptions.${subscriptionKey}.${resourceType}.${resourceKey}.link`}
                >
                  {resource.scout2_link ? (
                    <a href={`#${resource.scout2_link}.view`}>{resource.name}</a>
                  ) : (
                    <a
                      href={`#services.${serviceName}.subscriptions.${subscriptionKey}.${resourceType}.${resourceKey}.view`}
                    >
                      {resource.name}
                    </a>
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

// ---------------- AADApplication ----------------
//services.aad.applications
// ---------- AAD Applications ----------
export const AadApplications = ({ data }) => {
  if (!data) return null;

  // Extract the applications from data
  const applications = Object.values(data).map((item) => item);

  if (!applications || applications.length === 0) return null;

  // Helper function to display values
  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  return (
    <div className="mt-4">
      <Card title="AAD Applications">
        <div className="grid grid-cols-1 gap-3">
          {applications.map((app, idx) => (
            <div key={idx} className="rounded-xl border border-gray-800 p-3">
              <div className="font-semibold text-gray-100 mb-3">{app.name}</div>

              {/* Basic Info */}
              <div className="space-y-2 text-sm">
                <InfoRow label="ID" value={valueOrNone(app.id)} />
                <InfoRow label="App ID" value={valueOrNone(app.app_id)} />
                <InfoRow label="Type" value={valueOrNone(app.object_type)} />
                <InfoRow label="Sign In Audience" value={valueOrNone(app.sign_in_audience)} />
                <InfoRow label="Publisher Domain" value={valueOrNone(app.publisher_domain)} />
                <InfoRow label="Available To Other Tenants" value={valueOrNone(app.available_to_other_tenants)} />
                <InfoRow label="Allow Guests Sign-In" value={valueOrNone(app.allow_guests_sign_in)} />
                <InfoRow label="Allow Passthrough Users" value={valueOrNone(app.allow_passthrough_users)} />
                <InfoRow label="Public Client" value={valueOrNone(app.public_client)} />
                <InfoRow label="Device-Only Auth Supported" value={valueOrNone(app.is_device_only_auth_supported)} />
                <InfoRow label="Pre-Authorized Applications" value={valueOrNone(app.pre_authorized_applications)} />
                <InfoRow label="Deletion Timestamp" value={valueOrNone(app.deletion_timestamp)} />
              </div>

              {/* Password Credentials */}
              {app.password_credentials && app.password_credentials.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-200">
                    Password Credentials ({app.password_credentials.length})
                  </h4>
                  <ul className="mt-2 space-y-2 text-sm text-gray-400">
                    {app.password_credentials.map((cred, i) => (
                      <li key={i} className="border border-gray-800 rounded-md p-2">
                        <div>ID: <samp>{valueOrNone(cred.key_id)}</samp></div>
                        <div>Start Date: {valueOrNone(cred.start_date)}</div>
                        <div>End Date: {valueOrNone(cred.end_date)}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
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

  // Helper function for formatting values
  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  return (
    <div className="mt-4">
      <Card title="AAD Groups">
        <div className="grid grid-cols-1 gap-3">
          {groups.map((group, idx) => (
            <div key={idx} className="rounded-xl border border-gray-800 p-3">
              {/* Group Name */}
              <div className="font-semibold text-gray-100 mb-3">{group.name}</div>

              {/* Information */}
              <div className="space-y-2 text-sm">
                <InfoRow label="Name" value={valueOrNone(group.name)} />
                <InfoRow label="Type" value={valueOrNone(group.object_type)} />
                <InfoRow label="Mail Nickname" value={valueOrNone(group.mail_nickname)} />
                <InfoRow label="Mail Status" value={<BooleanPill value={group.mail_enabled} />} />
                <InfoRow label="Mail" value={valueOrNone(group.mail)} />
                <InfoRow label="Security Status" value={<BooleanPill value={group.security_enabled} />} />
                <InfoRow label="Deletion Timestamp" value={valueOrNone(group.deletion_timestamp)} />
              </div>

              {/* Role Assignments */}
              {group.roles && group.roles.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-200">
                    Role Assignments ({group.roles.length})
                  </h4>
                  <ul className="mt-2 space-y-2 text-sm text-gray-400">
                    {group.roles.map((role, i) => (
                      <li key={i} className="border border-gray-800 rounded-md p-2">
                        <span>
                          {role.name ?? "Unknown Role"} (subscription{" "}
                          <samp>{role.subscription_id}</samp>)
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Members */}
              {group.users && group.users.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-200">
                    Members ({group.users.length})
                  </h4>
                  <ul className="mt-2 space-y-2 text-sm text-gray-400">
                    {group.users.map((user, i) => (
                      <li key={i} className="border border-gray-800 rounded-md p-2">
                        {user.name ?? user} {/* fallback to id if no name */}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};


//services.aad.service_principals
// ---------- AAD Service Principals ----------
export const AadServicePrincipals = ({ data }) => {
  if (!data) return null;

  const principals = Object.values(data).map((item) => item);
  if (!principals || principals.length === 0) return null;

  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  return (
    <div className="mt-4">
      <Card title="AAD Service Principals">
        <div className="grid grid-cols-1 gap-3">
          {principals.map((sp, idx) => (
            <div key={idx} className="rounded-xl border border-gray-800 p-3">
              {/* Title */}
              <div className="font-semibold text-gray-100 mb-3">{sp.name}</div>

              {/* Info Section */}
              <div className="space-y-2 text-sm">
                <InfoRow label="ID" value={valueOrNone(sp.id)} />

                {/* Tags */}
                <div className="flex items-start justify-between">
                  <span className="text-gray-300">Tags</span>
                  <div className="flex flex-wrap gap-1">
                    {sp.tags && sp.tags.length > 0 ? (
                      sp.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="rounded-md bg-gray-600 px-2 py-0.5 text-xs text-gray-100"
                        >
                          {valueOrNone(tag)}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </div>
                </div>

                <InfoRow
                  label="Status"
                  value={<BooleanPill value={sp.account_enabled} />}
                />

                <InfoRow label="App" value={valueOrNone(sp.app_name)} />
                <InfoRow
                  label="App Owner Tenant ID"
                  value={valueOrNone(sp.app_owner_tenant_id)}
                />
                <InfoRow
                  label="App Role Assignment Required"
                  value={valueOrNone(sp.app_role_assignment_required)}
                />
                <InfoRow label="Type" value={valueOrNone(sp.object_type)} />
                <InfoRow
                  label="Service Principal Type"
                  value={valueOrNone(sp.service_principal_type)}
                />
                <InfoRow
                  label="Publisher Name"
                  value={valueOrNone(sp.publisher_name)}
                />
                <InfoRow
                  label="Deletion Timestamp"
                  value={valueOrNone(sp.deletion_timestamp)}
                />
              </div>

              {/* Roles */}
              {sp.roles && sp.roles.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-200">
                    Roles ({sp.roles.length})
                  </h4>
                  <ul className="mt-2 space-y-2 text-sm text-gray-400">
                    {sp.roles.map((role, i) => (
                      <li
                        key={i}
                        className="border border-gray-800 rounded-md p-2"
                      >
                        {role.name ?? "Unknown Role"} (subscription{" "}
                        <samp>{role.subscription_id}</samp>)
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Keys */}
              {sp.key_credentials && sp.key_credentials.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-200">
                    Keys ({sp.key_credentials.length})
                  </h4>
                  <ul className="mt-2 space-y-3 text-sm text-gray-400">
                    {sp.key_credentials.map((key, i) => (
                      <li
                        key={i}
                        className="border border-gray-800 rounded-md p-2"
                      >
                        <div>ID: <samp>{valueOrNone(key.key_id)}</samp></div>
                        <div>Type: <samp>{valueOrNone(key.type)}</samp></div>
                        <div>Usage: <samp>{valueOrNone(key.usage)}</samp></div>
                        <div>
                          Start Date: {key.start_date ?? "None"}
                        </div>
                        <div>
                          End Date: {key.end_date ?? "None"}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};


//services.aad.users
// ---------------- AAD Users ----------------

// Utility functions
const valueOrNone = (val) => (val ? val : "None");
const convertBoolToEnabled = (val) => (val ? "Enabled" : "Disabled");

// Count badge like in Handlebars {{> count_badge}}
const CountBadge = ({ count }) => (
  <span
    style={{
      background: "#777",
      borderRadius: "10px",
      padding: "2px 6px",
      color: "white",
      fontSize: "0.8rem",
      marginLeft: "6px",
    }}
  >
    {count}
  </span>
);

// ---------- AAD Users ----------
export const AadUsers = ({ data }) => {
  if (!data) return null;

  const users = Object.values(data).map((item) => item);
  if (!users || users.length === 0) return null;

  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  return (
    <div className="mt-4">
      <Card title="AAD Users">
        <div className="grid grid-cols-1 gap-3">
          {users.map((user, idx) => (
            <div key={idx} className="rounded-xl border border-gray-800 p-3">
              {/* Title */}
              <div className="font-semibold text-gray-100 mb-3">{user.name}</div>

              {/* Info Section */}
              <div className="space-y-2 text-sm">
                <InfoRow label="Principal Name" value={valueOrNone(user.name)} />
                <InfoRow
                  label="Display Name"
                  value={valueOrNone(user.display_name)}
                />
                <InfoRow label="Given Name" value={valueOrNone(user.given_name)} />
                <InfoRow label="Surname" value={valueOrNone(user.surname)} />
                <InfoRow
                  label="Mail Nickname"
                  value={valueOrNone(user.mail_nickname)}
                />
                <InfoRow label="Mail" value={valueOrNone(user.mail)} />
                <InfoRow
                  label="Sign-In Names"
                  value={valueOrNone(user.sign_in_names)}
                />
                <InfoRow label="Type" value={valueOrNone(user.user_type)} />
                <InfoRow
                  label="Status"
                  value={<BooleanPill value={user.account_enabled} />}
                />
                <InfoRow
                  label="Usage Location"
                  value={valueOrNone(user.usage_location)}
                />
                <InfoRow
                  label="Deletion Timestamp"
                  value={valueOrNone(user.deletion_timestamp)}
                />
              </div>

              {/* Roles */}
              {user.roles && user.roles.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-200">
                    Roles ({user.roles.length})
                  </h4>
                  <ul className="mt-2 space-y-2 text-sm text-gray-400">
                    {user.roles.map((role, i) => (
                      <li
                        key={i}
                        className="border border-gray-800 rounded-md p-2"
                      >
                        {role.name ?? "Unknown Role"} (subscription{" "}
                        <samp>{role.subscription_id}</samp>)
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Groups */}
              {user.groups && user.groups.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-200">
                    Groups ({user.groups.length})
                  </h4>
                  <ul className="mt-2 space-y-2 text-sm text-gray-400">
                    {user.groups.map((group, i) => (
                      <li
                        key={i}
                        className="border border-gray-800 rounded-md p-2"
                      >
                        {group.name ?? "Unknown Group"}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};


//services.appservice.subscriptions.id.web_apps
// ---------------- App Service Web App ----------------

// ---------- App Service Web Apps ----------
export const AppServiceWebApps = ({ data }) => {
  if (!data) return null;

  const webApps = Object.values(data);
  if (!webApps || webApps.length === 0) return null;

  const valueOrNone = (value) => {
    if (value === false) return "false";
    if (value === true) return "true";
    return value ?? "None";
  };

  return (
    <div className="mt-4">
      <Card title="App Service Web Apps">
        <div className="grid grid-cols-1 gap-3">
          {webApps.map((app, idx) => (
            <div key={idx} className="rounded-xl border border-gray-800 p-3">
              {/* Title */}
              <div className="font-semibold text-gray-100 mb-3">{app.name}</div>

              {/* Information */}
              <Section title="Information">
                <InfoRow label="Name" value={valueOrNone(app.name)} />
                <InfoRow label="Resource Group" value={valueOrNone(app.resource_group)} />
                <InfoRow label="Repository Site Name" value={valueOrNone(app.repository_site_name)} />
                <InfoRow label="Location" value={valueOrNone(app.location)} />
                <InfoRow label="Last Modified Time" value={valueOrNone(app.last_modified_time_utc)} />
                <InfoRow label="State" value={valueOrNone(app.state)} />
                <InfoRow label="Usage State" value={valueOrNone(app.usage_state)} />
                <InfoRow label="Availability State" value={valueOrNone(app.availability_state)} />
                <InfoRow label="Kind" value={valueOrNone(app.kind)} />
                <InfoRow label="Programming Language" value={valueOrNone(app.programming_language)} />
                <InfoRow label="Programming Language Version" value={valueOrNone(app.programming_language_version)} />

                <div className="flex flex-wrap gap-2">
                  <span className="text-gray-300">Tags:</span>
                  {app.tags && app.tags.length > 0 ? (
                    app.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="rounded bg-gray-600 px-2 py-1 text-xs text-gray-100"
                      >
                        {valueOrNone(tag)}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">None</span>
                  )}
                </div>
              </Section>

              {/* Configuration */}
              <Section title="Configuration">
                <InfoRow
                  label="Authentication"
                  value={<BooleanPill value={app.authentication_enabled} />}
                />
                <InfoRow
                  label="HTTPS-Only Traffic"
                  value={<BooleanPill value={app.https_only} />}
                />
                <InfoRow
                  label="HTTP/2.0 Support"
                  value={<BooleanPill value={app.http_2_enabled} />}
                />
                <InfoRow
                  label="HTTP Logging"
                  value={<BooleanPill value={app.http_logging_enabled} />}
                />
                <InfoRow
                  label="FTP Deployment"
                  value={<BooleanPill value={app.ftp_deployment_enabled} />}
                />
                <InfoRow
                  label="Minimum TLS Version Supported"
                  value={valueOrNone(app.minimum_tls_version_supported)}
                />
                <InfoRow
                  label="Client Certificates"
                  value={<BooleanPill value={app.client_cert_enabled} />}
                />
              </Section>

              {/* Identities */}
              {app.identity && (
                <Section title="Identities">
                  <InfoRow
                    label="System Assigned Identity"
                    value={valueOrNone(app.identity?.principal_id)}
                  />
                  {app.identity.user_assigned_identities && (
                    <div className="mt-2">
                      <span className="text-gray-300">User Assigned Identities:</span>
                      <ul className="list-disc ml-5 text-gray-400">
                        {Object.values(app.identity.user_assigned_identities).map(
                          (u, i) => (
                            <li key={i}>
                              <samp>{u.principal_id}</samp>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </Section>
              )}

              {/* Networking */}
              <Section title="Networking">
                <InfoRow
                  label="Default Host Name"
                  value={valueOrNone(app.default_host_name)}
                />
                <div className="mt-2">
                  <span className="text-gray-300">Outbound IP Addresses:</span>
                  <ul className="list-disc ml-5 text-gray-400">
                    {app.outbound_ip_addresses?.map((ip, i) => (
                      <li key={i}>
                        <samp>{ip}</samp>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-2">
                  <span className="text-gray-300">Possible Outbound IP Addresses:</span>
                  <ul className="list-disc ml-5 text-gray-400">
                    {app.possible_outbound_ip_addresses?.map((ip, i) => (
                      <li key={i}>
                        <samp>{ip}</samp>
                      </li>
                    ))}
                  </ul>
                </div>
              </Section>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// Section wrapper
const Section = ({ title, children }) => (
  <div className="mt-4">
    <h4 className="text-sm font-semibold text-gray-200 mb-2">{title}</h4>
    <div className="space-y-2 text-sm">{children}</div>
  </div>
);


// ---------------- Key Vault ----------------
//services.keyvault.subscriptions.id.vaults

// ---------------- KeyVaultVault ----------------
export const KeyVaultVault = ({ vault, subscriptionId, vaultKey }) => {
  if (!vault) return null;

  return (
    <div>
      {/* Resource Name */}
      <div id="resource-name" className="list-group-item active">
        <h4 className="list-group-item-heading">{vault.name}</h4>
      </div>

      {/* Information Section */}
      <div className="list-group-item">
        <h4 className="list-group-item-heading">Information</h4>

        <div className="list-group-item-text item-margin">
          ID:{" "}
          <span
            id={`keyvault.subscriptions.${subscriptionId}.vaults.${vaultKey}.id`}
          >
            <samp>{vault.id}</samp>
          </span>
        </div>

        <div className="list-group-item-text item-margin">
          Location:{" "}
          <span
            id={`keyvault.subscriptions.${subscriptionId}.vaults.${vaultKey}.location`}
          >
            <samp>{vault.location || "None"}</samp>
          </span>
        </div>

        <div className="list-group-item-text item-margin">
          Public Access:{" "}
          <span
            id={`keyvault.subscriptions.${subscriptionId}.vaults.${vaultKey}.public_access_allowed`}
          >
            {vault.public_access_allowed ? "Enabled" : "Disabled"}
          </span>
        </div>

        <div className="list-group-item-text item-margin">
          Vault Recoverable:{" "}
          <span
            id={`keyvault.subscriptions.${subscriptionId}.vaults.${vaultKey}.recovery_protection_enabled`}
          >
            {vault.recovery_protection_enabled ? "Yes" : "No"}
          </span>
        </div>

        <div className="list-group-item-text item-margin">
          RBAC Permission Model:{" "}
          <span
            id={`keyvault.subscriptions.${subscriptionId}.vaults.${vaultKey}.rbac_authorization_enabled`}
          >
            {vault.rbac_authorization_enabled ? "Enabled" : "Disabled"}
          </span>
        </div>

        <div className="list-group-item-text item-margin">
          Tags:{" "}
          {vault.tags && Object.keys(vault.tags).length > 0 ? (
            Object.values(vault.tags).map((tag, idx) => (
              <div
                key={idx}
                style={{
                  borderRadius: "5px",
                  backgroundColor: "#c2c2d6",
                  padding: "0.1px",
                  textAlign: "center",
                  display: "inline-flex",
                  marginRight: "8px",
                }}
              >
                <samp>{tag || "None"}</samp>
              </div>
            ))
          ) : (
            <div style={{ display: "inline-flex" }}>
              <samp>None</samp>
            </div>
          )}
        </div>

        <div className="list-group-item-text item-margin">
          Resource group:{" "}
          <span
            id={`keyvault.subscriptions.${subscriptionId}.vaults.${vaultKey}.resource_group_name`}
          >
            <samp>{vault.resource_group_name || "None"}</samp>
          </span>
        </div>
      </div>
    </div>
  );
};


// ---------- Diagnostic Settings ----------
// ---------------- LoggingMonitoringDiagnostics ----------------
export const LoggingMonitoringDiagnostics = ({ data }) => {
  if (!data) return null;

  return (
    <div>
      {Object.entries(data).map(([subscriptionId, subscriptionData]) => {
        if (!subscriptionData.diagnostic_settings) return null;

        return Object.entries(subscriptionData.diagnostic_settings).map(
          ([diagId, diag]) => (
            <div key={`${subscriptionId}-${diagId}`}>
              {/* Resource Name */}
              <div id="resource-name" className="list-group-item active">
                <h4 className="list-group-item-heading">{diagId}</h4>
              </div>

              {/* Information */}
              <div className="list-group-item">
                <h4 className="list-group-item-heading">Information</h4>
                <div className="list-group-item-text item-margin">
                  Diagnostic setting exists:{" "}
                  <span>
                    <samp>
                      {String(diag.diagnostic_exist)}
                    </samp>
                  </span>
                </div>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

// ---------------- LoggingMonitoringLogProfiles ----------------
export const LoggingMonitoringLogProfiles = ({ data }) => {
  if (!data) return null;

  return (
    <div>
      {Object.entries(data).map(([subscriptionId, subscriptionData]) => {
        if (!subscriptionData.log_profiles) return null;

        return Object.entries(subscriptionData.log_profiles).map(
          ([logProfileId, logProfile]) => (
            <div key={`${subscriptionId}-${logProfileId}`}>
              {/* Resource Name */}
              <div id="resource-name" className="list-group-item active">
                <h4 className="list-group-item-heading">{logProfile.name}</h4>
              </div>

              {/* Information */}
              <div className="list-group-item">
                <h4 className="list-group-item-heading">Information</h4>

                <div className="list-group-item-text item-margin">
                  Name:{" "}
                  <span>
                    <samp>{logProfile.name || "None"}</samp>
                  </span>
                </div>

                <div className="list-group-item-text item-margin">
                  Storage account id:{" "}
                  <span>
                    <samp>{logProfile.storage_account_id || "None"}</samp>
                  </span>
                </div>

                <div className="list-group-item-text item-margin">
                  Captures all activities:{" "}
                  <span>
                    <samp>{String(logProfile.captures_all_activities)}</samp>
                  </span>
                </div>

                <div className="list-group-item-text item-margin">
                  Retention policy enabled:{" "}
                  <span>
                    <samp>{String(logProfile.retention_policy_enabled)}</samp>
                  </span>
                </div>

                <div className="list-group-item-text item-margin">
                  Retention policy days:{" "}
                  <span>
                    <samp>{logProfile.retention_policy_days ?? "None"}</samp>
                  </span>
                </div>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};


// ---------- Resource Logging ----------
// ---------------- LoggingMonitoringResourcesLogging ----------------
export const LoggingMonitoringResourcesLogging = ({ data }) => {
  if (!data) return null;

  return (
    <div>
      {Object.entries(data).map(([subscriptionId, subscriptionData]) => {
        if (!subscriptionData.resources_logging) return null;

        return Object.entries(subscriptionData.resources_logging).map(
          ([resourceId, resource]) => (
            <div key={`${subscriptionId}-${resourceId}`}>
              {/* Resource Name */}
              <div id="resource-name" className="list-group-item active">
                <h4 className="list-group-item-heading">{resource.name}</h4>
              </div>

              {/* Information */}
              <div className="list-group-item">
                <h4 className="list-group-item-heading">Information</h4>
                <div className="list-group-item-text item-margin">
                  Logging for key vault enabled:{" "}
                  <span>
                    <samp>
                      {resource.diagnostic_key_vault?.audit_event_enabled
                        ? "Enabled"
                        : "Disabled"}
                    </samp>
                  </span>
                </div>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};


  // ---------------- MySQLDatabaseServers ----------------
export const MySQLDatabaseServers = ({ data }) => {
  if (!data) return null;

  return (
    <div>
      {Object.entries(data).map(([subscriptionId, subscriptionData]) => {
        if (!subscriptionData.servers) return null;

        return Object.entries(subscriptionData.servers).map(
          ([serverId, server]) => (
            <div key={`${subscriptionId}-${serverId}`}>
              {/* Resource Name */}
              <div id="resource-name" className="list-group-item active">
                <h4 className="list-group-item-heading">{server.name}</h4>
              </div>

              {/* Information */}
              <div className="list-group-item">
                <h4 className="list-group-item-heading">Information</h4>
                <div className="list-group-item-text item-margin">
                  MySQL Server Name:{" "}
                  <span
                    id={`mysqldatabase.subscriptions.${subscriptionId}.servers.${serverId}.name`}
                  >
                    {server.name || "N/A"}
                  </span>
                </div>
                <div className="list-group-item-text item-margin">
                  Server SSL connection enforcement:{" "}
                  <span
                    id={`mysqldatabase.subscriptions.${subscriptionId}.servers.${serverId}.ssl_enforcement`}
                  >
                    {server.ssl_enforcement || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};


// ---------------- NetworkApplicationSecurityGroups ----------------
export const NetworkApplicationSecurityGroups = ({ data }) => {
  if (!data) return null;

  return (
    <div>
      {Object.entries(data).map(([subscriptionId, subscriptionData]) => {
        if (!subscriptionData.application_security_groups) return null;

        return Object.entries(
          subscriptionData.application_security_groups
        ).map(([asgId, asg]) => (
          <div key={`${subscriptionId}-${asgId}`}>
            {/* Resource Name */}
            <div id="resource-name" className="list-group-item active">
              <h4 className="list-group-item-heading">{asg.name}</h4>
            </div>

            {/* Information */}
            <div className="list-group-item">
              <h4 className="list-group-item-heading">Information</h4>

              <div className="list-group-item-text item-margin">
                Name:{" "}
                <span
                  id={`network.subscriptions.${subscriptionId}.application_security_groups.${asgId}.name`}
                >
                  <samp>{asg.name || "None"}</samp>
                </span>
              </div>

              <div className="list-group-item-text item-margin">
                Location:{" "}
                <span
                  id={`network.subscriptions.${subscriptionId}.application_security_groups.${asgId}.location`}
                >
                  <samp>{asg.location || "None"}</samp>
                </span>
              </div>

              <div className="list-group-item-text item-margin">
                Provisioning State:{" "}
                <span
                  id={`network.subscriptions.${subscriptionId}.application_security_groups.${asgId}.provisioning_state`}
                >
                  <samp>{asg.provisioning_state || "None"}</samp>
                </span>
              </div>

              <div className="list-group-item-text item-margin">
                Tags:{" "}
                {asg.tags && Object.keys(asg.tags).length > 0 ? (
                  Object.entries(asg.tags).map(([key, value]) => (
                    <div
                      key={key}
                      style={{
                        borderRadius: "5px",
                        backgroundColor: "#c2c2d6",
                        padding: "0.1px",
                        textAlign: "center",
                        display: "inline-flex",
                        marginRight: "5px",
                      }}
                    >
                      <samp>{value || "None"}</samp>
                    </div>
                  ))
                ) : (
                  <div style={{ display: "inline-flex" }}>
                    <samp>None</samp>
                  </div>
                )}
              </div>

              <div className="list-group-item-text item-margin">
                Resource group:{" "}
                <span
                  id={`network.subscriptions.${subscriptionId}.application_security_groups.${asgId}.resource_group_name`}
                >
                  <samp>{asg.resource_group_name || "None"}</samp>
                </span>
              </div>
            </div>

            {/* Attached Network Interfaces */}
            <div className="list-group-item">
              <h4 className="list-group-item-heading">
                Attached Network Interfaces
              </h4>
              {asg.network_interfaces && asg.network_interfaces.length > 0 ? (
                asg.network_interfaces.map((nic, index) => (
                  <div
                    key={index}
                    className="list-group-item-text item-margin"
                  >
                    {/* In original template it links to JS function.
                        Here we just show the name/id */}
                    <samp>{nic}</samp>
                  </div>
                ))
              ) : (
                <div className="list-group-item-text item-margin">
                  <samp>None</samp>
                </div>
              )}
            </div>
          </div>
        ));
      })}
    </div>
  );
};

  
// ---------------- NetworkNetworkInterfaces ----------------
export const NetworkNetworkInterfaces = ({ data }) => {
  if (!data) return null;

  return (
    <div>
      {Object.entries(data).map(([subscriptionId, subscriptionData]) => {
        if (!subscriptionData.network_interfaces) return null;

        return Object.entries(subscriptionData.network_interfaces).map(
          ([nicId, nic]) => (
            <div key={`${subscriptionId}-${nicId}`}>
              {/* Resource Name */}
              <div id="resource-name" className="list-group-item active">
                <h4 className="list-group-item-heading">{nic.name}</h4>
              </div>

              {/* Information */}
              <div className="list-group-item">
                <h4 className="list-group-item-heading">Information</h4>

                <Field label="Provisioning State" value={nic.provisioning_state} />
                <Field label="Primary" value={nic.primary} />
                <Field label="IP Configurations" value={nic.ip_configurations} />
                <Field label="Mac Address" value={nic.mac_address} />
                <Field label="Interface Endpoint" value={nic.interface_endpoint} />

                <div className="list-group-item-text item-margin">
                  Network Security Group:{" "}
                  {nic.network_security_group ? (
                    <samp>{nic.network_security_group}</samp>
                  ) : (
                    <samp>None</samp>
                  )}
                </div>

                <Field
                  label="Enable IP Forwarding"
                  value={nic.enable_ip_forwarding}
                />
                <Field
                  label="Enable Accelerated Networking"
                  value={nic.enable_accelerated_networking}
                />

                <div className="list-group-item-text item-margin">
                  Tags:{" "}
                  {nic.tags && Object.keys(nic.tags).length > 0 ? (
                    Object.entries(nic.tags).map(([key, value]) => (
                      <div
                        key={key}
                        style={{
                          borderRadius: "5px",
                          backgroundColor: "#c2c2d6",
                          padding: "0.1px",
                          textAlign: "center",
                          display: "inline-flex",
                          marginRight: "5px",
                        }}
                      >
                        <samp>{value || "None"}</samp>
                      </div>
                    ))
                  ) : (
                    <div style={{ display: "inline-flex" }}>
                      <samp>None</samp>
                    </div>
                  )}
                </div>

                <Field
                  label="Resource Group"
                  value={nic.resource_group_name}
                />
              </div>

              {/* IP Configuration */}
              {nic.ip_configuration && (
                <div className="list-group-item">
                  <h4 className="list-group-item-heading">IP Configuration</h4>

                  <Field label="Name" value={nic.ip_configuration.name} />
                  <Field
                    label="Provisioning State"
                    value={nic.ip_configuration.provisioning_state}
                  />
                  <Field
                    label="Primary"
                    value={nic.ip_configuration.primary}
                  />
                  <Field
                    label="Public IP Address"
                    value={nic.ip_configuration.public_ip_address?.ip_address}
                  />
                  <Field
                    label="Private IP Address"
                    value={nic.ip_configuration.private_ip_address}
                  />
                  <Field
                    label="Private IP Allocation Method"
                    value={nic.ip_configuration.private_ip_allocation_method}
                  />
                  <Field
                    label="Private IP Address Version"
                    value={nic.ip_configuration.private_ip_address_version}
                  />

                  <div className="list-group-item-text item-margin">
                    Subnet:{" "}
                    <samp>
                      {nic.ip_configuration.subnet?.name || "None"}
                    </samp>
                  </div>

                  {/* Application Security Groups */}
                  <div className="list-group-item-text item-margin">
                    Application Security Groups:{" "}
                    {nic.ip_configuration.application_security_groups &&
                    nic.ip_configuration.application_security_groups.length > 0 ? (
                      <ul>
                        {nic.ip_configuration.application_security_groups.map(
                          (asg, idx) => (
                            <li key={idx}>
                              <samp>{asg}</samp>
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      <samp>None</samp>
                    )}
                  </div>

                  <Field
                    label="Application Gateway Backend Address Pools"
                    value={
                      nic.ip_configuration.application_gateway_backend_address_pools
                    }
                  />
                  <Field
                    label="Load Balancer Backend Address Pools"
                    value={
                      nic.ip_configuration.load_balancer_backend_address_pools
                    }
                  />
                  <Field
                    label="Load Balancer Inbound NAT Rules"
                    value={
                      nic.ip_configuration.load_balancer_inbound_nat_rules
                    }
                  />
                  <Field
                    label="Virtual Network Taps"
                    value={nic.ip_configuration.virtual_network_taps}
                  />
                </div>
              )}
            </div>
          )
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
export const NetworkSecurityGroups = ({ data }) => {
  if (!data) return null;

  return (
    <div>
      {Object.entries(data).map(([subscriptionId, subscriptionData]) => {
        const securityGroups =
          subscriptionData?.security_groups || {};

        return (
          <div key={subscriptionId}>
            <h3>Subscription: {subscriptionId}</h3>
            {Object.entries(securityGroups).map(
              ([sgId, sgData]) => (
                <div key={sgId} className="list-group">
                  {/* Heading */}
                  <div id="resource-name" className="list-group-item active">
                    <h4 className="list-group-item-heading">
                      {sgData.name}
                    </h4>
                  </div>

                  {/* Info */}
                  <div className="list-group-item">
                    <h4 className="list-group-item-heading">
                      Information
                    </h4>
                    <div className="list-group-item-text item-margin">
                      Name: <span>{sgData.name}</span>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Location: <span>{sgData.location}</span>
                    </div>
                    <div className="list-group-item-text item-margin">
                      State: <span>{sgData.provisioning_state}</span>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Tags:{" "}
                      {sgData.tags && Object.keys(sgData.tags).length > 0 ? (
                        Object.entries(sgData.tags).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              style={{
                                borderRadius: "5px",
                                backgroundColor: "#c2c2d6",
                                padding: "2px 5px",
                                margin: "2px",
                                display: "inline-flex",
                              }}
                            >
                              <samp>{value || "None"}</samp>
                            </div>
                          )
                        )
                      ) : (
                        <div style={{ display: "inline-flex" }}>
                          <samp>None</samp>
                        </div>
                      )}
                    </div>
                    <div className="list-group-item-text item-margin">
                      Resource group:{" "}
                      <span>
                        {sgData.resource_group_name || "None"}
                      </span>
                    </div>
                  </div>

                  {/* Inbound rules */}
                  <div className="list-group-item">
                    <div className="accordion">
                      <h4 className="list-group-item-heading">
                        Inbound Security Rules
                      </h4>
                      <table className="table-striped" width="100%">
                        <thead>
                          <tr className="table-padding">
                            <td>Priority</td>
                            <td>Name</td>
                            <td>Protocol</td>
                            <td>Source Port</td>
                            <td>Source Filter</td>
                            <td>Destination Port</td>
                            <td>Destination Filter</td>
                            <td>Action</td>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.values(sgData.security_rules || {})
                            .filter((r) => r.direction === "Inbound")
                            .sort((a, b) => a.priority - b.priority)
                            .map((rule, idx) => (
                              <tr key={idx}>
                                <td className="text-center">
                                  {rule.priority}
                                </td>
                                <td>{rule.name}</td>
                                <td className="text-center">
                                  {rule.protocol}
                                </td>
                                <td className="text-center">
                                  {rule.source_port_ranges}
                                </td>
                                <td className="text-center">
                                  {rule.source_address_prefixes}
                                </td>
                                <td className="text-center">
                                  {rule.destination_port_ranges}
                                </td>
                                <td className="text-center">
                                  {rule.destination_address_prefixes}
                                </td>
                                <td className="text-center">
                                  {rule.allow ? (
                                    <i className="fa fa-check-circle finding-good"></i>
                                  ) : (
                                    <i className="fa fa-times-circle finding-danger"></i>
                                  )}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Outbound rules */}
                  <div className="list-group-item">
                    <div className="accordion">
                      <h4 className="list-group-item-heading">
                        Outbound Security Rules
                      </h4>
                      <table className="table-striped" width="100%">
                        <thead>
                          <tr className="table-padding">
                            <td>Priority</td>
                            <td>Name</td>
                            <td>Protocol</td>
                            <td>Source Port</td>
                            <td>Source Filter</td>
                            <td>Destination Port</td>
                            <td>Destination Filter</td>
                            <td>Action</td>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.values(sgData.security_rules || {})
                            .filter((r) => r.direction === "Outbound")
                            .sort((a, b) => a.priority - b.priority)
                            .map((rule, idx) => (
                              <tr key={idx}>
                                <td className="text-center">
                                  {rule.priority}
                                </td>
                                <td>{rule.name}</td>
                                <td className="text-center">
                                  {rule.protocol}
                                </td>
                                <td className="text-center">
                                  {rule.source_port_ranges}
                                </td>
                                <td className="text-center">
                                  {rule.source_address_prefixes}
                                </td>
                                <td className="text-center">
                                  {rule.destination_port_ranges}
                                </td>
                                <td className="text-center">
                                  {rule.destination_address_prefixes}
                                </td>
                                <td className="text-center">
                                  {rule.allow ? (
                                    <i className="fa fa-check-circle finding-good"></i>
                                  ) : (
                                    <i className="fa fa-times-circle finding-danger"></i>
                                  )}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Subnets */}
                  <div className="list-group-item">
                    <h4 className="list-group-item-heading">
                      Attached Subnets
                    </h4>
                    {sgData.subnets?.length > 0 ? (
                      sgData.subnets.map((subnet, idx) => (
                        <div
                          key={idx}
                          className="list-group-item-text item-margin"
                        >
                          <samp>{subnet.name}</samp> (
                          <samp>{subnet.virtual_network_name}</samp>)
                        </div>
                      ))
                    ) : (
                      <div className="list-group-item-text item-margin">
                        <samp>None</samp>
                      </div>
                    )}
                  </div>

                  {/* Interfaces */}
                  <div className="list-group-item">
                    <h4 className="list-group-item-heading">
                      Attached Network Interfaces
                    </h4>
                    {sgData.network_interfaces?.length > 0 ? (
                      sgData.network_interfaces.map((ni, idx) => (
                        <div
                          key={idx}
                          className="list-group-item-text item-margin"
                        >
                          <samp>{ni.name}</samp>
                        </div>
                      ))
                    ) : (
                      <div className="list-group-item-text item-margin">
                        <samp>None</samp>
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        );
      })}
    </div>
  );
};

  
  // ---------------- Virtual Networks ----------------
export const VirtualNetworks = ({ data }) => {
  if (!data) return null;

  return (
    <div>
      {Object.entries(data).map(([subscriptionId, subscriptionData]) => {
        const virtualNetworks =
          subscriptionData?.virtual_networks || {};

        return (
          <div key={subscriptionId}>
            <h3>Subscription: {subscriptionId}</h3>

            {Object.entries(virtualNetworks).map(
              ([vnetId, vnetData]) => (
                <div key={vnetId} className="list-group">
                  {/* Header */}
                  <div id="resource-name" className="list-group-item active">
                    <h4 className="list-group-item-heading">
                      {vnetData.name}
                    </h4>
                  </div>

                  {/* Info */}
                  <div className="list-group-item">
                    <h4 className="list-group-item-heading">Information</h4>
                    <div className="list-group-item-text item-margin">
                      Name: <samp>{vnetData.name}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Resource GUID: <samp>{vnetData.resource_guid}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Type: <samp>{vnetData.type}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Location: <samp>{vnetData.location}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Provisioning State:{" "}
                      <samp>{vnetData.provisioning_state}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Address Space:{" "}
                      <samp>
                        {vnetData.address_space?.address_prefixes?.join(", ") ||
                          "None"}
                      </samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      DHCP Options:{" "}
                      <samp>{vnetData.dhcp_options || "None"}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Virtual Network Peerings:{" "}
                      <samp>
                        {vnetData.virtual_network_peerings || "None"}
                      </samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Enable VM Protection:{" "}
                      <samp>{String(vnetData.enable_vm_protection)}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Enable DDoS Protection:{" "}
                      <samp>{String(vnetData.enable_ddos_protection)}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      DDoS Protection Plan:{" "}
                      <samp>
                        {vnetData.ddos_protection_plan || "None"}
                      </samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Tags:{" "}
                      {vnetData.tags &&
                      Object.keys(vnetData.tags).length > 0 ? (
                        Object.entries(vnetData.tags).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              style={{
                                borderRadius: "5px",
                                backgroundColor: "#c2c2d6",
                                padding: "2px 5px",
                                margin: "2px",
                                display: "inline-flex",
                              }}
                            >
                              <samp>{value || "None"}</samp>
                            </div>
                          )
                        )
                      ) : (
                        <div style={{ display: "inline-flex" }}>
                          <samp>None</samp>
                        </div>
                      )}
                    </div>
                    <div className="list-group-item-text item-margin">
                      Resource group:{" "}
                      <samp>{vnetData.resource_group_name || "None"}</samp>
                    </div>
                  </div>

                  {/* Subnets */}
                  <div className="list-group-item">
                    <h4 className="list-group-item-heading">Subnets</h4>
                    {vnetData.subnets &&
                    Object.keys(vnetData.subnets).length > 0 ? (
                      Object.entries(vnetData.subnets).map(
                        ([subnetId, subnet]) => (
                          <div
                            key={subnetId}
                            className="list-group-item-text item-margin"
                          >
                            <samp>{subnet.name}</samp> (
                            <samp>{subnet.address_prefix}</samp>)
                          </div>
                        )
                      )
                    ) : (
                      <div className="list-group-item-text item-margin">
                        <samp>None</samp>
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        );
      })}
    </div>
  );
};

  
  // ---------- Subnet ----------
  // ---------------- Network Virtual Network Subnet ----------------
export const NetworkSubnet = ({ data }) => {
  if (!data) return null;

  return (
    <div>
      {/* Resource name */}
      <div id="resource-name" className="list-group-item active">
        <h4 className="list-group-item-heading">{data.name}</h4>
      </div>

      {/* Information section */}
      <div className="list-group-item">
        <h4 className="list-group-item-heading">Information</h4>

        <div className="list-group-item-text item-margin">
          Address Prefix: <samp>{data.address_prefix || "None"}</samp>
        </div>

        <div className="list-group-item-text item-margin">
          Address Prefixes: <samp>{data.address_prefixes || "None"}</samp>
        </div>

        <div className="list-group-item-text item-margin">
          Provisioning State: <samp>{data.provisioning_state || "None"}</samp>
        </div>

        {/* Conditional Network Security Group */}
        {data.network_security_group ? (
          <div className="list-group-item-text item-margin">
            Network Security Group:{" "}
            <a
              href={`javascript:showObject('services.network.subscriptions.${data.subscription}.security_groups.${data.network_security_group}')`}
            >
              <samp>{data.security_group_name || data.network_security_group}</samp>
            </a>
          </div>
        ) : (
          <div className="list-group-item-text item-margin">
            Network Security Group: <samp>None</samp>
          </div>
        )}

        <div className="list-group-item-text item-margin">
          Route Table: <samp>{data.route_table || "None"}</samp>
        </div>

        <div className="list-group-item-text item-margin">
          Interface Endpoints: <samp>{data.interface_endpoints || "None"}</samp>
        </div>

        <div className="list-group-item-text item-margin">
          IP Configuration Profiles:{" "}
          <samp>{data.ip_configuration_profiles || "None"}</samp>
        </div>

        <div className="list-group-item-text item-margin">
          Service Endpoints: <samp>{data.service_endpoints || "None"}</samp>
        </div>

        <div className="list-group-item-text item-margin">
          Service Endpoint Policies:{" "}
          <samp>{data.service_endpoint_policies || "None"}</samp>
        </div>

        <div className="list-group-item-text item-margin">
          Service Association Links:{" "}
          <samp>{data.service_association_links || "None"}</samp>
        </div>

        <div className="list-group-item-text item-margin">
          Resource Navigation Links:{" "}
          <samp>{data.resource_navigation_links || "None"}</samp>
        </div>

        <div className="list-group-item-text item-margin">
          Delegations: <samp>{data.delegations || "None"}</samp>
        </div>

        <div className="list-group-item-text item-margin">
          Purpose: <samp>{data.purpose || "None"}</samp>
        </div>
      </div>

      {/* Instances Section */}
      <div className="list-group-item">
        <h4 className="list-group-item-heading">Instances</h4>
        {data.instances && data.instances.length > 0 ? (
          data.instances.map((instanceId, idx) => (
            <div key={idx} className="list-group-item-text item-margin">
              <a
                href={`javascript:showObject('services.virtualmachines.subscriptions.${data.subscription}.instances.${instanceId}')`}
              >
                <samp>{data.instances_names?.[instanceId] || instanceId}</samp>
              </a>
            </div>
          ))
        ) : (
          <div className="list-group-item-text item-margin">
            <samp>None</samp>
          </div>
        )}
      </div>
    </div>
  );
};
  
// ---------------- Network Watchers ----------------
export const NetworkWatchers = ({ data }) => {
  if (!data) return null;

  return (
    <>
      {Object.entries(data).map(([subscriptionId, subscription]) => (
        <div key={subscriptionId}>
          <h3>Subscription: {subscriptionId}</h3>

          {subscription.watchers && Object.keys(subscription.watchers).length > 0 ? (
            Object.entries(subscription.watchers).map(([watcherId, watcher]) => (
              <div key={watcherId}>
                {/* Resource Name */}
                <div id="resource-name" className="list-group-item active">
                  <h4 className="list-group-item-heading">{watcher.name}</h4>
                </div>

                {/* Information */}
                <div className="list-group-item">
                  <h4 className="list-group-item-heading">Information</h4>

                  <div className="list-group-item-text item-margin">
                    Name: <samp>{watcher.name || "None"}</samp>
                  </div>

                  <div className="list-group-item-text item-margin">
                    Provisioning State: <samp>{watcher.provisioning_state || "None"}</samp>
                  </div>

                  <div className="list-group-item-text item-margin">
                    Location: <samp>{watcher.location || "None"}</samp>
                  </div>

                  <div className="list-group-item-text item-margin">
                    Tags:{" "}
                    {watcher.tags && watcher.tags.length > 0 ? (
                      watcher.tags.map((tag, idx) => (
                        <div
                          key={idx}
                          style={{
                            borderRadius: "5px",
                            backgroundColor: "#c2c2d6",
                            padding: "0.1px",
                            textAlign: "center",
                            display: "inline-flex",
                            marginRight: "2px",
                          }}
                        >
                          <samp>{tag || "None"}</samp>
                        </div>
                      ))
                    ) : (
                      <div style={{ display: "inline-flex" }}>
                        <samp>None</samp>
                      </div>
                    )}
                  </div>

                  <div className="list-group-item-text item-margin">
                    Resource group: <samp>{watcher.resource_group_name || "None"}</samp>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="list-group-item-text item-margin"><samp>No watchers found</samp></div>
          )}
        </div>
      ))}
    </>
  );
};


  //services.postgresqldatabase.subscriptions.id.servers
// ---------------- PostgreSQL Servers ----------------
export const PostgresServers = ({ data }) => {
  if (!data) return null;

  return (
    <>
      {Object.entries(data).map(([subscriptionId, subscription]) => (
        <div key={subscriptionId}>
          <h3>Subscription: {subscriptionId}</h3>

          {subscription.servers && Object.keys(subscription.servers).length > 0 ? (
            Object.entries(subscription.servers).map(([serverId, server]) => (
              <div key={serverId}>
                {/* Resource Name */}
                <div id="resource-name" className="list-group-item active">
                  <h4 className="list-group-item-heading">{server.name}</h4>
                </div>

                {/* Information */}
                <div className="list-group-item">
                  <h4 className="list-group-item-heading">Information</h4>

                  <div className="list-group-item-text item-margin">
                    PostgreSQL Server Name: <samp>{server.name || "None"}</samp>
                  </div>
                  <div className="list-group-item-text item-margin">
                    Server SSL connection enforcement: <samp>{server.ssl_enforcement || "None"}</samp>
                  </div>
                  <div className="list-group-item-text item-margin">
                    Log checkpoint server parameter: <samp>{server.log_checkpoints?.value || "None"}</samp>
                  </div>
                  <div className="list-group-item-text item-margin">
                    Log connections server parameter: <samp>{server.log_connections?.value || "None"}</samp>
                  </div>
                  <div className="list-group-item-text item-margin">
                    Log disconnections server parameter: <samp>{server.log_disconnections?.value || "None"}</samp>
                  </div>
                  <div className="list-group-item-text item-margin">
                    Log duration server parameter: <samp>{server.log_duration?.value || "None"}</samp>
                  </div>
                  <div className="list-group-item-text item-margin">
                    Connection throttling server parameter: <samp>{server.connection_throttling?.value || "None"}</samp>
                  </div>
                  <div className="list-group-item-text item-margin">
                    Log retention days server parameter: <samp>{server.log_retention_days?.value || "None"}</samp>
                  </div>
                </div>

                {/* Firewall Rules */}
                <div className="list-group-item">
                  <h4 className="list-group-item-heading">PostgreSQL Firewall Rules</h4>
                  {server.postgresql_firewall_rules && server.postgresql_firewall_rules.length > 0 ? (
                    server.postgresql_firewall_rules.map((rule, idx) => (
                      <div key={idx} className="list-group-item-text item-margin">
                        <samp>{rule.name}</samp>
                        <div className="list-group-item-text item-margin">
                          <div className="list-group-item-text item-margin">
                            PostgreSQL Firewall rule start IP: <samp>{rule.start_ip || "None"}</samp>
                          </div>
                          <div className="list-group-item-text item-margin">
                            PostgreSQL Firewall rule end IP: <samp>{rule.end_ip || "None"}</samp>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="list-group-item-text item-margin"><samp>No firewall rules</samp></div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="list-group-item-text item-margin"><samp>No PostgreSQL servers found</samp></div>
          )}
        </div>
      ))}
    </>
  );
};

//services.rbac.subscriptions.id.roles
// ---------------- RBAC Roles ----------------
export const RbacRoles = ({ data }) => {
  if (!data) return null;

  return (
    <>
      {Object.entries(data).map(([subscriptionId, subscription]) => (
        <div key={subscriptionId}>
          <h3>Subscription: {subscriptionId}</h3>

          {subscription.roles && Object.keys(subscription.roles).length > 0 ? (
            Object.entries(subscription.roles).map(([roleId, role]) => (
              <div key={roleId}>
                {/* Resource Name */}
                <div id="resource-name" className="list-group-item active">
                  <h4 className="list-group-item-heading">{role.name}</h4>
                </div>

                {/* Role Information */}
                <div className="list-group-item">
                  <h4 className="list-group-item-heading">Information</h4>
                  <div className="list-group-item-text item-margin">
                    ID: <samp>{role.id || "None"}</samp>
                  </div>
                  <div className="list-group-item-text item-margin">
                    Description: <samp>{role.description || "None"}</samp>
                  </div>
                  <div className="list-group-item-text item-margin">
                    Type: <samp>{role.type || "None"}</samp>
                  </div>
                  <div className="list-group-item-text item-margin">
                    Role Type: <samp>{role.role_type || "None"}</samp>
                  </div>
                  <div className="list-group-item-text item-margin">
                    Assignable Scopes: <samp>{role.assignable_scopes || "None"}</samp>
                  </div>
                  <div className="list-group-item-text item-margin">
                    Custom Subscriptions Owner Roles: <samp>{role.custom_subscription_owner_role || "None"}</samp>
                  </div>
                </div>

                {/* Permissions */}
                <div className="list-group-item">
                  <h4 className="list-group-item-heading">Permissions</h4>
                  <div className="accordion-inner">
                    {role.permissions && role.permissions.length > 0 ? (
                      <ul>
                        {role.permissions.map((perm, idx) => (
                          <li key={idx}><samp>{perm}</samp></li>
                        ))}
                      </ul>
                    ) : (
                      <samp>No permissions</samp>
                    )}
                  </div>
                </div>

                {/* Assignments */}
                <div className="list-group-item">
                  <h4 className="list-group-item-heading">Assignments</h4>
                  <ul>
                    {/* Users */}
                    {role.assignments?.users && role.assignments.users.length > 0 && (
                      <li>
                        Users:
                        <ul>
                          {role.assignments.users.map((userId) => (
                            <li key={userId} className="list-group-item-text">
                              {userId}
                            </li>
                          ))}
                        </ul>
                      </li>
                    )}

                    {/* Groups */}
                    {role.assignments?.groups && role.assignments.groups.length > 0 && (
                      <li>
                        Groups:
                        <ul>
                          {role.assignments.groups.map((groupId) => (
                            <li key={groupId} className="list-group-item-text">
                              {groupId}
                            </li>
                          ))}
                        </ul>
                      </li>
                    )}

                    {/* Service Principals */}
                    {role.assignments?.service_principals && role.assignments.service_principals.length > 0 && (
                      <li>
                        Service Principals:
                        <ul>
                          {role.assignments.service_principals.map((spId) => (
                            <li key={spId} className="list-group-item-text">
                              {spId}
                            </li>
                          ))}
                        </ul>
                      </li>
                    )}

                    {!role.assignments?.users &&
                     !role.assignments?.groups &&
                     !role.assignments?.service_principals && (
                      <li><samp>No assignments</samp></li>
                    )}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <div className="list-group-item-text item-margin"><samp>No roles found</samp></div>
          )}
        </div>
      ))}
    </>
  );
};

// ---------- Reusable InfoRow ----------
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between p-2 border-b border-gray-700">
    <span className="font-semibold text-gray-200">{label}:</span>
    <span className="text-gray-400">{value || "None"}</span>
  </div>
);

// ---------------- Security Center Auto Provisioning Settings ----------------
export const SecurityCenterAutoProvisioningSettings = ({ data }) => {
  if (!data) return null;

  return (
    <>
      {Object.entries(data).map(([subscriptionId, subscription]) => (
        <div key={subscriptionId}>
          <h3>Subscription: {subscriptionId}</h3>

          {subscription.auto_provisioning_settings && Object.keys(subscription.auto_provisioning_settings).length > 0 ? (
            Object.entries(subscription.auto_provisioning_settings).map(([settingId, setting]) => (
              <div key={settingId}>
                {/* Resource Name */}
                <div id="resource-name" className="list-group-item active">
                  <h4 className="list-group-item-heading">{setting.name}</h4>
                </div>

                {/* Information */}
                <div className="list-group-item">
                  <h4 className="list-group-item-heading">Information</h4>
                  <div className="list-group-item-text item-margin">
                    Name: <samp>{setting.name || "None"}</samp>
                  </div>
                  <div className="list-group-item-text item-margin">
                    Auto Provisioning: <samp>{setting.auto_provision || "None"}</samp>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="list-group-item-text item-margin"><samp>No auto provisioning settings found</samp></div>
          )}
        </div>
      ))}
    </>
  );
};


// ---------------- Security Center Compliance Results ----------------
export const SecurityCenterComplianceResults = ({ data }) => {
  if (!data) return null;

  return (
    <>
      {Object.entries(data).map(([subscriptionId, subscription]) => (
        <div key={subscriptionId}>
          <h3>Subscription: {subscriptionId}</h3>

          {subscription.compliance_results && Object.keys(subscription.compliance_results).length > 0 ? (
            Object.entries(subscription.compliance_results).map(([resultId, result]) => (
              <div key={resultId}>
                {/* Resource Name */}
                <div id="resource-name" className="list-group-item active">
                  <h4 className="list-group-item-heading">{result.name || "Unnamed Compliance Result"}</h4>
                </div>

                {/* Information */}
                <div className="list-group-item">
                  <h4 className="list-group-item-heading">Information</h4>
                  <div className="list-group-item-text item-margin">
                    Name: <samp>{result.name || "None"}</samp>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="list-group-item-text item-margin"><samp>No compliance results found</samp></div>
          )}
        </div>
      ))}
    </>
  );
};

// ---------------- Security Center Regulatory Compliance Results ----------------
export const SecurityCenterRegulatoryComplianceResults = ({ data }) => {
  if (!data) return null;

  return (
    <>
      {Object.entries(data).map(([subscriptionId, subscription]) => (
        <div key={subscriptionId}>
          <h3>Subscription: {subscriptionId}</h3>

          {subscription.regulatory_compliance_results &&
          Object.keys(subscription.regulatory_compliance_results).length > 0 ? (
            Object.entries(subscription.regulatory_compliance_results).map(
              ([resultId, result]) => (
                <div key={resultId}>
                  {/* Resource Name */}
                  <div id="resource-name" className="list-group-item active">
                    <h4 className="list-group-item-heading">
                      {result.name || "Unnamed Regulatory Compliance Result"}
                    </h4>
                  </div>

                  {/* Information */}
                  <div className="list-group-item">
                    <h4 className="list-group-item-heading">Information</h4>
                    <div className="list-group-item-text item-margin">
                      Standard: <samp>{result.standard_name || "None"}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Reference: <samp>{result.reference || "None"}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Description: <samp>{result.description || "None"}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      State: <samp>{result.state || "None"}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Passed Assessments: <samp>{result.passed_assessments || 0}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Failed Assessments: <samp>{result.failed_assessments || 0}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Skipped Assessments: <samp>{result.skipped_assessments || 0}</samp>
                    </div>
                  </div>
                </div>
              )
            )
          ) : (
            <div className="list-group-item-text item-margin">
              <samp>No regulatory compliance results found</samp>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

// ---------------- Security Center Security Contacts ----------------
export const SecurityCenterSecurityContacts = ({ data }) => {
  if (!data) return null;

  const convertBoolToEnabled = (value) => (value ? "Enabled" : "Disabled");

  return (
    <>
      {Object.entries(data).map(([subscriptionId, subscription]) => (
        <div key={subscriptionId}>
          <h3>Subscription: {subscriptionId}</h3>

          {subscription.security_contacts &&
          Object.keys(subscription.security_contacts).length > 0 ? (
            Object.entries(subscription.security_contacts).map(
              ([contactId, contact]) => (
                <div key={contactId}>
                  {/* Resource Name */}
                  <div id="resource-name" className="list-group-item active">
                    <h4 className="list-group-item-heading">
                      {contact.name || "Unnamed Security Contact"}
                    </h4>
                  </div>

                  {/* Information */}
                  <div className="list-group-item">
                    <h4 className="list-group-item-heading">Information</h4>
                    <div className="list-group-item-text item-margin">
                      Name: <samp>{contact.name || "None"}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Email: <samp>{contact.email || "None"}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Phone: <samp>{contact.phone || "None"}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Notify on Alert:{" "}
                      <samp>{convertBoolToEnabled(contact.alert_notifications)}</samp>
                    </div>
                    <div className="list-group-item-text item-margin">
                      Notify Administrators on Alert:{" "}
                      <samp>{convertBoolToEnabled(contact.alerts_to_admins)}</samp>
                    </div>
                  </div>
                </div>
              )
            )
          ) : (
            <div className="list-group-item-text item-margin">
              <samp>No security contacts found</samp>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

// ---------------- Security Center Settings ----------------
export const SecurityCenterSettings = ({ data }) => {
  if (!data) return null;

  return (
    <>
      {Object.entries(data).map(([subscriptionId, subscription]) => (
        <div key={subscriptionId}>
          <h3>Subscription: {subscriptionId}</h3>

          {subscription.settings &&
          Object.keys(subscription.settings).length > 0 ? (
            Object.entries(subscription.settings).map(([settingId, setting]) => (
              <div key={settingId}>
                {/* Resource Name */}
                <div id="resource-name" className="list-group-item active">
                  <h4 className="list-group-item-heading">
                    {setting.name || "Unnamed Setting"}
                  </h4>
                </div>

                {/* Information */}
                <div className="list-group-item">
                  <h4 className="list-group-item-heading">Information</h4>
                  <div className="list-group-item-text item-margin">
                    Name: <samp>{setting.name || "None"}</samp>
                  </div>
                  <div className="list-group-item-text item-margin">
                    Kind: <samp>{setting.kind || "None"}</samp>
                  </div>
                  <div className="list-group-item-text item-margin">
                    Enabled: <samp>{setting.enabled !== undefined ? setting.enabled.toString() : "None"}</samp>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="list-group-item-text item-margin">
              <samp>No settings found</samp>
            </div>
          )}
        </div>
      ))}
    </>
  );
};


//services.sqldatabase.subscriptions.id.server
// ---------- Render tags ----------
const Tags = ({ tags }) => (
  <div className="flex flex-wrap gap-1 mt-1">
    {tags && tags.length > 0
      ? tags.map((tag, idx) => (
          <div
            key={idx}
            className="bg-gray-600 text-gray-200 px-1 rounded flex justify-center items-center text-sm"
          >
            {tag || "None"}
          </div>
        ))
      : <span className="text-gray-400">None</span>}
  </div>
);

// ---------------- SQL Database Servers ----------------
export const SQLDatabaseServers = ({ data }) => {
  if (!data) return null;

  return (
    <>
      {Object.entries(data).map(([subscriptionId, subscription]) => (
        <div key={subscriptionId}>
          <h3>Subscription: {subscriptionId}</h3>

          {subscription.servers &&
          Object.keys(subscription.servers).length > 0 ? (
            Object.entries(subscription.servers).map(([serverId, server]) => (
              <div key={serverId}>
                {/* Resource Name */}
                <div id="resource-name" className="list-group-item active">
                  <h4 className="list-group-item-heading">
                    {server.name || "Unnamed Server"}
                  </h4>
                </div>

                {/* Server Information */}
                <div className="list-group-item">
                  <h4 className="list-group-item-heading">Information</h4>
                  <div className="list-group-item-text item-margin">
                    SQL Server Name: <samp>{server.name}</samp>
                  </div>
                  <div className="list-group-item-text item-margin">
                    Azure AD Admin: <samp>{server.ad_admin?.login || "None"}</samp>
                  </div>
                  <div className="list-group-item-text item-margin">
                    Auditing: <samp>{server.auditing?.auditing_enabled ? "Enabled" : "Disabled"}</samp>
                  </div>
                  <div className="list-group-item-text item-margin">
                    Auditing retention period: <samp>{server.auditing?.retention_days || "None"}</samp>
                  </div>

                  <div className="list-group-item-text item-margin">
                    ATP: <samp>{server.threat_detection?.threat_detection_enabled ? "Enabled" : "Disabled"}</samp>
                  </div>
                  <div className="list-group-item-text item-margin">
                    ATP alerts: <samp>{server.threat_detection?.alerts_enabled ? "Enabled" : "Disabled"}</samp>
                  </div>
                  <div className="list-group-item-text item-margin">
                    Send ATP alerts: <samp>{server.threat_detection?.send_alerts_enabled ? "Enabled" : "Disabled"}</samp>
                  </div>
                  <div className="list-group-item-text item-margin">
                    ATP retention period: <samp>{server.threat_detection?.retention_days || "None"}</samp>
                  </div>

                  <div className="list-group-item-text item-margin">
                    Storage account: <samp>{server.server_vulnerability?.storage_account_name || "None"}</samp>
                  </div>
                  <div className="list-group-item-text item-margin">
                    Send vulnerability emails: <samp>{server.server_vulnerability?.email_subscription_admin ? "Enabled" : "Disabled"}</samp>
                  </div>
                  <div className="list-group-item-text item-margin">
                    Recurring scans: <samp>{server.server_vulnerability?.recurring_scans_enabled ? "Enabled" : "Disabled"}</samp>
                  </div>
                  <div className="list-group-item-text item-margin">
                    Send scan reports configured: <samp>{server.server_vulnerability?.send_scan_reports_to_not_empty || "None"}</samp>
                  </div>

                  <div className="list-group-item-text item-margin">
                    TDE Key Type: <samp>{server.encryption_protectors?.server_key_type || "None"}</samp>
                  </div>

                  <div className="list-group-item-text item-margin">
                    Tags:{" "}
                    {server.tags && server.tags.length > 0
                      ? server.tags.map((tag, i) => (
                          <div
                            key={i}
                            style={{
                              borderRadius: "5px",
                              backgroundColor: "#c2c2d6",
                              padding: "0.1px",
                              textAlign: "center",
                              display: "inline-flex",
                              marginRight: "5px",
                            }}
                          >
                            <samp>{tag || "None"}</samp>
                          </div>
                        ))
                      : "None"}
                  </div>

                  <div className="list-group-item-text item-margin">
                    Resource group: <samp>{server.resource_group_name || "None"}</samp>
                  </div>
                </div>

                {/* Databases */}
                {server.databases && Object.keys(server.databases).length > 0 && (
                  <div className="list-group-item">
                    <h4 className="list-group-item-heading">SQL Databases</h4>
                    {Object.entries(server.databases).map(([dbName, db]) => (
                      <div key={dbName} className="list-group-item-text item-margin">
                        <b>Database name:</b> {dbName}
                        <div>Auditing: {db.auditing?.auditing_enabled ? "Enabled" : "Disabled"}</div>
                        <div>Auditing retention period: {db.auditing?.retention_days || "None"}</div>
                        <div>Threat detection: {db.threat_detection?.threat_detection_enabled ? "Enabled" : "Disabled"}</div>
                        <div>Threat detection alerts: {db.threat_detection?.alerts_enabled ? "Enabled" : "Disabled"}</div>
                        <div>Send threat detection alerts: {db.threat_detection?.send_alerts_enabled ? "Enabled" : "Disabled"}</div>
                        <div>Threat detection retention period: {db.threat_detection?.retention_days || "None"}</div>
                        <div>Transparent data encryption: {db.transparent_data_encryption_enabled ? "Enabled" : "Disabled"}</div>
                        <div>Geo-replication configured: {db.replication_configured || "None"}</div>

                        <div>
                          Tags:{" "}
                          {db.tags && db.tags.length > 0
                            ? db.tags.map((tag, i) => (
                                <div
                                  key={i}
                                  style={{
                                    borderRadius: "5px",
                                    backgroundColor: "#c2c2d6",
                                    padding: "0.1px",
                                    textAlign: "center",
                                    display: "inline-flex",
                                    marginRight: "5px",
                                  }}
                                >
                                  <samp>{tag || "None"}</samp>
                                </div>
                              ))
                            : "None"}
                        </div>
                        <div>Resource group: {db.resource_group_name || "None"}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Firewall Rules */}
                {server.firewall_rules && server.firewall_rules.length > 0 && (
                  <div className="list-group-item">
                    <h4 className="list-group-item-heading">Firewall Rules</h4>
                    {server.firewall_rules.map((rule, i) => (
                      <div key={i} className="list-group-item-text item-margin">
                        <div>Firewall rule: {rule.name}</div>
                        <div>Start IP: {rule.start_ip}</div>
                        <div>End IP: {rule.end_ip}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="list-group-item-text item-margin">
              <samp>No servers found</samp>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

// ---------------- Storage Accounts ----------------
export const StorageAccounts = ({ data }) => {
  if (!data) return null;

  return (
    <>
      {Object.entries(data).map(([subscriptionId, subscription]) => (
        <div key={subscriptionId}>
          <h3>Subscription: {subscriptionId}</h3>

          {subscription.storage_accounts &&
          Object.keys(subscription.storage_accounts).length > 0 ? (
            Object.entries(subscription.storage_accounts).map(([accountId, account]) => (
              <div key={accountId}>
                {/* Resource Name */}
                <div id="resource-name" className="list-group-item active">
                  <h4 className="list-group-item-heading">{account.name || "Unnamed Storage Account"}</h4>
                </div>

                {/* Storage Account Information */}
                <div className="list-group-item">
                  <h4 className="list-group-item-heading">Information</h4>
                  <div>Storage Account Name: <samp>{account.name}</samp></div>
                  <div>Public Traffic: <samp>{account.public_traffic_allowed ? "Enabled" : "Disabled"}</samp></div>
                  <div>HTTPS Required: <samp>{account.https_traffic_enabled ? "Enabled" : "Disabled"}</samp></div>
                  <div>Microsoft Trusted Services: <samp>{account.trusted_microsoft_services_enabled ? "Enabled" : "Disabled"}</samp></div>
                  <div>Access Key Usage: <samp>{account.shared_key_access_allowed ? "Enabled" : "Disabled"}</samp></div>
                  <div>Last Access Key Rotation: <samp>{account.access_keys_last_rotation_date || "Never"}</samp></div>
                  <div>Storage encrypted with Customer Managed Key: <samp>{account.encryption_key_customer_managed ? "Enabled" : "Disabled"}</samp></div>

                  <div>
                    Tags:{" "}
                    {account.tags && account.tags.length > 0
                      ? account.tags.map((tag, i) => (
                          <span
                            key={i}
                            style={{
                              borderRadius: "5px",
                              backgroundColor: "#c2c2d6",
                              padding: "0.1px 4px",
                              marginRight: "5px",
                              display: "inline-flex",
                            }}
                          >
                            {tag || "None"}
                          </span>
                        ))
                      : "None"}
                  </div>
                  <div>Resource group: <samp>{account.resource_group_name || "None"}</samp></div>
                </div>

                {/* Blob Containers */}
                {account.blob_containers && Object.keys(account.blob_containers).length > 0 && (
                  <div className="list-group-item">
                    <h4 className="list-group-item-heading">Blob Containers</h4>
                    {Object.entries(account.blob_containers).map(([containerName, container]) => (
                      <div key={containerName} className="list-group-item-text item-margin">
                        <samp>{containerName}</samp>
                        <div>Public Access: {container.public_access_allowed ? "Enabled" : "Disabled"}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Blob Services */}
                {account.blob_services && account.blob_services.length > 0 && (
                  <div className="list-group-item">
                    <h4 className="list-group-item-heading">Blob Services</h4>
                    {account.blob_services.map((service, i) => (
                      <div key={i} className="list-group-item-text item-margin">
                        <samp>{service.name}</samp>
                        <div>Soft Delete: {service.soft_delete_enabled ? "Enabled" : "Disabled"}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>No Storage Accounts found</div>
          )}
        </div>
      ))}
    </>
  );
};

// ---------- Boolean helper ----------
const boolToEnabled = (val) => (val ? "Enabled" : "Disabled");

// ---------------- Virtual Machines Disks ----------------
export const VirtualMachineDisks = ({ data }) => {
  if (!data) return null;

  return (
    <>
      {Object.entries(data).map(([subscriptionId, subscription]) => (
        <div key={subscriptionId}>
          <h3>Subscription: {subscriptionId}</h3>

          {subscription.disks && Object.keys(subscription.disks).length > 0 ? (
            Object.entries(subscription.disks).map(([diskId, disk]) => (
              <div key={diskId}>
                {/* Resource Name */}
                <div id="resource-name" className="list-group-item active">
                  <h4 className="list-group-item-heading">{disk.name || "Unnamed Disk"}</h4>
                </div>

                {/* Disk Information */}
                <div className="list-group-item">
                  <h4 className="list-group-item-heading">Information</h4>
                  <div>Name: <samp>{disk.name || "None"}</samp></div>
                  <div>Unique ID: <samp>{disk.unique_id || "None"}</samp></div>
                  <div>Location: <samp>{disk.location || "None"}</samp></div>
                  <div>Time Created: <samp>{disk.time_created || "None"}</samp></div>
                  <div>Provisioning State: <samp>{disk.provisioning_state || "None"}</samp></div>
                  <div>Disk State: <samp>{disk.disk_state || "None"}</samp></div>
                  <div>Zones: <samp>{disk.zones || "None"}</samp></div>
                  <div>Encryption Type: <samp>{disk.encryption_type || "None"}</samp></div>
                  <div>Encrypted using ADE: <samp>{disk.encryption_ade ? "Enabled" : "Disabled"}</samp></div>
                  <div>OS Type: <samp>{disk.os_type || "None"}</samp></div>
                  <div>Hyper V Generation: <samp>{disk.hyper_vgeneration || "None"}</samp></div>
                  <div>Disk Size GB: <samp>{disk.disk_size_gb || "None"}</samp></div>
                </div>
              </div>
            ))
          ) : (
            <div>No Disks found</div>
          )}
        </div>
      ))}
    </>
  );
};


// ---------------- Virtual Machines Images ----------------
export const VirtualMachineImages = ({ data }) => {
  if (!data) return null;

  return (
    <>
      {Object.entries(data).map(([subscriptionId, subscription]) => (
        <div key={subscriptionId}>
          <h3>Subscription: {subscriptionId}</h3>

          {subscription.images && Object.keys(subscription.images).length > 0 ? (
            Object.entries(subscription.images).map(([imageId, image]) => (
              <div key={imageId}>
                {/* Resource Name */}
                <div id="resource-name" className="list-group-item active">
                  <h4 className="list-group-item-heading">{image.name || "Unnamed Image"}</h4>
                </div>

                {/* Image Information */}
                <div className="list-group-item">
                  <h4 className="list-group-item-heading">Information</h4>
                  <div>Name: <samp>{image.name || "None"}</samp></div>
                  <div>Provisioning State: <samp>{image.provisioning_state || "None"}</samp></div>
                  <div>Location: <samp>{image.location || "None"}</samp></div>
                  <div>Hyper-V Generation: <samp>{image.hyper_vgeneration || "None"}</samp></div>
                </div>
              </div>
            ))
          ) : (
            <div>No Images found</div>
          )}
        </div>
      ))}
    </>
  );
};

// ---------------- Virtual Machines Instances ----------------
export const VirtualMachineInstances = ({ data }) => {
  if (!data) return null;

  return (
    <>
      {Object.entries(data).map(([subscriptionId, subscription]) => (
        <div key={subscriptionId}>
          <h3>Subscription: {subscriptionId}</h3>

          {subscription.instances && Object.keys(subscription.instances).length > 0 ? (
            Object.entries(subscription.instances).map(([instanceId, instance]) => (
              <div key={instanceId}>
                {/* Resource Name */}
                <div id="resource-name" className="list-group-item active">
                  <h4 className="list-group-item-heading">{instance.name || "Unnamed VM"}</h4>
                </div>

                {/* VM Information */}
                <div className="list-group-item">
                  <h4 className="list-group-item-heading">Information</h4>
                  <div>Name: <samp>{instance.name || "None"}</samp></div>
                  <div>VM ID: <samp>{instance.vm_id || "None"}</samp></div>
                  <div>Location: <samp>{instance.location || "None"}</samp></div>
                  <div>Zones: <samp>{instance.zones || "None"}</samp></div>
                  <div>Proximity Placement Group: <samp>{instance.proximity_placement_group || "None"}</samp></div>
                  <div>Availability Set: <samp>{instance.availability_set || "None"}</samp></div>
                  <div>Provisioning State: <samp>{instance.provisioning_state || "None"}</samp></div>
                  <div>Identity Principal ID: <samp>{instance.identity?.principal_id || "None"}</samp></div>
                  <div>License Type: <samp>{instance.license_type || "None"}</samp></div>
                  <div>Plan: <samp>{instance.plan || "None"}</samp></div>
                  <div>Hardware Profile: <samp>{instance.hardware_profile || "None"}</samp></div>

                  <div>Diagnostics Profile:
                    {instance.diagnostics_profile && Object.keys(instance.diagnostics_profile).length > 0 ? (
                      <ul style={{ marginBottom: 0 }}>
                        {Object.entries(instance.diagnostics_profile).map(([key, value]) => (
                          <li key={key}><samp>{key}: {value || "None"}</samp></li>
                        ))}
                      </ul>
                    ) : <samp>None</samp>}
                  </div>

                  <div>OS Profile:
                    {instance.os_profile && Object.keys(instance.os_profile).length > 0 ? (
                      <ul style={{ marginBottom: 0 }}>
                        {Object.entries(instance.os_profile).map(([key, value]) => (
                          <li key={key}><samp>{key}: {value || "None"}</samp></li>
                        ))}
                      </ul>
                    ) : <samp>None</samp>}
                  </div>

                  <div>Storage Profile:
                    {instance.storage_profile && Object.keys(instance.storage_profile).length > 0 ? (
                      <ul style={{ marginBottom: 0 }}>
                        {Object.entries(instance.storage_profile).map(([key, value]) => (
                          <li key={key}><samp>{key}: {value || "None"}</samp></li>
                        ))}
                      </ul>
                    ) : <samp>None</samp>}
                  </div>

                  <div>Additional Capabilities:
                    {instance.additional_capabilities && instance.additional_capabilities.length > 0 ? (
                      <ul style={{ marginBottom: 0 }}>
                        {instance.additional_capabilities.map((cap, idx) => (
                          <li key={idx}><samp>{cap}</samp></li>
                        ))}
                      </ul>
                    ) : <samp>None</samp>}
                  </div>

                  <div>Tags:
                    {instance.tags && instance.tags.length > 0 ? (
                      instance.tags.map((tag, idx) => (
                        <div key={idx} style={{
                          borderRadius: 5, backgroundColor: "#c2c2d6", padding: "0.1px", display: "inline-flex", marginRight: "4px"
                        }}>
                          <samp>{tag || "None"}</samp>
                        </div>
                      ))
                    ) : <samp>None</samp>}
                  </div>

                  <div>Resource Group: <samp>{instance.resource_group_name || "None"}</samp></div>
                </div>

                {/* Network Interfaces */}
                {instance.network_interfaces && instance.network_interfaces.length > 0 && (
                  <div className="list-group-item">
                    <h4 className="list-group-item-heading">Network Interfaces</h4>
                    {instance.network_interfaces.map((ni, idx) => (
                      <div key={idx}><samp>{ni}</samp></div>
                    ))}
                  </div>
                )}

                {/* Extensions */}
                {instance.extensions && instance.extensions.length > 0 && (
                  <div className="list-group-item">
                    <h4 className="list-group-item-heading">Extensions</h4>
                    <ul>
                      {instance.extensions.map((ext, idx) => (
                        <li key={idx}><samp>{ext.name}</samp></li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            ))
          ) : (
            <div>No Instances found</div>
          )}
        </div>
      ))}
    </>
  );
};


// ---------------- Virtual Machines Snapshots ----------------
export const VirtualMachineSnapshots = ({ data }) => {
  if (!data) return null;

  return (
    <>
      {Object.entries(data).map(([subscriptionId, subscription]) => (
        <div key={subscriptionId}>
          <h3>Subscription: {subscriptionId}</h3>

          {subscription.snapshots && Object.keys(subscription.snapshots).length > 0 ? (
            Object.entries(subscription.snapshots).map(([snapshotId, snapshot]) => (
              <div key={snapshotId}>
                {/* Resource Name */}
                <div id="resource-name" className="list-group-item active">
                  <h4 className="list-group-item-heading">{snapshot.name || "Unnamed Snapshot"}</h4>
                </div>

                {/* Snapshot Information */}
                <div className="list-group-item">
                  <h4 className="list-group-item-heading">Information</h4>
                  <div>Name: <samp>{snapshot.name || "None"}</samp></div>
                  <div>Unique ID: <samp>{snapshot.unique_id || "None"}</samp></div>
                  <div>Provisioning State: <samp>{snapshot.provisioning_state || "None"}</samp></div>
                  <div>Time Created: <samp>{snapshot.time_created ? new Date(snapshot.time_created).toLocaleString() : "None"}</samp></div>
                  <div>Location: <samp>{snapshot.location || "None"}</samp></div>
                  <div>Encryption Type: <samp>{snapshot.encryption_type || "None"}</samp></div>
                  <div>OS Type: <samp>{snapshot.os_type || "None"}</samp></div>
                  <div>Managed By: <samp>{snapshot.managed_by || "None"}</samp></div>
                  <div>Hyper V Generation: <samp>{snapshot.hyper_vgeneration || "None"}</samp></div>
                  <div>Disk Size GB: <samp>{snapshot.disk_size_gb || "None"}</samp></div>
                  <div>Incremental: <samp>{snapshot.incremental !== undefined ? snapshot.incremental.toString() : "None"}</samp></div>
                </div>
              </div>
            ))
          ) : (
            <div>No snapshots found</div>
          )}
        </div>
      ))}
    </>
  );
};
