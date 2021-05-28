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
  finalPackages: any

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
    this.requests.get("iataCodes").subscribe(async res => {
      let iataCodes = res
      if(iataCodes != null){
        this.requests.get("flights").subscribe(res => {
          let flights = res
          if(flights != null){

            this.requests.get("hotels").subscribe(res => {
              let hotels = res
              if(hotels != null){
                this.packages = this.setPackages(iataCodes, flights, hotels)
                this.finalPackages = this.packages
                console.log(this.packages)
              }
            })

          }
        })
      }
    })
  }

  getPackages(){
    var destination = this.form2.value.textInput
    destination = destination.replace(/\s/g, '')
    var month = this.form2.value.month
    var year = this.form2.value.year

    console.log(destination, month, year)

    var finalDestinations = []

    const getMonthAndYear = (inputDate) => {
      var date = new Date(inputDate);
      var m = date.getMonth();
      var y = date.getFullYear();

      return `${m}/${y}`
    }

    var destinationArray = destination ? destination.split(",") : []
    destinationArray.forEach(dest => {
      let objFiltered = this.packages.filter( currentObj => {
        console.log( `${month}/${year}`)
        if(currentObj.bestFlight){
          console.log(currentObj.city.indexOf(dest))

          console.log( `${month}/${year}`, getMonthAndYear(currentObj.bestFlight.outboundDate))
          return (dest === currentObj["id"] ||  currentObj["city"].indexOf(dest) === 0) &&  `${month}/${year}` == getMonthAndYear(currentObj["bestFlight"]["outboundDate"])
        }
        return 
        
      })

      objFiltered ? finalDestinations = finalDestinations.concat(objFiltered)  : []

    });

    this.finalPackages = finalDestinations
  }

  setPackages(cities, flights, hotels){

    const agroupByKey = (obj, key) => {
      var itemsAgroupedWithSameIataName = []
        obj.forEach( currentItem => {
          itemsAgroupedWithSameIataName.map(function(e) { return e[0][key]; }).indexOf(currentItem[key]) > -1
          ? itemsAgroupedWithSameIataName[itemsAgroupedWithSameIataName.map(function(e) { return e[0][key]; }).indexOf(currentItem[key])].push(currentItem) 
          : itemsAgroupedWithSameIataName.push([currentItem])
        })
        return itemsAgroupedWithSameIataName
    }

    const agroupByIataName = (obj, iataName, keyName) => {
      //Criar variavel que vai receber o agrupamento de objetos com identificador em comum. Ex: Iata
      var objItemsWithSameIataName = []

      // Criar filtro que vai trazer somente os objetos que tem o nome que queremos. Ex: "BSB"
      let objFiltered = obj.filter( currentObj => {
        return currentObj[keyName] === iataName
      })

      // Colocar objetos que deram match com o iataName solicitado
      objFiltered ? objItemsWithSameIataName.push(objFiltered) : []
      return objItemsWithSameIataName
    }

    var bestPrice = (obj, key) => {

      var priceResult

      obj.forEach(objItem => {
        
        let min = Math.min.apply(null, objItem.map( item => {
          return item[key]
        }))
        
        priceResult = objItem.filter(i => i[key] == min)[0]
      })
      return priceResult
    }

    var fullPackage = []
    cities.forEach(city => {
      city.bestFlight = bestPrice(agroupByIataName(flights, city.id, 'arrivalAirport'), 'price')
      city.bestHotel = bestPrice(agroupByIataName(hotels, city.id, 'iata'), 'pricePerNight')
      city.bestPackagePrice = city.bestFlight && city.bestHotel ? city.bestFlight.price + city.bestHotel.pricePerNight : 0
      fullPackage.push(city)
    });

    return fullPackage
  }

}
