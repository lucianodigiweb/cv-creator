import React, { useState } from "react";
import "./App.css";

function App() {
  const [datos, setDatos] = useState({
    nombre: "",
    correo: "",
    redes: "",
    habilidades: "",
    idiomas: "",
    certificaciones: "",
    foto: null,
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

  const descargarPDF = () => {
    const contenido = document.getElementById("cv-preview");
    const opciones = {
      margin: 0.5,
      filename: "cv-luciano.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    if (window.html2pdf && contenido) {
      window.html2pdf().set(opciones).from(contenido).save();
    } else {
      alert("La librería de PDF no está disponible aún. Intenta nuevamente en unos segundos.");
    }
  };

  return (
    <div className="App">
      <h1>Generador de CV</h1>

      <label>
        Nombre:
        <input type="text" name="nombre" value={datos.nombre} onChange={handleDatosChange} />
      </label>

      <label>
        Correo electrónico:
        <input type="email" name="correo" value={datos.correo} onChange={handleDatosChange} />
      </label>

      <label>
        Redes:
        <input type="text" name="redes" value={datos.redes} onChange={handleDatosChange} />
      </label>

      <label>
        Habilidades:
        <input type="text" name="habilidades" value={datos.habilidades} onChange={handleDatosChange} />
      </label>

      <label>
        Idiomas:
        <input type="text" name="idiomas" value={datos.idiomas} onChange={handleDatosChange} />
      </label>

      <label>
        Certificaciones:
        <input type="text" name="certificaciones" value={datos.certificaciones} onChange={handleDatosChange} />
      </label>

      <label>
        Foto:
        <input type="file" name="foto" accept="image/*" onChange={handleDatosChange} />
      </label>

      <div id="cv-preview" style={{ marginTop: "20px", border: "1px solid #ccc", padding: "20px" }}>
        <h2>{datos.nombre}</h2>
        <p><strong>Correo:</strong> {datos.correo}</p>
        <p><strong>Redes:</strong> {datos.redes}</p>
        <p><strong>Habilidades:</strong> {datos.habilidades}</p>
        <p><strong>Idiomas:</strong> {datos.idiomas}</p>
        <p><strong>Certificaciones:</strong> {datos.certificaciones}</p>
        {datos.foto && <img src={datos.foto} alt="Foto" style={{ width: "150px", marginTop: "10px" }} />}
      </div>

      <button onClick={descargarPDF} id="descargar-pdf" style={{ marginTop: "20px" }}>Descargar PDF</button>
    </div>
  );
}

export default App;




