---
title: Write your own app-specific zero knowledge plasma
description: In this tutorial, we build a semi-secret bank for deposits. The bank is a centralized component; it knows the balance of each user. However, this information is not stored onchain. Instead, the bank posts a hash of the state. Every time there is a transaction, the bank posts the new hash, along with a zero-knowledge proof that it has a (signed) transaction that changes the hash state to the new one. After reading this tutorial, you will understand not just how to use zero knowledge proofs, but also why you use them and how to do so securely.
author: Ori Pomerantz
tags: ["zero-knowledge", "server", "offchain"]
skill: advanced
lang: en
published: 2025-09-30
---

## Introduction

In contrast to [rollups](/developers/docs/scaling/zk-rollups/), [plasmas](/developers/docs/scaling/plasma) use the Ethereum mainnet for integrity, but not availability. In this article, we write an application that acts like a plasma, with Ethereum guaranteeing integrity (nobody can make unauthorized changes), but not availability (there is a centralized component that can go down and disable the whole system).

The application we write here is a privacy preserving bank. Different addresses have accounts with balances, and they can send money (ETH) to other accounts. The bank posts hashes of the state (accounts and their balances) and transactions, but keeps the actual balances offchain where they can stay private.

## Design

This is not a production-ready system, but a teaching tool. As such, it is written with a number of simplifying assumptions.

