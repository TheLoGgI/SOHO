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

    add(itemObject) {
        const {id, cartItem} = this.hasItem(itemObject)
        console.log('cartItem: ', cartItem);
        // const sameItem = this.isSameItem(cartItem, itemObject)
        if (cartItem) {
            this.updateCart(id, itemObject)
            return false
        }

        console.log(itemObject);
        this.addToStorage(itemObject)
        this.cartItems.set(this.randomKey, itemObject)
        return this.itemObject
    }

    remove(id) {
        return this.cartItems.delete(id)
    }
    
    clear() {
        this.cartItems.clear()
    }

    hasItem(itemObject) {
        const mapIterator = this.cartItems.entries()

        while (true) {
            const obj = mapIterator.next().value
            if (obj === undefined) return false
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

    updateCart(id) {
        const item = this.getItem(id)
        this.cartItems.set(id, {...item, amount: item.amount + 1})
        window.localStorage.setItem('userCart', JSON.stringify([...this.cart]))
    }

    get randomKey() {
        return Math.floor(Math.random()*16777215).toString(16);
    }




}