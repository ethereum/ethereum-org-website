---
title: "Wprowadzenie do Ethereum dla programistów Pythona, część 1"
description: "Wprowadzenie do tworzenia aplikacji na Ethereum, szczególnie przydatne dla osób znających język programowania Python"
author: Marc Garreau
lang: pl
tags: [ "python", "web3.py" ]
skill: beginner
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

Słyszałeś więc o tym całym Ethereum i jesteś gotów, by zanurzyć się w króliczej norze? Ten post szybko omówi podstawy technologii blockchain, a następnie pozwoli Ci na interakcję z symulowanym węzłem Ethereum – odczytywanie danych bloków, sprawdzanie sald kont i wysyłanie transakcji. Po drodze podkreślimy różnice między tradycyjnymi sposobami tworzenia aplikacji a tym nowym, zdecentralizowanym paradygmatem.

## Wymagania (nieobowiązkowe) {#soft-prerequisites}

Ten post ma być przystępny dla szerokiego grona deweloperów. Użyte zostaną [narzędzia Pythona](/developers/docs/programming-languages/python/), ale są one tylko nośnikiem dla idei – nie ma problemu, jeśli nie jesteś deweloperem Pythona. Poczynię jednak kilka założeń na temat tego, co już wiesz, abyśmy mogli szybko przejść do fragmentów specyficznych dla Ethereum.

Założenia:

