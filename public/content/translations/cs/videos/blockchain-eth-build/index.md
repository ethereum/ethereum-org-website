---
title: "Blockchain — ETH.BUILD"
description: "Ukázka toho, jak funguje těžba na blockchainu, včetně toho, jak jsou bloky řetězeny za sebou, jak důkaz prací (PoW) zabezpečuje blockchainy a co se stane, když se někdo pokusí manipulovat s daty."
lang: cs
youtubeId: "zcX7OJ-L8XQ"
uploadDate: 2021-01-14
duration: "0:22:44"
educationLevel: beginner
topic:
  - "mining"
  - "blockchain"
format: tutorial
author: Austin Griffith
breadcrumb: "Blockchain (ETH.BUILD)"
---

Návod od **Austina Griffitha**, který ukazuje, jak funguje těžba na blockchainu pomocí vizuálního programovacího nástroje ETH.BUILD. Austin probírá konsensus důkazu prací (PoW), řetězení bloků, obtížnost těžby, odměny za blok a neměnnost řetězce.

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=zcX7OJ-L8XQ), který zveřejnil Austin Griffith. Byl lehce upraven pro lepší čitelnost.*

#### Problém koordinace (0:00) {#the-problem-of-coordination-000}

Dobré ráno, šťastný motýlkový pátek! Tento díl ETH.BUILD se zaměřuje na blockchain — opravdu skvělou věc. Jsme v téhle klaunské lodi, máme na to náš bitcoinový motýlek. Jdeme na to.

V dosavadních osnovách jsme už probrali páry klíčů, hashe a účetní knihy. Zjistili jsme, že pokud chceme převádět hodnotu tam a zpět v distribuované síti — nikoli v centralizované — narazíme na problémy s koordinací. Skončíme u problému, kdy nemůžeme najít konsensus mezi nesourodými stranami, protože všechny přijímají různé transakce v různou dobu. Existuje mnoho různých způsobů, jak to vyřešit, ale žádný z nich nebyl skvělý, dokud nepřišel důkaz prací (PoW).

Jako vedlejší úkol jsme probrali byzantské generály a zjistili jsme, že generálové museli dokázat, že mají armádu, když posílali zprávy přes nezabezpečenou síť. Přijímající strana pak mohla poznat, že daná osoba je skutečně generál s armádou, která se chystá zaútočit, a mohli se koordinovat.

#### Bloky a nonce (1:04) {#blocks-and-the-nonce-104}

Takže do této účetní knihy pumpujeme transakce ze sítě. Místo toho, aby každý jednotlivý uživatel prokazoval svou práci, abstrahujeme důkaz prací (PoW) do bloku transakcí a necháme na něm pracovat těžaře.

Přineseme blok, který obsahuje transakce — cokoli, co přichází přes síť, načteme do tohoto bloku. Když se podíváme na strukturu tohoto bloku, má také nonce. Tato nonce nám umožňuje upravovat hash. Pokud vezmeme celý tento blok, převedeme ho na řetězec a zahashujeme ho, získáme hash. Jak se mění transakce, mění se i tento hash, ale také když změníme nonce, hash se změní.

Děláme tu nějakou práci — máme náhodnou sadu transakcí a měníme nonce, dokud hash nemá na začátku nulu. Pokud jste sledovali vedlejší úkol o byzantských generálech, vybrali jsme tuto počáteční nulu jako libovolné množství práce, které je třeba prokázat. Takže nonce prostě prochází každé číslo — jedna, dva, tři, čtyři — a když získáme počáteční nulu, řekneme: to je platný blok.

#### Důkaz prací (PoW) v praxi (3:00) {#proof-of-work-in-action-300}

Pokud vezmeme vytěžený blok, vytáhneme hash a vložíme ho do hashovací funkce, můžeme dokázat, že má na začátku nulu — můžeme dokázat, že se na tomto bloku pracovalo.

Hashovací funkce stojí výkon CPU, což je omezený zdroj. Vynakládáme veškerý výkon našeho CPU ve snaze najít hash s počátečními nulami. Jakmile se nám to podaří, máme platný blok — blok je v podstatě zmrazený. Jakékoli transakce, které v něm v té době byly, jsou nyní v tomto bloku, všichni ho respektují a my můžeme přejít k dalšímu bloku.

#### Řetězení bloků (3:56) {#chaining-blocks-together-356}

Tady je ten trik: vezmeme starý blok a propojíme ho s novým blokem. Když se podíváme na strukturu, nový blok nemá žádné transakce a má prázdnou nonce, ale má rodiče s transakcemi. Předchozí blok bude součástí dalšího bloku, takže budeme mít celý řetězec.

Přihodíme nejnovější transakce z transakčního poolu a pracujeme na nalezení nonce. Blok číslo dva je vytěžen — potřebovali jsme nonce s hodnotou deset, aby tyto transakce byly platné. Pak uděláme to samé: propojíme starý blok, přineseme nový, přihodíme jakékoli nejnovější transakce a znovu na tom pracujeme. Po dostatečném počtu pokusů jsme našli nonce pro blok tři. Blok čtyři — stejný proces a pokračujeme dál.

