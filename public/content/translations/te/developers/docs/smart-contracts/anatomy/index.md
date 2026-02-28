---
title: "స్మార్ట్ కాంట్రాక్టుల నిర్మాణం"
description: "స్మార్ట్ కాంట్రాక్ట్ నిర్మాణంపై లోతైన పరిశీలన - విధులు, డేటా మరియు వేరియబుల్స్."
lang: te
---

స్మార్ట్ కాంట్రాక్ట్ అనేది ఇతీరియములోని ఒక చిరునామాలో నడిచే ఒక ప్రోగ్రామ్. అవి లావాదేవీని స్వీకరించిన తర్వాత అమలు చేయగల డేటా మరియు ఫంక్షన్లతో రూపొందించబడ్డాయి. స్మార్ట్ కాంట్రాక్ట్‌ను రూపొందించే దాని యొక్క అవలోకనం ఇక్కడ ఉంది.

## అవసరాలు {#prerequisites}

ముందుగా మీరు [స్మార్ట్ కాంట్రాక్టుల](/developers/docs/smart-contracts/) గురించి చదివారని నిర్ధారించుకోండి. ఈ డాక్యుమెంట్ మీరు ఇప్పటికే జావాస్క్రిప్ట్ లేదా పైథాన్ వంటి ప్రోగ్రామింగ్ భాషలతో సుపరిచితులని భావిస్తుంది.

## డేటా {#data}

ఏదైనా కాంట్రాక్ట్ డేటాను ఒక ప్రదేశానికి కేటాయించాలి: `storage` లేదా `memory`. స్మార్ట్ కాంట్రాక్ట్‌లో స్టోరేజీని సవరించడం ఖర్చుతో కూడుకున్నది, కనుక మీ డేటా ఎక్కడ ఉండాలో మీరు పరిగణించాలి.

### నిల్వ {#storage}

శాశ్వత డేటాను స్టోరేజ్ అని పిలుస్తారు మరియు ఇది స్టేట్ వేరియబుల్స్ ద్వారా సూచించబడుతుంది. ఈ విలువలు బ్లాక్ చైనులో శాశ్వతంగా నిల్వ చేయబడతాయి. మీరు రకాన్ని ప్రకటించాలి, తద్వారా కాంట్రాక్ట్ కంపైల్ అయినప్పుడు బ్లాక్‌చైన్‌లో ఎంత స్టోరేజ్ అవసరమో ట్రాక్ చేయగలదు.

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

మీరు ఇప్పటికే ఆబ్జెక్ట్-ఓరియెంటెడ్ భాషలను ప్రోగ్రామ్ చేసి ఉంటే, మీరు చాలా రకాలతో సుపరిచితులుగా ఉండే అవకాశం ఉంది. అయితే, మీరు Ethereum డెవలప్‌మెంట్‌కు కొత్త అయితే `address` మీకు కొత్తగా ఉండాలి.

ఒక `address` రకం 20 బైట్లు లేదా 160 బిట్‌లకు సమానమైన Ethereum చిరునామాను కలిగి ఉంటుంది. ఇది ప్రముఖ 0xతో హెక్సాడెసిమల్ సంజ్ఞామానంలో తిరిగి వస్తుంది.

ఇతర రకాలు:

- బూలియన్
- పూర్ణాంకం
- ఫిక్స్డ్ పాయింట్ సంఖ్యలు
- ఫిక్స్డ్-సైజ్ బైట్ అర్రేలు
- డైనమిక్‌గా పరిమాణంలో ఉండే బైట్ శ్రేణులు
- రేషనల్ మరియు పూర్ణాంక లిటరల్స్
- స్ట్రింగ్ లిటరల్స్
- హెక్సాడెసిమల్ లిటరల్స్
- ఎన్యుమ్స్

మరింత వివరణ కోసం, డాక్స్ చూడండి:

