import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'lista-usuarios',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userService.getUsuarios().subscribe((response) => {
        console.info(response);
        this.users = response as User[];
      });
    });
  }

  cambioOrden(target: any){
    console.info(target.value);
  }
}
