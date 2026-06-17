---
title: "Důkaz autority (PoA)"
description: "Vysvětlení protokolu konsensu důkazu autority a jeho role v ekosystému blockchainu."
lang: cs
---

**Důkaz autority (PoA)** je algoritmus konsensu založený na reputaci, který je upravenou verzí [důkazu podílem (PoS)](/developers/docs/consensus-mechanisms/pos/). Využívají ho převážně soukromé řetězce, testnety a lokální vývojové sítě. PoA je algoritmus konsensu založený na reputaci, který vyžaduje důvěru ve skupinu autorizovaných podepisovatelů, kteří produkují bloky, na rozdíl od mechanismu založeného na staku v PoS.

## Předpoklady {#prerequisites}

Pro lepší pochopení této stránky doporučujeme nejprve si přečíst o [transakcích](/developers/docs/transactions/), [blocích](/developers/docs/blocks/) a [mechanismech konsensu](/developers/docs/consensus-mechanisms/).

## Co je důkaz autority (PoA)? {#what-is-poa}

Důkaz autority je upravená verze **[důkazu podílem](/developers/docs/consensus-mechanisms/pos/) (PoS)**, což je algoritmus konsensu založený na reputaci namísto mechanismu založeného na staku v PoS. Tento termín poprvé představil v roce 2017 Gavin Wood a tento algoritmus konsensu se používá převážně u soukromých řetězců, testnetů a lokálních vývojových sítí, protože překonává potřebu vysoce výkonných zdrojů, jako je tomu u důkazu prací (PoW), a řeší problémy se škálovatelností u PoS tím, že blockchain ukládá a bloky produkuje pouze malá podmnožina uzlů.

