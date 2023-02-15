const { Router } = require('express')
const CartManager = require('../../classes/CartManager')

const router = Router()
const cm = new CartManager()

router.get('/', async (req, res) => {
    const nuevoCarrito = await cm.newCart()
    res.json({ message : `nuevo carrito creado con el id ${nuevoCarrito.id}`})
})


router.get('/:cid', async (req, res) => {
    try {
        const {cid} = req.params
        const listDeCarritos = await cm.getCarts()
        const carritoId = listDeCarritos.find(e => e.id == cid)
        res.json({ message : `pagina del carrito con ID ${carritoId.id}`, ...carritoId})    
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "error al ingresar producto"})
    }
    
})

router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const {cid, pid} = req.params
        const listDeCarritos = await cm.getCarts()
        const carritoId = listDeCarritos.find(e => e.id == cid)
        const productoId = carritoId.products.find(e => e.id == pid)
        if (!productoId){
            const producto = {
                id : pid,
                quantity : 1
            }
            carritoId.products.push(producto)
            await cm.updtCarts(listDeCarritos)
            return res.json({ message : `el carrito con id ${cid} ha sido actualizado`, ...carritoId})
        }
        productoId.quantity += 1
        await cm.updtCarts(listDeCarritos)
        res.json({ message : `el carrito con id ${cid} ha sido actualizado`, ...carritoId})
    } catch (error) {
        console.log(`error al aniadir el producto debido a ${error}`)
    }
})


module.exports = router 