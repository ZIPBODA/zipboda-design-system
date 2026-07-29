# @zipboda/ui-core

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
