"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import NavBar from "@/components/NavBar";
import { getFindingDetails } from "@/utils/requests";
import { IoIosArrowBack } from "react-icons/io";

import {ConfigRegionView,EC2SecurityGroup,EC2RegionalSettings,IAMResourceView,CredentialReportView,PasswordPolicyView,VPCNetworkACLsList,
  VPCSubnet,ACMCertificates,LambdaFunctions,SecretsManagerSecrets,SESIdentities,SNSTopics,SQSQueues,AWSStackdriverLoggingSinks,VPCFlowLogs,VPCDetails,
  CloudFormationStacks,CloudFrontDistributions,CloudTrailTrails,CloudWatchAlarms,CloudWatchMetricFilters,DynamoDBTables,EC2Snapshots,EC2Volumes,
  EC2Images,EC2Instances,ElastiCacheSecurityGroups,ElastiCacheSubnetGroups,ElastiCacheClusters,ElbPolicies,ElbLinkedPolicies,ElbAllRegions,
  KmsKeysByRegion,CloudTrailRegions,ConfigRecorderView,ConfigRuleView,ElastiCacheParameterGroups,ElbLinkedResources,ElbListeners,
  ELBv2AllRegions,EMRAllRegions,IAMGroup,IAMInlinePolicies,IAMManagedPolicy,IAMManagedPoliciesList,IamRoleView,RDSParameterGroup,
  RDSSecurityGroup,RDSInstance,RDSSnapshot,RDSSubnetGroup,RedshiftParameterGroup,RedshiftCluster,RedshiftSecurityGroup,
  RedshiftClusterNode,Route53Domain,Route53HostedZonesByRegion,S3ACLs,S3BucketIAMPolicies,S3Bucket,S3Object,S3PublicAccessBlockConfiguration,
  VPCPeeringConnectionsList,VPCPeeringConnection} from "@/components/aws";

import {IAMGCPUsers,IAMProjectBindings,IamBindingsSeparationDuties,IamDomains,IamGroups,ProjectsAndServiceAccounts,StackdriverMonitoringAlertPolicy,
  StackdriverLoggingMetric,KmsKeyrings,KubernetesEngineClusters,StackdriverMetrics,StackdriverLoggingSinks,StackdriverMonitoringUptimeChecks,
  StackdriverAlertPolicies,FunctionsV2,FunctionsV1,CloudDNSManagedZones,ComputeEngineInstances,ComputeEngineSnapshots,ComputeEngineSubnetworks,
  ComputeEngineForwardingRules,ComputeEngineNetworks,ComputeEngineGlobalForwardingRules,ComputeEngineFirewalls,CloudStorageBuckets,CloudSQLInstances,
  CloudMemorystoreRedisInstances,BigQueryDatasets} from "@/components/gcp";

import {VirtualMachineImages,VirtualMachineSnapshots,LogAlerts,CustomRolesReport,Pricings,AadPolicies,AadApplications,AadGroups,AadServicePrincipals,AadUsers,AppServiceWebApps,
  KeyVaultVault,LoggingMonitoringDiagnostics,LoggingMonitoringLogProfiles,LoggingMonitoringResourcesLogging,MySQLDatabaseServers,
  NetworkApplicationSecurityGroups,NetworkNetworkInterfaces,NetworkSecurityGroups,VirtualNetworks,NetworkSubnet,NetworkWatchers,
  PostgresServers,RbacRoles,SecurityCenterAutoProvisioningSettings,SecurityCenterComplianceResults,SecurityCenterRegulatoryComplianceResults,
  SecurityCenterSecurityContacts,SecurityCenterSettings,SQLDatabaseServers,StorageAccounts,VirtualMachineDisks,VirtualMachineInstances} from "@/components/azure";

