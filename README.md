# bible-drizzle-api

a barebones bible api for personal use

## endpoints

```
GET /translations
GET /translations/:translationId
GET /books
GET /books/:bookId
GET /books/:bookId/chapters
GET /books/:bookId/chapters/:chapterNumber
GET /books/:bookId/chapters/:chapterNumber/verses
GET /books/:bookId/chapters/:chapterNumber/verses/:verseNumber
```

## prereqs

- [node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)
- [docker](https://www.docker.com/) and [docker compose](https://docs.docker.com/compose/)
- [git](https://git-scm.com/)

## installation & setup

### 1. clone the repo

```bash
git clone https://github.com/jcbura/bible-api.git
cd bible-api
```

### 2. install dependencies

```bash
npm install
```

### 3. start database services

```bash
docker compose up -d
```

### 4. environment configuration

```bash
cp .env.example .env
```

### 5. database setup

```bash
npm run db:generate

npm run db:migrate

docker exec -i bible_drizzle_postgres psql -U postgres -d bible_drizzle_db < dump.sql
```

### 6. start development server

```bash
npm run start:dev
```

## api docs

once the dev server is running, access the api documentation at

[swagger ui](http://localhost:3000/api)
