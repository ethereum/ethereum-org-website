---
title: "Atak na DAO: historia Ethereum Classic"
description: "Historia ataku na DAO w 2016 roku i tego, jak reakcja społeczności doprowadziła do powstania Ethereum Classic jako oddzielnego łańcucha."
lang: pl
youtubeId: "rNeLuBOVe8A"
uploadDate: 2021-12-15
duration: "0:09:48"
educationLevel: beginner
topic:
  - "zarządzanie"
  - "historia"
  - "dao"
format: explainer
author: Junion
breadcrumb: "Atak na DAO"
---

Film wyjaśniający autorstwa **Junion**, opowiadający historię ataku na DAO w 2016 roku, jednej z największych kradzieży cyfrowych w historii krypto, oraz tego, jak kontrowersyjna decyzja społeczności Ethereum o rozwidleniu blockchaina doprowadziła do powstania Ethereum Classic.

*Ten transkrypt jest dostępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=rNeLuBOVe8A) opublikowanego przez Junion. Został on lekko zredagowany w celu poprawy czytelności.*

#### Odkrycie (0:00) {#the-discovery-000}

Jest poniedziałek, 13 czerwca 2016 roku. Profesor informatyki na uniwersytecie Cornell bada kod DAO, jednego z najbardziej ambitnych projektów w przestrzeni krypto. Od miesięcy opowiadał się za wstrzymaniem projektu, ponieważ uważał, że istnieją pewne wady, które mogą zagrozić całemu przedsięwzięciu. Ale dzisiaj znajduje poważną lukę: błąd w linii 666.

Obawia się, że ten błąd może pozwolić hakerowi na potencjalnie nieograniczone wypłaty, podobne do tych z bankomatu. Nawet jeśli atakujący miałby na swoim koncie tylko 10 dolarów, mógłby je wypłacać w kółko, aż do wyczerpania wszystkich środków. W DAO zainwestowano ćwierć miliarda dolarów, a każdy cent był zagrożony.

Slock.it, firma stojąca za DAO, przyznaje, że istnieje potencjalna luka, ale deklaruje, że jakikolwiek atak byłby niewykonalny, więc wszystkie fundusze są nadal bezpieczne. Wprowadzają commit na GitHubie, zamieniając dwie linie kodu — poprawkę, która zostanie uwzględniona w ramach DAO Framework w wersji 1.1.

Ale w momencie, gdy zespół ogłaszał zwycięstwo, haker potajemnie podążał ich śladem, tworząc exploita wykorzystującego dokładnie ten błąd. Jest teraz piątek, cztery dni później, a DAO właśnie padło ofiarą ataku na kwotę 55 milionów dolarów.

Podobnie jak atak na system SWIFT na kwotę 81 milionów dolarów ujawnił luki w scentralizowanej branży bankowej, a atak ransomware WannaCry odkrył krytyczne podatności w systemach operacyjnych, atak na DAO obnażył wczesną kruchość bezpieczeństwa inteligentnych kontraktów w świecie, w którym kod dyktuje wszystko. Pozostawiło to społeczność Ethereum zdruzgotaną, gdy gorączkowo próbowali odzyskać kontrolę nad blockchainem.

To historia jednej z największych cyfrowych kradzieży w historii i odważnej próby napisania historii na nowo, tak aby to wydarzenie nigdy nie miało miejsca.

#### Czym było DAO? (2:00) {#what-was-the-dao-200}

Oto DAO — skrót od zdecentralizowanej autonomicznej organizacji. Pomysł ten został zainspirowany finansowaniem społecznościowym (crowdfundingiem). Zamiast wielu funduszy na różne projekty, miał istnieć jeden fundusz, by rządzić wszystkimi, a nie było na to lepszego sposobu niż DAO.

W momencie uruchomienia inwestorzy otrzymywali 100 tokenów DAO za każdy zdeponowany ether. Tokeny te dawały im zarządzanie nad protokołem i reprezentowały ich udział w DAO. Posiadacze tokenów mogli składać propozycje — na przykład można było złożyć propozycję zainwestowania miliona dolarów w zamian za 10% udziałów w firmie XYZ.

Gdy propozycja przeszła wstępną weryfikację, była poddawana pod głosowanie wszystkich pozostałych inwestorów. W tym okresie posiadacze tokenów mogli oddać głos na „tak”, jeśli uważali, że inwestycja przyniesie dodatnią wartość oczekiwaną, lub na „nie”, jeśli uważali, że przyniesie ujemną wartość oczekiwaną. Mogli również korzystać z forum, aby wyrażać swoje opinie i czytać opinie innych.

