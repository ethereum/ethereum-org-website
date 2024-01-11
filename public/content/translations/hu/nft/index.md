---
title: Nem helyettesíthető tokenek (NFT-k)
description: Az NFT-k áttekintése az Ethereum hálózaton
lang: hu
template: use-cases
emoji: ":frame_with_picture:"
sidebarDepth: 2
image: /infrastructure_transparent.png
alt: Egy Eth logó, amely hologram segítségével jelenik meg.
summaryPoint1: Egy módszer arra, hogy egyedi dolgokat Ethereum alapú javakként jelenítsünk meg.
summaryPoint2: Az NFT-k minden korábbinál nagyobb hatalmat adnak a tartalomgyártók kezébe.
summaryPoint3: Az Ethereum blokklánc okosszerződései által működtetve.
---

## Mik azok a nem helyettesíthető tőkenek (NFT)? {#what-are-nfts}

Az NFT-k olyan tokenek, melyek teljesen egyediek. Minden egyes NFT más jellemzőkkel bír (nem helyettesíthető) és bizonyítottan véges. Különbözik más tokenektől, mint amilyen az ERC-20 is, ahol egy adott tokenszett minden eleme azonos és ugyanolyan jellemzőkkel bír (helyettesíthető). Nem számít, hogy az ember pénztárcájában konkrétan melyik bankjegy található, mert mindegyik azonos és ugyanolyan értékű. Az azonban _valóban_ számít, hogy Ön melyik NFT-t birtokolja, mert egyedi jellemzőik megkülönböztetik azokat egymástól (nem helyettesíthető).

Az NFT-k egyedisége révén akár műtárgyak, gyűjthető tárgyak vagy ingatlanok is tokenné alakíthatók. Ekkor egy adott egyedi NFT egy specifikus, egyedi, valós vagy digitális tárgyat képvisel. Egy eszköz tulajdonjogát az Ethereum-blokklánc biztosítja – senki sem módosíthatja a tulajdonjog igazolását, vagy hozhat létre új NFT-t másolással és beillesztéssel.

<YouTube id="Xdkkux6OxfM" />

## Az eszközök internete {#internet-of-assets}

Az NFT-k és az Ethereum megoldást jelent néhány, napjainkban az interneten jelen lévő problémára. Ahogy minden egyre digitálisabbá válik, egyre inkább szükség van a fizikai tárgyak bizonyos tulajdonságainak replikálására, mint például a ritkaság, az egyediség és a tulajdonjog bizonyítása. oly módon, hogy azt ne egy központi szervezet irányítsa. Például az NFT révén bárki birtokolhat olyan mp3 zenét, mely nem egy cég specifikus zenei alkalmazásához kötődik, illetve egy olyan oldalt a közösségi médiában, melyet eladhat vagy elcserélhet, de azt nem veheti el önkényesen a platform szolgáltatója.

Így néz ki az NFT-k internete ahhoz az internethez képest, amelyet a többségünk minden nap használ...

### Összehasonlítás {#nft-comparison}

| Az NFT-k internete                                                                                                                                                   | Az internet ma                                                                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ön birtokolja az eszközeit! Egyedül Ön adhatja vagy cserélheti el azokat.                                                                                            | Eszközt bérel valamelyik szervezettől.                                                                                                                                          |
| Az NFT-k digitálisan egyediek, nincs két azonos NFT.                                                                                                                 | Egy adott entitás másolatát gyakran nem lehet megkülönböztetni az eredetitől.                                                                                                   |
| Az NFT tulajdonjogát a blokklánc tárolja, így bárki beazonosíthatja azt.                                                                                             | A digitális javak tulajdonjogi nyilvántartását intézmények által ellenőrzött szervereken tárolják – az ő szavukra kell hagyatkoznunk.                                           |
| Az NFT-k okosszerződések az Ethereum hálózatán. Ez azt jelenti, hogy így könnyen fel lehet azokat használni más okosszerződésekben és alkalmazásokban az Ethereumon! | A digitális eszközöket birtokló vállalatoknak általában saját, falakkal védett infrastruktúrát kell kialakítaniuk.                                                              |
| A tartalomkészítők bárhol eladhatják munkáikat, és hozzáférhetnek a világpiachoz.                                                                                    | Az alkotók csak annak a felületnek a hálózatára és disztribúciójára támaszkodhatnak, amelyet használnak. Ezeknek gyakran felhasználási feltételei és földrajzi korlátai vannak. |
| Az NFT létrehozói megtarthatják tulajdonjogaikat saját munkájukat illetően, valamint belefoglalhatják a jogdíjfizetést az NFT szerződésbe.                           | Az online zeneszolgáltatók és a hasonló platformok megtartják a haszon túlnyomó részét.                                                                                         |

## Hogyan működnek az NFT-k? {#how-nfts-work}

Ahogy az Ethereumon létrehozott többi tokent, az NFT-ket is okosszerződések kreálják. Az okosszerződés a számos NFT-standard egyikét (általában ERC-721 vagy ERC-1155) alkalmazza, mely meghatározza a szerződés funkcióit. A szerződés létrehozza (minteli) az NFT-t, és egy adott tulajdonoshoz rendeli. A tulajdonjogot úgy határozza meg a szerződés, hogy az adott NFT-t adott címhez köti. Az NFT rendelkezik egy azonosítóval (ID) és jellemzően metaadatok kapcsolódnak hozzá, melyek egyedivé teszik az adott tokent.

