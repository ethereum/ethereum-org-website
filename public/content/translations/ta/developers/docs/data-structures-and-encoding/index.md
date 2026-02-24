---
title: "தரவு கட்டமைப்புகள் மற்றும் குறியாக்கம்"
description: "Ethereum மிக அதிக அளவு தரவுகளை (data) உருவாக்குகிறது, சேமிக்கிறது மற்றும் பரிமாற்றுகிறது."
lang: ta
sidebarDepth: 2
---

Ethereum மிக அதிக அளவு தரவுகளை (data) உருவாக்குகிறது, சேமிக்கிறது மற்றும் பரிமாற்றுகிறது. இந்தத் தரவு, ஒப்பீட்டளவில் சாதாரணமான நுகர்வோர் தர வன்பொருளில் எவரும் [ஒரு முனையை இயக்க](/run-a-node/) அனுமதிக்கும் வகையில், தரப்படுத்தப்பட்ட மற்றும் நினைவகத் திறன்மிக்க வழிகளில் வடிவமைக்கப்பட வேண்டும். இதனைச் செய்ய, Ethereum stack-இல் பல குறிப்பிட்ட data structures பயன்படுத்தப்படுகின்றன.

## முன்னேற்றக் கட்டுரை {#prerequisites}

நீங்கள் Ethereum மற்றும் [கிளையன்ட் மென்பொருள்](/developers/docs/nodes-and-clients/) ஆகியவற்றின் அடிப்படைகளைப் புரிந்து கொள்ள வேண்டும். நெட்வொர்க்கிங் அடுக்கு மற்றும் [Ethereum வெள்ளை அறிக்கை](/whitepaper/) பற்றிய பரிச்சயம் பரிந்துரைக்கப்படுகிறது.

## தரவுக் கட்டமைப்புகள் {#data-structures}

### Patricia merkle tries {#patricia-merkle-tries}

Patricia Merkle Tries என்பது key-value pairs-ஐ ஒரு deterministic மற்றும் cryptographically authenticated trie-ஆக குறியாக்கும் (encode) அமைப்புகள். இவை Ethereum execution layer முழுவதும் பரவலாக (extensively) பயன்படுத்தப்படுகின்றன.

[Patricia Merkle Tries பற்றி மேலும்](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### Recursive Length Prefix {#recursive-length-prefix}

Recursive Length Prefix (RLP) என்பது Ethereum execution layer முழுவதும் பரவலாக பயன்படுத்தப்படும் ஒரு serialization method ஆகும்.

[RLP பற்றி மேலும்](/developers/docs/data-structures-and-encoding/rlp)

### Simple Serialize {#simple-serialize}

Simple Serialize (SSZ) என்பது Ethereum consensus layer-இல் பிரதான (dominant) serialization format ஆகும். இதன் முக்கிய காரணம், இது merkelization-க்கு ஏற்றதாக (compatible) இருப்பது.

[SSZ பற்றி மேலும்](/developers/docs/data-structures-and-encoding/ssz)
