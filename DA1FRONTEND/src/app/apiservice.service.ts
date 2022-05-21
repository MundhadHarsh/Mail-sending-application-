import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient) {  }
  apiUrl = 'http://localhost:3003/customer';
 

  //get all data
  getAllData():Observable<any>
   {return this._http.get(`${this.apiUrl}`)}

   //create data
   createData(data:any):Observable<any>
   {
    console.log(data,'createapi=>');
    return this._http.post(`${this.apiUrl}`,data);
   }  

   deleteData(id:any):Observable<any>
   {
      let ids = id;
      return this._http.delete(`${this.apiUrl}/${ids}`)
   }
   sendMail(id:any):Observable<any>
   {
      let ids = id;
      return this._http.get(`${this.apiUrl}/customermail/${ids}`)
   }

   updateData(data:any,id:any):Observable<any>
   { let ids=id; 
     return this._http.put(`${this.apiUrl}/${ids}`,data)  
   };
}
