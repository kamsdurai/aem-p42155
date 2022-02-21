package com.etisalat.core.models;

import java.util.Calendar;

import org.apache.sling.api.resource.Resource;

public class GenericListPageDetails {

  private String title;
  private String pageTitle;
  private String description;
  private String file;
  private Calendar offTime;
  private String path;
  private String articleDateDisplayString;
  private String thumbnail;
  private String category;
  private Calendar articleDate;
  private String tileSize;
  private Resource thumbnailResource;
  private String youTubeUrl;
  private String playIconText;
  private String blogVideoID;

  public String getThumbnail() {
    return thumbnail;
  }

  public void setThumbnail(String thumbnail) {
    this.thumbnail = thumbnail;
  }

  public Calendar getOffTime() {
    return offTime;
  }

  public void setOffTime(Calendar calendar) {
    this.offTime = calendar;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getFile() {
    return file;
  }

  public void setFile(String file) {
    this.file = file;
  }

  public String getPageTitle() {
    return pageTitle;
  }

  public void setPageTitle(String pageTitle) {
    this.pageTitle = pageTitle;
  }

  public String getPath() {
    return path;
  }

  public void setPath(String path) {
    this.path = path;
  }

  /**
   * @return the category
   */
  public String getCategory() {
    return category;
  }

  /**
   * @param category the category to set
   */
  public void setCategory(String category) {
    this.category = category;
  }

  /**
   * @return the articleDate
   */
  public Calendar getArticleDate() {
    return articleDate;
  }

  /**
   * @param articleDate the articleDate to set
   */
  public void setArticleDate(Calendar articleDate) {
    this.articleDate = articleDate;
  }

  /**
   * @return the tileSize
   */
  public String getTileSize() {
    return tileSize;
  }

  /**
   * @param tileSize the tileSize to set
   */
  public void setTileSize(String tileSize) {
    this.tileSize = tileSize;
  }

  /**
   * @return the thumbnailResource
   */
  public Resource getThumbnailResource() {
    return thumbnailResource;
  }

  /**
   * @param thumbnailResource the thumbnailResource to set
   */
  public void setThumbnailResource(Resource thumbnailResource) {
    this.thumbnailResource = thumbnailResource;
  }

  /**
   * @return the youTubeUrl
   */
  public String getYouTubeUrl() {
    return youTubeUrl;
  }

  /**
   * @param youTubeUrl the youTubeUrl to set
   */
  public void setYouTubeUrl(String youTubeUrl) {
    this.youTubeUrl = youTubeUrl;
  }

  /**
   * @return the playIconText
   */
  public String getPlayIconText() {
    return playIconText;
  }

  /**
   * @param playIconText the playIconText to set
   */
  public void setPlayIconText(String playIconText) {
    this.playIconText = playIconText;
  }

  /**
   * @return the blogVideoID
   */
  public String getBlogVideoID() {
    return blogVideoID;
  }

  /**
   * @param blogVideoID the blogVideoID to set
   */
  public void setBlogVideoID(String blogVideoID) {
    this.blogVideoID = blogVideoID;
  }
  
  
  public String getArticleDateDisplayString() {
	return articleDateDisplayString;
  }
  /**
   * @param article Date String to display
   */
  public void setArticleDateDisplayString(String articleDateDisplayString) {
	this.articleDateDisplayString = articleDateDisplayString;
  }

}
