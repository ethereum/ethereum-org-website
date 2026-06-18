---
title: Verificando contratos inteligentes
description: "Uma visão geral da verificação de código-fonte para contratos inteligentes do Ethereum"
lang: pt-br
---

[Contratos inteligentes](/developers/docs/smart-contracts/) são projetados para serem "sem necessidade de confiança", o que significa que os usuários não devem ter que confiar em terceiros (por exemplo, desenvolvedores e empresas) antes de interagir com um contrato. Como requisito para a desnecessidade de confiança, usuários e outros desenvolvedores devem ser capazes de verificar o código-fonte de um contrato inteligente. A verificação de código-fonte garante aos usuários e desenvolvedores que o código do contrato publicado é o mesmo código em execução no endereço do contrato na blockchain do Ethereum.

É importante fazer a distinção entre "verificação de código-fonte" e "[verificação formal](/developers/docs/smart-contracts/formal-verification/)". A verificação de código-fonte, que será explicada em detalhes abaixo, refere-se a verificar se o código-fonte fornecido de um contrato inteligente em uma linguagem de alto nível (por exemplo, Solidity) é compilado para o mesmo bytecode a ser executado no endereço do contrato. No entanto, a verificação formal descreve a verificação da exatidão de um contrato inteligente, o que significa que o contrato se comporta conforme o esperado. Embora dependa do contexto, a verificação de contrato geralmente se refere à verificação de código-fonte.

## O que é verificação de código-fonte? {#what-is-source-code-verification}

Antes da implantação de um contrato inteligente na [Máquina Virtual Ethereum (EVM)](/developers/docs/evm/), os desenvolvedores [compilam](/developers/docs/smart-contracts/compiling/) o código-fonte do contrato — instruções [escritas em Solidity](/developers/docs/smart-contracts/languages/) ou em outra linguagem de programação de alto nível — para bytecode. Como a EVM não pode interpretar instruções de alto nível, a compilação do código-fonte para bytecode (ou seja, instruções de máquina de baixo nível) é necessária para executar a lógica do contrato na EVM.

A verificação de código-fonte consiste em comparar o código-fonte de um contrato inteligente e o bytecode compilado usado durante a criação do contrato para detectar quaisquer diferenças. A verificação de contratos inteligentes é importante porque o código do contrato anunciado pode ser diferente do que é executado na blockchain.

A verificação de contratos inteligentes permite investigar o que um contrato faz por meio da linguagem de alto nível em que está escrito, sem precisar ler o código de máquina. Funções, valores e, geralmente, os nomes das variáveis e comentários permanecem os mesmos do código-fonte original que é compilado e implantado. Isso torna a leitura do código muito mais fácil. A verificação de código-fonte também prevê a documentação do código, para que os usuários finais saibam o que um contrato inteligente foi projetado para fazer.

### O que é verificação completa? {#full-verification}

Existem algumas partes do código-fonte que não afetam o bytecode compilado, como comentários ou nomes de variáveis. Isso significa que dois códigos-fonte com nomes de variáveis diferentes e comentários diferentes seriam capazes de verificar o mesmo contrato. Com isso, um ator mal-intencionado pode adicionar comentários enganosos ou dar nomes de variáveis enganosos dentro do código-fonte e obter o contrato verificado com um código-fonte diferente do código-fonte original.

