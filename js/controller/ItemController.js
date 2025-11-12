
$(document).ready(function () {
    const items = [];
    let selectedItemId = null;
    let nextId = 1;

    function renderTable() {
        const $tbody = $("#itemTable tbody");
        $tbody.empty();
        items.forEach(item => {
            const $row = $(`
                <tr>
                    <td>${item.id}</td>
                    <td>${item.code}</td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>${item.quantity}</td>
                </tr>
            `);

            $row.click(() => onRowSelect(item));
            $tbody.append($row);
        });
    }

    function clearFields() {
        $("#itemCode").val("");
        $("#name").val("");
        $("#price").val("");
        $("#quantity").val("");
        selectedItemId = null;
        $("#saveItemBtn").prop("disabled", false);
        $("#updateItemBtn").addClass("d-none");
        $("#deleteItemBtn").addClass("d-none");
    }

    function onRowSelect(item) {
        selectedItemId = item.id;
        $("#itemCode").val(item.code);
        $("#name").val(item.name);
        $("#price").val(item.price);
        $("#quantity").val(item.quantity);

        $("#saveItemBtn").prop("disabled", true);
        $("#updateItemBtn").removeClass("d-none");
        $("#deleteItemBtn").removeClass("d-none");
    }

    // ---------------- Save ----------------
    $("#saveItemBtn").click(function () {
        const code = $("#itemCode").val().trim();
        const name = $("#name").val().trim();
        const price = $("#price").val().trim();
        const quantity = $("#quantity").val().trim();

        if (!code || !name || !price || !quantity) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all fields!',
            });
            return;
        }

        items.push({ id: nextId++, code, name, price, quantity });
        renderTable();
        clearFields();

        Swal.fire({
            icon: 'success',
            title: 'Saved!',
            text: 'Item saved successfully!',
            timer: 1500,
            showConfirmButton: false
        });
    });

    // ---------------- Update ----------------
    $("#updateItemBtn").click(function () {
        if (selectedItemId === null) return;

        const code = $("#itemCode").val().trim();
        const name = $("#name").val().trim();
        const price = $("#price").val().trim();
        const quantity = $("#quantity").val().trim();

        if (!code || !name || !price || !quantity) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all fields before updating!',
            });
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to update this item?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                const item = items.find(i => i.id === selectedItemId);
                item.code = code;
                item.name = name;
                item.price = price;
                item.quantity = quantity;

                renderTable();
                clearFields();

                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Item updated successfully!',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    });

    // ---------------- Delete ----------------
    $("#deleteItemBtn").click(function () {
        if (selectedItemId === null) return;

        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete this item?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                const index = items.findIndex(i => i.id === selectedItemId);
                if (index !== -1) items.splice(index, 1);

                renderTable();
                clearFields();

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Item deleted successfully!',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    });
});
