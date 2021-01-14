import { Component, OnInit } from '@angular/core';
import { LinkService } from '../link.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  link : LinkService


  constructor(link: LinkService) {
    this.link = link
   }

  ngOnInit(): void {
  }
  postMyEmail=''
  postFriendEmail =''
  newPost = ''

  sendPost(event: { preventDefault: () => void; target: any; }) {
    event.preventDefault()
    const errors = []

    if(errors.length === 0){
      this.link.sendNewPost(this.postMyEmail, this.postFriendEmail, this.newPost).subscribe(data => {
        alert(JSON.stringify(data))
      })

    }

    
  }
 

}
