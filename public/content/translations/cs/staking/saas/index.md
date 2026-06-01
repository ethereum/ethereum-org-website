---
title: "Uzamčení jako služba"
description: "Informace o uzamčení jako službě"
lang: cs
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-rhino-mascot-sitting-on-cloud.png
alt: "Nosorožec Leslie plovoucí v oblacích."
sidebarDepth: 2
summaryPoints:
  - Operátoři uzlů třetích stran zajišťují provoz vašeho klienta validátoru
  - Skvělá volba pro každého s 32 ETH, kdo se nechce řešit technickou složitost provozu uzlu
  - Snižte důvěru a udržujte své výběrové klíče v úschově
---

## Co je vklad jako služba? Co je uzamčení jako služba? {#what-is-staking-as-a-service}

Vklad jako služba („SaaS“) představuje kategorii služeb vkladů, kde vkládáte svých vlastních 32 ETH pro validátorství, ale operace uzlu delegujete na operátora třetí strany. Tento proces obvykle zahrnuje provedení úvodního nastavení, včetně vygenerování a uložení klíče, a poté nahrání vašich podpisových klíčů operátorovi. To službě umožňuje provozovat váš validátor vaším jménem, ​​obvykle za měsíční poplatek.

## Proč vklady se službou? Proč stakovat se službou? {#why-stake-with-a-service}

Protokol Ethereum nativně nepodporuje delegování vkladu, takže tyto služby byly vytvořeny tak, aby naplnily tento požadavek. Pokud máte vložit 32 ETH, ale necítíte se na  práci s hardwarem, služby SaaS vám umožní delegovat tu nejtěžší část, zatímco získáte nativní blokové odměny.

<CardGrid>
  <Card title="Váš vlastní validátor" emoji=":desktop_computer:" description="Vložte 32 ETH a aktivujte si vlastní sadu podpisových klíčů, které se budou podílet na konsensu Etherea. Sledujte svůj pokrok a narůstající odměny v ETH na řídicích panelech." />
  <Card title="Snadný start" emoji="🏁" description="Zapomeňte na hardware, nastavení, údržbu a aktualizace. Poskytovatelé SaaS vám umožní přenechat těžkou práci jim. Nahrajete své podpisové údaje a oni za vás za malý poplatek spustí validátor." />
  <Card title="Omezte své riziko" emoji=":shield:" description="V mnoha případech se nemusíte vzdát přístupu ke klíčům, které umožňují výběr nebo převod stakovaných prostředků. Ty se liší od podpisových klíčů a lze je uložit odděleně, čímž omezíte (ale ne zcela odstraníte) své riziko jako staker." />
</CardGrid>

<StakingComparison page="saas" />

## Co je třeba zvážit {#what-to-consider}

Počet poskytovatelů SaaS, kteří vám pomohou vložit vaše ETH, stále roste. Jednotliví poskytovatelé se liší výhodami a riziky. Ve srovnání s domácím vkládáním vyžadují všechny varianty SaaS další důvěru. Možnosti Saas mohou mít další kód obalující klienty Ethereum, který není otevřený ani auditovatelný. SaaS má také škodlivý vliv na decentralizaci sítě. V závislosti na nastavení nemusíte své validátorství ovládat – operátor by mohl při používání vašeho ETH jednat nečestně.

Atributové indikátory se používají níže k signalizaci pozoruhodných silných nebo slabých stránek, které může mít uvedený poskytovatel SaaS. Použijte tuto část jako referenci, jak definujeme tyto atributy, když si vybíráte službu, která vám pomůže s vaší cestou vkladů.

<StakingConsiderations page="saas" />

## Prozkoumejte poskytovatele služeb uzamčení {#saas-providers}

Níže uvádíme několik dostupných poskytovatelů SaaS. Pomocí výše uvedených indikátorů vás provedou těmito službami

<ProductDisclaimer />

### Poskytovatelé SaaS

<StakingProductsCardGrid category="saas" />

Vezměte prosím na vědomí důležitost podpory [rozmanitosti klientů](/developers/docs/nodes-and-clients/client-diversity/), protože zlepšuje zabezpečení sítě a omezuje vaše riziko. Služby, které prokazatelně omezují většinové klientské používání, jsou označeny <em style={{ textTransform: "uppercase" }}>"rozmanitost realizačního klienta"</em> a <em style={{ textTransform: "uppercase" }}>"rozmanitost klientů konsensu."</em>

### Generátory klíčů

<StakingProductsCardGrid category="keyGen" />

Máte návrh na poskytovatele vkladu jako služby, kterého jsme vynechali? Podívejte se na naše [zásady pro uvádění produktů](/contributing/adding-staking-products/), abyste zjistili, zda je váš produkt vhodný, a mohli ho odeslat ke kontrole.

