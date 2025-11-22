/**
 * Foundation - 디자인 토큰 통합 Export
 * 모든 디자인 토큰을 한 곳에서 import할 수 있도록 합니다.
 */

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './shadows';

// Colors에서 gradients와 타입도 함께 export
export { gradients } from './colors';
export type { GradientKey, ColorKey } from './colors';
