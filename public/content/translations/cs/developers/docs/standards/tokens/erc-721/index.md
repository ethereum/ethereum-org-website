---
title: "Standard nezaměnitelných tokenů ERC-721"
description: "Zjistěte více o ERC-721, standardu pro nezaměnitelné tokeny (NFT), které představují jedinečná digitální aktiva na Ethereu."
lang: cs
---

## Úvod {#introduction}

**Co je to nezaměnitelný token?**

Nezaměnitelný token (NFT) se používá k jedinečné identifikaci něčeho nebo někoho. Tento typ tokenu je ideální pro použití na platformách, které nabízejí sběratelské předměty, přístupové klíče, losy, číslovaná sedadla na koncerty a sportovní zápasy atd. Tento speciální typ tokenu má úžasné možnosti, takže si zaslouží pořádný standard, a právě to přišel vyřešit ERC-721!

**Co je ERC-721?**

ERC-721 zavádí standard pro NFT, jinými slovy, tento typ tokenu je jedinečný a může mít jinou hodnotu než jiný token ze stejného chytrého kontraktu, možná kvůli svému stáří, vzácnosti nebo dokonce něčemu jinému, jako je jeho vzhled. Počkat, vzhled?

Ano! Všechna NFT mají proměnnou `uint256` nazvanou `tokenId`, takže pro jakýkoli kontrakt ERC-721 musí být dvojice `contract address, uint256 tokenId` globálně jedinečná. To znamená, že decentralizovaná aplikace (dapp) může mít „převodník“, který používá `tokenId` jako vstup a na výstupu vytvoří obrázek něčeho skvělého, jako jsou zombie, zbraně, dovednosti nebo úžasná koťátka!

## Předpoklady {#prerequisites}

- [Účty](/developers/docs/accounts/)
- [Chytré kontrakty](/developers/docs/smart-contracts/)
- [Standardy tokenů](/developers/docs/standards/tokens/)

## Hlavní část {#body}

ERC-721 ([Ethereum](/) Request for Comments 721), který navrhli William Entriken, Dieter Shirley, Jacob Evans a Nastassia Sachs v lednu 2018, je standard nezaměnitelných tokenů, který implementuje API pro tokeny v rámci chytrých kontraktů.

Poskytuje funkce, jako je převod tokenů z jednoho účtu na druhý, získání aktuálního zůstatku tokenů na účtu, zjištění vlastníka konkrétního tokenu a také celkové nabídky tokenu dostupné v síti. Kromě toho má také některé další funkce, jako je schválení toho, že určité množství tokenů z účtu může být přesunuto účtem třetí strany.

Pokud chytrý kontrakt implementuje následující metody a události, může být nazýván kontraktem nezaměnitelných tokenů ERC-721 a po nasazení bude zodpovědný za sledování vytvořených tokenů na Ethereu.

