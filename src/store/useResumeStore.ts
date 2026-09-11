import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResumeData, PersonalInfo, ExperienceItem, EducationItem, SkillItem, ProjectItem, CertificationItem, LanguageItem, ResumeSettings, CustomSection } from '@/types/resume';

export const initialPersonalInfo: PersonalInfo = {
  firstName: 'Alexander',
  lastName: 'Pratama',
  headline: 'Senior Full Stack Engineer & Cloud Architect',
  email: 'alexander.pratama@example.com',
  phone: '+62 812 3456 7890',
  location: 'Jakarta, Indonesia',
  website: 'https://alexpratama.dev',
  linkedin: 'https://linkedin.com/in/alexander-pratama',
  github: 'https://github.com/alexpratama',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
};

export const initialExperiences: ExperienceItem[] = [
  {
    id: 'exp-1',
    title: 'Senior Software Engineer',
    company: 'TechVision Global',
    location: 'Jakarta (Hybrid)',
    startDate: '2022-03',
    endDate: 'Present',
    current: true,
    description: 'Architected and led the development of a cloud-native microservices platform handling 5M+ monthly active users with 99.98% uptime.',
    bulletPoints: [
      'Led a squad of 8 engineers delivering 4 enterprise-grade web applications on Next.js, Node.js, and AWS.',
      'Reduced database query latency by 45% by introducing Redis caching and optimized PostgreSQL indexing.',
      'Spearheaded the migration from monolithic architecture to serverless microservices, saving $25,000 annually in infrastructure costs.',
    ],
  },
  {
    id: 'exp-2',
    title: 'Full Stack Developer',
    company: 'Nusantara Digital Labs',
    location: 'Bandung, Indonesia',
    startDate: '2019-08',
    endDate: '2022-02',
    current: false,
    description: 'Developed scalable customer-facing SaaS portals and high-conversion e-commerce checkout flows.',
    bulletPoints: [
      'Built responsive React/TypeScript interfaces integrated with RESTful and GraphQL backend endpoints.',
      'Designed payment gateway integrations with Midtrans and Stripe, processing over $1.2M in monthly transactions.',
      'Implemented automated CI/CD pipelines using GitHub Actions, reducing release cycle time by 60%.',
    ],
  },
];

export const initialEducation: EducationItem[] = [
  {
    id: 'edu-1',
    school: 'Institut Teknologi Bandung (ITB)',
    degree: 'Bachelor of Science in Computer Science',
    fieldOfStudy: 'Software Engineering & Distributed Systems',
    startDate: '2015-08',
    endDate: '2019-07',
    current: false,
    gpa: '3.82 / 4.00 (Cum Laude)',
    description: 'President of Computer Science Student Association. Authored research paper on real-time event stream processing.',
  },
];

export const initialSkills: SkillItem[] = [
  { id: 'sk-1', name: 'TypeScript & JavaScript', level: 'Expert', category: 'Languages' },
  { id: 'sk-2', name: 'React & Next.js', level: 'Expert', category: 'Frontend' },
  { id: 'sk-3', name: 'Node.js & Express', level: 'Advanced', category: 'Backend' },
  { id: 'sk-4', name: 'PostgreSQL & MongoDB', level: 'Advanced', category: 'Database' },
  { id: 'sk-5', name: 'AWS & Docker', level: 'Advanced', category: 'DevOps' },
  { id: 'sk-6', name: 'GraphQL & REST API', level: 'Expert', category: 'Backend' },
  { id: 'sk-7', name: 'Tailwind CSS & SCSS', level: 'Expert', category: 'Frontend' },
  { id: 'sk-8', name: 'Agile & Team Leadership', level: 'Advanced', category: 'Soft Skills' },
];

export const initialProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'FinEdge AI - Personal Finance Analytics',
    role: 'Creator & Lead Architect',
    link: 'https://finedge-ai.demo',
    github: 'https://github.com/alexpratama/finedge-ai',
    technologies: ['Next.js 14', 'TypeScript', 'Prisma', 'Tailwind', 'OpenAI API'],
    description: 'AI-driven expense analyzer that categorizes bank statements and generates predictive budget forecasts.',
  },
  {
    id: 'proj-2',
    title: 'CloudSync - Realtime Collaboration Suite',
    role: 'Full Stack Engineer',
    link: 'https://cloudsync-live.io',
    github: 'https://github.com/alexpratama/cloudsync',
    technologies: ['React', 'WebSockets', 'Go', 'Docker', 'Redis'],
    description: 'Real-time collaborative document workspace with CRDT-based offline synchronization.',
  },
];

