---
title: Verificando contratos inteligentes
description: "Uma visão geral da verificação do código-fonte de contratos inteligentes no Ethereum"
lang: pt-br
---

[Contratos inteligentes](/developers/docs/smart-contracts/) são projetados para serem “sem confiança”, o que significa que os usuários não precisam confiar em terceiros (por exemplo, desenvolvedores e empresas) antes de interagir com um contrato. Como um requisito para a não necessidade de confiança, usuários e outros desenvolvedores precisam ser capazes de verificar o código-fonte de um contrato inteligente. A verificação do código-fonte assegura aos usuários e desenvolvedores que o código do contrato publicado é o mesmo código em execução no endereço do contrato na blockchain Ethereum.

É importante fazer a distinção entre "verificação de código-fonte" e "[verificação formal](/developers/docs/smart-contracts/formal-verification/)". A verificação do código-fonte, que será explicada em detalhes abaixo, refere-se à verificação de que um determinado código-fonte de um contrato inteligente em uma linguagem de alto nível (por exemplo, Solidity) compila para o mesmo bytecode a ser executado no endereço do contrato. Por outro lado, verificação formal descreve a verificação da corretude de um contrato inteligente, assegurando que o contrato se comporta como o esperado. Embora dependa do contexto, a verificação do contrato geralmente se refere à verificação do código-fonte.

## O que é verificação do código-fonte? {#what-is-source-code-verification}

Antes de implantar um contrato inteligente na [Máquina Virtual do Ethereum (EVM)](/developers/docs/evm/), os desenvolvedores [compilam](/developers/docs/smart-contracts/compiling/) o código-fonte do contrato — instruções [escritas em Solidity](/developers/docs/smart-contracts/languages/) ou outra linguagem de programação de alto nível — para bytecode. Como a EVM não pode interpretar instruções de alto nível, compilar o código-fonte para bytecode (ou seja, de baixo nível, instruções de máquina) é necessário para executar a lógica do contrato na EVM.

A verificação do código-fonte é a comparação entre o código-fonte do contrato inteligente e o bytecode compilado usado durante a criação do contrato para detectar quaisquer diferenças. A verificação de contratos inteligentes é importante visto que o código do contrato anunciado pode diferir do que é executado na blockchain.

A verificação do contrato inteligente permite investigar o que um contrato faz através da linguagem de alto nível em que é escrito, sem ter que ler código de máquina. Funções, valores, e geralmente os nomes de variáveis e comentários permanecem os mesmos do código-fonte original em que é compilado e feito o deploy. Isso torna a leitura do código muito mais fácil. A verificação da origem também incentiva a documentação do código, para que os usuários finais saibam o que um contrato inteligente é projetado para fazer.

### O que é a verificação total? {#full-verification}

Há algumas partes do código-fonte que não afetam o bytecode compilado, como comentários ou nomes de variáveis. Isso significa que dois códigos-fonte com diferentes nomes de variáveis e comentários conseguiriam verificar o mesmo contrato. Com isso, um ator malicioso consegue adicionar comentários enganosos ou dar nomes de variáveis enganosas dentro do código-fonte e obter o contrato verificado com um código-fonte diferente do código-fonte original.

