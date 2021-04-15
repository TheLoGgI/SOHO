// const loading = document.getElementById('loading')
let productData = []

const cartStorage = JSON.parse(localStorage.getItem('userCart'))
const userCart = new Cart(cartStorage)

console.log('userCart.cart: ', userCart.cart);
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

async function init() {
    const products = await getProducts()
    // console.log('products: ', products);
    productData = [...products]
    // userCart.add(productData?.[1])
    // products.forEach(product => {
        // addProduct(product)
    // })
    // loading.style.display =  'none'
}


// Program start
init()

// const itemCartCounter = document.getElementById('cartItems')
// itemCartCounter.textContent = '4'

// function buyItem(id, volume = 1, color = 'black') {
//     let currentCartItems = Number(itemCartCounter.textContent)
//     itemCartCounter.textContent = currentCartItems + 1
// }


// function updateCartItemCount() {
//     // console.log(id, volume, color)
//     let currentCartItems = Number(itemCartCounter.textContent)
//     console.log('currentCartItems: ', currentCartItems);
//     itemCartCounter.textContent = currentCartItems + 1

// }

function getURLParam(param) {
    const urlParams = new URLSearchParams(location.search)
    return urlParams.get('id')
}

function isDifferent(obj1, obj2) {
    console.log('obj1: ', obj1);
    console.log('obj2: ', obj2);
    const id = obj1.id === obj2.id
    const size = obj1.size === obj2.size
    const color = obj1.color === obj2.color
    
    console.log('isDifferent: ', id, size, color);
    return id && size && color
}


document.getElementById('addToCart').addEventListener('click', () => {

    const paramId = getURLParam('id')

    let itemInCart = {}
    if (productData) {
        itemInCart = productData.find(item => Number(paramId) === item.id)
        // console.log('itemInCart: ', itemInCart);

    } else {
        // throw 
        // window.localStorage.getItem()
    }

    let alreadyInCart = localStorage.getItem('inShoppingCart')
    if (alreadyInCart === null) {
        localStorage.setItem('inShoppingCart', JSON.stringify([{
            name: itemInCart.name,
            id: itemInCart.id,
            categories: itemInCart.categories,
            tags: itemInCart.tags,
            description: itemInCart.short_description,
            images: itemInCart.images,
            prices: itemInCart.prices,
            color: 'white',
            size: 'large',
            amount: 1,
            isFavorite: false,
        }]))
        console.log('New Cart')
        return
    }

    // Update
    alreadyInCart = JSON.parse(alreadyInCart)
    console.log('alreadyInCart: ', alreadyInCart);
    const hasSameId = alreadyInCart.find(item => Number(paramId) === item.id)
    console.log('hasSameId: ', hasSameId);
    if (hasSameId !== undefined) {
        // console.log('is NOT Different', !isDifferent(alreadyInCart, hasSameId));
        if (isDifferent(itemInCart, hasSameId)) {
            localStorage.setItem('inShoppingCart', JSON.stringify([...alreadyInCart, {
                name: itemInCart.name,
                id: itemInCart.id,
                categories: itemInCart.categories,
                tags: itemInCart.tags,
                description: itemInCart.short_description,
                images: itemInCart.images,
                prices: itemInCart.prices,
                color: 'white',
                size: 'large',
                amount: Number(alreadyInCart.amount) + Number(hasSameId.amount),
                isFavorite: false,
            }]))
            return
        }
        
    }

    // Create
    localStorage.setItem('inShoppingCart', JSON.stringify([...alreadyInCart, {
        name: itemInCart.name,
        id: itemInCart.id,
        categories: itemInCart.categories,
        tags: itemInCart.tags,
        description: itemInCart.short_description,
        images: itemInCart.images,
        prices: itemInCart.prices,
        color: 'white',
        size: 'large',
        amount: 1,
        isFavorite: false,
    }]))
    // console.log(inShoppingCart)
})
