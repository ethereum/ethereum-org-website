---
title: Diretrizes Pectra 7702
description: Saiba mais sobre 7702 no comunicado da Pectra
lang: pt-br
---

# Pectra 7702

## Resumo {#abstract}

O EIP 7702 define um mecanismo para adicionar código a uma EOA. Esta proposta permite que as EOAs, as contas Ethereum legadas, recebam melhorias de funcionalidade de curto prazo, aumentando a usabilidade dos aplicativos. Isso é feito definindo um ponteiro para um código já implantado usando um novo tipo de transação: 4.

Este novo tipo de transação introduz uma lista de autorização. Cada tupla de autorização na lista é definida como

```
[ chain_id, endereço, nonce, y_parity, r, s ]
```

**endereço** é a delegação (bytecode já implantado que será usado pela EOA)
**chain_id** bloqueia a autorização para uma cadeia específica (ou 0 para todas as redes)
**nonce** bloqueia a autorização para uma conta específica nonce
(**y_parity, r, s**) é a assinatura da tupla de autorização, definida como keccak(0x05 || rlp ([chain_id ,endereço, nonce])) pela chave privada da EOA à qual a autorização se aplica (também chamada de autoridade)

Uma delegação pode ser redefinida delegando ao endereço nulo.

A chave privada do EOA mantém o controle total sobre a conta após a delegação. Por exemplo, delegar para um Safe não torna a conta uma multisig porque ainda há uma única chave que pode ignorar qualquer política de assinatura. No futuro, os desenvolvedores devem projetar partindo do pressuposto de que qualquer participante do sistema pode ser um contrato inteligente. Para desenvolvedores de contratos inteligentes, não é mais seguro presumir que `tx.origin` se refere a um EOA.

## Boas práticas {#best-practices}

**Abstração de conta**: Um contrato de delegação deve estar alinhado aos padrões mais amplos de abstração de conta (AA) do Ethereum para maximizar a compatibilidade. Em particular, o ideal é que ele seja compatível ou complacente com ERC-4337.

