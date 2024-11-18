import axios from 'axios';
import he from 'he'; // Import the he library

export const getUserInfo = async (username: string) => {
    try {
        if (username.startsWith('@')) username = username.slice(1);

        const chatInfo = await axios.get(`https://t.me/${username}`);
        const htmlResponse = chatInfo.data;

        let nameStart = htmlResponse.indexOf('property="og:title" content="') + 'property="og:title" content="'.length;
        let nameEnd = htmlResponse.indexOf('"', nameStart);
        let name = htmlResponse.slice(nameStart, nameEnd);

        // Decode HTML entities to fix issues like &#39; becoming '
        name = he.decode(name);

        // Extract the profile image URL
        let imageUrlStart =
            htmlResponse.indexOf('property="og:image" content="') + 'property="og:image" content="'.length;
        let imageUrlEnd = htmlResponse.indexOf('"', imageUrlStart);
        let imageUrl = htmlResponse.slice(imageUrlStart, imageUrlEnd);

        return { name, imageUrl };
    } catch (error) {
        console.log(`Error during getting user info!\nUsername: ${username}`, error);
    }
};

