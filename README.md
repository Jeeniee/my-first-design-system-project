# nwayplay-boilerplate-fe

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Branch
|  name  | description      | url                                 |
| :----: | :--------------- | :---------------------------------- |
| master | -  | -       |

## Available Scripts

### `Clone`

```bash
git clone https://github.com/nwaycorp/nwayplay-boilerplate-fe.git
```

### `Install`

```bash
yarn install     // or npm i
```

### `Start`

```bash
yarn start    // or npm start
```

# Structure

```text
├── configs                 // 환경 변수
│   └── index.ts            
│
├── constants               // 상수 폴더
│   ├── index.ts
│   └── link.ts
│
├── hooks                   // 커스텀 훅 풀더
│    └── index.ts
│
├── libs                    // 디자인 시스템
│   ├── stories            
│   │    ├── components     // 라디오, 셀렉트, 텍스트필드 등
│   │    └── foundation     // 그리드, 아이콘, 타이포그라피
│   └── ... 
│
├── networks                // api 서비스 로직 폴더
│   ├── backend.ts          
│   ├── external.ts         // 외부 api
│   └── nway.ts   
│
├── pages                   // 페이지 폴더
│   ├── 404             
│   ├── home   
│   └── ...      
│
├── routes                  // 라우터 풀더
│    └── index.ts
│
├── store                   // recoil 폴더
│    └── index.ts
│ 
├── stories                 // 프로젝트 전반적으로 사용되는 공통 라이브러리
│   ├── assets              // 이미지   
│   └── components          // 컴포넌트
│
├── types                   // 타입 모음 폴더
│    └── index.ts
│
├── utils                   // 자주쓰는 utils 모음 폴더
│    └── index.ts
│
├── .env.local              // 로컬 환경 변수 폴더
├── .gitignore              // Git 제외 규칙 설정 파일
├── .eslintignore           // eslint 제외 규칙 설정 파일
├── buildspec-dev.yml       // dev 빌드 및 배포커맨드
├── buildspec-prod.yml      // prod 빌드 및 배포 커맨드
├── buildspec-stage.yml     // stage 빌드 및 배포 커맨드
├── craco.config.js         // webpack 오버라이딩 설정 파일
├── react-app-env.d.ts      // Typescript용 React 타입 선언 파일
├── package.json            // 프로젝트 정보 및 의존성 관리 파일
├── README.md               // 문서
├── robots-stage.txt        // 크롤링 관련 robots.txt 파일
├── tsconfig.json           // Typescript 설정 파일
├── tsconfig.extend.json    // Typescript 설정 파일 extend
└── yarn.lock               // 패키지 잠금 파일
```