- Potrafisz poruszać się w terminalu,
- Napisałeś kilka linijek kodu w Pythonie,
- Masz zainstalowaną wersję Pythona 3.6 lub nowszą na swoim komputerze (zdecydowanie zalecane jest użycie [środowiska wirtualnego](https://realpython.com/effective-python-environment/#virtual-environments)), oraz
- używałeś `pip`, instalatora pakietów Pythona.
  Jeszcze raz, jeśli któreś z tych założeń jest nieprawdziwe lub nie planujesz odtwarzać kodu z tego artykułu, prawdopodobnie i tak bez problemu sobie poradzisz.

## Blockchain w skrócie {#blockchains-briefly}

Istnieje wiele sposobów na opisanie Ethereum, ale w jego sercu leży blockchain. Blockchainy składają się z serii bloków, więc zacznijmy od tego. W najprostszych słowach, każdy blok w blockchainie Ethereum to tylko trochę metadanych i lista transakcji. W formacie JSON wygląda to mniej więcej tak:

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   ...,
   "transactions": [...]
}
```

Każdy [blok](/developers/docs/blocks/) ma odniesienie do bloku, który był przed nim; `parentHash` to po prostu hasz poprzedniego bloku.

<FeaturedText>Uwaga: Ethereum regularnie używa <a href="https://wikipedia.org/wiki/Hash_function">funkcji haszujących</a> do tworzenia wartości o stałym rozmiarze („haszy”). Hasze odgrywają ważną rolę w Ethereum, ale na razie możesz bezpiecznie myśleć o nich jako o unikalnych identyfikatorach.</FeaturedText>

![Diagram przedstawiający blockchain, w tym dane wewnątrz każdego bloku](./blockchain-diagram.png)

_Blockchain to w zasadzie lista połączona; każdy blok ma odniesienie do poprzedniego bloku._

Ta struktura danych nie jest niczym nowym, ale zasady (tj. protokoły peer-to-peer), które rządzą siecią, już tak. Nie ma centralnego organu; sieć peerów musi współpracować, aby utrzymać sieć i konkurować, aby zdecydować, które transakcje zostaną uwzględnione w następnym bloku. Więc kiedy chcesz wysłać pieniądze do znajomego, musisz rozgłosić tę transakcję w sieci, a następnie poczekać, aż zostanie ona uwzględniona w nadchodzącym bloku.

Jedynym sposobem, w jaki blockchain może zweryfikować, że pieniądze zostały faktycznie wysłane od jednego użytkownika do drugiego, jest użycie waluty natywnej dla tego blockchaina (tj. stworzonej i zarządzanej przez niego). W Ethereum waluta ta nazywa się ether, a blockchain Ethereum zawiera jedyny oficjalny rejestr sald kont.

## Nowy paradygmat {#a-new-paradigm}

Ten nowy zdecentralizowany stos technologiczny dał początek nowym narzędziom deweloperskim. Takie narzędzia istnieją w wielu językach programowania, ale my będziemy patrzeć przez pryzmat Pythona. Powtórzmy: nawet jeśli Python nie jest Twoim ulubionym językiem, nie powinno być problemu ze śledzeniem treści.

Deweloperzy Pythona, którzy chcą wejść w interakcję z Ethereum, prawdopodobnie sięgną po [Web3.py](https://web3py.readthedocs.io/). Web3.py to biblioteka, która znacznie upraszcza sposób łączenia się z węzłem Ethereum, a następnie wysyłania i odbierania z niego danych.

<FeaturedText>Uwaga: „Węzeł Ethereum” i „klient Ethereum” są używane zamiennie. W obu przypadkach odnosi się to do oprogramowania, które uruchamia uczestnik sieci Ethereum. To oprogramowanie może odczytywać dane bloków, otrzymywać aktualizacje, gdy nowe bloki są dodawane do łańcucha, rozgłaszać nowe transakcje i nie tylko. Technicznie rzecz biorąc, klient to oprogramowanie, a węzeł to komputer, na którym działa to oprogramowanie.</FeaturedText>

[Klienci Ethereum](/developers/docs/nodes-and-clients/) mogą być skonfigurowani tak, aby byli osiągalni przez [IPC](https://wikipedia.org/wiki/Inter-process_communication), HTTP lub Websockets, więc Web3.py będzie musiało odzwierciedlać tę konfigurację. Web3.py odnosi się do tych opcji połączenia jako **dostawcy** (providers). Będziesz musiał wybrać jednego z trzech dostawców, aby połączyć instancję Web3.py ze swoim węzłem.

![Diagram pokazujący, jak web3.py używa IPC do połączenia Twojej aplikacji z węzłem Ethereum](./web3py-and-nodes.png)

_Skonfiguruj węzeł Ethereum i Web3.py do komunikacji za pomocą tego samego protokołu, np. IPC na tym diagramie._

Gdy Web3.py jest poprawnie skonfigurowane, możesz zacząć wchodzić w interakcję z blockchainem. Oto kilka przykładów użycia Web3.py jako zapowiedź tego, co nadchodzi:

```python
# odczytaj dane bloku:
w3.eth.get_block('latest')

# wyślij transakcję:
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## Instalacja {#installation}

W tym przewodniku będziemy pracować tylko w interpreterze Pythona. Nie będziemy tworzyć żadnych katalogów, plików, klas ani funkcji.

<FeaturedText>Uwaga: w poniższych przykładach polecenia, które zaczynają się od `$`, są przeznaczone do uruchomienia w terminalu. (Nie wpisuj znaku `$`, on tylko oznacza początek linii.)</FeaturedText>

Najpierw zainstaluj [IPython](https://ipython.org/), aby uzyskać przyjazne dla użytkownika środowisko do eksploracji. IPython oferuje między innymi uzupełnianie tabulatorem, co znacznie ułatwia sprawdzenie, co jest możliwe w Web3.py.

```bash
pip install ipython
```

Web3.py jest publikowane pod nazwą `web3`. Zainstaluj go w ten sposób:

```bash
pip install web3
```

Jeszcze jedno – później będziemy symulować blockchain, co wymaga kilku dodatkowych zależności. Możesz je zainstalować za pomocą:

```bash
pip install 'web3[tester]'
```

Wszystko gotowe!

Uwaga: Pakiet `web3[tester]` działa z Pythonem do wersji 3.10.xx

## Uruchomienie piaskownicy {#spin-up-a-sandbox}

Otwórz nowe środowisko Pythona, uruchamiając `ipython` w terminalu. Jest to porównywalne z uruchomieniem `python`, ale z większą liczbą dodatków.

```bash
ipython
```

Spowoduje to wydrukowanie informacji o wersjach Pythona i IPythona, których używasz, a następnie powinieneś zobaczyć monit oczekujący na dane wejściowe:

```python
In [1]:
```

Patrzysz teraz na interaktywną powłokę Pythona. Zasadniczo jest to piaskownica do zabawy. Jeśli dotarłeś tak daleko, czas zaimportować Web3.py:

```python
In [1]: from web3 import Web3
```

## Wprowadzenie do modułu Web3 {#introducing-the-web3-module}

Oprócz tego, że jest bramą do Ethereum, moduł [Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api) oferuje kilka wygodnych funkcji. Przyjrzyjmy się kilku z nich.

W aplikacji Ethereum często będziesz musiał konwertować nominały walut. Moduł Web3 udostępnia do tego celu kilka metod pomocniczych: [from_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.from_wei) i [to_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_wei).

<FeaturedText>
Uwaga: Komputery są notorycznie złe w obsłudze arytmetyki dziesiętnej. Aby obejść ten problem, deweloperzy często przechowują kwoty w dolarach jako centy. Na przykład przedmiot o cenie 5,99 USD może być przechowywany w bazie danych jako 599.

Podobny wzorzec jest używany podczas obsługi transakcji w <b>etherze</b>. Jednak zamiast dwóch miejsc po przecinku, ether ma ich 18! Najmniejszy nominał etheru nazywa się <b>wei</b>, więc jest to wartość określana podczas wysyłania transakcji.

1 ether = 1000000000000000000 wei

1 wei = 0,000000000000000001 ether

</FeaturedText>

Spróbuj przekonwertować niektóre wartości na wei i z wei. Zauważ, że [istnieją nazwy dla wielu nominałów](https://web3py.readthedocs.io/en/stable/troubleshooting.html#how-do-i-convert-currency-denominations) pomiędzy etherem a wei. Jednym z bardziej znanych jest **gwei**, ponieważ często w ten sposób przedstawiane są opłaty transakcyjne.

```python
In [2]: Web3.to_wei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.from_wei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Inne metody narzędziowe w module Web3 obejmują konwertery formatu danych (np. [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)), pomocników adresów (np. [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)) i funkcje haszujące (np. [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)). Wiele z nich zostanie omówionych w dalszej części serii. Aby wyświetlić wszystkie dostępne metody i właściwości, skorzystaj z autouzupełniania w IPython, wpisując `Web3`. i naciskając dwukrotnie klawisz tabulacji po kropce.

## Porozmawiaj z łańcuchem {#talk-to-the-chain}

Metody pomocnicze są świetne, ale przejdźmy do blockchaina. Następnym krokiem jest skonfigurowanie Web3.py do komunikacji z węzłem Ethereum. Tutaj mamy możliwość korzystania z dostawców IPC, HTTP lub Websocket.

Nie będziemy podążać tą ścieżką, ale przykład kompletnego przepływu pracy z użyciem dostawcy HTTP może wyglądać mniej więcej tak:

- Pobierz węzeł Ethereum, np. [Geth](https://geth.ethereum.org/).
- Uruchom Geth w jednym oknie terminala i poczekaj, aż zsynchronizuje się z siecią. Domyślny port HTTP to `8545`, ale można go skonfigurować.
- Poinstruuj Web3.py, aby połączyło się z węzłem przez HTTP na `localhost:8545`.
  `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- Użyj instancji `w3`, aby wejść w interakcję z węzłem.

Chociaż jest to jeden z „prawdziwych” sposobów, proces synchronizacji trwa godzinami i jest niepotrzebny, jeśli chcesz tylko środowiska programistycznego. Web3.py udostępnia w tym celu czwartego dostawcę, **EthereumTesterProvider**. Ten dostawca testowy łączy się z symulowanym węzłem Ethereum z luźnymi uprawnieniami i fałszywą walutą do zabawy.

![Diagram pokazujący EthereumTesterProvider łączący Twoją aplikację web3.py z symulowanym węzłem Ethereum](./ethereumtesterprovider.png)

_EthereumTesterProvider łączy się z symulowanym węzłem i jest przydatny do szybkich środowisk programistycznych._

Ten symulowany węzeł nazywa się [eth-tester](https://github.com/ethereum/eth-tester) i zainstalowaliśmy go jako część polecenia `pip install web3[tester]`. Konfiguracja Web3.py do używania tego dostawcy testowego jest tak prosta, jak:

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

Teraz jesteś gotowy, aby surfować po łańcuchu! To nie jest coś, co ludzie mówią. Właśnie to wymyśliłem. Zróbmy szybką wycieczkę.

## Szybka wycieczka {#the-quick-tour}

Po pierwsze, sprawdzenie poprawności:

```python
In [5]: w3.is_connected()
Out[5]: True
```

Ponieważ używamy dostawcy testowego, nie jest to bardzo wartościowy test, ale jeśli się nie powiedzie, prawdopodobnie wpisałeś coś źle podczas tworzenia instancji zmiennej `w3`. Sprawdź dwukrotnie, czy uwzględniłeś wewnętrzne nawiasy, tj. `Web3.EthereumTesterProvider()`.

## Przystanek wycieczki nr 1: [konta](/developers/docs/accounts/) {#tour-stop-1-accounts}

Dla wygody dostawca testowy stworzył kilka kont i załadował je testowym etherem.

Najpierw zobaczmy listę tych kont:

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

Jeśli uruchomisz to polecenie, powinieneś zobaczyć listę dziesięciu ciągów znaków, które zaczynają się od `0x`. Każdy z nich to **adres publiczny** i pod pewnymi względami jest analogiczny do numeru konta w rachunku bieżącym. Podałbyś ten adres komuś, kto chciałby wysłać ci ether.

Jak wspomniano, dostawca testowy wstępnie załadował każde z tych kont pewną ilością testowego etheru. Sprawdźmy, ile jest na pierwszym koncie:

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

To mnóstwo zer! Zanim pójdziesz śmiejąc się do fałszywego banku, przypomnij sobie wcześniejszą lekcję o nominałach walut. Wartości etheru są reprezentowane w najmniejszym nominale, wei. Przelicz to na ether:

```python
In [8]: w3.from_wei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

Milion testowego etheru — całkiem nieźle.

## Przystanek wycieczki nr 2: dane bloku {#tour-stop-2-block-data}

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

- Numer bloku to zero — niezależnie od tego, jak dawno skonfigurowałeś dostawcę testowego. W przeciwieństwie do prawdziwej sieci Ethereum, która dodaje nowy blok co 12 sekund, ta symulacja będzie czekać, aż dasz jej coś do zrobienia.
- `transactions` to pusta lista z tego samego powodu: jeszcze nic nie zrobiliśmy. Ten pierwszy blok to **pusty blok**, tylko po to, aby rozpocząć łańcuch.
- Zauważ, że `parentHash` to tylko garść pustych bajtów. Oznacza to, że jest to pierwszy blok w łańcuchu, znany również jako **blok genezy**.

## Przystanek wycieczki nr 3: [transakcje](/developers/docs/transactions/) {#tour-stop-3-transactions}

Utknęliśmy na bloku zero, dopóki nie pojawi się oczekująca transakcja, więc stwórzmy jedną. Wyślij kilka testowych etherów z jednego konta na drugie:

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.to_wei(3, 'ether'),
   'gas': 21000
})
```

Jest to zazwyczaj moment, w którym czeka się kilka sekund na dołączenie transakcji do nowego bloku. Pełny proces wygląda mniej więcej tak:

1. Prześlij transakcję i zachowaj jej hasz. Dopóki blok zawierający transakcję nie zostanie utworzony i rozgłoszony, transakcja jest „oczekująca”.
   `tx_hash = w3.eth.send_transaction({ … })`
2. Poczekaj, aż transakcja zostanie uwzględniona w bloku:
   `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. Kontynuuj logikę aplikacji. Aby wyświetlić pomyślną transakcję:
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

Zobaczysz tutaj kilka znajomych szczegółów: pola `from`, `to` i `value` powinny pasować do danych wejściowych naszego wywołania `send_transaction`. Inną uspokajającą informacją jest to, że transakcja ta została uwzględniona jako pierwsza (`'transactionIndex': 0`) w bloku numer 1.

Możemy również łatwo zweryfikować powodzenie tej transakcji, sprawdzając salda dwóch zaangażowanych kont. Trzy ethery powinny zostać przeniesione z jednego konta na drugie.

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999979000000000000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

To drugie wygląda dobrze! Saldo wzrosło z 1 000 000 do 1 000 003 etherów. Ale co stało się z pierwszym kontem? Wygląda na to, że straciło nieco więcej niż trzy ethery. Niestety, nic w życiu nie jest za darmo, a korzystanie z publicznej sieci Ethereum wymaga wynagrodzenia innych za ich rolę wspierającą. Niewielka opłata transakcyjna została odjęta od konta, które przesłało transakcję – ta opłata to ilość spalonego gazu (21000 jednostek gazu za transfer ETH) pomnożona przez opłatę podstawową, która zmienia się w zależności od aktywności sieci, plus napiwek, który trafia do walidatora, który włącza transakcję do bloku.

Więcej o [gazie](/developers/docs/gas/#post-london)

<FeaturedText>Uwaga: W sieci publicznej opłaty transakcyjne są zmienne w zależności od zapotrzebowania w sieci i tego, jak szybko chcesz, aby transakcja została przetworzona. Jeśli interesuje Cię szczegółowe omówienie sposobu obliczania opłat, zobacz mój wcześniejszy post o tym, <a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">jak transakcje są włączane do bloku</a>.</FeaturedText>

## Chwila oddechu {#and-breathe}

Siedzimy nad tym już chwilę, więc to wydaje się dobrym miejscem na przerwę. Królicza nora ciągnie się dalej, a my będziemy kontynuować eksplorację w drugiej części tej serii. Nadchodzące koncepcje: łączenie się z prawdziwym węzłem, inteligentne kontrakty i tokeny. Masz dodatkowe pytania? Daj mi znać! Twoja opinia wpłynie na to, w jakim kierunku pójdziemy dalej. Prośby mile widziane na [Twitterze](https://twitter.com/wolovim).
