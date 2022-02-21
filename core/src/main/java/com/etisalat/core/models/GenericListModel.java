package com.etisalat.core.models;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.annotation.PostConstruct;

import com.etisalat.core.constants.AEConstants;
import com.etisalat.core.constants.PageConstants;
import com.etisalat.core.util.CommonUtility;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;

@Model(adaptables = { Resource.class, SlingHttpServletRequest.class })
public class GenericListModel {

  private static final Logger LOG = LoggerFactory.getLogger(GenericListModel.class);

  @ValueMapValue
  @Optional
  private String rootPath;

  @ValueMapValue
  @Optional
  private String pagelist;

  @SlingObject
  private ResourceResolver resourceResolver;

  @SlingObject
  private SlingHttpServletRequest request;

  private List<GenericListPageDetails> genericListObj;

  @SlingObject
  @Optional
  protected Resource currentResource;

  @PostConstruct
  protected void init() {
    LOG.info("In GenericListModel Init method");
    genericListObj = new ArrayList<>();
    if (currentResource.getChild("fixedpath") != null || StringUtils.isNotBlank(rootPath)) {
      if (StringUtils.isNotBlank("pagelist") && pagelist.equals(AEConstants.FIXEDLIST_NODE)) {
        setFixedListPages();
      } else {
        setRootPageData();
      }
    }
  }

  /**
   * Sets Root page items list data.
   */
  private void setRootPageData() {
    final Resource res = request.getResourceResolver().getResource(rootPath);
    if (null != res) {
      res.listChildren().forEachRemaining(childResource -> {
        if (!childResource.getPath().contains("/jcr:content")) {
          storeListData(childResource);
        }
      });
    }
  }

  /**
   * Sets fixed list pages.
   */
  private void setFixedListPages() {
    currentResource.getChild("fixedpath").listChildren().forEachRemaining(itemResource -> {
      final ValueMap properties = itemResource.getValueMap();
      final String itemPath = properties.get("link", StringUtils.EMPTY);
      final String authoredImage = properties.get(PageConstants.FILE_REFERENCE, StringUtils.EMPTY);
      final String authoredLabel = properties.get("label", StringUtils.EMPTY);
      if (itemPath.contains("/content") && null != request.getResourceResolver().getResource(itemPath)) {
        final GenericListPageDetails detail = new GenericListPageDetails();
        setGenericPageDetails(itemPath, authoredImage, authoredLabel, detail);
        genericListObj.add(detail);
      } else if (StringUtils.isNotEmpty(itemPath)) {
        final GenericListPageDetails detail = new GenericListPageDetails();
        detail.setTitle(authoredLabel);
        detail.setPath(itemPath);
        detail.setThumbnail(authoredImage);
        genericListObj.add(detail);
      }

    });
  }

  /**
   * Sets generic page details data.
   * 
   * @param itemPath
   * @param authoredImage
   * @param authoredLabel
   * @param detail
   */
  private void setGenericPageDetails(String itemPath, String authoredImage, String authoredLabel,
      GenericListPageDetails detail) {
    final Resource itemChildRes = request.getResourceResolver().getResource(itemPath);
    final Page childPage = itemChildRes.adaptTo(Page.class);
    final Resource imageRes = request.getResourceResolver().getResource(itemChildRes.getPath() + "/jcr:content/image");

    if (StringUtils.isBlank(authoredImage) && null != imageRes
        && imageRes.getValueMap().containsKey(PageConstants.FILE_REFERENCE)) {
      authoredImage = imageRes.getValueMap().get(PageConstants.FILE_REFERENCE).toString();
    }
    if (StringUtils.isBlank(authoredLabel) && StringUtils.isNotBlank(childPage.getPageTitle())) {
      authoredLabel = childPage.getPageTitle();
    } else if (StringUtils.isBlank(authoredLabel) && StringUtils.isNotBlank(childPage.getTitle())) {
      authoredLabel = childPage.getTitle();
    }

    LOG.info("list of pages {}", childPage.getPageTitle());
    detail.setTitle(authoredLabel);
    detail.setDescription(childPage.getDescription());
    detail.setOffTime(childPage.getOffTime());
    detail.setPath(CommonUtility.appendHtmlExtensionToPage(resourceResolver, childPage.getPath()));
    detail.setThumbnail(authoredImage);
  }

  /**
   * Sets store list data.
   * 
   * @param childResource
   */
  private void storeListData(Resource childResource) {
    final Resource imageRes = request.getResourceResolver().getResource(childResource.getPath() + "/jcr:content/image");
    String imagePath = StringUtils.EMPTY;
    if (null != imageRes && imageRes.getValueMap().containsKey(PageConstants.FILE_REFERENCE)) {
      imagePath = imageRes.getValueMap().get(PageConstants.FILE_REFERENCE, StringUtils.EMPTY);
    }

    final Page childPage = childResource.adaptTo(Page.class);

    final GenericListPageDetails detail = new GenericListPageDetails();
    LOG.info("list of pages {}", childPage.getPageTitle());
    String title = childPage.getPageTitle();
    if (StringUtils.isBlank(title)) {
      title = childPage.getTitle();
    }
    detail.setTitle(title);
    detail.setDescription(childPage.getDescription());
    detail.setOffTime(childPage.getOffTime());
    detail.setPath(CommonUtility.appendHtmlExtensionToPage(resourceResolver, childPage.getPath()));
    detail.setThumbnail(imagePath);
    genericListObj.add(detail);

  }

  /**
   * 
   * @return a collection of objects representing the page items that compose the  list.
   *        
   */
  public List<GenericListPageDetails> getGenericListObj() {
    return Collections.unmodifiableList(genericListObj);
  }

}
