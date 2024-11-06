import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Profiles} from "./core.model";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient) {}

  private readonly profileUrl = 'assets/json/profiles.json';
  private readonly storageKey = 'PROFILES';

  public storeProfileData(): Observable<Profiles[]> {
    return this.http.get<Profiles[]>(this.profileUrl).pipe(
      map(data => {
        if (data) {
          localStorage.setItem(this.storageKey, JSON.stringify(data));
        }
        return data;
      })
    );
  }

  public getProfileData(): Profiles[] {
    const profileData: string | null = localStorage.getItem(this.storageKey);
    return profileData ? JSON.parse(profileData) : [];
  }
}
