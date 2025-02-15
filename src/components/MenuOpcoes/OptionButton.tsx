import { Link } from "react-router-dom"

interface Props {
    title: string
    route: string
}

function OptionButton({title, route}: Props) {
  return (
        <Link className="flex items-center justify-center h-[80%] w-[30%] bg-white shadow-xl border-2 border-green-700 rounded-lg cursor-pointer hover:text-white hover:bg-green-700 hover:scale-105 transition-all duration-300" to={route}>
          <h1 className="text-4xl font-bold">{title}</h1>
      </Link>
  )
}

export default OptionButton