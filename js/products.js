// const loading = document.getElementById('loading')
let productData = []

const cartStorage = JSON.parse(localStorage.getItem('userCart'))
const userCart = new Cart(cartStorage)

// console.log('userCart.cart: ', userCart.cart);
// https://blog.abelotech.com/posts/number-currency-formatting-javascript/
function currencyFormat(num) {
    return Number(num.substring(0, num.length - 2)).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' DKK'
  }


function addProduct(product) {
    const products = document.getElementById('products')
    const productImage = [...product.images]
    const productHTML = `
    <div class="card">
    <img src="${productImage[0].src || 'https://via.placeholder.com/150'}" alt="" class="card-image" width="300" height="300">
    <div class="product-details">
        <div class="product-heading">
            <p class="product-title">${product.name}</p>
        </div>
        <div class="product-description">
            ${product.short_description || product.description}
        </div>
        <button class="btn buy-product" onclick="buyItem(${product.id}, 2, 'black')"> 
                <i class="fas fa-cart-plus">
                </i>Køb ${currencyFormat(product.prices.price)}
        </button>
    </div>
</div>`

products.insertAdjacentHTML('afterbegin', productHTML)
}

async function getProducts() {
    const data = await (await fetch('https://soho.lasseaakjaer.com/wp-json/wc/store/products?fbclid=IwAR2Y7MlLp1ZrWj4qIY4XKVJ8h0PeEX4odxGvqkKSFHU0_jYs8chHqVMebJ8')).json()
    
    return data
}

(async function init() {
    const products = await getProducts()
    productData = [...products]

    // loading.style.display =  'none'
})()


// const
function getURLParam(param) {
    const urlParams = new URLSearchParams(location.search)
    return urlParams.get(param)
}

document.getElementById('addToCart').addEventListener('click', () => {

    const paramId = getURLParam('id') || 62

    let itemInCart
    if (productData) {
        itemInCart = productData.find(item => Number(paramId) === item.id)
        console.log('itemInCart: ', itemInCart);

    } else {
        // throw 
        // window.localStorage.getItem()
    }

    userCart.add({
        name: itemInCart.name,
        id: itemInCart.id,
        categories: itemInCart.categories,
        tags: itemInCart.tags,
        description: itemInCart.short_description,
        images: itemInCart.images,
        prices: itemInCart.prices,
        color: 'white',
        size: 'medium',
        amount: 1,
        isFavorite: false,
    })

})
