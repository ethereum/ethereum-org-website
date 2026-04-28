---
title: "Jak vytvořit guerillovou vrstvu 2 (l2)"
description: "Fatemeh Fannizadeh a Melanie Premsyl o budování sítí vrstvy 2 (l2) jako nástrojů pro soukromí, svobodu a odpor, a o novém pojetí blockchainové infrastruktury optikou cypherpunku a aktivismu."
lang: cs
youtubeId: "WlsICV2OPAE"
uploadDate: 2025-11-23
duration: "0:15:55"
educationLevel: intermediate
topic:
  - "soukromí a bezpečnost"
  - "škálování a vrstva 2"
  - "soukromí"
  - "vrstva 2"
format: interview
author: Web3Privacy Now
breadcrumb: "Guerillová vrstva 2 (l2)"
---

**Fatemeh Fannizadeh** a **Melanie Premsyl** vystupují na Ethereum Cypherpunk Congress (ECC#2) v Buenos Aires s přednáškou o budování sítí vrstvy 2 (l2) jako nástrojů pro soukromí, svobodu a odpor. Představují nové pojetí blockchainové infrastruktury optikou cypherpunku a aktivismu a podrobně zkoumají průsečík anarchistické filozofie a architektury blockchainu.

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=WlsICV2OPAE), který zveřejnila iniciativa Web3Privacy Now. Pro lepší čitelnost byl lehce upraven.*

#### Úvod a anarchistická filozofie (0:05) {#introduction-and-anarchist-philosophy-005}

**Fatemeh Fannizadeh:** [Potlesk] Děkuji, že jste tady. Vím, že teď mluví Vitalik. Je to pro mě opravdu čest, že je tu pár z vás a nestojíte tamhle ve frontě na matchu. Dnes se budeme bavit o guerillových vrstvách 2 (l2) a myslím, že se k tomu dostaneme, ale nejprve vám představuji Melanii Premsyl, francouzskou filozofku a anarchistku, která nám prokázala tu čest a připojila se k nám. Chtěla by ses na úvod trochu představit?

**Melanie Premsyl:** Jasně. Ahoj všichni. Jsem francouzská filozofka. Studuji anarchii a technologie a na začátku jsem se zaměřovala spíše na území. Jako například ve střední Francii, nevím, jestli znáte Tarnac, nebo všechny tyhle skupiny, které jsou spíše násilné. Hlavní problém, na který jsem narazila, byl ten, že potřebujeme být ve spojení s dalšími lidmi ve světě, a spousta anarchistických skupin je velmi omezená. Potřebujeme způsob, jak komunikovat s více lidmi z Ameriky nebo Jižní Ameriky. A to je důvod, proč se teď snažíme vytvořit most s kryptem a všemi, kteří se snaží najít nové způsoby, jak bojovat proti nedostatku soukromí, nedostatku svobody a násilí ze strany státu.

#### Soudní proces s bratry MEV (1:52) {#the-mev-brothers-trial-152}

**Fatemeh Fannizadeh:** Úžasné. Takže v podstatě jsme se potkaly před pár týdny v New Yorku. Obě jsme se účastnily soudního procesu, který probíhal na Manhattanu, kde byli tito dva bratři, známí jako bratři MEV, stíháni za to, že provedli sandwich útok na nějaké sandwich boty. Šla jsem k soudu sledovat proces a viděla jsem tady tu osobu, jak čte Spinozu ve francouzštině, a byla jsem opravdu zvědavá, co se děje. V publiku nebyl nikdo jiný než my dvě! Takže mě opravdu zajímalo, co tě, v první řadě anarchistku a filozofku spíše než technoložku, přimělo v podstatě přijít na tento konkrétní proces, ale také přemýšlet o správě Etherea a celém validačním systému a procesu, který se konal v New Yorku. 

**Melanie Premsyl:** Myslím, že jsem se jen snažila pochopit, jestli se Spojené státy nějakým způsobem snaží ovládnout Ethereum. Protože v Evropě jsme s kryptem dost mimo hru v tom smyslu, že nemáme legislativu, a já jsem to prostě jen zjišťovala. 

**Fatemeh Fannizadeh:** Takže si myslíš, že se Spojené státy snaží ovládnout Ethereum? 

**Melanie Premsyl:** Myslím, že to je velká otázka. Myslím, že Spojené státy se snaží ovládat všechny. 

**Fatemeh Fannizadeh:** Dobře. Jo, to dává smysl. Takže pro ty, kteří proces nesledovali, po asi třech nebo čtyřech týdnech byl zrušen pro zmatečnost (mistrial). Porota nedokázala dospět k jednomyslnému verdiktu a rozhodnout, zda jsou tito dva bratři vinni z porušení pravidel blockchainu, nebo ne – což je podle mě pro krypto docela pozitivní výsledek, že soud nebo porota nerozhoduje o tom, co je onchain správné a co špatné. 

#### Propojování blockchainu s dalšími komunitami (4:06) {#bridging-blockchain-with-other-communities-406}

