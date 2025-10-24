export const dashboardData = {
  counts: {
    danger: 9,
    good: 138,
    warning: 10,
  },
  success: true,
};

export const serviceData = {
  success: true,
  summary: {
    acm: {
      checked_items: 0,
      flagged_items: 0,
      max_level: "warning",
      resources_count: 0,
      rules_count: 2,
    },
    awslambda: {
      checked_items: 0,
      flagged_items: 0,
      max_level: "warning",
      resources_count: 0,
      rules_count: 0,
    },
    cloudformation: {
      checked_items: 0,
      flagged_items: 0,
      max_level: "warning",
      resources_count: 0,
      rules_count: 1,
    },
    cloudfront: {
      checked_items: 0,
      flagged_items: 0,
      max_level: "warning",
      resources_count: 0,
      rules_count: 3,
    },
    cloudtrail: {
      checked_items: 17,
      flagged_items: 17,
      max_level: "danger",
      resources_count: 0,
      rules_count: 9,
    },
    cloudwatch: {
      checked_items: 0,
      flagged_items: 0,
      max_level: "warning",
      resources_count: 0,
      rules_count: 1,
    },
    codebuild: {
      checked_items: 0,
      flagged_items: 0,
      max_level: "warning",
      resources_count: 0,
      rules_count: 0,
    },
    config: {
      checked_items: 17,
      flagged_items: 17,
      max_level: "warning",
      resources_count: 0,
      rules_count: 1,
    },
    directconnect: {
      checked_items: 0,
      flagged_items: 0,
      max_level: "warning",
      resources_count: 0,
      rules_count: 0,
    },
    dynamodb: {
      checked_items: 0,
      flagged_items: 0,
      max_level: "warning",
      resources_count: 0,
      rules_count: 0,
    },
    ec2: {
      checked_items: 493,
      flagged_items: 85,
      max_level: "warning",
      resources_count: 34,
      rules_count: 29,
    },
    efs: {
      checked_items: 0,
      flagged_items: 0,
      max_level: "warning",
      resources_count: 0,
      rules_count: 0,
    },
    elasticache: {
      checked_items: 0,
      flagged_items: 0,
      max_level: "warning",
      resources_count: 0,
      rules_count: 0,
    },
    elb: {
      checked_items: 0,
      flagged_items: 0,
      max_level: "warning",
      resources_count: 0,
      rules_count: 3,
    },
    elbv2: {
      checked_items: 0,
      flagged_items: 0,
      max_level: "warning",
      resources_count: 0,
      rules_count: 5,
    },
    emr: {
      checked_items: 0,
      flagged_items: 0,
      max_level: "warning",
      resources_count: 0,
      rules_count: 0,
    },
    iam: {
      checked_items: 38,
      flagged_items: 8,
      max_level: "danger",
      resources_count: 5,
      rules_count: 37,
    },
    kms: {
      checked_items: 0,
      flagged_items: 0,
      max_level: "warning",
      resources_count: 0,
      rules_count: 1,
    },
    rds: {
      checked_items: 0,
      flagged_items: 0,
      max_level: "warning",
      resources_count: 0,
      rules_count: 9,
    },
    redshift: {
      checked_items: 0,
      flagged_items: 0,
      max_level: "warning",
      resources_count: 0,
      rules_count: 6,
    },
    route53: {
      checked_items: 0,
      flagged_items: 0,
      max_level: "warning",
      resources_count: 0,
      rules_count: 3,
    },
    s3: {
      checked_items: 0,
      flagged_items: 0,
      max_level: "warning",
      resources_count: 0,
      rules_count: 18,
    },
    secretsmanager: {
      checked_items: 0,
      flagged_items: 0,
      max_level: "warning",
      resources_count: 0,
      rules_count: 0,
    },
    ses: {
      checked_items: 0,
      flagged_items: 0,
      max_level: "warning",
      resources_count: 0,
      rules_count: 4,
    },
    sns: {
      checked_items: 0,
      flagged_items: 0,
      max_level: "warning",
      resources_count: 0,
      rules_count: 8,
    },
    sqs: {
      checked_items: 0,
      flagged_items: 0,
      max_level: "warning",
      resources_count: 0,
      rules_count: 8,
    },
    vpc: {
      checked_items: 250,
      flagged_items: 199,
      max_level: "warning",
      resources_count: 0,
      rules_count: 9,
    },
  },
};

