import { Link } from 'react-router-dom';
import { Card } from "flowbite-react";
import ImageCard from "/src/assets/patient_8638075.png";

export default function PostCard({ post }) {
  return (
    <div className='group relative w-full rounded-lg sm:w-[300px]'>
      <Link to={`/post/${post.slug}`}>
        <Card className="max-w-sm hover:bg-teal-500/30 duration-500	">
          <div className="flex flex-col items-center pb-10">
            <img
              alt="Bonnie image"
              height="96"
              src={ImageCard}
              width="96"
              className="mb-3 rounded-full shadow-lg"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{post.contenido}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">{post.title}</span>
            <div className="mt-4 flex space-x-3 lg:mt-6">
              <a
                href="#"
                className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              >
                Ver paciente
              </a>
            </div>
          </div>
        </Card>
      </Link>
    </div>

    // <div className='group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all'>
    //   <Link to={`/post/${post.slug}`}>
    //     <img
    //       src={post.image}
    //       alt='post cover'
    //       className='h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20'
    //     />
    //   </Link>
    //   <div className='p-3 flex flex-col gap-2'>
    //     <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
    //     <span className='italic text-sm'>{post.contenido}</span>
    //     <Link
    //       to={`/post/${post.slug}`}
    //       className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
    //     >
    //       Ver Paciente
    //     </Link>
    //   </div>
    // </div>
  );
}
