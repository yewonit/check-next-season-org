import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { colors, spacing } from "../styles/foundation";
import {
  Typography1_Bold,
  Typography3_Medium,
  Typography5_Medium,
  Typography6_Regular,
} from "../components/atoms/Typography";
import { Icon } from "../components/atoms/Icon";
import { BottomSheet } from "../components/molecules/BottomSheet";
import { ToastProvider } from "../components/molecules/Toast";
import { ChevronRight, Globe } from "lucide-react";
import coramdeoLogo from "../assets/coramdeo_logo.png";

// 디자인 시안 스타일 변수
const INPUT_STYLES = {
  backgroundColor: "rgba(0, 23, 51, 0.02)", // --adaptiveGreyOpacity50
  color: "#333d4b", // --adaptiveGrey800
  placeholderColor: "#8b95a1", // --adaptiveGrey500
  borderColor: "rgba(2, 32, 71, 0.05)",
  borderRadius: "14px",
  padding: "14px 16px",
  fontSize: "17px",
  lineHeight: "25.5px",
};

function MainPageContent() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [error, setError] = useState("");

  // 중복 사용자 모킹 데이터
  const [duplicateUsers, setDuplicateUsers] = useState<
    Array<{ id: string; name: string; birthYear: string; phoneNumber: string }>
  >([]);

  const handleSearch = () => {
    setError("");

    if (!name.trim()) {
      setError("이름을 입력해주세요.");
      return;
    }

    if (name.trim().length < 2) {
      setError("이름을 잘못 작성했는지 확인해주세요.");
      return;
    }

    if (name === "이여진" || name === "홍길동") {
      setDuplicateUsers([
        { id: "1", name: "이여진", birthYear: "95", phoneNumber: "5272" },
        { id: "2", name: "이여진", birthYear: "90", phoneNumber: "1234" },
        { id: "3", name: "이여진", birthYear: "88", phoneNumber: "8472" },
      ]);
      setIsBottomSheetOpen(true);
    } else {
      navigate("/new-group-check-my-group", { state: { name } });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleUserSelect = (user: {
    id: string;
    name: string;
    birthYear: string;
    phoneNumber: string;
  }) => {
    setIsBottomSheetOpen(false);
    navigate("/new-group-check-my-group", { state: { user } });
  };

  const handleAllNationClick = () => {
    navigate("/all-nation-old-group");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: colors.background,
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: `${spacing.xxxl}px ${spacing.xl}px`,
          gap: spacing.xl,
        }}
      >
        {/* 로고 및 타이틀 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: spacing.sm,
            marginBottom: spacing.xl,
          }}
        >
          <img
            src={coramdeoLogo}
            alt="Coram Deo"
            style={{ width: "180px", height: "auto", marginBottom: spacing.md }}
          />
          <Typography5_Medium
            style={{ textAlign: "center", color: colors.grey600 }}
          >
            2026년 새로운 여정을 기대하며
          </Typography5_Medium>
          <Typography1_Bold
            style={{ textAlign: "center", color: colors.grey900 }}
          >
            이름을 입력해주세요
          </Typography1_Bold>
        </div>

        {/* 입력 폼 */}
        <div style={{ width: "100%", maxWidth: "320px" }}>
          <input
            type="text"
            placeholder="이름/Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              width: "100%",
              backgroundColor: INPUT_STYLES.backgroundColor,
              color: INPUT_STYLES.color,
              border: `1px solid ${INPUT_STYLES.borderColor}`,
              borderRadius: INPUT_STYLES.borderRadius,
              padding: INPUT_STYLES.padding,
              fontSize: INPUT_STYLES.fontSize,
              lineHeight: INPUT_STYLES.lineHeight,
              outline: "none",
              boxSizing: "border-box",
              fontFamily: "inherit",
              // 플레이스홀더 스타일링을 위한 클래스나 가상요소는 인라인 스타일에 제한이 있어 기본 색상 사용
              // 필요시 별도 CSS 파일 또는 styled-components 사용 권장
            }}
          />

          {/* 에러 메시지 */}
          {error && (
            <Typography6_Regular
              style={{
                color: colors.red500,
                marginTop: spacing.sm,
                paddingLeft: spacing.sm,
              }}
            >
              {error}
            </Typography6_Regular>
          )}
        </div>
      </div>

      {/* 하단 링크 및 버튼 영역 */}
      <div
        style={{
          padding: `${spacing.xl}px`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: spacing.lg,
          paddingBottom: "40px",
        }}
      >
        {/* 올네이션 링크 */}
        <button
          onClick={handleAllNationClick}
          style={{
            background: "none",
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: spacing.xs,
            cursor: "pointer",
            padding: spacing.sm,
          }}
        >
          <Icon icon={Globe} size="sm" color={colors.blue500} />
          <Typography5_Medium style={{ color: colors.grey600 }}>
            올네이션국은 여기를 클릭해주세요 &gt;
          </Typography5_Medium>
        </button>

        {/* 확인하기 버튼 */}
        <button
          onClick={handleSearch}
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "56px",
            backgroundColor:
              name.trim().length >= 2 ? "#009E7F" : colors.primary200,
            color: "white",
            border: "none",
            borderRadius: "16px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.2s ease",
          }}
        >
          확인하기
        </button>
      </div>

      {/* 중복자 선택 바텀시트 */}
      <BottomSheet
        open={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        header={
          <div style={{ paddingTop: spacing.md }}>
            <Typography1_Bold style={{ fontSize: "20px", marginBottom: "4px" }}>
              나의 정보를 클릭하여
            </Typography1_Bold>
            <Typography1_Bold style={{ fontSize: "20px" }}>
              그룹과 순을 확인해보세요
            </Typography1_Bold>
          </div>
        }
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: spacing.sm,
            paddingTop: spacing.md,
          }}
        >
          {duplicateUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => handleUserSelect(user)}
              style={{
                width: "100%",
                padding: spacing.lg,
                border: "none",
                borderRadius: "12px",
                backgroundColor: "#F9FAFB",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                textAlign: "left",
              }}
            >
              <Typography3_Medium style={{ color: colors.grey900 }}>
                {user.name}({user.birthYear}) - {user.phoneNumber}
              </Typography3_Medium>
              <Icon icon={ChevronRight} size="sm" color={colors.grey400} />
            </button>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
}

export default function MainPage() {
  return (
    <ToastProvider>
      <MainPageContent />
    </ToastProvider>
  );
}
