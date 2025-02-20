/*
 * In-Class Activity: Javascript
 * TC2005B.401
 *
 * Student: Diego Córdova Rodriguez
 * ID: A01781166
 * 
 * Description: In this activity, 15 basic exercises in JavaScript will be performed
 * 
 * Due date: 19/02/2025
 */

// Prints the title of the activity
console.log("-----------------------------In-Class Activity: Javascript-----------------------------");

// 1. firstNonRepeating: Finds the first non-repeating character in a string

export function firstNonRepeating(str) {
    for (let i=0; i<str.length; i++) { // For each character in the string
        let char = str[i]; // Saves the character to compare with the others

        for (let j=0; j<str.length; j++) { // For each character in the string

            if (i != j && char == str[j]) { // If the character is repeated, it's not the first non-repeating character
                break;
            }
            else if (j == str.length-1) { // If the character is not repeated, it's the first non-repeating character
                return char;
            }
        }
    }
    return; // If there's no non-repeating character, return undefined
}

console.log("1. The first non-repeating character from 'abacddbec' is: " + firstNonRepeating("abacddbec"));

// 2. bubbleSort: Sorts a list of numbers by finding the largest in each iteration and placing it at the end

export function bubbleSort(ar) {

    let flag = false; // Flag to indicate if there was a swap

    for (let i=0; i<ar.length; i++) { // For each element in the list

        for (let j=0; j<ar.length-i; j++) { // For each element in the list
            if (ar[j] > ar[j+1]) { // If the current element is greater than the next one
                
                // Swap the elements
                let temp = ar[j];
                ar[j] = ar[j+1];
                ar[j+1] = temp;

                flag = true; // Indicates that there was a swap
            }
        }

        if (flag == false) break; // If there was no swap, the list is already sorted
    }
    return ar;
}

let list = [4,6,3,1,2];
console.log("2. List ordered with Bubble Sort:", bubbleSort(list));

// 3.1. invertArray: Inverts an array in a new array

export function invertArray(ar) {
    let ar2 = []; // New array to store the inverted values

    for (let i=ar.length-1; i>=0; i--) { // For each element in the array, starting from the end
        ar2.push(ar[i]); // Add the element to the new array
    }
    return ar2;
}

console.log("3.1. Array inverted in a new one:", invertArray([1,2,3,4,5]));

// 3.2. invertArrayInplace: Inverts an array in itself

export function invertArrayInplace(ar) { 
    for (let i=0; i<ar.length; i++) { // For each element in the array

        if (i >= ar.length-i-1) { // If the index is greater or equal to the half of the array, it's already inverted
            break;
        }
        
        // Swap the elements at the beginning and end of the array
        let temp = ar[i];
        ar[i] = ar[ar.length-i-1];
        ar[ar.length-i-1] = temp;
    }
    return ar;
}
console.log("3.2. Array inverted in itself:", invertArrayInplace([1,2,3,4,5]));

// 4. capitalize: Capitalizes the first letter of each word in a string and returns the new string

export function capitalize(str) {
    if (str == "") return str; // If the string is empty, return ""

    let words = str.split(' '); // Splits the string into words

    for (let i=0; i<words.length; i++) { // For each word in the string
        words[i] = words[i][0].toUpperCase() + words[i].substring(1); // Capitalizes the first letter of the words
    }
    return words.join(' '); // Joins the words into a string and returns it
}

let str = "hello world";
console.log("4. The string '", str, "' with its first letters capitalized:", capitalize(str));

// 5. mcd: Finds the greatest common divisor of two numbers
// Code logic obtained from: https://stackoverflow.com/questions/17445231/js-how-to-find-the-greatest-common-divisor

export function mcd(a, b) {
    if (b == 0) { // If b is 0, the only common divisor is a
        return a;
    }
    else if (a == 0) { // If a is 0, the only common divisor is b
        return b;
    }
    return mcd(b, a % b); // Recursive call to find the greatest common divisor
}

let n1 = 12;
let n2 = 18;
console.log("5. The geatest common divisor of", n1, "and", n2, ":", mcd(n1, n2));

// 6. hackerSpeak: Translates a string to 'Hacker Speak' by replacing some letters with numbers

export function hackerSpeak(str) {
    let result = ""; // String to store the translated text

    for (let i=0; i<str.length; i++) { // For each character in the string

        switch (str[i].toLowerCase()) { // Switch each character to lowercase to compare with the cases
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
                result += str[i]; // If is not in the cases, keep the character
                break;
        }
    }
    return result;
}

str = "Javascript es divertido";
console.log("6. The string '", str, "' in 'Hacker Speak':", hackerSpeak("Javascript es divertido"));

// 7. factorize: Finds the factors of a number and returns them in a list

export function factorize(n) {
    let result = []; // List to store the factors

    for (let i=1; i<=n; i++) { // For each number from 1 to n

        if (n % i == 0) { // If the number is divisible by i
            result.push(i); // Add the factor to the list
        }
    }
    return result;
}

let num = 12;
console.log("7. The factors of", num, "are:", factorize(num));

// 8. deduplicate: Removes duplicate elements from a list and returns the new list

export function deduplicate(ar) {

    for (let i=0; i<ar.length; i++) { // For each element in the list
        let item = ar[i]; // Saves the current element to compare with the others

        for (let j=0; j<ar.length; j++) { // For each element in the list

            if (i != j && item == ar[j]) { // If the element is repeated, delete it
                ar.splice(j,1); // From the current position, delete one element
                j--; // Decrease the index to avoid skipping elements
            }
        }
    }
    return ar;
}

