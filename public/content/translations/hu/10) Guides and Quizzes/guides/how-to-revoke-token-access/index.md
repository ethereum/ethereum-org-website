---
title: Hogyan vonható vissza, hogy az okosszerződés hozzáférjen a kriptoeszközeihez
description: Útmutató arról, hogyan vonhatja vissza, hogy az okosszerződés hozzáférjen a kriptoeszközeihez
lang: hu
---

# Hogyan vonható vissza, hogy az okosszerződés hozzáférjen a kriptoeszközeihez

Ez az útmutató megtanítja Önnek, hogyan tekintheti meg az összes [intelligens szerződés](/glossary/#smart-contract) listáját, amelyhez hozzáférést biztosított, és hogyan mondhatja fel azokat.

Néha a rosszhiszemű fejlesztők olyan kiskapukat építenek az okosszerződésekbe, melyek hozzáférést biztosítanak a gyanútlan felhasználók eszközeihez, akik azzal a szerződéssel interakcióba lépnek. Gyakran előfordul, hogy az ilyen platformok engedélyt kérnek a felhasználótól **korlátlan számú token** elköltésére, hogy a jövőben kis mennyiségű [gázt](/glossary/#gas) spóroljanak meg, de ez az megnövekedett kockázat.

Miután egy platform korlátlan hozzáférési jogokkal rendelkezik egy tokenhez a [pénztárcájában](/glossary/#wallet), akkor is elköltheti ezeket a tokeneket, még akkor is, ha Ön kivette a pénzt a platformjáról a pénztárcájába. A rosszindulatú szereplők még így is hozzáférhetnek az Ön pénzéhez, amit a saját tárcájukba lehívnak, és Ön ezt már nem fogja tudni visszaszerezni.

Ezt úgy tudja elkerülni, hogy tartózkodik a nem tesztelt új projektek használatától, csak azt hagyja jóvá, amire valóban szüksége van és rendszeresen visszavonja a hozzáféréseket. Tehát hogyan is kell ezt csinálni?

## 1. lépés: Hozzáférés-visszavonási eszközök használata

Számos weboldal lehetővé teszi, hogy láthassa és visszavonhassa a címéhez kapcsolódó okosszerződéseket. Látogasson el a weboldalra és kapcsolja azt össze a tárcájával:

- [Ethallowance](https://ethallowance.com/) (Ethereum)
- [Etherscan](https://etherscan.io/tokenapprovalchecker) (Ethereum)
- [Cointool](https://cointool.app/approve/eth) (több hálózat)
- [Revoke](https://revoke.cash/) (több hálózat)
- [Unrekt](https://app.unrekt.net/) (több hálózat)
- [EverRevoke](https://everrise.com/everrevoke/) (több hálózat)

## 2. lépés: Összekapcsolás a tárcával

A weboldalon kattintson a „Tárcához kapcsolás” funkcióra. A weboldalon megjelenik egy, a tárcához kapcsolódásról szóló üzenet.

Használja ugyanazt a hálózatot a tárcán és a weboldalon. Csak azokat az okosszerződéseket fogja látni, melyek ehhez a hálózathoz kötődnek. Például, az Ethereum-főhálózathoz kapcsolódva csak az Ethereum-szerződéseket látja, a más láncokról (pl. Polygon) származó szerződéseket nem.

## 3. lépés: A visszavonni kívánt okosszerződés kiválasztása

Itt az összes szerződést látnia kell, amely hozzáfér az Ön tokenjeihez, illetve azok költési keretének is meg kell jelennie. Válassza ki azt, amelyet le kívánja zárni.

Ha nem tudja, hogy melyik az, akkor az összeset leválaszthatja. Ez nem okoz problémát, a következő alkalommal, amikor ezekkel a szerződésekkel interakcióba lép, új engedélyt kell adnia azoknak.

## 4. lépés: Az eszközeihez való hozzáférés lezárása

A lezárásra kattintva egy új tranzakció jelentik meg a tárcájában. Ez várható jelenség. A lezárás sikeres elvégzéséhez ki kell fizetnie a díjat. A hálózattól függően ez akár néhány percig is eltarthat.

Javasoljuk, hogy néhány perc múlva frissítse a visszavonási eszközt, és nézze meg a tárcájában, hogy valóban eltűnt-e a törölt kapcsolat a listáról.

<mark>Sose adjon a projekteknek korlátlan hozzáférést a tokenjeihez, valamint törölje rendszeresen a hozzáféréseket. A tokenekhez való hozzáférés leállítása nem jár eszközvesztéssel, ha a fenti eszközöket használja.</mark>

 <br />

<InfoBanner shouldSpaceBetween emoji=":eyes:">
  <div>Szeretne többet megtudni?</div>
  <ButtonLink href="/guides/">
    Tekintse meg a további útmutatóinkat
  </ButtonLink>
</InfoBanner>

## Gyakran ismételt kérdések

### A tokenekhez való hozzáférés leállítása a letétbe helyezést, letéti alapokat, kölcsönzést stb. is felfüggeszti?

Nem, ez nem befolyásolja egyik [DeFi](/glossary/#defi) stratégiáját sem. A helyzete változatlan marad, és tovább kapja a jutalmakat stb.

### A projektről leválasztani a tárcát ugyanazzal az eredménnyel jár, mintha visszavonnám az engedélyt, hogy hozzáférjen az eszközeimhez?

Nem, mert a tárca leválasztása után, ha Ön engedélyt adott a tokenek használatára, akkor a projekt továbbra is használni tudja a tokeneket. Az engedélyt kell visszavonnia.

### A szerződés engedélye mikor jár le?

A szerződés engedélyeinek nincs lejárati ideje. Ha engedélyt adott, akkor az akár évekkel később is érvényes lehet.

### A projektek miért állítanak be korlátlan tokenhasználatot?

A projektek gyakran így akarják minimalizálni a kérvények számát, mert ilyenkor a felhasználónak csak egyszer kell jóváhagynia és a tranzakciós díjat is csak egyszer kell kifizetnie. Bár ez kényelmes megoldás lehet, ugyanolyan veszélyt is rejt azokra a felhasználókra nézve, akik idővel vagy audittal még nem igazolt oldalak hagynak jóvá ilyet. Néhány tárcánál lehetséges manuálisan beállítani a tokenek felhasználható mennyiségét, hogy csökkentsék a kockázatot. További információkért forduljon tárcaszolgáltatójához.
