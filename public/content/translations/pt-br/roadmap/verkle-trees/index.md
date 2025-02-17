---
title: Árvores de Verkle
description: Uma descrição detalhada de Verkle Trees e como elas serão utilizadas na melhoria do Ethereum
lang: pt-br
summaryPoints:
  - Saiba o que são Verkle Trees
  - Leia por que Verkle Trees são uma melhoria útil para o Ethereum
---

# Árvores de Verkle {#verkle-trees}

As Verkle Trees (um composto de "Vector commitment" e "Merkle Trees") são uma estrutura de dados que pode ser usada para melhorar os nós do Ethereum para que possam parar de armazenar grandes quantidades de dados de estado sem perder a capacidade de validar blocos.

## Sem estado {#statelessness}

As Verkle Trees são uma etapa essencial no caminho para clientes Ethereum sem estado. Os clientes sem estado são aqueles que não precisam armazenar todo o banco de dados de estado para validar os blocos recebidos. Em vez de usar a própria cópia local do estado do Ethereum para verificar os blocos, os clientes sem estado usam uma "testemunha" dos dados de estado que chegam com o bloco. Uma testemunha é uma coleção de partes individuais dos dados de estado necessários para executar um conjunto específico de transações e uma prova criptográfica de que a testemunha é realmente parte dos dados completos. A testemunha é usada _em vez_ do banco de dados do estado. Para que isso funcione, as testemunhas precisam ser muito pequenas, de modo que possam ser transmitidas com segurança pela rede a tempo de serem processadas pelos validadores em um espaço de 12 segundos. A estrutura de dados de estado atual não é adequada, porque as testemunhas são muito grandes. As Verkle Trees resolvem esse problema ao permitir testemunhas pequenas, removendo uma das principais barreiras aos clientes sem estado.

<ExpandableCard title="Por que queremos clientes sem estado?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

Atualmente, os clientes Ethereum usam uma estrutura de dados conhecida como Patricia Merkle Trie para armazenar os dados de estado. As informações sobre contas individuais são armazenadas como folhas na "trie", e os pares de folhas são transformados em hash repetidamente até que fique apenas um único hash. Esse hash final é conhecido como "root" (raiz). Para verificar os blocos, os clientes Ethereum executam todas as transações em um bloco e atualizam a "trie" de estado local. O bloco é considerado válido se a raiz da árvore local for idêntica à fornecida pelo proponente do bloco, pois qualquer diferença no cálculo feito pelo proponente do bloco e pelo nó de validação faria com que o hash da raiz fosse completamente diferente. O problema com isso é que a verificação da cadeia de blocos exige que cada cliente armazene toda a "trie" de estado do bloco principal e em diversos blocos históricos (o padrão no Geth é manter os dados de estado de 128 blocos atrás do principal). Isso exige que os clientes tenham acesso a uma grande quantidade de espaço em disco, o que é uma barreira para a execução de nós completos em hardware barato e de baixo consumo de energia. Uma solução para isso é atualizar a "trie" de estado para uma estrutura mais eficiente (Verkle Tree) que pode ser resumida usando uma pequena "testemunha" dos dados que podem ser compartilhados, em vez dos dados de estado completos. A reformatação dos dados de estado em uma Verkle Tree é uma porta de entrada para a mudança para clientes sem estado.

</ExpandableCard>

## O que é uma testemunha e por que precisamos dela? {#what-is-a-witness}

A verificação de um bloco significa reexecutar as transações contidas no bloco, aplicar as alterações na trie de estado do Ethereum e calcular o novo hash raiz. Um bloco verificado é aquele cujo hash raiz de estado calculado é idêntico ao fornecido com o bloco (porque isso significa que o proponente do bloco realmente fez o cálculo que diz ter feito). Nos clientes Ethereum atuais, a atualização do estado exige acesso a toda a trie do estado, que é uma estrutura de dados grande que precisa ser armazenada localmente. Uma testemunha contém apenas os fragmentos dos dados de estado necessários para executar as transações no bloco. Um validador pode usar apenas esses fragmentos para verificar se o proponente do bloco executou as transações do bloco e atualizou o estado corretamente. Entretanto, isso significa que a testemunha precisa ser transferida entre pares na rede Ethereum com rapidez suficiente para ser recebida e processada por cada nó com segurança, em um espaço de 12 segundos. Se a testemunha for muito grande, alguns nós poderão levar muito tempo para fazer o download e acompanhar a cadeia. Essa é uma força centralizadora, pois significa que apenas nós com conexões rápidas à Internet podem participar da validação de blocos. Com as Verkle Trees, não há necessidade de ter o estado armazenado no disco rígido local; _tudo_ que você precisa para verificar um bloco está no próprio bloco. Infelizmente, as testemunhas que podem ser produzidas a partir de Merkle tries são muito grandes para suportar clientes sem estado.

