---
title: "சோதனைக்காக Solidity ஸ்மார்ட் ஒப்பந்தங்களை எப்படி மாக் (mock) செய்வது"
description: "சோதனை செய்யும் போது உங்கள் ஒப்பந்தங்களை ஏன் மாக் (mock) செய்ய வேண்டும்"
author: "மார்கஸ் வாஸ்"
lang: ta
tags: ["Solidity", "ஸ்மார்ட் ஒப்பந்தங்கள்", "சோதனை", "மாக்கிங்"]
skill: intermediate
breadcrumb: "ஒப்பந்தங்களை மாக் செய்தல்"
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[மாக் ஆப்ஜெக்ட்கள் (Mock objects)](https://wikipedia.org/wiki/Mock_object) என்பது ஆப்ஜெக்ட்-ஓரியண்டட் நிரலாக்கத்தில் (object-oriented programming) ஒரு பொதுவான வடிவமைப்பு முறையாகும். 'கேலி செய்வது' என்ற பொருளைக் கொண்ட 'mocquer' என்ற பழைய பிரெஞ்சு வார்த்தையிலிருந்து வந்து, இது 'உண்மையான ஒன்றைப் பின்பற்றுவது' என்று உருவானது, இதுவே நாம் நிரலாக்கத்தில் செய்கிறோம். நீங்கள் விரும்பினால் மட்டுமே உங்கள் ஸ்மார்ட் ஒப்பந்தங்களை கேலி செய்யுங்கள், ஆனால் உங்களால் முடிந்த போதெல்லாம் அவற்றை மாக் (mock) செய்யுங்கள். இது உங்கள் வாழ்க்கையை எளிதாக்குகிறது.

## மாக்ஸ் (mocks) மூலம் ஒப்பந்தங்களை யூனிட்-சோதனை (Unit-testing) செய்தல் {#unit-testing-contracts-with-mocks}

ஒரு ஒப்பந்தத்தை மாக் செய்வது என்பது அடிப்படையில் அந்த ஒப்பந்தத்தின் இரண்டாவது பதிப்பை உருவாக்குவதாகும், இது அசலைப் போலவே செயல்படுகிறது, ஆனால் டெவலப்பரால் எளிதாகக் கட்டுப்படுத்தக்கூடிய வகையில் இருக்கும். நீங்கள் பெரும்பாலும் சிக்கலான ஒப்பந்தங்களை உருவாக்குவீர்கள், அங்கு நீங்கள் [ஒப்பந்தத்தின் சிறிய பகுதிகளை மட்டுமே யூனிட்-சோதனை](/developers/docs/smart-contracts/testing/) செய்ய விரும்புவீர்கள். இதில் உள்ள சிக்கல் என்னவென்றால், இந்த சிறிய பகுதியைச் சோதிக்க மிகவும் குறிப்பிட்ட ஒப்பந்த நிலை (state) தேவைப்பட்டால், அதை அடைவது கடினமாக இருக்குமே?

ஒப்பந்தத்தை தேவையான நிலைக்குக் கொண்டுவரும் சிக்கலான சோதனை அமைப்பு லாஜிக்கை நீங்கள் ஒவ்வொரு முறையும் எழுதலாம் அல்லது நீங்கள் ஒரு மாக்-ஐ எழுதலாம். இன்ஹெரிட்டன்ஸ் (inheritance) மூலம் ஒரு ஒப்பந்தத்தை மாக் செய்வது எளிது. அசல் ஒப்பந்தத்திலிருந்து இன்ஹெரிட் செய்யும் இரண்டாவது மாக் ஒப்பந்தத்தை உருவாக்கவும். இப்போது நீங்கள் உங்கள் மாக்-க்கு சார்புகளை (functions) ஓவர்ரைடு (override) செய்யலாம். இதை ஒரு உதாரணத்துடன் பார்ப்போம்.

## எடுத்துக்காட்டு: பிரைவேட் ERC-20 {#example-private-erc20}

ஆரம்பத்தில் பிரைவேட் நேரத்தைக் கொண்ட ஒரு எடுத்துக்காட்டு ERC-20 ஒப்பந்தத்தை நாங்கள் பயன்படுத்துகிறோம். உரிமையாளர் பிரைவேட் பயனர்களை நிர்வகிக்க முடியும் மற்றும் தொடக்கத்தில் அவர்கள் மட்டுமே டோக்கன்களைப் பெற அனுமதிக்கப்படுவார்கள். ஒரு குறிப்பிட்ட நேரம் கடந்தவுடன், அனைவரும் டோக்கன்களைப் பயன்படுத்த அனுமதிக்கப்படுவார்கள். நீங்கள் ஆர்வமாக இருந்தால், புதிய ஓப்பன்செப்பெலின் (OpenZeppelin) ஒப்பந்தங்கள் v3 இலிருந்து [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) ஹூக்கைப் பயன்படுத்துகிறோம்.

```solidity
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PrivateERC20 is ERC20, Ownable {
    mapping (address => bool) public isPrivateUser;
    uint256 private publicAfterTime;

    constructor(uint256 privateERC20timeInSec) ERC20("PrivateERC20", "PRIV") public {
        publicAfterTime = now + privateERC20timeInSec;
    }

    function addUser(address user) external onlyOwner {
        isPrivateUser[user] = true;
    }

    function isPublic() public view returns (bool) {
        return now >= publicAfterTime;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);

        require(_validRecipient(to), "PrivateERC20: invalid recipient");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

இப்போது அதை மாக் செய்வோம்.

```solidity
pragma solidity ^0.6.0;
import "../PrivateERC20.sol";

contract PrivateERC20Mock is PrivateERC20 {
    bool isPublicConfig;

    constructor() public PrivateERC20(0) {}

    function setIsPublic(bool isPublic) external {
        isPublicConfig = isPublic;
    }

    function isPublic() public view returns (bool) {
        return isPublicConfig;
    }
}
```

பின்வரும் பிழைச் செய்திகளில் ஒன்றைப் பெறுவீர்கள்:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

நாங்கள் புதிய 0.6 Solidity பதிப்பைப் பயன்படுத்துவதால், ஓவர்ரைடு செய்யக்கூடிய சார்புகளுக்கு `virtual` முக்கிய சொல்லைச் சேர்க்க வேண்டும் மற்றும் ஓவர்ரைடு செய்யும் சார்புக்கு override-ஐச் சேர்க்க வேண்டும். எனவே அவற்றை இரண்டு `isPublic` சார்புகளிலும் சேர்ப்போம்.

இப்போது உங்கள் யூனிட் சோதனைகளில், அதற்குப் பதிலாக `PrivateERC20Mock` ஐப் பயன்படுத்தலாம். பிரைவேட் பயன்பாட்டு நேரத்தின் போது நடத்தையைச் சோதிக்க விரும்பினால், `setIsPublic(false)` ஐப் பயன்படுத்தவும், அதேபோல பொதுப் பயன்பாட்டு நேரத்தைச் சோதிக்க `setIsPublic(true)` ஐப் பயன்படுத்தவும். நிச்சயமாக எங்கள் எடுத்துக்காட்டில், நேரங்களை அதற்கேற்ப மாற்ற [நேர உதவியாளர்களை (time helpers)](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) பயன்படுத்தலாம். ஆனால் மாக் செய்யும் யோசனை இப்போது தெளிவாக இருக்க வேண்டும், மேலும் நேரத்தை வெறுமனே முன்னேற்றுவது போல் எளிதாக இல்லாத காட்சிகளை நீங்கள் கற்பனை செய்து பார்க்கலாம்.

## பல ஒப்பந்தங்களை மாக் செய்தல் {#mocking-many-contracts}

ஒவ்வொரு மாக்-க்கும் நீங்கள் மற்றொரு ஒப்பந்தத்தை உருவாக்க வேண்டியிருந்தால் அது குழப்பமாக மாறலாம். இது உங்களுக்குச் சிரமமாக இருந்தால், நீங்கள் [MockContract](https://github.com/gnosis/mock-contract) நிரலகத்தைப் (library) பார்க்கலாம். இது ஒப்பந்தங்களின் நடத்தைகளை உடனுக்குடன் ஓவர்ரைடு செய்யவும் மாற்றவும் உங்களை அனுமதிக்கிறது. இருப்பினும், இது மற்றொரு ஒப்பந்தத்திற்கான அழைப்புகளை மாக் செய்வதற்கு மட்டுமே வேலை செய்யும், எனவே இது எங்கள் எடுத்துக்காட்டுக்கு வேலை செய்யாது.

## மாக்கிங் இன்னும் சக்திவாய்ந்ததாக இருக்கும் {#mocking-can-be-even-more-powerful}

மாக்கிங்கின் சக்திகள் அத்துடன் முடிவதில்லை.

- சார்புகளைச் சேர்த்தல்: ஒரு குறிப்பிட்ட சார்பை ஓவர்ரைடு செய்வது மட்டுமல்லாமல், கூடுதல் சார்புகளைச் சேர்ப்பதும் பயனுள்ளதாக இருக்கும். டோக்கன்களுக்கான ஒரு நல்ல எடுத்துக்காட்டு, எந்தவொரு பயனரும் புதிய டோக்கன்களை இலவசமாகப் பெற அனுமதிக்க கூடுதல் `mint` சார்பைக் கொண்டிருப்பதாகும்.
- சோதனை வலைப்பின்னல்களில் (testnets) பயன்பாடு: உங்கள் பரவலாக்கப்பட்ட செயலியுடன் (dapp) சோதனை வலைப்பின்னல்களில் உங்கள் ஒப்பந்தங்களை நிலைநிறுத்தி (deploy) சோதிக்கும் போது, மாக் செய்யப்பட்ட பதிப்பைப் பயன்படுத்துவதைக் கருத்தில் கொள்ளுங்கள். உங்களுக்கு உண்மையிலேயே தேவைப்படாவிட்டால் சார்புகளை ஓவர்ரைடு செய்வதைத் தவிர்க்கவும். எல்லாவற்றிற்கும் மேலாக நீங்கள் உண்மையான லாஜிக்கைச் சோதிக்க விரும்புகிறீர்கள். ஆனால் எடுத்துக்காட்டாக ஒரு ரீசெட் (reset) சார்பைச் சேர்ப்பது பயனுள்ளதாக இருக்கும், இது ஒப்பந்த நிலையை (state) தொடக்கத்திற்கு மீட்டமைக்கிறது, புதிய நிலைநிறுத்தம் (deployment) தேவையில்லை. வெளிப்படையாக நீங்கள் அதை ஒரு முதன்மை வலைப்பின்னல் (Mainnet) ஒப்பந்தத்தில் வைத்திருக்க விரும்ப மாட்டீர்கள்.