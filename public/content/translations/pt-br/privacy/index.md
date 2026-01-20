---
title: Privacidade no Ethereum
description: Ferramentas e técnicas para proteger sua privacidade no Ethereum
lang: pt-br
---

# Privacidade no Ethereum {#introduction}

A privacidade não é apenas essencial para a segurança pessoal, é um pilar da liberdade e uma importante [garantia de descentralização](https://vitalik.eth.limo/general/2025/04/14/privacy.html). A privacidade dá às pessoas a capacidade de se expressarem, transacionarem com outras pessoas e organizarem comunidades livremente. Mas, como todas as cadeias de blocos, o livro-razão público do Ethereum torna a privacidade desafiadora.

O Ethereum é transparente por design. Toda ação na cadeia é visível para qualquer um que olhe. Embora o Ethereum ofereça pseudonimato ao vincular sua atividade a uma [chave pública](/decentralized-identity/#public-key-cryptography) em vez de uma identidade do mundo real, os padrões de atividade podem ser analisados para revelar informações confidenciais e identificar usuários.

A criação de ferramentas de preservação da privacidade no Ethereum pode ajudar pessoas, organizações e instituições a interagir com segurança, limitando a exposição desnecessária. Isso torna o ecossistema mais seguro e prático para uma gama mais ampla de casos de uso.

## Privacidade para escritas {#privacy-of-writes}

Por padrão, toda transação escrita no Ethereum é pública e permanente. Isso inclui não apenas o envio de ETH, mas também o registro de nomes ENS, a coleta de POAPs ou a negociação de NFTs. Ações cotidianas, como pagamentos, votação ou verificação de identidade, podem revelar suas informações a partes indesejadas. Existem várias ferramentas e técnicas que podem ajudar a torná-las mais privadas:

### Protocolos de mistura (ou "mixers") {#mixing-protocols}

Os mixers quebram o elo entre remetentes e destinatários, colocando as transações de muitos usuários em um "pool" compartilhado e, em seguida, permitindo que as pessoas retirem mais tarde para um novo endereço. Como os depósitos e saques são misturados, é muito mais difícil para os observadores conectá-los.

_Exemplos: [PrivacyPools](https://docs.privacypools.com/), [Tornado Cash](https://tornado.cash/)_

### Pools blindados {#shielded-pools}

Pools blindados são semelhantes aos mixers, mas permitem que os usuários mantenham e transfiram fundos de forma privada dentro do próprio pool. Em vez de apenas obscurecer o elo entre depósito e saque, os pools blindados mantêm um estado privado contínuo, muitas vezes protegido com provas de conhecimento zero. Isso torna possível criar transferências privadas, saldos privados e muito mais.

_Exemplos: [Railgun](https://www.railgun.org/), [Aztec](https://aztec.network/), Nightfall_

### Endereços furtivos {#stealth-addresses}

Um [endereço furtivo](https://vitalik.eth.limo/general/2023/01/20/stealth.html) é como dar a cada remetente uma caixa postal única e de uso único. que só você pode abrir. Toda vez que alguém lhe envia cripto, ele vai para um novo endereço, então ninguém mais pode ver que todos esses pagamentos pertencem a você. Isso mantém seu histórico de pagamentos privado e mais difícil de rastrear.

_Exemplos: [UmbraCash](https://app.umbra.cash/faq), [FluidKey](https://www.fluidkey.com/)_

### Outros casos de uso {#other-use-cases}

Outros projetos que exploram escritas privadas incluem [PlasmaFold](https://pse.dev/projects/plasma-fold) (pagamentos privados) e sistemas como [MACI](https://pse.dev/projects/maci) e [Semaphore](https://pse.dev/projects/semaphore) (votação privada).

Essas ferramentas expandem as opções para escrever de forma privada no Ethereum, mas cada uma vem com suas desvantagens. Algumas abordagens ainda são experimentais, outras aumentam os custos ou a complexidade, e algumas ferramentas, como os mixers, podem enfrentar escrutínio legal ou regulatório, dependendo de como são usadas.

## Privacidade para leituras {#privacy-of-reads}

A leitura ou verificação de qualquer informação no Ethereum (por exemplo, o saldo da sua carteira) geralmente passa por um serviço como o provedor da sua carteira, um provedor de nós ou um explorador de blocos. Como você depende deles para ler a cadeia de blocos para você, eles também podem ver suas solicitações junto com metadados como seu endereço IP ou localização. Se você continuar verificando a mesma conta, essas informações podem ser reunidas para vincular sua identidade à sua atividade.

Executar seu próprio nó do Ethereum evitaria isso, mas armazenar e sincronizar toda a cadeia de blocos continua sendo caro e impraticável para a maioria dos usuários, especialmente em dispositivos móveis.

Alguns projetos que exploram leituras privadas incluem [Private Information Retrieval](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (PIR, buscar dados sem revelar o que você está procurando), [zkID](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (verificações de identidade privada com provas de conhecimento zero), [vOPRF](https://pse.dev/projects/voprf) (usar contas Web2 de forma pseudônima na Web3), [vFHE](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (computar em dados criptografados) e [MachinaIO](https://pse.dev/projects/machina-io) (ocultar detalhes do programa mantendo a funcionalidade).

## Privacidade para comprovação {#privacy-of-proving}

Provas de preservação da privacidade são ferramentas que você pode usar no Ethereum para mostrar que algo é verdadeiro sem revelar detalhes desnecessários. Por exemplo, você poderia:

- Provar que você tem mais de 18 anos sem compartilhar sua data de nascimento completa
- Provar a propriedade de um NFT ou token sem revelar sua carteira inteira
- Provar a elegibilidade para uma associação, recompensa ou voto sem expor outros dados pessoais

A maioria das ferramentas para isso depende de técnicas criptográficas como provas de conhecimento zero, mas o desafio é torná-las eficientes o suficiente para serem executadas em dispositivos do dia a dia, portáteis para qualquer plataforma e seguras.

Alguns projetos que exploram a privacidade para comprovação incluem [Client Side Proving](https://pse.dev/projects/client-side-proving) (sistemas de comprovação ZK), [TLSNotary](https://tlsnotary.org/), (provas de autenticidade para quaisquer dados na web), [Mopro](https://pse.dev/projects/mopro) (comprovação do lado do cliente móvel), [Private Proof Delegation](https://pse.dev/projects/private-proof-delegation) (estruturas de delegação que evitam suposições de confiança) e [Noir](https://noir-lang.org/) (linguagem para computação privada e verificável).

## Glossário de Privacidade {#privacy-glossary}

**Anônimo**: interagir com todos os identificadores removidos permanentemente de seus dados, impossibilitando rastrear as informações até um indivíduo

**Criptografia**: um processo que embaralha os dados para que apenas alguém com a chave correta possa lê-los

**[Criptografia Totalmente Homomórfica](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (FHE)**: uma forma de realizar cálculos diretamente em dados criptografados, sem nunca descriptografá-los

**[Ofuscação Indistinguível](https://pse.dev/projects/machina-io) (iO)**: técnicas de privacidade que tornam programas ou dados ininteligíveis, mas ainda utilizáveis

**[Computação Multipartidária Segura](https://pse.dev/blog/secure-multi-party-computation) (MPC)**: métodos que permitem que várias partes calculem um resultado juntas sem expor suas entradas privadas

**Criptografia programável**: criptografia flexível e orientada por regras que pode ser personalizada em software para controlar como e quando os dados são compartilhados, verificados ou revelados

**Pseudônimo**: usando códigos ou números exclusivos (como um endereço Ethereum) em vez de identificadores pessoais

**Divulgação seletiva**: a capacidade de compartilhar apenas o necessário (por exemplo, provar que você possui um NFT sem revelar todo o histórico da sua carteira)

**Não vinculação**: garantir que ações separadas na cadeia de blocos não possam ser vinculadas ao mesmo endereço

**Verificabilidade**: garantir que outros possam confirmar que uma alegação é verdadeira, como validar uma transação ou prova no Ethereum

**Delegação verificável**: atribuir uma tarefa, como gerar uma prova, a outra parte (por exemplo, uma carteira móvel usando um servidor para criptografia pesada) e ainda ser capaz de verificar se foi feita corretamente

**[Provas de Conhecimento Zero](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) (ZKPs)**: protocolos criptográficos que permitem que alguém prove que a informação é verdadeira sem revelar os dados subjacentes

**ZK Rollup**: um sistema de escalabilidade que agrupa transações fora da cadeia e envia uma prova de validade na cadeia; não é privado por padrão, mas permite sistemas de privacidade eficientes (como pools blindados), reduzindo os custos

## Documentos {#resources}

- [Guardiões da Privacidade do Ethereum](https://pse.dev/) (PSE), um laboratório de pesquisa e desenvolvimento da Ethereum Foundation focado na privacidade para o ecossistema
- [Web3PrivacyNow](https://web3privacy.info/), uma rede de pessoas, projetos e organizações alinhadas que protegem e promovem os direitos humanos online
- [WalletBeat](https://beta.walletbeat.eth.limo/wallet/summary/), um site de classificação de carteiras Ethereum que visa fornecer uma lista abrangente de carteiras, suas funcionalidades, práticas e suporte a determinados padrões.
- [Zk-kit](https://zkkit.pse.dev/): Um conjunto de bibliotecas (algoritmos, funções utilitárias e estruturas de dados) que podem ser reutilizadas em diferentes projetos e protocolos de conhecimento zero.
- [Aplicativos de privacidade](/apps/categories/privacy/) - Descubra uma lista de aplicativos de privacidade selecionados que rodam no Ethereum.
