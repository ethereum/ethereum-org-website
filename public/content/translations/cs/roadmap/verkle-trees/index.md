---
title: Verkle stromy
description: Vysoce úrovňový popis Verkle trees a jejich budoucí použití k vylepšení Ethereum
lang: cs
summaryPoints:
  - Zjistěte, co jsou Verkle trees
  - Přečtěte si, proč jsou Verkle trees užitečným vylepšením Etherea
---

# Verkle stromy {#verkle-trees}

Verkle trees (sloučenina termínů „Vector commitment“ a „Merkle Trees“) jsou datová struktura, která může být použita k vylepšení uzlů na Ethereu tak, aby už nemusely ukládat velké množství stavových dat, aniž by ztratily schopnost ověřovat bloky.

## Bezstavovost {#statelessness}

Verkle trees jsou klíčovým krokem na cestě k bezstavovým klientům na Ethereu. Bezstavové klienty jsou takové, které nemusí uchovávat celou stavovou databázi, aby mohly ověřovat příchozí bloky. Místo používání vlastní lokální kopie stavových dat Etherea používají bezstavové klienty k ověření bloků „svědka“ stavových dat, který je doručen společně s blokem. Svědek je soubor jednotlivých částí stavových dat, které jsou potřeba k provedení konkrétní sady transakcí, a kryptografický důkaz, že je svědek skutečně součástí úplných dat. Svědek je používán _místo_ stavové databáze. Svědci musí být dostatečně malí, aby mohli být bezpečně vysíláni po síti včas na zpracování validátory během 12sekundového slotu, jinak to nebude fungovat. Současná struktura stavových dat není vhodná, protože svědci jsou příliš velcí. Verkle trees tento problém řeší tím, že umožňují malé svědky, což odstraňuje jednu z hlavních překážek pro bezstavové klienty.

<ExpandableCard title="Proč chceme bezstavové klienty?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

Klienty na Ethereu v současnosti používají pro ukládání stavových dat datovou strukturu známou jako Patricia Merkle Trie. Informace o jednotlivých účtech jsou uloženy jako listy v trie a páry listů jsou opakovaně hashovány, dokud nezůstane pouze jeden hash. Tento konečný hash je známý jako „kořen“. K ověření bloků provádějí klienty na Ethereu všechny transakce v bloku a aktualizují svůj lokální stavový trie. Blok je považován za platný, pokud je kořen lokálního stromu identický s tím, který poskytl navrhovatel bloku, protože jakékoli rozdíly ve výpočtu mezi navrhovatelem bloku a validačním uzlem by způsobily, že hash kořene by byl úplně jiný. Problém je v tom, že ověřování blockchainu vyžaduje, aby každý klient uchovával celý stavový trie pro hlavičkový blok a několik historických bloků (výchozí nastavení v Gethu je uchovávat stavová data pro 128 bloků za hlavičkou). To vyžaduje, aby klienty měly na disku velké množství místa, což je překážka pro spuštění plných uzlů na levném hardwaru s malým výkonem. Řešením je aktualizovat stavový trie na efektivnější strukturu (Verkle tree), která může být přiřazena pomocí malého „svědka“ k datům, která mohou být sdílena místo plných stavových dat. Přeformátování stavových dat do Verkle tree je krokem k přechodu na bezstavové klienty.

</ExpandableCard>

## Co je svědek a proč ho potřebujeme? {#what-is-a-witness}

Ověření bloku znamená opětovné provedení transakcí obsažených v bloku, aplikování změn na stavový trie Etherea a výpočet nového hashe kořene. Ověřený blok je ten, jehož vypočítaný stav hashe kořene je stejný jako ten, který byl poskytnut s blokem (protože to znamená, že navrhovatel bloku skutečně provedl výpočty, které tvrdí, že provedl). Po klientech Ethereum v současné době vyžaduje přístup k celému stavovému trie, což je velká datová struktura, která musí být uchovávána lokálně. Svědek obsahuje pouze fragmenty stavových dat potřebné k realizaci transakcí v bloku. Validátor může k ověření, že navrhovatel bloku správně provedl transakce v bloku a aktualizoval stav, použít pouze tyto fragmenty. To však znamená, že svědek musí být přenášen mezi síťovými uzly na Ethereu dostatečně rychle, aby byl přijat a zpracován každým jedním uzlem bezpečně během 12sekundového slotu. Pokud je svědek příliš velký, může trvat některým uzlům příliš dlouho, než si jej stáhnou a udrží se aktuální s řetězcem. To je centralizující prvek, protože to znamená, že pouze uzly s rychlým internetovým připojením mohou účinně ověřovat bloky. S Verkle trees není potřeba mít stav uložený na pevném disku. _Vše_, co potřebujete k ověření bloku, je obsaženo přímo v bloku. Bohužel, svědci, které lze vyprodukovat z Merkle trie, jsou příliš velcí na to, aby podporovali bezstavové klienty.

