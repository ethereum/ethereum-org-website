---
title: "Blockchain 101: vizuální ukázka"
description: "Ukázka toho, jak funguje technologie blockchainu, pokrývající hashování, bloky, řetězce, distribuované účetní knihy a tokeny, aby byly koncepty blockchainu hmatatelné a intuitivní."
lang: cs
youtubeId: "_160oMzblY8"
uploadDate: 2016-11-13
duration: "0:17:49"
educationLevel: beginner
topic:
  - "blockchain"
  - "kryptografie"
format: presentation
author: Anders Brownworth
breadcrumb: "Blockchain 101"
---

Vizuální ukázka Anderse Brownwortha o tom, jak funguje technologie blockchainu, včetně průvodce pokrývajícího hashování SHA-256, bloky, těžbu, blockchainy, distribuované účetní knihy, tokeny a další.

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=_160oMzblY8), který zveřejnil Anders Brownworth. Byl lehce upraven pro lepší čitelnost.*

#### Hash SHA-256 (0:01) {#sha-256-hash-001}

Toto je ukázka blockchainu. Uděláme to velmi vizuálním způsobem – usnadníme pochopení tím, že si projdeme klíčové části toho, co to blockchain je.

Než začneme, musíme se podívat na věc zvanou hash SHA-256. Hash vypadá jako hromada náhodných čísel a v podstatě jde o otisk nějakých digitálních dat. Shodou okolností je to otisk čehokoli, co napíšu do tohoto pole. Pokud do tohoto pole napíšu své jméno „Anders“, uvidíte, že se hash změnil. Ve skutečnosti se změnil pokaždé, když jsem napsal písmeno.

Takže toto je hash jména „Anders“, vše malými písmeny – začíná na `19ea`. Pokud to smažu a znovu napíšu „Anders“, můžete vidět, že začíná na `19ea` – naprosto stejný hash. V tomto smyslu je to digitální otisk těchto dat. Ať už jsou zde jakákoli data, pokaždé, když zadáte přesně stejná data, získáte přesně stejný hash.

Můžu napsat, co chci. Nemusíte tam mít nic – `e3b0` – to je hash ničeho. Nebo byste mohli napsat tuny a tuny věcí. Vlastně byste sem mohli vložit celou Kongresovou knihovnu a získali byste hash. Zajímavé je, že bez ohledu na to, zda je tam nepatrné množství informací, žádné informace, nebo celá Kongresová knihovna, vždy získáte hash, který je takto dlouhý. Nebudete schopni předem uhodnout, jaký bude – musíte data vložit, abyste zjistili, jaký je to hash, ale vždy získáte naprosto stejný hash bez ohledu na to, kolikrát vložíte naprosto stejné informace.

#### Blok (2:10) {#block-210}

Nyní tuto myšlenku hashe rozšířím na něco, čemu budeme říkat blok. Blok je přesně jako hash, ale datová část byla rozdělena do tří sekcí: jedna se jmenuje „blok“ – jen číslo, toto je blok číslo 1 – „nonce“, což je jen další číslo, a pak nějaká data, přesně jako jsme měli předtím.

Hash všech těchto informací je dole a začíná čtyřmi nulami. To je poměrně neobvyklý hash – většina z nich nebude začínat čtyřmi nulami. Ale tento ano, a protože ano, zcela libovolně řeknu, že tento blok je „podepsaný“.

Co by se stalo, kdybych změnil jakoukoli část těchto informací? Řekněme, že sem něco napíšu – hash se změní a jaká je šance, že bude začínat čtyřmi nulami? Docela nízká. Napíšu jen „ahoj“ – podívejte se na to, tento hash nezačíná čtyřmi nulami a pozadí zčervenalo. Takže teď víte, že tento blok s těmito informacemi není platný nebo podepsaný blok.

A tady přichází na řadu nonce. Nonce je jen číslo, které můžete nastavit, abyste se pokusili najít hodnotu, díky které bude hash opět začínat čtyřmi nulami. Mohl bych tu sedět celý den a psát čísla, ale mám tu toto malé tlačítko „Těžit“ (Mine). Když ho stisknu, stane se to, že projde všechna čísla od 1 nahoru, aby se pokusilo najít takové, kde hash začíná čtyřmi nulami. Tento proces se nazývá těžba.

Zastavilo se to na 59 396 – a to shodou okolností vytvoří hash, který začíná čtyřmi nulami. Splňuje to mou definici toho, co je podepsaný blok.

#### Blockchain (5:16) {#blockchain-516}

Takže, můžete mi říct, co je to blockchain? Je to pravděpodobně jen řetězec těchto bloků. Tady je můj blockchain – blok číslo jedna má nonce stejně jako předtím, datovou oblast, ale pak má toto pole „předchozí“ (previous), což je hromada nul. Když se posuneme dál, toto je blok dva, blok tři, blok čtyři – tento blockchain má pět bloků.

Pole „předchozí“ pro každý blok je hash bloku před ním. Můžete vidět, že každý blok ukazuje zpět na ten předchozí. Ten první blok nemá žádný předchozí, takže je to jen hromada nul.

Co se stane, když zde změním nějaké informace? Změní to hash tohoto bloku a zneplatní ho. Ale co když změním něco v dřívějším bloku? Změní to jeho hash, ale tento hash se zkopíruje do pole „předchozí“ dalšího bloku, takže to rozbije oba bloky. Můžeme se vrátit jakkoli daleko do minulosti a rozbít ten blok, a to rozbije všechny bloky od té doby. Všechno před ním je stále zelené, ale všechno po něm zčervená.

