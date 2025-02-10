import { motion } from "framer-motion"

export const RecoveryPhraseNotice = () => (
  <motion.div
    className="h-full bg-background-highlight px-4 py-8 text-sm md:px-8 md:text-md [&_p]:mb-4 [&_p]:md:mb-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.25 }}
  >
    <p className="text-xl font-bold leading-8 md:text-2xl">Recovery phrase</p>
    <p>
      Any person knowing this <strong>secret</strong> recovery phrase can make
      transactions on behalf of your account.
    </p>
    <p>Wallet app providers do not have access to your account—only you do.</p>
    <p className="font-bold">You must back it up safely.</p>
  </motion.div>
)
