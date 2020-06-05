import { Component } from '@angular/core';
import { PersonService } from './services/person.service';
import { IPerson } from '../app/interfaces/person.interface';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public people: IPerson[] = [];
  public isLoading: boolean = false;

  private personSub: Subscription;

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.personSub = this.personService.getPeople()
      .pipe(finalize(() => {
        this.isLoading = false;
        this.personSub.unsubscribe()
      }))
      .subscribe(el => {
        this.people = el;
      });
  }

  public selectPerson(person: IPerson): void {
    console.log(person);
  }
}
