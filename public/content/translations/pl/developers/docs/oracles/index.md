---
title: Wyrocznie
description: "Wyrocznie zapewniają inteligentnym kontraktom Ethereum dostęp do danych ze świata rzeczywistego, odblokowując więcej przypadków użycia i większą wartość dla użytkowników."
lang: pl
authors: ["Patrick Collins"]
---

Wyrocznie to aplikacje, które tworzą strumienie danych udostępniające pozałańcuchowe źródła danych dla inteligentnych kontraktów na blockchainie. Jest to konieczne, ponieważ inteligentne kontrakty oparte na Ethereum domyślnie nie mają dostępu do informacji przechowywanych poza siecią blockchain.

Zapewnienie inteligentnym kontraktom możliwości wykonywania się przy użyciu danych pozałańcuchowych rozszerza użyteczność i wartość zdecentralizowanych aplikacji (dapp). Na przykład rynki predykcyjne onchain polegają na wyroczniach w celu dostarczania informacji o wynikach, których używają do weryfikacji przewidywań użytkowników. Załóżmy, że Alice stawia 20 ETH na to, kto zostanie następnym prezydentem USA. W takim przypadku dapp rynku predykcyjnego potrzebuje wyroczni, aby potwierdzić wyniki wyborów i ustalić, czy Alice kwalifikuje się do wypłaty.

## Wymagania wstępne {#prerequisites}

