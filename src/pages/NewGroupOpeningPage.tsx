import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NewGroupOpeningPage.css";

export default function NewGroupOpeningPage() {
  const navigate = useNavigate();
  const [isPressing, setIsPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    let timer: number;
    let interval: number;

    if (isPressing && progress < 100) {
      interval = window.setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 20; // 100% in 3 seconds (30 intervals)
          if (newProgress >= 100) {
            setIsExploding(true);
            // 폭발 애니메이션 후 라우팅
            timer = window.setTimeout(() => {
              navigate("/new-group-check-my-group");
            }, 500);
            return 100;
          }
          return newProgress;
        });
      }, 100);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isPressing, progress, navigate]);

  // 누르기를 멈추면 리셋
  useEffect(() => {
    if (!isPressing && progress > 0 && progress < 100) {
      const resetTimer = window.setTimeout(() => {
        setProgress(0);
      }, 0);
      return () => clearTimeout(resetTimer);
    }
  }, [isPressing, progress]);

  const handlePressStart = () => {
    setIsPressing(true);
  };

  const handlePressEnd = () => {
    if (progress < 100) {
      setIsPressing(false);
    }
  };

  return (
    <div className="container">
      <p className="message">
        새로운 그룹이 도착했습니다. 선물상자를 꾹~꾹 눌러보세요
      </p>
      <div
        className={`gift-box ${isPressing ? "pressing" : ""} ${
          isExploding ? "exploding" : ""
        }`}
        style={
          {
            "--scale-value": 1 + 2 * (progress / 100),
          } as React.CSSProperties
        }
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
      >
        🎁
      </div>
    </div>
  );
}
