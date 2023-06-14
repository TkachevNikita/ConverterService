import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
    @Input() public options!: string[];
    public currentOption: string = '';
    public selectedList: string[] = [];
    public selectedItem!: string;

    @Input() public multiple!: boolean;
    public value!: string;
    private _onTouched!: () => void;
    private _onChange!: (value: string[] | string) => void;

    public writeValue(value: any): void {
        this.value = value;
    }
    public registerOnChange(fn: any): void {
        this._onChange = fn;
    }
    public registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    public drawValue(): string {
        if (this.multiple) {
            if (this.selectedList.length > 0) {
              this.currentOption = this.selectedList.map(option => option).join(', ');
            } else {}
        } else if (this.selectedItem) {
            this.currentOption = this.selectedItem + ' ' + this.selectedItem;
        }

        return this.currentOption;
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

    public onMultipleSelect(option: string): void {
        if (this.selectedList.includes(option)) {
            this.selectedList.splice(this.selectedList.indexOf(option), 1);

            return;
        }
        this.selectedList.push(option);
        const current = this.selectedList;
        this._onChange(current);
    }

    public onSelect(option: string): void {
        if (this.multiple) {
            this.onMultipleSelect(option);
        } else {
            this.onSingleSelect(option);
        }
    }

    public onSingleSelect(option: string): void {
        if (this.selectedItem !== undefined) {
            this.selectedItem = option;
            this._onChange(option);

            return;
        }
        this.selectedItem = option;
        this._onChange(option);
    }
}
