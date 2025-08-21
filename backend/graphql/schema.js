// graphql/schema.js
import gql from 'graphql-tag';

export const typeDefs = gql`
type Student {
  id: ID!
  rollNumber: Int!
  studentName: String!
  fatherName: String!
  motherName: String!
  class: String!
  status: String!
  schoolName: String!
  address: String!
  adharNo: String!  
  parentsOccupation: String!
  classTeacherName: String!
  photo: String!
}

input CreateStudentInput {
  studentName: String!
  fatherName: String!
  motherName: String!
  class: String!
  status: String!  
  schoolName: String!
  address: String!
  adharNo: String!   
  parentsOccupation: String!
  classTeacherName: String!
  photo: String!
}

type Query {
  students: [Student!]!
  studentByRoll(rollNumber: Int!): Student
}

type Mutation {
  createStudent(input: CreateStudentInput!): Student!
}
`;
