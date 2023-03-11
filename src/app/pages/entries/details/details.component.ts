import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailDialog } from 'src/app/components/dialogs/detail/detail.dialog';
import { Detail } from 'src/app/interfaces/detail';
import { DetailProduct } from 'src/app/interfaces/detailProduct';
import { Entry } from 'src/app/interfaces/entry';
import { EntryService } from 'src/app/services/entry.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent {
  id:string
  entry:Entry
  loading:boolean = true
  displayedColumns: string[] = [ 'name', 'price','cant','total', 'options'];
  displayedProductColumns: string[] = [ 'name', 'price','cant','total', 'options'];
  dataSource: MatTableDataSource<Detail>;
  dataProductSource: MatTableDataSource<DetailProduct>;
  constructor(
    private router:Router,
    private entryService:EntryService,
    private dialog: MatDialog,
    private route:ActivatedRoute
    ) {
      this.route.paramMap.subscribe(
        params =>{
          this.id = params.get('id')!;
        })

  }
  ngAfterViewInit() {
    this.loadData()
  }
  loadData(){
    this.entryService.getEntry(this.id)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.entry = res
        this.dataSource= new MatTableDataSource(res.detail)
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
       // this.router.navigate(["/entries"])
        console.log('done')
        this.loading = false
      },
    })
  }
  openCreateDetailDialog():void {
    const dialogRef = this.dialog.open(DetailDialog, {
      data:this.entry,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
