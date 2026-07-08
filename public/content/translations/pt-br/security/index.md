---
title: Segurança no Ethereum e prevenção de golpes
description: Mantendo-se seguro no Ethereum
lang: pt-br
---

O crescente interesse em criptomoedas traz consigo um risco cada vez maior de golpistas e hackers. Este artigo apresenta algumas práticas recomendadas para mitigar esses riscos.

**Lembre-se: Ninguém do ethereum.org entrará em contato com você. Não responda a e-mails dizendo que são do suporte oficial do Ethereum.**

<Divider />

## Noções básicas de segurança cripto {#crypto-security}

### Aprimore seu conhecimento {#level-up-your-knowledge}

Mal-entendidos sobre como a cripto funciona podem levar a erros custosos. Por exemplo, se alguém finge ser um agente de atendimento ao cliente que pode devolver ETH perdido em troca de suas chaves privadas, eles estão se aproveitando de pessoas que não entendem que o [Ethereum](/) é uma rede descentralizada que não possui esse tipo de funcionalidade. Educar-se sobre como o Ethereum funciona é um investimento que vale a pena.

<DocLink href="/what-is-ethereum/">
  O que é Ethereum?
</DocLink>

<DocLink href="/what-is-ether/">
  O que é ether?
</DocLink>
<Divider />

## Segurança da carteira {#wallet-security}

### Nunca compartilhe sua frase de recuperação {#protect-private-keys}

**Nunca, por motivo algum, compartilhe sua frase de recuperação ou chaves privadas!**

Sua frase de recuperação (também chamada de frase de recuperação secreta ou frase semente) é a chave mestra da sua carteira. Qualquer pessoa que a possua pode acessar todas as suas contas e esvaziar todos os ativos. As chaves privadas funcionam da mesma maneira para contas individuais. Nenhum serviço legítimo, agente de suporte ou site jamais pedirá isso a você.

<DocLink href="/wallets/">
  O que é uma carteira Ethereum?
</DocLink>

#### Não tire capturas de tela de suas frases semente/chaves privadas {#screenshot-private-keys}

Tirar capturas de tela de suas frases semente ou chaves privadas pode sincronizá-las com um provedor de dados em nuvem, o que pode torná-las acessíveis a hackers. Obter chaves privadas da nuvem é um vetor de ataque comum para hackers.

### Use uma carteira de hardware {#use-hardware-wallet}

Uma carteira de hardware fornece armazenamento offline para chaves privadas. Elas são consideradas a opção de carteira mais segura para armazenar suas chaves privadas: sua chave privada nunca toca a internet e permanece completamente local no seu dispositivo.

Manter as chaves privadas offline reduz massivamente o risco de ser hackeado, mesmo que um hacker assuma o controle do seu computador.

#### Experimente uma carteira de hardware: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Verifique as transações duas vezes antes de enviar {#double-check-transactions}

Enviar cripto acidentalmente para o endereço de carteira errado é um erro comum. **Uma transação enviada no Ethereum é irreversível.** A menos que você conheça o proprietário do endereço e consiga convencê-lo a devolver seus fundos, você não conseguirá recuperá-los.

Certifique-se sempre de que o endereço para o qual você está enviando corresponde exatamente ao endereço do destinatário desejado antes de enviar uma transação.
É uma boa prática, ao interagir com um contrato inteligente, ler a mensagem da transação antes da assinatura.

### Defina limites de gastos para contratos inteligentes {#spend-limits}

Ao interagir com contratos inteligentes, não permita limites de gastos ilimitados. Um gasto ilimitado pode permitir que o contrato inteligente esvazie sua carteira. Em vez disso, defina limites de gastos apenas para o valor necessário para a transação.

Muitas carteiras Ethereum oferecem proteção de limites para proteger contra o esvaziamento de contas.

[Como revogar o acesso de contratos inteligentes aos seus fundos cripto](/guides/how-to-revoke-token-access/)

<Divider />

## Golpes comuns {#common-scams}

