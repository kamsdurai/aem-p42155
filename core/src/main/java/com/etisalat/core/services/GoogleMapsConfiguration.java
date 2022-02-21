package com.etisalat.core.services;


import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Google Map Integration Configuration", description = "Configurations details for Key and Url")
public @interface GoogleMapsConfiguration {

  @AttributeDefinition(name = "google url", description = "Google Map Url")
  String getGoogleUrl() default "https://maps.googleapis.com/maps/api/js?";

  @AttributeDefinition(name = "google key", description = "Google Map API Key")
  String getGoogleKey() default "AIzaSyASY1eVRut4PBG0wzPbbsg7qt2ujstMlyo&libraries=places,geometry";

  @AttributeDefinition(name = "google contactus url", description = "Google ContactUs Url")
  String getGoogleContactUsUrl() default "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.0980075175994!2d55.289940714485134!3d25.233623736415133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f42dd60070d09%3A0x7ff32a4002662be3!2sAl+Jafiliya+Station!5e0!3m2!1sen!2sae!4v1542885793417";

  @AttributeDefinition(name = "Ewallet google captcha v2", description = "Ewallet Google Captcha V2 site key")
  String getGoogleCaptchaV2EwalletAppKey();

  @AttributeDefinition(name = "Hiu App google captcha v2", description = "Hiu App Google Captcha V2 site key")
  String getGoogleCaptchaV2HiuAppKey();
  
  @AttributeDefinition(name = "Etisalat google captcha v2", description = "Etisalat Google Captcha V2 site key")
  String getGoogleCaptchaV2EtisalatAppKey();

  @AttributeDefinition(name = "google captcha v3", description = "Google Captcha V3 site key")
  String getGoogleCaptchaV3();

  @AttributeDefinition(name = "Etisalat google captcha invisible", description = "Etisalat Google Captcha Invisible site key")
  String getGoogleCaptchaInvisibleEtisalatAppKey();
}

