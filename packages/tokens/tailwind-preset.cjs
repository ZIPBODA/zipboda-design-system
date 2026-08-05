/**
 * @zipboda/tokens/tailwind — Tailwind preset (raw 값)
 * web(tailwindcss)·app(NativeWind) 공용. 값은 토큰 실측 raw 값이라 CSS 변수 주입이 필요 없다.
 *  - NativeWind는 CSS 파일을 로드할 수 없으므로 var(--zb-*) 대신 raw 값을 사용해 통일.
 *  - 값의 정본은 packages/tokens/src/*.tokens.json (변경 시 이 파일도 동기화). CSS 변수가 필요하면 `@zipboda/tokens/css` 별도 사용.
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        // semantic
        brand: { DEFAULT: "#FFBA17", hover: "#E5A714", active: "#CC9412", dark: "#92600A", on: "#1A1A1A" },
        fg: { heading: "#101828", strong: "#1A1A1A", body: "#4A5565", muted: "#6A7282", disabled: "#99A1AF", ondark: "#FFFFFF" },
        surface: { DEFAULT: "#FFFFFF", secondary: "#F9FAFB", tertiary: "#F3F4F6", warm: "#FAFAF8", dark: "#111111" },
        line: { subtle: "#F3F4F6", DEFAULT: "#E5E7EB", strong: "#D1D5DC" },
        status: {
          info: "#2B7FFF", "info-bg": "#EFF6FF",
          success: "#00BC7D", "success-bg": "#ECFDF5", "success-text": "#065F46",
          warning: "#F59E0B", "warning-bg": "#FEF8ED",
          error: "#FF6467", "error-bg": "#FFF3F0"
        },
        // raw scales (hover/active 등 엣지 셰이드)
        amber: { 50: "#FFFBF0", 100: "#FFF8E7", 200: "#FFF3C4", 400: "#FFBA17", 500: "#E5A714", 600: "#CC9412", 700: "#92600A" },
        gray: { 50: "#F9FAFB", 100: "#F3F4F6", 200: "#E5E7EB", 300: "#D1D5DC", 400: "#99A1AF", 500: "#6A7282", 600: "#4A5565", 700: "#364153", 800: "#1E2939", 850: "#1A1A1A", 900: "#101828", 950: "#111111" },
        blue: { 50: "#EFF6FF", 100: "#EDF5FF", 500: "#2B7FFF", 600: "#155DFC" },
        green: { 50: "#ECFDF5", 500: "#00BC7D", 700: "#065F46" },
        red: { 50: "#FFF3F0", 500: "#FF6467" },
        orange: { 50: "#FEF8ED", 500: "#F59E0B" },
        // admin (별도 팔레트)
        admin: {
          surface: "#F4F6F8", "text-strong": "#111827", "text-muted": "#6B7280", "text-disabled": "#9CA3AF",
          border: "#E5E7EB", "row-hover": "#F9FAFB", "row-selected": "#EFF6FF",
          "sidebar-bg": "#000000", "sidebar-hover": "#222222", "sidebar-active": "#2A2A2A"
        },
        "admin-status": {
          info: "#3B82F6", "info-bg": "#DBEAFE",
          success: "#10B981", "success-bg": "#D1FAE5",
          error: "#EF4444", "error-bg": "#FEE2E2",
          "warning-bg": "#FEF3C7"
        },
        chart: { 1: "#3B82F6", 2: "#10B981", 3: "#F59E0B", 4: "#EF4444" },
        // Modal 아이콘/상태 (set 281:136 — Confirm/Alert/Info/Success)
        modal: {
          "confirm-icon-bg": "#FFF8E7", "confirm-icon": "#CC8C00",
          "alert-icon-bg": "#FEE2E2", "alert-icon": "#EF4444",
          "info-icon-bg": "#EFF6FF", "info-icon": "#3373D9",
          "success-icon-bg": "#ECFDF5", "success-icon": "#00BC7D"
        },
        // 보라 배지
        purple: { DEFAULT: "#8B5CF6", bg: "#F5F3FF", light: "#F3E8FF" },
        // 코드 블록 / diff
        code: {
          bg: "#1E1E1E", text: "#888888",
          "deleted-label": "#FF6B6B", deleted: "#E06C75",
          "added-label": "#51CF66", added: "#98C379"
        }
      },
      borderRadius: {
        xs: "2px", sm: "4px", md: "8px", lg: "12px", xl: "16px", "2xl": "20px", "3xl": "24px", full: "9999px",
        3: "3px", 6: "6px", 10: "10px", 18: "18px"
      },
      fontFamily: {
        sans: ["Pretendard", "-apple-system", "BlinkMacSystemFont", "system-ui", "Roboto", "sans-serif"]
      },
      fontSize: {
        // 디자인시스템 §4 타이포 스케일(px). line-height 동반.
        caption: ["10px", "15px"],
        xs: ["12px", "16px"],
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["18px", "28px"],
        h2: ["20px", "28px"],
        h1: ["24px", "32px"],
        "display-sm": ["30px", "38px"],
        "display-md": ["36px", "44px"],
        "display-lg": ["48px", "56px"],
        // Admin 밀집형
        compact: ["13px", "20px"],
        "2xsmall": ["11px", "16px"],
        // Mobile Modal(set 365:152) 전용 — 기존 스케일에 없는 크기·행간
        "m-title": ["17px", "21px"],
        "m-body": ["15px", "18px"],
        "m-message": ["14px", "22px"],
        "m-icon": ["22px", "27px"]
      },
      spacing: {
        "5.5": "22px",
        // iOS 홈 인디케이터 여백 — BottomSheet 푸터 하단(365:149)
        "safe-b": "34px"
      },
      boxShadow: {
        sm: "0 1px 4px 0 rgba(0,0,0,0.06)",
        md: "0 4px 8px 0 rgba(0,0,0,0.10)",
        lg: "0 8px 16px -2px rgba(0,0,0,0.12)",
        xl: "0 12px 24px -4px rgba(0,0,0,0.15)",
        modal: "0 8px 32px -4px rgba(0,0,0,0.15)"
      }
    }
  }
};
