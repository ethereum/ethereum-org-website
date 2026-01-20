---
title: Danksharding
description: Saiba mais sobre Proto-Danksharding e Danksharding, duas melhorias sequenciais para a escalabilidade do Ethereum.
lang: pt-br
summaryPoints:
  - Danksharding é uma melhoria em diversas fases para melhorar a escalabilidade e a capacidade do Ethereum.
  - A primeira fase, Proto-Danksharding, adiciona blobs de dados aos blocos
  - Os blods de dados oferecem uma maneira mais barata para os rollups publicarem dados no Ethereum e esses custos podem ser repassados aos usuários na forma de taxas de transação mais baixas.
  - Posteriormente, o Danksharding completo distribuirá a responsabilidade pela verificação dos blobs de dados em subconjuntos de nós, o que dimensionará ainda mais o Ethereum para mais de 100.000 transações por segundo.
---

# Danksharding {#danksharding}

**Danksharding** é a forma como o Ethereum se torna um blockchain verdadeiramente escalável, mas são necessárias várias melhorias de protocolo para chegar lá. **Proto-Danksharding** é uma etapa intermediária ao longo do caminho. Ambos têm como objetivo tornar as transações na Camada 2 o mais baratas possível para os usuários e devem escalar o Ethereum para mais de 100.000 transações por segundo.

## O que é Proto-Danksharding? {#what-is-protodanksharding}

