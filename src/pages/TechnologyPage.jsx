import React, { useState, useEffect } from "react";
import './TechnologyPage.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function TechnologyPage() {
  const [technologies, setTechnologies] = useState([]);
  const [techName, setTechName] = useState("");
  const [techDescription, setTechDescription] = useState("");
  const [techImage, setTechImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTechIndex, setCurrentTechIndex] = useState(null);

  // Cargar tecnologías desde localStorage
  useEffect(() => {
    const storedTechnologies = JSON.parse(localStorage.getItem("technologies"));
    if (storedTechnologies) {
      setTechnologies(storedTechnologies);
    }
  }, []);

  // Guardar tecnologías en localStorage
  useEffect(() => {
    localStorage.setItem("technologies", JSON.stringify(technologies));
  }, [technologies]);

  // Función para manejar la subida de imágenes
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setTechImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file); // Convertir imagen a base64
    }
  };

  const addTechnology = () => {
    if (techName.trim() && techDescription.trim()) {
      setTechnologies([...technologies, { name: techName, description: techDescription, image: techImage }]);
      setTechName("");
      setTechDescription("");
      setTechImage("");
    }
  };

  const editTechnology = (index) => {
    setIsEditing(true);
    setCurrentTechIndex(index);
    setTechName(technologies[index].name);
    setTechDescription(technologies[index].description);
    setTechImage(technologies[index].image);
  };

  const saveEditTechnology = () => {
    const updatedTechnologies = [...technologies];
    updatedTechnologies[currentTechIndex] = { name: techName, description: techDescription, image: techImage };
    setTechnologies(updatedTechnologies);
    setIsEditing(false);
    setTechName("");
    setTechDescription("");
    setTechImage("");
  };

  const deleteTechnology = (index) => {
    const updatedTechnologies = technologies.filter((_, i) => i !== index);
    setTechnologies(updatedTechnologies);
  };

  return (
    <div className="technology-container">
      <h2>Gestión de Tecnología</h2>
      <div className="technology-form">
        <input
          type="text"
          className="input-field"
          value={techName}
          onChange={(e) => setTechName(e.target.value)}
          placeholder="Nombre de la tecnología"
        />
        <input
          type="text"
          className="input-field"
          value={techDescription}
          onChange={(e) => setTechDescription(e.target.value)}
          placeholder="Descripción de la tecnología"
        />
        <input
          type="file"
          className="input-file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {isEditing ? (
          <button className="save-button" onClick={saveEditTechnology}>
            Guardar
          </button>
        ) : (
          <button className="add-button" onClick={addTechnology}>
            Agregar Tecnología
          </button>
        )}
      </div>
      <div className="technology-list">
        {technologies.map((tech, index) => (
          <div key={index} className="tech-item">
            <img src={tech.image} alt={tech.name} className="tech-image" />
            <div className="tech-info">
              <h3>{tech.name}</h3>
              <p>{tech.description}</p>
            </div>
            <div className="actions">
              <button className="icon-button" onClick={() => editTechnology(index)}>
                <FaEdit />
              </button>
              <button className="icon-button" onClick={() => deleteTechnology(index)}>
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechnologyPage;
