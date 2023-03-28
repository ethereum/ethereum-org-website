---
title: Translation program playbook
lang: en
description: A collection of tips and important considerations for setting up a translation program
---

# Translation Program Playbook {#translation-program-playbook}

English is one of the most spoken languages in the world and is by far the world’s most studied language. As English is the most common language used on the internet – especially on social media – and multilingual programming languages are scarce, the majority of content in the blockchain space is natively written in English.

However, as over 6 billion people in the world (more than 75% of the population) do not speak English at all, this presents a massive barrier for entry to Ethereum for the vast majority of the world’s population.

For this reason, an increasing number of projects in the space are looking to get their content translated into different languages and localized for global communities.

Providing multilingual content is a simple and effective way of growing your global community, providing education to non-English speakers, making sure your content and communications reach a wider audience, and onboarding more people to the space.

This guide aims to address the common challenges and misconceptions about content localization. It provides a step-by-step guide to managing content, the translation and review process, quality assurance, translator outreach, and other vital aspects of the localization process.

## Content Management {#content-management}

Translation content management refers to the process of automating the translation workflow, which removes the need for repetitive manual work, improves efficiency and quality, allows for better control, and enables collaboration.

There are many different approaches to content management in the localization process, depending on the content and your needs.

The fundamental way of managing content is to create bilingual files, containing the source and target text. This is rarely used in translation, since it offers no significant advantages, apart from simplicity.

Translation agencies usually approach translation management by using translation management software or localization tools, which provide project management capabilities and allow for much greater control over the files, content, and linguists.

Read more about content management:

