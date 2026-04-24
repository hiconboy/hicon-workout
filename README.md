# HICON BOY Workout Tracker

하이콘보이 개인 운동 트래커. 덤벨 + 벤치 환경 기준 주5일 분할 (팔 우선).

## 🔒 보안 설계 (반드시 읽기)

이 앱은 **개인정보 노출을 막기 위해 다음 원칙으로 설계되었습니다.**

| 항목 | 정책 |
|------|------|
| 데이터 저장 위치 | **폰 브라우저의 localStorage만** (서버 0) |
| 외부 서버 통신 | **없음** (Google Fonts CDN만 폰트 로드용) |
| 계정/로그인 | **요구하지 않음** |
| 결제 정보 | **입력 칸 없음** |
| 쿠키 | **사용 안 함** |
| 분석 도구 | **없음** (Google Analytics 등 X) |
| GitHub Repo | **Public 가능** — 코드만 들어있음, 운동기록 없음 |
| Vercel 배포 | **신용카드 등록 불필요** (Hobby 무료) |

### 보안 헤더
`vercel.json`에 다음 헤더가 설정되어 있어 외부 공격 차단:
- CSP (Content Security Policy) — 허용된 출처만 리소스 로드
- X-Frame-Options: DENY — 다른 사이트 iframe 차단 (clickjacking 방지)
- Referrer-Policy: no-referrer — 외부 사이트로 이동시 출처 정보 차단
- HSTS — HTTPS 강제

### 절대 금지
- ❌ `node_modules`, `.env`, 백업 JSON 파일을 GitHub에 commit하지 말 것 (`.gitignore`에 등록되어 있음)
- ❌ Repo URL을 모르는 사람에게 공유 금지 (Public이라도 굳이 알릴 필요 없음)
- ❌ 이 앱에 신용카드/주민번호/비밀번호를 절대 입력하지 말 것 (입력 칸 자체가 없음)

---

## 📦 배포 가이드 (GitHub → Vercel)

### 1단계: GitHub Repo 생성

1. github.com 가입 (이메일+비번만 필요, 결제정보 X)
2. 우상단 `+` → `New repository`
3. Repository name: `hicon-workout` (원하는 이름)
4. **Public** 선택 (Vercel 무료 배포 위해)
5. `Create repository` 클릭

### 2단계: 코드 업로드

#### 방법 A: 웹에서 드래그 앤 드롭 (가장 쉬움)
1. 빈 repo 페이지에서 `uploading an existing file` 링크 클릭
2. 이 폴더 안의 **모든 파일과 폴더**를 드래그
   - ⚠️ `.gitignore`, `package.json`, `vite.config.js`, `vercel.json`, `index.html`, `src/`, `public/` 모두 포함
   - ⚠️ `node_modules/`는 절대 업로드 X (없을 것임)
3. Commit 메시지: `initial commit` → `Commit changes`

#### 방법 B: Git 명령어 (개발 익숙하면)
```bash
cd hicon-workout
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/hicon-workout.git
git branch -M main
git push -u origin main
```

### 3단계: Vercel 배포

1. vercel.com 접속 → `Sign Up` → **Continue with GitHub**
2. GitHub 권한 허용 (결제정보 요구 안 함)
3. 대시보드에서 `Add New...` → `Project`
4. `hicon-workout` repo 선택 → `Import`
5. Framework Preset: **Vite** 자동 감지됨
6. `Deploy` 클릭
7. 1~2분 후 `hicon-workout-xxx.vercel.app` URL 생성

### 4단계: 폰 홈화면에 추가

**iPhone (Safari)**
1. 위 URL을 Safari로 열기
2. 하단 **공유 버튼** (네모+화살표) 탭
3. **`홈 화면에 추가`** 선택
4. 이름 확인 후 `추가`

**Android (Chrome)**
1. URL을 Chrome으로 열기
2. 우상단 `⋮` 메뉴
3. **`홈 화면에 추가`** 선택

이제 앱 아이콘처럼 박힙니다. 인터넷 끊겨도 작동.

---

## 📱 사용법

- **TODAY** — 오늘 요일에 맞는 운동 자동 표시. 무게/렙 입력하고 ✓ 체크
- **WEEK** — 주간 분할 전체 보기 + 다른 날 미리보기
- **STATS** — 연속일수, 주간 볼륨, 팔 진행도, 부위별 분포
- **타이머** — 화면 하단 고정. 세트 체크하면 자동 시작 + 완료시 비프음
- **🛡 우상단 방패 아이콘** — 백업/복원/삭제 + 보안 정보

### 백업 권장
- **월 1회** 우상단 방패 → "백업 내보내기" → JSON 파일 저장
- 폰 분실/브라우저 캐시 삭제 시 데이터 손실 방지
- 백업 파일은 **개인 클라우드(iCloud, Google Drive 등)에만 저장**, GitHub 업로드 금지

---

## 🛠 로컬 개발 (선택)

```bash
npm install
npm run dev    # http://localhost:5173
npm run build  # 배포용 빌드
```

---

## 운동 루틴

- Day 1 (월) — 팔 집중 A
- Day 2 (화) — 하체 + 복근
- Day 3 (수) — 어깨 + 등
- Day 4 (목) — 팔 집중 B
- Day 5 (금) — 가슴 + 복근
- 토 — 선택적 LISS
- 일 — 안식

팔 우선순위 1, 어깨 2, 복근 3, 등 4, 가슴 5, 하체 6.
