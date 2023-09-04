import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export function handleError(err: any) {
  console.log(err);
  let errorMessage: string;
  if (err instanceof HttpErrorResponse) {
    errorMessage = err.error || err.message;
  } else {
    errorMessage = 'Unexpected HTTP error occured';
  }
  return throwError(errorMessage);
}