---
title: Translation program playbook
lang: fr
description: Une collection de conseils et de considérations importantes pour la mise en place d'un programme de traduction
---

# Manuel du programme de traduction {#translation-program-playbook}

English is one of the most spoken languages in the world and is by far the world’s most studied language. Comme l'anglais est la langue la plus couramment utilisée sur Internet - en particulier sur les médias sociaux - et que les langages de programmation multilingues sont rares, la majorité du contenu de l'espace blockchain est écrit nativement en anglais.

However, as over 6 billion people in the world (more than 75% of the population) do not speak English at all, this presents a massive barrier for entry to Ethereum for the vast majority of the world’s population.

For this reason, an increasing number of projects in the space are looking to get their content translated into different languages and localized for global communities.

Fournir du contenu multilingue est un moyen simple et efficace de développer votre communauté mondiale, de fournir une éducation aux non-anglophones, de s'assurer que votre contenu et vos communications atteignent un public plus large et d'intégrer davantage de personnes dans l'espace.

Ce guide vise à répondre aux défis et aux idées fausses courants concernant la localisation du contenu. It provides a step-by-step guide to managing content, the translation and review process, quality assurance, translator outreach, and other vital aspects of the localization process.

## Content Management {#content-management}

Translation content management refers to the process of automating the translation workflow, which removes the need for repetitive manual work, improves efficiency and quality, allows for better control, and enables collaboration.

There are many different approaches to content management in the localization process, depending on the content and your needs.

The fundamental way of managing content is to create bilingual files, containing the source and target text. Ceci est rarement utilisé en traduction, car il n'offre aucun avantage significatif, à part la simplicité.

Les agences de traduction abordent généralement la gestion de la traduction en utilisant un logiciel de gestion de la traduction ou des outils de localisation, qui fournissent des capacités de gestion de projet et permettent un contrôle beaucoup plus grand sur les fichiers, le contenu et les linguistes.

Read more about content management:

[Trados on what is translation management](https://www.trados.com/solutions/translation-management/)

[Phrase sur la gestion de contenu multilingue](https://phrase.com/blog/posts/multilingual-content-management/)

### Translation Management Software {#translation-management-software}

Il existe de nombreux systèmes de gestion de la traduction et outils de localisation, et le choix du logiciel dépend principalement de vos besoins.

Alors que certains projets décident de ne pas utiliser de systèmes de gestion de traduction et préfèrent gérer les traductions manuellement - soit directement dans des fichiers bilingues, soit sur des services d'hébergement, tels que GitHub - cela réduit considérablement le contrôle, la productivité, la qualité, l'évolutivité et les capacités de collaboration. Such an approach might be most beneficial for small-scale or one-off translation projects.

Un aperçu rapide de certains des outils de gestion de la traduction les plus puissants et les plus largement utilisés :

**Best for crowdsourcing and collaboration**

[Crowdin](https://crowdin.com/)

- Gratuit pour les projets open source (nombre illimité de chaînes et de projets)
- TM and glossary available with all plans
- 60+ supported file formats, 70+ API integrations

[Lokalise](https://lokalise.com/)

- Free for 2 team members, paid plans for more contributors (limited number of strings for most plans)
- TM et glossaire disponibles avec certains plans payants
- 30+ supported file formats, 40+ API integrations

[Transifex](https://www.transifex.com/)

- Uniquement les plans payants (nombre limité de chaînes pour la plupart des plans)
- TM et glossaire disponibles avec tous les plans payants
- Plus de 30 formats de fichiers pris en charge, plus de 20 intégrations d'API

[Phrase](https://phrase.com/)

- Only paid plans (unlimited number of strings for all plans, limited number of projects and team members)
- TM et glossaire disponibles avec certains plans payants
- 40+ supported file formats, 20+ API integrations

[Smartcat](https://www.smartcat.com/)

- Basic free plan with payable advanced features (unlimited number of strings and projects for all plans)
- TM and glossary available with all plans
- 60+ supported file formats, 20+ API integrations

[POEditor](https://poeditor.com/)

- Free for open-source projects (limited number of strings for all projects, unlimited for open-source projects)
- TM and glossary available for paid plans
- 20+ supported file formats, 10+ API integrations

Et beaucoup d'autres...

**Outils de traduction professionnels**

[SDL Trados Studio](https://www.trados.com/products/trados-studio/)

- Plans rémunérés pour les traducteurs et les équipes indépendants
- Outil de traduction assistée par ordinateur (CAT) très puissant et logiciel de productivité traducteur

[MemoQ](https://www.memoq.com/)

- Version gratuite limitée disponible avec plusieurs plans payants pour des fonctionnalités avancées
- Translation management software for companies, language service providers and translators

[Memsource](https://www.memsource.com/)

- Free for individual translators with several paid plans for teams
- Système de traduction et de gestion de la traduction assisté par ordinateur basé sur le cloud

Et beaucoup d'autres...

Read more about translation management software:

[Wikipedia definition of translation management systems](https://en.wikipedia.org/wiki/Translation_management_system)

[Phrase sur 7 choses que tout logiciel de gestion de traduction devrait avoir](https://phrase.com/blog/posts/7-things-every-translation-management-software-should-have/)

[MemoQ sur ce qu'est un système de gestion de la traduction](https://www.memoq.com/tools/what-is-a-translation-management-system)

[Gengo’s list of 16 best translation management systems](https://gengo.com/translator-product-updates/16-best-translation-management-systems/)

## Workflow {#workflow}

In the translation space, translation workflow can mean a couple of different things, both somewhat interrelated, and important considerations for your project.

We will explore both of them below.

**Meaning 1**

This is probably the most common way of thinking about translation workflows and something that usually comes to mind when hearing the word workflow.

In its essence, it is the ‘flow of work’ from starting to think about translations to using the translated content in your product.

An example workflow in this case would be:

1. **Preparing the files for translation** – It sounds simple; however, you need to consider a couple of important things. At this step, you should have a clear plan on how the entire process should work.

- _Which file types will you be using? Dans quel format souhaitez-vous recevoir vos fichiers traduits ? _
  - Si votre contenu est disponible au format DOCX ou MD, l'approche sera beaucoup plus simple que si vous traduisez une version PDF de votre livre blanc ou d'autres documents.
- _Which localization tools support this file type? Le fichier peut-il être traduit d'une manière qui conserve le formatage d'origine ? _
  - Not all file types support direct localization (e.g., PDF files, image files), and not all localization tools support all file types.
- _Who will be translating the content? Allez-vous commander des traductions professionnelles ou compter sur des bénévoles ? _
  - This affects a number of other decisions you need to make. For example, professional translators are more comfortable working with advanced localization tools than volunteers.
- _What are your expectations for the linguists? If you are using a language service provider, what do they expect from you?_
  - This is the step to make sure your goals, expectations, and timelines are aligned.
- _Is all the content for translation equally important? Faut-il d'abord traduire du contenu ? _
  - There are some ways to prioritize certain content, which should be translated and implemented first. Par exemple, si vous avez beaucoup de contenu à traduire, vous pouvez utiliser le contrôle de version pour vous assurer que les traducteurs sont conscients de ce qu'ils doivent prioriser.

2. **Sharing the files for translation** – This step also requires some long-term thinking and is not as straightforward as sending the source files to a language service provider.

- _Who will be translating the content? How many people will be involved in this process?_
  - If you plan to use a localization tool, this step is simplified since you can upload the source files to the tool directly. This is also true if the translation process takes place on the hosting service since the source files don’t need to be exported anywhere.
- _Will the source files be handled manually, or can this process be automated?_
  - Most localization tools allow for some type of integration or automation of the file management process. On the other hand, if you are working with individual translators and not using a localization tool, manually sending source files to hundreds or thousands of translators is not a scalable process.
- _Which tools will be used for the localization?_
  - The answer to this question will determine how you approach everything else. Selecting the proper tool can help you automate content management, managing the Translation Memory and Glossary, managing translators, keeping track of the translation/review progress, etc., so take some time and do some research on which tool you want to use. If you are not planning on using a localization tool, all of the above will need to be done manually.
- _How long will the translation process take? How much will it cost?_
  - At this point, you should be ready to share the source files with the language service provider or pool of translators. The language service provider can help you analyze the word count and provide a quote, including the rates and timeline for the translation process.
- _Are you planning on making changes/updating the source content during this process?_
  - If your content is dynamic and changes often, any changes or updates can disrupt the translation progress. Using a Translation Memory can help mitigate this significantly, though it is still important to think about how the process will work and how you can prevent setting back the progress the translators are making.

3. **Managing the translation process** – Your work isn’t done once the source content is handed off to the language service provider or the translators. To ensure optimal quality of the translations, content creators should be as involved with the translation process as possible.

- _Comment comptez-vous communiquer avec les traducteurs ? _
  - Si vous prévoyez d'utiliser un outil de localisation, la communication peut avoir lieu directement dans l'outil. Setting up an alternative communication channel with the translators is also recommended since they might be less hesitant to reach out, and messaging tools allow for more free-flowing communication.
- _Comment gérer les questions des traducteurs ? Who should be answering these questions?_
  - Translators (both professional and non-professional) will often reach out with questions and requests for clarification or additional context, as well as feedback and ideas for improvements. Replying to these inquiries can often lead to better engagement and quality of translated content. It is also valuable to provide them with as many resources as possible (e.g., guides, tips, terminology guidelines, FAQs, etc.).
- _Comment gérer le processus d'examen ? Do you want to outsource it, or do you have the capacity to perform reviews internally?_
  - While not always necessary, reviews are an integral part of an optimal translation process. Usually, it is easiest to outsource the review process to professional reviewers. Cependant, si vous avez une grande équipe internationale, les examens ou l'assurance qualité peuvent également être gérés en interne.

4. **Implementing the translated content** – The last part of the workflow, though still important to consider ahead of time.

- _Toutes les traductions seront-elles terminées en même temps ? _
  - If not, you should think about which translations should be prioritized, how to keep track of the translations in progress, and how the implementation is handled while the translations are done.
- _Comment le contenu traduit vous sera-t-il livré ? What format will it be in?_
  - C'est une considération importante, quelle que soit l'approche que vous utilisez. Localization tools allow you to maintain control over the target file format and export process and usually support automation, e.g., by enabling integration with the hosting service.
- _How will you be implementing the translations in your project?_
  - In some cases, this could be as simple as uploading the translated file or adding it to your docs. However, with more complex projects, like website or app translations, you should make sure the code supports internationalization and establish how the implementation process will be handled ahead of time.
- _What happens if the formatting is different to the source?_
  - Similar to the above, if you are translating simple text files, the formatting probably isn’t crucially important. However, with more complex files, like content for a website or application, the formatting and code need to be identical to the source in order to be implemented in your project. If not, the target files will need to be edited, either by the translators or your developers.

**Meaning 2**

An alternative translation workflow, which does not account for internal decisions and approaches. The main consideration here is the flow of the content itself.

An example workflow in this case would be:

1. _Translation → Implementation_

- Le flux de travail le plus simple, où la traduction sera probablement une traduction humaine, car il n'y a pas de processus d'examen ou d'assurance qualité pour évaluer la qualité et éditer les traductions avant la mise en œuvre.
- With this workflow, it is important that the translators can maintain a certain level of quality, which will require appropriate resources and communication between the project managers and translators.

2. _Translation → Review → Implementation_

- A more advanced workflow, which includes a review and editing process, to ensure the quality of the translations is acceptable and consistent.
- There are a number of approaches to this workflow, where the translations could be performed by professional translators or volunteers, while the review process will likely be handled by professional reviewers, who are familiar with all the grammar and orthography rules that need to be observed in the target language.

3. _Translation → Review → QA → Implementation_

- The optimal workflow to ensure the highest level of quality. While QA is not always necessary, it could be useful to give you a better sense of the quality of the translated text after translation and review.
- With this workflow, translations could be performed exclusively by volunteers or even machine translation. The review process should be performed by professional translators, while the QA can be performed by a language service provider or internally, if you have employees who are native speakers of the target languages.

En savoir plus sur les flux de travail de traduction :

[Content rules on the five phases of the translation workflow](https://contentrules.com/creating-translation-workflow/)

[Smartling on what is translation workflow management](https://www.smartling.com/resources/101/what-is-translation-workflow-management/)

[RixTrans on the translation workflow](https://www.rixtrans.com/translation-workflow)

## Terminology Management {#terminology-management}

Establishing a clear plan on how to handle terminology is one of the most important steps to ensure the quality and consistency of your translations and save your translators time.

In the translation space, this is known as terminology management and is one of the key services language service providers offer their clients, in addition to access to their pool of linguists and content management.

Terminology management refers to the process of identifying, gathering, and managing terminology that is important for your project and should always be translated correctly and consistently.

There are a couple of steps to follow when starting to think about terminology management:

- Identify key terms that should be included in the termbase.
- Create a glossary of terms and their definitions.
- Translate the terms and add them to the glossary.
- Check and approve the translations.
- Maintenez le glossaire et mettez-le à jour avec de nouveaux termes, à mesure qu'ils deviennent importants.

Read more about terminology management:

[Trados on what is terminology management](https://www.trados.com/solutions/terminology-management/translation-101-what-is-terminology-management.html)

[Language Scientific on why terminology management matters](https://www.languagescientific.com/terminology-management-why-it-matters/#:~:text=Terminology%20management%20is%20the%20process,are%20related%20to%20each%20other.)

[Clear Words Translation on what is terminology management and why it matters](http://clearwordstranslations.com/language/en/what-is-terminology-management/)

### Translation Memory and Glossary {#tm-and-glossary}

The Translation Memory and Glossary are important tools in the translation industry and something most language service providers rely on.

Let’s look at what these terms mean and how they are different to each other:

**Mémoire de traduction (TM)** - Une base de données qui stocke automatiquement des segments ou des chaînes, y compris des blocs de texte plus longs, des phrases complètes, des paragraphes et des termes individuels, ainsi que leurs traductions actuelles et précédentes dans toutes les langues.

La plupart des outils de localisation, des systèmes de gestion de la traduction et des outils de traduction assistés par ordinateur ont des mémoires de traduction intégrées, qui peuvent généralement être exportées et utilisées dans d'autres outils similaires.

The benefits of using a translation memory include faster translations, better translation quality, the ability to retain certain translations when updating or changing source content, and cheaper translation costs for repetitive content.

Translation memories work based on a percentage match between different segments and are usually most useful when two segments contain over 50% of the same content. They are also used to automatically translate repetitive segments, which are 100% matches, thus removing the need to ever translate repetitive content more than once.

Read more about translation memories:

[Memsource on translation memories](https://www.memsource.com/translation-memory/)

[Smartling sur ce qu'est une mémoire de traduction](https://www.smartling.com/resources/101/what-is-translation-memory/)

**Glossary –** A list of important or sensitive terms, their definitions, functions, and established translations. The main difference between a glossary and a translation memory is that a glossary is not created automatically, and that it does not contain translations of full sentences.

Most localization tools, translation management systems, and computer-assisted translation tools have built-in glossaries that you can maintain to ensure they contain terminology important for your project. Like the TM, the glossary can usually be exported and used in other localization tools.

Before starting your translation project, it is highly recommended to take some time and create a glossary for your translators and reviewers. Using a glossary ensures that important terms are translated correctly, provides translators with much-needed context, and guarantees consistency in translations.

While glossaries most often contain established translations in the target languages, they are also useful without this. Even without established translations, a glossary can have definitions of technical terms, highlight terms that should not get translated, and inform translators whether a specific term is used as a noun, verb, proper noun, or any other part of speech.

Read more about glossaries:

[Lionbridge on what is a translation glossary](http://info.lionbridge.com/rs/lionbridge/images/Lionbridge%20FAQ_Glossary_2013.pdf)

[Transifex sur les glossaires](https://docs.transifex.com/glossary/glossary)

Si vous ne prévoyez pas d'utiliser un outil de localisation pour votre projet, vous ne pourrez probablement pas utiliser une mémoire de traduction et un glossaire (vous pouvez créer un glossaire ou une base de termes dans un fichier Excel, cependant, les glossaires automatisés éliminent le besoin pour les traducteurs de rechercher manuellement les termes et leurs définitions).

This means that all repetitive and similar content would have to be manually translated every time. De plus, les traducteurs devraient vous poser des questions pour savoir si un certain terme doit être traduit ou non, comment il est utilisé dans le texte et si un terme a déjà une traduction établie.

_Voulez-vous utiliser la mémoire de traduction et le glossaire d'ethereum.org dans votre projet ? Contactez-nous à l'adresse translations@ethereum.org. _

## Translator Outreach {#translator-outreach}

**Working with a language service provider**

If you are working with a language service provider and their professional translators, this section might not be too relevant for you.

Dans ce cas, il est important de sélectionner un fournisseur de services linguistiques ayant la capacité de fournir tous les services dont vous avez besoin (par exemple, traduction, révision, assurance qualité) dans de nombreuses langues.

Bien qu'il puisse être tentant de choisir un fournisseur de services linguistiques uniquement en fonction de ses tarifs proposés, il est important de noter que les plus grands fournisseurs de services linguistiques ont des tarifs plus élevés pour une raison.

- They have tens of thousands of linguists in their database, which means that they will be able to assign translators with sufficient experience and knowledge of your particular sector to your project (i.e., technical translators).
- They have significant experience working on different projects and meeting their clients’ diverse needs. This means they will be more likely to adapt to your particular workflow, offer valuable suggestions and potential improvements for your translation process, and meet your needs, requirements, and deadlines.
- Most of the largest language service providers also have their own localization tools, translation memories, and glossaries that you can use. Si ce n'est pas le cas, ils ont au moins suffisamment de linguistes dans leur bassin pour s'assurer que leurs traducteurs seront familiers et capables de travailler avec n'importe quel outil de localisation que vous souhaitez utiliser.

You can find an in-depth comparison of the largest language service providers in the world, some details about each of them and breakdowns by the services they provide, geographical data, etc. in the [2021 Nimdzi 100 report](https://www.nimdzi.com/nimdzi-100-top-lsp/).

**Working with non-professional translators**

Vous travaillez peut-être avec des traducteurs non professionnels et recherchez des bénévoles pour vous aider à traduire.

There are several ways to reach people and invite them to join your project. This will largely depend on your product and how big of a community you already have.

Some ways of onboarding volunteers are outlined below:

**Outreach –** While this is somewhat covered in the points below, reaching out to potential volunteers and making sure they are aware of your translation initiative can be effective in itself.

A lot of people want to get involved and contribute to their favorite projects, but often don’t see a clear way of doing that without being a developer or having special technical skills. Si vous pouvez faire connaître votre projet, de nombreux bilingues seront probablement désireux de s'impliquer.

**Looking within your community –** Most projects in the space already have large and active communities. A lot of your community members would probably appreciate the chance to contribute to the project in a simple way.

Bien que la contribution à des projets open source soit souvent basée sur une motivation intrinsèque, c'est aussi une expérience d'apprentissage fantastique. Anyone interested in learning more about your project would likely be happy to get involved with a translation program as a volunteer, since it would allow them to combine the fact that they have contributed to something they care about with an intensive hands-on learning experience.

**Mention de l'initiative dans votre produit -** Si votre produit est populaire et utilisé par un grand nombre de personnes, mettre en évidence votre programme de traduction et appeler les utilisateurs à l'action lors de l'utilisation du produit peut être extrêmement efficace.

This could be as simple as adding a banner or pop-up with a CTA to your product for applications and websites. C'est efficace parce que votre public cible est votre communauté - les personnes qui sont les plus susceptibles de s'impliquer en premier lieu.

**Social media –** Social media can be an effective way of spreading awareness about your translation program and reaching out to your community members, as well as other people who aren’t members of your community yet.

If you have a Discord server or Telegram channel, it is easy to use that for outreach, communication with your translators, and acknowledging your contributors.

Des plateformes comme X (anciennement Twitter) peuvent également être utiles pour intégrer de nouveaux membres de la communauté et reconnaître publiquement vos contributeurs.

La Fondation Linux a créé un rapport détaillé, le [Report on the 2020 FOSS contributor survey](https://www.linuxfoundation.org/wp-content/uploads/2020FOSSContributorSurveyReport_121020.pdf), analysant les contributeurs open source et leurs motivations.

## Conclusion {#conclusion}

This document contains some key considerations every translation program should be aware of. Ce n'est en aucun cas un guide exhaustif, bien qu'il puisse aider toute personne sans expérience dans l'industrie de la traduction à organiser un programme de traduction pour son projet.

If you are looking for more detailed instructions and breakdowns of different tools, processes, and critical aspects of managing a translation program, some of the largest language service providers maintain blogs and often publish articles on different aspects of the localization process. These are the best resources if you want to dive deeper into any of the topics above and understand how the localization process works professionally.

Some relevant links are included at the end of each section; however, you can find many other resources online.

Pour des propositions de coopération ou d'informations supplémentaires, d'apprentissages et de meilleures pratiques que nous avons recueillis en maintenant le programme de traduction ethereum.org, n'hésitez pas à nous contacter à translations@ethereum.org.
