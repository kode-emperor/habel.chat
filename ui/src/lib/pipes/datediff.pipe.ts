import {Pipe, PipeTransform} from '@angular/core';
import { dateDiffStr } from '@shared/types/util';
@Pipe({
  standalone: true,
  name: 'datediffstr',
})
export class DateDiffStrPipe implements PipeTransform {
  transform(value: Date, later: Date): string {
    const diffstr = dateDiffStr(value, later);
    return diffstr;
  }
}