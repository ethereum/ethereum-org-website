---
title: Delegovaný staking (staking jako služba)
description: Přehled toho, jak začít s delegovaným stakingem
lang: cs
template: staking
image: /images/staking/leslie-saas.png
sidebarDepth: 2
summaryPoints:
  - Provozovatelé uzlů třetích stran zajišťují provoz vašeho klienta validátoru
  - Skvělá volba pro každého s 32 ETH, kdo se nechce zabývat technickou složitostí provozování uzlu
  - Delegace pokrývá široké spektrum, od služeb, kde si ponecháváte své klíče pro výběr, až po plně kustodiální burzy
---

## Co je delegovaný staking? {#what-is-staking-as-a-service}

Delegovaný staking představuje kategorii služeb stakingu, kde vložíte vlastních 32 ETH pro validátor, ale delegujete provoz uzlu na provozovatele třetí strany. Proces obvykle zahrnuje průvodce počátečním nastavením, včetně generování klíčů a vkladu, a následné nahrání vašich podpisových klíčů provozovateli. Vy poskytnete ETH, ale provoz hardwaru validátoru přenecháte někomu jinému.

Protokol [Ethereum](/) nativně nepodporuje delegaci staku, takže k uspokojení této poptávky vznikla řada služeb. Tato kategorie je nejlépe známá jako **staking jako služba (SaaS)**, ale pokrývá spektrum uspořádání, která se liší v klíčové otázce, kolik kontroly si ponecháte nad svým stakovaným ETH:

- **Nekustodiální staking jako služba**: ponecháte si vlastní klíče pro výběr a delegujete pouze provoz validátoru.
- **Plně kustodiální staking**: poskytovatel, obvykle burza, drží jak klíče, tak prostředky.

Ve srovnání se [sólo stakingem](/staking/solo/) vkládá každá forma delegace mezi vás a protokol Ethereum middleware. Tento middleware je software a infrastruktura provozovaná cizí firmou. Každý krok směrem k pohodlí přidává předpoklady důvěry, takže než si vyberete službu, zjistěte, kde se na tomto spektru nachází.

### Co delegovaný staking není {#what-delegated-staking-is-not}

- **Společný staking a tokeny likvidního stakingu (LST)**: v poolech kombinujete jakékoli množství ETH s ostatními stakery, přičemž obvykle obdržíte token, který představuje váš podíl na staku poolu. Nedelegujete svůj vlastní validátor; validátory ovládají chytré kontrakty poolu a provozovatelé uzlů. [Více o společném stakingu](/staking/pools/)
- **Provoz uzlu se zárukou (bonded node operation)**: některé protokoly pro staking vám umožňují provozovat validátor na vlastním hardwaru s méně než 32 ETH složením záruky. To je provoz uzlu, opak delegace, a je popsán společně se [sólo stakingem](/staking/solo/).

## Proč delegovat svůj staking? {#why-stake-with-a-service}

Pokud máte 32 ETH ke stakování, ale necítíte se na práci s hardwarem, služby delegovaného stakingu vám umožní předat technickou stránku věci, zatímco budete získávat nativní odměny za bloky Etherea.

<Grid>
  <Card title="Váš vlastní validátor" icon={<MonitorCheck />} description="Vložte vlastních 32 ETH a aktivujte si vlastní sadu podpisových klíčů, které se budou účastnit konsensu Etherea. Sledujte svůj pokrok pomocí řídicích panelů a pozorujte, jak se tyto odměny v ETH hromadí." />
  <Card title="Snadný začátek" icon={<Flag />} description="Zapomeňte na specifikace hardwaru, nastavení, údržbu uzlu a upgrady. Poskytovatelé vám umožní outsourcovat tu těžkou část nahráním vašich vlastních podpisových pověření, což jim umožní provozovat validátor vaším jménem za malý poplatek." />
  <Card title="Omezte své riziko" icon={<ShieldHalf />} description="U nekustodiálních služeb si ponecháváte kontrolu nad klíči, které umožňují výběr nebo převod stakovaných prostředků. Ty se liší od podpisových klíčů a lze je uložit odděleně, abyste omezili (ale ne zcela eliminovali) své riziko jako staker." />
</Grid>

## Srovnání možností stakingu {#comparison-of-staking-options}

<StakingComparison page="saas" />

## Spektrum delegace {#the-delegation-spectrum}

Poskytovatelé se liší v tom, jaké klíče pro vás drží, a každý klíč, který drží, je něco, s čím jim musíte důvěřovat.

