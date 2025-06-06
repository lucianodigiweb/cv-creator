/* global html2pdf */
import React, { useState } from 'react';

function App() {
  const [datos, setDatos] = useState({
    foto: '',
    nombre: '',
    correo: '',
    redes: '',
    habilidades: '',
    idiomas: '',
    certificaciones: ''
  });

  const [formaciones, setFormaciones] = useState([
    { nombre: '', especialidad: '', horas: '', año: '' }
  ]);

  const [experiencias, setExperiencias] = useState([
    { puesto: '', empresa: '', duracion: '', descripcion: '' }
  ]);

  const handleDatosChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleFormacionChange = (index, event) => {
    const updated = [...formaciones];
    updated[index][event.target.name] = event.target.value;
    setFormaciones(updated);
  };

  const handleExperienciaChange = (index, event) => {
    const updated = [...experiencias];
    updated[index][event.target.name] = event.target.value;
    setExperiencias(updated);
  };

  const agregarFormacion = () => {
    setFormaciones([...formaciones, { nombre: '', especialidad: '', horas: '', año: '' }]);
  };

  const agregarExperiencia = () => {
    setExperiencias([...experiencias, { puesto: '', empresa: '', duracion: '', descripcion: '' }]);
  };

  const descargarPDF = () => {
    const contenido = document.getElementById('cv-preview');
    const opciones = {
      margin: 0.5,
      filename: 'mi_cv.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    if (window.html2pdf && contenido) {
      window.html2pdf().set(opciones).from(contenido).save();
    } else {
      alert('Error: html2pdf no está definido o no se encontró el contenido.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ borderBottom: '2px solid #333' }}>👤 Datos Personales</h2>

      <label>Foto (URL):<br />
        <input style={{ width: '100%', padding: '10px', marginBottom: '10px' }} type="text" name="foto" value={datos.foto} onChange={handleDatosChange} />
      </label><br />

      <label>Nombre:<br />
        <input style={{ width: '100%', padding: '10px', marginBottom: '10px' }} type="text" name="nombre" value={datos.nombre} onChange={handleDatosChange} />
      </label><br />

      <label>Correo electrónico:<br />
        <input style={{ width: '100%', padding: '10px', marginBottom: '10px' }} type="email" name="correo" value={datos.correo} onChange={handleDatosChange} />
      </label><br />

      <label>Redes:<br />
        <input style={{ width: '100%', padding: '10px', marginBottom: '10px' }} type="text" name="redes" value={datos.redes} onChange={handleDatosChange} />
      </label><br />

      <label>Habilidades:<br />
        <input style={{ width: '100%', padding: '10px', marginBottom: '10px' }} type="text" name="habilidades" value={datos.habilidades} onChange={handleDatosChange} />
      </label><br />

      <label>Idiomas:<br />
        <input style={{ width: '100%', padding: '10px', marginBottom: '10px' }} type="text" name="idiomas" value={datos.idiomas} onChange={handleDatosChange} />
      </label><br />

      <label>Certificaciones:<br />
        <input style={{ width: '100%', padding: '10px', marginBottom: '10px' }} type="text" name="certificaciones" value={datos.certificaciones} onChange={handleDatosChange} />
      </label>

      <h2>🧠 Formaciones Educativas</h2>
      {formaciones.map((formacion, index) => (
        <div key={index}>
          <input placeholder="Nombre" name="nombre" value={formacion.nombre} onChange={(e) => handleFormacionChange(index, e)} />
          <input placeholder="Especialidad" name="especialidad" value={formacion.especialidad} onChange={(e) => handleFormacionChange(index, e)} />
          <input placeholder="Horas" name="horas" value={formacion.horas} onChange={(e) => handleFormacionChange(index, e)} />
          <input placeholder="Año" name="año" value={formacion.año} onChange={(e) => handleFormacionChange(index, e)} />
        </div>
      ))}
      <button onClick={agregarFormacion}>Añadir Formación</button>

      <h2>💼 Experiencia Laboral</h2>
      {experiencias.map((exp, index) => (
        <div key={index}>
          <input placeholder="Puesto" name="puesto" value={exp.puesto} onChange={(e) => handleExperienciaChange(index, e)} />
          <input placeholder="Empresa" name="empresa" value={exp.empresa} onChange={(e) => handleExperienciaChange(index, e)} />
          <input placeholder="Duración" name="duracion" value={exp.duracion} onChange={(e) => handleExperienciaChange(index, e)} />
          <input placeholder="Descripción" name="descripcion" value={exp.descripcion} onChange={(e) => handleExperienciaChange(index, e)} />
        </div>
      ))}
      <button onClick={agregarExperiencia}>Añadir Experiencia</button>

      <div id="cv-preview" style={{ marginTop: '40px' }}>
        {datos.foto && <img src={datos.foto} alt="Foto" style={{ width: '120px', borderRadius: '8px' }} />}
        {datos.nombre && <p><strong>Nombre:</strong> {datos.nombre}</p>}
        {datos.correo && <p><strong>Correo:</strong> {datos.correo}</p>}
        {datos.redes && <p><strong>Redes:</strong> {datos.redes}</p>}
        {datos.habilidades && <p><strong>Habilidades:</strong> {datos.habilidades}</p>}
        {datos.idiomas && <p><strong>Idiomas:</strong> {datos.idiomas}</p>}
        {datos.certificaciones && <p><strong>Certificaciones:</strong> {datos.certificaciones}</p>}

        {formaciones.some(f => f.nombre || f.especialidad || f.horas || f.año) && (
          <>
            <h3>Formación:</h3>
            <ul>
              {formaciones.map((f, i) => (
                (f.nombre || f.especialidad || f.horas || f.año) && (
                  <li key={i}>{f.nombre} - {f.especialidad}, {f.horas}h, {f.año}</li>
                )
              ))}
            </ul>
          </>
        )}

        {experiencias.some(e => e.puesto || e.empresa || e.duracion || e.descripcion) && (
          <>
            <h3>Experiencia:</h3>
            <ul>
              {experiencias.map((e, i) => (
                (e.puesto || e.empresa || e.duracion || e.descripcion) && (
                  <li key={i}>{e.puesto} en {e.empresa}, {e.duracion} — {e.descripcion}</li>
                )
              ))}
            </ul>
          </>
        )}
      </div>

      <button onClick={descargarPDF} style={{ marginTop: '20px' }}>Descargar PDF</button>
    </div>
  );
}

export default App;
