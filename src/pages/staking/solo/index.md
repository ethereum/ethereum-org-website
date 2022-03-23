# Solo stake your ETH

Solo stakers are responsible for operating hardware that is running both an Ethereum execution client, as well as a consensus client (Beacon Chain). This is extremely important and beneficial to the health of the network.

They are eligible to propose blocks and receive rewards, while also being held responsible to being online and not breaking the rules.

## What is solo staking?

Solo staking provides you with maximum power as well as maximum responsibility. Here's a few things to consider when deciding if you'd like to solo stake vs. using a staking service or joining a staking pool.

<Card title="Full control">
  Solo staking allows you to completely customize your staking setup. You can configure your hardware, your software clients, your monitoring setup, choose which upgrades you support, etc. Unlike pool services that often make this decisions for you.
</Card>
<Card title="Network security">
  Solo staking is the most impactful way to stake. By running a validator on your own hardware, you help ensure the Ethereum protocol remains robust, decentralized, and secure.
</Card>
<Card title="Maximum rewards">
  You'll earn full rewards from the Ethereum protocol when you solo stake, unlike staking pools or staking services that all extract a fee..
</Card>

## ✋ Gerneral requirements regarding solo staking

As much as we wish that solo staking was accessible and risk free to everyone, this is not reality. There are some practical and serious considerations to keep in mind before choosing to solo stake your ETH.

If you think you’d be more comfortable with a less technical option, check out some of the [pooled staking services](/staking/pools/) that exist, or keep ready to get started with solo staking.

- Comfortable with computers: <!-- TODO: Quick explanation -->
- Secure key management: <!-- TODO: Quick explanation -->
- Unable to withdraw (for now): <!-- TODO: Quick explanation -->
- Maintenance: <!-- TODO: Quick explanation -->
- Reliable Uptime: <!-- TODO: Quick explanation -->

## How it works

1. Get some hardware: You need to run a node to stake. [Learn more](/run-a-node/)
2. Sync an execution layer (EL) client
3. Sync a consensus layer (CL) client
4. Generate your keys: Load them into your validator client
5. Monitor and maintain your node

<!-- TODO: Figure out where to put this:  -->

If ever desired, you can exit as a validator which eliminates the requirement to be online, and stops any further rewards. Be aware that until the planned Shanghai upgrade withdrawing those funds will not be possible. After Shanghai, users will be able to withdraw their rewards as well as their stake if they chose.

## Get started on the Staking Launchpad

The Staking Launchpad is an open source application that will help you become a validator. It walks you through a preparation checklist, how to choose clients, generate your keys and assists with depositing your ETH to the staking deposit contract.

<LaunchpadWidget>
  
  Choose network
    - **Testnet**
    - Mainnet

Solo validators are expected to **test their setup** and operational skills on the prater testnet before risking funds.

You may want to also check out some of the tools and guides below that can help you alongside the Staking Launchpad to get your clients set up with ease. It is important to choose a [minority client](/client-diversity) as it improves the security of the network, and limits your risk.

If you need help along the way, check out some of the solo staking tools or guides below.

<ButtonLink to="https://prater.launchpad.ethereum.org">Start staking</ButtonLink>
<ButtonLink scrollTo="#tools">Software tools and guide</ButtonLink>

</LaunchpadWidget>

## What to consider with staking tools

There are a growing number of tools and services to help you solo stake your ETH, but each come with different risks and benefits.

Attribute indicators are used below to signal notable strengths or weaknesses a listed staking tool may have. Use this section as a reference for how we define these attribute while you’re choosing what tools to help with your staking journey.

<!-- Card grid: -->

- **Open source**: Essential code is 100% open source and available to the public to fork and use
- **Audited**: Essential code has undergone formal auditing with results published and available publicly
- **Bug bounty**: A public bug bounty has been performed on any essential code to rewards users for safely reporting and/or fixing vulnerabilities
  - ✅ Currently active
- **Battle tested**: Software has been available and used by the public for a period of time
  - ✅ Live for over one year
  - 🟡 Live for over six months
  - 🛑 Live for less than six months
- **Trustless**: Validator keys are not entrusted to any other human at any time in the validator lifecycle. Any smart contracts involved are free of back doors, without reliance on privileged permissions for execution.
- **Permissionless**: User does not require any special permission to operate a validator using the software or service
- **Multi-client**: Software enables users to pick from and switch between at least two or more CL clients
  - ✅ Easy client switching
  - 🛑 Limits users to a supermajority client
- **Self custody**: User maintains custody of any validator credentials, including signing and withdrawal keys
- **Economical**: Users can operate a validator by staking less than 32 ETH, utilizing pooled funds from others

## 🛠 Explore solo staking tools

Variety options are available to choose from. Please be aware tha it is also important to choose a [minority client](/client-diversity) as it improves the security of the network.

<CardGrid>
  {stakingProducts.nodeTools.map(tool => <Card tool={tool} />)}
</CardGrid>

Have a suggestion for a staking tool we missed? Check out our [product listing policy](/contributing/adding-staking-product/) to see if it would be a good fit, and to submit it for review.

## 📖 Explore solo staking guides

- **CoinCashew's Ethereum 2.0 Guide** - Linux (CLI)
- **Somer Esat** - Linux (CLI)
- **Rocket Pool Node Operators** - Linux, macOS (CLI)

## Things to know

These are some of the most common questions about solo staking on Ethereum.

<!-- TODO: Edit and fill this out, and reevaluate placement on page -->

- What do I need to know before solo staking?
  <!-- TODO: Answer -->
- Initial setup: Internet and hardware requirements
  <!-- TODO: Answer -->
- Choosing the right client
  <!-- TODO: Answer -->
- Summary of penalties
  <!-- TODO: Answer -->
- Changes after the merge
  <!-- TODO: Answer -->

If solo staking seems too demanding you you, consider using a [staking-as-a-service](/staking/saas/) provider, or if you're working with <32 ETH, check out the [staking pools](/staking/pools/).

<FeedbackCard prompt="Was this page helpful?" />
