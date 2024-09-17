// configure the setting for database migration


import {config} from 'dotenv'
import {defineConfig} from 'drizzle-kit'

config({path:".env.local"})

export default defineConfig({

    schema: "./src/lib/db/schema.ts", // structure of db
    out:"./supabase/migrations", // where migration files will be stored
    dialect:"postgresql",  // db type
    dbCredentials:{   // connect to db
        url: process.env.DATABASE_URL!,
    },
});

