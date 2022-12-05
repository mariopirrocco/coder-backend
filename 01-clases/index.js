class ProductManager {
  constructor(title, description, price, thumbnail, code, stock) {
    this.products = []
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const newProd = {
      title, description, price, thumbnail, code, stock
    }
    
    newProd.id = !this.products.length ? 1 : this.products[this.products.length -1].id + 1
    
    if(
      !newProd.title ||
      !newProd.description || 
      !newProd.price || 
      !newProd.thumbnail || 
      !newProd.code || 
      !newProd.stock ) {
        console.log(`Please check that all information is included`)
        return
      }

    if(!(this.products.map(prod => prod.code)).includes(code)) { 
      this.products.push(newProd) 
    } else { 
      console.log(`The code ${code} for ${title} - ${description} is already in use`) 
    }

    return newProd
  }
  
  getProductById(id) {
    const foundProd = this.products.find(prod => prod.id === id) 
    foundProd ? console.log(foundProd) : console.log('Product not found')
    return foundProd
  }
  
  getProducts() {
    console.log(this.products)
    return(this.products)
  }
}

const summerCatalogue = new ProductManager()

summerCatalogue.addProduct('Screwdriver', 'Phillips style',30, 'no image', '23223', 3)
summerCatalogue.addProduct('Screwdriver', 'Flat style', 60, 'no image', '23223', 3)
summerCatalogue.addProduct('Wrench', '6" adjustable', 160, 'no image', '23228', 3)

summerCatalogue.getProducts()
summerCatalogue.getProductById(5)

