---
title: "Kod to prawo? Inteligentne kontrakty wyjaśnione"
description: "Odkrywanie koncepcji „kod to prawo” przez pryzmat inteligentnych kontraktów w Ethereum i DeFi. Ten film omawia, czym są inteligentne kontrakty, jak działają i filozoficzne pytanie, czy kod powinien być ostatecznym arbitrem."
lang: pl
youtubeId: "pWGLtjG-F5c"
uploadDate: 2020-11-18
duration: "0:15:25"
educationLevel: beginner
topic:
  - "smart-contracts"
format: explainer
author: Finematics
breadcrumb: "Inteligentne kontrakty"
---

Film wyjaśniający autorstwa **Finematics**, który bada koncepcję „kod to prawo” przez pryzmat inteligentnych kontraktów w Ethereum, omawiając, czym są inteligentne kontrakty, jak działają, jakie mają przewagi nad tradycyjnymi kontraktami i dlaczego są podstawowymi elementami budulcowymi zdecentralizowanych finansów (DeFi).

*Ten transkrypt jest dostępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=pWGLtjG-F5c) opublikowanego przez Finematics. Został on lekko zredagowany w celu poprawy czytelności.*

#### Wprowadzenie (0:00) {#introduction-000}

Czy słyszałeś kiedyś wyrażenie „kod to prawo”, w którym technologia jest używana do egzekwowania zasad? W takim przypadku, czy w ogóle potrzebujemy prawników? A może możemy żyć w pełni zautomatyzowanym świecie, w którym kod dyktuje, co możemy, a czego nie możemy robić. Biorąc pod uwagę obecny rozwój inteligentnych kontraktów, ten futurystyczny scenariusz może być bliżej, niż nam się wydaje.

Inteligentny kontrakt to fragment kodu, który może być wykonywany automatycznie i w sposób deterministyczny. Kod inteligentnego kontraktu jest zazwyczaj przechowywany i wykonywany na blockchainie, aby był niewymagający zaufania i bezpieczny. Inteligentne kontrakty mają również możliwość odbierania, przechowywania i wysyłania środków — a nawet wywoływania innych inteligentnych kontraktów. Opierają się na semantyce „jeśli-to” (if-then), co sprawia, że są dość łatwe do zaprogramowania.

Inteligentne kontrakty mają na celu wyeliminowanie czynnika ludzkiego z procesu podejmowania decyzji. Czynnik ludzki często okazuje się najbardziej podatnym na błędy i zawodnym elementem standardowych, tradycyjnych kontraktów.

Automat z napojami bardzo często pojawia się jako dobra analogia do inteligentnego kontraktu, ponieważ ma z nim pewne podobieństwa. Typowy automat jest zaprogramowany w sposób, który pozwala na określone działania i przejścia stanów w oparciu o dane wejściowe. Działa również w pełni deterministyczny sposób. Na przykład, jeśli chcesz kupić puszkę coli, która kosztuje dwa dolary, a masz tylko jednego dolara, bez względu na to, ile razy spróbujesz, nie będziesz w stanie dostać napoju. Z drugiej strony, jeśli wrzucisz trzy dolary, maszyna wyda ci puszkę coli i odpowiednią resztę. Nawet wydawana reszta jest dobierana w z góry określony i zaprogramowany sposób w oparciu o to, jakie monety są dostępne i jakich monet maszyna chce się pozbyć w pierwszej kolejności.

Inteligentny kontrakt może opierać się wyłącznie na informacjach dostępnych na blockchainie — na przykład: „jeśli dasz mi dziesięć tokenów A, dam ci dziesięć tokenów B”. Może też opierać się na zewnętrznym źródle danych, na przykład na cenie ETH lub S&P 500. Ten drugi przykład sprawia, że inteligentne kontrakty są trudniejsze w realizacji, ponieważ muszą ufać danym ze świata rzeczywistego. Wymagane zaufanie można zminimalizować, korzystając z usług wyroczni, ale nawet wyroczniom trzeba ufać. Istnieje już kilka projektów, które poprzez zastosowanie odpowiednich zachęt sprawiają, że wyrocznie z większym prawdopodobieństwem dostarczają poprawne dane. Chainlink to projekt, który wyraźnie wyróżnia się w tej kategorii.

