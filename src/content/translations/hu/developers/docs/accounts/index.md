---
title: Ethereum számlák
description: Az Ethereum számlák magyarázata – az adatstruktúrájuk és a kapcsolatuk a kulcspár kriptográfiával.
lang: hu
isOutdated: true
---

Egy Ethereum számla egy olyan entitás, mely ether (ETH) egyenleggel rendelkezik és tranzakciókat tud indítani az Ethereumon. A számlák lehetnek felhasználók által irányítottak, vagy okos szerződésként telepítettek.

## Előfeltételek {#prerequisites}

A számlák téma könnyen feldolgozható még a legkezdőbb felhasználóknak is. De ennek az oldalnak a jobb megértése érdekében javasoljuk, hogy először olvasd el a [bevezetés az Ethereumba](/developers/docs/intro-to-ethereum/) oldalunkat.

## Számlatípusok {#types-of-account}

Az Ethereum két számlatípust kínál:

- Külső tulajdonú - bárki irányíthatja a privát kulcsokkal
- Szerződés - egy okosszerződés, melyet a hálózatra telepítettek és kód irányítja. Tudj meg többet az [okosszerződésekről](/developers/docs/smart-contracts/)

Mindkét számlatípus képes:

- ETH-et és más tokeneket fogadni, tartani és küldeni
- Interakcióba lépni a telepített okosszerződésekkel

### Legfontosabb különbségek {#key-differences}

**Külső tulajdonú**

- Egy számla létrehozása nem kerül semmibe
- Tranzakciókat indíthatsz
- A külső tulajdonú számlák közötti tranzakciók csak ETH átutalások lehetnek

**Szerződés**

- Egy számla létrehozás költséggel jár, mivel a hálózati tárhelyet használod
- Csak úgy küldhet tranzakciókat ha az egy válasz egy bejövő tranzakcióra
- Külső tulajdonú számláról küldött tranzakciók beindíthat egy programkódot, mely parancsokat hajt végre, mint például token átutalásokat vagy akár új szerződés létrehozásokat

## Egy számla közelebbről {#an-account-examined}

Az Ethereum számláknak négy mezőjük van:

- `nonce` – egy számláló, mely a számláról küldött tranzakciók számát jelzi. Ez biztosítja, hogy minden tranzakciót csak egyszer dolgozzanak fel. Szerződéses számlák esetében ez a szám jelzi a számla által létrehozott szerződéseket
- `balance` – A cím által birtokolt Wei-k száma. A Wei az ETH egysége és 1e+18 Wei van egy ETH-ben.
- `codeHash` – Az összes ilyen kódrészletet az állapot adatbázis tartalmazza a megfelelő hashek alatt későbbi visszakeresés céljából. Szerződéses számláknál ez az a kód, ami hashelődik és codeHashként tárolódik. Külső tulajdonú számláknál a codeHash mező egy üres sztring hash-e.
- `storageRoot` – Néha úgy is hivatkoznak rá, mint tárhely hash. Egy Merkle Patricia fa gyökér csomópontjának 256-bites hash-e, mely kódolja a számla tárhelyének tartalmát (egy mapping 256-bites integer értékek között), a fába kódolva, mint egy 256-bites integer kulcsok 256-bites Keccak hash-e és az RLP kódolású 256-bites integer értékek közötti leképzés. Ez a fa a számla tárolótartalmának hash-ét kódolja, és alapértelmezés szerint üres.

