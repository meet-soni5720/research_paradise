import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { backendUrl } from 'src/app/app.component';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  loginEndPoint(data: any): Observable<any> {
    return this.http.post<any>(`${backendUrl}/users/login`, data).pipe(
      map(response => {
        // Map the response to your desired object
        console.log(response)
        return {
          // Example mapping
          id: response._id,
          isProfessor: response.isProfessor,
          // Add other properties as needed
        };
      })
    );
  }

  getOneUserData(userId : String): Observable<any> {
    return this.http.get<any>(`${backendUrl}/users/${userId}`).pipe(
        map(res =>{
            return {
                name : res.name,
                email : res.email,
                googleScholar : res.googleScholar,
                github : res.github,
                additionalLinks : res.additionalLinks,
            };
        })
    )
  }
}