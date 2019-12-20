import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './Main.css';

import api from '../services/api';

import logo from  '../assets/logo.png';
import dislike from '../assets/dislike.png';
import like from '../assets/like.png'

//Com o match temos todos os parametros que foram passados para esta rota
export default function Main({match}) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers(){
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id,
                }
            });
            setUsers(response.data);
        } 
        

        loadUsers();
    }, [match.params.id])

    // recebe o id do usuario que esta recebendo o like
    async function handleLike(id){
 // no corpo da requisição não recebe valor e nos headers sim
    await api.post(`/devs/${id}/likes` , null, {
    headers: {user: match.params.id}
})

setUsers(users.filter(user => user._id !== id));

    }

    async function handleDislike(id){
        // no corpo da requisição não recebe valor e nos headers sim
        await api.post(`/devs/${id}/dislikes` , null, {
            headers: {user: match.params.id}
        })

        setUsers(users.filter(user => user._id !== id));
    }

    return (
    <div className="main-container">
       <Link to="/" >
        <img src={logo} alt="Tindev" />
       </Link>
           {/* If ternário  */}
           {users.length > 0 ? (
               <ul>
                     {/* O map serve para percorrer um array */}
            {users.map(user => (
                <li key={user._id}>
                     <img src={user.avatar} alt={user.name} />
                     <footer>
                         <strong>{user.name}</strong>
                         <p>{user.bio}</p>
                     </footer>
                     <div className="buttons">
                         <button type="button" onClick={() => handleDislike(user._id)}>
                             <img src={dislike} alt="Dislike" />
                         </button>
                         <button type="button" onClick={() => handleLike(user._id)}>
                             <img src={like} alt="Like" />
                         </button>
                     </div>
                </li>
            ))}
         

                </ul>

           ) : (
            <div className="empty"> Acabou :( </div>

           )}
    
    </div>

        )
}