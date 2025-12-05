"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { formatDate, sampleWebinars, type Webinar } from "./data/webinars";
import "./home.css";

const HERO_IMAGE_URL = "https://picsum.photos/seed/brics-hero/2000/1200"; // replace with your BRICS/global webinar hero image
const VISIBLE_CARD_COUNT = 5; // show five cards per section before scrolling

const sectionsConfig = [
  { title: "Live Webinars", filter: (w: Webinar) => w.badgeType === "LIVE" },
  { title: "Scheduled", filter: (w: Webinar) => w.badgeType === "SCHEDULED" },
  { title: "Subscribed", filter: (w: Webinar) => ["NEW"].includes(w.badgeType) },
  { title: "Institutional", filter: (w: Webinar) => w.badgeType === "INSTITUTIONAL" },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const carouselRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [heroVisibility, setHeroVisibility] = useState(1);
  const [sectionElevate, setSectionElevate] = useState({ opacity: 0.86, translate: 8 });
  const [heroIndex, setHeroIndex] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState<Record<number, number>>({});
  const [selectedWebinar, setSelectedWebinar] = useState<Webinar | null>(null);

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedWebinar(null);
      }
    };
    if (selectedWebinar) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [selectedWebinar]);

  const scrollByDistance = (index: number, direction: "left" | "right") => {
    const el = carouselRefs.current[index];
    if (!el) return;

    const firstCard = el.querySelector<HTMLElement>(".card");
    if (!firstCard) return;

    const style = window.getComputedStyle(el);
    const gap = parseFloat(style.columnGap || style.gap || "0") || 0;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const distance = (cardWidth + gap) * VISIBLE_CARD_COUNT * (direction === "left" ? -1 : 1);

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
    <div className="page-shell" data-modal-open={selectedWebinar ? "true" : "false"}>
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
                  className="row__arrow row__arrow--inline row__arrow--inline-left"
                  aria-label={`Scroll ${section.title} left`}
                  onClick={() => scrollByDistance(sectionIdx, "left")}
                >
                  {"<"}
                </button>
              )}
              <div
                className="row__scroll"
                ref={(el) => {
                  carouselRefs.current[sectionIdx] = el;
                }}
                aria-label={`${section.title} carousel`}
              >
              <div className="row__track" role="list" style={{ ["--cards-visible" as any]: VISIBLE_CARD_COUNT }}>
                {section.items.map((item, itemIdx) => (
                  <Link
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
                    href={`/webinar/${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedWebinar(item);
                    }}
                  >
                      <div className="card__thumb">
                        {(item.badgeType === "LIVE" || item.badgeType === "NEW") && <span className="card__badge">{item.badgeType}</span>}
                        <Image src={item.thumbnailUrl} alt={item.title} fill sizes="220px" loading="lazy" style={{ objectFit: "cover" }} />
                        <div className="card__overlay" />
                      </div>
                      {section.title === "Subscribed" && (
                        <div className="card__subscribed-pill">
                          <span aria-hidden="true">*</span> Subscribed
                        </div>
                      )}
                      <div className="card__meta card__meta--base">
                        <p className="card__title">{item.title}</p>
                        <p className="card__subtitle">{formatDate(item.datetime)}</p>
                      </div>
                      {(() => {
                        const year = new Date(item.datetime).getFullYear();
                        const hoverMeta = [String(year), "U/A 13+", "Hindi", "Reality", "Comedy"];
                        const desc = `${item.title} — Join live to participate in polls, Q&A, and watch with the community.`;
                        return (
                          <div className="card__hover-card" aria-hidden="true">
                            <div className="card__hover-bg" style={{ backgroundImage: `url(${item.thumbnailUrl})` }}>
                              <div className="card__hover-gradient" />
                            </div>
                            <div className="card__hover-content">
                              <div className="card__hover-actions">
                                <button className="card__hover-btn card__hover-btn--play">
                                  <span aria-hidden="true">▶</span>
                                  Watch Now
                                </button>
                                <button className="card__hover-btn card__hover-btn--icon" aria-label="Add to list">
                                  +
                                </button>
                              </div>
                              <div className="card__hover-meta">
                                {hoverMeta.map((metaItem) => (
                                  <span key={metaItem}>{metaItem}</span>
                                ))}
                              </div>
                              <p className="card__hover-desc">{desc}</p>
                            </div>
                          </div>
                        );
                      })()}
                    </Link>
                  ))}
                  {section.items.length === 0 && <div className="row__empty">No items available</div>}
                </div>
              </div>
              {section.items.length > 0 && (
                <button
                  type="button"
                  className="row__arrow row__arrow--overlay row__arrow--right"
                  aria-label={`Scroll ${section.title} right`}
                  onClick={() => scrollByDistance(sectionIdx, "right")}
                >
                  {">"}
                </button>
              )}
            </div>
          </section>
        ))}
      </main>

      {selectedWebinar && (
        <div className="modal" role="dialog" aria-modal="true" aria-label={selectedWebinar.title}>
          <div className="modal__backdrop" onClick={() => setSelectedWebinar(null)} />
          <div className="modal__panel" role="document">
            <button className="modal__close" aria-label="Close details" onClick={() => setSelectedWebinar(null)}>
              ×
            </button>
            <div className="modal__media">
              <div
                className="modal__media-bg"
                style={{ backgroundImage: `url(${selectedWebinar.thumbnailUrl})` }}
                aria-hidden="true"
              />
              <div className="modal__media-gradient" aria-hidden="true" />
            </div>
            <div className="modal__video">
              <video
                controls
                preload="metadata"
                poster={selectedWebinar.thumbnailUrl}
              >
                <source src="https://cdn.coverr.co/videos/coverr-the-khaptad-national-park-7893/1080p.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="modal__body">
              <div className="modal__eyebrow">
                <span className="modal__badge">{selectedWebinar.badgeType}</span>
                <span className="modal__meta-chip">New Season</span>
              </div>
              <h3 className="modal__title">{selectedWebinar.title}</h3>
              <div className="modal__meta">
                <span>{new Date(selectedWebinar.datetime).getFullYear()}</span>
                <span>&bull;</span>
                <span>U/A 13+</span>
                <span>&bull;</span>
                <span>Hindi</span>
              </div>
              <p className="modal__desc">
                Triple the laughter and double the debates. Join live to take polls, drop your questions, and watch
                with the community in real time.
              </p>
              <div className="modal__tags">
                {["Reality", "Policy", "Comedy", "Quirky"].map((tag) => (
                  <span key={tag} className="modal__tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="modal__section">
                <h4 className="modal__section-title">Agenda</h4>
                <ul className="modal__list">
                  {[
                    "Opening insight: regional cooperation and climate tech (10 min)",
                    "Live keynote from guest institution (20 min)",
                    "Audience Q&A + moderated poll results (15 min)",
                    "Breakout takeaways and closing actions (10 min)",
                  ].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="modal__section">
                <h4 className="modal__section-title">Speakers & Hosts</h4>
                <div className="modal__pill-row">
                  {["Dr. Anika Rao - Policy Lead", "Rahul Mehta - Host", "Sara Lim - Research Fellow", "Carlos Estevez - Tech Strategist"].map((person) => (
                    <span key={person} className="modal__pill">
                      {person}
                    </span>
                  ))}
                </div>
              </div>
              <div className="modal__section">
                <h4 className="modal__section-title">Related Sessions</h4>
                <div className="modal__related">
                  {sampleWebinars
                    .filter((w) => w.id !== selectedWebinar.id)
                    .slice(0, 4)
                    .map((rel) => (
                      <Link key={rel.id} href={`/webinar/${rel.id}`} className="modal__related-card">
                        <span className="modal__related-thumb" style={{ backgroundImage: `url(${rel.thumbnailUrl})` }} aria-hidden="true" />
                        <span className="modal__related-title">{rel.title}</span>
                        <span className="modal__related-meta">{formatDate(rel.datetime)}</span>
                      </Link>
                    ))}
                </div>
              </div>
              <div className="modal__actions">
                <button className="modal__cta modal__cta--primary">
                  ▶ Watch Now
                </button>
                <button className="modal__cta modal__cta--ghost">+ My List</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
