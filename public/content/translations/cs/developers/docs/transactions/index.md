---
title: Transakce
description: "Přehled transakcí na Ethereu – jak fungují, jejich datová struktura a jak je odesílat prostřednictvím aplikace."
lang: cs
---

Transakce jsou kryptograficky podepsané instrukce z účtů. Účet iniciuje transakci za účelem aktualizace stavu [sítě Ethereum](/). Nejjednodušší transakcí je převod ETH z jednoho účtu na druhý.

## Předpoklady {#prerequisites}

Pro lepší pochopení této stránky doporučujeme nejprve si přečíst o [účtech](/developers/docs/accounts/) a náš [úvod do Etherea](/developers/docs/intro-to-ethereum/).

## Co je to transakce? {#whats-a-transaction}

Transakce na Ethereu označuje akci iniciovanou externě vlastněným účtem (externally-owned account, EOA), jinými slovy účtem spravovaným člověkem, nikoli kontraktem. Pokud například Bob pošle Alici 1 ETH, Bobův účet musí být zatížen a účet Alice musí být připsán. Tato akce měnící stav probíhá v rámci transakce.

![Diagram showing a transaction cause state change](./tx.png)
_Diagram upraven podle [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Transakce, které mění stav EVM, musí být vysílány do celé sítě. Jakýkoli uzel může vysílat požadavek na provedení transakce v EVM; poté validátor transakci provede a rozšíří výslednou změnu stavu do zbytku sítě.

Transakce vyžadují poplatek a musí být zahrnuty do ověřeného bloku. Abychom tento přehled zjednodušili, poplatky za plyn (gas fees) a validaci probereme jinde.

Odeslaná transakce obsahuje následující informace:

- `from` – adresa odesílatele, který bude transakci podepisovat. Bude se jednat o externě vlastněný účet, protože kontraktové účty nemohou odesílat transakce.
- `to` – přijímací adresa (pokud jde o externě vlastněný účet, transakce provede převod hodnoty. Pokud jde o kontraktový účet, transakce spustí kód kontraktu).
- `signature` – identifikátor odesílatele. Generuje se, když soukromý klíč odesílatele podepíše transakci a potvrdí, že odesílatel tuto transakci autorizoval.
- `nonce` – sekvenčně se zvyšující počítadlo, které udává číslo transakce z daného účtu.
- `value` – množství ETH k převodu od odesílatele k příjemci (vyjádřeno ve Wei, kde 1 ETH se rovná 1e+18 Wei).
- `input data` – volitelné pole pro zahrnutí libovolných dat.
- `gasLimit` – maximální množství jednotek gasu, které může transakce spotřebovat. [EVM](/developers/docs/evm/opcodes) specifikuje jednotky gasu požadované pro každý výpočetní krok.
- `maxPriorityFeePerGas` – maximální cena spotřebovaného gasu, která má být zahrnuta jako prioritní poplatek validátorovi.
- `maxFeePerGas` – maximální poplatek za jednotku gasu, který je odesílatel ochoten za transakci zaplatit (zahrnuje `baseFeePerGas` a `maxPriorityFeePerGas`).

Gas je odkaz na výpočetní výkon potřebný ke zpracování transakce validátorem. Uživatelé musí za tento výpočet zaplatit poplatek. `gasLimit` a `maxPriorityFeePerGas` určují maximální transakční poplatek placený validátorovi. [Více o gasu](/developers/docs/gas/).

Objekt transakce bude vypadat zhruba takto:

```js
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  maxFeePerGas: "300",
  maxPriorityFeePerGas: "10",
  nonce: "0",
  value: "10000000000"
}
```

Objekt transakce však musí být podepsán pomocí soukromého klíče odesílatele. To dokazuje, že transakce mohla pocházet pouze od odesílatele a nebyla odeslána podvodně.

Tento proces podepisování obstará klient Etherea, jako je Go Ethereum (Geth).

Příklad volání [JSON-RPC](/developers/docs/apis/json-rpc):

```json
{
  "id": 2,
  "jsonrpc": "2.0",
  "method": "account_signTransaction",
  "params": [
    {
      "from": "0x1923f626bb8dc025849e00f99c25fe2b2f7fb0db",
      "gas": "0x55555",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "input": "0xabcd",
      "nonce": "0x0",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234"
    }
  ]
}
```

Příklad odpovědi:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "raw": "0xf88380018203339407a565b7ed7d7a678680a4c162885bedbb695fe080a44401a6e4000000000000000000000000000000000000000000000000000000000000001226a0223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20ea02aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
    "tx": {
      "nonce": "0x0",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "gas": "0x55555",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234",
      "input": "0xabcd",
      "v": "0x26",
      "r": "0x223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20e",
      "s": "0x2aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
      "hash": "0xeba2df809e7a612a0a0d444ccfa5c839624bdc00dd29e3340d46df3870f8a30e"
    }
  }
}
```

- `raw` je podepsaná transakce ve formátu kódování [Recursive Length Prefix (RLP)](/developers/docs/data-structures-and-encoding/rlp).
- `tx` je podepsaná transakce ve formátu JSON.

Pomocí hashe podpisu lze kryptograficky dokázat, že transakce pochází od odesílatele a byla odeslána do sítě.

### Datové pole {#the-data-field}

Drtivá většina transakcí přistupuje ke kontraktu z externě vlastněného účtu.
Většina kontraktů je napsána v jazyce Solidity a interpretuje své datové pole v souladu s [aplikačním binárním rozhraním (application binary interface, ABI)](/glossary/#abi).

První čtyři bajty určují, která funkce se má zavolat, pomocí hashe názvu funkce a jejích argumentů.
Někdy můžete funkci identifikovat ze selektoru pomocí [této databáze](https://www.4byte.directory/signatures/).

Zbytek dat volání (calldata) tvoří argumenty, [zakódované podle specifikací ABI](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Podívejme se například na [tuto transakci](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1).
Kliknutím na **Click to see More** (Klikněte pro zobrazení více) zobrazíte data volání.

Selektor funkce je `0xa9059cbb`. Existuje několik [známých funkcí s tímto podpisem](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb).
V tomto případě byl [zdrojový kód kontraktu](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code) nahrán na Etherscan, takže víme, že se jedná o funkci `transfer(address,uint256)`.

Zbytek dat je:

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

Podle specifikací ABI se celočíselné hodnoty (jako jsou adresy, což jsou 20bajtová celá čísla) objevují v ABI jako 32bajtová slova, zepředu doplněná nulami.
Takže víme, že adresa `to` je [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279).
`value` je 0x3b0559f4 = 990206452.

### Deskriptory transakcí {#transaction-descriptors}

Protože datové pole obsahuje neprůhledné hexadecimální bajty, může být extrémně obtížné ověřit, jakou akci transakce skutečně provede. Tuto zranitelnost „slepého podepisování“ (blind signing) řeší **[jasné podepisování (Clear Signing)](https://clearsigning.org/)** pomocí [deskriptorů transakcí](https://eips.ethereum.org/EIPS/eip-7730) (definovaných v ERC-7730).  

Specifikace ERC-7730 používá deskriptory transakcí (často strukturované jako soubory JSON) k obohacení dat nalezených v ABI a strukturovaných zprávách, jako jsou data volání (calldata) transakcí EVM, zprávy EIP-712 a uživatelské operace (User Operations) EIP-4337. Vývojáři používají tyto deskriptory k mapování specifických proměnných transakce přímo do formátovacích šablon, čímž zajišťují, že podkladová data zůstanou pro aplikace strojově čitelná.

Na frontendu peněženky využívají tento kontext formátování k překladu neprůhledného bajtkódu do jasných, lidsky čitelných informací. Automatickým překladem hodnot, jako jsou adresy tokenů, na rozpoznávané tickery nebo částek na desetinná čísla, se uživatelům před podepsáním zobrazí srozumitelné shrnutí přesného záměru transakce (např. „Swap 1000 USDC za alespoň 0.25 WETH“).

## Typy transakcí {#types-of-transactions}

Na Ethereu existuje několik různých typů transakcí:

- Běžné transakce: transakce z jednoho účtu na druhý.
- Transakce nasazení kontraktu: transakce bez adresy „to“ (příjemce), kde se datové pole používá pro kód kontraktu.
- Provedení kontraktu: transakce, která interaguje s nasazeným chytrým kontraktem. V tomto případě je adresa „to“ adresou chytrého kontraktu.

### O gasu {#on-gas}

Jak již bylo zmíněno, provedení transakcí stojí [gas](/developers/docs/gas/). Jednoduché transakce převodu vyžadují 21 000 jednotek gasu.

Aby tedy Bob mohl poslat Alici 1 ETH při `baseFeePerGas` (základním poplatku) 190 Gwei a `maxPriorityFeePerGas` (prioritním poplatku) 10 Gwei, bude muset zaplatit následující poplatek:

```
(190 + 10) * 21000 = 4 200 000 Gwei
--nebo--
0,0042 ETH
```

Bobův účet bude zatížen částkou **-1,0042 ETH** (1 ETH pro Alici + 0,0042 ETH na poplatcích za plyn).

Na účet Alice bude připsáno **+1,0 ETH**.

Základní poplatek bude spálen **-0,00399 ETH**.

Validátor si ponechá prioritní poplatek **+0,000210 ETH**.


![Diagram showing how unused gas is refunded](./gas-tx.png)
_Diagram upraven podle [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Veškerý gas, který nebyl v transakci využit, se vrací na uživatelský účet.

### Interakce s chytrými kontrakty {#smart-contract-interactions}

Gas je vyžadován pro jakoukoli transakci, která zahrnuje chytrý kontrakt.

Chytré kontrakty mohou také obsahovat funkce známé jako [`view`](https://docs.soliditylang.org/en/latest/contracts.html#view-functions) nebo [`pure`](https://docs.soliditylang.org/en/latest/contracts.html#pure-functions), které nemění stav kontraktu. Volání těchto funkcí z EOA proto nebude vyžadovat žádný gas. Základním voláním RPC pro tento scénář je [`eth_call`](/developers/docs/apis/json-rpc#eth_call).

Na rozdíl od přístupu pomocí `eth_call` jsou tyto funkce `view` nebo `pure` také běžně volány interně (tj. ze samotného kontraktu nebo z jiného kontraktu), což už gas stojí.

## Životní cyklus transakce {#transaction-lifecycle}

Jakmile je transakce odeslána, stane se následující:

1. Kryptograficky se vygeneruje hash transakce:
   `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. Transakce je poté vysílána do sítě a přidána do transakčního poolu, který se skládá ze všech ostatních čekajících síťových transakcí.
