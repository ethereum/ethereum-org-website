---
title: "Jak stworzyć partyzanckie L2"
description: "Fatemeh Fannizadeh i Melanie Premsyl o budowaniu sieci warstwy 2 (L2) jako narzędzi zapewniających prywatność, wolność i opór, na nowo wyobrażając sobie infrastrukturę blockchain przez pryzmat cypherpunkowy i aktywistyczny."
lang: pl
youtubeId: "WlsICV2OPAE"
uploadDate: 2025-11-23
duration: "0:15:55"
educationLevel: intermediate
topic:
  - "prywatność-i-bezpieczeństwo"
  - "skalowanie-i-warstwa-2"
  - "prywatność"
  - "warstwa-2"
format: interview
author: Web3Privacy Now
breadcrumb: "Partyzanckie L2"
---

**Fatemeh Fannizadeh** i **Melanie Premsyl** występują na Ethereum Cypherpunk Congress (ECC#2) w Buenos Aires, opowiadając o budowaniu sieci warstwy 2 (L2) jako narzędzi zapewniających prywatność, wolność i opór, na nowo wyobrażając sobie infrastrukturę blockchain przez pryzmat cypherpunkowy i aktywistyczny, ze szczegółowym omówieniem punktu styku filozofii anarchistycznej i architektury blockchain.

*Ten transkrypt jest dostępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=WlsICV2OPAE) opublikowanego przez Web3Privacy Now. Został on lekko zredagowany w celu poprawy czytelności.*

#### Wprowadzenie i filozofia anarchistyczna (0:05) {#introduction-and-anarchist-philosophy-005}

**Fatemeh Fannizadeh:** [Oklaski] Cóż, dziękuję, że tu jesteście. Wiem, że Vitalik teraz przemawia. To naprawdę zaszczyt gościć tu kilkoro z was, a nie w tamtej kolejce po matchę. Porozmawiamy dzisiaj o partyzanckich warstwach 2 (L2) i myślę, że zaraz do tego przejdziemy, ale najpierw przedstawiam wam Melanie Premsyl, francuską filozofkę i anarchistkę, która robi nam ten zaszczyt i dołącza do nas. Czy chciałabyś powiedzieć o sobie kilka słów tytułem wstępu?

**Melanie Premsyl:** Tak. Cześć wszystkim. Jestem francuską filozofką. Badam anarchię i technologię, a na początku skupiałam się bardziej na terytorium. Jak na przykład w środkowej Francji, nie wiem, czy znacie Tarnac, albo tego typu grupy, które są bardziej radykalne. Głównym problemem, z jakim się spotkałam, było to, że musimy być w kontakcie z innymi ludźmi na świecie, a wiele grup anarchistycznych jest bardzo ograniczonych. Potrzebujemy sposobu na komunikację z większą liczbą osób z Ameryki Północnej czy Południowej. I właśnie dlatego próbujemy teraz stworzyć most z krypto i wszystkimi, którzy szukają nowych sposobów na walkę z brakiem prywatności, brakiem wolności i przemocą ze strony państwa.

#### Proces braci MEV (1:52) {#the-mev-brothers-trial-152}

**Fatemeh Fannizadeh:** Niesamowite. Zasadniczo poznałyśmy się kilka tygodni temu w Nowym Jorku. Obie uczestniczyłyśmy w procesie na Manhattanie, gdzie dwaj bracia, znani jako bracia MEV, byli sądzeni za to, że zastosowali atak sandwich na boty typu sandwich. Poszłam do sądu, aby obserwować proces, i zobaczyłam tę oto osobę czytającą Spinozę po francusku, i byłam bardzo ciekawa, co się dzieje. Na widowni nie było nikogo oprócz nas dwóch! Byłam więc bardzo ciekawa, co skłoniło cię, przede wszystkim anarchistkę i filozofkę, a nie technolożkę, do wzięcia udziału w tym konkretnym procesie, ale także do refleksji nad zarządzaniem Ethereum, całym systemem walidacji i procesem, który odbywał się w Nowym Jorku. 

