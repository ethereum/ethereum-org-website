---
title: "Anatomie chytrých kontraktů"
description: "Podrobný pohled na anatomii chytrého kontraktu – funkce, data a proměnné."
lang: cs
---

Chytrý kontrakt je program, který běží na určité adrese na Ethereu. Skládá se z dat a funkcí, které se mohou spustit po přijetí transakce. Zde je přehled toho, z čeho se chytrý kontrakt skládá.

## Předpoklady {#prerequisites}

Ujistěte se, že jste si nejprve přečetli o [chytrých kontraktech](/developers/docs/smart-contracts/). Tento dokument předpokládá, že již znáte programovací jazyky, jako je JavaScript nebo Python.

## Data {#data}

Jakákoli data kontraktu musí být přiřazena k určitému umístění: buď do `storage` nebo do `memory`. Úprava úložiště (storage) v chytrém kontraktu je nákladná, takže musíte zvážit, kde by vaše data měla být uložena.

### Úložiště (Storage) {#storage}

Trvalá data se označují jako úložiště (storage) a jsou reprezentována stavovými proměnnými. Tyto hodnoty se trvale ukládají na blockchain. Musíte deklarovat jejich typ, aby kontrakt při kompilaci věděl, kolik úložného prostoru na blockchainu bude potřebovat.

```solidity
// Příklad v Solidity
contract SimpleStorage {
    uint storedData; // Stavová proměnná
    // ...
}
```

```python
# Příklad ve Vyper
storedData: int128
```

Pokud jste již programovali v objektově orientovaných jazycích, pravděpodobně budete většinu typů znát. Nicméně typ `address` pro vás bude pravděpodobně nový, pokud s vývojem pro [Ethereum](/) teprve začínáte.

Typ `address` může uchovávat adresu na Ethereu, což odpovídá 20 bajtům nebo 160 bitům. Vrací se v hexadecimálním zápisu s počátečním 0x.

Mezi další typy patří:

- boolean (pravdivostní hodnota)
- integer (celé číslo)
- čísla s pevnou řádovou čárkou
- pole bajtů pevné délky
- pole bajtů dynamické délky
- racionální a celočíselné literály
- řetězcové literály
- hexadecimální literály
- výčtové typy (enums)

Pro podrobnější vysvětlení se podívejte do dokumentace:

- [Typy v jazyce Vyper](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Typy v jazyce Solidity](https://docs.soliditylang.org/en/latest/types.html#value-types)

### Paměť (Memory) {#memory}

Hodnoty, které jsou uloženy pouze po dobu provádění funkce kontraktu, se nazývají paměťové proměnné (memory variables). Vzhledem k tomu, že nejsou trvale uloženy na blockchainu, je jejich použití mnohem levnější.

Přečtěte si více o tom, jak Ethereum Virtual Machine (EVM) ukládá data (Storage, Memory a Stack) v [dokumentaci Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack).

### Proměnné prostředí {#environment-variables}

Kromě proměnných, které definujete ve svém kontraktu, existují i některé speciální globální proměnné. Používají se především k poskytování informací o blockchainu nebo aktuální transakci.

Příklady:

| **Vlastnost**          | **Stavová proměnná** | **Popis**                      |
| ----------------- | ------------------ | ------------------------------------ |
| `block.timestamp` | uint256            | Časové razítko epochy aktuálního bloku        |
| `msg.sender`      | address            | Odesílatel zprávy (aktuálního volání) |

## Funkce {#functions}

Zjednodušeně řečeno, funkce mohou získávat nebo nastavovat informace v reakci na příchozí transakce.

Existují dva typy volání funkcí:

- `internal` – nevytvářejí volání EVM
  - K interním funkcím a stavovým proměnným lze přistupovat pouze interně (tj. z aktuálního kontraktu nebo z kontraktů, které z něj dědí)
- `external` – vytvářejí volání EVM
  - Externí funkce jsou součástí rozhraní kontraktu, což znamená, že je lze volat z jiných kontraktů a prostřednictvím transakcí. Externí funkci `f` nelze volat interně (tj. `f()` nefunguje, ale `this.f()` funguje).

Mohou být také `public` nebo `private`

- Funkce `public` lze volat interně zevnitř kontraktu nebo externě prostřednictvím zpráv
- Funkce `private` jsou viditelné pouze pro kontrakt, ve kterém jsou definovány, a nikoli v odvozených kontraktech

Funkce i stavové proměnné mohou být veřejné (public) nebo soukromé (private)

Zde je funkce pro aktualizaci stavové proměnné v kontraktu:

```solidity
// Příklad v Solidity
function update_name(string value) public {
    dapp_name = value;
}
```

- Parametr `value` typu `string` je předán do funkce: `update_name`
- Je deklarována jako `public`, což znamená, že k ní má přístup kdokoli
- Není deklarována jako `view`, takže může upravovat stav kontraktu

### Funkce View {#view-functions}

Tyto funkce slibují, že nebudou upravovat stav dat kontraktu. Běžnými příklady jsou funkce typu „getter“ – můžete je použít například k získání zůstatku uživatele.

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

Co se považuje za úpravu stavu:

1. Zápis do stavových proměnných.
2. [Emitování událostí](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [Vytváření dalších kontraktů](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. Použití `selfdestruct`.
5. Odesílání etheru prostřednictvím volání.
6. Volání jakékoli funkce, která není označena jako `view` nebo `pure`.
7. Použití nízkoúrovňových volání (low-level calls).
8. Použití inline assembleru, který obsahuje určité operační kódy (opcodes).

### Konstruktory {#constructor-functions}

Funkce `constructor` se spustí pouze jednou, když je kontrakt poprvé nasazen. Stejně jako `constructor` v mnoha třídně orientovaných programovacích jazycích, tyto funkce často inicializují stavové proměnné na jejich zadané hodnoty.

```solidity
// Příklad v Solidity
// Inicializuje data kontraktu, nastavuje `owner`
// na adresu tvůrce kontraktu.
constructor() public {
    // Všechny chytré kontrakty spoléhají na externí transakce, které spouštějí jejich funkce.
    // `msg` je globální proměnná, která obsahuje relevantní data o dané transakci,
    // jako je adresa odesílatele a hodnota ETH zahrnutá v transakci.
    // Zjistěte více: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Příklad ve Vyper

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### Vestavěné funkce {#built-in-functions}

Kromě proměnných a funkcí, které definujete ve svém kontraktu, existují i některé speciální vestavěné funkce. Nejzřejmějším příkladem je:

- `address.send()` – Solidity
- `send(address)` – Vyper

Ty umožňují kontraktům odesílat ETH na jiné účty.

## Psaní funkcí {#writing-functions}

Vaše funkce potřebuje:

- proměnnou parametru a typ (pokud přijímá parametry)
- deklaraci internal/external
- deklaraci pure/view/payable
- návratový typ (pokud vrací hodnotu)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // stavová proměnná

    // Voláno při nasazení kontraktu a inicializuje hodnotu
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Funkce Get
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Funkce Set
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

Kompletní kontrakt by mohl vypadat nějak takto. Zde funkce `constructor` poskytuje počáteční hodnotu pro proměnnou `dapp_name`.

## Události a logy {#events-and-logs}

Události umožňují vašemu chytrému kontraktu komunikovat s vaším frontendem nebo jinými odebírajícími aplikacemi. Jakmile je transakce ověřena a přidána do bloku, chytré kontrakty mohou emitovat události a logovat informace, které pak frontend může zpracovat a využít.

## Komentované příklady {#annotated-examples}

Zde jsou některé příklady napsané v jazyce Solidity. Pokud si chcete s kódem pohrát, můžete s ním interagovat v prostředí [Remix](https://remix.ethereum.org).

### Hello world {#hello-world}

```solidity
// Určuje verzi Solidity pomocí sémantického verzování.
// Zjistěte více: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Definuje kontrakt s názvem `HelloWorld`.
// Kontrakt je kolekce funkcí a dat (jeho stav).
// Po nasazení se kontrakt nachází na specifické adrese na blockchainu Etherea.
// Zjistěte více: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Deklaruje stavovou proměnnou `message` typu `string`.
    // Stavové proměnné jsou proměnné, jejichž hodnoty jsou trvale uloženy v úložišti kontraktu.
    // Klíčové slovo `public` zpřístupňuje proměnné zvenčí kontraktu
    // a vytváří funkci, kterou mohou jiné kontrakty nebo klienti zavolat pro přístup k hodnotě.
    string public message;

    // Podobně jako v mnoha třídně orientovaných jazycích je konstruktor
    // speciální funkce, která se provede pouze při vytvoření kontraktu.
    // Konstruktory se používají k inicializaci dat kontraktu.
    // Zjistěte více: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Přijímá řetězcový argument `initMessage` a nastavuje hodnotu
        // do proměnné úložiště `message` kontraktu).
        message = initMessage;
    }

    // Veřejná funkce, která přijímá řetězcový argument
    // a aktualizuje proměnnou úložiště `message`.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### Token {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // `adresa` je srovnatelná s e-mailovou adresou - používá se k identifikaci účtu na Ethereu.
    // Adresy mohou představovat chytrý kontrakt nebo externí (uživatelské) účty.
    // Zjistěte více: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // `mapping` je v podstatě datová struktura hashovací tabulky.
    // Tento `mapping` přiřazuje neznaménkové celé číslo (zůstatek tokenů) adrese (držiteli tokenu).
    // Zjistěte více: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Události umožňují logování aktivity na blockchainu.
    // Klienti Etherea mohou naslouchat událostem, aby mohli reagovat na změny stavu kontraktu.
    // Zjistěte více: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Inicializuje data kontraktu, nastavuje `owner`
    // na adresu tvůrce kontraktu.
    constructor() public {
        // Všechny chytré kontrakty spoléhají na externí transakce, které spouštějí jejich funkce.
        // `msg` je globální proměnná, která obsahuje relevantní data o dané transakci,
        // jako je adresa odesílatele a hodnota ETH zahrnutá v transakci.
        // Zjistěte více: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Vytvoří určité množství nových tokenů a odešle je na adresu.
    function mint(address receiver, uint amount) public {
        // `require` je řídicí struktura používaná k vynucení určitých podmínek.
        // Pokud se příkaz `require` vyhodnotí jako `false`, je spuštěna výjimka,
        // která vrátí zpět všechny změny provedené ve stavu během aktuálního volání.
        // Zjistěte více: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Tuto funkci může volat pouze vlastník kontraktu
        require(msg.sender == owner, "You are not the owner.");

        // Vynucuje maximální množství tokenů
        require(amount < 1e60, "Maximum issuance exceeded");

        // Zvyšuje zůstatek `receiver` o `amount`
        balances[receiver] += amount;
    }

    // Odešle určité množství existujících tokenů od jakéhokoli volajícího na adresu.
    function transfer(address receiver, uint amount) public {
        // Odesílatel musí mít dostatek tokenů k odeslání
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // Upravuje zůstatky tokenů obou adres
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Vyvolá dříve definovanou událost
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### Unikátní digitální aktivum {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Importuje symboly z jiných souborů do aktuálního kontraktu.
// V tomto případě sérii pomocných kontraktů od OpenZeppelin.
// Zjistěte více: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// Klíčové slovo `is` se používá k dědění funkcí a klíčových slov z externích kontraktů.
// V tomto případě `CryptoPizza` dědí z kontraktů `IERC721` a `ERC165`.
// Zjistěte více: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Používá knihovnu SafeMath od OpenZeppelin k bezpečnému provádění aritmetických operací.
    // Zjistěte více: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Konstantní stavové proměnné v Solidity jsou podobné jako v jiných jazycích,
    // ale musíte jim přiřadit výraz, který je konstantní v době kompilace.
    // Zjistěte více: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Typy struct vám umožňují definovat si vlastní typ
    // Zjistěte více: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
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

    // Mapování můžete vnořovat, tento příklad mapuje vlastníka na schválení operátora
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Interní funkce pro vytvoření náhodné Pizzy z řetězce (jména) a DNA
    function _createPizza(string memory _name, uint256 _dna)
        // Klíčové slovo `internal` znamená, že tato funkce je viditelná pouze
        // v rámci tohoto kontraktu a kontraktů, které z tohoto kontraktu dědí
        // Zjistěte více: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` je modifikátor funkce, který kontroluje, zda pizza již existuje
        // Zjistěte více: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Přidá Pizzu do pole Pizz a získá id
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Kontroluje, zda je vlastník Pizzy stejný jako aktuální uživatel
        // Zjistěte více: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // všimněte si, že address(0) je nulová adresa,
        // což indikuje, že pizza[id] ještě není přidělena konkrétnímu uživateli.

        assert(pizzaToOwner[id] == address(0));

        // Mapuje Pizzu na vlastníka
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Vytvoří náhodnou Pizzu z řetězce (jména)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Generuje náhodnou DNA z řetězce (jména) a adresy vlastníka (tvůrce)
    function generateRandomDna(string memory _str, address _owner)
        public
        // Funkce označené jako `pure` slibují, že nebudou číst ani upravovat stav
        // Zjistěte více: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Generuje náhodný uint z řetězce (jména) + adresy (vlastníka)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Vrací pole Pizz nalezených podle vlastníka
    function getPizzasByOwner(address _owner)
        public
        // Funkce označené jako `view` slibují, že nebudou upravovat stav
        // Zjistěte více: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Používá umístění úložiště `memory` k uložení hodnot pouze pro
        // životní cyklus tohoto volání funkce.
        // Zjistěte více: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
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

    // Převede Pizzu a vlastnictví na jinou adresu
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Vyvolá událost definovanou v importovaném kontraktu IERC721
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Bezpečně převede vlastnictví daného ID tokenu na jinou adresu
     * Pokud je cílová adresa kontrakt, musí implementovat `onERC721Received`,
     * což je voláno při bezpečném převodu, a vrátit magickou hodnotu
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * v opačném případě je převod vrácen zpět.
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
     * což je voláno při bezpečném převodu, a vrátit magickou hodnotu
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * v opačném případě je převod vrácen zpět.
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

    // Spálí Pizzu - kompletně zničí token
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

    // Vrací počet Pizz podle adresy
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Vrací vlastníka Pizzy nalezené podle id
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // Schvaluje jinou adresu k převodu vlastnictví Pizzy
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Vrací schválenou adresu pro konkrétní Pizzu
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Privátní funkce pro vymazání aktuálního schválení daného ID tokenu
     * Vrátí zpět, pokud daná adresa není skutečně vlastníkem tokenu
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Nastaví nebo zruší schválení daného operátora
     * Operátor má povoleno převádět všechny tokeny odesílatele jeho jménem
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Říká, zda je operátor schválen daným vlastníkem
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Přebírá vlastnictví Pizzy - pouze pro schválené uživatele
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Kontroluje, zda Pizza existuje
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Kontroluje, zda je adresa vlastníkem nebo je schválena k převodu Pizzy
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Zakázat kontrolu solium kvůli
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // Zkontroluje, zda je Pizza unikátní a ještě neexistuje
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
        // V současné době neexistuje lepší způsob, jak zkontrolovat, zda je na adrese kontrakt,
        // než zkontrolovat velikost kódu na této adrese.
        // Viz https://ethereum.stackexchange.com/a/14016/36603
        // pro více podrobností o tom, jak to funguje.
        // TODO Zkontrolovat to znovu před vydáním Serenity, protože všechny adresy pak budou
        // kontrakty.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Další čtení {#further-reading}

Pro ucelenější přehled o chytrých kontraktech se podívejte do dokumentace jazyků Solidity a Vyper:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## Související témata {#related-topics}

- [Chytré kontrakty](/developers/docs/smart-contracts/)
- [Ethereum Virtual Machine](/developers/docs/evm/)

## Související tutoriály {#related-tutorials}

- [Zmenšování kontraktů pro boj s limitem velikosti kontraktu](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Několik praktických tipů pro zmenšení velikosti vašeho chytrého kontraktu._
- [Logování dat z chytrých kontraktů pomocí událostí](/developers/tutorials/logging-events-smart-contracts/) _– Úvod do událostí chytrých kontraktů a jak je můžete použít k logování dat._
- [Interakce s jinými kontrakty ze Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Jak nasadit chytrý kontrakt z existujícího kontraktu a interagovat s ním._