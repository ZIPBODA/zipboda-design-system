import React from "react";
import { inputStateTokens, inputSpec, cssVar } from "@zipboda/ui-core";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "style"> {
  style?: React.CSSProperties;
}

/** Input/Text — figma `20:113` (set `20:117`, 디자인시스템 §12)
 *  포커스 시 border를 brand-primary로 전환(focused 상태). disabled는 별도 스타일. */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { disabled, style, onFocus, onBlur, ...rest },
  ref
) {
  const [focused, setFocused] = React.useState(false);
  const state = disabled ? "disabled" : focused ? "focused" : "default";
  const t = inputStateTokens[state];
  const css: React.CSSProperties = {
    boxSizing: "border-box",
    height: inputSpec.height,
    width: "100%",
    fontFamily: "Pretendard, -apple-system, sans-serif",
    fontSize: inputSpec.font,
    lineHeight: 1.43,
    padding: `${inputSpec.padY}px ${inputSpec.padX}px`,
    borderRadius: inputSpec.radius,
    color: cssVar(t.fg),
    background: cssVar(t.bg),
    border: `1px solid ${cssVar(t.border)}`,
    outline: "none",
    ...style
  };
  return (
    <input
      ref={ref}
      disabled={disabled}
      style={css}
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur?.(e);
      }}
      {...rest}
    />
  );
});
