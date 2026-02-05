---
title: Proof-of-authority (PoA)
description: Vysvětlení konsenzuálního protokolu proof-of-authority a jeho role v ekosystému blockchainu.
lang: cs
---

**Proof-of-authority (PoA)** je konsenzuální algoritmus založený na reputaci, který je upravenou verzí [důkazu podílem](/developers/docs/consensus-mechanisms/pos/). Většinou se používá na privátních řetězcích, testnetech a lokálních vývojových sítích. PoA je konsenzuální algoritmus založený na reputaci, který k vytváření bloků vyžaduje důvěru v sadu autorizovaných podepisovatelů, a to na rozdíl od mechanismu PoS založeného na podílu.

## Předpoklady {#prerequisites}

Abyste lépe porozuměli této stránce, doporučujeme vám si nejprve přečíst o [transakcích](/developers/docs/transactions/), [blocích](/developers/docs/blocks/) a [mechanismech konsenzu](/developers/docs/consensus-mechanisms/).

## Co je to proof-of-authority (PoA)? {#what-is-poa}

Proof-of-authority je upravená verze **[důkazu podílem](/developers/docs/consensus-mechanisms/pos/) (PoS)**, což je konsenzuální algoritmus založený na reputaci namísto mechanismu PoS založeného na podílu. Tento termín poprvé představil v roce 2017 Gavin Wood a tento konsenzuální algoritmus se většinou používá na privátních řetězcích, testnetech a lokálních vývojových sítích, jelikož překonává potřebu vysoce kvalitních zdrojů jako PoW a řeší problémy se škálovatelností u PoS tím, že pouze malá podmnožina uzlů ukládá blockchain a vytváří bloky.

