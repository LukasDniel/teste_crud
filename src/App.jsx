import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import PessoaLista from './components/PessoaLista';
import EditarPessoa from './components/EditarPessoa';
// import DeletePerson from './components/DeletePerson';
import AdicionarPessoa from './components/AdicionarPessoa';
import DetalhesPessoa from './components/DetalhesPessoa';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PessoaLista />} />
        <Route path="/pessoas/:idPessoa/editar" element={<EditarPessoa />} />
        {/* <Route path="/delete/:id" element={<DeletePerson />} /> */}
        <Route path="/pessoas/:idPessoa/detalhes" element={<DetalhesPessoa />} />
        <Route path="/pessoas/adicionar" element={<AdicionarPessoa />} />
        

      </Routes>
    </Router>
  );
}

export default App;
