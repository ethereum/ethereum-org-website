---
title: Wprowadzenie do zarządzania Ethereum
metaTitle: Zarządzanie Ethereum
description: Wprowadzenie do tego, jak podejmowane są decyzje dotyczące Ethereum.
lang: pl
---

_Jeśli nikt nie jest właścicielem [Ethereum](/), w jaki sposób podejmowane są decyzje o przeszłych i przyszłych zmianach w Ethereum? Zarządzanie Ethereum odnosi się do procesu, który umożliwia podejmowanie takich decyzji._

<Divider />

## Czym jest zarządzanie? {#what-is-governance}

Zarządzanie to systemy, które umożliwiają podejmowanie decyzji. W typowej strukturze organizacyjnej ostateczny głos w procesie decyzyjnym może mieć zespół kierowniczy lub zarząd. Albo akcjonariusze głosują nad propozycjami wprowadzenia zmian. W systemie politycznym wybrani urzędnicy mogą uchwalać przepisy, które starają się reprezentować pragnienia ich wyborców.

## Zdecentralizowane zarządzanie {#decentralized-governance}

Żadna pojedyncza osoba nie jest właścicielem ani nie kontroluje protokołu Ethereum, ale nadal trzeba podejmować decyzje dotyczące wdrażania zmian, aby jak najlepiej zapewnić długowieczność i dobrobyt sieci. Ten brak własności sprawia, że tradycyjne zarządzanie organizacyjne jest nieodpowiednim rozwiązaniem.

## Zarządzanie Ethereum {#ethereum-governance}

Zarządzanie Ethereum to proces, za pomocą którego wprowadzane są zmiany w protokole. Należy podkreślić, że proces ten nie jest związany z tym, jak ludzie i aplikacje korzystają z protokołu – Ethereum jest niewymagające pozwoleń. Każdy z dowolnego miejsca na świecie może uczestniczyć w działaniach onchain. Nie ma ustalonych zasad określających, kto może, a kto nie może zbudować aplikacji lub wysłać transakcji. Istnieje jednak proces proponowania zmian w głównym protokole, na którym działają zdecentralizowane aplikacje (dapps). Ponieważ tak wiele osób zależy od stabilności Ethereum, istnieje bardzo wysoki próg koordynacji dla głównych zmian, obejmujący procesy społeczne i techniczne, aby zapewnić, że wszelkie zmiany w Ethereum są bezpieczne i szeroko wspierane przez społeczność.

<VideoWatch slug="ethereum-core-governance-explained" />

### Zarządzanie onchain a zarządzanie pozałańcuchowe {#onchain-vs-offchain}

Technologia blockchain pozwala na nowe możliwości zarządzania, znane jako zarządzanie onchain. Zarządzanie onchain ma miejsce, gdy o proponowanych zmianach w protokole decyduje głos interesariuszy, zazwyczaj posiadaczy tokena zarządzania, a głosowanie odbywa się na blockchainie. W niektórych formach zarządzania onchain proponowane zmiany w protokole są już zapisane w kodzie i wdrażane automatycznie, jeśli interesariusze zatwierdzą zmiany poprzez podpisanie transakcji.

Przeciwne podejście, zarządzanie pozałańcuchowe, polega na tym, że wszelkie decyzje o zmianie protokołu zapadają w drodze nieformalnego procesu dyskusji społecznej, które, jeśli zostaną zatwierdzone, zostaną wdrożone w kodzie.

**Zarządzanie Ethereum odbywa się pozałańcuchowo**, a w proces ten zaangażowana jest szeroka gama interesariuszy.

_Chociaż na poziomie protokołu zarządzanie Ethereum jest pozałańcuchowe, wiele przypadków użycia zbudowanych na Ethereum, takich jak DAO, korzysta z zarządzania onchain._

<ButtonLink href="/dao/">
  Więcej o DAO
</ButtonLink>

<Divider />

## Kto jest zaangażowany? {#who-is-involved}

W [społeczności Ethereum](/community/) są różni interesariusze, z których każdy odgrywa rolę w procesie zarządzania. Zaczynając od interesariuszy najdalszych od protokołu i przybliżając się, mamy:

