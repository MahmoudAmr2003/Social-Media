import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

@Pipe({
  name: 'spicialDate',
  pure: false
})
export class SpicialDatePipe implements PipeTransform {

  transform(timestamp: { seconds: number, nanoseconds: number }): string {
    if (!timestamp) return 'غير معروف';
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
    return formatDistanceToNow(date, { addSuffix: true });
  }

}
