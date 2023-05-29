import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class FormDataSevice {

  constructor(private http: HttpClient) {

  }

  // public getEmployees(fileNamePost: string, input: any): string {
  //   const formData = new FormData();
  //   if (input.files && input.files.length > 0) {
  //     const file = input.files[0];
  //     formData.append('uploaded_file', file)
  //     this.http.post('http://127.0.0.1:8000/upload', formData)
  //       .subscribe(
  //         (response: any) => fileNamePost = response.file_name
  //     );
  //   }

  //   return fileNamePost;
  // }
}