Gdy okres głosowania dobiegł końca i osiągnięto kworum wynoszące 20% wszystkich tokenów, DAO automatycznie przesyłało określony ether do inteligentnego kontraktu, który reprezentował propozycję. Wszelki ether wygenerowany z tych propozycji był następnie zwracany do skarbca. Było to jak jeden wielki zdecentralizowany fundusz hedgingowy, zaprojektowany w celu generowania zysków. Ideą było to, że mądrość tłumu pomoże stworzyć najlepsze możliwości inwestycyjne.

Jednak nadal potrzebny był sposób na ochronę mniejszości przed uciskiem ze strony większości. Jeśli grupa mniejszościowa zdecydowanie nie zgadzała się z propozycją, której nie mogła przegłosować, zamiast głosować na „nie”, mogła wywołać funkcję podziału (split) i przenieść swój ether z głównego DAO do podrzędnego DAO (child DAO), w zasadzie dzieląc DAO na dwa. Ta funkcja podziału będzie bardzo ważna w dalszej części.

#### Finansowanie społecznościowe (4:01) {#the-crowdfund-401}

DAO było największym projektem crowdfundingowym w historii, zbierając 12,7 miliona etherów — wartych wówczas 150 milionów dolarów. Miało to miejsce we wczesnej erze Ethereum, kiedy projekt był przedmiotem ogromnego szumu medialnego i FOMO inwestorów.

Wcześniej projekty Ethereum były głównie arbitralnymi dowodami słuszności koncepcji (proof of concept), ale ten był w pełni funkcjonującym projektem o ogromnym potencjale. Był całkowicie bezpieczny przed wszelkimi atakami hakerskimi, zabezpieczony przez miliony górników na całym świecie i był zdecentralizowany — cały projekt składał się z serii inteligentnych kontraktów na Ethereum.

Był to niezmienny kod hostowany na najbezpieczniejszym komputerze na świecie, co zapewniało kluczowe właściwości DAO: organizacji, która jest całkowicie zdecentralizowana i autonomiczna. Po wdrożeniu kontraktów 30 kwietnia, żaden pojedynczy podmiot — nawet Slock.it — nie mógł wprowadzić zmian w protokole ani zatrzymać jego istnienia. Jego kod był niezliczoną ilość razy audytowany przez różnych programistów Ethereum i był dostępny dla każdego do wglądu.

#### Atak (5:02) {#the-hack-502}

„Lonely, so lonely” — to nazwa Propozycji DAO nr 59. To tylko zwykła propozycja podziału, ale to właśnie od niej zaczyna się atak. Po tym, jak haker złożył propozycję, następuje standardowy siedmiodniowy okres debaty, do której każdy może dołączyć. Jednak nikt nie dołącza do tego podziału.

Standardową procedurą jest samodzielne wywołanie podziału, utworzenie podrzędnego DAO, a następnie stworzenie propozycji, która odsyła cały ether z powrotem do ich portfela. Pozwala to użytkownikowi na odzyskanie swoich pieniędzy zabezpieczonych tokenami DAO. Minęło siedem dni i haker może teraz wywołać funkcję podziału. Nikt niczego nie podejrzewa.

Jednak po wywołaniu funkcji podziału społeczność zdaje sobie sprawę z czegoś niepokojącego. Ether jest wyprowadzany z DAO w tempie ośmiu milionów dolarów na godzinę. Społeczność gorączkowo próbuje dowiedzieć się, co się dzieje. Wygląda na to, że atakujący rekurencyjnie wywołuje funkcję podziału — w kółko, setki razy.

Pamiętasz tę poprawkę błędu sprzed czterech dni? Szkoda, że nie ma możliwości edycji kodu inteligentnego kontraktu po jego wdrożeniu, więc ta poprawka istniała tylko na GitHubie jako część The DAO 1.1, zupełnie innego DAO, które było w trakcie tworzenia. Ta drobna poprawka mogła zapobiec całej sytuacji — jedyne, co robiła, to zamiana dwóch linii kodu, tak aby saldo było aktualizowane przed faktyczną wypłatą.

Ale bez tej poprawki każdy mógł wielokrotnie wywoływać funkcję wypłaty etheru, zanim kontrakt zaktualizował jego saldo. To jak bankomat, który nie zmienia twojego salda, dopóki nie wyda ci pieniędzy. „Czy mogę wypłacić dziesięć dolarów? Czekaj, zanim to zrobisz, czy mogę wypłacić dziesięć dolarów? Czekaj, zanim to zrobisz…”

