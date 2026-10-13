---
title: Výběry ze stakingu
description: Stránka shrnující, co jsou push výběry ze stakingu, jak fungují a co musí stakeři udělat, aby získali své odměny.
lang: cs
template: staking
image: /images/staking/leslie-withdrawal.png
sidebarDepth: 2
summaryPoints:
  - Provozovatelé validátorů musí poskytnout adresu pro výběr, aby umožnili výběry.
  - Starším validátorům (legacy) se přebytečný zůstatek nad 32 ETH automaticky vybírá každých několik dní.
  - Skládaní validátoři (compounding) získávají odměny z celého svého zůstatku až do výše 2048 ETH.
  - Validátoři, kteří zcela ukončí staking, obdrží svůj zbývající zůstatek.
---

**Výběry ze stakingu** označují převody ETH z účtu validátora na vrstvě konsensu [Etherea](/) (Beacon chain) do exekuční vrstvy, kde s ním lze provádět transakce.

> Pokud jste součástí [stakingového poolu](/staking/pools/) nebo držíte stakingové tokeny, měli byste se u svého poskytovatele informovat o podrobnostech, jak jsou výběry ze stakingu řešeny, protože každá služba funguje jinak.

Jak výběry fungují, závisí na typu pověření k výběru vašeho validátora:

- **Starší validátoři (Typ 1)**: Přebytečný zůstatek nad 32 ETH je automaticky a pravidelně odesílán na adresu pro výběr spojenou s validátorem. Odměny nad 32 ETH nepřispívají k váze validátora v síti.
- **Skládaní validátoři (Typ 2)**: Odměny se skládají do efektivního zůstatku validátora až do výše 2048 ETH, což zvyšuje váhu validátora a přináší další odměny. Automaticky se vybírá pouze zůstatek přesahující 2048 ETH.

Uživatelé mohou také **zcela ukončit staking**, odeslat transakci pro výběr, počkat ve frontě na výběr (v závislosti na poptávce v síti) a odemknout celý zůstatek svého validátora.

## Odměny ze stakingu {#staking-rewards}

Způsob zpracování odměn závisí na typu pověření validátora:

**Starší validátoři (Typ 1)** mají efektivní zůstatek omezený na 32 ETH. Jakýkoli zůstatek nad 32 ETH získaný jako odměny ze sítě nepřispívá k efektivnímu zůstatku ani nezvyšuje váhu tohoto validátora v síti a tyto odměny jsou automaticky vybírány na vyhrazenou adresu pro výběr validátora každých několik dní. Kromě jednorázového poskytnutí adresy pro výběr nevyžaduje nárokování těchto odměn od provozovatele validátora žádnou akci. Vše je iniciováno na vrstvě konsensu, takže v žádném kroku není vyžadován gas (transakční poplatek).

**Skládaní validátoři (Typ 2)** mohou mít efektivní zůstatek kdekoli mezi 32 a 2048 ETH. Odměny ze sítě, které tito validátoři obdrží, se skládají do jejich efektivního zůstatku, čímž se zvyšuje váha validátora a potenciál získat budoucí odměny. K automatickému výběru dochází pouze u zůstatku přesahujícího 2048 ETH. Pro výběr odměn pod hranicí 2048 ETH musí skládaní validátoři ručně spustit částečný výběr z exekuční vrstvy, což vyžaduje gas.

### Jak jsme se sem dostali? {#how-did-we-get-here}

Během několika posledních let prošlo Ethereum několika upgrady sítě, které znamenaly přechod na síť zabezpečenou samotným ETH namísto energeticky náročné těžby, jak tomu bylo dříve. Účast na konsensu v Ethereu je nyní známá jako „staking“, protože účastníci dobrovolně uzamkli ETH a dali jej „všanc“ (at stake) za možnost podílet se na chodu sítě. Uživatelé, kteří dodržují pravidla, budou odměněni, zatímco pokusy o podvádění mohou být penalizovány.

