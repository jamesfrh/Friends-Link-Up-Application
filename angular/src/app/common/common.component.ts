import { Component, OnInit } from '@angular/core';
import { LinkService } from '../link.service';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit {

  commonFriends = [] as any


  link : LinkService

  constructor(link: LinkService) {
    this.link = link
   }

  ngOnInit(): void {

  }
  searchMyEmail=''
  searchFriendEmail =''


  searchCommonFriends(event: { preventDefault: () => void; target: any; }) {
    event.preventDefault()
    const errors = []
    this.commonFriends.length =0
    if(errors.length === 0){
      this.link.CommonFriends(this.searchMyEmail, this.searchFriendEmail).subscribe(data => {

        for(let key in data){
          console.log(data[key])
          if(data.hasOwnProperty(key))
            this.commonFriends.push(data[key])
        }
      })
    }
  }
}
