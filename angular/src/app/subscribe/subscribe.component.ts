import { Component, OnInit } from '@angular/core';
import { LinkService } from '../link.service';
@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  friendList = [] as any
  selectedFriends = [] as any

  link : LinkService

  constructor(link: LinkService) {
    this.link = link
   }

  ngOnInit(): void {
  }
  myEmail = ''

  findFriends(event: { preventDefault: () => void; target: any; }) {
    event.preventDefault()

    const errors = []
    const target = event.target
    this.friendList.length = 0
    const myEmail = target.querySelector('#myEmail').value

    if(errors.length === 0){
      this.link.searchFriends(myEmail).subscribe(data => {
        for(let key in data){
          //console.log(data[key])
          if(data.hasOwnProperty(key))
            this.friendList.push(data[key])
        }
      })
    }
  }

  getCheckedFriends(event:any, friendEmail:any){
    if(event.target.checked){
      //console.log(friendEmail + ' checked')
      this.selectedFriends.push(friendEmail)

    }
    else{
      //console.log(friendEmail + ' unchecked')
      this.selectedFriends =  this.selectedFriends.filter((x: any)=>x!=friendEmail)
    }
    console.log(this.selectedFriends)
  }
  Subscribing(event: any){
    event.preventDefault()
    console.log('hitt subscribe buttton')
    this.link.subscribeFriends(this.selectedFriends, this.myEmail).subscribe(data => {
      alert(JSON.stringify(data))
      })

  }
  Unsubscribing(event: any){
    event.preventDefault()
    console.log('hitt unsubscribe buttton')
    this.link.unsubscribeFriends(this.selectedFriends, this.myEmail).subscribe(data => {
      alert(JSON.stringify(data))
      })

  }
  Blocking(event: any){
    event.preventDefault()
    console.log('hitt block buttton')
    this.link.blockingFriends(this.selectedFriends, this.myEmail).subscribe(data => {
      alert(JSON.stringify(data))
      })

  }
  Unblocking(event: any){
    event.preventDefault()
    console.log('hitt unblock buttton')
    this.link.unblockingFriends(this.selectedFriends, this.myEmail).subscribe(data => {
      alert(JSON.stringify(data))
      })

  }


}
