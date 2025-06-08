import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyCV from './components/MyCV';

function App() {
  const [datos, setDatos] = useState({
    nombre: "",
    correo: "",
    redesSociales: "",
    habilidades: "",
    idiomas: "",
    certificaciones: "",
    foto: null,
    plantilla: "clasica",
    formacionAcademica: [{ titulo: "", institucion: "", fecha: "" }],
    experienciaLaboral: [{ puesto: "", empresa: "", fecha: "", descripcion: "" }]
  });

  const handleDatosChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDatos((prev) => ({ ...prev, foto: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setDatos((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayItemChange = (tipo, index, fieldName, value) => {
    const nuevaLista = [...datos[tipo]];
    nuevaLista[index] = { ...nuevaLista[index], [fieldName]: value };
    setDatos((prev) => ({ ...prev, [tipo]: nuevaLista }));
  };

  const agregarCampo = (tipo) => {
    if (tipo === "formacionAcademica") {
      setDatos((prev) => ({ ...prev, [tipo]: [...prev[tipo], { titulo: "", institucion: "", fecha: "" }] }));
    } else if (tipo === "experienciaLaboral") {
      setDatos((prev) => ({ ...prev, [tipo]: [...prev[tipo], { puesto: "", empresa: "", fecha: "", descripcion: "" }] }));
    } else {
      setDatos((prev) => ({ ...prev, [tipo]: [...prev[tipo], ""] }));
    }
  };

  const eliminarCampo = (tipo, index) => {
    const nuevaLista = datos[tipo].filter((_, i) => i !== index);
    setDatos((prev) => ({ ...prev, [tipo]: nuevaLista }));
  };

  return (
    <div
      className="App"
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Generador de CV</h1>

      <form style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "30px", border: "1px solid #eee", padding: "20px", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
        <h2>Datos Personales</h2>
        <label>
          Nombre:
          <input type="text" name="nombre" value={datos.nombre} onChange={handleDatosChange} placeholder="Tu Nombre Completo" />
        </label>
        <label>
          Correo electrónico:
          <input type="email" name="correo" value={datos.correo} onChange={handleDatosChange} placeholder="tu.correo@ejemplo.com" />
        </label>
        <label>
          Redes Sociales/Portfolio:
          <input type="text" name="redesSociales" value={datos.redesSociales} onChange={handleDatosChange} placeholder="LinkedIn, GitHub, Portfolio URL" />
        </label>
        <label>
          Foto:
          <input type="file" name="foto" accept="image/*" onChange={handleDatosChange} />
        </label>
        <label>
          Plantilla:
          <select name="plantilla" value={datos.plantilla} onChange={handleDatosChange}>
            <option value="clasica">Clásica</option>
            <option value="moderna">Moderna</option>
          </select>
        </label>

        <h2>Habilidades</h2>
        <label>
          Habilidades (separadas por comas o saltos de línea):
          <textarea name="habilidades" value={datos.habilidades} onChange={handleDatosChange} rows="5" placeholder="JavaScript, React, Node.js, Inglés Avanzado..."></textarea>
        </label>

        <h2>Idiomas</h2>
        <label>
          Idiomas:
          <input type="text" name="idiomas" value={datos.idiomas} onChange={handleDatosChange} placeholder="Español (Nativo), Inglés (Fluido), Alemán (Básico)" />
        </label>

        <h2>Certificaciones</h2>
        <label>
          Certificaciones:
          <input type="text" name="certificaciones" value={datos.certificaciones} onChange={handleDatosChange} placeholder="Certificación en Scrum Master, Curso de UX/UI" />
        </label>

        <h3>Formación Académica</h3>
        {datos.formacionAcademica.map((item, idx) => (
          <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "10px", padding: "10px", border: "1px dashed #ccc", borderRadius: "5px" }}>
            <label>
              Título/Grado:
              <input
                type="text"
                value={item.titulo}
                onChange={(e) => handleArrayItemChange("formacionAcademica", idx, "titulo", e.target.value)}
                placeholder="Ej: Grado en Ingeniería Informática"
              />
            </label>
            <label>
              Institución:
              <input
                type="text"
                value={item.institucion}
                onChange={(e) => handleArrayItemChange("formacionAcademica", idx, "institucion", e.target.value)}
                placeholder="Ej: Universidad X"
              />
            </label>
            <label>
              Fechas:
              <input
                type="text"
                value={item.fecha}
                onChange={(e) => handleArrayItemChange("formacionAcademica", idx, "fecha", e.target.value)}
                placeholder="Ej: 2015-2019"
              />
            </label>
            {datos.formacionAcademica.length > 1 && (
              <button type="button" onClick={() => eliminarCampo("formacionAcademica", idx)} style={{ background: "none", border: "none", color: "red", cursor: "pointer", fontSize: "1.2em", alignSelf: "flex-end" }}>
                &times; Eliminar
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => agregarCampo("formacionAcademica")} style={{ alignSelf: "flex-start", padding: "8px 15px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>+ Añadir Formación</button>

        <h3>Experiencia Laboral</h3>
        {datos.experienciaLaboral.map((item, idx) => (
          <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "10px", padding: "10px", border: "1px dashed #ccc", borderRadius: "5px" }}>
            <label>
              Puesto:
              <input
                type="text"
                value={item.puesto}
                onChange={(e) => handleArrayItemChange("experienciaLaboral", idx, "puesto", e.target.value)}
                placeholder="Ej: Desarrollador Frontend"
              />
            </label>
            <label>
              Empresa:
              <input
                type="text"
                value={item.empresa}
                onChange={(e) => handleArrayItemChange("experienciaLaboral", idx, "empresa", e.target.value)}
                placeholder="Ej: Empresa Y"
              />
            </label>
            <label>
              Fechas:
              <input
                type="text"
                value={item.fecha}
                onChange={(e) => handleArrayItemChange("experienciaLaboral", idx, "fecha", e.target.value)}
                placeholder="Ej: 2020-Presente"
              />
            </label>
            <label>
              Descripción (tareas y logros):
              <textarea
                value={item.descripcion}
                onChange={(e) => handleArrayItemChange("experienciaLaboral", idx, "descripcion", e.target.value)}
                placeholder="Ej: Desarrollo de interfaces de usuario..."
                rows={3}
              ></textarea>
            </label>
            {datos.experienciaLaboral.length > 1 && (
              <button type="button" onClick={() => eliminarCampo("experienciaLaboral", idx)} style={{ background: "none", border: "none", color: "red", cursor: "pointer", fontSize: "1.2em", alignSelf: "flex-end" }}>
                &times; Eliminar
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => agregarCampo("experienciaLaboral")} style={{ alignSelf: "flex-start", padding: "8px 15px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>+ Añadir Experiencia</button>
      </form>

      <div id="cv-preview" style={{
        width: "7.5in",
        margin: "20px auto",
        padding: "0.5in",
        backgroundColor: datos.plantilla === "moderna" ? "#e9f7ff" : "#fffef7",
        fontFamily: datos.plantilla === "moderna" ? "Verdana, sans-serif" : "Georgia, serif",
        color: "#000",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        lineHeight: "1.6",
        fontSize: "17px",
        boxSizing: "border-box",
        minHeight: "1056px",
        maxHeight: "none",
        overflow: "hidden",
        position: "relative",
      }}>
        {datos.foto && (
          <img
            src={datos.foto}
            alt="Foto de Perfil"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "20px",
              border: "3px solid #ccc",
              display: "block",
              margin: "0 auto 20px auto",
            }}
          />
        )}

        <h2 style={{ borderBottom: "1px solid #ccc", paddingBottom: "8px", marginBottom: "15px", textAlign: "center" }}>
          {datos.nombre || "Tu Nombre"}
        </h2>

        <div style={{ marginBottom: "15px" }}>
          <p style={{ margin: "0", display: "flex", alignItems: "center", gap: "5px" }}>
            <strong>Correo:</strong> {datos.correo || "No especificado"}
          </p>
          <p style={{ margin: "0", display: "flex", alignItems: "center", gap: "5px" }}>
            <strong>Redes:</strong> {datos.redesSociales || "No especificado"}
          </p>
        </div>

        {datos.habilidades && (
          <div style={{ marginBottom: "15px" }}>
            <strong>Habilidades:</strong>
            <ul style={{ listStyleType: "disc", marginLeft: "20px", marginTop: "5px" }}>
              {datos.habilidades.split('\n').filter(skill => skill.trim() !== '').map((skill, i) => <li key={i}>{skill.trim()}</li>)}
            </ul>
          </div>
        )}

        {datos.idiomas && (
          <div style={{ marginBottom: "15px" }}>
            <strong>Idiomas:</strong>
            <ul style={{ listStyleType: "disc", marginLeft: "20px", marginTop: "5px" }}>
              {datos.idiomas.split(',').filter(lang => lang.trim() !== '').map((lang, i) => <li key={i}>{lang.trim()}</li>)}
            </ul>
          </div>
        )}

        {datos.certificaciones && (
          <div style={{ marginBottom: "15px" }}>
            <strong>Certificaciones:</strong>
            <ul style={{ listStyleType: "disc", marginLeft: "20px", marginTop: "5px" }}>
              {datos.certificaciones.split(',').filter(cert => cert.trim() !== '').map((cert, i) => <li key={i}>{cert.trim()}</li>)}
            </ul>
          </div>
        )}

        {datos.formacionAcademica.some(f => f.titulo.trim() !== "" || f.institucion.trim() !== "" || f.fecha.trim() !== "") && (
          <div style={{ marginBottom: "15px" }}>
            <h3 style={{ borderBottom: "1px dotted #ccc", paddingBottom: "5px", marginBottom: "10px" }}>Formación Académica</h3>
            <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
              {datos.formacionAcademica.filter(f => f.titulo.trim() !== "" || f.institucion.trim() !== "" || f.fecha.trim() !== "").map((f, i) => (
                <li key={i} style={{ marginBottom: "10px" }}>
                  <strong>{f.titulo}</strong> en {f.institucion} ({f.fecha})
                </li>
              ))}
            </ul>
          </div>
        )}

        {datos.experienciaLaboral.some(e => e.puesto.trim() !== "" || e.empresa.trim() !== "" || e.fecha.trim() !== "" || e.descripcion.trim() !== "") && (
          <div style={{ marginBottom: "15px" }}>
            <h3 style={{ borderBottom: "1px dotted #ccc", paddingBottom: "5px", marginBottom: "10px" }}>Experiencia Laboral</h3>
            <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
              {datos.experienciaLaboral.filter(e => e.puesto.trim() !== "" || e.empresa.trim() !== "" || e.fecha.trim() !== "" || e.descripcion.trim() !== "").map((e, i) => (
                <li key={i} style={{ marginBottom: "10px" }}>
                  <strong>{e.puesto}</strong> en {e.empresa} ({e.fecha})<br />
                  {e.descripcion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <PDFDownloadLink
          document={<MyCV data={datos} template={datos.plantilla} />}
          fileName="mi_cv.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? 'Generando PDF...' : (
              <button
                type="button"
                style={{
                  padding: "12px 25px",
                  fontSize: "16px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                  transition: "background-color 0.3s ease"
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
              >
                Descargar CV en PDF
              </button>
            )
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
}

export default App;