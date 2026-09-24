// ─── Case Studies Data ──────────────────────────────────────────────────────
// Replace thumbnailUrl values with your actual project screenshots.

export interface CaseStudy {
  id: string;
  projectTitle: string;
  category: string;
  shortDescription: string;
  thumbnailUrl: string;
  href: string; // link to full case study page
  year: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "aria-fintech",
    projectTitle: "Aria Banking",
    category: "Fintech App",
    shortDescription:
      "Redesigning a mobile banking experience around clarity and calm — reducing cognitive load by 40% through progressive disclosure and a restrained visual language.",
    thumbnailUrl: "/cs-fintech.jpg",
    href: "#",
    year: "2024",
  },
  {
    id: "nova-saas",
    projectTitle: "Nova Analytics",
    category: "SaaS Platform",
    shortDescription:
      "A data-dense dashboard made effortless. Information architecture, smart defaults, and a scalable design system for 12,000+ enterprise users.",
    thumbnailUrl: "/cs-saas.jpg",
    href: "#",
    year: "2024",
  },
  {
    id: "aura-ecommerce",
    projectTitle: "Aura Fine Jewelry",
    category: "E-Commerce",
    shortDescription:
      "Translating the tactile elegance of a luxury boutique into a digital experience — every pixel deliberate, every transition earned.",
    thumbnailUrl: "/cs-ecommerce.jpg",
    href: "#",
    year: "2023",
  },
  {
    id: "elara-wellness",
    projectTitle: "Bloom Wellness",
    category: "Health & Wellbeing",
    shortDescription:
      "A gentle, evidence-based wellness companion. Designed with inclusive principles, biometric data made approachable, and calm as a north star.",
    thumbnailUrl: "/cs-health.jpg",
    href: "#",
    year: "2023",
  },
  {
    id: "lumina-branding",
    projectTitle: "Archetyp Studio",
    category: "Brand Identity",
    shortDescription:
      "A minimalist brand identity for an architectural firm. Focus on typography, spatial balance, and a timeless visual language.",
    thumbnailUrl: "/cs-branding.jpg",
    href: "#",
    year: "2023",
  },
  {
    id: "krypton-web3",
    projectTitle: "Krypton Wallet",
    category: "Web3 Interface",
    shortDescription:
      "A clean and accessible crypto wallet interface. Stripping away the complexity of blockchain to focus on trust and ease of use.",
    thumbnailUrl: "/cs-web3.jpg",
    href: "#",
    year: "2022",
  },
];
