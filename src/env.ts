export const env = {
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID!,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET!,

    EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
    EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER!,
    EMAIL_SERVER_PORT: Number(process.env.EMAIL_SERVER_PORT),
    EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD!,

    EMAIL_FROM: process.env.EMAIL_FROM!,
};
