import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EventPage.css";

export default function NewGroupOpeningPage() {
  const navigate = useNavigate();
  const [tapCount, setTapCount] = useState(0); // 3회 탭 후, 라우팅 처리
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    if (tapCount > 0 && tapCount < 3) {
      const resetTimer = window.setTimeout(() => {
        setTapCount(0);
      }, 1000);
      return () => clearTimeout(resetTimer);
    }
  }, [tapCount, navigate]);

  const handleTap = () => {
    if (tapCount < 3) {
      const newCount = tapCount + 1;
      setTapCount(newCount);

      // 3번째 탭이면 폭발 후 라우팅
      if (newCount === 3) {
        setIsExploding(true);
        window.setTimeout(() => {
          navigate("/new-group-check-my-group");
        }, 500);
      }
    }
  };

  // tapCount에 따른 크기 계산 (0: 1배, 1: 1.5배, 2: 2배, 3: 3배)
  const getScale = () => {
    if (tapCount === 0) return 1;
    if (tapCount === 1) return 1.5;
    if (tapCount === 2) return 2;
    return 3;
  };

  // tapCount에 따른 떨림 강도 클래스
  const getShakeClass = () => {
    if (tapCount === 0) return "";
    if (tapCount === 1) return "shake-level-1";
    if (tapCount === 2) return "shake-level-2";
    return "shake-level-3";
  };

  return (
    <div className="container">
      <p className="message">
        새로운 그룹이 도착했습니다. 선물상자를 꾹~꾹 눌러보세요 ({tapCount}/3)
      </p>
      {/**
       * @todo 선물상자 클릭 영역을 Figma에 정의된 대로 크게 만들기
       */}
      <div
        className={`gift-box ${getShakeClass()} ${
          isExploding ? "exploding" : ""
        }`}
        style={
          {
            "--scale-value": getScale(),
          } as React.CSSProperties
        }
        onClick={handleTap}
        onTouchEnd={(e) => {
          e.preventDefault();
          handleTap();
        }}
      >
        🎁
      </div>
    </div>
  );
}
