import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IFriend } from './friend'
import { Observable} from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(private http: HttpClient) { }
  
  linkUpUsers(myEmail: any, friendEmail: any) {
    return this.http.post('/api/link', {
      myEmail,
      friendEmail
    })
  }

  sendNewPost(myEmail: any, friendEmail: any, newPost: any) {
    return this.http.post('/api/newPost', {
      myEmail,
      friendEmail,
      newPost
    })
  }
  
  searchFriends(myEmail: any,): Observable<IFriend[]> {
    return this.http.get<IFriend[]>('/api/getFriendList/' + myEmail)

  }

  CommonFriends(myEmail: any, friendEmail: any): Observable<IFriend[]> {
    return this.http.get<IFriend[]>('/api/CommonFriends/' + myEmail +'/' + friendEmail)

  }

  ConnectedFriends(connectMyEmail: any): Observable<IFriend[]> {
    return this.http.get<IFriend[]>('/api/ConnectedFriends/' + connectMyEmail)

  }

  subscribeFriends(subscriberList: any, myEmail:string){
    return this.http.patch('/api/subscribing', {
      subscriberList,
      myEmail
    })
  }
  unsubscribeFriends(subscriberList: any, myEmail:string){
    return this.http.patch('/api/unsubscribing', {
      subscriberList,
      myEmail
    })
  }

  blockingFriends(subscriberList:any,myEmail:string){
    return this.http.patch('/api/blocking', {
      subscriberList,
      myEmail
    })
  }
  unblockingFriends(subscriberList:any,myEmail:string){
    return this.http.patch('/api/unblocking', {
      subscriberList,
      myEmail
    })
  }
}