### Nekustodiální staking jako služba {#non-custodial-staking-as-a-service}

U nekustodiálního SaaS jste obvykle provedeni generováním klíčů validátoru a provedením vlastního vkladu 32 ETH, poté nahrajete _podpisové klíče_ provozovateli. Podpisové klíče umožňují provozovateli plnit povinnosti validátoru (atestovat a navrhovat bloky) vaším jménem. Jejich zneužití může vést k tomu, že váš validátor bude potrestán nebo penalizován, ale nelze je použít k výběru, převodu nebo utracení vašich prostředků.

_Pověření k výběru_ validátoru zůstávají nasměrována na adresu, kterou ovládáte. Odměny a prostředky z výstupu mohou jít vždy pouze tam (viz část o modelu důvěry níže).

### Kustodiální služby a staking na burzách {#custodial-services-and-exchange-staking}

Na plně delegovaném konci spektra se nachází kustodiální staking, nejčastěji nabízený centralizovanými burzami. S klíči vůbec nemanipulujete; pouze držíte ETH na svém účtu na platformě a zvolíte si staking. Jedná se o nejjednodušší možnou uživatelskou zkušenost a je to legitimní volba pro lidi, kteří již drží prostředky na burze a přijímají kustodiální riziko.

Vyžaduje to také největší důvěru. Poskytovatel ovládá jak podpisové klíče, tak pověření k výběru; to, co držíte, je zůstatek na jejich platformě, nikoli validátor. To znamená:

- Vaše stakované ETH je vystaveno solventnosti, bezpečnosti a regulační situaci poskytovatele a výběry podléhají jejich podmínkám a dobám zpracování, nikoli pouze pravidlům protokolu Ethereum.
- Nemáte žádný nezávislý způsob, jak provést výstup z validátoru nebo získat zpět prostředky, pokud poskytovatel selže nebo zmrazí výběry.
- Velké množství ETH stakovaného u hrstky provozovatelů burz přispívá k centralizaci staku a volba klientů těchto provozovatelů ovlivňuje zdraví sítě. Staking způsobem, který vám ponechává více kontroly, nebo výběr poskytovatelů, kteří prokazatelně provozují menšinové klienty, dělá pro odolnost Etherea více.

## Model důvěry: co hodnotit {#trust-model-what-to-evaluate}

Delegovaný staking vždy znamená svěřit část vašeho nastavení stakingu někomu jinému. Než cokoli předáte, odpovězte si na tyto otázky:

- **Kdo drží klíče pro výběr?** Pověření k výběru validátoru (typ 0x01 nebo 0x02) ukazují na adresu exekuční vrstvy, která nakonec ovládá stake. Pokud je tato adresa vaše, uspořádání je nekustodiální; provozovatel může provozovat (nebo špatně spravovat) validátor, ale ETH může být vždy vybráno pouze vám. Pokud pověření ukazují na adresu poskytovatele, držíte slib, nikoli stake.
- **Můžete provést výstup bez provozovatele?** Od [upgradu Pectra](/roadmap/pectra/) umožňují [výběry spouštěné exekuční vrstvou (EIP-7002)](https://eips.ethereum.org/EIPS/eip-7002) adrese pro výběr spustit výstup validátoru (nebo u složených validátorů 0x02 částečný výběr zůstatku nad 32 ETH) přímo z exekuční vrstvy, bez podpisových klíčů. Vyžaduje to transakci a stojí to gas, ale znamená to, že nereagující nebo nefunkční provozovatel již nemůže držet váš validátor jako rukojmí, za předpokladu, že pověření k výběru jsou vaše.
- **Jaká je struktura poplatků?** Služby si účtují paušální měsíční poplatek nebo procento z odměn. Zkontrolujte, jak poplatky interagují s výpadky a penalizacemi: kdo nese náklady, pokud provozovatel podává nedostatečný výkon, a zda jsou nabízeny nějaké záruky nebo pojištění.
- **Jaké klienty provozovatel používá?** Provozovatel, který používá většinové [exekuční nebo konsensuální klienty](/developers/docs/nodes-and-clients/client-diversity/), vystavuje váš stake i síť korelovanému selhání, pokud má tento klient chybu. Dejte přednost poskytovatelům, kteří dokumentují používání menšinových klientů.
- **Je služba otevřená a auditovaná?** Poskytovatelé mohou kolem standardních klientů Etherea provozovat další software, který není open source nebo auditovatelný. Hledejte veřejné audity, zavedenou historii provozu a čistý záznam bez penalizací.
- **Co se stane, když poskytovatel zmizí?** Zodpovědný poskytovatel dokumentuje svůj proces ukončení spolupráce (offboarding) a poskytuje jasné pokyny, jak provést výstup z validátoru, obnovit klíče nebo spustit výstup sami. Pokud odpověď závisí výhradně na tom, že poskytovatel zůstane v podnikání, jedná se o kustodiální uspořádání.

<Alert variant="update">
<AlertIcon size="xl"><Split /></AlertIcon>
<AlertContent>
<AlertDescription>
**Někteří poskytovatelé mohou provozovat váš validátor pomocí technologie distribuovaných validátorů (DVT)**, která rozděluje podpisový klíč mezi více uzlů, takže žádný jednotlivý stroj nebo provozovatel nepředstavuje bod selhání. [Více o technologii distribuovaných validátorů](/staking/dvt/)
</AlertDescription>
</AlertContent>
</Alert>

## Co zvážit {#what-to-consider}

Existuje rostoucí počet poskytovatelů, kteří vám pomohou delegovat provoz vašeho validátoru, ale všichni mají své vlastní výhody a rizika. Všechny delegované možnosti vyžadují ve srovnání se sólo stakingem další předpoklady důvěry. Delegované možnosti mohou mít další kód obalující klienty Etherea, který není otevřený nebo auditovatelný. Delegace má také nepříznivý vliv na decentralizaci sítě. V závislosti na nastavení možná nebudete ovládat svůj validátor a provozovatel by mohl jednat nečestně s využitím vašeho ETH.

Níže jsou použity indikátory atributů k signalizaci významných silných nebo slabých stránek, které může uvedený poskytovatel mít. Tuto část použijte jako referenci pro to, jak tyto atributy definujeme, když si vybíráte službu stakingu.

<StakingConsiderations page="saas" />

## Prozkoumejte poskytovatele služeb stakingu {#saas-providers}

Níže jsou uvedeni někteří dostupní poskytovatelé stakingu jako služby. Použijte výše uvedené indikátory, které vás těmito službami provedou.

<ProductDisclaimer />

### Poskytovatelé SaaS {#saas-providers-2}

<StakingProductsCardGrid category="saas" />

Vezměte prosím na vědomí důležitost podpory [klientské diverzity](/developers/docs/nodes-and-clients/client-diversity/), protože zlepšuje bezpečnost sítě a omezuje vaše riziko. Služby, které mají důkazy o omezování používání většinových klientů, jsou označeny <em style={{ textTransform: "uppercase" }}>„diverzitou exekučních klientů“</em> a <em style={{ textTransform: "uppercase" }}>„diverzitou konsensuálních klientů“.</em>

### Generátory klíčů {#key-generators}

<StakingProductsCardGrid category="keyGen" />

Máte návrh na poskytovatele stakingu jako služby, kterého jsme vynechali? Podívejte se na naše [zásady pro zařazení produktů](/contributing/adding-staking-products/), abyste zjistili, zda by se hodil, a odešlete jej ke kontrole.

<StakingCommunityCallout className="my-16" />

## Často kladené dotazy {#faq}

<ExpandableCard title="Kdo drží mé klíče?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Uspořádání se liší poskytovatel od poskytovatele. U nekustodiálních služeb budete provedeni generováním podpisových klíčů pro váš validátor (každý validátor drží 32 ETH, nebo až 2048 ETH se složenými (0x02) pověřeními od upgradu Pectra) a jejich nahráním vašemu poskytovateli, aby mohl validovat vaším jménem. Samotné podpisové klíče nedávají žádnou možnost vybírat, převádět nebo utrácet vaše prostředky. Poskytují však možnost odevzdávat hlasy pro konsensus, což, pokud není provedeno správně, může vést k offline penalizacím nebo penalizaci (slashing).

U kustodiálních služeb, jako je staking prostřednictvím centralizované burzy, drží poskytovatel všechny klíče: podpisové klíče a pověření k výběru. V takovém případě svěřujete poskytovateli samotné prostředky, nejen provoz validátoru.
</ExpandableCard>

<ExpandableCard title="Takže existují dvě sady klíčů?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Ano. Každý validátor má _podpisové_ klíče a samostatná _pověření k výběru_. Aby mohl validátor atestovat stav řetězce, účastnit se synchronizačních výborů a navrhovat bloky, musí být podpisové klíče snadno přístupné klientovi validátoru. Ty musí být v nějaké formě připojeny k internetu, a proto jsou ze své podstaty považovány za „horké“ (hot) klíče. Klíče, které ovládají vybrané prostředky, jsou z bezpečnostních důvodů uchovávány odděleně.

Pověření k výběru určují adresu exekuční vrstvy, na kterou jdou odměny za staking a prostředky z výstupu. Moderní nástroje pro vklady vám umožňují nastavit tuto adresu v době vkladu, a to buď jako běžné (0x01) nebo složené (0x02) pověření, a měla by to být adresa, kterou ovládáte, ideálně zabezpečená v chladném úložišti (cold storage). To chrání vaše prostředky, i když někdo jiný ovládá vaše podpisové klíče validátoru, a od upgradu Pectra vám to také umožňuje provést výstup z validátoru přímo z této adresy.

Validátory nastavené v raných dobách sítě bez exekuční adresy pro výběr používají starší klíče pro výběr BLS a před zahájením výběrů musí podepsat jednorázovou zprávu deklarující adresu pro výběr. To zahrnuje regeneraci klíčů pro výběr z mnemotechnické seed fráze vytvořené při nastavení.

**Ujistěte se, že jste si tuto seed frázi bezpečně zálohovali, jinak nebudete schopni vygenerovat své klíče pro výběr, až přijde čas.**

Informujte se u svého poskytovatele o podpoře ohledně toho, jak připravit váš validátor.
</ExpandableCard>

<ExpandableCard title="Kdy mohu provést výběr?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Jak fungují výběry, závisí na typu pověření k výběru vašeho validátoru. U běžných (0x01) validátorů je jakýkoli zůstatek nad 32 ETH automaticky pravidelně každých několik dní přesunut na adresu pro výběr. U složených (0x02) validátorů se odměny skládají do zůstatku validátoru až do výše 2048 ETH a výběr pod tuto hodnotu vyžaduje spuštění částečného výběru z vaší adresy pro výběr, což stojí gas.

Validátory mohou také provést úplný výstup, což odemkne celý zbývající zůstatek ETH. Po dokončení procesu výstupu je celý zůstatek převeden na adresu pro výběr během následného přesunu validátoru.

<ButtonLink href="/staking/withdrawals/">Více o výběrech ze stakingu</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Co když můj poskytovatel zmizí nebo neprovede výstup mého validátoru?" eventCategory="SaasStaking" eventName="clicked what if my provider disappears">
Pokud vaše pověření k výběru ukazují na adresu, kterou ovládáte, můžete provést výstup z validátoru sami a získat zpět svůj stake; viz [Model důvěry: co hodnotit](#trust-model-what-to-evaluate).

Pokud poskytovatel drží pověření k výběru (jako u kustodiálního stakingu a stakingu na burzách), neexistuje pro vás žádný způsob na úrovni protokolu, jak nezávisle získat prostředky zpět; vaše možnosti jsou omezeny na vlastní procesy poskytovatele.
</ExpandableCard>

<ExpandableCard title="Co se stane, když budu penalizován?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Použitím poskytovatele delegovaného stakingu svěřujete provoz svého uzlu někomu jinému. S tím souvisí riziko špatného výkonu uzlu, které nemáte pod kontrolou. V případě, že je váš validátor penalizován (slashed), je uplatněna počáteční penalizace úměrná zůstatku vašeho validátoru (v upgradu Pectra byla výrazně zmenšena) a váš validátor je nuceně vyřazen ze sady validátorů.

Po dokončení procesu penalizace/výstupu jsou zbývající prostředky převedeny na adresu pro výběr přiřazenou k validátoru.

Pro více podrobností o jakýchkoli zárukách nebo možnostech pojištění kontaktujte jednotlivé poskytovatele. Pokud byste raději měli plnou kontrolu nad nastavením svého validátoru, [zjistěte více o tom, jak sólo stakovat své ETH](/staking/solo/).
</ExpandableCard>

## Další čtení {#further-reading}

- [Co je staking jako služba?](https://figment.io/insights/what-is-staking-as-a-service/) - _Figment_
- [Adresář stakingu na Ethereu](https://www.staking.directory/) - _Eridian a Spacesider_
- [Hodnocení služeb stakingu](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
- [EIP-7002: Výběry spouštěné exekuční vrstvou](https://eips.ethereum.org/EIPS/eip-7002) - _specifikace pro výstup validátoru z jeho adresy pro výběr_