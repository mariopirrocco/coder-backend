console.log('loaded')

const socket = io('http://localhost:3000')
  let productsArray = []
  const submitBtn = document.querySelector('#submit')
  submitBtn.addEventListener('click', addNewProd)

  const addNewProd = (e) => {
    e.preventDefault()
    let product = {
      'title': document.querySelector('#title').value,
      'description': document.querySelector('#description').value,
      'price': document.querySelector('#price').value,
      'thumbnail': document.querySelector('#thumbnail').value,
      'code': document.querySelector('#code').value,
      'stock': document.querySelector('#stock').value,
    }

    socket.emit('newProduct', product)
  }

  const deleteProd = (id) => {
    socket.emit('deleteProduct', id)
  }

  socket.on('productsArray', (data) => {
    const products = document.querySelector('#products')
    products.innerHTML = ''

    data.map((prod) => {
      products += `
        <tr>
          <td>${prod.title}</td>
          <td>${prod.description}</td>
          <td>${prod.price}</td>
          <td>${prod.thumbnail}</td>
          <td>${prod.code}</td>
          <td>${prod.stock}</td>
        </tr>
      `
    })
  })