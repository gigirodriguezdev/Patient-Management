import { getPatients } from '../services/patient';
import { useEffect, useState } from 'react';
import { PatientCard } from './PatientCard';
import { Button } from './Button';
import { Modal } from './Modal';
import { Patient } from '../interfaces/interfaces';
import { Form } from './Form';
import { toast } from 'react-toastify';

export const PatientsPage = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    fetchPatients().then((patients) => {
      setPatients(patients);
    });
  }, []);

  const fetchPatients = async (): Promise<Patient[]> => {
    const response = await getPatients();
    const patients = await response.json();
    return patients;
  };

  const handleAddNewPatient = (data: Patient) => {
    const date = new Date();
    data.createdAt = date.toString();
    data.modifiedAt = date;
    data.id = (patients.length + 1).toString();
    console.log('Added patient data :', data);
    setPatients([...patients, data]);
    toast.success('Patient added successfully');
    setModalVisible(false);
  };

  const handleUpdatePatient = (data: Patient) => {
    const date = new Date();
    data.modifiedAt = date;
    const patientsCopy = [...patients];
    const patientIndex = patientsCopy.findIndex(
      (patient) => patient.id === data.id,
    );
    patientsCopy[patientIndex] = data;
    setPatients(patientsCopy);
  };

  const sortPatients = (patients: Patient[]) => {
    const patientsCopy = [...patients];
    return patientsCopy.sort((a, b) => {
      if (new Date(a.createdAt) < new Date(b.createdAt)) return 1;
      if (new Date(a.createdAt) > new Date(b.createdAt)) return -1;

      if (a.modifiedAt && b.modifiedAt) {
        if (a.modifiedAt < b.modifiedAt) return 1;
        if (a.modifiedAt > b.modifiedAt) return -1;
      }

      if (a.id > b.id) return 1;
      if (a.id < b.id) return -1;

      return 0;
    });
  };

  return (
    <div className="p-10 bg-white">
      <div className="flex justify-between items-center py-6">
        <h1 className="text-2xl font-bold text-gray-800 cute-header">
          Patients
        </h1>
        <Button
          buttonText={'Add a new patient +'}
          onClick={() => setModalVisible(true)}
        ></Button>
      </div>
      {patients.length === 0 && <p>No patients found</p>}
      <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-6">
        {sortPatients(patients).map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            handleUpdatePatient={handleUpdatePatient}
          />
        ))}
      </div>
      <Modal isVisible={isModalVisible} onClose={() => setModalVisible(false)}>
        <Form
          onSubmit={handleAddNewPatient}
          onCancel={() => setModalVisible(false)}
        ></Form>
      </Modal>
    </div>
  );
};
