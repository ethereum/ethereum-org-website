---
title: Staking jako služba
description: Zjistěte více o stakingu jako službě
lang: cs
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: Nosorožec Leslie vznášející se v oblacích.
sidebarDepth: 2
summaryPoints:
  - Provozovatelé uzlů třetích stran se starají o provoz vašeho klienta validátoru
  - Skvělá volba pro každého s 32 ETH, kdo se necítí na řešení technické složitosti provozování uzlu
  - Snižte nutnost důvěry a zachovejte si kontrolu nad svými klíči pro výběr
---

## Co je staking jako služba? {#what-is-staking-as-a-service}

Staking jako služba („SaaS“) představuje kategorii služeb pro staking, kde vložíte vlastních 32 ETH pro validátor, ale provoz uzlu delegujete na provozovatele třetí strany. Tento proces obvykle zahrnuje průvodce počátečním nastavením, včetně generování klíčů a vkladu, a následné nahrání vašich podepisovacích klíčů provozovateli. To umožňuje službě provozovat váš validátor vaším jménem, obvykle za měsíční poplatek.

## Proč stakovat pomocí služby? {#why-stake-with-a-service}

Protokol [Ethereum](/) nativně nepodporuje delegaci staku, takže tyto služby byly vytvořeny, aby tuto poptávku uspokojily. Pokud máte 32 ETH ke stakování, ale necítíte se na práci s hardwarem, služby SaaS vám umožní delegovat tu těžší část, zatímco vy získáváte nativní odměny za bloky.

<Grid>
  <Card title="Your own validator" emoji=":desktop_computer:" description="Deposit your own 32 ETH to activate your own set of signing keys that will participate in Ethereum consensus. Monitor your progress with dashboards to watch those ETH rewards accumulate." />
  <Card title="Easy to start" emoji="🏁" description="Forget about hardware specs, setup, node maintenance and upgrades. SaaS providers let you outsource the hard part by uploading your own signing credentials, allowing them to run a validator on your behalf, for a small cost." />
  <Card title="Limit your risk" emoji=":shield:" description="In many cases users do not have to give up access to the keys that enable withdrawing or transferring staked funds. These are different from the signing keys, and can be stored separately to limit (but not eliminate) your risk as a staker." />
</Grid>

<StakingComparison page="saas" />

## Co zvážit {#what-to-consider}

Existuje rostoucí počet poskytovatelů SaaS, kteří vám pomohou stakovat vaše ETH, ale všichni mají své vlastní výhody a rizika. Všechny možnosti SaaS vyžadují ve srovnání s domácím stakingem dodatečné předpoklady důvěry. Možnosti SaaS mohou mít dodatečný kód obalující klienty Etherea, který není otevřený nebo auditovatelný. SaaS má také škodlivý vliv na decentralizaci sítě. V závislosti na nastavení možná nebudete mít svůj validátor pod kontrolou – provozovatel by mohl s vašimi ETH jednat nečestně.

Níže jsou použity indikátory atributů, které signalizují významné silné nebo slabé stránky, jež může uvedený poskytovatel SaaS mít. Tuto sekci použijte jako referenci pro to, jak tyto atributy definujeme, když si vybíráte službu, která vám pomůže na vaší cestě stakingem.

<StakingConsiderations page="saas" />

## Prozkoumejte poskytovatele služeb pro staking {#saas-providers}

Níže jsou uvedeni někteří dostupní poskytovatelé SaaS. Použijte výše uvedené indikátory, které vám pomohou se v těchto službách zorientovat.

<ProductDisclaimer />

### Poskytovatelé SaaS {#saas-providers-2}

<StakingProductsCardGrid category="saas" />

Vezměte prosím na vědomí důležitost podpory [klientské diverzity](/developers/docs/nodes-and-clients/client-diversity/), protože to zlepšuje bezpečnost sítě a omezuje vaše riziko. Služby, u kterých je prokázáno, že omezují používání většinového klienta, jsou označeny jako <em style={{ textTransform: "uppercase" }}>„diverzita exekučních klientů“</em> a <em style={{ textTransform: "uppercase" }}>„diverzita konsensuálních klientů“.</em>

### Generátory klíčů {#key-generators}

<StakingProductsCardGrid category="keyGen" />

Máte návrh na poskytovatele stakingu jako služby, kterého jsme vynechali? Podívejte se na naše [zásady pro zařazení produktů](/contributing/adding-staking-products/), abyste zjistili, zda by se hodil, a předložte jej k posouzení.

## Často kladené dotazy {#faq}

