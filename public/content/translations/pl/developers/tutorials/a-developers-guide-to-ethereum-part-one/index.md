---
title: "Wprowadzenie do Ethereum dla programistów Pythona, część 1"
description: "Wprowadzenie do programowania w Ethereum, szczególnie przydatne dla osób znających język programowania Python"
author: Marc Garreau
lang: pl
tags:
  - python
  - web3.py
skill: beginner
breadcrumb: Ethereum z Pythonem
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

Słyszałeś więc o tym całym Ethereum i jesteś gotów wskoczyć do króliczej nory? Ten artykuł szybko omówi podstawy blockchaina, a następnie pozwoli ci na interakcję z symulowanym węzłem Ethereum – odczytywanie danych bloku, sprawdzanie sald kont i wysyłanie transakcji. Po drodze zwrócimy uwagę na różnice między tradycyjnymi sposobami budowania aplikacji a tym nowym, zdecentralizowanym paradygmatem.

## (Miękkie) wymagania wstępne {#soft-prerequisites}

Ten artykuł ma być przystępny dla szerokiego grona programistów. Wykorzystane zostaną [narzędzia Pythona](/developers/docs/programming-languages/python/), ale są one tylko nośnikiem pomysłów – nie ma problemu, jeśli nie jesteś programistą Pythona. Poczynię jednak kilka założeń dotyczących tego, co już wiesz, abyśmy mogli szybko przejść do kwestii specyficznych dla Ethereum.

Założenia:

