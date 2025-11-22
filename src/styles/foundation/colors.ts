/**
 * Colors - 색상 토큰 시스템
 * 프라이머리 컬러 #00B493를 기반으로 한 모던하고 트랜디한 색상 팔레트
 */

/**
 * 기본 색상 팔레트
 * 프라이머리 컬러 #00B493 (Teal)을 중심으로 구성
 */
export const colors = {
  // Grey 계열 - 기본 UI (토스 디자인 시스템 유지)
  grey50: '#f9fafb',   // 최상단 배경
  grey100: '#f2f4f6',  // 배경, 구분선
  grey200: '#e5e8eb',  // 비활성 요소
  grey300: '#d1d6db',  // 보더
  grey400: '#b0b8c1',  // 비활성 텍스트
  grey500: '#8b95a1',  // 서브 텍스트
  grey600: '#6b7684',  // 일반 텍스트
  grey700: '#4e5968',  // 강조 텍스트
  grey800: '#333d4b',  // 제목, 중요 텍스트
  grey900: '#191f28',  // 최대 강조 텍스트

  // Primary (Teal) 계열 - #00B493 기반
  primary50: '#e6faf7',   // 매우 밝은 배경
  primary100: '#b3f0e8',  // 밝은 배경
  primary200: '#80e6d9',  // 약한 강조
  primary300: '#4ddcca',  // 중간 강조
  primary400: '#1ad2bb',  // 활성 상태
  primary500: '#00b493',  // 프라이머리 컬러 ⭐
  primary600: '#00997d',  // 호버/활성 상태
  primary700: '#007d67',  // 강조 상태
  primary800: '#006151',  // 어두운 강조
  primary900: '#00453b',  // 매우 어두운 강조

  // Secondary (Purple) 계열 - 모던한 보조 색상
  secondary50: '#f5f3ff',
  secondary100: '#e9e5ff',
  secondary200: '#d4ccff',
  secondary300: '#b8a6ff',
  secondary400: '#9c7aff',
  secondary500: '#7c3aed',  // 보라색
  secondary600: '#6d28d9',
  secondary700: '#5b21b6',
  secondary800: '#4c1d95',
  secondary900: '#3c1573',

  // Accent (Coral/Pink) 계열 - 트랜디한 액센트
  accent50: '#fff1f2',
  accent100: '#ffe4e6',
  accent200: '#fecdd3',
  accent300: '#fda4af',
  accent400: '#fb7185',
  accent500: '#f43f5e',  // 코랄 핑크
  accent600: '#e11d48',
  accent700: '#be123c',
  accent800: '#9f1239',
  accent900: '#881337',

  // Red 계열 - 경고/에러
  red50: '#fef2f2',
  red100: '#fee2e2',
  red200: '#fecaca',
  red300: '#fca5a5',
  red400: '#f87171',
  red500: '#ef4444',   // 에러/경고 액션
  red600: '#dc2626',   // 에러 강조
  red700: '#b91c1c',
  red800: '#991b1b',
  red900: '#7f1d1d',

  // Green 계열 - 성공/긍정
  green50: '#f0fdf4',
  green100: '#dcfce7',
  green200: '#bbf7d0',
  green300: '#86efac',
  green400: '#4ade80',
  green500: '#22c55e',  // 성공 액션
  green600: '#16a34a',  // 성공 강조
  green700: '#15803d',
  green800: '#166534',
  green900: '#14532d',

  // Yellow 계열 - 경미한 주의
  yellow50: '#fefce8',
  yellow100: '#fef9c3',
  yellow200: '#fef08a',
  yellow300: '#fde047',
  yellow400: '#facc15',
  yellow500: '#eab308',  // 경미한 주의
  yellow600: '#ca8a04',
  yellow700: '#a16207',
  yellow800: '#854d0e',
  yellow900: '#713f12',

  // Orange 계열 - 알림/주의
  orange50: '#fff7ed',
  orange100: '#ffedd5',
  orange200: '#fed7aa',
  orange300: '#fdba74',
  orange400: '#fb923c',
  orange500: '#f97316',  // 알림/주의
  orange600: '#ea580c',
  orange700: '#c2410c',
  orange800: '#9a3412',
  orange900: '#7c2d12',

  // Blue 계열 - 정보 (Primary와 조화)
  blue50: '#eff6ff',
  blue100: '#dbeafe',
  blue200: '#bfdbfe',
  blue300: '#93c5fd',
  blue400: '#60a5fa',
  blue500: '#3b82f6',  // 정보
  blue600: '#2563eb',
  blue700: '#1d4ed8',
  blue800: '#1e40af',
  blue900: '#1e3a8a',

  // 시맨틱 색상
  background: '#ffffff',
  greyBackground: '#f2f4f6',
  
  // 텍스트 색상 (시맨틱)
  textPrimary: '#191f28',    // grey900
  textSecondary: '#4e5968',  // grey700
  textTertiary: '#8b95a1',   // grey500
  textDisabled: '#b0b8c1',   // grey400
  
  // 배경 색상 (시맨틱)
  bgPrimary: '#ffffff',
  bgSecondary: '#f9fafb',    // grey50
  bgTertiary: '#f2f4f6',     // grey100
  
  // 보더 색상 (시맨틱)
  borderLight: '#e5e8eb',    // grey200
  borderMedium: '#d1d6db',  // grey300
  borderDark: '#b0b8c1',    // grey400
} as const;

