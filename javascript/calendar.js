        document.addEventListener('DOMContentLoaded', function() {
            // Current date
            const today = new Date();
            let currentMonth = today.getMonth();
            let currentYear = today.getFullYear();
            let selectedDate = null;
            
            // Sample reservations data
            let reservations = [
                { id: 1, date: new Date(2023, 5, 15), time: '10:00 AM', name: 'John Doe', email: 'john@example.com' },
                { id: 2, date: new Date(2023, 5, 18), time: '2:30 PM', name: 'Jane Smith', email: 'jane@example.com' },
                { id: 3, date: new Date(2023, 5, 20), time: '4:00 PM', name: 'Mike Johnson', email: 'mike@example.com' }
            ];
            
            // DOM Elements
            const currentMonthElement = document.getElementById('current-month');
            const calendarGrid = document.querySelector('.calendar-grid');
            const prevMonthBtn = document.getElementById('prev-month');
            const nextMonthBtn = document.getElementById('next-month');
            const selectedDateElement = document.getElementById('selected-date');
            const timeSlotsContainer = document.getElementById('time-slots');
            const reserveBtn = document.getElementById('reserve-btn');
            const reservationsContainer = document.getElementById('reservations-container');
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            
            // Initialize calendar
            renderCalendar(currentMonth, currentYear);
            renderReservations();
            
            // Event Listeners
            prevMonthBtn.addEventListener('click', () => {
                currentMonth--;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
                renderCalendar(currentMonth, currentYear);
            });
            
            nextMonthBtn.addEventListener('click', () => {
                currentMonth++;
                if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
                renderCalendar(currentMonth, currentYear);
            });
            
            reserveBtn.addEventListener('click', makeReservation);
            
            // Functions
            function renderCalendar(month, year) {
                // Clear existing calendar
                while (calendarGrid.children.length > 7) {
                    calendarGrid.removeChild(calendarGrid.lastChild);
                }
                
                // Update current month display
                const monthNames = ["January", "February", "March", "April", "May", "June", 
                                   "July", "August", "September", "October", "November", "December"];
                currentMonthElement.textContent = `${monthNames[month]} ${year}`;
                
                // Get first day of month and number of days
                const firstDay = new Date(year, month, 1).getDay();
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                
                // Create empty slots for days before first day
                for (let i = 0; i < firstDay; i++) {
                    const emptyDay = document.createElement('div');
                    emptyDay.classList.add('calendar-day', 'empty');
                    calendarGrid.appendChild(emptyDay);
                }
                
                // Create day slots
                for (let day = 1; day <= daysInMonth; day++) {
                    const dayElement = document.createElement('div');
                    dayElement.classList.add('calendar-day');
                    dayElement.innerHTML = `<div class="day-number">${day}</div>`;
                    
                    const currentDate = new Date(year, month, day);
                    
                    // Mark today
                    if (day === today.getDate() && month === today.getMonth() && year === today.getYear()) {
                        dayElement.classList.add('today');
                    }
                    
                    // Mark past dates
                    if (currentDate < today && !(currentDate.getDate() === today.getDate() && 
                        currentDate.getMonth() === today.getMonth() && 
                        currentDate.getFullYear() === today.getFullYear())) {
                        dayElement.classList.add('past');
                    } else {
                        // Add click event for future dates
                        dayElement.addEventListener('click', () => selectDate(day, month, year));
                    }
                    
                    // Check if this date has reservations
                    const dateReservations = reservations.filter(res => 
                        res.date.getDate() === day && 
                        res.date.getMonth() === month && 
                        res.date.getFullYear() === year
                    );
                    
                    if (dateReservations.length > 0) {
                        const reservationDot = document.createElement('div');
                        reservationDot.style.position = 'absolute';
                        reservationDot.style.bottom = '5px';
                        reservationDot.style.width = '8px';
                        reservationDot.style.height = '8px';
                        reservationDot.style.backgroundColor = '#2196f3';
                        reservationDot.style.borderRadius = '50%';
                        dayElement.appendChild(reservationDot);
                    }
                    
                    calendarGrid.appendChild(dayElement);
                }
            }
            
            function selectDate(day, month, year) {
                // Remove previous selection
                document.querySelectorAll('.calendar-day.selected').forEach(el => {
                    el.classList.remove('selected');
                });
                
                // Find and select clicked date
                const days = document.querySelectorAll('.calendar-day:not(.empty):not(.past)');
                const selectedIndex = day - 1;
                if (days[selectedIndex]) {
                    days[selectedIndex].classList.add('selected');
                }
                
                // Store selected date
                selectedDate = new Date(year, month, day);
                
                // Update selected date display
                const dateOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
                selectedDateElement.textContent = selectedDate.toLocaleDateString('en-US', dateOptions);
                
                // Generate time slots
                generateTimeSlots();
            }
            
            function generateTimeSlots() {
                timeSlotsContainer.innerHTML = '';
                
                // Generate time slots from 9 AM to 5 PM
                const startHour = 9;
                const endHour = 17;
                const timeSlots = [];
                
                for (let hour = startHour; hour < endHour; hour++) {
                    for (let minute = 0; minute < 60; minute += 30) {
                        const time = new Date(selectedDate);
                        time.setHours(hour, minute);
                        
                        const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        
                        // Check if time slot is already reserved
                        const isBooked = reservations.some(res => {
                            return res.date.getDate() === selectedDate.getDate() &&
                                   res.date.getMonth() === selectedDate.getMonth() &&
                                   res.date.getFullYear() === selectedDate.getFullYear() &&
                                   res.time === formattedTime;
                        });
                        
                        const timeSlot = document.createElement('div');
                        timeSlot.classList.add('time-slot');
                        if (isBooked) timeSlot.classList.add('booked');
                        timeSlot.textContent = formattedTime;
                        
                        if (!isBooked) {
                          timeSlot.addEventListener('click', () => {
                            timeSlot.classList.toggle('selected'); // toggle selection
                            });
                            }

                        
                        timeSlotsContainer.appendChild(timeSlot);
                    }
                }
            }
            
            function makeReservation() {
    if (!selectedDate) {
        alert('Please select a date first');
        return;
    }

    const selectedTimeSlots = document.querySelectorAll('.time-slot.selected');
    if (selectedTimeSlots.length === 0) {
        alert('Please select at least one time slot');
        return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !email || !validateEmail(email)) {
        alert('Please enter a valid name and email.');
        return;
    }

    // ✅ Check for duplicate by date, name, and email
    const hasDuplicate = reservations.some(res =>
        res.name === name &&
        res.email === email &&
        res.date.getDate() === selectedDate.getDate() &&
        res.date.getMonth() === selectedDate.getMonth() &&
        res.date.getFullYear() === selectedDate.getFullYear()
    );

    if (hasDuplicate) {
        alert('You have already made a reservation for this date using this email.');
        return;
    }

    // ✅ Add each selected slot
    selectedTimeSlots.forEach(slot => {
        const reservation = {
            id: Date.now() + Math.random(),
            date: new Date(selectedDate),
            time: slot.textContent,
            name: name,
            email: email
        };
        reservations.push(reservation);
    });

    renderReservations();
    nameInput.value = '';
    emailInput.value = '';
    document.querySelectorAll('.time-slot.selected').forEach(el => el.classList.remove('selected'));
    renderCalendar(currentMonth, currentYear);

    const times = Array.from(selectedTimeSlots).map(slot => slot.textContent).join(', ');
    alert(`Reservation confirmed for ${selectedDateElement.textContent} at ${times}`);
}

            
            
            function renderReservations() {
                if (reservations.length === 0) {
                    reservationsContainer.innerHTML = '<div class="empty-reservations">No reservations yet</div>';
                    return;
                }
                
                // Sort reservations by date
                reservations.sort((a, b) => a.date - b.date);
                
                reservationsContainer.innerHTML = '';
                
                reservations.forEach(res => {
                    const dateStr = res.date.toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                    });
                    
                    const reservationItem = document.createElement('div');
                    reservationItem.classList.add('reservation-item');
                    reservationItem.innerHTML = `
                        <div class="reservation-details">
                            <div class="reservation-date">${dateStr}</div>
                            <div class="reservation-time">${res.time} - ${res.name}</div>
                        </div>
                        <div class="reservation-actions">
                            <button class="delete-btn" data-id="${res.id}">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    `;
                    
                    reservationsContainer.appendChild(reservationItem);
                });
                
                // Add event listeners to delete buttons
                document.querySelectorAll('.delete-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const id = parseInt(this.getAttribute('data-id'));
                        deleteReservation(id);
                    });
                });
            }
            // Deselect all time slots
document.querySelectorAll('.time-slot.selected').forEach(el => {
    el.classList.remove('selected');
});

            function deleteReservation(id) {
                if (confirm('Are you sure you want to cancel this reservation?')) {
                    reservations = reservations.filter(res => res.id !== id);
                    renderReservations();
                    renderCalendar(currentMonth, currentYear);
                }
            }
            
            function validateEmail(email) {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            }
        });