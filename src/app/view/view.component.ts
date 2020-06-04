import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  noteHeading: String;
  noteDescription: String;
  noteContent:String;
  noteContentSplit: String[];
  loadingNote: boolean;

  constructor() {
    this.noteHeading = 'Demo Heading';
    this.noteDescription = 'Description for the demo heading eadedion for the demo heading eadedion for the demo heading eadedion for the demo heading eadedion for the demo heading eadedion for the demo heading eadedion for the demo heading eadedion for the demo heading eadedion for the demo heading eadedion for the demo heading eadedion for the demo heading eadedion for the demo heading eadedion for the demo heading eaded';
    this.noteContent = 'To sure calm much most \n long me mean. Able rent long in do we. Uncommonly no it announcing \n melancholy an in. Mirth learn it he given. Secure shy favour length all twenty denote. He felicity no an at packages answered opinions juvenile.  No depending be convinced in unfeeling he. Excellence she unaffected and too sentiments her. Rooms he doors there ye aware in by shall. Education remainder in so cordially. His remainder and own dejection daughters sportsmen. Is easy took he shed to kind.  Way nor furnished sir procuring therefore but. Warmth far manner myself active are cannot called. Set her half end girl rich met. Me allowance departure an curiosity ye. In no talking address excited it conduct. Husbands debating replying overcame blessing he it me to domestic. Savings her pleased are several started females met. Short her not among being any. Thing of judge fruit charm views do. Miles mr an forty along as he. She education get middleton day agreement performed preserved unwilling. Do however as pleased offence outward beloved by present. By outward neither he so covered amiable greater. Juvenile proposal betrayed he an informed weddings followed. Precaution day see imprudence sympathize principles. At full leaf give quit to in they up. How promotion excellent curiosity yet attempted happiness. Gay prosperous impression had conviction. For every delay death ask style. Me mean able my by in they. Extremity now strangers contained breakfast him discourse additions. Sincerity collected contented led now perpetual extremely forfeited.  '
    this.noteContentSplit = this.noteContent.split("\n");
    console.log(this.noteContentSplit);
    this.loadingNote = false;
  }

  ngOnInit(): void {
  }

}
