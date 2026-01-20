---
title: Manual do programa de tradução
lang: pt-br
description: Uma coleção de dicas e considerações importantes para a criação de um programa de tradução
---

# Manual do Programa de Tradução {#translation-program-playbook}

O inglês é uma das línguas mais faladas no mundo e, de longe, a língua mais estudada do mundo. Como o inglês é o idioma mais comum usado na internet — especialmente nas mídias sociais — e as linguagens de programação multilíngues são escassas, a maior parte do conteúdo no espaço blockchain é escrito nativamente em inglês.

No entanto, como mais de 6 bilhões de pessoas no mundo (mais de 75% da população) não falam inglês, isso representa uma barreira enorme para a entrada no Ethereum para a grande maioria da população mundial.

Por esse motivo, um número crescente de projetos nesse setor busca traduzir seu conteúdo para diferentes idiomas e localizá-lo para comunidades globais.

Fornecer conteúdo multilíngue é uma maneira simples e eficaz de expandir sua comunidade global, fornecer educação a pessoas que não falam inglês, garantir que seu conteúdo e comunicações alcancem um público maior e atrair mais pessoas para o espaço.

Este guia tem como objetivo abordar os desafios e equívocos comuns sobre localização de conteúdo. Ele fornece um guia passo a passo para gerenciar conteúdo, o processo de tradução e revisão, garantia de qualidade, alcance do tradutor e outros aspectos vitais do processo de localização.

## Gerenciamento de conteúdo {#content-management}

O gerenciamento de conteúdo de tradução refere-se ao processo de automatização do fluxo de trabalho de tradução, o que elimina a necessidade de trabalho manual repetitivo, melhora a eficiência e a qualidade, permite melhor controle e possibilita a colaboração.

Existem muitas abordagens diferentes para o gerenciamento de conteúdo no processo de localização, dependendo do conteúdo e das suas necessidades.

A maneira fundamental de gerenciar conteúdo é criar arquivos bilíngues, contendo o texto de origem e de destino. Isso é raramente usado em tradução, pois não oferece vantagens significativas, além da simplicidade.

As agências de tradução geralmente abordam o gerenciamento usando softwares de tradução ou ferramentas de localização, que fornecem recursos para os projetos e permitem um controle muito maior sobre os arquivos, o conteúdo e os linguistas.

Saiba mais sobre gerenciamento de conteúdo:

