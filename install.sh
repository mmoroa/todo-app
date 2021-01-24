cd server
npm i

touch tasks.db

npx knex migrate:latest
npx knex seed:run --specific role_seeds.ts
npx knex seed:run --specific user_seeds.ts



cd ../web
npm i

