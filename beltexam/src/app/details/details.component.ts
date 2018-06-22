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

  constructor(private _petservice: PetService, private _router: Router, private _route: ActivatedRoute) {
    String.prototype.toTitleCase = function () {
      var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

      return this.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function (match, index, title) {
        if (index > 0 && index + match.length !== title.length &&
          match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
          (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
          title.charAt(index - 1).search(/[^\s-]/) < 0) {
          return match.toLowerCase();
        }

        if (match.substr(1).search(/[A-Z]|\../) > -1) {
          return match;
        }

        return match.charAt(0).toUpperCase() + match.substr(1);
      });
    };
   }

  ngOnInit() {
    this.pet = {
      name: '',
      type: '',
      description: '',
      skills: []
    };
    this.errors = {};
    this._petservice.getbyId(this._route.snapshot.params.id).subscribe(data => {
      if (data['errors']) {
        console.log('error', data);
        this.errors = data['errors'];
      } else {
        this.pet = data;
        this.pet.name = this.pet.name.toTitleCase();
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
