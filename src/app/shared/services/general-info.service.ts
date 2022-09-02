import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CelluleModel } from '../../components/general-info/cellules/cellule.model';
import { CommissionModel } from '../../components/general-info/commissions/commission.model';


@Injectable({
  providedIn: 'root'
})

export class GeneralInfoService {
  private httpOptions : any;
  private httpOptions1 : any;
  private baseUrl = 'http://ec2-44-202-218-253.compute-1.amazonaws.com:8080/';
  private authToken = sessionStorage.getItem("authToken");

  constructor(public db: AngularFirestore,private http: HttpClient) { 
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

  // Gestion des entites
  
  getEntities() {
    const url = this.baseUrl+'api/entites';
    console.log(url);
    
    return this.http.get(url,this.httpOptions);
  }

  getEntity(id) {
    const url = this.baseUrl+'api/entites/'+id;
    console.log(url);
    
    return this.http.get(url,this.httpOptions);
  }

  createEntity(value,type) {
    const url = this.baseUrl+'api/entites';
    try {
      const b = { 
        "nom": value.nom,
        "description": value.description,
        "typeEntite": type
    };
      console.log(b);
      
      return this.http.post(url,b,this.httpOptions);
    } catch (error) {
      console.log(error);
      
    }

  }

  updateEntity(item, value) {
    const url = this.baseUrl+'api/entites/'+item.id;
    try {
      const b = { 
        "id": item.id,
        "nom": value.nom,
        "description": value.description,
        "typeEntite": item.typeEntite
    };      
      return this.http.patch(url,b,this.httpOptions);
    } catch (error) {
      console.log(error);
      
    }
  }

  deleteEntity(id) {
    const url = this.baseUrl+'api/entites/'+id;
    return this.http.delete(url,this.httpOptions);
  }
  // End Gestion des entites

  // Begin gestion xamxam
  getXamxams() {
    const url = this.baseUrl+'api/xam-xams';
    console.log(url);
    
    return this.http.get(url,this.httpOptions);
  }

  getXamxam(id) {
    const url = this.baseUrl+'api/xam-xams/'+id;
    console.log(url);
    
    return this.http.get(url,this.httpOptions);
  }

  createXamxam(value) {
    const url = this.baseUrl+'api/xam-xams';
    try {
      const b = { 
        "libelle": value.libelle,
        "niveauXamXam": {
          "id": value.niveau,
          "libelle": "",
          "poids": 0
        }
    };
      
      return this.http.post(url,b,this.httpOptions);
    } catch (error) {
      console.log(error);
      
    }

  }

  updateXamxam(id, value) {
    const url = this.baseUrl+'api/xam-xams/'+id;
    console.log(value);
    
    try {
      const b = { 
        "id": id,
        "libelle": value.libelle,
        "niveauXamXam": {
          "id": value.niveau,
          "libelle": "",
          "poids": 0
        }
    };    
    console.log(b);
    
      return this.http.patch(url,b,this.httpOptions);
    } catch (error) {
      console.log(error);
      
    }
  }

  deleteXamxam(id) {
    const url = this.baseUrl+'api/xam-xams/'+id;
    return this.http.delete(url,this.httpOptions);
  }

  getNiveauXamxams() {
    const url = this.baseUrl+'api/niveau-xam-xams';
    console.log(url);
    
    return this.http.get(url,this.httpOptions);
  }

  getNiveauXamxam(id) {
    const url = this.baseUrl+'api/niveau-xam-xams/'+id;
    console.log(url);
    
    return this.http.get(url,this.httpOptions);
  }

  createNiveauXamxam(value) {
    const url = this.baseUrl+'api/niveau-xam-xams';
    try {
      const b = { 
        "libelle": value.libelle,
        "poids": value.poids,
    };
      
      return this.http.post(url,b,this.httpOptions);
    } catch (error) {
      console.log(error);
      
    }

  }

  updateNiveauXamxam(id, value) {
    const url = this.baseUrl+'api/niveau-xam-xams/'+id;
    try {
      const b = { 
        "id": id,
        "libelle": value.libelle,
        "poids": value.poids
    };      
      return this.http.patch(url,b,this.httpOptions);
    } catch (error) {
      console.log(error);
      
    }
  }

  deleteNiveauXamxam(id) {
    const url = this.baseUrl+'api/niveau-xam-xams/'+id;
    return this.http.delete(url,this.httpOptions);
  }

  getCorans() {
    const url = this.baseUrl+'api/corans';
    console.log(url);
    
    return this.http.get(url,this.httpOptions);
  }
  // End Gestion des xamxam

  // Gestion des departements et facultes
  getDepartements() {
    const url = this.baseUrl+'api/departements';
    console.log(url);
    
    return this.http.get(url,this.httpOptions);
  }

  getDepartement(id) {
    const url = this.baseUrl+'api/departements/'+id;
    console.log(url);
    
    return this.http.get(url,this.httpOptions);
  }

  createDepartement(value) {
    const url = this.baseUrl+'api/departements';
    try {
      const b = { 
        "nom": value.nom,
        "faculte": {
          "id": value.faculte,
          "nom": ""
        }
    };
      
      return this.http.post(url,b,this.httpOptions);
    } catch (error) {
      console.log(error);
      
    }

  }

  updateDepartement(id, value) {
    const url = this.baseUrl+'api/departements/'+id;
    try {
      const b = { 
        "id": id,
        "nom": value.nom
    };    
    console.log(b);
    
      return this.http.patch(url,b,this.httpOptions);
    } catch (error) {
      console.log(error);
      
    }
  }

  deleteDepartement(id) {
    const url = this.baseUrl+'api/departements/'+id;
    return this.http.delete(url,this.httpOptions);
  }

  getFacultes() {
    const url = this.baseUrl+'api/facultes';    
    return this.http.get(url,this.httpOptions);
  }

  getFaculte(id) {
    const url = this.baseUrl+'api/facultes/'+id;
    return this.http.get(url,this.httpOptions);
  }

  createFaculte(value) {
    const url = this.baseUrl+'api/facultes';
    try {
      const b = { 
        "nom": value.nom
    };      
      return this.http.post(url,b,this.httpOptions);
    } catch (error) {
      console.log(error);
      
    }

  }

  updateFaculte(id, value) {
    const url = this.baseUrl+'api/facultes/'+id;
    try {
      const b = { 
        "id": id,
        "nom": value.nom
    };      
      return this.http.patch(url,b,this.httpOptions);
    } catch (error) {
      console.log(error);
      
    }
  }

  deleteFaculte(id) {
    const url = this.baseUrl+'api/facultes/'+id;
    return this.http.delete(url,this.httpOptions);
  }


  // End Gestion des departements et facultes
  // gestion des professions
  getProfessions() {
    const url = this.baseUrl+'api/professions';
    console.log(url);
    
    return this.http.get(url,this.httpOptions);
  }
  // end gestion des professions
  //gestion des categories
  getCategories() {
    const url = this.baseUrl+'api/categories';
    console.log(url);
    
    return this.http.get(url,this.httpOptions);
  }
  // end gestion des categories


}
