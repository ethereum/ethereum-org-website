---
title: Slabá subjektivita
description: Vysvětlení slabé subjektivity a její role v PoS Ethereu.
lang: cs
---

Subjektivita v blockchainech označuje spoléhání se na sociální informace za účelem dohody na aktuálním stavu. Může existovat více platných větví, ze kterých se vybírá podle informací získaných od ostatních peerů v síti. Opakem je objektivita, která se vztahuje na řetězce, kde existuje pouze jeden možný platný řetězec, na kterém se nutně shodnou všechny uzly použitím svých zakódovaných pravidel. Existuje také třetí stav, známý jako slabá subjektivita. Tento se vztahuje na řetězec, který může objektivně postupovat poté, co je sociálně získán určitý počáteční základ informací.

## Předpoklady {#prerequisites}

Abyste porozuměli této stránce, je nutné nejprve pochopit základy [důkazu podílem](/developers/docs/consensus-mechanisms/pos/).

## Jaké problémy řeší slabá subjektivita? {#problems-ws-solves}

Subjektivita je přirozenou součástí blockchainů s důkazem podílem, protože výběr správného řetězce z několika větví se provádí sčítáním historických hlasů. Tím je blockchain vystaven několika vektorům útoku, včetně útoků na dálku (long-range attacks), při kterých uzly, které se účastnily velmi brzy v řetězci, udržují alternativní větev, kterou zveřejní mnohem později ve svůj vlastní prospěch. Alternativně, pokud 33 % validátorů vybere svůj vklad, ale bude pokračovat v potvrzování a vytváření bloků, mohou vygenerovat alternativní větev, která je v konfliktu s kanonickým řetězcem. Nové uzly nebo uzly, které byly dlouho offline, si nemusí být vědomy, že tito útočící validátoři vybrali své prostředky, takže by je útočníci mohli oklamat, aby sledovaly nesprávný řetězec. Ethereum může tyto vektory útoku vyřešit zavedením omezení, která omezují subjektivní aspekty mechanismu – a tedy i předpoklady důvěry – na naprosté minimum.

## Kontrolní body slabé subjektivity {#ws-checkpoints}

Slabá subjektivita je implementována v Ethereu s důkazem podílem pomocí „kontrolních bodů slabé subjektivity“. Jedná se o kořeny stavu, na kterých se všechny uzly v síti shodnou, že patří do kanonického řetězce. Slouží ke stejnému účelu „univerzální pravdy“ jako genesis bloky, až na to, že se nenacházejí na genesis pozici v blockchainu. Algoritmus pro výběr větve důvěřuje, že stav blockchainu definovaný v tomto kontrolním bodě je správný a že nezávisle a objektivně ověřuje řetězec od tohoto bodu dále. Kontrolní body fungují jako „limity pro vrácení zpět“, protože bloky umístěné před kontrolními body slabé subjektivity nelze změnit. Tím se narušují útoky na dálku jednoduše tím, že se větve vytvořené útoky na dálku definují jako neplatné v rámci návrhu mechanismu. Zajištění toho, aby kontrolní body slabé subjektivity byly odděleny menší vzdáleností než období pro výběr validátora, zajišťuje, že validátor, který větví řetězec, bude potrestán („slashed“) alespoň o nějakou prahovou částku, než bude moci vybrat svůj vklad, a že noví účastníci nemohou být podvedeni k tomu, aby se připojili k nesprávným větvím validátorů, jejichž vklad byl vybrán.

## Rozdíl mezi kontrolními body slabé subjektivity a finalizovanými bloky {#difference-between-ws-and-finalized-blocks}

Finalizované bloky a kontrolní body slabé subjektivity jsou uzly Etherea zpracovávány odlišně. Pokud se uzel dozví o dvou konkurenčních finalizovaných blocích, je mezi nimi rozpolcen – nemá žádný způsob, jak automaticky identifikovat, která je kanonická větev. To je příznakem selhání konsensu. Naproti tomu uzel jednoduše odmítne jakýkoli blok, který je v konfliktu s jeho kontrolním bodem slabé subjektivity. Z pohledu uzlu představuje kontrolní bod slabé subjektivity absolutní pravdu, kterou nelze podkopat novými znalostmi od ostatních peerů.

## Jak slabá je slabá? {#how-weak-is-weak}

Subjektivním aspektem důkazu podílem Etherea je požadavek na nedávný stav (kontrolní bod slabé subjektivity) z důvěryhodného zdroje, ze kterého se má synchronizovat. Riziko získání špatného kontrolního bodu slabé subjektivity je velmi nízké, protože je lze zkontrolovat oproti několika nezávislým veřejným zdrojům, jako jsou prohlížeče bloků nebo více uzlů. Nicméně pro spuštění jakékoli softwarové aplikace je vždy nutná určitá míra důvěry, například důvěra v to, že vývojáři softwaru vytvořili poctivý software.

Kontrolní bod slabé subjektivity může být dokonce součástí klientského softwaru. Pravděpodobně může útočník poškodit kontrolní bod v softwaru a stejně tak snadno může poškodit i samotný software. Neexistuje žádná skutečná kryptoekonomická cesta, jak tento problém obejít, ale dopad nedůvěryhodných vývojářů je v Ethereu minimalizován tím, že existuje několik nezávislých klientských týmů, z nichž každý vytváří ekvivalentní software v různých jazycích, a všechny mají vlastní zájem na udržení poctivého řetězce. Prohlížeče bloků mohou také poskytovat kontrolní body slabé subjektivity nebo způsob, jak křížově ověřit kontrolní body získané odjinud oproti dalšímu zdroji.

Nakonec lze kontrolní body vyžádat od jiných uzlů; například jiný uživatel Etherea, který provozuje plný uzel, může poskytnout kontrolní bod, který pak mohou validátoři ověřit oproti datům z prohlížeče bloků. Celkově lze říci, že důvěra v poskytovatele kontrolního bodu slabé subjektivity může být považována za stejně problematickou jako důvěra v klientské vývojáře. Celková požadovaná důvěra je nízká. Je důležité si uvědomit, že tyto úvahy se stávají důležitými pouze ve velmi nepravděpodobném případě, že se většina validátorů spikne a vytvoří alternativní větev blockchainu. Za jakýchkoli jiných okolností existuje pouze jeden řetězec Etherea, ze kterého lze vybírat.

## Další čtení {#further-reading}

- [Slabá subjektivita v Eth2](https://notes.ethereum.org/@adiasg/weak-subjectvity-eth2)
- [Vitalik: Jak jsem se naučil milovat slabou subjektivitu](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/)
- [Slabá subjektivita (dokumentace Teku)](https://docs.teku.consensys.io/concepts/weak-subjectivity)
- [Příručka ke slabé subjektivitě Fáze 0](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/weak-subjectivity.md)
- [Analýza slabé subjektivity v Ethereu 2.0](https://github.com/runtimeverification/beacon-chain-verification/blob/master/weak-subjectivity/weak-subjectivity-analysis.pdf)
