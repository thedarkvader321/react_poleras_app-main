import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Header } from './Header';


export const AgregarPolera = () => {
  const [nombre, setNombre] = useState('');
  const [talla, setTalla] = useState('');
  const [nombreColegio, setNombreColegio] = useState('');
  const [poleras, setPoleras] = useState([]);

  useEffect(() => {
    // Lógica para obtener y mostrar los datos existentes en la colección "poleras"
    const obtenerPoleras = async () => {
      const querySnapshot = await getDocs(collection(db, 'poleras'));
      const polerasData = querySnapshot.docs.map((doc) => doc.data());
      setPoleras(polerasData);
    };
    obtenerPoleras();
  }, []);

  const agregarPolera = async () => {
    // Crear un objeto con los datos de la polera que deseas agregar
    const poleraData = {
      nombre: nombre,
      talla: talla,
      nombre_colegio: nombreColegio,
    };

    try {
      // Agregar el objeto poleraData a la colección "poleras"
      await addDoc(collection(db, 'poleras'), poleraData);
      console.log('Polera agregada correctamente a la colección "poleras"');
      // Limpiar los estados después de agregar la polera
      setNombre('');
      setTalla('');
      setNombreColegio('');
      // Actualizar la lista de poleras mostradas en la interfaz
      setPoleras([...poleras, poleraData]);
    } catch (error) {
      console.error('Error al agregar la polera:', error);
    }
  };

  return (
    <div>
      <Header/>
      <div className="contenido">
      <h2 className='titulo'>Agregar Polera</h2>
        <div className="container">
          <label>Nombre de la polera:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <label>Talla:</label>
          <input type="text" value={talla} onChange={(e) => setTalla(e.target.value)} />
          <label>Nombre del colegio:</label>
          <input type="text" value={nombreColegio} onChange={(e) => setNombreColegio(e.target.value)} />
          <button className="btn-agregar" onClick={agregarPolera}>Agregar Polera</button>
        </div>
      </div>
      <div>
        <h3 className='titulo'>Poleras existentes:</h3>
        <table className="poleras-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Talla</th>
              <th>Colegio</th>
            </tr>
          </thead>
          <tbody>
            {poleras.map((polera, index) => (
              <tr key={index}>
                <td>{polera.nombre}</td>
                <td>{polera.talla}</td>
                <td>{polera.nombre_colegio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
