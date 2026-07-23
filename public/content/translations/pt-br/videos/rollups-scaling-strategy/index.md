---
title: "Rollups: a estratégia definitiva de escalabilidade do Ethereum?"
description: "Uma análise detalhada dos rollups como a principal estratégia de escalabilidade do Ethereum. Este vídeo explica como funcionam os rollups otimistas (Arbitrum, Optimism) e os rollups de conhecimento zero."
lang: pt-br
youtubeId: "7pWxCklcNsU"
uploadDate: 2021-04-14
duration: "0:16:37"
educationLevel: intermediate
topic:
  - "scaling"
  - "rollups"
  - "optimistic-rollups"
  - "zk-rollups"
format: explainer
author: Finematics
breadcrumb: "Rollups"
---

Um vídeo explicativo da **Finematics** abordando os rollups como a principal estratégia de escalabilidade do Ethereum. O vídeo compara os rollups otimistas (Arbitrum, Optimism) com os ZK rollups e examina por que os rollups se tornaram o método dominante para escalar o Ethereum.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=7pWxCklcNsU) publicada pela Finematics. Ela foi levemente editada para facilitar a leitura.*

#### Camada 2 (1:17) {#layer-2-117}

A escalabilidade do Ethereum tem sido um dos tópicos mais discutidos em cripto. O debate sobre escalabilidade geralmente esquenta durante períodos de alta atividade na rede, como a febre dos CryptoKitties em 2017, o verão das finanças descentralizadas (DeFi) de 2020 ou o mercado de alta de cripto no início de 2021. Durante esses períodos, a demanda sem precedentes pela rede Ethereum resultou em taxas de gás extremamente altas, tornando caro para os usuários comuns pagarem por suas transações.

Para enfrentar esse problema, a busca pela solução definitiva de escalabilidade tem sido uma das principais prioridades para várias equipes e para a comunidade Ethereum como um todo.

Em geral, existem três maneiras principais de escalar o Ethereum — ou, de fato, a maioria das outras blockchains: escalar a própria blockchain (escalabilidade de camada 1 (l1)), construir sobre a camada 1 (escalabilidade de camada 2 (l2)) e construir ao lado da camada 1 (sidechains).

#### Fora da camada 1 (1:58) {#outside-of-layer-1-158}

Quando se trata da camada 1 (l1), o Eth2 é a solução escolhida para escalar a blockchain do Ethereum. O Eth2 refere-se a um conjunto de mudanças interconectadas, como a migração para a Prova de Participação (PoS), a fusão do estado da cadeia de Prova de Trabalho (PoW) na nova cadeia de Prova de Participação (PoS) e a criação de fragmentos. A criação de fragmentos, em particular, pode aumentar drasticamente a vazão da rede Ethereum, especialmente quando combinada com rollups.

Quando se trata de escalar fora da camada 1 (l1), várias soluções diferentes de escalabilidade foram testadas com resultados mistos. Por um lado, temos soluções de camada 2 (l2), como canais, que são totalmente protegidas pelo Ethereum, mas funcionam bem apenas para um conjunto específico de aplicativos. As sidechains, por outro lado, geralmente são compatíveis com a EVM e podem escalar aplicativos de uso geral. A principal desvantagem é que elas são menos seguras do que as soluções de camada 2 por não dependerem da segurança do Ethereum e, em vez disso, terem seus próprios modelos de consenso.

A maioria dos rollups visa alcançar o melhor desses dois mundos, criando uma solução de escalabilidade de uso geral, ao mesmo tempo em que depende totalmente da segurança do Ethereum. Este é o santo graal da escalabilidade, pois permite implantar todos os contratos inteligentes existentes presentes no Ethereum em um rollup com poucas ou nenhuma alteração, sem sacrificar a segurança. Não é de admirar que os rollups sejam provavelmente a solução de escalabilidade mais aguardada de todas.

