import { Component, Input, OnInit } from '@angular/core';
import { IGameExaminer } from 'src/app/_interfaces';
import { GameService } from 'src/app/_services';

@Component({
  selector: 'app-examiner',
  templateUrl: './examiner.component.html',
  styleUrls: ['./examiner.component.scss']
})
export class ExaminerComponent implements OnInit {
  @Input() examinerNumber: number;

  public examiner: IGameExaminer;
  public label: string;

  constructor(
    private gameService: GameService
  ) {
    this.label = 'Esaminatore';
  }

  ngOnInit(): void {
    this.updateExaminer();
    this.setLabel();
  }

  private updateExaminer(): IGameExaminer {
    this.gameService.getExaminers().subscribe((result: Array<IGameExaminer>) => {
      console.log(result[this.examinerNumber - 1]);
      this.examiner = result[this.examinerNumber - 1];
      this.setLabel();
    });
    return;
  }

  private setLabel(): void {
    if (this.examiner) {
      this.examiner.status !== 'examining' ? this.label = `Esaminatore ${this.examinerNumber}` : this.label = `Occupato: ${this.examiner.time}s`;
    } else {
      this.label = `Esaminatore ${this.examinerNumber}`;
    }
  }

}
