/**
 * Spacing - 간격 토큰 시스템
 * 일관된 간격 시스템을 제공합니다.
 */

export const spacing = {
  xs: 4,    // 4px - 매우 작은 간격
  sm: 8,    // 8px - 작은 간격
  md: 12,   // 12px - 중간 간격
  lg: 16,   // 16px - 큰 간격 (기본 요소 간격)
  xl: 20,   // 20px - 매우 큰 간격 (화면 좌우 패딩)
  xxl: 24,  // 24px - 섹션 간격
  xxxl: 32, // 32px - 큰 섹션 간격
} as const;

/**
 * 간격 사용 가이드
 * 
 * 화면 레이아웃:
 * - 화면 좌우 패딩: spacing.xl (20px)
 * - 섹션 상하 패딩: spacing.xxl (24px)
 * - 카드 패딩: spacing.xl (20px)
 * 
 * 요소 간격:
 * - 리스트 아이템 간격: spacing.lg (16px)
 * - 버튼 간격: spacing.md (12px)
 * - 작은 요소 간격: spacing.sm (8px)
 * 
 * 하단 CTA 영역:
 * - 하단 패딩: spacing.xxxl + safe-area (32px + safe-area-inset-bottom)
 */

export type SpacingKey = keyof typeof spacing;

/**
 * 간격 값을 픽셀 문자열로 반환
 */
export const getSpacing = (key: SpacingKey): string => {
  return `${spacing[key]}px`;
};

