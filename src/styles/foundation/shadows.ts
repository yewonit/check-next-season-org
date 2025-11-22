/**
 * Shadows - 그림자 토큰 시스템
 * Elevation 시스템을 제공합니다.
 */

export const shadows = {
  // 작은 그림자 (카드, 버튼 호버)
  small: '0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
  
  // 중간 그림자 (카드, 모달)
  medium: '0 2px 4px rgba(0, 0, 0, 0.05), 0 4px 8px rgba(0, 0, 0, 0.1)',
  
  // 큰 그림자 (바텀시트, 다이얼로그)
  large: '0 4px 8px rgba(0, 0, 0, 0.05), 0 8px 16px rgba(0, 0, 0, 0.1)',
  
  // 매우 큰 그림자 (드롭다운, 팝오버)
  xlarge: '0 8px 16px rgba(0, 0, 0, 0.05), 0 16px 32px rgba(0, 0, 0, 0.1)',
} as const;

/**
 * 그림자 사용 가이드
 * 
 * Elevation 레벨:
 * - Level 1 (small): 기본 카드, 버튼 호버
 * - Level 2 (medium): 모달, 바텀시트
 * - Level 3 (large): 드롭다운 메뉴
 * - Level 4 (xlarge): 팝오버, 툴팁
 */

export type ShadowKey = keyof typeof shadows;

