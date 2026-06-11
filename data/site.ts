/**
 * Site-wide data. Edit this file to update copy, links, experiences,
 * projects, and education across the whole site.
 */

export const site = {
  name: "Mannan Raj Singh",
  shortName: "Mannan",
  role: "Software Engineer",
  tagline:
    "CS student at Georgia Tech building software that's fast, thoughtful, and robust.",
  location: "Atlanta, GA · Austin, TX",
  status: {
    label: "Interning at Amazon · Summer 2026",
    available: true,
  },
  email: "mannanraj13@gmail.com",
  resumeUrl: "/resume.pdf",
  socials: {
    github: "https://github.com/msingh384",
    linkedin: "https://linkedin.com/in/mannanrajsingh",
  },
} as const;

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
] as const;

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  stack: string[];
  link?: string;
};

export const experiences: Experience[] = [
  {
    company: "Amazon",
    role: "Software Development Engineer Intern · B2B Payments",
    period: "Jun 2026 — Aug 2026",
    location: "Austin, TX",
    description:
      "Re-platforming the Save-and-Retrieve API behind Small Business Credit Card (SBCC) onboarding — migrating an encrypted data pipeline from the legacy Zima service to the Data Incubator Service (DIS).",
    highlights: [
      "Leading end-to-end re-platforming of the Save-and-Retrieve API powering SBCC application onboarding, migrating the encrypted data pipeline from Zima to DIS.",
      "Re-architected secure storage and retrieval of customer PII used to pre-fill in-progress credit card applications, preserving end-to-end encryption across ingestion, persistence, and retrieval.",
      "Designed and built an event-driven email notification microservice that alerts customers within 5 days of saved-data expiration, reducing abandoned applications.",
      "Drove system design reviews, API contracts, and rollout strategy with senior engineers for a customer-facing service handling sensitive financial data at scale.",
    ],
    stack: ["Java", "AWS", "DynamoDB", "Lambda", "Microservices", "Encryption"],
    link: "https://www.amazon.jobs",
  },
  {
    company: "Mercor",
    role: "Machine Learning Engineer Intern",
    period: "Nov 2025 — Jan 2026",
    location: "San Francisco, CA",
    description:
      "Reviewed and validated ML evaluation pipelines for a leading AI research lab — debugging code-generation workflows and authoring reproducible test cases at scale.",
    highlights: [
      "Debugged and validated 500+ ML model evaluation nodes for a leading AI research lab, identifying logic errors, runtime failures, and edge-case breakdowns across code-generation workflows.",
      "Built Python and Git-based QC automation to batch-review model outputs, track revision history, and flag failed submissions across large-scale evaluation pipelines.",
      "Authored reproducible test cases and structured review criteria for coding, NLP, and multimodal tasks, improving consistency of model-quality analysis.",
    ],
    stack: ["Python", "Git", "LLM Evaluation", "NLP", "Test Automation"],
    link: "https://mercor.com",
  },
  {
    company: "Georgia Tech Research Institute",
    role: "Software Engineer Intern",
    period: "May 2024 — Aug 2024",
    location: "Atlanta, GA",
    description:
      "Built a serverless weather mesonet on AWS — ingesting sensor telemetry from the field and surfacing it to researchers via an interactive dashboard.",
    highlights: [
      "Architected a serverless AWS weather mesonet ingesting data from 100+ IoT sensors and handling 5,000+ requests/min using Lambda, DynamoDB, and event-driven pipelines.",
      "Built a React + AWS Amplify dashboard to visualize historical weather patterns, reducing data interpretation time by 30%.",
    ],
    stack: ["AWS Lambda", "DynamoDB", "AWS Amplify", "React", "IoT"],
    link: "https://gtri.gatech.edu",
  },
];

export type Project = {
  title: string;
  blurb: string;
  description: string;
  stack: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Director's Cut",
    blurb: "AI movie-rewriting platform that turns audience reviews into alternate endings.",
    description:
      "Full-stack AI app that converts audience reviews into vector embeddings, clusters semantic complaints, and generates alternate movie endings grounded in retrieved feedback. Built with Sentence Transformers + Actian VectorAI for retrieval, FastAPI + React across ingestion, search, and rewrite workflows, and integrations with Supabase, Neo4j, Gemini, and ElevenLabs.",
    stack: [
      "FastAPI",
      "React",
      "Sentence Transformers",
      "VectorAI",
      "Supabase",
      "Neo4j",
      "Gemini",
      "ElevenLabs",
    ],
    github: "https://github.com/msingh384/DirectorsCut-trial1",
    featured: true,
  },
  {
    title: "Aware Droid",
    blurb: "Context-aware Android automation driven by on-device sensor fusion.",
    description:
      "Android app that streams IMU and ambient-light sensor data to infer user context in real time and automatically trigger actions like Do Not Disturb — all processed on-device for low latency and privacy.",
    stack: ["Android", "Kotlin", "IMU", "Sensor Fusion", "On-device ML"],
    github: "https://github.com/msingh384",
  },
  {
    title: "Time-Series Event Retrieval",
    blurb: "Leakage-aware ECG retrieval benchmark across embedding strategies.",
    description:
      "Built a leakage-aware ECG retrieval benchmark from MIT-BIH Arrhythmia records, converting beats into 361-sample windows for nearest-neighbor search. Compared GRP, UMAP, and supervised UMAP embeddings across time, frequency, and mixed representations — best Macro F1 ~0.73 with 64-dim GRP frequency embeddings.",
    stack: ["Python", "scikit-learn", "UMAP", "GRP", "Signal Processing"],
    github: "https://github.com/msingh384",
  },
];

export type Education = {
  school: string;
  degree: string;
  period: string;
  location: string;
  gpa?: string;
  highlights: string[];
  coursework: string[];
};

export const education: Education[] = [
  {
    school: "Georgia Institute of Technology",
    degree: "B.S. + M.S. in Computer Science",
    period: "Aug 2024 — Dec 2027",
    location: "Atlanta, GA",
    gpa: "3.95 / 4.00",
    highlights: [
      "Zell Miller Scholar.",
      "Concentrations: Intelligence & People.",
      "Co-author, PUMP Journal.",
      "B.S. expected Dec 2026, M.S. expected Dec 2027.",
    ],
    coursework: [
      "Data Structures & Algorithms",
      "Objects & Design",
      "Computer Organization",
      "Automata & Complexity",
      "Machine Learning",
      "Artificial Intelligence",
      "Deep Learning",
      "Computer Vision",
      "NLP",
      "Applied Combinatorics",
      "Linear Algebra",
      "Probability & Statistics",
    ],
  },
];

export type Skill = {
  group: string;
  items: string[];
};

export const skills: Skill[] = [
  {
    group: "Languages",
    items: ["Python", "Java", "TypeScript", "JavaScript", "C/C++", "SQL", "Bash"],
  },
  {
    group: "Frameworks",
    items: [
      "React",
      "Node.js",
      "Express",
      "FastAPI",
      "Django",
      "Android SDK",
      "Next.js",
    ],
  },
  {
    group: "Cloud & Infra",
    items: [
      "AWS (Lambda, DynamoDB, Amplify)",
      "Docker",
      "Git",
      "Linux",
      "CI/CD",
      "Event-Driven Architecture",
    ],
  },
  {
    group: "AI / ML",
    items: [
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "pandas",
      "NumPy",
      "Sentence Transformers",
      "Vector Search",
    ],
  },
];
