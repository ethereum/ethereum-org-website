---
title: "स्कॅम टोकन्सद्वारे वापरल्या जाणाऱ्या काही युक्त्या आणि त्या कशा ओळखाव्यात"
description: "या ट्युटोरियलमध्ये आपण एका स्कॅम टोकनचे विश्लेषण करू, ज्यामध्ये स्कॅमर्स वापरत असलेल्या काही युक्त्या, त्या कशा लागू केल्या जातात, आणि त्या कशा ओळखाव्यात हे पाहू."
author: "ओरी पोमेरँट्झ"
tags:
  [
    "स्कॅम",
    "सॉलिडिटी",
    "erc-20",
    "javascript",
    "typescript"
  ]
skill: intermediate
published: 2023-09-15
lang: mr
---

या ट्युटोरियलमध्ये आपण [एका स्कॅम टोकनचे](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) विश्लेषण करू, ज्यामध्ये स्कॅमर्स वापरत असलेल्या काही युक्त्या आणि त्या कशा लागू केल्या जातात हे पाहू. या ट्युटोरियलच्या शेवटी तुम्हाला ERC-20 टोकन कॉन्ट्रॅक्ट्स, त्यांची क्षमता, आणि संशय घेणे का आवश्यक आहे याबद्दल अधिक व्यापक दृष्टिकोन मिळेल. त्यानंतर आपण त्या स्कॅम टोकनद्वारे उत्सर्जित केलेल्या इव्हेंट्सकडे पाहू आणि ते स्वयंचलितपणे कायदेशीर नाही हे कसे ओळखता येईल ते पाहू.

## स्कॅम टोकन्स - ते काय आहेत, लोक ते का करतात, आणि ते कसे टाळावे {#scam-tokens}

Ethereum च्या सर्वात सामान्य उपयोगांपैकी एक म्हणजे एखाद्या गटाने एक ट्रेडेबल टोकन तयार करणे, एका अर्थाने त्यांचे स्वतःचे चलन. तथापि, जिथे कुठे मूल्य आणणारी वैध उपयोग-प्रकरणे आहेत, तिथे असे गुन्हेगार देखील आहेत जे ते मूल्य स्वतःसाठी चोरण्याचा प्रयत्न करतात.

आपण या विषयाबद्दल अधिक माहिती वापरकर्त्याच्या दृष्टिकोनातून [ethereum.org वर इतरत्र](/guides/how-to-id-scam-tokens/) वाचू शकता. हे ट्युटोरियल एका स्कॅम टोकनचे विश्लेषण करण्यावर लक्ष केंद्रित करते, जेणेकरून ते कसे केले जाते आणि ते कसे ओळखले जाऊ शकते हे पाहता येईल.

### मला कसे कळेल की wARB एक स्कॅम आहे? {#warb-scam}

आपण ज्या टोकनचे विश्लेषण करत आहोत ते [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) आहे, जे कायदेशीर [ARB टोकनच्या](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) समकक्ष असल्याचे भासवते.

