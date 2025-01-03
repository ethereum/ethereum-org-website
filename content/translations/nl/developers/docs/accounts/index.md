---
title: Ethereum-accounts
description: 'Een uitleg van Ethereum-accounts: hun gegevensstructuren en hun relatie met sleutelpaarcryptografie.'
lang: nl
---

Een Ethereum-account is een entiteit met een ethersaldo (ETH) die transacties kan versturen op Ethereum. Accounts kunnen worden beheerd door de gebruiker of worden ingezet als smart contracts.

## Vereisten {#prerequisites}

Om deze pagina beter te begrijpen, raden we u aan om eerst onze [Inleiding tot Ethereum](/developers/docs/intro-to-ethereum/) door te lezen.

## Accounttypes {#types-of-account}

Ethereum heeft twee accounttypes:

- Account in externe eigendom (EOA): beheerd door eender wie met de persoonlijke sleutels
- Contractaccount: een smart contract dat ingezet wordt op het netwerk en bestuurd wordt door een code. Meer informatie over [smart contracts](/developers/docs/smart-contracts/)

Beide accounttypes hebben de mogelijkheid om:

- ETH en tokens te ontvangen, bewaren en versturen
- te interageren met ingezette smart contracts

### Belangrijke verschillen {#key-differences}

**Externe eigendom**

- Een account aanmaken kost niets
- Kan transacties starten
- Transacties tussen accounts in externe eigendom kunnen alleen ETH/token-overdrachten zijn
- Bestaat uit een cryptografisch sleutelpaar: publieke en persoonlijke sleutels die accountactiviteiten beheren

**Contract**

- Het aanmaken van een contract heeft kosten omdat u gebruik maakt van netwerkopslag
- Kan alleen transacties verzenden als reactie op het ontvangen van een transactie
- Transacties van een extern account naar een contractaccount kunnen code triggeren die veel verschillende acties kan uitvoeren, zoals het overmaken van tokens of zelfs het aanmaken van een nieuw contract
- Contractaccounts hebben geen persoonlijke sleutels. In plaats daarvan worden ze beheerd door de logica van de smart contract-code

## Een account in detail {#an-account-examined}

Ethereum-accounts hebben vier velden:

- `nonce`: een teller die het aantal transacties aangeeft dat is verzonden vanaf een account in externe eigendom of het aantal contracten dat is aangemaakt door een contractaccount. Er kan slechts één transactie met een gegeven nonce worden uitgevoerd voor elk account, wat bescherming biedt tegen replay-aanvallen waarbij ondertekende transacties herhaaldelijk worden uitgezonden en opnieuw uitgevoerd.
- `balance`: het aantal wei dat eigendom is van dit adres. Wei is een benaming van ETH en er zijn 1e+18 wei per ETH.
- `codeHash`: deze hash verwijst naar de _code_ van een account op de Ethereum Virtual Machine (EVM). Contractaccounts hebben codefragmenten geprogrammeerd die verschillende bewerkingen kunnen uitvoeren. Deze EVM-code wordt uitgevoerd als het account een berichtoproep krijgt. Dit kan niet worden gewijzigd, in tegenstelling tot de andere accountvelden. Al deze codefragmenten worden opgeslagen in de statusdatabase onder hun overeenkomstige hashes zodat ze later teruggevonden kunnen worden. Deze hashwaarde staat bekend als een codeHash. Voor accounts die in externe eigendom zijn, is het codeHash-veld de hash van een lege string.
- `storageRoot`: soms bekend als opslaghash. Een 256-bits hash van de wortel (root)-node van een Merkle Patricia trie die de opslaginhoud van het account codeert (een mapping tussen 256-bits integerwaarden), gecodeerd in de trie als een mapping van de Keccak 256-bit hash van de 256-bit integersleutels naar de RLP-gecodeerde 256-bit integerwaarden. Deze trie codeert de hash van de opslaginhoud van dit account en is standaard leeg.

