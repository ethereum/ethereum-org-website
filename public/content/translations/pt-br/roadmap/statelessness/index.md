---
title: Sem estado, expiração do estado e expiração do histórico
description: Explicação sobre a expiração do histórico e o Ethereum sem estado
lang: pt-br
---

# Sem estado, expiração do estado e expiração do histórico {#statelessness}

A capacidade de executar nós Ethereum em hardware modesto é fundamental para uma verdadeira descentralização. Isso porque a execução de um nó permite que os usuários verifiquem as informações por meio da execução de verificações criptográficas de forma independente, em vez de confiar em terceiros para fornecer os dados. A execução de um nó permite que os usuários enviem transações diretamente para a rede ponto a ponto do Ethereum, em vez de precisarem confiar em um intermediário. A descentralização não será possível se esses benefícios estiverem disponíveis apenas para usuários com hardware caro. Em vez disso, os nós devem ser capazes de funcionar com requisitos de processamento e memória extremamente modestos, para que possam ser executados em celulares, microcomputadores ou de forma imperceptível em um computador doméstico.

Atualmente, os altos requisitos de espaço em disco são a principal barreira que impede o acesso universal aos nós. Isso se deve principalmente à necessidade de armazenar grandes partes dos dados de estado do Ethereum. Esses dados de estado contêm informações essenciais necessárias para processar corretamente novos blocos e transações. No momento da redação deste artigo, recomenda-se um SSD rápido de 2 TB para executar um nó Ethereum completo. Para um nó que não remove os dados mais antigos, o requisito de armazenamento aumenta em cerca de 14 GB/semana, e os nós de arquivamento que armazenam todos os dados desde o início estão se aproximando de 12 TB (no momento da redação deste artigo, em fevereiro de 2023).

Discos rígidos mais baratos podem ser utilizados para armazenar dados mais antigos, mas eles são muito lentos para acompanhar os blocos recebidos. Manter os modelos de armazenamento atuais para os clientes e, ao mesmo tempo, tornar os dados mais baratos e mais fáceis de armazenar é apenas uma solução temporária e parcial para o problema, porque o crescimento do estado do Ethereum é "ilimitado", o que significa que os requisitos de armazenamento só podem aumentar, e as melhorias tecnológicas sempre precisarão acompanhar o ritmo do crescimento contínuo do estado. Em vez disso, os clientes precisam encontrar novas maneiras de verificar blocos e transações que não dependam da busca de dados em bancos de dados locais.

## Redução do armazenamento para os nós {#reducing-storage-for-nodes}

Há várias maneiras de reduzir a quantidade de dados que cada nó precisa armazenar, e cada uma exige que o protocolo principal do Ethereum seja atualizado em uma extensão diferente:

- **Expiração do histórico**: habilita os nós para descartar dados de estado mais antigos que X blocos, mas não muda a maneira como o cliente Ethereum processa os dados de estado.
- **Expiração do estado**: permite que os dados de estado que não são usados com frequência se tornem inativos. Os clientes podem ignorar os dados inativos até que sejam "ressuscitados".
- **Sem estado fraco**: apenas os produtores de blocos precisam acessar os dados de estado completos, outros nós podem verificar blocos sem um banco de dados de estado local.
- **Sem estado forte**: nenhum nó precisa de acesso aos dados de estado completos.

## Expiração de dados {#data-expiry}

### Expiração do histórico {#history-expiry}