Důkaz autority vyžaduje důvěru ve skupinu autorizovaných podepisovatelů, kteří jsou nastaveni v [genesis bloku](/glossary/#genesis-block). Ve většině současných implementací si všichni autorizovaní podepisovatelé zachovávají stejnou moc a privilegia při určování konsensu řetězce. Myšlenka stakování reputace spočívá v tom, že každý autorizovaný validátor je všem dobře známý prostřednictvím procesů, jako je KYC (poznej svého klienta), nebo tím, že jediným validátorem je známá organizace – tímto způsobem je v případě, že validátor udělá něco špatně, známa jeho identita.

Existuje několik implementací PoA, ale standardní implementací pro Ethereum je **clique**, která implementuje [EIP-225](https://eips.ethereum.org/EIPS/eip-225). Clique je standard přívětivý pro vývojáře a snadno implementovatelný, který podporuje všechny typy synchronizace klientů. Mezi další implementace patří [IBFT 2.0](https://besu.hyperledger.org/private-networks/concepts/poa) a [Aura](https://openethereum.github.io/Chain-specification).

## Jak to funguje {#how-it-works}

V PoA je vybrána skupina autorizovaných podepisovatelů, kteří vytvářejí nové bloky. Podepisovatelé jsou vybíráni na základě své reputace a jsou jediní, kdo smí vytvářet nové bloky. Podepisovatelé se střídají systémem round-robin a každý podepisovatel smí vytvořit blok v určitém časovém rámci. Čas vytvoření bloku je pevně daný a podepisovatelé musí vytvořit blok v tomto časovém rámci.

Reputace v tomto kontextu není kvantifikovaná veličina, ale spíše jde o reputaci známých korporací, jako jsou Microsoft a Google. Způsob výběru důvěryhodných podepisovatelů tedy není algoritmický, ale jde o běžný lidský akt _důvěry_. Pokud například subjekt jako Microsoft vytvoří soukromou síť PoA mezi stovkami nebo tisíci startupů a převezme roli jediného důvěryhodného podepisovatele s možností v budoucnu přidat další známé podepisovatele, jako je Google, startupy by bezpochyby důvěřovaly Microsoftu, že bude vždy jednat čestně, a síť by využívaly. Tím se řeší nutnost stakovat v různých malých/soukromých sítích, které byly vytvořeny pro různé účely, aby zůstaly decentralizované a funkční, a také potřeba těžařů, což spotřebovává spoustu energie a zdrojů. Některé soukromé sítě používají standard PoA v jeho původní podobě, jako například VeChain, a některé si ho upravují, jako například Binance, která používá [PoSA](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa), což je vlastní upravená verze PoA a PoS.

Proces hlasování provádějí sami podepisovatelé. Každý podepisovatel při vytváření nového bloku hlasuje pro přidání nebo odebrání podepisovatele ve svém bloku. Hlasy jsou sčítány uzly a podepisovatelé jsou přidáváni nebo odebíráni na základě toho, zda hlasy dosáhnou určité hranice `SIGNER_LIMIT`.

Může nastat situace, kdy dojde k malým forkům; obtížnost bloku závisí na tom, zda byl blok podepsán v pořadí (in turn) nebo mimo pořadí (out of turn). Bloky „v pořadí“ mají obtížnost 2 a bloky „mimo pořadí“ mají obtížnost 1. V případě malých forků získá největší obtížnost a vyhraje ten řetězec, ve kterém většina podepisovatelů pečetí bloky „v pořadí“.

## Vektory útoků {#attack-vectors}

### Zlomyslní podepisovatelé {#malicious-signers}

Na seznam podepisovatelů by mohl být přidán zlomyslný uživatel, nebo by mohl být kompromitován podepisovací klíč či stroj. V takovém scénáři se protokol musí umět bránit proti reorganizacím a spamu. Navrhovaným řešením je, že při seznamu N autorizovaných podepisovatelů smí každý podepisovatel razit pouze 1 blok z každých K bloků. Tím je zajištěno, že škody jsou omezené a zbývající validátoři mohou zlomyslného uživatele odhlasovat pryč.

### Cenzura {#censorship-attack}

Dalším zajímavým vektorem útoku je situace, kdy se podepisovatel (nebo skupina podepisovatelů) pokusí cenzurovat bloky, které hlasují o jejich odstranění z autorizačního seznamu. Aby se tomu zabránilo, je povolená frekvence ražení podepisovatelů omezena na 1 z N/2. Tím je zajištěno, že zlomyslní podepisovatelé by museli ovládat alespoň 51 % podepisovacích účtů, v kterémžto okamžiku by se efektivně stali novým zdrojem pravdy pro řetězec.

### Spam {#spam-attack}

Dalším menším vektorem útoku je, když zlomyslní podepisovatelé vkládají nové návrhy na hlasování do každého bloku, který razí. Vzhledem k tomu, že uzly musí sečíst všechny hlasy, aby vytvořily aktuální seznam autorizovaných podepisovatelů, musí zaznamenávat všechny hlasy v průběhu času. Bez omezení okna pro hlasování by tento počet mohl pomalu, ale neomezeně růst. Řešením je zavést _pohyblivé_ okno o velikosti W bloků, po jehož uplynutí jsou hlasy považovány za zastaralé. _Rozumné okno by mohlo být 1-2 epochy._

### Souběžné bloky {#concurrent-blocks}

V síti PoA, když je N autorizovaných podepisovatelů, smí každý podepisovatel razit 1 blok z K, což znamená, že v daném okamžiku smí razit N-K+1 validátorů. Aby se zabránilo tomu, že tito validátoři budou o bloky závodit, měl by každý podepisovatel přidat malý náhodný „posun“ (offset) k času, kdy vydá nový blok. Ačkoli tento proces zajišťuje, že malé forky jsou vzácné, občas k nim může dojít, stejně jako na Mainnetu. Pokud se zjistí, že podepisovatel zneužívá svou moc a způsobuje chaos, ostatní podepisovatelé ho mohou odhlasovat pryč.

Pokud je například 10 autorizovaných podepisovatelů a každý podepisovatel smí vytvořit 1 blok ze 6, pak v daném okamžiku může bloky vytvářet 5 validátorů. Aby se zabránilo jejich závodění ve vytváření bloků, každý podepisovatel přidá malý náhodný „posun“ k času, kdy vydá nový blok. To snižuje výskyt malých forků, ale stále umožňuje občasné forky, jak je vidět na síti Ethereum Mainnet. Pokud podepisovatel zneužije svou autoritu a způsobí narušení, může být ze sítě odhlasován.

## Výhody a nevýhody {#pros-and-cons}

| Výhody                                                                                                                                                    | Nevýhody                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Škálovatelnější než jiné populární mechanismy, jako jsou PoS a PoW, protože je založen na omezeném počtu podepisovatelů bloků                             | Sítě PoA mají obvykle relativně malý počet validujících uzlů. To činí síť PoA více centralizovanou.                                                   |
| Provoz a údržba blockchainů PoA jsou neuvěřitelně levné                                                                                                   | Stát se autorizovaným podepisovatelem je pro běžného člověka obvykle nedosažitelné, protože blockchain vyžaduje subjekty se zavedenou reputací.       |
| Transakce jsou potvrzovány velmi rychle, může to trvat i méně než 1 sekundu, protože k validaci nových bloků je zapotřebí pouze omezený počet podepisovatelů | Zlomyslní podepisovatelé by mohli provést reorganizaci, dvojí útratu nebo cenzurovat transakce v síti; tyto útoky jsou sice zmírněny, ale stále jsou možné |

## Další čtení {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225) _Standard Clique_
- [Studie o důkazu autority](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md) _Cryptoeconomics_
- [Co je důkaz autority](https://forum.openzeppelin.com/t/proof-of-authority/3577) _OpenZeppelin_
- [Vysvětlení důkazu autority](https://academy.binance.com/en/articles/proof-of-authority-explained) _Binance_
- [PoA v blockchainu](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Vysvětlení Clique](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [Zastaralé PoA, specifikace Aura](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0, další implementace PoA](https://besu.hyperledger.org/private-networks/concepts/poa)

### Učíte se raději vizuálně? {#visual-learner}

Podívejte se na vizuální vysvětlení důkazu autority:

<VideoWatch slug="proof-of-authority-explained" />

## Související témata {#related-topics}

- [Důkaz prací (PoW)](/developers/docs/consensus-mechanisms/pow/)
- [Důkaz podílem (PoS)](/developers/docs/consensus-mechanisms/pos/)