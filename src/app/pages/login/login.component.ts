import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KanbanService } from 'src/app/services/kanban.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    login: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required)
  });

  constructor(private kanbanService: KanbanService,
    private router: Router) { }

  ngOnInit(): void {
  }

  async login() {
    const token = await this.kanbanService.login(this.loginForm.value);
    if (token) {
      localStorage.setItem('ada_usr_tkn', token);
      this.router.navigate(['/home']);
    } else alert('Credenciais inválidas');
  }

}
