---
title: Understanding the Yellow Paper's EVM Specifications
description: Understanding the part of the Yellow Paper, the formal specifications for Ethereum, that explains the Ethereum virtual machine (EVM).
author: "qbzzt"
tags: ["evm", "yellow paper", "specifications"]
skill: intermediate
lang: en
sidebar: true
published: 2022-05-15
---

[The Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) is the formal specification for Ethereum. Except where amended by [the EIP process](/eips/), it contains the exact description of how everything works. It is written as a mathematical paper, which includes terminology programmers may not find familiar. In this paper you learn how to read it, and by extension other related mathematical papers.

## Which Yellow Paper?

Like almost everything else in Ethereum, the Yellow Paper evolves over time. To be able to refer to a specific version, I uploaded [the current version at writing](yellow-paper-berlin.pdf). The section, page, and equation numbers I use will refer to that version. It is a good idea to have it open in a different window while reading this document.


### Why the EVM?

I am writing this a few months before [The Merge](/upgrades/merge). The Merge will significantly change the way blocks are handled, making that part of the current yellow paper of historical interest. On the other hand, the EVM is mostly unaffected by The Merge.

## 9 (Execution Model)

This section (p. 12-14) includes most of the definition of the EVM.

The term *system state* includes everything you need to know about the system to run it. In a typical computer, this means the memory, content of registers, etc.

