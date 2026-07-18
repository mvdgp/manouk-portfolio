import portfolioData from './portfolioData.json';
import { Project, SkillCategory, TimelineEvent } from './types';

export const personalInfo = portfolioData.personalInfo;
export const projectsData: Project[] = portfolioData.projects;
export const skillsData: SkillCategory[] = portfolioData.skills;
export const timelineEvents: TimelineEvent[] = portfolioData.experience;
export const education = portfolioData.education;
