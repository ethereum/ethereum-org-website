---
title: Konszenzus mechanizmusok
description: Egy magyarázat az elosztott rendszerek konszenzus protokolljairól és szerepükről az Ethereumban.
lang: hu
incomplete: true
---

Az Ethereumhoz hasonló blokkláncok esetében, melyek lényegében elosztott adatbázisok, a hálózat csomópontjainak el kell tudni érniük az egyetértést a rendszer jelenlegi állapota felett. Ezt konszenzus mechanizmusokkal lehet elérni.

Habár nem tartozik a dapp fejlesztés témakörébe, a konszenzus mechanizmusok megértése segít megmagyarázni olyan dolgokat, melyek relevánsak számodra és a felhasználóid számára, mint például a gáz árak vagy a tranzakciós idők.

## Előfeltételek {#prerequisites}

Ennek az oldalnak a jobb megértése érdekében javasoljuk, hogy először olvasd el a [bevezetés az Ethereumba](/developers/docs/intro-to-ethereum/) oldalunkat.

## Mi az a konszenzus mechanizmus? {#what-is-a-consensus-mechanism}

A konszenzus mechanizmusok (más néven konszenzus protokollok vagy konszenzus algoritmusok) lehetővé teszik az elosztott rendszerek (számítógépes hálózatok) számára, hogy együtt dolgozzanak és biztonságosak maradjanak.

Évtizedekig használták ezeket a mechanizmusokat, hogy elérjék az adatbázis csomópontok, alkalmazás szerverek és más vállalati infrastruktúrák közötti konszenzust. Az elmúlt években újfajta konszenzus protokollokat találtak fel, melyek lehetővé teszik az Ethereumhoz hasonló kriptoökonómiai rendszerek számára, hogy egyet tudjanak érteni a hálózat állapota felett.

Emellett egy konszenzus mechanizmus egy kriptoökonómiai rendszerben segít kivédeni bizonyos gazdasági támadásokat. Elméletben egy támadó képes megdönteni a konszenzust, ha a hálózat 51%-át irányítja. A konszenzus mechanizmusokat arra tervezték, hogy ellehetetlenítsék ezeket az "51%-os támadásokat". Különböző mechanizmusok különböző módon próbálják megoldani ezt a biztonsági problémát.

## A konszenzus mechanizmusok fajtái {#types-of-consensus-mechanisms}

### Proof-of-work {#proof-of-work}

Az Ethereum, a Bitcoinhoz hasonlóan, jelenleg a proof-of-work (PoW) konszenzus protokollt használja.

#### Blokk létrehozás {#pow-block-creation}

A proof-of-work-öt a [bányászok](/developers/docs/consensus-mechanisms/pow/mining/) végzik, akik azért versenyeznek, hogy feldolgozott tranzakciókkal teli blokkokat hozhassanak létre. A győztes megosztja az új blokkot a hálózat többi részével és valamennyi újonnan kibocsájtott ETH-et kap jutalmul. A versenyt az nyeri, akinek a számítógépe a leggyorsabban tud megoldani egy matematikai feladványt - ez teremti meg a kapcsolatot a jelenlegi blokk és az előző blokk között. Ennek a feladványnak a megoldása jelenti a munkát a "proof-of-work-ben".

#### Biztonság {#pow-security}

A hálózatot az tartja biztonságban, hogy a hálózat számítási erejének több mint 51%-ára van szükséged, hogy átverd a láncot. Ez olyan nagy befektetést igényelne a felszerelésben és energiában, hogy valószínűleg többet költenél, mint amennyit nyernél vele.

Többet a [proof-of-work-ről (PoW)](/developers/docs/consensus-mechanisms/pow/)

### Proof-of-stake {#proof-of-stake}

Az Ethereum a tervek szerint átvált a [proof-of-stake (PoS)](/developers/docs/consensus-mechanisms/pos/) konszenzus protokollra.

#### Blokk létrehozás {#pos-block-creation}

A proof-of-stake-t validátorok végzik, akik letétbe helyezték az ETH-jüket, hogy részt vegyenek a rendszerben. Egy adott validátort véletlenszerűen választanak ki, hogy új blokkot hozzon létre és megossza a hálózattal, valamint jutalmat kapjon. Ahelyett, hogy intenzív számítási munkát kelljen végezned, csak az ETH-edet szükséges letenned a hálózatba. Ez az ami ösztönzi az egészséges hálózati viselkedést.

#### Biztonság {#pos-security}

A proof-of-stake rendszert az tartja biztonságban, hogy az összes letétbe helyezett ETH-nek az 51%-át kell birtokolnod, hogy átverd a láncot. És az, hogy a letétedet megvágják ha rosszindulatúan viselkedsz.

Többet a [proof-of-stake-ről (PoS)](/developers/docs/consensus-mechanisms/pos/)

## További olvasnivaló {#further-reading}

## Kapcsolódó témák {#related-topics}

- [Proof-of-work](/developers/docs/consensus-mechanisms/pow/)
- [Bányászat](/developers/docs/consensus-mechanisms/pow/mining/)
- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
