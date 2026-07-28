/**
 * @zipboda/tokens/tailwind — Tailwind preset
 * 토큰(CSS 변수)을 Tailwind theme.extend 에 매핑한다.
 * 값은 `var(--zb-*)` 참조이므로 소비처는 `import "@zipboda/tokens/css"` 로 변수를 주입해야 한다.
 * (web=tailwindcss, app=NativeWind 에서 동일 preset 재사용 가능)
 */
const v = (name) => `var(--zb-${name})`;

module.exports = {
  theme: {
    extend: {
      colors: {
        // semantic
        brand: {
          DEFAULT: v("brand-primary"),
          hover: v("brand-primary-hover"),
          active: v("brand-primary-active"),
          dark: v("brand-primary-dark"),
          on: v("brand-on-primary")
        },
        fg: {
          heading: v("text-heading"),
          strong: v("text-strong"),
          body: v("text-body"),
          muted: v("text-muted"),
          disabled: v("text-disabled"),
          ondark: v("text-on-dark")
        },
        surface: {
          DEFAULT: v("bg-default"),
          secondary: v("bg-secondary"),
          tertiary: v("bg-tertiary"),
          warm: v("bg-warm"),
          dark: v("bg-dark")
        },
        line: {
          subtle: v("border-subtle"),
          DEFAULT: v("border-default"),
          strong: v("border-strong")
        },
        status: {
          info: v("status-info"),
          "info-bg": v("status-info-bg"),
          success: v("status-success"),
          "success-bg": v("status-success-bg"),
          "success-text": v("status-success-text"),
          warning: v("status-warning"),
          "warning-bg": v("status-warning-bg"),
          error: v("status-error"),
          "error-bg": v("status-error-bg")
        },
        // raw scales (엣지 셰이드용: hover/active 등)
        amber: { 50: v("color-amber-50"), 100: v("color-amber-100"), 200: v("color-amber-200"), 400: v("color-amber-400"), 500: v("color-amber-500"), 600: v("color-amber-600"), 700: v("color-amber-700") },
        gray: { 50: v("color-gray-50"), 100: v("color-gray-100"), 200: v("color-gray-200"), 300: v("color-gray-300"), 400: v("color-gray-400"), 500: v("color-gray-500"), 600: v("color-gray-600"), 700: v("color-gray-700"), 800: v("color-gray-800"), 850: v("color-gray-850"), 900: v("color-gray-900"), 950: v("color-gray-950") },
        blue: { 50: v("color-blue-50"), 100: v("color-blue-100"), 500: v("color-blue-500"), 600: v("color-blue-600") },
        green: { 50: v("color-green-50"), 500: v("color-green-500"), 700: v("color-green-700") },
        red: { 50: v("color-red-50"), 500: v("color-red-500") },
        orange: { 50: v("color-orange-50"), 500: v("color-orange-500") },
        // admin (별도 팔레트)
        admin: {
          surface: v("admin-surface"),
          "text-strong": v("admin-text-strong"),
          "text-muted": v("admin-text-muted"),
          "text-disabled": v("admin-text-disabled"),
          border: v("admin-border"),
          "row-hover": v("admin-row-hover"),
          "row-selected": v("admin-row-selected"),
          "sidebar-bg": v("admin-sidebar-bg"),
          "sidebar-hover": v("admin-sidebar-hover"),
          "sidebar-active": v("admin-sidebar-active")
        },
        "admin-status": {
          info: v("admin-status-info"),
          "info-bg": v("admin-status-info-bg"),
          success: v("admin-status-success"),
          "success-bg": v("admin-status-success-bg"),
          error: v("admin-status-error"),
          "error-bg": v("admin-status-error-bg"),
          "warning-bg": v("admin-status-warning-bg")
        },
        chart: { 1: v("chart-1"), 2: v("chart-2"), 3: v("chart-3"), 4: v("chart-4") }
      },
      borderRadius: {
        xs: v("radius-xs"),
        sm: v("radius-sm"),
        md: v("radius-md"),
        lg: v("radius-lg"),
        xl: v("radius-xl"),
        "2xl": v("radius-2xl"),
        "3xl": v("radius-3xl"),
        full: v("radius-full"),
        6: v("radius-6"),
        10: v("radius-10"),
        18: v("radius-18")
      },
      fontFamily: {
        sans: ["Pretendard", "-apple-system", "BlinkMacSystemFont", "system-ui", "Roboto", "sans-serif"]
      },
      boxShadow: {
        sm: "0 1px 4px 0 rgba(0,0,0,0.06)",
        md: "0 4px 8px 0 rgba(0,0,0,0.10)",
        lg: "0 8px 16px -2px rgba(0,0,0,0.12)",
        xl: "0 12px 24px -4px rgba(0,0,0,0.15)"
      }
    }
  }
};
