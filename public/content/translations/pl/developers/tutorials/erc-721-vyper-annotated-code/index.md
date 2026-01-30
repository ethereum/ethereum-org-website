---
title: "Omówienie kontraktu ERC-721 w języku Vyper"
description: "Kontrakt ERC-721 Ryuyi Nakamury i jego działanie"
author: Ori Pomerantz
lang: pl
tags: [ "vyper", "erc-721", "python" ]
skill: beginner
published: 2021-04-01
---

## Wprowadzenie {#introduction}

Standard [ERC-721](/developers/docs/standards/tokens/erc-721/) służy do przechowywania własności niewymienialnych tokenów (NFT).
Tokeny [ERC-20](/developers/docs/standards/tokens/erc-20/) zachowują się jak towar, ponieważ nie ma różnicy między poszczególnymi tokenami.
W przeciwieństwie do nich tokeny ERC-721 są przeznaczone dla aktywów, które są podobne, ale nie identyczne, takich jak różne [kreskówki z kotami](https://www.cryptokitties.co/)
lub tytuły własności do różnych nieruchomości.

W tym artykule przeanalizujemy [kontrakt ERC-721 Ryuyi Nakamury](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy).
Ten kontrakt jest napisany w [Vyper](https://vyper.readthedocs.io/en/latest/index.html), języku programowania kontraktów podobnym do Pythona, zaprojektowanym tak, aby trudniej było w nim napisać niebezpieczny kod niż w Solidity.

## Kontrakt {#contract}

```python
# @dev Implementacja standardu niewymienialnych tokenów ERC-721.
# @author Ryuya Nakamura (@nrryuya)
# Zmodyfikowano na podstawie: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Komentarze w Vyper, podobnie jak w Pythonie, zaczynają się od hasza (`#`) i trwają do końca linii. Komentarze zawierające
`@<keyword>` są używane przez [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) do tworzenia czytelnej dla człowieka
dokumentacji.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

Interfejs ERC-721 jest wbudowany w język Vyper.
[Definicję kodu można zobaczyć tutaj](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py).
Definicja interfejsu jest napisana w Pythonie, a nie w Vyper, ponieważ interfejsy są używane nie tylko w ramach
blockchainu, ale także podczas wysyłania transakcji do blockchainu z zewnętrznego klienta, który może być napisany w
Pythonie.

Pierwsza linia importuje interfejs, a druga określa, że go tutaj implementujemy.

### Interfejs ERC721Receiver {#receiver-interface}

```python
# Interfejs dla kontraktu wywoływanego przez safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 obsługuje dwa rodzaje transferów:

- `transferFrom`, który pozwala nadawcy określić dowolny adres docelowy i przenosi odpowiedzialność
  za transfer na nadawcę. Oznacza to, że można dokonać transferu na nieprawidłowy adres, w takim przypadku
  NFT zostanie utracony na zawsze.
- `safeTransferFrom`, który sprawdza, czy adres docelowy jest kontraktem. Jeśli tak, kontrakt ERC-721
  pyta kontrakt odbierający, czy chce otrzymać NFT.

Aby odpowiedzieć na żądania `safeTransferFrom`, kontrakt odbierający musi zaimplementować `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

Adres `_from` to obecny właściciel tokena. Adres `_operator` to ten, który
zażądał transferu (te dwa adresy mogą nie być takie same ze względu na pozwolenia).

```python
            _tokenId: uint256,
```

Identyfikatory tokenów ERC-721 mają 256 bitów. Zazwyczaj są one tworzone poprzez haszowanie opisu tego, co
reprezentuje dany token.

```python
            _data: Bytes[1024]
```

Żądanie może zawierać do 1024 bajtów danych użytkownika.

```python
        ) -> bytes32: view
```

Aby zapobiec przypadkom, w których kontrakt przypadkowo akceptuje transfer, wartość zwracana nie jest wartością logiczną (boolean),
ale 256 bitami o określonej wartości.

Ta funkcja jest typu `view`, co oznacza, że może odczytywać stan blockchaina, ale nie może go modyfikować.

### Zdarzenia {#events}

[Zdarzenia](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e)
są emitowane w celu informowania użytkowników i serwerów spoza blockchaina o zdarzeniach. Należy pamiętać, że zawartość zdarzeń
nie jest dostępna dla kontraktów na blockchainie.

```python
# @dev Emitowane, gdy własność dowolnego NFT zmienia się w wyniku dowolnego mechanizmu. To zdarzenie jest emitowane, gdy NFT są
#      tworzone (`from` == 0) i niszczone (`to` == 0). Wyjątek: podczas tworzenia kontraktu dowolna
#      liczba NFT może zostać utworzona i przypisana bez emitowania zdarzenia Transfer. W momencie dowolnego
#      transferu zatwierdzony adres dla tego NFT (jeśli istnieje) jest resetowany do zera.
# @param _from Nadawca NFT (jeśli adres jest adresem zerowym, oznacza to utworzenie tokena).
# @param _to Odbiorca NFT (jeśli adres jest adresem zerowym, oznacza to zniszczenie tokena).
# @param _tokenId NFT, które zostało przetransferowane.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

Jest to podobne do zdarzenia Transfer w ERC-20, z tym wyjątkiem, że zamiast kwoty podajemy `tokenId`.
Nikt nie jest właścicielem adresu zerowego, więc umownie używamy go do zgłaszania tworzenia i niszczenia tokenów.

```python
# @dev Emitowane, gdy zatwierdzony adres dla NFT jest zmieniany lub ponownie zatwierdzany. Adres zerowy
#      oznacza, że nie ma zatwierdzonego adresu. Kiedy emitowane jest zdarzenie Transfer, oznacza to również,
#      że zatwierdzony adres dla tego NFT (jeśli istnieje) jest resetowany do zera.
# @param _owner Właściciel NFT.
# @param _approved Adres, który zatwierdzamy.
# @param _tokenId NFT, które zatwierdzamy.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

Zatwierdzenie ERC-721 jest podobne do pozwolenia (allowance) w ERC-20. Określony adres ma pozwolenie na transfer określonego
tokena. Daje to mechanizm, dzięki któremu kontrakty mogą reagować na przyjęcie tokena. Kontrakty nie mogą
nasłuchiwać zdarzeń, więc jeśli po prostu prześlesz im token, nie będą o tym „wiedziały”. W ten sposób
właściciel najpierw przesyła zatwierdzenie, a następnie wysyła żądanie do kontraktu: „Zatwierdziłem transfer tokena
X, proszę go wykonać...”.

Jest to wybór projektowy mający na celu upodobnienie standardu ERC-721 do standardu ERC-20. Ponieważ
tokeny ERC-721 nie są wymienialne, kontrakt może również zidentyfikować, że otrzymał określony token, sprawdzając
jego własność.

```python
# @dev Emitowane, gdy operator jest włączany lub wyłączany dla właściciela. Operator może zarządzać
#      wszystkimi NFT właściciela.
# @param _owner Właściciel NFT.
# @param _operator Adres, któremu ustawiamy uprawnienia operatora.
# @param _approved Status uprawnień operatora (true, jeśli uprawnienia operatora są nadane, a false, jeśli
# cofnięte).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

Czasami przydatne jest posiadanie _operatora_, który może zarządzać wszystkimi tokenami konta określonego typu (tymi, którymi zarządza określony kontrakt), podobnie jak pełnomocnictwo. Na przykład mogę chcieć nadać takie uprawnienie kontraktowi, który sprawdza, czy
nie kontaktowałem się z nim przez sześć miesięcy, a jeśli tak, to rozdziela moje aktywa między moich spadkobierców (jeśli jeden z nich o to poprosi; kontrakty
nie mogą nic zrobić bez wywołania przez transakcję). W ERC-20 możemy po prostu dać wysokie pozwolenie kontraktowi spadkowemu,
ale to nie działa w przypadku ERC-721, ponieważ tokeny nie są wymienialne. To jest odpowiednik.

Wartość `approved` mówi nam, czy zdarzenie dotyczy zatwierdzenia, czy cofnięcia zatwierdzenia.

### Zmienne stanu {#state-vars}

Zmienne te zawierają aktualny stan tokenów: które z nich są dostępne i kto je posiada. Większość z nich
to obiekty `HashMap`, [jednokierunkowe mapowania, które istnieją między dwoma typami](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Mapowanie z ID NFT na adres, który jest jego właścicielem.
idToOwner: HashMap[uint256, address]

# @dev Mapowanie z ID NFT na zatwierdzony adres.
idToApprovals: HashMap[uint256, address]
```

Tożsamości użytkowników i kontraktów w Ethereum są reprezentowane przez 160-bitowe adresy. Te dwie zmienne mapują
identyfikatory tokenów do ich właścicieli i osób zatwierdzonych do ich transferu (maksymalnie jedna na każdy token). W Ethereum
niezainicjowane dane są zawsze zerowe, więc jeśli nie ma właściciela lub zatwierdzonego podmiotu transferującego, wartość dla danego tokena
jest zerowa.

```python
# @dev Mapowanie adresu właściciela na liczbę jego tokenów.
ownerToNFTokenCount: HashMap[address, uint256]
```

Ta zmienna przechowuje liczbę tokenów dla każdego właściciela. Nie ma mapowania z właścicieli na tokeny, więc
jedynym sposobem na zidentyfikowanie tokenów, które posiada dany właściciel, jest prześledzenie historii zdarzeń w blockchainie
i odnalezienie odpowiednich zdarzeń `Transfer`. Możemy użyć tej zmiennej, aby wiedzieć, kiedy mamy wszystkie NFT i nie
musimy szukać dalej w czasie.

Należy pamiętać, że ten algorytm działa tylko w przypadku interfejsów użytkownika i serwerów zewnętrznych. Kod działający na samym
blockchainie nie może odczytywać przeszłych zdarzeń.

```python
# @dev Mapowanie adresu właściciela na mapowanie adresów operatorów.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Konto może mieć więcej niż jednego operatora. Prosta `HashMap` jest niewystarczająca, aby
je śledzić, ponieważ każdy klucz prowadzi do pojedynczej wartości. Zamiast tego jako wartości można użyć
`HashMap[address, bool]`. Domyślnie wartość dla każdego adresu to `False`, co oznacza, że
nie jest on operatorem. W razie potrzeby można ustawić wartości na `True`.

```python
# @dev Adres mintera (podmiotu wybijającego), który może wybić token
minter: address
```

Nowe tokeny muszą być w jakiś sposób tworzone. W tym kontrakcie jest jeden podmiot, który ma do tego prawo, czyli
`minter`. To prawdopodobnie wystarczy na przykład w przypadku gry. Do innych celów może być konieczne
stworzenie bardziej skomplikowanej logiki biznesowej.

```python
# @dev Mapowanie ID interfejsu na wartość boolowską informującą, czy jest on obsługiwany
supportedInterfaces: HashMap[bytes32, bool]

# @dev ID interfejsu ERC165 dla ERC165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ID interfejsu ERC165 dla ERC721
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) określa mechanizm, dzięki któremu kontrakt może ujawnić, w jaki sposób aplikacje
mogą się z nim komunikować, a także z którymi standardami ERC jest zgodny. W tym przypadku kontrakt jest zgodny z ERC-165 i ERC-721.

### Funkcje {#functions}

To są funkcje, które faktycznie implementują ERC-721.

#### Konstruktor {#constructor}

```python
@external
def __init__():
```

W Vyper, podobnie jak w Pythonie, funkcja konstruktora nazywa się `__init__`.

```python
    """
    @dev Konstruktor kontraktu.
    """
```

W Pythonie i w Vyper można również utworzyć komentarz, określając wieloliniowy ciąg znaków (który zaczyna się i kończy
na `"""`) i nie używając go w żaden sposób. Te komentarze mogą również zawierać
[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

Aby uzyskać dostęp do zmiennych stanu, użyj `self.<nazwa zmiennej>` (ponownie, tak samo jak w Pythonie).

#### Funkcje widoku {#views}

Są to funkcje, które nie modyfikują stanu blockchaina, a zatem mogą być wykonywane za
darmo, jeśli są wywoływane z zewnątrz. Jeśli funkcje widoku są wywoływane przez kontrakt, nadal muszą być wykonane na
każdym węźle i dlatego kosztują gaz.

```python
@view
@external
```

Te słowa kluczowe przed definicją funkcji, które zaczynają się od znaku „małpy” (`@`), nazywane są _dekoratorami_. Określają
one okoliczności, w których funkcja może być wywołana.

- `@view` określa, że ta funkcja jest widokiem.
- `@external` określa, że ta konkretna funkcja może być wywoływana przez transakcje i przez inne kontrakty.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

W przeciwieństwie do Pythona Vyper jest [językiem z typowaniem statycznym](https://wikipedia.org/wiki/Type_system#Static_type_checking).
Nie można zadeklarować zmiennej ani parametru funkcji bez zidentyfikowania [typu danych](https://vyper.readthedocs.io/en/latest/types.html). W tym przypadku parametrem wejściowym jest `bytes32`, wartość 256-bitowa
(256 bitów to natywny rozmiar słowa [Wirtualnej Maszyny Ethereum](/developers/docs/evm/)). Wyjściem jest wartość logiczna
(boolean). Zgodnie z konwencją nazwy parametrów funkcji zaczynają się od podkreślenia (`_`).

```python
    """
    @dev Identyfikacja interfejsu jest określona w ERC-165.
    @param _interfaceID Id interfejsu
    """
    return self.supportedInterfaces[_interfaceID]
```

Zwraca wartość z HashMap `self.supportedInterfaces`, która jest ustawiana w konstruktorze (`__init__`).

```python
### FUNKCJE WIDOKU ###
```

Są to funkcje widoku, które udostępniają informacje o tokenach użytkownikom i innym kontraktom.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev Zwraca liczbę NFT posiadanych przez `_owner`.
         Zgłasza błąd, jeśli `_owner` jest adresem zerowym. NFT przypisane do adresu zerowego są uważane za nieprawidłowe.
    @param _owner Adres, dla którego należy sprawdzić saldo.
    """
    assert _owner != ZERO_ADDRESS
```

Ta linia [stwierdza](https://vyper.readthedocs.io/en/latest/statements.html#assert), że `_owner` nie jest
zerowy. Jeśli tak jest, występuje błąd, a operacja jest cofana.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Zwraca adres właściciela NFT.
         Zgłasza błąd, jeśli `_tokenId` nie jest prawidłowym NFT.
    @param _tokenId Identyfikator NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Zgłasza błąd, jeśli `_tokenId` nie jest prawidłowym NFT
    assert owner != ZERO_ADDRESS
    return owner
```

W Wirtualnej Maszynie Ethereum (EVM) każda pamięć, w której nie jest przechowywana żadna wartość, jest zerowa.
Jeśli nie ma tokena pod `_tokenId`, to wartość `self.idToOwner[_tokenId]` wynosi zero. W takim
przypadku funkcja jest cofana.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Pobiera zatwierdzony adres dla pojedynczego NFT.
         Zgłasza błąd, jeśli `_tokenId` nie jest prawidłowym NFT.
    @param _tokenId ID NFT, którego zatwierdzenie ma być sprawdzone.
    """
    # Zgłasza błąd, jeśli `_tokenId` nie jest prawidłowym NFT
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

Należy pamiętać, że `getApproved` _może_ zwrócić zero. Jeśli token jest prawidłowy, zwraca `self.idToApprovals[_tokenId]`.
Jeśli nie ma podmiotu zatwierdzającego, ta wartość wynosi zero.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev Sprawdza, czy `_operator` jest zatwierdzonym operatorem dla `_owner`.
    @param _owner Adres, który jest właścicielem NFT.
    @param _operator Adres, który działa w imieniu właściciela.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

Ta funkcja sprawdza, czy `_operator` ma prawo zarządzać wszystkimi tokenami `_owner` w tym kontrakcie.
Ponieważ może istnieć wielu operatorów, jest to dwupoziomowa mapa HashMap.

#### Funkcje pomocnicze transferu {#transfer-helpers}

Funkcje te implementują operacje, które są częścią transferu lub zarządzania tokenami.

```python

### FUNKCJE POMOCNICZE TRANSFERU ###

@view
@internal
```

Ten dekorator, `@internal`, oznacza, że funkcja jest dostępna tylko z innych funkcji w tym
samym kontrakcie. Zgodnie z konwencją te nazwy funkcji również zaczynają się od podkreślenia (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Zwraca informację, czy dany podmiot wydający może przetransferować dany identyfikator tokena
    @param spender adres podmiotu wydającego do zapytania
    @param tokenId identyfikator uint256 tokena do przetransferowania
    @return bool, czy msg.sender jest zatwierdzony dla danego identyfikatora tokena,
        jest operatorem właściciela lub jest właścicielem tokena
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

Istnieją trzy sposoby, w jakie adres może być uprawniony do transferu tokena:

1. Adres jest właścicielem tokena
2. Adres jest zatwierdzony do wydania tego tokena
3. Adres jest operatorem dla właściciela tokena

Powyższa funkcja może być widokiem, ponieważ nie zmienia stanu. Aby obniżyć koszty operacyjne, każda
funkcja, która _może_ być widokiem, _powinna_ być widokiem.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Dodaje NFT do danego adresu
         Zgłasza błąd, jeśli `_tokenId` jest własnością kogoś.
    """
    # Zgłasza błąd, jeśli `_tokenId` jest własnością kogoś
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # Zmień właściciela
    self.idToOwner[_tokenId] = _to
    # Zmień śledzenie licznika
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Usuwa NFT z danego adresu
         Zgłasza błąd, jeśli `_from` nie jest obecnym właścicielem.
    """
    # Zgłasza błąd, jeśli `_from` nie jest obecnym właścicielem
    assert self.idToOwner[_tokenId] == _from
    # Zmień właściciela
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # Zmień śledzenie licznika
    self.ownerToNFTokenCount[_from] -= 1
```

Gdy wystąpi problem z transferem, cofamy wywołanie.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Czyści zatwierdzenie danego adresu
         Zgłasza błąd, jeśli `_owner` nie jest obecnym właścicielem.
    """
    # Zgłasza błąd, jeśli `_owner` nie jest obecnym właścicielem
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # Resetuj zatwierdzenia
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

Zmieniaj wartość tylko w razie potrzeby. Zmienne stanu znajdują się w pamięci (storage). Zapis do pamięci jest
jedną z najdroższych operacji, jakie wykonuje EVM (Wirtualna Maszyna Ethereum) (pod względem
[gazu](/developers/docs/gas/)). Dlatego dobrym pomysłem jest jego minimalizowanie, nawet zapisywanie
istniejącej wartości ma wysoki koszt.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Wykonuje transfer NFT.
         Zgłasza błąd, chyba że `msg.sender` jest obecnym właścicielem, autoryzowanym operatorem lub zatwierdzonym
         adresem dla tego NFT. (UWAGA: `msg.sender` nie jest dozwolony w funkcji prywatnej, więc przekaż `_sender`.)
         Zgłasza błąd, jeśli `_to` jest adresem zerowym.
         Zgłasza błąd, jeśli `_from` nie jest obecnym właścicielem.
         Zgłasza błąd, jeśli `_tokenId` nie jest prawidłowym NFT.
    """
```

Mamy tę funkcję wewnętrzną, ponieważ istnieją dwa sposoby transferu tokenów (zwykły i bezpieczny), ale
chcemy, aby było tylko jedno miejsce w kodzie, w którym to robimy, aby ułatwić audyt.

```python
    # Sprawdź wymagania
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Zgłasza błąd, jeśli `_to` jest adresem zerowym
    assert _to != ZERO_ADDRESS
    # Wyczyść zatwierdzenie. Zgłasza błąd, jeśli `_from` nie jest obecnym właścicielem
    self._clearApproval(_from, _tokenId)
    # Usuń NFT. Zgłasza błąd, jeśli `_tokenId` nie jest prawidłowym NFT
    self._removeTokenFrom(_from, _tokenId)
    # Dodaj NFT
    self._addTokenTo(_to, _tokenId)
    # Zarejestruj transfer
    log Transfer(_from, _to, _tokenId)
```

Aby wyemitować zdarzenie w Vyper, użyj instrukcji `log` ([więcej szczegółów tutaj](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### Funkcje transferu {#transfer-funs}

```python

### FUNKCJE TRANSFERU ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Zgłasza błąd, chyba że `msg.sender` jest obecnym właścicielem, autoryzowanym operatorem lub zatwierdzonym
         adresem dla tego NFT.
         Zgłasza błąd, jeśli `_from` nie jest obecnym właścicielem.
         Zgłasza błąd, jeśli `_to` jest adresem zerowym.
         Zgłasza błąd, jeśli `_tokenId` nie jest prawidłowym NFT.
    @notice Wywołujący jest odpowiedzialny za potwierdzenie, że `_to` jest w stanie odbierać NFT, w przeciwnym razie
            mogą one zostać trwale utracone.
    @param _from Obecny właściciel NFT.
    @param _to Nowy właściciel.
    @param _tokenId NFT do przetransferowania.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Ta funkcja pozwala na transfer na dowolny adres. O ile adres nie jest adresem użytkownika lub kontraktem, który
wie, jak transferować tokeny, każdy przetransferowany token utknie na tym adresie i będzie bezużyteczny.

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Przenosi własność NFT z jednego adresu na inny.
         Zgłasza błąd, chyba że `msg.sender` jest obecnym właścicielem, autoryzowanym operatorem lub
         zatwierdzonym adresem dla tego NFT.
         Zgłasza błąd, jeśli `_from` nie jest obecnym właścicielem.
         Zgłasza błąd, jeśli `_to` jest adresem zerowym.
         Zgłasza błąd, jeśli `_tokenId` nie jest prawidłowym NFT.
         Jeśli `_to` jest inteligentnym kontraktem, wywołuje `onERC721Received` na `_to` i zgłasza błąd, jeśli
         zwracana wartość nie jest `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
         UWAGA: bytes4 jest reprezentowane przez bytes32 z dopełnieniem
    @param _from Obecny właściciel NFT.
    @param _to Nowy właściciel.
    @param _tokenId NFT do przetransferowania.
    @param _data Dodatkowe dane bez określonego formatu, wysyłane w wywołaniu do `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Można najpierw wykonać transfer, ponieważ w razie problemu i tak cofniemy całą operację, więc wszystko,
co zostało zrobione w wywołaniu, zostanie anulowane.

```python
    if _to.is_contract: # sprawdź, czy `_to` jest adresem kontraktu
```

Najpierw sprawdź, czy adres jest kontraktem (czy ma kod). Jeśli nie, załóż, że jest to adres
użytkownika, a użytkownik będzie mógł użyć tokena lub go przetransferować. Ale niech to nie uśpi twojej
czujności. Możesz stracić tokeny, nawet używając `safeTransferFrom`, jeśli przetransferujesz
je na adres, do którego nikt nie zna klucza prywatnego.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Wywołaj kontrakt docelowy, aby sprawdzić, czy może on odbierać tokeny ERC-721.

```python
        # Zgłasza błąd, jeśli miejscem docelowym transferu jest kontrakt, który nie implementuje „onERC721Received”
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

Jeśli miejscem docelowym jest kontrakt, ale taki, który nie akceptuje tokenów ERC-721 (lub który zdecydował się nie akceptować tego
konkretnego transferu), operacja zostanie cofnięta.

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Ustawia lub ponownie zatwierdza zatwierdzony adres dla NFT. Adres zerowy wskazuje, że nie ma zatwierdzonego adresu.
         Zgłasza błąd, chyba że `msg.sender` jest obecnym właścicielem NFT lub autoryzowanym operatorem obecnego właściciela.
         Zgłasza błąd, jeśli `_tokenId` nie jest prawidłowym NFT. (UWAGA: nie jest to zapisane w EIP)
         Zgłasza błąd, jeśli `_approved` jest obecnym właścicielem. (UWAGA: nie jest to zapisane w EIP)
    @param _approved Adres do zatwierdzenia dla danego ID NFT.
    @param _tokenId ID tokena do zatwierdzenia.
    """
    owner: address = self.idToOwner[_tokenId]
    # Zgłasza błąd, jeśli `_tokenId` nie jest prawidłowym NFT
    assert owner != ZERO_ADDRESS
    # Zgłasza błąd, jeśli `_approved` jest obecnym właścicielem
    assert _approved != owner
```

Zgodnie z konwencją, jeśli nie chcesz mieć podmiotu zatwierdzającego, wyznaczasz adres zerowy, a nie siebie.

```python
    # Sprawdź wymagania
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Aby ustawić zatwierdzenie, możesz być właścicielem lub operatorem autoryzowanym przez właściciela.

```python
    # Ustaw zatwierdzenie
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Włącza lub wyłącza zatwierdzenie dla strony trzeciej („operatora”) do zarządzania wszystkimi
         aktywami `msg.sender`. Emituje również zdarzenie ApprovalForAll.
         Zgłasza błąd, jeśli `_operator` to `msg.sender`. (UWAGA: nie jest to zapisane w EIP)
    @notice Działa to nawet wtedy, gdy nadawca nie posiada w danym momencie żadnych tokenów.
    @param _operator Adres do dodania do zestawu autoryzowanych operatorów.
    @param _approved True, jeśli operator jest zatwierdzony, false, aby cofnąć zatwierdzenie.
    """
    # Zgłasza błąd, jeśli `_operator` to `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### Wybijanie nowych tokenów i niszczenie istniejących {#mint-burn}

Konto, które utworzyło kontrakt, jest `minterem`, superużytkownikiem upoważnionym do wybijania
nowych NFT. Jednak nawet on nie może palić istniejących tokenów. Może to zrobić tylko właściciel lub podmiot
upoważniony przez właściciela.

```python
### FUNKCJE WYBIJANIA I PALENIA ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Ta funkcja zawsze zwraca `True`, ponieważ jeśli operacja się nie powiedzie, jest cofana.

```python
    """
    @dev Funkcja do wybijania tokenów
         Zgłasza błąd, jeśli `msg.sender` nie jest minterem.
         Zgłasza błąd, jeśli `_to` jest adresem zerowym.
         Zgłasza błąd, jeśli `_tokenId` jest własnością kogoś.
    @param _to Adres, który otrzyma wybite tokeny.
    @param _tokenId Identyfikator tokena do wybicia.
    @return Wartość logiczna wskazująca, czy operacja zakończyła się powodzeniem.
    """
    # Zgłasza błąd, jeśli `msg.sender` nie jest minterem
    assert msg.sender == self.minter
```

Tylko minter (konto, które utworzyło kontrakt ERC-721) może wybijać nowe tokeny. Może to być
problemem w przyszłości, jeśli będziemy chcieli zmienić tożsamość mintera. W
kontrakcie produkcyjnym prawdopodobnie chciałbyś mieć funkcję, która pozwala minterowi na przekazanie
uprawnień mintera komuś innemu.

```python
    # Zgłasza błąd, jeśli `_to` jest adresem zerowym
    assert _to != ZERO_ADDRESS
    # Dodaj NFT. Zgłasza błąd, jeśli `_tokenId` jest własnością kogoś
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

Zgodnie z konwencją wybijanie nowych tokenów liczy się jako transfer z adresu zerowego.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Pali określony token ERC721.
         Zgłasza błąd, chyba że `msg.sender` jest obecnym właścicielem, autoryzowanym operatorem lub zatwierdzonym
         adresem dla tego NFT.
         Zgłasza błąd, jeśli `_tokenId` nie jest prawidłowym NFT.
    @param _tokenId uint256 id tokena ERC721 do spalenia.
    """
    # Sprawdź wymagania
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Zgłasza błąd, jeśli `_tokenId` nie jest prawidłowym NFT
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

Każdy, kto ma prawo do transferu tokena, może go spalić. Chociaż spalenie wydaje się równoznaczne z
transferem na adres zerowy, adres zerowy w rzeczywistości nie otrzymuje tokena. Pozwala to na
zwolnienie całej pamięci, która była używana dla tokena, co może obniżyć koszt gazu transakcji.

## Korzystanie z tego kontraktu {#using-contract}

W przeciwieństwie do Solidity, Vyper nie ma dziedziczenia. Jest to celowy wybór projektowy, aby
kod był jaśniejszy, a tym samym łatwiejszy do zabezpieczenia. Tak więc, aby stworzyć własny kontrakt ERC-721 w Vyper, bierzesz ten
kontrakt i modyfikujesz go
w celu zaimplementowania pożądanej logiki biznesowej.

## Wnioski {#conclusion}

Dla przypomnienia, oto niektóre z najważniejszych pomysłów w tym kontrakcie:

- Aby odbierać tokeny ERC-721 za pomocą bezpiecznego transferu, kontrakty muszą implementować interfejs `ERC721Receiver`.
- Nawet jeśli użyjesz bezpiecznego transferu, tokeny mogą utknąć, jeśli wyślesz je na adres, którego klucz prywatny
  jest nieznany.
- Gdy wystąpi problem z operacją, dobrym pomysłem jest `cofnięcie` (revert) wywołania, a nie tylko zwrócenie
  wartości błędu.
- Tokeny ERC-721 istnieją, gdy mają właściciela.
- Istnieją trzy sposoby autoryzacji do transferu NFT. Możesz być właścicielem, być zatwierdzonym dla konkretnego tokena
  lub być operatorem dla wszystkich tokenów właściciela.
- Przeszłe zdarzenia są widoczne tylko poza blockchainem. Kod działający wewnątrz blockchaina nie może ich zobaczyć.

Teraz idź i zaimplementuj bezpieczne kontrakty Vyper.

[Zobacz więcej mojej pracy tutaj](https://cryptodocguy.pro/).

