<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Execute in development

1. Clone the repository
2. Execute

```
npm install
```

3. Have Nest CLI installed

```
npm i -g @nestjs/cli
```

4. Up the database

```
docker-compose up -d
```

5. Clone the `.env.template` file and rename it to `.env`

6. Fill the .env file with new values

7. Run seed

```
http://localhost:3000/api/v2/seed
```

### Stack

- MongoDB
- Nest

# Production Build

1. Create the `.env.prod` file
2. Fill the variables of env of prod
3. Create the image

```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

# Note

Heroku redeploy without changes:

```
git commit --allow-empty -m "Trigger Heroku deploy"
git push heroku <master|main>
```
