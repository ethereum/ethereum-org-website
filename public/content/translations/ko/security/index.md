---
title: 이더리움 보안 및 스캠 예방
description: 이더리움을 안전하게 사용하기
lang: ko
---

암호화폐에 대한 관심이 높아지면서 스캐머와 해커로 인한 위험도 커지고 있습니다. 이 문서에서는 이러한 위험을 완화하기 위한 몇 가지 모범 사례를 설명합니다.

**기억하세요: ethereum.org의 그 누구도 여러분에게 먼저 연락하지 않습니다. 공식 이더리움 지원팀이라고 주장하는 이메일에 답장하지 마세요.**

<Divider />

## 암호화폐 보안 기초 {#crypto-security}

### 지식 수준 높이기 {#level-up-your-knowledge}

암호화폐의 작동 방식에 대한 오해는 큰 비용을 초래하는 실수로 이어질 수 있습니다. 예를 들어, 누군가 개인 키를 주면 잃어버린 ETH를 되찾아 줄 수 있는 고객 서비스 상담원인 척한다면, 이는 [이더리움](/)이 이러한 기능이 없는 탈중앙화된 네트워크라는 사실을 이해하지 못하는 사람들을 노리는 것입니다. 이더리움이 어떻게 작동하는지 스스로 학습하는 것은 가치 있는 투자입니다.

<DocLink href="/what-is-ethereum/">
  이더리움이란 무엇인가요?
</DocLink>

<DocLink href="/what-is-ether/">
  이더란 무엇인가요?
</DocLink>
<Divider />

## 지갑 보안 {#wallet-security}

### 복구 구문을 절대 공유하지 마세요 {#protect-private-keys}

**어떤 이유로든 복구 구문이나 개인 키를 절대 공유하지 마세요!**

복구 구문(비밀 복구 구문 또는 시드 구문이라고도 함)은 지갑의 마스터 키입니다. 이를 가진 사람은 누구나 여러분의 모든 계정에 접근하여 모든 자산을 빼낼 수 있습니다. 개인 키도 개별 계정에 대해 동일하게 작동합니다. 합법적인 서비스, 지원 상담원 또는 웹사이트는 절대 이를 요구하지 않습니다.

<DocLink href="/wallets/">
  이더리움 지갑이란 무엇인가요?
</DocLink>

#### 시드 구문/개인 키의 스크린샷을 찍지 마세요 {#screenshot-private-keys}

시드 구문이나 개인 키를 스크린샷으로 찍으면 클라우드 데이터 제공업체와 동기화되어 해커가 접근할 수 있게 될 수 있습니다. 클라우드에서 개인 키를 탈취하는 것은 해커들의 일반적인 공격 경로입니다.

### 하드웨어 월렛 사용하기 {#use-hardware-wallet}

하드웨어 월렛은 개인 키를 오프라인으로 저장할 수 있게 해줍니다. 개인 키를 저장하는 가장 안전한 지갑 옵션으로 간주됩니다. 개인 키가 인터넷에 연결되지 않으며 기기 내부에 완전히 로컬로 유지됩니다.

개인 키를 오프라인으로 유지하면 해커가 컴퓨터를 장악하더라도 해킹될 위험이 크게 줄어듭니다.

#### 하드웨어 월렛 사용해 보기: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### 전송 전 트랜잭션 다시 확인하기 {#double-check-transactions}

잘못된 지갑 주소로 암호화폐를 실수로 보내는 것은 흔한 실수입니다. **이더리움에서 전송된 트랜잭션은 되돌릴 수 없습니다.** 주소 소유자를 알고 있고 자금을 돌려달라고 설득할 수 없는 한, 자금을 회수할 수 없습니다.

트랜잭션을 전송하기 전에 항상 전송하려는 주소가 원하는 수신자의 주소와 정확히 일치하는지 확인하세요.
스마트 컨트랙트와 상호작용할 때는 서명하기 전에 트랜잭션 메시지를 읽어보는 것이 좋은 습관입니다.

