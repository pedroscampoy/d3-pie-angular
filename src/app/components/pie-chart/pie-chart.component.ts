import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as D3 from 'd3';
import { IData } from 'src/app/services/pie-data.interface';
import { PieDataService } from 'src/app/services/pie-data.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements AfterViewInit {
  @ViewChild('containerPieChart')
  element!: ElementRef;

  private host: D3.Selection<any, {}, any, any>;
  private svg: D3.Selection<any, {}, any, any>;
  private width!: number;
  private height!: number;
  private radius!: number;
  private htmlElement!: HTMLElement;
  private pieData!: IData[];

  constructor(private dataService: PieDataService) {}

  ngAfterViewInit() {
    this.htmlElement = this.element.nativeElement;
    this.host = D3.select(this.htmlElement);
    this.dataService.$data.subscribe((data) => {
      this.pieData = data;
      this.setup();
      this.buildSVG();
      this.buildPie();
    });
  }

  private setup(): void {
    this.width = 250;
    this.height = 250;
    this.radius = Math.min(this.width, this.height) / 2;
  }

  private buildSVG(): void {
    this.host.html('');
    this.svg = this.host
      .append('svg')
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .append('g')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);
  }

  private buildPie(): void {
    let pie = D3.pie(); //Generate the pie
    let values = this.pieData.map((data) => data.value);
    //Generate groups
    let arcSelection = this.svg
      .selectAll('arc')
      .data(pie(values))
      .enter()
      .append('g')
      .attr('class', 'arc');

    this.populatePie(arcSelection);
  }

  private populatePie(arcSelection: any): void {
    let innerRadius = this.radius - 50;
    let outerRadius = this.radius - 10;
    let pieColor = D3.scaleOrdinal(D3.schemeCategory10);
    //Generate the arcs
    let arc = D3.arc().innerRadius(0).outerRadius(outerRadius);
    //Draw arc paths
    arcSelection
      .append('path')
      .attr('d', arc)
      .attr('fill', (_datum: any, index: number) => {
        return pieColor(this.pieData[index].label);
      });

    arcSelection
      .append('text')
      .attr('transform', (datum: any) => {
        datum.innerRadius = 0;
        datum.outerRadius = outerRadius;
        return `translate( ${arc.centroid(datum)})`;
      })
      .text((_datum: any, index: number) => this.pieData[index].label)
      .style('text-anchor', 'middle');
  }
}
