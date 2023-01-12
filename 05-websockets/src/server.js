import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './dirname.js'
import viewRoutes from './routes/views.routes.js'
import ProductManager from './utils/ProductManager.js'
import { Server } from 'socket.io'

const app = express()
const PORT = 3000
const httpServer = app.listen(PORT, ()=>{ console.log(`Server is running on port ${PORT}`)})
const io = new Server(httpServer)

app.engine('hbs', handlebars.engine({
  extname: 'hbs',
  defaultLayout: 'main'
}))

app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views/`)
app.use('/css', express.static(`${__dirname}/public/css`))
app.use('/js', express.static(`${__dirname}/public/js`))
app.use(express.static(`${__dirname}/public`))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', viewRoutes)

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts')
})

const CatalogueManager = new ProductManager('../db/catalogue.json')
let catalogue = CatalogueManager.getProducts()

io.on('connection', (socket) => {
  console.log(`You have connected with the ID: ${socket.id} `)
  socket.emit('productsArray', catalogue)

  socket.on('newProduct', (data) => {
    ProductManager.addProduct(data)
    io.emit('productsArray', catalogue)
    console.log('A new product was added')
  })

  socket.on('deleteProduct', (id) => {
    ProductManager.deleteProduct(id)
    io.emit('productsArray', catalogue)
    console,log('The product was deleted')
  })
})