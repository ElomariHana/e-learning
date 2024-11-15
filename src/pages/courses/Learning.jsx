import React, { useEffect, useState, useCallback} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { SiSololearn } from "react-icons/si";
import ReactPlayer from "react-player";
import { FaPlayCircle } from "react-icons/fa";
import './learning.scss'

const Learning = () => {
    const { courseId } = useParams();
    const [lessons, setLessons] = useState([]);
    const [course, setCourse] = useState([]);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState('');

    const fetchLessons = useCallback(async () => {
      try {
        const token = localStorage.getItem('access_token');
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/courses/lessons/${courseId}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });
            setLessons(response.data.data);
      } catch (error) {
        console.error('Error fetching Data:', error);
      }
    }, [courseId]); 
    const fetchCourse = useCallback(async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/courses/${courseId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching Data:', error);
      }
    }, [courseId]); 



        const handleLessonClick = (videoUrl) => {
          setSelectedVideoUrl(videoUrl);
          };

    useEffect(() => {
        fetchLessons();
        fetchCourse();
    },[fetchLessons, fetchCourse]);

  return (
    <div className='elearning__tuto'>
        <div className='elearning__tuto__heading'>
        <ReactPlayer
        //url="https://www.youtube.com/watch?v=bj-Yfakjllc&list=PLIFyRwBY_4bRLmKfP1KnZA6rZbRHtxmXi"
                  url={selectedVideoUrl ? `${process.env.REACT_APP_API_STORAGE_URL}/my_files/${selectedVideoUrl}` : lessons.length > 0 
                  ? `${process.env.REACT_APP_API_STORAGE_URL}/my_files/${lessons[0].video_url}` 
                  : ''}
                  controls
                  width="100%"
                  height="350px"
                />
        </div>
        <div className='elearning__tuto-content'>
            <div className='elearning__tuto-content__list'>
            {lessons.map((lesson, index) => (
                <div key={index} className='elearning__tuto-content__list-card' onClick={() => {handleLessonClick(lesson.video_url)}}>
                    <div className='list'>
                    <FaPlayCircle style={{marginRight: '1rem', color: '#17bf9e' }} />
                    <pre>{lesson.title}</pre>
                    </div>
                    <p className='lessons_header'>{lesson.video_duration}</p>
                </div>
            ))}
            </div>
            <div className='elearning__tuto-content__video'>
                <SiSololearn style={{ color: '#17bf9e', fontSize: '20px', marginRight: '5px', marginBottom: '1rem', marginTop: '0.75rem' }}/> NetSecCloud
                <h4>{course.title}</h4>
                <p>{course.description}</p>
            </div>
        </div>
    </div>
  )
}

export default Learning
