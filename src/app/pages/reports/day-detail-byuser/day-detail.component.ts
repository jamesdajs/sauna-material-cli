import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { GroupedReport, Report } from 'src/app/interfaces/report';
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
  dataProductSource: Report[][];
  totalGeneral:number = 0;

  groupNames: { [key: number]: string } = {
    0: 'Sauna',
    1: 'Virgilio',
    2: 'María',
    3: 'Isabel',
    // Puedes agregar un valor por defecto para IDs no mapeados
    // -1: 'Sin Grupo' 
  };

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
        const groupedArrays = res.product.reduce((acc:GroupedReport, currentItem) => {
          const key = currentItem.belongs ;
          // Si la clave (valor de bellongs) no existe en el acumulador (acc), 
          // la inicializamos como un array vacío.
          if (!acc[key]) {
            acc[key] = [];
          }
          // Añadimos el objeto actual al array correspondiente
          acc[key].push(currentItem);
          return acc;
        }, {}); // El valor inicial es un objeto vacío {}
        this.dataProductSource = Object.values(groupedArrays);
        this.totalGeneral = this.calculateGrandTotal();
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
  calculateGroupTotal(group: Report[]): number {
    return group.reduce((sum, current) => sum + (current.cant*current.price), 0);
  }

  /** Calcula la suma de todas las cantidades en el array principal. */
  calculateGrandTotal(): number {
    return this.dataProductSource.flat().reduce((sum, current) => sum + (current.cant*current.price), 0);
    // .flat() convierte el Array de Arrays a un Array simple para sumar todo
  }
  getGroupName(group: Report[]): string {
    // Obtenemos el ID del primer elemento del grupo (asumiendo que todos son iguales)
    const belongsId = group[0]?.belongs;
    
    // Devolvemos el nombre mapeado, o una cadena de fallback si no existe
    return this.groupNames[belongsId] || `ID Desconocido (${belongsId})`;
  }
}
