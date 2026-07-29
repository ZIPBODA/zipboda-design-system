import React from "react";
import { RATING_MAX, ratingRootClass, ratingStarOnClass, ratingStarOffClass, cx } from "@zipboda/ui-core";

export interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
}

/** Rating/Stars — figma `20:159` (star `20:153`, 디자인시스템 §12) */
export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(function Rating(
  { value = 0, max = RATING_MAX, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cx(ratingRootClass, className)}
      role="img"
      aria-label={`${value} / ${max}`}
      {...rest}
    >
      {Array.from({ length: max }, (_, i) => (
        <svg
          key={i}
          className={i < value ? ratingStarOnClass : ratingStarOffClass}
          width={12}
          height={12}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2l2.9 6.26L21.5 9l-4.75 4.64L17.9 20 12 16.77 6.1 20l1.15-6.36L2.5 9l6.6-.74z" />
        </svg>
      ))}
    </div>
  );
});
