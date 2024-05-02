import { Order } from "../../../../core/domain/entities/order";
import IOrderRepository from "../../../../core/domain/repositories/iOrderRepository";
import dataSource from "../dataSource";

class OrderRepository implements IOrderRepository{
    async find(): Promise<Order[] | []> {
        try {
            const orderRepository = dataSource.getDataSource().getRepository(Order)
            return await orderRepository.find()
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async findById(id: number): Promise<Order | undefined> {
        const orderRepository = dataSource.getDataSource().getRepository(Order)
        return await orderRepository.findOneBy({ idOrder: id }) 
    }

    async update(order: any): Promise<boolean> {
        try {
            const orderRepository = dataSource.getDataSource().getRepository(Order)
            await orderRepository.save(order)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    
    async create (orderObject: any): Promise<Order | undefined> {
        const orderRepository = dataSource.getDataSource().getRepository(Order)
        const order = await orderRepository.save(orderObject)
        return order
    }

    async checkout(order: any): Promise<boolean> {
        try {
            const orderRepository = dataSource.getDataSource().getRepository(Order)
            await orderRepository.delete(order)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

export default OrderRepository