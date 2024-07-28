import { FunctionComponent, ReactNode, SVGProps } from "react"

type WindowBoxProps = {
  title: ReactNode
  Svg: FunctionComponent<SVGProps<SVGSVGElement>>
  children?: ReactNode
}

const WindowBox = ({ title, children, Svg }: WindowBoxProps) => (
  <div className="flex flex-col overflow-hidden rounded-2xl border shadow">
    <div className="flex items-center gap-4 bg-primary-highlight-gradient p-4">
      <div className="grid size-10 place-items-center rounded-lg border">
        <Svg />
      </div>
      <p className="font-bold">{title}</p>
    </div>
    {children}
  </div>
)

export default WindowBox
