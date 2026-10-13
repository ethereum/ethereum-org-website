---
title: Interakcja z inteligentnymi kontraktami
description: Dowiedz się, jak odczytywać i zapisywać dane w inteligentnych kontraktach, które zostały już wdrożone w Ethereum.
lang: pl
---

Nie zawsze musisz pisać i wdrażać własny inteligentny kontrakt. Przez większość czasu jako programista będziesz chciał wchodzić w interakcje z inteligentnymi kontraktami, które inni już wdrożyli w sieci Ethereum.

Ta strona omawia dwa podstawowe sposoby interakcji z inteligentnym kontraktem — **odczytywanie** danych i **zapisywanie** danych — oraz narzędzia potrzebne do obu tych czynności.

## Wymagania wstępne {#prerequisites}

Powinieneś rozumieć:

- [Jak działają inteligentne kontrakty](/developers/docs/smart-contracts/)
- [Konta Ethereum i jak podpisują transakcje](/developers/docs/accounts/)
- [Czym jest transakcja](/developers/docs/transactions/)

## Dwa sposoby interakcji z inteligentnym kontraktem {#two-ways}

Interakcja z inteligentnym kontraktem dzieli się na dwie kategorie:

### Odczytywanie z kontraktu {#reading-from-a-contract}

Odczytywanie to **darmowa** operacja, która nie tworzy transakcji i nie zmienia żadnego stanu na blockchainie.

Kiedy odczytujesz dane z kontraktu, po prostu zapytujesz o dane, które już istnieją. Na przykład:

- Sprawdzanie salda tokenów ERC-20
- Odczytywanie aktualnej ceny ze zdecentralizowanej giełdy
- Pobieranie właściciela NFT

Ponieważ odczyty nie modyfikują stanu, nie kosztują [gazu](/developers/docs/gas/) i mogą być wykonywane przez każdego bez potrzeby posiadania ETH.

### Zapisywanie do kontraktu {#writing-to-a-contract}

Zapisywanie to operacja **zmieniająca stan**, która wymaga transakcji i kosztuje gaz.

Kiedy zapisujesz do kontraktu, wyzwalasz funkcję, która modyfikuje stan blockchaina. Na przykład:

- Przesyłanie tokenów
- Wymiana tokenów na zdecentralizowanej giełdzie
- Wybijanie NFT

Zapisywanie zawsze wymaga:

