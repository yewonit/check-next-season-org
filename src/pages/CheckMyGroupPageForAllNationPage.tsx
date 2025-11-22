import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { colors, spacing } from "../styles/foundation";
import {
  Typography1_Bold,
  Typography2_Semibold,
  Typography5_Semibold,
} from "../components/atoms/Typography";
import { Icon } from "../components/atoms/Icon";
import { BottomSheet } from "../components/molecules/BottomSheet";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useAllNationQuery,
  useAllNationSoonMemberQuery,
  useAllNationNextQuery,
} from "../api/allNationQuery";
import { useUserStore } from "../stores/userStore";

// --- Utils ---
// 그룹명 파싱 ("237국_인드라그룹_인드라순" -> "인드라 그룹 인드라순")
const parseGroupName = (rawName: string) => {
  const parts = rawName.split("_");
  if (parts.length >= 3) {
    const groupPart = parts[1].replace("그룹", "");
    const sunPart = parts[2];
    return `${groupPart} 그룹 ${sunPart}`;
  }
  return rawName;
};

// 그룹장 이름 추정 (아이콘 매칭용)
const getLeaderName = (rawName: string) => {
  const parts = rawName.split("_");
  if (parts.length >= 2) {
    return parts[1].replace("그룹", "");
  }
  return "";
};

// 리더별 아이콘 매핑 (예시)
const LEADER_ICONS: Record<string, string> = {
  인드라: "🍬",
  권진이: "🧩",
  김주현: "🎤",
};

// --- Components ---

// 1. Rolling Title Component
const TITLES = [
  "2025년\n어떤 그룹에 있었나요?",
  "Which group was I\nin for 2025?",
  "2025年\n我属于哪个小组？",
  "2025年、\n私はどのグループにいましたか？",
  "¿En qué grupo\nestuve en 2025?",
];

const RollingTitle = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % TITLES.length);
        setFade(true);
      }, 500); // 페이드 아웃 후 텍스트 변경
    }, 2500); // 2.5초마다 변경

    return () => clearInterval(interval);
  }, []);

  return (
    <Typography2_Semibold
      style={{
        whiteSpace: "pre-line",
        transition: "opacity 0.5s ease-in-out",
        opacity: fade ? 1 : 0,
        minHeight: "80px", // 높이 고정으로 레이아웃 흔들림 방지
        color: colors.grey900,
        fontSize: "24px", // 크기 약간 축소
      }}
    >
      {TITLES[index]}
    </Typography2_Semibold>
  );
};

export default function CheckMyGroupPageForAllNationPage() {
  const navigate = useNavigate();
  const setSelectedUser = useUserStore(
    (state: {
      setSelectedUser: (user: import("../api/name").UserInfo) => void;
    }) => state.setSelectedUser
  );
  const [selectedGroupId, setSelectedGroupId] = useState<number>(0);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // 올네이션 순 리스트 조회
  const { data: groupsData, isLoading: isGroupsLoading } = useAllNationQuery();

  // 선택된 순의 멤버 조회
  const { data: membersData, isLoading: isMembersLoading } =
    useAllNationSoonMemberQuery(selectedGroupId);

  // 선택된 멤버의 결과 조회
  const { data: userNextData } = useAllNationNextQuery(selectedUserId);

  // userNextData가 변경되면 store에 저장하고 이동
  useEffect(() => {
    if (userNextData?.data && userNextData.data.length > 0) {
      setSelectedUser(userNextData.data[0]);
      navigate("/event");
    }
  }, [userNextData, setSelectedUser, navigate]);

  // 그룹 선택 핸들러
  const handleGroupClick = (groupId: number) => {
    setSelectedGroupId(groupId);
    setIsBottomSheetOpen(true);
  };

  // 멤버 선택 핸들러 (userId 설정 -> useAllNationNextQuery 자동 실행)
  const handleMemberClick = (memberId: number) => {
    setIsBottomSheetOpen(false);
    setSelectedUserId(memberId);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: colors.background,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 상단 고정 영역 (헤더 + 타이틀) */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: colors.background,
          paddingBottom: spacing.md,
        }}
      >
        {/* 헤더 (뒤로가기) */}
        <div
          style={{
            padding: `${spacing.lg}px ${spacing.md}px`,
            display: "flex",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "none",
              border: "none",
              padding: spacing.sm,
              cursor: "pointer",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#333D4B", // 요청 색상
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = colors.grey100)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <Icon icon={ChevronLeft} size="lg" />
          </button>
        </div>

        {/* 타이틀 영역 */}
        <div style={{ padding: `0 ${spacing.xl}px ${spacing.sm}px` }}>
          <RollingTitle />
        </div>
      </div>

      {/* 그룹 리스트 영역 */}
      <div
        style={{
          flex: 1,
          padding: `0 ${spacing.xl}px ${spacing.xxl}px`,
          display: "flex",
          flexDirection: "column",
          gap: spacing.md,
          overflowY: "auto", // 스크롤 허용
        }}
      >
        {isGroupsLoading ? (
          <div style={{ textAlign: "center", padding: spacing.xl }}>
            <Typography5_Semibold style={{ color: colors.grey600 }}>
              로딩 중...
            </Typography5_Semibold>
          </div>
        ) : (
          groupsData?.data?.map((group) => {
            const leader = getLeaderName(group.name);
            const icon = LEADER_ICONS[leader] || "🌱"; // 기본 아이콘

            return (
              <button
                key={group.id}
                onClick={() => handleGroupClick(group.id)}
                style={{
                  width: "100%",
                  padding: spacing.lg,
                  backgroundColor: "#F9FAFB", // 옅은 회색 배경
                  border: "none",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = colors.grey100)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#F9FAFB")
                }
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: spacing.sm,
                  }}
                >
                  <span style={{ fontSize: "20px" }}>{icon}</span>
                  <Typography5_Semibold style={{ color: colors.grey900 }}>
                    {parseGroupName(group.name)}
                  </Typography5_Semibold>
                </div>
                <Icon icon={ChevronRight} size="sm" color={colors.grey400} />
              </button>
            );
          })
        )}
      </div>

      {/* 멤버 선택 바텀시트 */}
      <BottomSheet
        open={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        header={
          <div style={{ paddingTop: spacing.md }}>
            <Typography1_Bold style={{ fontSize: "20px", marginBottom: "4px" }}>
              나의 정보를 클릭해서
            </Typography1_Bold>
            <Typography1_Bold style={{ fontSize: "20px" }}>
              그룹과 순을 확인해보세요
            </Typography1_Bold>
          </div>
        }
        // maxHeight를 늘려서 리스트가 길어질 때 대응
        maxHeight={window.innerHeight * 0.8}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: spacing.sm,
            paddingTop: spacing.md,
            paddingBottom: spacing.xl,
          }}
        >
          {isMembersLoading ? (
            <div style={{ textAlign: "center", padding: spacing.xl }}>
              <Typography5_Semibold style={{ color: colors.grey600 }}>
                멤버 로딩 중...
              </Typography5_Semibold>
            </div>
          ) : (
            membersData?.members?.map((member) => (
              <button
                key={member.id}
                onClick={() => handleMemberClick(member.id)}
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
                <Typography5_Semibold style={{ color: colors.grey900 }}>
                  {member.name}
                </Typography5_Semibold>
                <Icon icon={ChevronRight} size="sm" color={colors.grey400} />
              </button>
            ))
          )}
        </div>
      </BottomSheet>
    </div>
  );
}
