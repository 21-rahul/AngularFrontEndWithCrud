import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private http:HttpClient) { }

  baseUrl = "http://localhost:8003"

  getAllEmployees():Observable<any>
  {
    var url = this.baseUrl+"/api/getdata";
    return this.http.get(url);
  }

  //get the Employee data by id

  getEmployeeById(id:number):Observable<any>
  {
    var url = this.baseUrl+"/api/getDataByid/"+id;
    return this.http.get(url);
  }

  //for insertion
  insertEmployee(empObj:any):Observable<any>
  {
    var url = this.baseUrl+"/api/insertEmp";
    let header = {'content-type':'application/json'};

    return this.http.post(url,empObj,{'headers':header,responseType:'text'});
  }

  getCurrentResto(id:any):Observable<any>{
    var url = this.baseUrl+"/api/getDataByid/"+id;
    return this.http.get(url);
  }

updataEmployee(id:any,empObj:any):Observable<any>
{
  var url = this.baseUrl+"/api/UpdateEmp/"+id;
    let header = {'content-type':'application/json'};
    return this.http.put(url,empObj,{'headers':header,responseType:'text'});
}

//deletion
deleteEmployee(id:number):Observable<any>
{
  let URL = this.baseUrl+"/api/deleteEmp/"+id;
  console.log("Url+"+URL);
  return this.http.delete(URL,{responseType:'text'});
}

}