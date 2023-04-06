import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './Services/auth.guard';


import { AboutUsComponent } from './StaticPages/about-us/about-us.component';
import { AppsComponent } from './StaticPages/apps/apps.component';
import { DemoComponent } from './StaticPages/demo/demo.component';
import { FaqComponent } from './StaticPages/faq/faq.component';
import { HelpComponent } from './StaticPages/help/help.component';
import { HomeComponent } from './StaticPages/home/home.component';
import { PricingComponent } from './StaticPages/pricing/pricing.component';
import { PrivacyPolicyComponent } from './StaticPages/privacy-policy/privacy-policy.component';
import { SolutionComponent } from './StaticPages/solution/solution.component';
import { TermsConditionComponent } from './StaticPages/terms-condition/terms-condition.component';
import { LoginComponent } from './Onboard/login/login.component';
import { ProfileComponent } from './Onboard/profile/profile.component';
import { ClientLoginComponent } from './Onboard/client-login/client-login.component';
import { ClientRegistrationComponent } from './Onboard/client-registration/client-registration.component';
import { ClientOtherDetailComponent } from './Onboard/client-other-detail/client-other-detail.component';
import { ClientVerificationComponent } from './Onboard/client-verification/client-verification.component';
import { ClientForgotComponent } from './Onboard/client-forgot/client-forgot.component';
import { StaffForgotComponent } from './Onboard/staff-forgot/staff-forgot.component';
import { StaffVerificationComponent } from './Onboard/staff-verification/staff-verification.component';
import { StaffOtherDetailComponent } from './Onboard/staff-other-detail/staff-other-detail.component';
import { StaffRegistrationComponent } from './Onboard/staff-registration/staff-registration.component';
import { StaffLoginComponent } from './Onboard/staff-login/staff-login.component';
import { CartComponent } from './Pages/cart/cart.component';
import { FamilyComponent } from './Pages/family/family.component';
import { PaymentComponent } from './Pages/payment/payment.component';
import { PrefrenceComponent } from './Pages/prefrence/prefrence.component';
import { ProductDetailComponent } from './Pages/product-detail/product-detail.component';
import { ProductPurchaseComponent } from './Pages/product-purchase/product-purchase.component';
import { ProductAllComponent } from './Pages/product-all/product-all.component';
import { InstructorDetailComponent } from './Pages/instructor-detail/instructor-detail.component';
import { InstructorAllComponent } from './Pages/instructor-all/instructor-all.component';
import { ClientAllComponent } from './Pages/client-all/client-all.component';
import { ClientDetailComponent } from './Pages/client-detail/client-detail.component';
import { FavouriteComponent } from './Pages/favourite/favourite.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { DashboardDetailComponent } from './Pages/dashboard-detail/dashboard-detail.component';
import { SearchResultComponent } from './Pages/search-result/search-result.component';
import { TrackingMealComponent } from './Pages/tracking-meal/tracking-meal.component';
import { VideoPageComponent } from './Pages/video-page/video-page.component';
import { UploadVideoComponent } from './Pages/upload-video/upload-video.component';
import { StudioMembershipPlanComponent } from './Pages/studio-membership-plan/studio-membership-plan.component';

