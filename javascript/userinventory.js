document.getElementById('search').addEventListener('input', function () {
  const value = this.value.toLowerCase();
  const items = document.querySelectorAll('.inventory-grid > div');

  for (let i = 3; i < items.length; i += 3) {
    const itemName = items[i].textContent.toLowerCase();
    const show = itemName.includes(value);

    items[i].style.display = show ? '' : 'none';
    items[i + 1].style.display = show ? '' : 'none';
    items[i + 2].style.display = show ? '' : 'none';
  }
});

function checkAvailability() {
  const itemName = document.getElementById("itemName").value.trim();
  const category = document.getElementById("itemCategory").value;

  if (itemName === "") {
    alert("Please enter an item name.");
    return;
  }

  alert(`Checking availability for "${itemName}" in ${category} category.`);
  // Future logic: filter table or send request
}

