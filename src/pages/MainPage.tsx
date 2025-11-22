import {
  colors,
  spacing,
  typography,
  fontWeights,
  gradients,
} from "../styles/foundation";
import {
  Typography1_Bold,
  Typography2_Semibold,
  Typography3_Medium,
  Typography4_Regular,
  Typography5_Regular,
  Typography5_Medium,
  Typography6_Regular,
  Typography7_Regular,
} from "../components/atoms/Typography";
import { Button } from "../components/atoms/Button";
import { Icon } from "../components/atoms/Icon";
import { Loader, LoaderSpinner } from "../components/atoms/Loader";
import { Skeleton } from "../components/atoms/Skeleton";
import { GradientBackground } from "../components/atoms/GradientBackground";
import { Checkbox } from "../components/atoms/Checkbox";
import { Switch } from "../components/atoms/Switch";
import { Badge } from "../components/atoms/Badge";
import { TextField } from "../components/molecules/TextField";
import { ListRow } from "../components/molecules/ListRow";
import { BottomSheet } from "../components/molecules/BottomSheet";
import { Dialog } from "../components/molecules/Dialog";
import { ToastProvider, useToast } from "../components/molecules/Toast";
import { GiftBox } from "../components/molecules/GiftBox";
import { Accordion } from "../components/molecules/Accordion";
import { Top } from "../components/organisms/Top";
import { BottomCTA } from "../components/organisms/BottomCTA";
import { Result } from "../components/organisms/Result";
import { Search, ArrowRight, Check, User, Phone } from "lucide-react";
import { useState } from "react";