## Proč Verkle trees umožňují menší svědky? {#why-do-verkle-trees-enable-smaller-witnesses}

Struktura Merkle trie umožňuje nastavit velikost svědků velkou – až moc velkou na to, aby byla bezpečně vysílána mezi síťovými uzly během 12sekundového slotu. Důvodem je, že svědek je cesta spojující data, která jsou uložena v listech, s kořenovým hashem. K ověření dat je třeba mít nejen všechny mezičlánkové hashe, které spojují každý list s kořenem, ale také všechny „sourozenecké“ uzly. Každý uzel zapojený do důkazu má sourozence, který je hashován s ním, aby vytvořil další hash o úroveň výše v trie. To je spousta dat. Verkle trees zmenšují velikost svědka zkrácením vzdálenosti mezi listy stromu a jeho kořenem a také eliminací potřeby poskytovat sourozenecké uzly pro ověření hashe kořene. Ještě větší efektivnosti prostoru lze dosáhnout použitím silného polynomiálního závazkového schématu namísto hashového vektorového závazku. Polynomiální závazek umožňuje svědkovi zachovávat stejnou velikost bez ohledu na počet listů, které prokazuje.

Podle polynomiálního závazkového schématu mají svědci spravovatelné velikosti, které lze snadno přenášet po peer-to-peer síti. To umožňuje klientům ověřovat změny stavu v každém bloku s minimálním množstvím dat.

<ExpandableCard title="O kolik přesně mohou Verkle trees zmenšit velikost svědka?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

Velikost svědka se liší v závislosti na počtu listů, které zahrnuje. Předpokládáme-li, že svědek pokrývá 1 000 listů, svědek pro Merkle trie by byl přibližně 3,5 MB (při předpokladu 7 úrovní v trie). Svědek pro stejná data ve Verkle tree (při předpokladu 4 úrovní ve stromě) by byl přibližně 150 kB – **přibližně 23x menší**. Tato redukce velikosti svědka umožňuje přijatelnou velikost svědků bezstavových klientů. Polynomiální svědci jsou velikosti 0,128–1 kB v závislosti na konkrétním polynomiálním závazku.

</ExpandableCard>

## Jaká je struktura Verkle tree? {#what-is-the-structure-of-a-verkle-tree}

Verkle trees jsou `(key, value)`, tedy páry klíč-hodnota, kde klíče jsou 32bajtové prvky složené z 31bajtového _kmene_ a jednoho bajtu _přípony_. Tyto klíče jsou uspořádány do uzlů _prodloužení_ a _vnitřních_ uzlů. Uzly prodloužení představují jediný kmen pro 256 dětí s různými příponami. Vnitřní uzly mají také 256 dětí, ale mohou to být jiné uzly prodloužení. Hlavní rozdíl mezi strukturou Verkle tree a Merkle tree je v tom, že Verkle tree je mnohem plošší, což znamená, že v něm je méně mezičlánkových uzlů spojujících list s kořenem, a tedy je méně dat potřeba k vytvoření důkazu.

![](./verkle.png)

[Další informace o struktuře Verkle trees](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## Aktuální průběh {#current-progress}

Testovací sítě Verkle tree jsou již v provozu, ale vyžadují značné aktualizace klientů, které podporují Verkle stromy. I vy můžete pomoci urychlit tento vývoj tím, že spustíte své kontrakty na testnetech nebo spustíte testnetové klienty.

[Prozkoumejte testovací síť Verkle Gen Devnet 6](https://verkle-gen-devnet-6.ethpandaops.io/)

[Sledujte, jak Guillaume Ballet vysvětluje testovací síť Condrieu Verkle](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (poznámka: testovací síť Condrieu byla důkaz prací a nyní byla nahrazena testovací sítí Verkle Gen Devnet 6).

## Další informace {#further-reading}

- [Verkle trees pro bezstavovost](https://verkle.info/)
- [Dankrad Feist vysvětluje Verkle trees na PEEPanEIP](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Guillaume Ballet vysvětluje Verkle trees na ETHGlobal](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- [„Jak Verkle trees činí Ethereum štíhlejším a efektivnějším“ od Guillauma Balleta na Devconu 6](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam o bezstavových klientech z ETHDenver 2020](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Feist vysvětluje Verkle trees a bezstavovost v podcastu Zero Knowledge](https://zeroknowledge.fm/episode-202-stateless-ethereum-verkle-tries-with-dankrad-feist/)
- [Vitalik Buterin o Verkle trees](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist o Verkle trees](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [Dokumentace k EIP Verkle trees](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)
