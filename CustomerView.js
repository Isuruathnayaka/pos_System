class CustomerController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.currentCustomerId = null;

        // Bind event handlers
        this.view.bindAddCustomer(this.handleAddCustomer);
        this.view.bindUpdateCustomer(this.handleUpdateCustomer);
        this.view.bindDeleteCustomer(this.handleDeleteCustomer);
        this.view.bindSelectCustomer(this.handleSelectCustomer);
        this.view.bindResetForm(this.handleResetForm);

        // Initial render
        this.view.renderCustomerList(this.model.getAll());
    }

    // Handle adding a new customer
    handleAddCustomer = (customerDTO) => {
        if (!customerDTO.isValid()) {
            this.view.showMessage('Please fill in all required fields (Name and Contact)', 'danger');
            return;
        }

        const newCustomer = this.model.create(customerDTO);
        this.view.renderCustomerList(this.model.getAll());
        this.view.showMessage(`Customer "${newCustomer.name}" added successfully`);
        this.view.resetForm();
    }

    // Handle updating a customer
    handleUpdateCustomer = (customerDTO) => {
        if (!this.currentCustomerId) {
            this.view.showMessage('No customer selected for update', 'warning');
            return;
        }

        if (!customerDTO.isValid()) {
            this.view.showMessage('Please fill in all required fields (Name and Contact)', 'danger');
            return;
        }

        const updatedCustomer = this.model.update(this.currentCustomerId, customerDTO);
        if (updatedCustomer) {
            this.view.renderCustomerList(this.model.getAll());
            this.view.showMessage(`Customer "${updatedCustomer.name}" updated successfully`);
            this.view.resetForm();
            this.currentCustomerId = null;
        }
    }

    // Handle deleting a customer
    handleDeleteCustomer = () => {
        if (!this.currentCustomerId) {
            this.view.showMessage('No customer selected for deletion', 'warning');
            return;
        }

        const customer = this.model.getById(this.currentCustomerId);
        if (customer && confirm(`Are you sure you want to delete customer "${customer.name}"?`)) {
            const success = this.model.delete(this.currentCustomerId);
            if (success) {
                this.view.renderCustomerList(this.model.getAll());
                this.view.showMessage(`Customer "${customer.name}" deleted successfully`);
                this.view.resetForm();
                this.currentCustomerId = null;
            }
        }
    }

    // Handle selecting a customer
    handleSelectCustomer = (id) => {
        const customer = this.model.getById(id);
        if (customer) {
            this.currentCustomerId = customer.id;
            this.view.populateForm(customer);
        }
    }

    // Handle resetting the form
    handleResetForm = () => {
        this.view.resetForm();
        this.currentCustomerId = null;
    }
}

