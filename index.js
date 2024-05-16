const express = require('express');
const bodyParser = require('body-parser');
const { WebClient } = require('@slack/web-api');

const app = express();
const port = process.env.PORT || 3000;

const slackToken = process.env.SLACK_BOT_TOKEN;
const web = new WebClient(slackToken);

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/slash-command', async (req, res) => {
    const { text, response_url, channel_id } = req.body;

    const uppercasedText = text.toUpperCase();

    try {
        await web.chat.postMessage({
            channel: channel_id,
            text: uppercasedText,
        });

        res.send(`Your text has been converted to uppercase: ${uppercasedText}`);
    } catch (error) {
        console.error('Error posting message:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
