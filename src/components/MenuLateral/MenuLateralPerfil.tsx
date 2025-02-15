import OptionMenu from "./OptionMenu"
import PerfilIcon from '../../assets/icons/PerfilIcon.svg'
import ConfigIcon from '../../assets/icons/ConfigIcon.svg'
import LogouIcon from '../../assets/icons/LogoutIcon.svg'
import { Link } from "react-router-dom"

function MenuLateralPerfil() {
  const removeToken = () => {
    localStorage.removeItem("jwtToken")
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg w-48 border-2 border-green-700`}>
        <ul className="flex flex-col items-center justify-center px-4 py-4 w-full gap-5">
            <Link to="/PerfilUsuario" className="w-full"><OptionMenu title="Meu Perfil" imageIcon={PerfilIcon}/></Link>
            <Link to="/ConfigurarPerfilUsuario" className="w-full"><OptionMenu title="Configurar Perfil" imageIcon={ConfigIcon}/></Link>
            <Link to="/" className="w-full" onClick={removeToken}><OptionMenu title="Desconectar" imageIcon={LogouIcon}/></Link>
        </ul>
    </div>
  )
}

export default MenuLateralPerfil