import { Context } from 'grammy';
import { User } from '../lib/database';

export const createUser = async (ctx: Context) => {
    try {
        if (ctx.from) {
            const isExists = await getUser(ctx);
            if (isExists) return;
            const user = await User.create({
                data: {
                    telegram_id: ctx.from.id,
                    username: ctx.from.username,
                    first_name: ctx.from.first_name,
                    last_name: ctx.from.last_name,
                    step: 'NEW'
                }
            });
        }
    } catch (error) {
        console.log('Error during creating user!');
        console.log(error);
        await ctx.reply('/start');
    }
};

export const getUser = async (ctx: Context) => {
    try {
        if (ctx.from)
            return await User.findFirst({
                where: {
                    telegram_id: ctx.from.id
                }
            });
    } catch (error) {
        console.log('Error during creating user!');
        console.log(error);
        await ctx.reply('/start');
    }
};

export const updateUserData = async (ctx: Context) => {
    try {
        if (ctx.from) {
            const user = await getUser(ctx);
            if (user) {
                await User.update({
                    data: {
                        telegram_id: ctx.from.id,
                        username: ctx.from.username,
                        first_name: ctx.from.first_name,
                        last_name: ctx.from.last_name
                    },
                    where: {
                        id: user.id,
                        telegram_id: ctx.from.id
                    }
                });
            }
        }
    } catch (error) {
        console.log('Error during updating user!');
        console.log(error);
        await ctx.reply('/start');
    }
};
