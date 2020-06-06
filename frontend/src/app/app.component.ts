import { Component } from '@angular/core';
import { PersonService } from './services/person.service';
import { IPerson } from '../app/interfaces/person.interface';
import { Subscription, forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public people: IPerson[] = [];
  public countryStats: any = [];
  public isLoading: boolean = false;

  private personSub: Subscription;

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    // this.isLoading = true;
    // this.personSub = this.personService.getPeople()
    //   .pipe(finalize(() => {
    //     this.isLoading = false;
    //     this.personSub.unsubscribe()
    //   }))
    //   .subscribe(el => {
    //     this.people = el;
    //   });

    // this.personService.getCountryStats()
    //   .subscribe(el => this.countryStats = el);
    this.isLoading = true;

    forkJoin(
      this.personService.getPeople(),
      this.personService.getCountryStats())
      .pipe(finalize(() => {
            this.isLoading = false;
      }))
      .subscribe(el => {
        this.people = el[0];
        this.countryStats = el[1];
      });
  }

  public selectPerson(person: IPerson): void {
    console.log(person);
  }
}
