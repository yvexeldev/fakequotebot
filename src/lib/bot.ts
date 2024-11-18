import { Bot } from 'grammy';
import { getEnv } from './env_config';

const BOT_TOKEN = getEnv('BOT_TOKEN');
const bot = new Bot(BOT_TOKEN);

export { bot };
