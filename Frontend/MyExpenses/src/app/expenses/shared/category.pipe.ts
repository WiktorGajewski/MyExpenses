import { Pipe, PipeTransform } from "@angular/core";
import { CategoryType } from "./expense.model";

@Pipe({name: "category"})
export class CategoryPipe implements PipeTransform{
    transform(value: any) : string | undefined
    {
        if(!isNaN(Number(value)))
        {
            return CategoryType[value].replace("_", " ")
        }
        else if(value)
        {
            return value.replace("_", " ")
        }
        
        return undefined
    }
}