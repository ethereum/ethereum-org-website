---
title: Fordítási útmutató
lang: hu
description: Útmutató a Crowdin használatáról az ethereum.org fordítása kapcsán
---

# Fordítási útmutató {#how-to-translate}

## Vizuális útmutató {#visual-guide}

A vizuális tanulók tekintsék meg, ahogy Luka bemutatja a Crowdin használatát. Ugyanezeket a lépéseket találja meg írott formában alább.

<YouTube id="Ii7bYhanLs4" />

## Írott útmutató {#written-guide}

### Csatlakozzon a projektünkhöz a Crowdin-ben {#join-project}

Jelentkezzen be Crowdin-profiljába vagy készítsen egyet, ha még nem rendelkezik vele. A létrehozáshoz csak egy e-mail-címre és jelszóra lesz szüksége.

<ButtonLink href="https://crowdin.com/project/ethereum-org/">
  Csatlakozzon a projekthez
</ButtonLink>

### Válassza ki a nyelvet {#open-language}

Miután bejelentkezett a Crowdin-be, elolvashatja a projekt leírását és láthatja az elérhető nyelvek listáját. Minden nyelv információkat mutat arról, hogy mennyi lefordítandó szó van benne, mekkora tartalom van már lefordítva és jóváhagyva belőle.

Nyissa meg a nyelvet, amelyre fordítani szeretne, így láthatja a fájlok listáját, melyek elérhetőek.

![A nyelvek listája a Crowdin-ben](./list-of-languages.png)

### Válasszon ki egy dokumentumot, amelyen dolgozni kíván {#find-document}

A honlap tartalma fel van osztva dokumentumokra és tartalommappákra. A dokumentumok státuszát láthatja a jobb oldalon - ha a fordítási eredmény kisebb mint 100%, akkor segítsen be!

Nem találja a nyelvet? [Nyisson egy kérést](https://github.com/ethereum/ethereum-org-website/issues/new/choose) vagy kérdezze meg a [Discord](/discord/) csatornán

![A lefordított és még nem fordított fájlok a Crowdin-ban](./crowdin-files.png)

Megjegyzés a tartalommappákról: ezekre azért van szükség Crowdin-ben, hogy a legfontosabb tartalom legyen kész a leghamarabb. Amikor megnyit egy nyelvet, például a [filipinót](https://crowdin.com/project/ethereum-org/fil#) , akkor tartalommappákat lát (1. Kezdőoldal, 2. Alapvető dolgok, 3. Felfedezés stb.).

Kérjük, hogy fordítását ebben a sorrendben végezze (1 → 2 → 3 → ⋯), hogy a legfontosabb oldalak készüljenek el először.

[Tudjon meg többet az ethereum.org tartalommappáiról](/contributing/translation-program/content-buckets/)

### Fordítsás {#translate}

Miután kiválasztotta a fordítani kívánt fájlt, az megnyílik az online szerkesztőben. Ha még nem használta a Crowdin-t korábban, ez az útmutató bemutatja az alapvető dolgokat.

![A Crowdin online szerkesztője](./online-editor.png)

**_1 – Bal oldali menü_**

- Nincs lefordítva (piros) – olyan szöveg, amelyet még nem fordítottak le. Ezekkel a sztringekkel kell foglalkoznia.
- Le van fordítva (zöld) – ezeket a szövegeket már lefordították, de még nem lettek átnézve. Ezekhez javasolhat alternatív megoldásokat, vagy szavazhat a meglévőkre a szerkesztő + és - gombjaival.
- Jóváhagyott (pipa) – olyan szöveg, melyet átnéztek és már élőben látható a honlapon.

A tetején található keresőben specifikus sztringeket is kereshet, illetve tud státusz alapján szűrni vagy átállítani a nézetet.

**_2 – Szerkesztői terület_**

A fő fordítási terület – a forrásszöveg felül jelenik meg, a releváns szövegkörnyezettel és képernyőképekkel, ha azok rendelkezésre állnak. A fordítás beviteléhez írja a szöveget az „Ide írja a fordítást” (Enter translation here) mezőbe és mentsen.

A sztring meglévő fordításait és más nyelvekre való átültetését is itt láthatja, továbbá a fordítási memória találatai és a gépi fordítás javaslatai is itt jelennek meg.

**_3 – Jobb oldali menü_**

Itt találhatók a kommentek, a fordítási memória találatai és a szószedet tételei. Az alapnézet a kommenteket mutatja, ahol a fordítók kommunikálhatnak, jelezhetik a problémákat vagy a helytelen fordításokat.

A tetején lévő gombokkal átválthat a fordítási memóriára, ahol a meglévő fordításokat találja, vagy megnézheti a szószedetet, mely a kulcsfogalmak definícióit és sztenderd fordításait mutatja.

Szeretne többet megtudni? Tekintse meg a [dokumentációt a Crowdin online szerkesztőről](https://support.crowdin.com/online-editor/)

### A fordítás átnézése {#review-process}

Miután befejezte a fordítást (a tartalommappa összes fájlja 100%-ot mutat), a professzionális fordítási szolgáltatás ellenőrzi (és javítja) a tartalmat. Az átnézés után (vagyis az átnézés is 100%-ot mutat), bekerül a fordítás a honlapra.

<InfoBanner shouldCenter emoji=":warning:">
  Ne használjon gépi fordítást, az nem elfogadott. Minden fordítást átnézünk, mielőtt felkerülne a honlapra. Ha a javasolt fordításról kiderül, hogy gép végezte, akkor azokat elvetjük, és a gépi fordítást használó közreműködőket eltávolítjuk a projektből.
</InfoBanner>

### Kapcsolatfevétel {#get-in-touch}

Kérdése van? Vagy szeretne együttműködni a csapatunkkal és más fordítókkal? Írjon nekünk a #translations csatornán az [ethereum.org Discord szerveren](/discord/)

Elérhet minket a translations@ethereum.org címen is

Köszönjük, hogy részt vesz az ethereum.org fordítási programban!
