package com.etisalat.core.models;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import com.etisalat.core.util.CommonUtility;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;
import com.etisalat.core.services.GoogleMapsService;
import com.etisalat.core.services.StoreLocatorService;

@Model(adaptables = {Resource.class, SlingHttpServletRequest.class})

public class GoogleMapsModel {

  private static final Logger LOG = LoggerFactory.getLogger(GoogleMapsModel.class);

  String url;
  String key;
  String storeLocatorUrl;
  String googleContactUrl;
  String hiuAppCaptchaV2;
  String ewalletAppCaptchaV2;
  String etisalatAppCaptchaV2;
  String captchaV3;
  String captchaInvisible;
  
  @ScriptVariable
  Page currentPage;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String mapViewTitle;

  @OSGiService
  GoogleMapsService googleService;

  @OSGiService
  StoreLocatorService storeService;

  @PostConstruct
  protected void init() {
    LOG.debug("In GoogleMapsModel init method");

    url = googleService.getGoogleUrl();
    key = googleService.getGoogleKey();
    hiuAppCaptchaV2 = googleService.getCaptchaV2HiuAppKey();
    ewalletAppCaptchaV2 = googleService.getCaptchaV2EwalletAppKey();
    etisalatAppCaptchaV2 = googleService.getCaptchaV2EtisalatAppKey();
    storeLocatorUrl = storeService.getStoreLocatorUrl();
    googleContactUrl = googleService.getGoogleContactUsUrl();
    this.captchaV3 = googleService.getCaptchaV3SiteKey();
    this.captchaInvisible = googleService.getCaptchaInvisibleEtisalatAppKey();
  }

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public String getKey() {
    return key;
  }

  public void setKey(String key) {
    this.key = key;
  }

  public String getStoreLocatorUrl() {
    return storeLocatorUrl;
  }

  public void setStoreLocatorUrl(String storeLocatorUrl) {
    this.storeLocatorUrl = storeLocatorUrl;
  }

  /**
   * @return the googleContactUrl
   */
  public String getGoogleContactUrl() {
    return googleContactUrl;
  }

  /**
   * @param googleContactUrl the googleContactUrl to set
   */
  public void setGoogleContactUrl(String googleContactUrl) {
    this.googleContactUrl = googleContactUrl;
  }

  /**
   * @return the captchaV2
   */
  public String getCaptchaV2() {	 
	  if(null != currentPage && CommonUtility.isHiuAppPage(currentPage)) {
		  return hiuAppCaptchaV2;
	  }
	  else if(null != currentPage && CommonUtility.isEwalletAppPage(currentPage)) {
		  return ewalletAppCaptchaV2;
	  }	
	  return etisalatAppCaptchaV2;
  }

  /**
   * @return the captchaV3
   */
  public String getCaptchaV3() {
    return captchaV3;
  }

  /**
   * @return the captchaInvisible
   */
  public String getCaptchaInvisible() {
    return captchaInvisible;
  }


}
