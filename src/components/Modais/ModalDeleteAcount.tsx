import { toast, ToastContainer } from "react-toastify"
import api from "../../services/api"
import InputForms from "../Formulario/InputForms"
import { useRef } from "react"
import { toastConfig } from "../../utils/toastConfig"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"

interface propsModal {
  onClose: VoidFunction
}

function ModalDeleteAcount({ onClose }: propsModal) {
  const deleteCnpj = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const deleteAcount = async () => {
    try {
      const cnpj = deleteCnpj.current?.value
      if (!cnpj) {
        toast.error("Digite um CNPJ válido", toastConfig)
        return
      }

      const token = localStorage.getItem("jwtToken")
      await api.delete("/gymDelete/Deletar", {
        data: { cnpj },
        headers: { Authorization: token },
      })

      toast.success("Conta deletada com sucesso!", toastConfig)
      onClose()
      navigate('/cadastro')
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          toast.error("CNPJ inválido!", toastConfig)
        } else {
          toast.error("Erro ao deletar conta. Tente novamente!", toastConfig)
        }
      } else {
        toast.error("Erro inesperado!", toastConfig)
      }
      console.error(error)
    }
  }

  return (
    <div className="absolute w-full h-screen flex items-center justify-center">
      <ToastContainer />
      <div onClick={onClose} className="absolute bg-black bg-opacity-65 w-full h-screen z-0 flex items-center justify-center"></div>
      <div className="absolute w-[50%] h-[40%] bg-white z-10 rounded-lg shadow-lg flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Tem certeza que deseja deletar a sua conta?</h1>
        <div className="w-1/2 flex flex-col gap-3">
          <p className="text-gray-400">Para deletar a sua conta digite seu CNPJ:</p>
          <InputForms
            label="CNPJ"
            type="text"
            placeholder="Digite seu CNPJ para deletar sua conta"
            justify="justify-start"
            mask="00.000.000/0000-00"
            ref={deleteCnpj}
          />
          <button
            onClick={deleteAcount}
            className="border-2 px-1 py-1 w-full border-red-600 hover:bg-red-600 hover:scale-110 transition-all duration-300 rounded-md flex items-center justify-center text-red-600 hover:text-white font-bold"
          >
            Apagar Conta
          </button>
        </div>
        <p onClick={onClose} className="absolute right-4 top-3 text-xl font-bold cursor-pointer hover:scale-110 transition-all duration-200">
          X
        </p>
      </div>
    </div>
  )
}

export default ModalDeleteAcount
