import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['../bootstrap.min.css', './details.component.css']
})
export class DetailsComponent implements OnInit {
  pet: any;
  errors: any;
  disableswitch = false;

  constructor(private _petservice: PetService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._petservice.getbyId(this._route.snapshot.params.id).subscribe(data => {
      if (data['errors']) {
        console.log('error', data);
        this.errors = data['errors'];
      } else {
        this.pet = data;
        this.errors = {};
      }
    });
  }
  newLike(petid: string) {
    this._petservice.addLike(petid , this.pet).subscribe(data => {
      if (data['errors']) {
        console.log('error', data);
        this.errors = data['errors'];
      } else {
        this.disableswitch = true;
        this.ngOnInit();
      }
    });
  }
  adopt(petid: string) {
    this._petservice.deletebyId(petid).subscribe(data => {
      if (data['errors']) {
        console.log('error', data);
        this.errors = data['errors'];
      } else {
        this._router.navigate(['/pets']);
      }
    });
  }

}
