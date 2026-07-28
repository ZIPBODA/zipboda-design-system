import React from "react";
import { tabStateTokens, tabSpec, cssVar } from "@zipboda/ui-core";

export interface TabProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  active?: boolean;
  style?: React.CSSProperties;
}

/** Tab — figma `20:90` (set `20:91`, 디자인시스템 §12) */
export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { active = false, children, style, ...rest },
  ref
) {
  const t = active ? tabStateTokens.active : tabStateTokens.default;
  const css: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Pretendard, -apple-system, sans-serif",
    fontWeight: t.weight,
    fontSize: tabSpec.font,
    lineHeight: 1.43,
    padding: `${tabSpec.padY}px ${tabSpec.padX}px`,
    color: cssVar(t.fg),
    background: "transparent",
    border: "none",
    borderBottom: t.underline ? `2px solid ${cssVar(t.underline)}` : "2px solid transparent",
    cursor: "pointer",
    ...style
  };
  return (
    <button ref={ref} type="button" role="tab" aria-selected={active} style={css} {...rest}>
      {children}
    </button>
  );
});