**Melanie Premsyl:** Myślę, że po prostu starałam się zrozumieć, czy Stany Zjednoczone w jakiś sposób próbują kontrolować Ethereum. Ponieważ w Europie jesteśmy bardzo w tyle, jeśli chodzi o krypto, w tym sensie, że nie mamy odpowiednich przepisów, więc po prostu to sprawdzałam. 

**Fatemeh Fannizadeh:** Więc uważasz, że Stany Zjednoczone próbują kontrolować Ethereum? 

**Melanie Premsyl:** Myślę, że to ważne pytanie. Uważam, że Stany Zjednoczone próbują kontrolować wszystkich. 

**Fatemeh Fannizadeh:** Okej. Tak, to ma sens. Więc dla tych, którzy nie śledzili procesu, po jakichś trzech czy czterech tygodniach został on unieważniony. Ława przysięgłych nie mogła dojść do jednomyślnego werdyktu i zdecydować, czy ci dwaj bracia byli winni naruszenia zasad blockchain, czy nie – co jest w pewnym sensie pozytywnym wynikiem, jak sądzę, dla krypto, że sąd lub ława przysięgłych nie decyduje o tym, co jest dobre, a co złe onchain. 

#### Łączenie blockchain z innymi społecznościami (4:06) {#bridging-blockchain-with-other-communities-406}

**Fatemeh Fannizadeh:** Ale dobrze, jeśli cofniemy się o krok do tego, co powiedziałaś o anarchistach przyglądających się tej technologii, aby w zasadzie budować mosty między różnymi grupami. 

**Melanie Premsyl:** Tak. Myślę, że jestem tu tylko w jednym celu. Nie jestem dziewczyną od technologii ani nie jestem częścią świata krypto, ale to, co obserwowałam z innej perspektywy, to fakt, że blockchain ma naprawdę przełomową moc, ale nie jest w stanie dotrzeć do innych społeczności, które są bardziej zterytorializowane. Myślę, że jednym z celów jest stworzenie różnorodnego blockchain, na przykład dlaczego chcemy rozmawiać o warstwach 2 (L2), jak tworzyć nowe społeczności z różnymi doświadczeniami, z inną wyobraźnią i wyobrażeniami.

**Fatemeh Fannizadeh:** Szczerze mówiąc, to naprawdę niesamowite, że jesteś tu z nami na Devconnect, ponieważ wnosisz świeże spojrzenie na tę społeczność, na to, co robimy i na nasze wydarzenia. Wczoraj spędziłyśmy dużo czasu, przeskakując z wydarzenia na wydarzenie, i usłyszałam twoją opinię – coś, czego ja już nie potrafię dostrzec, ponieważ od wielu lat tkwimy w tym swoistym teatrze. Wszyscy jesteśmy przyjaciółmi, więc jesteśmy dla siebie bardzo mili. Ale ta krytyczna perspektywa jest niesamowita. Myślę, że możemy na tym skorzystać, zwłaszcza że bardzo ucieszyło mnie to, że anarchiści, a może bardziej osoby o lewicowych poglądach, wciąż interesują się naszą technologią. Chociaż, pomimo wszelkich kłótni na krypto Twitterze, może to i lepiej, że nie jesteś świadoma tej całej strony społeczności. Ale kłótnie o to, czy Ethereum jest technologią komunistyczną – czy to brzmi dla ciebie prawdziwie? Czy uważasz, że można powiedzieć, że Ethereum to technologia komunistyczna? 

**Melanie Premsyl:** Tak, chciałabym tak powiedzieć, ale nie jestem pewna, bo wiesz, jest wielu ludzi, którzy muszą zarabiać pieniądze, więc to też jest główny cel. Ale myślę, że moglibyśmy po prostu używać tego jak komunistycznej sieci, że tylko jedna część mogłaby być takim marzeniem. Myślę, że to wymarzone ciasto, które można upiec, ale potrzebujemy narzędzi i projektów, które pomogą ludziom wyjść z technicznego, bardzo inżynieryjnego sposobu myślenia, aby zrozumieć, jak to wygląda.

#### Decentralizacja i warstwy 2 (L2) (6:55) {#decentralization-and-layer-2s-655}

