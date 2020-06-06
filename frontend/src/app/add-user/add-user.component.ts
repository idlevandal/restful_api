import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonService } from '../services/person.service';
import { IPerson } from '../interfaces/person.interface';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  public userForm: FormGroup;

  constructor(private fb: FormBuilder, private personService: PersonService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      country: ['', Validators.required],
      gender: ['', Validators.required],
      scores: [[11, 33, 22], Validators.required]
    })
  }

  public addUser(): void {
    if (this.userForm.valid) {
      this.personService.addPerson(this.userForm.value)
        .subscribe(el => console.log(el)
      )
    } else {
      alert('Please fill in the damn form properly!!!!');
    }
  }
}
