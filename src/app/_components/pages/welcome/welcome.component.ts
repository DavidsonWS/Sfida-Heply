import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public playerNameForm: FormGroup;

  constructor() {
    this.playerNameForm = new FormGroup({
      playerName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)])
    });
  }

  ngOnInit(): void {
  }

  public onPlayerNameFormSubmitted(): void {
    // TO DO
  }

}
