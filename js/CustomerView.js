// CustomerView.js

export class CustomerView {
    // --- Elements ---
    static get customerNameInput() { return document.getElementById('customerName'); }
    static get customerContactInput() { return document.getElementById('customerContact'); }
    static get customerAddressInput() { return document.getElementById('customerAddress'); }
    static get saveBtn() { return document.getElementById('saveCustomerBtn'); }
    static get updateBtn() { return document.getElementById('updateCustomerBtn'); }
    static get deleteBtn() { return document.getElementById('deleteCustomerBtn'); }
    static get tableBody() { return document.getElementById('customerTable').querySelector('tbody'); }

    /**
     * Renders the customer table rows.
     * @param {Array<import('./CustomerDTO.js').CustomerDTO>} customers
     */
    static renderTable(customers) {
        const tbody = CustomerView.tableBody;
        tbody.innerHTML = ''; // Clear existing rows

        customers.forEach(customer => {
            const row = tbody.insertRow();
            // Store the ID on the row for easy retrieval on click
            row.setAttribute('data-customer-id', customer.id);

            row.insertCell().textContent = customer.id;
            row.insertCell().textContent = customer.name;
            row.insertCell().textContent = customer.contact;
            row.insertCell().textContent = customer.address;
        });
    }

    /**
     * Loads a customer's data into the form fields.
     * @param {import('./CustomerDTO.js').CustomerDTO} customer
     */
    static loadForm(customer) {
        CustomerView.customerNameInput.value = customer.name;
        CustomerView.customerContactInput.value = customer.contact;
        CustomerView.customerAddressInput.value = customer.address;

        // Store the ID in a temporary attribute on the form or a hidden field
        document.getElementById('customerForm').setAttribute('data-current-id', customer.id);
    }

    /**
     * Clears the form and resets button states.
     */
    static resetForm() {
        CustomerView.customerNameInput.value = '';
        CustomerView.customerContactInput.value = '';
        CustomerView.customerAddressInput.value = '';

        document.getElementById('customerForm').removeAttribute('data-current-id');

        CustomerView.saveBtn.classList.remove('d-none');
        CustomerView.updateBtn.classList.add('d-none');
        CustomerView.deleteBtn.classList.add('d-none');
    }

    /**
     * Switches button visibility for update/delete mode.
     */
    static switchToEditMode() {
        CustomerView.saveBtn.classList.add('d-none');
        CustomerView.updateBtn.classList.remove('d-none');
        CustomerView.deleteBtn.classList.remove('d-none');
    }
}