A [Turing machine](https://en.wikipedia.org/wiki/Turing_machine) is a computational model. Essentially, it is a simplified version of a computer, which is proved to have the same ability to run computations that a normal computer can (everything that a computer can calculate a Turing machine can calculate and vice versa). This model makes it easier to prove various theorems about what is and what isn't comnputable.

The term [Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness) means a computer that can run the same calculations as a Turing machine.  Turing machines can get into infinite loops, and the EVM cannot because it would run out of gas, so it's only quasi-Turing-complete.

## 9.1 (Basics)

This section gives the basics of the EVM and how it compares with other computational models.

A [stack machine](https://en.wikipedia.org/wiki/Stack_machine) is a computer that stores intermediate data not in registers, but in a [stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)). Stack machine is the preferred architecture for virtual machines because it is easy to implement. This ease of implementation is especially important in the case of the EVM because it means that bugs, and security vulnerabilities, are a lot less likely. 

The memory is a byte array, which means every memory location is a single byte. This means that when you write a word (which is 256 bits) to memory it covers 32 (256/8) different memory locations. For example, if you execute this [Yul](https://docs.soliditylang.org/en/latest/yul.html) code:

```yul
mstore(0, 0x60A7)
```

It writes zeros to locations 0-29, 0x60 to 30, and 0xA7 to 31.

The [Von Neumann architecture](https://en.wikipedia.org/wiki/Von_Neumann_architecture) specifies that the program to be executed and the data which it processes are stored in the same memory. This is a bad idea from the security perspective because it allows program code to be modified, so the EVM never stores the currently running code in memory, it is always in a different memory that is ROM (read only memory). There are only two cases code that will be executed in the future comes from memory, in both cases because the code needs to come from a different piece of code, so it *has* to come from memory (or [storage](https://coinyuppie.com/in-depth-understanding-of-evm-storage-mechanism-and-security-issues/), but that would be too expensive).

- When a contract creates another contract (using [`CREATE`](https://www.evm.codes/#f0) or [`CREATE2`](https://www.evm.codes/#f5)), the code for the contract constructor comes from memory.
- During the creation of *any* contract, the constructor code runs and then returns with the code of the actual contract, also from memory.

The term exceptional execution means an exception that causes the execution of the current contract to halt. 


## 9.2 (Fees Overview)

This section explains how the gas fees are calculated. There are three costs:

### Opcode cost {#opcode-cost}

The inherent cost of the specific opcode. To get this value, find the cost group of the opcode in Appendix H (p. 28, under equation (327)), and find the cost group in equation (324). This gives you a cost function, which in most cases uses parameters from Appendix G (p. 27).
   
For example, the opcode [`CALLDATACOPY`](https://www.evm.codes/#37) is a member of group *W<sub>copy</sub>*. The opcode cost for that group is *G<sub>verylow</sub>+G<sub>copy</sub>×⌈μ<sub>s</sub>[2]÷32⌉*. Looking at Appendix G, we see that both constants are 3, which gives us *3+3×⌈μ<sub>s</sub>[2]÷32⌉*.
   
We still need to decipher the expression *⌈μ<sub>s</sub>[2]÷32⌉*. The outmost part, *⌈ \<value\> ⌉* is the ceiling function, a function that given a value returns the smallest integer that is still not smaller than the value. For example, *⌈2.5⌉ = ⌈3⌉ = 3*. The inner part is *μ<sub>s</sub>[2]÷32*. Looking at section 3 (Conventions) on p. 3, *μ* is the machine state. The machine state is defined in section 9.4.1 on p. 13. According to that section, one of the machine state parameters is *s* for the stack. Putting it all together, it seems that *μ<sub>s</sub>[2]* is location #2 in the stack. Looking at [the opcode](https://www.evm.codes/#37), location #2 in the stack is the size of the data in bytes. Looking at the other opcodes in group W<sub>copy</sub>, [`CODECOPY`](https://www.evm.codes/#39) and [`RETURNDATACOPY`](https://www.evm.codes/#3e), they also have a size of data in the same location. So *⌈μ<sub>s</sub>[2]÷32⌉* is the number of 32 byte words required to store the data being copied. Putting everything together, the inherent cost of [`CALLDATACOPY`](https://www.evm.codes/#37) is 3 gas plus 3 per word of data being copied.

### Running cost {#running-cost}

The cost of running the code we're calling.

   - In the case of [`CREATE`](https://www.evm.codes/#f0) and [`CREATE2`](https://www.evm.codes/#f5), the constructor for the new contract.
   - In the case of [`CALL`](https://www.evm.codes/#f1), [`CALLCODE`](https://www.evm.codes/#f2), [`STATICCALL`](https://www.evm.codes/#fa), or [`DELEGATECALL`](https://www.evm.codes/#f4), the contract we call.

### Expanding memory cost {#expanding-memory-cost}

The cost of expanding memory (if necessary). 

In equation 324, this value is written as *C<sub>mem</sub>(μ<sub>i</sub>')-C<sub>mem</sub>(μ<sub>i</sub>)*. Looking at section 9.4.1 again, we see that *μ<sub>i</sub>* is the number of words in memory. So *μ<sub>i</sub>* is the number of words in memory before the opcode and *μ<sub>i</sub>'* is the number of words in memory after the opcode. 
   
The function *C<sub>mem</sub>* is defined in equation 326: *C<sub>mem</sub>(a) = G<sub>memory</sub> × a + ⌊a<sup>2</sup> ÷ 512⌋*. *⌊x⌋* is the floor function, a function that given a value returns the largest integer that is still not larger than the value. For example, *⌊2.5⌋ = ⌊2⌋ = 2.* When *a < √512*, *a<sup>2</sup> < 512*, and the result of the floor function is zero. So for the first 22 words (704 bytes), the cost rises linearly with the number of memory words required. Beyond that point *⌊a<sup>2</sup> ÷ 512⌋* is positive. When the memory required is high enough the gas cost is proportional to the square of the amount of memory.
   
   
## 9.3 (Execution Environment)   

The execution environment is a tuple, *I*, that includes information that isn't part of the blockchain state or the EVM.

| Parameter | Opcode to access the data | Solidity code to access the data |
| - | - | - |
| *I<sub>a</sub>* |  [`ADDRESS`](https://www.evm.codes/#30)  | `address(this)`
| *I<sub>o</sub>* |  [`ORIGIN`](https://www.evm.codes/#32) | `tx.origin`
| *I<sub>p</sub>* |  [`GASPRICE`](https://www.evm.codes/#3a)  | `tx.gasprice`
| *I<sub>d</sub>* |  [`CALLDATALOAD`](https://www.evm.codes/#35), etc.  | `msg.data`
| *I<sub>s</sub>* |  [`CALLER`](https://www.evm.codes/#33)  | `msg.sender`
| *I<sub>v</sub>* |  [`CALLVALUE`](https://www.evm.codes/#34)  | `msg.value`
| *I<sub>b</sub>* |  [`CODECOPY`](https://www.evm.codes/#39)  | `address(this).code`
| *I<sub>H</sub>* |  Block header fields, such as [`NUMBER`](https://www.evm.codes/#43) and [`DIFFICULTY`](https://www.evm.codes/#44)  | `block.number`, `block.difficulty`, etc.
| *I<sub>e</sub>* |  Depth of the call stack for calls between contracts (including contract creation)
| *I<sub>w</sub>* |  Is the EVM allowed to change state, or is it running statically

A few other parameters are necessary to understand the rest of section 9:

| Parameter | Defined in section | Meaning |
| --- | - | - |
| *σ* |  2 (p. 2, equation 1) | The state of the blockchain 
| *g* | 9.3 (p. 13)           | Remaining gas
| *A* | 6.1 (p. 8)            | Accrued substate (changes scheduled for when the transaction ends)
| *o* | 9.3 (p. 13)           | Output - the returned result in the case of internal transaction (when one contract calls another) and calls to view functions (when you are just asking for information, so there is no need to wait for a transaction)




## 9.4 (Execution Overview) 

Now that have all the preliminaries, we can finally start working on how the EVM works.

Equations 137-142 give us the initial conditions for running the EVM:

| Symbol | Initial value | Meaning |
| - | - | - |
| *μ<sub>g</sub>*  | *g* | Gas remaining
| *μ<sub>pc</sub>* | *0* | Program counter, the address of the next instruction to execute
| *μ<sub>m</sub>*  | *(0, 0, ...)* | Memory, initialized to all zeros 
| *μ<sub>i</sub>*  | *0* | Highest memory location used 
| *μ<sub>s</sub>*  | *()* | The stack, initially empty
| *μ<sub>o</sub>*  | *∅*  | The output, empty set until and unless we stop either with return data ([`RETURN`](https://www.evm.codes/#f3) or [`REVERT`](https://www.evm.codes/#fd)) or without it ([`STOP`](https://www.evm.codes/#00) or [`SELFDESTRUCT`](https://www.evm.codes/#ff)). 
 
 
Equation 143 tells us there are four possible conditions at each point in time during execution, and what to do with them:

1. If *Z(σ,μ,A,I)*, it means that we have encountered an abnormal condition. In that case, the new state is identical to the old one (except gas gets burned)
2. If the opcode is [`REVERT`](https://www.evm.codes/#fd), the new state is the same as the old state, some gas is lost, and we have output to return.
3. If there is any output, (meaning we are at a [`RETURN`](https://www.evm.codes/#f3)), the state is the new state and returns the output.
4. If we aren't at one of the end conditions, continue running.


## 9.4.1 (Machine State)

This section explains the machine state in greater detail. It specifies that *w* is the current opcode.  If *μ<sub>pc</sub>* is less than *||I<sub>b</sub>||*, the length of the code, then that byte (*I<sub>b</sub>[μ<sub>pc</sub>]*) is the opcode. Otherwise, the opcode is defined as [`STOP`](https://www.evm.codes/#00).

As this is a [stack machine](https://en.wikipedia.org/wiki/Stack_machine), we need to keep track of the number of items popped out (*δ*) and pushed in (*α*) by each opcode.


## 9.4.2 (Exceptional Halting)

This section defines the *Z* function, which specifies when we have an abnormal termination. This is a [Boolean](https://en.wikipedia.org/wiki/Boolean_data_type) function, so it uses [*∨* for a logical or](https://en.wikipedia.org/wiki/Logical_disjunction) and [*∧* for a logical and](https://en.wikipedia.org/wiki/Logical_conjunction). 

We have an exceptional halt if any of these conditions is true:

- ***μ<sub>g</sub> < C(σ,μ,A,I)*** 
  As we saw in section 9.2, *C* is the function that specifies the gas cost. There isn't enough gas left to cover the next opcode.


- ***δ<sub>w</sub>=∅*** 
  If the number of items popped for an opcode is undefined, then the opcode itself is undefined.


- ***|| μ<sub>s</sub> || < δ<sub>w</sub>***
  Stack underflow, not enough items in the stack for the current opcode.


- ***w = JUMP ∧ μ<sub>s</sub>[0]∉D(I<sub>b</sub>)*** 
  The opcode is [`JUMP`](https://www.evm.codes/#56) and the address is not a [`JUMPDEST`](https://www.evm.codes/#5b). Jumps are *only* valid when the destination is a [`JUMPDEST`](https://www.evm.codes/#5b).


- ***w = JUMPI ∧ μ<sub>s</sub>[1]≠0 ∧ μ<sub>s</sub>[0] ∉ D(I<sub>b</sub>)***
  The opcode is [`JUMPI`](https://www.evm.codes/#57), the condition is true (non zero) so the jump should happen, and the address is not a [`JUMPDEST`](https://www.evm.codes/#5b). Jumps are *only* valid when the destination is a [`JUMPDEST`](https://www.evm.codes/#5b).


- ***w = RETURNDATACOPY ∧ μ<sub>s</sub>[1]+μ<sub>s</sub>[2]>|| μ<sub>o</sub> ||***
  The opcode is [`RETURNDATACOPY`](https://www.evm.codes/#3e). In this opcode stack element *μ<sub>s</sub>[1]* is the offset to read from in the return data buffer, and stack element *μ<sub>s</sub>[2]* is the length of data. This condition occurs when you try to read beyond the end of the return data buffer. Note that there isn't a similar condition for the calldata or for the code itself. When you try to read beyond the end of those buffers you just get zeros.
  

- ***|| μ<sub>s</sub> || - δ<sub>w</sub> + α<sub>w</sub> > 1024***

  Stack overflow. If running the opcode will result in a stack of over 1024 items, abort.
 
- ***¬I<sub>w</sub> ∧ W(w,μ)*** 
  Are we running statically ([¬ is negation](https://en.wikipedia.org/wiki/Negation) and *I<sub>w</sub>* is true when we are allowed to change the blockchain state)? If so, and we're trying a state changing operation, it can't happen.
  
  The function *W(w,μ)* is defined later in equation 150. *W(w,μ)* is true if one of these conditions is true: 
  - ***w ∈ {CREATE, CREATE2, SSTORE, SELFDESTRUCT}***
    These opcodes change the state, either by creating a new contract, storing a value, or destroying the current contract.
  
  
  - ***LOG0≤w ∧ w≤LOG4***
    If we are called statically we cannot emit log entries.
    The log opcodes are all in the range between [`LOG0` (A0)](https://www.evm.codes/#a0) and [`LOG4` (A4)](https://www.evm.codes/#a4).
    The number after the log opcode specifies how many topics the log entry contains.
    
  - ***w=CALL ∧ μ<sub>s</sub>[2]≠0***
    You can call another contract when you're static, but if you do you cannot transfer ETH to it. 
    

- ***w = SSTORE ∧ μ<sub>g</sub> ≤ G<sub>callstipend</sub>***
  You cannot run [`SSTORE`](https://www.evm.codes/#55) unless you have more than G<sub>callstipend</sub> (defined as 2300 in Appendix G) gas.



## 9.4.3 (Jump Destination Validity)

Here we formally define what are the [`JUMPDEST`](https://www.evm.codes/#5b) opcodes. We cannot just look for byte value 0x5B, because it might be inside a PUSH (and therefore data and not an opcode).

In equation (153) we define a function, *N(i,w)*. The first parameter, *i*, is the opcode's location. The second, *w*, is the opcode itself. If *w∈[PUSH1, PUSH32]* that means the opcode is a PUSH (square brackets define a range that includes the endpoints). If that case the next opcode is at *i+2+(w−PUSH1)*. For [`PUSH1`](https://www.evm.codes/#60) we need to advance by two bytes (the PUSH itself and the one byte value), for [`PUSH2`](https://www.evm.codes/#61) we need to advance by three bytes because it's a two byte value, etc. All other EVM opcodes are just one byte long, so in all other cases *N(i,w)=i+1*.

This function is used in equation (152) to define *D<sub>J</sub>(c,i)*, which is the [set](https://en.wikipedia.org/wiki/Set_(mathematics)) of all valid jump destinations in code *c*, starting with opcode location *i*. This function is defined recursively. If *i≥||c||*, that means that we're at or after the end of the code. We are not going to find any more jump destinations, so just return the empty set.

In all other cases we look at the rest of the code by going to the next opcode and getting the set starting from it. *c[i]* is the current opcode, so *N(i,c[i])* is the location of the next opcode. *D<sub>J</sub>(c,N(i,c[i]))* is therefore the set of valid jump destinations that starts at the next opcode. If the current opcode isn't a `JUMPDEST`, just return that set. If it is `JUMPDEST`, include it in the result set and return that.


## 9.4.4 (Normal Halting)

The halting function *H*, can return three types of values.

- If we aren't in a halt opcode, return *∅*, the empty set. By convention, this value is interpreted as Boolean false.
  
- If we have a halt opcode that doesn't produce output (either [`STOP`](https://www.evm.codes/#00) or [`SELFDESTRUCT`](https://www.evm.codes/#ff)), return a sequence of size zero bytes as the return value. Note that this is very different from the empty set. This value means that the EVM really did halt, just there's no return data to read.
  
- If we have a halt opcode that does produce output (either [`RETURN`](https://www.evm.codes/#f3) or [`REVERT`](https://www.evm.codes/#fd)), return the sequence of bytes specified by that opcode. This sequence is taken from memory, the value at the top of the stack (*μ<sub>s</sub>[0]*) is the first byte, and the value after it (*μ<sub>s</sub>[1]*) is the length.
  

## H.2 (Instruction Set)

Before we go to the final subsection of the EVM, 9.5, let's look at the instructions themselves. They are defined in Appendix H.2 which starts on p. 29. Anything that is not specified as changing with that specific opcode is expected to stay the same. Variables that do change are specified with as \<something\>′.
   
For example, let's look at the [`ADD`](https://www.evm.codes/#01) opcode.    

  
| Value | Mnemonic | δ | α | Description |
| ----: | -------- | - | - | ----------- |
| 0x01  | ADD      | 2 | 1 | Addition operation. 
||||| *μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[0] + μ<sub>s</sub>[1]*

*δ* is the number of values we pop from the stack. In this case two, because we are adding the top two values.

*α* is the number of values we push back. In this case one, the sum.

So the new stack top (*μ′<sub>s</sub>[0]*) is the sum of the old stack top (*μ<sub>s</sub>[0]*) and the old value below it (*μ<sub>s</sub>[1]*).

Instead of going over all the opcodes with an "eyes glaze over list", This article explains only those opcodes that introduce something new.


| Value | Mnemonic  | δ | α | Description |
| ----: | --------- | - | - | ----------- |
| 0x20  | KECCAK256 | 2 | 1 | Compute Keccak-256 hash.
||||| *μ′<sub>s</sub>[0] ≡ KEC(μ<sub>m</sub>[μ<sub>s</sub>[0] . . . (μ<sub>s</sub>[0] + μ<sub>s</sub>[1] − 1)])*
||||| *μ′<sub>i</sub> ≡ M(μ<sub>i</sub>,μ<sub>s</sub>[0],μ<sub>s</sub>[1])*

This is the first opcode that accesses memory (in this case, read only). However, it might expand beyond the current limits of the memory, so we need to update *μ<sub>i</sub>.* We do this using the *M* function defined in equation 328 on p. 29.



| Value | Mnemonic  | δ | α | Description |
| ----: | --------- | - | - | ----------- |
| 0x31  | BALANCE   | 1 | 1 | Get balance of the given account.
||||| ...

The address whose balance we need to find is *μ<sub>s</sub>[0] mod 2<sup>160</sup>*. The top of the stack is the address, but because addresses are only 160 bits, we calculate the value [modulo](https://en.wikipedia.org/wiki/Modulo_operation) 2<sup>160</sup>.

If *σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] ≠ ∅*, it means that there is information about this address. In that case, *σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>]<sub>b</sub>* is the balance for that address. If *σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] = ∅*, it means that this address is uninitialized and the balance is zero. You can see the list of account information fields in section 4.1 on p. 4. 

The second equation, *A'<sub>a</sub> ≡ A<sub>a</sub> ∪ {μ<sub>s</sub>[0] mod 2<sup>160</sup>}*, is related to the difference in cost between access to warm storage (storage that has recently been accessed and is likely to be cached) and cold storage (storage that hasn't been accessed and is likely to be in slower storage that is more expensive to retrieve). *A<sub>a</sub>* is the list of addresses previously accessed by the transaction, which should therefore be cheaper to access, as defined in section 6.1 on p. 8. You can read more about this subject in [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929).


| Value | Mnemonic  | δ  | α  | Description |
| ----: | --------- | -- | -- | ----------- |
| 0x8F  | DUP16     | 16 | 17 | Duplicate 16th stack item.
||||| *μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[15]*

Note that to use any stack item, we need to pop it, which means we also need to pop all the stack items on top of it. In the case of [`DUP<n>`](https://www.evm.codes/#8f) and [`SWAP<n>`](https://www.evm.codes/#9f), this means having to pop and then push up to sixteen values.


## 9.5 (The Execution Cycle)

Now that we have all the parts, we can finally understand how the execution cycle of the EVM is documented.

Equation (155) says that given the state:

- *σ* (global blockchain state) 
- *μ* (EVM state)
- *A* (substate, changes to happen when the transaction ends)
- *I* (execution environment)

The new state is *(σ', μ', A', I')*.

Equations (156)-(158) define the stack and the change in it due to an opcode (*μ<sub>s</sub>*). Equation (159) is the change in gas (*μ<sub>g</sub>*). Equation (160) is the change in the program counter (*μ<sub>pc</sub>*). Finally, equations (161)-(164) specify that the other parameters stay the same, unless explicitly changed by the opcode.

With this the EVM is fully defined.

## Conclusion

Mathematical notation is precise and has allowed the Yellow Paper to specify every detail of Ethereum. However, it does have some drawbacks:

- It can only be understood by humans, which means that [compliance tests](https://github.com/ethereum/tests) must be written manually.
- Programmers understand computer code.
  They may or may not understand mathematical notation.
  
Maybe for these reasons, the newer [consensus layer specs](https://github.com/ethereum/consensus-specs/blob/dev/tests/core/pyspec/README.md) are written in Python. However, until and unless the Yellow Paper is also translated to Python or a similar language, the Yellow Paper will continue in service, and it is helpful to be able to read it.
