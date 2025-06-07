import React, { useState } from "react";
import html2pdf from "html2pdf.js/dist/html2pdf.bundle"; // ✅ Correcto

function App() {
  const [datos, setDatos] = useState({
    nombre: "",
    correo: "",
    redes: "",
    habilidades: "",
    idiomas: "",
    certificaciones: "",
    foto: null,
    plantilla: "clasica"
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
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    };
  if (contenido) {
    setTimeout(() => {
      html2pdf().set(opciones).from(contenido).save();
    }, 300); // le damos 300 milisegundos para que cargue la imagen
  }
};

  return (
    <div
      className="App"
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <h1 style={{ textAlign: "center" }}>Generador de CV</h1>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "30px"
        }}
      >
        <label>
          Nombre:
          <input type="text" name="nombre" value={datos.nombre} onChange={handleDatosChange} style={{ width: "100%" }} />
        </label>

        <label>
          Correo electrónico:
          <input type="email" name="correo" value={datos.correo} onChange={handleDatosChange} style={{ width: "100%" }} />
        </label>

        <label>
          Redes:
          <input type="text" name="redes" value={datos.redes} onChange={handleDatosChange} style={{ width: "100%" }} />
        </label>

        <label>
          Habilidades:
          <input type="text" name="habilidades" value={datos.habilidades} onChange={handleDatosChange} style={{ width: "100%" }} />
        </label>

        <label>
          Idiomas:
          <input type="text" name="idiomas" value={datos.idiomas} onChange={handleDatosChange} style={{ width: "100%" }} />
        </label>

        <label>
          Certificaciones:
          <input type="text" name="certificaciones" value={datos.certificaciones} onChange={handleDatosChange} style={{ width: "100%" }} />
        </label>

        <label>
          Foto:
          <input type="file" name="foto" accept="image/*" onChange={handleDatosChange} />
        </label>

        <label>
          Plantilla:
          <select name="plantilla" value={datos.plantilla} onChange={handleDatosChange} style={{ width: "100%" }}>
            <option value="clasica">Clásica</option>
            <option value="moderna">Moderna</option>
          </select>
        </label>
      </form>

      <div
        id="cv-preview"
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
          fontFamily: datos.plantilla === "moderna" ? "Verdana, sans-serif" : "Georgia, serif",
          background: datos.plantilla === "moderna" ? "#e9f7ff" : "#fffef7"
        }}
      >
        <h2>{datos.nombre}</h2>
        <p><strong>Correo:</strong> {datos.correo}</p>
        <p><strong>Redes:</strong> {datos.redes}</p>
        <p><strong>Habilidades:</strong> {datos.habilidades}</p>
        <p><strong>Idiomas:</strong> {datos.idiomas}</p>
        <p><strong>Certificaciones:</strong> {datos.certificaciones}</p>
        {datos.foto && <img src={datos.foto} alt="Foto" style={{ width: "150px", marginTop: "10px", borderRadius: "5px" }} />}
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={descargarPDF}
          id="descargar-pdf"
          style={{
            padding: "10px 20px",
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
