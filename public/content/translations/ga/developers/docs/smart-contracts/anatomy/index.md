---
title: Anatamaíocht na gconarthaí cliste
description: Súil ghrinn ar anatamaíocht teagmhála cliste – na feidhmeanna, na sonraí, agus na hathróga.
lang: ga
---

Is clár é conradh cliste a ritheann ag seoladh ar Ethereum. Tá siad comhdhéanta de shonraí agus feidhmeanna is féidir a fhorghníomhú tar éis idirbheart a fháil. Seo forbhreathnú ar cad is conradh cliste ann.

## Réamhriachtanais {#prerequisites}

Bí cinnte gur léigh tú faoi [conarthaí cliste](/developers/docs/smart-contracts/) ar dtús. Glacann an doiciméad seo leis go bhfuil cur amach agat ar theangacha ríomhchlárúcháin mar JavaScript nó Python cheana féin.

## Sonraí {#data}

Ní mór sonraí conartha ar bith a shannadh chuig láthair: chuig `stóráil` nó `cuimhne`. Tá sé costasach an stóráil a mhodhnú i gconradh cliste agus mar sin ní mór duit smaoineamh ar an áit ar cheart do shonraí a choinneáil.

### Stóráil {#storage}

Tagraítear do shonraí marthanacha mar stóráil agus léirítear iad le hathróga stáit. Stóráiltear na luachanna seo go buan ar an blocshlabhra. Ní mór duit an cineál a dhearbhú ionas gur féidir leis an gconradh súil a choinneáil ar cé mhéad stórála ar an blocshlabhra a theastaíonn nuair a thiomsaíonn sé.

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

Má tá teangacha réad-dhírithe ríomhchláraithe agat cheana féin, is dócha go mbeidh cur amach agat ar fhormhór na gcineálacha. Ach ba cheart go mbeadh `seoladh` nua duit más rud é go bhfuil tú nua i bhforbairt Ethereum.

Is féidir le cineál `seoladh` seoladh Ethereum a bheith aige arb ionann é agus 20 beart nó 160 giotán. Filleann sé i nodaireacht heicsidheachúil le 0x tosaigh.

I measc na gcineálacha eile tá:

- boole
- slánuimhir
- uimhreacha pointí seasta
- eagair beart de mhéid seasta
- eagair beart dinimiciúil-mhéid
- Litriúla réasúnacha agus slánuimhir
- Litriúla teaghráin
- Litriúla heicsidheachúlacha
- Enums

Le haghaidh tuilleadh mínithe, féach ar na doiciméid:

