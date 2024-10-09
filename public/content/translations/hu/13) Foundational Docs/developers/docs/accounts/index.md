---
title: Ethereum számlák
description: Az Ethereum számlák magyarázata – az adatstruktúrájuk és a kapcsolatuk a kulcspár kriptográfiával.
lang: hu
---

Egy Ethereum számla egy olyan entitás, mely ether (ETH) egyenleggel rendelkezik és tranzakciókat tud indítani az Ethereumon. A számlák lehetnek felhasználók által irányítottak, vagy okos szerződésként telepítettek.

## Előfeltételek {#prerequisites}

Ennek az oldalnak a jobb megértése érdekében javasoljuk, hogy először olvassa el a [bevezetés az Ethereumba](/developers/docs/intro-to-ethereum/) oldalunkat.

## Számlatípusok {#types-of-account}

Az Ethereum két számlatípust kínál:

- Externally owned account (EOA) – bárki irányíthatja a privát kulcsokkal
- Szerződéses számla – egy okosszerződés, amelyet a hálózatra telepítettek és kód irányítja. Tudjon meg többet az [okosszerződésekről](/developers/docs/smart-contracts/)

Mindkét számlatípus képes:

- ETH és más tokenek fogadása, tartása és küldése
- Interakcióba lépni a telepített okosszerződésekkel

### Legfontosabb különbségek {#key-differences}

**Külső tulajdonú**

- Egy számla létrehozása nem kerül semmibe
- Tranzakciókat indíthatsz
- A külső tulajdonú számlák közötti tranzakciók csak ETH/token átutalások lehetnek
- Egy kriptográfiai kulcspárból állnak: a nyilvános és a privát kulcs kontrollálja a számlával kapcsolatos ügyleteket

**Szerződés**

- Egy számla létrehozása költséggel jár, mivel a hálózati tárhelyet használja
- Csak úgy küldhet tranzakciókat ha az egy válasz egy bejövő tranzakcióra
- A külső tulajdonú számláról szerződéses számlára küldött tranzakciók egy programkódot indítanak, amely sokféle parancsot tud végrehajtani, mint például token átutalása vagy akár új szerződés létrehozása
- A szerződéses számláknak nincs privát kulcsuk. Ehelyett az okosszerződés logikája kontrollálja azokat

## Egy számla közelebbről {#an-account-examined}

Az Ethereum számláknak négy mezőjük van:

- `nonce` – Egy számláló, amely az elküldött tranzakciók számát (külső tulajdonú számla) vagy a létrehozott szerződések számát (szerződéses számla) mutatja. Egy adott nonce segítségével csak egy tranzakció hajtható végre az adott számlára, így nem lehet újrajátszani a tranzakciót, így védve van az ilyen jellegű támadásoktól.
- `balance` – A cím által birtokolt Wei-k száma. A Wei az ETH denominált egysége és 1e+18 Wei van egy ETH-ben.
- `codeHash` – Ez a hash egy számla _kódjára_ hivatkozik az Ethereum Virtuális Gépen (EVM). A szerződéses számlák olyan kódrészleteket tartalmaznak, amelyek különféle műveleteket tudnak végrehajtani. Ez az EVM-kód kerül végrehajtásra, ha a számla egy üzenethívást kap. A többi számlamezővel ellentétben ezt nem lehet megváltoztatni. Az összes ilyen kódrészletet az státuszadatbázis tartalmazza a megfelelő hashek alatt későbbi visszakeresés céljából. Ezt a hash-értéket nevezik codeHash-nek. Külső tulajdonú számláknál a codeHash mező egy üres sztring hash-e.
- `storageRoot` – Néha úgy is hivatkoznak rá, mint tárhely-hash. Egy Merkle Patricia trie gyökér csomópontjához tartozó 256 bites hash, amely a számla tárhelyének tartalmát kódolja (256 bites integer értékek közötti leképzés), a fába kódolva, mint egy 256 bites integer kulcsok 256 bites Keccak hash-e és az RLP kódolású 256 bites integer értékek közötti leképzés. Ez a fa a számla tárolótartalmának hash-ét kódolja, és alapértelmezés szerint üres.

