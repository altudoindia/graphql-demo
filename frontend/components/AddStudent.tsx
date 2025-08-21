import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
interface fielddata{
  studentName: string,
  fatherName: string,
  motherName: string,
  class:string,
  status:string,
  schoolName:string,
  address: string,
  adharNo: string,
  parentsOccupation: string,
  classTeacherName:string,
  photo: string,
}

const CREATE_STUDENT = gql`
  mutation CreateStudent($input: CreateStudentInput!) {
    createStudent(input: $input) {
      id
      studentName
      status
      rollNumber
      adharNo
    }
  }
`;

export default function AddStudent() {
  const [formData, setFormData] = useState<fielddata>({
    studentName: "",
    fatherName: "",
    motherName: "",
    class: "",
    status: "active",
    schoolName: "",
    address: "",
    adharNo: "",
    parentsOccupation: "",
    classTeacherName: "",
    photo: "",
  });

  const [createStudent, { data, loading, error, reset }] =  useMutation(CREATE_STUDENT);

  const handleChange = (e: { target: any; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });    
  };  

  const handleSubmit = async (e:{ preventDefault: any; }) => {
    e.preventDefault();
    try {
      const { data } = await createStudent({ variables: { input: formData } });
      alert(`Student adhar ${data.createStudent.adharNo} added successfully! Roll Number: ${data.createStudent.rollNumber}`);
    } catch (err) {  
      alert(`Student with this Aadhar ${data.createStudent.adharNo} already added`); 
      reset();
    }
  };
  

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Add New Student
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          name="studentName"
          placeholder="Student Name"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="fatherName"
          placeholder="Father Name"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="motherName"
          placeholder="Mother Name"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="class"
          placeholder="Class"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="schoolName"
          placeholder="School Name"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="adharNo"
          placeholder="Aadhar No"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="parentsOccupation"
          placeholder="Parents Occupation"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="classTeacherName"
          placeholder="Class Teacher Name"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div>
          <div className="col-span-1 md:col-span-2">
            <div className="relative">
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleChange({
                      target: { name: "photo", value: file.name },
                    });
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <div className="flex items-center justify-between px-4 py-2 border rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition duration-200 h-12">
                <span className="text-gray-600 font-medium truncate">
                  {formData.photo ? formData.photo : "Upload Photo"}
                </span>

                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-6-6V3m0 0l-3 3m3-3l3 3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Add Student"}
      </button>

      {/* Error message */}
      {error && (
        <p className="text-red-500 text-center font-medium mt-4">
          Error: {error.message}
        </p>
      )}
      {data && <p> Studen successfully added with Roll no. {data.createStudent.rollNumber}</p>}
     
    </form>
  );
}
