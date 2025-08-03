export const sendMessage = async (userData) => {
    try {
        if (!userData) throw new Error("userData is required");

        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const exchange = 'logs';
        const msg = JSON.stringify(userData);

        await channel.assertExchange(exchange, 'fanout', { durable: false });
        channel.publish(exchange, '', Buffer.from(msg));

        console.log("The user register id:", msg);

        setTimeout(async () => {
            await channel.close();
            await connection.close();
        }, 500);

    } catch (error) {
        console.error("Error:", error);
    }
}

