import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['../bootstrap.min.css', './edit.component.css']
})
export class EditComponent implements OnInit {
  pet: any;
  errors: any;

  constructor(private _petservice: PetService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._petservice.getbyId(this._route.snapshot.params.id).subscribe( data => {
      if (data['errors']) {
        console.log('error', data);
        this.errors = data['errors'];
      } else {
        this.pet = data;
        this.errors = {};
      }
    });
  }

  editPet() {
    console.log(this.pet);
    this._petservice.updatebyId(this.pet._id, this.pet).subscribe((data) => {
      if (data['errors']) {
        console.log('error', data);
        this.errors = data['errors'];
      } else {
        console.log('success', data);
        this._router.navigate(['/pets', this.pet._id]);
      }
    });
  }

}
