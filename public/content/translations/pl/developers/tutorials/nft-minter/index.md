---
title: "Samouczek: Minter NFT"
description: "W tym samouczku zbudujesz minter NFT i dowiesz się, jak stworzyć zdecentralizowaną aplikację (dapp) typu full stack, łącząc swój inteligentny kontrakt z frontendem w React za pomocą MetaMask i narzędzi Web3."
author: "smudgil"
tags: ["Solidity", "NFT", "Alchemy", "inteligentne kontrakty", "frontend", "Pinata", "ERC-721"]
skill: intermediate
breadcrumb: Dapp do wybijania NFT
lang: pl
published: 2021-10-06
---

Jednym z największych wyzwań dla programistów wywodzących się ze środowiska Web2 jest zrozumienie, jak połączyć inteligentny kontrakt z projektem frontendowym i wchodzić z nim w interakcje.

Budując minter NFT — prosty interfejs użytkownika (UI), w którym można wprowadzić link do swojego aktywa cyfrowego, tytuł i opis — dowiesz się, jak:

- Połączyć się z MetaMask przez swój projekt frontendowy
- Wywoływać metody inteligentnego kontraktu z frontendu
- Podpisywać transakcje za pomocą MetaMask

W tym samouczku użyjemy [React](https://react.dev/) jako naszego frameworka frontendowego. Ponieważ ten samouczek skupia się głównie na programowaniu w Web3, nie będziemy poświęcać dużo czasu na omawianie podstaw React. Zamiast tego skupimy się na dodaniu funkcjonalności do naszego projektu.

Wymagane jest podstawowe zrozumienie React — znajomość działania komponentów, propsów, useState/useEffect oraz podstawowego wywoływania funkcji. Jeśli nigdy wcześniej nie słyszałeś o żadnym z tych terminów, warto zapoznać się z tym [samouczkiem wprowadzającym do React](https://react.dev/learn/tutorial-tic-tac-toe). Wzrokowcom gorąco polecamy tę doskonałą serię filmów [Full Modern React Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) autorstwa Net Ninja.

Jeśli jeszcze tego nie zrobiłeś, na pewno będziesz potrzebować konta Alchemy, aby ukończyć ten samouczek, a także zbudować cokolwiek na blockchainie. Zarejestruj darmowe konto [tutaj](https://alchemy.com/).

Bez zbędnych ceregieli, zaczynajmy!

## Podstawy tworzenia NFT {#making-nfts-101}

Zanim w ogóle zaczniemy przeglądać jakikolwiek kod, ważne jest, aby zrozumieć, jak działa tworzenie NFT. Obejmuje to dwa kroki:

### Wdrożenie inteligentnego kontraktu NFT na blockchainie Ethereum {#publish-nft}

Największą różnicą między dwoma standardami inteligentnych kontraktów NFT jest to, że ERC-1155 to standard wielotokenowy (multi-token) i obejmuje funkcjonalność wsadową (batch), podczas gdy ERC-721 to standard pojedynczego tokena i dlatego obsługuje przesyłanie tylko jednego tokena naraz.

### Wywołanie funkcji wybijania

Zazwyczaj ta funkcja wybijania wymaga przekazania dwóch zmiennych jako parametrów: po pierwsze `recipient`, który określa adres, na który trafi Twoje nowo wybite NFT, a po drugie `tokenURI` NFT, czyli ciąg znaków wskazujący na dokument JSON opisujący metadane NFT.

Metadane NFT to tak naprawdę to, co je ożywia, pozwalając na posiadanie właściwości, takich jak nazwa, opis, obraz (lub inne aktywo cyfrowe) i inne atrybuty. Oto [przykład tokenURI](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2), który zawiera metadane NFT.

W tym samouczku skupimy się na części 2, czyli wywołaniu funkcji wybijania inteligentnego kontraktu NFT za pomocą naszego interfejsu użytkownika w React.

Będziesz potrzebować inteligentnego kontraktu NFT ERC-721 wdrożonego w obsługiwanej sieci testowej, takiej jak Sepolia. Jeśli chcesz wdrożyć go samodzielnie, polecamy przewodnik Alchemy dotyczący [wdrażania inteligentnego kontraktu w sieci Sepolia](https://www.alchemy.com/docs/how-to-deploy-a-smart-contract-to-the-sepolia-testnet).

Świetnie, skoro rozumiemy już, jak działa tworzenie NFT, sklonujmy nasze pliki startowe!
## Klonowanie plików startowych {#clone-the-starter-files}

Najpierw przejdź do [repozytorium nft-minter-tutorial na GitHubie](https://github.com/alchemyplatform/nft-minter-tutorial), aby pobrać pliki startowe dla tego projektu. Sklonuj to repozytorium do swojego środowiska lokalnego.

Kiedy otworzysz to sklonowane repozytorium `nft-minter-tutorial`, zauważysz, że zawiera ono dwa foldery: `minter-starter-files` i `nft-minter`.

- `minter-starter-files` zawiera pliki startowe (zasadniczo interfejs użytkownika w React) dla tego projektu. W tym samouczku **będziemy pracować w tym katalogu**, ucząc się, jak ożywić ten interfejs, łącząc go z portfelem Ethereum i inteligentnym kontraktem NFT.
- `nft-minter` zawiera cały ukończony samouczek i służy jako **punkt odniesienia**, **jeśli utkniesz.**

Następnie otwórz swoją kopię `minter-starter-files` w edytorze kodu, a potem przejdź do folderu `src`.

Cały kod, który napiszemy, będzie znajdował się w folderze `src`. Będziemy edytować komponent `Minter.js` i pisać dodatkowe pliki JavaScript, aby nadać naszemu projektowi funkcjonalność Web3.

## Krok 2: Sprawdzenie plików startowych {#step-2-check-out-our-starter-files}

Zanim zaczniemy kodować, ważne jest, aby sprawdzić, co już zostało dla nas przygotowane w plikach startowych.

### Uruchomienie projektu w React {#get-your-react-project-running}

Zacznijmy od uruchomienia projektu React w naszej przeglądarce. Piękno React polega na tym, że gdy nasz projekt jest uruchomiony w przeglądarce, wszelkie zapisane przez nas zmiany będą aktualizowane na żywo.

Aby uruchomić projekt, przejdź do katalogu głównego folderu `minter-starter-files` i uruchom `npm install` w terminalu, aby zainstalować zależności projektu:

```bash
cd minter-starter-files
npm install
```

Po zakończeniu instalacji uruchom `npm start` w terminalu:

```bash
npm start
```

Spowoduje to otwarcie http://localhost:3000/ w przeglądarce, gdzie zobaczysz frontend naszego projektu. Powinien składać się z 3 pól: miejsca na wprowadzenie linku do aktywa NFT, nazwy NFT oraz opisu.

Jeśli spróbujesz kliknąć przyciski „Connect Wallet” (Połącz portfel) lub „Mint NFT” (Wybij NFT), zauważysz, że nie działają — to dlatego, że wciąż musimy zaprogramować ich funkcjonalność! :\)

### Komponent Minter.js {#minter-js}

**UWAGA:** Upewnij się, że jesteś w folderze `minter-starter-files`, a nie w folderze `nft-minter`!

Wróćmy do folderu `src` w naszym edytorze i otwórzmy plik `Minter.js`. To bardzo ważne, abyśmy zrozumieli wszystko w tym pliku, ponieważ jest to główny komponent React, nad którym będziemy pracować.

Na górze tego pliku znajdują się nasze zmienne stanu, które będziemy aktualizować po określonych zdarzeniach.

```javascript
//Zmienne stanu
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

Nigdy nie słyszałeś o zmiennych stanu lub hookach stanu w React? Sprawdź [tę](https://legacy.reactjs.org/docs/hooks-state.html) dokumentację.

Oto co reprezentuje każda ze zmiennych:

- `walletAddress` - ciąg znaków przechowujący adres portfela użytkownika
- `status` - ciąg znaków zawierający wiadomość do wyświetlenia na dole interfejsu użytkownika
- `name` - ciąg znaków przechowujący nazwę NFT
- `description` - ciąg znaków przechowujący opis NFT
- `url` - ciąg znaków będący linkiem do aktywa cyfrowego NFT

Po zmiennych stanu zobaczysz trzy niezaimplementowane funkcje: `useEffect`, `connectWalletPressed` i `onMintPressed`. Zauważysz, że wszystkie te funkcje to `async` (asynchroniczne), ponieważ będziemy w nich wykonywać asynchroniczne wywołania API! Ich nazwy odpowiadają ich funkcjonalnościom:

```javascript
useEffect(async () => {
  //TODO: zaimplementuj
}, [])

const connectWalletPressed = async () => {
  //TODO: zaimplementuj
}

const onMintPressed = async () => {
  //TODO: zaimplementuj
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - to hook React, który jest wywoływany po wyrenderowaniu komponentu. Ponieważ przekazano do niego pustą tablicę `[]` (zobacz linię 3), zostanie on wywołany tylko przy _pierwszym_ renderowaniu komponentu. Tutaj wywołamy nasz nasłuchiwacz portfela (wallet listener) i inną funkcję portfela, aby zaktualizować nasz interfejs użytkownika i odzwierciedlić, czy portfel jest już podłączony.
- `connectWalletPressed` - ta funkcja zostanie wywołana, aby połączyć portfel MetaMask użytkownika z naszą zdecentralizowaną aplikacją (dapp).
- `onMintPressed` - ta funkcja zostanie wywołana, aby wybić NFT użytkownika.

Pod koniec tego pliku znajduje się interfejs użytkownika naszego komponentu. Jeśli uważnie przeanalizujesz ten kod, zauważysz, że aktualizujemy nasze zmienne stanu `url`, `name` i `description`, gdy zmieniają się dane wejściowe w odpowiadających im polach tekstowych.

Zobaczysz również, że `connectWalletPressed` i `onMintPressed` są wywoływane po kliknięciu przycisków o identyfikatorach odpowiednio `mintButton` i `walletButton`.

```javascript
//interfejs użytkownika naszego komponentu
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
    <p>
      Simply add your asset's link, name, and description, then press "Mint."
    </p>
    <form>
      <h2>🖼 Link to asset: </h2>
      <input
        type="text"
        placeholder="e.g., https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Name: </h2>
      <input
        type="text"
        placeholder="e.g., My first NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Description: </h2>
      <input
        type="text"
        placeholder="e.g., Even cooler than cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Mint NFT
    </button>
    <p id="status">{status}</p>
 
</div>
)
```

Na koniec omówmy, gdzie dodawany jest ten komponent Minter.

Jeśli przejdziesz do pliku `App.js`, który jest głównym komponentem w React działającym jako kontener dla wszystkich innych komponentów, zobaczysz, że nasz komponent Minter jest wstrzykiwany w linii 7.

**W tym samouczku będziemy edytować tylko `Minter.js file` i dodawać pliki w naszym folderze `src`.**

Teraz, gdy rozumiemy, z czym pracujemy, skonfigurujmy nasz portfel Ethereum!

## Konfiguracja portfela Ethereum {#set-up-your-ethereum-wallet}

Aby użytkownicy mogli wchodzić w interakcje z Twoim inteligentnym kontraktem, będą musieli połączyć swój portfel Ethereum z Twoją zdecentralizowaną aplikacją (dapp).

W tym samouczku użyjemy MetaMask, wirtualnego portfela w przeglądarce, służącego do zarządzania adresem Twojego konta Ethereum. Jeśli chcesz dowiedzieć się więcej o tym, jak działają transakcje w Ethereum, sprawdź [tę stronę](/developers/docs/transactions/).

Możesz pobrać i utworzyć konto MetaMask za darmo [tutaj](https://metamask.io/download). Podczas tworzenia konta, lub jeśli już je masz, upewnij się, że przełączasz się na obsługiwaną sieć testową, taką jak Sepolia \(abyśmy nie operowali prawdziwymi pieniędzmi\).
### Dodanie etheru z kranika

Aby wybić nasze NFT (lub podpisać jakiekolwiek transakcje na blockchainie Ethereum), będziemy potrzebować trochę fałszywego ETH. Aby uzyskać ETH w sieci testowej, użyj utrzymywanego kranika, takiego jak [kranik Alchemy Sepolia](https://www.alchemy.com/faucets/ethereum-sepolia), i wprowadź adres swojego konta Sepolia. Wkrótce potem powinieneś zobaczyć ETH na swoim koncie MetaMask!
### Sprawdź swoje saldo

Aby upewnić się, że nasze saldo jest na koncie, wykonajmy żądanie [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) za pomocą [narzędzia sandbox Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Zwróci to ilość ETH w naszym portfelu. Po wprowadzeniu adresu konta MetaMask i kliknięciu „Send Request”, powinieneś zobaczyć odpowiedź podobną do tej:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**UWAGA:** Ten wynik jest podany w wei, a nie w ETH. Wei jest używane jako najmniejszy nominał etheru. Przelicznik z wei na ETH to: 1 ETH = 10¹⁸ wei. Zatem jeśli zamienimy 0xde0b6b3a7640000 na system dziesiętny, otrzymamy 1\*10¹⁸, co równa się 1 ETH.

Uff! Nasze fałszywe pieniądze są na miejscu! <Emoji text=":money_mouth_face:" size={1} />
## Połączenie MetaMask z interfejsem użytkownika {#connect-metamask-to-your-ui}

Teraz, gdy nasz portfel MetaMask jest skonfigurowany, połączmy z nim naszą zdecentralizowaną aplikację (dapp)!

Ponieważ chcemy trzymać się paradygmatu [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), utworzymy osobny plik zawierający nasze funkcje do zarządzania logiką, danymi i regułami naszej dapp, a następnie przekażemy te funkcje do naszego frontendu (naszego komponentu Minter.js).

### Funkcja `connectWallet` {#connect-wallet-function}

Aby to zrobić, utwórzmy nowy folder o nazwie `utils` w katalogu `src` i dodajmy do niego plik o nazwie `interact.js`, który będzie zawierał wszystkie nasze funkcje interakcji z portfelem i inteligentnym kontraktem.

W naszym pliku `interact.js` napiszemy funkcję `connectWallet`, którą następnie zaimportujemy i wywołamy w naszym komponencie `Minter.js`.

W pliku `interact.js` dodaj następujący kod:

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Przeanalizujmy, co robi ten kod:

Po pierwsze, nasza funkcja sprawdza, czy `window.ethereum` jest włączone w Twojej przeglądarce.

`window.ethereum` to globalne API wstrzykiwane przez MetaMask i innych dostawców portfeli, które pozwala stronom internetowym na żądanie dostępu do kont Ethereum użytkowników. Po zatwierdzeniu może odczytywać dane z blockchainów, z którymi połączony jest użytkownik, i sugerować mu podpisywanie wiadomości oraz transakcji. Sprawdź [dokumentację MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents), aby uzyskać więcej informacji!

Jeśli `window.ethereum` _nie jest_ obecne, oznacza to, że MetaMask nie jest zainstalowany. Skutkuje to zwróceniem obiektu JSON, w którym zwrócony `address` jest pustym ciągiem znaków, a obiekt JSX `status` przekazuje informację, że użytkownik musi zainstalować MetaMask.

**Większość funkcji, które napiszemy, będzie zwracać obiekty JSON, których możemy użyć do aktualizacji naszych zmiennych stanu i interfejsu użytkownika.**

Jeśli jednak `window.ethereum` _jest_ obecne, wtedy robi się ciekawie.

Używając bloku try/catch, spróbujemy połączyć się z MetaMask, wywołując [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Wywołanie tej funkcji otworzy MetaMask w przeglądarce, po czym użytkownik zostanie poproszony o połączenie swojego portfela z Twoją dapp.

- Jeśli użytkownik zdecyduje się połączyć, `method: "eth_requestAccounts"` zwróci tablicę zawierającą wszystkie adresy kont użytkownika, które są połączone z dapp. W sumie nasza funkcja `connectWallet` zwróci obiekt JSON, który zawiera _pierwszy_ `address` w tej tablicy \(zobacz linię 9\) oraz wiadomość `status`, która zachęca użytkownika do napisania wiadomości do inteligentnego kontraktu.
- Jeśli użytkownik odrzuci połączenie, obiekt JSON będzie zawierał pusty ciąg znaków dla zwróconego `address` oraz wiadomość `status` odzwierciedlającą fakt, że użytkownik odrzucił połączenie.

### Dodanie funkcji connectWallet do komponentu interfejsu użytkownika Minter.js {#add-connect-wallet}

Teraz, gdy napisaliśmy tę funkcję `connectWallet`, połączmy ją z naszym komponentem `Minter.js.`.

Najpierw będziemy musieli zaimportować naszą funkcję do pliku `Minter.js`, dodając `import { connectWallet } from "./utils/interact.js";` na samej górze pliku `Minter.js`. Twoje pierwsze 11 linii pliku `Minter.js` powinno teraz wyglądać tak:

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //Zmienne stanu
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

Następnie wewnątrz naszej funkcji `connectWalletPressed` wywołamy zaimportowaną funkcję `connectWallet` w ten sposób:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Zauważ, jak większość naszej funkcjonalności jest wyabstrahowana z naszego komponentu `Minter.js` do pliku `interact.js`? Robimy to, aby zachować zgodność z paradygmatem M-V-C!

W `connectWalletPressed` po prostu wykonujemy wywołanie await do naszej zaimportowanej funkcji `connectWallet` i używając jej odpowiedzi, aktualizujemy nasze zmienne `status` i `walletAddress` za pomocą ich hooków stanu.

Teraz zapiszmy oba pliki `Minter.js` i `interact.js` i przetestujmy nasz dotychczasowy interfejs użytkownika.

Otwórz przeglądarkę na localhost:3000 i naciśnij przycisk „Connect Wallet” w prawym górnym rogu strony.

Jeśli masz zainstalowany MetaMask, powinieneś zostać poproszony o połączenie portfela z Twoją dapp. Zaakceptuj zaproszenie do połączenia.

Powinieneś zobaczyć, że przycisk portfela odzwierciedla teraz fakt, że Twój adres jest połączony.

Następnie spróbuj odświeżyć stronę... to dziwne. Nasz przycisk portfela prosi nas o połączenie MetaMask, mimo że jest już połączony...

Nie martw się jednak! Możemy to łatwo naprawić, implementując funkcję o nazwie `getCurrentWalletConnected`, która sprawdzi, czy adres jest już połączony z naszą dapp i odpowiednio zaktualizuje nasz interfejs użytkownika!

### Funkcja getCurrentWalletConnected {#get-current-wallet}

W pliku `interact.js` dodaj następującą funkcję `getCurrentWalletConnected`:

```javascript
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Ten kod jest _bardzo_ podobny do funkcji `connectWallet`, którą napisaliśmy wcześniej.

Główna różnica polega na tym, że zamiast wywoływać metodę `eth_requestAccounts`, która otwiera MetaMask, aby użytkownik mógł połączyć swój portfel, tutaj wywołujemy metodę `eth_accounts`, która po prostu zwraca tablicę zawierającą adresy MetaMask aktualnie połączone z naszą dapp.

Aby zobaczyć tę funkcję w akcji, wywołajmy ją w funkcji `useEffect` naszego komponentu `Minter.js`.

Podobnie jak w przypadku `connectWallet`, musimy zaimportować tę funkcję z naszego pliku `interact.js` do pliku `Minter.js` w ten sposób:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //importuj tutaj
} from "./utils/interact.js"
```

Teraz po prostu wywołujemy ją w naszej funkcji `useEffect`:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Zauważ, że używamy odpowiedzi z naszego wywołania `getCurrentWalletConnected` do aktualizacji naszych zmiennych stanu `walletAddress` i `status`.

Po dodaniu tego kodu spróbuj odświeżyć okno przeglądarki. Przycisk powinien informować, że jesteś połączony, i pokazywać podgląd adresu połączonego portfela - nawet po odświeżeniu!

### Implementacja addWalletListener {#implement-add-wallet-listener}

Ostatnim krokiem w konfiguracji portfela naszej dapp jest zaimplementowanie nasłuchiwacza portfela (wallet listener), aby nasz interfejs użytkownika aktualizował się, gdy zmienia się stan naszego portfela, na przykład gdy użytkownik się rozłącza lub przełącza konta.

W pliku `Minter.js` dodaj funkcję `addWalletListener`, która wygląda następująco:

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

Szybko przeanalizujmy, co się tutaj dzieje:

- Po pierwsze, nasza funkcja sprawdza, czy `window.ethereum` jest włączone \(tj. czy MetaMask jest zainstalowany\).
  - Jeśli nie jest, po prostu ustawiamy naszą zmienną stanu `status` na ciąg JSX, który zachęca użytkownika do zainstalowania MetaMask.
  - Jeśli jest włączone, konfigurujemy nasłuchiwacz `window.ethereum.on("accountsChanged")` w linii 3, który nasłuchuje zmian stanu w portfelu MetaMask, co obejmuje sytuacje, gdy użytkownik łączy dodatkowe konto z dapp, przełącza konta lub odłącza konto. Jeśli podłączone jest co najmniej jedno konto, zmienna stanu `walletAddress` jest aktualizowana jako pierwsze konto w tablicy `accounts` zwróconej przez nasłuchiwacz. W przeciwnym razie `walletAddress` jest ustawiane jako pusty ciąg znaków.

Na koniec musimy wywołać ją w naszej funkcji `useEffect`:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

I voila! Zakończyliśmy programowanie całej funkcjonalności naszego portfela! Teraz, gdy nasz portfel jest skonfigurowany, dowiedzmy się, jak wybić nasze NFT!

## Podstawy metadanych NFT {#nft-metadata-101}

Pamiętasz metadane NFT, o których mówiliśmy w Kroku 0 tego samouczka — to one ożywiają NFT, pozwalając mu posiadać właściwości, takie jak aktywo cyfrowe, nazwa, opis i inne atrybuty.

Będziemy musieli skonfigurować te metadane jako obiekt JSON i zapisać je, abyśmy mogli przekazać je jako parametr `tokenURI` podczas wywoływania funkcji `mintNFT` naszego inteligentnego kontraktu.

Tekst w polach „Link to Asset” (Link do aktywa), „Name” (Nazwa), „Description” (Opis) będzie stanowić różne właściwości metadanych naszego NFT. Sformatujemy te metadane jako obiekt JSON, ale istnieje kilka opcji, gdzie możemy przechowywać ten obiekt JSON:

- Moglibyśmy przechowywać go na blockchainie Ethereum; jednak byłoby to bardzo drogie.
- Moglibyśmy przechowywać go na scentralizowanym serwerze, takim jak AWS lub Firebase. Ale to zniweczyłoby nasz etos decentralizacji.
- Moglibyśmy użyć IPFS, zdecentralizowanego protokołu i sieci peer-to-peer do przechowywania i udostępniania danych w rozproszonym systemie plików. Ponieważ ten protokół jest zdecentralizowany i darmowy, jest to nasza najlepsza opcja!

Aby przechowywać nasze metadane w IPFS, użyjemy [Pinata](https://pinata.cloud/), wygodnego API i zestawu narzędzi IPFS. W następnym kroku wyjaśnimy dokładnie, jak to zrobić!

## Użycie Pinata do przypięcia metadanych do IPFS {#use-pinata-to-pin-your-metadata-to-ipfs}

Jeśli nie masz konta [Pinata](https://pinata.cloud/), zarejestruj darmowe konto [tutaj](https://app.pinata.cloud/auth/signup) i wykonaj kroki w celu weryfikacji adresu e-mail i konta.

### Utworzenie klucza API Pinata {#create-pinata-api-key}

Przejdź na stronę [https://pinata.cloud/keys](https://pinata.cloud/keys), a następnie wybierz przycisk „New Key” (Nowy klucz) na górze, ustaw widżet Admin jako włączony i nazwij swój klucz.

Następnie zobaczysz wyskakujące okienko z informacjami o Twoim API. Upewnij się, że przechowujesz je w bezpiecznym miejscu.

Teraz, gdy nasz klucz jest skonfigurowany, dodajmy go do naszego projektu, abyśmy mogli z niego korzystać.

### Utworzenie pliku .env {#create-a-env}

Możemy bezpiecznie przechowywać nasz klucz i sekret Pinata w pliku środowiskowym. Zainstalujmy [pakiet dotenv](https://www.npmjs.com/package/dotenv) w katalogu Twojego projektu.

Otwórz nową kartę w terminalu \(oddzielną od tej, na której działa localhost\) i upewnij się, że jesteś w folderze `minter-starter-files`, a następnie uruchom następujące polecenie w terminalu:

```text
npm install dotenv --save
```

Następnie utwórz plik `.env` w katalogu głównym `minter-starter-files`, wpisując w wierszu poleceń następujące polecenie:

```javascript
vim.env
```

Spowoduje to otwarcie pliku `.env` w vimie \(edytorze tekstu\). Aby go zapisać, naciśnij na klawiaturze kolejno „esc” + „:” + „q”.

Następnie w VSCode przejdź do pliku `.env` i dodaj do niego swój klucz API Pinata oraz sekret API, w ten sposób:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

Zapisz plik, a następnie będziesz gotowy do rozpoczęcia pisania funkcji przesyłającej metadane JSON do IPFS!

### Implementacja pinJSONToIPFS {#pin-json-to-ipfs}

Na szczęście dla nas, Pinata posiada [API specjalnie do przesyłania danych JSON do IPFS](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) oraz wygodny przykład w JavaScript z użyciem axios, którego możemy użyć z niewielkimi modyfikacjami.

W folderze `utils` utwórzmy kolejny plik o nazwie `pinata.js`, a następnie zaimportujmy nasz sekret i klucz Pinata z pliku .env w ten sposób:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

Następnie wklej poniższy dodatkowy kod do pliku `pinata.js`. Nie martw się, przeanalizujemy, co to wszystko oznacza!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //wykonywanie żądania POST axios do Pinata ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      }
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }
    })
}
```

Więc co dokładnie robi ten kod?

Po pierwsze, importuje [axios](https://www.npmjs.com/package/axios), opartego na obietnicach (promises) klienta HTTP dla przeglądarki i Node.js, którego użyjemy do wykonania żądania do Pinata.

Następnie mamy naszą asynchroniczną funkcję `pinJSONToIPFS`, która przyjmuje `JSONBody` jako dane wejściowe oraz klucz i sekret API Pinata w nagłówku, a wszystko to w celu wykonania żądania POST do ich API `pinJSONToIPFS`.

- Jeśli to żądanie POST zakończy się sukcesem, nasza funkcja zwraca obiekt JSON z wartością logiczną `success` ustawioną na true oraz `pinataUrl`, gdzie przypięto nasze metadane. Użyjemy tego zwróconego `pinataUrl` jako danych wejściowych `tokenURI` dla funkcji wybijania naszego inteligentnego kontraktu.
- Jeśli to żądanie POST się nie powiedzie, nasza funkcja zwraca obiekt JSON z wartością logiczną `success` ustawioną na false oraz ciągiem znaków `message`, który przekazuje nasz błąd.

Podobnie jak w przypadku typów zwracanych przez naszą funkcję `connectWallet`, zwracamy obiekty JSON, abyśmy mogli użyć ich parametrów do aktualizacji naszych zmiennych stanu i interfejsu użytkownika.

## Załadowanie inteligentnego kontraktu {#load-your-smart-contract}

Teraz, gdy mamy sposób na przesłanie naszych metadanych NFT do IPFS za pomocą naszej funkcji `pinJSONToIPFS`, będziemy potrzebować sposobu na załadowanie instancji naszego inteligentnego kontraktu, abyśmy mogli wywołać jego funkcję `mintNFT`.

Jak wspomnieliśmy wcześniej, w tym samouczku użyjemy [tego istniejącego inteligentnego kontraktu NFT](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE); jednak jeśli chcesz dowiedzieć się, jak go stworzyliśmy, lub stworzyć własny, gorąco polecamy zapoznanie się z naszym innym samouczkiem: [„Jak stworzyć NFT”](https://www.alchemy.com/docs/how-to-create-an-nft).

### ABI kontraktu {#contract-abi}

Jeśli uważnie przyjrzałeś się naszym plikom, zauważyłeś, że w naszym katalogu `src` znajduje się plik `contract-abi.json`. ABI jest niezbędne do określenia, którą funkcję wywoła kontrakt, a także do upewnienia się, że funkcja zwróci dane w oczekiwananym formacie.

Będziemy również potrzebować klucza API Alchemy oraz API Alchemy Web3, aby połączyć się z blockchainem Ethereum i załadować nasz inteligentny kontrakt.

### Utworzenie klucza API Alchemy

Jeśli nie masz jeszcze konta Alchemy, [zarejestruj się za darmo tutaj.](https://alchemy.com/?a=eth-org-nft-minter)

Po utworzeniu konta Alchemy możesz wygenerować klucz API, tworząc aplikację. Pozwoli nam to na wysyłanie żądań do sieci testowej Sepolia.

Przejdź do strony „Create App” w swoim panelu Alchemy (Alchemy Dashboard), najeżdżając kursorem na „Apps” na pasku nawigacyjnym i klikając „Create App”.

Nazwij swoją aplikację (my wybraliśmy „My First NFT!”), dodaj krótki opis, wybierz „Staging” jako środowisko (Environment) używane do celów ewidencyjnych aplikacji i wybierz „Sepolia” jako swoją sieć.

Kliknij „Create app” i to wszystko! Twoja aplikacja powinna pojawić się w tabeli poniżej.

Świetnie, skoro utworzyliśmy już nasz adres URL HTTP API Alchemy, skopiuj go do schowka...

…a następnie dodajmy go do naszego pliku `.env`. W całości Twój plik .env powinien wyglądać tak:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-sepolia.g.alchemy.com/v2/<alchemy-key>
```

Teraz, gdy mamy już ABI naszego kontraktu i klucz API Alchemy, jesteśmy gotowi do załadowania naszego inteligentnego kontraktu za pomocą [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
### Konfiguracja punktu końcowego Alchemy Web3 i kontraktu {#setup-alchemy-endpoint}

Po pierwsze, jeśli jeszcze tego nie zrobiłeś, będziesz musiał zainstalować [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), przechodząc do katalogu domowego: `nft-minter-tutorial` w terminalu:

```text
cd ..
npm install @alch/alchemy-web3
```

Następnie wróćmy do naszego pliku `interact.js`. Na górze pliku dodaj następujący kod, aby zaimportować klucz Alchemy z pliku .env i skonfigurować punkt końcowy Alchemy Web3:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) to wrapper dla [Web3.js](https://docs.web3js.org/), zapewniający ulepszone metody API i inne kluczowe korzyści, które ułatwią Ci życie jako programiście Web3. Został zaprojektowany tak, aby wymagał minimalnej konfiguracji, dzięki czemu możesz od razu zacząć go używać w swojej aplikacji!

Następnie dodajmy do naszego pliku ABI kontraktu i adres kontraktu.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

Gdy mamy już oba te elementy, jesteśmy gotowi do rozpoczęcia kodowania naszej funkcji wybijania!

## Implementacja funkcji mintNFT {#implement-the-mintnft-function}

Wewnątrz pliku `interact.js` zdefiniujmy naszą funkcję `mintNFT`, która, jak sama nazwa wskazuje, wybije nasze NFT.

Ponieważ będziemy wykonywać liczne wywołania asynchroniczne \(do Pinata, aby przypiąć nasze metadane do IPFS, do Alchemy Web3, aby załadować nasz inteligentny kontrakt, oraz do MetaMask, aby podpisać nasze transakcje\), nasza funkcja również będzie asynchroniczna.

Trzema danymi wejściowymi do naszej funkcji będą `url` naszego aktywa cyfrowego, `name` oraz `description`. Dodaj następującą sygnaturę funkcji poniżej funkcji `connectWallet`:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### Obsługa błędów danych wejściowych {#input-error-handling}

Naturalnie, sensowne jest posiadanie jakiejś formy obsługi błędów danych wejściowych na początku funkcji, abyśmy mogli z niej wyjść, jeśli nasze parametry wejściowe nie są poprawne. Wewnątrz naszej funkcji dodajmy następujący kod:

```javascript
export const mintNFT = async (url, name, description) => {
  //obsługa błędów
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

Zasadniczo, jeśli którykolwiek z parametrów wejściowych jest pustym ciągiem znaków, zwracamy obiekt JSON, w którym wartość logiczna `success` to false, a ciąg znaków `status` przekazuje informację, że wszystkie pola w naszym interfejsie użytkownika muszą być wypełnione.

### Przesłanie metadanych do IPFS {#upload-metadata-to-ipfs}

Gdy wiemy już, że nasze metadane są sformatowane poprawnie, następnym krokiem jest opakowanie ich w obiekt JSON i przesłanie do IPFS za pomocą napisanej przez nas funkcji `pinJSONToIPFS`!

Aby to zrobić, najpierw musimy zaimportować funkcję `pinJSONToIPFS` do naszego pliku `interact.js`. Na samej górze pliku `interact.js` dodajmy:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

Przypomnijmy, że `pinJSONToIPFS` przyjmuje ciało JSON. Zanim więc ją wywołamy, będziemy musieli sformatować nasze parametry `url`, `name` i `description` w obiekt JSON.

Zaktualizujmy nasz kod, aby utworzyć obiekt JSON o nazwie `metadata`, a następnie wywołajmy `pinJSONToIPFS` z tym parametrem `metadata`:

```javascript
export const mintNFT = async (url, name, description) => {
  //obsługa błędów
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //utwórz metadane
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //wykonaj wywołanie do Pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

Zauważ, że przechowujemy odpowiedź z naszego wywołania `pinJSONToIPFS(metadata)` w obiekcie `pinataResponse`. Następnie parsujemy ten obiekt w poszukiwaniu błędów.

Jeśli wystąpi błąd, zwracamy obiekt JSON, w którym wartość logiczna `success` to false, a nasz ciąg znaków `status` przekazuje informację, że nasze wywołanie się nie powiodło. W przeciwnym razie wyodrębniamy `pinataURL` z `pinataResponse` i przechowujemy go jako naszą zmienną `tokenURI`.

Teraz nadszedł czas, aby załadować nasz inteligentny kontrakt za pomocą API Alchemy Web3, które zainicjowaliśmy na górze naszego pliku. Dodaj następującą linię kodu na dole funkcji `mintNFT`, aby ustawić kontrakt w zmiennej globalnej `window.contract`:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

Ostatnią rzeczą do dodania w naszej funkcji `mintNFT` jest nasza transakcja Ethereum:

```javascript
//skonfiguruj swoją transakcję Ethereum
const transactionParameters = {
  to: contractAddress, // Wymagane z wyjątkiem publikacji kontraktu.
  from: window.ethereum.selectedAddress, // musi pasować do aktywnego adresu użytkownika.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //wykonaj wywołanie do inteligentnego kontraktu NFT
}

//podpisz transakcję przez MetaMask
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Something went wrong: " + error.message,
  }
}
```

Jeśli znasz już transakcje Ethereum, zauważysz, że struktura jest dość podobna do tego, co już widziałeś.

- Po pierwsze, konfigurujemy parametry naszej transakcji.
  - `to` określa adres odbiorcy \(nasz inteligentny kontrakt\)
  - `from` określa osobę podpisującą transakcję \(adres użytkownika połączony z MetaMask: `window.ethereum.selectedAddress`\)
  - `data` zawiera wywołanie metody `mintNFT` naszego inteligentnego kontraktu, która otrzymuje nasze `tokenURI` oraz adres portfela użytkownika, `window.ethereum.selectedAddress`, jako dane wejściowe
- Następnie wykonujemy wywołanie await, `window.ethereum.request,`, w którym prosimy MetaMask o podpisanie transakcji. Zauważ, że w tym żądaniu określamy naszą metodę eth \(eth_SentTransaction\) i przekazujemy nasze `transactionParameters`. W tym momencie MetaMask otworzy się w przeglądarce i poprosi użytkownika o podpisanie lub odrzucenie transakcji.
  - Jeśli transakcja zakończy się sukcesem, funkcja zwróci obiekt JSON, w którym wartość logiczna `success` jest ustawiona na true, a ciąg znaków `status` zachęca użytkownika do sprawdzenia Etherscan w celu uzyskania dodatkowych informacji o transakcji.
  - Jeśli transakcja się nie powiedzie, funkcja zwróci obiekt JSON, w którym wartość logiczna `success` jest ustawiona na false, a ciąg znaków `status` przekazuje komunikat o błędzie.

W sumie nasza funkcja `mintNFT` powinna wyglądać tak:

```javascript
export const mintNFT = async (url, name, description) => {
  //obsługa błędów
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //utwórz metadane
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //żądanie przypięcia Pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //załaduj inteligentny kontrakt
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //skonfiguruj swoją transakcję Ethereum
  const transactionParameters = {
    to: contractAddress, // Wymagane z wyjątkiem publikacji kontraktu.
    from: window.ethereum.selectedAddress, // musi pasować do aktywnego adresu użytkownika.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //wykonaj wywołanie do inteligentnego kontraktu NFT
  }

  //podpisz transakcję przez MetaMask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
}
```

To jedna gigantyczna funkcja! Teraz musimy tylko połączyć naszą funkcję `mintNFT` z naszym komponentem `Minter.js`...

## Połączenie mintNFT z naszym frontendem Minter.js {#connect-our-frontend}

Otwórz plik `Minter.js` i zaktualizuj linię `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` na górze, aby wyglądała tak:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

Na koniec zaimplementuj funkcję `onMintPressed`, aby wykonać wywołanie await do zaimportowanej funkcji `mintNFT` i zaktualizować zmienną stanu `status`, aby odzwierciedlić, czy nasza transakcja zakończyła się sukcesem, czy niepowodzeniem:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## Wdrożenie NFT na działającej stronie internetowej

Gotowy, aby udostępnić swój projekt, by użytkownicy mogli wchodzić z nim w interakcje? Zapoznaj się z [dokumentacją wdrożenia React](https://create-react-app.dev/docs/deployment/), aby dowiedzieć się, jak wdrożyć swój minter na działającej stronie internetowej.

Jeszcze tylko jeden krok...
## Podbij świat blockchaina {#take-the-blockchain-world-by-storm}

Żartuję, dotarłeś do końca samouczka!

Podsumowując, budując minter NFT, z powodzeniem nauczyłeś się, jak:

- Połączyć się z MetaMask przez swój projekt frontendowy
- Wywoływać metody inteligentnego kontraktu z frontendu
- Podpisywać transakcje za pomocą MetaMask

Prawdopodobnie chciałbyś móc pochwalić się w swoim portfelu NFT wybitymi za pośrednictwem Twojej dapp — więc koniecznie sprawdź nasz krótki samouczek [Jak wyświetlić swoje NFT w portfelu](/developers/tutorials/how-to-view-nft-in-metamask/)!

I jak zawsze, jeśli masz jakiekolwiek pytania, jesteśmy tutaj, aby pomóc na [Discordzie Alchemy](https://discord.gg/gWuC7zB). Nie możemy się doczekać, aby zobaczyć, jak zastosujesz koncepcje z tego samouczka w swoich przyszłych projektach!