![Egy diagram mely egy számla felépítését mutatja be](./accounts.png) _Diagram átvéve az [Ethereum EVM illusztrálva](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_ anyagból

## Külső tulajdonú számlák és kulcspárok {#externally-owned-accounts-and-key-pairs}

Egy számla egy kriptográfiai kulcspárból áll: egy publikusból és egy privátból. Segítenek bizonyítani, hogy a tranzakciót valóban a küldő írta alá és megelőzik a hamisítást. A privát kulcs az, amellyel aláírja a tranzakciókat, így felügyeletet biztosít a számlához tartozó pénz felett. Valójában sosem birtokolsz kriptovalutát, privát kulcsokat birtokolsz - a tőke mindvégig az Ethereum főkönyvében van.

Ez biztosítja azt, hogy rosszindulatú szereplők ne indíthassanak hamis tranzakciókat, mivel mindig azonosítani tudod a tranzakció küldőjének kilétét.

Ha Alice ethert szeretne küldeni a számlájáról Bob számlájára, akkor Alice-nek egy tranzakció kérelmet kell készítenie és elküldeni a hálózatra hitelesítésre. Az Ethereum publikus kulcs kriptográfiája biztosítja, hogy Alice be tudja bizonyítani, hogy ő volt aki elindította a tranzakciós kérelmet. Kriptográfiai mechanizmusok nélkül egy kártékony ellenség, Eve, egyszerűen elküldhetne egy kérelmet, mely úgy néz ki, mint „küldj 5 ETH-t Alice számlájáról Eve számlájára” és senki sem tudná bebizonyítani, hogy ez nem Alice-től származik.

## Számla létrehozása {#account-creation}

Amikor szeretne létrehozni egy számlát, akkor a legtöbb könyvtár generál egy véletlenszerű privát kulcsot.

Egy privát kulcs 64 hexadecimális karakterből áll, és jelszóval lehet titkosítani.

Példa:

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

A nyilvános kulcsot a privát kulcsból generálják az [Elliptic Curve Digital Signature Algorithm](https://wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) segítségével. A számla publikus címét úgy lehet megkapni, ha elvesszük a legutolsó 20 bájtot a Keccak-256 hash nyilvános kulcsából és hozzáadunk egy `0x` előtagot az elejére.

Ez azt jelenti, hogy egy külső tulajdonú számla (EOA) 42 karakter hosszú címmel bír (20 bájtnyi szegmens, ami 40 hexadecimális karakter, plusz a `0x` előtag).

Példa:

`0x5e97870f263700f46aa00d967821199b9bc5a120`

A következő példa megmutatja, hogyan lehet a [Clef](https://geth.ethereum.org/docs/tools/clef/introduction) nevű aláíró eszközzel egy új számlát létrehozni. A Clef egy számlakezelő és -aláíró eszköz, amely az Ethereum klienssel, a [Geth-szel](https://geth.ethereum.org) van egybecsomagolva. A `clef newaccount` parancs egy új kulcspárt hoz létre, és egy titkosított kulcstárolóba menti el.

```
> clef newaccount --keystore <path>

Please enter a password for the new account to be created:
> <password>

------------
INFO [10-28|16:19:09.156] Your new key was generated       address=0x5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Please backup your key file      path=/home/user/go-ethereum/data/keystore/UTC--2022-10-28T15-19-08.000825927Z--5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Please remember your password!
Generated account 0x5e97870f263700f46aa00d967821199b9bc5a120
```

[Geth-dokumentáció](https://geth.ethereum.org/docs)

Lehetséges új publikus kulcsokat származtatni a privát kulcsodból, de nem tudsz publikus kulcsokból privát kulcsot származtatni. Létfontosságú a privát kulcs biztonságban tartása, mert ahogy a neve is sugallja, ez  **PRIVÁT**.

Egy privát kulcsra van szükséged, hogy üzeneteket és tranzakciókat tudj aláírni, mely egy aláírást hoz létre. Ezáltal mások az aláírásodból leszármaztathatják a publikus kulcsodat, amely az üzenet feladójának kilétét bizonyítja. Az alkalmazásában használhat javascript könyvtárat, hogy tranzakciókat küldjön a hálózatra.

## Szerződéses számlák {#contract-accounts}

A szerződéses számláknak szintén egy 42 karakterből álló hexadecimális címük van:

Példa:

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

Ez a szerződés cím általában akkor jön létre, amikor egy szerződést feltelepítenek az Ethereum blokkláncra. A cím a készítő címéből és az erről a címről küldött tranzakciók számából („nonce”) származik.

## Validátorkulcsok {#validators-keys}

Az Ethereumon létezik egy másik típusú kulcs is, amelyet a proof-of-work-alapú konszenzusról a proof-of-stake-alapúra való átálláskor vezettek be. Ezek a BLS kulcsok, amelyek a validátorokat azonosítják. Hatékonyan aggregálhatók, hogy a hálózatnak kevesebb sávszélességre legyen szüksége a konszenzus elérésekor. Ezen kulcsaggregáció nélkül a validátor minimális letétének sokkal nagyobbnak kellene lennie.

[Bővebben a validátorkulcsokról](/developers/docs/consensus-mechanisms/pos/keys/).

## Megjegyzés a tárcákkal kapcsolatban {#a-note-on-wallets}

A számla nem egyenlő a tárcával. A tárca egy olyan interfész vagy alkalmazás, amely lehetővé teszi az Ethereum-számlával való interakciót, legyen az külső tulajdonú számla vagy szerződéses számla.

## Egy vizuális bemutató {#a-visual-demo}

Nézze meg, ahogy Austin elmagyarázza a hash funkciót és a kulcspárokat.

<YouTube id="QJ010l-pBpE" />

<YouTube id="9LtBDy67Tho" />

## További olvasnivaló {#further-reading}

- [Az Ethereum-számlák megértése](https://info.etherscan.com/understanding-ethereum-accounts/) - etherscan

_Ismersz olyan közösségi anyagot, amely segített neked? Módosítsd az oldalt és add hozzá!_

## Kapcsolódó témák {#related-topics}

- [Okosszerződések](/developers/docs/smart-contracts/)
- [Tranzakciók](/developers/docs/transactions/)
