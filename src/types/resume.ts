export type TemplateType = 'modern' | 'minimalist' | 'executive' | 'tech';

export type FontFamilyType = 'Inter' | 'Plus Jakarta Sans' | 'Merriweather' | 'Outfit' | 'JetBrains Mono';

export const getFontFamilyCSS = (font?: FontFamilyType): string => {
  switch (font) {
    case 'Plus Jakarta Sans':
      return "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif";
    case 'Merriweather':
      return "'Merriweather', Georgia, 'Times New Roman', serif";
    case 'Outfit':
      return "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif";
    case 'JetBrains Mono':
      return "'JetBrains Mono', 'Courier New', monospace";
    case 'Inter':
    default:
      return "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  }
};

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  avatarUrl: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  bulletPoints: string[];
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa: string;
  description: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  link: string;
  github: string;
  technologies: string[];
  description: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: 'Native' | 'Fluent' | 'Proficient' | 'Intermediate' | 'Basic';
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description: string;
}

export interface CustomSection {
  id: string;
  heading: string;
  items: CustomSectionItem[];
}

export interface ResumeSettings {
  template: TemplateType;
  themeColor: string;
  fontFamily: FontFamilyType;
  fontSize: 'small' | 'medium' | 'large';
  spacing: 'compact' | 'normal' | 'spacious';
  showPhoto: boolean;
}

export interface ResumeData {
  id: string;
  title: string;
  updatedAt: string;
  personalInfo: PersonalInfo;
  summary: string;
  experiences: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  customSections: CustomSection[];
  settings: ResumeSettings;
}
