---
title: Přidávání článků
description: Pokyny pro přispívání články pro tvůrce na ethereum.org
lang: cs
---

## Publikování článku pro tvůrce {#publishing-a-builder-article}

Články pro tvůrce se objevují na [ethereum.org/latest/](/latest/) a jsou psány jako soubory Markdown v repozitáři. Jde o interně hostované, rozsáhlé články, které obsahují přehledy a návody týkající se ekosystému Etherea, prostředí open-source technologií, a také aktuální novinky pro tvůrce a výzkumníky. Pokrývají témata jako upgrady protokolu, nové vzory nástrojů, referenční nasazení a další.

### Zásady pro zařazení {#listing-policy}

Ethereum.org je neutrální, vzdělávací zdroj. Sekce „Nejnovější“ (Latest) je spravována tak, aby:

- **Vzdělávala** tvůrce a širší komunitu o technologii Etherea, open-source ekosystému a aktuálním vývoji
- **Zůstala přesná** ve svém technickém obsahu a odkazech
- **Zůstala relevantní** pro komunitu tvůrců Etherea

Stránka nezařazuje články, které primárně propagují konkrétní produkt, token nebo komerční službu. Všechny příspěvky jsou před publikováním kontrolovány týmem ethereum.org.

### Kritéria pro zařazení {#criteria-for-inclusion}

#### Nutné požadavky {#must-haves}

- **Zaměření na Ethereum a open-source** - Článek musí být primárně o Ethereu, jeho protokolu, nástrojích nebo ekosystému tvůrců, případně o open-source a podpůrných technologiích, které jej doplňují. Obsah o obecných tématech týkajících se blockchainu nebo Web3, který podstatně neodkazuje na Ethereum nebo jeho open-source prostředí, nebude přijat.
- **Vzdělávací nebo přehledová hodnota** - Článek by měl tvůrce naučit něco praktického (např. jak používat nový EIP, jak vyhodnotit architektonickou volbu, jak nasadit open-source infrastrukturu nebo do ní přispět) nebo poskytnout smysluplný pohled na stav Etherea a jeho okolního open-source ekosystému. Propagační obsah pro konkrétní produkty, tokeny nebo komerční služby není přijímán.
- **Přesné informace** - Technická tvrzení musí být fakticky správná a aktuální. Kde je to možné, citujte EIP, oficiální oznámení nebo onchain data.
- **Původní dílo** - Obsah musí být původní nebo použitý se svolením. Viz [zásady proti plagiátorství](/contributing/#plagiarism).
- **Jazyk** - Články mohou být odeslány v jakémkoli [podporovaném jazyce](/contributing/translation-program/). Nastavte pole `lang` tak, aby odpovídalo jazyku, ve kterém je článek napsán (např. `en` pro angličtinu, `es` pro španělštinu). Jakmile je článek odeslán, anglické příspěvky mohou být přeloženy do jiných jazyků a neanglické příspěvky mohou být přeloženy do angličtiny.

#### Doporučené požadavky {#nice-to-haves}

- **Aktuální a nadčasové** - Obsah, který zůstává užitečný i po datu vydání, je upřednostňován před čistě časově omezeným materiálem.
- **Důvěryhodnost autora** - Články od zavedených tvůrců, výzkumníků nebo přispěvatelů v souladu s CROPS mají prioritu.
- **Další čtení** - Zahrňte sekci `## Further reading` s odkazy na relevantní EIP, dokumentaci a primární zdroje.

### Navrhněte článek pro tvůrce {#propose-a-builder-article}

Pokud chcete napsat článek pro tvůrce na ethereum.org a splňuje kritéria, vytvořte issue na GitHubu.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?template=content-suggestion.yml">
  Navrhnout článek
</ButtonLink>