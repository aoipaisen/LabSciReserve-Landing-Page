// Calendar functionality
        document.querySelectorAll('.calendar-day:not(.empty)').forEach(day => {
            day.addEventListener('click', function() {
                // Remove previous selection
                document.querySelectorAll('.calendar-day.selected').forEach(el => {
                    el.classList.remove('selected');
                });
                
                // Select clicked day
                this.classList.add('selected');
                
                // Update selected date display
                const dayNum = this.textContent;
                const monthYear = document.querySelector('.calendar-header h3').textContent;
                document.getElementById('current-date').textContent = `Selected Date: ${monthYear.split(' ')[0]} ${dayNum}, ${monthYear.split(' ')[1]}`;
            });
        });
        
        // Time period toggle
        const amBtn = document.getElementById('am-btn');
        const pmBtn = document.getElementById('pm-btn');
        
        amBtn.addEventListener('click', function() {
            amBtn.classList.add('active');
            pmBtn.classList.remove('active');
        });
        
        pmBtn.addEventListener('click', function() {
            pmBtn.classList.add('active');
            amBtn.classList.remove('active');
        });
        
        // Form validation and continue button
        document.getElementById('continue-btn').addEventListener('click', function() {
            const name = document.getElementById('name').value;
            const resource = document.getElementById('resources').value;
            const quantity = document.getElementById('quantity').value;
            const time = document.getElementById('time').value;
            const period = document.querySelector('.time-period-btn.active').textContent;
            const selectedDay = document.querySelector('.calendar-day.selected');
            
            if (!name) {
                alert('Please enter your name');
                return;
            }
            
            if (!resource) {
                alert('Please select a resource');
                return;
            }
            
            if (!quantity || quantity < 1) {
                alert('Please enter a valid quantity');
                return;
            }
            
            if (!time || !time.match(/^\d{1,2}:\d{2}$/)) {
                alert('Please enter a valid time (e.g., 09:30)');
                return;
            }
            
            if (!selectedDay) {
                alert('Please select a date on the calendar');
                return;
            }
            
            // If all valid, show success message
            alert(`Reservation submitted for ${document.getElementById('current-date').textContent.split(': ')[1]} at ${time} ${period}`);
        });
        
        // Month navigation (simplified for this demo)
        document.getElementById('next-month').addEventListener('click', function() {
            alert('July 2025 calendar would be displayed');
        });
        
        document.getElementById('prev-month').addEventListener('click', function() {
            alert('May 2025 calendar would be displayed');
        });