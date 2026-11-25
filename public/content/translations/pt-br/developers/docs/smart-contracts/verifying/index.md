---
title: Verificando contratos inteligentes
description: "Uma visão geral da verificação de código-fonte para contratos inteligentes do Ethereum"
lang: pt-br
---

[Contratos inteligentes](/developers/docs/smart-contracts/) são projetados para serem "sem necessidade de confiança", o que significa que os usuários não deveriam ter que confiar em terceiros (por exemplo, desenvolvedores e empresas) antes de interagir com um contrato. Como um requisito para a desnecessidade de confiança, usuários e outros desenvolvedores devem ser capazes de verificar o código-fonte de um contrato inteligente. A verificação de código-fonte garante aos usuários e desenvolvedores que o código do contrato publicado é o mesmo código em execução no endereço do contrato na blockchain do Ethereum.

É importante fazer a distinção entre "verificação de código-fonte" e "[verificação formal](/developers/docs/smart-contracts/formal-verification/)". A verificação de código-fonte, que será explicada em detalhes abaixo, refere-se a verificar se o código-fonte fornecido de um contrato inteligente em uma linguagem de alto nível (por exemplo, Solidity) é compilado para o mesmo bytecode a ser executado no endereço do contrato. No entanto, a verificação formal descreve a verificação da exatidão de um contrato inteligente, o que significa que o contrato se comporta conforme o esperado. Embora dependa do contexto, a verificação de contrato geralmente se refere à verificação de código-fonte.

## O que é verificação de código-fonte? {#what-is-source-code-verification}

Antes de implantar um contrato inteligente na [Máquina Virtual Ethereum (EVM)](/developers/docs/evm/), os desenvolvedores [compilam](/developers/docs/smart-contracts/compiling/) o código-fonte do contrato — instruções [escritas em Solidity](/developers/docs/smart-contracts/languages/) ou em outra linguagem de programação de alto nível — para bytecode. Como a EVM não pode interpretar instruções de alto nível, a compilação do código-fonte para bytecode (ou seja, instruções de máquina de baixo nível) é necessária para executar a lógica do contrato na EVM.

A verificação de código-fonte é a comparação do código-fonte de um contrato inteligente e o bytecode compilado usado durante a criação do contrato para detectar quaisquer diferenças. A verificação de contratos inteligentes é importante porque o código do contrato anunciado pode ser diferente do que é executado na blockchain.

A verificação de contratos inteligentes permite investigar o que um contrato faz por meio da linguagem de nível mais alto em que está escrito, sem ter que ler código de máquina. Funções, valores e, geralmente, os nomes das variáveis e comentários permanecem os mesmos com o código-fonte original que é compilado e implantado. Isso torna a leitura do código muito mais fácil. A verificação de código-fonte também prevê a documentação do código, para que os usuários finais saibam o que um contrato inteligente foi projetado para fazer.

### O que é uma correspondência exata? {#full-verification}

Existem algumas partes do código-fonte que não afetam o bytecode compilado, como comentários ou nomes de variáveis. Isso significa que dois códigos-fonte com nomes de variáveis diferentes e comentários diferentes seriam capazes de verificar o mesmo contrato. Com isso, um ator mal-intencionado pode adicionar comentários enganosos ou dar nomes de variáveis enganosos dentro do código-fonte e obter o contrato verificado com um código-fonte diferente do código-fonte original.

