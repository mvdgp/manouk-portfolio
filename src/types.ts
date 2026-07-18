export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: number; description: string }[];
}

export interface TimelineEvent {
  period: string;
  role: string;
  company: string;
  description: string;
  achievements: string[];
  techStack: string[];
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}
