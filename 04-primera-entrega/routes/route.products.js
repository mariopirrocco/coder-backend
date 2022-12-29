const { Router } = require('express')
const routerProducts = Router()

const prodManager = require('../utils/ProductManager')
const Catalogue = new prodManager('./db/catalogue.json')

routerProducts.get('/', async (req, res) => {
  let limit = req.query.limit
  try {
    if(limit == 0 || !limit) {
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

routerProducts.get('/:pid', async (req, res) => {
  try {
    const data = await Catalogue.getProductById(req.params.pid)
    res.json(data)
  } catch (error) {
    throw new Error(`There was an error getting your item: ${error}`)
  }  
})

routerProducts.post('/', async (req, res) => {
  try {
    res.json({ id: await Catalogue.addProduct(req.body) })
  } catch (error) {
    throw new Error(`There was an error adding your item: ${error}`)
  }
})

routerProducts.put('/:pid', async (req, res) => {
  try {    
    res.json({ id: await Catalogue.updateProduct(req.body, req.params.pid) })
  } catch (error) {
    throw new Error(`There was an error updating your item: ${error}`)
  }
})

routerProducts.delete('/:pid', async (req, res) => {
  try {
    const data = await Catalogue.deleteProduct(req.params.pid)
    res.json(data)
  } catch (error) {
    throw new Error(`There was an error getting your item: ${error}`)
  } 
})

module.exports = routerProducts