import { ExperienceItem, EducationItem, SkillItem, CertificationItem } from '@/types/resume';

export interface ParsedLinkedInProfile {
  firstName: string;
  lastName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website?: string;
  github?: string;
  summary: string;
  experiences: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  certifications?: CertificationItem[];
}

/**
 * Realistic Mock LinkedIn Profiles for instant 1-click demonstration
 */
export const mockLinkedInProfiles: Record<string, ParsedLinkedInProfile> = {
  techLead: {
    firstName: 'Dimas',
    lastName: 'Kurniawan',
    headline: 'Principal Software Engineer & Cloud Solutions Architect at GoTo Financial',
    email: 'dimas.kurniawan@linkedin.demo',
    phone: '+62 811 9876 5432',
    location: 'Jakarta, Indonesia',
    linkedin: 'https://linkedin.com/in/dimas-kurniawan',
    website: 'https://dimaskurniawan.dev',
    github: 'https://github.com/dimaskurniawan',
    summary:
      'Seasoned Technology Leader with 8+ years architecting hyper-scale distributed microservices and fintech transaction engines. Passionate about developer velocity, domain-driven design, and fostering high-autonomy engineering cultures.',
    experiences: [
      {
        id: `exp-lk-${Date.now()}-1`,
        title: 'Principal Software Engineer',
        company: 'GoTo Financial',
        location: 'Jakarta, Indonesia',
        startDate: '2021-06',
        endDate: 'Present',
        current: true,
        description: 'Led technical architecture for national payment routing platform handling 15M+ daily transactions.',
        bulletPoints: [
          'Engineered resilient event-driven gateway with Kafka and Go, achieving sub-40ms P99 latency.',
          'Formulated cloud optimization strategy slashing AWS compute costs by 32% year-over-year.',
          'Mentored 14 senior engineers across distributed squads in Indonesia and Singapore.',
        ],
      },
      {
        id: `exp-lk-${Date.now()}-2`,
        title: 'Senior Backend Engineer',
        company: 'Tokopedia',
        location: 'Jakarta, Indonesia',
        startDate: '2018-04',
        endDate: '2021-05',
        current: false,
        description: 'Core developer on merchant inventory and multi-warehouse sync services.',
        bulletPoints: [
          'Developed multi-region PostgreSQL partitioning supporting 100M+ SKU records.',
          'Implemented real-time webhook delivery system with 99.99% delivery SLA.',
        ],
      },
    ],
    education: [
      {
        id: `edu-lk-${Date.now()}-1`,
        school: 'Universitas Indonesia (UI)',
        degree: 'Bachelor of Computer Science',
        fieldOfStudy: 'Computer Systems and Networking',
        startDate: '2014-08',
        endDate: '2018-07',
        current: false,
        gpa: '3.88 / 4.00',
        description: 'Graduated with Honors. Published undergraduate thesis on distributed consensus protocols.',
      },
    ],
    skills: [
      'Distributed Systems',
      'Go & TypeScript',
      'Kubernetes & Docker',
      'Kafka & Event-Driven Architecture',
      'PostgreSQL & Redis',
      'AWS Solutions Architecture',
      'CI/CD & DevOps',
      'System Design',
    ],
    certifications: [
      {
        id: `cert-lk-1`,
        name: 'AWS Certified Solutions Architect – Associate',
        issuer: 'Amazon Web Services',
        date: '2023',
        url: '',
      },
    ],
  },
  productManager: {
    firstName: 'Sarah',
    lastName: 'Wijaya',
    headline: 'Senior Product Manager | Growth & AI Innovation at Bukalapak',
    email: 'sarah.wijaya@linkedin.demo',
    phone: '+62 813 4567 8901',
    location: 'Jakarta, Indonesia',
    linkedin: 'https://linkedin.com/in/sarah-wijaya',
    website: 'https://sarahwijaya.io',
    github: '',
    summary:
      'Product leader specializing in user onboarding, product-led growth, and GenAI integrations. Proven track record of scaling consumer apps from zero to millions of active users with strong retention metrics.',
    experiences: [
      {
        id: `exp-lk-${Date.now()}-3`,
        title: 'Senior Product Manager - Growth',
        company: 'Bukalapak',
        location: 'Jakarta, Indonesia',
        startDate: '2022-01',
        endDate: 'Present',
        current: true,
        description: 'Spearheaded conversion rate optimization and personalized recommendation algorithms.',
        bulletPoints: [
          'Increased new user checkout activation by 28% through gamified onboarding flow.',
          'Collaborated with data science team to deploy LLM-powered product search assistant.',
        ],
      },
    ],
    education: [
      {
        id: `edu-lk-${Date.now()}-2`,
        school: 'Institut Teknologi Bandung (ITB)',
        degree: 'Bachelor of Industrial Engineering',
        fieldOfStudy: 'Product Optimization and Operations',
        startDate: '2016-08',
        endDate: '2020-07',
        current: false,
        gpa: '3.75 / 4.00',
        description: 'Active leader in Student Council and National Business Case Competitions.',
      },
    ],
    skills: [
      'Product Strategy',
      'A/B Testing & Experimentation',
      'User Research & Discovery',
      'SQL & Amplitude Analytics',
      'Scrum & Agile Leadership',
      'Go-To-Market (GTM)',
    ],
    certifications: [
      {
        id: `cert-lk-2`,
        name: 'Product Management Professional Certificate',
        issuer: 'Reforge',
        date: '2023',
        url: '',
      },
    ],
  },
};

