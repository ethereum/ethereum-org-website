---
title: Verkle stromy
description: Obecný popis Verkle stromů a toho, jak budou použity k aktualizaci Etherea
lang: cs
summaryPoints:
  - Zjistěte, co jsou Verkle stromy
  - Přečtěte si, proč jsou Verkle stromy užitečnou aktualizací pro Ethereum
---

Verkle stromy (složenina z „vektorový závazek“ (Vector commitment) a „Merkleův strom“ (Merkle tree)) jsou datová struktura, kterou lze použít k aktualizaci uzlů [Etherea](/) tak, aby mohly přestat ukládat velké množství stavových dat, aniž by ztratily schopnost validovat bloky.

## Bezstavovost {#statelessness}

Verkle stromy jsou kritickým krokem na cestě k bezstavovým klientům Etherea. Bezstavoví klienti jsou ti, kteří nemusí ukládat celou stavovou databázi, aby mohli validovat příchozí bloky. Místo použití vlastní lokální kopie stavu Etherea k ověření bloků používají bezstavoví klienti „svědka“ stavových dat, který dorazí s blokem. Svědek je sbírka jednotlivých částí stavových dat, které jsou nutné k provedení určité sady transakcí, a kryptografický důkaz, že svědek je skutečně součástí úplných dat. Svědek se používá _místo_ stavové databáze. Aby to fungovalo, musí být svědci velmi malí, aby mohli být bezpečně vysíláni po síti včas, aby je validátoři stihli zpracovat během 12sekundového slotu. Současná struktura stavových dat není vhodná, protože svědci jsou příliš velcí. Verkle stromy tento problém řeší tím, že umožňují malé svědky, čímž odstraňují jednu z hlavních překážek pro bezstavové klienty.

<ExpandableCard title="Proč chceme bezstavové klienty?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

Klienti Etherea v současnosti používají k ukládání svých stavových dat datovou strukturu známou jako Patricia Merkle Trie. Informace o jednotlivých účtech jsou uloženy jako listy v trii a páry listů jsou opakovaně hashovány, dokud nezůstane pouze jediný hash. Tento konečný hash je známý jako „kořen“ (root). K ověření bloků klienti Etherea provedou všechny transakce v bloku a aktualizují svou lokální stavovou trii. Blok je považován za platný, pokud je kořen lokálního stromu identický s tím, který poskytl navrhovatel bloku, protože jakékoli rozdíly ve výpočtu provedeném navrhovatelem bloku a validujícím uzlem by způsobily, že by se kořenový hash zcela lišil. Problém s tímto přístupem je, že ověřování blockchainu vyžaduje, aby každý klient ukládal celou stavovou trii pro hlavní blok (head block) a několik historických bloků (výchozí nastavení v Geth je uchovávat stavová data pro 128 bloků za hlavním blokem). To vyžaduje, aby klienti měli přístup k velkému množství diskového prostoru, což je překážkou pro provozování plných uzlů na levném hardwaru s nízkým výkonem. Řešením je aktualizovat stavovou trii na efektivnější strukturu (Verkle strom), kterou lze shrnout pomocí malého „svědka“ dat, jenž může být sdílen místo úplných stavových dat. Přeformátování stavových dat do Verkle stromu je odrazovým můstkem pro přechod na bezstavové klienty.

</ExpandableCard>

## Co je to svědek a proč je potřebujeme? {#what-is-a-witness}

Ověření bloku znamená opětovné provedení transakcí obsažených v bloku, aplikování změn na stavovou trii Etherea a výpočet nového kořenového hashe. Ověřený blok je takový, jehož vypočítaný kořenový hash stavu je stejný jako ten, který byl poskytnut s blokem (protože to znamená, že navrhovatel bloku skutečně provedl výpočet, o kterém tvrdí, že jej provedl). V dnešních klientech Etherea vyžaduje aktualizace stavu přístup k celé stavové trii, což je velká datová struktura, která musí být uložena lokálně. Svědek obsahuje pouze fragmenty stavových dat, které jsou nutné k provedení transakcí v bloku. Validátor pak může použít pouze tyto fragmenty k ověření, že navrhovatel bloku provedl transakce bloku a správně aktualizoval stav. To však znamená, že svědek musí být přenášen mezi peery v síti Ethereum dostatečně rychle, aby jej každý uzel bezpečně přijal a zpracoval během 12sekundového slotu. Pokud je svědek příliš velký, může některým uzlům trvat příliš dlouho, než si jej stáhnou a udrží krok s řetězcem. To je centralizační síla, protože to znamená, že se na validaci bloků mohou podílet pouze uzly s rychlým připojením k internetu. S Verkle stromy není nutné mít stav uložený na pevném disku; _vše_, co potřebujete k ověření bloku, je obsaženo v samotném bloku. Bohužel, svědci, které lze vytvořit z Merkleových trií, jsou příliš velcí na to, aby podporovali bezstavové klienty.

