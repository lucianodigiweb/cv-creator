import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    borderBottom: '1px solid #EEEEEE',
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    color: '#333333',
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 5,
    color: '#555555',
  },
  text: {
    fontSize: 12,
    marginBottom: 3,
  },
  listItem: {
    fontSize: 12,
    marginBottom: 2,
    marginLeft: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    alignSelf: 'center',
  }
});

const MyCV = ({ data, template }) => (
  <Document>
    <Page style={styles.page} size="A4">
      <View style={styles.section}>
        {data.foto && <Image style={styles.image} src={data.foto} />}
        <Text style={styles.header}>{data.nombre}</Text>
        <Text style={styles.text}>Email: {data.correo}</Text>
        {data.redesSociales && <Text style={styles.text}>Redes/Portfolio: {data.redesSociales}</Text>}
      </View>

      {data.habilidades && data.habilidades.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subHeader}>Habilidades</Text>
          {data.habilidades.split(',').map((skill, index) => (
            <Text key={index} style={styles.listItem}>- {skill.trim()}</Text>
          ))}
        </View>
      )}

      {data.idiomas && data.idiomas.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subHeader}>Idiomas</Text>
          <Text style={styles.text}>{data.idiomas}</Text>
        </View>
      )}

      {data.certificaciones && data.certificaciones.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subHeader}>Certificaciones</Text>
          <Text style={styles.text}>{data.certificaciones}</Text>
        </View>
      )}

      {data.formacionAcademica && data.formacionAcademica.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subHeader}>Formación Académica</Text>
          {data.formacionAcademica.map((item, index) => (
            <View key={index} style={{ marginBottom: 5 }}>
              <Text style={styles.text}>• {item.titulo} en {item.institucion}</Text>
              <Text style={styles.listItem}>{item.fecha}</Text>
            </View>
          ))}
        </View>
      )}

      {data.experienciaLaboral && data.experienciaLaboral.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subHeader}>Experiencia Laboral</Text>
          {data.experienciaLaboral.map((item, index) => (
            <View key={index} style={{ marginBottom: 5 }}>
              <Text style={styles.text}>• {item.puesto} en {item.empresa}</Text>
              <Text style={styles.listItem}>{item.fecha}</Text>
              <Text style={styles.listItem}>{item.descripcion}</Text>
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export default MyCV;