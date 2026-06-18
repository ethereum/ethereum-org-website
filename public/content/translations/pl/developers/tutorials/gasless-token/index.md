---
title: "Pozwalanie użytkownikom bez gazu na przechowywanie tokenów i wywoływanie kontraktów"
description: Wykorzystując abstrakcję konta, możemy tworzyć portfele w postaci inteligentnych kontraktów, które akceptują transakcje wysłane przez określone EOA lub przez nie podpisane. Te inteligentne kontrakty mogą następnie posiadać tokeny, które znajdują się pod kontrolą EOA.
author: Ori Pomerantz
tags: ["bez gazu", "erc-20", "abstrakcja konta"]
skill: intermediate
breadcrumb: Token bez gazu
lang: pl
published: 2026-04-01
---

## Wprowadzenie {#introduction}

[Poprzedni artykuł](/developers/tutorials/gasless/) omawiał korzystanie z dostępu bez gazu do własnej aplikacji przy użyciu podpisów EIP-712, ale jest to ograniczone do własnych inteligentnych kontraktów. Wykorzystując [abstrakcję konta](/roadmap/account-abstraction/), możemy tworzyć portfele w postaci inteligentnych kontraktów, które akceptują dwa rodzaje transakcji i przekazują je do żądanego miejsca docelowego:

- Transakcje wysłane przez określone EOA (co wymaga, aby to EOA posiadało ETH)
- Transakcje wysłane skądkolwiek, ale podpisane przez to samo EOA.

W ten sposób możemy zapewnić kontu sposób na przechowywanie aktywów (tokenów itp.) bez użycia gazu i wykonywanie wszystkich funkcji, które może wykonać EOA posiadające gaz.

### Dlaczego nie możemy po prostu przekazać żądania? {#why-no-tx-origin}

