/**
 * Icon 컴포넌트
 * lucide-react 아이콘을 래핑하는 컴포넌트
 */

import type { ComponentType, SVGProps } from "react";
import { colors } from "../../../styles/foundation";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

// Lucide 아이콘 타입 정의
type LucideIcon = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number; color?: string }
>;

export interface IconProps {
  icon: LucideIcon;
  size?: IconSize | number;
  color?: string;
  className?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}

const sizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

export const Icon = ({
  icon: IconComponent,
  size = "md",
  color = colors.grey700,
  className,
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden = !ariaLabel,
}: IconProps) => {
  const iconSize = typeof size === "number" ? size : sizeMap[size];

  return (
    <IconComponent
      size={iconSize}
      color={color}
      className={className}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
    />
  );
};
