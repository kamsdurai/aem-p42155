package com.etisalat.core.models;


import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import javax.annotation.PostConstruct;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.day.cq.wcm.api.Page;
import com.etisalat.core.constants.PageConstants;
import com.etisalat.core.util.CommonUtility;


@Model(adaptables = {Resource.class, SlingHttpServletRequest.class})
public class TopnavModel {

  @SlingObject
  private ResourceResolver resourceResolver;

  @SlingObject
  @Optional
  protected Resource currentResource;


  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  @Default(values = "/content/etisalat/ae")
  private String navigationRoot;


  @ScriptVariable
  protected Page currentPage;


  List<LinkModel> linkModelList = new ArrayList<>();


  @SlingObject
  private SlingHttpServletRequest request;

  private String currentPageLanguageTitle;


  @PostConstruct
  protected void init() {
    if (StringUtils.isNotBlank(navigationRoot)) {
      final Resource res = request.getResourceResolver().getResource(navigationRoot);
      if (null != res && null != res.adaptTo(Page.class)) {
        final Page page = res.adaptTo(Page.class);
        final Iterator<Page> childPage = page.listChildren();
        while (childPage.hasNext()) {
          final Page languagePage = childPage.next();
          getLanguageChildPages(languagePage);
        }
      }
    }
  }


  /**
   * @param languagePage
   */
  private void getLanguageChildPages(Page languagePage) {
    final String pageTitle = languagePage.getTitle();
    extracted(languagePage.getLanguage().toString(), pageTitle);
  }


  /**
   * @param languageCode
   * @param pageTitle
   */
  private void extracted(String languageCode, String pageTitle) {
    final String currrentPath = currentPage.getPath();
    final String newPagePath = currrentPath.replace(
        PageConstants.SLASH + currentPage.getLanguage().toString() + PageConstants.SLASH,
        PageConstants.SLASH + languageCode + PageConstants.SLASH);
    final Resource childRes = currentResource.getResourceResolver().getResource(newPagePath);
    if (null != childRes) {
      if (StringUtils.isNotBlank(currrentPath) && currrentPath.equals(newPagePath)) {
        setCurrentPageLanguageTitle(pageTitle);
      } else {
        final LinkModel model = new LinkModel();
        model.setLinkUrl(
            CommonUtility.appendHtmlExtensionToPage(resourceResolver, childRes.getPath()));
        model.setTitle(pageTitle);
        model.setAltText(languageCode);
        linkModelList.add(model);
      }
    }
  }


  /**
   * @return a collection of objects representing the language links.
   */
  public List<LinkModel> getLocaleList() {
    return Collections.unmodifiableList(linkModelList);
  }

  /**
   * @return a size of the language list.
   */
  public int getLanguageSize() {
    return linkModelList.size();
  }


  /**
   * @return the currentPageLanguageTitle
   */
  public String getCurrentPageLanguageTitle() {
    return currentPageLanguageTitle;
  }


  /**
   * @param currentPageLanguageTitle the currentPageLanguageTitle to set
   */
  public void setCurrentPageLanguageTitle(String currentPageLanguageTitle) {
    this.currentPageLanguageTitle = currentPageLanguageTitle;
  }
  
  public List<FixedNavigtaionMultifieldModel> getTopNavIconsList() {
    return CommonUtility.getFixedNavigationItems("linkswithicons", currentResource, resourceResolver);
  }
}
