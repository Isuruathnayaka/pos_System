let itemArray = [];
let itemIdCounter = 1;

class ItemModel {
    saveItem(code, name, price, quantity) {
        const item = { id: itemIdCounter++, code, name, price: parseFloat(price), quantity: parseInt(quantity) };
        itemArray.push(item);
        return item;
    }

    getAllItems() {
        return itemArray;
    }

    updateItem(id, code, name, price, quantity) {
        const item = itemArray.find(i => i.id === id);
        if (item) {
            item.code = code;
            item.name = name;
            item.price = parseFloat(price);
            item.quantity = parseInt(quantity);
        }
    }

    deleteItem(id) {
        itemArray = itemArray.filter(i => i.id !== id);
    }

    reduceQuantity(id, count) {
        const item = itemArray.find(i => i.id === id);
        if (item) item.quantity -= count;
    }
}