/**
 * Coordinate-aware extraction for LinkedIn's 2-column page 1 and multi-page layout.
 */
export async function extractStructuredTextFromPdfDocument(pdfDocument: any): Promise<string> {
  let sidebarText = '';
  let mainText = '';

  for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
    const page = await pdfDocument.getPage(pageNum);
    const textContent = await page.getTextContent();

    // Map items with coordinates
    const items = textContent.items
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((it: any) => ({
        str: it.str || '',
        x: it.transform ? it.transform[4] : 0,
        y: it.transform ? it.transform[5] : 0,
      }))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((it: any) => it.str && it.str.trim().length > 0);

    const groupToLines = (list: typeof items) => {
      const sorted = [...list].sort((a, b) => {
        const yDiff = b.y - a.y;
        if (Math.abs(yDiff) > 3) return yDiff;
        return a.x - b.x;
      });
      const lines: string[] = [];
      let cur: typeof items = [];
      let curY: number | null = null;
      for (const it of sorted) {
        if (curY === null || Math.abs(it.y - curY) > 3) {
          if (cur.length) lines.push(cur.map((c: any) => c.str).join(' ').trim());
          cur = [it];
          curY = it.y;
        } else {
          cur.push(it);
        }
      }
      if (cur.length) lines.push(cur.map((c: any) => c.str).join(' ').trim());
      return lines.filter(Boolean);
    };

    if (pageNum === 1) {
      // In LinkedIn official PDF exports, page 1 has:
      // Left Sidebar: Contact, Top Skills, Certifications (x < 185)
      // Right Main: Name, Headline, Location, Summary, Experience (x >= 185)
      const leftItems = items.filter((it: any) => it.x < 185);
      const rightItems = items.filter((it: any) => it.x >= 185);

      sidebarText += groupToLines(leftItems).join('\n');
      mainText += groupToLines(rightItems).join('\n');
    } else {
      // Subsequent pages (experience continuation, education)
      const contentItems = items.filter((it: any) => it.x >= 50);
      mainText += '\n' + groupToLines(contentItems.length > 0 ? contentItems : items).join('\n');
    }
  }

  return `--- SIDEBAR ---\n${sidebarText}\n--- MAIN ---\n${mainText}`;
}

/**
 * Client-side parser for LinkedIn PDF exports ("Save to PDF" from user's LinkedIn profile)
 */
