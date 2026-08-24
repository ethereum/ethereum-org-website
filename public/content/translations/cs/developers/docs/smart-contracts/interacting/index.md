---
title: Interakce s chytrými kontrakty
description: Naučte se, jak číst z chytrých kontraktů a zapisovat do nich, pokud už jsou nasazené na Ethereu.
lang: cs
---

Ne vždy musíte psát a nasadit svůj vlastní chytrý kontrakt. Většinou budete jako vývojář chtít interagovat s chytrými kontrakty, které už do sítě Ethereum nasadil někdo jiný.

Tato stránka pokrývá dva základní způsoby interakce s chytrým kontraktem – **čtení** dat a **zápis** dat – a nástroje, které k obojímu potřebujete.

## Předpoklady {#prerequisites}

Měli byste rozumět:

- [Jak fungují chytré kontrakty](/developers/docs/smart-contracts/)
- [Účty na Ethereu a jak podepisují transakce](/developers/docs/accounts/)
- [Co je to transakce](/developers/docs/transactions/)

## Dva způsoby interakce s chytrým kontraktem {#two-ways}

Interakce s chytrým kontraktem spadá do dvou kategorií:

### Čtení z kontraktu {#reading-from-a-contract}

Čtení je operace **zdarma**, která nevytváří transakci a nemění žádný stav na blockchainu.

Když čtete z kontraktu, jednoduše se dotazujete na data, která už existují. Například:

- Kontrola zůstatku ERC-20 tokenu
- Čtení aktuální ceny z decentralizované burzy
- Zjištění vlastníka NFT

Protože čtení nemění stav, nestojí žádný [gas](/developers/docs/gas/) a může ho provést kdokoli bez potřeby ETH.

### Zápis do kontraktu {#writing-to-a-contract}

Zápis je operace **měnící stav**, která vyžaduje transakci a stojí gas.

Když zapisujete do kontraktu, spouštíte funkci, která mění stav blockchainu. Například:

- Převod tokenů
- Výměna tokenů na decentralizované burze
- Ražení NFT

Zápis vždy vyžaduje:

