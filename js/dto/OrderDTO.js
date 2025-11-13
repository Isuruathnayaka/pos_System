class OrderDTO {
    constructor(orderId, customerId, customerName, orderItems, total, date) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.customerName = customerName;
        this.orderItems = orderItems; // [{ itemId, itemName, price, qty, subtotal }]
        this.total = total;
        this.date = date;
    }
}