[Trados on what is translation management](https://www.trados.com/solutions/translation-management/)

[Phrase on multilingual content management](https://phrase.com/blog/posts/multilingual-content-management/)

### Translation Management Software {#translation-management-software}

There are many translation management systems and localization tools, and the choice of software depends mainly on your needs.

While some projects decide against using translation management systems and prefer to handle translations manually – either directly in bilingual files or on hosting services, such as GitHub – this dramatically reduces control, productivity, quality, scalability, and collaboration capabilities. Such an approach might be most beneficial for small-scale or one-off translation projects.

A quick look at some of the most powerful and widely used translation management tools:

**Best for crowdsourcing and collaboration**

[Crowdin](https://crowdin.com/)

- Free for open-source projects (unlimited number of strings and projects)
- TM and glossary available with all plans
- 60+ supported file formats, 70+ API integrations

[Lokalise](https://lokalise.com/)

- Free for 2 team members, paid plans for more contributors (limited number of strings for most plans)
- TM and glossary available with some paid plans
- 30+ supported file formats, 40+ API integrations

[Transifex](https://www.transifex.com/)

- Only paid plans (limited number of strings for most plans)
- TM and glossary available with all paid plans
- 30+ supported file formats, 20+ API integrations

[Phrase](https://phrase.com/)

- Only paid plans (unlimited number of strings for all plans, limited number of projects and team members)
- TM and glossary available with some paid plans
- 40+ supported file formats, 20+ API integrations

[Smartcat](https://www.smartcat.com/)

- Basic free plan with payable advanced features (unlimited number of strings and projects for all plans)
- TM and glossary available with all plans
- 60+ supported file formats, 20+ API integrations

[POEditor](https://poeditor.com/)

- Free for open-source projects (limited number of strings for all projects, unlimited for open-source projects)
- TM and glossary available for paid plans
- 20+ supported file formats, 10+ API integrations

and many others...

**Professional translation tools**

[SDL Trados Studio](https://www.trados.com/products/trados-studio/)

- Paid plans for freelance translators and teams
- Very powerful computer-assisted translation (CAT) tool and translator productivity software

[MemoQ](https://www.memoq.com/)

- Limited free version available with several paid plans for advanced features
- Translation management software for companies, language service providers and translators

[Memsource](https://www.memsource.com/)

- Free for individual translators with several paid plans for teams
- Cloud-based computer-assisted translation and translation management system

and many others...

Read more about translation management software:

[Wikipedia definition of translation management systems](https://en.wikipedia.org/wiki/Translation_management_system)

[Phrase on 7 things every translation management software should have](https://phrase.com/blog/posts/7-things-every-translation-management-software-should-have/)

[MemoQ on what is a translation management system](https://www.memoq.com/tools/what-is-a-translation-management-system)

[Gengo’s list of 16 best translation management systems](https://gengo.com/translator-product-updates/16-best-translation-management-systems/)

## Workflow {#workflow}

In the translation space, translation workflow can mean a couple of different things, both somewhat interrelated, and important considerations for your project.

We will explore both of them below.

**Meaning 1**

This is probably the most common way of thinking about translation workflows and something that usually comes to mind when hearing the word workflow.

In its essence, it is the ‘flow of work’ from starting to think about translations to using the translated content in your product.

An example workflow in this case would be:

1. **Preparing the files for translation** – It sounds simple; however, you need to consider a couple of important things. At this step, you should have a clear plan on how the entire process should work.

- _Which file types will you be using? What format do you want to receive your translated files in?_
  - If your content is available in DOCX or MD format, the approach will be much more straightforward than if you are translating a PDF version of your Whitepaper or other documents.
- _Which localization tools support this file type? Can the file be translated in a way that retains the original formatting?_
  - Not all file types support direct localization (e.g., PDF files, image files), and not all localization tools support all file types.
- _Who will be translating the content? Will you be ordering professional translations or relying on volunteers?_
  - This affects a number of other decisions you need to make. For example, professional translators are more comfortable working with advanced localization tools than volunteers.
- _What are your expectations for the linguists? If you are using a language service provider, what do they expect from you?_
  - This is the step to make sure your goals, expectations, and timelines are aligned.
- _Is all the content for translation equally important? Should some content be translated first?_
  - There are some ways to prioritize certain content, which should be translated and implemented first. For example, if you have a lot of content for translation, you can use version control to make sure the translators are aware of which they should prioritize.

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

- _How are you planning on communicating with the translators?_
  - If you are planning on using a localization tool, the communication can take place directly in the tool. Setting up an alternative communication channel with the translators is also recommended since they might be less hesitant to reach out, and messaging tools allow for more free-flowing communication.
- _How to handle questions from translators? Who should be answering these questions?_
  - Translators (both professional and non-professional) will often reach out with questions and requests for clarification or additional context, as well as feedback and ideas for improvements. Replying to these inquiries can often lead to better engagement and quality of translated content. It is also valuable to provide them with as many resources as possible (e.g., guides, tips, terminology guidelines, FAQs, etc.).
- _How to handle the review process? Do you want to outsource it, or do you have the capacity to perform reviews internally?_
  - While not always necessary, reviews are an integral part of an optimal translation process. Usually, it is easiest to outsource the review process to professional reviewers. However, if you have a large international team, the reviews or QA can also be handled internally.

4. **Implementing the translated content** – The last part of the workflow, though still important to consider ahead of time.

- _Will all the translations be completed at the same time?_
  - If not, you should think about which translations should be prioritized, how to keep track of the translations in progress, and how the implementation is handled while the translations are done.
- _How will the translated content be delivered to you? What format will it be in?_
  - This is an important consideration, regardless of which approach you use. Localization tools allow you to maintain control over the target file format and export process and usually support automation, e.g., by enabling integration with the hosting service.
- _How will you be implementing the translations in your project?_
  - In some cases, this could be as simple as uploading the translated file or adding it to your docs. However, with more complex projects, like website or app translations, you should make sure the code supports internationalization and establish how the implementation process will be handled ahead of time.
- _What happens if the formatting is different to the source?_
  - Similar to the above, if you are translating simple text files, the formatting probably isn’t crucially important. However, with more complex files, like content for a website or application, the formatting and code need to be identical to the source in order to be implemented in your project. If not, the target files will need to be edited, either by the translators or your developers.

**Meaning 2**

An alternative translation workflow, which does not account for internal decisions and approaches. The main consideration here is the flow of the content itself.

An example workflow in this case would be:

1. _Translation → Implementation_

- The simplest workflow, where the translation will likely be human translation, since there is no review or QA process to evaluate the quality and edit the translations before implementation.
- With this workflow, it is important that the translators can maintain a certain level of quality, which will require appropriate resources and communication between the project managers and translators.

2. _Translation → Review → Implementation_

- A more advanced workflow, which includes a review and editing process, to ensure the quality of the translations is acceptable and consistent.
- There are a number of approaches to this workflow, where the translations could be performed by professional translators or volunteers, while the review process will likely be handled by professional reviewers, who are familiar with all the grammar and orthography rules that need to be observed in the target language.

3. _Translation → Review → QA → Implementation_

- The optimal workflow to ensure the highest level of quality. While QA is not always necessary, it could be useful to give you a better sense of the quality of the translated text after translation and review.
- With this workflow, translations could be performed exclusively by volunteers or even machine translation. The review process should be performed by professional translators, while the QA can be performed by a language service provider or internally, if you have employees who are native speakers of the target languages.

Read more about translation workflows:

[Content rules on the five phrases of the translation workflow](https://contentrules.com/creating-translation-workflow/)

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
- Maintain the glossary and update it with new terms, as they become important.

Read more about terminology management:

[Trados on what is terminology management](https://www.trados.com/solutions/terminology-management/translation-101-what-is-terminology-management.html)

[Language Scientific on why terminology management matters](https://www.languagescientific.com/terminology-management-why-it-matters/#:~:text=Terminology%20management%20is%20the%20process,are%20related%20to%20each%20other.)

[Clear Words Translation on what is terminology management and why it matters](http://clearwordstranslations.com/language/en/what-is-terminology-management/)

### Translation Memory and Glossary {#tm-and-glossary}

The Translation Memory and Glossary are important tools in the translation industry and something most language service providers rely on.

Let’s look at what these terms mean and how they are different to each other:

**Translation memory (TM)** – A database that automatically stores segments or strings, including longer blocks of text, complete sentences, paragraphs, and individual terms, as well as their current and previous translations in every language.

Most localization tools, translation management systems, and computer-assisted translation tools have built-in translation memories, which can usually be exported and used in other similar tools as well.

The benefits of using a translation memory include faster translations, better translation quality, the ability to retain certain translations when updating or changing source content, and cheaper translation costs for repetitive content.

Translation memories work based on a percentage match between different segments and are usually most useful when two segments contain over 50% of the same content. They are also used to automatically translate repetitive segments, which are 100% matches, thus removing the need to ever translate repetitive content more than once.

Read more about translation memories:

[Memsource on translation memories](https://www.memsource.com/translation-memory/)

[Smartling on what is a translation memory](https://www.smartling.com/resources/101/what-is-translation-memory/)

**Glossary –** A list of important or sensitive terms, their definitions, functions, and established translations. The main difference between a glossary and a translation memory is that a glossary is not created automatically, and that it does not contain translations of full sentences.

Most localization tools, translation management systems, and computer-assisted translation tools have built-in glossaries that you can maintain to ensure they contain terminology important for your project. Like the TM, the glossary can usually be exported and used in other localization tools.

Before starting your translation project, it is highly recommended to take some time and create a glossary for your translators and reviewers. Using a glossary ensures that important terms are translated correctly, provides translators with much-needed context, and guarantees consistency in translations.

While glossaries most often contain established translations in the target languages, they are also useful without this. Even without established translations, a glossary can have definitions of technical terms, highlight terms that should not get translated, and inform translators whether a specific term is used as a noun, verb, proper noun, or any other part of speech.

Read more about glossaries:

[Lionbridge on what is a translation glossary](http://info.lionbridge.com/rs/lionbridge/images/Lionbridge%20FAQ_Glossary_2013.pdf)

[Transifex on glossaries](https://docs.transifex.com/glossary/glossary)

If you are not planning on using a localization tool for your project, you will likely not be able to use a translation memory and glossary (you could create a glossary or termbase in an excel file, however, automated glossaries remove the need for translators to manually look for terms and their definitions).

This means that all repetitive and similar content would have to be manually translated every time. Additionally, translators would have to reach out with questions on whether a certain term needs to be translated or not, how it is used in the text, and whether a term already has an established translation.

_Do you want to use the ethereum.org translation memory and glossary in your project? Reach out to us at translations@ethereum.org._

## Translator Outreach {#translator-outreach}

**Working with a language service provider**

If you are working with a language service provider and their professional translators, this section might not be too relevant for you.

In this case, it is important to select a language service provider with the capacity to provide all the services you need (e.g., translation, review, QA) in many languages.

While it might be tempting to select a language service provider solely based on their offered rates, it is important to note that the largest language service providers have higher rates for a reason.

- They have tens of thousands of linguists in their database, which means that they will be able to assign translators with sufficient experience and knowledge of your particular sector to your project (i.e., technical translators).
- They have significant experience working on different projects and meeting their clients’ diverse needs. This means they will be more likely to adapt to your particular workflow, offer valuable suggestions and potential improvements for your translation process, and meet your needs, requirements, and deadlines.
- Most of the largest language service providers also have their own localization tools, translation memories, and glossaries that you can use. If not, they at least have enough linguists in their pool to make sure that their translators will be familiar with and able to work with any localization tool you want to use.

You can find an in-depth comparison of the largest language service providers in the world, some details about each of them and breakdowns by the services they provide, geographical data, etc. in the [2021 Nimdzi 100 report](https://www.nimdzi.com/nimdzi-100-top-lsp/).

**Working with non-professional translators**

You might be working with non-professional translators and looking for volunteers to help you translate.

There are several ways to reach people and invite them to join your project. This will largely depend on your product and how big of a community you already have.

Some ways of onboarding volunteers are outlined below:

**Outreach –** While this is somewhat covered in the points below, reaching out to potential volunteers and making sure they are aware of your translation initiative can be effective in itself.

A lot of people want to get involved and contribute to their favorite projects, but often don’t see a clear way of doing that without being a developer or having special technical skills. If you can spread awareness about your project, a lot of bilinguals will likely be keen to get involved.

**Looking within your community –** Most projects in the space already have large and active communities. A lot of your community members would probably appreciate the chance to contribute to the project in a simple way.

While contributing to open-source projects is often based on intrinsic motivation, it is also a fantastic learning experience. Anyone interested in learning more about your project would likely be happy to get involved with a translation program as a volunteer, since it would allow them to combine the fact that they have contributed to something they care about with an intensive hands-on learning experience.

**Mentioning the initiative in your product –** If your product is popular and used by a large number of people, highlighting your translation program and calling users to action while using the product can be extremely effective.

This could be as simple as adding a banner or pop-up with a CTA to your product for applications and websites. This is effective because your target audience is your community - the people who are most likely to get involved in the first place.

**Social media –** Social media can be an effective way of spreading awareness about your translation program and reaching out to your community members, as well as other people who aren’t members of your community yet.

If you have a Discord server or Telegram channel, it is easy to use that for outreach, communication with your translators, and acknowledging your contributors.

Platforms like Twitter can also be helpful for onboarding new community members and publicly acknowledging your contributors.

The Linux Foundation has created an extensive report on the [2020 FOSS open-source contributor survey](https://www.linuxfoundation.org/wp-content/uploads/2020FOSSContributorSurveyReport_121020.pdf), analyzing open-source contributors and their motivations.

## Conclusion {#conclusion}

This document contains some key considerations every translation program should be aware of. It is by no means an exhaustive guide, though it can help anyone with no experience in the translation industry organize a translation program for their project.

If you are looking for more detailed instructions and breakdowns of different tools, processes, and critical aspects of managing a translation program, some of the largest language service providers maintain blogs and often publish articles on different aspects of the localization process. These are the best resources if you want to dive deeper into any of the topics above and understand how the localization process works professionally.

Some relevant links are included at the end of each section; however, you can find many other resources online.

For proposals for cooperation or additional information, learnings, and best practices we’ve picked up by maintaining the ethereum.org Translation Program, feel free to reach out to us at translations@ethereum.org.
