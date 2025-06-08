document.addEventListener('DOMContentLoaded', function() {
            const deleteButtons = document.querySelectorAll('.action-btn');
            
            deleteButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const row = this.closest('tr');
                    const reservationType = row.cells[0].textContent;
                    
                    if(confirm(`Are you sure you want to delete the reservation for ${reservationType}?`)) {
                        row.classList.add('deleting');
                        
                        setTimeout(() => {
                            row.remove();
                        }, 400);
                    }
                });
            });
        });