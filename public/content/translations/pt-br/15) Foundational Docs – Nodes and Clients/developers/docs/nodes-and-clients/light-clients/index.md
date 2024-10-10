---
title: Clientes leves
description: Introdução aos clientes leves Ethereum.
lang: pt-br
---

Executar um nó completo é a maneira mais confiável, privada, descentralizada e resistente à censura para interagir com o Ethereum. Com um nó completo, você mantém sua própria cópia da blockchain, que pode consultar instantaneamente e obter acesso direto à rede ponto a ponto do Ethereum. No entanto, executar um nó completo requer uma quantidade significativa de memória, armazenamento e CPU. Isso significa que não é viável para todos executar seu próprio nó. Existem várias soluções para isso no roteiro do Ethereum, incluindo a falta de estado, mas elas estão a vários anos de serem implementadas. A resposta a curto prazo é trocar alguns dos benefícios de executar um nó completo para grandes melhorias de desempenho, que permitem que os nós sejam executados com requisitos de hardware muito baixos. Os nós que fazem essa troca são conhecidos como nós leves.

## O que é um cliente leve {#what-is-a-light-client}

Um nó leve é um nó executando um software de cliente leve. Em vez de manter cópias locais dos dados da blockchain e verificar independentemente todas as mudanças, eles solicitam os dados necessários de algum provedor. O provedor pode ser uma conexão direta com um nó completo ou uma conexão por meio de um servidor RPC centralizado. Em seguida, os dados são verificados pelo nó leve, permitindo-lhe manter o início da cadeia. O nó leve processa apenas cabeçalhos de blocos, baixando apenas ocasionalmente o conteúdo real do bloco. Os nós podem variar em sua leveza, dependendo das combinações de software cliente leve e completo que eles executam. Por exemplo, a configuração mais leve seria executar um cliente de execução leve e um cliente de consenso leve. Também é provável que muitos nós optem por executar clientes de consenso leve, com clientes de execução completos ou vice-versa.

## Como funcionam os clientes leves? {#how-do-light-clients-work}

Quando o Ethereum começou a usar um mecanismo de consenso baseado em prova de participação, uma nova infraestrutura foi introduzida especificamente para dar suporte a clientes leves. Isso funciona selecionando aleatoriamente um subconjunto de 512 validadores a cada 1,1 dias para atuar como um **comitê de sincronização**. O comitê de sincronização assina o cabeçalho dos blocos recentes. Cada cabeçalho de bloco contém a assinatura agregada dos validadores no comitê de sincronização e um "bitfield" que mostra quais validadores assinaram e quais não. Cada cabeçalho também inclui uma lista de validadores esperados a participar da assinatura do bloco seguinte. Isso significa que um cliente leve pode ver rapidamente que o comitê de sincronização assinou os dados recebidos, e também pode verificar se o comitê de sincronização é o genuíno, comparando o que ele recebeu em relação ao que era previsto no bloco anterior. Dessa forma, o cliente leve pode continuar atualizando seu conhecimento do último bloco Ethereum, sem realmente baixar o bloco em si, apenas o cabeçalho que contém informações resumidas.

Na camada de execução não há uma especificação única para um cliente de execução leve. O escopo de um cliente de execução leve pode variar de um "modo leve" de um cliente de execução completo com todas as funcionalidades EVM e de rede de um nó completo. No entanto, ele apenas verifica cabeçalhos de bloco, sem baixar os dados associados, ou pode ser um cliente mais enxuto, que depende muito do encaminhamento de solicitações a um provedor RPC para interagir com o Ethereum.

## Por que os clientes leves são importantes? {#why-are-light-clients-important}

Os clientes leves são importantes porque permitem aos usuários verificar os dados recebidos, em vez de confiar cegamente que seu provedor de dados seja correto e honesto, enquanto utilizam apenas uma pequena fração dos recursos computacionais de um nó completo. Os dados dos clientes leves recebidos podem ser verificados em relação aos cabeçalhos de bloco que eles sabem que foram assinados por pelo menos 2/3 de um conjunto aleatório de 512 validadores Ethereum. Essa é uma evidência muito forte de que os dados estão corretos.

O cliente leve usa apenas uma pequena quantidade de poder de computação, memória e armazenamento para poder ser executado em um telefone celular, embutido em um aplicativo ou como parte de um navegador. Os clientes leves são uma forma de tornar o acesso minimizado por confiança ao Ethereum tão sem atritos quanto confiar em um provedor terceirizado.

Vamos dar um exemplo simples. Imagine que você quer verificar o saldo da sua conta. Para fazer isso, você tem que fazer uma solicitação a um nó Ethereum. Esse nó irá verificar o saldo de sua cópia local do estado do Ethereum e o devolverá a você. Se você não tiver acesso direto a um nó, existem operadores centralizados que fornecem esses dados como um serviço. É possível enviar uma solicitação para eles, que verificam o nó deles e enviam o resultado de volta para você. O problema disso é que você tem de confiar no provedor para dar a você as informações corretas. Você nunca poderá realmente saber se as informações estão corretas se não puder verificá-las por si mesmo.

