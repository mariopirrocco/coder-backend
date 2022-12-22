const express = require('express')
const app = express()
const port = 8080

const Catalogue = require('./ProductManager')

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.send('Welcome')
})

app.get('/products', async (req, res) => {
  let limit = req.query.limit
  try {
    if(limit === 0 || !limit) {
      res.json(await Catalogue.getProducts())
    } else {
      const products = await Catalogue.getProducts()
      const selectedProducts = products.splice(0, limit)
      res.json(selectedProducts)
    }
  } catch (err) {
    res.send(`There was an error: ${err} getting your products`)
  }
})

app.get('/products/:pid', async (req, res) => {
  const pid = parseInt(req.params.pid)  
  const product = await Catalogue.getProductById(pid)
  if(product) {
    res.json(product)
  } else {
    res.send('Product not found')
  }
})


const server = app.listen(port, () => {
	console.log('Server is up and running')

})