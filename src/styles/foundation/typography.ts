/**
 * Typography - 타이포그래피 토큰 시스템
 * 토스 디자인 시스템의 Typography 계층 구조를 정의합니다.
 */

import { colors } from './colors';

/**
 * Typography 크기 및 행간 정의
 */
export const typography = {
  // Typography 1 - 매우 큰 제목 (30px/40px)
  typography1: {
    fontSize: '30px',
    lineHeight: '40px',
    letterSpacing: '-0.02em',
  },
  
  // Typography 2 - 큰 제목 (26px/35px)
  typography2: {
    fontSize: '26px',
    lineHeight: '35px',
    letterSpacing: '-0.02em',
  },
  
  // Typography 3 - 일반 제목 (22px/31px)
  typography3: {
    fontSize: '22px',
    lineHeight: '31px',
    letterSpacing: '-0.01em',
  },
  
  // Typography 4 - 작은 제목 (20px/29px)
  typography4: {
    fontSize: '20px',
    lineHeight: '29px',
    letterSpacing: '-0.01em',
  },
  
  // Typography 5 - 일반 본문 (17px/25.5px) ⭐ 가장 많이 사용
  typography5: {
    fontSize: '17px',
    lineHeight: '25.5px',
    letterSpacing: '0',
  },
  
  // Typography 6 - 작은 본문 (15px/22.5px)
  typography6: {
    fontSize: '15px',
    lineHeight: '22.5px',
    letterSpacing: '0',
  },
  
  // Typography 7 - 캡션/주석 (13px/19.5px)
  typography7: {
    fontSize: '13px',
    lineHeight: '19.5px',
    letterSpacing: '0',
  },
} as const;

/**
 * Font Weight 정의
 */
export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

/**
 * Typography 스타일 생성 헬퍼
 */
export const createTypographyStyle = (
  level: keyof typeof typography,
  weight: keyof typeof fontWeights = 'regular',
  color: string = colors.grey900
) => {
  return {
    ...typography[level],
    fontWeight: fontWeights[weight],
    color,
  };
};

/**
 * Typography 사용 가이드
 * 
 * 제목:
 * - Typography 1: 큰 금액, 메인 타이틀
 * - Typography 2: 페이지 제목
 * - Typography 3: 섹션 제목
 * - Typography 4: 작은 제목
 * 
 * 본문:
 * - Typography 5: 일반 본문 (가장 많이 사용)
 * - Typography 6: 작은 본문, 서브 텍스트
 * - Typography 7: 캡션, 주석, 도움말
 * 
 * Font Weight:
 * - Light (300): 거의 사용 안 함
 * - Regular (400): 기본 본문
 * - Medium (500): 강조 본문
 * - Semibold (600): 제목/중요
 * - Bold (700): 최대 강조
 */

export type TypographyLevel = keyof typeof typography;
export type FontWeight = keyof typeof fontWeights;