#### Grupa Robin Hooda (6:55) {#the-robin-hood-group-655}

Posiadacze tokenów DAO patrzyli, jak ich inwestycje są powoli wyprowadzane z głównego DAO do podrzędnego DAO, znanego również jako mroczne DAO (dark DAO). Dodatkowo, w następstwie tych wiadomości, cena Ethereum gwałtownie spadła z 20 do 15 dolarów. Trzeba było coś zrobić, a jedynym sposobem było opróżnienie reszty środków, zanim zrobi to haker. I tak rozpoczął się wyścig z czasem o opróżnienie DAO.

Na drugim końcu świata, w swoim mieszkaniu w dzielnicy Copacabana w Rio de Janeiro, Alex Van de Sande budzi się, a jego telefon pęka w szwach od wiadomości na Skype. Odwraca się do żony i mówi: „Pamiętasz, jak opowiadałem ci o tej ogromnej, niemożliwej do zhakowania stercie pieniędzy? Właśnie została zhakowana”.

Alex skontaktował się z kilkoma innymi, nieujawnionymi programistami i utworzyli grupę, którą nazwali Robin Hood — hakerów w białych kapeluszach (white-hat), którzy mieli wyprowadzić pozostałe fundusze i zwrócić je prawowitym właścicielom. Nie mieli jednak czasu na zaproponowanie nowego podziału, ponieważ wymagałoby to siedmiodniowego okresu głosowania.

Zamiast tego skupili się na Propozycji nr 71, która miała się zakończyć za kilka godzin. Mieli dołączyć do tego podziału i użyć tego samego exploita, aby przelać wszystkie pozostałe fundusze do tego podrzędnego DAO. Minęło sześć godzin od rozpoczęcia ataku, a złodziejowi udało się ukraść 30% etheru z DAO. Ale z jakiegoś nieznanego powodu atak przestał działać. Transakcje kończyły się niepowodzeniem i wszystko dobiegło końca.

Tymczasem Alex właśnie przygotowywał się do rozpoczęcia ataku white-hat, aby zabezpieczyć pozostałe 70% funduszy. Nagle jednak stracił połączenie z internetem. Mając zaledwie 30 minut, gorączkowo dzwonił do NET, swojego brazylijskiego dostawcy internetu, ale usłyszał tylko odpowiedź zautomatyzowanego głosu: „Widzimy, że w twojej okolicy występuje problem z internetem”. Propozycja podziału dobiegła końca, a on właśnie przegapił okno na przeprowadzenie ataku Robin Hooda.

Następnego ranka Alex próbował ponownie zebrać grupę, aby zinfiltrować kolejną propozycję podziału, ale pozostali byli zajęci. „Czuliśmy się jak najgorsi hakerzy w historii. Pokrzyżował nam plany słaby internet i obowiązki rodzinne”.

#### Wyścig o opróżnienie (9:10) {#the-race-to-empty-910}

Cztery dni po początkowym ataku, DAO ponownie znalazło się pod ostrzałem. Środki uciekały powoli — po kilka etherów na rundę — ale uzbierało się już kilka tysięcy dolarów. Wydawało się, że to atakujący bada grunt. W tym momencie Robin Hood musiał coś zrobić.

Zdecydowali się zinfiltrować Podział nr 78, ponieważ zidentyfikowali kuratora propozycji, a jej czas wkrótce dobiegał końca. Skontaktowali się z kilkoma „wielorybami” (dużymi inwestorami), którzy chętnie przekazali swoje tokeny DAO, co pozwoliło zespołowi zabezpieczyć sześć milionów tokenów. Im więcej tokenów miał kontrakt Robin Hooda, tym szybciej mógł wyprowadzać ether. Atakujący przyspieszył, a dołączyli do niego inni. Ale dzięki darowiznom Robin Hood był w stanie ich wyprzedzić. Pozwoliło im to zabezpieczyć 7,2 miliona etherów — 55% środków DAO.

#### Rozwidlenie (10:08) {#the-fork-1008}

Główne DAO zostało teraz opróżnione, a wszystkie fundusze zostały rozdzielone między kilka podrzędnych DAO — dwa główne to white-hat DAO i dark DAO. Ale wszystkie pieniądze były zablokowane czasowo. Żadna propozycja nie mogła zostać zgłoszona w ramach podrzędnego DAO, dopóki nie minął 27-dniowy okres oczekiwania. A nawet po tym czasie wysłanie środków na zewnętrzny adres wymagało złożenia propozycji i odczekania dwóch tygodni. W gruncie rzeczy pozostało jeszcze 41 dni, zanim haker mógł wypłacić to, co stanowiło równowartość 5% całkowitej podaży Ethereum.

