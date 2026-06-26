---
title: Guide de style de traduction d'ethereum.org
metaTitle: Guide des traducteurs
lang: fr
description: Instructions et conseils pour les traducteurs d'ethereum.org
---

Le guide de style de traduction d'ethereum.org contient certaines des directives, instructions et astuces les plus importantes pour les traducteurs, nous aidant à localiser le site Web.

Ce document sert de guide général et n'est spécifique à aucune langue.

Si vous avez des questions, des suggestions ou des commentaires, n'hésitez pas à nous contacter à translations@ethereum.org, à envoyer un message à @ethdotorg sur Crowdin, ou à [rejoindre notre Discord](https://discord.gg/ethereum-org), où vous pouvez nous envoyer un message dans le canal #translations ou contacter l'un des membres de l'équipe.

## Utiliser Crowdin {#using-crowdin}

Vous pouvez trouver des instructions de base sur la façon de rejoindre le projet dans Crowdin et d'utiliser l'éditeur en ligne Crowdin sur la [page du Programme de traduction](/contributing/translation-program/#how-to-translate).

Si vous souhaitez en savoir plus sur Crowdin et l'utilisation de certaines de ses fonctionnalités avancées, la [base de connaissances Crowdin](https://support.crowdin.com/online-editor/) contient de nombreux guides approfondis et des aperçus de toutes les fonctionnalités de Crowdin.

## Capturer l'essence du message {#capturing-the-essence}

Lors de la traduction du contenu d'ethereum.org, évitez les traductions littérales.

Il est important que les traductions capturent l'essence du message. Cela peut signifier reformuler certaines phrases ou utiliser des traductions descriptives au lieu de traduire le contenu mot à mot.

Différentes langues ont des règles de grammaire, des conventions et un ordre des mots différents. Lors de la traduction, veuillez faire attention à la façon dont les phrases sont structurées dans les langues cibles et évitez de traduire littéralement la source anglaise, car cela peut entraîner une mauvaise structure de phrase et une mauvaise lisibilité.

Au lieu de traduire le texte source mot à mot, il est recommandé de lire la phrase entière et de l'adapter pour qu'elle corresponde aux conventions de la langue cible.

## Formel vs informel {#formal-vs-informal}

Nous utilisons le vouvoiement (la forme formelle), qui est toujours poli et approprié pour tous les visiteurs.

L'utilisation du vouvoiement nous permet d'éviter de paraître non officiels ou offensants, et fonctionne indépendamment de l'âge et du sexe du visiteur.

La plupart des langues indo-européennes et afro-asiatiques utilisent des pronoms personnels de deuxième personne spécifiques au genre, qui font la distinction entre le masculin et le féminin. Lorsque nous nous adressons à l'utilisateur ou utilisons des pronoms possessifs, nous pouvons éviter de présumer du sexe du visiteur, car la forme formelle est généralement applicable et cohérente, quelle que soit la façon dont il s'identifie.

## Vocabulaire et sens simples et clairs {#simple-vocabulary}

Notre objectif est de rendre le contenu du site Web compréhensible pour le plus grand nombre de personnes possible.

Dans la plupart des cas, cela peut être facilement réalisé en utilisant des mots courts et simples qui sont facilement compréhensibles. S'il existe plusieurs traductions possibles pour un certain mot dans votre langue avec la même signification, la meilleure option est le plus souvent le mot le plus court qui reflète clairement le sens.

## Système d'écriture {#writing-system}

Ethereum.org est disponible dans un certain nombre de langues, utilisant des systèmes d'écriture (ou scripts d'écriture) alternatifs au latin.

Tout le contenu doit être traduit en utilisant le système d'écriture correct pour votre langue, et ne doit inclure aucun mot écrit en caractères latins.

Lors de la traduction du contenu, vous devez vous assurer que les traductions sont cohérentes et n'incluent aucun caractère latin.

Une idée fausse courante est qu'Ethereum devrait toujours être écrit en latin. C'est généralement incorrect, veuillez utiliser l'orthographe d'Ethereum native à votre langue (par exemple, 以太坊 en chinois, إيثيريوم en arabe, etc.).