export const cloudtrailFindings = {
  "cloudtrail-duplicated-global-services-logging": {
    checked_items: 0,
    compliance: null,
    dashboard_name: "Configurations",
    description: "Global Service Logging Duplicated",
    flagged_items: 0,
    id_suffix: "IncludeGlobalServiceEvents",
    items: [],
    level: "warning",
    path: "cloudtrail.regions.id.trails.id",
    rationale:
      "Global service logging is enabled in multiple Trails. While this does not jeopardize the security of the environment, duplicated entries in logs increase the difficulty to investigate potential incidents.",
    references: [
      "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-global-service-events",
    ],
    remediation: null,
    service: "CloudTrail",
  },

  "cloudtrail-no-cloudwatch-integration": {
    checked_items: 0,
    compliance: [
      {
        name: "CIS Amazon Web Services Foundations",
        reference: "2.4",
        version: "1.0.0",
      },
      {
        name: "CIS Amazon Web Services Foundations",
        reference: "2.4",
        version: "1.1.0",
      },
      {
        name: "CIS Amazon Web Services Foundations",
        reference: "2.4",
        version: "1.2.0",
      },
    ],
    dashboard_name: "Configurations",
    description: "Trail Is Not Integrated with CloudWatch",
    display_path: "cloudtrail.regions.id.trails.id",
    flagged_items: 0,
    id_suffix: "TrailCloudwatchNoIntegration",
    items: [],
    level: "warning",
    path: "cloudtrail.regions.id.trails.id",
    rationale:
      "The lack of integration with CloudWatch hinders real-time and historic activity logging as well as not allowing the configuration of alarms and notifications for anomalous account activity.",
    references: null,
    remediation:
      "Configure each Trail to have a CloudWatch Logs group attached",
    service: "CloudTrail",
  },

  "cloudtrail-no-data-logging": {
    checked_items: 0,
    compliance: null,
    dashboard_name: "Configurations",
    description: "Data Events Logging Not Configured",
    display_path: "cloudtrail.regions.id.trails.id",
    flagged_items: 0,
    id_suffix: "cloudtrail-data-events-disabled",
    items: [],
    level: "warning",
    path: "cloudtrail.regions.id.trails.id",
    rationale:
      "CloudTrail Data Logging is not configured, which means that S3 access and Lambda invocations are not logged. \n\nNote: S3 bucket logging can be used in place of CloudTrail data events for S3. If that is the case, logs for Lambda invocations may still be missing.",
    references: [
      "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html",
    ],
    remediation: null,
    service: "CloudTrail",
  },

  "cloudtrail-no-encryption-with-kms": {
    checked_items: 0,
    compliance: [
      {
        name: "CIS Amazon Web Services Foundations",
        reference: "2.7",
        version: "1.0.0",
      },
      {
        name: "CIS Amazon Web Services Foundations",
        reference: "2.7",
        version: "1.1.0",
      },
      {
        name: "CIS Amazon Web Services Foundations",
        reference: "2.7",
        version: "1.2.0",
      },
    ],
    dashboard_name: "Configurations",
    description:
      "CloudTrail Logs Not Encrypted with KMS Customer Master Keys (CMKs)",
    display_path: "cloudtrail.regions.id.trails.id",
    flagged_items: 0,
    id_suffix: "cloudtrail-kms-key-unused",
    items: [],
    level: "danger",
    path: "cloudtrail.regions.id.trails.id",
    rationale:
      "Not encrypting CloudTrail logs with SSE-KMS affects the confidentiality of the log data.",
    references: [
      "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/encrypting-cloudtrail-log-files-with-aws-kms.html",
    ],
    remediation: "Ensure each Trail is encrypted with a KMS key",
    service: "CloudTrail",
  },

  "cloudtrail-no-global-services-logging": {
    checked_items: 0,
    compliance: null,
    dashboard_name: "Configurations",
    description: "Global Service Logging Disabled",
    flagged_items: 0,
    id_suffix: "IncludeGlobalServiceEvents",
    items: [],
    level: "danger",
    path: "cloudtrail.regions.id.trails.id",
    rationale:
      "API activity for global services such as IAM and STS is not logged. Investigation of incidents will be incomplete due to the lack of information.",
    references: [
      "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-global-service-events",
    ],
    remediation: null,
    service: "CloudTrail",
  },

  "cloudtrail-no-log-file-validation": {
    checked_items: 0,
    compliance: [
      {
        name: "CIS Amazon Web Services Foundations",
        reference: "2.2",
        version: "1.0.0",
      },
      {
        name: "CIS Amazon Web Services Foundations",
        reference: "2.2",
        version: "1.1.0",
      },
      {
        name: "CIS Amazon Web Services Foundations",
        reference: "2.2",
        version: "1.2.0",
      },
    ],
    dashboard_name: "Configurations",
    description: "Log File Validation Is Disabled",
    display_path: "cloudtrail.regions.id.trails.id",
    flagged_items: 0,
    id_suffix: "LogFileValidationDisabled",
    items: [],
    level: "danger",
    path: "cloudtrail.regions.id.trails.id",
    rationale:
      "The lack of log file validation prevents from verifying the integrity of CloudTrail log files.",
    references: [
      "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-intro.html",
    ],
    remediation:
      "Ensure that each Trail has Enable log file validation set to Yes",
    service: "CloudTrail",
  },

  "cloudtrail-no-logging": {
    checked_items: 0,
    class_suffix: "IsLogging",
    compliance: [
      {
        name: "CIS Amazon Web Services Foundations",
        reference: "2.1",
        version: "1.0.0",
      },
      {
        name: "CIS Amazon Web Services Foundations",
        reference: "2.1",
        version: "1.1.0",
      },
      {
        name: "CIS Amazon Web Services Foundations",
        reference: "2.1",
        version: "1.2.0",
      },
    ],
    dashboard_name: "Configurations",
    description: "Disabled Trails",
    flagged_items: 0,
    items: [],
    level: "danger",
    path: "cloudtrail.regions.id.trails.id",
    rationale:
      "Logging is disabled for a given Trail. Depending on the configuration, logs for important API activity may be missing.",
    references: [
      "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/best-practices-security.html",
    ],
    remediation:
      "Configure all Trails to enable Logging, set Apply trail to all regions and ensure that Read/Write Events are set to ALL",
    service: "CloudTrail",
  },

  "cloudtrail-not-configured": {
    checked_items: 17,
    compliance: null,
    dashboard_name: "Regions",
    description: "CloudTrail Service Not Configured",
    flagged_items: 17,
    id_suffix: "NotConfigured",
    items: [
      "cloudtrail.regions.ap-northeast-1.NotConfigured",
      "cloudtrail.regions.ap-northeast-2.NotConfigured",
      "cloudtrail.regions.ap-northeast-3.NotConfigured",
      "cloudtrail.regions.ap-south-1.NotConfigured",
      "cloudtrail.regions.ap-southeast-1.NotConfigured",
      "cloudtrail.regions.ap-southeast-2.NotConfigured",
      "cloudtrail.regions.ca-central-1.NotConfigured",
      "cloudtrail.regions.eu-central-1.NotConfigured",
      "cloudtrail.regions.eu-north-1.NotConfigured",
      "cloudtrail.regions.eu-west-1.NotConfigured",
      "cloudtrail.regions.eu-west-2.NotConfigured",
      "cloudtrail.regions.eu-west-3.NotConfigured",
      "cloudtrail.regions.sa-east-1.NotConfigured",
      "cloudtrail.regions.us-east-1.NotConfigured",
      "cloudtrail.regions.us-east-2.NotConfigured",
      "cloudtrail.regions.us-west-1.NotConfigured",
      "cloudtrail.regions.us-west-2.NotConfigured",
    ],
    level: "danger",
    path: "cloudtrail.regions.id",
    rationale:
      "CloudTrail is not configured, which means that API activity is not logged.",
    references: [
      "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/best-practices-security.html",
    ],
    remediation: null,
    service: "CloudTrail",
  },

  "cloudtrail-partial-data-logging": {
    checked_items: 0,
    compliance: null,
    dashboard_name: "Configurations",
    description: "Data Logging Configuration Not Covering All Resources",
    display_path: "cloudtrail.regions.id.trails.id",
    flagged_items: 0,
    id_suffix: "cloudtrail-data-events-disabled",
    items: [],
    level: "warning",
    path: "cloudtrail.regions.id.trails.id",
    rationale:
      "CloudTrail Data Logging is not configured to cover all S3 or Lambda resources, which means that all S3 access and Lambda invocations are not logged. \n\nNote: S3 bucket logging can be used in place of CloudTrail data events for S3. If that is the case, logs for Lambda invocations may still be missing.",
    references: [
      "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html",
    ],
    remediation: null,
    service: "CloudTrail",
  },

  success: true,
};

export const NavBarData = {
  service_groups: {
    analytics: ["emr"],
    compute: ["awslambda", "ec2", "elb", "elbv2", "summaries"],
    containers: ["ecr", "ecs", "eks"],
    database: [
      "docdb",
      "dynamodb",
      "elasticache",
      "rds",
      "redshift",
      "summaries",
    ],
    management: ["cloudformation", "cloudtrail", "cloudwatch", "config", "ssm"],
    messaging: ["ses", "sns", "sqs"],
    network: ["cloudfront", "directconnect", "route53", "vpc"],
    security: ["acm", "cognito", "guardduty", "iam", "kms", "secretsmanager"],
    storage: ["efs", "s3"],
  },
  success: true,
};
