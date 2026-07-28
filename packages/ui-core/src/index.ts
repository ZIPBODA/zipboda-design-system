/**
 * @zipboda/ui-core — 프레임워크 무관 UI 계약
 * DOM(@zipboda/ui)과 App RN 컴포넌트가 동일 props/variant API를 공유해 파리티를 강제한다.
 * 토큰 키는 @zipboda/tokens의 semantic 이름(kebab)과 1:1 대응한다.
 *  - DOM: `var(--zb-<key>)` 로 해석
 *  - RN : @zipboda/tokens 의 ES6 export(예: ZbBrandPrimary)로 해석
 */

export type TokenKey = string;

/* ── Button ── */
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "dark";
export type ButtonSize = "lg" | "sm";

export interface ButtonContract {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
}

export interface ButtonVariantTokens {
  /** 배경 토큰 키(null=투명) */
  bg: TokenKey | null;
  /** 텍스트 토큰 키 */
  fg: TokenKey;
  /** 테두리 토큰 키(선택) */
  border?: TokenKey;
}

/** variant → 토큰 키 (figma: Button set 5:150 / 디자인시스템 §11) */
export const buttonVariantTokens: Record<ButtonVariant, ButtonVariantTokens> = {
  primary: { bg: "brand-primary", fg: "brand-on-primary" },
  secondary: { bg: "bg-tertiary", fg: "text-strong" },
  outline: { bg: null, fg: "brand-primary", border: "brand-primary" },
  ghost: { bg: null, fg: "text-body" },
  dark: { bg: "text-strong", fg: "text-on-dark" }
};

/** size → 수치 스펙(px). radius/padding/font */
export const buttonSizeSpec: Record<ButtonSize, { padY: number; padX: number; font: number; radius: number; weight: number }> = {
  lg: { padY: 14, padX: 32, font: 14, radius: 16, weight: 700 },
  sm: { padY: 8, padX: 16, font: 12, radius: 12, weight: 700 }
};

/* ── Badge ── (figma 20:136) */
export type BadgeVariant = "primary" | "error" | "success" | "info" | "neutral" | "dark";

export const badgeVariantTokens: Record<BadgeVariant, { bg: TokenKey; fg: TokenKey }> = {
  primary: { bg: "brand-primary", fg: "brand-on-primary" },
  error: { bg: "status-error", fg: "text-on-dark" },
  success: { bg: "status-success", fg: "text-on-dark" },
  info: { bg: "status-info", fg: "text-on-dark" },
  neutral: { bg: "bg-tertiary", fg: "text-muted" },
  dark: { bg: "text-strong", fg: "text-on-dark" }
};
export const badgeSpec = { padY: 4, padX: 8, font: 10, radius: 8, weight: 700 } as const;

/* ── Chip ── (figma 20:77) */
export type ChipVariant = "active" | "default" | "darkActive" | "outline";

export const chipVariantTokens: Record<ChipVariant, { bg: TokenKey | null; fg: TokenKey; border?: TokenKey; weight: number }> = {
  active: { bg: "brand-primary", fg: "brand-on-primary", weight: 700 },
  default: { bg: "bg-tertiary", fg: "text-muted", weight: 600 },
  darkActive: { bg: "text-strong", fg: "text-on-dark", weight: 700 },
  outline: { bg: null, fg: "text-body", border: "border-default", weight: 500 }
};
export const chipSpec = { padY: 6, padX: 12, font: 10, radiusToken: "radius-full" } as const;

/* ── Tab ── (figma 20:90) */
export type TabState = "active" | "default";
export const tabStateTokens: Record<TabState, { fg: TokenKey; weight: number; underline: TokenKey | null }> = {
  active: { fg: "text-strong", weight: 700, underline: "brand-primary" },
  default: { fg: "text-muted", weight: 500, underline: null }
};
export const tabSpec = { padY: 10, padX: 16, font: 14 } as const;

/* ── Input / Text ── (figma 20:113) */
export type InputState = "default" | "focused" | "filled" | "disabled";
export interface InputStateTokens {
  bg: TokenKey;
  border: TokenKey;
  fg: TokenKey;
  placeholder: TokenKey;
}
export const inputStateTokens: Record<InputState, InputStateTokens> = {
  default: { bg: "bg-default", border: "border-default", fg: "text-strong", placeholder: "text-muted" },
  focused: { bg: "bg-default", border: "brand-primary", fg: "text-strong", placeholder: "text-muted" },
  filled: { bg: "bg-default", border: "border-default", fg: "text-strong", placeholder: "text-muted" },
  disabled: { bg: "bg-secondary", border: "border-default", fg: "text-disabled", placeholder: "text-disabled" }
};
export const inputSpec = { padY: 12, padX: 16, font: 14, radius: 8, height: 44 } as const;

/** DOM 헬퍼: 토큰 키 → CSS 변수 참조 */
export const cssVar = (key: TokenKey): string => `var(--zb-${key})`;
