import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage'; // Agrega estas importaciones
import { db, storage } from '../firebase';

export const MostrarPolera = () => {
  const [poleras, setPoleras] = useState(() => {
    const data = localStorage.getItem('poleras');
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    const obtenerPoleras = async () => {
      const querySnapshot = await getDocs(collection(db, 'poleras'));
      const polerasData = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          return { ...data, imagenURL: await obtenerURLImagen(doc.id) };
        })
      );
      setPoleras(polerasData);
      // Guardar los datos actualizados en el almacenamiento local
      localStorage.setItem('poleras', JSON.stringify(polerasData));
    };

    obtenerPoleras();
  }, []);

  const obtenerURLImagen = async (poleraId) => {
    // Lógica para obtener la URL de la imagen desde Firebase Storage
    try {
      const storageRef = ref(storage, `poleras/${poleraId}`);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error al obtener la URL de la imagen:', error);
      return null;
    }
  };

  return (
    <div>
      <Header />
      <div className="contenido">
        <h2>MostrarPolera</h2>
        <div className="galeria">
          {poleras.map((polera, index) => (
            <div key={index} className="tarjeta">
              <img src={polera.imagenURL} alt={polera.nombre}  className="imagen-polera" />
              <h3>{polera.nombre}</h3>
              <p>Talla: {polera.talla}</p>
              <p>Colegio: {polera.nombre_colegio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
