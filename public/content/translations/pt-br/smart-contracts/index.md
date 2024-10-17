---
title: Contratos inteligentes
description: Uma introdução não técnica aos contratos inteligentes
lang: pt-br
---

# Introdução aos contratos inteligentes {#introduction-to-smart-contracts}

Os contratos inteligentes são os elementos fundamentais da camada de aplicativos Ethereum. Estes são programas de computador armazenados na [blockchain](/glossary/#blockchain) que seguem a lógica “se não isso, então aquilo” e têm a garantia de que serão executados de acordo com as regras definidas por seu código, que não pode ser alterado depois de criado.

Nick Szabo cunhou o termo "contrato inteligente". Em 1994, ele escreveu [uma introdução ao conceito](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html) e, em 1996, [uma análise sobre o que os contratos inteligentes poderiam fazer](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Szabo imaginou um mercado digital em que processos automáticos e [protegidos com criptografia](/glossary/#cryptography) permitem que transações e funções comerciais aconteçam sem intermediários confiáveis. Os contratos inteligentes no Ethereum colocam em prática essa visão.

Assista à explicação de contratos inteligentes disponibilizada pelo canal Finematics:

<YouTube id="pWGLtjG-F5c" />

## Confiança em contratos convencionais {#trust-and-contracts}

Um dos maiores problemas de um contrato tradicional é a necessidade de se ter indivíduos confiáveis para acompanhar os resultados do contrato.

Exemplo:

Alice e Bob estão fazendo uma corrida de bicicleta. Digamos que Alice aposte R$ 10 com Bob que ela vencerá corrida. Bob está confiante que será o vencedor e aceita a aposta. No final, Alice termina a corrida bem à frente de Bob e vence. Mas Bob se recusa a pagar a aposta, alegando que Alice deve ter trapaceado.

Esse exemplo ilustra o problema com qualquer contrato não inteligente. Mesmo que as condições do contrato sejam cumpridas (ou seja, você é o vencedor da corrida), você ainda precisa confiar que a outra pessoa cumprirá o contrato (ou seja, pagar a aposta).

## Uma máquina de vendas digitais {#vending-machine}

Uma metáfora simples de um contrato inteligente é como se fosse uma máquina de venda automática, que funciona de forma semelhante a um contrato inteligente – você insere algo específico e isso garante um produto predeterminado.

- Você seleciona um produto
- A máquina de venda automática mostra o preço
- Você paga o preço
- A máquina de venda automática confirma que você pagou o valor correto
- A máquina de venda automática entrega o item comprado

A máquina de venda automática só entregará o produto após o cumprimento de todas as exigências. Se você não selecionar um produto ou não inserir dinheiro suficiente, a máquina de venda automática não entrega o produto.

## Execução automática {#automation}

O principal benefício de um contrato inteligente é que ele executa, de maneira determinística, um código inequívoco quando determinadas condições são atendidas. Não há necessidade de esperar que um ser humano interprete ou negocie o resultado. Isso elimina a necessidade de intermediários confiáveis.

Por exemplo, você pode redigir um contrato inteligente que mantenha fundos em depósito para uma criança e que permitirá que ela retire os fundos após uma data específica. Se a criança tentar retirar os fundos antes dessa data, o contrato inteligente não permitirá. Ou você pode redigir um contrato que entrega automaticamente uma versão digital do documento de propriedade de um carro assim que você pagar o valor à concessionária.

## Resultados previsíveis {#predictability}

Os contratos tradicionais são ambíguos porque dependem de seres humanos para interpretá-los e implementá-los. Por exemplo, dois juízes podem interpretar um contrato de forma diferente, o que pode resultar na tomada de decisões incoerentes e resultados desproporcionais. Os contratos inteligentes eliminar essa possibilidade. Em vez disso, os contratos inteligentes são executados precisamente com base nas condições escritas no código do contrato. Essa exatidão significa que, se as circunstâncias forem idênticas, o contrato inteligente produzirá o mesmo resultado.

## Registro público {#public-record}

Os contratos inteligentes são úteis para auditorias e rastreamento. Como os contratos inteligentes do Ethereum estão em um blockchain público, qualquer pessoa pode rastrear instantaneamente as transferências de ativos e outras informações relacionadas. Por exemplo, você pode verificar se alguém enviou fundos para o seu endereço.

## Proteção de privacidade {#privacy-protection}

Os contratos inteligentes também protegem a sua privacidade. Como o Ethereum é uma rede pseudônima (as suas transações são vinculadas publicamente a um único endereço criptográfico, não à sua identidade), você pode proteger a sua privacidade de observadores.

## Termos visíveis {#visible-terms}

Por último, como os contratos tradicionais, você pode verificar o conteúdo de um contrato inteligente antes de assiná-lo (ou interagir com ele de outra forma). A transparência de um contrato inteligente garante que qualquer pessoa pode analisar o conteúdo.

## Casos de uso de contrato inteligente {#use-cases}

Os contratos inteligentes podem fazer essencialmente qualquer coisa que os programas informáticos podem fazer.

Eles podem realizar cálculos, criar moeda, armazenar dados, cunhar [NFTs](/glossary/#nft), enviar comunicações e até mesmo gerar gráficos. Apresentamos alguns exemplos reais e populares:

- [Stablecoins](/stablecoins/)
- [Criação e distribuição de ativos digitais únicos](/nft/)
- [Uma negociação de moeda automática e aberta](/get-eth/#dex)
- [Jogos descentralizados](/dapps/?category=gaming#explore)
- [Uma apólice de seguro que paga automaticamente](https://etherisc.com/)
- [Um padrão que permite que pessoas criem moedas personalizadas e interoperáveis](/developers/docs/standards/tokens/)

## Leitura adicional {#further-reading}

- [Como os Contratos Inteligentes irão mudar o mundo](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Contratos Inteligentes: A Tecnologia Blockchain que substituirá os Advogados](https://blockgeeks.com/guides/smart-contracts/)
- [Contratos inteligentes para desenvolvedores](/developers/docs/smart-contracts/)
- [Aprenda a escrever contratos inteligentes](/developers/learning-tools/)
- [Dominando o Ethereum – O que é um Contrato Inteligente?](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
