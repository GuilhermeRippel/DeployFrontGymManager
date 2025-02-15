interface Title {
    title: string
    imageIcon: string
}

function OptionMenu({title, imageIcon}: Title) {
  return (
    <li className="w-full h-10 border-b border-gray-500 hover:bg-gray-200 flex items-center justify-center cursor-pointer gap-1">{title} <img src={imageIcon} alt="Ícone" /></li>
    
  )
}

export default OptionMenu