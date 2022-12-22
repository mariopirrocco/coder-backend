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
    } catch(err) {
      return `There was an error (${err}) getting the products catalogue`
    }
  }


  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      const newProd = {
        title, description, price, thumbnail, code, stock
      }  
      
      let products = await this.getProducts()      
      newProd.id = !products.length ? 1 : products[products.length -1].id + 1

      if(
        !newProd.title ||
        !newProd.description || 
        !newProd.price || 
        !newProd.thumbnail || 
        !newProd.code || 
        !newProd.stock ) {
          return `Please check that all information is included`          
        }
  
      if(!(products.map(prod => prod.code)).includes(code)) {       
        products.push(newProd) 
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))    
      } else { 
        return `The code ${code} for ${title} - ${description} is already in use`
      }

      return newProd
    } catch {
      return `There was a problem adding your product, error: ${err}`
    }    
  }

  
  async getProductById(id) {
    try {
      const products = await this.getProducts()
      const foundProd = products.find(prod => prod.id === id) 
      if(!foundProd) {
       return 'Product not found'
      }
      return foundProd 
    
    } catch(err) {
      return `There was a problem getting your product, error: ${err}`
    }
  }
  
 
  
  async updateProduct(id, title, description, price, thumbnail, code, stock) {
    try {
      const products = await this.getProducts()
      const foundProd = await this.getProductById(id)
      
      if(foundProd !== 'Product not found') {
        const updatedValues = {
          title, description, price, thumbnail, code, stock, id
        }
        
        const index = products.findIndex((prod) => prod.id === foundProd.id)        
       
        products.splice(index, 1, updatedValues)
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t')) 
        return updatedValues
      }

    } catch(err) {
      return `There was an error (${err}) getting the updated product`
    }
  }


  async deleteProduct(id) {
    try {
      const products = await this.getProducts()
      const foundProd = await this.getProductById(id)
      
      const index = products.findIndex((prod) => prod.id === foundProd.id)

      if(foundProd !== 'Product not found') {
        products.splice(index, 1)
        await fs.promises.writeFile('./catalogue.json', JSON.stringify(products, null, '\t'))
      }
      return foundProd
    
    } catch(err) {
      return `There was an error (${err}) deleting product`
    }
  }
}



const Catalogue = new ProductManager('./catalogue.json')

module.exports = Catalogue


