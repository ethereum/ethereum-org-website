---
title: Privacidade no Ethereum
description: Ferramentas e técnicas para proteger sua privacidade no Ethereum
lang: pt-br
---

A privacidade não é apenas essencial para a segurança pessoal, é uma pedra angular da liberdade e um [garantidor fundamental da descentralização](https://vitalik.eth.limo/general/2025/04/14/privacy.html). A privacidade dá às pessoas a capacidade de se expressarem, realizarem transações com outras pessoas e organizarem comunidades livremente. Mas, como em todas as blockchains, o livro-razão público do Ethereum torna a privacidade um desafio.

O Ethereum é transparente por design. Toda ação onchain é visível para qualquer um que olhar. Embora o Ethereum ofereça pseudonimato ao vincular sua atividade a uma [chave pública](/decentralized-identity/#public-key-cryptography) em vez de uma identidade do mundo real, padrões de atividade podem ser analisados para revelar informações confidenciais e identificar usuários.

Construir ferramentas de preservação de privacidade no Ethereum pode ajudar pessoas, organizações e instituições a interagirem com segurança, limitando a exposição desnecessária. Isso torna o ecossistema mais seguro e prático para uma gama mais ampla de casos de uso.

<VideoWatch slug="privacy-is-existential" />

## Privacidade para escritas {#privacy-of-writes}

Por padrão, toda transação escrita no Ethereum é pública e permanente. Isso inclui não apenas o envio de ETH, mas também o registro de nomes ENS, a coleta de POAPs ou a negociação de NFTs. Ações cotidianas como pagamentos, votos ou verificação de identidade podem revelar suas informações a partes não intencionais. Existem várias ferramentas e técnicas que podem ajudar a torná-las mais privadas:

### Protocolos de mistura (ou "mixers") {#mixing-protocols}

Os mixers quebram o vínculo entre remetentes e destinatários colocando as transações de muitos usuários em um "pool" compartilhado e, em seguida, permitindo que as pessoas façam o saque mais tarde para um novo endereço. Como os depósitos e saques são misturados, é muito mais difícil para os observadores conectá-los.

_Exemplos: [PrivacyPools](https://docs.privacypools.com/), [Tornado Cash](https://tornado.cash/)_

### Pools blindados (Shielded Pools) {#shielded-pools}

Os pools blindados são semelhantes aos mixers, mas permitem que os usuários mantenham e transfiram fundos de forma privada dentro do próprio pool. Em vez de apenas ocultar o vínculo entre depósito e saque, os pools blindados mantêm um estado privado contínuo, frequentemente protegido com provas de conhecimento zero. Isso torna possível construir transferências privadas, saldos privados e muito mais.

_Exemplos: [Railgun](https://www.railgun.org/), [Aztec](https://aztec.network/), Nightfall_

### Endereços furtivos {#stealth-addresses}

Um [endereço furtivo](https://vitalik.eth.limo/general/2023/01/20/stealth.html) é como dar a cada remetente uma caixa postal única e de uso único que só você pode abrir. Toda vez que alguém lhe envia cripto, vai para um novo endereço, para que ninguém mais possa ver que todos esses pagamentos pertencem a você. Isso mantém seu histórico de pagamentos privado e mais difícil de rastrear.

_Exemplos: [UmbraCash](https://app.umbra.cash/faq), [FluidKey](https://www.fluidkey.com/)_

### Outros casos de uso {#other-use-cases}

Outros projetos que exploram escritas privadas incluem [PlasmaFold](https://pse.dev/projects/plasma-fold) (pagamentos privados) e sistemas como [MACI](https://pse.dev/projects/maci) e [Semaphore](https://pse.dev/projects/semaphore) (voto privado).

Essas ferramentas expandem as opções para escrever de forma privada no Ethereum, mas cada uma vem com compensações. Algumas abordagens ainda são experimentais, algumas aumentam os custos ou a complexidade, e algumas ferramentas como mixers podem enfrentar escrutínio legal ou regulatório dependendo de como são usadas.

## Privacidade para leituras {#privacy-of-reads}

Ler ou verificar qualquer informação no Ethereum (por exemplo, o saldo da sua carteira) geralmente passa por um serviço como o provedor da sua carteira, um provedor de nó ou um explorador de blocos. Como você está confiando neles para ler a blockchain para você, eles também podem ver suas solicitações junto com metadados como seu endereço IP ou localização. Se você continuar verificando a mesma conta, essas informações podem ser reunidas para vincular sua identidade à sua atividade.

Executar seu próprio nó Ethereum evitaria isso, mas armazenar e fazer a sincronização de toda a blockchain continua sendo caro e impraticável para a maioria dos usuários, especialmente em dispositivos móveis.

Alguns projetos que exploram leituras privadas incluem [Private Information Retrieval](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (PIR, buscar dados sem revelar o que você está procurando), [zkID](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (verificações de identidade privadas com provas de conhecimento zero), [vOPRF](https://pse.dev/projects/voprf) (usar contas da Web2 de forma pseudônima na Web3), [vFHE](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (computar em dados criptografados) e [MachinaIO](https://pse.dev/projects/machina-io) (ocultar detalhes do programa mantendo a funcionalidade).

## Privacidade para provas {#privacy-of-proving}

Provas de preservação de privacidade são ferramentas que você pode usar no Ethereum para mostrar que algo é verdadeiro sem revelar detalhes desnecessários. Por exemplo, você poderia:

- Provar que você tem mais de 18 anos sem compartilhar sua data de nascimento completa
- Provar a propriedade de um NFT ou token sem revelar toda a sua carteira
- Provar elegibilidade para uma associação, recompensa ou voto sem expor outros dados pessoais

A maioria das ferramentas para isso depende de técnicas criptográficas como provas de conhecimento zero, mas o desafio é torná-las eficientes o suficiente para rodar em dispositivos do dia a dia, portáteis para qualquer plataforma e seguras.

Alguns projetos que exploram a privacidade para provas incluem [Client Side Proving](https://pse.dev/projects/client-side-proving) (sistemas de prova ZK), [TLSNotary](https://tlsnotary.org/) (provas de autenticidade para quaisquer dados na web), [Mopro](https://pse.dev/projects/mopro) (prova do lado do cliente móvel), [Private Proof Delegation](https://pse.dev/projects/private-proof-delegation) (estruturas de delegação que evitam premissas de confiança) e [Noir](https://noir-lang.org/) (linguagem para computação privada e verificável).

## Glossário de Privacidade {#privacy-glossary}

**Anônimo**: Interagir com todos os identificadores permanentemente removidos de seus dados, tornando impossível rastrear informações de volta a um indivíduo

**Criptografia**: Um processo que embaralha dados para que apenas alguém com a chave correta possa lê-los

**[Criptografia Totalmente Homomórfica](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (FHE)**: Uma maneira de realizar cálculos diretamente em dados criptografados, sem nunca descriptografá-los

**[Ofuscação Indistinguível](https://pse.dev/projects/machina-io) (iO)**: Técnicas de privacidade que tornam programas ou dados ininteligíveis, mas ainda utilizáveis

**[Computação Multipartidária](https://pse.dev/blog/secure-multi-party-computation) (MPC)**: Métodos que permitem que várias partes calculem um resultado juntas sem expor suas entradas privadas

**Criptografia Programável**: Criptografia flexível e baseada em regras que pode ser personalizada em software para controlar como e quando os dados são compartilhados, verificados ou revelados

**Pseudônimo**: Usar códigos ou números únicos (como um endereço Ethereum) no lugar de identificadores pessoais

**Divulgação Seletiva**: A capacidade de compartilhar apenas o que é necessário (por exemplo, provar que você possui um NFT sem revelar todo o histórico da sua carteira)

**Desvinculabilidade**: Garantir que ações separadas na blockchain não possam ser vinculadas ao mesmo endereço

**Verificabilidade**: Garantir que outros possam confirmar que uma reivindicação é verdadeira, como validar uma transação ou prova no Ethereum

**Delegação Verificável**: Atribuir uma tarefa — como gerar uma prova — a outra parte (por exemplo, uma carteira móvel usando um servidor para criptografia pesada) enquanto ainda é possível verificar se foi feita corretamente

**[Provas de Conhecimento Zero](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) (ZKPs)**: Protocolos criptográficos que permitem que alguém prove que uma informação é verdadeira sem revelar os dados subjacentes

**ZK Rollup**: Um sistema de escalabilidade que agrupa transações offchain e envia uma prova de validade onchain — não é privado por padrão, mas eles permitem sistemas de privacidade eficientes (como pools blindados) reduzindo custos

## Recursos {#resources}

- [Privacy Stewards of Ethereum](https://pse.dev/) (PSE), um laboratório de pesquisa e desenvolvimento da Fundação Ethereum focado em privacidade para o ecossistema
- [Web3PrivacyNow](https://web3privacy.info/), uma rede de pessoas, projetos e organizações alinhadas que protegem e promovem os direitos humanos online
- [WalletBeat](https://beta.walletbeat.eth.limo/wallet/summary/), um site de classificação de carteiras Ethereum com o objetivo de fornecer uma lista abrangente de carteiras, suas funcionalidades, práticas e suporte a determinados padrões.
- [Zk-kit](https://zkkit.org/): Um conjunto de bibliotecas (algoritmos, funções utilitárias e estruturas de dados) que podem ser reutilizadas em diferentes projetos e protocolos de conhecimento zero.
- [Privacy Apps](/apps/categories/privacy/) - Descubra uma lista de aplicativos de privacidade selecionados que rodam no Ethereum.
