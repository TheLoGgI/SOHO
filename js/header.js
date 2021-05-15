

// Main navigation menu Button
document.getElementById('menuIconButton').addEventListener('click', e => {
    document.getElementById('nav-icon').classList.toggle('open')
    toggleMobilMenu( 
        null, 
        document.getElementById('mainMenuNav'), // Menu Element
        'left' // Menu direction
    )
  })

// Search Button
document.getElementById('searchMenuButton').addEventListener('click', e => {
    toggleMobilMenu(
        e.currentTarget.children[0], // icon path 
        document.getElementById('mobilSearchNav'), // Menu Element
        'down', // Menu direction
        () => document.getElementById('searchInput').focus()
    )
  })

//   Shopping Button
document.getElementById('searchShoppingButton').addEventListener('click', e => {
    toggleMobilMenu(
            e.currentTarget.children[0], // icon path 
            document.getElementById('shoppingCart'), // Menu Element
            'up' // Menu direction
        )
  })

/**
 * Toggle mobil menu
 * @param  {Element} - Icon path on menu button
 * @param  {Element} - Mobil Menu element to target 
 * @param  {String} - Direction of element to appear
 * @param  {Function} - Function is called when menu appears
 * @return {Null}
 */
function toggleMobilMenu(icon, menu, direction, cb) {
    const isShowing = menu.getAttribute('showing')
    
    // Show menu
    if (isShowing === 'false' || isShowing === null ) {
        
        if (icon) icon.style.fill = '#dbac2b'
        if (direction === 'up' || direction === 'down') {
            menu.style.transform = `translateY(0%)`
        } else if (direction === 'left' || direction === 'right') {
            menu.style.transform = `translateX(0%)`
        }
        document.body.classList.add('disabledScroll')
        menu.setAttribute('showing', true)
        cb?.()
        return
    }
    
    // Hide menu
    switch (direction) {
        case 'up': 
            menu.style.transform = `translateY(-140%)`
            break
        case 'down': 
            menu.style.transform = `translateY(140%)`
            break
        case 'left': 
            menu.style.transform = `translateX(-140%)`
            break
        case 'right': 
            menu.style.transform = `translateX(140%)`
            break
    }

    menu.setAttribute('showing', false)
    if (icon) icon.style.fill = '#000'
    document.body.classList.remove('disabledScroll')
    
}


// Big Navigation Menu
const bigmenuBrand = document.getElementById('bigmenuBrand')
const bigmenuCategory = document.getElementById('bigmenuCategory')
const bigMenuHover = document.querySelectorAll('[data-template]')

bigMenuHover.forEach(item => {
    item.addEventListener('mouseenter', e => {
        showBigMenu(item.dataset.template)
    })
})

bigmenuCategory.addEventListener('mouseleave', e => {
    bigmenuCategory.style.transform = `translateY(-140%)`
})

bigmenuBrand.addEventListener('mouseleave', e => {
    bigmenuBrand.style.transform = `translateY(-140%)`
})

/**
 * Toggling Big menu, menus for which to be enabled
 * @param  {String} - Targeted menu
 * @return {Null} 
 */
function showBigMenu(changeTo) {
    if (changeTo === 'brands') {
        bigmenuCategory.style.transform = `translateY(-140%)`
        bigmenuBrand.style.transform = `translateY(0%)`
    } else if(changeTo === 'category') {
        bigmenuBrand.style.transform = `translateY(-140%)`
        bigmenuCategory.style.transform = `translateY(0%)`
    }

}

const cart = document.getElementById('shoppingCart')
document.getElementById('cartIcon').addEventListener('click', () => {

    const state = cart.getAttribute('aria-label')
    if (state === 'closed') {
        cart.style.transform = `translateY(0%)`
        cart.setAttribute('aria-label', 'open')
    }
    else {
        cart.style.transform = `translateY(-140%)`
        cart.setAttribute('aria-label', 'closed')
    }
})

/**
 * Removes loading screen
 * @return {Null} 
 */
function removeLoading() {
    const loadingScene = document.getElementById('loading')
    loadingScene.remove()
}



