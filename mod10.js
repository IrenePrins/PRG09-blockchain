let sha256 = require('js-sha256').sha256;

function generateHash(hash) {
    // remove whitespaces RECURSIVE FUNCTIONS
    // hash = hash.split(" ").join("")
    hash = hash.replace(/\s/g,'')
    
    // convert to ASCII NOG WEL MET GETALLEN OOK HIE RNOG NAAR KIJKEN
    //hash into array
    let asciiKeys = [];
    let asciiArray = ascii(0, hash.length, hash, asciiKeys)

    //array losse characters
    let seperateAsciikeys = []

    let seperateAsciiArray = singleCharacterArray(0, asciiArray.length, asciiArray, seperateAsciikeys);
    
    let mappedArray = seperateAsciiArray.map(x => parseInt(x))
    
    let test = checkArrayLength(mappedArray)

    //split the array every tenth
    let motherStartArray = []
    
    let motherArray = splitEveryTenth(0, seperateAsciiArray.length, test, motherStartArray);
    // //get last arrayitem and fix the thingy in addNumbers and push it back in motherarray
    // let lastItem = motherArray.splice(-1)
    // let newLastItem = addNumbers(lastItem)
    // motherArray.push(newLastItem)

    //allemaal optellen
    // let result = loopThroughMotherArray(0, motherArray.length, motherArray.splice(0, 1), motherArray)
    let result = loopThroughMotherArray(motherArray)
    
    // let result2 = result[0];
    // console.log(result2)
    // //array to string, hash string
    let hashedString = hashString(result)
// console.log(hashedString)
    return hashedString
}

function checkArrayLength(numberArray){
    if(numberArray.length%10 != 0){ //wanneer lengte string niet deelbaar door 10 
      for(let i = 0; numberArray.length%10; i++){ //push numbers 1-9 in aray
        numberArray.push(i)
      }
    return numberArray //return number array
    }
    else{
      return numberArray
    } 
}

function ascii(start, length, hash, asciiKeys) {
    var letters = /^[A-Za-z]+$/;

    if (start < length) {
        if(hash[start].match(letters)) {
            asciiKeys.push(hash[start].charCodeAt(0));
        } else {
            asciiKeys.push(parseInt(hash[start]))
        }
    } else {
        return asciiKeys
    }

    return ascii(start + 1, length, hash, asciiKeys)
}

function singleCharacterArray(start, length, asciiArray, seperateAsciikeys) {

    if (start < length) {   
        let arr = (""+asciiArray[start]).split("");
        seperateAsciikeys = [...seperateAsciikeys, ...arr]
    } else {
        return seperateAsciikeys
    }

    return singleCharacterArray(start + 1, length, asciiArray, seperateAsciikeys)
}

function splitEveryTenth(start, length, mappedArray, motherArray) {
    if (start < length) {   
        if (start % 10 === 0) {
            let newArray = mappedArray.splice(0, 10)
            motherArray.push(newArray)
        } 
    } else {
        return motherArray
    }
    return splitEveryTenth(start + 1, length, mappedArray, motherArray)
}

function addNumbers(arr) {
    let newNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    
    let newArray = [...arr[0], ...newNumbers]

    return newArray.splice(0, 10);
}

// function loopThroughMotherArray(start, end, result, motherArray) {
//     let sum;
// console.log(result)
//     let next = motherArray.splice(0, 1);
//     if(end > 0) {
//         sum = sumUpArrays(0, next[0].length, result, next, [[]]);
//         loopThroughMotherArray(start + 1, motherArray.length, sum, motherArray)
//     }
 
//     return sum;
// }
function loopThroughMotherArray(motherArray) {
    if(motherArray.length === 1) {
        return motherArray[0]
    }

    let firstArray = motherArray.shift();
    let secondArray = motherArray.shift();
    let result = [];

    result = sumUpArrays(firstArray, secondArray, result)
    motherArray.unshift(result)

    return loopThroughMotherArray(motherArray)
}

// function sumUpArrays(start, length, result, next, newSum) {
//     if (start < length) { 
//         let sum = (result[0][start] + next[0][start])%10
//         newSum[0].push(sum);
//     } else {
//         return newSum;
//     }

//     return sumUpArrays(start + 1, length, result, next, newSum)
// }

function sumUpArrays(firstArray, secondArray, newSum) {
    if (firstArray.length == 0 && secondArray.length == 0) {

        return newSum;
    } else {
        let sum = (firstArray[0] + secondArray[0])%10
        newSum.push(sum);

        firstArray.shift()
        secondArray.shift()
        return sumUpArrays(firstArray, secondArray, newSum)
    }
}

function hashString(hash) {
    let string = hash.join('')
    let hashedString2 = sha256(string)
    // console.log('hashedString2', hashedString2)
    return hashedString2
}

module.exports = {
    generateHash
}