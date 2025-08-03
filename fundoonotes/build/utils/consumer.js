"use strict";

var amqp = require('amqplib/callback_api');
amqp.connect('amqp://localhost', function (err0, connection) {
  if (err0) {
    throw new err0();
  }
  connection.createChannel(function (err1, channel) {
    if (err1) {
      throw new err1();
    }
    var exchange = 'logs';
    channel.assertExchange(exchange, 'fanout', {
      durable: false
    });
    channel.assertQueue('', {
      exclusive: true
    }, function (err2, q) {
      if (err2) {
        throw new err2();
      }
      console.log("msg is waitng in queue", q.queue);
      channel.bindQueue(q.queue, exchange, '');
      channel.consume(q.queue, function (msg) {
        if (msg.content) {
          console.log("msg is ", msg.content.toString());
        }
      }, {
        noAck: true
      });
    });
  });
});