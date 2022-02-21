package com.etisalat.core.services;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Store Locator Configuration", description = "Store Locator details")
public @interface StoreLocatorConfiguration {

  @AttributeDefinition(name = "store Locator url", description = "Store Locator Url")
  String getStoreLocatorUrl() default "https://uat-swypapp.etisalat.ae/DigitalApp/redirection/mwallet-project/api/help/stores/locations";

}
