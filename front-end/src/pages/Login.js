import React, {useState} from 'react';
import './Login.css';

import api from '../services/api';

import logo from  '../assets/logo.png';

//Exporta o componente assim que for renderizado
export default function Login({history}){
    //A propriedade history faz com que haja a navegação
    const [username, SetUsername] = useState('');

    async function handleSubmit(e){
        //preve e bloqueia o comportamento padrão, ou seja
        //redirecionar a página
        e.preventDefault();


        //Post que retorna um objeto com as informações do usuario
        const response = await api.post('/devs', {
                username: username,
        });
        
        const { _id} =response.data;
        //redireciona ao main s
        history.push(`/dev/${_id}`);
    }
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev" />
                <input 
                    placeholder="Digite seu usuário no GitHub"
                    value ={username}
                    onChange={e => SetUsername(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}