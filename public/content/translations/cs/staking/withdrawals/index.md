---
title: Výběry ze stakingu
description: Stránka shrnující, co jsou push výběry ze stakingu, jak fungují a co musí stakeři udělat, aby získali své odměny
lang: cs
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Nosorožec Leslie se svými odměnami ze stakingu
sidebarDepth: 2
summaryPoints:
  - Provozovatelé validátorů musí poskytnout adresu pro výběr, aby umožnili výběry
  - Původním (legacy) validátorům je přebytečný zůstatek nad 32 ETH automaticky vybírán každých několik dní
  - Složení (compounding) validátoři získávají odměny z celého svého zůstatku až do výše 2048 ETH
  - Validátoři, kteří zcela ukončí staking, obdrží svůj zbývající zůstatek
---

**Výběry ze stakingu** označují převody ETH z účtu validátora na konsensuální vrstvě Etherea (beacon chain) do exekuční vrstvy, kde s ním lze provádět transakce.

Jak výběry fungují, závisí na typu pověření k výběru (withdrawal credential) vašeho validátora:

- **Původní validátoři (Typ 1)**: Přebytečný zůstatek nad 32 ETH je automaticky a pravidelně odesílán na adresu pro výběr spojenou s validátorem. Odměny nad 32 ETH nepřispívají k váze validátora v síti.
- **Složení validátoři (Typ 2)**: Odměny se skládají do efektivního zůstatku validátora až do výše 2048 ETH, což zvyšuje váhu validátora a přináší další odměny. Automaticky se vybírá pouze zůstatek přesahující 2048 ETH.

Uživatelé mohou také **zcela ukončit staking**, čímž se odemkne celý zůstatek jejich validátora.

## Odměny ze stakingu {#staking-rewards}

Způsob zpracování odměn závisí na typu pověření validátora:

**Původní validátoři (Typ 1)** mají efektivní zůstatek omezený na 32 ETH. Jakýkoli zůstatek nad 32 ETH získaný prostřednictvím odměn nepřispívá k jistině ani nezvyšuje váhu tohoto validátora v síti a je automaticky vybírán jako výplata odměny každých několik dní. Kromě jednorázového poskytnutí adresy pro výběr nevyžadují tyto odměny od provozovatele validátora žádnou akci. Vše je iniciováno na konsensuální vrstvě, takže v žádném kroku není vyžadováno palivo (transakční poplatek).

**Složení validátoři (Typ 2)** mohou mít efektivní zůstatek kdekoli mezi 32 a 2048 ETH. Odměny získané těmito validátory se skládají do jejich efektivního zůstatku, čímž se zvyšuje váha validátora a budoucí odměny. Automatické výběry (sweeps) probíhají pouze u zůstatku přesahujícího 2048 ETH. Pro výběr odměn pod hranicí 2048 ETH musí složení validátoři ručně spustit částečný výběr z exekuční vrstvy, což vyžaduje palivo.

### Jak jsme se sem dostali? {#how-did-we-get-here}

Během několika posledních let prošlo [Ethereum](/) několika vylepšeními sítě, které znamenaly přechod na síť zabezpečenou samotným ETH namísto energeticky náročné těžby, jak tomu bylo dříve. Účast na konsensu v síti Ethereum je nyní známá jako „staking“, protože účastníci dobrovolně uzamkli ETH a dali ho „všanc“ (at stake) za možnost podílet se na chodu sítě. Uživatelé, kteří dodržují pravidla, budou odměněni, zatímco pokusy o podvádění mohou být penalizovány.

Od spuštění vkladového kontraktu pro staking v listopadu 2020 někteří odvážní průkopníci Etherea dobrovolně uzamkli prostředky, aby aktivovali „validátory“, speciální účty, které mají právo formálně atestovat a navrhovat bloky podle pravidel sítě.

Před vylepšením Shanghai/Capella jste nemohli používat ani přistupovat ke svému stakovanému ETH. Nyní se však můžete rozhodnout automaticky přijímat své odměny na zvolený účet a můžete si také své stakované ETH kdykoli vybrat.

### Jak se mám připravit? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Důležitá upozornění {#important-notices}

