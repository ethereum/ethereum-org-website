---
title: Bibliotecas de contratos inteligentes
description: "Descubra bibliotecas de contratos inteligentes e blocos de construção reutilizáveis para acelerar seus projetos de desenvolvimento na Ethereum."
lang: pt-br
---

Você não precisa escrever cada contrato inteligente do seu projeto do zero. Existem muitas bibliotecas de contratos inteligentes de código aberto disponíveis que fornecem blocos de construção reutilizáveis para o seu projeto, o que pode evitar que você tenha que reinventar a roda.

## Pré-requisitos {#prerequisites}

Antes de mergulhar nas bibliotecas de contratos inteligentes, é uma boa ideia ter um bom entendimento da estrutura de um contrato inteligente. Acesse [anatomia dos contratos inteligentes](/developers/docs/smart-contracts/anatomy/) se você ainda não fez isso.

## O que há em uma biblioteca {#whats-in-a-library}

Geralmente, você pode encontrar dois tipos de blocos de construção em bibliotecas de contratos inteligentes: comportamentos reutilizáveis que você pode adicionar aos seus contratos e implementações de vários padrões.

### Comportamentos {#behaviors}

Ao escrever contratos inteligentes, há uma boa chance de você se pegar escrevendo padrões semelhantes repetidas vezes, como atribuir um endereço de _admin_ (administrador) para realizar operações protegidas em um contrato, ou adicionar um botão de _pause_ (pausa) de emergência no caso de um problema inesperado.

As bibliotecas de contratos inteligentes geralmente fornecem implementações reutilizáveis desses comportamentos como [bibliotecas](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) ou via [herança](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) em Solidity.

Como exemplo, a seguir está uma versão simplificada do [contrato `Ownable`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) da [biblioteca OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts), que designa um endereço como o proprietário de um contrato e fornece um modificador para restringir o acesso a um método apenas a esse proprietário.

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

Para usar um bloco de construção como este em seu contrato, você precisaria primeiro importá-lo e, em seguida, estendê-lo em seus próprios contratos. Isso permitirá que você use o modificador fornecido pelo contrato base `Ownable` para proteger suas próprias funções.

```solidity
import ".../Ownable.sol"; // Caminho para a biblioteca importada

contract MyContract is Ownable {
    // A função a seguir só pode ser chamada pelo proprietário
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

Outro exemplo popular é [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) ou [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html). Estas são bibliotecas (em oposição a contratos base) que fornecem funções aritméticas com verificações de overflow, que não são fornecidas pela linguagem. É uma boa prática usar qualquer uma dessas bibliotecas em vez de operações aritméticas nativas para proteger seu contrato contra overflows, o que pode ter consequências desastrosas!

### Padrões {#standards}

Para facilitar a [composabilidade e interoperabilidade](/developers/docs/smart-contracts/composability/), a comunidade Ethereum definiu vários padrões na forma de **ERCs**. Você pode ler mais sobre eles na seção de [padrões](/developers/docs/standards/).

Ao incluir um ERC como parte de seus contratos, é uma boa ideia procurar implementações padrão em vez de tentar criar a sua própria. Muitas bibliotecas de contratos inteligentes incluem implementações para os ERCs mais populares. Por exemplo, o onipresente [padrão de token fungível ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) pode ser encontrado em [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) e [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20). Além disso, alguns ERCs também fornecem implementações canônicas como parte do próprio ERC.

Vale a pena mencionar que alguns ERCs não são independentes, mas são adições a outros ERCs. Por exemplo, o [ERC-2612](https://eips.ethereum.org/EIPS/eip-2612) adiciona uma extensão ao ERC-20 para melhorar sua usabilidade.

## Como adicionar uma biblioteca {#how-to}

Sempre consulte a documentação da biblioteca que você está incluindo para obter instruções específicas sobre como incluí-la em seu projeto. Várias bibliotecas de contratos Solidity são empacotadas usando `npm`, então você pode simplesmente usar `npm install` nelas. A maioria das ferramentas para a [compilação](/developers/docs/smart-contracts/compiling/) de contratos procurará em seu `node_modules` por bibliotecas de contratos inteligentes, então você pode fazer o seguinte:

```solidity
// Isso carregará a biblioteca @openzeppelin/contracts do seu node_modules
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Independentemente do método que você usar, ao incluir uma biblioteca, fique sempre de olho na versão da [linguagem](/developers/docs/smart-contracts/languages/). Por exemplo, você não pode usar uma biblioteca para Solidity 0.6 se estiver escrevendo seus contratos em Solidity 0.5.

## Quando usar {#when-to-use}

Usar uma biblioteca de contratos inteligentes para o seu projeto tem vários benefícios. Em primeiro lugar, economiza seu tempo, fornecendo blocos de construção prontos para uso que você pode incluir em seu sistema, em vez de ter que codificá-los você mesmo.

A segurança também é uma grande vantagem. As bibliotecas de contratos inteligentes de código aberto também são frequentemente examinadas de perto. Como muitos projetos dependem delas, há um forte incentivo da comunidade para mantê-las sob revisão constante. É muito mais comum encontrar erros no código do aplicativo do que em bibliotecas de contratos reutilizáveis. Algumas bibliotecas também passam por [auditorias externas](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) para segurança adicional.

No entanto, o uso de bibliotecas de contratos inteligentes traz o risco de incluir código com o qual você não está familiarizado em seu projeto. É tentador importar um contrato e incluí-lo diretamente em seu projeto, mas sem um bom entendimento do que esse contrato faz, você pode estar introduzindo inadvertidamente um problema em seu sistema devido a um comportamento inesperado. Certifique-se sempre de ler a documentação do código que você está importando e, em seguida, revise o próprio código antes de torná-lo parte do seu projeto!

Por último, ao decidir se deve incluir uma biblioteca, considere seu uso geral. Uma biblioteca amplamente adotada tem os benefícios de ter uma comunidade maior e mais olhos procurando por problemas. A segurança deve ser seu foco principal ao construir com contratos inteligentes!

## Ferramentas relacionadas {#related-tools}

**OpenZeppelin Contracts -** **_A biblioteca mais popular para o desenvolvimento seguro de contratos inteligentes._**

- [Documentação](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Fórum da comunidade](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Blocos de construção seguros, simples e flexíveis para contratos inteligentes._**

- [Documentação](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_Um projeto Solidity com contratos, bibliotecas e exemplos para ajudá-lo a construir aplicativos distribuídos completos para o mundo real._**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK -** **_Fornece as ferramentas necessárias para construir contratos inteligentes personalizados de forma eficiente_**

- [Documentação](https://portal.thirdweb.com/contracts/build/overview)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## Tutoriais relacionados {#related-tutorials}

- [Considerações de segurança para desenvolvedores Ethereum](/developers/docs/smart-contracts/security/) _– Um tutorial sobre considerações de segurança ao construir contratos inteligentes, incluindo o uso de bibliotecas._
- [Entenda o contrato inteligente de token ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _- Tutorial sobre o padrão ERC-20, fornecido por várias bibliotecas._

## Leitura adicional {#further-reading}

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-o!_