cart.addEventListener('mouseleave', e => {
    cart.style.transform = `translateY(-140%)`
    cart.setAttribute('aria-label', 'closed')
})

/**
 * Updates basket counter
 * @return {Null} 
 */
function updateBasket() {
    const headerCartItems = document.getElementById('cartItems')
    headerCartItems.textContent = userCart.cart.length
    
}

updateBasket()
basketTemplate()

/**
 * Displays basket items, price and amount
 * @return {Null} 
 */
function basketTemplate() {
    const basket = document.getElementById('shoppingCart')
    const cartItems = userCart.cart
    const key = userCart.keys
    const totalPrice = cartItems.reduce((acc, val) => acc + val.price, 0)

    let html = `<p class="shopping-cart-title">Kurv <span>(${cartItems.length})</span></p> 
    <div class="cart-items">
            ${basketItemTemplate(cartItems, key)}
    </div>

    <div class="shopping-cart-total">`
    if (cartItems.length > 0) {
        html += `
        <div class="cart-delevery">
            <p>Levering</p>
            <p class="delevery-fee"><span>29,00</span> kr</p>
        </div>`
    } 

    html += `
    
        <div class="cart-total">
                <p>Pris i alt (inkl. moms)</p>
                <p class="cart-total-price"><span>${totalPrice},00</span> kr</p>
            </div>
            <a href="#kurv" class="shopping-btn btn">Indkøbskurv</a>
            </div>`

    basket.innerHTML = html
}

/**
 * Displays basket items, price and amount
 * @param {Array} - array of cart items
 * @param {Array} - unique item key for removal 
 * @return {Null} 
 */
function basketItemTemplate(items, key) {
    return items.reduce((acc, val) => {
        return acc += `
        <div class="cart-product">
        <div class="cart-product-image">
            <img src="${val.images[1].src}" alt="${val.name}">
        </div>
        <div class="product-info">
            <p class="product-brand">${val.tags[0].name}</p>
            <p class="product-title">${val.name}</p>
            <p class="product-price">Pris: <span> ${val.price}</span> kr</p>
            
            <div class="product-details">
                <p>Størrelse: <span> ${val.size}</span></p>
                <p>Farve: <span> ${val.color}</span></p>
                <p>Antal: <span> ${val.amount}</span></p>
            </div>
            <button class="remove-item" onclick="removeShoppingItem(this)" data-key="${key.next().value}">Fjern kurv</button>
            
        </div>
    </div>`
    }, '')
     
}

/**
 * Removing shopping item from basket and DOM
 * @param {Element} - Button clicked
 * @return {Null} 
 */
function removeShoppingItem(target) {
    const key = target.getAttribute('data-key')
    userCart.remove(key)
    const cartItem = target.parentNode.parentNode

    cartItem.style.transform = `translateX(-120%)`
    setTimeout(() => {
        basketTemplate()
    }, 300);
    updateBasket()
}


// Fancy image hover animation for desktop Brands Bigmenu
const lakorBrandImage = document.getElementById('lakorBrandImage')
const revolutionBrandImage = document.getElementById('revolutionBrandImage')
const imageSeperatorLine = document.getElementById('imageSeperatorLine')

lakorBrandImage.addEventListener('mouseover', e => {
    revolutionBrandImage.style.clipPath =`polygon(100% 0, 55% 0, 36% 100%, 100% 100%)`
    imageSeperatorLine.style.transform = `translateX(11%) rotate(-70deg)`
})
lakorBrandImage.addEventListener('mouseleave', e => {
    revolutionBrandImage.style.clipPath =`polygon(100% 0, 35% 0, 16% 100%, 100% 100%)`
    imageSeperatorLine.style.transform = `translateX(-9%) rotate(-70deg)`
})

revolutionBrandImage.addEventListener('mouseover', e => {
    imageSeperatorLine.style.transform = `translateX(-29%) rotate(-70deg)`
})
revolutionBrandImage.addEventListener('mouseleave', e => {
    revolutionBrandImage.style.clipPath =`polygon(100% 0, 35% 0, 16% 100%, 100% 100%)`
    imageSeperatorLine.style.transform = `translateX(-9%) rotate(-70deg)`
})