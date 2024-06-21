import React, { ChangeEvent, useState } from 'react';
import { FormProps, ValidationErrors } from '../interfaces/interfaces';
import { toast } from 'react-toastify';

export const Form = ({ initialData, onSubmit, onCancel }: FormProps) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      avatar: null,
      description: '',
      website: '',
      createdAt: '',
      modifiedAt: undefined,
      id: '',
    },
  );
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === 'avatar' && (e.target as HTMLInputElement).files) {
      const fileObject = (e.target as HTMLInputElement).files[0];
      const fileUrl = URL.createObjectURL(fileObject);
      setFormData({
        ...formData,
        avatar: fileUrl,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validate = () => {
    const newErrors: ValidationErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (formData.name.length >= 20) {
      newErrors.name = 'Name exceeds 20 characters limit';
    }
    if (!formData.avatar) {
      newErrors.avatar = 'Avatar is required';
    }

    if (!formData.description) {
      newErrors.description = 'Description is required';
    }

    if (formData.description.length > 600) {
      newErrors.description = 'Description exceeds 600 characters limit';
    }

    if (!formData.website) {
      newErrors.website = 'Website URL is required';
    } else if (!/^(https?:\/\/|www\.).+\..+/.test(formData.website)) {
      newErrors.website =
        'Website must be a valid URL starting with http://, https://, or www.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  return (
    <form className="mb-4">
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Avatar</label>
        {formData.avatar && (
          <img
            src={formData.avatar}
            alt={formData.name}
            className="w-32 h-32 max-w-32 max-h-32 relative rounded-full mb-4 object-cover border-2 border-gray-300 transition-all"
          />
        )}
        <input
          type="file"
          name="avatar"
          onChange={handleInputChange}
          className="w-30 h-30 absolute opacity-0"
        />
        <div className="cursor-pointer">
          <svg
            className="feather feather-edit"
            fill="none"
            height="24"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </div>
        {errors.avatar && (
          <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mt-1 h-24"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Website</label>
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.website && (
          <p className="text-red-500 text-sm mt-1">{errors.website}</p>
        )}
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className="px-4 py-2 mr-2 bg-gray-200 text-gray-700 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          onClick={handleFormSubmit}
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
};
