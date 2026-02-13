---
title: Wyrocznie
description: "Wyrocznie zapewniają inteligentnym kontraktom dostęp do danych z prawdziwego świata, umożliwiając więcej przypadków użycia oraz większą wartość dla użytkowników."
lang: pl
---

Wyrocznie są aplikacjami, które tworzą kanały danych, które sprawiają, że źródła danych poza łańcuchem są dostępne w blockchainie dla inteligentnych kontraktów. Jest to niezbędne, ponieważ inteligentne kontrakty oparte na Ethereum domyślnie nie mogą uzyskiwać dostępu do informacji przechowywanych poza siecią blockchainu.

Nadanie inteligentnym kontraktom możliwości wykonywania ich przy użyciu danych spoza łańcucha zwiększa użyteczność i wartość zdecentralizowanych aplikacji. Dla przykładu, rynki prognostyczne w łańcuchu polegają na wyroczniach w celu dostarczenia informacji o wynikach, które wykorzystują do walidacji przewidywań użytkowników. Załóżmy, że Alice obstawi 20 ETH na to, kto zostanie następnym prezydentem USA. W tym przypadku zdecentralizowana aplikacja rynku przewidywań potrzebuje wyroczni, aby potwierdzić wyniki elekcji i określić, czy Alice może otrzymać wypłatę.

## Wymagania wstępne {#prerequisites}

