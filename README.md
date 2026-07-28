# zipboda-design-system

집보다(Zipboda) 공유 디자인시스템 패키지 모노레포. **폴리레포(web/app/admin) 소비**를 위해 GitHub Packages(사설, `@zipboda` scope)로 배포한다.

## 패키지

| 패키지 | 내용 | 소비처 |
|--------|------|--------|
| `@zipboda/tokens` | DTCG 토큰(앰버 `#FFBA17` 시스템) → Style Dictionary 빌드: CSS 변수 / ES6·TS / RN | web · admin · **app** |
| `@zipboda/ui-core` | 프레임워크 무관 계약(타입·variant→token 맵) | web · admin · **app** |
| `@zipboda/ui` | React **DOM** 컴포넌트(Button/Badge …) | web · admin |

> app(React Native)은 `@zipboda/ui`(DOM)를 쓰지 않고, `@zipboda/ui-core` 계약 + `@zipboda/tokens`(rn)로 `src/shared/ui`에 RN 컴포넌트를 자체 구현한다.

## 토큰 소스 · 파이프라인
- 정본: `ZIPBODA_디자인시스템.md`(앰버). 소스 파일 `packages/tokens/src/*.tokens.json`(DTCG).
- Figma 변경 → DTCG 재export(또는 값 갱신) → `pnpm --filter @zipboda/tokens build` → 릴리스.

## 로컬 개발
```bash
corepack enable
pnpm install
pnpm build           # tokens → ui-core → ui (topological)
```
빌드 산출물: `packages/tokens/build/{css,js}`, `packages/ui-core/dist`, `packages/ui/dist`.

## 배포 (GitHub Packages)
- `.env`(또는 CI 시크릿)에 `NODE_AUTH_TOKEN`(PAT, write:packages) 설정.
- Changesets로 버전 관리: `pnpm changeset` → PR 머지 시 GitHub Actions(`.github/workflows/release.yml`)가 배포.

## 소비 repo 설정 (web / admin / app)
각 저장소 루트 `.npmrc`:
```
@zipboda:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```
설치:
```bash
# web / admin (React DOM + Tailwind)
pnpm add @zipboda/tokens @zipboda/ui
# app (React Native / NativeWind)
pnpm add @zipboda/tokens @zipboda/ui-core
```

Tailwind 설정 (web/admin) — `tailwind.config.{js,ts}`:
```js
import preset from "@zipboda/tokens/tailwind";
export default {
  presets: [preset],
  content: [
    "./src/**/*.{ts,tsx}",
    // 컴포넌트의 클래스 문자열을 스캔하도록 패키지 dist 포함(필수)
    "./node_modules/@zipboda/ui/dist/**/*.{js,mjs}",
    "./node_modules/@zipboda/ui-core/dist/**/*.{js,mjs}"
  ]
};
```

전역 CSS(1회) — CSS 변수 주입 + Tailwind:
```css
@import "@zipboda/tokens/css";   /* :root 의 --zb-* 변수(preset이 참조) */
@tailwind base; @tailwind components; @tailwind utilities;
```

사용:
```tsx
import { Button, Badge, Chip, Tab, Input } from "@zipboda/ui";
<Button variant="primary" size="lg">지금 신청하기</Button>   {/* hover/active/disabled 상태 내장 */}
```

app(RN/NativeWind): 동일 `@zipboda/tokens/tailwind` preset을 NativeWind에 적용하고, `@zipboda/ui-core`의 클래스 헬퍼(`buttonClasses()` 등)를 `className`으로 사용하거나 토큰(rn)으로 StyleSheet를 구성한다.

- Next.js: `transpilePackages: ["@zipboda/ui","@zipboda/ui-core"]`
- Vite: `optimizeDeps.include: ["@zipboda/ui","@zipboda/ui-core"]`

## FSD 결선
- `shared/config`가 `@zipboda/tokens` re-export, `shared/ui`가 `@zipboda/ui`(web·admin) 재노출/조합. 인라인 재구현 금지(frontend-rule R10/D4). 출처 node-id 주석 유지(figma-implementation-rule D5).
