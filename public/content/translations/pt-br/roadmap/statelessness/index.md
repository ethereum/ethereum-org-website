---
title: Ausência de estado, expiração de estado e expiração de histórico
description: Explicação sobre a expiração de histórico e a ausência de estado no Ethereum
lang: pt-br
---

A capacidade de executar nós do [Ethereum](/) em hardware modesto é fundamental para uma verdadeira descentralização. Isso ocorre porque a execução de um nó dá aos usuários a capacidade de verificar informações realizando verificações criptográficas de forma independente, em vez de confiar em terceiros para fornecer dados. Executar um nó permite que os usuários enviem transações diretamente para a rede ponto a ponto do Ethereum, em vez de ter que confiar em um intermediário. A descentralização não é possível se esses benefícios estiverem disponíveis apenas para usuários com hardware caro. Em vez disso, os nós devem ser capazes de funcionar com requisitos de processamento e memória extremamente modestos, para que possam ser executados em telefones celulares, microcomputadores ou de forma imperceptível em um computador doméstico.

Hoje, os altos requisitos de espaço em disco são a principal barreira que impede o acesso universal aos nós. Isso se deve principalmente à necessidade de armazenar grandes partes dos dados de estado do Ethereum. Esses dados de estado contêm informações críticas exigidas para processar corretamente novos blocos e transações. No momento em que este artigo foi escrito, um SSD rápido de 2 TB é recomendado para executar um nó completo do Ethereum. Para um nó que não remove nenhum dado mais antigo, o requisito de armazenamento cresce em torno de 14 GB/semana, e os nós de arquivo que armazenam todos os dados desde o bloco gênesis estão se aproximando de 12 TB (no momento da redação, em fevereiro de 2023).

Discos rígidos mais baratos podem ser usados para armazenar dados mais antigos, mas eles são muito lentos para acompanhar os blocos recebidos. Manter os modelos de armazenamento atuais para os clientes, ao mesmo tempo em que torna os dados mais baratos e fáceis de armazenar, é apenas uma solução temporária e parcial para o problema, porque o crescimento do estado do Ethereum é "ilimitado", o que significa que os requisitos de armazenamento só podem aumentar, e as melhorias tecnológicas sempre terão que acompanhar o crescimento contínuo do estado. Em vez disso, os clientes devem encontrar novas maneiras de verificar blocos e transações que não dependam da busca de dados em bancos de dados locais.

## Reduzindo o armazenamento para nós {#reducing-storage-for-nodes}

Existem várias maneiras de reduzir a quantidade de dados que cada nó precisa armazenar, cada uma exigindo que o protocolo principal do Ethereum seja atualizado em diferentes proporções:

- **Expiração de histórico**: permite que os nós descartem dados de estado mais antigos que X blocos, mas não altera a forma como os clientes do Ethereum lidam com os dados de estado.
- **Expiração de estado**: permite que os dados de estado que não são usados com frequência se tornem inativos. Dados inativos podem ser ignorados pelos clientes até que sejam ressuscitados.
- **Ausência de estado fraca**: apenas os produtores de blocos precisam de acesso aos dados de estado completos, outros nós podem verificar blocos sem um banco de dados de estado local.
- **Ausência de estado forte**: nenhum nó precisa de acesso aos dados de estado completos.

## Expiração de dados {#data-expiry}

### Expiração de histórico {#history-expiry}

A expiração de histórico refere-se aos clientes que removem dados mais antigos de que provavelmente não precisarão, de modo que armazenem apenas uma pequena quantidade de dados históricos, descartando dados mais antigos quando novos dados chegam. Há dois motivos pelos quais os clientes exigem dados históricos: sincronização e atendimento a solicitações de dados. Originalmente, os clientes tinham que sincronizar a partir do bloco gênesis, verificando se cada bloco sucessivo estava correto até o topo da cadeia. Hoje, os clientes usam "pontos de verificação de subjetividade fraca" para inicializar seu caminho até o topo da cadeia. Esses pontos de verificação são pontos de partida confiáveis, como ter um bloco gênesis próximo ao presente, em vez do início do Ethereum. Isso significa que os clientes podem descartar todas as informações anteriores ao ponto de verificação de subjetividade fraca mais recente sem perder a capacidade de sincronizar com o topo da cadeia. Atualmente, os clientes atendem a solicitações (que chegam via JSON-RPC) de dados históricos, obtendo-os de seus bancos de dados locais. No entanto, com a expiração de histórico, isso não será possível se os dados solicitados tiverem sido removidos. É no fornecimento desses dados históricos que algumas soluções inovadoras são exigidas.

