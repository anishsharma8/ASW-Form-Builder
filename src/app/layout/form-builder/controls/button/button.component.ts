import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Constants } from './../../../common/constants';
import { ConfirmDialogComponent } from './../../../shared-components/confirm-dialog/confirm-dialog.component';
import { EditButtonComponent } from './../../../edit-controls/edit-button/edit-button.component';

@Component({
    selector: 'asw-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

    constants: any = Constants;
    /**
     * Button control
     */
    @Input() control: any;

    /**
     * Button control index to help update or delete button from drop area
     */
    @Input() controlIndex: number;

    @Output() buttonUpdateEvent = new EventEmitter<{control: any, index: number}>();
    @Output() buttonDeleteEvent = new EventEmitter<number>();

    constructor(public dialog: MatDialog) { }
    
    /**
     * 
     * @param control 
     * @param controlIndex 
     */
  	deleteButtonDialog(control: any, controlIndex: number): void {
		let dialogRef = this.dialog.open(ConfirmDialogComponent, {
			width: '350px',
			data: { name: control.name, message: this.constants.messages.waringMessage }
		});
		dialogRef.afterClosed().subscribe(result => {            
			if(result != undefined) {
                this.buttonDeleteEvent.emit(controlIndex);
			}
		});
	}

	editButtonDialog(control: any, controlIndex: number): void {
		let dialogRef = this.dialog.open(EditButtonComponent, {
			disableClose: true,
			width: '744px',
			data: control
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result != undefined) {
				this.buttonUpdateEvent.emit({control: result, index: controlIndex});
			}
		});
	}
}