É possível evitar isso anexando dados extras ao bytecode para servir como uma _garantia criptográfica_ para a exatidão do código-fonte e como uma _impressão digital_ das informações de compilação. As informações necessárias são encontradas nos [metadados do contrato Solidity](https://docs.soliditylang.org/en/latest/metadata.html), e o hash deste arquivo é anexado ao final do bytecode do contrato. Você pode ver isso em ação no [playground de metadados](https://playground.sourcify.dev)

O arquivo de metadados contém informações sobre a compilação do contrato, incluindo as configurações do compilador e os nomes e hashes dos arquivos de código-fonte. Ou seja, se qualquer uma das configurações de compilação ou até mesmo um byte em um dos arquivos de código-fonte mudar, o arquivo de metadados muda. Consequentemente, o hash do arquivo de metadados, que é anexado ao bytecode, também muda. Isso significa que se o bytecode de um contrato + o hash de metadados anexado corresponderem ao código-fonte e às configurações de compilação fornecidos, podemos ter certeza de que este é exatamente o mesmo código-fonte usado na compilação original, nem mesmo um único byte é diferente.

Esse tipo de verificação que aproveita o hash de metadados é chamado de **"[correspondência exata](https://docs.sourcify.dev/docs/exact-match-vs-match/)"** (anteriormente correspondência "total" ou "perfeita"). Se os hashes de metadados não corresponderem ou não forem considerados na verificação, é uma **"correspondência"** (anteriormente "correspondência parcial"): o código do contrato é verificado, mas seus arquivos de código-fonte podem diferir dos originais, por exemplo, em comentários ou nomes de arquivos. É possível [inserir código malicioso](https://samczsun.com/hiding-in-plain-sight/) que não seria refletido no código-fonte verificado sem uma correspondência exata. A maioria dos desenvolvedores não está ciente das correspondências exatas e não mantém o arquivo de metadados de sua compilação, portanto, as correspondências sem o hash de metadados têm sido a maneira mais comum de verificar contratos até agora.

## Por que a verificação de código-fonte é importante? {#importance-of-source-code-verification}

### Desnecessidade de confiança {#trustlessness}

A desnecessidade de confiança é indiscutivelmente a maior premissa para contratos inteligentes e [aplicativos descentralizados (dapps)](/developers/docs/dapps/). Os contratos inteligentes são "imutáveis" e não podem ser alterados; um contrato executará apenas a lógica de negócios definida no código no momento da implantação. Isso significa que desenvolvedores e empresas não podem adulterar o código de um contrato após implantar no Ethereum.

Para que um contrato inteligente seja sem necessidade de confiança, o código do contrato deve estar disponível para verificação independente. Embora o bytecode compilado para cada contrato inteligente esteja publicamente disponível na blockchain, a linguagem de baixo nível é difícil de entender — tanto para desenvolvedores quanto para usuários.

Os projetos reduzem as premissas de confiança publicando o código-fonte de seus contratos. Mas isso leva a outro problema: é difícil verificar se o código-fonte publicado corresponde ao bytecode do contrato. Nesse cenário, o valor da desnecessidade de confiança é perdido porque os usuários precisam confiar que os desenvolvedores não alterarão a lógica de negócios de um contrato (ou seja, alterando o bytecode) antes de implantá-lo na blockchain.

As ferramentas de verificação de código-fonte fornecem garantias de que os arquivos de código-fonte de um contrato inteligente correspondem ao código assembly. O resultado é um ecossistema sem necessidade de confiança, onde os usuários não confiam cegamente em terceiros e, em vez disso, verificam o código antes de depositar fundos em um contrato.

### Segurança do usuário {#user-safety}

Com contratos inteligentes, geralmente há muito dinheiro em jogo. Isso exige maiores garantias de segurança e verificação da lógica de um contrato inteligente antes de usá-lo. O problema é que desenvolvedores inescrupulosos podem enganar os usuários inserindo código malicioso em um contrato inteligente. Sem verificação, contratos inteligentes maliciosos podem ter [backdoors](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts), mecanismos de controle de acesso controversos, vulnerabilidades exploráveis e outras coisas que prejudicam a segurança do usuário que passariam despercebidas.

A publicação dos arquivos de código-fonte de um contrato inteligente torna mais fácil para os interessados, como auditores, avaliar o contrato em busca de possíveis vetores de ataque. Com várias partes verificando independentemente um contrato inteligente, os usuários têm garantias mais fortes de sua segurança.

## Como verificar o código-fonte de contratos inteligentes do Ethereum {#source-code-verification-for-ethereum-smart-contracts}

[Implantar um contrato inteligente no Ethereum](/developers/docs/smart-contracts/deploying/) requer o envio de uma transação com uma carga de dados (bytecode compilado) para um endereço especial. A carga de dados é gerada pela compilação do código-fonte, mais os [argumentos do construtor](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor) da instância do contrato anexados à carga de dados na transação. A compilação é determinística, o que significa que sempre produz a mesma saída (ou seja, bytecode do contrato) se os mesmos arquivos de código-fonte e configurações de compilação (por exemplo, versão do compilador, otimizador) forem usados. Os nomes e caminhos dos arquivos de código-fonte também fazem parte dessa entrada: eles são registrados nos metadados, portanto, renomear um arquivo altera o hash de metadados.

<SourceVerifyDiagram />

A verificação de um contrato inteligente envolve basicamente as seguintes etapas:

1. Insira os arquivos de código-fonte e as configurações de compilação em um compilador.

2. O compilador gera o bytecode do contrato

3. Obtenha o bytecode do contrato implantado em um determinado endereço (com `eth_getCode`)

4. Compare o bytecode implantado com o bytecode recompilado. Se os códigos corresponderem, o contrato será verificado com o código-fonte e as configurações de compilação fornecidos.

5. Além disso, se os hashes de metadados no final do bytecode corresponderem, será uma correspondência exata.

Os verificadores também podem comparar o bytecode de criação do contrato: o código que o implantou (para um contrato implantado diretamente de uma conta, a entrada da transação de implantação), que é o bytecode compilado seguido pelos [argumentos do construtor](https://docs.soliditylang.org/en/latest/contracts.html#constructor) codificados.

Observe que esta é uma descrição simplista da verificação e há muitas exceções que não funcionariam com isso, como ter [variáveis imutáveis](https://docs.sourcify.dev/docs/immutables/).

## Ferramentas de verificação de código-fonte {#source-code-verification-tools}

O processo tradicional de verificação de contratos pode ser complexo. É por isso que temos ferramentas para verificar o código-fonte de contratos inteligentes implantados no Ethereum. Essas ferramentas automatizam grandes partes da verificação de código-fonte e também fazem a curadoria de contratos verificados para o benefício dos usuários.

### Etherscan {#etherscan}

Embora seja mais conhecido como um [explorador da blockchain do Ethereum](/developers/docs/data-and-analytics/block-explorers/), o Etherscan também oferece um [serviço de verificação de código-fonte](https://etherscan.io/verifyContract) para desenvolvedores e usuários de contratos inteligentes.

O Etherscan permite que você recompile o bytecode do contrato a partir da carga de dados original (código-fonte, endereço da biblioteca, configurações do compilador, endereço do contrato, etc.). Se o bytecode recompilado estiver associado ao bytecode (e aos parâmetros do construtor) do contrato onchain, então [o contrato é verificado](https://info.etherscan.com/types-of-contract-verification/).

Uma vez verificado, o código-fonte do seu contrato recebe um rótulo "Verificado" e é publicado no Etherscan para que outros possam auditar. Ele também é adicionado à seção de [Contratos Verificados](https://etherscan.io/contractsVerified/) — um repositório de contratos inteligentes com códigos-fonte verificados.

O Etherscan é a ferramenta mais usada para verificar contratos. Ele rotula cada contrato verificado por [como ele correspondeu](https://info.etherscan.com/types-of-contract-verification/): uma correspondência exata do bytecode de criação do contrato e dos argumentos do construtor, uma correspondência em tempo de execução apenas do seu bytecode implantado, ou uma correspondência semelhante, dada automaticamente quando o bytecode de um contrato corresponde ao de um contrato já verificado. A correspondência exata do Etherscan é sobre o bytecode de criação e os argumentos do construtor; não é a mesma distinção que a correspondência exata e a correspondência descritas acima.

[Mais sobre a verificação de contratos no Etherscan](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327).

### Blockscout {#blockscout}

O [Blockscout](https://blockscout.com/) é um explorador de blocos de código aberto que também fornece um [serviço de verificação de contrato](https://eth.blockscout.com/contract-verification) para desenvolvedores e usuários de contratos inteligentes. Como uma alternativa de código aberto, o Blockscout oferece transparência em como a verificação é realizada e permite contribuições da comunidade para melhorar o processo de verificação.

Semelhante a outros serviços de verificação, o Blockscout permite que você verifique o código-fonte do seu contrato recompilando o bytecode e comparando-o com o contrato implantado. Uma vez verificado, seu contrato recebe o status de verificação e o código-fonte se torna publicamente disponível para auditoria e interação. Os contratos verificados também são listados no [repositório de contratos verificados](https://eth.blockscout.com/verified-contracts) do Blockscout para facilitar a navegação e a descoberta.

### Sourcify {#sourcify}

O [Sourcify](https://verify.sourcify.dev) é outra ferramenta para verificar contratos que é de código aberto e descentralizada. Ele não é um explorador de blocos e apenas verifica contratos em [diferentes redes baseadas na EVM](https://docs.sourcify.dev/docs/chains). Ele atua como uma infraestrutura pública para outras ferramentas construírem sobre ele, e visa permitir interações de contrato mais amigáveis para humanos usando a [Interface Binária de Aplicação (ABI)](/developers/docs/smart-contracts/compiling/#web-applications) e os comentários [NatSpec](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html) encontrados no arquivo de metadados.

O Sourcify relata se um contrato é uma correspondência exata, com o hash de metadados, ou uma correspondência sem ele, tanto para sua criação quanto para seu bytecode implantado. Seus contratos verificados são públicos: eles podem ser consultados por meio de sua Interface de Programação de Aplicações (API) e baixados como um [conjunto de dados](https://docs.sourcify.dev/docs/repository/). O Sourcify repassa suas verificações para exploradores de blocos, incluindo Blockscout, Routescan e Etherscan, e compartilha um banco de dados de contratos verificados com o Blockscout e o Routescan por meio da [Verifier Alliance](https://verifieralliance.org/).

O arquivo de metadados também contém os hashes do IPFS dos arquivos de código-fonte, e o hash de metadados anexado ao bytecode é em si um hash do IPFS. Se um desenvolvedor publicar os metadados e os arquivos de código-fonte no [IPFS](https://docs.ipfs.tech/concepts/what-is-ipfs/), qualquer pessoa pode buscar as fontes exatas de um contrato apenas a partir de seu bytecode, desde que os arquivos permaneçam disponíveis no IPFS. Um contrato pode ser verificado fornecendo o arquivo de metadados e os arquivos de código-fonte por meio de sua API ou da [interface de usuário (UI)](https://verify.sourcify.dev), ou usando plugins para ferramentas de desenvolvimento como Hardhat e Foundry. O [monitor](https://docs.sourcify.dev/docs/monitoring/) do Sourcify também observa novos contratos nas cadeias que ele segue e os verifica automaticamente quando seus metadados e arquivos de código-fonte são publicados no IPFS.

[Mais sobre a verificação de contratos no Sourcify](https://soliditylang.org/blog/2020/06/25/sourcify-faq/).

### Tenderly {#tenderly}

A [plataforma Tenderly](https://tenderly.co/) permite que os desenvolvedores da Web3 construam, testem, monitorem e operem contratos inteligentes. Combinando ferramentas de depuração com observabilidade e blocos de construção de infraestrutura, o Tenderly ajuda os desenvolvedores a acelerar o desenvolvimento de contratos inteligentes. Para habilitar totalmente os recursos do Tenderly, os desenvolvedores precisam [realizar a verificação de código-fonte](https://docs.tenderly.co/contract-verification) usando vários métodos.

É possível verificar um contrato de forma privada ou pública. Se verificado de forma privada, o contrato inteligente fica visível apenas para você (e outros membros do seu projeto). Verificar um contrato publicamente o torna visível para todos que usam a plataforma Tenderly.

Você pode verificar seus contratos usando o [Painel](https://docs.tenderly.co/contract-verification), o [plugin Tenderly Hardhat](https://docs.tenderly.co/contract-verification/hardhat) ou o [Foundry](https://docs.tenderly.co/contract-verification/foundry).

Ao verificar contratos por meio do Painel, você precisa importar o arquivo de código-fonte ou o arquivo de metadados gerado pelo compilador Solidity, o endereço/rede e as configurações do compilador.

O uso do plugin Tenderly Hardhat permite mais controle sobre o processo de verificação com menos esforço, permitindo que você escolha entre a verificação automática (sem código) e a manual (baseada em código).

## Leitura adicional {#further-reading}

- [Verificando o código-fonte do contrato](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)
