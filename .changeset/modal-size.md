---
"@zipboda/ui-core": minor
"@zipboda/ui": minor
---

Modal `size` prop 추가 (sm 420 / md 480 / lg 640)

- 넓은 폼(프로필 수정·글쓰기 등)을 담을 수 있도록 카드 최대 폭 확장 옵션 제공. 미지정 시 variant 기본(form 480 / 그 외 420) 유지.
- 카드 `max-h-[90vh]` + body `overflow-y-auto`로 긴 내용은 스크롤(헤더·푸터 고정).