O Proto-Danksharding, também conhecido como [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), é uma forma de os [rollups](/layer-2/#rollups) adicionarem dados mais baratos aos blocos. O nome vem dos dois pesquisadores que propuseram a ideia: Dankrad Feist e Protolambda. Historicamente, os rollups eram limitados no quão baratas podiam tornar as transações do usuário, pelo fato de publicarem suas transações em `CALLDATA`.

Isso é caro porque é processado por todos os nós do Ethereum e permanece on-chain para sempre, embora os rollups precisem dos dados apenas por um curto período. Proto-Danksharding introduz blobs de dados que podem ser enviados e anexados aos blocos. Os dados nesses blobs não são acessíveis para a EVM e são automaticamente excluídos depois de um período fixo (configurado para 4.096 épocas, quanto este artigo estava sendo escrito, ou cerca de 18 dias). Isso significa que os rollups podem enviar os dados de uma maneira muito mais barata e repassar a economia aos usuários finais na forma de transações mais baratas.

<ExpandableCard title="Why do blobs make rollups cheaper?" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

Rollups são uma maneira de escalar o Ethereum agrupando transações off-chain e depois publicando os resultados no Ethereum. Um rollup é composto essencialmente de duas partes: dados e verificação de execução. Os dados são a sequência completa de transações que está sendo processada por um rollup para gerar a alteração de estado que está sendo publicada no Ethereum. A verificação da execução é a reexecução dessas transações por um participante honesto (um "provador") para garantir que a alteração de estado proposta está correta. Para realizar a verificação de execução, os dados da transação precisam estar disponíveis por tempo suficiente para que qualquer pessoa possa fazer o download e verificar. Isso significa que qualquer comportamento desonesto do sequenciador de rollup pode ser identificado e contestado pelo provador. Entretanto, os dados não precisam ficar disponíveis para sempre.

</ExpandableCard>

<ExpandableCard title="Why is it OK to delete the blob data?" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

Os rollups publicam commits com seus dados de transações on-chain e também disponibilizam os dados disponíveis em blobs de dados. Isso significa que os provadores podem verificar se os compromissos são válidos ou contestar os dados que acham que estão errados. No nível do nó, os blobs de dados são mantidos no cliente de consenso. Os clientes de consenso atestam que viram os dados e que eles foram propagados pela rede. Se os dados fossem mantidos para sempre, o volume desses clientes alcançaria um tamanho excessivo e seriam necessários grandes requisitos de hardware para a execução dos nós. Em vez disso, os dados são automaticamente apagados do nó a cada 18 dias. As atestações de clientes de consenso demonstram que houve oportunidade suficiente para que os provadores verificassem os dados. Os dados reais podem ser armazenados offchain por operadores de rollup, usuários ou outros.

</ExpandableCard>

### Como os dados do blob são verificados? {#how-are-blobs-verified}

Os rollups publicam as transações que executam em blobs de dados. Também publicam um "compromisso" com os dados. Isso é feito por meio do ajuste de uma função polinomial aos dados. Em seguida, essa função pode ser avaliada em diversos pontos. Por exemplo, se definirmos uma função extremamente simples `f(x) = 2x-1`, podemos avaliar essa função para `x = 1`, `x = 2`, `x = 3`, obtendo os resultados `1, 3, 5`. Um provador aplica a mesma função aos dados e a avalia nos mesmos pontos. Se os dados originais forem alterados, a função não será idêntica e, portanto, os valores avaliados em cada ponto também não serão. Na realidade, o compromisso e a prova são mais complicados porque estão "envolvidos" em funções criptográficas.

### O que é KZG? {#what-is-kzg}

KZG é a sigla para Kate-Zaverucha-Goldberg — os nomes dos três [autores originais](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11) de um esquema que reduz um blob de dados a um pequeno ["compromisso" criptográfico](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html). O blob de dados enviado por um rollup precisa ser verificado para garantir que o comportamento do rollup seja correto. Isso envolve um provador que reexecuta as transações no blob para verificar se o compromisso foi válido. Isso é conceitualmente idêntico à maneira como os clientes de execução verificam a validade das transações do Ethereum na camada 1 por meio de provas de Merkle. KZG é uma prova alternativa que ajusta uma equação polinomial aos dados. O compromisso avalia a equação polinomial em alguns pontos de dados secretos. Um provador ajustaria a mesma equação polinomial nos dados e a avaliaria com os mesmos valores, verificando se o resultado é o mesmo. Essa é uma maneira de verificar os dados que é compatível com as técnicas de conhecimento zero utilizadas por alguns rollups e, eventualmente, outras partes do protocolo Ethereum.

### O que foi a cerimônia KZG? {#what-is-a-kzg-ceremony}

A cerimônia KZG foi uma forma de muitas pessoas da comunidade Ethereum gerar coletivamente uma sequência secreta de números aleatórios que poderia ser usada para verificar alguns dados. É muito importante que essa sequência de números não seja conhecida e não possa ser recriada por ninguém. Para garantir isso, cada pessoa que participou da cerimônia recebeu uma sequência do participante anterior. Eles então criaram alguns novos valores aleatórios (p. ex., permitindo que seu navegador medisse o movimento do mouse) e os misturaram com o valor anterior. O valor foi então enviado ao próximo participante e destruído na máquina local. Enquanto cada pessoa na cerimônia fizesse isso honestamente, o valor final ficaria desconhecido por um atacante.

A cerimônia KZG EIP-4844 foi aberta ao público e dezenas de milhares de pessoas participaram para adicionar sua própria entropia (aleatoriedade). No total foram mais de 140.000 contribuições, fazendo dela a maior cerimônia desse tipo. Para que a cerimônia fosse prejudicada, 100% dos participantes teriam que ser ativamente desonestos. Do ponto de vista dos participantes, se eles sabem que foram honestos, não há necessidade de confiar em mais ninguém, pois eles sabem que protegeram a cerimônia (eles atenderam individualmente ao requisito de 1 de N participantes honestos).

<ExpandableCard title="What is the random number from the KZG ceremony used for?" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

Quando um rollup publica dados em um blob, ele fornece uma "garantia" de publicação na on-chain. Esse compromisso é o resultado da avaliação de um ajuste polinomial aos dados em pontos específicos. Esses pontos são definidos pelos números aleatórios gerados na cerimônia KZG. Em seguida, os provadores podem avaliar o polinomial nos mesmos pontos para verificar os dados e, se chegarem aos mesmos valores, os dados estão corretos.

</ExpandableCard>

<ExpandableCard title="Why does the KZG random data have to stay secret?" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

Se alguém souber as localizações aleatórias usadas para o compromisso, é fácil gerar um novo polinômio que se encaixe nesses pontos específicos (ou seja, uma "colisão"). Isso significa que podem adicionar ou remover dados do blob e ainda assim oferecer uma prova válida. Para evitar isso, em vez de indicar aos provedores os locais secretos reais, na verdade recebem os locais "embrulhados" em uma "caixa preta" criptográfica usando curvas elípticas. Os valores são realmente embaralhados de tal forma que os valores originais não podem passar por engenharia reversa, mas com alguns provadores e verificadores de álgebra inteligentes ainda é possível avaliar os polinômios nos pontos que representam.

</ExpandableCard>

<Alert variant="warning" className="mb-8">
  Nem o Danksharding, nem o Proto-Danksharding seguem o modelo tradicional de "sharding", que visa dividir a blockchain em várias partes. As cadeias de fragmentos não fazem mais parte do planejamento. Em vez disso, o Danksharding utiliza amostragem de dados distribuídos em blobs para dimensionar o Ethereum. Isso é muito mais simples de implementar. Às vezes, esse modelo é chamado de "fragmentação de dados".
</Alert>

## O que é Danksharding? {#what-is-danksharding}

O Danksharding é a realização completa da escalabilidade do rollup que começou com o Proto-Danksharding. O Danksharding oferecerá enormes quantidades de espaço ao Ethereum para que os rollups "entreguem" os dados de transação compactados. Isso significa que o Ethereum poderá suportar centenas de rollups individuais com facilidade e permitir a realização de milhões de transações por segundo.

A maneira como isso funciona é expandindo os blobs anexados aos blocos de seis (6) no Proto-Danksharding para 64 no Danksharding completo. As demais alterações necessárias são melhorias na maneira como os clientes de consenso operam para que possam processar os novos blobs grandes. Diversas dessas alterações já estão no planejamento para outros fins, independentemente do Danksharding. Por exemplo, o Danksharding exige que a separação entre proponente e construtor tenha sido implementada. Essa é uma melhoria que separa as tarefas de construção e de proposição de blocos entre diferentes validadores. Da mesma forma, a amostragem de disponibilidade de dados é necessária para o Danksharding, mas também para o desenvolvimento de clientes muito leves que não armazenam muitos dados históricos ("clientes sem estado").

<ExpandableCard title="Why does Danksharding require proposer-builder separation?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

A separação entre proponente e construtor é necessária para evitar que validadores individuais tenham que gerar compromissos e provas caras para 32 MB de dados de blob. Isso pressionaria muito os participantes internos e exigiria que eles investissem em hardware mais potente, o que prejudicaria a descentralização. Em vez disso, os construtores de blocos especializados assumem a responsabilidade por esse trabalho caro de computação. Em seguida, eles disponibilizam os blocos aos proponentes de blocos, para transmissão. O proponente do bloco simplesmente escolhe o bloco que é mais lucrativo. Qualquer pessoa pode verificar os blobs de uma maneira barata e rápida, o que significa que qualquer validador normal pode verificar se o comportamento dos construtores de blocos é honesto. Isso permite o processamento de blobs grandes sem sacrificar a descentralização. Os construtores de blocos com um comportamento indevido podem simplesmente ser expulsos da rede e removidos. Outros entrarão no lugar deles, porque a construção de blocos é uma atividade lucrativa.

</ExpandableCard>

<ExpandableCard title="Why does Danksharding require data availability sampling?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

A amostragem de disponibilidade de dados é necessária para que os validadores verifiquem os dados de blob de uma maneira rápida e eficiente. Ao utilizar a amostragem de disponibilidade de dados, os validadores podem ter certeza de que os dados do blob estavam disponíveis e que houve um compromisso correto. Cada validador pode fazer uma amostragem aleatória de apenas alguns pontos de dados e criar uma prova, o que significa que nenhum validador precisa verificar todo o blob. Se algum dado estiver ausente, ele será identificado rapidamente e o blob será rejeitado.

</ExpandableCard>

### Progresso atual {#current-progress}

A implementação completa do Danksharding ainda vai demorar alguns anos. Enquanto isso, a cerimônia KZG foi concluída com mais de 140.000 contribuições, e o [EIP](https://eips.ethereum.org/EIPS/eip-4844) para o Proto-Danksharding amadureceu. Essa proposta foi implementada em todas as redes de teste e foi posta em funcionamento na rede principal através da melhoria de rede Cancun-Deneb ("Dencun") em março de 2024.

### Leitura adicional {#further-reading}

- [Notas sobre o Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Notas de Dankrad sobre o Danksharding](https://notes.ethereum.org/@dankrad/new_sharding)
- [Dankrad, Proto e Vitalik discutem o Danksharding](https://www.youtube.com/watch?v=N5p0TB77flM)
- [A cerimônia KZG](https://ceremony.ethereum.org/)
- [Palestra de Carl Beekhuizen na Devcon sobre configurações confiáveis](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [Mais sobre amostragem de disponibilidade de dados para blobs](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist sobre compromissos e provas KZG](https://youtu.be/8L2C6RDMV9Q)
- [Compromissos polinomiais KZG](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)
