export const NAV_LINKS = ["Home", "About", "Skills", "Experience", "Contact"];

export const TERMINAL_LINES = [
  { type: "cmd",     text: "kubectl apply -f devops-engineer.yaml" },
  { type: "out",     text: "namespace/portfolio created" },
  { type: "out",     text: "deployment.apps/akhilesh-maurya configured" },
  { type: "info",    text: "Loading 8+ years of experience..." },
  { type: "info",    text: "Mounting skills: K8s, Docker, AWS, Terraform..." },
  { type: "info",    text: "CI/CD pipelines initialized (50+ apps)" },
  { type: "success", text: "[SUCCESS] Pod akhilesh-maurya-v4.0 is RUNNING" },
];

export const STATS = [
  { icon: "🕐", value: "8+",     suffix: "",  label: "Years Experience" },
  { icon: "☁️", value: "50",     suffix: "+", label: "Apps Deployed"    },
  { icon: "📡", value: "99.99",  suffix: "%", label: "Uptime SLA"       },
  { icon: "🗄️", value: "30",     suffix: "+", label: "Node K8s Cluster" },
];

export const POD_ITEMS = [
  { icon: "🕐", name: "pod/experience-8yr",     desc: "8+ years in AWS & GCP cloud environments" },
  { icon: "☁️", name: "pod/deployments-50plus", desc: "50+ production applications deployed"     },
  { icon: "📡", name: "pod/uptime-99.99",        desc: "99.99% uptime SLA maintained"             },
  { icon: "🗄️", name: "pod/infra-as-code",       desc: "Infrastructure fully automated end-to-end"},
];

export const SKILL_GROUPS = [
  {
    title: "Cloud Platforms",
    skills: [
      { name: "AWS (EKS, EC2, RDS, S3, Lambda)", pct: 95 },
      { name: "GCP (GKE, PubSub, CloudSQL)",      pct: 85 },
      { name: "CloudFormation",                   pct: 88 },
      { name: "Terraform",                        pct: 93 },
    ],
  },
  {
    title: "Container & Orchestration",
    skills: [
      { name: "Kubernetes (EKS, GKE)", pct: 95 },
      { name: "Docker",                pct: 95 },
      { name: "Helm",                  pct: 88 },
      { name: "Puppet / Ansible",      pct: 82 },
    ],
  },
  {
    title: "CI/CD & Automation",
    skills: [
      { name: "Jenkins",             pct: 92 },
      { name: "Python",              pct: 85 },
      { name: "Shell Scripting",     pct: 90 },
      { name: "Bitbucket / GitHub",  pct: 88 },
    ],
  },
  {
    title: "Monitoring & Observability",
    skills: [
      { name: "ELK Stack",  pct: 88 },
      { name: "Datadog",    pct: 87 },
      { name: "Grafana",    pct: 85 },
      { name: "PagerDuty",  pct: 83 },
    ],
  },
];

