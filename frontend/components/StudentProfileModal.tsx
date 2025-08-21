import { gql,useQuery } from "@apollo/client";

interface StudentProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    studentRoll: number | null;
    
  }
  const GET_STUDENT_BY_ROLL = gql`
  query GetStudentByRoll($rollNumber: Int!) {
    studentByRoll(rollNumber: $rollNumber) {
      id
      studentName
      rollNumber
      fatherName
      motherName
      class
      status
      schoolName
      address
      adharNo
      parentsOccupation
      classTeacherName
      photo
    }
  }
`;
export default function StudentProfileModal({ isOpen, onClose, studentRoll }: StudentProfileModalProps) {
    const { data, loading, error } = useQuery(GET_STUDENT_BY_ROLL, {
        variables: { rollNumber: studentRoll },
        skip: studentRoll === null,
      });
  
    if (!isOpen) return null;
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    const student = data?.studentByRoll;
  
    if (!student) return <p>No student found</p>;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 font-bold text-xl"
            onClick={onClose}
          >
            &times;
          </button>
  
          <h2 className="text-2xl font-bold mb-4">{student.studentName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Roll Number:</strong> {student.rollNumber}</p>
            <p><strong>Class:</strong> {student.class}</p>
            <p><strong>Status:</strong> {student.status}</p>
            <p><strong>Father Name:</strong> {student.fatherName}</p>
            <p><strong>Mother Name:</strong> {student.motherName}</p>
            <p><strong>School Name:</strong> {student.schoolName}</p>
            <p><strong>Address:</strong> {student.address}</p>
            <p><strong>Aadhar No:</strong> {student.adharNo}</p>
            <p><strong>Parents Occupation:</strong> {student.parentsOccupation}</p>
            <p><strong>Class Teacher:</strong> {student.classTeacherName}</p>
            {student.photo && <img src={`/profilePhto/${student.photo}`} alt={student.studentName} className="col-span-1 md:col-span-2 mt-2 w-32 h-32 object-cover rounded-lg" />}
          </div>
        </div>
      </div>
    );
  }