
const localBrands = document.getElementById('localBrands')
const mostPopular = document.getElementById('mostPopular')

/** Source: https://blog.abelotech.com/posts/number-currency-formatting-javascript/
 *  Changes format on currency totals
 * @param {Number} - Number to format
 * @return {Number} formated number 
 */
function currencyFormat(num) {
    return Number(num.substring(0, num.length - 2)).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

/**
 * Adjusts Splide carrousel for the device and video
 * @return {null} 
 */
function init() {

    document.body.classList.add('loaded')
    
    const first = new Splide('#splide1', {
        type: 'loop',
        perPage: 2,
        perMove: 1,
        pagination: true,
        autoHeight: true,
    }).mount();

     const secound = new Splide('#splide2', {
        type: 'loop',
        perPage: 2,
        perMove: 1,
        pagination: true,
        autoHeight: true,
    }).mount();

    // Clear splide pagination duplicates 
    document.querySelectorAll('.splide__pagination:nth-child(odd)').forEach(el => el.remove())


    if (window.innerWidth > 800) {
        first.options = {perPage: 3}
        secound.options = {perPage: 3}
        const video = document.getElementById('heroVideo')
        video.setAttribute('autoplay', 'autoplay')
        video.setAttribute('preload', 'auto')
    }

}

/**
 * Fetching products from the API, and initializing functions
 * @return {null} 
 */
(async function getProducts() {
    const data = await (await fetch('https://soho.lasseaakjaer.com/wp-json/wc/store/products')).json()
    document.querySelectorAll('.splide').forEach( el => {delete el}) // removes "dummy" splide content
    displayProducts(data)
    init()
    removeLoading()
})()


/**
 * Displaying products on the page from Api
 * @param  {Array} - Array of products to be displayed
 * @return {null} 
 */
function displayProducts(arrayList) {
    let popular = ''
    let local = ''
    

    const localBrandsList = ['lakor', 'garcia', 'revolution']
    for (const item of arrayList) {
        if (localBrandsList.includes(item.tags[0].slug)) {
            local += `
            <li class="splide__slide">
                <div class="product">
                    <a href="${'/pages/product.html?id=' + item.id}" class="product-link">
                        <img src="${item?.images[0] ? item?.images[0].src : 'https://via.placeholder.com/300'} " alt="t - shirt showcase">
                    <p class="product-brand"> <strong>${item.tags[0] ? item?.tags[0].name : ''}</strong> </p >
                    <p class="product-title">${item.name}</p>
                    <p class="product-price">kr. ${currencyFormat(item.prices.price)},-</p>
                    </a >
                </div >
            </li>`
            continue
        }

        popular += `
        <li class="splide__slide">
            <div class="product">
                <a href="${'/pages/product.html?id=' + item.id}" class="product-link">
                    <img src="${item?.images[0] ? item?.images[0].src : 'https://via.placeholder.com/300'} " alt="t - shirt showcase">
                <p class="product-brand"> <strong>${item.tags[0] ? item?.tags[0].name : ''}</strong> </p >
                <p class="product-title">${item.name}</p>
                <p class="product-price">kr. ${currencyFormat(item.prices.price)},-</p>
                </a >
            </div >
        </li>`
    }
    
    localBrands.innerHTML = local
    mostPopular.innerHTML = popular
}



