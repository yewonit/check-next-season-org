import { colors, spacing, typography, fontWeights, gradients } from '../styles/foundation';

export default function MainPage() {
  /**
   * @todo 이름 입력
   * @todo 올네이션 그룹의 경우 라우팅 버튼 또는 문구 필요
   */
  
  return (
    <div
      style={{
        minHeight: '100vh',
        padding: `${spacing.xxl}px ${spacing.xl}px`,
        backgroundColor: colors.background,
      }}
    >
      {/* Foundation 테스트 섹션 */}
      <section style={{ marginBottom: spacing.xxxl }}>
        <h1
          style={{
            ...typography.typography2,
            fontWeight: fontWeights.bold,
            color: colors.grey900,
            marginBottom: spacing.lg,
          }}
        >
          디자인 시스템 Foundation 테스트
        </h1>
        
        {/* 색상 테스트 */}
        <div style={{ marginBottom: spacing.xxl }}>
          <h2
            style={{
              ...typography.typography4,
              fontWeight: fontWeights.semibold,
              color: colors.grey800,
              marginBottom: spacing.md,
            }}
          >
            색상 시스템 (Primary: #00B493)
          </h2>
          
          {/* Primary 컬러 팔레트 */}
          <div style={{ marginBottom: spacing.lg }}>
            <h3
              style={{
                ...typography.typography6,
                fontWeight: fontWeights.medium,
                color: colors.grey700,
                marginBottom: spacing.sm,
              }}
            >
              Primary (Teal) 계열
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing.sm }}>
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                <div
                  key={shade}
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: colors[`primary${shade}` as keyof typeof colors] as string,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: shade <= 400 ? colors.grey900 : 'white',
                    ...typography.typography7,
                    fontWeight: fontWeights.medium,
                    fontSize: '10px',
                  }}
                >
                  {shade}
                </div>
              ))}
            </div>
          </div>

          {/* Secondary & Accent */}
          <div style={{ display: 'flex', gap: spacing.lg, marginBottom: spacing.lg }}>
            <div>
              <h3
                style={{
                  ...typography.typography6,
                  fontWeight: fontWeights.medium,
                  color: colors.grey700,
                  marginBottom: spacing.sm,
                }}
              >
                Secondary (Purple)
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing.sm }}>
                {[400, 500, 600].map((shade) => (
                  <div
                    key={shade}
                    style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: colors[`secondary${shade}` as keyof typeof colors] as string,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      ...typography.typography7,
                      fontWeight: fontWeights.medium,
                      fontSize: '10px',
                    }}
                  >
                    {shade}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3
                style={{
                  ...typography.typography6,
                  fontWeight: fontWeights.medium,
                  color: colors.grey700,
                  marginBottom: spacing.sm,
                }}
              >
                Accent (Coral Pink)
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing.sm }}>
                {[400, 500, 600].map((shade) => (
                  <div
                    key={shade}
                    style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: colors[`accent${shade}` as keyof typeof colors] as string,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      ...typography.typography7,
                      fontWeight: fontWeights.medium,
                      fontSize: '10px',
                    }}
                  >
                    {shade}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 상태 색상 */}
          <div>
            <h3
              style={{
                ...typography.typography6,
                fontWeight: fontWeights.medium,
                color: colors.grey700,
                marginBottom: spacing.sm,
              }}
            >
              상태 색상
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing.md }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: colors.green500,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  ...typography.typography7,
                  fontWeight: fontWeights.medium,
                }}
              >
                Success
              </div>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: colors.red500,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  ...typography.typography7,
                  fontWeight: fontWeights.medium,
                }}
              >
                Error
              </div>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: colors.yellow500,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colors.grey900,
                  ...typography.typography7,
                  fontWeight: fontWeights.medium,
                }}
              >
                Warning
              </div>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: colors.blue500,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  ...typography.typography7,
                  fontWeight: fontWeights.medium,
                }}
              >
                Info
              </div>
            </div>
          </div>
        </div>

        {/* 타이포그래피 테스트 */}
        <div style={{ marginBottom: spacing.xxl }}>
          <h2
            style={{
              ...typography.typography4,
              fontWeight: fontWeights.semibold,
              color: colors.grey800,
              marginBottom: spacing.md,
            }}
          >
            타이포그래피 시스템
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
            <div
              style={{
                ...typography.typography1,
                fontWeight: fontWeights.bold,
                color: colors.grey900,
              }}
            >
              Typography 1 - 매우 큰 제목 (30px)
            </div>
            <div
              style={{
                ...typography.typography2,
                fontWeight: fontWeights.semibold,
                color: colors.grey900,
              }}
            >
              Typography 2 - 큰 제목 (26px)
            </div>
            <div
              style={{
                ...typography.typography3,
                fontWeight: fontWeights.medium,
                color: colors.grey800,
              }}
            >
              Typography 3 - 일반 제목 (22px)
            </div>
            <div
              style={{
                ...typography.typography4,
                fontWeight: fontWeights.regular,
                color: colors.grey800,
              }}
            >
              Typography 4 - 작은 제목 (20px)
            </div>
            <div
              style={{
                ...typography.typography5,
                fontWeight: fontWeights.regular,
                color: colors.grey700,
              }}
            >
              Typography 5 - 일반 본문 (17px) ⭐ 가장 많이 사용
            </div>
            <div
              style={{
                ...typography.typography6,
                fontWeight: fontWeights.regular,
                color: colors.grey600,
              }}
            >
              Typography 6 - 작은 본문 (15px)
            </div>
            <div
              style={{
                ...typography.typography7,
                fontWeight: fontWeights.regular,
                color: colors.grey500,
              }}
            >
              Typography 7 - 캡션/주석 (13px)
            </div>
          </div>
        </div>

        {/* 간격 테스트 */}
        <div style={{ marginBottom: spacing.xxl }}>
          <h2
            style={{
              ...typography.typography4,
              fontWeight: fontWeights.semibold,
              color: colors.grey800,
              marginBottom: spacing.md,
            }}
          >
            간격 시스템
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
              <div
                style={{
                  width: spacing.xs,
                  height: spacing.xs,
                  backgroundColor: colors.blue500,
                  borderRadius: '2px',
                }}
              />
              <span style={{ ...typography.typography6, color: colors.grey700 }}>
                xs: {spacing.xs}px
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
              <div
                style={{
                  width: spacing.sm,
                  height: spacing.sm,
                  backgroundColor: colors.blue500,
                  borderRadius: '2px',
                }}
              />
              <span style={{ ...typography.typography6, color: colors.grey700 }}>
                sm: {spacing.sm}px
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
              <div
                style={{
                  width: spacing.md,
                  height: spacing.md,
                  backgroundColor: colors.blue500,
                  borderRadius: '2px',
                }}
              />
              <span style={{ ...typography.typography6, color: colors.grey700 }}>
                md: {spacing.md}px
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
              <div
                style={{
                  width: spacing.lg,
                  height: spacing.lg,
                  backgroundColor: colors.blue500,
                  borderRadius: '2px',
                }}
              />
              <span style={{ ...typography.typography6, color: colors.grey700 }}>
                lg: {spacing.lg}px
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
              <div
                style={{
                  width: spacing.xl,
                  height: spacing.xl,
                  backgroundColor: colors.blue500,
                  borderRadius: '2px',
                }}
              />
              <span style={{ ...typography.typography6, color: colors.grey700 }}>
                xl: {spacing.xl}px
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
              <div
                style={{
                  width: spacing.xxl,
                  height: spacing.xxl,
                  backgroundColor: colors.blue500,
                  borderRadius: '2px',
                }}
              />
              <span style={{ ...typography.typography6, color: colors.grey700 }}>
                xxl: {spacing.xxl}px
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
              <div
                style={{
                  width: spacing.xxxl,
                  height: spacing.xxxl,
                  backgroundColor: colors.blue500,
                  borderRadius: '2px',
                }}
              />
              <span style={{ ...typography.typography6, color: colors.grey700 }}>
                xxxl: {spacing.xxxl}px
              </span>
            </div>
          </div>
        </div>

        {/* 그라데이션 테스트 */}
        <div>
          <h2
            style={{
              ...typography.typography4,
              fontWeight: fontWeights.semibold,
              color: colors.grey800,
              marginBottom: spacing.md,
            }}
          >
            그라데이션 배경 (트랜디한 조합)
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
            <div
              style={{
                height: '120px',
                background: gradients.primary,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                ...typography.typography4,
                fontWeight: fontWeights.bold,
              }}
            >
              Primary 그라데이션 (메인 페이지용)
            </div>
            <div
              style={{
                height: '120px',
                background: gradients.primaryToSecondary,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                ...typography.typography4,
                fontWeight: fontWeights.bold,
              }}
            >
              Primary → Secondary (트랜디한 조합)
            </div>
            <div
              style={{
                height: '120px',
                background: gradients.primaryToAccent,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                ...typography.typography4,
                fontWeight: fontWeights.bold,
              }}
            >
              Primary → Accent (밝고 트랜디)
            </div>
            <div
              style={{
                height: '120px',
                background: gradients.premium,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                ...typography.typography4,
                fontWeight: fontWeights.bold,
              }}
            >
              Premium (Secondary → Primary)
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