## Por que as Verkle Trees permitem testemunhas menores? {#why-do-verkle-trees-enable-smaller-witnesses}

A estrutura de uma Merkle Trie faz com que as testemunhas sejam muito grandes, grandes demais para serem transmitidas com segurança entre pares em um espaço de 12 segundos. Isso ocorre porque a testemunha é um caminho que conecta os dados, que são mantidos nas folhas, ao hash raiz. Para verificar os dados, é necessário ter não apenas todos os hashes intermediários que conectam cada folha à raiz, mas também todos os nós "irmãos". Cada nó na prova tem um irmão com o qual é feito o hash para criar o próximo hash na trie. São muitos dados. As Verkle Trees reduzem o tamanho da testemunha ao reduzir a distância entre as folhas da árvore e sua raiz, bem como ao eliminar a necessidade de fornecer nós irmãos para verificar o hash raiz. Será possível obter ainda mais eficiência de espaço usando um esquema eficiente de compromisso polinomial em vez do compromisso vetorial no estilo hash. O compromisso polinomial permite que a testemunha tenha um tamanho fixo, independentemente do número de folhas que ela comprove.

No esquema de compromisso polinomial, as testemunhas têm tamanhos gerenciáveis que podem ser facilmente transferidos na rede ponto a ponto. Isso permite que os clientes verifiquem as alterações de estado em cada bloco com uma quantidade mínima de dados.

<ExpandableCard title="Em que nível as Verkle Trees podem reduzir o tamanho da testemunha?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

O tamanho da testemunha varia de acordo com o respectivo número de folhas. Se a testemunha tiver mil folhas, uma testemunha de uma Merkle Trie terá aproximadamente 3,5 MB (supondo 7 níveis para a trie). Uma testemunha dos mesmos dados em uma Verkle Tree (supondo 4 níveis para a árvore) teria cerca de 150 kB, **aproximadamente 23 vezes menor**. Essa redução no tamanho da testemunha permitirá que as testemunhas de clientes sem estado sejam aceitavelmente pequenas. As testemunhas polinomiais são de 0,128 -1 kB, dependendo do compromisso polinomial específico usado.

</ExpandableCard>

## Qual é a estrutura de uma Verkle Tree? {#what-is-the-structure-of-a-verkle-tree}

As Verkle Trees são pares `(chave, valor)` em que as chaves são elementos de 32 bytes compostos por uma _stem_ (haste) de 31 bytes e um _sufixo_ de um byte. Essas chaves são organizadas em nós de _extensão_ e nós _internos_. Os nós de extensão representam uma única haste para 256 filhos com sufixos diferentes. Os nós internos também têm 256 filhos, mas eles podem ser outros nós de extensão. A principal diferença entre a Verkle Tress e a estrutura da Merkle Tree é que a de Verkle é muito mais plana, o que significa que há menos nós intermediários ligando uma folha à raiz e, portanto, menos dados necessários para gerar uma prova.

![](./verkle.png)

[Leia mais sobre a estrutura das Verkle Trees](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## Progresso atual {#current-progress}

As redes de testes de Verkle Trees já estão em execução, mas ainda há atualizações pendentes consideráveis em clientes que são necessárias para oferecer suporte às Verkle Trees. Você pode ajudar a acelerar o progresso por meio da implantação de contratos nas redes de testes ou da execução de clientes de rede de testes.

[Explore a rede de teste Verkle Gen Devnet 6](https://verkle-gen-devnet-6.ethpandaops.io/)

[Assista a Guillaume Ballet explicar a rede de teste Condrieu Verkle](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (observe que a rede de teste Condrieu era uma prova de trabalho e agora foi substituída pela rede de teste Verkle Gen Devnet 6).

## Leitura adicional {#further-reading}

- [Árvores Verkle para falta de estado](https://verkle.info/)
- [Dankrad Feist explica as Verkle Trees no PEEPanEIP](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Guillaume Ballet explica árvores de Verkle no ETHGlobal](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- ["Como as Verkle Trees tornam o Ethereum simples e eficiente", por Guillaume Ballet na Devcon 6](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam sobre clientes sem estado da ETHDenver 2020](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Fiest explica as árvores Verkle e a falta de estado no podcast da Zero Knowledge](https://zeroknowledge.fm/episode-202-stateless-ethereum-verkle-tries-with-dankrad-feist/)
- [Vitalik Buterin sobre Verkle Trees](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist sobre Verkle Trees](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [Documentação de EIO da Verkle Tree](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)
