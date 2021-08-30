---
title: Wprowadzenie do zdecentralizowanych aplikacji
description:
lang: pl
sidebar: true
---

Zdecentralizowana aplikacja (dapp) to aplikacja zbudowana na zdecentralizowanej sieci, która łączy [inteligentny kontrakt](/en/developers/docs/smart-contracts/) i interfejs użytkownika frontend. Pamiętaj, że inteligentne kontrakty Ethereum są dostępne i przejrzyste – jak otwarte API – aby aplikacja dapp mogła nawet zawierać inteligentny kontrakt, który ktoś inny napisał.

## Warunki wstępne {#prerequisites}

Zanim dowiesz się o zdecentralizowanych aplikacjach, powinieneś uwzględnić podstawy [blockchain](/developers/docs/intro-to-ethereum/) i przeczytać o sieci Ethereum oraz o jej zdecentralizowanym charakterze.

## Definicja dapp {#definition-of-a-dapp}

Dapp ma swój kod backend uruchomiony w zdecentralizowanej sieci peer-to-peer. Porównaj to z aplikacją, w której kod backendu jest uruchomiony na scentralizowanych serwerach.

Dapp może mieć kod frontend i interfejsy użytkownika napisane w dowolnym języku (tak jak aplikacja), który może wywoływać do swojego backendu. Co więcej, jej frontend może być hostowany w zdecentralizowanej pamięci masowej, takiej jak [IPFS](https://ipfs.io/).

- **Zdecentralizowane**, co sprawia, że są niezależne i nikt ich nie kontroluje.
- **Deterministyczne**, tzn. wykonują tę samą funkcję niezależnie od środowiska, w którym są wykonywane.
- **Zgodny z Turingiem**, co oznacza, że ​​biorąc pod uwagę wymagane zasoby, dapp może wykonać dowolną akcję.
- **Izolowane**, co oznacza, że ​​są wykonywane w środowisku wirtualnym znanym jako maszyna wirtualna Ethereum, więc jeśli inteligentna umowa zawiera błąd, nie przeszkadza to w normalnym funkcjonowaniu sieci blockchain.

### O inteligentnych kontraktach {#on-smart-contracts}

Aby wprowadzić dapps, musimy wprowadzić inteligentne kontrakty – backend dapps z powodu braku lepszego terminu. Szczegółowe informacje znajdziesz w naszej sekcji o [inteligentnych kontraktach](/en/developers/docs/smart-contracts/).

Inteligentny kontrakt to kod, który znajduje się na blockchainie Ethereum i działa dokładnie tak, jak zaprogramowano. Gdy zostaną rozmieszczone w sieci, nie możesz ich zmienić. Aplikacje mogą być zdecentralizowane, ponieważ są kontrolowane przez logikę zapisaną w kontrakcie, a nie przez osobę prywatną czy firmę. Oznacza to również, że trzeba bardzo uważnie projektować kontrakty i dokładnie je testować.

<!--Benefits and implications provided by Brian Gu)-->

## Korzyści z rozwoju dapp {#benefits-of-dapp-development}

- **Zero przestojów** – po wdrożeniu inteligentnego kontraktu w rdzeniu aplikacji i w blockchainie sieć jako całość zawsze będzie w stanie obsługiwać klientów, którzy chcą wchodzić w interakcję z kontraktem. Złośliwe podmioty nie mogą zatem uruchamiać ataków typu „denial-of-service” ukierunkowanych na poszczególne aplikacje.
- **Prywatność** – nie musisz podawać rzeczywistej tożsamości, aby wdrożyć aplikację lub korzystać z niej.
- **Odporność na cenzurę** – żaden pojedynczy podmiot w sieci nie może zablokować użytkownikom możliwości przesyłania transakcji, wdrażania aplikacji lub odczytywania danych z blockchaina.
- **Pełna integralność danych** – dane przechowywane w blockchainie są niezmienne i niepodważalne dzięki prymitywom kryptograficznym. Złośliwe podmioty nie mogą tworzyć transakcji ani innych danych, które zostały już podane do wiadomości publicznej.
- **Niezaufane obliczenia/weryfikowalne zachowanie** – inteligentne kontrakty mogą być analizowane i mają gwarancję wykonania w przewidywalny sposób, bez konieczności ufania organowi centralnemu. Nie dotyczy to tradycyjnych modeli; na przykład, gdy korzystamy z systemów bankowości internetowej, musimy ufać, że instytucje finansowe nie będą nadużywać naszych danych finansowych, ingerować w zapisy ani nie zostaną zhakowane.

