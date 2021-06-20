import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import Form from './Componets/Form';
import * as S from './App.styles';
import api from "./service/Api";

const App = () => {
  const [usuarios, setUsuarios] = useState([]);


  const history = useHistory()
  useEffect(() => MostrarUsuarios(), []);

  async function MostrarUsuarios() {
    await api.get("/clients").then((response) => {
      setUsuarios(response.data);
    });
  }

  async function DeletarUsuario(id) {
    await api
      .delete(`clients/${id}`)
      .then(() => {
        alert('Usuario Deletado')
        MostrarUsuarios();
      })
      .catch(() => {
        alert("Não foi possível deletar o usuário");
      });
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title> Lista</S.Title>
        <S.Figure>
          <S.Image src={'http://www.avmpmpr.com.br/site/wp-content/uploads/2018/11/cadastro.png'} alt="Github logo" />
        </S.Figure>
      </S.Header>
      <S.Box>
        <Form
          MostrarUsuarios={MostrarUsuarios}
        />
      </S.Box>
      <S.Table >
        < tbody >
          <tr>
            <th>Cliente</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Alterar</th>
            <th>Excluir</th>
          </tr>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td> {usuario.cliente}</td>
              <td>{usuario.telefone}</td>
              <td>{usuario.email}</td>
              <td>
                <S.Button onClick={() => history.push(`/${usuario.id}`)} >Alterar</S.Button></td>
              <td><S.Button onClick={() => DeletarUsuario(usuario.id)}>Excluir</S.Button></td>
            </tr>

          ))}
        </tbody >
      </S.Table>
    </S.Container >
  );
}

export default App;
