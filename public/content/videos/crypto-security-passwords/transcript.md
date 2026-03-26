---
title: "Crypto security: passwords and authentication"
description: "Andreas Antonopoulos covers essential crypto security practices in this livestream, focusing on password management, authentication methods, and best practices for protecting your digital assets and private keys."
---

This livestream covers essential security practices for cryptocurrency holders, from password management fundamentals to multi-factor authentication. Andreas Antonopoulos walks through the principles of balancing security with usability, explains why password managers are essential, introduces the XKCD passphrase concept, and details the hierarchy of two-factor authentication methods.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=m8jlnZuV1i4) published by aantonop. It has been lightly edited for readability.*

#### Welcome and motivation for crypto security (3:17)

Hello everyone and welcome to this Saturday live stream. This bonus live stream with the topic of passwords, password managers, authentication, multifactor authentication, and all things related to the security of your accounts.

How do passwords and multifactor authentication relate to bitcoin and open blockchains? In order to maintain the security of your cryptocurrencies, you have to maintain the security of all of your accounts. Something that's very interesting about cryptocurrencies is that for many people this is the first time they've had to carefully think about the security of their online identity and online devices, because now there's money sitting there and that makes it a much more juicy target.

In the past, people have not been very motivated to protect their own security because when you lose your privacy, when your information gets hacked, you don't really feel it right away. If someone comes in and steals a few hundred or a few thousand dollars from your digital devices, you feel that immediately. Unfortunately this is a lesson that is only learned through a painful experience.

#### Security is a balance (6:32)

The other thing that's really important to understand is that security is a balance. It's risk management. There is no such thing as 100% security. There's no such thing as perfect security. You can't protect against all threats.

You have to figure out what threats you face, how many of those threats you can actually protect against, and how much effort you're going to put into protecting against them. You also have to find out when the solution you're building becomes so complex that it becomes a security risk in itself.

We often see newbies, especially in the space of cryptocurrencies, make solutions that are far too complex. Then we end up on the wrong side of the security-resilience balance, where the mechanism for securing your cryptocurrency is so complex that you end up losing it because you're using something non-standard, because you forget a password, because nobody knows exactly what you did and you're not available to help them.

Simplicity is often a key element of security. Simple security solutions that you can apply within your technical skills, apply consistently, and recover from if you have problems are better than complex security solutions that force you to exceed your level of skill.

#### Password managers — solving memory and randomness (11:57)

For decades, we have been training users to create long random alphanumeric passwords with a broad range of characters. These are passwords that humans can't remember, that actually encourage bad behavior. They encourage behavior where you end up using the same sneaky pattern — Satoshi Nakamoto with the Os replaced by zeros and the first letter capitalized and the T replaced by a seven and a hash at the end. If you have to use it on more than one site, you make a small change. Then you end up reusing your password on many sites, which is very bad for security.

My first piece of advice: don't try to create your own passwords — **use a password manager**. A password manager is software that generates random passwords for you and remembers them for you. These systems solve two problems: human memory is fallible, and human randomness is even worse. We're very bad at doing random, we're very bad at remembering, and we're double bad at remembering random.

The most basic form of password manager is a little password book. As much as I'll say it's not very modern, it's honestly the solution my parents use. But a better solution for the more technically sophisticated is to download software — products such as LastPass, 1Password, Bitwarden, KeePass, and a whole variety of others. For the basic functionality, these are free.

My advice to get started: figure out what kind of devices you need to use this on. One big advantage of a password manager is having all your passwords synced across all devices. You also want browser extension support so you can automatically fill in and submit passwords into web forms.

Once you've selected a password manager, you set one password — your master password. I would also suggest using two-factor authentication on that account.

The important point about risk balance here: can I trust the password manager? What happens if the software is compromised? Risk two: can I trust my brain? If you put it that way, it becomes clear that any password manager is better than no password manager, just like any hardware wallet is better than no hardware wallet. Don't try to generate unique passwords yourself — click the little button that says "generate secure password" and set the length to something ridiculous.

#### How password managers protect your data (27:17)

A backup of your password database is stored in the cloud. However, that backup is encrypted end-to-end — encrypted on your local machine, sent encrypted to the cloud, and decrypted only on your local machine.

The way it's encrypted and decrypted is using your master password, which is passed through a password stretching algorithm — thousands of rounds of hashing. This takes time, and what it results in is a password that cannot be brute forced. If every password is hashed 25,000 or 50,000 or 100,000 times, every time you type it your computer takes two to three seconds, which isn't a big deal for you. But if an attacker has to add two to three seconds every guess, that completely messes up the brute force approach.

