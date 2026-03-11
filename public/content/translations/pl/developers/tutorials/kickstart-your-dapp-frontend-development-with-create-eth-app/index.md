---
title: "Rozpocznij rozwój frontendu swojej dapki za pomocą create-eth-app"
description: "Przegląd sposobu użycia create-eth-app i jego funkcji"
author: "Markus Waas"
tags:
  [
    "frontend",
    "JavaScript",
    "ethers.js",
    "the graph",
    "defi"
  ]
skill: beginner
lang: pl
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

Ostatnim razem przyjrzeliśmy się [ogólnemu obrazowi Solidity](https://soliditydeveloper.com/solidity-overview-2020) i wspomnieliśmy już o [create-eth-app](https://github.com/PaulRBerg/create-eth-app). Teraz dowiesz się, jak go używać, jakie funkcje są zintegrowane oraz poznasz dodatkowe pomysły na jego rozbudowę. Stworzona przez Paula Razvana Berga, założyciela [Sablier](http://sablier.com/), ta aplikacja przyspieszy rozwój Twojego frontendu i oferuje kilka opcjonalnych integracji do wyboru.

## Instalacja {#installation}

Instalacja wymaga Yarn w wersji 0.25 lub wyższej (`npm install yarn --global`). To tak proste, jak uruchomienie:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

W tle wykorzystuje [create-react-app](https://github.com/facebook/create-react-app). Aby zobaczyć swoją aplikację, otwórz `http://localhost:3000/`. Gdy będziesz gotowy do wdrożenia na produkcję, utwórz zminimalizowany pakiet za pomocą yarn build. Jednym z łatwych sposobów na hostowanie tego jest [Netlify](https://www.netlify.com/). Możesz utworzyć repozytorium na GitHubie, dodać je do Netlify, skonfigurować polecenie kompilacji i gotowe! Twoja aplikacja będzie hostowana i dostępna dla wszystkich. A wszystko to bezpłatnie.

## Funkcje {#features}

### React i create-react-app {#react--create-react-app}

Przede wszystkim serce aplikacji: React i wszystkie dodatkowe funkcje, które oferuje _create-react-app_. Używanie tylko tego jest świetną opcją, jeśli nie chcesz integrować Ethereum. [React](https://react.dev/) sam w sobie bardzo ułatwia tworzenie interaktywnych interfejsów użytkownika. Może nie jest tak przyjazny dla początkujących jak [Vue](https://vuejs.org/), ale nadal jest najczęściej używany, ma więcej funkcji, a co najważniejsze, oferuje tysiące dodatkowych bibliotek do wyboru. _create-react-app_ sprawia, że rozpoczęcie pracy z nim jest również bardzo łatwe i obejmuje:

- Wsparcie dla składni React, JSX, ES6, TypeScript i Flow.
- Dodatki językowe wykraczające poza ES6, takie jak operator spread dla obiektów.
- Automatyczne dodawanie prefiksów w CSS, dzięki czemu nie potrzebujesz -webkit- ani innych prefiksów.
- Szybkie, interaktywne narzędzie do uruchamiania testów jednostkowych z wbudowanym wsparciem dla raportowania pokrycia kodu testami.
- Serwer deweloperski działający na żywo, który ostrzega o typowych błędach.
- Skrypt kompilacji do tworzenia pakietów JS, CSS i obrazów na produkcję, z haszami i sourcemapami.

_create-eth-app_ w szczególności wykorzystuje nowe [efekty hooków](https://legacy.reactjs.org/docs/hooks-effect.html). Metoda pisania potężnych, a jednocześnie bardzo małych, tak zwanych komponentów funkcyjnych. Zobacz poniższą sekcję o Apollo, aby dowiedzieć się, jak są one używane w _create-eth-app_.

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) pozwalają na posiadanie wielu pakietów, ale umożliwiają zarządzanie nimi wszystkimi z folderu głównego oraz instalowanie zależności dla wszystkich naraz za pomocą `yarn install`. Ma to szczególny sens w przypadku mniejszych dodatkowych pakietów, takich jak zarządzanie adresami/ABI inteligentnych kontraktów (informacje o tym, gdzie wdrożono które inteligentne kontrakty i jak się z nimi komunikować) lub integracja z The Graph, obie będące częścią `create-eth-app`.

### ethers.js {#ethersjs}

Chociaż [Web3](https://docs.web3js.org/) jest nadal najczęściej używane, [ethers.js](https://docs.ethers.io/) zyskuje w ostatnim roku na popularności jako alternatywa i to właśnie ono jest zintegrowane z _create-eth-app_. Możesz z nim pracować, zmienić go na Web3 lub rozważyć aktualizację do [ethers.js v5](https://docs.ethers.org/v5/), który jest już prawie po fazie beta.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/) to alternatywny sposób obsługi danych w porównaniu z [Restful API](https://restfulapi.net/). Mają one kilka zalet w porównaniu z Restful API, szczególnie w przypadku zdecentralizowanych danych blockchain. Jeśli interesują Cię powody, które za tym stoją, zapoznaj się z [GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a).

Zazwyczaj pobiera się dane bezpośrednio ze swojego inteligentnego kontraktu. Chcesz odczytać czas ostatniej transakcji? Wystarczy wywołać `MyContract.methods.latestTradeTime().call()`, co pobiera dane z węzła Ethereum do Twojej dapki. Ale co, jeśli potrzebujesz setek różnych punktów danych? Skutkowałoby to setkami zapytań o dane do węzła, z których każde wymagałoby [RTT](https://wikipedia.org/wiki/Round-trip_delay_time), co sprawiłoby, że Twoja dapka byłaby wolna i nieefektywna. Jednym z obejść może być funkcja pobierająca w Twoim kontrakcie, która zwraca wiele danych naraz. Nie zawsze jest to jednak idealne rozwiązanie.

Możesz być również zainteresowany danymi historycznymi. Chcesz znać nie tylko czas ostatniej transakcji, ale także czasy wszystkich transakcji, które kiedykolwiek wykonałeś. Użyj pakietu podgrafu _create-eth-app_, przeczytaj [dokumentację](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph) i dostosuj go do własnych kontraktów. Jeśli szukasz popularnych inteligentnych kontraktów, być może istnieje już dla nich podgraf. Sprawdź [eksplorator podgrafów](https://thegraph.com/explorer/).

Gdy masz już podgraf, pozwala on na napisanie jednego prostego zapytania w Twojej dapce, które pobiera wszystkie potrzebne, ważne dane z blockchainu, w tym historyczne, wymagając tylko jednego pobrania.

### Apollo {#apollo}

Dzięki integracji z [Apollo Boost](https://www.apollographql.com/docs/react/get-started/) możesz łatwo zintegrować The Graph w swojej dapce React. Szczególnie przy użyciu [hooków React i Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks), pobieranie danych jest tak proste, jak napisanie pojedynczego zapytania GraphQl w Twoim komponencie:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Szablony {#templates}

Dodatkowo możesz wybrać jeden z kilku różnych szablonów. Do tej pory można używać integracji z Aave, Compound, UniSwap lub sablier. Wszystkie one dodają ważne adresy inteligentnych kontraktów usług wraz z gotowymi integracjami podgrafów. Wystarczy dodać szablon do polecenia tworzenia, np. `yarn create eth-app my-eth-app --with-template aave`.

### Aave {#aave}

[Aave](https://aave.com/) to zdecentralizowany rynek pożyczek pieniężnych. Deponenci zapewniają płynność rynkowi, aby zarabiać pasywny dochód, podczas gdy pożyczkobiorcy mogą pożyczać, używając zabezpieczeń. Jedną z unikalnych cech Aave są [pożyczki błyskawiczne](https://aave.com/docs/developers/flash-loans), które pozwalają pożyczać pieniądze bez żadnego zabezpieczenia, o ile pożyczka zostanie zwrócona w ramach jednej transakcji. Może to być przydatne na przykład do uzyskania dodatkowej gotówki w handlu arbitrażowym.

Tokeny, którymi się handluje i które przynoszą odsetki, nazywane są _aTokenami_.

Gdy zdecydujesz się zintegrować Aave z _create-eth-app_, otrzymasz [integrację z podgrafem](https://docs.aave.com/developers/getting-started/using-graphql). Aave używa The Graph i już udostępnia kilka gotowych do użycia podgrafów na [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) i w [sieci głównej](https://thegraph.com/explorer/subgraph/aave/protocol) w formie [surowej](https://thegraph.com/explorer/subgraph/aave/protocol-raw) lub [sformatowanej](https://thegraph.com/explorer/subgraph/aave/protocol).

![Mem o pożyczkach błyskawicznych Aave – „Taaak, gdybym mógł utrzymać moją pożyczkę błyskawiczną dłużej niż 1 transakcję, byłoby wspaniale”](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) jest podobny do Aave. Integracja obejmuje już nowy [podgraf Compound v2](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195). Tokeny przynoszące tutaj odsetki nazywają się, co zaskakujące, _cTokenami_.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) to zdecentralizowana giełda (DEX). Dostawcy płynności mogą zarabiać na opłatach, dostarczając wymagane tokeny lub ether dla obu stron transakcji. Jest powszechnie używany i dlatego ma jedną z najwyższych płynności dla bardzo szerokiej gamy tokenów. Możesz łatwo zintegrować go w swojej dapce, aby na przykład umożliwić użytkownikom wymianę ETH na DAI.

Niestety, w momencie pisania tego tekstu integracja dotyczy tylko Uniswap v1, a nie [niedawno wydanej wersji v2](https://uniswap.org/blog/uniswap-v2/).

### Sablier {#sablier}

[Sablier](https://sablier.com/) umożliwia użytkownikom strumieniowanie płatności pieniężnych. Zamiast jednej wypłaty, otrzymujesz pieniądze na bieżąco bez dodatkowej administracji po wstępnej konfiguracji. Integracja obejmuje [własny podgraf](https://thegraph.com/explorer/subgraph/sablierhq/sablier).

## Co dalej? {#whats-next}

Jeśli masz pytania dotyczące _create-eth-app_, przejdź na [serwer społeczności Sablier](https://discord.gg/bsS8T47), gdzie możesz skontaktować się z autorami _create-eth-app_. Jako pierwsze kolejne kroki możesz zechcieć zintegrować framework UI, taki jak [Material UI](https://mui.com/material-ui/), napisać zapytania GraphQL dla danych, których faktycznie potrzebujesz i skonfigurować wdrożenie.
