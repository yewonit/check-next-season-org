import { useLocation } from "react-router-dom";
import { colors, spacing } from "../styles/foundation";
import { Typography2_Semibold } from "../components/atoms/Typography";

export default function CheckMyNewGroupPage() {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: colors.background,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: `${spacing.xl}px`,
        gap: spacing.xl,
      }}
    >
      {/* Lottie 애니메이션 */}
      {/* @ts-expect-error - dotlottie-wc is a web component */}
      <dotlottie-wc
        src="https://lottie.host/005af26a-0a51-4be4-8406-b178591a5488/zjqYp9dc24.lottie"
        speed="1"
        style={{ width: "300px", height: "800px" }}
        mode="forward"
        autoplay
      />

      {/* 사용자 정보 표시 */}
      {user && (
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: spacing.md,
          }}
        >
          <Typography2_Semibold style={{ color: colors.grey900 }}>
            {user.name}님의 소속
          </Typography2_Semibold>
          <div style={{ color: colors.grey600 }}>
            <p>{user.organization}</p>
            <p>역할: {user.role}</p>
          </div>
        </div>
      )}
    </div>
  );
}
