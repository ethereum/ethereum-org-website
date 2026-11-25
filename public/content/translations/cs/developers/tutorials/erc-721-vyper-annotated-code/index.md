---
title: "Průvodce kontraktem ERC-721 ve Vyperu"
description: "Kontrakt ERC-721 od Ryuyi Nakamury a jak funguje"
author: Ori Pomerantz
lang: cs
tags: ["Vyper", "erc-721", "Python"]
skill: beginner
breadcrumb: "Vyper ERC-721"
published: 2021-04-01
---

## Úvod {#introduction}

Standard [ERC-721](/developers/docs/standards/tokens/erc-721/) se používá k držení vlastnictví nezaměnitelných tokenů (NFT).
Tokeny [ERC-20](/developers/docs/standards/tokens/erc-20/) se chovají jako komodita, protože mezi jednotlivými tokeny není žádný rozdíl.
Oproti tomu jsou tokeny ERC-721 navrženy pro aktiva, která jsou podobná, ale ne identická, jako jsou různé [kreslené kočky](https://www.cryptokitties.co/)
nebo vlastnická práva k různým nemovitostem.

V tomto článku budeme analyzovat [kontrakt ERC-721 od Ryuyi Nakamury](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy).
Tento kontrakt je napsán v jazyce [Vyper](https://vyper.readthedocs.io/en/latest/index.html), což je jazyk pro kontrakty podobný Pythonu, navržený tak, aby v něm bylo těžší napsat nezabezpečený kód než v Solidity.

## Kontrakt {#contract}

```python
#pragma version >0.3.10
```

Řádek `#pragma version` říká kompilátoru, pro které verze Vyperu je kontrakt napsán. `>0.3.10` přijímá jakékoli vydání novější než 0.3.10, ale tento kontrakt ve skutečnosti potřebuje Vyper 0.4.1 nebo novější: loguje události s klíčovými argumenty
(například `log IERC721.Transfer(...)`), což je funkce přidaná ve Vyperu 0.4.1, takže se na verzi 0.4.0 nezkompiluje.

```python
# @dev Implementace standardu ERC-721 pro nezaměnitelný token (NFT).
# @author Ryuya Nakamura (@nrryuya)
# Upraveno z: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Komentáře ve Vyperu, stejně jako v Pythonu, začínají znakem hash (`#`) a pokračují až do konce řádku. Komentáře, které obsahují
`@<keyword>`, používá [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) k vytvoření lidsky čitelné
dokumentace.

```python
from ethereum.ercs import IERC165
from ethereum.ercs import IERC721

implements: IERC721
implements: IERC165
```

Rozhraní ERC-165 a ERC-721 jsou dodávána s kompilátorem Vyperu, takže je importujeme z `ethereum.ercs`, místo abychom
je psali sami. [Definici rozhraní ERC-721 si můžete prohlédnout zde](https://github.com/vyperlang/vyper/blob/master/vyper/builtins/interfaces/IERC721.vyi).
Řádky `implements:` deklarují, že tento kontrakt poskytuje obě rozhraní, a kompilátor kontroluje, že je každá
funkce, kterou vyžadují, definována níže.

### Rozhraní ERC721Receiver {#receiver-interface}

```python
# Rozhraní pro kontrakt volaný pomocí safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 podporuje dva typy převodu:

- `transferFrom`, který umožňuje odesílateli zadat libovolnou cílovou adresu a přenáší odpovědnost
  za převod na odesílatele. To znamená, že můžete provést převod na neplatnou adresu, v takovém případě
  je NFT nadobro ztraceno.
- `safeTransferFrom`, který kontroluje, zda je cílová adresa kontrakt. Pokud ano, kontrakt ERC-721
  se zeptá přijímajícího kontraktu, zda chce NFT přijmout.

Aby mohl přijímající kontrakt odpovídat na požadavky `safeTransferFrom`, musí implementovat `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

Adresa `_from` je aktuální vlastník tokenu. Adresa `_operator` je ta, která
požádala o převod (tyto dvě adresy nemusí být stejné kvůli povoleným limitům). Podle konvence začíná většina parametrů
funkcí v tomto kontraktu podtržítkem (`_`).

```python
            _tokenId: uint256,
```

ID tokenů ERC-721 mají 256 bitů. Obvykle se vytvářejí hashováním popisu toho, co
token představuje.

```python
            _data: Bytes[1024]
```

Požadavek může obsahovat až 1024 bajtů uživatelských dat.

```python
        ) -> bytes4: nonpayable
```

Aby se předešlo případům, kdy kontrakt omylem přijme převod, návratová hodnota není boolean,
ale specifická čtyřbajtová hodnota, selektor funkce `onERC721Received`. Funkce je `nonpayable`, protože
přijímající kontrakt může při přijetí tokenu změnit svůj vlastní stav.

### Události {#events}

[Události](/developers/docs/smart-contracts/anatomy/#events-and-logs)
jsou emitovány, aby informovaly uživatele a servery mimo blockchain o událostech. Vezměte na vědomí, že obsah událostí
není dostupný pro kontrakty na blockchainu. Tři události ERC-721 jsou definovány rozhraním `IERC721`, které jsme
importovali, takže je tento kontrakt sám nedeklaruje; emituje je pomocí `log IERC721.<Event>(...)`, jak uvidíme
ve funkcích pro převod níže.

`Transfer` (`sender`, `receiver`, `token_id`) hlásí změnu vlastnictví NFT. To je podobné
události Transfer u ERC-20, s tím rozdílem, že hlásíme `token_id` místo částky. Nulovou adresu nikdo nevlastní, takže ji podle
konvence používáme k hlášení vytvoření a zničení tokenů. Jedinou výjimkou je vytvoření kontraktu, během
kterého může být vytvořeno a přiřazeno libovolné množství NFT bez emitování `Transfer`.

Schválení (approval) u ERC-721 je podobné povolenému limitu (allowance) u ERC-20: konkrétní adrese je povoleno převést konkrétní token,
a `Approval` (`owner`, `approved`, `token_id`) je emitováno, kdykoli je tato schválená adresa nastavena nebo potvrzena.
To poskytuje mechanismus, jak mohou kontrakty reagovat, když přijmou token. Kontrakty nemohou naslouchat událostem, takže pokud
jim token pouze převedete, „nevědí“ o tom. Tímto způsobem vlastník nejprve odešle schválení a
poté pošle požadavek kontraktu: „Schválil jsem vám převod tokenu X, prosím proveďte...“. Jedná se o rozhodnutí
při návrhu, aby byl standard ERC-721 podobný standardu ERC-20. Protože tokeny ERC-721 nejsou zaměnitelné,
kontrakt může také identifikovat, že získal konkrétní token, tím, že se podívá na vlastnictví tokenu.

Nakonec je emitováno `ApprovalForAll` (`owner`, `operator`, `approved`), když je pro vlastníka povolen nebo zakázán _operátor_.
Někdy je užitečné mít operátora, který může spravovat všechny tokeny účtu určitého typu
(ty, které jsou spravovány konkrétním kontraktem), podobně jako plná moc. Například bych mohl chtít dát
takovou pravomoc kontraktu, který kontroluje, zda jsem ho nekontaktoval po dobu šesti měsíců, a pokud ano, rozdělí má aktiva
mým dědicům (pokud o to některý z nich požádá, kontrakty nemohou dělat nic, aniž by byly zavolány transakcí). V ERC-20
můžeme dědickému kontraktu jednoduše dát vysoký povolený limit, ale to u ERC-721 nefunguje, protože tokeny
nejsou zaměnitelné. Toto je ekvivalent. Hodnota `approved` nám říká, zda je událost pro schválení, nebo pro
zrušení schválení.

### Stavové proměnné {#state-vars}

Tyto proměnné obsahují aktuální stav tokenů: které jsou k dispozici a kdo je vlastní. Většina z nich
jsou objekty `HashMap`, [jednosměrná mapování, která existují mezi dvěma typy](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Mapování z ID NFT na adresu, která jej vlastní.
idToOwner: HashMap[uint256, address]

# @dev Mapování z ID NFT na schválenou adresu.
idToApprovals: HashMap[uint256, address]
```

Identity uživatelů a kontraktů v Ethereu jsou reprezentovány 160bitovými adresami. Tyto dvě proměnné mapují
ID tokenů na jejich vlastníky a na ty, kteří jsou schváleni k jejich převodu (maximálně jeden pro každý). V Ethereu
jsou neinicializovaná data vždy nulová, takže pokud neexistuje žádný vlastník nebo schválený převodce, hodnota pro daný token
je nula.

```python
# @dev Mapování z adresy vlastníka na počet jeho tokenů.
ownerToNFTokenCount: HashMap[address, uint256]
```

Tato proměnná uchovává počet tokenů pro každého vlastníka. Neexistuje žádné mapování z vlastníků na tokeny, takže
jediný způsob, jak identifikovat tokeny, které konkrétní vlastník vlastní, je podívat se zpět do historie událostí blockchainu
a najít příslušné události `Transfer`. Tuto proměnnou můžeme použít k tomu, abychom věděli, kdy máme všechna NFT a nemusíme
se dívat ještě dále do minulosti.

Vezměte na vědomí, že tento algoritmus funguje pouze pro uživatelská rozhraní a externí servery. Kód běžící na samotném blockchainu
nemůže číst minulé události.

```python
# @dev Mapování z adresy vlastníka na mapování adres operátorů.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Účet může mít více než jednoho operátora. Jednoduchý `HashMap` k jejich
sledování nestačí, protože každý klíč vede k jediné hodnotě. Místo toho můžete jako hodnotu použít
`HashMap[address, bool]`. Ve výchozím nastavení je hodnota pro každou adresu `False`, což znamená, že
není operátorem. Hodnoty můžete podle potřeby nastavit na `True`.

```python
# @dev Adresa raziče, který může razit token
minter: address
```

Nové tokeny musí být nějak vytvořeny. V tomto kontraktu je jediná entita, která to má povoleno, a to
`minter`. To pravděpodobně postačí například pro hru. Pro jiné účely může být nutné
vytvořit složitější obchodní logiku.

```python
# @dev Statický seznam podporovaných ID rozhraní ERC-165
SUPPORTED_INTERFACES: constant(bytes4[2]) = [
    # ID rozhraní ERC-165 pro ERC-165
    0x01ffc9a7,
    # ID rozhraní ERC-165 pro ERC-721
    0x80ac58cd,
]
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) specifikuje mechanismus, jak může kontrakt zveřejnit, jak s ním mohou aplikace
komunikovat a kterým ERC vyhovuje. `SUPPORTED_INTERFACES` je konstantní seznam dvou čtyřbajtových
ID rozhraní, kterým tento kontrakt vyhovuje: samotnému ERC-165 a ERC-721.

### Funkce {#functions}

Toto jsou funkce, které skutečně implementují ERC-721.

#### Konstruktor {#constructor}

```python
@deploy
def __init__():
```

Ve Vyperu, stejně jako v Pythonu, se funkce konstruktoru nazývá `__init__`. Je označena dekorátorem `@deploy`,
což znamená, že se spustí jednou, když je kontrakt nasazen.

```python
    """
    @dev Konstruktor kontraktu.
    """
```

V Pythonu a ve Vyperu můžete také vytvořit komentář zadáním víceřádkového řetězce (který začíná a končí
`"""`) a jeho nepoužitím žádným způsobem. Tyto komentáře mohou také obsahovat
[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.minter = msg.sender
```

Pro přístup ke stavovým proměnným použijete `self.<variable name>` (opět stejně jako v Pythonu). Konstruktor zaznamená
účet, který nasadil kontrakt, jako `minter`.

#### View funkce {#views}

Toto jsou funkce, které nemění stav blockchainu, a proto mohou být spuštěny
zdarma, pokud jsou volány externě. Pokud jsou view funkce volány kontraktem, musí být stále spuštěny na
každém uzlu, a proto stojí gas.

```python
@view
@external
```

Tato klíčová slova před definicí funkce, která začínají zavináčem (`@`), se nazývají _dekorátory_.
Specifikují okolnosti, za kterých může být funkce volána.

- `@view` specifikuje, že tato funkce je view (pouze pro čtení).
- `@external` specifikuje, že tato konkrétní funkce může být volána transakcemi a jinými kontrakty.

```python
def supportsInterface(interface_id: bytes4) -> bool:
```

Na rozdíl od Pythonu je Vyper [staticky typovaný jazyk](https://wikipedia.org/wiki/Type_system#Static_type_checking).
Nemůžete deklarovat proměnnou nebo parametr funkce bez určení [datového typu](https://vyper.readthedocs.io/en/latest/types.html). V tomto případě je vstupním parametrem `bytes4`, čtyřbajtová hodnota, a výstupem je booleovská
hodnota.

```python
    """
    @dev Identifikace rozhraní je specifikována v ERC-165.
    @param interface_id ID rozhraní
    """
    return interface_id in SUPPORTED_INTERFACES
```

Vrátí `True`, pokud je `interface_id` jedním z ID rozhraní v seznamu `SUPPORTED_INTERFACES`.

```python
### VIEW FUNKCE ###
```

Toto jsou view funkce, které zpřístupňují informace o tokenech uživatelům a dalším kontraktům.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev Vrací počet NFT vlastněných `_owner`.
         Vyvolá chybu, pokud je `_owner` nulová adresa. NFT přiřazené na nulovou adresu jsou považovány za neplatné.
    @param _owner Adresa, pro kterou se má dotázat na zůstatek.
    """
    assert _owner != empty(address)
```

Tento řádek [ověřuje (assert)](https://vyper.readthedocs.io/en/latest/statements.html#assert), že `_owner` není
nulová adresa, zapsaná jako `empty(address)`. Pokud ano, dojde k chybě a operace je zvrácena.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Vrací adresu vlastníka NFT.
         Vyvolá chybu, pokud `_tokenId` není platné NFT.
    @param _tokenId Identifikátor pro NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Vyvolá chybu, pokud `_tokenId` není platné NFT
    assert owner != empty(address)
    return owner
```

Ve virtuálním stroji Etherea (EVM) je jakékoli úložiště, ve kterém není uložena žádná hodnota, nulové.
Pokud na `_tokenId` není žádný token, pak je hodnota `self.idToOwner[_tokenId]` nula. V takovém
případě se funkce zvrátí.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Získá schválenou adresu pro jedno NFT.
         Vyvolá chybu, pokud `_tokenId` není platné NFT.
    @param _tokenId ID NFT, pro které se má dotázat na schválení.
    """
    # Vyvolá chybu, pokud `_tokenId` není platné NFT
    assert self.idToOwner[_tokenId] != empty(address)
    return self.idToApprovals[_tokenId]
```

Vezměte na vědomí, že `getApproved` _může_ vrátit nulu. Pokud je token platný, vrátí `self.idToApprovals[_tokenId]`.
Pokud neexistuje žádný schvalovatel, je tato hodnota nula.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev Zkontroluje, zda je `_operator` schváleným operátorem pro `_owner`.
    @param _owner Adresa, která vlastní NFT.
    @param _operator Adresa, která jedná jménem vlastníka.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

Tato funkce kontroluje, zda má `_operator` povoleno spravovat všechny tokeny vlastníka `_owner` v tomto kontraktu.
Protože může existovat více operátorů, jedná se o dvouúrovňovou HashMapu.

#### Pomocné funkce pro převod {#transfer-helpers}

Tyto funkce implementují operace, které jsou součástí převodu nebo správy tokenů.

```python

### POMOCNÉ FUNKCE PRO PŘEVOD ###

@view
@internal
```

Tento dekorátor, `@internal`, znamená, že funkce je přístupná pouze z jiných funkcí v rámci
stejného kontraktu. Podle konvence názvy těchto funkcí také začínají podtržítkem (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Vrací, zda daný utrácející může provést převod daného ID tokenu
    @param spender adresa utrácejícího pro dotaz
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

Existují tři způsoby, jak může být adrese povoleno převést token:

1. Adresa je vlastníkem tokenu
2. Adresa je schválena k utracení tohoto tokenu
3. Adresa je operátorem pro vlastníka tokenu

Výše uvedená funkce může být view, protože nemění stav. Aby se snížily provozní náklady, každá
funkce, která _může_ být view, by _měla_ být view.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Přidá NFT na danou adresu
         Vyvolá chybu, pokud `_tokenId` někdo vlastní.
    """
    # Vyvolá chybu, pokud `_tokenId` někdo vlastní
    assert self.idToOwner[_tokenId] == empty(address)
    # Změní vlastníka
    self.idToOwner[_tokenId] = _to
    # Změní sledování počtu
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Odebere NFT z dané adresy
         Vyvolá chybu, pokud `_from` není aktuální vlastník.
    """
    # Vyvolá chybu, pokud `_from` není aktuální vlastník
    assert self.idToOwner[_tokenId] == _from
    # Změní vlastníka
    self.idToOwner[_tokenId] = empty(address)
    # Změní sledování počtu
    self.ownerToNFTokenCount[_from] -= 1
```

Když nastane problém s převodem, volání zvrátíme.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Vymaže schválení dané adresy
         Vyvolá chybu, pokud `_owner` není aktuální vlastník.
    """
    # Vyvolá chybu, pokud `_owner` není aktuální vlastník
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != empty(address):
        # Resetuje schválení
        self.idToApprovals[_tokenId] = empty(address)
```

Hodnotu měňte pouze v případě potřeby. Stavové proměnné žijí v úložišti (storage). Zápis do úložiště je
jednou z nejdražších operací, které EVM (virtuální stroj Etherea) provádí (z hlediska
[gasu](/developers/docs/gas/)). Proto je dobré jej minimalizovat, dokonce i zápis
stávající hodnoty má vysoké náklady.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Provede převod NFT.
         Vyvolá chybu, pokud `msg.sender` není aktuální vlastník, autorizovaný operátor nebo schválená
         adresa pro toto NFT. (POZNÁMKA: `msg.sender` není povolen v privátní funkci, proto předejte `_sender`.)
         Vyvolá chybu, pokud je `_to` nulová adresa.
         Vyvolá chybu, pokud `_from` není aktuální vlastník.
         Vyvolá chybu, pokud `_tokenId` není platné NFT.
    """
```

Tuto interní funkci máme proto, že existují dva způsoby převodu tokenů (běžný a bezpečný), ale
chceme mít v kódu pouze jedno místo, kde to děláme, aby byl audit snazší.

```python
    # Zkontroluje požadavky
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Vyvolá chybu, pokud je `_to` nulová adresa
    assert _to != empty(address)
    # Vymaže schválení. Vyvolá chybu, pokud `_from` není aktuální vlastník
    self._clearApproval(_from, _tokenId)
    # Odebere NFT. Vyvolá chybu, pokud `_tokenId` není platné NFT
    self._removeTokenFrom(_from, _tokenId)
    # Přidá NFT
    self._addTokenTo(_to, _tokenId)
    # Zaznamená převod
    log IERC721.Transfer(sender=_from, receiver=_to, token_id=_tokenId)
```

K emitování události ve Vyperu použijete příkaz `log` ([více podrobností najdete zde](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).
Protože události patří do importovaného rozhraní, odkazujeme na ně jako na `IERC721.Transfer` a předáváme jejich pole pomocí
klíčových slov.

#### Funkce pro převod {#transfer-funs}

```python

### FUNKCE PRO PŘEVOD ###

@external
@payable
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Vyvolá chybu, pokud `msg.sender` není aktuální vlastník, autorizovaný operátor nebo schválená
         adresa pro toto NFT.
         Vyvolá chybu, pokud `_from` není aktuální vlastník.
         Vyvolá chybu, pokud je `_to` nulová adresa.
         Vyvolá chybu, pokud `_tokenId` není platné NFT.
    @notice Volající je zodpovědný za potvrzení, že `_to` je schopno přijímat NFT, jinak
            mohou být trvale ztracena.
    @param _from Aktuální vlastník NFT.
    @param _to Nový vlastník.
    @param _tokenId NFT pro převod.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Tato funkce vám umožňuje provést převod na libovolnou adresu. Pokud adresa nepatří uživateli nebo kontraktu, který
ví, jak převádět tokeny, jakýkoli token, který převedete, na této adrese uvízne a bude k ničemu.

Dekorátor `@payable` je zde proto, že rozhraní `IERC721` deklaruje `transferFrom`, `safeTransferFrom` a
`approve` jako payable, takže kontrakt, který toto rozhraní implementuje, se musí shodovat s těmito signaturami.

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
    @dev Převede vlastnictví NFT z jedné adresy na jinou adresu.
         Vyvolá chybu, pokud `msg.sender` není aktuální vlastník, autorizovaný operátor nebo
         schválená adresa pro toto NFT.
         Vyvolá chybu, pokud `_from` není aktuální vlastník.
         Vyvolá chybu, pokud je `_to` nulová adresa.
         Vyvolá chybu, pokud `_tokenId` není platné NFT.
         Pokud je `_to` smart kontrakt, zavolá `onERC721Received` na `_to` a vyvolá chybu, pokud
         návratová hodnota není `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
    @param _from Aktuální vlastník NFT.
    @param _to Nový vlastník.
    @param _tokenId NFT pro převod.
    @param _data Dodatečná data bez specifikovaného formátu, odeslaná ve volání na `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Je v pořádku provést převod jako první, protože pokud nastane problém, stejně vše zvrátíme,
takže vše, co bylo ve volání provedeno, bude zrušeno.

```python
    if _to.is_contract: # zkontroluje, zda je `_to` adresa kontraktu
```

Nejprve zkontrolujte, zda je adresa kontrakt (zda má kód). Pokud ne, předpokládejte, že se jedná o adresu uživatele
a uživatel bude moci token použít nebo jej převést. Nenechte se tím ale ukolébat
k falešnému pocitu bezpečí. Tokeny můžete ztratit, a to i s `safeTransferFrom`, pokud je převedete
na adresu, ke které nikdo nezná soukromý klíč.

```python
        returnValue: bytes4 = extcall ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Zavolejte cílový kontrakt, abyste zjistili, zda může přijímat tokeny ERC-721. Vyper 0.4 vyžaduje, aby byla volání jiných kontraktů
označena, takže volání má předponu `extcall`.

```python
        # Vyvolá chybu, pokud je cíl převodu kontrakt, který neimplementuje 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes4)
```

Pokud je cílem kontrakt, ale takový, který nepřijímá tokeny ERC-721 (nebo který se rozhodl nepřijmout tento
konkrétní převod), dojde ke zvrácení.

```python
@external
@payable
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Nastaví nebo potvrdí schválenou adresu pro NFT. Nulová adresa indikuje, že neexistuje žádná schválená adresa.
         Vyvolá chybu, pokud `msg.sender` není aktuální vlastník NFT nebo autorizovaný operátor aktuálního vlastníka.
         Vyvolá chybu, pokud `_tokenId` není platné NFT. (POZNÁMKA: Toto není napsáno v EIP)
         Vyvolá chybu, pokud je `_approved` aktuální vlastník. (POZNÁMKA: Toto není napsáno v EIP)
    @param _approved Adresa, která má být schválena pro dané ID NFT.
    @param _tokenId ID tokenu, který má být schválen.
    """
    owner: address = self.idToOwner[_tokenId]
    # Vyvolá chybu, pokud `_tokenId` není platné NFT
    assert owner != empty(address)
    # Vyvolá chybu, pokud je `_approved` aktuální vlastník
    assert _approved != owner
```

Podle konvence, pokud nechcete mít schvalovatele, určíte nulovou adresu, nikoli sebe.

```python
    # Zkontroluje požadavky
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Chcete-li nastavit schválení, můžete být buď vlastníkem, nebo operátorem autorizovaným vlastníkem.

```python
    # Nastaví schválení
    self.idToApprovals[_tokenId] = _approved
    log IERC721.Approval(owner=owner, approved=_approved, token_id=_tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Povolí nebo zakáže schválení pro třetí stranu ("operátora") spravovat všechna
         aktiva `msg.sender`. Také emituje událost ApprovalForAll.
         Vyvolá chybu, pokud je `_operator` `msg.sender`. (POZNÁMKA: Toto není napsáno v EIP)
    @notice Toto funguje, i když odesílatel v danou chvíli nevlastní žádné tokeny.
    @param _operator Adresa, která se má přidat do sady autorizovaných operátorů.
    @param _approved True, pokud je operátor schválen, false pro zrušení schválení.
    """
    # Vyvolá chybu, pokud je `_operator` `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log IERC721.ApprovalForAll(owner=msg.sender, operator=_operator, approved=_approved)
```

#### Ražení nových tokenů a zničení stávajících {#mint-burn}

Účet, který vytvořil kontrakt, je `minter`, superuživatel, který je oprávněn razit
nová NFT. Nicméně ani on nemá povoleno spálit stávající tokeny. Pouze vlastník nebo entita
autorizovaná vlastníkem to může udělat.

```python
### FUNKCE PRO RAŽENÍ A SPÁLENÍ ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Tato funkce vždy vrací `True`, protože pokud operace selže, je zvrácena.

```python
    """
    @dev Funkce pro ražení tokenů
         Vyvolá chybu, pokud `msg.sender` není razič.
         Vyvolá chybu, pokud je `_to` nulová adresa.
         Vyvolá chybu, pokud `_tokenId` někdo vlastní.
    @param _to Adresa, která obdrží vyražené tokeny.
    @param _tokenId ID tokenu k ražení.
    @return Boolean, který indikuje, zda byla operace úspěšná.
    """
    # Vyvolá chybu, pokud `msg.sender` není razič
    assert msg.sender == self.minter
```

Pouze minter (účet, který vytvořil kontrakt ERC-721) může razit nové tokeny. To může být
v budoucnu problém, pokud budeme chtít změnit identitu mintera. V
produkčním kontraktu byste pravděpodobně chtěli funkci, která minterovi umožní převést
oprávnění k ražení na někoho jiného.

```python
    # Vyvolá chybu, pokud je `_to` nulová adresa
    assert _to != empty(address)
    # Přidá NFT. Vyvolá chybu, pokud `_tokenId` někdo vlastní
    self._addTokenTo(_to, _tokenId)
    log IERC721.Transfer(sender=empty(address), receiver=_to, token_id=_tokenId)
    return True
```

Podle konvence se ražení nových tokenů počítá jako převod z nulové adresy.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Spálí specifický token ERC-721.
         Vyvolá chybu, pokud `msg.sender` není aktuální vlastník, autorizovaný operátor nebo schválená
         adresa pro toto NFT.
         Vyvolá chybu, pokud `_tokenId` není platné NFT.
    @param _tokenId uint256 ID tokenu ERC-721, který má být spálen.
    """
    # Zkontroluje požadavky
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Vyvolá chybu, pokud `_tokenId` není platné NFT
    assert owner != empty(address)
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log IERC721.Transfer(sender=owner, receiver=empty(address), token_id=_tokenId)
```

Kdokoli, kdo má povoleno převést token, má povoleno jej spálit. Ačkoli se spálení zdá být ekvivalentní
převodu na nulovou adresu, nulová adresa ve skutečnosti token nepřijme. To nám umožňuje
uvolnit veškeré úložiště, které bylo pro token použito, což může snížit náklady na gas u transakce.

## Použití tohoto kontraktu {#using-contract}

Na rozdíl od Solidity nemá Vyper dědičnost. Jedná se o záměrné rozhodnutí při návrhu, aby byl
kód jasnější a tím pádem snáze zabezpečitelný. Takže k vytvoření vlastního kontraktu ERC-721 ve Vyperu vezmete [tento
kontrakt](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) a upravíte jej
tak, aby implementoval požadovanou obchodní logiku.

## Závěr {#conclusion}

Pro zopakování uvádíme některé z nejdůležitějších myšlenek v tomto kontraktu:

- Pro příjem tokenů ERC-721 pomocí bezpečného převodu musí kontrakty implementovat rozhraní `ERC721Receiver`.
- I když použijete bezpečný převod, tokeny mohou stále uvíznout, pokud je pošlete na adresu, jejíž soukromý klíč
  není znám.
- Když nastane problém s operací, je dobré volání zvrátit pomocí `revert`, spíše než jen vrátit
  hodnotu selhání.
- Tokeny ERC-721 existují, když mají vlastníka.
- Existují tři způsoby, jak být oprávněn k převodu NFT. Můžete být vlastníkem, být schváleni pro konkrétní token,
  nebo být operátorem pro všechny tokeny vlastníka.
- Minulé události jsou viditelné pouze mimo blockchain. Kód běžící uvnitř blockchainu je nemůže zobrazit.

Nyní běžte a implementujte bezpečné kontrakty ve Vyperu.

[Zde najdete více z mé práce](https://cryptodocguy.pro/).
