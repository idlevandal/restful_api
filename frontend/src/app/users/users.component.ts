import { Component, OnInit } from '@angular/core';
import { PersonService } from './../services/person.service';
import { IPerson } from '../../app/interfaces/person.interface';
import { Subscription, forkJoin } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { relative } from 'path';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public people: IPerson[] = [];
  public countryStats: any = [];
  public isLoading: boolean = false;

  private personSub: Subscription;

  constructor(private personService: PersonService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.isLoading = true;

    forkJoin(
      this.personService.getPeople()
        .pipe(tap(data => this.people = data)),
      this.personService.getCountryStats()
        .pipe(tap(data => this.countryStats = data)),
      )
      .pipe(finalize(() => {
            this.isLoading = false;
      }))
      .subscribe();
  }

  public selectPerson(person: IPerson): void {
    this.router.navigate(['/user-details'], {state: {data: {person}}, relativeTo: this.route});
  }

}
