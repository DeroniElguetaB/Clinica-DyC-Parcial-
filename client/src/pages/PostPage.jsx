import React from 'react';
import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import { FaThumbsUp } from 'react-icons/fa';
import CommentSection from '../components/CommentSection';
import DashSidebar from '../components/DashSidebar';
import { TextInput } from 'flowbite-react';
import ModalReceta from './Receta/ModalReceta';
//IMPORTACION ORDENES
import CommentPostExodoncia from '../components/ordenes/PostExodoncia';
import CommentCirugiaMayor from '../components/ordenes/CirugiaMayor';
import CommentCirugiaMayorAmbulatoria from '../components/ordenes/CirugiaMayorAmbulatoria';
import CommentHabitoDefecatorio from '../components/ordenes/HabitoDefecatorio';
import CommentPrurito from '../components/ordenes/Prurito';
import CommentCertificado from '../components/ordenes/Certificado';
import CommentRecetaMedica from '../components/ordenes/RecetaMedica';
import CommentInterconsulta from '../components/ordenes/Interconsulta';
import CommentFonoaudiologia from '../components/ordenes/Fonoaudiologia';

//VISTA PERFIL PACIENTE
export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  //Modal
  const [estadoModal, setEstadoModal] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* DASHBOARD PATIENT */}
      <main className='p-2 flex flex-col max-w-6xl mx-auto min-h-screen'>
        {/* BUTTON BACK */}
        <div className="flex gap-4 pt-1">
          <Link
              to="/dashboard?tab=posts"
              className="rounded-lg py-3 px-4 text-white bg-teal-600 hover:bg-teal-800"
            >
              <IoArrowBackOutline />
            </Link>
            <div className='flex'>
              <h1 className="self-center text-xl font-semibold">{post && post.contenido}</h1>
            </div>
        </div>
        {/* CONTAINER CARDS */}
        <div className='grid grid-cols-12 gap-6 my-2 items-start'>
          {/* LEFT CARD */}
          <div class="col-span-12 flex-colo lg:col-span-4 bg-gray-500 bg-opacity-10 rounded-xl p-6 top-18">
            <div class="space-y-4 xl:space-y-6">
              <img class="mx-auto rounded-full h-36 w-36" src={'https://static.vecteezy.com/system/resources/previews/021/352/965/original/user-icon-person-profile-avatar-with-plus-symbol-add-user-profile-icon-png.png'} alt="author avatar"/>
              <div class="space-y-2">
                <div class="flex justify-center items-center flex-col space-y-1 text-lg font-medium leading-6">
                  <h3 class="text-xl font-semibold text-teal-800 dark:text-white">{post && post.contenido}</h3>
                  <p class="text-gray-500 dark:text-indigo-300">{post && post.title}</p>
                  <p class="text-gray-500 dark:text-indigo-300">{post && post.edad}</p>
                  <div className=''>
                    <Button className='inline-block m-1' color='gray' pill size='xs'>
                      {post && post.category}
                    </Button>
                    <Button className='inline-block' color='gray' pill size='xs'>
                      {post && post.sanguineo}
                    </Button>
                  </div> 
                  <Button color='gray' pill size='xs'>
                    {post && post.content}
                  </Button>
                </div>
              </div>
            </div>
            <div class="col-span-12 flex-colo lg:col-span-4 bg-gray-500 bg-opacity-10 rounded-xl p-2 flex justify-center items-center flex-col mt-2">
              <p class=" text-gray-500 dark:text-indigo-300 text-sm">
                <span className='text-teal-800 dark:text-white'>celular </span>
                {post && post.celular}
              </p>
              <p class="text-gray-500 dark:text-indigo-300 text-sm">
                <span className='text-teal-800 dark:text-white'>tel emergencia </span>
                {post && post.celularemergencia}
              </p>
              <p class="text-gray-500 dark:text-indigo-300 text-sm text-center	">
                <span className='text-teal-800 dark:text-white text-right'>direccion </span>
                {post && post.direccion}
              </p>
              <p class="text-gray-500 dark:text-indigo-300 text-sm">
              <span className='text-teal-800 dark:text-white'>email </span>
                {post && post.email}
              </p>
            </div>
          </div>
          {/* RIGHT CARD */}
          <div className="col-span-12 lg:col-span-8 bg-gray-500 bg-opacity-10 rounded-xl p-6">
            <div className='grid grid-cols-3 pb-5'>
              <h1 className='flex text-center items-center'>
                Historial Medico
              </h1>
              <p></p>
              <Link 
                onClick={() => setEstadoModal(!estadoModal)}
                className='w-full flex justify-center p-4 bg-teal-600 hover:bg-teal-800 text-white text-sm font-medium rounded-lg'>
                  <div className='flex'>
                    <span className='p-2'>Crear orden</span>
                    <button
                      type='button'
                      onClick={() => onLike(comment._id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569z"/></svg>
                    </button>
                  </div>
              </Link>
              <div className='w-full gap-4 transitions text-white text-sm font-medium px-2 py-1 rounded'>
                
                {/* RECETA MEDICA*/}
                {/* <ModalReceta
                  state= {estadoModal}
                  setState = {setEstadoModal}
                  title="Receta Medica"
                > 
                  <div className='Receta'>
                    <div className='flex items-start text-lg pb-2'>
                        <h1 className='font-semibold pr-1'>Nombre: </h1>
                        <p>{post && post.contenido}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Rut:</h1>
                        <p>{post && post.title}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Edad: </h1>
                        <p> {post && post.edad} </p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Sexo:</h1>
                        <p>{post && post.category}</p>
                    </div>
                    <div className=''>
                        <div className='text-lg'>
                            <CommentRecetaMedica postId={post._id} />
                        </div>
                    </div>
                  </div>
                </ModalReceta> */}

                {/* POST EXODONCIA */}
                {/* <ModalReceta
                  state= {estadoModal}
                  setState = {setEstadoModal}
                  title="Indicaciones Post Exodoncia"
                > 
                  <div className='Receta'>
                    <div className='flex items-start text-lg pb-2'>
                        <h1 className='font-semibold pr-1'>Nombre: </h1>
                        <p>{post && post.contenido}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Rut:</h1>
                        <p>{post && post.title}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Edad: </h1>
                        <p> {post && post.edad} </p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Sexo:</h1>
                        <p>{post && post.category}</p>
                    </div>
                    <div className=''>
                        <div className='text-lg'>
                            <CommentPostExodoncia postId={post._id} />
                        </div>
                    </div>
                  </div>
                </ModalReceta> */}

                {/* INDICACIONES CIRUGIA MAYOR AMBULATORIA */}
                {/* <ModalReceta
                  state= {estadoModal}
                  setState = {setEstadoModal}
                  title="Indicaciones Cirugia Mayor Ambulatoria"
                > 
                  <div className='Receta'>
                    <div className='flex items-start text-lg pb-2'>
                        <h1 className='font-semibold pr-1'>Nombre: </h1>
                        <p>{post && post.contenido}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Rut:</h1>
                        <p>{post && post.title}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Edad: </h1>
                        <p> {post && post.edad} </p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Sexo:</h1>
                        <p>{post && post.category}</p>
                    </div>
                    <div className=''>
                        <div className='text-lg'>
                            <CommentCirugiaMayorAmbulatoria postId={post._id} />
                        </div>
                    </div>
                  </div>
                </ModalReceta> */}

                {/* INDICACIONES CIRUGIA MAYOR */}
                {/* <ModalReceta
                  state= {estadoModal}
                  setState = {setEstadoModal}
                  title="Indicaciones Cirugia Mayor"
                > 
                  <div className='Receta'>
                    <div className='flex items-start text-lg pb-2'>
                        <h1 className='font-semibold pr-1'>Nombre: </h1>
                        <p>{post && post.contenido}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Rut:</h1>
                        <p>{post && post.title}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Edad: </h1>
                        <p> {post && post.edad} </p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Sexo:</h1>
                        <p>{post && post.category}</p>
                    </div>
                    <div className=''>
                        <div className='text-lg'>
                            <CommentCirugiaMayor postId={post._id} />
                        </div>
                    </div>
                  </div>
                </ModalReceta> */}

                {/* INDICACIONES HABITO DEFECATORIO */}
                {/* <ModalReceta
                  state= {estadoModal}
                  setState = {setEstadoModal}
                  title="Indicaciones Habito Defecatorio"
                > 
                  <div className='Receta'>
                    <div className='flex items-start text-lg pb-2'>
                        <h1 className='font-semibold pr-1'>Nombre: </h1>
                        <p>{post && post.contenido}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Rut:</h1>
                        <p>{post && post.title}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Edad: </h1>
                        <p> {post && post.edad} </p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Sexo:</h1>
                        <p>{post && post.category}</p>
                    </div>
                    <div className=''>
                        <div className='text-lg'>
                            <CommentHabitoDefecatorio postId={post._id} />
                        </div>
                    </div>
                  </div>
                </ModalReceta> */}

                {/* INDICACIONES PRURITO */}
                {/* <ModalReceta
                  state= {estadoModal}
                  setState = {setEstadoModal}
                  title="Indicaciones Prurito"
                > 
                  <div className='Receta'>
                    <div className='flex items-start text-lg pb-2'>
                        <h1 className='font-semibold pr-1'>Nombre: </h1>
                        <p>{post && post.contenido}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Rut:</h1>
                        <p>{post && post.title}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Edad: </h1>
                        <p> {post && post.edad} </p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Sexo:</h1>
                        <p>{post && post.category}</p>
                    </div>
                    <div className=''>
                        <div className='text-lg'>
                            <CommentPrurito postId={post._id} />
                        </div>
                    </div>
                  </div>
                </ModalReceta> */}

                {/* CERTIFICADO */}
                {/* <ModalReceta
                  state= {estadoModal}
                  setState = {setEstadoModal}
                  title="Certificado Medico"
                > 
                  <div className='Receta'>
                    <div className='flex items-start text-lg pb-2'>
                        <h1 className='font-semibold pr-1'>Nombre: </h1>
                        <p>{post && post.contenido}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Rut:</h1>
                        <p>{post && post.title}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Edad: </h1>
                        <p> {post && post.edad} </p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Sexo:</h1>
                        <p>{post && post.category}</p>
                    </div>
                    <div className=''>
                        <div className='text-lg'>
                            <CommentCertificado postId={post._id} />
                        </div>
                    </div>
                  </div>
                </ModalReceta> */}

                {/* INTERCONSULTA */}
                <ModalReceta
                  state= {estadoModal}
                  setState = {setEstadoModal}
                  title="Interconsulta"
                > 
                  <div className='Receta'>
                    <div className='flex items-start text-lg pb-2'>
                        <h1 className='font-semibold pr-1'>Nombre: </h1>
                        <p>{post && post.contenido}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Rut:</h1>
                        <p>{post && post.title}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Edad: </h1>
                        <p> {post && post.edad} </p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Sexo:</h1>
                        <p>{post && post.category}</p>
                    </div>
                    <div className=''>
                        <div className='text-lg'>
                            <CommentInterconsulta postId={post._id} />
                        </div>
                    </div>
                  </div>
                </ModalReceta>

                {/* FONOAUDIOLOGIA */}
                <ModalReceta
                  state= {estadoModal}
                  setState = {setEstadoModal}
                  title="Fonoaudiologia"
                > 
                  <div className='Receta'>
                    <div className='flex items-start text-lg pb-2'>
                        <h1 className='font-semibold pr-1'>Nombre: </h1>
                        <p>{post && post.contenido}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Rut:</h1>
                        <p>{post && post.title}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Edad: </h1>
                        <p> {post && post.edad} </p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Sexo:</h1>
                        <p>{post && post.category}</p>
                    </div>
                    <div className=''>
                        <div className='text-lg'>
                            <CommentFonoaudiologia postId={post._id} />
                        </div>
                    </div>
                  </div>
                </ModalReceta>
              </div>
            </div>
            <CommentSection postId={post._id}/>
          </div>
        </div>
      </main>
    </div>
  );
}