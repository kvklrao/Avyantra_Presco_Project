import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'scorePercentage'
})
export class ScorePercentage implements PipeTransform{
    transform(value: any) :String {
       if(value == null || value ==undefined || value==""){
           return "-";
       }
       return (value + "%");
    }

}