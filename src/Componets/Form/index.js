import React, { useState } from "react";
import { useParams, useHistory } from 'react-router-dom';
import * as S from './Form.style';
import api from "../../service/Api";

const Form = ({ MostrarUsuarios }) => {


    const [cliente, setCliente] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    const { id } = useParams();
    const history = useHistory()

    const CriarUsuario = async (e) => {
        e.preventDefault()
        await api.post('/clients', {
            cliente: cliente,
            email: email,
            telefone: telefone,
        })
            .then(() => {
                alert('Usuário cadastrado com sucesso!');
                MostrarUsuarios();
            })
            .catch(() => alert('Falha ao cadastrar usuário!'));
    }

    const EditarUsuario = async (e) => {
        e.preventDefault()
        await api.put(`/clients/${id}`, {
            cliente: cliente,
            email: email,
            telefone: telefone,
        })
            .then(() => {
                alert('Usuário editado com sucesso!');
                MostrarUsuarios();
                setTimeout(() => history.push('/'), 10)
            })
            .catch(() => alert('Não foi possível editar o usuário!'));
    }
    return (
        <>
            <S.Title>{id ? 'Edição de um usuário' : 'Cadastro de um novo usuário'}</S.Title>
            <form
                onSubmit={id ? EditarUsuario : CriarUsuario}
            >
                <S.Input
                    type="text"
                    required
                    placeholder="Escreva Nome"
                    id="lname"
                    name="lname"
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)} />

                <S.Input
                    type="tel"
                    required
                    id="telefone"
                    placeholder="Escreva Telefone"
                    name="telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)} />

                <S.Input
                    type="email"
                    required
                    id="email"
                    placeholder="Escreva email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <S.Button type='submit' variant='contained' >{id ? 'Editar' : 'Cadastrar'}</S.Button>
            </form>
        </>
    );
};

export default Form;
