import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { MdModeEdit } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { IoCloseOutline } from 'react-icons/io5';
import { IoMdCloudDownload } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NoDataFound } from '../../components'
import { MdOutlinePlayLesson } from "react-icons/md";
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import './Lessons.scss';

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  //const [courses, setCourses] = useState([]);
  const { courseId } = useParams();
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);


  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1; // ReactPaginate is 0-indexed
    setCurrentPage(selectedPage);
  };


  const TABLE_HEADS = [
    "Position",
    "Title",
    "Description",
    "Video Duration",
    "Video",
    "action",
  ];
  // Inside your component
const fetchLessons = useCallback(async (page = 1) => {
  try {
    const token = localStorage.getItem('access_token');
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/courses/lessons/${courseId}?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    setLessons(response.data.data);
    setPageCount(response.data.last_page);
  } catch (error) {
    console.error('Error fetching Data:', error);
  }
}, [courseId]);

 /* const fetchLessons = async (page = 1) => {
    try {
        // Retrieve token from local storage
        const token = localStorage.getItem('access_token');
  
        // Make API request to fetch courses
        const response = await axios.get(`http://localhost:8000/api/courses/lessons/${courseId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setLessons(response.data.data);
        setPageCount(response.data.last_page);
      } catch (error) {
        console.error('Error fetching Data:', error);
      }
    } ;*/

    /*const fetchCourses = async () => {
      try {
          // Retrieve token from local storage
          const token = localStorage.getItem('access_token');
    
          // Make API request to fetch courses
          const response = await axios.get('http://localhost:8000/api/courses', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          setCourses(response.data.data);
        } catch (error) {
          console.error('Error fetching Data:', error);
        }
      } ;*/
    
      useEffect(() => {
        fetchLessons(currentPage);
        //fetchCourses();
      },[fetchLessons, currentPage]);

    
  const [modalState, setModalState] = useState({
    isOpen: false,
    id: null,
    position: null,
    course_id: courseId,
    title: '',
    description: '',
    video_url: null,
    video_duration: null,
    errors: {},
  });

  const openModal = (lesson = {}) => {
    setModalState({
      isOpen: true,
      id: lesson.id || null,
      position: lesson.position || null,
      course_id: lesson.course?.id || null,
      title: lesson.title || '',
      description: lesson.description || '',
      video_duration: lesson.video_duration || null,
      video_url: lesson.video_url || '',
      errors: {},
    });
    setModalState((prevState) => ({
      ...prevState,
      isOpen: true,
    }));
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      position: null,
      title: '',
      description: '',
      course_id: null,
      video_url: null,
      video_duration: null,
      errors: {},
    });
  };

  const handleInputChange = (e) => {
    const { id, value, files } = e.target;
  
    if (id === 'video_url' && files.length > 0) {
      const videoFile = files[0];
      const videoURL = URL.createObjectURL(videoFile);
      setModalState((prevState) => ({
        ...prevState,
        video_url: videoFile,
        video_preview: videoURL,
      }));
    } else {
      setModalState((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };
  

  const handleSubmit = async (e) => {

    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {

      try {
        const token = localStorage.getItem('access_token');
        const url = modalState.id ? `${process.env.REACT_APP_API_BASE_URL}lessons/${modalState.id}` : `${process.env.REACT_APP_API_BASE_URL}/lessons`;
        const method = 'post';
        let data;
        let headers = {
          'Authorization': `Bearer ${token}`,
        };
          // Use FormData for POST requests (to include file uploads)
          data = new FormData();
          data.append('course_id', courseId);
          data.append('title', modalState.title);
          data.append('description', modalState.description);
          data.append('video_duration', modalState.video_duration);
          data.append('video_url', modalState.video_url);
          data.append('position', modalState.position);

          headers['Content-Type'] = 'multipart/form-data';

      await axios({
          method,
          url,
          data,
          headers,
      });
        closeModal();
        toast.success('Lesson added successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          fetchLessons();
      } catch (error) {
        toast.error('Lesson addition failed.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          closeModal();
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
    if (!courseId) {
      errors.course_id = 'Course is required';
    }
    if (!modalState.video_url) {
      errors.video_url = 'Url video is required';
    }
    if (!modalState.video_duration) {
      errors.video_duration = 'Video duration is required';
    }
    if (!modalState.position) {
      errors.position = 'Position is required';
    }
    return errors;
  };

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
  const handleDelete = async (lessonId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.delete(`http://localhost:8000/api/lessons/${lessonId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
     if(response.data.success) {
      fetchLessons();
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
      toast.error('Error Deleting Lessons', {
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


  return (
    <div className="elearning__lessons">
      <div className="elearning__lessons-header">
        <div className="elearning__lessons-header__title">
          <h4>Lessons</h4>
          <p>Manage Your Lessons.</p>
        </div>
        <div>
          <button
            className="elearning__lessons-header_button"
            type="button"
            onClick={openModal}
          >
            Add new Lessons
          </button>
        </div>
      </div>
      <div className='elearning_courses-content'>
        {lessons.length === 0 ?
        (
          <NoDataFound/>
        ):
        (
          <section className="content-area-table">
          <div className="data-table-info">
          </div>
          <div className="data-table-diagram">
            <table>
              <thead>
              {TABLE_HEADS?.map((th, index) => (
              <th key={index}>{th}</th>
            ))}
              </thead>
              <tbody>
              {lessons?.map((dataItem) => {
            return (
              <tr key={dataItem.id}>
                <td>#{dataItem.position}</td>
                <td>{dataItem.title}</td>
                <td>{dataItem.description}</td>
                <td>{dataItem.video_duration}</td>
                <td>
                <MdOutlinePlayLesson style={{ color: 'rgb(67, 66, 66)', fontSize: '30px'}}/>
                </td>
                <td>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '80px' }}>
          <button  style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <MdModeEdit onClick={() => openModal(dataItem)} style={{ color: '#007bff'}}/>
          </button>
          <button onClick={() => handleDelete(dataItem.id)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
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
        )
      }
      </div>
      <Modal
        isOpen={modalState.isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Lesson Modal"
        ariaHideApp={false}
        >
        <div className="manage__courses_content">
          <div className="modal__header">
            <h4>Create New Lesson</h4>
            <IoCloseOutline onClick={closeModal} />
          </div>
          <div className="separated"></div>
          <div className="modal__body">
            <form className="modal__form">
            <div className="input-field">
                <label htmlFor="position" className="input-label">
                  Position
                </label>
                <input
                  type="text"
                  className="input-control"
                  id="position"
                  placeholder="position"
                  autoComplete="off"
                  value={modalState.position}
                  onChange={handleInputChange}
                  required
                />
                {modalState.errors.position && (
                  <p className="error-message">
                    *{modalState.errors.position}
                  </p>
                )}
              </div>
              <div className="input-field">
                <label htmlFor="title" className="input-label">
                  Title
                </label>
                <input
                  type="text"
                  className="input-control"
                  id="title"
                  placeholder="title"
                  autoComplete="off"
                  value={modalState.title}
                  onChange={handleInputChange}
                  required
                />
                {modalState.errors.title && (
                  <p className="error-message">*{modalState.errors.title}</p>
                )}
              </div>
              <div className="input-field">
                <label htmlFor="description" className="input-label">
                  Description
                </label>
                <input
                  type="text"
                  className="input-control"
                  id="description"
                  placeholder="description"
                  autoComplete="off"
                  value={modalState.description}
                  onChange={handleInputChange}
                  required
                />
                {modalState.errors.description && (
                  <p className="error-message">
                    *{modalState.errors.description}
                  </p>
                )}
              </div>
              <div className="input-field">
                <label htmlFor="video_duration" className="input-label">
                  Video Duration
                </label>
                <input
                  type="text"
                  className="input-control"
                  id="video_duration"
                  placeholder="video_duration"
                  autoComplete="off"
                  value={modalState.video_duration}
                  onChange={handleInputChange}
                  required
                />
                {modalState.errors.video_duration && (
                  <p className="error-message">
                    *{modalState.errors.video_duration}
                  </p>
                )}
              </div>
              <div
              className="upload__image"
              onClick={() => document.querySelector('.input_field').click()}
            >
              <input
                type="file"
                accept="video/*"
                id="video_url"
                className="input_field"
                hidden
                onChange={handleInputChange}
                required
              />
              {modalState.video_preview ? (
                <MdOutlinePlayLesson style={{ color: 'rgb(67, 66, 66)', fontSize: '30px'}}/>
                ) : (
          <>
            <IoMdCloudDownload style={{ color: '#1475cf', fontSize: '50px' }} />
            <p>Browse Files to upload</p>
          </>
        )}
        
            </div>
            </form>
          </div>
          <div className='modal__footer'>
          <button type='button' className='cancel' onClick={closeModal}>Cancel</button>
          <button type='submit' className='valide' onClick={handleSubmit}>Apply</button>
        </div>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Lessons;
