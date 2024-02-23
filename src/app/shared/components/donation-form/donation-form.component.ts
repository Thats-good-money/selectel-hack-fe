import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TuiDay} from "@taiga-ui/cdk";
import {finalize, map, Observable, of, Subject, switchMap, timer} from "rxjs";
import {TuiFileLike} from "@taiga-ui/kit";
import {environment} from "../../../../environments/environment.production";
import {CitiesService} from "@core/services/cities.service";
import {CitiesResponse} from "@core/models/city.model";

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DonationFormComponent implements OnInit{

  constructor(private citiesService: CitiesService) {

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

  cities: string[] = [];




  certificateForm = new FormGroup({
    certificate: new FormControl('cert1')
  })

  needCert = true

  readonly control = new FormControl();

  readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
  readonly loadingFiles$ = new Subject<TuiFileLike | null>();
  readonly loadedFiles$ = this.control.valueChanges.pipe(
    switchMap(file => (file ? this.makeRequest(file) : of(null))),
  );

  ngOnInit(): void {
    this.certificateForm.get('certificate')?.valueChanges.subscribe(value => {
      this.needCert = value === 'cert1'
    })

    this.citiesService.getCities(environment.citiesEndpoint).subscribe((response: CitiesResponse) => {
      this.cities = response.results.map(city => city.title)
    })
  }

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
      bloodType: this.bloodTypeForm.value.bloodType,
      donationDate: this.donationDateForm.value.donationDate,
      donationType: this.donationTypeForm.value.donationType,
      place: this.placeForm.value.place,
      city: this.cityControl.value,
      certificate: this.certificateForm.value.certificate,
      file: this.control.value ? this.control.value.name : 'No file selected'
    };

    console.log(submissionData);
  }
}
