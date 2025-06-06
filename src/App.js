import React, { useState, useRef } from 'react';
import './App.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function App() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    experiencia: '',
    educacion: '',
    foto: '',
    linkedin: '',
    habilidades: '',
    idiomas: '',
    certificaciones: ''
  });

  const cvRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generarPDF = () => {
    const input = cvRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('mi_cv.pdf');
    });
  };

  return (
    <div className="App">
      <h1>Creador de CV 📝</h1>

      <form>
        <label>Foto (URL):</label>
        <input type="text" name="foto" value={formData.foto} onChange={handleChange} />

        <label>Nombre:</label>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />

        <label>LinkedIn / Redes:</label>
        <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} />

        <label>Experiencia:</label>
        <textarea name="experiencia" value={formData.experiencia} onChange={handleChange} />

        <label>Educación:</label>
        <textarea name="educacion" value={formData.educacion} onChange={handleChange} />

        <label>Habilidades:</label>
        <textarea name="habilidades" value={formData.habilidades} onChange={handleChange} />

        <label>Idiomas:</label>
        <textarea name="idiomas" value={formData.idiomas} onChange={handleChange} />

        <label>Certificaciones:</label>
        <textarea name="certificaciones" value={formData.certificaciones} onChange={handleChange} />
      </form>

      <button onClick={generarPDF}>📄 Descargar CV en PDF</button>

      <div ref={cvRef} style={{ backgroundColor: '#f4f4f4', padding: '1rem', borderRadius: '8px' }}>
        {formData.foto && (
          <div style={{ textAlign: 'center' }}>
            <img src={formData.foto} alt="Foto de perfil" width="100" height="100" style={{ borderRadius: '50%' }} />
          </div>
        )}
        <h2>{formData.nombre}</h2>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Redes:</strong> {formData.linkedin}</p>
        <p><strong>Experiencia:</strong> {formData.experiencia}</p>
        <p><strong>Educación:</strong> {formData.educacion}</p>
        <p><strong>Habilidades:</strong> {formData.habilidades}</p>
        <p><strong>Idiomas:</strong> {formData.idiomas}</p>
        <p><strong>Certificaciones:</strong> {formData.certificaciones}</p>
      </div>
    </div>
  );
}

export default App;
