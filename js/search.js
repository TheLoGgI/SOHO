const deskSearchResults = document.getElementById('deskSearchResults')
document.getElementById('menuSearch').addEventListener('click', toggleSearchMenu)
document.getElementById('searchClose').addEventListener('click', toggleSearchMenu)
document.getElementById('searchBackdrop').addEventListener('click', toggleSearchMenu)
const searchArray = []

function toggleSearchMenu() {
    document.body.classList.toggle('search-menu-aside')
}

;(async function() {

    const prodcutData = await (await fetch('https://soho.lasseaakjaer.com/wp-json/wc/store/products?per_page=30')).json()
    const categoriesData = await (await fetch('https://soho.lasseaakjaer.com/wp-json/wc/store/products/categories?per_page=30')).json()
    const brandsData = await (await fetch('https://soho.lasseaakjaer.com/wp-json/wc/store/products/tags?per_page=30')).json()
    indexSearchFilters(brandsData, 'brand')
    indexSearchFilters(categoriesData, 'kategori')
    indexSearchFilters(prodcutData, 'produkt')

    document.getElementById('search').addEventListener('input', searchTerms)

})()


function indexSearchFilters(array, type) {
    array.forEach(item => {
        searchArray.push({
            name: item.name.toLowerCase(),
            type: type,
            link: location.origin + (type !== 'produkt' 
                ? `/pages/products.html#${item.slug}` 
                : `/pages/product.html?id=${item.id}`)
        })
    })
}

function searchTerms(e) {
    const value = e.target.value.toLowerCase()
    if (value.length === 0) deskSearchResults.innerHTML = ''
    if (value.length < 2) return // Guard clause
    const regex = new RegExp(value)
    const results = searchArray.filter((item) => regex.test(item.name))
    insertSearchResults(results)
}

function insertSearchResults(searchResults) {
    let searchList = ''

    for (const item of searchResults) {
        searchList += `<li>
                    <a href="${item.link}">${item.name}</a>
                    <span>${item.type}</span>
                </li>`
    }

    deskSearchResults.innerHTML = searchList
}

