import donnybapImage from './assets/Project-Donnybap-large.png';
import fietsmaatjesImage from './assets/Project-Fietsmaatjes-large.png';
import portfolioData from './portfolioData.json';
import { Project, SkillCategory, TimelineEvent } from './types';

const projectImages: Record<string, string> = {
	'Project-Donnybap-large.png': donnybapImage,
	'Project-Fietsmaatjes-large.png': fietsmaatjesImage,
};

export const personalInfo = portfolioData.personalInfo;
export const projectsData: Project[] = portfolioData.projects.map((project) => ({
	...project,
	image: projectImages[project.image] ?? project.image,
}));
export const skillsData: SkillCategory[] = portfolioData.skills;
export const timelineEvents: TimelineEvent[] = portfolioData.experience;
export const education = portfolioData.education;
