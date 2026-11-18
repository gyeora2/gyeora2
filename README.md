

👋 안녕하세요!
React와 TypeScript를 기반으로 고성능 인터페이스와 데이터 중심의 웹 애플리케이션을 구축하는 프론트엔드 개발자 이겨라입니다.

실시간 데이터 시각화, 비동기 상태 관리, API 연동 프로젝트를 통해

사용자에게 안정적인 인터랙션을 제공하고, 유지보수성이 뛰어난 프론트엔드 아키텍처를 설계하는 데 집중하고 있습니다. FastAPI, Spring 기반 서버와의 통신 구조를 깊이 있게 이해하며 협업합니다.

🏆 프로젝트 발표회 최우수상 2회 수상 (기술력 및 완성도 검증 완료)

🚀 대표 프로젝트 1
IoT 기반 실시간 공기질 모니터링 시스템 (팀 프로젝트)
React 기반 대시보드로 대용량 IoT 데이터를 실시간 시각화한 프론트엔드 프로젝트 > Chart.js 최적화 · 실시간 스트리밍 렌더링

🏆 최종 프로젝트 경진대회 최우수상 수상

🔗 프로젝트 저장소

✅ 담당 역할 (Front-end Lead)
React 기반 실시간 모니터링 대시보드 UI/UX 전담 구축

Chart.js 커스터마이징을 통한 대용량 센서 데이터 스트리밍 및 이상치(임계치 초과) 시각화

대량의 실시간 데이터 유입에 따른 불필요한 리렌더링 방지 및 상태 관리 최적화

컴포넌트 모듈화 및 반응형 레이아웃 설계

💡 Trouble Shooting & Growth
성능 개선: 지속적으로 유입되는 대량 데이터 처리 시 발생하는 브라우저 부하를 렌더링 주기 최적화 및 컴포넌트 분할을 통해 해결하며 프런트엔드 렌더링 성능 관리 역량 함양.

📱 대표 프로젝트 2
개인 맞춤형 중고 스마트폰 거래 플랫폼 (Plug)
WebSocket 실시간 양방향 통신과 비동기 API 연동을 적용한 웹 서비스 프로젝트 > WebSocket 프로토콜 · REST API 연동 · 상태 관리

🏆 핵심 프로젝트 경진대회 최우수상 수상

🔗 프로젝트 저장소

✅ 담당 역할 (Front-end)
HTML5, CSS3, JavaScript(ES6+) 기반 핵심 컴포넌트 및 UI 구현

WebSocket 프로토콜을 활용한 실시간 채팅 및 양방향 통신 로직 구현

Spring Boot REST API 연동을 통한 상품 목록, 찜, 마이페이지 동적 데이터 바인딩

크로스브라우징 및 반응형 웹 인터페이스 구축

💡 Trouble Shooting & Growth
비동기 통신 최적화: HTTP 폴링 방식의 한계를 WebSocket 연동을 통해 극복하고, 실시간 데이터 스트리밍 및 이벤트 핸들링 구조 구축.

협업 프로세스 효율화: 백엔드 개발자와의 API 명세 협의 과정에서 Swagger를 활용해 데이터 규격을 맞추고 연동 에러 최소화.

📱 대표 프로젝트 3
고객 문의 및 처리 상태 관리 서비스 (JUST) · 개인 프로젝트

고객 문의를 등록하고 처리 상태를 관리하는 웹 서비스입니다. 고객명·제목 검색과 상태 필터를 제공하며, 로그인한 계정은 자기 문의를 관리할 수 있습니다.

React · Vite · JavaScript · Supabase Auth · PostgreSQL · Vercel

🔗 [프로젝트 저장소](https://github.com/gyeora2/mini-crm) · [배포 데모](https://mini-crm-pi-gold.vercel.app/)

✅ 담당 역할 (개인 프로젝트)

React로 문의 등록·조회·수정·삭제, 상태 변경, 검색·필터 화면 구성

Supabase Auth 로그인과 REST API 연동, PostgreSQL 행 수준 보안(RLS)으로 계정별 접근 제어 적용

Vercel에 배포하고, 테스트 문의가 로그아웃 후 다시 로그인해도 표시되는 것을 확인

💡 Trouble Shooting & Growth

화면 상태와 DB 데이터 동기화: 저장·수정·삭제는 API 응답이 성공한 뒤 목록을 갱신하고, 조회 실패 시 재시도할 수 있도록 구성

접근 제어 검증: 로컬 PostgreSQL에서 계정 간 조회·수정·삭제 차단을 확인하고, 운영 Supabase에서 비로그인 문의 조회가 차단되는 것을 확인

🗂️ 대표 프로젝트 4
고객 문의 및 처리 상태 관리 서비스 (WorkFlow CRM) · 개인 프로젝트

고객 문의를 등록·조회·수정·삭제하고 처리 상태를 관리하는 웹 서비스입니다. 문의 제목이나 고객사 이름으로 검색하고, 접수·처리 중·완료 건수를 확인할 수 있습니다.

React · Vite · JavaScript · Node.js · Express · PostgreSQL

✅ 담당 역할 (개인 프로젝트)

React 화면에서 문의 폼, 검색·필터, 처리 상태 변경 흐름 구성

Express REST API로 입력값을 검증하고, PostgreSQL에서 외래 키로 고객사와 문의를 연결

SQL JOIN으로 문의와 고객사 정보를 함께 조회하고, GROUP BY로 검색어 기준 상태별 건수 집계

💡 Trouble Shooting & Growth

저장 실패 처리: API 오류가 발생해도 제목과 고객사 선택을 유지하고, 재저장에 성공하면 현재 검색 조건으로 목록을 갱신하도록 구성

개발 환경 오류 해결: Windows에서 Rollup 네이티브 모듈 실행이 차단되는 원인을 확인하고, 공식 WebAssembly 배포판으로 교체한 뒤 개발 서버와 빌드 동작 확인

AI를 활용해 구현했습니다. 브라우저와 로컬 PostgreSQL 환경에서 주요 기능을 검증했습니다.

### 📚 Stacks (Front-end Focused)
<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black"/>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/>
  <img src="https://img.shields.io/badge/Java-F80000?style=flat-square&logo=OpenJDK&logoColor=white"/>
  <img src="https://img.shields.io/badge/Spring-6DB33F?style=flat-square&logo=Spring&logoColor=white"/>
  <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=FastAPI&logoColor=white"/>
  <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=Python&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/>
</p>

### 🛠️ Tools
<p>
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=Figma&logoColor=white"/>
  <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=Git&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/>
  <img src="https://img.shields.io/badge/VSCode-007ACC?style=flat-square&logo=VisualStudioCode&logoColor=white"/>
</p>

### 📞 Contact
<p>
  <a href="mailto:lgr0223000@gmail.com"><img src="https://img.shields.io/badge/Email-lgr0223000@gmail.com-EA4335?style=flat-square&logo=Gmail&logoColor=white"/></a>
</p>




=======
