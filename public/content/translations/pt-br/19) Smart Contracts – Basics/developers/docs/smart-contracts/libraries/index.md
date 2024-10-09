---
title: Biblioteca de contratos inteligentes
description:
lang: pt-br
---

Você não precisa escrever todos os contratos inteligentes em seu projeto a partir do zero. Há muitas bibliotecas de contratos inteligentes de código aberto disponíveis que fornecem blocos de construção reutilizáveis para o seu projeto que podem evitar que você tenha que reinventar a roda.

## Pré-Requisitos {#prerequisites}

Antes de entrar em bibliotecas de contratos inteligentes, é uma boa ideia ter uma boa compreensão da estrutura de um contrato inteligente. Vá até a [anatomia do contrato inteligente](/developers/docs/smart-contracts/anatomy/) se você ainda não fez isso.

## O que há em uma biblioteca {#whats-in-a-library}

Geralmente, você pode encontrar dois tipos de blocos de construção em bibliotecas de contratos inteligentes: comportamentos reutilizáveis podem ser adicionados aos seus contratos, e a implementação de várias normas.

### Comportamentos {#behaviors}

Ao escrever contratos inteligentes, há uma boa chance de você escrever padrões semelhantes repetidamente, como atribuir um endereço de administrador __ para realizar operações protegidas em um contrato, ou adicionando um botão de emergência _pause_ em caso de um problema inesperado.

As bibliotecas inteligentes de contratos geralmente fornecem implementações reutilizáveis destes comportamentos como [bibliotecas](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) ou via [herança](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) em Solidity.

Como exemplo, a seguir é uma versão simplificada do [`contrato` próprio](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) da [biblioteca de contratos OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts), que concebe um endereço como proprietário de um contrato e fornece um modificador para restringir o acesso a um método apenas para esse proprietário.

```solidity
contract Ownable {
    address public owner;

    constructor() internal {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }
}
```

Para usar um bloco de construção como esse no seu contrato, você precisa primeiro importá-lo, e depois integrá-lo nos seus próprios contratos. Isso permitirá que você use o modificador fornecido pelo contrato base `Ownable` para proteger suas próprias funções.

```solidity
import ".../Ownable.sol"; // Caminho para a library importada

contract MyContract is Ownable {
    // A seguinte função só pode ser chamada pelo proprietário
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

Outro exemplo popular é o [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) ou [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html). Estas são bibliotecas (em oposição aos contratos base) que fornecem as funções aritméticas com verificações de excesso de fluxo, que não são fornecidas pela linguagem. É uma boa prática usar uma dessas bibliotecas em vez de operações aritméticas para proteger seu contrato contra transbordos, que pode ter consequências desastrosas!

### Padrões {#standards}

Para facilitar a [composição e a interoperabilidade](/developers/docs/smart-contracts/composability/), a comunidade Ethereum definiu vários padrões na forma de **ERCs**. Você pode ler mais sobre eles na seção [de padrões](/developers/docs/standards/).

Ao incluir um ERC como parte de seus contratos, É uma boa ideia procurar implementações padrão ao invés de tentar implantar a sua própria. Muitas bibliotecas de contratos inteligentes incluem implementações para os ERC mais populares. Por exemplo, o onipresente [padrão de token fungível lERC20 universal](/developers/tutorials/understand-the-erc-20-token-smart-contract/) pode ser encontrado em [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) e [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20). Além disso, alguns ERCs também fornecem implementações canônicas como parte do próprio ERC.

Vale a pena mencionar que alguns ERCs não são sozinhos, mas são adições a outros ERCs. Por exemplo, [ERC2612](https://eips.ethereum.org/EIPS/eip-2612) adiciona uma extensão ao ERC20 para melhorar sua usabilidade.

## Como adicionar uma biblioteca {#how-to}

Sempre consulte a documentação da biblioteca que você está incluindo para instruções específicas sobre como incluí-la no seu projeto. Várias bibliotecas de contratos Solidity são empacotadas usando o `npm`, então você pode apenas `npm instale-as`. A maioria das ferramentas para [compilar](/developers/docs/smart-contracts/compiling/) contratos irá analisar os seus `node_modules` para bibliotecas de contratos inteligentes, assim você poderá fazer o seguinte:

```solidity
// Isto irá carregar a biblioteca @openzeppelin/contracts de seus node_modules
importe "@openzeppelin/contracts/token/ERC721/ERC721. ol";

contrato MyNFT é ERC721 {
    constructor() ERC721("MyNFT", "MNFT") público { }
}
```

Independente do método que você usa, ao incluir uma biblioteca, sempre fique de olho na versão de [linguagem](/developers/docs/smart-contracts/languages/). Por exemplo, não é possível usar uma biblioteca para Solidity 0.6 se você estiver escrevendo seus contratos em Solidity 0.5.

## Quando usar {#when-to-use}

Usar uma biblioteca de contratos inteligente para o seu projeto traz vários benefícios. Em primeiro lugar e acima de tudo, economiza seu tempo fornecendo blocos de construção prontos para usar que você pode incluir no seu sistema, ao invés de ter que programar você mesmo.

A segurança é também um importante ganho. Bibliotecas de contratos inteligentes de código aberto também são frequentemente cuidadosamente controladas. Dado que muitos projectos dependem deles, existe um forte incentivo por parte da comunidade para os manter sob constante revisão. É muito mais comum encontrar erros no código do aplicativo do que em bibliotecas de contratos reutilizáveis. Algumas bibliotecas também são submetidas a [auditorias externas](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) para segurança adicional.

No entanto, o uso de bibliotecas de contratos inteligentes acarreta o risco de incluir código com que você não está familiarizado no seu projeto. É tentador importar um contrato e incluí-lo diretamente no seu projeto, mas sem um bom entendimento do que esse contrato faz, você pode estar inadvertidamente a introduzir um problema no seu sistema devido a um comportamento inesperado. Certifique-se de ler a documentação do código que você está importando, e, em seguida, revise o próprio código antes de torná-lo parte do seu projeto!

Por último, ao decidir se deve incluir uma biblioteca, considere a sua utilização global. Uma comunidade amplamente adoptada tem os benefícios de ter uma comunidade mais vasta e de olhar para ela com mais olhos para as questões. A segurança deve ser seu foco principal ao construir com contratos inteligentes!

## Ferramentas relacionadas {#related-tools}

**OpenZeppelin Contracts -** **_Biblioteca para o desenvolvimento de contratos inteligentes seguros._**

- [Documentação](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Fórum da Comunidade](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Blocos de código seguros, simples e flexíveis para contratos inteligentes._**

- [Documentação](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_Um projeto Solidity com contratos, bibliotecas e exemplos para ajudá-lo a construir aplicações distribuídas completas para o mundo real._**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK -** **_Fornece as ferramentas necessárias para criar contratos inteligentes e personalizados com eficiência_**

- [Documentação](https://portal.thirdweb.com/solidity/)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## Tutoriais relacionados {#related-tutorials}

- [Considerações de segurança para os desenvolvedores da Ethereum](/developers/docs/smart-contracts/security/) _– Um tutorial sobre considerações de segurança ao criar contratos inteligentes, incluindo o uso da biblioteca._
- [Entenda o contrato inteligente de token ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _-Tutorial no padrão ERC20, fornecido por várias bibliotecas._

## Leitura adicional {#further-reading}

_Conhece um recurso da comunidade que te ajudou? Edite essa página e adicione!_
