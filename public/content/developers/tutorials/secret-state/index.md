---
title: Using zero-knowledge for a secret state
description: Onchain games are limited because they cannot keep any hidden information. After reading this tutorial, a reader will be able to combine zero-knowledge proofs and server components to create verifiable games with a secret state, offchain, component. The technique to do this will be demonstrated by creating a minesweeper game.
author: Ori Pomerantz
tags: ["server", "offchain", "centralized", "zero-knowledge", "zokrates", "mud"]
skill: intermediate
lang: en
published: 2024-08-15
---

*There are no secrets on the blockchain*. Everything that is posted on the blockchain is open to everybody to read. This is necessary, because the blockchain is based on anybody being able to verify it. However, games often rely on secret state. For example, the game of [minesweeper](https://en.wikipedia.org/wiki/Minesweeper_(video_game)) makes absolutely no sense if you can just go on a blockchain explorer and see the map.

The simplest solution is to use a [server component](/developers/tutorials/server-components/) to hold the secret state. However, we don't want to trust that server component's honesty. Luckily, we don't need to. We can provide a hash of the state, and use provide [zero-knowledge proofs](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) to ensure that the state used to calculate the result of a move is the correct one.

After reading this article you will know how to create this kind of secret state holding server, as well as an on-chain component for communication between the two. The main tools we use will be:

* [Zokrates](https://zokrates.github.io/) for zero-knowledge proofs and their verification.
* [Typescript](https://www.typescriptlang.org/) for both the server and the client.
* [Node](https://nodejs.org/en) for the server.
* [Viem](https://viem.sh/) for communication with the Blockchain.
* [MUD](https://mud.dev/) for on-chain data management. Proper disclosure: While I'm writing this on my own time for Ethereum Foundation, my day job is working for [Lattice](https://lattice.xyz/) which makes this framework. 
* [React](https://react.dev/) for the user interface of the client.
* [Vite](https://vitejs.dev/) for serving the client code.

## Minesweeper example {#minesweeper}

[Minesweeper](https://en.wikipedia.org/wiki/Minesweeper_(video_game)) is a game that includes a secret map with a minefield. The player chooses to dig in a specific location. If that location has a mine, it's game over. Otherwise, the player gets the number of mines in the eight squares surrounding that location.

This application is written using [MUD](https://mud.dev/), a framework that lets us store data onchain using a [key-value database](https://aws.amazon.com/nosql/key-value/) and synchronize that data automatically with off-chain components. In addition to synchronization, MUD makes it easy to provide access control, and for other users to [extend](https://mud.dev/guides/extending-a-world) our application.

### Tables {#tables}

We need several tables in the database to implement the functionality we need.

1. `Configuration`: This table is a singleton, it has no key. It is used to hold game configuration information:
   - `height`: The height of a minefield
   - `width`: The width of a minefield
   - `numberOfBombs`: The number of bombs in each minefield
   
   The verifier key used to verify zero knowledge proofs is also part of the configuration, but because of the way the Solidity-Zokrates interface works it is inside a separate contract. 

2. `PlayerGame`: The key is the player's address. The data is:
    - `gameId`: 32 byte value that is the hash of the map the player is playing on (the game identifier).
    - `win`: a boolean that is whether the player won the game.
    - `lose`: a boolean that is whether the player lost the game.
    - `digNumber`: the number of successful digs in the game.  
3. `Map`: The key is a tuple of three values:
   - The game identifier
   - x
   - y
   The value is a single number. It's 255 if a bomb was detected. Otherwise, it is the number of bombs around that location plus one. We cannot use just the number of bombs, because by default all storage in the EVM and all row values in MUD are zero. We need to distinguish between "the player didn't dig here yet" and "the player dug here, and found there are zero bombs around".

In addition, communication between the client and server happens through the on-chain component. This is also implemented using tables, but those are [off-chain tables](https://mud.dev/store/tables#types-of-tables), meaning the data is only available off-chain in the form of log events.

4. `PendingGame`: Unserviced requests to start a new game.
5. `PendingDig`: Unserviced requests to dig in a specific place in a specific game.
6. `PendingDigResults`: Responses to dig requests. These include the proof of the result, and optionally also the map (if the result is that the player blew up and the game is over).

### Execution and data flows {#execution-data-flows}

These flows coordinate execution between the client, the on-chain component, and the server.

#### New game {#new-game-flow}

1. The client sends a new game request to the on-chain component.
2. The on-chain component adds the client's address to the `PendingGame` table.
3. The server detects that there is a new entry in the `PendingGame` table. Ultimately this is done through [events](/developers/tutorials/logging-events-smart-contracts/), but MUD abstracts it for us.
4. The server creates a new game, calculates the map hash for the game identifier, and adds this information to `gamesInProgress`. 
5. The server sends the on-chain component the hash of the game identifier and the identity of the user whose request has been serviced.
6. The on-chain component adds the game information to `PlayerGame`.
7. The client identifies that its address was added to the `PlayerGame` table, and starts displaying the board to the player.


#### Dig {#dig-flow}

1. The client sends a dig request, comprised of the game identifier and the x and y coordinates of the location to dig, to the on-chain component.
2. The on-chain component verifies the dig request is legitimate:
   - The client is the player for this game according to `PlayerGame`.
   - The location has not been dug already (according to `Map`).
3. The on-chain component adds this entry to `PendingDig`
4. The server detects the new entry in `PendingDig` and retrieves the map from `gamesInProgress`. 
5. The server calls the Zokrates library with the map and the dig location. This library then returns a proof with the following values:
   - The x and y coordinates of the dig location
   - Hash of the map, which is the game identifier
   - Either 255 if there is a bomb in the location, or the number of bombs in an eight location area around the location if there isn't.
6. If the game is over (either because the user found a bomb, or because the user dug in `width*height - bombNumber` places), the server deletes the game from `gamesInProgress`.
7. The server sends the on-chain component the proof, and optionally (if game over) the map.
8. The on-chain component verifies the proof. The process only continues if the proof verifies.
9. The on-chain component checks if it's game over, either because `digNumber` is equal to `width*height - numberOfBombs` or because the dig found a bomb, note that fact in `PlayerGame`.
10. The on-chain component updates `Map` with the new information. This change is automatically synchronized to the client by MUD. The on-chain component also increments `PlayerGame`'s `digNumber`.
11. The client displays the new information to the player.
12. If the game is over, the client informs the player of that fact.


#### Verify setup artifacts {#setup-artifact-flow}

To verify the integrity of this dapp, it is not enough to verify the Solidity code. Another attack vector is the Zokrates program. This flow can be used by a client to verify that the Zokrates program is the one expected.

1. The client sends an "artifact request" to the on-chain component.
2. The on-chain component responds with:
   - The verifier key
   - The Zokrates programs. Technically there are two of them, [as explained below](#zokrates-programs): one for calculating map hashes and one for creating verified dig results.
   - The Zokrates configuration
   - The version of Solidity
3. The client compiles the verified dig results program and compares it to the verification function online. This is a multi-stage process.
   A. The client compiles the Zokrates code into an arithmetic circuit with constraints (that's the form that zk-SNARK actually uses).
   B. The client creates Solidity code from that arithmetic circuit with the constraints.
   C. The client compiles that Solidity code into EVM code.
   D. The client reads the code from the appropriate contract online and verifies it is identical.

Clients do not *have* to run this flow, the game works without it, but without this step you can't know if the zero knowledge proofs actually prove what you need.


## Using Zokrates {#using-zokrates}

### Hashing the map {#hashing-map}

We could find a JavaScript or Solidity code to implement [the best Zokrates hash function](https://zokrates.github.io/toolbox/stdlib.html#pedersen-hashes). However, then we'd have to ensure the input format is exactly the same as that calculated by Zokrates. It is easier to just use a Zokrates program to calculate the hash of a map. So we need two different Zokrates programs, one to just calculate the hash of a map (`hash`) and one to actually create a zero-knowledge proof of the result of the dig in a location on the map (`dig`).

### The hash function {#hash-function}

This is the function that calculates the hash of a map. We'll go over this code line by line.

```
from "hashes/pedersen/512bitBool.zok" import main as pederhash;
import "utils/casts/bool_256_to_u32_8.zok" as bool_256_to_u32_8;
```

These two lines import two functions from the [Zokrates standard library](https://zokrates.github.io/toolbox/stdlib.html). [The first function](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/pedersen/512bitBool.zok) is a [Pedersen hash](https://iden3-docs.readthedocs.io/en/latest/_downloads/4b929e0f96aef77b75bb5cfc0f832151/Pedersen-Hash.pdf).It takes 512 bits of input, and returns a 256 bit long hash. [The second function](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/casts/bool_256_to_u32_8.zok) lets us cast the 256-bit hash value to an array of eight 32-bit values.

```
def hashMap(bool[${width+2}][${height+2}] map) -> u32[8] {
```

This line starts a function definition. `hashMap` gets a single parameter called `map`, a two dimensional `bool`(ean) array. The size of the map is `width+2` by `height+2` for reasons that are explained below.

We also use `${width+2}` and `${height+2}`. This is because the Zokrates programs are stored in this application as [Template Strings](https://www.w3schools.com/js/js_string_templates.asp). Code between `${` and `}` is evaluated by JavaScript, and this way the program can be used for different map sizes.

The map parameter has a one location wide border all around it without any bombs, which is the reason we need to add two to the width and height. This is necessary because of the way Zokrates handles if statements, [as explained below](#why-map-border).

The return value is an array of eight unsigned 32-bit values, the hash.

```
   bool[512] mut map1d = [false; 512];
```

The map is two-dimensional. However, the input to the hash function needs to be a 512-value boolean array. Here we define a variable for it. By default Zokrates variables are constants, but we need to assign values to this array in a loop.

We need to initialize the array, Zokrates doesn't have `undefined`. The `[false; 512]` expression means [an array of 512 `false` values](https://zokrates.github.io/language/types.html#declaration-and-initialization).

```
   u32 mut counter = 0;
```

We also need a counter to distinguish between the bits we already filled in `map1d` and those we haven't.

```
   for u32 x in 0..${width+2} {
```

This is for you declare a [for loop](https://zokrates.github.io/language/control_flow.html#for-loops) in Zokrates. A Zokrates for loop has to have fixed bounds, because while it appears to be a loop, the compiler actually "unrolls" it. The expression `${width+2}` is a compile time constant because `width` is set by the TypeScript code before it calls the compiler.

```
      for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

For every location in the map, put that value in the `map1d` array and increment the counter.

```
   return bool_256_to_u32_8(pederhash(map1d));
}
```

The hash function is imported as `pederhash`. It takes an array of 512 booleans, and returns an array of 256 booleans. We then use `bool_256_to_u32_8` to convert the array into a smaller array of just eight 32-bit values.

Ideally, we'd prefer to return the hash as a single 256-bit value. However, Zokrates does not work with those values. The primary arithmetic type of Zokrates is [`field`](https://zokrates.github.io/language/types.html#field), whose value is between zero and a large (254-bit) prime number. It cannot return a single 256-bit value, so we use an array instead.

### The hash program {#hash-program}

The server needs to call `hashMap` directly to create game identifiers. However, Zokrates can only call the `main` function on a program to start, so we create a program with a `main` that calls the hash function.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> u32[8] {
   return hashMap(map);
}
```

### The dig program {#dig-program}

This is the heart of the zero-knowledge part of the application, where we produce the proofs that are used to verify dig results.

```
${hashFragment}

// The number of mines in location (x,y)
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

<a id="why-map-border">

Zero-knowlege proofs use [arithmetic circuits](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785), which don't have an easy equivalent to an `if` statement. Instead, they use the equivalent of the [conditional operator](https://en.wikipedia.org/wiki/Ternary_conditional_operator). If `a` can be either zero or one, you can calculate `if a { b } else { c }` as `(1-a)b+ac`.

Because of this issue, a Zokrates `if` statement always evaluates both branches. For example, if you have this code:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

It will error out, because it needs to calculate `arr[10]`, even though that value will be multiplied by zero. 

This is the reason we need a one location wide border all around the map. We need to calculate the total number of mines around a location, and that means we need to see the location one row above and below, to the left and to the right, of the location where we're digging. Which means those location have to exist in the map array that Zokrates is provided.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (u32[8], u8) {
```

By default Zokrates proofs include their inputs. It does no good to know there are five mines around a spot unless you actually know which spot it is (and you can't just match it to your request, because then the prover could use different values and not tell you about it). However, we need to keep the map a secret, while providing it to Zokrates. The solution is to use a `private` parameter, one that is *not* revealed by the proof.

This opens another venue for abuse. The prover could use the correct coordinates, but create a map with any desired number of mines around the location, and possibly at the location itself. To prevent this abuse, we make the zero knowledge proof include the hash of the map, which is the game identifier.

```
   return (hashMap(map),
```

The return value here is a tuple that includes the map hash array as well as the dig result.

```
         if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

We use 255 as a special value in case the location itself has a bomb.

```
            map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)                         
         } 
   );
}
```

If the player hasn't hit a mine, add the mine counts for the area around the location and return that.

### Using Zokrates from TypeScript {#using-zokrates-from-typescript}

Zokrates has a command line interface, but in this program we use it in the [TypeScript code](https://zokrates.github.io/toolbox/zokrates_js.html). Using [TypeScript](https://www.typescriptlang.org/), which gets compiled to JavaScript, lets us use the same code on the server and the client.

The library that contains the Zokrates definitions is called `zero-knowledge.ts`.

** GOON    LINK TO GITHUB GOES HERE ***

```typescript
import { initialize as zokratesInitialize } from "zokrates-js";
```

Import the [Zokrates JavaScript bindings](https://zokrates.github.io/toolbox/zokrates_js.html). We only need the [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) function because it returns a promise that resolves to all the Zokrates definitions we need.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Similar to Zokrates itself, we also export only one function, which is also [asynchronous](https://www.w3schools.com/js/js_async.asp). When it eventually returns, it provides three functions as we'll see below.

```typescript
    const zokrates = await zokratesInitialize()
```

Initialize Zokrates, get everything we need from the library.

```typescript
    const hashFragment = `
        from "hashes/pedersen/512bitBool.zok" import main as pederhash;
            .
            .
            .
        }
    `

    const hashProgram = `
        ${hashFragment}
            .
            .
            .
    `

    const digProgram = `
        ${hashFragment}
            .
            .
            .
    `
```

Next we have the three Zokrates programs we saw above.

```typescript
    const digCompiled = zokrates.compile(digProgram)
    const hashCompiled = zokrates.compile(hashProgram)
```

Here we compile those programs. We could save some resources by saving the compiled version as files and only recompiling when needed (when the map size changes), but that would be more complicated. This program is opitimized for simplicity, it's not production-level code but a tutorial.

```typescript
    // Create the keys for zero knowledge verification.
    // Doing this here is simple, but it might be insecure.
    // On a production system you'd want to use a setup ceremony. 
    // (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
    const keySetupResults = zokrates.setup(digCompiled.program, "")
    const verifierKey = keySetupResults.vk
    const proverKey = keySetupResults.pk
```

On a production system we'd use a more complicated [setup ceremony](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony), but this is good enough for a demonstration. It's not a problem that the users know the prover key - they still cannot use it to prove things unless they are true.

```typescript
    const joinHashArray = function(arr: string[]): string {
        return "0x"+arr.map(x => x.slice(2)).reduce((a,b) => a+b)
    }
```

The Zokrates [hash program](hash-program) returns an array of eight 32-bit values. However, on the EVM it is easier to handle a single 256-bit value. Here we combine those values, provided as hexadecimal strings, into a single hexadecimal string. We could have done this in Zokrates, but Zokrates is a lot more resource intensive, so it's best to limit it to where it is necessary.

```typescript
    const calculateMapHash = function(hashMe: boolean[][]): string {
        return joinHashArray(JSON.parse(
            zokrates.computeWitness(hashCompiled, [hashMe]).output)
        )
    }
```

[`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) actually runs the Zokrates program. It returns a structure with two fields: `output`, which is the output of the program as a JSON string, and `witness`, which is the information needed to create the a zero knowledge proof of the result. Here we just need the output.

```typescript
    // Dig and return a zero knowledge proof of the result
    // (server-side code)
```

The zero knowledge proof includes the public inputs (`x` and `y`) and results (hash of the map and number of bombs).

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

It's a problem to check if an index is out of bounds in Zokrates, so we do it here.

```typescript
        const runResults = zokrates.computeWitness(digCompiled, 
            [map, `${x}`, `${y}`]
        )
```

Execute the dig program.

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

Use [`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) and return the proof.


```typescript
    // Verify a dig's results (client-side code)
    const verifyDig = function(hashOfMap: string, digResultProof: any) : any {
```

Verify the dig results in TypeScript. We don't actually use this function, because we made a [conscious design choice](#where-verification) to verify onchain. It is provided here for completeness.

```typescript
        const hashInProof = "0x" + digResultProof.inputs.slice(2,-1)
            .map((x: string) => x.slice(-8)).reduce((a: string, b: string) => a+b)
```

The fields in the proofs (it's called `.input`, but it is both inputs and outputs) are provided as strings that contain 256-bit numbers in hexadecimal. The first two values are `x` and `y`. The last value is the number of bombs. We remove them because they aren't part of calculating the hash. Next, we remove all but the last eight hex digits (the ones that contain the 32-bit value we get from the hash function) of the hash values and put them together.

```typescript
        // The proof used the wrong map
        if (hashInProof != hashOfMap)
            return false
```

We could have compared the hashes in the Zokrates program, but we try to limit the use of Zokrates to where it is needed to save on resources. It is a lot cheaper to do the comparison in the TypeScript.

```typescript
        if (!zokrates.verify(verifierKey, digResultProof))
            return false
```

If the verification failed, this isn't a result we can trust. To reality check this function, create fake `digResultProof` values and see that the verification fails.

```typescript
        return {
            x: parseInt(digResultProof.inputs[0]),
            y: parseInt(digResultProof.inputs[1]),
            bombs: parseInt(digResultProof.inputs[digResultProof.inputs.length-1])
        }
    }
```

If the proof is trustworthy, return the `x`, `y`, and number of bombs (or 255 if we blew up).

```typescript
    const solidityVerifier = zokrates.exportSolidityVerifier(verifierKey)    
    const formatProof = (proof: any) => zokrates.utils.formatProof(proof)
```

These two definitions are used for verifiying Zokrates proofs on the blockchain.


```typescript
    return {
        zkDig,
        verifyDig,
        calculateMapHash,
        solidityVerifier,
        formatProof
    }
}
```

Finally, return everything that other code might need.

## The on-chain component {#onchain}

This is, 

#### 

## The server {#server}

The server needs to respond to these requests:

- New game. When a player requests to start a new game, the server creates a new map, stores it, and provides the player with the hash of the map.
- Dig. A dig request contains the hash of the map and the x and y coordinates. In response, the server may provide one of two things:
  - If there is no bomb in `(x,y)` the server provides the number of bombs around that location, as well as a zero-knowledge proof that verifies that there is a map with that hash has that number of bombs around that location.
  - If there is a bomb in the location the server provides a zero-knowledge proof, which sets the number of bombs to 255 (a special flag value that means "boom"), as well as the full map. The server also deletes the map as no longer needed.

### New game request {#new-game-request}

When the client requests a new game, 

### Dig request {#dig-request}

## The client {#client}

## Design considerations {#design}

### Creating the verifier and prover keys (#key-creation)

### Where to verify {#where-verification}

### Flatten the map in TypeScript or Zokrates? {#where-flatten}

## Conclusion: when is this the appropriate technique {#conclusion}
