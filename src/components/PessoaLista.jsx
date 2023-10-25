import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PessoaLista() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/pessoas')
      .then((response) => {
        setPeople(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleExcluir = (idPessoa) => {
    if (window.confirm('Tem certeza de que deseja excluir este registro?')) {
      axios.delete(`http://localhost:5000/pessoas/${idPessoa}`)
        .then(() => {
          // Atualizar a lista após a exclusão
          const updatedPeople = people.filter((person) => person.id_pessoa !== idPessoa);
          setPeople(updatedPeople);
        })
        .catch((error) => {
          console.error('Erro ao excluir a pessoa:', error);
        });
    }
  };

  return (
    <div>
      <h1 className='title'>Lista de Pessoas</h1>
      <button className='add'><Link to="/pessoas/adicionar">Adicionar Registro</Link></button>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data de Admissão</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, key) => (
            <tr key={key}>
              <td>{person.nome ? person.nome.split(' ')[0] : 'Nome não disponível'}</td>
              <td>{person.data_admissao ? new Date(person.data_admissao).toLocaleDateString('pt-BR') : 'Data de admissão não disponível'}</td>
              <td>
                <button className='editar'><Link to={`/pessoas/${person?.id_pessoa}/editar`}>Editar</Link></button>
                <button onClick={() => handleExcluir(person?.id_pessoa)} className='excluir'>Excluir</button>
                <button className='mais'><Link to={`/pessoas/${person?.id_pessoa}/detalhes`} className='mais'>Ver Mais</Link></button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}

export default PessoaLista;
