import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardComp from '../components/DashboardComp';
import Header from '../components/Header'
import CreatePost from './CreatePost';
import './Receta/receta.css'

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className='dashboard flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* perfil configuaraciones */}
      {tab === 'profile' && <DashProfile />}
      {/* recetas... */}
      {tab === 'posts' && <DashPosts />}
      {/* pacientes */}
      {tab === 'users' && <DashUsers />}
      {/* comentarios  */}
      {tab === 'comments' && <DashComments />}
      {/* vista dashboard */}
      {tab === 'dash' && <DashboardComp />}
    </div>
  );
}