export const EXPERIENCE = [
  {
    version: "v4.0",
    role:     "Software Engineer 2 — SRE DevOps",
    company:  "Honeywell International Inc",
    location: "Mumbai, India",
    period:   "May 2022 – Present",
    desc:     "Leading SRE & DevOps operations across large-scale multi-cloud AWS environments. Managing Kubernetes clusters, Terraform IaC, Jenkins CI/CD and production monitoring for 50+ applications.",
    bullets: [
      "Managed a 30+ node Kubernetes cluster supporting 100+ microservices with zero-downtime deployments",
      "Provisioned AWS infrastructure with Terraform for 50+ production apps, reducing manual provisioning by 70%",
      "Managed AWS services: EC2, RDS, S3, Lambda, SES, SQS, VPC, CloudFront, Route53, SageMaker, Glue, SSM, Bedrock",
      "Performed Terraform and EKS cluster upgrades for improved scalability and reliability",
      "Designed and implemented Disaster Recovery architecture, improving RTO and RPO compliance",
      "Led troubleshooting and resolution of high-priority P1 incidents to minimise downtime",
      "Managed monitoring with ELK and Datadog; leveraged PagerDuty for incident response",
      "Strengthened cloud security posture, mitigating high-risk vulnerabilities",
    ],
    tags: ["AWS", "Kubernetes (EKS)", "Terraform", "Jenkins", "Puppet", "ELK", "Datadog", "PagerDuty", "Python"],
  },
  {
    version: "v3.0",
    role:     "Senior Associate Technology",
    company:  "Synechron Inc",
    location: "Mumbai, India",
    period:   "Dec 2020 – May 2022",
    desc:     "Designed and managed GCP and AWS cloud infrastructure supporting high-throughput data pipelines and multi-cloud application deployments.",
    bullets: [
      "Designed and managed GCP infrastructure (GKE, PubSub, CloudSQL, Composer) for high-throughput data pipelines",
      "Worked on AWS services: EC2, ECS, S3, CloudWatch for application monitoring and management",
      "Managed Docker containers and troubleshot container-level issues",
      "Created Kibana Watchers, CloudWatch Alarms and OP Manager alerts",
      "Worked on Airflow to trigger batch jobs; used Streamset for pipeline imports and execution",
      "Automated daily tasks using Python and Shell scripts",
    ],
    tags: ["GCP (GKE)", "AWS", "Docker", "Airflow", "Kibana", "Grafana", "App Dynamics", "Python", "Shell"],
  },
  {
    version: "v2.0",
    role:     "DevOps Engineer",
    company:  "Clover Infotech",
    location: "Mumbai, India",
    period:   "Sep 2019 – Dec 2020",
    desc:     "Worked on AWS cloud services and containerisation, implementing CI/CD pipelines and infrastructure automation using CloudFormation, Ansible, and Jenkins.",
    bullets: [
      "Worked on AWS services: EC2, RDS, VPC, CloudWatch, S3, ELB, Autoscaling, Security Groups",
      "Provisioned AWS resources using CloudFormation",
      "Developed Docker images to support development and testing teams",
      "Installed, configured and orchestrated infrastructure using Ansible",
      "Implemented Jenkins CI/CD pipelines",
      "Managed Kubernetes pods and cluster environment; wrote Pod definitions for deployments",
    ],
    tags: ["AWS", "CloudFormation", "Docker", "Kubernetes", "Jenkins", "Ansible", "Git", "GitHub"],
  },
  {
    version: "v1.0",
    role:     "Application Support Engineer",
    company:  "Obdurate Technology",
    location: "Mumbai, India",
    period:   "Jun 2017 – Sep 2019",
    desc:     "Managed 50+ Linux servers in distributed, highly available infrastructure. Began DevOps journey with Terraform, Jenkins CI/CD and Ansible automation.",
    bullets: [
      "Managed 50+ servers in distributed, highly available critical infrastructure",
      "CentOS / Ubuntu / Red Hat system administration and performance tuning",
      "Written Terraform scripts for UAT and Dev infrastructure provisioning",
      "Written Ansible playbooks for automating deployment processes",
      "Implemented Jenkins CI/CD pipelines and Jenkinsfiles",
      "Wrote shell scripts for day-to-day automation; managed Linux user accounts and permissions",
    ],
    tags: ["Linux", "Bash", "Terraform", "Jenkins", "Ansible", "Git", "AWS CLI"],
  },
];

export const PROJECTS = [
  {
    icon: "☸️",
    title: "Multi-Cloud Kubernetes Orchestration",
    desc: "Automated deployment and management of microservices across AWS EKS and GCP GKE clusters with zero-downtime migrations.",
    pipeline: ["Git", "Jenkins", "Docker", "Helm", "EKS/GKE"],
    tags: ["Kubernetes", "Helm", "AWS", "GCP", "CI/CD", "Automation"],
    metrics: [
      { val: "100+", label: "Microservices" },
      { val: "99.99%", label: "Uptime" },
      { val: "30+", label: "Nodes" },
    ],
  },
  {
    icon: "🏗️",
    title: "Infrastructure as Code Automation",
    desc: "Provisioned 50+ production applications using Terraform and CloudFormation with environment parity and version control.",
    pipeline: ["Terraform", "CloudFormation", "Git", "Ansible", "AWS"],
    tags: ["Terraform", "IaC", "AWS", "CloudFormation", "Python"],
    metrics: [
      { val: "50+", label: "Apps Deployed" },
      { val: "70%", label: "Manual Reduction" },
      { val: "100%", label: "Version Controlled" },
    ],
  },
  {
    icon: "📊",
    title: "Observability & Monitoring Platform",
    desc: "Designed centralized monitoring stack with ELK, Datadog and Grafana for real-time insights across 100+ services.",
    pipeline: ["Datadog", "ELK", "Grafana", "PagerDuty", "Prometheus"],
    tags: ["Monitoring", "ELK", "Datadog", "Grafana", "Observability"],
    metrics: [
      { val: "100+", label: "Services Monitored" },
      { val: "< 2min", label: "Alert Response" },
      { val: "99.9%", label: "Logging Coverage" },
    ],
  },
  {
    icon: "🔄",
    title: "CI/CD Pipeline Optimization",
    desc: "Built scalable Jenkins CI/CD pipelines with automated testing, security scanning and deployment workflows.",
    pipeline: ["GitHub", "Jenkins", "SonarQube", "Docker", "Kubernetes"],
    tags: ["Jenkins", "CI/CD", "Git", "Docker", "DevOps"],
    metrics: [
      { val: "50+", label: "Pipelines" },
      { val: "< 5min", label: "Deployment Time" },
      { val: "100%", label: "Build Success Rate" },
    ],
  },
];

export const CONTACT = {
  phone:    "+917506218066",
  email:    "mauryaabhishek299@gmail.com",
  location: "Mumbai, India",
  linkedin: "https://www.linkedin.com/in/akhilesh-maurya-4a10b21b9/",
  github:   "https://github.com",
};
