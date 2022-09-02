import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  private httpOptions : any;
  private httpOptions1 : any;
  private baseUrl = 'http://ec2-3-95-183-102.compute-1.amazonaws.com:8080/';
  private authToken = sessionStorage.getItem("authToken");
  public userData: any;
  

  constructor(private http: HttpClient,public db: AngularFirestore) { 
    
      this.httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
        "Access-Control-Allow-Headers": "Access-Control-Allow-Origin,Origin, X-Requested-With, Content-Type, Accept,Accept-Language,User-Agent",
        'Authorization': 'Bearer '+ this.authToken
      })
    };
    this.httpOptions1 = {
      headers1: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
        "Access-Control-Allow-Headers": "Access-Control-Allow-Origin,Origin, X-Requested-With, Content-Type, Accept,Accept-Language,User-Agent"
      })
    };
  }

  createAdmin(value) {
    const url = this.baseUrl+'api/register';
    try {
      const b = { 
        "login": value.username,
        "lastName": value.lastName,
        "firstName":value.firstName,
        "email": value.email,
        "activated": value.status,
        "password": value.password,
        "authorities": ["ROLE_USER"]
    };
      console.log(b);
      
      return this.http.post(url,b,this.httpOptions);
    } catch (error) {
      console.log(error);
      
    }

  }

  updateUser(adminLogin, value) {
    const url = this.baseUrl+'api/admin/users/'+adminLogin;
    return this.http.get(url,this.httpOptions);
  }

  searchUsers(searchValue) {
    return this.db.collection('usersContact', ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  searchUsersByAge(value) {
    return this.db.collection('usersContact', ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }

  getAdmin(adminLogin) : Observable<any>{
    const url = this.baseUrl+'api/admin/users/'+adminLogin;
    return this.http.get(url,this.httpOptions);
  }
  getAdmins(): Observable<any>{
    const url = this.baseUrl+'api/admin/users';
    console.log(url);
    
    return this.http.get(url,this.httpOptions);
  }

  deleteAdmin(adminLogin) {
    const url = this.baseUrl+'api/admin/users/'+adminLogin;
    return this.http.delete(url,this.httpOptions);
  }


  getUser(phone,password): Observable<any> {
    const url = this.baseUrl+'auth/in';
    const body = { phone:phone, password:password };
    return this.http.post(url,body,this.httpOptions1);
  }
  
 async getUsers(value) {
  const response = await fetch(this.baseUrl+'user/create', {
    method: 'POST',
    body: JSON.stringify({value}),
    headers: {'Content-Type': 'application/json'} 
  });
  
  if (!response.ok) 
  { 
      console.error("Error");
  }
  else if (response.status >= 400) {
      console.error('HTTP Error: '+response.status);
  }
  else{
      console.log("ok");
      
  }
  }
  getAuthorities(){
    const url = this.baseUrl+'api/authorities';
    return this.http.get(url,this.httpOptions);
  }
}
