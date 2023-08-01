# figma plugins

## 🔨 프로젝트 구성

```
|- figma-plugins
  |- packages
    |- figma-api
    |- plugins
    |- types
```

## 🧑‍💻 개발환경

프로젝트를 클론하여 다음 단계를 진행해 주세요.

1. 패키지 설치

```
  yarn
```

2. 환경 변수 설정

- asset-uploader에 있는 `.env.sample` 파일을 각각 `.env.local` 로 복제
- 로컬 https 설정시 USE_SSL 환경변수 true로 적용

3. Figma Plugin id 설정

아래 코드에 figma plugin 개발자 모드에서 생성된 manifest id를 적용

- `/plugins/src/utils/securlyPostMessgae.ts`의 `PLUGIN_ID` 상수
- `/figma-api/manifest.json`의 `id` 프로퍼티값

## 🚀 빌드

TBU

## plugins - https 적용하기

```
$ brew install mkcert nss

$ cd packages/plugins
$ mkdir cert

$ mkcert -install
$ mkcert -key-file cert/cert.key -cert-file cert/cert.pem 'domain.com'

$ yarn dev:local:uploader
```

`.env.local`에 아래 정보 설정 필요

```
USE_SSL=true
HOSTNAME=domain.com
PORT=443
```
