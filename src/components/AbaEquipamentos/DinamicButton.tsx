interface Props {
    title: string;
    width: string;
    height?: string;
    textSize?: string;
    isBold?: string;
    haveIcon: boolean;
    imageIcon?: string;
    color: string
    onClick?: VoidFunction
  }
  
  function DinamicButton({ title, width, textSize, isBold, haveIcon, imageIcon, color, onClick, height }: Props) {
    return (
      <div
        onClick={onClick}
        className={`group w-${width} text-${textSize} h-${height ? height : 'full'} bg-white border-2 border-${color} text-${color} hover:bg-${color} hover:text-white 
        hover:scale-105 transition-all duration-300 py-3 px-4 rounded-md flex items-center justify-center cursor-pointer ${isBold}`}
      >
        {title}
        {haveIcon && <img src={imageIcon} alt="Ícone do botão" className="ml-2 group-hover:animate-RightToLeft"/>}
      </div>
    );
  }
  
  export default DinamicButton;
  