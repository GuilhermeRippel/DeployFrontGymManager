interface Information {
    title: string
    value: string | number
    icon: string
  }

function InformationItem({title, value, icon}: Information) {
  return (
    <div className="flex items-center">
      <p className="text-lg"><span className="text-lg font-bold mr-1">{title}</span></p>
      <img src={icon} alt="Ícone" />
      <span className="font-bold text-lg mr-1">:</span>
      {value}
    </div>
  )
}

export default InformationItem