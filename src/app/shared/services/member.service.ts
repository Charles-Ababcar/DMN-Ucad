import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { GeneralInfoService } from './general-info.service';

@Injectable({
  providedIn: 'root'
})

export class MemberService {

  private httpOptions : any;
  private httpOptions1 : any;
  private baseUrl = 'http://ec2-44-202-218-253.compute-1.amazonaws.com:8080/';
  private authToken = sessionStorage.getItem("authToken");
  public userData: any;
  

  constructor(private http: HttpClient,public db: AngularFirestore,private generalInfoService: GeneralInfoService) { 
    
      this.httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json',
        'Accept': '*/*',
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

  createMember(value) {

    const url = this.baseUrl+'api/membres';
    let b : any;
    try {
      if(value.profession != null){
        b = { 
          "membre": {
          "nom": value.lastName,
          "prenom":value.firstName,
          "telephone":value.telephone,
          "sexe":value.sexe,
          "email": value.email,
          "cni": value.cni,
          "adresse": value.adresse,
          "adressDakar": value.adresseDakar,
          "adresseVacance": value.adresseVacances,
          "situationMatrimoniale": value.situationMatrimoniale,
          "dateNaissance": value.ddn,
          "boursier": value.boursier,
          "daaraOrigine": value.daaraOrigine,
          "etatSante": value.etatSante,
          "titeur": value.tuteur,
          "telephoneTiteur": value.telephoneTuteur,
          "departement": null,
          "profession": { "id": value.profession},
          },
          "cellule": {
            "id": value.cellule
          },
          "commission": {
            "id": value.commission
          }
        }
      }else{
        b = { 
          "membre": {
          "nom": value.lastName,
          "prenom":value.firstName,
          "telephone":value.telephone,
          "sexe":value.sexe,
          "email": value.email,
          "cni": value.cni,
          "adresse": value.adresse,
          "adressDakar": value.adresseDakar,
          "adresseVacance": value.adresseVacances,
          "situationMatrimoniale": value.situationMatrimoniale,
          "dateNaissance": value.ddn,
          "boursier": value.boursier,
          "daaraOrigine": value.daaraOrigine,
          "etatSante": value.etatSante,
          "titeur": value.tuteur,
          "telephoneTiteur": value.telephoneTuteur,
          "departement": { "id": value.departement},
          "profession": null
          },
          "cellule": {
            "id": value.cellule
          },
          "commission": {
            "id": value.commission
          }
        }
      }
      console.log(b);
      
        return this.http.post(url,b,this.httpOptions);
     
      
    } catch (error) {
      console.log(error);
    }

  }
  private handleError<T>(result = {} as T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);
      return of(result);
    };
  }
  
  updateUser(memberLogin, value) {
    const url = this.baseUrl+'api/Member/users/'+memberLogin;
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

  getMember(memberLogin) : Observable<any>{
    const url = this.baseUrl+'api/membres/'+memberLogin;
    return this.http.get(url,this.httpOptions);
  }
  getMembers(): Observable<any>{
    const url = this.baseUrl+'api/membres';
    console.log(url);
    
    return this.http.get(url,this.httpOptions);
  }

  deleteMember(id) {
    const url = this.baseUrl+'api/membres/'+id;
    return this.http.delete(url,this.httpOptions);
  }
  getEnseignements(): Observable<any>{
    const url = this.baseUrl+'api/enseignements';
    console.log(url);
    
    return this.http.get(url,this.httpOptions);
  }

  getEnseignement(id) : Observable<any>{
    const url = this.baseUrl+'api/enseignements/'+id;
    return this.http.get(url,this.httpOptions);
  }

  createEnseignement(value,idXamxam){
    const url = this.baseUrl+'api/enseignements';
    console.log(url);
    let b = null;
    if(idXamxam != null){
      b = 
      {
          "dateDebut": value.startDate,
          "dateFin": value.endDate,
          "encours": value.doing,
          "membre": value.member,
          "coran": value.coran,
          "xamXam": {
            "id": idXamxam,
            "libelle": "",
            "niveauXamXam": {
              "id": 0,
              "libelle": "string",
              "poids": 0
            }
          }
      }
    }else{
      b = 
      {
          "dateDebut": value.startDate,
          "dateFin": value.endDate,
          "encours": value.doing,
          "membre": value.member,
          "coran": {
            "id": value.coran,
            "libelle": ""
          },
          "xamXam": null
      }
    }

    console.log(b);
    
    
    return this.http.post(url,b,this.httpOptions);
  }

  updateEnseignement(value,type,id){
    console.log(id);
    
    const url = this.baseUrl+'api/enseignements/'+id;
    console.log(url);
    let b = null;
    if(type == 'xamxam'){
      b = 
      {
          "id": id,
          "dateDebut": value.startDate,
          "dateFin": value.endDate,
          "encours": value.doing,
          "coran": value.coran,
          "membre": value.member,
          "xamXam": {
            "id": value.xamxam,
            "libelle": "",
            "niveauXamXam": {
              "id": 0,
              "libelle": "string",
              "poids": 0
            }
          }
      }
    }else{
      b = 
      {
          "id": id,
          "dateDebut": value.startDate,
          "dateFin": value.endDate,
          "encours": value.doing,
          "membre": value.member,
          "coran": {
            "id": value.coran,
            "libelle": ""
          },
          "xamXam": null
      }
    }

    console.log(b);
    
    
    return this.http.patch(url,b,this.httpOptions);
  }

  deleteEnseignement(id) {
    const url = this.baseUrl+'api/enseignements/'+id;
    return this.http.delete(url,this.httpOptions);
  }

  getMembreKourel(): Observable<any>{
    const url = this.baseUrl+'api/membre-kourels';
    console.log(url);
    
    return this.http.get(url,this.httpOptions);
  }

  deleteMembreKourel(id){
    const url = this.baseUrl+'api/membre-kourels/'+id;
    return this.http.delete(url,this.httpOptions);
  }

  getMembreEntite(): Observable<any>{
    const url = this.baseUrl+'api/membre-entites';
    return this.http.get(url,this.httpOptions);
  }

  deleteMembreEntite(id){
    const url = this.baseUrl+'api/membre-entites/'+id;
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
