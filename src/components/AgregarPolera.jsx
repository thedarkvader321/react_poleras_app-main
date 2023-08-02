import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import Header from './Header';

export const AgregarPolera = () => {
  const [nombre, setNombre] = useState('');
  const [talla, setTalla] = useState('');
  const [nombreColegio, setNombreColegio] = useState('');
  const [imagen, setImagen] = useState(null);
  const [poleras, setPoleras] = useState([]);

  useEffect(() => {
    obtenerPoleras();
  }, []);

  useEffect(() => {
    // Guardar los datos actualizados en el almacenamiento local al cambiar el estado de poleras
    localStorage.setItem('poleras', JSON.stringify(poleras));
  }, [poleras]);

  useEffect(() => {
    // Cargar los datos desde el almacenamiento local al iniciar el componente
    const data = localStorage.getItem('poleras');
    if (data) {
      setPoleras(JSON.parse(data));
    }
  }, []);

  const handleChangeImagen = (e) => {
    const file = e.target.files[0];
    setImagen(file);
  };

  const obtenerURLImagen = async (poleraId) => {
    const storageRef = ref(storage, `poleras/${poleraId}`);
    try {
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error al obtener la URL de la imagen:', error);
      return null;
    }
  };

  const obtenerPoleras = async () => {
    const querySnapshot = await getDocs(collection(db, 'poleras'));
    const polerasData = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const imagenURL = await obtenerURLImagen(doc.id);
        return { ...data, imagenURL };
      })
    );
    setPoleras(polerasData);
  };

  const agregarPolera = async () => {
    const poleraData = {
      nombre: nombre,
      talla: talla,
      nombre_colegio: nombreColegio,
    };

    try {
      const docRef = await addDoc(collection(db, 'poleras'), poleraData);
      const poleraId = docRef.id;

      if (imagen) {
        const storageRef = ref(storage, `poleras/${poleraId}`);
        const uploadTask = uploadBytesResumable(storageRef, imagen);

        uploadTask.on(
          'state_changed',
          (snapshot) => {},
          (error) => {
            console.error('Error al subir la imagen:', error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('URL de descarga de la imagen:', downloadURL);

            // Actualizar el estado de las poleras para incluir la URL de descarga de la imagen
            setPoleras((prevPoleras) => [
              ...prevPoleras,
              { ...poleraData, imagenURL: downloadURL },
            ]);
          }
        );
      } else {
        // Si no se subió una imagen, simplemente agregamos la polera sin la URL de la imagen
        setPoleras((prevPoleras) => [...prevPoleras, poleraData]);
      }

      console.log('Polera agregada correctamente a la colección "poleras"');
    } catch (error) {
      console.error('Error al agregar la polera:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="contenido">
        <h2 className="titulo">Agregar Polera</h2>
        <div className="container">
          <div className='container'>
            <label>Nombre de la polera:</label>
            <input type='text' value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <label>Talla:</label>
            <input type='text' value={talla} onChange={(e) => setTalla(e.target.value)} />
            <label>Nombre del colegio:</label>
            <input type='text' value={nombreColegio} onChange={(e) => setNombreColegio(e.target.value)} />
            <label>Imagen de la polera:</label>
            <input type='file' onChange={handleChangeImagen} />
            <button className='btn-agregar' onClick={agregarPolera}>Agregar Polera</button>
          </div>
        </div>
      </div>
      <div>
        <h3 className="titulo">Poleras existentes:</h3>
        <table className="poleras-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Talla</th>
              <th>Colegio</th>
              <th>Imagen</th>
            </tr>
          </thead>
          <tbody>
            {poleras.map((polera, index) => (
              <tr key={index}>
                <td>{polera.nombre}</td>
                <td>{polera.talla}</td>
                <td>{polera.nombre_colegio}</td>
                <td>
                  {polera.imagenURL && (
                    <img src={polera.imagenURL} alt={polera.nombre} style={{ width: '100px' }} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
