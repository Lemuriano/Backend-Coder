const fs = require('fs')
const cartsPath = './data/carts.json'


class CartManager{

    constructor() {
        this.id = 0
        this.products = [];
    }

    async newCart(){
        try {
            const listaCarts = await fs.promises.readFile(cartsPath, 'utf-8')
            const listaCartsObj = JSON.parse(listaCarts)
            if (listaCartsObj.length === 0){
                this.id = 1
            }else{
                const cartsUltimoId = listaCartsObj.length
                const nuevoId = cartsUltimoId + 1
                this.id = nuevoId
            }
            listaCartsObj.push(this)
            const listaCartJson = JSON.stringify(listaCartsObj, null, '\t')
    
            await fs.promises.writeFile(cartsPath, listaCartJson)
            return this
        } catch (err) {
            console.log(err)
        }
    }

    async getCarts(){
        try {
            if(await fs.existsSync(cartsPath)){
                const listaCart = await fs.promises.readFile(cartsPath, 'utf-8')
                const listaCartObj = JSON.parse(listaCart)
                return listaCartObj    
            }else{
                const listaCartNueva = new Array
                await fs.promises.writeFile(cartsPath, JSON.stringify(listaCartNueva))
                return listaCartNueva
            }
        } catch (err) {
            console.log(err)
        }
    }
    
    async updtCarts(listaCartActualizada){
        try {
            if(await fs.existsSync(cartsPath)){
                await fs.promises.writeFile(cartsPath, JSON.stringify(listaCartActualizada))
                return console.log('carritos actualizados')    
            }
        } catch (error) {
            console.log('error al escribir lista de carritos')
        }
    }
}

module.exports = CartManager