#### Inteligentne kontrakty Ethereum (3:09) {#ethereum-smart-contracts-309}

Ethereum to blockchain, który obsługuje inteligentne kontrakty i umożliwia programiście wdrażanie własnych inteligentnych kontraktów. Inteligentny kontrakt może być napisany w języku programowania o nazwie Solidity, który został stworzony specjalnie w tym celu. W Ethereum wszystkie wdrożone inteligentne kontrakty są niezmienne — oznacza to, że po wdrożeniu nie można ich modyfikować, co stwarza pewne ryzyko, które omówimy później.

Inteligentne kontrakty w Ethereum są również zdecentralizowane, co oznacza, że nie ma jednej maszyny kontrolującej kontrakt. W rzeczywistości wszystkie węzły w sieci Ethereum przechowują ten sam kontrakt z dokładnie tym samym stanem. Chociaż Ethereum jest obecnie najpopularniejszą platformą inteligentnych kontraktów ogólnego przeznaczenia, nie jest jedyną i ma kilku konkurentów, w tym Cardano, Tezos, EOS i Tron — ale nie wszystkie z nich mają te same cechy.

#### Definicja inteligentnego kontraktu (4:23) {#smart-contract-definition-423}

Termin „inteligentny kontrakt” został ukuty przez znanego kryptografa Nicka Szabo na początku lat 90. Nazwa ta, choć nie jest najbardziej oczywista, przyjęła się i jest powszechnie używana, zwłaszcza w branży blockchain. Aby dostrzec korzyści płynące z inteligentnych kontraktów, porównajmy hipotetyczny inteligentny kontrakt z jego odpowiednikiem w tradycyjnej przestrzeni.

#### Przykład inteligentnego kontraktu (4:46) {#smart-contract-example-446}

Załóżmy, że chcemy napisać następujący kontrakt: jeśli Alice wyśle X tokenów A, a Bob wyśle taką samą liczbę tokenów B, nastąpi wymiana tokenów — Alice otrzyma tokeny Boba, a Bob otrzyma tokeny Alice.

W świecie bez inteligentnych kontraktów jednym ze sposobów osiągnięcia tego bez konieczności ufania sobie nawzajem przez Alice i Boba byłoby stworzenie kontraktu depozytowego (escrow) z udziałem strony trzeciej. Strona trzecia zebrałaby tokeny A od Alice, poczekała na taką samą liczbę tokenów B od Boba i wysłała Alice i Bobowi odpowiednie tokeny po wymianie.

#### Problemy z inteligentnymi kontraktami (5:45) {#smart-contract-problems-545}

To podejście już ukazuje kilka problemów, z którymi mogą borykać się Alice i Bob:

- **Ufanie pośrednikom** — nie ma gwarancji, że strona trzecia nie ucieknie z tokenami po otrzymaniu środków od Alice i Boba. Musimy polegać na reputacji pośrednika i potencjalnym ubezpieczeniu.
- **Niedeterministyczne wyniki** — jeśli coś pójdzie nie tak, może to mieć różne skutki w zależności od wielu czynników, w tym jurysdykcji, w której potencjalna sprawa zostałaby rozstrzygnięta.

Z drugiej strony, inteligentny kontrakt działałby w pełni zautomatyzowany i deterministyczny sposób, upewniając się, że obie strony otrzymają środki, gdy spełnią początkowe kryteria zdeponowania tokenów. Inteligentne kontrakty mogą również same w sobie przechowywać środki, co jest niemożliwe do osiągnięcia w tradycyjnym świecie.

#### Szybkość (6:47) {#speed-647}

