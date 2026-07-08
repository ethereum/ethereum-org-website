---
title: Árvores Verkle
description: Uma descrição de alto nível das árvores Verkle e como elas serão usadas para atualizar o Ethereum
lang: pt-br
summaryPoints:
  - Descubra o que são as árvores Verkle
  - Leia por que as árvores Verkle são uma atualização útil para o Ethereum
---

As árvores Verkle (uma junção de "compromisso de vetor" e "árvores de Merkle") são uma estrutura de dados que pode ser usada para atualizar os nós do [Ethereum](/) para que eles possam parar de armazenar grandes quantidades de dados de estado sem perder a capacidade de validar blocos.

## Ausência de estado {#statelessness}

As árvores Verkle são um passo crítico no caminho para clientes Ethereum sem estado. Clientes sem estado são aqueles que não precisam armazenar todo o banco de dados de estado para validar os blocos recebidos. Em vez de usar sua própria cópia local do estado do Ethereum para verificar blocos, os clientes sem estado usam uma "testemunha" para os dados de estado que chegam com o bloco. Uma testemunha é uma coleção de partes individuais dos dados de estado que são necessárias para executar um conjunto específico de transações, e uma prova criptográfica de que a testemunha é realmente parte dos dados completos. A testemunha é usada _em vez_ do banco de dados de estado. Para que isso funcione, as testemunhas precisam ser muito pequenas, para que possam ser transmitidas com segurança pela rede a tempo de os validadores as processarem dentro de um slot de 12 segundos. A estrutura atual de dados de estado não é adequada porque as testemunhas são muito grandes. As árvores Verkle resolvem esse problema permitindo testemunhas pequenas, removendo uma das principais barreiras para clientes sem estado.

<ExpandableCard title="Por que queremos clientes sem estado?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

Atualmente, os clientes Ethereum usam uma estrutura de dados conhecida como Patricia Merkle Trie para armazenar seus dados de estado. As informações sobre contas individuais são armazenadas como folhas na trie e pares de folhas passam por hash repetidamente até que reste apenas um único hash. Esse hash final é conhecido como "raiz". Para verificar blocos, os clientes Ethereum executam todas as transações em um bloco e atualizam sua trie de estado local. O bloco é considerado válido se a raiz da árvore local for idêntica à fornecida pelo propositor de bloco, porque quaisquer diferenças na computação feita pelo propositor de bloco e pelo nó validador fariam com que o hash raiz fosse completamente diferente. O problema com isso é que a verificação da blockchain exige que cada cliente armazene toda a trie de estado para o bloco principal (head) e vários blocos históricos (o padrão no Geth é manter os dados de estado de 128 blocos atrás do principal). Isso exige que os clientes tenham acesso a uma grande quantidade de espaço em disco, o que é uma barreira para a execução de nós completos em hardware barato e de baixo consumo de energia. Uma solução para isso é atualizar a trie de estado para uma estrutura mais eficiente (árvore Verkle) que pode ser resumida usando uma pequena "testemunha" para os dados que pode ser compartilhada em vez dos dados de estado completos. A reformatação dos dados de estado em uma árvore Verkle é um trampolim para a mudança para clientes sem estado.

</ExpandableCard>

## O que é uma testemunha e por que precisamos delas? {#what-is-a-witness}

Verificar um bloco significa reexecutar as transações contidas no bloco, aplicar as alterações à trie de estado do Ethereum e calcular o novo hash raiz. Um bloco verificado é aquele cujo hash raiz de estado calculado é o mesmo fornecido com o bloco (porque isso significa que o propositor de bloco realmente fez a computação que diz ter feito). Nos clientes Ethereum de hoje, a atualização do estado requer acesso a toda a trie de estado, que é uma grande estrutura de dados que deve ser armazenada localmente. Uma testemunha contém apenas os fragmentos dos dados de estado que são necessários para executar as transações no bloco. Um validador pode então usar apenas esses fragmentos para verificar se o propositor de bloco executou as transações do bloco e atualizou o estado corretamente. No entanto, isso significa que a testemunha precisa ser transferida entre pares na rede Ethereum com rapidez suficiente para ser recebida e processada por cada nó com segurança dentro de um slot de 12 segundos. Se a testemunha for muito grande, pode levar muito tempo para alguns nós fazerem o download e acompanharem a cadeia. Essa é uma força centralizadora porque significa que apenas nós com conexões rápidas de internet podem participar da validação de blocos. Com as árvores Verkle, não há necessidade de ter o estado armazenado em seu disco rígido; _tudo_ o que você precisa para verificar um bloco está contido no próprio bloco. Infelizmente, as testemunhas que podem ser produzidas a partir de tries de Merkle são muito grandes para suportar clientes sem estado.