Um rollup é um tipo de solução de escalabilidade que funciona executando transações fora da camada 1 (l1), mas publicando os dados da transação na camada 1. Isso permite que o rollup escale a rede e ainda derive sua segurança do consenso do Ethereum. Mover a computação offchain permite essencialmente processar mais transações no total, já que apenas alguns dos dados das transações do rollup precisam caber nos blocos do Ethereum.

Para conseguir isso, as transações do rollup são executadas em uma cadeia separada que pode até executar uma versão da EVM específica para o rollup. O próximo passo após a execução de transações em um rollup é agrupá-las e publicá-las na cadeia principal do Ethereum. Todo o processo essencialmente executa transações, pega os dados, os comprime e os "enrola" (rolls up) para a cadeia principal em um único lote — daí o nome "rollup".

Cada rollup implanta um conjunto de contratos inteligentes na camada 1 (l1) que são responsáveis por processar depósitos e saques e verificar provas. As provas também são onde a principal distinção entre os diferentes tipos de rollups entra em jogo. Os rollups otimistas usam provas de fraude, enquanto os ZK rollups usam provas de validade.

#### Rollups otimistas (4:26) {#optimistic-rollups-426}

Os rollups otimistas publicam dados na camada 1 (l1) e assumem que estão corretos — daí o nome "otimista". Se os dados publicados forem válidos, estamos no caminho feliz e nada mais precisa ser feito. O rollup otimista se beneficia por não ter que fazer nenhum trabalho adicional no cenário otimista.

No caso de uma transação inválida, o sistema deve ser capaz de identificá-la, recuperar o estado correto e penalizar a parte que envia tal transação. Para conseguir isso, os rollups otimistas implementam um sistema de resolução de disputas que é capaz de verificar provas de fraude, detectar transações fraudulentas e desincentivar maus atores de enviar outras transações inválidas ou provas de fraude incorretas.

Na maioria das implementações de rollup otimista, a parte que é capaz de enviar lotes de transações para a camada 1 (l1) tem que fornecer uma garantia, geralmente na forma de ETH. Qualquer outro participante da rede pode enviar uma prova de fraude se detectar uma transação incorreta. Após o envio de uma prova de fraude, o sistema entra no modo de resolução de disputas. Neste modo, a transação suspeita é executada novamente — desta vez na cadeia principal do Ethereum. Se a execução provar que a transação foi de fato fraudulenta, a parte que enviou essa transação é punida, geralmente tendo seu ETH em garantia penalizado.

Para evitar que maus atores enviem spam para a rede com provas de fraude incorretas, as partes que desejam enviar provas de fraude geralmente também precisam fornecer uma garantia que pode estar sujeita a penalização.

Para poder executar uma transação de rollup na camada 1 (l1), os rollups otimistas precisam implementar um sistema que seja capaz de reproduzir uma transação com o estado exato que estava presente quando a transação foi originalmente executada no rollup. Esta é uma das partes complicadas dos rollups otimistas e geralmente é alcançada criando um contrato gerenciador separado que substitui certas chamadas de função por um estado do rollup.

O sistema pode funcionar conforme o esperado e detectar fraudes mesmo se houver apenas uma parte honesta que monitore o estado do rollup e envie provas de fraude, se necessário. Devido aos incentivos corretos dentro do sistema de rollup, entrar no processo de resolução de disputas deve ser uma situação excepcional e não algo que acontece o tempo todo.

Quando se trata de ZK rollups, não há nenhuma resolução de disputas. Isso é possível aproveitando uma peça inteligente de criptografia chamada provas de conhecimento zero — daí o nome ZK rollups. Neste modelo, cada lote publicado na camada 1 (l1) inclui uma prova criptográfica chamada ZK-SNARK. A prova pode ser verificada rapidamente pelo contrato da camada 1 quando o lote de transações é enviado, e lotes inválidos podem ser rejeitados imediatamente.

#### Outras diferenças (7:28) {#other-differences-728}