Od spuštění kontraktu pro stakingový vklad v listopadu 2020 někteří odvážní průkopníci Etherea dobrovolně uzamkli prostředky, aby aktivovali „validátory“, speciální účty, které mají právo formálně atestovat a navrhovat bloky podle pravidel sítě.

Před upgradem Šanghaj/Capella jste nemohli používat ani přistupovat ke svému stakovanému ETH. Nyní se však můžete rozhodnout, že budete automaticky dostávat své odměny na zvolený účet, a můžete si také své stakované ETH kdykoli vybrat.

### Jak se mám připravit? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Důležitá upozornění {#important-notices}

Účty validátorů musí poskytnout adresu pro výběr, než budou moci přistupovat k nashromážděným odměnám ze sítě a vybírat je, nebo zpracovat úplný výběr při výstupu ze stakingu.

<Alert variant="warning">
<AlertIcon size="lg"><TriangleAlert /></AlertIcon>
<AlertContent>
<AlertDescription>
**Každému účtu validátora může být přiřazena pouze jedna adresa pro výběr, a to jednorázově.** Jakmile je adresa vybrána a odeslána do vrstvy konsensu, nelze to vrátit zpět ani znovu změnit. Před odesláním dvakrát zkontrolujte vlastnictví a přesnost poskytnuté adresy.
</AlertDescription>
</AlertContent>
</Alert>

Pokud jste pro svůj účet validátora ještě neposkytli adresu pro výběr, **vaše prostředky nejsou mezitím v ohrožení**, za předpokladu, že vaše mnemotechnická pomůcka/seed fráze zůstala v bezpečí offline a nebyla nijak kompromitována. Nepřidání pověření k výběru jednoduše ponechá ETH uzamčené na účtu validátora, dokud nebude poskytnuta adresa pro výběr.

## Skládaní validátoři {#compounding-validators}

Validátoři se mohou rozhodnout pro **skládání (compounding)** převedením svých pověření k výběru z Typu 1 na Typ 2. Tím se zvýší maximální efektivní zůstatek z 32 ETH na **2048 ETH**, což umožní, aby se odměny skládaly do efektivního zůstatku validátora namísto automatického výběru.

Se zapnutým skládáním:

