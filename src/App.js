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

  const [template, setTemplate] = useState('claro');

  const [formaciones, setFormaciones] = useState([
    { nombre: '', especialidad: '', horas: '', anio: '' }
  ]);

  const [experiencias, setExperiencias] = useState([
    { puesto: '', empresa: '', duracion: '', descripcion: '' }
  ]);

  const handleDatosChange = (e) => {
    const { name, value } = e.target;
    setDatos(prev => ({ ...prev, [name]: value }));
  };

  const handleFormacionChange = (index, e) => {
    const { name, value } = e.target;
    setFormaciones(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };

  const handleExperienciaChange = (index, e) => {
    const { name, value } = e.target;
    setExperiencias(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };

  const agregarFormacion = () => {
    setFormaciones([...formaciones, { nombre: '', especialidad: '', horas: '', anio: '' }]);
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

    if (window.html2pdf && typeof window.html2pdf === 'function') {
      window.html2pdf().set(opciones).from(contenido).save();
    } else {
      alert('Error: html2pdf no está definido o no se encontró el contenido.');
    }
  };

  const tieneContenido = () => {
    return (
      datos.nombre || datos.correo || datos.redes || datos.habilidades || datos.idiomas || datos.certificaciones ||
      formaciones.some(f => f.nombre || f.especialidad || f.horas || f.anio) ||
      experiencias.some(e => e.puesto || e.empresa || e.duracion || e.descripcion)
    );
  };

  const estilosTemplate = {
    claro: { background: '#ffffff', color: '#000000' },
    oscuro: { background: '#1e1e1e', color: '#ffffff' },
    moderno: { background: '#f4f6f8', color: '#333', fontFamily: 'Helvetica Neue, sans-serif', borderLeft: '4px solid #4A90E2', paddingLeft: '10px' },
    clasico: { background: '#fffaf0', color: '#000080', fontFamily: 'Times New Roman, serif', border: '1px solid #000080', padding: '15px' }
  }[template];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ borderBottom: '2px solid #333', color: '#4A90E2' }}>👤 Datos Personales</h2>

      <label>Plantilla:<br />
        <select value={template} onChange={(e) => setTemplate(e.target.value)}>
          <option value="claro">Claro</option>
          <option value="oscuro">Oscuro</option>
          <option value="moderno">Moderno</option>
          <option value="clasico">Clásico</option>
        </select>
      </label><br /><br />

      <label>Foto (URL):<br />
        <input style={{ width: '100%', padding: '10px', marginBottom: '10px' }} type="text" name="foto" value={datos.foto} onChange={handleDatosChange} />
      </label><br />

      <label>Nombre:<br />
        <input style={{ width: '100%', padding: '10px', marginBottom: '10px', fontWeight: 'bold' }} type="text" name="nombre" value={datos.nombre} onChange={handleDatosChange} />
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
        <input style={{ width: '100%', padding: '10px', marginBottom: '20px' }} type="text" name="certificaciones" value={datos.certificaciones} onChange={handleDatosChange} />
      </label>

      <h2 style={{ color: '#4A90E2' }}>🧐 Formaciones Educativas</h2>
      {formaciones.map((formacion, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <input placeholder="Nombre" name="nombre" value={formacion.nombre} onChange={(e) => handleFormacionChange(index, e)} />
          <input placeholder="Especialidad" name="especialidad" value={formacion.especialidad} onChange={(e) => handleFormacionChange(index, e)} />
          <input placeholder="Horas" name="horas" value={formacion.horas} onChange={(e) => handleFormacionChange(index, e)} />
          <input placeholder="Año" name="anio" value={formacion.anio} onChange={(e) => handleFormacionChange(index, e)} />
        </div>
      ))}
      <button onClick={agregarFormacion} style={{ marginBottom: '20px' }}>➕ Añadir Formación</button>

      <h2 style={{ color: '#4A90E2' }}>💼 Experiencia Laboral</h2>
      {experiencias.map((exp, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <input placeholder="Puesto" name="puesto" value={exp.puesto} onChange={(e) => handleExperienciaChange(index, e)} />
          <input placeholder="Empresa" name="empresa" value={exp.empresa} onChange={(e) => handleExperienciaChange(index, e)} />
          <input placeholder="Duración" name="duracion" value={exp.duracion} onChange={(e) => handleExperienciaChange(index, e)} />
          <input placeholder="Descripción" name="descripcion" value={exp.descripcion} onChange={(e) => handleExperienciaChange(index, e)} />
        </div>
      ))}
      <button onClick={agregarExperiencia}>➕ Añadir Experiencia</button>

      <div id="cv-preview" style={{ marginTop: '40px', borderRadius: '10px', ...estilosTemplate }}>
        {datos.foto && <img src={datos.foto} alt="Foto" style={{ width: '120px', borderRadius: '8px', marginBottom: '20px' }} />}
        {datos.nombre && <p><strong>💼 Nombre:</strong> {datos.nombre}</p>}
        {datos.correo && <p><strong>📧 Correo:</strong> {datos.correo}</p>}
        {datos.redes && <p><strong>🔗 Redes:</strong> {datos.redes}</p>}
        {datos.habilidades && <p><strong>🛠️ Habilidades:</strong> {datos.habilidades}</p>}
        {datos.idiomas && <p><strong>👥 Idiomas:</strong> {datos.idiomas}</p>}
        {datos.certificaciones && <p><strong>📜 Certificaciones:</strong> {datos.certificaciones}</p>}

        {formaciones.some(f => f.nombre || f.especialidad || f.horas || f.anio) && (
          <>
            <h3 style={{ marginTop: '20px' }}>🎓 Formación:</h3>
            <ul>
              {formaciones.map((f, i) => (
                (f.nombre || f.especialidad || f.horas || f.anio) && (
                  <li key={i}>{f.nombre} - {f.especialidad}, {f.horas}h, {f.anio}</li>
                )
              ))}
            </ul>
          </>
        )}

        {experiencias.some(e => e.puesto || e.empresa || e.duracion || e.descripcion) && (
          <>
            <h3 style={{ marginTop: '20px' }}>💼 Experiencia:</h3>
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

      {tieneContenido() && (
        <button onClick={descargarPDF} style={{ marginTop: '20px', backgroundColor: '#4A90E2', color: '#fff', padding: '12px 24px', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}>
          📄 Descargar PDF
        </button>
      )}
    </div>
  );
}

export default App;

