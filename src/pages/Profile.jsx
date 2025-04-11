import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const PatientProfile = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        gender: '',
        photo: null,
        dateOfBirth: '',
        bloodGroup: '',
        height: '',
        weight: '',
        allergies: '',
        currentMedications: '',
        emergencyContact: {
            name: '',
            relationship: '',
            phone: ''
        },
        medicalHistory: '',
        insuranceInfo: {
            provider: '',
            policyNumber: '',
            expiryDate: ''
        }
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Field validation rules
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
        
        // Emergency contact validation
        if (!formData.emergencyContact.name.trim()) {
            newErrors['emergencyContact.name'] = 'Emergency contact name is required';
        }
        if (!formData.emergencyContact.phone.trim()) {
            newErrors['emergencyContact.phone'] = 'Emergency contact phone is required';
        }
        if (!/^\d{10}$/.test(formData.emergencyContact.phone)) {
            newErrors['emergencyContact.phone'] = 'Invalid emergency contact phone';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: files ? files[0] : value,
            }));
        }
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error('Please fill all required fields correctly');
            return;
        }
        
        setLoading(true);
        try {
            // API call would go here
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            console.log('Patient Profile Data:', formData);
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const InputField = ({ label, name, type = 'text', required = false, ...props }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={name.includes('.') ? 
                    formData[name.split('.')[0]][name.split('.')[1]] : 
                    formData[name]}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                    errors[name] ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                {...props}
            />
            {errors[name] && (
                <p className="mt-1 text-xs text-red-500">{errors[name]}</p>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-blue-600 px-6 py-4">
                    <h1 className="text-2xl font-bold text-center text-white">Patient Profile</h1>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                                Personal Information
                            </h3>
                            
                            <InputField
                                label="Full Name"
                                name="fullName"
                                required
                                placeholder="Enter your full name"
                            />

                            <InputField
                                label="Date of Birth"
                                name="dateOfBirth"
                                type="date"
                                required
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Gender <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full px-3 py-2 border ${
                                        errors.gender ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.gender && (
                                    <p className="mt-1 text-xs text-red-500">{errors.gender}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                                <select
                                    name="bloodGroup"
                                    value={formData.bloodGroup}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                >
                                    <option value="">Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Contact Information</h3>
                            
                            <InputField
                                label="Email"
                                name="email"
                                type="email"
                                required
                                placeholder="Enter your email"
                            />

                            <InputField
                                label="Phone"
                                name="phone"
                                type="tel"
                                required
                                placeholder="Enter your phone number"
                            />

                            <div className="space-y-2">
                                <h4 className="text-sm font-medium text-gray-700">Emergency Contact</h4>
                                <InputField
                                    label="Emergency Contact Name"
                                    name="emergencyContact.name"
                                    placeholder="Emergency Contact Name"
                                />
                                <InputField
                                    label="Relationship"
                                    name="emergencyContact.relationship"
                                    placeholder="Relationship"
                                />
                                <InputField
                                    label="Emergency Contact Phone"
                                    name="emergencyContact.phone"
                                    type="tel"
                                    placeholder="Emergency Contact Phone"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Medical Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Medical Information</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField
                                label="Height (cm)"
                                name="height"
                                type="number"
                                placeholder="Enter your height"
                            />
                            <InputField
                                label="Weight (kg)"
                                name="weight"
                                type="number"
                                placeholder="Enter your weight"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Allergies</label>
                            <textarea
                                name="allergies"
                                value={formData.allergies}
                                onChange={handleChange}
                                rows="2"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="List any allergies..."
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Current Medications</label>
                            <textarea
                                name="currentMedications"
                                value={formData.currentMedications}
                                onChange={handleChange}
                                rows="2"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="List current medications..."
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Medical History</label>
                            <textarea
                                name="medicalHistory"
                                value={formData.medicalHistory}
                                onChange={handleChange}
                                rows="3"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Brief medical history..."
                            ></textarea>
                        </div>
                    </div>

                    {/* Insurance Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Insurance Information</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <InputField
                                label="Insurance Provider"
                                name="insuranceInfo.provider"
                                placeholder="Enter insurance provider"
                            />
                            <InputField
                                label="Policy Number"
                                name="insuranceInfo.policyNumber"
                                placeholder="Enter policy number"
                            />
                            <InputField
                                label="Expiry Date"
                                name="insuranceInfo.expiryDate"
                                type="date"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center px-6 py-3 border border-transparent 
                                rounded-md shadow-sm text-base font-medium text-white bg-blue-600 
                                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                                focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 
                                disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Updating Profile...
                                </>
                            ) : (
                                'Update Profile'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PatientProfile;