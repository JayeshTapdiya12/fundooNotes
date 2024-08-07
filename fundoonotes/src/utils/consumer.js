const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err0, connection) => {
    if (err0) {
        throw new err0;
    }
    connection.createChannel((err1, channel) => {
        if (err1) {
            throw new err1;
        }
        const exchange = 'logs';
        channel.assertExchange(exchange, 'fanout', {
            durable: false
        })
        channel.assertQueue('', {
            exclusive: true
        }, (err2, q) => {
            if (err2) {
                throw new err2;
            }
            console.log("msg is waitng in queue", q.queue);
            channel.bindQueue(q.queue, exchange, '')
            channel.consume(q.queue, (msg) => {
                if (msg.content) {
                    console.log("msg is ", msg.content.toString())
                }
            },
                {
                    noAck: true
                })
        })
    })
})