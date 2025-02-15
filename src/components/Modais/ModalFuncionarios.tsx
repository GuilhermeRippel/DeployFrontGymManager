import InputForms from "../Formulario/InputForms";
import { toast, ToastContainer } from "react-toastify";
import DinamicButton from "../AbaEquipamentos/DinamicButton";
import AddIcon from "../../assets/icons/AddIcon.svg";
import ArrowBack from "../../assets/icons/ArrowBackIcon.svg";
import { useEffect, useRef } from "react";
import { toastConfig } from "../../utils/toastConfig";
import api from "../../services/api";

interface propsModal {
  onClose: VoidFunction;
  refreshEquipament: () => void;
  elementEdit:
    | {
        id: number
        nomeFuncionario: string;
        funcao: string;
        turno: string;
      }
    | undefined;
}

function ModalFuncionarios({ onClose, refreshEquipament, elementEdit,}: propsModal) {
  const nomeFuncionario = useRef<HTMLInputElement>(null);
  const funcaoFuncionario = useRef<HTMLInputElement>(null);
  const turnoFuncionario = useRef<HTMLSelectElement>(null);

  const tryRegisterFuncionario = async (elementEdit: propsModal['elementEdit']) => {
    const nome = nomeFuncionario.current?.value;
    const funcao = funcaoFuncionario.current?.value;
    const turno = turnoFuncionario.current?.value;

    if (!nome || !funcao || !turno) {
      toast.error("Preencha todos os campos", toastConfig);
      return;
    }

    const token = localStorage.getItem("jwtToken");

    if (elementEdit) {
      try {
        await api.put(`/atualizarFuncionario/Atualizar/${elementEdit.id}`, {
          nomeFuncionario: nome,
          funcao: funcao,
          turno: turno,
        },
      {
        headers:{
          Authorization: token
        }
      })
      onClose();
      refreshEquipament();
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const response = await api.post("/cadastroFuncionario/cadastro",
          {
            nomeFuncionario: nome,
            turno: turno,
            funcao: funcao,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        onClose();
        refreshEquipament();
        console.log(response);
        toast.success("Funcionário cadastrado com sucesso", toastConfig);
      } catch (error) {
        console.log(error);
        toast.error("Erro interno do servidor", toastConfig);
      }
    }
  };

  useEffect(() => {
    if(elementEdit){
      if(nomeFuncionario.current) nomeFuncionario.current.value = elementEdit.nomeFuncionario
      if(turnoFuncionario.current) turnoFuncionario.current.value = elementEdit.turno
      if(funcaoFuncionario.current) funcaoFuncionario.current.value = elementEdit.funcao
    }
  },[elementEdit])

  return (
    <div className="fixed inset-0 flex items-center justify-center font-montserrat">
      <div className="absolute inset-0 bg-black opacity-65"></div>
      <div className="absolute w-2/3 h-[70%] bg-green-700 rounded-lg transform -translate-x-4 -translate-y-4 z-10"></div>
      <ToastContainer />
      <div className="relative w-2/3 h-[70%] bg-white z-10 rounded-lg shadow-lg p-6 flex flex-col items-center justify-around">
        <form className="border border-gray-500 p-8 rounded-lg flex flex-col items-center justify-around w-[90%] h-[50%] shadow-md">
          <h1 className="text-center text-3xl font-bold">
            Cadastro de novo funcionário
          </h1>
          <div className="flex flex-col gap-5 w-2/4">
            <InputForms
              type="text"
              placeholder="Digite o nome do funcionário"
              label="Nome"
              lenght={30}
              ref={nomeFuncionario}
            />
            <InputForms
              type="text"
              placeholder="Digite a função do funcionário"
              label="Função"
              lenght={30}
              ref={funcaoFuncionario}
            />
            <div className="flex items-center justify-end">
              <label className="font-bold mr-2">Turno:</label>
              <select
                className="border border-green-700 rounded-md py-2 px-4 outline-none w-[70%]"
                id="status"
                ref={turnoFuncionario}
              >
                <option value="">Selecione um turno</option>
                <option value="Noite">Noite</option>
                <option value="Manhã">Manhã</option>
              </select>
            </div>
          </div>
        </form>
        <div className="w-full h-20 flex justify-around">
          <DinamicButton
            title="Fechar"
            width="1/3"
            color="red-600"
            haveIcon={true}
            imageIcon={ArrowBack}
            isBold="font-bold"
            onClick={onClose}
            textSize="lg"
          />
          <DinamicButton
            title="Salvar"
            width="1/3"
            color="green-700"
            haveIcon={true}
            imageIcon={AddIcon}
            isBold="font-bold"
            textSize="lg"
            onClick={() => tryRegisterFuncionario(elementEdit)}
          />
        </div>
      </div>
    </div>
  );
}

export default ModalFuncionarios;
