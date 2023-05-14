import { HttpClient } from '@angular/common/http';
import {Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable ({
    providedIn: 'root'
})
export class ApiService{
    private baseUrl:string = 'http://Localhost:3000/enquiry'
    constructor( private http:HttpClient){ }

    postRegister(registerObj : User){
        return this.http.post<User>(`${this.baseUrl} `,registerObj)
    }


    getRegisterUser(){
        return this.http.get<User[]>(`${this.baseUrl}`)   
    }
    updateUser(id:number , registerObj : User){
        return this.http.put<User>(`${this.baseUrl}/${id}`, registerObj)   
    }
    deleteUser(id:number){
        return this.http.delete<User>(`${this.baseUrl}/${id}`)   
    }

    getUserId(id:number){
        return this.http.get<User>(`${this.baseUrl}/${id}`)   
    }
    

}
