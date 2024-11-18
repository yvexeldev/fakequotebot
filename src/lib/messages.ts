import { Context } from 'grammy';

export default {
    mainMenu: (ctx: Context) => {
        return `👋 Yo, ${ctx.from?.first_name}! Welcome to the <b><a href='https://t.me/fakequote_bot'>Fake Quote Generator Bot</a></b>! 🎉\n\nLet’s get creative with some totally made-up quotes!\n\n<b>In Groups Only:</b>\n- <code>/fq &lt;some_text&gt;</code> – Make up a quote with random vibes! (group only, use it by replying to target user's message!)\n- <code>/fqr &lt;your_question&gt;</code> / <code>/fqr &lt;their_answer&gt;</code> – Fake a Q&A quote! Use it by replying to someone’s message.\n\n<b>Anywhere (Groups/Private):</b>\n- <code>/generate &lt;username&gt; &lt;your_text&gt;</code> – Create a fake quote from anyone, anywhere!\n\n<b>Inline (Because why not?):</b>\n- <code>@fakequote_bot &lt;username&gt; &lt;fake_text&gt; /fq</code> – Use me inline! Just don’t forget that <code>/fq</code> at the end!\n\n<b>And if you're more of a button person:</b>\n- <b>Generate 💬</b> – Tap to create a quote!\n- <b>Guide ❓</b> – Need help? I got you.\n\nNow go wild and make up some epic quotes! 🔥\n\nBot Updates: <b>@fakequotly</b>`;
    }
};