- [Féach cineálacha Vyper](https://vyper.readthedocs.io/en/v0.1.0-beta.6/types.html#value-types)
- [Féach cineálacha Solidity](https://solidity.readthedocs.io/en/latest/types.html#value-types)

### Cuimhne {#memory}

Athróga cuimhne a thugtar ar luachanna nach stóráiltear ach ar feadh shaolré fhorghníomhú feidhme an chonartha. Ós rud é nach stóráiltear iad seo go buan ar an mblocshlabhra, tá siad i bhfad níos saoire le húsáid.

Foghlaim tuilleadh faoin gcaoi a stórálann an EVM sonraí (Stóráil, Cuimhne, agus an Cruach) sa [Doiciméid Solidity](https://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html?highlight=memory#storage-memory-and-the-stack).

### Athróga timpeallachta {#environment-variables}

Chomh maith leis na hathróga a shainíonn tú ar do chonradh, tá roinnt athróg domhanda speisialta ann. Úsáidtear iad go príomha chun faisnéis a sholáthar faoin blocshlabhra nó faoin idirbheart reatha.

Samplaí:

| **Prop**          | **Athróg staide** | **Tuairisc**                              |
| ----------------- | ----------------- | ----------------------------------------- |
| `block.timestamp` | uint256           | Stampa ama aga reatha na mbloc            |
| `msg.sender`      | seoladh           | Seoltóir na teachtaireachta (glao reatha) |

## Feidhmeanna {#functions}

Lena rá go simplí, is féidir le feidhmeanna faisnéis a fháil nó faisnéis a shocrú mar fhreagra ar idirbhearta ag teacht isteach.

Tá dhá chineál glaonna feidhme ann:

- `internal` – ní chruthaíonn siad seo glao EVM
  - Ní féidir rochtain a fháil ar fheidhmeanna inmheánacha agus ar athróga staide ach go hinmheánach (i.e. ón taobh istigh den chonradh reatha nó de na conarthaí a eascraíonn as)
- `seachtrach` –cruthaíonn siad seo glao EVM
  - Is cuid den chomhéadan conartha iad feidhmeanna seachtracha, rud a chiallaíonn gur féidir iad a ghlaoch ó chonarthaí eile agus trí idirbhearta. Ní féidir glaoch inmheánach a chur ar fheidhm sheachtrach `f` (i.e. ní oibríonn `f()`, ach oibríonn `this.f()`).

Is féidir leo a bheith `poiblí` nó `príobháideach` freisin

- Is féidir feidhmeanna `poiblí` a ghlaoch go hinmheánach laistigh den chonradh nó go seachtrach trí theachtaireachtaí
- Níl feidhmeanna `private` le feiceáil ach amháin don chonradh ina bhfuil siad sainithe agus ní i gconarthaí díorthaithe

Is féidir feidhm agus athróg stáit araon a dhéanamh poiblí nó príobháideach

Seo feidhm chun athróg stáit ar chonradh a nuashonrú:

```solidity
// Solidity example
function update_name(string value) public {
    dapp_name = value;
}
```

- Cuirtear an paraiméadar `value` den chineál `string` isteach san fheidhm: `update_name`
- Tá sé fógartha `public`, rud a chiallaíonn gur féidir le haon duine rochtain a fháil air
- Níl sé dearbhaithe `view`, mar sin is féidir leis staid an chonartha a mhodhnú

### Amharc ar fheidhmeanna {#view-functions}

Geallann na feidhmeanna seo nach modhnófar staid shonraí an chonartha. Samplaí coitianta is ea feidhmeanna "getter" - d'fhéadfá é seo a úsáid chun iarmhéid úsáideora a fháil mar shampla.

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

Cad a mheastar a stát modhnaithe:

1. Ag scríobh chuig athróga luaigh.
2. [Astú imeachtaí](https://solidity.readthedocs.io/en/v0.7.0/contracts.html#events).
3. [Conarthaí eile a chruthú](https://solidity.readthedocs.io/en/v0.7.0/control-structures.html#creating-contracts).
4. Ag úsáid `selfdestruct`.
5. Éitear a sheoladh trí ghlaonna.
6. Ag glaoch ar fheidhm ar bith nach bhfuil marcáilte `view` nó `pure`.
7. Ag baint úsáide as glaonna ar leibhéal íseal.
8. Ag baint úsáide as cóimeáil inlíne ina bhfuil opcodes áirithe.

### Feidhmeanna tógálaí {#constructor-functions}

Ní dhéantar feidhmeanna `constructor` a fhorghníomhú ach uair amháin nuair a chuirtear an conradh i bhfeidhm ar dtús. Cosúil le `constructor` i go leor teangacha ríomhchláraithe rangbhunaithe, is minic a chuireann na feidhmeanna seo tús le hathróga stáit chuig a luachanna sonraithe.

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

### Feidhmeanna insuite {#built-in-functions}

Chomh maith leis na hathróga agus na feidhmeanna a shainíonn tú ar do chonradh, tá roinnt feidhmeanna ionsuite speisialta ann. Is é an sampla is soiléire:

- `address.send()` – Solidity
- `send(address)` – Vyper

Ligeann siad seo conarthaí chun ETH a sheoladh chuig cuntais eile.

## Feidhmeanna scríbhneoireachta {#writing-functions}

Do chuid riachtanais feidhme:

- athróg agus cineál paraiméadar (má ghlacann sé le paraiméadair)
- dearbhú inmheánach/seachtrach
- dearbhú íon/amharc/iníoctha
- cineál tuairisceáin (má aisfhilleann sé luach)

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

Seans go mbeadh cumar mar seo ar chonradh iomlán. Anseo soláthraíonn an fheidhm `tógálaí` luach tosaigh don athróg `dapp_name`.

## Imeachtaí agus logaí {#events-and-logs}

Cumasaíonn imeachtaí do chonradh cliste cumarsáid a dhéanamh le d’éadan tosaigh nó le feidhmchláir shíntiúis eile. Nuair a dhéantar idirbheart a bhailíochtú agus a chur le bloc, is féidir le conarthaí cliste imeachtaí agus faisnéis logála a astú, ar féidir leis an éadan tosaigh a phróiseáil agus a úsáid ansin.

## Samplaí anótáilte {#annotated-examples}

Seo roinnt samplaí atá scríofa i Solidity. Más mian leat imirt leis an gcód, is féidir leat idirghníomhú leo i [Remix](http://remix.ethereum.org).

### Beannacht don domhan {#hello-world}

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

### Comhartha {#token}

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

### Sócmhainn dhigiteach uathúil {#unique-digital-asset}

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

## Tuilleadh léitheoireachta {#further-reading}

Breathnaigh ar dhoiciméadú Solidity agus Vyper le haghaidh forbhreathnú níos iomláine ar chonarthaí cliste:

- [Solidity](https://solidity.readthedocs.io/)
- [Vyper](https://vyper.readthedocs.io/)

## Ábhair ghaolmhara {#related-topics}

- [Conarthaí cliste](/developers/docs/smart-contracts/)
- [Meaisín fíorúil Ethereum](/developers/docs/evm/)

## Ranganna teagaisc a bhaineann leo {#related-tutorials}

- [Íoslaghdú conarthaí chun teorainn mhéide an chonartha a chomhrac](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _ – Roinnt leideanna praiticiúla chun méid do chonartha cliste a laghdú._
- [Sonraí a logáil ó chonarthaí cliste le himeachtaí](/developers/tutorials/logging-events-smart-contracts/) _- Réamhrá ar imeachtaí conartha cliste agus conas is féidir leat iad a úsáid chun sonraí a logáil._
- [Idirghníomhaíocht le conarthaí eile ó Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _- Conas conradh cliste a imscaradh ó chonradh atá ann cheana féin agus idirghníomhú leis._
