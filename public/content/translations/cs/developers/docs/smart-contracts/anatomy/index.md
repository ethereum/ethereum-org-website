---
title: Anatomie chytrých kontraktů
description: Podrobný pohled na anatomii chytrého kontaktu – funkce, údaje a proměnné.
lang: cs
---

Chytrý kontrakt je program běžící na adrese na Ethereu. Skládá se z dat a funkcí, které se mohou spustit po přijetí transakce. Zde je přehled toho, co tvoří chytrý kontrakt.

## Předpoklady {#prerequisites}

Ujistěte se, že jste si nejprve přečetli o [chytrých kontraktech](/developers/docs/smart-contracts/). Tento dokument předpokládá, že již znáte programovací jazyky, jako je JavaScript nebo Python.

## Data {#data}

Jakákoli data kontraktu musí být přiřazena k umístění: buď do `storage` nebo `memory`. Úprava storage v chytrém kontraktu je nákladná, takže je třeba zvážit, kde by měla být vaše data uložena.

### Úložiště {#storage}

Trvalá data se označují jako storage a jsou reprezentována stavovými proměnnými. Tyto hodnoty se trvale uloží na blockchain. Datový typ je třeba deklarovat, aby kontrakt mohl při kompilaci sledovat, kolik potřebuje na blockchainu úložiště.

```solidity
// Příklad v Solidity
contract SimpleStorage {
    uint storedData; // Stavová proměnná
    // ...
}
```

```python
# Příklad ve Vyperu
storedData: int128
```

Pokud jste již programovali v objektově orientovaných jazycích, většinu typů pravděpodobně znáte. Nicméně `address` by pro vás mělo být novinkou, pokud s vývojem na Ethereu teprve začínáte.

Datový typ `address` může obsahovat adresu Ethereum, která odpovídá 20 bajtům nebo 160 bitům. Návratová hodnota je v hexadecimálním zápisu začínajícím 0x.

Mezi další datové typy patří:

- boolean
- integer
- čísla s pevnou řádovou čárkou
- pole bajtů s pevnou velikostí
- pole bajtů s dynamickou velikostí
- racionální a celočíselné literály
- řetězcové literály
- hexadecimální literály
- enumy

Další vysvětlení najdete v těchto dokumentech:

