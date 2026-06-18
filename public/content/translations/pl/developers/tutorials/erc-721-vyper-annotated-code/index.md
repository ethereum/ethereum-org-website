---
title: "Przewodnik po kontrakcie ERC-721 w języku Vyper"
description: Kontrakt ERC-721 Ryuyi Nakamury i jak on działa
author: Ori Pomerantz
lang: pl
tags: ["vyper", "erc-721", "python"]
skill: beginner
breadcrumb: Vyper ERC-721
published: 2021-04-01
---

## Wprowadzenie {#introduction}

Standard [ERC-721](/developers/docs/standards/tokens/erc-721/) jest używany do przechowywania własności niewymienialnych tokenów (NFT - Non-Fungible Tokens).
Tokeny [ERC-20](/developers/docs/standards/tokens/erc-20/) zachowują się jak towar, ponieważ nie ma różnicy między poszczególnymi tokenami.
W przeciwieństwie do nich, tokeny ERC-721 są zaprojektowane dla aktywów, które są podobne, ale nie identyczne, takich jak różne [kreskówkowe koty](https://www.cryptokitties.co/)
lub akty własności różnych nieruchomości.

W tym artykule przeanalizujemy [kontrakt ERC-721 autorstwa Ryuyi Nakamury](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy).
Ten kontrakt jest napisany w języku [Vyper](https://vyper.readthedocs.io/en/latest/index.html), języku kontraktów podobnym do języka Python, zaprojektowanym tak, aby trudniej było w nim napisać niebezpieczny kod niż w języku Solidity.

## Kontrakt {#contract}

```python
# @dev Implementacja standardu niewymiennego tokena ERC-721.
# @author Ryuya Nakamura (@nrryuya)
# Zmodyfikowano z: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Komentarze w języku Vyper, podobnie jak w języku Python, zaczynają się od znaku hash (`#`) i trwają do końca linii. Komentarze zawierające
`@<keyword>` są używane przez [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) do tworzenia dokumentacji czytelnej dla człowieka.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

Interfejs ERC-721 jest wbudowany w język Vyper.
[Definicję kodu możesz zobaczyć tutaj](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py).
Definicja interfejsu jest napisana w języku Python, a nie Vyper, ponieważ interfejsy są używane nie tylko wewnątrz
blockchaina, ale także podczas wysyłania do blockchaina transakcji z zewnętrznego klienta, który może być napisany w
języku Python.

Pierwsza linia importuje interfejs, a druga określa, że implementujemy go w tym miejscu.

### Interfejs ERC721Receiver {#receiver-interface}

```python
# Interfejs dla kontraktu wywoływanego przez safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 obsługuje dwa rodzaje transferów:

- `transferFrom`, który pozwala nadawcy określić dowolny adres docelowy i przenosi odpowiedzialność
  za transfer na nadawcę. Oznacza to, że możesz wykonać transfer na nieprawidłowy adres, w którym to przypadku
  NFT przepada na zawsze.
- `safeTransferFrom`, który sprawdza, czy adres docelowy jest kontraktem. Jeśli tak, kontrakt ERC-721
  pyta kontrakt odbierający, czy chce otrzymać NFT.

Aby odpowiedzieć na żądania `safeTransferFrom`, kontrakt odbierający musi implementować `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

Adres `_from` to obecny właściciel tokena. Adres `_operator` to ten, który
zażądał transferu (te dwa mogą nie być takie same z powodu limitów wydatków).

```python
            _tokenId: uint256,
```

Identyfikatory tokenów ERC-721 mają 256 bitów. Zazwyczaj są one tworzone poprzez haszowanie opisu tego, co
reprezentuje token.

```python
            _data: Bytes[1024]
```

Żądanie może zawierać do 1024 bajtów danych użytkownika.

```python
        ) -> bytes32: view
```

Aby zapobiec przypadkom, w których kontrakt przypadkowo akceptuje transfer, zwracana wartość nie jest wartością logiczną (boolean),
ale 256 bitami o określonej wartości.

Ta funkcja to `view`, co oznacza, że może odczytywać stan blockchaina, ale nie może go modyfikować.

### Zdarzenia {#events}

[Zdarzenia](/developers/docs/smart-contracts/anatomy/#events-and-logs)
są emitowane w celu informowania użytkowników i serwerów poza blockchainem o zdarzeniach. Należy pamiętać, że treść zdarzeń
nie jest dostępna dla kontraktów na blockchainie.

```python
# @dev Emitowane, gdy własność dowolnego NFT zmienia się za pomocą dowolnego mechanizmu. To zdarzenie jest emitowane, gdy NFT są
#      tworzone (`from` == 0) i niszczone (`to` == 0). Wyjątek: podczas tworzenia kontraktu, dowolna
#      liczba NFT może zostać utworzona i przypisana bez emitowania Transfer. W momencie dowolnego
#      transferu, zatwierdzony adres dla tego NFT (jeśli istnieje) jest resetowany do braku.
# @param _from Nadawca NFT (jeśli adres to adres zerowy, oznacza to tworzenie tokena).
# @param _to Odbiorca NFT (jeśli adres to adres zerowy, oznacza to zniszczenie tokena).
# @param _tokenId NFT, który został przetransferowany.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

Jest to podobne do zdarzenia Transfer w ERC-20, z tą różnicą, że raportujemy `tokenId` zamiast kwoty.
Nikt nie jest właścicielem adresu zerowego, więc zgodnie z konwencją używamy go do raportowania tworzenia i niszczenia tokenów.

```python
# @dev Emitowane, gdy zatwierdzony adres dla NFT zostaje zmieniony lub potwierdzony. Adres zerowy
#      oznacza, że nie ma zatwierdzonego adresu. Kiedy emitowane jest zdarzenie Transfer, oznacza to również,
#      że zatwierdzony adres dla tego NFT (jeśli istnieje) jest resetowany do braku.
# @param _owner Właściciel NFT.
# @param _approved Adres, który zatwierdzamy.
# @param _tokenId NFT, który zatwierdzamy.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

Zatwierdzenie (approval) w ERC-721 jest podobne do limitu wydatków (allowance) w ERC-20. Określony adres ma pozwolenie na transfer określonego
tokena. Daje to kontraktom mechanizm reagowania, gdy akceptują token. Kontrakty nie mogą nasłuchiwać zdarzeń, więc jeśli po prostu
prześlesz im token, nie będą o tym „wiedzieć”. W ten sposób właściciel najpierw przesyła zatwierdzenie, a następnie wysyła żądanie do kontraktu: „Zatwierdziłem dla ciebie transfer tokena
X, proszę zrób to...”.

Jest to wybór projektowy, aby standard ERC-721 był podobny do standardu ERC-20. Ponieważ
tokeny ERC-721 są niewymienialne, kontrakt może również zidentyfikować, że otrzymał określony token,
sprawdzając jego własność.

```python
# @dev Emitowane, gdy operator zostaje włączony lub wyłączony dla właściciela. Operator może zarządzać
#      wszystkimi NFT właściciela.
# @param _owner Właściciel NFT.
# @param _operator Adres, któremu nadajemy prawa operatora.
# @param _approved Status praw operatora (true, jeśli prawa operatora są nadane, i false, jeśli
# cofnięte).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

Czasami przydatne jest posiadanie _operatora_, który może zarządzać wszystkimi tokenami konta określonego typu (tymi, które są zarządzane przez
określony kontrakt), podobnie jak w przypadku pełnomocnictwa. Na przykład, mogę chcieć przekazać takie uprawnienia kontraktowi, który sprawdza, czy
nie kontaktowałem się z nim przez sześć miesięcy, a jeśli tak, rozdziela moje aktywa moim spadkobiercom (jeśli jeden z nich o to poprosi, kontrakty
nie mogą nic zrobić bez wywołania przez transakcję). W ERC-20 możemy po prostu przyznać wysoki limit wydatków kontraktowi spadkowemu,
ale to nie działa w przypadku ERC-721, ponieważ tokeny nie są wymienialne. To jest odpowiednik tego rozwiązania.

Wartość `approved` mówi nam, czy zdarzenie dotyczy zatwierdzenia, czy wycofania zatwierdzenia.

### Zmienne stanu {#state-vars}

Te zmienne zawierają obecny stan tokenów: które z nich są dostępne i kto jest ich właścicielem. Większość z nich
to obiekty `HashMap`, [jednokierunkowe mapowania istniejące między dwoma typami](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Mapowanie z ID NFT na adres, który jest jego właścicielem.
idToOwner: HashMap[uint256, address]

# @dev Mapowanie z ID NFT na zatwierdzony adres.
idToApprovals: HashMap[uint256, address]
```

Tożsamości użytkowników i kontraktów w Ethereum są reprezentowane przez 160-bitowe adresy. Te dwie zmienne mapują
identyfikatory tokenów na ich właścicieli i osoby zatwierdzone do ich transferu (maksymalnie jedna dla każdego). W Ethereum,
niezainicjowane dane zawsze wynoszą zero, więc jeśli nie ma właściciela lub zatwierdzonego transferującego, wartość dla tego tokena
wynosi zero.

```python
# @dev Mapowanie z adresu właściciela na liczbę jego tokenów.
ownerToNFTokenCount: HashMap[address, uint256]
```

Ta zmienna przechowuje liczbę tokenów dla każdego właściciela. Nie ma mapowania od właścicieli do tokenów, więc
jedynym sposobem na zidentyfikowanie tokenów posiadanych przez określonego właściciela jest spojrzenie wstecz w historię zdarzeń blockchaina
i znalezienie odpowiednich zdarzeń `Transfer`. Możemy użyć tej zmiennej, aby wiedzieć, kiedy mamy wszystkie NFT i nie
musimy szukać dalej w przeszłości.

Należy pamiętać, że ten algorytm działa tylko dla interfejsów użytkownika i zewnętrznych serwerów. Kod działający na samym blockchainie
nie może odczytywać przeszłych zdarzeń.

```python
# @dev Mapowanie z adresu właściciela na mapowanie adresów operatorów.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Konto może mieć więcej niż jednego operatora. Proste `HashMap` jest niewystarczające do
ich śledzenia, ponieważ każdy klucz prowadzi do pojedynczej wartości. Zamiast tego możesz użyć
`HashMap[address, bool]` jako wartości. Domyślnie wartość dla każdego adresu to `False`, co oznacza, że nie
jest on operatorem. W razie potrzeby możesz ustawić wartości na `True`.

```python
# @dev Adres mintera, który może wybijać token
minter: address
```

Nowe tokeny muszą być w jakiś sposób tworzone. W tym kontrakcie istnieje tylko jeden podmiot, który ma do tego prawo,
`minter`. Prawdopodobnie będzie to wystarczające na przykład dla gry. Do innych celów może być konieczne
stworzenie bardziej skomplikowanej logiki biznesowej.

```python
# @dev Mapowanie id interfejsu na wartość bool określającą, czy jest on obsługiwany
supportedInterfaces: HashMap[bytes32, bool]

# @dev ID interfejsu ERC-165 dla ERC-165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ID interfejsu ERC-165 dla ERC-721
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) określa mechanizm, dzięki któremu kontrakt może ujawnić, w jaki sposób aplikacje
mogą się z nim komunikować i z jakimi standardami ERC jest zgodny. W tym przypadku kontrakt jest zgodny z ERC-165 i ERC-721.

### Funkcje {#functions}

Są to funkcje, które faktycznie implementują ERC-721.

#### Konstruktor {#constructor}

```python
@external
def __init__():
```

W języku Vyper, podobnie jak w języku Python, funkcja konstruktora nazywa się `__init__`.

```python
    """
    @dev Konstruktor kontraktu.
    """
```

W języku Python i w języku Vyper można również utworzyć komentarz, określając wieloliniowy ciąg znaków (który zaczyna się i kończy
na `"""`) i nie używając go w żaden sposób. Te komentarze mogą również zawierać
[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

Aby uzyskać dostęp do zmiennych stanu, używasz `self.<variable name>` (ponownie, tak samo jak w języku Python).

#### Funkcje widoku (View) {#views}

Są to funkcje, które nie modyfikują stanu blockchaina, a zatem mogą być wykonywane za
darmo, jeśli są wywoływane zewnętrznie. Jeśli funkcje widoku są wywoływane przez kontrakt, nadal muszą być wykonane na
każdym węźle, a zatem kosztują gaz.

```python
@view
@external
```

Te słowa kluczowe przed definicją funkcji, które zaczynają się od znaku małpy (`@`), nazywane są _dekoratorami_. Określają
one okoliczności, w jakich funkcja może zostać wywołana.

- `@view` określa, że ta funkcja jest widokiem.
- `@external` określa, że ta konkretna funkcja może być wywoływana przez transakcje i przez inne kontrakty.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

W przeciwieństwie do języka Python, Vyper jest [językiem statycznie typowanym](https://wikipedia.org/wiki/Type_system#Static_type_checking).
Nie można zadeklarować zmiennej ani parametru funkcji bez określenia [typu danych](https://vyper.readthedocs.io/en/latest/types.html). W tym przypadku parametrem wejściowym jest `bytes32`, wartość 256-bitowa
(256 bitów to natywny rozmiar słowa [Maszyny Wirtualnej Ethereum](/developers/docs/evm/)). Wynikiem jest wartość logiczna (boolean).
Zgodnie z konwencją, nazwy parametrów funkcji zaczynają się od podkreślenia (`_`).

```python
    """
    @dev Identyfikacja interfejsu jest określona w ERC-165.
    @param _interfaceID Id interfejsu
    """
    return self.supportedInterfaces[_interfaceID]
```

Zwraca wartość z mapy HashMap `self.supportedInterfaces`, która jest ustawiana w konstruktorze (`__init__`).

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
         Zgłasza wyjątek, jeśli `_owner` to adres zerowy. NFT przypisane do adresu zerowego są uważane za nieważne.
    @param _owner Adres, dla którego sprawdzane jest saldo.
    """
    assert _owner != ZERO_ADDRESS
```

Ta linia [zapewnia (assert)](https://vyper.readthedocs.io/en/latest/statements.html#assert), że `_owner` nie jest
zerem. Jeśli tak jest, występuje błąd i operacja zostaje wycofana.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Zwraca adres właściciela NFT.
         Zgłasza wyjątek, jeśli `_tokenId` nie jest prawidłowym NFT.
    @param _tokenId Identyfikator NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Zgłasza wyjątek, jeśli `_tokenId` nie jest prawidłowym NFT
    assert owner != ZERO_ADDRESS
    return owner
```

W Maszynie Wirtualnej Ethereum (EVM) każda pamięć, w której nie ma zapisanej wartości, wynosi zero.
Jeśli pod `_tokenId` nie ma tokena, to wartość `self.idToOwner[_tokenId]` wynosi zero. W takim
przypadku funkcja zostaje wycofana.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Pobiera zatwierdzony adres dla pojedynczego NFT.
         Zgłasza wyjątek, jeśli `_tokenId` nie jest prawidłowym NFT.
    @param _tokenId ID NFT, dla którego sprawdzane jest zatwierdzenie.
    """
    # Zgłasza wyjątek, jeśli `_tokenId` nie jest prawidłowym NFT
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

Zauważ, że `getApproved` _może_ zwrócić zero. Jeśli token jest ważny, zwraca `self.idToApprovals[_tokenId]`.
Jeśli nie ma zatwierdzającego, wartość ta wynosi zero.

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

Ta funkcja sprawdza, czy `_operator` ma pozwolenie na zarządzanie wszystkimi tokenami `_owner` w tym kontrakcie.
Ponieważ może być wielu operatorów, jest to dwupoziomowa mapa HashMap.

#### Funkcje pomocnicze transferu {#transfer-helpers}

Te funkcje implementują operacje, które są częścią transferu lub zarządzania tokenami.

```python

### FUNKCJE POMOCNICZE TRANSFERU ###

@view
@internal
```

Ten dekorator, `@internal`, oznacza, że funkcja jest dostępna tylko z innych funkcji w ramach tego
samego kontraktu. Zgodnie z konwencją, nazwy tych funkcji również zaczynają się od podkreślenia (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Zwraca, czy dany wydający może wykonać transfer danego ID tokena
    @param spender adres wydającego do sprawdzenia
    @param tokenId uint256 ID tokena, którego ma dotyczyć transfer
    @return bool czy msg.sender jest zatwierdzony dla danego ID tokena,
        jest operatorem właściciela, lub jest właścicielem tokena
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

Istnieją trzy sposoby, w jakie adres może uzyskać pozwolenie na transfer tokena:

1. Adres jest właścicielem tokena
2. Adres jest zatwierdzony do wydania tego tokena
3. Adres jest operatorem dla właściciela tokena

Powyższa funkcja może być widokiem, ponieważ nie zmienia stanu. Aby zmniejszyć koszty operacyjne, każda
funkcja, która _może_ być widokiem, _powinna_ być widokiem.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Dodaje NFT do danego adresu
         Zgłasza wyjątek, jeśli `_tokenId` jest własnością kogoś.
    """
    # Zgłasza wyjątek, jeśli `_tokenId` jest własnością kogoś
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # Zmienia właściciela
    self.idToOwner[_tokenId] = _to
    # Zmienia śledzenie liczby
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Usuwa NFT z danego adresu
         Zgłasza wyjątek, jeśli `_from` nie jest obecnym właścicielem.
    """
    # Zgłasza wyjątek, jeśli `_from` nie jest obecnym właścicielem
    assert self.idToOwner[_tokenId] == _from
    # Zmienia właściciela
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # Zmienia śledzenie liczby
    self.ownerToNFTokenCount[_from] -= 1
```

Gdy występuje problem z transferem, wycofujemy wywołanie.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Czyści zatwierdzenie danego adresu
         Zgłasza wyjątek, jeśli `_owner` nie jest obecnym właścicielem.
    """
    # Zgłasza wyjątek, jeśli `_owner` nie jest obecnym właścicielem
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # Resetuje zatwierdzenia
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

Zmieniaj wartość tylko wtedy, gdy jest to konieczne. Zmienne stanu znajdują się w pamięci (storage). Zapis do pamięci jest
jedną z najdroższych operacji wykonywanych przez EVM (Maszynę Wirtualną Ethereum) (pod względem
[gazu](/developers/docs/gas/)). Dlatego dobrym pomysłem jest zminimalizowanie tego, nawet zapisanie
istniejącej wartości wiąże się z wysokim kosztem.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Wykonuje transfer NFT.
         Zgłasza wyjątek, chyba że `msg.sender` jest obecnym właścicielem, autoryzowanym operatorem lub zatwierdzonym
         adresem dla tego NFT. (UWAGA: `msg.sender` nie jest dozwolony w funkcji prywatnej, więc przekaż `_sender`.)
         Zgłasza wyjątek, jeśli `_to` to adres zerowy.
         Zgłasza wyjątek, jeśli `_from` nie jest obecnym właścicielem.
         Zgłasza wyjątek, jeśli `_tokenId` nie jest prawidłowym NFT.
    """
```

Mamy tę wewnętrzną funkcję, ponieważ istnieją dwa sposoby na transfer tokenów (zwykły i bezpieczny), ale
chcemy mieć tylko jedno miejsce w kodzie, w którym to robimy, aby ułatwić audyt.

```python
    # Sprawdza wymagania
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Zgłasza wyjątek, jeśli `_to` to adres zerowy
    assert _to != ZERO_ADDRESS
    # Czyści zatwierdzenie. Zgłasza wyjątek, jeśli `_from` nie jest obecnym właścicielem
    self._clearApproval(_from, _tokenId)
    # Usuwa NFT. Zgłasza wyjątek, jeśli `_tokenId` nie jest prawidłowym NFT
    self._removeTokenFrom(_from, _tokenId)
    # Dodaje NFT
    self._addTokenTo(_to, _tokenId)
    # Rejestruje transfer
    log Transfer(_from, _to, _tokenId)
```

Aby wyemitować zdarzenie w języku Vyper, używasz instrukcji `log` ([zobacz tutaj, aby uzyskać więcej szczegółów](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### Funkcje transferu {#transfer-funs}

```python

### FUNKCJE TRANSFERU ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Zgłasza wyjątek, chyba że `msg.sender` jest obecnym właścicielem, autoryzowanym operatorem lub zatwierdzonym
         adresem dla tego NFT.
         Zgłasza wyjątek, jeśli `_from` nie jest obecnym właścicielem.
         Zgłasza wyjątek, jeśli `_to` to adres zerowy.
         Zgłasza wyjątek, jeśli `_tokenId` nie jest prawidłowym NFT.
    @notice Wywołujący jest odpowiedzialny za potwierdzenie, że `_to` jest w stanie odbierać NFT, w przeciwnym razie
            mogą one zostać bezpowrotnie utracone.
    @param _from Obecny właściciel NFT.
    @param _to Nowy właściciel.
    @param _tokenId NFT do transferu.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Ta funkcja pozwala na transfer na dowolny adres. O ile adres nie należy do użytkownika lub kontraktu, który
wie, jak transferować tokeny, każdy przetransferowany token utknie pod tym adresem i będzie bezużyteczny.

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Przenosi własność NFT z jednego adresu na inny adres.
         Zgłasza wyjątek, chyba że `msg.sender` jest obecnym właścicielem, autoryzowanym operatorem lub
         zatwierdzonym adresem dla tego NFT.
         Zgłasza wyjątek, jeśli `_from` nie jest obecnym właścicielem.
         Zgłasza wyjątek, jeśli `_to` to adres zerowy.
         Zgłasza wyjątek, jeśli `_tokenId` nie jest prawidłowym NFT.
         Jeśli `_to` to kontrakt, wywołuje `onERC721Received` na `_to` i zgłasza wyjątek, jeśli
         zwracana wartość nie jest `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
         UWAGA: bytes4 jest reprezentowane przez bytes32 z dopełnieniem
    @param _from Obecny właściciel NFT.
    @param _to Nowy właściciel.
    @param _tokenId NFT do transferu.
    @param _data Dodatkowe dane bez określonego formatu, wysyłane w wywołaniu do `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Można najpierw wykonać transfer, ponieważ jeśli wystąpi problem, i tak wycofamy operację,
więc wszystko, co zostało zrobione w wywołaniu, zostanie anulowane.

```python
    if _to.is_contract: # sprawdza, czy `_to` to adres kontraktu
```

Najpierw sprawdź, czy adres jest kontraktem (czy ma kod). Jeśli nie, załóż, że jest to adres użytkownika
i użytkownik będzie mógł użyć tokena lub go przetransferować. Ale niech to nie uśpi twojej
czujności. Możesz stracić tokeny, nawet przy użyciu `safeTransferFrom`, jeśli przetransferujesz
je na adres, dla którego nikt nie zna klucza prywatnego.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Wywołaj kontrakt docelowy, aby sprawdzić, czy może on odbierać tokeny ERC-721.

```python
        # Zgłasza wyjątek, jeśli cel transferu to kontrakt, który nie implementuje 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

Jeśli miejscem docelowym jest kontrakt, ale taki, który nie akceptuje tokenów ERC-721 (lub który zdecydował się nie akceptować tego
konkretnego transferu), wycofaj operację.

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Ustawia lub potwierdza zatwierdzony adres dla NFT. Adres zerowy oznacza, że nie ma zatwierdzonego adresu.
         Zgłasza wyjątek, chyba że `msg.sender` jest obecnym właścicielem NFT lub autoryzowanym operatorem obecnego właściciela.
         Zgłasza wyjątek, jeśli `_tokenId` nie jest prawidłowym NFT. (UWAGA: Nie jest to zapisane w EIP)
         Zgłasza wyjątek, jeśli `_approved` jest obecnym właścicielem. (UWAGA: Nie jest to zapisane w EIP)
    @param _approved Adres do zatwierdzenia dla danego ID NFT.
    @param _tokenId ID tokena do zatwierdzenia.
    """
    owner: address = self.idToOwner[_tokenId]
    # Zgłasza wyjątek, jeśli `_tokenId` nie jest prawidłowym NFT
    assert owner != ZERO_ADDRESS
    # Zgłasza wyjątek, jeśli `_approved` jest obecnym właścicielem
    assert _approved != owner
```

Zgodnie z konwencją, jeśli nie chcesz mieć zatwierdzającego, wyznaczasz adres zerowy, a nie siebie.

```python
    # Sprawdza wymagania
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Aby ustawić zatwierdzenie, możesz być właścicielem lub operatorem autoryzowanym przez właściciela.

```python
    # Ustawia zatwierdzenie
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Włącza lub wyłącza zatwierdzenie dla strony trzeciej ("operatora") do zarządzania wszystkimi
         aktywami `msg.sender`. Emituje również zdarzenie ApprovalForAll.
         Zgłasza wyjątek, jeśli `_operator` to `msg.sender`. (UWAGA: Nie jest to zapisane w EIP)
    @notice Działa to nawet, jeśli nadawca nie posiada w tym czasie żadnych tokenów.
    @param _operator Adres do dodania do zestawu autoryzowanych operatorów.
    @param _approved True, jeśli operatorzy są zatwierdzeni, false, aby cofnąć zatwierdzenie.
    """
    # Zgłasza wyjątek, jeśli `_operator` to `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### Wybijanie nowych tokenów i niszczenie istniejących {#mint-burn}

Konto, które utworzyło kontrakt, to `minter`, superużytkownik, który jest upoważniony do wybijania
nowych NFT. Jednak nawet on nie ma prawa spalić istniejących tokenów. Może to zrobić tylko właściciel lub podmiot
upoważniony przez właściciela.

```python
### FUNKCJE WYBIJANIA I SPALANIA ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Ta funkcja zawsze zwraca `True`, ponieważ jeśli operacja się nie powiedzie, zostaje wycofana.

```python
    """
    @dev Funkcja do wybijania tokenów
         Zgłasza wyjątek, jeśli `msg.sender` nie jest minterem.
         Zgłasza wyjątek, jeśli `_to` to adres zerowy.
         Zgłasza wyjątek, jeśli `_tokenId` jest własnością kogoś.
    @param _to Adres, który otrzyma wybite tokeny.
    @param _tokenId Id tokena do wybicia.
    @return Wartość logiczna wskazująca, czy operacja zakończyła się sukcesem.
    """
    # Zgłasza wyjątek, jeśli `msg.sender` nie jest minterem
    assert msg.sender == self.minter
```

Tylko wybijający (konto, które utworzyło kontrakt ERC-721) może wybijać nowe tokeny. Może to stanowić
problem w przyszłości, jeśli będziemy chcieli zmienić tożsamość wybijającego. W
kontrakcie produkcyjnym prawdopodobnie chciałbyś mieć funkcję, która pozwala wybijającemu na transfer
uprawnień do wybijania na kogoś innego.

```python
    # Zgłasza wyjątek, jeśli `_to` to adres zerowy
    assert _to != ZERO_ADDRESS
    # Dodaje NFT. Zgłasza wyjątek, jeśli `_tokenId` jest własnością kogoś
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

Zgodnie z konwencją, wybijanie nowych tokenów liczy się jako transfer z adresu zerowego.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Spala określony token ERC-721.
         Zgłasza wyjątek, chyba że `msg.sender` jest obecnym właścicielem, autoryzowanym operatorem lub zatwierdzonym
         adresem dla tego NFT.
         Zgłasza wyjątek, jeśli `_tokenId` nie jest prawidłowym NFT.
    @param _tokenId uint256 id tokena ERC-721 do spalenia.
    """
    # Sprawdza wymagania
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Zgłasza wyjątek, jeśli `_tokenId` nie jest prawidłowym NFT
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

Każdy, kto ma pozwolenie na transfer tokena, ma prawo go spalić. Chociaż spalenie wydaje się równoznaczne z
transferem na adres zerowy, adres zerowy w rzeczywistości nie otrzymuje tokena. Pozwala nam to
zwolnić całą pamięć, która była używana dla tokena, co może zmniejszyć koszt gazu transakcji.

## Korzystanie z tego kontraktu {#using-contract}

W przeciwieństwie do języka Solidity, Vyper nie posiada dziedziczenia. Jest to celowy wybór projektowy, aby
kod był jaśniejszy, a tym samym łatwiejszy do zabezpieczenia. Aby więc stworzyć własny kontrakt ERC-721 w języku Vyper, bierzesz [ten
kontrakt](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) i modyfikujesz go,
aby zaimplementować pożądaną logikę biznesową.

## Podsumowanie {#conclusion}

W ramach podsumowania, oto kilka najważniejszych koncepcji w tym kontrakcie:

- Aby odbierać tokeny ERC-721 za pomocą bezpiecznego transferu, kontrakty muszą implementować interfejs `ERC721Receiver`.
- Nawet jeśli używasz bezpiecznego transferu, tokeny nadal mogą utknąć, jeśli wyślesz je na adres, którego klucz prywatny
  jest nieznany.
- Gdy występuje problem z operacją, dobrym pomysłem jest `revert` (wycofanie) wywołania, zamiast po prostu zwracać
  wartość błędu.
- Tokeny ERC-721 istnieją, gdy mają właściciela.
- Istnieją trzy sposoby na uzyskanie autoryzacji do transferu NFT. Możesz być właścicielem, być zatwierdzonym dla określonego tokena,
  lub być operatorem dla wszystkich tokenów właściciela.
- Przeszłe zdarzenia są widoczne tylko poza blockchainem. Kod działający wewnątrz blockchaina nie może ich przeglądać.

Teraz idź i implementuj bezpieczne kontrakty w języku Vyper.

[Zobacz tutaj więcej moich prac](https://cryptodocguy.pro/).