<ExpandableCard title="Kdo drží moje klíče?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Podmínky se budou u jednotlivých poskytovatelů lišit, ale obvykle vás provedou nastavením všech podepisovacích klíčů, které potřebujete (jeden na 32 ETH), a jejich nahráním vašemu poskytovateli, aby mohl validovat vaším jménem. Samotné podepisovací klíče nedávají žádnou možnost vybírat, převádět nebo utrácet vaše prostředky. Poskytují však možnost odevzdávat hlasy pro konsensus, což, pokud není provedeno správně, může vést k offline postihům nebo penalizaci.
</ExpandableCard>

<ExpandableCard title="Takže existují dvě sady klíčů?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Ano. Každý účet se skládá z BLS <em>podepisovacích</em> klíčů a BLS klíčů <em>pro výběr</em>. Aby mohl validátor potvrzovat stav řetězce, účastnit se synchronizačních výborů a navrhovat bloky, musí být podepisovací klíče snadno přístupné klientovi validátoru. Ty musí být v nějaké formě připojeny k internetu, a proto jsou ze své podstaty považovány za „horké“ klíče. To je požadavek, aby váš validátor mohl potvrzovat, a proto jsou klíče používané k převodu nebo výběru prostředků z bezpečnostních důvodů odděleny.

BLS klíče pro výběr se používají k podepsání jednorázové zprávy, která deklaruje, na který účet exekuční vrstvy by měly jít odměny za staking a prostředky z výstupu. Jakmile je tato zpráva odeslána, <em>BLS klíče pro výběr</em> již nejsou potřeba. Místo toho je kontrola nad vybranými prostředky trvale delegována na adresu, kterou jste poskytli. To vám umožňuje nastavit adresu pro výběr zabezpečenou prostřednictvím vašeho vlastního studeného úložiště, čímž se minimalizuje riziko pro prostředky vašeho validátoru, i když podepisovací klíče vašeho validátoru ovládá někdo jiný.

Aktualizace pověření k výběru je nezbytným krokem k povolení výběrů\*. Tento proces zahrnuje generování klíčů pro výběr pomocí vaší mnemotechnické seed fráze.

<strong>Ujistěte se, že jste si tuto seed frázi bezpečně zálohovali, jinak nebudete schopni vygenerovat své klíče pro výběr, až přijde čas.</strong>

\*Stakeři, kteří poskytli adresu pro výběr při počátečním vkladu, toto nemusí nastavovat. Informujte se u svého poskytovatele SaaS o podpoře ohledně toho, jak připravit váš validátor.
</ExpandableCard>

<ExpandableCard title="Kdy mohu vybrat?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Stakeři musí poskytnout adresu pro výběr (pokud nebyla poskytnuta při počátečním vkladu) a výplaty odměn se začnou automaticky distribuovat pravidelně každých několik dní.

Validátoři mohou také plně provést výstup jako validátor, což odemkne jejich zbývající zůstatek ETH pro výběr. Účty, které poskytly exekuční adresu pro výběr a dokončily proces výstupu, obdrží celý svůj zůstatek na poskytnutou adresu pro výběr během dalšího cyklu prohledávání validátorů.

<ButtonLink href="/staking/withdrawals/">Více o výběrech ze stakingu</ButtonLink>
</ButtonLink>

<ExpandableCard title="Co se stane, když budu penalizován?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Použitím poskytovatele SaaS svěřujete provoz svého uzlu někomu jinému. S tím souvisí riziko špatného výkonu uzlu, které nemáte pod kontrolou. V případě penalizace vašeho validátoru bude jeho zůstatek zkrácen a validátor bude nuceně odstraněn ze skupiny validátorů.

Po dokončení procesu penalizace/výstupu budou tyto prostředky převedeny na adresu pro výběr přiřazenou k validátoru. K tomu je nutné poskytnout adresu pro výběr. Ta mohla být poskytnuta při počátečním vkladu. Pokud ne, bude nutné použít klíče pro výběr validátoru k podepsání zprávy deklarující adresu pro výběr. Pokud nebyla poskytnuta žádná adresa pro výběr, prostředky zůstanou uzamčeny, dokud nebude poskytnuta.

Pro více podrobností o jakýchkoli zárukách nebo možnostech pojištění a pro pokyny, jak poskytnout adresu pro výběr, kontaktujte jednotlivé poskytovatele SaaS. Pokud byste raději měli plnou kontrolu nad nastavením svého validátoru, [zjistěte více o tom, jak sólově stakovat vaše ETH](/staking/solo/).
</ExpandableCard>

## Další čtení {#further-reading}

- [Adresář stakingu na Ethereu](https://www.staking.directory/) – _Eridian a Spacesider_
- [Hodnocení služeb pro staking](https://www.attestant.io/posts/evaluating-staking-services/) – _Jim McDonald 2020_