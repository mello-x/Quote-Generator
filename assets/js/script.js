let itemNumber = 1;

// Add event listener for Add Item button
document.getElementById('add_item').addEventListener('click', function () {
    const tableBody = document.getElementById('services_table').getElementsByTagName('tbody')[0];
    const newRow = tableBody.insertRow();
    newRow.setAttribute('data-row-id', itemNumber);

    newRow.innerHTML = `
        <td>${itemNumber++}</td>
        <td><input type="text" name="item[]" placeholder="Enter item"></td>
        <td><input type="number" name="quantity[]" value="1"></td>
        <td><input type="number" name="price[]" value="0"></td>
        <td></td>
        <td></td>
    `;

    const actionCell = newRow.cells[5]; // Get the action cell

    // Create the Remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.type = 'button';
    removeButton.classList.add('btn', 'btn-danger');
    removeButton.addEventListener('click', function () {
        removeRow(this);
    });

    // Add the Remove button to the action cell
    actionCell.appendChild(removeButton);

    // Update total price when quantity or price changes
    newRow.cells[2].firstChild.addEventListener('change', updateTotalPrice);
    newRow.cells[3].firstChild.addEventListener('change', updateTotalPrice);
});

// Function to remove the row
function removeRow(button) {
    const row = button.parentNode.parentNode;
    const rowId = parseInt(row.getAttribute('data-row-id'));
    row.remove();

    // Update item numbers after deleting the row
    updateItemNumbers();

    // Update total price after removing the row
    updateTotalPrice();
}

// Function to update item numbers after deleting rows
function updateItemNumbers() {
    const tableBody = document.getElementById('services_table').getElementsByTagName('tbody')[0];
    const rows = tableBody.getElementsByTagName('tr');

    // Update item numbers for each row
    for (let i = 0; i < rows.length; i++) {
        rows[i].cells[0].textContent = i + 1; // Update item number in the first cell
        rows[i].setAttribute('data-row-id', i);
    }

    // Update itemNumber to continue from where it left off
    itemNumber = rows.length + 1;
}


// Add event listeners for discount and VAT input fields
document.getElementById('discount').addEventListener('input', function() {
    updateTotalPrice(); // Call the updateTotalPrice function whenever the discount value changes
});

// Add event listener for discount type dropdown menu
document.getElementById('discount_type').addEventListener('change', function() {
    updateTotalPrice(); // Call the updateTotalPrice function whenever the discount type changes
});

document.getElementById('vat_percentage').addEventListener('input', function() {
    updateTotalPrice(); // Call the updateTotalPrice function whenever the VAT percentage changes
});

// Function to update total price based on quantity, price, and discount
function updateTotalPrice() {
    const rows = document.getElementById('services_table').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    let totalAmount = 0;
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const quantity = parseInt(row.cells[2].querySelector('input').value);
        const price = parseFloat(row.cells[3].querySelector('input').value);
        const totalPrice = quantity * price;
        totalAmount += totalPrice;
        row.cells[4].textContent = formatCurrency(totalPrice) + ' ' + getCurrencySymbol(); // Update total price with formatted currency
    }

    // Update total amount label
    document.getElementById('total_amount_label').textContent = formatCurrency(totalAmount) + ' ' + getCurrencySymbol(); // Update total amount with formatted currency

    // Calculate VAT
    const vatPercentage = parseFloat(document.getElementById('vat_percentage').value);
    const vatAmount = (totalAmount * vatPercentage) / 100;
    document.getElementById('vat_amount_label').textContent = formatCurrency(vatAmount) + ' ' + getCurrencySymbol(); // Update VAT amount with formatted currency

    // Apply discount
    const discountType = document.getElementById('discount_type').value;
    const discountValue = parseFloat(document.getElementById('discount').value);

    let totalAmountWithDiscount = totalAmount;
    if (discountType === 'percentage') {
        totalAmountWithDiscount *= (100 - discountValue) / 100;
    } else if (discountType === 'fixed') {
        totalAmountWithDiscount -= discountValue;
    }

    // Ensure that total amount with discount is non-negative
    totalAmountWithDiscount = Math.max(totalAmountWithDiscount, 0);

    // Update total amount with discount and VAT
    const totalAmountWithVAT = totalAmountWithDiscount + vatAmount;
    document.getElementById('total_amount_with_vat_label').textContent = formatCurrency(totalAmountWithVAT) + ' ' + getCurrencySymbol(); // Update total amount with VAT with formatted currency
}

