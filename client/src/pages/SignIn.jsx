import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fadeIn } from '../variants';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="bg-cover bg-left flex items-center imgsignin">
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 pr-5'>
        {/* left */}
        <motion.div
               variants={fadeIn('right', 0.5)}
               initial='hidden'
               whileInView={'show'}
               viewport={{ once: false, amount: 0.7 }}
        
        className='flex-1 pr-10'>
          <Link
            to='/'
            className='self-center whitespace-nowrap text-sm sm:text-3xl font-semibold dark:text-white'
          >
            <span className='px-2 py-1 bg-gradient-to-r from-teal-400 via-teal-550 to-teal-800 rounded-lg text-white'>
              DyC
            </span>
            <span className='p-1 text-white'>
              Coloproctología
            </span>
          </Link>
          {/* <p className='text-sm mt-5'>
            This is a demo project. You can sign in with your email and password
            or with Google.
          </p> */}
        </motion.div>
        {/* right */}

        <motion.div
               variants={fadeIn('left', 0.5)}
               initial='hidden'
               whileInView={'show'}
               viewport={{ once: false, amount: 0.7 }}
        className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Email' className='text-white'/>
              <TextInput
                type='email'
                placeholder='email'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div >
              <Label value='Contraseña' className='text-white border-none dark:border-none'/>
              <TextInput
                type='password'
                placeholder='********'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button
              type='submit'
              disabled={loading}
              className='bg-teal-500 dark:bg-teal-500'  
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Cargando...</span>
                </>
              ) : (
                'Ingresar'
              )}
            </Button>
          </form>
          {/* <div className='flex gap-2 text-sm mt-5'>
            <span>No tienes cuenta?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Crear cuenta
            </Link>
          </div> */}
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </motion.div>
      </div>
    </div>
  );
}
