import { toast, ToastContainer } from "react-toastify"
import DinamicButton from "../components/AbaEquipamentos/DinamicButton"
import { useNavigate } from "react-router-dom";
import ArrowBack from '../assets/icons/ArrowBackIcon.svg'
import AddIcon from '../assets/icons/AddIcon.svg'
import { useEffect, useState } from "react";
import ModalAlunos from "../components/Modais/ModalAlunos";
import api from "../services/api";
import { toastConfig } from "../utils/toastConfig";

interface Alunos {
  id: number
  nomeAluno: string
  cpf: string
  email: string
  telefone: string
  turno: string
  idade: string
}

function GymAlunos() {
  const navigate = useNavigate()
  const [toggleModal, setToggleModal] = useState(false)
  const [getAlunos, setGetAlunos] = useState<Alunos []>([])
  const [elementEdit, setElementEdit] = useState<Alunos | undefined>(undefined)

  const toggleModalFunction = () => {
    setToggleModal(!toggleModal)
  }

  const listAlunos = async () => {
    try {
      const token = localStorage.getItem("jwtToken")
      const informationAlunos = await api.get("/alunosData/Data", {
        headers: {
          Authorization: token
        }
      })

      setGetAlunos(informationAlunos.data.consultaAlunos)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteAluno = async (id: number) => {

    try {
      const token = localStorage.getItem("jwtToken")
      const tryDelete = await api.delete(`/alunoDelete/Delete/${id}`, {
        headers: {
          Authorization: token
        }
      })

      if(tryDelete){
        toast.success("Aluno deletado", toastConfig)
        listAlunos()
      } else {
        toast.error("Erro ao deletar aluno", toastConfig)
      }
    } catch (error) {
      console.log(error)
      toast.error("Erro ao deletar aluno", toastConfig)
    }
  }

  const listAlunosManha = async () => {
    try {
      const token = localStorage.getItem('jwtToken')
      const informationAlunosManha = await api.get("/alunosData/DataManha", {
        headers: {
          Authorization: token
        }
      })

      setGetAlunos(informationAlunosManha.data.consultaAlunos)
    } catch (error) {
      console.log(error)
    }
  }

  const listAlunosNoite = async () => {
    try {
      const token = localStorage.getItem('jwtToken')
      const informationAlunosNoite = await api.get("/alunosData/DataNoite", {
        headers: {
          Authorization: token
        }
      })

      setGetAlunos(informationAlunosNoite.data.consultaAlunos)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    listAlunos()
  },[])

  return (
    <div className="w-full h-screen px-10 py-12 bg-gray-900 flex flex-col items-center justify-center shadow-inner-lg font-montserrat">
      <ToastContainer/>
      <main className="w-full h-full bg-white rounded-lg shadow-xl py-5 px-4 border-2 border-green-700 flex flex-col justify-between">
      <div className="w-full h-[9%]  flex items-center px-10 gap-10 py-3 rounded-lg shadow-xl border-2 border-black">
          <DinamicButton width="1/8" title="Filtrar por: Manhã" haveIcon={false} color="green-700" onClick={listAlunosManha}/>
          <DinamicButton width="1/8" title="Filtrar por: Noite" haveIcon={false} color="green-700" onClick={listAlunosNoite}/>
          <DinamicButton width="1/8" title="Remover Filtros" haveIcon={false} color="red-600" onClick={listAlunos}/>
        </div>
        <div className="w-full h-[78%] bg-gray-700 border-2 border-black shadow-md overflow-y-scroll px-5 py-3 grid grid-cols-3 grid-auto-rows-[1fr] justify-items-center gap-2">
          {getAlunos.length > 0 ? 
            getAlunos.map((aluno, index) =>
          <div key={index} className="w-3/4 h-[300px] bg-white shadow-xl rounded-md py-1 px-5 flex flex-col justify-around">
             <h1 className="text-xl font-bold text-center max-w-2/3 border-b-2 border-black">{aluno.nomeAluno}</h1>
             <div className="w-full bg-gray-300 text-center px-2 py-2 rounded-lg">
                <h2 className=""><span className="font-bold">Email:</span>{aluno.email}</h2>
                <h2 className=""><span className="font-bold">CPF:</span>{aluno.cpf}</h2>
                <h2 className=""><span className="font-bold">Idade:</span>{aluno.idade} Anos</h2>
                <h2 className=""><span className="font-bold">Telefone:</span>{aluno.telefone}</h2>
                <h2 className=""><span className="font-bold">Turno:</span>{aluno.turno}</h2>
             </div>
             <div className="w-full flex justify-around">
               <div onClick={() => {deleteAluno(aluno.id)}} className="w-[40%] border-2 px-1 py-1 border-red-600 hover:bg-red-600 hover:scale-110 transition-all duration-300 rounded-md flex items-center justify-center font-bold text-red-600 hover:text-white cursor-pointer">Excluir</div>
               <div onClick={() => {toggleModalFunction(); setElementEdit(aluno)}} className="w-[40%] border-2 px-1 py-1 border-blue-500 hover:bg-blue-500 hover:scale-110 transition-all duration-300 rounded-md flex items-center justify-center text-blue-500 hover:text-white font-bold cursor-pointer">Editar</div>
             </div>
          </div>
            ): <p className="text-center font-bold text-xl text-gray-400 w-full h-full flex items-center justify-center">Sem alunos para listar...</p>}
        </div>
        <div className="w-full h-[9%] flex justify-around">
          <DinamicButton title="voltar" width="1/3" textSize="2xl" isBold="font-bold" haveIcon={true} imageIcon={ArrowBack} onClick={() => {navigate("/main");}}color="red-600"/>
          <DinamicButton title="Novo Aluno" width="1/3" textSize="2xl" isBold="font-bold" haveIcon={true} imageIcon={AddIcon} onClick={toggleModalFunction} color="green-700"/>
        </div>
      </main>
      {toggleModal && <ModalAlunos onClose={toggleModalFunction} listAlunos={listAlunos} elementEdit={elementEdit}/>}
    </div>
  )
}

export default GymAlunos