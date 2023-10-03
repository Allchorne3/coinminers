import tabs from './tabs'

// Document elements
const docElement = document.documentElement;

// Page elements
const preText = document.querySelector('.pre-text')
const table = document.querySelector('table')
const form = document.querySelector('form');

// Table specific buttons
const moneyInfo = document.querySelector('.money-info')
const tableClearBtn = document.querySelector('.table-clear')

let perHour = document.querySelector('#per-hour span')
let perDay = document.querySelector('#per-day span')
let perWeek = document.querySelector('#per-week span')
let perMonth = document.querySelector('#per-month span')
let perYear = document.querySelector('#per-year span')

// Clear the table
const clearTable = () => {
    while (table.rows.length > 1) {
      table.deleteRow(table.rows.length - 1);
    }

    table.classList.add('hidden')
    preText.classList.remove('hidden')
}

// Get the date in words
const currentDate = (dayNumber, dateInputValue) => {
	// Determine whether a date has been selected
	const currentDate = dateInputValue ? new Date(dateInputValue) : new Date();

	currentDate.setDate(currentDate.getDate() + dayNumber);

	return currentDate.toDateString();
};

const getEndDate = (endDate) => {
    const date = new Date(endDate);
    return date;
}

const getStartDate = (startDate) => {
    const date = new Date(startDate);	
    return date;
}

document.addEventListener('DOMContentLoaded', () => {
    tabs.runTabs()

    form.addEventListener('submit', event => {
        event.preventDefault()
        clearTable()

        // Get the values of input fields after form submission
        const hourlyProfit = parseFloat(document.querySelector('#hourly-profit').value)
        const totalMined = parseFloat(document.querySelector('#total-mined').value)
        let iterations = parseInt(document.querySelector('#iterations').value)
        const endDate = document.querySelector('#end-date').value
        const startDate = document.querySelector('#start-date').value
        let tbody = document.createElement('tbody');
        let earnings;
        const endDateObj = getEndDate(endDate);
        let startDateObj;
        let daysTotal = document.querySelector('h3#total-days span');
        let minedTotal = document.querySelector('h3#total-earned span');

        earnings = totalMined ? totalMined : 0;

        if (endDate && iterations) {
            if (!document.querySelector('.error-message')) {
                const errorMessage = document.createElement('p');
                errorMessage.textContent = 'You cannot specify both a date range and a number of iterations.';
                errorMessage.classList.add('error-message');
                form.appendChild(errorMessage);
                document.querySelector('#iterations').classList.add('error');
                document.querySelector('#end-date').classList.add('error');
            }
            return 
        } else if (!endDate && !iterations) {
            if (!document.querySelector('.error-message-iterations')) {
                const errorMessageIterations = document.createElement('p');
                errorMessageIterations.textContent = 'You need to enter a number of days or select an end date.';
                errorMessageIterations.classList.add('error-message');
                form.appendChild(errorMessageIterations);
                document.querySelector('#iterations').classList.add('error');
                document.querySelector('#end-date').classList.add('error');
            }
            return
        } else {
            const errorMessage = document.querySelector('.error-message');
            if (errorMessage) {
                form.removeChild(errorMessage);
            }
            document.querySelector('#iterations').classList.remove('error');
            document.querySelector('#end-date').classList.remove('error');

            table.classList.remove('hidden')
            moneyInfo.classList.remove('hidden')
            preText.classList.add('hidden')

            if (startDate) {
                startDateObj = getStartDate(startDate)
            } else {
                startDateObj = new Date(); // Use the current date if no start date is provided
            }

            if (endDate) {
                const timeDifference = endDateObj - startDateObj;
                iterations = Math.ceil(timeDifference / (24 * 60 * 60 * 1000)) + 1; // Calculate the number of days between start and end dates
            } else {
                iterations = iterations;
            }

            for (let i = 0; i < iterations; i++) {
                earnings += (hourlyProfit * 24);

                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td data-label="Day">Day ${i + 1} - ${currentDate((i + 1), startDateObj)}</td>
                    <td data-label="Total Mined">£${earnings.toFixed(2)}</td>
                `;
                tbody.appendChild(newRow);
                table.appendChild(tbody);
            }

            daysTotal.textContent = iterations
            minedTotal.textContent = earnings.toFixed(2)
            perHour.textContent =`£${hourlyProfit.toFixed(2)}`
            perDay.textContent =`£${(hourlyProfit * 24).toFixed(2)}`
            perWeek.textContent =`£${(hourlyProfit * 168).toFixed(2)}`
            perMonth.textContent =`£${(hourlyProfit * 720 ).toFixed(2)}`
            perYear.textContent =`£${(hourlyProfit * 8760).toFixed(2)}`
        }
    });

    // Hide the table
    tableClearBtn.addEventListener('click', () => {
        moneyInfo.classList.add('hidden')
        table.classList.add('hidden')
        preText.classList.remove('hidden')
    })
});
