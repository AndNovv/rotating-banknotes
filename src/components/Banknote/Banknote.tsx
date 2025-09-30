import { useMemo } from 'react';
import styles from './Banknote.module.css';

interface BanknoteProps {
  x: number;
  y: number;
  z: number;
  rotateXdeg: number;
  width: number;
  height: number;
  depth: number;
}

const Banknote: React.FC<BanknoteProps> = ({
  x,
  y,
  z,
  rotateXdeg,
  width,
  height,
  depth
}) => {
  const denominations = [100, 50, 20];

  const randomNominal = useMemo(() => {
    return denominations[Math.floor(Math.random() * denominations.length)];
  }, []);

  const banknoteClass = `banknote_${randomNominal}`;

  const style = {
    '--w': `${width}px`,
    '--h': `${height}px`,
    '--d': `${depth}px`,
    transform: `translate3d(${x - width / 2}px, ${
      y - height / 2
    }px, ${z}px) rotateX(${rotateXdeg}deg)`,
    willChange: 'transform rotate'
  };

  return (
    <div
      className={`${styles.banknote} ${styles[banknoteClass]}`}
      style={style}
    >
      <div
        className={`${styles.banknote__face} ${styles.banknote__face_front}`}
      ></div>
      <div
        className={`${styles.banknote__face} ${styles.banknote__face_back}`}
      ></div>
      <div
        className={`${styles.banknote__face} ${styles.banknote__face_right}`}
      ></div>
      <div
        className={`${styles.banknote__face} ${styles.banknote__face_left}`}
      ></div>
      <div
        className={`${styles.banknote__face} ${styles.banknote__face_top}`}
      ></div>
      <div
        className={`${styles.banknote__face} ${styles.banknote__face_bottom}`}
      ></div>
    </div>
  );
};

export default Banknote;
