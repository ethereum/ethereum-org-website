---
title: "स्कैम टोकन द्वारा उपयोग की जाने वाली कुछ तरकीबें और उन्हें कैसे पहचानें"
description: इस ट्यूटोरियल में हम एक स्कैम टोकन का विश्लेषण करते हैं ताकि यह देख सकें कि घोटालेबाज कौन सी चालें खेलते हैं, वे उन्हें कैसे लागू करते हैं, और हम उन्हें कैसे पहचान सकते हैं।
author: ओरी पोमेरेन्ट्ज़
tags:
  [
    "स्कैम",
    "सोलिडीटी",
    "erc-20",
    "javascript",
    "typescript"
  ]
skill: intermediate
published: 2023-09-15
lang: hi
---

इस ट्यूटोरियल में हम [एक स्कैम टोकन](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) का विश्लेषण करते हैं ताकि यह देख सकें कि घोटालेबाज कौन सी चालें खेलते हैं और वे उन्हें कैसे लागू करते हैं। ट्यूटोरियल के अंत तक आपको ERC-20 टोकन अनुबंधों, उनकी क्षमताओं और संदेह क्यों आवश्यक है, के बारे में अधिक व्यापक दृष्टिकोण प्राप्त होगा। फिर हम उस स्कैम टोकन द्वारा उत्सर्जित इवेंट्स को देखते हैं और देखते हैं कि हम स्वचालित रूप से यह कैसे पहचान सकते हैं कि यह वैध नहीं है।

## स्कैम टोकन - वे क्या हैं, लोग उन्हें क्यों बनाते हैं, और उनसे कैसे बचें {#scam-tokens}

एथेरियम के लिए सबसे आम उपयोगों में से एक समूह के लिए एक व्यापार योग्य टोकन बनाना है, एक अर्थ में उनकी अपनी मुद्रा। हालांकि, जहां कही पर भी ऐसे इस्तेमाल के मामले होते है जो मूल्य रखते है, वहा पर अपराधी भी होते है जो अपने लिए उस मूल्य को चुराने की कोशिश करते है।

आप उपयोगकर्ता के दृष्टिकोण से इस विषय के बारे में [ethereum.org पर कहीं और](/guides/how-to-id-scam-tokens/) अधिक पढ़ सकते हैं। यह ट्यूटोरियल एक स्कैम टोकन का विश्लेषण करने पर केंद्रित है ताकि यह देखा जा सके कि यह कैसे किया जाता है और इसका पता कैसे लगाया जा सकता है।

### मुझे कैसे पता चलेगा कि wARB एक स्कैम है? {#warb-scam}

जिस टोकन का हम विश्लेषण कर रहे हैं वह [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) है, जो वैध [ARB टोकन](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) के बराबर होने का दिखावा करता है।

