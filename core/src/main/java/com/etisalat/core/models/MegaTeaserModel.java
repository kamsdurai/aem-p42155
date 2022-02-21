package com.etisalat.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.day.cq.commons.jcr.JcrConstants;

@Model(adaptables = Resource.class)
public class MegaTeaserModel {

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String pretitle;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL, name = JcrConstants.JCR_TITLE)
  private String title;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String fileReference;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String actionsEnabled;

  private String link;

  private String text;

  private String brandTitle;


  /**
   * @return the pretitle
   */
  public String getPretitle() {
    return pretitle;
  }

  /**
   * @return the title
   */
  public String getTitle() {
    return title;
  }

  /**
   * @return the fileReference
   */
  public String getFileReference() {
    return fileReference;
  }

  /**
   * @return the actionsEnabled
   */
  public String getActionsEnabled() {
    return actionsEnabled;
  }

  /**
   * @param pretitle the pretitle to set
   */
  public void setPretitle(String pretitle) {
    this.pretitle = pretitle;
  }

  /**
   * @param title the title to set
   */
  public void setTitle(String title) {
    this.title = title;
  }

  /**
   * @param fileReference the fileReference to set
   */
  public void setFileReference(String fileReference) {
    this.fileReference = fileReference;
  }

  /**
   * @param actionsEnabled the actionsEnabled to set
   */
  public void setActionsEnabled(String actionsEnabled) {
    this.actionsEnabled = actionsEnabled;
  }

  /**
   * @return the link
   */
  public String getLink() {
    return link;
  }

  /**
   * @return the text
   */
  public String getText() {
    return text;
  }

  /**
   * @param link the link to set
   */
  public void setLink(String link) {
    this.link = link;
  }

  /**
   * @param text the text to set
   */
  public void setText(String text) {
    this.text = text;
  }

  /**
   * @return the brandTitle
   */
  public String getBrandTitle() {
    return brandTitle;
  }

  /**
   * @param brandTitle the brandTitle to set
   */
  public void setBrandTitle(String brandTitle) {
    this.brandTitle = brandTitle;
  }


}
