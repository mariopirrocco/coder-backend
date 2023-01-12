import { Router } from 'express'
import express from 'express'
import ProductManager from '../utils/ProductManager.js'

const CatalogueManager = new ProductManager('../db/catalogue.json')

const router = express.Router()
let catalogue = CatalogueManager.getProducts()

router.get('/', (req, res) => {
  res.render('home', {catalogue})
})

export default router;