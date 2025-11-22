/**
 * Typography 컴포넌트
 * Foundation의 Typography 토큰을 사용하는 텍스트 컴포넌트
 */

import { ReactNode, CSSProperties } from 'react';
import { typography, fontWeights, colors, TypographyLevel, FontWeight } from '../../../styles/foundation';

export interface TypographyProps {
  children: ReactNode;
  level?: TypographyLevel;
  weight?: FontWeight;
  color?: string;
  style?: CSSProperties;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  'aria-label'?: string;
}

/**
 * 기본 Typography 컴포넌트
 */
export const Typography = ({
  children,
  level = 'typography5',
  weight = 'regular',
  color = colors.textPrimary,
  style,
  className,
  as = 'p',
  'aria-label': ariaLabel,
}: TypographyProps) => {
  const Component = as;
  
  const typographyStyle: CSSProperties = {
    ...typography[level],
    fontWeight: fontWeights[weight],
    color,
    margin: 0,
    ...style,
  };

  return (
    <Component
      style={typographyStyle}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </Component>
  );
};

/**
 * Typography 1 - 매우 큰 제목 (30px/40px)
 */
export const Typography1 = ({
  children,
  weight = 'bold',
  ...props
}: Omit<TypographyProps, 'level'>) => (
  <Typography level="typography1" weight={weight} {...props}>
    {children}
  </Typography>
);

/**
 * Typography 2 - 큰 제목 (26px/35px)
 */
export const Typography2 = ({
  children,
  weight = 'semibold',
  ...props
}: Omit<TypographyProps, 'level'>) => (
  <Typography level="typography2" weight={weight} {...props}>
    {children}
  </Typography>
);

/**
 * Typography 3 - 일반 제목 (22px/31px)
 */
export const Typography3 = ({
  children,
  weight = 'medium',
  ...props
}: Omit<TypographyProps, 'level'>) => (
  <Typography level="typography3" weight={weight} {...props}>
    {children}
  </Typography>
);

/**
 * Typography 4 - 작은 제목 (20px/29px)
 */
export const Typography4 = ({
  children,
  weight = 'regular',
  ...props
}: Omit<TypographyProps, 'level'>) => (
  <Typography level="typography4" weight={weight} {...props}>
    {children}
  </Typography>
);

/**
 * Typography 5 - 일반 본문 (17px/25.5px) ⭐ 가장 많이 사용
 */
export const Typography5 = ({
  children,
  weight = 'regular',
  ...props
}: Omit<TypographyProps, 'level'>) => (
  <Typography level="typography5" weight={weight} {...props}>
    {children}
  </Typography>
);

/**
 * Typography 6 - 작은 본문 (15px/22.5px)
 */
export const Typography6 = ({
  children,
  weight = 'regular',
  ...props
}: Omit<TypographyProps, 'level'>) => (
  <Typography level="typography6" weight={weight} {...props}>
    {children}
  </Typography>
);

/**
 * Typography 7 - 캡션/주석 (13px/19.5px)
 */
export const Typography7 = ({
  children,
  weight = 'regular',
  ...props
}: Omit<TypographyProps, 'level'>) => (
  <Typography level="typography7" weight={weight} {...props}>
    {children}
  </Typography>
);

/**
 * Font Weight 변형 컴포넌트들
 */
export const Typography1_Bold = (props: Omit<TypographyProps, 'level' | 'weight'>) => (
  <Typography1 weight="bold" {...props} />
);

export const Typography2_Semibold = (props: Omit<TypographyProps, 'level' | 'weight'>) => (
  <Typography2 weight="semibold" {...props} />
);

export const Typography3_Medium = (props: Omit<TypographyProps, 'level' | 'weight'>) => (
  <Typography3 weight="medium" {...props} />
);

export const Typography4_Regular = (props: Omit<TypographyProps, 'level' | 'weight'>) => (
  <Typography4 weight="regular" {...props} />
);

export const Typography4_Semibold = (props: Omit<TypographyProps, 'level' | 'weight'>) => (
  <Typography4 weight="semibold" {...props} />
);

export const Typography5_Regular = (props: Omit<TypographyProps, 'level' | 'weight'>) => (
  <Typography5 weight="regular" {...props} />
);

export const Typography5_Medium = (props: Omit<TypographyProps, 'level' | 'weight'>) => (
  <Typography5 weight="medium" {...props} />
);

export const Typography5_Semibold = (props: Omit<TypographyProps, 'level' | 'weight'>) => (
  <Typography5 weight="semibold" {...props} />
);

export const Typography6_Regular = (props: Omit<TypographyProps, 'level' | 'weight'>) => (
  <Typography6 weight="regular" {...props} />
);

export const Typography6_Medium = (props: Omit<TypographyProps, 'level' | 'weight'>) => (
  <Typography6 weight="medium" {...props} />
);

export const Typography7_Regular = (props: Omit<TypographyProps, 'level' | 'weight'>) => (
  <Typography7 weight="regular" {...props} />
);

