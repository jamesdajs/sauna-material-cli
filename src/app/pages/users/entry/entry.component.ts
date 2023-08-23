import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Entry } from 'src/app/interfaces/entry';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent {

  id:string
  name:string
  dateIni:String = ''
  dateEnd:String = ''
  displayedColumns: string[] = ['id','name','date','dateIn', 'dateOut','total', 'state', 'options'];
  dataSource: MatTableDataSource<Entry>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private route: ActivatedRoute,
    private userService:UserService,

    private router:Router,
    private dialog: MatDialog
    
    ){
      this.route.paramMap.subscribe(
        params =>{
          this.id = params.get('id')!;
        }
      );
  }
  ngAfterViewInit() {
    this.loadData()
  
  }
  loadData(){
    this.userService.getUserEntry(parseInt(this.id))
    .subscribe({
      next: (res) => {
        this.name = res.name
        this.dataSource = new MatTableDataSource(res.entries);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
       // this.router.navigate(["/customers"])
        console.log('done')
      },
    })
  }
  details(entry:Entry){
    if (entry.state)
    this.router.navigate(["/entries/details/",{id:entry.id}])
    else
      this.router.navigate(['reports/day/user',{id:entry.id}])
    
  }
  search(){
    this.userService.getUserEntry(parseInt(this.id),`?dateIni=${this.dateIni}&dateEnd=${this.dateEnd}`).subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource= new MatTableDataSource(res.entries)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log('done')
      },
    })
  }
}