export default function DangerousFindingDetailsPage() {
  const { data: session, status } = useSession();
  const { scanId, service, findingKey } = useParams();
  const searchParams = useSearchParams();
  const description = searchParams.get('description');

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status !== "authenticated") return;
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError("");
        const userId = session.user;
        const token = session?.id_token;
        const serviceName = (service || "").toLowerCase();
        const findingKeyDecoded = decodeURIComponent(findingKey || "");
        const res = await getFindingDetails(
          userId,
          scanId,
          serviceName,
          token,
          findingKeyDecoded
        );
        setData(res);
      } catch (e) {
        console.error("Error fetching dangerous finding details:", e);
        setError(e.message || "Failed to load details");
      } finally {
        setLoading(false);
      }
    };
    if (scanId && service && findingKey) fetchDetails();
  }, [status, session?.user, session?.id_token, scanId, service, findingKey]);

  // fallback renderer (JSON)
  const JsonView = ({ value }) => (
    <pre className="bg-gray-900/40 border border-gray-700 rounded-lg p-4 text-sm text-gray-300 whitespace-pre-wrap">
      {JSON.stringify(value, null, 2)}
    </pre>
  );

  const findingKeyDecoded = decodeURIComponent(findingKey || "");
  const findingDescription = description || findingKeyDecoded;

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar scanId={scanId} />

      <main className="p-8">
        <div className="mb-6 flex items-center gap-2">
          <Link
            href={`/dangerousfindings/${scanId}`}
            className="text-gray-400 px-2 py-1 hover:text-blue-300 transition-colors text-2xl"
          >
            <IoIosArrowBack />
          </Link>
          <div>
            <h1 className="text-2xl text-gray-300 font-bold mb-1">
              {findingDescription}
            </h1>
          </div>
        </div>

        {loading && <p className="text-gray-400">Loading...</p>}
        {!loading && error && (
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-red-300">
            {error}
          </div>
        )}

      {!loading && (!data || !data.rendered_data || data.rendered_data.length === 0) && (
        <div className="bg-gray-900 text-gray-400 rounded-2xl shadow-md mb-4 p-4">
          <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">
          {findingDescription}
          </h3>
        </div>
      )}

      {!loading && data && (
        <>
          {data.rendered_data.map((item, idx) => {

            //aws
            if (item.template_id === "services.acm.regions.id.certificates") {
              return <ACMCertificates key={idx} data={item.data} />;
            } 
            else if (item.template_id === "services.awslambda.regions.id.functions") {
              return <LambdaFunctions key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.cloudformation.regions.id.stacks") {
              return <CloudFormationStacks key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.cloudfront.distributions") {
              return <CloudFrontDistributions key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.cloudtrail.regions") {
              return <CloudTrailRegions key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.cloudtrail.regions.id.trails") { //completed
              return <CloudTrailTrails key={idx} data={item.data} />;
            } 
            else if (item.template_id === "services.cloudwatch.regions.id.alarms") {
              return <CloudWatchAlarms key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.cloudwatch.regions.id.metric_filters") {
              return <CloudWatchMetricFilters key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.config.regions") { //completed
              return <ConfigRegionView key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.config.regions.id.recorders") {
              return <ConfigRecorderView key={idx} recorder={item.data} />;
            }
            else if (item.template_id === "services.config.regions.id.rules") {
              return <ConfigRuleView key={idx} rule={item.data} />;
            }
            else if (item.template_id === "services.dynamodb.regions.id.tables") {
              return <DynamoDBTables key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.ec2.regions.id.regional_settings") { //completed
              return <EC2RegionalSettings key={idx} regions={item.data} />
            } 
            else if (item.template_id === "services.ec2.regions.id.snapshots") {
              return <EC2Snapshots key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.ec2.regions.id.volumes") {
              return <EC2Volumes key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.ec2.regions.id.vpcs.id.images") {
              return <EC2Images key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.ec2.regions.id.vpcs.id.instances") {
              return <EC2Instances key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.ec2.regions.id.vpcs.id.security_groups") { //completed
              return <EC2SecurityGroup key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.elasticache.regions.id.parameter_groups") {
              return <ElastiCacheParameterGroups key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.elasticache.regions.id.security_groups") {
              return <ElastiCacheSecurityGroups key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.elasticache.regions.id.subnet_groups") {
              return <ElastiCacheSubnetGroups key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.elasticache.regions.id.vpcs.id.clusters") {
              return <ElastiCacheClusters key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.elb.regions.id.elb_policies") {
              return <ElbPolicies key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.elb.regions.id.vpcs.id.elbs") {
              return <ElbAllRegions key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.elb.regions.id.vpcs.id.elbs.linked_resources") {
              return <ElbLinkedResources key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.elb.regions.id.vpcs.id.elbs.listener") {
              return <ElbListeners key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.elb.regions.id.vpcsid.elbs.linked_policy") {
              return <ElbLinkedPolicies key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.elbv2.regions.id.vpcs.id.elbs") {
              return <ELBv2AllRegions key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.emr.regions.id.vpcs.id.clusters") {
              return <EMRAllRegions key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.iam.credential_reports") { //completed
              return <CredentialReportView key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.iam.groups") { //completed
              return <IAMGroup key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.iam.inline_policies") { //completed
              return <IAMInlinePolicies key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.iam.managed_policies") { //completed
              return <IAMManagedPolicy key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.iam.managed_policies_list") { //completed
              return <IAMManagedPoliciesList key={idx} data={item.data} />;
            }
            if (item.template_id === "services.iam.password_policy") { //completed
              return <PasswordPolicyView key={idx} data={item.data} />;
            }  
            else if (item.template_id === "services.iam.users") { //completed
              return <IAMResourceView key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.iam.roles") { //completed
              return <IamRoleView key={idx} data={item.data} />;
            }  
            else if (item.template_id === "services.kms.regions.id.keys") {
              return <KmsKeysByRegion key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.rds.regions.id.parameter_groups") {
              return <RDSParameterGroup key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.rds.regions.id.security_groups") {
              return <RDSSecurityGroup key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.rds.regions.id.vpcs.id.instances") {
              return <RDSInstance key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.rds.regions.id.vpcs.id.snapshots") {
              return <RDSSnapshot key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.rds.regions.id.vpcs.id.subnet_groups") {
              return <RDSSubnetGroup key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.redshift.regions.id.parameter_groups") {
              return <RedshiftParameterGroup key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.redshift.regions.id.vpcs.id.clusters") {
              return <RedshiftCluster key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.redshift.regions.id.vpcs.id.security_groups") {
              return <RedshiftSecurityGroup key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.redshift.regions.vpcs.cluster_nodes") {
              return <RedshiftClusterNode key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.route53.regions.id.domains") {
              return <Route53Domain key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.route53.regions.id.hosted_zones") {
              return <Route53HostedZonesByRegion key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.s3.acls") {
              return <S3ACLs key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.s3.bucket_iam_policies") {
              return <S3BucketIAMPolicies key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.s3.buckets") {
              return <S3Bucket key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.s3.buckets.objects") {
              return <S3Object key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.s3.public_access_block_configuration") {
              return <S3PublicAccessBlockConfiguration key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.secretsmanager.regions.id.secrets") {
              return <SecretsManagerSecrets key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.ses.regions.id.identities") {
              return <SESIdentities key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.sns.regions.id.topics") {
              return <SNSTopics key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.sqs.regions.id.queues") {
              return <SQSQueues key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.stackdriverlogging.sinks") {
              return <AWSStackdriverLoggingSinks key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.vpc.regions.id.flow_logs") {
              return <VPCFlowLogs key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.vpc.regions.id.vpcs.id.peering_connections") {
              return <VPCPeeringConnectionsList key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.vpc.regions.id.peering_connections") {
              return <VPCPeeringConnection key={idx} data={item.data} />;
            } 
            else if (item.template_id === "services.vpc.regions.id.vpcs") {
              return <VPCDetails key={idx} data={item.data} />;
            } 
            else if (item.template_id === "services.vpc.regions.id.vpcs.id.network_acls") {  //completed
              return <VPCNetworkACLsList key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.vpc.regions.id.vpcs.id.subnets") { //completed
              return <VPCSubnet key={idx} data={item.data} />;
            }
            
            
            //GCP
            else if (item.template_id === "services.iam.projects.id.users") { //completed ui done
              return <IAMGCPUsers key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.iam.projects.id.bindings") { //completed ui done
              return <IAMProjectBindings key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.iam.projects.id.service_accounts") { //completed ui done
              return <ProjectsAndServiceAccounts key={idx} projects={item.data} />;
            }
            else if (item.template_id === "services.stackdrivermonitoring.projects.id.monitoring_alert_policies") { //completed ui done
              return <StackdriverMonitoringAlertPolicy key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.stackdriverlogging.projects.id.logging_metrics") { //completed ui done
              return <StackdriverLoggingMetric key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.iam.projects.id.bindings_separation_duties") { //partially done
              return <IamBindingsSeparationDuties key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.iam.projects.id.domains") { //partially done
              return <IamDomains key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.iam.projects.id.groups") { //partially done
              return <IamGroups key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.kms.projects.id.keyrings") { //partially done
              return <KmsKeyrings key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.kubernetesengine.clusters") {  //yet to done //partially done
              return <KubernetesEngineClusters key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.stackdriverlogging.projects.id.metrics") { //partially done
              return <StackdriverMetrics key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.stackdriverlogging.projects.id.sinks") { //partially done
              return <StackdriverLoggingSinks key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.stackdrivermonitoring.projects.id.uptime_checks") { //partially done
              return <StackdriverMonitoringUptimeChecks key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.stackdrivermonitoring.projects.id.alert_policies") { //partially done
              return <StackdriverAlertPolicies key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.functions.projects.id.functions_v2") { //yet to done partially done
              return <FunctionsV2 key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.functions.projects.id.functions_v1") { //partially done
              return <FunctionsV1 key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.dns.projects.id.managed_zones") { //yet to done partially done
              return <CloudDNSManagedZones key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.computeengine.projects.id.zones.id.instances") { //yet to done partially done
              return <ComputeEngineInstances key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.computeengine.projects.id.snapshots") { //partially done
              return <ComputeEngineSnapshots key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.computeengine.projects.id.regions.id.subnetworks") { //yet to done partially done
              return <ComputeEngineSubnetworks key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.computeengine.projects.id.regions.id.forwarding_rules") { //partially done
              return <ComputeEngineForwardingRules key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.computeengine.projects.id.networks") { //yet to done partially done
              return <ComputeEngineNetworks key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.computeengine.projects.id.global_forwarding_rules") { //partially done
              return <ComputeEngineGlobalForwardingRules key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.computeengine.projects.id.firewalls") { //yet to done partially done
              return <ComputeEngineFirewalls key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.cloudstorage.projects.id.buckets") { //yet to done partially done
              return <CloudStorageBuckets key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.cloudsql.projects.id.instances") { //yet to done partially done
              return <CloudSQLInstances key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.cloudmemorystore.projects.id.redis_instances") { //yet to done partially done
              return <CloudMemorystoreRedisInstances key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.bigquery.projects.id.datasets") { //yet to done partially done
              return <BigQueryDatasets key={idx} data={item.data} />;
            }


            //azure
            else if (item.template_id === "services.aad.applications") {
              return <AadApplications key={idx} data={item.data} />;
            }   
            else if (item.template_id === "services.aad.groups") {
              return <AadGroups key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.aad.policies") { //completed ui done
              return <AadPolicies key={idx} data={item.data} />;
            }       
            else if (item.template_id === "services.aad.service_principals") {
              return <AadServicePrincipals key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.aad.users") { //yet to done
              return <AadUsers key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.appservice.subscriptions.id.web_apps") {
              return <AppServiceWebApps  key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.keyvault.subscriptions.id.vaults") {
              return <KeyVaultVault  key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.loggingmonitoring.subscriptions.id.diagnostic_settings") {
              return <LoggingMonitoringDiagnostics  key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.loggingmonitoring.subscriptions.id.log_alerts") { //completed ui done
              return <LogAlerts key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.loggingmonitoring.subscriptions.id.log_profiles") {
              return <LoggingMonitoringLogProfiles  key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.loggingmonitoring.subscriptions.id.resources_logging") {
              return <LoggingMonitoringResourcesLogging  key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.mysqldatabase.subscriptions.id.servers") {
              return <MySQLDatabaseServers  key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.network.subscriptions.id.application_security_groups") {
              return <NetworkApplicationSecurityGroups  key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.network.subscriptions.id.network_interfaces") {
              return <NetworkNetworkInterfaces  key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.network.subscriptions.id.security_groups") {
              return <NetworkSecurityGroups  key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.network.subscriptions.id.virtual_networks") {
              return <VirtualNetworks  key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.network.subscriptions.id.virtual_networks.id.subnets") {
              return <NetworkSubnet  key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.network.subscriptions.id.watchers") {
              return <NetworkWatchers  key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.postgresqldatabase.subscriptions.id.servers") {
              return <PostgresServers  key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.rbac.subscriptions.id.custom_roles_report") { //completed ui done
              return <CustomRolesReport key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.rbac.subscriptions.id.roles") { //yet to done
              return <RbacRoles  key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.securitycenter.subscriptions.id.auto_provisioning_settings") {
              return <SecurityCenterAutoProvisioningSettings  key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.securitycenter.subscriptions.id.compliance_results") {
              return <SecurityCenterComplianceResults  key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.securitycenter.subscriptions.id.pricings") { //completed ui done
              return <Pricings key={idx} data={item.data} />;
            }       
            else if (item.template_id === "services.securitycenter.subscriptions.id.regulatory_compliance_results") {
              return <SecurityCenterRegulatoryComplianceResults  key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.securitycenter.subscriptions.id.security_contacts") {
              return <SecurityCenterSecurityContacts key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.securitycenter.subscriptions.id.settings") {
              return <SecurityCenterSettings key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.sqldatabase.subscriptions.id.servers") {
              return <SQLDatabaseServers key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.storageaccounts.subscriptions.id.storage_accounts") {
              return <StorageAccounts key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.virtualmachines.subscriptions.id.disks") {
              return <VirtualMachineDisks key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.virtualmachines.subscriptions.id.images") {
              return <VirtualMachineImages key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.virtualmachines.subscriptions.id.instances") {
              return <VirtualMachineInstances key={idx} data={item.data} />;
            }
            else if (item.template_id === "services.virtualmachines.subscriptions.id.snapshots") {
              return <VirtualMachineSnapshots key={idx} data={item.data} />;
            }
            else {
              return null;
            }
          })}
        </>
      )}
      </main>
    </div>
  );
}
