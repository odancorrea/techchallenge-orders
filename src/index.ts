import 'dotenv/config'
import 'reflect-metadata'
import dataSource from './adapter/driver/infra/dataSource'
import server from './adapter/driven/server/server'
import queue from './adapter/driver/queue/queue'
import orderController from './adapter/driven/controller/orderController'

const bootstrap = async () => {
    queue.connect()
    await dataSource.init()
    await server.init()
    const channel = await queue.getChannel()
    if (channel) channel.consume(process.env.QUEUE_NAME || 'orders_queue', orderController.order)
}

bootstrap()
