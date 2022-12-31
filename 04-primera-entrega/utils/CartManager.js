const fs = require('fs')

class CartManager {
  constructor(path) {
    this.path = path
  }

  async listCarts() {
    try {
      if(await fs.existsSync(this.path)) {
        const carts = JSON.parse(await fs.promises.readFile(this.path))
        return carts
      } else {
        return null
      }
    } catch (error) {
      return `There was an error (${error}) getting your carts`
    }
  }
  
  async createCart() {
    try {
      let carts = await this.listCarts()
      if(!carts) {
        const cart = [
          { 
            id: 1, 
            products: [] 
          }
        ]
        carts = await fs.promises.writeFile(this.path, JSON.stringify(cart))
        return cart
                  
      } else {        
        const lastId = carts[carts.length-1].id
        const newCart = { id: lastId + 1, products: []}
        
        carts.push(newCart)
        const updatedCarts = await fs.promises.writeFile(this.path, JSON.stringify(carts))
        return carts
      }
      
    } catch(error) {      
      return `There was an error (${error}) creating your cart`
    }
  }
  
  async addToCart({cid, pid}) {
    try {
      const carts = await this.listCarts()
      const cartIndex = carts.findIndex((cart) => cart.id === parseInt(cid))       
      if(cartIndex === -1 || carts[cartIndex]['products'] === undefined) return 'This cart is an undefined cart'

      const productIndex = carts[cartIndex]['products'].findIndex((iProd) => iProd.id == pid )
      let inCart = carts[cartIndex]['products'].some((prodId) => prodId.id == pid)
      
      if(inCart) {
        carts[cartIndex]['products'][productIndex]['quantity'] += 1
      } else {
        carts[cartIndex]['products'].push({ 'id': pid, 'quantity': 1})
      }

      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'))
      return carts;

    } catch (error) {
      return `There was an error (${error}) adding items to your cart`
    }
  }

  async getCart(cid) {
    try {
      let carts = await this.listCarts()
      let cart = carts.find((cart) => cart.id === Number(cid))
      if(cart) {
        return cart
      } else {
        return 'There is no cart with the specified id'
      }
      
    } catch (error) {
      return 'There is no cart with the specified id'
    }
  }
}

module.exports = CartManager
