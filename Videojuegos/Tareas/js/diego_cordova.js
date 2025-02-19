/*
 * Actividad en clase: Javascript
 * Construcción de software y toma de decisiones
 * TC2005B.401
 *
 * Alumno: Diego Córdova Rodriguez
 * Matrícula: A01781166
 * 
 * Descripción: En este actividad se realizarán 15 ejercicios de uso básico en JavaScript
 * 
 * Fecha de entrega: 19/02/2025
 */

// Imprime el inicio del programa
console.log("-----------------------------Actividad en clase: Javascript-----------------------------");

// 1. Escribe una función llamada firstNonRepeating que encuentre el primer carácter de un cadena de texto que no se repite. Prueba tu función con: 'abacddbec'

export function firstNonRepeating(str) {
    for (let i=0; i<str.length; i++) { // Recorre el string de texto
        let char = str[i]; // Guarda el carácter actual

        for (let j=0; j<str.length; j++) { // Recorre el string y compara char con los demás caracteres

            if (i != j && char == str[j]) { // Si los indices comparados son diferentesy el carácter se repite, termina
                break;
            }
            else if (j == str.length-1) { // Si se llega al final del string y no se repitió el carácter, se devuelve
                return char;
            }
        }
    }
    return; // Si solo hay caracteres repetidos o no hay caracteres, no se devuelve nada
}

console.log("1. El primer carácter no repetido de 'abacddbec' es: " + firstNonRepeating("abacddbec"));

// 2. Escribe una función llamada bubbleSort que implemente el algoritmo 'bubble-sort' para ordenar una lista de números.

export function bubbleSort(ar) { // Ordena una lista de números, encontrando el mayor en cada iteración y colocándolo al final

    let flag = false; // Bandera para saber si se hizo un intercambio

    for (let i=0; i<ar.length; i++) { // Recorre la lista hasta el final

        for (let j=0; j<ar.length-i; j++) { // Recorre la lista hasta uno menos en cada iteración
            if (ar[j] > ar[j+1]) { // Si el valor actual es mayor al siguiente se intercambian 

                let temp = ar[j]; // Se guarda el valor actual
                ar[j] = ar[j+1]; // Se intercambia el valor actual por el siguiente
                ar[j+1] = temp; // Se intercambia el siguiente por el valor actual

                flag = true; // Indica que se hizo un intercambio
            }
        }

        if (flag == false) break; // Si no se hizo intercambio, la lista está ordenada
    }
    return ar;
}

let list = [4,6,3,1,2];
console.log("2. Lista ordenada con Bubble Sort:", bubbleSort(list));

// 3. Escribe dos funciones: la primera con nombre invertArray que invierta un arreglo de números y regrese un nuevo arreglo con el resultado; la segunda, con nombre invertArrayInplace,que modifique el mismo arreglo que se pasa como argumento. No se permite usar la función integrada 'reverse'.

export function invertArray(ar) {
    let ar2 = []; // Nuevo arreglo para guardar los valores invertidos
    for (let i=ar.length-1; i>=0; i--) { // Recorre el arreglo al revés
        ar2.push(ar[i]); // Agrega cada valor al nuevo arreglo
    }
    return ar2; // Regresa el nuevo arreglo
}

console.log("3.1. Arreglo invertido en un nuevo resultado:", invertArray([1,2,3,4,5]));

export function invertArrayInplace(ar) { 
    for (let i=0; i<ar.length; i++) { // Recorre el arreglo

        if (i >= ar.length-i-1) { // Si el índice es mayor o igual a la mitad del arreglo, terminar
            break;
        }
        
        // Intercambia el valor con el del indice opuesto
        let temp = ar[i];
        ar[i] = ar[ar.length-i-1];
        ar[ar.length-i-1] = temp;
    }
    return ar;
}

console.log("3.2. Arreglo invertido en él mismo:", invertArrayInplace([1,2,3,4,5]));

// 4. Escribe una función llamada capitalize que reciba una cadena de texto y regrese una nueva con la primer letra de cada palabra en mayúscula.

export function capitalize(str) {
    if (str == "") return str; // Si la cadena está vacía, no se hace nada

    let words = str.split(' '); // Separa las palabras por espacio
    for (let i=0; i<words.length; i++) { // Recorre las palabras
        words[i] = words[i][0].toUpperCase() + words[i].substring(1); // La primer letra de cada palabra se pasa a mayúsculas
    }
    return words.join(' '); // Une las palabras de nuevo en un string
}

let str = "hola mundo hola";
console.log("4. La cadena '", str, "' con las primeras letras en mayúscula es:", capitalize(str));

