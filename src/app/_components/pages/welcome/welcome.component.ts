import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public playerNameForm: FormGroup;
  private router: Router;

  constructor(router: Router) {
    this.playerNameForm = new FormGroup({
      playerName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)])
    });
    this.router = router;
  }

  ngOnInit(): void {
  }

  public onPlayerNameFormSubmitted(): void {
    localStorage.setItem('player', this.playerNameForm.controls.playerName.value);
    this.router.navigate(['/game']);
  }

}
