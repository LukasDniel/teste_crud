import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditarPessoa() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { idPessoa } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/pessoas/${idPessoa}`)
      .then((response) => {
        const data = response.data;

        // Função para ajustar datas para o fuso horário local
        const adjustDateToLocalTime = (date) => {
          const adjustedDate = new Date(date);
          const timeZoneOffset = adjustedDate.getTimezoneOffset();
          adjustedDate.setMinutes(adjustedDate.getMinutes() - timeZoneOffset);
          return adjustedDate.toISOString().split('T')[0];
        };

        // Ajustar datas para o fuso horário local
        data.data_nascimento = adjustDateToLocalTime(data.data_nascimento);
        data.data_admissao = adjustDateToLocalTime(data.data_admissao);

        setFormData(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da pessoa:', error);
      });
  }, [idPessoa]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Certifique-se de que os campos RG e CPF estejam definidos em formData
    if (!formData.rg) {
      formData.rg = '';
    }
    if (!formData.cpf) {
      formData.cpf = '';
    }

    axios
      .put(`http://localhost:5000/pessoas/${idPessoa}`, formData)
      .then(() => {
        navigate(`/pessoas/${idPessoa}/detalhes`);
      })
      .catch((error) => {
        console.error('Erro ao atualizar dados da pessoa:', error);
      });
  };

  return (
    <div>
      <h1>Atualizar Dados da Pessoa</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <label>Nome:</label>
        <input
          type="text"
          name="nome"
          value={formData.nome || ''}
          onChange={handleChange}
        />

        <label>RG:</label>
        <input
          type="text"
          name="rg"
          value={formData.rg || ''}
          onChange={handleChange}
        />

        <label>CPF:</label>
        <input
          type="text"
          name="cpf"
          value={formData.cpf || ''}
          onChange={handleChange}
        />

        <label>Data de Nascimento:</label>
        <input
          type="date"
          name="data_nascimento"
          value={formData.data_nascimento || ''}
          onChange={handleChange}
        />

        <label>Data de Admissão:</label>
        <input
          type="date"
          name="data_admissao"
          value={formData.data_admissao || ''}
          onChange={handleChange}
        />

        <button type="submit" className="button-submit">
          Atualizar
        </button>
        <Link to={`/pessoas/${idPessoa}/detalhes`} className="cancela">
          Cancelar
        </Link>
      </form>
    </div>
  );
}

export default EditarPessoa;