कोणते टोकन कायदेशीर आहे हे जाणून घेण्याचा सर्वात सोपा मार्ग म्हणजे मूळ संस्था, [Arbitrum](https://arbitrum.foundation/) पाहणे. कायदेशीर ऍड्रेस [त्यांच्या डॉक्युमेंटेशनमध्ये](https://docs.arbitrum.foundation/deployment-addresses#token) निर्दिष्ट केले आहेत.

### सोर्स कोड का उपलब्ध आहे? {#why-source}

साधारणपणे, इतरांना फसवण्याचा प्रयत्न करणारे लोक गुप्त राहतील अशी अपेक्षा असते, आणि खरंच अनेक स्कॅम टोकन्सचा कोड उपलब्ध नसतो (उदाहरणार्थ, [हा](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) आणि [हा](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

तथापि, कायदेशीर टोकन्स सामान्यतः त्यांचा सोर्स कोड प्रकाशित करतात, म्हणून कायदेशीर दिसण्यासाठी स्कॅम टोकन्सचे लेखक कधीकधी तेच करतात. [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) हे त्या टोकन्सपैकी एक आहे ज्याचा सोर्स कोड उपलब्ध आहे, ज्यामुळे ते समजणे सोपे होते.

कॉन्ट्रॅक्ट डिप्लॉयर्स सोर्स कोड प्रकाशित करायचा की नाही हे निवडू शकत असले तरी, ते चुकीचा सोर्स कोड प्रकाशित _करू शकत नाहीत_. ब्लॉक एक्सप्लोरर प्रदान केलेला सोर्स कोड स्वतंत्रपणे कंपाइल करतो, आणि जर त्याला तंतोतंत तोच बायटकोड मिळाला नाही, तर तो तो सोर्स कोड नाकारतो. [आपण याबद्दल अधिक माहिती Etherscan साइटवर वाचू शकता](https://etherscan.io/verifyContract).

## कायदेशीर ERC-20 टोकन्सशी तुलना {#compare-legit-erc20}

आपण या टोकनची कायदेशीर ERC-20 टोकन्सशी तुलना करणार आहोत. जर तुम्हाला कायदेशीर ERC-20 टोकन्स सामान्यतः कसे लिहिले जातात याबद्दल माहिती नसेल, तर [हे ट्युटोरियल पहा](/developers/tutorials/erc20-annotated-code/).

### विशेषाधिकारप्राप्त ऍड्रेससाठी कॉन्स्टंट्स {#constants-for-privileged-addresses}

कॉन्ट्रॅक्ट्सना कधीकधी विशेषाधिकारप्राप्त ऍड्रेसची आवश्यकता असते. दीर्घकालीन वापरासाठी डिझाइन केलेले कॉन्ट्रॅक्ट्स काही विशेषाधिकारप्राप्त ऍड्रेसना ते ऍड्रेस बदलण्याची परवानगी देतात, उदाहरणार्थ नवीन मल्टीसिग कॉन्ट्रॅक्टचा वापर सक्षम करण्यासाठी. हे करण्याचे अनेक मार्ग आहेत.

[`HOP` टोकन कॉन्ट्रॅक्ट](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable) पॅटर्न वापरतो. विशेषाधिकारप्राप्त ऍड्रेस स्टोरेजमध्ये `_owner` नावाच्या फील्डमध्ये ठेवला जातो (तिसरी फाईल `Ownable.sol` पहा).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

[`ARB` टोकन कॉन्ट्रॅक्टमध्ये](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) थेट विशेषाधिकारप्राप्त ऍड्रेस नाही. तथापि, त्याला त्याची गरज नाही. ते [ऍड्रेस `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code) येथे एका [`प्रॉक्सी`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) मागे आहे. त्या कॉन्ट्रॅक्टमध्ये एक विशेषाधिकारप्राप्त ऍड्रेस आहे (चौथी फाईल, `ERC1967Upgrade.sol` पहा) जो अपग्रेडसाठी वापरला जाऊ शकतो.

```solidity
    /**
     * @dev EIP1967 ऍडमिन स्लॉटमध्ये नवीन ऍड्रेस संग्रहित करतो.
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: नवीन ऍडमिन शून्य ऍड्रेस आहे");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

याउलट, `wARB` कॉन्ट्रॅक्टमध्ये हार्ड कोडेड `contract_owner` आहे.

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

[हा कॉन्ट्रॅक्ट मालक](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) असा कॉन्ट्रॅक्ट नाही जो वेगवेगळ्या वेळी वेगवेगळ्या खात्यांद्वारे नियंत्रित केला जाऊ शकतो, तर तो एक [बाह्य मालकीचे खाते](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) आहे. याचा अर्थ असा आहे की ते बहुधा एखाद्या व्यक्तीद्वारे अल्पकालीन वापरासाठी डिझाइन केलेले आहे, जे मौल्यवान राहील अशा ERC-20 नियंत्रित करण्यासाठी दीर्घकालीन उपाय म्हणून नाही.

आणि खरंच, जर आपण Etherscan मध्ये पाहिले तर आपल्याला दिसेल की स्कॅमरने हा कॉन्ट्रॅक्ट 19 मे 2023 रोजी फक्त 12 तासांसाठी वापरला होता ([पहिला व्यवहार](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) ते [शेवटचा व्यवहार](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)).

### खोटे `_transfer` फंक्शन {#the-fake-transfer-function}

[अंतर्गत `_transfer` फंक्शन](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer) वापरून प्रत्यक्ष हस्तांतरण करणे हे मानक आहे.

`wARB` मध्ये हे फंक्शन जवळपास कायदेशीर दिसते:

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: शून्य ऍड्रेसवरून हस्तांतरण");
        require(recipient != address(0), "ERC20: शून्य ऍड्रेसवर हस्तांतरण");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: हस्तांतरण रक्कम शिलकीपेक्षा जास्त आहे");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

संशयास्पद भाग आहे:

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

जर कॉन्ट्रॅक्ट मालक टोकन्स पाठवत असेल, तर `Transfer` इव्हेंट ते `deployer` कडून आल्याचे का दाखवतो?

तथापि, एक अधिक महत्त्वाचा मुद्दा आहे. हे `_transfer` फंक्शन कोण कॉल करते? ते बाहेरून कॉल केले जाऊ शकत नाही, ते `internal` म्हणून चिन्हांकित आहे. आणि आपल्याकडे असलेल्या कोडमध्ये `_transfer` ला कोणतेही कॉल समाविष्ट नाहीत. स्पष्टपणे, ते येथे एक दिशाभूल करण्यासाठी आहे.

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: हस्तांतरण रक्कम परवानगीपेक्षा जास्त आहे"));
        return true;
    }
```

जेव्हा आपण टोकन्स हस्तांतरित करण्यासाठी कॉल केलेल्या फंक्शन्स, `transfer` आणि `transferFrom` पाहतो, तेव्हा आपल्याला दिसते की ते `_f_` नावाचे पूर्णपणे वेगळे फंक्शन कॉल करतात.

### वास्तविक `_f_` फंक्शन {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: शून्य ऍड्रेसवरून हस्तांतरण");
        require(recipient != address(0), "ERC20: शून्य ऍड्रेसवर हस्तांतरण");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: हस्तांतरण रक्कम शिलकीपेक्षा जास्त आहे");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

या फंक्शनमध्ये दोन संभाव्य धोक्याचे संकेत आहेत.

- [फंक्शन मॉडिफायर](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_` चा वापर. तथापि, जेव्हा आपण सोर्स कोडमध्ये पाहतो तेव्हा आपल्याला दिसते की `_mod_` प्रत्यक्षात निरुपद्रवी आहे.

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- `_transfer` मध्ये आपण पाहिलेला तोच मुद्दा, म्हणजे जेव्हा `contract_owner` टोकन्स पाठवतो तेव्हा ते `deployer` कडून आल्याचे दिसतात.

### खोटे इव्हेंट्स फंक्शन `dropNewTokens` {#the-fake-events-function-dropNewTokens}

आता आपण अशा गोष्टीकडे येतो जी प्रत्यक्ष स्कॅमसारखी दिसते. मी वाचनीयतेसाठी फंक्शनमध्ये थोडा बदल केला आहे, परंतु ते कार्यात्मकदृष्ट्या समतुल्य आहे.

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

या फंक्शनमध्ये `auth()` मॉडिफायर आहे, याचा अर्थ ते फक्त कॉन्ट्रॅक्ट मालकाद्वारेच कॉल केले जाऊ शकते.

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "संवाद साधण्याची परवानगी नाही");
    _;
}
```

हे बंधन पूर्णपणे योग्य आहे, कारण आम्हाला नको की कोणतीही यादृच्छिक खाती टोकन्स वितरित करतील. तथापि, फंक्शनचा उर्वरित भाग संशयास्पद आहे.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

एका पूल खात्यातून रिसीव्हर्सच्या अॅरेला रकमेच्या अॅरेमध्ये हस्तांतरित करण्याचे फंक्शन पूर्णपणे योग्य आहे. असे अनेक उपयोग आहेत ज्यात आपल्याला एकाच स्त्रोतावरून अनेक ठिकाणी टोकन्स वितरित करायचे असतील, जसे की वेतन, एअरड्रॉप्स, इत्यादी. एकाच व्यवहाराचा भाग म्हणून एका वेगळ्या कॉन्ट्रॅक्टमधून ERC-20 ला अनेक वेळा कॉल करण्याऐवजी किंवा अनेक व्यवहार करण्याऐवजी एकाच व्यवहारात करणे (गॅसमध्ये) स्वस्त आहे.

तथापि, `dropNewTokens` तसे करत नाही. ते [`Transfer` इव्हेंट्स](https://eips.ethereum.org/EIPS/eip-20#transfer-1) उत्सर्जित करते, परंतु प्रत्यक्षात कोणतेही टोकन हस्तांतरित करत नाही. प्रत्यक्षात न झालेल्या हस्तांतरणाबद्दल सांगून ऑफचेन ऍप्लिकेशन्सना गोंधळात टाकण्याचे कोणतेही कायदेशीर कारण नाही.

### बर्निंग `Approve` फंक्शन {#the-burning-approve-function}

ERC-20 कॉन्ट्रॅक्ट्समध्ये परवानगीसाठी [एक `approve` फंक्शन](/developers/tutorials/erc20-annotated-code/#approve) असणे अपेक्षित आहे, आणि खरंच आमच्या स्कॅम टोकनमध्ये असे फंक्शन आहे, आणि ते योग्य देखील आहे. तथापि, Solidity C मधून आलेली असल्यामुळे ती केस-महत्त्वपूर्ण (case significant) आहे. "Approve" आणि "approve" या वेगवेगळ्या स्ट्रिंग्स आहेत.

तसेच, कार्यक्षमता `approve` शी संबंधित नाही.

```solidity
    function Approve(
        address[] memory holders)
```

हे फंक्शन टोकन धारकांच्या ऍड्रेसच्या अॅरेसह कॉल केले जाते.

```solidity
    public approver() {
```

`approver()` मॉडिफायर हे सुनिश्चित करतो की फक्त `contract_owner` ला हे फंक्शन कॉल करण्याची परवानगी आहे (खाली पहा).

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
            _balances[holders[i]] = _balances[holders[i]].sub(amount,
                "ERC20: बर्न रक्कम शिलकीपेक्षा जास्त आहे");
            _balances[0x0000000000000000000000000000000000000001] =
                _balances[0x0000000000000000000000000000000000000001].add(amount);
        }
    }

```

प्रत्येक धारकाच्या ऍड्रेससाठी हे फंक्शन धारकाची संपूर्ण शिल्लक `0x00...01` ऍड्रेसवर हलवते, प्रभावीपणे ते बर्न करते (मानकातील वास्तविक `burn` एकूण पुरवठा देखील बदलते, आणि टोकन्स `0x00...00` वर हस्तांतरित करते). याचा अर्थ `contract_owner` कोणत्याही वापरकर्त्याची मालमत्ता काढून टाकू शकतो. हे गव्हर्नन्स टोकनमध्ये अपेक्षित असलेले वैशिष्ट्य वाटत नाही.

### कोड गुणवत्ता समस्या {#code-quality-issues}

या कोड गुणवत्ता समस्या हे _सिद्ध करत नाहीत_ की हा कोड एक स्कॅम आहे, परंतु त्या त्याला संशयास्पद बनवतात. Arbitrum सारख्या संघटित कंपन्या सहसा इतका खराब कोड प्रसिद्ध करत नाहीत.

#### `mount` फंक्शन {#the-mount-function}

[मानकामध्ये](https://eips.ethereum.org/EIPS/eip-20) निर्दिष्ट नसले तरी, सामान्यतः नवीन टोकन्स तयार करणाऱ्या फंक्शनला [`mint`](https://ethereum.org/el/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) म्हणतात.

`wARB` कंस्ट्रक्टरमध्ये पाहिल्यास, आपल्याला दिसते की मिंट फंक्शनचे नाव काही कारणास्तव `mount` असे ठेवले आहे, आणि कार्यक्षमतेसाठी संपूर्ण रकमेसाठी एकदा कॉल करण्याऐवजी प्रारंभिक पुरवठ्याच्या पाचव्या भागासह पाच वेळा कॉल केले आहे.

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

`mount` फंक्शन स्वतःच संशयास्पद आहे.

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: शून्य ऍड्रेसवर मिंट करा");
```

`require` पाहिल्यावर, आपल्याला दिसते की फक्त कॉन्ट्रॅक्ट मालकालाच मिंट करण्याची परवानगी आहे. ते कायदेशीर आहे. परंतु एरर मेसेज _फक्त मालकाला मिंट करण्याची परवानगी आहे_ किंवा असे काहीतरी असायला हवे होते. त्याऐवजी, तो असंबंधित _ERC20: शून्य ऍड्रेसवर मिंट करा_ आहे. शून्य ऍड्रेसवर मिंट करण्यासाठी योग्य चाचणी `require(account != address(0), "<error message>")` आहे, जी कॉन्ट्रॅक्ट कधीही तपासण्याची तसदी घेत नाही.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

मिंटिंगशी थेट संबंधित आणखी दोन संशयास्पद तथ्ये आहेत:

- एक `account` पॅरामीटर आहे, जे बहुधा ते खाते आहे ज्याला मिंट केलेली रक्कम मिळायला हवी. परंतु जी शिल्लक वाढते ती प्रत्यक्षात `contract_owner`ची आहे.

- `contract_owner` ची शिल्लक वाढली असली तरी, उत्सर्जित केलेला इव्हेंट `account` ला हस्तांतरण दाखवतो.

### `auth` आणि `approver` दोन्ही का? काहीही न करणारा `mod` का? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

या कॉन्ट्रॅक्टमध्ये तीन मॉडिफायर्स आहेत: `_mod_`, `auth`, आणि `approver`.

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` तीन पॅरामीटर्स घेते आणि त्यांच्यासोबत काहीही करत नाही. ते का आहे?

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "संवाद साधण्याची परवानगी नाही");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "संवाद साधण्याची परवानगी नाही");
        _;
    }
```

`auth` आणि `approver` अधिक अर्थपूर्ण आहेत, कारण ते तपासतात की कॉन्ट्रॅक्ट `contract_owner` द्वारे कॉल केला गेला होता. आम्ही अपेक्षा करतो की मिंटिंगसारख्या काही विशेषाधिकारप्राप्त क्रिया त्या खात्यापुरत्या मर्यादित असतील. तथापि, _तंतोतंत तेच काम_ करणारी दोन वेगळी फंक्शन्स ठेवण्याचा काय उपयोग आहे?

## आपण स्वयंचलितपणे काय ओळखू शकतो? {#what-can-we-detect-automatically}

Etherscan मध्ये पाहून आपण पाहू शकतो की `wARB` हे एक स्कॅम टोकन आहे. तथापि, तो एक केंद्रीकृत उपाय आहे. सिद्धांतानुसार, Etherscan ला उलथवून टाकले जाऊ शकते किंवा हॅक केले जाऊ शकते. एखादे टोकन कायदेशीर आहे की नाही हे स्वतंत्रपणे ठरवता येणे चांगले आहे.

काही युक्त्या आहेत ज्यांचा वापर करून आपण ERC-20 टोकन संशयास्पद आहे की नाही हे ओळखू शकतो (एकतर स्कॅम किंवा खूप वाईट लिहिलेले), ते उत्सर्जित करत असलेल्या इव्हेंट्सकडे पाहून.

## संशयास्पद `Approval` इव्हेंट्स {#suspicious-approval-events}

[`Approval` इव्हेंट्स](https://eips.ethereum.org/EIPS/eip-20#approval) फक्त थेट विनंतीनेच व्हायला पाहिजेत ([`Transfer` इव्हेंट्स](https://eips.ethereum.org/EIPS/eip-20#transfer-1) च्या विरोधात जे परवानगीच्या परिणामी होऊ शकतात). या समस्येच्या तपशीलवार स्पष्टीकरणासाठी आणि विनंत्या कॉन्ट्रॅक्टद्वारे मध्यस्थी करण्याऐवजी थेट का असाव्यात यासाठी [Solidity डॉक्स पहा](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin).

याचा अर्थ असा आहे की [बाह्य मालकीच्या खात्यातून](/developers/docs/accounts/#types-of-account) खर्च मंजूर करणारे `Approval` इव्हेंट्स त्या खात्यात उगम पावलेल्या व्यवहारांमधून यायला हवेत, आणि ज्यांचे गंतव्यस्थान ERC-20 कॉन्ट्रॅक्ट आहे. बाह्य मालकीच्या खात्यातून कोणत्याही इतर प्रकारची मंजुरी संशयास्पद आहे.

[viem](https://viem.sh/) आणि [TypeScript](https://www.typescriptlang.org/docs/), टाइप सुरक्षिततेसह जावास्क्रिप्टचा एक प्रकार, वापरून [या प्रकारचा इव्हेंट ओळखणारा एक प्रोग्राम](https://github.com/qbzzt/20230915-scam-token-detection) येथे आहे. ते चालवण्यासाठी:

1. `.env.example` ची प्रत `.env` मध्ये बनवा.
2. Ethereum मेननेट नोडचा URL देण्यासाठी `.env` संपादित करा.
3. आवश्यक पॅकेजेस इंस्टॉल करण्यासाठी `pnpm install` चालवा.
4. संशयास्पद मंजुरी शोधण्यासाठी `pnpm susApproval` चालवा.

येथे ओळी-ओळीने स्पष्टीकरण दिले आहे:

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

`viem` मधून टाइप व्याख्या, फंक्शन्स आणि चेन व्याख्या आयात करा.

```typescript
import { config } from "dotenv"
config()
```

URL मिळवण्यासाठी `.env` वाचा.

```typescript
const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.URL),
})
```

एक Viem क्लायंट तयार करा. आम्हाला फक्त ब्लॉकचेनवरून वाचण्याची गरज आहे, म्हणून या क्लायंटला खाजगी की (private key) ची गरज नाही.

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

संशयास्पद ERC-20 कॉन्ट्रॅक्टचा ऍड्रेस आणि ज्या ब्लॉक्समध्ये आपण इव्हेंट्स शोधू. नोड प्रदाते सामान्यतः इव्हेंट्स वाचण्याची आमची क्षमता मर्यादित करतात कारण बँडविड्थ महाग होऊ शकते. सुदैवाने `wARB` अठरा तासांच्या कालावधीसाठी वापरात नव्हते, म्हणून आपण सर्व इव्हेंट्स शोधू शकतो (एकूण फक्त 13 होते).

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

Viem कडून इव्हेंट माहिती मागण्याचा हा मार्ग आहे. जेव्हा आपण त्याला फील्ड नावांसह अचूक इव्हेंट सिग्नेचर देतो, तेव्हा ते आमच्यासाठी इव्हेंट पार्स करते.

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

आमचा अल्गोरिदम फक्त बाह्य मालकीच्या खात्यांसाठी लागू होतो. `client.getBytecode` द्वारे कोणताही बायटकोड परत आल्यास याचा अर्थ असा की हा एक कॉन्ट्रॅक्ट आहे आणि आपण तो वगळला पाहिजे.

जर तुम्ही यापूर्वी TypeScript वापरले नसेल, तर फंक्शनची व्याख्या थोडी विचित्र वाटू शकते. आपण फक्त पहिला (आणि एकमेव) पॅरामीटर `addr` आहे असे सांगत नाही, तर तो `Address` प्रकारचा आहे असेही सांगतो. त्याचप्रमाणे, `: boolean` भाग TypeScript ला सांगतो की फंक्शनचे रिटर्न व्हॅल्यू बुलियन आहे.

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

हे फंक्शन इव्हेंटमधून व्यवहार पावती (transaction receipt) मिळवते. व्यवहाराचे गंतव्यस्थान काय होते हे सुनिश्चित करण्यासाठी आम्हाला पावतीची आवश्यकता आहे.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

हे सर्वात महत्त्वाचे फंक्शन आहे, जे प्रत्यक्षात ठरवते की इव्हेंट संशयास्पद आहे की नाही. रिटर्न प्रकार, `(Event | null)`, TypeScript ला सांगतो की हे फंक्शन `Event` किंवा `null` परत करू शकते. जर इव्हेंट संशयास्पद नसेल तर आपण `null` परत करतो.

```typescript
const owner = ev.args._owner
```

Viem कडे फील्ड नावे आहेत, म्हणून त्याने आमच्यासाठी इव्हेंट पार्स केला. `_owner` खर्च करायच्या टोकन्सचा मालक आहे.

```typescript
// कॉन्ट्रॅक्ट्सद्वारे केलेल्या मंजुरी संशयास्पद नाहीत
if (await isContract(owner)) return null
```

जर मालक कॉन्ट्रॅक्ट असेल, तर ही मंजुरी संशयास्पद नाही असे समजा. कॉन्ट्रॅक्टची मंजुरी संशयास्पद आहे की नाही हे तपासण्यासाठी, आपल्याला व्यवहाराच्या संपूर्ण अंमलबजावणीचा मागोवा घ्यावा लागेल की ते कधी मालक कॉन्ट्रॅक्टपर्यंत पोहोचले का, आणि त्या कॉन्ट्रॅक्टने थेट ERC-20 कॉन्ट्रॅक्टला कॉल केला का. हे करण्यापेक्षा खूप जास्त संसाधन-खर्चिक आहे.

```typescript
const txn = await getEventTxn(ev)
```

जर मंजुरी बाह्य मालकीच्या खात्यातून आली असेल, तर ज्या व्यवहारामुळे ती झाली तो मिळवा.

```typescript
// जर मंजुरी EOA मालकाकडून आली असेल जो व्यवहाराचा `from` नाही तर ती संशयास्पद आहे
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

आपण फक्त स्ट्रिंग समानतेसाठी तपासणी करू शकत नाही कारण ऍड्रेस हेक्साडेसिमल आहेत, त्यामुळे त्यात अक्षरे असतात. कधीकधी, उदाहरणार्थ `txn.from` मध्ये, ती अक्षरे सर्व लोअरकेसमध्ये असतात. इतर प्रकरणांमध्ये, जसे की `ev.args._owner`, ऍड्रेस [एरर ओळखण्यासाठी मिश्र-केसमध्ये](https://eips.ethereum.org/EIPS/eip-55) असतो.

परंतु जर व्यवहार मालकाकडून नसेल, आणि तो मालक बाह्य मालकीचा असेल, तर आपल्याकडे एक संशयास्पद व्यवहार आहे.

```typescript
// जर व्यवहाराचे गंतव्यस्थान आपण तपासत असलेला ERC-20 कॉन्ट्रॅक्ट नसेल तर ते देखील संशयास्पद आहे
// investigating
if (txn.to.toLowerCase() != testedAddress) return ev
```

त्याचप्रमाणे, जर व्यवहाराचा `to` ऍड्रेस, पहिला कॉल केलेला कॉन्ट्रॅक्ट, तपासाखालील ERC-20 कॉन्ट्रॅक्ट नसेल तर ते संशयास्पद आहे.

```typescript
    // संशय घेण्याचे कोणतेही कारण नसल्यास, null परत करा.
    return null
}
```

जर दोन्हीपैकी कोणतीही अट सत्य नसेल तर `Approval` इव्हेंट संशयास्पद नाही.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[एक `async` फंक्शन](https://www.w3schools.com/js/js_async.asp) एक `Promise` ऑब्जेक्ट परत करते. सामान्य सिंटॅक्ससह, `await x()`, आम्ही प्रक्रिया सुरू ठेवण्यापूर्वी त्या `Promise` च्या पूर्ततेची प्रतीक्षा करतो. हे प्रोग्राम करण्यास आणि फॉलो करण्यास सोपे आहे, परंतु ते अकार्यक्षम देखील आहे. एका विशिष्ट इव्हेंटसाठी `Promise` पूर्ण होण्याची वाट पाहत असताना आपण पुढील इव्हेंटवर काम सुरू करू शकतो.

येथे आपण `Promise` ऑब्जेक्ट्सची अॅरे तयार करण्यासाठी [`map`](https://www.w3schools.com/jsref/jsref_map.asp) वापरतो. मग आम्ही त्या सर्व प्रॉमिसेसच्या निराकरणासाठी प्रतीक्षा करण्यासाठी [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) वापरतो. नंतर आम्ही त्या परिणामांना [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp) करून असंशयास्पद इव्हेंट्स काढून टाकतो.

### संशयास्पद `Transfer` इव्हेंट्स {#suspicious-transfer-events}

स्कॅम टोकन्स ओळखण्याचा आणखी एक संभाव्य मार्ग म्हणजे त्यांच्यात कोणतेही संशयास्पद हस्तांतरण आहे का ते पाहणे. उदाहरणार्थ, ज्या खात्यांमध्ये तितके टोकन्स नाहीत अशा खात्यांमधून हस्तांतरण. तुम्ही [ही चाचणी कशी अंमलात आणायची हे पाहू शकता](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts), पण `wARB` मध्ये ही समस्या नाही.

## निष्कर्ष {#conclusion}

ERC-20 स्कॅमचे स्वयंचलित शोध [फॉल्स निगेटिव्ह](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error) पासून ग्रस्त आहे, कारण स्कॅम एक पूर्णपणे सामान्य ERC-20 टोकन कॉन्ट्रॅक्ट वापरू शकतो जो फक्त काहीही वास्तविक दर्शवत नाही. म्हणून तुम्ही नेहमी _विश्वसनीय स्त्रोताकडून टोकन ऍड्रेस मिळवण्याचा_ प्रयत्न केला पाहिजे.

स्वयंचलित शोध काही प्रकरणांमध्ये मदत करू शकतो, जसे की DeFi चे भाग, जिथे अनेक टोकन्स आहेत आणि त्यांना स्वयंचलितपणे हाताळले जाणे आवश्यक आहे. पण नेहमीप्रमाणे [केव्हिएट एम्प्टर](https://www.investopedia.com/terms/c/caveatemptor.asp), तुम्ही स्वतःचे संशोधन करा आणि तुमच्या वापरकर्त्यांनाही तसे करण्यास प्रोत्साहित करा.

[माझ्या कामाबद्दल अधिक माहितीसाठी येथे पहा](https://cryptodocguy.pro/).
