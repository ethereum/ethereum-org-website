---
title: Podręcznik programu tłumaczeń
lang: pl
description: Zbiór wskazówek i ważnych uwag dotyczących tworzenia programu tłumaczeń
---

# Podręcznik programu tłumaczeń {#translation-program-playbook}

Angielski jest jednym z najczęściej używanych języków na świecie i zdecydowanie najczęściej studiowanym językiem na świecie. Ponieważ angielski jest najpowszechniejszym językiem używanym w Internecie – zwłaszcza w mediach społecznościowych – a wielojęzyczne języki programowania są rzadkością, większość treści w przestrzeni blockchain jest tworzona natywnie w języku angielskim.

Jednakże, ponieważ ponad 6 miliardów ludzi na świecie (ponad 75% populacji) w ogóle nie mówi po angielsku, stanowi to ogromną barierę wejścia do Ethereum dla zdecydowanej większości ludności świata.

Z tego powodu coraz więcej projektów w tej przestrzeni stara się przetłumaczyć swoje treści na różne języki i zlokalizować je dla globalnych społeczności.

Dostarczanie treści wielojęzycznych to prosty i skuteczny sposób na powiększanie globalnej społeczności, zapewnianie edukacji osobom nieanglojęzycznym, docieranie z treściami i komunikatami do szerszego grona odbiorców oraz wprowadzanie nowych osób do tej przestrzeni.

Ten przewodnik ma na celu omówienie typowych wyzwań i błędnych przekonań na temat lokalizacji treści. Zawiera on przewodnik krok po kroku dotyczący zarządzania treścią, procesu tłumaczenia i weryfikacji, zapewniania jakości, pozyskiwania tłumaczy i innych istotnych aspektów procesu lokalizacji.

## Zarządzanie treścią {#content-management}

Zarządzanie treścią tłumaczeniową odnosi się do procesu automatyzacji przepływu pracy tłumaczeniowej, co eliminuje potrzebę powtarzalnej pracy ręcznej, poprawia wydajność i jakość, pozwala na lepszą kontrolę i umożliwia współpracę.

Istnieje wiele różnych podejść do zarządzania treścią w procesie lokalizacji, w zależności od treści i potrzeb.

Podstawowym sposobem zarządzania treścią jest tworzenie plików dwujęzycznych, zawierających tekst źródłowy i docelowy. Jest to rzadko stosowane w tłumaczeniach, ponieważ poza prostotą nie oferuje żadnych znaczących korzyści.

Agencje tłumaczeń zazwyczaj podchodzą do zarządzania tłumaczeniami, korzystając z oprogramowania do zarządzania tłumaczeniami lub narzędzi lokalizacyjnych, które zapewniają możliwości zarządzania projektami i pozwalają na znacznie większą kontrolę nad plikami, treścią i lingwistami.

Dowiedz się więcej o zarządzaniu treścią:

