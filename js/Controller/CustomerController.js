const saveBtn = document.getElementById("saveCustomerBtn");
const updateBtn = document.getElementById("updateCustomerBtn");
const deleteBtn = document.getElementById("deleteCustomerBtn");
const tableBody = document.querySelector("#customerTable tbody");

const nameField = document.getElementById("customerName");
const contactField = document.getElementById("customerContact");
const addressField = document.getElementById("customerAddress");

let customerCount = 0;
let selectedRow = null;

//Save Button
saveBtn.addEventListener("click", () => {
    const name = nameField.value.trim();
    const contact = contactField.value.trim();
    const address = addressField.value.trim();

    if (name && contact && address) {
        customerCount++;
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
                <td>${customerCount}</td>
                <td>${name}</td>
                <td>${contact}</td>
                <td>${address}</td>
            `;
        tableBody.appendChild(newRow);

        clearFields();
        attachRowClickEvents();
    } else {
        alert("Please fill all fields before saving!");
    }
});

// Row Click Functionality
function attachRowClickEvents() {
    const rows = tableBody.querySelectorAll("tr");
    rows.forEach(row => {
        row.onclick = () => {
            selectedRow = row;

            // Load data into fields
            nameField.value = row.children[1].textContent;
            contactField.value = row.children[2].textContent;
            addressField.value = row.children[3].textContent;

            // Toggle buttons
            saveBtn.disabled = true;
            updateBtn.classList.remove("d-none");
            deleteBtn.classList.remove("d-none");
        };
    });
}

// Update Button
updateBtn.addEventListener("click", () => {
    if (selectedRow) {
        selectedRow.children[1].textContent = nameField.value;
        selectedRow.children[2].textContent = contactField.value;
        selectedRow.children[3].textContent = addressField.value;
        resetFormState();
    }
});

// Delete Button
deleteBtn.addEventListener("click", () => {
    if (selectedRow) {
        selectedRow.remove();
        resetFormState();
    }
});


function clearFields() {
    nameField.value = "";
    contactField.value = "";
    addressField.value = "";
}

function resetFormState() {
    clearFields();
    saveBtn.disabled = false;
    updateBtn.classList.add("d-none");
    deleteBtn.classList.add("d-none");
    selectedRow = null;
}