# [PRD] 마이링크 (MyLink) 제품 기능 정의서

---

## 1. 프로젝트 개요 (Overview)

### 1.1 서비스 소개
**마이링크 (MyLink)**는 SNS 크리에이터 및 인플루언서가 인스타그램, 유튜브, 틱톡 등 여러 플랫폼에 흩어져 있는 자신의 콘텐츠와 채널 링크를 단 하나의 모바일 최적화 웹 페이지(`mylink.com/[username]`)로 통합하여 공유할 수 있도록 지원하는 **링크트리(Linktree) 클론 서비스**입니다.

### 1.2 핵심 타깃 페르소나
- **주요 타깃**: 인스타그램, 유튜브, 틱톡, 블로그 등을 운영하는 1인 크리에이터 및 인플루언서
- **핵심 니즈**:
  - 프로필 바이오에 넣을 수 있는 단 1개의 URL 공간에 주요 영상, 협찬 링크, 커뮤니티 링크를 모아서 전달
  - 코딩이나 복잡한 설정 없이 직관적으로 버튼 링크를 추가하고 디자인을 꾸미길 원함
  - 어떤 링크가 팬들에게 가장 많이 클릭되었는지 실시간 반응(통계)을 확인하고 싶음

### 1.3 핵심 가치 제안 (Value Proposition)
1. **실시간 2분할 편집 UX**: 편집과 동시에 우측 모바일 목업 화면에서 즉각적인 결과 확인
2. **원클릭 감성 테마**: 엄선된 프리셋 테마와 커스텀 컬러 지원으로 크리에이터의 브랜드 아이덴티티 표현
3. **가볍고 빠른 모바일 퍼스트 환경**: 팬들이 링크를 클릭했을 때 1초 이내에 로딩되는 쾌적한 반응형 페이지
4. **단계적 개발 접근 (Fast MVP)**: 로컬 Mock/LocalStorage 기반 프로토타입으로 빠른 핵심 경험 검증 후 백엔드 연동

---

## 2. 사용자 시나리오 (User Scenarios)

### 시나리오 1: 크리에이터 '민지'의 링크 페이지 개설 및 브랜딩 (Onboarding & Creation)
- **페르소나**: 패션/뷰티 인스타그램 및 유튜브 크리에이터 (팔로워 3만 명)
- **상황/니즈**: 인스타그램 프로필 바이오에 넣을 수 있는 단 1개의 링크 공간에 유튜브 신규 영상, 공동구매 링크, 블로그 마켓 링크를 한 번에 전달하고 싶음.
- **사용자 흐름**:
  1. 마이링크에 접속하여 프로필 생성 (`mylink.com/minji`).
  2. 프로필 이미지 등록, 활동명("민지의 패션로그"), 한 줄 소개("매주 수/일 패션 & 뷰티 팁 공유 ✨") 입력.
  3. SNS 바에 인스타그램, 유튜브 채널 URL 등록 (공식 로고 아이콘 자동 렌더링).
  4. 핵심 링크 3개 등록:
     - "🔥 이번 주 한정 최저가 마켓 바로가기"
     - "🎬 최신 가을 룩북 브이로그 (YouTube)"
     - "📝 데일리 오피스룩 코디 블로그"
  5. 2분할 에디터의 우측 모바일 목업을 실시간으로 확인하며, 브랜드 감성에 맞는 'Sunset Pastel' 테마를 선택하고 버튼 모서리를 'Pill(알약형)'로 커스텀.
  6. 상단의 '내 링크 복사' 버튼을 눌러 인스타그램 프로필 바이오에 등록.
- **결과/가치**: 복잡한 웹 제작 지식 없이도 5분 만에 세련된 모바일 프로필 페이지를 구축하여 팬들에게 제공.

---

