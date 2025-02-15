import FundoLogin from "../assets/img/FundoTelaLogin.jpg";
import InputForms from "../components/Formulario/InputForms";
import { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmButton from "../components/Formulario/ConfirmButton";
import { toast, ToastContainer } from "react-toastify";
import api from "../services/api";
import { toastConfig } from "../utils/toastConfig";

function GymLogin() {
  const cnpjInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const navigate = useNavigate()

  const verifyToken = () => {
    const token = localStorage.getItem("jwtToken")

    if(token){
      navigate("/main")
  }
}

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!cnpjInput || !emailInput || !passwordInput) {
      toast.error("Preencha todos os campos antes de confirmar", toastConfig);
      return;
    }
    const cnpj = cnpjInput.current?.value;
    const email = emailInput.current?.value;
    const password = passwordInput.current?.value;

    try {
      const tryLogin = await api.post("/gymLogin/Login", {
        cnpj,
        email,
        password,
      });

      if (tryLogin.status === 200) {
        const { token } = tryLogin.data;
        localStorage.setItem("jwtToken", token);
        toast.success("Sucesso ao fazer login, aproveite!", toastConfig)

        navigate("/main")
      } else {
        toast.error("Erro ao tentar fazer login.", toastConfig);
      }
    } catch (err) {
      console.log(err);
      toast.error("Erro interno do servidor, tente novamente mais tarde", toastConfig);
    }
  };

  useEffect(() => {
    verifyToken()
    emailInput.current?.focus();
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center font-montserrat relative">
      <ToastContainer />
      <div className="w-full h-full absolute bg-black opacity-60 z-10"></div>
      <img src={FundoLogin} alt="Imagem de fundo (Academia)" className="w-full h-full object-cover object-center absolute z-0" />
      <div className="absolute w-1/3 h-2/4 bg-green-700 rounded-lg transform -translate-x-4 -translate-y-4 z-10"></div>
      <div className="flex flex-col items-center justify-center relative z-20 bg-white w-1/3 h-2/4 rounded-xl shadow-xl p-6 md:p-8" style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}>
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Bem-vindo de volta!
        </h1>
        <p className="text-base md:text-lg text-center text-gray-600 mb-6">
          Entre na sua conta para continuar
        </p>
        <form className="flex flex-col space-y-4 w-full max-w-sm">
          <InputForms type="text" label="Email" placeholder="Digite seu email" ref={emailInput}/>
          <InputForms mask="00.000.000/0000-00" type="text" label="CNPJ" placeholder="Digite o CNPJ" ref={cnpjInput}/>
          <InputForms type='password' label="Senha" placeholder="Digite sua senha" ref={passwordInput}/>
          <ConfirmButton textButton="Entrar" onClick={handleLogin}/>
          <p className="text-sm md:text-base text-center mt-4">
            Ainda não tem uma conta?{" "}
            <Link to="/Cadastro" className="text-gray-500 hover:text-blue-600 hover:underline">Cadastre-se!</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default GymLogin;
