---
title: Standard tokenu ERC-223
description: "Přehled standardu zaměnitelného tokenu ERC-223, jak funguje a srovnání s ERC-20."
lang: cs
---

## Úvod {#introduction}

### Co je ERC-223? {#what-is-erc223}

ERC-223 je standard pro zaměnitelné tokeny, podobný standardu ERC-20. Hlavním rozdílem je, že ERC-223 nedefinuje pouze API tokenu, ale také logiku pro převod tokenů od odesílatele k příjemci. Zavádí komunikační model, který umožňuje zpracovávat převody tokenů na straně příjemce.

### Rozdíly oproti ERC-20 {#erc20-differences}

ERC-223 řeší některá omezení ERC-20 a zavádí novou metodu interakce mezi kontraktem tokenu a kontraktem, který může tokeny přijímat. Existuje několik věcí, které jsou možné s ERC-223, ale ne s ERC-20:

- Zpracování převodu tokenů na straně příjemce: Příjemci mohou detekovat, že je vkládán token ERC-223.
- Odmítnutí nesprávně odeslaných tokenů: Pokud uživatel odešle tokeny ERC-223 na kontrakt, který nemá přijímat tokeny, kontrakt může transakci odmítnout, čímž zabrání ztrátě tokenů.
- Metadata v převodech: Tokeny ERC-223 mohou obsahovat metadata, což umožňuje připojit k transakcím tokenů libovolné informace.

## Předpoklady {#prerequisites}

