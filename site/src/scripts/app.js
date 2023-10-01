import tabs from './tabs'

// Document elements
const docElement = document.documentElement;

// Page elements
const preText = document.querySelector('.pre-text')
const table = document.querySelector('table')
const form = document.querySelector('form');

// Table specific buttons
const tableBtns = document.querySelector('.table-buttons')
const tableClearBtn = document.querySelector('.table-clear')

document.addEventListener('DOMContentLoaded', () => {
    tabs.runTabs()

    form.addEventListener('submit', event => {
        event.preventDefault()

        // Get the values of input fields after form submission
        const hourlyProfit = document.querySelector('#hourly-profit').value
        const totalMined = document.querySelector('#total-mined').value
        const iterations = document.querySelector('#iterations').value
        const endDateInput = document.querySelector('#end-date').value

        // Reset the form fields
        form.reset()

        // Remove pre-table text
        preText.classList.add('hidden')

        // Unhide the table
        table.classList.remove('hidden')
        tableBtns.classList.remove('hidden')

        console.log(hourlyProfit, totalMined, iterations, endDateInput)
    });
    
    // Hide the table
    tableClearBtn.addEventListener('click', () => {
        tableBtns.classList.add('hidden')
        table.classList.add('hidden')
        preText.classList.remove('hidden')
    })
});
