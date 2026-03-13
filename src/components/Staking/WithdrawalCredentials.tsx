"use client"

import { ChangeEvent, FC, useState } from "react"

import { ButtonLink } from "@/components/ui/buttons/Button"

import { CANONICAL_STAKING_TESTNET } from "@/lib/constants"

import { Flex } from "../ui/flex"
import Input from "../ui/input"

import { useTranslation } from "@/hooks/useTranslation"

const WithdrawalCredentials: FC = () => {
  const { t } = useTranslation("page-staking")
  const [inputValue, setInputValue] = useState<string>("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value.replace(/\D/g, ""))

  const mainnetHref = `https://beaconcha.in/validator/${inputValue}#deposits`
  const testnetHref = `https://hoodi.beaconcha.in/validator/${inputValue}#deposits`
  const disabledClass = !inputValue.length
    ? "pointer-events-none opacity-50"
    : ""

  return (
    <Flex className="flex-col gap-4">
      <Flex className="flex-wrap items-center gap-2">
        <Input
          id="validatorIndex"
          value={inputValue}
          onChange={handleChange}
          className="w-full sm:w-[18ch]"
          placeholder={t("comp-withdrawal-credentials-placeholder")}
        />
        <Flex className="w-full flex-col gap-2 sm:w-fit sm:flex-row">
          <ButtonLink href={mainnetHref} className={disabledClass}>
            {t("page-staking:comp-withdrawal-credentials-verify", {
              network: "Mainnet",
            })}
          </ButtonLink>
          <ButtonLink
            href={testnetHref}
            variant="outline"
            className={disabledClass}
          >
            {t("page-staking:comp-withdrawal-credentials-verify", {
              network: CANONICAL_STAKING_TESTNET,
            })}
          </ButtonLink>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default WithdrawalCredentials
