package com.etisalat.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.etisalat.core.util.CommonUtility;

@Model(adaptables = {Resource.class,
    SlingHttpServletRequest.class})
public class FixedNavigtaionMultifieldModel {

  @SlingObject
  private ResourceResolver resourceResolver;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String navigationTitle;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String navigationLink;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String navigationDesc;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String navigationImage;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String active;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  @Default(values = "false")
  private String hideDesktopLink;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  @Default(values = "false")
  private String openmodalwindow;

  private Resource topNavigationXFResource;

  public void setNavigationTitle(String navigationTitle) {
    this.navigationTitle = navigationTitle;
  }

  public void setNavigationLink(String navigationLink) {
    this.navigationLink = navigationLink;
  }

  public String getNavigationTitle() {
    return navigationTitle;
  }

  public String getNavigationLink() {
    return CommonUtility.appendHtmlExtensionToPage(resourceResolver, navigationLink);
  }

  /**
   * @return the navigationDesc
   */
  public String getNavigationDesc() {
    return navigationDesc;
  }

  /**
   * @param navigationDesc the navigationDesc to set
   */
  public void setNavigationDesc(String navigationDesc) {
    this.navigationDesc = navigationDesc;
  }

  /**
   * @return the active
   */
  public String getActive() {
    return active;
  }

  /**
   * @param active the active to set
   */
  public void setActive(String active) {
    this.active = active;
  }

  /**
   * @return the navigationImage
   */
  public String getNavigationImage() {
    return navigationImage;
  }

  /**
   * @param navigationImage the navigationImage to set
   */
  public void setNavigationImage(String navigationImage) {
    this.navigationImage = navigationImage;
  }

  /**
   * @return the hideDesktopLink
   */
  public String getHideDesktopLink() {
    return hideDesktopLink;
  }

  /**
   * @param hideDesktopLink the hideDesktopLink to set
   */
  public void setHideDesktopLink(String hideDesktopLink) {
    this.hideDesktopLink = hideDesktopLink;
  }

  /**
   * @return the openmodalwindow
   */
  public String getOpenmodalwindow() {
    return openmodalwindow;
  }

  /**
   * @return the topNavigationXFResource
   */
  public Resource getTopNavigationXFResource() {
    return topNavigationXFResource;
  }

  /**
   * @param openmodalwindow the openmodalwindow to set
   */
  public void setOpenmodalwindow(String openmodalwindow) {
    this.openmodalwindow = openmodalwindow;
  }

  /**
   * @param topNavigationXFResource the topNavigationXFResource to set
   */
  public void setTopNavigationXFResource(Resource topNavigationXFResource) {
    this.topNavigationXFResource = topNavigationXFResource;
  }

}
