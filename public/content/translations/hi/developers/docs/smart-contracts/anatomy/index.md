---
title: स्मार्ट अनुबंधों की संरचना
description: एक स्मार्ट संपर्क की संरचना में गहराई से देखें – फंक्शन, डेटा और वेरिएबल्स।
lang: hi
---

एक स्मार्ट अनुबंध एक प्रोग्राम है जो एथेरियम पर एक पते पर चलता है। वे डेटा और फंक्शंस से बने होते हैं जो लेनदेन प्राप्त करने पर निष्पादित हो सकते हैं। स्मार्ट अनुबंध क्या होता है, इसका अवलोकन यहां दिया गया है।

## आवश्यक शर्तें {#prerequisites}

सुनिश्चित करें कि आपने पहले [स्मार्ट अनुबंध](/developers/docs/smart-contracts/) के बारे में पढ़ा है। यह दस्तावेज़ मानता है कि आप JavaScript या Python जैसी प्रोग्रामिंग भाषाओं से पहले से ही परिचित हैं।

## डेटा {#data}

किसी भी अनुबंध डेटा को किसी स्थान पर असाइन किया जाना चाहिए: या तो `storage` या `memory` को। स्मार्ट अनुबंध में भंडारण को संशोधित करना महंगा है, इसलिए आपको यह विचार करने की आवश्यकता है कि आपका डेटा कहां रहना चाहिए।

### स्टोरेज {#storage}

लगातार डेटा को भंडारण के रूप में संदर्भित किया जाता है और इसे स्टेट वेरिएबल्स द्वारा दर्शाया जाता है। ये मान ब्लॉकचेन पर स्थायी रूप से संग्रहित हो जाते हैं। आपको प्रकार घोषित करने की आवश्यकता है ताकि अनुबंध इस बात पर नज़र रख सके कि संकलित होने पर ब्लॉकचेन पर उसे कितने भंडारण की आवश्यकता है।

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

यदि आपने पहले से ही ऑब्जेक्ट-ओरिएंटेड भाषाओं को प्रोग्राम किया है, तो आप संभवतः अधिकांश प्रकारों से परिचित होंगे। हालाँकि, यदि आप एथेरियम विकास में नए हैं, तो `address` आपके लिए नया होना चाहिए।

एक `address` प्रकार एक एथेरियम पता रख सकता है जो 20 बाइट्स या 160 बिट्स के बराबर होता है। यह हेक्साडेसिमल नोटेशन में अग्रणी 0x के साथ लौटता है।

अन्य प्रकारों में शामिल हैं:

- बूलियन
- पूर्णांक
- निश्चित बिंदु संख्याएँ
- निश्चित आकार की बाइट सरणियाँ
- गतिशील आकार की बाइट सरणियाँ
- तर्कसंगत और पूर्णांक अक्षर
- स्ट्रिंग अक्षर
- हेक्साडेसिमल अक्षर
- एनम्स

अधिक स्पष्टीकरण के लिए, दस्तावेज़ों पर एक नज़र डालें:

