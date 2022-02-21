package com.etisalat.core.models;

public class EtisalatBreadcrumbVO {

  private String breadcrumbTitle;
  private String breadcrumbLink;
  private String linkBehavior;
  
  public String getBreadcrumbTitle() {
	return breadcrumbTitle;
}

public void setBreadcrumbTitle(String breadcrumbTitle) {
	this.breadcrumbTitle = breadcrumbTitle;
}

public String getBreadcrumbLink() {
	return breadcrumbLink;
}

public void setBreadcrumbLink(String breadcrumbLink) {
	this.breadcrumbLink = breadcrumbLink;
}

public String getLinkBehavior() {
    return linkBehavior;
  }

  public void setLinkBehavior(String linkBehavior) {
    this.linkBehavior = linkBehavior;
  }

}
