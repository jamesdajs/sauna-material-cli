import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Entry } from 'src/app/interfaces/entry';
import { EntryService } from 'src/app/services/entry.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent {
  displayedColumns: string[] = ['name', 'dateout',"total", 'options'];
  dataSource: MatTableDataSource<Entry>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  date:string
  constructor(
    private router:Router,
    private entryService:EntryService,
    private dialog: MatDialog,
    private route: ActivatedRoute
    ) {
      this.route.paramMap.subscribe(
        params =>{
          this.date = params.get('date')!;
        })
  }
  ngAfterViewInit() {
    this.loadData()
  
  }
  loadData() {
    this.entryService.reportDay(this.date).subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log('done')
      },
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  detail(entriId:number){
    this.router.navigate(['reports/day/user',{id:entriId}])
  }
}
