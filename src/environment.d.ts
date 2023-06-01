export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PUBLIC_ADDRESS: string;
            ENV: "prod" | "dev";
            PORT: number,
            DATABASE_URI?: string
        }
    }
}