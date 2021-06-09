

/**
 * Fetching Categories and tags from API
 * @return {null}
 */
async function fetchCategoriesAndTags() {

    // Fetching data from Wordpress API
    const categoriesData = await (await fetch('https://soho.lasseaakjaer.com/wp-json/wc/store/products/categories?per_page=30')).json()
    const brandsData = await (await fetch('https://soho.lasseaakjaer.com/wp-json/wc/store/products/tags?per_page=30')).json()

    // Checking when both responses has come back as resolved
    Promise.allSettled([categoriesData, brandsData]).
        then((results) => {
            
            const reducer = (acc, item) => {
                if (['nyhed', 'popular', 'tilbud'].includes(item.slug)) return acc
                acc.push([item.name.toLowerCase(), item.slug])
                return acc
            }

            const categories = results[0].value.reduce( reducer, [])
            const brands = results[1].value.reduce( reducer, [])


            const filters = [
                {
                    name: "Brands",
                    filterType: brands
                },
                {
                    name: "Categories",
                    filterType: categories
                }
            ]

            // Initializing element dependent on the api data
            appendFilters(filters);
            appendDesktopFilters(categories, "#desktop-categories-filter-list");
            appendDesktopFilters(brands, "#desktop-brands-filter-list");
            // eventFilterHandler()
            // removeLoading()
        })

}

fetchCategoriesAndTags()

/**
 * Appending filter names, to be displayed
 * @param  {Array} - Custom Filters obejct from API data
 * @return {null} 
 */
function appendFilters(filters) {
    let htmlTemplate = "";
    for (const filter of filters) {
        htmlTemplate += /*html*/`
        <details class="filter-subject-expand-container">
            <summary class="filter-subject-summary">${filter.name}</summary>
            <ul class="filter-subject-list">${loopFilterEmner(filter.filterType)}</ul>
        </details>
        <div class="filter-line-margin">
            <div class="filter-line-devider"></div>
        </div>
    `;
    }
    document.querySelector(".mobile-filter-subjects-window").innerHTML = htmlTemplate;
};

/**
 * Appending filter to filter lists
 * @param  {Array} - Filters array from API data
 * @return {HTMLString} - List items of filter names 
 */
function loopFilterEmner(filterList) {
    let template = "";
    for (const listItem of filterList) {
        if (listItem === 'uncategorized') continue
        template += /*html*/ `
            <li class="filter-subject-list-item">
            <input class="filter-subject-input-check" data-name="${listItem[1]}" type="checkbox"/>
            <label for="${listItem[1]}" class="filter-subject-name">${listItem[0].capitalize()}</label>
        </li>
    `;
    }
    return template;
}


/**
 * Appending filter to filter lists
 * @param  {Array} - Filters array from API data
 * @param  {String} - Targeted element selector string
 * @return {null}
 */
function appendDesktopFilters(filters, selector) {
    console.log('filters: ', filters);
    let htmlTemplate = "";
    for (const filter of filters) {
        if (filter === 'uncategorized') continue
        htmlTemplate += /*html*/ `
        <li class="filter-subject-list-item">
            <input class="filter-subject-input-check" data-name="${filter[1]}" id="1${filter[1]}" type="checkbox"/>
            <label for="1${filter[1]}" class="filter-subject-name">${filter[0].capitalize()}</label>
        </li>
    `;
    }
    document.querySelector(selector).innerHTML = htmlTemplate;
}


let filterBGShadow = document.querySelector(".mobile-filter-bg-fill");
let filterContainer = document.querySelector(".mobile-filter-container");

function toggleFilterWindow() {
    const state = filterContainer.getAttribute('aria-label')
    if (state === 'closed') {
        filterContainer.style.transform = `translateX(0vw)`
        filterContainer.setAttribute('aria-label', 'open')
        filterBGShadow.style.display = "block";
        filterBGShadow.style.opacity = "1";
        document.body.style.overflow = "hidden";
    }
    else {
        filterContainer.style.transform = `translateX(-100vw)`
        filterContainer.setAttribute('aria-label', 'closed')
        filterBGShadow.style.opacity = "0";
        setTimeout(function () {
            filterBGShadow.style.display = "none";
        }, 300);
        document.body.style.overflow = "auto";
    }

}


let desktopCategoriesFilters = document.querySelector("#desktop-categories-filters");
let desktopBrandsFilters = document.querySelector("#desktop-brands-filters");
let categoriesArrow = document.querySelector("#desktop-categories-arrow");
let brandArrow = document.querySelector("#desktop-brands-arrow");

/**
 * Toggle filter menu for categories on desktop
 * @return {null}
 */
function toggleDesktopCategoriesFilters() {

    const state = desktopCategoriesFilters.getAttribute('aria-label');
    if (state === 'closed') {
        desktopCategoriesFilters.style.height = "360px";
        desktopCategoriesFilters.setAttribute('aria-label', 'open');
        desktopBrandsFilters.style.height = "0vh";
        desktopBrandsFilters.setAttribute('aria-label', 'closed');
        categoriesArrow.style.transform = "scaleY(-1)";
        brandArrow.style.transform = "scaleY(1)";
    } else {
        desktopCategoriesFilters.style.height = "0vh";
        desktopCategoriesFilters.setAttribute('aria-label', 'closed');
        categoriesArrow.style.transform = "scaleY(1)";
    }
}

/**
 * Toggle filter menu for brands on desktop
 * @return {null}
 */
function toggleDesktopBrandsFilters() {

    const state = desktopBrandsFilters.getAttribute('aria-label');
    if (state === 'closed') {
        desktopBrandsFilters.style.height = "360px";
        desktopBrandsFilters.setAttribute('aria-label', 'open');
        desktopCategoriesFilters.style.height = "0vh";
        desktopCategoriesFilters.setAttribute('aria-label', 'closed');
        brandArrow.style.transform = "scaleY(-1)";
        categoriesArrow.style.transform = "scaleY(1)";
    } else {
        desktopBrandsFilters.style.height = "0px";
        desktopBrandsFilters.setAttribute('aria-label', 'closed');
        brandArrow.style.transform = "scaleY(1)";
    }
}



