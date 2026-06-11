---
title: Jak překládat
lang: cs
description: Pokyny pro používání platformy Crowdin k překladu ethereum.org
---

## Vizuální průvodce {#visual-guide}

Pokud se raději učíte vizuálně, podívejte se, jak Luka ukazuje nastavení platformy Crowdin. Případně najdete stejné kroky v písemné podobě v další části.

<VideoWatch slug="crowdin-translation-guide" />

## Písemný průvodce {#written-guide}

### Připojte se k našemu projektu na platformě Crowdin {#join-project}

Budete se muset přihlásit ke svému účtu Crowdin, nebo se zaregistrovat, pokud jej ještě nemáte. K registraci je potřeba pouze e-mailový účet a heslo.

<ButtonLink href="https://crowdin.com/project/ethereum-org/">
  Připojit se k projektu
</ButtonLink>

### Otevřete svůj jazyk {#open-language}

Po přihlášení do platformy Crowdin uvidíte popis projektu a seznam všech dostupných jazyků.
Každý jazyk také obsahuje informace o celkovém počtu slov k překladu a přehled o tom, kolik obsahu již bylo v daném jazyce přeloženo a schváleno.

Otevřete jazyk, do kterého chcete překládat, a zobrazí se vám seznam souborů dostupných k překladu.

![List of languages in Crowdin](./list-of-languages.png)

### Najděte si dokument, na kterém chcete pracovat {#find-document}

Obsah webových stránek je rozdělen do řady dokumentů a obsahových skupin (tzv. content buckets). Průběh překladu každého dokumentu můžete zkontrolovat vpravo – pokud je průběh překladu nižší než 100 %, zapojte se prosím!

Nevidíte svůj jazyk v seznamu? [Otevřete issue](https://github.com/ethereum/ethereum-org-website/issues/new/choose) nebo se zeptejte na našem [Discordu](https://discord.gg/ethereum-org)

![Translated and untranslated files in Crowdin](./crowdin-files.png)

Poznámka k obsahovým skupinám: v platformě Crowdin používáme „obsahové skupiny“ (content buckets), abychom zajistili, že obsah s nejvyšší prioritou bude vydán jako první. Když si otevřete nějaký jazyk, například [filipínštinu](https://crowdin.com/project/ethereum-org/fil#), uvidíte složky pro jednotlivé obsahové skupiny („1. Homepage“, „2. Essentials“, „3. Exploring“ atd.).

Doporučujeme překládat v tomto číselném pořadí (1 → 2 → 3 → ⋯), aby byly nejdříve přeloženy stránky s největším dopadem.

### Překládejte {#translate}

Po výběru souboru, který chcete přeložit, se soubor otevře v online editoru. Pokud jste Crowdin ještě nikdy nepoužívali, můžete využít tohoto stručného průvodce, který vás seznámí se základy.

![Crowdin online editor](./online-editor.png)

**_1 – Levý postranní panel_**

- Nepřeloženo (červená) – text, na kterém se ještě nepracovalo. Toto jsou řetězce, které byste měli překládat.
- Přeloženo (zelená) – text, který již byl přeložen, ale ještě nebyl zkontrolován. Můžete navrhnout alternativní překlady nebo hlasovat pro stávající pomocí tlačítek „+“ a „-“ v editoru.
- Schváleno (zaškrtnutí) – text, který již byl zkontrolován a je aktuálně zveřejněn na webových stránkách.

Pomocí tlačítek nahoře můžete také vyhledávat konkrétní řetězce, filtrovat je podle stavu nebo změnit zobrazení.

**_2 – Oblast editoru_**

Hlavní oblast pro překlad – zdrojový text je zobrazen nahoře, případně s dodatečným kontextem a snímky obrazovky, pokud jsou k dispozici.
Chcete-li navrhnout nový překlad, zadejte jej do pole „Enter translation here“ (Zde zadejte překlad) a klikněte na Uložit.

V této části najdete také existující překlady daného řetězce a překlady do jiných jazyků, stejně jako shody z překladové paměti a návrhy strojového překladu.

**_3 – Pravý postranní panel_**

Zde najdete komentáře, záznamy z překladové paměti a položky glosáře. Výchozí zobrazení ukazuje komentáře a umožňuje překladatelům komunikovat, upozorňovat na problémy nebo nahlašovat nesprávné překlady.

Pomocí tlačítek nahoře můžete také přepnout na Překladovou paměť (Translation Memory), kde můžete vyhledávat existující překlady, nebo na Glosář (Glossary), který obsahuje popisy a standardní překlady klíčových termínů.

Chcete se dozvědět více? Neváhejte se podívat do [dokumentace k používání online editoru Crowdin](https://support.crowdin.com/online-editor/)

### Proces kontroly {#review-process}

Jakmile dokončíte překlad (tj. všechny soubory pro danou obsahovou skupinu ukazují 100 %), naše profesionální překladatelská služba obsah zkontroluje (a případně upraví). Po dokončení kontroly (tj. průběh kontroly je 100 %) jej přidáme na webové stránky.

<Alert variant="update">
<AlertEmoji text=":warning:"/>
<AlertContent>
  K překladu projektu prosím nepoužívejte strojový překlad. Všechny překlady budou před přidáním na webové stránky zkontrolovány. Pokud se zjistí, že vaše navrhované překlady jsou přeloženy strojově, budou zamítnuty a přispěvatelé, kteří strojový překlad používají často, budou z projektu odstraněni.
</AlertContent>
</Alert>

### Ozvěte se nám {#get-in-touch}

Máte nějaké dotazy? Nebo chcete spolupracovat s naším týmem a dalšími překladateli? Napište nám do kanálu #translations na našem [Discord serveru ethereum.org](https://discord.gg/ethereum-org)

Můžete nás také kontaktovat na adrese translations@ethereum.org

Děkujeme za vaši účast v překladatelském programu ethereum.org!