Ta strona zakłada, że czytelnik jest zaznajomiony z podstawami Ethereum, w tym z [węzłami](/developers/docs/nodes-and-clients/), [mechanizmami konsensusu](/developers/docs/consensus-mechanisms/) i [EVM](/developers/docs/evm/). Powinieneś również dobrze rozumieć [inteligentne kontrakty](/developers/docs/smart-contracts/) i [anatomię inteligentnych kontraktów](/developers/docs/smart-contracts/anatomy/), a w szczególności [zdarzenia](/glossary/#events).

## Czym jest blockchainowa wyrocznia? {#what-is-a-blockchain-oracle}

Wyrocznie to aplikacje, które pozyskują, weryfikują i przesyłają informacje zewnętrzne (tj. informacje przechowywane poza łańcuchem) do inteligentnych kontraktów działających na blockchainie. Poza „wyciąganiem” danych spoza łańcucha i przesyłaniem ich do Ethereum wyrocznie mogą również „wypychać” informacje z blockchainu do zewnętrznych systemów, aby np. odblokować inteligentny zamek po przesłaniu przez użytkownika opłaty za pośrednictwem transakcji Ethereum.

Bez wyroczni inteligentne kontrakty byłyby ograniczone całkowicie do danych znajdujących się w łańcuchu.

Wyrocznie różnią się w zależności od źródła danych (jedno lub wiele źródeł), modeli zaufania (scentralizowane lub zdecentralizowane) oraz architektury systemu (natychmiastowy odczyt, publikacja-subskrypcja czy żądanie-odpowiedź). Możemy również wyróżnić wyrocznie na podstawie tego, czy pozyskują zewnętrzne dane do użytku przez kontrakty w łańcuchu (wyrocznie wprowadzające), wysyłają informacje z blockchainu do aplikacji poza łańcuchem (wyrocznie wyprowadzające) lub wykonują zadania obliczeniowe poza łańcuchem (wyrocznie obliczeniowe).

## Dlaczego inteligentne kontrakty potrzebują wyroczni? {#why-do-smart-contracts-need-oracles}

Wiele deweloperów widzi inteligentne kontrakty jako kod działający pod określonych adresem w blockchainie. Jednak bardziej [ogólne spojrzenie na inteligentne kontrakty](/smart-contracts/) jest takie, że są to samowykonujące się programy zdolne do egzekwowania umów między stronami po spełnieniu określonych warunków – stąd termin „inteligentne kontrakty”.

Jednak używanie inteligentnych kontraktów do egzekwowania umów między ludźmi nie jest takie proste, biorą pod uwagę, że Ethereum jest deterministyczne. [System deterministyczny](https://en.wikipedia.org/wiki/Deterministic_algorithm) to taki, który zawsze daje te same wyniki przy danym stanie początkowym i określonych danych wejściowych, co oznacza, że nie ma losowości ani wariacji w procesie obliczania wyników z podanych danych wejściowych.

Aby osiągnąć deterministyczne wykonanie, blockchainy ograniczają węzły do osiągania konsensusu w prostych kwestiach binarnych (prawda/fałsz), używając _wyłącznie_ danych przechowywanych na samym blockchainie. Oto kilka przykładów takich pytań:

- „Czy właściciel konta (zidentyfikowany przez klucz publiczny) podpisał tę transakcję przy użyciu sparowanego klucza prywatnego?”
- „Czy to konto ma wystarczającą ilość środków, aby pokryć transakcję?”
- „Czy ta transakcja jest ważna w kontekście tego inteligentnego kontraktu?” itp.

Gdyby blockchainy otrzymywały informacje z zewnętrznych źródeł (tj. ze świata rzeczywistego), osiągnięcie determinizmu byłoby niemożliwe, co uniemożliwiłoby węzłom uzgodnienie ważności zmian w stanie blockchaina. Weźmy dla przykładu inteligentny kontrakt, który wykonuje transakcje na podstawie aktualnego kursu wymiany ETH-USD uzyskanego z tradycyjnego cenowego API. Wartość ta prawdopodobnie będzie się często zmieniać (nie wspominając już o tym, że API stać się przestarzałe bądź zhakowane), co oznacza, że węzły wykonujące ten sam kod kontraktu otrzymają różne wyniki.

Dla publicznego blockchainu, jakim jest Ethereum, z tysiącami węzłów na całym świecie przetwarzającymi transakcje, determinizm jest kluczowy. Bez centralnej władzy służącej jako źródło prawdy, węzły potrzebują mechanizmów umożliwiających osiągniecie tego samego stanu po uwzględnieniu tych samych transakcji. W przypadku, w którym węzeł A wykona kod inteligentnego kontraktu i otrzyma „3” jako wynik, podczas gdy węzeł B otrzyma „7” po przetworzeniu tej samej transakcji, spowodowałoby załamanie konsensusu i wyeliminowanie wartości Ethereum jako zdecentralizowanej platformy obliczeniowej.

Ten scenariusz podkreśla również problem z projektowaniem blockchainów do wyciągania informacji z zewnętrznych źródeł. Wyrocznie rozwiązują jednak ten problem, pobierając informacje ze źródeł spoza łańcucha i przechowując je w blockchainie do wykorzystania przez inteligentne kontrakty. Ponieważ informacje przechowywane w łańcuchu są niezmienne i publicznie dostępne, węzły Ethereum mogą bezpiecznie używać danych spoza łańcucha zaimportowanych przez wyrocznie do obliczania zmian stanu bez załamania konsensusu.

Aby to zrobić, wyrocznie jest zwykle skonstruowana z inteligentnego kontraktu działającego na łańcuchu oraz jakiegoś komponentu spoza łańcucha. Kontrakt w łańcuchu otrzymuje żądania danych od innych inteligentnych kontraktów, które przekazuje do komponentu poza łańcuchem (nazywanego węzłem wyroczni). Ten węzeł wyroczni może wysyłać zapytania do źródeł danych — na przykład, przy użyciu interfejsów programowania aplikacji (API) — oraz wysyłać transakcje, aby przechować żądane dane w magazynie inteligentnego kontraktu.

Zasadniczo blockchainowa wyrocznia wypełnia lukę informacyjną między blockchainem, a zewnętrznym środowiskiem, tworząc „hybrydowe inteligentne kontrakty”. To takie kontrakty, które funkcjonują na podstawie kombinacji kodu kontraktu znajdującego się w łańcuchu oraz infrastruktury poza łańcuchem. Zdecentralizowane rynki przewidywań są doskonałym przykładem hybrydowych inteligentnych kontraktów. Innymi przykładami mogą być inteligentne kontrakty ubezpieczeń upraw, które wypłacają, kiedy zestaw wyroczni określi, że wystąpiły określone zjawiska pogodowe.

## Jaki jest problem wyroczni? {#the-oracle-problem}

Wyrocznie rozwiązują ważny problem, ale wprowadzają również pewne komplikacje, np.:

- W jaki sposób możemy zweryfikować, że wprowadzane informacje zostały pobrane z poprawnego źródła lub nie zostały sfałszowane?

- W jaki sposób możemy zapewnić, że te dane będą zawsze dostępne i regularnie aktualizowane?

Tak zwany „problem wyroczni” demonstruje problemy związane z używaniem blockchainowych wyroczni do wysyłania danych do inteligentnych danych. Dane od wyroczni muszą być poprawne, aby inteligentny kontrakt mógł zostać poprawnie wykonany. Ponadto, konieczność „ufania” operatorom wyroczni na dostarczenie dokładnych danych mija się z „bezzaufaniowym” aspektem inteligentnych kontraktów.

Różne wyrocznie oferują różne rozwiązania problemu wyroczni, które omówimy później. Wyrocznie są zazwyczaj oceniane pod kątem tego, jak dobrze radzą sobie z następującymi wyzwaniami:

1. **Poprawność**: Wyrocznia nie powinna powodować, że inteligentne kontrakty będą wyzwalać zmiany stanu na podstawie nieprawidłowych danych pozyskanych poza łańcuchem. Wyrocznia musi gwarantować _autentyczność_ i _integralność_ danych. Autentyczność oznacza, że dane zostały pobrane z właściwego źródła, podczas gdy integralność oznacza, że dane pozostały nienaruszone (tj. nie zostały zmienione) przed wysłaniem ich do łańcucha.

2. **Dostępność**: Wyrocznia nie powinna opóźniać ani uniemożliwiać inteligentnym kontraktom wykonywania działań i wyzwalania zmian stanu. Oznacza to, że dane z wyroczni muszą być _dostępne na żądanie_ bez przerw.

3. **Zgodność zachęt**: Wyrocznia powinna zachęcać dostawców danych spoza łańcucha do przesyłania prawidłowych informacji do inteligentnych kontraktów. Zgodność zachęt obejmuje _przypisywalność_ i _rozliczalność_. Przypisywalność pozwala na powiązanie zewnętrznej informacji z jej dostawcą, podczas gdy rozliczalność wiąże dostawców danych z informacjami, które przekazują, aby mogli być nagradzani bądź karani na podstawie jakości przekazywanych danych.

## Jak działa usługa blockchainowych wyroczni? {#how-does-a-blockchain-oracle-service-work}

### Użytkownicy {#users}

Użytkownicy to podmioty (tj. inteligentne kontrakty), które potrzebują zewnętrznych informacji spoza blockchainu, aby wykonać określone akcje. Podstawowy proces usługi wyroczni zaczyna się, kiedy użytkownik wysyła żądanie danych do kontraktu wyroczni. Żądania danych zazwyczaj odpowiadają na część lub wszystkie następujące pytania:

1. Z jakich źródeł mogą korzystać węzły poza łańcuchem w celu uzyskania żądanych informacji?

2. W jaki sposób reporterzy przetwarzają informacje ze źródeł danych i wyodrębniają przydatne punkty danych?

3. Ile węzłów wyroczni może uczestniczyć w wyszukiwaniu danych?

4. W jaki sposób zarządzać rozbieżnościami w raportach wyroczni?

5. Jaka metoda powinna zostać zaimplementowana do filtrowania zgłoszeń oraz agregowania raportów w pojedynczą wartość?

### Kontrakt wyroczni {#oracle-contract}

Kontrakt wyroczni jest komponentem w łańcuchu usługi wyroczni. Nasłuchuje żądań danych od innych kontraktów, przekazuje zapytania o dane do węzłów wyroczni oraz przesyła zwrócone dane do kontraktów klienckich. Kontakt ten może również wykonywać pewne obliczenia na zwróconych punktach danych, aby stworzyć zagregowaną wartość, którą wyśle żądającemu kontraktowi.

Kontrakt wyroczni udostępnia pewne funkcje, które kontrakty klienckie wywołują podczas żądania danych. Po otrzymaniu nowego zapytania inteligentny kontrakt wyemituje [zdarzenie dziennika](/developers/docs/smart-contracts/anatomy/#events-and-logs) ze szczegółami żądania danych. Powiadamia to węzły spoza łańcucha subskrybujące dziennik (zazwyczaj za pomocą polecenia JSON-RPC `eth_subscribe`), które następnie pobierają dane zdefiniowane w zdarzeniu dziennika.

Poniżej znajduje się [przykładowy kontrakt wyroczni](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) autorstwa Pedro Costy. Jest to prosta usługa wyroczni, która może wysyłać zapytania do API poza łańcuchem na żądanie innych inteligentnych kontraktów oraz przechowywać żądane informacje w blockchainie:

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //lista żądań skierowanych do kontraktu
  uint currentId = 0; //rosnący identyfikator żądania
  uint minQuorum = 2; //minimalna liczba odpowiedzi do otrzymania przed ogłoszeniem ostatecznego wyniku
  uint totalOracleCount = 3; //Liczba wyroczni zakodowana na stałe

  // definiuje ogólne żądanie API
  struct Request {
    uint id;                            //id żądania
    string urlToQuery;                  //adres URL API
    string attributeToFetch;            //atrybut json (klucz) do pobrania w odpowiedzi
    string agreedValue;                 //wartość z klucza
    mapping(uint => string) answers;     //odpowiedzi dostarczone przez wyrocznie
    mapping(address => uint) quorum;    //wyrocznie, które odpytają o odpowiedź (1=wyrocznia nie głosowała, 2=wyrocznia głosowała)
  }

  //zdarzenie, które uruchamia wyrocznię poza blockchainem
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //uruchamiane, gdy istnieje konsensus co do ostatecznego wyniku
  event UpdatedRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch,
    string agreedValue
  );

  function createRequest (
    string memory _urlToQuery,
    string memory _attributeToFetch
  )
  public
  {
    uint length = requests.push(Request(currentId, _urlToQuery, _attributeToFetch, ""));
    Request storage r = requests[length-1];

    //Adresy wyroczni zakodowane na stałe
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // uruchom zdarzenie, które zostanie wykryte przez wyrocznię poza blockchainem
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // zwiększ id żądania
    currentId++;
  }

  //wywoływane przez wyrocznię w celu zarejestrowania jej odpowiedzi
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //sprawdź, czy wyrocznia znajduje się na liście zaufanych wyroczni
    //i czy wyrocznia jeszcze nie głosowała
    if(currRequest.quorum[address(msg.sender)] == 1){

      //oznaczenie, że ten adres głosował
      currRequest.quorum[msg.sender] = 2;

      //iteruj przez „tablicę” odpowiedzi, aż pozycja będzie wolna i zapisz pobraną wartość
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //znajdź pierwszy pusty slot
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //iteruj przez listę wyroczni i sprawdź, czy wystarczająca liczba wyroczni (minimalne kworum)
      //głosowała na tę samą odpowiedź co obecna
      for(uint i = 0; i < totalOracleCount; i++){
        bytes memory a = bytes(currRequest.answers[i]);
        bytes memory b = bytes(_valueRetrieved);

        if(keccak256(a) == keccak256(b)){
          currentQuorum++;
          if(currentQuorum >= minQuorum){
            currRequest.agreedValue = _valueRetrieved;
            emit UpdatedRequest (
              currRequest.id,
              currRequest.urlToQuery,
              currRequest.attributeToFetch,
              currRequest.agreedValue
            );
          }
        }
      }
    }
  }
}
```

### Węzły wyroczni {#oracle-nodes}

Węzeł wyroczni jest komponentem poza łańcuchem usługi wyroczni. Wyodrębnia informacje z zewnętrznych źródeł, takich jak API hostowane na serwerach stron trzecich i umieszcza je w łańcuchu do wykorzystania przez inteligentne kontrakty. Węzły wyroczni nasłuchują zdarzeń z kontraktu wyroczni znajdującego się w łańcuchu i wykonują zadanie opisane w dzienniku.

Częstym zadaniem dla węzłów wyroczni jest wysyłanie żądania [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) do usługi API, parsowanie odpowiedzi w celu wyodrębnienia odpowiednich danych, formatowanie ich do postaci czytelnej dla blockchaina i wysyłanie ich do łańcucha poprzez włączenie ich do transakcji do kontraktu wyroczni. Węzeł wyroczni może również być zobowiązany do poświadczania ważności oraz integralności przesłanych informacji przy użyciu „dowodów autentyczności”, które omówimy później.

Wyrocznie obliczeniowe również polegają na węzłach poza łańcuchem w celu wykonania zadań obliczeniowych, które nie warto byłoby wykonywać w łańcuchu ze względu na koszty gazu i ograniczenia rozmiaru bloku. Dla przykładu węzeł wyroczni może mieć za zadanie wygenerować weryfikowalnie losową liczbę (np. dla gier opartych na blockchainie).

## Wzorce projektowe wyroczni {#oracle-design-patterns}

Wyrocznie występują w różnych typach, w tym _immediate-read_, _publish-subscribe_ i _request-response_, przy czym te dwa ostatnie są najpopularniejsze wśród inteligentnych kontraktów Ethereum. Dlatego też krótko opiszemy modele publikacja-subskrypcja i żądanie-odpowiedź.

### Wyrocznie typu publikuj-subskrybuj {#publish-subscribe-oracles}

Ten rodzaj wyroczni udostępnia „kanał danych”, który inne kontrakty mogą regularnie odczytywać po informacje. W tym przypadku oczekuje się, że dane będą się często zmieniać, więc kontrakty klienckie muszą nasłuchiwać aktualizacji danych w pamięci wyroczni. Przykładem może być wyrocznia, która dostarcza użytkownikom najnowszych informacji o cenie ETH-USD.

### Wyrocznie typu żądanie-odpowiedź {#request-response-oracles}

Konfiguracja żądanie-odpowiedź pozwala kontraktom klienckim na żądanie dowolnych danych innych niż te dostarczane przez wyrocznie publikacja-subskrypcja. Wyrocznie żądanie-odpowiedź są idealne, gdy zbiór danych jest zbyt duży, aby mógł być przechowywany w magazynie inteligentnego kontraktu i/lub użytkownicy będą potrzebować małej części danych w dowolnym momencie.

Chociaż są one bardziej skomplikowane niż modele publikacja-subskrypcja, to wyrocznie żądanie-odpowiedź są tak naprawdę tym, co opisywaliśmy w poprzedniej sekcji. Wyrocznia będzie miała komponent w łańcuchu, który otrzymuje żądanie danych i przekazuje je do węzła poza łańcuchem do jego przetworzenia.

Użytkownicy inicjujący zapytania o dane muszą pokryć koszty otrzymania informacji od źródła poza łańcuchem. Kontrakt klienta musi również zapewnić środki na pokrycie kosztów gazu poniesionych przez kontrakt wyroczni podczas zwracania odpowiedzi poprzez funkcję zwrotną określoną w żądaniu.

## Wyrocznie scentralizowane a zdecentralizowane {#types-of-oracles}

### Wyrocznie scentralizowane {#centralized-oracles}

Scentralizowana wyrocznia jest kontrolowana przez pojedynczy podmiot, który jest odpowiedzialny za agregowane informacji spoza łańcucha oraz aktualizowanie danych kontraktu wyroczni zgodnie z żądaniem. Scentralizowane wyrocznie są wydajne, ponieważ polegają na pojedynczym źródle prawdy. Mogą funkcjonować lepiej w przypadkach, gdy zastrzeżone zbiory danych zostają opublikowane bezpośrednio przez właściciela z powszechnie akceptowanym podpisem. Mają one jednak też swoje wady:

#### Niskie gwarancje poprawności {#low-correctness-guarantees}

Ze scentralizowanymi wyroczniami nie ma sposobu na potwierdzenie czy dostarczane informację są poprawne czy nie. Nawet „renomowani” dostawcy mogą stać się nieuczciwi bądź zostać zhakowani. Jeśli wyrocznia zostanie skorumpowana, to inteligentne kontrakty będą wykonywane na podstawie złych danych.

#### Niska dostępność {#poor-availability}

Scentralizowane wyrocznie nie gwarantują, że dane spoza łańcucha zawsze będą dostępne dla innych inteligentnych kontraktów. Jeśli dostawca zdecyduje się na wyłączenie usługi lub haker przejmie władzę nad komponentem wyroczni poza łańcuchem, to inteligentny kontrakt będzie narażony na atak blokady usług (DoS).

#### Słaba zgodność zachęt {#poor-incentive-compatibility}

Scentralizowane wyrocznie często mają słabo zaprojektowane lub nieistniejące zachęty dla dostawców danych do przesyłania poprawnych/niezmienionych informacji. Płacenie wyroczni za poprawność nie gwarantuje uczciwości. Problem ten nasila się ze wzrostem wartości kontrolowanej przez inteligentne kontrakty.

### Wyrocznie zdecentralizowane {#decentralized-oracles}

Zdecentralizowane wyrocznie zostały zaprojektowane tak, aby przezwyciężać ograniczenia scentralizowanych wyroczni poprzez wyeliminowanie pojedynczych punktów awarii. Usługa zdecentralizowanej wyroczni obejmuje wielu uczestników w sieci peer-to-peer, którzy tworzą konsensus w sprawie danych spoza łańcucha przed wysłaniem ich do inteligentnego kontraktu.

Zdecentralizowana wyrocznia powinna (najlepiej) być pozbawiona uprawnień i zaufania oraz być wolna od administracji centralnej strony; w rzeczywistości decentralizacja wśród wyroczni jest w spektrum. Istnieją częściowo zdecentralizowane sieci wyroczni, w których każdy może uczestniczyć, ale z „właścicielem”, który zatwierdza i usuwa węzły na podstawie historycznej wydajności. Istnieją również w pełni zdecentralizowane sieci wyroczni, lecz te zazwyczaj działają jako osobne blockchainy i mają zdefiniowane mechanizmy konsensusu do koordynacji węzłów i karania niewłaściwego zachowania.

Używanie zdecentralizowanych wyroczni daje następujące korzyści:

### Wysokie gwarancje poprawności {#high-correctness-guarantees}

Zdecentralizowane wyrocznie próbują osiągnąć poprawność danych przy użyciu różnych podejść. W tym także używanie dowodów poświadczających autentyczność i integralność zwróconych informacji oraz
wymaganie wielu podmiotów na wspólne uzgodnienie ważności danych spoza łańcucha.

#### Dowody autentyczności {#authenticity-proofs}

Dowody autentyczności to kryptograficzne mechanizmy, które pozwalają na niezależną weryfikację informacji pozyskanych z zewnętrznych źródeł. Te dowody mogą zweryfikować źródło informacji oraz wykryć ewentualne zmiany danych po pozyskaniu.

Przykłady dowodów autentyczności:

**Dowody Transport Layer Security (TLS)**: Węzły wyroczni często pobierają dane z zewnętrznych źródeł za pomocą bezpiecznego połączenia HTTP opartego na protokole Transport Layer Security (TLS). Niektóre zdecentralizowane wyrocznie używają dowodów autentyczności do zweryfikowania sesji TLS (np. potwierdzenia wymiany informacji pomiędzy węzłem a konkretnym serwerem) i potwierdzenia, że treści sesji nie zostały zmienione.

**Poświadczenia Trusted Execution Environment (TEE)**: [Zaufane środowisko wykonawcze](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) to odizolowane środowisko obliczeniowe (sandbox), które jest odizolowane od procesów operacyjnych swojego systemu-hosta. TEE zapewniają, że jakikolwiek kod aplikacji lub dane przechowywane/wykorzystywane w środowisku obliczeniowym zachowują integralność, poufność oraz niezmienność. Użytkownicy mogą również wygenerować poświadczenie, aby udowodnić, że instancja aplikacji działa w zaufanym środowisku wykonawczym.

Niektóre klasy zdecentralizowanych wyroczni wymagają od operatorów węzłów wyroczni dostarczenia poświadczeń TEE. To potwierdza użytkownikowi, że operator węzła ma uruchomioną instancję klienta wyroczni w zaufanym środowisku wykonawczym. TEE zapobiegają zewnętrznym procesom na zmianę lub odczyt kodu i danych aplikacji, więc poświadczenia te potwierdzają, że węzeł wyroczni zachował informacje w stanie nienaruszonym oraz poufnym.

#### Walidacja informacji oparta na konsensusie {#consensus-based-validation-of-information}

Scentralizowane wyrocznie polegają na pojedynczym źródle prawdy podczas dostarczania danych do inteligentnych kontraktów, co daje możliwość publikowania niedokładnych informacji. Zdecentralizowane wyrocznie rozwiązują ten problem przez poleganie na wielu węzłach wyroczni do wyszukania informacji poza łańcuchem. Porównując dane z wielu źródeł, zdecentralizowane wyrocznie zmniejszają ryzyko podania nieprawidłowych informacji do kontraktów w łańcuchu.

Zdecentralizowane wyrocznie muszą jednak radzić sobie z rozbieżnością informacji pozyskiwanych od wielu źródeł poza łańcuchem. Aby zminimalizować różnice w informacjach oraz zapewnić, że dane przekazywane do kontraktu wyroczni odzwierciedlają wspólną opinię węzłów wyroczni, zdecentralizowane wyrocznie korzystają z następujących mechanizmów:

##### Głosowanie/stakowanie na dokładność danych

Niektóre sieci zdecentralizowanych wyroczni wymagają od uczestników głosowania lub stakowania na dokładność odpowiedzi na zapytanie o dane (np. „Kto wygrał wybory w USA w 2020 r.?”) przy użyciu natywnego tokena sieci. Protokół agregacji następnie agreguje głosy oraz stawki i bierze odpowiedź popieraną przez większość za prawidłową.

Węzły, których odpowiedzi odbiegają od odpowiedzi większości, zostają ukarane poprzez dystrybucję ich tokenów innym, którzy podali bardziej poprawne wartości. Zmuszanie węzłów do podawania obligacji przed dostarczeniem danych, zachęca do uczciwych odpowiedzi, ponieważ zakłada się, że są one ekonomicznie racjonalnymi podmiotami, którzy chcą maksymalizować swoje zyski.

Stakowanie/głosowanie chroni również zdecentralizowane wyrocznie przed [atakami Sybil](/glossary/#sybil-attack), w których złośliwi aktorzy tworzą wiele tożsamości, aby manipulować systemem konsensusu. Staking nie zapobiegnie jednak „pasożytowaniu” (kopiowaniu przez węzły wyroczni informacji od innych) oraz „leniwej walidacji” (podążaniu węzłów wyroczni za większością bez samodzielnego weryfikowania informacji).

##### Mechanizmy punktu Schellinga

[Punkt Schellinga](https://en.wikipedia.org/wiki/Focal_point_\(game_theory\)) to koncepcja z teorii gier, która zakłada, że wiele podmiotów w przypadku braku komunikacji zawsze wybierze domyślne wspólne rozwiązanie problemu. Mechanizmy punktu Schellinga są często wykorzystywane w sieciach zdecentralizowanych wyroczni, co pozwala węzłom osiągnięcie konsensusu w sprawie odpowiedzi na żądania danych.

Wczesnym pomysłem na to był [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/), proponowany kanał danych, w którym uczestnicy przesyłają odpowiedzi na pytania „skalarne” (pytania, na które odpowiedzi są opisywane przez wielkość, np. „jaka jest cena ETH?”) wraz z depozytem. Użytkownicy, którzy podadzą wartości mieszczące się między 25. a 75. [percentylem](https://en.wikipedia.org/wiki/Percentile), są nagradzani, podczas gdy ci, których wartości znacznie odbiegają od mediany, są karani.

Chociaż SchellingCoin dziś nie istnieje, wiele zdecentralizowanych wyroczni — w szczególności [Wyrocznie Protokołu Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module) — używa mechanizmu punktu Schellinga do poprawy dokładności danych z wyroczni. Każda wyrocznia Maker składa się z: poza łańcuchowej sieci P2P węzłów („przekaźników” i „kanałów”), które przesyłają ceny rynkowe aktywów zabezpieczających oraz kontraktu „Medianizera” w łańcuchu, który oblicza medianę wszystkich dostarczonych wartości. Po upływie określonego czasu opóźnienia wartość tej mediany staje się nową ceną referencyjną dla powiązanego aktywa.

Inne przykłady wyroczni, które wykorzystują mechanizmy punktu Schellinga, to [Chainlink Offchain Reporting](https://docs.chain.link/architecture-overview/off-chain-reporting) i [Witnet](https://witnet.io/). W obu systemach odpowiedzi od węzłów wyroczni w sieci peer-to-peer są agregowane w pojedynczą zagregowaną wartość, taką jak średnia lub mediana. Węzły zostają nagradzane lub karane w zależności od stopnia, w jakim ich odpowiedzi są zgodne lub odbiegają od zagregowanej wartości.

Mechanizmy punktu Schellinga są atrakcyjne, ponieważ minimalizują ślad w łańcuchu (musi zostać wysłana tylko jedna transakcja) jednocześnie gwarantując decentralizację. To ostatnie jest możliwe, ponieważ węzły muszą podpisać listę przesłanych odpowiedzi, zanim zostanie przekazana algorytmowi, który tworzy wartość średniej/mediany.

### Dostępność {#availability}

Usługi zdecentralizowanych wyroczni zapewniają wysoką dostępność danych spoza łańcucha inteligentnym kontraktom. Jest to osiągane poprzez decentralizację zarówno źródła informacji spoza łańcucha, jak i węzłów odpowiedzialnych za przenoszenie informacji w łańcuchu.

Zapewnia to tolerancję na błędy, ponieważ kontrakt wyroczni może polegać na wielu węzłach (które również polegają na wielu źródłach danych) w celu wykonania zapytań od innych kontraktów. Decentralizacja na poziomie źródła _i_ operatora węzła jest kluczowa — sieć węzłów wyroczni obsługująca informacje pobrane z tego samego źródła napotka ten sam problem co scentralizowana wyrocznia.

Możliwe jest również, aby wyrocznie oparte na stakowaniu odcinały operatorów węzłów, którzy nie reagują szybko na żądania danych. To znacznie zachęca węzły wyroczni do zainwestowania w odporną na awarię infrastrukturę oraz dostarczania danych na czas.

### Dobra zgodność zachęt {#good-incentive-compatibility}

Zdecentralizowane wyrocznie implementują różne projekty zachęt, aby zapobiec [bizantyjskiemu](https://en.wikipedia.org/wiki/Byzantine_fault) zachowaniu wśród węzłów wyroczni. W szczególności osiągają one _przypisywalność_ i _rozliczalność_:

1. Od węzłów zdecentralizowanych wyroczni wymaga się często podpisania danych, których dostarczają w odpowiedzi na żądania danych. Informacje te pomagają ocenić historyczną wydajność węzła wyroczni, dzięki czemu użytkownicy mogą
   odfiltrować niewiarygodne węzły wyroczni podczas wysyłania żądań danych. Przykładem jest [Algorytmiczny System Reputacji](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system) Witnet.

2. Zdecentralizowane wyrocznie, jak już wyjaśniliśmy wcześniej, mogą wymagać od węzłów postawienia stawki na ich pewność co do prawdziwości danych przesłanych przez nich. Jeśli dane się sprawdzą, ta stawka może zostać zwrócona wraz z nagrodami za uczciwą usługę. Może ona również zostać odcięta w przypadku, w którym informacje są nieprawidłowe, co zapewnia pewną miarę rozliczalności.

## Zastosowania wyroczni w inteligentnych kontraktach {#applications-of-oracles-in-smart-contracts}

Powszechnie przypadki użycia wyroczni w Ethereum:

### Pobieranie danych finansowych {#retrieving-financial-data}

Aplikacje [zdecentralizowanych finansów](/defi/) (DeFi) pozwalają na udzielanie pożyczek, pożyczanie i handel aktywami w modelu peer-to-peer. Często wymaga to zdobycia różnych informacji finansowych, w tym danych o kursie wymiany (do obliczania wartości fiducjarnej kryptowalut lub porównywania cen tokenów) oraz danych o rynkach kapitałowych (do obliczania wartości tokenizowanych aktywów, takich jak złoto lub dolar amerykański).

Na przykład protokół pożyczkowy DeFi musi sprawdzać bieżące ceny rynkowe aktywów (np. ETH) wpłaconych jako zabezpieczenie. Pozwala to kontraktowi na określenie wartości aktywów zabezpieczających oraz określić ile może pożyczyć z systemu.

Popularne „wyrocznie cenowe” (jak są często nazywane) w DeFi to między innymi Chainlink Price Feeds, [Open Price Feed](https://compound.finance/docs/prices) od Compound Protocol, [Time-Weighted Average Prices (TWAPs)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) od Uniswap oraz [Maker Oracles](https://docs.makerdao.com/smart-contract-modules/oracle-module).

Twórcy powinni zrozumieć zastrzeżenia, z jakimi związane są te wyrocznie cen przed zintegrowaniem ich do swojego projektu. Ten [artykuł](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/) zawiera szczegółową analizę tego, co należy wziąć pod uwagę, planując użycie którejkolwiek z wymienionych wyroczni cenowych.

Poniżej znajduje się przykład tego, w jaki sposób pozyskać najnowszą cenę ETH w inteligentnym kontrakcie przy użyciu kanału danych cen Chainlink:

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}
```

