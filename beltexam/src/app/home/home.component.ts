import { Component, OnInit } from '@angular/core';
import { PetService } from '../pet.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../bootstrap.min.css', './home.component.css' ]
})
export class HomeComponent implements OnInit {
  pets: any;
  constructor(private _petservice: PetService) {}

  ngOnInit() {
    this._petservice.getAll().subscribe(data => {
      if (data['errors']) {
        console.log();
      } else {
        this.pets = data;
      }
    });
  }

}