Ale haker nigdy nie miał okazji dotknąć swojego Ethereum. To, co wydarzyło się później, jest jednym z najodważniejszych i najbardziej kontrowersyjnych epizodów w historii blockchaina. Społeczność zdecydowała, że nie pozwoli hakerowi wygrać. Chcieli napisać historię na nowo, tak aby każda transakcja związana z atakiem została cofnięta, a wszyscy odzyskali swoje pieniądze. Zdecydowali się na rozwidlenie Ethereum.

Blockchain jest jak lista transakcji, która stale rośnie z każdym wydobytym blokiem. Każda transakcja jest na zawsze zakorzeniona w blockchainie. Ale jeśli ponad 50% górników wejdzie w zmowę, mogą oni fałszywie zmienić blockchain, pisząc historię na nowo w dowolny sposób. Zazwyczaj nazywa się to atakiem 51%. Ale w tym rozwidleniu nie było nic złośliwego — społeczność jedynie odzyskiwała pieniądze, które zostały jej skradzione.

#### Kod to prawo (11:48) {#code-is-law-1148}

Mimo to nie wszyscy popierali proponowane rozwidlenie. Argumentowali, że kod to prawo. W tym ujęciu atakujący był mniej hakerem, a bardziej sprytnym prawnikiem, który uważnie przeczytał warunki kontraktu. W związku z tym żadne fundusze nie zostały tak naprawdę skradzione i powinien on mieć pełne prawo do etheru z dark DAO.

Należy zauważyć, że samo Ethereum nigdy nie zostało zhakowane — wykorzystano jedynie źle napisany inteligentny kontrakt. To dwie różne rzeczy. Dodatkowo uważali oni, że rzeczy, które dzieją się na blockchainie, są niezmienne i nigdy nie powinny być modyfikowane, niezależnie od sytuacji.

Dzień po początkowym ataku, atakujący wysłał list otwarty na czacie grupowym DAO na Slacku, podpisany swoim kluczem prywatnym:

> „Do DAO i społeczności Ethereum: Uważnie zbadałem kod The DAO i prawnie przejąłem 3 miliony etherów, za co chciałbym podziękować DAO jako za nagrodę. Jestem rozczarowany tymi, którzy określają użycie tej celowej funkcji jako »kradzież«. Korzystam z tej wyraźnie zakodowanej funkcji zgodnie z warunkami inteligentnego kontraktu. Miękkie lub twarde rozwidlenie byłoby równoznaczne z konfiskatą mojego legalnego i prawowitego etheru. Takie rozwidlenie trwale i bezpowrotnie zrujnowałoby całe zaufanie nie tylko do Ethereum, ale także do dziedziny inteligentnych kontraktów i technologii blockchain. Nie miejcie złudzeń: jakiekolwiek rozwidlenie, miękkie czy twarde, jeszcze bardziej zaszkodzi Ethereum i zniszczy jego reputację oraz atrakcyjność”.

Po bliższym zbadaniu sprawy ludzie zdali sobie sprawę, że podpis był nieważny, więc ten list został napisany tylko przez kogoś, kto podawał się za atakującego.

Z drugiej strony zwolennicy argumentowali, że „kod to prawo” jest zbyt drastycznym stwierdzeniem i że to ludzie powinni mieć ostateczne słowo poprzez społeczny konsensus. Haker nie powinien czerpać zysków z exploita, ponieważ jest to etycznie złe i najprawdopodobniej nielegalne. Ale co najważniejsze, DAO było po prostu zbyt duże, by upaść. Posiadało około 15% całkowitej podaży etheru.

#### Ethereum Classic (14:34) {#ethereum-classic-1434}

W wydarzeniu, które przypominało kryzys finansowy z 2008 roku, programiści Ethereum uratowali DAO. Vitalik Buterin, twórca i główny programista Ethereum, bez ogródek naciskał na rozwidlenie. W jednym z wywiadów powiedział później: „Niektórzy użytkownicy Bitcoina postrzegają twarde rozwidlenie jako w pewnym sensie naruszenie ich najbardziej fundamentalnych wartości. Osobiście uważam, że te fundamentalne wartości, posunięte do takich skrajności, są głupie”.

