import { toast, ToastContainer } from "react-toastify"
import api from "../../services/api"
import InputForms from "../Formulario/InputForms"
import { useRef, useState } from "react"
import { toastConfig } from "../../utils/toastConfig"

interface propsModal {
    onClose: VoidFunction
}

function ModalEditPassword({onClose}: propsModal) {
  const password = useRef<HTMLInputElement>(null)
  const passwordConfirm = useRef<HTMLInputElement>(null)
  const [newPassword, setNewPassword] = useState(true)

  const verifyPassword = async () => {
    try {
      const token = localStorage.getItem('jwtToken')
      if(!password.current?.value){
        toast.error("Digite a senha atual antes de verificar", toastConfig)
        return
      }
      
      const tryComparePassword = await api.post("/gymUpdatePassword/VerifyPassword", {
          password: password.current?.value,
        },
        {
          headers: {
            Authorization: token
          }
        }
       )
      if(tryComparePassword.status !== 200){
        toast.error('Senhas não coincidem, tente novamente', toastConfig)
        return
      }
      setNewPassword(false)
    } catch (error) {
      console.log(error)
      toast.error('Erro ao verificar senha. Tente novamente.', toastConfig)
    }
  }

  const tryChangePassword = async () => {
    try {
      const token = localStorage.getItem('jwtToken')
      if(!password.current?.value || !passwordConfirm.current?.value){
        toast.error('Preencha os campos', toastConfig)
        return
      }

      const changePassword = await api.put('/gymUpdatePassword/Update', {
        password: password.current?.value,
        passwordConfirm: passwordConfirm.current?.value,
      }, {headers: {
        Authorization: token
      }})

      if(!changePassword){
        toast.error('Erro ao cadastrar nova senha', toastConfig)
        return
      }

      toast.success('Nova senha cadastrada com sucesso', toastConfig)
      onClose()
    } catch (error) {
      console.log(error)
      toast.error('Erro ao alterar senha', toastConfig)
    }
  }

  return (
    <div className="absolute w-full h-screen flex items-center justify-center">
      <ToastContainer/>
        <div onClick={onClose} className="absolute bg-black bg-opacity-65 w-full h-screen z-0 flex items-center justify-center"></div>
        <div className="absolute w-[50%] h-[40%] bg-white z-10 rounded-lg shadow-lg flex flex-col items-center justify-center gap-3">
            { newPassword ? 
            <>
              <h1 className="text-2xl font-bold">Digite sua senha atual</h1>
              <div className="w-1/2">
                  <InputForms label="Senha Atual" type="password" placeholder="Digite sua senha atual" ref={password}></InputForms>
              </div>
              <button onClick={verifyPassword} className="border-2 px-1 py-1 border-blue-600 hover:bg-blue-600 hover:scale-110 transition-all duration-300 rounded-md flex items-center justify-center w-1/3 text-blue-600 hover:text-white font-bold">Verificar</button>
              <p onClick={onClose} className="absolute right-4 top-3 text-xl font-bold cursor-pointer hover:scale-110 transition-all duration-200">X</p> 
            </>
              : 
            <>
              <h1 className="text-2xl font-bold">Digite a nova senha</h1>
              <div className="w-1/2 flex flex-col gap-3">
                  <InputForms label="Nova Senha" type="password" placeholder="Digite sua senha atual" ref={password}></InputForms>
                  <InputForms label="Repita a Senha" type="password" placeholder="Digite sua senha atual" ref={passwordConfirm}></InputForms>
              </div>
              <button onClick={tryChangePassword} className="border-2 px-1 py-1 border-blue-600 hover:bg-blue-600 hover:scale-110 transition-all duration-300 rounded-md flex items-center justify-center w-1/3 text-blue-600 hover:text-white font-bold">Cadastrar</button>
              <p onClick={onClose} className="absolute right-4 top-3 text-xl font-bold cursor-pointer hover:scale-110 transition-all duration-200">X</p> 
            </>}
        </div>
    </div>
  )
}

export default ModalEditPassword