import { useMemo } from 'react';
import styles from './Banknote.module.css';
import note100 from '../../assets/banknote_100.png';
import note50 from '../../assets/banknote_50.png';
import note20 from '../../assets/banknote_20.png';
import silverTexture from '../../assets/silver_texture.png';

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
  const notes = [note100, note50, note20];

  const randomNote = useMemo(() => {
    return notes[Math.floor(Math.random() * notes.length)];
  }, []);

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
    <div className={`${styles.banknote}`} style={style}>
      <div
        className={`${styles.banknote__face} ${styles.banknote__face_front}`}
        style={{ backgroundImage: `url(${randomNote})` }}
      ></div>
      <div
        className={`${styles.banknote__face} ${styles.banknote__face_back}`}
        style={{ backgroundImage: `url(${randomNote})` }}
      ></div>
      <div
        className={`${styles.banknote__face} ${styles.banknote__face_right}`}
        style={{ backgroundImage: `url(${silverTexture})` }}
      ></div>
      <div
        className={`${styles.banknote__face} ${styles.banknote__face_left}`}
        style={{ backgroundImage: `url(${silverTexture})` }}
      ></div>
      <div
        className={`${styles.banknote__face} ${styles.banknote__face_top}`}
        style={{ backgroundImage: `url(${silverTexture})` }}
      ></div>
      <div
        className={`${styles.banknote__face} ${styles.banknote__face_bottom}`}
        style={{ backgroundImage: `url(${silverTexture})` }}
      ></div>
    </div>
  );
};

export default Banknote;