Amikor valaki létrehozza vagy minteli az NFT-t, akkor valójában az okosszerződés egy funkcióját indítja el, mely a címéhez rendeli az adott NFT-t. Ezt az információt a szerződés tárhelye őrzi a blokklánc részeként. A szerződés létrehozója egyéb logikát is belevehet a szerződésbe, mint például a kínálat korlátozása, illetve jogdíjfizetés az alkotónak minden alkalommal, amikor a token tulajdonost vált.

## Mire használják az NFT-ket? {#nft-use-cases}

Az NFT-ket számtalan esetben használják, ilyen például:

- egy eseményen való részvétel igazolása
- egy elvégzett képzés bizonyítványa
- a játékokban birtokolható dolgok
- digitális művészet
- valós tárgyak tokenizálása
- online személyazonosság bizonyítása
- hozzáférés bizonyos tartalmakhoz
- jegyek
- decentralizált internetes domainnevek
- fedezet a decentralizált pénzügyekben (DeFi)

Tegyük fel, hogy Ön egy művész, aki szeretné NFT-ként megosztani az alkotását, anélkül hogy elveszítené az ellenőrzést felette és közvetítőkre áldozná a profitját. Létrehozhat egy új szerződést, melyben megadja az NFT-k számát, jellemzőiket, és hozzákapcsolja az adott műalkotást. Beleírhatja az okosszerződésbe az Önnek járó jogdíjakat (pl. az eladási ár 5%-át utalják a szerződés tulajdonosának minden alkalommal, amikor az NFT gazdát cserél). Mindig képes lesz bizonyítani, hogy Ön hozta létre az NFT-ket, mert a birtokában van az a tárca, mely létrehozta a szerződést. A vásárlók is könnyedén bizonyíthatják, hogy eredeti NFT-vel rendelkeznek az Ön kollekciójából, mert a tárcáik címe hozzá van rendelve egy tokenhez az okosszerződésben. Az egész Ethereum-ökoszisztémában használhatják az NFT-t, teljes bizonyossággal az eredetiségét illetően.

Vagy vegyünk például egy sporteseményre szóló jegyet. Ahogyan egy rendezvény szervezője eldöntheti, hogy hány jegyet ad el, úgy az NFT létrehozója is eldöntheti, hogy hány másolat létezhet. Néha ezek pontos másolatok, mint például 5000 darab nem helyre szóló belépőjegy. Néha több olyan jegyet is kiállítanak, amelyek nagyon hasonlóak, de mindegyik kissé különbözik, mint például kijelölt ülőhelyekre szóló jegyek. Ezeket vehetik és adhatják egymás között (peer-to-peer) anélkül, hogy fizetni kellene a jegyárusoknak, a vevő pedig a szerződés címét ellenőrizve mindig meggyőződhet a jegyek eredetiségéről.

Az ethereum.org portálon NFT-t használunk arra, hogy igazoljuk a tagok közreműködését a Github gyűjteményhez (repóhoz) vagy a részvételüket bizonyos konferenciabeszélgetéseken, sőt, saját NFT domainnévvel is rendelkezünk. Ha Ön hozzájárul az ethereum.org felülethez, egy POAP NFT-t igényelhet. Bizonyos kriptotalálkozók POAP-ot (részvételt tanúsító protokollt) használnak jegy gyanánt. [Tudjon meg többet a hozzájárulásról](/contributing/#poap).

![ethereum.org POAP](./poap.png)

Ez a weboldal egy alternatív, NFT-k által működtetett domainnévvel is rendelkezik: **ethereum.eth**. Az `.org` címünket központilag egy domainnévrendszer (DNS) szolgáltató kezeli, míg az ethereum`.eth` cím az Ethereum Name Service (ENS) szolgáltatáson keresztül van regisztrálva az Ethereumra. Ezt a mi tulajdonunkban van, és mi kezeljük. [Tekintse meg az ENS-adatainkat](https://app.ens.domains/name/ethereum.eth)

[Bővebben az ENS-ről](https://app.ens.domains)

<Divider />

### Az NFT-k biztonsága {#nft-security}

Az Ethereum biztonságát a letét bizonyítéka (vagyis a proof-of-stake) adja. A rendszert úgy tervezték, hogy gazdaságilag visszatartson a rosszindulatú cselekedetektől, így az Ethereum hamisíthatatlan. Ennek köszönhetően létezhetnek az NFT-k. Ha az NFT-tranzakciót tartalmazó blokk véglegesítetté válik, egy támadónak több millió ETH-ba kerülne megváltoztatni azt. Bárki, aki Ethereum-szoftvert futtat, azonnal képes lenne észlelni az NFT tisztességtelen manipulálását, és a csalárd szereplőt gazdaságilag megbüntetnék és kizárnák.

Az NFT-kel kapcsolatos biztonsági problémák leggyakrabban adathalász csalásokhoz, okosszerződések sebezhetőségéhez vagy felhasználói hibákhoz (például a privát kulcsok véletlen felfedéséhez) kapcsolódnak, így a megfelelő tárcabiztonság kritikus fontosságú az NFT-tulajdonosok számára.

<ButtonLink to="/security/">
  Bővebben a biztonságról
</ButtonLink>

## További olvasnivaló {#further-reading}

- [A beginner's guide to NFTs](https://linda.mirror.xyz/df649d61efb92c910464a4e74ae213c4cab150b9cbcc4b7fb6090fc77881a95d) – _Linda Xie, 2020. január _
- [EtherscanNFT trekker](https://etherscan.io/nft-top-contracts)
- [ERC-721 tokenszabvány](/developers/docs/standards/tokens/erc-721/)
- [ERC-1155 tokenszabvány](/developers/docs/standards/tokens/erc-1155/)

<Divider />

<QuizWidget quizKey="nfts" />
