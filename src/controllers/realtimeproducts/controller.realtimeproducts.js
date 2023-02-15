const { Router } = require('express')
const router = Router()

router.get('/', async (req, res) => {
    try {
        res.render('realtimeproducts', {})
    } catch (error) {
        res.status(500).send(console.log('error al obtener lista de productos'))
    }
})



module.exports = router