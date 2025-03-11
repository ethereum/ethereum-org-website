import { WordList } from "./WordList"

type InitialWordDisplayProps = {
  words: Array<string>
}
export const InitialWordDisplay = ({ words }: InitialWordDisplayProps) => (
  <div className="bg-background-highlight">
    <div className="py-8">
      <p className="px-4 text-xl font-bold leading-8 md:mb-6 md:px-8 md:text-2xl">
        Recovery phrase example
      </p>
    </div>
    <WordList words={words} />
  </div>
)
