import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
} from 'react-icons/hi';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import NavbarIntern from './NavbarIntern'
import { SolarUsersGroupRoundedBroken } from './Icons/patientsLogo2';
import { BsArrowDownLeft, BsArrowDownRight, BsArrowUpRight } from 'react-icons/bs';
import { fadeIn } from '../variants';
import {motion} from "framer-motion"

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/getusers?limit=5');
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getposts?limit=5');
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch('/api/comment/getcomments?limit=5');
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);


  return (
    <div className='p-4 md:mx-auto'>
      {/* Boxes */}
      <motion.div
      variants={fadeIn("left", 0.5)} 
      initial="hidden" 
      whileInView={"show"} 
      viewport={{once: false, amount: 0.7}} 
      className='flex-wrap flex md:w-auto gap-10 justify-center'>
        {/* Box Users */}
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-80 w-full rounded-md border-2 border-teal-700/60'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md font-semibold '>
                Usuarios totales
              </h3>
              <p className='text-2xl'>{totalUsers}</p>
            </div>
            <SolarUsersGroupRoundedBroken className='text-white text-5xl p-3 shadow-lg bg-teal-600 rounded-full'/>
          </div>
          <div className='flex  gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className='text-gray-500'>Ultimo mes</div>
          </div>
        </div>
        {/* Box comments */}
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-80 w-full rounded-md border-2 border-teal-700/60'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md font-semibold '>
                Recetas totales
              </h3>
              <p className='text-2xl'>{totalComments}</p>
            </div>
            <HiAnnotation className='text-white bg-teal-600 rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex  gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className='text-gray-500'>Ultimo mes</div>
          </div>
        </div>
        {/* Box post */}
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-80 w-full rounded-md border-2 border-teal-700/60'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md font-semibold '>Pacientes totales</h3>
              <p className='text-2xl'>{totalPosts}</p>
            </div>
            <HiDocumentText className='text-white bg-teal-600 rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex  gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div className='text-gray-500'>Ultimo mes</div>
          </div>
        </div>
      </motion.div>
      {/* box pacientes recientes */}
      <motion.div
      variants={fadeIn("right", 0.5)} 
      initial="hidden" 
      whileInView={"show"} 
      viewport={{once: false, amount: 0.7}}  
      
      className='flex flex-wrap py-3 gap-12 mx-auto justify-center'>
        <div className='flex flex-col w-full md:w-80 border-2 border-teal-700/60 p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between p-3'>
            <h1 className='text-center p-2 font-semibold '>Usuarios</h1>
            <Button className='border-teal-700'>
              <Link to={'/dashboard?tab=users'}>Ver mas</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body key={user._id} className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt='user'
                        className='w-10 h-10 rounded-full bg-gray-500'
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        {/* <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between  p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent comments</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to={'/dashboard?tab=comments'}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            {comments &&
              comments.map((comment) => (
                <Table.Body key={comment._id} className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell className='w-96'>
                        <p className='line-clamp-2'>{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div> */}
        
        {/* box recetas recientes */}
        <div className='flex flex-col w-full md:w-auto border-2 border-teal-700/60 p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between p-3 font-semibold '>
            <h1 className='text-center p-2'>Pacientes mas recientes</h1>
            <Button >
              <Link to={'/dashboard?tab=posts'}>Ver mas</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Rut</Table.HeadCell>
              <Table.HeadCell>Paciente</Table.HeadCell>
              <Table.HeadCell>Sexo</Table.HeadCell>
            </Table.Head>
            {posts &&
              posts.map((post) => (
                <Table.Body key={post._id} className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell  className='w-52'>{post.title}</Table.Cell>
                    <Table.Cell className='w-72'>{post.contenido}</Table.Cell>
                    <Table.Cell className='w-12'>{post.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </motion.div>
    </div>
  );
}
