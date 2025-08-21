import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import StudentProfileModal from "./StudentProfileModal";
interface Student {
  id: string;
  studentName: string;
  class: string;
  status: string;
  rollNumber: number;
}
const GET_STUDENT_LIST = gql`
  query {
    students {
      studentName
      rollNumber
      class
      status
    }
  }
`;

export default function GetAllStudentList() {
  const { data, loading, error } = useQuery(GET_STUDENT_LIST);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (rollNumber: number) => {
    setSelectedStudent(rollNumber);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };
  return (
    <>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          🎓 Student List
        </h2>

        <div className="overflow-x-auto rounded-lg border border-gray-300">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-3 px-6 text-left">Serial No.</th>
                <th className="py-3 px-6 text-left">Student Name</th>
                <th className="py-3 px-6 text-left">Roll Number</th>
                <th className="py-3 px-6 text-left">Class</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.students?.map((student: Student, index: number) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{student.studentName}</td>
                  <td className="py-3 px-6 text-blue-600 underline cursor-pointer" 
                  onClick={() => openModal(student?.rollNumber)}>
                    {student.rollNumber}
                  </td>
                  <td className="py-3 px-6">{student.class}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        student.status === "active"
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-700"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && selectedStudent && (
      <StudentProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        studentRoll={selectedStudent}
      />
    )}
    </>
  );
}
