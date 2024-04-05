---
title: Zarządzanie Ethereum
description: Wprowadzenie do sposobu podejmowania decyzji w sprawie Ethereum.
lang: pl
postMergeBannerTranslation: page-upgrades-post-merge-banner-governance-ood
---

# Wprowadzenie do zarządzania Ethereum {#introduction}

_Jeżeli nikt nie jest właścicielem Ethereum, w jaki sposób podejmowane są decyzje dotyczące przeszłych i przyszłych zmian w Ethereum? Zarządzanie Ethereum odnosi się do procesu, który umożliwia podejmowanie takich decyzji._

<Divider />

## Czym jest zarządzanie? {#what-is-governance}

Zarządzanie to istniejące systemy, które umożliwiają podejmowanie decyzji. W typowej strukturze organizacyjnej ostateczny głos w procesie decyzyjnym może mieć zespół wykonawczy lub zarząd dyrektorów. Albo być może to akcjonariusze głosują nad propozycjami uchwalenia zmian. W systemie politycznym wybrani urzędnicy mogą uchwalać przepisy, które próbują reprezentować pragnienia swoich wyborców.

## Zdecentralizowane zarządzanie {#decentralized-governance}

Nikt nie jest właścicielem ani nie kontroluje protokołu Ethereum, jednak decyzje wciąż muszą być podejmowane o wprowadzaniu zmian aby zapewnić długowieczność i dobrobyt sieci. Ten brak własności sprawia, że tradycyjne zarządzanie organizacyjne jest niekompatybilnym rozwiązaniem.

## Zarządzanie Ethereum {#ethereum-governance}

Zarządzanie Ethereum to proces, za pomocą którego wprowadzane są zmiany protokołu. Ważne jest, aby zaznaczyć, że ten proces nie jest związany z tym, jak ludzie i aplikacje używają protokołu — Ethereum jest udostępniane każdemu (permissionless). Każdy z jakiegokolwiek miejsca na świecie może uczestniczyć w działaniach na łancuchu (on-chain). Nie ma ustanowionych reguł kto może lub nie może zbudować aplikacji lub wysłać transakcji. Istnieje jednak proces, aby zaproponować zmiany w protokole podstawowym, na bazie których działają zdecentralizowane aplikacje. Ponieważ tak wiele osób liczy na stabilność Ethereum, istnieje bardzo wysoki próg kordynacyjny dla wprowadzenia zasadniczych zmian, zawierających procesy społeczne i techniczne, aby zapewnić bezpieczeństwo i szerokie poparcie społeczności dla wszelkich zmian w Ethereum.

### Zarządzanie na łańcuchu kontra poza łańcuchem (on-chain vs off-chain) {#on-chain-vs-off-chain}

Technologia blockchain umożliwia nowe możliwości w zakresie zarządzania, znane jako zarządzanie on-chain. Zarządzanie on-chain polega na podejmowaniu decyzji o proponowanych zmianach na protokole w drodze głosowania interesariuszy, zazwyczaj przez posiadaczy tokena uprawniającego do zarządzania, a głosowanie odbywa się na blockchainie. W przypadku niektórych form zarządzania na łańcuchu, proponowane zmiany protokołu są już zapisane w kodzie i wdrażane automatycznie, jeżeli udziałowcy zatwierdzą zmiany poprzez podpisanie transakcji.

Przeciwne podejście, zarządzanie poza łańcuchem, polega na tym, że wszelkie decyzje dotyczące zmian w protokole są podejmowane w drodze nieformalnego procesu dyskusji społecznych, który, jeśli zostanie zatwierdzony, zostanie wdrożony do kodu.

**Zarządzanie Ethereum odbywa się poza łańcuchem** z udziałem wielu różnych udziałowców.

_Podczas gdy na poziomie protokołu zarządzanie Ethereum odbywa się poza łańcuchem, wiele przypadków użycia zbudowanych na Ethereum, takich jak DAO, wykorzystuje zarządzanie w łańcuchu._

<ButtonLink to="/dao/">
  Więcej o DAO
</ButtonLink>

<Divider />

