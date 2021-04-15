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

// expand categori of filter mobile

/*
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
*/