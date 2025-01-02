---
title: Canais de estado
description: Uma introdução aos canais de estado e canais de pagamento como uma solução de dimensionamento atualmente utilizada pela comunidade Ethereum.
lang: pt-br
sidebarDepth: 3
---

Os canais de estado permitem que os participantes transacionem com segurança off-chain, com o mínimo de interação com a rede principal do Ethereum. Os peers do canal podem conduzir um número arbitrário de transações off-chain enquanto enviam apenas duas transações on-chain para abrir e fechar o canal. Isso permite uma taxa de transferência de transação extremamente alta e resulta em custos mais baixos para os usuários.

##  {#how-do-sidechains-work}

Blockchains públicas, como Ethereum, enfrentam desafios de dimensionamento devido à sua arquitetura distribuída: onde as transações on-chain devem ser executadas por todos os nós. Os nós devem ser capazes de lidar com o volume de transações em um bloco usando hardware modesto, impondo um limite na taxa de transferência da transação para manter a rede descentralizada.

###  {#consensus-algorithms}

Os canais são simples protocolos ponto a ponto que permitem que duas partes façam muitas transações entre si e depois publiquem apenas os resultados finais na blockchain. O canal usa criptografia para demonstrar que os dados de resumo gerados são realmente o resultado de um conjunto válido de transações intermediárias. Um contrato inteligente ["multisig"](/developers/docs/smart-contracts/#multisig) garante que as transações sejam assinadas pelas partes corretas.

- []()
- []()
-

Com os canais, as mudanças de estado são executadas e validadas pelas partes interessadas, minimizando a computação na camada de execução do Ethereum. Isso diminui o congestionamento no Ethereum e também aumenta a velocidade de processamento de transações para os usuários.

####  {#block-parameters}

Cada canal é gerenciado por um [contrato inteligente multisig](/developers/docs/smart-contracts/#multisig) em execução no Ethereum. Para abrir um canal, os participantes implantam o contrato de canal on-chain e depositam fundos nele.

Para fechar o canal, os participantes submetem o último estado acordado do canal on-chain. Em seguida, o contrato inteligente distribui os fundos bloqueados de acordo com o saldo de cada participante no estado final do canal.

Os canais ponto a ponto são particularmente úteis para situações em que alguns participantes predefinidos desejam realizar transações com alta frequência sem incorrer em sobrecarga visível. Os canais da blockchain se enquadram em duas categorias: **canais de pagamento** e **canais de estado**.

###  {#evm-compatibility}

Um canal de pagamento é melhor descrito como um "livro de duas vias" mantido coletivamente por dois usuários. O saldo inicial do livro é a soma dos depósitos bloqueados no contrato on-chain durante a fase de abertura do canal.

As atualizações no saldo do livro (ou seja, o estado do canal de pagamento) requerem a aprovação de todas as partes do canal. Uma atualização de canal, assinada por todos os participantes do canal, é considerada finalizada, assim como uma transação no Ethereum.

Os canais de pagamento estavam entre as primeiras soluções de dimensionamento projetadas para minimizar atividades caras on-chain, em interações simples do usuário (por exemplo, transferências ETH, atomic swaps, micropagamentos). Os participantes do canal podem conduzir uma quantidade ilimitada de instâncias, transações sem valor entre si, desde que a soma líquida de suas transferências não exceda os tokens depositados.

Além de oferecer suporte a pagamentos off-chain, os canais de pagamento não têm se mostrado úteis para lidar com a lógica geral de transição de estado. Os canais de estado foram criados para resolver esse problema e torná-los úteis para dimensionar a computação de propósito geral.

###  {#asset-movement}

Os canais de estado ainda têm muito em comum com os canais de pagamento. Por exemplo, os usuários interagem através da troca de mensagens (transações) assinadas criptograficamente, que os outros participantes do canal também devem assinar. Se uma proposta de atualização de estado não for assinada por todos os participantes, ela não será válida.

##  {#pros-and-cons-of-sidechains}

|  |  |
|  |  |
|  |  |
|  |  |
|  |  |
|  |  |

###  {#use-sidechains}

- []()
- []()
- []()
- []()
- []()

##  {#further-reading}

-

_ _