A expiração do histórico se refere à eliminação, pelos clientes, de dados mais antigos que provavelmente não serão necessários, de forma a armazenarem apenas uma pequena quantidade de dados históricos, descartando os dados mais antigos quando chegam dados novos. Há dois motivos pelos quais os clientes precisam de dados históricos: sincronização e atendimento de solicitações de dados. Originalmente, os clientes tinham que sincronizar a partir do bloco de início, verificando se cada bloco sucessivo estava correto até o início da cadeia. Atualmente, os clientes usam "pontos de verificação de subjetividade fraca" para chegar ao início da cadeia. Esses pontos de verificação são pontos de partida confiáveis, como ter um bloco de início perto do momento presente em vez de no início do Ethereum. Isso significa que os clientes podem "descartar" todas as informações anteriores ao ponto de verificação de subjetividade fraca mais recente sem perder a capacidade de sincronizar com o início da cadeia. Atualmente, os clientes atendem a solicitações (que chegam por meio de JSON-RPC) de dados históricos, obtendo-os junto aos respectivos bancos de dados locais. Entretanto, com a expiração do histórico, isso não será possível se os dados solicitados tiverem sido eliminados. Para atender a esses dados históricos, são necessárias algumas soluções inovadoras.

Uma opção é os clientes solicitarem dados históricos de pares usando uma solução como o Portal Network. O Portal Network é uma rede ponto a ponto em desenvolvimento para o atendimento a dados históricos, em que cada nó armazena uma pequena parte do histórico do Ethereum, de modo que todo o histórico seja distribuído pela rede. As solicitações são atendidas por meio da busca de pares que armazenam os dados relevantes e enviando uma solicitação a eles. Alternativamente, como geralmente são os aplicativos que exigem acesso a dados históricos, pode ser responsabilidade deles armazená-los. Também pode haver participantes suficientemente altruístas no espaço Ethereum que estariam dispostos a manter arquivos históricos. Pode ser uma DAO que se desenvolve para gerenciar o armazenamento de dados históricos ou, idealmente, será uma combinação de todas essas opções. Esses provedores poderiam fornecer os dados de muitas maneiras, como por meio de um torrent, FTP, Filecoin ou IPFS.

A expiração do histórico é um tanto controversa porque até agora o Ethereum sempre garantiu implicitamente a disponibilidade de quaisquer dados históricos. Uma sincronização completa a partir do início sempre foi possível como padrão, mesmo que dependa da reconstrução de alguns dados mais antigos a partir de snapshots. A expiração do histórico transfere a responsabilidade de fornecer essa garantia para fora do protocolo principal do Ethereum. Se as organizações centralizadas acabarem entrando em cena para fornecer dados históricos, isso pode introduzir novos riscos de censura.

O EIP-4444 ainda não está pronto para implementação, mas está sendo discutido ativamente. É interessante notar que os desafios do EIP-4444 não são muito técnicos, mas principalmente de gerenciamento da comunidade. Para que isso seja implementado, é necessário que a comunidade se comprometa não apenas com a concordância, mas também com o armazenamento e o fornecimento de dados históricos a partir de entidades confiáveis.

Essa melhoria não altera fundamentalmente como os nós Ethereum processam os dados de estado, apenas muda como os dados históricos são acessados.

### Expiração do estado {#state-expiry}

A expiração do estado se refere à remoção do estado dos nós individuais, se o nó não tiver sido acessado recentemente. Há várias maneiras de implementar isso, incluindo:

- **Expiração por locação**: cobrar "aluguel" das contas e expirar o estado assim que o valor da locação chegar a zero
- **Expiração por tempo**: desativar as contas se não houver leitura/escrita na conta por algum período específico

A expiração por locação poderia ser um aluguel direto cobrado das contas para mantê-las no banco de dados de estado ativo. A expiração por tempo poderia ser por meio de uma contagem regressiva a partir da interação mais recente com a conta, ou poderia ser uma expiração periódica de todas as contas. Também pode haver mecanismos que combinem elementos dos modelos baseados em tempo e em aluguel, por exemplo, contas individuais continuam no estado ativo se pagarem uma pequena taxa antes da expiração com base em tempo. Com a expiração do estado, é importante observar que o estado inativo **não é excluído**, ele é apenas armazenado em separado do estado ativo. O estado inativo pode ser "ressuscitado" para estado ativo.

