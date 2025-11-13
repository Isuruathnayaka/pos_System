

const orderModel = new OrderModel();

// Select elements
const selectCustomer = document.getElementById("selectCustomer");
const selectItem = document.getElementById("selectItem");
const itemQty = document.getElementById("itemQty");
const addOrderItemBtn = document.getElementById("addOrderItemBtn");
const updateOrderItemBtn = document.getElementById("updateOrderItemBtn");
const deleteOrderItemBtn = document.getElementById("deleteOrderItemBtn");
const orderTableBody = document.querySelector("#orderTable tbody");
const grandTotalSpan = document.getElementById("grandTotal");
const placeOrderBtn = document.getElementById("placeOrderBtn");
const orderHistoryTable = document.querySelector("#orderHistoryTable tbody");

let orderItems = [];
let selectedOrderItemIndex = null;

//Load Customers and Items from Table
function loadCustomersToSelect() {
    selectCustomer.innerHTML = '<option value="">-- Select Customer --</option>';
    const rows = document.querySelectorAll("#customerTable tbody tr");
    rows.forEach(row => {
        const cells = row.children;
        const id = cells[0].textContent;
        const name = cells[1].textContent;
        const option = document.createElement("option");
        option.value = id;
        option.textContent = name;
        selectCustomer.appendChild(option);
    });
}

function loadItemsToSelect() {
    selectItem.innerHTML = '<option value="">-- Select Item --</option>';
    const rows = document.querySelectorAll("#itemTable tbody tr");
    rows.forEach(row => {
        const cells = row.children;
        const id = cells[0].textContent;
        const code = cells[1].textContent;
        const name = cells[2].textContent;
        const price = parseFloat(cells[3].textContent);
        const quantity = parseInt(cells[4].textContent);

        const option = document.createElement("option");
        option.value = id;
        option.textContent = `${code} - ${name} ($${price}) - Stock: ${quantity}`;
        option.dataset.price = price;
        option.dataset.stock = quantity;
        option.dataset.name = name;
        selectItem.appendChild(option);
    });
}

// Call loaders whenever you enter the order section
document.getElementById("nav-order").addEventListener("click", () => {
    loadCustomersToSelect();
    loadItemsToSelect();
});

// Add Item to Order
addOrderItemBtn.addEventListener("click", () => {
    const itemId = selectItem.value;
    if (!itemId) {
        Swal.fire("Select an item!");
        return;
    }

    const qty = parseInt(itemQty.value);
    if (qty <= 0) {
        Swal.fire("Enter valid quantity!");
        return;
    }

    const selectedOption = selectItem.selectedOptions[0];
    const stock = parseInt(selectedOption.dataset.stock);
    const price = parseFloat(selectedOption.dataset.price);
    const name = selectedOption.dataset.name;

    if (qty > stock) {
        Swal.fire("Not enough stock!");
        return;
    }

    const existing = orderItems.find(i => i.itemId == itemId);
    if (existing) {
        if (existing.qty + qty > stock) {
            Swal.fire("Not enough stock!");
            return;
        }
        existing.qty += qty;
        existing.subtotal = existing.qty * existing.price;
    } else {
        orderItems.push({
            itemId,
            itemName: name,
            price,
            qty,
            subtotal: price * qty
        });
    }

    renderOrderTable();
});