É possível evitar isso anexando dados extras ao bytecode para servir como uma _garantia criptográfica_ para a exatidão do código-fonte, e como uma _impressão digital_ das informações de compilação. As informações necessárias são encontradas nos [metadados do contrato do Solidity](https://docs.soliditylang.org/en/v0.8.15/metadata.html), e o hash desse arquivo é anexado ao bytecode de um contrato. Você pode ver isso em ação no [playground de metadados](https://playground.sourcify.dev)

O arquivo de metadados contém informações sobre a compilação do contrato incluindo o código-fonte e seus hashes. Significa que, se alguma das configurações de compilação ou até mesmo um byte em um dos arquivos de origem mudar, o arquivo de metadados muda. Consequentemente, o hash do arquivo de metadados, o qual é anexado ao bytecode, também muda. Isso significa que se o bytecode de um contrato + seu hash de metadados correspondem ao determinado código-fonte e as configurações de compilação, nós podemos ter certeza de que é o mesmo código-fonte usando na compilação original, nem mesmo um único byte de diferença.

Este tipo de verificação que utiliza o hash de metadados é referido como **"[verificação completa](https://docs.sourcify.dev/docs/full-vs-partial-match/)"** (também "verificação perfeita"). Se os hashes de metadados não coincidirem ou não forem considerados na verificação, essa seria uma "correspondência parcial", que atualmente é a maneira mais comum de se verificar contratos. É possível [inserir código malicioso](https://samczsun.com/hiding-in-plain-sight/) que não seria refletido no código-fonte verificado sem a verificação completa. A maioria dos desenvolvedores não está ciente da verificação completa e não mantém o arquivo de metadados de sua compilação, portanto, a verificação parcial tem sido o método de fato para verificar os contratos até agora.

## Por que a verificação do código-fonte é importante? {#importance-of-source-code-verification}

### Ausência de confiança {#trustlessness}

A ausência de confiança é, sem dúvida, a maior premissa para contratos inteligentes e [aplicativos descentralizados (dapps)](/developers/docs/dapps/). Os contratos inteligentes são "imutáveis" e não podem ser alterados; um contrato executará apenas a lógica de negócio definida no código no momento do deploy. Isto significa que os desenvolvedores e empresas não podem manipular o código de um contrato após o deploy no Ethereum.

Para que um contrato inteligente seja ausente de confiança, o código do contrato deve estar disponível para verificação independente. Embora o bytecode compilado de cada contrato inteligente esteja disponível publicamente na blockchain, uma linguagem de baixo nível é difícil de entender — tanto para desenvolvedores quanto para usuários.

Projetos reduzem as suposições de confiança publicando o código-fonte de seus contratos. Mas isso leva a outro problema: é difícil verificar se o código-fonte publicado corresponde ao bytecode do contrato. Nesse cenário, o valor da ausência de confiança é perdido porque os usuários precisam confiar nos desenvolvedores para não mudar a lógica de negócios de um contrato (ex. alterando o bytecode) antes do deploy na blockchain.

As ferramentas de verificação do código-fonte fornecem garantias de que os arquivos do código-fonte do contrato inteligente correspondem ao código de montagem. O resultado é um ecossistema sem necessidade de confiança, no qual os usuários não dependem de confiar em terceiros uma vez que podem verificar o código antes de depositar fundos em um contrato.

### Segurança do usuário {#user-safety}

Em contratos inteligentes, geralmente há muito dinheiro envolvido. Isso pede por altas garantias de segurança e verificação da lógica de um contrato inteligente antes de usá-lo. O problema é que desenvolvedores inescrupulosos podem enganar usuários inserindo código malicioso em um contrato inteligente. Sem verificação, contratos inteligentes maliciosos podem ter [backdoors](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts), mecanismos de controle de acesso controversos, vulnerabilidades exploráveis e outras coisas que comprometem a segurança do usuário e que passariam despercebidas.

Publicar os arquivos de código-fonte de um contrato inteligente torna mais fácil para interessados, como auditores, avaliar o contrato quanto a possíveis vetores de ataque. Com várias partes verificando independentemente o contrato inteligente, os usuários têm maiores garantias quanto à sua segurança.

## Como verificar o código-fonte de contratos inteligentes da Ethereum {#source-code-verification-for-ethereum-smart-contracts}

[Implantar um contrato inteligente na Ethereum](/developers/docs/smart-contracts/deploying/) exige o envio de uma transação com um payload de dados (bytecode compilado) para um endereço especial. O payload de dados é gerado pela compilação do código-fonte, mais os [argumentos do construtor](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor) da instância do contrato anexados ao payload de dados na transação. A compilação é determinística, o que significa que sempre produz a mesma saída (isto é, o bytecode do contrato) se os mesmos arquivos de origem e configurações de compilação (por exemplo, versão do compilador, otimizador) forem usados.

![Um diagrama mostrando a verificação do código-fonte do contrato inteligente](./source-code-verification.png)

A verificação de um contrato inteligente basicamente envolve os seguintes passos:

1. Insira os arquivos de origem e as configurações de compilação em um compilador.

2. O compilador gera o bytecode do contrato

3. Obtenha o bytecode do contrato implantado em um dado endereço

4. Compare o bytecode implantado com o bytecode recompilado. Se os códigos corresponderem, o contrato é verificado com o código-fonte fornecido e as configurações de compilação.

5. Além disso, se os hashes de metadados no final do bytecode corresponderem, será uma correspondência completa.

Observe que esta é uma descrição simplista de verificação e há muitas exceções que não funcionariam com isso, como ter [variáveis imutáveis](https://docs.sourcify.dev/docs/immutables/).

## Ferramentas de verificação do código-fonte {#source-code-verification-tools}

O processo tradicional de verificação de contratos pode ser complexo. Isto é porque nós temos ferramentas para verificar o código-fonte para contratos inteligentes implantados no Ethereum. Estas ferramentas automatizam grandes partes da verificação de código-fonte e também selecionam contratos verificados para os benefícios dos usuários.

### Etherscan {#etherscan}

Embora seja mais conhecido como um [explorador de blockchain da Ethereum](/developers/docs/data-and-analytics/block-explorers/), o Etherscan também oferece um [serviço de verificação de código-fonte](https://etherscan.io/verifyContract) para desenvolvedores e usuários de contratos inteligentes.

O Etherscan permite que você recompile o bytecode do contrato a partir do payload de dados original (código-fonte, endereço da biblioteca, configurações do compilador, endereço do contrato, etc.) Se o bytecode recompilado está associado ao bytecode (e aos parâmetros do construtor) do contrato em cadeia, então [o contrato é verificado](https://info.etherscan.com/types-of-contract-verification/).

Uma vez verificado, o código-fonte do seu contrato recebe um rótulo "Verificado" e é publicado no Etherscan, para que outros auditem. Ele também é adicionado à seção [Contratos Verificados](https://etherscan.io/contractsVerified/) — um repositório de contratos inteligentes com códigos-fonte verificados.

Etherscan é a ferramenta mais usada para verificação de contratos. No entanto, a verificação de contrato do Etherscan tem uma desvantagem: ela falha ao comparar o **hash de metadados** do bytecode em cadeia e do bytecode recompilado. Portanto, as correspondências no Etherscan são correspondências parciais.

[Saiba mais sobre como verificar contratos no Etherscan](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327).

### Blockscout {#blockscout}

O [Blockscout](https://blockscout.com/) é um explorador de blockchain de código aberto que também fornece um [serviço de verificação de contratos](https://eth.blockscout.com/contract-verification) para desenvolvedores e usuários de contratos inteligentes. Como uma alternativa de código aberto, o Blockscout oferece transparência sobre como a verificação é realizada e permite contribuições da comunidade para melhorar o processo de verificação.

Como outros serviços de verificação, o Blockscout permite que você verifique o código-fonte do seu contrato recompilando o bytecode e comparando-o com o contrato implantado. Após a verificação, seu contrato recebe o status de verificação e o código-fonte fica disponível publicamente para auditoria e interação. Os contratos verificados também são listados no [repositório de contratos verificados](https://eth.blockscout.com/verified-contracts) do Blockscout para facilitar a navegação e a descoberta.

### Sourcify {#sourcify}

O [Sourcify](https://sourcify.dev/#/verifier) é outra ferramenta de verificação de contratos que é de código aberto e descentralizada. Não é um explorador de blockchain e apenas verifica contratos em [diferentes redes baseadas na EVM](https://docs.sourcify.dev/docs/chains). Ele atua como uma infraestrutura pública para que outras ferramentas possam ser desenvolvidas sobre ele, e visa permitir interações de contrato mais amigáveis ao ser humano usando os comentários do [ABI](/developers/docs/smart-contracts/compiling/#web-applications) e do [NatSpec](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html) encontrados no arquivo de metadados.

Ao contrário do Etherscan, o Sourcify suporta correspondências completas com o hash de metadados. Os contratos verificados são servidos em seu [repositório público](https://docs.sourcify.dev/docs/repository/) em HTTP e [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/#what-is-ipfs), que é um armazenamento descentralizado e [endereçado por conteúdo](https://docs.storacha.network/concepts/content-addressing/). Isso permite buscar o arquivo de metadados de um contrato sobre IPFS, pois o hash de metadados incluído é um hash IPFS.

Adicionalmente, também é possível recuperar os arquivos de código-fonte por IPFS, pois os hashes IPFS desses arquivos também são encontrados nos metadados. Um contrato pode ser verificado fornecendo o arquivo de metadados e os arquivos-fonte através da sua API ou da [IU](https://sourcify.dev/#/verifier), ou usando os plugins. A ferramenta de monitoramento Sourcify também escuta as criações de contratos em novos blocos e tenta verificar os contratos se os seus metadados e arquivos de origem são publicados no IPFS.

[Saiba mais sobre a verificação de contratos no Sourcify](https://soliditylang.org/blog/2020/06/25/sourcify-faq/).

### Tenderly {#tenderly}

A [plataforma Tenderly](https://tenderly.co/) permite que os desenvolvedores da Web3 construam, testem, monitorem e operem contratos inteligentes. Ao combinar ferramentas de depuração com observabilidade e blocos de construção de infraestrutura, o Tenderly ajuda os desenvolvedores a acelerar o desenvolvimento de contratos inteligentes. Para habilitar totalmente os recursos do Tenderly, os desenvolvedores precisam [realizar a verificação do código-fonte](https://docs.tenderly.co/monitoring/contract-verification) usando vários métodos.

É possível verificar um contrato de forma privada ou pública. Se verificado privadamente, o contrato inteligente ficará visível apenas para você (e outros membros do seu projeto). A verificação de um contrato publicamente o torna visível para todos que usam a plataforma Tenderly.

Você pode verificar seus contratos usando o [Painel](https://docs.tenderly.co/contract-verification), o [plugin Hardhat da Tenderly](https://docs.tenderly.co/contract-verification/hardhat), ou a [CLI (interface de linha de comando)](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-cli).

Ao verificar contratos através do Painel, você precisa importar o arquivo de origem ou o arquivo de metadados gerado pelo compilador Solidity, o endereço/rede e as configurações do compilador.

O uso do plugin Tenderly da Hardhat permite mais controle sobre o processo de verificação com menos esforço, permitindo escolher entre verificação automática (sem código) e manual (baseado no código).

## Leitura adicional {#further-reading}

- [Verificando o código-fonte do contrato](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)
