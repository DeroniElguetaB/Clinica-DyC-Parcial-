import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { BiPlus } from 'react-icons/bi';
import { fadeIn } from '../variants';
import { motion } from 'framer-motion';
import NavbarIntern from './NavbarIntern';

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [postsMap, setPostsMap] = useState({});
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');

  useEffect(() => {
    const fetchCommentsAndPosts = async () => {
      try {
        const commentsRes = await fetch(`/api/comment/getcomments`);
        const commentsData = await commentsRes.json();

        const postsRes = await fetch(`/api/post/getposts`);
        const postsData = await postsRes.json();

        if (commentsRes.ok && postsRes.ok) {
          setComments(commentsData.comments);

          const postsMap = postsData.posts.reduce((map, post) => {
            map[post._id] = post.contenido;
            return map;
          }, {});
          
          setPostsMap(postsMap);

          if (commentsData.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchCommentsAndPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const truncateContent = (content, wordLimit) => {
    const words = content.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : content;
  };

  return (
    <div className='p-4 md:mx-auto'
    >
      <div className='flex justify-between'>
        <motion.h1
            variants={fadeIn('right', 0.5)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.7 }}
        className='p-5 text-sm sm:text-xl font-semibold'>Recetas</motion.h1>
        <motion.div
          variants={fadeIn('left', 0.5)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.7 }}
        >
          <NavbarIntern />
      </motion.div>
      </div>

      <div className='overflow-x-auto'>
        {currentUser.isAdmin && comments.length > 0 ? (
          <>
            <Table hoverable className='shadow-md overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
              <Table.Head className='text-teal-700 border-1'>
                <Table.HeadCell>Creado el</Table.HeadCell>
                <Table.HeadCell>Paciente</Table.HeadCell>
                <Table.HeadCell>Diagnostico</Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
                {/* <Table.HeadCell>Id receta</Table.HeadCell> */}
              </Table.Head>
              {comments.map((comment) => (
                <Table.Body className='divide-y' key={comment._id}>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-teal-800/10'>
                    <Table.Cell className="">
                      {new Date(comment.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell className="">{postsMap[comment.postId]}</Table.Cell>
                    {/* <Table.Cell>{comment.postId}</Table.Cell> */}
                    <Table.Cell className="">{truncateContent(comment.content, 6)}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setCommentIdToDelete(comment._id);
                        }}
                        className='font-medium text-red-500 hover:underline cursor-pointer'
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
                className='w-full text-teal-500 self-center text-sm py-7'
              >
                Mostrar mas
              </button>
            )}
          </>
        ) : (
          <p>No hay un registro de recetas aun</p>
        )}
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size='md'
        >
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                Esta por eliminar este paciente completamente del registro
              </h3>
              <div className='flex justify-center gap-4'>
                <Button color='failure' onClick={handleDeleteComment}>
                  Si, eliminar
                </Button>
                <Button color='gray' onClick={() => setShowModal(false)}>
                  No, cancelar
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}


// import { Modal, Table, Button } from 'flowbite-react';
// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { HiOutlineExclamationCircle } from 'react-icons/hi';
// import { Link } from 'react-router-dom';
// import { BiPlus } from 'react-icons/bi';
// import { fadeIn } from '../variants';
// import {motion} from "framer-motion"

// export default function DashComments() {
//   const { currentUser } = useSelector((state) => state.user);
//   const [comments, setComments] = useState([]);
//   const [postsMap, setPostsMap] = useState({});
//   const [showMore, setShowMore] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [commentIdToDelete, setCommentIdToDelete] = useState('');

//   useEffect(() => {
//     const fetchCommentsAndPosts = async () => {
//       try {
//         const commentsRes = await fetch(`/api/comment/getcomments`);
//         const commentsData = await commentsRes.json();

//         const postsRes = await fetch(`/api/post/getposts`);
//         const postsData = await postsRes.json();

//         if (commentsRes.ok && postsRes.ok) {
//           setComments(commentsData.comments);

//           const postsMap = postsData.posts.reduce((map, post) => {
//             map[post._id] = post.contenido;
//             return map;
//           }, {});
          
//           setPostsMap(postsMap);

//           if (commentsData.comments.length < 9) {
//             setShowMore(false);
//           }
//         }
//       } catch (error) {
//         console.log(error.message);
//       }
//     };

//     if (currentUser.isAdmin) {
//       fetchCommentsAndPosts();
//     }
//   }, [currentUser._id]);

//   const handleShowMore = async () => {
//     const startIndex = comments.length;
//     try {
//       const res = await fetch(
//         `/api/comment/getcomments?startIndex=${startIndex}`
//       );
//       const data = await res.json();
//       if (res.ok) {
//         setComments((prev) => [...prev, ...data.comments]);
//         if (data.comments.length < 9) {
//           setShowMore(false);
//         }
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const handleDeleteComment = async () => {
//     setShowModal(false);
//     try {
//       const res = await fetch(
//         `/api/comment/deleteComment/${commentIdToDelete}`,
//         {
//           method: 'DELETE',
//         }
//       );
//       const data = await res.json();
//       if (res.ok) {
//         setComments((prev) =>
//           prev.filter((comment) => comment._id !== commentIdToDelete)
//         );
//         setShowModal(false);
//       } else {
//         console.log(data.message);
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   return (
//     <motion.div
//     variants={fadeIn("right", 0.5)} 
//         initial="hidden" 
//         whileInView={"show"} 
//         viewport={{once: false, amount: 0.7}} 
//     className='p-4 md:mx-auto recetasdash'>
//       <div>
//         <h1 className='p-5 text-sm sm:text-xl font-semibold'>
//           Recetas
//         </h1>
//       </div>
//       <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
//         {currentUser.isAdmin && comments.length > 0 ? (
//           <>
//             <Table hoverable className='shadow-md'>
//               <Table.Head>
//                 <Table.HeadCell>Creado el</Table.HeadCell>
//                 <Table.HeadCell>Paciente</Table.HeadCell>
//                 <Table.HeadCell>Diagnostico</Table.HeadCell>
//                 {/* <Table.HeadCell>Id receta</Table.HeadCell> */}
//               </Table.Head>
//               {comments.map((comment) => (
//                 <Table.Body className='divide-y' key={comment._id}>
//                   <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
//                     <Table.Cell>
//                       {new Date(comment.updatedAt).toLocaleDateString()}
//                     </Table.Cell>
//                     <Table.Cell>{postsMap[comment.postId]}</Table.Cell>
//                     {/* <Table.Cell>{comment.postId}</Table.Cell> */}
//                     <Table.Cell>{comment.content}</Table.Cell>
                   
//                       {/* <Table.Cell>
//                       <span
//                         onClick={() => {
//                           setShowModal(true);
//                           setCommentIdToDelete(comment._id);
//                         }}
//                         className='font-medium text-red-500 hover:underline cursor-pointer'
//                       >
//                         Eliminar
//                       </span>
//                     </Table.Cell> */}
//                   </Table.Row>
//                 </Table.Body>
//               ))}
//             </Table>
//             {showMore && (
//               <button
//                 onClick={handleShowMore}
//                 className='w-full text-teal-500 self-center text-sm py-7'
//               >
//                 Mostrar mas
//               </button>
//             )}
//           </>
//         ) : (
//           <p>No hay un registro de recetas aun</p>
//         )}
//         <Modal
//           show={showModal}
//           onClose={() => setShowModal(false)}
//           popup
//           size='md'
//         >
//           <Modal.Header />
//           <Modal.Body>
//             <div className='text-center'>
//               <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
//               <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
//                 Esta por eliminar este paciente completamente del registro
//               </h3>
//               <div className='flex justify-center gap-4'>
//                 <Button color='failure' onClick={handleDeleteComment}>
//                   Si, eliminar
//                 </Button>
//                 <Button color='gray' onClick={() => setShowModal(false)}>
//                   No, cancelar
//                 </Button>
//               </div>
//             </div>
//           </Modal.Body>
//         </Modal>
//       </div>
//     </motion.div>
//   );
// }