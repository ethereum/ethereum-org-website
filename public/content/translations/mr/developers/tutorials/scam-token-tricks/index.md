---
title: "स्कॅम टोकन्सद्वारे वापरल्या जाणाऱ्या काही युक्त्या आणि त्या कशा ओळखायच्या"
description: या ट्युटोरिअलमध्ये आपण स्कॅमर्स कोणत्या युक्त्या वापरतात, त्यांची अंमलबजावणी कशी करतात आणि आपण त्या कशा ओळखू शकतो हे पाहण्यासाठी एका स्कॅम टोकनचे विश्लेषण करू.
author: ओरी पोमेरँट्झ
tags:
  - स्कॅम
  - Solidity
  - ERC-20
  - JavaScript
  - TypeScript
skill: intermediate
breadcrumb: स्कॅम टोकनच्या युक्त्या
published: 2023-09-15
lang: mr
---

या ट्युटोरिअलमध्ये आपण स्कॅमर्स कोणत्या युक्त्या वापरतात आणि त्यांची अंमलबजावणी कशी करतात हे पाहण्यासाठी [एका स्कॅम टोकनचे](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) विश्लेषण करू. या ट्युटोरिअलच्या शेवटी तुम्हाला ERC-20 टोकन कॉन्ट्रॅक्ट्स, त्यांच्या क्षमता आणि संशयवाद का आवश्यक आहे याबद्दल अधिक व्यापक दृष्टिकोन मिळेल. त्यानंतर आपण त्या स्कॅम टोकनद्वारे उत्सर्जित होणाऱ्या घटना पाहू आणि ते कायदेशीर नाही हे आपण स्वयंचलितपणे कसे ओळखू शकतो ते पाहू.

## स्कॅम टोकन्स - ते काय आहेत, लोक ते का करतात आणि ते कसे टाळावे {#scam-tokens}

इथेरियमचा सर्वात सामान्य वापर म्हणजे एखाद्या गटाने व्यापार करण्यायोग्य टोकन तयार करणे, एका अर्थाने त्यांचे स्वतःचे चलन. तथापि, जिथे मूल्य आणणारे कायदेशीर वापर प्रकरणे (use cases) असतात, तिथे गुन्हेगार देखील असतात जे ते मूल्य स्वतःसाठी चोरण्याचा प्रयत्न करतात.

वापरकर्त्याच्या दृष्टिकोनातून तुम्ही या विषयाबद्दल [ethereum.org वर इतरत्र](/guides/how-to-id-scam-tokens/) अधिक वाचू शकता. हे ट्युटोरिअल स्कॅम टोकनचे विश्लेषण करण्यावर लक्ष केंद्रित करते जेणेकरून ते कसे केले जाते आणि ते कसे ओळखले जाऊ शकते हे पाहता येईल.

### wARB हा स्कॅम आहे हे मला कसे कळेल? {#warb-scam}

आपण ज्या टोकनचे विश्लेषण करत आहोत ते [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) आहे, जे कायदेशीर [ARB टोकनच्या](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) समतुल्य असल्याचे भासवते.

