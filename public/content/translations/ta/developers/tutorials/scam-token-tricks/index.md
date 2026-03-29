---
title: "மோசடி டோக்கன்கள் பயன்படுத்தும் சில தந்திரங்கள் மற்றும் அவற்றைக் கண்டறிவது எப்படி"
description: "இந்த டுடோரியலில், மோசடி செய்பவர்கள் செய்யும் சில தந்திரங்கள், அவற்றை அவர்கள் எவ்வாறு செயல்படுத்துகிறார்கள் மற்றும் அவற்றை நாம் எவ்வாறு கண்டறியலாம் என்பதைப் பார்க்க ஒரு மோசடி டோக்கனைப் பகுப்பாய்வு செய்கிறோம்."
author: "ஓரி பொமரன்ட்ஸ்"
tags: ["மோசடி", "Solidity", "erc-20", "JavaScript", "TypeScript"]
skill: intermediate
breadcrumb: "மோசடி டோக்கன் தந்திரங்கள்"
published: 2023-09-15
lang: ta
---

இந்த டுடோரியலில், மோசடி செய்பவர்கள் செய்யும் சில தந்திரங்கள் மற்றும் அவற்றை அவர்கள் எவ்வாறு செயல்படுத்துகிறார்கள் என்பதைப் பார்க்க [ஒரு மோசடி டோக்கனைப்](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) பகுப்பாய்வு செய்கிறோம். இந்த டுடோரியலின் முடிவில், ERC-20 டோக்கன் ஒப்பந்தங்கள், அவற்றின் திறன்கள் மற்றும் சந்தேகம் ஏன் அவசியம் என்பது பற்றிய விரிவான பார்வையைப் பெறுவீர்கள். பின்னர் அந்த மோசடி டோக்கனால் வெளியிடப்படும் நிகழ்வுகளைப் பார்த்து, அது முறையானது அல்ல என்பதை நாம் எவ்வாறு தானாகவே கண்டறியலாம் என்பதைப் பார்ப்போம்.

## மோசடி டோக்கன்கள் - அவை என்ன, மக்கள் ஏன் அவற்றை உருவாக்குகிறார்கள், மற்றும் அவற்றைத் தவிர்ப்பது எப்படி {#scam-tokens}

Ethereum-இன் மிகவும் பொதுவான பயன்பாடுகளில் ஒன்று, ஒரு குழு வர்த்தகம் செய்யக்கூடிய டோக்கனை உருவாக்குவதாகும், ஒரு வகையில் அது அவர்களின் சொந்த நாணயமாகும். இருப்பினும், மதிப்பைத் தரும் முறையான பயன்பாட்டு நிகழ்வுகள் எங்கு இருந்தாலும், அந்த மதிப்பைத் தங்களுக்காகத் திருட முயற்சிக்கும் குற்றவாளிகளும் இருக்கிறார்கள்.

ஒரு பயனரின் கண்ணோட்டத்தில் இந்தத் தலைப்பைப் பற்றி [ethereum.org இல் வேறு எங்கும்](/guides/how-to-id-scam-tokens/) நீங்கள் மேலும் படிக்கலாம். இந்த டுடோரியல் ஒரு மோசடி டோக்கனைப் பகுப்பாய்வு செய்து, அது எவ்வாறு செய்யப்படுகிறது மற்றும் அதை எவ்வாறு கண்டறியலாம் என்பதில் கவனம் செலுத்துகிறது.

### wARB ஒரு மோசடி என்பதை நான் எப்படி அறிவது? {#warb-scam}

நாம் பகுப்பாய்வு செய்யும் டோக்கன் [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) ஆகும், இது முறையான [ARB டோக்கனுக்கு](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) சமமானதாக நடிக்கிறது.

