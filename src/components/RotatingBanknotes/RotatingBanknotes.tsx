import { useEffect, useRef, useState } from 'react';
import Banknote from '../Banknote';
import styles from './RotatingBanknotes.module.css';

interface RotatingBanknotesProps {
  banknotesCount?: number;
  radius?: number;
  speed?: number;
  amplitude?: number;
  banknoteWidth?: number;
  banknoteHeight?: number;
  banknoteDepth?: number;
}

const RotatingBanknotes: React.FC<RotatingBanknotesProps> = ({
  banknotesCount = 40,
  radius = 200,
  speed = 1.5,
  amplitude = 0.15, // Амплитуда уменьшения радиуса
  banknoteWidth = 200,
  banknoteHeight = 140,
  banknoteDepth = 5
}) => {
  const [t, setT] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(performance.now());

  useEffect(() => {
    function step(now: number) {
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;
      setT((prev) => prev - dt * speed);
      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [speed]);

  // центр контейнера
  const centerX = 500;
  const centerY = 300;

  const items = new Array(banknotesCount).fill(0).map((_, i) => {
    // равномерное распределение по окружности
    const spacing = (Math.PI * 2) / banknotesCount;

    // угол элемента = общее смещение + фиксированный шаг для i
    const angle = t + i * spacing;

    const radiusDynamic =
      radius * (1 - amplitude * Math.sin(t * 0.4 * Math.PI));

    // 3D-позиция
    const x = centerX;
    const y = Math.cos(angle) * radiusDynamic + centerY;
    const z = Math.sin(angle) * radiusDynamic;

    // Визуальный масштаб
    const scale = 0.6 + ((z + radiusDynamic) / (2 * radiusDynamic)) * 0.1;

    // Угол поворота чтобы лицевая сторона смотрела со смещением в центр
    const rotateXdeg = (angle * 180) / Math.PI + 60;

    return {
      i,
      x,
      y,
      z,
      scale,
      rotateXdeg
    };
  });

  return (
    <div
      className={styles['rotating-banknotes']}
      // style={{
      //   width: '100%',
      //   height: '100%',
      //   display: 'grid',
      //   placeItems: 'center'
      // }}
    >
      <div className={styles['rotating-banknotes_wrapper']}>
        <div
          className={styles['rotating-banknotes_scene']}
          style={{ transform: `rotateY(40deg)` }}
        >
          {items.map((item) => (
            <Banknote
              key={item.i}
              {...item}
              width={banknoteWidth}
              height={banknoteHeight}
              depth={banknoteDepth}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RotatingBanknotes;
