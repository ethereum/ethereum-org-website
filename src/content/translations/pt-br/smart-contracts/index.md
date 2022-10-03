---
title: Contratos inteligentes
description: Uma introdução não técnica aos contratos inteligentes
lang: pt-br
---

# Introdução aos contratos inteligentes {#introduction-to-smart-contracts}

Os contratos inteligentes são os blocos fundamentais de construção de [aplicativos Ethereum](/dapps/). Eles são programas de computadores armazenados no blockchain que nos permite converter contratos tradicionais em contratos paralelos digitais. Os contratos inteligentes são muitos lógicos — seguindo a estrutura condicional "If This Hena That" (se isso acontecer, então faça aquilo). Isso significa que eles se comportam exatamente como programado e que não podem ser alterados.

Nick Szabo cunhou o termo "contrato inteligente". Em 1994, ele escreveu [uma introdução ao conceito](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html) e, em 1996, [uma exploração do que os contratos inteligentes poderiam fazer](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Nick Szabo previu um mercado digital construído sobre estes processos automáticos, criptograficamente seguros. Um lugar onde transações e funções de negócio podem acontecer de forma confiável — sem intermediários. Contratos inteligentes no Ethereum colocam esta visão em prática.

## O que são contratos? {#what-are-contracts}

Você provavelmente está pensando: _"Não sou advogado! Por que eu deveria me importar com contratos?"_. Para a maioria das pessoas, os contratos trazem consigo acordo de termos ou condições desnecessariamente longas ou documentos legalmente monótonos.

Contratos são meros acordos. Ou seja, qualquer forma de acordo pode ser encapsulada nas condições de um contrato. Acordos verbais ou contratos de papel e caneta são aceitáveis para muitas coisas, mas eles não são isentos de falhas.

### Confiança e contratos {#trust-and-contracts}

Um dos maiores problemas com um contrato tradicional é a necessidade de indivíduos confiáveis seguirem com os resultados do contrato.

Veja um exemplo:

Alice e Bob estão em uma corrida de bicicleta. Digamos que Alice aposte R$ 10 com Bob que ela vai ganhar a corrida. Bob está confiante que ele será o vencedor e aceita a aposta. No final, Alice termina a corrida bem à frente de Bob e é a vencedora. Mas Bob recusa-se a pagar a aposta, alegando que Alice deve ter trapaceado.

Este exemplo bobo ilustra o problema com qualquer acordo não inteligente. Mesmo que as condições do acordo sejam cumpridas (ou seja, você é o vencedor da corrida), você ainda deve confiar na outra pessoa para cumprir o acordo (ou seja, o pagamento da aposta).

## Contratos inteligentes {#smart-contracts}

Os contratos inteligentes digitalizam acordos transformando os termos de um acordo em código de computador executado automaticamente quando os termos do contrato são cumpridos.

### Uma máquina de vendas digitais {#vending-machine}

Uma metáfora simples para um contrato inteligente é uma máquina de venda, que funciona de maneira como um contrato inteligente – entradas específicas garantem saídas predeterminadas.

- Você seleciona um produto
- A máquina de venda retorna a quantidade necessária para comprar o produto
- Você insere o valor correto
- A máquina de venda verifica se você inseriu o valor correto
- A máquina de venda dispensa o produto escolhido

A máquina de venda só dispensará o seu produto desejado depois que todos os requisitos forem atendidos. Se você não selecionar um produto ou inserir dinheiro suficiente, a máquina de venda não vai entregar o seu produto.

### Execução automática {#automation}

Um dos benefícios mais significativos que os contratos inteligentes têm sobre contratos comuns é o resultado ser executado automaticamente quando a condição do contrato é cumprida. Não há necessidade de esperar que um humano execute o resultado. Em outras palavras: contratos inteligentes eliminam a necessidade de confiança.

Por exemplo, você poderia escrever um contrato inteligente que retenha fundos em caução para uma criança, permitindo que ela retire fundos após uma data específica. Se eles tentarem retirar os fundos antes da data especificada, o contrato inteligente não será executado. Ou, você poderia escrever um contrato que dá automaticamente a você uma versão digital do documento de propriedade de um carro quando você paga o vendedor.

### Resultados previsíveis {#predictability}

O fator humano é um dos maiores pontos de falha com contratos tradicionais. Por exemplo, dois juízes individuais podem interpretar um contrato tradicional de maneiras diferentes. Suas interpretações poderiam levar a diferentes decisões sendo tomadas e a resultados diferentes. Contratos inteligentes eliminam a possibilidade de diferentes interpretações. Ao invés disso, contratos inteligentes executam precisamente com base nas condições escritas no código do contrato. Esta precisão significa que, dada as mesmas circunstâncias, o contrato inteligente produzirá o mesmo resultado.

### Registro público {#public-record}

Contratos inteligentes são úteis também para auditoria e rastreamento. Como os contratos inteligentes do Ethereum estão em um blockchain público, qualquer um pode rastrear instantaneamente as transferências de ativos e outras informações relacionadas. Você pode verificar se alguém enviou dinheiro para seu endereço, por exemplo.

### Proteção de privacidade {#privacy-protection}

Contratos inteligentes também podem proteger sua privacidade. Uma vez que o Ethereum é uma rede pseudônima (suas transações são ligadas publicamente a um único endereço criptográfico, não sua identidade), você pode proteger sua privacidade de observadores.

### Termos visíveis {#visible-terms}

Por fim, tal como os contratos, você pode verificar o que está em um contrato inteligente antes de assiná-lo (ou de outra forma, interagir com ele). Melhor ainda, a transparência pública dos termos do contrato significa que qualquer pessoa pode examiná-lo.

## Casos de uso de contrato inteligente {#use-cases}

Assim sendo, contratos inteligentes são programas de computador que vivem no blockchain. Eles podem executar automaticamente. Você pode rastrear suas transações, prever como elas agem e até mesmo usá-las sob pseudônimo. Isso é legal. Mas para que eles servem? Bem, os contratos ininteligentes podem fazer essencialmente qualquer coisa que outros programas de computador fazem.

Eles podem realizar computações, criar moedas, armazenar dados, criar NFTs, enviar comunicados e até mesmo gerar gráficos. Aqui estão alguns exemplos populares, do mundo real:

- [Stablecoins](/stablecoins/)
- [Criação e distribuição de ativos digitais únicos](/nft/)
- [Uma troca de moeda automática e aberta](/get-eth/#dex)
- [Jogos descentralizados](/dapps/?category=gaming)
- [Uma apólice de seguro que paga automaticamente](https://etherisc.com/)
- [Um padrão que permite que pessoas criem moedas personalizadas e interoperáveis](/developers/docs/standards/tokens/)

## Você é o tipo de pessoa que aprende mais com recursos visuais? {#visual-learner}

Assista ao Finematics explicando contratos inteligentes:

<YouTube id="pWGLtjG-F5c" />

## Leia mais {#further-reading}

- [Como os Contratos Inteligentes irão mudar o mundo](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Contratos Inteligentes: A Tecnologia Blockchain que substituirá os Advogados](https://blockgeeks.com/guides/smart-contracts/)
- [Contratos inteligentes para desenvolvedores](/developers/docs/smart-contracts/)
- [Aprenda a escrever contratos inteligentes](/developers/learning-tools/)
- [Dominando o Ethereum – O que é um Contrato Inteligente?](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
