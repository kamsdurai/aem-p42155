package com.etisalat.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.etisalat.core.util.CommonUtility;

@Model(adaptables = {Resource.class, SlingHttpServletRequest.class})
public class DigitalNotification {

  @SlingObject
  private ResourceResolver resourceResolver;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String titleLink;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String notificationCTALink;

  /**
   * @return the titleLink
   */
  public String getTitleLink() {
    return CommonUtility.appendHtmlExtensionToPage(resourceResolver, titleLink);
  }

  /**
   * @return the notificationCTALink
   */
  public String getNotificationCTALink() {
    return CommonUtility.appendHtmlExtensionToPage(resourceResolver, notificationCTALink);
  }

  /**
   * @param titleLink the titleLink to set
   */
  public void setTitleLink(String titleLink) {
    this.titleLink = titleLink;
  }

  /**
   * @param notificationCTALink the notificationCTALink to set
   */
  public void setNotificationCTALink(String notificationCTALink) {
    this.notificationCTALink = notificationCTALink;
  }

}
