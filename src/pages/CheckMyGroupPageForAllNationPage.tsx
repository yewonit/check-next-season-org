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

// --- Types (API 구조 반영) ---
interface Group {
  id: number;
  name: string; // "237국_인드라그룹_인드라순"
}

interface Member {
  id: number;
  name: string;
  email: string | null;
  roleName: string; // "그룹장", "부순장", "순원"
}

// --- Mock Data ---
const MOCK_GROUPS: Group[] = [
  { id: 129, name: "237국_인드라그룹_인드라순" },
  { id: 130, name: "237국_인드라그룹_박규현순" },
  { id: 131, name: "237국_인드라그룹_장지영순" },
  { id: 133, name: "237국_권진이그룹_권진이순" },
  { id: 134, name: "237국_권진이그룹_심규민순" },
  { id: 135, name: "237국_권진이그룹_정의중순" },
  { id: 136, name: "237국_김주현그룹_김주현순" },
  { id: 137, name: "237국_김주현그룹_이선경순" },
  { id: 138, name: "237국_김주현그룹_이원석순" },
];

const MOCK_MEMBERS: Record<number, Member[]> = {
  129: [
    { id: 2069, name: "인드라", email: null, roleName: "그룹장" },
    { id: 2070, name: "윤준혁", email: null, roleName: "부순장" },
    { id: 2071, name: "이지예", email: null, roleName: "부순장" },
    { id: 2072, name: "김철수", email: null, roleName: "순원" },
    { id: 2073, name: "시스코", email: null, roleName: "순원" },
    { id: 2074, name: "이영희", email: null, roleName: "순원" },
    { id: 2075, name: "박민수", email: null, roleName: "순원" },
  ],
  // 다른 그룹 데이터는 자동으로 생성하거나 추가
};

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
  // API 연동 시에는 빈 배열로 초기화하고 useEffect에서 fetch
  const [groups] = useState<Group[]>(MOCK_GROUPS);
  const [members, setMembers] = useState<Member[]>([]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // 그룹 선택 핸들러
  const handleGroupClick = (group: Group) => {
    // 실제 구현 시 여기서 API 호출 (GET organizations/{id})
    const groupMembers = MOCK_MEMBERS[group.id] || [
      // 데이터 없을 경우 더미 데이터 생성
      { id: 1, name: "임시멤버1", email: null, roleName: "순원" },
      { id: 2, name: "임시멤버2", email: null, roleName: "순원" },
      { id: 3, name: "임시멤버3", email: null, roleName: "순원" },
      { id: 4, name: "임시멤버4", email: null, roleName: "순원" },
      { id: 5, name: "임시멤버5", email: null, roleName: "순원" },
    ];
    setMembers(groupMembers);
    setIsBottomSheetOpen(true);
  };

  // 멤버 선택 핸들러 (결과 페이지로 이동)
  const handleMemberClick = (member: Member) => {
    setIsBottomSheetOpen(false);
    // TODO: 실제 user ID를 사용하여 다음 페이지로 이동
    // GET seasons/next?userId={member.id} 로직은 다음 페이지나 중간 단계에서 처리
    navigate("/new-group-check-my-group", { state: { user: member } });
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
      <div style={{ padding: `0 ${spacing.xl}px ${spacing.xxl}px` }}>
        <RollingTitle />
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
        {groups.map((group) => {
          const leader = getLeaderName(group.name);
          const icon = LEADER_ICONS[leader] || "🌱"; // 기본 아이콘

          return (
            <button
              key={group.id}
              onClick={() => handleGroupClick(group)}
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
        })}
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
          {members.map((member) => (
            <button
              key={member.id}
              onClick={() => handleMemberClick(member)}
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
          ))}
        </div>
      </BottomSheet>
    </div>
  );
}
