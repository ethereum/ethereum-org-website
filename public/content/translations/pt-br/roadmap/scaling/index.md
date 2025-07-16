---
title: Escalar o Ethereum
description: Rollups agrupam transações fora da cadeia, o que reduz os custos para o usuário. No entanto, a forma como os rollups usam recursos de dados atualmente é muito cara, o que limita o baixo custo das transações. Proto-Danksharding corrige isso.
lang: pt-br
image: /images/roadmap/roadmap-transactions.png
alt: "Planejamento Ethereum"
template: roadmap
---

A escalabilidade do Ethereum é feita por meio de [camadas 2s](/layer-2/#rollups) (também conhecidas como rollups), que agrupam transações em lote e enviam o resultado para o Ethereum. Embora os rollups sejam até oito vezes mais baratos do que a rede principal do Ethereum, é possível otimizar ainda mais os rollups de forma a reduzir os custos para os usuários finais. Os rollups também dependem de alguns componentes centralizados que os desenvolvedores podem remover à medida que os rollups se desenvolvem.

<InfoBanner mb={8} title="Custos de transação">
  <ul style={{ marginBottom: 0 }}>
    <li>Os rollups de hoje são cerca de<strong>5 a 20 vezes</strong> mais baratos do que a camada 1 do Ethereum</li>
    <li>ZK-rollups em breve reduzirão as taxas em <strong>~40-100x</strong></li>
    <li>As próximas alterações no Ethereum oferecerão <strong>~100-1000x</strong> a mais de escalabilidade</li>
    <li style={{ marginBottom: 0 }}>Os usuários devem se beneficiar com transações <strong>que custam menos do que $0,001</strong></li>
  </ul>
</InfoBanner>

## Tornar os dados mais baratos {#making-data-cheaper}

Os rollups coletam um grande número de transações, executam elas e enviam os resultados ao Ethereum. Isso gera muitos dados que precisam estar disponíveis abertamente para que qualquer pessoa possa executar as transações por conta própria e verificar se o operador de rollup foi honesto. Se alguém encontrar uma discrepância, pode abrir uma contestação.

### Proto-Danksharding {#proto-danksharding}

Historicamente, os dados de rollup têm sido armazenados de forma permanente no Ethereum, o que é caro. Mais de 90% do custo de transação que os usuários pagam em rollups se deve a esse armazenamento de dados. Para reduzir os custos de transação, podemos mover os dados para um novo armazenamento "blob" temporário. Os blobs são mais baratos porque não são permanentes; eles são excluídos do Ethereum assim que não são mais necessários. O armazenamento de dados de rollup a longo prazo passa a ser responsabilidade das pessoas que precisam deles, como operadores de rollup, exchanges, serviços de indexação, etc. A adição de transações de blob ao Ethereum faz parte de uma melhoria conhecida como "Proto-Danksharding".

Com o Proto-Danksharding, é possível adicionar muitos blobs aos blocos de Ethereum. Isso permite outro aumento substancial (>100x) na taxa de transferência do Ethereum e uma redução nos custos de transação.

### Danksharding {#danksharding}

O segundo estágio da expansão dos dados de blob é complicado porque requer novos métodos para verificar se os dados de rollup estão disponíveis na rede e depende de [validadores](/glossary/#validator) que separam suas responsabilidades de [construção de blocos](/glossary/#block) e de proposta de blocos. Isso também exige uma maneira de provar criptograficamente que os validadores verificaram pequenos subconjuntos dos dados do blob.

Essa segunda etapa é conhecida como [“Danksharding”](/roadmap/danksharding/). **É provável que ainda faltem vários anos** para que isso seja totalmente implementado. O Danksharding depende de outros desenvolvimentos, como a [separação da construção e da proposta de bloco](/roadmap/pbs), e novos designs de rede que permitem que a rede confirme, de maneira eficaz, que os dados estão disponíveis por meio de uma amostragem aleatória de alguns kilobytes por vez, conhecida como [amostragem de disponibilidade de dados (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Mais sobre Danksharding</ButtonLink>

## Descentralização de rollups {#decentralizing-rollups}

[Os rollups](/layer-2) já estão dimensionando o Ethereum. Um [ecossistema sofisticado de projetos de rollup](https://l2beat.com/scaling/tvl) está permitindo que os usuários façam transações de forma rápida e barata, com diversas garantias de segurança. Entretanto, os rollups foram inicializados usando sequenciadores centralizados (computadores que fazem todo o processamento e a agregação das transações antes de enviá-las ao Ethereum). Isso é vulnerável à censura, pois os operadores do sequenciador podem ser sancionados, subornados ou comprometidos de qualquer outra forma. Ao mesmo tempo, os [rollups variam](https://l2beat.com) na maneira como validam os dados recebidos. A melhor maneira é que os "provadores" enviem [provas de fraude](/glossary/#fraud-proof) ou provas de validade, mas nem todos os rollups já chegaram a esse nível. Mesmo os rollups que usam provas de validação/fraude utilizam um pequeno grupo de provadores conhecidos. Portanto, a próxima etapa essencial na escalabilidade do Ethereum é distribuir a responsabilidade pela execução de sequenciadores e provadores entre mais pessoas.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Mais sobre rollups</ButtonLink>

## Progresso atual {#current-progress}

O Proto-Danksharding é o primeiro desses itens do roteiro a ser implementado como parte da melhoria da rede Cancun-Deneb ("Dencun"), em março de 2024. **É provavél que ainda faltem vários anos para o Danksharding completo**, já que isso depende de vários outros itens do roteiro serem concluídos primeiro. É provável que a descentralização da infraestrutura de rollup seja um processo gradual. Há muitos rollups diferentes que estão criando sistemas ligeiramente diferentes e que se descentralizarão totalmente a velocidades diferentes.

[Mais informações sobre a melhoria da rede Dencun](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />
