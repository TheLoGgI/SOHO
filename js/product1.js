/* Slideshow */
var slideIndex = 1;
showSlides(slideIndex);

/* Giver brugeren mulighed for at skifte til næste og forrige slide */
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

/* Vælg farve */
/* Circlerne får en gul kant når de er valgt */
function dotfun() {
    var Image_Id = document.getElementById('dot-black');
    if (Image_Id.src.match("/images/black-dot.png")) {
        Image_Id.src = "/images/black-dot-yellow-border.png";
    }
    else {
        Image_Id.src = "/images/black-dot.png";
    }
}

function dotfun2() {
    var Image_Id = document.getElementById('dot-blue');
    if (Image_Id.src.match("/images/blue-dot.png")) {
        Image_Id.src = "/images/blue-dot-yellow-border.png";
    }
    else {
        Image_Id.src = "/images/blue-dot.png";
    }
}

function dotfun3() {
    var Image_Id = document.getElementById('dot-red');
    if (Image_Id.src.match("/images/red-dot.png")) {
        Image_Id.src = "/images/red-dot-yellow-border.png";
    }
    else {
        Image_Id.src = "/images/red-dot.png";
    }
}

/* Skifter hjerte icon fra outline til filled */
/* Mobil */
function imagefun() {
    var Image_Id = document.getElementById('heart-icon');
    if (Image_Id.src.match("/icons/Heart-icon.svg")) {
        Image_Id.src = "/icons/heart-icon-filled.svg";
    }
    else {
        Image_Id.src = "/icons/Heart-icon.svg";
    }
}

/* Desktop */
function imagefun2() {
    var Image_Id = document.getElementById('heart-icon2');
    if (Image_Id.src.match("/icons/Heart-icon.svg")) {
        Image_Id.src = "/icons/heart-icon-filled.svg";
    }
    else {
        Image_Id.src = "/icons/Heart-icon.svg";
    }
}

/* Dropdown menuer */
/* Når brugeren klikker på knappen, skifter den mellem at skjule og vise dropdown-indholdet */
function dropdownFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

/* Lukker dropdown menuen, hvis brugeren klikker udenfor boksen */
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


function dropdownFunction2() {
    document.getElementById("myDropdown2").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn2')) {
        var dropdowns = document.getElementsByClassName("dropdown-content2");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


function dropdownFunction3() {
    document.getElementById("myDropdown3").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn3')) {
        var dropdowns = document.getElementsByClassName("dropdown-content3");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


function dropdownFunction4() {
    document.getElementById("myDropdown4").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn4')) {
        var dropdowns = document.getElementsByClassName("dropdown-content4");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}