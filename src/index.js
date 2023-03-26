const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');

const TicketController = require('./controllers/ticket_controller');
const EmailService = require('./services/email_service');

const jobs = require('./utils/job');
const { subscribeMessage , createChannel } = require('./utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('./config/serverConfig');


const setupAndStartServer = async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/api/v1/tickets',TicketController.create);

    const channel = await createChannel();
    subscribeMessage(channel , EmailService.subscribeEvents , REMINDER_BINDING_KEY);

    app.listen(PORT , () => {
        console.log(`Server started at ${PORT}`);
        //jobs();
        
    });
}

setupAndStartServer();