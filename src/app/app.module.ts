import { BrowserModule } from '@angular/platform-browser';
import { NgModule , NO_ERRORS_SCHEMA , CUSTOM_ELEMENTS_SCHEMA, } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ToastrModule } from 'ng6-toastr-notifications';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxLoadingModule } from 'ngx-loading';
import { Ng5SliderModule } from 'ng5-slider';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
//import { AgmCoreModule } from '@agm/core';
import { ImageCropperModule } from 'ngx-image-cropper';

import { DataService } from  './Services/data.service';
import { EllipsisPipe } from './Services/ellipsis.pipe';
import { VimeoUrlPipe } from './Services/vimeo-url.pipe';
import { AuthGuard } from './Services/auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { HeaderComponent } from './Components/header/header.component';
import { InnerHeaderComponent } from './Components/inner-header/inner-header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { InnerFooterComponent } from './Components/inner-footer/inner-footer.component';
import { SubHeaderComponent } from './Components/sub-header/sub-header.component';
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
import { MyprofileComponent } from './Onboard/myprofile/myprofile.component';
import { StaffMyAppointmentBookingDetailComponent } from './Pages/staff-my-appointment-booking-detail/staff-my-appointment-booking-detail.component';
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
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { NewsFeedComponent } from './StaticPages/news-feed/news-feed.component';
import { NewsFeedDetailsComponent } from './StaticPages/news-feed-details/news-feed-details.component';
import { ConsentFormComponent } from './Onboard/consent-form/consent-form.component';
import { TrackingMealComponent } from './Pages/tracking-meal/tracking-meal.component';
import { VideoPageComponent } from './Pages/video-page/video-page.component';
import { UploadVideoComponent } from './Pages/upload-video/upload-video.component';
import { StudioMembershipPlanComponent } from './Pages/studio-membership-plan/studio-membership-plan.component';
import { TrackinMealAddnewComponent } from './Pages/trackin-meal-addnew/trackin-meal-addnew.component';
import { MyWorkoutComponent } from './Pages/my-workout/my-workout.component';
import { MyNutritionComponent } from './Pages/my-nutrition/my-nutrition.component';
import { MyNutritionDetailComponent } from './Pages/my-nutrition-detail/my-nutrition-detail.component';
import { MyNutritionDescriptionComponent } from './Pages/my-nutrition-description/my-nutrition-description.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopBarComponent } from './Components/top-bar/top-bar.component';
import { SolutionV2Component } from './StaticPages/solution/solution-v2.component';
import { SolutionDetailComponent } from './StaticPages/solution/solution-detail/solution-detail.component';
 
const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};

@NgModule({
  declarations: [
    AppComponent,
    EllipsisPipe,
    VimeoUrlPipe,
    AboutUsComponent,
    AppsComponent,
    DemoComponent,
    FaqComponent,
    HelpComponent,
    HomeComponent,
    PricingComponent,
    PrivacyPolicyComponent,
    SolutionComponent,
    SolutionV2Component,
    TermsConditionComponent,
    HeaderComponent,
    InnerHeaderComponent,
    FooterComponent,
    InnerFooterComponent,
    SubHeaderComponent,
    LoginComponent,
    ProfileComponent,
    ClientLoginComponent,
    ClientRegistrationComponent,
    ClientOtherDetailComponent,
    ClientVerificationComponent,
    ClientForgotComponent,
    StaffForgotComponent,
    StaffVerificationComponent,
    StaffOtherDetailComponent,
    StaffRegistrationComponent,
    StaffLoginComponent,
    CartComponent,
    FamilyComponent,
    PaymentComponent,
    PrefrenceComponent,
    ProductDetailComponent,
    ProductPurchaseComponent,
    ProductAllComponent,
    InstructorDetailComponent,
    InstructorAllComponent,
    ClientAllComponent,
    ClientDetailComponent,
    FavouriteComponent,
    DashboardComponent,
    DashboardDetailComponent,
    SearchResultComponent,
    StudioComponent,
    StudioAllComponent,
    StudioDetailComponent,
    PassDetailComponent,
    ClientClassesComponent,
    ClientClassesDetailComponent,
    ClientServicesDetailComponent,
    ClientServicesComponent,
    StaffClassesDetailComponent,
    StaffClassesComponent,
    StaffAvailabilityComponent,
    StaffAppointmentComponent,
    StaffMyAppointmentComponent,
    StaffMyAppointmentScheduleComponent,
    ClientMyWaitlistComponent,
    ClientMyPurchaseComponent,
    ClientMyAttendanceComponent,
    ClientViewComponent,
    MyScheduleComponent,
    MyScheduleClassComponent,
    MyScheduleAppointmantComponent,
    MyScheduleAppointmentCancleComponent,
    StaffMyAppointmentCancleComponent,
    StaffMyAppointmentBookingComponent,
    StaffMyAppointmentPaymentComponent,
    MyprofileComponent,
    StaffMyAppointmentBookingDetailComponent,
    ClientPurchaseServiceComponent,
    ClientPurchaseServiceDetailComponent,
    MyScheduleDetailComponent,
    MySchduleAppointmentDetailComponent,
    PassDetailsComponent,
    StaffClientSearchComponent,
    CustomerDetailViewComponent,
    CustomerProfileComponent,
    StaffProductDetailComponent,
    StaffCartComponent,
    MyTransactionComponent,
    ClientMyAppointmentComponent,
    ClientWorkshopDetailComponent,
    ClientMyWorkshopComponent,
    StaffShiftComponent,
    WizardComponent,
    NewsFeedComponent,
    NewsFeedDetailsComponent,
    ConsentFormComponent,
    TrackingMealComponent,
    VideoPageComponent,
    UploadVideoComponent,
    StudioMembershipPlanComponent,
    TrackinMealAddnewComponent,
    MyWorkoutComponent,
    MyNutritionComponent,
    MyNutritionDetailComponent,
    MyNutritionDescriptionComponent,
    TopBarComponent,
    SolutionDetailComponent],

  imports: [
    NgWizardModule.forRoot(ngWizardConfig),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CarouselModule,
    GooglePlaceModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    FormsModule,
    InfiniteScrollModule,
    Ng5SliderModule,
    ToastrModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    NgMultiSelectDropDownModule.forRoot(),
    ImageCropperModule,
    SlickCarouselModule,
    AutocompleteLibModule,
    NgbModule
   // AgmCoreModule.forRoot()
  
  ],
  schemas: [  CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA,],
  providers: [AuthGuard,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

