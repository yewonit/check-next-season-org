import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, spacing } from '../styles/foundation';
import {
  Typography1_Bold,
  Typography2_Semibold,
  Typography5_Semibold,
} from '../components/atoms/Typography';
import { Icon } from '../components/atoms/Icon';
import { GiftBox } from '../components/molecules/GiftBox';
import { ChevronLeft } from 'lucide-react';

const CONTENTS = [
  {
    lang: 'ko',
    top1: '짜잔~',
    top2: '2026년 만남의 축복이 도착했어요!',
    top3: '선물 상자를 눌러 확인해봐요',
    bottom: '선물 상자가 열릴 때까지 연속으로 눌러봐요!',
  },
  {
    lang: 'en',
    top1: 'Ta-da!',
    top2: 'The 2026 blessing of our meeting has arrived!',
    top3: 'Tap the gift box to check it out.',
    bottom: 'Keep tapping until the box opens!',
  },
  {
    lang: 'cn',
    top1: '嘭！',
    top2: '2026年的相遇祝福已经到啦！',
    top3: '点击礼物盒查看吧。',
    bottom: '连续点击，直到盒子打开！',
  },
  {
    lang: 'jp',
    top1: 'じゃじゃーん！',
    top2: '2026年の\n出会いの祝福が届きました！',
    top3: 'ボックスをタップして\n確認してみてください。',
    bottom: '箱が開くまで連続でタップして！',
  },
  {
    lang: 'es',
    top1: '¡Tarán!',
    top2: '¡La bendición de nuestro encuentro 2026 ha llegado!',
    top3: 'Haz clic en la caja de regalo para verlo.',
    bottom: '¡Sigue pulsando hasta que se abra la caja!',
  },
];

export default function EventPage() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % CONTENTS.length);
        setFade(true);
      }, 500);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleGiftOpen = () => {
    navigate('/new-group-check-my-group');
  };

  const currentContent = CONTENTS[index];

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: colors.background,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <div
        style={{
          padding: `${spacing.lg}px ${spacing.md}px`,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 10,
        }}
      >
        <button
          onClick={handleBack}
          style={{
            background: 'none',
            border: 'none',
            padding: spacing.sm,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon icon={ChevronLeft} size="lg" color={colors.grey900} />
        </button>
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: spacing.xl,
          paddingTop: '15vh',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: spacing.sm,
            height: '140px',
            marginBottom: '160px',
            opacity: fade ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          <Typography5_Semibold style={{ color: colors.grey600 }}>
            {currentContent.top1}
          </Typography5_Semibold>
          <Typography2_Semibold
            style={{
              color: colors.grey700,
              marginBottom: spacing.xs,
              wordBreak: 'keep-all',
              whiteSpace: 'pre-line',
              lineHeight: 1.4,
            }}
          >
            {currentContent.top2}
          </Typography2_Semibold>
          <Typography1_Bold
            style={{
              color: '#333D4B',
              fontSize: '22px',
              wordBreak: 'keep-all',
              whiteSpace: 'pre-line',
              lineHeight: 1.3,
            }}
          >
            {currentContent.top3}
          </Typography1_Bold>
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start' }}>
          <GiftBox
            onComplete={handleGiftOpen}
            minTaps={3}
            children={<div style={{ fontSize: '60px', lineHeight: 1 }}>🎁</div>}
          />
        </div>
      </div>

      <div
        style={{
          padding: `${spacing.xl}px`,
          paddingBottom: '60px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography5_Semibold
          style={{
            color: '#009E7F',
            opacity: fade ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
            textAlign: 'center',
          }}
        >
          {currentContent.bottom}
        </Typography5_Semibold>
      </div>
    </div>
  );
}
