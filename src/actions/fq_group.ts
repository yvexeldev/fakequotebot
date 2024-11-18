import { Composer, InputFile } from 'grammy';
import { bot } from '../lib/bot';
import { generateQuote } from '../services/quote';

const composer = new Composer();

composer.command('fqr', async (ctx) => {
    // check if chat is group!!!!
    if (ctx.chat.type == 'group' || ctx.chat.type == 'supergroup') {
        // get replied message!
        if (ctx.message && ctx.message.reply_to_message) {
            const chatId = ctx.chat.id;
            const messageId = ctx.message?.message_id;
            const message = ctx.message.reply_to_message;
            const user_id = message?.from?.id;
            const username = message?.from?.username;
            const first_name = message?.from?.first_name;
            const last_name = message?.from?.last_name;
            console.log(message?.text);
            const text = ctx.message?.text?.split('/fqr')[2].trim();
            const replyText = ctx.message?.text?.split('/fqr')[1].trim();
            const replyChatId = Number(ctx.from?.id);
            const replyName = ctx.from?.last_name
                ? ctx.from.last_name + ' ' + ctx.from.first_name + ' '
                : ctx.from.first_name;
            if (text) {
                console.log({ replyChatId, replyText });
                const buffer = await generateQuote({
                    first_name: first_name || String(ctx.from?.first_name),
                    last_name: last_name || '',
                    text: String(text),
                    user_id: Number(user_id),
                    username: username || '',
                    replyChatId: replyChatId,
                    replyText: replyText,
                    replyName: replyName
                });
                await ctx.api.deleteMessage(chatId, messageId);
                await bot.api.sendSticker(ctx.chat.id, new InputFile(buffer, 'sticker.webp'), {
                    reply_markup: { force_reply: true }
                });
            } else {
                await ctx.reply('Example using: Reply to message: /fq text!');
            }
        }
    }
});

composer.command('fq', async (ctx) => {
    // check if chat is group!!!!
    if (ctx.chat.type == 'group' || ctx.chat.type == 'supergroup') {
        // get replied message!
        if (ctx.message) {
            const chatId = ctx.chat.id;
            const messageId = ctx.message?.message_id;
            const message = ctx.message.reply_to_message;
            const user_id = message?.from?.id;
            const username = message?.from?.username;
            const first_name = message?.from?.first_name;
            const last_name = message?.from?.last_name;
            console.log(message?.text);
            const text = ctx.message?.text?.split('/fq')[1].trim();
            const entities = ctx.message.entities;
            if (text) {
                const buffer = await generateQuote({
                    first_name: first_name || String(ctx.from?.first_name),
                    last_name: last_name || '',
                    text: String(text),
                    user_id: Number(user_id),
                    username: username || '',
                    entities
                });
                await ctx.api.deleteMessage(chatId, messageId);
                await bot.api.sendSticker(ctx.chat.id, new InputFile(buffer, 'sticker.webp'), {
                    reply_markup: { force_reply: true }
                });
            } else {
                await ctx.reply('Example using: Reply to message: /fq text!');
            }
        }
    }
});

// composer.on('msg:forward_origin:user', async (ctx) => {
//     // forwarded id!
//     let user_id;
//     let username;
//     let first_name;
//     let last_name;
//     let text = 'Ronaldo is goat!';
//     if (ctx.message?.forward_origin.type == 'user') {
//         user_id = ctx.message.forward_origin.sender_user.id;
//         username = ctx.message.forward_origin.sender_user.username;
//         first_name = ctx.message.forward_origin.sender_user.first_name;
//         last_name = ctx.message.forward_origin.sender_user.last_name;
//         text = String(ctx.message.text);
//     }
//     const chatId = Number(ctx.from?.id);
//     const emoji_status = ctx.from?.is_premium;
//     console.log({ emoji_status });
//     const buffer = await generateQuote({
//         first_name: first_name || String(ctx.from?.first_name),
//         last_name: last_name || '',
//         text: text,
//         user_id: Number(user_id),
//         username: username || ''
//     });
//     await bot.api.sendSticker(chatId, new InputFile(buffer, 'sticker.webp'));
//     await ctx.reply('<tg-emoji emoji-id="5465178805637226937">👍</tg-emoji>Hello', {
//         parse_mode: 'HTML'
//     });
// });

bot.use(composer.middleware());