W zależności od pośrednika, Alice i Bob mogą musieć czekać nawet kilka dni lub tygodni na rozliczenie transferu tokenów. Co jeśli chcą dokonać wymiany tokenów w niedzielę, a pośrednik nie pracuje? Dzięki inteligentnym kontraktom tego rodzaju problemy znikają, a kontrakt może zostać zrealizowany w kilka sekund po spełnieniu początkowych kryteriów.

#### Koszt (7:16) {#cost-716}

Tradycyjne kontrakty są drogie nie tylko ze względu na pośrednika, który musi wypracować zysk — istnieje również ogromne ryzyko ukrytych kosztów związanych z takimi rzeczami jak arbitraż i egzekwowanie prawa, jeśli pojawią się jakiekolwiek problemy z kontraktem.

Możliwość ponownego użycia to kolejna zaleta: ten sam inteligentny kontrakt odpowiedzialny za wymianę tokenów Alice i Boba mógłby zostać użyty przez każdego innego, kto chce dokonać wymiany tokenów. W tradycyjnym świecie wszyscy musieliby podpisać oddzielne kontrakty i zapłacić odpowiednie opłaty pośrednikowi.

#### Oszustwa (7:58) {#fraud-758}

Oszustwa to kolejny ukryty koszt, tym razem dla samego pośrednika. Pośrednik musiałby upewnić się, że tokeny zarówno Alice, jak i Boba są legalne przed zainicjowaniem wymiany. Oszustwa są bardzo powszechne w tradycyjnych finansach, a większość firm ma ogromne zespoły pracujące wyłącznie nad zapobieganiem oszustwom. Dzięki inteligentnym kontraktom tokeny mogą być weryfikowane na blockchainie, a dzięki podpisom cyfrowym od razu wiadomo, czy zarówno Alice, jak i Bob są uprawnieni do wydawania swoich tokenów.

#### Przypadki użycia (8:42) {#use-cases-842}

Inteligentne kontrakty mają rosnącą liczbę przypadków użycia, począwszy od płatności i zdecentralizowanych finansów (DeFi), po łańcuchy dostaw i finansowanie społecznościowe (crowdfunding). Inteligentne kontrakty są również podstawowymi elementami budulcowymi dla zdecentralizowanych aplikacji (dapp).

#### DeFi (9:07) {#defi-907}

Zdecentralizowane finanse (DeFi) to jedna z nowych branż, która w dużej mierze opiera się na inteligentnych kontraktach. Niektóre z rzeczy, które zostały już zbudowane w tej przestrzeni, obejmują:

- **Zdecentralizowane stablecoiny** — dzięki sprytnemu wykorzystaniu inteligentnych kontraktów i pewnych zachęt, możemy stworzyć stablecoin powiązany z dolarem amerykańskim bez konieczności przechowywania dolarów w świecie rzeczywistym. MakerDAO to jeden z projektów, który to umożliwia.
- **Zautomatyzowane dostarczanie płynności** — zestaw inteligentnych kontraktów może pozwolić użytkownikom na dostarczanie płynności i wymianę tokenów w sposób całkowicie niewymagający pozwoleń i zdecentralizowany. Uniswap i Kyber Network to dobre przykłady takich protokołów.

#### Finansowanie społecznościowe i łańcuchy dostaw (10:05) {#crowdfunding-and-supply-chains-1005}

Innym przypadkiem użycia jest zapewnienie większej przejrzystości łańcuchom dostaw, gdzie do gry wkraczają protokoły takie jak OriginTrail. Jeśli chodzi o finansowanie społecznościowe, można wyobrazić sobie kontrakt, który odblokowuje środki, gdy tylko określone cele zostaną osiągnięte i zweryfikowane przez społeczność.

#### Przyszłość inteligentnych kontraktów (10:29) {#future-smart-contracts-1029}

Co by było, gdyby inteligentne kontrakty mogły ułatwić takie rzeczy jak wspólne przejazdy, wynajem mieszkań i wiele innych? A co z działalnością charytatywną? Można wyobrazić sobie w pełni zautomatyzowany fundusz, który wysyłałby pieniądze bezpośrednio do osób, które ich najbardziej potrzebują, bez żadnych pośredników. Na przykład fundusz mógłby ustalić, że dany region został uderzony przez huragan i przekierować środki do tej części świata. Na razie brzmi to dość niemożliwie, ale wszystkie niezbędne elementy, aby coś takiego się wydarzyło, są właśnie budowane.

