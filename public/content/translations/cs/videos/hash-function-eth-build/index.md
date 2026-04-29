---
title: "Hashovací funkce — ETH.BUILD"
description: "Ukázka kryptografických hashovacích funkcí pomocí vzdělávacího nástroje ETH.BUILD. Zjistěte, jak fungují hashovací funkce a proč jsou zásadní pro model účtů a integrity dat Etherea."
lang: cs
youtubeId: "QJ010l-pBpE"
uploadDate: 2021-01-14
duration: "0:04:39"
educationLevel: beginner
topic:
  - "účty"
  - "kryptografie"
format: tutorial
author: Austin Griffith
breadcrumb: "Hashovací funkce (ETH.BUILD)"
---

Návod od **Austina Griffitha**, který ukazuje, jak fungují kryptografické hashovací funkce pomocí vizuálního programovacího nástroje ETH.BUILD, a pokrývá determinismus, výstup s pevnou délkou, jednosměrné vlastnosti a Merkleovy stromy.

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=QJ010l-pBpE), který zveřejnil Austin Griffith. Byl lehce upraven pro lepší čitelnost.*

### Úvod do hashovacích funkcí (0:00) {#introduction-to-hash-functions-000}

Toto je první video ze série s názvem ETH.BUILD. Můžete jít na eth.build a tento nástroj použít, ale slouží jen k tomu, abyste si s ním pohráli a udělali si představu o tom, jak věci fungují při vývoji na Ethereu.

První modul, na který se podíváme, je hashovací funkce. Co to sakra je hashovací funkce? No, je to něco jako otisk prstu. Máte vstup — může to být cokoliv — ale prozatím si vystačíme s textem „hello world“. Na druhé straně budete mít výstup a tímto výstupem je 64znakový hexadecimální řetězec. Píše se tam 66 znaků kvůli předponě „0x“, ale ve skutečnosti je to 64znakový hexadecimální řetězec.

### Vizualizace hashů jako barev (0:50) {#visualizing-hashes-as-colors-050}

Když se podíváte na hexadecimální zápis, vypadá to trochu jako barva, a možná by bylo snazší popsat, co tu vidíme, kdybychom z toho prostě udělali barvu. Takže to, co uděláme, je, že vezmeme prvních šest znaků jakéhokoliv řetězce a zobrazíme je jako barvu. Když se na to podíváme, vidíme, že je to pěkná fialová barva.

Pojďme se podívat, jakou barvu má moje jméno — tady to máme, pěkná lesní zelená. Teď se vraťme k „hello world“ — je to zase ta fialová.

### Determinismus a výstup s pevnou délkou (1:38) {#determinism-and-fixed-length-output-138}

Právě jsme zjistili, že je to deterministické. V podstatě, ať už zadáme jako vstup cokoliv, na druhé straně vždy dostaneme to samé.

Druhou vlastností je, že můžete vložit cokoliv libovolné velikosti. Můžu bušit do klávesnice a sledovat, jak se barva mění, ale ten řetězec zůstává na délce 66 znaků. Bez ohledu na to, co sem vložíte — dokonce i soubor — mohl bych sem přetáhnout tento soubor s Leem, mým synem, vložit ho jako hash a získat pěknou oranžovou barvu. Pak bych mohl přetáhnout textový dokument se seznamem slov BIP a je z toho tahle pěkná světle modrá. Když vrátím Lea zpět, hádejte, jaká to bude barva? Víme, že to bude ta oranžová. Získáte tento deterministický otisk prstu věci, kterou jste vložili.

### Jednosměrná vlastnost (2:37) {#one-directional-property-237}

Další nejdůležitější vlastností je, že je to jednosměrné. Pokud znovu zadám „hello world“, dostaneme tento hash „4717“. Pokud tento hash vezmeme, pošleme ho někomu a řekneme „tady je hash mého tajemství — pokud mé tajemství uhodneš, dám ti sto babek“, ani se k němu nepřiblíží.

Řekněme, že hash začíná na „4717“ a oni začnou zkoušet a hledat shodu. Nemůžete jen tak měnit malé znaky a přiblížit se — buď to trefíte, nebo ne. V podstatě to musíte uhodnout hrubou silou (brute-force). Pokud náhodou uhodnou „hello world“, získají odpověď, ale pokud to neuhodnou, nikdy na to nepřijdou. Neexistuje způsob, jak zjistit, jestli se blížíte.

U kryptografie zjistíte, že je to pro vývojáře někdy frustrující, protože to buď funguje, nebo ne — nedostanete žádné nápovědy o tom, jestli se blížíte. Ale to je dobře. To je přesně ta vlastnost, kterou od hashovací funkce chceme.

### Shrnutí vlastností hashovací funkce (3:43) {#summary-of-hash-function-properties-343}

Takže tu máme: do hashovací funkce lze vložit cokoliv jakékoliv velikosti a ona vyplivne přesný 64znakový hexadecimální otisk prstu toho, co ta data jsou. Je to deterministické. Je to jednosměrné — nemůžete jít zpět. Je opravdu snadné vytvořit hash, ale opravdu těžké uhodnout tajemství hashe.

### Merkleovy stromy a kombinování hashů (4:06) {#merkle-trees-and-combining-hashes-406}

S tímto můžeme dělat opravdu úžasné věci, jako je Merkleův strom. Máme naše tři vstupy a mohli bychom je spojit dohromady. Můžeme zkombinovat všechny tyto hashe a pak tuto kombinaci zahashovat.

Tato barva přímo tady — ta fialová — představuje hash všech těchto hashů. Pokud změním „hello world“ na „hello world one“, ta fialová se změní. Jakákoliv malá změna u kteréhokoliv z těchto vstupů způsobí změnu výsledného hashe. Můžete přinést nejrůznější data nejrůznějšími způsoby — dokonce mít strom hashů, Merkleův strom — nebo mít řadu bloků za sebou, a tento konečný hash bude založen na všech těchto věcech. Pokud se kdekoliv po cestě změní jakákoliv maličkost, konečný hash se změní.

### Klíčový poznatek (5:53) {#key-takeaway-553}

Klíčovým poznatkem je, že hashovací funkce je v podstatě jako otisk prstu. Pokud něco napíšu, deterministicky mi to dá výstup, který očekávám. To je hashovací funkce — vítejte v ETH.BUILD. Pojďme vytvořit nějaké skvělé věci a cestou se toho hodně naučit.