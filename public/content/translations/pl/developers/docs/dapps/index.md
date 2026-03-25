---
title: Wprowadzenie techniczne do dapek
description:
lang: pl
---

Zdecentralizowana aplikacja (dapp) to aplikacja zbudowana w zdecentralizowanej sieci, która łączy [smart kontrakt](/developers/docs/smart-contracts/) i frontendowy interfejs użytkownika. Pamiętaj, że inteligentne kontrakty Ethereum są dostępne i przejrzyste – jak otwarte API – aby aplikacja dapp mogła nawet zawierać inteligentny kontrakt, który ktoś inny napisał.

## Wymagania wstępne {#prerequisites}

Zanim zaczniesz uczyć się o dapkach, powinieneś zapoznać się z [podstawami blockchaina](/developers/docs/intro-to-ethereum/) i przeczytać o sieci Ethereum oraz o tym, jak jest ona zdecentralizowana.

## Definicja dapki {#definition-of-a-dapp}

Dapp ma swój kod backend uruchomiony w zdecentralizowanej sieci peer-to-peer. Porównaj to z aplikacją, w której kod backendu jest uruchomiony na scentralizowanych serwerach.

Dapka może mieć kod frontendowy i interfejsy użytkownika napisane w dowolnym języku (tak jak aplikacja), które umożliwiają wywołania do jej backendu. Ponadto jej frontend może być hostowany w zdecentralizowanej pamięci masowej, takiej jak [IPFS](https://ipfs.io/).

- **Zdecentralizowane** – dapki działają na Ethereum, otwartej, publicznej, zdecentralizowanej platformie, na której żadna osoba ani grupa nie sprawuje kontroli.
- **Deterministyczne** – dapki wykonują tę samą funkcję niezależnie od środowiska, w którym są uruchamiane.
- **Kompletne w sensie Turinga** – dapki mogą wykonać dowolne działanie, pod warunkiem posiadania wymaganych zasobów.
- **Izolowane** – dapki są wykonywane w wirtualnym środowisku znanym jako Wirtualna Maszyna Ethereum, więc jeśli smart kontrakt będzie miał błąd, nie zakłóci to normalnego funkcjonowania sieci blockchain.

### O smart kontraktach {#on-smart-contracts}

Aby wprowadzić dapps, musimy wprowadzić inteligentne kontrakty – backend dapps z powodu braku lepszego terminu. Aby uzyskać szczegółowy przegląd, przejdź do naszej sekcji o [smart kontraktach](/developers/docs/smart-contracts/).

Inteligentny kontrakt to kod, który znajduje się na blockchainie Ethereum i działa dokładnie tak, jak zaprogramowano. Po wdrożeniu inteligentnych kontraktów w sieci nie można ich zmienić. Aplikacje mogą być zdecentralizowane, ponieważ są kontrolowane przez logikę zapisaną w kontrakcie, a nie przez osobę prywatną czy firmę. Oznacza to również, że trzeba bardzo uważnie projektować kontrakty i dokładnie je testować.

## Zalety tworzenia dapek {#benefits-of-dapp-development}

- **Zero przestojów** – gdy smart kontrakt zostanie wdrożony w blockchainie, sieć jako całość zawsze będzie w stanie obsługiwać klientów, którzy chcą wejść w interakcję z kontraktem. Dlatego złośliwe podmioty nie mogą przeprowadzać ataków typu „odmowa usługi” (denial-of-service) wymierzonych w poszczególne dapki.
- **Prywatność** – nie musisz podawać swojej prawdziwej tożsamości, aby wdrożyć dapką lub wejść z nią w interakcję.
- **Odporność na cenzurę** – żaden pojedynczy podmiot w sieci nie może uniemożliwić użytkownikom przesyłania transakcji, wdrażania dapek ani odczytywania danych z blockchaina.
- **Pełna integralność danych** – dane przechowywane w blockchainie są niezmienne i niepodważalne dzięki prymitywom kryptograficznym. Złośliwe podmioty nie mogą tworzyć transakcji ani innych danych, które zostały już podane do wiadomości publicznej.
- **Obliczenia niewymagające zaufania/weryfikowalne zachowanie** – smart kontrakty można analizować i mieć gwarancję, że wykonają się w przewidywalny sposób, bez konieczności ufania organowi centralnemu. Nie jest to prawdą w tradycyjnych modelach; na przykład, gdy korzystamy z systemów bankowości internetowej, musimy ufać, że instytucje finansowe nie będą niewłaściwie wykorzystywać naszych danych finansowych, ingerować w zapisy ani nie zostaną zhakowane.

## Wady tworzenia dapek {#drawbacks-of-dapp-development}

- **Utrzymanie** – dapki mogą być trudniejsze w utrzymaniu, ponieważ kod i dane opublikowane w blockchainie są trudniejsze do zmodyfikowania. Deweloperom jest trudno dokonywać aktualizacji swoich zdecentralizowanych aplikacji (lub podstawowych danych przechowywanych przez dapp) po ich wdrożeniu, nawet jeśli zostaną zidentyfikowane błędy lub zagrożenia bezpieczeństwa w starej wersji.
- **Narzut wydajnościowy** – występuje ogromny narzut wydajnościowy, a skalowanie jest naprawdę trudne. Aby osiągnąć poziom bezpieczeństwa, integralności, przejrzystości i niezawodności, do którego dąży Ethereum, każdy węzeł prowadzi i przechowuje każdą transakcję. Ponadto konsensus proof-of-stake również wymaga czasu.
- **Przeciążenie sieci** – gdy jedna dapka zużywa zbyt wiele zasobów obliczeniowych, cała sieć ulega spowolnieniu. Obecnie sieć jest w stanie przetwarzać tylko około 10-15 transakcji na sekundę; jeżeli transakcje są wysyłane szybciej, pula niepotwierdzonych transakcji może szybko wzrosnąć.
- **Doświadczenie użytkownika** – projektowanie przyjaznych dla użytkownika doświadczeń może być trudniejsze, ponieważ przeciętny użytkownik końcowy może uznać za zbyt trudne skonfigurowanie stosu narzędzi niezbędnego do interakcji z blockchainem w naprawdę bezpieczny sposób.
- **Centralizacja** – przyjazne dla użytkownika i deweloperów rozwiązania zbudowane na warstwie bazowej Ethereum i tak mogą w końcu wyglądać jak scentralizowane usługi. Na przykład takie usługi mogą przechowywać klucze lub inne poufne informacje po stronie serwera, zapewniać frontend za pomocą scentralizowanego serwera lub uruchamiać ważną logikę biznesową na scentralizowanym serwerze przed zapisaniem w blockchainie. Centralizacja eliminuje wiele (jeśli nie wszystkie) przewagi blockchainu nad tradycyjnym modelem.

## Jesteś raczej wzrokowcem? Dla wzrokowców {#visual-learner}

<YouTube id="F50OrwV6Uk8" />

## Narzędzia do tworzenia dapek {#dapp-tools}

**Scaffold-ETH _- Szybko eksperymentuj z Solidity, używając frontendu, który dostosowuje się do Twojego smart kontraktu._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Przykładowa dapka](https://punkwallet.io/)

**Create Eth App _- Twórz aplikacje oparte na Ethereum za pomocą jednego polecenia._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _- Narzędzie FOSS do generowania frontendów dla dapek na podstawie [ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _- Narzędzie FOSS dla deweloperów Ethereum do testowania węzłów oraz tworzenia i debugowania wywołań RPC z poziomu przeglądarki._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _- Zestawy SDK we wszystkich językach, smart kontrakty, narzędzia i infrastruktura do rozwoju web3._**

- [Strona główna](https://thirdweb.com/)
- [Dokumentacja](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _- Platforma programistyczna web3 klasy korporacyjnej do wdrażania smart kontraktów, włączania płatności kartami kredytowymi i międzyłańcuchowych oraz używania API do tworzenia, dystrybucji, sprzedaży, przechowywania i edytowania NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Dokumentacja](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## Dalsza lektura {#further-reading}

- [Przeglądaj dapki](/apps)
- [Architektura aplikacji Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) – _Preethi Kasireddy_
- [Przewodnik po aplikacjach zdecentralizowanych 2021](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [Czym są aplikacje zdecentralizowane?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [Popularne dapki](https://www.alchemy.com/dapps) - _Alchemy_

_Znasz jakieś zasoby społeczności, które Ci pomogły? Edytuj tę stronę i dodaj je!_

## Powiązane tematy {#related-topics}

- [Wprowadzenie do stosu Ethereum](/developers/docs/ethereum-stack/)
- [Frameworki deweloperskie](/developers/docs/frameworks/)
