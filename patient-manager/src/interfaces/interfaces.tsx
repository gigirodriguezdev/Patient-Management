export interface Patient {
  modifiedAt?: Date | undefined;
  createdAt: string;
  name: string;
  avatar: string;
  description: string;
  website: string;
  id: string;
}

export interface PatientCardProps {
  patient: Patient;
  handleUpdatePatient?: (patient: Patient) => void;
}

export interface FormProps {
  initialData?: Patient;
  onSubmit: (data: Patient) => void;
  onCancel: () => void;
  isEdit?: boolean;
  isAdd?: boolean;
}

export interface ButtonProps {
  onClick: () => void;
  buttonText: string;
}

export interface ValidationErrors {
  name?: string;
  avatar?: string;
  description?: string;
  website?: string;
}
