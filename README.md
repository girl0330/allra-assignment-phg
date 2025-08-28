# Allra Front Assignment

> Next.js 15 + React 19 + TypeScript 기반의 블로그/회원 기능 데모 프로젝트

---

## 💻 실행방법

1. 프로젝트 클론

```jsx
git clone https://github.com/FC-DEV3-Final-Project/zoop-frontend.git
```

2. 패키지 설치

```jsx
npm install
```

3. 로컬 서버 실행

```jsx
npm run dev
```

## 🔧 Tech Stack

### Framework & Language

- **Next.js** 15.5.0 (App Router, Turbopack 사용)
- **React** 19.1.0
- **TypeScript** 5.9.2

### Styling

- **Tailwind CSS** 4.1.12
- **PostCSS** 8.5.6
- **Autoprefixer** 10.4.21
- **clsx** 2.1.1 (조건부 클래스 유틸)

### State Management & Data Fetching

- **Zustand** 5.0.8 (전역 상태 관리)
- **TanStack React Query** 5.85.5
- **TanStack React Query Devtools** 5.85.5

### Forms & Validation

- **React Hook Form** 7.62.0
- **Zod** 4.1.3 (스키마 기반 validation)
- **@hookform/resolvers** 5.2.1

### Networking

- **Axios** 1.11.0

### UI & Animation

- **Framer Motion** 12.23.12
- **lucide-react** 0.541.0 (아이콘)
- **react-hot-toast** 2.6.0 (알림/토스트)

### Development Tools

- **@tailwindcss/postcss** 4.1.12
- **@types/react**, **@types/react-dom**, **@types/node**
- **ESLint / Prettier** (Next.js 기본 내장)

## 📁 폴더구조

```text
.
├─ public/
│  ├─ fonts/          # 웹폰트
│  ├─ icons/          # SVG/아이콘 에셋
│  └─ images/         # 일반 이미지 에셋
│
├─ src/
│  ├─ app/                               # App Router 엔트리
│  │  ├─ (auth)/                         # 인증 관련 라우트 그룹
│  │  ├─ (routes)/                       # 공개/기능 라우트 그룹
│  │  ├─ ClientToaster.tsx               # 전역 토스트 포털
│  │  ├─ favicon.ico
│  │  ├─ layout.tsx                      # 전역 레이아웃
│  │  ├─ page.tsx                        # 루트 페이지
│  │  └─ providers.tsx                   # React Query 등 전역 Provider
│  │
│  ├─ components/                        # 앱 전역 공용 컴포넌트(UI Primitive 등)
│  │
│  ├─ features/                          # Feature-Sliced: 도메인 단위 기능 모듈
│  │  ├─ auth/
│  │  │  ├─ components/                  # 로그인/회원가입 UI
│  │  │  ├─ hooks/                       # 인증 관련 훅(useLogin, useRegister 등)
│  │  │  └─ schema/                      # RHF/Zod 스키마
│  │  └─ blogs/
│  │     ├─ components/                  # 블로그 리스트/카드/상세 UI
│  │     └─ hooks/                       # 블로그 API 호출 훅(useBlogList, useBlogDetail 등)
│  │
│  ├─ lib/                               # 유틸/클라이언트(axios, formatter 등)
│  ├─ store/                             # Zustand 등 전역 스토어
│  └─ styles/                            # 전역 스타일, Tailwind 확장
│
├─ .env.development                      # 로컬 개발용 환경변수
```

## 💡 프로젝트 컨벤션

### 브랜치 전략

**main, develop, feature** 브랜치 사용

- main : 배포 가능한 상태만을 관리하는 브랜치

- develop : 개발 단계에서 통합 역할을 담당하는 브랜치

- feature : 새롭게 추가되거나 변경되는 기능을 개발, merge 후에는 삭제
  - 브랜치 이름 규칙 : `feat/기능명` e.g. `feat/letter-list`

### 커밋 컨벤션

- `feat` : 새로운 기능 추가

- `fix` : 버그 수정

- `docs` : 문서 수정

- `design` : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우

- `refactor` : 코드 리펙토링

- `chore` : 빌드 업무 수정, 패키지 매니저 수정