- [Účty](/developers/docs/accounts)
- [Chytré kontrakty](/developers/docs/smart-contracts/)
- [Standardy tokenů](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Hlavní část {#body}

ERC-223 je standard tokenu, který implementuje API pro tokeny v rámci chytrých kontraktů. Deklaruje také API pro kontrakty, které mají přijímat tokeny ERC-223. Kontrakty, které nepodporují API příjemce ERC-223, nemohou přijímat tokeny ERC-223, což předchází chybám uživatelů.

Pokud chytrý kontrakt implementuje následující metody a události, může být nazýván kontraktem tokenu kompatibilním s ERC-223. Po nasazení bude zodpovědný za sledování vytvořených tokenů na Ethereu.

Kontrakt není povinen mít pouze tyto funkce a vývojář může do tohoto kontraktu přidat jakoukoli jinou funkci z různých standardů tokenů. Například funkce `approve` a `transferFrom` nejsou součástí standardu ERC-223, ale tyto funkce by mohly být implementovány, pokud by to bylo nutné.

Z [EIP-223](https://eips.ethereum.org/EIPS/eip-223):

### Metody {#methods}

Token ERC-223 musí implementovat následující metody:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

Kontrakt, který má přijímat tokeny ERC-223, musí implementovat následující metodu:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

Pokud jsou tokeny ERC-223 odeslány na kontrakt, který neimplementuje funkci `tokenReceived(..)`, pak musí převod selhat a tokeny nesmí být přesunuty ze zůstatku odesílatele.

### Události {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### Příklady {#examples}

API tokenu ERC-223 je podobné API ERC-20, takže z pohledu vývoje uživatelského rozhraní (UI) zde není žádný rozdíl. Jedinou výjimkou je, že tokeny ERC-223 nemusí mít funkce `approve` + `transferFrom`, protože ty jsou pro tento standard volitelné.

#### Příklady v Solidity {#solidity-example}

Následující příklad ukazuje, jak funguje základní kontrakt tokenu ERC-223:

```solidity
pragma solidity ^0.8.19;
abstract contract IERC223Recipient {
    function tokenReceived(address _from, uint _value, bytes memory _data) public virtual;
}
contract VeryBasicERC223Token {
    event Transfer(address indexed from, address indexed to, uint value, bytes data);
    string  private _name;
    string  private _symbol;
    uint8   private _decimals;
    uint256 private _totalSupply;
    mapping(address => uint256) private balances;
    function name() public view returns (string memory) { return _name; }
    function symbol() public view returns (string memory) {return _symbol; }
    function decimals() public view returns (uint8) { return _decimals; }
    function totalSupply() public view returns (uint256) { return _totalSupply; }
    function balanceOf(address _owner) public view returns (uint256) { return balances[_owner]; }
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(account) }
        return size > 0;
    }
    function transfer(address _to, uint _value, bytes calldata _data) public returns (bool success){
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _data);
        }
        emit Transfer(msg.sender, _to, _value, _data);
        return true;
    }
    function transfer(address _to, uint _value) public returns (bool success){
        bytes memory _empty = hex"00000000";
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _empty);
        }
        emit Transfer(msg.sender, _to, _value, _empty);
        return true;
    }
}
```

Nyní chceme, aby jiný kontrakt přijímal vklady `tokenA` za předpokladu, že tokenA je token ERC-223. Kontrakt musí přijímat pouze tokenA a odmítnout jakékoli jiné tokeny. Když kontrakt obdrží tokenA, musí vyvolat událost `Deposit()` a zvýšit hodnotu interní proměnné `deposits`.

Zde je kód:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // Jediný token, který chceme přijmout.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // Je důležité pochopit, že v rámci této funkce
        // msg.sender je adresa tokenu, který je přijímán,
        // msg.value  je vždy 0, protože kontrakt tokenu ve většině případů nevlastní ani neodesílá ether,
        // _from      je odesílatel převodu tokenu,
        // _value     je množství tokenů, které bylo vloženo.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## Často kladené dotazy {#faq}

### Co se stane, když na kontrakt odešleme nějaký tokenB? {#sending-tokens}

Transakce selže a převod tokenů se neuskuteční. Tokeny budou vráceny na adresu odesílatele.

### Jak můžeme provést vklad do tohoto kontraktu? {#contract-deposits}

Zavolejte funkci `transfer(address,uint256)` nebo `transfer(address,uint256,bytes)` tokenu ERC-223 a zadejte adresu `RecipientContract`.

### Co se stane, když na tento kontrakt převedeme token ERC-20? {#erc-20-transfers}

Pokud je token ERC-20 odeslán na `RecipientContract`, tokeny budou převedeny, ale převod nebude rozpoznán (nebude vyvolána žádná událost `Deposit()` a hodnota vkladů se nezmění). Nechtěné vklady ERC-20 nelze filtrovat ani jim zabránit.

### Co když chceme po dokončení vkladu tokenu spustit nějakou funkci? {#function-execution}

Existuje několik způsobů, jak to udělat. V tomto příkladu budeme postupovat metodou, díky které jsou převody ERC-223 identické s převody etheru:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // Jediný token, který chceme přijmout.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Zpracovat příchozí transakci a provést následné volání funkce.
    }
    function foo() public
    {
        emit Foo();
    }
    function bar(uint256 _someNumber) public
    {
        emit Bar(_someNumber);
    }
}
```

Když `RecipientContract` obdrží token ERC-223, kontrakt spustí funkci zakódovanou jako parametr `_data` transakce tokenu, identicky jako transakce etheru kódují volání funkcí jako `data` transakce. Pro více informací si přečtěte o [datovém poli](/developers/docs/transactions/#the-data-field).

Ve výše uvedeném příkladu musí být token ERC-223 převeden na adresu `RecipientContract` pomocí funkce `transfer(address,uin256,bytes calldata _data)`. Pokud bude parametr data `0xc2985578` (podpis funkce `foo()`), pak bude po přijetí vkladu tokenu vyvolána funkce foo() a bude spuštěna událost Foo().

Parametry mohou být zakódovány také v `data` převodu tokenu, například můžeme zavolat funkci bar() s hodnotou 12345 pro `_someNumber`. V tomto případě musí být `data` `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2`, kde `0x0423a132` je podpis funkce `bar(uint256)` a `00000000000000000000000000000000000000000000000000000000000004d2` je 12345 jako uint256.

## Omezení {#limitations}

Ačkoli ERC-223 řeší několik problémů zjištěných ve standardu ERC-20, není bez vlastních omezení:

- Adopce a kompatibilita: ERC-223 zatím není široce přijat, což může omezit jeho kompatibilitu s existujícími nástroji a platformami.
- Zpětná kompatibilita: ERC-223 není zpětně kompatibilní s ERC-20, což znamená, že stávající kontrakty a nástroje ERC-20 nebudou s tokeny ERC-223 fungovat bez úprav.
- Náklady na gas: Dodatečné kontroly a funkce v převodech ERC-223 mohou vést k vyšším nákladům na gas ve srovnání s transakcemi ERC-20.

## Další čtení {#further-reading}

- [EIP-223: Standard tokenu ERC-223](https://eips.ethereum.org/EIPS/eip-223)
- [Původní návrh ERC-223](https://github.com/ethereum/eips/issues/223)