## Konsekwencje rozwoju dapp {#implications-of-dapp-development}

<!-- - Transparency – transactions that trigger dapp functionality are public
- Open source
- Cost of storage – contracts are often only small percentages of the dapp. They are stored on-chain and this storage needs to be paid for, so it can be expensive.
 -->

- **Utrzymanie** – aplikacje mogą być trudniejsze do utrzymania, ponieważ kodowanie i dane publikowane w blockchain są trudniejsze do modyfikacji. Deweloperom jest trudno dokonywać aktualizacji swoich dapps (lub danych przechowywanych przez dapp) po ich uruchomieniu - nawet jeśli błędy lub zagrożenia bezpieczeństwa są zidentyfikowane w starej wersji.
- **Koszty ogólne wydajności** – koszty ogólne są ogromne, a skalowanie jest naprawdę trudne. Aby osiągnąć poziom bezpieczeństwa, integralności, przejrzystości i niezawodności, do którego dąży Ethereum, każdy węzeł prowadzi i przechowuje każdą transakcję. Ponadto proof-of-work wymaga czasu. Pobieżne obliczenia określają koszty ogólne jako wartość w rodzaju 1 000 000x tego, co standardowe obliczenia obecnie.
- **Zatłoczenie sieci** – co najmniej w bieżącym modelu, jeśli jedna aplikacja używa zbyt wielu zasobów obliczeniowych, zostaje utworzona kopia zapasowa całej sieci. Obecnie sieć jest w stanie przetwarzać tylko około 10 transakcji na sekundę; jeżeli transakcje są wysyłane szybciej, pula niepotwierdzonych transakcji może szybko wzrosnąć.
- **Doświadczenia użytkownika** – projektowanie przyjaznych dla użytkownika doświadczeń może być trudniejsze: przeciętnemu użytkownikowi końcowemu może być zbyt trudno skonfigurować zestaw narzędzi niezbędny do interakcji z blockchainem w naprawdę bezpieczny sposób.

  - **Centralizacja** – przyjazne dla użytkownika i przyjazne dla programistów rozwiązania zbudowane na warstwie podstawowej Ethereum mogą i tak wyglądać jak usługi scentralizowane: na przykład takie usługi mogą przechowywać klucze lub inne poufne informacje po stronie serwera, obsługiwać frontend za pomocą scentralizowanego serwera lub uruchamiać ważną logikę biznesową na scentralizowanym serwerze przed zapisaniem do blockchaina. Eliminuje to wiele (jeśli nie wszystkie) przewag blockchaina nad tradycyjnym modelem.<!-- ## Types of dapp

- Involving money
- Involving money and something else
- Other, including decentralized autonomous organizations

---==crwdHRulesLBB_2_BBsuleRHdwrc==

The application has to be open-source, operate autonomously, and can not be controlled by any one entity.
All data and record must be cryptographically stored in a public, decentralized blockchain.
The app must use a cryptographic token, also referred to as an App Coin, to access the application.
Tokens must be generated in order to prove the value nodes that contribute to the application.

---==crwdHRulesLBB_2_BBsuleRHdwrc==
-->## Narzędzia aplikacji zdecentralizowanych {#dapp-tools}

**Interfejs użytkownika Rimble** **_– komponenty z możliwością dostosowania i standardy projektowe dla aplikacji zdecentralizowanych._ **

- [projekt rimble.consensus](https://rimble.consensys.design)
- [GitHub](https://github.com/ConsenSys/rimble-ui)

**One ​​Click Dapp** **_– narzędzie FOSS do generowania frontendów dapp z ABI._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/One-Click-Dapp/one-click-dApp)

**Etherflow** **_– narzędzie FOSS dla programistów Ethereum do testowania ich węzła i tworzenia oraz debugowania wywołań RPC z przeglądarki._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

## Dalsza lektura {#further-reading}

_Znasz jakieś zasoby społeczności, które Ci pomogły? Wyedytuj tę stronę i dodaj je!_

## Tematy powiązane {#related-topics}

- [Wprowadzenie do stosu Ethereum](/en/developers/docs/ethereum-stack/)
- [Frameworki programistyczne](/en/developers/docs/frameworks/)