### 스마트 컨트랙트 지출 한도 설정하기 {#spend-limits}

스마트 컨트랙트와 상호작용할 때 무제한 지출 한도를 허용하지 마세요. 무제한 지출을 허용하면 스마트 컨트랙트가 지갑의 자산을 모두 빼낼 수 있습니다. 대신 트랜잭션에 필요한 금액만큼만 지출 한도를 설정하세요.

많은 이더리움 지갑은 계정 자산이 유출되는 것을 방지하기 위해 한도 보호 기능을 제공합니다.

[암호화폐 자산에 대한 스마트 컨트랙트 접근 권한을 취소하는 방법](/guides/how-to-revoke-token-access/)

<Divider />

## 흔한 스캠 {#common-scams}

스캐머를 완전히 막는 것은 불가능하지만, 그들이 가장 많이 사용하는 수법을 인지함으로써 피해를 줄일 수 있습니다. 이러한 스캠에는 여러 변형이 있지만, 일반적으로 동일한 큰 틀의 패턴을 따릅니다. 다른 것은 몰라도 다음 사항은 꼭 기억하세요.

- 항상 의심하세요.
- 그 누구도 무료나 할인된 가격으로 ETH를 주지 않습니다.
- 그 누구도 여러분의 개인 키나 개인 정보에 접근할 필요가 없습니다.

### 트위터 광고 피싱 {#ad-phishing}

![Twitter link phishing](./twitterPhishingScam.png)

트위터(X라고도 함)의 링크 미리보기 기능(언펄링)을 스푸핑하여 사용자가 합법적인 웹사이트를 방문하고 있다고 착각하게 만드는 수법이 있습니다. 이 기법은 트윗에 공유된 URL의 미리보기를 생성하는 트위터의 메커니즘을 악용하여, 실제로는 악성 사이트로 리디렉션되면서도 예를 들어 _from ethereum.org_(위 사진 참고)처럼 표시되게 합니다.

특히 링크를 클릭한 후에는 항상 올바른 도메인에 접속해 있는지 확인하세요.