import { StudioComponent } from './Pages/studio/studio.component';
import { StudioAllComponent } from './Pages/studio-all/studio-all.component';
import { StudioDetailComponent } from './Pages/studio-detail/studio-detail.component';
import { PassDetailComponent } from './Pages/pass-detail/pass-detail.component';
import { ClientClassesComponent } from './Pages/client-classes/client-classes.component';
import { ClientClassesDetailComponent } from './Pages/client-classes-detail/client-classes-detail.component';
import { ClientServicesDetailComponent } from './Pages/client-services-detail/client-services-detail.component';
import { ClientServicesComponent } from './Pages/client-services/client-services.component';
import { StaffClassesDetailComponent } from './Pages/staff-classes-detail/staff-classes-detail.component';
import { StaffClassesComponent } from './Pages/staff-classes/staff-classes.component';
import { StaffAvailabilityComponent } from './Pages/staff-availability/staff-availability.component';
import { StaffAppointmentComponent } from './Pages/staff-appointment/staff-appointment.component';
import { StaffMyAppointmentComponent } from './Pages/staff-my-appointment/staff-my-appointment.component';
import { StaffMyAppointmentScheduleComponent } from './Pages/staff-my-appointment-schedule/staff-my-appointment-schedule.component';
import { ClientMyWaitlistComponent } from './Pages/client-my-waitlist/client-my-waitlist.component';
import { ClientMyPurchaseComponent } from './Pages/client-my-purchase/client-my-purchase.component';
import { ClientMyAttendanceComponent } from './Pages/client-my-attendance/client-my-attendance.component';
import { ClientViewComponent } from './Pages/client-view/client-view.component';
import { MyScheduleComponent } from './Pages/my-schedule/my-schedule.component';
import { MyScheduleClassComponent } from './Pages/my-schedule-class/my-schedule-class.component';
import { MyScheduleAppointmantComponent } from './Pages/my-schedule-appointmant/my-schedule-appointmant.component';
import { MyScheduleAppointmentCancleComponent } from './Pages/my-schedule-appointment-cancle/my-schedule-appointment-cancle.component';
import { StaffMyAppointmentCancleComponent } from './Pages/staff-my-appointment-cancle/staff-my-appointment-cancle.component';
import { StaffMyAppointmentBookingComponent } from './Pages/staff-my-appointment-booking/staff-my-appointment-booking.component';
import { StaffMyAppointmentPaymentComponent } from './Pages/staff-my-appointment-payment/staff-my-appointment-payment.component';
import { StaffMyAppointmentBookingDetailComponent } from './Pages/staff-my-appointment-booking-detail/staff-my-appointment-booking-detail.component';
import { MyprofileComponent } from './Onboard/myprofile/myprofile.component';
import { ClientPurchaseServiceComponent } from './Pages/client-purchase-service/client-purchase-service.component';
import { ClientPurchaseServiceDetailComponent } from './Pages/client-purchase-service-detail/client-purchase-service-detail.component';
import { MyScheduleDetailComponent } from './Pages/my-schedule-detail/my-schedule-detail.component';
import { MySchduleAppointmentDetailComponent } from './Pages/my-schdule-appointment-detail/my-schdule-appointment-detail.component';
import { PassDetailsComponent } from './Pages/pass-details/pass-details.component';
import { StaffClientSearchComponent } from './Pages/staff-client-search/staff-client-search.component';
import { CustomerDetailViewComponent } from './Pages/customer-detail-view/customer-detail-view.component';
import { CustomerProfileComponent } from './Pages/customer-profile/customer-profile.component';
import { StaffProductDetailComponent } from './Pages/staff-product-detail/staff-product-detail.component';
import { StaffCartComponent } from './Pages/staff-cart/staff-cart.component';
import { MyTransactionComponent } from './Pages/my-transaction/my-transaction.component';
import { ClientMyAppointmentComponent } from './Pages/client-my-appointment/client-my-appointment.component';
import { ClientWorkshopDetailComponent } from './Pages/client-workshop-detail/client-workshop-detail.component';
import { ClientMyWorkshopComponent } from './Pages/client-my-workshop/client-my-workshop.component';
import { StaffShiftComponent } from './Pages/staff-shift/staff-shift.component';
import { WizardComponent } from './wizard/wizard.component';
import { NewsFeedComponent } from './StaticPages/news-feed/news-feed.component';
import { NewsFeedDetailsComponent } from './StaticPages/news-feed-details/news-feed-details.component';
import { ConsentFormComponent } from './Onboard/consent-form/consent-form.component';
import { TrackinMealAddnewComponent } from './Pages/trackin-meal-addnew/trackin-meal-addnew.component';
import { MyWorkoutComponent } from './Pages/my-workout/my-workout.component';
import { MyNutritionComponent } from './Pages/my-nutrition/my-nutrition.component';
import { MyNutritionDetailComponent } from './Pages/my-nutrition-detail/my-nutrition-detail.component';
import { MyNutritionDescriptionComponent } from './Pages/my-nutrition-description/my-nutrition-description.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'Home', component: HomeComponent},
  { path: 'about-us', component: AboutUsComponent },
  { path: 'consent-form', component: WizardComponent, canActivate: [AuthGuard] },
  { path: 'consentform', component: ConsentFormComponent },

  { path: 'news-feed', component: NewsFeedComponent },
  { path: 'news-feed-details', component: NewsFeedDetailsComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'help', component: HelpComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-conditions', component: TermsConditionComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'apps', component: AppsComponent },

  { path: 'solution', component: SolutionComponent },
  { path: 'contact-us', component: HelpComponent },
  { path: 'demo', component: DemoComponent },
  { path: 'login', component: LoginComponent},

  { path: 'staff-registration', component: StaffRegistrationComponent},
  { path: 'staff-otherdetail', component: StaffOtherDetailComponent },
  { path: 'staff-verification', component: StaffVerificationComponent },
  { path: 'staff-signin', component: StaffLoginComponent},
  { path: 'staff-forgot', component: StaffForgotComponent},

  { path: 'verification', component: ClientVerificationComponent },
  { path: 'otherdetail', component: ClientOtherDetailComponent },
  { path: 'registration', component: ClientRegistrationComponent },
  { path: 'signin', component: ClientLoginComponent },
  { path: 'forgot', component: ClientForgotComponent },

  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'Profile',component:ProfileComponent , canActivate: [AuthGuard]},
  // { path: 'profiles', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'my-profile', component: MyprofileComponent, canActivate: [AuthGuard] },
  { path: 'my-Profile',component:MyprofileComponent , canActivate: [AuthGuard]},
  { path: 'customer-profile', component: CustomerProfileComponent, canActivate: [AuthGuard] },

  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'detail', component: DashboardDetailComponent, canActivate: [AuthGuard] },
  { path: 'staff', component: InstructorAllComponent, canActivate: [AuthGuard] },

  { path: 'search', component: SearchResultComponent, canActivate: [AuthGuard] },

  { path: 'product', component: ProductDetailComponent, canActivate: [AuthGuard] },
  { path: 'allproduct', component: ProductAllComponent, canActivate: [AuthGuard] },
  { path: 'product-buy', component: ProductPurchaseComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
// { path: 'staff-detail',component:InstructorDetailComponent , canActivate: [AuthGuard]},
  { path: 'instructor-detail', component: InstructorDetailComponent, canActivate: [AuthGuard] },

  { path: 'client', component: ClientAllComponent, canActivate: [AuthGuard] },
  { path: 'client-detail', component: ClientDetailComponent, canActivate: [AuthGuard] },
  { path: 'myfavorites', component: FavouriteComponent, canActivate: [AuthGuard] },

  { path: 'family', component: FamilyComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'preference', component: PrefrenceComponent, canActivate: [AuthGuard] },


  { path: 'services-offered', component: ClientServicesDetailComponent, canActivate: [AuthGuard] },
  { path: 'allStudio', component: StudioAllComponent, canActivate: [AuthGuard] },
  { path: 'classess', component: StaffClassesComponent, canActivate: [AuthGuard] },
  { path: 'class-detail', component: StaffClassesDetailComponent, canActivate: [AuthGuard] },
  { path: 'workshopss', component: StaffClassesComponent, canActivate: [AuthGuard] },
// { path: 'workshop-detail',component:StaffClassesDetailComponent , canActivate: [AuthGuard]},

  { path: 'classes', component: ClientClassesComponent, canActivate: [AuthGuard] },
  { path: 'workshops', component: ClientClassesComponent, canActivate: [AuthGuard] },
  { path: 'services', component: ClientServicesComponent, canActivate: [AuthGuard] },
  { path: 'availability', component: StaffAvailabilityComponent, canActivate: [AuthGuard] },
  { path: 'studio', component: StudioComponent, canActivate: [AuthGuard] },
  { path: 'studio-detail', component: StudioDetailComponent, canActivate: [AuthGuard] },

  { path: 'classes-detail', component: ClientClassesDetailComponent, canActivate: [AuthGuard] },
// { path: 'workshops-detail',component:ClientClassesDetailComponent , canActivate: [AuthGuard]},

  { path: 'workshops-detail', component: ClientWorkshopDetailComponent, canActivate: [AuthGuard] },
  { path: 'workshop-detail', component: ClientWorkshopDetailComponent, canActivate: [AuthGuard] },

  { path: 'pass-detail', component: PassDetailComponent, canActivate: [AuthGuard] },
  { path: 'passes-detail', component: PassDetailComponent, canActivate: [AuthGuard] },
  { path: 'my-shift', component: StaffShiftComponent, canActivate: [AuthGuard] },

  { path: 'appointment', component: StaffAppointmentComponent, canActivate: [AuthGuard] },
  { path: 'my-appointment', component: StaffAppointmentComponent, canActivate: [AuthGuard] },

  { path: 'my-attendance', component: ClientMyAttendanceComponent, canActivate: [AuthGuard] },
  { path: 'my-purchase', component: ClientMyPurchaseComponent, canActivate: [AuthGuard] },
  { path: 'my-waitlist', component: ClientMyWaitlistComponent, canActivate: [AuthGuard] },
  { path: 'my-classlist', component: ClientMyWaitlistComponent, canActivate: [AuthGuard] },
//{ path: 'my-workshop',component:ClientMyWaitlistComponent , canActivate: [AuthGuard]},
  { path: 'my-workshop', component: ClientMyWorkshopComponent, canActivate: [AuthGuard] },

  { path: 'clientview', component: ClientViewComponent, canActivate: [AuthGuard] },
  { path: 'client-view', component: ClientViewComponent, canActivate: [AuthGuard] },

  { path: 'schedule-appointment', component: StaffMyAppointmentScheduleComponent, canActivate: [AuthGuard] },
// { path: 'my-appointment',component:StaffMyAppointmentComponent , canActivate: [AuthGuard]},

  { path: 'my-schedule',component:MyScheduleComponent , canActivate: [AuthGuard]},
  { path: 'my-schedule-class',component:MyScheduleClassComponent , canActivate: [AuthGuard]},
  { path: 'my-schedule-workshop',component:MyScheduleClassComponent , canActivate: [AuthGuard]},
  { path: 'my-schedule-appointment',component:MyScheduleClassComponent , canActivate: [AuthGuard]},
  { path: 'my-schedule-appointments',component:MyScheduleAppointmantComponent , canActivate: [AuthGuard]},
  { path: 'my-schedule-appointment-detail',component:MySchduleAppointmentDetailComponent, canActivate: [AuthGuard]},

  { path: 'booking-detail',component:StaffMyAppointmentBookingDetailComponent , canActivate: [AuthGuard]},
  { path: 'cancel-appointment',component:StaffMyAppointmentCancleComponent , canActivate: [AuthGuard]},
  { path: 'book-appointment',component:StaffMyAppointmentBookingComponent , canActivate: [AuthGuard]},
  { path: 'booking-payment',component:StaffMyAppointmentPaymentComponent , canActivate: [AuthGuard]},
  { path: 'purchased-service',component:ClientPurchaseServiceComponent, canActivate: [AuthGuard]},
  { path: 'purchased-service-detail',component:ClientPurchaseServiceDetailComponent, canActivate: [AuthGuard]},
  { path: 'my-schedule-detail',component:MyScheduleDetailComponent, canActivate: [AuthGuard]},
  { path: 'client-search',component:StaffClientSearchComponent, canActivate: [AuthGuard]},
  { path: 'customer-detail',component:CustomerDetailViewComponent, canActivate: [AuthGuard]},
  { path: 'product-detail',component:StaffProductDetailComponent, canActivate: [AuthGuard]},
  { path: 'customer-cart',component:StaffCartComponent, canActivate: [AuthGuard]},

  { path: 'my-transaction',component:MyTransactionComponent, canActivate: [AuthGuard]},
  { path: 'my-payout',component:MyTransactionComponent, canActivate: [AuthGuard]},
  { path: 'appointments',component:ClientMyAppointmentComponent, canActivate: [AuthGuard]},
  { path: 'tracking-meal', component: TrackingMealComponent , canActivate: [AuthGuard]},
  { path: 'videos', component: VideoPageComponent , canActivate: [AuthGuard]},
  { path: 'my-videos', component: VideoPageComponent , canActivate: [AuthGuard]},
  { path: 'workout-detail', component: VideoPageComponent , canActivate: [AuthGuard]},
  { path: 'my-library-detail', component: VideoPageComponent , canActivate: [AuthGuard]},
  { path: 'upload-video', component: UploadVideoComponent , canActivate: [AuthGuard]},
  { path: 'workout-video-upload', component: UploadVideoComponent , canActivate: [AuthGuard]},
  { path: 'studio-membership-plan', component: StudioMembershipPlanComponent , canActivate: [AuthGuard]},
  { path: 'add-diet',component:TrackinMealAddnewComponent , canActivate: [AuthGuard]},
  { path: 'update-diet',component:TrackinMealAddnewComponent , canActivate: [AuthGuard]},
  { path: 'my-library',component:MyWorkoutComponent , canActivate: [AuthGuard]},
  { path: 'workout',component:MyWorkoutComponent , canActivate: [AuthGuard]},
  { path: 'my-nutrition',component:MyNutritionComponent, canActivate: [AuthGuard]},
  { path: 'nutrition',component:MyNutritionComponent, canActivate: [AuthGuard]},
  { path: 'my-nutrition-detail',component:MyNutritionDetailComponent, canActivate: [AuthGuard]},
  { path: 'nutrition-detail',component:MyNutritionDetailComponent, canActivate: [AuthGuard]},
  { path: 'nutrition-description',component:MyNutritionDescriptionComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
