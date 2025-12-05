import Link from "next/link";
import Image from "next/image";
import { sampleWebinars, formatDate } from "../data/webinars";
import styles from "./webinar.module.css";

export default function WebinarIndexPage() {
  return (
    <div className={styles.webinarShell}>
      <div className={styles.webinarTopbar}>
        <h1 className={styles.webinarTitle}>Webinars</h1>
      </div>
      <div className={styles.webinarRelated}>
        <div className={styles.webinarRelatedHeader}>
          <h2>All sessions</h2>
          <span className={styles.webinarRelatedSubtitle}>Pick a webinar to view the stream page</span>
        </div>
        <div className={styles.webinarRelatedList}>
          {sampleWebinars.map((item) => (
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
      </div>
    </div>
  );
}