// Render Order Table
function renderOrderTable() {
    orderTableBody.innerHTML = "";
    orderItems.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.itemName}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.qty}</td>
            <td>$${item.subtotal.toFixed(2)}</td>
            <td>
                <button class="btn btn-warning btn-sm update-item" data-index="${index}">Update</button>
                <button class="btn btn-danger btn-sm delete-item" data-index="${index}">Delete</button>
            </td>
        `;
        orderTableBody.appendChild(row);
    });

    // Delete Item
    document.querySelectorAll(".delete-item").forEach(btn => {
        btn.addEventListener("click", e => {
            const index = e.target.dataset.index;
            orderItems.splice(index, 1);
            renderOrderTable();
            clearOrderItemSelection();
        });
    });

    // Update Item
    document.querySelectorAll(".update-item").forEach(btn => {
        btn.addEventListener("click", e => {
            const index = e.target.dataset.index;
            selectedOrderItemIndex = index;
            const item = orderItems[index];

            selectItem.value = item.itemId;
            itemQty.value = item.qty;

            addOrderItemBtn.classList.add("d-none");
            updateOrderItemBtn.classList.remove("d-none");
            deleteOrderItemBtn.classList.remove("d-none");
        });
    });

    updateGrandTotal();
}

//Update Selected Item
updateOrderItemBtn.addEventListener("click", () => {
    if (selectedOrderItemIndex === null) return;

    const itemId = selectItem.value;
    const qty = parseInt(itemQty.value);

    const selectedOption = selectItem.selectedOptions[0];
    const stock = parseInt(selectedOption.dataset.stock);
    const price = parseFloat(selectedOption.dataset.price);
    const name = selectedOption.dataset.name;

    if (qty <= 0 || qty > stock) {
        Swal.fire("Invalid quantity!");
        return;
    }

    const existingIndex = orderItems.findIndex((i, idx) => i.itemId == itemId && idx != selectedOrderItemIndex);
    if (existingIndex !== -1) {
        Swal.fire("This item is already added!");
        return;
    }

    orderItems[selectedOrderItemIndex] = {
        itemId,
        itemName: name,
        price,
        qty,
        subtotal: price * qty
    };

    renderOrderTable();
    clearOrderItemSelection();
});

//Clear Selection
function clearOrderItemSelection() {
    selectedOrderItemIndex = null;
    selectItem.value = "";
    itemQty.value = 1;
    addOrderItemBtn.classList.remove("d-none");
    updateOrderItemBtn.classList.add("d-none");
    deleteOrderItemBtn.classList.add("d-none");
}

//Place Order
placeOrderBtn.addEventListener("click", () => {
    const customerId = selectCustomer.value;
    const customerName = selectCustomer.selectedOptions[0]?.text;

    if (!customerId || orderItems.length === 0) {
        Swal.fire("Select customer and add items!");
        return;
    }

    const total = orderItems.reduce((sum, i) => sum + i.subtotal, 0);
    const newOrder = orderModel.addOrder(customerId, customerName, [...orderItems], total);

    orderItems = [];
    renderOrderTable();
    grandTotalSpan.textContent = "0.00";
    renderOrderHistory();

    Swal.fire({
        icon: "success",
        title: "Order Placed!",
        text: `Order ID: ${newOrder.orderId}`,
        timer: 1500,
        showConfirmButton: false
    });

    // Update Item Table stock
    loadItemsToSelect();
});


function renderOrderHistory() {
    orderHistoryTable.innerHTML = "";
    orderModel.getAllOrders().forEach(order => {
        const itemsText = order.orderItems.map(i => `${i.itemName} (${i.qty})`).join(", ");
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${order.orderId}</td>
            <td>${order.customerName}</td>
            <td>${itemsText}</td>
            <td>$${order.total.toFixed(2)}</td>
            <td>${order.date}</td>
            <td><button class="btn btn-danger btn-sm delete-order" data-id="${order.orderId}">Delete</button></td>
        `;
        orderHistoryTable.appendChild(row);
    });

    document.querySelectorAll(".delete-order").forEach(btn => {
        btn.addEventListener("click", e => {
            const orderId = e.target.dataset.id;
            Swal.fire({
                title: 'Delete this order?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'Cancel'
            }).then(result => {
                if (result.isConfirmed) {
                    orderModel.deleteOrder(orderId);
                    renderOrderHistory();
                    loadItemsToSelect();
                }
            });
        });
    });
}

function updateGrandTotal() {
    const grandTotal = orderItems.reduce((sum, i) => sum + i.subtotal, 0);
    grandTotalSpan.textContent = grandTotal.toFixed(2);
}
