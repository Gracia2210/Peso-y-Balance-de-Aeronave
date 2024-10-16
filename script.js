function addRow() {
    const table = document.getElementById("balanceTable").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td><input type="text" name="elemento" placeholder="Nombre del elemento"></td>
        <td><input type="number" name="peso" step="0.1" oninput="updateMoment(this)"></td>
        <td><input type="number" name="brazo" placeholder="Escribe el brazo" oninput="updateMoment(this)" required></td> <!-- Campo para ingresar solo números -->
        <td><input type="number" name="momento" readonly></td> <!-- Solo lectura -->
        <td><button onclick="deleteRow(this)">Eliminar</button></td>
    `;
    updateAllMoments();
}

function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateAllMoments();
}

function updateMoment(input) {
    const row = input.parentNode.parentNode;
    const peso = parseFloat(row.querySelector('input[name="peso"]').value) || 0;
    const brazo = parseFloat(row.querySelector('input[name="brazo"]').value) || 0; // Campo de texto
    const momento = row.querySelector('input[name="momento"]');
    const indice = parseFloat(document.getElementById('indice').value) || 1;
    momento.value = ((peso * brazo) / indice).toFixed(2);
    updateTotals();
}

function updateAllMoments() {
    const rows = document.querySelectorAll('#balanceTable tbody tr');
    rows.forEach(row => {
        const peso = parseFloat(row.querySelector('input[name="peso"]').value) || 0;
        const brazo = parseFloat(row.querySelector('input[name="brazo"]').value) || 0; // Campo de texto
        const momento = row.querySelector('input[name="momento"]');
        const indice = parseFloat(document.getElementById('indice').value) || 1;
        momento.value = ((peso * brazo) / indice).toFixed(2);
    });
    updateTotals();
}

function updateTotals() {
    let totalPeso = 0;
    let totalMomento = 0;

    const rows = document.querySelectorAll('#balanceTable tbody tr');
    rows.forEach(row => {
        totalPeso += parseFloat(row.querySelector('input[name="peso"]').value) || 0;
        totalMomento += parseFloat(row.querySelector('input[name="momento"]').value) || 0;
    });

    document.getElementById('totalPeso').value = totalPeso.toFixed(2);
    document.getElementById('totalMomento').value = totalMomento.toFixed(2);

    const indice = parseFloat(document.getElementById('indice').value) || 1;
    const cg = totalPeso ? (totalMomento / totalPeso) * indice : 0;
    document.getElementById('cg').value = cg.toFixed(2);
}

function resetCalculation() {
    const tableBody = document.getElementById("balanceTable").getElementsByTagName('tbody')[0];
    tableBody.innerHTML = `
        <tr>
            <td><input type="text" name="elemento" placeholder="Nombre del elemento"></td>
            <td><input type="number" name="peso" step="0.1" oninput="updateMoment(this)"></td>
            <td><input type="number" name="brazo" placeholder="Escribe el brazo" oninput="updateMoment(this)" required></td> <!-- Campo para ingresar solo números -->
            <td><input type="number" name="momento" readonly></td> <!-- Solo lectura -->
            <td><button onclick="deleteRow(this)">Eliminar</button></td>
        </tr>
    `;
    document.getElementById('totalPeso').value = '';
    document.getElementById('totalMomento').value = '';
    document.getElementById('cg').value = '';
    document.getElementById('indice').value = ''; // Limpiar el índice
}