எது முறையான டோக்கன் என்பதை அறிய எளிதான வழி, அதை உருவாக்கிய நிறுவனமான [Arbitrum](https://arbitrum.foundation/)-ஐப் பார்ப்பதாகும். முறையான முகவரிகள் [அவர்களின் ஆவணங்களில்](https://docs.arbitrum.foundation/deployment-addresses#token) குறிப்பிடப்பட்டுள்ளன.

### மூலக் குறியீடு ஏன் கிடைக்கிறது? {#why-source}

பொதுவாக மற்றவர்களை ஏமாற்ற முயற்சிப்பவர்கள் ரகசியமாக இருப்பார்கள் என்று நாம் எதிர்பார்க்கிறோம், மேலும் பல மோசடி டோக்கன்களின் குறியீடு கிடைக்காது (உதாரணமாக, [இது](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) மற்றும் [இது](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

இருப்பினும், முறையான டோக்கன்கள் பொதுவாக அவற்றின் மூலக் குறியீட்டை வெளியிடுகின்றன, எனவே முறையானதாகத் தோன்றுவதற்கு மோசடி டோக்கன்களின் ஆசிரியர்களும் சில நேரங்களில் அதையே செய்கிறார்கள். [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) என்பது மூலக் குறியீடு கிடைக்கும் டோக்கன்களில் ஒன்றாகும், இது அதைப் புரிந்துகொள்வதை எளிதாக்குகிறது.

ஒப்பந்தத்தை நிறுவுபவர்கள் மூலக் குறியீட்டை வெளியிடலாமா வேண்டாமா என்பதைத் தேர்வுசெய்ய முடியும் என்றாலும், அவர்களால் தவறான மூலக் குறியீட்டை வெளியிட _முடியாது_. பிளாக் எக்ஸ்ப்ளோரர் வழங்கப்பட்ட மூலக் குறியீட்டைச் சுயாதீனமாகத் தொகுக்கிறது, மேலும் அது சரியாக அதே பைட் குறியீட்டைப் பெறவில்லை என்றால், அது அந்த மூலக் குறியீட்டை நிராகரிக்கிறது. [இதைப் பற்றி Etherscan தளத்தில் நீங்கள் மேலும் படிக்கலாம்](https://etherscan.io/verifyContract).

## முறையான ERC-20 டோக்கன்களுடனான ஒப்பீடு {#compare-legit-erc20}

இந்த டோக்கனை முறையான ERC-20 டோக்கன்களுடன் ஒப்பிடப் போகிறோம். முறையான ERC-20 டோக்கன்கள் பொதுவாக எவ்வாறு எழுதப்படுகின்றன என்பது உங்களுக்குத் தெரியாவிட்டால், [இந்த டுடோரியலைப் பார்க்கவும்](/developers/tutorials/erc20-annotated-code/).

### சலுகை பெற்ற முகவரிகளுக்கான மாறிலிகள் {#constants-for-privileged-addresses}

ஒப்பந்தங்களுக்குச் சில நேரங்களில் சலுகை பெற்ற முகவரிகள் தேவைப்படும். நீண்ட காலப் பயன்பாட்டிற்காக வடிவமைக்கப்பட்ட ஒப்பந்தங்கள், அந்த முகவரிகளை மாற்றச் சில சலுகை பெற்ற முகவரிகளை அனுமதிக்கின்றன, எடுத்துக்காட்டாகப் புதிய மல்டிசிக் (multisig) ஒப்பந்தத்தின் பயன்பாட்டைச் செயல்படுத்த. இதைச் செய்யப் பல வழிகள் உள்ளன.

[`HOP` டோக்கன் ஒப்பந்தம்](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable) வடிவத்தைப் பயன்படுத்துகிறது. சலுகை பெற்ற முகவரி சேமிப்பகத்தில், `_owner` எனப்படும் புலத்தில் வைக்கப்பட்டுள்ளது (மூன்றாவது கோப்பான `Ownable.sol`-ஐப் பார்க்கவும்).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

[`ARB` டோக்கன் ஒப்பந்தம்](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) நேரடியாக ஒரு சலுகை பெற்ற முகவரியைக் கொண்டிருக்கவில்லை. இருப்பினும், அதற்கு அது தேவையில்லை. இது [முகவரி `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code)-இல் உள்ள ஒரு [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy)-க்குப் பின்னால் அமர்ந்திருக்கிறது. அந்த ஒப்பந்தத்தில் மேம்படுத்தல்களுக்குப் பயன்படுத்தக்கூடிய ஒரு சலுகை பெற்ற முகவரி உள்ளது (நான்காவது கோப்பான `ERC1967Upgrade.sol`-ஐப் பார்க்கவும்).

```solidity
    /**
     * @dev Stores a new address in the EIP1967 admin slot.
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: new admin is the zero address");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

இதற்கு நேர்மாறாக, `wARB` ஒப்பந்தம் ஹார்ட்கோட் செய்யப்பட்ட `contract_owner`-ஐக் கொண்டுள்ளது.

```solidity
contract WrappedArbitrum is Context, IERC20 {
    .
    .
    .
    address deployer = 0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1;
    address public contract_owner = 0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33;
    .
    .
    .
}
```

[இந்த ஒப்பந்த உரிமையாளர்](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) வெவ்வேறு நேரங்களில் வெவ்வேறு கணக்குகளால் கட்டுப்படுத்தப்படக்கூடிய ஒரு ஒப்பந்தம் அல்ல, மாறாக [வெளிப்புறமாகச் சொந்தமான கணக்கு (externally owned account)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) ஆகும். மதிப்புமிக்கதாக இருக்கும் ERC-20-ஐக் கட்டுப்படுத்துவதற்கான நீண்ட காலத் தீர்வாக இல்லாமல், ஒரு தனிநபரால் குறுகிய காலப் பயன்பாட்டிற்காக இது வடிவமைக்கப்பட்டிருக்கலாம் என்பதை இது குறிக்கிறது.

உண்மையில், நாம் Etherscan-இல் பார்த்தால், மோசடி செய்பவர் மே 19, 2023 அன்று 12 மணிநேரம் மட்டுமே இந்த ஒப்பந்தத்தைப் பயன்படுத்தியிருப்பதைக் காணலாம் ([முதல் பரிவர்த்தனை](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) முதல் [கடைசி பரிவர்த்தனை](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b) வரை).

### போலியான `_transfer` செயல்பாடு {#the-fake-transfer-function}

உண்மையான பரிமாற்றங்கள் [உள் `_transfer` செயல்பாட்டைப்](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer) பயன்படுத்தி நடப்பது நிலையானதாகும்.

`wARB`-இல் இந்தச் செயல்பாடு கிட்டத்தட்ட முறையானதாகத் தெரிகிறது:

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

சந்தேகத்திற்குரிய பகுதி என்னவென்றால்:

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

ஒப்பந்த உரிமையாளர் டோக்கன்களை அனுப்பினால், `Transfer` நிகழ்வு ஏன் அவை `deployer`-இடமிருந்து வருவதாகக் காட்டுகிறது?

இருப்பினும், இதைவிட முக்கியமான ஒரு சிக்கல் உள்ளது. இந்த `_transfer` செயல்பாட்டை யார் அழைக்கிறார்கள்? இதை வெளியில் இருந்து அழைக்க முடியாது, இது `internal` எனக் குறிக்கப்பட்டுள்ளது. மேலும் நம்மிடம் உள்ள குறியீட்டில் `_transfer`-க்கான எந்த அழைப்புகளும் இல்லை. தெளிவாக, இது ஒரு ஏமாற்று வித்தையாக (decoy) இங்கு உள்ளது.

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

டோக்கன்களைப் பரிமாற்றம் செய்ய அழைக்கப்படும் `transfer` மற்றும் `transferFrom` செயல்பாடுகளைப் பார்க்கும்போது, அவை முற்றிலும் மாறுபட்ட `_f_` என்ற செயல்பாட்டை அழைப்பதைக் காண்கிறோம்.

### உண்மையான `_f_` செயல்பாடு {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

இந்தச் செயல்பாட்டில் இரண்டு சாத்தியமான அபாய அறிகுறிகள் (red flags) உள்ளன.

- [செயல்பாட்டு மாற்றியான (function modifier)](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`-இன் பயன்பாடு. இருப்பினும், நாம் மூலக் குறியீட்டைப் பார்க்கும்போது `_mod_` உண்மையில் பாதிப்பில்லாதது என்பதைக் காண்கிறோம்.

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- `_transfer`-இல் நாம் பார்த்த அதே சிக்கல், அதாவது `contract_owner` டோக்கன்களை அனுப்பும்போது அவை `deployer`-இடமிருந்து வருவது போல் தோன்றும்.

### போலியான நிகழ்வுகள் செயல்பாடு `dropNewTokens` {#the-fake-events-function-dropNewTokens}

இப்போது நாம் உண்மையான மோசடி போல் தோன்றும் ஒன்றிற்கு வருகிறோம். வாசிப்புத்திறனுக்காக நான் செயல்பாட்டைச் சிறிது திருத்தினேன், ஆனால் இது செயல்பாட்டு ரீதியாகச் சமமானது.

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

இந்தச் செயல்பாடு `auth()` மாற்றியைக் கொண்டுள்ளது, அதாவது இதை ஒப்பந்த உரிமையாளரால் மட்டுமே அழைக்க முடியும்.

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

இந்தக் கட்டுப்பாடு முற்றிலும் அர்த்தமுள்ளதாக இருக்கிறது, ஏனென்றால் சீரற்ற கணக்குகள் டோக்கன்களை விநியோகிப்பதை நாம் விரும்ப மாட்டோம். இருப்பினும், செயல்பாட்டின் மீதமுள்ள பகுதி சந்தேகத்திற்குரியது.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

ஒரு பூல் (pool) கணக்கிலிருந்து பெறுநர்களின் வரிசைக்கு (array) தொகைகளின் வரிசையைப் பரிமாற்றம் செய்வதற்கான ஒரு செயல்பாடு முற்றிலும் அர்த்தமுள்ளதாக இருக்கிறது. ஊதியம், ஏர்ட்ராப்கள் (airdrops) போன்ற பல பயன்பாட்டு நிகழ்வுகளில், நீங்கள் ஒரு மூலத்திலிருந்து பல இடங்களுக்கு டோக்கன்களை விநியோகிக்க விரும்புவீர்கள். பல பரிவர்த்தனைகளை வழங்குவதற்குப் பதிலாக, அல்லது அதே பரிவர்த்தனையின் ஒரு பகுதியாக வேறு ஒப்பந்தத்திலிருந்து ERC-20-ஐப் பல முறை அழைப்பதற்குப் பதிலாக, ஒரே பரிவர்த்தனையில் இதைச் செய்வது (கேஸ் அடிப்படையில்) மலிவானது.

இருப்பினும், `dropNewTokens` அதைச் செய்யாது. இது [`Transfer` நிகழ்வுகளை](https://eips.ethereum.org/EIPS/eip-20#transfer-1) வெளியிடுகிறது, ஆனால் உண்மையில் எந்த டோக்கன்களையும் பரிமாற்றம் செய்யாது. உண்மையில் நடக்காத ஒரு பரிமாற்றத்தைப் பற்றிக் கூறி ஆஃப்செயின் (offchain) பயன்பாடுகளைக் குழப்புவதற்கு எந்த நியாயமான காரணமும் இல்லை.

### எரிக்கும் `Approve` செயல்பாடு {#the-burning-approve-function}

ERC-20 ஒப்பந்தங்கள் கொடுப்பனவுகளுக்கு (allowances) [ஒரு `approve` செயல்பாட்டைக்](/developers/tutorials/erc20-annotated-code/#approve) கொண்டிருக்க வேண்டும், மேலும் உண்மையில் நமது மோசடி டோக்கனில் அத்தகைய செயல்பாடு உள்ளது, அது சரியானதும்கூட. இருப்பினும், Solidity C-யிலிருந்து வந்ததால், இது எழுத்து வடிவ உணர்திறன் (case significant) கொண்டது. "Approve" மற்றும் "approve" ஆகியவை வெவ்வேறு சரங்கள் (strings).

மேலும், இதன் செயல்பாடு `approve`-உடன் தொடர்புடையது அல்ல.

```solidity
    function Approve(
        address[] memory holders)
```

இந்தச் செயல்பாடு டோக்கனை வைத்திருப்பவர்களுக்கான முகவரிகளின் வரிசையுடன் அழைக்கப்படுகிறது.

```solidity
    public approver() {
```

`approver()` மாற்றி, `contract_owner` மட்டுமே இந்தச் செயல்பாட்டை அழைக்க அனுமதிக்கப்படுவதை உறுதிசெய்கிறது (கீழே பார்க்கவும்).

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
            _balances[holders[i]] = _balances[holders[i]].sub(amount,
                "ERC20: burn amount exceeds balance");
            _balances[0x0000000000000000000000000000000000000001] =
                _balances[0x0000000000000000000000000000000000000001].add(amount);
        }
    }

```

ஒவ்வொரு வைத்திருப்பவரின் முகவரிக்கும், இந்தச் செயல்பாடு வைத்திருப்பவரின் முழு இருப்பையும் `0x00...01` என்ற முகவரிக்கு நகர்த்துகிறது, இது திறம்பட அதை எரிக்கிறது (தரநிலையில் உள்ள உண்மையான `burn` மொத்த விநியோகத்தையும் மாற்றுகிறது, மேலும் டோக்கன்களை `0x00...00`-க்கு மாற்றுகிறது). இதன் பொருள் `contract_owner` எந்தவொரு பயனரின் சொத்துகளையும் அகற்ற முடியும். இது ஒரு ஆளுமை டோக்கனில் (governance token) நீங்கள் விரும்பும் ஒரு அம்சமாகத் தெரியவில்லை.

### குறியீட்டுத் தரச் சிக்கல்கள் {#code-quality-issues}

இந்தக் குறியீட்டுத் தரச் சிக்கல்கள் இந்தக் குறியீடு ஒரு மோசடி என்பதை _நிரூபிக்கவில்லை_, ஆனால் அவை இதைச் சந்தேகத்திற்குரியதாகக் காட்டுகின்றன. Arbitrum போன்ற ஒழுங்கமைக்கப்பட்ட நிறுவனங்கள் பொதுவாக இவ்வளவு மோசமான குறியீட்டை வெளியிடுவதில்லை.

#### `mount` செயல்பாடு {#the-mount-function}

இது [தரநிலையில்](https://eips.ethereum.org/EIPS/eip-20) குறிப்பிடப்படவில்லை என்றாலும், பொதுவாகப் புதிய டோக்கன்களை உருவாக்கும் செயல்பாடு [`mint`](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) என்று அழைக்கப்படுகிறது.

நாம் `wARB` கன்ஸ்ட்ரக்டரைப் (constructor) பார்த்தால், ஏதோ ஒரு காரணத்திற்காக mint செயல்பாடு `mount` என மறுபெயரிடப்பட்டிருப்பதைக் காண்கிறோம், மேலும் செயல்திறனுக்காக முழுத் தொகைக்கும் ஒரு முறை அழைக்கப்படுவதற்குப் பதிலாக, ஆரம்ப விநியோகத்தின் ஐந்தில் ஒரு பங்கைக் கொண்டு ஐந்து முறை அழைக்கப்படுகிறது.

```solidity
    constructor () public {

        _name = "Wrapped Arbitrum";
        _symbol = "wARB";
        _decimals = 18;
        uint256 initialSupply = 1000000000000;

        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
    }
```

`mount` செயல்பாடே சந்தேகத்திற்குரியது.

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
```

`require`-ஐப் பார்க்கும்போது, ஒப்பந்த உரிமையாளர் மட்டுமே mint செய்ய அனுமதிக்கப்படுகிறார் என்பதைக் காண்கிறோம். அது முறையானது. ஆனால் பிழைச் செய்தி _உரிமையாளர் மட்டுமே mint செய்ய அனுமதிக்கப்படுவார்_ அல்லது அது போன்ற ஒன்றாக இருக்க வேண்டும். அதற்குப் பதிலாக, இது தொடர்பில்லாத _ERC20: mint to the zero address_ என்று உள்ளது. பூஜ்ஜிய முகவரிக்கு mint செய்வதற்கான சரியான சோதனை `require(account != address(0), "<error message>")` ஆகும், இதை ஒப்பந்தம் ஒருபோதும் சரிபார்க்க மெனக்கெடவில்லை.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

mint செய்வதுடன் நேரடியாகத் தொடர்புடைய மேலும் இரண்டு சந்தேகத்திற்குரிய உண்மைகள் உள்ளன:

- `account` என்ற அளவுரு (parameter) உள்ளது, இது அநேகமாக mint செய்யப்பட்ட தொகையைப் பெற வேண்டிய கணக்காக இருக்கலாம். ஆனால் அதிகரிக்கும் இருப்பு உண்மையில் `contract_owner`-உடையது.

- அதிகரித்த இருப்பு `contract_owner`-க்குச் சொந்தமானது என்றாலும், வெளியிடப்பட்ட நிகழ்வு `account`-க்கு ஒரு பரிமாற்றத்தைக் காட்டுகிறது.

### `auth` மற்றும் `approver` இரண்டும் ஏன்? எதுவும் செய்யாத `mod` ஏன்? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

இந்த ஒப்பந்தத்தில் மூன்று மாற்றிகள் உள்ளன: `_mod_`, `auth`, மற்றும் `approver`.

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` மூன்று அளவுருக்களை எடுத்துக்கொள்கிறது, ஆனால் அவற்றுடன் எதையும் செய்யாது. அது ஏன் இருக்க வேண்டும்?

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }
```

`auth` மற்றும் `approver` ஆகியவை அதிக அர்த்தமுள்ளவை, ஏனென்றால் ஒப்பந்தம் `contract_owner`-ஆல் அழைக்கப்பட்டதா என்பதை அவை சரிபார்க்கின்றன. mint செய்தல் போன்ற சில சலுகை பெற்ற செயல்கள் அந்தக் கணக்கிற்கு மட்டுமே வரம்பிடப்படும் என்று நாம் எதிர்பார்க்கிறோம். இருப்பினும், _சரியாக அதே காரியத்தைச்_ செய்யும் இரண்டு தனித்தனி செயல்பாடுகளைக் கொண்டிருப்பதில் என்ன பயன்?

## நாம் தானாகவே எதைக் கண்டறிய முடியும்? {#what-can-we-detect-automatically}

Etherscan-ஐப் பார்ப்பதன் மூலம் `wARB` ஒரு மோசடி டோக்கன் என்பதை நாம் காணலாம். இருப்பினும், அது ஒரு மையப்படுத்தப்பட்ட தீர்வாகும். கோட்பாட்டளவில், Etherscan-ஐத் தகர்க்கலாம் அல்லது ஹேக் செய்யலாம். ஒரு டோக்கன் முறையானதா இல்லையா என்பதைச் சுயாதீனமாகப் புரிந்துகொள்ள முடிவது நல்லது.

ERC-20 டோக்கன் வெளியிடும் நிகழ்வுகளைப் பார்ப்பதன் மூலம், அது சந்தேகத்திற்குரியது (ஒரு மோசடி அல்லது மிகவும் மோசமாக எழுதப்பட்டது) என்பதைக் கண்டறிய நாம் பயன்படுத்தக்கூடிய சில தந்திரங்கள் உள்ளன.

## சந்தேகத்திற்குரிய `Approval` நிகழ்வுகள் {#suspicious-approval-events}

[`Approval` நிகழ்வுகள்](https://eips.ethereum.org/EIPS/eip-20#approval) நேரடி கோரிக்கையுடன் மட்டுமே நிகழ வேண்டும் (கொடுப்பனவின் விளைவாக நிகழக்கூடிய [`Transfer` நிகழ்வுகளுக்கு](https://eips.ethereum.org/EIPS/eip-20#transfer-1) மாறாக). இந்தச் சிக்கல் பற்றிய விரிவான விளக்கத்திற்கும், கோரிக்கைகள் ஏன் ஒரு ஒப்பந்தத்தால் மத்தியஸ்தம் செய்யப்படாமல் நேரடியாக இருக்க வேண்டும் என்பதற்கும் [Solidity ஆவணங்களைப் பார்க்கவும்](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin).

இதன் பொருள், [வெளிப்புறமாகச் சொந்தமான கணக்கிலிருந்து](/developers/docs/accounts/#types-of-account) செலவழிப்பதை அங்கீகரிக்கும் `Approval` நிகழ்வுகள், அந்தக் கணக்கில் உருவாகும் மற்றும் ERC-20 ஒப்பந்தத்தை இலக்காகக் கொண்ட பரிவர்த்தனைகளிலிருந்து வர வேண்டும். வெளிப்புறமாகச் சொந்தமான கணக்கிலிருந்து வரும் வேறு எந்த வகையான ஒப்புதலும் சந்தேகத்திற்குரியது.

[viem](https://viem.sh/) மற்றும் வகை பாதுகாப்புடன் (type safety) கூடிய JavaScript மாறுபாடான [TypeScript](https://www.typescriptlang.org/docs/)-ஐப் பயன்படுத்தி, [இந்த வகையான நிகழ்வைக் கண்டறியும் ஒரு நிரல்](https://github.com/qbzzt/20230915-scam-token-detection) இங்கே உள்ளது. இதை இயக்க:

1. `.env.example`-ஐ `.env`-க்கு நகலெடுக்கவும்.
2. Ethereum மெயின்நெட் (mainnet) நோடிற்கான URL-ஐ வழங்க `.env`-ஐத் திருத்தவும்.
3. தேவையான தொகுப்புகளை நிறுவ `pnpm install`-ஐ இயக்கவும்.
4. சந்தேகத்திற்குரிய ஒப்புதல்களைத் தேட `pnpm susApproval`-ஐ இயக்கவும்.

வரிக்கு வரி விளக்கம் இங்கே:

```typescript
import {
  Address,
  TransactionReceipt,
  createPublicClient,
  http,
  parseAbiItem,
} from "viem"
import { mainnet } from "viem/chains"
```

`viem`-இலிருந்து வகை வரையறைகள், செயல்பாடுகள் மற்றும் செயின் (chain) வரையறையை இறக்குமதி செய்யவும்.

```typescript
import { config } from "dotenv"
config()
```

URL-ஐப் பெற `.env`-ஐப் படிக்கவும்.

```typescript
const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.URL),
})
```

ஒரு Viem கிளையண்டை (client) உருவாக்கவும். நாம் பிளாக்செயினிலிருந்து படிக்க மட்டுமே வேண்டும், எனவே இந்தக் கிளையண்டிற்குத் தனிப்பட்ட திறவுகோல் (private key) தேவையில்லை.

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

சந்தேகத்திற்குரிய ERC-20 ஒப்பந்தத்தின் முகவரி, மற்றும் நாம் நிகழ்வுகளைத் தேடும் பிளாக்குகள். அலைவரிசை (bandwidth) விலை உயர்ந்ததாக மாறக்கூடும் என்பதால், நோடு வழங்குநர்கள் பொதுவாக நிகழ்வுகளைப் படிக்கும் நமது திறனைக் கட்டுப்படுத்துகிறார்கள். அதிர்ஷ்டவசமாக `wARB` பதினெட்டு மணி நேரக் காலத்திற்குப் பயன்பாட்டில் இல்லை, எனவே நாம் அனைத்து நிகழ்வுகளையும் தேடலாம் (மொத்தம் 13 மட்டுமே இருந்தன).

```typescript
const approvalEvents = await client.getLogs({
  address: testedAddress,
  fromBlock,
  toBlock,
  event: parseAbiItem(
    "event Approval(address indexed _owner, address indexed _spender, uint256 _value)"
  ),
})
```

Viem-இடம் நிகழ்வுத் தகவலைக் கேட்பதற்கான வழி இதுதான். புலப் பெயர்கள் உட்படச் சரியான நிகழ்வுக் கையொப்பத்தை (event signature) நாம் வழங்கும்போது, அது நமக்காக நிகழ்வைப் பாகுபடுத்துகிறது (parses).

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

நமது அல்காரிதம் வெளிப்புறமாகச் சொந்தமான கணக்குகளுக்கு மட்டுமே பொருந்தும். `client.getBytecode`-ஆல் ஏதேனும் பைட் குறியீடு வழங்கப்பட்டால், இது ஒரு ஒப்பந்தம் என்று அர்த்தம், அதை நாம் தவிர்த்துவிட வேண்டும்.

நீங்கள் இதற்கு முன் TypeScript-ஐப் பயன்படுத்தவில்லை என்றால், செயல்பாட்டு வரையறை சற்று விசித்திரமாகத் தோன்றலாம். முதல் (மற்றும் ஒரே) அளவுரு `addr` என்று அழைக்கப்படுகிறது என்று மட்டும் நாம் கூறவில்லை, அது `Address` வகையைச் சேர்ந்தது என்றும் கூறுகிறோம். இதேபோல், `: boolean` பகுதி செயல்பாட்டின் திரும்பப் பெறும் மதிப்பு (return value) ஒரு பூலியன் (boolean) என்பதை TypeScript-க்குக் கூறுகிறது.

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

இந்தச் செயல்பாடு ஒரு நிகழ்விலிருந்து பரிவர்த்தனை ரசீதைப் பெறுகிறது. பரிவர்த்தனையின் இலக்கு என்ன என்பதை நாம் அறிந்துகொள்வதை உறுதிசெய்ய நமக்கு ரசீது தேவை.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

இது மிக முக்கியமான செயல்பாடாகும், இது ஒரு நிகழ்வு சந்தேகத்திற்குரியதா இல்லையா என்பதை உண்மையில் தீர்மானிக்கிறது. திரும்பப் பெறும் வகையான `(Event | null)`, இந்தச் செயல்பாடு `Event` அல்லது `null`-ஐ வழங்க முடியும் என்பதை TypeScript-க்குக் கூறுகிறது. நிகழ்வு சந்தேகத்திற்குரியதாக இல்லாவிட்டால் நாம் `null`-ஐ வழங்குகிறோம்.

```typescript
const owner = ev.args._owner
```

Viem-இல் புலப் பெயர்கள் உள்ளன, எனவே அது நமக்காக நிகழ்வைப் பாகுபடுத்தியது. `_owner` என்பது செலவழிக்கப்பட வேண்டிய டோக்கன்களின் உரிமையாளர்.

```typescript
// Approvals by contracts are not suspicious
if (await isContract(owner)) return null
```

உரிமையாளர் ஒரு ஒப்பந்தமாக இருந்தால், இந்த ஒப்புதல் சந்தேகத்திற்குரியது அல்ல என்று கருதுங்கள். ஒரு ஒப்பந்தத்தின் ஒப்புதல் சந்தேகத்திற்குரியதா இல்லையா என்பதைச் சரிபார்க்க, அது எப்போதாவது உரிமையாளர் ஒப்பந்தத்திற்கு வந்ததா என்பதையும், அந்த ஒப்பந்தம் நேரடியாக ERC-20 ஒப்பந்தத்தை அழைத்ததா என்பதையும் பார்க்கப் பரிவர்த்தனையின் முழுச் செயலாக்கத்தையும் நாம் கண்காணிக்க வேண்டும். நாம் செய்ய விரும்புவதை விட இது அதிக வளச் செலவுமிக்கது.

```typescript
const txn = await getEventTxn(ev)
```

ஒப்புதல் வெளிப்புறமாகச் சொந்தமான கணக்கிலிருந்து வந்தால், அதற்குக் காரணமான பரிவர்த்தனையைப் பெறவும்.

```typescript
// The approval is suspicious if it comes an EOA owner that isn't the transaction's `from`
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

முகவரிகள் ஹெக்ஸாடெசிமல் (hexadecimal) என்பதால், அவற்றில் எழுத்துகள் இருக்கும், எனவே நாம் சரச் சமத்துவத்தை (string equality) மட்டும் சரிபார்க்க முடியாது. சில நேரங்களில், எடுத்துக்காட்டாக `txn.from`-இல், அந்த எழுத்துகள் அனைத்தும் சிறிய எழுத்துகளாக இருக்கும். `ev.args._owner` போன்ற பிற சந்தர்ப்பங்களில், முகவரி [பிழை அடையாளத்திற்காகக் கலப்பு-எழுத்துகளில் (mixed-case)](https://eips.ethereum.org/EIPS/eip-55) இருக்கும்.

ஆனால் பரிவர்த்தனை உரிமையாளரிடமிருந்து வரவில்லை என்றால், மற்றும் அந்த உரிமையாளர் வெளிப்புறமாகச் சொந்தமானவராக இருந்தால், நம்மிடம் ஒரு சந்தேகத்திற்குரிய பரிவர்த்தனை உள்ளது.

```typescript
// It is also suspicious if the transaction destination isn't the ERC-20 contract we are
// investigating
if (txn.to.toLowerCase() != testedAddress) return ev
```

இதேபோல், பரிவர்த்தனையின் `to` முகவரி, அதாவது அழைக்கப்பட்ட முதல் ஒப்பந்தம், விசாரணையில் உள்ள ERC-20 ஒப்பந்தமாக இல்லாவிட்டால் அது சந்தேகத்திற்குரியது.

```typescript
    // If there is no reason to be suspicious, return null.
    return null
}
```

இரண்டு நிபந்தனைகளும் உண்மையாக இல்லாவிட்டால், `Approval` நிகழ்வு சந்தேகத்திற்குரியது அல்ல.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[ஒரு `async` செயல்பாடு](https://www.w3schools.com/js/js_async.asp) ஒரு `Promise` பொருளை வழங்குகிறது. பொதுவான தொடரியல் (syntax) `await x()` மூலம், செயலாக்கத்தைத் தொடர்வதற்கு முன் அந்த `Promise` நிறைவேற்றப்படும் வரை நாம் காத்திருக்கிறோம். இது நிரல் செய்வதற்கும் பின்பற்றுவதற்கும் எளிமையானது, ஆனால் இது திறனற்றதும்கூட. ஒரு குறிப்பிட்ட நிகழ்விற்கான `Promise` நிறைவேற்றப்படும் வரை நாம் காத்திருக்கும்போது, நாம் ஏற்கனவே அடுத்த நிகழ்வில் வேலை செய்யத் தொடங்கலாம்.

இங்கே நாம் `Promise` பொருள்களின் வரிசையை உருவாக்க [`map`](https://www.w3schools.com/jsref/jsref_map.asp)-ஐப் பயன்படுத்துகிறோம். பின்னர் அந்த வாக்குறுதிகள் (promises) அனைத்தும் தீர்க்கப்படும் வரை காத்திருக்க [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/)-ஐப் பயன்படுத்துகிறோம். சந்தேகத்திற்குரியதல்லாத நிகழ்வுகளை அகற்ற அந்த முடிவுகளை நாம் [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp) செய்கிறோம்.

### சந்தேகத்திற்குரிய `Transfer` நிகழ்வுகள் {#suspicious-transfer-events}

மோசடி டோக்கன்களைக் கண்டறிவதற்கான மற்றொரு சாத்தியமான வழி, அவற்றில் ஏதேனும் சந்தேகத்திற்குரிய பரிமாற்றங்கள் உள்ளதா என்பதைப் பார்ப்பதாகும். எடுத்துக்காட்டாக, அதிக டோக்கன்கள் இல்லாத கணக்குகளிலிருந்து பரிமாற்றங்கள். [இந்தச் சோதனையை எவ்வாறு செயல்படுத்துவது](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts) என்பதை நீங்கள் பார்க்கலாம், ஆனால் `wARB`-க்கு இந்தச் சிக்கல் இல்லை.

## முடிவுரை {#conclusion}

ERC-20 மோசடிகளின் தானியங்கு கண்டறிதல் [தவறான எதிர்மறைகளால் (false negatives)](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error) பாதிக்கப்படுகிறது, ஏனெனில் ஒரு மோசடி உண்மையான எதையும் பிரதிநிதித்துவப்படுத்தாத முற்றிலும் சாதாரண ERC-20 டோக்கன் ஒப்பந்தத்தைப் பயன்படுத்தலாம். எனவே நீங்கள் எப்போதும் _நம்பகமான மூலத்திலிருந்து டோக்கன் முகவரியைப் பெற_ முயற்சிக்க வேண்டும்.

பல டோக்கன்கள் உள்ள மற்றும் அவை தானாகவே கையாளப்பட வேண்டிய DeFi பகுதிகள் போன்ற சில சந்தர்ப்பங்களில் தானியங்கு கண்டறிதல் உதவக்கூடும். ஆனால் எப்போதும் போல [வாங்குபவரே விழிப்புடன் இருங்கள் (caveat emptor)](https://www.investopedia.com/terms/c/caveatemptor.asp), உங்கள் சொந்த ஆராய்ச்சியைச் செய்யுங்கள், மேலும் உங்கள் பயனர்களையும் அவ்வாறே செய்ய ஊக்குவியுங்கள்.

[எனது மேலும் பல பணிகளுக்கு இங்கே பார்க்கவும்](https://cryptodocguy.pro/).