
const socket = io()
const table = document.getElementById('table')
const form = document.getElementById('form')
const formSubmit = form.addEventListener('submit', (event) =>{ 
    event.preventDefault()
    const formData = new FormData(form);
    const formDataObject = { id: 0 };
    for (const [key, value] of formData.entries()) {
        formDataObject[key] = value;
    }
    socket.emit('submit', {...formDataObject})
})

socket.on('listaProductos', async (data) => {
    const datos = await data
    table.innerHTML = `<tr>
                            <td>Nombre</td>
                            <td>Descripcion</td>
                            <td>Precio</td>
                            <td>Categoria</td>
                        </tr>`
    datos.map((producto) => {
        const filaProducto = document.createElement("tr")
        filaProducto.innerHTML = `<td>${producto.title}</td>
                                    <td>${producto.description}</td>
                                    <td>${producto.price}</td>
                                    <td>${producto.category}</td> 
                                `
        table.appendChild(filaProducto)
      });
    
})

