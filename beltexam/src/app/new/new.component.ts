import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PetService } from '../pet.service';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['../bootstrap.min.css' , './new.component.css']
})
export class NewComponent implements OnInit {
  pet: any;
  errors: any;

  constructor(private _petservice: PetService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.pet = {
      name : '',
      type : '',
      description : '',
      skills : []
    };
    this.errors = {};
  }
  addNewPet() {
    console.log(this.pet);
    this._petservice.addNew(this.pet).subscribe((data) => {
      if (data['errors']) {
        console.log('error', data);
        this.errors = data['errors'];
      } else {
        console.log('success', data);
        this._router.navigate(['/pets']);
      }
    });
  }

}