3. Validátor musí vaši transakci vybrat a zahrnout ji do bloku, aby ji ověřil a považoval za „úspěšnou“.
4. Postupem času bude blok obsahující vaši transakci povýšen na „ospravedlněný“ (justified) a poté „finalizováno“ (finalized). Tato povýšení dávají mnohem větší jistotu, že vaše transakce byla úspěšná a nikdy nebude změněna. Jakmile je blok „finalizováno“, mohl by být změněn pouze útokem na úrovni sítě, který by stál mnoho miliard dolarů.

## Vizuální ukázka {#a-visual-demo}

Podívejte se, jak vás Austin provede transakcemi, gasem a těžbou.

<VideoWatch slug="transactions-eth-build" />

## Typovaná obálka transakce {#typed-transaction-envelope}

Ethereum mělo původně jeden formát pro transakce. Každá transakce obsahovala nonce, cenu plynu (gas price), limit plynu (gas limit), adresu příjemce (to), hodnotu (value), data, v, r a s. Tato pole jsou [zakódována pomocí RLP](/developers/docs/data-structures-and-encoding/rlp/), aby vypadala nějak takto:

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

Ethereum se vyvinulo tak, aby podporovalo více typů transakcí, což umožňuje implementaci nových funkcí, jako jsou seznamy přístupů (access lists) a [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), aniž by to ovlivnilo starší formáty transakcí.

