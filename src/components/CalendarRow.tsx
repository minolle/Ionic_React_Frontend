import './CalendarRow.css';
import CalendarCol_Cell from './CalendarCol_Cell';
import {IonRow, IonCol} from '@ionic/react';
// import {useState} from 'react';

interface Props {
  header :boolean,
  days :any[],
  week :number,
  is_cur_day :boolean[],
  month :number,
  year :number
};

function check_header({header, days, week, is_cur_day, month, year} :Props){
//   console.log('hallo..?', days);
  
  if(header)
    return (
      <IonRow className="head_row_size">
        <IonCol className="header_col"> Mo </IonCol>
        <IonCol className="header_col"> Di </IonCol>
        <IonCol className="header_col"> Mi </IonCol>
        <IonCol className="header_col"> Do </IonCol>
        <IonCol className="header_col"> Fr </IonCol>
        <IonCol className="header_col"> Sa </IonCol>
        <IonCol className="header_col_sun"> So </IonCol>
      </IonRow>
    );
  else
    return (
      <IonRow className="row_size">
        <CalendarCol_Cell className="day_num_pos" disable={days[0][1]} day={days[0][0]} month={month} year={year} is_cur_day={is_cur_day[0]}/>
        <CalendarCol_Cell className="day_num_pos" disable={days[1][1]} day={days[1][0]} month={month} year={year} is_cur_day={is_cur_day[1]}/>
        <CalendarCol_Cell className="day_num_pos" disable={days[2][1]} day={days[2][0]} month={month} year={year} is_cur_day={is_cur_day[2]}/>
        <CalendarCol_Cell className="day_num_pos" disable={days[3][1]} day={days[3][0]} month={month} year={year} is_cur_day={is_cur_day[3]}/>
        <CalendarCol_Cell className="day_num_pos" disable={days[4][1]} day={days[4][0]} month={month} year={year} is_cur_day={is_cur_day[4]}/>
        <CalendarCol_Cell className="day_num_pos" disable={days[5][1]} day={days[5][0]} month={month} year={year} is_cur_day={is_cur_day[5]}/>
        <CalendarCol_Cell className="day_num_pos_sun" disable={days[6][1]} day={days[6]} month={month} year={year} is_cur_day={is_cur_day[6]}/>
      </IonRow>
    );
};

const CalendarRow :React.FC<Props> = (props) => { 
  return check_header(props);
};


export default CalendarRow
