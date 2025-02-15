import InputForms from "../Formulario/InputForms";
import { toast, ToastContainer } from "react-toastify";
import DinamicButton from "../AbaEquipamentos/DinamicButton";
import AddIcon from '../../assets/icons/AddIcon.svg'
import ArrowBack from '../../assets/icons/ArrowBackIcon.svg'
import { useEffect, useRef } from "react";
import { toastConfig } from "../../utils/toastConfig";
import api from "../../services/api";


interface PropsModal {
    onClose: VoidFunction
    listAlunos: () => void
    elementEdit: {
      id: number
      nomeAluno: string
      idade: string
      email: string
      cpf: string
      turno: string
      telefone: string
    } | undefined
}

function ModalAlunos({onClose, listAlunos, elementEdit}: PropsModal) {
  const nomeAluno = useRef<HTMLInputElement>(null)
  const cpfAluno = useRef<HTMLInputElement>(null)
  const idadeAluno = useRef<HTMLInputElement>(null)
  const emailAluno = useRef<HTMLInputElement>(null)
  const telefoneAluno = useRef<HTMLInputElement>(null)
  const turnoAluno = useRef<HTMLSelectElement>(null)

  const registerGymMember = async (elementEdit: PropsModal['elementEdit']) => {
    const nome = nomeAluno.current?.value
    const cpf = cpfAluno.current?.value
    const turno = turnoAluno.current?.value
    const idade = idadeAluno.current?.value
    const email = emailAluno.current?.value
    const telefone = telefoneAluno.current?.value


    try {
      const token = localStorage.getItem("jwtToken")

      if(elementEdit){
        await api.put(`/atualizarAluno/Atualizar/${elementEdit.id}`,{
            nomeAluno: nome,
            idade: idade,
            turno: turno,
            cpf: cpf,
            email: email,
            telefone: telefone,
        },
      {
        headers: {
          Authorization: token
        }
      })
      toast.success("Aluno Atualizado!", toastConfig)
      } else {
      const response = await api.post("/alunoCadastro/Cadastro", {
        nomeAluno: nome,
        cpf: cpf,
        turno: turno,
        idade: idade,
        email: email,
        telefone: telefone,
      },
      {
        headers: {
          Authorization: token
        }
      })
      toast.success("Aluno Cadastrado!", toastConfig)
      console.log(response)
      }     
    } catch (error) {
      console.log(error)
      toast.error("Erro ao cadastrar aluno", toastConfig)
    } finally{
      onClose()
      listAlunos()
    }
  }

  useEffect(() => {
    if(elementEdit){
      if(nomeAluno.current) nomeAluno.current.value = elementEdit.nomeAluno
      if(cpfAluno.current) cpfAluno.current.value = elementEdit.cpf
      if(telefoneAluno.current) telefoneAluno.current.value = elementEdit.telefone
      if(idadeAluno.current) idadeAluno.current.value = elementEdit.idade
      if(emailAluno.current) emailAluno.current.value = elementEdit.email
      if(turnoAluno.current) turnoAluno.current.value = elementEdit.turno
    }
  },[elementEdit])

  return (
    <div className="fixed inset-0 flex items-center justify-center font-montserrat">
      <div className="absolute inset-0 bg-black opacity-65"></div>
      <div className="absolute w-3/4 h-[70%] bg-green-700 rounded-lg transform -translate-x-4 -translate-y-4 z-10"></div>
      <ToastContainer />
      <div className="relative w-3/4 h-[70%] bg-white z-10 rounded-lg shadow-lg p-6 flex flex-col items-center justify-around">
        <form className="border border-gray-500 p-8 rounded-lg flex flex-col items-center justify-around w-full h-[50%] shadow-md">
          <h1 className="text-center text-3xl font-bold">Cadastro de novo aluno</h1>
          <div className="flex gap-5 w-3/4">
                <div className="w-full flex flex-col gap-2">
                  <InputForms type="text" placeholder="Digite o nome do aluno" label="Nome Completo" lenght={30} ref={nomeAluno}/>
                  <InputForms type="number" placeholder="Digite a idade do aluno" label="Idade" lenght={3} ref={idadeAluno} mask="00" defaultValue={elementEdit?.idade}/>
                  <InputForms type="text" placeholder="Digite o email do aluno" label="Email" lenght={30} ref={emailAluno}/>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <InputForms type="text" placeholder="Digite o CPF do aluno" label="CPF" lenght={30} ref={cpfAluno} mask="000.000.000-00" defaultValue={elementEdit?.cpf} />
                  <InputForms type="text" placeholder="Digite o telefone do aluno" label="Telefone" lenght={30} ref={telefoneAluno} mask="(00) 00000-0000" defaultValue={elementEdit?.telefone}/>
                  <div className="flex items-center justify-end">
                      <label className="font-bold mr-2">Turno:</label>
                      <select  className="border border-green-700 rounded-md py-2 px-4 outline-none w-[70%]" id="status" ref={turnoAluno}>
                        <option value="">Selecione um turno</option>
                        <option value="Noite">Noite</option>
                        <option value="Manhã">Manhã</option>
                      </select>
                  </div>
                </div>
          </div>
        </form>
        <div className="w-full h-20 flex justify-around">
            <DinamicButton title="Fechar" width="1/3" color="red-600" haveIcon={true} imageIcon={ArrowBack} isBold="font-bold" onClick={onClose} textSize="lg"/>
            <DinamicButton title="Salvar" width="1/3" color="green-700" haveIcon={true} imageIcon={AddIcon} isBold="font-bold" textSize="lg" onClick={() => registerGymMember(elementEdit)}/>
        </div>
      </div>
    </div>
  );
}

export default ModalAlunos