W standardzie ERC-20 i powiązanych, właścicielem konta jest [`msg.sender`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties), czyli adres, który wywołał kontrakt tokena, co niekoniecznie jest inicjatorem transakcji, [`tx.origin`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties). Jest to wymagane ze [względów bezpieczeństwa](https://docs.soliditylang.org/en/v0.8.35-pre.1/security-considerations.html#tx-origin). Oznacza to, że jeśli przekażemy żądania transferu tokenów, spróbują one przetransferować tokeny z adresu przekazującego (relayer), a nie z adresu kontrolowanego przez użytkownika.

Istnieje rozwiązanie, które pozwala na użycie adresu EOA poprzez [EIP-7702](https://eip7702.io/), ale wymaga ono podpisania potencjalnie niebezpiecznego delegowania, więc można go użyć tylko do delegowania do inteligentnego kontraktu, który zatwierdza dostawca portfela. W tym samouczku preferuję znacznie prostszą metodę tworzenia inteligentnego kontraktu jako proxy dla użytkownika.

## Zobaczyć to w akcji {#in-action}

1. Upewnij się, że masz zainstalowane zarówno [Node](https://nodejs.org/en/download), jak i [Foundry](https://www.getfoundry.sh/introduction/installation).

2. Sklonuj aplikację i zainstaluj niezbędne oprogramowanie.

   ```sh
   git clone https://github.com/qbzzt/260315-gasless-tokens.git
   cd 260315-gasless-tokens
   forge build
   cd server
   npm install
   ```

3. Edytuj `.env`, aby ustawić `SEPOLIA_PRIVATE_KEY` na portfel, który posiada ETH w sieci Sepolia. Jeśli potrzebujesz Sepolia ETH, [użyj kranika](/developers/docs/networks/#sepolia), aby je zdobyć. Najlepiej, aby ten klucz prywatny różnił się od tego, który masz w portfelu w przeglądarce.

4. Uruchom serwer.

   ```sh
   npm run dev
   ```

5. Przejdź do aplikacji pod adresem URL [`http://localhost:5173`](http://localhost:5173).

6. Kliknij **Connect with Injected**, aby połączyć się z portfelem. Zatwierdź w portfelu i w razie potrzeby zatwierdź zmianę sieci na Sepolia.

7. Przewiń w dół i kliknij **Deploy UserProxy (slow process)**.

8. Możesz zobaczyć, kiedy proxy użytkownika zostanie wdrożone, ponieważ obok **UserProxy access** pojawi się adres. Jeśli czekałeś 24 sekundy (2 bloki) i nadal to nie nastąpiło, może występować problem z wykrywaniem zmian.

   W takim przypadku przejdź do [eksploratora bloków Sepolia](https://eth-sepolia.blockscout.com/) i wprowadź hash transakcji wdrożenia, który widzisz w danych wyjściowych serwera przy `npm run dev`. Kliknij utworzony kontrakt, aby wyświetlić jego adres, a następnie go skopiuj. Wklej adres w polu _Or enter existing proxy address_, a następnie kliknij **Set proxy address**.

9. Kliknij **Request more tokens for proxy**, aby przesłać wywołanie do funkcji [`faucet`](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=read_write_contract#0xde5f72fd) kontraktu ERC-20 w celu uzyskania tokenów. **Potwierdź** podpis w portfelu. Oczywiście tokeny trafiają na adres proxy, a nie użytkownika.

10. Przewiń w dół i kliknij link pod _Last transaction:_. Spowoduje to otwarcie przeglądarki, aby pokazać transakcję `faucet`.

11. W polu _amount to transfer_ wprowadź liczbę od jednego do tysiąca. Kliknij **Transfer**, aby przetransferować tokeny na swój własny adres. Zanim klikniesz **Confirm** dla żądania, zauważ, że podpisywane dane są nieczytelne. Użytkownicy mieliby trudności ze zrozumieniem, co podpisują. Pamiętaj, że omówimy to [poniżej](#vulnerabilities).

12. Po potwierdzeniu transakcji poczekaj, aż zobaczysz zmianę zarówno w _your balance_, jak i _proxy balance_. Zauważ, że to również zajmie trochę czasu, ponieważ czas bloku w sieci Sepolia wynosi 12 sekund.

## Jak to działa {#how-work}

Aby uzyskać doświadczenie bez gazu, potrzebujemy interfejsu użytkownika, serwera do kierowania wiadomości z interfejsu użytkownika do łańcucha oraz inteligentnego kontraktu do ich odbierania i weryfikacji.

### Inteligentny kontrakt portfela {#wallet-smart-contract}

To jest [inteligentny kontrakt](https://github.com/qbzzt/260315-gasless-tokens/blob/main/contracts/src/UserProxy.sol). Jego celem jest robienie tego, o co prosi prawdziwy właściciel, niezależnie od kanału użytego do żądania, i ignorowanie wszystkiego innego. Aby to zrobić, jego funkcje otrzymują adres docelowy do wywołania oraz dane do użycia przy tym wywołaniu.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract UserProxy {
    address immutable OWNER;
    uint public nonce = 0;
```

Tożsamość właściciela i [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce), aby zapobiec powtarzaniu wiadomości. Ponieważ nonce jest zmienną `public`, kompilator Solidity tworzy również funkcję widoku (view function), [`nonce()`](https://eth-sepolia.blockscout.com/address/0x9Ba259C15B46ee4b72dEf7b93D85Ec18f5f6e50E?tab=read_write_contract#0xaffed0e0), która pozwala kodowi pozałańcuchowemu na odczytanie jej wartości.

```solidity
    bytes32 private constant SIGNED_ACCESS_TYPEHASH =
        keccak256("SignedAccess(address target,bytes data,uint256 nonce)");

    bytes32 private constant SIGNED_ACCESS_PAYABLE_TYPEHASH =
        keccak256("SignedAccessPayable(address target,bytes data,uint256 nonce,uint256 value)");

    bytes32 immutable DOMAIN_SEPARATOR;
```

Informacje wymagane do weryfikacji [podpisów EIP-712](https://eips.ethereum.org/EIPS/eip-712).

```solidity
    constructor(address owner_) {
        OWNER = owner_;
```

`UserProxy` jest powiązany z jednym adresem właściciela. Jest to konieczne, ponieważ może on posiadać aktywa (tokeny ERC-20, NFT itp.). Nie chcemy mieszać aktywów należących do różnych właścicieli.

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("UserProxy")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

[Separator domeny](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). Nie można go obliczyć w czasie kompilacji, ponieważ zależy od identyfikatora łańcucha (chain ID) i adresu kontraktu. Dzięki temu niemożliwe jest oszukanie UserProxy wiadomością przygotowaną dla innego.

```solidity
    event CallResult(address target, bytes returnData);
```

Loguj wyniki wywołania.

```solidity
    function directAccess(address target, bytes calldata data)
            external returns (bytes memory) {
```

Ta funkcja może być wywołana bezpośrednio przez właściciela. Jeśli żadne przekaźniki (relays) nie są dostępne, właściciel nadal może uzyskać dostęp do aktywów bezpośrednio na blockchainie (jeśli użytkownik posiada ETH).

```solidity
        require(msg.sender == OWNER, "Only owner can call");
        (bool success, bytes memory returnData) = target.call(data);
        require(success, "Call failed");

        emit CallResult(target, returnData);

        return returnData;
    }
```

Jeśli jesteśmy wywoływani _bezpośrednio_ przez właściciela, wywołaj cel z dostarczonymi danymi wywołania (calldata).

```solidity
    function signedAccess(
        address target,
        bytes calldata data,
        uint8 v,
        bytes32 r,
        bytes32 s)
```

To jest główna funkcja `UserProxy`. Otrzymuje ona `target` i `data`, a także podpis.

```solidity
    external returns (bytes memory) {
        // Oblicz skrót EIP-712
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        SIGNED_ACCESS_TYPEHASH,
                        target,
                        keccak256(data),
                        nonce
                    )
                )
            )
        );
```

Skrót (digest) zawiera również nonce, ale nie musimy go otrzymywać z transakcji; znamy już właściwą wartość. Podpis z błędnym nonce zostanie odrzucony.

```solidity

    // Odzyskaj podpisującego
    address signer = ecrecover(digest, v, r, s);
    require(signer == OWNER, "Signature invalid or not by owner");
```

Jeśli podpis jest nieprawidłowy, `ecrecover` zazwyczaj zwróci inny adres i nie zostanie on zaakceptowany.

```solidity
    (bool success, bytes memory returnData) = target.call(data);
    require(success, "Call failed");
```

Wywołaj kontrakt, który użytkownik kazał nam wywołać, i wykonaj wycofanie (revert), jeśli się nie powiedzie.

```solidity
    emit CallResult(target, returnData);

    nonce++; // Zwiększ nonce, aby zapobiec ponownemu użyciu

    return returnData;
}
```

Jeśli się powiedzie, wyemituj zdarzenie logu i zwiększ nonce.

```solidity
    function directAccessPayable(address target, uint value, bytes calldata data)
            external payable returns (bytes memory) {
        .
        .
        .
    }

    function signedAccessPayable(
        .
        .
        .
    }
}
```

Są to prawie identyczne warianty, które pozwalają również na transfer ETH z kontraktu.

### Przekaźnik (relayer) {#relayer}

Przekaźnik to [komponent serwerowy](/developers/tutorials/server-components/). Jest napisany w języku JavaScript; kod źródłowy możesz zobaczyć [tutaj](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/index.js).

```js
import express from "express";
import { createServer as createViteServer } from "vite";
import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import dotenv from 'dotenv'
```

Biblioteki, których potrzebujemy. Jest to serwer [Express](https://expressjs.com/), który używa [Vite](https://vite.dev/) do serwowania kodu interfejsu użytkownika. Używamy [Viem](https://viem.sh/) do komunikacji z blockchainem oraz [dotenv](https://www.dotenv.org/) do odczytu klucza prywatnego dla adresu, który wysyła transakcję.

```js
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const UserProxy = require('../contracts/out/UserProxy.sol/UserProxy.json')
```

Jest to prosty sposób na odczytanie skompilowanego `UserProxy`. Potrzebujemy ABI, aby móc wywołać `UserProxy`, oraz skompilowanego kodu, aby móc go wdrożyć dla użytkownika.

```js
dotenv.config()
const sepoliaAccount = privateKeyToAccount(process.env.SEPOLIA_PRIVATE_KEY)
console.log("Using account:", sepoliaAccount.address)
```

Odczytaj plik `.env`, wyodrębnij adres i wydrukuj go w konsoli.

```js
const sepoliaClient = createWalletClient({
  account: sepoliaAccount,
  chain: sepolia,
  transport: http("https://rpc.sentio.xyz/sepolia"),
})

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
})
```

Klienci Viem, którzy komunikują się z blockchainem.

```js
const start = async () => {
  const app = express()
```

Uruchom serwer Express.

```js
  app.use(express.json())
```

Powiedz Express, aby odczytał ciało żądania, a jeśli to JSON, aby je sparsował.

```js
  app.post("/server/deploy", async (req, res) => {
```

To jest kod, który obsługuje żądania wdrożenia proxy. Zauważ, że jesteśmy tutaj podatni na ataki typu [odmowa usługi (denial-of-service)](https://en.wikipedia.org/wiki/Denial-of-service_attack), ponieważ atakujący może spamować nas żądaniami wdrożenia proxy, dopóki nasze ETH nie zostanie wyczerpane. W systemie produkcyjnym prawdopodobnie wymagalibyśmy, aby żądanie wdrożenia proxy było podpisane, a podpisujący był istniejącym klientem.

```js
    try {
      const ownerAddress = req.body.ownerAddress
```

Pobierz adres właściciela z żądania.

```js
      const txHash = await sepoliaClient.deployContract({
        abi: UserProxy.abi,
        bytecode: UserProxy.bytecode.object,
        args: [ownerAddress],
        account: sepoliaAccount,
      })

      console.log("Deployment transaction hash:", txHash)

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      })
```

[Wdróż kontrakt](https://viem.sh/docs/contract/deployContract#deploycontract) i [poczekaj, aż zostanie wdrożony](https://viem.sh/docs/actions/public/waitForTransactionReceipt).

```js
      res.json({ contractAddress: receipt.contractAddress })
```

Jeśli wszystko jest w porządku, zwróć adres proxy do interfejsu użytkownika.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

Jeśli wystąpi problem, zgłoś go.

```js
  app.post("/server/message", async (req, res) => {
```

To jest kod, który przetwarza wiadomości użytkownika dla kontraktu `UserProxy`. Jest to kolejny punkt podatny na atak typu odmowa usługi.

```js
    try {
      const { proxy, target, data, v, r, s } = req.body

      const txHash = await sepoliaClient.writeContract({
        address: proxy,
        abi: UserProxy.abi,
        functionName: 'signedAccess',
        args: [target, data, v, r, s],
        account: sepoliaAccount,
      })
```

Pobierz dane żądania i użyj ich do wywołania `signedAccess` na proxy.

```js
      console.log("Message transaction hash:", txHash)

      res.json({ txHash })
```

Zgłoś z powrotem hash transakcji. Pozwala to interfejsowi użytkownika na wyświetlenie adresu URL, aby użytkownik mógł sprawdzić transakcję.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

Ponownie, jeśli wystąpi problem, zgłoś go.

```js
  // Niech Vite zajmie się całą resztą
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)

  app.listen(5173, () => {
    console.log("Dev server running on http://localhost:5173");
  })
}

start()
```

Do wszystkiego innego użyj Vite, który zajmuje się serwowaniem interfejsu użytkownika za nas.

### Interfejs użytkownika {#user-interface}

[To jest kod interfejsu użytkownika](https://github.com/qbzzt/260315-gasless-tokens/tree/main/server/src). Większość kodu jest prawie identyczna z tym udokumentowanym w [tym artykule](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/#file-walk-through), z wyjątkiem [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx).

Części [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx) są podobne do [`Greeter.jsx`](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx) w [tym artykule](/developers/tutorials/gasless/#ui-changes). Oto nowe części.

```js
import {
   encodeFunctionData
       } from 'viem'
```

[Ta funkcja](https://viem.sh/docs/contract/encodeFunctionData) tworzy dane wywołania (calldata) dla wywołania funkcji EVM. Jest to konieczne, aby użytkownik mógł podpisać dane wywołania.

```js
import UserProxy from '../../contracts/out/UserProxy.sol/UserProxy.json'
```

`UserProxy`, wyjaśniony powyżej.

```js
import Erc20 from '../../contracts/out/Faucet.sol/FaucetToken.json'
```

[Ten kontrakt](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=contract) to w większości normalny kontrakt ERC-20, z dodatkiem jednej ważnej funkcji, `faucet()`. Funkcja ta przyznaje tokeny każdemu, kto o nie poprosi w celach testowych.

```js
const erc20Addrs = {
  // Sepolia
    11155111: '0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78'
}
```

Adres dla `FaucetToken`.

```js
const Address = ({ address }) => {
   if (!address) return null
   return (
      <a href={`https://eth-sepolia.blockscout.com/address/${address}?tab=read_write_contract`} target="_blank">{address}</a>
   )
}
```

Ten komponent wyprowadza adres z linkiem do kontraktu w eksploratorze bloków.

```js
const Token = () => {
    ...
```

To jest główny komponent, który wykonuje większość pracy.

```js
  const [ balanceAmount, setBalanceAmount ] = useState("Loading...")
```

Saldo tokenów adresu użytkownika.

```js
  const [ proxyAddr, setProxyAddr ] = useState(null)
```

Adres proxy należącego do użytkownika.

```js
  const [ proxyBalanceAmount, setProxyBalanceAmount ] = useState("Loading...")
```

Saldo tokenów proxy.

```js
  const [ newProxyAddr, setNewProxyAddr ] = useState("")
```

To pole jest używane, gdy użytkownik ręcznie ustawia adres proxy. Możliwość ręcznego ustawienia adresu proxy pozwala użytkownikowi na użycie istniejącego proxy zamiast wdrażania nowego za każdym razem (i utraty wszystkich tokenów posiadanych przez stare proxy).

```js
  const [ txHash, setTxHash ] = useState(null)
```

Hash ostatniej transakcji, używany do pokazania linku do eksploratora, aby użytkownik mógł sprawdzić tę transakcję.

```js
  const [ transferToken, setTransferToken ] = useState("")
  const [ transferAmount, setTransferAmount ] = useState("")
  const [ transferTo, setTransferTo ] = useState("")
```

Wszystkie te pola są używane do wysyłania poleceń transferu tokenów do kontraktu ERC-20. Może to być `FaucetToken`, ale nie musi. Funkcja [`transfer`](/developers/tutorials/erc20-annotated-code/#transfer-tokens) jest częścią standardu ERC-20.

```js
  const balance = useReadContract({
    ...
  })


  const proxyBalance = useReadContract({
    ...
  })
```

Odczytaj dwa salda tokenów, którymi jesteśmy zainteresowani: ile posiada użytkownik, a ile posiada proxy.

```js
  const nonce = useReadContract({
      address: proxyAddr,
      abi: UserProxy.abi,
      functionName: 'nonce',
      args: [],
  })
```

Aby zapobiec atakom typu replay (na przykład sprzedawcy powtarzającemu transakcję, która daje mu pieniądze), używamy [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). Musimy znać aktualną wartość, aby dodać ją do podpisywanych danych.

```js
  useEffect(() => {
    if (balance?.status === "success")
      setBalanceAmount(balance.data / 10n**18n)
    else
      setBalanceAmount("Loading...")
  }, [balance])

  useEffect(() => {
    if (proxyBalance?.status === "success")
      setProxyBalanceAmount(proxyBalance.data / 10n**18n)
    else
      setProxyBalanceAmount("Loading...")
  }, [proxyBalance])
```

Użyj [`useEffect`](https://react.dev/reference/react/useEffect), aby zaktualizować saldo wyświetlane użytkownikowi, gdy informacje odczytane z blockchaina ulegną zmianie.

```js
  useEffect(() => {
    setTransferToken(faucetAddr)
  }, [faucetAddr])

  useEffect(() => {
    setTransferTo(account.address)
  }, [account.address])
```

Domyślnie transferowane są tokeny `FaucetToken` na własne konto użytkownika. Tutaj ustawiamy te wartości, gdy otrzymujemy je z Viem.

```js
  const proxyAddressChange = (evt) => setNewProxyAddr(evt.target.value)
  const transferTokenChange = (evt) => setTransferToken(evt.target.value)
  const transferToChange = (evt) => setTransferTo(evt.target.value)
  const transferAmountChange = (evt) => setTransferAmount(evt.target.value)
```

Procedury obsługi zdarzeń (event handlers) dla zmian w polach tekstowych.

```js
  const deployUserProxy = async () => {
    try {
      const response = await fetch("/server/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerAddress: account.address })
      })

      const data = await response.json()
      setProxyAddr(data.contractAddress)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Poproś serwer o wdrożenie proxy dla tego użytkownika.

```js
  const signMessage = async(proxyAddr, target, calldata) => {
```

Podpisz wiadomość przed wysłaniem jej do serwera, aby wysłać ją do `UserProxy` onchain. Zostało to wyjaśnione [tutaj](/developers/tutorials/gasless/#ui-changes). Musimy podpisać wiadomość zawierającą zarówno adres docelowy (adres tokena, który wywołujemy), jak i dane wywołania (calldata) do wysłania.

```js
    const domain = {
      .
      .
      .
    return {v, r, s}
  }

  const messageUserProxy = async (proxy, target, data, v, r, s) => {
```

Wyślij podpisaną wiadomość do `UserProxy`, który zweryfikuje podpis, a następnie wyśle ją do `target`.

```js
    try {
      const response = await fetch("/server/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proxy, target,  // oba adresy
          data,           // dane wywołania do wysłania do celu
          v, r, s         // podpis
        })
      })
      const serverResponse = await response.json()
      setTxHash(serverResponse.txHash)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Wyślij żądanie do serwera, a po otrzymaniu odpowiedzi pobierz hash transakcji.

```js
  const faucetSimulation = useSimulateContract({
    address: faucetAddr,
    abi: Erc20.abi,
    functionName: 'faucet',
    account: account.address
  })
```

Symuluj wywołanie funkcji `faucet`. Włączamy przycisk kranika tylko wtedy, gdy zakończy się to sukcesem.

```js
  const proxyFaucet = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'faucet',
      args: [],
    })

    const {v, r, s} = await signMessage(proxyAddr, calldata)
    messageUserProxy(proxyAddr, faucetAddr, calldata, v, r, s)
  }

  const proxyTransfer = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'transfer',
      args: [transferTo, BigInt(transferAmount) * 10n**18n],
    })

    const {v, r, s} = await signMessage(proxyAddr, transferToken, calldata)
    messageUserProxy(proxyAddr, transferToken, calldata, v, r, s)
  }
```

Aby wywołać funkcję przez serwer i `UserProxy`, wykonujemy trzy kroki:

1. Utwórz dane wywołania (calldata) do podpisania i wysłania za pomocą [`encodeFunctionData`](https://viem.sh/docs/contract/encodeFunctionData).

2. Podpisz wiadomość (adres docelowy, dane wywołania i nonce).

3. Wyślij wiadomość do serwera.

```js
  return (
    <>
      <div align="left">
         <h2>Token</h2>
         <h4>Token contract address <Address address={faucetAddr} /></h4>
         <hr />
         <h4>Direct access (as <Address address={account?.address} />)</h4>
         Your balance: {balanceAmount}
         <br />
         <button disabled={!faucetSimulation.data}
               onClick={() => writeContract(
                  faucetSimulation.data.request
               )}
         >
         Request more tokens
         </button>
         <hr />
```

Ta część komponentu pozwala na użycie `FaucetToken` bezpośrednio z przeglądarki. Jej głównym celem jest ułatwienie debugowania.

```js
         <h4>UserProxy access <Address address={proxyAddr} /></h4>
         <button onClick={deployUserProxy}>
         Deploy UserProxy (slow process)
         </button>
```

Pozwól użytkownikowi wdrożyć nowy `UserProxy`.

```js
         <br /><br />
         <input type="text" placeholder="Lub wprowadź istniejący adres proxy" value={newProxyAddr} onChange={proxyAddressChange} />
         <br /><br />
         <button
            onClick={() => setProxyAddr(newProxyAddr)}
            disabled={newProxyAddr.match(/^0x[a-fA-F0-9]{40}$/) === null}
         >
            Set proxy address
         </button>
```

Pozwól użytkownikom kliknąć **Set proxy address** tylko wtedy, gdy wprowadzą prawidłowy adres. Zauważ, że nie gwarantuje to, że dany adres jest w rzeczywistości kontraktem `UserProxy`. Możliwe jest dodanie takiego sprawdzenia, ale będzie to znacznie wolniejsze (gorsze doświadczenie użytkownika) i nie poprawi bezpieczeństwa (atakujący zawsze mogą użyć własnego kodu dla interfejsu użytkownika).

```js
         <br /><br />
         { proxyAddr && (
```

Pokaż resztę _tylko_ wtedy, gdy istnieje prawidłowy adres proxy.

```js
            <>
               Proxy balance: {proxyBalanceAmount}
               <br />
               Proxy nonce: {nonce?.data?.toString() ?? "Loading..."}
```

Użytkownik nie musi znać nonce; służy to tylko do celów debugowania.

```js
               <br />
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyFaucet}
               >
                  Request more tokens for proxy
               </button>
```

Nie możemy symulować wywołania `faucet()` przez proxy. Możemy jednak przynajmniej upewnić się, że mamy proxy i że proxy zgłosiło nam nonce.

```js
               <hr />
               <h4>Transfer tokens from proxy</h4>
               <ul>
                  <li> Token to transfer: <input type="text" placeholder="Token to transfer" value={transferToken} onChange={transferTokenChange} /> </li>
                  <li> Recipient address: <input type="text" placeholder="Recipient address" value={transferTo} onChange={transferToChange} /> </li>
                  <li> Amount to transfer: <input type="number" placeholder="Amount to transfer" value={transferAmount} onChange={transferAmountChange} /> </li>
               </ul>
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyTransfer}
               >
                  Transfer
               </button>
            </>
         )}
```

Pozwól użytkownikowi na wydawanie transakcji transferu ERC-20.

```js
         <hr />
         { txHash && (
            <>
               <h4>Last transaction:</h4>
               <a href={`https://eth-sepolia.blockscout.com/tx/${txHash}`} target="_blank">
                 {txHash}
               </a>
            </>
         )}
```

Jeśli istnieje hash ostatniej transakcji, pokaż link, aby użytkownik mógł go wyświetlić w eksploratorze bloków.

```js
      </div>
    </>
  )
}