![Egy diagram mely egy számla felépítését mutatja be](./accounts.png) _Diagram átvéve az [Ethereum EVM illusztrálva](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_ anyagból

## Külső tulajdonú számlák és kulcspárok {#externally-owned-accounts-and-key-pairs}

Egy számla egy kriptográfiai kulcspárból áll: egy publikusból és egy privátból. Segítenek bizonyítani, hogy a tranzakciót valóban a küldő írta alá és megelőzik a hamisítást. A privát kulcsod az, amivel aláírod a tranzakciókat, így felügyeletet biztosít számodra a számládhoz tartozó pénz felett. Valójában sosem birtokolsz kriptovalutát, privát kulcsokat birtokolsz - a tőke mindvégig az Ethereum főkönyvében van.

Ez biztosítja azt, hogy rosszindulatú szereplők ne indíthassanak hamis tranzakciókat, mivel mindig azonosítani tudod a tranzakció küldőjének kilétét.

Ha Alice ethert szeretne küldeni a számlájáról Bob számlájára, akkor Alice-nek egy tranzakció kérelmet kell készítenie és elküldeni a hálózatra hitelesítésre. Az Ethereum publikus kulcs kriptográfiája biztosítja, hogy Alice be tudja bizonyítani, hogy ő volt aki elindította a tranzakciós kérelmet. Kriptográfiai mechanizmusok nélkül egy kártékony ellenség, Eve, egyszerűen elküldhetne egy kérelmet, mely úgy néz ki, mint "küldj 5 ETH-et Alice számlájáról Eve számlájára" és senki sem tudná bebizonyítani, hogy nem Alice-től származik.

## Számla létrehozása {#account-creation}

Amikor szeretnél létrehozni egy számlát, akkor a legtöbb könyvtár generál neked egy random privát kulcsot.

Egy privát kulcs 64 hexadecimális karakterből áll, és jelszóval lehet titkosítani.

Példa:

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

A publikus kulcs a privátkulcsból generálódik az elliptikus görbe digitális aláírás algoritmussal (ECDSA). A számlád publikus címét úgy kaphatod meg, ha elveszed a legutolsó 20 bájtot a publikus kulcsból és hozzáadsz egy `0x` előtagot az elejére.

Itt egy példa számla létrehozásra a konzolban a GETH `personal_newAccount` függvény használatával

```go
> personal.newAccount()
Passphrase:
Repeat passphrase:
"0x5e97870f263700f46aa00d967821199b9bc5a120"

> personal.newAccount("h4ck3r")
"0x3d80b31a78c30fc628f20b2c89d7ddbf6e53cedc"
```

[GETH dokumentáció](https://geth.ethereum.org/docs)

Lehetséges új publikus kulcsokat származtatni a privát kulcsodból, de nem tudsz publikus kulcsokból privát kulcsot származtatni. Ez azt jelenti, hogy létfontosságú a privát kulcs biztonságban tartása, és ahogy a neve is sugallja: **PRIVÁT**.

Egy privát kulcsra van szükséged, hogy üzeneteket és tranzakciókat tudj aláírni, mely egy aláírást hoz létre. Ezáltal mások az aláírásodból leszármaztathatják a publikus kulcsodat, amely az üzenet feladójának kilétét bizonyítja. Az alkalmazásodban használhatsz egy javascript könyvtárat, hogy tranzakciókat küldj a hálózatra.

## Szerződéses számlák {#contract-accounts}

A szerződéses számláknak szintén egy 42 karakterből álló hexadecimális címük van:

Példa:

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

Ez a szerződés cím általában akkor jön létre, amikor egy szerződést feltelepítenek az Ethereum Blokkláncra. A cím a készítő címéből és ebből a címről küldött tranzakciók számából (a “nonce”) származik.

## Egy megjegyzés a tárcákkal kapcsolatban {#a-note-on-wallets}

Egy számla nem egy tárca. Egy tárca az a kulcspár, mely hozzá van rendelve a felhasználó által birtokolt számlához, mely lehetővé teszi a felhasználó számára, hogy tranzakciókat indítson vagy kezelje a számlát.

## További olvasnivaló {#further-reading}

_Ismersz olyan közösségi anyagot, amely segített neked? Módosítsd az oldalt és add hozzá!_

## Kapcsolódó témák {#related-topics}

- [Okosszerződések](/developers/docs/smart-contracts/)
- [Tranzakciók](/developers/docs/transactions/)