**Fatemeh Fannizadeh:** To bardzo przypomina mi zdecentralizowane organizacje autonomiczne (DAO) sprzed kilku lat. Nie wiem jak wy, ale ja byłam bardzo podekscytowana, myślałam, że DAO rewolucjonizują sposób, w jaki organizujemy się jako grupy i społeczności onchain, oraz wolność, jaką mamy. A ostatecznie wszystko to spaliło na panewce. Nie sądzę, żeby to się w ogóle zmaterializowało. Stało się to bardziej kwestią systemu głosowania, nie jest to tak naprawdę demokratyczne, chodzi tylko o osiąganie zysków. Cała ta idea DAO jako narzędzia społecznego, którą mieliśmy, tak naprawdę się nie urzeczywistniła. 

**Fatemeh Fannizadeh:** Ale myślę, że ostatnio dużo rozmawialiśmy o tych narzędziach, które daje nam blockchain, i o tym, jak możemy wyobrazić sobie ewolucję blockchain w ciągu pięciu do dziesięciu lat, a wiele rozmów toczy się wokół tego, że Ethereum staje się prywatne. Myślę, że to zdecydowanie droga na przyszłość: warstwa 1 (L1) ma być L1 skoncentrowaną na prywatności. Istnieje również mapa drogowa skoncentrowana na rollupach. Chodzi o to, jak warstwy 2 (L2) i rollupy staną się głównymi użytkownikami Ethereum, a nie użytkownicy końcowi. Użytkownicy końcowi przeniosą się wtedy, zamiast być częścią DAO na L1, do bycia częścią różnych rollupów lub L2. Jak więc możemy w zasadzie rzutować naszą wyobraźnię na tego rodzaju przyszłość Ethereum, aby zbudować to, o czym mówiłaś, tę subkomunistyczną, anarchistyczną przestrzeń wolności? 

**Melanie Premsyl:** Jestem Francuzką. To duży problem. Będąc Francuzami, jesteśmy narodem bardzo państwowym. Więc zawsze myślę w sposób pedagogiczny i bardzo odgórny. Myślę, że L2 tworzy sposób, w jaki każdy może tworzyć mini blockchainy, a są one zabezpieczone przez warstwę 1 (L1). Chciałabym zobaczyć, czy ludzie potrafią stworzyć pomoc pedagogiczną dla każdego w zakresie czegoś, co jest darmowe. Myślę, że wiele grup, takich jak stowarzyszenia, mogłoby stworzyć własny blockchain, i byłby to sposób – jak wiesz, federalizm to główny temat anarchizmu. Jak ludzie mogą sobie radzić, może nienawidząc się nawzajem, ale rozmawiając ze sobą. Potrzebujemy więc tego rodzaju federalizmu w blockchain. Każdy ma warstwę 2 (L2) z własną wartością, więc rozmawiamy za pomocą tej samej infrastruktury. 

#### Anarchia, wolność i budowanie narzędzi (9:53) {#anarchy-freedom-and-building-tooling-953}

**Fatemeh Fannizadeh:** Tak, bardzo podoba mi się to, co powiedziałaś o tym, że w zasadzie nienawidzimy się nawzajem, ale wciąż się komunikujemy, czyli nie jesteśmy toksyczni pomimo naszych różnic. A fakt, że w tym scenariuszu istnieje jedna warstwa 1 (L1), którą byłoby Ethereum, jest również często określany jako faszystowski, ponieważ wszyscy musimy zgodzić się na ten jeden zestaw zasad. Jest to więc jeden system, który jest równy dla wszystkich, i musisz w zasadzie podporządkować się temu L1 albo możesz odejść, to zupełnie inna kwestia. Ale jeśli możemy to zdecentralizować w różnego rodzaju ekosystemy małych rollupów L2, to możemy przywrócić dysonans i niezgodę w ramach tej wspólnej infrastruktury. 