list = [1,2,3,4,3,2,1];
console.log("8. List without duplicated elements:", deduplicate(list));

// 9. findShortestString: Finds the shortest string in a list of strings

export function findShortestString(list) {
    if (list.length == 0) return 0; // If the list is empty, the shortest string is 0

    let shortest = list[0].length; // Initializes the shortest string with the first one

    for (let i=1; i<list.length; i++) { // For each string in the list, starting from the second one to avoid comparing with itself

        if (list[i].length < shortest) { // If the current text is shorter than the shortest
            shortest = list[i].length; // The current text is the shortest
        }
    }
    return shortest;
}

let list_strings = ["one", "two", "three", "four", "five", "si"];
console.log("9. The shortest length in a list of strings:", findShortestString(list_strings));

// 10. isPalindrome: Checks if a string is a palindrome

export function isPalindrome(str) {
    str = str.toLowerCase(); // Convert the text to lowercase
    let separated = str.split(' '); // Separate the text by words
    let joined = separated.join(''); // Join the words without spaces

    for (let i=0; i<joined.length/2; i++) { // For each character in the first half of the text

        if (joined[i] != joined[joined.length-i-1]) { // If the character is different from the one in the other side
            return false; // The text is not a palindrome
        }
    }
    return true;
}

str = "rizuzir";
console.log("10. The string '", str ,"' is a palindrome:", isPalindrome(str));

// 11. sortStrings: Sorts a list of strings alphabetically

export function sortStrings(list) {

    for (let i=0; i<list.length; i++) { // For each string in the list

        for (let j=0; j<list.length; j++) { // For each string in the list

            if (list[i].toLowerCase() < list[j].toLowerCase()) { // If the current string is less than the next one
                // In this case, comparing the strings in lowercase by ASCII code is enough, since they are contiguous

                // Swap the strings
                let temp = list[i];
                list[i] = list[j];
                list[j] = temp;
            }
        }
    }
    return list;
}

console.log("11. List of strings ordered alphabetically:", sortStrings(list_strings));

// 12. stats: Calculates the mean and mode of a list of numbers

export function stats(list) {

    if (list.length == 0) return [0,0]; // If the list is empty, the mean and mode are 0

    // Stats to calculate
    let sum = 0; // Sum of the numbers
    let mode = list[0]; // mode: most frequent number, initialized with the first number
    let reps = 0; // Number of repetitions of the mode
    let result = []; // List to store the mean and mode

    // Calculate the mode
    for (let i=0; i<list.length; i++) { // For each number in the list
        let in_reps = 0; // Repetitions of each number
        sum += list[i]; // Sum the numbers
        
        for (let j=0; j<list.length; j++) { // For each number in the list

            if (i != j && list[i] == list[j]) { // If the number is repeated, increase its repetitions
                in_reps++;
            }
            if (in_reps > reps) { // If the repetitions are greater than the mode, the number is the new mode
                mode = list[i];
                reps = in_reps;
            }
        }
    }

    // Calculate the mean (average)
    let mean = sum / list.length; // Sum of the numbers divided by the number of elements

    // Add the mean and mode to the result list
    result.push(mean);
    result.push(mode);

    return result;
}

list = [4, 4, 6, 8, 4, 4, 6, 8];
console.log("12. Mean and mode of a list of numbers:", stats(list));

// 13. Escribe una función llamada popularString que tome una lista de cadenas de texto y devuelva la cadena más frecuente

export function popularString(list) {

    if (list.length == 0) return ""; // If the list is empty, the most popular string is ""

    let popular = list[0]; // Initialize the most popular string with the first one
    let reps = 0; // Number of repetitions of the most popular string

    for (let i=0; i<list.length; i++) { // For each string in the list
        let in_reps = 0; // Repetitions of each string

        for (let j=0; j<list.length; j++) { // For each string in the list
            if (i != j && list[i] == list[j]) { // If the string is repeated, increase its repetitions
                in_reps++;
            }
            if (in_reps > reps) { // If the repetitions are greater than the mode, the string is the new mode
                popular = list[i];
                reps = in_reps;
            }
        }
    }
    return popular;
}

let list_rep_strings = ["one", "two", "thr", "fou"];
console.log("13. Most popular string in a list of strings:", popularString(list_rep_strings));

// 14. isPowerOf2: Checks if a number is a power of 2. Returns true if it is, false if it's not
// Code logic obtained from: https://www.geeksforgeeks.org/program-to-find-whether-a-given-number-is-power-of-2/

export function isPowerOf2(n) {
    if (n == 0) return false; // If n is 0, it's not a power of 2

    // Divide n by 2 until it reaches 1
    while (n != 1) { // While n is different from 1
        if (n % 2 != 0) return false; // If n is not divisible by 2, it's not a power of 2
        n = n/2; // Divide n by 2
    }

    return true; // If n reaches 1, it's a power of 2
}

num = 16;
console.log("14. Number", num, "is a power of 2:", isPowerOf2(num));

// 15. sortDescending: Sorts a list of numbers in descending order and returns it in a new list

export function sortDescending(list) {
    
    // We can use the functions created previously to sort and order the list in descending order
    let ordered_list = bubbleSort(list); // Orders the list with Bubble Sort
    let inverted_list = invertArray(ordered_list); // Inverts the ordered list

    // Note: invertArrayInplace can't be used because it modifies the original list
    return inverted_list;
}

list = [4,6,3,1,2];
console.log("15. List of numbers ordered in descending order in a new list:", sortDescending(list));