कोणते टोकन कायदेशीर आहे हे जाणून घेण्याचा सर्वात सोपा मार्ग म्हणजे मूळ संस्था, [आर्बिट्रम्](https://arbitrum.foundation/) कडे पाहणे. कायदेशीर पत्ते [त्यांच्या दस्तऐवजीकरणामध्ये](https://docs.arbitrum.foundation/deployment-addresses#token) निर्दिष्ट केले आहेत.

### सोर्स कोड का उपलब्ध आहे? {#why-source}

साधारणपणे आपण अशी अपेक्षा करतो की जे लोक इतरांची फसवणूक करण्याचा प्रयत्न करतात ते गुप्तता बाळगतात आणि खरोखरच अनेक स्कॅम टोकन्सचा कोड उपलब्ध नसतो (उदाहरणार्थ, [हे](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) आणि [हे](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

तथापि, कायदेशीर टोकन्स सहसा त्यांचा सोर्स कोड प्रकाशित करतात, त्यामुळे कायदेशीर दिसण्यासाठी स्कॅम टोकन्सचे लेखक कधीकधी असेच करतात. [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) हे सोर्स कोड उपलब्ध असलेल्या टोकन्सपैकी एक आहे, ज्यामुळे ते समजणे सोपे होते.

कॉन्ट्रॅक्ट डिप्लॉयर्स सोर्स कोड प्रकाशित करायचा की नाही हे निवडू शकतात, परंतु ते चुकीचा सोर्स कोड प्रकाशित करू _शकत नाहीत_. ब्लॉक एक्सप्लोरर प्रदान केलेला सोर्स कोड स्वतंत्रपणे संकलित (compile) करतो आणि जर त्याला अगदी तसाच बाइटकोड मिळाला नाही, तर तो तो सोर्स कोड नाकारतो. [तुम्ही Etherscan साइटवर याबद्दल अधिक वाचू शकता](https://etherscan.io/verifyContract).

## कायदेशीर ERC-20 टोकन्सशी तुलना {#compare-legit-erc20}

आपण या टोकनची तुलना कायदेशीर ERC-20 टोकन्सशी करणार आहोत. जर तुम्हाला कायदेशीर ERC-20 टोकन्स सामान्यतः कसे लिहिले जातात याची माहिती नसेल, तर [हे ट्युटोरिअल पहा](/developers/tutorials/erc20-annotated-code/).

### विशेषाधिकार प्राप्त पत्त्यांसाठी स्थिरांक (Constants) {#constants-for-privileged-addresses}

कॉन्ट्रॅक्ट्सना कधीकधी विशेषाधिकार प्राप्त पत्त्यांची आवश्यकता असते. दीर्घकालीन वापरासाठी डिझाइन केलेले कॉन्ट्रॅक्ट्स काही विशेषाधिकार प्राप्त पत्त्यांना ते पत्ते बदलण्याची परवानगी देतात, उदाहरणार्थ नवीन मल्टीसिग कॉन्ट्रॅक्टचा वापर सक्षम करण्यासाठी. हे करण्याचे अनेक मार्ग आहेत.

[`HOP` टोकन कॉन्ट्रॅक्ट](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable) पॅटर्न वापरते. विशेषाधिकार प्राप्त पत्ता स्टोरेजमध्ये, `_owner` नावाच्या फील्डमध्ये ठेवला जातो (तिसरी फाईल पहा, `Ownable.sol`).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

[`ARB` टोकन कॉन्ट्रॅक्टमध्ये](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) थेट विशेषाधिकार प्राप्त पत्ता नसतो. तथापि, त्याला त्याची आवश्यकता नाही. ते [पत्ता `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code) वरील [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) च्या मागे असते. त्या कॉन्ट्रॅक्टमध्ये एक विशेषाधिकार प्राप्त पत्ता आहे (चौथी फाईल पहा, `ERC1967Upgrade.sol`) जो अपग्रेडसाठी वापरला जाऊ शकतो.

```solidity
    /**
     * @dev EIP1967 ॲडमिन स्लॉटमध्ये नवीन पत्ता संचयित करते.
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: new admin is the zero address");
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

[हा कॉन्ट्रॅक्ट मालक](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) असा कॉन्ट्रॅक्ट नाही जो वेगवेगळ्या वेळी वेगवेगळ्या खात्यांद्वारे नियंत्रित केला जाऊ शकतो, तर ते एक [बाह्य मालकीचे खाते (externally owned account)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) आहे. याचा अर्थ असा की ते बहुधा एखाद्या व्यक्तीद्वारे अल्पकालीन वापरासाठी डिझाइन केलेले आहे, मौल्यवान राहणाऱ्या ERC-20 ला नियंत्रित करण्यासाठी दीर्घकालीन उपाय म्हणून नाही.

आणि खरोखरच, जर आपण Etherscan मध्ये पाहिले तर आपल्याला दिसेल की स्कॅमरने हे कॉन्ट्रॅक्ट 19 मे 2023 रोजी फक्त 12 तासांसाठी ([पहिला व्यवहार](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) ते [शेवटचा व्यवहार](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)) वापरले.

### बनावट `_transfer` फंक्शन {#the-fake-transfer-function}

[अंतर्गत `_transfer` फंक्शन](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer) वापरून प्रत्यक्ष हस्तांतरण होणे हे मानक (standard) आहे.

`wARB` मध्ये हे फंक्शन जवळजवळ कायदेशीर दिसते:

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

संशयास्पद भाग असा आहे:

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

जर कॉन्ट्रॅक्ट मालक टोकन्स पाठवतो, तर `Transfer` घटना ते `deployer` कडून आल्याचे का दाखवते?

तथापि, एक अधिक महत्त्वाचा मुद्दा आहे. हे `_transfer` फंक्शन कोण कॉल करते? ते बाहेरून कॉल केले जाऊ शकत नाही, ते `internal` म्हणून चिन्हांकित केले आहे. आणि आपल्याकडे असलेल्या कोडमध्ये `_transfer` ला कोणतेही कॉल्स समाविष्ट नाहीत. स्पष्टपणे, ते येथे एक फसवणूक (decoy) म्हणून आहे.

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

जेव्हा आपण टोकन्स हस्तांतरित करण्यासाठी कॉल केलेल्या फंक्शन्सकडे पाहतो, `transfer` आणि `transferFrom`, तेव्हा आपल्याला दिसते की ते पूर्णपणे वेगळ्या फंक्शनला कॉल करतात, `_f_`.

### खरे `_f_` फंक्शन {#the-real-f-function}

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

या फंक्शनमध्ये दोन संभाव्य धोक्याचे इशारे (red flags) आहेत.

- [फंक्शन मॉडिफायर](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_` चा वापर. तथापि, जेव्हा आपण सोर्स कोडमध्ये पाहतो तेव्हा आपल्याला दिसते की `_mod_` प्रत्यक्षात निरुपद्रवी आहे.

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- आपण `_transfer` मध्ये पाहिलेली तीच समस्या, जी म्हणजे जेव्हा `contract_owner` टोकन्स पाठवतो तेव्हा ते `deployer` कडून आल्यासारखे दिसतात.

### बनावट घटना फंक्शन `dropNewTokens` {#the-fake-events-function-dropnewtokens}

आता आपण अशा गोष्टीकडे येतो जी प्रत्यक्ष स्कॅमसारखी दिसते. मी वाचनीयतेसाठी फंक्शन थोडे संपादित केले आहे, परंतु ते कार्यात्मकदृष्ट्या समतुल्य आहे.

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

या फंक्शनमध्ये `auth()` मॉडिफायर आहे, ज्याचा अर्थ असा की ते फक्त कॉन्ट्रॅक्ट मालकाद्वारे कॉल केले जाऊ शकते.

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

हे निर्बंध अगदी योग्य आहेत, कारण यादृच्छिक (random) खात्यांनी टोकन्स वितरित करावेत असे आपल्याला वाटणार नाही. तथापि, उर्वरित फंक्शन संशयास्पद आहे.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

पूल खात्यातून प्राप्तकर्त्यांच्या अ‍ॅरेमध्ये (array) रकमेचा अ‍ॅरे हस्तांतरित करण्याचे फंक्शन अगदी योग्य वाटते. अशी अनेक वापर प्रकरणे आहेत ज्यामध्ये तुम्हाला एकाच स्रोतावरून अनेक गंतव्यस्थानांवर टोकन्स वितरित करायचे असतील, जसे की पेरोल, एअरड्रॉप्स इ. एकाधिक व्यवहार जारी करण्याऐवजी किंवा एकाच व्यवहाराचा भाग म्हणून वेगळ्या कॉन्ट्रॅक्टमधून ERC-20 ला अनेक वेळा कॉल करण्याऐवजी एकाच व्यवहारामध्ये हे करणे (गॅसच्या बाबतीत) स्वस्त आहे.

तथापि, `dropNewTokens` तसे करत नाही. ते [`Transfer` घटना](https://eips.ethereum.org/EIPS/eip-20#transfer-1) उत्सर्जित करते, परंतु प्रत्यक्षात कोणतेही टोकन्स हस्तांतरित करत नाही. खरोखर न झालेल्या हस्तांतरणाबद्दल सांगून साखळीबाह्य (offchain) अ‍ॅप्लिकेशन्सना गोंधळात टाकण्याचे कोणतेही कायदेशीर कारण नाही.

### जाळणारे (burning) `Approve` फंक्शन {#the-burning-approve-function}

ERC-20 कॉन्ट्रॅक्ट्समध्ये मंजुरीसाठी [एक `approve` फंक्शन](/developers/tutorials/erc20-annotated-code/#approve) असणे अपेक्षित आहे, आणि खरोखरच आपल्या स्कॅम टोकनमध्ये असे फंक्शन आहे, आणि ते योग्य देखील आहे. तथापि, Solidity हे C मधून आलेले असल्यामुळे ते केस सेन्सिटिव्ह (case significant) आहे. "Approve" आणि "approve" या वेगवेगळ्या स्ट्रिंग्स आहेत.

तसेच, कार्यक्षमता `approve` शी संबंधित नाही.

```solidity
    function Approve(
        address[] memory holders)
```

हे फंक्शन टोकन धारकांच्या पत्त्यांच्या अ‍ॅरेसह कॉल केले जाते.

```solidity
    public approver() {
```

`approver()` मॉडिफायर हे सुनिश्चित करते की फक्त `contract_owner` ला हे फंक्शन कॉल करण्याची परवानगी आहे (खाली पहा).

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

प्रत्येक धारकाच्या पत्त्यासाठी फंक्शन धारकाची संपूर्ण शिल्लक `0x00...01` पत्त्यावर हलवते, प्रभावीपणे ते जाळते (मानकातील वास्तविक `burn` एकूण पुरवठा देखील बदलते आणि टोकन्स `0x00...00` वर हस्तांतरित करते). याचा अर्थ असा की `contract_owner` कोणत्याही वापरकर्त्याची मालमत्ता काढून टाकू शकतो. गव्हर्नन्स टोकनमध्ये तुम्हाला हवे असलेले हे वैशिष्ट्य वाटत नाही.

### कोड गुणवत्तेच्या समस्या {#code-quality-issues}

या कोड गुणवत्तेच्या समस्या हा कोड स्कॅम असल्याचे _सिद्ध_ करत नाहीत, परंतु ते संशयास्पद वाटतात. आर्बिट्रम् सारख्या संघटित कंपन्या सहसा इतका वाईट कोड रिलीज करत नाहीत.

#### `mount` फंक्शन {#the-mount-function}

जरी ते [मानकामध्ये](https://eips.ethereum.org/EIPS/eip-20) निर्दिष्ट केलेले नसले तरी, सामान्यतः नवीन टोकन्स तयार करणाऱ्या फंक्शनला [`mint`](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) म्हटले जाते.

जर आपण `wARB` कन्स्ट्रक्टरमध्ये पाहिले, तर आपल्याला दिसेल की काही कारणास्तव टाइम मिंट फंक्शनचे नाव बदलून `mount` केले गेले आहे, आणि कार्यक्षमतेसाठी संपूर्ण रकमेसाठी एकदा कॉल करण्याऐवजी, प्रारंभिक पुरवठ्याच्या पाचव्या भागासह पाच वेळा कॉल केले जाते.

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
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
```

`require` कडे पाहता, आपल्याला दिसते की फक्त कॉन्ट्रॅक्ट मालकाला मिंट करण्याची परवानगी आहे. ते कायदेशीर आहे. परंतु त्रुटी संदेश (error message) _फक्त मालकाला मिंट करण्याची परवानगी आहे_ किंवा तसे काहीतरी असावे. त्याऐवजी, तो अप्रासंगिक _ERC20: शून्य पत्त्यावर मिंट करा_ असा आहे. शून्य पत्त्यावर मिंटिंगसाठी योग्य चाचणी `require(account != address(0), "<error message>")` आहे, जी तपासण्याची तसदी कॉन्ट्रॅक्ट कधीच घेत नाही.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

मिंटिंगशी थेट संबंधित आणखी दोन संशयास्पद तथ्ये आहेत:

- एक `account` पॅरामीटर आहे, जे बहुधा मिंट केलेली रक्कम प्राप्त करणारे खाते असावे. परंतु जी शिल्लक वाढते ती प्रत्यक्षात `contract_owner` ची असते.

- वाढलेली शिल्लक `contract_owner` ची असली तरी, उत्सर्जित झालेली घटना `account` कडे हस्तांतरण दर्शवते.

### `auth` आणि `approver` दोन्ही का? काहीही न करणारे `mod` का? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

या कॉन्ट्रॅक्टमध्ये तीन मॉडिफायर्स आहेत: `_mod_`, `auth`, आणि `approver`.

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` तीन पॅरामीटर्स घेते आणि त्यांचे काहीही करत नाही. ते का असावे?

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

`auth` आणि `approver` अधिक अर्थपूर्ण आहेत, कारण ते तपासतात की कॉन्ट्रॅक्ट `contract_owner` द्वारे कॉल केले गेले होते. मिंटिंगसारख्या काही विशेषाधिकार प्राप्त क्रिया त्या खात्यापुरत्या मर्यादित असाव्यात अशी आपली अपेक्षा असते. तथापि, _अगदी एकच गोष्ट_ करणाऱ्या दोन स्वतंत्र फंक्शन्स असण्यात काय अर्थ आहे?

## आपण स्वयंचलितपणे काय शोधू शकतो? {#what-can-we-detect-automatically}

Etherscan कडे पाहून आपण पाहू शकतो की `wARB` हे एक स्कॅम टोकन आहे. तथापि, तो एक केंद्रीकृत उपाय आहे. सिद्धांतानुसार, Etherscan ला नष्ट किंवा हॅक केले जाऊ शकते. एखादे टोकन कायदेशीर आहे की नाही हे स्वतंत्रपणे शोधून काढता येणे अधिक चांगले आहे.

ERC-20 टोकन संशयास्पद आहे (एकतर स्कॅम किंवा खूप वाईटरित्या लिहिलेले) हे ओळखण्यासाठी आपण काही युक्त्या वापरू शकतो, ते उत्सर्जित करत असलेल्या घटनांकडे पाहून.

## संशयास्पद `Approval` घटना {#suspicious-approval-events}

[`Approval` घटना](https://eips.ethereum.org/EIPS/eip-20#approval) केवळ थेट विनंतीसह घडल्या पाहिजेत ([`Transfer` घटनांच्या](https://eips.ethereum.org/EIPS/eip-20#transfer-1) विरूद्ध ज्या मंजुरीचा परिणाम म्हणून घडू शकतात). या समस्येच्या तपशीलवार स्पष्टीकरणासाठी आणि विनंत्या कॉन्ट्रॅक्टद्वारे मध्यस्थी करण्याऐवजी थेट का असाव्यात यासाठी [Solidity दस्तऐवज पहा](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin).

याचा अर्थ असा की `Approval` घटना ज्या [बाह्य मालकीच्या खात्यातून](/developers/docs/accounts/#types-of-account) खर्च करण्यास मंजुरी देतात त्या अशा व्यवहारांमधून आल्या पाहिजेत ज्यांचा उगम त्या खात्यात होतो आणि ज्यांचे गंतव्यस्थान ERC-20 कॉन्ट्रॅक्ट आहे. बाह्य मालकीच्या खात्याकडून इतर कोणत्याही प्रकारची मंजुरी संशयास्पद आहे.

येथे [असा प्रोग्राम आहे जो या प्रकारची घटना ओळखतो](https://github.com/qbzzt/20230915-scam-token-detection), [Viem](https://viem.sh/) आणि [TypeScript](https://www.typescriptlang.org/docs/) वापरून, जे टाइप सेफ्टीसह JavaScript चे एक प्रकार आहे. ते चालवण्यासाठी:

1. `.env.example` ला `.env` मध्ये कॉपी करा.
2. इथरियम मेननेट नोडची URL प्रदान करण्यासाठी `.env` संपादित करा.
3. आवश्यक पॅकेजेस स्थापित करण्यासाठी `pnpm install` चालवा.
4. संशयास्पद मंजुरी शोधण्यासाठी `pnpm susApproval` चालवा.

येथे ओळीनुसार स्पष्टीकरण दिले आहे:

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

`viem` मधून प्रकार व्याख्या (type definitions), फंक्शन्स आणि चेन व्याख्या आयात करा.

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

Viem क्लायंट तयार करा. आपल्याला फक्त ब्लॉकचेनवरून वाचण्याची आवश्यकता आहे, त्यामुळे या क्लायंटला खाजगी की ची आवश्यकता नाही.

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

संशयास्पद ERC-20 कॉन्ट्रॅक्टचा पत्ता, आणि ज्या ब्लॉक्समध्ये आपण घटना शोधू. नोड प्रदाते सामान्यतः घटना वाचण्याची आपली क्षमता मर्यादित करतात कारण बँडविड्थ महाग होऊ शकते. सुदैवाने `wARB` अठरा तासांच्या कालावधीसाठी वापरात नव्हते, त्यामुळे आपण सर्व घटना शोधू शकतो (एकूण फक्त 13 होत्या).

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

Viem ला घटनेच्या माहितीसाठी विचारण्याचा हा मार्ग आहे. जेव्हा आपण त्याला फील्डच्या नावांसह अचूक घटना स्वाक्षरी प्रदान करतो, तेव्हा ते आपल्यासाठी घटनेचे विश्लेषण (parse) करते.

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

आपला अल्गोरिदम फक्त बाह्य मालकीच्या खात्यांना लागू होतो. जर `client.getBytecode` द्वारे कोणताही बाइटकोड परत केला गेला असेल तर याचा अर्थ असा की हे एक कॉन्ट्रॅक्ट आहे आणि आपण ते वगळले पाहिजे.

जर तुम्ही यापूर्वी TypeScript वापरले नसेल, तर फंक्शनची व्याख्या थोडी विचित्र वाटू शकते. आपण त्याला फक्त असे सांगत नाही की पहिल्या (आणि एकमेव) पॅरामीटरला `addr` म्हटले जाते, तर ते `Address` प्रकाराचे आहे हे देखील सांगतो. त्याचप्रमाणे, `: boolean` भाग TypeScript ला सांगतो की फंक्शनचे रिटर्न व्हॅल्यू बुलियन (boolean) आहे.

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

हे फंक्शन घटनेवरून व्यवहाराची पावती मिळवते. व्यवहाराचे गंतव्यस्थान काय होते हे आपल्याला माहीत आहे याची खात्री करण्यासाठी आपल्याला पावतीची आवश्यकता आहे.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

हे सर्वात महत्त्वाचे फंक्शन आहे, जे प्रत्यक्षात एखादी घटना संशयास्पद आहे की नाही हे ठरवते. रिटर्न प्रकार, `(Event | null)`, TypeScript ला सांगतो की हे फंक्शन एकतर `Event` किंवा `null` परत करू शकते. जर घटना संशयास्पद नसेल तर आपण `null` परत करतो.

```typescript
const owner = ev.args._owner
```

Viem कडे फील्डची नावे आहेत, त्यामुळे त्याने आपल्यासाठी घटनेचे विश्लेषण केले. `_owner` हा खर्च करावयाच्या टोकन्सचा मालक आहे.

```typescript
// कॉन्ट्रॅक्ट्सद्वारे दिलेल्या मंजुरी संशयास्पद नसतात
if (await isContract(owner)) return null
```

जर मालक कॉन्ट्रॅक्ट असेल, तर ही मंजुरी संशयास्पद नाही असे समजा. कॉन्ट्रॅक्टची मंजुरी संशयास्पद आहे की नाही हे तपासण्यासाठी आपल्याला व्यवहाराच्या संपूर्ण अंमलबजावणीचा मागोवा घ्यावा लागेल हे पाहण्यासाठी की तो कधी मालक कॉन्ट्रॅक्टपर्यंत पोहोचला का, आणि त्या कॉन्ट्रॅक्टने ERC-20 कॉन्ट्रॅक्टला थेट कॉल केला का. आपण करू इच्छितो त्यापेक्षा हे खूप जास्त संसाधन खर्चिक (resource expensive) आहे.

```typescript
const txn = await getEventTxn(ev)
```

जर मंजुरी बाह्य मालकीच्या खात्यातून आली असेल, तर तो व्यवहार मिळवा ज्यामुळे ती झाली.

```typescript
// जर मंजुरी अशा EOA मालकाकडून आली असेल जो व्यवहाराचा `from` नाही, तर ती संशयास्पद असते
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

आपण फक्त स्ट्रिंग समानतेसाठी तपासू शकत नाही कारण पत्ते हेक्साडेसिमल असतात, त्यामुळे त्यात अक्षरे असतात. कधीकधी, उदाहरणार्थ `txn.from` मध्ये, ती अक्षरे सर्व लोअरकेस असतात. इतर प्रकरणांमध्ये, जसे की `ev.args._owner`, पत्ता [त्रुटी ओळखण्यासाठी मिश्र-केस (mixed-case) मध्ये](https://eips.ethereum.org/EIPS/eip-55) असतो.

परंतु जर व्यवहार मालकाकडून नसेल, आणि तो मालक बाह्य मालकीचा असेल, तर आपल्याकडे एक संशयास्पद व्यवहार आहे.

```typescript
// जर व्यवहाराचे गंतव्यस्थान ते ERC-20 कॉन्ट्रॅक्ट नसेल ज्याची आपण
// चौकशी करत आहोत
if (txn.to.toLowerCase() != testedAddress) return ev
```

त्याचप्रमाणे, जर व्यवहाराचा `to` पत्ता, कॉल केलेले पहिले कॉन्ट्रॅक्ट, तपासणीखालील ERC-20 कॉन्ट्रॅक्ट नसेल तर ते संशयास्पद आहे.

```typescript
    // संशय घेण्याचे कोणतेही कारण नसल्यास, null परत करा.
    return null
}
```

जर दोन्हीपैकी कोणतीही अट सत्य नसेल तर `Approval` घटना संशयास्पद नाही.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[एक `async` फंक्शन](https://www.w3schools.com/js/js_async.asp) `Promise` ऑब्जेक्ट परत करते. सामान्य सिंटॅक्स, `await x()` सह, आपण प्रक्रिया सुरू ठेवण्यापूर्वी त्या `Promise` ची पूर्तता होण्याची वाट पाहतो. हे प्रोग्राम करण्यासाठी आणि अनुसरण करण्यासाठी सोपे आहे, परंतु ते अकार्यक्षम देखील आहे. विशिष्ट घटनेसाठी `Promise` ची पूर्तता होण्याची आपण वाट पाहत असताना आपण आधीच पुढील घटनेवर काम सुरू करू शकतो.

येथे आपण `Promise` ऑब्जेक्ट्सचा अ‍ॅरे तयार करण्यासाठी [`map`](https://www.w3schools.com/jsref/jsref_map.asp) वापरतो. त्यानंतर आपण त्या सर्व प्रॉमिसचे (promises) निराकरण होण्याची वाट पाहण्यासाठी [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) वापरतो. त्यानंतर आपण संशयास्पद नसलेल्या घटना काढून टाकण्यासाठी त्या परिणामांना [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp) करतो.

### संशयास्पद `Transfer` घटना {#suspicious-transfer-events}

स्कॅम टोकन्स ओळखण्याचा आणखी एक संभाव्य मार्ग म्हणजे त्यांच्याकडे कोणतेही संशयास्पद हस्तांतरण आहे का ते पाहणे. उदाहरणार्थ, ज्या खात्यांमध्ये तितके टोकन्स नाहीत अशा खात्यांमधून हस्तांतरण. [ही चाचणी कशी लागू करायची](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts) हे तुम्ही पाहू शकता, परंतु `wARB` मध्ये ही समस्या नाही.

## निष्कर्ष {#conclusion}

ERC-20 स्कॅम्सच्या स्वयंचलित शोधाला [फॉल्स निगेटिव्ह्ज (false negatives)](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error) चा त्रास होतो, कारण स्कॅम एक पूर्णपणे सामान्य ERC-20 टोकन कॉन्ट्रॅक्ट वापरू शकतो जे फक्त कोणत्याही वास्तविक गोष्टीचे प्रतिनिधित्व करत नाही. त्यामुळे तुम्ही नेहमी _विश्वसनीय स्रोताकडून टोकनचा पत्ता मिळवण्याचा_ प्रयत्न केला पाहिजे.

स्वयंचलित शोध काही प्रकरणांमध्ये मदत करू शकतो, जसे की DeFi भाग, जिथे अनेक टोकन्स असतात आणि ते स्वयंचलितपणे हाताळले जाणे आवश्यक असते. परंतु नेहमीप्रमाणे [कॅव्हेट एम्प्टर (caveat emptor - खरेदीदाराने सावध राहावे)](https://www.investopedia.com/terms/c/caveatemptor.asp), तुमचे स्वतःचे संशोधन करा आणि तुमच्या वापरकर्त्यांनाही तसे करण्यास प्रोत्साहित करा.

[माझ्या अधिक कामासाठी येथे पहा](https://cryptodocguy.pro/).