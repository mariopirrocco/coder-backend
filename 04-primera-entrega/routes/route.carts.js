const { Router } = require('express')
const routerCarts = Router()

const cartManager = require('../utils/CartManager.js')
const Carts = new cartManager('./db/carts.json')

const prodManager = require('../utils/ProductManager')
const Catalogue = new prodManager('./db/catalogue.json')

routerCarts.get('/', (req, res) => {
  res.send('loading cart')
})

routerCarts.post('/', async (req, res) => {  
  try {
    res.send( await Carts.createCart() )
  } catch (err) {
    res.send(`There was an error: ${err} setting your cart`)
  }
})

routerCarts.post('/:cid/product/:pid', async (req, res) => {
  try {
    res.send( await Carts.addToCart(req.params) )
  } catch (error) {
    throw new Error(`There was an error adding your item: ${error}`)
  }
})

routerCarts.get('/:cid', async (req, res) => {
  try {
    const inStore = await Catalogue.getProducts()
      
    const cart = await Carts.getCart(req.params.cid)
    const ids = await cart.products.map(prod => prod)

    const loadedItems = []
    
    for( id of ids) {
      inStore.map((prod) => {
        if(prod.id == id.id) {
          loadedItems.push({title: prod.title, quantity: id.quantity})
        }
      })
    }
    
    res.send( loadedItems )

  } catch (error) {
    throw new Error(`There was an error getting your items: ${error}`)
  }  
})


module.exports = routerCarts