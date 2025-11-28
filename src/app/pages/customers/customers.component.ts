import { Component, ViewChild, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertDialog, ConfirmDialog, CustomerDialog } from 'src/app/components/dialogs/dialogs.component';
import { Customer, CustomerCreateRequest } from 'src/app/interfaces/customer';
import { Entry } from 'src/app/interfaces/entry';
import { CustomerService } from 'src/app/services/customer.service';
import { EntryService } from 'src/app/services/entry.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.sass']
})
export class CustomersComponent {
  displayedColumns: string[] = ['ci', 'name', 'state', 'options'];
  dataSource: MatTableDataSource<Customer>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 searchName= ''
  constructor(
    private router:Router,
    private customerService:CustomerService,
    private entryService:EntryService,
    private dialog: MatDialog
    ) {

  }

  ngAfterViewInit() {
    this.loadData()
  
  }
  loadData(){
    this.customerService.list()
    .subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchName = filterValue
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  create(){
    this.router.navigate(["/customers/create",{name:this.searchName}])
  }
  entries(id:number){
    this.router.navigate(["/customers/entries",{id}])
  }
  
  update(customer:Customer){
    this.router.navigate(["/customers/update/",customer])
  }
  openDialog(customer:Customer): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {title: "Sauna Florida", message: `Seguro que desea ${customer.state?'deshabilitar':'habilitar'} al cliente ${customer.name}`},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.customerService.update(customer.id,{state:!customer.state})
        .subscribe(result => { customer.state=!customer.state })
      }
    });
  }
  openAlertDialog(): void {
    const dialogRef = this.dialog.open(AlertDialog, {
      data: {title: "Sauna Florida", message: "Se creo el cliente correctamente"},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openCustomerDialog(customer:Customer):void {
    const dialogRef = this.dialog.open(CustomerDialog, {
      data:customer,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  createEntry(customer:Customer){
    console.log(customer);
    let lastResult: any = null;
    this.entryService.create({customerId:customer.id})
      .subscribe({
        next: (res) => {
        console.log(res);
        lastResult = res;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        const dialogRef = this.dialog.open(AlertDialog, {
          data: {title: "Sauna Florida", message: "Se creo la entrada correctamente al cliente " +customer.name},
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.router.navigate(["/entries/details",{id:lastResult.id}])
        });
      },
      //this.router.navigate(["/entri/create"])
    })
  }
}
