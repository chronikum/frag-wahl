import { Pipe, PipeTransform } from '@angular/core';
import linkifyStr from 'linkifyjs/string';

@Pipe({
  name: 'linkerPipe'
})
export class LinkerPipePipe implements PipeTransform {

  transform(str: string): string {
    return str ? linkifyStr(str, { target: '_system' }) : str;
  }

}
