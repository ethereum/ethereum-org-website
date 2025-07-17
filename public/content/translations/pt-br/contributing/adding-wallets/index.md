---
title: Adicionando carteiras
description: A política que usamos ao adicionar uma carteira ao ethereum.org
lang: pt-br
---

# Adicionando carteiras {#adding-wallets}

Queremos ter certeza de que mostramos uma variedade de carteiras abrangendo a ampla gama de recursos disponíveis para que os usuários possam navegar no Ethereum com confiança.

Qualquer pessoa pode sugerir a adição de uma carteira no ethereum.org. Se houver alguma carteira que tenhamos deixado passar, recomende-a para nós!

As carteiras atualmente listadas estão em:

- [ethereum.org/pt-br/wallets/find-wallet/](/wallets/find-wallet/)

As carteiras estão mudando rapidamente no Ethereum. Tentamos criar uma estrutura justa a ser considerada no ethereum.org, mas os critérios listados mudarão e evoluirão com o tempo.

## A estrutura de decisão {#the-decision-framework}

### Critérios para inclusão: os obrigatórios {#the-must-haves}

- **Um produto com segurança testada** — seja por meio de auditoria, equipe interna de segurança, codificação de código aberto ou algum outro método — a segurança de sua carteira deve ser confiável. Isso reduz o risco para nossos usuários e demonstra que você leva a segurança a sério.
- **Uma carteira que esteja em "atividade" há mais de seis meses OU que tenha sido lançada por um grupo com um histórico de reputação** representa mais uma indicação de segurança. Seis meses é um bom período de tempo para que bugs críticos e explorações tenham sido encontrados. Pedimos seis meses para ajudar a filtrar bifurcações (forks) que são rapidamente abandonados como projetos.
- **Trabalhado por uma equipe ativa** — isso ajuda a garantir a qualidade e que um usuário receba suporte para suas consultas.
- **Informações de listagem corretas e precisas** — espera-se que todas as listagens sugeridas de projetos venham com informações precisas e íntegras. Produtos que falsificam informações de listagem, como declarar que seu produto é de "código aberto" quando não é, serão removidos.
- **Ponto de contato** — Um ponto de contato para a carteira nos ajudará muito a obter informações precisas quando houver mudanças. Isso manterá a atualização do ethereum.org gerenciável ao reunir informações futuras.
- **Transações EIP-1559 (tipo 2)** - sua carteira precisa estar habilitada para transações EIP-1559 (tipo 2) para fazer transações na rede principal do Ethereum.
- **Boa experiência de usuário** - Mesmo que a experiência do usuário seja subjetiva, se vários membros da equipe principal testarem o produto e encontrarem dificuldade em utilizá-lo, nos reservaremos o direito de recusar a carteira e, em vez disso, fornecer sugestões úteis para melhorá-la. Isso é feito para proteger nossa base de usuários, formada principalmente de iniciantes.

### Remoções de produto {#product-removals}

- **Informação atualizada** - fornecedores de carteira são responsáveis por reenviar a informação sobre suas carteiras a cada 6 meses para assegurar a validade e relevância da informação fornecida (mesmo que não haja mudanças em seus produtos). Se a equipe de produtos não fizer isso, então ethereum.org poderá remover o projeto da página.

### Outros critérios: o que é importante ter {#the-nice-to-haves}

- **Globalmente acessível** — sua carteira não possui limitações geográficas ou requisitos de KYC que excluam certas pessoas de acessar seu serviço.
- **Disponível em vários idiomas** — sua carteira é traduzida em vários idiomas, permitindo que usuários ao redor do mundo a acessem.
- **Código aberto** — todo o código de sua projeto (não apenas módulos) deve ser acessível e você deve aceitar as PRs da comunidade em geral.
- **Sem custódia** — os usuários controlam seus fundos. Se o seu produto desaparecer, os usuários ainda poderão acessar e movimentar seus fundos.
- **Suporte à carteira de hardware** — os usuários podem conectar sua carteira de hardware para assinar transações.
- **WalletConnect** — os usuários podem se conectar a dapps usando o WalletConnect.
- **Importação de endpoints Ethereum RPC** — os usuários podem importar dados do RPC do nó, permitindo que se conectem a um nó de sua escolha ou a outras redes compatíveis com o EVM.
- **NFTs** — os usuários podem visualizar e interagir com seus NFTs na carteira.
- **Conectar-se a aplicativos do Ethereum** — os usuários podem se conectar e usar aplicativos do Ethereum.
- **Staking (Participações)** — os usuários podem participar (fazer staking) diretamente pela carteira.
- **Swaps (Trocas)** — os usuários podem trocar tokens pela carteira.
- **Redes Multicadeias** — sua carteira oferece suporte ao acesso de usuários a várias redes de blockchain por padrão.
- **Redes de Camada 2** — sua carteira oferece suporte ao acesso de usuários a redes de camada 2 por padrão.
- **Personalizar taxas de gás** — sua carteira permite que os usuários personalizem as taxas de gás de suas transações (taxa base, taxa prioritária, taxa máxima).
- **Suporte ENS** — sua carteira permite que os usuários enviem transações para nomes ENS.
- **Suporte a ERC-20** — sua carteira permite que os usuários importem contratos de tokens ERC-20 ou exibe automaticamente os tokens ERC-20.
- **Compre criptomoedas** — sua carteira suporta a compra direta de criptomoedas e a introdução de usuários a criptomoedas.
- **Venda para valor legal** — sua carteira dá suporte a usuários que vendam e saquem em valor legal diretamente para cartão ou conta bancária.
- **Multisig** — sua carteira suporta várias assinaturas para assinar uma transação.
- **Recuperação social** — sua carteira oferece suporte a guardiões e um usuário pode recuperar sua carteira se perder sua frase de recuperação usando esses guardiões.
- **Equipe de suporte dedicada** — sua carteira possui uma equipe de suporte dedicada à qual os usuários podem recorrer em caso de problemas.
- **Recursos de educação/documentação** — seu produto deve ter uma experiência de incorporação bem projetada para ajudar e educar os usuários. Ou então, oferecer conteúdo prático como artigos e vídeos.

## Adicionando uma carteira {#adding-a-wallet}

Se você deseja adicionar uma carteira ao ethereum.org, crie um tíquete no GitHub.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml">
  Criar tíquete
</ButtonLink>

## Manutenção {#maintenance}

O Ethereum é fluido por natureza, por isso, suas equipes e produtos vêm e vão, com inovações ocorrendo diariamente. Por isso, realizaremos verificações de rotina de nosso conteúdo para:

- garantir que todas as carteiras e dapps listados ainda atendam aos nossos critérios
- verificar se não há produtos sugeridos que atendam mais aos nossos critérios do que os atualmente listados

ethereum.org é mantida pela comunidade de código aberto; nós confiamos na comunidade para ajudar a mantê-la atualizada. Se você notar que alguma informação sobre as carteiras listadas precisa ser atualizada, [abra um tíquete](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml) ou uma [solicitação de pull](https://github.com/ethereum/ethereum-org-website/pulls)!


## Termos de uso {#terms-of-use}

Consulte também nossos [termos de uso](/terms-of-use/). Informações sobre o ethereum.org são fornecidas exclusivamente para fins de informação geral.