**Ce qui précède ne s'applique pas aux langues où les noms propres ne doivent pas être traduits en règle générale.**

## Traduire les métadonnées de la page {#translating-metadata}

Certaines pages contiennent des métadonnées sur la page, comme « title », « lang », « description », « sidebar », etc.

Nous masquons le contenu que les traducteurs ne devraient jamais traduire lors du téléchargement de nouvelles pages sur Crowdin, ce qui signifie que toutes les métadonnées visibles par les traducteurs dans Crowdin doivent être traduites.

Veuillez être particulièrement attentif lors de la traduction de toute chaîne où le texte source est « en ». Cela représente la langue dans laquelle la page est disponible et doit être traduit par le [code de langue ISO de votre langue](https://www.andiamo.co.uk/resources/iso-language-codes/). Ces chaînes doivent toujours être traduites en utilisant des caractères latins, et non le script d'écriture natif de la langue cible.

Si vous n'êtes pas sûr du code de langue à utiliser, vous pouvez vérifier la mémoire de traduction dans Crowdin ou trouver le code de langue de votre langue dans l'URL de la page dans l'éditeur en ligne Crowdin.

Quelques exemples de codes de langue pour les langues les plus parlées :

- Arabe - ar
- Chinois simplifié - zh
- Français - fr
- Hindi - hi
- Espagnol - es

## Titres d'articles externes {#external-articles}

Certaines chaînes contiennent des titres d'articles externes. La plupart de nos pages de documentation pour les développeurs contiennent des liens vers des articles externes pour aller plus loin. Les chaînes contenant des titres d'articles doivent être traduites, quelle que soit la langue de l'article, afin de garantir une expérience utilisateur plus cohérente pour les visiteurs qui consultent la page dans leur langue.

Vous pouvez trouver ci-dessous quelques exemples de ce à quoi ressemblent ces chaînes pour les traducteurs et comment les identifier (les liens vers les articles se trouvent principalement au bas de ces pages, dans la section « Complément d'information ») :

![Article titles in sidebar.png](./article-titles-in-sidebar.png)
![Article titles in editor.png](./article-titles-in-editor.png)

## Avertissements Crowdin {#crowdin-warnings}

Crowdin dispose d'une fonctionnalité intégrée qui avertit les traducteurs lorsqu'ils sont sur le point de faire une erreur. Crowdin vous en avertira automatiquement avant d'enregistrer votre traduction si vous oubliez d'inclure une balise de la source, traduisez des éléments qui ne devraient pas l'être, ajoutez plusieurs espaces consécutifs, oubliez la ponctuation finale, etc.
Si vous voyez un avertissement de ce type, veuillez revenir en arrière et revérifier la traduction suggérée.

**N'ignorez jamais ces avertissements, car ils signifient généralement que quelque chose ne va pas, ou qu'il manque une partie clé du texte source à la traduction.**

Un exemple d'avertissement Crowdin lorsque vous oubliez d'ajouter une balise à votre traduction :
![Example of a Crowdin warning](./crowdin-warning-example.png)

## Gérer les balises et les extraits de code {#dealing-with-tags}

Une grande partie du contenu source contient des balises et des variables, qui sont surlignées en jaune dans l'éditeur Crowdin. Celles-ci remplissent différentes fonctions et doivent être abordées correctement.

**Paramètres Crowdin**

Pour faciliter la gestion des balises et les copier directement depuis la source, nous vous recommandons de modifier vos paramètres dans l'éditeur Crowdin.

1. Ouvrez les paramètres
   ![How to open settings in the editor](./editor-settings.png)

2. Faites défiler jusqu'à la section « Affichage des balises HTML » (HTML tags displaying)

3. Sélectionnez « Masquer » (Hide)
   ![Please select 'Hide'](./hide-tags.png)

4. Cliquez sur « Enregistrer » (Save)

En sélectionnant cette option, le texte complet de la balise ne sera plus affiché et sera remplacé par un numéro.
Lors de la traduction, cliquer sur cette balise copiera automatiquement la balise exacte dans le champ de traduction.

**Liens**

Vous remarquerez peut-être des liens complets vers des pages sur ethereum.org ou d'autres sites Web.

Ceux-ci doivent être identiques à la source et ne pas être modifiés ou traduits. Si vous traduisez un lien ou le modifiez de quelque manière que ce soit, même en en supprimant simplement une partie, comme une barre oblique (/), cela entraînera des liens rompus et inutilisables.

La meilleure façon de gérer les liens est de les copier directement depuis la source, soit en cliquant dessus, soit en utilisant le bouton « Copier la source » (Copy Source) (`Alt+C`).

![Example of link.png](./example-of-link.png)

Les liens apparaissent également dans le texte source sous forme de balises (c'est-à-dire `<0>` `</0>`). Si vous passez la souris sur la balise, l'éditeur affichera son contenu complet - parfois ces balises représenteront des liens.

Il est très important de copier les liens depuis la source et de ne pas modifier leur ordre.

Si l'ordre des balises est modifié, le lien qu'elles représentent sera rompu.

![Example of links inside tags.png](./example-of-links-inside-tags.png)

**Balises et variables**

Le texte source contient de nombreux types de balises différents, qui doivent toujours être copiés depuis la source et jamais modifiés. De la même manière que ci-dessus, l'ordre de ces balises dans la traduction doit également rester le même que dans la source.

Les balises contiennent toujours une balise d'ouverture et de fermeture. Dans la plupart des cas, le texte entre les balises d'ouverture et de fermeture doit être traduit.

Exemple : `<strong x-id="1">`Décentralisé`</strong>`

`<strong x-id="1">` - _Balise d'ouverture qui met le texte en gras_

Décentralisé - _Texte traduisible_

`</strong>` - _Balise de fermeture_

![Example of 'strong' tags.png](./example-of-strong-tags.png)

Les extraits de code doivent être abordés de manière légèrement différente des autres balises, car ils contiennent du code qui ne doit pas être traduit.

Exemple : `<code>`nonce`</code>`

`<code>` - _Balise d'ouverture, qui contient un extrait de code_

nonce - _Texte non traduisible_

`</code>` - _Balise de fermeture_

![Example of code snippets.png](./example-of-code-snippets.png)

Le texte source contient également des balises raccourcies, qui ne contiennent que des nombres, ce qui signifie que leur fonction n'est pas immédiatement évidente. Vous pouvez passer la souris sur ces balises pour voir exactement quelle fonction elles remplissent.

Dans l'exemple ci-dessous, vous pouvez voir que le survol de la balise `<0>` montre qu'elle représente `<code>` et contient un extrait de code, par conséquent le contenu à l'intérieur de ces balises ne doit pas être traduit.

![Example of ambiguous tags.png](./example-of-ambiguous-tags.png)

## Formes courtes vs formes complètes/abréviations {#short-vs-full-forms}

De nombreuses abréviations sont utilisées sur le site Web, par exemple, les applications décentralisées (dapps), les NFT, les DAO, la finance décentralisée (DeFi), etc. Ces abréviations sont couramment utilisées en anglais et la plupart des visiteurs du site Web les connaissent.

Comme elles n'ont généralement pas de traductions établies dans d'autres langues, la meilleure façon d'aborder ces termes et d'autres termes similaires est de fournir une traduction descriptive de la forme complète et d'ajouter l'abréviation anglaise entre parenthèses.

Ne traduisez pas ces abréviations, car la plupart des gens ne les connaîtraient pas, et les versions localisées n'auraient pas beaucoup de sens pour la plupart des visiteurs.

Exemple de la façon de traduire les applications décentralisées (dapps) :

- Applications décentralisées (dapps) → _Forme complète traduite (abréviation anglaise entre parenthèses)_

## Termes sans traductions établies {#terms-without-established-translations}

Certains termes peuvent ne pas avoir de traductions établies dans d'autres langues et sont largement connus sous le terme anglais d'origine. Ces termes incluent principalement des concepts plus récents, comme la preuve de travail (PoW), la preuve d'enjeu (PoS), la chaîne balise, le staking, etc.

Bien que la traduction de ces termes puisse sembler peu naturelle, étant donné que la version anglaise est également couramment utilisée dans d'autres langues, il est fortement recommandé de les traduire.

Lors de leur traduction, n'hésitez pas à faire preuve de créativité, à utiliser des traductions descriptives ou simplement à les traduire littéralement.

**La raison pour laquelle la plupart des termes doivent être traduits, au lieu d'en laisser certains en anglais, est le fait que cette nouvelle terminologie se répandra à l'avenir, à mesure que de plus en plus de personnes commenceront à utiliser Ethereum et les technologies associées. Si nous voulons intégrer plus de personnes du monde entier dans cet espace, nous devons fournir une terminologie compréhensible dans autant de langues que possible, même si nous devons la créer nous-mêmes.**

## Boutons et appels à l'action (CTA) {#buttons-and-ctas}

Le site Web contient de nombreux boutons, qui doivent être traduits différemment des autres contenus.

Le texte du bouton peut être identifié en affichant les captures d'écran de contexte, associées à la plupart des chaînes, ou en vérifiant le contexte dans l'éditeur, qui inclut le mot « button ».

Les traductions des boutons doivent être aussi courtes que possible, pour éviter les problèmes de formatage. De plus, les traductions des boutons doivent être à l'impératif, c'est-à-dire présenter une commande ou une demande.

![How to find a button.png](./how-to-find-a-button.png)

## Traduire pour l'inclusivité {#translating-for-inclusivity}

Les visiteurs d'ethereum.org viennent du monde entier et d'horizons différents. Le langage sur le site Web doit donc être neutre, accueillant pour tous et non exclusif.

Un aspect important de cela est la neutralité de genre. Cela peut être facilement réalisé en utilisant le vouvoiement et en évitant tout mot spécifique au genre dans les traductions.

Une autre forme d'inclusivité consiste à essayer de traduire pour un public mondial, non spécifique à un pays, une race ou une région.

Enfin, le langage doit être adapté à tous les publics et à tous les âges.

## Traductions spécifiques à la langue {#language-specific-translations}

Lors de la traduction, il est important de suivre les règles de grammaire, les conventions et le formatage utilisés dans votre langue, plutôt que de copier à partir de la source. Le texte source suit les règles et conventions de grammaire anglaises, ce qui n'est pas applicable à de nombreuses autres langues.

Vous devez connaître les règles de votre langue et traduire en conséquence. Si vous avez besoin d'aide, contactez-nous et nous vous aiderons à trouver des ressources sur la façon dont ces éléments doivent être utilisés dans votre langue.

Quelques exemples de ce à quoi il faut être particulièrement attentif :

### Ponctuation, formatage {#punctuation-and-formatting}

**Majuscules**

- Il existe de grandes différences dans l'utilisation des majuscules selon les langues.
- En anglais, il est courant de mettre en majuscule tous les mots dans les titres et les noms, les mois et les jours, les noms de langues, les jours fériés, etc. Dans de nombreuses autres langues, cela est grammaticalement incorrect, car elles ont des règles de majuscules différentes.
- Certaines langues ont également des règles concernant la mise en majuscule des pronoms personnels, des noms et de certains adjectifs, qui ne prennent pas de majuscule en anglais.

**Espacement**

- Les règles d'orthographe définissent l'utilisation des espaces pour chaque langue. Parce que les espaces sont utilisés partout, ces règles sont parmi les plus distinctes, et les espaces sont parmi les éléments les plus mal traduits.
- Quelques différences courantes d'espacement entre l'anglais et d'autres langues :
  - Espace avant les unités de mesure et les devises (par exemple, USD, EUR, kB, MB)
  - Espace avant les signes de degré (par exemple, °C, ℉)
  - Espace avant certains signes de ponctuation, en particulier les points de suspension (…)
  - Espace avant et après les barres obliques (/)

**Listes**

- Chaque langue possède un ensemble diversifié et complexe de règles pour l'écriture de listes. Celles-ci peuvent être très différentes de l'anglais.
- Dans certaines langues, le premier mot de chaque nouvelle ligne doit commencer par une majuscule, tandis que dans d'autres, les nouvelles lignes doivent commencer par des lettres minuscules. De nombreuses langues ont également des règles différentes concernant les majuscules dans les listes, en fonction de la longueur de chaque ligne.
- Il en va de même pour la ponctuation des éléments de ligne. La ponctuation finale dans les listes peut être un point (**.**), une virgule (**,**) ou un point-virgule (**;**), selon la langue.

**Guillemets**

- Les langues utilisent de nombreux guillemets différents. Copier simplement les guillemets anglais de la source est souvent incorrect.
- Certains des types de guillemets les plus courants incluent :
  - „exemple de texte“
  - ‚exemple de texte’
  - »exemple de texte«
  - “exemple de texte”
  - ‘exemple de texte’
  - « exemple de texte »

**Traits d'union et tirets**

- En anglais, un trait d'union (-) est utilisé pour joindre des mots ou différentes parties d'un mot, tandis qu'un tiret (–) est utilisé pour indiquer une plage ou une pause.
- De nombreuses langues ont des règles différentes pour l'utilisation des traits d'union et des tirets qui doivent être respectées.

### Formats {#formats}

**Nombres**

- La principale différence dans l'écriture des nombres dans différentes langues est le séparateur utilisé pour les décimales et les milliers. Pour les milliers, cela peut être un point, une virgule ou un espace. De même, certaines langues utilisent un point décimal, tandis que d'autres utilisent une virgule décimale.
  - Quelques exemples de grands nombres :
    - Anglais – **1,000.50**
    - Espagnol – **1.000,50**
    - Français – **1 000,50**
- Une autre considération importante lors de la traduction de nombres est le signe de pourcentage. Il peut être écrit de différentes manières : **100%**, **100 %** ou **%100**.
- Enfin, les nombres négatifs peuvent être affichés différemment selon la langue : -100, 100-, (100) ou [100].

**Dates**

- Lors de la traduction de dates, il y a un certain nombre de considérations et de différences selon la langue. Celles-ci incluent le format de la date, le séparateur, les majuscules et les zéros initiaux. Il existe également des différences entre les dates complètes et numériques.
  - Quelques exemples de différents formats de date :
    - Anglais britannique (jj/mm/aaaa) – 1st January, 2022
    - Anglais américain (mm/jj/aaaa) – January 1st, 2022
    - Chinois (aaaa-mm-jj) – 2022 年 1 月 1 日
    - Français (jj/mm/aaaa) – 1er janvier 2022
    - Italien (jj/mm/aaaa) – 1º gennaio 2022
    - Allemand (jj/mm/aaaa) – 1. Januar 2022

**Devises**

- La traduction des devises peut être difficile, en raison des différents formats, conventions et conversions. En règle générale, veuillez conserver les mêmes devises que la source. Vous pouvez ajouter votre devise locale et la conversion entre parenthèses, pour le bénéfice du lecteur.
- Les principales différences dans l'écriture des devises dans différentes langues incluent le placement du symbole, les virgules décimales par rapport aux points décimaux, l'espacement et les abréviations par rapport aux symboles.
  - Placement du symbole : $100 ou 100$
  - Virgules décimales vs points décimaux : 100,50$ ou 100.50$
  - Espacement : 100$ ou 100 $
  - Abréviations vs symboles : 100 $ ou 100 USD

**Unités de mesure**

- En règle générale, veuillez conserver les unités de mesure telles qu'elles sont dans la source. Si votre pays utilise un système différent, vous pouvez inclure la conversion entre parenthèses.
- Outre la localisation des unités de mesure, il est également important de noter les différences dans la façon dont les langues abordent ces unités. La principale différence est l'espacement entre le nombre et l'unité, qui peut être différent selon la langue. Des exemples de cela incluent 100kB vs 100 kB ou 50ºF vs 50 ºF.

## Conclusion {#conclusion}

Traduire ethereum.org est une excellente occasion d'en apprendre davantage sur les différents aspects d'Ethereum.

Lors de la traduction, essayez de ne pas vous précipiter. Allez-y doucement et amusez-vous !

Merci de votre implication dans le Programme de traduction et de nous aider à rendre le site Web accessible à un public plus large. La communauté Ethereum est mondiale et nous sommes heureux que vous en fassiez partie !