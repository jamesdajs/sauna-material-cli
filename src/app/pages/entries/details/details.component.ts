import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailDialog } from 'src/app/components/dialogs/detail/detail.dialog';
import { DetailProductDialog } from 'src/app/components/dialogs/detailProduct/detailProduct.dialog';
import { AlertDialog, ConfirmDialog, PromtDialog } from 'src/app/components/dialogs/dialogs.component';
import { Detail } from 'src/app/interfaces/detail';
import { DetailProduct } from 'src/app/interfaces/detailProduct';
import { Entry } from 'src/app/interfaces/entry';
import { DetailProductService } from 'src/app/services/detailProduct.service';
import { DetailService } from 'src/app/services/detail.service';
import { EntryService } from 'src/app/services/entry.service';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent {
  id:string
  entry:Entry
  loading:boolean = true
  displayedColumns: string[] = [ 'name', 'lockers','price','cant','total','paid'];
  displayedProductColumns: string[] = [ 'name', 'price','cant','state', 'total'];
  dataSource: MatTableDataSource<Detail>;
  dataProductSource: MatTableDataSource<DetailProduct>;
  constructor(
    private router:Router,
    private entryService:EntryService,
    private dialog: MatDialog,
    private route:ActivatedRoute,
    private detailService:DetailService,
    private detailProductService:DetailProductService,
    private utilService:NavService
    ) {
      this.utilService.getUser().subscribe(user => this.role = user?.role.name || '')
      this.route.paramMap.subscribe(
        params =>{
          this.id = params.get('id')!;
        })

  }
  role = ''

  canManageSales(){
    return this.role === 'admin' || this.role === 'user'
  }

  canRegisterDetails(){
    return this.canManageSales() || this.role === 'delivery'
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
        this.dataSource= new MatTableDataSource(res.details)
        const productsByHour = [...res.detailsProduct].sort((first, second) => {
          const firstTime = new Date(first.createAt).getTime();
          const secondTime = new Date(second.createAt).getTime();

          if (firstTime !== secondTime) {
            return firstTime - secondTime;
          }

          return Number(first.id) - Number(second.id);
        });

        this.dataProductSource = new MatTableDataSource(productsByHour)
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
      if (result) {
        this.loadData()
        this.openAlertDialog('Se adiciono el servicio correctamente')
        this.utilService.setCantCli()
      }
    });
  }
  openAlertDialog(message:string) : void {
    const dialogRef = this.dialog.open(AlertDialog, {
      data: {title: "Sauna Florida", message},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openCreateDetailProductDialog():void {
    const dialogRef = this.dialog.open(DetailProductDialog, {
      data:this.entry,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.loadData()
        this.openAlertDialog('Se adiciono el producto correctamente')
      }
    });
  }
  getTotalCost() {
    return this.dataSource.data.map(t => t.price*t.cant).reduce((acc, value) => acc + value, 0);
  }
  getTotalCostProducts(){
    return this.dataProductSource.data.map(t => {
      if(t.state == 2)
        return t.price*t.cant
      return 0
    }).reduce((acc, value) => acc + value, 0);
  }
  changePaidService(detail: Detail, paid: boolean){
    const previousValue = detail.paid;
    detail.paid = paid;

    this.detailService.update(detail.id, {paid})
      .subscribe({
        error: () => {
          detail.paid = previousValue;
        },
        complete: () => this.loadData()
      });
  }
  changeStateProduct(id:string,state:number){
    if (state >= 2) {
      return;
    }

    const nextState = state + 1;
    this.detailProductService.update(id,{state: nextState})
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          this.loadData()
        }
    })
  }
  printDetail(){
    window.print()
  }
  changeStateEntry(){

      this.entryService.closeEntry(this.entry.id)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          this.utilService.setCantCli()
          this.router.navigate(["/entries"]);
        }
    })
  }
  openAlertExitDialog() : void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {title: "Sauna Florida",message: `Seguro que el cliente ${this.entry.customer.name} esta saliendo del sauna?`},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',this.entry.customer.name);
      if(!!result)
        this.changeStateEntry()
    });
  }
   openPromtDialog():void {
      const dialogRef = this.dialog.open(PromtDialog, {
        data:{ title:`Dinero dejado: ${this.entry.customer.name}`,
         message:"Ingrese la cantidad de dinero que dejo el cliente",
          cant:this.entry.paid || 0},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
            console.log('The dialog was closed',result);
            this.entryService.update(this.entry.id,{paid:(result.cant as number)})
          .subscribe({
            next: (res) => {
              console.log(res);
            },
            error: (e) => {
              console.log(e);
            },
            complete: () => {
              this.loadData()
            }
        })
      }
    });
    }
   openPromtObsDialog():void {
      const dialogRef = this.dialog.open(PromtDialog, {
        data:{ title:`Observacion: ${this.entry.customer.name}`,
         message:"Ingrese una observacion",
          cant:this.entry.observation},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
            console.log('The dialog was closed',result);
            this.entryService.update(this.entry.id,{observation:(result.cant as number).toString()})
          .subscribe({
            next: (res) => {
              console.log(res);
            },
            error: (e) => {
              console.log(e);
            },
            complete: () => {
              this.loadData()
            }
        })
      }
    });
    }
}
