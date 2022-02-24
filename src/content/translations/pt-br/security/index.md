---
title: Segurança e prevenção de fraude do Ethereum
description: Como manter a segurança no Ethereum
lang: pt-br
sidebar: true
---

# Segurança e prevenção de fraude do Ethereum {#introduction}

Com o crescente interesse em criptomoedas, é essencial aprender as práticas recomendadas ao usar criptomoedas. Operar com criptomoedas pode ser divertido e empolgante, mas também existem sérios riscos. Se você estiver atendo a estes pequenos detalhes, poderá mitigar esses riscos.

<Divider />

## Noções básicas de segurança na web {#web-security}

### Use senhas fortes {#use-strong-passwords}

[Mais de 80% da usurpação de contas são um resultado de senhas fracas ou roubadas](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Uma longa combinação de caracteres, números e símbolos é o melhor para manter suas contas seguras.

Um erro comum que os indivíduos cometem é usar uma combinação de duas a três palavras comuns do dicionário relacionadas. Senhas como essa são inseguras porque são propensas a uma simples técnica de usurpação conhecida como [ataque de dicionário](https://wikipedia.org/wiki/Dictionary_attack).

```md
Exemplo de uma senha fraca: CuteFluffyKittens!

Exemplo de uma senha forte: ymv\*azu.EAC8eyp8umf
```

Outro erro comum é o uso de senhas que podem ser facilmente adivinhadas ou descobertas por meio de [engenharia social](<https://wikipedia.org/wiki/Social_engineering_(security)>). Incluir o nome de solteira de sua mãe, os nomes de seus filhos ou animais de estimação ou datas de nascimento em sua senha não é seguro e aumentará o risco de sua senha ser invadida.

#### Práticas recomendadas relacionadas a senhas: {#good-password-practices}

- Crie senhas tão extensas quanto permitidas pelo gerador de senhas ou pelo formulário que você está preenchendo
- Use uma combinação de maiúsculas, minúsculas, números e símbolos
- Não use detalhes pessoais, como nomes de membros da família, em sua senha
- Evite palavras comuns do dicionário

[Mais sobre a criação de senhas fortes](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Use senhas exclusivas para tudo {#use-unique-passwords}

Uma senha forte não fornece muita proteção se a senha for revelada em uma violação de dados. O site[Have I Been Pwned](https://haveibeenpwned.com)permite verificar se as suas contas foram envolvidas em quaisquer violações de dados armazenadas na base de dados deles. Caso sim, **você deveria alterar as senhas "pwned" imediatamente**. Usar senhas únicas para cada conta diminui o risco de os hackers obterem acesso a todas as suas contas quando uma delas for comprometida.

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
- [LastPass](https://www.lastpass.com/)
- [1Password](https://1password.com/)

### Use autenticação de dois fatores {#two-factor-authentication}

Para provar que você é realmente você, existem diferentes provas únicas que podem ser usadas para autenticação. Estas são conhecidas como **fatores**, e os três principais fatores são:

- Algo que você saiba (como uma senha ou uma pergunta de segurança)
- Algo que você seja (como uma impressão digital ou uma varredura facial)
- Algo que você possui (uma chave de segurança ou aplicativo de autenticação no seu telefone)

Usar **a autenticação de dois fatores (2FA)** fornece um _fator de segurança_ adicional para suas contas online, então saber apenas a sua senha (algo que você conhece) não é o suficiente para acessar uma conta. Mais comumente, o segundo fator é um código de 6 dígitos aleatórios, conhecido como **uma senha de uso único (TOTP, na sigla em inglês)**, que você pode acessar através de um aplicativo de autenticação, como o Google Authenticator ou Authy. Estes funcionam como um fator de "algo que você possui" porque a seed que gera o código temporizado é armazenado em seu dispositivo.

<InfoBanner emoji=":lock:">
  <div>
    Nota: Usar a 2FA baseada em SMS é suscetível ao 
      <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">
      SIM jacking
     </a>
         (sequestro do chip SIM)  e não é segura. Para melhor segurança, use um serviço como {" "}
    <a href="https://mashable.com/article/how-to-set-up-google-authenticator">
      Google Authenticator
    </a>
    ou <a href="https://authy.com/">Authy</a>.
  </div>
</InfoBanner>

#### Chaves de segurança {#security-keys}

Para aqueles que querem dar o próximo passo na 2FA, considere a utilização de uma chave de segurança. As chaves de segurança são dispositivos de autenticação em hardware que funcionam do mesmo jeito que os aplicativos de autenticação. A utilização de uma chave de segurança é a forma mais segura para a 2FA. Muitas dessas chaves utilizam o padrão FIDO Universal 2nd Factor (U2F). [Aprenda mais sobre FIDO U2F](https://www.yubico.com/authentication-standards/fido-u2f/).

Veja mais informações sobre 2FA neste vídeo:

<YouTube id="m8jlnZuV1i4" start="3479" />

### Desinstale extensões de navegador {#uninstall-browser-extensions}

Extensões de navegador como extensões do Chrome ou complementos para o Firefox podem aumentar as funcioanlidades do navegador e melhorar a experiência do usuário, mas elas vêm com riscos. Por padrão, a maioria das extensões de navegador solicita acesso para "ler e alterar dados do site", permitindo que elas façam quase tudo com seus dados. As extensões do Chrome são sempre atualizadas automaticamente, portanto, uma extensão previamente segura pode ser atualizada mais tarde para incluir código malicioso. A maioria das extensões de navegador não está tentando roubar seus dados, mas você deve estar ciente de que elas podem.

#### Mantenha a segurança: {#browser-extension-safety}

- Somente instale extensões de navegador de fontes confiáveis
- Remova extensões de navegador que não sejam utilizadas
- Instale extensões do Chrome localmente para interromper a atualização automática (Avançado)

[Mais sobre os riscos das extensões de navegador](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Noções básicas sobre segurança de criptomoedas {#crypto-security}

### Aumente o seu nível de conhecimento {#level-up-your-knowledge}

Uma das maiores razões pelas quais as pessoas sofrem golpes com criptomoedas é, geralmente, a falta de conhecimento. Por exemplo, se você não entende que a rede Ethereum é descentralizada e não pertence a ninguém, então é fácil ser presa de alguém fingindo ser um agente de atendimento ao cliente que promete devolver o ETH perdido em troca das suas chaves privadas. Educar-se sobre como o Ethereum funciona é um investimento valioso.

<DocLink to="/what-is-ethereum/">
  O que é Ethereum?
</DocLink>

<DocLink to="/eth/">
  O que é ether?
</DocLink>

<Divider />

## Segurança da carteira {#wallet-security}

### Não entregue suas chaves privadas {#protect-private-keys}

**Nunca, por nenhuma razão, compartilhe suas chaves privadas!**

A chave privada da sua carteira atua como uma senha para a sua carteira Ethereum. É a única coisa que impede que alguém que conheça o endereço de sua carteira drene todos os ativos da sua conta!

<DocLink to="/wallets/">
  O que é uma carteira Ethereum?
</DocLink>

#### Não faça capturas de tela das suas frases de recuperação/chaves privadas {#screenshot-private-keys}

Ao capturar a tela com as suas frases semente ou chaves privadas, você corre o risco de sincronizá-las com a nuvem e fazê-las potencialmente acessíveis aos hackers. Obter as chaves privadas da nuvem é um vetor de ataque comum para os hackers.

### Use uma carteira de hardware {#use-hardware-wallet}

Uma carteira de hardware fornece armazenamento offline para chaves privadas. Elas são consideradas a opção de carteira mais segura para armazenar suas chaves privadas.

Manter chaves privadas offline reduz enormemente o risco de serem hackeadas, mesmo que um hacker tenha controle de seu computador.

#### Experimente uma carteira de hardware: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Verifique duas vezes as transações antes de enviar {#double-check-transactions}

Enviar criptomoedas acidentalmente para um endereço de carteira errado é um erro comum. **Uma transação enviada no Ethereum é irreversível.** A menos que você conheça o proprietário do endereço e possa convencê-lo de enviar seus fundos de volta, não haverá maneira de você recuperá-los.

Certifique-se sempre de que o endereço de destino corresponde exatamente ao endereço do destinatário desejado antes de enviar uma transação. Ao interagir com um contrato inteligente, também é recomendado que se leia a mensagem de transação antes de assinar.

### Defina limites de gastos para contratos inteligentes {#spend-limits}

Ao interagir com contratos inteligentes, não permita limites de gastos ilimitados. Uma despesa ilimitada poderia permitir que o contrato inteligente drenasse a sua carteira. Em vez disso, defina limites de gastos apenas na quantidade necessária para a transação.

Muitas carteiras Ethereum oferecem proteção de limites para evitar que as contas sejam drenadas.

[Veja as carteiras com proteção de limites](/wallets/find-wallet/?filters=has_limits_protection)

<Divider />

## Fraudes comuns {#common-scams}

Os golpistas estão sempre procurando maneiras de tirar seus fundos de você. É impossível deter completamente os fraudadores, mas podemos torná-los menos eficazes ao conhecermos a maior parte das técnicas utilizadas. Existem muitas variações destas fraudes, mas elas geralmente seguem os mesmos padrões de alto nível. Além de tudo, lembre-se:

- sempre seja cético
- ninguém dará a você ETH de graça ou com desconto
- ninguém precisa acessar suas chaves privadas ou informações pessoais

### Golpe de doação {#giveaway}

Uma das fraudes mais comuns com criptomoedas é o golpe de doação. O golpe de doação pode ser de muitas formas, mas a premissa geral é que se você enviar ETH para o endereço da carteira fornecido, você receberá seu ETH de volta com valor dobrado. *Por esta razão, também é conhecida como "golpe 2-por-1".*

Estes esquemas fraudulentos usualmente estipulam um limite de tempo para que a oferta seja reivindicada, de modo a encorajar uma tomada de decisão precipitada e criar uma falsa sensação de urgência.

#### Hacks de mídia social {#social-media-hacks}

Um exemplo notório disso ocorreu em julho de 2020, quando as contas do Twitter de celebridades proeminentes e organizações foram hackeadas. O hacker publicou simultaneamente um doação de Bitcoins nas contas hackeadas. Embora os tweets enganosos tenham sido rapidamente detectados e excluídos, os hackers ainda conseguiram escapar com 11 bitcoins (ou US$ 500.000 em setembro de 2021)

![Uma fraude no Twitter](./appleTwitterScam.png)

#### Golpe de doação usando celebridades {#celebrity-giveaway}

O golpe de doação usando celebridades é outra variável comum do golpe de doação. Os golpistas pegarão uma entrevista de vídeo ou uma palestra gravada dada por uma celebridade e a transmitirão ao vivo no YouTube, fazendo parecer que a celebridade estava dando uma entrevista ao vivo endossando um sorteio de criptomoeda.

Vitalik Buterin é frequentemente usado nessa fraude, mas muitas outras pessoas proeminentes envolvidas com criptomoedas também são usadas (por exemplo, Elon Musk ou Charles Hoskinson). Incluir uma pessoa conhecida dá às transmissões ao vivo dos golpistas um sentido de legitimidade (isso parece tosco, mas como Vitalik está envolvido, então deve estar bem!).

**As doações são sempre fraudes. Se você enviar seus fundos para essas contas, os perderá para sempre.**

![Um golpe no YouTube](./youtubeScam.png)

### Golpes de suporte {#support-scams}

Criptomoeda é uma tecnologia relativamente jovem e mal compreendida. Uma fraude comum que tira vantagem disso é a fraude de suporte, onde os golpistas se personificam como pessoal de suporte de carteiras, exchanges ou blockchains populares.

A maior parte da discussão sobre Ethereum acontece no Discord. Os golpistas de suporte normalmente encontrarão seu alvo em canais públicos do Discord, onde procurarão questões de suporte e enviarão ao usuário uma mensagem privada oferecendo suporte. Ao fomentar a confiança, os golpistas de suporte tentarão induzir você a revelar suas chaves privadas ou a enviar seus fundos para as carteiras deles.

![Um golpe de suporte no Discord](./discordScam.png)

Como regra geral, o pessoal de suporte nunca se comunicará com você através de canais privados não oficiais. Algumas coisas simples para ter em mente ao lidar com o suporte:

- Nunca compartilhe suas chaves privadas, frases semente ou senhas
- Nunca permita que alguém acesse remotamente o seu computador
- Nunca se comunique fora dos canais oficiais das organizações

<InfoBanner emoji=":lock:">
  <div>
    Cuidado: embora fraudes ao estilo de suporte ocorram normalmente no Discord, elas também podem acontecer em qualquer aplicativo de bate-papo onde ocorram discussões sobre criptomoedas, incluindo e-mail.
  </div>
</InfoBanner>

### Golpes de “phishing” {#phishing-scams}

Golpes de “phishing” são outra abordagem cada vez mais comum que os golpistas usarão para tentar roubar os fundos da sua carteira.

Alguns correios eletrônicos de “phishing” pedem aos usuários que cliquem em links que os redirecionarão para sites de imitação, pedindo para inserir sua frase semente, redefinir sua senha ou enviar ETH. Outros podem induzi-lo a instalar “malware” inadvertidamente para infectar seu computador e dar aos fraudadores acesso aos arquivos do seu computador.

Se você receber um correio eletrônico de um remetente desconhecido, lembre-se:

- Nunca abrir um link ou anexo dos endereços de correio eletrônio que você não reconheça
- Nunca divulgue suas informações pessoais ou senhas para ninguém
- Exclua toda correspondência eletrônica de remetentes desconhecidos

[Mais sobre como evitar fraudes de “phishing”](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Golpes de corretores de criptomoedas {#broker-scams}

Os golpes de corretores de criptomoedas são dados por pessoas que dizem ser corretores especializados em criptomoeda que se oferecerão para investir seu dinheiro em seu nome. As promessas de retornos irrealistas geralmente acompanham esta oferta. Depois que o golpista recebe seus fundos, ele pode persuadir você a enviar mais fundos, para que você não perca mais ganhos de investimento, ou pode desaparecer por completo.

Esses corretores fraudulentos encontram seus alvos usando contas falsas no YouTube para começar conversas aparentemente naturais sobre corretagem. Essas conversas geralmente têm uma alta votação positiva para aumentar a legitimidade, mas os votos positivos são todos de contas de robôs.

**Não confie em estranhos na Internet para investir em seu nome. Você perderá suas criptomoedas.**

![Um golpe de corretor no YouTube](./brokerScam.png)

### Golpes de consórcio de mineração de criptomoedas {#mining-pool-scams}

Os golpes de consórcio de mineração envolvem pessoas realizando contato não solicitados com você e alegando que você pode obter grandes retornos juntando-se a um consórcio de mineração Ethereum. O golpista fará pedidos e permanecerá em contato com você pelo tempo que for necessário. Essencialmente, o golpista tentará convencê-lo de que, quando você ingressar em um consórcio de mineração Ethereum, sua criptomoeda será usada para criar ETH e que você receberá dividendos na forma de ETH. O que vai acabar acontecendo é que você notará que sua criptomoeda está gerando pequenos retornos. Isso é simplesmente uma isca para induzi-lo a investir mais. Eventualmente, todos os seus fundos serão enviados para um endereço desconhecido e o golpista desaparecerá ou, em alguns casos, continuará a manter contato, como aconteceu em um caso recente.

Resumindo, tenha cuidado com as pessoas que entram em contato com você nas mídias sociais pedindo que você faça parte de um consórcio de mineração. Uma vez que você perde a sua criptomoeda, não há volta atrás.

Algumas coisas para você se lembrar:

- Desconfie de qualquer pessoa que entre em contato com você oferecendo maneiras de ganhar dinheiro com sua criptomoeda
- Faça sua pesquisa sobre "staking", consórcios de liquidez ou outras formas de investir sua criptomoeda
- Raramente, ou nunca, tais esquemas são legítimos. Se fossem, provavelmente seriam bastante conhecidos e você já deveria ter ouvido falar deles.

[Homem perde 200.000 dólares em golpe de consórcio de mineração](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Golpe com o token 'Eth2' {#eth2-token-scam}

Com [a fusão](/upgrades/merge/) chegando em 2022, golpistas tiraram proveito da confusão em torno do termo 'Eth2' para tentar fazer com que os usuários resgatassem seus ETH por um token 'ETH2'. Não há nenhum 'ETH2' ou qualquer outro token novo introduzido com a fusão. O ETH que você possui hoje continuará a ser o mesmo ETH após a fusão, e não há necessidade de fazer nenhuma troca no seu ETH para a fusão.

Os golpistas podem aparecer sob a forma de "suporte", dizendo que se você depositar o seu ETH você receberá de volta 'ETH2'. Não há [suporte oficial ao Ethereum](/community/support/)e não há nenhum novo token. Nunca compartilhe a sua frase de recuperação com ninguém.

### Golpes de airdrop {#airdrop-scams}

Os golpes de airdrop envolvem um projeto fradulento que lança um ativo (NFT, token) em sua carteira e redireciona você para um site fraudulento para você reivindicar o ativo lançado. Você será solicitado a entrar com a sua carteira Ethereum e "aprovar" uma transação ao tentar reivindicar o ativo falso. Esta transação compromete a sua conta enviando suas chaves públicas e privadas para o golpista. Uma forma alternativa deste golpe pode fazer com que você confirme uma transação que envie fundos para a conta do golpista.

[Mais sobre golpes de airdrop](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Leia mais {#further-reading}

### Segurança na web {#reading-web-security}

- [É por isso que você não deve usar mensagens de textos para autenticação de dois fatores](https://www.theverge.com/2017/9/18/16328172/sms-two-factor-authentication-hack-password-bitcoin) - _The Verge_
- [Até 3 milhões de dispositivos infectados por complementos do Chrome e Edge com malware](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [Como criar uma senha forte — que você não vai esquecer](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [O que é uma chave de segurança?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### Segurança de criptomoedas {#reading-crypto-security}

- [Protegendo você e seus fundos](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [4 maneiras de se manter seguro quando se usa criptomoedas](https://www.coindesk.com/tech/2021/04/20/4-ways-to-stay-safe-in-crypto/) - _CoinDesk_
- [Guia de segurança para leigos e pessoas inteligentes também](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Segurança de criptomoedas: senhas e autenticação](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### Informações sobre golpes {#reading-scam-education}

- [Como se proteger: golpes comuns](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Evitando golpes](https://bitcoin.org/en/scams) _Bitcoin.org_
