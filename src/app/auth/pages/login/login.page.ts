import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authForm: FormGroup;
  configs = {
    isSignIn: true,
    action: 'login',
    actionChange: 'Create account'
  };

  private nameControl= new FormControl('',[Validators.required, Validators.minLength(3)])

  constructor(
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.creatForm();
  }

  private creatForm(){
    this.authForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(5)]]
    });
  }

  get email(){
    return this.authForm.get('email');
  }

  get password(){
    return this.authForm.get('password');
  }

  get name(){
    return this.authForm.get('name');
  }

  changeAuthAction(){
    this.configs.isSignIn = !this.configs.isSignIn;
    const { isSignIn } = this.configs;
    this.configs.action = isSignIn ? 'Login' : 'Sign Up';
    this.configs.actionChange = isSignIn ? 'Create accont' : 'Ja possuo cadastro';
    !isSignIn 
      ? this.authForm.addControl('name', this.nameControl) 
      : this.authForm.removeControl('name');
  }

  onSubmit(){
    console.log(this.authForm.value);
  }

}
