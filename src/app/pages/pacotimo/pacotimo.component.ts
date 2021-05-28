import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Requests } from 'src/services/requests.service';

@Component({
  selector: 'app-pacotimo',
  templateUrl: './pacotimo.component.html',
  styleUrls: ['./pacotimo.component.css']
})
export class PacotimoComponent implements OnInit {
  flitghts: any
  hotels: any
  iataCodes: any
  packages: any

  public form2: FormGroup = new FormGroup({
    'textInput': new FormControl(null),
    'month': new FormControl(null),
    'year': new FormControl(null)
  })

  public months = [
   {id: 0, month: "Janeiro"},
   {id: 1, month: "Fevereiro"},
   {id: 2, month: "Março"},
   {id: 3, month: "Abril"},
   {id: 4, month: "Maio"},
   {id: 5, month: "Junho"},
   {id: 6, month: "Julho"},
   {id: 7, month: "Agosto"},
   {id: 8, month: "Setembro"},
   {id: 9, month: "Outubro"},
   {id: 10, month: "Novembro"},
   {id: 11, month: "Dezembro"}
  ]

  constructor(private requests: Requests) { }

  ngOnInit(): void {
    this.initFlow()
  }

  initFlow(){
   
  }

  getPackages(){
    var destino = this.form2.value.textInput
    var month = this.form2.value.month
    var year = this.form2.value.year

    console.log(destino, month, year)

    
  }



}