## Kto jest zaangażowany? {#who-is-involved}

W [społeczności Ethereum](/community/) znajdują się różni udziałowcy, a każdy odgrywa rolę w procesie zarządzania. Zaczynając od udziałowców najbardziej oddalonych od protokołu i zbliżając się, mamy:

- **Posiadaczy etheru**: ludzie ci posiadają dowolną ilość ETH. [Więcej o ETH](/eth/).
- **Użytkowników aplikacji**: ludzie ci wchodzą w interakcje z aplikacjami znajdującymi się na blockchainie Ethereum.
- **Deweloperów aplikacji/narzędzi**: ludzie ci piszą aplikacje działające na blockchainie Ethereum (np. DeFi, NFT itp.) lub tworzą narzędzia do interakcji z Ethereum (np. portfele, zestawy testowe itp.). [Więcej o zdecentralizowanych aplikacjach](/dapps/).
- **Operatorów węzłów**: ci ludzie uruchamiają węzły, które propagują bloki i transakcje, odrzucając wszelkie nieprawidłowe transakcje lub bloki, które napotkają. [Więcej o węzłach](/developers/docs/nodes-and-clients/).
- **Autorów EIP**: ludzie ci proponują zmiany w protokole Ethereum w formie Propozycji Ulepszeń Ethereum (EIP). [Więcej o EIP](/eips/).
- **Walidatorów**: ci ludzie uruchamiają węzły, które mogą dodawać nowe bloki do blockchainu Ethereum.
- **Deweloperów protokołów** (a.k.a. „główni deweloperzy” ): osoby te utrzymują różne implementacje Ethereum (np. go-ethereum, Nethermind, Besu, Erigon w warstwie wykonawczej lub Prysm, Lighthouse, Nimbus, Teku, Lodestar w warstwie konsensusu). [Więcej o klientach Ethereum](/developers/docs/nodes-and-clients/).

_Uwaga: każda osoba może być częścią wielu z tych grup (np. deweloper protokołów może być mistrzem EIP, uruchamiać walidator łańcucha śledzącego i korzystać z aplikacji DeFi). Jednak dla jasności pojęciowej najłatwiej jest je rozróżnić._

<Divider />

## Czym jest EIP? {#what-is-an-eip}

Jednym z ważniejszych procesów zarządzania Ethereum jest tzw. **Propozycja Ulepszenia Ethereum (EIP)**. EIP są standardami określającymi nowe funkcje lub procesy dla Ethereum. Każdy członek społeczności Ethereum może stworzyć EIP. Jeżeli jesteś zainteresowany stworzeniem EIP lub uczestnictwem w weryfikacji i/lub zarządzaniem zobacz:

<ButtonLink to="/eips/">
  Więcej o EIP
</ButtonLink>

<Divider />

## Proces formalny {#formal-process}

Proces formalny wprowadzania zmian do protokołu Ethereum jest następujący:

