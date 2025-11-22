import { colors, spacing, typography, fontWeights, gradients } from '../styles/foundation';
import {
  Typography1_Bold,
  Typography2_Semibold,
  Typography3_Medium,
  Typography4_Regular,
  Typography5_Regular,
  Typography6_Regular,
  Typography7_Regular,
} from '../components/atoms/Typography';
import { Button } from '../components/atoms/Button';
import { Icon } from '../components/atoms/Icon';
import { Loader, LoaderSpinner } from '../components/atoms/Loader';
import { Skeleton } from '../components/atoms/Skeleton';
import { GradientBackground } from '../components/atoms/GradientBackground';
import { Search, ArrowRight, Check } from 'lucide-react';

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
        <Typography1_Bold style={{ marginBottom: spacing.lg }}>
          디자인 시스템 Foundation 테스트
        </Typography1_Bold>
        
        {/* 색상 테스트 */}
        <div style={{ marginBottom: spacing.xxl }}>
          <Typography2_Semibold style={{ marginBottom: spacing.md }}>
            색상 시스템 (Primary: #00B493)
          </Typography2_Semibold>
          
          {/* Primary 컬러 팔레트 */}
          <div style={{ marginBottom: spacing.lg }}>
            <Typography3_Medium style={{ marginBottom: spacing.sm }}>
              Primary (Teal) 계열
            </Typography3_Medium>
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
              <Typography3_Medium style={{ marginBottom: spacing.sm }}>
                Secondary (Purple)
              </Typography3_Medium>
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
              <Typography3_Medium style={{ marginBottom: spacing.sm }}>
                Accent (Coral Pink)
              </Typography3_Medium>
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
        </div>

        {/* 타이포그래피 테스트 */}
        <div style={{ marginBottom: spacing.xxl }}>
          <Typography2_Semibold style={{ marginBottom: spacing.md }}>
            Typography 컴포넌트
          </Typography2_Semibold>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
            <Typography1_Bold>Typography1_Bold - 매우 큰 제목</Typography1_Bold>
            <Typography2_Semibold>Typography2_Semibold - 큰 제목</Typography2_Semibold>
            <Typography3_Medium>Typography3_Medium - 일반 제목</Typography3_Medium>
            <Typography4_Regular>Typography4_Regular - 작은 제목</Typography4_Regular>
            <Typography5_Regular>Typography5_Regular - 일반 본문 ⭐</Typography5_Regular>
            <Typography6_Regular>Typography6_Regular - 작은 본문</Typography6_Regular>
            <Typography7_Regular>Typography7_Regular - 캡션/주석</Typography7_Regular>
          </div>
        </div>

        {/* Button 테스트 */}
        <div style={{ marginBottom: spacing.xxl }}>
          <Typography2_Semibold style={{ marginBottom: spacing.md }}>
            Button 컴포넌트
          </Typography2_Semibold>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing.md }}>
              <Button color="primary" variant="fill" size="large">
                Primary Fill
              </Button>
              <Button color="primary" variant="weak" size="large">
                Primary Weak
              </Button>
              <Button color="secondary" variant="fill" size="large">
                Secondary Fill
              </Button>
              <Button color="accent" variant="fill" size="large">
                Accent Fill
              </Button>
              <Button color="dark" variant="fill" size="large">
                Dark Fill
              </Button>
              <Button color="danger" variant="fill" size="large">
                Danger Fill
              </Button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing.md }}>
              <Button color="primary" variant="fill" size="xlarge">
                XLarge
              </Button>
              <Button color="primary" variant="fill" size="large">
                Large
              </Button>
              <Button color="primary" variant="fill" size="medium">
                Medium
              </Button>
              <Button color="primary" variant="fill" size="small">
                Small
              </Button>
            </div>
            <div>
              <Button color="primary" variant="fill" size="xlarge" display="full">
                Full Width Button
              </Button>
            </div>
            <div style={{ display: 'flex', gap: spacing.md }}>
              <Button color="primary" variant="fill" loading>
                로딩 중...
              </Button>
              <Button color="primary" variant="fill" disabled>
                비활성화
              </Button>
            </div>
            <div>
              <Button color="primary" variant="fill" size="large">
                <Icon icon={Search} size="md" color="white" />
                아이콘 + 텍스트
              </Button>
            </div>
          </div>
        </div>

        {/* Icon 테스트 */}
        <div style={{ marginBottom: spacing.xxl }}>
          <Typography2_Semibold style={{ marginBottom: spacing.md }}>
            Icon 컴포넌트
          </Typography2_Semibold>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.lg }}>
            <Icon icon={Search} size="xs" />
            <Icon icon={Search} size="sm" />
            <Icon icon={Search} size="md" />
            <Icon icon={Search} size="lg" />
            <Icon icon={Search} size="xl" />
            <Icon icon={ArrowRight} size="md" color={colors.primary500} />
            <Icon icon={Check} size="md" color={colors.green500} />
          </div>
        </div>

        {/* Loader 테스트 */}
        <div style={{ marginBottom: spacing.xxl }}>
          <Typography2_Semibold style={{ marginBottom: spacing.md }}>
            Loader 컴포넌트
          </Typography2_Semibold>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.xl }}>
            <Loader size="small">
              <Typography5_Regular>작은 로더</Typography5_Regular>
            </Loader>
            <Loader size="medium">
              <Typography5_Regular>중간 로더</Typography5_Regular>
            </Loader>
            <Loader size="large">
              <Typography5_Regular>큰 로더</Typography5_Regular>
            </Loader>
            <LoaderSpinner size="medium" />
          </div>
        </div>

        {/* Skeleton 테스트 */}
        <div style={{ marginBottom: spacing.xxl }}>
          <Typography2_Semibold style={{ marginBottom: spacing.md }}>
            Skeleton 컴포넌트
          </Typography2_Semibold>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
            <Skeleton type="text" width="100%" />
            <Skeleton type="text" width="80%" />
            <Skeleton type="text" width="60%" />
            <div style={{ display: 'flex', gap: spacing.md }}>
              <Skeleton type="circular" width={40} height={40} />
              <Skeleton type="rectangular" width={100} height={100} />
            </div>
            <Skeleton type="list" count={3} />
            <Skeleton type="card" />
          </div>
        </div>

        {/* 그라데이션 테스트 */}
        <div>
          <Typography2_Semibold style={{ marginBottom: spacing.md }}>
            GradientBackground 컴포넌트
          </Typography2_Semibold>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
            <GradientBackground gradient="primary" style={{ padding: spacing.xl, borderRadius: '12px' }}>
              <Typography3_Medium style={{ color: 'white' }}>
                Primary 그라데이션
              </Typography3_Medium>
            </GradientBackground>
            <GradientBackground gradient="primaryToSecondary" style={{ padding: spacing.xl, borderRadius: '12px' }}>
              <Typography3_Medium style={{ color: 'white' }}>
                Primary → Secondary
              </Typography3_Medium>
            </GradientBackground>
            <GradientBackground gradient="primaryToAccent" style={{ padding: spacing.xl, borderRadius: '12px' }}>
              <Typography3_Medium style={{ color: 'white' }}>
                Primary → Accent
              </Typography3_Medium>
            </GradientBackground>
            <GradientBackground gradient="premium" style={{ padding: spacing.xl, borderRadius: '12px' }}>
              <Typography3_Medium style={{ color: 'white' }}>
                Premium 그라데이션
              </Typography3_Medium>
            </GradientBackground>
          </div>
        </div>
      </section>
    </div>
  );
}