export {Token}
```

To jest tylko kod szablonowy (boilerplate) React.

## Podatności {#vulnerabilities}

Nasz serwer jest podatny na ataki typu odmowa usługi. Atak ten został wyjaśniony [w poprzednim artykule z tej serii](/developers/tutorials/gasless/#dos-on-server).

Dodatkowo zachęcamy do złych zachowań użytkowników. Oto, o co prosimy użytkownika, aby podpisał:

![Screen capture with opaque calldata](./fig-1-opaque-calldata.png)

_My_ wiemy, że jest to legalny transfer ERC-20 dla tokena, kwoty i adresu docelowego, który użytkownik chce przetransferować. Ale większość użytkowników nie wie, jak interpretować dane wywołania (calldata) i nie ma pojęcia, co podpisuje. To zły projekt z dwóch powodów:

- Niektórzy użytkownicy nie będą z nas korzystać, ponieważ nie ufają danym, które każemy im podpisać.
- Inni użytkownicy _zaufają_ nam i nauczą się, że powinni po prostu podpisywać dane wywołania bez zrozumienia, czym one są. Oznacza to, że jeśli Atakujący Adam zdoła przekierować ich na swoją stronę internetową, może nakłonić ich do podpisania transakcji, która przyzna mu wszystkie USDC (lub DAI, lub dowolne inne ERC-20), które posiada użytkownik.

Rozwiązaniem jest posiadanie oddzielnych funkcji w `UserProxy` dla powszechnie używanych funkcji, takich jak transfer. Wtedy użytkownicy mogą podpisać coś, co rozumieją.

![Screen capture with transfer details](./fig-2-transparent-signature.png)

**Uwaga:** Chociaż użytkownicy mogą korzystać z dowolnego portfela, wysoce zalecane jest, aby aplikacje korzystające z EIP-712 zachęcały ich do korzystania z portfela, który [pokazuje całe dane podpisu](https://rabby.io/). Niektóre portfele obcinają adres, co jest niebezpieczne. Atakujący może utworzyć adres, który ma te same znaki początkowe i końcowe, ale różni się w środku.

![Screen capture with truncated addresses](./fig-3-truncated-addresses.png)

## Wnioski {#conclusion}

Oprócz powyższych podatności, rozwiązanie w tym samouczku ma kilka wad, w rozwiązaniu których Ethereum może nam pomóc.

- _Odporność na cenzurę_. Obecnie użytkownicy mogą korzystać z Twojego serwera, konkurencyjnego serwera skonfigurowanego przez kogoś innego lub łączyć się bezpośrednio z Ethereum, co wiąże się z kosztami gazu. Użycie [ERC-4337](https://docs.erc4337.io/#what-is-erc-4337) pozwala użytkownikom zaoferować swoją transakcję dużej puli serwerów, zmniejszając prawdopodobieństwo, że ich transakcje zostaną ocenzurowane.
- _Aktywa będące własnością EOA_. Jak zauważono powyżej, [EIP-7702](https://eip7702.io/) może być użyty do zarządzania aktywami już posiadanymi przez adres EOA. Ma to swoje trudności, ale czasami jest to konieczne.

Mam nadzieję opublikować samouczki dotyczące dodawania tych funkcji w niedalekiej przyszłości.

[Zobacz tutaj więcej moich prac](https://cryptodocguy.pro/).