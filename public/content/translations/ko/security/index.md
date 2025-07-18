---
title: 이더리움 보안 및 사기 방지
description: 이더리움에서 안전 유지하기
lang: ko
---

# 이더리움 보안 및 사기 방지 {#introduction}

암호화폐에 대한 관심이 늘어남에 따라, 암호화폐를 올바르게 사용하는 방법을 배우는 것 또한 필수 사항이 되었습니다. 암호화폐는 재미있고 흥미로울 수 있지만, 상당한 위험도 따릅니다. 사용에 앞서 작은 준비만 한다면, 이러한 위험을 줄일 수 있습니다.

<Divider />

## 웹 보안에 대한 모든 것 {#web-security}

### 강력한 비밀번호 사용하기 {#use-strong-passwords}

[80% 이상의 계정이 비밀번호가 취약하기 때문에 해킹됩니다](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). 문자, 숫자, 특수 문자를 조합한 긴 비밀번호를 사용하면 계정을 안전하게 보호할 수 있습니다.

일반 사용자들이 비밀번호를 만들 때 많이 하는 실수 중 하나는 일반적으로 쓰이고 서로 관련된 단어 2~3개의 조합을 사용하는 것입니다. 이러한 비밀번호는 흔한 해킹 기술인 [사전 공격](https://wikipedia.org/wiki/Dictionary_attack)에 취약합니다.

```md
취약한 비밀번호의 예시: CuteFluffyKittens!

강력한 비밀번호의 예시: ymv\*azu.EAC8eyp8umf
```

또 다른 흔한 실수는 쉽게 추측이 가능하거나 [사회공학](<https://wikipedia.org/wiki/Social_engineering_(security)>) 해킹을 통해 짐작하기 쉬운 비밀번호를 사용하는 것입니다. 어머니, 자녀 또는 애완동물의 이름이나 자신의 생일을 포함해서 만든 비밀번호는 보안에 취약하고 해킹의 위험을 높입니다.

#### 강력한 비밀번호를 만드는 방법: {#good-password-practices}

- 비밀번호 생성기 및 작성하는 양식에 최대한 긴 비밀번호를 사용합니다.
- 비밀번호에 대소문자, 숫자 및 특수 문자를 조합합니다.
- 비밀번호에 가족 이름 등의 개인 정보를 사용하지 않습니다.
- 비밀번호에 일반적으로 자주 쓰이는 단어를 사용하지 않습니다.

[강력한 비밀번호를 만드는 방법에 대해 자세히 알아보기](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### 서로 다른 비밀번호 사용하기 {#use-unique-passwords}

아무리 강력한 비밀번호라도 한 번 유출된 이후에는 보안에 도움이 되지 않습니다. [내 비밀번호가 유출되었을까요?](https://haveibeenpwned.com) 웹사이트에서 계정 비밀번호가 유출되어 해커의 데이터베이스에 존재하는지 여부를 확인할 수 있습니다. 존재하는 경우엔 **해당 비밀번호를 즉시 변경해야** 합니다. 계정마다 고유한 비밀번호를 사용하면 한 계정의 비밀번호가 유출되었을 때 다른 계정을 보호할 수 있는 방법이 됩니다.

### 비밀번호 관리 프로그램 사용하기 {#use-password-manager}

<InfoBanner emoji=":bulb:">
  <div>
    비밀번호 관리 프로그램은 자동으로 강력하고 고유한 비밀번호를 생성하고 저장합니다. 해당하는 프로그램을 사용할 것을 <strong>강력하게</strong> 권하며, 대부분은 무료입니다!
  </div>
</InfoBanner>

모든 계정마다 강력하고 유일한 비밀번호를 만들고 기억하는 것은 거의 불가능합니다. 비밀번호 관리 프로그램은 모든 비밀번호에 대해 하나의 강력한 마스터 비밀번호를 통해 액세스할 수 있는 안전하고 암호화된 저장소를 제공합니다. 해당 프로그램은 새로운 서비스에 가입할 때 강력한 비밀번호를 제안하므로, 직접 고민하여 만들지 않아도 됩니다. 다수의 비밀번호 관리 프로그램은 비밀번호가 유출되었을 경우에 알림을 보내며, 악의적인 공격이 발생하기 전에 비밀번호를 변경할 수 있게 합니다.

![비밀번호 관리 프로그램 사용의 예시](./passwordManager.png)

#### 다음과 같은 비밀번호 관리 프로그램을 사용해 보십시오. {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [LastPass](https://www.lastpass.com/)
- [1Password](https://1password.com/)

### 2단계 인증 사용하기 {#two-factor-authentication}

본인 인증에는 다양한 증명 방법을 사용할 수 있습니다. 이를 **요소(factor)**라고 하며, 다음과 같은 3가지 대표적인 요소가 있습니다.

- 지식 기반 (비밀번호 혹은 보안 질문 등)
- 속성 기반 (지문, 홍채, 얼굴 인식 등)
- 소유 기반 (스마트폰의 보안 키 또는 인증 앱)

**2개 요소 인증(2FA)** 또는 2단계 인증이란 온라인 계정에 추가 *보안 요소*를 제공함으로써 로그인 시 비밀번호를 아는 것(지식 기반) 이외에도 1가지를 더 증명하도록 한 것을 일컫습니다. 가장 흔한 두 번째 요소는 6자리의 무작위 숫자 코드인 **시간 기반 일회성 비밀번호(TOTP)**를 사용하는 것으로, Google Authenticator 또는 Authy과 같은 인증 앱을 통해 액세스할 수 있습니다. 시간 기반 코드를 생성하는 시드는 스마트폰에 저장되기 때문에 "소유 기반" 요소로 작동합니다.

<InfoBanner emoji=":lock:">
  <div>
    참고: 문자(SMS) 기반 2FA는 <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">SIM 탈취</a> 공격에 노출되므로 보안에 취약합니다. 가장 안전한 방법은 <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> 또는 <a href="https://authy.com/">Authy</a>와 같은 서비스를 사용하는 것입니다.
  </div>
</InfoBanner>

#### 보안 키 {#security-keys}

더 강도 높은 2단계 인증을 사용하시려면 보안 키 사용을 고려해 보세요. 보안 키는 인증 앱과 동일한 방식으로 작동하는 물리적 하드웨어 인증 기기입니다. 보안 키는 가장 강력한 보안을 제공하는 2단계 인증 수단입니다. 사용되는 키의 대부분은 FIDO Universal 2nd Factor(U2F) 표준입니다. [FIDO U2F에 대해 자세히 알아보기](https://www.yubico.com/authentication-standards/fido-u2f/).

2단계 인증에 대해 자세히 알아보기:

<YouTube id="m8jlnZuV1i4" start="3479" />

### 브라우저 확장 프로그램 삭제하기 {#uninstall-browser-extensions}

Chrome 확장 프로그램 또는 Firefox 애드온과 같은 브라우저 확장 프로그램은 유용한 브라우저 기능을 확장하고 사용자 환경을 향상하지만, 일정 위험을 수반합니다. 기본적으로 대부분의 브라우저 확장 프로그램은 '사이트 데이터의 읽기 및 변경' 권한을 요청하기 때문에 귀하의 데이터를 마음대로 활용할 수 있습니다. Chrome 확장 프로그램은 항상 자동으로 업데이트되기 때문에 이전에는 안전했던 확장 프로그램에 나중에 보안에 위험한 코드가 추가될 수 있습니다. 대부분의 확장 프로그램은 데이터를 훔치려고 시도하지 않지만, 항상 리스크가 있다는 것을 인식하고 있어야 합니다.

#### 보안을 강화하는 방법 {#browser-extension-safety}

- 믿을 수 있는 출처의 브라우저 확장 프로그램만 설치
- 사용하지 않는 확장 프로그램 제거
- 로컬에 Chrome 확장 프로그램을 설치하여 자동 업데이트 중지 (고급)

[브라우저 확장 프로그램의 위험성에 대해 자세히 알아보기](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## 암호화폐 보안에 대한 모든 것 {#crypto-security}

### 지식의 수준 높이기 {#level-up-your-knowledge}

사람들이 일반적으로 암호화폐 관련 사기를 당하는 이유는 이해도가 부족하기 때문입니다. 예를 들어, 이더리움 네트워크는 탈중앙화되어 있고 소유자가 없다는 사실을 이해하지 못한다면 고객 지원 서비스 담당자로 위장하여 개인 키에 대한 대가로 거래소에서 잃은 ETH를 돌려주겠다고 약속하는 누군가에게 속아 넘어가기 쉽습니다. 이더리움의 작동 원리에 대해 알아두는 것은 충분한 가치가 있습니다.

<DocLink href="/what-is-ethereum/">
  이더리움이란?
</DocLink>

<DocLink href="/eth/">
  이더는 무엇인가?
</DocLink>
<Divider />

## 지갑 보안 {#wallet-security}

### 개인 키를 타인에게 제공하지 마세요 {#protect-private-keys}

**어떠한 이유로든 절대로 개인 키를 공유하지 마세요!**

지갑의 개인 키는 당신의 이더리움 지갑에 대한 비밀번호로 작용합니다. 개인 키만 있다면 지갑 주소를 알고 있는 누군가가 계정의 모든 자금을 가져갈 수 있습니다!

<DocLink href="/wallets/">
  이더리움 지갑이란?
</DocLink>

#### 시드 문구나 개인 키의 스크린샷을 찍지 마세요 {#screenshot-private-keys}

시드 문구나 개인 키를 스크린샷으로 찍는 것은 클라우드에 동기화할 위험에 노출될 수 있으며 잠재적으로 해커가 액세스할 수도 있습니다. 클라우드에서 개인 키를 알아내는 것은 해커의 흔한 공격 방식입니다.

### 하드웨어 지갑을 사용하세요 {#use-hardware-wallet}

하드웨어 지갑은 개인 키에 대한 오프라인 저장 공간을 제공합니다. 이는 개인 키를 보관할 수 있는 가장 안전한 지갑 옵션으로 알려져 있습니다.

개인 키를 오프라인으로 보관하는 것은 해커가 컴퓨터를 해킹한 경우에도 지갑 해킹의 가능성은 크게 낮춰 줍니다.

#### 다음과 같은 하드웨어 지갑을 사용해 보십시오. {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### 보내기 전에 거래를 한 번 더 확인하세요 {#double-check-transactions}

잘못된 지갑 주소로 암호화폐를 보내는 실수가 종종 발생합니다. **이더리움에서는 트랜잭션을 한 번 보내면 돌이킬 수 없습니다.** 해당 주소의 소유자가 누군지 알고 있고 다시 자금을 돌려주는 경우가 아니라면, 자금을 되돌려 받을 방법은 없습니다.

트랜잭션을 보내기 전에 받는 사람의 주소가 올바른지 꼭 다시 한 번 확인하세요. 스마트 계약을 사용하는 경우 서명 전에 트랜잭션 메시지를 읽는 것 또한 권장됩니다.

### 스마트 계약 지불 한도를 설정하세요 {#spend-limits}

스마트 계약을 사용할 때 지불 한도를 무제한으로 허용하지 마십시오. 무제한으로 지정하면 스마트 계약이 지갑의 자금을 모두 사용할 수도 있습니다. 대신, 트랜잭션을 위해 필요한 만큼만 지불 한도를 설정하세요.

많은 이더리움 지갑은 계정의 자금을 보호하기 위해 한도 설정 기능을 제공합니다.

<Divider />

## 흔한 사기 방식 {#common-scams}

사기꾼들은 귀하의 자금을 항상 노리고 있습니다. 사기꾼을 모두 막는 것은 어렵겠지만, 이들의 가장 흔한 사기 방식을 알고 있다면 해당 사기로 인한 위험을 줄일 수 있습니다. 사기 방식은 물론 다양하지만, 일반적으로 동일한 고급 패턴 중 하나를 따릅니다. 특별한 경우가 아니라면, 다음 사항을 숙지하세요.

- 항상 의심합니다.
- 공짜 혹은 할인된 ETH는 존재하지 않습니다.
- 개인 키 혹은 개인 정보는 절대로 제공할 필요가 없습니다.

### 공짜 사기 {#giveaway}

암호화폐에서 가장 흔한 사기 방식으로 공짜 사기가 있습니다. 공짜 사기에는 다양한 유형이 있지만 일반적으로 귀하가 특정 지갑 주소로 ETH를 보내면 그 2배의 ETH가 돌아온다는 형태가 있습니다. *이러한 이유로, 이 사기는 1대2 사기라고도 합니다.*

이러한 방식의 사기는 보통 제한 시간 혹은 기간을 두어 다급함을 위장하고 잘못된 선택을 유도합니다.

#### 소셜미디어 해킹 {#social-media-hacks}

대표적인 예시로 2020년 7월 트위터의 유명 연예인 및 조직의 계정이 해킹된 사건이 있습니다. 해커는 바로 해킹된 계정에 비트코인 공짜 제공 게시글을 올렸습니다. 해당 게시물은 바로 삭제 처리되었지만, 그럼에도 불구하고 해커는 11비트코인(2021년 9월 기준 약 50만불)을 훔쳐 갈 수 있었습니다.

![트위터에서의 사기](./appleTwitterScam.png)

#### 유명인 공짜 사기 {#celebrity-giveaway}

유명인 공짜 사기는 공짜 사기의 또 다른 흔한 유형입니다. 사기꾼들은 유명인의 연설이나 인터뷰를 녹화한 후 이를 YouTube에서 생중계인 것처럼 방송합니다. 마치 유명인이 실시간으로 암호화폐를 공짜로 제공하는 듯한 인터뷰 영상을 내보냅니다.

비탈릭 부테린은 이 사기에 가장 많이 사용되고 있으며, 이외에 암호화폐와 관련된 많은 유명 인사들(일론 머스크나 찰스 호킨스)도 이용당합니다. 이렇게 유명인을 사용하는 것은 사기꾼들의 생중계가 마치 합법적인 것처럼 보이게끔 만듭니다(뭔가 이상하지만, 비탈릭이 하는 것이니까 괜찮겠지!).

**공짜로 주겠다는 것은 언제나 사기입니다. 만약 해당하는 계정으로 자금을 보낸다면 영원히 없어지는 것이라고 보면 됩니다.**

![YouTube에서의 사기](./youtubeScam.png)

### 후원 사기 {#support-scams}

암호화폐는 생긴 지 얼마 안 됐으며, 종종 잘못된 내용으로 인지되고 있는 기술입니다. 이 점을 파고드는 흔한 사기 방식이 후원 사기이며, 사기꾼들은 유명한 지갑, 거래소, 블록체인 등의 후원 직원으로 가장하여 접근합니다.

이더리움에 대한 대부분의 논의는 디스코드에서 이루어집니다. 후원 사기꾼들은 종종 이런 공개 디스코드 채널에서 후원 관련 질문을 한 사람을 찾아 타겟으로 삼은 후 개인 메시지를 보냅니다. 후원 사기꾼들은 신뢰를 쌓은 후 지갑의 개인 키를 공개하도록 속이거나 직접 자금을 보내달라고 요청합니다.

![디스코드에서의 후원 사기](./discordScam.png)

일반적인 규칙으로, 직원은 절대 개인 또는 비공식 채널을 통해 소통하지 않습니다. 후원 관련하여 아래 사항을 명심하세요.

- 절대로 개인 키, 시드 문구, 비밀번호를 공유하지 마세요.
- 절대로 타인을 당신의 컴퓨터에 원격 접속시키지 마세요.
- 절대로 기관의 정해진 채널 외에 다른 곳에서 소통하지 마세요.

<InfoBanner emoji=":lock:">
  <div>
    명심하세요: 대부분의 후원 사기는 디스코드에서 발생하지만, 이외에 이메일 등 암호화폐 관련 논의가 오가는 채팅 애플리케이션에서도 일어날 수 있습니다.
  </div>
</InfoBanner>

### 'Eth2' 토큰 사기 {#eth2-token-scam}

[병합](/roadmap/merge/)이 이슈화됨에 따라 사기꾼들은 'Eth2' 용어와 관련된 혼란을 이용하여 사용자가 'ETH2' 토큰에 대해 ETH를 상환하도록 속입니다. 하지만 병합과 관련하여 'Eth2'는 물론이고 어떠한 합법적인 토큰도 소개된 적이 없습니다. 병합 이전에 소유한 ETH는 지금도 동일한 ETH입니다. **작업 증명에서 지분 증명으로 넘어갈 때 ETH와 관련하여 귀하가 취해야 하는 작업은 아무것도 없습니다**.

사기꾼들은 "도우미" 역할을 자청하여, 만약 ETH를 예치할 경우 'ETH2'를 받게 된다고 속이려 할 것입니다. 하지만 [공식적인 이더리움 도우미](/community/support/)라는 것은 존재하지 않으며, 새로운 토큰 또한 없습니다. 절대로 지갑의 시드 문구를 다른 사람과 공유하지 마십시오.

_참고: 스테이킹된 ETH를 나타내기 위한 파생 토큰/티커가 있을 수 있습니다(로켓 풀의 rETH, 리도의 stETH, 코인베이스의 ETH2 등). 하지만 이는 특별히 "이전해야 하는" 대상이 아닙니다._

### 피싱 사기 {#phishing-scams}

피싱 사기는 최근 증가하고 있는 또 다른 사기 유형입니다.

일부 피싱 이메일은 사용자가 링크를 클릭하면 유사한 웹사이트로 이동하게 한 후, 시드 문구를 입력하거나 비밀번호를 재설정 또는 ETH를 보내게끔 안내합니다. 때로는 몰래 악성 코드를 설치하게 함으로써 컴퓨터의 파일에 사기꾼들이 액세스할 수 있게 합니다.

알 수 없는 발신자로부터 이메일을 수신하는 경우, 다음 사항을 숙지하세요.

- 모르는 이메일 주소에서 발송된 이메일에 포함된 링크나 첨부파일은 절대 클릭하지 마세요.
- 개인 정보나 비밀번호를 누구에게도 제공하지 마세요.
- 모르는 발신자로부터 받은 이메일은 삭제하세요.

[피싱 사기를 피하는 방법 자세히 알아보기](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### 암호화폐 거래 중개 사기 {#broker-scams}

암호화폐 거래 브로커들은 자신을 전문가로 소개한 후 귀하를 대신하여 자금을 투자해 보겠다고 제안합니다. 일반적으로 비현실적인 이익률을 약속합니다. 사기꾼들은 자금을 수신한 후 완전히 사라질 수 있으며, 이익을 놓치지 않으려면 지금 자금을 더 보내야 한다고 추가로 요구할 수도 있습니다.

이러한 사기 브로커들은 YouTube의 가짜 계정을 사용하여 겉으로는 자신에 대한 중립적인 대화가 오가는 것처럼 위장하고 타겟을 찾습니다. 이러한 대화는 종종 많은 '좋아요'를 수반하여 믿을 만하게 보이지만, 이 '좋아요'는 모두 가짜 계정에서 만들어진 것입니다.

**인터넷의 누군가가 귀하를 대신하여 투자하도록 신뢰하지 마십시오. 반드시 자금을 잃게 됩니다.**

![YouTube에서의 거래 브로커 사기](./brokerScam.png)

### 암호화폐 채굴 풀 사기 {#mining-pool-scams}

2022년 9월, 이더리움에서의 채굴은 불가능해졌습니다. 하지만 채굴 풀 사기는 아직도 존재합니다. 채굴 풀 사기꾼들은 이더리움 채굴 풀에 참여하면 많은 이익을 가져갈 수 있다고 주장하며 접근합니다. 사기꾼들은 얼마나 오래 걸리든 귀하와 계속 연락합니다. 사기꾼들은 귀하가 이더리움 채굴 풀에 참여하면 암호화폐가 새로운 ETH를 만드는 데 쓰일 것이고 여기에서 ETH 배당을 받게 된다고 설득합니다. 하지만 결국 암호화폐는 작은 이익만 창출하게 됩니다. 이는 귀하가 더 많은 자금을 투자하게끔 유도합니다. 결국, 모든 자금이 알 수 없는 주소로 전송되고, 사기꾼들은 사라지거나 최근 사례와 같이 계속 연락할 수도 있습니다.

기본적으로 소셜미디어에서 접근하여 채굴 풀에 참여하라고 설득하는 사람이 있다면 경계하십시오. 암호화폐는 한 번 잃게 되면 영원히 잃는 것입니다.

아래 사항들을 기억하세요.

- 암호화폐를 가지고 돈을 벌 수 있다고 하는 사람은 모두 의심하십시오.
- 스테이킹, 유동성 풀 등 암호화폐를 투자하는 방법에 대해 직접 공부하십시오.
- 제대로 된 투자 방법은 매우 드뭅니다. 올바른 투자 방법이라면 이미 한 번이라도 들어 보았어야 할 것입니다.

[채굴 풀 사기로 인해 20만 불을 잃은 사람](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### 에어드랍 사기 {#airdrop-scams}

에어드랍 사기는 NFT, 토큰 등의 자산을 지갑에 에어드랍하고, 가짜 웹사이트에 방문하도록 유도함으로써 이루어집니다. 이더리움 지갑으로 로그인한 후 에어드랍으로 받은 자산을 확정할 수 있도록 트랜잭션을 "승인"하도록 안내받습니다. 하지만 이러한 트랜잭션은 사실 계정을 탈취하여 공개 키 및 개인 키를 사기꾼에게 보내게 합니다. 이 사기의 다른 형태로는 사기꾼의 계좌로 자금을 보내는 트랜잭션을 승인하도록 하는 방식 등이 있습니다.

[에어드랍 사기 자세히 알아보기](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## 더 읽을거리 {#further-reading}

### 웹 보안 {#reading-web-security}

- [2단계 인증에 텍스트를 사용하지 않아야 하는 이유](https://www.theverge.com/2017/9/18/16328172/sms-two-factor-authentication-hack-password-bitcoin) - _The Verge_
- [최대 300만 기기가 Chrome 및 Edge 애드온 기반의 악성코드에 감염](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - *Dan Goodin*
- [강력한 비밀번호를 생성하고 잊어버리지 않는 방법](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [보안 키란 무엇인가요?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _코인베이스_

### 암호화폐 보안 {#reading-crypto-security}

- [당신과 당신의 자금 보호하기](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [암호화폐를 안전하게 보관하는 4가지 방법](https://www.coindesk.com/learn/4-ways-to-stay-safe-in-crypto/) - _코인데스크_
- [모두를 위한 보안 가이드](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [암호화폐 보안: 비밀번호와 인증](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### 사기 예방 교육 {#reading-scam-education}

- [안전한 암호화폐: 흔한 사기 유형들](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [사기 예방하기](https://bitcoin.org/en/scams) - _Bitcoin.org_
- [일반적인 암호화폐 피싱 이메일과 메시지에 대한 트위터 글](https://twitter.com/tayvano_/status/1516225457640787969) - *Taylor Monahan*
