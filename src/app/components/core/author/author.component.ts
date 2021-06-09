import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  imageSrc = 'C:\Users\Desktop\FrontendRVA\AngularStarterProject\src\assets\fotografija.jpg'

  constructor() { }

  ngOnInit(): void {
  }



}
