import Image from "next/image";
import Link from "next/link";
import { formatDate, sampleWebinars } from "../../data/webinars";
import styles from "../webinar.module.css";

type PageProps = {
  params: {
    id: string;
  };
};

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateStaticParams() {
  return sampleWebinars.map((webinar) => ({ id: webinar.id }));
}

export default function WebinarPage({ params }: PageProps) {
  const safeId = (() => {
    return params?.id ?? "";
  })();

  const webinar = sampleWebinars.find((w) => w.id === safeId) ?? sampleWebinars[0];

  const related = sampleWebinars.filter((w) => w.id !== webinar.id).slice(0, 4);

  return (
    <div className={styles.webinarShell}>
      <header className={styles.webinarTopbar}>
        <Link href="/" className={styles.webinarBack}>
          {"<"} Back
        </Link>
        <span className={styles.webinarTag}>{webinar.badgeType}</span>
      </header>

      <main className={styles.webinarMain}>
        <section className={styles.webinarHero}>
          <div className={styles.webinarVideo}>
            <video
              className={styles.webinarVideoMedia}
              poster={webinar.thumbnailUrl}
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
              controls
              autoPlay
              muted
              loop
            >
              Your browser does not support the video tag.
            </video>
            <div className={styles.webinarVideoOverlay} />
          </div>
          <div className={styles.webinarMeta}>
            <p className={styles.webinarLabel}>Now playing</p>
            <h1 className={styles.webinarTitle}>{webinar.title}</h1>
            <p className={styles.webinarDatetime}>{formatDate(webinar.datetime)}</p>
            <p className={styles.webinarDescription}>
              Enjoy a smooth, cinematic stream with crisp audio and video. Interact with hosts, drop questions, and catch up on replays.
            </p>
            <div className={styles.webinarActions}>
              <button className={`${styles.webinarButton} ${styles.webinarButtonPrimary}`}>Join Live</button>
              <button className={`${styles.webinarButton} ${styles.webinarButtonSecondary}`}>Add Reminder</button>
            </div>
          </div>
        </section>

        <section className={styles.webinarRelated}>
          <div className={styles.webinarRelatedHeader}>
            <h2>Up next</h2>
            <span className={styles.webinarRelatedSubtitle}>More sessions you might like</span>
          </div>
          <div className={styles.webinarRelatedList}>
            {related.map((item) => (
              <Link key={item.id} href={`/webinar/${item.id}`} className={styles.webinarRelatedCard}>
                <div className={styles.webinarRelatedThumb}>
                  <Image src={item.thumbnailUrl} alt={item.title} fill sizes="220px" style={{ objectFit: "cover" }} />
                  <div className={styles.webinarRelatedBadge}>{item.badgeType}</div>
                </div>
                <div className={styles.webinarRelatedMeta}>
                  <p className={styles.webinarRelatedTitle}>{item.title}</p>
                  <p className={styles.webinarRelatedTime}>{formatDate(item.datetime)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
