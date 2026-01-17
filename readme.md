## BuildMiner:
This code is a functional simulation of Bitcoin's Proof of Work (PoW) algorithm. It handles the three main stages of a blockchain's lifecycle: receiving data, mining (the "work"), and storage.

1. Initial Setup (The Rules)
At the top, i  define the constraints for the blockchain:

 TARGET_DIFFICULTY: This is a very large number. For a hash to be "valid," its numerical value must be less than this target. By starting the target with 0x0f..., you are forcing the hash to start with at least one zero.
 MAX_TRANSACTIONS  : MAX_TRANSACTIONS is a constant that sets a limit on how much data a single block can hold. Think of it as the "size limit" of a cargo container.

mempool: This is an array that acts as a "waiting room" for transactions that haven't been added to a block yet.

 blocks: This is your actual ledger (the blockchain).

2. addTransaction (The Input)
This function is simple. It takes a piece of data (like Alice sending Bob money) and pushes it into the mempool. It hasn't been "confirmed" yet; it’s just waiting to be picked up by a miner.

3. mine() (The Logic)
This is the heart of the code. It performs two main tasks:

Step A: Gathering Transactions
The miner takes up to 10 transactions out of the mempool and puts them into a temporary list for the new block.


while (transactions.length < MAX_TRANSACTIONS && mempool.length > 0) {
    transactions.push(mempool.pop());
}
Step B: The Proof of Work (The Loop)
The miner creates a block object with an id and the transactions. It also adds a nonce (starting at 0). Then, it enters a while(true) loop:

It turns the whole block into a string and hashes it.

It checks: "Is this hash smaller than our target?"

If No: It increments the nonce (block.nonce++) and tries again. Because the nonce changed, the next hash will be completely different.

If Yes: It has found the "Golden Nonce." It breaks the loop.

4. Finalizing the Block
Once the loop breaks, the valid hash is permanently attached to the block using the spread operator ({ ...block, hash }), and the block is pushed into the blocks array.

Execution Summary
 Transaction Added: { sender: "vivek", ... } enters the mempool.

