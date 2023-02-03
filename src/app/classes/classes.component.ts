import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { classData } from './class.model';
@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent {
  showAdd!:boolean;
  showUpdate!:boolean;

  classModelObj:classData = new classData;
  allClassData:any;
  formValue!:FormGroup;


  constructor(private formBuilder:FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name:['', Validators.required],
      teacher:['', Validators.required],
      location:['', Validators.required],
      grade:['', Validators.required],
    })
    this.getData();
  }

  add(){
    this.showAdd=true;
    this.showUpdate=false;
  }

  editClass(data:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.classModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['teacher'].setValue(data.teacher);
    this.formValue.controls['location'].setValue(data.location);
    this.formValue.controls['grade'].setValue(data.grade);
  }

  updateClass(){
    this.classModelObj.name = this.formValue.value.name;
    this.classModelObj.teacher = this.formValue.value.teacher;
    this.classModelObj.location = this.formValue.value.location;
    this.classModelObj.grade = this.formValue.value.grade;

    this.api.updateClass(this.classModelObj, this.classModelObj.id).subscribe(res=>{
      this.formValue.reset();
      this.getData();
    },
    err=>{
    })
  }

  addClass(){
    this.classModelObj.name = this.formValue.value.name;
    this.classModelObj.teacher = this.formValue.value.teacher;
    this.classModelObj.location = this.formValue.value.location;
    this.classModelObj.grade = this.formValue.value.grade;

    this.api.postClass(this.classModelObj).subscribe(res=>{
      console.log(this.classModelObj);
      this.formValue.reset();
      this.getData();
    },
    err=>{
    })
  }

  getData(){
    this.api.getClasses().subscribe(res=>{
      this.allClassData = res;
    })
  }

  deleteClass(data:any){
    if(confirm('Are you sure you want to delete?'))
    this.api.deletestudent(data.id).subscribe(res=>{
      this.getData();
    })
  }

}
