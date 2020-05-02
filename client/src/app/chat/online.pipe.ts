import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'online',
})
export class OnlinePipe implements PipeTransform {
  transform(arrClient: any[], name: string) {
    console.log('name', name);
    console.log('arrClient', arrClient);
    return arrClient.includes(name) ? 'online' : 'offline';
  }
}
