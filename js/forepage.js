
const localBrands = document.getElementById('localBrands')
const mostPopular = document.getElementById('mostPopular')

function currencyFormat(num) {
    return Number(num.substring(0, num.length - 2)).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function initSlides() {

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

    if (window.innerHeight > 800) {
        first.options = {perPage: 3}
        secound.options = {perPage: 3}
    }

}


(async function getProducts() {
    const data = await (await fetch('https://soho.lasseaakjaer.com/wp-json/wc/store/products')).json()
    displayProducts(data)
    
    initSlides()
})()

const productList = document.getElementById("product-list")

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
                        <img src="${item?.images[1] ? item?.images[1].src : 'https://via.placeholder.com/300'} " alt="t - shirt showcase">
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
                    <img src="${item?.images[1] ? item?.images[1].src : 'https://via.placeholder.com/300'} " alt="t - shirt showcase">
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