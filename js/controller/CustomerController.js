// Controller (Connects UI and Model)
const model = new CustomerModel();

const nameField = document.getElementById("customerName");
const contactField = document.getElementById("customerContact");
const addressField = document.getElementById("customerAddress");

const saveBtn = document.getElementById("saveCustomerBtn");
const updateBtn = document.getElementById("updateCustomerBtn");
const deleteBtn = document.getElementById("deleteCustomerBtn");
const tableBody = document.querySelector("#customerTable tbody");

let selectedId = null;

// ================== SAVE CUSTOMER ==================
saveBtn.addEventListener("click", function () {
    const name = nameField.value.trim();
    const contact = contactField.value.trim();
    const address = addressField.value.trim();

    if (!name || !contact || !address) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill all fields!',
        });
        return;
    }

    try {
        model.saveCustomer(name, contact, address);
        renderTable();
        clearFields();

        Swal.fire({
            icon: 'success',
            title: 'Saved!',
            text: 'Customer saved successfully!',
            timer: 1500,
            showConfirmButton: false
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to save customer!',
        });
        console.error(error);
    }
});


// ================== UPDATE CUSTOMER ==================
updateBtn.addEventListener("click", function () {
    if (selectedId === null) return;

    const name = nameField.value.trim();
    const contact = contactField.value.trim();
    const address = addressField.value.trim();

    if (!name || !contact || !address) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill all fields before updating!',
        });
        return;
    }

    // Confirmation before update
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to update this customer?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // Perform update
            model.updateCustomer(selectedId, name, contact, address);
            renderTable();
            resetForm();

            // Success message
            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: 'Customer updated successfully!',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
});


// ================== DELETE CUSTOMER ==================
deleteBtn.addEventListener("click", function () {
    if (selectedId === null) return;

    // Confirmation before delete
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to delete this customer?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // Perform delete
            model.deleteCustomer(selectedId);
            renderTable();
            resetForm();

            // Success message
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Customer deleted successfully!',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
});


// ================== TABLE RENDERING ==================
function renderTable() {
    tableBody.innerHTML = "";

    model.getAllCustomers().forEach(c => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${c.id}</td>
            <td>${c.name}</td>
            <td>${c.contact}</td>
            <td>${c.address}</td>
        `;

        row.addEventListener("click", function () {
            onRowClick(c);
        });

        tableBody.appendChild(row);
    });
}

// ================== ON ROW CLICK ==================
function onRowClick(customer) {
    selectedId = customer.id;
    nameField.value = customer.name;
    contactField.value = customer.contact;
    addressField.value = customer.address;

    saveBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
    deleteBtn.classList.remove("d-none");
}

// ================== FORM HELPERS ==================
function clearFields() {
    nameField.value = "";
    contactField.value = "";
    addressField.value = "";
}

function resetForm() {
    clearFields();
    selectedId = null;
    saveBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    deleteBtn.classList.add("d-none");
}
