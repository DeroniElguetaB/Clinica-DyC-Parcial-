import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import NavbarIntern from './NavbarIntern';
import { BiPlus } from 'react-icons/bi';
import { fadeIn } from '../variants';
import {motion} from "framer-motion"
import '../pages/Receta/receta.css'

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='p-4 md:mx-auto arreglocoment'>
      <div className="flex justify-between">
        <motion.h1
          variants={fadeIn('right', 0.5)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.7 }}
          className='p-5 text-sm sm:text-xl font-semibold'>
          Pacientes
        </motion.h1>
        <motion.div
          variants={fadeIn('left', 0.5)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.7 }}
          >
        <NavbarIntern />
        </motion.div>
      </div>
      <div className="overflow-x-auto">
        {currentUser.isAdmin && userPosts.length > 0 ? (
          <>
            <Table hoverable className="min-w-full shadow-md overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
              <Table.Head className='text-teal-700 border-1'>
                <Table.HeadCell>Nombre</Table.HeadCell>
                <Table.HeadCell>Rut</Table.HeadCell>
                <Table.HeadCell>Edad</Table.HeadCell>
                <Table.HeadCell>Sexo</Table.HeadCell>
                <Table.HeadCell>Creado el</Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
              </Table.Head>
              {userPosts.map((post) => (
                <Table.Body key={post._id} className="divide-y ">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-teal-800/10">
                    <Table.Cell className="font-medium text-gray-900 dark:text-white">
                      <Link to={`/post/${post.slug}`}>
                        {post.contenido}
                      </Link>
                    </Table.Cell>
                    <Table.Cell className="">
                      <Link to={`/post/${post.slug}`}>
                        {post.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell className="">
                      <Link to={`/post/${post.slug}`}>
                        {post.edad}
                      </Link>
                    </Table.Cell>
                    <Table.Cell className="">
                      <Link to={`/post/${post.slug}`}>
                        {post.category}
                      </Link>
                    </Table.Cell>
                    <Table.Cell className="">
                      <Link to={`/post/${post.slug}`}>
                        {new Date(post.updatedAt).toLocaleDateString()}
                      </Link>
                    </Table.Cell>
                    <Table.Cell className="">
                      <Link
                        to={`/post/${post.slug}`}
                        className="text-teal-500 hover:underline"
                      >
                        Ver
                      </Link>
                    </Table.Cell>
                    <Table.Cell className="">
                      <Link
                        className="text-teal-500 hover:underline"
                        to={`/update-post/${post._id}`}
                      >
                        <span>Editar</span>
                      </Link>
                    </Table.Cell>
                    <Table.Cell className="">
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setPostIdToDelete(post._id);
                        }}
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                      >
                        Eliminar
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
            {showMore && (
              <button
                onClick={handleShowMore}
                className="w-full text-teal-500 self-center text-sm py-7"
              >
                Mostrar más
              </button>
            )}
          </>
        ) : (
          <p>No hay un registro de pacientes aún</p>
        )}
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Esta por eliminar este paciente completamente del registro
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleDeletePost}>
                  Sí, eliminar
                </Button>
                <Button color="gray" onClick={() => setShowModal(false)}>
                  No, cancelar
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <Link 
        to={'/create-post'}
        >
        <button class="inline-flex items-center justify-center w-16 h-16 mr-2 text-indigo-100 transition-colors duration-150 bg-teal-600 rounded-full focus:shadow-outline hover:bg-teal-800 fixed bottom-8 right-12">
          <svg class="w-6 h-6 fill-current" viewBox="0 0 16 17">
            <BiPlus></BiPlus>
          </svg>
        </button>
      </Link>
    </div>
  );
}
