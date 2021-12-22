import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {EmployeeServiceService} from '../employee-service.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {



  ngOnInit(): void {
  }


  addEmp = new FormGroup({
    Emp_id: new FormControl(''),
    EmpName: new FormControl(''),
    Dept: new FormControl(''),
    Designation: new FormControl('')
  })

  editEmp = new FormGroup({
    EmpName: new FormControl(''),
    Dept: new FormControl(''),
    Designation: new FormControl('')
  })
  
update(empObj:any){
  this.updateId=empObj.Emp_id;
  var Obj = {...empObj}
  delete Obj['Emp_id'];
  this.editEmp.setValue(Obj);
}

  constructor(private empService:EmployeeServiceService,private router:ActivatedRoute){}

  updateId:any = -1;


  collection(){          //onsubmit change
    console.warn("item",this.editEmp.value) 
    this.empService.updataEmployee(this.updateId,this.editEmp.value).subscribe((result)=>{
      console.warn("result",result)
      this.editEmp.reset();
  
    })
  }

  arrEmployees:any = [];
  getAllEmployees(){
    this.empService.getAllEmployees().subscribe(
      (data)=>{
        console.log("Received data:"+JSON.stringify(data))
        this.arrEmployees = data;
      },
      (error)=> console.log(error)
    )
  };

  //Get the employee by id
  EMPID = 0;
  getEmployeeByID(){
    this.empService.getEmployeeById(this.EMPID).subscribe(
      (data)=>{
        console.log("Received data:"+ JSON.stringify(data))
        var empobj = data;
        this.arrEmployees = [];
        this.arrEmployees.push(empobj);
      },
      (error)=> console.log(error)
    )
  }

  // insertEmployee(){
  //   let empObj = {"Emp_id":105, "EmpName":"RK","Dept":"CS","Designation":"Senior FSD"};
  //   this.empService.insertEmployee(empObj).subscribe(
  //     (data)=>{
  //       alert(data);
  //       console.log("Inserted data is"+JSON.stringify(data));
  //       this.getAllEmployees();
  //     },
  //     (error)=>console.log("Unable to insert data"+ error)
  //   );
  // }


  collectResto(){
    // console.warn(this.addRestro.value)
     this.empService.insertEmployee(this.addEmp.value).subscribe((data)=>{
      console.log("Data returned from insertion"+JSON.stringify(data));
     })
     this.addEmp.reset({})
   }
   

   
  EMPIDFORDELTE = 0;
  deleteEmployee(){
    this.empService.deleteEmployee(this.EMPIDFORDELTE).subscribe(
      (data)=>{
        console.log("Data returned from delete is"+JSON.stringify(data));
        alert(data);
        this.getAllEmployees();
      },
      (error)=> console.log("Unabled to delete record because"+JSON.stringify(error))
    );
  }





}



