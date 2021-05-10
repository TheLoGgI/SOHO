let prods = []
/**
 * Fetcing API data from wordpress
 * @return {Array} - Wordpress API data for Products 
 */
async function getProducts() {
    return await (await fetch('https://soho.lasseaakjaer.com/wp-json/wc/store/products')).json()
}

/**
 * Initial run of functions
 * @return {Null}
 */
(async function init() {
    const products = await getProducts()
    prods = [...products]
    createProductCard(products)
})()

/**
 * Displaying product card for each product
 * @param {Array} - List of products
 * @return {Null} 
 */
function createProductCard(products) {
    let htmlTemplate = "";
    for (const product of products) {
        htmlTemplate += /*html*/ `
            <div class="product-card">
                <div class="product-image-container">
                    <button class="like-button" aria-label="outline">
                        <img class="favorite-icon-shop" src="icons/Heart-icon.svg" alt="Favorite-icon">
                    </button>
                    <a href="${'/pages/product.html?id=' + product.id}" target="_self">
                    <div class="product-image-container">
                        <img class="product-image" src="${product?.images[0] ? product?.images[0].src : 'https://via.placeholder.com/300'}" alt="Product-image" width="150px" height="200px">
                    </div>
                    </a>
                </div>
                <a href="${'/pages/product.html?id=' + product.id} target="_self">
                <div class="product-information">
                    <div class="product-text-container">
                        <p class="product-brand">${product?.tags[0]?.name}</p>
                        <p class="product-title">${product.name}</p>
                    </div>
                    <div class="product-price-container">
                        <p class="product-price">${currencyFormat(product.prices.price)} kr</p>
                    </div>
                </div>
                </a>
            </div>
        `;
    }
    document.querySelector(".product-spawn").innerHTML = htmlTemplate;
    handelFavoriteIconClick();
}

/** Source: https://blog.abelotech.com/posts/number-currency-formatting-javascript/
 *  Changes format on currency totals
 * @param {Number} - Number to format
 * @return {Number} formated number 
 */
function currencyFormat(num) {
    return Number(num.substring(0, num.length - 2)).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

/**
 * Handle like buttons clike - on/off
 * @return {Null} 
 */
function handelFavoriteIconClick() {
    const favoriteButtons = document.querySelectorAll(".like-button");
    for (const button of favoriteButtons) {
        button.addEventListener("click", changeIcon);
    }
};

/**
 * Change like icon on toggle
 * @param {Event} - Click event from cliked button
 * @return {Null} 
 */
function changeIcon(event) {
    const state = event.currentTarget.ariaLabel;
    const filledHeart = "icons/orange-heart-solid.svg";
    const outlineHeart = "icons/Heart-icon.svg";
    let image = event.currentTarget.children[0];

    if (state === 'outline') {
        image.src = filledHeart;
        event.currentTarget.setAttribute('aria-label', 'filled');
    }
    else {
        image.src = outlineHeart;
        event.currentTarget.setAttribute('aria-label', 'outline');
    }
}

const filterArray = [];

/**
 * Handler for enabled filters
 * @return {Null} 
 */
function eventFilterHandler() {
    const filters = document.querySelectorAll(".desktop-filter-list, .filter-subject-list")
    const filterBtns = document.querySelectorAll(".reset-filters-btn")
    
    filters.forEach(item => {
        item.addEventListener("click", filter)
    })
    // Clear buttons
    filterBtns.forEach(item => {
        item.addEventListener("click", clearFilters)
    })

    
}


function filter(e) {
    if (e.target.tagName === "LABEL" || e.target.tagName === "UL") return;
    const filterName = e.target.getAttribute("data-name");

    if (e.target.checked) {
        filterArray.push(filterName.toLowerCase());
    } else {
        const index = filterArray.indexOf(filterName.toLowerCase());
        filterArray.splice(index, 1);
    }

    filterProducts();
}


function filterProducts() {
    const filteredProducts = [];
    if (filterArray.length <= 0) {

        sortProducts(prods)
        createProductCard(prods)
        return
    };

    for (const product of prods) {
        product.categories.forEach(category => {
            const hasprod = filteredProducts.find(p => product.id === p.id)
            if (hasprod === undefined && filterArray.includes(category.name.toLowerCase())) {
                filteredProducts.push(product);
            }
        });
    
        product.tags.forEach(tag => {
            const hasprod = filteredProducts.find(p => product.id === p.id)
            if (hasprod === undefined && filterArray.includes(tag.slug.toLowerCase())) {
                    filteredProducts.push(product);
            }
        });
    
    }   

    sortProducts(filteredProducts)
    createProductCard(filteredProducts);
}

document.getElementById('sort-button').addEventListener('change', filterProducts)


function sortProducts(array) {
    const sortType = document.getElementById('sort-button').value

    return array.sort((item1, item2) => {

        switch (sortType) {
            case 'raising':
                return Number(item1.prices.price) - Number(item2.prices.price)

            case 'falling':
                return Number(item2.prices.price) - Number(item1.prices.price)

            case 'sale':
                return item1.on_sale ? 1 : -1

            default:
                return array
        }

    })
}


function clearFilters() {
    const checkboxes =  document.querySelectorAll('.filter-subject-input-check')
    checkboxes.forEach(checkbox => {
        checkbox.checked = false
    })

    filterArray.length = 0
    filterProducts()
}



