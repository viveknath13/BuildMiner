const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = []; //The transaction sites until the miner pick up
const blocks = [];

function addTransaction(transaction) {

    mempool.push(transaction);
}

function mine() {

    let transactions = []; // an arrays of transaction 
    while (transactions.length < MAX_TRANSACTIONS && mempool.length > 0) {
        transactions.push(mempool.pop()); // The miner takes up to 10 transactions out of the mempool and puts them into a temporary list for the new block.
    }

    const block = { id: blocks.length, transactions };
    block.nonce = 0;
    let hash;

    while (true) {
        hash = SHA256(JSON.stringify(block)).toString();
        if (BigInt(`0x${hash}`) < TARGET_DIFFICULTY) {
            break;
        }
        block.nonce++;

    }
    const newBlock = { ...block, hash };
    blocks.push(newBlock);
    return newBlock;

}


let TheTransaction = {
    sender: "vivek",
    reciever: "Bob",
    amount:100
}
addTransaction(TheTransaction);
const result = mine();
console.log("The nonce Details is ", result.nonce);
console.log("Mine Block Details", result);
console.log("Mine Block Hash", result.hash);


