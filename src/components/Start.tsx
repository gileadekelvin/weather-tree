import { db } from '@/db';
import { useEffect } from 'react';
import data from '../data/start.json';
import { useNavigate } from 'react-router-dom';

const Start = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const startData = async () => {
      await db.cities.bulkAdd(data);
    };

    startData()
      .then(() => navigate('/'))
      .catch((err) => {
        console.error(err);
        navigate('/');
      });
  }, [navigate]);

  return <div>loading...</div>;
};

export default Start;
