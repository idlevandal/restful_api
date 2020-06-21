import { Component, OnInit } from '@angular/core';
import { PersonService } from '../services/person.service';
import { IPerson } from '../interfaces/person.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  public person: IPerson;

  constructor(private personService: PersonService, private router: Router) { }

  ngOnInit() {
    if (history.state.data && history.state.data['person']) {
      this.person = history.state.data['person'];
    } else {
      this.backToUsers();
    }
  }

  public deleteUser(): void {
    if (history.state.data.person) {
      this.personService.deletePerson(this.person._id)
        .subscribe(el => {
          console.log(el);
          this.backToUsers();
        })
    }
  }

  public getPerson(personId: string): void {
    this.personService.getPerson(personId)
      .subscribe(console.log);
  }

  private backToUsers(): void {
    this.router.navigate(['/users']);
  }
}