// 5. Escribe una función llamada mcd que calcule el máximo común divisor de dos números.
// Lógica de código obtenida de la siguiente fuente: https://stackoverflow.com/questions/17445231/js-how-to-find-the-greatest-common-divisor

export function mcd(a, b) {
    if (b == 0) { // Si b es 0, el unico divisor común es a
        return a;
    }
    else if (a == 0) { // Si a es 0, el unico divisor común es b
        return b;
    }
    return mcd(b, a % b); // Si a o b no es 0, se llama a la función con b y el residuo de a entre b
}

let n1 = 12;
let n2 = 18;
console.log("5. El máximo común divisor de", n1, "y", n2, "es:", mcd(n1, n2));

// 6. Crea una función llamada hackerSpeak que cambie una cadena de texto a 'Hacker Speak'. Por ejemplo, para la cadena 'Javascript es divertido', su hacker speak es: 'J4v45c1pt 35 d1v3rt1d0'.

export function hackerSpeak(str) {
    let result = ""; // Almacena el resultado final

    for (let i=0; i<str.length; i++) { // Recorre el string

        switch (str[i].toLowerCase()) { // Pasa la letra a minúscula y compara
            case "a": // a - 4
                result += "4";
                break;
            case "s": // s - 5
                result += "5";
                break;
            case "i": // i - 1
                result += "1";
                break;
            case "e": // e - 3
                result += "3";
                break;
            case "o": // o - 0
                result += "0";
                break;
            default:
                result += str[i];
                break;
        }
    }
    return result;
}

str = "Javascript es divertido";
console.log("6. La cadena '", str, "' en 'Hacker Speak' es:", hackerSpeak("Javascript es divertido"));

// 7. Escribe una función llamada factorize que reciba un número, y regrese una lista con todos sus factores.

export function factorize(n) {
    let result = []; // Lista final de factores

    for (let i=1; i<=n; i++) { // Recorre los números del 1 hasta n

        if (n % i == 0) { // Si el residuo entre n e i es 0, i es un factor, ya que divide a n
            result.push(i); // Agrega el factor a la lista
        }
    }
    return result;
}

let num = 12;
console.log("7. Los factores de", num, "son:", factorize(num));

// 8. Escribe una función llamada deduplicate que quite los elementos duplicados de un arreglo y regrese una lista con los elementos que quedan.

export function deduplicate(ar) {

    for (let i=0; i<ar.length; i++) { // Recorre el arreglo
        let item = ar[i]; // Guarda un elemento

        for (let j=0; j<ar.length; j++) { // Recorre el arreglo y compara con todos los elementos menos el actual

            if (i != j && item == ar[j]) { // Si se repite, lo elimina
                ar.splice(j,1); // Del índice j, elimina 1 elemento
                j--; // Disminuye j para no saltarse ningún elemento
            }
        }
    }
    return ar;
}

list = [1,2,3,4,3,2,1];
console.log("8. Lista sin elementos duplicados:", deduplicate(list));

// 9. Escribe una función llamada findShortestString que reciba como parámetro una lista de cadenas de texto, y regrese la longitud de la cadena más corta.

export function findShortestString(list) {
    if (list.length == 0) return 0; // Si la lista está vacía, la longitud es 0

    let shortest = list[0].length; // Inicializa el texto más corto con la longitud de la primera palabra

    for (let i=1; i<list.length; i++) { // Recorre las cadenas de texto, comenzando por la segunda

        if (list[i].length < shortest) { // Si la longitud del texto actual es menor que el más corto
            shortest = list[i].length; // Ahora ese texto es el menor
        }
    }
    return shortest;
}

let list_strings = ["Hola","Yo","Amigo","A","Espectacular","aaa","aab"];
console.log("9. Longitud más corta en una lista de cadenas:", findShortestString(list_strings));

// 10. Escribe una función llamada isPalindrome que revise si una cadena de texto es un palíndromo o no.

export function isPalindrome(str) {
    str = str.toLowerCase(); // Convierte el texto a minúsculas
    let separated = str.split(' '); // Separa el texto por palabras
    let joined = separated.join(''); // Une las palabras y elimina los espacios

    for (let i=0; i<joined.length/2; i++) { // Recorre la mitad del texto

        if (joined[i] != joined[joined.length-i-1]) { // Si hay una diferencia entre las letras
            return false; // No es palíndromo
        }
    }
    return true;
}

str = "Anita lava la tina";
console.log("10. Cadena '", str ,"' es un palíndromo:", isPalindrome(str));

// 11. Escribe una función llamada sortStrings que tome una lista de cadena de textos y devuelva una nueva lista con todas las cadenas en orden alfabético.

