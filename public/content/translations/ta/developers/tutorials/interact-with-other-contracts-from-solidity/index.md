---
title: Solidity-இலிருந்து மற்ற ஒப்பந்தங்களுடன் ஊடாடுதல்
description: ஏற்கனவே உள்ள ஒப்பந்தத்திலிருந்து ஒரு ஸ்மார்ட் ஒப்பந்தத்தை எப்படி வரிசைப்படுத்துவது மற்றும் அதனுடன் ஊடாடுவது
author: "jdourlens"
tags:
  [
    "ஸ்மார்ட் ஒப்பந்தங்கள்",
    "திட்பம்",
    "remix",
    "வரிசைப்படுத்துதல்",
    "இணைதிறன்"
  ]
skill: advanced
lang: ta
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

முந்தைய வழிகாட்டிகளில், [உங்கள் முதல் ஸ்மார்ட் ஒப்பந்தத்தை எப்படி வரிசைப்படுத்துவது](/developers/tutorials/deploying-your-first-smart-contract/), [மாற்றிகள் மூலம் அணுகலைக் கட்டுப்படுத்துதல்](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) அல்லது [Solidity-இல் பிழை கையாளுதல்](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/) போன்ற சில அம்சங்களை அதில் சேர்ப்பது பற்றி நிறைய கற்றுக்கொண்டோம். இந்த வழிகாட்டியில், ஏற்கனவே உள்ள ஒப்பந்தத்திலிருந்து ஒரு ஸ்மார்ட் ஒப்பந்தத்தை எப்படி வரிசைப்படுத்துவது மற்றும் அதனுடன் ஊடாடுவது பற்றி நாம் கற்றுக்கொள்வோம்.

நாம் `CounterFactory` என்ற பெயரில் ஒரு ஃபேக்டரியை உருவாக்குவதன் மூலம், எவரும் தங்களது சொந்த `Counter` ஸ்மார்ட் ஒப்பந்தத்தைக் கொண்டிருக்க உதவும் ஒரு ஒப்பந்தத்தை உருவாக்குவோம். முதலில், நமது ஆரம்ப `Counter` ஸ்மார்ட் ஒப்பந்தத்தின் குறியீடு இதோ:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "நீங்கள் ஒப்பந்தத்தின் உரிமையாளர் அல்ல");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "நீங்கள் ஃபேக்டரியைப் பயன்படுத்த வேண்டும்");
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

ஃபேக்டரியின் முகவரி மற்றும் ஒப்பந்த உரிமையாளரின் முகவரியைக் கண்காணிக்க ஒப்பந்தக் குறியீட்டை நாங்கள் சற்று மாற்றியமைத்துள்ளோம் என்பதை கவனிக்கவும். நீங்கள் மற்றொரு ஒப்பந்தத்திலிருந்து ஒரு ஒப்பந்தக் குறியீட்டை அழைக்கும்போது, `msg.sender` நமது ஒப்பந்த ஃபேக்டரியின் முகவரியைக் குறிப்பிடும். மற்ற ஒப்பந்தங்களுடன் ஊடாட ஒரு ஒப்பந்தத்தைப் பயன்படுத்துவது ஒரு பொதுவான நடைமுறையாக இருப்பதால், இது **புரிந்துகொள்ள வேண்டிய மிக முக்கியமான ஒரு புள்ளியாகும்**. எனவே, சிக்கலான சந்தர்ப்பங்களில் அனுப்புநர் யார் என்பதில் நீங்கள் கவனமாக இருக்க வேண்டும்.

இதற்காக, நாங்கள் `onlyFactory` என்ற ஒரு மாற்றியையும் சேர்த்துள்ளோம், இது அசல் அழைப்பாளரை ஒரு அளவுருவாக அனுப்பும் ஃபேக்டரியால் மட்டுமே நிலையை மாற்றும் செயல்பாட்டை அழைக்க முடியும் என்பதை உறுதி செய்கிறது.

மற்ற எல்லா கவுண்டர்களையும் நிர்வகிக்கும் நமது புதிய `CounterFactory`-க்குள், ஒரு உரிமையாளரை அவரது கவுண்டர் ஒப்பந்தத்தின் முகவரியுடன் இணைக்கும் ஒரு மேப்பிங்கைச் சேர்ப்போம்:

```solidity
mapping(address => Counter) _counters;
```

Ethereum-இல், மேப்பிங் என்பது ஜாவாஸ்கிரிப்டில் உள்ள ஆப்ஜெக்டுகளுக்குச் சமமானது, அவை A வகை கீயை B வகை மதிப்புடன் மேப் செய்ய உதவுகின்றன. இந்த விஷயத்தில், நாம் ஒரு உரிமையாளரின் முகவரியை அதன் கவுண்டரின் நிகழ்வுடன் மேப் செய்கிறோம்.

ஒருவருக்காக ஒரு புதிய கவுண்டரை உருவாக்குவது இதுபோல இருக்கும்:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

அந்த நபரிடம் ஏற்கனவே ஒரு கவுண்டர் உள்ளதா என்று நாம் முதலில் சரிபார்க்கிறோம். அவரிடம் ஒரு கவுண்டர் இல்லை என்றால், அவரது முகவரியை `Counter` கன்ஸ்ட்ரக்டருக்கு அனுப்புவதன் மூலம் நாம் ஒரு புதிய கவுண்டரை உருவாக்கி, புதிதாக உருவாக்கப்பட்ட நிகழ்வை மேப்பிங்கிற்கு ஒதுக்குகிறோம்.

ஒரு குறிப்பிட்ட கவுண்டரின் எண்ணிக்கையைப் பெற, இது இதுபோல இருக்கும்:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

முதல் செயல்பாடு கொடுக்கப்பட்ட முகவரிக்கு கவுண்டர் ஒப்பந்தம் உள்ளதா என்று சரிபார்த்து, பின்னர் நிகழ்விலிருந்து `getCount` முறையை அழைக்கிறது. இரண்டாவது செயல்பாடு: `getMyCount` என்பது `msg.sender`-ஐ நேரடியாக `getCount` செயல்பாட்டிற்கு அனுப்புவதற்கான ஒரு சுருக்கமான வழியாகும்.

`increment` செயல்பாடு மிகவும் ஒத்திருக்கிறது, ஆனால் அது அசல் பரிவர்த்தனை அனுப்புநரை `Counter` ஒப்பந்தத்திற்கு அனுப்புகிறது:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

பல முறை அழைக்கப்பட்டால், நமது கவுண்டர் ஒரு ஓவர்ஃப்ளோவால் (overflow) பாதிக்கப்படலாம் என்பதை கவனிக்கவும். இந்த சாத்தியமான வழக்கிலிருந்து பாதுகாக்க, நீங்கள் முடிந்தவரை [SafeMath நூலகத்தைப்](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) பயன்படுத்த வேண்டும்.

நமது ஒப்பந்தத்தை வரிசைப்படுத்த, நீங்கள் `CounterFactory` மற்றும் `Counter` இரண்டின் குறியீட்டையும் வழங்க வேண்டும். உதாரணமாக Remix-இல் வரிசைப்படுத்தும் போது, நீங்கள் CounterFactory-ஐத் தேர்ந்தெடுக்க வேண்டும்.

முழுமையான குறியீடு இதோ:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "நீங்கள் ஒப்பந்தத்தின் உரிமையாளர் அல்ல");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "நீங்கள் ஃபேக்டரியைப் பயன்படுத்த வேண்டும்");
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

தொகுத்த பிறகு, Remix வரிசைப்படுத்தல் பிரிவில், வரிசைப்படுத்தப்பட வேண்டிய ஃபேக்டரியைத் தேர்ந்தெடுப்பீர்கள்:

![Remix இல் வரிசைப்படுத்தப்பட வேண்டிய ஃபேக்டரியைத் தேர்ந்தெடுத்தல்](./counterfactory-deploy.png)

பின்னர் நீங்கள் உங்கள் ஒப்பந்த ஃபேக்டரியுடன் விளையாடலாம் மற்றும் மதிப்பு மாறுவதை சரிபார்க்கலாம். நீங்கள் வேறு முகவரியிலிருந்து ஸ்மார்ட் ஒப்பந்தத்தை அழைக்க விரும்பினால், Remix இன் கணக்குத் தேர்வில் முகவரியை மாற்ற வேண்டும்.
