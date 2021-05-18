

/**
 * Handler for adding items to the basket with DOM form data
 * @param {Object} - new item object details 
 * @return {Null} 
 */
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
        
        productResponse()
        updateBasket()
        basketTemplate()

    
    })
}

function productResponse() {
    const btn = document.getElementById('addToCart')
    const itemCount = document.getElementById('cartItems')
    const initialText = btn.innerText
    const activeColor = '#5a858b'

    btn.childNodes[2].nodeValue = 'Produktet tiltøjet til kurv'
    btn.style.color = activeColor
    itemCount.style.transform = 'scale(1.2)'
    itemCount.style.color = activeColor
    
    setTimeout(() => {
        btn.childNodes[2].nodeValue = initialText
        btn.style.color = 'initial'
        itemCount.style.transform = 'initial'
        itemCount.style.color = 'initial'
    }, 1000)
}





