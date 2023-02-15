const { Router } = require('express')
const ProductsManager = require('../../classes/ProductManager')

const router = Router()
const pm = new ProductsManager()

router.get('/', async (req, res) => {
    try {
        const listaProductos = await pm.getProducts()
        let {limit} = req.query
        if(limit){
        const listaProdFilt = []
        for (let i = 0; i < limit; i++) {
            listaProdFilt.push(listaProductos[i])
        }
        return res.status(200).json (listaProdFilt)
        }
        res.status(200).json(listaProductos)
    } catch (error) {
        console.log(error)
        res.json({message: 'Error al obtener lista de productos'})
    }
    
})

router.post('/', (req, res) => {
    const {title, description, code, price, status, category, thumbnails} = req.body
    let id
    const nuevoProducto = {
        id,
        title,
        description,
        code,
        price,
        status,
        category,
        thumbnails
    }
    pm.addProducts(nuevoProducto)
    res.send({message: 'post ok'})
})

router.get('/:pid', async (req, res) => {
    try {
        const {pid} = req.params
        const listaProductos = await pm.getProducts();
        const productoId = listaProductos.find(prod => prod.id === Number(pid))
        if(productoId != undefined){
            return res.status(200).json(productoId)
        }
        return res.json({ message: `no existe producto con el id ${pid}`})
    } catch (error) {
        console.log(error)
        res.json({ message: 'error al obtener id'})
    }
    
})

router.put('/:pid', async (req, res) => {
    try {
        const {pid} = req.params
        const {title, description, price, status, category} = req.body
        const listaProductos = await pm.getProducts();
        const prodIndex = listaProductos.findIndex(prod => prod.id === Number(pid))
        if(prodIndex !== -1){
            listaProductos[prodIndex].title = title
            listaProductos[prodIndex].description = description
            listaProductos[prodIndex].price = price
            listaProductos[prodIndex].status = status
            listaProductos[prodIndex].category = category
            await pm.updtProducts(listaProductos)
            return res.json({ message: "producto acualizado"})
        }
        return res.json({ message: `no existe producto con el id ${pid}`})
    } catch (error) {
        console.log(`'error al actualizar el archivo: ${error}`)   
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const {pid} = req.params
        const listaProductos = await pm.getProducts();
        const productoIndex = listaProductos.findIndex(e => e.id === Number(pid))
        if(productoIndex !== -1){
            listaProductos.splice(productoIndex, 1)
            pm.updtProducts(listaProductos)
            return res.status(200).json({ message : 'producto elimindo'})
        }
        res.json({ message: `no existe producto con el id ${pid}`})
    } catch (error) {
        console.log(error)
        res.json({ message: 'error al obtener id en delete'})
    }
    
})


module.exports = router