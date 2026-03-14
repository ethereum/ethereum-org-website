---
title: "Průchod kontraktem Vyper ERC-721"
description: Kontrakt ERC-721 od Ryuyi Nakamury a jak funguje
author: Ori Pomerantz
lang: cs
tags: [ "vyper", "erc-721", "python" ]
skill: beginner
published: 2021-04-01
---

## Úvod {#introduction}

Standard [ERC-721](/developers/docs/standards/tokens/erc-721/) se používá k držení vlastnictví nezaměnitelných tokenů (NFT).
Tokeny [ERC-20](/developers/docs/standards/tokens/erc-20/) se chovají jako komodita, protože mezi jednotlivými tokeny není žádný rozdíl.
Naproti tomu tokeny ERC-721 jsou navrženy pro aktiva, která jsou si podobná, ale ne totožná, jako jsou například různé [kreslené kočky](https://www.cryptokitties.co/)
nebo vlastnická práva k různým nemovitostem.

V tomto článku budeme analyzovat [kontrakt ERC-721 od Ryuyi Nakamury](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy).
Tento kontrakt je napsán v jazyce [Vyper](https://vyper.readthedocs.io/en/latest/index.html), kontraktovém jazyce podobném Pythonu, který je navržen tak, aby bylo
psaní nezabezpečeného kódu obtížnější než v Solidity.

## Kontrakt {#contract}

```python
# @dev Implementace standardu nezaměnitelného tokenu ERC-721.
# @author Ryuya Nakamura (@nrryuya)
# Upraveno z: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Komentáře ve Vyperu, stejně jako v Pythonu, začínají mřížkou (`#`) a pokračují až do konce řádku. Komentáře, které obsahují
`@<klíčové slovo>`, se používají v [NatSpecu](https://vyper.readthedocs.io/en/latest/natspec.html) k vytvoření lidsky čitelné
dokumentace.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

Rozhraní ERC-721 je zabudováno do jazyka Vyper.
[Definici kódu naleznete zde](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py).
Definice rozhraní je napsána v Pythonu, nikoli ve Vyperu, protože rozhraní se používají nejen v rámci
blockchainu, ale také při odesílání transakce do blockchainu z externího klienta, který může být napsán v
Pythonu.

První řádek importuje rozhraní a druhý určuje, že ho zde implementujeme.

### Rozhraní ERC721Receiver {#receiver-interface}

```python
# Rozhraní pro kontrakt volaný funkcí safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 podporuje dva typy převodů:

- `transferFrom`, který umožňuje odesílateli zadat jakoukoli cílovou adresu a přenáší odpovědnost
  za převod na odesílatele. To znamená, že můžete provést převod na neplatnou adresu, v takovém případě
  je NFT navždy ztraceno.
- `safeTransferFrom`, který kontroluje, zda je cílová adresa kontrakt. Pokud ano, kontrakt ERC-721 se
  zeptá přijímajícího kontraktu, zda chce NFT přijmout.

Aby mohl přijímající kontrakt odpovídat na požadavky `safeTransferFrom`, musí implementovat `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

Adresa `_from` je aktuální vlastník tokenu. Adresa `_operator` je ta, která
požadovala převod (tyto dvě adresy se mohou lišit z důvodu povolenek).

```python
            _tokenId: uint256,
```

ID tokenů ERC-721 jsou 256bitové. Obvykle se vytvářejí hašováním popisu toho,
co token představuje.

```python
            _data: Bytes[1024]
```

Požadavek může obsahovat až 1024 bajtů uživatelských dat.

```python
        ) -> bytes32: view
```

Aby se předešlo případům, kdy kontrakt omylem přijme převod, není návratová hodnota booleovská,
ale 256 bitů s konkrétní hodnotou.

Tato funkce je `view`, což znamená, že může číst stav blockchainu, ale nemůže ho měnit.

### Události {#events}

[Události](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e)
se vysílají za účelem informování uživatelů a serverů mimo blockchain o událostech. Všimněte si, že obsah událostí
není dostupný pro kontrakty na blockchainu.

```python
# @dev Vysílá se, když se jakýmkoli mechanismem změní vlastnictví jakéhokoli NFT. Tato událost se vysílá, když jsou NFT
#      vytvořeny (`from` == 0) a zničeny (`to` == 0). Výjimka: během vytváření kontraktu může být
#      vytvořen a přiřazen libovolný počet NFT bez vyslání události Transfer. V okamžiku jakéhokoli
#      převodu se schválená adresa pro dané NFT (pokud existuje) vynuluje.
# @param _from Odesílatel NFT (pokud je adresa nulová, značí to vytvoření tokenu).
# @param _to Příjemce NFT (pokud je adresa nulová, značí to zničení tokenu).
# @param _tokenId NFT, které bylo převedeno.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

Je to podobné události Transfer v ERC-20 s tím rozdílem, že místo částky hlásíme `tokenId`.
Nikdo nevlastní nulovou adresu, takže ji zvykově používáme k hlášení o vytvoření a zničení tokenů.

```python
# @dev Vysílá se, když je schválená adresa pro NFT změněna nebo znovu potvrzena. Nulová
#      adresa značí, že neexistuje žádná schválená adresa. Když se vyšle událost Transfer, značí to
#      také, že schválená adresa pro dané NFT (pokud existuje) se vynuluje.
# @param _owner Vlastník NFT.
# @param _approved Adresa, kterou schvalujeme.
# @param _tokenId NFT, které schvalujeme.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

Schválení ERC-721 je podobné povolence v ERC-20. Konkrétní adresa má povoleno převést konkrétní
token. To dává kontraktům mechanismus, jak reagovat na přijetí tokenu. Kontrakty nemohou
naslouchat událostem, takže pokud jim token pouze převedete, \"neví\" o tom. Tímto způsobem
vlastník nejprve podá schválení a poté zašle kontraktu žádost: \"Schválil jsem vám převod tokenu
X, prosím, proveďte...\".

Jedná se o návrhové rozhodnutí, aby byl standard ERC-721 podobný standardu ERC-20. Protože
tokeny ERC-721 nejsou zaměnitelné, může kontrakt také identifikovat, že získal konkrétní token, pohledem
na vlastnictví tokenu.

```python
# @dev Vysílá se, když je operátor pro vlastníka povolen nebo zakázán. Operátor může spravovat
#      všechny NFT vlastníka.
# @param _owner Vlastník NFT.
# @param _operator Adresa, které nastavujeme práva operátora.
# @param _approved Stav práv operátora (true, pokud jsou práva udělena, a false, pokud jsou
# odvolána).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

Někdy je užitečné mít _operátora_, který může spravovat všechny tokeny určitého typu na účtu (ty, které jsou spravovány
konkrétním kontraktem), podobně jako plná moc. Například bych mohl chtít takovou pravomoc udělit kontraktu, který kontroluje, zda
jsem ho nekontaktoval po dobu šesti měsíců, a pokud ano, rozdělí můj majetek mým dědicům (pokud o to některý z nich požádá; kontrakty
nemohou dělat nic, aniž by byly volány transakcí). V ERC-20 můžeme dědickému kontraktu dát vysokou povolenku,
ale to u ERC-721 nefunguje, protože tokeny nejsou zaměnitelné. Toto je ekvivalent.

Hodnota `approved` nám říká, zda se událost týká schválení, nebo jeho odvolání.

### Stavové proměnné {#state-vars}

Tyto proměnné obsahují aktuální stav tokenů: které jsou dostupné a kdo je vlastní. Většina z nich
jsou objekty `HashMap`, [jednosměrná mapování, která existují mezi dvěma typy](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Mapování z ID NFT na adresu, která jej vlastní.
idToOwner: HashMap[uint256, address]

# @dev Mapování z ID NFT na schválenou adresu.
idToApprovals: HashMap[uint256, address]
```

Identity uživatelů a kontraktů v Ethereu jsou reprezentovány 160bitovými adresami. Tyto dvě proměnné mapují
ID tokenů na jejich vlastníky a ty, kteří mají schváleno je převést (maximálně jeden pro každý token). V Ethereu
jsou neinicializovaná data vždy nulová, takže pokud pro daný token neexistuje vlastník nebo schválený převodce, je jeho hodnota
nulová.

```python
# @dev Mapování z adresy vlastníka na počet jeho tokenů.
ownerToNFTokenCount: HashMap[address, uint256]
```

Tato proměnná uchovává počet tokenů pro každého vlastníka. Neexistuje žádné mapování od vlastníků k tokenům, takže
jediný způsob, jak identifikovat tokeny, které konkrétní vlastník vlastní, je podívat se zpět do historie událostí blockchainu
a najít příslušné události `Transfer`. Tuto proměnnou můžeme použít k tomu, abychom věděli, kdy máme všechny NFT a nemusíme
se dívat ještě dále do minulosti.

Všimněte si, že tento algoritmus funguje pouze pro uživatelská rozhraní a externí servery. Kód běžící na samotném blockchainu
nemůže číst minulé události.

```python
# @dev Mapování z adresy vlastníka na mapování adres operátorů.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Účet může mít více než jednoho operátora. Jednoduchá `HashMap` je pro
jejich sledování nedostatečná, protože každý klíč vede k jedné hodnotě. Místo toho můžete jako hodnotu použít
`HashMap[address, bool]`. Standardně je hodnota pro každou adresu `False`, což znamená, že
není operátorem. Podle potřeby můžete nastavit hodnoty na `True`.

```python
# @dev Adresa mintera, který může razit tokeny
minter: address
```

Nové tokeny musí být nějakým způsobem vytvořeny. V tomto kontraktu existuje jediná entita, která to má povoleno, a to
`minter`. To je například pravděpodobně dostačující pro hru. Pro jiné účely může být nutné
vytvořit složitější obchodní logiku.

```python
# @dev Mapování ID rozhraní na booleovskou hodnotu, zda je či není podporováno
supportedInterfaces: HashMap[bytes32, bool]

# @dev ID rozhraní ERC165 standardu ERC165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ID rozhraní ERC165 standardu ERC721
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) specifikuje mechanismus, jak může kontrakt zveřejnit, jak s ním mohou aplikace
komunikovat a kterým standardům ERC odpovídá. V tomto případě kontrakt odpovídá standardům ERC-165 a ERC-721.

### Funkce {#functions}

Toto jsou funkce, které skutečně implementují ERC-721.

#### Konstruktor {#constructor}

```python
@external
def __init__():
```

Ve Vyperu, stejně jako v Pythonu, se funkce konstruktoru nazývá `__init__`.

```python
    """
    @dev Konstruktor kontraktu.
    """
```

V Pythonu a ve Vyperu můžete také vytvořit komentář tak, že zadáte víceřádkový řetězec (který začíná a končí
`"""`) a nijak ho nepoužijete. Tyto komentáře mohou obsahovat také
[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

Pro přístup ke stavovým proměnným použijte `self.<název proměnné>`(opět, stejně jako v Pythonu).

#### Funkce view {#views}

Jedná se o funkce, které nemění stav blockchainu, a proto mohou být provedeny zdarma,
pokud jsou volány externě. Pokud jsou funkce view volány kontraktem, stále musí být provedeny na
každém uzlu, a proto stojí palivo.

```python
@view
@external
```

Tato klíčová slova před definicí funkce, která začínají zavináčem (`@`), se nazývají _dekorace_. Určují
okolnosti, za kterých lze funkci volat.

- `@view` určuje, že tato funkce je view.
- `@external` určuje, že tato konkrétní funkce může být volána transakcemi a jinými kontrakty.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

Na rozdíl od Pythonu je Vyper [jazyk se statickým typováním](https://wikipedia.org/wiki/Type_system#Static_type_checking).
Nelze deklarovat proměnnou nebo parametr funkce bez identifikace [datového typu](https://vyper.readthedocs.io/en/latest/types.html). V tomto případě je vstupní parametr `bytes32`, 256bitová hodnota
(256 bitů je nativní velikost slova [Ethereum Virtual Machine (EVM)](/developers/docs/evm/)). Výstupem je booleovská
hodnota. Názvy parametrů funkcí zvykově začínají podtržítkem (`_`).

```python
    """
    @dev Identifikace rozhraní je specifikována v ERC-165.
    @param _interfaceID ID rozhraní
    """
    return self.supportedInterfaces[_interfaceID]
```

Vrátí hodnotu z `self.supportedInterfaces` HashMap, která je nastavena v konstruktoru (`__init__`).

```python
### FUNKCE VIEW ###

```

Toto jsou funkce view, které zpřístupňují informace o tokenech uživatelům a jiným kontraktům.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev Vrátí počet NFT vlastněných `_owner`.
         Vrátí chybu, pokud je `_owner` nulová adresa. NFT přiřazené k nulové adrese jsou považovány za neplatné.
    @param _owner Adresa, pro kterou se má dotazovat na zůstatek.
    """
    assert _owner != ZERO_ADDRESS
```

Tento řádek [zajišťuje](https://vyper.readthedocs.io/en/latest/statements.html#assert), že `_owner` není
nulová adresa. Pokud ano, dojde k chybě a operace se vrátí zpět.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Vrátí adresu vlastníka NFT.
         Vrátí chybu, pokud `_tokenId` není platné NFT.
    @param _tokenId Identifikátor NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Vrátí chybu, pokud `_tokenId` není platné NFT
    assert owner != ZERO_ADDRESS
    return owner
```

V Ethereum Virtual Machine (EVM) je jakékoli úložiště, které v sobě nemá uloženou hodnotu, nulové.
Pokud na `_tokenId` není žádný token, pak je hodnota `self.idToOwner[_tokenId]` nulová. V takovém případě
se funkce vrátí zpět.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Získá schválenou adresu pro jedno NFT.
         Vrátí chybu, pokud `_tokenId` není platné NFT.
    @param _tokenId ID NFT, pro které se má dotazovat na schválení.
    """
    # Vrátí chybu, pokud `_tokenId` není platné NFT
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

Všimněte si, že `getApproved` _může_ vrátit nulu. Pokud je token platný, vrátí `self.idToApprovals[_tokenId]`.
Pokud neexistuje žádný schvalovatel, tato hodnota je nulová.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev Zkontroluje, zda je `_operator` schválený operátor pro `_owner`.
    @param _owner Adresa, která vlastní NFT.
    @param _operator Adresa, která jedná jménem vlastníka.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

Tato funkce kontroluje, zda má `_operator` povoleno spravovat všechny tokeny `_owner` v tomto kontraktu.
Protože může existovat více operátorů, jedná se o dvouúrovňovou HashMap.

#### Pomocné funkce pro převod {#transfer-helpers}

Tyto funkce implementují operace, které jsou součástí převodu nebo správy tokenů.

```python

### POMOCNÉ FUNKCE PRO PŘEVOD ###

@view
@internal
```

Tato dekorace, `@internal`, znamená, že funkce je přístupná pouze z jiných funkcí v rámci
stejného kontraktu. Názvy těchto funkcí zvykově také začínají podtržítkem (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Vrátí, zda daný spender může převést dané ID tokenu
    @param spender adresa spendera, na kterou se dotazujeme
    @param tokenId uint256 ID tokenu, který má být převeden
    @return bool zda je msg.sender schválen pro dané ID tokenu,
        je operátorem vlastníka, nebo je vlastníkem tokenu
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

Existují tři způsoby, jak může adresa získat povolení k převodu tokenu:

1. Adresa je vlastníkem tokenu
2. Adresa má schváleno utratit tento token
3. Adresa je operátorem pro vlastníka tokenu

Výše uvedená funkce může být view, protože nemění stav. Pro snížení provozních nákladů by každá
funkce, která _může_ být view, _měla_ být view.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Přidá NFT k dané adrese
         Vrátí chybu, pokud je `_tokenId` vlastněno někým jiným.
    """
    # Vrátí chybu, pokud je `_tokenId` vlastněno někým jiným
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # Změní vlastníka
    self.idToOwner[_tokenId] = _to
    # Změní sledování počtu
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Odebere NFT z dané adresy
         Vrátí chybu, pokud `_from` není aktuální vlastník.
    """
    # Vrátí chybu, pokud `_from` není aktuální vlastník
    assert self.idToOwner[_tokenId] == _from
    # Změní vlastníka
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # Změní sledování počtu
    self.ownerToNFTokenCount[_from] -= 1
```

Pokud se vyskytne problém s převodem, vrátíme volání zpět.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Zruší schválení dané adresy
         Vrátí chybu, pokud `_owner` není aktuální vlastník.
    """
    # Vrátí chybu, pokud `_owner` není aktuální vlastník
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # Vynuluje schválení
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

Hodnotu změňte pouze v případě nutnosti. Stavové proměnné se nacházejí v úložišti. Zápis do úložiště je
jednou z nejdražších operací, které EVM (Ethereum Virtual Machine) provádí (z hlediska
[paliva](/developers/docs/gas/)). Proto je dobré ji minimalizovat, i zápis
existující hodnoty má vysoké náklady.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Provede převod NFT.
         Vrátí chybu, pokud `msg.sender` není aktuální vlastník, autorizovaný operátor nebo schválená
         adresa pro toto NFT. (POZNÁMKA: `msg.sender` není povoleno v soukromé funkci, takže se předává `_sender`.)
         Vrátí chybu, pokud je `_to` nulová adresa.
         Vrátí chybu, pokud `_from` není aktuální vlastník.
         Vrátí chybu, pokud `_tokenId` není platné NFT.
    """
```

Tuto interní funkci máme proto, že existují dva způsoby převodu tokenů (běžný a bezpečný), ale
chceme mít pouze jedno místo v kódu, kde to děláme, abychom usnadnili auditování.

```python
    # Zkontroluje požadavky
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Vrátí chybu, pokud je `_to` nulová adresa
    assert _to != ZERO_ADDRESS
    # Zruší schválení. Vrátí chybu, pokud `_from` není aktuální vlastník
    self._clearApproval(_from, _tokenId)
    # Odebere NFT. Vrátí chybu, pokud `_tokenId` není platné NFT
    self._removeTokenFrom(_from, _tokenId)
    # Přidá NFT
    self._addTokenTo(_to, _tokenId)
    # Zapíše převod do protokolu
    log Transfer(_from, _to, _tokenId)
```

Pro vyslání události ve Vyperu použijete příkaz `log` ([více podrobností zde](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### Funkce pro převod {#transfer-funs}

```python

### FUNKCE PRO PŘEVOD ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Vrátí chybu, pokud `msg.sender` není aktuální vlastník, autorizovaný operátor nebo schválená
         adresa pro toto NFT.
         Vrátí chybu, pokud `_from` není aktuální vlastník.
         Vrátí chybu, pokud je `_to` nulová adresa.
         Vrátí chybu, pokud `_tokenId` není platné NFT.
    @notice Volající je odpovědný za potvrzení, že `_to` je schopno přijímat NFT, jinak
            mohou být trvale ztraceny.
    @param _from Aktuální vlastník NFT.
    @param _to Nový vlastník.
    @param _tokenId NFT k převodu.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Tato funkce umožňuje převod na libovolnou adresu. Pokud adresa není uživatel nebo kontrakt, který
ví, jak převádět tokeny, jakýkoli token, který převedete, zůstane na této adrese a bude k ničemu.

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Přenáší vlastnictví NFT z jedné adresy na jinou.
         Vrátí chybu, pokud `msg.sender` není aktuální vlastník, autorizovaný operátor nebo
         schválená adresa pro toto NFT.
         Vrátí chybu, pokud `_from` není aktuální vlastník.
         Vrátí chybu, pokud je `_to` nulová adresa.
         Vrátí chybu, pokud `_tokenId` není platné NFT.
         Pokud je `_to` chytrý kontrakt, volá `onERC721Received` na `_to` a vrátí chybu, pokud
         návratová hodnota není `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
         POZNÁMKA: bytes4 je reprezentováno jako bytes32 s výplní
    @param _from Aktuální vlastník NFT.
    @param _to Nový vlastník.
    @param _tokenId NFT k převodu.
    @param _data Dodatečná data bez specifikovaného formátu, odeslaná ve volání na `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Je v pořádku provést převod nejprve, protože pokud se vyskytne problém, stejně se vrátíme zpět,
takže vše provedené ve volání bude zrušeno.

```python
    if _to.is_contract: # zkontroluje, zda je `_to` účet kontraktu
```

Nejprve zkontrolujte, zda je adresa kontrakt (zda má kód). Pokud ne, předpokládejte, že se jedná o uživatelskou
adresu a uživatel bude moci token použít nebo ho převést. Ale nenechte se tím ukolébat
do falešného pocitu bezpečí. Můžete ztratit tokeny, i s `safeTransferFrom`, pokud je převedete
na adresu, ke které nikdo nezná privátní klíč.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Volejte cílový kontrakt, abyste zjistili, zda může přijímat tokeny ERC-721.

```python
        # Vrátí chybu, pokud je cílem převodu kontrakt, který neimplementuje 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

Pokud je cílem kontrakt, ale takový, který nepřijímá tokeny ERC-721 (nebo který se rozhodl nepřijmout tento
konkrétní převod), vraťte se zpět.

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Nastaví nebo znovu potvrdí schválenou adresu pro NFT. Nulová adresa značí, že neexistuje žádná schválená adresa.
         Vrátí chybu, pokud `msg.sender` není aktuální vlastník NFT nebo autorizovaný operátor aktuálního vlastníka.
         Vrátí chybu, pokud `_tokenId` není platné NFT. (POZNÁMKA: Toto není uvedeno v EIP)
         Vrátí chybu, pokud je `_approved` aktuální vlastník. (POZNÁMKA: Toto není uvedeno v EIP)
    @param _approved Adresa, která má být schválena pro dané ID NFT.
    @param _tokenId ID tokenu, který má být schválen.
    """
    owner: address = self.idToOwner[_tokenId]
    # Vrátí chybu, pokud `_tokenId` není platné NFT
    assert owner != ZERO_ADDRESS
    # Vrátí chybu, pokud je `_approved` aktuální vlastník
    assert _approved != owner
```

Pokud zvykově nechcete mít schvalovatele, jmenujte nulovou adresu, ne sebe.

```python
    # Zkontroluje požadavky
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Pro nastavení schválení můžete být buď vlastníkem, nebo operátorem autorizovaným vlastníkem.

```python
    # Nastaví schválení
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Povolí nebo zakáže schválení pro třetí stranu („operátora“) ke správě všech
         aktiv `msg.sender`. Také vysílá událost ApprovalForAll.
         Vrátí chybu, pokud je `_operator` `msg.sender`. (POZNÁMKA: Toto není uvedeno v EIP)
    @notice Toto funguje i v případě, že odesílatel v daném okamžiku nevlastní žádné tokeny.
    @param _operator Adresa, která se má přidat do sady autorizovaných operátorů.
    @param _approved True, pokud je operátor schválen, false pro odvolání schválení.
    """
    # Vrátí chybu, pokud je `_operator` `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### Ražba nových tokenů a zničení stávajících {#mint-burn}

Účet, který vytvořil kontrakt, je `minter`, super uživatel, který je oprávněn razit
nové NFT. Ani on však nesmí pálit existující tokeny. To může udělat pouze vlastník nebo entita
autorizovaná vlastníkem.

```python
### FUNKCE PRO RAŽBU A PÁLENÍ ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Tato funkce vždy vrátí `True`, protože pokud operace selže, vrátí se zpět.

```python
    """
    @dev Funkce pro ražbu tokenů
         Vrátí chybu, pokud `msg.sender` není minter.
         Vrátí chybu, pokud je `_to` nulová adresa.
         Vrátí chybu, pokud je `_tokenId` vlastněno někým jiným.
    @param _to Adresa, která obdrží ražené tokeny.
    @param _tokenId ID tokenu k ražbě.
    @return Booleovská hodnota, která značí, zda byla operace úspěšná.
    """
```

Pouze minter (účet, který vytvořil kontrakt ERC-721) může razit nové tokeny. To může být
v budoucnu problém, pokud budeme chtít změnit identitu mintera. V
produkčním kontraktu byste pravděpodobně chtěli funkci, která minterovi umožní převést
práva mintera na někoho jiného.

```python
    # Vrátí chybu, pokud je `_to` nulová adresa
    assert _to != ZERO_ADDRESS
    # Přidá NFT. Vrátí chybu, pokud je `_tokenId` vlastněno někým jiným
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

Ražba nových tokenů se zvykově počítá jako převod z nulové adresy.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Spálí konkrétní token ERC721.
         Vrátí chybu, pokud `msg.sender` není aktuální vlastník, autorizovaný operátor nebo schválená
         adresa pro toto NFT.
         Vrátí chybu, pokud `_tokenId` není platné NFT.
    @param _tokenId uint256 id tokenu ERC721, který má být spálen.
    """
    # Zkontroluje požadavky
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Vrátí chybu, pokud `_tokenId` není platné NFT
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

Každý, kdo má povoleno převést token, ho smí spálit. Ačkoli se pálení zdá být ekvivalentem
převodu na nulovou adresu, nulová adresa ve skutečnosti token neobdrží. To nám umožňuje
uvolnit veškeré úložiště, které bylo pro token použito, což může snížit náklady na palivo transakce.

## Použití tohoto kontraktu {#using-contract}

Na rozdíl od Solidity, Vyper nemá dědičnost. Jedná se o záměrné návrhové rozhodnutí, které má za cíl zpřehlednit kód,
a tím usnadnit jeho zabezpečení. Chcete-li tedy vytvořit svůj vlastní kontrakt Vyper ERC-721, vezměte tento
kontrakt a upravte ho
tak, aby implementoval obchodní logiku, kterou chcete.

## Závěr {#conclusion}

Pro shrnutí, zde jsou některé z nejdůležitějších myšlenek v tomto kontraktu:

- Pro příjem tokenů ERC-721 s bezpečným převodem musí kontrakty implementovat rozhraní `ERC721Receiver`.
- I když použijete bezpečný převod, tokeny se mohou stále zaseknout, pokud je pošlete na adresu, jejíž privátní klíč
  je neznámý.
- Když se vyskytne problém s operací, je dobré volání `vrátit`, nikoli jen vrátit
  hodnotu selhání.
- Tokeny ERC-721 existují, když mají vlastníka.
- Existují tři způsoby, jak být oprávněn k převodu NFT. Můžete být vlastníkem, být schválen pro konkrétní token,
  nebo být operátorem pro všechny tokeny vlastníka.
- Minulé události jsou viditelné pouze mimo blockchain. Kód běžící uvnitř blockchainu je nemůže zobrazit.

Nyní jděte a implementujte bezpečné kontrakty Vyper.

[Více z mé práce najdete zde](https://cryptodocguy.pro/).

