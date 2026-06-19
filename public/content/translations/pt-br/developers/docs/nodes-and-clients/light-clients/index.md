---
title: Clientes leves
description: Introdução aos clientes leves do Ethereum.
lang: pt-br
---

Executar um nó completo é a maneira mais sem necessidade de confiança, privada, descentralizada e resistente à censura de interagir com o [Ethereum](/). Com um nó completo, você mantém sua própria cópia da blockchain que pode consultar instantaneamente e obtém acesso direto à rede ponto a ponto do Ethereum. No entanto, executar um nó completo exige uma quantidade significativa de memória, armazenamento e CPU. Isso significa que não é viável para todos executarem seu próprio nó. Existem várias soluções para isso no roteiro do Ethereum, incluindo a ausência de estado, mas elas estão a vários anos de serem implementadas. A resposta a curto prazo é abrir mão de alguns dos benefícios de executar um nó completo em troca de grandes melhorias de desempenho que permitem que os nós sejam executados com requisitos de hardware muito baixos. Os nós que fazem essa troca são conhecidos como nós leves.

## O que é um cliente leve {#what-is-a-light-client}

Um nó leve é um nó executando um software de cliente leve. Em vez de manter cópias locais dos dados da blockchain e verificar independentemente todas as alterações, eles solicitam os dados necessários de algum provedor. O provedor pode ser uma conexão direta com um nó completo ou por meio de algum servidor RPC centralizado. Os dados são então verificados pelo nó leve, permitindo que ele acompanhe a cabeça da cadeia. O nó leve processa apenas os cabeçalhos do bloco, baixando apenas ocasionalmente o conteúdo real do bloco. Os nós podem variar em sua leveza, dependendo das combinações de software de cliente leve e completo que executam. Por exemplo, a configuração mais leve seria executar um cliente de execução leve e um cliente de consenso leve. Também é provável que muitos nós optem por executar clientes de consenso leves com clientes de execução completos, ou vice-versa.

## Como funcionam os clientes leves? {#how-do-light-clients-work}

Quando o Ethereum começou a usar um mecanismo de consenso baseado em Prova de Participação (PoS), uma nova infraestrutura foi introduzida especificamente para dar suporte a clientes leves. A forma como funciona é selecionando aleatoriamente um subconjunto de 512 validadores a cada 1,1 dias para atuar como um **comitê de sincronização**. O comitê de sincronização assina o cabeçalho de blocos recentes. Cada cabeçalho do bloco contém a assinatura agregada dos validadores no comitê de sincronização e um "campo de bits" (bitfield) que mostra quais validadores assinaram e quais não. Cada cabeçalho também inclui uma lista de validadores que devem participar da assinatura do próximo bloco. Isso significa que um cliente leve pode ver rapidamente que o comitê de sincronização aprovou os dados que recebe, e também pode verificar se o comitê de sincronização é o genuíno, comparando o que recebe com o que foi informado a esperar no bloco anterior. Dessa forma, o cliente leve pode continuar atualizando seu conhecimento do bloco mais recente do Ethereum sem realmente baixar o bloco em si, apenas o cabeçalho que contém informações resumidas.

Na camada de execução, não há uma especificação única para um cliente de execução leve. O escopo de um cliente de execução leve pode variar de um "modo leve" de um cliente de execução completo que tem toda a funcionalidade da EVM e de rede de um nó completo, mas apenas verifica os cabeçalhos do bloco, sem baixar os dados associados, ou pode ser um cliente mais simplificado que depende fortemente do encaminhamento de solicitações a um provedor RPC para interagir com o Ethereum.

## Por que os clientes leves são importantes? {#why-are-light-clients-important}

Os clientes leves são importantes porque permitem que os usuários verifiquem os dados recebidos em vez de confiar cegamente que seu provedor de dados está correto e honesto, enquanto usam apenas uma pequena fração dos recursos computacionais de um nó completo. Os dados que os clientes leves recebem podem ser verificados em relação aos cabeçalhos do bloco que eles sabem que foram assinados por pelo menos 2/3 de um conjunto aleatório de 512 validadores do Ethereum. Esta é uma evidência muito forte de que os dados estão corretos.

O cliente leve usa apenas uma pequena quantidade de poder de computação, memória e armazenamento, de modo que pode ser executado em um telefone celular, incorporado em um aplicativo ou como parte de um navegador. Os clientes leves são uma maneira de tornar o acesso minimizado em confiança ao Ethereum tão sem atrito quanto confiar em um provedor terceirizado.

Vamos pegar um exemplo simples. Imagine que você queira verificar o saldo da sua conta. Para fazer isso, você deve fazer uma solicitação a um nó do Ethereum. Esse nó verificará sua cópia local do estado do Ethereum em busca do seu saldo e o retornará a você. Se você não tiver acesso direto a um nó, existem operadores centralizados que fornecem esses dados como um serviço. Você pode enviar uma solicitação a eles, eles verificam seu nó e enviam o resultado de volta para você. O problema com isso é que você tem que confiar que o provedor está lhe dando as informações corretas. Você nunca pode realmente saber se a informação está correta se não puder verificá-la por si mesmo.