यह जानने का सबसे आसान तरीका है कि कौन सा टोकन वैध है, मूल संगठन [Arbitrum](https://arbitrum.foundation/) को देखना। वैध पते [उनके प्रलेखन](https://docs.arbitrum.foundation/deployment-addresses#token) में निर्दिष्ट हैं।

### सोर्स कोड क्यों उपलब्ध है? {#why-source}

आम तौर पर हम उम्मीद करेंगे कि दूसरों को स्कैम करने की कोशिश करने वाले लोग गुप्त रहें, और वास्तव में कई स्कैम टोकन का कोड उपलब्ध नहीं होता है (उदाहरण के लिए, [यह](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) और [यह](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code))।

हालांकि, वैध टोकन आमतौर पर अपना सोर्स कोड प्रकाशित करते हैं, इसलिए वैध दिखने के लिए स्कैम टोकन के लेखक भी कभी-कभी ऐसा ही करते हैं। [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) उन टोकनों में से एक है जिनका सोर्स कोड उपलब्ध है, जिससे इसे समझना आसान हो जाता है।

जबकि अनुबंध डिप्लॉयर्स यह चुन सकते हैं कि सोर्स कोड प्रकाशित करना है या नहीं, वे _गलत_ सोर्स कोड प्रकाशित नहीं कर सकते। ब्लॉक एक्सप्लोरर प्रदान किए गए सोर्स कोड को स्वतंत्र रूप से संकलित करता है, और यदि उसे बिल्कुल वही बाइटकोड नहीं मिलता है, तो वह उस सोर्स कोड को अस्वीकार कर देता है। [आप इस बारे में Etherscan साइट पर और अधिक पढ़ सकते हैं](https://etherscan.io/verifyContract)।

## वैध ERC-20 टोकन के साथ तुलना {#compare-legit-erc20}

हम इस टोकन की तुलना वैध ERC-20 टोकन से करने जा रहे हैं। यदि आप इस बात से परिचित नहीं हैं कि वैध ERC-20 टोकन आमतौर पर कैसे लिखे जाते हैं, तो [यह ट्यूटोरियल देखें](/developers/tutorials/erc20-annotated-code/)।

### विशेषाधिकार प्राप्त पतों के लिए स्थिरांक {#constants-for-privileged-addresses}

अनुबंधों को कभी-कभी विशेषाधिकार प्राप्त पतों की आवश्यकता होती है। दीर्घकालिक उपयोग के लिए डिज़ाइन किए गए अनुबंध कुछ विशेषाधिकार प्राप्त पतों को उन पतों को बदलने की अनुमति देते हैं, उदाहरण के लिए एक नए मल्टीसिग अनुबंध के उपयोग को सक्षम करने के लिए। ऐसा करने के कई तरीके हैं।

[`HOP` टोकन अनुबंध](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable) पैटर्न का उपयोग करता है। विशेषाधिकार प्राप्त पता स्टोरेज में `_owner` नामक फ़ील्ड में रखा जाता है (तीसरी फ़ाइल, `Ownable.sol` देखें)।

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

[`ARB` टोकन अनुबंध](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) में सीधे तौर पर कोई विशेषाधिकार प्राप्त पता नहीं है। हालाँकि, इसे एक की आवश्यकता नहीं है। यह [पते `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code) पर एक [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) के पीछे बैठता है। उस अनुबंध में एक विशेषाधिकार प्राप्त पता है (चौथी फ़ाइल, `ERC1967Upgrade.sol` देखें) जिसका उपयोग अपग्रेड के लिए किया जा सकता है।

```solidity
    /**
     * @dev EIP1967 एडमिन स्लॉट में एक नया पता संग्रहीत करता है।
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: new admin is the zero address");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

इसके विपरीत, `wARB` अनुबंध में एक हार्ड कोडेड `contract_owner` है।

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

[यह अनुबंध स्वामी](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) एक अनुबंध नहीं है जिसे अलग-अलग समय पर अलग-अलग खातों द्वारा नियंत्रित किया जा सकता है, बल्कि एक [बाह्य रूप से स्वामित्व वाला खाता](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) है। इसका मतलब है कि यह शायद किसी व्यक्ति द्वारा अल्पकालिक उपयोग के लिए डिज़ाइन किया गया है, न कि एक ERC-20 को नियंत्रित करने के लिए एक दीर्घकालिक समाधान के रूप में जो मूल्यवान बना रहेगा।

और वास्तव में, अगर हम Etherscan में देखें तो हम देखते हैं कि घोटालेबाज ने 19 मई, 2023 के दौरान इस अनुबंध का केवल 12 घंटे के लिए उपयोग किया ([पहला लेनदेन](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) से [अंतिम लेनदेन](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b))।

### नकली `_transfer` फ़ंक्शन {#the-fake-transfer-function}

[एक आंतरिक `_transfer` फ़ंक्शन](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer) का उपयोग करके वास्तविक हस्तांतरण होना मानक है।

`wARB` में यह फ़ंक्शन लगभग वैध लगता है:

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

संदिग्ध हिस्सा है:

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

यदि अनुबंध का स्वामी टोकन भेजता है, तो `Transfer` इवेंट क्यों दिखाता है कि वे `deployer` से आए हैं?

हालाँकि, एक और महत्वपूर्ण मुद्दा है। इस `_transfer` फ़ंक्शन को कौन कॉल करता है? इसे बाहर से कॉल नहीं किया जा सकता, इसे `internal` के रूप में चिह्नित किया गया है। और हमारे पास जो कोड है, उसमें `_transfer` के लिए कोई कॉल शामिल नहीं है। स्पष्ट रूप से, यह यहां एक छलावे के रूप में है।

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

जब हम टोकन स्थानांतरित करने के लिए कॉल किए गए फ़ंक्शन, `transfer` और `transferFrom` को देखते हैं, तो हम देखते हैं कि वे पूरी तरह से एक अलग फ़ंक्शन, `_f_` को कॉल करते हैं।

### असली `_f_` फ़ंक्शन {#the-real-f-function}

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

इस फ़ंक्शन में दो संभावित खतरे के संकेत हैं।

- [फ़ंक्शन मॉडिफ़ायर](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_` का उपयोग। हालांकि, जब हम सोर्स कोड में देखते हैं तो हम पाते हैं कि `_mod_` वास्तव में हानिरहित है।

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- वही समस्या जो हमने `_transfer` में देखी थी, जो यह है कि जब `contract_owner` टोकन भेजता है तो वे `deployer` से आते हुए दिखाई देते हैं।

### नकली इवेंट्स फ़ंक्शन `dropNewTokens` {#the-fake-events-function-dropNewTokens}

अब हम कुछ ऐसा देखते हैं जो एक वास्तविक स्कैम जैसा लगता है। मैंने पठनीयता के लिए फ़ंक्शन को थोड़ा संपादित किया है, लेकिन यह कार्यात्मक रूप से समकक्ष है।

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

इस फ़ंक्शन में `auth()` मॉडिफ़ायर है, जिसका अर्थ है कि इसे केवल अनुबंध स्वामी द्वारा ही कॉल किया जा सकता है।

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

यह प्रतिबंध पूरी तरह से समझ में आता है, क्योंकि हम नहीं चाहेंगे कि यादृच्छिक खाते टोकन वितरित करें। हालांकि, फ़ंक्शन का शेष भाग संदिग्ध है।

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

एक पूल खाते से रिसीवरों की एक सरणी को राशियों की एक सरणी में स्थानांतरित करने का एक फ़ंक्शन पूरी तरह से समझ में आता है। ऐसे कई उपयोग के मामले हैं जिनमें आप टोकन को एक ही स्रोत से कई गंतव्यों में वितरित करना चाहेंगे, जैसे कि पेरोल, एयरड्रॉप, आदि। कई लेनदेन जारी करने के बजाय, या एक ही लेनदेन के हिस्से के रूप में एक अलग अनुबंध से ERC-20 को कई बार कॉल करने के बजाय, इसे एक ही लेनदेन में करना (गैस में) सस्ता है।

हालांकि, `dropNewTokens` ऐसा नहीं करता है। यह [`Transfer` इवेंट](https://eips.ethereum.org/EIPS/eip-20#transfer-1) उत्सर्जित करता है, लेकिन वास्तव में किसी भी टोकन को स्थानांतरित नहीं करता है। ऑफ़-चेन एप्लिकेशन को एक ऐसे हस्तांतरण के बारे में बताकर भ्रमित करने का कोई वैध कारण नहीं है जो वास्तव में हुआ ही नहीं।

### जलाने वाला `Approve` फ़ंक्शन {#the-burning-approve-function}

ERC-20 अनुबंधों में भत्तों के लिए [एक `approve` फ़ंक्शन](/developers/tutorials/erc20-annotated-code/#approve) होना चाहिए, और वास्तव में हमारे स्कैम टोकन में ऐसा फ़ंक्शन है, और यह सही भी है। हालांकि, क्योंकि Solidity C से उतरा है, यह केस महत्वपूर्ण है। "Approve" और "approve" अलग-अलग स्ट्रिंग्स हैं।

इसके अलावा, कार्यक्षमता `approve` से संबंधित नहीं है।

```solidity
    function Approve(
        address[] memory holders)
```

इस फ़ंक्शन को टोकन के धारकों के लिए पतों की एक सरणी के साथ कॉल किया जाता है।

```solidity
    public approver() {
```

`approver()` मॉडिफ़ायर यह सुनिश्चित करता है कि केवल `contract_owner` को ही इस फ़ंक्शन को कॉल करने की अनुमति है (नीचे देखें)।

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

प्रत्येक धारक पते के लिए फ़ंक्शन धारक की पूरी शेष राशि को पते `0x00...01` पर ले जाता है, प्रभावी रूप से इसे जला देता है (मानक में वास्तविक `burn` कुल आपूर्ति को भी बदलता है, और टोकन को `0x00...00` पर स्थानांतरित करता है)। इसका मतलब है कि `contract_owner` किसी भी उपयोगकर्ता की संपत्ति को हटा सकता है। यह एक ऐसी विशेषता नहीं लगती है जो आप एक शासन टोकन में चाहेंगे।

### कोड गुणवत्ता के मुद्दे {#code-quality-issues}

ये कोड गुणवत्ता के मुद्दे यह _साबित_ नहीं करते हैं कि यह कोड एक स्कैम है, लेकिन वे इसे संदिग्ध बनाते हैं। Arbitrum जैसी संगठित कंपनियाँ आमतौर पर इतना खराब कोड जारी नहीं करती हैं।

#### `mount` फ़ंक्शन {#the-mount-function}

हालांकि यह [मानक](https://eips.ethereum.org/EIPS/eip-20) में निर्दिष्ट नहीं है, आम तौर पर नए टोकन बनाने वाले फ़ंक्शन को [`mint`](https://ethereum.org/el/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) कहा जाता है।

यदि हम `wARB` कंस्ट्रक्टर में देखें, तो हम देखते हैं कि मिंट फ़ंक्शन का नाम बदलकर किसी कारण से `mount` कर दिया गया है, और दक्षता के लिए पूरी राशि के बजाय प्रारंभिक आपूर्ति के पांचवें हिस्से के साथ पांच बार कॉल किया जाता है।

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

`mount` फ़ंक्शन भी संदिग्ध है।

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
```

`require` को देखते हुए, हम देखते हैं कि केवल अनुबंध स्वामी को मिंट करने की अनुमति है। यह वैध है। लेकिन त्रुटि संदेश _केवल स्वामी को मिंट करने की अनुमति है_ या ऐसा ही कुछ होना चाहिए। इसके बजाय, यह अप्रासंगिक _ERC20: मिंट टू द ज़ीरो एड्रेस_ है। ज़ीरो एड्रेस पर मिंट करने के लिए सही परीक्षण `require(account != address(0), "<error message>")` है, जिसे अनुबंध कभी जांचने की जहमत नहीं उठाता।

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

मिंटिंग से सीधे संबंधित दो और संदिग्ध तथ्य हैं:

- एक `account` पैरामीटर है, जो संभवतः वह खाता है जिसे मिंट की गई राशि प्राप्त होनी चाहिए। लेकिन जो शेष राशि बढ़ती है वह वास्तव में `contract_owner` की है।

- जबकि बढ़ी हुई शेष राशि `contract_owner` की है, उत्सर्जित इवेंट `account` को हस्तांतरण दिखाता है।

### `auth` और `approver` दोनों क्यों? `mod` क्यों है जो कुछ नहीं करता है? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

इस अनुबंध में तीन मॉडिफ़ायर हैं: `_mod_`, `auth`, और `approver`।

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` तीन पैरामीटर लेता है और उनके साथ कुछ नहीं करता है। इसे क्यों रखें?

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

`auth` और `approver` अधिक समझ में आते हैं, क्योंकि वे जांचते हैं कि अनुबंध को `contract_owner` द्वारा कॉल किया गया था। हम उम्मीद करेंगे कि कुछ विशेषाधिकार प्राप्त कार्य, जैसे कि मिंटिंग, उस खाते तक सीमित हों। हालांकि, दो अलग-अलग फ़ंक्शन होने का क्या मतलब है जो _ठीक वही काम_ करते हैं?

## हम स्वचालित रूप से क्या पता लगा सकते हैं? {#what-can-we-detect-automatically}

हम Etherscan को देखकर देख सकते हैं कि `wARB` एक स्कैम टोकन है। हालांकि, यह एक केंद्रीकृत समाधान है। सिद्धांत रूप में, Etherscan को विकृत या हैक किया जा सकता है। स्वतंत्र रूप से यह पता लगाना बेहतर है कि कोई टोकन वैध है या नहीं।

कुछ तरकीबें हैं जिनका उपयोग हम यह पहचानने के लिए कर सकते हैं कि एक ERC-20 टोकन संदिग्ध है (या तो एक स्कैम या बहुत खराब लिखा गया है), उनके द्वारा उत्सर्जित इवेंट्स को देखकर।

## संदिग्ध `Approval` इवेंट्स {#suspicious-approval-events}

[`Approval` इवेंट](https://eips.ethereum.org/EIPS/eip-20#approval) केवल एक सीधे अनुरोध के साथ होने चाहिए ([`Transfer` इवेंट](https://eips.ethereum.org/EIPS/eip-20#transfer-1) के विपरीत जो एक भत्ते के परिणामस्वरूप हो सकते हैं)। इस मुद्दे की विस्तृत व्याख्या के लिए [Solidity डॉक्स देखें](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin) और यह कि अनुरोधों को सीधे क्यों होना चाहिए, न कि किसी अनुबंध द्वारा मध्यस्थता के बजाय।

इसका मतलब है कि [बाह्य रूप से स्वामित्व वाले खाते](/developers/docs/accounts/#types-of-account) से खर्च को मंजूरी देने वाले `Approval` इवेंट उन लेनदेन से आने चाहिए जो उस खाते से उत्पन्न होते हैं, और जिनका गंतव्य ERC-20 अनुबंध है। बाह्य रूप से स्वामित्व वाले खाते से किसी भी अन्य प्रकार का अनुमोदन संदिग्ध है।

यहाँ [इस तरह के इवेंट की पहचान करने वाला एक प्रोग्राम](https://github.com/qbzzt/20230915-scam-token-detection) है, जो [viem](https://viem.sh/) और [TypeScript](https://www.typescriptlang.org/docs/), जो टाइप सुरक्षा वाला एक जावास्क्रिप्ट संस्करण है, का उपयोग करता है। इसे चलाने के लिए:

1. `.env.example` को `.env` में कॉपी करें।
2. एक एथेरियम मेननेट नोड के लिए URL प्रदान करने के लिए `.env` संपादित करें।
3. आवश्यक पैकेज स्थापित करने के लिए `pnpm install` चलाएँ।
4. संदिग्ध अनुमोदनों की तलाश के लिए `pnpm susApproval` चलाएँ।

यहाँ एक-एक पंक्ति की व्याख्या है:

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

`viem` से टाइप परिभाषाएँ, फ़ंक्शन और चेन परिभाषा आयात करें।

```typescript
import { config } from "dotenv"
config()
```

URL प्राप्त करने के लिए `.env` पढ़ें।

```typescript
const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.URL),
})
```

एक Viem क्लाइंट बनाएँ। हमें केवल ब्लॉकचेन से पढ़ने की आवश्यकता है, इसलिए इस क्लाइंट को निजी कुंजी की आवश्यकता नहीं है।

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

संदिग्ध ERC-20 अनुबंध का पता, और वे ब्लॉक जिनके भीतर हम इवेंट्स की तलाश करेंगे। नोड प्रदाता आमतौर पर इवेंट्स पढ़ने की हमारी क्षमता को सीमित करते हैं क्योंकि बैंडविड्थ महंगी हो सकती है। सौभाग्य से `wARB` अठारह घंटे की अवधि के लिए उपयोग में नहीं था, इसलिए हम सभी इवेंट्स को देख सकते हैं (कुल मिलाकर केवल 13 थे)।

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

यह Viem से इवेंट जानकारी मांगने का तरीका है। जब हम इसे सटीक इवेंट हस्ताक्षर प्रदान करते हैं, जिसमें फ़ील्ड नाम शामिल हैं, तो यह हमारे लिए इवेंट को पार्स करता है।

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

हमारा एल्गोरिथम केवल बाह्य रूप से स्वामित्व वाले खातों पर लागू होता है। यदि `client.getBytecode` द्वारा कोई बाइटकोड लौटाया जाता है तो इसका मतलब है कि यह एक अनुबंध है और हमें बस इसे छोड़ देना चाहिए।

यदि आपने पहले TypeScript का उपयोग नहीं किया है, तो फ़ंक्शन परिभाषा थोड़ी अजीब लग सकती है। हम इसे केवल यह नहीं बताते कि पहला (और एकमात्र) पैरामीटर `addr` कहलाता है, बल्कि यह भी कि यह `Address` प्रकार का है। इसी तरह, `: boolean` भाग TypeScript को बताता है कि फ़ंक्शन का वापसी मान एक बूलियन है।

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

यह फ़ंक्शन एक इवेंट से लेनदेन की रसीद प्राप्त करता है। हमें यह सुनिश्चित करने के लिए रसीद की आवश्यकता है कि हम जानते हैं कि लेनदेन का गंतव्य क्या था।

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

यह सबसे महत्वपूर्ण फ़ंक्शन है, जो वास्तव में यह तय करता है कि कोई इवेंट संदिग्ध है या नहीं। वापसी प्रकार, `(Event | null)`, TypeScript को बताता है कि यह फ़ंक्शन या तो एक `Event` या `null` लौटा सकता है। यदि इवेंट संदिग्ध नहीं है तो हम `null` लौटाते हैं।

```typescript
const owner = ev.args._owner
```

Viem में फ़ील्ड नाम हैं, इसलिए इसने हमारे लिए इवेंट को पार्स किया। `_owner` खर्च किए जाने वाले टोकन का स्वामी है।

```typescript
// अनुबंधों द्वारा अनुमोदन संदिग्ध नहीं हैं
if (await isContract(owner)) return null
```

यदि स्वामी एक अनुबंध है, तो मान लें कि यह अनुमोदन संदिग्ध नहीं है। यह जांचने के लिए कि किसी अनुबंध का अनुमोदन संदिग्ध है या नहीं, हमें लेनदेन के पूर्ण निष्पादन का पता लगाना होगा ताकि यह देखा जा सके कि क्या यह कभी स्वामी अनुबंध तक पहुंचा, और क्या उस अनुबंध ने सीधे ERC-20 अनुबंध को कॉल किया। यह हमारी पसंद से कहीं अधिक संसाधन महंगा है।

```typescript
const txn = await getEventTxn(ev)
```

यदि अनुमोदन बाह्य रूप से स्वामित्व वाले खाते से आता है, तो वह लेनदेन प्राप्त करें जिसके कारण यह हुआ।

```typescript
// अनुमोदन संदिग्ध है यदि यह एक EOA स्वामी से आता है जो लेनदेन का `from` नहीं है
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

हम केवल स्ट्रिंग समानता की जांच नहीं कर सकते क्योंकि पते हेक्साडेसिमल होते हैं, इसलिए उनमें अक्षर होते हैं। कभी-कभी, उदाहरण के लिए `txn.from` में, वे सभी अक्षर लोअरकेस होते हैं। अन्य मामलों में, जैसे `ev.args._owner`, पता [त्रुटि पहचान के लिए मिश्रित-केस](https://eips.ethereum.org/EIPS/eip-55) में है।

लेकिन अगर लेनदेन स्वामी से नहीं है, और वह स्वामी बाह्य रूप से स्वामित्व में है, तो हमारे पास एक संदिग्ध लेनदेन है।

```typescript
// यह भी संदिग्ध है यदि लेनदेन का गंतव्य वह ERC-20 अनुबंध नहीं है जिसकी हम
// जांच कर रहे हैं
if (txn.to.toLowerCase() != testedAddress) return ev
```

इसी तरह, यदि लेनदेन का `to` पता, पहला अनुबंध जिसे कॉल किया गया, जांच के तहत ERC-20 अनुबंध नहीं है तो यह संदिग्ध है।

```typescript
    // यदि संदिग्ध होने का कोई कारण नहीं है, तो null लौटाएं।
    return null
}
```

यदि कोई भी शर्त सही नहीं है तो `Approval` इवेंट संदिग्ध नहीं है।

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[एक `async` फ़ंक्शन](https://www.w3schools.com/js/js_async.asp) एक `Promise` ऑब्जेक्ट लौटाता है। सामान्य सिंटैक्स, `await x()` के साथ, हम प्रसंस्करण जारी रखने से पहले उस `Promise` के पूरा होने की प्रतीक्षा करते हैं। यह प्रोग्राम करना और अनुसरण करना सरल है, लेकिन यह अक्षम भी है। जब हम किसी विशिष्ट इवेंट के लिए `Promise` के पूरा होने की प्रतीक्षा कर रहे होते हैं, तो हम पहले से ही अगले इवेंट पर काम करना शुरू कर सकते हैं।

यहाँ हम `Promise` ऑब्जेक्ट्स की एक सरणी बनाने के लिए [`map`](https://www.w3schools.com/jsref/jsref_map.asp) का उपयोग करते हैं। फिर हम उन सभी वादों के हल होने की प्रतीक्षा करने के लिए [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) का उपयोग करते हैं। फिर हम गैर-संदिग्ध इवेंट्स को हटाने के लिए उन परिणामों को [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp) करते हैं।

### संदिग्ध `Transfer` इवेंट्स {#suspicious-transfer-events}

स्कैम टोकन की पहचान करने का एक और संभावित तरीका यह देखना है कि क्या उनके पास कोई संदिग्ध हस्तांतरण है। उदाहरण के लिए, उन खातों से हस्तांतरण जिनमें उतने टोकन नहीं हैं। आप देख सकते हैं कि [इस परीक्षण को कैसे लागू किया जाए](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts), लेकिन `wARB` में यह समस्या नहीं है।

## निष्कर्ष {#conclusion}

ERC-20 स्कैम का स्वचालित पता लगाना [गलत नकारात्मक](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error) से ग्रस्त है, क्योंकि एक स्कैम एक पूरी तरह से सामान्य ERC-20 टोकन अनुबंध का उपयोग कर सकता है जो बस कुछ भी वास्तविक का प्रतिनिधित्व नहीं करता है। इसलिए आपको हमेशा _एक विश्वसनीय स्रोत से टोकन पता प्राप्त करने_ का प्रयास करना चाहिए।

स्वचालित पता लगाना कुछ मामलों में मदद कर सकता है, जैसे कि DeFi टुकड़े, जहां कई टोकन होते हैं और उन्हें स्वचालित रूप से संभालने की आवश्यकता होती है। लेकिन हमेशा की तरह [केविएट एम्प्टर](https://www.investopedia.com/terms/c/caveatemptor.asp), अपना खुद का शोध करें, और अपने उपयोगकर्ताओं को भी ऐसा करने के लिए प्रोत्साहित करें।

[मेरे और काम के लिए यहाँ देखें](https://cryptodocguy.pro/)।