- Fixed account pool. There is a specific number of accounts, which belong to predetermined addresses. This makes for a much simpler system because it is difficult to handle variable size data structures in zero knowledge proofs. For a production-ready system, we can use the [Merkle root](https://ethereum.org/en/developers/tutorials/merkle-proofs-for-offline-data-integrity/) as the state hash and provide Merkle proofs for the balances we need.

- Memory storage. On a production system we need to write all the account balances to disk to preserve them in case of a restart. Here it's OK if the information is simply lost.

- Transfers only. A production system would require a way to deposit assets into the bank and to withdraw them back. But the purpose here is just to illustrate the concept, so this bank is limited to transfers.

### Zero-knowledge proofs

At a very basic level, a zero-knowledge proof shows that the prover knows some data, *Data<sub>private</sub>* such that there is a relationship *Relationship* between some public data, *Data<sub>public</sub>*, and *Data<sub>private</sub>*. The verifier knows *Relationship* and *Data<sub>public</sub>*.

To preserve privacy, we need the states and the transactions to be private. But to ensure integrity, we need the [cryptographic hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) of states to be public. To prove to people who submit transactions that those transactions really happened, we need to also post transaction hashes.

In most cases, *Data<sub>private</sub>* is the input to the zero knowledge proof program, and *Data<sub>public</sub>* is the output.

These fields in *Data<sub>private</sub>*:

- *State<sub>n</sub>*, the old state
- *State<sub>n+1</sub>*, the new state
- *Transaction*, a transaction that changes from the old state to the new one. This transaction needs to include these fields:
  - *Destination address* that receives the transfer
  - *Amount* being transferred
  - *Nonce* to ensure each transaction can only be processed once.
  The source address does not need to be in the transaction, because it can be recovered from the signature.
- *Signature*, a signature that is authorized to perform the transaction. In our case, the only address authorized to perform a transaction is the source address. Because of the way our zero-knowledge system works, in addition to the Ethereum signature we also need the account's public key.

These are the fields in *Data<sub>public</sub>*:

- *Hash(State<sub>n</sub>)* the hash of the old state
- *Hash(State<sub>n+1</sub>)* the hash of the new state
- *Hash(Transaction)* the hash of the transaction that changes the state from *State<sub>n</sub>* to *State<sub>n+1</sub>*.

The relationship checks several conditions:

- The public hashes are indeed the correct hashes for the private fields.
- The transaction, when applied to the old state, results in the new state.
- The signature comes from the transaction's source address.

Because of the properties of cryptographic hash functions, proving these conditions is enough to ensure integrity. 

### Data structures

The main data structure is the state held by the server. For every account, the server keeps track of the account balance and a [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce), used to prevent [replay attacks](https://en.wikipedia.org/wiki/Replay_attack).

### Components

This system requires two components: One is a *server* that receives transactions, processes them, and posts hashes to the chain along with the zero knowledge proofs. The second is a *smart contract* that stores the hashes and verifies the zero knowledge proofs to ensure state transitions are legitimate.

### Data and control flow

These is the ways that the various components communicate to transfer from one account to another.

1. A web browser submits a signed transaction asking for a transfer from the signer's account to a different account.

2. The server verifies that the transaction is valid:
   - The signer has an account in the bank with a sufficient balance.
   - The recipient has an account in the bank.

3. The server calculates the new state by subtracting the transferred amount from the signer's balance and adding it to the recipient's balance.

4. The server calculates a zero-knowledge proof that the state change is a valid one.

5. The server submits to Ethereum a transaction that includes:
   - The new state hash
   - The transaction hash (so the trasaction sender can know it has been processed)
   - The zero knowledge proof that proves the transition to the new state is valid

6. The smart contract verifies the zero knowledge proof.

7. If the zero knowledge proof checks out, the smart contract performs these actions:
   - Update the current state hash to the new state hash
   - Emit a log entry with the new state hash and the transaction hash

### Tools

For the client-side code we are going to use [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/) and [Wagmi](https://wagmi.sh/). These are industry standard tools, if you are not familiar with them, you can use [this tutorial](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

The majority of the server is written in JavaScript using [Node](https://nodejs.org/en). The zero-knowledge part is written in [Noir](https://noir-lang.org/).

The blockchain we use is `anvil`, a local testing blockchain which is part of [Foundry](https://getfoundry.sh/introduction/installation).

## Implementation

Because this is a complex system, we'll implement it in stages.

### Stage 1 - Manual zero knowledge

For the first stage, we'll sign a transaction in the browser and then manually provide the information to the zero-knowledge proof. The zero-knowledge code expects to get that information in `server/noir/Prover.toml` (documented [here](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1)).

To see it in action:

1. Make sure you have [Node](https://nodejs.org/en/download) and [Noir](https://noir-lang.org/install) installed. Preferably, install them on a UNIX system such MacOS, Linux, or [WSL](https://learn.microsoft.com/en-us/windows/wsl/install).

2. Download the stage 1 code and start the web server to serve the client code.

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   The reason you need a web server here is that to prevent certain types of fraud many wallets (such as MetaMask) don't accept files 

3. Open a browser with a wallet.

4. In the wallet enter a new pass phrase. Note that this will delete your existing pass phrase, so *make sure you have a backup*. 

   The passphrase is `test test test test test test test test test test test junk`, the default testing pass phrase for anvil.

5. Browse to [the client-side code](http://localhost:5173/).

6. Connect to a wallet and select your destination account and amount.

7. Click **Sign** and sign the transaction.

8. Under the **Prover.toml** heading you'll find text. Replace `server/noir/Prover.toml` with that text.

9. Execute the zero knowledge proof.

   ```sh
   cd ../server/noir
   nargo execute
   ```

   The output should be similar to

   ```
   ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute
   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: Vec([Field(5873071459087041890842521225112488559115105462524655074522108820585084475437), Field(11581062510966044975749814014940525872232248132681539344842393839078106142331), Vec([Field(69), Field(12), Field(249), Field(218), Field(110), Field(24), Field(13), Field(97), Field(89), Field(41), Field(5), Field(84), Field(174), Field(61), Field(135), Field(135), Field(109), Field(139), Field(197), Field(161), Field(91), Field(144), Field(55), Field(229), Field(47), Field(181), Field(155), Field(107), Field(152), Field(114), Field(42), Field(133)])])
   ```

#### `server/noir/Prover.toml`

[This file](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) shows the information format expected by Noir.

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

The message is in text format, which makes it easy for the user to understand (necessary when signing) and for the Noir code to parse. The amount is quoted in finneys to enable fractional transfers on one hand, and be easily readable on the other. The last number is the [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce).

The string is 100 characters long. Zero knowledge proofs don't handle variable size data very well, so it's often necessary to pad data.

```toml
pubKeyX=["0x83",..."0x75"]
pubKeyY=["0x35",..."0xa5"]
signature=["0xb1",...,"0x0d"]
```

These three parameters are fixed-size byte arrays.

```toml
[[accounts]]
address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
balance=100_000
nonce=0

[[accounts]]
address="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
balance=100_000
nonce=0
```

This is the way to specify an array of structures. For each entry, we specify the address, balance (in milliETH a.ka. [Finney](https://cryptovalleyjournal.com/glossary/finney/)), and next nonce value.

#### `client/src/Transfer.tsx`

[This file](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) implements the client-side processing and generates the `server/noir/Prover.toml` file with te parameters. 

Here is the explanation of the more interesting parts.

```tsx
export default attrs =>  {
```

This function creates the `Transfer` React component which other files can import.

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

The account addresses. There are the addresses created by the `test ... test junk` pass phrase. If you want to use your own addresses, just modify this definition.

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

These [Wagmi hooks](https://wagmi.sh/react/api/hooks) let us access the [viem](https://viem.sh/) library and the wallet.

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

This is the message, padded with spaces. Every time one of the [`useState`](https://react.dev/reference/react/useState) variables changes, the component is redrawn and `message` is updated.

```tsx
  const sign = async () => {
```

This function is called when the user clicks the **Sign** button. The message is updated automatically, but the signature requires user approval in the wallet, and we don't want to ask for that except as needed.

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

Ask thr wallet to [sign the message](https://viem.sh/docs/accounts/local/signMessage). 

```tsx
    const hash = hashMessage(message)
```

Get the message hash. It is useful to provide it to the user for debugging (of the Noir code). 

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[Get the public key](https://viem.sh/docs/utilities/recoverPublicKey). This is required for the [Noir `ecrecover`](https://github.com/colinnielsen/ecrecover-noir) function.

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

Set the state variables. Doing this redraws the component (after the `sign` function exits) and shows the user the updated values.

```tsx
    let proverToml = `
```

The text for `Prover.toml`. 

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem provides us the public key as a 65-byte hexadecimal string. The first byte is `0x04`, a version marker. This is followed by 32 bytes for the `x` of the public key and then 32 bytes for the `y` of the public key.

However, Noir expects to get this information as two byte arrays, one for `x` and one for `y`. It is easier to parse it here on the client rather than as part of the zero-knowledge proof.

Note that this is good practice in zero-knowledge in general. Code inside a zero-knowledge proof is expensive, so any processing that can be done outside of the zero-knowledge proof *should* be done outside the zero-knowledge proof.

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

The signature is also provided as a 65 byte hexadecimal string. However, the last byte is only necessary to recover the public key. As the public key is already going to be provided to the Noir code, we don't need it to verify the signature, and the Noir code does not require it.

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

Provide the accounts.

```tsx
    setProverToml(proverToml)
  }

  return (
    <>
        <h2>Transfer</h2>
```

This is the HTML (more accurately, [JSX](https://react.dev/learn/writing-markup-with-jsx)) format of the component.

#### `server/noir/src/main.nr`

[This file](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) is the actual zero knowledge code.

```noir
use std::hash::pedersen_hash;
use dep::ecrecover;
use keccak256::keccak256;


global ACCOUNT_NUMBER: u32 = 5;
global FLAT_ACCOUNT_FIELDS : u32 = 2;
global MESSAGE_LENGTH : u32 = 100;
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH; 

struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}

struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}




fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];

    flat
}



fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];

    for i in 0..ACCOUNT_NUMBER {
        let fields = flatten_account(accounts[i]);
        for j in 0..FLAT_ACCOUNT_FIELDS {
            flat[i*FLAT_ACCOUNT_FIELDS + j] = fields[j];
        }
    }

    flat
}


fn hash_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> Field {
    pedersen_hash(flatten_accounts(accounts))
}

fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }

    // Or else account not found, and the transaction is impossible to fulfill
    assert (account < ACCOUNT_NUMBER);

    account
}


fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    // Or else there isn't enough balance to transfer
    assert (accounts[from].balance >= txn.amount);

    // Or else this might be a replay attack
    assert (accounts[from].nonce == txn.nonce);    

    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}

fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field 
{
    let mut result : Field = 0;

    for i in 7..47 {
        result *= 0x10;
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            result += (messageBytes[i]-48).into();
        }
        if messageBytes[i] >= 65 & messageBytes[i] <= 70 {    // A-F
            result += (messageBytes[i]-65+10).into()
        }
        if messageBytes[i] >= 97 & messageBytes[i] <= 102 {   // a-f
            result += (messageBytes[i]-97+10).into()
        }        
    }    

    result
}

fn readAmountAndNonce(messageBytes: [u8; MESSAGE_LENGTH]) -> (u128, u32)
{
    let mut amount : u128 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
    let mut nonce: u32 = 0;

    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // We just found it
                stillReadingNonce = true;
                lookingForNonce = false;
            }

            if stillReadingNonce {
                nonce = nonce*10 + digit.into();
            }
        } else {
            if stillReadingAmount {
                stillReadingAmount = false;
                lookingForNonce = true;
            }
            if stillReadingNonce {
                stillReadingNonce = false;
            }
        }
    }

    (amount, nonce)
}


