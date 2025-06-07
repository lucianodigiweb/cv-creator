import React, { useState } from "react";
import html2pdf from "html2pdf.js/dist/html2pdf.bundle.js";

function App() {
  const [datos, setDatos] = useState({
    nombre: "",
    correo: "",
    redes: "",
    habilidades: "",
    idiomas: "",
    certificaciones: "",
    foto: null,
    plantilla: "clasica",
    formacion: [""],
    experiencia: [""]
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

  const handleListaChange = (tipo, index, value) => {
    const nuevaLista = [...datos[tipo]];
    nuevaLista[index] = value;
    setDatos((prev) => ({ ...prev, [tipo]: nuevaLista }));
  };

  const agregarCampo = (tipo) => {
    setDatos((prev) => ({ ...prev, [tipo]: [...prev[tipo], ""] }));
  };

  const descargarPDF = () => {
    const contenido = document.getElementById("cv-preview");
    const opciones = {
      margin: [0.2, 0.5, 0.2, 0.5],
      filename: "mi_cv.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    if (contenido) {
      setTimeout(() => {
        html2pdf().set(opciones).from(contenido).save();
      }, 500);
    }
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
      <h1 style={{ textAlign: "center" }}>Generador de CV</h1>

      <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label>Nombre:<input type="text" name="nombre" value={datos.nombre} onChange={handleDatosChange} maxLength="100" /></label>
        <label>Correo electrónico:<input type="email" name="correo" value={datos.correo} onChange={handleDatosChange} maxLength="100" /></label>
        <label>Redes:<input type="text" name="redes" value={datos.redes} onChange={handleDatosChange} maxLength="200" /></label>
        <label>Habilidades:<input type="text" name="habilidades" value={datos.habilidades} onChange={handleDatosChange} maxLength="300" /></label>
        <label>Idiomas:<input type="text" name="idiomas" value={datos.idiomas} onChange={handleDatosChange} maxLength="200" /></label>
        <label>Certificaciones:<input type="text" name="certificaciones" value={datos.certificaciones} onChange={handleDatosChange} maxLength="200" /></label>
        <label>Foto:<input type="file" name="foto" accept="image/*" onChange={handleDatosChange} /></label>
        <label>Plantilla:
          <select name="plantilla" value={datos.plantilla} onChange={handleDatosChange}>
            <option value="clasica">Clásica</option>
            <option value="moderna">Moderna</option>
          </select>
        </label>

        <h3>Formación Académica</h3>
        {datos.formacion.map((item, idx) => (
          <input key={idx} type="text" value={item} onChange={(e) => handleListaChange("formacion", idx, e.target.value)} maxLength="200" />
        ))}
        <button type="button" onClick={() => agregarCampo("formacion")}>+ Añadir Formación</button>

        <h3>Experiencia Laboral</h3>
        {datos.experiencia.map((item, idx) => (
          <input key={idx} type="text" value={item} onChange={(e) => handleListaChange("experiencia", idx, e.target.value)} maxLength="200" />
        ))}
        <button type="button" onClick={() => agregarCampo("experiencia")}>+ Añadir Experiencia</button>
      </form>

      <div id="cv-preview" style={{
        border: "1px solid #ccc",
        padding: "20px 30px",
        backgroundColor: datos.plantilla === "moderna" ? "#e9f7ff" : "#fffef7",
        fontFamily: datos.plantilla === "moderna" ? "Verdana, sans-serif" : "Georgia, serif",
        marginTop: "10px",
        minHeight: "800px",
        color: "#000",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        lineHeight: "1.6",
        fontSize: "15px"
      }}>
        <h2 style={{ borderBottom: "1px solid #ccc", paddingBottom: "8px" }}>{datos.nombre}</h2>
        <p><strong>Correo:</strong> {datos.correo}</p>
        <p><strong>Redes:</strong> {datos.redes}</p>
        <p><strong>Habilidades:</strong> {datos.habilidades}</p>
        <p><strong>Idiomas:</strong> {datos.idiomas}</p>
        <p><strong>Certificaciones:</strong> {datos.certificaciones}</p>

        {datos.formacion.length > 0 && (
          <div>
            <strong>Formación:</strong>
            <ul>{datos.formacion.map((f, i) => <li key={i}>{f}</li>)}</ul>
          </div>
        )}

        {datos.experiencia.length > 0 && (
          <div>
            <strong>Experiencia:</strong>
            <ul>{datos.experiencia.map((e, i) => <li key={i}>{e}</li>)}</ul>
          </div>
        )}

        {datos.foto && <img src={datos.foto} alt="Foto" style={{ width: "150px", marginTop: "20px", borderRadius: "5px", boxShadow: "0 0 8px rgba(0,0,0,0.1)" }} />}
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={descargarPDF}
          id="descargar-pdf"
          style={{
            padding: "12px 25px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Descargar PDF
        </button>
      </div>
    </div>
  );
}

export default App;