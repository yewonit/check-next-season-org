import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { colors, spacing } from "../styles/foundation";
import {
  Typography2_Semibold,
  Typography3_Medium,
  Typography5_Medium,
  Typography6_Regular,
} from "../components/atoms/Typography";
import { Icon } from "../components/atoms/Icon";
import { Button } from "../components/atoms/Button";
import { TextField } from "../components/molecules/TextField";
import { ListRow } from "../components/molecules/ListRow";
import { BottomSheet } from "../components/molecules/BottomSheet";
import { ToastProvider } from "../components/molecules/Toast";
import { ChevronRight, Globe } from "lucide-react";
import coramdeoLogo from "../assets/coramdeo_logo.png";
import { useCheckNameQuery } from "../api/checkNameQuery";
import type { UserInfo } from "../api/name";

// 디자인 시안 스타일 변수 (TextField 커스텀용)
const PRIMARY_COLOR_CUSTOM = "#009E7F";

function MainPageContent() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [error, setError] = useState("");

  // API 호출을 위한 query (enabled: false로 수동 제어)
  const {
    data,
    refetch,
    isLoading,
    error: queryError,
  } = useCheckNameQuery(name.trim());

  const handleSearch = async () => {
    setError("");

    if (!name.trim()) {
      setError("이름을 입력해주세요.");
      return;
    }

    if (name.trim().length < 2) {
      setError("이름을 잘못 작성했는지 확인해주세요.");
      return;
    }

    // API 호출 (refetch)
    const result = await refetch();

    if (result.isError) {
      setError(queryError?.message || "조회 중 오류가 발생했습니다.");
      return;
    }

    if (result.data?.data && result.data.data.length > 0) {
      // 사용자가 여러 명이면 BottomSheet 표시
      if (result.data.data.length > 1) {
        setIsBottomSheetOpen(true);
      } else {
        // 사용자가 1명이면 바로 이동
        navigate("/event", {
          state: { user: result.data.data[0] },
        });
      }
    } else {
      setError("검색 결과가 없습니다.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleUserSelect = (user: UserInfo) => {
    setIsBottomSheetOpen(false);
    navigate("/event", { state: { user } });
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
            style={{ width: "160px", height: "auto", marginBottom: spacing.sm }}
          />
          <Typography6_Regular
            style={{ textAlign: "center", color: colors.grey600 }}
          >
            2026년 새로운 여정을 기대하며
          </Typography6_Regular>
          <Typography2_Semibold
            style={{ textAlign: "center", color: colors.grey900 }}
          >
            이름을 입력해주세요
          </Typography2_Semibold>
        </div>

        {/* 입력 폼 (TextField 컴포넌트 활용) */}
        <div style={{ width: "100%", maxWidth: "320px" }}>
          <TextField
            value={name}
            onChange={setName}
            placeholder="이름/Name"
            onKeyDown={handleKeyDown}
            error={error}
            style={
              {
                // TextField 컨테이너 스타일
              }
            }
            // 내부 input 스타일 커스터마이징 (현재 TextField 컴포넌트 구조상 style prop이 컨테이너에 적용됨)
            // TextField 컴포넌트를 수정하지 않고 사용하기 위해,
            // TextField 내부 구현을 확인했을 때 inputStyle에 backgroundColor가 지정되어 있음.
            // 하지만 TextField는 style prop을 container에만 적용함.
            // 여기서는 TextField 컴포넌트의 기본 스타일을 활용하되, 배경색만 CSS로 오버라이드하거나
            // TextField가 className을 지원하므로 global.css 등을 통해 제어 가능하지만,
            // 인라인 스타일로는 한계가 있을 수 있음.
            // 여기서는 TextField가 기본적으로 제공하는 디자인을 최대한 수용하되, 배경색 변경이 필요하다면
            // TextField 컴포넌트에 inputStyle prop을 추가하는 것이 좋음.
            // 하지만 지금은 일단 기본 TextField를 사용하고, 필요시 수정.
            // 디자인 시안의 회색 배경을 적용하기 위해 인라인 스타일로 input 요소 선택자를 사용할 수 없으므로,
            // TextField를 감싸는 div에서 input을 타겟팅하거나, TextField가 투명 배경을 지원하도록 해야 함.
            // 현재 TextField는 backgroundColor: disabled ? colors.grey100 : colors.background 로 고정됨.
            // 일단 기본 흰색 배경을 사용하거나, TextField 컴포넌트 수정 없이 진행.
            // 디자인 시스템 활용이 우선이므로 TextField 기본 스타일(흰색)을 따르되,
            // 시안과 너무 다르면 TextField 컴포넌트를 수정해야 함.
            // 여기서는 시안의 회색 배경이 중요해 보이므로, TextField를 감싸는 div가 아니라
            // TextField 자체를 사용하되, 디자인 시스템의 일관성을 위해 흰색 배경을 유지하는 것도 방법.
            // 하지만 사용자가 "디자인 시스템에 구현되어 있는 친구들을 기반으로 활용"하라고 했으므로
            // TextField 그대로 사용.
          />
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

        {/* 확인하기 버튼 (Button 컴포넌트 활용) */}
        <Button
          color="primary"
          variant="fill"
          size="xlarge"
          display="full"
          onClick={handleSearch}
          disabled={isLoading}
          style={{
            maxWidth: "400px",
            backgroundColor:
              name.trim().length >= 2
                ? PRIMARY_COLOR_CUSTOM
                : colors.primary200,
            // Button 컴포넌트는 disabled 처리가 아니면 hover 효과가 있으므로,
            // 비활성화 상태(연한 초록)일 때도 클릭 이벤트를 막으려면 disabled 처리가 나을 수 있음.
            // 하지만 디자인상 색상만 변경하고 클릭 시 에러 메시지를 보여주는 UX라면 disabled 아님.
          }}
        >
          {isLoading ? "조회 중..." : "확인하기"}
        </Button>
      </div>

      {/* 중복자 선택 바텀시트 */}
      <BottomSheet
        open={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        header={
          <div style={{ paddingTop: spacing.sm }}>
            <Typography3_Medium
              style={{ fontSize: "18px", marginBottom: "2px" }}
            >
              나의 정보를 클릭하여
            </Typography3_Medium>
            <Typography3_Medium style={{ fontSize: "18px" }}>
              그룹과 순을 확인해보세요
            </Typography3_Medium>
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
          {data?.data?.map((user, index) => (
            <ListRow
              key={`${user.phoneNumber}-${index}`}
              onClick={() => handleUserSelect(user)}
              style={{
                backgroundColor: "#F9FAFB",
                borderRadius: "12px",
                padding: spacing.md, // ListRow 기본 패딩 오버라이드
              }}
              border="none"
              contents={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: spacing.xs,
                  }}
                >
                  <Typography3_Medium style={{ color: colors.grey900 }}>
                    {user.name}({user.birthYear})
                  </Typography3_Medium>
                  <Typography3_Medium style={{ color: colors.grey900 }}>
                    -
                  </Typography3_Medium>
                  <Typography3_Medium style={{ color: colors.grey900 }}>
                    {user.phoneNumber.slice(-4)}
                  </Typography3_Medium>
                </div>
              }
              right={
                <Icon icon={ChevronRight} size="sm" color={colors.grey400} />
              }
            />
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
