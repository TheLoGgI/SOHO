// mobile filter show and hide function

let filterBGShadow = document.querySelector(".mobile-filter-bg-fill");
let filterContainer = document.querySelector(".mobile-filter-container");

function toggleFilterWindow() {

    const state = filterContainer.getAttribute('aria-label')
    console.log('state: ', state);
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


const mobileFiltersWindow = document.querySelector(".mobile-filter-subjects-window");

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

function loopFilterEmner(array) {
    let template = "";
    for (const listItem of array) {
        template += /*html*/ `
             <li class="filter-subject-list-item">
                <input class="filter-subject-input-check" id="${listItem}" type="checkbox"/>
                <label for="${listItem}" class="filter-subject-name">${listItem}</label>
            </li>
        `;
    }
    return template;
}

appendFilters(filters);