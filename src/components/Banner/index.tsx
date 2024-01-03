import Image from 'next/image';
import styles from './index.module.scss';

const Banner = () => {
  return (
    <div className={styles.bannerBox}>
      <div className={styles.imgBox}>
        <Image alt="banner" fetchPriority="high" fill loading="lazy" quality={5} src="/imgs/banner.png" />
      </div>
    </div>
  );
};

export default Banner;
