import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-buttons-bar',
  templateUrl: './buttons-bar.component.html',
  styleUrls: ['./buttons-bar.component.scss'],
})
export class ButtonsBarComponent implements OnInit {
  @Output()
  public clickBack = new EventEmitter<Event>();
  @Output()
  public clickSave = new EventEmitter<Event>();
  @Output()
  public clickNew = new EventEmitter<Event>();
  @Input()
  public disabledSave = false;
  @Input()
  public showSaveSubmit = false;

  public showSave = false;
  public showNew = false;
  public showBack = false;

  ngOnInit(): void {
    this.showSave = this.clickSave.observed;
    this.showNew = this.clickNew.observed;
    this.showBack = this.clickBack.observed;
  }

  onClickNew() {
    this.clickNew.emit();
  }

  onClickBack() {
    this.clickBack.emit();
  }

  onClickSave() {
    this.clickSave.emit();
  }
}