1. [Externě vlastněný účet (EOA)](/developers/docs/accounts/#types-of-account) s dostatkem ETH na gas
2. Transakci podepsanou soukromým klíčem účtu
3. Vytěžení transakce a její zahrnutí do bloku

Díky [abstrakci účtu](/roadmap/account-abstraction/) může zápisy iniciovat i účet chytrého kontraktu a paymaster může pokrýt gas jménem uživatele – takže EOA držící ETH není striktně vyžadován.

## Porozumění ABI kontraktu {#understanding-contract-abis}

Aby mohla vaše aplikace interagovat s chytrým kontraktem, musí vědět, *co* kontrakt umí. Zde přichází na řadu **Application Binary Interface (ABI)**.

ABI je JSON dokument, který popisuje:

- Každou funkci, kterou kontrakt nabízí (název, vstupy, výstupy)
- Každou událost, kterou může kontrakt vyvolat
- Jak kódovat a dekódovat data při komunikaci s kontraktem

Představte si ABI jako návod k použití kontraktu – bez něj vaše aplikace neví, jaké funkce existují nebo jaké parametry očekávají.

### Kde najít ABI kontraktu {#where-to-find-abis}

- **Ověřené kontrakty na Etherscanu** - [Etherscan](https://etherscan.io) automaticky zpřístupňuje ABI pro ověřený zdrojový kód
- **Od vývojáře** - mnoho projektů publikuje svá ABI ve své dokumentaci nebo v npm balíčcích
- **Vygenerování ze zdrojového kódu** - pokud máte zdrojový kód v Solidity, můžete ho [zkompilovat](/developers/docs/smart-contracts/compiling/) a ABI vytvořit

## Nástroje a knihovny pro interakci s kontrakty {#tools-and-libraries}

Vývojáři obvykle používají JavaScript/TypeScript knihovnu pro interakci s kontrakty z webové aplikace, backendu nebo skriptu.

### Klientské knihovny (JavaScript/TypeScript) {#client-libraries}

- **[Viem](https://viem.sh)** - Moderní, odlehčené TypeScript rozhraní pro Ethereum s prvotřídní typovou bezpečností
- **[ethers.js](https://docs.ethers.org/)** - Praxí prověřená knihovna pro interakci s blockchainem Ethereum
- **[Web3.js](https://web3js.org/)** - Původní JavaScript API pro Ethereum

### Backendové knihovny {#backend-libraries}

- **[ethers.js](https://docs.ethers.org/)** - Funguje také v Node.js pro serverové skripty a boty
- **[Web3.py](https://web3py.readthedocs.io/)** - Python knihovna pro interakci s Ethereem
- **[go-ethereum](https://geth.ethereum.org/docs/interact-with-geth)** - Oficiální Go knihovna od týmu Geth

### Příklad: čtení zůstatku tokenu pomocí Viem {#example-viem}

```ts
import { createPublicClient, http, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

// Adresa kontraktu USDC a ABI (částečné, pro balanceOf)
const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const abi = [{
  name: 'balanceOf',
  type: 'function',
  stateMutability: 'view',
  inputs: [{ name: 'account', type: 'address' }],
  outputs: [{ name: '', type: 'uint256' }],
}] as const

const client = createPublicClient({ chain: mainnet, transport: http() })

const balance = await client.readContract({
  address: USDC,
  abi,
  functionName: 'balanceOf',
  args: ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'], // vitalik.eth
})

console.log(formatUnits(balance, 6)) // USDC má 6 desetinných míst
```

### Příklad: odeslání transakce pomocí ethers.js {#example-ethers}

```js
const { ethers } = require('ethers')

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// ABI pro převod ERC-20
const abi = ['function transfer(address to, uint256 amount) returns (bool)']
const contract = new ethers.Contract(tokenAddress, abi, wallet)

const tx = await contract.transfer(recipient, ethers.parseUnits('10', 18))
await tx.wait() // počkat na vytěžení transakce
console.log(`Transferred! TX: ${tx.hash}`)
```

## Události a logy {#events-and-logs}

Chytré kontrakty mohou vyvolávat **události**, aby signalizovaly, že se něco stalo. Vaše aplikace může těmto událostem naslouchat a reagovat v reálném čase.

```ts
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

// Sledovat události USDC Transfer
const unwatch = client.watchEvent({
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  onLogs: (logs) => console.log(logs),
})
```

## Simulace transakcí {#simulating}

Před odesláním transakce ji můžete **simulovat**, abyste zjistili, zda by byla úspěšná – a viděli její návratovou hodnotu – bez utrácení gasu. To je užitečné pro včasné zachycení chyb a pro náhled výsledků.

Většina klientských knihoven to podporuje prostřednictvím `eth_call`:

```ts
// Pomocí Viem
const result = await client.simulateContract({
  address: contractAddress,
  abi,
  functionName: 'swap',
  args: [amountIn],
  account: userAddress,
})
```

## Peněženky a podepisování {#wallets-and-signing}

V decentralizované aplikaci (dapp) řeší podepisování uživatelova peněženka (jako MetaMask, Rainbow nebo WalletConnect). Soukromé klíče nespravujete přímo.

[Knihovny peněženek a nástroje pro připojení](/developers/docs/apis/javascript/) toto abstrahují, takže se můžete soustředit na budování logiky vaší aplikace.

## Související návody {#related-tutorials}

- [Volání chytrého kontraktu z JavaScriptu](/developers/tutorials/calling-a-smart-contract-from-javascript/)
- [Odesílání transakcí pomocí Web3.js a Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [Jak si zobrazit NFT ve své peněžence](/developers/tutorials/how-to-view-nft-in-metamask/)

## Další čtení {#further-reading}

- [Dokumentace Viem: Čtení a zápis do kontraktů](https://viem.sh/docs/contract/readContract)
- [Dokumentace ethers.js: Kontrakty](https://docs.ethers.org/v6/api/contract/)
- [Specifikace Solidity ABI](https://docs.soliditylang.org/en/latest/abi-spec.html)
- [Co je to ABI? - Alchemy](https://www.alchemy.com/overviews/what-is-an-abi)

## Související témata {#related-topics}

- [Kompilace chytrých kontraktů](/developers/docs/smart-contracts/compiling/)
- [Nasazení chytrých kontraktů](/developers/docs/smart-contracts/deploying/)
- [JavaScript API](/developers/docs/apis/javascript/)
- [Backendová API](/developers/docs/apis/backend/)