### 시나리오 2: 팬/방문자 '수현'의 모바일 링크 탐색 및 전환 (Consumer Experience)
- **페르소나**: 크리에이터 민지의 인스타그램 스토리를 보고 유입된 팔로워
- **상황/니즈**: 인스타 스토리에서 소개된 가을 자켓 정보와 구매 링크를 빠르게 확인하고 싶음.
- **사용자 흐름**:
  1. 인스타그램 프로필 바이오의 `mylink.com/minji` 클릭.
  2. 인앱 브라우저에서 1초 이내에 모바일에 최적화된 마이링크 페이지가 즉각 렌더링됨.
  3. 상단 프로필 이미지와 공식 인스타/유튜브 배지로 신뢰감 형성.
  4. 가장 상단에 위치한 "🔥 이번 주 한정 최저가 마켓 바로가기" 버튼 터치.
  5. 새 창으로 마켓 상세 페이지로 부드럽게 이동하여 제품 구매 진행.
  6. *(백그라운드 자동 동작)*: 민지의 페이지 방문 수(PV) +1 및 해당 마켓 링크 클릭 수(Click) +1 즉시 카운팅.
- **결과/가치**: 불필요한 탐색 단계 없이 원하는 링크로 1초 만에 전환되어 이탈률 최소화.

---

### 시나리오 3: 크리에이터의 실시간 통계 분석 및 링크 최적화 (Analytics & Maintenance)
- **페르소나**: 공동구매 진행 3일 차의 크리에이터 민지
- **상황/니즈**: 어떤 링크가 팬들에게 가장 반응이 좋은지 분석하고, 마감된 링크를 빠르게 내리거나 순서를 조정하고 싶음.
- **사용자 흐름**:
  1. 관리자 대시보드(`/admin`) 접속 후 [통계 탭] 확인.
  2. 3일간 총 방문자 2,450명, 최저가 마켓 링크 클릭 890회(클릭률 약 36.3%)의 실시간 성과 지표 확인.
  3. 공구 일정이 마감되어 [링크 관리 탭]으로 이동.
  4. 마감된 최저가 마켓 링크의 '활성화 스위치'를 OFF로 토글하여 공개 페이지에서 즉시 숨김.
  5. 새로 업로드한 "Q&A 유튜브 영상" 링크를 추가하고 순서를 최상단으로 재배치.
  6. 우측 모바일 목업에서 숨겨진 링크가 사라지고 영상 링크가 최상단에 노출된 것을 확인.
- **결과/가치**: 실시간 데이터를 통해 팬들의 반응을 검증하고, 유효하지 않은 링크를 즉각 관리하여 팬 경험을 최적화.

---

## 3. 기술 스택 및 개발 아키텍처

| 구분 | 기술 스택 | 설명 |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | React 19 기반 모던 웹 프레임워크 |
| **Styling** | Tailwind CSS v4 | 유틸리티 기반 고속 모바일 최적화 반응형 스타일링 |
| **Icons** | Lucide React | 현대적이고 일관된 UI 및 브랜드 아이콘 세트 |
| **언어** | TypeScript | 정적 타입 안정성 보장 |
| **상태 관리 (State)** | Zustand (`zustand/middleware` persist) | 전역 상태 관리 및 LocalStorage 자동 영속화, 실시간 프리뷰 동기화 |
| **데이터 & 백엔드 (Phase 2)** | Supabase / PostgreSQL | 사용자 인증(Auth), 프로필/링크 영속 저장, 실시간 통계 수집 |

---

## 4. 정보 구조도 (Information Architecture)

```
[마이링크 (MyLink)]
├── 1. 랜딩 페이지 (/) 
│    ├── 서비스 소개 및 핸들 검색/체험 유도
│    └── 대시보드 바로가기 (체험 모드 / 로그인)
├── 2. 크리에이터 관리자 대시보드 (/admin)
│    ├── [좌측: 편집 패널]
│    │    ├── 탭 1: 링크 관리 (버튼 링크 추가/수정/삭제/활성화 토글/순서 변경)
│    │    ├── 탭 2: SNS 아이콘 (인스타, 유튜브, X, 틱톡 등 계정 URL 설정)
│    │    ├── 탭 3: 디자인 & 테마 (프리셋 테마 선택, 배경/버튼 컬러 커스텀, 프로필 사진/소개글)
│    │    └── 탭 4: 통계 (총 방문 수, 링크별 실시간 클릭 수/클릭률 대시보드)
│    └── [우측: 실시간 모바일 목업 프리뷰]
│         └── 변경 사항이 실시간으로 반영되는 스마트폰 형태의 인터랙티브 미리보기
└── 3. 공개 크리에이터 페이지 (/[username])
     ├── 프로필 영역 (아바타, 사용자 이름, 한 줄 소개)
     ├── SNS 공식 아이콘 바
     └── 커스텀 버튼 링크 목록 (클릭 시 카운트 증가 및 외부 링크 새 탭 이동)
```

