import { bot } from './lib/bot';
import './actions';
import { prisma } from './lib/database';

async function bootstrap() {
    console.log('🤖 Bot starting...');
    bot.start({
        drop_pending_updates: true
    }).catch((error) => {
        console.log('Error!', error);
    });
}

bootstrap()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch((err) => {
        console.error('Error occured while bootrapping application! -> ', err);
    });
