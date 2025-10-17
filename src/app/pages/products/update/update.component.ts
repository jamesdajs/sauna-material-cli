import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialog } from 'src/app/components/dialogs/dialogs.component';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { ErrorFormService } from 'src/app/services/errorForm.service';
import { ProductService } from 'src/app/services/product.service';
import { UploadService } from 'src/app/services/upload.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.sass']
})
export class UpdateComponent {
  selectedFile: File;
  selectedFiles?: FileList | null;
  currentFile?: File| null;
  progress = 0;
  message = '';
  preview = '';
  loginForm:FormGroup

  categoryData : [Category]

  imageName:string
  id:string
  categoryId:string
  constructor(private uploadService:UploadService,
    private productService:ProductService,
    private categoryService:CategoryService,
    private formBuilder:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private errorform:ErrorFormService,
    private dialog: MatDialog
    ) {
      this.route.paramMap.subscribe(
        params =>{
          this.id= params.get('id')!
          this.preview = params.get('urlImage')?environment.urlimg+params.get('urlImage'):''
          this.imageName = params.get('urlImage')!
          this.loginForm = this.formBuilder.group({
            name: [params.get('name'), [Validators.required,Validators.minLength(5),Validators.maxLength(50)]],
            price: [params.get('price'),[Validators.required,Validators.min(0.50),Validators.max(100),Validators.pattern('^[0-9]+([.][0-9]+)?$')]],
            description: params.get('description'),
            urlImage:params.get('urlImage'),
            categoryId:[parseInt(params.get('categoryId')!),[Validators.required]]
            ,belongs:[parseInt(params.get('belongs')!),[Validators.required]]
          });
          console.log(this.loginForm.value)
        })

    }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  selectImage() {
    let inputFile = document.getElementById('fileUpload') as HTMLInputElement
    inputFile.onchange = ()=>{
      this.selectedFiles = inputFile.files
      this.currentFile = this.selectedFiles?.item(0);
    }
    inputFile.click()
    //
  }
  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.preview = '';
        this.currentFile = file;
  
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
        };
  
        reader.readAsDataURL(this.currentFile);
      }
    }
  }
  upload(): void {
    this.progress = 0;
    let nameResponse = ''
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.uploadService.delete(this.imageName)
      .subscribe({

        next: (res: any) => {
          console.log(res, "imagen eliminada");
        },
        error: (err: any) => {
          console.log(err);
          
        },
        complete: () => {
          console.log("done")
        }

        
        
      })
      if (file) {
        this.currentFile = file;
        const fd = new FormData();
        fd.append('image', this.currentFile, this.currentFile.name);
        this.uploadService.upload(fd).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              //this.imageInfos = this.uploadService.getFiles();
              nameResponse = event.body.path
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;
  
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the image!';
            }
  
            this.currentFile = undefined;
          },
          complete:() => {
            let form = this.loginForm.get('urlImage')
            form?.setValue(nameResponse)
            this.update()
          }
        });
      }
  
      this.selectedFiles = undefined;
    }else{

      this.update()
    }
  }
  ngOnInit(): void {
    this.getDataCategory()
  }
  getDataCategory(){
    this.categoryService.list()
    .subscribe(data => {
      this.categoryData = data;
      console.log(data);
      
    })
  }
  update(){

    this.productService.update(this.id,this.loginForm.value)
    .subscribe({
      
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.openAlertDialog()
      },
    });
  }
  validar(text:string,name:string){
    return this.errorform.validar(text,name,this.loginForm)
  }
  openAlertDialog(): void {
    const dialogRef = this.dialog.open(AlertDialog, {
      data: {title: "Sauna Florida", message: "Se modifico el producto correctamente"},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.router.navigate(["/products"])
    });
  }
  back(){
    this.router.navigate(["/products"])
  }
}
