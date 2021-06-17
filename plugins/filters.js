import Vue from 'vue'
import { Duration, Interval, DateTime } from "luxon";
import slug from 'slug'

Vue.filter('capitalize', val => val.toUpperCase())

Vue.filter('extractHour', val => {
  return DateTime.fromISO(val).hour
})

Vue.filter('extractMinutes', val => {
  if(DateTime.fromISO(val).minute.toString().length == 1){
    return '0' + DateTime.fromISO(val).minute
  }else{
    return DateTime.fromISO(val).minute
  }
})

Vue.filter('extractDateFR', val => {
  return DateTime.fromISO(val).setLocale('fr').toLocaleString(DateTime.DATE_HUGE);
})
Vue.filter('extractNumMonthFR', val => {
  return `${DateTime.fromISO(val).setLocale('fr').day} ${DateTime.fromISO(val).setLocale('fr').monthLong}`
})
Vue.filter('extractDayFR', val => {
  return DateTime.fromISO(val).setLocale('fr').weekdayLong
})
Vue.filter('extractHourFR', val => {
  return DateTime.fromISO(val).setLocale('fr').toLocaleString(DateTime.TIME_SIMPLE);
})
Vue.filter('cardDateFR', val => {
  let day = DateTime.fromISO(val).setLocale('fr').weekdayShort
  let dayNumeric = DateTime.fromISO(val).setLocale('fr').day
  return `${day} ${dayNumeric}`
})
Vue.filter('jourDate', val => {
  let day = DateTime.fromISO(val).setLocale('fr').weekdayLong
  let dayNumeric = DateTime.fromISO(val).setLocale('fr').day
  let minutes = DateTime.fromISO(val).minute
  if(DateTime.fromISO(val).minute.toString().length == 1){
    minutes = '0' + DateTime.fromISO(val).minute
  }
  return `${day} à ${DateTime.fromISO(val).hour}:${minutes}`
})

var filter = function(text, length, clamp){
    clamp = clamp || '...';
    var node = document.createElement('div');
    node.innerHTML = text;
    var content = node.textContent;
    return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter('truncate', filter);

Vue.filter('slug', val => {
  return `${slug(val)}`
})
