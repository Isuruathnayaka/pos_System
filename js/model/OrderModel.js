let orderArray = [];
let orderIdCounter = 1;

class OrderModel {

    addOrder(customerId, customerName, orderItems, total) {
        const date = new Date().toLocaleString();
        const order = {
            orderId: orderIdCounter++,
            customerId,
            customerName,
            orderItems,
            total,
            date
        };

        // Reduce stock in item table
        orderItems.forEach(orderItem => {
            const row = Array.from(document.querySelectorAll("#itemTable tbody tr"))
                .find(r => r.children[0].textContent == orderItem.itemId);
            if (row) {
                const qtyCell = row.children[4];
                let stock = parseInt(qtyCell.textContent);
                stock -= orderItem.qty;
                qtyCell.textContent = stock;
            }
        });

        orderArray.push(order);
        return order;
    }

    getAllOrders() {
        return orderArray;
    }

    deleteOrder(orderId) {
        const index = orderArray.findIndex(o => o.orderId == orderId);
        if (index !== -1) {
            const order = orderArray[index];
            // Restore item stock
            order.orderItems.forEach(orderItem => {
                const row = Array.from(document.querySelectorAll("#itemTable tbody tr"))
                    .find(r => r.children[0].textContent == orderItem.itemId);
                if (row) {
                    const qtyCell = row.children[4];
                    let stock = parseInt(qtyCell.textContent);
                    stock += orderItem.qty;
                    qtyCell.textContent = stock;
                }
            });

            orderArray.splice(index, 1);
        }
    }

    calculateTotal(orderItems) {
        return orderItems.reduce((sum, i) => sum + i.subtotal, 0);
    }
}
