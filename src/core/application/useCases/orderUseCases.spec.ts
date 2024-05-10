import OrderRepository from "../../../adapter/driver/infra/repositories/orderRepository"
import OrderUseCases from "./orderUseCases"

describe('OrderUseCases', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('deve criar uma nova order', async () => {
        //arrange
        const payload = {
            idOrder:1,
            date: new Date(),
            client:1,
            products:[1,2.3]
        }

        const mock = {
            id:1,
            idOrder:1,
            date: new Date(),
            status:'new',
            client:1,
            products:[1,2.3]
        }

        const orderRepository = new OrderRepository()
        orderRepository.create = jest.fn().mockResolvedValue(mock)
        const orderUseCase = new OrderUseCases(orderRepository)

        //act
        const order = await orderUseCase.create(payload)

        //assert
        expect(order).toBeInstanceOf(Object)
    })

    it('deve buscar o status de uma order', async () => {
        //arrange
        const payload = 1

        const mock = {
            id:1,
            idOrder:1,
            date: new Date(),
            status:'paid',
            client:1,
            products:[1,2.3]
        }

        const orderRepository = new OrderRepository()
        orderRepository.findById = jest.fn().mockResolvedValue(mock)
        const orderUseCase = new OrderUseCases(orderRepository)

        //act
        const orderStatus = await orderUseCase.getStatus(payload)

        //assert
        expect(orderStatus).toBe('paid')
    })

    it('deve retornar todas as orders', async () => {
        //arrange
        const mock = [{
            id:1,
            idOrder:1,
            date: new Date(),
            status:'paid',
            client:1,
            products:[1,2.3]
        }]

        const orderRepository = new OrderRepository()
        orderRepository.find = jest.fn().mockResolvedValue(mock)
        const orderUseCase = new OrderUseCases(orderRepository)

        //act
        const orders = await orderUseCase.getOrders()

        //assert
        expect(Array.isArray(orders)).toBe(true)
        expect(orders.length).toBe(1)
    })
})