- [వైపర్ రకాలను చూడండి](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [సొలిడిటీ రకాలను చూడండి](https://docs.soliditylang.org/en/latest/types.html#value-types)

### మెమరీ {#memory}

కాంట్రాక్ట్ ఫంక్షన్ ఎగ్జిక్యూషన్ యొక్క జీవితకాలం కోసం మాత్రమే నిల్వ చేయబడిన విలువలను మెమరీ వేరియబుల్స్ అంటారు. ఇవి బ్లాక్‌చైన్‌లో శాశ్వతంగా నిల్వ చేయబడవు కాబట్టి, వాటిని ఉపయోగించడం చాలా చౌక.

[సొలిడిటీ డాక్స్‌](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack)లో EVM డేటాను (స్టోరేజ్, మెమరీ మరియు స్టాక్) ఎలా నిల్వ చేస్తుందో మరింత తెలుసుకోండి.

### ఎన్విరాన్‌మెంట్ వేరియబుల్స్ {#environment-variables}

మీ కాంట్రాక్ట్‌లో మీరు నిర్వచించిన వేరియబుల్స్‌తో పాటు, కొన్ని ప్రత్యేక గ్లోబల్ వేరియబుల్స్ ఉన్నాయి. అవి ప్రధానంగా బ్లాక్‌చైన్ లేదా ప్రస్తుత లావాదేవీ గురించి సమాచారాన్ని అందించడానికి ఉపయోగించబడతాయి.

ఉదాహరణలు:

| **ప్రాప్**        | **స్టేట్ వేరియబుల్** | **వివరణ**                                           |
| ----------------- | -------------------- | --------------------------------------------------- |
| `block.timestamp` | uint256              | ప్రస్తుత బ్లాక్ ఎపోక్ టైమ్‌స్టాంప్                  |
| `msg.sender`      | చిరునామా             | సందేశం పంపినవారు (ప్రస్తుత కాల్) |

## ఫంక్షన్స్ {#functions}

చాలా సరళమైన పరంగా చెప్పాలంటే, ఇన్‌కమింగ్ లావాదేవీలకు ప్రతిస్పందనగా ఫంక్షన్‌లు సమాచారాన్ని పొందగలవు లేదా సమాచారాన్ని సెట్ చేయగలవు.

ఫంక్షన్ కాల్స్‌లో రెండు రకాలు ఉన్నాయి:

- `internal` – ఇవి EVM కాల్‌ను సృష్టించవు
  - అంతర్గత ఫంక్షన్‌లు మరియు స్టేట్ వేరియబుల్స్ అంతర్గతంగా మాత్రమే యాక్సెస్ చేయబడతాయి (అంటే, ప్రస్తుత కాంట్రాక్ట్ లేదా దాని నుండి పొందిన కాంట్రాక్ట్‌ల నుండి)
- `external` – ఇవి EVM కాల్‌ను సృష్టిస్తాయి
  - బాహ్య ఫంక్షన్‌లు కాంట్రాక్ట్ ఇంటర్‌ఫేస్‌లో భాగంగా ఉంటాయి, అంటే వాటిని ఇతర కాంట్రాక్ట్‌ల నుండి మరియు లావాదేవీల ద్వారా కాల్ చేయవచ్చు. ఒక బాహ్య ఫంక్షన్ `f`ని అంతర్గతంగా కాల్ చేయలేము (అంటే, `f()` పని చేయదు, కానీ `this.f()` పని చేస్తుంది).

అవి `public` లేదా `private` కూడా కావచ్చు

- `public` ఫంక్షన్‌లను కాంట్రాక్ట్ లోపల అంతర్గతంగా లేదా సందేశాల ద్వారా బాహ్యంగా కాల్ చేయవచ్చు
- `private` ఫంక్షన్‌లు అవి నిర్వచించబడిన కాంట్రాక్ట్‌కు మాత్రమే కనిపిస్తాయి మరియు ఉత్పన్నమైన కాంట్రాక్ట్‌లలో కనిపించవు

ఫంక్షన్‌లు మరియు స్టేట్ వేరియబుల్స్ రెండింటినీ పబ్లిక్ లేదా ప్రైవేట్‌గా చేయవచ్చు

ఒక కాంట్రాక్ట్‌లోని స్టేట్ వేరియబుల్‌ను అప్‌డేట్ చేయడానికి ఇక్కడ ఒక ఫంక్షన్ ఉంది:

```solidity
// Solidity example
function update_name(string value) public {
    dapp_name = value;
}
```

- `string` రకం యొక్క `value` పరామితి ఫంక్షన్‌లోకి పంపబడుతుంది: `update_name`
- ఇది `public`గా ప్రకటించబడింది, అంటే ఎవరైనా దీన్ని యాక్సెస్ చేయవచ్చు
- ఇది `view`గా ప్రకటించబడలేదు, కాబట్టి ఇది కాంట్రాక్ట్ స్టేట్‌ను సవరించగలదు

### వ్యూ ఫంక్షన్‌లు {#view-functions}

ఈ ఫంక్షన్‌లు కాంట్రాక్ట్ డేటా యొక్క స్థితిని సవరించబోమని వాగ్దానం చేస్తాయి. సాధారణ ఉదాహరణలు "గెట్టర్" ఫంక్షన్‌లు – ఉదాహరణకు, వినియోగదారుడి బ్యాలెన్స్‌ను స్వీకరించడానికి మీరు దీన్ని ఉపయోగించవచ్చు.

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

స్థితిని సవరించడంగా ఏమి పరిగణించబడుతుంది:

1. స్టేట్ వేరియబుల్స్‌కి రాయడం.
2. [ఈవెంట్‌లను విడుదల చేయడం](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [ఇతర కాంట్రాక్ట్‌లను సృష్టించడం](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. `selfdestruct` ఉపయోగించడం.
5. కాల్స్ ద్వారా ఈథర్‌ను పంపడం.
6. `view` లేదా `pure` అని మార్క్ చేయని ఏ ఫంక్షన్‌ను అయినా కాల్ చేయడం.
7. తక్కువ-స్థాయి కాల్స్‌ను ఉపయోగించడం.
8. కొన్ని ఆప్‌కోడ్‌లను కలిగి ఉన్న ఇన్‌లైన్ అసెంబ్లీని ఉపయోగించడం.

### కన్స్ట్రక్టర్ ఫంక్షన్‌లు {#constructor-functions}

`constructor` ఫంక్షన్‌లు కాంట్రాక్ట్‌ను మొదటిసారి డిప్లాయ్ చేసినప్పుడు ఒకసారి మాత్రమే అమలు చేయబడతాయి. అనేక క్లాస్-ఆధారిత ప్రోగ్రామింగ్ భాషలలో `constructor` లాగా, ఈ ఫంక్షన్‌లు తరచుగా స్టేట్ వేరియబుల్స్‌ను వాటి పేర్కొన్న విలువలకు ప్రారంభిస్తాయి.

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

### అంతర్నిర్మిత ఫంక్షన్‌లు {#built-in-functions}

మీ కాంట్రాక్ట్‌లో మీరు నిర్వచించిన వేరియబుల్స్ మరియు ఫంక్షన్‌లతో పాటు, కొన్ని ప్రత్యేక అంతర్నిర్మిత ఫంక్షన్‌లు ఉన్నాయి. అత్యంత స్పష్టమైన ఉదాహరణ:

- `address.send()` – సొలిడిటీ
- `send(address)` – వైపర్

ఇవి కాంట్రాక్ట్‌లను ఇతర ఖాతాలకు ETH పంపడానికి అనుమతిస్తాయి.

## ఫంక్షన్‌లను రాయడం {#writing-functions}

మీ ఫంక్షన్‌కు అవసరం:

- పరామితి వేరియబుల్ మరియు రకం (ఇది పరామితులను అంగీకరిస్తే)
- అంతర్గత/బాహ్య యొక్క ప్రకటన
- `pure`/`view`/`payable` యొక్క ప్రకటన
- రిటర్న్స్ రకం (ఇది ఒక విలువను తిరిగి ఇస్తే)

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

ఒక పూర్తి కాంట్రాక్ట్ ఇలా ఉండవచ్చు. ఇక్కడ `constructor` ఫంక్షన్ `dapp_name` వేరియబుల్ కోసం ప్రారంభ విలువను అందిస్తుంది.

## ఈవెంట్‌లు మరియు లాగ్‌లు {#events-and-logs}

ఈవెంట్‌లు మీ స్మార్ట్ కాంట్రాక్ట్ మీ ఫ్రంటెండ్ లేదా ఇతర సబ్‌స్క్రైబ్ చేసే అప్లికేషన్‌లతో కమ్యూనికేట్ చేయడానికి వీలు కల్పిస్తాయి. ఒక లావాదేవీ ధృవీకరించబడి, బ్లాక్‌కి జోడించబడిన తర్వాత, స్మార్ట్ కాంట్రాక్ట్‌లు ఈవెంట్‌లను విడుదల చేయగలవు మరియు సమాచారాన్ని లాగ్ చేయగలవు, దానిని ఫ్రంటెండ్ ప్రాసెస్ చేసి, ఉపయోగించుకోగలదు.

## వివరణాత్మక ఉదాహరణలు {#annotated-examples}

ఇవి Solidity లో వ్రాసిన కొన్ని ఉదాహరణలు. మీరు కోడ్‌తో ఆడాలనుకుంటే, మీరు [Remix](http://remix.ethereum.org)లో వాటితో ఇంటరాక్ట్ అవ్వవచ్చు.

### హలో వరల్డ్ {#hello-world}

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

### టోకెన్ {#token}

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

### ప్రత్యేక డిజిటల్ ఆస్తి {#unique-digital-asset}

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

## మరింత సమాచారం {#further-reading}

స్మార్ట్ కాంట్రాక్టుల యొక్క మరింత పూర్తి అవలోకనం కోసం సొలిడిటీ మరియు వైపర్ యొక్క డాక్యుమెంటేషన్‌ను చూడండి:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## సంబంధిత అంశాలు {#related-topics}

- [స్మార్ట్ కాంట్రాక్టులు](/developers/docs/smart-contracts/)
- [Ethereum వర్చువల్ మెషీన్](/developers/docs/evm/)

## సంబంధిత ట్యుటోరియల్స్ {#related-tutorials}

- [కాంట్రాక్ట్ పరిమాణ పరిమితితో పోరాడటానికి కాంట్రాక్టులను తగ్గించడం](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– మీ స్మార్ట్ కాంట్రాక్ట్ పరిమాణాన్ని తగ్గించడానికి కొన్ని ఆచరణాత్మక చిట్కాలు._
- [ఈవెంట్‌లతో స్మార్ట్ కాంట్రాక్టుల నుండి డేటాను లాగింగ్ చేయడం](/developers/tutorials/logging-events-smart-contracts/) _– స్మార్ట్ కాంట్రాక్ట్ ఈవెంట్‌లకు ఒక పరిచయం మరియు డేటాను లాగ్ చేయడానికి మీరు వాటిని ఎలా ఉపయోగించవచ్చు._
- [సొలిడిటీ నుండి ఇతర కాంట్రాక్టులతో ఇంటరాక్ట్ అవ్వండి](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– ఇప్పటికే ఉన్న కాంట్రాక్ట్ నుండి స్మార్ట్ కాంట్రాక్ట్‌ను ఎలా డిప్లాయ్ చేయాలి మరియు దానితో ఎలా ఇంటరాక్ట్ అవ్వాలి._
