import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import './ReportsPage.css';

const ReportsPage = () => {
    const [reports, setReports] = useState([]);
    const [reportText, setReportText] = useState('');
    const [image, setImage] = useState(null);
    const [editId, setEditId] = useState(null);

    const handleAddOrEditReport = (e) => {
        e.preventDefault();
        if (reportText) {
            if (editId) {
                setReports(reports.map((report) =>
                    report.id === editId
                        ? { ...report, text: reportText, image: image ? URL.createObjectURL(image) : report.image }
                        : report
                ));
                setEditId(null);
            } else {
                const newReport = {
                    text: reportText,
                    image: image ? URL.createObjectURL(image) : null,
                    id: Date.now(),
                };
                setReports([...reports, newReport]);
            }
            setReportText('');
            setImage(null);
        }
    };

    const handleEdit = (report) => {
        setReportText(report.text);
        setImage(null);
        setEditId(report.id);
    };

    const handleDelete = (id) => {
        setReports(reports.filter((report) => report.id !== id));
    };

    return (
        <div className="reports-container">
            <h2>Gestión de Reportes</h2>
            <form onSubmit={handleAddOrEditReport} className="report-form">
                <input
                    type="text"
                    className="input-field"
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                    placeholder="Descripción del reporte"
                />
                <input
                    type="file"
                    className="input-file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit" className="button">
                    {editId ? 'Guardar Cambios' : 'Agregar Reporte'}
                </button>
            </form>
            <div className="reports-list">
                {reports.map((report) => (
                    <div key={report.id} className="report-item">
                        <div className="report-info">
                            <p>{report.text}</p>
                            {report.image && <img src={report.image} alt="Reporte" className="report-image" />}
                        </div>
                        <div className="report-actions">
                            <button onClick={() => handleEdit(report)} className="icon-button edit-button">
                                <FaEdit />
                            </button>
                            <button onClick={() => handleDelete(report.id)} className="icon-button delete-button">
                                <FaTrashAlt />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReportsPage;
