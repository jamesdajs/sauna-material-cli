import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSelectionListChange } from "@angular/material/list";
import { forkJoin } from "rxjs";
import { DetailCreateRequest } from "src/app/interfaces/detail";
import { Entry } from "src/app/interfaces/entry";
import { Locker } from "src/app/interfaces/locker";
import { Service } from "src/app/interfaces/service";
import { DetailService } from "src/app/services/detail.service";
import { LockerService } from "src/app/services/locker.service";
import { ServiceService } from "src/app/services/service.service";

@Component({
  selector: 'detail-dialog',
  templateUrl: './detail.dialog.html',
  styleUrls: ['./detail.dialog.sass']
})
export class DetailDialog implements OnInit {
  lockerData: Locker[] = [];
  serviceData: Service[] = [];
  arrayServiceSelect: DetailCreateRequest[] = [];
  selectedLockerIds: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<DetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Entry,
    private lockerService: LockerService,
    private serviceService: ServiceService,
    private detailService: DetailService
  ) {}

  ngOnInit(): void {
    this.lockerService.list("/list/false")
      .subscribe(data => {
        this.lockerData = data.sort((a, b) => {
          const numA = parseInt(a.code.match(/\d+/)?.[0] || '0', 10);
          const numB = parseInt(b.code.match(/\d+/)?.[0] || '0', 10);
          return numA - numB;
        });
      });

    this.serviceService.list("/list/true")
      .subscribe(data => this.serviceData = data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  create(): void {
    if (!this.arrayServiceSelect.length) {
      return;
    }

    const requests = this.arrayServiceSelect.map((service, index) =>
      this.detailService.create({
        serviceId: service.serviceId,
        price: service.price,
        cant: service.cant,
        entryId: this.data.id,
        lockerId: index === 0 ? this.selectedLockerIds : [],
      })
    );

    forkJoin(requests).subscribe(() => this.dialogRef.close(true));
  }

  selectService(event: MatSelectionListChange): void {
    const selectedServices = event.source.selectedOptions.selected
      .map(option => option.value as Service);
    const selectedIds = new Set(selectedServices.map(service => service.id));
    const currentSelection = new Map(
      this.arrayServiceSelect.map(service => [service.serviceId, service])
    );

    currentSelection.forEach((_, serviceId) => {
      if (!selectedIds.has(serviceId!)) {
        currentSelection.delete(serviceId);
      }
    });

    selectedServices.forEach(service => {
      if (!currentSelection.has(service.id)) {
        currentSelection.set(service.id, {
          name: service.name,
          serviceId: service.id,
          cant: 1,
          price: service.price,
          entryId: this.data.id,
          lockerId: [],
        });
      }
    });

    this.arrayServiceSelect = Array.from(currentSelection.values());
  }

  selectLockers(event: MatSelectionListChange): void {
    this.selectedLockerIds = event.source.selectedOptions.selected
      .map(option => option.value as string);
  }

  isServiceSelected(serviceId: string): boolean {
    return this.arrayServiceSelect.some(service => service.serviceId === serviceId);
  }

  isLockerSelected(lockerId: string): boolean {
    return this.selectedLockerIds.includes(lockerId);
  }

  lockerLabel(locker: Locker): string {
    const type = locker.type === '0' ? 'Masculino' : locker.type === '1' ? 'Femenino' : 'Privado';
    return `Nº ${locker.code} · ${type}`;
  }
}
