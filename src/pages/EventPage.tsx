import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, spacing } from '../styles/foundation';
import {
  Typography1_Bold,
  Typography5_Semibold,
} from '../components/atoms/Typography';
import { Icon } from '../components/atoms/Icon';
import { GiftBox, type GiftBoxHandle } from '../components/molecules/GiftBox';
import { ChevronLeft } from 'lucide-react';

const CONTENTS = [
  {
    lang: 'ko',
    top1: '짜잔~\n2026년 만남의 축복이 도착했어요!',
    top3: '선물 상자를 눌러 확인해봐요',
    bottom: '선물 상자가 열릴 때까지 연속으로 눌러봐요!',
  },
  {
    lang: 'en',
    top1: 'Ta-da!\nThe 2026 blessing of our meeting has arrived!',
    top3: 'Tap the gift box to check it out.',
    bottom: 'Keep tapping until the box opens!',
  },
  {
    lang: 'cn',
    top1: '嘭！\n2026年的相遇祝福已经到啦！',
    top3: '点击礼物盒查看吧。',
    bottom: '连续点击，直到盒子打开！',
  },
  {
    lang: 'jp',
    top1: 'じゃじゃーん！\n2026年の出会いの祝福が届きました！',
    top3: 'ボックスをタップして確認してみてください。',
    bottom: '箱が開くまで連続でタップして！',
  },
  {
    lang: 'es',
    top1: '¡Tarán!\n¡La bendición de nuestro encuentro 2026 ha llegado!',
    top3: 'Haz clic en la caja de regalo para verlo.',
    bottom: '¡Sigue pulsando hasta que se abra la caja!',
  },
];

export default function EventPage() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const giftBoxRef = useRef<GiftBoxHandle>(null);

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

  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 뒤로가기 버튼 클릭은 무시
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    // GiftBox의 handleTap 호출
    if (giftBoxRef.current) {
      giftBoxRef.current.handleTap();
    }
  };

  const currentContent = CONTENTS[index];

  return (
    <div
      onClick={handlePageClick}
      style={{
        minHeight: '100vh',
        backgroundColor: colors.background,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer',
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
          onClick={(e) => {
            e.stopPropagation();
            handleBack();
          }}
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
          paddingBottom: spacing.xl,
          position: 'relative',
        }}
      >
        {/* 상단 텍스트 (top1, top3) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: spacing.sm,
            opacity: fade ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
            position: 'absolute',
            top: '15vh',
            left: spacing.xl,
            right: spacing.xl,
          }}
        >
          <Typography5_Semibold
            style={{
              fontSize: '15px',
              lineHeight: '20px',
              letterSpacing: '-0.5px',
              fontWeight: 500,
              color: 'rgb(107, 118, 132)',
              margin: 0,
              textAlign: 'center',
              fontFamily: 'Pretendard, sans-serif',
              whiteSpace: 'pre-line',
            }}
          >
            {currentContent.top1}
          </Typography5_Semibold>
          <Typography1_Bold
            style={{
              fontSize: '26px',
              lineHeight: '35px',
              letterSpacing: '-0.5px',
              fontWeight: 700,
              color: 'rgb(51, 61, 75)',
              margin: 0,
              textAlign: 'center',
              fontFamily: 'Pretendard, sans-serif',
            }}
          >
            {currentContent.top3}
          </Typography1_Bold>
        </div>

        {/* 선물 상자 - 고정 위치 (화면 중앙) */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <GiftBox
            ref={giftBoxRef}
            onComplete={handleGiftOpen}
            minTaps={3}
            children={<div style={{ fontSize: '60px', lineHeight: 1 }}>🎁</div>}
          />
        </div>

        {/* 하단 텍스트 (bottom) */}
        <div
          style={{
            padding: `${spacing.xl}px 0`,
            display: 'flex',
            justifyContent: 'center',
            position: 'absolute',
            bottom: spacing.xl,
            left: spacing.xl,
            right: spacing.xl,
          }}
        >
          <Typography5_Semibold
            style={{
              fontSize: '15px',
              lineHeight: '25.5px',
              letterSpacing: '-0.5px',
              fontWeight: 600,
              color: 'rgb(0, 158, 127)',
              margin: 0,
              opacity: fade ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
              textAlign: 'center',
              fontFamily: 'Pretendard, sans-serif',
            }}
          >
            {currentContent.bottom}
          </Typography5_Semibold>
        </div>
      </div>
    </div>
  );
}
