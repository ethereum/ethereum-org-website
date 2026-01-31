---
title: Escalar o Ethereum
description: "Os rollups agrupam transações offchain, reduzindo custos para o usuário. No entanto, a forma como os rollups usam recursos de dados atualmente é muito cara, o que limita o baixo custo das transações. Proto-Danksharding corrige isso."
lang: pt-br
image: /images/roadmap/roadmap-transactions.png
alt: "Planejamento Ethereum"
template: roadmap
---

A escalabilidade do Ethereum é feita por meio de [camadas 2](/layer-2/#rollups) (também conhecidas como rollups), que agrupam transações em lote e enviam o resultado para o Ethereum. Embora os rollups sejam até oito vezes mais baratos do que a rede principal do Ethereum, é possível otimizar ainda mais os rollups de forma a reduzir os custos para os usuários finais. Os rollups também dependem de alguns componentes centralizados que os desenvolvedores podem remover à medida que os rollups se desenvolvem.

<Alert variant="update" className="mb-8">
<AlertContent>
<AlertTitle className="mb-4">
  Custos de transação
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Os rollups de hoje são cerca de<strong>5 a 20 vezes</strong> mais baratos do que a camada 1 do Ethereum</li>
    <li>ZK-rollups em breve reduzirão as taxas em <strong>~40-100x</strong></li>
    <li>As próximas alterações no Ethereum oferecerão <strong>~100-1000x</strong> a mais de escalabilidade</li>
    <li style={{ marginBottom: 0 }}>Os usuários devem se beneficiar com transações <strong>que custam menos do que $0,001</strong></li>
  </ul>
</AlertContent>
</Alert>

## Tornando os dados mais baratos {#making-data-cheaper}

Os rollups coletam um grande número de transações, executam elas e enviam os resultados ao Ethereum. Isso gera muitos dados que precisam estar disponíveis abertamente para que qualquer pessoa possa executar as transações por conta própria e verificar se o operador de rollup foi honesto. Se alguém encontrar uma discrepância, pode abrir uma contestação.

### Proto-Danksharding {#proto-danksharding}

Historicamente, os dados de rollup têm sido armazenados de forma permanente no Ethereum, o que é caro. Mais de 90% do custo de transação que os usuários pagam em rollups se deve a esse armazenamento de dados. Para reduzir os custos de transação, podemos mover os dados para um novo armazenamento "blob" temporário. Os blobs são mais baratos porque não são permanentes; eles são excluídos do Ethereum assim que não são mais necessários. O armazenamento de dados de rollup a longo prazo passa a ser responsabilidade das pessoas que precisam deles, como operadores de rollup, exchanges, serviços de indexação, etc. A adição de transações de blob ao Ethereum faz parte de uma melhoria conhecida como "Proto-Danksharding".

Com o Proto-Danksharding, é possível adicionar muitos blobs aos blocos de Ethereum. Isso permite outro aumento substancial (>100x) na taxa de transferência do Ethereum e uma redução nos custos de transação.

### Danksharding {#danksharding}

O segundo estágio da expansão de dados de blob é complicado porque exige novos métodos para verificar se os dados de rollup estão disponíveis na rede e depende de [validadores](/glossary/#validator) separarem suas responsabilidades de criação e proposta de [bloco](/glossary/#block). Isso também exige uma maneira de provar criptograficamente que os validadores verificaram pequenos subconjuntos dos dados do blob.

Esta segunda etapa é conhecida como ["Danksharding"](/roadmap/danksharding/). O trabalho de implementação continua, com progressos sendo feitos em pré-requisitos como [separar a criação e a proposta de blocos](/roadmap/pbs) e novos projetos de rede que permitem que a rede confirme eficientemente que os dados estão disponíveis por meio de amostragem aleatória de alguns kilobytes por vez, conhecida como [amostragem de disponibilidade de dados (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Mais sobre Danksharding</ButtonLink>

## Descentralizando os rollups {#decentralizing-rollups}

[Rollups](/layer-2) já estão escalando o Ethereum. Um [rico ecossistema de projetos de rollup](https://l2beat.com/scaling/tvs) está permitindo que os usuários realizem transações de forma rápida e barata, com uma variedade de garantias de segurança. Entretanto, os rollups foram inicializados usando sequenciadores centralizados (computadores que fazem todo o processamento e a agregação das transações antes de enviá-las ao Ethereum). Isso é vulnerável à censura, pois os operadores do sequenciador podem ser sancionados, subornados ou comprometidos de qualquer outra forma. Ao mesmo tempo, os [rollups variam](https://l2beat.com/scaling/summary) na maneira como validam os dados recebidos. A melhor maneira é que os "provadores" enviem [provas de fraude](/glossary/#fraud-proof) ou provas de validade, mas nem todos os rollups já chegaram a esse ponto. Mesmo os rollups que usam provas de validação/fraude utilizam um pequeno grupo de provadores conhecidos. Portanto, a próxima etapa essencial na escalabilidade do Ethereum é distribuir a responsabilidade pela execução de sequenciadores e provadores entre mais pessoas.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Mais sobre rollups</ButtonLink>

## Progresso atual {#current-progress}

O Proto-Danksharding foi implementado com sucesso como parte da atualização da rede Cancún-Deneb ("Dencun") em março de 2024. Desde sua implementação, os rollups começaram a utilizar armazenamento de blobs, resultando em custos de transação reduzidos para usuários e milhões de transações processadas em blobs.

O trabalho no Danksharding completo continua, com progresso sendo feito em seus pré-requisitos como PBS (Proposer-Builder Separation) e DAS (Data Availability Sampling). A descentralização da infraestrutura de rollup é um processo gradual - há muitos rollups diferentes que estão construindo sistemas ligeiramente diferentes e serão totalmente descentralizados em taxas diferentes.

[Mais sobre a atualização da rede Dencun e seu impacto](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />
