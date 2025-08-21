import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  rollNumber: { type: Number, unique: true },
  studentName: String,
  fatherName: String,
  motherName: String,
  class: String,
  status: { type: String, default: "Active" },
  schoolName: String,
  address: String,
  adharNo: { type: String, unique: true }, 
  parentsOccupation: String,
  classTeacherName: String,
  photo: String,
});

studentSchema.pre("save", async function (next) {
  if (!this.rollNumber) {
    let roll;
    let exists = true;
    while (exists) {     
      roll = Math.floor(10000 + Math.random() * 90000).toString();
      const existing = await mongoose
        .model("Student")
        .findOne({ rollNumber: roll });
      if (!existing) {
        exists = false;
      }
    }
    this.rollNumber = roll;
  }
  next();
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