document.addEventListener('DOMContentLoaded', function() {
    // Select all currency radio buttons
    const currencyRadios = document.querySelectorAll('input[name="currency"]');
    
    // Add change event listener to each radio button
    currencyRadios.forEach(function(radio) {
        radio.addEventListener('change', function() {
            // Update total price and currency symbols when a currency is switched
            updateTotalPrice();
            updateCurrencySymbol();
        });
    });
});

function updateCurrencySymbol() {
    const selectedCurrencySymbol = getCurrencySymbol();

    // Assuming you have functions or logic here to handle the updating of the currency symbol
    console.log("Updated currency to: " + selectedCurrencySymbol);
}

function getCurrencySymbol() {
    const currencyInputs = document.getElementsByName('currency');
    for (let i = 0; i < currencyInputs.length; i++) {
        if (currencyInputs[i].checked) {
            switch (currencyInputs[i].value) {
                case 'USD': return '$';
                case 'GBP': return '£';
                case 'EUR': return '€';
                case 'SGD': return 'S$';
                // Add more cases as needed
                default: return 'THB'; // Default or case for Thai Baht
            }
        }
    }
}

function updateQuotationCurrency() {
    // Determine the selected currency symbol
    const selectedCurrencySymbol = getCurrencySymbol();

    // Select all elements that contain currency values
    const currencyElements = document.querySelectorAll('.currency-value');

    // Iterate over each element and update its content
    currencyElements.forEach(function(element) {
        const value = element.getAttribute('data-value'); // Assuming you store the raw number in a data attribute
        if (value === "Included") {
            // If the price is included, no change needed
            element.textContent = "Included";
        } else {
            // Format the number and prepend the currency symbol
            element.textContent = `${selectedCurrencySymbol} ${numberWithCommas(value)}`;
        }
    });

    // Update static currency symbols elsewhere as needed
    document.querySelectorAll('.static-currency-symbol').forEach(function(element) {
        element.textContent = selectedCurrencySymbol;
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getCurrencySymbol() {
    // Adjust this function to return the actual symbol like "$", "€", "£", etc., based on the selected currency
    const currencyInputs = document.getElementsByName('currency');
    for (let i = 0; i < currencyInputs.length; i++) {
        if (currencyInputs[i].checked) {
            switch (currencyInputs[i].value) {
                case 'USD': return '$';
                case 'GBP': return '£';
                case 'EUR': return '€';
                case 'SGD': return 'S$';
                // Add more cases as needed
                default: return 'THB'; // Default or case for Thai Baht
            }
        }
    }
}

function formatCurrency(amount) {
    // Implement or adjust this function if needed to format the currency values according to your preferences
    return amount.toLocaleString('en', { maximumFractionDigits: 2 });
}


// Function to add a new row for the selected service
function addServiceRow(serviceDetails) {
    const tableBody = document.getElementById('services_table').getElementsByTagName('tbody')[0];
    for (let i = 0; i < serviceDetails.items.length; i++) {
        const newRow = tableBody.insertRow();
        newRow.insertCell().textContent = itemNumber++;

        // Populate item, quantity, price, and total price fields based on the selected service
        const itemCell = newRow.insertCell();
        itemCell.innerHTML = `<input type="text" name="item[]" value="${serviceDetails.items[i]}">`;

        const quantityCell = newRow.insertCell();
        quantityCell.innerHTML = `<input type="number" name="quantity[]" value="${serviceDetails.quantities[i]}">`;

        const priceCell = newRow.insertCell();
        priceCell.innerHTML = `<input type="number" name="price[]" value="${serviceDetails.prices[i]}">`;

        const totalPriceCell = newRow.insertCell();
        totalPriceCell.textContent = (serviceDetails.quantities[i] * serviceDetails.prices[i]).toFixed(2);

        const actionCell = newRow.insertCell(); // Add action cell
        const removeButton = document.createElement('button'); // Create a button element
        removeButton.textContent = 'Remove' // Set button text
        removeButton.type = 'button'; // Set button type
        removeButton.classList.add('btn', 'btn-danger'); // Add Bootstrap classes to style the button
        removeButton.addEventListener('click', function() {
            removeRow(this); // Call the removeRow function when the button is clicked
        });
        actionCell.appendChild(removeButton); // Append the button to the action cell

        // Add event listeners to quantity and price inputs
        quantityCell.firstChild.addEventListener('change', updateTotalPrice);
        priceCell.firstChild.addEventListener('change', updateTotalPrice);
    }
}

// Event listener for service dropdown
document.getElementById('service_dropdown').addEventListener('change', function () {
    itemNumber = 1;
    const selectedService = this.value;
    const serviceDetails = getServiceDetails(selectedService);
    const tableBody = document.getElementById('services_table').getElementsByTagName('tbody')[0];

    // Clear existing rows in the table body
    tableBody.innerHTML = '';

    // Add rows for the selected service
    addServiceRow(serviceDetails);

    // Update total price
    updateTotalPrice();
});


// Function to format currency with commas and without decimal points
function formatCurrency(amount) {
    return amount.toLocaleString('en', { maximumFractionDigits: 0 });
}

// Function to retrieve details for the selected service
function getServiceDetails(service) {
    const serviceDetails = {
        "SEO Service 1": {
            "items": [
                "SEO Entry Package",
                "5 – 10 Keywords",
                "1 - 2 Target Pages",
                "Full Website Audit & Investigation",
                "1st Class Technical Recommendations & Fixes",
                "Excellent Customer Service",
                "Quality Back-links",
                "On-Page Content Development",
                "Monthly Performance Tracking & Reports"
            ],
            "quantities": [1, 1, 1, 1, 1, 1, 1, 1, 1], 
            "prices": [35000, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        "SEO Service 2": {
            "items": [
                "SEO Elite Package",
                "10 – 20 Keywords",
                "2 - 4 Target Pages",
                "Full Website Audit & Investigation",
                "1st Class Technical Recommendations & Fixes",
                "Excellent Customer Service",
                "Quality Back-links",
                "On-Page Content Development",
                "Monthly Performance Tracking & Reports",
                "Google Business Page Optimisation",
                "Additional Quality Back-links created"
            ],
            "quantities": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
            "prices": [45000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        "SEO Service 3": {
            "items": [
                "SEO Premium Package",
                "20 – 30 Keywords",
                "4 - 6 Target Pages",
                "Full Website Audit & Investigation",
                "1st Class Technical Recommendations & Fixes",
                "Excellent Customer Service",
                "Quality Back-links",
                "On-Page Content Development",
                "Monthly Performance Tracking & Reports",
                "Google Business Page Optimisation",
                "Additional Quality Back-links created",
                "Blog Creation / Management",
                "Structure data Optimisation",
                "Additional Quality Back-links created"

            ],
            "quantities": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
            "prices": [55000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        "SEO Service 4": {
            "items": [
                "SEO First Class Package",
                "35+ Keywords",
                "6 Target Pages",
                "Full Website Audit & Investigation",
                "1st Class Technical Recommendations & Fixes",
                "Excellent Customer Service",
                "Quality Back-links",
                "On-Page Content Development",
                "Monthly Performance Tracking & Reports",
                "Google Business Page Optimisation",
                "Additional Quality Back-links created",
                "Blog Creation / Management",
                "Additional Quality Back-links created",
                "Existing Back-link Audit & Clean-up",
                "Goals & E-commerce conversion tracking",
                "Identify website error in GSC",
                "Additional Quality Back-links"

            ],
            "quantities": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
            "prices": [65000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        "Website Service 1": {
            "items": [
                "Website Single Page Site - Starter",
                "Design Page Layout",
                "Banner Design",
                "Menu(section)",
                "Language",
                "Content(500 words)"
            ],
            "quantities": [1, 1, 1, 5, 1, 1], 
            "prices": [15000, 0, 0, 0, 0, 0]
        },
        "Website Service 2": {
            "items": [
                "Website Single Page Site - Basic",
                "Design Page Layout",
                "Banner Design",
                "Menu(section)",
                "Language",
                "Content(500 words)",
                "Blog"
            ],
            "quantities": [1, 1, 2, 5, 1, 1, 1], 
            "prices": [20000, 0, 0, 0, 0, 0, 0]
        },
        "Website Service 3": {
            "items": [
                "Website Single Page Site - Business",
                "Design Page Layout",
                "Banner Design",
                "Menu(section)",
                "Language",
                "Content(500 words)",
                "Blog"
            ],
            "quantities": [1, 2, 3, 5, 2, 1, 1], 
            "prices": [25000, 0, 0, 0, 0, 0, 0]
        },
        "Website Service 4": {
            "items": [
                "Website Single Page Site - Premium",
                "Design Page Layout",
                "Banner Design",
                "Menu(section) - 5 to 10",
                "Language",
                "Content(500 words)",
                "Blog",
                "Chat Box",
                "Enquiries Form"
            ],
            "quantities": [1, 3, 5, 10, 2, 1, 1, 1, 1], 
            "prices": [35000, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        "Website Service 5": {
            "items": [
                "Website Company Site - Starter",
                "Design Page Layout",
                "Banner Design",
                "Menu(section)",
                "Blog",
                "Content(1000 words)"
            ],
            "quantities": [1, 1, 2, 5, 1, 0], 
            "prices": [30000, 0, 0, 0, 0, 0]
        },
        "Website Service 6": {
            "items": [
                "Website Company Site - Basic",
                "Design Page Layout",
                "Banner Design",
                "Menu(section)",
                "Pages",
                "Blog",
                "Content(1500 words)",
                "Chat Box"
            ],
            "quantities": [1, 2, 3, 5, 5, 1, 1, 1], 
            "prices": [40000, 0, 0, 0, 0, 0, 0, 0]
        },
        "Website Service 7": {
            "items": [
                "Website Company Site - Business",
                "Design Page Layout",
                "Banner Design",
                "Menu(section)",
                "Pages",
                "Blog",
                "Content(2000 words)",
                "Chat Box",
                "Languages"
            ],
            "quantities": [1, 2, 5, 10, 10, 1, 1, 1, 2], 
            "prices": [50000, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        "Website Service 8": {
            "items": [
                "Website Company Site - Premium",
                "Design Page Layout",
                "Banner Design",
                "Menu(section)",
                "Pages",
                "Blog",
                "Content(2500 words)",
                "Chat Box",
                "Languages"
            ],
            "quantities": [1, 3, 8, 20, 18, 1, 1, 1, 2], 
            "prices": [65000, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        "Website Service 9": {
            "items": [
                "Website E-Commerce Site - Starter",
                "Design Page Layout",
                "Banner Design",
                "Menu(section)",
                "Products",
                "Cart",
                "Blog",
                "Content(1000 words)",
                "Chat Box"
            ],
            "quantities": [1, 1, 5, 5, 20, 1, 1, 1, 1], 
            "prices": [60000, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        "Website Service 10": {
            "items": [
                "Website E-Commerce Site - Basic",
                "Design Page Layout",
                "Banner Design",
                "Menu(section)",
                "Products",
                "Cart",
                "Blog",
                "Content(1200 words)",
                "Chat Box",
                "Multi-Languages"
            ],
            "quantities": [1, 2, 10, 10, 50, 1, 1, 1, 1, 2], 
            "prices": [120000, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        "Website Service 11": {
            "items": [
                "Website E-Commerce Site - Business",
                "Design Page Layout",
                "Banner Design",
                "Menu(section)",
                "Products",
                "Cart",
                "Blog",
                "Content(2000 words)",
                "Chat Box",
                "Multi-Languages",
                "Membership System",
                "Offer / Discount System"
            ],
            "quantities": [1, 2, 15, 15, 100, 1, 1, 1, 1, 2, 1, 1], 
            "prices": [160000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        "Website Service 12": {
            "items": [
                "Website E-Commerce Site - Premium",
                "Design Page Layout",
                "Banner Design",
                "Menu(section)",
                "Products",
                "Cart",
                "Blog",
                "Content(3000 words)",
                "Chat Box",
                "Multi-Languages",
                "Membership System",
                "Offer / Discount System"
            ],
            "quantities": [1, 3, 20, 20, 200, 1, 1, 1, 1, 2, 1, 1], 
            "prices": [180000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        "Website Maintenance 1": {
            "items": [
                "Website Maintenance Salepage",
                "Site Health Check Up",
                "WP Core Update",
                "Plugins Update",
                "Report / Month",
                "Website Consult",
                "Hosting Consult",
                "Backup : 1/Month",
                "Content Update(up to 1 hour)",
            ],
            "quantities": [1, 1, 1, 1, 1, 1, 1, 1, 1], 
            "prices": [3000, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        "Website Maintenance 2": {
            "items": [
                "Website Maintenance Company",
                "Site Health Check Up",
                "WP Core Update",
                "Plugins Update",
                "Report / Month",
                "Website Consult",
                "Fix General Problem",
                "Hosting Consult",
                "Backup : 2/Month",
                "Content Update(up to 3 hour)",
                "Add 1 Landing Page(No Assets)"
            ],
            "quantities": [1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1], 
            "prices": [5000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        "Website Maintenance 3": {
            "items": [
                "Website Maintenance E-Commerce",
                "Site Health Check Up",
                "WP Core Update",
                "Plugins Update",
                "Report / Month",
                "Website Consult",
                "Fix General Problem",
                "Hosting Consult",
                "Backup : 3/Month",
                "Product/Content Update(up to 4 hour)",
                "Add 2 Landing Page(No Assets)"
            ],
            "quantities": [1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 2], 
            "prices": [7000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        "Google Package 1": {
            "items": [
                "Google Package Startup",
                "Keyword Research",
                "Budget Planning",
                "Creation & Optimisation of Search Ads Campaigns",
                "Campaign Monitoring & Optimisation",
                "Weekly Optimisation of Campaigns",
                "Conversion Tracking Implementation",
                "Advanced Campaign Planning & Consultation",
                "Dedicated Account Managers",
                "Monthly Reporting"
            ],
            "quantities": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
            "prices": [10000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        "Google Package 2": {
            "items": [
                "Google Package Standard",
                "Keyword Research",
                "Budget Planning",
                "Creation & Optimisation of Search Ads Campaigns",
                "AB Testing Text Ads",
                "Campaign Monitoring & Optimisation",
                "Weekly Optimisation of Campaigns",
                "Conversion Tracking Implementation",
                "Advanced Campaign Planning & Consultation",
                "Competitor Analysis",
                "Dedicated Account Managers",
                "Mid-month Mini Report",
                "Monthly Reporting"
            ],
            "quantities": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
            "prices": [15000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        "Google Package 3": {
            "items": [
                "Google Package Enterprise",
                "Keyword Research",
                "Budget Planning",
                "Creation & Optimisation of Search Ads Campaigns",
                "Creative Banners for Display Ads: 2",
                "AB Testing Text Ads",
                "Campaign Monitoring & Optimisation",
                "Weekly Optimisation of Campaigns",
                "Conversion Tracking Implementation",
                "Advanced Campaign Planning & Consultation",
                "Competitor Analysis",
                "Quality Score Audit",
                "Landing Page Suggestions",
                "Dedicated Account Managers",
                "Mid-month Mini Report",
                "Monthly Reporting"
            ],
            "quantities": [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
            "prices": [25000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        "Facebook Package 1": {
            "items": [
                "Facebook Package Startup",
                "Creative Banners & Contents: 4",
                "Retargeting Campaign",
                "Language Targeting - Thai",
                "Boost Post: Unlimited",
                "Campaign Monitoring & Optimization",
                "Pixel Implementation",
                "Advanced Campaign Planning & Consultation",
                "Dedicated Account Managers",
                "Monthly Reporting"
            ],
            "quantities": [1, 4, 1, 1, 1, 1, 1, 1, 1, 1], 
            "prices": [10000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        "Facebook Package 2": {
            "items": [
                "Facebook Package Standard",
                "Creative Banners & Contents: 8",
                "Retargeting Campaign",
                "Language Targeting - Thai & Eng",
                "AB Testing: Audience & Creatives",
                "Boost Post: Unlimited",
                "Campaign Monitoring & Optimization",
                "Pixel Implementation",
                "Competitor Research",
                "Advanced Campaign Planning & Consultation",
                "Dedicated Account Managers",
                "Mid-month Mini Report",
                "Monthly Reporting"
            ],
            "quantities": [1, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
            "prices": [15000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        "Facebook Package 3": {
            "items": [
                "Facebook Package Enterprise",
                "Creative Banners & Contents: 12",
                "Retargeting Campaign",
                "Language Targeting - Thai & Eng",
                "AB Testing: Audience & Creatives",
                "Boost Post: Unlimited",
                "Campaign Monitoring & Optimization",
                "Pixel Implementation",
                "Competitor Research",
                "Advanced Campaign Planning & Consultation",
                "Dedicated Account Managers",
                "Mid-month Mini Report",
                "Monthly Reporting"
            ],
            "quantities": [1, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
            "prices": [20000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        "TikTok Package 1": {
            "items": [
                "TikTok Package Startup",
                "Keyword research",
                "Budget Planning",
                "Creation and Optimisation of Search Ads Campaigns",
                "Campaign Monitoring & Optimization",
                "Weekly Optimisation of Campaigns",
                "Conversion Tracking Implementation",
                "Advanced Campaign Planning & Consultation",
                "Dedicated Account Managers",
                "Monthly Reporting"
            ],
            "quantities": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
            "prices": [10000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        "TikTok Package 2": {
            "items": [
                "TikTok Package Standard",
                "Keyword research",
                "Budget Planning",
                "Creation and Optimisation of Search Ads Campaigns",
                "AB Testing Text Ads",
                "Campaign Monitoring & Optimization",
                "Weekly Optimisation of Campaigns",
                "Conversion Tracking Implementation",
                "Advanced Campaign Planning & Consultation",
                "Competitor Analysis",
                "Dedicated Account Managers",
                "Mid-month Mini Report",
                "Monthly Reporting"
            ],
            "quantities": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
            "prices": [15000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        "Backlink Package 1": {
            "items": [
                "Thai BackLink & Content Creation",
                "Do follow SEO BackLinks",
                "No Spam posting, Manual Post Only",
                "Quality, Native Thai manually written relevant content",
                "Permanent Link",
                "Sites hosted on 100% Different IP's",
                "Niche Category Website",
                "Native Thai Language websites",
                "All website are indexed on Google",
                "Natural link building strategy",
            ],
            "quantities": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
            "prices": [1900, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
    };    
    return serviceDetails[service] || { items: [], quantities: [], prices: [] };
}

// Event listener for team dropdown
document.getElementById('team_dropdown').addEventListener('change', function () {
    const selectedTeamMember = this.value;
    const teamMembers = {
        "daniel": {
            "company_phone": "",
            "company_email": "daniel@tbs-marketing.com",
            "full_name": "Daniel Parsons"
        },
        "alex": {
            "company_phone": "0936535154",
            "company_email": "daniel@tbs-marketing.com",
            "full_name": "Assawin Chittanandha (Mello)"
        },
        "alice": {
            "company_phone": "",
            "company_email": "daniel@tbs-marketing.com",
            "full_name": "Daniel Parsons"
        },
        "march": {
            "company_phone": "0936535154",
            "company_email": "daniel@tbs-marketing.com",
            "full_name": "Assawin Chittanandha (Mello)"
        },
        "giftzy": {
            "company_phone": "",
            "company_email": "daniel@tbs-marketing.com",
            "full_name": "Daniel Parsons"
        },
        "bill": {
            "company_phone": "0936535154",
            "company_email": "daniel@tbs-marketing.com",
            "full_name": "Assawin Chittanandha (Mello)"
        },
        "ruj": {
            "company_phone": "",
            "company_email": "daniel@tbs-marketing.com",
            "full_name": "Daniel Parsons"
        },
        "josh": {
            "company_phone": "0936535154",
            "company_email": "daniel@tbs-marketing.com",
            "full_name": "Assawin Chittanandha (Mello)"
        },
        "noey": {
            "company_phone": "",
            "company_email": "daniel@tbs-marketing.com",
            "full_name": "Daniel Parsons"
        },
        "toddy": {
            "company_phone": "",
            "company_email": "daniel@tbs-marketing.com",
            "full_name": "Daniel Parsons"
        },
        "golf": {
            "company_phone": "0936535154",
            "company_email": "daniel@tbs-marketing.com",
            "full_name": "Assawin Chittanandha (Mello)"
        },
        "amber": {
            "company_phone": "",
            "company_email": "daniel@tbs-marketing.com",
            "full_name": "Daniel Parsons"
        },
        "pemai": {
            "company_phone": "",
            "company_email": "daniel@tbs-marketing.com",
            "full_name": "Daniel Parsons"
        },
        "nam": {
            "company_phone": "0936535154",
            "company_email": "daniel@tbs-marketing.com",
            "full_name": "Assawin Chittanandha (Mello)"
        },
        "sai": {
            "company_phone": "",
            "company_email": "daniel@tbs-marketing.com",
            "full_name": "Daniel Parsons"
        },
        "mello": {
            "company_phone": "0936535154",
            "company_email": "daniel@tbs-marketing.com",
            "full_name": "Assawin Chittanandha (Mello)"
        },
        "pun": {
            "company_phone": "0936535154",
            "company_email": "daniel@tbs-marketing.com",
            "full_name": "Assawin Chittanandha (Mello)"
        },
        
    };

    // Update fields based on selected team member
    if (teamMembers[selectedTeamMember]) {
        document.getElementById('company_phone').value = teamMembers[selectedTeamMember].company_phone;
        document.getElementById('company_email').value = teamMembers[selectedTeamMember].company_email;
        document.getElementById('full_name').value = teamMembers[selectedTeamMember].full_name;
    } else {
        // Clear fields if no team member is selected
        document.getElementById('company_phone').value = "";
        document.getElementById('company_email').value = "";
        document.getElementById('full_name').value = "";
    }
});