Proof-of-authority vyžaduje důvěru v sadu autorizovaných podepisovatelů, kteří jsou definováni v [genesis bloku](/glossary/#genesis-block). Ve většině současných implementací si všichni autorizovaní podepisovatelé ponechávají stejnou moc a oprávnění při určování konsensu řetězce. Myšlenka stakování reputace je taková, že každý autorizovaný validátor je všem dobře známý, například prostřednictvím ověření klienta (KYC) nebo tím, že jediným validátorem je známá organizace. Tímto způsobem je v případě, že validátor udělá něco špatně, jeho identita známa.

Existuje několik implementací PoA, ale standardní implementací Etherea je **clique**, která implementuje [EIP-225](https://eips.ethereum.org/EIPS/eip-225). Clique je standard přívětivý pro vývojáře a snadno se implementuje, přičemž podporuje všechny typy synchronizace klientů. Mezi další implementace patří [IBFT 2.0](https://besu.hyperledger.org/private-networks/concepts/poa) a [Aura](https://openethereum.github.io/Chain-specification).

## Jak to funguje {#how-it-works}

V PoA je k vytváření nových bloků vybrána sada autorizovaných podepisovatelů. Podepisovatelé jsou vybíráni na základě své reputace a jsou jediní, kdo smí vytvářet nové bloky. Podepisovatelé jsou vybíráni cyklicky (způsobem round-robin) a každý podepisovatel smí vytvořit blok v určitém časovém rámci. Doba vytváření bloku je pevně daná a podepisovatelé musí vytvořit blok v tomto časovém rámci.

Reputace v tomto kontextu není kvantifikovatelná veličina, ale spíše reputace známých korporací, jako je Microsoft nebo Google. Z toho důvodu výběr důvěryhodných podepisovatelů není algoritmický, ale je to normální lidský akt _důvěry_. Když například entita jako Microsoft vytvoří privátní síť PoA pro stovky nebo tisíce startupů a sama se ujme role jediného důvěryhodného podepisovatele s možností v budoucnu přidat další známé podepisovatele, jako je Google, startupy by bezpochyby důvěřovaly společnosti Microsoft, že bude vždy jednat čestně, a síť by používaly. Tím se řeší nutnost stakovat v různých malých/soukromých sítích, které byly vytvořeny pro různé účely, aby zůstaly decentralizované a funkční, a zároveň se eliminuje potřeba těžařů, což spotřebovává velké množství energie a zdrojů. Některé privátní sítě, jako například VeChain, používají standard PoA v jeho původní podobě a některé ho upravují, jako například Binance, která používá [PoSA](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa), což je vlastní upravená verze PoA a PoS.

Hlasovací proces provádějí sami podepisovatelé. Každý podepisovatel hlasuje pro přidání nebo odebrání podepisovatele ve svém bloku, když vytváří nový blok. Uzly sečtou hlasy a podepisovatelé jsou přidáni nebo odebráni na základě toho, zda hlasy dosáhnou určitého prahu `SIGNER_LIMIT`.

Může nastat situace, kdy dojde k malým větvím. Obtížnost bloku závisí na tom, zda byl blok podepsán v pořadí, nebo mimo pořadí. Bloky „v pořadí“ mají obtížnost 2 a bloky „mimo pořadí“ mají obtížnost 1. V případě malých větví získá největší celkovou obtížnost a vyhraje ten řetězec, ve kterém většina podepisovatelů potvrzuje bloky „v pořadí“.

## Vektory útoku {#attack-vectors}

### Zlomyslní podepisovatelé {#malicious-signers}

Do seznamu podepisovatelů by mohl být přidán zlomyslný uživatel nebo by mohl být kompromitován podpisový klíč/stroj. V takovém scénáři se protokol musí být schopen bránit proti reorganizacím a spamování. Navrhovaným řešením je, že na seznamu N autorizovaných podepisovatelů může každý podepisovatel razit pouze 1 blok z každých K. To zajišťuje omezení škod a zbytek validátorů může zlomyslného uživatele odhlasovat.

### Cenzura {#censorship-attack}

Dalším zajímavým vektorem útoku je, když se podepisovatel (nebo skupina podepisovatelů) pokusí cenzurovat bloky, které hlasují o jejich odstranění ze seznamu autorizací. Aby se tomu předešlo, je povolená frekvence ražení bloků podepisovateli omezena na 1 z N/2. To zajišťuje, že zlomyslní podepisovatelé musí ovládat alespoň 51 % podepisovacích účtů. V takovém případě by se fakticky stali novým zdrojem pravdy pro řetězec.

### Spam {#spam-attack}

Dalším menším vektorem útoku je, když zlomyslní podepisovatelé vkládají nové návrhy na hlasování do každého bloku, který razí. Protože uzly musí sečíst všechny hlasy, aby vytvořily skutečný seznam autorizovaných podepisovatelů, musí v průběhu času zaznamenávat všechny hlasy. Bez omezení hlasovacího okna by tento počet mohl pomalu, ale neomezeně růst. Řešením je zavést _pohyblivé_ okno W bloků, po kterém jsou hlasy považovány za zastaralé. _Přiměřené okno může být 1–2 epochy._

### Souběžné bloky {#concurrent-blocks}

V síti PoA, kde je N autorizovaných podepisovatelů, smí každý podepisovatel razit 1 blok z K, což znamená, že v daném okamžiku smí razit blok N-K+1 validátorů. Aby se zabránilo tomu, že tito validátoři budou soutěžit o bloky, měl by každý podepisovatel přidat malý náhodný "offset" k času, kdy uvolní nový blok. Ačkoli tento proces zajišťuje, že malé větve jsou vzácné, občasné větve se stále mohou vyskytnout, stejně jako na hlavní síti. Pokud se zjistí, že podepisovatel zneužívá svou moc a způsobuje chaos, mohou ho ostatní podepisovatelé odhlasovat.

Pokud je například 10 autorizovaných podepisovatelů a každý podepisovatel smí vytvořit 1 blok z 20, pak v daném okamžiku může 11 validátorů vytvářet bloky. Aby se zabránilo tomu, že budou soutěžit o vytváření bloků, každý podepisovatel přidá malý náhodný "offset" k času, kdy uvolní nový blok. To snižuje výskyt malých větví, ale stále umožňuje občasné větve, jak je vidět na hlavní síti Etherea. Pokud podepisovatel zneužije svou autoritu a způsobí narušení, může být odhlasován ze sítě.

## Výhody a nevýhody {#pros-and-cons}

| Plusy                                                                                                                                                                         | Minusy                                                                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Škálovatelnější než jiné populární mechanismy jako PoS a PoW, protože je založen na omezeném počtu podepisovatelů bloků.                                      | Sítě PoA mají obvykle relativně malý počet ověřovacích uzlů. Díky tomu je síť PoA více centralizovaná.                                             |
| Provoz a údržba blockchainů PoA je neuvěřitelně levná.                                                                                                        | Stát se autorizovaným podepisovatelem je pro běžného člověka obvykle nedostupné, protože blockchain vyžaduje entity se zavedenou reputací.                         |
| Transakce jsou potvrzovány velmi rychle, může to být i za méně než 1 sekundu, protože k ověření nových bloků je zapotřebí pouze omezený počet podepisovatelů. | Zlomyslní podepisovatelé by mohli provést reorganizaci, dvojí útratu, cenzurovat transakce v síti. Tyto útoky jsou sice zmírněny, ale stále možné. |

## Další čtení {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225) _standard Clique_
- [Studie Proof of Authority](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md) _Cryptoeconomics_
- [Co je to Proof of Authority](https://forum.openzeppelin.com/t/proof-of-authority/3577) _OpenZeppelin_
- [Vysvětlení Proof of Authority](https://academy.binance.com/en/articles/proof-of-authority-explained) _binance_
- [PoA v blockchainu](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Vysvětlení Clique](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [Zastaralé PoA, specifikace Aura](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0, další implementace PoA](https://besu.hyperledger.org/private-networks/concepts/poa)

### Učíte se spíše vizuálně? Vizuální výuka {#visual-learner}

Podívejte se na vizuální vysvětlení proof-of-authority:

<YouTube id="Mj10HSEM5_8" />

## Související témata {#related-topics}

- [Důkaz prací](/developers/docs/consensus-mechanisms/pow/)
- [Důkaz podílem](/developers/docs/consensus-mechanisms/pos/)