Uma opção é que os clientes solicitem dados históricos de pares usando uma solução como a Portal Network. A Portal Network é uma rede ponto a ponto em desenvolvimento para fornecer dados históricos, onde cada nó armazena uma pequena parte do histórico do Ethereum, de modo que todo o histórico exista distribuído pela rede. As solicitações são atendidas buscando pares que armazenam os dados relevantes e solicitando-os a eles. Alternativamente, como geralmente são os aplicativos que exigem acesso a dados históricos, pode se tornar responsabilidade deles armazená-los. Também pode haver atores altruístas suficientes no espaço do Ethereum que estariam dispostos a manter arquivos históricos. Poderia ser uma DAO criada para gerenciar o armazenamento de dados históricos ou, idealmente, será uma combinação de todas essas opções. Esses provedores poderiam fornecer os dados de várias maneiras, como em um torrent, FTP, Filecoin ou IPFS.

A expiração de histórico é um tanto controversa porque, até agora, o Ethereum sempre garantiu implicitamente a disponibilidade de quaisquer dados históricos. Uma sincronização completa a partir do bloco gênesis sempre foi possível como padrão, mesmo que dependa da reconstrução de alguns dados mais antigos a partir de instantâneos (snapshots). A expiração de histórico transfere a responsabilidade de fornecer essa garantia para fora do protocolo principal do Ethereum. Isso pode introduzir novos riscos de censura se organizações centralizadas acabarem intervindo para fornecer dados históricos.

A EIP-4444 ainda não está pronta para ser lançada, mas está sob discussão ativa. Curiosamente, os desafios com a EIP-4444 não são tanto técnicos, mas principalmente de gestão da comunidade. Para que isso seja lançado, é necessário o apoio da comunidade, o que inclui não apenas concordância, mas também compromissos de armazenar e fornecer dados históricos de entidades confiáveis.

Essa atualização não muda fundamentalmente a forma como os nós do Ethereum lidam com os dados de estado, apenas muda a forma como os dados históricos são acessados.

### Expiração de estado {#state-expiry}

A expiração de estado refere-se à remoção do estado de nós individuais se ele não tiver sido acessado recentemente. Existem várias maneiras de implementar isso, incluindo:

- **Expiração por aluguel**: cobrar "aluguel" das contas e expirá-las quando o aluguel chegar a zero
- **Expiração por tempo**: tornar as contas inativas se não houver leitura/gravação nessa conta por um determinado período de tempo

A expiração por aluguel pode ser um aluguel direto cobrado das contas para mantê-las no banco de dados de estado ativo. A expiração por tempo pode ser por contagem regressiva a partir da última interação da conta, ou pode ser a expiração periódica de todas as contas. Também pode haver mecanismos que combinem elementos dos modelos baseados em tempo e aluguel, por exemplo, contas individuais persistem no estado ativo se pagarem uma pequena taxa antes da expiração baseada em tempo. Com a expiração de estado, é importante observar que o estado inativo **não é excluído**, ele é apenas armazenado separadamente do estado ativo. O estado inativo pode ser ressuscitado para o estado ativo.

