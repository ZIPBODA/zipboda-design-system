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

/* Checkbox (figma 20:96) — box 24×24 r4, unchecked border 1.5 #D1D5DC, checked bg brand ✓흰색 */
export interface CheckboxContract {
  checked?: boolean;
  disabled?: boolean;
}
export const checkboxRootClass = "inline-flex cursor-pointer select-none items-center gap-2";
export const checkboxBoxClass =
  "peer size-6 shrink-0 appearance-none rounded-sm border-[1.5px] border-line-strong bg-surface transition-colors " +
  "checked:border-brand checked:bg-brand disabled:cursor-not-allowed disabled:border-line disabled:bg-surface-tertiary disabled:opacity-50";
export const checkboxMarkClass =
  "pointer-events-none absolute inset-0 hidden items-center justify-center text-fg-ondark peer-checked:flex";
export const checkboxLabelClass = "text-compact text-gray-700";

/* SearchBar (figma 20:126) — r12, pad 10/16, bg #F3F4F6, icon 18 #99A1AF */
export const searchBarRootClass = "inline-flex items-center gap-2 rounded-lg bg-surface-tertiary px-4 py-2.5";
export const searchBarIconClass = "shrink-0 text-fg-disabled";
export const searchBarInputClass =
  "w-full bg-transparent text-sm text-fg-strong outline-none placeholder:text-fg-disabled";

/* Rating (figma 20:159, star 20:153) — 별 5개 gap 2, 채움 #FFBA17. 빈 별 색은 디자인 미정의 → 중립 gray */
export const RATING_MAX = 5;
export const ratingRootClass = "inline-flex items-center gap-0.5";
export const ratingStarOnClass = "text-brand";
export const ratingStarOffClass = "text-line-strong";

/* Avatar (figma 20:169) — 40 원형, bg #F3F4F6, 이니셜 #6A7282 700/14 */
export const avatarClass =
  "inline-flex size-10 items-center justify-center overflow-hidden rounded-full bg-surface-tertiary text-sm font-bold text-fg-muted";

/* Divider (figma 20:175) — 1px #F3F4F6 */
export type DividerOrientation = "horizontal" | "vertical";
export const dividerClass: Record<DividerOrientation, string> = {
  horizontal: "h-px w-full border-0 bg-line-subtle",
  vertical: "w-px self-stretch bg-line-subtle"
};

/* Card/Product (figma 20:183 / 26:50) — w160 gap8, img fill·h120·r12, info gap4·px4 */
export const cardProductRootClass = "flex w-40 flex-col gap-2";
export const cardProductImageClass = "h-[120px] w-full overflow-hidden rounded-lg bg-surface-tertiary";
export const cardProductInfoClass = "flex flex-col gap-1 px-1";
export const cardProductBrandClass = "text-caption font-medium text-fg-disabled";
export const cardProductNameClass = "truncate text-xs font-semibold text-fg-strong";
export const cardProductPriceClass = "text-sm font-bold text-fg-heading";

/* Card/Listing (figma 20:193 / 26:56) — w320 r16 bg#FFF border#F3F4F6, Header p16, Body p0/16/16 gap16 */
export const cardListingRootClass = "flex w-80 flex-col rounded-xl border border-line-subtle bg-surface";
export const cardListingHeaderClass = "flex items-center gap-2 p-4";
export const cardListingTitleClass = "text-sm font-bold text-fg-strong";
export const cardListingBodyClass = "flex items-center gap-4 px-4 pb-4";
export const cardListingLocationClass = "text-xs font-normal text-fg-muted";
export const cardListingDdayClass = "text-xs font-semibold text-status-error";

/* ListItem (figma 20:203) — pad 12/16 gap8, 라벨 400/14 #1A1A1A, 값 500/14 #6A7282 */
export const listItemRootClass = "flex w-full items-center gap-2 px-4 py-3";
export const listItemLabelClass = "text-sm font-normal text-fg-strong";
export const listItemValueClass = "ml-auto text-sm font-medium text-fg-muted";

/* ── Modal ── (figma set 281:136 / 디자인시스템 §13)
 * variant: confirm(?)·alert(!)·info(i)·success(✓)·form(아이콘 없음).
 * 카드 w420(form 480)·r16·shadow-modal, header(아이콘28 원형)·divider·body·footer(bg secondary).
 * 오버레이 50% black. 푸터 버튼은 Button(lg/sm)과 다른 전용 스펙(pad 10/20·r8·14/500). */
