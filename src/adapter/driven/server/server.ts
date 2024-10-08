import { Express } from "express-serve-static-core";
import iDrivenAdapter from "../iDrivenAdapter";
import express from "express"
import application from "../controller/applicationController";
import orderController from "../controller/orderController";

class Server implements iDrivenAdapter{
    app: Express
    
    constructor(private port: string) {
        this.app = express()
    }

    async init(): Promise<void> {
        this.setMiddlewares()
        this.setRoutes()
        await this.start()
    }

    setMiddlewares() {
        this.app.use(express.json())

    }

    setRoutes() {
        this.app.get('/ping', application.ping)
        this.app.get('/order/:id', orderController.getStatus)
        this.app.get('/orders', orderController.getOrders)
        this.app.get('/orders/produce:id', orderController.produce)
    }

    async start(): Promise<void> {
        this.app.listen(this.port, () => { console.log(`Server running at port ${process.env.PORT}`) })
    }
}

export default new Server(process.env.PORT || '8002')