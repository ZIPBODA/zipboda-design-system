import React from "react";
import {
  cx,
  MOBILE_MODAL_VARIANTS_WITH_CANCEL,
  mobileModalOverlayClass,
  mobileModalCardClass,
  mobileModalTitleClass,
  mobileModalMessageClass,
  mobileModalSuccessIconClass,
  mobileModalButtonRowClass,
  mobileModalBtnSecondaryClass,
  mobileModalBtnPrimaryClass,
  mobileModalBtnDangerClass,
  mobileSheetHandleWrapClass,
  mobileSheetHandleClass,
  mobileSheetHeaderClass,
  mobileSheetFooterClass,
  type MobileModalVariant
} from "@zipboda/ui-core";

const DEFAULT_CONFIRM_LABEL: Record<MobileModalVariant, string> = {
  confirm: "확인",
  alert: "삭제",
  info: "확인",
  success: "확인",
  form: "저장",
  bottomSheet: "확인"
};

export interface MobileModalProps {
  /** 열림 여부. false면 렌더하지 않는다(기본 true) */
  open?: boolean;
  variant?: MobileModalVariant;
  title: string;
  /** 오버레이 클릭 */
  onClose?: () => void;
  /** confirm·alert·info·success 본문 메시지(줄바꿈은 \n) */
  message?: React.ReactNode;
  /** form 입력 슬롯 · bottomSheet 목록 슬롯 */
  children?: React.ReactNode;
  /** 주 버튼 라벨(미지정 시 variant 기본값) */
  confirmLabel?: string;
  onConfirm?: () => void;
  /** 보조(취소) 버튼 라벨 — confirm·alert·form에서 노출 */
  cancelLabel?: string;
  onCancel?: () => void;
  /** 오버레이 클릭 시 닫힘(기본 true) */
  dismissOnOverlay?: boolean;
  className?: string;
}

/**
 * MobileModal — figma: MobileModal set `365:152` (디자인시스템 §14)
 * PC Modal(`281:136`)과 달리 header/divider/footer 영역·아이콘·닫기(✕)가 없는 단일 컬럼이며,
 * 주 버튼 텍스트가 흰색이다. BottomSheet는 하단 고정 시트로 목록 선택에 쓴다.
 * 상호작용 컴포넌트이므로 소비처 클라이언트 경계에서 렌더한다.
 */
export function MobileModal({
  open = true,
  variant = "confirm",
  title,
  onClose,
  message,
  children,
  confirmLabel,
  onConfirm,
  cancelLabel = "취소",
  onCancel,
  dismissOnOverlay = true,
  className
}: MobileModalProps) {
  if (!open) return null;

  const isSheet = variant === "bottomSheet";
  const hasCancel = MOBILE_MODAL_VARIANTS_WITH_CANCEL.includes(variant);
  const primaryClass = variant === "alert" ? mobileModalBtnDangerClass : mobileModalBtnPrimaryClass;
  const primaryLabel = confirmLabel ?? DEFAULT_CONFIRM_LABEL[variant];

  const buttons = (
    <>
      {hasCancel && (
        <button type="button" className={mobileModalBtnSecondaryClass} onClick={onCancel ?? onClose}>
          {cancelLabel}
        </button>
      )}
      <button type="button" className={primaryClass} onClick={onConfirm}>
        {primaryLabel}
      </button>
    </>
  );

  return (
    <div className={mobileModalOverlayClass(variant)} onClick={dismissOnOverlay ? onClose : undefined}>
      <div
        className={cx(mobileModalCardClass(variant), className)}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        {isSheet ? (
          <>
            <div className={mobileSheetHandleWrapClass}>
              <span aria-hidden className={mobileSheetHandleClass} />
            </div>
            <div className={mobileSheetHeaderClass}>
              <h2 className={mobileModalTitleClass(variant)}>{title}</h2>
            </div>
            {children}
            <div className={mobileSheetFooterClass}>{buttons}</div>
          </>
        ) : (
          <>
            {variant === "success" && (
              <span aria-hidden className={mobileModalSuccessIconClass}>
                ✓
              </span>
            )}
            <h2 className={mobileModalTitleClass(variant)}>{title}</h2>
            {variant === "form" ? children : <p className={mobileModalMessageClass}>{message}</p>}
            <div className={mobileModalButtonRowClass}>{buttons}</div>
          </>
        )}
      </div>
    </div>
  );
}
