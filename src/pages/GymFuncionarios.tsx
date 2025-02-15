import DinamicButton from "../components/AbaEquipamentos/DinamicButton";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ArrowBack from '../assets/icons/ArrowBackIcon.svg'
import AddIcon from '../assets/icons/AddIcon.svg'
import { useState, useEffect } from "react";
import ModalFuncionarios from "../components/Modais/ModalFuncionarios";
import { toastConfig } from "../utils/toastConfig";
import api from "../services/api";
import TrashWhite from '../assets/icons/TrashIconWhite.svg'
import TrashRed from '../assets/icons/TrashIconRed.svg'
import UserGenericIcon from '../assets/icons/UserGenericIcon.svg'
import EditIconBlue from '../assets/icons/EditIconBlue.svg'
import EditIconWhite from '../assets/icons/EditIconWhite.svg'

interface Funcionario {
  id: number
  nomeFuncionario: string
  funcao: string
  turno: string
}

function GymFuncionarios() {
  const navigate = useNavigate()
  const [toggleTrash, setToggleTrash] = useState<number | null>(null)
  const [toggleEdit, setToggleEdit] = useState<number | null>(null)
  const [elementEdit, setElementEdit] = useState<Funcionario | undefined>(undefined)
  const [toggleModal, setToggleModal] = useState(false)
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])

  const toggleModalFunction = () => {
    setToggleModal(!toggleModal);
  };

  const listFuncionarios = async () => {
    try {
      const token = localStorage.getItem("jwtToken")
      const funcionarios = await api.get("/listarFuncionario/Listar", {
        headers: {
          Authorization: token
        }
      })
      console.log(funcionarios.data)
      setFuncionarios(funcionarios.data.response)
    } catch (error) {
      console.log(error)
      toast.error("Erro interno no servidor", toastConfig)
    }
  }

  const deleteFuncionario = async (id: number) => {
    try {
      const token = localStorage.getItem("jwtToken")
      const response = await api.delete(`/DeletarFuncionario/Deletar/${id}`, {
        headers: {
          Authorization: token
        }
      })
      console.log(response)
      listFuncionarios()
    } catch (error) {
      console.log(error)
      toast.error("Erro ao deletar funcionário", toastConfig)
    }
  }

  const filterFuncionarioNoite = async () => {
    try {
      const token = localStorage.getItem("jwtToken")
      const funcionariosNoite = await api.get("/listarFuncionario/ListarNoite", {
        headers: {
          Authorization: token
        }
      })

      setFuncionarios(funcionariosNoite.data.response)
    } catch (error) {
      console.log(error)
      toast.error("Erro interno no servidor", toastConfig)
    }
  }

  const filterFuncionarioManha = async () => {
    try {
      const token = localStorage.getItem("jwtToken")
      const funcionariosManha = await api.get("/listarFuncionario/ListarManha", {
        headers: {
          Authorization: token
        }
      })

      setFuncionarios(funcionariosManha.data.response)
    } catch (error) {
      console.log(error)
      toast.error("Erro interno no servidor", toastConfig)
    }
  }

  const editFuncionario = () => {
    toggleModalFunction()
  }

  useEffect(() => {
    listFuncionarios()
  }, [])
  

  return (
    <div className="w-full h-screen px-10 py-12 bg-gray-800 flex flex-col items-center justify-center shadow-inner-lg font-montserrat">
      <ToastContainer />
      <main className="w-full h-full bg-white rounded-lg shadow-xl py-5 px-4 border-2 border-green-700 flex flex-col justify-between">
        <div className="w-full h-[9%]  flex items-center px-10 gap-10 py-3 rounded-lg shadow-xl border-2 border-black">
          <DinamicButton width="1/8" title="Filtrar por: Turno Noite" haveIcon={false} color="green-700" onClick={filterFuncionarioNoite}/>
          <DinamicButton width="1/8" title="Filtrar por: Turno Manhã" haveIcon={false} color="green-700" onClick={filterFuncionarioManha}/>
          <DinamicButton width="1/8" title="Remover Filtros" haveIcon={false} color="red-600" onClick={listFuncionarios}/>
        </div>
        <div className="w-full h-[78%] bg-gray-600 border-2 border-black shadow-md overflow-y-scroll px-5 py-3 flex flex-col gap-4">
            {funcionarios.length > 0 ? 
              funcionarios.map((funcionario, index) => (
                <div key={index} className="w-full bg-white h-20 rounded-lg shadow-md flex justify-between px-10 items-center">
                    <img src={UserGenericIcon} alt="Ícone genérico de usuário" className="w-16 mr-20"/>
                  <div className="w-full flex">
                    <div className="flex justify-around w-2/3 px-10 items-center border-l-2 border-black">
                      <h1> <span className="text-lg font-bold">Nome:</span> {funcionario.nomeFuncionario}</h1>
                      <h2> <span className="text-lg font-bold">Função:</span>{funcionario.funcao}</h2>
                      <h2> <span className="text-lg font-bold">Turno:</span> {funcionario.turno}</h2>
                    </div>
                    <div className="flex justify-around w-1/3">
                      <button onClick={() => deleteFuncionario(funcionario.id)} onMouseEnter={() => setToggleTrash(funcionario.id)} onMouseLeave={() => setToggleTrash(null)} className="border-2 px-1 py-1 border-red-600 hover:bg-red-600 hover:scale-110 transition-all duration-300 rounded-md flex items-center justify-center w-1/3">
                        <img src={toggleTrash === funcionario.id ? TrashWhite : TrashRed } alt="Ícone de Lixeira"/>
                      </button>
                      <button onClick={() => {editFuncionario(); setElementEdit(funcionario)}} onMouseEnter={() => setToggleEdit(funcionario.id)} onMouseLeave={() => setToggleEdit(null)} className="border-2 px-1 py-1 border-blue-600 hover:bg-blue-600 hover:scale-110 transition-all duration-300 rounded-md flex items-center justify-center w-1/3">
                        <img src={toggleEdit === funcionario.id ? EditIconWhite : EditIconBlue} alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              )) : <p className="text-center font-bold text-xl text-gray-400 w-full h-full flex items-center justify-center">Não existem funcionários para listar.</p> 
          }
        </div>
        <div className="w-full h-[9%] flex justify-around">
          <DinamicButton title="voltar" width="1/3" textSize="2xl" isBold="font-bold" haveIcon={true} imageIcon={ArrowBack} onClick={() => {navigate("/main");}} color="red-600"/>
          <DinamicButton title="Novo Funcionário" width="1/3" textSize="2xl" isBold="font-bold" haveIcon={true} imageIcon={AddIcon} onClick={toggleModalFunction} color="green-700"/>
        </div>
      </main>
      {toggleModal && (<ModalFuncionarios onClose={toggleModalFunction} refreshEquipament={listFuncionarios} elementEdit={elementEdit}/>)}
    </div>
  );
}

export default GymFuncionarios