---
title: "Bezpečnost skrze utajení: využití mikroteček k uchovávání tajemství"
description: "Představení netradičního přístupu ke správě klíčů pomocí fyzické technologie mikroteček, která maskuje seed fráze v tištěných obrázcích neviditelných pouhým okem."
lang: cs
youtubeId: "k9Dfg19JPEw"
uploadDate: 2024-11-15
duration: "0:09:55"
educationLevel: intermediate
topic:
  - "soukromí a bezpečnost"
  - "soukromí"
  - "autentizace"
format: presentation
author: Ethereum Foundation
breadcrumb: "Bezpečnost mikroteček"
---

Blesková přednáška, kterou přednesl **jseam** na Devcon SEA, zkoumá netradiční přístup ke správě klíčů pomocí fyzické technologie mikroteček. Ta se historicky používala ve špionáži a zde slouží k maskování seed frází v tištěných obrázcích, které jsou pouhým okem prakticky neviditelné.

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=k9Dfg19JPEw), který zveřejnila Nadace Ethereum. Byl lehce upraven pro lepší čitelnost.*

#### Proč mikrotečky? (0:00) {#why-microdots-000}

Ahoj všichni, vítejte v Thajsku. Ve své přednášce budu mluvit o mikrotečkách – co přesně to je, proč byste je mohli chtít a jak si je můžete sami vyrobit. Mám tu nějaké vzorky, takže po přednášce si je můžete prohlédnout.

Existuje spousta otázek ohledně operační bezpečnosti (OpSec) a toho, jak můžete skrýt seed fráze. Mnoho stávajících procesů je čistě digitálních. Ale co když existují fyzické procesy? Co když můžete věci zamaskovat? Správa klíčů zůstává obrovským problémem. Máme sdílení tajemství (secret sharing), sociální obnovu – ale vím, že spousta krypto lidí je tak trochu asociální, takže sociální obnova může být obtížná.

Podívejte se na tento graf: právě teď tu máme epidemii osamělosti. Takže správa klíčů a sociální obnova budou obrovské problémy. Co když existují fyzické přístupy k maskování informací?

#### Historie steganografie pomocí mikroteček (2:00) {#the-history-of-microdot-steganography-200}

Toto je steganografická technika zvaná mikrotečky. Dnes ji ukazuji proto, že se historicky používala ve špionáži. Cílem je v podstatě skrýt zprávy přímo na očích.

Veškerá dokumentace k tomuto tématu je velmi omezená. Pravděpodobně se zeptáte Clauda a ten vám odpoví: „Omlouvám se, nemám pro vás žádné informace.“ Sám jsem tyto informace zpětně analyzoval (reverse-engineering). Snímky prezentace vše dokumentují. Nebudu schopen pokrýt každý detail, ale projdu ty nejzajímavější části. Vytvořil jsem také repozitář na GitHubu, který tyto procesy dokumentuje.

#### Analogová fotografie pro bezpečnost (3:30) {#analog-photography-for-security-330}

Pro tento případ použití oživíme analogovou fotografii. Proč analogovou? V podstatě neexistuje šance, že by někdo mohl hacknout analogový fotoaparát, pokud vám ho fyzicky neukradne.

Jedním z hlavních problémů analogové fotografie je ISO. U digitálního fotoaparátu to není velký problém – můžete si ho upravit. Ale u filmu je ISO závislé na zrnitosti filmu. To se stává problémem, když chcete obrázek zmenšit. Obecně platí, že čím menší je ISO, tím menší je zrno.

Existují dvě fáze. Nejprve pořídíte fotografii, vyvoláte ji a ustálíte. Ve druhé fázi místo zvětšování obrazu uděláme pravý opak – zmenšíme ho do mikroskopického měřítka.

#### Britský proces (5:00) {#the-british-process-500}

Takhle se to dělá. Napíšete si svou seed frázi. Normálně vás návod na MetaMask vyzve, abyste si seed frázi zapsali – ale kam ji pak dáte? Tohle je jeden ze způsobů: vyfotíte si seed frázi, navinete film a vyvoláte ho. Zajímavé je, že to všechno jsou těžké kovy, sloučeniny stříbra. Neměli byste je vylévat do záchodu. Já jsem jich omylem trochu do záchodu vylil, takže jsem se možná dopustil nějakého ekologického přestupku. V nejhorším případě mi to pravděpodobně zkoroduje trubky.

Vyfotíte to znovu a tadá – máte tuhle malinkou tečku. Tomu se říká britský proces.

#### Dichromanový proces (7:00) {#the-dichromated-process-700}

Dalším, ještě extrémnějším procesem je dichromanový proces. Tímto způsobem můžete dosáhnout mikroskopického zvětšení, například 1000x. Cílem je najít pro to chemický substrát, a tady přichází na řadu to, čemu říkám „zakázaný pomerančový džus“ – dichroman amonný. Je velmi toxický. Trochu jsem ho rozlil a málem jsem zemřel, když jsem vdechl ten prach. Asi bych po tomhle měl jít na vyšetření na rakovinu.

Promítnete obraz a na kousku papíru získáte tyto malinké tečky. Tečky jsou tak malé, že rozhodně potřebujete mikroskop. Tu, která vznikla britským procesem, můžete vidět pouhým okem, ale dichromanový proces vytváří něco opravdu mrňavého – bez mikroskopu si ani nejsem jistý, jestli je to vůbec skutečný obrázek.

#### Otázky a odpovědi (8:00) {#qa-800}

Jak malé jsou mikrotečky? Tu, která byla vytvořena britským procesem, můžete vidět pouhým okem, ale dichromanový proces vytváří něco opravdu mrňavého – rozhodně potřebujete mikroskop. Bez něj je těžké říct, jestli je to vůbec skutečný obrázek.

**Otázka:** Jak dlouho to vydrží? Existuje nějaký poločas rozpadu?

**jseam:** Není to radioaktivní. To zjistíme za 20 let.

**Otázka:** Zkusil jste ten proces obrátit – zakódovat a pak dekódovat, abyste zjistil, jestli to dokážete obnovit?

**jseam:** Myslím, že by to šlo. Pravděpodobně byste k tomu potřebovali nějakou sestavu pro optickou projekci.

Mnohokrát děkuji. Pokud byste chtěli vidět vzorky, budu se pohybovat někde tady kolem. Děkuji vám za váš čas.