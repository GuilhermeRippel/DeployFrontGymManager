import { Link } from 'react-router-dom'
import {useState, useEffect} from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { toastConfig } from '../utils/toastConfig'
import api from '../services/api'
import GraficoAlunoXCapacidade from '../components/Graficos/GraficoAlunoXCapacidade'
import GraficoAlunoXMaquinas from '../components/Graficos/GraficoAlunosXMaquinas'
import GraficoAlunoNoiteXFuncNoite from '../components/Graficos/GraficoAlunoNoiteXFuncNoite'
import GraficoAlunoManhaXFuncManha from '../components/Graficos/GraficoAlunoManhaXFuncManha'
import  PersonIcon from '../assets/icons/PersonIconGG.svg';

interface profileInformations {
  nomeResp: string
  nomeAcad: string
  endereco: string
  telefone: string
}

function PerfilUsuario() {
  const [profileInformations, setProfileInformations] = useState<profileInformations>()

  const getProfileInformations = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
    
      const responses = await api.get("/gymProfile/gymProfileData", {
        headers: { Authorization: token } })
    

      console.log(responses)

    setProfileInformations(responses.data);
    } catch (error) {
      console.log(error)
      toast.error("Erro ao gerar informações do usuário", toastConfig)
    }
  }

  useEffect(() => {
    getProfileInformations()
  }, [])

  return (
    <div className="w-full h-screen px-10 py-12 bg-gray-800 flex flex-col items-center justify-center shadow-inner-lg font-montserrat">
      <ToastContainer/>
      <main className="w-full h-full bg-white rounded-lg shadow-xl flex py-5 border-2 border-green-700">
        <div className="w-1/3 h-full border-r border-gray-300 flex flex-col justify-center items-center gap-10">
        <h1 className='text-2xl font-bold w-2/3 text-center'>Bem vindo ao seu perfil {profileInformations?.nomeResp}</h1>
          <div className="relative rounded-full w-72 h-72 flex items-center justify-center animate-RotateY">
             <img src={PersonIcon} alt="Icone de usuário" className='w-full'/>
          </div>
          <div className='flex flex-col gap-3'>
            <h1 className="text-2xl font-bold">Academia: {profileInformations?.nomeAcad}</h1>
            <h2 className="text-lg text-gray-500">Endereço: {profileInformations?.endereco}</h2>
            <h2 className="text-lg text-gray-500">Telefone: {profileInformations?.telefone}</h2>
          </div>
        </div>
        <div className="w-2/3 h-full flex flex-col items-center justify-around">
              <div className="flex w-full justify-around shadow-lg">
                <GraficoAlunoXCapacidade/>
                <GraficoAlunoXMaquinas/>
              </div>
              <div className="flex w-full justify-around shadow-lg">
                <GraficoAlunoNoiteXFuncNoite/>
                <GraficoAlunoManhaXFuncManha/>
              </div>
            </div>
      </main>
        <Link to="/main" className='w-[95%] h-16 left-2 bottom-1 border-2 border-green-700 bg-white mt-2 shadow-xl rounded-lg text-2xl text-green-700 font-bold flex items-center justify-center hover:bg-green-700 hover:text-white hover:sacale-105 transition-all duration-300'>Voltar</Link>
    </div>
  )
}

export default PerfilUsuario