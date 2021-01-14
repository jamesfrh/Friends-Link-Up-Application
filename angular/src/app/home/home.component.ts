import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { LinkService } from '../link.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  link : LinkService

  constructor(link: LinkService) {
    this.link = link
   }

  ngOnInit(): void {
  }

  linkUpUsers(event: { preventDefault: () => void; target: any; }) {
    event.preventDefault()
    const errors = []
    const target = event.target
    const myEmail = target.querySelector('#linkMyEmail').value
    const friendEmail = target.querySelector('#linkFriendEmail').value

    if(errors.length === 0){
      this.link.linkUpUsers(myEmail, friendEmail).subscribe(data => {
        console.log(data)
        alert('Success')
      })

    }

    console.log(myEmail, friendEmail)
  }

}