Devido à natureza do processo de resolução de disputas, os rollups otimistas precisam dar tempo suficiente a todos os participantes da rede para enviar provas de fraude antes de finalizar uma transação na camada 1 (l1). Esse período geralmente é bastante longo — para garantir que, mesmo no pior cenário, transações fraudulentas ainda possam ser contestadas. Isso faz com que os saques de rollups otimistas sejam bastante demorados, já que os usuários precisam esperar até uma ou duas semanas para poder sacar seus fundos de volta para a camada 1.

Felizmente, existem alguns projetos trabalhando para melhorar essa situação, fornecendo "saídas de liquidez" rápidas. Esses projetos oferecem saques quase instantâneos de volta para a camada 1 (l1), outra camada 2 (l2) ou até mesmo uma sidechain e cobram uma pequena taxa pela conveniência. O Hop Protocol e o Connext são os projetos a serem observados.

Os ZK rollups não têm o problema de saques demorados, pois os fundos ficam disponíveis para saque assim que o lote do rollup, juntamente com uma prova de validade, é enviado para a camada 1 (l1).

No entanto, os ZK rollups vêm com suas próprias desvantagens. Devido à complexidade da tecnologia, é muito mais difícil criar um ZK rollup compatível com a EVM, o que torna mais difícil escalar aplicativos de uso geral sem ter que reescrever a lógica do aplicativo. Dito isso, a zkSync está fazendo um progresso significativo nessa área e eles podem ser capazes de lançar um ZK rollup compatível com a EVM muito em breve.

Os rollups otimistas têm um pouco mais de facilidade com a compatibilidade com a EVM. Eles ainda precisam executar sua própria versão da EVM com algumas modificações, mas 99% dos contratos podem ser portados sem fazer nenhuma alteração. Os ZK rollups também exigem muito mais computação do que os rollups otimistas, o que significa que os nós que calculam as provas ZK precisam ser máquinas de alta especificação, dificultando a execução por outros usuários.

#### Melhorias de escalabilidade (9:32) {#scaling-improvements-932}

Quando se trata de melhorias de escalabilidade, ambos os tipos de rollups devem ser capazes de escalar o Ethereum de cerca de 15 a 45 transações por segundo (dependendo do tipo de transação) para até 1.000 a 4.000 transações por segundo. Vale a pena notar que é possível processar ainda mais transações por segundo oferecendo mais espaço para lotes de rollup na camada 1 (l1).

É também por isso que o Eth2 pode criar uma enorme sinergia com os rollups, pois aumenta o espaço possível de disponibilidade de dados criando vários fragmentos — cada um deles capaz de armazenar uma quantidade significativa de dados. A combinação do Eth2 e dos rollups pode elevar a velocidade de transação do Ethereum para até 100.000 transações por segundo.

Optimism e Arbitrum são atualmente as opções mais populares quando se trata de rollups otimistas. O Optimism foi parcialmente lançado na Mainnet do Ethereum com um conjunto limitado de parceiros, como Synthetix e Uniswap, para garantir que a tecnologia funcione conforme o esperado antes do lançamento completo. O Arbitrum já implantou sua versão na Mainnet e começou a integração de diferentes projetos em seu ecossistema.

Alguns dos projetos mais notáveis lançados no Arbitrum incluem Uniswap, Sushi, Bancor, Augur, Chainlink, Aave e muitos mais. O Arbitrum também anunciou sua parceria com o Reddit, com foco no lançamento de uma cadeia de rollup separada para escalar seu sistema de recompensa. O Optimism está em parceria com a MakerDAO para criar a Optimism Dai Bridge e permitir saques rápidos de DAI e outros tokens de volta para a camada 1 (l1).

Embora tanto o Arbitrum quanto o Optimism tentem atingir o mesmo objetivo — construir soluções de rollup otimista compatíveis com a EVM — existem algumas diferenças em seu design. O Arbitrum tem um modelo de resolução de disputas diferente. Em vez de reexecutar uma transação inteira na camada 1 (l1) para verificar se a prova de fraude é válida, eles criaram um modelo interativo de várias rodadas que permite restringir o escopo da disputa e potencialmente executar apenas algumas instruções na camada 1 para verificar se uma transação suspeita é válida.

