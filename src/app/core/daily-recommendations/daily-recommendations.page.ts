import {
  Component,
  OnInit,
  ElementRef,
  QueryList,
  ViewChildren,
  Renderer2, OnDestroy,
} from '@angular/core';
import { IonCard, GestureController, Platform, AnimationController } from '@ionic/angular';
import {CoreService} from "../services/core.service";
import {ToastService} from "../services/toast.service";
import {Profiles} from "../services/core.model";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-daily-recommendations',
  templateUrl: './daily-recommendations.page.html',
  styleUrls: ['./daily-recommendations.page.scss'],
})
export class DailyRecommendationsPage implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<void> = new Subject<void>();
  profiles: Profiles[] = [];
  @ViewChildren(IonCard, { read: ElementRef }) cards: QueryList<ElementRef> | null | undefined;
  public gestureX: any;
  public gestureY: any;

  private unlistener: (() => void) | undefined;

  constructor(
    private coreService: CoreService,
    private gestureCtrl: GestureController,
    private toastService: ToastService,
    private platform: Platform,
    private renderer2: Renderer2,
    private animationCtrl: AnimationController,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.getProfileData();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  private getProfileData(): void {
    this.profiles = this.coreService.getProfileData();
  }

  ionViewDidEnter(): void {
    // @ts-ignore
    const cardArray = this.cards.toArray();
    this.useSwiperGesture(cardArray);
  }

  private useSwiperGesture(cardArray: any): void {
    cardArray.forEach((data: ElementRef) => {
      const card = data;
      this.gestureX = this.gestureCtrl.create({
        direction: 'x',
        el: card.nativeElement,
        threshold: 15,
        gestureName: 'swipte',
        onStart: (ev) => {
          console.log(ev);
        },
        onMove: (ev) => {
          console.log(ev.deltaX);
          card.nativeElement.style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 10}deg)`;
        },
        onEnd: (ev) => {
          card.nativeElement.style.transition = '.5s ease-out';
          //Right side Move
          if (ev.deltaX > 150) {
            card.nativeElement.style.transform = `translateX(${+this.platform.width() * 2
              }px) rotate(${ev.deltaX / 2}deg)`;
            this.toastService.successToast('Interested');
          }
          // Left Side Move
          else if (ev.deltaX < -150) {
            card.nativeElement.style.transform = `translateX(-${+this.platform.width() * 2
              }px) rotate(${ev.deltaX / 2}deg)`;
            this.toastService.errorToast('Not Interested');
          }
          // When No move or if small move back to original
          else {
            card.nativeElement.style.transform = '';
          }
        },
      });
      this.gestureY = this.gestureCtrl.create({
        direction: 'y',
        el: card.nativeElement,
        threshold: 15,
        gestureName: 'swipte',
        onStart: (ev) => {
          console.log(ev);
        },
        onMove: (ev) => {
          ;
          card.nativeElement.style.transform = `translateY(${ev.deltaY}px) rotate(${ev.deltaY / 10}deg)`;
        },
        onEnd: (ev) => {
          card.nativeElement.style.transition = '.5s ease-out';
          if (ev.deltaY < 0) {
            card.nativeElement.style.transform = `translateY(-${+this.platform.width() * 2
              }px) rotate(${ev.deltaY / 2}deg)`;
            this.toastService.successToast('Shortlisted');
          }
          else {
            card.nativeElement.style.transform = '';
          }
        },
      });
      this.gestureY.enable(true);
      this.gestureX.enable(true);

      this.unlistener = this.renderer2.listen(card.nativeElement.querySelector('.shortListed'), 'click', ev => {
        const animation = this.animationCtrl
          .create()
          .addElement(card.nativeElement)
          .duration(1500)
          .fromTo('transform', `rotate(50deg)`, `translateY(-${+this.platform.width() * 2}px)`);
        animation.play();
        this.shortListed();
      });

      this.unlistener = this.renderer2.listen(card.nativeElement.querySelector('.profileStatusTrue'), 'click', ev => {
        const animation = this.animationCtrl
          .create()
          .addElement(card.nativeElement)
          .duration(1500)
          .from('transform', `rotate(40deg)`)
          .to('transform', `translateX(${+this.platform.width() * 2}px)`);
        animation.play();
        this.profileStatus(true);
      });

      this.unlistener = this.renderer2.listen(card.nativeElement.querySelector('.profileStatusFalse'), 'click', ev => {
        const animation = this.animationCtrl
          .create()
          .addElement(card.nativeElement)
          .duration(1500)
          .from('transform', `rotate(40deg)`)
          .to('transform', `translateX(-${+this.platform.width() * 2}px)`);
        animation.play();
        this.profileStatus(false);
      });
    });
  }

  private shortListed(): void {
    this.toastService.successToast('Shortlisted');
  }

  public profileStatus(status: boolean): void {
    if (status) {
      this.toastService.successToast('Interested');
    } else {
      this.toastService.errorToast('Not Interested');
    }
  }

  public backButtonClick(): void {
    this.router.navigate(['/my-matches']);
  }

}