- Odměny zvyšují efektivní zůstatek validátora v krocích po 1 ETH (s ohledem na malou [hysterezní rezervu](https://www.attestant.io/posts/understanding-validator-effective-balance/)), čímž se postupem času získává více odměn.
- K automatickým výběrům dochází pouze u zůstatku přesahujícího 2048 ETH.
- Částečné výběry pod hranicí 2048 ETH musí být spuštěny ručně z exekuční vrstvy (to stojí gas).
- Více validátorů lze **konsolidovat** do jednoho skládaného validátora, což snižuje provozní režii.

<Alert variant="warning">
<AlertIcon size="lg"><TriangleAlert /></AlertIcon>
<AlertContent>
<AlertDescription>
**Převod pověření k výběru z Typu 1 na Typ 2 je nevratný.** Jako oficiální nástroj pro tento převod použijte [Staking Launchpad](https://launchpad.ethereum.org/validator-actions). Další podrobnosti o procesu převodu, rizicích a konsolidaci naleznete v [podrobném průvodci MaxEB](/roadmap/pectra/maxeb/).
</AlertDescription>
</AlertContent>
</Alert>

## Úplný výstup ze stakingu {#exiting-staking-entirely}

Poskytnutí adresy pro výběr je vyžadováno předtím, než mohou být _jakékoli_ prostředky převedeny ze zůstatku účtu validátora.

Uživatelé, kteří chtějí zcela ukončit staking a vybrat zpět celý svůj zůstatek, musí iniciovat „dobrovolný výstup“. To lze provést dvěma způsoby:

- **Pomocí klíčů validátora**: Podepište a odešlete zprávu o dobrovolném výstupu pomocí svého klienta validátora, která bude odeslána vašemu uzlu konsensu. To nevyžaduje gas.
- **Pomocí pověření k výběru**: Spusťte výstup z exekuční vrstvy pomocí vaší adresy pro výběr, aniž byste potřebovali přístup k podepisovacímu klíči validátora. To vyžaduje transakci a stojí gas.

Proces výstupu validátora ze stakingu trvá různě dlouho v závislosti na tom, kolik dalších validátorů vystupuje ve stejnou dobu. Po dokončení již tento účet nebude odpovědný za plnění povinností validátora v síti, nebude mít nárok na odměny a jeho ETH již nebude „všanc“ (at stake). V tomto okamžiku bude účet označen jako plně „vybratelný“ (withdrawable).

Jakmile je účet označen jako „vybratelný“ a byla poskytnuta pověření k výběru, uživatel nemusí dělat nic jiného než čekat. Účty jsou automaticky a nepřetržitě prohledávány navrhovateli bloků kvůli způsobilým prostředkům k výstupu a zůstatek vašeho účtu bude v plné výši převeden (tzv. „úplný výběr“) během dalšího <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>prohledávání (sweep)</a>.

## Jak fungují automatické odměny (validátor Typu 1)? {#how-do-withdrawals-work}

Zda má daný validátor nárok na výběr, či nikoli, je určeno samotným stavem účtu validátora. K určení, zda má být u účtu zahájen výběr, není v žádném okamžiku nutný žádný zásah uživatele – celý proces probíhá automaticky na vrstvě konsensu v nepřetržité smyčce.

### Učíte se raději vizuálně? {#visual-learner}

Podívejte se na toto vysvětlení výběrů ze stakingu Etherea od Finematics:

<VideoWatch slug="ethereum-staking-withdrawals" />

### „Prohledávání“ (sweeping) validátorů {#validator-sweeping}

Když je validátor naplánován k navržení dalšího bloku, je povinen vytvořit frontu výběrů, která obsahuje až 16 způsobilých výběrů. To se provádí tak, že se začne s indexem validátora 0, určí se, zda pro tento účet existuje způsobilý výběr podle pravidel protokolu, a pokud ano, přidá se do fronty. Validátor, který má navrhnout následující blok, naváže tam, kde předchozí skončil, a postupuje v pořadí donekonečna.

<Alert variant="update">
<AlertIcon size="xl"><Clock /></AlertIcon>
<AlertContent>
<AlertDescription>
Představte si analogové hodiny. Ručička na hodinách ukazuje na hodinu, postupuje jedním směrem, nepřeskakuje žádné hodiny a po dosažení posledního čísla se nakonec vrátí zpět na začátek.

Nyní si místo 1 až 12 představte, že hodiny mají 0 až N _(přičemž N je celkový počet účtů validátorů, které kdy byly zaregistrovány na vrstvě konsensu, což je k dubnu 2026 více než 1,2 milionu)._

Ručička na hodinách ukazuje na dalšího validátora, kterého je třeba zkontrolovat ohledně způsobilých výběrů. Začíná na 0 a postupuje dokola, aniž by přeskočila jakýkoli účet. Když je dosaženo posledního validátora, cyklus pokračuje zpět na začátku.
</AlertDescription>
</AlertContent>
</Alert>

#### Kontrola účtu pro výběry {#checking-an-account-for-withdrawals}

Zatímco navrhovatel prohledává validátory kvůli možným výběrům, každý kontrolovaný validátor je vyhodnocen na základě krátké série otázek, aby se určilo, zda by měl být spuštěn výběr, a pokud ano, kolik ETH by mělo být vybráno.

1. **Byla poskytnuta adresa pro výběr?** Pokud nebyla poskytnuta žádná adresa pro výběr, účet je přeskočen a není zahájen žádný výběr.
2. **Vystoupil validátor a je vybratelný?** Pokud validátor plně vystoupil a dosáhli jsme epochy, kdy je jeho účet považován za „vybratelný“, bude zpracován úplný výběr. Tím se převede celý zbývající zůstatek na adresu pro výběr.
3. **Přesahuje zůstatek jeho maximální efektivní zůstatek?** U starších validátorů (Typ 1) je tato hranice 32 ETH. U skládaných validátorů (Typ 2) je tato hranice 2048 ETH. Pokud má účet pověření k výběru, není plně vystoupen, má efektivní zůstatek na maximu a má zůstatek nad touto hranicí, bude zpracován částečný výběr, který převede pouze přebytek na adresu pro výběr uživatele.

Existují pouze dvě akce, které provozovatelé validátorů provádějí v průběhu životního cyklu validátora a které tento tok přímo ovlivňují:

- Poskytnutí pověření k výběru pro umožnění jakékoli formy výběru
- Výstup ze sítě, který spustí úplný výběr

### Bez poplatků za gas {#gas-free}

Automatické prohledávání výběrů nevyžaduje, aby stakeři ručně odesílali transakci. To znamená, že pro automatické prohledávání **není vyžadován žádný gas (transakční poplatek)** a nesoutěží o stávající prostor v bloku exekuční vrstvy.

Vezměte na vědomí, že [skládaní validátoři](#compounding-validators), kteří chtějí spustit částečný výběr pod hranicí 2048 ETH, tak musí učinit ručně z exekuční vrstvy, což vyžaduje gas.

### Jak často budou mé odměny ze stakingu odemčeny a dostupné v mé peněžence? {#how-soon}

V jednom bloku lze zpracovat maximálně 16 výběrů. Při této rychlosti lze zpracovat 115 200 výběrů validátorů denně (za předpokladu, že nedojde k žádným zmeškaným slotům). Jak bylo uvedeno výše, validátoři bez způsobilých výběrů budou přeskočeni, což zkracuje dobu potřebnou k dokončení prohledávání.

Rozšířením tohoto výpočtu můžeme odhadnout dobu, kterou zabere zpracování daného počtu výběrů:

<TableContainer>

| Počet výběrů | Doba dokončení |
| :-------------------: | :--------------: |
|        400 000        |     3,5 dne     |
|        500 000        |     4,3 dne     |
|        600 000        |     5,2 dne     |
|        700 000        |     6,1 dne     |
|        800 000        |     7,0 dní     |

</TableContainer>

Jak vidíte, tento proces se zpomaluje s tím, jak je v síti více validátorů. Nárůst zmeškaných slotů by to mohl úměrně zpomalit, ale to bude obecně představovat pomalejší stranu možných výsledků.

## Často kladené dotazy {#faq}

<ExpandableCard
title="Jakmile zadám adresu pro výběr, mohu ji změnit na jinou adresu pro výběr?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Ne, proces poskytnutí pověření k výběru je jednorázový a po odeslání jej nelze změnit.
</ExpandableCard>

<ExpandableCard
title="Proč lze adresu pro výběr validátoru nastavit pouze jednou?"
eventCategory="FAQ"
eventAction="Why can a validator's withdrawal address only be set once?"
eventName="read more">
Nastavení adresy pro výběr na exekuční vrstvě validátora je trvalá změna pověření validátora na vrstvě konsensu. Jakmile jsou pověření na vrstvě konsensu zaregistrována, neexistuje způsob, jak je aktualizovat.

Pověření adresy pro výběr validátora lze nastavit tak, aby ukazovala buď na chytrý kontrakt (řízený jeho kódem), nebo na externě vlastněný účet (EOA, řízený jeho soukromým klíčem). Ačkoli výběry spouštěné exekuční vrstvou ([EIP-7002](https://eips.ethereum.org/EIPS/eip-7002)) nyní umožňují adrese pro výběr spouštět výstupy a částečné výběry, neexistuje žádná operace protokolu pro změnu adresy pro výběr po její registraci a přidání této funkce by protokolu přidalo zbytečnou složitost.

Uživatelé, kteří hledají flexibilní správu výběrů, mohou jako adresu pro výběr validátora nastavit peněženku s chytrým kontraktem schopnou rotace klíčů (jako je [Safe](https://safe.global/)), což efektivně umožňuje aktualizovat konečného příjemce EOA. Pokud uživatel již nastavil EOA jako pověření k výběru, musí iniciovat úplný výstup, aby získal zpět své stakované ETH, a poté tyto prostředky použít k aktivaci nového validátora s jinými pověřeními.
</ExpandableCard>

<ExpandableCard
title="Jak mohu provést výběr ze stakingu, pokud stakuji přes poskytovatele, stakingový pool nebo se účastním pomocí tokenů likvidního stakingu?"
eventCategory="FAQ"
eventAction="How do I withdraw from staking if I stake through a provider, staking pool, or participate with liquid staking tokens?"
eventName="read more">
Pokud používáte [stakingový pool](/staking/pools/) nebo držíte tokeny likvidního stakingu (LST), neinteragujete s mechanismem výběru protokolu přímo; chytré kontrakty poolu a provozovatelé uzlů ovládají validátory a pověření k výběru obvykle ukazují na kontrakty poolu, nikoli na vás. Místo toho obvykle buď uplatníte své tokeny prostřednictvím poskytovatele (v závislosti na jeho frontě pro uplatnění a dostupné likviditě), nebo je prodáte na otevřeném trhu. Kontaktujte svého poskytovatele a zjistěte, jak řeší výběry, protože procesy se u jednotlivých služeb liší.

Obecně platí, že při stakingu prostřednictvím poskytovatele nebo poolu byste měli mít možnost získat zpět své podkladové stakované ETH nebo je vybrat a změnit poskytovatele stakingu, kterého využíváte. Pokud se konkrétní pool stává příliš velkým, stakované ETH lze vybrat, uplatnit a znovu stakovat u [menšího poskytovatele](https://rated.network/). Nebo, pokud jste nashromáždili dostatek ETH, můžete [stakovat z domova](/staking/solo/).

</ExpandableCard>

<ExpandableCard
title="Probíhá nárokování síťových odměn (částečné výběry) automaticky?"
eventCategory="FAQ"
eventAction="Does claiming network rewards (partial withdrawals) happen automatically?"
eventName="read more">
Pro **starší validátory (Typ 1)** ano – pokud váš validátor poskytl adresu pro výběr. Ta musí být poskytnuta jednou, aby byly umožněny jakékoli výběry, poté bude distribuce odměn ze sítě na adresu pro výběr automaticky spouštěna každých několik dní s každým prohledáváním validátorů.

U **skládaných validátorů (Typ 2)** se odměny skládají do efektivního zůstatku validátora (až do 2048 ETH), místo aby byly vybírány na adresu pro výběr. K automatickým výběrům dochází pouze u zůstatků přesahujících 2048 ETH. Chcete-li vybrat odměny pod touto hranicí, musíte ručně spustit částečný výběr z exekuční vrstvy.
</ExpandableCard>

<ExpandableCard title="Mohu vybrat vlastní částku?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
U **starších validátorů (Typ 1)** jsou jakékoli odměny ze sítě v ETH, které se nashromáždily nad efektivní zůstatek validátora 32 ETH, automaticky odeslány na adresu pro výběr. Validátorům Typu 1, kteří odeslali transakci pro úplný výběr a dokončili proces výstupu ze stakingu, je na jejich adresu pro výběr vybrán celý jejich zůstatek ETH. Není možné, aby validátor Typu 1 ručně požádal o výběr konkrétní částky ETH.

**Skládaní validátoři (Typ 2)** mohou spustit částečné výběry konkrétní částky z exekuční vrstvy, pokud zbývající zůstatek validátora zůstane na nebo nad 32 ETH. To vyžaduje odeslání transakce pro částečný výběr a stojí to gas.
</ExpandableCard>

<ExpandableCard
title="Provozuji validátor. Kde najdu více informací o správě procesu výběru?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information about managing the withdrawal process?"
eventName="read more">

Provozovatelům validátorů doporučujeme navštívit stránku [Výběry na Staking Launchpadu](https://launchpad.ethereum.org/withdrawals/), kde najdete další podrobnosti o tom, jak připravit svůj validátor na výběry, načasování událostí a další podrobnosti o tom, jak výběry fungují.

Chcete-li si své nastavení nejprve vyzkoušet na testnetu, navštivte [Hoodi Testnet Staking Launchpad](https://hoodi.launchpad.ethereum.org) a začněte.

</ExpandableCard>

<ExpandableCard
title="Mohu svůj validátor po výstupu znovu aktivovat vložením dalšího ETH?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Ne. Jakmile validátor vystoupí a jeho celý zůstatek je vybrán, jakékoli další ETH vložené na tohoto validátora bude automaticky převedeno na adresu pro výběr během dalšího prohledávání validátorů. Chcete-li znovu začít stakovat pomocí tohoto ETH, musíte aktivovat nového validátora.
</ExpandableCard>

<ExpandableCard
title="Jaký je rozdíl mezi původními a kompaundujícími validátory?"
eventCategory="FAQ"
eventAction="What is the difference between legacy and compounding validators?"
eventName="read more">
Starší validátoři používají pověření k výběru **Typu 1** (adresa pověření k výběru začíná na 0x01) a mají efektivní zůstatek omezený na 32 ETH. Jakékoli přebytečné ETH získané jako odměny ze sítě je automaticky vybíráno na adresu pro výběr každých několik dní.

Skládaní validátoři používají pověření k výběru **Typu 2** (adresa pověření k výběru začíná na 0x02) a mohou mít efektivní zůstatek až 2048 ETH. Odměny se skládají do efektivního zůstatku validátora, čímž se zvyšuje váha validátora v síti a potenciál získat budoucí odměny. K automatickým výběrům dochází pouze u zůstatku přesahujícího 2048 ETH. Pro výběr ETH pod touto hranicí musí být ručně spuštěn částečný výběr z exekuční vrstvy.

Další podrobnosti naleznete v [podrobném průvodci MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

<ExpandableCard
title="Jak mohu přejít na kompaundující validátor?"
eventCategory="FAQ"
eventAction="How do I convert to a compounding validator?"
eventName="read more">
Pověření k výběru z Typu 1 na Typ 2 můžete převést pomocí [Staking Launchpadu](https://launchpad.ethereum.org/validator-actions). Tato operace je **nevratná** — jakmile provedete převod, nemůžete se vrátit k pověřením Typu 1.

Po převodu můžete také **konsolidovat** více validátorů do jednoho a spojit jejich zůstatky do jednoho skládaného validátora. Úplný návod k procesu převodu, rizikům a nástrojům pro konsolidaci naleznete v [podrobném průvodci MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

<ExpandableCard
title="Kdy byly povoleny výběry ze stakingu?"
eventCategory="FAQ"
eventAction="When were staking withdrawals enabled?"
eventName="read more">
Funkce výběru byla původně povolena jako součást upgradu Šanghaj/Capella dne **12. dubna 2023**. [Upgrade Pectra](/roadmap/pectra/) (květen 2025) později představil skládané validátory s vyšším maximálním efektivním zůstatkem 2048 ETH, stejně jako výstupy a částečné výběry spouštěné exekuční vrstvou.

Upgrade Šanghaj/Capella umožnil získat dříve stakované ETH zpět na běžné účty Etherea. Tím se uzavřel kruh likvidity stakingu a Ethereum se posunulo o krok blíže na své cestě k budování udržitelného, škálovatelného a bezpečného decentralizovaného ekosystému.

- [Více o historii Etherea](/ethereum-forks/)
- [Více o roadmapě Etherea](/roadmap/)
</ExpandableCard>

## Další čtení {#further-reading}

- [Výběry na Staking Launchpadu](https://launchpad.ethereum.org/withdrawals)
- [Akce validátora na Staking Launchpadu](https://launchpad.ethereum.org/validator-actions)
- [Podrobný průvodce MaxEB: skládání a konsolidace](/roadmap/pectra/maxeb/)
- [EIP-4895: Push výběry z Beacon chainu jako operace](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94: Výběr stakovaného ETH (testování) s Potuzem a Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Push výběry z Beacon chainu jako operace s Alexem Stokesem](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Porozumění efektivnímu zůstatku validátora](https://www.attestant.io/posts/understanding-validator-effective-balance/)

<StakingCommunityCallout className="my-16" />