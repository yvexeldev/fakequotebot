import { Composer, Context, InputFile } from 'grammy';
import { bot } from '../lib/bot';
import { generateQuote, generateWithoutTelegram } from '../services/quote';
import { getUserInfo } from '../services/telegram';

const composer = new Composer();

composer.command('generate', async (ctx: Context) => {
    const data = ctx.message?.text?.split(' ');
    const text = ctx.message?.text?.split('/generate').join(' ').trim().split(' ').slice(1).join(' ');

    if (data) {
        const userInfo = await getUserInfo(data[1]);

        if (userInfo) {
            if (
                userInfo.name == 'Telegram – a new era of messaging' ||
                userInfo.name == `Telegram: Contact @${data[1]}`
            ) {
                return await ctx.reply('This user does not exist!');
            }
            const username = userInfo.name;
            const imageUrl = userInfo.imageUrl;
            if (text) {
                const buffer = await generateWithoutTelegram({
                    name: username,
                    photo_url: imageUrl,
                    text: text
                });
                if (ctx.chat) {
                    await bot.api.sendSticker(ctx.chat.id, new InputFile(buffer, 'sticker.webp'));
                }
            }
        }
    }
});

composer.on('inline_query', async (ctx) => {
    try {
        const text = ctx.inlineQuery?.query;
        const user = text.split(' ')[0];
        const message = ctx.inlineQuery.query.split(' ').slice(1).join(' ');
        const userInfo = await getUserInfo(user);

        if (message.endsWith('/fq')) {
            const text = message.split('/fq')[0].trim();

            console.log({ text, userInfo });
            if (userInfo) {
                if (
                    userInfo.name == 'Telegram – a new era of messaging' ||
                    userInfo.name == `Telegram: Contact @${user}`
                ) {
                    return await ctx.answerInlineQuery(
                        [
                            {
                                type: 'article',
                                id: '1',
                                title: 'This user does not exist!',
                                input_message_content: {
                                    message_text: 'This user does not exist!\n\nDeveloper - @abdusalomov_azam'
                                }
                            }
                        ],
                        { cache_time: 5 }
                    );
                } else {
                    const buffer = await generateWithoutTelegram({
                        name: userInfo?.name,
                        photo_url: userInfo?.imageUrl,
                        text
                    });
                    const sticker = await bot.api.sendSticker(-1002414340100, new InputFile(buffer, 'sticker.webp'));
                    await ctx.answerInlineQuery(
                        [
                            {
                                type: 'sticker', // Specify that this is a sticker result
                                id: '1',
                                sticker_file_id: sticker.sticker.file_id // Use the sticker file_id
                            }
                        ],
                        { cache_time: 5 }
                    );
                }
            }
        } else {
            return await ctx.answerInlineQuery(
                [
                    {
                        type: 'article',
                        id: '1',
                        title: 'Type /fq at the end of the message!',
                        input_message_content: {
                            message_text:
                                'Type /fq at the end of the message!\nFor example: yvexel I am not a programmer /fq \n\nDeveloper - @abdusalomov_azam'
                        }
                    }
                ],
                { cache_time: 5 }
            );
        }
    } catch (error) {
        console.log('Error!');
        console.log(error);
    }
});

bot.use(composer.middleware());
