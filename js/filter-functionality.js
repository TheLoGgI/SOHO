// mobile filter show and hide function

let filterBGShadow = document.querySelector(".mobile-filter-bg-fill");

function showFilterWindow() {

    console.log("hej");
    let filterContainer = document.querySelector(".mobile-filter-container");

    filterContainer.style.display = "block";
    filterBGShadow.style.opacity = "1";
}

function hideFilterWindow() {

    console.log("farvel");
    let filterContainer = document.querySelector(".mobile-filter-container");

    filterContainer.style.display = "none";
    filterBGShadow.style.opacity = "0";
}

// expand categori of filter mobile

function expandMobileFilterType() {

    let filterList = document.querySelector(".filter-subject-list");
    let filterArrow = document.querySelector(".filter-subject-arrow");
    console.log("expand");

    if (filterList.style.height === "auto") {
        filterList.style.height = "0px";
        filterArrow.style.transform = "rotate(90deg)";

    } else {
        filterList.style.height = "auto";
    }
}