document.addEventListener('DOMContentLoaded', function() {
            // Sample initial inventory data
            let inventory = [
                { id: 1, name: "Microscope", quantity: 15, category: "equipment" },
                { id: 2, name: "Bunsen Burner", quantity: 28, category: "equipment" },
                { id: 3, name: "Hydrochloric Acid", quantity: 5, category: "chemical" },
                { id: 4, name: "Petri Dishes", quantity: 200, category: "consumable" },
                { id: 5, name: "Safety Goggles", quantity: 42, category: "equipment" }
            ];
            
            const notification = document.getElementById('notification');
            const inventoryBody = document.getElementById('inventoryBody');
            const addItemBtn = document.getElementById('addItemBtn');
            const itemNameInput = document.getElementById('itemName');
            const itemQuantityInput = document.getElementById('itemQuantity');
            const itemCategorySelect = document.getElementById('itemCategory');
            
            // Render inventory table
            function renderInventory() {
                inventoryBody.innerHTML = '';
                
                if (inventory.length === 0) {
                    inventoryBody.innerHTML = `
                        <tr class="empty-row">
                            <td colspan="5">No inventory items found. Add your first item!</td>
                        </tr>
                    `;
                    return;
                }
                
                inventory.forEach(item => {
                    const row = document.createElement('tr');
                    
                    // Add category-based styling
                    if (item.category === 'equipment') {
                        row.classList.add('category-equipment');
                    } else if (item.category === 'chemical') {
                        row.classList.add('category-chemical');
                    }
                    
                    // Determine status
                    let statusText, statusClass;
                    if (item.quantity >= 20) {
                        statusText = 'In Stock';
                        statusClass = 'status-in-stock';
                    } else if (item.quantity >= 5) {
                        statusText = 'Low Stock';
                        statusClass = 'status-low-stock';
                    } else {
                        statusText = 'Out of Stock';
                        statusClass = 'status-out-of-stock';
                    }
                    
                    row.innerHTML = `
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
                        <td>${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</td>
                        <td><span class="status-indicator ${statusClass}"></span>${statusText}</td>
                        <td class="action-cell">
                            <button class="btn btn-delete" data-id="${item.id}">Delete</button>
                        </td>
                    `;
                    
                    inventoryBody.appendChild(row);
                });
                
                // Add event listeners to delete buttons
                document.querySelectorAll('.btn-delete').forEach(button => {
                    button.addEventListener('click', function() {
                        const itemId = parseInt(this.getAttribute('data-id'));
                        deleteItem(itemId);
                    });
                });
            }
            
            // Add new item
            function addItem() {
                const name = itemNameInput.value.trim();
                const quantity = parseInt(itemQuantityInput.value);
                const category = itemCategorySelect.value;
                
                // Validate inputs
                if (!name) {
                    showNotification('Please enter an item name', 'error');
                    return;
                }
                
                if (isNaN(quantity) || quantity < 0) {
                    showNotification('Please enter a valid quantity', 'error');
                    return;
                }
                
                if (!category) {
                    showNotification('Please select a category', 'error');
                    return;
                }
                
                // Create new item
                const newItem = {
                    id: Date.now(), // Unique ID
                    name: name,
                    quantity: quantity,
                    category: category
                };
                
                // Add to inventory
                inventory.push(newItem);
                
                // Clear form
                itemNameInput.value = '';
                itemQuantityInput.value = '';
                itemCategorySelect.selectedIndex = 0;
                
                // Render updated inventory
                renderInventory();
                
                // Show success message
                showNotification('Item added successfully!', 'success');
            }
            
            // Delete item
            function deleteItem(itemId) {
                if (confirm('Are you sure you want to delete this item?')) {
                    inventory = inventory.filter(item => item.id !== itemId);
                    renderInventory();
                    showNotification('Item deleted successfully!', 'success');
                }
            }
            
            // Show notification
            function showNotification(message, type) {
                notification.textContent = message;
                notification.className = 'notification';
                notification.classList.add(`notification-${type}`);
                notification.style.display = 'block';
                
                // Hide notification after 3 seconds
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 3000);
            }
            
            // Event listeners
            addItemBtn.addEventListener('click', addItem);
            
            // Allow adding with Enter key
            itemNameInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') addItem();
            });
            
            itemQuantityInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') addItem();
            });
            
            // Initialize the table
            renderInventory();
        });