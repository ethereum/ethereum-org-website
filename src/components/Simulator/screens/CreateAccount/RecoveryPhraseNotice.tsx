import { motion } from "motion/react"
import { useTranslations } from "next-intl"

export const RecoveryPhraseNotice = () => {
  const t = useTranslations("component-wallet-simulator")

  return (
    <motion.div
      className="h-full bg-background-highlight px-4 py-8 text-sm md:px-8 md:text-md [&_p]:mb-4 [&_p]:md:mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <p className="text-xl font-bold leading-8 md:text-2xl">
        {t("sim-ca-recovery-title")}
      </p>
      <p>
        {t.rich("sim-ca-recovery-desc-1", {
          strong: (chunks) => <strong>{chunks}</strong>,
        })}
      </p>
      <p>{t("sim-ca-recovery-desc-2")}</p>
      <p className="font-bold">{t("sim-ca-recovery-desc-3")}</p>
    </motion.div>
  )
}
