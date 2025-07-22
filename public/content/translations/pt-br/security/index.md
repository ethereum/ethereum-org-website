---
title: Segurança e prevenção de fraude do Ethereum
description: Como manter a segurança no Ethereum
lang: pt-br
---

# Segurança e prevenção de fraude do Ethereum {#introduction}

O crescente interesse em criptomoedas traz consigo um risco crescente de golpistas e hackers. Este artigo apresenta algumas práticas recomendadas para mitigar esses riscos.

**Lembre-se: Ninguém da ethereum.org jamais entrará em contato com você. Não responda a e-mails que afirmem ser do suporte oficial da Ethereum.**

<Divider />

## Noções básicas sobre segurança de criptomoedas {#crypto-security}

### Aumente o seu nível de conhecimento {#level-up-your-knowledge}

Uma má compreensão de como as criptomoedas funcionam pode levar a erros caros. Por exemplo, se alguém finge ser um agente de atendimento ao cliente que pode devolver ETH perdido em troca de suas chaves privadas, ele está se aproveitando de pessoas que não entendem que o Ethereum é uma rede descentralizada que não possui esse tipo de funcionalidade. Educar-se sobre como o Ethereum funciona é um investimento valioso.

<DocLink href="/what-is-ethereum/">
  O que é Ethereum?
</DocLink>

<DocLink href="/eth/">
  O que é ether?
</DocLink>
<Divider />

## Segurança da carteira {#wallet-security}

### Não divulgue suas chaves privadas {#protect-private-keys}

**Nunca, em hipótese alguma, compartilhe suas chaves privadas!**

A chave privada para sua carteira é também uma senha para sua carteira Ethereum. É a única coisa que impede que alguém que conheça o endereço de sua carteira drene todos os ativos da sua conta!

<DocLink href="/wallets/">
  O que é uma carteira Ethereum?
</DocLink>

#### Não faça capturas de tela das suas frases de recuperação/chaves privadas {#screenshot-private-keys}

Fazer uma captura de tela de suas frases de recuperação ou chaves privadas pode sincronizá-las com um provedor de dados em nuvem, o que pode torná-las acessíveis a hackers. Obter as chaves privadas da nuvem é um vetor de ataque comum para os hackers.

### Use uma carteira de hardware {#use-hardware-wallet}

Uma carteira de hardware fornece armazenamento off-line para chaves privadas. Elas são consideradas a opção de carteira mais segura para armazenar suas chaves privadas, pois elas nunca entram em contato com a Internet e permanecem completamente locais em seu dispositivo.

Manter chaves privadas off-line reduz maciçamente o risco de serem hackeadas, mesmo que um hacker tenha controle de seu computador.

#### Experimente uma carteira de hardware: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Verifique duas vezes as transações antes de enviar {#double-check-transactions}

Enviar criptomoedas acidentalmente para um endereço de carteira errado é um erro comum. **Uma transação enviada no Ethereum é irreversível.** A menos que você conheça o proprietário do endereço e consiga convencê-lo a enviar o dinheiro de volta, você não será capaz de reaver seus fundos.

Certifique-se sempre de que o endereço de destino corresponde exatamente ao endereço do destinatário desejado antes de enviar uma transação. Ler a mensagem da transação antes de assiná-la é uma prática recomendada quando interagir com um contrato inteligente.

### Defina limites de gastos para contratos inteligentes {#spend-limits}

Ao interagir com contratos inteligentes, não permita limites de gastos ilimitados. Uma despesa ilimitada poderia permitir que o contrato inteligente drenasse a sua carteira. Em vez disso, defina limites de gastos apenas na quantidade necessária para a transação.

Muitas carteiras Ethereum oferecem proteção de limites para evitar que as contas sejam drenadas.

[Como revogar o acesso ao contrato inteligente aos seus fundos cripto](/guides/how-to-revoke-token-access/)

<Divider />

## Fraudes comuns {#common-scams}

É impossível deter os fraudadores por completo, mas é possível fazer com que eles sejam menos eficazes ao conhecer as técnicas mais usadas deles. Existem muitas variações dessas fraudes, mas elas geralmente seguem os mesmos padrões de alto nível. Em todo caso, lembre-se:

