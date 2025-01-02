---
title: Hogyan lehet felismerni a valótlan tokeneket
description: A valótlan tokenek felismerése, hogyan tűnnek legitimnek, és hogyan lehet elkerülni őket.
lang: hu
---

# Hogyan lehet felismerni a valótlan tokeneket {#identify-scam-tokens}

Az Ethereum egyik leggyakoribb felhasználási módja, hogy egy csoport létrehoz egy kereskedhető tokent, bizonyos értelemben saját valutát. Ezek a tokenek jellemzően a [ERC-20](/developers/docs/standards/tokens/erc-20/)-szabványt követik. Ahol legitim alkalmazási területek vannak, melyek értéket teremtenek, mindig megjelennek a csalók is, hogy ezt az értéket megszerezzék maguknak.

Kétféle módon próbálhatják Önt megtéveszteni:

- **Egy valótlan tokent adnak el**, ami hasonlít az eredetire, melyet meg szeretne vásárolni, de a csalók állították ki és nem ér semmit sem.
- **Ráveszik Önt, hogy rossz tranzakciókat írjon alá**, általában úgy, hogy a saját felhasználói felületükre vezetik át Önt. Megpróbálhatják rávenni, hogy a szerződésüknek adjon hozzáférést az ERC-20 tokenjeihez, bizalmas információkat feltárva, amelyekkel elérik az Ön eszközeit stb. Ezek a hamis honlapok szinte tökéletes másai az eredetinek, de rejtett trükkökkel.

A hamis tokenek illusztrálása végett, és hogyan lehet beazonosítani azokat, megnézünk egy példát: [`wARB`](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82). Ez a token megpróbál úgy kinézni, mint a valós [`ARB`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) token.

<ExpandableCard
title="Mi az az ARB?"
contentPreview=''>

Az Arbitrum egy olyan szervezet, mely <a href="/developers/docs/scaling/optimistic-rollups/">optimista rollupokat</a> fejleszt és kezel. Kezdetben az Arbitrum egy profitorientált vállalatként működött, de aztán decentralizálta magát. Ennek részeként kibocsátott egy <a href="/dao/#token-based-membership">irányítási tokent</a>, amivel kereskedni lehet.

</ExpandableCard>

<ExpandableCard
title="A hamis tokent miért nevezik wARB-nek?"
contentPreview=''>

Az Ethereumon létezik egy konvenció, hogy a nem ERC-20-szabványnak megfelelő tokeneknek egy becsomagolt (wrapped) verziót készítenek, melynek a neve w-vel kezdőik. Például itt van a wBTC a bitcoinhoz és a <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH az etherhez</a>.

Nincs értelme egy olyan ERC-20 token becsomagolt változatát létrehozni, ami már az Ethereumon van, de a csalók a kinézetre hagyatkoznak, nem a mögöttes valóságra.

</ExpandableCard>

## Hogyan működnek a hamis tokenek? {#how-do-scam-tokens-work}

Az Ethereum lényege a decentralizáció. Emiatt nincs központi hatóság, amely elkobozná bárki eszközeit vagy megakadályozná, hogy egy okosszerződést hozzon létre. De ez azt is jelenti, hogy a csalók is képesek bármilyen okosszerződést létrehozni.

<ExpandableCard
title="Mi az az okosszerződés?"
contentPreview=''>

Az <a href="/developers/docs/smart-contracts/">okosszerződések</a> olyan programok, amelyek az Ethereum-blokkláncon futnak. Minden ERC-20 token egy okosszerződéként van létrehozva.

</ExpandableCard>

Specifikusan, az Arbitrum készített egy szerződést, amely az `ARB` szimbólumot használja. De ez nem akadályozza meg a többi embert, hogy egy szerződést készítsenek ugyanezzel a szimbólummal vagy egy hasonlóval. Aki ezt a szerződést megírja, be kell állítsa, hogy az mit fog csinálni.

## Valósnak tűnnek {#appearing-legitimate}

Számos trükk van, amit a hamis tokenek létrehozói képesek megtenni, hogy valósnak tüntessék azt fel.

- **A valós nevet és szimbólumot használják**. Az ERC-20 szerződések viselhetik ugyanazt a szimbólumot és nevet, mint más ERC-20 szerződések. Ezekre az információkra nem lehet a biztonságot alapozni.

