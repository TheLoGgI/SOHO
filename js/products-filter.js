async function getProducts() {
    return await (await fetch('https://soho.lasseaakjaer.com/wp-json/wc/store/products')).json()
}

(async function init() {
    const products = await getProducts()

    let htmlTemplate = "";
    for (const product of products) {
        htmlTemplate += /*html*/ `
            <div class="product-card">
                <div class="product-image-container">
                    <button class="like-button">
                        <img class="favorite-icon-shop" src="icons/Heart-icon.svg" alt="Favorite-icon">
                    </button>
                    <img class="product-image" src="${product?.images[0]?.src}" alt="">
                </div>
                <div class="product-information">
                    <div class="product-text-container">
                        <p class="product-brand">Adidas</p>
                        <p class="product-title">Sort T-shirt</p>
                    </div>
                    <div class="product-price-container">
                        <p class="product-price">500 kr</p>
                    </div>
                </div>
            </div>
        `;
    }
    document.querySelector(".product-spawn").innerHTML = htmlTemplate;
})()