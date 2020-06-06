import { Component, OnInit } from '@angular/core';
import { PersonService } from '../services/person.service';
import { IPerson } from '../interfaces/person.interface';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  public person: IPerson;

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.person = history.state.data['person'];
  }

  public deleteUser(): void {
    if (history.state.data.person) {
      this.personService.deletePerson(this.person._id)
        .subscribe(el => console.log(el))
    }
  }
}