export const initialCertifications: CertificationItem[] = [
  {
    id: 'cert-1',
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    date: '2023-11',
    url: 'https://aws.amazon.com/certification',
  },
  {
    id: 'cert-2',
    name: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Meta / Coursera',
    date: '2022-05',
    url: 'https://coursera.org/verify',
  },
];

export const initialLanguages: LanguageItem[] = [
  { id: 'lang-1', name: 'Indonesian', proficiency: 'Native' },
  { id: 'lang-2', name: 'English', proficiency: 'Fluent' },
  { id: 'lang-3', name: 'Japanese', proficiency: 'Basic' },
];

export const initialSettings: ResumeSettings = {
  template: 'modern',
  themeColor: '#2563eb', // Royal Blue
  fontFamily: 'Inter',
  fontSize: 'medium',
  spacing: 'normal',
  showPhoto: false,
};

export const defaultResumeData: ResumeData = {
  id: 'default-resume',
  title: 'Senior Software Engineer Resume',
  updatedAt: new Date().toISOString(),
  personalInfo: initialPersonalInfo,
  summary:
    'Dynamic and results-driven Senior Software Engineer with 6+ years of experience building resilient web architectures, scalable cloud services, and delightful user interfaces. Passionate about engineering excellence, clean code, and mentoring high-performing teams to deliver impactful digital products.',
  experiences: initialExperiences,
  education: initialEducation,
  skills: initialSkills,
  projects: initialProjects,
  certifications: initialCertifications,
  languages: initialLanguages,
  customSections: [],
  settings: initialSettings,
};

interface ResumeStore {
  resume: ResumeData;
  activeStep: number;
  zoomLevel: number;
  isLinkedInConnected: boolean;
  linkedInAccount: { name: string; email: string; avatarUrl?: string } | null;

  // Actions
  setActiveStep: (step: number) => void;
  setZoomLevel: (zoom: number) => void;
  updateResumeTitle: (title: string) => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateSummary: (summary: string) => void;

  // Experiences
  addExperience: (exp?: Partial<ExperienceItem>) => void;
  updateExperience: (id: string, exp: Partial<ExperienceItem>) => void;
  deleteExperience: (id: string) => void;
  reorderExperiences: (fromIndex: number, toIndex: number) => void;

  // Education
  addEducation: (edu?: Partial<EducationItem>) => void;
  updateEducation: (id: string, edu: Partial<EducationItem>) => void;
  deleteEducation: (id: string) => void;

  // Skills
  addSkill: (skill: Partial<SkillItem>) => void;
  updateSkill: (id: string, skill: Partial<SkillItem>) => void;
  deleteSkill: (id: string) => void;
  setSkills: (skills: SkillItem[]) => void;

