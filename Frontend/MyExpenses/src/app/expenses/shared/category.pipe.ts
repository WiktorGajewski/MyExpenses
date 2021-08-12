import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: "category"})
export class CategoryPipe implements PipeTransform{
    transform(value: number|undefined) : string|undefined
    {
        switch(value){
            case 1: return "Food"
            case 2: return "Fun"
            case 3: return "Transport"
            default: return value?.toString();
        }
    }
}