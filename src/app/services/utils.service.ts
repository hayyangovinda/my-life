import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}
  formatDateToStartOfDayUTC(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}T00:00:00.000Z`;
  }

  getCorrectDateFormat(startValue: any, endValue: any) {
    if (!startValue || !endValue) {
      return;
    }

    let endDate = new Date(endValue);
    if (endDate >= new Date()) {
      endDate = new Date();
    }
    const start =
      moment(new Date(startValue)).format('YYYY-MM-DD') + 'T00:00:00.000Z';
    const end = moment(endDate).format('YYYY-MM-DD') + 'T00:00:00.000Z';
    console.log({
      start,
      end,
    });

    return {
      start,
      end,
    };
  }
}