export function sortStrings(list) {

    for (let i=0; i<list.length; i++) { // Recorre la lista

        for (let j=0; j<list.length; j++) { // Recorre la lista y compara con los demás

            if (list[i].toLowerCase() < list[j].toLowerCase()) { // Convierte las cadenas a minúsculas y las compara alfabéticamente
                // En este caso, comparar las cadenas en minúsculas por código ASCII es suficiente, ya que son contiguas

                // Intercambia las palabras
                let temp = list[i];
                list[i] = list[j];
                list[j] = temp;
            }
        }
    }
    return list;
}

console.log("11. Lista de cadenas ordenadas alfabéticamente:", sortStrings(list_strings));

// 12. Escribe una función llamada stats que tome una lista de números y devuelva una lista con dos elementos: la media y la moda

export function stats(list) {

    if (list.length == 0) return [0,0]; // Si la lista está vacía, la mediana y moda son 0

    // Estadísticas a calcular
    let sum = 0; // Almacena la suma de los números
    let mode = list[0]; // Moda, número que más se repite, se inicializa con el primer número
    let reps = 0; // Contador de repeticiones de la moda
    let result = []; // Lista para mostrar los resultados

    // Encontrar la moda
    for (let i=0; i<list.length; i++) { // Recorre la lista
        let in_reps = 0; // Contador de repeticiones para cada número en las iteraciones
        sum += list[i]; // Suma los números para calcular la media
        
        for (let j=0; j<list.length; j++) { // Recorre la lista y compara con los demás números

            if (i != j && list[i] == list[j]) { // Mientras el número vuelva a aparecer, aumenta sus repeticiones
                in_reps++;
            }
            if (in_reps > reps) { // Si las repeticiones del número son mayores a las de la moda, el número es la nueva moda
                mode = list[i];
                reps = in_reps;
            }
        }
    }

    // Calcular la media (promedio)
    let mean = sum / list.length; // Suma de los números entre la cantidad de números

    // Agregar la mediana y moda al resultado
    result.push(mean);
    result.push(mode);

    return result;
}

list = [4, 4, 6, 8, 4, 4, 6, 8];
console.log("12. Mediana y moda de la lista de números:", stats(list));

// 13. Escribe una función llamada popularString que tome una lista de cadenas de texto y devuelva la cadena más frecuente

export function popularString(list) {

    if (list.length == 0) return ""; // Si la lista está vacía, no hay texto más popular

    let popular = list[0]; // Inicializa el texto más popular con la primera cadena
    let reps = 0; // Contador de repeticiones del texto más popular

    for (let i=0; i<list.length; i++) { // Recorre las cadenas de texto
        let in_reps = 0; // Contador de repeticiones para la cadena en la que se encuentra

        for (let j=0; j<list.length; j++) { // Compara con las demás cadenas
            if (i != j && list[i] == list[j]) { // Mientras el texto vuelva a aparecer, aumenta sus repeticiones
                in_reps++;
            }
            if (in_reps > reps) { // Si las repeticiones del texto son mayores al más popular, el texto es más popular
                popular = list[i];
                reps = in_reps;
            }
        }
    }
    return popular;
}

let list_rep_strings = ["one", "two", "thr", "fou"];
console.log("13. Texto más frecuente en la lista de cadenas de texto:", popularString(list_rep_strings));

// 14. Escribe una función llamada isPowerOf2 que tome un número y devuelva verdadero si es una potencia de dos, falso de lo contrario
// Lógica de código obtenida de la siguiente fuente: https://www.geeksforgeeks.org/program-to-find-whether-a-given-number-is-power-of-2/

export function isPowerOf2(n) {
    if (n == 0) return false; // el 0 no es una potencia de 2

    // Dividimos n entre 2 hasta que sea 1. Si en algún momento el residuo no es 0 o n no es 1, no es potencia de 2
    while (n != 1) { // Mientras n sea diferente a 1
        if (n % 2 != 0) return false; // Si n no es divisible entre 2, no es potencia de 2
        n = n/2; // Se divide n entre 2
    }

    return true; // Si n llega a 1, es potencia de 2
}

num = 16;
console.log("14. El número", num, "es potencia de 2:", isPowerOf2(num));

// 15. Escribe una función llamada sortDescending que tome una lista de números y devuelva una nueva lista con todos los números en orden descendente

export function sortDescending(list) {
    
    // Se utilizan las funciones programadas anteriormente para obtener el resultado
    let ordered_list = bubbleSort(list); // Ordena la lista en forma ascendente con Bubble Sort
    let inverted_list = invertArray(ordered_list); // Invierte la lista ordenada en una nueva lista

    // Nota: invertArrayInplace no se puede utilizar porque modifica la lista original
    return inverted_list;
}

list = [4,6,3,1,2];
console.log("15. Lista de números ordenada en forma descendente:", sortDescending(list));