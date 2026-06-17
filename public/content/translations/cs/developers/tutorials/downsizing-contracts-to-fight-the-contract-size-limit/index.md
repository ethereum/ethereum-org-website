---
title: "Zmenšování kontraktů v boji proti limitu velikosti kontraktu"
description: "Co můžete udělat, abyste zabránili tomu, že vaše chytré kontrakty budou příliš velké?"
author: Markus Waas
lang: cs
tags: ["solidity", "chytré kontrakty", "úložiště"]
skill: intermediate
breadcrumb: "Zmenšování kontraktů"
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## Proč existuje limit? {#why-is-there-a-limit}

Dne [22. listopadu 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon) zavedl hard fork Spurious Dragon [EIP-170](https://eips.ethereum.org/EIPS/eip-170), který přidal limit velikosti chytrého kontraktu na 24,576 kb. Pro vás jako vývojáře v Solidity to znamená, že když do svého kontraktu přidáváte stále více funkcí, v určitém okamžiku dosáhnete limitu a při nasazení uvidíte chybu:

`Warning: Contract code size exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

Tento limit byl zaveden, aby se zabránilo útokům typu odepření služby (denial-of-service, DOS). Jakékoli volání kontraktu je z hlediska gasu relativně levné. Dopad volání kontraktu na uzly Etherea se však neúměrně zvyšuje v závislosti na velikosti kódu volaného kontraktu (čtení kódu z disku, předzpracování kódu, přidání dat do Merkleova důkazu). Kdykoli nastane situace, kdy útočník potřebuje málo zdrojů k tomu, aby způsobil spoustu práce ostatním, vzniká potenciál pro DOS útoky.

Původně to byl menší problém, protože jedním z přirozených limitů velikosti kontraktu je limit plynu bloku. Je zřejmé, že kontrakt musí být nasazen v rámci transakce, která obsahuje veškerý bajtkód kontraktu. Pokud do bloku zahrnete pouze tuto jedinou transakci, můžete spotřebovat všechen tento gas, ale není nekonečný. Od [aktualizace London](/ethereum-forks/#london) se limit plynu bloku může pohybovat mezi 15 a 30 miliony jednotek v závislosti na poptávce v síti.

V následujícím textu se podíváme na některé metody seřazené podle jejich potenciálního dopadu. Přemýšlejte o tom jako o hubnutí. Nejlepší strategie, jak dosáhnout cílové váhy (v našem případě 24 kb), je zaměřit se nejprve na metody s velkým dopadem. Ve většině případů vás k cíli dovede pouhá úprava jídelníčku, ale někdy potřebujete trochu víc. Pak můžete přidat nějaké cvičení (střední dopad) nebo dokonce doplňky stravy (malý dopad).

## Velký dopad {#big-impact}

### Rozdělte své kontrakty {#separate-your-contracts}

Toto by měl být vždy váš první přístup. Jak můžete kontrakt rozdělit na několik menších? Obecně vás to nutí vymyslet pro vaše kontrakty dobrou architekturu. Z hlediska čitelnosti kódu jsou vždy preferovány menší kontrakty. Při rozdělování kontraktů si položte následující otázky:

- Které funkce patří k sobě? Každá sada funkcí by mohla být nejlepší ve vlastním kontraktu.
- Které funkce nevyžadují čtení stavu kontraktu nebo jen jeho specifické podmnožiny?
- Můžete oddělit úložiště a funkcionalitu?

### Knihovny {#libraries}

Jedním z jednoduchých způsobů, jak přesunout kód funkcionality pryč od úložiště, je použití [knihovny](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries). Nedeklarujte funkce knihovny jako interní, protože ty budou během kompilace [přidány přímo do kontraktu](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking). Pokud ale použijete veřejné funkce, budou se ve skutečnosti nacházet v samostatném kontraktu knihovny. Zvažte použití [using for](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for), aby bylo používání knihoven pohodlnější.

### Proxy {#proxies}

Pokročilejší strategií by byl proxy systém. Knihovny na pozadí používají `DELEGATECALL`, což jednoduše provede funkci jiného kontraktu se stavem volajícího kontraktu. Přečtěte si [tento článek na blogu](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2), kde se o proxy systémech dozvíte více. Poskytují vám více funkcí, např. umožňují aktualizovatelnost, ale také přidávají spoustu složitosti. Nepřidával bych je jen kvůli zmenšení velikosti kontraktů, pokud to z nějakého důvodu není vaše jediná možnost.

## Střední dopad {#medium-impact}

### Odstraňte funkce {#remove-functions}

Toto by mělo být zřejmé. Funkce docela dost zvětšují velikost kontraktu.

- **Externí**: Často přidáváme spoustu view funkcí z důvodu pohodlí. To je naprosto v pořádku, dokud nenarazíte na limit velikosti. Pak byste měli opravdu zvážit odstranění všech kromě těch naprosto nezbytných.
- **Interní**: Můžete také odstranit interní/privátní funkce a jednoduše vložit kód přímo (inline), pokud je funkce volána pouze jednou.

### Vyhněte se dalším proměnným {#avoid-additional-variables}

```solidity
function get(uint id) returns (address,address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns (address,address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

Taková jednoduchá změna znamená rozdíl **0,28 kb**. Je pravděpodobné, že ve svých kontraktech najdete mnoho podobných situací a ty se mohou nasčítat do významných hodnot.

### Zkraťte chybové zprávy {#shorten-error-message}

Dlouhé zprávy při zvrácení (revert) a zejména mnoho různých zpráv při zvrácení může kontrakt nafouknout. Místo toho použijte krátké chybové kódy a dekódujte je ve svém kontraktu. Dlouhá zpráva by se mohla stát mnohem kratší:

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");
```

```solidity
require(msg.sender == owner, "OW1");
```

### Používejte vlastní chyby místo chybových zpráv {#use-custom-errors-instead-of-error-messages}

Vlastní chyby (custom errors) byly zavedeny v [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). Jsou skvělým způsobem, jak zmenšit velikost vašich kontraktů, protože jsou kódovány v ABI jako selektory (stejně jako funkce).

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### Zvažte nízkou hodnotu běhů (runs) v optimalizátoru {#consider-a-low-run-value-in-the-optimizer}

Můžete také změnit nastavení optimalizátoru. Výchozí hodnota 200 znamená, že se snaží optimalizovat bajtkód tak, jako by byla funkce volána 200krát. Pokud ji změníte na 1, v podstatě řeknete optimalizátoru, aby optimalizoval pro případ, že se každá funkce spustí pouze jednou. Funkce optimalizovaná pro spuštění pouze jednou znamená, že je optimalizována pro samotné nasazení. Mějte na paměti, že **to zvyšuje [náklady na gas](/developers/docs/gas/) pro spouštění funkcí**, takže to možná nebudete chtít udělat.

## Malý dopad {#small-impact}

### Vyhněte se předávání struktur (structs) do funkcí {#avoid-passing-structs-to-functions}

Pokud používáte [ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2), může pomoci nepředávat do funkce struktury. Místo předávání parametru jako struktury předejte požadované parametry přímo. V tomto příkladu jsme ušetřili dalších **0,1 kb**.

```solidity
function get(uint id) returns (address,address) {
    return _get(myStruct);
}

function _get(MyStruct memory myStruct) private view returns(address,address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns(address,address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private view returns(address,address) {
    return (addr1, addr2);
}
```

### Deklarujte správnou viditelnost pro funkce a proměnné {#declare-correct-visibility-for-functions-and-variables}

- Funkce nebo proměnné, které jsou volány pouze zvenčí? Deklarujte je jako `external` místo `public`.
- Funkce nebo proměnné volané pouze zevnitř kontraktu? Deklarujte je jako `private` nebo `internal` místo `public`.

### Odstraňte modifikátory {#remove-modifiers}

Modifikátory, zejména pokud jsou používány intenzivně, mohou mít významný dopad na velikost kontraktu. Zvažte jejich odstranění a místo nich použijte funkce.

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

Tyto tipy by vám měly pomoci výrazně zmenšit velikost kontraktu. Ještě jednou nemohu dostatečně zdůraznit, vždy se zaměřte na rozdělení kontraktů, pokud je to možné, pro dosažení největšího dopadu.