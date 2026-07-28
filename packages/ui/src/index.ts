export { Button } from "./Button.js";
export type { ButtonProps } from "./Button.js";
export { Badge } from "./Badge.js";
export type { BadgeProps } from "./Badge.js";
export { Chip } from "./Chip.js";
export type { ChipProps } from "./Chip.js";
export { Tab } from "./Tab.js";
export type { TabProps } from "./Tab.js";
export { Input } from "./Input.js";
export type { InputProps } from "./Input.js";

// 계약 타입/variant 맵 재노출(소비처에서 @zipboda/ui-core 직접 의존 없이 사용 가능)
export type {
  ButtonVariant,
  ButtonSize,
  BadgeVariant,
  ChipVariant
} from "@zipboda/ui-core";