- [Zobrazit typy Vyperu](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Zobrazit typy Solidity](https://docs.soliditylang.org/en/latest/types.html#value-types)

### Paměť {#memory}

Hodnoty, které jsou uloženy pouze po dobu provádění funkce kontraktu, se nazývají paměťové proměnné. Protože nejsou trvale uloženy na blockchainu, je jejich používání mnohem levnější.

Dozvíte se více o tom, jak EVM ukládá data (úložiště, paměť a zásobník) v [dokumentaci Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack).

### Proměnné prostředí {#environment-variables}

Kromě proměnných, které definujete v kontraktu, existují i speciální globální proměnné. Ty slouží především k poskytování informací o blockchainu nebo aktuální transakci.

Příklady:

| **Vlastnost**     | **Stavová proměnná** | **Popis**                                              |
| ----------------- | -------------------- | ------------------------------------------------------ |
| `block.timestamp` | uint256              | Časové razítko aktuální epochy bloku                   |
| `msg.sender`      | adresa               | Odesílatel zprávy (aktuální volání) |

## Funkce {#functions}

Nejjednodušeji řečeno, funkce mohou získávat informace nebo nastavovat informace v reakci na příchozí transakce.

Existují dva typy volání funkcí:

- `internal` – nevytvářejí volání EVM
  - K interním funkcím a stavovým proměnným lze přistupovat pouze interně (tj. v rámci aktuálního kontraktu nebo kontraktů z něho odvozených).
- `external` – vytvářejí volání EVM
  - Externí funkce jsou součástí rozhraní kontraktu, což znamená, že je lze volat z jiných kontraktů a prostřednictvím transakcí. Externí funkci `f` nelze volat interně (tzn. `f()` nefunguje, ale `this.f()` ano).

Mohou být také `public` nebo `private`.

- `public` funkce lze volat interně z kontraktu nebo externě prostřednictvím zpráv
- `private` funkce jsou viditelné pouze pro kontrakt, ve kterém jsou definovány, a ne v odvozených kontraktech

Funkce i stavové proměnné mohou být veřejné nebo soukromé.

Zde je funkce pro aktualizaci stavové proměnné v kontraktu:

```solidity
// Příklad v Solidity
function update_name(string value) public {
    dapp_name = value;
}
```

- Parametr `value` typu `string` je předán do funkce `update_name`.
- Je deklarována jako `public`, což znamená, že k ní má kdokoli přístup.
- Není deklarována jako `view`, takže může měnit stav kontraktu.

### Funkce `view` {#view-functions}

Tyto funkce slibují, že nebudou měnit stav dat kontraktu. Běžným příkladem jsou „getter“ funkce – můžete je použít například k získání zůstatku uživatele.

```solidity
// Příklad v Solidity
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

Co se považuje jako změna stavu:

1. Zápis do stavových proměnných.
2. [Vysílání událostí](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [Vytváření dalších kontraktů](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. Použití `selfdestruct`.
5. Posílání etheru pomocí volání.
6. Volání jakékoli funkce, která není označena jako `view` nebo `pure`.
7. Používání nízkoúrovňových volání.
8. Používání inline assembly, která obsahuje určité operační kódy.

### Konstruktory {#constructor-functions}

Funkce `constructor` se provedou pouze jednou, při prvním nasazení kontraktu. Podobně jako `constructor` v mnoha programovacích jazycích založených na třídách, tyto funkce často inicializují stavové proměnné na zadané hodnoty.

```solidity
// Příklad v Solidity
// Inicializuje data kontraktu, nastaví `owner`
// na adresu tvůrce kontraktu.
constructor() public {
    // Všechny chytré kontrakty spoléhají na externí transakce, které spouští jejich funkce.
    // `msg` je globální proměnná, která obsahuje relevantní údaje o dané transakci,
    // jako je adresa odesílatele a hodnota ETH obsažená v transakci.
    // Více informací: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Příklad ve Vyperu

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### Vestavěné funkce {#built-in-functions}

Kromě proměnných a funkcí, které definujete v kontraktu, existují i speciální vestavěné funkce. Nejzřetelnějším příkladem je:

- `address.send()` – Solidity
- `send(address)` – Vyper

Ty umožňují posílat ETH na jiné účty.

## Psaní funkcí {#writing-functions}

Vaše funkce potřebuje:

- parametr a jeho datový typ (pokud parametry přijímá)
- deklaraci, zda je internal/external
- deklaraci, zda je pure/view/payable
- datový typ návratové hodnoty (pokud nějakou vrací)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // stavová proměnná

    // Volá se při nasazení kontraktu a inicializuje hodnotu
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Funkce pro získání (Get)
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Funkce pro nastavení (Set)
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

Kompletní kontrakt může vypadat následovně. Zde funkce `constructor` poskytuje počáteční hodnotu proměnné `dapp_name`.

## Události a záznamy {#events-and-logs}

Události umožňují vašemu chytrému kontraktu komunikovat s vaším frontendem nebo jinými přihlášenými aplikacemi. Jakmile je transakce ověřena a přidána do bloku, mohou chytré kontrakty vysílat události a zaznamenávat informace, které pak frontend může zpracovat a využít.

## Příklady s poznámkami {#annotated-examples}

Zde jsou příklady napsané v Solidity. Pokud si chcete s kódem pohrát, můžete s ním interagovat v [Remixu](http://remix.ethereum.org).

### Hello world {#hello-world}

```solidity
// Určuje verzi Solidity pomocí sémantického verzování.
// Více informací: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Definuje kontrakt s názvem `HelloWorld`.
// Kontrakt je soubor funkcí a dat (jeho stav).
// Po nasazení se kontrakt nachází na specifické adrese na ethereovém blockchainu.
// Více informací: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Deklaruje stavovou proměnnou `message` typu `string`.
    // Stavové proměnné jsou proměnné, jejichž hodnoty jsou trvale uloženy v úložišti kontraktu.
    // Klíčové slovo `public` zpřístupňuje proměnné zvenčí kontraktu
    // a vytváří funkci, kterou mohou jiné kontrakty nebo klienti volat pro přístup k hodnotě.
    string public message;

    // Podobně jako v mnoha objektově orientovaných jazycích založených na třídách je konstruktor
    // speciální funkce, která se provádí pouze při vytvoření kontraktu.
    // Konstruktory se používají k inicializaci dat kontraktu.
    // Více informací: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Přijímá argument `initMessage` typu string a nastavuje hodnotu
        // do úložné proměnné kontraktu `message`.
        message = initMessage;
    }

    // Veřejná funkce, která přijímá argument typu string
    // a aktualizuje úložnou proměnnou `message`.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### Token {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // Typ `address` je srovnatelný s e-mailovou adresou – používá se k identifikaci účtu na Ethereu.
    // Adresy mohou představovat chytrý kontrakt nebo externí (uživatelské) účty.
    // Více informací: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // `mapping` je v podstatě datová struktura hašovací tabulky.
    // Tento `mapping` přiřazuje celé číslo bez znaménka (zůstatek tokenů) k adrese (držiteli tokenů).
    // Více informací: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Události umožňují zaznamenávat aktivitu na blockchainu.
    // Klienti Etherea mohou naslouchat událostem, aby mohli reagovat na změny stavu kontraktu.
    // Více informací: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Inicializuje data kontraktu, nastaví `owner`
    // na adresu tvůrce kontraktu.
    constructor() public {
        // Všechny chytré kontrakty spoléhají na externí transakce, které spouští jejich funkce.
        // `msg` je globální proměnná, která obsahuje relevantní údaje o dané transakci,
        // jako je adresa odesílatele a hodnota ETH obsažená v transakci.
        // Více informací: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Vytvoří množství nových tokenů a pošle je na adresu.
    function mint(address receiver, uint amount) public {
        // `require` je řídicí struktura používaná k vynucení určitých podmínek.
        // Pokud se příkaz `require` vyhodnotí jako `false`, dojde k výjimce,
        // která vrátí všechny změny stavu provedené během aktuálního volání.
        // Více informací: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Tuto funkci může volat pouze vlastník kontraktu
        require(msg.sender == owner, "You are not the owner.");

        // Vynucuje maximální množství tokenů
        require(amount < 1e60, "Maximum issuance exceeded");

        // Zvýší zůstatek `receiver` o `amount`
        balances[receiver] += amount;
    }

    // Odesílá množství existujících tokenů od libovolného volajícího na adresu.
    function transfer(address receiver, uint amount) public {
        // Odesílatel musí mít dostatek tokenů k odeslání
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // Upravuje zůstatky tokenů na obou adresách
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Vysílá dříve definovanou událost
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### Unikátní digitální aktivum {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Importuje symboly z jiných souborů do aktuálního kontraktu.
// V tomto případě se jedná o sérii pomocných kontraktů z OpenZeppelin.
// Více informací: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// Klíčové slovo `is` se používá k dědění funkcí a klíčových slov z externích kontraktů.
// V tomto případě `CryptoPizza` dědí z kontraktů `IERC721` a `ERC165`.
// Více informací: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Používá knihovnu SafeMath od OpenZeppelin k bezpečnému provádění aritmetických operací.
    // Více informací: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Konstantní stavové proměnné v Solidity jsou podobné jako v jiných jazycích
    // ale musíte je přiřadit z výrazu, který je konstantní v době kompilace.
    // Více informací: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Typy `struct` umožňují definovat vlastní typ
    // Více informací: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Vytvoří prázdné pole struktur Pizza
    Pizza[] public pizzas;

    // Mapování z ID pizzy na adresu jejího vlastníka
    mapping(uint256 => address) public pizzaToOwner;

    // Mapování z adresy vlastníka na počet vlastněných tokenů
    mapping(address => uint256) public ownerPizzaCount;

    // Mapování z ID tokenu na schválenou adresu
    mapping(uint256 => address) pizzaApprovals;

    // Mapování lze vnořovat, tento příklad mapuje vlastníka na schválení operátora
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Interní funkce pro vytvoření náhodné pizzy z řetězce (jméno) a DNA
    function _createPizza(string memory _name, uint256 _dna)
        // Klíčové slovo `internal` znamená, že tato funkce je viditelná pouze
        // v rámci tohoto kontraktu a kontraktů, které z něj dědí
        // Více informací: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` je modifikátor funkce, který kontroluje, zda pizza již existuje
        // Více informací: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Přidá pizzu do pole pizz a získá ID
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Kontroluje, zda je vlastník pizzy stejný jako aktuální uživatel
        // Více informací: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Všimněte si, že address(0) je nulová adresa,
        // což znamená, že pizza[id] ještě není přidělena konkrétnímu uživateli.

        assert(pizzaToOwner[id] == address(0));

        // Mapuje pizzu na vlastníka
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Vytvoří náhodnou pizzu z řetězce (jméno)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Generuje náhodné DNA z řetězce (jméno) a adresy vlastníka (tvůrce)
    function generateRandomDna(string memory _str, address _owner)
        public
        // Funkce označené jako `pure` slibují, že nebudou číst ani upravovat stav
        // Více informací: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Generuje náhodné uint z řetězce (jméno) + adresy (vlastník)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Vrací pole pizz nalezených podle vlastníka
    function getPizzasByOwner(address _owner)
        public
        // Funkce označené jako `view` slibují, že nebudou upravovat stav
        // Více informací: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Používá `memory` jako umístění úložiště pro uložení hodnot pouze pro
        // životní cyklus tohoto volání funkce.
        // Více informací: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
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

    // Převádí pizzu a vlastnictví na jinou adresu
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Vysílá událost definovanou v importovaném kontraktu IERC721
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Bezpečně převede vlastnictví daného ID tokenu na jinou adresu
     * Pokud je cílová adresa kontrakt, musí implementovat `onERC721Received`,
     * která se volá při bezpečném převodu a vrátí magickou hodnotu
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * jinak se převod vrátí zpět.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * Bezpečně převede vlastnictví daného ID tokenu na jinou adresu
     * Pokud je cílová adresa kontrakt, musí implementovat `onERC721Received`,
     * která se volá při bezpečném převodu a vrátí magickou hodnotu
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * jinak se převod vrátí zpět.
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
     * Interní funkce pro vyvolání `onERC721Received` na cílové adrese
     * Volání se neprovede, pokud cílová adresa není kontrakt
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

    // Spálí pizzu - kompletně zničí token
    // Modifikátor funkce `external` znamená, že tato funkce je
    // součástí rozhraní kontraktu a mohou ji volat jiné kontrakty
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

    // Vrací počet pizz podle adresy
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Vrací vlastníka pizzy nalezeného podle ID
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // Schvaluje jinou adresu k převodu vlastnictví pizzy
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Vrací schválenou adresu pro konkrétní pizzu
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Soukromá funkce pro zrušení aktuálního schválení daného ID tokenu
     * Vrátí se zpět, pokud daná adresa není skutečně vlastníkem tokenu
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Nastavuje nebo ruší schválení daného operátora
     * Operátor má povoleno převádět všechny tokeny odesílatele jeho jménem
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Sdělí, zda je operátor schválen daným vlastníkem
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Přebírá vlastnictví pizzy - pouze pro schválené uživatele
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Kontroluje, zda pizza existuje
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Kontroluje, zda je adresa vlastníkem nebo je schválena k převodu pizzy
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Vypnout kontrolu solium kvůli
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // Zkontrolujte, zda je pizza jedinečná a ještě neexistuje
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

    // Vrací, zda je cílová adresa kontrakt
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // V současné době neexistuje lepší způsob, jak zkontrolovat, zda je na adrese kontrakt
        // než zkontrolovat velikost kódu na dané adrese.
        // Viz https://ethereum.stackexchange.com/a/14016/36603
        // pro více detailů o tom, jak to funguje.
        // TODO Zkontrolovat znovu před vydáním Serenity, protože všechny adresy budou
        // poté kontrakty.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Další čtení {#further-reading}

Kompletní přehled chytrých kontraktů najdete v dokumentaci Solidity a Vyper:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## Související témata {#related-topics}

- [Chytré kontrakty](/developers/docs/smart-contracts/)
- [Ethereum Virtual Machine (EVM)](/developers/docs/evm/)

## Související návody {#related-tutorials}

- [Zmenšování kontraktů pro boj s limitem velikosti kontraktu](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Několik praktických tipů pro zmenšení velikosti vašeho chytrého kontraktu._
- [Zaznamenávání dat z chytrých kontraktů pomocí událostí](/developers/tutorials/logging-events-smart-contracts/) _– Úvod do událostí chytrých kontraktů a jak je můžete použít k zaznamenávání dat._
- [Interakce s dalšími kontrakty ze Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Jak nasadit chytrý kontrakt z existujícího kontraktu a interagovat s ním._
