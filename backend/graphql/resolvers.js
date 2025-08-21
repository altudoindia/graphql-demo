import Student from '../models/userModel.js';

export const resolvers = {
  Query: {
    students: async () => await Student.find(),
    studentByRoll: async (_, { rollNumber }) => {
      return await Student.findOne({ rollNumber });
    },
  },
  Mutation: {
    createStudent: async (_, { input }) => {
      try {
        const student = new Student({
          ...input,
          status: input.status?.trim() || 'active',
        });
        await student.save();
        return student;
      } catch (err) {
        if (err.code === 11000) {    
          throw new Error("Student with this Aadhar or Roll Number already exists!");
        }
        throw err;
      }
    },
  },
};
