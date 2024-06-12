import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashSidebar from '../components/DashSidebar';
import { Link } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import DatePicker, {registerLocale} from "react-datepicker";
import { es } from 'date-fns/locale'
import "react-datepicker/dist/react-datepicker.css";

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    contenido: '',
    category: '',
    celular: '',
    celularemergencia: '',
    email: '',
    edad: '',
    direccion: '',
    sanguineo: '',
    content: ''
  });
  const [publishError, setPublishError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { postId } = useParams();

  const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      };

      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Algo salio mal');
    }
  };
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      <div className="flex gap-4 p-2 max-h-14	">
        <Link
            to="/dashboard?tab=posts"
            className="rounded-lg py-3 px-4 text-white bg-teal-600 hover:bg-teal-800"
          >
            <IoArrowBackOutline />
          </Link>
      </div>
      <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>Editar Paciente</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput
              type='text'
              placeholder='RUT'
              required
              id='title'
              className='flex-1'
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              value={formData.title}
            />
                      <TextInput
              type='text'
              placeholder='Nombre Completo'
              required
              id='contenido'
              className='flex-1'
              onChange={(e) =>
                setFormData({ ...formData, contenido: e.target.value })
              }
              value={formData.contenido}
            />
            <Select
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              value={formData.category}
            >
              <option value='uncategorized'>Sexo</option>
              <option value='Masculino'>Masculino</option>
              <option value='Femenino'>Femenino</option>
              <option value='Otro'>Otro</option>
            </Select>
            
          </div>
          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput
              type='text'
              placeholder='Celular'
              required
              id='celular'
              className='flex-1'
              onChange={(e) =>
                setFormData({ ...formData, celular: e.target.value })
              }
              value={formData.celular}
            />
                      <TextInput
              type='text'
              placeholder='Celular Emergencia'
              required
              id='celularemergencia'
              className='flex-1'
              onChange={(e) =>
                setFormData({ ...formData, celularemergencia: e.target.value })
              }
              value={formData.celularemergencia}
            />     
          </div>
          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          
            <TextInput
              type='text'
              placeholder='Email'
              required
              id='email'
              className='flex-1'
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
            />
            <div className=''>
                <DatePicker
                id='edad'
                className='flex-1 block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-md rounded-lg'
                showIcon
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><g fill="currentColor"><path d="M6.445 11.688V6.354h-.633A13 13 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61zm1.188-1.305c.047.64.594 1.406 1.703 1.406c1.258 0 2-1.066 2-2.871c0-1.934-.781-2.668-1.953-2.668c-.926 0-1.797.672-1.797 1.809c0 1.16.824 1.77 1.676 1.77c.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164c-.664 0-1.008-.45-1.05-.82zm2.953-2.317c0 .696-.559 1.18-1.184 1.18c-.601 0-1.144-.383-1.144-1.2c0-.823.582-1.21 1.168-1.21c.633 0 1.16.398 1.16 1.23"/><path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/></g></svg>}
                locale={es}
                selected={selectedDate}
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                placeholderText='dd/mm/aaaa'
                onChange={(date) => {
                  setSelectedDate(date);
                  setFormData({ ...formData, edad: date.toISOString().split('T')[0] });
                }}
                value={formData.edad}
                />
                <label className='flex text-sm'>Fecha de Nacimiento</label>
              </div>  
          </div>
          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput
              type='text'
              placeholder='Direccion'
              required
              id='direccion'
              className='flex-1'
              onChange={(e) =>
                setFormData({ ...formData, direccion: e.target.value })
              }
              value={formData.direccion}
              />
              <Select
              onChange={(e) =>
                setFormData({ ...formData, sanguineo: e.target.value })
              }
              value={formData.sanguineo}
            >
              <option value='uncategorized'>Sanguineo</option>
              <option value='A+'>A+</option>
              <option value='A-'>A-</option>
              <option value='B+'>B+</option>
              <option value='B-'>B-</option>
              <option value='AB+'>AB+</option>
              <option value='AB-'>AB-</option>
              <option value='AB+'>O+</option>
              <option value='AB-'>O-</option>
            </Select>
          </div>
          <h2>Informacion adicional del paciente</h2>
          {/* <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
            <FileInput
              type='file'
              accept='image/*'
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              type='button'
              gradientDuoTone='purpleToBlue'
              size='sm'
              outline
              onClick={handleUpdloadImage}
              disabled={imageUploadProgress}
            >
              {imageUploadProgress ? (
                <div className='w-16 h-16'>
                  <CircularProgressbar
                    value={imageUploadProgress}
                    text={`${imageUploadProgress || 0}%`}
                  />
                </div>
              ) : (
                'Upload Image'
              )}
            </Button>
          </div>
          {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>} */}
          <TextInput
            type='text'
            placeholder='Alergias, patologias, etc'
            id='content'
            value={formData.content}            
            required
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
          />
          <Button type='submit'>
            Guardar cambios
          </Button>
          {publishError && (
            <Alert className='mt-5' color='failure'>
              {publishError}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}
