---
title: "Pár klíčů — ETH.BUILD"
description: "Ukázka párů veřejného a soukromého klíče pomocí vzdělávacího nástroje ETH.BUILD. Zjistěte, jak kryptografické páry klíčů zabezpečují účty na Ethereu a umožňují podepisování transakcí."
lang: cs
youtubeId: "9LtBDy67Tho"
uploadDate: 2021-01-14
duration: "0:04:05"
educationLevel: beginner
topic:
  - "accounts"
  - "cryptography"
format: tutorial
author: Austin Griffith
breadcrumb: "Páry klíčů (ETH.BUILD)"
---

Návod od **Austina Griffitha**, který ukazuje, jak fungují páry veřejného a soukromého klíče pomocí vizuálního programovacího nástroje ETH.BUILD. Pokrývá generování soukromého klíče, odvození veřejného klíče, podepisování zpráv a obnovu podpisu.

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=9LtBDy67Tho), který zveřejnil Austin Griffith. Byl lehce upraven pro lepší čitelnost.*

### Soukromý klíč (0:00) {#the-private-key-000}

V prvním videu jsme použili hash a hashe budou důležité i nadále. Další nejdůležitější součástí je ale pár klíčů. Nejdůležitější částí páru klíčů je soukromý klíč. Pojďme si jeden vygenerovat – je to v podstatě náhodný 64znakový hexadecimální řetězec, stejně velký jako hash, se kterým jsme právě pracovali.

Začnete s ním jako se svým soukromým klíčem a poté pomocí kryptografie eliptických křivek – podívejte se na Wikipedii jako na vedlejší úkol – odvodíme veřejný klíč. Takže teď máme soukromý klíč a veřejný klíč. Právě jsme z ničeho nic vygenerovali soukromý klíč a veřejný klíč nám dává adresu. To je místo, kam by lidé mohli skutečně posílat peníze. Když někdo řekne „pošlete to na mou adresu na Ethereu“, je to přesně ono.

Kdybych si chtěl vytvořit účet u Wells Fargo, musel bych jet do banky a poskytnout jim spoustu informací. Chvíli by to trvalo. Ale k vygenerování účtu v kryptografickém systému, jako je tento, kde mohu posílat a přijímat peníze, mi stačí vygenerovat tento soukromý klíč. Z tohoto 64znakového hexadecimálního soukromého klíče se odvozuje vše ostatní.

### Podepisování a obnova zpráv (1:54) {#signing-and-recovering-messages-154}

Tento pár klíčů má jednu opravdu skvělou vlastnost, kterou bychom měli prozkoumat, a tou je podepisování a obnova zpráv. V podstatě vezmete svůj soukromý klíč a použijete ho k podepsání nějaké zprávy. Napišme si zprávu – „medvěd je ulepený od medu“.

Vložíme to jako naši zprávu a se zapnutým automatickým podepisováním nám to vrátí podpis. Podobně jako hash, náš podpis v podstatě vezme zprávu a náš soukromý klíč a něco podepíše. To, co z toho získáme, je podpis.

Mohu to poslat do světa – mohl bych to poslat veřejně všem – tento řetězec podpisu spolu se zprávou. Kdokoli pak může pomocí matematiky ověřit, že jsem to podepsal konkrétně já.

### Obnova adresy podepisujícího (3:17) {#recovering-the-signers-address-317}

Dovolte mi ukázat, jak to funguje. Použijeme metodu „recover“ (obnovit). Potřebujeme dva vstupy: zprávu – „medvěd je ulepený od medu“ – a podpis. To, co z toho vyjde, je adresa, která byla použita k jejímu podepsání. Pomocí identikonů Blockie můžeme vizuálně vidět, že účet tuto zprávu podepsal.

Není možné s tím nijak manipulovat. Pokud někdo změní byť jen jediné slovo – například zamění „medvěda“ za „jezevce“ – všechno se změní. I se stejným podpisem vyhodí jiná zpráva jinou adresu, nikoli tu správnou.

S touto zprávou nelze manipulovat. Mohli bychom tam přidat časové razítko – mohli bychom říct „v tento den předpovídám, že se něco stane“, podepsat to, zveřejnit podpis a zprávu a kdokoli po zbytek času může matematicky dokázat, že jste tuto zprávu v daný čas podepsali.

### Klíčová vlastnost páru klíčů (4:58) {#the-key-property-of-a-key-pair-458}

Toto je klíčová vlastnost páru klíčů. Pár klíčů vygenerovaný z pouhého 64znakového hexadecimálního náhodného řetězce lze použít k podepsání zprávy a tuto zprávu lze následně obnovit.

- Soukromý klíč + zpráva = podpis
- Podpis + zpráva = veřejná adresa

Můžeme podepisovat data naším soukromým klíčem a lidé mohou dokázat, že jsme to podepsali my. To bude důležitá součást pro další krok.