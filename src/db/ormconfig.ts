import * as path from "path";

// TODO: Enable db caching using redis.
export default {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    schema: process.env.DB_SCHEMA,
    synchronize: false,
    migrationsRun: true,
    migrationsTableName: "migrations_tg",
    entities: [path.join(__dirname, "..", "/**/*.entity.{js,ts}"), path.join(__dirname, "..", "entities", "*.*")],
    migrations: ["src/db/migrations/*{.ts,.js}"],
    cli: {
        // entitiesDir: path.join(__dirname, "..", "entities"),
        migrationsDir: "src/db/migrations"
    }
};
