import amqp from 'amqplib/callback_api'
import IOrderQueue from '../../../core/domain/repositories/iOrderQueue'
import orderController from '../../driven/controller/orderController'

class Queue implements IOrderQueue {
    channel: amqp.Channel | undefined

    async connect () {
        amqp.connect(process.env.QUEUE_URI || 'amqp://localhost:5672', (error0, connection) => {
            if (error0) throw error0
            connection.createChannel((error1, channel) => {
                if (error1) throw error1
                this.channel = channel
                channel.assertQueue(process.env.QUEUE_NAME || 'orders_queue', { durable: false })
                channel.consume(process.env.QUEUE_NAME || 'orders_queue', orderController.order, { noAck: true})
            })
        })
    }

    async sendToQueue (message: string, queue: string) {
        this.channel?.sendToQueue(queue, Buffer.from(message))
    }

    async getChannel () {
        return this.channel
    }
}

export default new Queue()