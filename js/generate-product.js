
/**
 * Getting parameter from URL
 * @param  {String} - URL parameter to get
 * @return {String} - Value of URL key
 */
function getURLParam(param) {
    const urlParams = new URLSearchParams(location.search)
    return urlParams.get(param)
}

/**
 * Append images for image slider
 * @param  {Object} - Product object with images
 * @return {String} - HTML string of slides
 */
function slideImages(product) {
    let imageHTML = ''
    for (const image in product.images) {
        imageHTML += `
            <div class="mySlides">
                <img src="${product.images[image].src}">
            </div>`
    }
    return imageHTML

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
 * Time span of delevery
 * @return {String} - returns time span of 2 days from current day
 */
function deliveryTime() {
    const deliveryFrom = new Date()
    const deliveryTo = new Date()
    deliveryTo.setUTCDate(deliveryFrom.getDate() + 2)

    return deliveryFrom.toLocaleDateString('da-DK', { weekday: 'short', month: 'short', day: 'numeric' }) +
        ' - ' + deliveryTo.toLocaleDateString('da-DK', { weekday: 'short', month: 'short', day: 'numeric' })
}

/**
 * Render product part of the page and 
 * @return {String} - HTML string of slides
 */
(async () => {
    const paramId = getURLParam('id')

    // redirects to home page
    if (!paramId) window.location.pathname = ''

    const currentProduct = await (await fetch(`https://soho.lasseaakjaer.com/wp-json/wc/store/products/${paramId}`)).json()

    const target = document.getElementById('productData')

    const template = `
    <div class="item1">
        <div class="slideshow-container">
            ${slideImages(currentProduct)}
            
            <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
            <a class="next" onclick="plusSlides(1)">&#10095;</a>

        </div>
    </div>


    <div class="item2">
        <form id="productForm">
        <section class="info">
            <p>${currentProduct.tags[0] ? currentProduct.tags[0].name : ''}</p>
            <h2>${currentProduct.name}</h2>
            <p>kr. ${currencyFormat(currentProduct.prices.price)},- inkl. moms</p>

            <div class="colors">
                <p>Farve:</p>
  
                <div class="color-pick">
                    <label class="container" title="hvid"> 
                        <input type="radio" checked name="color" value="white">
                        <span class="checkmark" style="background: white"></span>
                      </label>
                      <label class="container" title="sort"> 
                        <input type="radio" name="color" value="black">
                        <span class="checkmark" style="background: black"></span>
                      </label>
                      <label class="container" title="rød">
                        <input type="radio" name="color" value="red">
                        <span class="checkmark" style="background: red"></span>
                      </label>
                      <label class="container" title="blå">
                        <input type="radio" name="color" value="blue">
                        <span class="checkmark" style="background: blue"></span>
                      </label>
                </div>
            </div>
        </section>

        <select class="dropdown" name="size" required>
            <option value="" disabled selected hidden>Vælg størrelse</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
        </select>

        <div class="basket-button">
            <button class="add-to-cart" id="addToCart" type="submit"> <img class="shopping-bag-icon" src="icons/Shopping-bag-icon.svg"> Tilføj til kurven</button>
            
            <div class="heart-cheackbox">
                <input id="heart" type="checkbox" name="favorite"/>
                <label for="heart">❤</label>
            </div>
        </div>
        
        </form>

        <section class="delivery-info" >
            <p><b>${deliveryTime()}</b></p><br>
            <p style="text-align: left;">Standard levering
                <span style="float: right;">Gratis</span>
            </p>
            <hr>
            <p>30 dages returret
                <span style="float: left;">
                    <img class="return-arrow" src="icons/return-arrow.svg">
                </span>
            </p>
        </section>

        <!-- dropdownfunktion med info -->
        <section class="dropdown-menus">
            <div class="dropdown2">
                <button onclick="dropdownFunction2()" class="info-dropdown">Materiale og vaskeanvisninger<img
                        class="arrow-down" src="images/arrow-down.png" alt="arrow" width="15px"></button>
            </div>
            <div class="dropdown3">
                <button onclick="dropdownFunction3()" class="info-dropdown">Information og produkt<img class="arrow-down"
                        src="images/arrow-down.png" alt="arrow" width="15px"></button>

            </div>
            <div class="dropdown4">
                <button onclick="dropdownFunction4()" class="info-dropdown">Pasform<img class="arrow-down"
                        src="images/arrow-down.png" alt="arrow" width="15px"></button>

            </div>
        </section>

        <!-- anmeldelser -->
        <section class="review">
            <p>Anmeldelser (0)
                <img class="star-icon" src="icons/Star-icon.svg" alt="star-icon">
                <img class="star-icon" src="icons/Star-icon.svg" alt="star-icon">
                <img class="star-icon" src="icons/Star-icon.svg" alt="star-icon">
                <img class="star-icon" src="icons/Star-icon.svg" alt="star-icon">
                <img class="star-icon" src="icons/Star-icon.svg" alt="star-icon">
            </p>
        </section>
    </div>`

    target.innerHTML = template
    // currentProduct
    shopButtonHandler({
        name: currentProduct.name,
        id: currentProduct.id,
        categories: currentProduct.categories,
        tags: currentProduct.tags,
        description: currentProduct.short_description,
        images: currentProduct.images,
        price: Number(currentProduct.prices.price.substring(0, currentProduct.prices.price.length - 2)),
        color: null,
        size: null,
        amount: 1,
        isFavorite: false,
    })
    showSlides(slideIndex);
    removeLoading()
})()

/**
 * Fetching data from APi and inits SplideJs
 * @return {null}
 */
async function getProducts() {
    const data = await (await fetch('https://soho.lasseaakjaer.com/wp-json/wc/store/products')).json()
    showProductList(data)
    
    const splideSlider = new Splide('#splide1', {
        type: 'loop',
        perPage: 2,
        perMove: 1,
        pagination: true,
        autoHeight: true,
    }).mount();

    if (window.innerWidth > 800) {
        splideSlider.options = {perPage: 3}
    }
}

getProducts()

const productList = document.getElementById("product-list")

/**
 * Appends product images for SplideJs tracker
 * @param  {Array} - List of products from API
 * @return {null}
 */
function showProductList(array) {
    let templet = ''
    for (const item of array) {
        templet += `<li class="splide__slide">
        <div class="product">
            <a href="${'/pages/product.html?id=' + item.id}" class="product-link" target="_self">
                <img src="${item?.images[0] ? item?.images[0].src : 'https://via.placeholder.com/300'
            } " alt="t - shirt showcase">
        <p class="product-brand"> <strong>${item.tags[0] ? item?.tags[0].name : ''}</strong> </p >
            <p class="product-title">${item.name}</p>
            <p class="product-price">kr. ${currencyFormat(item.prices.price)},-</p>
                                </a >
                            </div >
                        </li > `
    }

    productList.innerHTML = templet

}





