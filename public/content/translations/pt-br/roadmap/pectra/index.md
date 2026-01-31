---
title: Praga-Electra (Pectra)
description: "Saiba mais sobre a atualização do protocolo Pectra"
lang: pt-br
---

# Pectra {#pectra}

A atualização da rede Pectra seguiu [Dencun](/roadmap/dencun/) e trouxe mudanças tanto na camada de execução quanto na de consenso do Ethereum. O nome abreviado Pectra é uma combinação de Praga e Electra, que são os nomes respectivos para as alterações de especificação da camada de execução e consenso. Juntas, essas mudanças trazem uma série de melhorias para usuários, desenvolvedores e validadores do Ethereum.

Esta atualização foi ativada com sucesso na rede principal Ethereum no período `364032`, em **07-mai-2025 às 10:05 (UTC)**.

<Alert variant="update">
<AlertContent>
<AlertDescription>
A atualização Pectra é apenas um passo nos objetivos de desenvolvimento de longo prazo do Ethereum. Saiba mais sobre [o roteiro do protocolo](/roadmap/) e [atualizações anteriores](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Melhorias na Pectra {#new-improvements}

O Pectra traz o maior número de [EIPs](https://eips.ethereum.org/) de todas as atualizações anteriores! Há muitas pequenas mudanças, mas também alguns novos recursos significativos. A lista completa de alterações e detalhes técnicos pode ser encontrada nos EIPs individuais incluídos.

### Código de conta EOA {#7702}

[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) representa um passo importante em direção à difusão da [abstração de contas](/roadmap/account-abstraction/). Com esse recurso, os usuários podem definir que seu endereço ([EOA](/glossary/#eoa)) seja estendido com um contrato inteligente. O EIP introduz um novo tipo de transação com uma função específica: permitir que os proprietários de endereços assinem uma autorização que define seu endereço para imitar um contrato inteligente escolhido.

Com este EIP, os usuários podem optar por carteiras programáveis ​​que permitem novos recursos, como agrupamento de transações, transações sem gás e acesso personalizado a ativos para esquemas de recuperação alternativos. Essa abordagem híbrida combina a simplicidade dos EOAs com a programabilidade de contas baseadas em contratos.

Leia uma análise mais aprofundada sobre 7702 [aqui](/roadmap/pectra/7702/)

### Aumento do saldo efetivo máximo {#7251}

O saldo efetivo atual do validador é exatamente 32 ETH. É o valor mínimo necessário para participar do consenso, mas, ao mesmo tempo o máximo que um único validador pode colocar em stake.

[EIP-7251](https://eips.ethereum.org/EIPS/eip-7251) aumenta o saldo efetivo máximo possível para 2048 ETH, o que significa que um único validador agora pode apostar entre 32 e 2048 ETH. Em vez de múltiplos de 32, os stakers agora podem escolher uma quantidade arbitrária de ETH para pôr em stake e receber recompensas para cada 1 ETH acima do mínimo. Por exemplo, se o saldo de um validador cresce com suas recompensas para 33 ETH, o 1 ETH extra também é considerado parte do saldo efetivo e recebe recompensas.

Mas o benefício de um melhor sistema de recompensas para validadores é apenas uma parte dessa melhoria. [Stakers](/staking/) que executam vários validadores agora podem agregá-los em um único, o que permite uma operação mais fácil e reduz a sobrecarga da rede. Como cada validador no Beacon Chain envia uma assinatura em cada época, os requisitos de largura de banda aumentam com mais validadores e um grande número de assinaturas para propagar. A agregação dos validadores aliviará a carga da rede e abrirá novas opções de escalabilidade, mantendo a mesma segurança econômica.

Leia uma análise mais aprofundada sobre o maxEB [aqui](/roadmap/pectra/maxeb/)

### Aumento da taxa de transferência de blobs {#7691}

Blobs fornecem [disponibilidade de dados](/developers/docs/data-availability/#data-availability-and-layer-2-rollups) para L2s. Eles foram introduzidos na [atualização de rede anterior](/roadmap/dencun/).

Atualmente, a rede tem como alvo uma média de 3 blobs por bloco, com um máximo de 6 blobs. Com [EIP-7691](https://eips.ethereum.org/EIPS/eip-7691), a contagem média de blobs será aumentada para 6, com um máximo de 9 por bloco, resultando em maior capacidade para rollups de Ethereum. Este EIP ajuda a preencher a lacuna até que [PeerDAS](https://eips.ethereum.org/EIPS/eip-7594) permita contagens de blobs ainda maiores.

### Aumentar o custo dos dados de chamadas {#7623}

Antes da introdução de [blobs na atualização de Dencun](/roadmap/danksharding), L2s estavam usando [calldata](/developers/docs/data-availability/blockchain-data-storage-strategies/#calldata) para armazenar seus dados no Ethereum. Tanto blobs quanto calldata afetam o uso de largura de banda do Ethereum. Embora a maioria dos blocos use apenas uma quantidade mínima de calldata, blocos com muitos dados que também contêm muitos blobs podem ser prejudiciais à rede p2p do Ethereum.

Para resolver isso, [EIP-7623](https://eips.ethereum.org/EIPS/eip-7623) aumenta o preço do calldata, mas apenas para transações com muitos dados. Isso limita o pior caso do tamanho de bloco, fornece um incentivo para que as L2s usem apenas blobs e deixa mais de 99% das transações inalteradas.

### Saídas acionáveis ​​da camada de execução {#7002}

Atualmente, saindo de um validador e [sacando o ETH em stake](/staking/withdrawals/) é uma operação da camada de consenso que requer uma chave de validador ativa, a mesma chave BLS usada pelo validador para executar tarefas ativas, como atestados. As credenciais de saque são uma chave fria separada que recebe o stake encerrado, mas não pode acionar a saída. A única maneira dos stakers saírem é enviar uma mensagem especial para a rede Beacon Chain assinada usando a chave ativa do validador. Isso é limitante em cenários onde as credenciais de retirada e a chave do validador são mantidas por entidades diferentes ou quando a chave do validador é perdida.

[EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) introduz um novo contrato que pode ser usado para acionar a saída usando credenciais de saque na camada de execução. Os stakers poderão sair do validador chamando uma função neste contrato especial, sem precisar da chave de assinatura do validador ou de qualquer acesso ao Beacon Chain. É importante ressaltar que habilitar retiradas on-chain de validadores permite protocolos de staking com relação de confiança reduzidas sobre operadores de nós.

### Depósitos on-chain do validador {#6110}

Os depósitos do validador são atualmente processados ​​por [eth1data poll](https://eth2book.info/capella/part2/deposits-withdrawals/deposit-processing/) que é uma função na Rede Beacon que busca dados da camada de execução. É uma espécie de dívida técnica de tempos anteriores ao The Merge, quando a Rede Beacon era uma rede separada e tinha que se preocupar com reorganizações de prova de trabalho.

[EIP-6110](https://eips.ethereum.org/EIPS/eip-6110) é uma nova maneira de entregar depósitos da execução para a camada de consenso, o que permite processamento instantâneo com menos complexidade de implementação. É uma maneira mais segura de lidar com depósitos nativos do Ethereum. Isso também ajuda a proteger o protocolo para o futuro porque não exige depósitos históricos para inicializar o nó, o que é necessário para a expiração do histórico.

### Pré-compilação para BLS12-381 {#2537}

As pré-compilações são um conjunto especial de contratos inteligentes construídos diretamente na Máquina Virtual Ethereum ([EVM](/developers/docs/evm/)). Diferentemente dos contratos regulares, as pré-compilações não são implantadas pelos usuários, mas fazem parte da própria implementação do cliente, escritas em sua linguagem nativa (por exemplo, Go, Java, etc., não Solidity). Pré-compilações servem para funções amplamente utilizadas e padronizadas, como operações criptográficas. Desenvolvedores de contratos inteligentes podem chamar as pré-compilações como em um contrato regular, mas com mais segurança e eficiência.

[EIP-2537](https://eips.ethereum.org/EIPS/eip-2537) adiciona novas pré-compilações para operações de curva sobre [BLS12-381](https://hackmd.io/@benjaminion/bls12-381). Essa curva elíptica se tornou amplamente utilizada em ecossistemas de criptomoedas graças às suas propriedades práticas. Mais especificamente, ela foi adotada pela camada de consenso do Ethereum, onde é usada por validadores.

A nova pré-compilação adiciona a capacidade para cada desenvolvedor executar operações criptográficas de forma fácil, eficiente e segura usando essa curva, por exemplo, verificando assinaturas. Aplicações on-chain que dependem dessa curva podem se tornar mais seguras e eficientes em termos de consumo de gás ao depender de uma pré-compilação em vez de algum contrato personalizado. Isso se aplica principalmente a aplicativos que querem interagir com validadores dentro da EVM, por exemplo, pools de staking, [restaking](/restaking/), clientes leves, pontes e também conhecimento zero.

### Servir hashes de blocos históricos do estado {#2935}

Atualmente, a EVM fornece o opcode `BLOCKHASH` que permite que desenvolvedores de contratos recuperem o hash de um bloco diretamente na camada de execução. No entanto, isso é limitado apenas aos últimos 256 blocos e pode se tornar problemático para clientes "sem estado" no futuro.

[EIP-2935](https://eips.ethereum.org/EIPS/eip-2935) cria um novo contrato de sistema que pode servir os últimos 8192 hashes de bloco como slots de armazenamento. Isso ajuda a tornar o protocolo à prova de futuro para execução sem estado e se torna mais eficiente quando verkle tries são adotadas. No entanto, além disso, os rollups podem se beneficiar disso imediatamente, pois podem consultar o contrato diretamente com uma janela histórica mais longa.

### Mover o índice de comissão para fora da Atestação {#7549}

O consenso da Beacon Chain é baseado em validadores que emitem seus votos para o último bloco e época finalizada. A atestação inclui 3 elementos, 2 dos quais são votos e o terceiro é o valor do índice de comissão.

[EIP-7549](https://eips.ethereum.org/EIPS/eip-7549) move esse índice para fora da mensagem assinada de atestado, o que facilita a verificação e a agregação de votos de consenso. Isso permitirá mais eficiência em cada cliente de consenso e pode trazer melhorias significativas de desempenho para circuitos zero-knowledge para provar o consenso do Ethereum.

### Adicionar agendamento de blobs aos arquivos de configuração EL {#7840}

[EIP-7840](https://eips.ethereum.org/EIPS/eip-7840) é uma alteração simples que adiciona um novo campo à configuração do cliente da camada de execução. Ele configura o número de blocos, permitindo a configuração dinâmica para contagens de blobs alvo e máxima por bloco, bem como o ajuste da taxa de blobs. Com a configuração definida diretamente, os clientes podem evitar a complexidade de trocar essas informações via Engine API.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Para saber mais sobre como a atualização Pectra afeta você especificamente como um usuário, desenvolvedor ou validador da Ethereum, consulte o <a href="https://epf.wiki/#/wiki/pectra-faq">FAQ da Pectra</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Esta atualização afeta todos os nós e validadores Ethereum? {#client-impact}

Sim, a atualização do Pectra requer atualizações para [clientes de execução e clientes de consenso](/developers/docs/nodes-and-clients/). Todos os principais clientes Ethereum lançarão versões compatíveis com o hard fork marcadas como alta prioridade. Para manter a sincronização com a rede Ethereum após a atualização, os operadores de nó precisam assegurar que eles estão executando uma versão habilitada do cliente. Observe que as informações sobre os lançamentos de clientes são perenes, e os usuários deveriam usar como referência as últimas melhorias para ter os detalhes mais atuais.

## Como ETH pode ser convertido depois do hard fork? {#scam-alert}

- **Nenhuma ação necessária para seu ETH**: Após a atualização do Ethereum Pectra, não há necessidade de converter ou atualizar seu ETH. Seu saldo de conta irá permanecer o mesmo e o ETH que você tem atualmente continuará acessível na sua forma existente depois do hard fork.
- **Atenção aos golpes!**<Emoji text="⚠️" />**Qualquer pessoa que instrua você a "atualizar" seu ETH está tentando aplicar um golpe.** Você não precisa fazer nada em relação a essa melhoria. Seus ativos não serão afetados de forma nenhuma. Lembre-se: estar informado é a melhor defesa contra golpes.

[Mais sobre como reconhecer e evitar golpes](/segurança/)

## Você é o tipo de pessoa que aprende mais com recursos visuais? {#visual-learner}

<YouTube id="ufIDBCgdGwY" />

_O que está acontecendo na atualização do Pectra? - Christine Kim_

<YouTube id="_UpAFpC7X6Y" />

_Atualização do Ethereum Pectra: O que os stakers precisam saber — Blockdaemon_

## Leitura adicional {#further-reading}

- [Roteiro do Ethereum](/roadmap/)
- [Pectra FAQ](https://epf.wiki/#/wiki/pectra-faq)
- [Página de informações Pectra.wtf](https://pectra.wtf)
- [Como a Pectra aprimora a experiência do staker](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Página de informações do EIP7702](https://eip7702.io/)
- [Redes de teste Pectra](https://github.com/ethereum/pm/blob/master/Pectra/pectra-pm.md)
