package com.etisalat.core.services.impl;

import com.etisalat.core.constants.AEConstants;
import org.apache.commons.lang3.StringUtils;
import org.apache.jackrabbit.oak.commons.PropertiesUtil;
import org.osgi.service.cm.ConfigurationAdmin;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;

import com.etisalat.core.services.GoogleMapsService;
import com.etisalat.core.services.GoogleMapsConfiguration;

@Component(service = GoogleMapsService.class, immediate = true)
@Designate(ocd = GoogleMapsConfiguration.class)

public class GoogleMapsServiceImpl implements GoogleMapsService {

  @Reference
  private ConfigurationAdmin configAdmin;

  private String url;
  private String key;
  private String contactMap;

  private String captchaV2HiuAppKey;
  private String captchaV2EwalletAppKey;
  private String captchaV2EtisalatAppKey;
  private String captchaV3;
  private String captchaInvisibleEtisalatAppkey;


  @Activate
  @Modified
  protected void activate(final GoogleMapsConfiguration config) {
    this.url = PropertiesUtil.toString(config.getGoogleUrl(), AEConstants.NO_CONFIG_FOUND);
    this.key = PropertiesUtil.toString(config.getGoogleKey(), AEConstants.NO_CONFIG_FOUND);
    this.contactMap = PropertiesUtil.toString(config.getGoogleContactUsUrl(), AEConstants.NO_CONFIG_FOUND);
    this.captchaV2HiuAppKey = PropertiesUtil.toString(config.getGoogleCaptchaV2HiuAppKey(), StringUtils.EMPTY);
    this.captchaV2EwalletAppKey = PropertiesUtil.toString(config.getGoogleCaptchaV2EwalletAppKey(), StringUtils.EMPTY);
    this.captchaV2EtisalatAppKey = PropertiesUtil.toString(config.getGoogleCaptchaV2EtisalatAppKey(), StringUtils.EMPTY);
    this.captchaV3 = PropertiesUtil.toString(config.getGoogleCaptchaV3(), StringUtils.EMPTY);
    this.captchaInvisibleEtisalatAppkey = PropertiesUtil
        .toString(config.getGoogleCaptchaInvisibleEtisalatAppKey(), StringUtils.EMPTY);
  }


  @Override
  public String getGoogleUrl() {
    return this.url;
  }

  @Override
  public String getGoogleKey() {
    return this.key;
  }

  @Override
  public String getGoogleContactUsUrl() {
    return this.contactMap;
  }

  
  @Override
  public String getCaptchaV2HiuAppKey() {
    return this.captchaV2HiuAppKey;
  }
  
  
  @Override
  public String getCaptchaV2EwalletAppKey() {
    return this.captchaV2EwalletAppKey;
  }
  
  @Override
  public String getCaptchaV2EtisalatAppKey() {
    return this.captchaV2EtisalatAppKey;
  }

  @Override
  public String getCaptchaV3SiteKey() {
    return captchaV3;
  }

  @Override
  public String getCaptchaInvisibleEtisalatAppKey() {
    return captchaInvisibleEtisalatAppkey;
  }

}