1. [Konta zewnętrznego (EOA)](/developers/docs/accounts/#types-of-account) z wystarczającą ilością ETH na gaz
2. Transakcji podpisanej kluczem prywatnym konta
3. Wydobycia transakcji i włączenia jej do bloku

Dzięki [abstrakcji konta](/roadmap/account-abstraction/), konto inteligentnego kontraktu może również inicjować zapisy, a paymaster może pokryć koszty gazu w imieniu użytkownika — więc EOA posiadające ETH nie jest ściśle wymagane.

## Zrozumienie ABI kontraktu {#understanding-contract-abis}

Aby wejść w interakcję z inteligentnym kontraktem, Twoja aplikacja musi wiedzieć, *co* ten kontrakt potrafi. W tym miejscu pojawia się **Application Binary Interface (ABI)**.

ABI to dokument JSON, który opisuje:

- Każdą funkcję udostępnianą przez kontrakt (nazwa, wejścia, wyjścia)
- Każde zdarzenie, które kontrakt może wyemitować
- Jak kodować i dekodować dane podczas komunikacji z kontraktem

Pomyśl o ABI jak o instrukcji obsługi kontraktu — bez niego Twoja aplikacja nie wie, jakie funkcje istnieją ani jakich parametrów oczekują.

### Gdzie znaleźć ABI kontraktu {#where-to-find-abis}

- **Zweryfikowane kontrakty w Etherscan** - [Etherscan](https://etherscan.io) automatycznie udostępnia ABI dla zweryfikowanego kodu źródłowego
- **Od dewelopera** - wiele projektów publikuje swoje ABI w dokumentacji lub pakietach npm
- **Wygeneruj ze źródła** - jeśli masz kod źródłowy w Solidity, możesz go [skompilować](/developers/docs/smart-contracts/compiling/), aby wygenerować ABI

## Narzędzia i biblioteki do interakcji z kontraktami {#tools-and-libraries}

Programiści zazwyczaj używają biblioteki JavaScript/TypeScript do interakcji z kontraktami z poziomu aplikacji internetowej, backendu lub skryptu.

### Biblioteki klienckie (JavaScript/TypeScript) {#client-libraries}

- **[Viem](https://viem.sh)** - Nowoczesny, lekki interfejs TypeScript dla Ethereum z pierwszorzędnym bezpieczeństwem typów
- **[ethers.js](https://docs.ethers.org/)** - Sprawdzona w boju biblioteka do interakcji z blockchainem Ethereum
- **[web3.js](https://web3js.org/)** - Oryginalne API JavaScript dla Ethereum

### Biblioteki backendowe {#backend-libraries}

- **[ethers.js](https://docs.ethers.org/)** - Działa również w Node.js dla skryptów po stronie serwera i botów
- **[web3.py](https://web3py.readthedocs.io/)** - Biblioteka Python do interakcji z Ethereum
- **[go-ethereum](https://geth.ethereum.org/docs/interact-with-geth)** - Oficjalna biblioteka Go od zespołu Geth

### Przykład: odczytywanie salda tokenów za pomocą Viem {#example-viem}

```ts
import { createPublicClient, http, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

// Adres kontraktu USDC i ABI (częściowe, dla balanceOf)
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

console.log(formatUnits(balance, 6)) // USDC ma 6 miejsc po przecinku
```

### Przykład: wysyłanie transakcji za pomocą ethers.js {#example-ethers}

```js
const { ethers } = require('ethers')

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// ABI transferu ERC-20
const abi = ['function transfer(address to, uint256 amount) returns (bool)']
const contract = new ethers.Contract(tokenAddress, abi, wallet)

const tx = await contract.transfer(recipient, ethers.parseUnits('10', 18))
await tx.wait() // poczekaj, aż transakcja zostanie wydobyta
console.log(`Transferred! TX: ${tx.hash}`)
```

## Zdarzenia i logi {#events-and-logs}

Inteligentne kontrakty mogą emitować **zdarzenia**, aby zasygnalizować, że coś się wydarzyło. Twoja aplikacja może nasłuchiwać tych zdarzeń, aby reagować w czasie rzeczywistym.

```ts
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

// Obserwuj zdarzenia transferu USDC
const unwatch = client.watchEvent({
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  onLogs: (logs) => console.log(logs),
})
```

## Symulowanie transakcji {#simulating}

Przed wysłaniem transakcji możesz ją **zasymulować**, aby sprawdzić, czy się powiedzie — i zobaczyć jej wartość zwracaną — bez wydawania gazu. Jest to przydatne do wczesnego wychwytywania błędów i podglądu wyników.

Większość bibliotek klienckich obsługuje to poprzez `eth_call`:

```ts
// Z Viem
const result = await client.simulateContract({
  address: contractAddress,
  abi,
  functionName: 'swap',
  args: [amountIn],
  account: userAddress,
})
```

## Portfele i podpisywanie {#wallets-and-signing}

W zdecentralizowanej aplikacji (dapp) portfel użytkownika (taki jak MetaMask, Rainbow lub WalletConnect) obsługuje podpisywanie. Nie zarządzasz kluczami prywatnymi bezpośrednio.

[Biblioteki portfeli i narzędzia do łączenia](/developers/docs/apis/javascript/) abstrahują to, dzięki czemu możesz skupić się na budowaniu logiki swojej aplikacji.

## Powiązane samouczki {#related-tutorials}

- [Wywoływanie inteligentnego kontraktu z JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/)
- [Wysyłanie transakcji przy użyciu web3.js i Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [Jak wyświetlić swoje NFT w portfelu](/developers/tutorials/how-to-view-nft-in-metamask/)

## Dalsza lektura {#further-reading}

- [Dokumentacja Viem: Odczytywanie i zapisywanie do kontraktów](https://viem.sh/docs/contract/readContract)
- [Dokumentacja ethers.js: Kontrakty](https://docs.ethers.org/v6/api/contract/)
- [Specyfikacja ABI Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html)
- [Czym jest ABI? - Alchemy](https://www.alchemy.com/overviews/what-is-an-abi)

## Powiązane tematy {#related-topics}

- [Kompilacja inteligentnych kontraktów](/developers/docs/smart-contracts/compiling/)
- [Wdrażanie inteligentnych kontraktów](/developers/docs/smart-contracts/deploying/)
- [API JavaScript](/developers/docs/apis/javascript/)
- [API backendowe](/developers/docs/apis/backend/)