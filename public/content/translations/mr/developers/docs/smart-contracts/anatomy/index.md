---
title: "स्मार्ट करारांची रचना"
description: "स्मार्ट कराराच्या रचनेचा सखोल अभ्यास – फंक्शन्स, डेटा आणि व्हेरिएबल्स."
lang: mr
---

स्मार्ट करार हा एक प्रोग्राम आहे जो Ethereum वरील एका पत्त्यावर (address) चालतो. ते डेटा आणि फंक्शन्सचे बनलेले असतात जे व्यवहार (transaction) प्राप्त झाल्यावर कार्यान्वित होऊ शकतात. स्मार्ट करार कशाने बनलेला आहे याचा आढावा येथे आहे.

## पूर्वतयारी {#prerequisites}

आपण प्रथम [स्मार्ट करार](/developers/docs/smart-contracts/) बद्दल वाचले असल्याची खात्री करा. हा दस्तऐवज असे गृहीत धरतो की आपण आधीच JavaScript किंवा Python सारख्या प्रोग्रामिंग भाषांशी परिचित आहात.

## डेटा {#data}

कोणताही करार डेटा एका स्थानावर नियुक्त करणे आवश्यक आहे: एकतर `storage` किंवा `memory` मध्ये. स्मार्ट करारामध्ये स्टोरेजमध्ये बदल करणे महाग आहे, त्यामुळे तुमचा डेटा कोठे राहावा याचा विचार करणे आवश्यक आहे.

### स्टोरेज {#storage}

पर्सिस्टंट डेटाला स्टोरेज म्हणून संबोधले जाते आणि ते स्टेट व्हेरिएबल्सद्वारे दर्शविले जाते. ही मूल्ये कायमस्वरूपी ब्लॉकचेनवर संग्रहित केली जातात. तुम्ही प्रकार घोषित करणे आवश्यक आहे जेणेकरून करार संकलित (compile) झाल्यावर त्याला ब्लॉकचेनवर किती स्टोरेजची आवश्यकता आहे याचा मागोवा ठेवू शकेल.

```solidity
// Solidity example
contract SimpleStorage {
    uint storedData; // State variable
    // ...
}
```

```python
# Vyper example
storedData: int128
```

जर तुम्ही आधीच ऑब्जेक्ट-ओरिएंटेड भाषा प्रोग्राम केल्या असतील, तर तुम्ही बहुतांश प्रकारांशी परिचित असाल. तथापि, जर तुम्ही Ethereum विकासासाठी नवीन असाल तर `address` तुमच्यासाठी नवीन असावा.

एक `address` प्रकार Ethereum पत्ता धारण करू शकतो जो 20 बाइट्स किंवा 160 बिट्सच्या समान असतो. हे अग्रगण्य 0x सह हेक्साडेसिमल नोटेशनमध्ये परत येते.

इतर प्रकारांमध्ये हे समाविष्ट आहे:

- बुलियन
- पूर्णांक
- फिक्स्ड पॉइंट नंबर्स
- निश्चित-आकाराचे बाइट अॅरे
- डायनॅमिक आकाराचे बाइट अॅरे
- रेशनल आणि पूर्णांक लिटरल्स
- स्ट्रिंग लिटरल्स
- हेक्साडेसिमल लिटरल्स
- एनम्स

अधिक स्पष्टीकरणासाठी, डॉक्सवर एक नजर टाका:

