import { BrowserRouter, Routes, Route} from 'react-router-dom'
import GymCadastro from './pages/GymCadastro'
import GymLogin from './pages/GymLogin'
import MainAplication from './pages/MainAplication'
import PerfilUsuario from './pages/PerfilUsuario'
import GymEquipament from './pages/GymEquipament'
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes'
import GymFuncionarios from './pages/GymFuncionarios'
import GymAlunos from './pages/GymAlunos'
import ConfigurarPerfil from './pages/ConfigurarPerfil'

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<GymLogin/>}/>
          <Route path='/Cadastro' element={<GymCadastro/>}/>


          <Route path='/main' element={ <PrivateRoutes><MainAplication/></PrivateRoutes>}/>
          <Route path="/PerfilUsuario" element={<PrivateRoutes><PerfilUsuario/></PrivateRoutes>}/>
          <Route path='/MeusAparelhos' element={<PrivateRoutes><GymEquipament/></PrivateRoutes>}/>
          <Route path='/MeusFuncionarios' element={<PrivateRoutes><GymFuncionarios/></PrivateRoutes>}/>
          <Route path='/MeusAlunos' element={<PrivateRoutes><GymAlunos/></PrivateRoutes>}/>
          <Route path='/ConfigurarPerfilUsuario' element={<PrivateRoutes><ConfigurarPerfil/></PrivateRoutes>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
