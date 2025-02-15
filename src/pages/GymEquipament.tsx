import DinamicButton from "../components/AbaEquipamentos/DinamicButton";
import TrashRed from "../assets/icons/TrashIconRed.svg";
import TrashWhite from "../assets/icons/TrashIconWhite.svg";
import ArrowBack from "../assets/icons/ArrowBackIcon.svg";
import AddIcon from "../assets/icons/AddIcon.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalEquipaments from "../components/Modais/ModalEquipaments";
import api from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import { toastConfig } from "../utils/toastConfig";
import EditIconBlue from '../assets/icons/EditIconBlue.svg'
import EditIconWhite from '../assets/icons/EditIconWhite.svg'
 
interface aparelho {
  id: number;
  nomeAparelho: string;
  fabricante: string;
  statusAparelho: string;
  avatar: string
}

function GymEquipament() {
  const [toggleTrash, setToggleTrash] = useState<number | null>(null)
  const [toggleEdit, setToggleEdit] = useState<number | null>(null)
  const [toggleModal, setToggleModal] = useState(false)
  const [equipaments, setEquipaments] = useState<aparelho[]>([])
  const [elementEdit, setElementEdit] = useState<aparelho | undefined>(undefined)
  const navigate = useNavigate();

  const toggleModalFunction = () => {
    setToggleModal(!toggleModal);
  };

  const listEquipaments = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const getEquipaments = await api.get("/listarAparelho/Listar", {
        headers: {
          Authorization: token,
        },
      });

      setEquipaments(getEquipaments.data.getAparelhos);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEquipament = async (id: number) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const deleteResponse = await api.delete(`/deletarAparelho/Delete/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      if (deleteResponse) {
        listEquipaments();
        toast.success("Equipamento deletado", toastConfig);
      } else {
        toast.error("Erro ao deletar equipamento", toastConfig);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterMaintenance = async () => {
    try {
        const token = localStorage.getItem("jwtToken")
        const maintenance = await api.get("/listarAparelho/ListarManutencao", {
            headers: {
                Authorization: token
            }
        })
        setEquipaments(maintenance.data.getAparelhos)
    } catch (error) {
        console.log(error)
        toast.error("Erro ao filtrar por Em Manutenção", toastConfig)
    }
  }

  const filterFunctional = async () => {
    try {
        const token = localStorage.getItem("jwtToken")
        const maintenance = await api.get("/listarAparelho/ListarFuncional", {
            headers: {
                Authorization: token
            }
        })
        setEquipaments(maintenance.data.getAparelhos)
    } catch (error) {
        console.log(error)
        toast.error("Erro ao filtrar por Funcional", toastConfig)
    }
  }

  const editEquipament = () => {
    toggleModalFunction()
  }

  useEffect(() => {
    listEquipaments();
  }, []);

  return (
    <div className="w-full h-screen px-10 py-12 bg-gray-800 flex flex-col items-center justify-center shadow-inner-lg font-montserrat">
      <ToastContainer />
      <main className="w-full h-full bg-white rounded-lg shadow-xl py-5 px-4 border-2 border-green-700 flex flex-col justify-between">
        <div className="w-full h-[9%]  flex items-center px-10 gap-10 py-3 rounded-lg shadow-xl border-2 border-black">
          <DinamicButton width="1/8" title="Filtrar por: Em Manutenção" haveIcon={false} color="green-700" onClick={filterMaintenance}/>
          <DinamicButton width="1/8" title="Filtrar por: Funcional" haveIcon={false} color="green-700" onClick={filterFunctional}/>
          <DinamicButton width="1/8" title="Remover Filtros" haveIcon={false} color="red-600" onClick={listEquipaments}/>
        </div>
        <div className="w-full h-[78%] bg-gray-600 border-2 border-black shadow-md overflow-y-scroll px-5 py-3 grid grid-cols-3 grid-auto-rows-[1fr] gap-2">
          {equipaments.length > 0
            ? equipaments.map((equipament, index) => (
                <div key={index} className="w-full h-[500px] bg-white rounded-lg shadow-md flex flex-col justify-center px-10 items-center">
                  <div className="w-full h-[60%] flex items-center justify-center">
                    <img src={`http://localhost:3002${equipament.avatar}`} alt="Imagem do equipamento" className="w-full h-full object-contain text-center"/>
                  </div>
                  <div className="w-full h-[20%] bg-gray-200">
                    <h1> <span className="text-lg font-bold">Nome:</span> {equipament.nomeAparelho}</h1>
                    <h2> <span className="text-lg font-bold">Fabricante da Máquina:</span>{equipament.fabricante}</h2>
                    <h2> <span className="text-lg font-bold">Status:</span> {equipament.statusAparelho}</h2>
                  </div>
                  <div className="w-full flex gap-2 px-2">
                    <button onClick={() => deleteEquipament(equipament.id)} onMouseEnter={() => setToggleTrash(equipament.id)} onMouseLeave={() => setToggleTrash(null)} className="border-2 px-1 py-1 border-red-600 hover:bg-red-600 hover:scale-110 transition-all duration-300 rounded-md w-full flex items-center justify-center">
                      <img src={toggleTrash === equipament.id ? TrashWhite : TrashRed } alt="Ícone de Lixeira"/>
                    </button>
                    <button onClick={() => {setElementEdit(equipament); editEquipament()}} onMouseEnter={() => setToggleEdit(equipament.id)} onMouseLeave={() => setToggleEdit(null)} className="border-2 px-1 py-1 border-blue-600 hover:bg-blue-600 hover:scale-110 transition-all duration-300 rounded-md w-full flex items-center justify-center">
                        <img src={toggleEdit === equipament.id ? EditIconWhite : EditIconBlue} alt="Ícone de Edição" />
                    </button>
                  </div>
                </div>
              )) : <p className="font-bold text-xl text-gray-400 w-full h-full flex items-center justify-center text-center">Sem equipamentos para listar...</p>}
        </div>
        <div className="w-full h-[9%] flex justify-around">
          <DinamicButton title="voltar" width="1/3" textSize="2xl" isBold="font-bold" haveIcon={true} imageIcon={ArrowBack} onClick={() => {navigate("/main");}}color="red-600"/>
          <DinamicButton title="Nova Máquina" width="1/3" textSize="2xl" isBold="font-bold" haveIcon={true} imageIcon={AddIcon} onClick={toggleModalFunction} color="green-700"/>
        </div>
      </main>
      {toggleModal && (<ModalEquipaments onClose={toggleModalFunction} refreshEquipaments={listEquipaments} elementEdit={elementEdit}/>)}
    </div>
  );
}

export default GymEquipament;
