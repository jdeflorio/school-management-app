import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { studentData } from './student.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {

  showAdd!:boolean;
  showUpdate!:boolean;

  studentModellObj:studentData = new studentData;
  allStudentData:any;
  formValue!:FormGroup;

  studentListID!: number;


  constructor(private formBuilder:FormBuilder, private api:ApiService, route: ActivatedRoute) {
    route.params.subscribe((params => {
      this.studentListID = params["id"];
    }))
   }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name:['', Validators.required],
      email:['', Validators.required],
      mobile:['', Validators.required],
      city:['', Validators.required],
    })
    this.getData();
  }

  add(){
    this.showAdd=true;
    this.showUpdate=false;
  }

  editStudent(data:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.studentModellObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['city'].setValue(data.city);
  }

  updateStudent(){
    this.studentModellObj.name = this.formValue.value.name;
    this.studentModellObj.email = this.formValue.value.email;
    this.studentModellObj.mobile = this.formValue.value.mobile;
    this.studentModellObj.city = this.formValue.value.city;

    const studentIndex = this.allStudentData.students.findIndex( (e: any) => {
      return e.id === this.studentModellObj.id;
    })

    this.allStudentData.students[studentIndex] = this.studentModellObj;



    this.api.updateClass(this.allStudentData, this.studentListID).subscribe(res=>{
      this.formValue.reset();
      this.getData();
    })

  }

  addStudent(){
    this.studentModellObj.name = this.formValue.value.name;
    this.studentModellObj.email = this.formValue.value.email;
    this.studentModellObj.mobile = this.formValue.value.mobile;
    this.studentModellObj.city = this.formValue.value.city;
    this.studentModellObj.id = Math.floor(Math.random() * 1000);

    this.allStudentData.students.push(this.studentModellObj);

    this.api.putStudent(this.allStudentData, this.studentListID).subscribe(res=>{
      console.log(this.allStudentData);
      this.formValue.reset();
      this.getData();
    },
    err=>{
    })
  }

  getData(){
    this.api.getStudents(this.studentListID).subscribe(res=>{
      console.log(res.students);
      this.allStudentData = res;
    })
  }

  deleteStudent(data:any){
    if(confirm('Are you sure you want to delete?')){

      this.studentModellObj.id = data.id;

      const studentIndex = this.allStudentData.students.findIndex( (e: any) => {
        return e.id === this.studentModellObj.id;
      });

     
      this.allStudentData.students.splice(studentIndex, 1);

      this.api.updateClass(this.allStudentData, this.studentListID).subscribe(res=>{
        this.getData();
     })
    }
  }


}
