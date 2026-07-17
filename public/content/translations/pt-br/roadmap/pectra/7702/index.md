---
title: Pectra 7702
metaTitle: Diretrizes do Pectra 7702
description: Saiba mais sobre o 7702 na atualização Pectra
lang: pt-br
---

## Resumo {#abstract}

O EIP-7702 define um mecanismo para adicionar código a uma EOA. Esta proposta permite que as EOAs, as contas legadas do Ethereum, recebam melhorias de funcionalidade de curto prazo, aumentando a usabilidade dos aplicativos. Isso é feito definindo um ponteiro para um código já implantado usando um novo tipo de transação: 4.

Este novo tipo de transação introduz uma lista de autorização. Cada tupla de autorização na lista é definida como

```
[ chain_id, address, nonce, y_parity, r, s ]
```

**address** é a delegação (bytecode já implantado que será usado pela EOA)
**chain_id** bloqueia a autorização para uma cadeia específica (ou 0 para todas as cadeias)
**nonce** bloqueia a autorização para um nonce de conta específico
(**y_parity, r, s**) é a assinatura da tupla de autorização, definida como keccak(0x05 || rlp ([chain_id ,address, nonce])) pela chave privada da EOA à qual a autorização se aplica (também chamada de autoridade)

Uma delegação pode ser redefinida ao delegar para o endereço nulo.

A chave privada da EOA mantém controle total sobre a conta após a delegação. Por exemplo, delegar para um Safe não torna a conta uma multisig porque ainda há uma única chave que pode contornar qualquer política de assinatura. Daqui para frente, os desenvolvedores devem projetar com a suposição de que qualquer participante do sistema pode ser um contrato inteligente. Para desenvolvedores de contratos inteligentes, não é mais seguro presumir que `tx.origin` se refere a uma EOA.

## Melhores práticas {#best-practices}

**Abstração de conta**: Um contrato de delegação deve se alinhar aos padrões mais amplos de abstração de conta (AA) do Ethereum para maximizar a compatibilidade. Em particular, o ideal é que seja compatível ou esteja em conformidade com o ERC-4337.