export type ModalVariant = "confirm" | "alert" | "info" | "success" | "form";
export type ModalIconVariant = Exclude<ModalVariant, "form">;

export interface ModalIconTokens {
  /** 아이콘 배경 토큰 키 */
  bg: TokenKey;
  /** 아이콘 글리프 색 토큰 키 */
  fg: TokenKey;
  /** 글리프 문자 */
  glyph: string;
}
export const modalIconTokens: Record<ModalIconVariant, ModalIconTokens> = {
  confirm: { bg: "modal-confirm-icon-bg", fg: "modal-confirm-icon", glyph: "?" },
  alert:   { bg: "modal-alert-icon-bg",   fg: "modal-alert-icon",   glyph: "!" },
  info:    { bg: "modal-info-icon-bg",    fg: "modal-info-icon",    glyph: "i" },
  success: { bg: "modal-success-icon-bg", fg: "modal-success-icon", glyph: "✓" }
};

export const modalOverlayClass = "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4";
export const modalCardClass = (variant: ModalVariant = "confirm"): string =>
  cx("flex w-full flex-col rounded-xl bg-surface shadow-modal", variant === "form" ? "max-w-[480px]" : "max-w-[420px]");
export const modalHeaderClass = "flex items-center justify-between gap-2 self-stretch px-6 pb-4 pt-5";
export const modalHeaderLeftClass = "flex flex-1 items-center gap-2.5";
export const modalIconClass: Record<ModalIconVariant, string> = {
  confirm: "flex size-7 shrink-0 items-center justify-center rounded-full bg-modal-confirm-icon-bg text-sm font-bold text-modal-confirm-icon",
  alert:   "flex size-7 shrink-0 items-center justify-center rounded-full bg-modal-alert-icon-bg text-sm font-bold text-modal-alert-icon",
  info:    "flex size-7 shrink-0 items-center justify-center rounded-full bg-modal-info-icon-bg text-sm font-bold text-modal-info-icon",
  success: "flex size-7 shrink-0 items-center justify-center rounded-full bg-modal-success-icon-bg text-sm font-bold text-modal-success-icon"
};
export const modalTitleClass = "text-base font-semibold text-fg-heading";
export const modalCloseClass = "inline-flex h-8 items-center justify-center rounded-md px-1 text-base text-fg-disabled transition-colors hover:bg-surface-secondary";
export const modalDividerClass = "h-px w-full bg-line";
export const modalBodyClass = "flex flex-col gap-3 self-stretch px-6 py-5";
export const modalFormBodyClass = "flex flex-col gap-4 self-stretch px-6 py-5";
export const modalMessageClass = "whitespace-pre-line text-sm leading-relaxed text-fg-body";
export const modalFooterClass = "flex items-center justify-end gap-2 self-stretch rounded-b-xl bg-surface-secondary px-6 pb-5 pt-4";

export const modalBtnBaseClass = "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-colors";
export const modalBtnSecondaryClass = cx(modalBtnBaseClass, "border border-line bg-surface text-gray-700 hover:bg-surface-secondary");
export const modalBtnPrimaryClass = cx(modalBtnBaseClass, "bg-brand text-fg-heading hover:bg-brand-hover");
export const modalBtnDangerClass = cx(modalBtnBaseClass, "bg-modal-alert-icon text-fg-ondark hover:opacity-90");

export const modalFormGroupClass = "flex flex-col gap-1.5 self-stretch";
export const modalFormLabelClass = "text-compact font-medium text-gray-700";
export const modalFormInputClass =
  "w-full rounded-md border border-line bg-surface px-3.5 py-2.5 text-sm text-fg-strong outline-none transition-colors placeholder:text-fg-disabled focus:border-brand";

/* ── Mobile Modal ── (figma set 365:152 / 디자인시스템 §14)
 * PC Modal(281:136)과 구조가 다르다: header/divider/footer 영역·아이콘·닫기(✕)가 없고
 * 단일 컬럼(타이틀·메시지·버튼행)이다. 주 버튼 텍스트도 흰색(PC는 fg-heading).
 * BottomSheet는 화면 하단 고정 시트로 목록 선택에 쓴다.
 */
