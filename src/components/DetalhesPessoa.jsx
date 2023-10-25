import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; // Importe o hook useParams
import axios from 'axios';

function DetalhesPessoa() {
  const [pessoa, setPessoa] = useState({});
  const { idPessoa } = useParams(); // Use o hook useParams para obter o ID da rota

  useEffect(() => {
    // Fazer uma chamada à API para obter os detalhes da pessoa
    axios.get(`http://localhost:5000/pessoas/${idPessoa}`)
      .then((response) => {
        setPessoa(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar detalhes da pessoa:', error);
      });
  }, [idPessoa]);

  const excluirPessoa = () => {
    axios.delete(`/pessoas/${idPessoa}/delete`);
  }



  return (
    <div>
      <h1>Detalhes da Pessoa</h1>
      <p>Nome: {pessoa.nome}</p>
      <p>RG: {pessoa.rg}</p>
      <p>CPF: {pessoa.cpf}</p>
      <p>Data de Nascimento: {pessoa.data_nascimento ? new Date(pessoa.data_nascimento).toLocaleDateString('pt-BR') : 'Data de admissão não disponível'}</p>
      <p>Data de Admissão: {pessoa.data_admissao ? new Date(pessoa.data_admissao).toLocaleDateString('pt-BR') : 'Data de admissão não disponível'}</p>
      <button className='editar'><Link to={`/pessoas/${idPessoa}/editar`}>Editar</Link></button>
      <button onClick={excluirPessoa} className='excluir'>Excluir</button>
    </div>
  );
}

export default DetalhesPessoa;