Poglądy te dominowały w większości społeczności Ethereum. Kontrowersyjne głosowanie społeczności — w którym jeden ether równał się jednemu głosowi — wykazało 87% poparcia dla rozwidlenia. Tak więc na bloku 1 920 000 węzły komputerowe na całym świecie zaktualizowały swoje oprogramowanie i zaakceptowały rozwidlenie. Cały ether z DAO i podrzędnych DAO został przeniesiony do kontraktu zwrotnego.

Ale na tym się nie kończy. Oryginalny blockchain Ethereum — ten z atakiem na DAO — działał dalej. W rzeczywistości rósł. Górnicy, którzy sprzeciwiali się rozwidleniu, nadal wydobywali bloki, a transakcje wciąż były realizowane. Następnego dnia giełda Poloniex wprowadziła monetę na giełdę i zaczęła być notowana po 2 dolary za sztukę. Ten łańcuch stał się znany jako Ethereum Classic — oryginalny, niezmieniony blockchain.

Jeśli posiadałeś ether przed rozwidleniem, miałbyś teraz jedno Ethereum i jedno Ethereum Classic. Jeśli posiadałeś jeden ether w DAO, mógłbyś wypłacić jedno Ethereum z kontraktu zwrotnego. A jeśli właśnie zhakowałeś DAO, zbiłbyś całkiem niezłą fortunę w Ethereum Classic — około siedmiu milionów dolarów.

#### Dziedzictwo DAO (16:14) {#legacy-of-the-dao-1614}

Początkowo Ethereum Classic zyskało na popularności jako alternatywa, z silną społecznością fundamentalistów blockchaina, którzy nie zgadzali się na ratowanie projektu. Ale od tego czasu Ethereum Classic nie zdołało zdobyć szerszego uznania i tak naprawdę istnieje tylko jako idea o niewielkiej użyteczności. Podczas gdy Ethereum jest domem dla tysięcy protokołów, Ethereum Classic ma tylko kilka podstawowych. Jasne jest, że rozwidlenie wygrało.

Dwa miesiące później Robin Hood przetransferował 2,9 miliona swojego Ethereum Classic na Poloniex i sprzedał wszystko za Ethereum w próbie zrzucenia ceny. 14% zostało pomyślnie przekonwertowane, ale 86% zostało zamrożone przez Poloniex i zwrócone grupie. Robin Hood założył kontrakt zwrotny w sieci Ethereum Classic dla użytkowników dotkniętych atakiem na DAO.

Jeśli chodzi o hakera, odszedł on z 3,6 miliona Ethereum Classic — wartymi dziś 150 milionów dolarów. Ale gdyby nie było rozwidlenia, te 3,6 miliona Ethereum byłoby dziś warte ponad siedem miliardów dolarów.

#### Trwały wpływ DAO (17:26) {#the-daos-lasting-impact-1726}

Warto zauważyć, że DAO jest obecnie powszechnie określane jako Genesis DAO, aby uniknąć nieporozumień, ponieważ było to pierwsze DAO, ale zdecydowanie nie ostatnie. Pomimo początkowych niepowodzeń, DAO stają się tylko coraz bardziej popularne. MakerDAO zarządza stablecoinem DAI, a protokoły zdecentralizowanych finansów (DeFi), takie jak Uniswap ze swoim tokenem UNI, zazwyczaj posiadają DAO do zarządzania. Wszystkie te DAO czerpią z doświadczeń wcześniejszych projektów, aby tworzyć jeszcze bardziej wszechstronne i odnoszące sukcesy organizacje.

Ale Genesis DAO było pierwszym tego rodzaju projektem, stworzonym jako eksperyment — i to drogi — kontrolującym w szczytowym momencie 250 milionów dolarów, czyli 15% całkowitej podaży Ethereum. Christoph Jentzsch, główny programista, spodziewał się zebrać tylko pięć milionów dolarów i później powiedział, że żałuje, iż nie wprowadził limitu. Jak na tak duży eksperyment, było na to o wiele za wcześnie i z pewnością był on zbyt duży, by upaść.

Tworzenie inteligentnego kontraktu jest jak projektowanie autonomicznego samochodu — to ogromna odpowiedzialność wymagająca szeroko zakrojonych testów, aby uniknąć wypadków. Nawet przy tej nowej ostrożności, protokoły DeFi wciąż padają ofiarą ataków hakerskich na kwoty przekraczające 50 milionów dolarów, niektóre nawet po audytach przeprowadzonych przez profesjonalne firmy audytorskie. Ale od czasu ataku na DAO nie było już więcej akcji ratunkowych. Społeczność Ethereum jest teraz silniejsza i gotowa do przejścia do jeszcze większych i bardziej ambitnych projektów, budując następną generację aplikacji cyfrowych.