## Často kladené dotazy {#faq}

<ExpandableCard title="Kdo drží mé klíče?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Ujednání se budou u jednotlivých poskytovatelů lišit, ale obvykle vás provedeme nastavením všech potřebných podpisových klíčů (jeden na 32 ETH) a jejich nahráním poskytovateli, aby je mohl ověřit vaším jménem. Samotné podpisové klíče nedávají žádnou možnost vybrat, převést nebo utratit vaše prostředky. Poskytují však možnost odevzdat hlasy směrem ke konsenzu, což, pokud není provedeno správně, může mít za následek offline penalizaci nebo trest.
</ExpandableCard>

<ExpandableCard title="Takže jsou dvě sady klíčů?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Ano. Každý účet zahrnuje <em>podpisové </em> klíče BLS i klíče <em>pro výběr</em>. Aby mohl validátor ověřovat stav řetězce, účastnit se synchronizačních výborů a navrhovat bloky, musí být podpisové klíče snadno dostupné pro klienta validátoru. Ty musí být nějakou formou připojeny k internetu, a jsou tedy neodmyslitelně považovány za „horké“ klávesy. Tento požadavek váš validátor potřebuje k potvrzení, a proto jsou klíče používané k převodu nebo výběru prostředků z bezpečnostních důvodů odděleny.

Výběrové klíče BLS se používají k podepsání jednorázové zprávy, která deklaruje, na kterou prováděcí vrstvu by odměny za vklady na účet a vyřazené prostředky měly jít. Jakmile je tato zpráva odvysílána, klíče <em>pro výběr BLS</em> již nejsou potřeba. Místo toho je kontrola nad vybranými prostředky trvale delegována na adresu, kterou jste uvedli. To vám umožňuje nastavit adresu pro výběr zabezpečenou prostřednictvím vašeho vlastního chladného úložiště, čímž se minimalizuje riziko pro vaše prostředky validátoru, i když někdo jiný ovládá vaše podpisové klíče validátoru.

Aktualizace přihlašovacích údajů pro výběr je nezbytným krokem k povolení výběrů\*. Tento proces zahrnuje generování klíčů pro výběr pomocí vaší mnemotechnické počáteční fráze.

<strong>Ujistěte se, že si tuto bezpečnostní frázi bezpečně zálohujete, jinak nebudete moci vygenerovat své výběrové klíče, až přijde čas.</strong>

\*Stakeři, kteří poskytli adresu pro výběr při počátečním vkladu, toto nemusí nastavovat. Ověřte si u svého poskytovatele SaaS podporu ohledně přípravy validátoru.
</ExpandableCard>

<ExpandableCard title="Kdy si mohu vybrat?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Stakeři musí zadat adresu pro výběr (pokud není uvedena při počátečním vkladu) a výplaty odměn se začnou automaticky rozdělovat pravidelně každých několik dní.

Validátoři mohou také plně odejít jako validátor, který odemkne jejich zbývající ETH zůstatek pro výběr. Účty, které uvedly adresu pro provedení výběru a dokončily proces ukončení, obdrží celý zůstatek na adresu pro výběr uvedenou během příštího ověřovacího testu.

<ButtonLink href="/staking/withdrawals/">Více o výběrech ze stakování</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Co se stane, když budu penalizován?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Používáním poskytovatele SaaS svěřujete provoz svého uzlu někomu jinému. To přichází s rizikem špatného výkonu uzlu, který nemůžete ovlivnit. V případě, že je váš validátor potrestán, váš zůstatek validátoru bude penalizován a násilně odstraněn z fondu validátorů.

Po dokončení procesu trestání/opuštění budou tyto prostředky převedeny na adresu pro výběr přidělenou validátoru. To vyžaduje poskytnutí adresy pro výběr. To může být poskytnuto při počátečním vkladu. Pokud ne, bude nutné použít klíče pro výběr validátoru k podepsání zprávy deklarující adresu pro výběr. Pokud nebyla zadána žádná adresa pro výběr, prostředky zůstanou uzamčeny, dokud je nezadáte.

Obraťte se na jednotlivého poskytovatele SaaS pro další podrobnosti o jakýchkoli zárukách nebo možnostech pojištění a pro pokyny, jak zadat adresu pro výběr. Pokud dáváte přednost plné kontrole nad nastavením svého validátoru, [zjistěte více o tom, jak samostatně stakovat svá ETH](/staking/solo/).
</ExpandableCard>

## Další čtení {#further-reading}

- [Adresář stakování Etherea](https://www.staking.directory/) - _Eridian and Spacesider_
- [Hodnocení služeb pro uzamčení](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