Poskytnutí adresy pro výběr je povinným krokem pro každý účet validátora, než bude způsobilý k výběru ETH ze svého zůstatku.

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**Každému účtu validátora může být přiřazena pouze jedna adresa pro výběr, a to pouze jednou.** Jakmile je adresa vybrána a odeslána do konsensuální vrstvy, nelze to vrátit zpět ani znovu změnit. Před odesláním dvakrát zkontrolujte vlastnictví a přesnost poskytnuté adresy.
</AlertDescription>
</AlertContent>
</Alert>

Pokud toto neposkytnete, **nehrozí vašim prostředkům mezitím žádné nebezpečí**, za předpokladu, že vaše mnemotechnická/základní fráze zůstala v bezpečí offline a nebyla nijak kompromitována. Nepřidání pověření k výběru jednoduše ponechá ETH uzamčené na účtu validátora tak, jak tomu bylo doposud, dokud nebude poskytnuta adresa pro výběr.

## Složení validátoři {#compounding-validators}

Validátoři se mohou rozhodnout pro **skládání (compounding)** převedením svých pověření k výběru z Typu 1 na Typ 2. Tím se zvýší maximální efektivní zůstatek z 32 ETH na **2048 ETH**, což umožní, aby se odměny skládaly do efektivního zůstatku validátora namísto automatického vybírání.

Se zapnutým skládáním:

