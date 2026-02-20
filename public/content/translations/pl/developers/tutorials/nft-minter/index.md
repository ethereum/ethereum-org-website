---
title: Samouczek mintowania NFT
description: "W tym samouczku zbudujesz minter NFT i dowiesz się, jak stworzyć pełną dapką, łącząc swój inteligentny kontrakt z frontendem React za pomocą MetaMask i narzędzi Web3."
author: "smudgil"
tags:
  [
    "solidity",
    "NFT",
    "alchemy",
    "smart kontrakty",
    "frontend",
    "Pinata"
  ]
skill: intermediate
lang: pl
published: 2021-10-06
---

Jednym z największych wyzwań dla deweloperów wywodzących się ze środowiska Web2 jest zorientowanie się, jak połączyć swój inteligentny kontrakt z projektem frontendu i wejść z nim w interakcję.

Tworząc minter NFT — prosty interfejs użytkownika, w którym można wprowadzić link do zasobu cyfrowego, tytuł i opis — dowiesz się, jak:

- Połączyć się z MetaMask za pośrednictwem projektu frontendowego
- Wywoływać metody inteligentnego kontraktu z poziomu frontendu
- Podpisywać transakcje za pomocą MetaMask

W tym samouczku jako frameworku frontendowego będziemy używać [React](https://react.dev/). Ponieważ ten samouczek skupia się głównie na rozwoju Web3, nie będziemy poświęcać wiele czasu na analizowanie podstaw React. Zamiast tego skupimy się na wprowadzeniu funkcjonalności do naszego projektu.

Warunkiem wstępnym jest posiadanie podstawowej wiedzy na temat React — jak działają komponenty, propsy, useState/useEffect i podstawowe wywoływanie funkcji. Jeśli te terminy są dla Ciebie nowe, możesz zapoznać się z tym [samouczkiem Wprowadzenie do React](https://react.dev/learn/tutorial-tic-tac-toe). Wzrokowcom gorąco polecamy tę doskonałą serię filmów [Pełny nowoczesny samouczek React](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) autorstwa Net Ninja.

A jeśli jeszcze go nie masz, na pewno będziesz potrzebować konta Alchemy, aby ukończyć ten samouczek, a także aby cokolwiek budować na blockchainie. Zarejestruj się, aby otrzymać darmowe konto [tutaj](https://alchemy.com/).

Bez zbędnych ceregieli, zaczynajmy!

## Tworzenie NFT 101 {#making-nfts-101}

Zanim w ogóle zaczniemy przyglądać się jakiemukolwiek kodowi, ważne jest, aby zrozumieć, jak działa tworzenie NFT. Składa się ono z dwóch kroków:

### Opublikuj inteligentny kontrakt NFT na blockchainie Ethereum {#publish-nft}

Największa różnica między dwoma standardami inteligentnych kontraktów NFT polega na tym, że ERC-1155 jest standardem wielotokenowym i zawiera funkcjonalność partii, podczas gdy ERC-721 jest standardem jednotokenowym i w związku z tym obsługuje tylko transfer jednego tokena na raz.

### Wywołaj funkcję mintowania {#minting-function}

Zazwyczaj ta funkcja mintowania wymaga podania dwóch zmiennych jako parametrów: po pierwsze `recipient`, który określa adres, na który trafi nowo wybite NFT, a po drugie `tokenURI` NFT, czyli ciąg znaków, który odwołuje się do dokumentu JSON opisującego metadane NFT.

Metadane NFT to tak naprawdę to, co ożywia go, pozwalając na posiadanie takich właściwości jak nazwa, opis, obraz (lub inny zasób cyfrowy) i inne atrybuty. Oto [przykład tokenURI](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2), który zawiera metadane NFT.

W tym samouczku skupimy się na części 2, wywołaniu istniejącej funkcji mintowania inteligentnego kontraktu NFT za pomocą naszego interfejsu użytkownika React.

[Oto link](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) do inteligentnego kontraktu ERC-721 NFT, który będziemy wywoływać w tym samouczku. Jeśli chcesz dowiedzieć się, jak go stworzyliśmy, gorąco polecamy zapoznanie się z naszym innym samouczkiem, [„Jak stworzyć NFT”](https://www.alchemy.com/docs/how-to-create-an-nft).

Super, teraz, gdy rozumiemy, jak działa tworzenie NFT, sklonujmy nasze pliki startowe!

## Klonowanie plików startowych {#clone-the-starter-files}

Najpierw przejdź do [repozytorium GitHub nft-minter-tutorial](https://github.com/alchemyplatform/nft-minter-tutorial), aby pobrać pliki startowe dla tego projektu. Sklonuj to repozytorium do swojego lokalnego środowiska.

Po otwarciu sklonowanego repozytorium `nft-minter-tutorial` zauważysz, że zawiera ono dwa foldery: `minter-starter-files` i `nft-minter`.

- `minter-starter-files` zawiera pliki startowe (zasadniczo interfejs użytkownika React) dla tego projektu. W tym samouczku **będziemy pracować w tym katalogu**, ponieważ dowiesz się, jak ożywić ten interfejs użytkownika, łącząc go z portfelem Ethereum i inteligentnym kontraktem NFT.
- `nft-minter` zawiera cały ukończony samouczek i jest dostępny jako **odniesienie**, **jeśli utkniesz**.

Następnie otwórz swoją kopię `minter-starter-files` w edytorze kodu, a następnie przejdź do folderu `src`.

Cały kod, który napiszemy, będzie znajdować się w folderze `src`. Będziemy edytować komponent `Minter.js` i pisać dodatkowe pliki javascript, aby nadać naszemu projektowi funkcjonalność Web3.

## Krok 2: Sprawdź nasze pliki startowe {#step-2-check-out-our-starter-files}

Zanim zaczniemy kodować, warto sprawdzić, co już zostało dla nas przygotowane w plikach startowych.

### Uruchomienie projektu React {#get-your-react-project-running}

Zacznijmy od uruchomienia projektu React w naszej przeglądarce. Piękno React polega na tym, że gdy nasz projekt jest już uruchomiony w przeglądarce, wszelkie zapisane przez nas zmiany będą na bieżąco aktualizowane w przeglądarce.

Aby uruchomić projekt, przejdź do katalogu głównego folderu `minter-starter-files`, a następnie uruchom `npm install` w terminalu, aby zainstalować zależności projektu:

```bash
cd minter-starter-files
npm install
```

Po zakończeniu instalacji uruchom `npm start` w terminalu:

```bash
npm start
```

Powinno to otworzyć adres http://localhost:3000/ w przeglądarce, gdzie zobaczysz frontend naszego projektu. Powinien on składać się z 3 pól: miejsca na wprowadzenie linku do zasobu NFT, wprowadzenie nazwy NFT i podanie opisu.

Jeśli spróbujesz kliknąć przyciski „Połącz portfel” lub „Mintuj NFT”, zauważysz, że nie działają – to dlatego, że wciąż musimy zaprogramować ich funkcjonalność! :\)

### Komponent Minter.js {#minter-js}

**UWAGA:** Upewnij się, że jesteś w folderze `minter-starter-files`, a nie w folderze `nft-minter`!

Wróćmy do folderu `src` w naszym edytorze i otwórzmy plik `Minter.js`. Jest bardzo ważne, abyśmy zrozumieli wszystko w tym pliku, ponieważ jest to główny komponent React, nad którym będziemy pracować.

Na górze tego pliku mamy zmienne stanu, które będziemy aktualizować po określonych zdarzeniach.

```javascript
//Zmienne stanu
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

Nigdy nie słyszałeś o zmiennych stanu React lub hookach stanu? Sprawdź [tę](https://legacy.reactjs.org/docs/hooks-state.html) dokumentację.

Oto, co reprezentuje każda ze zmiennych:

- `walletAddress` - ciąg znaków, który przechowuje adres portfela użytkownika
- `status` - ciąg znaków, który zawiera wiadomość do wyświetlenia na dole interfejsu użytkownika
- `name` - ciąg znaków, który przechowuje nazwę NFT
- `description` - ciąg znaków, który przechowuje opis NFT
- `url` - ciąg znaków, który jest linkiem do zasobu cyfrowego NFT

Po zmiennych stanu zobaczysz trzy niezimplementowane funkcje: `useEffect`, `connectWalletPressed` i `onMintPressed`. Zauważysz, że wszystkie te funkcje są `async`, ponieważ będziemy w nich wykonywać asynchroniczne wywołania API! Ich nazwy są tożsame z ich funkcjonalnością:

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

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - to hook React, który jest wywoływany po wyrenderowaniu komponentu. Ponieważ ma przekazany pusty prop tablicy `[]` (patrz linia 3), zostanie wywołany tylko przy _pierwszym_ renderowaniu komponentu. Tutaj wywołamy nasz nasłuchiwacz portfela i inną funkcję portfela, aby zaktualizować nasz interfejs użytkownika, aby odzwierciedlić, czy portfel jest już podłączony.
- `connectWalletPressed` - ta funkcja zostanie wywołana, aby połączyć portfel MetaMask użytkownika z naszą dapką.
- `onMintPressed` - ta funkcja zostanie wywołana w celu mintowania NFT użytkownika.

Pod koniec tego pliku mamy interfejs użytkownika naszego komponentu. Jeśli uważnie przeskanujesz ten kod, zauważysz, że aktualizujemy nasze zmienne stanu `url`, `name` i `description`, gdy zmienia się dane wejściowe w odpowiadających im polach tekstowych.

Zobaczysz również, że `connectWalletPressed` i `onMintPressed` są wywoływane odpowiednio po kliknięciu przycisków o identyfikatorach `mintButton` i `walletButton`.

```javascript
//interfejs użytkownika naszego komponentu
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Połączono: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Połącz portfel</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Minter NFT od Alchemy</h1>
    <p>
      Wystarczy dodać link do zasobu, nazwę i opis, a następnie nacisnąć „Mintuj”.
    </p>
    <form>
      <h2>🖼 Link do zasobu: </h2>
      <input
        type="text"
        placeholder="np. https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Nazwa: </h2>
      <input
        type="text"
        placeholder="np. Moje pierwsze NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Opis: </h2>
      <input
        type="text"
        placeholder="np. Jeszcze fajniejsze niż cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Mintuj NFT
    </button>
    <p id="status">{status}</p>
</div>
)
```

Na koniec zajmijmy się tym, gdzie ten komponent Minter jest dodawany.

Jeśli przejdziesz do pliku `App.js`, który jest głównym komponentem w React, działającym jako kontener dla wszystkich innych komponentów, zobaczysz, że nasz komponent Minter jest wstawiony w linii 7.

**W tym samouczku będziemy edytować tylko plik `Minter.js` i dodawać pliki w naszym folderze `src`.**

Teraz, gdy rozumiemy, z czym pracujemy, skonfigurujmy nasz portfel Ethereum!

## Skonfiguruj swój portfel Ethereum {#set-up-your-ethereum-wallet}

Aby użytkownicy mogli wchodzić w interakcję z Twoim inteligentnym kontraktem, będą musieli połączyć swój portfel Ethereum z Twoją dapką.

### Pobierz MetaMask {#download-metamask}

W tym samouczku użyjemy MetaMask, wirtualnego portfela w przeglądarce, który służy do zarządzania adresem konta Ethereum. Jeśli chcesz dowiedzieć się więcej o tym, jak działają transakcje w Ethereum, sprawdź [tę stronę](/developers/docs/transactions/).

Możesz pobrać i utworzyć konto MetaMask za darmo [tutaj](https://metamask.io/download). Podczas tworzenia konta, lub jeśli już je masz, upewnij się, że przełączyłeś się na „sieć testową Ropsten” w prawym górnym rogu (abyśmy nie mieli do czynienia z prawdziwymi pieniędzmi).

### Dodaj ether z Faucet {#add-ether-from-faucet}

Aby mintować nasze NFT (lub podpisywać jakiekolwiek transakcje na blockchainie Ethereum), będziemy potrzebować trochę fałszywego Eth. Aby uzyskać Eth, możesz przejść do [Ropsten faucet](https://faucet.ropsten.be/) i wprowadzić adres swojego konta Ropsten, a następnie kliknąć „Wyślij Ropsten Eth”. Wkrótce powinieneś zobaczyć Eth na swoim koncie MetaMask!

### Sprawdź swoje saldo {#check-your-balance}

Aby sprawdzić, czy nasze saldo jest na miejscu, wykonajmy żądanie [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) za pomocą [narzędzia kompozytora Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Zwróci to ilość Eth w naszym portfelu. Po wprowadzeniu adresu konta MetaMask i kliknięciu „Wyślij żądanie” powinieneś zobaczyć następującą odpowiedź:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**UWAGA:** ten wynik jest w wei, a nie w eth. Wei jest używany jako najmniejsza jednostka etheru. Konwersja z wei na eth to: 1 eth = 10¹⁸ wei. Więc jeśli przekonwertujemy 0xde0b6b3a7640000 na system dziesiętny, otrzymamy 1\*10¹⁸, co równa się 1 eth.

Uff! Nasze fałszywe pieniądze są na miejscu! <Emoji text=":money_mouth_face:" size={1} />

## Połącz MetaMask ze swoim interfejsem użytkownika {#connect-metamask-to-your-UI}

Teraz, gdy nasz portfel MetaMask jest skonfigurowany, połączmy z nim naszą dapką!

Ponieważ chcemy stosować paradygmat [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), stworzymy osobny plik, który będzie zawierał nasze funkcje do zarządzania logiką, danymi i zasadami naszej dapki, a następnie przekażemy te funkcje do naszego frontendu (naszego komponentu Minter.js).

### Funkcja `connectWallet` {#connect-wallet-function}

W tym celu utwórzmy nowy folder o nazwie `utils` w katalogu `src` i dodajmy do niego plik o nazwie `interact.js`, który będzie zawierał wszystkie nasze funkcje interakcji z portfelem i inteligentnym kontraktem.

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
        status: "👆🏽 Wpisz wiadomość w polu tekstowym powyżej.",
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
              Musisz zainstalować MetaMask, wirtualny portfel Ethereum, w swojej
              przeglądarce.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Przeanalizujmy, co robi ten kod:

Najpierw nasza funkcja sprawdza, czy `window.ethereum` jest włączone w Twojej przeglądarce.

`window.ethereum` to globalny interfejs API wstrzykiwany przez MetaMask i innych dostawców portfeli, który pozwala stronom internetowym na żądanie dostępu do kont Ethereum użytkowników. Po zatwierdzeniu może odczytywać dane z blockchainów, z którymi użytkownik jest połączony, i sugerować, aby użytkownik podpisywał wiadomości i transakcje. Sprawdź [dokumentację MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents), aby uzyskać więcej informacji!

Jeśli `window.ethereum` _nie jest_ obecne, oznacza to, że MetaMask nie jest zainstalowany. Powoduje to zwrócenie obiektu JSON, w którym zwrócony `adres` jest pustym ciągiem, a obiekt `status` JSX informuje, że użytkownik musi zainstalować MetaMask.

**Większość funkcji, które piszemy, będzie zwracać obiekty JSON, których możemy użyć do aktualizacji naszych zmiennych stanu i interfejsu użytkownika.**

Teraz, jeśli `window.ethereum` _jest_ obecne, to wtedy robi się ciekawie.

Używając pętli try/catch, spróbujemy połączyć się z MetaMask, wywołując [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Wywołanie tej funkcji otworzy MetaMask w przeglądarce, gdzie użytkownik zostanie poproszony o podłączenie swojego portfela do Twojej dapki.

- Jeśli użytkownik zdecyduje się połączyć, `metoda: "eth_requestAccounts"` zwróci tablicę zawierającą wszystkie adresy kont użytkownika, które są połączone z dapką. W sumie nasza funkcja `connectWallet` zwróci obiekt JSON, który zawiera _pierwszy_ `adres` w tej tablicy (patrz linia 9) oraz wiadomość `status`, która prosi użytkownika o napisanie wiadomości do inteligentnego kontraktu.
- Jeśli użytkownik odrzuci połączenie, obiekt JSON będzie zawierał pusty ciąg dla zwróconego `adresu` oraz komunikat `status`, który odzwierciedla, że użytkownik odrzucił połączenie.

### Dodaj funkcję connectWallet do komponentu interfejsu użytkownika Minter.js {#add-connect-wallet}

Teraz, gdy napisaliśmy tę funkcję `connectWallet`, połączmy ją z naszym komponentem `Minter.js`.

Najpierw będziemy musieli zaimportować naszą funkcję do naszego pliku `Minter.js`, dodając `import { connectWallet } from "./utils/interact.js";` na górze pliku `Minter.js`. Twoje pierwsze 11 linii `Minter.js` powinno teraz wyglądać tak:

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

Następnie w naszej funkcji `connectWalletPressed` wywołamy naszą zaimportowaną funkcję `connectWallet`, w ten sposób:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Zauważ, jak większość naszej funkcjonalności jest wyabstrahowana z naszego komponentu `Minter.js` z pliku `interact.js`? Robimy tak, aby zachować zgodność z paradygmatem M-V-C!

W `connectWalletPressed` po prostu wykonujemy wywołanie await do naszej zaimportowanej funkcji `connectWallet`, a za pomocą jej odpowiedzi aktualizujemy nasze zmienne `status` i `walletAddress` za pomocą ich hooków stanu.

Teraz zapiszmy oba pliki `Minter.js` i `interact.js` i przetestujmy nasz interfejs użytkownika.

Otwórz przeglądarkę pod adresem localhost:3000 i naciśnij przycisk „Połącz portfel” w prawym górnym rogu strony.

Jeśli masz zainstalowany MetaMask, powinieneś zostać poproszony o podłączenie swojego portfela do Twojej dapki. Zaakceptuj zaproszenie do połączenia.

Powinieneś zobaczyć, że przycisk portfela teraz odzwierciedla, że Twój adres jest podłączony.

Następnie spróbuj odświeżyć stronę... to jest dziwne. Nasz przycisk portfela prosi nas o podłączenie MetaMask, mimo że jest już podłączony...

Ale nie martw się! Możemy to łatwo naprawić, implementując funkcję o nazwie `getCurrentWalletConnected`, która sprawdzi, czy adres jest już podłączony do naszej dapki i odpowiednio zaktualizuje nasz interfejs użytkownika!

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
          status: "👆🏽 Wpisz wiadomość w polu tekstowym powyżej.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Połącz się z MetaMask za pomocą przycisku w prawym górnym rogu.",
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
              Musisz zainstalować MetaMask, wirtualny portfel Ethereum, w swojej
              przeglądarce.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Ten kod jest _bardzo_ podobny do funkcji `connectWallet`, którą napisaliśmy wcześniej.

Główna różnica polega na tym, że zamiast wywoływać metodę `eth_requestAccounts`, która otwiera MetaMask, aby użytkownik mógł połączyć swój portfel, tutaj wywołujemy metodę `eth_accounts`, która po prostu zwraca tablicę zawierającą adresy MetaMask aktualnie połączone z naszą dapką.

Aby zobaczyć tę funkcję w akcji, wywołajmy ją w funkcji `useEffect` naszego komponentu `Minter.js`.

Tak jak zrobiliśmy to dla `connectWallet`, musimy zaimportować tę funkcję z naszego pliku `interact.js` do naszego pliku `Minter.js` w ten sposób:

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

Zauważ, że używamy odpowiedzi z naszego wywołania `getCurrentWalletConnected`, aby zaktualizować nasze zmienne stanu `walletAddress` i `status`.

Po dodaniu tego kodu spróbuj odświeżyć okno przeglądarki. Przycisk powinien informować, że jesteś połączony i pokazywać podgląd adresu podłączonego portfela - nawet po odświeżeniu!

### Zaimplementuj addWalletListener {#implement-add-wallet-listener}

Ostatnim krokiem w konfiguracji portfela naszej dapki jest zaimplementowanie nasłuchiwacza portfela, aby nasz interfejs użytkownika aktualizował się, gdy zmieni się stan naszego portfela, na przykład gdy użytkownik się rozłączy lub zmieni konto.

W pliku `Minter.js` dodaj funkcję `addWalletListener`, która wygląda następująco:

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Wpisz wiadomość w polu tekstowym powyżej.")
      } else {
        setWallet("")
        setStatus("🦊 Połącz się z MetaMask za pomocą przycisku w prawym górnym rogu.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          Musisz zainstalować MetaMask, wirtualny portfel Ethereum, w swojej przeglądarce.
        </a>
      </p>
    )
  }
}
```

Przeanalizujmy szybko, co się tutaj dzieje:

- Najpierw nasza funkcja sprawdza, czy `window.ethereum` jest włączone (tj. MetaMask jest zainstalowany).
  - Jeśli nie jest, po prostu ustawiamy naszą zmienną stanu `status` na ciąg JSX, który prosi użytkownika o zainstalowanie MetaMask.
  - Jeśli jest włączone, ustawiamy nasłuchiwacz `window.ethereum.on("accountsChanged")` w linii 3, który nasłuchuje zmian stanu w portfelu MetaMask, co obejmuje sytuacje, gdy użytkownik podłącza dodatkowe konto do dapki, zmienia konta lub odłącza konto. Jeśli co najmniej jedno konto jest połączone, zmienna stanu `walletAddress` jest aktualizowana jako pierwsze konto w tablicy `konta` zwróconej przez nasłuchiwacz. W przeciwnym razie `walletAddress` jest ustawiany jako pusty ciąg.

Na koniec musimy wywołać go w naszej funkcji `useEffect`:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

I voila! Ukończyliśmy programowanie całej funkcjonalności naszego portfela! Teraz, gdy nasz portfel jest skonfigurowany, dowiedzmy się, jak mintować nasze NFT!

## Metadane NFT 101 {#nft-metadata-101}

Pamiętasz więc metadane NFT, o których właśnie mówiliśmy w kroku 0 tego samouczka – ożywiają one NFT, pozwalając mu mieć właściwości, takie jak zasób cyfrowy, nazwa, opis i inne atrybuty.

Będziemy musieli skonfigurować te metadane jako obiekt JSON i przechować go, abyśmy mogli przekazać go jako parametr `tokenURI` podczas wywoływania funkcji `mintNFT` naszego inteligentnego kontraktu.

Tekst w polach „Link do zasobu”, „Nazwa”, „Opis” będzie składał się z różnych właściwości metadanych naszego NFT. Sformatujemy te metadane jako obiekt JSON, ale istnieje kilka opcji, gdzie możemy przechowywać ten obiekt JSON:

- Moglibyśmy przechowywać go na blockchainie Ethereum; jednak byłoby to bardzo kosztowne.
- Moglibyśmy przechowywać go na scentralizowanym serwerze, takim jak AWS lub Firebase. Ale to zniweczyłoby nasz etos decentralizacji.
- Moglibyśmy użyć IPFS, zdecentralizowanego protokołu i sieci peer-to-peer do przechowywania i udostępniania danych w rozproszonym systemie plików. Ponieważ ten protokół jest zdecentralizowany i bezpłatny, jest to nasza najlepsza opcja!

Aby przechowywać nasze metadane w IPFS, użyjemy [Pinata](https://pinata.cloud/), wygodnego API i zestawu narzędzi IPFS. W następnym kroku wyjaśnimy dokładnie, jak to zrobić!

## Użyj Pinata, aby przypiąć swoje metadane do IPFS {#use-pinata-to-pin-your-metadata-to-IPFS}

Jeśli nie masz konta [Pinata](https://pinata.cloud/), zarejestruj się, aby uzyskać bezpłatne konto [tutaj](https://app.pinata.cloud/auth/signup) i wykonaj kroki, aby zweryfikować swój adres e-mail i konto.

### Utwórz swój klucz API Pinata {#create-pinata-api-key}

Przejdź na stronę [https://pinata.cloud/keys](https://pinata.cloud/keys), a następnie wybierz przycisk „New Key” u góry, ustaw widżet Admin jako włączony i nazwij swój klucz.

Następnie pojawi się wyskakujące okienko z informacjami o Twoim API. Upewnij się, że umieściłeś to w bezpiecznym miejscu.

Teraz, gdy nasz klucz jest skonfigurowany, dodajmy go do naszego projektu, abyśmy mogli go użyć.

### Utwórz plik .env {#create-a-env}

Możemy bezpiecznie przechowywać nasz klucz Pinata i sekret w pliku środowiskowym. Zainstalujmy pakiet [dotenv](https://www.npmjs.com/package/dotenv) w katalogu projektu.

Otwórz nową kartę w terminalu (oddzielną od tej, na której działa host lokalny) i upewnij się, że jesteś w folderze `minter-starter-files`, a następnie uruchom następujące polecenie w terminalu:

```text
npm install dotenv --save
```

Następnie utwórz plik `.env` w katalogu głównym `minter-starter-files`, wpisując w wierszu poleceń:

```javascript
vim.env
```

To otworzy twój plik `.env` w vim (edytorze tekstu). Aby go zapisać, naciśnij kolejno „esc” + „:” + „q” na klawiaturze.

Następnie w VSCode przejdź do pliku `.env` i dodaj do niego swój klucz API Pinata i sekret API, w ten sposób:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

Zapisz plik, a następnie jesteś gotowy do rozpoczęcia pisania funkcji przesyłania metadanych JSON do IPFS!

### Zaimplementuj pinJSONToIPFS {#pin-json-to-ipfs}

Na szczęście dla nas Pinata ma [API specjalnie do przesyłania danych JSON do IPFS](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) i wygodny przykład JavaScript z axios, którego możemy użyć, z niewielkimi modyfikacjami.

W folderze `utils` utwórzmy kolejny plik o nazwie `pinata.js`, a następnie zaimportujmy nasz sekret i klucz Pinata z pliku .env w ten sposób:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

Następnie wklej dodatkowy kod z poniższego przykładu do pliku `pinata.js`. Nie martw się, wyjaśnimy, co wszystko oznacza!

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

Po pierwsze, importuje [axios](https://www.npmjs.com/package/axios), klienta HTTP opartego na obietnicach dla przeglądarki i node.js, którego użyjemy do złożenia żądania do Pinata.

Następnie mamy naszą asynchroniczną funkcję `pinJSONToIPFS`, która przyjmuje `JSONBody` jako dane wejściowe oraz klucz API i sekret Pinata w nagłówku, wszystko po to, aby wykonać żądanie POST do ich API `pinJSONToIPFS`.

- Jeśli to żądanie POST zakończy się pomyślnie, nasza funkcja zwraca obiekt JSON z wartością logiczną `success` ustawioną na true i `pinataUrl`, pod którym zostały przypięte nasze metadane. Użyjemy tego zwróconego `pinataUrl` jako wejścia `tokenURI` do funkcji mintowania naszego inteligentnego kontraktu.
- Jeśli to żądanie post nie powiedzie się, nasza funkcja zwróci obiekt JSON z wartością logiczną `success` ustawioną na false i ciągiem `message`, który przekaże nasz błąd.

Podobnie jak w przypadku typów zwrotnych funkcji `connectWallet`, zwracamy obiekty JSON, abyśmy mogli użyć ich parametrów do aktualizacji naszych zmiennych stanu i interfejsu użytkownika.

## Wczytaj swój inteligentny kontrakt {#load-your-smart-contract}

Teraz, gdy mamy sposób na przesyłanie metadanych NFT do IPFS za pomocą naszej funkcji `pinJSONToIPFS`, będziemy potrzebować sposobu na załadowanie instancji naszego inteligentnego kontraktu, abyśmy mogli wywołać jego funkcję `mintNFT`.

Jak już wspomnieliśmy, w tym samouczku będziemy używać [tego istniejącego inteligentnego kontraktu NFT](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE); jeśli jednak chcesz dowiedzieć się, jak go stworzyliśmy, lub stworzyć własny, gorąco polecamy zapoznanie się z naszym innym samouczkiem, [„Jak stworzyć NFT”](https://www.alchemy.com/docs/how-to-create-an-nft).

### ABI kontraktu {#contract-abi}

Jeśli dokładnie przeanalizowałeś nasze pliki, zauważysz, że w naszym katalogu `src` znajduje się plik `contract-abi.json`. ABI jest niezbędne do określenia, którą funkcję kontrakt wywoła, a także do zapewnienia, że funkcja zwróci dane w oczekiwanym formacie.

Będziemy również potrzebować klucza API Alchemy i API Alchemy Web3, aby połączyć się z blockchainem Ethereum i załadować nasz inteligentny kontrakt.

### Utwórz klucz API Alchemy {#create-alchemy-api}

Jeśli nie masz jeszcze konta Alchemy, [zarejestruj się za darmo tutaj.](https://alchemy.com/?a=eth-org-nft-minter)

Po utworzeniu konta Alchemy możesz wygenerować klucz API, tworząc aplikację. Pozwoli nam to na składanie żądań do sieci testowej Ropsten.

Przejdź na stronę „Create App” w swoim panelu Alchemy, najeżdżając kursorem na „Apps” w pasku nawigacyjnym i klikając „Create App”.

Nazwij swoją aplikację — my wybraliśmy „My First NFT!”, podaj krótki opis, wybierz „Staging” dla środowiska używanego do księgowania aplikacji i wybierz „Ropsten” dla swojej sieci.

Kliknij „Utwórz aplikację” i to wszystko! Twoja aplikacja powinna pojawić się w poniższej tabeli.

Wspaniale, teraz, gdy stworzyliśmy nasz adres URL HTTP API Alchemy, skopiuj go do schowka...

…a następnie dodajmy go do naszego pliku `.env`. W sumie twój plik .env powinien wyglądać tak:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

Teraz, gdy mamy już ABI naszego kontraktu i klucz API Alchemy, jesteśmy gotowi do załadowania naszego inteligentnego kontraktu za pomocą [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).

### Skonfiguruj punkt końcowy Alchemy Web3 i kontrakt {#setup-alchemy-endpoint}

Po pierwsze, jeśli jeszcze go nie masz, musisz zainstalować [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), przechodząc do katalogu domowego: `nft-minter-tutorial` w terminalu:

```text
cd ..
npm install @alch/alchemy-web3
```

Następnie wróćmy do naszego pliku `interact.js`. Na górze pliku dodaj następujący kod, aby zaimportować swój klucz Alchemy z pliku .env i skonfigurować swój punkt końcowy Alchemy Web3:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) to nakładka na [Web3.js](https://docs.web3js.org/), zapewniająca ulepszone metody API i inne kluczowe korzyści, które ułatwiają życie dewelopera web3. Został zaprojektowany tak, aby wymagał minimalnej konfiguracji, dzięki czemu możesz od razu zacząć go używać w swojej aplikacji!

Następnie dodajmy do naszego pliku ABI kontraktu i adres kontraktu.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

Gdy mamy już obie te rzeczy, jesteśmy gotowi do rozpoczęcia kodowania naszej funkcji mintowania!

## Zaimplementuj funkcję mintNFT {#implement-the-mintnft-function}

W pliku `interact.js` zdefiniujmy naszą funkcję, `mintNFT`, która, jak sama nazwa wskazuje, będzie mintować nasze NFT.

Ponieważ będziemy wykonywać liczne wywołania asynchroniczne (do Pinata, aby przypiąć nasze metadane do IPFS, Alchemy Web3, aby załadować nasz inteligentny kontrakt, i MetaMask, aby podpisać nasze transakcje), nasza funkcja również będzie asynchroniczna.

Trzy dane wejściowe do naszej funkcji to `url` naszego zasobu cyfrowego, `name` i `description`. Dodaj następującą sygnaturę funkcji pod funkcją `connectWallet`:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### Obsługa błędów wejściowych {#input-error-handling}

Naturalnie, sensowne jest posiadanie jakiejś formy obsługi błędów wejściowych na początku funkcji, abyśmy opuścili tę funkcję, jeśli nasze parametry wejściowe nie są poprawne. Wewnątrz naszej funkcji dodajmy następujący kod:

```javascript
export const mintNFT = async (url, name, description) => {
  //obsługa błędów
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Upewnij się, że wszystkie pola są wypełnione przed mintowaniem.",
    }
  }
}
```

Zasadniczo, jeśli którykolwiek z parametrów wejściowych jest pustym ciągiem, zwracamy obiekt JSON, w którym wartość logiczna `success` jest fałszywa, a ciąg `status` informuje, że wszystkie pola w naszym interfejsie użytkownika muszą być wypełnione.

### Przesyłanie metadanych do IPFS {#upload-metadata-to-ipfs}

Gdy już wiemy, że nasze metadane są poprawnie sformatowane, następnym krokiem jest opakowanie ich w obiekt JSON i przesłanie go do IPFS za pomocą funkcji `pinJSONToIPFS`, którą napisaliśmy!

W tym celu musimy najpierw zaimportować funkcję `pinJSONToIPFS` do naszego pliku `interact.js`. Na samym początku `interact.js` dodajmy:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

Przypomnijmy, że `pinJSONToIPFS` przyjmuje treść JSON. Więc zanim do niego zadzwonimy, będziemy musieli sformatować nasze parametry `url`, `name` i `description` w obiekt JSON.

Zaktualizujmy nasz kod, aby utworzyć obiekt JSON o nazwie `metadata`, a następnie wykonajmy wywołanie `pinJSONToIPFS` z tym parametrem `metadata`:

```javascript
export const mintNFT = async (url, name, description) => {
  //obsługa błędów
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Upewnij się, że wszystkie pola są wypełnione przed mintowaniem.",
    }
  }

  //tworzenie metadanych
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //wywołanie pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Coś poszło nie tak podczas przesyłania Twojego tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

Zauważ, że przechowujemy odpowiedź naszego wywołania do `pinJSONToIPFS(metadata)` w obiekcie `pinataResponse`. Następnie analizujemy ten obiekt pod kątem ewentualnych błędów.

Jeśli wystąpi błąd, zwracamy obiekt JSON, w którym wartość logiczna `success` jest fałszywa, a nasz ciąg `status` informuje, że nasze wywołanie nie powiodło się. W przeciwnym razie wyodrębniamy `pinataURL` z `pinataResponse` i przechowujemy go jako naszą zmienną `tokenURI`.

Teraz nadszedł czas, aby załadować nasz inteligentny kontrakt za pomocą Alchemy Web3 API, które zainicjowaliśmy na początku naszego pliku. Dodaj następującą linię kodu na dole funkcji `mintNFT`, aby ustawić kontrakt w globalnej zmiennej `window.contract`:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

Ostatnią rzeczą do dodania w naszej funkcji `mintNFT` jest nasza transakcja Ethereum:

```javascript
//ustaw swoją transakcję Ethereum
const transactionParameters = {
  to: contractAddress, // Wymagane, z wyjątkiem publikacji kontraktów.
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
      "✅ Sprawdź swoją transakcję na Etherscan: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Coś poszło nie tak: " + error.message,
  }
}
```

Jeśli jesteś już zaznajomiony z transakcjami Ethereum, zauważysz, że struktura jest dość podobna do tego, co widziałeś.

- Po pierwsze, ustawiamy nasze parametry transakcji.
  - `to` określa adres odbiorcy (nasz inteligentny kontrakt)
  - `from` określa sygnatariusza transakcji (połączony adres użytkownika z MetaMask: `window.ethereum.selectedAddress`)
  - `data` zawiera wywołanie metody `mintNFT` naszego inteligentnego kontraktu, która jako dane wejściowe otrzymuje nasz `tokenURI` i adres portfela użytkownika, `window.ethereum.selectedAddress`
- Następnie wykonujemy wywołanie await, `window.ethereum.request,`, w którym prosimy MetaMask o podpisanie transakcji. Zauważ, że w tym żądaniu określamy naszą metodę eth (eth_SentTransaction) i przekazujemy nasze `transactionParameters`. W tym momencie w przeglądarce otworzy się MetaMask i poprosi użytkownika o podpisanie lub odrzucenie transakcji.
  - Jeśli transakcja zakończy się powodzeniem, funkcja zwróci obiekt JSON, w którym wartość logiczna `success` jest ustawiona na true, a ciąg `status` prosi użytkownika o sprawdzenie Etherscan w celu uzyskania dalszych informacji o transakcji.
  - Jeśli transakcja się nie powiedzie, funkcja zwróci obiekt JSON, w którym wartość logiczna `success` jest ustawiona na false, a ciąg `status` przekazuje komunikat o błędzie.

W sumie nasza funkcja `mintNFT` powinna wyglądać tak:

```javascript
export const mintNFT = async (url, name, description) => {
  //obsługa błędów
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Upewnij się, że wszystkie pola są wypełnione przed mintowaniem.",
    }
  }

  //tworzenie metadanych
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //żądanie przypięcia pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Coś poszło nie tak podczas przesyłania Twojego tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //wczytaj inteligentny kontrakt
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //ustaw swoją transakcję Ethereum
  const transactionParameters = {
    to: contractAddress, // Wymagane, z wyjątkiem publikacji kontraktów.
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
        "✅ Sprawdź swoją transakcję na Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Coś poszło nie tak: " + error.message,
    }
  }
}
```

To jest jedna gigantyczna funkcja! Teraz musimy tylko podłączyć naszą funkcję `mintNFT` do naszego komponentu `Minter.js`...

## Podłącz mintNFT do naszego frontendu Minter.js {#connect-our-frontend}

Otwórz plik `Minter.js` i zaktualizuj linię `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` na górze, aby wyglądała tak:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

Na koniec zaimplementuj funkcję `onMintPressed`, aby wykonać wywołanie await do zaimportowanej funkcji `mintNFT` i zaktualizować zmienną stanu `status`, aby odzwierciedlić, czy nasza transakcja powiodła się, czy nie:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## Wdróż swoje NFT na działającej stronie internetowej {#deploy-your-NFT}

Gotowy na udostępnienie swojego projektu na żywo, aby użytkownicy mogli z nim wchodzić w interakcję? Sprawdź [ten samouczek](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) dotyczący wdrażania Twojego Minera na działającej stronie internetowej.

Jeszcze jeden krok...

## Szturmem zdobądź świat blockchaina {#take-the-blockchain-world-by-storm}

Żartuję, dotarłeś do końca samouczka!

Podsumowując, budując minter NFT, z powodzeniem nauczyłeś się, jak:

- Połączyć się z MetaMask za pośrednictwem projektu frontendowego
- Wywoływać metody inteligentnego kontraktu z poziomu frontendu
- Podpisywać transakcje za pomocą MetaMask

Prawdopodobnie chcesz mieć możliwość pochwalenia się NFT wygenerowanymi za pośrednictwem Twojej dapki w swoim portfelu — więc koniecznie sprawdź nasz krótki samouczek [„Jak wyświetlić swoje NFT w portfelu”](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet)!

I, jak zawsze, jeśli masz jakieś pytania, jesteśmy tutaj, aby pomóc na [Discordzie Alchemy](https://discord.gg/gWuC7zB). Nie możemy się doczekać, aby zobaczyć, jak zastosujesz koncepcje z tego samouczka w swoich przyszłych projektach!
