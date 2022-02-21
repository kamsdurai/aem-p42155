package com.etisalat.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class)
public class MegaSubNavigationItem {

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String subNavLinkTo;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String subNavLabel;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String subNavTitle;

  /**
   * @return the subNavLinkTo
   */
  public String getSubNavLinkTo() {
    return subNavLinkTo;
  }

  /**
   * @return the subNavLabel
   */
  public String getSubNavLabel() {
    return subNavLabel;
  }

  /**
   * @return the subNavTitle
   */
  public String getSubNavTitle() {
    return subNavTitle;
  }

  /**
   * @param subNavLinkTo the subNavLinkTo to set
   */
  public void setSubNavLinkTo(String subNavLinkTo) {
    this.subNavLinkTo = subNavLinkTo;
  }

  /**
   * @param subNavLabel the subNavLabel to set
   */
  public void setSubNavLabel(String subNavLabel) {
    this.subNavLabel = subNavLabel;
  }

  /**
   * @param subNavTitle the subNavTitle to set
   */
  public void setSubNavTitle(String subNavTitle) {
    this.subNavTitle = subNavTitle;
  }


}
