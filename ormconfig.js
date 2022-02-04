const devEnv = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  host: process.env.PG_HOST,
  post: "5432",
  database: process.env.PG_DB,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  entities: ["./src/entities/**/*.ts"],
  migrations: ["./src/database/migrations/**/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
    entitiesDir: "./src/entities",
  },
  logging: true,
  synchronize: false,
};

const prodEnv = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: ["./dist/src/entities/**/*.js"],
  migrations: ["./dist/src/database/migrations/*.js"],
  cli: {
    migrationsDir: "./dist/src/database/migrations",
  },
  synchronize: false,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
};

const testEnv = {
  type: "sqlite",
  database: ":memory:",
  entities: ["./src/entities/**/*.ts"],
  synchronize: true,
};

let exportModule = undefined;
if (process.env.NODE_ENV === "production") {
  exportModule = prodEnv;
} else if (process.env.NODE_ENV === "test") {
  exportModule = testEnv;
} else {
  exportModule = devEnv;
}

module.exports = exportModule;