fn readTransferTxn(message: str<MESSAGE_LENGTH>) -> TransferTxn 
{
    let mut txn: TransferTxn = TransferTxn { from: 0, to: 0, amount:0, nonce:0 };
    let messageBytes = message.as_bytes();

    txn.to = readAddress(messageBytes);
    let (amount, nonce) = readAmountAndNonce(messageBytes);
    txn.amount = amount;
    txn.nonce = nonce;

    txn
}



// The equivalent to Viem's hashMessage
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
    // ASCII prefix
    let prefix_bytes = [
        0x19, // \x19
        0x45, // 'E'
        0x74, // 't'
        0x68, // 'h'
        0x65, // 'e'
        0x72, // 'r'
        0x65, // 'e'
        0x75, // 'u'
        0x6D, // 'm'
        0x20, // ' '
        0x53, // 'S'
        0x69, // 'i'
        0x67, // 'g'
        0x6E, // 'n'
        0x65, // 'e'
        0x64, // 'd'
        0x20, // ' '
        0x4D, // 'M'
        0x65, // 'e'
        0x73, // 's'
        0x73, // 's'
        0x61, // 'a'
        0x67, // 'g'
        0x65, // 'e'
        0x3A, // ':'
        0x0A  // '\n'
    ];

    let mut buffer: [u8; HASH_BUFFER_SIZE] = [0u8; HASH_BUFFER_SIZE];
    for i in 0..26 {
        buffer[i] = prefix_bytes[i];
    }

    let messageBytes : [u8; MESSAGE_LENGTH] = message.as_bytes();

    if MESSAGE_LENGTH <= 9 {
        for i in 0..1 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+1] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 10 & MESSAGE_LENGTH <= 99 {
        for i in 0..2 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+2] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 100 {
        for i in 0..3 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+3] = messageBytes[i];
        }
    }

    assert(MESSAGE_LENGTH < 1000, "Messages whose length is over three digits are not supported");

    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}

fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, [u8; 32])
{
    let hash = hashMessage(message);

    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
        hash
    )
}


fn main(
        accounts: [Account; ACCOUNT_NUMBER], 
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],        
        signature: [u8; 64],
    ) -> pub (
        Field,  // Hash of new accounts array
        Field,  // Hash of old accounts array
        [u8; 32], // Transaction hash (hash of the message)
    )
{
    let mut txn = readTransferTxn(message);

    let (fromAddress, txnHash) = signatureToAddressAndHash(
        message,
        pubKeyX,
        pubKeyY,
        signature);

    txn.from = fromAddress;

    let newAccounts = apply_transfer_txn(accounts, txn);

    (
        hash_accounts(newAccounts),
        hash_accounts(accounts),
        txnHash
    )
}


// #[test]
// fn test_main() {
//    main(1, 2);

    // Uncomment to make test fail
    // main(1, 1);
// }
```


## Abuses by the centralized component

Integrity is easy, availability hard, confidentiality impossible

### Forced transactions

The server can ignore them, but only at the cost of a total block.

### Availability bonds

### Correspndent banks

## Conclusion