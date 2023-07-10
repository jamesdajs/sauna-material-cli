import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Report } from 'src/app/interfaces/report';
import { EntryService } from 'src/app/services/entry.service';

@Component({
  selector: 'app-day-detail',
  templateUrl: './day-detail.component.html',
  styleUrls: ['./day-detail.component.scss']
})
export class DayDetailComponent {
  displayedColumns: string[] = [ 'name',"type",'price','cant','total'];
  dataSource: MatTableDataSource<Report>;
  displayedServiceColumns: string[] = [ 'name',"type",'price','cant','total'];
  dataServiceSource: MatTableDataSource<Report>;
  date:string
  constructor(
    private router:Router,
    private entryService:EntryService,
    private route: ActivatedRoute
    ) {
      this.route.paramMap.subscribe(
        params =>{
          this.date = params.get('dateIn')!;
        })
  }
  ngAfterViewInit() {
    this.loadData()
  
  }
  loadData() {
    this.entryService.reportDayDetail("/"+ this.date).subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res.product);
        this.dataServiceSource = new MatTableDataSource(res.detail);
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log('done')
      },
    })
  }
  getTotalCost() {
    if (!this.dataSource) {
      return 0;
    }
    return this.dataSource.data.map(t => t.price*t.cant).reduce((acc, value) => acc + value, 0);
  }
  getTotalServiceCost() {
    if (!this.dataServiceSource) {
      return 0;
    }
    return this.dataServiceSource.data.map(t => t.price*t.cant).reduce((acc, value) => acc + value, 0);
  }
}
