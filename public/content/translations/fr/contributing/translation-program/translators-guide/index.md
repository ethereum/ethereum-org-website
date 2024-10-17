---
title: Guide à l'intention des traducteurs
lang: fr
description: Instructions et conseils pour les traducteurs d'ethereum.org
---

# Guide de style pour la traduction d'ethereum.org {#style-guide}

Le guide de style pour la traduction d'ethereum.org contient les principales recommandations, directives et astuces pour ceux qui nous aident à traduire le site.

Ce document sert de guide général et n'est spécifique à aucune langue.

Si vous avez des questions, des suggestions ou des commentaires, n'hésitez pas à nous contacter à l'adresse translations@ethereum.org, à envoyer un message à @ethdotorg sur Crowdin ou à [rejoindre notre serveur Discord](https://discord.gg/ethereum-org), où vous pourrez nous envoyer un message dans le canal #translations ou contacter l'un des membres de l'équipe.

## Utiliser Crowdin {#using-crowdin}

Vous pouvez trouver les instructions de base pour rejoindre le projet sur Crowdin et sur l'utilisation de l'éditeur en ligne de la plateforme sur la [page du programme de traduction](/contributing/translation-program/#how-to-translate).

Si vous souhaitez en savoir plus sur Crowdin et sur certaines de ses fonctionnalités avancées, la [base de connaissances de Crowdin](https://support.crowdin.com/online-editor/) contient de nombreux guides approfondis et des aperçus de toutes les fonctionnalités de Crowdin.

## Saisir l'essence du message {#capturing-the-essence}

Lors de la traduction du contenu d'ethereum.org, évitez les traductions littérales.

Les traductions doivent capturer l'essence du message. Cela peut impliquer de reformuler certaines phrases ou d'utiliser des traductions descriptives plutôt que de traduire le contenu mot à mot.

Chaque langue a ses règles grammaticales, ses conventions et sa syntaxe. Lors de la traduction, gardez à l'esprit la manière dont les phrases sont structurées dans la langue de destination et évitez de traduire littéralement la source anglaise, car cela peut conduire à une structure de phrase et une lisibilité de faible qualité.

Au lieu de traduire le texte original mot pour mot, il est recommandé de lire la phrase entière et de l'adapter aux conventions de la langue de destination.

## Formel et informel {#formal-vs-informal}

Nous utilisons la forme formelle (le vouvoiement), car elle est toujours polie et appropriée pour tous les visiteurs.

La forme formelle nous évite de paraître non officiels ou offensants et fonctionne quels que soient l'âge et le sexe du visiteur.

À la deuxième personne, la plupart des langues indo-européennes et afro-asiatiques utilisent des pronoms personnels spécifiques au sexe, qui distinguent les hommes et les femmes. Lorsque nous nous adressons à l'utilisateur ou que nous utilisons un pronom possessif, nous pouvons éviter de supposer le sexe du visiteur avec la forme formelle, étant donné qu'elle est généralement applicable et cohérente, quelle que soit la façon dont il s'identifie.

## Vocabulaire et sens simples et clairs {#simple-vocabulary}

Notre objectif est de rendre le contenu du site accessible au plus grand nombre de personnes possible.

La plupart du temps, il suffit d'utiliser des mots courts et simples qui sont faciles à comprendre. S'il y a plusieurs traductions possibles pour un certain mot, le meilleur choix sera souvent le mot le plus court reflétant clairement le sens.

## Système de rédaction {#writing-system}

Ethereum.org est disponible en plusieurs langues qui utilisent des systèmes d'écriture (ou des scripts) différents du système latin.

Tout le contenu doit alors être traduit en utilisant le système d'écriture de votre langue et ne doit pas inclure de mots écrits en caractères latins.

Lors de la traduction du contenu, vous devez vous assurer que les traductions sont cohérentes et n'incluent pas de caractères latins.

Une idée reçue courante voudrait qu'« Ethereum » soit toujours écrit en latin. C'est généralement incorrect. Veuillez utiliser l'orthographe d'« Ethereum » native dans votre langue (ex : 以太坊 en chinois, إيثيريوم en arabe, etc.).

**Ceci ne s'applique pas aux langues au sein desquelles il existe une règle proscrivant la traduction des noms propres.**

## Traduire les métadonnées des pages {#translating-metadata}

Certaines pages contiennent des métadonnées comme « title », « lang », « description », « sidebar », etc.

Nous « cachons » le contenu que les traducteurs ne doivent jamais traduire lors du chargement de nouvelles pages sur Crowdin, ce qui signifie que toutes les métadonnées visibles aux traducteurs dans Crowdin doivent être traduites.

Soyez particulièrement attentif lorsque vous traduisez des chaînes où le texte source est « en ». Ce texte indique la langue dans laquelle la page est disponible et doit donc être traduit par le [code de langue ISO correspondant à votre langue](https://www.andiamo.co.uk/resources/iso-language-codes/). Ces chaînes de caractères doivent toujours être traduites en utilisant des caractères latins, et non le script natif de la langue cible.

Si vous n'êtes pas certain du code de langue à utiliser, vous pouvez vérifier la mémoire de traduction dans Crowdin ou trouver le code de votre langue dans l'URL de la page dans l'éditeur en ligne Crowdin.

Voici quelques exemples de codes de langue pour les langues les plus parlées :

- Arabe - ar
- Chinois simplifié - zh
- Français - fr
- Hindi - hi
- Espagnol - es

## Titres des articles externes {#external-articles}

Certaines chaînes de caractères contiennent des titres d'articles externes. La plupart de nos pages de documentation pour développeurs contiennent des liens vers des articles externes pour de plus amples détails. Les chaînes de caractères contenant les titres des articles doivent être traduites, quelle que soit la langue de l'article, afin d'assurer une expérience utilisateur plus cohérente pour les visiteurs qui consultent la page dans leur langue.

Pour vous aider à les repérer, vous trouverez ci-dessous quelques exemples de ces chaînes (les liens vers les articles se trouvent principalement en bas de ces pages, dans la section « Further reading » [Lectures complémentaires]) :

![Titres des articles dans sidebar.png](./article-titles-in-sidebar.png) ![Titres des articles dans editor.png](./article-titles-in-editor.png)

## Notification d'erreur Crowdin {#crowdin-warnings}

Crowdin a une fonctionnalité intégrée qui avertit les traducteurs lorsqu'ils sont sur le point de faire une erreur. Crowdin vous en avertira automatiquement avant d'enregistrer votre traduction si vous oubliez d'inclure une balise de la source, de traduire des éléments qui ne devraient pas être traduits, d'ajouter plusieurs espaces consécutifs, d'oublier la ponctuation de fin, etc. Si un tel avertissement s'affiche, veuillez revenir en arrière et vérifier la traduction proposée.

**N'ignorez jamais ces avertissements, car ils signifient généralement que quelque chose ne va pas ou qu'il manque un élément essentiel du texte source dans la traduction.**

Voici un exemple d'avertissement Crowdin lorsque vous oubliez d'ajouter une balise à votre traduction : ![Exemple d'un avertissement dans Crowdin](./crowdin-warning-example.png)

## Gestion des balises et des extraits de code {#dealing-with-tags}

Une grande partie du contenu de la source contient des balises et des variables, surlignées en jaune dans l'éditeur Crowdin. Elles remplissent différentes fonctions et doivent être utilisées correctement.

**Paramètres de Crowdin**

Pour faciliter la gestion des tags et les copier directement à partir de la source, nous vous recommandons de modifier vos paramètres dans l'éditeur Crowdin.

1. Ouvrez les paramètres de l'éditeur ![Comment ouvrir les paramètres de l'éditeur](./editor-settings.png)

2. Allez à la section 'Affichage des tags HTML'

3. Sélectionnez 'Masquer' ![Veuillez sélectionner 'Masquer'](./hide-tags.png)

4. Cliquez sur 'Enregistrer'

En sélectionnant cette option, le texte du tag complet ne sera plus affiché et sera remplacé par un nombre. Lors de la traduction, cliquer sur ce tag copiera automatiquement le tag exact dans le champ de traduction.

**Liens**

Vous pouvez remarquer des liens complets vers des pages d'ethereum.org ou d'autres sites web.

Ceux-ci doivent rester identiques à la source sans changement ni traduction. Si vous traduisez un lien ou le modifiez d'une manière ou d'une autre, même uniquement en supprimant une partie de celui-ci, comme un slash (/), cela va casser les liens et les rendre inutilisables.

La meilleure façon de gérer les liens est de les copier directement à partir de la source, soit en cliquant dessus, soit en utilisant le bouton « Copy Source » (Copier la source) (Alt+C).

![Exemple de lien.png](./example-of-link.png)

Les liens apparaissent également dans le texte source sous la forme de balises (c'est-à-dire  <0> </0>). Si vous survolez la balise, l'éditeur affichera son véritable contenu. Parfois, ces balises désigneront des liens.

Il est très important de copier les liens depuis le texte source et de ne pas modifier l'ordre des balises.

Si l'ordre des balises est changé, le lien qu'elles représentent sera cassé.

![Exemple de liens à l'intérieur de balises.png](./example-of-links-inside-tags.png)

**Balises et variables**

Le texte source contient de nombreux types de balises différentes, qui doivent toujours être copiées depuis la source et ne pas être modifiées. Comme expliqué plus haut, l'ordre des balises dans la traduction devrait également être le même que dans le texte source.

Les balises comprennent toujours une balise ouvrante et une balise fermante. Et en général, le texte compris entre les deux balises doit être traduit.

Exemple : `<strong x-id="1">`Décentralisé`</strong>`

`<strong x-id="1">` - _Balise ouvrante qui fait apparaître le texte en gras_

Décentralisé - _Texte à traduire_

`</strong>` - _Balise fermante_

![Exemple de balises strong.png](./example-of-strong-tags.png)

Les extraits de code doivent être abordés légèrement différemment des autres balises, car ils contiennent du code qui ne doit pas être traduit.

Exemple : `<code>`nonce`</code>`

`<code>` - _Balise ouvrante, qui contient un extrait de code_

nonce - _Texte non traduisible_

`</code>` - _Balise fermante_

![Exemple d'extraits de code.png](./example-of-code-snippets.png)

Le texte source contient aussi des balises raccourcies. Elles contiennent uniquement des chiffres et leur fonction n'est donc pas directement identifiable. Vous pouvez survoler ces balises pour voir exactement ce à quoi elles servent.

Dans l'exemple ci-dessous, vous pouvez voir que survoler la balise <0> nous permet de savoir qu'elle désigne en fait une balise `<code>` et qu'elle contient un extrait de code. Le contenu de ces balises ne doit donc pas être traduit.

![Exemple de balises ambiguës.png](./example-of-ambiguous-tags.png)

## Formes courtes et formes complètes/abréviations {#short-vs-full-forms}

De nombreuses abréviations sont utilisées sur le site, comme dApps, NFT, DAO, DeFi, etc. Ces abréviations sont couramment utilisées en anglais et les visiteurs du site web les connaissent généralement.

Étant donné qu'elles n'ont souvent pas de traduction établie dans les autres langues, la meilleure façon d'adapter ces termes (ainsi que les termes qui gravitent autour) est de fournir une traduction descriptive de leur forme complète, puis d'ajouter l'abréviation entre parenthèses.

Ne traduisez pas ces abréviations, car la plupart des gens ne les connaissent pas et les versions traduites n'auraient pas vraiment de sens pour la plupart des visiteurs.

Exemple de la manière de traduire « dApps » :

- Applications décentralisées (dApps) → _Forme complète traduite (abréviation anglaise entre parenthèses)_

## Termes sans traduction établie {#terms-without-established-translations}

Certains termes peuvent ne pas avoir de traduction bien définie dans les autres langues et être largement connus sous leur forme anglaise. Ces termes incluent principalement des concepts récents, comme proof-of-work, proof-of-stake, Beacon Chain, staking, etc.

La traduction de ces termes peut sembler peu naturelle, mais puisque la version anglaise est également couramment utilisée dans d'autres langues, il est fortement recommandé de les traduire.

Lorsque vous traduisez ces termes, soyez créatifs, utilisez des traductions descriptives ou alors traduisez-les littéralement.

**Le fait de traduire ces termes, plutôt que de les laisser en anglais, permettra à cette nouvelle terminologie de se généraliser à l'avenir, à mesure que de plus en plus de personnes utiliseront Ethereum et les technologies associées. Si nous voulons faire connaître ce domaine à plus de personnes à travers le monde, nous devons fournir une terminologie compréhensible dans un maximum de langues, quitte à la créer nous-mêmes.**

## Boutons & boutons d'appel à l'action {#buttons-and-ctas}

Le site contient de nombreux boutons, qui doivent être traduits différemment des autres contenus.

Vous pouvez repérer un bouton et son contenu en visualisant les captures d'écran contextuelles, fournies avec la plupart des textes sources, ou bien en regardant le contexte de l'éditeur, qui inclura le terme « button » (bouton).

Les traductions des boutons doivent être aussi courtes que possible pour éviter les problèmes de mise en forme. En outre, la traduction des boutons doit être impérative, c'est-à-dire exprimer un ordre ou une demande.

![Comment repérer un bouton.png](./how-to-find-a-button.png)

## Traduire de façon inclusive {#translating-for-inclusivity}

Les visiteurs d'ethereum.org viennent de partout dans le monde et d'horizons différents. Le langage du site web devrait donc être neutre, accueillant pour tout le monde et inclusif.

La neutralité de genre est un aspect important de cette démarche. Dans cette optique, préférez un langage formel lorsque vous vous adressez au visiteur, en évitant d'utiliser des termes genrés dans les traductions.

Une autre forme d'inclusivité consiste à faire en sorte que la traduction s'adresse à un public mondial, et pas spécifiquement à un pays, une ethnie ou une région du monde.

Enfin, le langage doit être adapté à tous les publics et tous les âges.

## Traductions spécifiques dans une langue {#language-specific-translations}

Lors de la traduction, plutôt que de calquer simplement la source, il est important de suivre les règles de grammaire, les conventions et le formatage en vigueur dans votre langue. Le texte source suit les règles et conventions de la grammaire anglaise, qui ne sont pas applicables dans beaucoup d'autres langues.

Vous devez donc avoir les règles de votre langue en tête afin de traduire correctement. Si vous avez besoin d'aide pour traduire certains éléments, contactez-nous et nous vous aiderons à trouver des ressources sur la façon dont ils doivent être adaptés à votre langue.

Voici quelques exemples de ce à quoi vous devrez faire attention :

### Ponctuation, mise en forme {#punctuation-and-formatting}

**Majuscules**

- Il existe de grandes différences entre les langues sur la façon d'utiliser les lettres majuscules.
- En anglais, il est courant de mettre en majuscule sur la première lettre de tous les mots contenus dans les titres, les noms, les mois, les jours, le nom des langues, les jours fériés, etc. Dans de nombreuses autres langues, c'est grammaticalement incorrect, car les règles sont différentes.
- Certaines langues ont aussi des règles sur la mise en majuscule des pronoms personnels, des noms communs et de certains adjectifs, qui ne portent pas de majuscule en anglais.

**Espaces**

- Les règles orthographiques définissent l'utilisation des espaces pour chaque langue. Ces règles sont souvent très spécifiques, et parce que les espaces sont utilisés partout, ils sont parmi les éléments les plus mal traduits.
- Voici quelques différences d'espacement fréquentes entre l'anglais et d'autres langues :
  - Espace avant les unités de mesure et les devises (ex. USD, EUR, kB, MB)
  - Espace avant le signe de degré (ex. °C, ℉)
  - Espace avant certains signes de ponctuation, notamment l'ellipse (…)
  - Espace avant et après les barres obliques (/)

**Listes**

- Chaque langue possède un ensemble de règles diverses et variées pour la rédaction des listes. Elles peuvent différer considérablement de l'anglais.
- Dans certaines langues, le premier mot de chaque nouvelle ligne doit avoir sa première lettre en majuscule, tandis que dans d'autres langues, les nouvelles lignes doivent commencer par une lettre minuscule. Plusieurs langues ont aussi différentes règles sur la présence de majuscule en début de ligne, en fonction de la longueur de celle-ci.
- Il en va de même pour la ponctuation en fin de ligne. Cela peut être un point (**.**), une virgule (**,**) ou un point-virgule (**;**), en fonction de la langue.

**Guillemets**

- Certaines langues utilisent différents signes pour les guillemets. Il est souvent incorrect de se contenter de recopier les guillemets anglais.
- Parmi les types de guillemets les plus courants, figurent :
  - „texte d'exemple“
  - ‚texte d'exemple’
  - »texte d'exemple«
  - “texte d'exemple”
  - ‘texte d'exemple’
  - «texte d'exemple»

**Tirets et traits d'union**

- En anglais, le trait d'union (-) est utilisé pour joindre des mots ou différentes parties d'un mot, tandis que le tiret (–) est utilisé pour indiquer un intervalle ou une pause.
- Beaucoup de langues ont des règles différentes concernant les tirets et les traits d'union qui doivent être respectées.

### Formats {#formats}

**Nombres**

- La principale différence entre les langues concernant les nombres écrits est le séparateur utilisé pour les nombres décimaux et celui des milliers. Pour les milliers, cela peut être un point, une virgule ou une espace. De la même manière, certaines langues utilisent un point pour les nombres décimaux, tandis que d'autres utilisent une virgule.
  - Voici quelques exemples de grands nombres :
    - Anglais – **1,000.50**
    - Espagnol – **1.000,50**
    - Français – **1 000,50**
- Une autre chose à prendre en considération lors de la traduction de nombres est le signe pourcentage. Il peut être écrit de différentes manières : **100%**, **100 %** ou encore **%100**.
- Enfin, les nombres négatifs peuvent aussi s'afficher différemment en fonction de la langue : -100, 100-, (100) ou [100].

**Dates**

- Lors de la traduction des dates, il y a un certain nombre de différences à prendre en compte, en fonction de la langue. Il s'agit par exemple du format de date, du séparateur, de la présence de majuscules ou encore des zéros initiaux. Il y a aussi des différences entre les dates complètes et les dates numériques.
  - Voici quelques exemples de différents formats de date :
    - Anglais UK (jj/mm/aaaa) – 1er janvier 2022
    - Anglais US (mm/jj/aaaa) – janvier 1, 2022
    - Chinois (aaaa-mm-jj) – 2022 年 1 月 1 日
    - Français (jj/mm/aaaa) – 1er janvier 2022
    - Italien (jj/mm/aaaa) – 1º gennaio 2022
    - Allemand (jj/mm/aaaa) – 1. Januar 2022

**Devises**

- Traduire des devises peut s'avérer difficile, en raison des différences de formats, de conventions et de conversions. En règle générale, veuillez garder la même devise que la source. Dans l'intérêt du lecteur, vous pouvez éventuellement ajouter votre devise locale ainsi que la conversion entre parenthèses.
- Les principales différences qui existent lors de l'écriture des devises dans différentes langues sont le placement des symboles, les virgules décimales par rapport aux points décimaux, l'espacement et les abréviations par rapport aux symboles.
  - Emplacement du symbole : $100 ou 100$
  - Virgule décimale ou point décimal : 100,50$ ou 100.50$
  - Espacement : 100$ ou 100 $
  - Abréviation ou symbole : 100 $ ou 100 USD

**Unités de mesure**

- En règle générale, veuillez garder la même unité de mesure que dans le texte source. Si votre pays utilise un autre système, vous pouvez inclure la conversion entre parenthèses.
- Outre la localisation des unités de mesure, il est également important de tenir compte des différences dans la façon dont les langues abordent ces unités. La différence principale est l'espacement entre le nombre et l'unité, qui peut différer selon la langue. Par exemple, on observe cette différence entre 100kB, 100 kB, 50ºF et 50 ºF.

## Conclusion {#conclusion}

Traduire ethereum.org constitue une excellente occasion de découvrir les différents aspects d'Ethereum.

Lors de la traduction, essayez de ne pas vous précipiter. Prenez votre temps et faites-vous plaisir !

Merci pour votre participation au programme de traduction et de nous aider à rendre le site accessible à un public plus large. La communauté Ethereum est internationale, et nous sommes heureux que vous en fassiez partie !
