---
title: Staking, mint szolgáltatás
description: Egy áttekintő a pooled ETH staking elkezdéséről
lang: hu
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: Leslie, a rinocérosz a felhőkön lebeg.
sidebarDepth: 2
summaryPoints:
  - Az Ön validátorkliensét harmadik fél működteti csomópontok kezelésével
  - Kiváló lehetőség bárkinek, aki rendelkezik 32 ETH összeggel, de nem szívesen bajlódna a csomópont technikai komplexitásával
  - A bizalomigénye kevesebb, a visszavonási kulcsok az Ön saját felügyelete alatt állnak
---

## Mi az a letétbe helyezés mint szolgáltatás? {#what-is-staking-as-a-service}

A letétbe helyezés, mint szolgáltatás (SaaS) egy olyan lehetőség, amikor a felhasználó letétbe teszi a saját 32 ETH összegét, hogy validátort működtessen, de a csomópont üzemeltetését egy harmadik félre bízza. E folyamat során a felhasználót végigvezetik a kezdeti beállításokon, beleértve a kulcs létrehozását, a letét elhelyezését, majd az aláíró kulcsok feltöltését az operátornak. A szolgáltatás így a felhasználó nevében működteti a validátort, általában egy havi díjért cserébe.

## Miért jó a letéti szolgáltatás használata? {#why-stake-with-a-service}

Az Ethereum-protokoll eredendően nem támogatja a letétbe helyezés delegálását, így ezek a szolgáltatások képesek ellátni ezt az igényt. Ha Ön letétbe helyezne 32 ETH-t, de nem szeretne a hardveres részével foglalkozni, az SaaS lehetővé teszi, hogy ezt a részét átadja másnak, miközben részesül a blokkjutalmakból.

<CardGrid>
  <Card title="Saját validátor" emoji=":desktop_computer:" description="Deposit your own 32 ETH to activate your own set of signing keys that will participate in Ethereum consensus. Monitor your progress with dashboards to watch those ETH rewards accumulate." />
  <Card title="Könnyű kezdés" emoji="🏁" description="Forget about hardware specs, setup, node maintenance and upgrades. SaaS providers let you outsource the hard part by uploading your own signing credentials, allowing them to run a validator on your behalf, for a small cost." />
  <Card title="Behatárolt kockázat" emoji=":shield:" description="In many cases users do not have to give up access to the keys that enable withdrawing or transferring staked funds. These are different from the signing keys, and can be stored separately to limit (but not eliminate) your risk as a staker." />
</CardGrid>

<StakingComparison page="saas" />

## Mit kell figyelembe venni {#what-to-consider}

Az SaaS szolgáltatók száma egyre növekszik, ugyanakkor mind saját előnnyel és kockázattal bír. Az önálló stakinghez képest ezek az opciók mind extra bizalmat igényelnek. Az SaaS opciók rendelkezhetnek olyan hozzáadott programkóddal, melybe az Ethereum-klienst csomagolják, ami nem nyilvános vagy auditálható. Emellett negatív hatást gyakorolnak a hálózat decentralizálására. A beállítások függvényében Ön talán nem is bír kontrollal a validátora felett – az operátor rosszhiszeműen is eljárhat az Ön ETH-ját használva fel.

Alább különböző jellemzők mentén mutatjuk be a jelentős erősségeket vagy gyengeségeket, melyekkel a listázott SaaS szolgáltatók rendelkezhetnek. Ez alapján Ön is megértheti, hogy e jellemzőket hogyan határoztuk meg, és így könnyebben választhat a szolgáltatók közül.

<StakingConsiderations page="saas" />

## Fedezze fel, hogy kik nyújtanak letétbe helyezési szolgáltatást {#saas-providers}

Néhány elérhető SaaS-szolgáltatót soroltunk fel alább. A fenti jellemzőket használva megértheti az alábbi szolgáltatásokban rejlő lehetőségeket

<ProductDisclaimer />

### SaaS-szolgáltatók

<StakingProductsCardGrid category="saas" />

Olyan szolgáltatót válasszon, aki támogatja a [kisebbségi klienseket](/developers/docs/nodes-and-clients/client-diversity/), mert ez egyszerre javítja a hálózat biztonságát, és csökkenti az Ön kockázatát. Azok a szolgáltatók, akik korlátozzák a többségi klienseket használatát, a következő jellemzők alapján szűrhetők ki: <em style={{ textTransform: "uppercase" }}>végrehajtási kliens sokrétűsége</em> és <em style={{ textTransform: "uppercase" }}>konszenzusos kliens sokrétűgése</em>

### Kulcsgenerátorok

<StakingProductsCardGrid category="keyGen" />

Javasolna olyan SaaS-szolgáltatót, akit nem lát felsorolva? Ha a [terméklistázó szabályzat](/contributing/adding-staking-products/) alapján úgy véli, hogy egy adott eszköz illeszkedne ide, akkor jelezze felénk.

## Gyakran ismételt kérdések {#faq}

