// mobile filter show and hide function

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


// filters array

const brands = [
    "Anerkjendt",
    "Birkenstock",
    "Clean Cut",
    "Dedicated",
    "Egtved Socks",
    "Elvine",
    "Fuza Wool",
    "Garcia",
    "Gola",
    "JBS",
    "KnowledgeCotton Apparel",
    "Lakor",
    "Mads Nørgaard",
    "Nature Footwear",
    "Resteröds",
    "Revolution",
    "Royal Republiq",
    "Scotch&Soda",
    "Shoe the Bear",
    "Suit",
    "Warecph",
    "Wrangler"
];

const categories = [
    "Bukser",
    "Habitter",
    "Jakker",
    "Jeans",
    "Shorts",
    "Sko",
    "Strik",
    "Strømper",
    "Trøjer",
    "Underbukser",
    "Accessories",
    "Bælter",
    "Hatte",
    "Huer",
    "Tasker"
];

const filters = [
    {
        name: "Brands",
        filterType: brands
    },
    {
        name: "Categories",
        filterType: categories
    }
];



function appendFilters(filters) {
    let htmlTemplate = "";
    for (const filter of filters) {
        htmlTemplate += /*html*/`
            <details class="filter-subject-expand-container">
                <summary class="filter-subject-summary">${filter.name}</summary>
                <ul class="filter-subject-list">${loopFilterEmner(filter.filterType)}</ul>
            </details>
            <div class="filter-line-devider"></div>
        `;
    }
    document.querySelector(".mobile-filter-subjects-window").innerHTML = htmlTemplate;
};

//mobil
function loopFilterEmner(array) {
    let template = "";
    for (const listItem of array) {
        template += /*html*/ `
             <li class="filter-subject-list-item">
                <input class="filter-subject-input-check" data-name="${listItem}" type="checkbox"/>
                <label for="${listItem}" class="filter-subject-name">${listItem}</label>
            </li>
        `;
    }
    return template;
}

appendFilters(filters);

// desktop filters

let desktopCategoriesFilters = document.querySelector("#desktop-categories-filters");
let desktopBrandsFilters = document.querySelector("#desktop-brands-filters");
let categoriesArrow = document.querySelector("#desktop-categories-arrow");
let brandArrow = document.querySelector("#desktop-brands-arrow");

function toggleDesktopCategoriesFilters() {

    const state = desktopCategoriesFilters.getAttribute('aria-label');
    if (state === 'closed') {
        desktopCategoriesFilters.style.height = "360px";
        desktopCategoriesFilters.setAttribute('aria-label', 'open');
        desktopBrandsFilters.style.height = "0vh";
        desktopBrandsFilters.setAttribute('aria-label', 'closed');
        categoriesArrow.style.transform = "scaleY(-1)";
        brandArrow.style.transform = "scaleY(1)";
    }
    else {
        desktopCategoriesFilters.style.height = "0vh";
        desktopCategoriesFilters.setAttribute('aria-label', 'closed');
        categoriesArrow.style.transform = "scaleY(1)";
    }
}

function toggleDesktopBrandsFilters() {

    const state = desktopBrandsFilters.getAttribute('aria-label');
    // console.log('state: ', state);
    if (state === 'closed') {
        desktopBrandsFilters.style.height = "360px";
        desktopBrandsFilters.setAttribute('aria-label', 'open');
        desktopCategoriesFilters.style.height = "0vh";
        desktopCategoriesFilters.setAttribute('aria-label', 'closed');
        brandArrow.style.transform = "scaleY(-1)";
        categoriesArrow.style.transform = "scaleY(1)";
    }
    else {
        desktopBrandsFilters.style.height = "0px";
        desktopBrandsFilters.setAttribute('aria-label', 'closed');
        brandArrow.style.transform = "scaleY(1)";
    }
}

//desktop
const desktopCategoriesFiltersList = document.querySelector("#desktop-categories-filter-list");
const desktopBrandsFiltersList = document.querySelector("#desktop-brands-filter-list");

function appendDesktopFilters(filters, selector) {
    let htmlTemplate = "";
    for (const filter of filters) {
        htmlTemplate += /*html*/ `
             <li class="filter-subject-list-item">
                <input class="filter-subject-input-check" data-name="${filter}" id="1${filter}" type="checkbox"/>
                <label for="1${filter}" class="filter-subject-name">${filter}</label>
            </li>
        `;
    }
    document.querySelector(selector).innerHTML = htmlTemplate;
}

appendDesktopFilters(categories, "#desktop-categories-filter-list");
appendDesktopFilters(brands, "#desktop-brands-filter-list");


