import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { OverlayService } from './../../../core/services/overlay.service';
import { AuthProvider } from './../../../core/services/auth.types';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authForm: FormGroup;
  authProviders = AuthProvider;

  configs = {
    isSignIn: true,
    action: 'login',
    actionChange: 'Create account'
  };

  private nameControl= new FormControl('',[Validators.required, Validators.minLength(3)])

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private overlayService: OverlayService 
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

  async onSubmit(provider){
    const loading = await this.overlayService.loading();
    try {
      const credencias = await this.authService.authenticate({
        isSignIn: this.configs.isSignIn,
        user: this.authForm.value,
        provider
      });
      console.log('autenticado', credencias);
    } catch (error) {
      console.log('erro autenticação',error);
      await this.overlayService.toast({
        message: error.message,
      })
    }finally{
      loading.dismiss();
    }
  }

}