- **Posiadacze etheru**: osoby te posiadają dowolną ilość ETH. [Więcej o ETH](/what-is-ether/).
- **Użytkownicy aplikacji**: osoby te wchodzą w interakcje z aplikacjami na blockchainie Ethereum.
- **Programiści aplikacji/narzędzi**: osoby te piszą aplikacje działające na blockchainie Ethereum (np. zdecentralizowane finanse (DeFi), NFT itp.) lub tworzą narzędzia do interakcji z Ethereum (np. portfele, zestawy testowe itp.). [Więcej o dappach](/apps/).
- **Operatorzy węzłów**: osoby te uruchamiają węzły, które propagują bloki i transakcje, odrzucając każdą nieprawidłową transakcję lub blok, na który natrafią. [Więcej o węzłach](/developers/docs/nodes-and-clients/).
- **Autorzy EIP**: osoby te proponują zmiany w protokole Ethereum w formie Propozycji Ulepszeń Ethereum (EIP). [Więcej o EIP](/eips/).
- **Walidatorzy**: osoby te uruchamiają węzły, które mogą dodawać nowe bloki do blockchaina Ethereum.
- **Programiści protokołu** (znani również jako „Core Developers”): osoby te utrzymują różne implementacje Ethereum (np. go-ethereum, Nethermind, Besu, Erigon, Reth w warstwie wykonawczej lub Prysm, Lighthouse, Nimbus, Teku, Lodestar, Grandine w warstwie konsensusu). [Więcej o klientach Ethereum](/developers/docs/nodes-and-clients/).

_Uwaga: każda osoba może być częścią wielu z tych grup (np. programista protokołu może promować EIP, uruchomić walidator Beacon Chain i korzystać z aplikacji DeFi). Jednak dla jasności pojęciowej najłatwiej jest je rozróżnić._

<Divider />

## Czym jest EIP? {#what-is-an-eip}

Jednym z ważnych procesów stosowanych w zarządzaniu Ethereum jest proponowanie **Propozycji Ulepszeń Ethereum (EIP)**. EIP to standardy określające potencjalne nowe funkcje lub procesy dla Ethereum. Każdy w społeczności Ethereum może utworzyć EIP. Jeśli jesteś zainteresowany napisaniem EIP lub uczestnictwem w recenzowaniu i/lub zarządzaniu, zobacz:

<ButtonLink href="/eips/">
  Więcej o EIP
</ButtonLink>

<Divider />

## Formalny proces {#formal-process}

Formalny proces wprowadzania zmian w protokole Ethereum wygląda następująco:

1. **Zaproponowanie Core EIP**: jak opisano w [EIP-1](https://eips.ethereum.org/EIPS/eip-1#core-eips), pierwszym krokiem do formalnego zaproponowania zmiany w Ethereum jest szczegółowe opisanie jej w Core EIP. Będzie to stanowić oficjalną specyfikację dla EIP, którą programiści protokołu wdrożą, jeśli zostanie zaakceptowana.

2. **Przedstawienie EIP programistom protokołu**: gdy masz już Core EIP, dla którego zebrałeś opinie społeczności, powinieneś przedstawić go programistom protokołu. Możesz to zrobić, proponując go do dyskusji podczas [rozmowy AllCoreDevs](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status). Prawdopodobnie niektóre dyskusje odbyły się już asynchronicznie na [forum Ethereum Magicians](https://ethereum-magicians.org/) lub na [Discordzie Ethereum R&D](https://discord.gg/mncqtgVSVw).

> Potencjalne wyniki tego etapu to:

> - EIP zostanie rozważony w przyszłej aktualizacji sieci
> - Zostaną zażądane zmiany techniczne
> - Może zostać odrzucony, jeśli nie jest priorytetem lub ulepszenie nie jest wystarczająco duże w stosunku do wysiłku programistycznego

3. **Iteracja w kierunku ostatecznej propozycji:** po otrzymaniu opinii od wszystkich odpowiednich interesariuszy prawdopodobnie będziesz musiał wprowadzić zmiany w swojej początkowej propozycji, aby poprawić jej bezpieczeństwo lub lepiej zaspokoić potrzeby różnych użytkowników. Gdy Twoje EIP uwzględni wszystkie zmiany, które uważasz za konieczne, będziesz musiał ponownie przedstawić je programistom protokołu. Następnie przejdziesz do kolejnego kroku tego procesu lub pojawią się nowe obawy, wymagające kolejnej rundy iteracji Twojej propozycji.

4. **Włączenie EIP do aktualizacji sieci**: zakładając, że EIP zostanie zatwierdzony, przetestowany i wdrożony, zostaje zaplanowany jako część aktualizacji sieci. Biorąc pod uwagę wysokie koszty koordynacji aktualizacji sieci (wszyscy muszą zaktualizować się jednocześnie), EIP są zazwyczaj łączone w pakiety w ramach aktualizacji.

5. **Aktywacja aktualizacji sieci**: po aktywacji aktualizacji sieci EIP będzie działać w sieci Ethereum. _Uwaga: aktualizacje sieci są zazwyczaj aktywowane w sieciach testowych przed aktywacją w sieci głównej Ethereum._

Ten przepływ, choć bardzo uproszczony, daje przegląd istotnych etapów aktywacji zmiany protokołu w Ethereum. Teraz przyjrzyjmy się nieformalnym czynnikom odgrywającym rolę w tym procesie.

## Nieformalny proces {#informal-process}

### Zrozumienie wcześniejszych prac {#prior-work}

Promotorzy EIP (EIP Champions) powinni zapoznać się z wcześniejszymi pracami i propozycjami przed utworzeniem EIP, który może być poważnie brany pod uwagę do wdrożenia w sieci głównej Ethereum. W ten sposób EIP ma szansę wnieść coś nowego, co nie zostało wcześniej odrzucone. Trzy główne miejsca do zbadania tego to [repozytorium EIP](https://github.com/ethereum/EIPs), [Ethereum Magicians](https://ethereum-magicians.org/) oraz [ethresear.ch](https://ethresear.ch/).

### Grupy robocze {#working-groups}

Początkowy szkic EIP raczej nie zostanie wdrożony w sieci głównej Ethereum bez poprawek lub zmian. Zazwyczaj promotorzy EIP współpracują z podgrupą programistów protokołu w celu określenia, wdrożenia, przetestowania, iteracji i sfinalizowania swojej propozycji. Historycznie rzecz biorąc, te grupy robocze wymagały kilku miesięcy (a czasem lat!) pracy. Podobnie, promotorzy EIP dla takich zmian powinni wcześnie zaangażować odpowiednich programistów aplikacji/narzędzi w swoje wysiłki, aby zebrać opinie użytkowników końcowych i złagodzić wszelkie ryzyka związane z wdrożeniem.

### Konsensus społeczności {#community-consensus}

Podczas gdy niektóre EIP są prostymi ulepszeniami technicznymi z minimalnymi niuansami, inne są bardziej złożone i wiążą się z kompromisami, które w różny sposób wpłyną na różnych interesariuszy. Oznacza to, że niektóre EIP budzą w społeczności więcej kontrowersji niż inne.

Nie ma jasnego scenariusza, jak radzić sobie z kontrowersyjnymi propozycjami. Jest to wynik zdecentralizowanej konstrukcji Ethereum, w której żadna pojedyncza grupa interesariuszy nie może zmusić innej do niczego siłą: programiści protokołu mogą zdecydować się nie wdrażać zmian w kodzie; operatorzy węzłów mogą zdecydować się nie uruchamiać najnowszego klienta Ethereum; zespoły aplikacji i użytkownicy mogą zdecydować się nie przeprowadzać transakcji w łańcuchu. Ponieważ programiści protokołu nie mają możliwości zmuszenia ludzi do przyjęcia aktualizacji sieci, zazwyczaj unikają wdrażania EIP, w których kontrowersje przeważają nad korzyściami dla szerszej społeczności.

Oczekuje się, że promotorzy EIP będą zabiegać o opinie od wszystkich odpowiednich interesariuszy. Jeśli okaże się, że jesteś promotorem kontrowersyjnego EIP, powinieneś spróbować odnieść się do zastrzeżeń, aby zbudować konsensus wokół swojego EIP. Biorąc pod uwagę wielkość i różnorodność społeczności Ethereum, nie ma jednej miary (np. głosowania monetami), której można by użyć do oceny konsensusu społeczności, a od promotorów EIP oczekuje się dostosowania do okoliczności ich propozycji.

Poza bezpieczeństwem sieci Ethereum, programiści protokołu historycznie przywiązywali dużą wagę do tego, co cenią programiści aplikacji/narzędzi oraz użytkownicy aplikacji, biorąc pod uwagę, że ich korzystanie z Ethereum i rozwijanie go jest tym, co czyni ekosystem atrakcyjnym dla innych interesariuszy. Ponadto EIP muszą zostać wdrożone we wszystkich implementacjach klientów, które są zarządzane przez odrębne zespoły. Część tego procesu zazwyczaj oznacza przekonanie wielu zespołów programistów protokołu, że dana zmiana jest wartościowa i że pomaga użytkownikom końcowym lub rozwiązuje problem bezpieczeństwa.

<Divider />

## Radzenie sobie z nieporozumieniami {#disagreements}

Posiadanie wielu interesariuszy o różnych motywacjach i przekonaniach oznacza, że nieporozumienia nie należą do rzadkości.

Zazwyczaj nieporozumienia są rozwiązywane poprzez długie dyskusje na forach publicznych, aby zrozumieć źródło problemu i pozwolić każdemu zabrać głos. Zwykle jedna grupa ustępuje lub osiągany jest złoty środek. Jeśli jedna z grup jest wystarczająco zdeterminowana, przeforsowanie konkretnej zmiany może doprowadzić do podziału łańcucha. Podział łańcucha ma miejsce, gdy niektórzy interesariusze protestują przeciwko wdrożeniu zmiany w protokole, co skutkuje działaniem różnych, niekompatybilnych wersji protokołu, z których wyłaniają się dwa odrębne blockchainy.

### Rozwidlenie DAO {#dao-fork}

Rozwidlenia mają miejsce, gdy w sieci muszą zostać wprowadzone poważne aktualizacje techniczne lub zmiany, które zmieniają „zasady” protokołu. [Klienci Ethereum](/developers/docs/nodes-and-clients/) muszą zaktualizować swoje oprogramowanie, aby wdrożyć nowe zasady rozwidlenia.

Rozwidlenie DAO było odpowiedzią na [atak na DAO w 2016 roku](https://www.coindesk.com/learn/understanding-the-dao-attack), w którym z niezabezpieczonego kontraktu [DAO](/glossary/#dao) wyprowadzono ponad 3,6 miliona ETH w wyniku ataku hakerskiego. Rozwidlenie przeniosło środki z wadliwego kontraktu do nowego kontraktu, umożliwiając każdemu, kto stracił środki w wyniku ataku, ich odzyskanie.

Ten sposób działania został poddany pod głosowanie przez społeczność Ethereum. Każdy posiadacz ETH mógł oddać głos za pomocą transakcji na [platformie do głosowania](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). Decyzja o rozwidleniu uzyskała ponad 85% głosów.

Ważne jest, aby zauważyć, że chociaż protokół uległ rozwidleniu w celu wycofania skutków ataku, waga głosu w podjęciu decyzji o rozwidleniu jest dyskusyjna z kilku powodów:

- Frekwencja w głosowaniu była niezwykle niska
- Większość ludzi nie wiedziała, że odbywa się głosowanie
- Głosowanie reprezentowało tylko posiadaczy ETH, a nie żadnych innych uczestników systemu

Część społeczności odmówiła rozwidlenia, w dużej mierze dlatego, że uważała, iż incydent z DAO nie był wadą protokołu. Następnie utworzyli oni [Ethereum Classic](https://ethereumclassic.org/).

Obecnie społeczność Ethereum przyjęła politykę nieinterwencji w przypadkach błędów w kontraktach lub utraconych środków, aby utrzymać wiarygodną neutralność systemu.

Obejrzyj więcej o ataku na DAO:

<VideoWatch slug="dao-hack-ethereum-classic" />

<Divider />

### Użyteczność rozwidlania {#forking-utility}

Rozwidlenie Ethereum/Ethereum Classic jest doskonałym przykładem zdrowego rozwidlenia. Mieliśmy dwie grupy, które na tyle mocno nie zgadzały się ze sobą w kwestii pewnych podstawowych wartości, że uznały, iż warto podjąć związane z tym ryzyko, aby realizować swoje specyficzne kierunki działań.

Zdolność do rozwidlenia w obliczu znaczących różnic politycznych, filozoficznych lub ekonomicznych odgrywa dużą rolę w sukcesie zarządzania Ethereum. Bez możliwości rozwidlenia alternatywą byłyby ciągłe wewnętrzne walki, wymuszony, niechętny udział tych, którzy ostatecznie utworzyli Ethereum Classic, oraz coraz bardziej odmienna wizja tego, jak wygląda sukces Ethereum.

<Divider />

## Zarządzanie Beacon Chain {#beacon-chain}

Proces zarządzania Ethereum często wymienia szybkość i wydajność na otwartość i inkluzywność. Aby przyspieszyć rozwój Beacon Chain, został on uruchomiony oddzielnie od sieci Ethereum opartej na dowodzie pracy (PoW) i postępował zgodnie z własnymi praktykami zarządzania.

Chociaż specyfikacja i implementacje programistyczne zawsze były w pełni open source, opisane powyżej formalne procesy proponowania aktualizacji nie były stosowane. Pozwoliło to badaczom i wdrożeniowcom na szybsze określanie i uzgadnianie zmian.

Kiedy Beacon Chain połączył się z warstwą wykonawczą Ethereum 15 września 2022 r., The Merge zostało zakończone w ramach [aktualizacji sieci Paris](/ethereum-forks/#paris). Propozycja [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675) została zmieniona z „Last Call” na „Final”, kończąc przejście na dowód stawki (PoS).

<ButtonLink href="/roadmap/merge/">
  Więcej o The Merge
</ButtonLink>

<Divider />

## Jak mogę się zaangażować? {#get-involved}

- [Zaproponuj EIP](/eips/#participate)
- [Dyskutuj o obecnych propozycjach](https://ethereum-magicians.org/)
- [Zaangażuj się w dyskusje R&D](https://ethresear.ch/)
- [Dołącz do Discorda Ethereum R&D](https://discord.gg/mncqtgVSVw)
- [Uruchom węzeł](/developers/docs/nodes-and-clients/run-a-node/)
- [Wnieś wkład w rozwój klienta](/developers/docs/nodes-and-clients/#execution-clients)
- [Program stażowy dla Core Developers](https://blog.ethereum.org/2021/09/06/core-dev-apprenticeship-second-cohort)

## Dalsza lektura {#further-reading}

Zarządzanie w Ethereum nie jest sztywno zdefiniowane. Różni uczestnicy społeczności mają na ten temat odmienne perspektywy. Oto kilka z nich:

- [Notatki o zarządzaniu blockchainem](https://vitalik.eth.limo/general/2017/12/17/voting.html) – _Vitalik Buterin_
- [Jak działa zarządzanie Ethereum?](https://cryptotesters.com/blog/ethereum-governance) – _Cryptotesters_
- [Jak działa zarządzanie Ethereum](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) – _Micah Zoltu_
- [Kim jest główny programista (core developer) Ethereum?](https://hudsonjameson.com/posts/2020-06-22-what-is-an-ethereum-core-developer/) – _Hudson Jameson_
- [Zarządzanie, część 2: Plutokracja wciąż jest zła](https://vitalik.eth.limo/general/2018/03/28/plutocracy.html) – _Vitalik Buterin_
- [Wyjście poza zarządzanie oparte na głosowaniu monetami](https://vitalik.eth.limo/general/2021/08/16/voting3.html) – _Vitalik Buterin_
- [Zrozumienie zarządzania blockchainem](https://web.archive.org/web/20250124192731/https://research.2077.xyz/understanding-blockchain-governance) – _2077 Research_
- [Rząd Ethereum](https://www.galaxy.com/insights/research/ethereum-governance/) – _Christine Kim_