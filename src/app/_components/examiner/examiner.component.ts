import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-examiner',
  templateUrl: './examiner.component.html',
  styleUrls: ['./examiner.component.scss']
})
export class ExaminerComponent implements OnInit {
  @Input() examiner: number;

  constructor() { }

  ngOnInit(): void {
  }

}
