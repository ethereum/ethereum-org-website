---
title: Diretrizes de segurança para contratos inteligentes
description: Uma lista de verificação de diretrizes de segurança a considerar ao construir seu aplicativo descentralizado (dapp)
author: "Trailofbits"
tags: ["solidity", "contratos inteligentes", "segurança"]
skill: intermediate
breadcrumb: Diretrizes de segurança
lang: pt-br
published: 2020-09-06
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

Siga estas recomendações de alto nível para construir contratos inteligentes mais seguros.

## Diretrizes de design {#design-guidelines}

O design do contrato deve ser discutido com antecedência, antes de escrever qualquer linha de código.

### Documentação e especificações {#documentation-and-specifications}

A documentação pode ser escrita em diferentes níveis e deve ser atualizada durante a implementação dos contratos:

- **Uma descrição do sistema em linguagem simples**, descrevendo o que os contratos fazem e quaisquer suposições sobre a base de código.
- **Esquemas e diagramas de arquitetura**, incluindo as interações do contrato e a máquina de estado do sistema. Os [printers do Slither](https://github.com/crytic/slither/wiki/Printer-documentation) podem ajudar a gerar esses esquemas.
- **Documentação minuciosa do código**, o [formato NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html) pode ser usado para a Solidity.

### Computação onchain vs offchain {#onchain-vs-offchain-computation}

- **Mantenha o máximo de código que puder offchain.** Mantenha a camada onchain pequena. Faça o pré-processamento de dados com código offchain de tal forma que a verificação onchain seja simples. Você precisa de uma lista ordenada? Ordene a lista offchain e, em seguida, verifique apenas a sua ordem onchain.

### Capacidade de atualização {#upgradeability}

Discutimos as diferentes soluções de capacidade de atualização em [nossa postagem no blog](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Faça uma escolha deliberada de suportar ou não a capacidade de atualização antes de escrever qualquer código. A decisão influenciará como você estrutura seu código. Em geral, recomendamos:

- **Favorecer a [migração de contrato](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) em vez da capacidade de atualização.** Os sistemas de migração têm muitas das mesmas vantagens que os atualizáveis, sem as suas desvantagens.
- **Usar o padrão de separação de dados em vez do delegatecallproxy.** Se o seu projeto tiver uma separação clara de abstração, a capacidade de atualização usando a separação de dados exigirá apenas alguns ajustes. O delegatecallproxy requer experiência na EVM e é altamente propenso a erros.
- **Documente o procedimento de migração/atualização antes da implantação.** Se você tiver que reagir sob estresse sem nenhuma diretriz, cometerá erros. Escreva o procedimento a seguir com antecedência. Ele deve incluir:
  - As chamadas que iniciam os novos contratos
  - Onde as chaves estão armazenadas e como acessá-las
  - Como verificar a implantação! Desenvolva e teste um script pós-implantação.

## Diretrizes de implementação {#implementation-guidelines}

**Busque a simplicidade.** Use sempre a solução mais simples que atenda ao seu propósito. Qualquer membro da sua equipe deve ser capaz de entender a sua solução.

### Composição de funções {#function-composition}

A arquitetura da sua base de código deve tornar o seu código fácil de revisar. Evite escolhas arquitetônicas que diminuam a capacidade de raciocinar sobre a sua exatidão.

- **Divida a lógica do seu sistema**, seja por meio de vários contratos ou agrupando funções semelhantes (por exemplo, autenticação, aritmética, ...).
- **Escreva funções pequenas, com um propósito claro.** Isso facilitará a revisão e permitirá o teste de componentes individuais.

### Herança {#inheritance}

- **Mantenha a herança gerenciável.** A herança deve ser usada para dividir a lógica, no entanto, seu projeto deve ter como objetivo minimizar a profundidade e a largura da árvore de herança.
- **Use o [printer de herança](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) do Slither para verificar a hierarquia dos contratos.** O printer de herança ajudará você a revisar o tamanho da hierarquia.

### Eventos {#events}

- **Faça o log de todas as operações cruciais.** Os eventos ajudarão a depurar o contrato durante o desenvolvimento e a monitorá-lo após a implantação.

### Evite armadilhas conhecidas {#avoid-known-pitfalls}

- **Esteja ciente dos problemas de segurança mais comuns.** Existem muitos recursos online para aprender sobre problemas comuns, como [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Capture the Ether](https://capturetheether.com/) ou [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/).
- **Esteja ciente das seções de avisos na [documentação da Solidity](https://docs.soliditylang.org/en/latest/).** As seções de avisos informarão você sobre comportamentos não óbvios da linguagem.

### Dependências {#dependencies}

- **Use bibliotecas bem testadas.** Importar código de bibliotecas bem testadas reduzirá a probabilidade de você escrever código com bugs. Se você quiser escrever um contrato ERC-20, use a [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
- **Use um gerenciador de dependências; evite copiar e colar código.** Se você depende de uma fonte externa, deve mantê-la atualizada com a fonte original.

### Teste e verificação {#testing-and-verification}

- **Escreva testes de unidade minuciosos.** Um conjunto de testes abrangente é crucial para construir software de alta qualidade.
- **Escreva verificações e propriedades personalizadas para o [Slither](https://github.com/crytic/slither), o [Echidna](https://github.com/crytic/echidna) e o [Manticore](https://github.com/trailofbits/manticore).** Ferramentas automatizadas ajudarão a garantir que seu contrato seja seguro. Revise o restante deste guia para aprender como escrever verificações e propriedades eficientes.
- **Use o [crytic.io](https://crytic.io/).** O Crytic se integra ao GitHub, fornece acesso a detectores privados do Slither e executa verificações de propriedades personalizadas do Echidna.

### Solidity {#solidity}

- **Favoreça a Solidity 0.5 em vez da 0.4 e 0.6.** Em nossa opinião, a Solidity 0.5 é mais segura e tem melhores práticas integradas do que a 0.4. A Solidity 0.6 provou ser muito instável para produção e precisa de tempo para amadurecer.
- **Use uma versão estável para compilar; use a versão mais recente para verificar se há avisos.** Verifique se o seu código não tem problemas relatados com a versão mais recente do compilador. No entanto, a Solidity tem um ciclo de lançamento rápido e um histórico de bugs no compilador, portanto, não recomendamos a versão mais recente para implantação (veja a [recomendação de versão do solc](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33) do Slither).
- **Não use assembly inline.** O assembly requer experiência na EVM. Não escreva código EVM se você não tiver _dominado_ o yellow paper.

## Diretrizes de implantação {#deployment-guidelines}

Uma vez que o contrato tenha sido desenvolvido e implantado:

- **Monitore seus contratos.** Observe os logs e esteja pronto para reagir em caso de comprometimento do contrato ou da carteira.
- **Adicione suas informações de contato ao [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).** Esta lista ajuda terceiros a entrarem em contato com você caso uma falha de segurança seja descoberta.
- **Proteja as carteiras de usuários privilegiados.** Siga nossas [melhores práticas](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/) se você armazenar chaves em carteiras de hardware.
- **Tenha um plano de resposta a incidentes.** Considere que seus contratos inteligentes podem ser comprometidos. Mesmo que seus contratos estejam livres de bugs, um invasor pode assumir o controle das chaves do proprietário do contrato.