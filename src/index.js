const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');

// const { sendBasicEmail } = require('./services/email_service');

const cron = require('node-cron');

const setupAndStartServer = () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.listen(PORT , () => {
        console.log(`Server started at ${PORT}`);

        // sendBasicEmail(
        //     'support@admin.com',
        //     'jdaltan140@gmail.com',
        //     'This is a testing mail',
        //     'Hey, how are you, I hope you like the support'
        // );

        cron.schedule('*/2 * * * *', () => {
            console.log('running a task every two minutes');
        });
    });
}

setupAndStartServer();