---

## 5. 기능 요구사항 명세 (Functional Requirements)

### FR-1. 사용자 계정 및 URL 핸들 (Account & Routing)
- **FR-1.1 (Phase 1 Mock)**: 
  - 기본 데모 계정(`demo` 또는 임의의 사용자 이름)을 기본 활성화하여 별도 로그인 없이 즉시 편집/체험 가능.
  - 브라우저 LocalStorage에 사용자 설정 데이터 저장.
- **FR-1.2 고유 URL 라우팅**:
  - `/[username]` 동적 라우트를 통해 해당 사용자의 공개 프로필 페이지 렌더링.
  - 데모 프로필 URL(`http://localhost:3000/demo`)을 상단에 공유 버튼과 함께 노출.
- **FR-1.3 (Phase 2 확장)**:
  - 소셜 로그인 (Google, Kakao) 및 이메일/비밀번호 회원가입 연동.
  - 회원가입 시 고유 핸들(영어 소문자, 숫자, 하이픈, 언더스코어) 중복 검사 및 선점.

---

### FR-2. 링크 관리 기능 (Link Management)
- **FR-2.1 링크 생성 (Create)**:
  - '새 링크 추가' 버튼 클릭 시 링크 생성 폼 제공.
  - 필수 입력값: **링크 제목(Title)**, **대상 URL(URL)**.
- **FR-2.2 링크 수정 (Update)**:
  - 제목, URL을 인라인 또는 수정 카드에서 즉시 편집 가능.
- **FR-2.3 링크 삭제 (Delete)**:
  - 삭제 확인 후 해당 링크 제거.
- **FR-2.4 활성화/비활성화 토글 (Toggle)**:
  - 스위치 토글을 통해 공개 페이지에서 특정 링크를 숨기거나 다시 표시.
- **FR-2.5 링크 순서 변경 (Reorder)**:
  - 상/하 화살표 버튼 또는 드래그 앤 드롭으로 링크 노출 우선순위 조정.

---

### FR-3. SNS 아이콘 바 (Social Media Icons)
- **FR-3.1 지원 플랫폼**:
  - Instagram, YouTube, TikTok, X (Twitter), Threads, KakaoTalk / Blog.
- **FR-3.2 설정 및 노출**:
  - 각 플랫폼의 계정 아이디 또는 URL을 입력하면 해당 공식 브랜드 아이콘 활성화.
  - 미입력된 플랫폼 아이콘은 프로필 페이지에 노출되지 않음.
  - 프로필 이미지/소개글 바로 하단에 심플한 아이콘 버튼 형태로 모아서 정렬.

---

### FR-4. 디자인 & 테마 커스터마이징 (Design & Theme)
- **FR-4.1 프로필 기본 정보 편집**:
  - 프로필 이미지: 프리셋 아바타 선택 또는 이미지 URL 직접 입력 (추후 파일 업로드 확장).
  - 닉네임 (Display Name): 화면에 표시될 크리에이터 이름.
  - 한 줄 소개 (Bio): 최대 100자 내외의 간단한 자기소개 문구.
- **FR-4.2 프리셋 테마 (Preset Themes)**:
  - 최소 5가지 이상의 완성도 높은 기본 테마 제공:
    1. **Modern Clean**: 화이트 배경 + 블랙 모던 버튼 (미니멀)
    2. **Dark Charcoal**: 딥 다크 배경 + 차콜 그레이 버튼 (모던 다크)
    3. **Sunset Pastel**: 따뜻한 코랄/피치 그라디언트 + 반투명 글래스모피즘 버튼
    4. **Neo Mint**: 싱그러운 민트/에메랄드 톤 + 라운드 버튼
    5. **Midnight Neon**: 다크 블루 배경 + 네온 퍼플/바이올렛 포인트
