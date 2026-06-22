---
title: Fui vítima de golpe ou perdi fundos
metaTitle: Ajuda e denúncia de golpes
description: O que fazer se você foi vítima de um golpe, como proteger seus ativos restantes e onde denunciar fraudes.
lang: pt-br
---

Golpes com criptomoedas têm como alvo pessoas de todos os níveis de experiência, incluindo profissionais de finanças e tecnologia. Você não está sozinho, e estar aqui é o primeiro passo certo.

<Alert variant="error">
<AlertEmoji text=":rotating_light:"/>
<AlertContent>
<AlertDescription>

**Ninguém pode reverter transações na blockchain.** Se alguém entrar em contato com você alegando que pode recuperar seus fundos mediante o pagamento de uma taxa, isso é quase certamente um segundo golpe. Veja [golpes de recuperação](#scam-types) abaixo.

</AlertDescription>
</AlertContent>
</Alert>

## Proteja seus ativos restantes {#secure-assets}

Se você interagiu com um golpista ou suspeita que sua carteira está comprometida, siga estes passos imediatamente:

1. **Mova os fundos restantes** para uma nova carteira segura à qual o golpista não tenha acesso
2. **Revogue as aprovações de token.** Os golpistas costumam enganar você para aprovar gastos ilimitados de tokens. Revogar essas permissões evita que sua carteira continue sendo esvaziada
3. **Altere as senhas** de quaisquer contas de corretoras (exchanges) que possam estar vinculadas
4. **Ative a autenticação de dois fatores (2FA)** em todas as contas relacionadas a cripto

### Como revogar aprovações de token {#revoke-approvals}

Quando você interage com um aplicativo descentralizado (dapp) ou contrato inteligente, pode ter concedido a ele permissão para gastar seus tokens. Se um golpista o enganou para aprovar um contrato malicioso, ele pode continuar esvaziando seus tokens mesmo após o golpe inicial.

Use estas ferramentas para verificar e revogar aprovações:

- [Revoke.cash](https://revoke.cash/): conecte sua carteira para ver todas as aprovações ativas e revogá-las
- [Revokescout](https://revoke.blockscout.com/): verifique e revogue aprovações via Blockscout
- [Etherscan Token Approval Checker](https://etherscan.io/tokenapprovalchecker): verifique e revogue aprovações via Etherscan

<DocLink href="/guides/how-to-revoke-token-access/">
  Guia passo a passo: Como revogar o acesso a tokens
</DocLink>

## Denuncie endereços e sites fraudulentos {#report}

Denunciar ajuda a alertar outros usuários e pode auxiliar nas investigações das autoridades policiais. Documente tudo: hashes de transação, endereços de carteira, capturas de tela e qualquer comunicação com o golpista.

### Denuncie um endereço fraudulento {#report-address}

- [Chainabuse](https://www.chainabuse.com/): banco de dados de denúncias de golpes e fraudes voltado para a comunidade. Envie denúncias e pesquise por endereços fraudulentos conhecidos
- [Denúncia no Etherscan](https://info.etherscan.com/report-address/): sinalize um endereço no explorador de blocos mais usado do Ethereum
- [CryptoScamDB](https://cryptoscamdb.org/): banco de dados de código aberto que rastreia golpes com criptomoedas

### Denuncie um site ou conta de rede social fraudulenta {#report-website}

- [PhishTank](https://phishtank.org/): envie e verifique URLs de phishing
- [Navegação Segura do Google](https://safebrowsing.google.com/safebrowsing/report_phish/): denuncie sites de phishing ao Google para que sejam bloqueados no Chrome e em outros navegadores
- [Netcraft](https://report.netcraft.com/report/mistake): denuncie sites maliciosos e fraudulentos
- Denuncie diretamente na plataforma de rede social onde o golpe ocorreu (Twitter/X, Discord e Telegram possuem recursos de denúncia)

### Denuncie às autoridades policiais {#report-law-enforcement}

- **Estados Unidos:** [Centro de Reclamações de Crimes na Internet do FBI (IC3)](https://www.ic3.gov/)
- **Reino Unido:** [Action Fraud](https://www.actionfraud.police.uk/)
- **União Europeia:** [Europol](https://www.europol.europa.eu/report-a-crime)
- **Outros países:** registre um boletim de ocorrência na polícia local. A fraude com criptomoedas é um crime na maioria das jurisdições

## Analise o que aconteceu {#analyze}

Entender para onde seus fundos foram pode ajudar nas denúncias e pode apoiar os esforços de recuperação se os fundos chegarem a uma corretora centralizada.

- [Blockscout](https://eth.blockscout.com/): explorador de blocos de código aberto para pesquisar qualquer hash da transação ou endereço de carteira para ver para onde os fundos foram enviados
- [Etherscan](https://etherscan.io/): pesquise qualquer hash da transação ou endereço de carteira para ver para onde os fundos foram enviados
- [Pesquisa no Chainabuse](https://www.chainabuse.com/): verifique se um endereço já foi denunciado por outras vítimas
- [MetaSleuth](https://metasleuth.io/) da BlockSec: ferramenta visual de rastreamento de transações que mapeia os fluxos de fundos

**Se os fundos foram enviados para uma corretora centralizada** (como Coinbase, Binance, Kraken), entre em contato com a equipe de suporte deles imediatamente com os detalhes da transação. As corretoras às vezes podem congelar contas sinalizadas por fraude.

## A dura verdade {#hard-truth}

Como o Ethereum é descentralizado, nenhuma autoridade central pode reverter transações ou recuperar fundos roubados. Uma vez que uma transação é confirmada na blockchain, ela é definitiva.

Denunciar ainda é valioso. As denúncias ajudam as autoridades policiais a rastrear quadrilhas organizadas de fraude, e sinalizar endereços no Chainabuse e no Etherscan alerta futuras vítimas em potencial.

## Tipos de golpes para ficar atento {#scam-types}

<ExpandableCard
title="Golpes de distribuição gratuita e airdrops"
contentPreview="Ninguém está distribuindo ETH de graça. Essas ofertas são sempre golpes."
eventCategory="SupportScamPage"
eventName="clicked giveaway scam"
>

Os golpistas criam falsos sorteios (giveaways) prometendo multiplicar seu ETH ou dar tokens gratuitos. Eles frequentemente se passam por figuras conhecidas como Vitalik Buterin. Se você enviar ETH para um endereço de "sorteio", não receberá nada de volta.

**Lembre-se:** Vitalik e outras figuras proeminentes nunca pedirão que você envie ETH para eles.

[Mais sobre golpes comuns](/security/#common-scams)

</ExpandableCard>

<ExpandableCard
title="Falsificação de identidade e suporte falso"
contentPreview="Ninguém do Ethereum ou do ethereum.org entrará em contato com você primeiro."
eventCategory="SupportScamPage"
eventName="clicked impersonation scam"
>

Os golpistas se passam por membros da equipe do Ethereum, moderadores ou agentes de suporte no Discord, Telegram e nas redes sociais. Eles podem enviar mensagens diretas oferecendo ajuda ou alegando que há um problema com sua conta.

**Lembre-se:**

- Não existe uma "equipe de suporte do Ethereum"
- Moderadores reais nunca enviarão uma mensagem direta (DM) para você primeiro
- Nunca compartilhe sua frase semente ou chaves privadas com ninguém, por nenhum motivo
- Nunca clique em links enviados em mensagens não solicitadas

</ExpandableCard>

<ExpandableCard
title="Golpes de recuperação"
contentPreview="Depois de cair em um golpe, cuidado com falsos 'especialistas em recuperação de cripto'."
eventCategory="SupportScamPage"
eventName="clicked recovery scam"
>

Os golpes de recuperação têm como alvo específico pessoas que já perderam fundos. Os golpistas monitoram as redes sociais em busca de pessoas falando sobre terem sido vítimas de golpes e, em seguida, entram em contato se passando por "investigadores de blockchain" ou "especialistas em recuperação de cripto".

Eles prometem rastrear e recuperar suas criptomoedas roubadas mediante uma taxa antecipada. Depois que você paga, eles desaparecem.

**Nenhum serviço legítimo pode reverter transações na blockchain.** Qualquer pessoa que prometa isso está mentindo. Este é um dos golpes subsequentes mais comuns.

</ExpandableCard>

<ExpandableCard
title="Sites de phishing e aplicativos falsos"
contentPreview="Sites fraudulentos imitam carteiras e corretoras reais para roubar suas credenciais."
eventCategory="SupportScamPage"
eventName="clicked phishing scam"
>

Sites de phishing parecem idênticos a aplicativos de carteira reais, corretoras ou plataformas de finanças descentralizadas (DeFi). Eles enganam você para inserir sua frase semente ou conectar sua carteira e, em seguida, esvaziam seus fundos.

**Proteja-se:**

- Sempre verifique a URL antes de conectar sua carteira
- Adicione aos favoritos os sites oficiais que você usa regularmente
- Nunca insira sua frase semente em nenhum site. Aplicativos legítimos nunca pedem por ela
- Use o [PhishTank](https://phishtank.org/) para verificar URLs suspeitas

<DocLink href="/guides/how-to-id-scam-tokens/">
  Como identificar tokens fraudulentos
</DocLink>

</ExpandableCard>

<DocLink href="/security/">
  Guia completo sobre segurança no Ethereum e prevenção de golpes
</DocLink>
