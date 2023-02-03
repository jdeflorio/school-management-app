import { studentData } from "../student/student.model";

export class classData{
  id:number = 0;
  name:string = '';
  location:string = '';
  grade:string = '';
  teacher:string = '';
  students:studentData[] = [];
}