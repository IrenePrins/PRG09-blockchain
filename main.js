let axios = require('axios').default;
const mod10 = require('./mod10.js');
let fetch = require('node-fetch')


axios.get('https://programmeren9.cmgt.hr.nl:8000/api/blockchain/next')
    .then((response) => {
        return response.data
    })
    .catch(function (error) {
        // handle error
        console.log(error);
      })
    .then((data) => {
        if(data.open) {
            generatePreviousHash(data)
        } else {
            throw new Error('blockchain geclosed')
        }
    })

function generatePreviousHash(data) {
    let hash =  data.blockchain.hash + 
    data.blockchain.data[0].from + 
    data.blockchain.data[0].to + 
    data.blockchain.data[0].amount + 
    data.blockchain.data[0].timestamp + 
    data.blockchain.timestamp + 
    data.blockchain.nonce

    let transactionString = '';

    // maak string
    // waarom werkt data.transactions[0].from niet????
    for(let i = 0; i < data.transactions.length; i++){
        transactionString 
            += data.transactions[0].from
            + data.transactions[0].to
            + data.transactions[0].amount
            + data.transactions[0].timestamp
    }

    transactionString += data.timestamp;

    //previous block hashen
    let previousBlockHash = mod10.generateHash(hash)

    //newblock maken
    createNewBlock(previousBlockHash, transactionString)
}

function createNewBlock(previousBlockHash, transactionString) {
    let newBlock = previousBlockHash + transactionString; 
    let nonce = findNonce(newBlock)

    sendPostRequest(nonce)
}

//vind nonce blijf loopen tot dat je hash die met 0000 begint vindt
async function findNonce(string){
    let generatedHash = ''
    let nonce = 0

    while (generatedHash.substring(0, 4) !== '0000') {
        nonce ++
        generatedHash = mod10.generateHash(string + nonce.toString())
    }

    return await sendPostRequest(nonce)
}

//zend request
function sendPostRequest(nonce) {   
    let body = {
        nonce : nonce,
        user : 'Irene Prins 0947090',
    }

    fetch('https://programmeren9.cmgt.hr.nl:8000/api/blockchain', {
        method : 'POST',
        body: JSON.stringify(body),
        headers : {
            'Content-Type': 'application/json'
        }
    })
    .then(succes)
    .catch(function (error) {
        console.error(error);
    });
}

function succes(res) {
    res.json().then(res=>{console.log('response', res.message) }) //laat zien wat de message was van de response
    return res.message !== 'nonce is not correct'   //return message when not incorrect
}