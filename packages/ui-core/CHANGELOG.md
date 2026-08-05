# @zipboda/ui-core

## 1.3.0

### Minor Changes

- ba430ee: MobileModal 추가 (figma set 365:152)

  PC Modal(281:136)과 구조가 달라 반응형 분기가 아닌 별도 컴포넌트로 분리했다.

  - tokens: 타이포 `m-title/m-body/m-message/m-icon` + spacing `5.5`·`safe-b` 추가. 색은 기존 토큰(line·fg-ondark·fg-disabled·modal-success-\*)을 재사용해 신규 색 토큰 없음
  - ui-core: `MobileModalVariant` 계약 + Mobile Modal 클래스 프리셋(오버레이/카드/타이틀/메시지/버튼/폼/BottomSheet)
  - ui: `MobileModal` 컴포넌트 — Confirm/Alert/Info/Success/Form/BottomSheet 6개 variant. 닫기(✕)·구분선 없음, 주 버튼 텍스트 흰색, 버튼 전체폭 균등 분할

## 1.2.0

### Minor Changes

- 2f8d7a2: Modal 컴포넌트 추가 (figma set 281:136)

  - tokens: `modal` 아이콘/상태 색(confirm·alert·info·success) + `shadow.modal` 추가
  - ui-core: `ModalVariant` 계약 + Modal 클래스 프리셋(오버레이/카드/헤더/바디/푸터/버튼/폼)
  - ui: `Modal` 컴포넌트 — Confirm/Alert/Info/Success/Form 5개 variant, Alert는 danger 버튼, Info·Success는 취소 없음

## 1.1.0

### Minor Changes

- 924315b: feat: 공유 DOM 컴포넌트 확장 — Checkbox·SearchBar·Rating·Avatar·Divider·Card(Product/Listing)·ListItem

  디자인시스템 §12(Figma node-id 20:96/126/159/169/175/183/193/203) 기준 web·admin 공유 DOM 컴포넌트 7종을 추가한다. ui-core에 각 컴포넌트의 Tailwind 클래스 헬퍼·계약을 함께 노출한다. 값은 @zipboda/tokens preset 토큰만 사용(하드코딩 없음), 출처 node-id 주석 유지.

## 1.0.0

### Minor Changes

- 47da4a3: 초기 릴리스 — 집보다 공유 디자인시스템.

  - `@zipboda/tokens`: DTCG 토큰(앰버 · Admin · Purple · Code/Syntax) → Style Dictionary로 CSS 변수 · ES6/RN · Tailwind preset(raw, web/NativeWind 공용) 출력.
  - `@zipboda/ui-core`: 프레임워크 무관 계약(타입 · variant→토큰 맵 · Tailwind 클래스 헬퍼). web(tailwindcss)·app(NativeWind) 공유.
  - `@zipboda/ui`: React DOM 컴포넌트(Button/Badge/Chip/Tab/Input) — Tailwind 유틸 클래스 기반, 상태(hover/active/focus/disabled) 내장.
