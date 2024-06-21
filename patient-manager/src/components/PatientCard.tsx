import { useState } from 'react';
import { Patient, PatientCardProps } from '../interfaces/interfaces';
import { Paragraph } from './Paragraph';
import { Button } from './Button';
import { Modal } from './Modal';
import { Form } from './Form';
import { toast } from 'react-toastify';

export const PatientCard = ({
  patient,
  handleUpdatePatient,
}: PatientCardProps) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleFormSubmit = (patient: Patient) => {
    if (handleUpdatePatient) {
      handleUpdatePatient(patient);
    }
    toast.success('Patient updated successfully');
    console.log(
      'Updated patient data :',
      patient.modifiedAt + 'patient id: ' + patient.id,
    );
    setModalVisible(false);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 shadow-lg hover:shadow-xl transition-transform transform hover:translate-y-1 bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {patient.name}
        </h2>
        <Button buttonText="Edit" onClick={() => setModalVisible(true)} />
      </div>
      <img
        src={patient.avatar}
        alt={patient.name}
        className="max-w-32 max-h-32 w-32 h-32 rounded-full mb-4 object-cover border-2 border-gray-300 transition-all"
      />
      <Paragraph text={patient.description} />
      <a
        href={patient.website}
        className="block text-blue-500 hover:text-blue-700 mb-4 font-medium"
      >
        {patient.website}
      </a>
      <Modal isVisible={isModalVisible} onClose={() => setModalVisible(false)}>
        <Form
          initialData={patient}
          onSubmit={handleFormSubmit}
          onCancel={() => setModalVisible(false)}
        />
      </Modal>
    </div>
  );
};
