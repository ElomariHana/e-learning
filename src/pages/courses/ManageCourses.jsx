import React, {useEffect, useState} from 'react'
import axios from "axios";
import Modal from 'react-modal';
import ReactPaginate from 'react-paginate';
import { IoCloseOutline } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { IoMdCloudDownload } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NoDataFound } from '../../components'
import { MdPlaylistPlay } from "react-icons/md";
import { useNavigate } from 'react-router-dom'; 

import './AllCourses.scss'

const ManageCourses = () => {
  const navigate = useNavigate();
  const[courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);


  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1; 
    setCurrentPage(selectedPage);
  };

  const TABLE_HEADS = [
    "Title",
    "Description",
    "Price",
    "Action",
  ];
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: '50%',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  
  const [modalState, setModalState] = useState({
    isOpen: false,
    id: null,
    title: '',
    description: '',
    price: null,
    image: null,
    file: null,
    errors: {},
  });

  const openModal = (course = null) => {
    if (course) {
      setModalState({
        isOpen: true,
        id: course.id,
        title: course.title,
        description: course.description,
        price: course.price,
        image: course.image,
        file: null,
        errors: {},
      });
    } else {
      setModalState({
        isOpen: true,
        courseId: null,
        title: '',
        description: '',
        price: '',
        image: '',
        file: null,
        errors: {},
      });
    }
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      title: '',
      description: '',
      price: '',
      image: '',
      file: null,
      errors: {},
    });
  };

  const handleInputChange = (e) => {
    const { id, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setModalState((prevState) => ({
          ...prevState,
          image: reader.result, // Store the base64 encoded image
          file: file,
        }));
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
    setModalState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }
  };
  const isFormValid = () => {
    const { title, description, price, image } = modalState;
    return title && description && price && image;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
        try {
            const token = localStorage.getItem('access_token');
            const url = modalState.id 
                ? `${process.env.REACT_APP_API_BASE_URL}/courses/${modalState.id}` 
                : `${process.env.REACT_APP_API_BASE_URL}/courses`;
            const method = 'post';

            let data;
            let headers = {
                'Authorization': `Bearer ${token}`,
            };
             data = new FormData();
             data.append('title', modalState.title);
             data.append('description', modalState.description);
             data.append('price', modalState.price);
             if (modalState.file) {
                 data.append('image', modalState.file);
             }
             await axios({
              method,
              url,
              data,
              headers,
          });

            closeModal();
            fetchCourses();
            toast.success(`Course ${method === 'post' ? 'added' : 'updated'} successfully!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            toast.error('Error! Check the server.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    } else {
        setModalState((prevState) => ({
            ...prevState,
            errors: validationErrors,
        }));
    }
};



  const validateForm = () => {
    const errors = {};
    if (!modalState.title) {
      errors.title = 'Title is required';
    }
    if (!modalState.description) {
      errors.description = 'Description is required';
    }
    if (!modalState.price) {
      errors.price = 'Price is required';
    }
    if (!modalState.image) {
      errors.image = 'Image is required';
    }
    return errors;
  };

  
    const handleDelete = async (courseId) => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/courses/${courseId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
       if(response.data.success) {
        fetchCourses();
        toast.success('Successfully Deleted!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        }
      } catch (error) {
        toast.error('Error deleting course', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
    };
    const showLessons = (courseId) => {
      navigate(`/admin/lessons/${courseId}`)

    };
    const fetchCourses = async (page = 1) => {
      try {
          // Retrieve token from local storage
          const token = localStorage.getItem('access_token');
    
          // Make API request to fetch courses
          const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/courses?page=${page}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          setCourses(response.data.data);
          setPageCount(response.data.last_page);
        } catch (error) {
          console.error('Error fetching Data:', error);
        }
      } ;
  useEffect(() => {
    fetchCourses(currentPage);
  },[currentPage]);
  return (
    <div>
      <div className='elearning_courses-header'>
        <div className='elearning_profile-header__title'>
          <h4>Manage Courses</h4>
        </div>
        <div>
          <button className='elearning_courses-header_button' type='button' onClick={openModal}>Add New Course</button>
        </div>
      </div>
     
      <div className='elearning_courses-content'>
      {courses.length === 0 ? 
        (
          <NoDataFound/>
        ) :
        (
      <section className="content-area-table">
        <div className="data-table-diagram">
          <table>
            <thead>
              <tr>
                {TABLE_HEADS?.map((th, index) => (
                <th key={index}>{th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courses?.map((dataItem) => {
                return (
                <tr key={dataItem.id}>
                <td>{dataItem.title}</td>
                <td>{dataItem.description}</td>
                <td>${dataItem.price}</td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '80px' }}>
                  <button  onClick={() => showLessons(dataItem.id)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                        <MdPlaylistPlay  style={{ color: '#0fa587', fontSize: '25'}}/>
                        </button>
                    <button  style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                      <MdModeEdit onClick={() => openModal(dataItem)} style={{ color: '#007bff'}}/>
                      </button>
                      <button  onClick={() => handleDelete(dataItem.id)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                        <TiDelete  style={{ color: '#dc3545'}}/>
                        </button>
                        </div>
                        </td>
                        </tr>
                        );
                        })}
             </tbody>
             </table>
             </div>
             <div className="pagination-container">
             <ReactPaginate
             previousLabel="<"
             nextLabel=">"
             breakLabel="..."
             breakClassName={"break-me"}
             pageCount={pageCount}
             marginPagesDisplayed={2}
             pageRangeDisplayed={5}
             onPageChange={handlePageClick}
             containerClassName={"pagination"}
             subContainerClassName={"pages pagination"}
             activeClassName={"active"}
              />
              </div>
             </section>
              )}            
             </div>
            
             <Modal
             isOpen={modalState.isOpen}
             onRequestClose={closeModal}
             style={customStyles}
             contentLabel="Example Modal"
             ariaHideApp={false}
             //className={}
             >
              <div className="manage__courses_content">
                <div className="modal__header">
                  <h4>Create New Course</h4>
                  <IoCloseOutline onClick={closeModal} />
                </div>
                <div className="separated"></div>
                <div className="modal__body">
                  <form className="modal__form">
                    <div className="input-field">
                      <label htmlFor="title" className="input-label">Title</label>
                      <input
                type="text"
                className="input-control"
                id="title"
                placeholder="Title"
                autoComplete="off"
                value={modalState.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="description" className="input-label">
                Description
              </label>
              <input
                type="text"
                className="input-control"
                id="description"
                placeholder="Description"
                autoComplete="off"
                value={modalState.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="price" className="input-label">
                Price
              </label>
              <input
                type="text"
                className="input-control"
                id="price"
                placeholder="$"
                autoComplete="off"
                value={modalState.price}
                onChange={handleInputChange}
                required
              />
              {modalState.errors.price && (
                <p className="error-message">
                  *{modalState.errors.price}
                </p>
              )}
            </div>
            <div
              className="upload__image"
              onClick={() => document.querySelector('.input_field').click()}
            >
              <input
                type="file"
                accept="image/*"
                className="input_field"
                hidden
                onChange={handleInputChange}
                required
              />
              {modalState.image ? (
                <img src={modalState.image} alt="img" width={50} height={50} />
              ) : (
                <>
                  <IoMdCloudDownload style={{ color: '#1475cf', fontSize: '30px' }} />
                  <p>Browse Files to upload</p>
                </>
              )}
            </div>
          </form>
        </div>
        <div className="modal__footer">
          <button type="button" className="cancel" onClick={closeModal}>
            Cancel
          </button>
          <button type="submit" className="valide" onClick={handleSubmit} disabled={!isFormValid()}>
            Apply
          </button>
        </div>
      </div>
    </Modal>


    <ToastContainer />
    </div>
  )}

export default ManageCourses
