import { Pipe, PipeTransform } from "@angular/core";
import { CategoryType } from "./expense.model";

@Pipe({name: "category"})
export class CategoryPipe implements PipeTransform{
    transform(value: any) : string | undefined
    {
        if(!value){
            return undefined;
        }

        if(!isNaN(Number(value)))
        {
            return CategoryType[value].replace("_", " ");
        }
        else
        {
            return value.replace("_", " ");
        }
    }
}