<ExpandableCard title="Kinél vannak a kulcsaim?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Minden szolgáltatónál más elrendezés lehetséges, de általában végigvezetik a felhasználót az aláíró kulcsok létrehozásán (minden 32 ETH esetén egy kulcs), és feltöltik ezeket a szolgáltatónak, hogy a felhasználó nevében validáljon. Az aláíró kulcsok magukban nem teszik lehetővé, hogy a pénzeszközöket visszavonják, átutalják vagy elköltsék. Ugyanakkor lehetőséget adnak arra, hogy a konszenzust elősegítsék szavazással, amit ha nem végeznek megfelelően, akkor az kisebb büntetést vagy súlyos büntetéssel egybekötött kizárást von maga után.
</ExpandableCard>

<ExpandableCard title="Tehát kétféle kulcs van?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Igen. Minden számla tartalmaz BLS <em>aláírási</em> kulcsokat és BLS <em>visszavonási</em> kulcsokat. Annak érdekében, hogy egy validátor tanúsítani tudja a lánc státuszát, részt vehessen a szinkronizációs bizottságokban és blokkot javasoljon, az aláíró kulcsokat elérhetővé kell tenni a validátorkliensben. Valamilyen formában az internethez kell kapcsolódnia, ezért ezeket „forró” kulcsoknak tekinthetjük (online elérhetők). A validátor csak így tud tanúsításokat készíteni, ezért biztonsági okokból az a kulcs külön áll, amelyikkel a pénzeszközöket lehet átutalni vagy visszavonni.

A BLS visszavonási kulcsok arra valók, hogy egy egyszeri üzenetet írjanak alá, melyik végrehajtási számlára kerüljön a letéti jutalom és a visszavont pénzeszköz. Amint ez az üzenet érvénybe lép, a <em>BLS visszavonási</em> kulcsokra többé nincs szükség. A kulcsok helyett a megadott cím gyakorol kontrollt a visszavont eszközök felett. Még ha valaki más is kontrollálja az aláíró kulcsokat, a visszavonási cím biztonságban van a felhasználó offline tárhelyén (cold storage), ami minimalizálja a validátor-pénzeszközök elvesztését.

A visszavonási adatok megadása szükséges ahhoz, hogy a visszavonás lehetséges legyen\*. Ehhez létre kell hozni a visszavonási kulcsokat a felhasználó mnemonikus kulcsmondata segítségével.

<strong>Ezt a kulcsmondatot mindig tartsa biztonságban, különben nem lesz képes létrehozni a visszavonási kulcsokat, amikor szükség lenne azokra.</strong>

\*Azoknak a letéteseknek, akik már megadták a visszavonási címüket a folyamat kezdetén, nem kell ezt beállítani. Ellenőrizze az SaaS-szolgáltatójával, hogy hogyan kell a validátort beállítani.
</ExpandableCard>

<ExpandableCard title="Mikor vonhatom vissza a letétet?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
A letétek visszavonása a Shanghai/Capella frissítéssel vált elérhetővé 2023. áprilisban. A letéteseknek meg kell adniuk egy visszavonási címet (ha nem adták meg azt a letét kezdetekor), és a jutalmak automatikusan kiküldésre kerülnek néhány naponta.

A validátorok ki is léphetnek a funkciójukból, ami felszabadítja a fennálló ETH-összeget a visszavonáshoz. Azok a számlák, amelyek megadták a visszavonási címet és teljesítették a kilépési folyamatot, a teljes egyenleget megkapják az adott címre a következő validátor-ellenőrzésnél.

<ButtonLink href="/staking/withdrawals/">Bővebben a letétbe helyezés visszavonásáról</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Mi történik, ha súlyos büntetést kapok (slashing)?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Az SaaS-szolgáltatóval a felhasználó másra bízza a csomópontok üzemeltetését. Ez magába foglalja a gyenge csomópont-teljesítmény kockázatát, mivel az nem a felhasználó irányítása alá esik. Ha a validátor súlyos büntetést kap (slashing), akkor a validátor egyenlegéből elvonnak és kizárják a validálásból.

A büntetés végrehajtása után a megmaradt pénzeszközök a validátor visszavonási címére kerülnek. Ehhez szükség van egy visszavonási címre. Előfordulhat, hogy ezt a letétbe helyezéskor már megadta. Ha nem, akkor a validátor-visszavonási kulcsokkal lehet aláírni egy üzenetet, amely közli a visszavonási címet. A pénzeszközök zárolva maradnak addig, amíg a visszavonási cím nem elérhető.

Kérdezze meg az SaaS-szolgáltatóját a lehetséges garanciákról vagy biztosításokról, illetve arról, hogyan lehet a visszavonási címet megadni. Ha Ön szeretné teljes mértékben kontrollálni a validátor-beállításokat, akkor <a href="/staking/solo/">ismerje meg az önálló letétbe helyezést</a>.
</ExpandableCard>

## További olvasnivaló {#further-reading}

- [Ethereum letétbe helyezési jegyzék](https://www.staking.directory/) – _Eridian és Spacesider_
- [A letétbe helyezési szolgáltatások értékelése](https://www.attestant.io/posts/evaluating-staking-services/) – _Jim McDonald 2020._
