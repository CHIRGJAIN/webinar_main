"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import "./home.css";

type BadgeType = "LIVE" | "SCHEDULED" | "NEW" | "INSTITUTIONAL";

type Webinar = {
  id: string;
  title: string;
  thumbnailUrl: string;
  badgeType: BadgeType;
  datetime: string;
};

const HERO_IMAGE_URL = "https://picsum.photos/seed/brics-hero/2000/1200"; // replace with your BRICS/global webinar hero image
const CARD_SCROLL_STEP = 236; // (220px card + 16px gap) * 1 card; used for arrow navigation

const sampleWebinars: Webinar[] = [
  { id: "w1", title: "Live: Sustainable Trade Routes", thumbnailUrl: "https://picsum.photos/seed/live1/640/360", badgeType: "LIVE", datetime: "2025-03-12T14:00:00Z" },
  { id: "w2", title: "Digital Public Infra Forum", thumbnailUrl: "https://picsum.photos/seed/live2/640/360", badgeType: "LIVE", datetime: "2025-03-12T16:30:00Z" },
  { id: "w3", title: "BRICS Climate Dialogue", thumbnailUrl: "https://picsum.photos/seed/sched1/640/360", badgeType: "SCHEDULED", datetime: "2025-03-15T10:00:00Z" },
  { id: "w4", title: "New: Health Tech Cohort", thumbnailUrl: "https://picsum.photos/seed/new1/640/360", badgeType: "NEW", datetime: "2025-03-18T09:30:00Z" },
  { id: "w5", title: "Institutional Analytics", thumbnailUrl: "https://picsum.photos/seed/inst1/640/360", badgeType: "INSTITUTIONAL", datetime: "2025-03-20T12:00:00Z" },
  { id: "w6", title: "Cross-border Education", thumbnailUrl: "https://picsum.photos/seed/sched2/640/360", badgeType: "SCHEDULED", datetime: "2025-03-22T13:00:00Z" },
  { id: "w7", title: "Energy Transition Brief", thumbnailUrl: "https://picsum.photos/seed/sub1/640/360", badgeType: "NEW", datetime: "2025-03-25T15:30:00Z" },
  { id: "w8", title: "Policy Lab: AI Safety", thumbnailUrl: "https://picsum.photos/seed/sub2/640/360", badgeType: "NEW", datetime: "2025-03-28T11:00:00Z" },
  { id: "w9", title: "Global Health Forum", thumbnailUrl: "https://picsum.photos/seed/live3/640/360", badgeType: "LIVE", datetime: "2025-04-01T12:00:00Z" },
  { id: "w10", title: "Energy Security Roundtable", thumbnailUrl: "https://picsum.photos/seed/sched3/640/360", badgeType: "SCHEDULED", datetime: "2025-04-03T09:30:00Z" },
  { id: "w11", title: "Trade Policy Deep Dive", thumbnailUrl: "https://picsum.photos/seed/new3/640/360", badgeType: "NEW", datetime: "2025-04-05T15:00:00Z" },
  { id: "w12", title: "Institutional Governance", thumbnailUrl: "https://picsum.photos/seed/inst2/640/360", badgeType: "INSTITUTIONAL", datetime: "2025-04-08T10:00:00Z" },
  { id: "w13", title: "Live: Maritime Corridors", thumbnailUrl: "https://picsum.photos/seed/live4/640/360", badgeType: "LIVE", datetime: "2025-04-10T14:00:00Z" },
  { id: "w14", title: "Scheduled: Green Finance", thumbnailUrl: "https://picsum.photos/seed/sched4/640/360", badgeType: "SCHEDULED", datetime: "2025-04-12T09:00:00Z" },
  { id: "w15", title: "Subscribed: Cultural Exchange", thumbnailUrl: "https://picsum.photos/seed/new4/640/360", badgeType: "NEW", datetime: "2025-04-14T11:30:00Z" },
  { id: "w16", title: "Institutional: Education Pact", thumbnailUrl: "https://picsum.photos/seed/inst3/640/360", badgeType: "INSTITUTIONAL", datetime: "2025-04-16T16:00:00Z" },
  { id: "w17", title: "Live: Agri-Tech Cohort", thumbnailUrl: "https://picsum.photos/seed/live5/640/360", badgeType: "LIVE", datetime: "2025-04-18T12:00:00Z" },
  { id: "w18", title: "Scheduled: Urban Resilience", thumbnailUrl: "https://picsum.photos/seed/sched5/640/360", badgeType: "SCHEDULED", datetime: "2025-04-20T10:30:00Z" },
  { id: "w19", title: "Subscribed: Culture Summit", thumbnailUrl: "https://picsum.photos/seed/new5/640/360", badgeType: "NEW", datetime: "2025-04-22T17:30:00Z" },
  { id: "w20", title: "Institutional: Digital Trust", thumbnailUrl: "https://picsum.photos/seed/inst4/640/360", badgeType: "INSTITUTIONAL", datetime: "2025-04-24T15:00:00Z" },
  { id: "w21", title: "Live: Energy Markets", thumbnailUrl: "https://picsum.photos/seed/live6/640/360", badgeType: "LIVE", datetime: "2025-04-26T09:00:00Z" },
  { id: "w22", title: "Scheduled: Trade Corridors", thumbnailUrl: "https://picsum.photos/seed/sched6/640/360", badgeType: "SCHEDULED", datetime: "2025-04-28T11:00:00Z" },
  { id: "w23", title: "Subscribed: Water Security", thumbnailUrl: "https://picsum.photos/seed/new6/640/360", badgeType: "NEW", datetime: "2025-04-30T13:30:00Z" },
  { id: "w24", title: "Institutional: Talent Mobility", thumbnailUrl: "https://picsum.photos/seed/inst5/640/360", badgeType: "INSTITUTIONAL", datetime: "2025-05-02T10:00:00Z" },
];

