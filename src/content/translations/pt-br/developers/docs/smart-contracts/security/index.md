---
title: Segurança de um Contrato Inteligente
description: Considerações de segurança para desenvolvedores Ethereum
lang: pt-br
---

Os contratos inteligentes da Ethereum são extremamente flexíveis, capaz de armazenar grandes quantidades de tokens (muitas vezes superior a $1B) e executar uma lógica imutável baseada no código do contrato inteligente previamente implantado. Embora isto tenha criado um ecossistema criativo e vibrante de contratos inteligentes confiáveis e interconectados, é também o ecossistema perfeito para atrair atacantes que buscam lucrar, explorando vulnerabilidades em contratos inteligentes e comportamento inesperado na Ethereum. O código do contrato inteligente _geralmente_ não pode ser alterado para correção de falhas de segurança. Os bens que foram roubados a contratos inteligentes são irrecuperáveis e os bens roubados são extremamente difíceis de rastrear. The total of amount of value stolen or lost due to smart contract issues is easily over $1B. Alguns dos maiores devido a erros de código de contrato inteligentes incluem:

- [Problema multi-sig de paridade #1 - $30M perdidos](https://www.coindesk.com/30-million-ether-reported-stolen-parity-wallet-breach)
- [Problema multi-sig de paridade #2 - $300M bloqueados](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether)
- [O hack DAO, 3.6M ETH! Mais de $1B nos preços de hoje do ETH](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/)

## Pré-requisitos {#prerequisites}

Isto abrangerá a segurança de contratos inteligentes, por isso, certifique-se de que você está familiarizado com [contratos inteligentes](/developers/docs/smart-contracts/) antes de resolver a segurança.

## Como escrever um código de Contrato Inteligente mais seguro {#how-to-write-more-secure-smart-contract-code}

Antes de lançar qualquer código no mainnet, é importante tomar precaução suficiente para proteger qualquer coisa de valor que seu contrato inteligente tenha sido confiado. Neste artigo, discutiremos alguns ataques específicos, forneceremos recursos para aprender sobre mais tipos de ataques, e deixá-lo com algumas ferramentas básicas e melhores práticas para garantir que seus contratos funcionem de forma correta e segura.

## Auditorias não são uma arma mágica {#audits-are-not-a-silver-bullet}

Anos antes, as ferramentas para escrita, compilação, testes e implantação de contratos inteligentes eram muito imaturas, levando muitos projetos a escrever código Solidity de maneiras aleatórias, e depois encaminha-los a um auditor que investigaria o código para garantir que ele funcione de forma segura e conforme esperado. Em 2020, os processos de desenvolvimento e ferramentas que apoiam a linguagem Solidity são significativamente melhores; se aproveitar destas melhores práticas não só garante que o seu projeto seja mais fácil de gerenciar, como é uma parte vital da segurança do seu projeto. Uma auditoria no final da escrita do seu contrato inteligente não é mais suficiente como a única consideração de segurança que seu projeto faz. A segurança começa antes de escrever sua primeira linha de código do contrato inteligente, **a segurança começa com um design adequado e processos de desenvolvimento**.

## Processo de desenvolvimento de um Contrato Inteligente {#smart-contract-development-process}

No mínimo:

- Todo o código armazenado em um sistema de controle de versão, como o git
- Todas as modificações de código feitas via Pull Requests
- Todos os Pull Requests têm pelo menos um revisor. _Se você for um projeto individual, considere encontrar outro autor individual e trocar avaliações de código!_
- Um único comando compila, implementa e executa um conjunto de testes contra o seu código usando um ambiente de desenvolvimento de Ethereum (Veja: Truffle)
- Você executou seu código através de ferramentas de análise de código básicas como Mythril e Slither, idealmente antes de cada pull request ser mesclado, comparando diferenças na saída
- Solidity não emite QUALQUER aviso do compilador
- Seu código está bem documentado

Há muito mais a dizer em relação ao processo de desenvolvimento, mas estes itens são um bom ponto de partida. Para mais itens e explicações detalhadas, veja a [lista de verificação de qualidade fornecida pelo DeFiSafety](https://docs.defisafety.com/review-process-documentation/process-quality-audit-process). [DefiSafety](https://defisafety.com/) é um serviço público não oficial de publicação de várias grandes avaliações públicas de Ethereum dApps. Parte do sistema de classificação DeFiSafety inclui quão bem o projeto adere a esta lista de verificação de qualidade do processo. Ao seguir estes processos:

- Você produzirá um código mais seguro, através de testes automáticos reprodutíveis
- Os auditores serão capazes de rever seu projeto com mais eficácia
- Integração mais fácil de novos desenvolvedores
- Permite aos desenvolvedores rapidamente iterar, testar e receber feedback sobre modificações
- Menos provável que seu projeto tenha regressões

## Ataques e vulnerabilidades {#attacks-and-vulnerabilities}

Agora que você está escrevendo código Solidity usando um processo de desenvolvimento eficiente, vamos analisar algumas vulnerabilidades comuns de Solidity para ver o que pode dar errado.

### Reentrada {#re-entrancy}

A Reentrada é uma das maiores e mais significativas questões de segurança a considerar ao desenvolver Contratos Inteligentes. Enquanto o EVM não pode executar múltiplos contratos ao mesmo tempo, um contrato que chame um contrato diferente pausa a execução do contrato e o estado de memória até que a chamada retorne, e neste ponto a execução prossegue normalmente. Esta pausa e reinicialização pode criar uma vulnerabilidade conhecida como "reentrada".

Esta é uma versão simples de um contrato que é vulnerável a reentrada:

```solidity
// ESTE CONTRATO É VULNERÁVEL INTENCIONALMENTE, NÃO COPIAR
contract Victim {
    mapping (address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
        balances[msg.sender] = 0;
    }
}
```

Para permitir que um usuário retire o ETH que tenha armazenado anteriormente no contrato, esta função

1. Lê quanto saldo o usuário tem
2. Envia o valor de saldo em ETH
3. Redefine o seu saldo para 0, então eles não podem sacar do seu saldo novamente.

If called from a regular account (such as your own MetaMask account), this functions as expected: msg.sender.call.value() simply sends your account ETH. Contudo, os contratos inteligentes também podem fazer chamadas. Se um contrato personalizado malicioso é aquele que chama `withdraw()`, msg.sender.call.value() não só enviará o `valor` de ETH, como também chamará implicitamente o contrato para começar a executar o código. Imagine este contrato malicioso:

```solidity
contract Attacker {
    function beginAttack() external payable {
        Victim(VICTIM_ADDRESS).deposit.value(1 ether)();
        Victim(VICTIM_ADDRESS).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(VICTIM_ADDRESS).withdraw();
        }
    }
}
```

Chamando Attacker.beginAttack() começará um ciclo que parece algo como:

```
0.) Ataque EOA chama Attacker.beginAttack() com 1 ETH
0.) Attacker.beginAttack() deposita 1 ETH na vítima

  1.) Atacante -> Victim.withdraw()
  1.) Victim reads balances[msg.sender]
  1.) Vítima envia ETH para o Atacante (que executa a função padrão)
    2.) Atacante -> Victim.withdraw()
    2.) Victim reads balances[msg.sender]
    2.) Vítima envia ETH para o Atacante (que executa a função padrão)
    3.) Atacante -> Victim.withdraw()
    3.) Victim reads balances[msg.sender]
      3.) Vítima envia ETH para o Atacante (que executa a função padrão)
    4.) Atacante não tem mais gás suficiente, retorna sem chamar a função novamente
      3.) balances[msg.sender] = 0;
    2.) balances[msg.sender] = 0; (já era 0)
  1.) balances[msg.sender] = 0; (já era 0)
```

Chamando Attacker.beginAttack com 1 ETH irá atacar a vítima com reentrada, sacando mais ETH do que o que foi provido (retirado dos saldos de outros usuários, fazendo com que o contrato da vítima fique sub-colateralizado)

### Como lidar com a reentrada (da maneira errada) {#how-to-deal-with-re-entrancy-the-wrong-way}

Alguém poderia considerar vencer a reentrada, simplesmente impedindo qualquer contrato inteligente de interagir com o seu código. Você busca no stackoverflow, e encontra esse trecho de código com toneladas de votos:

```solidity
function isContract(address addr) internal returns (bool) {
  uint size;
  assembly { size := extcodesize(addr) }
  return size > 0;
}
```

Parece fazer sentido: os contratos têm código, se o autor da chamada tiver qualquer código, não permita que ele faça um depósito. Vamos adicionar:

```solidity
// ESTE CONTRATO TEM VULNERABILIDADE INTENCIONALMENTE, NÃO COPIE
contract ContractCheckVictim {
    mapping (address => uint256) public balances;

    function isContract(address addr) internal returns (bool) {
        uint size;
        assembly { size := extcodesize(addr) }
        return size > 0;
    }

    function deposit() external payable {
        require(!isContract(msg.sender)); // <- NEW LINE
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
        balances[msg.sender] = 0;
    }
}
```

Agora, para depositar ETH, você não deve ter o código do contrato inteligente no seu endereço. No entanto, isso é facilmente derrotado com o seguinte contrato do Atacante:

```solidity
contract ContractCheckAttacker {
    constructor() public payable {
        ContractCheckVictim(VICTIM_ADDRESS).deposit(1 ether); // <- New line
    }

    function beginAttack() external payable {
        ContractCheckVictim(VICTIM_ADDRESS).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(VICTIM_ADDRESS).withdraw();
        }
   }
}
```

Enquanto o primeiro ataque foi um ataque na lógica do contrato, isso é um ataque ao comportamento de implantação do contrato Ethereum. Durante a construção, um contrato ainda não devolveu seu código para ser implantado em seu endereço, mas mantém o controle total da EVM DURANTE este processo.

É tecnicamente possível prevenir que contratos inteligentes chamem seu código, usando esta linha:

```solidity
require(tx.origin == msg.sender)
```

Contudo, esta ainda não é uma boa solução. Um dos aspectos mais empolgantes do Ethereum é a sua compostabilidade, os contratos inteligentes se integram e constroem entre si. Ao usar a linha acima, você está limitando a utilidade do seu projeto.

### Como lidar com a reentrada (da maneira correta) {#how-to-deal-with-re-entrancy-the-right-way}

Ao simplesmente mudar a ordem da atualização do armazenamento e a chamada externa, evitamos a condição de reentrada, que permitiu o ataque. Chamando de volta a função sacar, quando possível, não vai beneficiar o atacante, já que os `saldos` do armazenamento já estarão definidos para 0.

```solidity
contract NoLongerAVictim {
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
    }
}
```

O código acima segue o padrão de design "Verificações-Efeitos-Interações", que ajuda a se proteger contra reentrada. Você pode [ler mais sobre Verificações-Efeitos-Interações aqui](https://fravoll.github.io/solidity-patterns/checks_effects_interactions.html)

### Como lidar com a reentrada (a opção nuclear) {#how-to-deal-with-re-entrancy-the-nuclear-option}

Sempre que você estiver enviando ETH para um endereço não confiável ou interagindo com um contrato desconhecido (como chamar `transfer()` de um endereço de token fornecido pelo usuário), se abre à possibilidade de reentrada. **Ao projetar contratos que nem enviam ETH nem chamam contratos não confiáveis, você impede a possibilidade de reentrada!**

## Mais tipos de ataque {#more-attack-types}

Os tipos de ataque acima cobrem problemas de codificação de contrato inteligente (reentrada) e peculiaridades do Ethereum (executando código dentro dos construtores de contratos, antes que o código esteja disponível no endereço do contrato). Há muito, muito mais de tipos de ataque para conhecer, tais como:

- Front-running
- Rejeição do envio de ETH
- Integer overflow/underflow

Leitura adicional:

- [Consensys Smart Contract Known Attacks](https://consensys.github.io/smart-contract-best-practices/attacks/) - Uma explicação muito legível das vulnerabilidades mais significativas, com código de amostra para a maioria.
- [Registro SWC](https://swcregistry.io/docs/SWC-128) - Lista dos CWE que se aplicam à Ethereum e a contratos inteligentes

## Ferramentas de Segurança {#security-tools}

Embora não haja um substituto para entender os conceitos básicos de segurança do Ethereum e contatar uma empresa de auditoria profissional para revisar seu código, existem muitas ferramentas disponíveis para ajudar a destacar potenciais problemas em seu código.

### Segurança de um Contrato Inteligente {#smart-contract-security}

**Slither -** **_Estrutura de análise estática Solidity escrita em Python 3._**

- [GitHub](https://github.com/crytic/slither)

**MythX -** **_API de análise de segurança para contratos inteligentes na Ethereum._**

- [mythx.io](https://mythx.io/)
- [Documentação](https://docs.mythx.io/)

**Mythril -** **_Ferramente de análise de segurança para bytecode EVM._**

- [mythril](https://github.com/ConsenSys/mythril)
- [Documentação](https://mythril-classic.readthedocs.io/en/master/about.html)

**Manticore -** **_Uma interface de linha de comando que usa uma ferramenta de execução simbólica em contratos inteligentes e binários._**

- [GitHub](https://github.com/trailofbits/manticore)
- [Documentação](https://github.com/trailofbits/manticore/wiki)

**Securify -** **_Scanner de segurança para contratos inteligentes Ethereum._**

- [securify.chainsecurity.com](https://securify.chainsecurity.com/)
- [Discord](https://discordapp.com/invite/nN77ckb)

**ERC20 Verifier -** **_Uma ferramenta de verificação usada para conferir se um contrato está de acordo com o padrão ERC20._**

- [erc20-verifier.openzeppelin.com](https://erc20-verifier.openzeppelin.com)
- [Fórum](https://forum.openzeppelin.com/t/online-erc20-contract-verifier/1575)

### Verificação formal {#formal-verification}

**Informações sobre verificação formal**

- [Como a verificação formal dos contatos inteligentes funciona](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/) _20 de julho de 2018 - Brian Marick_
- [Como a verificação formal pode garantir contratos inteligentes sem falhas](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1) _29 de janeiro de 2018 - Bernard Mueller_

### Utilizando ferramentas {#using-tools}

Duas das ferramentas mais populares para a análise de segurança de contratos inteligentes são:

- [Slither](https://github.com/crytic/slither) por [Rastro de Bits](https://www.trailofbits.com/) (versão hospedada: [Critica](https://crytic.io/))
- [Mythril](https://github.com/ConsenSys/mythril) por [ConsenSys](https://consensys.net/) (versão hospedada: [MythX](https://mythx.io/))

Ambas são ferramentas úteis que analisam seu código e reportam problemas. Cada uma possui uma versão hospedada [comercial], mas também está disponível para ser executada localmente. O exemplo a seguir é um rápido exemplo de como executar Slither, que é disponibilizado em uma imagem conveniente do Docker `trailofbits/eth-security-toolbox`. Você precisará [instalar o Docker se você ainda não o tiver instalado](https://docs.docker.com/get-docker/).

```bash
$ mkdir test-slither
$ curl https://gist.githubusercontent.com/epheph/460e6ff4f02c4ac582794a41e1f103bf/raw/9e761af793d4414c39370f063a46a3f71686b579/gistfile1.txt > bad-contract. ol
$ docker run -v `pwd`:/share -it --rm trailofbits/eth-security-toolbox
docker$ cd /share
docker$ solc-select 0,11
docker$ slither bad-contract.sol
```

Irá gerar esta saída:

```bash
ethsec@1435b241ca60:/share$ slither bad-contract.sol
INFO:Detectors:
Reentrancy in Victim.withdraw() (bad-contract.sol#11-16):
    External calls:
    - (success) = msg.sender.call.value(amount)() (bad-contract.sol#13)
    State variables written after the call(s):
    - balances[msg.sender] = 0 (bad-contract.sol#15)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities
INFO:Detectors:
Low level call in Victim.withdraw() (bad-contract.sol#11-16):
    - (success) = msg.sender.call.value(amount)() (bad-contract.sol#13)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#low-level-calls
INFO:Slither:bad-contract.sol analyzed (1 contracts with 46 detectors), 2 result(s) found
INFO:Slither:Use https://crytic.io/ to get access to additional detectors and GitHub integration
```

Slither identificou o potencial de reentrada aqui, identificando as linhas chave onde o problema pode ocorrer e nos dando um link para mais detalhes sobre o problema:

> Referência: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities

permitindo que você aprenda rapidamente sobre potenciais problemas com seu código. Como todas as ferramentas de testes automatizadas, o Slither não é perfeito, e erra no fato de relatar demais. Pode avisar sobre uma possível reentrada, mesmo quando não existe qualquer vulnerabilidade explorável. Muitas vezes, rever a DIFERENÇA na saída de Slither entre alterações de código é extremamente esclarecedora, ajudando a descobrir vulnerabilidades que foram introduzidas muito mais cedo do que esperar que o seu projeto esteja completo em termos de código.

## Leituras adicionais {#further-reading}

**Guias sobre melhores práticas de segurança para um Contrato Inteligente**

- [consensys.github.io/smart-contract-best-practices/](https://consensys.github.io/smart-contract-best-practices/)
- [GitHub](https://github.com/ConsenSys/smart-contract-best-practices/)
- [Coleção agregada de recomendações de segurança e melhores práticas](https://github.com/guylando/KnowledgeLists/blob/master/EthereumSmartContracts.md)

**Padrão de verificação de segurança para um Contrato Inteligente (SCSVS)**

- [securing.github.io/SCSVS/](https://securing.github.io/SCSVS/)

_Conhece algum recurso da comunidade que o ajudou? Edite essa página e adicione!_

## Tutoriais relacionados {#related-tutorials}

- [Fluxo de desenvolvimento seguro](/developers/tutorials/secure-development-workflow/)
- [Como utilizar o Slither para encontrar bugs nos contratos inteligentes](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Como usar o Manticore para encontrar bugs em contratos inteligentes](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Diretrizes de segurança](/developers/tutorials/smart-contract-security-guidelines/)
- [Segurança de tokens](/developers/tutorials/token-integration-checklist/)
