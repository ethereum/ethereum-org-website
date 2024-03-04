---
title: Contratos inteligentes
description: Uma introdução não técnica aos contratos inteligentes
lang: pt
---

# Introduction to smart contracts {#introduction-to-smart-contracts}

Os Contratos inteligentes são os blocos fundamentais na construção da camada aplicacional de Ethereum. São programas de computador gravados no “blockchain” que segue a lógica "se isto, então aquilo", e é garantido que executem conforme as regras definidas no seu código, que não podem ser alteradas, uma vez que o programa tenha sido criado.

Nick Szabo criou o termo "contrato inteligente". Em 1994, ele escreveu [, uma introdução ao conceito](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html), e em 1996 escreveu [, uma reflexão do que os contratos inteligentes conseguiam fazer](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Szabo imaginou um mercado digital onde os processos automáticos e criptograficamente seguros permitem que as transações e as funções comerciais ocorram sem intermediários de confiança. Os contratos inteligentes no Ethereum põem em prática esta visão.

## Confiança em contratos convencionais {#trust-and-contracts}

Um dos principais problemas de um contrato tradicional é a necessidade de indivíduos de confiança cumprirem os requisitos do contrato.

Eis um exemplo:

A Alice e o Bob irão participar numa corrida de bicicletas. Digamos que a Alice aposta com o Bob €10 que vai ganhar a corrida. Bob está confiante de que será o vencedor e aceita a aposta. No final, Alice termina a corrida bem à frente de Bob e é a clara vencedora. Mas Bob recusa-se a pagar a aposta, alegando que Alice deve ter feito batota.

Este exemplo absurdo ilustra o problema de qualquer acordo não inteligente. Mesmo que as condições do acordo sejam cumpridas (ou seja, se for o vencedor da corrida), tem de confiar na outra pessoa para cumprir o acordo (ou seja, pagar a aposta).

## A digital vending machine {#vending-machine}

Uma metáfora simples para um contrato inteligente é uma máquina de venda automática, que funciona de forma semelhante a um contrato inteligente - entradas específicas garantem saídas pré-determinadas.

- Seleciona um produto
- A máquina de venda automática apresenta o preço
- Você paga o montante
- A máquina de venda automática verifica se introduziu a quantidade certa
- A maquina de venda automática entrega o seu artigo

A máquina de venda automática só distribuirá o produto desejado após cumpridos todos os requisitos. Se não selecionar um produto ou se não inserir dinheiro suficiente, a máquina de venda automática não lhe fornecerá o produto.

## Execução automática {#automation}

A principal vantagem de um contrato inteligente é o facto de executar de forma determinística um código inequívoco quando determinadas condições são cumpridas. Não é necessário esperar que um humano avalie ou negoceie o resultado pretendido. Isto remove a necessidade de intermediários de confiança.

Por exemplo, pode criar um contrato inteligente que mantenha fundos em depósito para uma criança, permitindo-lhe levantar os fundos após uma data específica. Se tentarem levantar os fundos antes da data, o contrato inteligente não será executado. Ou então, poderia criar um contrato que lhe desse automaticamente uma versão digital do registo de propriedade automóvel, após pagar ao vendedor.

## Resultados previsíveis {#predictability}

Os Contratos tradicionais são ambíguos porque eles dependem de humanos para interpretá-los e implementá-los. Por exemplo, dois juízes podem interpretar um contrato de forma diferente, o que poderia levar a decisões inconsistentes e resultados diferentes. Os contratos inteligentes removem esta possibilidade. Em vez disso, os contratos inteligentes são executados precisamente com base nas condições escritas no código do contrato. Esta precisão significa que, dadas as mesmas circunstâncias, o contrato inteligente produzirá sempre o mesmo resultado.

## Registo público {#public-record}

Os contratos inteligentes são úteis para auditorias e monitorização. Uma vez que os contratos inteligentes Ethereum estão numa blockchain pública, qualquer pessoa pode acompanhar instantaneamente as transferências de ativos e outras informações relacionadas. Por exemplo, pode verificar se alguém enviou dinheiro para o seu endereço.

## Proteção da privacidade {#privacy-protection}

Os contratos inteligentes também protegem a sua privacidade. Uma vez que o Ethereum é uma rede pseudónima (as suas transações estão ligadas publicamente a um endereço criptográfico único, não à sua identidade), pode proteger a sua privacidade dos curiosos.

## Condições visíveis {#visible-terms}

Por último, tal como nos contratos tradicionais, é possível verificar o conteúdo de um contrato inteligente antes de o assinar (ou de interagir com ele). A transparência de um contrato inteligente garante que qualquer pessoa o pode examinar.

## Exemplos de utilização de contratos inteligentes {#use-cases}

Os contratos inteligentes podem fazer, essencialmente, tudo o que os programas informáticos fazem.

Podem efetuar cálculos, criar divisas, armazenar dados, cunhar NFTs, enviar comunicações e até gerar gráficos. Seguem-se alguns exemplos populares e reais:

- [Stablecoins](/stablecoins/)
- [Criar e distribuir ativos digitais únicos](/nft/)
- [Um câmbio de moeda aberto e automático](/get-eth/#dex)
- [Jogos descentralizados](/dapps/?category=gaming)
- [Uma apólice de seguro que reembolsa automaticamente](https://etherisc.com/)
- [Uma norma que permite criar divisas personalizadas e interoperáveis](/developers/docs/standards/tokens/)

## More of a visual learner? {#visual-learner}

Veja a Finematics a explicar os contratos inteligentes:

<YouTube id="pWGLtjG-F5c" />

## Leitura adicional {#further-reading}

- [Como os contratos inteligentes vão mudar o mundo](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Contratos inteligentes: A tecnologia Blockchain que vai substituir os advogados](https://blockgeeks.com/guides/smart-contracts/)
- [Contratos inteligentes para programadores](/developers/docs/smart-contracts/)
- [Aprenda a criar contratos inteligentes](/developers/learning-tools/)
- [Dominar o Ethereum - O que é um contrato inteligente?](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