#### Obtížnost těžby (5:02) {#mining-difficulty-502}

Tohle je příliš snadné — jsme schopni najít platný blok velmi rychle a my chceme, aby to bylo těžší. Zvýším obtížnost na dva. Propojíme blok pět, přineseme nejnovější transakce a necháme počítadlo běžet. Nyní těžíme — využíváme náš omezený výkon CPU k tomu, abychom sem libovolně házeli náhodné hashe, dokud nenajdeme hash se dvěma počátečními nulami, protože obtížnost byla zvýšena. To chvíli potrvá.

Nyní máme tento blockchain o pěti blocích. Tyto bloky obsahují transakce a každý z nich odkazuje na ten předchozí. Vytvoření každého bloku vyžadovalo určité libovolné množství práce a množství práce je řízeno obtížností.

#### Těžař (6:46) {#the-miner-646}

Pojďme se podívat, co je to těžař. V problému byzantských generálů potřeboval generál, který chtěl „zaútočit za úsvitu“, vojáky. To, co se děje uvnitř každého vojáka, je přesně to, co děláme tady s naším těžařem — bereme zprávu a nonce a házíme je do hashovací funkce tak rychle, jak jen můžeme, a snažíme se získat ty počáteční nuly. Počáteční nuly jsou nějaká libovolná věc, na které jsme se všichni shodli — to je dostatek práce k prokázání, že jste voják, nebo že můžete vést válku.

Dovolte mi přivést těžaře a udělat to trochu rychleji. Těžař udělá to samé pro naše bloky — vezme transakce přicházející z transakčního poolu, napumpuje je do bloku a prostě na něm pracuje, dokud nenajde platný hash.

Těžař je o něco efektivnější. Více se soustředí na těžbu. Náhodně hází hashe — to je přesně to, co náš těžař dělal předtím, jen je to abstrahováno. Můžeme vidět, jak to běží na pozadí a prostě chrlí hashe. Našel ho — blok šest je vytěžen.

#### Dvojí útrata a šíření v síti (10:00) {#double-spends-and-network-propagation-1000}

Nyní jsme mluvili o tomto problému dvojí útraty (double spending) a dokonce i o problému šíření v síti. Když máme účetní knihu a distribuovanou síť a někdo odešle transakci, dostane se k různým lidem v různou dobu. Proto bychom mohli mít v síti dva těžaře, kteří oba vytěží blok ve stejnou dobu a mají v nich různé transakce.

Každý z nich je v danou chvíli platný — oba provedli důkaz prací (PoW), oba mají počáteční nuly. Ale oba nemohou být kanonické. Oba nemohou být pravdou. Potřebujeme tedy způsob, jak by síť mohla dojít ke konsensu o tom, který z nich je ten skutečný řetězec.

#### Více těžařů a konsensus (12:27) {#multiple-miners-and-consensus-1227}

Dovolte mi vzít tento blok a přesunout ho sem. Chci, aby dva různí těžaři pracovali na stejném problému, tak nějak poslouchali stejný transakční pool a přicházeli s bloky nezávisle na sobě. Máme dva těžaře: Mallory a Mikea. Zvýšil jsem obtížnost na tři a oba pracují na nalezení hashe se třemi počátečními nulami.

Takže Mallory našla blok jako první! Skvělé. Co se stane teď — protože jsme v distribuované síti, Mike možná o bloku od Mallory ještě ani neví. Možná stále pracuje na své vlastní verzi. A teď ho našel i Mike. Máme tedy dvě platné cesty.

Pokud jste jeden peer v síti a vidíte blok od Mallory jako první, myslíte si, že to je ten hlavní blok. Později dorazí Mikeův blok. Necháváte si oba pro případ, že by se jeden z nich stal nejdelším řetězcem. A pravidlo zní: sledujte nejdelší platný řetězec.

#### Coinbase a odměny za blok (15:33) {#coinbase-and-block-rewards-1533}

Když těžař vytěží blok, řekneme: tady jsou všechny transakce, které chceme, tady je nonce, tady je rodič — ale také řekneme, tady je osoba, která tento blok vytěžila. Říká se tomu coinbase — myslím, že teď existuje společnost, která se tak jmenuje, ale to je něco jiného. My tomu budeme říkat prostě „těžař“. Takže naše bloky nyní vyžadují pole pro těžaře.

Takže Mike právě našel blok a Mike z toho také získá hodnotu deset. Musíme těžaře motivovat, aby dělali všechnu tuto práci, že? Utrácejí peníze za nákup těchto těžebních sestav, aby v podstatě zabezpečili síť. Tito těžaři utrácejí peníze za zabezpečení sítě veškerým svým hashovacím výkonem — se všemi těžaři dohromady, možná desítkami tisíc. Platí nemalé peníze za stavbu sestav, které pracují na těchto hashech, a abychom je motivovali, dáváme jim podíl zvaný odměna za blok z každého bloku, který vytěží.

