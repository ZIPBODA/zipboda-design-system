---
"@zipboda/tokens": minor
"@zipboda/ui-core": minor
"@zipboda/ui": minor
---

MobileModal 추가 (figma set 365:152)

PC Modal(281:136)과 구조가 달라 반응형 분기가 아닌 별도 컴포넌트로 분리했다.

- tokens: `modalMobile.*`(border·onPrimary·placeholder·success 아이콘) + 타이포 `m-title/m-body/m-message/m-icon` + spacing `5.5`·`safe-b` 추가
- ui-core: `MobileModalVariant` 계약 + Mobile Modal 클래스 프리셋(오버레이/카드/타이틀/메시지/버튼/폼/BottomSheet)
- ui: `MobileModal` 컴포넌트 — Confirm/Alert/Info/Success/Form/BottomSheet 6개 variant. 닫기(✕)·구분선 없음, 주 버튼 텍스트 흰색, 버튼 전체폭 균등 분할
