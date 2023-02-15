const { Server } = require('socket.io')
const ProductManager = require('./classes/ProductManager') 
const app = require('./index.js')
const port = 8080
const pm = new ProductManager

const httpServer = app.listen(port, () => {
    console.log(`server runing at port ${port}`)
})

const io = new Server(httpServer)

io.on('connection', async (socket) =>{
    console.log(`nuevo usuario con id: ${socket.id}`)

    socket.on('submit', data => pm.addProducts(data))
    try {
        const productosSocket = await pm.getProducts()
        socket.emit('listaProductos', productosSocket)
    } catch (error) {
        console.log(`El servidor socket no pudo cargar los produtos: ${error}`)
    }
})