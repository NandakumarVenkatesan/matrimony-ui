import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CoreService} from "../services/core.service";
import {ToastService} from "../services/toast.service";
import {Subject, takeUntil} from "rxjs";
import {Profiles} from "../services/core.model";

@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.page.html',
  styleUrls: ['./my-matches.page.scss'],
})
export class MyMatchesPage implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<void> = new Subject<void>();
  public profiles: Profiles[] = [];

  public sliderConfig = {
    centeredSlides: true
  };

  constructor(private coreService: CoreService,
              private toastService: ToastService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getProfileData();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  private getProfileData(): void {
    this.coreService.storeProfileData().pipe(takeUntil(this.unsubscribeAll))
      .subscribe(data => {
        this.profiles = [...data];
      }, error => {
        throw error;
      });
  }

  public interested(): void {
    this.toastService.successToast('Interested in this profile');
  }

  public notInterested(): void {
    this.toastService.errorToast('Not Interested in this profile');
  }

  public routeGestureScreen(): void {
    this.router.navigate(['/daily-recommendations']);
  }

  public backButtonClick(): void {
    this.router.navigate(['/my-matches']);
  }

}