A maneira como isso funcionaria provavelmente seria ter uma árvore de estado para períodos de tempo específicos (talvez ~1 ano). Sempre que um novo período começa, o mesmo acontece com uma árvore de estado completamente nova. Apenas a árvore de estado atual pode ser modificada, todas as outras são imutáveis. Espera-se que os nós do Ethereum mantenham apenas a árvore de estado atual e a mais recente anterior a ela. Isso exige uma maneira de registrar a data e hora de um endereço com o período em que ele existe. Existem [várias maneiras possíveis](https://ethereum-magicians.org/t/types-of-resurrection-metadata-in-state-expiry/6607) de fazer isso, mas a opção principal exige que [os endereços sejam alongados](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485) para acomodar as informações adicionais, com o benefício adicional de que endereços mais longos são muito mais seguros. O item do roteiro que faz isso é chamado de [extensão do espaço de endereço](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485).

De forma semelhante à expiração de histórico, sob a expiração de estado, a responsabilidade de armazenar dados de estado antigos é removida dos usuários individuais e transferida para outras entidades, como provedores centralizados, membros altruístas da comunidade ou soluções descentralizadas mais futuristas, como a Portal Network.

A expiração de estado ainda está na fase de pesquisa e ainda não está pronta para ser lançada. A expiração de estado pode muito bem acontecer depois dos clientes sem estado e da expiração de histórico, porque essas atualizações tornam os grandes tamanhos de estado facilmente gerenciáveis para a maioria dos validadores.

## Ausência de estado {#statelessness-2}

A ausência de estado é um termo um pouco impróprio porque não significa que o conceito de "estado" seja eliminado, mas envolve mudanças na forma como os nós do Ethereum lidam com os dados de estado. A própria ausência de estado vem em dois tipos: ausência de estado fraca e ausência de estado forte. A ausência de estado fraca permite que a maioria dos nós fique sem estado, colocando a responsabilidade pelo armazenamento do estado em alguns poucos. A ausência de estado forte remove completamente a necessidade de qualquer nó armazenar os dados de estado completos. Tanto a ausência de estado fraca quanto a forte oferecem os seguintes benefícios aos validadores normais:

- sincronização quase instantânea
- capacidade de validar blocos fora de ordem
- nós capazes de funcionar com requisitos de hardware muito baixos (por exemplo, em telefones)
- os nós podem ser executados em discos rígidos baratos porque não há necessidade de leitura/gravação em disco
- compatível com futuras atualizações na criptografia do Ethereum

### Ausência de estado fraca {#weak-statelessness}

A ausência de estado fraca envolve mudanças na forma como os nós do Ethereum verificam as mudanças de estado, mas não elimina completamente a necessidade de armazenamento de estado em todos os nós da rede. Em vez disso, a ausência de estado fraca coloca a responsabilidade pelo armazenamento do estado nos propositores de blocos, enquanto todos os outros nós da rede verificam os blocos sem armazenar os dados de estado completos.

**Na ausência de estado fraca, a proposição de blocos exige acesso aos dados de estado completos, mas a verificação de blocos não exige dados de estado**

Para que isso aconteça, as [árvores Verkle](/roadmap/verkle-trees/) já devem ter sido implementadas nos clientes do Ethereum. As árvores Verkle são uma estrutura de dados de substituição para armazenar dados de estado do Ethereum que permitem que "testemunhas" pequenas e de tamanho fixo para os dados sejam passadas entre pares e usadas para verificar blocos em vez de verificar blocos em bancos de dados locais. A [separação propositor-construtor (PBS)](/roadmap/pbs/) também é exigida porque isso permite que os construtores de blocos sejam nós especializados com hardware mais poderoso, e esses são os que exigem acesso aos dados de estado completos.

<ExpandableCard title="Por que não há problema em depender de menos propositores de blocos?" eventCategory="/roadmap/statelessness" eventName="clicked why is it OK to rely on fewer block proposers?">

A ausência de estado depende de construtores de blocos mantendo uma cópia dos dados de estado completos para que possam gerar testemunhas que podem ser usadas para verificar o bloco. Outros nós não precisam de acesso aos dados de estado, todas as informações exigidas para verificar o bloco estão disponíveis na testemunha. Isso cria uma situação em que propor um bloco é caro, mas verificar o bloco é barato, o que implica que menos operadores executarão um nó de proposição de bloco. No entanto, a descentralização dos propositores de blocos não é crítica, desde que o maior número possível de participantes possa verificar de forma independente se os blocos que eles propõem são válidos.

<ButtonLink variant="outline-color" href="https://notes.ethereum.org/WUUUXBKWQXORxpFMlLWy-w#So-why-is-it-ok-to-have-expensive-proposers">Leia mais nas notas de Dankrad</ButtonLink>
</ButtonLink>

Os propositores de blocos usam os dados de estado para criar "testemunhas" - o conjunto mínimo de dados que provam os valores do estado que estão sendo alterados pelas transações em um bloco. Outros validadores não mantêm o estado, eles armazenam apenas a raiz do estado (um hash de todo o estado). Eles recebem um bloco e uma testemunha e os usam para atualizar sua raiz de estado. Isso torna um nó de validação extremamente leve.

A ausência de estado fraca está em um estado avançado de pesquisa, mas depende da separação propositor-construtor e das árvores Verkle terem sido implementadas para que pequenas testemunhas possam ser passadas entre pares. Isso significa que a ausência de estado fraca provavelmente está a alguns anos de distância da Rede Principal do Ethereum.

A [zkEVM para verificação da camada 1 (l1)](/roadmap/zkevm/) é uma tecnologia complementar que pode aprimorar ainda mais a verificação sem estado. Em vez de apenas verificar testemunhas, os validadores poderiam verificar uma prova de conhecimento zero de que todo o bloco foi executado corretamente — fornecendo certeza criptográfica sem reexecutar as transações.

### Ausência de estado forte {#strong-statelessness}

A ausência de estado forte remove a necessidade de qualquer nó armazenar dados de estado. Em vez disso, as transações são enviadas com testemunhas que podem ser agregadas pelos produtores de blocos. Os produtores de blocos são então responsáveis por armazenar apenas o estado necessário para gerar testemunhas para contas relevantes. A responsabilidade pelo estado é quase inteiramente transferida para os usuários, pois eles enviam testemunhas e 'listas de acesso' para declarar com quais contas e chaves de armazenamento estão interagindo. Isso permitiria nós extremamente leves, mas há compensações, incluindo tornar mais difícil a transação com contratos inteligentes.

A ausência de estado forte foi investigada por pesquisadores, mas atualmente não se espera que faça parte do roteiro do Ethereum - é mais provável que a ausência de estado fraca seja suficiente para as necessidades de dimensionamento do Ethereum.

## Progresso atual {#current-progress}

A ausência de estado fraca, a expiração de histórico e a expiração de estado estão todas na fase de pesquisa e devem ser lançadas daqui a vários anos. Não há garantia de que todas essas propostas serão implementadas, por exemplo, se a expiração de estado for implementada primeiro, pode não haver necessidade de implementar também a expiração de histórico. Há também outros itens do roteiro, como as [árvores Verkle](/roadmap/verkle-trees) e a [separação propositor-construtor](/roadmap/pbs), que precisam ser concluídos primeiro.

## Leitura adicional {#further-reading}

- [O que é o Ethereum sem estado?](https://stateless.fyi/)
- [AMA de Vitalik sobre ausência de estado](https://www.reddit.com/r/ethereum/comments/o9s15i/impromptu_technical_ama_on_statelessness_and/)
- [Uma teoria de gerenciamento de tamanho de estado](https://hackmd.io/@vbuterin/state_size_management)
- [Limitação de estado com conflito de ressurreição minimizado](https://ethresear.ch/t/resurrection-conflict-minimized-state-bounding-take-2/8739)
- [Caminhos para a ausência de estado e expiração de estado](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Especificação da EIP-4444](https://eips.ethereum.org/EIPS/eip-4444)
- [Alex Stokes sobre a EIP-4444](https://youtu.be/SfDC_qUZaos)
- [Por que é tão importante ficar sem estado](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html)
- [As notas originais do conceito de cliente sem estado](https://ethresear.ch/t/the-stateless-client-concept/172)
- [Mais sobre a expiração de estado](https://hackmd.io/@vbuterin/state_size_management#A-more-moderate-solution-state-expiry)
- [Ainda mais sobre a expiração de estado](https://hackmd.io/@vbuterin/state_expiry_paths#Option-2-per-epoch-state-expiry)
- [Página de informações do Ethereum sem estado](https://stateless.fyi)