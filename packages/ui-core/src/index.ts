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

/** DOM 헬퍼: 토큰 키 → CSS 변수 참조 (인라인 스타일/StyleSheet 대비) */
export const cssVar = (key: TokenKey): string => `var(--zb-${key})`;

/* ══════════════════════════════════════════════════════════════
 * Tailwind class presets — @zipboda/tokens/tailwind preset과 짝.
 * web(tailwindcss)·app(NativeWind)이 동일 클래스 문자열을 공유한다.
 * 색 이름은 preset의 theme.extend.colors 키(brand/fg/surface/line/status/gray…)와 일치.
 * ══════════════════════════════════════════════════════════════ */
export const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(" ");

/* Button */
export const buttonBaseClass =
  "inline-flex items-center justify-center gap-2 font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-40";
export const buttonSizeClass: Record<ButtonSize, string> = {
  lg: "text-sm px-8 py-3.5 rounded-xl",
  sm: "text-xs px-4 py-2 rounded-lg"
};
export const buttonVariantClass: Record<ButtonVariant, string> = {
  primary: "bg-brand text-brand-on hover:bg-brand-hover active:bg-brand-active",
  secondary: "bg-surface-tertiary text-fg-strong hover:bg-gray-200 active:bg-gray-300",
  outline: "bg-transparent text-brand border border-brand hover:bg-amber-50 active:bg-amber-100",
  ghost: "bg-transparent text-fg-body hover:bg-surface-secondary hover:text-fg-strong active:bg-surface-tertiary",
  dark: "bg-fg-strong text-fg-ondark hover:bg-gray-700 active:bg-gray-600"
};
export const buttonClasses = (o: ButtonContract = {}): string =>
  cx(buttonBaseClass, buttonSizeClass[o.size ?? "lg"], buttonVariantClass[o.variant ?? "primary"], o.fullWidth ? "w-full" : undefined);

/* Badge */
export const badgeBaseClass = "inline-flex items-center rounded-md px-2 py-1 text-[10px] font-bold leading-none";
export const badgeVariantClass: Record<BadgeVariant, string> = {
  primary: "bg-brand text-brand-on",
  error: "bg-status-error text-fg-ondark",
  success: "bg-status-success text-fg-ondark",
  info: "bg-status-info text-fg-ondark",
  neutral: "bg-surface-tertiary text-fg-muted",
  dark: "bg-fg-strong text-fg-ondark"
};
export const badgeClasses = (variant: BadgeVariant = "neutral"): string =>
  cx(badgeBaseClass, badgeVariantClass[variant]);

/* Chip */
export const chipBaseClass = "inline-flex items-center rounded-full px-3 py-1.5 text-[10px]";
export const chipVariantClass: Record<ChipVariant, string> = {
  active: "bg-brand text-brand-on font-bold",
  default: "bg-surface-tertiary text-fg-muted font-semibold",
  darkActive: "bg-fg-strong text-fg-ondark font-bold",
  outline: "bg-transparent text-fg-body border border-line font-medium"
};
export const chipClasses = (variant: ChipVariant = "default"): string =>
  cx(chipBaseClass, chipVariantClass[variant]);

/* Tab */
export const tabBaseClass = "inline-flex items-center justify-center px-4 py-2.5 text-sm border-b-2 transition-colors";
export const tabClasses = (active = false): string =>
  cx(tabBaseClass, active ? "text-fg-strong font-bold border-brand" : "text-fg-muted font-medium border-transparent");

/* Input */
export const inputBaseClass =
  "box-border h-11 w-full rounded-md border px-4 py-3 text-sm outline-none transition-colors placeholder:text-fg-muted";
export const inputClasses = (disabled = false): string =>
  cx(
    inputBaseClass,
    disabled
      ? "bg-surface-secondary border-line text-fg-disabled cursor-not-allowed"
      : "bg-surface border-line text-fg-strong focus:border-brand"
  );
