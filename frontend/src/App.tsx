
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Listing from './routes/Listing';
import Form from './routes/Form';
import Header from './components/Header';



/*Define o Layout Pai (casca da aplicação). 
  O Header permanece fixo, enquanto o Outlet alterna o conteúdo interno.
*/
const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

/*Criar objeto de roteamento fora do componente,
  contendo array para definir hierarquia das páginas.
  Cria a configuração das rotas de forma declarativa.
  O createBrowserRouter é necessário para habilitar as novas Data APIs do React Router.
*/
const router = createBrowserRouter([
  {
    path: "/",  // Rota pai que serve de base para a aplicação
    element: <RootLayout />, // Componente que provê a estrutura comum (Layout)
    children: [
      {
        path: "/",  // Rota raiz (index)
        element: <Listing />, // Injetado no <Outlet /> quando o caminho for exatamente "/"
      },
      {
        path: "form/:movieId",  // Rota com parâmetro dinâmico
        element: <Form />, // Injetado no <Outlet /> quando o caminho for "form/algum-id"
      },
    ],
  },
]);

function App() {
  // Provedor que conecta a configuração do roteador à aplicação React
  return <RouterProvider router={router} />;
}

export default App;