[Trados sobre o que é gestão de tradução](https://www.trados.com/solutions/translation-management/)

[Frase sobre gerenciamento de conteúdo multilíngue](https://phrase.com/blog/posts/multilingual-content-management/)

### Software de gerenciamento de tradução {#translation-management-software}

Existem muitos sistemas de gerenciamento de tradução e ferramentas de localização, e a escolha do software depende principalmente de suas necessidades.

Embora alguns projetos decidam não usar sistemas de gerenciamento de tradução e prefiram lidar com as traduções manualmente — seja diretamente em arquivos bilíngues ou em serviços de hospedagem, como o GitHub — isso reduz drasticamente o controle, a produtividade, a qualidade, a escalabilidade e os recursos de colaboração. Essa abordagem pode ser mais benéfica para projetos de tradução de pequena escala ou pontuais.

Uma rápida olhada em algumas das ferramentas de gerenciamento de tradução mais poderosas e amplamente utilizadas:

**Melhor para crowdsourcing e colaboração**

[Crowdin](https://crowdin.com/)

- Gratuito para projetos de código aberto (número ilimitado de strings e projetos)
- TM e glossário disponíveis com todos os planos
- Mais de 60 formatos de arquivo suportados, mais de 70 integrações de API

[Lokalise](https://lokalise.com/)

- Grátis para 2 membros da equipe, planos pagos para mais colaboradores (número limitado de strings para a maioria dos planos)
- TM e glossário disponíveis com alguns planos pagos
- Mais de 30 formatos de arquivo suportados, mais de 40 integrações de API

[Transifex](https://www.transifex.com/)

- Somente planos pagos (número limitado de sequências para a maioria dos planos)
- TM e glossário disponíveis em todos os planos pagos
- Mais de 30 formatos de arquivo suportados, mais de 20 integrações de API

[Phrase](https://phrase.com/)

- Somente planos pagos (número ilimitado de strings para todos os planos, número limitado de projetos e membros da equipe)
- TM e glossário disponíveis com alguns planos pagos
- Mais de 40 formatos de arquivo suportados, mais de 20 integrações de API

[Smartcat](https://www.smartcat.com/)

- Plano básico gratuito com recursos avançados pagos (número ilimitado de strings e projetos para todos os planos)
- TM e glossário disponíveis com todos os planos
- Mais de 60 formatos de arquivo suportados, mais de 20 integrações de API

[POEditor](https://poeditor.com/)

- Gratuito para projetos de código aberto (número limitado de strings para todos os projetos, ilimitado para projetos de código aberto)
- TM e glossário disponíveis para planos pagos
- Mais de 20 formatos de arquivo suportados, mais de 10 integrações de API

e muitos outros...

**Ferramentas de tradução profissionais**

[SDL Trados Studio](https://www.trados.com/products/trados-studio/)

- Planos pagos para tradutores e equipes freelancers
- Ferramenta de tradução assistida por computador (CAT) muito poderosa e software de produtividade para tradutores

[MemoQ](https://www.memoq.com/)

- Versão gratuita limitada disponível com vários planos pagos para recursos avançados
- Software de gestão de tradução para empresas, prestadores de serviços de idiomas e tradutores

[Memsource](https://www.memsource.com/)

- Gratuito para tradutores individuais com vários planos pagos para equipes
- Sistema de tradução e gestão de tradução assistido por computador baseado em nuvem

e muitos outros...

Saiba mais sobre software de gerenciamento de tradução:

[Definição da Wikipédia de sistemas de gestão de tradução](https://en.wikipedia.org/wiki/Translation_management_system)

[Frase sobre 7 coisas que todo software de gerenciamento de tradução deveria ter](https://phrase.com/blog/posts/7-things-every-translation-management-software-should-have/)

[MemoQ sobre o que é um sistema de gerenciamento de tradução](https://www.memoq.com/tools/what-is-a-translation-management-system)

[Lista da Gengo dos 16 melhores sistemas de gestão de tradução](https://gengo.com/translator-product-updates/16-best-translation-management-systems/)

## Workflow {#workflow}

No mundo da tradução, o fluxo de trabalho da tradução pode significar algumas coisas diferentes, ambas de certa forma inter-relacionadas e considerações importantes para o seu projeto.

Exploraremos ambos abaixo.

**Significado 1**

Esta é provavelmente a maneira mais comum de pensar sobre fluxos de trabalho de tradução e algo que geralmente vem à mente quando ouço a palavra fluxo de trabalho.

Em essência, é o “fluxo de trabalho” desde o início da reflexão sobre as traduções até a utilização do conteúdo traduzido no seu produto.

Um exemplo de workflow neste caso seria:

1. **Preparando os arquivos para tradução** – Parece simples; no entanto, você precisa considerar algumas coisas importantes. Nesta etapa, você deve ter um plano claro de como todo o processo deve funcionar.

- Quais tipos de arquivo você usará? Em qual formato você deseja receber seus arquivos traduzidos?_
  - Se o seu conteúdo estiver disponível em formato DOCX ou MD, a abordagem será muito mais direta do que se você estivesse traduzindo uma versão em PDF do seu Whitepaper ou de outros documentos.
- _Quais ferramentas de localização suportam esse tipo de arquivo? O arquivo pode ser traduzido para manter a formatação original?_
  - Nem todos os tipos de arquivo suportam localização direta (por exemplo, arquivos PDF, arquivos de imagem), e nem todas as ferramentas de localização suportam todos os tipos de arquivo.
- _Quem traduzirá o conteúdo? Você solicitará traduções profissionais ou dependerá de voluntários?_
  - Isso afeta uma série de outras decisões que você precisa tomar. Por exemplo, tradutores profissionais se sentem mais confortáveis ​​trabalhando com ferramentas avançadas de localização do que voluntários.
- Quais são suas expectativas para os linguistas? Se você estiver usando um provedor de serviços de idiomas, o que eles esperam de você?_
  - Esta é a etapa para garantir que seus objetivos, expectativas e cronogramas estejam alinhados.
- _Todo o conteúdo para tradução é igualmente importante? Algum conteúdo deve ser traduzido primeiro?_
  - Existem algumas maneiras de priorizar determinado conteúdo, que deve ser traduzido e implementado primeiro. Por exemplo, se você tem muito conteúdo para traduzir, pode usar o controle de versão para garantir que os tradutores saibam o que devem priorizar.

2. **Compartilhamento dos arquivos para tradução** – Esta etapa também requer algum pensamento de longo prazo e não é tão simples quanto enviar os arquivos de origem para um provedor de serviços de idiomas.

- _Quem traduzirá o conteúdo? Quantas pessoas estarão envolvidas neste processo?_
  - Se você planeja usar uma ferramenta de localização, esta etapa é simplificada, pois você pode carregar os arquivos de origem diretamente na ferramenta. Isso também é verdade se o processo de tradução ocorrer no serviço de hospedagem, já que os arquivos de origem não precisam ser exportados para lugar nenhum.
- _Os arquivos de origem serão manipulados manualmente ou esse processo pode ser automatizado?_
  - A maioria das ferramentas de localização permite algum tipo de integração ou automação do processo de gerenciamento de arquivos. Por outro lado, se você estiver trabalhando com tradutores individuais e não estiver usando uma ferramenta de localização, enviar manualmente os arquivos de origem para centenas ou milhares de tradutores não é um processo escalável.
- _Quais ferramentas serão usadas para a localização?_
  - A resposta a essa pergunta determinará como você abordará o resto. Selecionar a ferramenta adequada pode ajudar você a automatizar o gerenciamento de conteúdo, gerenciar a Memória de Tradução e o Glossário, gerenciar tradutores, acompanhar o progresso da tradução/revisão, etc., então reserve um tempo e pesquise qual ferramenta você deseja usar. Se você não planeja usar uma ferramenta de localização, tudo isso precisará ser feito manualmente.
- _Quanto tempo levará o processo de tradução? Quanto vai custar?_
  - Neste ponto, você deve estar pronto para compartilhar os arquivos de origem com o provedor de serviços de idiomas ou com o grupo de tradutores. O provedor de serviços de idiomas pode ajudar você a analisar a contagem de palavras e fornecer um orçamento, incluindo as taxas e o cronograma do processo de tradução.
- _Você está planejando fazer alterações/atualizar o conteúdo de origem durante esse processo?_
  - Se o seu conteúdo for dinâmico e mudar com frequência, quaisquer alterações ou atualizações podem atrapalhar o andamento da tradução. Usar uma memória de tradução pode ajudar a atenuar isso significativamente, embora ainda seja importante pensar em como o processo funcionará e como você pode evitar atrasos no progresso dos tradutores.

3. **Gerenciando o processo de tradução** – Seu trabalho não termina quando o conteúdo de origem é entregue ao provedor de serviços de idioma ou aos tradutores. Para garantir a qualidade ideal das traduções, os criadores de conteúdo devem estar o mais envolvidos possível no processo de tradução.

- _Como você planeja se comunicar com os tradutores?_
  - Se você planeja usar uma ferramenta de localização, a comunicação pode ocorrer diretamente na ferramenta. Também é recomendável criar um canal de comunicação alternativo com os tradutores, pois eles podem ficar menos hesitantes em entrar em contato, e as ferramentas de mensagens permitem uma comunicação mais fluida.
- _Como lidar com perguntas de tradutores? Quem deve responder a essas perguntas?_
  - Tradutores (profissionais e não profissionais) frequentemente entrarão em contato com perguntas e solicitações de esclarecimentos ou contexto adicional, bem como feedback e ideias para melhorias. Responder a essas perguntas geralmente pode levar a um melhor engajamento e qualidade do conteúdo traduzido. Também é valioso fornecer a eles o máximo de recursos possível (por exemplo, guias, dicas, diretrizes de terminologia, perguntas frequentes, etc.).
- _Como lidar com o processo de revisão? Você quer terceirizar ou tem capacidade de realizar revisões internamente?_
  - Embora nem sempre sejam necessárias, as revisões são parte integrante de um processo de tradução ideal. Normalmente, é mais fácil terceirizar o processo de revisão para revisores profissionais. No entanto, se você tiver uma grande equipe internacional, as revisões ou o controle de qualidade também podem ser feitos internamente.

4. **Implementando o conteúdo traduzido** – A última parte do fluxo de trabalho, embora ainda seja importante considerar com antecedência.

- _Todas as traduções serão concluídas ao mesmo tempo?_
  - Caso contrário, você deve pensar em quais traduções devem ser priorizadas, como acompanhar as que estão em andamento e como a implementação é tratada enquanto elas são feitas.
- _Como o conteúdo traduzido será entregue a você? Em que formato será?_
  - Esta é uma consideração importante, independentemente da abordagem que você usar. As ferramentas de localização permitem que você mantenha o controle sobre o formato do arquivo de destino e o processo de exportação e geralmente oferecem suporte à automação, por exemplo, permitindo a integração com o serviço de hospedagem.
- _Como você implementará as traduções no seu projeto?_
  - Em alguns casos, isso pode ser tão simples quanto enviar o arquivo traduzido ou adicioná-lo aos seus documentos. No entanto, em projetos mais complexos, como traduções de sites ou aplicativos, você deve garantir que o código suporte a internacionalização e estabelecer com antecedência como o processo de implementação será conduzido.
- _O que acontece se a formatação for diferente da fonte?_
  - Semelhante ao acima, se você estiver traduzindo arquivos de texto simples, a formatação provavelmente não será tão importante. No entanto, com arquivos mais complexos, como conteúdo para um site ou aplicativo, a formatação e o código precisam ser idênticos ao código-fonte para serem implementados no seu projeto. Caso contrário, os arquivos de destino precisarão ser editados, pelos tradutores ou pelos seus desenvolvedores.

**Significado 2**

Um fluxo de trabalho de tradução alternativo, que não considera decisões e abordagens internas. A principal consideração aqui é o fluxo do conteúdo em si.

Um exemplo de workflow neste caso seria:

1. _Tradução → Implementação_

- O fluxo de trabalho mais simples, onde a tradução provavelmente será feita por uma tradução humana, já que não há processo de revisão ou controle de qualidade para avaliar a qualidade e editar as traduções antes da implementação.
- Com esse fluxo de trabalho, é importante que os tradutores consigam manter um certo nível de qualidade, o que exigirá recursos adequados e comunicação entre os gerentes de projeto e os tradutores.

2. _Tradução → Revisão → Implementação_

- Um fluxo de trabalho mais avançado, que inclui um processo de revisão e edição, para garantir que a qualidade das traduções seja aceitável e consistente.
- Há uma série de abordagens para esse fluxo de trabalho, onde as traduções podem ser realizadas por tradutores profissionais ou voluntários, enquanto o processo de revisão provavelmente será conduzido por revisores profissionais, que estão familiarizados com todas as regras gramaticais e ortográficas que precisam ser observadas no idioma de destino.

3. _Tradução → Revisão → QA → Implementação_

- O fluxo de trabalho ideal para garantir o mais alto nível de qualidade. Embora o controle de qualidade nem sempre seja necessário, ele pode ser útil para lhe dar uma noção melhor da qualidade do texto traduzido após a tradução e a revisão.
- Com esse fluxo de trabalho, as traduções poderiam ser realizadas exclusivamente por voluntários ou até mesmo por tradução automática. O processo de revisão deve ser realizado por tradutores profissionais, enquanto o controle de qualidade pode ser realizado por um provedor de serviços de idiomas ou internamente, se você tiver funcionários que sejam falantes nativos dos idiomas de destino.

Saiba mais sobre fluxos de trabalho de tradução:

[Regras de conteúdo sobre as cinco fases do fluxo de trabalho de tradução](https://contentrules.com/creating-translation-workflow/)

[Smartling sobre o que é gerenciamento de fluxo de trabalho de tradução](https://www.smartling.com/resources/101/what-is-translation-workflow-management/)

[RixTrans sobre o fluxo de trabalho de tradução](https://www.rixtrans.com/translation-workflow)

## Gestão de Terminologia {#terminology-management}

Estabelecer um plano claro sobre como lidar com a terminologia é um dos passos mais importantes para garantir a qualidade e a consistência das suas traduções e economizar tempo dos seus tradutores.

No setor de tradução, isso é conhecido como gerenciamento de terminologia e é um dos principais serviços que os provedores de serviços de idiomas oferecem aos seus clientes, além do acesso ao seu conjunto de linguistas e gerenciamento de conteúdo.

Gerenciamento de terminologia se refere ao processo de identificar, reunir e gerenciar terminologia que é importante para seu projeto e deve sempre ser traduzida de forma correta e consistente.

Há alguns passos a seguir ao começar a pensar sobre gerenciamento de terminologia:

- Identifique os termos-chave que devem ser incluídos na base de termos.
- Crie um glossário de termos e suas definições.
- Traduza os termos e adicione-os ao glossário.
- Verifique e aprove as traduções.
- Mantenha o glossário e atualize-o com novos termos, à medida que se tornam importantes.

Saiba mais sobre gerenciamento de terminologia:

[Trados sobre o que é gerenciamento de terminologia](https://www.trados.com/solutions/terminology-management/translation-101-what-is-terminology-management.html)

[Language Scientific sobre a importância da gestão de terminologia](https://www.languagescientific.com/terminology-management-why-it-matters/#:~:text=Terminology%20management%20is%20the%20process,are%20related%20to%20each%20other.)

[Clear Words Translation sobre o que é gerenciamento de terminologia e por que isso é importante](http://clearwordstranslations.com/language/en/what-is-terminology-management/)

### Memória de tradução e glossário {#tm-and-glossary}

A Memória de Tradução e o Glossário são ferramentas importantes no setor de tradução e algo em que a maioria dos provedores de serviços de idiomas confia.

Vamos ver o que esses termos significam e como eles são diferentes entre si:

**Memória de tradução (TM)** – Um banco de dados que armazena automaticamente segmentos ou sequências de caracteres, incluindo blocos de texto mais longos, frases completas, parágrafos e termos individuais, bem como suas traduções atuais e anteriores em todos os idiomas.

A maioria das ferramentas de localização, sistemas de gerenciamento de tradução e ferramentas de tradução assistida por computador têm memórias de tradução integradas, que geralmente podem ser exportadas e usadas em outras ferramentas semelhantes.

Os benefícios de usar uma memória de tradução incluem traduções mais rápidas, melhor qualidade de tradução, a capacidade de reter determinadas traduções ao atualizar ou alterar o conteúdo de origem e custos de tradução mais baixos para conteúdo repetitivo.

As memórias de tradução funcionam com base em uma porcentagem de correspondência entre diferentes segmentos e geralmente são mais úteis quando dois segmentos contêm mais de 50% do mesmo conteúdo. Eles também são usados ​​para traduzir automaticamente segmentos repetitivos, que são 100% correspondentes, eliminando assim a necessidade de traduzir conteúdo repetitivo mais de uma vez.

Leia mais sobre memórias de tradução:

[Memsource sobre memórias de tradução](https://www.memsource.com/translation-memory/)

[Smartling sobre o que é uma memória de tradução](https://www.smartling.com/resources/101/what-is-translation-memory/)

**Glossário –** Uma lista de termos importantes ou sensíveis, suas definições, funções e traduções estabelecidas. A principal diferença entre um glossário e uma memória de tradução é que um glossário não é criado automaticamente e não contém traduções de frases completas.

A maioria das ferramentas de localização, sistemas de gerenciamento de tradução e ferramentas de tradução assistida por computador têm glossários integrados que você pode manter para garantir que contenham terminologia importante para seu projeto. Assim como a TM, o glossário geralmente pode ser exportado e usado em outras ferramentas de localização.

Antes de começar seu projeto de tradução, é altamente recomendável reservar um tempo para criar um glossário para seus tradutores e revisores. Usar um glossário garante que termos importantes sejam traduzidos corretamente, fornece aos tradutores o contexto necessário e garante consistência nas traduções.

Embora os glossários geralmente contenham traduções estabelecidas nos idiomas de destino, eles também são úteis sem elas. Mesmo sem traduções estabelecidas, um glossário pode ter definições de termos técnicos, destacar termos que não devem ser traduzidos e informar aos tradutores se um termo específico é usado como substantivo, verbo, nome próprio ou qualquer outra parte do discurso.

Saiba mais sobre glossários:

[Lionbridge sobre o que é um glossário de tradução](http://info.lionbridge.com/rs/lionbridge/images/Lionbridge%20FAQ_Glossary_2013.pdf)

[Transifex sobre glossários](https://docs.transifex.com/glossary/glossary)

Se você não estiver planejando usar uma ferramenta de localização para seu projeto, provavelmente não poderá usar uma memória de tradução e um glossário (você pode criar um glossário ou base de termos em um arquivo Excel; no entanto, os glossários automatizados eliminam a necessidade de os tradutores procurarem manualmente os termos e suas definições).

Isso significa que todo conteúdo repetitivo e semelhante teria que ser traduzido manualmente todas as vezes. Além disso, os tradutores teriam que entrar em contato com perguntas sobre se um determinado termo precisa ser traduzido ou não, como ele é usado no texto e se um termo já tem uma tradução estabelecida.

_Você quer usar a memória de tradução e o glossário do ethereum.org no seu projeto? Entre em contato conosco pelo e-mail translations@ethereum.org._

## Divulgação do tradutor {#translator-outreach}

**Trabalhando com um provedor de serviços de idiomas**

Se você estiver trabalhando com um provedor de serviços de idiomas e seus tradutores profissionais, esta seção pode não ser muito relevante para você.

Nesse caso, é importante selecionar um provedor de serviços de idiomas com capacidade para fornecer todos os serviços que você precisa (por exemplo, tradução, revisão, controle de qualidade) em vários idiomas.

Embora possa ser tentador selecionar um provedor de serviços de idiomas apenas com base nas taxas oferecidas, é importante observar que os maiores provedores de serviços de idiomas têm taxas mais altas por um motivo.

- Eles têm dezenas de milhares de linguistas em seu banco de dados, o que significa que poderão designar tradutores com experiência e conhecimento suficientes do seu setor específico para o seu projeto (por exemplo, tradutores técnicos).
- Eles têm experiência significativa trabalhando em diferentes projetos e atendendo às diversas necessidades de seus clientes. Isso significa que eles estarão mais propensos a se adaptar ao seu fluxo de trabalho específico, oferecer sugestões valiosas e possíveis melhorias para seu processo de tradução e atender às suas necessidades, requisitos e prazos.
- A maioria dos grandes provedores de serviços de idiomas também tem suas próprias ferramentas de localização, memórias de tradução e glossários que você pode usar. Caso contrário, eles pelo menos têm linguistas suficientes em seu grupo para garantir que seus tradutores estejam familiarizados e consigam trabalhar com qualquer ferramenta de localização que você queira usar.

Você pode encontrar uma comparação detalhada dos maiores provedores de serviços de idiomas do mundo, alguns detalhes sobre cada um deles e detalhamentos pelos serviços que eles fornecem, dados geográficos, etc. no [relatório Nimdzi 100 de 2021](https://www.nimdzi.com/nimdzi-100-top-lsp/).

**Trabalhando com tradutores não profissionais**

Você pode estar trabalhando com tradutores não profissionais e procurando voluntários para ajudá-lo a traduzir.

Existem várias maneiras de alcançar pessoas e convidá-las a participar do seu projeto. Isso dependerá muito do seu produto e do tamanho da comunidade que você já tem.

Algumas maneiras de integrar voluntários são descritas abaixo:

**Divulgação –** Embora isso seja parcialmente abordado nos pontos abaixo, entrar em contato com potenciais voluntários e garantir que eles estejam cientes da sua iniciativa de tradução pode ser eficaz por si só.

Muitas pessoas querem se envolver e contribuir com seus projetos favoritos, mas geralmente não veem uma maneira clara de fazer isso sem ser um desenvolvedor ou ter habilidades técnicas especiais. Se você puder divulgar seu projeto, muitos bilíngues provavelmente ficarão interessados ​​em se envolver.

**Olhando para dentro da sua comunidade –** A maioria dos projetos nesse espaço já conta com comunidades grandes e ativas. Muitos membros da sua comunidade provavelmente apreciariam a oportunidade de contribuir com o projeto de uma forma simples.

Embora contribuir para projetos de código aberto geralmente se baseie na motivação intrínseca, também é uma experiência de aprendizado fantástica. Qualquer pessoa interessada em aprender mais sobre seu projeto provavelmente ficaria feliz em se envolver em um programa de tradução como voluntário, pois isso lhe permitiria combinar o fato de ter contribuído para algo que lhe interessa com uma experiência intensiva de aprendizado prático.

**Mencione a iniciativa em seu produto –** Se seu produto for popular e usado por um grande número de pessoas, destacar seu programa de tradução e chamar os usuários para ação enquanto usam o produto pode ser extremamente eficaz.

Isso pode ser tão simples quanto adicionar um banner ou pop-up com um CTA ao seu produto para aplicativos e sites. Isso é eficaz porque seu público-alvo é sua comunidade — as pessoas que têm maior probabilidade de se envolver em primeiro lugar.

**Mídias sociais –** As mídias sociais podem ser uma forma eficaz de divulgar seu programa de tradução e alcançar os membros da sua comunidade, bem como outras pessoas que ainda não são membros da sua comunidade.

Se você tem um servidor Discord ou um canal do Telegram, é fácil usá-lo para divulgação, comunicação com seus tradutores e reconhecimento de seus colaboradores.

Plataformas como o X (antigo Twitter) também podem ser úteis para integrar novos membros da comunidade e reconhecer publicamente seus contribuidores.

A Linux Foundation criou um extenso [Relatório sobre a pesquisa de contribuidores FOSS de 2020](https://www.linuxfoundation.org/wp-content/uploads/2020FOSSContributorSurveyReport_121020.pdf), analisando os contribuidores de código aberto e suas motivações.

## Conclusão {#conclusion}

Este documento contém algumas considerações importantes que todo programa de tradução deve saber. Não é de forma alguma um guia exaustivo, embora possa ajudar qualquer pessoa sem experiência no setor de tradução a organizar um programa de tradução para seu projeto.

Se você estiver procurando por instruções mais detalhadas e análises de diferentes ferramentas, processos e aspectos críticos do gerenciamento de um programa de tradução, alguns dos maiores provedores de serviços de idiomas mantêm blogs e frequentemente publicam artigos sobre diferentes aspectos do processo de localização. Estes são os melhores recursos se você quiser se aprofundar em qualquer um dos tópicos acima e entender como o processo de localização funciona profissionalmente.

Alguns links relevantes estão incluídos no final de cada seção; no entanto, você pode encontrar muitos outros recursos online.

Para propostas de cooperação ou informações adicionais, aprendizados e melhores práticas que adquirimos ao manter o Programa de Tradução do ethereum.org, sinta-se à vontade para entrar em contato conosco pelo e-mail translations@ethereum.org.
