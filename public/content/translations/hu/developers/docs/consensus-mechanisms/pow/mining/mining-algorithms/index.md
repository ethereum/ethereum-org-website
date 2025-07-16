---
title: Bányászati algoritmusok
description: Az Ethereum-bányászat algoritmusainak bemutatása.
lang: hu
---

<InfoBanner emoji=":wave:">
A proof-of-work (munkaigazolás) már nem az Ethereum konszenzusmechanizmus alapja, tehát a bányászatot kikapcsolták. Ehelyett az Ethereumot úgy biztosítják a validátorok, hogy letétbe helyeznek ETH-t. Ön is letétbe helyezheti a rendelkezésére álló ETH-t. Tudjon meg többet a <a href='/roadmap/merge/'>egyesítés (Merge)</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>proof-of-stake (letéti igazolás)</a> és <a href='/staking/'>letétbe helyezés</a> témákról. Ez az oldal csak elavult témákat tartalmaz.
</InfoBanner>

Az Ethereum-bányászat egy Ethash nevű algoritmust használt. k az algoritmusnak az a lényege, hogy a bányász megpróbál egy nonce értéket találni nagy számítási kapacitás révén, hogy a létrejövő hash kisebb legyen, mint a kiszámolt nehézség határértéke. Ez a nehézségi szint dinamikusan változtatható, így a blokkok létrehozása rendszeresen meg tud történni.

## Előfeltételek {#prerequisites}

A jelen téma könnyebb megértéséhez javasoljuk, hogy előbb tekintse meg a [proof-of-work konszenzusról](/developers/docs/consensus-mechanisms/pow) és a [bányászatról](/developers/docs/consensus-mechanisms/pow/mining) szóló oldalakat.

## Dagger Hashimoto {#dagger-hashimoto}

A Dagger Hashimoto az Ethereum-bányászat korábbi algoritmusa volt a fejlesztés idején, melyet az Ethash váltott le. Ez két különböző algoritmus, a Dagger és a Hashimoto, összeolvadása volt. Ezt a fejlesztés idején használták, és az Ethereum főhálózat bevezetésekor már az Ethash működött.

A [Dagger](http://www.hashcash.org/papers/dagger.html) bevezette az [irányított aciklikus gráf (Directed Acyclic Graph)](https://en.wikipedia.org/wiki/Directed_acyclic_graph) generációját, melyeknek véletlenszerű szeleteit hashelik össze. A lényegi elve az, hogy a nonce a nagy adatfából csak egy kis részt igényel. A bányászatnál nem lehet újrakalkulálni a nonce-hoz az alfát – tehát tárolni kell a fát –, de az egy nonce értékű ellenőrzésnél ez rendben van. A Dagger a létező algoritmusok, mint a Scrypt, alternatívája volt, ami sok memóriát igényelt (memory hard), de nehéz volt ellenőrizni, hogy a memóriahasználat mikor éri el a valóban biztonságos szintet. A Dagger ugyanakkor sebezhető volt a megosztott memóriaalapú hardver-gyorsítás esetén, ezért a kutatás során elvetették.

A [Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf) egy olyan algoritmus, amely ASIC-ellenállást biztosít az I/O bound révén (mivel a memóriaolvasások a bányászat behatároló tényezői). A lényeg az, hogy a RAM elérhetőbb, mint a számítási kapacitás; sok milliárd dollárnyi kutatás már optimalizálta a RAM használatot különféle esetekre, ami gyakran szinte véletlenszerű elérési mintákat (tehát a véletlenszerű memóriaelérést is) foglal magában. Ennek eredményeként a meglévő RAM elég közel van az optimálishoz, hogy értékelje az algoritmust. A Hashimoto a blokkláncot adatforrásnak használta, így megfelelt a fenti (1) és (3) pontoknak.

A Dagger-Hashimoto a Dagger és a Hashimoto algoritmusok módosított változatát használta. A Dagger-Hashimoto és a Hashimoto között az a különbség, hogy nem blokkláncot használ adatforrásként, hanem egy személyre szabott adathalmazt, amely a blokkadatokból frissül minden N-edik blokknál. Az adathalmaz a Dagger-algoritmussal készült, amellyel hatékonyan lehetett minden nonce-ra egy alhalmazt kikalkulálni a könnyű kliens ellenőrzéshez. A Dagger-Hashimoto és a Dagger közötti különbség az, hogy a blokklekérdezéshez használt adathalmaz félig állandó, és esetileg frissítik (például hetente). Így az adathalmaz létrehozásának erőfeszítése nullához közelít, így a megosztott memória felgyorsításával kapcsolatos problémák (lásd Sergio Lerner) elhanyagolhatóvá váltak.

Bővebben a [Dagger-Hashimoto algoritmusról](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto).

## Ethash {#ethash}

Az Ethash az a bányászati algoritmus, melyet az Ethereum főhálózaton használtak a ma már kivezetett proof-of-work architektúrában. Az Ethash az új neve a Dagger-Hashimoto egy specifikus verziójának, mivel azt jelentősen megváltoztatták, de mégis megmaradtak az alapvető elvei az elődjének. Az Ethereum-főhálózat csak az Ethasht használta, mivel a Dagger-Hashimoto a kutatás-fejlesztés idején működött, és még a bányászat megkezdése előtt lecserélték.

[Bővebben az Ethash-ről](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash).

## További olvasnivaló {#further-reading}

_Ismersz olyan közösségi anyagot, mely segített neked? Módosítsd az oldalt és add hozzá!_