- sempre seja cético
- Ninguém vai te dar ETH de graça ou com desconto
- ninguém precisa acessar suas chaves privadas ou informações pessoais

### Phishing via anúncio no Twitter {#ad-phishing}

![Phishing via link no Twitter](./twitterPhishingScam.png)

Há um método para falsificar o recurso de pré-visualização de links (desenrolar) do Twitter (também conhecido como X) para potencialmente enganar os usuários, fazendo-os pensar que estão acessando um site verdadeiro. Esta técnica explora o mecanismo do Twitter para gerar pré-visualizações de URLs compartilhados em tweets e mostra _de ethereum.org_, por exemplo (mostrado acima), quando na verdade eles estão sendo redirecionados para um site malicioso.

Sempre verifique que você está no domínio correto, especialmente depois de clicar em um link.

[Mais informações aqui](https://harrydenley.com/faking-twitter-unfurling).

### Golpe de doação {#giveaway}

Uma das fraudes mais comuns com criptomoedas é o golpe de sorteio. O golpe de sorteio pode ter várias formas. Mas a ideia geral é que se você enviar ETH para um endereço de carteira oferecido, receberá o dobro dos ETH que enviou. *Por esta razão, esse golpe também é conhecido como "golpe dois em um".*

Estes golpes geralmente estipulam um tempo limite para receber seu prêmio, para criar uma falsa sensação de urgência.

### Hacks de mídia social {#social-media-hacks}

Um exemplo notório desses ocorreu em julho de 2020, quando as contas do Twitter de celebridades e organizações foram hackeadas. O hacker publicou simultaneamente uma doação de Bitcoins nas contas hackeadas. Embora os tweets enganosos tenham sido rapidamente detectados e excluídos, os hackers ainda conseguiram levar 11 bitcoins (ou US$ 500.000 em setembro de 2021) e saíram impunes.

![Uma fraude no Twitter](./appleTwitterScam.png)

### Golpe de doação usando celebridades {#celebrity-giveaway}

O golpe de sorteio usando celebridades é outra variável comum do golpe sorteio. Os golpistas pegarão uma entrevista de vídeo ou uma palestra gravada dada por uma celebridade e a transmitirão ao vivo no YouTube, fazendo parecer que a celebridade estava dando uma entrevista ao vivo promovendo um sorteio de criptomoedas.

Vitalik Buterin é frequentemente usado nessa fraude, mas muitas outras pessoas famosas envolvidas com criptomoedas também são usadas (por exemplo, Elon Musk ou Charles Hoskinson). Incluir uma pessoa conhecida dá às transmissões ao vivo dos golpistas um sentido de legitimidade (isso parece suspeito, mas como Vitalik está envolvido, então deve ser bom!).

**Os sorteios são sempre fraudes. Se você enviar seus fundos para essas contas, os perderá para sempre.**

![Um golpe no YouTube](./youtubeScam.png)

### Golpes de suporte {#support-scams}

Criptomoeda é uma tecnologia relativamente jovem e mal compreendida. Uma fraude comum que tira vantagem disso é a fraude de suporte, na qual os golpistas se personificam como equipe de suporte de carteiras, agências de câmbio ou blockchains populares.

A maior parte da discussão sobre Ethereum acontece no Discord. Os golpistas de suporte normalmente encontrarão seu alvo em canais públicos do Discord, nos quais procurarão questões de suporte e enviarão ao usuário uma mensagem privada oferecendo suporte. Ao criar segurança, os golpistas de suporte tentarão induzir você a revelar suas chaves privadas ou a enviar seus fundos para as carteiras deles.

![Um golpe de suporte no Discord](./discordScam.png)

Como regra geral, o pessoal de suporte nunca se comunicará com você por meio de canais privados não oficiais. Algumas coisas simples a ter em mente ao lidar com o suporte:

- Nunca compartilhe suas chaves privadas, frases semente ou senhas
- Nunca permita que alguém acesse remotamente o seu computador
- Nunca comunicar fora dos canais designados por uma organização

<InfoBanner emoji=":lock:">
  <div>
    Cuidado: embora fraudes ao estilo de suporte ocorram normalmente no Discord, elas também podem acontecer em qualquer aplicativo de bate-papo onde ocorram discussões sobre criptomoedas, incluindo e-mail.
  </div>
</InfoBanner>

### Golpe com o token 'Eth2' {#eth2-token-scam}

Na fase de preparação para [The Merge](/roadmap/merge/) (A Fusão), os golpistas aproveitaram a confusão em torno do termo "Eth2" para tentar fazer com que os usuários resgatassem seu ETH por um token "ETH2". Não há "ETH2" e nenhum outro token legítimo foi introduzido com a A Fusão. O ETH que você possuía antes da fusão é o mesmo ETH agora. Não há **necessidade de realizar nenhuma ação relacionada ao seu ETH para contabilizar a mudança de prova de trabalho para prova de participação**.

Os golpistas podem aparecer como "suporte", informando que, se você depositar seu ETH, você receberá de volta "ETH2". Não há [suporte oficial ao Ethereum](/community/support/)e não há nenhum novo token. Jamais compartilhe a frase de recuperação de sua carteira com ninguém.

_Nota: existem tokens/rótulos derivados que podem representar ETH em participação (ou seja, rETH do Rocket Pool, stETH de Lido, ETH2 do Coinbase), mas você não precisa "migrar" para algum eles._

### Golpes de “phishing” {#phishing-scams}

Golpes de “phishing” são outra abordagem cada vez mais comum que os golpistas usarão para tentar roubar os fundos da sua carteira.

Alguns e-mails de “phishing” pedem aos usuários que cliquem em links que os redirecionarão para sites falsos, pedindo para inserir a frase de recuperação, redefinir sua senha ou enviar ETH. Outros podem induzir você a instalar “malwares” inadvertidamente para infectar seu computador e dar aos golpistas acesso aos arquivos do seu computador.

Se você receber um e-mail de um remetente desconhecido, lembre-se:

- Nunca abrir um link ou anexo dos endereços de correio eletrônio que você não reconheça
- Nunca divulgue suas informações pessoais ou senhas para ninguém
- Exclua toda correspondência eletrônica de remetentes desconhecidos

[Mais sobre como evitar golpes de “phishing”](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Golpes de corretores de criptomoedas {#broker-scams}

Corretores de criptomoedas fraudulentos afirmam ser especialistas em criptomoedas e se oferecerão para pegar seu dinheiro e investir em seu nome. Depois que o golpista recebe seus fundos, ele pode persuadir você a enviar mais fundos, para que você não perca mais ganhos de investimento, ou pode desaparecer por completo.

Esses fraudadores geralmente encontram alvos usando contas falsas no YouTube para iniciar conversas aparentemente naturais sobre o "corretor". Essas conversas geralmente têm muitas curtidas para aumentar a legitimidade, mas elas são todas de contas de robôs.

**Não confie em estranhos na Internet para investir em seu nome. Você perderá suas criptomoedas.**

![Um golpe de corretor no YouTube](./brokerScam.png)

### Golpes de pool (consórcio) de mineração de criptomoedas {#mining-pool-scams}

A partir de setembro de 2022, não será mais possível realizar mineração no Ethereum. No entanto, os golpes de pool de mineração ainda existem. Os golpes de pool de mineração envolvem pessoas que entram em contato com você, sem a sua solicitação, alegando que você pode obter grandes retornos juntando-se a um pool de mineração Ethereum. O golpista continuará fazendo afirmações e permanecerá em contato com você pelo tempo que for necessário. Essencialmente, o golpista tentará convencê-lo de que, quando você se juntar a um pool de mineração de Ethereum, sua criptomoeda será usada para criar ETH e que você receberá dividendos em ETH. Você verá então que sua criptomoeda está gerando pequenos retornos. Isso é simplesmente uma isca para induzi-lo a investir mais. Por fim, todos os seus fundos serão enviados para um endereço desconhecido e o golpista desaparecerá ou, em alguns casos, ele continuará mantendo contato, como aconteceu em um caso recente.

Resumindo: tenha cuidado com pessoas que entram em contato com você nas redes sociais pedindo para você fazer parte de um pool de mineração. Uma vez que você perde a sua criptomoeda, não há como recuperá-la.

Algumas coisas para você se lembrar:

- Desconfie de qualquer pessoa que entre em contato com você oferecendo maneiras de ganhar dinheiro com sua criptomoeda
- Faça sua pesquisa sobre staking, pools de liquidez ou outras formas de investir sua criptomoeda
- Raramente, ou nunca, tais esquemas são legítimos. Se fossem, provavelmente seriam bastante conhecidos e você já deveria ter ouvido falar deles.

[Homem perde 200.000 dólares em golpe de pool de mineração](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Golpes de airdrop {#airdrop-scams}

As fraudes com airdrop envolvem um projeto fraudulento que lança um ativo (NFT, token) em sua carteira e o redireciona para um site fraudulento para você reivindicar o ativo lançado. Você será solicitado a entrar com a sua carteira Ethereum e "aprovar" uma transação ao tentar reivindicar o ativo falso. Essa transação compromete a sua conta enviando suas chaves públicas e privadas para o golpista. Uma forma alternativa dessa fraude pode fazer com que você confirme uma transação que enviará fundos para a conta do golpista.

[Mais sobre fraudes com airdrop](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Noções básicas de segurança na web {#web-security}

### Use senhas fortes {#use-strong-passwords}

[Mais de 80% da usurpação de contas são um resultado de senhas fracas ou roubadas](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Uma longa combinação de caracteres, números e símbolos ajudará a manter suas contas seguras.

Um erro comum é usar uma combinação de algumas palavras comuns e relacionadas. Senhas como essas são inseguras porque são propensas a uma técnica de invasão chamada ataque de dicionário.

```md
Exemplo de uma senha fraca: CuteFluffyKittens!

Exemplo de uma senha forte: ymv\*azu.EAC8eyp8umf
```

Outro erro comum é usar senhas que podem ser facilmente adivinhadas ou descobertas por meio de [engenharia social](https://wikipedia.org/wiki/Social_engineering_(security)). Incluir o nome de solteira da sua mãe, os nomes dos seus filhos ou animais de estimação, ou datas de nascimento na sua senha aumentará o risco de ser hackeado.

#### Práticas recomendadas relacionadas a senhas: {#good-password-practices}

- Crie senhas tão extensas quanto permitidas pelo gerador de senhas ou pelo formulário que você está preenchendo
- Use uma combinação de maiúsculas, minúsculas, números e símbolos
- Não use detalhes pessoais, como nomes de membros da família, em sua senha
- Evite palavras comuns

[Mais sobre a criação de senhas fortes](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Use senhas exclusivas para tudo {#use-unique-passwords}

Uma senha forte que foi revelada em uma violação de dados não é mais uma senha forte. O site [Have I Been Pwned](https://haveibeenpwned.com) permite que você verifique se suas contas foram envolvidas em alguma violação de dados públicos. Se este tiver sido o caso, ** altere essas senhas imediatamente**. Usar senhas exclusivas para cada conta diminui o risco de hackers terem acesso a todas as suas contas caso uma delas seja comprometida.

### Use um gerenciador de senhas {#use-password-manager}

<InfoBanner emoji=":bulb:">
  <div>
    Usar um gerenciador de senhas faz com que ele crie senhas fortes, únicas e que sejam lembradas! Nós <strong>fortemente</strong> recomendamos usar um, e a maioria deles é gratuita!
  </div>
</InfoBanner>

Lembrar de senhas fortes e exclusivas para cada conta que você possui não é o ideal. Um gerenciador de senhas oferece um cofre seguro e criptografado para todas as suas senhas que você pode acessar por meio de uma senha mestra forte. Eles também sugerem senhas fortes quando você se inscreve em um novo serviço, para que você não precise criar as suas próprias. Muitos gerenciadores de senhas também irão informar se você esteve envolvido em uma violação de dados, permitindo que você altere as senhas antes de qualquer ataque malicioso.

![Exemplo do uso de um gerenciador de senhas](./passwordManager.png)

#### Experimente um gerenciador de senha: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- Ou confira outros [gerenciadores de senhas recomendados](https://www.privacytools.io/secure-password-manager)

### Use autenticação de dois fatores {#two-factor-authentication}

Às vezes, você pode ser solicitado a autenticar sua identidade por meio de provas exclusivas. Essas são conhecidas como **fatores**. Os três principais fatores são:

- Algo que você saiba (como uma senha ou uma pergunta de segurança)
- Algo que você seja (como uma impressão digital ou uma varredura facial)
- Algo que você possui (uma chave de segurança ou aplicativo de autenticação no seu telefone)

Usar a **Autenticação de dois fatores (2FA)** fornece um *fator de segurança* adicional para suas contas online. A 2FA garante que o fato de ter somente a senha não é suficiente para acessar uma conta. Mais comumente, o segundo fator é um código de 6 dígitos aleatórios, conhecido como **uma senha de uso único (TOTP, na sigla em inglês)**, que você pode acessar através de um aplicativo de autenticação, como o Google Authenticator ou Authy. Estes funcionam como um fator de "algo que você possui" porque a seed que gera o código temporizado é armazenado em seu dispositivo.

<InfoBanner emoji=":lock:">
  <div>
    Observação: usar 2FA baseada em SMS é suscetível a <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">sequestro de SIM</a> e não é seguro. Para melhor segurança, use um serviço como o <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> ou o <a href="https://authy.com/">Authy</a>.
  </div>
</InfoBanner>

#### Chaves de segurança {#security-keys}

Uma chave de segurança é um tipo mais avançado e seguro de 2FA. Chaves de segurança são dispositivos de autenticação de hardware físico que funcionam como aplicativos autenticadores. A utilização de uma chave de segurança é a forma mais segura para a 2FA. Muitas dessas chaves utilizam o padrão FIDO Universal 2nd Factor (U2F). [Aprenda mais sobre FIDO U2F](https://www.yubico.com/authentication-standards/fido-u2f/).

Veja mais sobre 2FA:

<YouTube id="m8jlnZuV1i4" start="3479" />

### Desinstale extensões de navegador {#uninstall-browser-extensions}

Extensões do navegador, como extensões do Chrome ou complementos para o Firefox, podem melhorar a funcionalidade do navegador, mas também apresentam riscos. Por padrão, a maioria das extensões de navegador solicita acesso para "ler e alterar dados do site", permitindo que elas façam quase tudo com seus dados. As extensões do Chrome são sempre atualizadas automaticamente, portanto, uma extensão previamente segura pode ser atualizada mais tarde para incluir código malicioso. A maioria das extensões de navegador não está tentando roubar seus dados, mas você deve estar ciente de que elas podem.

#### Mantenha a segurança: {#browser-extension-safety}

- Somente instale extensões de navegador de fontes confiáveis
- Remova extensões de navegador que não sejam utilizadas
- Instale extensões do Chrome localmente para interromper a atualização automática (Avançado)

[Mais sobre os riscos das extensões do navegador](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Leia mais {#further-reading}

### Segurança na web {#reading-web-security}

- [Até 3 milhões de dispositivos infectados por complementos do Chrome e Edge com malware](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [Como criar uma senha forte — que você não vai esquecer](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [O que é uma chave de segurança?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### Segurança de criptomoedas {#reading-crypto-security}

- [Protegendo você e seus fundos](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [Problemas de segurança em software de comunicação criptográfica comum](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) - _Salus_
- [Guia de segurança para leigos e pessoas inteligentes também](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Segurança de criptomoedas: senhas e autenticação](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### Informações sobre golpes {#reading-scam-education}

- [Guia: Como identificar tokens fraudulentos](/guides/how-to-id-scam-tokens/)
- [Como se proteger: golpes comuns](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Como evitar golpes](https://bitcoin.org/en/scams) - _Bitcoin.org_
- [Discussão no Twitter sobre e-mails e mensagens comuns de phishing de criptografia](https://twitter.com/tayvano_/status/1516225457640787969) - _Taylor Monahan_

<QuizWidget quizKey="security" />