A maneira como isso funcionaria provavelmente seria ter uma árvore de estado para períodos específicos (talvez cerca de 1 ano). Sempre que um novo período começa, também começa uma árvore de estado completamente nova. Apenas a árvore de estado atual pode ser alterada, todas as outras permanecem inalteráveis. Espera-se que os nós Ethereum mantenham apenas a árvore do estado atual e o próximo mais recente. Isso exige uma maneira de aplicar o carimbo de data/hora de um endereço com o período em que se encontra. Existem [várias maneiras possíveis](https://ethereum-magicians.org/t/types-of-resurrection-metadata-in-state-expiry/6607) de fazer isso, mas a principal opção exige que [os endereços sejam ampliados](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485) para acomodar as informações adicionais, com o benefício adicional de que endereços mais longos são muito mais seguros. O item do planejamento que faz isso é chamado [extensão do espaço do endereço](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485).

Da mesma forma que a expiração do histórico, na expiração do estado a responsabilidade pelo armazenamento de dados do estado antigo é removida dos usuários individuais e transferida para outras entidades, como provedores centralizados, membros altruístas da comunidade ou soluções descentralizadas mais futuristas, como a Portal Network.

A expiração de estado ainda está em fase de pesquisa e ainda não está pronta para implementação. A expiração do estado pode ocorrer mais tarde do que a dos clientes sem estado e a expiração do histórico, porque essas melhorias fazem com que a maioria dos validadores possam gerenciar facilmente grandes tamanhos de estado.

## Sem estado {#statelessness}

O termo "sem estado" é um tanto equivocado, pois não significa que o conceito de "estado" seja eliminado, mas envolve alterações na maneira como os nós Ethereum processam os dados de estado. O conceito de "sem estado" ocorre em duas formas: sem estado fraco e sem estado forte. Sem estado fraco permite que a maioria dos nós se torne sem estado e coloca a responsabilidade pelo armazenamento do estado em alguns poucos nós. Sem estado forte remove completamente a necessidade de qualquer nó armazenar os dados de estado completos. Ambos os conceitos, sem estado fraco e forte, oferecem os seguintes benefícios aos validadores normais:

- sincronização quase instantânea
- capacidade de validar blocos fora de ordem
- os nós podem ser executados com requisitos de hardware muito baixos (por exemplo, no celular)
- os nós podem ser executados em discos rígidos baratos, porque não há necessidade de leitura/escrita de disco
- compatível com melhorias futuras da criptografia do Ethereum

### Sem estado fraco {#weak-statelessness}

Sem estado fraco envolve alterações na maneira como os nós Ethereum verificam as alterações do estado, mas não elimina completamente a necessidade de armazenamento do estado em todos os nós da rede. Em vez disso, sem estado fraco coloca a responsabilidade pelo armazenamento do estado nos proponentes de bloco, enquanto todos os outros nós da rede verificam os blocos sem armazenar os dados do estado completos.

**Em sem estado fraco, propor blocos exige acesso a dados de estado completos, mas verificar blocos não exige dados do estado**

Para que isso aconteça, [Verkle Trees](/roadmap/verkle-trees/) já devem ter sido implementadas nos clientes Ethereum. As Verkle Trees são uma estrutura de dados de substituição para armazenar dados de estado do Ethereum que permitem que "testemunhas" pequenas e de tamanho fixo dos dados sejam transmitidas entre pares e utilizadas para verificar blocos, em vez de verificar blocos com relação aos bancos de dados locais. A [separação entre proponente e construtor](/roadmap/pbs/) também é necessária, porque isso permite que os construtores de blocos sejam nós especializados com hardware mais poderoso, e esses são os que exigem acesso aos dados de estado completos.

<ExpandableCard title="Por que é adequado depender de menos proponentes de blocos?" eventCategory="/roadmap/statelessness" eventName="clicked why is it OK to rely on fewer block proposers?">

O conceito sem estado depende de os construtores de blocos manterem uma cópia dos dados do estado completos para que possam gerar testemunhas que possam ser utilizadas para verificar o bloco. Outros nós não precisam de acesso aos dados do estado. Todas as informações necessárias para verificar o bloco estão disponíveis na testemunha. Isso cria uma situação em que propor um bloco é caro, mas a verificação do bloco é barata, o que implica que menos operadores executarão um nó de proposta de bloco. Entretanto, a descentralização dos proponentes de blocos não é essencial, desde que o maior número possível de participantes possa verificar, de maneira independente, se os blocos propostos são válidos.

<ButtonLink variant="outline-color" href="https://notes.ethereum.org/WUUUXBKWQXORxpFMlLWy-w#So-why-is-it-ok-to-have-expensive-proposers">Leia mais sobre as observações de Dankrad</ButtonLink>
</ExpandableCard>

Os proponentes de blocos usam os dados de estado para criar "testemunhas", o conjunto mínimo de dados que provam os valores do estado que estão sendo alterados pelas transações em um bloco. Outros validadores não mantêm o estado, eles apenas armazenam a raiz do estado (um hash do estado inteiro). Eles recebem um bloco e uma testemunha, e utilizam esses elementos para atualizar a raiz do estado. Isso faz com que um nó de validação fique extremamente leve.

O conceito "sem estado fraco" está em um estado avançado de pesquisa, mas depende da implementação da separação entre proponente e construtor e das Verkle Trees para que as pequenas testemunhas possam ser transferidas entre os pares. Isso significa que provavelmente ainda vai demorar alguns anos para a implementação do conceito "sem estado fraco" na rede principal do Ethereum.

### Sem estado forte {#strong-statelessness}

A forte ausência de estado elimina a necessidade de qualquer nó armazenar dados de estado. Em vez disso, as transações são enviadas com testemunhas que podem ser agregadas pelos produtores de blocos. Portanto, os produtores de blocos serão responsáveis por armazenar apenas o estado necessário para gerar testemunhas para as contas relevantes. A responsabilidade pelo estado é quase totalmente transferida para os usuários, pois eles enviam testemunhas e "listas de acesso" para declarar com quais contas e chaves de armazenamento estão interagindo. Embora isso permitiria nódulos altamente leves, seria mais difícil realizar trtansações conm contratos inteligentes.

O conceito "sem estado forte" foi investigado por pesquisadores, mas atualmente não se espera que faça parte do planejamento do Ethereum. É mais provável que o sem estado fraco seja suficiente para as necessidades de escalabilidade do Ethereum.

## Progresso atual {#current-progress}

Sem estado fraco, expiração do histórico e expiração do estado estão em fase de pesquisa e devem ser implementados daqui a vários anos. Não há garantia de que todas essas propostas serão implementadas. Por exemplo, se a expiração do estado for implementada primeiro, talvez não seja necessário implementar também a expiração do histórico. Há também outros itens do planejamento, como [Verkle Trees](/roadmap/verkle-trees) e [separação entre proponente e construtor](/roadmap/pbs), que precisam ser concluídos primeiro.

## Leitura adicional {#further-reading}

- [AMA sem estado, Vitalik](https://www.reddit.com/r/ethereum/comments/o9s15i/impromptu_technical_ama_on_statelessness_and/)
- [Uma teoria de gerenciamento do tamanho do estado](https://hackmd.io/@vbuterin/state_size_management)
- [Limitação do estado minimizado por conflito de "ressurreição"](https://ethresear.ch/t/resurrection-conflict-minimized-state-bounding-take-2/8739)
- [Caminhos para "sem estado" e expiração do estado](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Especificação EIP-4444](https://eips.ethereum.org/EIPS/eip-4444)
- [Alex Stokes sobre EIP-4444](https://youtu.be/SfDC_qUZaos)
- [Por que é tão importante implementar o conceito "sem estado"](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html)
- [Observações sobre o conceito do cliente sem estado original](https://ethresear.ch/t/the-stateless-client-concept/172)
- [Mais sobre expiração do estado](https://hackmd.io/@vbuterin/state_size_management#A-more-moderate-solution-state-expiry)
- [Ainda mais sobre expiração do estado](https://hackmd.io/@vbuterin/state_expiry_paths#Option-2-per-epoch-state-expiry)
