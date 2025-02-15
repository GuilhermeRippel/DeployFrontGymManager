import DinamicButton from "../components/AbaEquipamentos/DinamicButton"
import InputForms from "../components/Formulario/InputForms"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import api from "../services/api"
import { toast, ToastContainer } from "react-toastify"
import { toastConfig } from "../utils/toastConfig"
import ModalDeleteAcount from '../components/Modais/ModalDeleteAcount'
import ModalEditPassword from "../components/Modais/ModalEditPassword"

function ConfigurarPerfil() {
    const navigate = useNavigate()
    const gymCnpj = useRef<HTMLInputElement>(null)
    const nomeAcad = useRef<HTMLInputElement>(null)
    const nomeResp = useRef<HTMLInputElement>(null)
    const email = useRef<HTMLInputElement>(null)
    const telefone = useRef<HTMLInputElement>(null)
    const capacidadeMax = useRef<HTMLInputElement>(null)
    const endereco = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [handleModalPassword, setHandleModalPassword] = useState(false)

    const getInformationsGym = async () => {
      try {
        const token = localStorage.getItem('jwtToken')
        const response = await api.get("/gymProfile/gymProfileData", {
          headers: {
            Authorization: token
          }
        })
        if(gymCnpj.current && nomeAcad.current && nomeResp.current && email.current && telefone.current && capacidadeMax.current && endereco.current && password.current){
          gymCnpj.current.value = response.data.cnpj
          nomeAcad.current.value = response.data.nomeAcad
          nomeResp.current.value = response.data.nomeResp
          email.current.value = response.data.email
          telefone.current.value = response.data.telefone
          capacidadeMax.current.value = response.data.capacidadeMax
          endereco.current.value = response.data.endereco
          password.current.value = response.data.password
        }
      } catch (error) {
        console.log(error)
      }
    }

    const handleModalDeleteAcount = () => {
      setIsModalOpen(!isModalOpen)
    }

    const handleModalEditPassword = () =>{
      setHandleModalPassword(!handleModalPassword)
    }

    const handleInputValue = () => {
      setIsVisible(!isVisible)
      setIsDisabled(!isDisabled)
    }

    const handleEditInformations = async () => {
      if(!gymCnpj.current?.value.trim() || !nomeResp.current?.value.trim() || !nomeAcad.current?.value.trim() || !email.current?.value.trim() || !telefone.current?.value.trim() || !capacidadeMax.current?.value.trim() || !endereco.current?.value.trim()){
        toast.error("Preencha todos os campos", toastConfig)
        return
      }

      try {
        const token = localStorage.getItem('jwtToken')

          if (!token) {
            console.error("Token não encontrado!", toastConfig);
            return;
          }

        await api.put(`/gymUpdate/Atualizar/${encodeURIComponent(gymCnpj.current?.value)}`, {
          cnpj: gymCnpj.current?.value,
          nomeAcad: nomeAcad.current?.value,
          nomeResp: nomeResp.current?.value,
          endereco: endereco.current?.value,
          telefone: telefone.current?.value,
          capacidadeMax: capacidadeMax.current?.value,
        }, {
          headers: {
            Authorization: token
          }
        })

        getInformationsGym()
        
        toast.success("Dados Atualizados!", toastConfig)
        setIsDisabled(true)
        setIsVisible(false)
      } catch (error) {
        console.log(error)
        toast.error("Impossível alterar os dados, tente novamente!", toastConfig)
      }
    }

    useEffect(() => {
      getInformationsGym()
    },[])

    useEffect(() => {
      gymCnpj.current?.focus()
    },[isVisible])

  return (
    <div className="w-full h-screen bg-gray-800 flex flex-col items-center justify-around font-montserrat">
      <ToastContainer/>
        <main className="w-[90%] h-[90%] bg-white rounded-lg shadow-lg flex justify-center items-center px-3 py-2">
            <div className="w-[40%] h-full flex flex-col justify-around items-center">
              <h1 className="text-3xl font-bold ">Configurações do Perfil</h1>
              <div className="w-full flex flex-col items-end gap-5">
                <h2 className="text-md  text-gray-400 w-full border-b border-gray-400">Dados Pessoais</h2>
                <InputForms label="CNPJ" type="text" disabled={isDisabled} ref={gymCnpj} justify="justify-end"/>
                <InputForms label="Nome Academia" type="text" disabled={isDisabled} ref={nomeAcad} justify="justify-end"/>
                <InputForms label="Nome Responsável" type="text" disabled={isDisabled} ref={nomeResp} justify="justify-end"/>
                <InputForms label="Email" type="text" disabled={isDisabled} ref={email} justify="justify-end"/>
                <InputForms label="Telefone" type="text" disabled={isDisabled} ref={telefone} justify="justify-end" mask="(00) 00000-0000"/>
                <InputForms label="Capacidade Máx." type="text" disabled={isDisabled} ref={capacidadeMax} justify="justify-end"/>
                <InputForms label="Endereço" type="text" disabled={isDisabled} ref={endereco} justify="justify-end"/>
                <button onClick={handleInputValue} className="border-2 px-1 py-1 border-blue-600 hover:bg-blue-600 hover:scale-105 transition-all duration-300 rounded-md flex items-center justify-center w-[70%] text-blue-600 hover:text-white font-bold">Editar informações pessoais</button>
                <div className="w-[70%] flex justify-between">
                  <button onClick={handleEditInformations} className={`border-2 px-1 py-1 border-green-600 hover:bg-green-600 hover:scale-105 transition-all duration-300 rounded-md flex items-center justify-center w-[49%] text-green-600 hover:text-white font-bold ${isVisible ? '' : 'hidden'}`}>Salvar</button>
                  <button onClick={handleInputValue} className={`border-2 px-1 py-1 border-red-600 hover:bg-red-600 hover:scale-105 transition-all duration-300 rounded-md flex items-center justify-center w-[49%] text-red-600 hover:text-white font-bold ${isVisible ? '' : 'hidden'}`}>Cancelar</button>
                </div>
              </div>
              <div className="w-full flex flex-col gap-5">
                <h2 className="text-md  text-gray-400 w-full border-b border-gray-400">Atualização de senha</h2>
                <div className="flex gap-4">
                  <InputForms label="Senha" type="password" ref={password} disabled={true}/>
                  <button onClick={handleModalEditPassword} className="border-2 px-1 py-1 border-blue-600 hover:bg-blue-600 hover:scale-110 transition-all duration-300 rounded-md flex items-center justify-center w-1/3 text-blue-600 hover:text-white font-bold">Editar</button>
                </div>
              </div>
              <button onClick={handleModalDeleteAcount} className="border-2 px-1 py-1 border-red-600 hover:bg-red-600 hover:scale-110 transition-all duration-300 rounded-md flex items-center justify-center w-[80%] text-red-600 hover:text-white font-bold">Apagar Conta</button>
            </div>
        </main>
        <DinamicButton title="Voltar" color="green-700" width="2/3" haveIcon={false} isBold='font-bold' textSize="xl" height="[5%]" onClick={() => navigate('/main')}/>
        {isModalOpen && <ModalDeleteAcount onClose={handleModalDeleteAcount}/>}
        {handleModalPassword && <ModalEditPassword onClose={handleModalEditPassword}/>}
    </div>
  )
}

export default ConfigurarPerfil