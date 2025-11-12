// js/model/ItemModel.js
class ItemModel {
    constructor() {
        this.items = [];
        this.nextId = 1;
    }

    saveItem(code, name, price, quantity) {
        const newItem = new ItemDTO(this.nextId++, code, name, price, quantity);
        this.items.push(newItem);
    }

    getAllItems() {
        return this.items;
    }

    updateItem(id, code, name, price, quantity) {
        const index = this.items.findIndex(i => i.id === id);
        if (index !== -1) {
            this.items[index].code = code;
            this.items[index].name = name;
            this.items[index].price = price;
            this.items[index].quantity = quantity;
        }
    }

    deleteItem(id) {
        this.items = this.items.filter(i => i.id !== id);
    }
}
