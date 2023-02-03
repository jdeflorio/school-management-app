import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }

  postClass(data:any){
    return this._http.post<any>("http://localhost:3000/posts", data).pipe(map((res:any)=> {
      return res;
    }))
  }

  getClasses(){
    return this._http.get<any>("http://localhost:3000/posts").pipe(map((res:any)=>{
      return res;
    }))
  }

  getStudents(id:any){
    return this._http.get<any>("http://localhost:3000/posts/" + id).pipe(map((res:any)=>{
      return res;
    }))
  }

  updateClass(data:any, id:number){
    return this._http.put("http://localhost:3000/posts/" + id, data).pipe(map((res:any)=>{
      return res;
    }))
  }

  putStudent(data:any, id:number){
    return this._http.put("http://localhost:3000/posts/" + id, data).pipe(map((res:any)=>{
      return res;
    }))
  }

  deletestudent(id:any){
    return this._http.delete<any>("http://localhost:3000/posts/" + id).pipe(map((res:any)=>{
      return res;
    }))
  }
}
