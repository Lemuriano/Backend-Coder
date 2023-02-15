const cartController = require('../controllers/carts/controller.cart')
const productsController = require('../controllers/products/controller.products')
const homeController = require('../controllers/home/controller.home')
const rtprodsController = require('../controllers/realtimeproducts/controller.realtimeproducts')

const router = (app) => {
    app.use('/api/carts', cartController)
    app.use('/api/product', productsController)
    app.use('/home', homeController)
    app.use('/realtimeproducts', rtprodsController)
}

module.exports = router