---
title: "Diretrizes de segurança do contrato inteligente"
description: "Uma lista de verificações de diretrizes de segurança a considerar ao construir seu dapp"
author: "Trailofbits"
tags: [ "solidez", "smart contracts", "segurança" ]
skill: intermediate
lang: pt-br
published: 2020-09-06
source: Construindo contratos seguros
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

Siga estas recomendações de alto nível para construir contratos inteligentes mais seguros.

## Diretrizes de design {#design-guidelines}

O design do contrato deve ser discutido antecipadamente, antes de escrever qualquer linha de código.

### Documentação e especificações {#documentation-and-specifications}

A documentação pode ser escrita em diferentes níveis, e deve ser atualizada durante a implementação dos contratos:

- **Uma descrição em inglês simples do sistema**, descrevendo o que os contratos fazem e quaisquer suposições sobre a base de código.
- **Esquemas e diagramas de arquitetura**, incluindo as interações de contratos e a máquina de estado do sistema. Os [impressores do Slither](https://github.com/crytic/slither/wiki/Printer-documentation) podem ajudar a gerar esses esquemas.
- **Documentação completa do código**, o [formato Natspec](https://docs.soliditylang.org/en/develop/natspec-format.html) pode ser usado para o Solidity.

### Computação onchain vs. offchain {#onchain-vs-offchain-computation}

- **Mantenha o máximo de código que puder offchain.** Mantenha a camada onchain pequena. Pré-processe dados com código offchain de forma que a verificação onchain seja simples. Você precisa de uma lista ordenada? Ordene a lista off-chain, então apenas verifique a ordem on-chain.

### Atualizabilidade {#upgradeability}

Discutimos as diferentes soluções de atualizabilidade em [nossa postagem no blog](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Faça ou não uma escolha deliberada para apoiar a capacidade de atualização antes de escrever qualquer código. A decisão influenciará como você estrutura seu código. Em geral, recomendamos:

- **Prefira a [migração de contrato](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) em vez da atualizabilidade.** Os sistemas de migração têm muitas das mesmas vantagens que os atualizáveis, sem as suas desvantagens.
- **Usando o padrão de separação de dados em vez do delegatecallproxy.** Se o seu projeto tem uma separação de abstração clara, a atualizabilidade usando a separação de dados necessitará de apenas alguns ajustes. O delegatecallproxy exige conhecimento de EVM e é altamente susceptível de erros.
- **Documente o procedimento de migração/atualização antes da implantação.** Se você tiver que reagir sob estresse sem quaisquer diretrizes, você cometerá erros. Escreva o procedimento a seguir com antecedência. Ele deve incluir:
  - As exigências que iniciam os novos contratos
  - Onde são armazenadas as chaves e como acessá-las
  - Como verificar a implantação de arquivos! Desenvolva e teste um script de pós-implantação.

## Diretrizes de implementação {#implementation-guidelines}

**Busque a simplicidade.** Sempre use a solução mais simples que se adeque ao seu propósito. Qualquer membro da sua equipe deve ser capaz de entender a sua solução.

### Composição de funções {#function-composition}

A arquitetura da sua base de código deve facilitar a revisão do seu código. Evite escolhas arquitetônicas que diminuam a capacidade de raciocínio sobre sua exatidão.

- **Divida a lógica do seu sistema**, seja por meio de vários contratos ou agrupando funções semelhantes (por exemplo, autenticação, aritmética, ...).
- **Escreva funções pequenas, com um propósito claro.** Isso facilitará a revisão e permitirá o teste de componentes individuais.

### Herança {#inheritance}

- **Mantenha a herança gerenciável.** A herança deve ser usada para dividir a lógica, no entanto, seu projeto deve visar minimizar a profundidade e a largura da árvore de herança.
- **Use o [impressor de herança](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) do Slither para verificar a hierarquia dos contratos.** O impressor de herança ajudará você a revisar o tamanho da hierarquia.

### Eventos {#events}

- **Registre todas as operações cruciais.** Os eventos ajudarão a depurar o contrato durante o desenvolvimento e a monitorá-lo após a implantação.

### Evite armadilhas conhecidas {#avoid-known-pitfalls}

- **Esteja ciente dos problemas de segurança mais comuns.** Existem muitos recursos online para aprender sobre problemas comuns, como [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Capture the Ether](https://capturetheether.com/) ou [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/).
- **Esteja ciente das seções de avisos na [documentação do Solidity](https://docs.soliditylang.org/en/latest/).** As seções de avisos informarão sobre comportamentos não óbvios da linguagem.

### Dependências {#dependencies}

- **Use bibliotecas bem testadas.** Importar código de bibliotecas bem testadas reduzirá a probabilidade de você escrever código com bugs. Se você quiser escrever um contrato ERC20, use o [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
- **Use um gerenciador de dependências; evite copiar e colar código.** Se você depende de uma fonte externa, deve mantê-la atualizada com a fonte original.

### Teste e verificação {#testing-and-verification}

- **Escreva testes de unidade completos.** Um conjunto extenso de testes é crucial para construir um software de alta qualidade.
- **Escreva verificações e propriedades personalizadas para [Slither](https://github.com/crytic/slither), [Echidna](https://github.com/crytic/echidna) e [Manticore](https://github.com/trailofbits/manticore).** Ferramentas automatizadas ajudarão a garantir que seu contrato seja seguro. Revise o resto deste guia para aprender a escrever propriedades e verificações eficientes.
- **Use o [crytic.io](https://crytic.io/).** O Crytic se integra ao GitHub, fornece acesso a detectores privados do Slither e executa verificações de propriedade personalizadas do Echidna.

### Solidity {#solidity}

- **Prefira o Solidity 0.5 ao 0.4 e 0.6.** Em nossa opinião, o Solidity 0.5 é mais seguro e tem práticas incorporadas melhores que o 0.4. A Solidity 0.6 provou ser demasiado instável para produção e precisa de tempo para amadurecer.
- **Use uma versão estável para compilar; use a versão mais recente para verificar se há avisos.** Verifique se seu código não tem problemas relatados com a versão mais recente do compilador. No entanto, o Solidity tem um ciclo de lançamento rápido e um histórico de bugs de compilador, portanto, não recomendamos a versão mais recente para implantação (veja a [recomendação de versão do solc do Slither](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33)).
- **Não use assembly em linha.** O assembly requer experiência em EVM. Não escreva código EVM se você não tiver _dominado_ o yellow paper.

## Diretrizes de implantação {#deployment-guidelines}

Uma vez que o contrato tenha sido desenvolvido e implantado:

- **Monitore seus contratos.** Observe os logs e esteja pronto para reagir em caso de comprometimento do contrato ou da carteira.
- **Adicione suas informações de contato em [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).** Esta lista ajuda terceiros a entrarem em contato com você caso uma falha de segurança seja descoberta.
- **Proteja as carteiras de usuários privilegiados.** Siga nossas [melhores práticas](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/) se você armazena chaves em carteiras de hardware.
- **Tenha um plano de resposta a incidentes.** Considere que seus contratos inteligentes podem ser comprometidos. Mesmo que seus contratos estejam livres de erros, um invasor pode assumir o controle das chaves do proprietário do contrato.
