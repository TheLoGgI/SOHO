class Cart {
    constructor(previousCart) {
        this.cartItems = new Map()
        this.initPreviousCart(previousCart)
    }

    initPreviousCart(previousCart) {
        if (!previousCart) return 
        // const cart = previousCart
        window.localStorage.setItem('userCart', '[]')
        // const local = localStorage.getItem('userCart')
        // console.log('local: ', local);
        previousCart.forEach(cartItem =>  {
            this.add(cartItem)
        })
    }

    isSameItem(cart, cartItem) {
        const size = cart.size === cartItem.size
        const color = cart.color === cartItem.color
        console.log('size && color: ', size && color, size);
        return size && color
    }

    get cart() {
        return Array.from(this.cartItems.values())
    }

    get keys() {
        return this.cartItems.keys()
    }

    add(itemObject) {
        if (!itemObject) return false
        const {id, cartItem} = this.hasItem(itemObject)
        console.log('cartItem: ', cartItem);
        
        if (cartItem) {
            this.updateItem(id, itemObject)
            return false
        }


        const key = this.randomKey
        const item = {...itemObject, key} 
        this.addToStorage(item)
        this.cartItems.set(key, item)
        return this.itemObject
    }

    remove(key) {
        this.removeFromStorage(key)
        return this.cartItems.delete(key)
    }
    
    clear() {
        this.cartItems.clear()
    }

    hasItem(itemObject) {
        const mapIterator = this.cartItems.entries()

        while (true) {
            const obj = mapIterator.next().value
            console.log('obj: ', obj);
            if (obj === undefined ) return false
            if (obj[1].id === itemObject.id) { 
                
                if (this.isSameItem(itemObject, obj[1])) {
                    return {id: obj[0], cartItem: obj[1]}
                }

                continue
            }
            if (obj.done) return false
        }
    }
    
    getItem(id) {
        return this.cartItems.get(id)
    }

    addToStorage(itemObject) {
        window.localStorage.setItem('userCart', 
            JSON.stringify([...this.cart, itemObject]))
    }
    
    removeFromStorage(key) {
        const storage = JSON.parse(window.localStorage.getItem('userCart'))
        const index = storage.findIndex(value => value.key === key)
        storage.splice(index, 1)
        console.log('storage: ', storage);
        window.localStorage.setItem('userCart', JSON.stringify(storage))

    }

    updateItem(id) {
        const item = this.getItem(id)
        this.cartItems.set(id, {...item, amount: item.amount + 1})
        window.localStorage.setItem('userCart', JSON.stringify([...this.cart]))
    }

    get randomKey() {
        return Math.floor(Math.random()*16777215).toString(16);
    }


}

// Init class

const cartStorage = JSON.parse(localStorage.getItem('userCart'))
const userCart = new Cart(cartStorage)