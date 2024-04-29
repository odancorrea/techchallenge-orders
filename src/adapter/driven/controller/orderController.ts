import { Request, Response } from 'express'
import OrderUseCases from '../../../core/application/useCases/orderUseCases'
import OrderRepository from '../../driver/infra/repositories/orderRepository'

class OrderController {
    async order(queueObject: any) {
        const orderRepository = new OrderRepository()
        const orderUseCase = new OrderUseCases(orderRepository)
        const order = await orderUseCase.create(queueObject)
        if (order) await orderUseCase.produce(order)
    }

    async getStatus(req: Request, res: Response) {
        const orderRepository = new OrderRepository()
        const orderUseCase = new OrderUseCases(orderRepository)
        const status = await orderUseCase.getStatus(parseInt(req.params.id))
        res.status(200).send(status)
    }
}

export default new OrderController()