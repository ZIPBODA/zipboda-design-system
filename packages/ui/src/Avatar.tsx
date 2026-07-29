import React from "react";
import { avatarClass, cx } from "@zipboda/ui-core";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  initials?: string;
}

/** Avatar — figma `20:169` (40×40 원형, 디자인시스템 §12) */
export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, alt = "", initials, className, ...rest },
  ref
) {
  return (
    <span ref={ref} className={cx(avatarClass, className)} {...rest}>
      {src ? <img src={src} alt={alt} className="h-full w-full object-cover" /> : initials}
    </span>
  );
});
