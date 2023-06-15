import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectModel } from 'src/app/models/type.model';

@Component({
    selector: 'app-custom-select',
    templateUrl: './custom-select-control.component.html',
    styleUrls: ['./styles/custom-select-control.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CustomSelectComponent),
            multi: true
        }
    ]
})

export class CustomSelectComponent implements ControlValueAccessor {
    public dropDownIsOpen: boolean = false;
    @Input() public options!: SelectModel[];

    public viewSelectedList: string[] = []

    public selectedList: SelectModel[] = [];
    public selectedItem!: SelectModel;
    public isEmpty: boolean = true;

    @Input() public placeholder!: string;
    @Input() public multiple!: boolean;
    public value!: string;
    private _onTouched!: () => void;
    private _onChange!: (value: string[] | string | null | (string | null)[]) => void;

    public writeValue(value: any): void {
        this.value = value;
    }
    public registerOnChange(fn: any): void {
        this._onChange = fn;
    }
    public registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    public onOpenSelect(): void {
        switch (this.dropDownIsOpen) {
            case true:
                this.dropDownIsOpen = false;
                break;
            case false:
                this.dropDownIsOpen = true;
                break;
        }
        this._onTouched();
    }

    public onMultipleSelect(option: SelectModel): void {
        if (this.selectedList.includes(option)) {
            this.selectedList = this.selectedList.filter(item => item !== option);
            this.viewSelectedList = this.selectedList.map(item => item?.viewValue)
            if (this.selectedList.length > 0) {
                this.isEmpty = false;
            } else {
              this.isEmpty = true;
            }

            return;
        }
        this.isEmpty = false;
        this.selectedList = [...this.selectedList, option];
        const current = this.selectedList;
        this.viewSelectedList = current.map(item => item?.viewValue)
        this._onChange(current.map(item => item?.value));
    }

    public onSelect(option: SelectModel): void {
        if (this.multiple) {
            this.onMultipleSelect(option);
        } else {
            this.onSingleSelect(option);
        }
    }

    public onSingleSelect(option: SelectModel): void {
        if (this.selectedItem) {
            this.selectedItem = option;
            this._onChange(option?.value);

            return;
        }

        this.isEmpty = false;
        this.selectedItem = option;
        this._onChange(option?.value);
    }
}
