---
title: "Prohlížeče bloků"
description: "Úvod do prohlížečů bloků, vašeho portálu do světa blockchainových dat, kde můžete dotazovat informace o transakcích, účtech, kontraktech a dalším."
lang: cs
sidebarDepth: 3
---

Prohlížeče bloků jsou vaším portálem k datům Etherea. Můžete je použít k zobrazení dat v reálném čase o blocích, transakcích, validátorech, účtech a další onchain aktivitě.

## Předpoklady {#prerequisites}

Měli byste rozumět základním konceptům Etherea, abyste se vyznali v datech, která vám prohlížeč bloků poskytuje. Začněte s [úvodem do Etherea](/developers/docs/intro-to-ethereum/).

## Open source nástroje {#open-source-tools}

- [3xpl](https://3xpl.com/ethereum) – Prohlížeč Etherea bez reklam, který umožňuje stahování svých datových sad (open-core: základní moduly jsou open source)
- [Beaconcha.in](https://beaconcha.in/)
- [Blockscout](https://eth.blockscout.com/)
- [lazy-etherscan](https://github.com/woxjro/lazy-etherscan)
- [Otterscan](https://otterscan.io/)

## Služby {#services}

- [Blockchair](https://blockchair.com/ethereum) – Soukromý prohlížeč Etherea. Také pro třídění a filtrování dat (mempool). Dostupný ve španělštině, francouzštině, italštině, nizozemštině, portugalštině, ruštině, čínštině a perštině
- [Chainlens](https://www.chainlens.com/)
- [DexGuru Block Explorer](https://ethereum.dex.guru/)
- [Etherchain](https://www.etherchain.org/)
- [Etherscan](https://etherscan.io/) – Dostupný také v čínštině, korejštině, ruštině a japonštině
- [Ethplorer](https://ethplorer.io/) – Prohlížeč bloků se zaměřením na tokeny. Dostupný také v čínštině, španělštině, francouzštině, turečtině, ruštině, korejštině a vietnamštině
- [Ethseer](https://ethseer.io)
- [EthVM](https://www.ethvm.com/)
- [OKLink](https://www.oklink.com/eth)

## Data {#data}

Ethereum je ze své podstaty transparentní, takže vše je ověřitelné. Prohlížeče bloků poskytují rozhraní pro získání těchto informací. A to platí jak pro hlavní síť Etherea (Mainnet), tak pro testovací sítě, pokud byste tato data potřebovali. Data se dělí na data provádění (execution data) a data konsensu. Data provádění se týkají transakcí, které byly provedeny v konkrétním bloku. Data konsensu se týkají samotných bloků a validátorů, kteří je navrhli.

Zde je shrnutí typů dat, která můžete získat z prohlížeče bloků.

### Data provádění {#execution-data}

Nové bloky jsou do Etherea přidávány každých 12 sekund (pokud navrhovatel bloku nezmešká svou řadu), takže do prohlížečů bloků je přidáván téměř neustálý proud dat. Bloky obsahují spoustu důležitých dat, která by se vám mohla hodit:

**Standardní data**

- Výška bloku (Block height) – Číslo bloku a délka blockchainu (v blocích) při vytvoření aktuálního bloku
- Časové razítko (Timestamp) – Čas, kdy byl blok navržen
- Transakce – Počet transakcí zahrnutých v bloku
- Příjemce poplatků (Fee recipient) – Adresa, která obdržela spropitné z poplatků za plyn (gas fee) z transakcí
- Odměna za blok – Množství ETH udělené validátorovi, který blok navrhl
- Velikost – Velikost dat v bloku (měřeno v bajtech)
- Použitý gas – Celkový počet jednotek gasu použitých transakcemi v bloku
- Limit plynu – Celkové limity plynu nastavené transakcemi v bloku
- Základní poplatek za gas – Minimální násobitel požadovaný k tomu, aby byla transakce zahrnuta do bloku
- Spálené poplatky – Kolik ETH je v bloku spáleno
- Extra data – Jakákoli další data, která tvůrce do bloku zahrnul

**Pokročilá data**

- Hash – Kryptografický hash, který představuje hlavičku bloku (jedinečný identifikátor bloku)
- Hash rodiče (Parent hash) – Hash bloku, který předcházel aktuálnímu bloku
- StateRoot – Kořenový hash Merkleova stromu (trie), který ukládá celý stav systému

### Gas {#gas}

Prohlížeče bloků vám poskytnou nejen data o využití gasu v transakcích a blocích, ale některé vám poskytnou i informace o aktuálních cenách plynu v síti. To vám pomůže porozumět využití sítě, odesílat bezpečné transakce a neutrácet za gas zbytečně moc. Hledejte API, která vám pomohou dostat tyto informace do rozhraní vašeho produktu. Data specifická pro gas zahrnují:

- Odhadované jednotky gasu potřebné pro bezpečnou, ale pomalou transakci (+ odhadovaná cena a doba trvání)
- Odhadované jednotky gasu potřebné pro průměrnou transakci (+ odhadovaná cena a doba trvání)
- Odhadované jednotky gasu potřebné pro rychlou transakci (+ odhadovaná cena a doba trvání)
- Průměrná doba potvrzení na základě ceny plynu
- Kontrakty, které spotřebovávají gas – jinými slovy, populární produkty, které jsou v síti hojně využívány
- Účty, které utrácejí gas – jinými slovy, častí uživatelé sítě

### Transakce {#transactions}

Prohlížeče bloků se staly běžným místem, kde lidé sledují průběh svých transakcí. Je to proto, že úroveň detailů, kterou můžete získat, poskytuje větší jistotu. Data transakce zahrnují:

**Standardní data**

- Hash transakce – Hash vygenerovaný při odeslání transakce
- Stav – Indikace, zda transakce čeká na vyřízení, selhala nebo byla úspěšná
- Blok – Blok, do kterého byla transakce zahrnuta
- Časové razítko – Čas, kdy byla transakce zahrnuta do bloku navrženého validátorem
- Od (From) – Adresa účtu, který transakci odeslal
- Komu (To) – Adresa příjemce nebo chytrého kontraktu, se kterým transakce interaguje
- Převedené tokeny – Seznam tokenů, které byly převedeny jako součást transakce
- Hodnota – Celková převáděná hodnota v ETH
- Transakční poplatek – Částka zaplacená validátorovi za zpracování transakce (vypočítaná jako cena plynu \* použitý gas)

**Pokročilá data**

- Limit plynu – Maximální počet jednotek gasu, které může tato transakce spotřebovat
- Použitý gas – Skutečné množství jednotek gasu, které transakce spotřebovala
- Cena plynu – Cena stanovená za jednotku gasu
- Nonce – Číslo transakce pro adresu `from` (mějte na paměti, že začíná od 0, takže nonce `100` by ve skutečnosti byla 101. transakce odeslaná tímto účtem)
- Vstupní data – Jakékoli další informace požadované transakcí

### Účty {#accounts}

O účtu můžete získat spoustu dat. Proto se často doporučuje používat více účtů, aby vaše aktiva a hodnotu nebylo možné snadno sledovat. Vyvíjejí se také některá řešení, která mají zajistit větší soukromí transakcí a aktivity na účtu. Zde jsou však data, která jsou pro účty k dispozici:

**Uživatelské účty**

- Adresa účtu – Veřejná adresa, na kterou můžete posílat prostředky
- Zůstatek ETH – Množství ETH spojené s tímto účtem
- Celková hodnota ETH – Hodnota daného ETH
- Tokeny – Tokeny spojené s účtem a jejich hodnota
- Historie transakcí – Seznam všech transakcí, u kterých byl tento účet buď odesílatelem, nebo příjemcem

**Chytré kontrakty**

Účty chytrých kontraktů mají všechna data, která má uživatelský účet, ale některé prohlížeče bloků zobrazí dokonce i některé informace o kódu. Příklady zahrnují:

- Tvůrce kontraktu – Adresa, která provedla nasazení kontraktu na Mainnet
- Transakce vytvoření – Transakce, která zahrnovala nasazení na Mainnet
- Zdrojový kód – Kód chytrého kontraktu v jazyce Solidity nebo Vyper
- ABI kontraktu – Aplikační binární rozhraní (Application Binary Interface) kontraktu – volání, která kontrakt provádí, a přijatá data
- Kód vytvoření kontraktu – Zkompilovaný bajtkód chytrého kontraktu – vytvořený při kompilaci chytrého kontraktu napsaného v Solidity, Vyper atd.
- Události kontraktu – Historie metod volaných v chytrém kontraktu – v podstatě způsob, jak zjistit, jak je kontrakt používán a jak často

### Tokeny {#tokens}

Tokeny jsou typem kontraktu, takže budou mít podobná data jako chytrý kontrakt. Ale protože mají hodnotu a lze s nimi obchodovat, mají další datové body:

- Typ – Zda se jedná o ERC-20, ERC-721 nebo jiný standard tokenu
- Cena – Pokud se jedná o ERC-20, budou mít aktuální tržní hodnotu
- Tržní kapitalizace (Market cap) – Pokud se jedná o ERC-20, budou mít tržní kapitalizaci (vypočítanou jako cena \* celková nabídka)
- Celková nabídka – Počet tokenů v oběhu
- Držitelé – Počet adres, které token drží
- Převody – Kolikrát byl token převeden mezi účty
- Historie transakcí – Historie všech transakcí zahrnujících daný token
- Adresa kontraktu – Adresa tokenu, který byl nasazen na Mainnet
- Desetinná místa – Tokeny ERC-20 jsou dělitelné a mají desetinná místa

### Síť {#network}

Některá data bloků se týkají zdraví Etherea více holisticky.

- Celkový počet transakcí – Počet transakcí od vytvoření Etherea
- Transakce za sekundu – Počet transakcí zpracovatelných za sekundu
- Cena ETH – Aktuální ocenění 1 ETH
- Celková nabídka ETH – Počet ETH v oběhu – pamatujte, že nové ETH vzniká s vytvořením každého bloku ve formě odměny za blok
- Tržní kapitalizace – Výpočet cena \* nabídka

## Data vrstvy konsensu {#consensus-layer-data}

### Epocha {#epoch}

Z bezpečnostních důvodů jsou na konci každé epochy (každých 6,4 minuty) vytvářeny randomizované výbory validátorů. Data epochy zahrnují:

- Číslo epochy
- Stav finalizace – Zda byla epocha finalizována (Ano/Ne)
- Čas – Čas, kdy epocha skončila
- Atestace – Počet atestací v epoše (hlasy pro bloky v rámci slotů)
- Vklady – Počet vkladů ETH zahrnutých v epoše (validátoři musí provést stake ETH, aby se stali validátory)
- Slashingy – Počet penalizací udělených navrhovatelům bloků nebo atestátorům
- Účast na hlasování – Množství stakovaného ETH použitého k atestaci bloků
- Validátoři – Počet validátorů aktivních pro danou epochu
- Průměrný zůstatek validátora – Průměrný zůstatek aktivních validátorů
- Sloty – Počet slotů zahrnutých v epoše (sloty obsahují jeden platný blok)

### Slot {#slot}

Sloty jsou příležitosti pro vytvoření bloku, data dostupná pro každý slot zahrnují:

- Epocha – Epocha, ve které je slot platný
- Číslo slotu
- Stav – Stav slotu (Navržen/Zmeškán)
- Čas – Časové razítko slotu
- Navrhovatel – Validátor, který navrhl blok pro daný slot
- Kořen bloku (Block root) – Hash-tree-root beacon bloku (BeaconBlock)
- Kořen rodiče (Parent root) – Hash bloku, který předcházel
- Kořen stavu (State root) – Hash-tree-root stavu Beacon chainu (BeaconState)
- Podpis
- Odhalení RANDAO
- Graffiti – Navrhovatel bloku může do svého návrhu bloku zahrnout zprávu o délce 32 bajtů
- Data provádění
  - Hash bloku
  - Počet vkladů
  - Kořen vkladů (Deposit root)
- Atestace – Počet atestací pro blok v tomto slotu
- Vklady – Počet vkladů během tohoto slotu
- Dobrovolné odchody – Počet validátorů, kteří odešli během slotu
- Slashingy – Počet penalizací udělených navrhovatelům bloků nebo atestátorům
- Hlasy – Validátoři, kteří hlasovali pro blok v tomto slotu

### Bloky {#blocks-1}

Důkaz podílem (PoS) rozděluje čas na sloty a epochy. To tedy znamená nová data!

- Navrhovatel – Validátor, který byl algoritmicky vybrán k návrhu nového bloku
- Epocha – Epocha, ve které byl blok navržen
- Slot – Slot, ve kterém byl blok navržen
- Atestace – Počet atestací zahrnutých ve slotu – atestace jsou jako hlasy, které naznačují, že blok je připraven přejít do Beacon chainu

### Validátoři {#validators}

Validátoři jsou zodpovědní za navrhování bloků a jejich atestaci v rámci slotů.

- Číslo validátora – Jedinečné číslo, které představuje validátora
- Aktuální zůstatek – Zůstatek validátora včetně odměn
- Efektivní zůstatek – Zůstatek validátora, který se používá pro staking
- Příjem – Odměny nebo penalizace, které validátor obdržel
- Stav – Zda je validátor aktuálně online a aktivní, nebo ne
- Efektivita atestace – Průměrná doba, za kterou jsou atestace validátora zahrnuty do řetězce
- Způsobilost k aktivaci – Datum (a epocha), kdy se validátor stal dostupným pro validaci
- Aktivní od – Datum (a epocha), kdy se validátor stal aktivním
- Navržené bloky – Bloky, které validátor navrhl
- Atestace – Atestace, které validátor poskytl
- Vklady – Adresa odesílatele, hash transakce, číslo bloku, časové razítko, částka a stav stakingového vkladu provedeného validátorem

### Atestace {#attestations}

Atestace jsou hlasy „ano“ pro zahrnutí bloků do řetězce. Jejich data se vztahují k záznamu o atestaci a k validátorům, kteří atestovali

- Slot – Slot, ve kterém atestace proběhla
- Index výboru – Index výboru v daném slotu
- Agregační bity – Představují agregovanou atestaci všech zúčastněných validátorů v atestaci
- Validátoři – Validátoři, kteří poskytli atestace
- Kořen beacon bloku (Beacon block root) – Ukazuje na blok, který validátoři atestují
- Zdroj (Source) – Ukazuje na nejnovější ospravedlněnou epochu
- Cíl (Target) – Ukazuje na nejnovější hranici epochy
- Podpis

### Síť {#network-1}

Data nejvyšší úrovně vrstvy konsensu zahrnují následující:

- Aktuální epocha
- Aktuální slot
- Aktivní validátoři – Počet aktivních validátorů
- Čekající validátoři – Počet validátorů čekajících na aktivaci
- Stakované ETH – Množství ETH stakovaného v síti
- Průměrný zůstatek – Průměrný zůstatek ETH validátorů

## Další čtení {#further-reading}

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_

## Související témata {#related-topics}

- [Transakce](/developers/docs/transactions/)
- [Účty](/developers/docs/accounts/)
- [Sítě](/developers/docs/networks/)