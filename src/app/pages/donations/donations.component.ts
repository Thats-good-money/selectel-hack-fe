import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TuiDay} from "@taiga-ui/cdk";
import {finalize, map, Observable, of, Subject, switchMap, timer} from "rxjs";
import {TuiFileLike} from "@taiga-ui/kit";

import {CitiesService} from "@core/services/cities.service";
import {CitiesResponse} from "@core/models/city.model";
import {StationsService} from "@core/services/stations.service";
import {StationsResponse} from "@core/models/station.model";
import {SimpleStation} from "@core/models/simpleStation.model";
import {SimpleCity} from "@core/models/simpleCity.model";
import {environment} from "../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "@core/services/auth.service";
import {DonationsService} from "@core/services/donations.service";


@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DonationsComponent implements OnInit{

  constructor(
    private citiesService: CitiesService,
    private stationsService: StationsService,
    private _route: ActivatedRoute,
    private authService: AuthService,
    private donatService: DonationsService,
    private router: Router
  ) {}


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
    this.certificateForm.get('certificate')?.valueChanges.subscribe(value => {
      this.needCert = value === 'cert1'
      this.removeFile()
    })

    this.citiesService.getCities(`${environment.externalApiUrl}/cities`).subscribe((response: CitiesResponse) => {
      this.simpleCities = response.results.map(city => city.title)
      this.extendedCities = response.results.map(city => ({name: city.title, id: city.id}))
    })

    this.stationsService.getStations(`${environment.externalApiUrl}/blood_stations`).subscribe((response: StationsResponse) => {
      this.stations = response.results.map(station => ({id: station.id, name: station.title, city_id: station.city_id}))
    })

    this.cityControl.valueChanges.subscribe(selectedCity => {
      this.filterStationsByCity(selectedCity)
      this.stationControl.reset()
    })

    this._fillFormWithBloodStationFromPreviousUrl();
  }


  filterStationsByCity(city: string){
    if (this.getCityByName(city) !== undefined){
      this.filteredStations = this.stations.filter(station => station.city_id === this.getCityByName(city))

      this.stationsHeaders = this.filteredStations.map(station => station.name)
    }
  }


  needCert = true

  certificateForm = new FormGroup({
    certificate: new FormControl('cert1')
  })

  readonly control = new FormControl();

  readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
  readonly loadingFiles$ = new Subject<TuiFileLike | null>();
  readonly loadedFiles$ = this.control.valueChanges.pipe(
    switchMap(file => (file ? this.makeRequest(file) : of(null))),
  );


  onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFiles$.next(file as TuiFileLike);
  }

  removeFile(): void {
    this.control.setValue(null);
  }

  clearRejected(): void {
    this.removeFile();
    this.rejectedFiles$.next(null);
  }

  makeRequest(file: TuiFileLike): Observable<TuiFileLike | null> {
    this.loadingFiles$.next(file);

    return timer(1000).pipe(
      map(() => {
        if (Math.random() > 0.5) {
          return file;
        }

        this.rejectedFiles$.next(file);

        return null;
      }),
      finalize(() => this.loadingFiles$.next(null)),
    );
  }

  submitForm() {
    const submissionData = {
      userId: this.authService.currentUser?.userId,
      bloodStationId: this.stations.find(s => s.name === this.stationControl.value),
      firstName: this.authService.currentUser?.firstName,
      lastName: '',
      middleName: '',
      donateAt: this.formatDate(this.donationDateForm.value.donationDate),
      bloodClass: this.bloodTypeForm.value.bloodType,
      paymentType: this.donationTypeForm.value.donationType === 'donationType1' ? 'free' : 'payed',
      isOut: this.placeForm.value.place !== 'place1',
      volume: 30,
      paymentCost: 300,
      onModerationDate: this.formatDate(new TuiDay(this.getCurrentDate().year, this.getCurrentDate().month_index, this.getCurrentDate().day)),
      withImage: this.certificateForm.value.certificate === 'cert1',
      createdUsingOcr: true,
      imageId: this.control.value ? this.control.value.name : 'No file selected'
    };



    // const formData = new FormData()
    // for (const key in submissionData) {
    //
    //   if (submissionData.hasOwnProperty(key)) {
    //     // @ts-ignore
    //     const value = typeof submissionData[key] === 'boolean' ? submissionData[key].toString() : submissionData[key];
    //     formData.append(key, value);
    //   }
    // }
    //
    // this.donatService.sendData(formData, `${environment.customApi}/donations`).subscribe({
    //   next: (response)  => {
    //     this.router.navigate(['/'])
    //   },
    //   error: (error) => {
    //     console.error("Error", error)
    //   }
    // })
  }

  getCurrentDate(){
    const now = new Date()
    const day = now.getDate(); // Получаем текущее число
    const month_index = now.getMonth(); // Получаем индекс текущего месяца (0-11)
    const year = now.getFullYear();

    return { day, month_index, year };
  }

  formatDate(customDate: TuiDay | undefined | null):string{
    // @ts-ignore
    const month = customDate.month + 1

    // @ts-ignore
    const formattedDay = customDate.day.toString().padStart(2, '0')
    const formattedMonth = month.toString().padStart(2, '0')

    // @ts-ignore
    return `${customDate.year}-${formattedMonth}-${formattedDay}`
  }

  // Заготовка для метода
  private _fillFormWithBloodStationFromPreviousUrl(): void {
    // const rawBloodStationId = this._route.snapshot.queryParamMap.get('bloodStationId');
    // if (!rawBloodStationId) {
    //   return;
    // }
    //
    // const bloodStationId = parseInt(rawBloodStationId);
    // for (const bloodStation of this.stations) {
    //   if (bloodStation.bloodStationId === bloodStationId) {
    //     this.cityControl.setValue(bloodStation.cityDto.title);
    //     this.stationControl.setValue(bloodStation.title);
    //   }
    // }
  }

}
