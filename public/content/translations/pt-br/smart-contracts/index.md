---
title: Introdução aos contratos inteligentes
metaTitle: "Contratos inteligentes: O que são e seus benefícios"
description: Uma introdução não técnica aos contratos inteligentes
lang: pt-br
---

Os contratos inteligentes são os blocos de construção fundamentais da camada de aplicativos do [Ethereum](/). Eles são programas de computador armazenados na [blockchain](/glossary/#blockchain) que seguem a lógica "se isso, então aquilo" (if this then that), e têm a garantia de serem executados de acordo com as regras definidas por seu código, que não pode ser alterado depois de criado.

Nick Szabo cunhou o termo "contrato inteligente". Em 1994, ele escreveu [uma introdução ao conceito](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html) e, em 1996, escreveu [uma exploração do que os contratos inteligentes poderiam fazer](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Szabo imaginou um mercado digital onde processos automáticos e [criptograficamente seguros](/glossary/#cryptography) permitem que transações e funções de negócios ocorram sem intermediários de confiança. Os contratos inteligentes no Ethereum colocam essa visão em prática.

Assista ao Finematics explicando os contratos inteligentes:

<VideoWatch slug="smart-contracts-code-is-law" />

## Confiança em contratos convencionais {#trust-and-contracts}

Um dos maiores problemas com um contrato tradicional é a necessidade de indivíduos de confiança para dar seguimento aos resultados do contrato.

Aqui está um exemplo:

Alice e Bob estão participando de uma corrida de bicicleta. Digamos que Alice aposte US$ 10 com Bob que ela vencerá a corrida. Bob está confiante de que será o vencedor e concorda com a aposta. No final, Alice termina a corrida bem à frente de Bob e é a vencedora clara. Mas Bob se recusa a pagar a aposta, alegando que Alice deve ter trapaceado.

Este exemplo bobo ilustra o problema com qualquer acordo que não seja inteligente. Mesmo que as condições do acordo sejam atendidas (ou seja, você é o vencedor da corrida), você ainda deve confiar em outra pessoa para cumprir o acordo (ou seja, pagar a aposta).

## Uma máquina de venda automática digital {#vending-machine}

Uma metáfora simples para um contrato inteligente é uma máquina de venda automática, que funciona de forma um pouco semelhante a um contrato inteligente - entradas específicas garantem saídas predeterminadas.

- Você seleciona um produto
- A máquina de venda automática exibe o preço
- Você paga o preço
- A máquina de venda automática verifica se você pagou o valor correto
- A máquina de venda automática entrega o seu item

A máquina de venda automática só dispensará o produto desejado depois que todos os requisitos forem atendidos. Se você não selecionar um produto ou não inserir dinheiro suficiente, a máquina de venda automática não entregará o seu produto.

## Execução automática {#automation}

O principal benefício de um contrato inteligente é que ele executa deterministicamente um código inequívoco quando certas condições são atendidas. Não há necessidade de esperar que um humano interprete ou negocie o resultado. Isso remove a necessidade de intermediários de confiança.

Por exemplo, você poderia escrever um contrato inteligente que mantém fundos em custódia (escrow) para uma criança, permitindo que ela retire os fundos após uma data específica. Se ela tentar retirar antes dessa data, o contrato inteligente não será executado. Ou você poderia escrever um contrato que lhe dê automaticamente uma versão digital do título de um carro quando você pagar ao revendedor.

## Resultados previsíveis {#predictability}

Os contratos tradicionais são ambíguos porque dependem de humanos para interpretá-los e implementá-los. Por exemplo, dois juízes podem interpretar um contrato de forma diferente, o que pode levar a decisões inconsistentes e resultados desiguais. Os contratos inteligentes removem essa possibilidade. Em vez disso, os contratos inteligentes são executados com precisão com base nas condições escritas no código do contrato. Essa precisão significa que, dadas as mesmas circunstâncias, o contrato inteligente produzirá o mesmo resultado.

## Registro público {#public-record}

Os contratos inteligentes são úteis para auditorias e rastreamento. Como os contratos inteligentes do Ethereum estão em uma blockchain pública, qualquer pessoa pode rastrear instantaneamente transferências de ativos e outras informações relacionadas. Por exemplo, você pode verificar se alguém enviou dinheiro para o seu endereço.

## Proteção de privacidade {#privacy-protection}

Os contratos inteligentes também protegem sua privacidade. Como o Ethereum é uma rede pseudônima (suas transações estão vinculadas publicamente a um endereço criptográfico exclusivo, não à sua identidade), você pode proteger sua privacidade de observadores.

## Termos visíveis {#visible-terms}

Por fim, assim como nos contratos tradicionais, você pode verificar o que há em um contrato inteligente antes de assiná-lo. Ao contrário de um contrato tradicional, a transparência onchain de um contrato inteligente permite que qualquer pessoa o examine e revise antes de interagir com ele. 

No entanto, embora qualquer pessoa possa visualizar os termos de um contrato inteligente, os dados brutos da transação são projetados para serem interpretados por aplicativos e carteiras, não por humanos. Como esses dados são muito difíceis de ler, os usuários frequentemente enfrentam um grande risco de segurança chamado "assinatura cega" (blind signing), ou seja, aprovar uma transação que interage com um contrato inteligente sem realmente entender o que ela fará. 

O ecossistema Ethereum está em transição para os padrões de **[Assinatura Clara](https://clearsigning.org/)** (Clear Signing) (especificamente o [ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)). A Assinatura Clara traduz dados opacos de contratos inteligentes em descrições de transações simples e legíveis por humanos, garantindo que qualquer pessoa possa entender a verdadeira intenção de um contrato antes de assinar.

## Casos de uso de contratos inteligentes {#use-cases}

Os contratos inteligentes podem fazer essencialmente qualquer coisa que os programas de computador podem fazer.

Eles podem realizar cálculos, criar moedas, armazenar dados, cunhar [NFTs](/glossary/#nft), enviar comunicações e até mesmo gerar gráficos. Aqui estão alguns exemplos populares do mundo real:

- [Stablecoins](/stablecoins/)
- [Criação e distribuição de ativos digitais exclusivos](/nft/)
- [Uma casa de câmbio automática e aberta](/get-eth/#dex)
- [Jogos descentralizados](/apps/categories/gaming)
- [Uma apólice de seguro que paga automaticamente](https://etherisc.com/)
- [Um padrão que permite às pessoas criar moedas personalizadas e interoperáveis](/developers/docs/standards/tokens/)

## Leitura adicional {#further-reading}

- [Como os contratos inteligentes mudarão o mundo](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Contratos inteligentes para desenvolvedores](/developers/docs/smart-contracts/)
- [Aprenda a escrever contratos inteligentes](/developers/learning-tools/)
- [Dominando o Ethereum - O que é um contrato inteligente?](https://github.com/ethereumbook/ethereumbook/blob/openedition/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)

<Divider />

<QuizWidget quizKey="smart-contracts" />