import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dokter() {
  const URL = import.meta.env.VITE_BASE_URL;

  const [dokters, setDokters] = useState([]);

  async function fetchDokters() {
    try {
      const response = await axios.get(`${URL}/api/v1/dokter?page=1&limit=4`);
      setDokters(response.data.data);
    } catch (error) {
      console.error('Error fetching dokters:', error.message);
    } finally {
      console.log('Request complete, whether successful or not.');
    }
  }

  console.log(dokters);
  useEffect(() => {
    fetchDokters();
  }, []); // Empty dependency array ensures useEffect runs once after initial render

  function createCard(dokter) {
    return (
      <div key={dokter.id} className='col-12 col-md-12 col-lg-3'>
        <div
          className='card text-center bg-white pb-2 shadow rounded'
          data-aos='zoom-in'
          data-aos-duration='1000'
        >
          <img
            src={dokter.image}
            className='card-img-top'
            alt={dokter.name}
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <div className='card-body'>
            <h5 className='card-title'>{dokter.name}</h5>
            <p className='card-text'>{dokter.category}</p>
            <Link
              to={`/dokter/${dokter._id}`}
              className='text-decoration-none fw-medium'
            >
              <button className='btn btn-primary mt-auto'>Chat Dokter</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section id='dokter' className='dokter section-padding'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='section-header text-center pb-5'>
                <h2>Temui Dokter Kami</h2>
                <p>Dokter kesehatan dengan dokter profesional</p>
              </div>
            </div>
          </div>
          <div className='row list-dokter'>{dokters.map(createCard)}</div>
          <div className='text-center mt-5'>
            <Link to='/dokter'>
              <button className='btn btn-outline-primary text-center'>
                Lihat Lebih Banyak
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dokter;
