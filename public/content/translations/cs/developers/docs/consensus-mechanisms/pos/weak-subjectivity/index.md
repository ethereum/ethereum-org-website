---
title: "Slabá subjektivita"
description: "Vysvětlení slabé subjektivity a její role v Ethereu s důkazem podílem (PoS)."
lang: cs
---

Subjektivita v blockchainech označuje spoléhání se na sociální informace za účelem shody na aktuálním stavu. Může existovat několik platných forků, ze kterých se vybírá podle informací shromážděných od ostatních účastníků v síti. Opakem je objektivita, která se vztahuje na řetězce, kde existuje pouze jeden možný platný řetězec, na kterém se všechny uzly nutně shodnou uplatněním svých naprogramovaných pravidel. Existuje také třetí stav, známý jako slabá subjektivita. To se týká řetězce, který může objektivně postupovat poté, co je sociálně získána nějaká počáteční informace.

## Předpoklady {#prerequisites}

K pochopení této stránky je nutné nejprve porozumět základům [důkazu podílem (PoS)](/developers/docs/consensus-mechanisms/pos/).

## Jaké problémy řeší slabá subjektivita? {#problems-ws-solves}

Subjektivita je pro blockchainy s důkazem podílem přirozená, protože výběr správného řetězce z více forků se provádí počítáním historických hlasů. To vystavuje blockchain několika vektorům útoku, včetně útoků na velkou vzdálenost (long-range attacks), při kterých uzly, které se účastnily velmi brzy v řetězci, udržují alternativní fork, který zveřejní mnohem později ve svůj vlastní prospěch. Alternativně, pokud 33 % validátorů provede výběr svého staku, ale nadále atestuje a produkuje bloky, mohou vytvořit alternativní fork, který je v konfliktu s kanonickým řetězcem. Nové uzly nebo uzly, které byly dlouhou dobu offline, si nemusí být vědomy, že tito útočící validátoři vybrali své prostředky, takže by je útočníci mohli oklamat, aby sledovali nesprávný řetězec. [Ethereum](/) může tyto vektory útoku vyřešit zavedením omezení, která snižují subjektivní aspekty mechanismu – a tím i předpoklady důvěry – na absolutní minimum.

## Kontrolní body slabé subjektivity {#ws-checkpoints}

Slabá subjektivita je v Ethereu s důkazem podílem implementována pomocí „kontrolních bodů slabé subjektivity“. Jedná se o kořeny stavu, na kterých se všechny uzly v síti shodnou, že patří do kanonického řetězce. Slouží stejnému účelu „univerzální pravdy“ jako genesis bloky, s tím rozdílem, že se nenacházejí na počáteční (genesis) pozici v blockchainu. Algoritmus volby forku důvěřuje, že stav blockchainu definovaný v tomto kontrolním bodě je správný, a od tohoto bodu dále nezávisle a objektivně ověřuje řetězec. Kontrolní body fungují jako „limity pro zvrácení“, protože bloky nacházející se před kontrolními body slabé subjektivity nelze změnit. To podkopává útoky na velkou vzdálenost jednoduše tím, že v rámci návrhu mechanismu definuje forky na velkou vzdálenost jako neplatné. Zajištění toho, že kontrolní body slabé subjektivity jsou od sebe odděleny menší vzdáleností, než je doba pro výběr validátora, zaručuje, že validátor, který vytvoří fork řetězce, je penalizován alespoň určitou prahovou částkou předtím, než může vybrat svůj stake, a že noví účastníci nemohou být oklamáni a navedeni na nesprávné forky validátory, jejichž stake byl již vybrán.

## Rozdíl mezi kontrolními body slabé subjektivity a finalizovanými bloky {#difference-between-ws-and-finalized-blocks}

Uzly Etherea přistupují k finalizovaným blokům a kontrolním bodům slabé subjektivity odlišně. Pokud se uzel dozví o dvou konkurujících si finalizovaných blocích, je mezi nimi rozpolcen – nemá způsob, jak automaticky identifikovat, který z nich je kanonický fork. To je příznakem selhání konsensu. Naproti tomu uzel jednoduše odmítne jakýkoli blok, který je v konfliktu s jeho kontrolním bodem slabé subjektivity. Z pohledu uzlu představuje kontrolní bod slabé subjektivity absolutní pravdu, kterou nelze zpochybnit novými poznatky od ostatních účastníků sítě.

## Jak slabá je slabá? {#how-weak-is-weak}

Subjektivním aspektem důkazu podílem v Ethereu je požadavek na nedávný stav (kontrolní bod slabé subjektivity) z důvěryhodného zdroje, od kterého se provede synchronizace. Riziko získání špatného kontrolního bodu slabé subjektivity je velmi nízké, protože je lze zkontrolovat vůči několika nezávislým veřejným zdrojům, jako jsou prohlížeče bloků nebo více uzlů. Ke spuštění jakékoli softwarové aplikace je však vždy vyžadována určitá míra důvěry, například důvěra v to, že vývojáři softwaru vytvořili poctivý software.

Kontrolní bod slabé subjektivity může být dokonce součástí klientského softwaru. Lze namítnout, že útočník může poškodit kontrolní bod v softwaru a stejně snadno může poškodit i samotný software. Neexistuje žádná skutečná kryptoekonomická cesta, jak tento problém obejít, ale dopad nedůvěryhodných vývojářů je v Ethereu minimalizován tím, že existuje více nezávislých klientských týmů, z nichž každý vytváří ekvivalentní software v různých jazycích, a všechny mají osobní zájem na udržení poctivého řetězce. Prohlížeče bloků mohou také poskytovat kontrolní body slabé subjektivity nebo způsob, jak křížově ověřit kontrolní body získané odjinud vůči dalšímu zdroji.

Nakonec lze kontrolní body vyžádat od jiných uzlů; možná jiný uživatel Etherea, který provozuje plný uzel, může poskytnout kontrolní bod, který pak validátoři mohou ověřit vůči datům z prohlížeče bloků. Celkově lze důvěru v poskytovatele kontrolního bodu slabé subjektivity považovat za stejně problematickou jako důvěru ve vývojáře klienta. Celková požadovaná důvěra je nízká. Je důležité poznamenat, že tyto úvahy se stávají důležitými pouze ve velmi nepravděpodobném případě, že se většina validátorů spikne za účelem vytvoření alternativního forku blockchainu. Za jakýchkoli jiných okolností je na výběr pouze jeden řetězec Etherea.

## Další čtení {#further-reading}

- [Slabá subjektivita v Eth2](https://notes.ethereum.org/@adiasg/weak-subjectvity-eth2)
- [Vitalik: Jak jsem se naučil milovat slabou subjektivitu](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity)
- [Slabá subjektivita (dokumentace Teku)](https://docs.teku.consensys.io/concepts/weak-subjectivity)
- [Průvodce slabou subjektivitou ve Fázi 0](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/weak-subjectivity.md)
- [Analýza slabé subjektivity v Ethereu 2.0](https://github.com/runtimeverification/beacon-chain-verification/blob/master/weak-subjectivity/weak-subjectivity-analysis.pdf)