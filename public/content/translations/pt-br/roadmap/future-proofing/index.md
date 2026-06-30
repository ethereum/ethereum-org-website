---
title: "Preparando o Ethereum para o futuro e a segurança quântica da criptografia"
description: "Essas atualizações consolidam o Ethereum como a camada base resiliente e descentralizada para o futuro, seja ele qual for."
lang: pt-br
image: /images/roadmap/roadmap-future.png
alt: Roteiro do Ethereum
template: roadmap
summaryPoints:
  - A criptografia pós-quântica garante que o Ethereum possa sobreviver a ameaças avançadas de hardware à medida que a computação quântica avança
  - A simplificação do protocolo torna o Ethereum mais fácil de manter, auditar e proteger
  - Atualizações recentes já entregaram melhorias significativas de eficiência
---

Algumas partes do roteiro não são sobre escalar ou proteger o Ethereum agora. Elas são sobre tornar o Ethereum **estável e confiável no longo prazo**. Isso significa preparar-se para novos tipos de ameaças e remover a complexidade desnecessária do protocolo.

## Resistência quântica {#quantum-resistance}

O Ethereum usa a [criptografia](/glossary/#cryptography) para manter a rede segura e proteger os fundos dos usuários. Eventualmente, alguns desses métodos criptográficos estarão **vulneráveis a computadores quânticos**, que podem resolver problemas matemáticos específicos exponencialmente mais rápido do que as máquinas clássicas.

**Nenhum computador quântico pode quebrar a criptografia do Ethereum hoje.** O hardware necessário ainda não existe em escala. Mas pesquisas recentes sugerem que a lacuna está se fechando mais rápido do que o esperado anteriormente. Em março de 2026, o Google Quantum AI publicou um artigo estimando que quebrar a criptografia de curva elíptica de 256 bits (o tipo que o Ethereum usa para assinaturas de conta) poderia exigir cerca de 1.200 qubits lógicos, cerca de 20 vezes menos do que as estimativas anteriores. O Google definiu um prazo interno até 2029 para migrar seus próprios sistemas para uma criptografia segura contra ameaças quânticas.

Transições criptográficas levam anos para serem planejadas e executadas com segurança. Como o modelo de segurança do Ethereum foi projetado para durar décadas, a preparação pós-quântica estava no roteiro do Ethereum antes de chegar às manchetes principais. A preparação da rede está acontecendo agora para garantir uma transição perfeita, não como uma reação a uma emergência.

### O que está em risco? {#what-is-at-risk}

Quatro áreas principais da criptografia do Ethereum foram identificadas como necessitando de atualizações pós-quânticas:

1. **Assinaturas de consenso (BLS)**: Os [validadores](/glossary/#validator) usam assinaturas BLS para votar em [blocos](/glossary/#block) válidos. Um computador quântico poderia forjar essas assinaturas.
2. **Disponibilidade de dados (compromissos KZG)**: Os [esquemas de compromisso](/roadmap/danksharding/#what-is-kzg) que ajudam o Ethereum a escalar dependem de matemática (especificamente, emparelhamento de curva elíptica) que é vulnerável a ataques quânticos.
3. **Assinaturas de conta (ECDSA)**: O esquema de assinatura que protege contas individuais do Ethereum. Quando uma conta envia uma transação, sua chave pública é exposta onchain. Um computador quântico poderia derivar a chave privada a partir dessa chave pública exposta, permitindo potencialmente o roubo de fundos.
4. **Provas ZK na camada de aplicação**: Os sistemas de prova de conhecimento zero usados por rollups e outras aplicações dependem de suposições criptográficas que os computadores quânticos poderiam comprometer.

<ExpandableCard title="Computadores quânticos podem roubar meu ETH hoje?" eventCategory="/roadmap/future-proofing" eventName="clicked can quantum computers steal my ETH today?">

Não. Nenhum computador quântico hoje pode quebrar a criptografia do Ethereum. O trabalho descrito nesta página é uma preparação para o futuro, não uma resposta a uma ameaça ativa. Quando as carteiras pós-quânticas estiverem disponíveis, o software da carteira guiará você pela migração. Por enquanto, não há nada que você precise fazer.

</ExpandableCard>

### O que está sendo feito?
O Ethereum é atualmente o defensor mais proativo contra ameaças quânticas no ecossistema da blockchain. A Fundação Ethereum formou uma **equipe de Segurança Pós-Quântica** dedicada em janeiro de 2026, e o trabalho ativo abrange várias equipes de clientes e grupos de pesquisa. O trabalho da equipe Pós-Quântica da EF é acompanhado publicamente em [pq.ethereum.org](https://pq.ethereum.org).

O trabalho ativo inclui:

- **Assinaturas baseadas em hash (leanXMSS)**: Um substituto seguro contra ameaças quânticas para assinaturas de validador, construído em funções de hash que computadores quânticos não conseguem quebrar de forma eficiente.
- **zkVM mínima (leanVM)**: Como as assinaturas seguras contra ameaças quânticas são maiores do que as assinaturas usadas atualmente, o leanXMSS é combinado com uma zkVM mínima (leanVM). Esse mecanismo agrega assinaturas seguras contra ameaças quânticas de forma eficiente, comprimindo os dados em 250x, para que a rede permaneça rápida após a transição.
- **Testes semanais de interoperabilidade**: Mais de 10 equipes de clientes participam de devnets pós-quânticas regulares.
- **Disponibilidade de dados:** Atualizar a criptografia subjacente usada para lidar com grandes quantidades de dados da rede garantirá que o Ethereum permaneça rápido e acessível de usar sem arriscar futuras vulnerabilidades quânticas.
- **Prêmio Poseidon**: Um prêmio de pesquisa de US$ 1 milhão visando melhorias em primitivas criptográficas baseadas em hash.
- **Padrões do NIST**: O Instituto Nacional de Padrões e Tecnologia dos EUA finalizou três padrões de criptografia pós-quântica em agosto de 2024 (ML-KEM, ML-DSA, SLH-DSA). O trabalho do Ethereum se baseia nessas fundações.

Uma parte fundamental da estratégia de transição é a **EIP-8141**, que introduz a [abstração de conta](/roadmap/account-abstraction/) nativa. Isso permite que contas individuais escolham sua própria verificação de assinatura, o que significa que os usuários poderiam mudar para assinaturas seguras contra ameaças quânticas **sem esperar por uma única migração em todo o protocolo**. A EIP-8141 está sendo considerada para a bifurcação rígida Hegotá (planejada para o segundo semestre de 2026).

A Fundação Ethereum delineou marcos estruturados de bifurcação visando a conclusão da infraestrutura pós-quântica principal até aproximadamente 2029. Esses são alvos de planejamento, não compromissos garantidos.

<ButtonLink variant="outline" href="/roadmap/future-proofing/quantum-resistance/">Mais sobre resistência quântica</ButtonLink>
## Um Ethereum mais simples e eficiente {#simpler-more-efficient-ethereum}

A complexidade cria oportunidades para bugs e vulnerabilidades. Parte do roteiro se concentra em **simplificar o Ethereum e remover a dívida técnica** para que o protocolo seja mais fácil de manter, auditar e compreender.

### O que foi entregue {#what-has-been-delivered}

Várias atualizações recentes tornaram o Ethereum mais simples e eficiente:

- **[Pectra (maio de 2025)](/roadmap/pectra/)**: Introduziu a EIP-7702, que permite que contas de propriedade externa deleguem temporariamente para o código de um contrato inteligente, um trampolim em direção à [abstração de conta](/roadmap/account-abstraction/) completa. Também adicionou o pré-compilado BLS12-381 (EIP-2537), o tratamento de depósitos onchain (EIP-6110), o acesso ao hash de bloco histórico na EVM (EIP-2935) e aumentou o saldo efetivo máximo para validadores (EIP-7251).
- **[Fusaka (dezembro de 2025)](/roadmap/fusaka/)**: Implantou o PeerDAS (EIP-7594), um sistema de amostragem de disponibilidade de dados ponto a ponto que distribui a carga de trabalho de disponibilidade de dados pela rede. Também aumentou os parâmetros de blob, expandindo a vazão de dados para [rollups](/glossary/#rollups).
- **[Dencun (março de 2024)](/roadmap/dencun/)**: Introduziu transações de blob (EIP-4844) para dados de rollup mais baratos e restringiu o `SELFDESTRUCT` (EIP-6780) para remover uma fonte de complexidade de longa data.
- **[London (agosto de 2021)](/ethereum-forks/#london)**: Reformulou a precificação do [gás](/glossary/#gas) com a EIP-1559, introduzindo uma taxa básica e um mecanismo de queima para custos de transação mais previsíveis.

### O que está em andamento {#what-is-in-progress}

- **[Glamsterdam (planejada para o primeiro semestre de 2026)](/roadmap/glamsterdam/)**: Sendo considerado para inclusão: separação propositor-construtor (PBS) consagrada (EIP-7732), listas de acesso no nível do bloco (EIP-7928) e reprecificação do gás para alinhar melhor os custos com o uso real de recursos.
- **Hegotá (planejada para o segundo semestre de 2026)**: Sendo considerado para inclusão: [árvores Verkle](/roadmap/verkle-trees/), substituindo a estrutura de dados atual por uma mais eficiente que permite clientes sem estado. Também direcionada para a EIP-8141 (abstração de conta nativa).
- **Em andamento**: Esforços para simplificar a [EVM](/developers/docs/evm/), harmonizar as implementações de clientes e descontinuar gradualmente recursos obsoletos continuam em toda a comunidade de desenvolvimento do Ethereum.

## Progresso atual {#current-progress}

No início de 2026:

**Simplificação e eficiência**: Pectra e Fusaka entregaram melhorias reais na flexibilidade de contas, disponibilidade de dados e operações de validadores. Glamsterdam e Hegotá estão em desenvolvimento ativo com alvos claros para tornar a rede mais resiliente e eficiente, ao mesmo tempo em que removem dependências externas.

**Criptografia pós-quântica**: Pesquisas ativas e implementações iniciais estão em andamento. O ecossistema financiou prêmios de pesquisa e executa devnets semanais de interoperabilidade em vários clientes, além da pesquisa feita pela equipe dedicada de Segurança Pós-Quântica da Fundação Ethereum. Embora os marcos estruturados de bifurcação visem aproximadamente 2029 para a conclusão, as pesquisas iniciais estão produzindo pontos de prova tangíveis demonstrando que a execução pós-quântica é viável hoje.

**Abstração de conta e agilidade de assinatura**: A EIP-7702 foi lançada na Pectra. A EIP-8141, sendo considerada para a Hegotá, permitirá que as contas usem qualquer esquema de assinatura, dando aos usuários um caminho para adotar assinaturas seguras contra ameaças quânticas antes que a transição completa do protocolo seja concluída.

Nenhuma parte deste trabalho está concluída. Os cronogramas são alvos, não garantias. Mas o escopo e o ritmo do desenvolvimento ativo representam um compromisso claro em manter o Ethereum seguro e eficiente a longo prazo.

**Leitura adicional**

- [Criptografia pós-quântica no Ethereum](/roadmap/future-proofing/quantum-resistance/)
- [strawmap.org](https://strawmap.org/) - _Arquitetura da EF_
- [pq.ethereum.org](https://pq.ethereum.org)
- [Gás](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Estruturas de dados](/developers/docs/data-structures-and-encoding/)
