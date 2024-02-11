import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { backendUrl } from 'src/app/app.component';

@Injectable()
export class DataService {
  researchData : any;
  researchDataForUser : any;
  oneResearchData : any;
  applicationData : any;
  recommendationData : any;
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
          email: response.email,
          userName: response.name
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

  fetchResearchPosts(): Observable<any> {
    return this.http.get<any>(`${backendUrl}/researchPosts`).pipe(
      tap(data => this.researchData = data) // Store the fetched data in the variable
    );
  }

  getData(): any {
    return this.researchData; // Return the stored data
  }

  async fetchOneResearchPost(id : String): Promise<any>{
    return this.http.get<any>(`${backendUrl}/researchPosts/${id}`).pipe(
      tap(data => this.oneResearchData = data)
    ).toPromise();
  }

  fetchResearchPostsForUser(userId : String): Observable<any>{
    return this.http.get<any>(`${backendUrl}/researchPosts/user/${userId}`).pipe(
      tap(data => {
        this.researchDataForUser = data;
        // console.log(this.researchDataForUser);
      })
    );
  }

  getResearchDataForUser(): any {
    return this.researchDataForUser; // Return the stored data
  }

  fetchApplications(researchId : String): Observable<any>{
    return this.http.get<any>(`${backendUrl}/application/research/${researchId}`).pipe(
      tap(data => {
        this.applicationData = data;
      })
    );
  }

  fetchRecommendation(researchId : String): Observable<any>{
    return this.http.get<any>(`${backendUrl}/recommendation/${researchId}`).pipe(
      tap(data => {
        this.recommendationData = data;
      })
    );
  }

  getApplicationData() : any {
    return this.applicationData;
  }

  getRecommendationData() : any {
    return this.recommendationData;
  }

  // getoneResearchData(): any {
  //   return this.oneResearchData; // Return the stored data
  // }

}