Toto chování umožňuje [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718). Transakce jsou interpretovány jako:

`TransactionType || TransactionPayload`

Kde jsou pole definována jako:

- `TransactionType` – číslo mezi 0 a 0x7f, celkem tedy 128 možných typů transakcí.
- `TransactionPayload` – libovolné pole bajtů definované typem transakce.

Na základě hodnoty `TransactionType` lze transakci klasifikovat jako:

1. **Transakce typu 0 (Legacy):** Původní formát transakcí používaný od spuštění Etherea. Neobsahují funkce z [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), jako jsou dynamické výpočty poplatků za plyn nebo seznamy přístupů pro chytré kontrakty. Starší (legacy) transakce postrádají specifickou předponu označující jejich typ v serializované podobě a při použití kódování [Recursive Length Prefix (RLP)](/developers/docs/data-structures-and-encoding/rlp) začínají bajtem `0xf8`. Hodnota TransactionType pro tyto transakce je `0x0`.

2. **Transakce typu 1:** Tyto transakce, představené v [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) jako součást [aktualizace Berlín](/ethereum-forks/#berlin) na Ethereu, obsahují parametr `accessList`. Tento seznam specifikuje adresy a klíče úložiště, ke kterým transakce očekává přístup, což pomáhá potenciálně snížit náklady na [gas](/developers/docs/gas/) u složitých transakcí zahrnujících chytré kontrakty. Změny trhu s poplatky podle EIP-1559 nejsou v transakcích typu 1 zahrnuty. Transakce typu 1 také obsahují parametr `yParity`, který může být buď `0x0` nebo `0x1`, což indikuje paritu hodnoty y podpisu secp256k1. Jsou identifikovány tím, že začínají bajtem `0x01`, a jejich hodnota TransactionType je `0x1`.

3. **Transakce typu 2**, běžně označované jako transakce EIP-1559, jsou transakce představené v [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) v rámci aktualizace London (London Upgrade) na Ethereu. Staly se standardním typem transakcí v síti Ethereum. Tyto transakce zavádějí nový mechanismus trhu s poplatky, který zlepšuje předvídatelnost rozdělením transakčního poplatku na základní poplatek a prioritní poplatek. Začínají bajtem `0x02` a obsahují pole jako `maxPriorityFeePerGas` a `maxFeePerGas`. Transakce typu 2 jsou nyní výchozí díky své flexibilitě a efektivitě, a jsou obzvláště oblíbené v obdobích vysokého přetížení sítě pro svou schopnost pomoci uživatelům předvídatelněji spravovat transakční poplatky. Hodnota TransactionType pro tyto transakce je `0x2`.

4. **Transakce typu 3 (Blob)** byly představeny v [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) jako součást [aktualizace Dencun](/ethereum-forks/#dencun) na Ethereu. Tyto transakce jsou navrženy tak, aby efektivněji zpracovávaly data typu „blob“ (Binary Large Objects), což přináší výhody zejména pro rollupy na vrstvě 2 (L2) tím, že poskytují způsob, jak odesílat data do sítě Ethereum s nižšími náklady. Blob transakce obsahují další pole, jako jsou `blobVersionedHashes`, `maxFeePerBlobGas` a `blobGasPrice`. Začínají bajtem `0x03` a jejich hodnota TransactionType je `0x3`. Blob transakce představují významné zlepšení v dostupnosti dat a možnostech škálování Etherea.

5. **Transakce typu 4** byly představeny v [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) jako součást aktualizace [Pectra](/roadmap/pectra/) na Ethereu. Tyto transakce jsou navrženy tak, aby byly dopředně kompatibilní s abstrakcí účtu. Umožňují EOA dočasně se chovat jako kontraktové účty, aniž by byla ohrožena jejich původní funkčnost. Obsahují parametr `authorization_list`, který specifikuje chytrý kontrakt, na který EOA deleguje svou autoritu. Po transakci bude mít pole kódu EOA adresu delegovaného chytrého kontraktu.

## Další čtení {#further-reading}

- [EIP-2718: Typed Transaction Envelope](https://eips.ethereum.org/EIPS/eip-2718)

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_

## Související témata {#related-topics}

- [Účty](/developers/docs/accounts/)
- [Virtuální stroj Etherea (EVM)](/developers/docs/evm/)
- [Gas](/developers/docs/gas/)