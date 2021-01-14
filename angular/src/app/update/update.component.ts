import { Component, OnInit } from '@angular/core';
import { LinkService } from '../link.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  link : LinkService
  connectedFriends = [] as any


  constructor(link: LinkService) {
    this.link = link
   }

  ngOnInit(): void {
  }
  connectMyEmail=''

  searchConnectedFriends(event: { preventDefault: () => void; target: any; }) {
    event.preventDefault()
    const errors = []
    this.connectedFriends.length =0
    if(errors.length === 0){
      this.link.ConnectedFriends(this.connectMyEmail).subscribe(data => {

        for(let key in data){
          console.log(data[key])
          if(data.hasOwnProperty(key))
            this.connectedFriends.push(data[key])
        }
      })
    }
  }

}
