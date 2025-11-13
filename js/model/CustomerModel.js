let customerArray = [];
let customerIdCounter = 1;

class CustomerModel {
    saveCustomer(name, contact, address) {
        const customer = { id: customerIdCounter++, name, contact, address };
        customerArray.push(customer);
        return customer;
    }

    getAllCustomers() {
        return customerArray;
    }

    updateCustomer(id, name, contact, address) {
        const customer = customerArray.find(c => c.id === id);
        if (customer) {
            customer.name = name;
            customer.contact = contact;
            customer.address = address;
        }
    }

    deleteCustomer(id) {
        customerArray = customerArray.filter(c => c.id !== id);
    }
}
