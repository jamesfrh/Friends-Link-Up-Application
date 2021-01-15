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
  linkMyEmail =''
  linkFriendEmail=''
  linkUpUsers(event: { preventDefault: () => void; target: any; }) {
    event.preventDefault()
    const errors = []
    const myEmail = this.linkMyEmail
    const friendEmail = this.linkFriendEmail

    if(!this.validateEmail(myEmail)){
      alert('Error: My E-mail is invalid')
      return
    }
    if(!this.validateEmail(friendEmail)){
      alert('Error: Friend E-mail is invalid')
      return
    }

    if(errors.length === 0){
      this.link.linkUpUsers(myEmail, friendEmail).subscribe(data => {
        console.log(data)
        alert(JSON.stringify(data))
      })

    }

    console.log(myEmail, friendEmail)
  }
  validateEmail(email: any) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

}