- Odměny zvyšují efektivní zůstatek validátora v krocích po 1 ETH (s ohledem na malou [hysterezní rezervu](https://www.attestant.io/posts/understanding-validator-effective-balance/)), čímž se postupem času získává více odměn
- Automatické výběry probíhají pouze u zůstatku přesahujícího 2048 ETH
- Částečné výběry pod hranicí 2048 ETH musí být spuštěny ručně z exekuční vrstvy (to stojí palivo)
- Více validátorů lze **konsolidovat** do jednoho složeného validátora, což snižuje provozní režii

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**Převod pověření k výběru z Typu 1 na Typ 2 je nevratný.** Jako oficiální nástroj pro tento převod použijte [Staking Launchpad](https://launchpad.ethereum.org/validator-actions). Další podrobnosti o procesu převodu, rizicích a konsolidaci naleznete v [hloubkovém rozboru MaxEB](/roadmap/pectra/maxeb/).
</AlertDescription>
</AlertContent>
</Alert>

## Úplné ukončení stakingu {#exiting-staking-entirely}

Poskytnutí adresy pro výběr je vyžadováno předtím, než mohou být _jakékoli_ prostředky převedeny ze zůstatku účtu validátora.

Uživatelé, kteří chtějí zcela ukončit staking a vybrat zpět celý svůj zůstatek, musí iniciovat „dobrovolné ukončení“ (voluntary exit). To lze provést dvěma způsoby:

- **Pomocí klíčů validátora**: Podepište a odvysílejte zprávu o dobrovolném ukončení pomocí svého klienta validátora, která bude odeslána vašemu konsensuálnímu síťovému uzlu. To nevyžaduje palivo.
- **Pomocí pověření k výběru**: Spusťte ukončení z exekuční vrstvy pomocí vaší adresy pro výběr, aniž byste potřebovali přístup k podpisovému klíči validátora. To vyžaduje transakci a stojí palivo.

Proces ukončení stakingu validátorem trvá různě dlouho v závislosti na tom, kolik dalších validátorů končí ve stejnou dobu. Po dokončení již tento účet nebude odpovědný za plnění povinností validátora v síti, nebude mít nárok na odměny a jeho ETH již nebude „všanc“ (at stake). V tomto okamžiku bude účet označen jako plně „vybratelný“ (withdrawable).

Jakmile je účet označen jako „vybratelný“ a byla poskytnuta pověření k výběru, uživatel nemusí dělat nic jiného než čekat. Účty jsou automaticky a nepřetržitě prohledávány navrhovateli bloků kvůli způsobilým ukončeným prostředkům a zůstatek vašeho účtu bude v plné výši převeden (známé také jako „úplný výběr“) během dalšího <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>výběru (sweep)</a>.

## Kdy byly povoleny výběry ze stakingu? {#when}

Funkce výběru byla původně povolena jako součást vylepšení Shanghai/Capella dne **12. dubna 2023**. [Vylepšení Pectra](/roadmap/pectra/) (květen 2025) později zavedlo složené validátory s vyšším maximálním efektivním zůstatkem 2048 ETH, stejně jako ukončení a částečné výběry spouštěné z exekuční vrstvy.

Vylepšení Shanghai/Capella umožnilo získat dříve stakované ETH zpět na běžné účty Etherea. Tím se uzavřel kruh likvidity stakingu a Ethereum se posunulo o krok blíže na své cestě k budování udržitelného, škálovatelného a bezpečného decentralizovaného ekosystému.

- [Více o historii Etherea](/ethereum-forks/)
- [Více o plánu vylepšení Etherea](/roadmap/)

## Jak fungují výplaty výběrů? {#how-do-withdrawals-work}

Zda má daný validátor nárok na výběr či nikoli, je určeno samotným stavem účtu validátora. K určení, zda má být u účtu zahájen výběr, není v žádném okamžiku zapotřebí žádný zásah uživatele – celý proces probíhá automaticky v nepřetržité smyčce na konsensuální vrstvě.

### Učíte se raději vizuálně? {#visual-learner}

Podívejte se na toto vysvětlení výběrů ze stakingu Etherea od Finematics:

<YouTube id="RwwU3P9n3uo" />

### „Prohledávání“ (sweeping) validátorů {#validator-sweeping}

Když je validátor naplánován k navržení dalšího bloku, je povinen vytvořit frontu výběrů s až 16 způsobilými výběry. To se provádí tak, že se původně začne s indexem validátora 0, určí se, zda pro tento účet existuje způsobilý výběr podle pravidel protokolu, a pokud ano, přidá se do fronty. Validátor, který má navrhnout následující blok, naváže tam, kde předchozí skončil, a postupuje v pořadí donekonečna.

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
Představte si analogové hodiny. Ručička na hodinách ukazuje na hodinu, postupuje jedním směrem, nepřeskakuje žádné hodiny a po dosažení posledního čísla se nakonec vrátí zpět na začátek.

Nyní si místo 1 až 12 představte, že hodiny mají 0 až N _(celkový počet účtů validátorů, které kdy byly zaregistrovány na konsensuální vrstvě, přes 500 000 k lednu 2023)._

Ručička na hodinách ukazuje na dalšího validátora, kterého je třeba zkontrolovat ohledně způsobilých výběrů. Začíná na 0 a postupuje dokola bez přeskočení jakýchkoli účtů. Když je dosaženo posledního validátora, cyklus pokračuje zpět na začátku.
</AlertDescription>
</AlertContent>
</Alert>

#### Kontrola účtu pro výběry {#checking-an-account-for-withdrawals}

Zatímco navrhovatel prohledává validátory kvůli možným výběrům, každý kontrolovaný validátor je vyhodnocen pomocí krátké série otázek, aby se určilo, zda by měl být spuštěn výběr, a pokud ano, kolik ETH by mělo být vybráno.

1. **Byla poskytnuta adresa pro výběr?** Pokud nebyla poskytnuta žádná adresa pro výběr, účet je přeskočen a není zahájen žádný výběr.
2. **Ukončil validátor činnost a je vybratelný?** Pokud validátor zcela ukončil činnost a dosáhli jsme epochy, kdy je jeho účet považován za „vybratelný“, bude zpracován úplný výběr. Tím se převede celý zbývající zůstatek na adresu pro výběr.
3. **Přesahuje zůstatek maximální efektivní zůstatek?** Pro původní (Typ 1) validátory je tato hranice 32 ETH. Pro složené (Typ 2) validátory je tato hranice 2048 ETH. Pokud má účet pověření k výběru, není zcela ukončen a má zůstatek nad svou hranicí, bude zpracován částečný výběr, který převede pouze přebytek na adresu pro výběr uživatele.

Během životního cyklu validátora provádějí provozovatelé validátorů pouze dvě akce, které tento tok přímo ovlivňují:

- Poskytnutí pověření k výběru pro umožnění jakékoli formy výběru
- Ukončení činnosti v síti, což spustí úplný výběr

### Bez poplatků za palivo {#gas-free}

Automatické prohledávání výběrů nevyžaduje, aby stakeři ručně odesílali transakci. To znamená, že pro automatické prohledávání **není vyžadováno žádné palivo (transakční poplatek)** a nesoutěží o stávající prostor v bloku exekuční vrstvy.

Vezměte na vědomí, že [složení validátoři](#compounding-validators), kteří chtějí spustit částečný výběr pod hranicí 2048 ETH, tak musí učinit ručně z exekuční vrstvy, což vyžaduje palivo.

### Jak často budu dostávat své odměny ze stakingu? {#how-soon}

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

Jak vidíte, toto se zpomaluje s tím, jak je v síti více validátorů. Nárůst zmeškaných slotů by to mohl úměrně zpomalit, ale to bude obecně představovat pomalejší stranu možných výsledků.

## Často kladené dotazy {#faq}

<ExpandableCard
title="Jakmile poskytnu adresu pro výběr, mohu ji změnit na alternativní adresu pro výběr?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Ne, proces poskytnutí pověření k výběru je jednorázový a po odeslání jej nelze změnit.
</ExpandableCard>

<ExpandableCard
title="Proč lze adresu pro výběr nastavit pouze jednou?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
Nastavením adresy pro výběr na exekuční vrstvě se pověření k výběru pro daného validátora trvale změnila. To znamená, že stará pověření již nebudou fungovat a nová pověření směřují na účet exekuční vrstvy.

Adresy pro výběr mohou být buď smart kontrakt (řízený svým kódem), nebo účet vlastněný uživatelem (EOA, řízený svým soukromým klíčem). V současné době tyto účty nemají způsob, jak odeslat zprávu zpět do konsensuální vrstvy, která by signalizovala změnu pověření validátora, a přidání této funkce by do protokolu vneslo zbytečnou složitost.

Jako alternativu ke změně adresy pro výběr u konkrétního validátora si uživatelé mohou zvolit nastavení smart kontraktu jako své adresy pro výběr, který by mohl zvládnout rotaci klíčů, jako je například Safe. Uživatelé, kteří nastaví své prostředky na svůj vlastní EOA, mohou provést úplné ukončení, aby vybrali všechny své stakované prostředky, a poté je znovu stakovat pomocí nových pověření.
</ExpandableCard>

<ExpandableCard
title="Co když se účastním stakingu tokenů nebo sdruženého stakingu?"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

Pokud jste součástí [stakingového fondu](/staking/pools/) nebo držíte stakingové tokeny, měli byste se u svého poskytovatele informovat o dalších podrobnostech ohledně toho, jak jsou zpracovávány výběry ze stakingu, protože každá služba funguje jinak.

Obecně by uživatelé měli mít možnost získat zpět své podkladové stakované ETH nebo změnit poskytovatele stakingu, kterého využívají. Pokud se konkrétní fond stává příliš velkým, prostředky lze vybrat, vyplatit a znovu stakovat u [menšího poskytovatele](https://rated.network/). Nebo, pokud jste nashromáždili dostatek ETH, mohli byste [stakovat z domova](/staking/solo/).

</ExpandableCard>

<ExpandableCard
title="Probíhají výplaty odměn (částečné výběry) automaticky?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
Pro **původní (Typ 1) validátory**, ano — pokud váš validátor poskytl adresu pro výběr. Ta musí být poskytnuta jednou, aby se zpočátku umožnily jakékoli výběry, poté budou výplaty odměn automaticky spouštěny každých několik dní při každém prohledávání validátorů.

U **složených (Typ 2) validátorů** se odměny skládají do efektivního zůstatku, místo aby byly vybírány. Automatické výběry probíhají pouze u zůstatku přesahujícího 2048 ETH. Chcete-li vybrat odměny pod touto hranicí, musíte ručně spustit částečný výběr z exekuční vrstvy.
</ExpandableCard>

<ExpandableCard
title="Probíhají úplné výběry automaticky?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

Ne, pokud je váš validátor v síti stále aktivní, úplný výběr neproběhne automaticky. To vyžaduje ruční iniciaci dobrovolného ukončení.

Jakmile validátor dokončí proces ukončení a za předpokladu, že účet má pověření k výběru, zbývající zůstatek bude _poté_ vybrán během dalšího <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "FAQ happen automatically (sweep)", eventName: "click" }}>prohledávání validátorů</a>.

</ExpandableCard>

<ExpandableCard title="Mohu vybrat vlastní částku?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
U **původních (Typ 1) validátorů** jsou výběry odesílány automaticky a převádějí jakékoli ETH, které aktivně nepřispívá ke vkladu (stake). To zahrnuje plné zůstatky u účtů, které dokončily proces ukončení. U validátorů Typu 1 není možné ručně požadovat výběr konkrétních částek ETH.

**Složení (Typ 2) validátoři** mohou spustit částečné výběry konkrétní částky z exekuční vrstvy, pokud zbývající zůstatek zůstane na nebo nad 32 ETH. To vyžaduje transakci a stojí palivo.
</ExpandableCard>

<ExpandableCard
title="Provozuji validátor. Kde najdu více informací o povolení výběrů?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

Provozovatelům validátorů doporučujeme navštívit stránku [Staking Launchpad Withdrawals](https://launchpad.ethereum.org/withdrawals/), kde najdete další podrobnosti o tom, jak připravit svůj validátor na výběry, načasování událostí a další podrobnosti o tom, jak výběry fungují.

Chcete-li si své nastavení nejprve vyzkoušet na testnetu, navštivte [Hoodi Testnet Staking Launchpad](https://hoodi.launchpad.ethereum.org) a začněte.

</ExpandableCard>

<ExpandableCard
title="Mohu po ukončení znovu aktivovat svůj validátor vložením dalšího ETH?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Ne. Jakmile validátor ukončí činnost a jeho celý zůstatek je vybrán, jakékoli další prostředky vložené na tento validátor budou automaticky převedeny na adresu pro výběr během dalšího prohledávání validátorů. Pro opětovné stakování ETH musí být aktivován nový validátor.
</ExpandableCard>

<ExpandableCard
title="Jaký je rozdíl mezi původními a složenými validátory?"
eventCategory="FAQ"
eventAction="What is the difference between legacy and compounding validators?"
eventName="read more">
Původní validátoři používají pověření k výběru **Typu 1** a mají efektivní zůstatek omezený na 32 ETH. Jakýkoli přebytek je automaticky vybírán na adresu pro výběr každých několik dní.

Složení validátoři používají pověření k výběru **Typu 2** a mohou mít efektivní zůstatek až 2048 ETH. Odměny se skládají do jejich efektivního zůstatku, čímž se zvyšuje váha validátora v síti a budoucí odměny. Automatické výběry probíhají pouze u zůstatku přesahujícího 2048 ETH. Pro výběr pod touto hranicí musí být ručně spuštěn částečný výběr z exekuční vrstvy.

Další podrobnosti naleznete v [hloubkovém rozboru MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

<ExpandableCard
title="Jak přejdu na složeného validátora?"
eventCategory="FAQ"
eventAction="How do I convert to a compounding validator?"
eventName="read more">
Pověření k výběru z Typu 1 na Typ 2 můžete převést pomocí [Staking Launchpad](https://launchpad.ethereum.org/validator-actions). Tato operace je **nevratná** — jakmile provedete převod, nemůžete se vrátit k pověřením Typu 1.

Po převodu můžete také **konsolidovat** více validátorů do jednoho a spojit jejich zůstatky do jediného složeného validátora. Úplný návod k procesu převodu, rizikům a nástrojům pro konsolidaci naleznete v [hloubkovém rozboru MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

## Další čtení {#further-reading}

- [Staking Launchpad Withdrawals](https://launchpad.ethereum.org/withdrawals)
- [Staking Launchpad Validator Actions](https://launchpad.ethereum.org/validator-actions)
- [Hloubkový rozbor MaxEB: skládání a konsolidace](/roadmap/pectra/maxeb/)
- [EIP-4895: Beacon chain push withdrawals as operations](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94: Staked ETH Withdrawal (Testing) with Potuz & Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Beacon chain push withdrawals as operations with Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Understanding Validator Effective Balance](https://www.attestant.io/posts/understanding-validator-effective-balance/)