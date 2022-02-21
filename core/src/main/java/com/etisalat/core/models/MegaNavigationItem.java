package com.etisalat.core.models;

import java.util.Collections;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


@Model(adaptables = Resource.class)
public class MegaNavigationItem {

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String navigationLabel;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String navigationLinkTo;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String navigationAltText;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String xfVariationPath;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String utilityMenuLayout;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String navImagePath;

  private String active;

  private List<MegaSubNavigationItem> subNavigationList = Collections.emptyList();

  /**
   * List of mega sub menu links.
   */
  private List<MegaFixedNavigationItem> containerSubMenuList = Collections.emptyList();


  /**
   * List of mega menu promotional image paths.
   */
  private List<MegaTeaserModel> containerPromotionList = Collections.emptyList();

  /**
   * List of mega footer menu links.
   */
  private List<MegaFixedNavigationItem> containerFooterMenuList = Collections.emptyList();


  /**
   * @return the navigationLabel
   */
  public String getNavigationLabel() {
    return navigationLabel;
  }

  /**
   * @return the navigationLinkTo
   */
  public String getNavigationLinkTo() {
    return navigationLinkTo;
  }

  /**
   * @return the subNavigationList
   */
  public List<MegaSubNavigationItem> getSubNavigationList() {
    return Collections.unmodifiableList(subNavigationList);
  }

  /**
   * @param navigationLabel the navigationLabel to set
   */
  public void setNavigationLabel(String navigationLabel) {
    this.navigationLabel = navigationLabel;
  }

  /**
   * @param navigationLinkTo the navigationLinkTo to set
   */
  public void setNavigationLinkTo(String navigationLinkTo) {
    this.navigationLinkTo = navigationLinkTo;
  }

  /**
   * @param subNavigationList the subNavigationList to set
   */
  public void setSubNavigationList(List<MegaSubNavigationItem> subNavigationList) {
    this.subNavigationList = Collections.unmodifiableList(subNavigationList);
  }

  /**
   * @return the navigationAltText
   */
  public String getNavigationAltText() {
    return navigationAltText;
  }

  /**
   * @param navigationAltText the navigationAltText to set
   */
  public void setNavigationAltText(String navigationAltText) {
    this.navigationAltText = navigationAltText;
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
   * @return the xfVariationPath
   */
  public String getXfVariationPath() {
    return xfVariationPath;
  }

  /**
   * @param xfVariationPath the xfVariationPath to set
   */
  public void setXfVariationPath(String xfVariationPath) {
    this.xfVariationPath = xfVariationPath;
  }

  /**
   * @return the containerSubMenuList
   */
  public List<MegaFixedNavigationItem> getContainerSubMenuList() {
    return Collections.unmodifiableList(containerSubMenuList);
  }

  /**
   * @return the containerPromotionList
   */
  public List<MegaTeaserModel> getContainerPromotionList() {
    return Collections.unmodifiableList(containerPromotionList);
  }

  /**
   * @return the containerFooterMenuList
   */
  public List<MegaFixedNavigationItem> getContainerFooterMenuList() {
    return Collections.unmodifiableList(containerFooterMenuList);
  }

  /**
   * @param containerSubMenuList the containerSubMenuList to set
   */
  public void setContainerSubMenuList(List<MegaFixedNavigationItem> containerSubMenuList) {
    this.containerSubMenuList = Collections.unmodifiableList(containerSubMenuList);
  }

  /**
   * @param containerPromotionList the containerPromotionList to set
   */
  public void setContainerPromotionList(List<MegaTeaserModel> containerPromotionList) {
    this.containerPromotionList = Collections.unmodifiableList(containerPromotionList);
  }

  /**
   * @param containerFooterMenuList the containerFooterMenuList to set
   */
  public void setContainerFooterMenuList(List<MegaFixedNavigationItem> containerFooterMenuList) {
    this.containerFooterMenuList = Collections.unmodifiableList(containerFooterMenuList);
  }

  /**
   * @return the utilityMenuLayout
   */
  public String getUtilityMenuLayout() {
    return utilityMenuLayout;
  }

  /**
   * @param utilityMenuLayout the utilityMenuLayout to set
   */
  public void setUtilityMenuLayout(String utilityMenuLayout) {
    this.utilityMenuLayout = utilityMenuLayout;
  }

  /**
   * @return the navImagePath
   */
  public String getNavImagePath() {
    return navImagePath;
  }

  /**
   * @param navImagePath the navImagePath to set
   */
  public void setNavImagePath(String navImagePath) {
    this.navImagePath = navImagePath;
  }


}