**Design não permissionado e resistente à censura**: O Ethereum valoriza a participação não permissionada. Um contrato de delegação NÃO DEVE codificar rigidamente (hard-code) ou depender de um único retransmissor (relayer) ou serviço "confiável". Isso inutilizaria a conta se o retransmissor ficasse offline. Recursos como processamento em lote (por exemplo, approve+transferFrom) podem ser usados pela própria EOA sem um retransmissor. Para desenvolvedores de aplicativos que desejam usar recursos avançados habilitados pelo 7702 (Abstração de Gás, Saques com Preservação de Privacidade), será necessário um retransmissor. Embora existam diferentes arquiteturas de retransmissores, nossa recomendação é usar [empacotadores 4337](https://www.erc4337.io/bundlers) apontando pelo menos para o [ponto de entrada 0.8](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0) porque:

- Eles fornecem interfaces padronizadas para retransmissão
- Incluem sistemas de pagador integrados
- Garantem compatibilidade futura
- Podem suportar resistência à censura por meio de uma [mempool pública](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool)
- Podem exigir que a função init seja chamada apenas do [EntryPoint](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0)

Em outras palavras, qualquer pessoa deve ser capaz de atuar como patrocinador/retransmissor da transação, desde que forneça a assinatura válida exigida ou a operação de usuário (UserOperation) da conta. Isso garante a resistência à censura: se nenhuma infraestrutura personalizada for necessária, as transações de um usuário não poderão ser bloqueadas arbitrariamente por um retransmissor controlador de acesso (gatekeeping). Por exemplo, o [Delegation Toolkit da MetaMask](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0) funciona explicitamente com qualquer empacotador ou pagador ERC-4337 em qualquer cadeia, em vez de exigir um servidor específico da MetaMask.

**Integração de aplicativos descentralizados (dapps) via interfaces de carteira**:

Dado que as carteiras colocarão contratos de delegação específicos em uma lista de permissões (whitelist) para o EIP-7702, os dapps não devem esperar solicitar autorizações 7702 diretamente. Em vez disso, a integração deve ocorrer por meio de interfaces de carteira padronizadas:

- **ERC-5792 (`wallet_sendCalls`)**: Permite que os dapps solicitem às carteiras a execução de chamadas em lote, facilitando funcionalidades como processamento em lote de transações e abstração de gás.

- **ERC-6900**: Permite que os dapps aproveitem os recursos modulares de conta inteligente, como chaves de sessão e recuperação de conta, por meio de módulos gerenciados pela carteira.

Ao utilizar essas interfaces, os dapps podem acessar as funcionalidades de conta inteligente fornecidas pelo EIP-7702 sem gerenciar diretamente as delegações, garantindo compatibilidade e segurança em diferentes implementações de carteira.

> Nota: Não há um método padronizado para os dapps solicitarem assinaturas de autorização 7702 diretamente. Os dapps devem depender de interfaces de carteira específicas, como o ERC-6900, para aproveitar os recursos do EIP-7702.

Para mais informações:

- [Especificação do ERC-5792](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [Especificação do ERC-6900](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

**Evitando a dependência de fornecedor (Vendor Lock-In)**: Em linha com o que foi dito acima, uma boa implementação é neutra em relação ao fornecedor e interoperável. Isso geralmente significa aderir aos padrões emergentes para contas inteligentes. Por exemplo, a [Modular Account da Alchemy](https://github.com/alchemyplatform/modular-account) usa o padrão ERC-6900 para contas inteligentes modulares e foi projetada com o "uso interoperável não permissionado" em mente.

**Preservação de privacidade**: Embora a privacidade onchain seja limitada, um contrato de delegação deve se esforçar para minimizar a exposição de dados e a vinculabilidade. Isso pode ser alcançado suportando recursos como pagamentos de gás em tokens ERC-20 (para que os usuários não precisem manter um saldo público de ETH, o que melhora a privacidade e a experiência do usuário) e chaves de sessão de uso único (que reduzem a dependência de uma única chave de longo prazo). Por exemplo, o EIP-7702 permite pagar o gás em tokens por meio de transações patrocinadas, e uma boa implementação facilitará a integração de tais pagadores sem vazar mais informações do que o necessário. Além disso, a delegação offchain de certas aprovações (usando assinaturas que são verificadas onchain) significa menos transações onchain com a chave principal do usuário, auxiliando na privacidade. Contas que exigem o uso de um retransmissor forçam os usuários a revelar seus endereços IP. As mempools públicas (PublicMempools) melhoram isso; quando uma transação/operação de usuário (UserOp) se propaga pela mempool, não é possível dizer se ela se originou do IP que a enviou ou se apenas foi retransmitida por ele via protocolo p2p.

**Extensibilidade e segurança modular**: As implementações de conta devem ser extensíveis para que possam evoluir com novos recursos e melhorias de segurança. A capacidade de atualização é inerentemente possível com o EIP-7702 (já que uma EOA sempre pode delegar para um novo contrato no futuro para atualizar sua lógica). Além da capacidade de atualização, um bom design permite a modularidade – por exemplo, módulos plug-in para diferentes esquemas de assinatura ou políticas de gastos – sem a necessidade de implantar tudo novamente. O Account Kit da Alchemy é um excelente exemplo, permitindo que os desenvolvedores instalem módulos de validação (para diferentes tipos de assinatura, como ECDSA, BLS, etc.) e módulos de execução para lógica personalizada. Para obter maior flexibilidade e segurança em contas habilitadas para o EIP-7702, os desenvolvedores são incentivados a delegar para um contrato proxy em vez de diretamente para uma implementação específica. Essa abordagem permite atualizações contínuas e modularidade sem exigir autorizações adicionais do EIP-7702 para cada alteração.

Benefícios do padrão Proxy:

- **Capacidade de atualização**: Atualize a lógica do contrato apontando o proxy para um novo contrato de implementação.

- **Lógica de inicialização personalizada**: Incorpore funções de inicialização dentro do proxy para configurar as variáveis de estado necessárias com segurança.

Por exemplo, o [SafeEIP7702Proxy](https://docs.safe.global/advanced/eip-7702/7702-safe) demonstra como um proxy pode ser utilizado para inicializar e gerenciar delegações com segurança em contas compatíveis com o EIP-7702.

Desvantagens do padrão Proxy:

- **Dependência de atores externos**: Você precisa confiar que uma equipe externa não fará a atualização para um contrato inseguro.

## Considerações de segurança {#security-considerations}

**Guarda de reentrância**: Com a introdução da delegação do EIP-7702, a conta de um usuário pode alternar dinamicamente entre uma Conta de Propriedade Externa (EOA) e um Contrato Inteligente (SC). Essa flexibilidade permite que a conta inicie transações e seja o alvo de chamadas. Como resultado, cenários em que uma conta chama a si mesma e faz chamadas externas terão `msg.sender` igual a `tx.origin`, o que prejudica certas suposições de segurança que antes dependiam de `tx.origin` ser sempre uma EOA.

Para desenvolvedores de contratos inteligentes, não é mais seguro presumir que `tx.origin` se refere a uma EOA. Da mesma forma, usar `msg.sender == tx.origin` como uma salvaguarda contra ataques de reentrada não é mais uma estratégia confiável.

Daqui para frente, os desenvolvedores devem projetar com a suposição de que qualquer participante do sistema pode ser um contrato inteligente. Alternativamente, eles poderiam implementar proteção explícita contra reentrada usando guardas de reentrância com padrões de modificador `nonReentrant`. Recomendamos seguir um modificador auditado, por exemplo, o [Reentrancy Guard da OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol). Eles também poderiam usar uma [variável de armazenamento transitório](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html).

**Considerações de segurança na inicialização**

A implementação de contratos de delegação do EIP-7702 introduz desafios de segurança específicos, particularmente em relação ao processo de inicialização. Uma vulnerabilidade crítica surge quando a função de inicialização (`init`) é acoplada atomicamente ao processo de delegação. Nesses casos, um frontrunner poderia interceptar a assinatura de delegação e executar a função `init` com parâmetros alterados, potencialmente assumindo o controle da conta.

Esse risco é especialmente pertinente ao tentar usar implementações existentes de Conta de Contrato Inteligente (SCA) com o EIP-7702 sem modificar seus mecanismos de inicialização.

**Soluções para mitigar vulnerabilidades de inicialização**

- Implementar `initWithSig`  
  Substitua a função `init` padrão por uma função `initWithSig` que exige que o usuário assine os parâmetros de inicialização. Essa abordagem garante que a inicialização só possa prosseguir com o consentimento explícito do usuário, mitigando assim os riscos de inicialização não autorizada.

- Utilizar o EntryPoint do ERC-4337  
  Exija que a função de inicialização seja chamada exclusivamente do contrato EntryPoint do ERC-4337. Este método aproveita a estrutura padronizada de validação e execução fornecida pelo ERC-4337, adicionando uma camada adicional de segurança ao processo de inicialização.  
  _(Veja: [Documentação do Safe](https://docs.safe.global/advanced/eip-7702/7702-safe))_

Ao adotar essas soluções, os desenvolvedores podem aprimorar a segurança dos contratos de delegação do EIP-7702, protegendo-se contra possíveis ataques de frontrunning durante a fase de inicialização.

**Colisões de armazenamento**: Delegar código não limpa o armazenamento existente. Ao migrar de um contrato de delegação para outro, os dados residuais do contrato anterior permanecem. Se o novo contrato utilizar os mesmos slots de armazenamento, mas os interpretar de forma diferente, isso pode causar um comportamento indesejado. Por exemplo, se a delegação inicial foi para um contrato onde um slot de armazenamento representa um `bool`, e a delegação subsequente é para um contrato onde o mesmo slot representa um `uint`, a incompatibilidade pode levar a resultados imprevisíveis.

**Riscos de phishing**: Com a implementação da delegação do EIP-7702, os ativos na conta de um usuário podem ser totalmente controlados por contratos inteligentes. Se um usuário delegar sua conta sem saber para um contrato malicioso, um invasor poderá facilmente obter o controle e roubar fundos. Ao usar `chain_id=0`, a delegação é aplicada a todos os IDs de cadeia. Delegue apenas para um contrato imutável (nunca delegue para um proxy) e apenas para contratos que foram implantados usando CREATE2 (com initcode padrão - sem contratos metamórficos) para que o implantador não possa implantar algo diferente no mesmo endereço em outro lugar. Caso contrário, sua delegação coloca sua conta em risco em todas as outras cadeias EVM.

Quando os usuários realizam assinaturas delegadas, o contrato de destino que recebe a delegação deve ser exibido de forma clara e proeminente para ajudar a mitigar os riscos de phishing.

**Superfície de confiança mínima e segurança**: Embora ofereça flexibilidade, um contrato de delegação deve manter sua lógica principal mínima e auditável. O contrato é efetivamente uma extensão da EOA do usuário, portanto, qualquer falha pode ser catastrófica. As implementações devem seguir as melhores práticas da comunidade de segurança de contratos inteligentes. Por exemplo, as funções de construtor ou inicializador devem ser cuidadosamente protegidas – como destacado pela Alchemy, se usar um padrão de proxy sob o 7702, um inicializador desprotegido pode permitir que um invasor assuma o controle da conta. As equipes devem ter como objetivo manter o código onchain simples: o contrato 7702 da Ambire tem apenas cerca de 200 linhas de Solidity, minimizando deliberadamente a complexidade para reduzir bugs. Deve-se encontrar um equilíbrio entre uma lógica rica em recursos e a simplicidade que facilita a auditoria.

### Implementações conhecidas {#known-implementations}

Devido à natureza do EIP-7702, recomenda-se que as carteiras tenham cautela ao ajudar os usuários a delegar para um contrato de terceiros. Listada abaixo está uma coleção de implementações conhecidas que foram auditadas:

| Endereço do contrato | Fonte | Auditorias |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [Uniswap/calibur](https://github.com/Uniswap/calibur)                                                                                      | [auditorias](https://github.com/Uniswap/calibur/tree/main/audits)                                                                                                 |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account](https://github.com/alchemyplatform/modular-account)                                                      | [auditorias](https://github.com/alchemyplatform/modular-account/tree/develop/audits)                                                                              |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol)              | [auditorias](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits)                                                                            |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework)                                                          | [auditorias](https://github.com/MetaMask/delegation-framework/tree/main/audits)                                                                                   |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [Equipe de AA da Fundação Ethereum](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol) | [auditorias](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf) |
| 0x17c11FDdADac2b341F2455aFe988fec4c3ba26e3 | [Luganodes/Pectra-Batch-Contract](https://github.com/Luganodes/Pectra-Batch-Contract)                                                      | [auditorias](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html)                             |

## Diretrizes para carteira de hardware {#hardware-wallet-guidelines}

As carteiras de hardware não devem expor delegação arbitrária. O consenso no espaço de carteiras de hardware é usar uma lista de contratos de delegador confiáveis. Sugerimos permitir as implementações conhecidas listadas acima e considerar outras caso a caso. Como delegar sua EOA a um contrato dá controle sobre todos os ativos, as carteiras de hardware devem ser cautelosas com a forma como implementam o 7702.

### Cenários de integração para aplicativos complementares {#integration-scenarios-for-companion-apps}

#### Preguiçoso (Lazy) {#lazy}

Como a EOA ainda opera normalmente, não há nada a fazer.

Nota: alguns ativos podem ser rejeitados automaticamente pelo código de delegação, como NFTs ERC-1155, e o suporte deve estar ciente disso.

#### Ciente {#aware}

Notifique o usuário de que há uma delegação em vigor para a EOA verificando seu código e, opcionalmente, ofereça a remoção da delegação.

#### Delegação comum {#common-delegation}

O provedor de hardware coloca contratos de delegação conhecidos em uma lista de permissões (whitelist) e implementa seu suporte no aplicativo complementar de software. Recomenda-se escolher um contrato com suporte total ao ERC-4337.

As EOAs delegadas a um contrato diferente serão tratadas como EOAs padrão.

#### Delegação personalizada {#custom-delegation}

O provedor de hardware implementa seu próprio contrato de delegação e o adiciona às listas, implementando seu suporte no aplicativo complementar de software. Recomenda-se construir um contrato com suporte total ao ERC-4337.

As EOAs delegadas a um contrato diferente serão tratadas como EOAs padrão.