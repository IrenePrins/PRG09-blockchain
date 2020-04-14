// const axios = require('axios');

// axios.get('https://programmeren9.cmgt.hr.nl:8000/api/blockchain/next')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })

// import sha256 from './node_modules/js-sha256/src/sha256.js';
let sha256 = require('js-sha256').sha256;

fetch('https://programmeren9.cmgt.hr.nl:8000/api/blockchain/next')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        if(data.blockchain !== null)
        generateHash(data)
    })


export function generateHash(data) {
    let hash =  data.blockchain.hash + 
    data.blockchain.data[0].from + 
    data.blockchain.data[0].to + 
    data.blockchain.data[0].amount + 
    data.blockchain.data[0].timestamp + 
    data.blockchain.timestamp + 
    data.blockchain.nonce;

    // remove whitespaces RECURSIVE FUNCTIONS
    hash = hash.split(" ").join("")

    // convert to ASCII NOG WEL MET GETALLEN OOK HIE RNOG NAAR KIJKEN
    //hash into array
    let asciiKeys = [];
    let asciiArray = ascii(0, hash.length, hash, asciiKeys)

    //array losse characters
    let seperateAsciikeys = []

    let seperateAsciiArray = singleCharacterArray(0, asciiArray.length, asciiArray, seperateAsciikeys);

    let mappedArray = seperateAsciiArray.map(x => parseInt(x))

    //split the array every tenth
    let motherStartArray = []
    let motherArray = splitEveryTenth(0, seperateAsciiArray.length, mappedArray, motherStartArray);

    //get last arrayitem and fix the thingy in addNumbers and push it back in motherarray
    let lastItem = motherArray.splice(-1)
    let newLastItem = addNumbers(lastItem)
    motherArray.push(newLastItem)

    //allemaal optellen
    let newSum = []
    let result = loopThroughMotherArray(0, motherArray.length, motherArray.splice(0, 1), motherArray)
    let result2 = result[0];

    //array to string, hash string
    let hashedString = hashString(result2)
}

function ascii(start, length, hash, asciiKeys) {    
    if (start < length) {
        asciiKeys.push(hash[start].charCodeAt(0));
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
    let newNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let newArray = [...arr[0], ...newNumbers]

    return newArray.splice(0, 10);
}

function loopThroughMotherArray(start, end, result, motherArray) {
    let sum;

    let next = motherArray.splice(0, 1);
    if(end > 0) {
        sum = sumUpArrays(0, next[0].length, result, next, [[]]);
        loopThroughMotherArray(start + 1, motherArray.length, sum, motherArray)
    }
    return sum;
}

function sumUpArrays(start, length, result, next, newSum) {
    if (start < length) { 
        let sum = (result[0][start] + next[0][start])%10
        newSum[0].push(sum);
    } else {
        return newSum;
    }

    return sumUpArrays(start + 1, length, result, next, newSum)
}

function hashString(hash) {
    let string = hash.join('')
    console.log(string)
    let hashedString2 = sha256(string)
    console.log(hashedString2)
}