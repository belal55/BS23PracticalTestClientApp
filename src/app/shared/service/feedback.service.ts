import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Vote } from '../vote.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private httpClient:HttpClient) { }

  getAllFeedBackWithPaging(page,size,searchParam){
    return this.httpClient.get(environment.apiURL+'/Posts/?page='+page+'&size='+size+'&searchParam='+searchParam).toPromise();
  }

  insertVote(vtModel:Vote){
    return this.httpClient.post(environment.apiURL+'/Posts/insertVote',vtModel).toPromise();
  }
}