**Fatemeh Fannizadeh:** Ale dobře, když se vrátíme o krok zpět k tomu, co jsi říkala o anarchistech, kteří zkoumají tuto technologii, aby v podstatě vytvořili most mezi různými skupinami. 

**Melanie Premsyl:** Jo. Takže myslím, že jsem tady jen z jednoho důvodu. Nejsem technický typ a nejsem součástí krypto světa, ale z mého úhlu pohledu jsem sledovala, že blockchain má opravdu převratnou sílu, ale nedokáže oslovit jiné komunity, které jsou více vázané na určité území. Myslím, že jedním z cílů je vytvořit pestrý blockchain, jako proč se chceme bavit o vrstvách 2 (l2), jak vytvářet nové komunity s jiným zázemím, s jinou představivostí a vizemi.

**Fatemeh Fannizadeh:** Upřímně řečeno, je pro mě opravdu úžasné, že tě tu na Devconnectu máme, protože přinášíš takový svěží pohled na tuto komunitu, na to, co děláme, a na naše akce. Včera jsme strávily spoustu času přebíháním z jedné akce na druhou a já jsem od tebe získala zpětnou vazbu – něco, co už sama nedokážu vidět, protože se v tomhle divadle pohybujeme už mnoho let. Všichni jsme přátelé, takže jsme k sobě velmi milí. Ale tenhle kritický pohled je úžasný. Myslím, že z toho můžeme těžit, obzvlášť proto, že mě opravdu nadchlo zjištění, že anarchisté nebo možná spíše levicově orientovaní lidé se o naši technologii stále zajímají. Ačkoli, navzdory všem těm hádkám na krypto Twitteru, je možná lepší, že o téhle stránce komunity nevíš. Ale hádky o tom, že Ethereum je komunistická technologie – zní ti to pravdivě? Myslíš, že je v pořádku říct, že Ethereum je komunistická technologie? 

**Melanie Premsyl:** Jo, ráda bych to řekla, ale nejsem si jistá, protože víš, je tu spousta lidí, kteří potřebují vydělávat peníze, takže to je taky hlavní účel. Ale myslím, že bychom to mohli prostě použít jako komunistickou síť, že by jen jedna část mohla být takovým snem. Myslím, že je to vysněný dort, který se dá upéct, ale potřebujeme mít nástroje a design, které pomohou lidem vymanit se z technického, velmi inženýrského způsobu myšlení, aby pochopili, jaké to je.

#### Decentralizace a vrstvy 2 (6:55) {#decentralization-and-layer-2s-655}

**Fatemeh Fannizadeh:** To mi hodně připomíná decentralizované autonomní organizace (DAO) před několika lety. Nevím jak vy všichni, ale já jsem byla opravdu nadšená, myslela jsem si, že DAO přinášejí revoluci do způsobu, jakým se organizujeme jako skupiny a komunity onchain, a do svobody, kterou máme. A nakonec to všechno prostě vyšumělo. Nemyslím si, že se to vůbec projevilo. Stalo se to spíše o hlasovacím systému, není to ve skutečnosti demokratické, jde jen o vytváření zisku. Tahle celá představa, kterou jsme měli o DAO jako o sociálním nástroji, se vlastně nenaplnila. 

**Fatemeh Fannizadeh:** Ale myslím, že jsme v poslední době hodně mluvili o těchto nástrojích, které nám blockchain dává, a o tom, jak si můžeme představit vývoj blockchainu za pět až deset let, a hodně se mluví o tom, že se Ethereum stane soukromým. Myslím, že tohle je rozhodně cesta vpřed: aby vrstva 1 (l1) byla zaměřená na soukromí. A pak je tu také plán zaměřený na rollupy. Tedy jak se vrstvy 2 (l2) a rollupy stanou jakýmisi hlavními uživateli Etherea spíše než koncoví uživatelé. Koncoví uživatelé se pak přesunou k tomu, že místo aby byli součástí DAO na vrstvě 1 (l1), budou součástí různých rollupů nebo vrstev 2 (l2). Jak tedy můžeme v podstatě promítnout naši představivost do této budoucnosti Etherea, abychom vybudovali to, co jsi říkala, tento subkomunistický anarchistický prostor svobody? 

**Melanie Premsyl:** Jsem Francouzka. To je velký problém. Jako Francouzi jsme velmi státní národ. Takže vždycky přemýšlím pedagogicky a velmi stylem shora dolů. A myslím, že vrstva 2 (l2) vytváří způsob, jak si každý může vytvořit mini blockchainy, které jsou zabezpečeny vrstvou 1 (l1). Ráda bych viděla, jestli lidé dokážou vytvořit pedagogickou pomoc pro všechny ohledně něčeho, co je svobodné. Myslím, že spousta skupin, jako jsou spolky, by si mohla vytvořit vlastní blockchain, a byl by to způsob – jak víš, federalismus je velkým hlavním tématem anarchismu. Jak lidé dokážou zvládnout to, že se možná nenávidí, ale přesto spolu mluví. Takže potřebujeme mít tento druh federalismu v blockchainu. Každý má vrstvu 2 (l2) s vlastní hodnotou, a tak mluvíme pomocí stejné infrastruktury. 