### Generowanie weryfikowalnej losowości {#generating-verifiable-randomness}

Niektóre blockchainowe aplikacje, takie jak gry lub programy loteryjne oparte na blockchainie, wymagają wysokiej nieprzewidywalności i losowości, aby efektywnie działać. Jednakże deterministyczne wykonanie blockchainów eliminuje losowość.

Pierwotne podejście polegało na użyciu pseudolosowych funkcji kryptograficznych, takich jak `blockhash`, ale mogły być one [manipulowane przez górników](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.) rozwiązujących algorytm dowodu pracy. Ponadto [przejście Ethereum na dowód stawki](/roadmap/merge/) oznacza, że deweloperzy nie mogą już polegać na `blockhash` w kwestii losowości w łańcuchu. Mechanizm [RANDAO](https://eth2book.info/altair/part2/building_blocks/randomness) Łańcucha Beacon zapewnia zamiast tego alternatywne źródło losowości.

Możliwe jest wygenerowanie losowej wartości poza łańcuchem i wysłanie jej w łańcuchu, ale to nakłada na użytkowników wysokie wymagania dotyczące zaufania. Muszą uwierzyć, że wartość została naprawdę wygenerowana przez nieprzewidywalny mechanizm i nie została zmieniona podczas jej przesyłania.

Wyrocznie zaprojektowane do obliczeń poza łańcuchem rozwiązują ten problem, poprzez bezpieczne generowanie losowych wyników poza łańcuchem, które następnie zostają udostępnione w łańcuchu wraz z kryptograficznymi dowodami poświadczającymi nieprzewidywalność procesu. Przykładem jest [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/) (Verifiable Random Function), który jest weryfikowalnie uczciwym i odpornym na manipulacje generatorem liczb losowych (RNG), przydatnym do budowania niezawodnych inteligentnych kontraktów dla aplikacji, które opierają się na nieprzewidywalnych wynikach.

### Uzyskiwanie wyników dla zdarzeń {#getting-outcomes-for-events}

Z wyroczniami, tworzenie inteligentnych kontraktów odpowiadających na zdarzenia w prawdziwym świecie jest łatwe. Usługi wyroczni umożliwiają to, pozwalając kontraktom na łączenie się z zewnętrznymi API poprzez komponenty poza łańcuchem oraz wykorzystanie informacji z tych źródeł danych. Dla przykładu wspomniana wcześniej zdecentralizowana aplikacja do przewidywań może zażądać od wyroczni zwrócenia wyników wyborów z zaufanego źródła poza łańcuchem (np. z Associated Press).

Używanie wyroczni do pozyskania danych opartych na wynikach w prawdziwym świecie umożliwia inne nowatorskie przypadki użycia, na przykład na zdecentralizowany produkt ubezpieczeniowy, który potrzebuje dokładnych danych o pogodzie, katastrofach itp., aby poprawnie działać.

### Automatyzacja inteligentnych kontraktów {#automating-smart-contracts}

Inteligentne kontrakty nie uruchamiają się automatycznie; raczej konto zewnętrzne (EOA) lub inne konto kontraktu musi wywołać odpowiednią funkcję, aby wykonać kod kontraktu. W większości przypadków większość funkcji kontraktu jest publiczna i może zostać wywołana przez EOA lub inne kontrakty.

Istnieją jednak również _funkcje prywatne_ w ramach kontraktu, które są niedostępne dla innych, ale które mają kluczowe znaczenie dla ogólnej funkcjonalności dapki. Przykłady obejmują funkcję `mintERC721Token()`, która okresowo mintuje nowe NFT dla użytkowników, funkcję przyznawania wypłat na rynku predykcyjnym lub funkcję odblokowywania stakowanych tokenów w DEX.

Deweloperzy będą musieli wywoływać takie funkcje w określonych odstępach czasowych, aby aplikacja działała płynnie. Może prowadzić to jednak do utraty sporej liczby godzin na żmudne dla deweloperów zadania, dlatego automatyzacja wykonywania inteligentnych kontraktów jest atrakcyjna.

Niektóre sieci zdecentralizowanych wyroczni oferują usługi automatyzacji, które pozwalają węzłom wyroczni poza łańcuchem na wywoływanie funkcji inteligentnych kontraktów według parametrów określonych przez użytkownika. Zazwyczaj wymaga to „zarejestrowania” docelowego kontraktu w usłudze wyroczni, zapewnienia środków do opłacenia operatora wyroczni oraz określenia warunków lub czasu, w którym ma zostać wywołany kontrakt.

[Keeper Network](https://chain.link/keepers) od Chainlink zapewnia inteligentnym kontraktom opcje zlecenia na zewnątrz regularnych zadań konserwacyjnych w sposób zminimalizowany pod względem zaufania i zdecentralizowany. Przeczytaj oficjalną [dokumentację Keeper](https://docs.chain.link/docs/chainlink-keepers/introduction/), aby uzyskać informacje na temat tego, jak uczynić swój kontrakt kompatybilnym z Keeper i jak korzystać z usługi Upkeep.

## Jak używać wyroczni blockchain {#use-blockchain-oracles}

Istnieje wiele aplikacji wyroczni, które możesz zintegrować do swojej zdecentralizowanej aplikacji na Ethereum:

**[Chainlink](https://chain.link/)** – _Zdecentralizowane sieci wyroczni Chainlink zapewniają odporne na manipulacje dane wejściowe, wyjściowe i obliczenia w celu obsługi zaawansowanych inteligentnych kontraktów na dowolnym blockchainie._

**[RedStone Oracles](https://redstone.finance/)** – _RedStone to zdecentralizowana, modułowa wyrocznia, która dostarcza zoptymalizowane pod kątem gazu kanały danych._ Specjalizuje się w udostępnianiu kanałów danych cen nowych aktywów, takich jak tokeny płynnego stakingu (LST), tokeny płynnego restakingu (LRT) czy pochodne stakowania Bitcoina._

**[Chronicle](https://chroniclelabs.org/)** – _Chronicle przezwycięża obecne ograniczenia transferu danych w łańcuchu poprzez rozwijanie prawdziwie skalowalnych, opłacalnych, zdecentralizowanych i weryfikowalnych wyroczni._

**[Witnet](https://witnet.io/)** – _Witnet to niewymagająca uprawnień, zdecentralizowana i odporna na cenzurę wyrocznia, która pomaga inteligentnym kontraktom reagować na zdarzenia ze świata rzeczywistego z silnymi gwarancjami kryptoekonomicznymi._

**[UMA Oracle](https://uma.xyz)** – _Optymistyczna wyrocznia UMA pozwala inteligentnym kontraktom szybko otrzymywać wszelkiego rodzaju dane dla różnych zastosowań, w tym ubezpieczeń, instrumentów pochodnych i rynków predykcyjnych._

**[Tellor](https://tellor.io/)** – _Tellor to przejrzysty i niewymagający uprawnień protokół wyroczni dla Twojego inteligentnego kontraktu, aby łatwo uzyskać dowolne dane, gdy tylko ich potrzebuje._

**[Band Protocol](https://bandprotocol.com/)** – _Band Protocol to międzyłańcuchowa platforma wyroczni danych, która agreguje i łączy dane ze świata rzeczywistego oraz interfejsy API z inteligentnymi kontraktami._

**[Pyth Network](https://pyth.network/)** – _Sieć Pyth to sieć wyroczni finansowych pierwszej strony, zaprojektowana do publikowania ciągłych danych ze świata rzeczywistego w łańcuchu, w środowisku odpornym na manipulacje, zdecentralizowanym i samowystarczalnym._

**[API3 DAO](https://www.api3.org/)** – _API3 DAO dostarcza rozwiązania wyroczni pierwszej strony, które zapewniają większą przejrzystość źródła, bezpieczeństwo i skalowalność w zdecentralizowanym rozwiązaniu dla inteligentnych kontraktów_

**[Supra](https://supra.com/)** – Pionowo zintegrowany zestaw narzędzi rozwiązań międzyłańcuchowych, które łączą wszystkie blockchainy, publiczne (L1 i L2) lub prywatne (dla przedsiębiorstw), dostarczając zdecentralizowane kanały cenowe wyroczni, które mogą być używane do zastosowań w łańcuchu i poza nim.

**[Gas Network](https://gas.network/)** – Rozproszona platforma wyroczni dostarczająca dane o cenach gazu w czasie rzeczywistym w całym blockchainie. Dostarczając dane od wiodących dostawców danych o cenach gazu do łańcucha, Gas Network pomaga w zapewnieniu interoperacyjności. Gas Network obsługuje dane dla ponad 35 łańcuchów, w tym Ethereum Mainnet i wiele wiodących L2.

## Dalsza lektura {#further-reading}

**Artykuły**

- [Czym jest wyrocznia blockchain?](https://chain.link/education/blockchain-oracles) – _Chainlink_
- [Czym jest wyrocznia blockchain?](https://medium.com/better-programming/what-is-a-blockchain-oracle-f5ccab8dbd72) – _Patrick Collins_
- [Zdecentralizowane wyrocznie: kompleksowy przegląd](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) – _Julien Thevenard_
- [Implementacja wyroczni blockchain na Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Dlaczego inteligentne kontrakty nie mogą wykonywać wywołań API?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) – _StackExchange_
- [Więc chcesz użyć wyroczni cenowej](https://samczsun.com/so-you-want-to-use-a-price-oracle/) – _samczsun_

**Filmy**

- [Wyrocznie i rozszerzenie użyteczności blockchain](https://youtu.be/BVUZpWa8vpw) – _Real Vision Finance_

**Samouczki**

- [Jak pobrać aktualną cenę Ethereum w Solidity](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) – _Chainlink_
- [Korzystanie z danych wyroczni](https://docs.chroniclelabs.org/Developers/tutorials/Remix) – _Chronicle_

**Przykładowe projekty**

- [Pełny projekt startowy Chainlink dla Ethereum w Solidity](https://github.com/hackbg/chainlink-fullstack) – _HackBG_
