---
title: Jak překládat
lang: cs
description: Instrukce pro používání Crowdinu pro překlad ethereum.org
---

# Jak překládat {#how-to-translate}

## Vizuální průvodce {#visual-guide}

Pro ty, kteří se lépe učí vizuálně: Podívejte se, jak vás Luka provede nastavením v Crowdinu. Alternativně můžete najít stejné kroky v psaném formátu v následující sekci.

<YouTube id="Ii7bYhanLs4" />

## Psaný průvodce {#written-guide}

### Připojte se k našemu projektu v Crowdinu {#join-project}

Budete se muset přihlásit do svého účtu Crowdin nebo se zaregistrovat, pokud ho ještě nemáte. K registraci stačí pouze e-mail a heslo.

<ButtonLink href="https://crowdin.com/project/ethereum-org/">
  Připojte se k projektu
</ButtonLink>

### Otevřete svůj jazyk {#open-language}

Po přihlášení do Crowdinu uvidíte popis projektu a seznam všech dostupných jazyků. Každý jazyk také obsahuje informace o celkovém počtu přeložitelných slov a přehled toho, kolik obsahu bylo v daném jazyce přeloženo a schváleno.

Otevřete jazyk, do kterého chcete překládat, abyste viděli seznam souborů dostupných k překladu.

![Seznam jazyků v Crowdinu](./list-of-languages.png)

### Najděte dokument, na kterém budete pracovat {#find-document}

Obsah webu je rozdělen do několika dokumentů a obsahových bloků. Napravo můžete zkontrolovat pokrok u každého dokumentu – pokud je pokrok překladu pod 100 %, přispějte!

Nevidíte svůj jazyk v seznamu? [Otevřete problém](https://github.com/ethereum/ethereum-org-website/issues/new/choose) nebo se zeptejte na našem [Discordu](https://discord.gg/ethereum-org)

![Přeložené a nepřeložené soubory v Crowdinu](./crowdin-files.png)

Poznámka k obsahovým blokům: V rámci Crowdinu používáme „obsahové bloky“, abychom nejprve přeložili obsah s nejvyšší prioritou. Když se podíváte na jazyk, například [filipínštinu](https://crowdin.com/project/ethereum-org/fil#), uvidíte složky pro obsahové bloky („1. Úvodní stránka“, „2. Základy“, „3. Průzkum“ atd.).

Doporučujeme vám překládat v tomto číselném pořadí (1 → 2 → 3 → ⋯), aby byly nejdůležitější stránky přeloženy jako první.

[Další informace o obsahových blocích ethereum.org](/contributing/translation-program/content-buckets/)

### Překládejte {#translate}

Po výběru souboru, který chcete přeložit, se otevře v online editoru. Pokud jste Crowdin nikdy nepoužívali, projděte si tohoto rychlého průvodce, abyste se seznámili se základy.

![Online editor Crowdin](./online-editor.png)

**_1 – Levý postranní panel_**

- Nepřeloženo (červeně) – text, na kterém se ještě nepracovalo. Toto jsou řetězce, které byste měli překládat.
- Přeloženo (zeleně) – text, který již byl přeložen, ale ještě nebyl zkontrolován. Můžete navrhnout alternativní překlady nebo hlasovat o stávajících pomocí tlačítek „+“ a „-“ v editoru.
- Schváleno (zaškrtnutí) – text, který již byl zkontrolován a je aktuálně naživo na webu.

Můžete také použít tlačítka nahoře k vyhledávání konkrétních řetězců, filtrování podle stavu nebo změně zobrazení.

**_2 – Oblast editoru_**

Hlavní oblast pro překlad - zdrojový text se zobrazuje nahoře s dalším kontextem a screenshoty, pokud jsou k dispozici. Chcete-li navrhnout nový překlad, zadejte svůj překlad do pole „Zadejte překlad zde“ a klikněte na Uložit.

V této sekci také najdete existující překlady řetězce a překlady do jiných jazyků, stejně jako shody z překladové paměti a návrhy strojového překladu.

**_3 – Pravý postranní panel_**

Zde můžete najít komentáře, položky překladové paměti a položky glosáře. Výchozí zobrazení ukazuje komentáře a umožňuje překladatelům komunikovat, upozorňovat na problémy nebo hlásit nesprávné překlady.

Pomocí tlačítek nahoře můžete také přepnout na Překladovou paměť, kde můžete vyhledávat existující překlady, nebo na Glosář, který obsahuje popisy a standardní překlady klíčových termínů.

Chcete se dozvědět více? Neváhejte a podívejte se na [dokumentaci k používání online editoru Crowdin](https://support.crowdin.com/online-editor/).

### Proces kontroly {#review-process}

Jakmile dokončíte překlad (tj. všechny soubory pro obsahový blok ukazují 100 %), náš profesionální překladatelský servis obsah zkontroluje (a případně upraví). Jakmile je kontrola dokončena (tj. pokrok kontroly je 100 %), přidáme ho na web.

<InfoBanner shouldCenter emoji=":warning:">
  Prosím, nepoužívejte strojový překlad. Všechny překlady budou před přidáním na web zkontrolovány. Pokud zjistíme, že vaše navržené překlady jsou strojové, budou odmítnuty a přispěvatelé, kteří často používají strojový překlad, budou z projektu odstraněni.
</InfoBanner>

### Kontaktujte nás {#get-in-touch}

Máte nějaké otázky? Nebo chcete spolupracovat s naším týmem a dalšími překladateli? Prosím, napište nám na kanálu #translations na našem [Discord serveru ethereum.org](https://discord.gg/ethereum-org).

Můžete se také obrátit na translations@ethereum.org

Děkujeme vám za vaši účast v překladatelském programu ethereum.org!
