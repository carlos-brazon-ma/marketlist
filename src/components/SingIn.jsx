import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Input from './Input';

const SingIn = ({ userIn }) => {
    const history = useNavigate(); // Importa useNavigate
    const [user, setUser] = useState({});

    const handleInput = () => {
        const inputName = event.target.name;
        setUser(prev => ({ ...prev, [inputName]: event.target.value }));
    }
    const handleSubmit = async () => {
        event.preventDefault();

        const auth = getAuth();
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        history('/', { replace: true });
    }

    return (
        <div className={`flex flex-col gap-4 p-3 items-center ${userIn ? '' : ''}`}>
            <form className='flex flex-col gap-2 p-3 items-center justify-center' onSubmit={handleSubmit}>
                <Input
                type={'text'} 
                name={'email'}
                onChange={handleInput}
                value={user.email || ''}
                placeholder={'Email'}
                required
                 />
                <Input
                type={'password'} 
                name={'password'}
                onChange={handleInput}
                value={user.password || ''}
                placeholder={'Password'}
                minLength={6}
                required
                 />
                 <Input
                 className={'w-fit text-white font-semibold text-base bg-slate-500 hover:bg-slate-700 hover:shadow-blue-800 shadow-md shadow-blue-950'}
                type={'submit'}
                value={'Iniciar sesión'}
                required
                 />
            </form>
            <p className='font-normal text-sm leading-4'>Sino estás registrado <Link className='font-semibold text-sm leading-4 underline' to={'/CheckIn'}> pulsa aquí </Link></p>
        </div>
    )
}

export default SingIn