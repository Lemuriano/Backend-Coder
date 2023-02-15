const { Router } = require('express')
const ProductManager = require('../../classes/ProductManager')

const router = Router()
const pm = new ProductManager()

router.get('/', async (req, res) => {
    try {
        const productos = await pm.getProducts()
        console.log(productos)
        res.render('home', {productos})
    } catch (error) {
        res.status(500).send(console.log('error al obtener lista de productos'))
    }
})

module.exports = router