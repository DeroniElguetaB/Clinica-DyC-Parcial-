import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import './Receta/receta.css'
import { fadeIn } from '../variants';
import {motion} from "framer-motion"

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div className="bg-cover bg-center flex items-center justify-center imghome home">
      <div className="flex flex-col gap-6 p-6 px-3 max-w-6xl mx-auto text-center">
        <motion.h1 
        variants={fadeIn("down", 0.9)} 
        initial="hidden" 
        whileInView={"show"} 
        viewport={{once: false, amount: 0.7}} 
        className='text-white text-3xl font-bold lg:text-6xl'>Somos DyC Coloproctologia</motion.h1>
        <motion.p 
        variants={fadeIn("up", 0.9)} 
        initial="hidden" 
        whileInView={"show"} 
        viewport={{once: false, amount: 0.7}} 
        className='text-white text-xs sm:text-sm'>
          Nuestra sociedad dedicada a la investigacion de la medicina actual
        </motion.p>
      </div>
      {/* <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div> */}

      {/* <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div> */}
    </div>
  );
}
