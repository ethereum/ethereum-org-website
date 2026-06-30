---
title: 사기를 당했거나 자금을 잃었습니다
metaTitle: 사기 피해 지원 및 신고
description: 사기를 당했을 때 대처 방법, 남은 자산을 안전하게 보호하는 방법, 사기 신고처에 대해 알아봅니다.
lang: ko
---

암호화폐 사기는 금융 및 기술 분야의 전문가를 포함하여 모든 경험 수준의 사람들을 표적으로 삼습니다. 여러분만 겪는 일이 아니며, 이곳을 찾아오신 것은 올바른 첫걸음입니다.

<Alert variant="error">
<AlertEmoji text=":rotating_light:"/>
<AlertContent>
<AlertDescription>

**누구도 블록체인 트랜잭션을 되돌릴 수 없습니다.** 수수료를 내면 자금을 복구해 주겠다고 연락하는 사람이 있다면, 이는 거의 확실하게 2차 사기입니다. 아래의 [복구 사기](#scam-types) 섹션을 참조하세요.

</AlertDescription>
</AlertContent>
</Alert>

## 남은 자산 보호하기 {#secure-assets}

사기꾼과 상호작용했거나 지갑이 손상되었다고 의심되는 경우, 즉시 다음 조치를 취하세요.

1. 사기꾼이 접근할 수 없는 새롭고 안전한 지갑으로 **남은 자금을 이동하세요**
2. **토큰 승인을 취소하세요.** 사기꾼은 종종 무제한 토큰 지출을 승인하도록 속입니다. 이러한 권한을 취소하면 지갑에서 자금이 추가로 빠져나가는 것을 막을 수 있습니다
3. 연결되어 있을 수 있는 모든 거래소 계정의 **비밀번호를 변경하세요**
4. 모든 암호화폐 관련 계정에서 **이중 인증(2FA)을 활성화하세요**

### 토큰 승인 취소 방법 {#revoke-approvals}

탈중앙화 애플리케이션 (dapp)이나 스마트 컨트랙트와 상호작용할 때, 해당 컨트랙트가 토큰을 지출할 수 있도록 권한을 부여했을 수 있습니다. 사기꾼에게 속아 악의적인 컨트랙트를 승인했다면, 초기 사기 이후에도 계속해서 토큰을 빼갈 수 있습니다.

다음 도구를 사용하여 승인 내역을 확인하고 취소하세요.

- [Revoke.cash](https://revoke.cash/): 지갑을 연결하여 활성화된 모든 승인 내역을 확인하고 취소합니다
- [Revokescout](https://revoke.blockscout.com/): Blockscout를 통해 승인 내역을 확인하고 취소합니다
- [Etherscan Token Approval Checker](https://etherscan.io/tokenapprovalchecker): Etherscan을 통해 승인 내역을 확인하고 취소합니다

<DocLink href="/guides/how-to-revoke-token-access/">
  단계별 가이드: 토큰 접근 권한 취소 방법
</DocLink>

## 사기 주소 및 웹사이트 신고하기 {#report}

신고는 다른 사용자에게 경고하는 데 도움이 되며 법 집행 기관의 조사에 도움이 될 수 있습니다. 트랜잭션 해시, 지갑 주소, 스크린샷, 사기꾼과의 모든 대화 내용 등 모든 것을 기록해 두세요.

### 사기 주소 신고하기 {#report-address}

- [Chainabuse](https://www.chainabuse.com/): 커뮤니티 주도의 사기 및 부정행위 신고 데이터베이스입니다. 신고서를 제출하고 알려진 사기 주소를 검색할 수 있습니다
- [Etherscan 신고](https://info.etherscan.com/report-address/): 가장 많이 사용되는 이더리움 블록 탐색기에서 주소를 신고합니다
- [CryptoScamDB](https://cryptoscamdb.org/): 암호화폐 사기를 추적하는 오픈 소스 데이터베이스입니다

### 사기 웹사이트 또는 소셜 미디어 계정 신고하기 {#report-website}

- [PhishTank](https://phishtank.org/): 피싱 URL을 제출하고 확인합니다
- [Google 세이프 브라우징](https://safebrowsing.google.com/safebrowsing/report_phish/): 크롬 및 기타 브라우저에서 차단되도록 Google에 피싱 사이트를 신고합니다
- [Netcraft](https://report.netcraft.com/report/mistake): 악성 및 사기성 웹사이트를 신고합니다
- 사기가 발생한 소셜 미디어 플랫폼에 직접 신고하세요 (트위터/X, 디스코드, 텔레그램 모두 신고 기능을 제공합니다)

### 법 집행 기관에 신고하기 {#report-law-enforcement}

- **미국:** [FBI 인터넷 범죄 신고 센터 (IC3)](https://www.ic3.gov/)
- **영국:** [Action Fraud](https://www.actionfraud.police.uk/)
- **유럽 연합:** [유로폴 (Europol)](https://www.europol.europa.eu/report-a-crime)
- **기타 국가:** 관할 지역 경찰에 신고하세요. 암호화폐 사기는 대부분의 관할권에서 범죄에 해당합니다

## 발생한 상황 분석하기 {#analyze}

자금이 어디로 이동했는지 파악하면 신고에 도움이 되며, 자금이 중앙화된 거래소로 유입된 경우 복구 노력에 도움이 될 수 있습니다.

- [Blockscout](https://eth.blockscout.com/): 트랜잭션 해시나 지갑 주소를 검색하여 자금이 어디로 전송되었는지 확인할 수 있는 오픈 소스 블록 탐색기입니다
- [Etherscan](https://etherscan.io/): 트랜잭션 해시나 지갑 주소를 검색하여 자금이 어디로 전송되었는지 확인합니다
- [Chainabuse 조회](https://www.chainabuse.com/): 다른 피해자가 이미 해당 주소를 신고했는지 확인합니다
- BlockSec의 [MetaSleuth](https://metasleuth.io/): 자금 흐름을 매핑하는 시각적 트랜잭션 추적 도구입니다

**자금이 중앙화된 거래소(코인베이스, 바이낸스, 크라켄 등)로 전송된 경우**, 즉시 트랜잭션 세부 정보를 첨부하여 해당 거래소의 고객 지원팀에 문의하세요. 거래소는 사기로 신고된 계정을 동결할 수 있는 경우가 있습니다.

## 불편한 진실 {#hard-truth}

이더리움은 탈중앙화된 네트워크이므로, 트랜잭션을 되돌리거나 도난당한 자금을 복구할 수 있는 중앙 기관은 존재하지 않습니다. 트랜잭션이 블록체인에서 한 번 확정되면 그것으로 최종 완료됩니다.

그럼에도 불구하고 신고는 여전히 가치가 있습니다. 신고는 법 집행 기관이 조직적인 사기 조직을 추적하는 데 도움이 되며, Chainabuse 및 Etherscan에 주소를 신고하면 미래의 잠재적 피해자에게 경고할 수 있습니다.

## 주의해야 할 사기 유형 {#scam-types}

<ExpandableCard
title="무료 나눔 및 에어드롭 사기"
contentPreview="아무도 ETH를 무료로 주지 않습니다. 이러한 제안은 항상 사기입니다."
eventCategory="SupportScamPage"
eventName="clicked giveaway scam"
>

사기꾼들은 ETH를 불려주거나 무료 토큰을 주겠다고 약속하는 가짜 경품 행사를 만듭니다. 이들은 종종 비탈릭 부테린과 같은 유명 인사를 사칭합니다. "경품" 주소로 ETH를 보내면 아무것도 돌려받지 못할 것입니다.

**기억하세요:** 비탈릭 부테린이나 다른 유명 인사들은 절대 여러분에게 ETH를 보내라고 요구하지 않습니다.

[일반적인 사기 유형 자세히 알아보기](/security/#common-scams)

</ExpandableCard>

<ExpandableCard
title="사칭 및 가짜 고객 지원"
contentPreview="이더리움이나 ethereum.org의 그 누구도 절대 먼저 연락하지 않습니다."
eventCategory="SupportScamPage"
eventName="clicked impersonation scam"
>

사기꾼들은 디스코드, 텔레그램 및 소셜 미디어에서 이더리움 팀원, 모더레이터 또는 고객 지원 요원을 사칭합니다. 이들은 도움을 주겠다고 하거나 계정에 문제가 있다고 주장하며 다이렉트 메시지(DM)를 보낼 수 있습니다.

**기억하세요:**

- "이더리움 고객 지원팀"은 존재하지 않습니다
- 실제 모더레이터는 절대 먼저 DM을 보내지 않습니다
- 어떤 이유로든 시드 구문이나 개인 키를 다른 사람과 공유하지 마세요
- 원치 않는 메시지로 전송된 링크는 절대 클릭하지 마세요

</ExpandableCard>

<ExpandableCard
title="복구 사기"
contentPreview="사기를 당한 후에는 가짜 '암호화폐 복구 전문가'를 조심하세요."
eventCategory="SupportScamPage"
eventName="clicked recovery scam"
>

복구 사기는 이미 자금을 잃은 사람들을 특별히 표적으로 삼습니다. 사기꾼들은 소셜 미디어에서 사기를 당했다고 이야기하는 사람들을 모니터링한 다음, "블록체인 조사관"이나 "암호화폐 복구 전문가"를 사칭하여 접근합니다.

이들은 선불 수수료를 내면 도난당한 암호화폐를 추적하고 복구해 주겠다고 약속합니다. 수수료를 지불하고 나면 이들은 자취를 감춥니다.

**어떤 합법적인 서비스도 블록체인 트랜잭션을 되돌릴 수 없습니다.** 이를 약속하는 사람은 모두 거짓말을 하는 것입니다. 이는 가장 흔하게 발생하는 2차 사기 중 하나입니다.

</ExpandableCard>

<ExpandableCard
title="피싱 웹사이트 및 가짜 앱"
contentPreview="사기 사이트는 실제 지갑과 거래소를 모방하여 사용자의 인증 정보를 탈취합니다."
eventCategory="SupportScamPage"
eventName="clicked phishing scam"
>

피싱 사이트는 실제 지갑 앱, 거래소 또는 탈중앙화 금융 (DeFi) 플랫폼과 똑같이 생겼습니다. 이들은 시드 구문을 입력하거나 지갑을 연결하도록 속인 다음 자금을 빼돌립니다.

**스스로를 보호하는 방법:**

- 지갑을 연결하기 전에 항상 URL을 확인하세요
- 자주 사용하는 공식 사이트는 북마크해 두세요
- 어떤 웹사이트에도 시드 구문을 입력하지 마세요. 합법적인 앱은 절대 시드 구문을 요구하지 않습니다
- 의심스러운 URL은 [PhishTank](https://phishtank.org/)를 사용하여 확인하세요

<DocLink href="/guides/how-to-id-scam-tokens/">
  사기 토큰 식별 방법
</DocLink>

</ExpandableCard>

<DocLink href="/security/">
  이더리움 보안 및 사기 예방 전체 가이드
</DocLink>
