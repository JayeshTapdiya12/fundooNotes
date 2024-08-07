const amqp = require('amqplib');

export const sendMessage = async (userData) => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const exchange = 'logs';
        const msg = JSON.stringify(userData);


        await channel.assertExchange(exchange, 'fanout', {
            durable: false
        });


        channel.publish(exchange, '', Buffer.from(msg));
        console.log(" the user register id:", msg);


        setTimeout(async () => {
            await channel.close();
            await connection.close();
        }, 500);

    } catch (error) {
        console.error("Error:", error);
    }
}

sendMessage();