function MainPageContent() {
  // Form Atoms 테스트용 state
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);

  // Molecules 테스트용 state
  const [textFieldValue, setTextFieldValue] = useState("");
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { showToast } = useToast();
  const [giftBoxCompleted, setGiftBoxCompleted] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingBottom: "100px", // BottomCTA 공간 확보
        backgroundColor: colors.background,
      }}
    >
      {/* Top 헤더 테스트 */}
      <Top
        title="디자인 시스템 테스트"
        left={<Top.BackButton onClick={() => console.log("뒤로가기")} />}
        right={
          <Top.Icon
            icon={Search}
            onClick={() => console.log("검색")}
            aria-label="검색"
          />
        }
      />

      {/* Foundation 테스트 섹션 */}
      <section
        style={{
          marginBottom: spacing.xxxl,
          padding: `${spacing.xxl}px ${spacing.xl}px`,
        }}
      >
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
            <div style={{ display: "flex", flexWrap: "wrap", gap: spacing.sm }}>
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
                (shade) => (
                  <div
                    key={shade}
                    style={{
                      width: "60px",
                      height: "60px",
                      backgroundColor: colors[
                        `primary${shade}` as keyof typeof colors
                      ] as string,
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: shade <= 400 ? colors.grey900 : "white",
                      ...typography.typography7,
                      fontWeight: fontWeights.medium,
                      fontSize: "10px",
                    }}
                  >
                    {shade}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Secondary & Accent */}
          <div
            style={{
              display: "flex",
              gap: spacing.lg,
              marginBottom: spacing.lg,
            }}
          >
            <div>
              <Typography3_Medium style={{ marginBottom: spacing.sm }}>
                Secondary (Purple)
              </Typography3_Medium>
              <div
                style={{ display: "flex", flexWrap: "wrap", gap: spacing.sm }}
              >
                {[400, 500, 600].map((shade) => (
                  <div
                    key={shade}
                    style={{
                      width: "60px",
                      height: "60px",
                      backgroundColor: colors[
                        `secondary${shade}` as keyof typeof colors
                      ] as string,
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      ...typography.typography7,
                      fontWeight: fontWeights.medium,
                      fontSize: "10px",
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
              <div
                style={{ display: "flex", flexWrap: "wrap", gap: spacing.sm }}
              >
                {[400, 500, 600].map((shade) => (
                  <div
                    key={shade}
                    style={{
                      width: "60px",
                      height: "60px",
                      backgroundColor: colors[
                        `accent${shade}` as keyof typeof colors
                      ] as string,
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      ...typography.typography7,
                      fontWeight: fontWeights.medium,
                      fontSize: "10px",
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: spacing.md,
            }}
          >
            <Typography1_Bold>Typography1_Bold - 매우 큰 제목</Typography1_Bold>
            <Typography2_Semibold>
              Typography2_Semibold - 큰 제목
            </Typography2_Semibold>
            <Typography3_Medium>
              Typography3_Medium - 일반 제목
            </Typography3_Medium>
            <Typography4_Regular>
              Typography4_Regular - 작은 제목
            </Typography4_Regular>
            <Typography5_Regular>
              Typography5_Regular - 일반 본문 ⭐
            </Typography5_Regular>
            <Typography6_Regular>
              Typography6_Regular - 작은 본문
            </Typography6_Regular>
            <Typography7_Regular>
              Typography7_Regular - 캡션/주석
            </Typography7_Regular>
          </div>
        </div>

        {/* Button 테스트 */}
        <div style={{ marginBottom: spacing.xxl }}>
          <Typography2_Semibold style={{ marginBottom: spacing.md }}>
            Button 컴포넌트
          </Typography2_Semibold>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: spacing.md,
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: spacing.md }}>
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
            <div style={{ display: "flex", flexWrap: "wrap", gap: spacing.md }}>
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
              <Button
                color="primary"
                variant="fill"
                size="xlarge"
                display="full"
              >
                Full Width Button
              </Button>
            </div>
            <div style={{ display: "flex", gap: spacing.md }}>
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
          <div
            style={{ display: "flex", alignItems: "center", gap: spacing.lg }}
          >
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
          <div
            style={{ display: "flex", alignItems: "center", gap: spacing.xl }}
          >
            <Loader size="small">작은 로더</Loader>
            <Loader size="medium">중간 로더</Loader>
            <Loader size="large">큰 로더</Loader>
            <LoaderSpinner size="medium" />
          </div>
        </div>

        {/* Skeleton 테스트 */}
        <div style={{ marginBottom: spacing.xxl }}>
          <Typography2_Semibold style={{ marginBottom: spacing.md }}>
            Skeleton 컴포넌트
          </Typography2_Semibold>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: spacing.lg,
            }}
          >
            <Skeleton type="text" width="100%" />
            <Skeleton type="text" width="80%" />
            <Skeleton type="text" width="60%" />
            <div style={{ display: "flex", gap: spacing.md }}>
              <Skeleton type="circular" width={40} height={40} />
              <Skeleton type="rectangular" width={100} height={100} />
            </div>
            <Skeleton type="list" count={3} />
            <Skeleton type="card" />
          </div>
        </div>

        {/* 그라데이션 테스트 */}
        <div style={{ marginBottom: spacing.xxl }}>
          <Typography2_Semibold style={{ marginBottom: spacing.md }}>
            GradientBackground 컴포넌트
          </Typography2_Semibold>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: spacing.md,
            }}
          >
            <GradientBackground
              gradient="primary"
              style={{ padding: spacing.xl, borderRadius: "12px" }}
            >
              <Typography3_Medium style={{ color: "white" }}>
                Primary 그라데이션
              </Typography3_Medium>
            </GradientBackground>
            <GradientBackground
              gradient="primaryToSecondary"
              style={{ padding: spacing.xl, borderRadius: "12px" }}
            >
              <Typography3_Medium style={{ color: "white" }}>
                Primary → Secondary
              </Typography3_Medium>
            </GradientBackground>
            <GradientBackground
              gradient="primaryToAccent"
              style={{ padding: spacing.xl, borderRadius: "12px" }}
            >
              <Typography3_Medium style={{ color: "white" }}>
                Primary → Accent
              </Typography3_Medium>
            </GradientBackground>
            <GradientBackground
              gradient="premium"
              style={{ padding: spacing.xl, borderRadius: "12px" }}
            >
              <Typography3_Medium style={{ color: "white" }}>
                Premium 그라데이션
              </Typography3_Medium>
            </GradientBackground>
          </div>
        </div>

        {/* Form Atoms 테스트 */}
        <div style={{ marginBottom: spacing.xxl }}>
          <Typography2_Semibold style={{ marginBottom: spacing.md }}>
            Form Atoms 컴포넌트
          </Typography2_Semibold>

          {/* Checkbox 테스트 */}
          <div style={{ marginBottom: spacing.lg }}>
            <Typography3_Medium style={{ marginBottom: spacing.md }}>
              Checkbox 컴포넌트
            </Typography3_Medium>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: spacing.md,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: spacing.md,
                }}
              >
                <Checkbox.Circle
                  checked={checkboxChecked}
                  onCheckedChange={setCheckboxChecked}
                  aria-label="전체 동의"
                />
                <Typography5_Regular>전체 동의</Typography5_Regular>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: spacing.md,
                }}
              >
                <Checkbox.Circle
                  checked={true}
                  onCheckedChange={() => {}}
                  aria-label="이용약관 동의 (체크됨)"
                />
                <Typography5_Regular>(필수) 이용약관 동의</Typography5_Regular>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: spacing.md,
                }}
              >
                <Checkbox.Circle
                  checked={false}
                  onCheckedChange={() => {}}
                  disabled
                  aria-label="비활성화된 체크박스"
                />
                <Typography5_Regular style={{ color: colors.grey400 }}>
                  비활성화된 체크박스
                </Typography5_Regular>
              </div>
            </div>
          </div>

          {/* Switch 테스트 */}
          <div>
            <Typography3_Medium style={{ marginBottom: spacing.md }}>
              Switch 컴포넌트
            </Typography3_Medium>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: spacing.md,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography5_Regular>푸시 알림</Typography5_Regular>
                <Switch
                  checked={switchChecked}
                  onChange={setSwitchChecked}
                  aria-label="푸시 알림"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography5_Regular>알림 받기 (켜짐)</Typography5_Regular>
                <Switch
                  checked={true}
                  onChange={() => {}}
                  aria-label="알림 받기"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography5_Regular style={{ color: colors.grey400 }}>
                  비활성화된 스위치
                </Typography5_Regular>
                <Switch
                  checked={false}
                  onChange={() => {}}
                  disabled
                  aria-label="비활성화된 스위치"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Badge 테스트 */}
        <div style={{ marginBottom: spacing.xxl }}>
          <Typography2_Semibold style={{ marginBottom: spacing.md }}>
            Badge 컴포넌트
          </Typography2_Semibold>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: spacing.md,
              alignItems: "center",
            }}
          >
            <Badge color="primary" variant="fill" size="small">
              Primary
            </Badge>
            <Badge color="secondary" variant="fill" size="small">
              Secondary
            </Badge>
            <Badge color="accent" variant="fill" size="small">
              Accent
            </Badge>
            <Badge color="green" variant="fill" size="small">
              Success
            </Badge>
            <Badge color="red" variant="fill" size="small">
              Error
            </Badge>
            <Badge color="yellow" variant="fill" size="small">
              Warning
            </Badge>
            <Badge color="blue" variant="fill" size="small">
              Info
            </Badge>
            <Badge color="primary" variant="weak" size="medium">
              Weak Primary
            </Badge>
            <Badge color="green" variant="weak" size="large">
              Large Badge
            </Badge>
          </div>
        </div>

        {/* TextField 테스트 */}
        <div style={{ marginBottom: spacing.xxl }}>
          <Typography2_Semibold style={{ marginBottom: spacing.md }}>
            TextField 컴포넌트
          </Typography2_Semibold>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: spacing.lg,
            }}
          >
            <TextField
              placeholder="이름을 입력하세요"
              value={textFieldValue}
              onChange={setTextFieldValue}
            />
            <TextField
              placeholder="금액을 입력하세요"
              type="number"
              value=""
              onChange={() => {}}
              suffix="원"
            />
            <TextField
              placeholder="전화번호"
              value=""
              onChange={() => {}}
              leftIcon={<Icon icon={Phone} size="md" color={colors.grey500} />}
            />
            <TextField
              placeholder="검색어를 입력하세요"
              value=""
              onChange={() => {}}
              rightIcon={
                <Icon icon={Search} size="md" color={colors.grey500} />
              }
            />
            <TextField
              placeholder="에러 상태 예시"
              value=""
              onChange={() => {}}
              error="올바른 형식이 아닙니다"
              helperText="올바른 형식을 입력해주세요"
            />
            <TextField
              placeholder="비활성화된 입력 필드"
              value=""
              onChange={() => {}}
              disabled
            />
          </div>
        </div>

        {/* ListRow 테스트 */}
        <div style={{ marginBottom: spacing.xxl }}>
          <Typography2_Semibold style={{ marginBottom: spacing.md }}>
            ListRow 컴포넌트
          </Typography2_Semibold>
          <div
            style={{ backgroundColor: colors.background, borderRadius: "12px" }}
          >
            <ListRow
              contents={
                <ListRow.Texts type="1RowTypeA" top="1줄 리스트 아이템" />
              }
              right={
                <Icon icon={ArrowRight} size="md" color={colors.grey400} />
              }
              onClick={() => console.log("클릭")}
              border="indented"
            />
            <ListRow
              left={<Icon icon={User} size={40} color={colors.primary500} />}
              contents={
                <ListRow.Texts
                  type="2RowTypeA"
                  top="홍길동"
                  bottom="010-1234-5678"
                />
              }
              right={
                <Typography4_Regular style={{ color: colors.grey900 }}>
                  3,000원
                </Typography4_Regular>
              }
              border="indented"
            />
            <ListRow
              contents={
                <ListRow.Texts
                  type="3RowTypeA"
                  label="입금 계좌"
                  top="토스뱅크 통장"
                  bottom="1002-123-456789"
                />
              }
              right={
                <Badge color="green" variant="fill" size="small">
                  완료
                </Badge>
              }
              border="indented"
            />
            <ListRow
              contents={<ListRow.Texts type="1RowTypeA" top="설정" />}
              right={
                <Switch checked={true} onChange={() => {}} aria-label="설정" />
              }
              border="none"
            />
          </div>
        </div>

        {/* BottomSheet 테스트 */}
        <div style={{ marginBottom: spacing.xxl }}>
          <Typography2_Semibold style={{ marginBottom: spacing.md }}>
            BottomSheet 컴포넌트
          </Typography2_Semibold>
          <Button
            color="primary"
            variant="fill"
            onClick={() => setBottomSheetOpen(true)}
          >
            BottomSheet 열기
          </Button>
          <BottomSheet
            open={bottomSheetOpen}
            onClose={() => setBottomSheetOpen(false)}
            header={
              <BottomSheet.Header>동일한 이름이 있습니다</BottomSheet.Header>
            }
            headerDescription={
              <BottomSheet.HeaderDescription>
                본인의 정보를 선택해주세요
              </BottomSheet.HeaderDescription>
            }
            cta={
              <BottomSheet.CTA>
                <Button
                  color="primary"
                  variant="fill"
                  size="xlarge"
                  display="full"
                  onClick={() => {
                    setBottomSheetOpen(false);
                    showToast("success", "선택 완료");
                  }}
                >
                  확인
                </Button>
              </BottomSheet.CTA>
            }
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: spacing.md,
              }}
            >
              {["홍길동 (23기)", "홍길동 (24기)", "홍길동 (25기)"].map(
                (name, index) => (
                  <div
                    key={index}
                    style={{
                      padding: spacing.md,
                      border: `1px solid ${colors.grey200}`,
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setBottomSheetOpen(false);
                      showToast("success", `${name} 선택됨`);
                    }}
                  >
                    <Typography5_Medium>{name}</Typography5_Medium>
                    <Typography6_Regular
                      style={{ color: colors.grey500, marginTop: spacing.xs }}
                    >
                      고유번호: YA-2024-{String(index + 1).padStart(4, "0")}
                    </Typography6_Regular>
                  </div>
                )
              )}
            </div>
          </BottomSheet>
        </div>

        {/* Dialog 테스트 */}
        <div style={{ marginBottom: spacing.xxl }}>
          <Typography2_Semibold style={{ marginBottom: spacing.md }}>
            Dialog 컴포넌트
          </Typography2_Semibold>
          <Button
            color="primary"
            variant="fill"
            onClick={() => setDialogOpen(true)}
          >
            Dialog 열기
          </Button>
          <Dialog
            open={dialogOpen}
            title="정말 송금하시겠어요?"
            description="홍길동님께 10,000원을 보내요"
            primaryButton={{
              text: "송금하기",
              onClick: () => {
                setDialogOpen(false);
                showToast("success", "송금이 완료되었어요");
              },
            }}
            secondaryButton={{
              text: "취소",
              onClick: () => setDialogOpen(false),
            }}
            onClose={() => setDialogOpen(false)}
          />
        </div>

        {/* Toast 테스트 */}
        <div style={{ marginBottom: spacing.xxl }}>
          <Typography2_Semibold style={{ marginBottom: spacing.md }}>
            Toast 컴포넌트
          </Typography2_Semibold>
          <div style={{ display: "flex", flexWrap: "wrap", gap: spacing.md }}>
            <Button
              color="primary"
              variant="fill"
              onClick={() => showToast("success", "송금이 완료되었어요")}
            >
              Success Toast
            </Button>
            <Button
              color="danger"
              variant="fill"
              onClick={() =>
                showToast(
                  "error",
                  "일시적인 오류예요. 잠시 후 다시 시도해주세요"
                )
              }
            >
              Error Toast
            </Button>
            <Button
              color="secondary"
              variant="fill"
              onClick={() => showToast("info", "계좌번호가 복사되었어요")}
            >
              Info Toast
            </Button>
          </div>
        </div>

        {/* GiftBox 테스트 */}
        <div style={{ marginBottom: spacing.xxl }}>
          <Typography2_Semibold style={{ marginBottom: spacing.md }}>
            GiftBox 컴포넌트 (애니메이션 페이지용)
          </Typography2_Semibold>
          <div
            style={{
              minHeight: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.grey50,
              borderRadius: "12px",
              position: "relative",
            }}
          >
            {!giftBoxCompleted ? (
              <GiftBox
                onComplete={() => {
                  setGiftBoxCompleted(true);
                  showToast("success", "선물이 열렸어요!");
                }}
                minTaps={3}
                maxTaps={4}
              />
            ) : (
              <div style={{ textAlign: "center" }}>
                <Typography2_Semibold style={{ color: colors.primary500 }}>
                  축하해요! 🎉
                </Typography2_Semibold>
                <Button
                  color="primary"
                  variant="fill"
                  onClick={() => setGiftBoxCompleted(false)}
                  style={{ marginTop: spacing.md }}
                >
                  다시 시도
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Accordion 테스트 */}
        <div style={{ marginBottom: spacing.xxl }}>
          <Typography2_Semibold style={{ marginBottom: spacing.md }}>
            Accordion 컴포넌트
          </Typography2_Semibold>
          <Accordion>
            <Accordion.Item
              header={
                <Typography5_Medium>
                  우리 순원 전체 보기 (5명)
                </Typography5_Medium>
              }
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: spacing.sm,
                }}
              >
                {["홍길동", "김철수", "이영희", "박민수", "정수진"].map(
                  (name, index) => (
                    <ListRow
                      key={index}
                      contents={<ListRow.Texts type="1RowTypeA" top={name} />}
                      border={index < 4 ? "indented" : "none"}
                    />
                  )
                )}
              </div>
            </Accordion.Item>
          </Accordion>
        </div>

        {/* Result 테스트 */}
        <div style={{ marginBottom: spacing.xxl }}>
          <Typography2_Semibold style={{ marginBottom: spacing.md }}>
            Result 컴포넌트
          </Typography2_Semibold>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: spacing.lg,
            }}
          >
            <Result
              type="success"
              title="송금 완료"
              description="홍길동님께 10,000원을 보냈어요"
              button={
                <Button
                  color="primary"
                  variant="fill"
                  onClick={() => showToast("success", "확인")}
                >
                  확인
                </Button>
              }
            />
            <Result
              type="error"
              title="일시적인 오류예요"
              description="잠시 후 다시 시도해주세요"
              button={
                <Button
                  color="primary"
                  variant="fill"
                  onClick={() => showToast("info", "다시 시도")}
                >
                  다시 시도
                </Button>
              }
            />
            <Result
              type="empty"
              title="검색 결과가 없어요"
              description="입력하신 이름으로 순배치를 찾을 수 없어요"
              button={
                <Button
                  color="primary"
                  variant="fill"
                  onClick={() => showToast("info", "다시 검색")}
                >
                  다시 검색하기
                </Button>
              }
            />
          </div>
        </div>
      </section>

      {/* BottomCTA 테스트 */}
      <BottomCTA>
        <Button
          color="primary"
          variant="fill"
          size="xlarge"
          display="full"
          onClick={() => showToast("success", "CTA 버튼 클릭됨")}
        >
          다음 단계로
        </Button>
      </BottomCTA>
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
