---
title: Identidade descentralizada
description: O que é a identidade descentralizada, e porque é importante?
lang: pt
template: use-cases
emoji: ":id:"
sidebarDepth: 2
image: /images/eth-gif-cat.png
summaryPoint1: Nos sistemas de identidade tradicionais, a emissão, manutenção e controlo da identificação dos utilizadores são centralizadas.
summaryPoint2: Um sistema de identidade descentralizada deixa de depender de terceiros centralizados.
summaryPoint3: Graças à criptografia, os utilizadores possuem agora as ferramentas para conseguir emitir, manter e controlar a sua identificação e a respetiva prova da mesma.
---

Atualmente, a identidade está subjacente a praticamente todos os aspetos das nossas vidas. Utilizar serviços online, abrir uma conta bancária, votar em eleições, comprar um imóvel, garantir um emprego - tudo isto requer a prova da sua identidade.

No entanto, os sistemas tradicionais de gestão de identidades há muito que dependem de intermediários centralizados que emitem, detêm e controlam os identificadores e [sua validação](/glossary/#attestation). Isto significa que não pode controlar as informações relacionadas com a sua identidade ou decidir quem tem acesso a informações pessoalmente identificáveis (IPI) e qual o grau de acesso que essas entidades têm.

Para resolver estes problemas, temos sistemas de identidade descentralizados construídos em blockchains públicos como o Ethereum. A identidade descentralizada permite aos indivíduos gerir a informação relacionada com a sua identidade. Com soluções de identidade descentralizadas, _podemos_ criar identificadores e reivindicar e manter as nossas certificações sem depender de autoridades centrais, como fornecedores de serviços ou governos.

## O que é a identidade? {#what-is-identity}

Identidade significa o sentido de individualidade de um indivíduo, definido por caraterísticas únicas. A identidade refere-se a ser um _indivíduo_, ou seja, uma entidade humana distinta. A identidade pode também referir-se a outras entidades não humanas, como uma organização ou autoridade.

<YouTube id="Ew-_F-OtDFI" />

## O que são identificadores? {#what-are-identifiers}

Um identificador é um tipo de informação que funciona como um identificador para uma identidade ou identidades específicas. Os identificadores mais comuns incluem:

- Nome
- Número da segurança social/número de identificação fiscal
- Número de telemóvel
- Data e local de nascimento
- Credenciais de identificação digital, por exemplo, endereços de correio eletrónico, nomes de utilizador, avatares

Estes exemplos convencionais de identificadores são emitidos, detidos e controlados por entidades centrais. É necessária uma autorização do governo para alterar o nosso nome ou de uma plataforma de rede social para alterar o nosso nome de utilizador.

## Benefícios da identidade descentralizada {#benefits-of-decentralized-identity}

1. A identidade descentralizada reforça o controlo individual das informações de identificação. Os identificadores e certificados descentralizados podem ser verificados sem depender de autoridades centralizadas ou serviços de terceiros.

2. As soluções de identidade descentralizadas facilitam um método sem necessidade de confiança, sem falhas e com proteção da privacidade para verificar e gerir a identidade do utilizador.

3. A identidade descentralizada aproveita a tecnologia blockchain, que cria relações de confiança entre diferentes partes e fornece garantias criptográficas para provar a validade dos certificados.

4. A Identidade descentralizada torna portáteis os dados de identidade. Os utilizadores armazenam certificados e identificadores na carteira móvel e podem partilhá-los com qualquer entidade à sua escolha. Os identificadores e certificados descentralizados não ficam bloqueados na base de dados da organização emissora.

5. A identidade descentralizada deve funcionar com as tecnologias emergentes de [conhecimento zero](/glossary/#zk-proof) que permitirão aos indivíduos provar que possuem ou realizaram algo sem revelar o que é esse algo. Esta pode tornar-se uma forma poderosa de combinar confiança e privacidade em aplicações como votações.

6. A identidade descentralizada permite que os mecanismos [anti-Sybil](/glossary/#anti-sybil) identifiquem quando um indivíduo humano está a fingir ser vários humanos para influenciar ou enviar spam para um sistema.

## Casos de utilização de identidade descentralizada {#decentralized-identity-use-cases}

A identidade descentralizada tem muitos exemplos potenciais de utilização:

### 1. Logins universais {#universal-dapp-logins}

A identidade descentralizada pode ajudar a substituir os logins baseados em palavra-passe por autenticação descentralizada. Os prestadores de serviços podem emitir certificados para os utilizadores, que podem ser armazenados numa carteira Ethereum. Um exemplo de certificado seria um [NFT](/glossary/#nft) que concede ao titular acesso a uma comunidade online.

Uma função [Sign-In com Ethereum](https://login.xyz/) permitiria então aos servidores confirmar a conta Ethereum do utilizador e obter o certificado necessário a partir do endereço da sua conta. Isto significa que os utilizadores podem aceder a plataformas e websites sem terem de memorizar palavras-passe longas e permite melhorar a experiência online dos utilizadores.

### 2. Autenticação KYC {#kyc-authentication}

A utilização de muitos serviços online exige que as pessoas forneçam certificados e credenciais, como a carta de condução ou o passaporte emitido pelo Estado. Mas esta abordagem é problemática porque as informações privadas do utilizador podem ser comprometidas e os prestadores de serviços não podem verificar a autenticidade do certificado.

A identidade descentralizada permite que as empresas ignorem os processos [Conheça o seu cliente (KYC)](https://en.wikipedia.org/wiki/Know_your_customer) convencionais e autentiquem as identidades dos utilizadores através de credenciais verificáveis. Isto reduz o custo de gestão da identidade e previne a utilização de documentação falsa.

### 3. As votações e as comunidades online {#voting-and-online-communities}

A votação online e as redes sociais são duas novas aplicações que permitem a descentralização da identidade. Os sistemas de votação online são suscetíveis à manipulação, especialmente se atores criminosos criarem identidades falsas para votar. Pedir às pessoas que apresentem certificados na cadeia pode melhorar a integridade dos processos de votação online.

A identidade descentralizada pode contribuir para a criação de comunidades online livres de contas falsas. Por exemplo, cada utilizador pode ter que autenticar a sua identidade usando um sistema de identidade na cadeia, como o Ethereum Name Service, limitando a possibilidade de bots.

### 4. Proteção anti-Sybil {#sybil-protection}

As aplicações de atribuição de subsídios que utilizam [votação quadrática](/glossary/#quadratic-voting) são vulneráveis a [ataques Sybil](/glossary/#sybil-attack) porque o valor de um subsídio aumenta quando mais indivíduos votam nele, incentivando os utilizadores a dividir as suas contribuições por várias identidades. As identidades descentralizadas ajudam a evitar esta situação, colocando sobre cada participante o ónus de provar que é realmente humano, embora muitas vezes sem ter de revelar informações privadas concretas.

## O que são certificações? {#what-are-attestations}

Uma certificação é uma afirmação feita por uma entidade sobre outra entidade. Se vive nos Estados Unidos, a carta de condução que lhe é emitida pelo Department of Motor Vehicles (uma entidade) atesta que você (outra entidade) está legalmente autorizado a conduzir um determinado tipo de veículo.

As certificações são diferentes dos identificadores. Uma certificação _contém_ identificadores que fazem referência a uma determinada identidade e faz uma declaração sobre um atributo relacionado com essa identidade. Assim, a sua carta de condução tem identificadores (nome, data de nascimento, morada) mas é também a certificação do seu direito legal de conduzir.

### O que são identificadores descentralizados? {#what-are-decentralized-identifiers}

Os identificadores tradicionais, como o seu nome jurídico ou endereço de correio eletrónico, dependem de terceiros - governos e fornecedores de correio eletrónico. Os identificadores descentralizados (DIDs) são diferentes - não são emitidos, geridos ou controlados por uma entidade central.

Os identificadores descentralizados são emitidos, detidos e controlados por pessoas singulares. Uma [conta Ethereum](/glossary/#account) é um exemplo de um identificador descentralizado. Pode criar tantas contas quantas quiser sem a permissão de terceiros e sem a necessidade de as armazenar num registo central.

Os identificadores descentralizados são armazenados em registos distribuídos[(blockchains](/glossary/#blockchain)) ou em [redes peer-to-peer](/glossary/#peer-to-peer-network). Isto torna os DIDs [únicos a nível mundial, resolúveis com elevada disponibilidade e criptograficamente verificáveis](https://w3c-ccg.github.io/did-primer/). Um identificador descentralizado pode ser associado a diferentes entidades, incluindo indivíduos, organizações ou instituições governamentais.

## O que torna possíveis os identificadores descentralizados? {#what-makes-decentralized-identifiers-possible}

### 1. Criptografia de chave pública {#public-key-cryptography}

A criptografia de chave pública é uma medida de segurança de informação que gera uma [chave publica](/glossary/#public-key) e uma [chave privada](/glossary/#private-key) para uma entidade. [Criptografia](/glossary/#cryptography) de chave pública é usada em redes de blockchain para autenticar a identidade do utilizador e provar a posse dos ativos digitais.

Alguns identificadores descentralizados, como uma conta Ethereum, têm chaves públicas e privadas. A chave pública identifica o responsável pelo controlo da conta, enquanto as chaves privadas podem assinar e desencriptar mensagens para esta conta. Criptografia de chave pública proporciona as provas necessárias para autenticar entidades e evitar representações falsas usando [ assinaturas criptográficas](https://andersbrownworth.com/blockchain/public-private-keys/) para verificar o que foi pedido.

### 2. Datastores descentralizados {#decentralized-datastores}

Um blockchain funciona como um registo de dados verificável: um repositório de informação aberto, isento e descentralizado. A existência de blockchains públicas elimina a necessidade de armazenar identificadores em registos centralizados.

Se alguém precisar de confirmar a validade de um identificador descentralizado, pode procurar a chave pública associada no blockchain. Isto é diferente dos identificadores tradicionais que exigem a autenticação de terceiros.

## Como é que os identificadores e os certificados descentralizados permitem a identidade descentralizada? {#how-decentralized-identifiers-and-attestations-enable-decentralized-identity}

A identidade descentralizada é a noção de que as informações relacionadas com a identidade devem ser autocontroladas, privadas e portáteis, sendo os identificadores e os certificados descentralizados os principais blocos de construção.

No contexto da identidade descentralizada, os certificados (também conhecidos como [Credenciais verificáveis](https://www.w3.org/TR/vc-data-model/)) são afirmações à prova de adulteração e criptograficamente verificáveis efetuadas pelo emissor. Todos os certificados ou Credenciais Verificáveis que uma entidade (por exemplo, uma organização) emite estão associados ao seu DID.

Uma vez que os DIDs são armazenados no blockchain, qualquer um pode verificar a validade de um certificado através da verificação cruzada do DID do emissor no Ethereum. Basicamente, a blockchain Ethereum funciona como um diretório global que permite a verificação de DIDs associados a determinadas entidades.

Os identificadores descentralizados são a razão pela qual os certificados são autocontrolados e verificáveis. Mesmo que o emissor já não exista, o titular tem sempre uma prova da proveniência e validade do certificado.

Os identificadores descentralizados são também cruciais para proteger a privacidade das informações pessoais através da identidade descentralizada. Por exemplo, se alguém apresentar um comprovativo de um certificado (uma carta de condução), a parte verificadora não precisa de verificar a validade das informações contidas no comprovativo. Neste caso, o verificador só precisa de garantias criptográficas da autenticidade do certificado e da identidade da organização emissora para determinar se a prova é válida.

## Tipos de certificados na identidade descentralizada {#types-of-attestations-in-decentralized-identity}

A forma como as informações de certificação são armazenadas e recuperadas num ecossistema de identidade baseado no Ethereum é diferente da gestão de identidade tradicional. Segue-se uma visão geral das várias abordagens à emissão, armazenamento e verificação de certificados em sistemas de identidade descentralizados:

### Certificados Off-chain {#off-chain-attestations}

Uma preocupação com o armazenamento de certificados na cadeia é o facto de poderem conter informações que as pessoas pretendem manter privadas. A natureza pública da blockchain Ethereum torna pouco atrativo o armazenamento de tais certificados.

A solução consiste em emitir certificados, detidos pelos utilizadores fora da cadeia em carteiras digitais, mas assinados com o DID do emissor armazenado na cadeia. Estes certificados são codificados como [JSON Web Tokens](https://en.wikipedia.org/wiki/JSON_Web_Token) e contêm a assinatura digital do emissor, o que permite uma fácil verificação de declarações fora da cadeia.

Apresentamos aqui um cenário hipotético para explicar os certificados fora da cadeia:

1. Uma universidade (o emissor) gera um certificado (um diploma académico digital), assina com as suas chaves e emite-o para Bob (o proprietário da identidade).

2. Bob candidata-se a um emprego e quer provar as suas habilitações académicas a um empregador, pelo que partilha o certificado na sua carteira móvel. A empresa (o verificador) pode então confirmar a validade do certificado verificando o DID do emissor (ou seja, a sua chave pública no Ethereum).

### Certificados fora da cadeia com acesso persistente {#offchain-attestations-with-persistent-access}

De acordo com este esquema, os certificados são transformados em ficheiros JSON e armazenados fora da cadeia (idealmente numa plataforma de [armazenamento descentralizado na nuvem](/developers/docs/storage/), como IPFS ou Swarm). No entanto, um [hash](/glossary/#hash) do ficheiro JSON é armazenado na cadeia e ligado a um DID através de um registo na cadeia. A DID associada pode ser a do emissor do certificado ou a do destinatário.

Esta abordagem permite que os certificados ganhem persistência com base na blockchain, mantendo a informação dos pedidos encriptada e verificável. Permite também a divulgação seletiva, uma vez que o detentor da chave privada pode decifrar a informação.

### Certificados na cadeia {#onchain-attestations}

Os certificados na cadeia são mantidos em [contratos inteligentes](/glossary/#smart-contract) na blockchain Ethereum. O contrato inteligente (agindo como um registo) mapeará um certificado para um identificador descentralizado correspondente na cadeia (uma chave pública).

Segue-se um exemplo para mostrar como os certificados na cadeia podem funcionar na prática:

1. Uma empresa (XYZ Corp) pretende vender ações de propriedade usando um contrato inteligente, mas só quer compradores que tenham concluído uma verificação do seu historial.

2. A XYZ Corp pode fazer com que a empresa que efetua verificações de historiais emita certificados na cadeia no Ethereum. Este certificado comprova que uma pessoa passou a verificação do historial sem expor qualquer informação pessoal.

3. O contrato inteligente que efetua a venda de ações pode verificar no contrato de registo as identidades dos compradores selecionados, o que permite ao contrato inteligente determinar quem está autorizado a comprar ou não ações.

### Tokens Soulbound (de alma) e identidade {#soulbound}

[Os tokens de alma](https://vitalik.eth.limo/general/2022/01/26/soulbound.html)[(NFTs não transferíveis](/glossary/#nft)) podem ser utilizados para recolher informações exclusivas de uma carteira específica. Isto cria efetivamente uma identidade única na cadeia ligada a um endereço Ethereum específico que pode incluir tokens que representam realizações (por exemplo, terminar um curso online específico ou passar uma pontuação limite num jogo) ou participação na comunidade.

## Utilizar identidade descentralizada {#use-decentralized-identity}

Existem muitos projetos ambiciosos que utilizam o Ethereum como base para soluções de identidade descentralizadas:

- **[Ethereum Name Service (ENS)](https://ens.domains/)** - _ Um sistema de nomenclatura descentralizado para identificadores legíveis por computadores na cadeia, como endereços de carteira Ethereum, hashes de conteúdo e metadados._
- **[SpruceID](https://www.spruceid.com/)** - _Um projeto de identidade descentralizado que permite aos utilizadores controlar a identidade digital com contas Ethereum e perfis ENS em vez de dependerem de serviços de terceiros._
- **[Ethereum Attestation Service (EAS)](https://attest.sh/)** - _Um livro-razão/protocolo descentralizado para fazer certificações na cadeia ou fora da cadeia sobre qualquer coisa._
- **[Proof of Humanity](https://www.proofofhumanity.id)** - _Proof of Humanity (ou PoH) é um sistema de verificação de identidade social desenvolvido em Ethereum._
- **[BrightID](https://www.brightid.org/)** - _Uma rede de identidade social descentralizada e de código aberto que procura reformular a verificação de identidade através da criação e análise de um diagrama social._
- **[walt.id](https://walt.id)** - _Identidade descentralizada de código aberto e infraestrutura de carteira que permite aos programadores e às organizações tirar partido da identidade auto-soberana e das NFTs/SBTs._
- **[Veramo](https://veramo.io/)** - _ Uma framework JavaScript que torna fácil para qualquer pessoa usar dados que são verificáveis criptograficamente na sua aplicação_

## Leitura adicional {#further-reading}

### Artigos {#articles}

- [Exemplos de uso de blockchain: Blockchain na Identidade Digital](https://consensys.net/blockchain-use-cases/digital-identity/) - _ConsenSys_
- [O que é o Ethereum ERC725? Gestão da identidade auto-soberana na Blockchain](https://cryptoslate.com/what-is-erc725-self-sovereign-identity-management-on-the-blockchain/) - _Sam Town_
- [Como a blockchain pode resolver o problema da identidade digital](https://time.com/6142810/proof-of-humanity/) - _Andrew R. Chow_
- [O que é identidade descentralizada e por que motivo nos devemos interessar?](https://web3.hashnode.com/what-is-decentralized-identity) - _Emmanuel Awosika_
- [Introdução à identidade descentralizada](https://walt.id/white-paper/digital-identity) — _Dominik Beron_

### Vídeos {#videos}

- [Identidade descentralizada (sessão de transmissão ao vivo como bónus)](https://www.youtube.com/watch?v=ySHNB1za_SE&t=539s) - _Um excelente vídeo explicativo sobre identidade descentralizada por Andreas Antonopolous_
- [Sign-in com Ethereum e identidade descentralizada com Ceramic, IDX, React e 3ID Connect](https://www.youtube.com/watch?v=t9gWZYJxk7c) - _Tutorial no YouTube sobre a elaboração de um sistema de gestão de identidade para criar, ler e atualizar o perfil de um indivíduo usando a carteira Ethereum por Nader Dabit_
- [BrightID - Identidade descentralizada no Ethereum](https://www.youtube.com/watch?v=D3DbMFYGRoM) - _Episódio de podcast sobre o BrightID, uma solução de identidade descentralizada para o Ethereum_
- [A Internet fora da cadeia: Identidade Descentralizada & Credenciais Verificáveis](https://www.youtube.com/watch?v=EZ_Bb6j87mg) - EthDenver 2022 apresentação feita por Evin McMullen
- [Explicação das credenciais verificáveis](https://www.youtube.com/watch?v=ce1IdSr-Kig) - vídeo explicativo do YouTube com demonstração de Tamino Baumann

### Comunidades {#communities}

- [Aliança ERC-725 no GitHub](https://github.com/erc725alliance) - _Apoiantes da norma ERC725 para a gestão da identidade na blockchain Ethereum_
- [Servidor Discord do SpruceID](https://discord.com/invite/Sf9tSFzrnt) - _Comunidade para entusiastas e programadores que trabalham no Sign-in com Ethereum_
- [Veramo Labs](https://discord.gg/sYBUXpACh4) - _Uma comunidade de programadores que contribui para a criação de uma estrutura de dados verificáveis para aplicações_
- [walt.id](https://discord.com/invite/AW8AgqJthZ) — _ Uma comunidade de programadores e criadores que trabalham em casos de uso para identidade descentralizada entre várias industrias_
