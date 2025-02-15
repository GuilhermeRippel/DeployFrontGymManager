import ImageGalery from "../components/Formulario/ImageGalery";
import LogoTipo from "../assets/img/LogoTipo_GymManager.png";
import HamburguerIcon from "../assets/icons/MenuHamburguer_Icon.svg";
import OptionButton from "../components/MenuOpcoes/OptionButton";
import MenuLateralPerfil from "../components/MenuLateral/MenuLateralPerfil";
import { useState } from "react";

function MainAplication() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const handleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
    setIsFirstLoad(false)
  };

  return (
    <div className="w-full h-screen max-h-screen">
      <header className="w-full h-[10%] flex items-center justify-between px-10 relative bg-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <img src={LogoTipo} alt="Logo GymManager" className="w-10 h-12" />
          </div>
          <h1 className="font-montserrat font-bold text-4xl">GymManager</h1>
        </div>
        <div className="relative z-10">
          <img
            onClick={handleMenu}
            src={HamburguerIcon}
            alt="Ícone de hamburguer para abrir menu lateral"
            className="w-10 h-10 cursor-pointer hover:scale-105 hover:rotate-180 transition-all duration-300"
          />
          {isOpenMenu ? (
            <div className={`absolute right-0 mt-2 animate-ShowMenu`}>
              <MenuLateralPerfil />
            </div>
          ) : (
            <div className={`absolute right-0 mt-2 ${isFirstLoad ? 'hidden' : 'animate-HiddenMenu'}`}>
              <MenuLateralPerfil />
            </div>
          )}
        </div>
      </header>

      <div className="w-full h-[60%] py-2 flex items-center justify-center shadow-inner-lg bg-gray-600">
        <ImageGalery style="w-3/4 h-full object-cover rounded-xl shadow-lg"></ImageGalery>
      </div>

      <div className="w-full h-[30%] flex items-center justify-around bg-gray-200">
        <OptionButton title="Minhas Máquinas" route="/MeusAparelhos"></OptionButton>
        <OptionButton title="Funcionários/Turnos" route="/MeusFuncionarios"></OptionButton>
        <OptionButton title="Alunos/Turnos" route="/MeusAlunos"></OptionButton>
      </div>
    </div>
  );
}

export default MainAplication;