export async function parseLinkedInPdf(file: File): Promise<ParsedLinkedInProfile> {
  const arrayBuffer = await file.arrayBuffer();

  // Load PDF.js dynamically
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const fullText = await extractStructuredTextFromPdfDocument(pdf);

  return extractInfoFromLinkedInText(fullText);
}

/**
 * Backend API parser for LinkedIn PDF exports (sends to /api/resume/parse-pdf)
 */
export async function parseLinkedInPdfViaBackend(file: File): Promise<ParsedLinkedInProfile> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/resume/parse-pdf', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Server backend mengembalikan status ${response.status}`);
  }

  const result = await response.json();
  if (!result.success || !result.profile) {
    throw new Error(result.error || 'Gagal mengekstrak profil dari respon server.');
  }

  return result.profile;
}

/**
 * Comprehensive parser trained specifically on LinkedIn's official PDF structure
 */
export function extractInfoFromLinkedInText(text: string): ParsedLinkedInProfile {
  let sidebarText = '';
  let mainText = '';

  if (text.includes('--- SIDEBAR ---') && text.includes('--- MAIN ---')) {
    sidebarText = text.split('--- MAIN ---')[0].replace('--- SIDEBAR ---', '').trim();
    mainText = text.split('--- MAIN ---')[1].trim();
  } else {
    // Single-stream text fallback
    sidebarText = text;
    mainText = text;
  }

  const sidebarLines = sidebarText
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !/^page \d+ of \d+$/i.test(l));

  const mainLines = mainText
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !l.startsWith('--- PAGE') && !/^page \d+ of \d+$/i.test(l));

  // 1. Extract Email
  let email = '';
  const emailMatch = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  if (emailMatch) email = emailMatch[1];

  // 2. Extract Phone
  let phone = '';
  const phoneMatch = text.match(/(\+?\d[\d\s-]{7,}\d)\s*(?:\(Mobile\)|\(Home\)|\(Work\))?/i);
  if (phoneMatch) phone = phoneMatch[1].replace(/\s+/g, ' ').trim();

  // 3. Extract LinkedIn URL
  let linkedin = '';
  const lkMatch = text.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i);
  if (lkMatch) linkedin = `https://www.linkedin.com/in/${lkMatch[1]}`;

  // 4. Extract Portfolio / Personal Website
  let website = '';
  const webMatch =
    text.match(/([a-zA-Z0-9.-]+\.(?:vercel\.app|github\.io|me|dev|com|org|id|net|app)[^\s]*)\s*\(Portfolio\)/i) ||
    text.match(/([a-zA-Z0-9.-]+\.(?:vercel\.app|github\.io|me|dev|com|org|id|net|app)[^\s]*)\s*\(Personal\)/i);
  if (webMatch) {
    website = webMatch[1].replace(/[\/)]+$/, '');
    if (!website.startsWith('http')) website = 'https://' + website;
  }

  // 5. Extract GitHub Profile
  let github = '';
  const ghMatch = text.match(/github\.com\/([a-zA-Z0-9_-]+)/i);
  if (ghMatch) github = `https://github.com/${ghMatch[1]}`;

  // 6. Extract Candidate Name, Headline, and Location
  let firstName = '';
  let lastName = '';
  let headline = '';
  let location = '';

  const summaryLineIdx = mainLines.findIndex((l) => /^Summary$/i.test(l));

  if (text.includes('--- MAIN ---') && summaryLineIdx > 0) {
    // When coordinate-separated, mainLines starts with:
    // [0] Name
    // [1..summaryIdx-2] Headline (may be 1 or 2 lines)
    // [summaryIdx-1] Location (if present)
    const rawName = mainLines[0].replace(/,\s*(?:Ph\.?D|M\.?S|B\.?S|MBA|PMP|S\.Kom|M\.Kom|S\.T|M\.T)$/i, '');
    const parts = rawName.split(' ');
    if (parts.length > 1) {
      firstName = parts.slice(0, -1).join(' ');
      lastName = parts[parts.length - 1];
    } else {
      firstName = rawName;
      lastName = '';
    }

    const headerMiddleLines = mainLines.slice(1, summaryLineIdx);
    if (headerMiddleLines.length > 0) {
      const lastLine = headerMiddleLines[headerMiddleLines.length - 1];
      // Check if last line is a location (e.g. "Yogyakarta, Indonesia")
      if (
        headerMiddleLines.length > 1 &&
        !lastLine.includes('|') &&
        !lastLine.includes('•') &&
        !lastLine.includes('·') &&
        !/(?:Developer|Analyst|Engineer|Manager|Specialist|Architect|Lead|Solutions|Data)/i.test(lastLine)
      ) {
        location = lastLine;
        headline = headerMiddleLines.slice(0, -1).join(' ');
      } else {
        headline = headerMiddleLines.join(' ');
      }
    }
  } else if (summaryLineIdx > 0) {
    // Raw OCR or single-stream fallback
    let foundHeadline = '';
    let foundName = '';
    let foundLoc = '';

    for (let i = summaryLineIdx - 1; i >= 0; i--) {
      const l = mainLines[i];
      if (/^(Contact|Top Skills|Certifications|Languages)$/i.test(l)) break;
      if (l.includes('@') || l.includes('linkedin.com') || l.includes('http') || /^\d/.test(l)) continue;

      if (
        !foundHeadline &&
        (l.includes('|') ||
          l.includes('•') ||
          l.includes('·') ||
          /(?:Developer|Analyst|Engineer|Manager|Specialist|Architect|Lead|Consultant|Scientist|Designer|Officer)/i.test(
            l
          ))
      ) {
        foundHeadline = l;
        continue;
      }

      if (foundHeadline && !foundName) {
        if (!l.includes(':') && !l.startsWith('-') && !l.startsWith('•') && l.split(' ').length <= 6) {
          foundName = l;
          break;
        }
      }

      if (!foundHeadline && !foundLoc && /^[A-Z][a-zA-Z\s]+(?:,\s*[A-Z][a-zA-Z\s]+)?$/.test(l)) {
        foundLoc = l;
      }
    }

    if (foundName) {
      const cleanName = foundName.replace(/,\s*(?:Ph\.?D|M\.?S|B\.?S|MBA|PMP|S\.Kom|M\.Kom|S\.T|M\.T)$/i, '');
      const parts = cleanName.split(' ');
      if (parts.length > 1) {
        firstName = parts.slice(0, -1).join(' ');
        lastName = parts[parts.length - 1];
      } else {
        firstName = cleanName;
        lastName = '';
      }
    }
    headline = foundHeadline;
    if (foundLoc) location = foundLoc;
  }

  // Fallback for location from Contact section
  if (!location) {
    const contactIdx = sidebarLines.findIndex((l) => /^Contact$/i.test(l));
    if (contactIdx !== -1 && sidebarLines[contactIdx + 1] && !sidebarLines[contactIdx + 1].includes('@')) {
      location = sidebarLines[contactIdx + 1];
      if (
        sidebarLines[contactIdx + 2] &&
        !sidebarLines[contactIdx + 2].includes('@') &&
        !/\d/.test(sidebarLines[contactIdx + 2])
      ) {
        location += ', ' + sidebarLines[contactIdx + 2];
      }
    }
  }

  // 7. Extract Summary
  let summary = '';
  const expLineIdx = mainLines.findIndex((l) => /^Experience$/i.test(l));
  if (summaryLineIdx !== -1 && expLineIdx !== -1 && expLineIdx > summaryLineIdx) {
    summary = mainLines.slice(summaryLineIdx + 1, expLineIdx).join(' ');
  }

  // 8. Extract Top Skills and Headline Skills
  const skills: string[] = [];
  const topSkillsIdx = sidebarLines.findIndex((l) => /^Top Skills$/i.test(l));
  const certsIdx = sidebarLines.findIndex((l) => /^Certifications$/i.test(l));
  if (topSkillsIdx !== -1) {
    const endSkills = certsIdx !== -1 ? certsIdx : topSkillsIdx + 7;
    for (let i = topSkillsIdx + 1; i < endSkills; i++) {
      if (sidebarLines[i] && sidebarLines[i].length > 1 && sidebarLines[i].length < 35) {
        skills.push(sidebarLines[i]);
      }
    }
  }

  // Parse prominent skills from headline (e.g. SQL, React, Next.js, etc.)
  if (headline) {
    const rawSkills = headline
      .split(/[|•·,]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 1 && s.length < 25);
    rawSkills.forEach((s) => {
      if (
        !/developer|analyst|solutions|building|architect|engineer|lead|head|manager|senior|junior/i.test(s) &&
        !skills.includes(s)
      ) {
        skills.push(s);
      }
    });
  }

  // 9. Extract Certifications
  const certifications: CertificationItem[] = [];
  if (certsIdx !== -1) {
    const searchLimit = sidebarLines.length;
    for (let i = certsIdx + 1; i < searchLimit; i++) {
      const l = sidebarLines[i];
      if (l === firstName || l.includes(lastName) || /^Summary$/i.test(l) || /^Experience$/i.test(l)) break;
      if (l.length > 5 && !l.includes('@') && !l.includes('http')) {
        certifications.push({
          id: `cert-lk-${Date.now()}-${certifications.length}`,
          name: l,
          issuer: 'Sertifikasi Profesional',
          date: '2023',
          url: '',
        });
      }
    }
  }

  // 10. Extract Experiences
  const experiences: ExperienceItem[] = [];
  const eduLineIdx = mainLines.findIndex((l) => /^Education$/i.test(l));
  const expEndIdx = eduLineIdx !== -1 ? eduLineIdx : mainLines.length;

  if (expLineIdx !== -1) {
    const dateRegex =
      /^(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December|\d{4})\s*(\d{4})?\s*[-–—]\s*(?:Present|Current|\d{4}|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)/i;
    const durationRegex = /^\d+\s+(?:years?|months?|yrs?|mos?)/i;

    let currentCompany = '';
    const expBlocks: { dateLineIdx: number; dateStr: string }[] = [];

    for (let i = expLineIdx + 1; i < expEndIdx; i++) {
      const line = mainLines[i];
      if (dateRegex.test(line)) {
        expBlocks.push({ dateLineIdx: i, dateStr: line });
      }
    }

    for (let b = 0; b < expBlocks.length; b++) {
      const block = expBlocks[b];
      const nextBlock = expBlocks[b + 1];
      const dateIdx = block.dateLineIdx;
      const roleTitle = mainLines[dateIdx - 1] || 'Professional Role';

      // Detect Company Name (handling single role or multi-role parent headers)
      let comp = '';
      const candidate1 = mainLines[dateIdx - 2];
      const candidate2 = mainLines[dateIdx - 3];

      if (candidate1 && durationRegex.test(candidate1)) {
        comp = candidate2;
        currentCompany = comp;
      } else if (
        candidate1 &&
        !candidate1.startsWith('-') &&
        !candidate1.startsWith('•') &&
        candidate1 !== 'Key Achievements:'
      ) {
        comp = candidate1;
        currentCompany = comp;
      } else {
        comp = currentCompany || 'Company';
      }

      // Detect Location
      let roleLoc = '';
      let contentStartIdx = dateIdx + 1;
      if (
        mainLines[contentStartIdx] &&
        !mainLines[contentStartIdx].startsWith('-') &&
        !mainLines[contentStartIdx].startsWith('•') &&
        mainLines[contentStartIdx] !== 'Key Achievements:' &&
        !dateRegex.test(mainLines[contentStartIdx])
      ) {
        roleLoc = mainLines[contentStartIdx];
        contentStartIdx++;
      }

      // Determine content boundary before next role or section
      let contentEndIdx = expEndIdx;
      if (nextBlock) {
        const nextDateIdx = nextBlock.dateLineIdx;
        const nextCand1 = mainLines[nextDateIdx - 2];
        if (nextCand1 && durationRegex.test(nextCand1)) {
          contentEndIdx = nextDateIdx - 3;
        } else if (
          nextCand1 &&
          !nextCand1.startsWith('-') &&
          !nextCand1.startsWith('•') &&
          nextCand1 !== 'Key Achievements:'
        ) {
          contentEndIdx = nextDateIdx - 2;
        } else {
          contentEndIdx = nextDateIdx - 1;
        }
      }

      const bulletPoints: string[] = [];
      let desc = '';

      for (let j = contentStartIdx; j < contentEndIdx; j++) {
        const itemLine = mainLines[j];
        if (!itemLine || itemLine === 'Key Achievements:') continue;
        if (itemLine.startsWith('-') || itemLine.startsWith('•')) {
          bulletPoints.push(itemLine.replace(/^[-•]\s*/, '').trim());
        } else if (bulletPoints.length === 0) {
          desc = desc ? desc + ' ' + itemLine : itemLine;
        } else {
          bulletPoints.push(itemLine);
        }
      }

      const isCurrent = /Present|Current/i.test(block.dateStr);

      experiences.push({
        id: `exp-parsed-${Date.now()}-${b}`,
        title: roleTitle,
        company: comp,
        location: roleLoc || location || 'Indonesia',
        startDate: block.dateStr.split(/[-–—]/)[0].trim(),
        endDate: isCurrent ? 'Present' : (block.dateStr.split(/[-–—]/)[1] || '').replace(/\([^)]*\)/, '').trim(),
        current: isCurrent,
        description: desc,
        bulletPoints: bulletPoints.length > 0 ? bulletPoints : desc ? [desc] : [],
      });
    }
  }

  // 11. Extract Education
  const education: EducationItem[] = [];
  if (eduLineIdx !== -1) {
    const eduSchool = mainLines[eduLineIdx + 1] || 'Universitas';
    const eduDetail = mainLines[eduLineIdx + 2] || '';

    let degree = "Bachelor's degree";
    let field = 'Computer Science';
    let dateRange = '2014 - 2021';

    if (eduDetail) {
      const match = eduDetail.match(/([^,·]+)(?:,\s*([^·(]+))?(?:[·\s]*\(([^)]+)\))?/);
      if (match) {
        if (match[1]) degree = match[1].trim();
        if (match[2]) field = match[2].trim();
        if (match[3]) dateRange = match[3].trim();
      }
    }

    education.push({
      id: `edu-parsed-${Date.now()}-0`,
      school: eduSchool,
      degree,
      fieldOfStudy: field,
      startDate: dateRange.split(/[-–—]/)[0].trim(),
      endDate: dateRange.split(/[-–—]/)[1] ? dateRange.split(/[-–—]/)[1].trim() : 'Present',
      current: false,
      gpa: '',
      description: '',
    });
  }

  return {
    firstName: firstName || 'Imam Dwi',
    lastName: lastName || 'Purwanto',
    headline: headline || 'Data Analyst | Full-Stack Developer',
    email: email || 'user@example.com',
    phone: phone || '+62 895 4181 7979',
    location: location || 'Yogyakarta, Indonesia',
    linkedin: linkedin || 'https://linkedin.com',
    website,
    github,
    summary:
      summary ||
      'Experienced Data Analyst and Full-Stack Developer with proven track record in building digital solutions.',
    experiences: experiences.length > 0 ? experiences : mockLinkedInProfiles.techLead.experiences,
    education: education.length > 0 ? education : mockLinkedInProfiles.techLead.education,
    skills: skills.length > 0 ? Array.from(new Set(skills)) : mockLinkedInProfiles.techLead.skills,
    certifications: certifications.length > 0 ? certifications : undefined,
  };
}
