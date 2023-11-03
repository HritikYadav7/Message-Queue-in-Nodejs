const amqp = require('amqplib');

// Connection URL to your RabbitMQ server
const messageQueueUrl = 'amqp://localhost';

async function createMessageQueue() {
  try {
    // Connect to the RabbitMQ server
    const connection = await amqp.connect(messageQueueUrl);
    const channel = await connection.createChannel();

    // Declare a queue named 'my_queue'
    const queueName = 'my_queue';
    await channel.assertQueue(queueName, { durable: false });

    // Send a message to the queue
    const message = 'Hello, RabbitMQ!';
    channel.sendToQueue(queueName, Buffer.from(message));
    console.log(`Sent: ${message}`);

    // Consume messages from the queue
    channel.consume(queueName, (msg) => {
      console.log(`Received: ${msg.content.toString()}`);
    }, { noAck: true });
  } catch (error) {
    console.error('Error:', error);
  }
}

createMessageQueue();
