import { IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonText, IonGrid, IonRow, IonCol, IonIcon} from '@ionic/react';

import {createContext, useContext, useState} from 'react';

import { caretForwardOutline, caretBackOutline, syncOutline } from 'ionicons/icons';

// import {context} from '../App';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import Calendar from '../components/Calendar';



const MONTHS = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];


function apiCall(){
  //dein Backend
}

function mod_cur_month(cur_month :number, forward :boolean) :number{
  if(forward){
    if(cur_month === 11)
      return 0;
//       cur_month = 0;
    else
      return cur_month + 1;
//       ++cur_month;
  }
  else{
    if(cur_month === 0)
      return 11;
//       cur_month = 11;
    else
      return cur_month - 1;
//       --cur_month
  }
  return cur_month;
}

function mod_cur_year(cur_month :number, cur_year :number, forward :boolean){
  if(forward && (cur_month === 11))
    return cur_year + 1;
  else if((!forward) && !!!cur_month)
    return cur_year - 1;
  return cur_year;
}

// function try_(){
//   console.log('year 2018 month 0');
//   console.log((day_count_year(2018) + day_count_month(0, is_leap_year(2018)))%7);
//   console.log('year 2018 month 1');
//   console.log((day_count_year(2018) + day_count_month(1, is_leap_year(2018)))%7);
//   console.log('year 2018 month 2');
//   console.log((day_count_year(2018) + day_count_month(2, is_leap_year(2018)))%7);
//   console.log('year 2018 month 3');
//   console.log((day_count_year(2018) + day_count_month(3, is_leap_year(2018)))%7);
//   console.log('year 2018 month 4');
//   console.log((day_count_year(2018) + day_count_month(4, is_leap_year(2018)))%7);
//   console.log('year 2019 month 8');
//   console.log((day_count_year(2019) + day_count_month(8, is_leap_year(2019)))%7);
//   console.log('year 2020 month 9');
//   console.log((day_count_year(2020) + day_count_month(9, is_leap_year(2020)))%7);
//   console.log('year 2021 month 10');
//   console.log((day_count_year(2021) + day_count_month(10, is_leap_year(2021)))%7);
//   console.log('year 2022 month 3');
//   console.log((day_count_year(2022) + day_count_month(3, is_leap_year(2022)))%7);
// }
//   useContext(Context).year = d.getFullYear();
//   useContext(Context).month = d.getMonth();
//   useContext(Context).day = d.getDay();



const Tab1: React.FC = () => {
  let d = new Date();
  const [cur_date, set_cur_month] = useState({
    year :d.getFullYear(),
    month :d.getMonth(),
    day :d.getDate() - 1,
    actual_year :d.getFullYear(),
    actual_month :d.getMonth()
  });
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <IonGrid>
              <IonRow>
                <IonCol size="3" className="month_year_head0">
                  {cur_date.year}
                </IonCol>
                <IonCol size="6"></IonCol>
                <IonCol size="3" className="month_year_head0">
                  <IonButton size="small" onClick={() => apiCall()}>
                    <IonIcon icon={syncOutline}/>
                  </IonButton>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12" className="month_year_head">
                  <IonButton className="month_button_l" 
                  onClick={() => set_cur_month({
                    month : mod_cur_month(cur_date.month, false),
                    year : mod_cur_year(cur_date.month,
                                        cur_date.year,
                                        false),
                    day : cur_date.day,
                    actual_year : cur_date.actual_year,
                    actual_month : cur_date.actual_month
                  })}>
                    <IonIcon icon={caretBackOutline}/>
                  </IonButton>
                  {MONTHS[cur_date.month]}
                  <IonButton className="month_button_r"
                  onClick={() => set_cur_month({
                    month : mod_cur_month(cur_date.month, true),
                    year : mod_cur_year(cur_date.month, 
                                        cur_date.year,
                                        true),
                    day : cur_date.day,
                    actual_year : cur_date.actual_year,
                    actual_month : cur_date.actual_month
                  })}>
                    <IonIcon icon={caretForwardOutline}/>
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <Calendar year={cur_date.year} month={cur_date.month} day={cur_date.day} actual_year={cur_date.actual_year} actual_month={cur_date.actual_month}/>
      
    </IonPage>
  );
};


export default Tab1;