/**
 * 그라데이션 정의
 * 모던하고 트랜디한 그라데이션 조합
 */
export const gradients = {
  // Primary 그라데이션 (메인 페이지용)
  primary: 'linear-gradient(135deg, #00b493 0%, #007d67 100%)',
  
  // Primary to Secondary (트랜디한 조합)
  primaryToSecondary: 'linear-gradient(135deg, #00b493 0%, #7c3aed 100%)',
  
  // Primary to Accent (밝고 트랜디한 조합)
  primaryToAccent: 'linear-gradient(135deg, #00b493 0%, #f43f5e 100%)',
  
  // Secondary to Accent (보라-핑크 조합)
  secondaryToAccent: 'linear-gradient(135deg, #7c3aed 0%, #f43f5e 100%)',
  
  // Soft Primary (부드러운 Primary)
  softPrimary: 'linear-gradient(135deg, #4ddcca 0%, #00b493 100%)',
  
  // Success 그라데이션
  success: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
  
  // Premium 그라데이션 (특별한 경우)
  premium: 'linear-gradient(135deg, #7c3aed 0%, #00b493 100%)',
} as const;

/**
 * 색상 사용 가이드
 * 
 * Primary (Teal #00B493):
 * - 주요 액션 버튼: primary500
 * - 호버 상태: primary600
 * - 배경 강조: primary50, primary100
 * - 텍스트 강조: primary700, primary800
 * 
 * Secondary (Purple):
 * - 보조 액션: secondary500
 * - 특별한 강조: secondary600
 * 
 * Accent (Coral Pink):
 * - 트랜디한 액센트: accent500
 * - 주목을 끄는 요소: accent600
 * 
 * 텍스트 색상:
 * - 제목 (가장 중요): textPrimary (grey900)
 * - 본문 (일반): textSecondary (grey700)
 * - 서브 텍스트: textTertiary (grey500)
 * - 비활성: textDisabled (grey400)
 * 
 * 배경 색상:
 * - 페이지 배경: bgPrimary (white)
 * - 섹션 구분 배경: bgSecondary (grey50)
 * - 카드/컨테이너: bgTertiary (grey100)
 * - Primary 강조 배경: primary50, primary100
 * 
 * 버튼 색상:
 * - Primary 액션: primary500
 * - Secondary 액션: secondary500 또는 grey 계열 + 투명도
 * - 위험한 액션: red500
 * - 성공 액션: green500
 * 
 * 상태별 색상:
 * - 성공: green500
 * - 경고: yellow500 또는 orange500
 * - 에러: red500
 * - 정보: blue500
 * 
 * 그라데이션:
 * - 메인 페이지: gradients.primary 또는 gradients.primaryToSecondary
 * - 특별한 강조: gradients.premium
 * - 성공 피드백: gradients.success
 */

export type ColorKey = keyof typeof colors;
export type GradientKey = keyof typeof gradients;
