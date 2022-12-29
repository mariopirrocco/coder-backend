const express = require('express')
const app = express()
const port = 8080


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(`${__dirname}/public`))

const routerProducts = require('./routes/route.products.js')
const routerCarts = require('./routes/route.carts.js')

app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)


const server = app.listen(port, () => {
	console.log('Server is up and running')

})