- [Vyper का प्रकार देखें](https://vyper.readthedocs.io/en/v0.1.0-beta.6/types.html#value-types)
- [Solidity का प्रकार देखें](https://solidity.readthedocs.io/en/latest/types.html#value-types)

### मेमोरी {#memory}

मान जो केवल अनुबंध फंक्शन के निष्पादन के जीवनकाल के लिए संग्रहित होते हैं, उन्हें मेमोरी वेरिएबल्स कहा जाता है। चूंकि ये ब्लॉकचेन पर स्थायी रूप से संग्रहित नहीं होते हैं, इसलिए इनका उपयोग करना बहुत सस्ता होता है।

EVM डेटा (भंडारण, मेमोरी और स्टैक) को [Solidity डॉक्स](https://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html?highlight=memory#storage-memory-and-the-stack) में कैसे स्टोर करता है, इसके बारे में और जानें।

### परिवेश वेरिएबल {#environment-variables}

आपके अनुबंध पर आपके द्वारा परिभाषित वेरिएबल्स के अलावा, कुछ विशेष वैश्विक वेरिएबल्स हैं। वे मुख्य रूप से ब्लॉकचेन या वर्तमान लेनदेन के बारे में जानकारी प्रदान करने के लिए उपयोग किए जाते हैं।

उदाहरण

| **प्रॉप**         | **स्टेट वेरिएबल** | **वर्णन**                     |
| ----------------- | ----------------- | ----------------------------- |
| `block.timestamp` | uint256           | वर्तमान ब्लॉक युग टाइमस्टैम्प |
| `msg.sender`      | पता               | संदेश का प्रेषक (वर्तमान कॉल) |

## फंक्शंस {#functions}

सबसे सरल शब्दों में, फंक्शंस आने वाले लेनदेन के जवाब में जानकारी प्राप्त कर सकते हैं या जानकारी सेट कर सकते हैं।

फंक्शन कॉल दो प्रकार के होते हैं:

- `internal` – ये EVM कॉल नहीं बनाते हैं
  - आंतरिक फंक्शंस और स्टेट वेरिएबल्स को केवल आंतरिक रूप से एक्सेस किया जा सकता है (यानी वर्तमान अनुबंध या इससे प्राप्त होने वाले अनुबंधों के भीतर)
- `external` – ये एक EVM कॉल बनाते हैं
  - बाहरी फंक्शंस अनुबंध इंटरफ़ेस का हिस्सा हैं, जिसका अर्थ है कि उन्हें अन्य अनुबंधों से और लेनदेन के माध्यम से कॉल किया जा सकता है। एक बाहरी फंक्शन `f` को आंतरिक रूप से कॉल नहीं किया जा सकता है (यानी `f()` काम नहीं करता है, लेकिन `this.f()` काम करता है)।

वे `public` या `private` भी हो सकते हैं

- `public` फंक्शंस को आंतरिक रूप से अनुबंध के भीतर से या बाहरी रूप से संदेशों के माध्यम से कॉल किया जा सकता है
- `private` फंक्शंस केवल उस अनुबंध के लिए दिखाई देते हैं जिसमें उन्हें परिभाषित किया गया है और व्युत्पन्न अनुबंधों में नहीं

दोनों फंक्शंस और स्टेट वेरिएबल्स को सार्वजनिक या निजी बनाया जा सकता है

अनुबंध पर एक स्टेट वेरिएबल्स को अपडेट करने के लिए एक फंक्शन यहां है:

```solidity
// Solidity example
function update_name(string value) public {
    dapp_name = value;
}
```

- प्रकार `string` का पैरामीटर `value` फंक्शन में पास किया जाता है: `update_name`
- इसे `public` घोषित किया गया है, जिसका अर्थ है कि कोई भी इसे एक्सेस कर सकता है
- यह घोषित `view` नहीं है, इसलिए यह अनुबंध की स्थिति को संशोधित कर सकता है

### फंक्शंस देखें {#view-functions}

ये फंक्शंस अनुबंध के डेटा की स्थिति को संशोधित नहीं करने का वादा करते हैं। सामान्य उदाहरण "गेटर" फंक्शंस हैं – उदाहरण के लिए आप इसका उपयोग यूज़र की शेष राशि प्राप्त करने के लिए कर सकते हैं।

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

संशोधित स्थिति क्या मानी जाती है:

1. स्टेट वेरिएबल्स के लिए लेखन।
2. [उत्सर्जक इवेंट्स](https://solidity.readthedocs.io/en/v0.7.0/contracts.html#events)।
3. [अन्य अनुबंध बनाना](https://solidity.readthedocs.io/en/v0.7.0/control-structures.html#creating-contracts)।
4. `आत्मविनाश` का उपयोग करना।
5. कॉल के माध्यम से ईथर भेजना।
6. किसी भी फंक्शन को कॉल करना जो `view` या `pure` चिह्नित नहीं है।
7. निम्न-स्तरीय कॉल का उपयोग करना।
8. इनलाइन असेंबली का उपयोग करना जिसमें कुछ ऑप्कोड होते हैं।

### कन्स्ट्रक्टर फंक्शंस {#constructor-functions}

`constructor` फंक्शंस केवल एक बार निष्पादित किए जाते हैं जब अनुबंध पहली बार परिनियोजित किया जाता है। कई वर्ग-आधारित प्रोग्रामिंग भाषाओं में `constructor` की तरह, ये फंक्शंस अक्सर स्टेट वेरिएबल्स को उनके निर्दिष्ट मानों में प्रारंभ करते हैं।

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

### बिल्ट-इन फंक्शंस {#built-in-functions}

आपके अनुबंध पर आपके द्वारा परिभाषित वेरिएबल्स और फंक्शंस के अलावा, कुछ विशेष बिल्ट-इन फंक्शंस हैं। सबसे स्पष्ट उदाहरण है:

- `address.send()` – Solidity
- `send(address)` – Vyper

ये अनुबंधों को ETH को अन्य खातों में भेजने की अनुमति देते हैं।

## लेखन फंक्शंस {#writing-functions}

आपका फंक्शन निम्न आवश्यक करता है:

- पैरामीटर वेरिएबल और प्रकार (यदि यह पैरामीटर स्वीकार करता है)
- internal/external की घोषणा
- pure/view/payable की घोषणा
- रिटर्न प्रकार (यदि यह मान लौटाता है)

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

एक पूर्ण अनुबंध कुछ इस तरह दिख सकता है। यहां `constructor` फंक्शन `dapp_name` वेरिएबल के लिए प्रारंभिक मान प्रदान करता है।

## इवेंट्स और लॉग {#events-and-logs}

इवेंट्स आपके स्मार्ट अनुबंध को आपके फ़्रंटएंड या अन्य सदस्यता लेने वाले एप्लिकेशन के साथ संवाद करने में सक्षम बनाते हैं। एक बार लेनदेन मान्य हो जाने और एक ब्लॉक में जोड़े जाने के बाद, स्मार्ट अनुबंध इवेंट्स का उत्सर्जन कर सकते हैं और जानकारी लॉग कर सकते हैं, जिसे फ्रंटएंड तब संसाधित और उपयोग कर सकता है।

## एनोटेट किए गए उदाहरण {#annotated-examples}

ये Solidity में लिखे गए कुछ उदाहरण हैं। यदि आप कोड के साथ खेलना चाहते हैं, तो आप उनके साथ [Remix](http://remix.ethereum.org) में इंटरैक्ट कर सकते हैं।

### हैलो वर्ल्ड {#hello-world}

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

### अद्वितीय डिजिटल संपत्ति {#unique-digital-asset}

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

## अग्रिम पठन {#further-reading}

स्मार्ट अनुबंधों के अधिक संपूर्ण अवलोकन के लिए Solidity और Vyper के प्रलेखन देखें:

- [Solidity](https://solidity.readthedocs.io/)
- [Vyper](https://vyper.readthedocs.io/)

## संबंधित विषय {#related-topics}

- [स्मार्ट अनुबंध](/developers/docs/smart-contracts/)
- [एथेरियम वर्चुअल मशीन](/developers/docs/evm/)

## संबंधित ट्यूटोरियल {#related-tutorials}

- [अनुबंध आकार सीमा से लड़ने के लिए अनुबंधों को छोटा करना](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– आपके स्मार्ट अनुबंध के आकार को कम करने के लिए कुछ व्यावहारिक सुझाव।_
- [इवेंट्स के साथ स्मार्ट अनुबंधों से डेटा लॉगिंग](/developers/tutorials/logging-events-smart-contracts/) _– स्मार्ट अनुबंध इवेंट्स का परिचय और आप डेटा लॉग करने के लिए उनका उपयोग कैसे कर सकते हैं।_
- [Solidity से अन्य अनुबंधों के साथ इंटरैक्ट करें](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– मौजूदा अनुबंध से स्मार्ट अनुबंध कैसे परिनियोजित करें और इसके साथ इंटरैक्ट करें।_
