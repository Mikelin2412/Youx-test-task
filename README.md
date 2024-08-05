# Youx-test-task
#### Client:
Running the app:
### `npm start` or `yarn start`
#### Server:

**Create env file and put this code with your own credits:**

```
DATABASE_URL = "postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB_NAME}?schema=public"

POSTGRES_USER = 'your_username'
POSTGRES_PASSWORD = 'your_password'
POSTGRES_DB_NAME = 'your_db_name'
```

**Run docker container:**
### `docker-compose up -d`

**Start server:**
### `npm run start:dev` or `yarn start:dev`