Z [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

### Metody {#methods}

```solidity
    function balanceOf(address _owner) external view returns (uint256);
    function ownerOf(uint256 _tokenId) external view returns (address);
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function transferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function approve(address _approved, uint256 _tokenId) external payable;
    function setApprovalForAll(address _operator, bool _approved) external;
    function getApproved(uint256 _tokenId) external view returns (address);
    function isApprovedForAll(address _owner, address _operator) external view returns (bool);
```

### Události {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### Příklady {#web3py-example}

Pojďme se podívat, jak je standard důležitý pro to, aby nám usnadnil zkoumání jakéhokoli kontraktu tokenu ERC-721 na Ethereu. K vytvoření rozhraní pro jakýkoli token ERC-721 potřebujeme pouze aplikační binární rozhraní (ABI) kontraktu. Jak můžete vidět níže, použijeme zjednodušené ABI, aby to byl snadno pochopitelný příklad.

#### Příklad ve Web3.py {#web3py-example-2}

Nejprve se ujistěte, že máte nainstalovanou knihovnu [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) pro Python:

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # Kontrakt CryptoKitties

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # Prodejní aukce CryptoKitties

# Toto je zjednodušené aplikační binární rozhraní kontraktu (ABI) pro NFT kontrakt ERC-721.
# Zpřístupní pouze metody: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
simplified_abi = [
    {
        'inputs': [{'internalType': 'address', 'name': 'owner', 'type': 'address'}],
        'name': 'balanceOf',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'name',
        'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [{'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256'}],
        'name': 'ownerOf',
        'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'symbol',
        'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'totalSupply',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
]

ck_extra_abi = [
    {
        'inputs': [],
        'name': 'pregnantKitties',
        'outputs': [{'name': '', 'type': 'uint256'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [{'name': '_kittyId', 'type': 'uint256'}],
        'name': 'isPregnant',
        'outputs': [{'name': '', 'type': 'bool'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    }
]

ck_contract = w3.eth.contract(address=w3.to_checksum_address(ck_token_addr), abi=simplified_abi+ck_extra_abi)
name = ck_contract.functions.name().call()
symbol = ck_contract.functions.symbol().call()
kitties_auctions = ck_contract.functions.balanceOf(acc_address).call()
print(f"{name} [{symbol}] NFTs in Auctions: {kitties_auctions}")

pregnant_kitties = ck_contract.functions.pregnantKitties().call()
print(f"{name} [{symbol}] NFTs Pregnants: {pregnant_kitties}")

# Použití ABI události převodu k získání informací o převedených Kitties.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# K filtrování logů potřebujeme signaturu události
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# Poznámky:
#   - Pokud není vrácena žádná událost převodu, zvyšte počet bloků nad 120.
#   - Pokud jste nenašli žádnou událost převodu, můžete se také pokusit získat tokenId na:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Kliknutím rozbalte logy události a zkopírujte její argument „tokenId“
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # Zde vložte „tokenId“ z výše uvedeného odkazu
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

Kontrakt CryptoKitties má kromě těch standardních i některé další zajímavé události.

Pojďme se podívat na dvě z nich, `Pregnant` a `Birth`.

```python
# Použití ABI událostí Pregnant a Birth k získání informací o nových Kitties.
ck_extra_events_abi = [
    {
        'anonymous': False,
        'inputs': [
            {'indexed': False, 'name': 'owner', 'type': 'address'},
            {'indexed': False, 'name': 'matronId', 'type': 'uint256'},
            {'indexed': False, 'name': 'sireId', 'type': 'uint256'},
            {'indexed': False, 'name': 'cooldownEndBlock', 'type': 'uint256'}],
        'name': 'Pregnant',
        'type': 'event'
    },
    {
        'anonymous': False,
        'inputs': [
            {'indexed': False, 'name': 'owner', 'type': 'address'},
            {'indexed': False, 'name': 'kittyId', 'type': 'uint256'},
            {'indexed': False, 'name': 'matronId', 'type': 'uint256'},
            {'indexed': False, 'name': 'sireId', 'type': 'uint256'},
            {'indexed': False, 'name': 'genes', 'type': 'uint256'}],
        'name': 'Birth',
        'type': 'event'
    }]

# K filtrování logů potřebujeme signaturu události
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# Zde je událost Pregnant:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Zde je událost Birth:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## Populární NFT {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/nft-top-contracts) uvádí nejlepší NFT na Ethereu podle objemu převodů.
- [CryptoKitties](https://www.cryptokitties.co/) je hra zaměřená na chovatelné, sběratelské a nesmírně roztomilé tvory, kterým říkáme CryptoKitties.
- [Sorare](https://sorare.com/) je globální fantasy fotbalová hra, kde můžete sbírat limitované edice sběratelských předmětů, spravovat své týmy a soutěžit o ceny.
- [Ethereum Name Service (ENS)](https://ens.domains/) nabízí bezpečný a decentralizovaný způsob adresování zdrojů na blockchainu i mimo něj pomocí jednoduchých, lidsky čitelných jmen.
- [POAP](https://poap.xyz) doručuje bezplatná NFT lidem, kteří se účastní událostí nebo dokončí specifické akce. POAPy lze zdarma vytvářet a distribuovat.
- [Unstoppable Domains](https://unstoppabledomains.com/) je společnost se sídlem v San Franciscu, která buduje domény na blockchainech. Blockchainové domény nahrazují adresy kryptoměn lidsky čitelnými jmény a lze je použít k vytvoření webových stránek odolných vůči cenzuře.
- [Gods Unchained Cards](https://godsunchained.com/) je sběratelská karetní hra (TCG) na blockchainu Ethereum, která využívá NFT k zajištění skutečného vlastnictví herních aktiv.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) je sbírka 10 000 unikátních NFT, která kromě toho, že je prokazatelně vzácným uměleckým dílem, funguje jako členský token do klubu a poskytuje členské výhody a benefity, které se postupem času zvyšují v důsledku úsilí komunity.

## Další čtení {#further-reading}

- [EIP-721: Standard nezaměnitelných tokenů ERC-721](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - Dokumentace k ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - Implementace ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)

## Návody: Budování s nezaměnitelnými tokeny (ERC-721) na Ethereu {#tutorials}

- [Průvodce kontraktem ERC-721 ve Vyperu](/developers/tutorials/erc-721-vyper-annotated-code/) _– Komentovaný průvodce kompletním kontraktem NFT ERC-721 napsaným ve Vyperu._
- [Jak napsat a nasadit NFT (Část 1/3)](/developers/tutorials/how-to-write-and-deploy-an-nft/) _– Podrobný průvodce psaním a nasazením vašeho prvního chytrého kontraktu ERC-721._
- [Jak razit NFT (Část 2/3)](/developers/tutorials/how-to-mint-an-nft/) _– Jak razit NFT ERC-721 pomocí vašeho nasazeného chytrého kontraktu a Web3._
- [Jak si prohlédnout své NFT v peněžence (Část 3/3)](/developers/tutorials/how-to-view-nft-in-metamask/) _– Jak po nasazení zobrazit vaše vyražené NFT v MetaMasku._
- [Návod na ražení NFT](/developers/tutorials/nft-minter/) _– Vytvořte full-stack decentralizovanou aplikaci (dapp) pro ražení NFT s frontendem v Reactu, MetaMaskem a Alchemy._