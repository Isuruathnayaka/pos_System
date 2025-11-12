// Model (Handles data storage & logic)
class CustomerModel {
    constructor() {
        this.customers = [];
        this.nextId = 1;
    }

    saveCustomer(name, contact, address) {
        const customer = new CustomerDTO(this.nextId++, name, contact, address);
        this.customers.push(customer);
    }

    getAllCustomers() {
        return this.customers;
    }

    updateCustomer(id, name, contact, address) {
        const customer = this.customers.find(c => c.id === id);
        if (customer) {
            customer.name = name;
            customer.contact = contact;
            customer.address = address;
        }
    }

    deleteCustomer(id) {
        this.customers = this.customers.filter(c => c.id !== id);
    }
}
