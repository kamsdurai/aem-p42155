package com.etisalat.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.etisalat.core.util.CommonUtility;

@Model(adaptables = Resource.class)
public class LinkModel {

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String linkText;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String linkUrl;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String linkUrlActive;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String altText;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String title;

  @ValueMapValue(name = "fileReference", injectionStrategy = InjectionStrategy.OPTIONAL)
  private String imgUrl;
  
  @ChildResource(name = "image", injectionStrategy = InjectionStrategy.OPTIONAL)
  private Resource imageResource;
  
  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String linkBehavior;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String enableIcon;

  @SlingObject
  private ResourceResolver resourceResolver;
  
  public String getLinkText() {
    return linkText;
  }

  public void setLinkText(String linkText) {
    this.linkText = linkText;
  }

  public String getLinkUrl() {
    return CommonUtility.appendHtmlExtensionToPage(resourceResolver, linkUrl);
  }

  public String getLinkUrlActive() {
    return linkUrlActive;
  }

  public void setLinkUrl(String linkUrl) {
    this.linkUrl = linkUrl;
  }


  public void setLinkUrlActive(String linkUrlActive) {
    this.linkUrlActive = linkUrlActive;
  }

  public String getAltText() {
    return altText;
  }

  public void setAltText(String altText) {
    this.altText = altText;
  }

  public String getImgUrl() {
    return imgUrl;
  }

  public void setImgUrl(String imgUrl) {
    this.imgUrl = imgUrl;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }
  
  public Resource getImageResource() {
	return imageResource;
  }

  public void setImageResource(Resource imageResource) {
	this.imageResource = imageResource;
  }

  public String getLinkBehavior() {
	return linkBehavior;
  }

  public void setLinkBehavior(String linkBehavior) {
	this.linkBehavior = linkBehavior;
  }

  public String getEnableIcon() {
    return enableIcon;
  }

  public void setEnableIcon(String enableIcon) {
    this.enableIcon = enableIcon;
  }
}