- Potrafisz poruszać się w terminalu,
- Napisałeś kilka linijek kodu w Pythonie,
- Masz zainstalowanego Pythona w wersji 3.6 lub nowszej (zdecydowanie zaleca się korzystanie ze [środowiska wirtualnego](https://realpython.com/effective-python-environment/#virtual-environments)), oraz
- używałeś `pip`, instalatora pakietów Pythona.
  Ponownie, jeśli którekolwiek z tych założeń nie jest prawdziwe lub nie planujesz odtwarzać kodu z tego artykułu, prawdopodobnie i tak bez problemu nadążysz za materiałem.

## Blockchainy w skrócie {#blockchains-briefly}

Istnieje wiele sposobów na opisanie Ethereum, ale w jego sercu znajduje się blockchain. Blockchainy składają się z serii bloków, więc zacznijmy od tego. W najprostszych słowach, każdy blok na blockchainie Ethereum to po prostu pewne metadane i lista transakcji. W formacie JSON wygląda to mniej więcej tak:

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   ...,
   "transactions": [...]
}
```

Każdy [blok](/developers/docs/blocks/) ma odniesienie do bloku, który go poprzedzał; `parentHash` to po prostu hash poprzedniego bloku.

<FeaturedText>Uwaga: Ethereum regularnie korzysta z <a href="https://wikipedia.org/wiki/Hash_function">funkcji hashujących</a> do tworzenia wartości o stałym rozmiarze („hashy”). Hashe odgrywają ważną rolę w Ethereum, ale na razie możesz o nich myśleć jak o unikalnych identyfikatorach.</FeaturedText>

![A diagram depicting a blockchain including the data inside  each block](./blockchain-diagram.png)

_Blockchain to w zasadzie lista powiązana; każdy blok ma odniesienie do poprzedniego bloku._

Ta struktura danych nie jest niczym nowym, ale zasady (tj. protokoły peer-to-peer), które rządzą siecią, już tak. Nie ma tu centralnego organu; sieć węzłów musi współpracować, aby utrzymać sieć, i konkurować, aby zdecydować, które transakcje zostaną włączone do następnego bloku. Więc kiedy chcesz wysłać trochę pieniędzy znajomemu, musisz rozgłosić tę transakcję w sieci, a następnie poczekać, aż zostanie włączona do nadchodzącego bloku.

Jedynym sposobem, w jaki blockchain może zweryfikować, czy pieniądze zostały faktycznie wysłane od jednego użytkownika do drugiego, jest użycie waluty natywnej dla tego blockchaina (tj. stworzonej i zarządzanej przez niego). W Ethereum ta waluta nazywa się ether, a blockchain Ethereum zawiera jedyny oficjalny rejestr sald kont.

## Nowy paradygmat {#a-new-paradigm}

Ten nowy, zdecentralizowany stos technologiczny zrodził nowe narzędzia dla programistów. Takie narzędzia istnieją w wielu językach programowania, ale my spojrzymy na nie przez pryzmat Pythona. Powtórzę: nawet jeśli Python nie jest twoim ulubionym językiem, nadążanie za materiałem nie powinno sprawić ci większych problemów.

Programiści Pythona, którzy chcą wejść w interakcję z Ethereum, prawdopodobnie sięgną po [Web3.py](https://web3py.readthedocs.io/). Web3.py to biblioteka, która znacznie upraszcza sposób łączenia się z węzłem Ethereum, a następnie wysyłania i odbierania z niego danych.

<FeaturedText>Uwaga: Pojęcia „węzeł Ethereum” i „klient Ethereum” są używane zamiennie. W obu przypadkach odnoszą się do oprogramowania uruchamianego przez uczestnika sieci Ethereum. Oprogramowanie to może odczytywać dane bloków, otrzymywać aktualizacje po dodaniu nowych bloków do łańcucha, rozgłaszać nowe transakcje i nie tylko. Technicznie rzecz biorąc, klient to oprogramowanie, a węzeł to komputer, na którym to oprogramowanie jest uruchomione.</FeaturedText>

[Klienci Ethereum](/developers/docs/nodes-and-clients/) mogą być skonfigurowani tak, aby byli osiągalni przez [IPC](https://wikipedia.org/wiki/Inter-process_communication), HTTP lub Websockets, więc Web3.py będzie musiał odzwierciedlać tę konfigurację. Web3.py określa te opcje połączeń jako **dostawców** (providers). Będziesz musiał wybrać jednego z trzech dostawców, aby połączyć instancję Web3.py ze swoim węzłem.

![A diagram showing how web3.py uses IPC to connect your application to an Ethereum node](./web3py-and-nodes.png)

_Skonfiguruj węzeł Ethereum i Web3.py do komunikacji za pomocą tego samego protokołu, np. IPC na tym schemacie._

Gdy Web3.py jest odpowiednio skonfigurowany, możesz rozpocząć interakcję z blockchainem. Oto kilka przykładów użycia Web3.py jako zapowiedź tego, co nas czeka:

```python
# odczytaj dane bloku:
w3.eth.get_block('latest')

# wyślij transakcję:
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## Instalacja {#installation}

W tym przewodniku będziemy pracować tylko w interpreterze Pythona. Nie będziemy tworzyć żadnych katalogów, plików, klas ani funkcji.

<FeaturedText>Uwaga: W poniższych przykładach polecenia zaczynające się od `$` są przeznaczone do uruchomienia w terminalu. (Nie wpisuj `$`, oznacza to tylko początek wiersza).</FeaturedText>

Najpierw zainstaluj [IPython](https://ipython.org/), aby uzyskać przyjazne dla użytkownika środowisko do eksploracji. IPython oferuje między innymi uzupełnianie po wciśnięciu klawisza Tab, co znacznie ułatwia sprawdzenie, co jest możliwe w Web3.py.

```bash
pip install ipython
```

Web3.py jest publikowany pod nazwą `web3`. Zainstaluj go w ten sposób:

```bash
pip install web3
```

Jeszcze jedno – później będziemy symulować blockchain, co wymaga kilku dodatkowych zależności. Możesz je zainstalować za pomocą:

```bash
pip install 'web3[tester]'
```

Wszystko gotowe!

Uwaga: Pakiet `web3[tester]` działa do wersji Pythona 3.10.xx

## Uruchomienie piaskownicy {#spin-up-a-sandbox}

Otwórz nowe środowisko Pythona, uruchamiając `ipython` w terminalu. Jest to porównywalne z uruchomieniem `python`, ale ma więcej dodatkowych funkcji.

```bash
ipython
```

Spowoduje to wydrukowanie informacji o uruchomionych wersjach Pythona i IPythona, a następnie powinieneś zobaczyć znak zachęty oczekujący na wprowadzenie danych:

```python
In [1]:
```

Patrzysz teraz na interaktywną powłokę Pythona. Zasadniczo jest to piaskownica do zabawy. Jeśli dotarłeś tak daleko, nadszedł czas na zaimportowanie Web3.py:

```python
In [1]: from web3 import Web3
```

## Wprowadzenie do modułu Web3 {#introducing-the-web3-module}

Oprócz bycia bramą do Ethereum, moduł [Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api) oferuje kilka wygodnych funkcji. Przyjrzyjmy się kilku z nich.

W aplikacji Ethereum często będziesz musiał przeliczać nominały walut. Moduł Web3 udostępnia do tego kilka metod pomocniczych: [from_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.from_wei) i [to_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_wei).

<FeaturedText>
Uwaga: Komputery są powszechnie znane z tego, że słabo radzą sobie z matematyką dziesiętną. Aby to obejść, programiści często przechowują kwoty w dolarach jako centy. Na przykład przedmiot o cenie 5,99 USD może być przechowywany w bazie danych jako 599.

Podobny wzorzec jest używany podczas obsługi transakcji w <b>etherze</b>. Jednak zamiast dwóch miejsc po przecinku, ether ma ich 18! Najmniejszy nominał etheru nazywa się <b>wei</b>, więc to właśnie ta wartość jest określana podczas wysyłania transakcji.

1 ether = 1000000000000000000 wei

1 wei = 0.000000000000000001 ether

</FeaturedText>

Spróbuj przekonwertować niektóre wartości na i z wei. Zauważ, że [istnieją nazwy dla wielu nominałów](https://web3py.readthedocs.io/en/stable/troubleshooting.html#how-do-i-convert-currency-denominations) pomiędzy etherem a wei. Jednym z lepiej znanych jest **gwei**, ponieważ często w ten sposób reprezentowane są opłaty transakcyjne.

```python
In [2]: Web3.to_wei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.from_wei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Inne metody narzędziowe w module Web3 obejmują konwertery formatów danych (np. [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)), funkcje pomocnicze dla adresów (np. [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)) oraz funkcje hashujące (np. [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)). Wiele z nich zostanie omówionych w dalszej części serii. Aby wyświetlić wszystkie dostępne metody i właściwości, skorzystaj z autouzupełniania IPythona, wpisując `Web3`. i naciskając dwukrotnie klawisz Tab po kropce.

## Rozmowa z łańcuchem {#talk-to-the-chain}

Wygodne metody są świetne, ale przejdźmy do blockchaina. Następnym krokiem jest skonfigurowanie Web3.py do komunikacji z węzłem Ethereum. Mamy tu możliwość skorzystania z dostawców IPC, HTTP lub Websocket.

Nie będziemy podążać tą ścieżką, ale przykład kompletnego przepływu pracy z użyciem dostawcy HTTP (HTTP Provider) mógłby wyglądać mniej więcej tak:

- Pobierz węzeł Ethereum, np. [Geth](https://geth.ethereum.org/).
- Uruchom Geth w jednym oknie terminala i poczekaj na synchronizację sieci. Domyślny port HTTP to `8545`, ale można go skonfigurować.
- Poinformuj Web3.py, aby połączył się z węzłem przez HTTP, na porcie `localhost:8545`.
  `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- Użyj instancji `w3` do interakcji z węzłem.

Chociaż jest to jeden z „prawdziwych” sposobów, proces synchronizacji trwa godzinami i jest niepotrzebny, jeśli chcesz tylko środowiska programistycznego. Web3.py udostępnia w tym celu czwartego dostawcę, **EthereumTesterProvider**. Ten dostawca testowy łączy się z symulowanym węzłem Ethereum z luźniejszymi uprawnieniami i fałszywą walutą do zabawy.

![A diagram showing the EthereumTesterProvider linking your web3.py application to a simulated Ethereum node](./ethereumtesterprovider.png)

_EthereumTesterProvider łączy się z symulowanym węzłem i jest przydatny w szybkich środowiskach programistycznych._

Ten symulowany węzeł nazywa się [eth-tester](https://github.com/ethereum/eth-tester) i zainstalowaliśmy go jako część polecenia `pip install web3[tester]`. Skonfigurowanie Web3.py do korzystania z tego dostawcy testowego jest tak proste, jak:

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

Teraz jesteś gotowy na surfowanie po łańcuchu! Nikt tak nie mówi. Właśnie to wymyśliłem. Zróbmy krótką wycieczkę.

## Krótka wycieczka {#the-quick-tour}

Po pierwsze, test poprawności (sanity check):

```python
In [5]: w3.is_connected()
Out[5]: True
```

Ponieważ używamy dostawcy testowego, nie jest to zbyt wartościowy test, ale jeśli się nie powiedzie, prawdopodobnie wpisałeś coś źle podczas tworzenia instancji zmiennej `w3`. Upewnij się, że uwzględniłeś wewnętrzne nawiasy, tj. `Web3.EthereumTesterProvider()`.

## Przystanek nr 1: [konta](/developers/docs/accounts/) {#tour-stop-1-accounts}

Dla wygody dostawca testowy utworzył kilka kont i wstępnie załadował je testowym etherem.

Najpierw zobaczmy listę tych kont:

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

Jeśli uruchomisz to polecenie, powinieneś zobaczyć listę dziesięciu ciągów znaków zaczynających od `0x`. Każdy z nich to **adres publiczny** i pod pewnymi względami jest analogiczny do numeru konta rozliczeniowego. Podałbyś ten adres komuś, kto chciałby wysłać ci ether.

Jak wspomniano, dostawca testowy wstępnie załadował każde z tych kont testowym etherem. Sprawdźmy, ile znajduje się na pierwszym koncie:

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

To dużo zer! Zanim zaczniesz śmiać się w drodze do fałszywego banku, przypomnij sobie wcześniejszą lekcję o nominałach walut. Wartości etheru są reprezentowane w najmniejszym nominale, wei. Przelicz to na ether:

```python
In [8]: w3.from_wei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

Milion testowych etherów — wciąż nieźle.

## Przystanek nr 2: dane bloku {#tour-stop-2-block-data}

Rzućmy okiem na stan tego symulowanego blockchaina:

```python
In [9]: w3.eth.get_block('latest')
Out[9]: AttributeDict({
   'number': 0,
   'hash': HexBytes('0x9469878...'),
   'parentHash': HexBytes('0x0000000...'),
   ...
   'transactions': []
})
```

Zwracanych jest wiele informacji o bloku, ale warto zwrócić uwagę na kilka rzeczy:

- Numer bloku to zero — bez względu na to, jak dawno temu skonfigurowałeś dostawcę testowego. W przeciwieństwie do prawdziwej sieci Ethereum, która dodaje nowy blok co 12 sekund, ta symulacja będzie czekać, aż dasz jej coś do zrobienia.
- `transactions` to pusta lista z tego samego powodu: jeszcze nic nie zrobiliśmy. Ten pierwszy blok to **pusty blok**, służący tylko do zapoczątkowania łańcucha.
- Zauważ, że `parentHash` to tylko zbiór pustych bajtów. Oznacza to, że jest to pierwszy blok w łańcuchu, znany również jako **blok genezy**.

## Przystanek nr 3: [transakcje](/developers/docs/transactions/) {#tour-stop-3-transactions}

Utknęliśmy na bloku zerowym, dopóki nie pojawi się oczekująca transakcja, więc dodajmy jedną. Wyślij kilka testowych etherów z jednego konta na drugie:

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.to_wei(3, 'ether'),
   'gas': 21000
})
```

Zazwyczaj w tym momencie musiałbyś poczekać kilka sekund, aż twoja transakcja zostanie włączona do nowego bloku. Pełny proces wygląda mniej więcej tak:

1. Prześlij transakcję i zachowaj hash transakcji. Dopóki blok zawierający transakcję nie zostanie utworzony i rozgłoszony, transakcja jest „oczekująca”.
   `tx_hash = w3.eth.send_transaction({ … })`
2. Poczekaj, aż transakcja zostanie włączona do bloku:
   `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. Kontynuuj logikę aplikacji. Aby wyświetlić udaną transakcję:
   `w3.eth.get_transaction(tx_hash)`

Nasze symulowane środowisko natychmiast doda transakcję w nowym bloku, dzięki czemu możemy od razu ją wyświetlić:

```python
In [11]: w3.eth.get_transaction(tx_hash)
Out[11]: AttributeDict({
   'hash': HexBytes('0x15e9fb95dc39...'),
   'blockNumber': 1,
   'transactionIndex': 0,
   'from': '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
   'to': '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
   'value': 3000000000000000000,
   ...
})
```

Zobaczysz tu kilka znajomych szczegółów: pola `from`, `to` i `value` powinny pasować do danych wejściowych naszego wywołania `send_transaction`. Innym pocieszającym faktem jest to, że ta transakcja została włączona jako pierwsza transakcja (`'transactionIndex': 0`) w bloku numer 1.

Możemy również łatwo zweryfikować sukces tej transakcji, sprawdzając salda dwóch zaangażowanych kont. Trzy ethery powinny zostać przeniesione z jednego na drugie.

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999979000000000000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

To drugie wygląda dobrze! Saldo wzrosło z 1 000 000 do 1 000 003 etherów. Ale co stało się z pierwszym kontem? Wygląda na to, że straciło nieco więcej niż trzy ethery. Niestety, w życiu nie ma nic za darmo, a korzystanie z publicznej sieci Ethereum wymaga zrekompensowania innym węzłom ich roli wspierającej. Z konta, które przesłało transakcję, potrącono niewielką opłatę transakcyjną - opłata ta to ilość spalonego gazu (21000 jednostek gazu za transfer ETH) pomnożona przez opłatę podstawową, która różni się w zależności od aktywności sieci, plus opłata priorytetowa, która trafia do walidatora włączającego transakcję do bloku.

Więcej o [gazie](/developers/docs/gas/#post-london)

<FeaturedText>Uwaga: W sieci publicznej opłaty transakcyjne są zmienne w zależności od zapotrzebowania sieci i tego, jak szybko chcesz, aby transakcja została przetworzona. Jeśli interesuje cię zestawienie sposobu obliczania opłat, zapoznaj się z moim wcześniejszym artykułem na temat tego, <a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">jak transakcje są włączane do bloku</a>.</FeaturedText>

## I odetchnij {#and-breathe}

Zajmujemy się tym już od jakiegoś czasu, więc wydaje się to równie dobrym miejscem na przerwę, jak każde inne. Królicza nora ciągnie się dalej, a my będziemy kontynuować eksplorację w drugiej części tej serii. Niektóre z nadchodzących koncepcji: łączenie się z prawdziwym węzłem, inteligentne kontrakty i tokeny. Masz dodatkowe pytania? Daj mi znać! Twoja opinia wpłynie na to, w jakim kierunku pójdziemy dalej. Prośby mile widziane za pośrednictwem [Twittera](https://twitter.com/wolovim).