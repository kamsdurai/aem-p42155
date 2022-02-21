package com.etisalat.core.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.etisalat.core.constants.AEConstants;
import com.etisalat.core.constants.PageConstants;

@Model(adaptables = {Resource.class, SlingHttpServletRequest.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ErrorHandlerModel {
  private static final Logger LOGGER = LoggerFactory.getLogger(ErrorHandlerModel.class);
  private String errorPage;
  
  @Inject
  @Default(values = {PageConstants.DEFAULT_STATUS_CODE})
  private String errorCode;
  
  @Self
  private SlingHttpServletRequest slingRequest;
  
  /**
   * The current request.
   */
  @ScriptVariable
  private SlingHttpServletResponse response;

  
  @PostConstruct
  protected void init() {
    String requestURI = this.slingRequest.getRequestPathInfo().getResourcePath();
    response.setStatus(Integer.parseInt(errorCode));
    response.setContentType("text/html");
    response.setCharacterEncoding(PageConstants.UTF_8);
    this.errorPage = AEConstants.ETISALAT_DEFAULT_ERROR_PAGE + this.errorCode;
     if (StringUtils.isNotBlank(requestURI)) {
      this.errorPage = getErrorPageFromRequestedUrl(this.errorCode, requestURI);
      LOGGER.debug("Page path - init method {}", this.errorPage);
    }
      
  }
  
  /**
   * Returns the error page from request URL
   * @param errorCode
   * @param requestURI
   * @return
   */
  private String getErrorPageFromRequestedUrl(String errorCode, String requestURI) {
    Page resolvedPage = getPageFromPath(requestURI);
    if (resolvedPage != null)
      return getErrorPathFromPage(errorCode, resolvedPage); 
    return null;
  }
  
  /**
   * Returns the page object from the request URL.
   * 
   * @param requestURI
   * @return
   */
  private Page getPageFromPath(String requestURI) {
   final PageManager pageManager = this.slingRequest.getResourceResolver().adaptTo(PageManager.class);
    while (requestURI.contains("/")) {
      if (pageManager == null) {
        LOGGER.debug("Pagemanager is null");
        return null;
      } 
      final Page page = pageManager.getContainingPage(requestURI);
      if (page == null) {
        requestURI = requestURI.substring(0, requestURI.lastIndexOf("/"));
        LOGGER.debug("Request URI is {}", requestURI);
        continue;
      } 
      LOGGER.debug("Page path is {}", page.getPath());
      return page;
    } 
    return null;
  }
  
  /**
   * Returns the error page path.
   * 
   * @param errorCode
   * @param resolvedPage
   * @return
   */
  private String getErrorPathFromPage(String errorCode, Page resolvedPage) {
    if (resolvedPage.hasChild(AEConstants.ERROR_PAGE_NAME))
      return new StringBuilder().append(resolvedPage.getPath()).append("/error/").append(errorCode).toString(); 
    if (resolvedPage.getParent() != null && resolvedPage.getDepth() >= 2)
      return getErrorPathFromPage(errorCode, resolvedPage.getParent()); 
    return null;
  }

  /**
   * @return the errorPage
   */
  public String getErrorPage() {
    return this.errorPage;
  }



}
