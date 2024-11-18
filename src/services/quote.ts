import fs from 'fs';
import axios from 'axios';

export const generateQuote = async (options: {
    first_name: string;
    last_name?: string;
    user_id: number;
    username?: string;
    text: string;
    entities?: any;
    replyChatId?: number;
    replyText?: string;
    replyName?: string;
}) => {
    console.log({ options });
    const json = {
        type: 'quote',
        format: 'png',
        backgroundColor: '#1b1429',
        width: 512,
        height: 768,
        scale: 2,
        messages: [
            {
                chatId: options.user_id,
                avatar: true,

                from: {
                    id: options.user_id,
                    first_name: options.first_name,
                    last_name: options.last_name,
                    username: options.username,
                    language_code: 'ru',
                    title: options.first_name,
                    // photo: {
                    //     small_file_id: 'AQADAgADCKoxG7Jh9gMACBbSEZguAAMCAAOyYfYDAATieVimvJOu7M43BQABHgQ',
                    //     small_file_unique_id: 'AQADFtIRmC4AA843BQAB',
                    //     big_file_id: 'AQADAgADCKoxG7Jh9gMACBbSEZguAAMDAAOyYfYDAATieVimvJOu7NA3BQABHgQ',
                    //     big_file_unique_id: 'AQADFtIRmC4AA9A3BQAB'
                    // },
                    type: 'public',
                    name: options.first_name + ' ' + options.last_name
                },
                text: options.text,
                replyMessage: {}
            }
        ]
    };

    if (options.replyChatId && options.replyText) {
        json.messages[0].replyMessage = {
            chatId: options.replyChatId,
            text: options.replyText,
            name: options.replyName
        };
    }

    const response = await axios.post('https://bot.lyo.su/quote/generate', json, {
        headers: { 'Content-Type': 'application/json' }
    });
    const buffer = Buffer.from(response.data.result.image, 'base64');
    fs.writeFile('quote.webp', buffer, (err) => {
        if (err) throw err;
    });

    return buffer;
};

export const generateWithoutTelegram = async (options: {
    name: string;
    photo_url?: string;
    text: string;
    replyChatId?: number;
    replyText?: string;
    replyName?: string;
}) => {
    console.log({ photo: options.photo_url, name: options.name, text: options.text });
    const json = {
        type: 'quote',
        format: 'png',
        backgroundColor: '#1b1429',
        width: 512,
        height: 768,
        scale: 4,
        messages: [
            {
                entities: [],
                avatar: true,
                from: {
                    id: 121212,
                    // TO UTF!
                    name: options.name,
                    photo: {
                        url: options.photo_url === 'https://telegram.org/img/t_logo_2x.png' ? '' : options.photo_url
                    }
                },
                text: options.text,
                replyMessage: {}
            }
        ]
    };
    await axios.post(
        'https://bot.lyo.su/quote/generate',
        { ...json },
        {
            headers: { 'Content-Type': 'application/json' }
        }
    );

    const response = await axios.post('https://bot.lyo.su/quote/generate', json, {
        headers: { 'Content-Type': 'application/json' }
    });

    const buffer = Buffer.from(response.data.result.image, 'base64');
    fs.writeFile('quote.webp', buffer, (err) => {
        if (err) throw err;
    });
    return buffer;
};
