---
title: "स्कैम टोकन द्वारा उपयोग की जाने वाली कुछ तरकीबें और उनका पता कैसे लगाएं"
description: "इस ट्यूटोरियल में हम एक स्कैम टोकन का विश्लेषण करते हैं ताकि यह देखा जा सके कि स्कैमर्स कौन सी तरकीबें अपनाते हैं, वे उन्हें कैसे लागू करते हैं, और हम उनका पता कैसे लगा सकते हैं।"
author: "ओरी पोमेरेंट्ज़"
tags: ["स्कैम", "Solidity", "ERC-20", "JavaScript", "TypeScript"]
skill: intermediate
breadcrumb: "स्कैम टोकन की तरकीबें"
published: 2023-09-15
lang: hi
---

इस ट्यूटोरियल में हम [एक स्कैम टोकन](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) का विश्लेषण करते हैं ताकि यह देखा जा सके कि स्कैमर्स कौन सी तरकीबें अपनाते हैं और वे उन्हें कैसे लागू करते हैं। ट्यूटोरियल के अंत तक आपको ERC-20 टोकन अनुबंधों (contracts), उनकी क्षमताओं और संदेह क्यों आवश्यक है, इसके बारे में अधिक व्यापक दृष्टिकोण प्राप्त होगा। फिर हम उस स्कैम टोकन द्वारा उत्सर्जित घटनाएँ को देखते हैं और देखते हैं कि हम स्वचालित रूप से कैसे पहचान सकते हैं कि यह वैध नहीं है।

## स्कैम टोकन - वे क्या हैं, लोग उन्हें क्यों बनाते हैं, और उनसे कैसे बचें {#scam-tokens}

इथेरियम के सबसे आम उपयोगों में से एक किसी समूह द्वारा एक व्यापार योग्य टोकन बनाना है, जो एक तरह से उनकी अपनी मुद्रा होती है। हालाँकि, जहाँ कहीं भी वैध उपयोग के मामले होते हैं जो मूल्य लाते हैं, वहाँ ऐसे अपराधी भी होते हैं जो उस मूल्य को अपने लिए चुराने की कोशिश करते हैं।

आप उपयोगकर्ता के दृष्टिकोण से इस विषय के बारे में [ethereum.org पर कहीं और](/guides/how-to-id-scam-tokens/) अधिक पढ़ सकते हैं। यह ट्यूटोरियल एक स्कैम टोकन का विश्लेषण करने पर केंद्रित है ताकि यह देखा जा सके कि यह कैसे किया जाता है और इसका पता कैसे लगाया जा सकता है।

### मुझे कैसे पता चलेगा कि wARB एक स्कैम है? {#warb-scam}

हम जिस टोकन का विश्लेषण कर रहे हैं वह [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) है, जो वैध [ARB टोकन](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) के समतुल्य होने का दिखावा करता है।

