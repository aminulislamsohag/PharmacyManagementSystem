import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import moment from 'moment'; // Import moment
import '../../styles/ReportScreen.css';
import { BuyMedicineReport, VoucherReport } from '../../utils/api'; // Import your API functions
import { saveAs } from 'file-saver'; // For downloading files

// Define report configurations with different parameter types
const reports = [
  {
    id: 1,
    name: 'Buy Report',
    parameters: [
      { id: 'entrydate', label: 'Entry Date', type: 'date' },
    ],
  },
  {
    id: 2,
    name: 'Voucher Report',
    parameters: [
      { id: 'voucherid', label: 'Voucher NO', type: 'number' },
      { id: 'entrydate', label: 'Entry Date', type: 'date' }
    ],
  },
  {
    id: 3,
    name: 'Inventory Report',
    parameters: [
      { id: 'category', label: 'Category', type: 'text' },
      { id: 'threshold', label: 'Threshold Quantity', type: 'number' },
    ],
  },
  {
    id: 4,
    name: 'User Activity Report',
    parameters: [
      { id: 'userId', label: 'User ID', type: 'text' },
      { id: 'activityDate', label: 'Activity Date', type: 'date' },
    ],
  },
  // Add more reports and parameters as needed
];

const ReportScreen = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [fileType, setFileType] = useState('pdf'); // State for selected file type
  const [loading, setLoading] = useState(false); // Loading state for button

  const handleReportSelect = (report) => {
    setSelectedReport(report);
    setFormValues({}); // Reset form values when a new report is selected
  };

  const handleInputChange = (paramId, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [paramId]: value,
    }));
  };

  const handleFileTypeChange = (e) => {
    setFileType(e.target.value); // Update file type (pdf or xlsx)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format date fields before sending
    const formattedValues = { ...formValues };
    selectedReport.parameters.forEach(param => {
      if (param.type === 'date' && formValues[param.id]) {
        formattedValues[param.id] = moment(formValues[param.id]).format('DD-MM-YYYY');
      }
    });

    try {
      setLoading(true); // Show loading spinner

      let response;
      if (selectedReport.name === 'Buy Report') {
        response = await BuyMedicineReport({ ...formattedValues, fileType });
      } else if (selectedReport.name === 'Voucher Report') {
        response = await VoucherReport({ ...formattedValues, fileType });
      } else {
        console.log('Other report logic to be implemented');
        return;
      }

      // Create a Blob from the response and trigger download
      const blob = new Blob([response.data], { type: fileType === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `${selectedReport.name}.${fileType}`);
      console.log('Report downloaded successfully');
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="report-dashboard">
      <div className="report-list">
        <h3>Report Name</h3>
        <ul>
          {reports.map((report) => (
            <li key={report.id} onClick={() => handleReportSelect(report)}>
              {report.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="report-parameters">
        {selectedReport ? (
          <>
            <h3>{selectedReport.name}</h3>
            <Form onSubmit={handleSubmit}>
              {selectedReport.parameters.map((param) => (
                <Form.Group controlId={param.id} key={param.id} className="mb-3">
                  <Form.Label>{param.label}</Form.Label>
                  <Form.Control
                    type={param.type}
                    value={formValues[param.id] || ''}
                    onChange={(e) => handleInputChange(param.id, e.target.value)}
                    placeholder={`Enter ${param.label.toLowerCase()}`}
                  />
                </Form.Group>
              ))}
              <Form.Group className="mb-3">
                <Form.Label>File Type</Form.Label>
                <Form.Control as="select" value={fileType} onChange={handleFileTypeChange}>
                  <option value="pdf">PDF</option>
                  <option value="xlsx">Excel</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
                {loading ? 'Generating...' : 'Generate Report'}
              </Button>
            </Form>
          </>
        ) : (
          <p>Select a report to view parameters.</p>
        )}
      </div>
    </div>
  );
};

export default ReportScreen;