É possível evitar isso anexando dados extras ao bytecode para servir como uma _garantia criptográfica_ da exatidão do código-fonte e como uma _impressão digital_ das informações de compilação. As informações necessárias são encontradas nos [metadados do contrato em Solidity](https://docs.soliditylang.org/en/v0.8.15/metadata.html), e o hash deste arquivo é anexado ao bytecode de um contrato. Você pode ver isso em ação no [playground de metadados](https://playground.sourcify.dev)

O arquivo de metadados contém informações sobre a compilação do contrato, incluindo os arquivos de origem e seus hashes. Ou seja, se qualquer uma das configurações de compilação ou até mesmo um byte em um dos arquivos de origem mudar, o arquivo de metadados muda. Consequentemente, o hash do arquivo de metadados, que é anexado ao bytecode, também muda. Isso significa que se o bytecode de um contrato + o hash de metadados anexado corresponderem ao código-fonte e às configurações de compilação fornecidos, podemos ter certeza de que este é exatamente o mesmo código-fonte usado na compilação original, nem mesmo um único byte é diferente.

Esse tipo de verificação que aproveita o hash de metadados é chamado de **"[verificação completa](https://docs.sourcify.dev/docs/full-vs-partial-match/)"** (também "verificação perfeita"). Se os hashes de metadados não corresponderem ou não forem considerados na verificação, seria uma "correspondência parcial", que atualmente é a maneira mais comum de verificar contratos. É possível [inserir código malicioso](https://samczsun.com/hiding-in-plain-sight/) que não seria refletido no código-fonte verificado sem a verificação completa. A maioria dos desenvolvedores não está ciente da verificação completa e não mantém o arquivo de metadados de sua compilação, portanto, a verificação parcial tem sido o método padrão para verificar contratos até agora.

## Por que a verificação de código-fonte é importante? {#importance-of-source-code-verification}

### Desnecessidade de confiança {#trustlessness}

A desnecessidade de confiança é indiscutivelmente a maior premissa para contratos inteligentes e [aplicativos descentralizados (dapps)](/developers/docs/dapps/). Os contratos inteligentes são "imutáveis" e não podem ser alterados; um contrato executará apenas a lógica de negócios definida no código no momento da implantação. Isso significa que desenvolvedores e empresas não podem adulterar o código de um contrato após a implantação no Ethereum.

Para que um contrato inteligente seja sem necessidade de confiança, o código do contrato deve estar disponível para verificação independente. Embora o bytecode compilado para cada contrato inteligente esteja publicamente disponível na blockchain, a linguagem de baixo nível é difícil de entender — tanto para desenvolvedores quanto para usuários.

Os projetos reduzem as premissas de confiança publicando o código-fonte de seus contratos. Mas isso leva a outro problema: é difícil verificar se o código-fonte publicado corresponde ao bytecode do contrato. Nesse cenário, o valor da desnecessidade de confiança é perdido porque os usuários precisam confiar que os desenvolvedores não alterarão a lógica de negócios de um contrato (ou seja, alterando o bytecode) antes de implantá-lo na blockchain.

As ferramentas de verificação de código-fonte fornecem garantias de que os arquivos de código-fonte de um contrato inteligente correspondem ao código assembly. O resultado é um ecossistema sem necessidade de confiança, onde os usuários não confiam cegamente em terceiros e, em vez disso, verificam o código antes de depositar fundos em um contrato.

### Segurança do usuário {#user-safety}

Com contratos inteligentes, geralmente há muito dinheiro em jogo. Isso exige maiores garantias de segurança e verificação da lógica de um contrato inteligente antes de usá-lo. O problema é que desenvolvedores inescrupulosos podem enganar os usuários inserindo código malicioso em um contrato inteligente. Sem verificação, contratos inteligentes maliciosos podem ter [backdoors](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts), mecanismos de controle de acesso controversos, vulnerabilidades exploráveis e outras coisas que prejudicam a segurança do usuário e que passariam despercebidas.

A publicação dos arquivos de código-fonte de um contrato inteligente torna mais fácil para os interessados, como auditores, avaliar o contrato em busca de possíveis vetores de ataque. Com várias partes verificando independentemente um contrato inteligente, os usuários têm garantias mais fortes de sua segurança.

## Como verificar o código-fonte de contratos inteligentes do Ethereum {#source-code-verification-for-ethereum-smart-contracts}

[A implantação de um contrato inteligente no Ethereum](/developers/docs/smart-contracts/deploying/) requer o envio de uma transação com uma carga de dados (bytecode compilado) para um endereço especial. A carga de dados é gerada pela compilação do código-fonte, mais os [argumentos do construtor](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor) da instância do contrato anexados à carga de dados na transação. A compilação é determinística, o que significa que sempre produz a mesma saída (ou seja, bytecode do contrato) se os mesmos arquivos de origem e configurações de compilação (por exemplo, versão do compilador, otimizador) forem usados.

![A diagram showing showing smart contract source code verification](./source-code-verification.png)

A verificação de um contrato inteligente envolve basicamente as seguintes etapas:

1. Inserir os arquivos de origem e as configurações de compilação em um compilador.

2. O compilador gera o bytecode do contrato

3. Obter o bytecode do contrato implantado em um determinado endereço

4. Comparar o bytecode implantado com o bytecode recompilado. Se os códigos corresponderem, o contrato é verificado com o código-fonte e as configurações de compilação fornecidos.

5. Além disso, se os hashes de metadados no final do bytecode corresponderem, será uma correspondência completa.

Observe que esta é uma descrição simplista da verificação e há muitas exceções que não funcionariam com isso, como ter [variáveis imutáveis](https://docs.sourcify.dev/docs/immutables/).

## Ferramentas de verificação de código-fonte {#source-code-verification-tools}

O processo tradicional de verificação de contratos pode ser complexo. É por isso que temos ferramentas para verificar o código-fonte de contratos inteligentes implantados no Ethereum. Essas ferramentas automatizam grandes partes da verificação de código-fonte e também fazem a curadoria de contratos verificados para o benefício dos usuários.

### Etherscan {#etherscan}

Embora seja mais conhecido como um [explorador de blocos do Ethereum](/developers/docs/data-and-analytics/block-explorers/), o Etherscan também oferece um [serviço de verificação de código-fonte](https://etherscan.io/verifyContract) para desenvolvedores e usuários de contratos inteligentes.

O Etherscan permite que você recompile o bytecode do contrato a partir da carga de dados original (código-fonte, endereço da biblioteca, configurações do compilador, endereço do contrato, etc.) Se o bytecode recompilado estiver associado ao bytecode (e aos parâmetros do construtor) do contrato onchain, então [o contrato é verificado](https://info.etherscan.com/types-of-contract-verification/).

Uma vez verificado, o código-fonte do seu contrato recebe um rótulo "Verified" (Verificado) e é publicado no Etherscan para que outros possam auditar. Ele também é adicionado à seção [Verified Contracts](https://etherscan.io/contractsVerified/) (Contratos Verificados) — um repositório de contratos inteligentes com códigos-fonte verificados.

O Etherscan é a ferramenta mais usada para verificar contratos. No entanto, a verificação de contrato do Etherscan tem uma desvantagem: ela falha em comparar o **hash de metadados** do bytecode onchain e do bytecode recompilado. Portanto, as correspondências no Etherscan são correspondências parciais.

[Mais sobre a verificação de contratos no Etherscan](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327).

### Blockscout {#blockscout}

O [Blockscout](https://blockscout.com/) é um explorador de blocos de código aberto que também fornece um [serviço de verificação de contrato](https://eth.blockscout.com/contract-verification) para desenvolvedores e usuários de contratos inteligentes. Como uma alternativa de código aberto, o Blockscout oferece transparência em como a verificação é realizada e permite contribuições da comunidade para melhorar o processo de verificação.

Semelhante a outros serviços de verificação, o Blockscout permite que você verifique o código-fonte do seu contrato recompilando o bytecode e comparando-o com o contrato implantado. Uma vez verificado, seu contrato recebe o status de verificação e o código-fonte se torna publicamente disponível para auditoria e interação. Os contratos verificados também são listados no [repositório de contratos verificados](https://eth.blockscout.com/verified-contracts) do Blockscout para facilitar a navegação e a descoberta.

### Sourcify {#sourcify}

O [Sourcify](https://sourcify.dev/#/verifier) é outra ferramenta para verificar contratos que é de código aberto e descentralizada. Ele não é um explorador de blocos e apenas verifica contratos em [diferentes redes baseadas na EVM](https://docs.sourcify.dev/docs/chains). Ele atua como uma infraestrutura pública para que outras ferramentas sejam construídas sobre ele e visa permitir interações de contrato mais amigáveis usando a [ABI](/developers/docs/smart-contracts/compiling/#web-applications) e os comentários [NatSpec](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html) encontrados no arquivo de metadados.

Ao contrário do Etherscan, o Sourcify suporta correspondências completas com o hash de metadados. Os contratos verificados são servidos em seu [repositório público](https://docs.sourcify.dev/docs/repository/) em HTTP e [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/#what-is-ipfs), que é um armazenamento descentralizado e [endereçado por conteúdo](https://docs.storacha.network/concepts/content-addressing/). Isso permite buscar o arquivo de metadados de um contrato via IPFS, já que o hash de metadados anexado é um hash do IPFS.

Além disso, também é possível recuperar os arquivos de código-fonte via IPFS, pois os hashes do IPFS desses arquivos também são encontrados nos metadados. Um contrato pode ser verificado fornecendo o arquivo de metadados e os arquivos de origem por meio de sua API ou da [interface de usuário (UI)](https://sourcify.dev/#/verifier), ou usando os plugins. A ferramenta de monitoramento do Sourcify também escuta as criações de contratos em novos blocos e tenta verificar os contratos se seus metadados e arquivos de origem forem publicados no IPFS.

[Mais sobre a verificação de contratos no Sourcify](https://soliditylang.org/blog/2020/06/25/sourcify-faq/).

### Tenderly {#tenderly}

A [plataforma Tenderly](https://tenderly.co/) permite que os desenvolvedores da Web3 construam, testem, monitorem e operem contratos inteligentes. Combinando ferramentas de depuração com observabilidade e blocos de construção de infraestrutura, o Tenderly ajuda os desenvolvedores a acelerar o desenvolvimento de contratos inteligentes. Para habilitar totalmente os recursos do Tenderly, os desenvolvedores precisam [realizar a verificação de código-fonte](https://docs.tenderly.co/monitoring/contract-verification) usando vários métodos.

É possível verificar um contrato de forma privada ou pública. Se verificado de forma privada, o contrato inteligente fica visível apenas para você (e outros membros do seu projeto). A verificação pública de um contrato o torna visível para todos que usam a plataforma Tenderly.

Você pode verificar seus contratos usando o [Painel](https://docs.tenderly.co/contract-verification), o [plugin Tenderly Hardhat](https://docs.tenderly.co/contract-verification/hardhat) ou a [CLI](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-cli).

Ao verificar contratos por meio do Painel, você precisa importar o arquivo de origem ou o arquivo de metadados gerado pelo compilador Solidity, o endereço/rede e as configurações do compilador.

O uso do plugin Tenderly Hardhat permite mais controle sobre o processo de verificação com menos esforço, permitindo que você escolha entre a verificação automática (sem código) e manual (baseada em código).

## Leitura adicional {#further-reading}

- [Verificando o código-fonte do contrato](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)