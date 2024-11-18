import 'dotenv/config';

export const getEnv = (key: string) => {
    if (process.env[key]) return process.env[key];
    else throw new Error(`Env variable ${key} not found!`);
};