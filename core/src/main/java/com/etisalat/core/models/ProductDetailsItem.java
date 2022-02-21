package com.etisalat.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class)
public class ProductDetailsItem {

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String theme = "";

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String offerText = "";

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String productTitle = "";

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String productSubTitle = "";

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String productDesc = "";

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String productPrice = "";

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String productCurrency = "";

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String vatInclude = "";

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String moreInfoLabel = "";

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String moreInfoDesc = "";

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String contract = "";

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String buyNowButton = "";

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String buttonLink = "";


  /**
   * @return the theme
   */
  public String getTheme() {
    return theme;
  }

  /**
   * @return the productTitle
   */
  public String getProductTitle() {
    return productTitle;
  }

  /**
   * @return the productSubTitle
   */
  public String getProductSubTitle() {
    return productSubTitle;
  }

  /**
   * @return the productDesc
   */
  public String getProductDesc() {
    return productDesc;
  }

  /**
   * @return the productPrice
   */
  public String getProductPrice() {
    return productPrice;
  }

  /**
   * @return the productCurrency
   */
  public String getProductCurrency() {
    return productCurrency;
  }

  /**
   * @return the vatInclude
   */
  public String getVatInclude() {
    return vatInclude;
  }

  /**
   * @return the moreInfoLabel
   */
  public String getMoreInfoLabel() {
    return moreInfoLabel;
  }

  /**
   * @return the moreInfoDesc
   */
  public String getMoreInfoDesc() {
    return moreInfoDesc;
  }

  /**
   * @return the contract
   */
  public String getContract() {
    return contract;
  }

  /**
   * @return the offerText
   */
  public String getOfferText() {
    return offerText;
  }

  /**
   * @return the buyNowButton
   */
  public String getBuyNowButton() {
    return buyNowButton;
  }

  /**
   * @return the buttonLink
   */
  public String getButtonLink() {
    return buttonLink;
  }

  /**
   * @param the theme
   */
  public void setTheme(String theme) {
    this.theme = theme;
  }

  /**
   * @param the productTitle
   */
  public void setProductTitle(String productTitle) {
    this.productTitle = productTitle;
  }

  /**
   * @param the productSubTitle
   */
  public void setProductSubTitle(String productSubTitle) {
    this.productSubTitle = productSubTitle;
  }

  /**
   * @param the productDesc
   */
  public void setProductDesc(String productDesc) {
    this.productDesc = productDesc;
  }

  /**
   * @param the productPrice
   */
  public void setProductPrice(String productPrice) {
    this.productPrice = productPrice;
  }

  /**
   * @param the productCurrency
   */
  public void setProductCurrency(String productCurrency) {
    this.productCurrency = productCurrency;
  }

  /**
   * @param the vatInclude
   */
  public void setVatInclude(String vatInclude) {
    this.vatInclude = vatInclude;
  }

  /**
   * @param the moreInfoLabel
   */
  public void setMoreInfoLabel(String moreInfoLabel) {
    this.moreInfoLabel = moreInfoLabel;
  }

  /**
   * @param the moreInfoDesc
   */
  public void setMoreInfoDesc(String moreInfoDesc) {
    this.moreInfoDesc = moreInfoDesc;
  }

  /**
   * @param the contract
   */
  public void setContract(String contract) {
    this.contract = contract;
  }

  /**
   * @param the offerText
   */

  public void setOfferText(String offerText) {
    this.offerText = offerText;
  }

  /**
   * @param the buyNowButton
   */
  public void setBuyNowButton(String buyNowButton) {
    this.buyNowButton = buyNowButton;
  }

  /**
   * @param the buttonLink
   */
  public void setButtonLink(String buttonLink) {
    this.buttonLink = buttonLink;
  }


}
