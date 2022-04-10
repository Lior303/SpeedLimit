import amqp from 'amqplib/callback_api.js';
import { deserializeJson } from '../utils.js';

class RabbitManager {
    static rabbitManager;

    constructor() {
        this.openChannels = [];
    }

    startListening = (exchangeName, callback) => {
        if(!this.isListening(exchangeName)) {
            this.openChannels.push(exchangeName);

            amqp.connect('amqp://localhost/', (cError, connection) => {
                if(cError) {
                    throw cError;  
                }

                connection.createChannel((error, channel) => {
                    if(error) {
                        throw error;
                    }

                    channel.assertExchange(exchangeName, 'fanout', { durable: true});
                    channel.assertQueue('', { exclusive: true }, (exError, q) => {
                        if(exError) {
                            throw exError;
                        }

                        console.log(`Started listening to ${exchangeName} exchange`);
                        channel.bindQueue(q.queue, exchangeName, '');

                        channel.consume(q.queue, msg => {
                            if(msg.content) {
                                console.log(`Received ${deserializeJson(msg.content)} from ${exchangeName}`);
                                callback(deserializeJson(msg.content));
                            }
                        }, { noAck: true });
                    });
                });
            });
        }
    }

    isListening = (exchangeName) => {
        return (this.openChannels.indexOf(exchangeName) !== -1);
    }
}

export const getRabbitManager = () => {
    if(!RabbitManager.rabbitManager) {
        RabbitManager.rabbitManager = new RabbitManager();
    }

    return RabbitManager.rabbitManager;
}