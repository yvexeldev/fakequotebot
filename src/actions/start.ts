import { Composer, Context, InputFile } from 'grammy';
import { bot } from '../lib/bot';
import { generateQuote } from '../services/quote';
import messages from '../lib/messages';
import keyboards from '../lib/keyboards';
const composer = new Composer();

composer.command('start', async (ctx: Context) => {
    const chatId = Number(ctx.from?.id);

    const message = await ctx.reply(messages.mainMenu(ctx), {
        parse_mode: 'HTML',
        reply_markup: keyboards.menu
    });

    await ctx.pinChatMessage(message.message_id);
    // const buffer = await generateQuote({
    //     first_name: String(ctx.from?.first_name),
    //     last_name: ctx.from?.last_name || '',
    //     text: 'Developer: @abdusalomov_azam',
    //     user_id: chatId,
    //     username: ctx.from?.username || ''
    // });
    // if (ctx.chat?.type == 'private') await bot.api.sendSticker(chatId, new InputFile(buffer, 'sticker.webp'));
    // else await ctx.replyWithSticker(new InputFile(buffer, 'sticker.webp'));
});

bot.use(composer.middleware());
