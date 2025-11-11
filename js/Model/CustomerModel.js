// controller/CustomerController.js
import CustomerDTO from "../dto/CustomerDTO.js";
import CustomerModel from "../model/CustomerModel.js";

export default class CustomerController {
    constructor() {
        this.model = new CustomerModel();

        this.saveBtn = document.getElementById("saveCustomerBtn");
        this.updateBtn = document.getElementById("updateCustomerBtn");
        this.deleteBtn = document.getElementById("deleteCustomerBtn");
        this.tableBody = document.querySelector("#customerTable tbody");

        this.nameField = document.getElementById("customerName");
        this.contactField = document.getElementById("customerContact");
        this.addressField = document.getElementById("customerAddress");

        this.selectedCustomerId = null;

        this.init();
    }

    init() {
        this.saveBtn.addEventListener("click", () => this.saveCustomer());
        this.updateBtn.addEventListener("click", () => this.updateCustomer());
        this.deleteBtn.addEventListener("click", () => this.deleteCustomer());
    }

    saveCustomer() {
        const name = this.nameField.value.trim();
        const contact = this.contactField.value.trim();
        const address = this.addressField.value.trim();

        if (name && contact && address) {
            const newCustomer = new CustomerDTO(null, name, contact, address);
            const savedCustomer = this.model.addCustomer(newCustomer);
            this.renderTable();
            this.clearFields();
        } else {
            alert("Please fill all fields before saving!");
        }
    }

    updateCustomer() {
        if (!this.selectedCustomerId) return;

        const updated = new CustomerDTO(
            this.selectedCustomerId,
            this.nameField.value.trim(),
            this.contactField.value.trim(),
            this.addressField.value.trim()
        );

        this.model.updateCustomer(this.selectedCustomerId, updated);
        this.renderTable();
        this.resetFormState();
    }

    deleteCustomer() {
        if (!this.selectedCustomerId) return;

        this.model.deleteCustomer(this.selectedCustomerId);
        this.renderTable();
        this.resetFormState();
    }

    renderTable() {
        this.tableBody.innerHTML = "";
        const customers = this.model.getAllCustomers();

        customers.forEach(customer => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.contact}</td>
                <td>${customer.address}</td>
            `;
            row.addEventListener("click", () => {
                this.selectedCustomerId = customer.id;
                this.nameField.value = customer.name;
                this.contactField.value = customer.contact;
                this.addressField.value = customer.address;

                this.saveBtn.disabled = true;
                this.updateBtn.classList.remove("d-none");
                this.deleteBtn.classList.remove("d-none");
            });

            this.tableBody.appendChild(row);
        });
    }

    clearFields() {
        this.nameField.value = "";
        this.contactField.value = "";
        this.addressField.value = "";
    }

    resetFormState() {
        this.clearFields();
        this.saveBtn.disabled = false;
        this.updateBtn.classList.add("d-none");
        this.deleteBtn.classList.add("d-none");
        this.selectedCustomerId = null;
    }
}
