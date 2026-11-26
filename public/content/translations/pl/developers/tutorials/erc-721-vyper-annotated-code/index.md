---
title: "Przewodnik po kontrakcie ERC-721 w języku Vyper"
description: "Kontrakt ERC-721 Ryuyi Nakamury i jak on działa"
author: Ori Pomerantz
lang: pl
tags: ["Vyper", "erc-721", "Python"]
skill: beginner
breadcrumb: Vyper ERC-721
published: 2021-04-01
---

## Wprowadzenie {#introduction}

Standard [ERC-721](/developers/docs/standards/tokens/erc-721/) jest używany do przechowywania własności niewymiennych tokenów (NFT).
Tokeny [ERC-20](/developers/docs/standards/tokens/erc-20/) zachowują się jak towar, ponieważ nie ma różnicy między poszczególnymi tokenami.
W przeciwieństwie do nich, tokeny ERC-721 są zaprojektowane dla aktywów, które są podobne, ale nie identyczne, takich jak różne [kreskówkowe koty](https://www.cryptokitties.co/)
lub tytuły własności do różnych nieruchomości.

W tym artykule przeanalizujemy [kontrakt ERC-721 autorstwa Ryuyi Nakamury](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy).
Ten kontrakt jest napisany w języku [Vyper](https://vyper.readthedocs.io/en/latest/index.html), języku kontraktów podobnym do języka Python, zaprojektowanym tak, aby trudniej było w nim napisać niebezpieczny kod niż w języku Solidity.

## Kontrakt {#contract}

```python
#pragma version >0.3.10
```

Linia `#pragma version` informuje kompilator, dla jakich wersji języka Vyper napisany jest kontrakt. `>0.3.10` akceptuje każde wydanie nowsze niż 0.3.10, ale ten kontrakt w rzeczywistości wymaga języka Vyper w wersji 0.4.1 lub nowszej: rejestruje zdarzenia z argumentami nazwanymi (na przykład `log IERC721.Transfer(...)`), co jest funkcją dodaną w wersji Vyper 0.4.1, więc nie skompiluje się w wersji 0.4.0.

```python
# @dev Implementacja standardu niewymiennego tokena (NFT) ERC-721.
# @author Ryuya Nakamura (@nrryuya)
# Zmodyfikowano z: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Komentarze w języku Vyper, podobnie jak w języku Python, zaczynają się od znaku hash (`#`) i trwają do końca linii. Komentarze zawierające `@<keyword>` są używane przez [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) do tworzenia dokumentacji czytelnej dla człowieka.

```python
from ethereum.ercs import IERC165
from ethereum.ercs import IERC721

implements: IERC721
implements: IERC165
```

Interfejsy ERC-165 i ERC-721 są dostarczane wraz z kompilatorem Vyper, więc importujemy je z `ethereum.ercs` zamiast pisać je samodzielnie. [Definicję interfejsu ERC-721 można zobaczyć tutaj](https://github.com/vyperlang/vyper/blob/master/vyper/builtins/interfaces/IERC721.vyi).
Linie `implements:` deklarują, że ten kontrakt udostępnia oba interfejsy, a kompilator sprawdza, czy każda wymagana przez nie funkcja jest zdefiniowana poniżej.

### Interfejs ERC721Receiver {#receiver-interface}

```python
# Interfejs dla kontraktu wywoływanego przez safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 obsługuje dwa rodzaje transferu:

- `transferFrom`, który pozwala nadawcy określić dowolny adres docelowy i przenosi odpowiedzialność za transfer na nadawcę. Oznacza to, że można wykonać transfer na nieprawidłowy adres, w którym to przypadku NFT przepada na zawsze.
- `safeTransferFrom`, który sprawdza, czy adres docelowy jest kontraktem. Jeśli tak, kontrakt ERC-721 pyta kontrakt odbierający, czy chce otrzymać NFT.

Aby odpowiedzieć na żądania `safeTransferFrom`, kontrakt odbierający musi implementować `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

Adres `_from` to obecny właściciel tokena. Adres `_operator` to ten, który zażądał transferu (te dwa mogą nie być takie same z powodu limitów wydatków). Zgodnie z konwencją, większość parametrów funkcji w tym kontrakcie zaczyna się od podkreślenia (`_`).

```python
            _tokenId: uint256,
```

Identyfikatory tokenów ERC-721 mają 256 bitów. Zazwyczaj są one tworzone poprzez haszowanie opisu tego, co reprezentuje dany token.

```python
            _data: Bytes[1024]
```

Żądanie może zawierać do 1024 bajtów danych użytkownika.

```python
        ) -> bytes4: nonpayable
```

Aby zapobiec przypadkom, w których kontrakt przypadkowo akceptuje transfer, zwracana wartość nie jest wartością logiczną (boolean), ale konkretną czterobajtową wartością, selektorem funkcji `onERC721Received`. Funkcja to `nonpayable`, ponieważ kontrakt odbierający może zmienić swój własny stan, gdy akceptuje token.

### Zdarzenia {#events}

[Zdarzenia](/developers/docs/smart-contracts/anatomy/#events-and-logs)
są emitowane w celu poinformowania użytkowników i serwerów poza blockchainem o zdarzeniach. Należy pamiętać, że treść zdarzeń nie jest dostępna dla kontraktów na blockchainie. Trzy zdarzenia ERC-721 są zdefiniowane przez zaimportowany przez nas interfejs `IERC721`, więc ten kontrakt nie deklaruje ich samodzielnie; emituje je za pomocą `log IERC721.<Event>(...)`, jak zobaczymy w funkcjach transferu poniżej.

`Transfer` (`sender`, `receiver`, `token_id`) zgłasza zmianę własności NFT. Jest to podobne do zdarzenia Transfer w ERC-20, z tą różnicą, że zgłaszamy `token_id` zamiast kwoty. Nikt nie jest właścicielem adresu zerowego, więc zgodnie z konwencją używamy go do zgłaszania tworzenia i niszczenia tokenów. Jedynym wyjątkiem jest tworzenie kontraktu, podczas którego dowolna liczba NFT może zostać utworzona i przypisana bez emitowania `Transfer`.

Zatwierdzenie (approval) w ERC-721 jest podobne do limitu wydatków (allowance) w ERC-20: określony adres ma prawo do transferu określonego tokena, a `Approval` (`owner`, `approved`, `token_id`) jest emitowane za każdym razem, gdy ten zatwierdzony adres jest ustawiany lub potwierdzany. Daje to mechanizm dla kontraktów do reagowania, gdy akceptują token. Kontrakty nie mogą nasłuchiwać zdarzeń, więc jeśli po prostu przetransferujesz do nich token, nie będą o tym „wiedzieć”. W ten sposób właściciel najpierw przesyła zatwierdzenie, a następnie wysyła żądanie do kontraktu: „Zatwierdziłem dla ciebie transfer tokena X, proszę zrób...”. Jest to wybór projektowy, aby standard ERC-721 był podobny do standardu ERC-20. Ponieważ tokeny ERC-721 są niewymienne, kontrakt może również zidentyfikować, że otrzymał konkretny token, sprawdzając własność tokena.

Na koniec, `ApprovalForAll` (`owner`, `operator`, `approved`) jest emitowane, gdy _operator_ jest włączany lub wyłączany dla właściciela. Czasami przydatne jest posiadanie operatora, który może zarządzać wszystkimi tokenami konta określonego typu (tymi, które są zarządzane przez określony kontrakt), podobnie do pełnomocnictwa. Na przykład, mogę chcieć dać takie uprawnienie kontraktowi, który sprawdza, czy nie kontaktowałem się z nim przez sześć miesięcy, a jeśli tak, rozdziela moje aktywa moim spadkobiercom (jeśli jeden z nich o to poprosi, kontrakty nie mogą nic zrobić bez wywołania przez transakcję). W ERC-20 możemy po prostu dać wysoki limit wydatków kontraktowi spadkowemu, ale to nie działa dla ERC-721, ponieważ tokeny są niewymienne. To jest odpowiednik. Wartość `approved` mówi nam, czy zdarzenie dotyczy zatwierdzenia, czy wycofania zatwierdzenia.

### Zmienne stanu {#state-vars}

Te zmienne zawierają obecny stan tokenów: które z nich są dostępne i kto jest ich właścicielem. Większość z nich to obiekty `HashMap`, [jednokierunkowe mapowania, które istnieją między dwoma typami](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Mapowanie z ID NFT na adres, który go posiada.
idToOwner: HashMap[uint256, address]

# @dev Mapowanie z ID NFT na zatwierdzony adres.
idToApprovals: HashMap[uint256, address]
```

Tożsamości użytkowników i kontraktów w Ethereum są reprezentowane przez 160-bitowe adresy. Te dwie zmienne mapują identyfikatory tokenów na ich właścicieli i tych zatwierdzonych do ich transferu (maksymalnie jeden dla każdego). W Ethereum niezainicjowane dane zawsze wynoszą zero, więc jeśli nie ma właściciela lub zatwierdzonego transferującego, wartość dla tego tokena wynosi zero.

```python
# @dev Mapowanie z adresu właściciela na liczbę jego tokenów.
ownerToNFTokenCount: HashMap[address, uint256]
```

Ta zmienna przechowuje liczbę tokenów dla każdego właściciela. Nie ma mapowania od właścicieli do tokenów, więc jedynym sposobem na zidentyfikowanie tokenów, które posiada dany właściciel, jest spojrzenie wstecz w historię zdarzeń blockchaina i znalezienie odpowiednich zdarzeń `Transfer`. Możemy użyć tej zmiennej, aby wiedzieć, kiedy mamy wszystkie NFT i nie musimy szukać jeszcze dalej w czasie.

Należy pamiętać, że ten algorytm działa tylko dla interfejsów użytkownika i zewnętrznych serwerów. Kod działający na samym blockchainie nie może odczytywać przeszłych zdarzeń.

```python
# @dev Mapowanie z adresu właściciela na mapowanie adresów operatorów.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Konto może mieć więcej niż jednego operatora. Proste `HashMap` jest niewystarczające do ich śledzenia, ponieważ każdy klucz prowadzi do pojedynczej wartości. Zamiast tego można użyć `HashMap[address, bool]` jako wartości. Domyślnie wartość dla każdego adresu to `False`, co oznacza, że nie jest on operatorem. W razie potrzeby można ustawić wartości na `True`.

```python
# @dev Adres wybijającego, który może wybijać token
minter: address
```

Nowe tokeny muszą być jakoś tworzone. W tym kontrakcie istnieje tylko jeden podmiot, który ma do tego prawo, `minter`. Prawdopodobnie będzie to wystarczające na przykład dla gry. Do innych celów może być konieczne stworzenie bardziej skomplikowanej logiki biznesowej.

```python
# @dev Statyczna lista obsługiwanych identyfikatorów interfejsów ERC-165
SUPPORTED_INTERFACES: constant(bytes4[2]) = [
    # ID interfejsu ERC-165 dla ERC-165
    0x01ffc9a7,
    # ID interfejsu ERC-165 dla ERC-721
    0x80ac58cd,
]
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) określa mechanizm dla kontraktu do ujawniania, w jaki sposób aplikacje mogą się z nim komunikować, z którymi standardami ERC jest zgodny. `SUPPORTED_INTERFACES` to stała lista dwóch czterobajtowych identyfikatorów interfejsów, z którymi ten kontrakt jest zgodny: samego ERC-165 i ERC-721.

### Funkcje {#functions}

Są to funkcje, które faktycznie implementują ERC-721.

#### Konstruktor {#constructor}

```python
@deploy
def __init__():
```

W języku Vyper, podobnie jak w języku Python, funkcja konstruktora nazywa się `__init__`. Jest oznaczona dekoratorem `@deploy`, co oznacza, że uruchamia się raz, podczas wdrażania kontraktu.

```python
    """
    @dev Konstruktor kontraktu.
    """
```

W języku Python i w języku Vyper można również utworzyć komentarz, określając wieloliniowy ciąg znaków (który zaczyna się i kończy na `"""`) i nie używając go w żaden sposób. Te komentarze mogą również zawierać [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.minter = msg.sender
```

Aby uzyskać dostęp do zmiennych stanu, używa się `self.<variable name>` (ponownie, tak samo jak w języku Python). Konstruktor zapisuje konto, które wdrożyło kontrakt, jako `minter`.

#### Funkcje widoku {#views}

Są to funkcje, które nie modyfikują stanu blockchaina, a zatem mogą być wykonywane za darmo, jeśli są wywoływane zewnętrznie. Jeśli funkcje widoku są wywoływane przez kontrakt, nadal muszą być wykonane na każdym węźle, a zatem kosztują gaz.

```python
@view
@external
```

Te słowa kluczowe przed definicją funkcji, które zaczynają się od znaku małpy (`@`), nazywane są _dekoratorami_. Określają one okoliczności, w których funkcja może zostać wywołana.

- `@view` określa, że ta funkcja jest widokiem.
- `@external` określa, że ta konkretna funkcja może być wywoływana przez transakcje i przez inne kontrakty.

```python
def supportsInterface(interface_id: bytes4) -> bool:
```

W przeciwieństwie do języka Python, Vyper jest [językiem statycznie typowanym](https://wikipedia.org/wiki/Type_system#Static_type_checking).
Nie można zadeklarować zmiennej ani parametru funkcji bez określenia [typu danych](https://vyper.readthedocs.io/en/latest/types.html). W tym przypadku parametrem wejściowym jest `bytes4`, wartość czterobajtowa, a wyjściem jest wartość logiczna.

```python
    """
    @dev Identyfikacja interfejsu jest określona w ERC-165.
    @param interface_id Id interfejsu
    """
    return interface_id in SUPPORTED_INTERFACES
```

Zwraca `True`, jeśli `interface_id` jest jednym z identyfikatorów interfejsów na liście `SUPPORTED_INTERFACES`.

```python
### FUNKCJE VIEW ###
```

Są to funkcje widoku, które udostępniają informacje o tokenach użytkownikom i innym kontraktom.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev Zwraca liczbę NFT posiadanych przez `_owner`.
         Zgłasza błąd, jeśli `_owner` to adres zerowy. NFT przypisane do adresu zerowego są uważane za nieważne.
    @param _owner Adres, dla którego ma zostać sprawdzone saldo.
    """
    assert _owner != empty(address)
```

Ta linia [zapewnia](https://vyper.readthedocs.io/en/latest/statements.html#assert), że `_owner` nie jest
adresem zerowym, zapisanym jako `empty(address)`. Jeśli tak jest, występuje błąd i operacja zostaje wycofana.

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
    assert owner != empty(address)
    return owner
```

W Maszynie Wirtualnej Ethereum (EVM) każda pamięć, która nie ma w sobie zapisanej wartości, wynosi zero.
Jeśli nie ma tokena pod `_tokenId`, to wartość `self.idToOwner[_tokenId]` wynosi zero. W takim
przypadku funkcja zostaje wycofana.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Pobiera zatwierdzony adres dla pojedynczego NFT.
         Zgłasza błąd, jeśli `_tokenId` nie jest prawidłowym NFT.
    @param _tokenId ID NFT, dla którego ma zostać sprawdzone zatwierdzenie.
    """
    # Zgłasza błąd, jeśli `_tokenId` nie jest prawidłowym NFT
    assert self.idToOwner[_tokenId] != empty(address)
    return self.idToApprovals[_tokenId]
```

Należy pamiętać, że `getApproved` _może_ zwrócić zero. Jeśli token jest ważny, zwraca `self.idToApprovals[_tokenId]`.
Jeśli nie ma zatwierdzającego, ta wartość wynosi zero.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev Sprawdza, czy `_operator` jest zatwierdzonym operatorem dla `_owner`.
    @param _owner Adres, który posiada NFT.
    @param _operator Adres, który działa w imieniu właściciela.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

Ta funkcja sprawdza, czy `_operator` ma prawo zarządzać wszystkimi tokenami `_owner` w tym kontrakcie.
Ponieważ może być wielu operatorów, jest to dwupoziomowa mapa mieszająca (HashMap).

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
    @param tokenId uint256 ID tokena do transferu
    @return bool czy msg.sender jest zatwierdzony dla danego ID tokena,
        jest operatorem właściciela, lub jest właścicielem tokena
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

Istnieją trzy sposoby, w jakie adres może uzyskać uprawnienia do transferu tokena:

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
         Zgłasza błąd, jeśli `_tokenId` jest posiadany przez kogoś.
    """
    # Zgłasza błąd, jeśli `_tokenId` jest posiadany przez kogoś
    assert self.idToOwner[_tokenId] == empty(address)
    # Zmienia właściciela
    self.idToOwner[_tokenId] = _to
    # Zmienia śledzenie liczby
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Usuwa NFT z danego adresu
         Zgłasza błąd, jeśli `_from` nie jest obecnym właścicielem.
    """
    # Zgłasza błąd, jeśli `_from` nie jest obecnym właścicielem
    assert self.idToOwner[_tokenId] == _from
    # Zmienia właściciela
    self.idToOwner[_tokenId] = empty(address)
    # Zmienia śledzenie liczby
    self.ownerToNFTokenCount[_from] -= 1
```

Gdy występuje problem z transferem, wycofujemy wywołanie.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Czyści zatwierdzenie danego adresu
         Zgłasza błąd, jeśli `_owner` nie jest obecnym właścicielem.
    """
    # Zgłasza błąd, jeśli `_owner` nie jest obecnym właścicielem
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != empty(address):
        # Resetuje zatwierdzenia
        self.idToApprovals[_tokenId] = empty(address)
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
         Zgłasza błąd, chyba że `msg.sender` jest obecnym właścicielem, autoryzowanym operatorem lub zatwierdzonym
         adresem dla tego NFT. (UWAGA: `msg.sender` nie jest dozwolony w funkcji prywatnej, więc przekaż `_sender`.)
         Zgłasza błąd, jeśli `_to` to adres zerowy.
         Zgłasza błąd, jeśli `_from` nie jest obecnym właścicielem.
         Zgłasza błąd, jeśli `_tokenId` nie jest prawidłowym NFT.
    """
```

Mamy tę wewnętrzną funkcję, ponieważ istnieją dwa sposoby transferu tokenów (zwykły i bezpieczny), ale
chcemy mieć tylko jedno miejsce w kodzie, w którym to robimy, aby ułatwić audyt.

```python
    # Sprawdza wymagania
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Zgłasza błąd, jeśli `_to` to adres zerowy
    assert _to != empty(address)
    # Czyści zatwierdzenie. Zgłasza błąd, jeśli `_from` nie jest obecnym właścicielem
    self._clearApproval(_from, _tokenId)
    # Usuwa NFT. Zgłasza błąd, jeśli `_tokenId` nie jest prawidłowym NFT
    self._removeTokenFrom(_from, _tokenId)
    # Dodaje NFT
    self._addTokenTo(_to, _tokenId)
    # Rejestruje transfer
    log IERC721.Transfer(sender=_from, receiver=_to, token_id=_tokenId)
```

Aby wyemitować zdarzenie w języku Vyper, używa się instrukcji `log` ([zobacz tutaj, aby uzyskać więcej szczegółów](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).
Ponieważ zdarzenia należą do zaimportowanego interfejsu, odnosimy się do nich jako `IERC721.Transfer` i przekazujemy ich pola za
pomocą słów kluczowych.

#### Funkcje transferu {#transfer-funs}

```python

### FUNKCJE TRANSFERU ###

@external
@payable
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Zgłasza błąd, chyba że `msg.sender` jest obecnym właścicielem, autoryzowanym operatorem lub zatwierdzonym
         adresem dla tego NFT.
         Zgłasza błąd, jeśli `_from` nie jest obecnym właścicielem.
         Zgłasza błąd, jeśli `_to` to adres zerowy.
         Zgłasza błąd, jeśli `_tokenId` nie jest prawidłowym NFT.
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

Dekorator `@payable` znajduje się tutaj, ponieważ interfejs `IERC721` deklaruje `transferFrom`, `safeTransferFrom` i
`approve` jako płatne (payable), więc kontrakt implementujący ten interfejs musi pasować do tych sygnatur.

```python
@external
@payable
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Przenosi własność NFT z jednego adresu na inny adres.
         Zgłasza błąd, chyba że `msg.sender` jest obecnym właścicielem, autoryzowanym operatorem lub
         zatwierdzonym adresem dla tego NFT.
         Zgłasza błąd, jeśli `_from` nie jest obecnym właścicielem.
         Zgłasza błąd, jeśli `_to` to adres zerowy.
         Zgłasza błąd, jeśli `_tokenId` nie jest prawidłowym NFT.
         Jeśli `_to` to kontrakt, wywołuje `onERC721Received` na `_to` i zgłasza błąd, jeśli
         zwracana wartość nie jest `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
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
        returnValue: bytes4 = extcall ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Wywołaj kontrakt docelowy, aby sprawdzić, czy może on odbierać tokeny ERC-721. Vyper 0.4 wymaga oznaczania wywołań do innych kontraktów,
więc wywołanie jest poprzedzone prefiksem `extcall`.

```python
        # Zgłasza błąd, jeśli cel transferu to kontrakt, który nie implementuje 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes4)
```

Jeśli miejscem docelowym jest kontrakt, ale taki, który nie akceptuje tokenów ERC-721 (lub który zdecydował się nie akceptować tego
konkretnego transferu), wycofaj operację.

```python
@external
@payable
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Ustawia lub potwierdza zatwierdzony adres dla NFT. Adres zerowy wskazuje, że nie ma zatwierdzonego adresu.
         Zgłasza błąd, chyba że `msg.sender` jest obecnym właścicielem NFT lub autoryzowanym operatorem obecnego właściciela.
         Zgłasza błąd, jeśli `_tokenId` nie jest prawidłowym NFT. (UWAGA: Nie jest to zapisane w EIP)
         Zgłasza błąd, jeśli `_approved` jest obecnym właścicielem. (UWAGA: Nie jest to zapisane w EIP)
    @param _approved Adres do zatwierdzenia dla danego ID NFT.
    @param _tokenId ID tokena do zatwierdzenia.
    """
    owner: address = self.idToOwner[_tokenId]
    # Zgłasza błąd, jeśli `_tokenId` nie jest prawidłowym NFT
    assert owner != empty(address)
    # Zgłasza błąd, jeśli `_approved` jest obecnym właścicielem
    assert _approved != owner
```

Zgodnie z konwencją, jeśli nie chcesz mieć zatwierdzającego, wyznaczasz adres zerowy, a nie siebie.

```python
    # Sprawdza wymagania
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Aby ustawić zatwierdzenie, musisz być właścicielem lub operatorem upoważnionym przez właściciela.

```python
    # Ustawia zatwierdzenie
    self.idToApprovals[_tokenId] = _approved
    log IERC721.Approval(owner=owner, approved=_approved, token_id=_tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Włącza lub wyłącza zatwierdzenie dla strony trzeciej ("operatora") do zarządzania wszystkimi
         aktywami `msg.sender`. Emituje również zdarzenie ApprovalForAll.
         Zgłasza błąd, jeśli `_operator` to `msg.sender`. (UWAGA: Nie jest to zapisane w EIP)
    @notice Działa to nawet, jeśli nadawca nie posiada w tym czasie żadnych tokenów.
    @param _operator Adres do dodania do zestawu autoryzowanych operatorów.
    @param _approved True, jeśli operatorzy są zatwierdzeni, false, aby cofnąć zatwierdzenie.
    """
    # Zgłasza błąd, jeśli `_operator` to `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log IERC721.ApprovalForAll(owner=msg.sender, operator=_operator, approved=_approved)
```

#### Wybijanie nowych tokenów i niszczenie istniejących {#mint-burn}

Konto, które utworzyło kontrakt, to `minter`, superużytkownik upoważniony do wybijania
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
         Zgłasza błąd, jeśli `msg.sender` nie jest wybijającym.
         Zgłasza błąd, jeśli `_to` to adres zerowy.
         Zgłasza błąd, jeśli `_tokenId` jest posiadany przez kogoś.
    @param _to Adres, który otrzyma wybite tokeny.
    @param _tokenId Id tokena do wybicia.
    @return Wartość logiczna wskazująca, czy operacja zakończyła się sukcesem.
    """
    # Zgłasza błąd, jeśli `msg.sender` nie jest wybijającym
    assert msg.sender == self.minter
```

Tylko wybijający (konto, które utworzyło kontrakt ERC-721) może wybijać nowe tokeny. Może to stanowić
problem w przyszłości, jeśli będziemy chcieli zmienić tożsamość wybijającego. W
kontrakcie produkcyjnym prawdopodobnie chciałbyś mieć funkcję, która pozwala wybijającemu na transfer
uprawnień do wybijania na kogoś innego.

```python
    # Zgłasza błąd, jeśli `_to` to adres zerowy
    assert _to != empty(address)
    # Dodaje NFT. Zgłasza błąd, jeśli `_tokenId` jest posiadany przez kogoś
    self._addTokenTo(_to, _tokenId)
    log IERC721.Transfer(sender=empty(address), receiver=_to, token_id=_tokenId)
    return True
```

Zgodnie z konwencją, wybijanie nowych tokenów liczy się jako transfer z adresu zerowego.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Spala określony token ERC-721.
         Zgłasza błąd, chyba że `msg.sender` jest obecnym właścicielem, autoryzowanym operatorem lub zatwierdzonym
         adresem dla tego NFT.
         Zgłasza błąd, jeśli `_tokenId` nie jest prawidłowym NFT.
    @param _tokenId uint256 id tokena ERC-721 do spalenia.
    """
    # Sprawdza wymagania
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Zgłasza błąd, jeśli `_tokenId` nie jest prawidłowym NFT
    assert owner != empty(address)
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log IERC721.Transfer(sender=owner, receiver=empty(address), token_id=_tokenId)
```

Każdy, kto ma prawo do transferu tokena, ma prawo go spalić. Chociaż spalenie wydaje się równoznaczne z
transferem na adres zerowy, adres zerowy w rzeczywistości nie otrzymuje tokena. Pozwala nam to
zwolnić całą pamięć, która była używana dla tokena, co może zmniejszyć koszt gazu transakcji.

## Korzystanie z tego kontraktu {#using-contract}

W przeciwieństwie do języka Solidity, Vyper nie posiada dziedziczenia. Jest to celowy wybór projektowy, aby
kod był jaśniejszy, a tym samym łatwiejszy do zabezpieczenia. Aby więc stworzyć własny kontrakt ERC-721 w języku Vyper, bierzesz [ten
kontrakt](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) i modyfikujesz go,
aby zaimplementować pożądaną logikę biznesową.

## Podsumowanie {#conclusion}

Dla przypomnienia, oto kilka najważniejszych koncepcji w tym kontrakcie:

- Aby odbierać tokeny ERC-721 za pomocą bezpiecznego transferu, kontrakty muszą implementować interfejs `ERC721Receiver`.
- Nawet jeśli używasz bezpiecznego transferu, tokeny mogą nadal utknąć, jeśli wyślesz je na adres, którego klucz prywatny
  jest nieznany.
- Gdy występuje problem z operacją, dobrym pomysłem jest wycofanie (`revert`) wywołania, zamiast po prostu zwracać
  wartość błędu.
- Tokeny ERC-721 istnieją, gdy mają właściciela.
- Istnieją trzy sposoby na uzyskanie autoryzacji do transferu NFT. Możesz być właścicielem, być zatwierdzonym dla określonego tokena,
  lub być operatorem dla wszystkich tokenów właściciela.
- Przeszłe zdarzenia są widoczne tylko poza blockchainem. Kod działający wewnątrz blockchaina nie może ich przeglądać.

Teraz idź i implementuj bezpieczne kontrakty w języku Vyper.

[Zobacz tutaj więcej moich prac](https://cryptodocguy.pro/).
