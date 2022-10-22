import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import * as stream from "stream";

@Component({
  selector: 'app-bookmark-manager',
  templateUrl: './bookmark-manager.component.html',
  styleUrls: ['./bookmark-manager.component.scss']
})
export class BookmarkManagerComponent implements OnInit {
  modalForm: FormGroup
  modalOpenFlag: boolean;
  categoryAddFlag: boolean;
  categoryList:any[] = [];
  categoryObject:any;
  categoryDetails:any = null;
  cat:any
  getFromLocalStorage:any;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.modalForm = this.formBuilder.group({
      Title: ['', Validators.required],
      Url: ['', Validators.required],
      Category:  [null],
      newCategory:  [''],
    });

    this.modalOpenFlag = false;
    this.categoryAddFlag = false;
  }

  ngOnInit(): void {
    this.getFromLocalStorage = localStorage.getItem('categoryList');
    if (this.getFromLocalStorage != null && this.getFromLocalStorage != undefined){
      this.categoryList = JSON.parse(this.getFromLocalStorage);
    }
  }
  openModal(flag:boolean) {
  this.modalOpenFlag = flag;
    this.categoryAddFlag = false;
  }
  addCategory(categoryFlag: boolean){
    this.categoryAddFlag = categoryFlag;
  }

  saveBtn(){
    debugger
    if (this.categoryAddFlag == false && (this.modalForm.value.Category == null || this.modalForm.value.Category == undefined)){
      alert("select category")
      return;
    }if (this.categoryAddFlag && (this.modalForm.value.newCategory == '' || this.modalForm.value.newCategory == null)){
      alert("Add New category")
      return
    }
    if (this.modalForm.value.newCategory == null || this.modalForm.value.newCategory == ''){
      this.cat = this.modalForm.value.Category;
    }else {
      this.cat = this.modalForm.value.newCategory;
    }

    if (this.modalForm.valid){
      this.categoryObject={
        title: this.modalForm.value.Title,
        url: this.modalForm.value.Url,
        category: this.cat,
      }
      this.categoryList.push(this.categoryObject);
      localStorage.setItem('categoryList', JSON.stringify(this.categoryList));
      debugger
      alert("category added")
      this.modalForm.reset();
      this.categoryAddFlag = false;
      this.modalOpenFlag = false;
    }
    else {
      alert("form not valid")
    }

  }

  showCategoryDetails(categoryObj:any){
    this.categoryDetails=categoryObj;
  }
}
