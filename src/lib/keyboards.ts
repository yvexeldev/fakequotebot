import { Keyboard } from 'grammy';

export default {
    menu: new Keyboard().text('Generate 💬').row().text('Guide ❓').row().resized().oneTime()
};
