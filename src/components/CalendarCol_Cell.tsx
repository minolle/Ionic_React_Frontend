import './CalendarCol_Cell.css';
import {IonCol, IonButton} from '@ionic/react';

interface Props{
  day :number,
  className :string,
  disable :boolean,
  is_cur_day :boolean
  month :number,
  year :number
};

const CalendarCol_Cell :React.FC<Props> = ({day, className, disable, is_cur_day, month, year}:Props) =>{
  return (
    <IonCol className={is_cur_day?"col_pad":"cur_day"}>
      <IonButton disabled={disable} onClick={() => {
        console.log(year, month+1, day);
      }} className="button_size">
        <p className={className}>{day}</p>
      </IonButton>
    </IonCol>
  );
};

export default CalendarCol_Cell;