- **FR-4.3 기본 세부 커스텀 (Customization)**:
  - 프리셋 테마를 기본으로 하되, 아래 항목을 자유롭게 덮어쓰기(오버라이드) 가능:
    - 배경 색상 (Hex 코드 또는 컬러 팔레트 선택)
    - 버튼 배경 색상 및 텍스트 색상
    - 버튼 모서리 곡률 (직각 Square, 살짝 둥근 Rounded, 알약형 Pill)

---

### FR-5. 관리자 에디터 UX (Admin Dashboard & Live Preview)
- **FR-5.1 2분할 레이아웃 (Split-Screen)**:
  - **데스크톱 화면**: 좌측(50~60%) 편집 탭 영역 + 우측(40~50%) 스마트폰 프레임 목업 고정.
  - **모바일 화면**: 상단에 [편집 / 미리보기] 토글 탭을 두어 1열에서도 매끄러운 전환 지원.
- **FR-5.2 실시간 반응 (Instant Sync)**:
  - 좌측에서 링크 텍스트나 테마를 수정하는 순간, 우측 모바일 목업에 `0.1초 이내` 즉시 반영.
- **FR-5.3 공유 및 미리보기 바로가기**:
  - 상단 헤더에 `내 링크 복사하기` 버튼 및 `새 탭에서 열기` 링크 제공.

---

### FR-6. 방문자 공개 프로필 페이지 (Public Profile Page: `/[username]`)
- **FR-6.1 반응형 모바일 최적화**:
  - 모바일(320px~480px) 중앙 정렬 뷰포트에 최적화된 심플한 카드 레이아웃.
  - PC 환경에서도 스마트폰 너비(최대 480px~540px)로 중앙 집약형 렌더링.
- **FR-6.2 클릭 트래킹 및 인터랙션**:
  - 버튼 클릭 시 타깃 URL로 새 창(`target="_blank" rel="noopener noreferrer"`) 이동.
  - 이동 직전/동시에 해당 링크의 클릭 카운트 이벤트 트리거.
- **FR-6.3 마이링크 푸터**:
  - 하단에 "Powered by 마이링크 (나도 무료 링크 만들기)" 브랜딩 배너 노출.

---

### FR-7. 통계 및 분석 (Analytics)
- **FR-7.1 수집 및 표시 지표**:
  - **총 프로필 방문 수 (Page Views)**: `/[username]` 페이지 접속 시 1회 증가.
  - **각 링크별 클릭 수 (Link Clicks)**: 특정 링크 버튼을 누를 때마다 카운트 증가.
  - **평균 클릭률 (CTR)**: `(총 링크 클릭 수 / 총 방문 수) * 100%` 자동 계산.
- **FR-7.2 통계 탭 대시보드 UI**:
  - 핵심 KPI 요약 카드 (총 방문자, 총 클릭 수, 최고 인기 링크).
  - 링크별 클릭 순위 리스트 (클릭 수 기준 내림차순 정렬 및 진행률 바 표시).
  - "통계 초기화" 또는 기간 필터(Phase 2) 대비 설계.

---

## 6. 데이터 모델 및 타입 정의 (Data Schema)