## Por que as árvores Verkle permitem testemunhas menores? {#why-do-verkle-trees-enable-smaller-witnesses}

A estrutura de uma Trie de Merkle torna os tamanhos das testemunhas muito grandes - grandes demais para serem transmitidos com segurança entre pares dentro de um slot de 12 segundos. Isso ocorre porque a testemunha é um caminho que conecta os dados, que são mantidos em folhas, ao hash raiz. Para verificar os dados, é necessário ter não apenas todos os hashes intermediários que conectam cada folha à raiz, mas também todos os nós "irmãos". Cada nó na prova tem um irmão com o qual passa por hash para criar o próximo hash na trie. Isso é muita informação. As árvores Verkle reduzem o tamanho da testemunha encurtando a distância entre as folhas da árvore e sua raiz e também eliminando a necessidade de fornecer nós irmãos para verificar o hash raiz. Ainda mais eficiência de espaço será obtida usando um poderoso esquema de compromisso polinomial em vez do compromisso de vetor no estilo hash. O compromisso polinomial permite que a testemunha tenha um tamanho fixo, independentemente do número de folhas que ela prova.

Sob o esquema de compromisso polinomial, as testemunhas têm tamanhos gerenciáveis que podem ser facilmente transferidos na rede ponto a ponto. Isso permite que os clientes verifiquem as alterações de estado em cada bloco com uma quantidade mínima de dados.

<ExpandableCard title="Exatamente quanto as árvores Verkle podem reduzir o tamanho da testemunha?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

O tamanho da testemunha varia dependendo do número de folhas que ela inclui. Supondo que a testemunha cubra 1000 folhas, uma testemunha para uma trie de Merkle teria cerca de 3,5 MB (supondo 7 níveis para a trie). Uma testemunha para os mesmos dados em uma árvore Verkle (supondo 4 níveis para a árvore) teria cerca de 150 kB - **cerca de 23 vezes menor**. Essa redução no tamanho da testemunha permitirá que as testemunhas de clientes sem estado sejam aceitavelmente pequenas. As testemunhas polinomiais têm de 0,128 a 1 kB, dependendo de qual compromisso polinomial específico é usado.

</ExpandableCard>

## Qual é a estrutura de uma árvore Verkle? {#what-is-the-structure-of-a-verkle-tree}

As árvores Verkle são pares `(key,value)` onde as chaves são elementos de 32 bytes compostos por um _tronco_ de 31 bytes e um _sufixo_ de um único byte. Essas chaves são organizadas em nós de _extensão_ e nós _internos_. Os nós de extensão representam um único tronco para 256 filhos com sufixos diferentes. Os nós internos também têm 256 filhos, mas podem ser outros nós de extensão. A principal diferença entre a estrutura da árvore Verkle e da árvore de Merkle é que a árvore Verkle é muito mais plana, o que significa que há menos nós intermediários ligando uma folha à raiz e, portanto, menos dados necessários para gerar uma prova.

![Diagram of a Verkle tree data structure](./verkle.png)

[Leia mais sobre a estrutura das árvores Verkle](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## Progresso atual {#current-progress}

As redes de teste de árvores Verkle já estão em funcionamento, mas ainda há atualizações pendentes substanciais para os clientes que são necessárias para suportar as árvores Verkle. Você pode ajudar a acelerar o progresso implantando contratos nas redes de teste ou executando clientes de rede de teste.

[Assista a Guillaume Ballet explicar a rede de teste Condrieu Verkle](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (observe que a rede de teste Condrieu era de Prova de Trabalho (PoW) e agora foi substituída pela rede de teste Verkle Gen Devnet 6).

## Leitura adicional {#further-reading}

- [Árvores Verkle para ausência de estado](https://verkle.info/)
- [Dankrad Feist explica as árvores Verkle no PEEPanEIP](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Árvores Verkle para o resto de nós](https://web.archive.org/web/20250124132255/https://research.2077.xyz/verkle-trees)
- [Anatomia de uma prova Verkle](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
- [Guillaume Ballet explica as árvores Verkle na ETHGlobal](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- ["Como as árvores Verkle tornam o Ethereum enxuto e eficiente" por Guillaume Ballet na Devcon 6](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam sobre clientes sem estado na ETHDenver 2020](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Feist explica as árvores Verkle e a ausência de estado no podcast Zero Knowledge](https://zeroknowledge.fm/podcast/202/)
- [Vitalik Buterin sobre as árvores Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist sobre as árvores Verkle](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [Documentação da EIP da árvore Verkle](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)