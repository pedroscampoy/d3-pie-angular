import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as D3 from 'd3';
import { IData } from 'src/app/services/pie-data.interface';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements AfterViewInit {
  @ViewChild('containerPieChart') element: ElementRef;

  private host: D3.Selection<d3.BaseType, {}, d3.BaseType, any>;
  private svg: D3.Selection<d3.SVGElement, {}, d3.BaseType, any>;
  private width: number;
  private height: number;
  private htmlElement: HTMLElement;
  private pieData: IData[];

  constructor(private dataService: PieDataService) {}

  ngOnInit(): void {}
}
