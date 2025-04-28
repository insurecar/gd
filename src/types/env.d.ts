declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string
        DATABASE: string
        DATABASE_PASSWORD: string
        CONNECTION_STRING: string
    }
}