1. **Zaproponuj główne EIP**: jak opisano w [EIP-1](https://eips.ethereum.org/EIPS/eip-1#core-eips), pierwszym krokiem do formalnego zaproponowania zmiany w Ethereum jest wyszczególnienie jej w głównym EIP. Będzie ona funkcjonować jako oficjalna specyfikacja EIP, którą deweloperzy protokołów będą wdrażać, jeśli tylko zostanie zaakceptowana.

2. **Przedstaw swoje EIP deweloperom protokołów**: gdy masz już główne EIP, dla którego zebrałeś opinie członków społeczności, powinieneś przedstawić je deweloperom protokołów. Można to zrobić poprzez zaproponowanie dyskusji o nim podczas [rozmowy AllCoreDevs](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status). Możliwe jest to, że niektóre dyskusje odbyły się już wcześniej na [forum Ethereum Magician's](https://ethereum-magicians.org/) lub na [Discordzie R&D Ethereum](https://discord.gg/mncqtgVSVw).

> Potencjalnymi wynikami tego etapu są:

> - EIP zostanie wzięte pod uwagę podczas przyszłej modernizacji sieci
> - Wymagane będą zmiany techniczne
> - Może zostać odrzucone, jeśli nie jest priorytetem lub ulepszenie nie jest wystarczająco duże w stosunku do wysiłku deweloperów

3. **Pracuj nad ostateczną wersją propozycji**: po otrzymaniu informacji zwrotnych od wszystkich zainteresowanych udziałowców, prawdopodobnie będziesz musiał wprowadzić zmiany do swojej początkowej propozycji, aby poprawić jej bezpieczeństwo albo lepiej spełnić różne potrzeby użytkowników. Gdy twoje EIP uwzględni wszystkie konieczne zmiany, musisz je ponownie przedstawić deweloperom protokołów. Następnie przejdziesz do kolejnego etapu tego procesu lub pojawią się kolejne obawy, wymagające kolejnych popraw twojej propozycji.

4. **EIP zostaje uwzględnione w aktualizacji sieci**: zakładając, że EIP zostanie zatwierdzony, przetestowany i wdrożony, zostanie on zaplanowany jako część aktualizacji sieci. Biorąc pod uwagę wysokie koszty koordynacji aktualizacji sieci (wszyscy muszą aktualizować jednocześnie), EIP są zazwyczaj łączone w pakiety aktualizacji.

5. **Aktualizacja sieci zostaje aktywowana**: po aktywacji aktualizacji sieci, EIP będzie dostępny w sieci Ethereum. _Uwaga: aktualizacje sieci są zwykle aktywowane w sieciach testowych przed aktywacją w sieci głównej Ethereum._

Ten przebieg, choć bardzo uproszczony, daje obraz istotnych etapów aktywacji zmiany protokołu na Ethereum. Przyjrzyjmy się teraz nieformalnym czynnikom odgrywającym rolę w tym procesie.

## Proces nieformalny {#informal-process}

### Rozumienie wcześniejszych prac {#prior-work}

Mistrzowie EIP powinni zapoznać się z wcześniejszymi pracami i propozycjami przed stworzeniem EIP, które można poważnie rozważyć do wdrożenia w sieci głównej Ethereum. W ten sposób EIP może wnieść coś nowego, co nie zostało wcześniej odrzucone. Trzy główne miejsca, w których można to sprawdzić to [repozytorium EIP](https://github.com/ethereum/EIPs), [forum Ethereum Magicians](https://ethereum-magicians.org/) i [ethresear.ch](https://ethresear.ch/).

### Grupy robocze {#working-groups}

Mało prawdopodobne jest, aby wstępny projekt EIP został wdrożony do sieci głównej Ethereum bez edycji lub zmian. Zasadniczo mistrzowie EIP będą pracować z podzbiorem deweloperów protokołów w celu określenia, implementacji, przetestowania, iteracji i sfinalizowania ich propozycji. Dawniej takie grupy robocze wymagały kilku miesięcy (a czasem lat!) pracy. Podobnie, mistrzowie EIP dla takich zmian powinni angażować odpowiednich deweloperów aplikacji/narzędzi na wczesnym etapie ich wysiłków w celu zebrania opinii użytkowników końcowych i złagodzenia wszelkich zagrożeń związanych z wdrożeniem.

### Konsensus społeczności {#community-consensus}

Podczas gdy niektóre EIP są nieskomplikowanymi ulepszeniami technicznymi z minimalnymi poprawkami, niektóre są bardziej złożone i wiążą się z kompromisami, które będą miały różny wpływ na różnych udziałowców. Oznacza to, że niektóre EIP są bardziej kontrowersyjne w społeczności niż inne.

Nie ma jasnego podręcznika, jak radzić sobie z kontrowersyjnymi propozycjami. Jest to wynik zdecentralizowanego designu Ethereum, w którym żadna pojedyncza grupa udziałowców nie może zmusić innych przy użyciu siły: deweloperzy protokołów mogą zdecydować się nie implementować zmian w kodzie; operatorzy węzłów mogą zdecydować się nie uruchamiać najnowszego klienta Ethereum; zespoły aplikacji i użytkownicy mogą zdecydować się nie dokonywać transakcji w łańcuchu. Ponieważ deweloperzy protokołów nie mają możliwości zmuszenia ludzi do przyjęcia aktualizacji sieci, będą najczęściej unikać wdrażania EIP tam, gdzie kontrowersje przeważają nad korzyściami dla szerszej społeczności.

Od mistrzów EIP oczekuje się pozyskiwania opinii od wszystkich istotnych udziałowców. Jeśli znajdziesz się w sytuacji, w której zostaniesz mistrzem kontrowersyjnego EIP, powinieneś spróbować odnieść się do zastrzeżeń, aby zbudować konsensus wokół swojego EIP. Biorąc pod uwagę rozmiar i różnorodność społeczności Ethereum, nie ma jednej metody (np. głosowania monetą), która mogłaby być wykorzystana do oceny konsensusu społeczności, a od czempionów EIP oczekuje się dostosowania do okoliczności ich propozycji.

Poza bezpieczeństwem sieci Ethereum, deweloperzy protokołów dawniej przywiązywali dużą wagę do tego, co cenią sobie deweloperzy aplikacji/narzędzi i użytkownicy aplikacji, biorąc pod uwagę, że ich używanie i tworzenie w Ethereum jest tym, co czyni ekosystem atrakcyjnym dla innych udziałowców. Dodatkowo, EIP muszą być wdrażane we wszystkich implementacjach klienta, które są zarządzane przez różne zespoły. Część tego procesu zwykle oznacza przekonywanie wielu zespołów deweloperów protokołów, że dana zmiana jest wartościowa i pomaga użytkownikom końcowym lub rozwiązuje kwestię bezpieczeństwa.

<Divider />

## Radzenie sobie z nieporozumieniami {#disagreements}

Posiadanie wielu udziałowców z różnymi motywacjami i przekonaniami oznacza, że nieporozumienia nie są rzadkością.

Zasadniczo, nieporozumienia są rozwiązywane za pomocą długich dyskusji na forach publicznych, aby zrozumieć źródło problemu i umożliwić każdemu wypowiedzenie się. Zazwyczaj jedna z grup ustępuje lub osiągane jest szczęśliwe kompromisowe rozwiązanie. Jeśli jedna grupa czuje się wystarczająco silna, wymuszenie konkretnej zmiany może doprowadzić do podziału łańcucha. Podział łańcucha ma miejsce, gdy niektórzy udziałowcy protestują przeciwko wdrożeniu zmiany protokołu, w wyniku czego działają różne, niekompatybilne wersje protokołu, z których wyłaniają się dwa osobne blockchainy.

### Fork DAO {#dao-fork}

Forki następują, wtedy kiedy należy dokonać ważnych aktualizacji technicznych lub zmian w sieci i zmienić „zasady” protokołu. [Klienci Ethereum](/developers/docs/nodes-and-clients/) muszą zaktualizować swoje oprogramowanie, aby wdrożyć nowe zasady forków.

Fork DAO był odpowiedzią na [atak DAO z 2016 r.](https://www.coindesk.com/understanding-dao-hack-journalists), w którym niezabezpieczony kontrakt [DAO](/glossary/#dao) został pozbawiony z ponad 3,6 miliona ETH w wyniku włamania. Fork przeniósł środki z wadliwego kontraktu do nowego kontraktu, umożliwiając każdemu, kto stracił środki w wyniku włamania, ich odzyskanie.

Ten kierunek działania został przegłosowany przez społeczność Ethereum. Każdy posiadacz ETH mógł głosować za pośrednictwem transakcji na [platformie do głosowania](http://v1.carbonvote.com/). Decyzja o forku osiągnęła ponad 85% głosów.

Należy zauważyć, że chociaż protokół został zforkowany, aby odwrócić skutki włamania, waga głosowania przy podejmowaniu decyzji o zforkowaniu jest dyskusyjna z kilku powodów:

- Frekwencja w głosowaniu była niezwykle niska
- Większość ludzie nie wiedziała, że głosowanie się odbywa
- Głosowanie reprezentowało jedynie posiadaczy ETH, a nie innych uczestników systemu

Część społeczności odmówiła forkowania, głównie dlatego, że uważali, że incydent z DAO nie był wadą protokołu. Następnie utworzyli [Ethereum Classic](https://ethereumclassic.org/).

Obecnie społeczność Ethereum przyjęła politykę braku interwencji w przypadkach błędów w kontraktach lub utraty środków, aby zachować wiarygodną neutralność systemu.

Obejrzyj po więcej informacji o włamaniu do DAO:

<YouTube id="rNeLuBOVe8A" />

<Divider />

### Użyteczność forkowania {#forking-utility}

Fork Ethereum/Ethereum Classic jest doskonałym przykładem prawidłowego forka. Mieliśmy dwie grupy, które tak mocno nie zgadzały się ze sobą w kwestii pewnych podstawowych wartości, że uznały, że warto było podjąć ryzyko związane z realizacją ich konkretnych kierunków działania.

Zdolność do zforkowania w obliczu znaczących różnic politycznych, filozoficznych lub ekonomicznych odgrywa dużą rolę w sukcesie zarządzania Ethereum. Bez możliwości zforkowania alternatywą były ciągłe walki, wymuszony niechętny udział tych, którzy ostatecznie utworzyli Ethereum Classic i coraz bardziej rozbieżna wizja sukcesu Ethereum.

<Divider />

## Zarządzanie łańcuchem śledzącym {#beacon-chain}

Proces zarządzania Ethereum często zamienia szybkość i wydajność na otwartość i integracyjność. Aby przyspieszyć rozwój łańcucha śledzącego, został on uruchomiony niezależnie od sieci proof-of-work Ethereum i podlegał własnym praktykom zarządzania.

Podczas gdy specyfikacja i implementacje deweloperskie zawsze były w pełni open source, formalne procesy stosowane do proponowania aktualizacji opisane powyżej nie zostały użyte. Pozwoliło to na szybsze określanie i uzgadnianie zmian przez badaczy i osób wdrażających.

Kiedy łańcuch śledzący połączył się z warstwą wykonawczą Ethereum 15 września 2022 r., Połączenie zostało zakończone w ramach [aktualizacji sieci Paris](/history/#paris). Propozycja [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675) została zmieniona z „Last Call” na „Final”, kończąc przejście na proof-of-stake.

<ButtonLink to="/roadmap/merge/">
  Więcej o Połączeniu
</ButtonLink>

<Divider />

## Jak mogę się zaangażować? {#get-involved}

- [Zaproponuj EIP](/eips/#participate)
- [Dyskutuj na temat aktualnych propozycji](https://ethereum-magicians.org/)
- [Zaangażuj się w dyskusji R&D](https://ethresear.ch/)
- [Dołącz do Discorda R&D Ethereum](https://discord.gg/mncqtgVSVw)
- [Dodaj serwer](/developers/docs/nodes-and-clients/run-a-node/)
- [Przyczyń się do rozwoju klientów](/developers/docs/nodes-and-clients/#execution-clients)
- [Program stażowy dla głównych deweloperów](https://blog.ethereum.org/2021/09/06/core-dev-apprenticeship-second-cohort/)

## Dalsza lektura {#further-reading}

Zarządzanie w Ethereum nie jest jednoznacznie zdefiniowane. Perspektywy na ten temat różnią się wśród różnych uczestników społeczności. Oto kilka z nich:

- [Więcej o zarządzaniu blockchain](https://vitalik.eth.limo/general/2017/12/17/voting.html) – _Vitalik Buterin_
- [Jak działa zarządzanie Ethereum?](https://cryptotesters.com/blog/ethereum-governance) — _Cryptotesters_
- [Jak działa zarządzanie Ethereum](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) — _Micah Zoltu_
- [Czym jest główny deweloper Ethereum?](https://hudsonjameson.com/2020-06-22-what-is-an-ethereum-core-developer/) — _Hudson Jameson_
- [Zarządzanie, część 2: plutokracja jest nadal zła](https://vitalik.eth.limo/general/2018/03/28/plutocracy.html) – _Vitalik Buterin_
- [Wyjście poza zarządzanie głosowaniem monetami](https://vitalik.eth.limo/general/2021/08/16/voting3.html) – _Vitalik Buterin_
