import InputForms from "../Formulario/InputForms";
import DinamicButton from "../AbaEquipamentos/DinamicButton";
import ArrowBack from '../../assets/icons/ArrowBackIcon.svg'
import AddIcon from '../../assets/icons/AddIcon.svg'
import { useRef, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import api from "../../services/api";
import { toastConfig } from "../../utils/toastConfig";

interface FunctionModal {
    onClose: VoidFunction
    refreshEquipaments: () => void
    elementEdit: {
      id: number;
      nomeAparelho: string;
      fabricante: string;
      statusAparelho: string;
    } | undefined
}

function ModalEquipaments({onClose, refreshEquipaments, elementEdit}: FunctionModal) {
    const nome = useRef<HTMLInputElement>(null)
    const fabricante = useRef<HTMLInputElement>(null)
    const imagemMaquina = useRef<HTMLInputElement>(null)
    const status = useRef<HTMLSelectElement>(null)

    
    const tryRegisterEquipament = async (elementEdit: FunctionModal["elementEdit"]) => {
      const nomeMaquina = nome.current?.value;
      const nomeFabricante = fabricante.current?.value;
      const statusMaquina = status.current?.value;
      const file = imagemMaquina.current?.files?.[0];

      if (!nomeMaquina || !nomeFabricante || !statusMaquina) {
          toast.error("Preencha todos os campos", toastConfig);
          return;
      }

      if (!file) {
          toast.error("Imagem não selecionada", toastConfig);
          return;
      }

      const formData = new FormData()
      formData.append("nomeAparelho", nomeMaquina);
      formData.append("statusAparelho", statusMaquina);
      formData.append("fabricante", nomeFabricante);
      formData.append("avatar", file)

      

      try {
        const token = localStorage.getItem("jwtToken");
        
        if (elementEdit) {

          await api.put(`/atualizarAparelho/Atualizar/${elementEdit.id}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
          toast.success("Aparelho atualizado com sucesso!", toastConfig);
        } else {
          await api.post("/aparelhoCadastro/Cadastro", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
          toast.success("Aparelho cadastrado com sucesso!", toastConfig);
        }
    
        onClose();
        refreshEquipaments();
      } catch (error) {
        console.error(error);
        toast.error("Erro interno do servidor, tente novamente mais tarde", toastConfig);
      }
    };

    useEffect(() => {
      if(elementEdit){
        if(nome.current) nome.current.value = elementEdit.nomeAparelho
        if(fabricante.current)fabricante.current.value = elementEdit.fabricante
        if(status.current)status.current.value = elementEdit.fabricante
      }
    }, [elementEdit])
    

    return (
      <div className="fixed inset-0 flex items-center justify-center font-montserrat">
        <div className="absolute inset-0 bg-black opacity-65"></div>
        <div className="absolute w-2/3 h-[70%] bg-green-700 rounded-lg transform -translate-x-4 -translate-y-4 z-10"></div>
        <ToastContainer />
        <div className="relative w-2/3 h-[70%] bg-white z-10 rounded-lg shadow-lg p-6 flex flex-col items-center justify-around">
          <form className="border border-gray-500 p-8 rounded-lg flex flex-col items-center justify-around w-[90%] h-[50%] shadow-md" encType="multipart/form-data">
            <h1 className="text-center text-3xl font-bold">{elementEdit ? "Editar Máquina" : "Cadastro de nova Máquina"}</h1>
            <div className="flex flex-col gap-5 w-1/3">
                <InputForms type="text" placeholder="Digite o nome da máquina" label="Nome" ref={nome} lenght={30}/>
                <InputForms type="text" placeholder="Digite o nome da fabricante" label="Fabricante" ref={fabricante} lenght={25}/>
                <div className="flex items-center justify-end">
                    <label className="font-bold mr-2">Status:</label>
                    <select  className="border border-green-700 rounded-md py-2 px-4 outline-none w-[70%]" id="status" ref={status}>
                      <option value="">Selecione um status</option>
                      <option value="Funcional">Funcional</option>
                      <option value="Manutenção">Manutenção</option>
                    </select>
                </div>
                <InputForms type="file" placeholder="" label="Imagem" ref={imagemMaquina} configFile="text-transparent file:text-black text-center w-1/2"/>
            </div>
          </form>
          <div className="w-full h-20 flex justify-around">
              <DinamicButton title="Fechar" width="1/3" color="red-600" haveIcon={true} imageIcon={ArrowBack} isBold="font-bold" onClick={onClose} textSize="lg"/>
              <DinamicButton title="Salvar" width="1/3" color="green-700" haveIcon={true} imageIcon={AddIcon} isBold="font-bold" textSize="lg" onClick={() => tryRegisterEquipament(elementEdit)}/>
          </div>
        </div>
      </div>
    );
  }
  
  export default ModalEquipaments;
  