const sectionsConfig = [
  { title: "Live Webinars", filter: (w: Webinar) => w.badgeType === "LIVE" },
  { title: "Scheduled", filter: (w: Webinar) => w.badgeType === "SCHEDULED" },
  { title: "Subscribed", filter: (w: Webinar) => ["NEW"].includes(w.badgeType) },
  { title: "Institutional", filter: (w: Webinar) => w.badgeType === "INSTITUTIONAL" },
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const carouselRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [heroVisibility, setHeroVisibility] = useState(1);
  const [sectionElevate, setSectionElevate] = useState({ opacity: 0.86, translate: 8 });
  const [heroIndex, setHeroIndex] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState<Record<number, number>>({});

  const sections = useMemo(
    () =>
      sectionsConfig.map((cfg) => ({
        title: cfg.title,
        items: sampleWebinars.filter(cfg.filter),
      })),
    []
  );

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const vh = window.innerHeight * 0.45; // fade over first 45vh
      const scrollY = window.scrollY;
      const progress = Math.min(Math.max(scrollY / vh, 0), 1);
      const visibility = 1 - progress * 0.94; // fade to 0.06
      setHeroVisibility(visibility);
      setSectionElevate({
        opacity: 0.86 + progress * 0.14,
        translate: 8 - progress * 8,
      });
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.15}px)`; // slower move for depth
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % sections[0].items.length || 1);
    }, 5000);
    return () => clearInterval(id);
  }, [sections]);

  const scrollByDistance = (index: number, direction: "left" | "right") => {
    const el = carouselRefs.current[index];
    if (!el) return;
    const distance = CARD_SCROLL_STEP * 3 * (direction === "left" ? -1 : 1);
    el.scrollBy({ left: distance, behavior: "smooth" });
  };

  const handleKeyNav = (sectionIdx: number, itemIdx: number, direction: number) => {
    const items = sections[sectionIdx].items;
    if (!items.length) return;
    const nextIdx = Math.min(Math.max(itemIdx + direction, 0), items.length - 1);
    setFocusedIndex((prev) => ({ ...prev, [sectionIdx]: nextIdx }));
    const nextEl = document.querySelector<HTMLElement>(`[data-card="${sectionIdx}-${nextIdx}"]`);
    if (nextEl) nextEl.focus({ preventScroll: false });
  };

  const heroCard = sections[0].items[heroIndex % sections[0].items.length] || sections[0].items[0];
  const heroStyle: CSSProperties = {
    ["--hero-visibility" as any]: heroVisibility,
    pointerEvents: heroVisibility < 0.12 ? "none" : "auto",
  };
  const contentStyle: CSSProperties = {
    ["--section-opacity" as any]: sectionElevate.opacity,
    ["--section-translate" as any]: `${sectionElevate.translate}px`,
  };

  return (
    <div className="page-shell">
      <div
        ref={heroRef}
        className="hero hero--edge"
        style={heroStyle}
      >
        <div ref={parallaxRef} className="hero__bg" aria-hidden>
          <Image src={HERO_IMAGE_URL} alt="BRICS webinar visual" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="hero__overlay" aria-hidden />
        <div className="hero__blur" aria-hidden />
        <div className="hero__glow" aria-hidden />
        <div className="hero__content">
          <div className="hero__left">
            <span className="hero__tag">CINEMATIC WEBINAR EXPERIENCE</span>
            <h1 className="hero__title" tabIndex={0}>
              TRINIX Global Network Platform
            </h1>
            <p className="hero__subtitle">Join secure, high-quality virtual conferences powered by India.</p>
            <div className="hero__ctas">
              <button className="btn btn--primary" aria-label="Join the platform now">
                Join Now
              </button>
              <button className="btn btn--secondary" aria-label="Host a webinar">
                Host Webinar
              </button>
            </div>
            {heroCard && (
              <div className="hero__highlight">
                <div className="hero__highlight-badge">{heroCard.badgeType}</div>
                <div>
                  <p className="hero__highlight-title">{heroCard.title}</p>
                  <p className="hero__highlight-sub">{formatDate(heroCard.datetime)}</p>
                </div>
              </div>
            )}
          </div>
          <div className="hero__right" aria-hidden />
        </div>
      </div>

      <main className="content" style={contentStyle}>
        {sections.map((section, sectionIdx) => (
          <section key={section.title} className="row">
            <div className="row__header">
              <h2 className="row__title">{section.title}</h2>
            </div>
            <div className="row__container">
              {section.items.length > 0 && (
                <button
                  type="button"
                  className="row__arrow row__arrow--overlay row__arrow--left"
                  aria-label={`Scroll ${section.title} left`}
                  onClick={() => scrollByDistance(sectionIdx, "left")}
                >
                  ◀
                </button>
              )}
              <div
              className="row__track"
              ref={(el) => {
                carouselRefs.current[sectionIdx] = el;
              }}
              role="list"
              aria-label={`${section.title} carousel`}
            >
                {section.items.map((item, itemIdx) => (
                  <article
                    key={item.id}
                    role="listitem"
                    className={`card ${section.title === "Subscribed" ? "card--subscribed" : ""}`}
                    tabIndex={focusedIndex[sectionIdx] === itemIdx || (itemIdx === 0 && focusedIndex[sectionIdx] === undefined) ? 0 : -1}
                    data-card={`${sectionIdx}-${itemIdx}`}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowRight") {
                        e.preventDefault();
                        handleKeyNav(sectionIdx, itemIdx, 1);
                      } else if (e.key === "ArrowLeft") {
                        e.preventDefault();
                        handleKeyNav(sectionIdx, itemIdx, -1);
                      }
                    }}
                  >
                    <div className="card__thumb">
                      {(item.badgeType === "LIVE" || item.badgeType === "NEW") && <span className="card__badge">{item.badgeType}</span>}
                      <Image src={item.thumbnailUrl} alt={item.title} fill sizes="220px" loading="lazy" style={{ objectFit: "cover" }} />
                      <div className="card__overlay" />
                    </div>
                    {section.title === "Subscribed" && (
                      <div className="card__subscribed-pill">
                        <span aria-hidden="true">★</span> Subscribed
                      </div>
                    )}
                    <div className="card__meta">
                      <p className="card__title">{item.title}</p>
                      <p className="card__subtitle">{formatDate(item.datetime)}</p>
                    </div>
                  </article>
                ))}
                {section.items.length === 0 && <div className="row__empty">No items available</div>}
              </div>
              {section.items.length > 0 && (
                <button
                  type="button"
                  className="row__arrow row__arrow--overlay row__arrow--right"
                  aria-label={`Scroll ${section.title} right`}
                  onClick={() => scrollByDistance(sectionIdx, "right")}
                >
                  ▶
                </button>
              )}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
