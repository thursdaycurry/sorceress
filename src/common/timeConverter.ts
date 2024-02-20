import * as moment from 'moment';

export function unixTimeConverter(unixTime: number) {
  const convertedTime = moment(unixTime).format('YYYY-MM-DD');
  return convertedTime;
}
