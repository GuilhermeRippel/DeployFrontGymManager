interface children {
    textButton: string
    onClick?: (e: React.MouseEvent) => void
}

function ConfirmButton({textButton, onClick}: children) {
  return (
    <button onClick={onClick} className="w-full py-3 bg-white border-2 text-black border-green-700 rounded-lg hover:shadow-lg hover:bg-green-700 hover:text-white text-2xl font-bold hover:scale-105 transition-all duration-300">{textButton}</button>
  )
}

export default ConfirmButton