#### Anarchie, svoboda a budování nástrojů (9:53) {#anarchy-freedom-and-building-tooling-953}

**Fatemeh Fannizadeh:** Jo, moc se mi líbí, co jsi řekla o tom, že se v podstatě nenávidíme, ale přesto spolu komunikujeme, jako že nejsme toxičtí navzdory našim rozdílům. A fakt, že v tomto scénáři existuje jedna vrstva 1 (l1), což by bylo Ethereum, je také často označován za fašistický, protože všichni musíme souhlasit s tímto jedním souborem pravidel. Takže je to jeden systém, který je stejný pro všechny, a vy se v podstatě musíte této vrstvě 1 (l1) podřídit, nebo můžete odejít, to je úplně jiná otázka. Ale pokud to dokážeme decentralizovat do ekosystému různých druhů malých rollupů a vrstev 2 (l2), pak můžeme do této společné infrastruktury vrátit nesoulad a neshody. 

**Melanie Premsyl:** Jo, jasně. Myslím, že jste skvělí. Myslím, že na technických lidech, kteří mají opravdový způsob myšlení, leží velká zodpovědnost. Jste v dnešní době jediní, kdo se snaží dělat něco dobrého, a tak nemůžete zůstat jen ve svých vlastních představách. A jak říkáš, možná ten problém fašismu – jako že jsme jen jedni, máte velkou zodpovědnost. Není to jen o používání Etherea nebo jen o soukromí, je to o tom, že vytváříme nový technologický svět a musíme si vybrat, jestli v něm budou jen techničtí lidé, nebo jestli budou techničtí lidé propojeni se všemi, kteří chtějí více svobody.

**Fatemeh Fannizadeh:** Takže jsme hodně zmiňovaly komunismus a anarchismus, a mám pocit, že v kryptu jsou to skoro jako sprostá slova. Víš, je to tak pošpiněné a hned sklidíš kritiku, když tenhle koncept zmíníš. A nevím, možná se pletu, ale když jsem se ke kryptu přidala já, bylo tu víc hackerů a anarchistická estetika byla přítomnější. Ta atmosféra byla víc – bylo cool být takový, takže se s tím spousta lidí ztotožňovala. Dnes mám pocit, že jich je tu pořád spousta, ale možná se víc skrývají. Jako, je v místnosti nějaký utajený anarchista? Nevím! Myslím, že ano. Takže bych řekla, pojďme se možná vrátit o krok zpět, jestli bys mohla vlastně definovat, co je to komunismus nebo anarchismus.

**Melanie Premsyl:** Jo. Ne, myslím, že anarchismus není moc známý v tom smyslu, že je velmi jednoduchý. Je to prostě tehdy, když dospějeme k sebeorganizaci. Takže když existují ostrůvky svobody, ostrůvky anarchie, jako když se lidé prostě baví s přáteli, ve spolku, i v práci, a nepotřebují někoho, kdo by byl šéfem, hlavou, která by to chápala a rozhodovala. Protože nakonec je lidským problémem to, že lidé chtějí mít šéfa. Anarchismus se jen snaží bojovat proti této hluboké touze být ovládán někým jiným. Chceme být opravdu svobodní? To je ta otázka, a jak to můžeme zvládnout společně? 

**Fatemeh Fannizadeh:** Něco, co jsi řekla včera a co bylo podle mě velmi trefné, je, že každý ve svém životě prožívá anarchii. Někteří lidé si říkají: „Ach, anarchie, od té jsme tak daleko. Jste jen reakcionáři, proti establishmentu, proti státu.“ Ale ve skutečnosti se každý, ať už ve své rodině, v přátelství, v nějaké formě vztahu, pohybuje v jakési sféře bezpráví, anarchie, kde se pravidla vytvářejí prostřednictvím mezilidské dynamiky. Takže každý má ve svém životě určitou míru anarchie, a myslím, že když začneme odtud, možná bude hmatatelnější se o tom bavit.

**Melanie Premsyl:** Jo. Jo. Proto si myslím, že blockchain je v tomto způsobu uvažování skutečně anarchistický. 

**Fatemeh Fannizadeh:** Dobře. Úžasné. Myslím, že tohle je možná ideální věta na závěr. Blockchain je anarchistický. A abych to shrnula, myslím, že to, co je opravdu důležité nebo co bych v blockchainu opravdu ráda viděla, je více nástrojů. Protože je pro mě těžké si představit, že by anarchistické skupiny nebo více autonomní suverénní skupiny přišly a byly jen uživateli nějakého produktu. V tomto smyslu tam nutně není shoda s trhem (market fit). Je velmi nepravděpodobné, že by prostě přijaly hotový produkt. Spíše, když jim dáte surový materiál, aby si postavily vlastní. Takže je to spíš jako udělej si sám (DIY), postav si vlastní nástroje, vlastní rollup na vrstvě 2 (l2), ať už to chcete nazvat jakkoli. Myslím, že díky tomu by krypto bylo s námi ještě více v souladu. Merci beaucoup. [Potlesk]