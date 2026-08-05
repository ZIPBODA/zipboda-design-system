---
"@zipboda/tokens": patch
"@zipboda/ui-core": patch
---

MobileModal 디자인 정합 결함 2건 수정

- 시트 목록 항목(`mobileSheetItemClass`)에 디자인에 없는 `gap-3`가 들어가 라벨과 라디오 간격이 벌어지던 것을 제거
- Form 라벨이 Admin용 `compact`(13/20)를 쓰고 있어 줄높이가 4px 컸던 것을 실측값에 맞춰 `m-label`(13/16) 토큰 추가 후 교체