**Melanie Premsyl:** Tak, jasne. Myślę, że jesteście świetni. Uważam, że na ludziach od technologii, którzy mają prawdziwy sposób myślenia, spoczywa ogromna odpowiedzialność. Jesteście obecnie jedynymi, którzy próbują zrobić coś dobrego, więc nie możecie po prostu tkwić we własnej wyobraźni. I jak mówisz, może problem faszyzmu – że jesteśmy tylko jednością, macie dużą odpowiedzialność. To nie tylko korzystanie z Ethereum czy tylko prywatność, to tak, jakbyśmy tworzyli nowy technologiczny świat i musimy wybrać, czy będą w nim tylko ludzie od technologii, czy też ludzie od technologii będą połączeni ze wszystkimi, którzy pragną więcej wolności.

**Fatemeh Fannizadeh:** Dużo wspominałyśmy o komunizmie i anarchizmie, a mam wrażenie, że w krypto to prawie jak przekleństwa. Wiesz, to jest tak skażone i od razu spotykasz się z krytyką, jeśli wspomnisz o tej koncepcji. I nie wiem, może się mylę, ale kiedy dołączyłam do krypto, było więcej hakerów, a estetyka anarchistyczna była bardziej obecna. Klimat był bardziej – fajnie było takim być, więc wiele osób się z tym identyfikowało. Obecnie mam wrażenie, że wciąż jest ich wielu, ale może bardziej się z tym ukrywają. Czy jest na sali jakiś ukryty anarchista? Nie wiem! Myślę, że są. Powiedziałabym więc, żebyśmy może cofnęły się o krok, czy mogłabyś zdefiniować, czym właściwie jest komunizm lub anarchizm.

**Melanie Premsyl:** Tak. Nie, myślę, że anarchizm nie jest dobrze znany, mimo że jest bardzo prosty. To po prostu moment, w którym dochodzimy do samoorganizacji. Więc kiedy istnieją enklawy wolności, enklawy anarchii, na przykład kiedy ludzie po prostu rozmawiają z przyjaciółmi, w stowarzyszeniu, w pracy również, i nie potrzebują kogoś, kto byłby szefem, głową, która rozumie i decyduje. Ponieważ ostatecznie ludzkim problemem jest to, że ludzie chcą mieć szefa. Anarchizm po prostu próbuje walczyć z tym głębokim pragnieniem bycia kontrolowanym przez innych. Czy naprawdę chcemy być wolni? To jest pytanie, i jak możemy to osiągnąć razem? 

**Fatemeh Fannizadeh:** Coś, co powiedziałaś wczoraj, co było bardzo trafne, to to, że każdy doświadcza anarchii w swoim życiu. Niektórzy mówią: „Och, anarchia, jesteśmy od niej tak daleko. Jesteście po prostu reakcjonistami, antyestablishmentowi, antypaństwowi”. Ale tak naprawdę każdy, czy to w rodzinie, w przyjaźni, w jakiejś formie relacji, porusza się w sferze pewnego rodzaju bezprawia, anarchii, gdzie zasady są tworzone poprzez dynamikę interpersonalną. Więc każdy ma w swoim życiu pewien poziom anarchii i myślę, że wychodząc od tego, może łatwiej jest o tym rozmawiać.

**Melanie Premsyl:** Tak. Tak. Dlatego uważam, że blockchain jest prawdziwie anarchistyczny w tym sposobie myślenia. 

**Fatemeh Fannizadeh:** Okej. Niesamowite. Myślę, że to idealne zdanie na zakończenie. Blockchain jest anarchistyczny. I żeby to podsumować, myślę, że to, co jest naprawdę ważne lub co bardzo chciałabym zobaczyć w blockchain, to więcej narzędzi. Ponieważ trudno mi sobie wyobrazić, by grupy anarchistyczne lub bardziej autonomiczne, suwerenne grupy przyszły i po prostu stały się użytkownikami produktu. W tym sensie niekoniecznie istnieje dopasowanie do rynku. Jest bardzo mało prawdopodobne, że po prostu przyjęliby gotowy produkt. Prędzej, jeśli dasz im surowiec do zbudowania własnego. Więc to bardziej jak zrób to sam (DIY), zbuduj własne narzędzia, własny rollup warstwy 2 (L2), jakkolwiek chcesz to nazwać. Myślę, że to sprawiłoby, że krypto byłoby jeszcze bardziej z nami spójne. Merci beaucoup. [Oklaski]