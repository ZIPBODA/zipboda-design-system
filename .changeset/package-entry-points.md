---
"@zipboda/tokens": patch
"@zipboda/ui-core": patch
"@zipboda/ui": patch
---

패키지 진입점에 `main`과 exports의 `default` 조건 추가

- exports에 `import` 조건만 있어, `import` 조건을 쓰지 않는 도구가 패키지를 찾지 못했다 — Jest(CommonJS 해석)와 Expo SDK 51의 Metro(exports를 읽지 않고 `main`을 본다)
- 진입 파일은 그대로(ESM)이고, 기존 `import` 해석(web·admin의 Next.js 등)은 바뀌지 않는다
- 진입 파일이 ESM이라 Jest에서는 `transformIgnorePatterns`에 `@zipboda`를 넣어 변환해야 한다(빠지면 'Cannot find module' 대신 'Unexpected token export'가 난다)
