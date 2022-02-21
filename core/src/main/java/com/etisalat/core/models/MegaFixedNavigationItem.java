package com.etisalat.core.models;

import java.util.Collections;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class)
public class MegaFixedNavigationItem {

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String navTitle;

  @ChildResource(injectionStrategy = InjectionStrategy.OPTIONAL, name = "fixedItems")
  private List<FixedNavigtaionMultifieldModel> fixedItems = Collections.emptyList();

  private boolean isFeatureItemExist;

  private String title;

  private List<MegaTeaserModel> featureImageList = Collections.emptyList();

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  @Default(values = "false")
  private String active;

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
   * @return the navTitle
   */
  public String getNavTitle() {
    return navTitle;
  }

  /**
   * @return the fixedItems
   */
  public List<FixedNavigtaionMultifieldModel> getFixedItems() {
    return Collections.unmodifiableList(fixedItems);
  }

  /**
   * @param navTitle the navTitle to set
   */
  public void setNavTitle(String navTitle) {
    this.navTitle = navTitle;
  }

  /**
   * @param fixedItems the fixedItems to set
   */
  public void setFixedItems(List<FixedNavigtaionMultifieldModel> fixedItems) {
    this.fixedItems = Collections.unmodifiableList(fixedItems);
  }

  /**
   * @return the isFeatureItemExist
   */
  public boolean isFeatureItemExist() {
    return isFeatureItemExist;
  }

  /**
   * @param isFeatureItemExist the isFeatureItemExist to set
   */
  public void setFeatureItemExist(boolean isFeatureItemExist) {
    this.isFeatureItemExist = isFeatureItemExist;
  }

  /**
   * @return the title
   */
  public String getTitle() {
    return title;
  }

  /**
   * @return the featureImageList
   */
  public List<MegaTeaserModel> getFeatureImageList() {
    return Collections.unmodifiableList(featureImageList);
  }

  /**
   * @param title the title to set
   */
  public void setTitle(String title) {
    this.title = title;
  }

  /**
   * @param featureImageList the featureImageList to set
   */
  public void setFeatureImageList(List<MegaTeaserModel> featureImageList) {
    this.featureImageList = Collections.unmodifiableList(featureImageList);
  }

}
