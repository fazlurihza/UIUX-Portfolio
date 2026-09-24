import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "./data/caseStudies";
import FullPageScroller from "./components/FullPageScroller";
import Nav from "./components/Nav";


// ─── Section 1 · Hero ─────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="fp-hero"
      aria-label="Hero"
    >
      <div className="fp-hero-inner">
        <div className="hero-grid">

          {/* Left: text */}
          <div className="hero-text">
            <div className="gi mb-8 flex items-center gap-3">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)]">
                Available for projects &middot; 2025
              </span>
            </div>

            <h1 className="gi font-serif hero-headline text-[var(--color-ink)]">
              I craft digital
              <br />
              <em className="not-italic text-[var(--color-accent)]">experiences.</em>
            </h1>

            <p className="gi mt-7 max-w-sm text-base leading-relaxed text-[var(--color-muted)]">
              UI/UX designer specializing in product thinking, interaction
              design, and design systems.
            </p>

            <div className="gi mt-12 flex items-center gap-4" aria-hidden="true">
              <span className="h-px w-10 bg-[var(--color-border)]" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-muted)]">
                scroll to explore
              </span>
            </div>
          </div>

          {/* Right: profile photo */}
          <div className="gi hero-photo-wrap">
            <div className="hero-photo-frame">
              <Image
                src="/profile.jpg"
                alt="Ayasha Zafasha — UI/UX Designer"
                fill
                sizes="(max-width: 768px) 80vw, 42vw"
                className="object-cover object-top"
                priority
              />
              <div className="hero-photo-overlay" aria-hidden="true" />
            </div>
            <p className="hero-photo-label">Ayasha Zafasha &mdash; Designer</p>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Section 2 · Work ─────────────────────────────────────────────────────────
