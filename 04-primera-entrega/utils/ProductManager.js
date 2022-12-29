const fs = require('fs')

class ProductManager {
  constructor(path) {
    this.path = path
  }
  
  async getProducts() {    
    try {
      if(await fs.existsSync(this.path)) {
        let products = await fs.promises.readFile(this.path)
        return products = JSON.parse(products)              
      } else {        
        return [] 
      }      
    } catch(error) {
      return `There was an error (${error}) getting the products catalogue`
    }
  }

  async addProduct({title, description, price, thumbnail, code, stock, status}) {
    try {
      let products = await this.getProducts()      
      
      const newProd = {
        title, description, price: parseInt(price), thumbnail, code, stock: parseInt(stock), status: Boolean(status)
      }        
      newProd.id = !products.length ? 1 : products[products.length -1].id + 1

      if(
        !newProd.title ||
        !newProd.description || 
        !newProd.price || 
        !newProd.thumbnail || 
        !newProd.code || 
        !newProd.stock ||
        !newProd.status
        ) {
        return `Please check that all information is included`          
      }
  
      if(!(products.map(prod => prod.code)).includes(code)) {       
        products.push(newProd) 
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))    
      } else { 
        return `The code ${code} for ${title} - ${description} is already in use`
      }
      return newProd

    } catch(error) {
      return `There was a problem adding your product, error: ${error}`
    }    
  }
  
  async getProductById(pid) {
    try {
      const products = await this.getProducts()
      const foundProd = products.find(prod => prod.id === parseInt(pid)) 
      if(!foundProd) {
       return 'Product not found'
      }
      return foundProd 

    } catch(error) {
      return `There was a problem getting your product, error: ${error}`
    }
  }
  
  async updateProduct({title, description, price, thumbnail, code, stock, status}, pid) {
    try {
      const products = await this.getProducts()      
      const foundProd = await this.getProductById(pid)

      if(foundProd !== 'Product not found') {
        const updatedValues = {
          title, description, price: parseInt(price), thumbnail, code, stock: parseInt(stock), status: Boolean(status), id:parseInt(pid)
        }
        
        const index = products.findIndex((prod) => prod.id === foundProd.id)        
       
        products.splice(index, 1, updatedValues)
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t')) 
        return updatedValues
      }

    } catch(error) {
      return `There was an error (${error}) getting the updated product`
    }
  }

  async deleteProduct(pid) {    
    try {
      const products = await this.getProducts()
      const foundProd = await this.getProductById(pid)        
      const index = products.findIndex((prod) => prod.id === foundProd.id)

      if(foundProd !== 'Product not found') {
        products.splice(index, 1)
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t')) 
      }
      return foundProd
    
    } catch(error) {
      return `There was an error (${error}) deleting product`
    }
  }
}


module.exports = ProductManager


