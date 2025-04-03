/*
 * Ejercicios de código de Eventos y DOM
 *
 * Diego Córdova Rodríguez, A01781166
 *
 * Estos ejercicios fuerion resueltos con ayuda de las IAs ChatGPT y Copilot
 * como parte de la tarea Actividad en clase: Eventos y DOM y ChatGPT
 */

// 1. Modifica el siguiente elemento para mostrar la posición del mouse en el documento
// <p id="mousePosition">Posición del mouse: </p>

// Escucha el evento 'mousemove' en todo el documento
document.addEventListener('mousemove', (event) => {
    // Obtiene el elemento con el id 'mousePosition'
    const mousePosition = document.getElementById('mousePosition');
    // Actualiza el contenido del elemento con las coordenadas del mouse
    mousePosition.textContent = `Posición del mouse: X=${event.clientX}, Y=${event.clientY}`;
});

// 2. Al dar click al siguiente botón, obtén el nombre y apellido de las siguientes cajas de texto, y agrega, después del botón, un elemento que tenga el nombre completo.
/*
<form id="form1">
    First name: <input id="form-fname" type="text" name="fname"><br>
    Last name: <input id="form-lname" type="text" name="lname"><br><br>
    <input id="form1-submit" type="button" value="Submit">
</form>
*/

document.getElementById('form1-submit').addEventListener('click', () => {
    // Obtiene los valores de las cajas de texto para el nombre y apellido
    const firstName = document.getElementById('form-fname').value;
    const lastName = document.getElementById('form-lname').value;
    // Combina el nombre y apellido en una sola cadena
    const fullName = firstName + ' ' + lastName;

    // Crea un nuevo elemento <p> para mostrar el nombre completo
    const fullNameElement = document.createElement('p');
    fullNameElement.textContent = `Nombre completo: ${fullName}`;

    // Inserta el nuevo elemento <p> después del formulario
    document.getElementById('form1').after(fullNameElement);
});

// 3. Agrega el código para agregar una fila, o una columna, a la siguiente tabla al dar click al botón correspondiente.

// Agrega un listener al botón con id 'btn-insert-r' para insertar una nueva fila
    document.getElementById('btn-insert-r').addEventListener('click', () => {
    // Obtiene la tabla con id 'sampleTable'
    const table = document.getElementById('sampleTable');
    // Inserta una nueva fila al final de la tabla
    const newRow = table.insertRow();
    // Obtiene el número de columnas de la primera fila
    const columnCount = table.rows[0].cells.length;

    // Itera sobre el número de columnas para agregar celdas a la nueva fila
    for (let i = 0; i < columnCount; i++) {
        // Crea una nueva celda en la fila
        const newCell = newRow.insertCell();
        // Establece el contenido de la celda
        newCell.textContent = `New row cell ${i + 1}`;
    }
    });

    // Agrega un listener al botón con id 'btn-insert-c' para insertar una nueva columna
    document.getElementById('btn-insert-c').addEventListener('click', () => {
    // Obtiene la tabla con id 'sampleTable'
    const table = document.getElementById('sampleTable');

    // Itera sobre cada fila de la tabla
    for (let i = 0; i < table.rows.length; i++) {
        // Crea una nueva celda al final de la fila actual
        const newCell = table.rows[i].insertCell();
        // Establece el contenido de la celda
        newCell.textContent = `New col cell ${i + 1}`;
    }
});

// 4. Incluye dos cajas de input, para solicitar al usuario la posición de la fila y columna de la siguiente tabla, y otra para solicitar un texto. Al apretar el botón, actualiza el contenido de esa tabla en la posición que solicitaste, con la cadena de texto que solicitaste

// Agrega un listener al botón con id 'btn-change'
document.getElementById('btn-change').addEventListener('click', () => {
    // Obtiene los valores de las cajas de texto
    const rowIndex = parseInt(document.getElementById('rowIndex').value, 10);
    const colIndex = parseInt(document.getElementById('colIndex').value, 10);
    const newValue = document.getElementById('newValue').value;

    // Obtiene la tabla con id 'myTable'
    const table = document.getElementById('myTable');

    // Verifica que los índices sean válidos
    if (
        rowIndex >= 0 &&
        rowIndex < table.rows.length &&
        colIndex >= 0 &&
        colIndex < table.rows[rowIndex].cells.length
    ) {
        // Actualiza el contenido de la celda especificada
        table.rows[rowIndex].cells[colIndex].textContent = newValue;
    } else {
        alert('Índices inválidos. Por favor, ingresa valores válidos.');
    }
});

// 5. Agrega el código para quitar o agregar elementos a la lista de opciones. Los colores pueden ser aleatorios

// Función para generar un color aleatorio en formato hexadecimal
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Agrega un listener al botón para agregar un color
document.getElementById('btn-add-color').addEventListener('click', () => {
    const colorSelect = document.getElementById('colorSelect');
    const newColor = getRandomColor();
    const newOption = document.createElement('option');
    newOption.textContent = newColor;
    colorSelect.appendChild(newOption);
});

// Agrega un listener al botón para eliminar el color seleccionado
document.getElementById('btn-rmv-color').addEventListener('click', () => {
    const colorSelect = document.getElementById('colorSelect');
    if (colorSelect.selectedIndex !== -1) {
        colorSelect.remove(colorSelect.selectedIndex);
    } else {
        alert('Por favor, selecciona un color para eliminar.');
    }
});

// 6. Al poner el mouse encima de la siguiente imagen, genera dos números aleatorios entre 300 y 600 para el width y height de una imagen. Reemplaza la imagen de placeholder por otra similar con el tamaño random que generaste. El evento solo se dispara cuando el mouse entra en la imagen.

// Agrega un listener al evento 'mouseenter' de la imagen
document.getElementById('imagenGato').addEventListener('mouseenter', () => {
    // Genera dos números aleatorios entre 300 y 600
    const randomWidth = Math.floor(Math.random() * (600 - 300 + 1)) + 300;
    const randomHeight = Math.floor(Math.random() * (600 - 300 + 1)) + 300;
    console.log(`Nuevo tamaño: ${randomWidth}x${randomHeight}`);

    // Cambia el src de la imagen con los nuevos valores de ancho y alto
    // Se reemplazó la liga de placeholder de http://placekitten.com por http://placecats.com
    // ya que placekitten.com muestra un error HTTP ERROR 521
    document.getElementById('imagenGato').src = `http://placecats.com/${randomWidth}/${randomHeight}`;
});