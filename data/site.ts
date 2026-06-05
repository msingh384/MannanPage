/**
 * Site-wide data. Edit this file to update copy, links, experiences,
 * projects, and education across the whole site.
 *
 * Most strings here are intentionally placeholder so you can swap in
 * specifics from your resume later without hunting through components.
 */

export const site = {
  name: "Mannan Raj Singh",
  shortName: "Mannan",
  role: "Software Engineer",
  tagline:
    "Computer Science student at Georgia Tech building software that's fast, thoughtful, and robust.",
  location: "Atlanta, GA · Seattle, WA",
  status: {
    label: "Interning at Amazon — Summer 2026",
    available: true,
  },
  email: "your.email@gatech.edu",
  resumeUrl: "/resume.pdf",
  socials: {
    github: "https://github.com/mannanrajsingh",
    linkedin: "https://linkedin.com/in/mannanrajsingh",
    x: "https://x.com/",
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
    role: "Software Development Engineer Intern",
    period: "Summer 2026",
    location: "Seattle, WA",
    description:
      "Working on [team / org placeholder] — building scalable services that power [domain placeholder] for millions of customers.",
    highlights: [
      "Add a measurable highlight here (e.g. shipped X service that improved Y by Z%).",
      "Add a second highlight describing scope, scale, or technical decisions.",
      "Add a third highlight covering collaboration, ownership, or impact.",
    ],
    stack: ["Java", "AWS", "DynamoDB", "Lambda", "TypeScript"],
    link: "https://www.amazon.jobs",
  },
  {
    company: "Previous Company",
    role: "Software Engineering Intern",
    period: "Summer 2025",
    location: "City, ST",
    description:
      "Placeholder description — replace with what you actually built and the impact it had.",
    highlights: [
      "Highlight one — the what and the so-what.",
      "Highlight two — quantified outcome where possible.",
      "Highlight three — anything you owned end-to-end.",
    ],
    stack: ["TypeScript", "React", "Node.js", "PostgreSQL"],
  },
  {
    company: "Georgia Tech",
    role: "Undergraduate Teaching Assistant",
    period: "2025 — Present",
    location: "Atlanta, GA",
    description:
      "Placeholder — supporting [course placeholder]. Hosted office hours, graded assignments, and helped students debug.",
    highlights: [
      "Mentored ~N students per semester through office hours.",
      "Designed/improved problem sets or test cases for [topic].",
      "Collaborated with course staff on curriculum updates.",
    ],
    stack: ["Java", "C", "Algorithms"],
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
    title: "Project One",
    blurb: "A short, punchy one-liner about what it does.",
    description:
      "Placeholder — describe the problem you set out to solve, the approach you took, and the result. Replace with a real project.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "tRPC"],
    github: "https://github.com/mannanrajsingh",
    demo: "#",
    featured: true,
  },
  {
    title: "Project Two",
    blurb: "Another one-liner. Keep it specific and concrete.",
    description:
      "Placeholder — what makes this interesting? Was there a hard technical challenge? Any benchmarks or scale notes?",
    stack: ["Python", "FastAPI", "Redis", "Docker"],
    github: "https://github.com/mannanrajsingh",
    featured: true,
  },
  {
    title: "Project Three",
    blurb: "Something you built for fun or for class.",
    description:
      "Placeholder — describe what it is, what you learned, and any links you want to share.",
    stack: ["React Native", "Expo", "Supabase"],
    github: "https://github.com/mannanrajsingh",
  },
  {
    title: "Project Four",
    blurb: "A systems / low-level / ML / infra project.",
    description:
      "Placeholder — feel free to delete or duplicate this card to match the actual count of things you want to feature.",
    stack: ["C", "x86", "Linux"],
    github: "https://github.com/mannanrajsingh",
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
    degree: "B.S. in Computer Science",
    period: "2024 — 2028 (expected)",
    location: "Atlanta, GA",
    gpa: "X.XX / 4.00",
    highlights: [
      "Threads: [Intelligence + Systems & Architecture] (placeholder).",
      "Activities: [club / org / hackathon placeholder].",
      "Awards: [scholarship / dean's list / award placeholder].",
    ],
    coursework: [
      "Data Structures & Algorithms",
      "Computer Organization",
      "Objects & Design",
      "Discrete Math",
      "Linear Algebra",
      "Systems & Networks",
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
    items: ["TypeScript", "Python", "Java", "C", "Go", "SQL"],
  },
  {
    group: "Frameworks",
    items: ["React", "Next.js", "Node.js", "FastAPI", "Spring", "React Native"],
  },
  {
    group: "Infrastructure",
    items: ["AWS", "Docker", "Kubernetes", "PostgreSQL", "Redis", "Linux"],
  },
  {
    group: "Tools",
    items: ["Git", "Vercel", "GitHub Actions", "Figma", "Vim"],
  },
];
