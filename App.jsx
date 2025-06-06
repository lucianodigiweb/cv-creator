
import React, { useState } from 'react';

function App() {
  const [formaciones, setFormaciones] = useState([
    { nombre: '', especialidad: '', horas: '', año: '' }
  ]);

  const handleChange = (index, event) => {
    const updated = [...formaciones];
    updated[index][event.target.name] = event.target.value;
    setFormaciones(updated);
  };

  const agregarFormacion = () => {
    setFormaciones([...formaciones, { nombre: '', especialidad: '', horas: '', año: '' }]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>🧠 Formaciones Educativas</h2>

      {formaciones.map((formacion, index) => (
        <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '15px', borderRadius: '8px' }}>
          <label>
            Nombre de la formación:
            <input type="text" name="nombre" value={formacion.nombre} onChange={(e) => handleChange(index, e)} />
          </label>
          <br />
          <label>
            Especialidad:
            <input type="text" name="especialidad" value={formacion.especialidad} onChange={(e) => handleChange(index, e)} />
          </label>
          <br />
          <label>
            Número de horas:
            <input type="text" name="horas" value={formacion.horas} onChange={(e) => handleChange(index, e)} />
          </label>
          <br />
          <label>
            Año de culminación:
            <input type="text" name="año" value={formacion.año} onChange={(e) => handleChange(index, e)} />
          </label>
        </div>
      ))}

      <button onClick={agregarFormacion} style={{ padding: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
        ➕ Añadir otra formación
      </button>

      <h3>📄 Vista previa del CV:</h3>
      <ul>
        {formaciones.map((f, i) => (
          <li key={i}>
            <strong>{f.nombre}</strong> - {f.especialidad}, {f.horas} horas, finalizado en {f.año}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

