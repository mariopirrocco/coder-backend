const { Router } = require('express')
const routerCarts = Router()



const cartManager = require('../utils/CartManager.js')
const Carts = new cartManager('./db/carts.json')

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
    res.send( await Carts.getCart(req.params.cid) )
  } catch (error) {
    throw new Error(`There was an error getting your items: ${error}`)
  }  
})


module.exports = routerCarts