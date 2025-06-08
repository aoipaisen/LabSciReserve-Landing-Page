document.addEventListener("DOMContentLoaded", function () {
  const addBtn = document.getElementById("add-btn");
  const itemNameInput = document.getElementById("addItemName");
  const quantityInput = document.getElementById("addQuantity");
  const categorySelect = document.getElementById("addCategory");
  const tableBody = document.querySelector("#inventoryTable tbody");

  addBtn.addEventListener("click", function () {
    const itemName = itemNameInput.value.trim();
    const quantity = parseInt(quantityInput.value.trim(), 10);
    const category = categorySelect.value;

    if (!itemName || isNaN(quantity)) {
      alert("Please enter a valid item name and quantity.");
      return;
    }

    const row = document.createElement("tr");

    const availability = quantity > 0 ? "Available" : "Out of Stock";

    row.innerHTML = `
      <td>${itemName}</td>
      <td>${quantity}</td>
      <td>${category}</td>
      <td>${availability}</td>
      <td><button class="delete-btn">Delete</button></td>
    `;

    // Delete button event
    row.querySelector(".delete-btn").addEventListener("click", function () {
      row.remove();
    });

    tableBody.appendChild(row);

    // Clear form inputs
    itemNameInput.value = "";
    quantityInput.value = "";
    categorySelect.selectedIndex = 0;
  });
});
