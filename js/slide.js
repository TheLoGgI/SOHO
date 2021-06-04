/* Slideshow */
let slideIndex = 1;


/* Giver brugeren mulighed for at skifte til næste og forrige slide */
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    // Hide all images
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // Show current image
    slides[slideIndex - 1].style.display = "block";
}