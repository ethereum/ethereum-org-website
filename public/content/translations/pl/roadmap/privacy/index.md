---
title: "Mapa drogowa prywatności dla Ethereum"
description: "Ethereum pracuje nad tym, aby prywatność stała się pierwszorzędną cechą sieci poprzez aktualizacje, które chronią prywatność transakcji, zabezpieczają dostęp do danych użytkowników i umożliwiają weryfikowalną, ale prywatną tożsamość."
lang: pl
image: /images/roadmap/roadmap-security.png
alt: Mapa drogowa Ethereum
template: roadmap
---

**Prywatność w Ethereum zmienia się z opcjonalnego dodatku w domyślny standard na poziomie sieci.** Proponowane mapy drogowe prywatności Ethereum celują w konkretne, wrażliwe punkty styku, w których obecnie mogą wyciekać dane użytkowników. Badania prowadzone w całym ekosystemie mają na celu uczynienie z Ethereum platformy, w której prywatność jest strukturalna, a nie opcjonalna.

Badacze z Fundacji Ethereum [zebrali trzy główne priorytety mapy drogowej](https://pse.dev/blog/pse-roadmap-2025) z rozproszonych badań w całym ekosystemie:

- **Prywatne odczyty** - odpytywanie i przeglądanie Ethereum bez ujawniania, do jakich adresów, kontraktów lub danych użytkownik uzyskuje dostęp. Ochrona odczytów zapobiega gromadzeniu danych jeszcze przed podpisaniem transakcji.
- **Prywatne zapisy** - wysyłanie transakcji odpornych na cenzurę i wyciek metadanych, od włączenia do mempoola po ostateczny rozrachunek. Ochrona zapisów gwarantuje, że prywatne transakcje nie zostaną ocenzurowane ani powiązane z ich źródłem.
- **Prywatne dowodzenie** - weryfikacja tożsamości, uprawnień lub danych bez ujawniania podstawowych danych osobowych, przy użyciu wydajnych dowodów z wiedzą zerową. Prywatne dowodzenie pozwala użytkownikom uczestniczyć w sieci, decydując się na ujawnienie tylko niezbędnego minimum informacji (selektywne ujawnianie).

Razem te trzy obszary tworzą kompleksowy model prywatności. Celem jest **suwerenność obliczeniowa**, zapewniająca, że Ethereum jest platformą, na której osoby fizyczne i instytucje mogą wchodzić w interakcje, koordynować działania i przeprowadzać transakcje na całym świecie bez niezatwierdzonego gromadzenia danych, inwigilacji czy scentralizowanej cenzury.

**Dlaczego prywatność jest ważna?** Dowiedz się więcej o prywatności, o tym, jak chronić swoją prywatność w sieci i jak chronić swoją prywatność w Ethereum już dziś.

<ButtonLink variant="outline" href="/privacy/">Więcej o prywatności</ButtonLink>

## Prywatne odczyty chronią zapytania użytkowników i dane dostępowe {#private-reads}

Zanim transakcja zostanie w ogóle podpisana, użytkownik musi odczytać dane z blockchaina. Aby sprawdzić saldo, oszacować gaz lub zweryfikować stan inteligentnego kontraktu, oprogramowanie portfela wysyła zapytania do dostawcy węzła. Te standardowe zapytania **Remote Procedure Call (RPC)** ujawniają ogromną ilość metadanych.

Dostawca węzła może zobaczyć adres IP użytkownika, odcisk palca urządzenia, konkretne odpytywane adresy oraz czas i częstotliwość jego aktywności. Nawet jeśli użytkownik wyśle następnie prywatną transakcję, dostawca infrastruktury ma już dostęp do szczegółowej mapy jego intencji.

<VideoWatch slug="ethereum-privacy-stack-andy-guzman" />

Wyciek metadanych w warstwie dostępu jest jednym z najbardziej uporczywych problemów związanych z prywatnością we wszystkich systemach blockchain. Ethereum ma na celu rozwiązanie problemu wycieku metadanych poprzez prywatność źródła (ukrywanie, kto pytał), prywatność treści (ukrywanie, o co pytano) oraz weryfikację poprawności zwróconych informacji.

**Prywatność źródła** wykorzystuje [anonimowe RPC](https://privreads.ethereum.foundation/feed/anon-rpc/) i rozwiązania sieci anonimowych do ukrycia podmiotu żądającego danych, **prywatność treści** wykorzystuje taktyki takie jak prywatne pobieranie informacji i [oblivious RAM](https://en.wikipedia.org/wiki/Oblivious_RAM) do ukrycia odpytywanych danych, podczas gdy **weryfikacja poprawności** wykorzystuje lekkie klienty, aby udowodnić, że zwrócone dane są dokładne.

Kryptograficznym elementem budulcowym prywatności treści jest [**prywatne pobieranie informacji (PIR)**](https://en.wikipedia.org/wiki/Private_information_retrieval), technika kryptograficzna, która pozwala klientowi na odpytanie bazy danych i pobranie określonej informacji bez ujawniania serwerowi, do którego elementu uzyskano dostęp. Serwer przetwarza żądanie w ciemno i zwraca zaszyfrowaną odpowiedź, którą może odszyfrować tylko odpytujący portfel.

PIR działa w warstwie dostępu, znajdując się między oprogramowaniem portfela a dostawcami węzłów. W miarę dojrzewania implementacji PIR będą one integrowane z zestawami programistycznymi (SDK) portfeli i dostawcami infrastruktury, umożliwiając użytkownikom odpytywanie sieci bez ujawniania swojej aktywności scentralizowanym pośrednikom.

Prywatne odczyty zmniejszają również narażenie na wyprzedzanie transakcji i ataki polegające na manipulowaniu kolejnością transakcji. Jeśli dostawca infrastruktury nie widzi, o jaki inteligentny kontrakt lub adres pyta użytkownik, nie może sprzedać tej informacji podmiotom, które czerpią zyski z przewidywania aktywności onchain.

## Prywatne zapisy zapobiegają cenzurze i wyciekom transakcji {#private-writes}

Po wysłaniu transakcji przechodzi ona przez infrastrukturę sieciową, która może ją obserwować lub zablokować, zanim zostanie zapisana onchain. To właśnie w tym miejscu wiele protokołów prywatności zawodzi w praktyce. Duzi, scentralizowani budowniczowie bloków monitorują mempool i mogą po cichu odsuwać na boczny tor lub cenzurować transakcje pochodzące z narzędzi ochrony prywatności. Nawet jeśli podstawowa kryptografia jest solidna, transakcja, która nigdy nie zostanie włączona do bloku, nie zapewnia żadnej ochrony.

Dwie aktualizacje na poziomie protokołu wspólnie rozwiązują ten problem:

[**EIP-8141 (Transakcje ramowe)**](https://eips.ethereum.org/EIPS/eip-8141) wprowadza nowy typ transakcji, który dzieli transakcje na segmenty służące do walidacji podpisu i autoryzacji opłat oraz na właściwe instrukcje transakcji. Transakcje ramowe pozwalają [inteligentnym kontom](/roadmap/account-abstraction/) na definiowanie własnych schematów podpisów i korzystanie z zewnętrznych kontraktów do pokrywania opłat za gaz. Surowe zasady piaskownicy (sandboxing) w mempoolu zapobiegają otwarciu sieci na ataki typu odmowa usługi (DoS) przez te transakcje.

Transakcje ramowe są rozważane w kontekście aktualizacji [Hegotá](https://forkcast.org/upgrade/hegota/) w Ethereum, kolejnej aktualizacji sieci po nadchodzącej aktualizacji [Glamsterdam](/roadmap/glamsterdam/). Ta sama aktualizacja pozwoli również inteligentnym kontom na przyjęcie [podpisów odpornych na komputery kwantowe](/roadmap/security/quantum-resistance/) przed zakończeniem pełnego przejścia sieci na erę postkwantową.

<ExpandableCard title="Jak transakcje ramowe (EIP-8141) zapewniają prywatność?" eventCategory="/roadmap/privacy" eventName="clicked how do frame transactions enable privacy?">

Transakcje ramowe pozwalają kontom na wybór własnej metody weryfikacji podpisu. W kontekście prywatności oznacza to, że użytkownicy mogą przyjąć schematy podpisów chroniące prywatność bez czekania na migrację na dużą skalę w całej sieci. Transakcje ramowe umożliwiają również abstrakcję opłat za gaz, pozwalając narzędziom ochrony prywatności na pokrycie kosztów transakcji bez ujawniania adresów użytkowników onchain.

</ExpandableCard>

[**EIP-7805 (Listy włączeń wymuszane przez wybór rozwidlenia, ang. Fork-Choice Enforced Inclusion Lists - FOCIL)**](https://eips.ethereum.org/EIPS/eip-7805) zapewnia mechanizm egzekwowania prywatnych zapisów. Proponujący bloki są zobowiązani przez zasady konsensusu do włączania do swoich bloków transakcji ze zagregowanych lokalnych list włączeń, które zbierają transakcje z wielu źródeł. Jeśli budowniczy bloków spróbuje ocenzurować transakcję, która pojawiła się na listach włączeń, poświadczające węzły całkowicie odrzucą proponowany blok. FOCIL jest obecnie rozważany w kontekście aktualizacji [Hegotá](https://forkcast.org/upgrade/hegota/).

Transakcje ramowe dają użytkownikom elastyczność w budowaniu transakcji chroniących prywatność za pomocą niestandardowych schematów podpisów, podczas gdy FOCIL gwarantuje, że transakcje te nie mogą być selektywnie cenzurowane po wejściu do mempoola. Razem rozwiązują one dwa różne punkty awarii: jeden umożliwia format prywatnych transakcji, drugi gwarantuje ich włączenie. Żaden centralny podmiot nie może zablokować prawidłowego prywatnego transferu.

<VideoWatch slug="eip-7805-focil-explained" />

Drugim wrażliwym punktem dla prywatności użytkowników jest sposób, w jaki Ethereum śledzi kolejność transakcji, zwany systemem sekwencyjnych nonce. W standardowym modelu konta Ethereum każde konto używa pojedynczego, liniowo rosnącego licznika. Jeśli jedna prywatna transakcja zostanie opóźniona w mempoolu, wszystkie kolejne transakcje z tego konta utkną za nią. Sekwencja nonce pozwala również obserwatorom sieci powiązać wiele transakcji z tym samym kontem źródłowym, podważając prywatność.

[**EIP-8250 (Kluczowane nonce dla transakcji ramowych)**](https://eips.ethereum.org/EIPS/eip-8250), obecnie rozważany dla aktualizacji Hegotá, rozwiązuje ten problem, pozwalając pojedynczemu kontu na jednoczesne zarządzanie wieloma równoległymi sekwencjami transakcji. Użytkownicy mogą wykonywać wiele prywatnych transakcji w różnych kontekstach w tym samym czasie, a obserwatorzy nie mogą już wiarygodnie korelować odrębnych działań z tym samym kontem nadrzędnym.

### Prywatne płatności i transfer wartości {#private-payments}

Poza routingiem transakcji i zarządzaniem nonce, ochrona zapisów wymaga ukrycia tożsamości i aktywów zaangażowanych w transfer. Nawet jeśli użytkownik wysyła zapytania prywatnie i rozgłasza transakcję bez cenzury, dane transakcji zapisane onchain pozostają publicznie widoczne. Każdy może zobaczyć, kto, ile i komu wysłał, a firmy zajmujące się analizą łańcucha agregują te dane w przeszukiwalne profile, które utrzymują się w nieskończoność.

[**EIP-8182 (Prywatne transfery ETH i ERC-20)**](https://eips.ethereum.org/EIPS/eip-8182), zaproponowany dla aktualizacji Hegotá, wprowadza natywną, współdzieloną osłoniętą pulę bezpośrednio do protokołu Ethereum dla transferów ETH i ERC-20. Pule prywatności wykorzystują kryptograficzne miksowanie do zerwania powiązania między depozytem a wypłatą, ale obecnie są dostępne tylko za pośrednictwem aplikacji chroniących prywatność, portfeli i sieci warstwy 2 (L2).

Historycznie, rozwiązania prywatności na poziomie aplikacji rozbijały płynność i cierpiały z powodu małych zbiorów anonimowości. EIP-8182 konsoliduje osłonięte transfery na poziomie protokołu, pozwalając użytkownikom na kierowanie środków za pomocą ukrytych kluczy dostarczania bez konieczności stosowania wyspecjalizowanych architektur portfeli lub interakcji z pofragmentowanymi, opcjonalnymi aplikacjami.

Inne podejścia badawcze rozwijane w celu zapewnienia prywatności transakcji obejmują dowody, które pozwalają użytkownikom wykazać, że kwoty transakcji są prawidłowe bez ujawniania rzeczywistych wartości (takie jak bulletproofs i dowody zakresu). Badania nad **poufnymi transakcjami** mają na celu ukrycie kwot, przy jednoczesnym umożliwieniu sieci weryfikacji, że żadna wartość nie została stworzona ani zniszczona.

Te rozwiązania w warstwie płatności opierają się na infrastrukturze opisanej wcześniej w tej sekcji. PIR chroni fazę przygotowawczą, transakcje ramowe i FOCIL zapewniają, że prywatne płatności docierają do mempoola bez cenzury, a zkVM umożliwiają złożoną kryptografię wymaganą do ukrywania wartości przy jednoczesnym zachowaniu gwarancji bezpieczeństwa sieci.

## Prywatne dowodzenie i ochrona tożsamości {#private-proving}

Prywatność nie polega na całkowitym ukryciu. Chodzi o **selektywne ujawnianie**, czyli wybór, jakie informacje ujawnić, komu i na jakich warunkach. Ethereum wspiera selektywne ujawnianie poprzez [**dowody z wiedzą zerową (ZKP)**](/zero-knowledge-proofs/), które pozwalają jednej ze stron udowodnić, że dane stwierdzenie jest prawdziwe, bez ujawniania podstawowych danych. Na przykład udowodnienie obywatelstwa bez ujawniania danych paszportowych lub udowodnienie przekroczenia progu wiekowego bez ujawniania dokładnej daty urodzenia.

Prywatne dowodzenie łączy się z mapą drogową prywatności, umożliwiając weryfikowalną tożsamość bez ujawniania danych na poziomie protokołu. Podczas gdy prywatne odczyty i zapisy chronią metadane transakcji, prywatne dowodzenie zapewnia, że kontrole tożsamości i uprawnień wymagane do uczestnictwa w świecie rzeczywistym nie wymagają przekazywania danych osobowych do scentralizowanych systemów weryfikacji.

Na mapie drogowej prywatności Ethereum prywatne dowodzenie jest wspierane przez uzupełniające się ścieżki infrastruktury: jedną w warstwie wykonawczej, aby umożliwić prywatne obliczenia na poziomie protokołu, i drugą w warstwie dostępu, która sprawia, że prywatne obliczenia są praktyczne na urządzeniach konsumenckich.

**Maszyny wirtualne z wiedzą zerową (zkVM)** pozwalają inteligentnym kontraktom na uruchamianie ich logiki i generowanie kryptograficznego dowodu, że praca została wykonana poprawnie. Kiedy ten dowód jest prawdziwie z wiedzą zerową, nie ujawnia niczego na temat danych wejściowych, stanu pośredniego ani danych wyjściowych, odblokowując prywatne obliczenia na poziomie sieci.

Nazwa "zkVM" niesie ze sobą pewien niuans; większość systemów nazywanych dziś zkVM jest raczej zwięzła (succinct) niż z wiedzą zerową. Ich dowody są małe i szybkie do weryfikacji, ale niekoniecznie ukrywają dane użyte do ich wygenerowania. Obecnie tylko garstka systemów dowodzenia zapewnia właściwość ukrywania, od której zależą aplikacje chroniące prywatność. [Benchmarki dowodzenia po stronie klienta (Client-Side Proving)](https://ethproofs.org/csp-benchmarks) śledzą, które zkVM zostały przeanalizowane pod kątem rzeczywistej wiedzy zerowej w ich właściwościach systemowych. Wypełnienie tej luki jest częścią prac nad prywatnym dowodzeniem w ramach mapy drogowej.

Transakcje ramowe (EIP-8141) są również powiązane z wdrażaniem zkVM. Mogą one wykorzystywać niestandardowe schematy weryfikacji do przesyłania przejść stanu zweryfikowanych dowodem, pozwalając aplikacjom na oferowanie prywatnych środowisk wykonawczych i przesyłanie do publicznej sieci Ethereum kryptograficznego dowodu, że działanie zostało wykonane poprawnie, bez ujawniania samych danych transakcji.

Dowody z wiedzą zerową są doskonałe do pozwalania jednostkom na udowodnienie, że ich dane są ważne, przy jednoczesnym zachowaniu ich prywatności, ale nie mogą łatwo zarządzać inteligentnymi kontraktami, w których wielu użytkowników musi wchodzić w interakcje ze wspólną pulą tajnych danych w tym samym czasie.

Aby wypełnić tę lukę, mapa drogowa Ethereum uwzględnia **w pełni homomorficzne szyfrowanie (FHE)**. FHE pozwala inteligentnym kontraktom na przeprowadzanie obliczeń bezpośrednio na zaszyfrowanych danych bez konieczności ich odszyfrowywania lub ujawniania podstawowych informacji. Integracja bloków konstrukcyjnych FHE i wyspecjalizowanych koprocesorów kryptograficznych z Ethereum jest niezbędna dla zdecentralizowanych aplikacji, które opierają się na wspólnym "ukrytym stanie", takich jak prywatni zautomatyzowani animatorzy rynku (AMM), poufne pule pożyczkowe lub aukcje z ukrytymi ofertami, w których dane wejściowe wszystkich uczestników muszą wchodzić w interakcje, pozostając całkowicie tajne.

**Dowodzenie po stronie klienta** sprawia, że generowanie tych dowodów prywatności jest praktyczne na urządzeniach codziennego użytku. Projekt Client-Side Proving utrzymuje publiczny zestaw benchmarków porównujący systemy dowodzenia i zkVM na sprzęcie konsumenckim, publikując wyniki na stronie [ethproofs.org](https://ethproofs.org). Badania techniczne mają na celu stworzenie przejrzystych, [postkwantowych](/roadmap/security/quantum-resistance/) dowodów z bezpośrednią weryfikacją onchain, dzięki czemu prywatne obliczenia będą szybsze, łatwiejsze do bezpośredniej weryfikacji w sieci Ethereum i opłacalne na urządzeniach mobilnych.

[**Inicjatywa zkID**](https://pse.dev/projects/zk-id) stworzyła infrastrukturę open-source zgodną z globalnymi ramami tożsamości, w tym z Europejskim Portfelem Tożsamości Cyfrowej (EUDI). System Open Anonymous Credentials (OpenAC) zapewnia brak możliwości powiązania wydanych poświadczeń, gwarantując, że wiele dowodów wygenerowanych przez tego samego użytkownika na różnych platformach nie może zostać skorelowanych z jednym profilem.

W obszarze zarządzania protokół [**Minimal Anti-Collusion Infrastructure (MACI)**](https://maci.pse.dev/) zapewnia **brak pokwitowań (receipt-freeness)**, co sprawia, że kryptograficznie niemożliwe jest udowodnienie, jak głosowało dane konto. Ponieważ głosujący nie mogą przedstawić pokwitowania pokazującego ich wybór, kupowanie głosów i przymus tracą swoją zachętę ekonomiczną. MACI zabezpiecza rzeczywiste decyzje o finansowaniu od 2020 roku za pośrednictwem [clr.fund](https://clr.fund/), który rozdzielił miliony dolarów w ramach finansowania kwadratowego na dobra publiczne Ethereum.

Głosowanie chroniące prywatność już teraz chroni prawdziwych wyborców w sytuacjach o wysokiej stawce. [Freedom Tool od Rarimo](https://docs.rarimo.com/freedom-tool/) wykorzystuje weryfikację paszportu z wiedzą zerową, aby pozwolić obywatelom udowodnić, że są uprawnieni do głosowania, bez ujawniania, kim są. Narzędzie to zasilało anonimowe wybory cieni i sondaże opozycyjne w krajach takich jak Rosja (głosowanie opozycji [Russia2024](https://rarimo.medium.com/russian-opposition-use-rarimos-freedom-tool-to-launch-surveillance-free-voting-app-0d73ebea5e8a)), Gruzja (aplikacja do głosowania United Space) i Iran (projekt Iranians Vote), gdzie bezpieczeństwo wyborców zależy od kryptograficznej tajności kart do głosowania.

Prywatne dowodzenie umożliwia również **prywatność uwzględniającą zgodność z przepisami (compliance-aware privacy)**. Rozwiązania takie jak pule prywatności swobodnie przyjmują depozyty, ale przed wypłatą wymagają od użytkowników wygenerowania dowodów z wiedzą zerową, że ich środki nie krzyżują się ze znanymi złośliwymi adresami. Programowalny model zgodności oddziela akt osłaniania transakcji od aktu wykazania zgodności z przepisami, pozwalając zwykłym użytkownikom na prywatne przeprowadzanie transakcji przy jednoczesnym spełnieniu wymagań instytucjonalnych.

zkEVM mogą wykonywać te kontrole zgodności prywatnie, weryfikując status regulacyjny bez ujawniania szczegółów transakcji lub tożsamości użytkowników.

## Obecny postęp mapy drogowej {#current-progress}

Kierunek rozwoju prywatności w Ethereum jest kształtowany przez porozumienie w całym ekosystemie, a nie przez jedną organizację. Mapa drogowa [strawmap.org](https://strawmap.org/) gromadzi proponowane aktualizacje z całego ekosystemu, aby śledzić i proponować obszary, w których społeczność osiągnęła konsensus. Badacze z Fundacji Ethereum pomagają zarządzać równoległą mapą drogową badań i rozwoju w całym ekosystemie badawczym, koncentrując się na rozwijaniu narzędzi prywatności w warstwie dostępu, infrastruktury tożsamości i systemów uwzględniających zgodność z przepisami. Oba przykłady odzwierciedlają ten sam podstawowy priorytet: uczynienie prywatności w Ethereum strukturalną, a nie opcjonalną.

Badania i rozwój nad prywatnością w Ethereum obejmują dziesiątki zespołów w całym ekosystemie. Prace postępują nad aktualizacjami protokołu, rozwiązaniami w warstwie dostępu, infrastrukturą tożsamości i narzędziami uwzględniającymi zgodność z przepisami.

**Aktualizacje protokołu**: EIP-8141 (Transakcje ramowe), EIP-7805 (FOCIL), EIP-8250 (Kluczowane nonce) i EIP-8182 (Osłonięte pule na poziomie protokołu) są w fazie aktywnego rozwoju i są rozważane dla aktualizacji [Hegotá](https://forkcast.org/upgrade/hegota/), kolejnej aktualizacji sieci po [Glamsterdam](/roadmap/glamsterdam/). EIP-8025 (opcjonalne dowody wykonania) i drzewa Verkle są również planowane dla Hegotá, stanowiąc fundament dla prywatnych obliczeń opartych na zkEVM w sieci głównej Ethereum. Równolegle dojrzewają badania nad koprocesorami FHE, aby umożliwić wielostronne zaszyfrowane inteligentne kontrakty.

**Warstwa dostępu**: Badania nad PIR postępują, a aktywne implementacje są testowane przez zespoły infrastrukturalne. Zestaw SDK portfela Kohaku jest w fazie rozwoju jako referencyjne rozwiązanie open-source dla portfeli chroniących prywatność.

**Dowodzenie po stronie klienta**: Zespoły aktywnie wykorzystują wyniki testów opartych na benchmarkach, aby zoptymalizować działanie dowodów z wiedzą zerową na standardowych urządzeniach. Projekty takie jak Spartan-WHIR rozwijają bezpieczne, odporne na komputery kwantowe dowody, które można łatwo zweryfikować bezpośrednio w sieci Ethereum. Inicjatywy badawcze takie jak leanVM dostarczają lekką zkVM zaprojektowaną do łączenia wielu podpisów kryptograficznych, zmniejszając rozmiar danych podpisów odpornych na komputery kwantowe 250-krotnie, aby zaoszczędzić miejsce i obniżyć koszty sieciowe.

**Tożsamość i dowodzenie**: Inicjatywa zkID tworzy zoptymalizowane schematy dowodzenia dla urządzeń mobilnych. MACI nadal zabezpiecza rundy finansowania kwadratowego i zarządzanie DAO, narzędzia takie jak Freedom Tool od Rarimo wprowadzają głosowanie z wiedzą zerową do rzeczywistych wyborów, a trwające badania kontynuują prace nad standardami tożsamości chroniącymi prywatność.

Żadna część tej pracy nie jest jeszcze ukończona. Harmonogramy to cele, a nie gwarancje, a [proces zarządzania oparty na konsensusie](/governance/) w Ethereum oznacza, że mapa drogowa może ulec zmianie w miarę postępu badań. Jednak zakres aktywnego rozwoju i liczba zespołów pracujących nad prywatnością stanowią wyraźne zobowiązanie do uczynienia Ethereum domyślnie odpornym na ekstrakcję.

## Dalsza lektura {#further-reading}

- [Prywatność w Ethereum](/privacy/)
- [Mapa drogowa PSE: 2025 i później](https://pse.dev/blog/pse-roadmap-2025)
- [Mandat Fundacji Ethereum](/foundation/mandate/)
- [strawmap.org](https://strawmap.org/)
- [Dowody z wiedzą zerową](/zero-knowledge-proofs/)
- [Zdecentralizowana tożsamość](/decentralized-identity/)
- [Mapa drogowa Kohaku](https://notes.ethereum.org/@niard/KohakuRoadmap)
- [Benchmarki dowodzenia po stronie klienta](https://ethproofs.org/csp-benchmarks)
- [zkEVM w liczbach](https://zkevm.ethereum.foundation/)