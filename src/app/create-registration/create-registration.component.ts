import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from '../models/user.model';


@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent implements OnInit {
  public packages = ["Monthly", "Qurterly", "yearly"];
  public genders = ["male", "female"];
  public importantList: string[] = [
    "Suger Craving Body",
    "Building Muscle",
    "Fitness",
    "Energy and Endurance",
    "Fat reduction",
  ];
  public registerForm!: FormGroup;
  public userIdToUpdate!: number;
  public isUpdateActive: boolean =false;
   public updatedUser!: number;
  constructor(private fb: FormBuilder, private activeRoute: ActivatedRoute, private api: ApiService, 
    private router: Router,
    private toastService: NgToastService) {

  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      weight: [''],
      height: [''],
      bmi: [''],
      bmiResults: [''],
      gender: [''],
      requireTrainer: [''],
      package: [''],
      important: [''],
      haveGymBefore: [''],
      enquiryDate: [''],
    });
    this.registerForm.controls['height'].valueChanges.subscribe(res => {
      this.calculateBmi(res);
    });

  
  this.activeRoute.params.subscribe(val => {
    this.userIdToUpdate = val['id'];
    this.api.getUserId(this.userIdToUpdate)
      .subscribe(res => {
        this.isUpdateActive =true;
        this.fillFormToUpdate(res)
      })
  })}


  submit() {
    this.api.postRegister(this.registerForm.value).subscribe(res => {
      this.toastService.success({
        detail: "Success", summary: "Enquirt Added", duration: 3000
      });
      this.registerForm.reset();
    })}

  update() {
    this.api.getUserId(this.userIdToUpdate)
      .subscribe(user => {
        const updatedUser = { ...user, ...this.registerForm.value };
        this.api.updateUser(this.userIdToUpdate, updatedUser)
          .subscribe(res => {
            this.toastService.success({
              detail: "Success", summary: "Enquirt Updated", duration: 3000
            });
            this.registerForm.reset();
            this.router.navigate(['list'])
          });
      });
  }
  
  
  
  calculateBmi(heightValue: number) {
    const weight = this.registerForm.value.weight;
    const height = heightValue / 100; // convert cm to m
    const bmi = weight / (height * height);
    this.registerForm.controls['bmi'].patchValue(bmi);
    
    switch (true) {
      case bmi < 18.5:
        this.registerForm.controls['bmiResults'].patchValue("Underweight");
        break;
  
      case (bmi >= 18.5 && bmi < 25):
        this.registerForm.controls['bmiResults'].patchValue("Normal weight");
        break;
  
      case (bmi >= 25 && bmi < 30 ):
        this.registerForm.controls['bmiResults'].patchValue("Overweight");
        break;
  
      default:
        this.registerForm.controls['bmiResults'].patchValue("Obese");
        break;
    }
  }
  

  fillFormToUpdate(user: User) {
    this.registerForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      weight: user.weight,
      height: user.height,
      bmi: user.bmi,
      bmiResults: user.bmiResults,
      gender: user.gender,
      requireTrainer: user.requireTrainer,
      package: user.package,
      important: user.important,
      haveGymBefore: user.haveGymBefore,
      enquiryDate: user.enquiryDate,
    })
  }
}
