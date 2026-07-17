---
title: Rozpocznij tworzenie frontendu swojej zdecentralizowanej aplikacji (dapp) z create-eth-app
description: "Przegląd sposobu korzystania z create-eth-app i jego funkcji"
author: "Markus Waas"
tags:
  ["frontend", "JavaScript", "ethers.js", "the graph", "defi"]
skill: beginner
breadcrumb: create-eth-app
lang: pl
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

Ostatnio przyjrzeliśmy się [ogólnemu zarysowi języka Solidity](https://soliditydeveloper.com/solidity-overview-2020) i wspomnieliśmy już o [create-eth-app](https://github.com/PaulRBerg/create-eth-app). Teraz dowiesz się, jak z niego korzystać, jakie funkcje są z nim zintegrowane oraz poznasz dodatkowe pomysły na jego rozbudowę. Zainicjowana przez Paula Razvana Berga, założyciela [Sablier](https://sablier.com/), ta aplikacja przyspieszy tworzenie frontendu i oferuje kilka opcjonalnych integracji do wyboru.

## Instalacja {#installation}

Instalacja wymaga Yarn w wersji 0.25 lub nowszej (`npm install yarn --global`). Jest to tak proste, jak uruchomienie:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Wewnętrznie wykorzystuje [create-react-app](https://github.com/facebook/create-react-app). Aby zobaczyć swoją aplikację, otwórz `http://localhost:3000/`. Kiedy będziesz gotowy na wdrożenie na produkcję, utwórz zminifikowaną paczkę za pomocą polecenia yarn build. Jednym z prostych sposobów na jej hostowanie jest [Netlify](https://www.netlify.com/). Możesz utworzyć repozytorium na GitHubie, dodać je do Netlify, skonfigurować polecenie budowania i gotowe! Twoja aplikacja będzie hostowana i dostępna dla każdego. A wszystko to całkowicie za darmo.

## Funkcje {#features}

### React i create-react-app {#react--create-react-app}

Przede wszystkim serce aplikacji: React i wszystkie dodatkowe funkcje dostarczane wraz z _create-react-app_. Korzystanie tylko z tego jest świetną opcją, jeśli nie chcesz integrować Ethereum. Sam [React](https://react.dev/) sprawia, że budowanie interaktywnych interfejsów użytkownika (UI) jest naprawdę proste. Może nie jest tak przyjazny dla początkujących jak [Vue](https://vuejs.org/), ale wciąż jest najczęściej używany, ma więcej funkcji i, co najważniejsze, tysiące dodatkowych bibliotek do wyboru. Narzędzie _create-react-app_ sprawia, że rozpoczęcie pracy z nim jest również bardzo proste i obejmuje:

- Wsparcie dla składni React, JSX, ES6, TypeScript i Flow.
- Dodatki językowe wykraczające poza ES6, takie jak operator spread dla obiektów.
- Autoprefiksowanie CSS, dzięki czemu nie potrzebujesz prefiksów -webkit- ani innych.
- Szybkie, interaktywne narzędzie do uruchamiania testów jednostkowych z wbudowaną obsługą raportowania pokrycia kodu.
- Serwer deweloperski działający na żywo, który ostrzega o typowych błędach.
- Skrypt budujący do pakowania plików JS, CSS i obrazów na produkcję, z hashami i mapami kodu (sourcemaps).

W szczególności _create-eth-app_ wykorzystuje nowe [efekty hooków (hooks effects)](https://legacy.reactjs.org/docs/hooks-effect.html). Metodę pisania potężnych, a jednocześnie bardzo małych, tak zwanych komponentów funkcyjnych. Zobacz poniższą sekcję o Apollo, aby dowiedzieć się, jak są one używane w _create-eth-app_.

### Przestrzenie robocze Yarn (Yarn Workspaces) {#yarn-workspaces}

[Przestrzenie robocze Yarn](https://classic.yarnpkg.com/en/docs/workspaces/) pozwalają na posiadanie wielu pakietów, ale z możliwością zarządzania nimi wszystkimi z folderu głównego i instalowania zależności dla wszystkich naraz za pomocą `yarn install`. Ma to szczególny sens w przypadku mniejszych, dodatkowych pakietów, takich jak zarządzanie adresami/ABI inteligentnych kontraktów (informacje o tym, gdzie wdrożono poszczególne inteligentne kontrakty i jak się z nimi komunikować) lub integracja The Graph, które są częścią `create-eth-app`.

### ethers.js {#ethersjs}

Chociaż [Web3](https://docs.web3js.org/) jest nadal najczęściej używane, [Ethers.js](https://docs.ethers.io/) zyskało w ostatnim roku znacznie większą popularność jako alternatywa i to właśnie ono jest zintegrowane z _create-eth-app_. Możesz pracować z tą biblioteką, zmienić ją na Web3 lub rozważyć aktualizację do [Ethers.js v5](https://docs.ethers.org/v5/), które prawie wyszło z fazy beta.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/) to alternatywny sposób obsługi danych w porównaniu do [RESTful API](https://restfulapi.net/). Ma on kilka zalet w stosunku do RESTful API, zwłaszcza w przypadku zdecentralizowanych danych blockchain. Jeśli interesuje Cię uzasadnienie tego podejścia, zapoznaj się z artykułem [GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a).

Zazwyczaj pobierałbyś dane bezpośrednio ze swojego inteligentnego kontraktu. Chcesz odczytać czas ostatniej transakcji handlowej? Wystarczy wywołać `MyContract.methods.latestTradeTime().call()`, co pobierze dane z węzła Ethereum do Twojej zdecentralizowanej aplikacji (dapp). Ale co, jeśli potrzebujesz setek różnych punktów danych? Skutkowałoby to setkami zapytań o dane do węzła, z których każde wymagałoby czasu [RTT](https://wikipedia.org/wiki/Round-trip_delay_time), co uczyniłoby Twojego dappa powolnym i nieefektywnym. Jednym z obejść może być funkcja pobierająca wewnątrz Twojego kontraktu, która zwraca wiele danych naraz. Nie zawsze jest to jednak idealne rozwiązanie.

Możesz być również zainteresowany danymi historycznymi. Chcesz znać nie tylko czas ostatniej transakcji, ale także czasy wszystkich transakcji, które kiedykolwiek sam wykonałeś. Użyj pakietu podgrafu z _create-eth-app_, przeczytaj [dokumentację](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph) i dostosuj go do własnych kontraktów. Jeśli szukasz popularnych inteligentnych kontraktów, być może istnieje już dla nich podgraf. Sprawdź [eksplorator podgrafów](https://thegraph.com/explorer/).

Gdy masz już podgraf, pozwala on na napisanie jednego prostego zapytania w Twoim dappie, które pobiera wszystkie ważne dane z blockchaina, w tym potrzebne dane historyczne, wymagając tylko jednego żądania.

### Apollo {#apollo}

Dzięki integracji [Apollo Boost](https://www.apollographql.com/docs/react/get-started/) możesz łatwo zintegrować The Graph w swoim dappie opartym na React. Zwłaszcza podczas korzystania z [hooków React i Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks), pobieranie danych jest tak proste, jak napisanie pojedynczego zapytania GraphQL w Twoim komponencie:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Szablony {#templates}

Ponadto możesz wybierać spośród kilku różnych szablonów. Jak dotąd możesz użyć integracji z Aave, Compound, Uniswap lub Sablier. Wszystkie one dodają ważne adresy inteligentnych kontraktów usług wraz z gotowymi integracjami podgrafów. Wystarczy dodać szablon do polecenia tworzenia, np. `yarn create eth-app my-eth-app --with-template aave`.

### Aave {#aave}

[Aave](https://aave.com/) to zdecentralizowany rynek pożyczania pieniędzy. Deponenci dostarczają płynność na rynek, aby zarabiać pasywny dochód, podczas gdy pożyczkobiorcy mogą pożyczać środki, korzystając z zabezpieczeń. Jedną z unikalnych funkcji Aave są [błyskawiczne pożyczki (flash loans)](https://aave.com/docs/developers/flash-loans), które pozwalają na pożyczanie pieniędzy bez żadnego zabezpieczenia, pod warunkiem, że zwrócisz pożyczkę w ramach jednej transakcji. Może to być przydatne na przykład do uzyskania dodatkowej gotówki na handel arbitrażowy.

Handlowane tokeny, które przynoszą Ci odsetki, nazywane są _aTokens_.

Gdy zdecydujesz się zintegrować Aave z _create-eth-app_, otrzymasz [integrację podgrafu](https://docs.aave.com/developers/getting-started/using-graphql). Aave korzysta z The Graph i zapewnia już kilka gotowych do użycia podgrafów w sieciach [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) i [Sieć główna](https://thegraph.com/explorer/subgraph/aave/protocol) w formie [surowej (raw)](https://thegraph.com/explorer/subgraph/aave/protocol-raw) lub [sformatowanej](https://thegraph.com/explorer/subgraph/aave/protocol).

![Aave Flash Loan meme – "Yeahhh, if I could keep my flash loan longer than 1 transaction, that would be great"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) jest podobny do Aave. Integracja obejmuje już nowy [podgraf Compound v2](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195). Tokeny przynoszące odsetki są tutaj o dziwo nazywane _cTokens_.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) to zdecentralizowana giełda (DEX). Dostawcy płynności mogą zarabiać na opłatach, dostarczając wymagane tokeny lub ether dla obu stron transakcji. Jest szeroko stosowany i dlatego ma jedną z najwyższych płynności dla bardzo szerokiej gamy tokenów. Możesz łatwo zintegrować go ze swoim dappem, aby na przykład umożliwić użytkownikom wymianę ich ETH na DAI.

Niestety, w momencie pisania tego tekstu integracja dotyczy tylko Uniswap v1, a nie [właśnie wydanego v2](https://uniswap.org/blog/uniswap-v2/).

### Sablier {#sablier}

[Sablier](https://sablier.com/) umożliwia użytkownikom strumieniowanie płatności pieniężnych. Zamiast pojedynczego dnia wypłaty, faktycznie otrzymujesz swoje pieniądze w sposób ciągły, bez dalszej administracji po początkowej konfiguracji. Integracja obejmuje jego [własny podgraf](https://thegraph.com/explorer/subgraph/sablierhq/sablier).

## Co dalej? {#whats-next}

Jeśli masz pytania dotyczące _create-eth-app_, wejdź na [serwer społeczności Sablier](https://discord.gg/bsS8T47), gdzie możesz skontaktować się z autorami _create-eth-app_. Jako pierwsze kolejne kroki możesz chcieć zintegrować framework UI, taki jak [Material UI](https://mui.com/material-ui/), napisać zapytania GraphQL dla danych, których faktycznie potrzebujesz, i skonfigurować wdrożenie.