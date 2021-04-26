


function shopButtonHandler(newItem) {
    
    document.getElementById('productForm').addEventListener('submit', (e) => {
        e.preventDefault()
            // Creates FormData object in an array-like structure
        const formData = new FormData(e.target)
        // Converts the formdata to an object
        const formObject = Object.fromEntries(formData);   

        userCart.add({
            ...newItem, 
            color: formObject.color,
            size: formObject.size,
            amount: 1,
            isFavorite: formObject.favorite ? true : false
        })

        updateBasket()
        basketTemplate()

    
    })
}