function WorkSection() {
  return (
    <section className="fp-work" aria-labelledby="work-heading">
      <div className="fp-work-inner">

        {/* Section header */}
        <div className="gi fp-work-header">
          <h2
            id="work-heading"
            className="font-serif text-3xl text-[var(--color-ink)] md:text-4xl"
          >
            Selected Work
          </h2>
          <span className="text-[11px] text-[var(--color-muted)]">
            {caseStudies.length} projects
          </span>
        </div>

        {/* 2×2 grid */}
        <div className="fp-work-grid">
          {caseStudies.map((study, i) => (
            <Link
              key={study.id}
              href={study.href}
              className="gi fp-grid-card group"
              aria-label={`View: ${study.projectTitle}`}
            >
              {/* Full-bleed image */}
              <div className="fp-grid-thumb project-thumb">
                <Image
                  src={study.thumbnailUrl}
                  alt={study.projectTitle}
                  fill
                  sizes="(max-width: 768px) 50vw, 40vw"
                  className="object-cover"
                  priority={i < 2}
                />
                {/* Gradient overlay — always visible */}
                <div className="fp-img-overlay" aria-hidden="true" />
                {/* Label on image */}
                <div className="fp-img-label">
                  <span className="text-[10px] font-medium uppercase tracking-widest text-white/60">
                    {study.category} &middot; {study.year}
                  </span>
                  <h3 className="font-serif text-lg leading-snug text-white md:text-xl">
                    {study.projectTitle}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>



      </div>
    </section>
  );
}

// ─── Section 3 · About ────────────────────────────────────────────────────────
function AboutSection() {
  const skills = [
    "Product Strategy",
    "Design Systems",
    "Interaction Design",
    "User Research",
    "Wireframing",
    "Prototyping",
    "Information Architecture",
    "Accessibility",
  ];

  return (
    <section className="fp-about" aria-labelledby="about-heading">
      <div className="fp-about-inner">
        <div className="fp-about-grid items-center">

          {/* Left: text */}
          <div className="fp-about-text">
            <h2
              id="about-heading"
              className="gi font-serif text-5xl leading-[1.05] text-[var(--color-ink)] md:text-6xl"
            >
              Design as a
              <br />
              <em className="not-italic text-[var(--color-accent)]">conversation.</em>
            </h2>
            <p className="gi mt-8 max-w-md text-lg leading-relaxed text-[var(--color-muted)] md:text-xl">
              I&apos;m Aya &mdash; a product designer with 6 years of experience
              working at the intersection of research, strategy, and craft. I
              believe the best design is invisible: it simply works.
            </p>
            <p className="gi mt-5 max-w-md text-base leading-relaxed text-[var(--color-muted)]">
              Previously at Figma, Linear, and Monzo. Currently open to senior
              IC and founding designer roles at ambitious teams.
            </p>
            
            <div className="gi mt-10">
              <a
                href="/resume.pdf"
                download
                className="link-underline inline-flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-[var(--color-ink)]"
              >
                Download Résumé
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M6 1v7M3 8l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: stats & capabilities */}
          <div className="fp-about-right flex flex-col gap-14">
            
            {/* Stats row */}
            <div className="gi flex gap-10">
              {[["6+","Years"],["40+","Projects"],["3","Startups"]].map(([v, l], i) => (
                <div key={l} className="flex flex-col" style={{ animationDelay: `${i * 100}ms` }}>
                  <span className="font-serif text-4xl text-[var(--color-ink)] md:text-5xl">{v}</span>
                  <span className="mt-2 text-[10px] font-medium uppercase tracking-widest text-[var(--color-muted)]">{l}</span>
                </div>
              ))}
            </div>

            {/* Capabilities */}
            <div className="fp-about-skills">
              <p className="gi mb-6 text-[11px] font-medium uppercase tracking-widest text-[var(--color-muted)]">
                Capabilities
              </p>
              <div className="gi flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-xs font-medium text-[var(--color-ink)] shadow-sm transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Section 4 · Contact ──────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section className="fp-contact flex flex-col justify-between" aria-label="Contact">
      <div className="fp-contact-inner flex-1 flex flex-col items-center justify-center text-center pb-10">
        
        <p className="gi mb-5 text-[11px] font-medium uppercase tracking-widest text-[var(--color-muted)]">
          Start a project
        </p>
        
        <h2 className="gi font-serif text-6xl leading-[1.05] text-[var(--color-ink)] md:text-[7rem] lg:text-[8.5rem] tracking-tight">
          Let&apos;s talk
          <br />
          <em className="not-italic text-[var(--color-accent)]">business.</em>
        </h2>
        
        <div className="gi mt-14 md:mt-20">
          <a
            href="mailto:hello@ayashazafasha.com"
            className="link-underline inline-block text-xl font-light tracking-wide text-[var(--color-ink)] md:text-3xl"
          >
            hello@ayashazafasha.com
          </a>
        </div>

        <div className="gi mt-16 flex flex-col items-center gap-6">
          <p className="text-sm font-serif italic text-[var(--color-muted)]">
            Based in Jakarta, ID
          </p>
          <div className="flex gap-8">
            {[
              { label: "Twitter",  href: "https://twitter.com"  },
              { label: "Dribbble", href: "https://dribbble.com" },
              { label: "LinkedIn", href: "https://linkedin.com" },
            ].map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-[11px] font-medium uppercase tracking-widest text-[var(--color-ink)] transition-colors duration-300 hover:text-[var(--color-accent)]"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Footer bar */}
      <div className="w-full max-w-[var(--max-w)] mx-auto px-[var(--px)] pb-10">
        <div className="gi flex justify-start border-t border-[var(--color-border)] pt-8">
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-muted)]">
            &copy; {new Date().getFullYear()} Ayasha Zafasha. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const SECTION_LABELS = ["Hero", "About", "Work", "Contact"];

export default function Home() {
  return (
    <>
      <Nav />
      <FullPageScroller
        labels={SECTION_LABELS}
        sections={[
          <HeroSection    key="hero"    />,
          <AboutSection   key="about"   />,
          <WorkSection    key="work"    />,
          <ContactSection key="contact" />,
        ]}
      />
    </>
  );
}
