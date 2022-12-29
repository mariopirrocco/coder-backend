const { Router } = require('express')
const routerCarts = Router()

const prodManager = require('../ProductManager.js')
const Carts = new prodManager('./db/carts.json')

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
    
  } catch (error) {
    throw new Error(`There was an error getting your items: ${error}`)
  }  
})


module.exports = routerCarts