Pokud půjdu a změním poslední blok, vše, co musím udělat, je znovu vytěžit tento jeden blok. Pokud se vrátím hluboko do minulosti a provedu změnu, musím vytěžit tento, tento, tento a tento. Čím více bloků uplyne, tím těžší a těžší je provést změnu. Takto blockchain odolává mutacím – odolává změnám.

#### Distribuovaný blockchain (9:18) {#distributed-blockchain-918}

Jak bych tedy poznal, že můj blockchain byl znovu vytěžen? Nyní tu máme distribuovaný blockchain. Vypadá přesně jako ten předchozí blockchain, ale toto je Peer A. Pokud půjdete dolů, uvidíte Peera B a ten má přesnou kopii blockchainu. Je tu také Peer C – takto by to mohlo pokračovat donekonečna. Na internetu je mnoho peerů a všichni mají kompletní kopii blockchainu.

Když se podívám na tento hash, je to `e4b`. Když přejdu dolů k dalšímu, má také `e4b`. Musí být identické. Nyní, pokud sem půjdu a něco napíšu, znovu vytěžím tento blok a pak vytěžím další bloky – všechny řetězce jsou zelené. Nicméně tento řetězec říká, že poslední hash je `e4b`, ten spodní také říká `e4b` a tento prostřední říká `4cae`.

Takže jen letmým pohledem na tento jeden malý hash vím, že v tomto blockchainu je něco špatně. I když všechny hashe začínají čtyřmi nulami, tento je jiný. Je to v podstatě dva proti jednomu – jsme tu taková malá demokracie. Takže `e4b` vyhrává. Takto vám kompletně distribuovaná kopie na mnoha různých počítačích umožňuje rychle zjistit, zda jsou všechny bloky identické.

Blockchainy mohou mít velmi snadno 400 000 nebo 500 000 bloků. Místo toho, abyste je všechny kontrolovali, stačí se podívat na hash toho nejnovějšího a hned vidíte, zda bylo v minulosti něco změněno.

#### Tokeny (12:17) {#tokens-1217}

To je celá věc – nic víc v tom není. Ale není to tak úplně užitečné, protože v datové oblasti nemáme nic, co by něco znamenalo. To, co opravdu chceme, je token.

Nyní mám tyto tokeny – zcela libovolně jim říkám dolary. Máme dvacet pět dolarů od Darcyho pro Bingleyho, čtyři dolary a dvacet sedm centů od Elizabeth pro Jane – chápete pointu. Probíhají všechny tyto transakce a já jsem jen nahradil data těmito transakcemi. Stejně jako předtím, když půjdeme dolů, všimneme si, že máme všechny tyto další kopie stejného blockchainu.

Zde je důležitá neměnnost. Pokud zde něco změním, hash se bude lišit od toho, co je na ostatních kopiích. Je velmi důležité, že pokud se vrátíte v čase a změníte nějakou hodnotu, všimli bychom si toho. U peněz je velmi důležité, abyste neztratili přehled, a to je celý smysl používání blockchainu – odolávat jakýmkoli úpravám věcí, které se staly v minulosti.

Jednu věc bych rád zmínil: neuvádíme, že „Darcy má sto dolarů a dává 25 Bingleymu“. Pamatujeme si pouze pohyby peněz, nikoli zůstatky na bankovních účtech. To vyvolává otázku – má Darcy 25 dolarů?

#### Transakce Coinbase (14:34) {#coinbase-transaction-1434}

V této verzi blockchainu máme problém: vlastně nevíme, jestli má Darcy 25 dolarů. Podívejme se tedy na transakci Coinbase. Přidáme do našich bloků transakci Coinbase – ta říká, že ze vzduchu vytvoříme sto dolarů a dáme je Andersovi. V tomto bloku nejsou žádné další transakce, protože předtím nikdo žádné peníze neměl.

V dalším bloku se odnikud objeví dalších sto dolarů a jdou Andersovi. Nyní tu máme nějaké transakce – všechny jsou od Anderse, protože v tuto chvíli jsem jediný, kdo má nějaké peníze. Posílám deset svých dolarů Sophii. Mám deset dolarů? Jo – podívám se zpět a vidím, že transakce Coinbase mi dala sto, takže mám alespoň deset.

Když to všechno sečtete, nepřesáhne to stovku. Řídí se to základním pravidlem měny: nemůžete vytvářet peníze ze vzduchu a jejich rozptylování je kontrolováno.

Pokud se posuneme v čase dopředu, vidíme, že Jackson dává Alexe dva dolary. Má Jackson skutečně dva dolary? Vrátíme se o blok zpět a vidíme, že Emily dostala deset dolarů od Anderse a dala deset Jacksonovi. Takže Jackson ty peníze má. Můžeme jít zpět a zjistit to – to je jedna z výhod pole „předchozí“.

#### Závěr (16:30) {#closing-1630}

To je základní blockchain, na kterém běží měna. Jak víte, blockchainy mají mnoho kopií – každý má kopii. Pokud něco zmutujeme a uděláme z toho šest dolarů, bloky se stanou neplatnými a nebudou se shodovat s ostatními kopiemi. To odolává manipulaci, což je přesně to, co u měny chcete. Funguje to velmi dobře pro věci, které jsou malé a transakční.

Blockchainy jsou velmi efektivní způsob, jak řešit shodu na tom, co se stalo v minulosti – tuto neměnnou historii, která se s časem zapisuje. Přeskakujeme některé hlavní body, ale pokud se ponoříte do ukázky, proklikáte si tyto věci a pohrajete si s tím, získáte stále lepší představu o tom, jak to funguje.