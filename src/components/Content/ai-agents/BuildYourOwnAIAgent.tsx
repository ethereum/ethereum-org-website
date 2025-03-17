import { Image } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"

import ai16z from "@/public/images/ai-agents/ai16z.png"
import game from "@/public/images/ai-agents/game.png"

const BuildYourOwnAIAgent = () => {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex flex-1 flex-col gap-4 rounded-xl border bg-gradient-to-br from-transparent to-purple-200/10 p-8">
        <Image
          src={ai16z}
          alt="AI16Z"
          width={128}
          className="rounded-xl shadow-lg dark:shadow-body-light"
        />
        <p className="text-2xl font-semibold">Build your own AI agent</p>
        <p>Developer first framework</p>
        <p>
          An open-source framework designed to create, deploy, and manage
          autonomous AI agents.
        </p>
        <div>
          <ButtonLink href="https://elizaos.github.io/eliza/" variant="outline">
            Use Eliza
          </ButtonLink>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 rounded-xl border bg-gradient-to-br from-transparent to-purple-200/10 p-8">
        <Image
          src={game}
          alt="GAME"
          width={128}
          className="rounded-xl shadow-lg dark:shadow-body-light"
        />
        <p className="text-2xl font-semibold">GAME framework</p>
        <p>No-code AI agent platform</p>
        <p>
          Enables agents to be deployed on platforms like X and other
          third-party apps.
        </p>
        <div>
          <ButtonLink
            href="https://console.game.virtuals.io/"
            variant="outline"
          >
            Use GAME
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}

export default BuildYourOwnAIAgent