## Proč Verkle stromy umožňují menší svědky? {#why-do-verkle-trees-enable-smaller-witnesses}

Struktura Merkleovy trie způsobuje, že velikosti svědků jsou velmi velké – příliš velké na to, aby mohly být bezpečně vysílány mezi peery během 12sekundového slotu. Je to proto, že svědek je cesta spojující data, která jsou uložena v listech, s kořenovým hashem. K ověření dat je nutné mít nejen všechny mezilehlé hashe, které spojují každý list s kořenem, ale také všechny „sourozenecké“ uzly. Každý uzel v důkazu má sourozence, se kterým je hashován, aby se vytvořil další hash výše v trii. To je spousta dat. Verkle stromy snižují velikost svědka zkrácením vzdálenosti mezi listy stromu a jeho kořenem a také eliminací potřeby poskytovat sourozenecké uzly pro ověření kořenového hashe. Ještě větší prostorové efektivity bude dosaženo použitím výkonného schématu polynomiálního závazku (polynomial commitment) namísto vektorového závazku založeného na hashi. Polynomiální závazek umožňuje, aby měl svědek pevnou velikost bez ohledu na počet listů, které dokazuje.

V rámci schématu polynomiálního závazku mají svědci zvládnutelné velikosti, které lze snadno přenášet v peer-to-peer síti. To umožňuje klientům ověřovat změny stavu v každém bloku s minimálním množstvím dat.

<ExpandableCard title="O kolik přesně mohou Verkle stromy zmenšit velikost svědka?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

Velikost svědka se liší v závislosti na počtu listů, které obsahuje. Za předpokladu, že svědek pokrývá 1000 listů, svědek pro Merkleovu trii by měl asi 3,5 MB (za předpokladu 7 úrovní trie). Svědek pro stejná data ve Verkle stromu (za předpokladu 4 úrovní stromu) by měl asi 150 kB – **asi 23x méně**. Toto zmenšení velikosti svědka umožní, aby byli svědci bezstavových klientů přijatelně malí. Polynomiální svědci mají velikost 0,128–1 kB v závislosti na tom, jaký konkrétní polynomiální závazek je použit.

</ExpandableCard>

## Jaká je struktura Verkle stromu? {#what-is-the-structure-of-a-verkle-tree}

Verkle stromy jsou páry `(key,value)`, kde klíče jsou 32bajtové prvky složené z 31bajtového _kmene_ (stem) a jednobajtové _přípony_ (suffix). Tyto klíče jsou organizovány do _rozšiřujících_ (extension) uzlů a _vnitřních_ (inner) uzlů. Rozšiřující uzly představují jeden kmen pro 256 potomků s různými příponami. Vnitřní uzly mají také 256 potomků, ale mohou to být další rozšiřující uzly. Hlavní rozdíl mezi strukturou Verkle stromu a Merkleova stromu spočívá v tom, že Verkle strom je mnohem plošší, což znamená, že existuje méně mezilehlých uzlů spojujících list s kořenem, a proto je ke generování důkazu potřeba méně dat.

![Diagram of a Verkle tree data structure](./verkle.png)

[Přečtěte si více o struktuře Verkle stromů](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## Současný pokrok {#current-progress}

Testnety Verkle stromů jsou již v provozu, ale stále existují podstatné nevyřízené aktualizace klientů, které jsou nutné pro podporu Verkle stromů. Pokrok můžete pomoci urychlit nasazením kontraktů na testnety nebo spuštěním testnetových klientů.

[Podívejte se, jak Guillaume Ballet vysvětluje testnet Condrieu Verkle](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (všimněte si, že testnet Condrieu byl důkaz prací (PoW) a nyní byl nahrazen testnetem Verkle Gen Devnet 6).

## Další čtení {#further-reading}

- [Verkle stromy pro bezstavovost](https://verkle.info/)
- [Dankrad Feist vysvětluje Verkle stromy na PEEPanEIP](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Verkle stromy pro nás ostatní](https://web.archive.org/web/20250124132255/https://research.2077.xyz/verkle-trees)
- [Anatomie Verkle důkazu](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
- [Guillaume Ballet vysvětluje Verkle stromy na ETHGlobal](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- [„Jak Verkle stromy dělají Ethereum štíhlým a efektivním“ od Guillauma Balleta na Devcon 6](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam o bezstavových klientech z ETHDenver 2020](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Feist vysvětluje Verkle stromy a bezstavovost v podcastu Zero Knowledge](https://zeroknowledge.fm/podcast/202/)
- [Vitalik Buterin o Verkle stromech](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist o Verkle stromech](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [Dokumentace EIP k Verkle stromům](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)