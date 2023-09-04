import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'logistics-detail',
  templateUrl: './logistics-detail.component.html',
  styleUrls: ['./logistics-detail.component.scss']
})
export class LogisticsDetailComponent implements OnInit {
  public logisticsDetailForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    //this.createForm();
  }

  createForm() {
    this.logisticsDetailForm = this.formBuilder.group({
      title: ['',[Validators.required]],
      jobReference: ['',[Validators.required]],
      availablePositions: ['',[Validators.required]],
      department: ['',[Validators.required]],
      costCentre: ['',[Validators.required]],
      payGrade: ['',[Validators.required]],
      salaryType: ['',[Validators.required]],
      minSalary: ['',[Validators.required]],
      maxSalary: ['',[Validators.required]],
      positionType: ['',[Validators.required]],
      duraton: ['',[Validators.required]],
      country: ['',[Validators.required]],
      province: ['',[Validators.required]],
      city: ['',[Validators.required]],
      synopsis: ['',[Validators.required]],
      description: ['',[Validators.required]],
      requirements: ['',[Validators.required]],
      workLevel: ['',[Validators.required]],
      category: ['',[Validators.required]],
      anticipatedStartDate: ''
    });
  }

  componentIsInvalid(control: string, formName: string): boolean {
    const forms = {
      'logisticsDetailForm': this.logisticsDetailForm
    }

    // console.log(control)
    // console.log(formName)
    // console.log(forms[formName].get(control))
    return (forms[formName].get(control).touched || forms[formName].get(control).dirty) && !forms[formName].get(control).valid
  }
}
