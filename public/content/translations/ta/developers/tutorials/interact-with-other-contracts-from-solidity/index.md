---
title: "Solidity-யிலிருந்து பிற ஒப்பந்தங்களுடன் தொடர்புகொள்ளுதல்"
description: "ஏற்கனவே உள்ள ஒரு ஒப்பந்தத்திலிருந்து ஒரு திறன் ஒப்பந்தத்தை நிலைநிறுத்துவது மற்றும் அதனுடன் தொடர்புகொள்வது எப்படி"
author: "jdourlens"
tags: ["திறன் ஒப்பந்தங்கள்", "Solidity", "Remix", "நிலைநிறுத்துதல்", "தொகுக்கக்கூடிய தன்மை"]
skill: advanced
breadcrumb: "ஒப்பந்தத் தொடர்புகள்"
lang: ta
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

முந்தைய பயிற்சிகளில் [உங்கள் முதல் திறன் ஒப்பந்தத்தை எவ்வாறு நிலைநிறுத்துவது](/developers/tutorials/deploying-your-first-smart-contract/) மற்றும் [மாற்றிகளைக் கொண்டு அணுகலைக் கட்டுப்படுத்துதல்](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) அல்லது [Solidity-யில் பிழைகளைக் கையாளுதல்](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/) போன்ற சில அம்சங்களை அதில் எவ்வாறு சேர்ப்பது என்பது பற்றி நிறைய கற்றுக்கொண்டோம். இந்தப் பயிற்சியில், ஏற்கனவே உள்ள ஒரு ஒப்பந்தத்திலிருந்து ஒரு திறன் ஒப்பந்தத்தை எவ்வாறு நிலைநிறுத்துவது மற்றும் அதனுடன் எவ்வாறு தொடர்புகொள்வது என்பதைக் கற்றுக்கொள்வோம்.

யார் வேண்டுமானாலும் தங்களுக்கென சொந்தமாக ஒரு `Counter` திறன் ஒப்பந்தத்தை உருவாக்குவதற்கான ஒரு தொழிற்சாலையை (factory) உருவாக்கும் ஒரு ஒப்பந்தத்தை நாங்கள் உருவாக்குவோம், அதன் பெயர் `CounterFactory` ஆக இருக்கும். முதலில், எங்களின் ஆரம்ப `Counter` திறன் ஒப்பந்தத்தின் குறியீடு இங்கே:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
        _;
    }

     constructor(address owner) public {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}
