---
title: Palivo a poplatky
description:
lang: cs
---

Palivo je pro síť Ethereum nezbytné. Umožňuje jí fungovat, stejně jako auto potřebuje benzín, aby mohlo jezdit.

## Předpoklady {#prerequisites}

Abyste lépe porozuměli této stránce, doporučujeme vám si nejprve přečíst o [transakcích](/developers/docs/transactions/) a [EVM](/developers/docs/evm/).

## Co je to palivo? {#what-is-gas}

Palivo označuje jednotku, která měří množství výpočetního úsilí potřebného k provedení specifických operací na síti Ethereum.

Jelikož každá transakce na Ethereu potřebuje výpočetní zdroje k jejímu provedení, tyto zdroje se musí zaplatit, aby Ethereum nebylo zranitelné vůči spamovým útokům a nemohlo se zaseknout v nekonečných výpočetních smyčkách. Platba za výpočetní úsilí se provádí ve formě poplatku za palivo.

Poplatek za palivo je **množství paliva použitého k provedení určité operace, vynásobené nákladem na jednotku paliva**. Poplatek je zaplacen bez ohledu na to, zda je transakce úspěšně realizována, nebo selže.

![Diagram znázorňující, kde je potřeba palivo pro EVM operace](./gas.png) _Schéma převzato z [ilustrace Ethereum EVM](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Poplatky za palivo musí být zaplaceny v nativní měně Etherea, etheru (ETH). Ceny paliva jsou obvykle uváděny v gwei, což je denominace ETH. Každý gwei je roven jedné miliardtině ETH (0,000000001 ETH nebo 10<sup>-9</sup> ETH).

Např. místo toho, abyste řekli, že vaše palivo stojí 0,000000001 etheru, můžete říct, že stojí 1 gwei.

Slovo 'gwei' je zkratka pro „giga-wei“, což znamená „miliarda wei“. Jeden gwei se rovná jedné miliardě wei. Wei samo o sobě (pojmenované po [Wei Daiovi](https://wikipedia.org/wiki/Wei_Dai), tvůrci [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) je nejmenší jednotkou ETH.

## Jak se vypočítají palivové poplatky? {#how-are-gas-fees-calculated}

Když odesíláte transakci, můžete nastavit množství paliva, které jste ochotni zaplatit. Nabídkou určitého množství paliva nabízíte svoji transakci k zařazení do dalšího bloku. Pokud nabídnete příliš málo, máte menší pravděpodobnost, že validátoři vaši transakci vyberou k zařazení, což znamená, že vaše transakce může být zpožděna nebo nemusí být provedena vůbec. Pokud nabídnete příliš mnoho, můžete utratit ETH zbytečně. Jak máte tedy poznat, kolik zaplatit?

Celkový poplatek za palivo, který zaplatíte, se skládá ze dvou složek: `základního poplatku` a `prioritního poplatku` (spropitného).

`Základní poplatek` stanovuje protokol – musíte zaplatit alespoň tuto částku, aby byla vaše transakce považována za platnou. `Prioritní poplatek` je spropitné, které přidáte k základnímu poplatku, aby byla vaše transakce atraktivní pro validátory – aby ji vybrali k zařazení do dalšího bloku.

Transakce, která nabízí pouze `základní poplatek`, je technicky platná, ale je nepravděpodobné, že bude do bloku zařazena, protože nenabízí validátorům žádný motiv ji vybrat před jakoukoli jinou transakcí. „Správný“ `prioritní` poplatek je stanoven podle využití sítě v době odeslání vaší transakce – pokud je vysoká poptávka, možná budete muset nastavit vyšší `prioritní` poplatek, ale když je poptávka nižší, můžete zaplatit méně.

Např. řekněme, že Jordan musí zaplatit Taylorovi 1 ETH. Převod ETH vyžaduje 21 000 jednotek paliva a základní poplatek je 10 gwei. Jordan přidá spropitné 2 gwei.

Celkový poplatek by nyní dělal:

`spotřebované jednotky paliva * (základní poplatek + prioritní poplatek)`

kde `základní poplatek` je hodnota stanovená protokolem a `prioritní poplatek` je hodnota stanovená uživatelem jako spropitné pro validátora.

tj. `21 000 * (10 + 2) = 252 000 gwei` (0,000252 ETH).

Když Jordan odešle peníze, z jeho účtu bude odečteno 1,000252 ETH. Taylor obdrží 1,0000 ETH. Validátor obdrží spropitné ve výši 0,000042 ETH. `Základní poplatek` 0,00021 ETH bude spálen.

### Základní poplatek {#base-fee}

Každý blok má základní poplatek, který funguje jako rezervní cena. Aby byla transakce způsobilá k zařazení do bloku, nabízená cena za palivo musí být rovna alespoň základnímu poplatku. Základní poplatek je vypočítán nezávisle na aktuálním bloku a je místo toho určen bloky před ním – což dělá transakční poplatky pro uživatele předvídatelnějšími. Po vytvoření bloku je tento **základní poplatek „spálen“**, což znamená, že množství etheru použité na jeho zaplacení je odstraněno z oběhu.

Základní poplatek je vypočítán podle vzorce, který porovnává velikost předchozího bloku (množství paliva použitého na všechny transakce) s cílovou velikostí. Základní poplatek se zvýší o maximálně 12,5 % za blok, pokud je překročena cílová velikost bloku. Tento exponenciální růst činí ekonomicky neudržitelným, aby velikost bloku zůstala vysoká po neomezenou dobu.

| Číslo bloku | Zahrnuté palivo | Zvýšení poplatku | Aktuální základní poplatek |
| ----------- | ---------------:| ----------------:| --------------------------:|
| 1           |             15M |               0% |                   100 gwei |
| 2           |             30M |               0% |                   100 gwei |
| 3           |             30M |           12,5 % |                 112,5 gwei |
| 4           |             30M |           12,5 % |                 126,6 gwei |
| 5           |             30M |           12,5 % |                 142,4 gwei |
| 6           |             30M |           12,5 % |                 160,2 gwei |
| 7           |             30M |           12,5 % |                 180,2 gwei |
| 8           |             30M |           12,5 % |                 202,7 gwei |

Podle výše uvedené tabulky by k vytvoření transakce v bloku číslo 9 peněženka s jistotou informovala uživatele, že **maximální základní poplatek** dalšího bloku je `aktuální základní poplatek * 112,5 %` nebo `202,7 gwei * 112,5 % = 228,1 gwei`.

Je také důležité poznamenat, že z důvodu rychlosti, s jakou se základní poplatek zvyšuje předcházejícímu plnému bloku, je nepravděpodobné, že bychom viděli dlouhodobé peaky plných bloků.

| Číslo bloku | Zahrnuté palivo | Zvýšení poplatku | Aktuální základní poplatek |
| ----------- | ---------------:| ----------------:| --------------------------:|
| 30          |             30M |           12,5 % |               2 705,6 gwei |
| ...         |             ... |           12,5 % |                        ... |
| 50          |             30M |           12,5 % |              28 531,3 gwei |
| ...         |             ... |           12,5 % |                        ... |
| 100         |             30M |           12,5 % |          10 302 608,6 gwei |

### Prioritní poplatek (spropitné) {#priority-fee}

Prioritní poplatek (spropitné) motivuje validátory k zařazení transakce do bloku. Bez spropitného by pro validátory bylo ekonomicky výhodné těžit prázdné bloky, protože by obdrželi stejnou odměnu za blok. Malé spropitné dává validátorům minimální motivaci zahrnout transakci. Pro transakce, které mají být preferenčně provedeny před jinými transakcemi ve stejném bloku, lze přidat vyšší spropitné a pokusit se tak přeplatit konkurenční transakce.

### Maximální poplatek {#maxfee}

Při provedení transakce na síti mohou uživatelé specifikovat maximální limit, který jsou ochotni zaplatit. Tento volitelný parametr je známý jako `maxFeePerGas`. Aby byla transakce provedena, musí maximální poplatek překročit součet základního poplatku a spropitného. Odesílateli transakce je vrácen rozdíl mezi maximálním poplatkem a součtem základního poplatku a spropitného.

### Velikost bloku {#block-size}

Každý blok má cílovou velikost 15 milionů jednotek paliva, ale velikost bloků se bude zvyšovat nebo snižovat v závislosti na poptávce na síti, až do limitu bloku 30 milionů jednotek paliva (2x cílová velikost bloku). Protokol v průměru dosahuje rovnovážné velikosti bloku 15 milionů prostřednictvím procesu zvaného _tâtonnement_. To znamená, že pokud je velikost bloku větší než cílová velikost bloku, protokol zvýší základní poplatek pro následující blok. Podobně, pokud je velikost bloku menší než cílová velikost, protokol sníží základní poplatek. Hodnota, o kterou se základní poplatek upravuje, je úměrná tomu, jak daleko je aktuální velikost bloku od cíle. [Další informace o blocích](/developers/docs/blocks/).

### Výpočet poplatků za palivo v praxi {#calculating-fees-in-practice}

Můžete explicitně uvést, kolik jste ochotni zaplatit, aby byla vaše transakce provedena. Většina poskytovatelů peněženek však automaticky nastaví doporučený transakční poplatek (základní poplatek + doporučené spropitné), aby svým uživatelům vše zjednodušila.

## Proč existují poplatky za palivo? {#why-do-gas-fees-exist}

Stručně řečeno, poplatky za palivo pomáhají udržovat bezpečnost sítě Ethereum. Požadováním poplatku za každý výpočet provedený v síti zabráníme nečestným aktérům v zahlcení sítě. Abychom se vyhnuli náhodným nebo záměrným nekonečným smyčkám nebo jinému plýtvání výpočetními zdroji v kódu, každá transakce musí nastavit limit na počet výpočetních kroků potřebných k vykonání kódu. Základní jednotkou výpočtu je „palivo“.

Ačkoliv transakce obsahuje limit, palivo nevyužité během transakce se vrací uživateli (tj. `maximální poplatek - (základní polatek + spropitné)` se vrací).

![Diagram ukazující vrácení nepoužitého paliva](../transactions/gas-tx.png) _Schéma převzato z [ilustrace Ethereum EVM](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Co je to limit paliva? {#what-is-gas-limit}

Limit paliva označuje maximální množství paliva, které jste ochotni za transakci utratit. Složitější transakce zahrnující [chytré kontrakty](/developers/docs/smart-contracts/) potřebují více výpočetního výkonu, a proto vyžadují vyšší limit paliva než jednoduchá platba. Standardní převod ETH vyžaduje limit paliva 21 000 jednotek.

Např. pokud nastavíte limit paliva na 50 000 pro jednoduchý převod ETH, EVM spotřebuje 21 000 a zbývajících 29 000 se vám vrátí. Pokud však nastavíte příliš nízký limit, např. 20 000 pro jednoduchý převod ETH, EVM spotřebuje vašich 20 000 jednotek paliva při pokusu o provedení transakce, ale nedokončí ji. EVM poté jakékoli změny smaže, ale protože validátor už udělal práci za 20 000 jednotek paliva, je toto palivo spotřebováno.

## Proč mohou být poplatky za palivo tak vysoké? {#why-can-gas-fees-get-so-high}

Vysoké poplatky za palivo jsou způsobeny popularitou Etherea. Pokud je poptávka příliš vysoká, uživatelé musí nabídnout vyšší spropitné, aby se pokusili přeplatit transakce jiných uživatelů. Vyšší spropitné může zvýšit pravděpodobnost, že se vaše transakce dostane do dalšího bloku. Také složitější aplikace s chytrými kontrakty mohou vykonávat spoustu operací k podpoře svých funkcí, což způsobuje vyšší spotřebu paliva.

## Iniciativy na snížení nákladů na palivo {#initiatives-to-reduce-gas-costs}

[Vylepšení škálovatelnosti](/roadmap/) Etherea by měly řešit některé problémy palivových poplatků, což následně umožní platformě zpracovávat tisíce transakcí za sekundu a škálovat globálně.

Primární iniciativou ke snížení palivových nákladů a zlepšení uživatelských možností a škálovatelnosti je škálování druhé vrstvy. [Další informace o škálování druhé vrstvy](/developers/docs/scaling/#layer-2-scaling).

## Monitorování poplatků za palivo {#monitoring-gas-fees}

Pokud chcete monitorovat poplatky za palivo, abyste mohli odesílat své ETH za nižší ceny, můžete využít několik různých nástrojů, např.:

- [Etherscan](https://etherscan.io/gastracker) – _odhad ceny paliva za transakci_
- [ETH tracker paliva](https://www.ethgastracker.com/) _Monitorujte a sledujte ceny paliva na Ethereu a vrstvě 2, abyste snížili transakční poplatky a ušetřili peníze_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) – _rozšíření pro prohlížeč Chrome odhadující poplatky za palivo, které podporuje jak typ 0 legacy transakce, tak typ 2 transakce EIP-1559_
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) – _kalkulačka poplatků za palivo v místní měně pro různé typy transakcí na hlavní síti, Arbitru a Polygonu_

## Související nástroje {#related-tools}

- [Blocknative's Gas Platform](https://www.blocknative.com/gas) – _API pro odhadování poplatků za palivo podporované globální datovou platformou Blocknative mempool_

## Další informace {#further-reading}

- [Vysvětlení paliva na Ethereu](https://defiprime.com/gas)
- [Snížení spotřeby paliva ve vašich chytrých kontraktech](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Důkaz podílem versus důkaz prací](https://blockgeeks.com/guides/proof-of-work-vs-proof-of-stake/)
- [Strategie optimalizace paliva pro vývojáře](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [Dokumentace EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)
- [Zdroje k EIP-1559 od Tima Beika](https://hackmd.io/@timbeiko/1559-resources)