Um cliente leve resolve esse problema. Você ainda solicita dados de algum provedor externo, mas quando recebe os dados de volta, eles vêm com uma prova que seu nó leve pode verificar em relação às informações que recebeu no cabeçalho do bloco. Isso significa que o Ethereum está verificando a exatidão dos seus dados em vez de algum operador confiável.

## Quais inovações os clientes leves possibilitam? {#what-innovations-do-light-clients-enable}

O principal benefício dos clientes leves é permitir que mais pessoas acessem o Ethereum de forma independente, com requisitos de hardware insignificantes e dependência mínima de terceiros. Isso é bom para os usuários porque eles podem verificar seus próprios dados e é bom para a rede porque aumenta o número e a diversidade de nós que estão verificando a cadeia.

A capacidade de executar nós do Ethereum em dispositivos com armazenamento, memória e poder de processamento muito pequenos é uma das principais áreas de inovação desbloqueadas pelos clientes leves. Enquanto hoje os nós do Ethereum exigem muitos recursos de computação, os clientes leves poderiam ser incorporados em navegadores, executados em telefones celulares e talvez até em dispositivos menores, como relógios inteligentes. Isso significa que as carteiras do Ethereum com clientes incorporados poderiam ser executadas em um telefone celular. Isso significa que as carteiras móveis poderiam ser muito mais descentralizadas, pois não teriam que confiar em provedores de dados centralizados para seus dados.

Uma extensão disso é a habilitação de dispositivos da **internet das coisas (IoT)**. Um cliente leve poderia ser usado para provar rapidamente a propriedade de algum saldo de token ou NFT, com todas as garantias de segurança fornecidas pelos comitês de sincronização, acionando alguma ação em uma rede IoT. Imagine um [serviço de aluguel de bicicletas](https://youtu.be/ZHNrAXf3RDE?t=929) que usa um aplicativo com um cliente leve incorporado para verificar rapidamente se você possui o NFT do serviço de aluguel e, em caso afirmativo, desbloqueia uma bicicleta para você sair pedalando!

Os rollups do Ethereum também se beneficiariam de clientes leves. Um dos grandes problemas para os rollups têm sido os ataques direcionados às pontes que permitem a transferência de fundos da Rede Principal do Ethereum para um rollup. Uma vulnerabilidade são os oráculos que os rollups usam para detectar que um usuário fez um depósito na ponte. Se um oráculo fornecer dados incorretos, eles poderiam enganar o rollup fazendo-o pensar que houve um depósito na ponte e liberar fundos incorretamente. Um cliente leve incorporado no rollup poderia ser usado para proteger contra oráculos corrompidos, porque o depósito na ponte poderia vir com uma prova que pode ser verificada pelo rollup antes de liberar quaisquer tokens. O mesmo conceito também poderia ser aplicado a outras pontes entre cadeias.

Os clientes leves também poderiam ser usados para atualizar as carteiras do Ethereum. Em vez de confiar nos dados fornecidos por um provedor RPC, sua carteira poderia verificar diretamente os dados apresentados a você usando um cliente leve incorporado. Isso adicionaria segurança à sua carteira. Se o seu provedor RPC fosse desonesto e lhe fornecesse dados incorretos, o cliente leve incorporado poderia lhe avisar!

## Qual é o estado atual do desenvolvimento de clientes leves? {#current-state-of-development}

Existem vários clientes leves em desenvolvimento, incluindo clientes leves de execução, de consenso e combinados de execução/consenso. Estas são as implementações de clientes leves que conhecemos no momento em que escrevemos esta página:

- [Lodestar](https://github.com/ChainSafe/lodestar/tree/unstable/packages/light-client): cliente de consenso leve em TypeScript
- [Helios](https://github.com/a16z/helios): cliente leve combinado de execução e consenso em Rust
- [Geth](https://github.com/ethereum/go-ethereum/tree/master/beacon/light): modo leve para cliente de execução (em desenvolvimento) em Go
- [Nimbus](https://nimbus.guide/el-light-client.html): cliente de consenso leve em Nim

Até onde sabemos, nenhum deles é considerado pronto para produção ainda.

Também há muito trabalho sendo feito para melhorar as maneiras pelas quais os clientes leves podem acessar os dados do Ethereum. Atualmente, os clientes leves dependem de solicitações RPC para nós completos usando um modelo cliente/servidor, mas no futuro os dados poderiam ser solicitados de uma forma mais descentralizada usando uma rede dedicada, como a [Portal Network](https://www.ethportal.net/), que poderia servir os dados para clientes leves usando um protocolo de fofoca ponto a ponto.

Outros itens do [roteiro](/roadmap/), como [árvores Verkle](/roadmap/verkle-trees/) e [ausência de estado](/roadmap/statelessness/), eventualmente trarão as garantias de segurança dos clientes leves para o mesmo nível das dos clientes completos.

## Leitura adicional {#further-reading}

- [Zsolt Felfodhi sobre clientes leves do Geth](https://www.youtube.com/watch?v=EPZeFXau-RE)
- [Etan Kissling sobre rede de clientes leves](https://www.youtube.com/watch?v=85MeiMA4dD8)
- [Etan Kissling sobre clientes leves após o The Merge](https://www.youtube.com/watch?v=ZHNrAXf3RDE)
- [Piper Merriam: A estrada sinuosa para clientes leves funcionais](https://snakecharmers.ethereum.org/the-winding-road-to-functional-light-clients/)