```typescript
export interface SocialLinks {
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  twitter?: string;
  threads?: string;
  blog?: string;
}

export type ButtonRadius = 'square' | 'rounded' | 'pill';

export interface ThemeConfig {
  presetId: 'modern-clean' | 'dark-charcoal' | 'sunset-pastel' | 'neo-mint' | 'midnight-neon' | 'custom';
  backgroundColor: string;
  textColor: string;
  buttonBgColor: string;
  buttonTextColor: string;
  buttonRadius: ButtonRadius;
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  isActive: boolean;
  clickCount: number;
  order: number;
  createdAt: string;
}

export interface UserProfile {
  username: string; // URL slug: /[username]
  displayName: string;
  bio: string;
  avatarUrl: string;
  socials: SocialLinks;
  theme: ThemeConfig;
  links: LinkItem[];
  pageViews: number;
}

// Zustand 전역 상태 스토어 타입 정의
export interface MyLinkStore {
  profile: UserProfile;
  // 프로필 & SNS 액션
  updateProfile: (data: Partial<Pick<UserProfile, 'displayName' | 'bio' | 'avatarUrl'>>) => void;
  updateSocials: (socials: Partial<SocialLinks>) => void;
  // 테마 액션
  setThemePreset: (presetId: ThemeConfig['presetId']) => void;
  updateThemeCustom: (custom: Partial<Omit<ThemeConfig, 'presetId'>>) => void;
  // 링크 CRUD & 순서 변경 액션
  addLink: (title: string, url: string) => void;
  updateLink: (id: string, data: Partial<Pick<LinkItem, 'title' | 'url'>>) => void;
  deleteLink: (id: string) => void;
  toggleLinkActive: (id: string) => void;
  reorderLinks: (links: LinkItem[]) => void;
  // 통계 액션
  incrementPageView: () => void;
  incrementLinkClick: (id: string) => void;
  resetAnalytics: () => void;
}
```

---

## 7. 비기능적 요구사항 (Non-Functional Requirements)

1. **로딩 성능 (Performance)**:
   - 공개 프로필 페이지는 폰트/아이콘 최적화를 통해 초기 로딩(FCP) 1초 이내 달성.
2. **모바일 사용성 (Mobile-First)**:
   - 버튼 클릭 영역 최소 터치 타깃 44px 이상 유지.
   - iOS 사파리 및 안드로이드 크롬 인앱 브라우저(인스타/카카오톡 웹뷰) 호환 보장.
3. **SEO 및 소셜 공유 (OG Tags)**:
   - 카카오톡, 인스타그램에 내 링크 공유 시 프로필 사진, 닉네임, 소개글이 썸네일(OG Tag)로 올바르게 표시되도록 메타데이터 동적 생성.
4. **확장성 & 상태 아키텍처 (Extensibility & State Management)**:
   - 전역 상태 관리를 **Zustand (`useMyLinkStore`)** 및 `persist` 미들웨어로 구성하여, 에디터와 실시간 모바일 프리뷰 간의 양방향 동기화를 즉각적으로 처리하고 LocalStorage에 자동 영속화.
   - 추후 Supabase/REST API 연동 시에도 UI 컴포넌트 변경 없이 Zustand 액션 내부 구현만 비동기 API 호출로 교체할 수 있는 유연한 구조 보장.

---

## 8. 개발 로드맵 & 마일스톤

### Phase 1: 로컬 Mock 인터랙티브 프로토타입 (현재 마일스톤)
- [x] 요구사항 수집 및 PRD 확정 (Zustand 상태 관리 반영)
- [ ] `zustand`, `lucide-react` 의존성 설치
- [ ] Zustand 스토어(`useMyLinkStore`) 및 기본 목(Mock) 데이터 구성
- [ ] 2분할 관리자 대시보드 UI 구현 (`/admin`)
  - 프로필 & SNS 링크 편집 (실시간 스토어 반영)
  - 링크 CRUD, 활성화 토글, 순서 변경
  - 테마 프리셋 선택 및 컬러 커스텀
  - 실시간 모바일 목업 실시간 동기화
- [ ] 공개 프로필 페이지 구현 (`/[username]`)
- [ ] 클릭 카운팅 및 방문자 통계 탭 연동
- [ ] Zustand `persist` 미들웨어 기반 LocalStorage 영속화 검증

### Phase 2: 백엔드 연동 및 프로덕션 출시 (Next Step)
- [ ] Supabase / DB 마이그레이션 및 실시간 데이터 동기화
- [ ] 소셜 로그인 (Google, Kakao) 및 유저 핸들 중복 방지
- [ ] 프로필 이미지 실제 파일 업로드 (Storage)
- [ ] Vercel 배포 및 커스텀 도메인 연결
