---
title: Proof-of-work (PoW)
description: "Vysvětlení konsensuálního protokolu proof of work a jeho role v Ethereum síti."
lang: cs
---

Síť Ethereum začala používat mechanismus konsenzu, který zahrnoval **[důkaz prací (PoW)](/developers/docs/consensus-mechanisms/pow)**. Tento mechanismus umožňoval uzlům sítě Ethereum shodnout se na stavu všech informací zaznamenaných na blockchainu Etherea a bránil určitým druhům ekonomických útoků. V roce 2022 však Ethereum přešlo z důkazu prací na [důkaz podílem](/developers/docs/consensus-mechanisms/pos).

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
    Proof-of-work je nyní zastaralý. Ethereum už proof-of-work nepoužívá jako součást svého konsensuálního mechanismu. Místo toho používá proof-of-stake. Přečtěte si více o [důkazu podílem](/developers/docs/consensus-mechanisms/pos/) a [uzamčení](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

## Předpoklady {#prerequisites}

Abyste lépe porozuměli této stránce, doporučujeme vám si nejprve přečíst o [transakcích](/developers/docs/transactions/), [blocích](/developers/docs/blocks/) a [mechanismech konsenzu](/developers/docs/consensus-mechanisms/).

## Co je důkaz prací (PoW)? {#what-is-pow}

Nakamotův konsensus, který využívá důkaz prací, je mechanismus, který kdysi umožňoval decentralizované síti Ethereum dosáhnout konsenzu (tj. shody všech uzlů) na věcech, jako jsou zůstatky na účtech a pořadí transakcí. Tento mechanismus zabránil uživatelům v „dvojím utracení“ prostředků a zajistil, že Ethereum blockchain bylo mimořádně obtížné napadnout nebo s ním manipulovat. Tyto bezpečnostní vlastnosti nyní pocházejí z důkazu podílem za použití mechanismu konsenzu známého jako [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/).

## Důkaz prací a těžba {#pow-and-mining}

Proof-of-work je základní algoritmus, který stanovuje obtížnost a pravidla pro práci těžařů na proof-of-work blockchainech. Těžba je samotná "práce". Těžbou je myšleno přidávání platných bloků do řetězce. To je důležité, protože délka řetězce pomáhá síti sledovat správnou větev blockchainu. Čím více "práce" je vykonáno, tím delší je řetězec a čím vyšší je číslo bloku, tím jistější si síť může být aktuálním stavem věcí.

[Více o těžbě](/developers/docs/consensus-mechanisms/pow/mining/)

## Jak funguje proof-of-work na Ethereu? Jak to funguje {#how-it-works}

Transakce na Ethereu se zpracovávají do bloků. Na nyní zastaralém proof-of-work Ethereu každý blok obsahoval:

- obtížnost bloku - například: 3,324,092,183,262,715
- mixHash – například: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce – například: `0xd3ee432b4fb3d26b`

Tato data bloku byla přímo spojena s proof-of-work.

### Práce v důkazu prací {#the-work}

Protokol proof-of-work, Ethash, vyžadoval, aby těžaři prošli intenzivním závodem sestávajícím z pokusů a omylů, aby našli jednorázové číslo bloku. Pouze bloky s platným jednorázovým číslem mohly být přidány do řetězce.

Při závodě o vytvoření bloku těžař opakovaně procházel datovou sadu, kterou bylo možné získat pouze stažením a provozováním celého řetězce (což těžaři dělají), pomocí matematické funkce. Tato datová sada byla použita k vygenerování mixHashe, který byl pod cílovou hodnotou určenou obtížností bloku. Nejlepší způsob, jak toho dosáhnout, je metoda pokusů a omylů.

Obtížnost určovala cíl pro hash. Čím nižší je cílová hodnota, tím menší je množina platných hashů. Jakmile byl hash vygenerován, bylo pro ostatní těžaře a klienty velmi snadné jej ověřit. I malá změna v transakci by vedla k úplně jinému hashi, což by signalizovalo podvod.

Díky hashování je podvod snadno odhalitelný. Ale proof-of-work jako proces byl také velkým odrazujícím prvkem proti útokům na řetězec.

### Důkaz prací a bezpečnost {#security}

Těžaři byli motivováni vykonávat tuto práci na Ethereum Mainnetu. Podskupina těžařů měla jen malou motivaci k tomu, aby si založila vlastní řetězec - podkopává to celý systém. Blockchainy se spoléhají na to, že mají jediný stav jako zdroj pravdy.

Cílem proof-of-work bylo prodloužit řetězec. Nejdelší řetězec byl považován za nejvěrohodnější, protože na něm bylo provedeno nejvíce výpočetní práce. V rámci Ethereum systému PoW bylo téměř nemožné vytvářet nové bloky, které by vymazaly transakce, vytvořily falešné bloky nebo udržovaly druhý řetězec. To proto, že by těžař s úmyslem poškodit blockchain musel vždy vypočítat jedinečné číslo bloku rychleji než ostatní.

Aby zlý těžař mohl konzistentně vytvářet škodlivé, ale platné bloky, musel by mít více než 51 % výpočetní síly sítě, aby porazil ostatní těžaře. Takové množství „práce“ vyžaduje značné množství drahé výpočetní síly a náklady na energii by mohly dokonce převýšit zisky útoku.

### Ekonomika důkazu prací {#economics}

Proof-of-work byl také zodpovědný za vytváření nové měny v systému a za motivaci těžařů k vykonávání práce.

Od [upgradu Constantinople](/ethereum-forks/#constantinople) byli těžaři, kteří úspěšně vytvořili blok, odměněni dvěma nově vyraženými ETH a částí transakčních poplatků. Ommer bloky byly také kompenzovány částkou 1,75 ETH. Ommer bloky byly platné bloky vytvořené těžařem prakticky ve stejnou dobu jako jiný těžař vytvořil kanonický blok, přičemž rozhodující bylo, který blok byl přidán ke stávajícímu řetězci jako první. Ommer bloky se obvykle objevovaly kvůli latenci sítě.

## Konečnost {#finality}

Transakce má na Ethereu „konečnost“, když je součástí bloku, který se nemůže změnit.

Protože těžaři pracovali decentralizovaným způsobem, mohly být současně vytěženy dva platné bloky. To vedlo k dočasnémuu větvení řetězce. Nakonec se jeden z těchto řetězců stal přijatým řetězcem poté, co byly vytěženy a přidány další bloky, čímž se stal delším.

Aby se věci ještě více zkomplikovaly, transakce, které byly zamítnuty na dočasné větvi, nemusely být zahrnuty v přijatém řetězci. To znamená, že mohlo dojít k jejich zrušení. Konečnost se tedy týká doby, po kterou byste měli vyčkat, než lze transakci považovat za nevratnou. V předchozím Ethereu s důkazem prací platilo, že čím více bloků bylo vytěženo nad konkrétním blokem `N`, tím vyšší byla důvěra, že transakce v `N` byly úspěšné a nebudou zrušeny. Nyní, s proof-of-stake, je konečnost explicitní vlastností bloku, nikoli probabilistickou.

## Spotřeba energie u důkazu prací {#energy}

Hlavní kritikou proof-of-work je množství energie potřebné k udržení bezpečnosti sítě. Aby si Ethereum udrželo míru bezpečnosti a decentralizace, spotřebovávalo velké množství energie. Krátce před přechodem na důkaz podílem těžaři Etherea kolektivně spotřebovávali přibližně 70 TWh/rok (přibližně stejně jako Česká republika – podle [digiconomist](https://digiconomist.net/) k 18. červenci 2022).

## Výhody a nevýhody {#pros-and-cons}

| Plusy                                                                                                                                                                                                                                                                  | Minusy                                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Proof-of-work je neutrální. Pro začátek nepotřebujete ETH a odměny za bloky vám umožní přejít z 0ETH do kladného zůstatku. U [důkazu podílem](/developers/docs/consensus-mechanisms/pos/) potřebujete pro začátek ETH. | Proof-of-work spotřebovává tolik energie, že je škodlivý pro životní prostředí.                                                              |
| Proof-of-work je osvědčený a vyzkoušený konsensuální mechanismus, který udržoval Bitcoin a Ethereum bezpečné a decentralizované po mnoho let.                                                                                                          | Pokud chcete těžit, potřebujete tak specializované vybavení, že je to pro začátek velká investice.                                           |
| Ve srovnání s proof-of-stake je jeho implementace relativně snadná.                                                                                                                                                                                    | Vzhledem k rostoucí potřebě výpočtů by těžební pooly mohly potenciálně ovládnout těžbu, což by vedlo k centralizaci a bezpečnostním rizikům. |

## Srovnání s důkazem podílem {#compared-to-pos}

Z obecného pohledu má proof-of-stake stejný cíl jako proof-of-work: Pomoci decentralizované síti bezpečně dosáhnout konsensu. Má však některé rozdíly v procesu a personálu:

- Proof-of-stake nahrazuje důležitost výpočetní síly stakovaným ETH.
- Proof-of-stake nahrazuje těžaře validátory. Validátoři uzamikají své ETH, aby aktivovali schopnost vytvářet nové bloky.
- Validátoři nesoutěží o vytváření bloků, místo toho jsou náhodně vybíráni algoritmem.
- Konečnost je jasnější: pokud se v určitých kontrolních bodech 2/3 validátorů shodnou na stavu bloku, je považován za konečný. Validátoři na to musí vsadit celý svůj vklad, takže pokud se pokusí o tajnou dohodu bokem, přijdou o celý svůj vklad.

[Více o důkazu podílem](/developers/docs/consensus-mechanisms/pos/)

## Učíte se spíše vizuálně? Vizuální výuka {#visual-learner}

<YouTube id="3EUAcxhuoU4" />

## Další čtení {#further-reading}

- [Většinový útok](https://en.bitcoin.it/wiki/Majority_attack)
- [O finalitě vypořádání](https://blog.ethereum.org/2016/05/09/on-settlement-finality/)

### Videa {#videos}

- [Technické vysvětlení protokolů důkazu prací](https://youtu.be/9V1bipPkCTU)

## Související témata {#related-topics}

- [Těžba](/developers/docs/consensus-mechanisms/pow/mining/)
- [Důkaz podílem](/developers/docs/consensus-mechanisms/pos/)
- [Důkaz autoritou](/developers/docs/consensus-mechanisms/poa/)