Przypadki użycia inteligentnych kontraktów są niemal nieskończone, ale zanim będziemy mogli to wszystko osiągnąć, musimy uporać się z kilkoma problemami:

- **Błędy** — jednym z głównych zagrożeń związanych z inteligentnymi kontraktami jest coś, co prześladuje każde inne oprogramowanie. Najlepszym przykładem jest atak na The DAO, który doprowadził do utraty etheru o wartości milionów dolarów, ponieważ atakujący był w stanie wyprowadzić środki z inteligentnego kontraktu. Spowodowało to twarde rozwidlenie w Ethereum i wywołało wiele nieporozumień w społeczności Ethereum. Od czasu ataku na The DAO społeczność Ethereum opracowała wiele dodatkowych środków bezpieczeństwa. Obecnie prawie wszystkie popularne inteligentne kontrakty przeszły audyt bezpieczeństwa, często przeprowadzany przez wiele zespołów. Istnieje również trend wykorzystywania metod weryfikacji formalnej, aby udowodnić, że określone kontrakty zawsze będą zachowywać się w oczekiwany sposób.
- **Zmiany w protokole** — nawet jeśli inteligentny kontrakt nie ma żadnych błędów i został poddany audytowi, nadal nie możemy zagwarantować, że zmiana na poziomie platformy nie spowoduje problemów. Aktualizacja samego protokołu może sprawić, że niektóre inteligentne kontrakty zaczną zachowywać się inaczej, niż oczekiwano.
- **Dane ze świata rzeczywistego** — usługi wyroczni mogą zapewnić niezawodny sposób wprowadzania informacji ze świata rzeczywistego do blockchaina. Ale wyobraź sobie, że wynająłeś mieszkanie lub samochód i dokonałeś przypadkowych uszkodzeń. Skąd inteligentny kontrakt, bez jakiejkolwiek interwencji człowieka, miałby o tym wiedzieć? Istnieje wiele przykładów, w których trudno sobie wyobrazić, w jaki sposób coś nieoczekiwanego, co dzieje się w świecie rzeczywistym, może być widoczne dla inteligentnego kontraktu.

Oprócz powyższych, istnieją również ryzyka związane z regulacjami i podatkami, ale wszystkie one mogą ostatecznie zostać rozwiązane.

#### Czy możemy zastąpić prawników? (13:58) {#can-we-replace-lawyers-1358}

Czy zatem możemy faktycznie zastąpić prawników kodem? Nie do końca — a przynajmniej nie w tej chwili. W przyszłości prawdopodobnie coraz więcej kontraktów będzie automatyzowanych, zwłaszcza w finansach. Ale nawet w w pełni zautomatyzowanym świecie prawnicy mogą dostarczyć cenną wiedzę, którą można przełożyć na kod. Istnieje również wiele wyzwań regulacyjnych wokół branży krypto, które zapewnią prawnikom mnóstwo pracy przez jakiś czas. Niemniej jednak, gdybym był prawnikiem, zacząłbym uczyć się o inteligentnych kontraktach i programowaniu, ponieważ odegrają one dużą rolę w przyszłości.

#### Podsumowanie (14:53) {#summary-1453}

Zalety inteligentnych kontraktów:

- W pełni zautomatyzowane
- Deterministyczne wyniki
- Niewymagające zaufania
- Szybkie, precyzyjne i bezpieczne
- Opłacalne i przejrzyste

Wady inteligentnych kontraktów:

- Błędy w oprogramowaniu
- Zmiany w protokole
- Niepewność regulacyjna i podatkowa

Mimo że inteligentne kontrakty niosą ze sobą pewne ryzyko, wciąż jesteśmy na bardzo wczesnym etapie, a większość obecnych problemów jest do rozwiązania.