// Validates input values to ensure they are within the specified range and provides feedback
function validateInput(startHoriz, endHoriz, startVert, endVert, min = -50, max = 50) {
    clearInputHighlights(); // Clears any previous highlights and error messages

    let errors = [];
    
    // Validate each input field and add an error message if invalid
    if (isNaN(startHoriz)) errors.push({ field: 'start-horiz', message: 'Please enter a valid number.' });
    if (isNaN(endHoriz)) errors.push({ field: 'end-horiz', message: 'Please enter a valid number.' });
    if (isNaN(startVert)) errors.push({ field: 'start-vert', message: 'Please enter a valid number.' });
    if (isNaN(endVert)) errors.push({ field: 'end-vert', message: 'Please enter a valid number.' });

    // Check if inputs are within the specified range
    if (startHoriz < min || startHoriz > max) errors.push({ field: 'start-horiz', message: `Number must be between ${min} and ${max}.` });
    if (endHoriz < min || endHoriz > max) errors.push({ field: 'end-horiz', message: `Number must be between ${min} and ${max}.` });
    if (startVert < min || startVert > max) errors.push({ field: 'start-vert', message: `Number must be between ${min} and ${max}.` });
    if (endVert < min || endVert > max) errors.push({ field: 'end-vert', message: `Number must be between ${min} and ${max}.` });

    // Ensure the starting number is less than or equal to the ending number for both axes
    if (startHoriz > endHoriz) errors.push({ field: 'start-horiz', message: 'Starting number should be less than or equal to the ending number.' });
    if (startVert > endVert) errors.push({ field: 'start-vert', message: 'Starting number should be less than or equal to the ending number.' });

    // Highlight fields with errors
    errors.forEach(error => highlightInput(error.field, error.message));

    return errors.length === 0 ? null : 'Please correct the highlighted errors.';
}

// Highlights the input fields with errors and displays an error message
function highlightInput(fieldId, message) {
    const inputField = document.getElementById(fieldId);
    inputField.classList.add('error');
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('input-error');
    errorMessage.innerText = message;
    inputField.parentNode.appendChild(errorMessage);
}

// Clears all error highlights and messages from the form
function clearInputHighlights() {
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.input-error').forEach(el => el.remove());
}

// Generates a multiplication table based on the provided range
function generateMultiplicationTable(startHoriz, endHoriz, startVert, endVert) {
    const horizRange = startHoriz <= endHoriz ? [startHoriz, endHoriz] : [endHoriz, startHoriz];
    const vertRange = startVert <= endVert ? [startVert, endVert] : [endVert, startVert];

    const table = document.createElement('table');
    const thead = table.createTHead();
    const tbody = table.createTBody();

    // Create the header row
    const headerRow = thead.insertRow();
    headerRow.insertCell().outerHTML = '<th></th>';
    for (let h = horizRange[0]; h <= horizRange[1]; h++) {
        const th = document.createElement('th');
        th.innerText = h;
        headerRow.appendChild(th);
    }

    // Populate table rows based on the vertical range
    for (let v = vertRange[0]; v <= vertRange[1]; v++) {
        const row = tbody.insertRow();
        const headerCell = row.insertCell();
        headerCell.innerText = v;
        for (let h = horizRange[0]; h <= horizRange[1]; h++) {
            const cell = row.insertCell();
            cell.innerText = v * h;
        }
    }

    return table;
}

// Displays a general error message in a specified element
function displayError(message, elementId = 'error-message') {
    document.getElementById(elementId).innerText = message;
}

// Clears any previous messages and table content
function clearOutput(errorElementId = 'error-message', tableContainerId = 'table-container') {
    document.getElementById(errorElementId).innerText = '';
    document.getElementById(tableContainerId).innerHTML = '';
    clearInputHighlights();
}

// Main function to handle the form submission and generate the table
function handleGenerateTable() {
    clearOutput();

    const startHoriz = parseInt(document.getElementById('start-horiz').value);
    const endHoriz = parseInt(document.getElementById('end-horiz').value);
    const startVert = parseInt(document.getElementById('start-vert').value);
    const endVert = parseInt(document.getElementById('end-vert').value);

    const errorMessage = validateInput(startHoriz, endHoriz, startVert, endVert);
    if (errorMessage) {
        displayError(errorMessage);
        document.getElementById('table-container').style.display = 'none'; // Hide table container if there's an error
        return;
    }

    const table = generateMultiplicationTable(startHoriz, endHoriz, startVert, endVert);
    document.getElementById('table-container').innerHTML = '';
    document.getElementById('table-container').appendChild(table);
    document.getElementById('table-container').style.display = 'block'; // Show table container when table is generated
}