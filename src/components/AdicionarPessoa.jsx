import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdicionarRegistro() {
  const [formData, setFormData] = useState({
    nome: '',
    rg: '',
    cpf: '',
    data_nascimento: '',
    data_admissao: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Certifique-se de fornecer um valor para rg junto com outros campos no objeto
    const data = {
      nome: formData.nome,
      rg: formData.rg, // Inclua o valor de rg
      cpf: formData.cpf,
      data_nascimento: formData.data_nascimento,
      data_admissao: formData.data_admissao,
    };
  
    // Realize a solicitação POST
    axios.post('http://localhost:5000/pessoas', data)
      .then((response) => {
        // Trate a resposta da API aqui
        navigate('/');
      })
      .catch((error) => {
        console.error('Erro ao adicionar registro:', error);
      });
  };
  
  return (
    <div>
      <h1>Adicionar Registro</h1>
      <form onSubmit={handleSubmit} className='form-container'>
        <label>Nome:</label>
        <input type="text" name="nome" value={formData.nome} onChange={handleChange} />

        <label>RG:</label>
        <input type="text" name="rg" value={formData.rg} onChange={handleChange} />

        <label>CPF:</label>
        <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} />

        <label>Data de Nascimento:</label>
        <input type="date" name="data_nascimento" value={formData.data_nascimento} onChange={handleChange} />

        <label>Data de Admissão:</label>
        <input type="date" name="data_admissao" value={formData.data_admissao} onChange={handleChange} />

        <button type="submit" className='button-submit'>Adicionar</button>
        <Link to="/" className='cancela'>Cancelar</Link>
      </form>
    </div>
  );
}

export default AdicionarRegistro;