![Een diagram dat de opbouw van een account weergeeft](./accounts.png) _Aangepast diagram van [Ethereum EVM geïllustreerd](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Accounts in externe eigendom en sleutelparen {#externally-owned-accounts-and-key-pairs}

Een account bestaat uit een paar cryptografische sleutels: een publieke en een persoonlijke. Ze helpen bewijzen dat een transactie daadwerkelijk door de afzender is ondertekend en voorkomen vervalsingen. Uw persoonlijke sleutel is wat u gebruikt om transacties te ondertekenen, dus het geeft u het gezag over de middelen die zijn gekoppeld aan uw account. U heeft nooit daadwerkelijk cryptovaluta in uw bezit, maar wel persoonlijke sleutels. Het geld staat altijd op de ledger van Ethereum.

Dit voorkomt dat kwaadwillende actoren neptransacties uitzenden, omdat u altijd de afzender van een transactie kunt nagaan.

Als Alice ether van haar eigen account naar het account van Bob wil sturen, moet Alice een transactieverzoek aanmaken en dit ter verificatie naar het netwerk sturen. Het gebruik van cryptografie met een openbare sleutel in Ethereum zorgt ervoor dat Alice kan bewijzen dat ze het transactieverzoek oorspronkelijk heeft gestart. Zonder cryptografische mechanismen zou een kwaadwillende tegenstander Eve gewoon publiekelijk een verzoek kunnen uitzenden dat er ongeveer uitziet als “stuur 5 ETH van Alice's account naar Eve's account,” en niemand zou kunnen verifiëren dat het niet van Alice komt.

## Account aanmaken {#account-creation}

Wanneer u een account wilt aanmaken, zullen de meeste bibliotheken een willekeurige persoonlijke sleutel voor u genereren.

Een persoonlijke sleutel bestaat uit 64 hexadecimale tekens en kan worden versleuteld met een wachtwoord.

Voorbeeld:

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

De publieke sleutel wordt gegenereerd via de persoonlijke sleutel via het [Elliptic Curve Digital Signature Algorithm](https://wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). U krijgt een openbaar adres voor uw account door de laatste 20 bytes van de Keccak-256 hash van de openbare sleutel te nemen en `0x` toe te voegen aan het begin.

Dit betekent dat een account in externe eigendom (EOA) een adres van 42 tekens heeft (een segment van 20 bytes dat bestaat uit 40 hexadecimale tekens plus de prefix `0x`).

Voorbeeld:

`0x5e97870f263700f46aa00d967821199b9bc5a120`

Het volgende voorbeeld toont hoe een ondertekeningstool met de naam [Clef](https://geth.ethereum.org/docs/tools/clef/introduction) gebruikt kan worden om een nieuw account aan te maken. Clef is een tool voor accountbeheer en ondertekening die gebundeld is met de Ethereum-client, [Geth](https://geth.ethereum.org). Het `clef newaccount` commando maakt een nieuw sleutelpaar aan en slaat deze op in een versleutelde keystore.

```
> clef newaccount --keystore <path>

Please enter a password for the new account to be created:
> <password>

------------
INFO [10-28|16:19:09.156] Your new key was generated       address=0x5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Please backup your key file      path=/home/user/go-ethereum/data/keystore/UTC--2022-10-28T15-19-08.000825927Z--5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Please remember your password!
Generated account 0x5e97870f263700f46aa00d967821199b9bc5a120
```

[Geth-documentatie](https://geth.ethereum.org/docs)

Het is mogelijk om nieuwe publieke sleutels af te leiden van uw persoonlijke sleutel, maar u kunt geen persoonlijke sleutel afleiden van publieke sleutels. Het is van cruciaal belang om uw persoonlijke sleutels veilig te bewaren en, zoals de naam al zegt, **PERSOONLIJK**.

U hebt een persoonlijke sleutel nodig om berichten en transacties met een handtekening te ondertekenen. Anderen kunnen vervolgens de handtekening gebruiken om uw openbare sleutel af te leiden en zo de auteur van het bericht te bewijzen. In uw applicatie kunt u een JavaScript-bibliotheek gebruiken om transacties naar het netwerk te sturen.

## Contractaccounts {#contract-accounts}

Contractaccounts hebben ook een hexadecimaal adres van 42 tekens:

Voorbeeld:

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

Het contractadres wordt meestal gegeven wanneer een contract wordt ingezet op de Ethereum-blockchain. Het adres is afkomstig van het adres van de maker en het aantal transacties dat vanaf dat adres is verstuurd (de “nonce”).

## Validatorsleutels {#validators-keys}

Er is ook een ander type sleutel in Ethereum, dat geïntroduceerd werd toen Ethereum overschakelde van consensus op basis van proof-of-work naar proof-of-stake. Dit zijn 'BLS'-sleutels en ze worden gebruikt om validators te identificeren. Deze sleutels kunnen efficiënt worden samengevoegd om de bandbreedte te verminderen die het netwerk nodig heeft om tot een consensus te komen. Zonder deze sleutelaggregatie zou de minimale stake voor een validator veel hoger zijn.

[Meer over validatorsleutels](/developers/docs/consensus-mechanisms/pos/keys/).

## Een opmerking over wallets {#a-note-on-wallets}

Een account is geen wallet. Een wallet is een interface of applicatie waarmee u kunt communiceren met uw Ethereum-account, hetzij een account in externe eigendom of een contractaccount.

## Een visuele demo {#a-visual-demo}

Austin leidt u door de hashfuncties en sleutelparen.

<YouTube id="QJ010l-pBpE" />

<YouTube id="9LtBDy67Tho" />

## Verder lezen {#further-reading}

- [Ethereum-accounts begrijpen](https://info.etherscan.com/understanding-ethereum-accounts/) - etherscan

_Weet je van een community resource die je heeft geholpen? Bewerk deze pagina en voeg het toe!_

## Gerelateerde onderwerpen {#related-topics}

- [Smart Contracts](/developers/docs/smart-contracts/)
- [Transacties](/developers/docs/transactions/)