The password database is encrypted with a standard encryption algorithm like AES-256 — a symmetric encryption algorithm using a single private key. As long as you only type your master passphrase on a trusted local device, you get a high degree of safety.

Even if someone has a keylogger, they may capture your master passphrase, but they cannot download the encrypted database from the cloud without the second factor of authentication. We're building layers. Security isn't one thing that stops everything — it's putting barriers in the way of an attacker, where right behind each barrier is another barrier, requiring different skills and budgets to break each one.

#### The XKCD passphrase concept (34:36)

Let's talk about passphrases. I'm going to get some help from Randall Monroe and the famous XKCD cartoon about passwords.

The cartoon shows that through 20 years of effort, we've successfully trained everyone to use passwords that are hard for humans to remember but easy for computers to guess. A typical password like "Tr0ub4d0ur&3" — the word troubadour messed up with number substitutions — has about 28 bits of entropy. At a thousand guesses per second, it would take about three days to brute force. It's easy for computers to guess but hard for humans to remember.

Right below, Randall Monroe shows a different approach: using plain English words separated by spaces — a mnemonic passphrase. Just picking four words at random from a big dictionary produces about 44 bits of entropy, which gives you 550 years at a thousand guesses per second. Most importantly, it's easy for humans to remember.

Think about "correct horse battery staple" — even though these are random words, you can create a weird mental image that gives you a basis for association, and association is how human memory works. If you just say these four words to a geek, they will immediately know what you're talking about because millions of people have successfully memorized it from a single cartoon.

This is a much better way of producing a master password for your password manager, as well as an optional passphrase for your wallet.

#### Generating passphrases securely (49:55)

You want your passphrase words to be random. You don't want them to be song lyrics. You don't want it to be the rallying cry of your football team or a phrase from Star Trek, because all of those phrases exist in dictionaries that hackers have collected. You should never use a phrase that has ever been said or is likely to ever be said by someone.

Instead, pick random words and try to create a mental image meaningful to you. There are several ways to do this:

- **Dictionary method**: Open a dictionary to different pages and put your finger down without looking. Not very precise, but good enough because dictionaries have lots of words.
- **Diceware**: A list of words indexed by numbers with digits between one and six. You throw dice five times, create a five-digit number, and look up the corresponding word. It's non-digital and uses plain dice.
- **Software**: Programs like XKCD-pass produce passphrase candidates. Generate a long list and pick one at random.

For consistency, I always type my mnemonic passphrases in all lowercase with simple spaces in between. They can be anywhere from four to eight words in length. The more often you use a passphrase, the longer you can make it, because practice helps you remember.

#### Two-factor authentication fundamentals (57:48)

Two-factor authentication means using two different ways to authenticate yourself. The three possible factors are:

1. **Something you know** — a password or knowledge-based answers
2. **Something you are** — a biometric like fingerprint, iris scan, or facial recognition
3. **Something you have** — a physical device like a security key

No single factor of authentication is sufficient on its own. All factors have failure modes, but if you use varied multifactor authentication, the failure mode of one factor leaves the other as your protection.

Biometrics have an important limitation: if they're copied or lost, they cannot be replaced. You can't change your fingerprints. As every eight-year-old knows, if you hold mommy's iPhone up to her finger while she's sleeping, you can go shopping on Amazon. Biometric alone isn't sufficient but makes a great second factor.

#### Hardware security keys (1:02:09)

I have a YubiKey — a device so tiny that when I put it into the USB port, the only thing sticking out is a little metallic tab that's touch-sensitive. When I try to use it, it requires me to touch to activate it. You can't log into my computer or many other services without tapping to authenticate.

If you steal my database or guess my password, you still can't access my accounts because you don't have this device. If you hack into my systems and get my password, you don't have the device. When I leave my computer unattended, I take out the YubiKey and take it with me.

What if I lose my YubiKey? I actually have three — one in an offsite location as my ultimate backup, a second I take with me, and all three are registered so any one will work. They're near indestructible — you can run over them with a truck and they still work. The main threat I'm trying to address is remote compromise.

The U2F standard — universal two factor — is created by the FIDO Alliance for hardware-based multifactor devices that can be plugged in, connected, or transmitted over Bluetooth or NFC.

#### Time-based one-time passwords (1:18:00)

Google Authenticator, Microsoft Authenticator, and similar apps use a mechanism called a **time-based one-time password (TOTP)**. This is a subclass of one-time passwords where the code is tied to the current time and changes every 30 seconds.