Outra grande diferença é a abordagem para lidar com a ordenação de transações e o MEV. O Arbitrum executará inicialmente um sequenciador responsável por ordenar as transações, mas eles querem descentralizá-lo a longo prazo. O Optimism prefere outra abordagem em que a ordenação de transações — e, portanto, o MEV — pode ser leiloada para outras partes por um determinado período de tempo.

#### ZK rollups (13:10) {#zk-rollups-1310}

Embora pareça que a comunidade Ethereum está se concentrando principalmente em rollups otimistas — pelo menos a curto prazo —, os projetos que trabalham em ZK rollups também estão progredindo de forma extremamente rápida.

A Loopring usa a tecnologia de ZK rollup para escalar seu protocolo de troca e pagamento. Hermez e ZKTube estão trabalhando na escalabilidade de pagamentos usando ZK rollups, com a Hermez também construindo um ZK rollup compatível com a EVM. A Aztec está se concentrando em trazer recursos de privacidade para sua tecnologia de ZK rollup.

Os rollups baseados na StarkWare já são amplamente utilizados por projetos como DeversiFi, Immutable X e dYdX. Como mencionado anteriormente, a zkSync está trabalhando em uma máquina virtual compatível com a EVM que será capaz de suportar totalmente quaisquer contratos inteligentes arbitrários escritos em Solidity.

#### DeFi (14:02) {#defi-1402}

Os rollups também devem ter um grande impacto nas finanças descentralizadas (DeFi). Os usuários que antes não conseguiam transacionar no Ethereum devido às altas taxas de transação poderão permanecer no ecossistema na próxima vez que a atividade da rede estiver alta. Os rollups também permitirão uma nova geração de aplicativos que exigem transações mais baratas e tempo de confirmação mais rápido — tudo isso sendo totalmente protegido pelo consenso do Ethereum. Parece que os rollups podem desencadear outro período de alto crescimento para as DeFi.

#### Desafios (14:29) {#challenges-1429}

Existem, no entanto, alguns desafios quando se trata de rollups. A composabilidade é um deles — para compor uma transação que usa vários protocolos, todos eles teriam que ser implantados no mesmo rollup.

Outro desafio é a liquidez fraturada. Sem a entrada de dinheiro novo no ecossistema Ethereum como um todo, a liquidez existente presente na camada 1 (l1) em protocolos como Uniswap ou Aave será compartilhada entre a camada 1 e várias implementações de rollup. Menor liquidez geralmente significa maior derrapagem e pior execução de negociação.

Isso também significa que naturalmente haverá vencedores e perdedores. No momento, o ecossistema Ethereum existente não é grande o suficiente para fazer uso de todas as soluções de escalabilidade. Isso pode — e provavelmente irá — mudar a longo prazo, mas a curto prazo, podemos ver alguns rollups e outras soluções de escalabilidade se tornando cidades fantasmas. No futuro, também podemos ver usuários vivendo inteiramente dentro de um ecossistema de rollup e não interagindo com a cadeia principal do Ethereum e outras soluções de escalabilidade por longos períodos de tempo.

#### Ameaça às sidechains (15:44) {#threat-to-sidechains-1544}

Uma pergunta que surge com muita frequência ao discutir rollups é se eles são uma ameaça às sidechains. As sidechains ainda terão seu lugar no ecossistema Ethereum. Embora o custo das transações na camada 2 (l2) seja muito menor do que na camada 1 (l1), muito provavelmente ainda será alto o suficiente para inviabilizar certos tipos de aplicativos, como jogos e outros aplicativos de alto volume. Isso pode mudar quando o Ethereum introduzir a criação de fragmentos, mas até lá as sidechains podem criar efeito de rede suficiente para sobreviver a longo prazo.

Além disso, as taxas nos rollups são mais altas do que nas sidechains porque cada lote de rollup ainda precisa pagar pelo espaço do bloco do Ethereum. A comunidade Ethereum coloca um grande foco nos rollups na estratégia de escalabilidade do Ethereum — pelo menos a curto e médio prazo e potencialmente até mais.