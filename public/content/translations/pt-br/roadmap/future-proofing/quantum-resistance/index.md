---
title: "Criptografia pós-quântica no Ethereum"
description: "Como o Ethereum está se preparando para a era pós-quântica, o que é vulnerável e o que está sendo construído para protegê-lo."
lang: pt-br
image: /images/roadmap/roadmap-future.png
alt: "Ethereum roadmap"
template: roadmap
summaryPoints:
  - Os computadores quânticos eventualmente ameaçarão a criptografia que o Ethereum usa hoje
  - A Fundação Ethereum tem uma equipe dedicada de pesquisa pós-quântica e um roteiro estruturado "Lean Ethereum" visando 2029 para proteção pós-quântica total
  - Seus fundos estão seguros hoje e o software da carteira o guiará na migração futura
---

Os computadores quânticos eventualmente serão capazes de quebrar os métodos criptográficos que protegem o Ethereum e a maioria dos outros sistemas digitais hoje. Esta página explica o que isso significa, como a rede está desenvolvendo proativamente melhorias para mitigar esse risco e o que você precisa saber.

## Por que a criptografia pós-quântica é importante {#why-post-quantum-matters}

O Ethereum depende de várias formas de [criptografia](/glossary/#cryptography) para manter a rede segura e proteger os fundos dos usuários. As mais importantes são:

- **Algoritmo de assinatura digital de curva elíptica (ECDSA)**: A criptografia usada para assinar transações. A segurança da sua conta Ethereum depende disso.
- **Assinaturas BLS**: Usadas por [validadores](/glossary/#validator) para chegar a um [consenso](/glossary/#consensus) sobre o estado da rede.
- **Compromissos polinomiais KZG**: Usados para [disponibilidade de dados](/glossary/#data-availability) no roteiro de escalabilidade do Ethereum.
- **Sistemas de prova de conhecimento zero (ZK)**: Usados por rollups e outras aplicações para verificar computações offchain.

Todos esses dependem de estruturas matemáticas, como grupos abelianos, que são difíceis para computadores clássicos, mas podem ser resolvidos de forma eficiente por um computador quântico usando o [algoritmo de Shor](https://en.wikipedia.org/wiki/Shor%27s_algorithm).

### Quando os computadores quânticos ameaçarão o Ethereum? {#when-will-quantum-computers-threaten-ethereum}

Em março de 2026, o Google Quantum AI publicou uma pesquisa estimando que quebrar a criptografia de curva elíptica de 256 bits (o tipo que o Ethereum usa para assinaturas de conta) poderia exigir cerca de 1.200 qubits lógicos. Estimativas anteriores colocavam esse número muito mais alto. O Google estabeleceu um prazo interno de 2029 para migrar seus próprios sistemas para a criptografia pós-quântica.

O hardware quântico atual está longe dessa escala, operando com alguns milhares de qubits físicos ruidosos. Qubits lógicos (que corrigem erros e realizam computação confiável) exigem muitos qubits físicos cada. **A lacuna entre o hardware atual e o que é necessário para quebrar a criptografia do Ethereum continua significativa, mas está diminuindo mais rápido do que muitos esperavam.** Notavelmente, o Instituto Nacional de Padrões e Tecnologia dos EUA (NIST) prevê a descontinuação do ECDSA até 2030 e sua proibição até 2035.

Esta não é uma ameaça iminente. Mas as transições criptográficas levam anos, e o modelo de segurança do Ethereum foi projetado para durar séculos. A resposta do Ethereum é o roteiro **Lean Ethereum**, uma missão deliberada de vários anos para reconstruir o Ethereum em torno de primitivas que sobreviverão a qualquer ameaça criptográfica.

## Quatro áreas vulneráveis a ataques quânticos {#four-vulnerable-areas}

Em fevereiro de 2026, Vitalik Buterin [publicou um roteiro](https://x.com/VitalikButerin/status/2027075026378543132) identificando quatro áreas distintas da criptografia do Ethereum que precisam de atualizações pós-quânticas. Cada uma tem desafios diferentes e caminhos de solução diferentes.

### 1. Assinaturas BLS da camada de consenso {#consensus-bls}

**O que faz**: O protocolo de [Prova de Participação (PoS)](/glossary/#pos) do Ethereum usa assinaturas BLS para agregar votos de centenas de milhares de validadores. O BLS permite que muitas assinaturas sejam combinadas em uma só, mantendo a rede eficiente.

**Por que é vulnerável**: As assinaturas BLS dependem de emparelhamentos de curva elíptica, que um computador quântico poderia quebrar.

**A abordagem**: O roteiro do Lean Consensus inclui o desenvolvimento de duas ferramentas complementares:
- **leanXMSS**: O Ethereum substituirá as assinaturas BLS pelo leanXMSS, um esquema de assinatura baseado em hash para validadores. As assinaturas baseadas em hash são consideradas seguras contra computadores quânticos porque dependem apenas da segurança das funções de hash, que os computadores quânticos enfraquecem, mas não quebram.
- **leanVM**: Uma zkVM (máquina virtual de conhecimento zero) mínima para agregação de assinaturas baseada em SNARK. Como as assinaturas baseadas em hash são significativamente maiores (cerca de 3.000 bytes em comparação com 96 bytes para BLS), mudar para o leanXMSS produziria significativamente mais dados por slot. Para resolver isso, a leanVM atua como um mecanismo de agregação, comprimindo os dados em 250x. Isso preserva os benefícios de eficiência de combinar muitas assinaturas em uma só, mesmo após a mudança para esquemas seguros contra computadores quânticos.

<ExpandableCard title="Por que o Ethereum não pode simplesmente substituir o BLS por um esquema seguro contra computadores quânticos?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked why cant ethereum just replace BLS?">

A propriedade de agregação que torna o BLS eficiente (combinando centenas de milhares de assinaturas em uma só) não tem um equivalente óbvio seguro contra computadores quânticos. As assinaturas pós-quânticas também são muito maiores que as assinaturas BLS. Simplesmente trocar uma pela outra tornaria a camada de consenso do Ethereum significativamente mais lenta e mais cara. É por isso que a equipe está construindo a leanVM, uma ferramenta que usa provas de conhecimento zero para agregar assinaturas seguras contra computadores quânticos de forma eficiente.

</ExpandableCard>

### 2. Disponibilidade de dados: compromissos KZG {#data-availability-kzg}

**O que faz**: Os compromissos polinomiais KZG garantem que os dados (particularmente dados de [blob](/glossary/#blob) de rollups) estejam disponíveis na rede sem exigir que cada nó baixe tudo.

**Por que é vulnerável**: Os compromissos KZG dependem de emparelhamentos de curva elíptica, a mesma estrutura matemática que os computadores quânticos podem atacar.

**Mitigação atual**: Os compromissos KZG usam uma "configuração confiável" onde muitos participantes contribuíram com aleatoriedade. Desde que pelo menos um participante tenha sido honesto e descartado seu segredo, a configuração é segura, mesmo contra computadores quânticos tentando fazer engenharia reversa após o fato.

**Solução de longo prazo**: Substituir o KZG por um esquema de compromisso seguro contra computadores quânticos. Os dois principais candidatos são:
- **Compromissos baseados em STARK**: Dependem de funções de hash em vez de curvas elípticas. Já usados em alguns ZK-rollups.
- **Compromissos baseados em reticulados**: Dependem da dificuldade de problemas de reticulados (lattice), que se acredita serem resistentes a computadores quânticos.

Ambas as abordagens ainda estão sendo pesquisadas quanto à eficiência e praticidade na escala do Ethereum.

### 3. Assinaturas de conta: ECDSA {#eoa-signatures}

**O que faz**: Toda conta Ethereum padrão (conta de propriedade externa, ou [EOA](/glossary/#eoa)) usa ECDSA na curva secp256k1 para assinar transações. É isso que protege seus fundos.

**Por que é vulnerável**: Para qualquer conta que tenha enviado uma transação, a chave pública é exposta onchain. Um computador quântico poderia derivar a chave privada a partir desses dados de chave pública expostos.

**Nuance importante**: Contas que apenas receberam ether e nunca enviaram uma transação não expuseram sua chave pública. Apenas o endereço (um hash da chave pública) é visível, o que fornece alguma proteção adicional.

**A abordagem**: Em vez de uma única migração em todo o protocolo, o Ethereum planeja usar a [abstração de conta](/roadmap/account-abstraction/) (especificamente a EIP-8141, sendo considerada para a Hegotá no segundo semestre de 2026) para dar aos usuários **agilidade de assinatura**. Contas individuais poderiam mudar para um esquema de assinatura pós-quântica sem esperar que todo o protocolo mude.

Esta é uma abordagem pragmática. Usuários e carteiras que desejam proteção pós-quântica antecipadamente podem adotá-la voluntariamente, enquanto a migração mais ampla acontece ao longo do tempo.

### 4. Provas de conhecimento zero (ZK) na camada de aplicação {#zk-proofs}

**O que faz**: Sistemas de prova de conhecimento zero são usados por rollups da camada 2 (l2) e outras aplicações para verificar computações sem revelar os dados subjacentes.

**Por que é vulnerável**: Muitos sistemas populares de prova de conhecimento zero (SNARKs usando emparelhamentos de curva elíptica) dependem de suposições vulneráveis a computadores quânticos.

**A abordagem**: Os STARKs, que dependem de funções de hash em vez de curvas elípticas, já são resistentes a computadores quânticos e são usados por vários rollups. A adoção natural do ecossistema de sistemas baseados em STARK já está fornecendo segurança pós-quântica na camada de aplicação.

## Padrões do NIST {#nist-standards}

Em agosto de 2024, o Instituto Nacional de Padrões e Tecnologia dos EUA (NIST) [finalizou três padrões de criptografia pós-quântica](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards). Eles são importantes porque dão a toda a indústria de tecnologia, incluindo o Ethereum, um conjunto compartilhado de algoritmos avaliados para se basear, em vez de cada projeto inventar o seu próprio.

| Padrão | Nome | Tipo | Caso de uso |
|----------|------|------|----------|
| FIPS 203 | ML-KEM | Baseado em reticulados | Encapsulamento de chave (troca de chaves) |
| FIPS 204 | ML-DSA (Dilithium) | Baseado em reticulados | Assinaturas digitais |
| FIPS 205 | SLH-DSA (SPHINCS+) | Baseado em hash | Assinaturas digitais |

Esses padrões fornecem uma base para a transição pós-quântica mais ampla da indústria. O trabalho do Ethereum se baseia e estende esses padrões, com foco particular nos desafios únicos de uma rede descentralizada onde a eficiência e a agregação são importantes.

## A abordagem da Fundação Ethereum {#ef-approach}

A Fundação Ethereum formou uma equipe dedicada de Segurança Pós-Quântica em janeiro de 2026, liderada por Thomas Coratger. O trabalho da equipe é acompanhado publicamente em [pq.ethereum.org](https://pq.ethereum.org).

### Atividade atual (a partir de abril de 2026) {#current-activity}

- **Devnets semanais de interoperabilidade**: Mais de 10 equipes de clientes participam de testes regulares de interoperabilidade pós-quântica, incluindo Lighthouse, Grandine, Zeam, Ream Labs e PierTwo.
- **Prêmio Poseidon**: Um prêmio de pesquisa de US$ 1 milhão visando melhorias em primitivas criptográficas baseadas em hash.
- **Implementações de código aberto**: leanXMSS, leanVM, leanSpec (Python), leanSig (Rust) e leanMultisig estão todos disponíveis sob a [organização leanEthereum no GitHub](https://github.com/leanEthereum).
- **2º Retiro Anual de Pesquisa PQ**: Planejado para 9 a 12 de outubro de 2026 em Cambridge, Reino Unido.
- **Alinhamento com o NIST**: O trabalho do Ethereum se baseia nos padrões de criptografia pós-quântica finalizados pelo NIST em agosto de 2024 (como ML-KEM, ML-DSA e SLH-DSA).

### Marcos de migração {#migration-milestones}

A equipe delineou uma série de atualizações de protocolo para introduzir incrementalmente a criptografia pós-quântica no Ethereum. Estes são marcos de planejamento, não compromissos garantidos. Nomes e ordenação podem mudar.

| Marco | O que introduz |
|-----------|--------------------|
| I* | Registro de chaves PQ. Os validadores podem registrar chaves públicas pós-quânticas junto com as chaves BLS existentes. |
| J* | Pré-compilados de verificação de assinatura PQ. Contratos inteligentes e carteiras podem verificar assinaturas PQ nativamente. |
| L* | Atestados PQ e provas da camada de consenso em tempo real via leanVM. Os validadores começam a usar assinaturas PQ para consenso. |
| M* | Agregação completa de assinaturas PQ e compromissos de blob seguros contra PQ. |

**Meta**: Os marcos estruturados de bifurcação visam a conclusão da infraestrutura pós-quântica principal até aproximadamente 2029. A migração completa da camada de execução e do ecossistema se estende além disso.

## O que os usuários precisam fazer? {#what-users-need-to-do}

**Neste momento: nada.** Seus fundos estão seguros. Nenhum computador quântico hoje pode ameaçar a criptografia do Ethereum.

**No futuro**: Assim que os esquemas de assinatura pós-quântica forem amplamente suportados no Ethereum (esperado após a bifurcação rígida Hegotá e a implementação da EIP-8141), você vai querer migrar sua conta para assinaturas seguras contra computadores quânticos. O software da carteira o guiará por essa transição.

Se sua conta nunca enviou uma transação (o que significa que sua chave pública não foi exposta onchain), ela tem uma camada adicional de proteção. Mas todas as contas devem eventualmente migrar.

A questão de como lidar com carteiras inativas (contas cujos proprietários podem não estar cientes da necessidade de migrar) é um tópico de governança em aberto. A comunidade Ethereum ainda não chegou a um consenso sobre isso.

## Perguntas frequentes {#faq}

<ExpandableCard title="Os computadores quânticos podem roubar meu ETH hoje?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked can quantum computers steal my ETH today?">

**Não.** Nenhum computador quântico hoje pode quebrar a criptografia do Ethereum. O hardware quântico atual está longe da escala necessária. O trabalho descrito nesta página é uma preparação para o futuro, não uma resposta a uma ameaça ativa.

</ExpandableCard>

<ExpandableCard title="Quando os computadores quânticos poderiam se tornar uma ameaça?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked when could quantum computers become a threat?">

As estimativas variam. A pesquisa do Google de março de 2026 sugere que o hardware necessário para quebrar a criptografia de curva elíptica de 256 bits pode chegar por volta do final desta década, no mínimo, mas desafios significativos de engenharia permanecem. A maioria dos pesquisadores considera que uma ameaça realista está a vários anos de distância, no mínimo. A resposta honesta é que ninguém sabe o cronograma exato, e é exatamente por isso que se preparar agora é importante.

</ExpandableCard>

<ExpandableCard title="Precisarei fazer algo para proteger minha carteira?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked will I need to do anything?">

Eventualmente, sim. Assim que os esquemas de assinatura pós-quântica estiverem disponíveis no Ethereum, os usuários vão querer migrar suas contas. O software da carteira provavelmente lidará com essa transição para você. Por enquanto, não há nada que você precise fazer. Quando for necessária alguma ação, a comunidade Ethereum e os desenvolvedores de carteiras fornecerão orientações e ferramentas claras.

</ExpandableCard>

<ExpandableCard title="E quanto aos meus tokens, NFTs e posições DeFi?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what about tokens NFTs DeFi?">

Os ativos no Ethereum são controlados por assinaturas de conta. Assim que sua conta for migrada para um esquema de assinatura seguro contra computadores quânticos, tudo nessa conta estará protegido. Você não precisa migrar cada ativo individualmente. Contratos inteligentes que mantêm fundos (como protocolos de finanças descentralizadas (DeFi)) podem precisar de suas próprias atualizações, dependendo de quais primitivas criptográficas eles usam internamente.

</ExpandableCard>

<ExpandableCard title="O Ethereum está atrás de outras blockchains nesse aspecto?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked is Ethereum behind?">

Não. O Ethereum tem um dos programas pós-quânticos mais estruturados de qualquer blockchain: uma equipe dedicada, pesquisa financiada, devnets semanais e um roteiro de migração publicado, tratando a computação quântica como uma restrição de design de primeira classe. Nenhuma blockchain concluiu uma transição pós-quântica completa ainda. De acordo com as estimativas da Fundação Ethereum, a exposição de fundos inativos vulneráveis a computadores quânticos do Ethereum é de aproximadamente 0,1%, drasticamente menor do que outras grandes redes blockchain.

</ExpandableCard>

<ExpandableCard title="O que é "coletar agora, descriptografar depois"?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what is harvest now decrypt later?">

"Colha agora, descriptografe depois" é um ataque em que alguém registra dados criptografados ou chaves públicas expostas hoje e, em seguida, quebra a criptografia mais tarde, quando existir um computador quântico poderoso o suficiente. Para o Ethereum, isso é mais relevante para contas cujas chaves públicas já estão expostas onchain (qualquer conta que tenha enviado uma transação). Esta é uma das razões pelas quais a comunidade trata a migração pós-quântica como sensível ao tempo, embora a ameaça quântica ainda não seja imediata.

</ExpandableCard>

## Leitura adicional {#further-reading}

- [pq.ethereum.org](https://pq.ethereum.org) - _Fundação Ethereum_
- [Projeto de Criptografia Pós-Quântica](https://pse.dev/projects/post-quantum-cryptography) - _Privacy Stewards of Ethereum (PSE)_
- [Padrões de Criptografia Pós-Quântica do NIST](https://csrc.nist.gov/projects/post-quantum-cryptography) - _NIST_
- [Protegendo criptomoedas ao divulgar vulnerabilidades quânticas de forma responsável](https://research.google/blog/safeguarding-cryptocurrency-by-disclosing-quantum-vulnerabilities-responsibly/) - _Google Quantum AI_
- [As fronteiras quânticas podem estar mais próximas do que parecem](https://blog.google/innovation-and-ai/technology/safety-security/cryptography-migration-timeline/) - _Google_
- [KZG e configurações confiáveis](/roadmap/danksharding/#what-is-kzg)
- [Recursos do workshop leanVM + PQ da Lean Week Cambridge (2025)](https://github.com/leanEthereum/pm/blob/main/workshops-and-interops/2025/lean-week-cambridge/index.md) - _Lean Ethereum_
- [Chamadas de Breakout ACD sobre Assinaturas de Transação PQ](https://youtube.com/playlist?list=PLJqWcTqh_zKEOum3uR0odkH59fmGUYuZB) - _Fundação Ethereum_
- [Chamadas de Breakout ACD sobre Interoperabilidade PQ](https://youtube.com/playlist?list=PLJqWcTqh_zKF_Q9HNXBLW_AtktsjToTIu) - _Fundação Ethereum_
- [Playlist do YouTube sobre Lean Ethereum e Segurança Pós-Quântica](https://youtube.com/playlist?list=PLJqWcTqh_zKGGuO_q1dgYLsfUoX1sNhWM) - _Fundação Ethereum_
- [Entrevista em painel sobre resistência pós-quântica](https://youtu.be/5DRDjeMmOPw) - _Podcast Bankless_
- [Abstração de conta no Ethereum](/roadmap/account-abstraction/)
- [strawmap.org](https://strawmap.org/) - _Arquitetura da EF_
- [Superposicionado: Análise da Indústria de Computação Quântica](https://www.superpositioned.co/) - _Saneel Sreeni_