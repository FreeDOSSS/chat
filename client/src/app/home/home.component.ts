import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import params from './../../constants/params.js';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import isAuth from './../../api/isAuth.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  name = '';
  constructor(private router: Router) {}

  ngOnInit(): void {
    isAuth(this.router);
  }

  onInput({ target }) {
    this.name = target.value;
    console.log('this.name', this.name);
  }

  onSubmit(event: any) {
    event.preventDefault();

    axios
      .get(`${params.serverUrl}/auth?name=${this.name}`)
      .then(({ data }) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.name);
        this.router.navigate(['/chat']);
      })
      .catch((err) => console.log('err', err));
  }
}
