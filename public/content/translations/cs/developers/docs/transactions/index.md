---
title: Transakce
description: Přehled transakcí v síti Ethereum – jak fungují, jaká je jejich datová struktura a jak je odeslat prostřednictvím aplikace.
lang: cs
---

Transakce jsou kryptograficky podepsané instrukce poslané z účtů. Účet zahájí transakci, aby aktualizoval stav sítě Ethereum. Nejjednodušší transakcí je převod ETH z jednoho účtu na druhý.

## Předpoklady {#prerequisites}

Abyste této stránce lépe porozuměli, doporučujeme vám si nejprve přečíst sekci [Účty](/developers/docs/accounts/) a náš [úvod do Etherea](/developers/docs/intro-to-ethereum/).

## Co je to transakce? {#whats-a-transaction}

Transakce na Ethereu odkazuje na akci zahájenou externě vlastněným účtem, jinými slovy účtem spravovaným člověkem, nikoliv kontraktem. Např. pokud Bob pošle Alici 1 ETH, zůstatek na Bobově účtu musí být snížen a Alicin musí být navýšen. Tato akce mění stav sítě a probíhá v rámci transakce.

![Diagram ukazující, jak transakce způsobí změnu stavu](./tx.png) _Diagram převzat z [ilustrace Ethereum EVM](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Transakce, které mění stav EVM, musí být posílány do celé sítě. Jakýkoliv uzel může vyslat požadavek na provedení transakce na EVM. Poté validátor provede transakci a výslednou změnu stavu sdílí do zbytku sítě.

Transakce vyžadují poplatek a musí být zahrnuty do validovaného bloku. Abychom tento přehled zjednodušili, poplatkům za palivo a validaci se věnujeme jinde.

Odeslaná transakce obsahuje následující informace:

- `from` – adresa odesílatele, který transakci podepíše. Toto bude externě vlastněný účet, protože kontraktové účty nemohou odesílat transakce.
- `to` – adresa příjemce. Pokud jde o externě vlastněný účet, transakce převede hodnotu. Pokud jde o kontraktový účet, transakce vykoná kód kontraktu.
- `signature` – podpis, který je identifikátorem odesílatele. Tento identifikátor je vygenerován, když odesílatelův privátní klíč podepíše transakci a potvrdí, že odesílatel tuto transakci autorizoval.
- `nonce` – postupně se zvyšující čítač, který označuje číslo transakce z účtu.
- `value` – množství ETH, které má být převedeno od odesílatele k příjemci (denominováno ve WEI, kde 1 ETH odpovídá 1e+18 wei).
- `input data` – volitelné pole pro přidání libovolných dat.
- `gasLimit` – maximální množství jednotek paliva, které může být transakcí spotřebováno. [EVM](/developers/docs/evm/opcodes) specifikuje jednotky paliva potřebné pro každý výpočetní krok.
- `maxPriorityFeePerGas` – maximální cena spotřebovaného paliva, která bude zahrnuta jako spropitné pro validátora.
- `maxFeePerGas` – maximální poplatek za jednotku paliva, který je uživatel ochoten zaplatit za transakci (včetně `baseFeePerGas` a `maxPriorityFeePerGas`).

Palivo reprezentuje výpočetní výkon potřebný k provedení transakce validátorem. Uživatelé musí za tento výpočet zaplatit poplatek. `gasLimit` a `maxPriorityFeePerGas` určují maximální transakční poplatek zaplacený validátorovi. [Další informace o palivu](/developers/docs/gas/).

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

Transakční objekt však musí být podepsán pomocí privátního klíče odesílatele. Tím se prokáže, že transakce mohla být odeslána pouze odesílatelem a nebyla odeslána podvodně.

Ethereum klient, jako je Geth, se o proces podepisování postará.

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

Ukázková odpověď:

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

- `raw` je podepsaná transakce v kódovaném formátu [Recursive Length Prefix (RLP)](/developers/docs/data-structures-and-encoding/rlp).
- `tx` je podepsaná transakce ve formátu JSON.

S hashem podpisu může být transakce kryptograficky ověřena jako pocházející od odesílatele a odeslána do sítě.

### Datové pole {#the-data-field}

Většina transakcí putuje do kontraktu z externě vlastněného účtu. Většina kontraktů je napsána v jazyce Solidity a interpretuje své datové pole v souladu se specifikací [aplikačního binárního rozhraní (ABI)](/glossary/#abi).

První čtyři bajty specifikují, která funkce se má zavolat, pomocí hashe názvu funkce a jejích argumentů. Někdy můžete identifikovat funkci pomocí selektoru s využitím [této databáze](https://www.4byte.directory/signatures/).

Zbytek calldat jsou argumenty, [zakódované podle specifikace ABI](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Např. se podívejme na [tuto transakci](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1). K zobrazení calldat použijte možnost **„Click to see More“**.

Funkční selektor je `0xa9059cbb`. Existuje několik [známých funkcí s tímto podpisem](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb). V tomto případě byl [zdrojový kód kontraktu](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code) nahrán na Etherscan, takže víme, že funkce je `transfer(address,uint256)`.

Zbytek dat je:

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

Podle specifikací ABI se celočíselné hodnoty (jako jsou adresy, což jsou 20bajtová celá čísla) zobrazují v ABI jako 32bajtová slova, doplněná nulami na začátku. Takže víme, že adresa `to` je [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279). `value` je 0x3b0559f4 = 990206452.

## Typy transakcí {#types-of-transactions}

Na Ethereu existuje několik různých typů transakcí:

- Běžné transakce: Převody z jednoho účtu na druhý.
- Transakce sloužící k nasazení kontraktu: Transakce bez adresy „to“, do datového pole se vkládá kód kontraktu.
- Exekuce kontraktu: Transakce, která interaguje s již nasazeným chytrým kontraktem. V tomto případě je adresa „to“ adresou chytrého kontraktu.

### O palivu {#on-gas}

Jak bylo zmíněno, vykonání transakce stojí [palivo](/developers/docs/gas/). Jednoduché převodní transakce vyžadují 21 000 jednotek paliva.

Takže pokud Bob chce poslat Alici 1 ETH s `baseFeePerGas` 190 gwei a `maxPriorityFeePerGas` 10 gwei, bude muset zaplatit následující poplatek:

```
(190 + 10) * 21 000 = 4 200 000 gwei
--nebo--
0,0042 ETH
```

Zůstatek Bobova účtu bude snížen **o 1,0042 ETH** (1 ETH pro Alici + 0,0042 ETH na poplatky za palivo).

Zůstatek na Alicině účtu bude navýšen **o 1,0 ETH**.

Základní poplatek **0,00399 ETH** bude spálen.

Validátor si ponechá spropitné ve výši **0,000210 ETH**.


![Diagram ukazující vrácení nepoužitého paliva](./gas-tx.png) _Schéma převzato z [ilustrace Ethereum EVM](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Jakékoliv palivo, které nebude v transakci použito, bude vráceno na účet odesílatele.

### Interakce s chytrými kontrakty {#smart-contract-interactions}

Palivo je potřeba pro jakoukoliv transakci, která zahrnuje chytrý kontrakt.

Chytré kontrakty mohou také obsahovat funkce známé jako [`view`](https://docs.soliditylang.org/en/latest/contracts.html#view-functions) nebo [`pure`](https://docs.soliditylang.org/en/latest/contracts.html#pure-functions), které nemění stav kontraktu. Volání těchto funkcí z externě vlastněného účtu tedy nevyžaduje žádné palivo. Základní volání RPC pro tento scénář je [`eth_call`](/developers/docs/apis/json-rpc#eth_call).

Na rozdíl od volání pomocí `eth_call` jsou tyto funkce `view` nebo `pure` často volány interně (tj. z kontraktu samotného nebo z jiného kontraktu), což stojí palivo.

## Životní cyklus transakce {#transaction-lifecycle}

Jakmile je transakce odeslána, následuje tento proces:

1. Kryptograficky je vygenerován hash transakce: `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`.
2. Transakce je poté poslána do sítě a přidána do transakčního poolu obsahujícího všechny ostatní čekající transakce v síti.
3. Validátor musí vaši transakci vybrat a zahrnout ji do bloku, aby bylo možné ji ověřit a považovat za „úspěšnou“.
4. S postupem času bude blok obsahující vaši transakci označen jako „oprávněný“ a poté „finalizovaný“. Tato vylepšení znamenají mnohem větší jistotu, že vaše transakce byla úspěšná a nikdy nebude změněna. Jakmile je blok „finalizován“, mohl by být změněn pouze útokem na úrovni sítě, který by stál několik miliard dolarů.

## Vizuální ukázka {#a-visual-demo}

Na tomto videu vás Austin provede transakcemi, palivem a těžbou.

<YouTube id="er-0ihqFQB0" />

## Typizovaná transakční obálka {#typed-transaction-envelope}

Ethereum původně mělo pro transakce jen jeden formát. Každá transakce obsahovala pole nonce, gas price, gas limit, adresu to, value, data, v, r a s. Tato pole jsou [RLP-kódovaná](/developers/docs/data-structures-and-encoding/rlp/) a vypadají zhruba takto:

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

Ethereum se vyvinulo tak, aby podporovalo více typů transakcí a umožnilo implementaci nových funkcí, jako jsou seznamy přístupu a [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), aniž by to ovlivnilo starší formáty transakcí.

[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) toto chování umožňuje. Transakce jsou interpretovány takto:

`TransactionType || TransactionPayload`

Kde jsou pole definována jako:

- `TransactionType` – číslo mezi 0 a 0x7f, což umožňuje celkem 128 možných typů transakcí.
- `TransactionPayload` – libovolné pole bajtů definované typem transakce.

Na základě hodnoty `TransactionType` může být transakce klasifikována jako

1. **Transakce typu 0 (Legacy):** Původní formát transakce používaný od spuštění Etherea. Neobsahuje funkce z [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), jako je dynamický výpočet poplatků za palivo nebo seznamy přístupu pro chytré kontrakty. Legacy transakce nemají specifický prefix označující jejich typ ve svém serializovaném formátu, začínají bajtem `0xf8` při použití kódování [Recursive Length Prefix (RLP)](/developers/docs/data-structures-and-encoding/rlp). Hodnota TransactionType pro tyto transakce je `0x0`.

2. **Transakce typu 1**: Ty byly zavedeny v [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) jako součást [vylepšení Berlín](/history/#berlin) a zahrnují parametr `accessList`. Tento seznam specifikuje adresy a klíče úložiště, které by měla transakce kontaktovat, což může potenciálně snížit náklady na [palivo](/developers/docs/gas/) pro složité transakce zahrnující chytré kontrakty. Změny v tržním mechanismu poplatků podle EIP-1559 nejsou v transakcích typu 1 zahrnuty. Transakce typu 1 také obsahují parametr `yParity`, který může být buď `0x0` nebo `0x1`, což označuje paritu hodnoty y v podpisu secp256k1. Tyto transakce jsou identifikovány začátkem bajtu `0x01` a jejich hodnota TransactionType je `0x1`.

3. **Transakce typu 2**, běžně označovány jako transakce podle EIP-1559, byly zavedeny v [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) v rámci [vylepšení Londýn](/history/#london). Staly se standardním typem transakcí na Ethereu. Tyto transakce zavádějí nový mechanismus trhu s poplatky, který zlepšuje předvídatelnost rozdělením poplatku za transakci na základní poplatek a prioritní poplatek. Začínají bajtem `0x02` a zahrnují pole, jako je `maxPriorityFeePerGas` a `maxFeePerGas`. Transakce typu 2 jsou nyní výchozí díky své flexibilitě a efektivitě, zejména v obdobích vysokého zatížení sítě, protože uživatelům umožňují lépe plánovat poplatky za transakce. Hodnota TransactionType pro tyto transakce je `0x2`.



## Další informace {#further-reading}

- [EIP-2718: Typizovaná transakční obálka](https://eips.ethereum.org/EIPS/eip-2718)

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_

## Související témata {#related-topics}

- [Účty](/developers/docs/accounts/)
- [Virtuální stroj Ethereum (EVM)](/developers/docs/evm/)
- [Palivo](/developers/docs/gas/)
