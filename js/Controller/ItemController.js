const saveBtn=document.getElementById("saveItemBtn")
const updateBtn=document.getElementById("updateItemBtn")
const deleteBtn=document.getElementById("deleteItemBtn")
const tableBody=document.querySelector("#itemTable")

const itemCodeField=document.getElementById("itemCode")
const itemNameField=document.getElementById("name")
const itemPrice=document.getElementById("price")
const itemQuantity=document.getElementById("quantity")

let itemCount=0;
let selectedRow=null;

saveBtn.addEventListener("click",()=>{
    const code=itemCodeField.value.trim();
    const name=itemNameField.value.trim();
    const price=itemPrice.value.trim();
    const quantity=itemQuantity.value.trim();
    if (code && name && price && quantity) {
        itemCount++;
        const newRow = document.createElement("tr");
        newRow.innerHTML =
            <td>${itemCount}</td>
        <td>${code}</td>
        <td>${name}</td>
        <td>${price}</td>
        <td>${quantity}</td>;
        tableBody.appendChild(newRow);
        clearFields();
        attachRowClickEvents();

    }else {
        alert("Please fill all fields before saving!");
    }
});
function attachRowClickEvents(){
    const rows=tableBody.querySelectorAll("tr");
    rows.forEach(row=>{
        row.oneclick=()=>{
            selectedRow=row;

            itemCodeField.value=row.children[1].textContent;
            nameField.value=row.children[2].textContent;


        }
    })
}