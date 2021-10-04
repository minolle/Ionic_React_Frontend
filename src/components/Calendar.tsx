import { IonContent, IonGrid } from '@ionic/react';
import './Calendar.css';
import CalendarRow from './CalendarRow';
// import {useState} from 'react';
// import mod_cur_month from '../pages/Tab1';
// import {context} from '../pages/Tab1';
// import 'react';

interface Props{
  year:number,
  month:number,
  day:number,
  actual_year:number,
  actual_month:number
}


function is_leap_year(year :number) :boolean{
  return (((!!!(year%4)) && !!(year%100)) || !!!(year%400))
}

function day_count_year(year :number) :number{
  let count_days = 0;
  for(var start_y=1906; start_y < year ; ++start_y){
    if(is_leap_year(start_y))
      count_days += 366
    else
      count_days += 365
  }
  return count_days;
}

function get_day_count(month: number, is_leap :boolean) :number{
  if(month === 1)
    return 28 + (+is_leap);
  else if(!!!(month%2))
    return 30 + (+(month < 7));
  else
    return 30 + (+(month > 6));
}

function day_count_month(month :number, is_leap :boolean) :number{
  let count_days = 0;
  for(var start_m = 0 ; start_m < month ; ++start_m)
    count_days += get_day_count(start_m, is_leap);
  return count_days;
}

function mod_cur_month(cur_month :number, forward :boolean) :number{
  if(forward){
    if(cur_month === 11)
      return 0;
    else
      return cur_month + 1;
  }
  else{
    if(cur_month === 0)
      return 11;
    else
      return cur_month - 1;
  }
}

function gen_day_range_first_week(year :number, month :number){
  var range = new Array<any>(7);
  var is_leapyear = is_leap_year(year);
  var month_bef_day_c = get_day_count(mod_cur_month(month, false), is_leapyear);
  var offset = (day_count_year(year) + day_count_month(month, is_leapyear))%7;
  for(var i = 0 ; i < offset ; ++i)
    range[i] = [(((month_bef_day_c - offset) + 1) + i), true];
  for(var i = offset ; i < 7 ; ++i)
    range[i] = [(i-offset+1), false];
  return range;
}

function gen_day_range_mid_weeks(year :number, month :number, week :number){
  var range = new Array<any>(7);
  var is_leapyear = is_leap_year(year);
  var offset = (day_count_year(year) + day_count_month(month, is_leapyear))%7;
  for(var i = 0 ; i < 7 ; ++i)
    range[i] = [((i+(7-offset)+1) + (week-1)*7), false];
  return range;
}

function gen_day_range_last_two_weeks(year :number, month :number, week :number){
  var range = new Array<any>(7);
  var is_leapyear = is_leap_year(year);
  var cur_month_day_count = get_day_count(month, is_leapyear);
  var offset = (day_count_year(year) + day_count_month(month, is_leapyear))%7;
  var after = 0;
  if(((offset+cur_month_day_count) > 34 && (week === 4 || week === 5)) ||
    ((offset+cur_month_day_count) <= 34 && week === 4)){
    for(var i = 0 ; i < 7 ; ++i){
      if(!(((i+(7-offset)+1) + (week-1)*7) > get_day_count(month, is_leapyear)))
        range[i] = [((i+(7-offset)+1) + (week-1)*7), false];
      else{
        ++after;
        range[i] = [after, true];
      }
    }
  }
  else if((offset+cur_month_day_count) <= 34 && week === 5){
    after = 35 - (offset+cur_month_day_count);
    for(var i = 0 ; i < 7 ; ++i){
      ++after;
      range[i] = [after, true];
    }
  }
  return range;
}

function flags_cur_day(year :number, actual_year :number, month :number, actual_month :number, week :number, day :number){
  var is_cur_day = [true, true, true, true, true, true, true];
  var is_leapyear = is_leap_year(year);
  var offset = (day_count_year(year) + day_count_month(month, is_leapyear))%7;
  if((year === actual_year) && (month === actual_month)){
    if((week*7 <= (day + offset)) && (day + offset < (1+week)*7)){
      is_cur_day[(day+offset)%7] = false;
    }
  }
  
  return is_cur_day;
}

const Calendar :React.FC<Props> = ({year, month, day, actual_year, actual_month}:Props) => {
  
  return (
    <IonContent fullscreen>
      <IonGrid>
        <CalendarRow header={true} is_cur_day={[]} week={-1} month={-1} year={-1} days={[]}/>
        <CalendarRow header={false} is_cur_day={flags_cur_day(year, actual_year, month, actual_month, 0, day)} week={0} month={month} year={year} days={gen_day_range_first_week(year, month)}/>
        <CalendarRow header={false} is_cur_day={flags_cur_day(year, actual_year, month, actual_month, 1, day)} week={1} month={month} year={year} days={gen_day_range_mid_weeks(year, month, 1)}/>
        <CalendarRow header={false} is_cur_day={flags_cur_day(year, actual_year, month, actual_month, 2, day)} week={2} month={month} year={year} days={gen_day_range_mid_weeks(year, month, 2)}/>
        <CalendarRow header={false} is_cur_day={flags_cur_day(year, actual_year, month, actual_month, 3, day)} week={3} month={month} year={year} days={gen_day_range_mid_weeks(year, month, 3)}/>
        <CalendarRow header={false} is_cur_day={flags_cur_day(year, actual_year, month, actual_month, 4, day)} week={4} month={month} year={year} days={gen_day_range_last_two_weeks(year, month, 4)}/>
        <CalendarRow header={false} is_cur_day={flags_cur_day(year, actual_year, month, actual_month, 5, day)} week={5} month={month} year={year} days={gen_day_range_last_two_weeks(year, month, 5)}/>
      </IonGrid>
    </IonContent>
  );
};

export default Calendar;
