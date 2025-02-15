import ConfirmButton from "../components/Formulario/ConfirmButton";
import InputForms from "../components/Formulario/InputForms";
import FundoLogin from '../assets/img/FundoTelaLogin.jpg'
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef} from "react";
import { ToastContainer, toast } from "react-toastify";
import { toastConfig } from "../utils/toastConfig";

function GymCadastro() {
  const nomResp = useRef<HTMLInputElement>(null);
  const nomeAcad = useRef<HTMLInputElement>(null);
  const cnpjAcad = useRef<HTMLInputElement>(null);
  const emailAcad = useRef<HTMLInputElement>(null);
  const senha = useRef<HTMLInputElement>(null);
  const confirmSenha = useRef<HTMLInputElement>(null);
  const telefone = useRef<HTMLInputElement>(null);
  const endereco = useRef<HTMLInputElement>(null);
  const capacidade = useRef<HTMLInputElement>(null);
  const navigate = useNavigate()

  const handleRegister = async (e: React.MouseEvent) => {
    e.preventDefault();
  
    const responsavel = nomResp.current?.value;
    const academia = nomeAcad.current?.value;
    const cnpj = cnpjAcad.current?.value;
    const email = emailAcad.current?.value;
    const password = senha.current?.value;
    const passwordConfirm = confirmSenha.current?.value;
    const telefoneAcademia = telefone.current?.value;
    const enderecoAcademia = endereco.current?.value;
    const capacidadeMax = capacidade.current?.value;

    console.log(cnpjAcad.current?.value)
  
    if (
      !responsavel ||
      !academia ||
      !cnpj ||
      !email ||
      !password ||
      !passwordConfirm ||
      !telefoneAcademia ||
      !enderecoAcademia ||
      !capacidadeMax
    ) {
      toast.error("Dados faltantes! Preencha todos os campos.");
      return;
    }
  
    if (password !== passwordConfirm) {
      toast.error("As senhas devem coincidir.", toastConfig);
      return;
    }
  
    try {
      const tryRegister = await api.post("/gym/gymCadastro", {
        nomeAcademia: academia,
        cnpj: cnpj,
        email: email,
        password: password,
        confirmPassword: passwordConfirm,
        nomeResp: responsavel,
        endereco: enderecoAcademia,
        telefone: telefoneAcademia,
        capacidadeMax: capacidadeMax,
      });
  
      if (tryRegister.status === 201) {
        toast.success("Cadastro feito com sucesso!", toastConfig);
        navigate("/");
      }
    } catch (err) {
      toast.error("Houve algum erro ao tentar efetuar o cadastro", toastConfig);
      console.error(err);
    }
  };

  useEffect(() => {
    nomResp.current?.focus()
  }, [])

  return (
    <div className="w-full h-screen flex font-montserrat">
      <ToastContainer/>
      <section className="w-full h-screen flex items-center bg-gradient-to-br from-gray-900 to-gray-800 justify-center relative">
        <div className="w-full h-full absolute bg-black opacity-60 z-10"></div>
        <img src={FundoLogin} alt="Imagem de fundo (Academia)" className="w-full h-full object-cover absolute z-0" />
        <div className="absolute w-[50%] h-4/5 bg-green-700 rounded-lg transform -translate-x-4 -translate-y-4 z-10"></div>
        <div className="bg-white w-[50%] h-4/5 rounded-lg shadow-2xl border border-gray-200 flex items-center justify-center z-20">
          <form className="flex flex-col justify-around h-full w-[90%]">
            <div>
              <h1 className="text-5xl font-bold text-center text-green-bg-green-700 mb-2">Cadastre sua academia</h1>
              <p className="text-center text-gray-500">Informe os dados para criar sua conta</p>
            </div>
            <div className="flex flex-col gap-3">
              <InputForms type="text" placeholder="Nome Completo" label="Nome Responsável" ref={nomResp} />
              <InputForms type="text" placeholder="Nome Academia" label="Nome Academia" ref={nomeAcad} />
              <InputForms type="text" placeholder="XX.XXX.XXX/XXXX-XX" label="CNPJ" mask="00.000.000/0000-00" ref={cnpjAcad}/>
              <InputForms type="email" placeholder="E-mail" label="Email" ref={emailAcad} />
              <InputForms type="password" placeholder="Senha" label="Senha" ref={senha} />
              <InputForms type="password" placeholder="Confirme sua senha" label="Confirmar" ref={confirmSenha} />
              <InputForms type="text" placeholder="(XX) XXXXX-XXXX" label="Telefone" ref={telefone} mask="(00) 00000-0000"/>
              <InputForms type="text" placeholder="Endereço da Academia" label="Endereço" ref={endereco} />
              <InputForms type="number" placeholder="Capacidade máxima (Somente Números)" label="Capacidade" ref={capacidade} />
            </div>
            <div className="flex flex-col gap-2">
              <ConfirmButton textButton="Cadastrar" onClick={handleRegister} />
              <p className="text-black text-center">Já possui cadastro? <Link to="/" className="text-gray-400 hover:text-blue-500 hover:underline">Faça login!</Link></p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default GymCadastro;