- [Vyper प्रकार पहा](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Solidity प्रकार पहा](https://docs.soliditylang.org/en/latest/types.html#value-types)

### मेमरी {#memory}

जी मूल्ये केवळ करार फंक्शनच्या अंमलबजावणीच्या जीवनकाळासाठी संग्रहित केली जातात त्यांना मेमरी व्हेरिएबल्स म्हणतात. हे ब्लॉकचेनवर कायमस्वरूपी संग्रहित नसल्यामुळे, ते वापरण्यासाठी खूप स्वस्त आहेत.

EVM डेटा (स्टोरेज, मेमरी आणि स्टॅक) कसे संग्रहित करते याबद्दल [Solidity डॉक्स](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack) मध्ये अधिक जाणून घ्या.

### एनव्हायरनमेंट व्हेरिएबल्स {#environment-variables}

आपण आपल्या करारावर परिभाषित केलेल्या व्हेरिएबल्सव्यतिरिक्त, काही विशेष ग्लोबल व्हेरिएबल्स आहेत. ते प्रामुख्याने ब्लॉकचेन किंवा सध्याच्या व्यवहाराबद्दल माहिती प्रदान करण्यासाठी वापरले जातात.

उदाहरणे:

| **प्रॉप**         | **स्टेट व्हेरिएबल** | **वर्णन**                                     |
| ----------------- | ------------------- | --------------------------------------------- |
| `block.timestamp` | uint256             | सध्याचा ब्लॉक इपॉक टाइमस्टॅम्प                |
| `msg.sender`      | पत्ता               | संदेशाचा प्रेषक (चालू कॉल) |

## फंक्शन्स {#functions}

अत्यंत सोप्या भाषेत सांगायचे झाल्यास, फंक्शन्स येणाऱ्या व्यवहारांना प्रतिसाद म्हणून माहिती मिळवू शकतात किंवा सेट करू शकतात.

फंक्शन कॉलचे दोन प्रकार आहेत:

- `internal` – हे EVM कॉल तयार करत नाहीत
  - अंतर्गत फंक्शन्स आणि स्टेट व्हेरिएबल्सना फक्त अंतर्गतच प्रवेश केला जाऊ शकतो (म्हणजे, चालू करारातून किंवा त्यातून मिळवलेल्या करारांमधून)
- `external` – हे EVM कॉल तयार करतात
  - बाह्य फंक्शन्स करार इंटरफेसचा भाग आहेत, याचा अर्थ ते इतर करारांमधून आणि व्यवहारांद्वारे कॉल केले जाऊ शकतात. एक बाह्य फंक्शन `f` अंतर्गत कॉल केले जाऊ शकत नाही (म्हणजे, `f()` कार्य करत नाही, परंतु `this.f()` कार्य करते).

ते `public` किंवा `private` देखील असू शकतात

- `public` फंक्शन्स कराराच्या आतून अंतर्गत किंवा संदेशांद्वारे बाह्यरित्या कॉल केले जाऊ शकतात
- `private` फंक्शन्स फक्त त्या करारासाठी दिसतात ज्यात ते परिभाषित केले आहेत आणि व्युत्पन्न करारांमध्ये नाहीत

फंक्शन्स आणि स्टेट व्हेरिएबल्स दोन्ही सार्वजनिक किंवा खाजगी केले जाऊ शकतात

करारावरील स्टेट व्हेरिएबल अपडेट करण्यासाठी येथे एक फंक्शन आहे:

```solidity
// Solidity example
function update_name(string value) public {
    dapp_name = value;
}
```

- `string` प्रकारचा पॅरामीटर `value` फंक्शनमध्ये पास केला जातो: `update_name`
- हे `सार्वजनिक` म्हणून घोषित केले आहे, म्हणजे कोणीही त्यात प्रवेश करू शकतो
- हे `व्ह्यू` म्हणून घोषित केलेले नाही, त्यामुळे ते कराराची स्थिती सुधारित करू शकते

### व्ह्यू फंक्शन्स {#view-functions}

ही फंक्शन्स कराराच्या डेटाच्या स्थितीमध्ये बदल न करण्याचे वचन देतात. सामान्य उदाहरणे म्हणजे "गेटर" फंक्शन्स – उदाहरणार्थ, तुम्ही याचा वापर वापरकर्त्याची शिल्लक मिळवण्यासाठी करू शकता.

```solidity
// Solidity example
function balanceOf(address _owner) public view returns (uint256 _balance) {
    return ownerPizzaCount[_owner];
}
```

```python
dappName: public(string)

@view
@public
def readName() -> string:
  return dappName
```

स्टेट सुधारित करणे म्हणजे काय:

1. स्टेट व्हेरिएबल्समध्ये लिहिणे.
2. [इव्हेंट्स एमिट करणे](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [इतर करार तयार करणे](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. `selfdestruct` वापरणे.
5. कॉलद्वारे इथर पाठवणे.
6. `व्ह्यू` किंवा `प्युअर` म्हणून चिन्हांकित नसलेले कोणतेही फंक्शन कॉल करणे.
7. लो-लेव्हल कॉल्स वापरणे.
8. विशिष्ट ऑपकोड असलेले इनलाइन असेंब्ली वापरणे.

### कन्स्ट्रक्टर फंक्शन्स {#constructor-functions}

`constructor` फंक्शन्स फक्त एकदाच कार्यान्वित होतात जेव्हा करार प्रथम तैनात केला जातो. अनेक वर्ग-आधारित प्रोग्रामिंग भाषांमधील `कन्स्ट्रक्टर` प्रमाणे, ही फंक्शन्स अनेकदा स्टेट व्हेरिएबल्सना त्यांच्या निर्दिष्ट मूल्यांमध्ये सुरू करतात.

```solidity
// Solidity example
// Initializes the contract's data, setting the `owner`
// to the address of the contract creator.
constructor() public {
    // All smart contracts rely on external transactions to trigger its functions.
    // `msg` is a global variable that includes relevant data on the given transaction,
    // such as the address of the sender and the ETH value included in the transaction.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Vyper example

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### अंगभूत फंक्शन्स {#built-in-functions}

आपण आपल्या करारावर परिभाषित केलेल्या व्हेरिएबल्स आणि फंक्शन्स व्यतिरिक्त, काही विशेष अंगभूत फंक्शन्स आहेत. सर्वात स्पष्ट उदाहरण आहे:

- `address.send()` – Solidity
- `send(address)` – Vyper

हे करारांना इतर खात्यांवर ETH पाठविण्याची परवानगी देतात.

## फंक्शन्स लिहिणे {#writing-functions}

तुमच्या फंक्शनला आवश्यक आहे:

- पॅरामीटर व्हेरिएबल आणि प्रकार (जर ते पॅरामीटर्स स्वीकारत असेल तर)
- अंतर्गत/बाह्य ची घोषणा
- प्युअर/व्ह्यू/पेएबल ची घोषणा
- रिटर्न्स प्रकार (जर ते मूल्य परत करत असेल तर)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // state variable

    // Called when the contract is deployed and initializes the value
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Get Function
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Set Function
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

एक संपूर्ण करार काहीसा असा दिसू शकतो. येथे `कन्स्ट्रक्टर` फंक्शन `dapp_name` व्हेरिएबलसाठी प्रारंभिक मूल्य प्रदान करते.

## इव्हेंट्स आणि लॉग {#events-and-logs}

इव्हेंट्स तुमच्या स्मार्ट कराराला तुमच्या फ्रंटएंड किंवा इतर सदस्यत्व घेतलेल्या ॲप्लिकेशन्ससह संवाद साधण्यास सक्षम करतात. एकदा व्यवहार प्रमाणित झाल्यावर आणि ब्लॉकमध्ये जोडला गेल्यावर, स्मार्ट करार इव्हेंट एमिट करू शकतात आणि माहिती लॉग करू शकतात, ज्यावर फ्रंटएंड नंतर प्रक्रिया आणि उपयोग करू शकतो.

## भाष्य केलेली उदाहरणे {#annotated-examples}

ही Solidity मध्ये लिहिलेली काही उदाहरणे आहेत. तुम्हाला कोडसोबत खेळायचे असल्यास, तुम्ही [Remix](http://remix.ethereum.org) मध्ये त्यांच्याशी संवाद साधू शकता.

### हॅलो वर्ल्ड {#hello-world}

```solidity
// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state).
// Once deployed, a contract resides at a specific address on the Ethereum blockchain.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Declares a state variable `message` of type `string`.
    // State variables are variables whose values are permanently stored in contract storage.
    // The keyword `public` makes variables accessible from outside a contract
    // and creates a function that other contracts or clients can call to access the value.
    string public message;

    // Similar to many class-based object-oriented languages, a constructor is
    // a special function that is only executed upon contract creation.
    // Constructors are used to initialize the contract's data.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Accepts a string argument `initMessage` and sets the value
        // into the contract's `message` storage variable).
        message = initMessage;
    }

    // A public function that accepts a string argument
    // and updates the `message` storage variable.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### टोकन {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // An `address` is comparable to an email address - it's used to identify an account on Ethereum.
    // Addresses can represent a smart contract or an external (user) accounts.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // A `mapping` is essentially a hash table data structure.
    // This `mapping` assigns an unsigned integer (the token balance) to an address (the token holder).
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Events allow for logging of activity on the blockchain.
    // Ethereum clients can listen for events in order to react to contract state changes.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Initializes the contract's data, setting the `owner`
    // to the address of the contract creator.
    constructor() public {
        // All smart contracts rely on external transactions to trigger its functions.
        // `msg` is a global variable that includes relevant data on the given transaction,
        // such as the address of the sender and the ETH value included in the transaction.
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Creates an amount of new tokens and sends them to an address.
    function mint(address receiver, uint amount) public {
        // `require` is a control structure used to enforce certain conditions.
        // If a `require` statement evaluates to `false`, an exception is triggered,
        // which reverts all changes made to the state during the current call.
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Only the contract owner can call this function
        require(msg.sender == owner, "You are not the owner.");

        // Enforces a maximum amount of tokens
        require(amount < 1e60, "Maximum issuance exceeded");

        // Increases the balance of `receiver` by `amount`
        balances[receiver] += amount;
    }

    // Sends an amount of existing tokens from any caller to an address.
    function transfer(address receiver, uint amount) public {
        // The sender must have enough tokens to send
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // Adjusts token balances of the two addresses
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Emits the event defined earlier
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### युनिक डिजिटल मालमत्ता {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Imports symbols from other files into the current contract.
// In this case, a series of helper contracts from OpenZeppelin.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// The `is` keyword is used to inherit functions and keywords from external contracts.
// In this case, `CryptoPizza` inherits from the `IERC721` and `ERC165` contracts.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Uses OpenZeppelin's SafeMath library to perform arithmetic operations safely.
    // Learn more: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Constant state variables in Solidity are similar to other languages
    // but you must assign from an expression which is constant at compile time.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Struct types let you define your own type
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Creates an empty array of Pizza structs
    Pizza[] public pizzas;

    // Mapping from pizza ID to its owner's address
    mapping(uint256 => address) public pizzaToOwner;

    // Mapping from owner's address to number of owned token
    mapping(address => uint256) public ownerPizzaCount;

    // Mapping from token ID to approved address
    mapping(uint256 => address) pizzaApprovals;

    // You can nest mappings, this example maps owner to operator approvals
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Internal function to create a random Pizza from string (name) and DNA
    function _createPizza(string memory _name, uint256 _dna)
        // The `internal` keyword means this function is only visible
        // within this contract and contracts that derive this contract
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` is a function modifier that checks if the pizza already exists
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Adds Pizza to array of Pizzas and get id
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Checks that Pizza owner is the same as current user
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // note that address(0) is the zero address,
        // indicating that pizza[id] is not yet allocated to a particular user.

        assert(pizzaToOwner[id] == address(0));

        // Maps the Pizza to the owner
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Creates a random Pizza from string (name)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Generates random DNA from string (name) and address of the owner (creator)
    function generateRandomDna(string memory _str, address _owner)
        public
        // Functions marked as `pure` promise not to read from or modify the state
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Generates random uint from string (name) + address (owner)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Returns array of Pizzas found by owner
    function getPizzasByOwner(address _owner)
        public
        // Functions marked as `view` promise not to modify state
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Uses the `memory` storage location to store values only for the
        // lifecycle of this function call.
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
        uint256[] memory result = new uint256[](ownerPizzaCount[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (pizzaToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    // Transfers Pizza and ownership to other address
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Emits event defined in the imported IERC721 contract
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Safely transfers the ownership of a given token ID to another address
     * If the target address is a contract, it must implement `onERC721Received`,
     * which is called upon a safe transfer, and return the magic value
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * otherwise, the transfer is reverted.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * Safely transfers the ownership of a given token ID to another address
     * If the target address is a contract, it must implement `onERC721Received`,
     * which is called upon a safe transfer, and return the magic value
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * otherwise, the transfer is reverted.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Must implement onERC721Received.");
    }

    /**
     * Internal function to invoke `onERC721Received` on a target address
     * The call is not executed if the target address is not a contract
     */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) internal returns (bool) {
        if (!isContract(to)) {
            return true;
        }

        bytes4 retval = IERC721Receiver(to).onERC721Received(
            msg.sender,
            from,
            pizzaId,
            _data
        );
        return (retval == _ERC721_RECEIVED);
    }

    // Burns a Pizza - destroys Token completely
    // The `external` function modifier means this function is
    // part of the contract interface and other contracts can call it
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[msg.sender] = SafeMath.sub(
            ownerPizzaCount[msg.sender],
            1
        );
        pizzaToOwner[_pizzaId] = address(0);
    }

    // Returns count of Pizzas by address
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Returns owner of the Pizza found by id
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // Approves other address to transfer ownership of Pizza
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Returns approved address for specific Pizza
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Private function to clear current approval of a given token ID
     * Reverts if the given address is not indeed the owner of the token
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Sets or unsets the approval of a given operator
     * An operator is allowed to transfer all tokens of the sender on their behalf
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Tells whether an operator is approved by a given owner
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Takes ownership of Pizza - only for approved users
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Checks if Pizza exists
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Checks if address is owner or is approved to transfer Pizza
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Disable solium check because of
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // Check if Pizza is unique and doesn't exist yet
    modifier isUnique(string memory _name, uint256 _dna) {
        bool result = true;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (
                keccak256(abi.encodePacked(pizzas[i].name)) ==
                keccak256(abi.encodePacked(_name)) &&
                pizzas[i].dna == _dna
            ) {
                result = false;
            }
        }
        require(result, "Pizza with such name already exists.");
        _;
    }

    // Returns whether the target address is a contract
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Currently there is no better way to check if there is a contract in an address
        // than to check the size of the code at that address.
        // See https://ethereum.stackexchange.com/a/14016/36603
        // for more details about how this works.
        // TODO Check this again before the Serenity release, because all addresses will be
        // contracts then.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## पुढील वाचन {#further-reading}

स्मार्ट करारांच्या अधिक संपूर्ण विहंगावलोकनासाठी Solidity आणि Vyper चे दस्तऐवजीकरण पहा:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## संबंधित विषय {#related-topics}

- [स्मार्ट कॉन्ट्रॅक्ट्स](/developers/docs/smart-contracts/)
- [Ethereum व्हर्च्युअल मशीन](/developers/docs/evm/)

## संबंधित ट्युटोरियल्स {#related-tutorials}

- [करार आकार मर्यादेशी लढण्यासाठी करार कमी करणे](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– तुमच्या स्मार्ट कराराचा आकार कमी करण्यासाठी काही व्यावहारिक टिप्स._
- [इव्हेंटसह स्मार्ट करारांमधून डेटा लॉग करणे](/developers/tutorials/logging-events-smart-contracts/) _– स्मार्ट करार इव्हेंटची ओळख आणि डेटा लॉग करण्यासाठी तुम्ही त्यांचा कसा वापर करू शकता._
- [Solidity वरून इतर करारांशी संवाद साधा](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– विद्यमान करारातून स्मार्ट करार कसा तैनात करायचा आणि त्याच्याशी संवाद कसा साधायचा._