- **A valós kibocsátókat használják**. A hamis tokenek gyakran jelentős összegeket dobnak be olyan címekre, amelyek nagy valószínűséggel az eredeti token valódi kibocsátói.

  Térjünk vissza a `wARB` példájához. [Nagyjából a tokenek 16%-a](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?a=0x1c8db745abe3c8162119b9ef2c13864cd1fdd72f) egy olyan címen található, melynek nyilvános neve [Arbitrum Foundation: Deployer](https://etherscan.io/address/0x1c8db745abe3c8162119b9ef2c13864cd1fdd72f). Ez _nem_ egy hamis cím, ez tényleg az a cím, amely [bevezette a valódi ARB-szerződést az Ethereum főhálózatán](https://etherscan.io/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670).

  Mivel egy cím ERC-20-egyenlege része az ERC-20-szerződés tárhelyének, ezért az meghatározható a szerződés alapján, attól függően, hogy a szerződés fejlesztője mit kíván. A szerződés megakadályozhatja a további átadást is, ezért a valós felhasználók nem tudnak megszabadulni ezektől a hamis tokenektől.

- **A valós átutalást használják**. _A valós kibocsátók nem fizetnének egy hamis token átküldéséért, ezért ezek a transzferek valósak, ugye?_ **Nem**. `A transzfer` is az ERC-20-szerződés szerint megy. A csalók könnyedén le tudják programozni, hogy így viselkedjen.

## Hamis weboldalak {#websites}

A csalók nagyon meggyőző weboldalakat is készíthetnek, amelyek néha az eredeti pontos másai, azonos kinézettel, de mégis apró trükkökkel. Például a valósnak tűnő hivatkozások, amelyek elirányítják a felhasználót hamis oldalakra, vagy valótlan információk, amelyek elkérik a felhasználók kulcsait vagy a támadók címére küldetnek pénzeszközöket.

A legjobb, ha mindig megvizsgálja a weboldal címét, illetve a hiteles oldalakat elmenti a könyvjelzők közé. Így a valódi oldalra lép be anélkül, hogy félreírná azt vagy külső hivatkozásra támaszkodna.

## Hogyan tudja Ön is megvédeni magát? {#protect-yourself}

1. **Ellenőrizze a szerződés címét**. A valódi tokenek valódi szervezetektől érkeznek, amelyek címét meg lehet találni a szervezet honlapján. Például [az `ARB` esetében itt találja a valódi címeket](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **A valódi tokenek likviditással bírnak**. A likviditási alap méretét meg tudja nézni a [Uniswap](https://uniswap.org/) oldalán, ami az egyik legelterjedtebb tokenváltó protokoll. Ez a protokoll úgy működik, hogy likviditási alapokat hoz létre, amelybe minden befektető letétbe helyezi a tokenjeit a kereskedési díjakból származó jövedelemért cserébe.

A hamis tokeneknek általában kicsi likviditási alapjuk van, ha egyáltalán van ilyen, mivel a csalók nem akarnak valódi eszközöket kockáztatni. Például az `ARB`/`ETH` Uniswap alap körülbelül egy millió dollárt tartalmaz ([nézze meg a jelenlegi összeget](https://info.uniswap.org/#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)), és kis összegek adás-vétele nem fogja változtatni az árát:

![Valódi token vásárlása](./uniswap-real.png)

De amikor megpróbálja megvenni a hamis tokent, a `wARB`-t, akkor minden vásárlás 90%-kal változtatja az árat:

![Hamis token vásárlása](./uniswap-scam.png)

Ez is azt mutatja, hogy a `wARB` nem lehet valódi.

3. **Nézze meg az Etherscan alkalmazásban**. Számos hamis tokent már beazonosított és jelentett a közösség. Ezek meg vannak [jelölve az Etherscanben](https://info.etherscan.com/etherscan-token-reputation/). Miközben az Etherscan nem egy irányadó igazságforrás (mivel a decentralizált hálózatoknál ez nem lehetséges), mégis az Etherscan által beazonosított tokenek nagy valószínűséggel hamisak.

   ![Hamis token az Etherscanben](./etherscan-scam.png)

## Következtetés {#conclusion}

Amíg érték van a világon, addig csalók is lesznek, akik meg akarják azt szerezni, és egy decentralizált világban senki sem fogja megvédeni Önt, kivéve önmaga. Reméljük, hogy az alábbi jellemzők alapján Ön is könnyedén megkülönbözteti a valódi tokent a hamistól:

- A hamis tokenek valódiakat személyesítenek meg, felhasználva annak nevét, szimbólumát stb.
- A hamis tokenek _nem_ használhatják ugyanazt a szerződési címet.
- A valódi token címét a kibocsátó szervezettől lehet megtudni.
- Ha ez nem sikerül, akkor olyan népszerű, megbízható alkalmazásokat használhat, mint a [Uniswap](https://app.uniswap.org/#/swap) és az[Etherscan](https://etherscan.io/).