[Trados o tym, czym jest zarządzanie tłumaczeniami](https://www.trados.com/solutions/translation-management/)

[Phrase o zarządzaniu treścią wielojęzyczną](https://phrase.com/blog/posts/multilingual-content-management/)

### Oprogramowanie do zarządzania tłumaczeniami {#translation-management-software}

Istnieje wiele systemów zarządzania tłumaczeniami i narzędzi lokalizacyjnych, a wybór oprogramowania zależy głównie od Twoich potrzeb.

Chociaż niektóre projekty rezygnują z korzystania z systemów zarządzania tłumaczeniami i wolą obsługiwać tłumaczenia ręcznie – bezpośrednio w plikach dwujęzycznych lub w usługach hostingowych, takich jak GitHub – to drastycznie zmniejsza kontrolę, produktywność, jakość, skalowalność i możliwości współpracy. Takie podejście może być najbardziej korzystne w przypadku małych lub jednorazowych projektów tłumaczeniowych.

Krótki przegląd niektórych z najpotężniejszych i najczęściej używanych narzędzi do zarządzania tłumaczeniami:

**Najlepsze do crowdsourcingu i współpracy**

[Crowdin](https://crowdin.com/)

- Bezpłatne dla projektów open-source (nieograniczona liczba ciągów i projektów)
- TM i słowniczek dostępne ze wszystkimi planami
- Ponad 60 obsługiwanych formatów plików, ponad 70 integracji API

[Lokalise](https://lokalise.com/)

- Bezpłatny dla 2 członków zespołu, płatne plany dla większej liczby współtwórców (ograniczona liczba ciągów dla większości planów)
- Pamięć tłumaczeniowa (TM) i glosariusz dostępne w niektórych płatnych planach
- Ponad 30 obsługiwanych formatów plików, ponad 40 integracji API

[Transifex](https://www.transifex.com/)

- Tylko plany płatne (ograniczona liczba ciągów dla większości planów)
- Pamięć tłumaczeniowa (TM) i glosariusz dostępne we wszystkich płatnych planach
- Ponad 30 obsługiwanych formatów plików, ponad 20 integracji API

[Phrase](https://phrase.com/)

- Tylko plany płatne (nieograniczona liczba ciągów we wszystkich planach, ograniczona liczba projektów i członków zespołu)
- Pamięć tłumaczeniowa (TM) i glosariusz dostępne w niektórych płatnych planach
- Ponad 40 obsługiwanych formatów plików, ponad 20 integracji API

[Smartcat](https://www.smartcat.com/)

- Podstawowy bezpłatny plan z płatnymi zaawansowanymi funkcjami (nieograniczona liczba ciągów i projektów dla wszystkich planów)
- TM i słowniczek dostępne ze wszystkimi planami
- Ponad 60 obsługiwanych formatów plików, ponad 20 integracji API

[POEditor](https://poeditor.com/)

- Bezpłatne dla projektów open-source (ograniczona liczba ciągów dla wszystkich projektów, nieograniczona dla projektów open-source)
- Pamięć tłumaczeniowa (TM) i glosariusz dostępne dla płatnych planów
- Ponad 20 obsługiwanych formatów plików, ponad 10 integracji API

i wiele innych...

**Profesjonalne narzędzia tłumaczeniowe**

[SDL Trados Studio](https://www.trados.com/products/trados-studio/)

- Płatne plany dla tłumaczy freelancerów i zespołów
- Bardzo potężne narzędzie do tłumaczenia wspomaganego komputerowo (CAT) i oprogramowanie zwiększające produktywność tłumaczy

[MemoQ](https://www.memoq.com/)

- Dostępna ograniczona wersja bezpłatna z kilkoma płatnymi planami dla zaawansowanych funkcji
- Oprogramowanie do zarządzania tłumaczeniami dla firm, dostawców usług językowych i tłumaczy

[Memsource](https://www.memsource.com/)

- Bezpłatne dla indywidualnych tłumaczy z kilkoma płatnymi planami dla zespołów
- Oparty na chmurze system tłumaczenia wspomaganego komputerowo i zarządzania tłumaczeniami

i wiele innych...

Dowiedz się więcej o oprogramowaniu do zarządzania tłumaczeniami:

[Definicja systemów zarządzania tłumaczeniami w Wikipedii](https://en.wikipedia.org/wiki/Translation_management_system)

[Phrase o 7 rzeczach, które powinno mieć każde oprogramowanie do zarządzania tłumaczeniami](https://phrase.com/blog/posts/7-things-every-translation-management-software-should-have/)

[MemoQ o tym, czym jest system zarządzania tłumaczeniami](https://www.memoq.com/tools/what-is-a-translation-management-system)

[Lista 16 najlepszych systemów zarządzania tłumaczeniami według Gengo](https://gengo.com/translator-product-updates/16-best-translation-management-systems/)

## Przepływ pracy {#workflow}

W branży tłumaczeniowej przepływ pracy tłumaczeniowej może oznaczać kilka różnych rzeczy, obie w pewnym stopniu powiązane ze sobą i stanowiące ważne kwestie do rozważenia w Twoim projekcie.

Poniżej omówimy obie z nich.

**Znaczenie 1**

Jest to prawdopodobnie najczęstszy sposób myślenia o przepływach pracy tłumaczeniowej i coś, co zazwyczaj przychodzi na myśl, gdy słyszymy słowo „przepływ pracy”.

W swej istocie jest to „przepływ pracy” od rozpoczęcia myślenia o tłumaczeniach do wykorzystania przetłumaczonej treści w produkcie.

Przykładowy przepływ pracy w tym przypadku wyglądałby następująco:

1. **Przygotowanie plików do tłumaczenia** – Brzmi to prosto, jednak trzeba wziąć pod uwagę kilka ważnych rzeczy. Na tym etapie należy mieć jasny plan, jak powinien przebiegać cały proces.

- _Jakich typów plików będziesz używać? W jakim formacie chcesz otrzymywać przetłumaczone pliki?_
  - Jeśli Twoje treści są dostępne w formacie DOCX lub MD, podejście będzie znacznie prostsze niż w przypadku tłumaczenia wersji PDF Twojej dokumentacji technicznej lub innych dokumentów.
- _Które narzędzia lokalizacyjne obsługują ten typ pliku? Czy plik można przetłumaczyć w sposób, który zachowa oryginalne formatowanie?_
  - Nie wszystkie typy plików obsługują bezpośrednią lokalizację (np. pliki PDF, pliki graficzne), a nie wszystkie narzędzia lokalizacyjne obsługują wszystkie typy plików.
- _Kto będzie tłumaczyć treść? Czy zamierzasz zlecić profesjonalne tłumaczenia, czy polegać na wolontariuszach?_
  - Wpływa to na wiele innych decyzji, które należy podjąć. Na przykład, profesjonalni tłumacze czują się bardziej komfortowo pracując z zaawansowanymi narzędziami lokalizacyjnymi niż wolontariusze.
- _Jakie są Twoje oczekiwania wobec lingwistów? Jeśli korzystasz z usług dostawcy usług językowych, czego on od Ciebie oczekuje?_
  - To jest krok, aby upewnić się, że Twoje cele, oczekiwania i harmonogramy są zgodne.
- _Czy wszystkie treści do tłumaczenia są jednakowo ważne? Czy niektóre treści powinny być tłumaczone w pierwszej kolejności?_
  - Istnieją pewne sposoby na nadanie priorytetu określonym treściom, które powinny zostać przetłumaczone i wdrożone w pierwszej kolejności. Na przykład, jeśli masz dużo treści do tłumaczenia, możesz użyć kontroli wersji, aby upewnić się, że tłumacze wiedzą, którym treściom powinni nadać priorytet.

2. **Udostępnianie plików do tłumaczenia** – Ten krok również wymaga myślenia długoterminowego i nie jest tak prosty, jak wysłanie plików źródłowych do dostawcy usług językowych.

- _Kto będzie tłumaczyć treść? Ile osób będzie zaangażowanych w ten proces?_
  - Jeśli planujesz używać narzędzia lokalizacyjnego, ten krok jest uproszczony, ponieważ możesz przesyłać pliki źródłowe bezpośrednio do narzędzia. Jest to również prawdą, jeśli proces tłumaczenia odbywa się w usłudze hostingowej, ponieważ pliki źródłowe nie muszą być nigdzie eksportowane.
- _Czy pliki źródłowe będą obsługiwane ręcznie, czy też proces ten można zautomatyzować?_
  - Większość narzędzi lokalizacyjnych pozwala na pewien rodzaj integracji lub automatyzacji procesu zarządzania plikami. Z drugiej strony, jeśli pracujesz z indywidualnymi tłumaczami i nie używasz narzędzia lokalizacyjnego, ręczne wysyłanie plików źródłowych do setek lub tysięcy tłumaczy nie jest procesem skalowalnym.
- _Jakie narzędzia będą używane do lokalizacji?_
  - Odpowiedź na to pytanie zdeterminuje sposób, w jaki podejdziesz do całej reszty. Wybór odpowiedniego narzędzia może pomóc zautomatyzować zarządzanie treścią, zarządzanie pamięcią tłumaczeniową i glosariuszem, zarządzanie tłumaczami, śledzenie postępów w tłumaczeniu/weryfikacji itp., więc poświęć trochę czasu i zbadaj, jakiego narzędzia chcesz użyć. Jeśli nie planujesz używać narzędzia lokalizacyjnego, wszystko powyższe będzie musiało być wykonane ręcznie.
- _Jak długo potrwa proces tłumaczenia? Ile to będzie kosztować?_
  - W tym momencie powinieneś być gotowy do udostępnienia plików źródłowych dostawcy usług językowych lub puli tłumaczy. Dostawca usług językowych może pomóc w analizie liczby słów i przedstawić wycenę, w tym stawki i harmonogram procesu tłumaczenia.
- _Czy planujesz wprowadzać zmiany/aktualizować treść źródłową w trakcie tego procesu?_
  - Jeśli Twoja treść jest dynamiczna i często się zmienia, wszelkie zmiany lub aktualizacje mogą zakłócić postęp tłumaczenia. Korzystanie z pamięci tłumaczeniowej może znacznie to złagodzić, chociaż nadal ważne jest, aby pomyśleć o tym, jak proces będzie działał i jak można zapobiec cofaniu postępów, jakie robią tłumacze.

3. **Zarządzanie procesem tłumaczenia** – Twoja praca nie kończy się, gdy treść źródłowa zostanie przekazana dostawcy usług językowych lub tłumaczom. Aby zapewnić optymalną jakość tłumaczeń, twórcy treści powinni być jak najbardziej zaangażowani w proces tłumaczenia.

- _Jak planujesz komunikować się z tłumaczami?_
  - Jeśli planujesz używać narzędzia lokalizacyjnego, komunikacja może odbywać się bezpośrednio w narzędziu. Zaleca się również utworzenie alternatywnego kanału komunikacji z tłumaczami, ponieważ mogą oni mieć mniej oporów przed nawiązaniem kontaktu, a narzędzia do przesyłania wiadomości pozwalają na swobodniejszą komunikację.
- _Jak radzić sobie z pytaniami od tłumaczy? Kto powinien odpowiadać na te pytania?_
  - Tłumacze (zarówno profesjonalni, jak i nieprofesjonalni) często zgłaszają się z pytaniami i prośbami o wyjaśnienie lub dodatkowy kontekst, a także z opiniami i pomysłami na ulepszenia. Odpowiadanie na te zapytania często może prowadzić do lepszego zaangażowania i jakości przetłumaczonych treści. Warto również zapewnić im jak najwięcej zasobów (np. przewodniki, wskazówki, wytyczne terminologiczne, FAQ itp.).
- _Jak przeprowadzić proces weryfikacji? Czy chcesz go zlecić na zewnątrz, czy masz możliwość przeprowadzania weryfikacji wewnętrznie?_
  - Chociaż nie zawsze są konieczne, weryfikacje stanowią integralną część optymalnego procesu tłumaczenia. Zwykle najłatwiej jest zlecić proces weryfikacji profesjonalnym weryfikatorom. Jeśli jednak masz duży międzynarodowy zespół, weryfikacje lub kontrola jakości mogą być również przeprowadzane wewnętrznie.

4. **Wdrażanie przetłumaczonej treści** – ostatnia część przepływu pracy, choć wciąż ważna do rozważenia z wyprzedzeniem.

- _Czy wszystkie tłumaczenia zostaną ukończone w tym samym czasie?_
  - Jeśli nie, należy zastanowić się, którym tłumaczeniom należy nadać priorytet, jak śledzić postęp tłumaczeń i jak obsłużyć wdrożenie w trakcie ich wykonywania.
- _W jaki sposób zostaną dostarczone przetłumaczone treści? W jakim będą formacie?_
  - Jest to ważna kwestia, niezależnie od tego, z jakiego podejścia korzystasz. Narzędzia lokalizacyjne pozwalają zachować kontrolę nad formatem pliku docelowego i procesem eksportu oraz zazwyczaj obsługują automatyzację, np. poprzez umożliwienie integracji z usługą hostingową.
- _Jak będziesz wdrażać tłumaczenia w swoim projekcie?_
  - W niektórych przypadkach może to być tak proste, jak przesłanie przetłumaczonego pliku lub dodanie go do dokumentacji. Jednak w przypadku bardziej złożonych projektów, takich jak tłumaczenia stron internetowych lub aplikacji, należy upewnić się, że kod obsługuje internacjonalizację i z góry ustalić, w jaki sposób będzie przebiegał proces wdrażania.
- _Co się stanie, jeśli formatowanie będzie inne niż w źródle?_
  - Podobnie jak powyżej, jeśli tłumaczysz proste pliki tekstowe, formatowanie prawdopodobnie nie jest kluczowe. Jednak w przypadku bardziej złożonych plików, takich jak treść strony internetowej lub aplikacji, formatowanie i kod muszą być identyczne ze źródłem, aby można je było wdrożyć w projekcie. Jeśli nie, pliki docelowe będą musiały zostać edytowane przez tłumaczy lub programistów.

**Znaczenie 2**

Alternatywny przepływ pracy tłumaczeniowej, który nie uwzględnia wewnętrznych decyzji i podejść. Główną kwestią jest tutaj sam przepływ treści.

Przykładowy przepływ pracy w tym przypadku wyglądałby następująco:

1. _Tłumaczenie → Wdrożenie_

- Najprostszy przepływ pracy, w którym tłumaczenie będzie prawdopodobnie tłumaczeniem ludzkim, ponieważ nie ma procesu weryfikacji ani kontroli jakości w celu oceny jakości i edycji tłumaczeń przed wdrożeniem.
- W tym przepływie pracy ważne jest, aby tłumacze mogli utrzymać określony poziom jakości, co będzie wymagało odpowiednich zasobów i komunikacji między kierownikami projektów a tłumaczami.

2. _Tłumaczenie → Weryfikacja → Wdrożenie_

- Bardziej zaawansowany przepływ pracy, który obejmuje proces weryfikacji i edycji, aby zapewnić, że jakość tłumaczeń jest akceptowalna i spójna.
- Istnieje wiele podejść do tego przepływu pracy, w którym tłumaczenia mogą być wykonywane przez profesjonalnych tłumaczy lub wolontariuszy, podczas gdy proces weryfikacji będzie prawdopodobnie obsługiwany przez profesjonalnych weryfikatorów, którzy znają wszystkie zasady gramatyczne i ortograficzne, których należy przestrzegać w języku docelowym.

3. _Tłumaczenie → Weryfikacja → Kontrola jakości → Wdrożenie_

- Optymalny przepływ pracy zapewniający najwyższy poziom jakości. Chociaż kontrola jakości nie zawsze jest konieczna, może być przydatna, aby dać lepsze wyobrażenie o jakości przetłumaczonego tekstu po tłumaczeniu i weryfikacji.
- W tym przepływie pracy tłumaczenia mogą być wykonywane wyłącznie przez wolontariuszy, a nawet za pomocą tłumaczenia maszynowego. Proces weryfikacji powinien być wykonywany przez profesjonalnych tłumaczy, podczas gdy kontrola jakości może być wykonywana przez dostawcę usług językowych lub wewnętrznie, jeśli masz pracowników, którzy są rodzimymi użytkownikami języków docelowych.

Dowiedz się więcej o przepływach pracy tłumaczeniowej:

[Content rules o pięciu fazach przepływu pracy tłumaczeniowej](https://contentrules.com/creating-translation-workflow/)

[Smartling o tym, czym jest zarządzanie przepływem pracy tłumaczeniowej](https://www.smartling.com/resources/101/what-is-translation-workflow-management/)

[RixTrans o przepływie pracy tłumaczeniowej](https://www.rixtrans.com/translation-workflow)

## Zarządzanie terminologią {#terminology-management}

Ustanowienie jasnego planu postępowania z terminologią jest jednym z najważniejszych kroków w celu zapewnienia jakości i spójności tłumaczeń oraz oszczędności czasu tłumaczy.

W branży tłumaczeniowej jest to znane jako zarządzanie terminologią i jest jedną z kluczowych usług, jakie dostawcy usług językowych oferują swoim klientom, oprócz dostępu do ich puli lingwistów i zarządzania treścią.

Zarządzanie terminologią odnosi się do procesu identyfikowania, gromadzenia i zarządzania terminologią, która jest ważna dla Twojego projektu i powinna być zawsze tłumaczona poprawnie i spójnie.

Jest kilka kroków, które należy wykonać, zaczynając myśleć o zarządzaniu terminologią:

- Zidentyfikuj kluczowe terminy, które powinny zostać włączone do bazy terminologicznej.
- Stwórz glosariusz terminów i ich definicji.
- Przetłumacz terminy i dodaj je do glosariusza.
- Sprawdź i zatwierdź tłumaczenia.
- Utrzymuj glosariusz i aktualizuj go o nowe terminy, gdy staną się ważne.

Dowiedz się więcej o zarządzaniu terminologią:

[Trados o tym, czym jest zarządzanie terminologią](https://www.trados.com/solutions/terminology-management/translation-101-what-is-terminology-management.html)

[Language Scientific o tym, dlaczego zarządzanie terminologią ma znaczenie](https://www.languagescientific.com/terminology-management-why-it-matters/#:~:text=Terminology%20management%20is%20the%20process,are%20related%20to%20each%20other.)

[Clear Words Translation o tym, czym jest zarządzanie terminologią i dlaczego ma to znaczenie](http://clearwordstranslations.com/language/en/what-is-terminology-management/)

### Pamięć tłumaczeniowa i glosariusz {#tm-and-glossary}

Pamięć tłumaczeniowa i glosariusz to ważne narzędzia w branży tłumaczeniowej, na których polega większość dostawców usług językowych.

Przyjrzyjmy się, co oznaczają te terminy i czym się od siebie różnią:

**Pamięć tłumaczeniowa (TM)** – baza danych, która automatycznie przechowuje segmenty lub ciągi znaków, w tym dłuższe bloki tekstu, całe zdania, akapity i pojedyncze terminy, a także ich obecne i poprzednie tłumaczenia w każdym języku.

Większość narzędzi lokalizacyjnych, systemów zarządzania tłumaczeniami i narzędzi do tłumaczenia wspomaganego komputerowo ma wbudowane pamięci tłumaczeniowe, które zazwyczaj można eksportować i wykorzystywać również w innych podobnych narzędziach.

Korzyści płynące z używania pamięci tłumaczeniowej obejmują szybsze tłumaczenia, lepszą jakość tłumaczeń, możliwość zachowania pewnych tłumaczeń podczas aktualizacji lub zmiany treści źródłowej oraz niższe koszty tłumaczenia powtarzalnych treści.

Pamięci tłumaczeniowe działają w oparciu o procentową zgodność między różnymi segmentami i są zazwyczaj najbardziej przydatne, gdy dwa segmenty zawierają ponad 50% tej samej treści. Są one również używane do automatycznego tłumaczenia powtarzających się segmentów, które są w 100% zgodne, eliminując w ten sposób potrzebę tłumaczenia powtarzających się treści więcej niż raz.

Dowiedz się więcej o pamięciach tłumaczeniowych:

[Memsource o pamięciach tłumaczeniowych](https://www.memsource.com/translation-memory/)

[Smartling o tym, czym jest pamięć tłumaczeniowa](https://www.smartling.com/resources/101/what-is-translation-memory/)

**Glosariusz –** lista ważnych lub wrażliwych terminów, ich definicji, funkcji i ustalonych tłumaczeń. Główna różnica między glosariuszem a pamięcią tłumaczeniową polega na tym, że glosariusz nie jest tworzony automatycznie i nie zawiera tłumaczeń całych zdań.

Większość narzędzi lokalizacyjnych, systemów zarządzania tłumaczeniami i narzędzi do tłumaczenia wspomaganego komputerowo ma wbudowane glosariusze, które można utrzymywać, aby zapewnić, że zawierają one terminologię ważną dla Twojego projektu. Podobnie jak pamięć tłumaczeniową (TM), glosariusz można zazwyczaj eksportować i używać w innych narzędziach lokalizacyjnych.

Przed rozpoczęciem projektu tłumaczeniowego zaleca się poświęcenie trochę czasu na stworzenie glosariusza dla tłumaczy i weryfikatorów. Korzystanie z glosariusza zapewnia, że ważne terminy są tłumaczone poprawnie, dostarcza tłumaczom bardzo potrzebnego kontekstu i gwarantuje spójność tłumaczeń.

Chociaż glosariusze najczęściej zawierają ustalone tłumaczenia w językach docelowych, są one również przydatne bez nich. Nawet bez ustalonych tłumaczeń glosariusz może zawierać definicje terminów technicznych, podkreślać terminy, które nie powinny być tłumaczone, i informować tłumaczy, czy dany termin jest używany jako rzeczownik, czasownik, nazwa własna czy inna część mowy.

Dowiedz się więcej o glosariuszach:

[Lionbridge o tym, czym jest glosariusz tłumaczeniowy](http://info.lionbridge.com/rs/lionbridge/images/Lionbridge%20FAQ_Glossary_2013.pdf)

[Transifex o glosariuszach](https://docs.transifex.com/glossary/glossary)

Jeśli nie planujesz używać narzędzia lokalizacyjnego w swoim projekcie, prawdopodobnie nie będziesz mógł korzystać z pamięci tłumaczeniowej i glosariusza (możesz utworzyć glosariusz lub bazę terminologiczną w pliku Excel, jednak zautomatyzowane glosariusze eliminują potrzebę ręcznego wyszukiwania terminów i ich definicji przez tłumaczy).

Oznacza to, że wszystkie powtarzające się i podobne treści musiałyby być za każdym razem tłumaczone ręcznie. Dodatkowo tłumacze musieliby zadawać pytania, czy dany termin należy przetłumaczyć, czy nie, jak jest używany w tekście i czy dany termin ma już ustalone tłumaczenie.

_Chcesz użyć pamięci tłumaczeniowej i glosariusza ethereum.org w swoim projekcie? Skontaktuj się z nami pod adresem translations@ethereum.org._

## Pozyskiwanie tłumaczy {#translator-outreach}

**Współpraca z dostawcą usług językowych**

Jeśli współpracujesz z dostawcą usług językowych i jego profesjonalnymi tłumaczami, ta sekcja może nie być dla Ciebie zbyt istotna.

W takim przypadku ważne jest, aby wybrać dostawcę usług językowych, który jest w stanie świadczyć wszystkie potrzebne usługi (np. tłumaczenie, weryfikację, kontrolę jakości) w wielu językach.

Chociaż może być kuszące, aby wybrać dostawcę usług językowych wyłącznie na podstawie oferowanych stawek, należy pamiętać, że najwięksi dostawcy usług językowych mają wyższe stawki nie bez powodu.

- Mają w swojej bazie dziesiątki tysięcy lingwistów, co oznacza, że będą w stanie przydzielić do Twojego projektu tłumaczy z wystarczającym doświadczeniem i wiedzą w Twoim konkretnym sektorze (tj. tłumaczy technicznych).
- Mają oni znaczące doświadczenie w pracy nad różnymi projektami i zaspokajaniu różnorodnych potrzeb swoich klientów. Oznacza to, że będą bardziej skłonni do dostosowania się do Twojego konkretnego przepływu pracy, oferowania cennych sugestii i potencjalnych ulepszeń procesu tłumaczenia oraz spełniania Twoich potrzeb, wymagań i terminów.
- Większość największych dostawców usług językowych ma również własne narzędzia lokalizacyjne, pamięci tłumaczeniowe i glosariusze, z których można korzystać. Jeśli nie, mają przynajmniej wystarczającą liczbę lingwistów w swojej puli, aby upewnić się, że ich tłumacze będą zaznajomieni i będą w stanie pracować z dowolnym narzędziem lokalizacyjnym, którego chcesz użyć.

Szczegółowe porównanie największych dostawców usług językowych na świecie, szczegóły na temat każdego z nich oraz podziały według świadczonych usług, danych geograficznych itp. można znaleźć w [raporcie Nimdzi 100 z 2021 roku](https://www.nimdzi.com/nimdzi-100-top-lsp/).

**Współpraca z tłumaczami nieprofesjonalnymi**

Być może pracujesz z tłumaczami nieprofesjonalnymi i szukasz wolontariuszy, którzy pomogliby Ci w tłumaczeniu.

Istnieje kilka sposobów, aby dotrzeć do ludzi i zaprosić ich do przyłączenia się do projektu. W dużej mierze zależy to od Twojego produktu i tego, jak dużą masz już społeczność.

Poniżej przedstawiono kilka sposobów pozyskiwania wolontariuszy:

**Działania informacyjne –** chociaż jest to w pewnym stopniu omówione w poniższych punktach, docieranie do potencjalnych wolontariuszy i uświadamianie im istnienia inicjatywy tłumaczeniowej może być samo w sobie skuteczne.

Wiele osób chce się zaangażować i wnieść wkład w swoje ulubione projekty, ale często nie widzi jasnego sposobu, aby to zrobić, nie będąc deweloperem lub nie posiadając specjalnych umiejętności technicznych. Jeśli uda Ci się rozpowszechnić informacje o swoim projekcie, wiele osób dwujęzycznych prawdopodobnie chętnie się zaangażuje.

**Poszukiwania w ramach społeczności –** większość projektów w tej przestrzeni ma już duże i aktywne społeczności. Wielu członków Twojej społeczności prawdopodobnie doceniłoby szansę wniesienia wkładu w projekt w prosty sposób.

Chociaż wkład w projekty open-source często opiera się na wewnętrznej motywacji, jest to również fantastyczne doświadczenie edukacyjne. Każdy, kto jest zainteresowany dowiedzeniem się więcej o Twoim projekcie, prawdopodobnie chętnie zaangażuje się w program tłumaczeń jako wolontariusz, ponieważ pozwoliłoby mu to połączyć fakt, że przyczynił się do czegoś, na czym mu zależy, z intensywnym, praktycznym doświadczeniem edukacyjnym.

**Wspominanie o inicjatywie w produkcie –** jeśli Twój produkt jest popularny i używany przez dużą liczbę osób, podkreślanie programu tłumaczeń i wzywanie użytkowników do działania podczas korzystania z produktu może być niezwykle skuteczne.

Może to być tak proste, jak dodanie banera lub wyskakującego okienka z wezwaniem do działania (CTA) do produktu w przypadku aplikacji i stron internetowych. Jest to skuteczne, ponieważ grupą docelową jest Twoja społeczność – ludzie, którzy najprawdopodobniej zaangażują się w pierwszej kolejności.

**Media społecznościowe –** media społecznościowe mogą być skutecznym sposobem na rozpowszechnianie informacji o programie tłumaczeń i docieranie do członków społeczności, a także innych osób, które jeszcze nie są członkami Twojej społeczności.

Jeśli masz serwer Discord lub kanał Telegram, łatwo jest go używać do docierania do odbiorców, komunikacji z tłumaczami i wyrażania uznania swoim współtwórcom.

Platformy takie jak X (dawniej Twitter) mogą być również pomocne w pozyskiwaniu nowych członków społeczności i publicznym wyrażaniu uznania swoim współtwórcom.

Fundacja Linux stworzyła obszerny [raport z ankiety współtwórców FOSS z 2020 roku](https://www.linuxfoundation.org/wp-content/uploads/2020FOSSContributorSurveyReport_121020.pdf), analizujący współtwórców oprogramowania open-source i ich motywacje.

## Wnioski {#conclusion}

Ten dokument zawiera kilka kluczowych kwestii, o których powinien wiedzieć każdy program tłumaczeń. W żadnym wypadku nie jest to wyczerpujący przewodnik, chociaż może pomóc każdemu, kto nie ma doświadczenia w branży tłumaczeniowej, zorganizować program tłumaczeń dla swojego projektu.

Jeśli szukasz bardziej szczegółowych instrukcji i analiz różnych narzędzi, procesów i krytycznych aspektów zarządzania programem tłumaczeń, niektórzy z największych dostawców usług językowych prowadzą blogi i często publikują artykuły na temat różnych aspektów procesu lokalizacji. Są to najlepsze zasoby, jeśli chcesz zagłębić się w którykolwiek z powyższych tematów i zrozumieć, jak profesjonalnie działa proces lokalizacji.

Na końcu każdej sekcji znajdują się odpowiednie linki, jednak w Internecie można znaleźć wiele innych zasobów.

W przypadku propozycji współpracy lub dodatkowych informacji, wniosków i najlepszych praktyk, które zebraliśmy, prowadząc program tłumaczeń ethereum.org, prosimy o kontakt pod adresem translations@ethereum.org.
