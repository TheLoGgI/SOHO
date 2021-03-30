class Cart {
    constructor(previousCart) {
        this.items = new Map()
        this.initPreviousCart(previousCart)
    }

    initPreviousCart(previousCart) {
        if (!previousCart) return 
        previousCart.forEach(cartItem =>  {
            this.items.add(cartItem)
        })
    }

    get cart() {
        return Array.from(this.items.values())
    }

    add(itemObject) {
        if (this.items.has(itemObject.id)) return false
        this.items.set(itemObject.id, itemObject)
        return this.items
    }

    remove(id) {
        return this.items.delete(id)
    }
    
    clear() {
        this.items.clear()
    }

    hasItem(itemObject) {
        return this.items.has(itemObject.id)
    }
    
    getItem(id) {
        return this.items[id]
    }


    updateItem() {

    }




}