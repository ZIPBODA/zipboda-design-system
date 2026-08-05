import React from "react";
import {
  cx,
  modalIconTokens,
  modalIconClass,
  modalOverlayClass,
  modalCardClass,
  modalHeaderClass,
  modalHeaderLeftClass,
  modalTitleClass,
  modalCloseClass,
  modalDividerClass,
  modalBodyClass,
  modalFormBodyClass,
  modalMessageClass,
  modalFooterClass,
  modalBtnSecondaryClass,
  modalBtnPrimaryClass,
  modalBtnDangerClass,
  type ModalVariant,
  type ModalIconVariant,
  type ModalSize
} from "@zipboda/ui-core";

const DEFAULT_CONFIRM_LABEL: Record<ModalVariant, string> = {
  confirm: "확인",
  alert: "삭제",
  info: "확인",
  success: "확인",
  form: "저장"
};

const VARIANTS_WITH_CANCEL: readonly ModalVariant[] = ["confirm", "alert", "form"];

export interface ModalProps {
  /** 열림 여부. false면 렌더하지 않는다(기본 true) */
  open?: boolean;
  variant?: ModalVariant;
  /** 카드 최대 폭. 미지정 시 variant 기본(form 480 / 그 외 420). 넓은 폼은 "lg" */
  size?: ModalSize;
  title: string;
  /** 닫기(✕)·오버레이 클릭 */
  onClose?: () => void;
  /** confirm·alert·info·success 본문 메시지(줄바꿈은 \n) */
  message?: React.ReactNode;
  /** form 본문 슬롯(폼 필드) */
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
 * Modal — figma: Modal set `281:136` (디자인시스템 §13)
 * variant Confirm/Alert/Info/Success/Form. Alert 주 버튼은 danger(삭제), Info·Success는 취소 없음.
 * Tailwind 유틸 클래스 기반. 소비처에서 클라이언트 경계(상호작용) 안에 렌더한다.
 */
export function Modal({
  open = true,
  variant = "confirm",
  size,
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
}: ModalProps) {
  if (!open) return null;

  const isForm = variant === "form";
  const hasCancel = VARIANTS_WITH_CANCEL.includes(variant);
  const icon = isForm ? null : modalIconTokens[variant as ModalIconVariant];
  const primaryClass = variant === "alert" ? modalBtnDangerClass : modalBtnPrimaryClass;
  const primaryLabel = confirmLabel ?? DEFAULT_CONFIRM_LABEL[variant];

  return (
    <div className={modalOverlayClass} onClick={dismissOnOverlay ? onClose : undefined}>
      <div
        className={cx(modalCardClass(variant, size), className)}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={modalHeaderClass}>
          <div className={modalHeaderLeftClass}>
            {icon && (
              <span aria-hidden className={modalIconClass[variant as ModalIconVariant]}>
                {icon.glyph}
              </span>
            )}
            <h2 className={modalTitleClass}>{title}</h2>
          </div>
          <button type="button" aria-label="닫기" className={modalCloseClass} onClick={onClose}>
            ✕
          </button>
        </header>

        <div className={modalDividerClass} role="separator" />

        <div className={isForm ? modalFormBodyClass : modalBodyClass}>
          {isForm ? children : <p className={modalMessageClass}>{message}</p>}
        </div>

        <footer className={modalFooterClass}>
          {hasCancel && (
            <button type="button" className={modalBtnSecondaryClass} onClick={onCancel ?? onClose}>
              {cancelLabel}
            </button>
          )}
          <button type="button" className={primaryClass} onClick={onConfirm}>
            {primaryLabel}
          </button>
        </footer>
      </div>
    </div>
  );
}
