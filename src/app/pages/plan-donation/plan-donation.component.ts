import {Component, OnInit} from '@angular/core';
import {CitiesService} from "@core/services/cities.service";
import {StationsService} from "@core/services/stations.service";
import {FormControl, FormGroup} from "@angular/forms";
import {TuiDay} from "@taiga-ui/cdk";
import {SimpleCity} from "@core/models/simpleCity.model";
import {SimpleStation} from "@core/models/simpleStation.model";
import {environment} from "../../../environments/environment";
import {CitiesResponse} from "@core/models/city.model";
import {StationsResponse} from "@core/models/station.model";
import {finalize, map, Observable, of, Subject, switchMap, timer} from "rxjs";
import {TuiFileLike} from "@taiga-ui/kit";

@Component({
  selector: 'app-plan-donation',
  templateUrl: './plan-donation.component.html',
  styleUrls: ['./plan-donation.component.scss']
})
export class PlanDonationComponent implements OnInit{
  constructor(private citiesService: CitiesService, private stationsService: StationsService) {

  }


  readonly bloodTypeForm = new FormGroup(({
    bloodType: new FormControl('')
  }))

  readonly bloodTypes = ['Цельная кровь', 'Плазма', 'Тромбоциты', 'Эритроциты', 'Гранулоциты']

  donationDateForm = new FormGroup({
    donationDate: new FormControl(new TuiDay(2024, 1, 23))
  })

  donationTypeForm = new FormGroup({
    donationType: new FormControl('donationType1')
  })


  placeForm = new FormGroup({
    place: new FormControl('place1')
  })

  readonly cityControl = new FormControl();

  readonly stationControl = new FormControl();

  extendedCities: SimpleCity[] = []
  simpleCities: string[] = [];

  stations: SimpleStation[] = []

  filteredStations: SimpleStation[] = []

  stationsHeaders: string[] = []


  getCityByName(cityName: string | null | undefined){
    const city = this.extendedCities.find(city => city.name === cityName)
    return city ? city.id : undefined
  }


  ngOnInit(): void {
    this.citiesService.getCities(`${environment.externalApiUrl}/cities`).subscribe((response: CitiesResponse) => {
      this.simpleCities = response.results.map(city => city.title)
      this.extendedCities = response.results.map(city => ({name: city.title, id: city.id}))
    })

    this.stationsService.getStations(`${environment.externalApiUrl}/blood_stations`).subscribe((response: StationsResponse) => {
      this.stations = response.results.map(station => ({name: station.title, city_id: station.city_id}))
    })

    this.cityControl.valueChanges.subscribe(selectedCity => {
      this.filterStationsByCity(selectedCity)
      this.stationControl.reset()
    })
  }

  filterStationsByCity(city: string){
    if (this.getCityByName(city) !== undefined){
      this.filteredStations = this.stations.filter(station => station.city_id === this.getCityByName(city))

      this.stationsHeaders = this.filteredStations.map(station => station.name)
    }
  }


  submitForm() {
    const submissionData = {
      bloodType: this.bloodTypeForm.value.bloodType,
      donationDate: this.donationDateForm.value.donationDate,
      donationType: this.donationTypeForm.value.donationType,
      place: this.placeForm.value.place,
      city: this.cityControl.value,
      station: this.stationControl.value,
    };

    console.log(submissionData);
  }
}
