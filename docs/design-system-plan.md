# 디자인 시스템 구축 계획서

> 토스 디자인 시스템 기반 모바일 웹앱 구축 계획

## 📋 목차

1. [전체 구조 개요](#1-전체-구조-개요)
2. [1단계: 스타일 가이드 (Foundation)](#1단계-스타일-가이드-foundation)
3. [2단계: Atoms (원자 컴포넌트)](#2단계-atoms-원자-컴포넌트)
4. [3단계: Molecules (분자 컴포넌트)](#3단계-molecules-분자-컴포넌트)
5. [4단계: Organisms (유기체 컴포넌트)](#4단계-organisms-유기체-컴포넌트)
6. [5단계: Pages (페이지 컴포넌트)](#5단계-pages-페이지-컴포넌트)
7. [6. 애니메이션 및 인터랙션 가이드](#6-애니메이션-및-인터랙션-가이드)
8. [7. 로딩 상태 가이드](#7-로딩-상태-가이드)
9. [8. 에러 처리 가이드](#8-에러-처리-가이드)
10. [9. 모바일 웹/PWA 특화 가이드](#9-모바일-웹pwa-특화-가이드)
11. [10. 트래픽 집중 상황 대응 가이드](#10-트래픽-집중-상황-대응-가이드)
12. [11. 특수 화면 가이드](#11-특수-화면-가이드)
13. [12. 추가 컴포넌트](#12-추가-컴포넌트)
14. [구현 순서 및 우선순위](#구현-순서-및-우선순위)
15. [파일 구조](#파일-구조)
16. [주요 고려사항](#주요-고려사항)

---

## 1. 전체 구조 개요

### Atomic Design 패턴 적용

```
Foundation (스타일 가이드)
    ↓
Atoms (원자 컴포넌트)
    ↓
Molecules (분자 컴포넌트)
    ↓
Organisms (유기체 컴포넌트)
    ↓
Pages (페이지 컴포넌트)
```

### 디렉토리 구조

```
src/
├── styles/
│   ├── foundation/
│   │   ├── colors.ts          # 색상 토큰
│   │   ├── typography.ts      # 타이포그래피 토큰
│   │   ├── spacing.ts         # 간격 토큰
│   │   ├── shadows.ts         # 그림자 토큰
│   │   └── index.ts           # 통합 export
│   └── global.css             # 전역 스타일
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   ├── Typography/
│   │   ├── Icon/
│   │   ├── Badge/
│   │   ├── Checkbox/
│   │   ├── Switch/
│   │   └── index.ts
│   ├── molecules/
│   │   ├── TextField/
│   │   ├── ListRow/
│   │   ├── BottomSheet/
│   │   ├── Dialog/
│   │   ├── Toast/
│   │   └── index.ts
│   └── organisms/
│       ├── Top/
│       ├── BottomCTA/
│       ├── Result/
│       └── index.ts
└── pages/
    ├── MainPage.tsx
    ├── CheckMyGroupPageForAllNationPage.tsx
    ├── CheckMyNewGroupPage.tsx
    └── NewGroupOpeningPage.tsx
```

---

## 1단계: 스타일 가이드 (Foundation)

### 목표
디자인 토큰을 정의하여 일관된 디자인 시스템의 기반을 마련합니다.

### 작업 내용

#### 1.1 Colors (색상 시스템)
**파일**: `src/styles/foundation/colors.ts`

- `@toss/tds-colors` 패키지 활용
- 색상 팔레트 정의:
  - Grey 계열 (grey50 ~ grey900)
  - Blue 계열 (Primary)
  - Red 계열 (Danger/Error)
  - Green 계열 (Success)
  - 기타 색상 (Orange, Yellow, Teal, Purple)
- 적응형 색상 (adaptive) 지원
- 색상 사용 가이드 주석 포함

#### 1.2 Typography (타이포그래피)
**파일**: `src/styles/foundation/typography.ts`

- Typography 계층 구조 정의:
  - Typography1 ~ Typography7
  - 각각의 Font Weight 변형 (Light, Regular, Medium, Semibold, Bold)
  - 서브 Typography (subTypography8 ~ subTypography10)
- 폰트 크기, 행간, 자간 정의
- 접근성 대응 (더 큰 텍스트 설정)
- React 컴포넌트로 Typography 컴포넌트 생성

#### 1.3 Spacing (간격 시스템)
**파일**: `src/styles/foundation/spacing.ts`

- 간격 토큰 정의:
  - xs: 4px
  - sm: 8px
  - md: 12px
  - lg: 16px
  - xl: 20px
  - xxl: 24px
  - xxxl: 32px
- Spacing 컴포넌트 (선택적)

#### 1.4 Shadows (그림자)
**파일**: `src/styles/foundation/shadows.ts`

- 그림자 토큰 정의 (필요시)
- Elevation 시스템

#### 1.5 Global Styles
**파일**: `src/styles/global.css`

- CSS Reset
- 전역 스타일
- 폰트 설정
- 기본 레이아웃 스타일

---

## 2단계: Atoms (원자 컴포넌트)

### 목표
재사용 가능한 가장 작은 단위의 컴포넌트를 생성합니다.

### 작업 내용

#### 2.1 Typography 컴포넌트
**파일**: `src/components/atoms/Typography/`

- Typography1_Bold ~ Typography7_Regular
- 각 Font Weight 변형 컴포넌트
- Props: children, color, style 등
- 접근성 고려 (aria-label 등)

#### 2.2 Button 컴포넌트
**파일**: `src/components/atoms/Button/`

- Props:
  - `color`: "primary" | "dark" | "danger" | "light"
  - `variant`: "fill" | "weak"
  - `size`: "xlarge" | "large" | "medium" | "small"
  - `display`: "full" | "block" | "inline"
  - `loading`: boolean
  - `disabled`: boolean
- 로딩 상태 처리
- 접근성 (aria-label, aria-busy)
- 최소 터치 영역 44x44px

#### 2.3 Icon 컴포넌트
**파일**: `src/components/atoms/Icon/`

- lucide-react 아이콘 래퍼
- 일관된 크기 및 스타일
- 색상 prop 지원

#### 2.4 Badge 컴포넌트
**파일**: `src/components/atoms/Badge/`

- Props:
  - `color`: "green" | "blue" | "red" | "yellow" 등
  - `variant`: "fill" | "weak"
  - `size`: "small" | "medium" | "large"
- 상태 표시용

#### 2.5 Checkbox 컴포넌트
**파일**: `src/components/atoms/Checkbox/`

- Checkbox.Circle 형태
- Props:
  - `checked`: boolean
  - `onCheckedChange`: (checked: boolean) => void
  - `aria-label`: string (필수)
- 접근성 필수

#### 2.6 Switch 컴포넌트
**파일**: `src/components/atoms/Switch/`

- 토글 스위치
- Props:
  - `checked`: boolean
  - `onChange`: (checked: boolean) => void
  - `aria-label`: string (필수)

---

## 3단계: Molecules (분자 컴포넌트)

### 목표
Atoms를 조합하여 더 복잡한 UI 요소를 만듭니다.

### 작업 내용

#### 3.1 TextField 컴포넌트
**파일**: `src/components/molecules/TextField/`

- Props:
  - `type`: "text" | "number" | "password" 등
  - `placeholder`: string
  - `value`: string
  - `onChange`: (value: string) => void
  - `error`: string | undefined
  - `helperText`: string
  - `suffix`: string (예: "원")
  - `maxLength`: number
- 에러 상태 처리
- 접근성 고려

#### 3.2 ListRow 컴포넌트
**파일**: `src/components/molecules/ListRow/`

- Props:
  - `contents`: ReactNode (ListRow.Texts)
  - `left`: ReactNode (아이콘/이미지)
  - `right`: ReactNode (금액/화살표/뱃지 등)
  - `border`: "none" | "full" | "indented"
  - `onClick`: () => void
- ListRow.Texts 서브컴포넌트:
  - `type`: "1RowTypeA" | "2RowTypeA" | "3RowTypeA"
  - `top`: ReactNode
  - `bottom`: ReactNode
  - `label`: ReactNode (3RowTypeA용)

#### 3.3 BottomSheet 컴포넌트
**파일**: `src/components/molecules/BottomSheet/`

- Props:
  - `open`: boolean
  - `onClose`: () => void
  - `header`: ReactNode (BottomSheet.Header)
  - `headerDescription`: ReactNode (선택)
  - `cta`: ReactNode (BottomSheet.CTA)
  - `hasTextField`: boolean
  - `expandBottomSheet`: boolean
- 서브컴포넌트:
  - BottomSheet.Header
  - BottomSheet.HeaderDescription
  - BottomSheet.CTA
  - BottomSheet.DoubleCTA
  - BottomSheet.Select
- 접근성 (ariaLabelledBy, ariaDescribedBy)

#### 3.4 Dialog 컴포넌트
**파일**: `src/components/molecules/Dialog/`

- Props:
  - `open`: boolean
  - `title`: string
  - `description`: string
  - `primaryButton`: { text: string, onClick: () => void }
  - `secondaryButton`: { text: string, onClick: () => void }
- 모달 형태

#### 3.5 Toast 컴포넌트
**파일**: `src/components/molecules/Toast/`

- Props:
  - `type`: "success" | "error" | "info"
  - `children`: ReactNode
- Toast Provider 및 Context 필요
- showToast 유틸 함수

---

## 4단계: Organisms (유기체 컴포넌트)

### 목표
Molecules와 Atoms를 조합하여 페이지의 주요 섹션을 만듭니다.

### 작업 내용

#### 4.1 Top 컴포넌트 (상단 헤더)
**파일**: `src/components/organisms/Top/`

- Props:
  - `title`: string
  - `left`: ReactNode (Top.BackButton 등)
  - `right`: ReactNode (Top.Icon 등)
- 서브컴포넌트:
  - Top.BackButton
  - Top.Icon

#### 4.2 BottomCTA 컴포넌트
**파일**: `src/components/organisms/BottomCTA/`

- 화면 하단 고정 CTA 영역
- Props: `children`
- 패딩 및 배경 처리

#### 4.3 Result 컴포넌트
**파일**: `src/components/organisms/Result/`

- 성공/에러 결과 화면
- Props:
  - `type`: "success" | "error"
  - `title`: string
  - `description`: string
  - `button`: ReactNode

---

## 5단계: Pages (페이지 컴포넌트)

### 목표
Organisms를 조합하여 완전한 페이지를 만듭니다.

### 작업 내용

#### 5.1 MainPage
- 메인 화면 (이름 입력)
- 그라데이션 배경
- TextField + 검색 버튼
- 올레이션 버튼

#### 5.2 DuplicateSelectionPage (중복자 선택)
- BottomSheet 모달 형태
- 중복자 리스트 표시
- ListRow 컴포넌트 활용

#### 5.3 AllNationGroupSelectionPage
- 올레이션 그룹 선택 페이지
- 그룹 버튼 그리드 레이아웃

#### 5.4 AllNationMemberListPage
- 올레이션 명단 페이지
- 롤업 애니메이션으로 리스트 표시
- ListRow 컴포넌트 활용

#### 5.5 AnimationPage
- 선물 박스 인터랙션 페이지
- GiftBox 컴포넌트 사용
- 중앙 정렬 레이아웃

#### 5.6 ResultPage
- 결과 표시 페이지
- 정보 카드 레이아웃
- Accordion으로 순원 목록 표시

---

## 구현 순서 및 우선순위

### Phase 1: Foundation (최우선)
1. ✅ Colors 토큰 정의
2. ✅ Typography 토큰 및 컴포넌트 정의
3. ✅ Spacing 토큰 정의
4. ✅ Global CSS 설정

### Phase 2: Core Atoms
1. ✅ Typography 컴포넌트 (이미 Foundation에서 일부 완료)
2. ✅ Button 컴포넌트
3. ✅ Icon 컴포넌트
4. ✅ Loader 컴포넌트
5. ✅ Skeleton 컴포넌트
6. ✅ GradientBackground 컴포넌트

### Phase 3: Form Atoms
1. ✅ Checkbox 컴포넌트
2. ✅ Switch 컴포넌트

### Phase 4: Basic Molecules
1. ✅ TextField 컴포넌트
2. ✅ ListRow 컴포넌트
3. ✅ Badge 컴포넌트 (Atoms로 이동 가능)

### Phase 5: Complex Molecules
1. ✅ BottomSheet 컴포넌트
2. ✅ Dialog 컴포넌트
3. ✅ Toast 컴포넌트
4. ✅ GiftBox 컴포넌트 (애니메이션 페이지용)
5. ✅ Accordion 컴포넌트 (순원 목록용)

### Phase 6: Organisms
1. ✅ Top 컴포넌트
2. ✅ BottomCTA 컴포넌트
3. ✅ Result 컴포넌트

### Phase 7: Pages
1. ✅ MainPage 리팩토링
2. ✅ 나머지 페이지들 리팩토링

---

## 파일 구조

### 상세 디렉토리 구조

```
src/
├── styles/
│   ├── foundation/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── shadows.ts
│   │   └── index.ts
│   └── global.css
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   ├── Typography/
│   │   │   ├── Typography.tsx
│   │   │   └── index.ts
│   │   ├── Icon/
│   │   │   ├── Icon.tsx
│   │   │   └── index.ts
│   │   ├── Badge/
│   │   │   ├── Badge.tsx
│   │   │   └── index.ts
│   │   ├── Checkbox/
│   │   │   ├── Checkbox.tsx
│   │   │   └── index.ts
│   │   ├── Switch/
│   │   │   ├── Switch.tsx
│   │   │   └── index.ts
│   │   ├── Loader/
│   │   │   ├── Loader.tsx
│   │   │   └── index.ts
│   │   ├── Skeleton/
│   │   │   ├── Skeleton.tsx
│   │   │   └── index.ts
│   │   ├── GradientBackground/
│   │   │   ├── GradientBackground.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── molecules/
│   │   ├── TextField/
│   │   │   ├── TextField.tsx
│   │   │   └── index.ts
│   │   ├── ListRow/
│   │   │   ├── ListRow.tsx
│   │   │   └── index.ts
│   │   ├── BottomSheet/
│   │   │   ├── BottomSheet.tsx
│   │   │   └── index.ts
│   │   ├── Dialog/
│   │   │   ├── Dialog.tsx
│   │   │   └── index.ts
│   │   ├── Toast/
│   │   │   ├── Toast.tsx
│   │   │   ├── ToastProvider.tsx
│   │   │   ├── useToast.ts
│   │   │   └── index.ts
│   │   ├── GiftBox/
│   │   │   ├── GiftBox.tsx
│   │   │   └── index.ts
│   │   ├── Accordion/
│   │   │   ├── Accordion.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   └── organisms/
│       ├── Top/
│       │   ├── Top.tsx
│       │   └── index.ts
│       ├── BottomCTA/
│       │   ├── BottomCTA.tsx
│       │   └── index.ts
│       ├── Result/
│       │   ├── Result.tsx
│       │   └── index.ts
│       └── index.ts
└── pages/
    ├── MainPage.tsx
    ├── CheckMyGroupPageForAllNationPage.tsx
    ├── CheckMyNewGroupPage.tsx
    └── NewGroupOpeningPage.tsx
```

---

## 6. 애니메이션 및 인터랙션 가이드

### 6.1 애니메이션 원칙

#### 타이밍 함수
```tsx
// 표준 이징 함수
const easing = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
};
```

#### 애니메이션 지속 시간
```tsx
const duration = {
  fast: 150,      // 빠른 피드백 (버튼 클릭 등)
  normal: 250,    // 일반적인 전환
  slow: 350,      // 중요한 전환
  verySlow: 500   // 페이지 전환 등
};
```

### 6.2 선물 박스 인터랙션 컴포넌트

**파일**: `src/components/molecules/GiftBox/`

#### Props
```tsx
interface GiftBoxProps {
  onComplete: () => void;  // 완료 시 콜백
  minTaps?: number;        // 최소 탭 횟수 (기본 3)
  maxTaps?: number;        // 최대 탭 횟수 (기본 4)
}
```

#### 인터랙션 시퀀스
1. **초기 상태**: 작은 선물 박스 (60px × 60px)
2. **탭 1회**: 80px × 80px로 확대 + 약한 진동
3. **탭 2회**: 100px × 100px로 확대 + 중간 진동
4. **탭 3회**: 120px × 120px로 확대 + 강한 진동
5. **탭 4회**: 폭발 애니메이션 + 파티클 효과 + 결과 페이지 전환

#### 애니메이션 상세
- **확대 애니메이션**: `transform: scale()` 사용 (성능 최적화)
- **진동 피드백**: `navigator.vibrate([50])` (지원되는 경우)
- **폭발 효과**: CSS 파티클 애니메이션 또는 Canvas
- **전환**: `fadeOut` + `scaleUp` 조합

#### 구현 예시
```tsx
<GiftBox
  onComplete={() => navigate('/result')}
  minTaps={3}
  maxTaps={4}
/>
```

### 6.3 페이지 전환 애니메이션

#### 슬라이드 전환
- **오른쪽으로 이동**: 다음 페이지로 이동
- **왼쪽으로 이동**: 이전 페이지로 이동
- **페이드**: 모달/바텀시트 등

#### 구현
```tsx
// React Transition Group 또는 Framer Motion 활용
<AnimatePresence mode="wait">
  <motion.div
    key={page}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.25 }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

### 6.4 마이크로 인터랙션

#### 버튼 호버/터치
- **스케일**: `transform: scale(0.98)` (터치 시)
- **그림자**: 약간 증가
- **색상**: 약간 어둡게

#### 리스트 아이템 등장
- **롤업 애니메이션**: `stagger` 효과로 순차 등장
- **지연 시간**: 각 아이템마다 50ms씩 증가

---

## 7. 로딩 상태 가이드

### 7.1 로딩 상태 종류

#### 버튼 로딩
```tsx
<Button loading={isLoading}>
  {isLoading ? '검색 중...' : '검색하기'}
</Button>
```

#### 전체 화면 로딩
```tsx
<Loader fullscreen>
  <Loader.Spinner />
  <Typography5_Regular>순배치를 확인하고 있어요</Typography5_Regular>
</Loader>
```

#### 스켈레톤 로딩
```tsx
// 리스트 아이템 스켈레톤
<Skeleton type="list" count={3} />

// 카드 스켈레톤
<Skeleton type="card" />
```

### 7.2 로딩 메시지 톤앤매너

```tsx
// ✅ 좋은 예
"순배치를 확인하고 있어요"
"잠시만 기다려주세요"
"데이터를 불러오는 중이에요"

// ❌ 나쁜 예
"로딩 중..."
"처리 중입니다"
"Loading..."
```

### 7.3 프로그레스 인디케이터

#### 선형 프로그레스
- 파일 업로드 등 예측 가능한 작업

#### 원형 프로그레스
- 시간이 불확실한 작업

#### 무한 로딩
- 시간 예측 불가능한 작업

---

## 8. 에러 처리 가이드

### 8.1 에러 상태 종류

#### 입력 에러
```tsx
<TextField
  error="이름을 입력해주세요"
  helperText="성과 이름을 모두 입력해주세요"
/>
```

#### 검색 결과 없음
```tsx
<Result
  type="empty"
  title="검색 결과가 없어요"
  description="입력하신 이름으로 순배치를 찾을 수 없어요. 이름을 다시 확인해주세요."
  button={
    <Button onClick={() => navigate('/')}>
      다시 검색하기
    </Button>
  }
/>
```

#### 서버 에러
```tsx
<Result
  type="error"
  title="일시적인 오류예요"
  description="잠시 후 다시 시도해주세요. 문제가 계속되면 관리자에게 문의해주세요."
  button={
    <Button onClick={retry}>
      다시 시도하기
    </Button>
  }
/>
```

#### 네트워크 에러
```tsx
<Result
  type="error"
  title="인터넷 연결을 확인해주세요"
  description="네트워크 연결이 불안정해요. 연결을 확인한 후 다시 시도해주세요."
  button={
    <Button onClick={retry}>
      다시 시도하기
    </Button>
  }
/>
```

### 8.2 에러 메시지 톤앤매너

```tsx
// ✅ 좋은 예
"일시적인 오류예요. 잠시 후 다시 시도해주세요"
"이름을 찾을 수 없어요. 다시 확인해주세요"
"인터넷 연결을 확인해주세요"

// ❌ 나쁜 예
"에러가 발생했습니다"
"404 Not Found"
"서버 오류"
```

### 8.3 에러 복구 전략

- **재시도 버튼**: 명확한 액션 제공
- **뒤로가기**: 이전 단계로 돌아가기
- **홈으로**: 메인 페이지로 이동

---

## 9. 모바일 웹/PWA 특화 가이드

### 9.1 Safe Area 처리

#### iOS 노치/홈 인디케이터 대응
```css
/* 하단 Safe Area */
padding-bottom: env(safe-area-inset-bottom);

/* 상단 Safe Area */
padding-top: env(safe-area-inset-top);
```

#### 구현
```tsx
<div style={{
  paddingBottom: `calc(20px + env(safe-area-inset-bottom))`
}}>
  <BottomCTA>
    <Button>다음</Button>
  </BottomCTA>
</div>
```

### 9.2 터치 제스처

#### 스와이프 제스처
- **BottomSheet**: 아래로 스와이프하여 닫기
- **리스트**: 좌우 스와이프 액션 (필요시)

#### 구현
```tsx
// react-swipeable 또는 직접 구현
import { useSwipeable } from 'react-swipeable';

const handlers = useSwipeable({
  onSwipedDown: () => onClose(),
  trackMouse: true
});
```

### 9.3 진동 피드백 (Haptic Feedback)

```tsx
// 진동 피드백 유틸
export const hapticFeedback = {
  light: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  },
  medium: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  },
  heavy: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(100);
    }
  }
};

// 사용 예시
<Button onClick={() => {
  hapticFeedback.medium();
  handleClick();
}}>
  클릭
</Button>
```

### 9.4 키보드 처리

#### 입력 필드 포커스 시
- 키보드가 입력 필드를 가리지 않도록 스크롤
- `scrollIntoView` 또는 `scroll-margin-top` 활용

#### 구현
```tsx
<TextField
  onFocus={(e) => {
    setTimeout(() => {
      e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  }}
/>
```

### 9.5 PWA 매니페스트

```json
{
  "name": "2026년 청년회 순배치 확인",
  "short_name": "순배치 확인",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3182f6",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## 10. 트래픽 집중 상황 대응 가이드

### 10.1 성능 최적화 전략

#### 코드 스플리팅
```tsx
// 페이지별 코드 스플리팅
const MainPage = lazy(() => import('./pages/MainPage'));
const ResultPage = lazy(() => import('./pages/ResultPage'));

<Suspense fallback={<Loader fullscreen />}>
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/result" element={<ResultPage />} />
  </Routes>
</Suspense>
```

#### 이미지 최적화
- **WebP 포맷** 사용
- **Lazy Loading** 적용
- **Responsive Images** (srcset)

#### 데이터 캐싱
```tsx
// React Query 또는 SWR 활용
const { data, isLoading } = useQuery(
  ['user', name],
  () => fetchUser(name),
  {
    staleTime: 5 * 60 * 1000, // 5분간 캐시
    cacheTime: 10 * 60 * 1000  // 10분간 유지
  }
);
```

### 10.2 오프라인 대응

#### Service Worker 전략
- **Cache First**: 정적 자산
- **Network First**: API 요청
- **Fallback**: 오프라인 페이지

#### 오프라인 UI
```tsx
<Result
  type="error"
  title="인터넷 연결이 필요해요"
  description="오프라인 상태에서는 순배치를 확인할 수 없어요. 인터넷 연결을 확인해주세요."
/>
```

### 10.3 로딩 우선순위

#### Critical Path
1. HTML 구조
2. CSS (인라인 critical CSS)
3. JavaScript (최소한의 코드)
4. 폰트 (preload)
5. 이미지 (lazy load)

#### 리소스 힌트
```html
<!-- DNS Prefetch -->
<link rel="dns-prefetch" href="https://api.example.com">

<!-- Preconnect -->
<link rel="preconnect" href="https://api.example.com">

<!-- Preload -->
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
```

### 10.4 서버 부하 대응

#### Rate Limiting UI
```tsx
<Result
  type="error"
  title="잠시만 기다려주세요"
  description="지금 많은 분들이 확인하고 있어요. 잠시 후 다시 시도해주세요."
  button={
    <Button onClick={retry} disabled={!canRetry}>
      {canRetry ? '다시 시도하기' : `${countdown}초 후 다시 시도`}
    </Button>
  }
/>
```

#### 폴백 전략
- **백엔드 실패 시**: 프론트엔드 JSON 파일 사용
- **점진적 로딩**: 중요 데이터 먼저, 나머지는 지연 로딩

---

## 11. 특수 화면 가이드

### 11.1 그라데이션 배경

#### 메인 페이지 그라데이션
```tsx
// Blue-Purple 그라데이션
const gradient = `linear-gradient(135deg, ${colors.blue500} 0%, ${colors.purple500} 100%)`;

<div style={{
  background: gradient,
  minHeight: '100vh',
  padding: '20px'
}}>
  {/* 콘텐츠 */}
</div>
```

#### 그라데이션 변형
```tsx
// 다양한 각도
const gradients = {
  diagonal: 'linear-gradient(135deg, ...)',
  vertical: 'linear-gradient(180deg, ...)',
  horizontal: 'linear-gradient(90deg, ...)',
  radial: 'radial-gradient(circle, ...)'
};
```

### 11.2 애니메이션 페이지 레이아웃

#### 중앙 정렬
```tsx
<div style={{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '20px'
}}>
  <GiftBox onComplete={handleComplete} />
  <Typography5_Regular style={{ marginTop: 24 }}>
    탭하여 선물을 열어보세요
  </Typography5_Regular>
</div>
```

### 11.3 결과 페이지 카드 레이아웃

#### 정보 카드
```tsx
<div style={{
  backgroundColor: colors.grey100,
  borderRadius: 12,
  padding: 20,
  marginBottom: 16
}}>
  <Typography6_Regular style={{ color: colors.grey600, marginBottom: 8 }}>
    나의 그룹
  </Typography6_Regular>
  <Typography3_Semibold style={{ color: colors.grey900 }}>
    {groupName}그룹
  </Typography3_Semibold>
</div>
```

#### 아코디언 (순원 목록)
```tsx
<Accordion>
  <Accordion.Item>
    <Accordion.Header>
      우리 순원 전체 보기 ({members.length}명)
    </Accordion.Header>
    <Accordion.Content>
      {members.map(member => (
        <ListRow
          key={member.id}
          contents={<ListRow.Texts type="1RowTypeA" top={member.name} />}
        />
      ))}
    </Accordion.Content>
  </Accordion.Item>
</Accordion>
```

---

## 12. 추가 컴포넌트

### 12.1 GiftBox 컴포넌트
**파일**: `src/components/molecules/GiftBox/`

- 선물 박스 인터랙션 컴포넌트
- 탭 기반 확대 애니메이션
- 폭발 효과 및 파티클

### 12.2 Loader 컴포넌트
**파일**: `src/components/atoms/Loader/`

- 스피너 로딩
- 전체 화면 로딩
- 프로그레스 바

### 12.3 Skeleton 컴포넌트
**파일**: `src/components/atoms/Skeleton/`

- 리스트 스켈레톤
- 카드 스켈레톤
- 텍스트 스켈레톤

### 12.4 Accordion 컴포넌트
**파일**: `src/components/molecules/Accordion/`

- 접었다 펼치는 아코디언
- 순원 목록 등에 사용

### 12.5 GradientBackground 컴포넌트
**파일**: `src/components/atoms/GradientBackground/`

- 재사용 가능한 그라데이션 배경
- 다양한 각도 및 색상 조합

---

## 주요 고려사항

### 1. 톤앤매너
- 모든 텍스트는 "~해요" 체 사용
- 전문 용어 대신 쉬운 말 사용
- 친근하고 대화하는 듯한 언어

### 2. 접근성
- 모든 인터랙티브 요소에 aria-label 제공
- 최소 터치 영역 44x44px
- 색상 대비 4.5:1 이상
- 키보드 접근 가능
- 스크린 리더 대응
- 모바일 접근성 고려 (진동 피드백 등)

### 3. 일관성
- 디자인 토큰 사용 (하드코딩 금지)
- 일관된 간격 시스템
- 일관된 색상 사용
- 일관된 애니메이션 타이밍

### 4. 성능
- 컴포넌트 최적화
- 불필요한 리렌더링 방지
- 코드 스플리팅 고려
- 이미지 최적화
- 트래픽 집중 상황 대응

### 5. 타입 안정성
- TypeScript 엄격 모드
- 모든 Props 타입 정의
- 유틸리티 타입 활용

### 6. 모바일 최적화
- Safe Area 처리
- 터치 제스처 지원
- 진동 피드백 활용
- 키보드 처리
- PWA 지원

---

## 다음 단계

이 계획서를 바탕으로 다음 순서로 진행:

1. **Foundation 구축** (스타일 가이드)
   - Colors, Typography, Spacing 토큰 정의
   - Global CSS 설정
   - 애니메이션 타이밍 함수 정의

2. **Core Atoms 개발**
   - Typography, Button, Icon 등 기본 컴포넌트
   - Loader, Skeleton 컴포넌트
   - GradientBackground 컴포넌트

3. **Form Atoms 개발**
   - Checkbox, Switch 컴포넌트

4. **Basic Molecules 개발**
   - TextField, ListRow 등 복합 컴포넌트
   - Badge 컴포넌트

5. **Complex Molecules 개발**
   - BottomSheet, Dialog, Toast 컴포넌트
   - GiftBox 컴포넌트 (애니메이션 페이지용)
   - Accordion 컴포넌트 (순원 목록용)

6. **Organisms 개발**
   - Top, BottomCTA 등 페이지 섹션
   - Result 컴포넌트

7. **Pages 개발**
   - MainPage (이름 입력)
   - DuplicateSelectionPage (중복자 선택)
   - AllNationGroupSelectionPage (올레이션 그룹 선택)
   - AllNationMemberListPage (올레이션 명단)
   - AnimationPage (선물 박스 인터랙션)
   - ResultPage (결과 표시)

8. **최적화 및 테스트**
   - 성능 최적화 (코드 스플리팅, 이미지 최적화)
   - 트래픽 부하 테스트
   - 모바일/PWA 테스트
   - 접근성 테스트

---

## 체크리스트

### 개발 전 체크리스트
- [ ] 디자인 토큰 정의 완료
- [ ] 컴포넌트 구조 설계 완료
- [ ] 애니메이션 가이드 확정
- [ ] 에러 처리 전략 수립

### 개발 중 체크리스트
- [ ] 모든 컴포넌트에 접근성 속성 추가
- [ ] 모바일 Safe Area 처리 확인
- [ ] 터치 제스처 및 진동 피드백 구현
- [ ] 로딩 상태 및 에러 상태 처리
- [ ] 성능 최적화 적용

### 배포 전 체크리스트
- [ ] 트래픽 부하 테스트 완료
- [ ] 모바일 기기 테스트 완료
- [ ] PWA 설치 및 동작 확인
- [ ] 오프라인 대응 확인
- [ ] 접근성 검증 완료

---

**참고**: 이 계획은 토스 디자인 시스템 가이드라인을 기반으로 하되, 프로젝트의 실제 요구사항에 맞게 조정될 수 있습니다.