Ta strona zakłada, że czytelnik jest zaznajomiony z podstawami [Ethereum](/), w tym z [węzłami](/developers/docs/nodes-and-clients/), [mechanizmami konsensusu](/developers/docs/consensus-mechanisms/) oraz [EVM](/developers/docs/evm/). Powinieneś również dobrze rozumieć [inteligentne kontrakty](/developers/docs/smart-contracts/) i [anatomię inteligentnych kontraktów](/developers/docs/smart-contracts/anatomy/), a w szczególności [zdarzenia](/glossary/#events).

## Czym jest wyrocznia blockchainowa? {#what-is-a-blockchain-oracle}

Wyrocznie to aplikacje, które pozyskują, weryfikują i przesyłają zewnętrzne informacje (tj. informacje przechowywane pozałańcuchowo) do inteligentnych kontraktów działających na blockchainie. Oprócz „pobierania” danych pozałańcuchowych i transmitowania ich w Ethereum, wyrocznie mogą również „wypychać” informacje z blockchaina do systemów zewnętrznych, np. odblokowując inteligentny zamek, gdy użytkownik wyśle opłatę za pośrednictwem transakcji Ethereum.

Bez wyroczni inteligentny kontrakt byłby całkowicie ograniczony do danych onchain.

Wyrocznie różnią się w zależności od źródła danych (jedno lub wiele źródeł), modeli zaufania (scentralizowane lub zdecentralizowane) oraz architektury systemu (natychmiastowy odczyt, publikuj-subskrybuj i żądanie-odpowiedź). Możemy również rozróżnić wyrocznie na podstawie tego, czy pobierają dane zewnętrzne do użytku przez kontrakty onchain (wyrocznie wejściowe), wysyłają informacje z blockchaina do aplikacji pozałańcuchowych (wyrocznie wyjściowe), czy też wykonują zadania obliczeniowe pozałańcuchowo (wyrocznie obliczeniowe).

## Dlaczego inteligentne kontrakty potrzebują wyroczni? {#why-do-smart-contracts-need-oracles}

Wielu programistów postrzega inteligentne kontrakty jako kod działający pod określonymi adresami na blockchainie. Jednak bardziej [ogólne spojrzenie na inteligentne kontrakty](/smart-contracts/) jest takie, że są to samowykonujące się programy komputerowe zdolne do egzekwowania umów między stronami po spełnieniu określonych warunków – stąd termin „inteligentne kontrakty”.

Ale używanie inteligentnych kontraktów do egzekwowania umów między ludźmi nie jest proste, biorąc pod uwagę, że Ethereum jest deterministyczne. [System deterministyczny](https://en.wikipedia.org/wiki/Deterministic_algorithm) to taki, który zawsze daje te same wyniki przy danym stanie początkowym i określonym wejściu, co oznacza, że nie ma losowości ani zmienności w procesie obliczania wyników na podstawie danych wejściowych.

Aby osiągnąć deterministyczne wykonanie, blockchainy ograniczają węzły do osiągania konsensusu w prostych pytaniach binarnych (prawda/fałsz) przy użyciu _tylko_ danych przechowywanych na samym blockchainie. Przykłady takich pytań obejmują:

- „Czy właściciel konta (zidentyfikowany przez klucz publiczny) podpisał tę transakcję za pomocą sparowanego klucza prywatnego?”
- „Czy to konto ma wystarczające środki na pokrycie transakcji?”
- „Czy ta transakcja jest ważna w kontekście tego inteligentnego kontraktu?” itp.

Gdyby blockchainy otrzymywały informacje ze źródeł zewnętrznych (tj. ze świata rzeczywistego), determinizm byłby niemożliwy do osiągnięcia, uniemożliwiając węzłom uzgodnienie ważności zmian stanu blockchaina. Weźmy na przykład inteligentny kontrakt, który wykonuje transakcję na podstawie bieżącego kursu wymiany ETH-USD uzyskanego z tradycyjnego API cenowego. Ta liczba prawdopodobnie będzie się często zmieniać (nie wspominając o tym, że API może zostać wycofane lub zhakowane), co oznacza, że węzły wykonujące ten sam kod kontraktu uzyskałyby różne wyniki.

Dla publicznego blockchaina, takiego jak Ethereum, z tysiącami węzłów na całym świecie przetwarzających transakcje, determinizm ma kluczowe znaczenie. Bez centralnego organu służącego jako źródło prawdy, węzły potrzebują mechanizmów do osiągnięcia tego samego stanu po zastosowaniu tych samych transakcji. Przypadek, w którym węzeł A wykonuje kod inteligentnego kontraktu i otrzymuje w wyniku „3”, podczas gdy węzeł B otrzymuje „7” po uruchomieniu tej samej transakcji, spowodowałby załamanie konsensusu i wyeliminowałby wartość Ethereum jako zdecentralizowanej platformy obliczeniowej.

Ten scenariusz podkreśla również problem z projektowaniem blockchainów w celu pobierania informacji ze źródeł zewnętrznych. Wyrocznie rozwiązują jednak ten problem, pobierając informacje ze źródeł pozałańcuchowych i przechowując je na blockchainie do wykorzystania przez inteligentne kontrakty. Ponieważ informacje przechowywane onchain są niezmienne i publicznie dostępne, węzły Ethereum mogą bezpiecznie używać danych pozałańcuchowych zaimportowanych przez wyrocznię do obliczania zmian stanu bez łamania konsensusu.

Aby to zrobić, wyrocznia zazwyczaj składa się z inteligentnego kontraktu działającego onchain i pewnych komponentów pozałańcuchowych. Kontrakt onchain otrzymuje żądania danych od innych inteligentnych kontraktów, które przekazuje do komponentu pozałańcuchowego (zwanego węzłem wyroczni). Ten węzeł wyroczni może odpytywać źródła danych – na przykład za pomocą interfejsów programowania aplikacji (API) – i wysyłać transakcje w celu przechowania żądanych danych w pamięci inteligentnego kontraktu.

Zasadniczo wyrocznia blockchainowa wypełnia lukę informacyjną między blockchainem a środowiskiem zewnętrznym, tworząc „hybrydowe inteligentne kontrakty”. Hybrydowy inteligentny kontrakt to taki, który funkcjonuje w oparciu o połączenie kodu kontraktu onchain i infrastruktury pozałańcuchowej. Zdecentralizowane rynki predykcyjne są doskonałym przykładem hybrydowych inteligentnych kontraktów. Inne przykłady mogą obejmować inteligentne kontrakty ubezpieczenia upraw, które wypłacają odszkodowanie, gdy zestaw wyroczni ustali, że miały miejsce określone zjawiska pogodowe.

## Czym jest problem wyroczni? {#the-oracle-problem}

Wyrocznie rozwiązują ważny problem, ale wprowadzają również pewne komplikacje, np.:

- Jak zweryfikować, czy wstrzyknięte informacje zostały wyodrębnione z właściwego źródła lub nie zostały zmanipulowane?

- Jak upewnić się, że te dane są zawsze dostępne i regularnie aktualizowane?

Tak zwany „problem wyroczni” ukazuje kwestie związane z używaniem wyroczni blockchainowych do wysyłania danych wejściowych do inteligentnych kontraktów. Dane z wyroczni muszą być poprawne, aby inteligentny kontrakt wykonał się poprawnie. Co więcej, konieczność „ufania” operatorom wyroczni w kwestii dostarczania dokładnych informacji podważa aspekt inteligentnych kontraktów jako niewymagających zaufania.

Różne wyrocznie oferują różne rozwiązania problemu wyroczni, które zbadamy później. Wyrocznie są zazwyczaj oceniane pod kątem tego, jak dobrze radzą sobie z następującymi wyzwaniami:

1. **Poprawność**: Wyrocznia nie powinna powodować, że inteligentne kontrakty wyzwalają zmiany stanu na podstawie nieprawidłowych danych pozałańcuchowych. Wyrocznia musi gwarantować _autentyczność_ i _integralność_ danych. Autentyczność oznacza, że dane zostały pobrane z właściwego źródła, podczas gdy integralność oznacza, że dane pozostały nienaruszone (tj. nie zostały zmienione) przed wysłaniem onchain.

2. **Dostępność**: Wyrocznia nie powinna opóźniać ani uniemożliwiać inteligentnym kontraktom wykonywania akcji i wyzwalania zmian stanu. Oznacza to, że dane z wyroczni muszą być _dostępne na żądanie_ bez przerw.

3. **Zgodność zachęt**: Wyrocznia powinna zachęcać dostawców danych pozałańcuchowych do przesyłania poprawnych informacji do inteligentnych kontraktów. Zgodność zachęt obejmuje _przypisywalność_ i _rozliczalność_. Przypisywalność pozwala na powiązanie fragmentu zewnętrznej informacji z jej dostawcą, podczas gdy rozliczalność wiąże dostawców danych z informacjami, które podają, dzięki czemu mogą być nagradzani lub karani na podstawie jakości dostarczonych informacji.

## Jak działa usługa wyroczni blockchainowej? {#how-does-a-blockchain-oracle-service-work}

### Użytkownicy {#users}

Użytkownicy to podmioty (tj. inteligentne kontrakty), które potrzebują informacji zewnętrznych w stosunku do blockchaina, aby wykonać określone działania. Podstawowy przepływ pracy usługi wyroczni rozpoczyna się od wysłania przez użytkownika żądania danych do kontraktu wyroczni. Żądania danych zazwyczaj odpowiadają na niektóre lub wszystkie z poniższych pytań:

1. Z jakimi źródłami mogą konsultować się węzły pozałańcuchowe w celu uzyskania żądanych informacji?

2. W jaki sposób raportujący przetwarzają informacje ze źródeł danych i wyodrębniają użyteczne punkty danych?

3. Ile węzłów wyroczni może uczestniczyć w pobieraniu danych?

4. Jak należy zarządzać rozbieżnościami w raportach wyroczni?

5. Jaką metodę należy wdrożyć w filtrowaniu zgłoszeń i agregowaniu raportów w jedną wartość?

### Kontrakt wyroczni {#oracle-contract}

Kontrakt wyroczni to komponent onchain dla usługi wyroczni. Nasłuchuje żądań danych z innych kontraktów, przekazuje zapytania o dane do węzłów wyroczni i transmituje zwrócone dane do kontraktów klienckich. Ten kontrakt może również wykonywać pewne obliczenia na zwróconych punktach danych w celu wygenerowania zagregowanej wartości do wysłania do kontraktu żądającego.

Kontrakt wyroczni udostępnia pewne funkcje, które kontrakty klienckie wywołują podczas składania żądania danych. Po otrzymaniu nowego zapytania inteligentny kontrakt wyemituje [zdarzenie logu](/developers/docs/smart-contracts/anatomy/#events-and-logs) ze szczegółami żądania danych. Powiadamia to węzły pozałańcuchowe subskrybujące log (zazwyczaj przy użyciu czegoś w rodzaju polecenia JSON-RPC `eth_subscribe`), które przystępują do pobierania danych zdefiniowanych w zdarzeniu logu.

Poniżej znajduje się [przykładowy kontrakt wyroczni](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) autorstwa Pedro Costy. Jest to prosta usługa wyroczni, która może odpytywać pozałańcuchowe API na żądanie innych inteligentnych kontraktów i przechowywać żądane informacje na blockchainie:

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //lista żądań wysłanych do kontraktu
  uint currentId = 0; //rosnący identyfikator żądania
  uint minQuorum = 2; //minimalna liczba odpowiedzi do otrzymania przed ogłoszeniem ostatecznego wyniku
  uint totalOracleCount = 3; // Zakodowana na sztywno liczba wyroczni

  // definiuje ogólne żądanie API
  struct Request {
    uint id;                            //identyfikator żądania
    string urlToQuery;                  //adres URL API
    string attributeToFetch;            //atrybut json (klucz) do pobrania w odpowiedzi
    string agreedValue;                 //wartość z klucza
    mapping(uint => string) answers;     //odpowiedzi dostarczone przez wyrocznie
    mapping(address => uint) quorum;    //wyrocznie, które zapytają o odpowiedź (1=wyrocznia nie głosowała, 2=wyrocznia głosowała)
  }

  //zdarzenie, które wyzwala wyrocznię poza blockchainem
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //wyzwalane, gdy osiągnięto konsensus co do ostatecznego wyniku
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

    // Zakodowane na sztywno adresy wyroczni
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // uruchom zdarzenie do wykrycia przez wyrocznię poza blockchainem
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // zwiększ identyfikator żądania
    currentId++;
  }

  //wywoływane przez wyrocznię w celu zapisania jej odpowiedzi
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //sprawdź, czy wyrocznia znajduje się na liście zaufanych wyroczni
    //i czy wyrocznia jeszcze nie głosowała
    if(currRequest.quorum[address(msg.sender)] == 1){

      //oznaczanie, że ten adres zagłosował
      currRequest.quorum[msg.sender] = 2;

      //iteruj przez "tablicę" odpowiedzi, aż pozycja będzie wolna, i zapisz pobraną wartość
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //znajdź pierwsze puste miejsce
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //iteruj przez listę wyroczni i sprawdź, czy wystarczająca liczba wyroczni (minimalne kworum)
      //zagłosowała na tę samą odpowiedź co obecna
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

Węzeł wyroczni to pozałańcuchowy komponent usługi wyroczni. Wyodrębnia informacje ze źródeł zewnętrznych, takich jak API hostowane na serwerach stron trzecich, i umieszcza je onchain do wykorzystania przez inteligentne kontrakty. Węzły wyroczni nasłuchują zdarzeń z kontraktu wyroczni onchain i przystępują do wykonania zadania opisanego w logu.

Częstym zadaniem węzłów wyroczni jest wysyłanie żądania [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) do usługi API, parsowanie odpowiedzi w celu wyodrębnienia odpowiednich danych, formatowanie do wyjścia czytelnego dla blockchaina i wysyłanie go onchain poprzez włączenie go do transakcji do kontraktu wyroczni. Węzeł wyroczni może być również zobowiązany do poświadczenia ważności i integralności przesłanych informacji za pomocą „dowodów autentyczności”, które zbadamy później.

Wyrocznie obliczeniowe polegają również na węzłach pozałańcuchowych do wykonywania zadań obliczeniowych, które byłyby niepraktyczne do wykonania onchain, biorąc pod uwagę koszty gazu i limity rozmiaru bloku. Na przykład węzeł wyroczni może mieć za zadanie wygenerowanie weryfikowalnie losowej liczby (np. dla gier opartych na blockchainie).

## Wzorce projektowe wyroczni {#oracle-design-patterns}

Wyrocznie występują w różnych typach, w tym _natychmiastowy odczyt_, _publikuj-subskrybuj_ i _żądanie-odpowiedź_, przy czym dwa ostatnie są najpopularniejsze wśród inteligentnych kontraktów Ethereum. Tutaj krótko opisujemy modele publikuj-subskrybuj i żądanie-odpowiedź.

### Wyrocznie publikuj-subskrybuj {#publish-subscribe-oracles}

Ten typ wyroczni udostępnia „strumień danych”, z którego inne kontrakty mogą regularnie odczytywać informacje. Oczekuje się, że dane w tym przypadku będą się często zmieniać, więc kontrakty klienckie muszą nasłuchiwać aktualizacji danych w pamięci wyroczni. Przykładem jest wyrocznia, która dostarcza użytkownikom najnowsze informacje o cenie ETH-USD.

### Wyrocznie żądanie-odpowiedź {#request-response-oracles}

Konfiguracja żądanie-odpowiedź pozwala kontraktowi klienckiemu na żądanie dowolnych danych innych niż te dostarczane przez wyrocznię publikuj-subskrybuj. Wyrocznie żądanie-odpowiedź są idealne, gdy zestaw danych jest zbyt duży, aby można go było przechowywać w pamięci inteligentnego kontraktu, i/lub użytkownicy będą potrzebować tylko niewielkiej części danych w dowolnym momencie.

Chociaż bardziej złożone niż modele publikuj-subskrybuj, wyrocznie żądanie-odpowiedź są w zasadzie tym, co opisaliśmy w poprzedniej sekcji. Wyrocznia będzie miała komponent onchain, który odbiera żądanie danych i przekazuje je do węzła pozałańcuchowego w celu przetworzenia.

Użytkownicy inicjujący zapytania o dane muszą pokryć koszt pobrania informacji ze źródła pozałańcuchowego. Kontrakt kliencki musi również zapewnić środki na pokrycie kosztów gazu poniesionych przez kontrakt wyroczni w związku ze zwróceniem odpowiedzi za pośrednictwem funkcji wywołania zwrotnego określonej w żądaniu.

## Scentralizowane a zdecentralizowane wyrocznie {#types-of-oracles}

### Scentralizowane wyrocznie {#centralized-oracles}

Scentralizowana wyrocznia jest kontrolowana przez pojedynczy podmiot odpowiedzialny za agregowanie informacji pozałańcuchowych i aktualizowanie danych kontraktu wyroczni zgodnie z żądaniem. Scentralizowane wyrocznie są wydajne, ponieważ opierają się na jednym źródle prawdy. Mogą one funkcjonować lepiej w przypadkach, gdy zastrzeżone zestawy danych są publikowane bezpośrednio przez właściciela z powszechnie akceptowanym podpisem. Przynoszą one jednak również wady:

#### Niskie gwarancje poprawności {#low-correctness-guarantees}

W przypadku scentralizowanych wyroczni nie ma sposobu na potwierdzenie, czy dostarczone informacje są poprawne, czy nie. Nawet „renomowani” dostawcy mogą zacząć działać na szkodę lub zostać zhakowani. Jeśli wyrocznia ulegnie uszkodzeniu, inteligentne kontrakty będą wykonywane na podstawie błędnych danych.

#### Słaba dostępność {#poor-availability}

Scentralizowane wyrocznie nie gwarantują, że zawsze będą udostępniać dane pozałańcuchowe innym inteligentnym kontraktom. Jeśli dostawca zdecyduje się wyłączyć usługę lub haker przejmie pozałańcuchowy komponent wyroczni, Twój inteligentny kontrakt jest narażony na atak typu odmowa usługi (DoS).

#### Słaba zgodność zachęt {#poor-incentive-compatibility}

Scentralizowane wyrocznie często mają źle zaprojektowane lub nieistniejące zachęty dla dostawcy danych do wysyłania dokładnych/niezmienionych informacji. Płacenie wyroczni za poprawność nie gwarantuje uczciwości. Ten problem staje się tym większy, im bardziej rośnie ilość wartości kontrolowanej przez inteligentne kontrakty.

### Zdecentralizowane wyrocznie {#decentralized-oracles}

Zdecentralizowane wyrocznie zostały zaprojektowane w celu przezwyciężenia ograniczeń scentralizowanych wyroczni poprzez wyeliminowanie pojedynczych punktów awarii. Zdecentralizowana usługa wyroczni składa się z wielu uczestników w sieci peer-to-peer, którzy osiągają konsensus w sprawie danych pozałańcuchowych przed wysłaniem ich do inteligentnego kontraktu.

Zdecentralizowana wyrocznia powinna (idealnie) być niewymagająca pozwoleń, niewymagająca zaufania i wolna od administracji przez stronę centralną; w rzeczywistości decentralizacja wśród wyroczni znajduje się na spektrum. Istnieją na wpół zdecentralizowane sieci wyroczni, w których każdy może uczestniczyć, ale z „właścicielem”, który zatwierdza i usuwa węzły na podstawie historycznych wyników. Istnieją również w pełni zdecentralizowane sieci wyroczni: zazwyczaj działają one jako samodzielne blockchainy i mają zdefiniowane mechanizmy konsensusu do koordynowania węzłów i karania za niewłaściwe zachowanie.

Korzystanie ze zdecentralizowanych wyroczni wiąże się z następującymi korzyściami:

### Wysokie gwarancje poprawności {#high-correctness-guarantees}

Zdecentralizowane wyrocznie próbują osiągnąć poprawność danych przy użyciu różnych podejść. Obejmuje to wykorzystanie dowodów poświadczających autentyczność i integralność zwróconych informacji oraz wymaganie od wielu podmiotów zbiorowego uzgodnienia ważności danych pozałańcuchowych.

#### Dowody autentyczności {#authenticity-proofs}

Dowody autentyczności to mechanizmy kryptograficzne, które umożliwiają niezależną weryfikację informacji pobranych ze źródeł zewnętrznych. Dowody te mogą zweryfikować źródło informacji i wykryć ewentualne zmiany w danych po ich pobraniu.

Przykłady dowodów autentyczności obejmują:

**Dowody Transport Layer Security (TLS)**: Węzły wyroczni często pobierają dane ze źródeł zewnętrznych przy użyciu bezpiecznego połączenia HTTP opartego na protokole Transport Layer Security (TLS). Niektóre zdecentralizowane wyrocznie używają dowodów autentyczności do weryfikacji sesji TLS (tj. potwierdzenia wymiany informacji między węzłem a określonym serwerem) i potwierdzenia, że zawartość sesji nie została zmieniona.

**Poświadczenia Trusted Execution Environment (TEE)**: [Zaufane środowisko wykonawcze](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) to izolowane środowisko obliczeniowe (sandbox), które jest odseparowane od procesów operacyjnych systemu hosta. TEE zapewniają, że jakikolwiek kod aplikacji lub dane przechowywane/używane w środowisku obliczeniowym zachowują integralność, poufność i niezmienność. Użytkownicy mogą również wygenerować poświadczenie, aby udowodnić, że instancja aplikacji działa w zaufanym środowisku wykonawczym.

Niektóre klasy zdecentralizowanych wyroczni wymagają od operatorów węzłów wyroczni dostarczenia poświadczeń TEE. Potwierdza to użytkownikowi, że operator węzła uruchamia instancję klienta wyroczni w zaufanym środowisku wykonawczym. TEE zapobiegają zmianie lub odczytowi kodu i danych aplikacji przez procesy zewnętrzne, stąd te poświadczenia dowodzą, że węzeł wyroczni zachował informacje w stanie nienaruszonym i poufnym.

#### Oparta na konsensusie walidacja informacji {#consensus-based-validation-of-information}

Scentralizowane wyrocznie opierają się na jednym źródle prawdy podczas dostarczania danych do inteligentnych kontraktów, co wprowadza możliwość publikowania niedokładnych informacji. Zdecentralizowane wyrocznie rozwiązują ten problem, polegając na wielu węzłach wyroczni w celu odpytywania informacji pozałańcuchowych. Porównując dane z wielu źródeł, zdecentralizowane wyrocznie zmniejszają ryzyko przekazania nieprawidłowych informacji do kontraktów onchain.

Zdecentralizowane wyrocznie muszą jednak radzić sobie z rozbieżnościami w informacjach pobieranych z wielu źródeł pozałańcuchowych. Aby zminimalizować różnice w informacjach i upewnić się, że dane przekazywane do kontraktu wyroczni odzwierciedlają zbiorową opinię węzłów wyroczni, zdecentralizowane wyrocznie wykorzystują następujące mechanizmy:

##### Głosowanie/staking na dokładność danych

Niektóre zdecentralizowane sieci wyroczni wymagają od uczestników głosowania lub stakowania na dokładność odpowiedzi na zapytania o dane (np. „Kto wygrał wybory w USA w 2020 r.?”) przy użyciu natywnego tokena sieci. Protokół agregacji następnie agreguje głosy i stawki i przyjmuje odpowiedź popieraną przez większość jako ważną.

Węzły, których odpowiedzi odbiegają od odpowiedzi większości, są karane poprzez dystrybucję ich tokenów do innych, którzy podają bardziej poprawne wartości. Zmuszanie węzłów do wniesienia kaucji przed dostarczeniem danych zachęca do uczciwych odpowiedzi, ponieważ zakłada się, że są one racjonalnymi podmiotami gospodarczymi dążącymi do maksymalizacji zysków.

Staking/głosowanie chroni również zdecentralizowane wyrocznie przed [atakami Sybil](/glossary/#sybil-attack), w których złośliwi aktorzy tworzą wiele tożsamości, aby oszukać system konsensusu. Jednak staking nie może zapobiec „jeździe na gapę” (węzły wyroczni kopiujące informacje od innych) i „leniwej walidacji” (węzły wyroczni podążające za większością bez samodzielnej weryfikacji informacji).

##### Mechanizmy punktu Schellinga

[Punkt Schellinga](<https://en.wikipedia.org/wiki/Focal_point_(game_theory)>) to koncepcja z teorii gier, która zakłada, że wiele podmiotów zawsze domyślnie wybierze wspólne rozwiązanie problemu w przypadku braku jakiejkolwiek komunikacji. Mechanizmy punktu Schellinga są często używane w zdecentralizowanych sieciach wyroczni, aby umożliwić węzłom osiągnięcie konsensusu w sprawie odpowiedzi na żądania danych.

Wczesnym pomysłem na to był [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed), proponowany strumień danych, w którym uczestnicy przesyłają odpowiedzi na pytania „skalarne” (pytania, na które odpowiedzi są opisywane przez wielkość, np. „jaka jest cena ETH?”), wraz z depozytem. Użytkownicy, którzy podają wartości między 25. a 75. [percentylem](https://en.wikipedia.org/wiki/Percentile), są nagradzani, podczas gdy ci, których wartości znacznie odbiegają od mediany, są karani.

Chociaż SchellingCoin dzisiaj nie istnieje, wiele zdecentralizowanych wyroczni – w szczególności [Wyrocznie Protokołu Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module) – używa mechanizmu punktu Schellinga w celu poprawy dokładności danych wyroczni. Każda Wyrocznia Maker składa się z pozałańcuchowej sieci P2P węzłów („przekaźników” i „strumieni”), które przesyłają ceny rynkowe dla aktywów stanowiących zabezpieczenie, oraz kontraktu onchain „Medianizer”, który oblicza medianę wszystkich podanych wartości. Po upływie określonego okresu opóźnienia ta wartość mediany staje się nową ceną referencyjną dla powiązanego aktywa.

Inne przykłady wyroczni, które wykorzystują mechanizmy punktu Schellinga, to [Chainlink Offchain Reporting](https://docs.chain.link/architecture-overview/off-chain-reporting) i [Witnet](https://witnet.io/). W obu systemach odpowiedzi z węzłów wyroczni w sieci peer-to-peer są agregowane w jedną zagregowaną wartość, taką jak średnia lub mediana. Węzły są nagradzane lub karane w zależności od tego, w jakim stopniu ich odpowiedzi są zgodne z zagregowaną wartością lub od niej odbiegają.

Mechanizmy punktu Schellinga są atrakcyjne, ponieważ minimalizują ślad onchain (wystarczy wysłać tylko jedną transakcję), jednocześnie gwarantując decentralizację. To drugie jest możliwe, ponieważ węzły muszą podpisać listę przesłanych odpowiedzi, zanim zostanie ona wprowadzona do algorytmu, który generuje wartość średnią/medianę.

### Dostępność {#availability}

Zdecentralizowane usługi wyroczni zapewniają wysoką dostępność danych pozałańcuchowych dla inteligentnych kontraktów. Osiąga się to poprzez decentralizację zarówno źródła informacji pozałańcuchowych, jak i węzłów odpowiedzialnych za przesyłanie informacji onchain.

Zapewnia to odporność na błędy, ponieważ kontrakt wyroczni może polegać na wielu węzłach (które również polegają na wielu źródłach danych) w celu wykonywania zapytań z innych kontraktów. Decentralizacja na poziomie źródła _i_ operatora węzła ma kluczowe znaczenie – sieć węzłów wyroczni obsługująca informacje pobrane z tego samego źródła napotka ten sam problem, co scentralizowana wyrocznia.

Możliwe jest również, aby wyrocznie oparte na stawkach dokonywały cięcia operatorów węzłów, którzy nie reagują szybko na żądania danych. To znacznie zachęca węzły wyroczni do inwestowania w infrastrukturę odporną na błędy i dostarczania danych w odpowiednim czasie.

### Dobra zgodność zachęt {#good-incentive-compatibility}

Zdecentralizowane wyrocznie wdrażają różne projekty zachęt, aby zapobiec zachowaniom [bizantyjskim](https://en.wikipedia.org/wiki/Byzantine_fault) wśród węzłów wyroczni. W szczególności osiągają one _przypisywalność_ i _rozliczalność_:

1. Zdecentralizowane węzły wyroczni są często zobowiązane do podpisywania danych, które dostarczają w odpowiedzi na żądania danych. Informacje te pomagają w ocenie historycznych wyników węzłów wyroczni, dzięki czemu użytkownicy mogą odfiltrować niewiarygodne węzły wyroczni podczas składania żądań danych. Przykładem jest [Algorytmiczny System Reputacji](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system) Witnet.

2. Zdecentralizowane wyrocznie – jak wyjaśniono wcześniej – mogą wymagać od węzłów wniesienia stawki na ich pewność co do prawdziwości przesyłanych danych. Jeśli roszczenie się potwierdzi, stawka ta może zostać zwrócona wraz z nagrodami za uczciwą obsługę. Ale może również zostać poddana cięciu w przypadku, gdy informacje są nieprawidłowe, co zapewnia pewną miarę rozliczalności.

## Zastosowania wyroczni w inteligentnych kontraktach {#applications-of-oracles-in-smart-contracts}

Poniżej przedstawiono typowe przypadki użycia wyroczni w Ethereum:

### Pobieranie danych finansowych {#retrieving-financial-data}

Aplikacje [zdecentralizowanych finansów](/defi/) (DeFi) pozwalają na pożyczanie, zaciąganie pożyczek i handel aktywami peer-to-peer. Często wymaga to uzyskania różnych informacji finansowych, w tym danych o kursach wymiany (do obliczania wartości fiducjarnej kryptowalut lub porównywania cen tokenów) oraz danych z rynków kapitałowych (do obliczania wartości stokenizowanych aktywów, takich jak złoto lub dolar amerykański).

Na przykład protokół pożyczkowy DeFi musi odpytywać o bieżące ceny rynkowe aktywów (np. ETH) zdeponowanych jako zabezpieczenie. Pozwala to kontraktowi określić wartość aktywów stanowiących zabezpieczenie i ustalić, ile może pożyczyć z systemu.

Popularne „wyrocznie cenowe” (jak się je często nazywa) w DeFi to Chainlink Price Feeds, [Open Price Feed](https://compound.finance/docs/prices) Protokołu Compound, [Time-Weighted Average Prices (TWAPs)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) Uniswap oraz [Wyrocznie Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module).

Twórcy powinni zrozumieć zastrzeżenia związane z tymi wyroczniami cenowymi przed zintegrowaniem ich ze swoim projektem. Ten [artykuł](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/) zawiera szczegółową analizę tego, co należy wziąć pod uwagę planując użycie którejkolwiek z wymienionych wyroczni cenowych.

Poniżej znajduje się przykład tego, jak można pobrać najnowszą cenę ETH w inteligentnym kontrakcie za pomocą strumienia cen Chainlink:

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Sieć: Kovan
     * Agregator: ETH/USD
     * Adres: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * Zwraca najnowszą cenę
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

Niektóre aplikacje blockchainowe, takie jak gry oparte na blockchainie lub systemy loterii, wymagają wysokiego poziomu nieprzewidywalności i losowości, aby działać skutecznie. Jednak deterministyczne wykonanie blockchainów eliminuje losowość.

Początkowym podejściem było użycie pseudolosowych funkcji kryptograficznych, takich jak `blockhash`, ale mogły one być [manipulowane przez górników](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.) rozwiązujących algorytm dowodu pracy (PoW). Ponadto [przejście Ethereum na dowód stawki (PoS)](/roadmap/merge/) oznacza, że programiści nie mogą już polegać na `blockhash` w kwestii losowości onchain. Zamiast tego mechanizm [RANDAO](https://eth2book.info/altair/part2/building_blocks/randomness) Beacon Chain zapewnia alternatywne źródło losowości.

Możliwe jest wygenerowanie losowej wartości pozałańcuchowo i wysłanie jej onchain, ale zrobienie tego nakłada na użytkowników wysokie wymagania dotyczące zaufania. Muszą oni wierzyć, że wartość została naprawdę wygenerowana za pomocą nieprzewidywalnych mechanizmów i nie została zmieniona w tranzycie.

Wyrocznie zaprojektowane do obliczeń pozałańcuchowych rozwiązują ten problem, bezpiecznie generując losowe wyniki pozałańcuchowo, które transmitują onchain wraz z dowodami kryptograficznymi poświadczającymi nieprzewidywalność procesu. Przykładem jest [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/) (Verifiable Random Function), który jest weryfikowalnie uczciwym i odpornym na manipulacje generatorem liczb losowych (RNG) przydatnym do budowania niezawodnych inteligentnych kontraktów dla aplikacji, które opierają się na nieprzewidywalnych wynikach.

### Uzyskiwanie wyników dla zdarzeń {#getting-outcomes-for-events}

Dzięki wyroczniom tworzenie inteligentnych kontraktów, które reagują na zdarzenia ze świata rzeczywistego, jest łatwe. Usługi wyroczni umożliwiają to, pozwalając kontraktom na łączenie się z zewnętrznymi API za pośrednictwem komponentów pozałańcuchowych i konsumowanie informacji z tych źródeł danych. Na przykład wspomniany wcześniej dapp predykcyjny może zażądać od wyroczni zwrócenia wyników wyborów z zaufanego źródła pozałańcuchowego (np. Associated Press).

Używanie wyroczni do pobierania danych na podstawie wyników ze świata rzeczywistego umożliwia inne nowatorskie przypadki użycia; na przykład zdecentralizowany produkt ubezpieczeniowy potrzebuje dokładnych informacji o pogodzie, katastrofach itp., aby działać skutecznie.

### Automatyzacja inteligentnych kontraktów {#automating-smart-contracts}

Inteligentne kontrakty nie uruchamiają się automatycznie; raczej konto posiadane zewnętrznie (EOA) lub inne konto kontraktu musi wyzwolić odpowiednie funkcje, aby wykonać kod kontraktu. W większości przypadków większość funkcji kontraktu jest publiczna i może być wywoływana przez EOA i inne kontrakty.

Ale w ramach kontraktu istnieją również _funkcje prywatne_, które są niedostępne dla innych, ale które mają kluczowe znaczenie dla ogólnej funkcjonalności dappa. Przykłady obejmują funkcję `mintERC721Token()`, która okresowo wybiją nowe NFT dla użytkowników, funkcję przyznawania wypłat na rynku predykcyjnym lub funkcję odblokowywania stakowanych tokenów na DEX.

Programiści będą musieli wyzwalać takie funkcje w odstępach czasu, aby aplikacja działała płynnie. Może to jednak prowadzić do utraty większej liczby godzin na przyziemne zadania dla programistów, dlatego automatyzacja wykonywania inteligentnych kontraktów jest atrakcyjna.

Niektóre zdecentralizowane sieci wyroczni oferują usługi automatyzacji, które pozwalają pozałańcuchowym węzłom wyroczni na wyzwalanie funkcji inteligentnych kontraktów zgodnie z parametrami zdefiniowanymi przez użytkownika. Zazwyczaj wymaga to „zarejestrowania” docelowego kontraktu w usłudze wyroczni, zapewnienia środków na opłacenie operatora wyroczni oraz określenia warunków lub czasów wyzwolenia kontraktu.

[Sieć Keeper](https://chain.link/keepers) Chainlink zapewnia inteligentnym kontraktom opcje zlecania regularnych zadań konserwacyjnych na zewnątrz w sposób zdecentralizowany i minimalizujący potrzebę zaufania. Przeczytaj oficjalną [dokumentację Keeper](https://docs.chain.link/docs/chainlink-keepers/introduction/), aby uzyskać informacje na temat tego, jak sprawić, by Twój kontrakt był kompatybilny z Keeper i jak korzystać z usługi Upkeep.

## Jak korzystać z wyroczni blockchainowych {#use-blockchain-oracles}

Istnieje wiele aplikacji wyroczni, które możesz zintegrować ze swoim dappem Ethereum:

**[Chainlink](https://chain.link/)** - _Zdecentralizowane sieci wyroczni Chainlink zapewniają odporne na manipulacje wejścia, wyjścia i obliczenia w celu obsługi zaawansowanych inteligentnych kontraktów na dowolnym blockchainie._

**[RedStone Oracles](https://redstone.finance/)** - _RedStone to zdecentralizowana modułowa wyrocznia, która zapewnia zoptymalizowane pod kątem gazu strumienie danych. Specjalizuje się w oferowaniu strumieni cen dla wschodzących aktywów, takich jak tokeny płynnego stakingu (LST), tokeny płynnego restakingu (LRT) i instrumenty pochodne stakingu Bitcoin._

**[Chronicle](https://chroniclelabs.org/)** - _Chronicle przezwycięża obecne ograniczenia przesyłania danych onchain, opracowując prawdziwie skalowalne, opłacalne, zdecentralizowane i weryfikowalne wyrocznie._

**[Witnet](https://witnet.io/)** - _Witnet to niewymagająca pozwoleń, zdecentralizowana i odporna na cenzurę wyrocznia pomagająca inteligentnym kontraktom reagować na zdarzenia ze świata rzeczywistego z silnymi gwarancjami kryptoekonomicznymi._

**[UMA Oracle](https://uma.xyz)** - _Optymistyczna wyrocznia UMA pozwala inteligentnym kontraktom szybko otrzymywać dowolnego rodzaju dane dla różnych aplikacji, w tym ubezpieczeń, finansowych instrumentów pochodnych i rynków predykcyjnych._

**[Tellor](https://tellor.io/)** - _Tellor to przejrzysty i niewymagający pozwoleń protokół wyroczni dla Twojego inteligentnego kontraktu, aby łatwo uzyskać dowolne dane, kiedy tylko ich potrzebuje._

**[Band Protocol](https://bandprotocol.com/)** - _Band Protocol to międzyłańcuchowa platforma wyroczni danych, która agreguje i łączy dane ze świata rzeczywistego oraz API z inteligentnymi kontraktami._

**[Pyth Network](https://pyth.network/)** - _Sieć Pyth to sieć finansowych wyroczni pierwszej strony zaprojektowana do ciągłego publikowania danych ze świata rzeczywistego onchain w odpornym na manipulacje, zdecentralizowanym i samowystarczalnym środowisku._

**[API3 DAO](https://api3.org/)** - _API3 DAO dostarcza rozwiązania wyroczni pierwszej strony, które zapewniają większą przejrzystość źródła, bezpieczeństwo i skalowalność w zdecentralizowanym rozwiązaniu dla inteligentnych kontraktów_

**[Supra](https://supra.com/)** - Pionowo zintegrowany zestaw narzędzi rozwiązań międzyłańcuchowych, które łączą wszystkie blockchainy, publiczne (L1 i L2) lub prywatne (przedsiębiorstwa), zapewniając zdecentralizowane strumienie cen wyroczni, które mogą być używane w przypadkach użycia onchain i pozałańcuchowych. 

**[Gas Network](https://gas.network/)** - Rozproszona platforma wyroczni dostarczająca dane o cenie gazu w czasie rzeczywistym w całym blockchainie. Przenosząc dane od wiodących dostawców danych o cenie gazu onchain, Gas Network pomaga napędzać interoperacyjność. Gas Network obsługuje dane dla ponad 35 łańcuchów, w tym sieci głównej Ethereum i wielu wiodących L2.

**[DIA](https://www.diadata.org/)** - Międzyłańcuchowa sieć wyroczni dostarczająca weryfikowalne strumienie danych dla ponad 20 000 aktywów we wszystkich głównych klasach aktywów. DIA pozyskuje surowe dane handlowe bezpośrednio z ponad 100 rynków pierwotnych i oblicza je onchain, zapewniając pełną przejrzystość i weryfikowalność danych z niestandardowymi konfiguracjami dla każdego przypadku użycia.

**[Stork](https://stork.network)** - Stork dostarcza dane cenowe z bardzo niskimi opóźnieniami, obsługując szeroki zakres przypadków użycia, w tym rynki kontraktów perpetual, protokoły pożyczkowe i ekosystemy DeFi, z nowymi aktywami obsługiwanymi szybko po wejściu na giełdę.

## Dalsza lektura {#further-reading}

**Artykuły**

- [Czym jest wyrocznia blockchainowa?](https://chain.link/education/blockchain-oracles) — _Chainlink_
- [Czym jest wyrocznia blockchainowa?](https://medium.com/better-programming/what-is-a-blockchain-oracle-f5ccab8dbd72) — _Patrick Collins_
- [Zdecentralizowane wyrocznie: kompleksowy przegląd](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) — _Julien Thevenard_
- [Wdrażanie wyroczni blockchainowej w Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Dlaczego inteligentne kontrakty nie mogą wykonywać wywołań API?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) — _StackExchange_
- [Więc chcesz użyć wyroczni cenowej](https://samczsun.com/so-you-want-to-use-a-price-oracle/) — _samczsun_

**Filmy**

- [Wyrocznie i ekspansja użyteczności blockchaina](https://youtu.be/BVUZpWa8vpw) — _Real Vision Finance_

**Samouczki**

- [Jak pobrać aktualną cenę Ethereum w Solidity](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) — _Chainlink_
- [Konsumowanie danych wyroczni](https://docs.chroniclelabs.org/Developers/tutorials/Remix) — _Chronicle_
- [Wyzwanie wyroczni](https://speedrunethereum.com/challenge/oracles) - _Speedrun Ethereum_

**Przykładowe projekty**

- [Pełny projekt startowy Chainlink dla Ethereum w Solidity](https://github.com/hackbg/chainlink-fullstack) — _HackBG_