These apps use a secret and a clock to generate the specific code for the specific time. Because the website or device also has the same secret and a synchronized clock, it can figure out what code you're supposed to enter.

The secret is in the QR code that the service displays the first time you set it up. You scan it with your authenticator app, and the app starts generating codes for the current time. These apps are actually fairly decentralized — the secrets are only stored on your local device. The difficulty is backup.

The most secure backup method is a physical printout of the QR code. Don't take a photo with your smartphone — that gets stored in the cloud, defeating the purpose. Many services also give you backup codes — store them in your password manager.

#### Why SMS two-factor authentication is weak (1:09:47)

A text message isn't really "something you own" — the text message is being sent to a phone number, not a phone. Who owns that phone number? The phone company. And the phone company has poor security.

All you have to do is call customer service, play the sound of a crying baby in the background, pretend you're a frustrated babysitter having a meltdown, and the very helpful people at customer service will bypass security checks and happily port the number to a new device. At hacker conferences like DEF CON, social engineering hackers have demonstrated taking over someone's phone number in less than 10 minutes, then using it to reset email accounts and compromise an entire digital identity within 15 minutes.

Is SMS better than nothing? Yes. But if you can avoid it, especially for cryptocurrency exchanges, use something stronger. You can also improve SMS security by moving your number to a virtual network operator like Google Fi that doesn't have humans who can be socially engineered, and where the account is protected by strong two-factor authentication.

#### The hierarchy of two-factor authentication (1:27:16)

1. **Tier 1: Hardware security keys** — Very strong, encryption-based. Register several and keep them in secure locations. Impossible to copy or steal without noticing.
2. **Tier 2: Time-based one-time passwords** — Apps like Google Authenticator giving a six-digit code every 30 seconds. Makes your phone the "something you own" factor. A bit difficult to back up.
3. **Tier 3: SMS text messages** — Not secure unless you have no other option, in which case it's better than nothing.

#### Symmetric vs. asymmetric encryption (1:43:33)

Asymmetric encryption uses two keys in a pair — a private key and a public key. Whatever is encrypted by one can only be decrypted by the other. This combination is used for digital signatures and encrypted communication. Symmetric encryption uses one key for both encryption and decryption. Until the 1970s, symmetric encryption was the only encryption mechanism.

#### Password managers — just pick one (1:40:00)

The two most popular password managers are probably LastPass and 1Password. Beyond that there's Bitwarden, which is an open-source system that's multi-platform and pretty well architected.

The differences between the top four or five products in this space are small. They're all pretty good, pretty secure, pretty consistent. The difference between one of the top password managers and not having a password manager at all, or trying to rely on memory or a DIY solution, is vast. So the question isn't "which one should I be using?" — it's "should I be using one?" The answer is yes.

The only question you should be asking is how quickly can I get one of these things up and running, secure it properly, and then go out and change all the passwords on all the websites, starting with the most important ones first.

#### Practical security for everyday devices (1:49:30)

A question about passwords you need to manually input with your remote on the TV — for Netflix, Amazon, and similar services. I've struggled with this. Imagine you've used your password manager to generate a unique 32-character alphanumeric password for Netflix, and now you have to enter it on a Roku TV by moving a cursor to each letter one at a time.

In cases where your security isn't critical, use a simple numeric or alphabetic password and make it a bit longer. I don't care if someone hacks into my Netflix — the real issue is whether I remembered to reset the Roku TV when I left the Airbnb.

I usually pick a numeric password grouped with dashes — something like four groups of three digits from a random number generator. Numbers and dashes are on the same keyboard area, and many remotes have a numeric keypad.

Similarly, a four-digit PIN is secure enough in the context of controlled-access devices like ATMs and pin pads, where there are additional layers of security like eating your card if you type it wrong. It's not just the PIN — it's the context of how it's used.

#### Final security recap (1:37:49)

Security isn't ever 100%. It's about managing realistic risks within your technical competence with the simplest and most consistently applied solution you can find, layered with other solutions to provide a series of barriers against a determined attacker.

If you do security right, you become comfortable with the measures, apply them consistently, and have enough layers to make it so that an attacker neither has the time, the resources, the budget, nor the interest to attack you. Instead they attack someone who is a softer target. That's basically security.

It can't be solved with a single tool, technique, practice, or action. You have to use multiple tools, multiple techniques, layered together — preferably diverse mechanisms that require different skills from attackers. That will still not get you to 100% security, but if you do it consistently and deliberately, you can join the elite group of people who can honestly say "I haven't been hacked for years." That's the best you can do, but that's usually pretty good.