#### Odměny za blok a pobídky (16:52) {#block-rewards-and-incentives-1652}

Takže v této verzi bloku má Mallory deset dolarů, ale v této verzi má deset dolarů Mike. Každý z těchto dvou hráčů je motivován pokračovat ve svém vlastním řetězci a zbytek sítě musí najít konsensus. V podstatě jde o to, kdo má nejdelší platný řetězec.

Mike nastaví svůj blok jako rodiče a začne pracovat na dalším bloku. Mallory udělá to samé. A záleží na tom, kdo další v síti se přidá na čí stranu. Protože nechceme trestat lidi se špatným připojením k síti, jsem si docela jistý, že v Ethereu platíme za uncle bloky — platné bloky, které se nedostaly do nejdelšího řetězce — protože stále pomáhají zabezpečit síť.

Měli jsme tento problém s koordinací a konsensem a vyřešili jsme ho tím, že jsme zavedli toto libovolné množství práce, které musí být vynaloženo, aby byly transakce platné. Mallory odvedla všechnu tuto práci neustálým hashováním, aby našla tři počáteční nuly hashe všech těchto transakcí a předchozího bloku.

#### Dotazování blockchainu (18:30) {#querying-the-blockchain-1830}

Můžeme komunikovat s jakýmkoli řetězcem, který je nejdelší. Mike se ještě nedostal na sedm, takže vidíme, že výška je tady stále šest. A můžeme dělat věci jako dotazovat se na zůstatky lidí. Takže klikneme na zůstatek — co dostaneme? Pět set dvacet čtyři. Takže Heidi sedí na 524 nebo jakýkoli je nativní token pro tento řetězec. Můžeme vidět její nonce, můžeme dělat všechno, co jsme mohli dělat s účetní knihou, ale teď skládáme bloky na sebe a tyto bloky obsahují transakce.

Abstrahovali jsme práci od uživatelů, kteří jen posílají peníze, na těžaře a motivovali jsme je tím, že jsme jim dali tuto odměnu za blok. Bude tu také malá částka, kterou každý zaplatí za transakci, ale k tomu se dostaneme v pozdější epizodě. Nechceme teď mluvit o gasu, ale je dobré vědět, že existuje pobídka nejen k vytěžení bloku, ale k vytěžení plného bloku se spoustou transakcí. Ale to je menší pobídka — k tomu se nakonec dostaneme.

#### Neměnnost řetězce (19:51) {#chain-immutability-1951}

Jak jsou bloky těženy, stávají se stále bezpečnějšími. Ukážu vám, co tím myslím. Takže Mike vytěžil blok, Mallory tady dělala ukázku a nebyla schopna vytěžit blok. Takže teď bude Mikeův řetězec nejdelší a rozšíří se po síti. Všichni ho uvidí a řeknou: dobře, tento řetězec má sedm bloků, všechny jsou platné — to je ten, který budeme sledovat. Můžete narazit na hard forky, sporné forky, kde se pravidla, podle kterých hrajeme, změní a různé skupiny lidí chtějí sledovat různé řetězce. Skvělé věci.

Dobře, a nakonec, pokud se vrátíme k bloku tři a něco změníme — změníme jakýkoli malý detail — půjdu sem. Je tu nějaká transakce pro Franka. Řekněme, že místo Franka to změníme na Evu. Teď sledujte, co se stane, když kliknu na OK: podívejte se na to. Změnil jsem malinký kousek bloku tři a najednou se celý řetězec rozpadne. Už není platný. Kdybych to odvysílal do sítě, lidé by mě vysmáli.

Jakmile je blok vytěžen, nemůžete nic změnit, pokud se nevrátíte a nevytěžíte věci znovu tak, jak se mění. V podstatě bych musel těžaře znovu připojit sem a pokusit se mít dostatek výkonu, abych dohnal Mikea až sem se sedmi bloky. Bylo by to velmi, velmi těžké. Čím hlouběji blok je, tím těžší je se z toho vrátit. Skutečnost, že tento blok tři, kde Carlos poslal 84 Bobovi — Bob si může být docela jistý, že když je to několik bloků hluboko, ty peníze tam určitě jsou. Neexistuje způsob, že by tu vznikl nějaký sporný fork — jsem v suchu. Tomu říkáme finalita.

#### Shrnutí (22:00) {#summary-2200}

Místo toho, abychom měli účetní knihu a tento problém s konsensem, používáme důkaz prací (PoW) k chrlení hashů pro ověření bloku — a „platný“ znamená libovolný počet počátečních nul. Při budování řetězce bloků budeme stále narážet na problémy, kdy vytěžené bloky mohou ve skutečnosti dorazit na různá místa v různou dobu. Máme tedy další algoritmus konsensu, který říká: sledujte nejdelší řetězec, který je platný a který se řídí sadou pravidel, na kterých se chcete podílet.

Tak jo, šťastný motýlkový pátek! To byl blockchain na ETH.BUILD. Uložím to a dám to tam, abyste mohli jen kliknout na „načíst“ a měli řetězec, se kterým si můžete hrát. Šťastný pátek!