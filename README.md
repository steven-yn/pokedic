# Pokedic

### 메인 프레임워크 : Next.js (Page Router)

- Next.js 13 버전을 사용하지만, 페이지 라우터를 사용하였습니다.
- 아직 앱 라우터에 이해도가 부족하여 미숙하기도 하고, 페이지 라우터의 안정성이 좀더 높다고 생각합니다.

### 페이지 구성

- '/' 페이지 <= 포켓몬 리스트 및 무한 스크롤, 포켓몬 번호 검색
- '/[id]' 페이지 <= 포켓몬 id 별 상세 페이지

### 디렉터리 구성

<pre>
  - components                        <- 컴포넌트
  |------------ common                <- 공용으로 사용될수 있는 컴포넌트
  |------------ meta                  <- 메타 태그 컴포넌트
  |------------ NumberFilter          <- 포켓몬 번호 검색 기능 컴포넌트
  |------------ PokemonDictionary     <- 리스트 페이지 포켓몬 도감 컴포넌트
  |------------ PokemonInfo           <- 디테일 페이지 포켓몬 정보 컴포넌트
  |------------ Section               <- 각 섹션 구분 컴포넌트
  - const                             <- 전역에서 상수로 사용되는 값 등을 모아놓은 모듈
  - hooks                             <- 커스텀 훅
  - pages                             <- Next.js Page Router
  - services                          <- 페이지를 렌더링하기 위한 핵심 로직. fetch 와 React-Query 관련
  |---------- fetch                   <- fetch 관련 클래스와 API 호출 클래스
  - store                             <- zustand store
  - types                             <- type definition
  |------- API                       <- PokeAPI 타입정의
</pre>

### 구현 사항

| 리스트 페이지

- 포켓몬 번호 검색 기능
- 무한스크롤 paginate
- 포켓몬 클릭시 해당 포켓몬 자세히보기

| 디테일 페이지

- 포켓몬 정보
- 포켓몬 진화단계 표시

| 상태관리 라이브러리 : React-Query (Server Side, Data), Zustand (Client Side, Interaction)

### 가산점 항목

| 캐시

- React-Query 사용하여 디테일 조회 페이지 캐싱
- 브라우저 asset 용 캐시 meta http-equiv="cache-control" content="max-age=3540" 로 지정.
- 둘다 임의로 5분 설정

| 렌더링 최적화 :

- Next/Image 컴포넌트 사용 하여 이미지 캐싱, webp 변환, 리사이징, priority props 로 요청 우선순위 올리기 및 loading='lazy' 속성 적용되지 않도록 처리. ( CLS, LCP 최적화 )
- Routing 별 자동 스플리팅
- API 호출 시 동시에 호출 가능한 API 를 Promise.all 로 병렬요청 하여 API 응답 대기시간 최소화 ( API Prefetch 에 의한 FCP, FID 최적화 )
- link 태그로 API 응답 호스트와 이미지 호스트 도메인을 rel=preconnect, rel=dns-prefetch 연결하여 사전연결 수행

| SEO 최적화 :

- 검색 엔진에 각 페이지가 인덱싱 가능하도록 Next.js 를 사용하여 API Prefetch 및 Server Side Rendering 구현
- public/robots.txt 파일 구성. 사이트맵은 예시로만 작성
- 주요 메타태그 (title, description, canonical url) 에 적절한 문구 임의로 구성
- 오픈 그래프 메타태그에 적절한 문구 임의로 구성. og:image 의 경우 리스트 페이지는 임의로 포켓몬 도감 사진을 가져와 public/pokedic.webp 로 첨부 및 사용. 디테일 페이지는 front_default 이미지 사용
- 트위터 메타태그도 유사하게 구성
- \_app.tsx 에 모든 페이지에서 기본적으로 사용하는 메타태그 구성. robots 방문할수 있도록 구성
- 시맨틱 태그 사용

| Typescript 사용

| 포켓몬 한글 이름 출력
