import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private _http: HttpClient) { }

  addNew(pet: any) {
    return this._http.post('/api/pets', pet);
  }
  getAll() {
    return this._http.get('/api/pets');
  }
  deletebyId(petid: string) {
    return this._http.delete('/api/pets/' + petid);
  }
  getbyId(petid: string) {
    return this._http.get('/api/pets/' + petid);
  }
  updatebyId(petid: string, pet) {
    return this._http.put('/api/pets/' + petid, pet);
  }
  addLike(petid: string , pet) {
    return this._http.put('/api/pets/' + petid + '/like', pet);
  }
}
