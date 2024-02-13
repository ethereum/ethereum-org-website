---
title: Diretrizes de segurança do contrato inteligente
description: Uma lista de verificações de diretrizes de segurança a considerar ao construir seu dapp
author: "Trailofbits"
tags:
  - "solidity"
  - "contratos inteligentes"
  - "segurança"
skill: intermediate
lang: pt-br
published: 2020-09-06
source: Construindo contratos seguros
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

Siga estas recomendações de alto nível para construir contratos inteligentes mais seguros.

## Padrões de design {#design-guidelines}

O design do contrato deve ser discutido antecipadamente, antes de escrever qualquer linha de código.

### Documentação e especificações {#documentation-and-specifications}

A documentação pode ser escrita em diferentes níveis, e deve ser atualizada durante a implementação dos contratos:

- **Uma descrição simples em inglês do sistema**, descrevendo o que os contratos fazem e qualquer suposição no código.
- **Esquemas e diagramas arquitetônicos**, incluindo as interações de contratos e a máquina de estado do sistema. [Impressoras do Slither](https://github.com/crytic/slither/wiki/Printer-documentation) podem ajudar a gerar esses esquemas.
- **Documentação de código Thorough**, o [formato Natspec](https://solidity.readthedocs.io/en/develop/natspec-format.html) pode ser usado para Solidity.

### Computação on-chain vs off-chain {#on-chain-vs-off-chain-computation}

- **Mantenha o máximo de código que puder off-chain (fora da cadeia).** Mantenha a menor camada on-chain (dentro da cadeia). Pré-processe dados com código off-chain de tal forma que a verificação on-chain torne-se simples. Você precisa de uma lista ordenada? Ordene a lista off-chain, então apenas verifique a ordem on-chain.

### Capacidade de Atualização {#upgradeability}

Nós discutimos as diferentes soluções de atualização em [nosso blog](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Faça ou não uma escolha deliberada para apoiar a capacidade de atualização antes de escrever qualquer código. A decisão irá influenciar como você estrutura nosso código. Em geral, recomendamos:

- **Favorecer a [migração do contrato](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) sobre a atualização.** O sistema de migração tem muitas das mesmas vantagens do que ser atualizável, sem suas desvantagens.
- **Usando o padrão de separação de dados sobre o proxy delegatecallproxy.** Se o seu projeto tem uma separação de abstração clara, a atualizabilidade usando a separação de dados exigirá apenas alguns ajustes. O delegatecallproxy exige conhecimento de EVM e é altamente susceptível de erros.
- **Documentar o procedimento de migração/atualização antes da implantação.** Se você tiver que reagir sob o estresse sem quaisquer diretrizes, você cometerá erros. Escreva o procedimento a seguir com antecedência. Ele deve incluir:
  - As exigências que iniciam os novos contratos
  - Onde são armazenadas as chaves e como acessá-las
  - Como verificar a implantação de arquivos! Desenvolva e teste um script de pós-implantação.

## Orientações de implementação {#implementation-guidelines}

**Esforço pela simplicidade.** Sempre use a solução mais simples que se encaixa em seu propósito. Qualquer membro da sua equipe deve ser capaz de entender a sua solução.

### Composição de funções {#function-composition}

A arquitetura da sua base de código deve facilitar a revisão do seu código. Evite escolhas arquitetônicas que diminuam a capacidade de raciocínio sobre sua exatidão.

- **Divida a lógica do seu sistema**, seja por meio de vários contratos ou agrupando funções semelhantes juntas (por exemplo, autenticação, aritmética, ...).
- **Escreva funções pequenas, com um propósito claro.** Isso facilitará uma revisão mais tranquila e permitirá o teste de componentes individuais.

### Herança {#inheritance}

- **Mantenha a herança gerenciável.** A herança deve ser usada para dividir a lógica, no entanto, seu projeto deve visar minimizar a profundidade e a largura da árvore de herança.
- **Use a [impressora de herança de Slither](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) para verificar a hierarquia dos contratos.** A impressora de herança irá ajudá-lo a rever o tamanho da hierarquia.

### Eventos {#events}

- **Registre todas as operações cruciais.** Os eventos ajudarão a depurar o contrato durante o desenvolvimento e a monitorá-lo após a implantação.

### Evite armadilhas conhecidas {#avoid-known-pitfalls}

- **Esteja ciente dos problemas de segurança mais comuns.** Há muitos recursos on-line para aprender sobre problemas comuns, como [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Capture o Ether](https://capturetheether.com/), ou [ contratos não tão inteligentes](https://github.com/crytic/not-so-smart-contracts/).
- **Esteja ciente das seções de avisos na [documentação Solidity](https://solidity.readthedocs.io/en/latest/)** As seções de avisos irão informá-lo sobre comportamentos não óbvios da linguagem.

### Dependências {#dependencies}

- **Use bibliotecas testadas.** A importação de código de bibliotecas testadas reduzirá a probabilidade de você escrever código com erros. Se você deseja escrever um contrato ERC20, use [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
- **Use um gerenciador de dependências; evite "copiar-e-colar" códigos.** Se você estiver contando com uma fonte externa, então você deve mantê-lo atualizado com a fonte original.

### Teste e Validação {#testing-and-verification}

- **Escreva testes unitários completos.** Um conjunto extenso de testes é crucial para construir softwares de alta qualidade.
- **Escreva propriedades e verificações personalizadas com [Slither](https://github.com/crytic/slither), [Echidna](https://github.com/crytic/echidna) e [Manticore](https://github.com/trailofbits/manticore).** Ferramentas automatizadas ajudarão a garantir que o seu contrato é seguro. Revise o resto deste guia para aprender a escrever propriedades e verificações eficientes.
- **Use o [crytic.io](https://crytic.io/).** O Critic integra-se ao Github, fornece acesso a detectores privados do Slither e executa verificações de propriedade personalizadas pelo Echidna.

### Solidity {#solidity}

- **Favoreça a Solidity 0.5 em vez de 0.4 e 0.6.** Em nossa opinião, a Solidity 0.5 é mais seguro e tem melhores práticas incorporadas que a 0.4. A Solidity 0.6 provou ser demasiado instável para produção e precisa de tempo para amadurecer.
- **Use um lançamento estável para compilar; use a versão mais recente para verificar se há avisos.** Verifique se o seu código não relatou problemas com a versão mais recente do compilador. No entanto, a Solidity tem um ciclo de lançamento rápido e tem um histórico de erros do compilador, então não recomendamos a versão mais recente para implantar (veja a [recomendação de versão solc do Slither](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33)).
- **Não use montagem embutida.** A montagem requer experiência em EVM. Não escreva o código EVM se você não tiver _dominado_ o Yellow Paper da Ethereum.

## Orientações de implantação {#deployment-guidelines}

Uma vez que o contrato tenha sido desenvolvido e implantado:

- **Monitore seus contratos.** Observe os acessos e esteja pronto para reagir em caso de comprometimento do contrato ou da carteira.
- **Adicione suas informações de contato em [contatos de segurança da blockchain](https://github.com/crytic/blockchain-security-contacts).** Essa lista ajuda a terceiros a entrar em contato com você caso uma falha de segurança seja descoberta.
- **Proteja as carteiras de usuários privilegiados.** Siga nossas [melhores práticas](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/) se você armazenar chaves em carteiras físicas (hardware).
- **Tenha uma resposta ao plano de incidentes.** Considere que seus contratos inteligentes possam ser comprometidos. Mesmo que seus contratos estejam livres de erros, um invasor pode assumir o controle das chaves do proprietário do contrato.
