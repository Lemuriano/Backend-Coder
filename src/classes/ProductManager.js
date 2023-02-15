const fs = require('fs')
const productosPath = './data/productos.json'


class ProductsManager{
    
    async getProducts(){
        try {
            if(await fs.existsSync(productosPath)){
                const listaProductos = await fs.promises.readFile(productosPath, 'utf-8')
                const listaProdObj = JSON.parse(listaProductos)
                return listaProdObj    
            }else{
                const listaProductosNueva = new Array
                await fs.promises.writeFile(productosPath, JSON.stringify(listaProductosNueva))
                return listaProductosNueva    
            }
        } catch (err) {
            console.log(err)
        }
    }

    async updtProducts(listaProductosActualizada){
        try {
            if(await fs.existsSync(productosPath)){
                await fs.promises.writeFile(productosPath, JSON.stringify(listaProductosActualizada))
                return console.log('lista actualizada')    
            }
        } catch (error) {
            console.log('error al escribir lista de archivos')
        }
    }
    
    async addProducts(producto){
        try {
            const listaProductos = await fs.promises.readFile(productosPath, 'utf-8')
            const listaProdObj = JSON.parse(listaProductos)
            if (listaProdObj.length === 0){
                producto.id = 1
            }else{
                const prodUltimoId = listaProdObj.length
                const nuevoId = prodUltimoId + 1
                producto.id = nuevoId
            }

            listaProdObj.push(producto)
            const listaProdJson = JSON.stringify(listaProdObj, null, '\t')

            await fs.promises.writeFile(productosPath, listaProdJson)
        } catch (error) {
            console.log(`el valor de productos es ${error}`)
        }
    }
}

module.exports = ProductsManager