export type MobileModalVariant = "confirm" | "alert" | "info" | "success" | "form" | "bottomSheet";

/** 취소 버튼이 함께 노출되는 variant */
export const MOBILE_MODAL_VARIANTS_WITH_CANCEL: readonly MobileModalVariant[] = ["confirm", "alert", "form"];
/** 타이틀을 좌측 정렬하는 variant (그 외는 가운데) */
export const MOBILE_MODAL_VARIANTS_TITLE_LEFT: readonly MobileModalVariant[] = ["form", "bottomSheet"];

export const mobileModalOverlayClass = (variant: MobileModalVariant = "confirm"): string =>
  cx(
    "fixed inset-0 z-50 flex bg-black/50",
    variant === "bottomSheet" ? "items-end justify-center" : "items-center justify-center p-4"
  );

/** 카드 — 일반 variant는 w320 카드, BottomSheet는 전체폭 시트(상단만 radius 20) */
export const mobileModalCardClass = (variant: MobileModalVariant = "confirm"): string =>
  variant === "bottomSheet"
    ? "flex w-full max-w-[375px] flex-col rounded-t-2xl bg-surface"
    : cx(
        "flex w-full max-w-[320px] flex-col rounded-xl bg-surface px-6 pb-6",
        variant === "success" ? "items-center pt-8" : "items-stretch pt-7",
        variant === "confirm" || variant === "alert" ? "gap-5" : "gap-4"
      );

export const mobileModalTitleClass = (variant: MobileModalVariant = "confirm"): string =>
  cx(
    "w-full text-m-title font-bold text-fg-heading",
    MOBILE_MODAL_VARIANTS_TITLE_LEFT.includes(variant) ? "text-left" : "text-center"
  );

export const mobileModalMessageClass = "w-full whitespace-pre-line text-center text-m-message text-fg-body";

/** Success 아이콘 48 원형 — PC(28·§13)와 색·크기가 다르다 */
export const mobileModalSuccessIconClass =
  "flex size-12 shrink-0 items-center justify-center rounded-full bg-modal-mobile-success-icon-bg text-m-icon font-bold text-modal-mobile-success-icon";

export const mobileModalButtonRowClass = "flex w-full items-stretch gap-3";

export const mobileModalBtnBaseClass =
  "inline-flex flex-1 items-center justify-center rounded-md px-5 py-3.5 text-m-body font-semibold transition-colors";
export const mobileModalBtnSecondaryClass = cx(
  mobileModalBtnBaseClass,
  "border border-modal-mobile-border bg-surface text-fg-body hover:bg-surface-secondary"
);
export const mobileModalBtnPrimaryClass = cx(
  mobileModalBtnBaseClass,
  "bg-brand text-modal-mobile-on-primary hover:bg-brand-hover"
);
export const mobileModalBtnDangerClass = cx(
  mobileModalBtnBaseClass,
  "bg-modal-alert-icon text-modal-mobile-on-primary hover:opacity-90"
);

/* Form(365:124) — 라벨 13/500, 입력 bg secondary */
export const mobileModalFormGroupClass = "flex w-full flex-col gap-2";
export const mobileModalFormLabelClass = "text-compact font-medium text-fg-heading";
export const mobileModalFormInputClass =
  "w-full rounded-md border border-modal-mobile-border bg-surface-secondary px-3.5 py-3 text-sm text-fg-heading outline-none transition-colors placeholder:text-modal-mobile-placeholder focus:border-brand";

/* BottomSheet(365:135) — 핸들·헤더·목록·푸터 */
export const mobileSheetHandleWrapClass = "flex w-full flex-col items-center pb-2 pt-3";
export const mobileSheetHandleClass = "h-1 w-10 rounded-xs bg-modal-mobile-border";
export const mobileSheetHeaderClass = "flex w-full items-center px-6 pb-3 pt-2";
export const mobileSheetItemClass = "flex w-full items-center gap-3 px-6 py-4";
export const mobileSheetItemLabelClass = "flex-1 text-m-body text-fg-heading";
export const mobileSheetRadioClass = (selected = false): string =>
  cx(
    "size-5.5 shrink-0 rounded-full border-2",
    selected ? "border-brand bg-brand" : "border-modal-mobile-border"
  );
export const mobileSheetFooterClass = "flex w-full items-stretch px-6 pb-safe-b pt-3";