  // Projects
  addProject: (proj?: Partial<ProjectItem>) => void;
  updateProject: (id: string, proj: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;

  // Certifications
  addCertification: (cert?: Partial<CertificationItem>) => void;
  updateCertification: (id: string, cert: Partial<CertificationItem>) => void;
  deleteCertification: (id: string) => void;

  // Languages
  addLanguage: (lang?: Partial<LanguageItem>) => void;
  updateLanguage: (id: string, lang: Partial<LanguageItem>) => void;
  deleteLanguage: (id: string) => void;

  // Custom Sections
  addCustomSection: (title: string) => void;
  updateCustomSectionHeading: (id: string, heading: string) => void;
  addCustomSectionItem: (sectionId: string, item?: Partial<any>) => void;
  updateCustomSectionItem: (sectionId: string, itemId: string, item: Partial<any>) => void;
  deleteCustomSectionItem: (sectionId: string, itemId: string) => void;
  deleteCustomSection: (id: string) => void;

  // Settings
  updateSettings: (settings: Partial<ResumeSettings>) => void;

  // Full state operations
  resetToSample: () => void;
  clearAllData: () => void;
  loadResumeData: (data: ResumeData) => void;

  // LinkedIn Integration
  connectLinkedIn: (account: { name: string; email: string; avatarUrl?: string }) => void;
  disconnectLinkedIn: () => void;
  applyLinkedInProfile: (profile: {
    firstName?: string;
    lastName?: string;
    headline?: string;
    email?: string;
    phone?: string;
    location?: string;
    website?: string;
    linkedin?: string;
    github?: string;
    avatarUrl?: string;
    summary?: string;
    experiences?: ExperienceItem[];
    education?: EducationItem[];
    skills?: string[];
    certifications?: CertificationItem[];
  }) => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      resume: defaultResumeData,
      activeStep: 1,
      zoomLevel: 100,
      isLinkedInConnected: false,
      linkedInAccount: null,

      setActiveStep: (step) => set({ activeStep: step }),
      setZoomLevel: (zoom) => set({ zoomLevel: zoom }),

      updateResumeTitle: (title) =>
        set((state) => ({
          resume: { ...state.resume, title, updatedAt: new Date().toISOString() },
        })),

      updatePersonalInfo: (info) =>
        set((state) => ({
          resume: {
            ...state.resume,
            personalInfo: { ...state.resume.personalInfo, ...info },
            updatedAt: new Date().toISOString(),
          },
        })),

      updateSummary: (summary) =>
        set((state) => ({
          resume: { ...state.resume, summary, updatedAt: new Date().toISOString() },
        })),

      // Experience actions
      addExperience: (exp) => {
        const newExp: ExperienceItem = {
          id: `exp-${Date.now()}`,
          title: exp?.title || 'Job Title',
          company: exp?.company || 'Company Name',
          location: exp?.location || 'City, Country',
          startDate: exp?.startDate || '2023-01',
          endDate: exp?.endDate || 'Present',
          current: exp?.current ?? true,
          description: exp?.description || '',
          bulletPoints: exp?.bulletPoints || ['Accomplished key milestones and exceeded quarterly KPIs.'],
        };
        set((state) => ({
          resume: {
            ...state.resume,
            experiences: [newExp, ...state.resume.experiences],
            updatedAt: new Date().toISOString(),
          },
        }));
      },

      updateExperience: (id, exp) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experiences: state.resume.experiences.map((item) =>
              item.id === id ? { ...item, ...exp } : item
            ),
            updatedAt: new Date().toISOString(),
          },
        })),

      deleteExperience: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experiences: state.resume.experiences.filter((item) => item.id !== id),
            updatedAt: new Date().toISOString(),
          },
        })),

      reorderExperiences: (fromIndex, toIndex) =>
        set((state) => {
          const list = [...state.resume.experiences];
          const [moved] = list.splice(fromIndex, 1);
          list.splice(toIndex, 0, moved);
          return {
            resume: { ...state.resume, experiences: list, updatedAt: new Date().toISOString() },
          };
        }),

      // Education actions
      addEducation: (edu) => {
        const newEdu: EducationItem = {
          id: `edu-${Date.now()}`,
          school: edu?.school || 'University / Institution',
          degree: edu?.degree || 'Bachelor of Science',
          fieldOfStudy: edu?.fieldOfStudy || 'Major / Field of Study',
          startDate: edu?.startDate || '2019-09',
          endDate: edu?.endDate || '2023-06',
          current: edu?.current ?? false,
          gpa: edu?.gpa || '',
          description: edu?.description || '',
        };
        set((state) => ({
          resume: {
            ...state.resume,
            education: [newEdu, ...state.resume.education],
            updatedAt: new Date().toISOString(),
          },
        }));
      },

      updateEducation: (id, edu) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.map((item) =>
              item.id === id ? { ...item, ...edu } : item
            ),
            updatedAt: new Date().toISOString(),
          },
        })),

      deleteEducation: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.filter((item) => item.id !== id),
            updatedAt: new Date().toISOString(),
          },
        })),

      // Skill actions
      addSkill: (skill) => {
        const newSkill: SkillItem = {
          id: `sk-${Date.now()}`,
          name: skill.name || 'New Skill',
          level: skill.level || 'Intermediate',
          category: skill.category || 'General',
        };
        set((state) => ({
          resume: {
            ...state.resume,
            skills: [...state.resume.skills, newSkill],
            updatedAt: new Date().toISOString(),
          },
        }));
      },

      updateSkill: (id, skill) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: state.resume.skills.map((item) =>
              item.id === id ? { ...item, ...skill } : item
            ),
            updatedAt: new Date().toISOString(),
          },
        })),

      deleteSkill: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: state.resume.skills.filter((item) => item.id !== id),
            updatedAt: new Date().toISOString(),
          },
        })),

      setSkills: (skills) =>
        set((state) => ({
          resume: { ...state.resume, skills, updatedAt: new Date().toISOString() },
        })),

      // Project actions
      addProject: (proj) => {
        const newProj: ProjectItem = {
          id: `proj-${Date.now()}`,
          title: proj?.title || 'Project Name',
          role: proj?.role || 'Lead Developer',
          link: proj?.link || '',
          github: proj?.github || '',
          technologies: proj?.technologies || ['React', 'TypeScript'],
          description: proj?.description || 'Engineered a modern web solution delivering measurable user engagement.',
        };
        set((state) => ({
          resume: {
            ...state.resume,
            projects: [...state.resume.projects, newProj],
            updatedAt: new Date().toISOString(),
          },
        }));
      },

      updateProject: (id, proj) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.map((item) =>
              item.id === id ? { ...item, ...proj } : item
            ),
            updatedAt: new Date().toISOString(),
          },
        })),

      deleteProject: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.filter((item) => item.id !== id),
            updatedAt: new Date().toISOString(),
          },
        })),

      // Certification actions
      addCertification: (cert) => {
        const newCert: CertificationItem = {
          id: `cert-${Date.now()}`,
          name: cert?.name || 'Certification Name',
          issuer: cert?.issuer || 'Issuing Organization',
          date: cert?.date || '2023-01',
          url: cert?.url || '',
        };
        set((state) => ({
          resume: {
            ...state.resume,
            certifications: [...state.resume.certifications, newCert],
            updatedAt: new Date().toISOString(),
          },
        }));
      },

      updateCertification: (id, cert) =>
        set((state) => ({
          resume: {
            ...state.resume,
            certifications: state.resume.certifications.map((item) =>
              item.id === id ? { ...item, ...cert } : item
            ),
            updatedAt: new Date().toISOString(),
          },
        })),

      deleteCertification: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            certifications: state.resume.certifications.filter((item) => item.id !== id),
            updatedAt: new Date().toISOString(),
          },
        })),

      // Language actions
      addLanguage: (lang) => {
        const newLang: LanguageItem = {
          id: `lang-${Date.now()}`,
          name: lang?.name || 'Language',
          proficiency: lang?.proficiency || 'Fluent',
        };
        set((state) => ({
          resume: {
            ...state.resume,
            languages: [...state.resume.languages, newLang],
            updatedAt: new Date().toISOString(),
          },
        }));
      },

      updateLanguage: (id, lang) =>
        set((state) => ({
          resume: {
            ...state.resume,
            languages: state.resume.languages.map((item) =>
              item.id === id ? { ...item, ...lang } : item
            ),
            updatedAt: new Date().toISOString(),
          },
        })),

      deleteLanguage: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            languages: state.resume.languages.filter((item) => item.id !== id),
            updatedAt: new Date().toISOString(),
          },
        })),

      // Custom Section actions
      addCustomSection: (title) => {
        const newSection: CustomSection = {
          id: `custom-${Date.now()}`,
          heading: title || 'Additional Activities',
          items: [
            {
              id: `item-${Date.now()}`,
              title: 'Activity or Achievement',
              subtitle: 'Organization / Event',
              date: '2023',
              description: 'Key contribution or recognition received.',
            },
          ],
        };
        set((state) => ({
          resume: {
            ...state.resume,
            customSections: [...state.resume.customSections, newSection],
            updatedAt: new Date().toISOString(),
          },
        }));
      },

      updateCustomSectionHeading: (id, heading) =>
        set((state) => ({
          resume: {
            ...state.resume,
            customSections: state.resume.customSections.map((sec) =>
              sec.id === id ? { ...sec, heading } : sec
            ),
            updatedAt: new Date().toISOString(),
          },
        })),

      addCustomSectionItem: (sectionId, item) =>
        set((state) => ({
          resume: {
            ...state.resume,
            customSections: state.resume.customSections.map((sec) =>
              sec.id === sectionId
                ? {
                    ...sec,
                    items: [
                      ...sec.items,
                      {
                        id: `item-${Date.now()}`,
                        title: item?.title || 'New Item',
                        subtitle: item?.subtitle || '',
                        date: item?.date || '',
                        description: item?.description || '',
                      },
                    ],
                  }
                : sec
            ),
            updatedAt: new Date().toISOString(),
          },
        })),

      updateCustomSectionItem: (sectionId, itemId, item) =>
        set((state) => ({
          resume: {
            ...state.resume,
            customSections: state.resume.customSections.map((sec) =>
              sec.id === sectionId
                ? {
                    ...sec,
                    items: sec.items.map((i) => (i.id === itemId ? { ...i, ...item } : i)),
                  }
                : sec
            ),
            updatedAt: new Date().toISOString(),
          },
        })),

      deleteCustomSectionItem: (sectionId, itemId) =>
        set((state) => ({
          resume: {
            ...state.resume,
            customSections: state.resume.customSections.map((sec) =>
              sec.id === sectionId
                ? { ...sec, items: sec.items.filter((i) => i.id !== itemId) }
                : sec
            ),
            updatedAt: new Date().toISOString(),
          },
        })),

      deleteCustomSection: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            customSections: state.resume.customSections.filter((sec) => sec.id !== id),
            updatedAt: new Date().toISOString(),
          },
        })),

      // Settings actions
      updateSettings: (newSettings) =>
        set((state) => ({
          resume: {
            ...state.resume,
            settings: { ...state.resume.settings, ...newSettings },
            updatedAt: new Date().toISOString(),
          },
        })),

      // Reset and Clear
      resetToSample: () =>
        set({
          resume: { ...defaultResumeData, id: `resume-${Date.now()}`, updatedAt: new Date().toISOString() },
        }),

      clearAllData: () =>
        set({
          resume: {
            id: `resume-${Date.now()}`,
            title: 'Untitled Resume',
            updatedAt: new Date().toISOString(),
            personalInfo: {
              firstName: '',
              lastName: '',
              headline: '',
              email: '',
              phone: '',
              location: '',
              website: '',
              linkedin: '',
              github: '',
              avatarUrl: '',
            },
            summary: '',
            experiences: [],
            education: [],
            skills: [],
            projects: [],
            certifications: [],
            languages: [],
            customSections: [],
            settings: initialSettings,
          },
        }),

      loadResumeData: (data) =>
        set({
          resume: { ...data, updatedAt: new Date().toISOString() },
        }),

      // LinkedIn Integration
      connectLinkedIn: (account) =>
        set({
          isLinkedInConnected: true,
          linkedInAccount: account,
        }),

      disconnectLinkedIn: () =>
        set({
          isLinkedInConnected: false,
          linkedInAccount: null,
        }),

      applyLinkedInProfile: (profile) =>
        set((state) => {
          const currentResume = state.resume;
          const updatedPersonalInfo: PersonalInfo = {
            ...currentResume.personalInfo,
            firstName: profile.firstName ?? currentResume.personalInfo.firstName,
            lastName: profile.lastName ?? currentResume.personalInfo.lastName,
            headline: profile.headline ?? currentResume.personalInfo.headline,
            email: profile.email ?? currentResume.personalInfo.email,
            phone: profile.phone ?? currentResume.personalInfo.phone,
            location: profile.location ?? currentResume.personalInfo.location,
            website: profile.website ?? currentResume.personalInfo.website,
            linkedin: profile.linkedin ?? currentResume.personalInfo.linkedin,
            github: profile.github ?? currentResume.personalInfo.github,
            avatarUrl: profile.avatarUrl ?? currentResume.personalInfo.avatarUrl,
          };

          const newSkills: SkillItem[] = profile.skills
            ? profile.skills.map((name, idx) => ({
                id: `lk-skill-${Date.now()}-${idx}`,
                name,
                level: 'Advanced' as const,
                category: 'LinkedIn Imported',
              }))
            : currentResume.skills;

          return {
            isLinkedInConnected: true,
            linkedInAccount: {
              name: `${updatedPersonalInfo.firstName} ${updatedPersonalInfo.lastName}`.trim(),
              email: updatedPersonalInfo.email,
              avatarUrl: updatedPersonalInfo.avatarUrl,
            },
            resume: {
              ...currentResume,
              title: `${updatedPersonalInfo.firstName} ${updatedPersonalInfo.lastName} Resume`.trim(),
              personalInfo: updatedPersonalInfo,
              summary: profile.summary || currentResume.summary,
              experiences: profile.experiences?.length ? profile.experiences : currentResume.experiences,
              education: profile.education?.length ? profile.education : currentResume.education,
              skills: newSkills,
              certifications: profile.certifications?.length ? profile.certifications : currentResume.certifications,
              projects: [], // Clear default dummy projects so only user's real LinkedIn work is displayed
              updatedAt: new Date().toISOString(),
            },
          };
        }),
    }),
    {
      name: 'resume-builder-data-v2',
    }
  )
);
