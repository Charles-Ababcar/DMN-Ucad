import { Injectable, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  uid: string;
  username: string;
  firstName: string;
  lastName: string;
  address: string;
  password: string;
  email: string;
  imageUrl: string;
  activated: boolean;
  authorities: [];
}
// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const userToken = 'secure-user-token';
//     const modifiedReq = req.clone({ 
//       headers: req.headers.set('Authorization', `Bearer ${userToken}`),
//     });
//     return next.handle(modifiedReq);
//   }
// }

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  public userData: any;
  public user: firebase.User;
  private _sessionId: string;
  public showLoader: boolean = false;
  httpOptions: { headers: HttpHeaders; };
  httpOptions1: { headers1: HttpHeaders; };
  private authToken = sessionStorage.getItem("authToken");
  private baseUrl = 'http://ec2-44-202-218-253.compute-1.amazonaws.com:8080/';

  constructor(public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public toster: ToastrService,
    private cookieService: CookieService,
    private http: HttpClient) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        this._sessionId = this.userData;
        cookieService.set('user', JSON.stringify(this.userData));
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
        this.router.navigateByUrl('/general-info');
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });

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
  signInWithusernameAndPassword(username,password): Observable<any> {
    const url = this.baseUrl+'api/authenticate';
    const body = { username:username, password:password };
    return this.http.post(url,body,this.httpOptions);
  }
  ngOnInit(): void { }

  //sign in function
  SignIn(username, password) {
    console.log(username);
    console.log(password);
    this.signInWithusernameAndPassword(username,password)
      .subscribe(
        data => {
          console.log(data.id_token);
          sessionStorage.setItem("authToken",data.id_token);
          if(data.id_token){
            this.SetUserData(username,data.id_token);
          }
          
        },
        error => {
          console.log(error);          
          this.toster.error('Vérifiez votre username ou votre mot de passe.');
        });

  }

  //main verification function
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['/general-info']);
      })
  }

  //Sign in with Facebook
  signInFacebok() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  //Sign in with Twitter
  signInTwitter() {
    return this.AuthLogin(new auth.TwitterAuthProvider());
  }

  //Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error);
      });
  }

  //Authentication for Login
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/general-info']);
        });
        //this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error);
      });
  }

  //Set user
  SetUserData(username,idToken) {
    const url = this.baseUrl+'api/admin/users/'+username;
    this.authToken = idToken;
    this.http.get(url,this.httpOptions).subscribe(
      data => {
        this.userData = data;
        console.log(this.userData.id);

        const userData: User = {
          uid: this.userData.id,
          username: this.userData.login,
          firstName: this.userData.firstName,
          lastName: this.userData.lastName,
          address: this.userData.address,
          password: this.userData.password,
          email: this.userData.email,
          imageUrl: this.userData.imageUrl || 'assets/dashboeard/boy-2.png',
          activated: this.userData.activated,
          authorities: this.userData.authorities,
        };
         this._sessionId = this.userData;
          this.cookieService.set('user', JSON.stringify(userData));
          localStorage.setItem('user', JSON.stringify(userData));
          JSON.parse(localStorage.getItem('user'));
          this.ngZone.run(() => {
            this.router.navigate(['/general-info']);
          });
        console.log(this.userData);
        
      });
  }

  // Sign out
  SignOut() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    return this.afAuth.auth.signOut().then(() => {
      this.showLoader = false;
      localStorage.clear();
      this.cookieService.deleteAll('user', '/auth/login');
      this.router.navigate(['/auth/login']);
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user != null && user.emailVerified != false) ? true : false;
  }

}