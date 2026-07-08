---
title: Adicionando carteiras
description: A política que usamos ao adicionar uma carteira ao ethereum.org
lang: pt-br
---

Queremos garantir que mostramos uma variedade de carteiras cobrindo o cenário rico em recursos das carteiras para que os usuários possam navegar no Ethereum de maneira confiante.

Qualquer pessoa é livre para sugerir a adição de uma carteira no ethereum.org. Se houver uma carteira que deixamos passar, por favor, sugira-a!

As carteiras estão atualmente listadas em:

- [ethereum.org/wallets/find-wallet/](/wallets/find-wallet/)

As carteiras estão mudando rapidamente no Ethereum. Tentamos criar uma estrutura justa para consideração no ethereum.org, mas os critérios de listagem mudarão e evoluirão com o tempo.

## A estrutura de decisão {#the-decision-framework}

### Critérios de inclusão: os requisitos obrigatórios {#the-must-haves}

- **Um produto testado em segurança** - seja por meio de auditoria, uma equipe de segurança interna, código de código aberto ou algum outro método, a segurança da sua carteira deve ser confiável. Isso reduz o risco para nossos usuários e nos mostra que você leva a segurança a sério.
- **Uma carteira que esteja “no ar” há mais de seis meses OU lançada por um grupo com um histórico respeitável** - esta é outra indicação de segurança. Seis meses é um bom período para que bugs críticos e explorações tenham sido encontrados. Pedimos seis meses para ajudar a filtrar forks que são rapidamente abandonados como projetos.
- **Trabalhada por uma equipe ativa** - isso ajuda a garantir a qualidade e que um usuário receberá suporte para suas dúvidas.
- **Informações de listagem honestas e precisas** - espera-se que quaisquer listagens sugeridas de projetos venham com informações honestas e precisas. Produtos que falsificam informações de listagem, como declarar que seu produto é de “código aberto” quando não é, serão removidos.
- **Ponto de contato** - Um ponto de contato para a carteira nos ajudará muito a obter informações precisas quando alterações forem feitas. Isso manterá a atualização do ethereum.org gerenciável ao reunir informações futuras.
- **Transações EIP-1559 (tipo 2)** - sua carteira deve suportar transações EIP-1559 (tipo 2) para transações na Mainnet do Ethereum.
- **Boa experiência do usuário** - Embora a UX seja subjetiva, se vários membros da equipe principal testarem o produto e acharem difícil de usar, nos reservamos o direito de rejeitar a carteira e, em vez disso, forneceremos sugestões úteis para melhorar. Isso é feito para proteger nossa base de usuários, que é composta principalmente por iniciantes.
- **Focada no Ethereum** - Uma carteira deve fornecer uma experiência primária focada no Ethereum. Isso significa que o Ethereum (ou qualquer camada 2 (l2)) é definido como a rede padrão, os ativos ERC são devidamente suportados e os recursos estão alinhados com o ecossistema Ethereum. Carteiras que priorizam na interface do usuário camadas 1 alternativas não serão listadas. 

### Remoções de produtos {#product-removals}

- **Informações atualizadas** - Os provedores de carteiras são responsáveis por reenviar as informações de suas carteiras a cada 6 meses para garantir a validade e a relevância das informações fornecidas (mesmo que não haja alterações em seu produto). Se a equipe do produto não o fizer, o ethereum.org poderá remover o projeto da página. 

### Outros critérios: os diferenciais desejáveis {#the-nice-to-haves}

- **Acessível globalmente** - sua carteira não tem limitações geográficas ou requisitos de KYC que excluam certas pessoas de acessar seu serviço.
- **Disponível em vários idiomas** - sua carteira é traduzida para vários idiomas, permitindo que usuários de todo o mundo a acessem.
- **Código aberto** - a base de código de todo o seu projeto (não apenas módulos) deve ser acessível e você deve aceitar PRs da comunidade em geral.
- **Não custodial** - os usuários controlam seus fundos. Se o seu produto desaparecer, os usuários ainda poderão acessar e mover seus fundos.
- **Suporte a carteira de hardware** - os usuários podem conectar sua carteira de hardware para assinar transações.
- **WalletConnect** - os usuários podem se conectar a aplicativos descentralizados (dapps) usando o WalletConnect.
- **Importação de endpoints RPC do Ethereum** - os usuários podem importar dados RPC de nó, permitindo que se conectem a um nó de sua escolha ou a outras redes compatíveis com EVM.
- **NFTs** - os usuários podem visualizar e interagir com seus NFTs na carteira.
- **Conexão a aplicativos Ethereum** - os usuários podem se conectar e usar aplicativos Ethereum.
- **Staking** - os usuários podem fazer stake diretamente pela carteira.
- **Trocas** - os usuários podem fazer a troca de tokens pela carteira.
- **Redes multichain** - sua carteira suporta que os usuários acessem várias redes blockchain por padrão.
- **Redes de camada 2** - sua carteira suporta que os usuários acessem redes de camada 2 (l2) por padrão.
- **Personalização de taxas de gás** - sua carteira permite que os usuários personalizem suas taxas de gás de transação (taxa básica, taxa de prioridade, taxa máxima).
- **Suporte a ENS** - sua carteira permite que os usuários enviem transações para nomes ENS.
- **Suporte a ERC-20** - sua carteira permite que os usuários importem contratos de token ERC-20 ou consulta e exibe automaticamente tokens ERC-20.
- **Comprar cripto** - sua carteira suporta que os usuários comprem e façam a integração diretamente com cripto.
- **Vender por moeda fiduciária** - sua carteira suporta que os usuários vendam e saquem para moeda fiduciária diretamente para um cartão ou conta bancária.
- **Multisig** - sua carteira suporta várias assinaturas para assinar uma transação.
- **Recuperação social** - sua carteira suporta guardiões e um usuário pode recuperar sua carteira se perder sua frase semente usando esses guardiões.
- **Equipe de suporte dedicada** - sua carteira tem uma equipe de suporte dedicada à qual os usuários podem recorrer quando tiverem problemas.
- **Recursos educacionais/documentação** - seu produto deve ter uma experiência de integração bem projetada para ajudar e educar os usuários. Ou evidências de conteúdo de instruções, como artigos ou vídeos.

## Adicionando uma carteira {#adding-a-wallet}

Se você quiser adicionar uma carteira ao ethereum.org, crie uma issue no GitHub.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml">
  Criar uma issue
</ButtonLink>

## Manutenção {#maintenance}

Como é a natureza fluida do Ethereum, equipes e produtos vêm e vão e a inovação acontece diariamente, portanto, realizaremos verificações de rotina de nosso conteúdo para:

- garantir que todas as carteiras e aplicativos descentralizados (dapps) listados ainda atendam aos nossos critérios
- verificar se não há produtos que foram sugeridos que atendam a mais de nossos critérios do que os listados atualmente

O ethereum.org é mantido pela comunidade de código aberto e contamos com a comunidade para ajudar a mantê-lo atualizado. Se você notar alguma informação sobre carteiras listadas que precise ser atualizada, por favor, [abra uma issue](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml) ou um [pull request](https://github.com/ethereum/ethereum-org-website/pulls)!


## Termos de uso {#terms-of-use}

Consulte também nossos [termos de uso](/terms-of-use/). As informações no ethereum.org são fornecidas exclusivamente para fins de informação geral.