यह जानने का सबसे आसान तरीका कि कौन सा टोकन वैध है, मूल संगठन, [आर्बिट्रम](https://arbitrum.foundation/) को देखना है। वैध पते [उनके दस्तावेज़ों में](https://docs.arbitrum.foundation/deployment-addresses#token) निर्दिष्ट हैं।

### स्रोत कोड (source code) उपलब्ध क्यों है? {#why-source}

आमतौर पर हम उम्मीद करते हैं कि जो लोग दूसरों को धोखा देने की कोशिश करते हैं वे गुप्त रहेंगे, और वास्तव में कई स्कैम टोकन का कोड उपलब्ध नहीं होता है (उदाहरण के लिए, [यह वाला](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) और [यह वाला](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code))।

हालाँकि, वैध टोकन आमतौर पर अपना स्रोत कोड प्रकाशित करते हैं, इसलिए वैध दिखने के लिए स्कैम टोकन के लेखक कभी-कभी ऐसा ही करते हैं। [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) उन टोकन में से एक है जिसका स्रोत कोड उपलब्ध है, जिससे इसे समझना आसान हो जाता है।

हालाँकि अनुबंध डिप्लॉय करने वाले यह चुन सकते हैं कि स्रोत कोड प्रकाशित करना है या नहीं, वे गलत स्रोत कोड प्रकाशित _नहीं_ कर सकते हैं। ब्लॉक एक्सप्लोरर प्रदान किए गए स्रोत कोड को स्वतंत्र रूप से संकलित करता है, और यदि उसे बिल्कुल वही बाइटकोड नहीं मिलता है, तो वह उस स्रोत कोड को अस्वीकार कर देता है। [आप Etherscan साइट पर इसके बारे में अधिक पढ़ सकते हैं](https://etherscan.io/verifyContract)।

## वैध ERC-20 टोकन से तुलना {#compare-legit-erc20}

हम इस टोकन की तुलना वैध ERC-20 टोकन से करने जा रहे हैं। यदि आप इस बात से परिचित नहीं हैं कि वैध ERC-20 टोकन आमतौर पर कैसे लिखे जाते हैं, तो [यह ट्यूटोरियल देखें](/developers/tutorials/erc20-annotated-code/)।

### विशेषाधिकार प्राप्त पतों के लिए स्थिरांक (Constants) {#constants-for-privileged-addresses}

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

[`ARB` टोकन अनुबंध](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) में सीधे तौर पर कोई विशेषाधिकार प्राप्त पता नहीं होता है। हालाँकि, इसे इसकी आवश्यकता भी नहीं है। यह [पता `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code) पर एक [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) के पीछे स्थित है। उस अनुबंध में एक विशेषाधिकार प्राप्त पता है (चौथी फ़ाइल, `ERC1967Upgrade.sol` देखें) जिसका उपयोग अपग्रेड के लिए किया जा सकता है।

```solidity
    /**
     * @dev EIP1967 एडमिन स्लॉट में एक नया पता स्टोर करता है।
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: new admin is the zero address");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

इसके विपरीत, `wARB` अनुबंध में एक हार्ड-कोडेड `contract_owner` है।

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

[यह अनुबंध का मालिक](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) कोई ऐसा अनुबंध नहीं है जिसे अलग-अलग समय पर अलग-अलग खातों द्वारा नियंत्रित किया जा सके, बल्कि यह एक [बाहरी रूप से स्वामित्व वाला खाता (externally owned account)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) है। इसका मतलब है कि इसे संभवतः किसी व्यक्ति द्वारा अल्पकालिक उपयोग के लिए डिज़ाइन किया गया है, न कि एक मूल्यवान बने रहने वाले ERC-20 को नियंत्रित करने के लिए दीर्घकालिक समाधान के रूप में।

और वास्तव में, यदि हम Etherscan में देखें तो हम पाते हैं कि स्कैमर ने 19 मई, 2023 के दौरान केवल 12 घंटों के लिए इस अनुबंध का उपयोग किया था ([पहला लेन-देन](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) से [अंतिम लेन-देन](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b) तक)।

### नकली `_transfer` फ़ंक्शन {#the-fake-transfer-function}

वास्तविक ट्रांसफर को [एक आंतरिक `_transfer` फ़ंक्शन](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer) का उपयोग करके करना मानक है।

`wARB` में यह फ़ंक्शन लगभग वैध दिखता है:

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

संदिग्ध हिस्सा यह है:

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

यदि अनुबंध का मालिक टोकन भेजता है, तो `Transfer` घटनाएँ यह क्यों दिखाती हैं कि वे `deployer` से आते हैं?

हालाँकि, एक अधिक महत्वपूर्ण मुद्दा है। इस `_transfer` फ़ंक्शन को कौन कॉल करता है? इसे बाहर से कॉल नहीं किया जा सकता है, इसे `internal` के रूप में चिह्नित किया गया है। और हमारे पास जो कोड है उसमें `_transfer` के लिए कोई कॉल शामिल नहीं है। स्पष्ट रूप से, यह यहाँ एक छलावे (decoy) के रूप में है।

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

जब हम उन फ़ंक्शंस को देखते हैं जिन्हें टोकन ट्रांसफर करने के लिए कॉल किया जाता है, `transfer` और `transferFrom`, तो हम देखते हैं कि वे पूरी तरह से अलग फ़ंक्शन, `_f_` को कॉल करते हैं।

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

इस फ़ंक्शन में दो संभावित खतरे के संकेत (red flags) हैं।

- [फ़ंक्शन संशोधक (function modifier)](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_` का उपयोग। हालाँकि, जब हम स्रोत कोड में देखते हैं तो हम पाते हैं कि `_mod_` वास्तव में हानिरहित है।

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- वही समस्या जो हमने `_transfer` में देखी थी, जो यह है कि जब `contract_owner` टोकन भेजता है तो वे `deployer` से आते हुए प्रतीत होते हैं।

### नकली घटनाएँ फ़ंक्शन `dropNewTokens` {#the-fake-events-function-dropnewtokens}

अब हम एक ऐसी चीज़ पर आते हैं जो एक वास्तविक स्कैम की तरह दिखती है। मैंने पठनीयता के लिए फ़ंक्शन को थोड़ा संपादित किया है, लेकिन यह कार्यात्मक रूप से समतुल्य है।

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

इस फ़ंक्शन में `auth()` संशोधक है, जिसका अर्थ है कि इसे केवल अनुबंध के मालिक द्वारा ही कॉल किया जा सकता है।

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

यह प्रतिबंध बिल्कुल सही है, क्योंकि हम नहीं चाहेंगे कि यादृच्छिक (random) खाते टोकन वितरित करें। हालाँकि, बाकी का फ़ंक्शन संदिग्ध है।

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

एक पूल खाते से प्राप्तकर्ताओं की एक सरणी (array) में राशियों की एक सरणी को ट्रांसफर करने वाला फ़ंक्शन बिल्कुल सही है। ऐसे कई उपयोग के मामले हैं जिनमें आप एक ही स्रोत से कई गंतव्यों तक टोकन वितरित करना चाहेंगे, जैसे पेरोल, एयरड्रॉप आदि। कई लेन-देन जारी करने के बजाय, या एक ही लेन-देन के हिस्से के रूप में एक अलग अनुबंध से ERC-20 को कई बार कॉल करने के बजाय इसे एक ही लेन-देन में करना (गैस के मामले में) सस्ता है।

हालाँकि, `dropNewTokens` ऐसा नहीं करता है। यह [`Transfer` घटनाएँ](https://eips.ethereum.org/EIPS/eip-20#transfer-1) उत्सर्जित करता है, लेकिन वास्तव में कोई टोकन ट्रांसफर नहीं करता है। ऑफचेन अनुप्रयोगों को ऐसे ट्रांसफर के बारे में बताकर भ्रमित करने का कोई वैध कारण नहीं है जो वास्तव में हुआ ही नहीं।

### बर्न करने वाला `Approve` फ़ंक्शन {#the-burning-approve-function}

ERC-20 अनुबंधों में व्यय सीमा (allowances) के लिए [एक `approve` फ़ंक्शन](/developers/tutorials/erc20-annotated-code/#approve) होना चाहिए, और वास्तव में हमारे स्कैम टोकन में ऐसा फ़ंक्शन है, और यह सही भी है। हालाँकि, क्योंकि Solidity C से उत्पन्न हुई है, यह केस-संवेदी (case significant) है। "Approve" और "approve" अलग-अलग स्ट्रिंग हैं।

साथ ही, कार्यक्षमता `approve` से संबंधित नहीं है।

```solidity
    function Approve(
        address[] memory holders)
```

इस फ़ंक्शन को टोकन धारकों के पतों की एक सरणी के साथ कॉल किया जाता है।

```solidity
    public approver() {
```

`approver()` संशोधक यह सुनिश्चित करता है कि केवल `contract_owner` को ही इस फ़ंक्शन को कॉल करने की अनुमति है (नीचे देखें)।

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

प्रत्येक धारक के पते के लिए फ़ंक्शन धारक के पूरे बैलेंस को `0x00...01` पते पर ले जाता है, प्रभावी रूप से इसे बर्न कर देता है (मानक में वास्तविक `burn` कुल आपूर्ति को भी बदलता है, और टोकन को `0x00...00` में ट्रांसफर करता है)। इसका मतलब है कि `contract_owner` किसी भी उपयोगकर्ता की संपत्ति को हटा सकता है। यह ऐसी सुविधा नहीं लगती जो आप किसी गवर्नेंस टोकन में चाहेंगे।

### कोड गुणवत्ता की समस्याएँ {#code-quality-issues}

ये कोड गुणवत्ता की समस्याएँ यह _साबित_ नहीं करती हैं कि यह कोड एक स्कैम है, लेकिन वे इसे संदिग्ध बनाती हैं। आर्बिट्रम जैसी संगठित कंपनियाँ आमतौर पर इतना खराब कोड जारी नहीं करती हैं।

#### `mount` फ़ंक्शन {#the-mount-function}

हालाँकि यह [मानक](https://eips.ethereum.org/EIPS/eip-20) में निर्दिष्ट नहीं है, सामान्य तौर पर नए टोकन बनाने वाले फ़ंक्शन को [`mint`](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) कहा जाता है।

यदि हम `wARB` कंस्ट्रक्टर में देखें, तो हम देखते हैं कि मिंट फ़ंक्शन का नाम किसी कारण से बदलकर `mount` कर दिया गया है, और दक्षता के लिए पूरी राशि के लिए एक बार कॉल करने के बजाय, प्रारंभिक आपूर्ति के पांचवें हिस्से के साथ इसे पांच बार कॉल किया गया है।

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

`mount` फ़ंक्शन स्वयं भी संदिग्ध है।

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
```

`require` को देखते हुए, हम पाते हैं कि केवल अनुबंध के मालिक को ही मिंट करने की अनुमति है। यह वैध है। लेकिन त्रुटि संदेश _only owner is allowed to mint_ या ऐसा ही कुछ होना चाहिए। इसके बजाय, यह अप्रासंगिक _ERC20: mint to the zero address_ है। शून्य पता पर मिंटिंग के लिए सही परीक्षण `require(account != address(0), "<error message>")` है, जिसे अनुबंध कभी जांचने की जहमत नहीं उठाता।

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

मिंटिंग से सीधे संबंधित दो और संदिग्ध तथ्य हैं:

- एक `account` पैरामीटर है, जो संभवतः वह खाता है जिसे मिंट की गई राशि प्राप्त होनी चाहिए। लेकिन जो बैलेंस बढ़ता है वह वास्तव में `contract_owner` का है।

- जबकि बढ़ा हुआ बैलेंस `contract_owner` का है, उत्सर्जित घटना `account` में ट्रांसफर दिखाती है।

### `auth` और `approver` दोनों क्यों? `mod` क्यों जो कुछ नहीं करता? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

इस अनुबंध में तीन संशोधक शामिल हैं: `_mod_`, `auth`, और `approver`।

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` तीन पैरामीटर लेता है और उनके साथ कुछ नहीं करता है। इसे क्यों रखा गया है?

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

`auth` और `approver` अधिक समझ में आते हैं, क्योंकि वे जांचते हैं कि अनुबंध को `contract_owner` द्वारा कॉल किया गया था। हम उम्मीद करेंगे कि कुछ विशेषाधिकार प्राप्त कार्य, जैसे मिंटिंग, उस खाते तक सीमित हों। हालाँकि, दो अलग-अलग फ़ंक्शन रखने का क्या मतलब है जो _बिल्कुल एक ही काम_ करते हैं?

## हम स्वचालित रूप से क्या पता लगा सकते हैं? {#what-can-we-detect-automatically}

हम Etherscan को देखकर जान सकते हैं कि `wARB` एक स्कैम टोकन है। हालाँकि, यह एक केंद्रीकृत समाधान है। सिद्धांत रूप में, Etherscan को नष्ट या हैक किया जा सकता है। यह स्वतंत्र रूप से पता लगाने में सक्षम होना बेहतर है कि कोई टोकन वैध है या नहीं।

कुछ तरकीबें हैं जिनका उपयोग हम यह पहचानने के लिए कर सकते हैं कि कोई ERC-20 टोकन संदिग्ध है (या तो एक स्कैम है या बहुत खराब तरीके से लिखा गया है), उनके द्वारा उत्सर्जित घटनाएँ को देखकर।

## संदिग्ध `Approval` घटनाएँ {#suspicious-approval-events}

[`Approval` घटनाएँ](https://eips.ethereum.org/EIPS/eip-20#approval) केवल सीधे अनुरोध के साथ होनी चाहिए (इसके विपरीत [`Transfer` घटनाएँ](https://eips.ethereum.org/EIPS/eip-20#transfer-1) जो व्यय सीमा के परिणामस्वरूप हो सकती हैं)। इस समस्या के विस्तृत स्पष्टीकरण के लिए और अनुरोधों को किसी अनुबंध द्वारा मध्यस्थता करने के बजाय प्रत्यक्ष क्यों होना चाहिए, इसके लिए [Solidity दस्तावेज़ देखें](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin)।

इसका मतलब है कि `Approval` घटनाएँ जो किसी [बाहरी रूप से स्वामित्व वाले खाते](/developers/docs/accounts/#types-of-account) से खर्च करने की स्वीकृति देना (approve) करती हैं, उन्हें उन लेन-देन से आना चाहिए जो उस खाते में उत्पन्न होते हैं, और जिनका गंतव्य ERC-20 अनुबंध है। बाहरी रूप से स्वामित्व वाले खाते से किसी भी अन्य प्रकार की स्वीकृति संदिग्ध है।

यहाँ [एक प्रोग्राम है जो इस प्रकार की घटना की पहचान करता है](https://github.com/qbzzt/20230915-scam-token-detection), [Viem](https://viem.sh/) और [TypeScript](https://www.typescriptlang.org/docs/) का उपयोग करके, जो टाइप सुरक्षा के साथ एक JavaScript संस्करण है। इसे चलाने के लिए:

1. `.env.example` को `.env` में कॉपी करें।
2. इथेरियम मेननेट नोड का URL प्रदान करने के लिए `.env` को संपादित करें।
3. आवश्यक पैकेज स्थापित करने के लिए `pnpm install` चलाएँ।
4. संदिग्ध स्वीकृतियों की तलाश के लिए `pnpm susApproval` चलाएँ।

यहाँ पंक्ति दर पंक्ति स्पष्टीकरण दिया गया है:

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

`viem` से प्रकार परिभाषाएँ, फ़ंक्शन और चेन परिभाषा आयात करें।

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

संदिग्ध ERC-20 अनुबंध का पता, और वे ब्लॉक जिनके भीतर हम घटनाएँ खोजेंगे। नोड प्रदाता आमतौर पर घटनाएँ पढ़ने की हमारी क्षमता को सीमित करते हैं क्योंकि बैंडविड्थ महंगी हो सकती है। सौभाग्य से `wARB` अठारह घंटे की अवधि के लिए उपयोग में नहीं था, इसलिए हम सभी घटनाएँ खोज सकते हैं (कुल मिलाकर केवल 13 थीं)।

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

Viem से घटना की जानकारी माँगने का यह तरीका है। जब हम इसे फ़ील्ड नामों सहित सटीक घटना हस्ताक्षर (signature) प्रदान करते हैं, तो यह हमारे लिए घटना को पार्स करता है।

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

हमारा एल्गोरिदम केवल बाहरी रूप से स्वामित्व वाले खातों पर लागू होता है। यदि `client.getBytecode` द्वारा कोई बाइटकोड लौटाया जाता है तो इसका मतलब है कि यह एक अनुबंध है और हमें इसे छोड़ देना चाहिए।

यदि आपने पहले TypeScript का उपयोग नहीं किया है, तो फ़ंक्शन परिभाषा थोड़ी अजीब लग सकती है। हम इसे केवल यह नहीं बताते हैं कि पहले (और एकमात्र) पैरामीटर को `addr` कहा जाता है, बल्कि यह भी कि यह `Address` प्रकार का है। इसी तरह, `: boolean` भाग TypeScript को बताता है कि फ़ंक्शन का रिटर्न मान एक बूलियन (boolean) है।

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

यह फ़ंक्शन किसी घटना से लेन-देन रसीद प्राप्त करता है। हमें यह सुनिश्चित करने के लिए रसीद की आवश्यकता है कि हम जानते हैं कि लेन-देन का गंतव्य क्या था।

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

यह सबसे महत्वपूर्ण फ़ंक्शन है, जो वास्तव में यह तय करता है कि कोई घटना संदिग्ध है या नहीं। रिटर्न प्रकार, `(Event | null)`, TypeScript को बताता है कि यह फ़ंक्शन या तो `Event` या `null` लौटा सकता है। यदि घटना संदिग्ध नहीं है तो हम `null` लौटाते हैं।

```typescript
const owner = ev.args._owner
```

Viem के पास फ़ील्ड नाम हैं, इसलिए इसने हमारे लिए घटना को पार्स किया। `_owner` खर्च किए जाने वाले टोकन का मालिक है।

```typescript
// अनुबंधों द्वारा स्वीकृतियाँ संदिग्ध नहीं हैं
if (await isContract(owner)) return null
```

यदि मालिक एक अनुबंध है, तो मान लें कि यह स्वीकृति संदिग्ध नहीं है। यह जांचने के लिए कि किसी अनुबंध की स्वीकृति संदिग्ध है या नहीं, हमें लेन-देन के पूर्ण निष्पादन को ट्रेस करने की आवश्यकता होगी ताकि यह देखा जा सके कि क्या यह कभी मालिक अनुबंध तक पहुंचा, और क्या उस अनुबंध ने सीधे ERC-20 अनुबंध को कॉल किया। यह हमारी इच्छा से कहीं अधिक संसाधन खर्चीला है।

```typescript
const txn = await getEventTxn(ev)
```

यदि स्वीकृति किसी बाहरी रूप से स्वामित्व वाले खाते से आती है, तो वह लेन-देन प्राप्त करें जिसके कारण यह हुआ।

```typescript
// स्वीकृति संदिग्ध है यदि यह ऐसे EOA मालिक से आती है जो लेन-देन का `from` नहीं है
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

हम केवल स्ट्रिंग समानता की जांच नहीं कर सकते क्योंकि पते हेक्साडेसिमल होते हैं, इसलिए उनमें अक्षर होते हैं। कभी-कभी, उदाहरण के लिए `txn.from` में, वे अक्षर सभी लोअरकेस होते हैं। अन्य मामलों में, जैसे `ev.args._owner`, पता [त्रुटि पहचान के लिए मिश्रित-केस (mixed-case)](https://eips.ethereum.org/EIPS/eip-55) में होता है।

लेकिन यदि लेन-देन मालिक की ओर से नहीं है, और वह मालिक बाहरी रूप से स्वामित्व वाला है, तो हमारे पास एक संदिग्ध लेन-देन है।

```typescript
// यह भी संदिग्ध है यदि लेन-देन का गंतव्य वह ERC-20 अनुबंध नहीं है जिसकी हम
// जांच कर रहे हैं
if (txn.to.toLowerCase() != testedAddress) return ev
```

इसी तरह, यदि लेन-देन का `to` पता, जिसे पहला अनुबंध कहा जाता है, जांच के अधीन ERC-20 अनुबंध नहीं है तो यह संदिग्ध है।

```typescript
    // यदि संदिग्ध होने का कोई कारण नहीं है, तो null लौटाएं।
    return null
}
```

यदि कोई भी शर्त सत्य नहीं है तो `Approval` घटना संदिग्ध नहीं है।

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[एक `async` फ़ंक्शन](https://www.w3schools.com/js/js_async.asp) एक `Promise` ऑब्जेक्ट लौटाता है। सामान्य सिंटैक्स, `await x()` के साथ, हम प्रसंस्करण जारी रखने से पहले उस `Promise` के पूरा होने की प्रतीक्षा करते हैं। इसे प्रोग्राम करना और पालन करना सरल है, लेकिन यह अक्षम भी है। जब हम किसी विशिष्ट घटना के लिए `Promise` के पूरा होने की प्रतीक्षा कर रहे होते हैं, तो हम पहले से ही अगली घटना पर काम करना शुरू कर सकते हैं।

यहाँ हम `Promise` ऑब्जेक्ट्स की एक सरणी बनाने के लिए [`map`](https://www.w3schools.com/jsref/jsref_map.asp) का उपयोग करते हैं। फिर हम उन सभी वादों (promises) के हल होने की प्रतीक्षा करने के लिए [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) का उपयोग करते हैं। फिर हम गैर-संदिग्ध घटनाएँ को हटाने के लिए उन परिणामों को [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp) करते हैं।

### संदिग्ध `Transfer` घटनाएँ {#suspicious-transfer-events}

स्कैम टोकन की पहचान करने का एक और संभावित तरीका यह देखना है कि क्या उनमें कोई संदिग्ध ट्रांसफर है। उदाहरण के लिए, उन खातों से ट्रांसफर जिनके पास उतने टोकन नहीं हैं। आप देख सकते हैं कि [इस परीक्षण को कैसे लागू किया जाए](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts), लेकिन `wARB` में यह समस्या नहीं है।

## निष्कर्ष {#conclusion}

ERC-20 स्कैम का स्वचालित रूप से पता लगाना [फॉल्स नेगेटिव (false negatives)](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error) से ग्रस्त है, क्योंकि एक स्कैम पूरी तरह से सामान्य ERC-20 टोकन अनुबंध का उपयोग कर सकता है जो बस किसी भी वास्तविक चीज़ का प्रतिनिधित्व नहीं करता है। इसलिए आपको हमेशा _किसी विश्वसनीय स्रोत से टोकन पता प्राप्त करने_ का प्रयास करना चाहिए।

स्वचालित पहचान कुछ मामलों में मदद कर सकती है, जैसे कि विकेंद्रीकृत वित्त (DeFi) के हिस्सों में, जहाँ कई टोकन होते हैं और उन्हें स्वचालित रूप से संभालने की आवश्यकता होती है। लेकिन हमेशा की तरह [क्रेता सावधान रहे (caveat emptor)](https://www.investopedia.com/terms/c/caveatemptor.asp), अपना स्वयं का शोध करें, और अपने उपयोगकर्ताओं को भी ऐसा करने के लिए प्रोत्साहित करें।

[मेरे और अधिक काम के लिए यहाँ देखें](https://cryptodocguy.pro/)।