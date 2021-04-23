async function getProducts() {
    return await (await fetch('https://soho.lasseaakjaer.com/wp-json/wc/store/products')).json()
}

(async function init() {
    const products = await getProducts()
    createProductCard(products);
})()

function createProductCard(products) {
    let htmlTemplate = "";
    for (const product of products) {
        htmlTemplate += /*html*/ `
            <div class="product-card">
                <div class="product-image-container">
                    <button class="like-button" aria-label="outline">
                        <img class="favorite-icon-shop" src="icons/Heart-icon.svg" alt="Favorite-icon">
                    </button>
                    <a href="${'/pages/product.html?id=' + product.id}">
                    <div class="product-image-container">
                        <img class="product-image" src="${product?.images[0]?.src}" alt="Product-image" width="150px" height="200px">
                    </div>
                    </a>
                </div>
                <a href="${'/pages/product.html?id=' + product.id}">
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

function currencyFormat(num) {
    return Number(num.substring(0, num.length - 2)).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function handelFavoriteIconClick() {
    const favoriteButtons = document.querySelectorAll(".like-button");
    for (const button of favoriteButtons) {
        button.addEventListener("click", changeIcon);
    }
};

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
const desktopInputs = document.querySelectorAll("filter-subject-input-check");
document.getElementById("desktop-categories-filter-list").addEventListener("click", (e) => {
    const filterName = e.target.getAttribute("data-name");

    if (e.target.tagName === "LABEL") {
        return;

    }
    if (e.target.checked) {
        filterArray.push(filterName);
    }
    else {
        const index = filterArray.indexOf(filterName);
        filterArray.splice(index, 1);
    }
    filterProducts();
});

async function filterProducts() {
    const filteredProducts = [];
    const products = await getProducts()
    //console.log(products);
    //if (filterArray.length <= 0) return;
    for (const product of products) {

        product.categories.forEach(category => {
            // console.log(category)
            if (filteredProducts.find(p => p.id === product.id) && filterArray.includes(category.name)) {
                filteredProducts.push(product);
                console.log("hej");
            }
        });
    }
    createProductCard(filteredProducts);
};




