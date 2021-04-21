// const loading = document.getElementById('loading')
let productData = []





// (async function init() {
//     const products = await getProducts()
//     productData = [...products]

//     // loading.style.display =  'none'
// })()


function shopButtonHandler(newItem) {
    
    document.getElementById('productForm').addEventListener('submit', (e) => {
        e.preventDefault()
            // Creates FormData object in an array-like structure
        const formData = new FormData(e.target)
        // Converts the formdata to an object
        const formObject = Object.fromEntries(formData);   
        
        // userCart.add({
        //     name: itemInCart.name,
        //     id: itemInCart.id,
        //     categories: itemInCart.categories,
        //     tags: itemInCart.tags,
        //     description: itemInCart.short_description,
        //     images: itemInCart.images,
        //     prices: itemInCart.prices,
        //     color: 'white',
        //     size: 'medium',
        //     amount: 1,
        //     isFavorite: false,
        // })

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





