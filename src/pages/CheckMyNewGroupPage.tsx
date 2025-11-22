import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { colors, spacing } from "../styles/foundation";
import {
  Typography1_Bold,
  Typography2_Semibold,
  Typography3_Medium,
  Typography5_Regular,
} from "../components/atoms/Typography";
import { Icon } from "../components/atoms/Icon";
import { ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useUserStore } from "../stores/userStore";

export default function CheckMyNewGroupPage() {
  const navigate = useNavigate();
  const selectedUser = useUserStore(
    (state: { selectedUser: import("../api/name").UserInfo | null }) =>
      state.selectedUser
  );

  const user = selectedUser || {
    name: "이름",
    organization: "N국_OOO그룹_OOO순",
    organizationPeople: [],
    role: "순원",
    birthYear: "",
    phoneNumber: "",
  };

  const [isListOpen, setIsListOpen] = useState(false);

  const parseOrg = (orgName: string) => {
    if (!orgName) return { nation: "", group: "", cell: "" };
    const parts = orgName.split("_");
    return {
      nation: parts[0] || "",
      group: parts[1]?.replace("그룹", "") || "",
      cell: parts[2]?.replace("순", "") || "",
    };
  };

  const { nation, group, cell } = parseOrg(user.organization);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: colors.background,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* 배경 Lottie (폭죽) - 전체 화면 배경 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "120%",
          height: "120%",
          zIndex: 999, // 컨텐츠 뒤
          overflow: "hidden",
          pointerEvents: "none", // 클릭 통과
        }}
      >
        {/* @ts-expect-error - dotlottie-wc definition */}
        <dotlottie-wc
          src="https://lottie.host/005af26a-0a51-4be4-8406-b178591a5488/zjqYp9dc24.lottie"
          speed="1"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 1,
          }}
          mode="forward"
          autoplay
          loop={false}
        />
      </div>

      {/* 상단 고정 영역 */}
      <div
        style={{
          position: "relative",
          backgroundColor: "transparent", // 투명 배경
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            padding: `${spacing.lg}px ${spacing.md}px`,
            display: "flex",
            alignItems: "center",
          }}
        >
          <button
            onClick={handleBack}
            style={{
              background: "none",
              border: "none",
              padding: spacing.sm,
              cursor: "pointer",
            }}
          >
            <Icon icon={ChevronLeft} size="lg" color={colors.grey900} />
          </button>
        </div>

        {/* 타이틀 */}
        <div
          style={{
            textAlign: "center",
            padding: `0 ${spacing.xl}px ${spacing.xxl}px`,
          }}
        >
          <Typography2_Semibold
            style={{
              color: colors.grey700,
              marginBottom: spacing.xs,
              fontSize: "16px", // 18px -> 16px
            }}
          >
            나는 2026년에
          </Typography2_Semibold>
          <Typography1_Bold
            style={{
              fontSize: "26px", // 28px -> 26px
              color: "#333D4B",
              lineHeight: 1.3,
              wordBreak: "keep-all",
            }}
          >
            {nation} {group} 그룹
            <br />
            {cell} 순과 함께해요!
          </Typography1_Bold>
        </div>
      </div>

      {/* 하단 스크롤 영역 */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: `0 ${spacing.lg}px ${spacing.xxl}px`,
          display: "flex",
          flexDirection: "column",
          gap: spacing.md,
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* organizationPeople에서 리더 정보 추출 */}
        {user.organizationPeople.map(
          (
            person: { role: string; phoneNumber: string; name: string },
            index: number
          ) => {
            const roleMap: Record<
              string,
              { icon: string; nameKo: string; nameEn: string }
            > = {
              순장: { icon: "👋🏻", nameKo: "순장", nameEn: "Cell Leader" },
              부순장: {
                icon: "📌",
                nameKo: "부순장",
                nameEn: "Assistant Cell Leader",
              },
              그룹장: { icon: "📌", nameKo: "그룹장", nameEn: "Group Leader" },
            };

            const roleInfo = roleMap[person.role] || {
              icon: "📌",
              nameKo: person.role,
              nameEn: person.role,
            };
            const variant = person.role === "순장" ? "large" : "row";

            return (
              <div
                key={person.phoneNumber}
                className="animate-slide-up"
                style={{
                  animationDelay: `${0.2 + index * 0.2}s`,
                  opacity: 0,
                  animationFillMode: "forwards",
                }}
              >
                <LeaderCard
                  variant={variant}
                  roleIcon={roleInfo.icon}
                  roleName={roleInfo.nameKo}
                  name={person.name}
                  phone={person.phoneNumber}
                  roleEn={roleInfo.nameEn}
                />
              </div>
            );
          }
        )}

        {/* 4. 동역자 리스트 (Accordion) */}
        <div
          className="animate-slide-up"
          style={{
            marginTop: spacing.lg,
            animationDelay: "0.8s",
            opacity: 0,
            animationFillMode: "forwards",
            backgroundColor: "#F9FAFB",
            padding: spacing.lg,
            borderRadius: "16px",
          }}
        >
          <button
            onClick={() => setIsListOpen(!isListOpen)}
            style={{
              width: "100%",
              background: "none",
              border: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              padding: spacing.md,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: spacing.xs,
              }}
            >
              <span style={{ fontSize: "22px" }}>🏃🏻</span>
              <Typography2_Semibold
                style={{ color: colors.grey900, fontSize: "18px" }}
              >
                2026년 함께할 믿음의 동역자들
              </Typography2_Semibold>
            </div>
            <Typography5_Regular
              style={{ color: colors.grey500, marginTop: "4px" }}
            >
              Partners We’ll Serve With in 2026
            </Typography5_Regular>
            <div style={{ marginTop: spacing.sm }}>
              <Icon
                icon={isListOpen ? ChevronUp : ChevronDown}
                size="sm"
                color={colors.grey400}
              />
            </div>
          </button>

          {isListOpen && user.organizationPeople.length > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: spacing.sm,
                marginTop: spacing.md,
                animation: "fadeIn 0.3s ease-in-out",
              }}
            >
              {user.organizationPeople
                .filter(
                  (person: { role: string }) =>
                    person.role !== "순장" &&
                    person.role !== "부순장" &&
                    person.role !== "그룹장"
                )
                .map(
                  (member: {
                    phoneNumber: string;
                    name: string;
                    birthYear: string;
                  }) => (
                    <div
                      key={member.phoneNumber}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: spacing.sm,
                        padding: `${spacing.md}px ${spacing.lg}px`,
                        backgroundColor: "#F9FAFB",
                        borderRadius: "12px",
                        alignItems: "center",
                      }}
                    >
                      <Typography3_Medium
                        style={{
                          color: colors.grey800,
                          fontSize: "15px",
                          margin: 0,
                          lineHeight: 1.5,
                        }}
                      >
                        {member.name}({member.birthYear.slice(-2)})
                      </Typography3_Medium>
                      <Typography3_Medium
                        style={{
                          color: colors.grey600,
                          fontSize: "15px",
                          margin: 0,
                          lineHeight: 1.5,
                        }}
                      >
                        {member.phoneNumber.slice(-4)}
                      </Typography3_Medium>
                    </div>
                  )
                )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideUpFadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-up {
          animation: slideUpFadeIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
      `}</style>
    </div>
  );
}

interface LeaderCardProps {
  variant: "large" | "row";
  roleIcon: string;
  roleName: string;
  roleEn?: string;
  name: string;
  phone: string;
}

const LeaderCard = ({
  variant,
  roleIcon,
  roleName,
  roleEn,
  name,
  phone,
}: LeaderCardProps) => {
  if (variant === "large") {
    return (
      <div
        style={{
          backgroundColor: "#F9FAFB",
          padding: spacing.xl,
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: spacing.xs,
          width: "100%",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: spacing.xs }}>
          <span style={{ fontSize: "20px" }}>{roleIcon}</span>
          <Typography3_Medium
            style={{ color: colors.grey800, fontSize: "15px" }}
          >
            {roleName}{" "}
            <span style={{ color: colors.grey400, fontSize: "13px" }}>
              {roleEn}
            </span>
          </Typography3_Medium>
        </div>
        <Typography2_Semibold
          style={{ color: colors.grey900, marginTop: "6px", fontSize: "20px" }}
        >
          {name} / {phone}
        </Typography2_Semibold>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#F9FAFB",
        padding: spacing.lg,
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
        <span style={{ fontSize: "20px" }}>{roleIcon}</span>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography3_Medium
            style={{ color: colors.grey900, fontSize: "15px" }}
          >
            {roleName}
          </Typography3_Medium>
          {roleEn && (
            <span style={{ color: colors.grey400, fontSize: "11px" }}>
              {roleEn}
            </span>
          )}
        </div>
      </div>
      <Typography3_Medium style={{ color: colors.grey700, fontSize: "15px" }}>
        {name} / {phone}
      </Typography3_Medium>
    </div>
  );
};
