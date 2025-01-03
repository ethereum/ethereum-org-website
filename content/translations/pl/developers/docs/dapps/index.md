---
title: Wprowadzenie do zdecentralizowanych aplikacji
description:
lang: pl
---

Zdecentralizowana aplikacja (dapp) to aplikacja zbudowana na zdecentralizowanej sieci, która łączy [inteligentny kontrakt](/developers/docs/smart-contracts/) i frontendowy interfejs użytkownika. Pamiętaj, że inteligentne kontrakty Ethereum są dostępne i przejrzyste – jak otwarte API – aby aplikacja dapp mogła nawet zawierać inteligentny kontrakt, który ktoś inny napisał.

## Warunki wstępne {#prerequisites}

Zanim dowiesz się więcej o zdecentralizowanych aplikacjach, radzimy zapoznać się z podstawami [blockchain](/developers/docs/intro-to-ethereum/) oraz przeczytać o sieci Ethereum oraz o jej zdecentralizowanym charakterze.

## Definicja dapp {#definition-of-a-dapp}

Dapp ma swój kod backend uruchomiony w zdecentralizowanej sieci peer-to-peer. Porównaj to z aplikacją, w której kod backendu jest uruchomiony na scentralizowanych serwerach.

Dapp może mieć kod frontend i interfejsy użytkownika napisane w dowolnym języku (tak jak aplikacja), który może wywoływać do swojego backendu. Co więcej, jej frontend może być hostowany w zdecentralizowanej pamięci masowej, takiej jak [IPFS](https://ipfs.io/).

- **Zdecentralizowane**, tzn. działają na Ethereum, otwartej publicznej zdecentralizowanej platformie, na której żadna osoba ani grupa nie sprawuje kontroli
- **Deterministyczne**, tzn. wykonują tę samą funkcję niezależnie od środowiska, w którym są wykonywane.
- **Kompletność Turinga**, tzn. mogą wykonać dowolną czynność, jeśli posiadają wymagane zasoby
- **Odizolowane**, tzn. są realizowane w wirtualnym środowisku zwanym maszyną wirtualną Ethereum, więc jeśli inteligentny kontrakt zawiera błąd, nie zaburzy to normalnego funkcjonowania sieci blockchain

### O inteligentnych kontraktach {#on-smart-contracts}

Aby wprowadzić dapps, musimy wprowadzić inteligentne kontrakty – backend dapps z powodu braku lepszego terminu. Szczegółowe informacje znajdują się w naszej części o [inteligentnych kontraktach](/developers/docs/smart-contracts/).

Inteligentny kontrakt to kod, który znajduje się na blockchainie Ethereum i działa dokładnie tak, jak zaprogramowano. Po wdrożeniu inteligentnych kontraktów w sieci nie można ich zmienić. Aplikacje mogą być zdecentralizowane, ponieważ są kontrolowane przez logikę zapisaną w kontrakcie, a nie przez osobę prywatną czy firmę. Oznacza to również, że trzeba bardzo uważnie projektować kontrakty i dokładnie je testować.

## Korzyści z rozwoju dapp {#benefits-of-dapp-development}

- **Zero przestojów** – Po wdrożeniu inteligentnego kontraktu na blockchainie sieć jako całość zawsze będzie w stanie obsługiwać klientów, którzy chcą wchodzić w interakcję z kontraktem. Złośliwe podmioty nie mogą zatem uruchamiać ataków typu „denial-of-service” ukierunkowanych na poszczególne aplikacje.
- **Prywatność** – nie musisz podawać rzeczywistej tożsamości, aby wdrożyć aplikację lub korzystać z niej.
- **Odporność na cenzurę** – żaden pojedynczy podmiot w sieci nie może zablokować użytkownikom możliwości przesyłania transakcji, wdrażania aplikacji lub odczytywania danych z blockchaina.
- **Pełna integralność danych** – dane przechowywane w blockchainie są niezmienne i niepodważalne dzięki prymitywom kryptograficznym. Złośliwe podmioty nie mogą tworzyć transakcji ani innych danych, które zostały już podane do wiadomości publicznej.
- **Obliczenie niewymagające zaufania/weryfikowalne zachowanie** – Inteligentne kontrakty mogą być analizowane i mają gwarancję realizacji w przewidywalny sposób bez konieczności ufania organowi centralnemu. Nie dotyczy to tradycyjnych modeli; na przykład, gdy korzystamy z systemów bankowości internetowej, musimy ufać, że instytucje finansowe nie będą nadużywać naszych danych finansowych, ingerować w zapisy ani nie zostaną zhakowane.

## Wady rozwoju dapp {#drawbacks-of-dapp-development}

- **Utrzymanie** – Zdecentralizowane aplikacje mogą być trudniejsze do utrzymania, ponieważ kod i dane publikowane w blockchainie są trudniejsze do modyfikacji. Deweloperom jest trudno dokonywać aktualizacji swoich zdecentralizowanych aplikacji (lub podstawowych danych przechowywanych przez dapp) po ich wdrożeniu, nawet jeśli zostaną zidentyfikowane błędy lub zagrożenia bezpieczeństwa w starej wersji.
- **Koszty ogólne wydajności** – Koszty ogólne są ogromne, a skalowanie jest naprawdę trudne. Aby osiągnąć poziom bezpieczeństwa, integralności, przejrzystości i niezawodności, do którego dąży Ethereum, każdy węzeł prowadzi i przechowuje każdą transakcję. Ponadto konsensus proof-of-stake również wymaga czasu.
- **Zatłoczenie sieci** – Kiedy jedna zdecentralizowana aplikacja używa zbyt wielu zasobów obliczeniowych, cała sieć zostaje zablokowana. Obecnie sieć jest w stanie przetwarzać tylko około 10-15 transakcji na sekundę; jeżeli transakcje są wysyłane szybciej, pula niepotwierdzonych transakcji może szybko wzrosnąć.
- **Doświadczenia użytkownika** – Tworzenie przyjaznych dla użytkownika doświadczeń może być trudniejsze, ponieważ przeciętny użytkownik końcowy może uznać, że skonfigurowanie stosu narzędzi niezbędnych do interakcji z blockchainem w naprawdę bezpieczny sposób to zbyt trudne zadanie.
- **Centralizacja** – Przyjazne dla użytkownika i programisty rozwiązania zbudowane na bazowej warstwie Ethereum mogą i tak ostatecznie przybrać formę podobną do scentralizowanych usług. Na przykład takie usługi mogą przechowywać klucze lub inne poufne informacje po stronie serwera, zapewniać frontend za pomocą scentralizowanego serwera lub uruchamiać ważną logikę biznesową na scentralizowanym serwerze przed zapisaniem w blockchainie. Centralizacja eliminuje wiele (jeśli nie wszystkie) przewagi blockchainu nad tradycyjnym modelem.

## Jesteś raczej wzrokowcem? {#visual-learner}

<YouTube id="F50OrwV6Uk8" />

## Narzędzia do tworzenia zdecentralizowanych aplikacji {#dapp-tools}

**Scaffold-ETH _— Szybko eksperymentuj z Solidity używając frontendu, który dostosowuje się do Twojego inteligentnego kontraktu._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Przykładowy dapp](https://punkwallet.io/)

**Create Eth App _— Twórz aplikacje oparte na Ethereum za pomocą jednego polecenia._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _— Narzędzie FOSS do generowania frontendów zdecentralizowanych aplikacji z [ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _— Narzędzie FOSS dla deweloperów Ethereum do testowania ich węzła i tworzenia oraz debugowania wywołań RPC z przeglądarki._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _— SDK w każdym języku, inteligentne kontrakty, narzędzia i infrastruktura do rozwoju web3._**

- [Strona główna](https://thirdweb.com/)
- [Dokumentacja](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _ — platforma programistyczna Web3 klasy korporacyjnej służąca do wdrażania inteligentnych kontraktów, umożliwiania płatności kartą kredytową i płatności międzyłańcuchami oraz wykorzystywania API do tworzenia, udostępniania, sprzedawania, przechowywania oraz edytowania NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Dokumentacja](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## Dodatkowo przeczytaj {#further-reading}

- [Przeglądaj zdecentralizowane aplikacje](/dapps)
- [Architektura aplikacji Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) — _Preethi Kasireddy_
- [Przewodnik z 2021 r. po zdecentralizowanych aplikacjach](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) — _LimeChain_
- [Czym są zdecentralizowane aplikacje?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) — _Gemini_
- [Popularne zdecentralizowane aplikacje](https://www.alchemy.com/dapps) — _Alchemy_

_Wiesz o zasobach społecznościowych, które Ci pomogły? Wyedytuj tę stronę i dodaj je!_

## Tematy powiązane {#related-topics}

- [Wprowadzenie do stosu Ethereum](/developers/docs/ethereum-stack/)
- [Frameworki programistyczne](/developers/docs/frameworks/)