É impossível deter os golpistas completamente, mas podemos torná-los menos eficazes estando cientes de suas técnicas mais usadas. Existem muitas variações desses golpes, mas eles geralmente seguem os mesmos padrões de alto nível. Se não lembrar de mais nada, lembre-se:

- seja sempre cético
- ninguém vai lhe dar ETH de graça ou com desconto
- ninguém precisa de acesso às suas chaves privadas ou informações pessoais

### Phishing de anúncios no Twitter {#ad-phishing}

![Twitter link phishing](./twitterPhishingScam.png)

Existe um método para falsificar o recurso de visualização de links do Twitter (também conhecido como X) para potencialmente enganar os usuários, fazendo-os pensar que estão visitando um site legítimo. Essa técnica explora o mecanismo do Twitter para gerar visualizações de URLs compartilhados em tweets e mostra _from ethereum.org_ por exemplo (mostrado acima), quando na verdade eles estão sendo redirecionados para um site malicioso.

Verifique sempre se você está no domínio certo, especialmente depois de clicar em um link.

[Mais informações aqui](https://harrydenley.com/faking-twitter-unfurling).

### Golpe de distribuição gratuita (Giveaway) {#giveaway}

Um dos golpes mais comuns em criptomoedas é o golpe de distribuição gratuita (giveaway). O golpe de distribuição gratuita pode assumir muitas formas, mas a ideia geral é que, se você enviar ETH para o endereço de carteira fornecido, receberá seu ETH de volta, mas em dobro. *Por esse motivo, também é conhecido como o golpe 2 por 1.*

Esses golpes geralmente estipulam um tempo limitado de oportunidade para reivindicar a distribuição gratuita para criar um falso senso de urgência.

### Hacks de mídias sociais {#social-media-hacks}

Uma versão de grande repercussão disso ocorreu em julho de 2020, quando as contas do Twitter de celebridades e organizações proeminentes foram hackeadas. O hacker postou simultaneamente uma distribuição gratuita de Bitcoin nas contas hackeadas. Embora os tweets enganosos tenham sido rapidamente notados e excluídos, os hackers ainda conseguiram escapar com 11 bitcoins (ou US$ 500.000 em setembro de 2021).

![A scam on Twitter](./appleTwitterScam.png)

### Distribuição gratuita de celebridades {#celebrity-giveaway}

A distribuição gratuita de celebridades é outra forma comum que o golpe de distribuição gratuita assume. Os golpistas pegam uma entrevista em vídeo gravada ou uma palestra em conferência dada por uma celebridade e a transmitem ao vivo no YouTube - fazendo parecer que a celebridade estava dando uma entrevista em vídeo ao vivo endossando uma distribuição gratuita de criptomoeda.

Vitalik Buterin é usado com mais frequência neste golpe, mas muitas outras pessoas proeminentes envolvidas em cripto também são usadas (por exemplo, Elon Musk ou Charles Hoskinson). Incluir uma pessoa conhecida dá à transmissão ao vivo dos golpistas um senso de legitimidade (isso parece suspeito, mas Vitalik está envolvido, então deve estar tudo bem!).

**Distribuições gratuitas são sempre golpes. Se você enviar seus fundos para essas contas, você os perderá para sempre.**

![A scam on YouTube](./youtubeScam.png)

### Golpes de suporte {#support-scams}

A criptomoeda é uma tecnologia relativamente jovem e mal compreendida. Um golpe comum que se aproveita disso é o golpe de suporte, onde os golpistas se passam por pessoal de suporte de carteiras, corretoras ou blockchains populares.

Grande parte da discussão sobre o Ethereum acontece no Discord. Os golpistas de suporte geralmente encontram seu alvo pesquisando perguntas de suporte em canais públicos do Discord e, em seguida, enviando ao inquiridor uma mensagem privada oferecendo suporte. Ao construir confiança, os golpistas de suporte tentam enganá-lo para que revele suas chaves privadas ou envie seus fundos para as carteiras deles.

![A support scam on Discord](./discordScam.png)

Como regra geral, a equipe nunca se comunicará com você por meio de canais privados e não oficiais. Algumas coisas simples a ter em mente ao lidar com o suporte:

- Nunca compartilhe suas chaves privadas, frases semente ou senhas
- Nunca permita que ninguém tenha acesso remoto ao seu computador
- Nunca se comunique fora dos canais designados de uma organização

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    Cuidado: embora golpes no estilo de suporte aconteçam comumente no Discord, eles também podem ser predominantes em quaisquer aplicativos de bate-papo onde ocorrem discussões sobre cripto, incluindo e-mail.
</AlertDescription>
</AlertContent>
</Alert>

### Golpe do token 'Eth2' {#eth2-token-scam}

No período que antecedeu o [The Merge](/roadmap/merge/), os golpistas se aproveitaram da confusão em torno do termo 'Eth2' para tentar fazer com que os usuários resgatassem seu ETH por um token 'ETH2'. Não existe 'ETH2' e nenhum outro token legítimo foi introduzido com o The Merge. O ETH que você possuía antes do The Merge é o mesmo ETH agora. **Não há necessidade de tomar nenhuma ação relacionada ao seu ETH para contabilizar a mudança da Prova de Trabalho (PoW) para a Prova de Participação (PoS)**.

Os golpistas podem aparecer como "suporte", dizendo que se você depositar seu ETH, receberá de volta 'ETH2'. Não há [suporte oficial do Ethereum](/community/support/) e não há nenhum token novo. Nunca compartilhe a frase semente da sua carteira com ninguém.

_Nota: Existem tokens/tickers derivativos que podem representar ETH em staking (ou seja, rETH da Rocket Pool, stETH da Lido, ETH2 da Coinbase), mas não são algo para o qual você precise "migrar"._

### Golpes de phishing {#phishing-scams}

Os golpes de phishing são outro ângulo cada vez mais comum que os golpistas usarão para tentar roubar os fundos da sua carteira.

Alguns e-mails de phishing pedem aos usuários que cliquem em links que os redirecionarão para sites de imitação, pedindo que insiram sua frase semente, redefinam sua senha ou enviem ETH. Outros podem pedir que você instale malware sem saber para infectar seu computador e dar aos golpistas acesso aos arquivos do seu computador.

Se você receber um e-mail de um remetente desconhecido, lembre-se:

- Nunca abra um link ou anexo de endereços de e-mail que você não reconhece
- Nunca divulgue suas informações pessoais ou senhas a ninguém
- Exclua e-mails de remetentes desconhecidos

[Mais sobre como evitar golpes de phishing](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Golpes de corretoras de negociação de cripto {#broker-scams}

Corretoras de negociação de cripto fraudulentas afirmam ser corretoras especializadas em criptomoedas que se oferecerão para pegar seu dinheiro e investir em seu nome. Depois que o golpista recebe seus fundos, ele pode enganá-lo, pedindo que você envie mais fundos, para que não perca mais ganhos de investimento, ou pode desaparecer completamente.

Esses fraudadores geralmente encontram alvos usando contas falsas no YouTube para iniciar conversas aparentemente naturais sobre a 'corretora'. Essas conversas costumam receber muitos votos positivos para aumentar a legitimidade, mas os votos positivos são todos de contas de bots.

**Não confie em estranhos da internet para investir em seu nome. Você perderá sua cripto.**

![A trading broker scam on YouTube](./brokerScam.png)

### Golpes de pools de mineração de cripto {#mining-pool-scams}

A partir de setembro de 2022, a mineração no Ethereum não é mais possível. No entanto, os golpes de pools de mineração ainda existem. Os golpes de pools de mineração envolvem pessoas entrando em contato com você de forma não solicitada e alegando que você pode obter grandes retornos ao ingressar em um pool de mineração do Ethereum. O golpista fará alegações e manterá contato com você pelo tempo que for necessário. Essencialmente, o golpista tentará convencê-lo de que, ao ingressar em um pool de mineração do Ethereum, sua criptomoeda será usada para criar ETH e que você receberá dividendos em ETH. Você verá então que sua criptomoeda está gerando pequenos retornos. Isso é simplesmente para atraí-lo a investir mais. Eventualmente, todos os seus fundos serão enviados para um endereço desconhecido, e o golpista desaparecerá ou, em alguns casos, continuará a manter contato, como aconteceu em um caso recente.

Conclusão: desconfie de pessoas que entram em contato com você nas redes sociais pedindo para você fazer parte de um pool de mineração. Depois de perder sua cripto, ela se foi.

Algumas coisas a lembrar:

- Desconfie de qualquer pessoa que entre em contato com você sobre maneiras de ganhar dinheiro com sua cripto
- Faça sua pesquisa sobre staking, pools de liquidez ou outras formas de investir sua cripto
- Raramente, ou nunca, tais esquemas são legítimos. Se fossem, provavelmente seriam populares e você já teria ouvido falar deles.

[Homem perde US$ 200 mil em golpe de pool de mineração](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Golpes de airdrop {#airdrop-scams}

Os golpes de airdrop envolvem um projeto fraudulento fazendo o airdrop de um ativo (NFT, token) em sua carteira e enviando você a um site fraudulento para reivindicar o ativo do airdrop. Você será solicitado a fazer login com sua carteira Ethereum e "aprovar" uma transação ao tentar reivindicar. Essa transação compromete sua conta enviando suas chaves públicas e privadas para o golpista. Uma forma alternativa desse golpe pode fazer com que você confirme uma transação que envia fundos para a conta do golpista.

[Mais sobre golpes de airdrop](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Noções básicas de segurança na web {#web-security}

### Use senhas fortes {#use-strong-passwords}

[Mais de 80% dos hacks de contas são resultado de senhas fracas ou roubadas](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Uma longa combinação de caracteres, números e símbolos ajudará a manter suas contas seguras.

Um erro comum é usar uma combinação de algumas palavras comuns e relacionadas. Senhas como essa são inseguras porque são propensas a uma técnica de hacking chamada ataque de dicionário.

```md
Exemplo de uma senha fraca: GatinhosFofosEfelpudos!

Exemplo de uma senha forte: ymv\*azu.EAC8eyp8umf
```

Outro erro comum é usar senhas que podem ser facilmente adivinhadas ou descobertas por meio de [engenharia social](<https://wikipedia.org/wiki/Social_engineering_(security)>). Incluir o nome de solteira da sua mãe, os nomes dos seus filhos ou animais de estimação, ou datas de nascimento na sua senha aumentará o risco de ser hackeado.

#### Boas práticas de senha: {#good-password-practices}

- Torne as senhas o mais longas possível, conforme permitido pelo seu gerador de senhas ou pelo formulário que você está preenchendo
- Use uma mistura de letras maiúsculas, minúsculas, números e símbolos
- Não use detalhes pessoais, como nomes de família, em sua senha
- Evite palavras comuns

[Mais sobre como criar senhas fortes](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Use senhas exclusivas para tudo {#use-unique-passwords}

Uma senha forte que foi revelada em uma violação de dados não é mais uma senha forte. O site [Have I Been Pwned](https://haveibeenpwned.com) permite que você verifique se suas contas estiveram envolvidas em alguma violação de dados públicos. Se estiveram, **altere essas senhas imediatamente**. Usar senhas exclusivas para cada conta diminui o risco de hackers obterem acesso a todas as suas contas se uma de suas senhas for comprometida.

### Use um gerenciador de senhas {#use-password-manager}

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
    Usar um gerenciador de senhas cuida da criação de senhas fortes e exclusivas e de lembrá-las! Nós <strong>fortemente</strong> recomendamos o uso de um, e a maioria deles é gratuita!
</AlertDescription>
</AlertContent>
</Alert>

Lembrar senhas fortes e exclusivas para cada conta que você possui não é o ideal. Um gerenciador de senhas oferece um armazenamento seguro e criptografado para todas as suas senhas, que você pode acessar por meio de uma senha mestra forte. Eles também sugerem senhas fortes ao se inscrever em um novo serviço, para que você não precise criar a sua própria. Muitos gerenciadores de senhas também informarão se você esteve envolvido em uma violação de dados, permitindo que você altere as senhas antes de quaisquer ataques maliciosos.

![Example of using a password manager](./passwordManager.png)

#### Experimente um gerenciador de senhas: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- Ou confira outros [gerenciadores de senhas recomendados](https://www.privacytools.io/secure-password-manager)

### Use a Autenticação de Dois Fatores {#two-factor-authentication}

Às vezes, pode ser solicitado que você autentique sua identidade por meio de provas exclusivas. Estas são conhecidas como **fatores**. Os três fatores principais são:

- Algo que você sabe (como uma senha ou pergunta de segurança)
- Algo que você é (como uma impressão digital ou scanner de íris/facial)
- Algo que você possui (uma chave de segurança ou aplicativo de autenticação no seu telefone)

O uso da **Autenticação de Dois Fatores (2FA)** fornece um *fator de segurança* adicional para suas contas online. A 2FA garante que apenas ter sua senha não seja suficiente para acessar uma conta. Mais comumente, o segundo fator é um código aleatório de 6 dígitos, conhecido como **senha de uso único baseada em tempo (TOTP)**, que você pode acessar por meio de um aplicativo autenticador, como o Google Authenticator ou o Authy. Eles funcionam como um fator "algo que você possui" porque a semente que gera o código cronometrado é armazenada no seu dispositivo.

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    Nota: O uso de 2FA baseado em SMS é suscetível a <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">clonagem de SIM (SIM jacking)</a> e não é seguro. Para a melhor segurança, use um serviço como o <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> ou o <a href="https://authy.com/">Authy</a>.
</AlertDescription>
</AlertContent>
</Alert>

#### Chaves de segurança {#security-keys}

Uma chave de segurança é um tipo mais avançado e seguro de 2FA. As chaves de segurança são dispositivos físicos de autenticação de hardware que funcionam como aplicativos autenticadores. Usar uma chave de segurança é a maneira mais segura de fazer 2FA. Muitas dessas chaves utilizam o padrão FIDO Universal 2nd Factor (U2F). [Saiba mais sobre o FIDO U2F](https://www.yubico.com/resources/glossary/fido-u2f/).

Assista mais sobre 2FA:

<VideoWatch slug="crypto-security-passwords" startTime="3479" />

### Desinstale extensões do navegador {#uninstall-browser-extensions}

Extensões de navegador, como extensões do Chrome ou complementos para o Firefox, podem melhorar a funcionalidade do navegador, mas também trazem riscos. Por padrão, a maioria das extensões de navegador solicita acesso para 'ler e alterar os dados do site', permitindo que façam quase qualquer coisa com seus dados. As extensões do Chrome são sempre atualizadas automaticamente, portanto, uma extensão anteriormente segura pode ser atualizada posteriormente para incluir código malicioso. A maioria das extensões de navegador não está tentando roubar seus dados, mas você deve estar ciente de que elas podem.

#### Mantenha-se seguro ao: {#browser-extension-safety}

- Instalar extensões de navegador apenas de fontes confiáveis
- Remover extensões de navegador não utilizadas
- Instalar extensões do Chrome localmente para interromper a atualização automática (Avançado)

[Mais sobre os riscos das extensões de navegador](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Leitura adicional {#further-reading}

### Segurança na web {#reading-web-security}

- [Até 3 milhões de dispositivos infectados por complementos do Chrome e Edge com malware](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [Como criar uma senha forte — que você não esquecerá](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [O que é uma chave de segurança?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### Segurança cripto {#reading-crypto-security}

- [Protegendo a si mesmo e aos seus fundos](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [Problemas de segurança em softwares comuns de comunicação cripto](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) - _Salus_
- [Guia de segurança para leigos e pessoas inteligentes também](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Segurança cripto: senhas e autenticação](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### Educação sobre golpes {#reading-scam-education}

- [Guia: Como identificar tokens fraudulentos](/guides/how-to-id-scam-tokens/)
- [Mantendo-se seguro: golpes comuns](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Evitando golpes](https://bitcoin.org/en/scams) - _Bitcoin.org_
- [Thread do Twitter sobre e-mails e mensagens comuns de phishing cripto](https://twitter.com/tayvano_/status/1516225457640787969) - _Taylor Monahan_

<QuizWidget quizKey="security" />