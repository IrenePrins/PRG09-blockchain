// const axios = require('axios');

// axios.get('https://programmeren9.cmgt.hr.nl:8000/api/blockchain/next')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })

fetch('https://programmeren9.cmgt.hr.nl:8000/api/blockchain/next')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        this.generateHash(data)
    })

function generateHash(data) {
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
    asciiKeys = [];
    for (var i = 0; i < hash.length; i++) {
        asciiKeys.push(hash[i].charCodeAt(0));
    }

    seperateAsciikeys = []
    //transform every digit in a array
    for(var i = 0; i < asciiKeys.length; i++) {
       let arr = (""+asciiKeys[i]).split("");
        seperateAsciikeys = [...seperateAsciikeys, ...arr]
    }

    //split by every 10 numbers RECURSIVE FUNCITONS, PURE FUNCTIONS??
    //organiseer zodat het niet een vast getal is maar dat hij de volle lengte aanneemt
    // ipv alleen het eerste deel van de array?
    let motherArray = []
    for(var i = 0; i <= 299; i++) {
        if (i % 10 === 0) {
            let newArray = seperateAsciikeys.splice(0, 10)
            motherArray.push(newArray)
        } 
    }

    //get last arrayitem and fix the thingy in addNumbers
    let lastItem = motherArray.slice(-1)

    let newLastItem = addNumbers(lastItem)

    //gaat niet goed
    motherArray2 = motherArray.push(newLastItem)
    console.log(motherArray)
}

function addNumbers(arr) {
    arr[0].push("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10")
    let newLastItem = arr[0].spliceł(0, 10)

    return newLastItem
}