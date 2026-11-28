---
title: "Zmenšování kontraktů v boji proti limitu velikosti kontraktu"
description: "Co můžete udělat, abyste zabránili tomu, že vaše chytré kontrakty budou příliš velké?"
author: Markus Waas
lang: cs
tags: ["Solidity", "chytré kontrakty", "úložiště"]
skill: intermediate
breadcrumb: "Zmenšování kontraktů"
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## Proč existuje limit? {#why-is-there-a-limit}

Dne [22. listopadu 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon) zavedl hard fork Spurious Dragon [EIP-170](https://eips.ethereum.org/EIPS/eip-170), který přidal limit velikosti chytrého kontraktu na 24 576 bajtů (24 KiB). Pro vás jako vývojáře v Solidity to znamená, že když do svého kontraktu přidáváte další a další funkce, v určitém okamžiku dosáhnete limitu a kompilátor vás upozorní:

`Warning: Contract code size is 25000 bytes and exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

Podobné varování existuje pro kód nasazení (initcode), který [EIP-3860](https://eips.ethereum.org/EIPS/eip-3860) omezil na 49 152 bajtů v aktualizaci Šanghaj.

Limit není trvalý. [EIP-7954](https://eips.ethereum.org/EIPS/eip-7954) jej zvyšuje na 65 536 bajtů (64 KiB) a limit initcode na 131 072 bajtů, a je naplánován pro [aktualizaci Glamsterdam](/roadmap/glamsterdam/). Dokud se tato aktualizace neaktivuje v síti, do které nasazujete, platí tam limit 24 576 bajtů, a i poté zůstávají menší kontrakty levnější na nasazení a snazší na audit.

Tento limit byl zaveden, aby se zabránilo útokům typu denial-of-service (DOS). Jakékoli volání kontraktu je z hlediska gasu relativně levné. Dopad volání kontraktu na uzly Etherea se však neúměrně zvyšuje v závislosti na velikosti kódu volaného kontraktu (čtení kódu z disku, předzpracování kódu, přidávání dat do Merkleova důkazu). Kdykoli nastane situace, kdy útočník potřebuje málo zdrojů k tomu, aby ostatním přidělal spoustu práce, vzniká potenciál pro DOS útoky.

Původně to byl menší problém, protože jedním přirozeným limitem velikosti kontraktu je limit plynu bloku. Kontrakt musí být samozřejmě nasazen v rámci transakce, která obsahuje veškerý bajtkód kontraktu. Pokud do bloku zahrnete pouze tuto jednu transakci, můžete spotřebovat všechen tento gas, ale není nekonečný. Dnes je limit plynu bloku desítky milionů gasu a validátoři jej několikrát zvýšili, takže sám o sobě by umožňoval velmi velké kontrakty. Od [aktualizace Fusaka](/roadmap/fusaka/) je navíc jedna transakce omezena na 16 777 216 gasu ([EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)), ale to je stále mnohem více, než kolik stojí nasazení 24 KiB kontraktu, a proto je nutný explicitní limit velikosti.

V následujícím textu se podíváme na některé metody seřazené podle jejich potenciálního dopadu. Přemýšlejte o tom jako o hubnutí. Nejlepší strategií, jak dosáhnout cílové hmotnosti (v našem případě 24 kb), je zaměřit se nejprve na metody s velkým dopadem. Ve většině případů vás tam dostane jen úprava jídelníčku, ale někdy potřebujete trochu víc. Pak můžete přidat nějaké cvičení (střední dopad) nebo dokonce doplňky stravy (malý dopad).

## Velký dopad {#big-impact}

### Rozdělte své kontrakty {#separate-your-contracts}

Toto by měl být vždy váš první přístup. Jak můžete kontrakt rozdělit na několik menších? Obecně vás to nutí vymyslet pro vaše kontrakty dobrou architekturu. Z hlediska čitelnosti kódu jsou vždy preferovány menší kontrakty. Při rozdělování kontraktů si položte následující otázky:

- Které funkce patří k sobě? Každá sada funkcí by mohla být nejlepší ve vlastním kontraktu.
- Které funkce nevyžadují čtení stavu kontraktu nebo jen jeho specifické podmnožiny?
- Můžete oddělit úložiště a funkcionalitu?

### Knihovny {#libraries}

Jedním z jednoduchých způsobů, jak přesunout kód funkcionality pryč od úložiště, je použití [knihovny](https://docs.soliditylang.org/en/latest/contracts.html#libraries). Nedeklarujte funkce knihovny jako interní, protože ty budou během kompilace [přidány přímo do kontraktu](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking). Pokud ale použijete veřejné funkce, budou se ve skutečnosti nacházet v samostatném kontraktu knihovny. Zvažte použití [using for](https://docs.soliditylang.org/en/latest/contracts.html#using-for), aby bylo používání knihoven pohodlnější.

### Proxy {#proxies}

Pokročilejší strategií by byl proxy systém. Knihovny na pozadí používají `DELEGATECALL`, což jednoduše provede funkci jiného kontraktu se stavem volajícího kontraktu. Podívejte se na [aktualizaci chytrých kontraktů](/developers/docs/smart-contracts/upgrading/), kde se dozvíte více o proxy systémech. Poskytují vám více funkcí, např. umožňují aktualizovatelnost, ale také přidávají spoustu složitosti. Nepřidával bych je jen kvůli zmenšení velikosti kontraktů, pokud to z nějakého důvodu není vaše jediná možnost.

## Střední dopad {#medium-impact}

### Odstraňte funkce {#remove-functions}

Toto by mělo být zřejmé. Funkce docela dost zvětšují velikost kontraktu.

- **Externí**: Často přidáváme spoustu view funkcí z důvodu pohodlí. To je naprosto v pořádku, dokud nenarazíte na limit velikosti. Pak byste měli opravdu zvážit odstranění všech kromě těch naprosto nezbytných.
- **Interní**: Můžete také odstranit interní/privátní funkce a jednoduše vložit kód přímo (inline), pokud je funkce volána pouze jednou.

### Vyhněte se dalším proměnným {#avoid-additional-variables}

```solidity
struct MyStruct {
    address addr1;
    address addr2;
}

mapping(uint => MyStruct) myStructs;

function get(uint id) public view returns (address, address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) public view returns (address, address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

Jednoduchá změna, jako je tato, znamenala v době psaní tohoto článku rozdíl **0,28 kb**. Přesná úspora závisí na verzi vašeho kompilátoru a nastavení (se Solidity 0.8.37 je to asi 0,1 kb bez optimalizátoru a mnohem méně s ním), takže vždy měřte. Je pravděpodobné, že ve svých kontraktech najdete mnoho podobných situací a ty se mohou nasčítat do významných hodnot.

### Zkraťte chybové zprávy {#shorten-error-message}

Dlouhé zprávy při zvrácení (revert) a zejména mnoho různých zpráv při zvrácení může kontrakt nafouknout. Místo toho použijte krátké chybové kódy a dekódujte je ve svém kontraktu. Dlouhá zpráva by se mohla stát mnohem kratší:

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");
```

```solidity
require(msg.sender == owner, "OW1");
```

### Používejte vlastní chyby místo chybových zpráv {#use-custom-errors-instead-of-error-messages}

Vlastní chyby (custom errors) byly představeny v [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). Jsou skvělým způsobem, jak zmenšit velikost vašich kontraktů, protože jsou kódovány v ABI jako selektory (stejně jako funkce).

```solidity
error Unauthorized();

function doSomething() public view {
    if (msg.sender != owner) {
        revert Unauthorized();
    }
}
```

### Zvažte nízkou hodnotu běhů (runs) v optimalizátoru {#consider-a-low-run-value-in-the-optimizer}

Můžete také změnit nastavení optimalizátoru. Výchozí hodnota 200 znamená, že se snaží optimalizovat bajtkód tak, jako by byla funkce volána 200krát. Pokud ji změníte na 1, v podstatě řeknete optimalizátoru, aby optimalizoval pro případ, že se každá funkce spustí pouze jednou. Funkce optimalizovaná pro spuštění pouze jednou znamená, že je optimalizována pro samotné nasazení. Uvědomte si, že **to zvyšuje [náklady na gas](/developers/docs/gas/) za spouštění funkcí**, takže to možná nebudete chtít udělat. Pokud kompilujete se zapnutým `viaIR`, zkontrolujte velikost s ním a bez něj, protože generátor kódu založený na IR může produkovat znatelně odlišné velikosti bajtkódu. Podrobnosti najdete v [možnostech optimalizátoru](https://docs.soliditylang.org/en/latest/using-the-compiler.html#optimizer-options).

## Malý dopad {#small-impact}

### Vyhněte se předávání struktur (structs) do funkcí {#avoid-passing-structs-to-functions}

Pokud používáte [ABI coder v2](https://docs.soliditylang.org/en/latest/layout-of-source-files.html#abi-coder-pragma) (výchozí od Solidity 0.8.0), může pomoci nepředávat do funkce struktury (structs). Místo předávání parametru jako struktury předejte požadované parametry přímo. V tomto příkladu jsme ušetřili dalších **0,1 kb**.

```solidity
function get(uint id) public view returns (address, address) {
    return _get(myStructs[id]);
}

function _get(MyStruct memory myStruct) private pure returns (address, address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) public view returns (address, address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private pure returns (address, address) {
    return (addr1, addr2);
}
```

### Deklarujte správnou viditelnost pro funkce a proměnné {#declare-correct-visibility-for-functions-and-variables}

- Funkce nebo proměnné, které jsou volány pouze zvenčí? Deklarujte je jako `external` místo `public`.
- Funkce nebo proměnné volané pouze zevnitř kontraktu? Deklarujte je jako `private` nebo `internal` místo `public`.

### Odstraňte modifikátory {#remove-modifiers}

Modifikátory (modifiers), zejména pokud jsou používány intenzivně, mohou mít významný dopad na velikost kontraktu. Zvažte jejich odstranění a místo nich použijte funkce.

```solidity
modifier checkStuff() {
    require(msg.sender == owner, "OW1");
    _;
}

function doSomething() public checkStuff {}
```

```solidity
function checkStuff() private view {
    require(msg.sender == owner, "OW1");
}

function doSomething() public view {
    checkStuff();
}
```

Tyto tipy by vám měly pomoci výrazně zmenšit velikost kontraktu. Ještě jednou nemohu dostatečně zdůraznit, vždy se zaměřte na rozdělení kontraktů, pokud je to možné, pro dosažení největšího dopadu.