Um cliente leve aborda essa questão. Você ainda solicita dados de algum provedor externo, mas quando recebe os dados de volta, eles vêm com uma prova de que seu nó leve pode comprovar as informações recebidas no cabeçalho do bloco. Isso significa que o Ethereum está verificando a exatidão de seus dados em vez de algum operador confiável.

## Que inovações os clientes leves permitem? {#what-innovations-do-light-clients-enable}

O principal benefício de clientes leves é permitir que mais pessoas acessem o Ethereum de forma independente, com requisitos de hardware insignificantes e dependência mínima de terceiros. Isso é bom para os usuários, porque eles podem verificar seus próprios dados e é bom para a rede, porque aumenta o número e a diversidade de nós que estão verificando a cadeia.

A capacidade de executar nós Ethereum em dispositivos com armazenamento, memória e poder de processamento muito pequenos é uma das principais áreas de inovação desbloqueadas por clientes leves. Enquanto hoje os nós do Ethereum exigem muitos recursos de computação, os clientes leves podem ser incorporados em navegadores, executados em telefones celulares e talvez até em dispositivos menores, como relógios inteligentes. Isso significa que as carteiras Ethereum com clientes embutidos poderiam funcionar em um telefone celular. Isso significa que as carteiras móveis poderiam ser muito mais descentralizadas, já que elas não teriam que confiar em provedores de dados centralizados para seus dados.

Isso pode ser expandido com a ativação de dispositivos para a **internet das coisas (IoT)**. Um cliente leve pode estar acostumado a provar rapidamente a propriedade de algum saldo de token ou NFT, com todas as garantias de segurança fornecidas pelos comitês de sincronização, disparando alguma ação em uma rede IoT. Imagine um [serviço de aluguel de bicicletas](https://youtu.be/ZHNrAXf3RDE?t=929), que usa um aplicativo com um cliente leve integrado para verificar rapidamente se você possui o NFT do serviço de aluguel e, em caso afirmativo, desbloqueia uma bicicleta para você pedalar!

Os rollups do Ethereum também se beneficiariam de clientes leves. Um dos grandes problemas para os rollups são os hacks direcionados às pontes, que permitem a transferência de fundos da rede principal Ethereum para um rollup. Uma vulnerabilidade são os oráculos que os rollups usam para detectar que um usuário fez um depósito na ponte. Se um oráculo fornecer dados ruins, eles poderão enganar o rollup a pensar que houve um depósito para a ponte e liberar fundos incorretamente. Um cliente leve embutido no rollup poderia ser usado para proteger contra oráculos corrompidos, pois o depósito na ponte poderia vir com uma prova que pode ser verificada pelo rollup antes de liberar qualquer token. O mesmo conceito também poderia ser aplicado a outras pontes entre cadeias.

Os clientes leves também poderiam ser usados para atualizar carteiras Ethereum. Em vez de confiar nos dados fornecidos por um provedor de RPC, sua carteira poderia verificar diretamente os dados apresentados a você usando um cliente leve incorporado. Isso adicionaria segurança à sua carteira. Se o seu provedor de RPC foi desonesto e forneceu a você dados incorretos, o cliente leve integrado poderá lhe dizer!

## Qual é o estado atual do desenvolvimento do cliente leve? {#current-state-of-development}

Existem vários clientes leves em desenvolvimento, incluindo clientes leves de execução, de consenso e de execução/consenso combinados. Estas são as implementações de cliente leve que conhecemos no momento em que escrevemos esta página:

- [Lodestar](https://github.com/ChainSafe/lodestar/tree/unstable/packages/light-client): cliente leve de consenso no TypeScript
- [Helios](https://github.com/a16z/helios): cliente leve de execução e consenso combinado no Rust
- [Geth](https://github.com/ethereum/go-ethereum/tree/master/light): modo leve para cliente de execução (em desenvolvimento) no Go
- [Nimbus](https://nimbus.guide/el-light-client.html): cliente leve de consenso no Nim

Até onde sabemos, nenhum deles ainda é considerado pronto para produção.

Também há muito trabalho sendo feito para melhorar as formas pelas quais os clientes leves podem acessar os dados do Ethereum. Atualmente, os clientes leves dependem de solicitações RPC para nós completos usando um modelo cliente/servidor. Porém, no futuro, os dados poderão ser solicitados de maneira mais descentralizada usando uma rede dedicada como o [Portal Network](https://www.ethportal.net/), que pode servir os dados para clientes leves usando um protocolo de propagação ponto a ponto.

Outros itens do [roteiro](/roadmap/) como [árvores Verkle](/roadmap/verkle-trees/) e [ausência de estado](/roadmap/statelessness/) acabarão por trazer as garantias de segurança de clientes leves iguais às de clientes completos.

## Leitura adicional {#further-reading}

- [Zsolt Felfodhi sobre clientes leves do Geth](https://www.youtube.com/watch?v=EPZeFXau-RE)
- [Etan Kissling sobre redes de clientes leves](https://www.youtube.com/watch?v=85MeiMA4dD8)
- [Etan Kissling sobre clientes leves após o The Merge](https://www.youtube.com/watch?v=ZHNrAXf3RDE)
- [Piper Merriam: A estrada sinuosa rumo a clientes leves e funcionais](https://snakecharmers.ethereum.org/the-winding-road-to-functional-light-clients/)
