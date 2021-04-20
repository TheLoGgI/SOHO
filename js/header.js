// let isMobilNavigationShowing = false


document.getElementById('menuIconButton').addEventListener('click', e => {
    document.getElementById('nav-icon').classList.toggle('open')
    toggleMainMenuNavigation()
  })

document.getElementById('searchMenuButton').addEventListener('click', e => {
    e.currentTarget.children[0].style.fill = '#dbac2b' /* Primary yellow */
    toggleSearchMenu(e.currentTarget.children[0])
    document.getElementById('searchInput').focus()
  })


function toggleMainMenuNavigation() {
    const menu = document.getElementById('mainMenuNav')
    if (menu.style.transform === 'translateX(0%)') {
        menu.style.transform = `translateX(-140%)`
        document.body.style.overflow = 'auto'
        return
    }

    menu.style.transform = `translateX(0%)`
    document.body.style.overflow = 'hidden'
}

function toggleSearchMenu(buttonTarget) {
    const menu = document.getElementById('mobilSearchNav')
    // hidden - off
    if (menu.style.transform === 'translateY(0%)') {
        buttonTarget.style.fill = '#000'
        menu.style.transform = `translateY(140%)`
        document.body.style.overflow = 'auto'
        return
    }
    // Showing - on
    buttonTarget.style.fill = '#dbac2b'
    menu.style.transform = `translateY(0%)`
    document.body.style.overflow = 'hidden'
}

// Big Navigation Menu
const bigmenuBrand = document.getElementById('bigmenuBrand')
const bigmenuCategory = document.getElementById('bigmenuCategory')
const bigMenuHover = document.querySelectorAll('[data-template]')

console.log('bigMenuHover: ', bigMenuHover);
bigMenuHover.forEach(item => {
    item.addEventListener('mouseenter', e => {
        showBigMenu(item.dataset.template)
    })
})


bigmenuCategory.addEventListener('mouseleave', e => {
    bigmenuCategory.style.transform = `translateY(-120%)`
})

bigmenuBrand.addEventListener('mouseleave', e => {
    bigmenuBrand.style.transform = `translateY(-120%)`
})

function showBigMenu(changeTo) {
    if (changeTo === 'brands') {
        bigmenuCategory.style.transform = `translateY(-120%)`
        bigmenuBrand.style.transform = `translateY(0%)`
    } else if(changeTo === 'category') {
        bigmenuBrand.style.transform = `translateY(-120%)`
        bigmenuCategory.style.transform = `translateY(0%)`
    }

}

const cart = document.getElementById('shoppingCart')
document.getElementById('cartIcon').addEventListener('click', () => {
    // cart.style.transform = `translateY(-120%)`
    const state = cart.getAttribute('aria-label')
    console.log('state: ', state);
    if (state === 'closed') {
        cart.style.transform = `translateY(0%)`
        cart.setAttribute('aria-label', 'open')
    }
    else {
        cart.style.transform = `translateY(-120%)`
        cart.setAttribute('aria-label', 'closed')
    }
})



cart.addEventListener('mouseleave', e => {
    cart.style.transform = `translateY(-120%)`
    cart.setAttribute('aria-label', 'closed')
})

function updateBasket() {
    const headerCartItems = document.getElementById('cartItems')
    headerCartItems.textContent = userCart.cart.length
    
}

updateBasket()
basketTemplate()


// function toggleMenuNavgation(show) {
//     const mobilNav = document.getElementById('mobilNavigationToggle')
//     const shadow = document.getElementById('shadowNav')
//     isMobilNavigationShowing = show ?? !isMobilNavigationShowing // '??' Nullish coalescing operator - if not null or undefined use the show variable
//     if (isMobilNavigationShowing) {
//         mobilNav.style.transform = `translateX(20%)`
//         shadow.style.transform = `translateX(0%)`
//         return true
//     } else {
//         // Hides mobil navigation
//         mobilNav.style.transform = `translateX(110%)`
//         shadow.style.transform = `translateX(-100%)`
//         return false
//     }

// }

// window.addEventListener('resize', () => {

//     const mobilNav = document.getElementById('mobilNavigationToggle')
//     if (window.innerWidth >= 1200) {
//         // mobilNav.style.transition = 'transform 0.3s ease-in-out 0s'
//         mobilNav.style.transform = `translateX(0%)`
//     } else {
//         mobilNav.style.transition = 'all 0s ease 0s'
//         mobilNav.style.transform = `translateX(110%)`
        
//         // Prevents 1 tick animation
//         setTimeout(() => {
//             mobilNav.style.transition = 'transform 0.3s ease-in-out 0s'
//         }, 0)
//     }

// })


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
    </div>
    <a href="#kurv" class="shopping-btn btn">Indkøbskurv</a>`

    basket.innerHTML = html
}

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

function removeShoppingItem(target) {
    const key = target.getAttribute('data-key')
    userCart.remove(key)
    const cartItem = target.parentNode.parentNode

    cartItem.style.transform = `translateX(-120%)`
    console.dir(cartItem);
    setTimeout(() => {
        basketTemplate()
    }, 300);
    updateBasket()
}


// Animate hover fancy image
const lakorBrandImage = document.getElementById('lakorBrandImage')
const revolutionBrandImage = document.getElementById('revolutionBrandImage')
const imageSeperatorLine = document.getElementById('imageSeperatorLine')

lakorBrandImage.addEventListener('mouseover', e => {
    console.log(e.currentTarget)
    revolutionBrandImage.style.clipPath =`polygon(100% 0, 55% 0, 36% 100%, 100% 100%)`
    imageSeperatorLine.style.transform = `translateX(11%) rotate(-70deg)`
})
lakorBrandImage.addEventListener('mouseleave', e => {
    revolutionBrandImage.style.clipPath =`polygon(100% 0, 35% 0, 16% 100%, 100% 100%)`
    imageSeperatorLine.style.transform = `translateX(-9%) rotate(-70deg)`
})

revolutionBrandImage.addEventListener('mouseover', e => {
    console.log(e.currentTarget)
    imageSeperatorLine.style.transform = `translateX(-29%) rotate(-70deg)`
})
revolutionBrandImage.addEventListener('mouseleave', e => {
    revolutionBrandImage.style.clipPath =`polygon(100% 0, 35% 0, 16% 100%, 100% 100%)`
    imageSeperatorLine.style.transform = `translateX(-9%) rotate(-70deg)`
})