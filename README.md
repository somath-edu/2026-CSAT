# 수학의 기초와 기본 (Math Basic Foundations)

수학의 가장 근본적인 원리와 기초 개념을 디지털로 집필하는 수학교과서 프로젝트입니다.

## 🚀 프로젝트 개요
이 프로젝트는 **MathWiki** 시스템을 기반으로 하며, 기초 수학 학습자를 위해 더 쉽고 시각화된 콘텐츠를 제공하는 것을 목표로 합니다.

## 🛠 기술 스택
- **프레임워크**: [Astro](https://astro.build/)
- **수학 수식**: [KaTeX](https://katex.org/) (로컬 연동)
- **인터랙티브**: [JSXGraph](https://jsxgraph.uni-bayreuth.de/) (로컬 연동)
- **품질 관리**: [ESLint](https://eslint.org/) (OpenSource_Lab 중앙 엔진 연동)

## 📂 프로젝트 구조
- `/raw`: 수집된 원본 자료
- `/vault`: 정리된 지식 베이스 (Obsidian)
- `/web`: 디지털 출판 웹 소스
- `/scripts`: 수식 검증 및 자동화 도구

## 💻 시작하기 (Local Setup)

```bash
# 1. 의존성 설치 (in /web)
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 수식 검사 실행
npm run check
```

---
© 2026 Math Basic Project. 모든 권리는 집필자에게 있습니다.
