package com.etisalat.core.models;

import com.etisalat.core.constants.PageConstants;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.etisalat.core.util.CommonUtility;

@Model(adaptables = {Resource.class,
    SlingHttpServletRequest.class})

public class TileModel {

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String tiletitle;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String ctatext;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String text;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private Long numberOfItems;

  @ChildResource(name = "image", injectionStrategy = InjectionStrategy.OPTIONAL)
  private Resource tileImageResource;

  @ChildResource(name = "qrimage", injectionStrategy = InjectionStrategy.OPTIONAL)
  private Resource qrImageResource;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String tileCTALinkNewWindow;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String tileCTALinkSameWindow;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String categoryTag;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String linkURL;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String validDateText;

  @SlingObject
  protected Resource currentResource;

  @SlingObject
  private ResourceResolver resourceResolver;

  /**
   * The current request.
   */
  @Self
  protected SlingHttpServletRequest request;

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public String getTiletitle() {
    return tiletitle;
  }

  public void setTiletitle(String tiletitle) {
    this.tiletitle = tiletitle;
  }

  public String getCtatext() {
    return ctatext;
  }

  public void setCtatext(String ctatext) {
    this.ctatext = ctatext;
  }

  /**
   * @return the tileImageResource
   */
  public Resource getTileImageResource() {
    return tileImageResource;
  }

  /**
   * @param tileImageResource the tileImageResource to set
   */
  public void setTileImageResource(Resource tileImageResource) {
    this.tileImageResource = tileImageResource;
  }

  /**
   * @return the qrImageResource
   */
  public Resource getQrImageResource() {
    return qrImageResource;
  }

  /**
   * @param qrImageResource the qrImageResource to set
   */
  public void setQrImageResource(Resource qrImageResource) {
    this.qrImageResource = qrImageResource;
  }

  /**
   * @return the tileCTALinkNewWindow
   */
  public String getTileCTALinkNewWindow() {
    return CommonUtility.appendHtmlExtensionToPage(resourceResolver, tileCTALinkNewWindow);
  }

  /**
   * @return the tileCTALinkSameWindow
   */
  public String getTileCTALinkSameWindow() {
    return CommonUtility.appendHtmlExtensionToPage(resourceResolver, tileCTALinkSameWindow);
  }

  /**
   * @param tileCTALinkNewWindow the tileCTALinkNewWindow to set
   */
  public void setTileCTALinkNewWindow(String tileCTALinkNewWindow) {
    this.tileCTALinkNewWindow = tileCTALinkNewWindow;
  }

  /**
   * @param tileCTALinkSameWindow the tileCTALinkSameWindow to set
   */
  public void setTileCTALinkSameWindow(String tileCTALinkSameWindow) {
    this.tileCTALinkSameWindow = tileCTALinkSameWindow;
  }

  /**
   * @return the categoryTag
   */
  public String getCategoryTag() {
    return categoryTag;
  }

  /**
   * @param categoryTag the categoryTag to set
   */
  public void setCategoryTag(String categoryTag) {
    this.categoryTag = categoryTag;
  }

  /**
   * @return the linkURL
   */
  public String getLinkURL() {
    return CommonUtility.appendHtmlExtensionToPage(resourceResolver, linkURL);
  }

  /**
   * @param linkURL the linkURL to set
   */
  public void setLinkURL(String linkURL) {
    this.linkURL = linkURL;
  }


  /**
   * @return the validDateText
   */
  public String getValidDateText() {
    return validDateText;
  }

  /**
   * @param validDateText the validDateText to set
   */
  public void setValidDateText(String validDateText) {
    this.validDateText = validDateText;
  }

  public Long getNumberOfItems() {
    return numberOfItems+1;
  }

  public void setNumberOfItems(Long numberOfItems) {
    this.numberOfItems = numberOfItems;
  }

  /**
   * Returns tile box container layout option.
   *
   * @return
   */
  public String getTileBoxContainerLayout() {
    final Resource tileContainerResource = currentResource.getParent();
    if (null != tileContainerResource
        && (tileContainerResource.getResourceType().equals(PageConstants.TILE_CONTAINER_RESOURCETYPE) ||
        tileContainerResource.getResourceType().equals(PageConstants.SWIPER_CONTAINER_RESOURCETYPE)  ||
            (tileContainerResource.getResourceType().equals(PageConstants.ACCESSORIES_CONTAINER_RESOURCETYPE)))){
      return tileContainerResource.getValueMap().get("tileBoxLayout", StringUtils.EMPTY);
    }
    return StringUtils.EMPTY;
  }

  public String getTileBoxVariation() {
    final Resource tileContainerResource = currentResource.getParent();
    if (null != tileContainerResource && tileContainerResource.getResourceType().equals(PageConstants.TILE_CONTAINER_RESOURCETYPE)){
      return tileContainerResource.getValueMap().get("tileBoxVariation", StringUtils.EMPTY);
    }
    return StringUtils.EMPTY;
  }
  /**
   * Returns article category tag title.
   *
   * @return
   */
  public String getCategoryTagTitle() {
    final TagManager tagManager = request.getResourceResolver().adaptTo(TagManager.class);
    if (StringUtils.isNotBlank(categoryTag) && null != tagManager) {
      final Tag tag = tagManager.resolve(categoryTag);
      if (null != tag) {
        return tag.getTitle();
      }
    }
    return StringUtils.EMPTY;
  }

}