[자세한 정보는 여기를 참고하세요](https://harrydenley.com/faking-twitter-unfurling).

### 경품 스캠 {#giveaway}

암호화폐에서 가장 흔한 스캠 중 하나는 경품 스캠입니다. 경품 스캠은 여러 형태를 띨 수 있지만, 제공된 지갑 주소로 ETH를 보내면 보낸 ETH의 두 배를 돌려준다는 것이 일반적인 내용입니다. *이러한 이유로 2-for-1 스캠이라고도 불립니다.*

이러한 스캠은 대개 경품을 청구할 수 있는 기회를 제한된 시간으로 명시하여 거짓된 긴박감을 조성합니다.

### 소셜 미디어 해킹 {#social-media-hacks}

2020년 7월, 유명 인사와 기관의 트위터 계정이 해킹당하면서 이 스캠의 대규모 버전이 발생했습니다. 해커는 해킹된 계정들에 동시에 비트코인 경품 행사를 게시했습니다. 기만적인 트윗은 금방 발견되어 삭제되었지만, 해커들은 여전히 11 비트코인(2021년 9월 기준 50만 달러)을 탈취하는 데 성공했습니다.

![A scam on Twitter](./appleTwitterScam.png)

### 유명인 경품 행사 {#celebrity-giveaway}

유명인 경품 행사는 경품 스캠이 취하는 또 다른 흔한 형태입니다. 스캐머들은 유명인의 녹화된 비디오 인터뷰나 컨퍼런스 강연을 가져와 유튜브에서 라이브 스트리밍하여, 마치 해당 유명인이 암호화폐 경품 행사를 지지하는 라이브 비디오 인터뷰를 하는 것처럼 보이게 만듭니다.

비탈릭 부테린이 이 스캠에 가장 자주 이용되지만, 암호화폐와 관련된 다른 많은 유명 인사들(예: 일론 머스크나 찰스 호스킨슨)도 이용됩니다. 잘 알려진 인물을 포함시키면 스캐머의 라이브 스트림에 정당성이 부여됩니다(의심스러워 보이지만 비탈릭이 참여했으니 괜찮을 거야!).

**경품 행사는 항상 스캠입니다. 이러한 계정으로 자금을 보내면 영원히 잃게 됩니다.**

![A scam on YouTube](./youtubeScam.png)

### 지원 스캠 {#support-scams}

암호화폐는 비교적 초기 단계이며 오해를 많이 받는 기술입니다. 이를 악용하는 흔한 스캠이 바로 지원 스캠으로, 스캐머들은 인기 있는 지갑, 거래소 또는 블록체인의 지원 담당자를 사칭합니다.

이더리움에 대한 많은 논의는 디스코드에서 이루어집니다. 지원 스캐머들은 일반적으로 공개 디스코드 채널에서 지원 관련 질문을 검색하여 타겟을 찾은 다음, 질문자에게 지원을 제안하는 개인 메시지를 보냅니다. 신뢰를 쌓은 후, 지원 스캐머들은 여러분을 속여 개인 키를 알아내거나 자신들의 지갑으로 자금을 보내도록 유도합니다.

![A support scam on Discord](./discordScam.png)

원칙적으로 직원은 비공식적인 개인 채널을 통해 여러분과 소통하지 않습니다. 지원팀과 소통할 때 명심해야 할 몇 가지 간단한 사항은 다음과 같습니다.

- 개인 키, 시드 구문 또는 비밀번호를 절대 공유하지 마세요.
- 그 누구에게도 컴퓨터에 대한 원격 접속을 허용하지 마세요.
- 조직의 지정된 채널 외부에서 소통하지 마세요.

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    주의: 지원 형태의 스캠은 디스코드에서 흔히 발생하지만, 이메일을 포함하여 암호화폐 논의가 이루어지는 모든 채팅 애플리케이션에서도 빈번하게 발생할 수 있습니다.
</AlertDescription>
</AlertContent>
</Alert>

### '이더2' 토큰 스캠 {#eth2-token-scam}

[머지](/roadmap/merge/)를 앞두고 스캐머들은 '이더2'라는 용어를 둘러싼 혼란을 틈타 사용자들이 자신의 ETH를 'ETH2' 토큰으로 교환하도록 유도했습니다. 'ETH2'는 존재하지 않으며, 머지와 함께 도입된 다른 합법적인 토큰도 없습니다. 머지 이전에 소유했던 ETH는 지금의 ETH와 동일합니다. **작업증명 (PoW)에서 지분 증명 (PoS)으로의 전환을 위해 ETH와 관련된 어떠한 조치도 취할 필요가 없습니다**.

스캐머들은 "지원팀"으로 위장하여 ETH를 입금하면 'ETH2'를 돌려받을 것이라고 말할 수 있습니다. [공식 이더리움 지원팀](/community/support/)은 존재하지 않으며, 새로운 토큰도 없습니다. 지갑 시드 구문을 절대 누구와도 공유하지 마세요.

_참고: 스테이킹된 ETH를 나타내는 파생 토큰/티커(예: Rocket Pool의 rETH, 리도의 stETH, 코인베이스의 ETH2)가 있지만, 이는 "마이그레이션"해야 하는 대상이 아닙니다._

### 피싱 스캠 {#phishing-scams}

피싱 스캠은 스캐머들이 지갑의 자산을 훔치기 위해 점점 더 흔하게 사용하는 또 다른 수법입니다.

일부 피싱 이메일은 사용자가 링크를 클릭하도록 유도하여 모방 웹사이트로 리디렉션한 다음, 시드 구문을 입력하거나 비밀번호를 재설정하거나 ETH를 보내도록 요구합니다. 또 다른 경우에는 사용자가 모르는 사이에 악성 코드를 설치하도록 유도하여 컴퓨터를 감염시키고 스캐머가 컴퓨터 파일에 접근할 수 있게 만듭니다.

알 수 없는 발신자로부터 이메일을 받으면 다음을 기억하세요.

- 모르는 이메일 주소에서 온 링크나 첨부 파일을 절대 열지 마세요.
- 개인 정보나 비밀번호를 절대 누구에게도 누설하지 마세요.
- 알 수 없는 발신자로부터 온 이메일은 삭제하세요.

[피싱 스캠 예방에 대한 자세한 정보](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### 암호화폐 거래 브로커 스캠 {#broker-scams}

스캠 암호화폐 거래 브로커는 자신을 전문 암호화폐 브로커라고 주장하며 여러분의 돈을 받아 대신 투자해 주겠다고 제안합니다. 스캐머는 자금을 받은 후, 추가 투자 수익을 놓치지 않도록 더 많은 자금을 보내라고 유도하거나 완전히 잠적해 버릴 수 있습니다.

이러한 사기꾼들은 종종 유튜브에서 가짜 계정을 사용하여 '브로커'에 대한 자연스러워 보이는 대화를 시작함으로써 타겟을 찾습니다. 이러한 대화는 정당성을 높이기 위해 많은 추천을 받기도 하지만, 추천은 모두 봇 계정에서 온 것입니다.

**인터넷에서 만난 낯선 사람이 대신 투자해 주겠다는 말을 믿지 마세요. 암호화폐를 잃게 됩니다.**

![A trading broker scam on YouTube](./brokerScam.png)

### 암호화폐 채굴 풀 스캠 {#mining-pool-scams}

2022년 9월부로 이더리움에서의 채굴은 더 이상 불가능합니다. 하지만 채굴 풀 스캠은 여전히 존재합니다. 채굴 풀 스캠은 사람들이 일방적으로 연락하여 이더리움 채굴 풀에 가입하면 큰 수익을 올릴 수 있다고 주장하는 방식입니다. 스캐머는 주장을 펼치며 시간이 얼마나 걸리든 계속 연락을 취할 것입니다. 본질적으로 스캐머는 이더리움 채굴 풀에 가입하면 여러분의 암호화폐가 ETH를 생성하는 데 사용되고 ETH 배당금을 받게 될 것이라고 설득하려 할 것입니다. 그런 다음 암호화폐가 소액의 수익을 내는 것을 보여줄 것입니다. 이는 단순히 더 많은 투자를 유도하기 위한 미끼일 뿐입니다. 결국 모든 자산은 알 수 없는 주소로 전송되고, 스캐머는 잠적하거나 최근 사례처럼 계속 연락을 유지하는 경우도 있습니다.

결론: 소셜 미디어에서 채굴 풀에 참여하라고 연락하는 사람들을 조심하세요. 암호화폐를 한 번 잃으면 되찾을 수 없습니다.

기억해야 할 몇 가지 사항:

- 암호화폐로 돈을 버는 방법에 대해 연락하는 사람을 조심하세요.
- 스테이킹, 유동성 풀 또는 기타 암호화폐 투자 방법에 대해 스스로 조사하세요.
- 이러한 수법이 합법적인 경우는 거의 없습니다. 만약 합법적이었다면 이미 주류가 되어 여러분도 들어보았을 것입니다.

[채굴 풀 스캠으로 20만 달러를 잃은 남성](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### 에어드롭 스캠 {#airdrop-scams}

에어드롭 스캠은 스캠 프로젝트가 지갑에 자산(NFT, 토큰)을 에어드롭하고, 에어드롭된 자산을 청구하도록 스캠 웹사이트로 유도하는 방식입니다. 청구를 시도할 때 이더리움 지갑으로 로그인하고 트랜잭션을 "승인"하라는 메시지가 표시됩니다. 이 트랜잭션은 공개 키와 개인 키를 스캐머에게 전송하여 계정을 손상시킵니다. 이 스캠의 다른 형태로는 스캐머의 계정으로 자금을 보내는 트랜잭션을 확인하도록 유도하는 경우도 있습니다.

[에어드롭 스캠에 대한 자세한 정보](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## 웹 보안 기초 {#web-security}

### 강력한 비밀번호 사용하기 {#use-strong-passwords}

[계정 해킹의 80% 이상은 취약하거나 도난당한 비밀번호로 인해 발생합니다](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). 문자, 숫자, 기호의 긴 조합은 계정을 안전하게 유지하는 데 도움이 됩니다.

흔한 실수 중 하나는 몇 가지 흔하고 연관된 단어의 조합을 사용하는 것입니다. 이러한 비밀번호는 사전 공격(dictionary attack)이라는 해킹 기법에 취약하기 때문에 안전하지 않습니다.

```md
취약한 비밀번호의 예: CuteFluffyKittens!

강력한 비밀번호의 예: ymv\*azu.EAC8eyp8umf
```

또 다른 흔한 실수는 쉽게 추측하거나 [사회공학적 기법](<https://wikipedia.org/wiki/Social_engineering_(security)>)을 통해 알아낼 수 있는 비밀번호를 사용하는 것입니다. 어머니의 결혼 전 성, 자녀나 반려동물의 이름, 생년월일을 비밀번호에 포함하면 해킹될 위험이 커집니다.

#### 좋은 비밀번호 습관: {#good-password-practices}

- 비밀번호 생성기나 입력 양식에서 허용하는 한 최대한 길게 만드세요.
- 대문자, 소문자, 숫자, 기호를 혼합하여 사용하세요.
- 가족 이름과 같은 개인 정보를 비밀번호에 사용하지 마세요.
- 흔한 단어는 피하세요.

[강력한 비밀번호 생성에 대한 자세한 정보](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### 모든 곳에 고유한 비밀번호 사용하기 {#use-unique-passwords}

데이터 유출로 공개된 강력한 비밀번호는 더 이상 강력한 비밀번호가 아닙니다. [Have I Been Pwned](https://haveibeenpwned.com) 웹사이트에서는 여러분의 계정이 공개적인 데이터 유출에 포함되었는지 확인할 수 있습니다. 만약 포함되었다면 **즉시 해당 비밀번호를 변경하세요**. 모든 계정에 고유한 비밀번호를 사용하면 비밀번호 하나가 유출되더라도 해커가 모든 계정에 접근할 위험을 낮출 수 있습니다.

### 비밀번호 관리자 사용하기 {#use-password-manager}

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
    비밀번호 관리자를 사용하면 강력하고 고유한 비밀번호를 생성하고 기억하는 번거로움을 덜 수 있습니다! 비밀번호 관리자 사용을 <strong>강력히</strong> 권장하며, 대부분 무료로 제공됩니다!
</AlertDescription>
</AlertContent>
</Alert>

모든 계정에 대해 강력하고 고유한 비밀번호를 기억하는 것은 이상적이지 않습니다. 비밀번호 관리자는 하나의 강력한 마스터 비밀번호를 통해 접근할 수 있는 안전하고 암호화된 비밀번호 저장소를 제공합니다. 또한 새로운 서비스에 가입할 때 강력한 비밀번호를 제안해 주므로 직접 만들 필요가 없습니다. 많은 비밀번호 관리자는 데이터 유출에 연루되었는지 여부도 알려주어 악의적인 공격이 발생하기 전에 비밀번호를 변경할 수 있도록 도와줍니다.

![Example of using a password manager](./passwordManager.png)

#### 비밀번호 관리자 사용해 보기: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- 또는 다른 [추천 비밀번호 관리자](https://www.privacytools.io/secure-password-manager) 확인하기

### 이중 인증(2FA) 사용하기 {#two-factor-authentication}

때로는 고유한 증명을 통해 신원을 인증하라는 요청을 받을 수 있습니다. 이를 **요소(factors)**라고 합니다. 세 가지 주요 요소는 다음과 같습니다.

- 알고 있는 것(비밀번호나 보안 질문 등)
- 자신의 생체 정보(지문이나 홍채/안면 인식기 등)
- 소유하고 있는 것(보안 키나 휴대폰의 인증 앱)

**이중 인증(2FA)**을 사용하면 온라인 계정에 추가적인 *보안 요소*가 제공됩니다. 2FA는 비밀번호만으로는 계정에 접근할 수 없도록 보장합니다. 가장 일반적인 두 번째 요소는 **시간 기반 일회용 비밀번호(TOTP)**로 알려진 무작위 6자리 코드로, 구글 OTP(Google Authenticator)나 Authy와 같은 인증 앱을 통해 접근할 수 있습니다. 시간 제한 코드를 생성하는 시드가 기기에 저장되어 있기 때문에 이는 "소유하고 있는 것" 요소로 작동합니다.

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    참고: SMS 기반 2FA를 사용하는 것은 <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">심 재킹(SIM jacking)</a>에 취약하며 안전하지 않습니다. 최상의 보안을 위해 <a href="https://mashable.com/article/how-to-set-up-google-authenticator">구글 OTP(Google Authenticator)</a>나 <a href="https://authy.com/">Authy</a>와 같은 서비스를 사용하세요.
</AlertDescription>
</AlertContent>
</Alert>

#### 보안 키 {#security-keys}

보안 키는 더 발전되고 안전한 형태의 2FA입니다. 보안 키는 인증 앱처럼 작동하는 물리적 하드웨어 인증 기기입니다. 보안 키를 사용하는 것은 2FA를 위한 가장 안전한 방법입니다. 이러한 키의 대부분은 FIDO U2F(Universal 2nd Factor) 표준을 활용합니다. [FIDO U2F에 대해 자세히 알아보기](https://www.yubico.com/resources/glossary/fido-u2f/).

2FA에 대해 더 알아보기:

<VideoWatch slug="crypto-security-passwords" startTime="3479" />

### 브라우저 확장 프로그램 제거하기 {#uninstall-browser-extensions}

크롬 확장 프로그램이나 파이어폭스 애드온과 같은 브라우저 확장 프로그램은 브라우저 기능을 향상시킬 수 있지만 위험도 따릅니다. 기본적으로 대부분의 브라우저 확장 프로그램은 '사이트 데이터 읽기 및 변경' 권한을 요구하여 여러분의 데이터로 거의 모든 작업을 수행할 수 있게 합니다. 크롬 확장 프로그램은 항상 자동으로 업데이트되므로, 이전에 안전했던 확장 프로그램이 나중에 악성 코드를 포함하도록 업데이트될 수 있습니다. 대부분의 브라우저 확장 프로그램은 데이터를 훔치려 하지 않지만, 그럴 가능성이 있다는 점을 인지해야 합니다.

#### 안전을 유지하는 방법: {#browser-extension-safety}

- 신뢰할 수 있는 출처의 브라우저 확장 프로그램만 설치하기
- 사용하지 않는 브라우저 확장 프로그램 제거하기
- 자동 업데이트를 중지하기 위해 크롬 확장 프로그램을 로컬에 설치하기(고급)

[브라우저 확장 프로그램의 위험성에 대한 자세한 정보](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## 더 읽어보기 {#further-reading}

### 웹 보안 {#reading-web-security}

- [악성 코드가 포함된 크롬 및 엣지 애드온에 감염된 최대 300만 대의 기기](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [잊어버리지 않는 강력한 비밀번호를 만드는 방법](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [보안 키란 무엇인가요?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _코인베이스_

### 암호화폐 보안 {#reading-crypto-security}

- [자신과 자산 보호하기](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [일반적인 암호화폐 통신 소프트웨어의 보안 문제](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) - _Salus_
- [초보자와 전문가를 위한 보안 가이드](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [암호화폐 보안: 비밀번호 및 인증](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### 스캠 교육 {#reading-scam-education}

- [가이드: 스캠 토큰을 식별하는 방법](/guides/how-to-id-scam-tokens/)
- [안전 유지하기: 흔한 스캠](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [스캠 피하기](https://bitcoin.org/en/scams) - _Bitcoin.org_
- [흔한 암호화폐 피싱 이메일 및 메시지에 대한 트위터 스레드](https://twitter.com/tayvano_/status/1516225457640787969) - _Taylor Monahan_

<QuizWidget quizKey="security" />