```

தொழிற்சாலையின் முகவரி மற்றும் ஒப்பந்த உரிமையாளரின் முகவரி ஆகியவற்றைக் கண்காணிப்பதற்காக ஒப்பந்தக் குறியீட்டை நாங்கள் சற்று மாற்றியுள்ளோம் என்பதை நினைவில் கொள்ளவும். நீங்கள் மற்றொரு ஒப்பந்தத்திலிருந்து ஒரு ஒப்பந்தக் குறியீட்டை அழைக்கும்போது, msg.sender என்பது எங்கள் ஒப்பந்தத் தொழிற்சாலையின் முகவரியைக் குறிக்கும். பிற ஒப்பந்தங்களுடன் தொடர்புகொள்ள ஒரு ஒப்பந்தத்தைப் பயன்படுத்துவது ஒரு பொதுவான நடைமுறை என்பதால், இது **புரிந்துகொள்ள வேண்டிய மிக முக்கியமான ஒரு விஷயமாகும்**. எனவே சிக்கலான சந்தர்ப்பங்களில் அனுப்புநர் யார் என்பதில் நீங்கள் கவனம் செலுத்த வேண்டும்.

இதற்காக நாங்கள் ஒரு `onlyFactory` மாற்றியையும் சேர்த்துள்ளோம், இது நிலையை மாற்றும் சார்பை (state changing function) அசல் அழைப்பாளரை ஒரு அளவுருவாக அனுப்பும் தொழிற்சாலையால் மட்டுமே அழைக்க முடியும் என்பதை உறுதிசெய்கிறது.

மற்ற அனைத்து Counter-களையும் நிர்வகிக்கும் எங்களின் புதிய `CounterFactory`-க்குள், ஒரு உரிமையாளரை அவரது counter ஒப்பந்தத்தின் முகவரியுடன் இணைக்கும் ஒரு மேப்பிங்கை (mapping) சேர்ப்போம்:

```solidity
mapping(address => Counter) _counters;
```

எத்திரியத்தில், மேப்பிங் என்பது JavaScript-ல் உள்ள ஆப்ஜெக்ட்களுக்குச் சமமானதாகும், அவை A வகையின் திறவுகோலை B வகையின் மதிப்புடன் மேப் செய்ய உதவுகின்றன. இந்த நிலையில், ஒரு உரிமையாளரின் முகவரியை அதன் Counter-இன் நிகழ்வுடன் (instance) மேப் செய்கிறோம்.

ஒருவருக்காக ஒரு புதிய Counter-ஐ உருவாக்குவது (instantiating) இதுபோன்று இருக்கும்:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

அந்த நபருக்கு ஏற்கனவே ஒரு counter உள்ளதா என்பதை நாங்கள் முதலில் சரிபார்க்கிறோம். அவருக்கு counter இல்லை என்றால், அவரது முகவரியை `Counter` ஆக்கிக்கு அனுப்பி ஒரு புதிய counter-ஐ உருவாக்குகிறோம், மேலும் புதிதாக உருவாக்கப்பட்ட நிகழ்வை மேப்பிங்கிற்கு ஒதுக்குகிறோம்.

ஒரு குறிப்பிட்ட Counter-இன் எண்ணிக்கையைப் பெற, அது இதுபோன்று இருக்கும்:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

முதல் சார்பு (function) கொடுக்கப்பட்ட முகவரிக்கு Counter ஒப்பந்தம் உள்ளதா என்பதைச் சரிபார்த்து, பின்னர் நிகழ்விலிருந்து `getCount` முறையை அழைக்கிறது. இரண்டாவது சார்பு: `getMyCount` என்பது msg.sender-ஐ நேரடியாக `getCount` சார்புக்கு அனுப்புவதற்கான ஒரு சுருக்கமான வழியாகும்.

`increment` சார்பு மிகவும் ஒத்திருக்கிறது, ஆனால் அசல் பரிவர்த்தனை அனுப்புநரை `Counter` ஒப்பந்தத்திற்கு அனுப்புகிறது:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

பல முறை அழைக்கப்பட்டால், எங்கள் counter ஒரு அளவுமீறலுக்கு (overflow) பலியாகக்கூடும் என்பதை நினைவில் கொள்ளவும். சாத்தியமான இந்த நிலையிலிருந்து பாதுகாக்க, நீங்கள் முடிந்தவரை [SafeMath நிரலகத்தைப்](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) பயன்படுத்த வேண்டும்.

எங்கள் ஒப்பந்தத்தை நிலைநிறுத்த, நீங்கள் `CounterFactory` மற்றும் `Counter` ஆகிய இரண்டின் குறியீட்டையும் வழங்க வேண்டும். எடுத்துக்காட்டாக Remix-ல் நிலைநிறுத்தும்போது, நீங்கள் CounterFactory-ஐத் தேர்ந்தெடுக்க வேண்டும்.

முழுமையான குறியீடு இங்கே:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
        _;
    }

     constructor(address owner) public {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}

contract CounterFactory {

    mapping(address => Counter) _counters;

    function createCounter() public {
        require (_counters[msg.sender] == Counter(0));
        _counters[msg.sender] = new Counter(msg.sender);
    }

    function increment() public {
        require (_counters[msg.sender] != Counter(0));
        Counter(_counters[msg.sender]).increment(msg.sender);
    }

    function getCount(address account) public view returns (uint256) {
        require (_counters[account] != Counter(0));
        return (_counters[account].getCount());
    }

    function getMyCount() public view returns (uint256) {
        return (getCount(msg.sender));
    }

}
```

தொகுத்த பிறகு, Remix நிலைநிறுத்துதல் பிரிவில் நீங்கள் நிலைநிறுத்தப்பட வேண்டிய தொழிற்சாலையைத் தேர்ந்தெடுப்பீர்கள்:

![Selecting the factory to be deployed in Remix](./counterfactory-deploy.png)

பின்னர் நீங்கள் உங்கள் ஒப்பந்தத் தொழிற்சாலையுடன் விளையாடலாம் மற்றும் மதிப்பு மாறுவதைச் சரிபார்க்கலாம். நீங்கள் வேறு முகவரியிலிருந்து திறன் ஒப்பந்தத்தை அழைக்க விரும்பினால், Remix-இன் Account தேர்வில் முகவரியை மாற்ற வேண்டும்.