**Design Sem permissão e Resistente à Censura**: O Ethereum valoriza a participação sem permissão. Um contrato de delegação NÃO DEVE ser codificado ou depender de qualquer retransmissor, ou serviço “confiável”. Isso bloquearia a conta se o retransmissor ficasse offline. Recursos como o processamento em lote (por exemplo, approve+transferFrom) podem ser usados pela própria EOA sem um retransmissor. Os desenvolvedores de aplicativos que queiram usar funcionalidades avançadas habilitadas pelo 7702 (Abstração de Gas, Saque com preservação de Privacidade) será necessário um relayer. Embora existam diferentes arquiteturas de relayer, nossa recomendação é usar [agrupadores 4337](https://www.erc4337.io/bundlers)
apontando para pelo menos o [ponto de entrada 0.8}(https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0), porque:

- Eles fornecem interfaces padronizadas para retransmissão
- Incluir sistemas de pagamento integrados
- Garantir compatibilidade futura
- Pode suportar a resistência à censura por meio de um [mempool público](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool)
- Pode exigir que a função init seja chamada somente de [EntryPoint](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0)

Em outras palavras, qualquer pessoa deve ser capaz de atuar como patrocinador/retransmissor da transação, desde que forneça a assinatura válida necessária ou a UserOperation da conta. Isso garante a resistência à censura: se uma estrutura personalizada não é obrigatória, as transações de um usuário não podem ser bloqueadas arbitrariamente por relay de controle de acesso. Por exemplo, o [MetaMask’s Delegation Toolkit](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0) fuciona explicitamente com qualquer agrupador ou pagador em qualquer cadeia, em vez de requerir um servidor específico de MetaMask.

**Integração de dApps via interfaces de carteira**:

Considerando que as carteiras irão incluir em lista de permissões contratos de delegação específicos para o EIP-7702, as dApps não devem esperar solicitar autorizações 7702 diretamente. Ao invés disso, a integração deve ocorrer através de interfaces de carteira padronizadas:

- **ERC-5792 (`wallet_sendCalls`)**: Permite que dApps solicitem às carteiras que executem chamadas em lote, facilitando funcionalidades como processamento em lote de transações e abstração de gás.

- **ERC-6900**: Permite que dApps aproveitem recursos modulares de contas inteligentes, como chaves de sessão e recuperação de conta, por meio de módulos gerenciados por carteira.

Ao utilizar essas interfaces, os dApps podem acessar funcionalidades de conta inteligente fornecidas pelo EIP-7702 sem gerenciar delegações diretamente, garantindo compatibilidade e segurança entre diferentes implementações de carteira.

> Observação: não há um método padronizado para dApps solicitarem assinaturas de autorização 7702 diretamente. Os DApps devem depender da interface específica de carteira, como ERC-6900, para aproveitar os recursos do EIP-7702.

Para mais informações:

- [Especificação ERC-5792](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [Especificação ERC-6900](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

**Evitando a fixação de fornecedores**: De acordo com o exposto acima, uma boa implementação é independente de fornecedores e interoperável. Isso geralmente significa aderir a padrões emergentes para contas inteligentes. Por exemplo, a [Conta Modular da Alchemy](https://github.com/alchemyplatform/modular-account) usa o padrão ERC-6900 para contas inteligentes modulares e foi projetada com “uso interoperável sem permissão” em mente.

**Preservação da privacidade**: embora a privacidade on-chain seja limitada, um contrato de delegação deve se esforçar para minimizar a exposição e a vinculabilidade dos dados. Isso pode ser alcançado por meio do suporte a recursos como pagamentos de gás em tokens ERC-20 (para que os usuários não precisem manter um saldo público de ETH, o que melhora a privacidade e a UX) e chaves de sessão únicas (que reduzem a dependência de uma única chave de longo prazo). Por exemplo, o EIP-7702 permite o pagamento de gás em tokens por meio de transações patrocinadas, e uma boa implementação facilitará a integração desses pagadores sem vazar mais informações do que o necessário. Além disso, a delegação off-chain de certas aprovações (usando assinaturas verificadas on-chain) significa menos transações on-chain com a chave primária do usuário, auxiliando na privacidade. Contas que exigem o uso de um retransmissor forçam os usuários a revelar seus endereços IP. O PublicMempools melhora isso: quando uma transação/UserOp se propaga pelo mempool, não é possível saber se ela se originou do IP que a enviou ou se foi apenas retransmitida por meio do protocolo p2p.

**Extensibilidade e segurança modular**: As implementações de contas devem ser extensíveis para que possam evoluir com novos recursos e melhorias de segurança. A capacidade de atualização é inerentemente possível com o EIP-7702 (já que um EOA sempre pode delegar a um novo contrato no futuro para atualizar sua lógica). Além da capacidade de atualização, um bom design permite modularidade – por exemplo, módulos plug-in para diferentes esquemas de assinatura ou políticas de gastos – sem a necessidade de reimplantação completa. O Account Kit da Alchemy é um excelente exemplo, permitindo que os desenvolvedores instalem módulos de validação (para diferentes tipos de assinatura, como ECDSA, BLS, etc.) e módulos de execução para lógica personalizada. Para obter maior flexibilidade e segurança em contas habilitadas para EIP-7702, os desenvolvedores são incentivados a delegar para um contrato de proxy em vez de diretamente para uma implementação específica. Essa abordagem permite atualizações contínuas e modularidade sem exigir autorizações EIP-7702 adicionais para cada alteração.

Benefícios do Padrão Proxy:

- Capacidade de atualização: Atualize a lógica do contrato apontando o proxy para um novo contrato de implementação.

- **Lógica de inicialização personalizada**: incorpore funções de inicialização no proxy para configurar variáveis ​​de estado necessárias com segurança.

Por exemplo, o [SafeEIP7702Proxy](https://docs.safe.global/advanced/eip-7702/7702-safe) demonstra como um proxy pode ser utilizado para inicializar e gerenciar com segurança delegações em contas compatíveis com EIP-7702.

Contras do padrão Proxy:

- **Dependência de atores externos**: você precisa confiar em uma equipe externa para não atualizar para um contrato inseguro.

## Considerações de segurança {#security-considerations}

**Proteção de reentrada**: Com a introdução da delegação EIP-7702, a conta de um usuário pode alternar dinamicamente entre uma Conta de Propriedade Externa (EOA) e um Contrato Inteligente (SC). Essa flexibilidade permite que a conta inicie transações e seja alvo de chamadas. Como resultado, cenários em que uma conta chama a si mesma e faz chamadas externas terão `msg.sender` igual a `tx.origin`, o que enfraquece certas premissas de segurança que antes dependiam de `tx.origin` ser sempre um EOA.

Para desenvolvedores de contratos inteligentes, não é mais seguro presumir que `tx.origin` se refere a um EOA. Da mesma forma, usar `msg.sender == tx.origin` como proteção contra ataques de reentrada não é mais uma estratégia confiável.

No futuro, os desenvolvedores devem projetar partindo do pressuposto de que qualquer participante do sistema pode ser um contrato inteligente. Alternativamente, eles poderiam implementar proteção de reentrada explícita usando defesas de reentrada com padrões modificadores `nonReentrant`. Recomendamos seguir um modificador auditado, por exemplo [Open Zeppelin's Reentrancy Guard](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol). Eles também podem usar uma [variável de armazenamento transitório](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html).

**Considerações sobre segurança na inicialização**

A implementação de contratos de delegação EIP-7702 introduz desafios de segurança específicos, particularmente no que diz respeito ao processo de inicialização. Uma vulnerabilidade crítica surge quando a função de inicialização (`init`) é acoplada atomicamente ao processo de delegação. Nesses casos, um frontrunner poderia interceptar a assinatura da delegação e executar a função `init` com parâmetros alterados, potencialmente assumindo o controle da conta.

Esse risco é especialmente pertinente ao tentar usar implementações existentes de Conta de Contrato Inteligente (SCA) com EIP-7702 sem modificar seus mecanismos de inicialização.

**Soluções para mitigar vulnerabilidades de inicialização**

- Implementar `initWithSig`
  Substituir a função padrão `init` por uma função `initWithSig` que exige que o usuário assine os parâmetros de inicialização. Essa abordagem garante que a inicialização só possa prosseguir com o consentimento explícito do usuário, mitigando assim os riscos de inicialização não autorizada.

- Utilize o EntryPoint do ERC-4337
  Exija que a função de inicialização seja chamada exclusivamente a partir do contrato EntryPoint do ERC-4337. Este método aproveita a estrutura padronizada de validação e execução fornecida pelo ERC-4337, adicionando uma camada adicional de segurança ao processo de inicialização.  
  _(Veja: [Documentação Safe](https://docs.safe.global/advanced/eip-7702/7702-safe))_

Ao adotar estas soluções, os desenvolvedores podem melhorar a segurança dos contratos de delegação EIP-7702, protegendo contra possíveis ataques de frontrunning durante a fase de inicialização.

**Colisões de armazenamento** Se o problema delegado não for limpo ou resolvido corretamente, podem haver perda de dados ou corrupção de informações. Ao migrar de um contrato de delegação para outro, os dados residuais do contrato anterior permanecem. Se o novo contrato utilizar os mesmos slots de armazenamento, mas interpretá-los de forma diferente, isso poderá causar um comportamento não intencional. Por exemplo, se a delegação inicial foi para um contrato em que um slot de armazenamento representa um `bool`, e a delegação subsequente foi para um contrato em que o mesmo slot representa um `uint`, a incompatibilidade pode levar a resultados imprevisíveis.

**Riscos de phishing** Com a implementação da delegação EIP-7702, os ativos na conta de um usuário podem ser totalmente controlados por contratos inteligentes. Se um usuário, sem saber, delegar sua conta a um contrato malicioso, um invasor poderá facilmente obter o controle dos saldos e rouba-los. Ao usar `chain_id=0` a delegação é aplicada a todos os IDs da cadeia. Delegue somente para um contrato imutável (nunca delegue para um proxy) e somente para aqueles implementados usando CREATE2 (com código init padrão - sem contratos metamórficos) para que o implantador não possa executar algo diferente no mesmo endereço em outro lugar. De outra forma, sua delegação coloca sua conta em risco em todas as outras cadeias de EVM.

Quando o usuário executa assinaturas delegadas, o contrato alvo que recebe a delegação deve ser exibido de forma clara e destacada para ajudar a mitigar os riscos de ataque cibernético.

\*\* Segurança de superfície confiável\*\*: Embora ofereça flexibilidade, um contrato de delegação deve manter sua lógica básica mínima e auditável. O contrato é efetivamente uma extensão da EOA do usuário, então qualquer falha pode ser catastrófica. As implementações devem seguir as melhores práticas da comunidade de segurança de contratos inteligentes. Por exemplo, funções de construtor ou inicializador devem ser cuidadosamente protegidas – conforme destacado pela Alchemy, se usar um padrão de proxy abaixo de 7702, um inicializador desprotegido pode permitir que um invasor assuma o controle da conta. As equipes devem tentar manter o código onchain simples: o contrato 7702 da Ambire tem apenas ~200 linhas de Solidity, minimizando deliberadamente a complexidade para reduzir bugs. É preciso encontrar um equilíbrio entre a lógica rica em recursos e a simplicidade que facilita a auditoria.

### Implementações conhecidas {#known-implementations}

Devido à natureza do EIP 7702, é recomendável que as carteiras tenham cautela ao ajudar os usuários a delegar um contrato de terceiros. A lista logo abaixo é uma coleção de implementações conhecidas que foram auditadas:

| Endereço do contrato                       | Fonte                                                                                                                                         | Auditorias                                                                                                                                                                    |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [Uniswap/calibur](https://github.com/Uniswap/calibur)                                                                                         | [auditorias]&#xA;(https://GitHub.com/Uniswap/calibur/tree/main/audits) |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account](https://github.com/alchemyplatform/modular-account)                                                         | [auditoria](https://github.com/alchemyplatform/modular-account/tree/develop/audits)                                                                                           |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol)                 | [auditoria](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits)                                                                                         |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework)                                                             | [auditoria](https://github.com/MetaMask/delegation-framework/tree/main/audits)                                                                                                |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [Equipe AA da Fundação Ethereum](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol) | [auditoria](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf)              |
| 0x17c11FDdADac2b341F2455aFe988fec4c3ba26e3 | [Luganodes/Pectra-Batch-Contract](https://github.com/Luganodes/Pectra-Batch-Contract)                                                         | [auditoria](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html)                                          |

## Diretrizes para carteira de hardware {#hardware-wallet-guidelines}

Carteiras de hardware não devem expor a delegação arbitrária. O consenso no espaço da carteira de hardware para usar uma lista de contratos da delegação confiáveis. Nós sugerimos a permissão das implementações conhecidas listadas acima e considerar outras caso a caso. Como delegar seu EOA a um contrato dá controle sobre todos os ativos, as carteiras de hardware devem ter cautela na forma em que implementam o 7702.

### Cenários de integração para aplicativos complementares&#xA;{#integration-scenarios-for-companion-apps}

#### Lazy {#lazy}

Como a EOA ainda opera como de costume, não há nada para fazer.

Observação: alguns ativos podem ser rejeitados automaticamente pelo código de delegação, como NFTs ERC 1155, e o suporte deve estar ciente disso.

#### Ciente {#aware}

Notifique o usuário que uma delegação está em vigor para o EOA, verificando seu código e, opcionalmente, ofereça-se para remover a delegação.

#### Delegação comum {#common-delegation}

O fornecedor de hardware coloca contratos de delegação conhecidos na lista de permissões e implementa seu suporte no software complementar. É recomendável escolher um contrato com suporte total ao ERC 4337.

As EOAs delegadas a outra entidade serão tratadas como EOAs padrão.

#### Delegação personalizada {#custom-delegation}

O fornecedor de hardware desenvolve e implementa seu próprio contrato de delegação e o adiciona à lista de contratos suportados pelo software complementar, permitindo que o hardware seja compatível com o software. É recomendável criar um contrato com suporte total ao ERC 4337.

As EOAs delegadas a outra entidade serão tratadas como EOAs padrão.
