package com.etisalat.core.models;

public class IconCardVO {

  private String cardTitle;
  private String cardLink;
  private String cardIcon;
  private String linkBehavior;

  public String getLinkBehavior() {
    return linkBehavior;
  }

  public void setLinkBehavior(String linkBehavior) {
    this.linkBehavior = linkBehavior;
  }

  public String getCardTitle() {
    return cardTitle;
  }

  public void setCardTitle(String cardTitle) {
    this.cardTitle = cardTitle;
  }

  public String getCardLink() {
    return cardLink;
  }

  public void setCardLink(String cardLink) {
    this.cardLink = cardLink;
  }

  public String getCardIcon() {
    return cardIcon;
  }

  public void setCardIcon(String cardIcon) {
    this.cardIcon = cardIcon;
  }

}
