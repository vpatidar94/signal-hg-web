import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { solution_list } from 'src/app/cost/solution.const';

@Component({
  selector: 'app-solution-detail',
  templateUrl: './solution-detail.component.html',
  styleUrls: ['./solution-detail.component.scss']
})
export class SolutionDetailComponent implements OnInit {

  public solutionId?: string;
  public content = {} as any;
  public solution_list = solution_list;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.solutionId = params.get('solutionId') as string;
      this.content = this.solution_list[this.solutionId]
    });
  }
}
