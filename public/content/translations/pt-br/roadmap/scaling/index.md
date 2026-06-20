---
title: Escalando o Ethereum
description: "Os rollups agrupam transações fora da cadeia (offchain), reduzindo os custos para o usuário. No entanto, a forma como os rollups usam os dados atualmente é muito cara, limitando o quão baratas as transações podem ser. O Proto-Danksharding resolve isso."
lang: pt-br
image: /images/roadmap/roadmap-transactions.png
alt: "Roteiro do Ethereum"
template: roadmap
---

O Ethereum é escalado usando [camadas 2 (l2)](/layer-2/#rollups) (também conhecidas como rollups), que agrupam transações e enviam o resultado para o Ethereum. Embora os rollups sejam até oito vezes mais baratos que a Rede Principal do Ethereum, é possível otimizar ainda mais os rollups para reduzir os custos para os usuários finais. Os rollups também dependem de alguns componentes centralizados que os desenvolvedores podem remover à medida que os rollups amadurecem.

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  Custos de transação
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Os rollups de hoje são <strong>\~5-20x</strong> mais baratos que a camada 1 (l1) do Ethereum</li>
    <li>Os ZK-rollups em breve reduzirão as taxas em <strong>\~40-100x</strong></li>
    <li>As próximas mudanças no Ethereum fornecerão mais <strong>\~100-1000x</strong> de escalabilidade</li>
 <li style={{ marginBottom: 0 }}>Os usuários devem se beneficiar de transações <strong>custando menos de US$ 0,001</strong></li>
  </ul>
</AlertContent>
</Alert>

## Tornando os dados mais baratos {#making-data-cheaper}

Os rollups coletam um grande número de transações, as executam e enviam os resultados para o Ethereum. Isso gera muitos dados que precisam estar abertamente disponíveis para que qualquer pessoa possa executar as transações por si mesma e verificar se o operador do rollup foi honesto. Se alguém encontrar uma discrepância, poderá levantar uma contestação.

### Proto-Danksharding {#proto-danksharding}

Historicamente, os dados de rollup têm sido armazenados no Ethereum permanentemente, o que é caro. Mais de 90% do custo de transação que os usuários pagam nos rollups se deve a esse armazenamento de dados. Para reduzir os custos de transação, podemos mover os dados para um novo armazenamento temporário de 'blob'. Os blobs são mais baratos porque não são permanentes; eles são excluídos do Ethereum quando não são mais necessários. O armazenamento de dados de rollup a longo prazo torna-se responsabilidade das pessoas que precisam deles, como operadores de rollup, corretoras (exchanges), serviços de indexação, etc. Adicionar transações de blob ao Ethereum faz parte de uma atualização conhecida como "Proto-Danksharding".

Com o Proto-Danksharding, é possível adicionar muitos blobs aos blocos do Ethereum. Isso permite outro aumento substancial (>100x) na vazão do Ethereum e uma redução nos custos de transação.

### Danksharding {#danksharding}

O segundo estágio da expansão de dados de blob é complicado porque requer novos métodos para verificar se os dados do rollup estão disponíveis na rede e depende de [validadores](/glossary/#validator) separando suas responsabilidades de construção de [bloco](/glossary/#block) e proposta de bloco. Também requer uma maneira de provar criptograficamente que os validadores verificaram pequenos subconjuntos dos dados do blob.

Esta segunda etapa é conhecida como ["danksharding"](/roadmap/danksharding/). O trabalho de implementação continua, com progresso sendo feito em pré-requisitos como a [separação da construção de blocos e da proposta de blocos](/roadmap/pbs) e novos designs de rede que permitem à rede confirmar eficientemente que os dados estão disponíveis por meio da amostragem aleatória de alguns kilobytes por vez, conhecida como [amostragem de disponibilidade de dados (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Mais sobre o danksharding</ButtonLink>

## Descentralizando os rollups {#decentralizing-rollups}

Os [rollups](/layer-2) já estão escalando o Ethereum. Um [rico ecossistema de projetos de rollup](https://l2beat.com/scaling/tvs) está permitindo que os usuários façam transações de forma rápida e barata, com uma série de garantias de segurança. No entanto, os rollups foram iniciados usando sequenciadores centralizados (computadores que fazem todo o processamento e agregação de transações antes de enviá-las para o Ethereum). Isso é vulnerável à censura, porque os operadores do sequenciador podem ser sancionados, subornados ou comprometidos de alguma outra forma. Ao mesmo tempo, os [rollups variam](https://l2beat.com/scaling/summary) na forma como validam os dados recebidos. A melhor maneira é que os "provadores" (provers) enviem [provas de fraude](/glossary/#fraud-proof) ou provas de validade, mas nem todos os rollups chegaram lá ainda. Mesmo os rollups que usam provas de validade/fraude usam um pequeno grupo de provadores conhecidos. Portanto, o próximo passo crítico na escalabilidade do Ethereum é distribuir a responsabilidade pela execução de sequenciadores e provadores entre mais pessoas.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Mais sobre rollups</ButtonLink>

## Progresso atual {#current-progress}

O Proto-Danksharding foi implementado com sucesso como parte da atualização da rede Cancun-Deneb ("Dencun") em março de 2024. Desde a sua implementação, os rollups começaram a utilizar o armazenamento de blob, resultando em custos de transação reduzidos para os usuários e milhões de transações processadas em blobs.

O trabalho no danksharding completo continua, com progresso sendo feito em seus pré-requisitos, como a separação propositor-construtor (PBS) e a amostragem de disponibilidade de dados (DAS). A descentralização da infraestrutura de rollup é um processo gradual - existem muitos rollups diferentes que estão construindo sistemas ligeiramente diferentes e se descentralizarão totalmente em ritmos diferentes.

[Mais sobre a atualização da rede Dencun e seu impacto](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />