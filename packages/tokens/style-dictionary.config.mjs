/**
 * @zipboda/tokens — Style Dictionary (v4) 빌드 설정
 * 소스: DTCG(*.tokens.json) → 출력: CSS 변수(web/admin) · ES6/TS(전 플랫폼·RN)
 */
export default {
  source: ["src/**/*.tokens.json"],
  platforms: {
    css: {
      transforms: ["attribute/cti", "name/kebab", "color/css"],
      prefix: "zb",
      buildPath: "build/css/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
          options: { outputReferences: true, selector: ":root" }
        }
      ]
    },
    js: {
      transforms: ["attribute/cti", "name/pascal", "color/hex"],
      prefix: "zb",
      buildPath: "build/js/",
      files: [
        { destination: "index.js", format: "javascript/es6" },
        { destination: "index.d.ts", format: "typescript/es6-declarations" }
      ]
    }
  }
};
